import { useState, useMemo } from 'react';
import { AlertTriangle, Bell, BellOff, CheckCircle, Search, Settings, XCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

interface AlertAction {
  label: string;
  type: 'dismiss' | 'investigate' | 'resolve' | 'notify';
}

interface Alert {
  id: number;
  type: 'stock' | 'payment' | 'contract' | 'system';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  message: string;
  source: string;
  isRead: boolean;
  isResolved: boolean;
  isConfigurable: boolean;
  actions: AlertAction[];
  createdAt: string;
  resolvedAt: string | null;
}

const alertTypeConfig: Record<string, { label: string; variant: 'danger' | 'warning' | 'info' | 'success' }> = {
  stock: { label: 'Stock', variant: 'warning' },
  payment: { label: 'Payment', variant: 'danger' },
  contract: { label: 'Contract', variant: 'info' },
  system: { label: 'System', variant: 'success' },
};

const severityConfig: Record<string, { label: string; variant: 'danger' | 'warning' | 'info' | 'success' }> = {
  critical: { label: 'Critical', variant: 'danger' },
  high: { label: 'High', variant: 'warning' },
  medium: { label: 'Medium', variant: 'info' },
  low: { label: 'Low', variant: 'success' },
};

const mockAlerts: Alert[] = [
  { id: 1, type: 'stock', severity: 'critical', title: 'Feijão Preto 1kg out of stock', message: 'Stock is at 0 units. Minimum required: 30. Immediate replenishment needed.', source: 'Products', isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: 'Create Purchase Order', type: 'investigate' }, { label: 'Dismiss', type: 'dismiss' }], createdAt: '2026-06-10T08:00:00Z', resolvedAt: null },
  { id: 2, type: 'stock', severity: 'high', title: 'Leite em Pó 400g low stock', message: 'Stock is at 5 units. Minimum required: 15. Order recommended soon.', source: 'Products', isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: 'View Product', type: 'investigate' }, { label: 'Dismiss', type: 'dismiss' }], createdAt: '2026-06-10T07:30:00Z', resolvedAt: null },
  { id: 3, type: 'payment', severity: 'critical', title: 'Client Carlos Mendes - Overdue invoice', message: 'Invoice #ORD-2026-0006 ($45.00) is 21 days overdue. Payment expected.', source: 'Accounts Receivable', isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: 'Contact Client', type: 'notify' }, { label: 'Mark as Collected', type: 'resolve' }], createdAt: '2026-06-09T14:00:00Z', resolvedAt: null },
  { id: 4, type: 'payment', severity: 'medium', title: 'Upcoming payments due in 5 days', message: '3 invoices totaling $18,250.00 are due within the next 5 days. Ensure sufficient funds.', source: 'Accounts Payable', isRead: true, isResolved: false, isConfigurable: true, actions: [{ label: 'View Invoices', type: 'investigate' }, { label: 'Dismiss', type: 'dismiss' }], createdAt: '2026-06-08T10:00:00Z', resolvedAt: null },
  { id: 5, type: 'contract', severity: 'high', title: 'Supplier contract expiring soon', message: 'Contract with Distribuidora ABC expires in 15 days. Review and renew terms.', source: 'Contracts', isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: 'Review Contract', type: 'investigate' }, { label: 'Contact Supplier', type: 'notify' }], createdAt: '2026-06-07T09:00:00Z', resolvedAt: null },
  { id: 6, type: 'system', severity: 'low', title: 'Daily backup completed successfully', message: 'Full database backup completed at 02:00 AM. Duration: 12 minutes. Size: 2.4 GB.', source: 'IT', isRead: true, isResolved: true, isConfigurable: false, actions: [], createdAt: '2026-06-10T02:15:00Z', resolvedAt: '2026-06-10T02:15:00Z' },
  { id: 7, type: 'system', severity: 'medium', title: 'API rate limit approaching', message: 'API usage at 75% of daily limit. 25000 requests used out of 33333.', source: 'IT', isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: 'View Usage', type: 'investigate' }, { label: 'Dismiss', type: 'dismiss' }], createdAt: '2026-06-10T06:00:00Z', resolvedAt: null },
  { id: 8, type: 'stock', severity: 'critical', title: 'Multiple products below minimum stock', message: '3 products (Arroz, Detergente, Óleo) are below minimum stock levels. Review recommended.', source: 'Products', isRead: true, isResolved: false, isConfigurable: true, actions: [{ label: 'View Products', type: 'investigate' }, { label: 'Dismiss', type: 'dismiss' }], createdAt: '2026-06-09T16:00:00Z', resolvedAt: null },
  { id: 9, type: 'contract', severity: 'low', title: 'Client contract renewal reminder', message: 'Gold client Tech Solutions Ltda contract renewal available in 30 days.', source: 'Contracts', isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: 'View Contract', type: 'investigate' }, { label: 'Dismiss', type: 'dismiss' }], createdAt: '2026-06-08T11:00:00Z', resolvedAt: null },
  { id: 10, type: 'payment', severity: 'high', title: 'Client credit limit exceeded', message: 'Client Comercial ABC Ltda has exceeded credit limit. Block further orders.', source: 'Accounts Receivable', isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: 'Block Client', type: 'resolve' }, { label: 'Review Limit', type: 'investigate' }], createdAt: '2026-06-07T15:00:00Z', resolvedAt: null },
];

