import { useState, useMemo } from 'react';
import { Plus, Search, DollarSign, TrendingUp, TrendingDown, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

interface FinancialEntry {
  id: number;
  description: string;
  reference: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  dueDate: string;
  paidDate: string | null;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  paymentMethod: string;
  reconciled: boolean;
  notes: string;
  origin: 'receivable' | 'payable';
}

const mockEntries: FinancialEntry[] = [
  { id: 1, description: 'Venda Loja - João Silva', reference: 'ORD-2026-0001', type: 'income', category: 'Sales', amount: 458.50, date: '2026-05-24', dueDate: '2026-05-24', paidDate: '2026-05-24', status: 'paid', paymentMethod: 'Credit Card', reconciled: true, notes: '', origin: 'receivable' },
  { id: 2, description: 'Compra Estoque - Distribuidora ABC', reference: 'ORD-2026-0002', type: 'expense', category: 'Inventory', amount: 12500.00, date: '2026-05-28', dueDate: '2026-06-15', paidDate: null, status: 'pending', paymentMethod: 'Boleto', reconciled: false, notes: 'Vencimento 15/06', origin: 'payable' },
  { id: 3, description: 'Venda - Maria Oliveira', reference: 'ORD-2026-0003', type: 'income', category: 'Sales', amount: 189.00, date: '2026-06-01', dueDate: '2026-06-01', paidDate: '2026-06-01', status: 'paid', paymentMethod: 'Pix', reconciled: true, notes: '', origin: 'receivable' },
  { id: 4, description: 'Aluguel Matriz', reference: 'RENT-001', type: 'expense', category: 'Rent', amount: 4500.00, date: '2026-06-01', dueDate: '2026-06-10', paidDate: null, status: 'pending', paymentMethod: 'Bank Transfer', reconciled: false, notes: 'Aluguel junho', origin: 'payable' },
  { id: 5, description: 'Venda Corporativa - Tech Solutions', reference: 'ORD-2026-0004', type: 'income', category: 'Sales', amount: 3450.00, date: '2026-06-05', dueDate: '2026-06-10', paidDate: null, status: 'pending', paymentMethod: 'Credit Card', reconciled: false, notes: 'Parcelado 3x', origin: 'receivable' },
  { id: 6, description: 'Salários Funcionários', reference: 'PAY-2026-06', type: 'expense', category: 'Payroll', amount: 28000.00, date: '2026-06-05', dueDate: '2026-06-05', paidDate: '2026-06-05', status: 'paid', paymentMethod: 'Bank Transfer', reconciled: true, notes: 'Folha junho', origin: 'payable' },
  { id: 7, description: 'Conta de Luz', reference: 'UTIL-2026-06', type: 'expense', category: 'Utilities', amount: 1280.00, date: '2026-06-03', dueDate: '2026-06-15', paidDate: null, status: 'pending', paymentMethod: 'Boleto', reconciled: false, notes: '', origin: 'payable' },
  { id: 8, description: 'Venda - Ana Beatriz Costa', reference: 'ORD-2026-0007', type: 'income', category: 'Sales', amount: 125.40, date: '2026-06-07', dueDate: '2026-06-07', paidDate: null, status: 'pending', paymentMethod: 'Pix', reconciled: false, notes: '', origin: 'receivable' },
  { id: 9, description: 'Venda Atacado - Distribuidora Norte', reference: 'ORD-2026-0009', type: 'income', category: 'Sales', amount: 8720.00, date: '2026-05-30', dueDate: '2026-06-15', paidDate: null, status: 'pending', paymentMethod: 'Credit Card', reconciled: false, notes: 'Receber até 15/06', origin: 'receivable' },
  { id: 10, description: 'Internet e Telefone', reference: 'UTIL-2026-06', type: 'expense', category: 'Utilities', amount: 450.00, date: '2026-06-02', dueDate: '2026-06-10', paidDate: null, status: 'pending', paymentMethod: 'Boleto', reconciled: false, notes: '', origin: 'payable' },
  { id: 11, description: 'Fornecedor Alimentos SP', reference: 'ORD-2026-0005', type: 'expense', category: 'Inventory', amount: 8900.00, date: '2026-06-06', dueDate: '2026-06-20', paidDate: null, status: 'pending', paymentMethod: 'Boleto', reconciled: false, notes: '', origin: 'payable' },
  { id: 12, description: 'Comissão Vendedores', reference: 'COMM-2026-05', type: 'expense', category: 'Payroll', amount: 3200.00, date: '2026-05-31', dueDate: '2026-06-05', paidDate: '2026-06-05', status: 'paid', paymentMethod: 'Bank Transfer', reconciled: true, notes: 'Comissão maio', origin: 'payable' },
  { id: 13, description: 'Conta de Água', reference: 'UTIL-2026-06', type: 'expense', category: 'Utilities', amount: 670.00, date: '2026-06-04', dueDate: '2026-06-20', paidDate: null, status: 'pending', paymentMethod: 'Boleto', reconciled: false, notes: '', origin: 'payable' },
  { id: 14, description: 'Venda Loja - Fernanda Lima', reference: 'ORD-2026-0010', type: 'income', category: 'Sales', amount: 67.80, date: '2026-05-27', dueDate: '2026-05-27', paidDate: '2026-05-27', status: 'paid', paymentMethod: 'Pix', reconciled: true, notes: '', origin: 'receivable' },
  { id: 15, description: 'Serviço Contabilidade', reference: 'ACC-2026-06', type: 'expense', category: 'Services', amount: 2500.00, date: '2026-06-01', dueDate: '2026-06-15', paidDate: null, status: 'pending', paymentMethod: 'Bank Transfer', reconciled: false, notes: 'Mensalidade contabilidade', origin: 'payable' },
  { id: 16, description: 'Compra Estoque - Limpeza Ltda', reference: 'ORD-2026-0008', type: 'expense', category: 'Inventory', amount: 15000.00, date: '2026-06-03', dueDate: '2026-07-03', paidDate: null, status: 'pending', paymentMethod: 'Boleto', reconciled: false, notes: '30 dias', origin: 'payable' },
  { id: 17, description: 'Cliente Carlos - Em Aberto', reference: 'ORD-2026-0006', type: 'income', category: 'Sales', amount: 45.00, date: '2026-05-15', dueDate: '2026-05-20', paidDate: null, status: 'overdue', paymentMethod: 'Pix', reconciled: false, notes: 'Vencido - cobrar cliente', origin: 'receivable' },
  { id: 18, description: 'Manutenção Servidores', reference: 'IT-2026-06', type: 'expense', category: 'Services', amount: 1900.00, date: '2026-06-07', dueDate: '2026-06-07', paidDate: '2026-06-07', status: 'paid', paymentMethod: 'Credit Card', reconciled: true, notes: '', origin: 'payable' },
];

const CATEGORIES = ['Sales', 'Inventory', 'Rent', 'Payroll', 'Utilities', 'Services'];
const PERIODS = ['7days', '15days', '30days', '60days'] as const;
type Period = typeof PERIODS[number];

export default function FinancialPage() {
  const [search, setSearch] = useState('');
  const [originFilter, setOriginFilter] = useState<'all' | 'receivable' | 'payable'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue' | 'cancelled'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [reconciledFilter, setReconciledFilter] = useState<'all' | 'reconciled' | 'pending'>('all');
  const [cashFlowPeriod, setCashFlowPeriod] = useState<Period>('30days');

  const filtered = useMemo(() => {
    let data = [...mockEntries];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(e =>
        e.description.toLowerCase().includes(q) ||
        e.reference.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.paymentMethod.toLowerCase().includes(q)
      );
    }
    if (originFilter !== 'all') data = data.filter(e => e.origin === originFilter);
    if (statusFilter !== 'all') data = data.filter(e => e.status === statusFilter);
    if (categoryFilter !== 'all') data = data.filter(e => e.category === categoryFilter);
    if (reconciledFilter === 'reconciled') data = data.filter(e => e.reconciled);
    else if (reconciledFilter === 'pending') data = data.filter(e => !e.reconciled);
    return data;
  }, [search, originFilter, statusFilter, categoryFilter, reconciledFilter]);

  const cashFlowProjection = useMemo(() => {
    const days = cashFlowPeriod === '7days' ? 7 : cashFlowPeriod === '15days' ? 15 : cashFlowPeriod === '30days' ? 30 : 60;
    const today = new Date();
    const cutoff = new Date(today);
    cutoff.setDate(cutoff.getDate() + days);

    const projectedInvoices = mockEntries.filter(e => {
      const d = new Date(e.dueDate);
      return d >= today && d <= cutoff && e.status !== 'paid' && e.status !== 'cancelled';
    });

    const income = projectedInvoices.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0);
    const expense = projectedInvoices.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0);
    return { income, expense, balance: income - expense, days };
  }, [cashFlowPeriod]);

  const stats = useMemo(() => {
    const totalIncome = mockEntries.filter(e => e.type === 'income' && e.status === 'paid').reduce((s, e) => s + e.amount, 0);
    const totalExpense = mockEntries.filter(e => e.type === 'expense' && e.status === 'paid').reduce((s, e) => s + e.amount, 0);
    const pendingIncome = mockEntries.filter(e => e.type === 'income' && e.status === 'pending').reduce((s, e) => s + e.amount, 0);
    const pendingExpense = mockEntries.filter(e => e.type === 'expense' && e.status === 'pending').reduce((s, e) => s + e.amount, 0);
    const overdue = mockEntries.filter(e => e.status === 'overdue').reduce((s, e) => s + e.amount, 0);
    return { totalIncome, totalExpense, currentBalance: totalIncome - totalExpense, pendingIncome, pendingExpense, overdue, pendingTotal: pendingIncome - pendingExpense };
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return <Badge variant="success">Paid</Badge>;
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      case 'overdue': return <Badge variant="danger">Overdue</Badge>;
      case 'cancelled': return <Badge variant="info">Cancelled</Badge>;
      default: return <Badge variant="info">{status}</Badge>;
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Financial</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="form-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 200, paddingLeft: 30 }} />
          </div>
          <select className="form-input" value={originFilter} onChange={(e) => setOriginFilter(e.target.value as any)} style={{ width: 120 }}>
            <option value="all">All Origins</option>
            <option value="receivable">Receivable</option>
            <option value="payable">Payable</option>
          </select>
          <select className="form-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} style={{ width: 120 }}>
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select className="form-input" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ width: 120 }}>
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="form-input" value={reconciledFilter} onChange={(e) => setReconciledFilter(e.target.value as any)} style={{ width: 130 }}>
            <option value="all">Reconciliation: All</option>
            <option value="reconciled">Reconciled</option>
            <option value="pending">Pending Recon.</option>
          </select>
          <Button variant="primary" size="sm"><Plus size={14} /> Add Transaction</Button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Current Balance</div>
          <div className="stat-value" style={{ color: stats.currentBalance >= 0 ? 'var(--success)' : 'var(--danger)' }}>
            ${stats.currentBalance.toFixed(2)}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Paid Income</div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>${stats.totalIncome.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Paid Expenses</div>
          <div className="stat-value" style={{ color: 'var(--danger)' }}>${stats.totalExpense.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Net</div>
          <div className="stat-value" style={{ color: stats.pendingTotal >= 0 ? 'var(--warning)' : 'var(--danger)' }}>
            ${stats.pendingTotal.toFixed(2)}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Overdue</div>
          <div className="stat-value" style={{ color: 'var(--danger)' }}>${stats.overdue.toFixed(2)}</div>
        </div>
      </div>

      <Card title={`Cash Flow Projection (${cashFlowProjection.days} days)`} action={
        <select className="form-input" value={cashFlowPeriod} onChange={(e) => setCashFlowPeriod(e.target.value as Period)} style={{ width: 110, fontSize: 12 }}>
          <option value="7days">7 days</option>
          <option value="15days">15 days</option>
          <option value="30days">30 days</option>
          <option value="60days">60 days</option>
        </select>
      }>
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <div style={{ flex: 1, padding: 16, borderRadius: 8, background: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <TrendingUp size={18} style={{ color: 'var(--success)' }} />
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Projected Income</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--success)' }}>${cashFlowProjection.income.toFixed(2)}</div>
          </div>
          <div style={{ flex: 1, padding: 16, borderRadius: 8, background: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <TrendingDown size={18} style={{ color: 'var(--danger)' }} />
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Projected Expenses</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--danger)' }}>${cashFlowProjection.expense.toFixed(2)}</div>
          </div>
          <div style={{ flex: 1, padding: 16, borderRadius: 8, background: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <DollarSign size={18} style={{ color: cashFlowProjection.balance >= 0 ? 'var(--success)' : 'var(--danger)' }} />
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Projected Balance</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: cashFlowProjection.balance >= 0 ? 'var(--success)' : 'var(--danger)' }}>
              ${cashFlowProjection.balance.toFixed(2)}
            </div>
          </div>
        </div>
      </Card>

      <Card title={`Transactions (${filtered.length})`}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<DollarSign size={48} />}
            message="No transactions found matching your filters"
            action={<Button variant="primary" size="sm"><Plus size={14} /> Add Transaction</Button>}
          />
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Origin</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Reconciled</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div style={{ fontWeight: 500, fontSize: 13 }}>{e.description}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{e.reference}</div>
                    </td>
                    <td>
                      <Badge variant={e.origin === 'receivable' ? 'success' : 'danger'}>
                        {e.origin === 'receivable' ? 'Receivable' : 'Payable'}
                      </Badge>
                    </td>
                    <td>
                      <span style={{ fontSize: 13 }}>{e.category}</span>
                    </td>
                    <td style={{ fontWeight: 600, color: e.type === 'income' ? 'var(--success)' : 'var(--danger)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {e.type === 'income' ? <ArrowUpCircle size={14} /> : <ArrowDownCircle size={14} />}
                        ${e.amount.toFixed(2)}
                      </div>
                    </td>
                    <td style={{ fontSize: 13 }}>{new Date(e.date).toLocaleDateString('en-US')}</td>
                    <td>
                      <div style={{ fontSize: 13 }}>{new Date(e.dueDate).toLocaleDateString('en-US')}</div>
                      {e.paidDate && <div style={{ fontSize: 11, color: 'var(--success)' }}>Paid: {new Date(e.paidDate).toLocaleDateString('en-US')}</div>}
                    </td>
                    <td>{getStatusBadge(e.status)}</td>
                    <td>
                      {e.reconciled ? (
                        <Badge variant="success">Yes</Badge>
                      ) : (
                        <Badge variant="warning">Pending</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
