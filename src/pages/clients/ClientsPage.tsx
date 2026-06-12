import { useState, useMemo } from 'react';
import { Plus, Search, Users, Calendar, DollarSign } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

interface Client {
  id: number;
  name: string;
  type: 'person' | 'company';
  email: string;
  phone: string;
  cpfCnpj: string;
  city: string;
  state: string;
  status: 'active' | 'inactive' | 'blocked';
  creditLimit: number;
  totalSpent: number;
  lastPurchase: string | null;
  birthday: string | null;
  segment: 'Gold' | 'Silver' | 'Bronze';
  notes: string;
  createdAt: string;
}

const mockClients: Client[] = [
  { id: 1, name: 'João Silva', type: 'person', email: 'joao@email.com', phone: '(11) 99999-0001', cpfCnpj: '123.456.789-00', city: 'São Paulo', state: 'SP', status: 'active', creditLimit: 5000, totalSpent: 32500.50, lastPurchase: '2026-06-01', birthday: '1990-03-15', segment: 'Gold', notes: 'Cliente VIP, pagamento sempre em dia', createdAt: '2024-01-10' },
  { id: 2, name: 'Maria Oliveira', type: 'person', email: 'maria@email.com', phone: '(21) 98888-0002', cpfCnpj: '987.654.321-00', city: 'Rio de Janeiro', state: 'RJ', status: 'active', creditLimit: 3000, totalSpent: 12800.00, lastPurchase: '2026-05-28', birthday: '1985-07-22', segment: 'Silver', notes: '', createdAt: '2024-03-15' },
  { id: 3, name: 'Tech Solutions Ltda', type: 'company', email: 'contato@techsolutions.com', phone: '(11) 3000-0003', cpfCnpj: '11.222.333/0001-44', city: 'Campinas', state: 'SP', status: 'active', creditLimit: 25000, totalSpent: 89500.00, lastPurchase: '2026-06-05', birthday: null, segment: 'Gold', notes: 'Contrato anual de manutenção', createdAt: '2023-11-20' },
  { id: 4, name: 'Carlos Mendes', type: 'person', email: 'carlos@email.com', phone: '(31) 97777-0004', cpfCnpj: '456.789.123-00', city: 'Belo Horizonte', state: 'MG', status: 'inactive', creditLimit: 1000, totalSpent: 450.00, lastPurchase: '2025-12-10', birthday: '1992-11-30', segment: 'Bronze', notes: 'Cliente inativo há 6 meses', createdAt: '2025-06-01' },
  { id: 5, name: 'Ana Beatriz Costa', type: 'person', email: 'ana@email.com', phone: '(41) 96666-0005', cpfCnpj: '321.654.987-00', city: 'Curitiba', state: 'PR', status: 'active', creditLimit: 8000, totalSpent: 22300.75, lastPurchase: '2026-06-02', birthday: '1988-09-08', segment: 'Gold', notes: '', createdAt: '2024-07-10' },
  { id: 6, name: 'Comercial ABC Ltda', type: 'company', email: 'abc@comercialabc.com', phone: '(11) 4000-0006', cpfCnpj: '22.333.444/0001-55', city: 'São Paulo', state: 'SP', status: 'blocked', creditLimit: 0, totalSpent: 15000.00, lastPurchase: '2026-04-15', birthday: null, segment: 'Silver', notes: 'Bloqueado por inadimplência', createdAt: '2024-02-05' },
  { id: 7, name: 'Fernanda Lima', type: 'person', email: 'fernanda@email.com', phone: '(51) 95555-0007', cpfCnpj: '654.321.789-00', city: 'Porto Alegre', state: 'RS', status: 'active', creditLimit: 2000, totalSpent: 6700.00, lastPurchase: '2026-05-20', birthday: '1995-01-25', segment: 'Silver', notes: '', createdAt: '2025-01-20' },
  { id: 8, name: 'Distribuidora Norte', type: 'company', email: 'vendas@distnorte.com', phone: '(92) 3333-0008', cpfCnpj: '33.444.555/0001-66', city: 'Manaus', state: 'AM', status: 'active', creditLimit: 15000, totalSpent: 45000.00, lastPurchase: '2026-06-03', birthday: null, segment: 'Gold', notes: 'Parceiro estratégico região norte', createdAt: '2024-09-01' },
  { id: 9, name: 'Pedro Alves', type: 'person', email: 'pedro@email.com', phone: '(61) 94444-0009', cpfCnpj: '789.123.456-00', city: 'Brasília', state: 'DF', status: 'active', creditLimit: 1500, totalSpent: 3200.00, lastPurchase: '2026-05-10', birthday: '1993-06-14', segment: 'Bronze', notes: '', createdAt: '2025-10-05' },
  { id: 10, name: 'Luciana Souza', type: 'person', email: 'luciana@email.com', phone: '(71) 93333-0010', cpfCnpj: '147.258.369-00', city: 'Salvador', state: 'BA', status: 'active', creditLimit: 4000, totalSpent: 9800.50, lastPurchase: '2026-06-04', birthday: '1991-12-01', segment: 'Silver', notes: '', createdAt: '2025-03-18' },
];

