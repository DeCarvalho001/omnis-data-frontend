import { useState, useMemo } from 'react';
import { Plus, Search, ShoppingCart, FileText, Truck } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: number;
  orderNumber: string;
  type: 'sale' | 'purchase';
  clientName: string;
  supplierName: string | null;
  status: 'pending' | 'approved' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  orderDate: string;
  expectedDate: string | null;
  deliveredDate: string | null;
  invoiceNumber: string | null;
  paymentMethod: string;
  notes: string;
}

const mockOrders: Order[] = [
  { id: 1, orderNumber: 'ORD-2026-0001', type: 'sale', clientName: 'João Silva', supplierName: null, status: 'delivered', total: 458.50, items: [{ productName: 'Arroz Integral 5kg', quantity: 10, unitPrice: 22.90 }, { productName: 'Feijão Preto 1kg', quantity: 20, unitPrice: 8.50 }, { productName: 'Óleo de Soja 900ml', quantity: 15, unitPrice: 6.99 }], orderDate: '2026-05-20', expectedDate: '2026-05-25', deliveredDate: '2026-05-24', invoiceNumber: 'NF-2026-001', paymentMethod: 'Credit Card', notes: '' },
  { id: 2, orderNumber: 'ORD-2026-0002', type: 'purchase', clientName: '-', supplierName: 'Distribuidora ABC', status: 'shipped', total: 12500.00, items: [{ productName: 'Arroz Integral 5kg', quantity: 200, unitPrice: 15.00 }, { productName: 'Feijão Preto 1kg', quantity: 300, unitPrice: 5.20 }, { productName: 'Óleo de Soja 900ml', quantity: 150, unitPrice: 4.10 }], orderDate: '2026-05-28', expectedDate: '2026-06-05', deliveredDate: null, invoiceNumber: 'NF-2026-002', paymentMethod: 'Boleto', notes: 'Compra mensal estoque' },
  { id: 3, orderNumber: 'ORD-2026-0003', type: 'sale', clientName: 'Maria Oliveira', supplierName: null, status: 'approved', total: 189.00, items: [{ productName: 'Papel Higiênico 12un', quantity: 6, unitPrice: 15.90 }, { productName: 'Sabão em Pó 1kg', quantity: 4, unitPrice: 12.90 }, { productName: 'Amaciante 2L', quantity: 3, unitPrice: 9.90 }], orderDate: '2026-06-01', expectedDate: '2026-06-06', deliveredDate: null, invoiceNumber: null, paymentMethod: 'Pix', notes: 'Entrega urgente' },
  { id: 4, orderNumber: 'ORD-2026-0004', type: 'sale', clientName: 'Tech Solutions Ltda', supplierName: null, status: 'pending', total: 3450.00, items: [{ productName: 'Café Torrado 500g', quantity: 50, unitPrice: 14.90 }, { productName: 'Leite em Pó 400g', quantity: 30, unitPrice: 18.50 }, { productName: 'Água Sanitária 1L', quantity: 100, unitPrice: 3.90 }, { productName: 'Detergente Líquido 500ml', quantity: 200, unitPrice: 2.50 }], orderDate: '2026-06-05', expectedDate: '2026-06-10', deliveredDate: null, invoiceNumber: null, paymentMethod: 'Credit Card', notes: 'Pedido corporativo' },
  { id: 5, orderNumber: 'ORD-2026-0005', type: 'purchase', clientName: '-', supplierName: 'Alimentos SP', status: 'pending', total: 8900.00, items: [{ productName: 'Arroz Integral 5kg', quantity: 300, unitPrice: 15.00 }, { productName: 'Café Torrado 500g', quantity: 120, unitPrice: 9.00 }], orderDate: '2026-06-06', expectedDate: '2026-06-12', deliveredDate: null, invoiceNumber: null, paymentMethod: 'Boleto', notes: '' },
  { id: 6, orderNumber: 'ORD-2026-0006', type: 'sale', clientName: 'Carlos Mendes', supplierName: null, status: 'cancelled', total: 45.00, items: [{ productName: 'Água Sanitária 1L', quantity: 5, unitPrice: 3.90 }, { productName: 'Sabão em Pó 1kg', quantity: 2, unitPrice: 12.90 }], orderDate: '2026-05-15', expectedDate: '2026-05-20', deliveredDate: null, invoiceNumber: null, paymentMethod: 'Pix', notes: 'Cancelado por solicitação do cliente' },
  { id: 7, orderNumber: 'ORD-2026-0007', type: 'sale', clientName: 'Ana Beatriz Costa', supplierName: null, status: 'pending', total: 125.40, items: [{ productName: 'Leite em Pó 400g', quantity: 3, unitPrice: 18.50 }, { productName: 'Café Torrado 500g', quantity: 2, unitPrice: 14.90 }, { productName: 'Óleo de Soja 900ml', quantity: 5, unitPrice: 6.99 }], orderDate: '2026-06-07', expectedDate: '2026-06-10', deliveredDate: null, invoiceNumber: null, paymentMethod: 'Pix', notes: '' },
  { id: 8, orderNumber: 'ORD-2026-0008', type: 'purchase', clientName: '-', supplierName: 'Produtos de Limpeza Ltda', status: 'approved', total: 15000.00, items: [{ productName: 'Detergente Líquido 500ml', quantity: 500, unitPrice: 1.30 }, { productName: 'Sabão em Pó 1kg', quantity: 200, unitPrice: 8.00 }, { productName: 'Amaciante 2L', quantity: 150, unitPrice: 5.80 }], orderDate: '2026-06-03', expectedDate: '2026-06-08', deliveredDate: null, invoiceNumber: 'NF-2026-003', paymentMethod: 'Boleto', notes: 'Reposição estoque limpeza' },
  { id: 9, orderNumber: 'ORD-2026-0009', type: 'sale', clientName: 'Distribuidora Norte', supplierName: null, status: 'shipped', total: 8720.00, items: [{ productName: 'Arroz Integral 5kg', quantity: 200, unitPrice: 22.90 }, { productName: 'Feijão Preto 1kg', quantity: 200, unitPrice: 8.50 }, { productName: 'Papel Higiênico 12un', quantity: 100, unitPrice: 15.90 }, { productName: 'Sabão em Pó 1kg', quantity: 50, unitPrice: 12.90 }], orderDate: '2026-05-30', expectedDate: '2026-06-07', deliveredDate: null, invoiceNumber: 'NF-2026-004', paymentMethod: 'Credit Card', notes: 'Envio para Manaus via transportadora' },
  { id: 10, orderNumber: 'ORD-2026-0010', type: 'sale', clientName: 'Fernanda Lima', supplierName: null, status: 'delivered', total: 67.80, items: [{ productName: 'Papel Higiênico 12un', quantity: 2, unitPrice: 15.90 }, { productName: 'Amaciante 2L', quantity: 2, unitPrice: 9.90 }, { productName: 'Água Sanitária 1L', quantity: 4, unitPrice: 3.90 }], orderDate: '2026-05-25', expectedDate: '2026-05-28', deliveredDate: '2026-05-27', invoiceNumber: 'NF-2026-005', paymentMethod: 'Pix', notes: '' },
];