type TypeFilter = 'all' | 'stock' | 'payment' | 'contract' | 'system';
type SeverityFilter = 'all' | 'critical' | 'high' | 'medium' | 'low';
type StatusFilterValue = 'all' | 'unread' | 'resolved' | 'active';

export default function AlertsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>('all');

  const filtered = useMemo(() => {
    let data = [...mockAlerts];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.message.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== 'all') data = data.filter(a => a.type === typeFilter);
    if (severityFilter !== 'all') data = data.filter(a => a.severity === severityFilter);
    if (statusFilter === 'unread') data = data.filter(a => !a.isRead);
    else if (statusFilter === 'resolved') data = data.filter(a => a.isResolved);
    else if (statusFilter === 'active') data = data.filter(a => !a.isResolved);
    return data;
  }, [search, typeFilter, severityFilter, statusFilter]);

  const [alerts, setAlerts] = useState(mockAlerts);

  const handleAction = (alertId: number, actionType: string) => {
    setAlerts(prev => prev.map(a => {
      if (a.id !== alertId) return a;
      if (actionType === 'dismiss') return { ...a, isRead: true };
      if (actionType === 'resolve') return { ...a, isResolved: true, isRead: true, resolvedAt: new Date().toISOString() };
      return { ...a, isRead: true };
    }));
  };

  const criticalCount = mockAlerts.filter(a => a.severity === 'critical' && !a.isResolved).length;
  const unreadCount = mockAlerts.filter(a => !a.isRead).length;
  const activeCount = mockAlerts.filter(a => !a.isResolved).length;
  const stockAlerts = mockAlerts.filter(a => a.type === 'stock' && !a.isResolved).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'stock': return <Bell size={16} />;
      case 'payment': return <AlertTriangle size={16} />;
      case 'contract': return <BellOff size={16} />;
      case 'system': return <Settings size={16} />;
      default: return <Bell size={16} />;
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Alerts</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="form-input" placeholder="Search alerts..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 220, paddingLeft: 30 }} />
          </div>
          <select className="form-input" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as TypeFilter)} style={{ width: 120 }}>
            <option value="all">All Types</option>
            <option value="stock">Stock</option>
            <option value="payment">Payment</option>
            <option value="contract">Contract</option>
            <option value="system">System</option>
          </select>
          <select className="form-input" value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value as SeverityFilter)} style={{ width: 120 }}>
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select className="form-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilterValue)} style={{ width: 120 }}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="unread">Unread</option>
            <option value="resolved">Resolved</option>
          </select>
          <Button variant="secondary" size="sm"><Settings size={14} /> Configure</Button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Active Alerts</div>
          <div className="stat-value" style={{ color: 'var(--danger)' }}>{activeCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Critical</div>
          <div className="stat-value" style={{ color: 'var(--danger)' }}>{criticalCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Unread</div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{unreadCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Stock Alerts</div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{stockAlerts}</div>
        </div>
      </div>

      <Card title={`Alerts (${filtered.length})`}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<CheckCircle size={48} />}
            message="No alerts found matching your filters"
            action={<Button variant="primary" size="sm">Configure Alerts</Button>}
          />
        ) : (
          <div>
            {filtered.map((a) => {
              const displayedAlert = alerts.find(al => al.id === a.id) || a;
              const typeCfg = alertTypeConfig[displayedAlert.type];
              const severityCfg = severityConfig[displayedAlert.severity];

              return (
                <div key={displayedAlert.id} style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  opacity: displayedAlert.isResolved ? 0.45 : displayedAlert.isRead ? 0.7 : 1,
                  borderLeft: displayedAlert.severity === 'critical' ? '3px solid var(--danger)' :
                              displayedAlert.severity === 'high' ? '3px solid var(--warning)' : '3px solid transparent',
                  transition: 'all 0.2s',
                  background: displayedAlert.isRead ? 'transparent' : 'var(--accent-light)',
                  borderRadius: '0 4px 4px 0',
                  marginBottom: 2,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: displayedAlert.severity === 'critical' ? 'rgba(239,68,68,0.15)' :
                                displayedAlert.severity === 'high' ? 'rgba(245,158,11,0.15)' :
                                'var(--bg-secondary)',
                    color: displayedAlert.severity === 'critical' ? 'var(--danger)' :
                           displayedAlert.severity === 'high' ? 'var(--warning)' :
                           'var(--text-muted)',
                    flexShrink: 0,
                  }}>
                    {getTypeIcon(displayedAlert.type)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{displayedAlert.title}</span>
                      <Badge variant={typeCfg.variant}>{typeCfg.label}</Badge>
                      <Badge variant={severityCfg.variant}>{severityCfg.label}</Badge>
                      {displayedAlert.isResolved && <Badge variant="success">Resolved</Badge>}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>{displayedAlert.message}</div>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                      <span>Source: {displayedAlert.source}</span>
                      <span>{new Date(displayedAlert.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      {displayedAlert.resolvedAt && (
                        <span>Resolved: {new Date(displayedAlert.resolvedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      )}
                    </div>
                    {!displayedAlert.isResolved && displayedAlert.actions.length > 0 && (
                      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                        {displayedAlert.actions.map((action, idx) => (
                          <Button
                            key={idx}
                            variant={action.type === 'resolve' ? 'primary' : action.type === 'investigate' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => handleAction(displayedAlert.id, action.type)}
                          >
                            {action.type === 'resolve' ? <CheckCircle size={12} /> :
                             action.type === 'dismiss' ? <XCircle size={12} /> :
                             action.type === 'notify' ? <Bell size={12} /> : null}
                            {' '}{action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