type StatusFilter = 'all' | 'active' | 'inactive' | 'blocked';
type SegmentFilter = 'all' | 'Gold' | 'Silver' | 'Bronze';
type TypeFilter = 'all' | 'person' | 'company';

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  const filtered = useMemo(() => {
    let data = [...mockClients];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.cpfCnpj.includes(q) ||
        c.phone.includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') data = data.filter(c => c.status === statusFilter);
    if (segmentFilter !== 'all') data = data.filter(c => c.segment === segmentFilter);
    if (typeFilter !== 'all') data = data.filter(c => c.type === typeFilter);
    return data;
  }, [search, statusFilter, segmentFilter, typeFilter]);

  const getSegmentBadge = (segment: string) => {
    switch (segment) {
      case 'Gold': return <Badge variant="warning">Gold</Badge>;
      case 'Silver': return <Badge variant="info">Silver</Badge>;
      case 'Bronze': return <Badge variant="success">Bronze</Badge>;
      default: return <Badge variant="info">{segment}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="success">Active</Badge>;
      case 'inactive': return <Badge variant="warning">Inactive</Badge>;
      case 'blocked': return <Badge variant="danger">Blocked</Badge>;
      default: return <Badge variant="info">{status}</Badge>;
    }
  };

  const activeClients = mockClients.filter(c => c.status === 'active').length;
  const totalRevenue = mockClients.reduce((sum, c) => sum + c.totalSpent, 0);
  const goldCount = mockClients.filter(c => c.segment === 'Gold').length;
  const avgTicket = mockClients.length > 0 ? (totalRevenue / mockClients.length) : 0;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Clients</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="form-input"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 220, paddingLeft: 30 }}
            />
          </div>
          <select className="form-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)} style={{ width: 120 }}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
          <select className="form-input" value={segmentFilter} onChange={(e) => setSegmentFilter(e.target.value as SegmentFilter)} style={{ width: 120 }}>
            <option value="all">All Segments</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
          <select className="form-input" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as TypeFilter)} style={{ width: 120 }}>
            <option value="all">All Types</option>
            <option value="person">Individual</option>
            <option value="company">Company</option>
          </select>
          <Button variant="primary" size="sm"><Plus size={14} /> Add Client</Button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Total Clients</div>
          <div className="stat-value">{mockClients.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active</div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>{activeClients}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Gold Clients</div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{goldCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg. Ticket</div>
          <div className="stat-value">${avgTicket.toFixed(2)}</div>
        </div>
      </div>

      <Card title={`Clients (${filtered.length})`}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Users size={48} />}
            message="No clients found matching your filters"
            action={<Button variant="primary" size="sm"><Plus size={14} /> Add Client</Button>}
          />
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Contact</th>
                  <th>Segment</th>
                  <th>Total Spent</th>
                  <th>Last Purchase</th>
                  <th>Credit Limit</th>
                  <th>Birthday</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.cpfCnpj}</div>
                    </td>
                    <td>
                      <Badge variant="info">{c.type === 'person' ? 'Individual' : 'Company'}</Badge>
                    </td>
                    <td>
                      <div style={{ fontSize: 13 }}>{c.email}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.phone}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.city}/{c.state}</div>
                    </td>
                    <td>{getSegmentBadge(c.segment)}</td>
                    <td style={{ fontWeight: 600 }}>${c.totalSpent.toFixed(2)}</td>
                    <td>
                      {c.lastPurchase ? (
                        <div style={{ fontSize: 13 }}>{new Date(c.lastPurchase).toLocaleDateString('en-US')}</div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>Never</span>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: c.creditLimit > 0 ? undefined : 'var(--text-muted)' }}>
                        ${c.creditLimit.toFixed(2)}
                      </div>
                    </td>
                    <td>
                      {c.birthday ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Calendar size={12} style={{ color: 'var(--text-muted)' }} />
                          <span style={{ fontSize: 13 }}>{new Date(c.birthday).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>N/A</span>
                      )}
                    </td>
                    <td>{getStatusBadge(c.status)}</td>
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