type StatusFilter = 'all' | 'pending' | 'approved' | 'shipped' | 'delivered' | 'cancelled';
type TypeFilter = 'all' | 'sale' | 'purchase';

const STATUS_FLOW: Record<string, { label: string; variant: 'warning' | 'info' | 'success' | 'danger'; icon: any }> = {
  pending: { label: 'Pending', variant: 'warning', icon: 'P' },
  approved: { label: 'Approved', variant: 'info', icon: 'A' },
  shipped: { label: 'Shipped', variant: 'info', icon: 'S' },
  delivered: { label: 'Delivered', variant: 'success', icon: 'D' },
  cancelled: { label: 'Cancelled', variant: 'danger', icon: 'C' },
};

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  const filtered = useMemo(() => {
    let data = [...mockOrders];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(o =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.clientName.toLowerCase().includes(q) ||
        (o.supplierName && o.supplierName.toLowerCase().includes(q)) ||
        (o.invoiceNumber && o.invoiceNumber.toLowerCase().includes(q))
      );
    }
    if (statusFilter !== 'all') data = data.filter(o => o.status === statusFilter);
    if (typeFilter !== 'all') data = data.filter(o => o.type === typeFilter);
    return data;
  }, [search, statusFilter, typeFilter]);

  const statusBarrier = (status: string) => {
    const stages = ['pending', 'approved', 'shipped', 'delivered'];
    if (status === 'cancelled') return null;
    const currentIdx = stages.indexOf(status);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {stages.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 600,
              background: i <= currentIdx ? 'var(--accent)' : 'var(--bg-secondary)',
              color: i <= currentIdx ? '#fff' : 'var(--text-muted)',
              border: i <= currentIdx ? 'none' : '1px solid var(--border)',
            }}>{s[0].toUpperCase()}</div>
            {i < stages.length - 1 && (
              <div style={{
                width: 14, height: 2,
                background: i < currentIdx ? 'var(--accent)' : 'var(--border)',
                borderRadius: 1,
              }} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const totalRevenue = mockOrders.filter(o => o.type === 'sale' && o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;
  const shippedOrders = mockOrders.filter(o => o.status === 'shipped').length;
  const cancelledOrders = mockOrders.filter(o => o.status === 'cancelled').length;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Orders</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="form-input"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 220, paddingLeft: 30 }}
            />
          </div>
          <select className="form-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)} style={{ width: 130 }}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select className="form-input" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as TypeFilter)} style={{ width: 110 }}>
            <option value="all">All Types</option>
            <option value="sale">Sales</option>
            <option value="purchase">Purchases</option>
          </select>
          <Button variant="primary" size="sm"><Plus size={14} /> New Order</Button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>${totalRevenue.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending</div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{pendingOrders}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Shipped</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>{shippedOrders}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Cancelled</div>
          <div className="stat-value" style={{ color: 'var(--danger)' }}>{cancelledOrders}</div>
        </div>
      </div>

      <Card title={`Orders (${filtered.length})`}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart size={48} />}
            message="No orders found matching your filters"
            action={<Button variant="primary" size="sm"><Plus size={14} /> New Order</Button>}
          />
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Type</th>
                  <th>Client / Supplier</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Order Date</th>
                  <th>Estimated Delivery</th>
                  <th>Invoice</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => {
                  const statusMeta = STATUS_FLOW[o.status];
                  return (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 600, fontSize: 13 }}>{o.orderNumber}</td>
                      <td>
                        <Badge variant={o.type === 'sale' ? 'success' : 'info'}>
                          {o.type === 'sale' ? 'Sale' : 'Purchase'}
                        </Badge>
                      </td>
                      <td>
                        <div style={{ fontWeight: 500, fontSize: 13 }}>
                          {o.type === 'sale' ? o.clientName : o.supplierName || '-'}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                          {o.items.length} item{o.items.length !== 1 ? 's' : ''}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {o.items.map(i => i.productName).join(', ')}
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>${o.total.toFixed(2)}</td>
                      <td style={{ fontSize: 13 }}>{new Date(o.orderDate).toLocaleDateString('en-US')}</td>
                      <td>
                        {o.expectedDate ? (
                          <div style={{ fontSize: 13 }}>{new Date(o.expectedDate).toLocaleDateString('en-US')}</div>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>-</span>
                        )}
                        {o.deliveredDate && (
                          <div style={{ fontSize: 11, color: 'var(--success)' }}>Actual: {new Date(o.deliveredDate).toLocaleDateString('en-US')}</div>
                        )}
                      </td>
                      <td>
                        {o.invoiceNumber ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <FileText size={12} style={{ color: 'var(--accent)' }} />
                            <span style={{ fontSize: 12 }}>{o.invoiceNumber}</span>
                          </div>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>Pending</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <Badge variant={statusMeta.variant}>{statusMeta.label}</Badge>
                          {o.status !== 'cancelled' && statusBarrier(o.status)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
