import { useState } from 'react';
import { FileText, Plus, AlertTriangle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';

interface Contract {
  id: number;
  name: string;
  client: string;
  value: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expiring' | 'expired';
  description: string;
}

const mockContracts: Contract[] = [
  { id: 1, name: 'Enterprise License - ABC Corp', client: 'ABC Corporation', value: 25000, startDate: '2026-01-15', endDate: '2026-12-31', status: 'active', description: 'Annual enterprise software license' },
  { id: 2, name: 'Consulting Services - XYZ Ltd', client: 'XYZ Ltd', value: 12000, startDate: '2026-03-01', endDate: '2026-06-15', status: 'expiring', description: 'Q2 consulting engagement' },
  { id: 3, name: 'Support Contract - Beta Inc', client: 'Beta Inc', value: 8000, startDate: '2025-06-01', endDate: '2026-05-31', status: 'expired', description: 'Annual support and maintenance' },
  { id: 4, name: 'Data Analytics Package - Delta Co', client: 'Delta Co', value: 18000, startDate: '2026-04-01', endDate: '2027-03-31', status: 'active', description: 'Data platform subscription' },
  { id: 5, name: 'Cloud Migration - Gamma LLC', client: 'Gamma LLC', value: 35000, startDate: '2026-05-01', endDate: '2026-07-20', status: 'expiring', description: 'AWS migration project' },
  { id: 6, name: 'Training Program - Epsilon SA', client: 'Epsilon SA', value: 5000, startDate: '2025-01-01', endDate: '2025-12-31', status: 'expired', description: 'Staff training subscription' },
];

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
  active: { label: 'Active', variant: 'success' },
  expiring: { label: 'Expiring Soon', variant: 'warning' },
  expired: { label: 'Expired', variant: 'danger' },
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
}

export default function ContractsPage() {
  const [filter, setFilter] = useState<string>('All');
  const filters = ['All', 'Active', 'Expiring', 'Expired'];

  const filtered = filter === 'All' ? mockContracts : mockContracts.filter((c) => c.status === filter.toLowerCase());

  const expiringSoon = mockContracts.filter((c) => c.status === 'expiring');

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Contracts</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div className="btn-group" style={{ display: 'flex', gap: 2 }}>
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
          <Button variant="primary" size="sm">
            <Plus size={14} /> New Contract
          </Button>
        </div>
      </div>

      {/* Expiring soon alert */}
      {expiringSoon.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'color-mix(in srgb, var(--warning) 12%, transparent)',
            border: '1px solid color-mix(in srgb, var(--warning) 30%, transparent)',
            marginBottom: 16,
          }}
        >
          <AlertTriangle size={18} style={{ color: 'var(--warning)', flexShrink: 0 }} />
          <div>
            <span style={{ fontWeight: 600, fontSize: 'var(--font-sm)' }}>
              {expiringSoon.length} contract{expiringSoon.length > 1 ? 's' : ''} expiring soon
            </span>
            <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginLeft: 8 }}>
              {expiringSoon.map((c) => c.name).join(', ')}
            </span>
          </div>
        </div>
      )}

      <Card>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<FileText size={40} />}
            message="No contracts found"
            action={<Button variant="primary" size="sm"><Plus size={14} /> Create Contract</Button>}
          />
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Contract Name</th>
                  <th>Client</th>
                  <th>Value</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((contract) => {
                  const cfg = statusConfig[contract.status];
                  return (
                    <tr key={contract.id} style={{ cursor: 'pointer' }}>
                      <td style={{ fontWeight: 500 }}>{contract.name}</td>
                      <td>{contract.client}</td>
                      <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatCurrency(contract.value)}</td>
                      <td>{contract.startDate}</td>
                      <td>
                        <span style={{ color: contract.status === 'expiring' ? 'var(--warning)' : contract.status === 'expired' ? 'var(--danger)' : 'var(--text-primary)' }}>
                          {contract.endDate}
                        </span>
                        {contract.status === 'expiring' && (
                          <span style={{ fontSize: 10, color: 'var(--warning)', marginLeft: 4 }}>
                            (soon)
                          </span>
                        )}
                      </td>
                      <td>
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
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
