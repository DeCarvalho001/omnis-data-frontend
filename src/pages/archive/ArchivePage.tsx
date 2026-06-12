import { useState } from 'react';
import { Archive, RotateCcw, Search, Filter } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';

interface ArchivedItem {
  id: number;
  type: 'document' | 'contract' | 'client' | 'order' | 'task';
  name: string;
  archivedDate: string;
  originalDate: string;
  archivedBy: string;
  description: string;
}

const mockArchivedItems: ArchivedItem[] = [
  { id: 1, type: 'document', name: 'Q2 Report 2025.pdf', archivedDate: '2026-06-01', originalDate: '2025-07-15', archivedBy: 'System', description: 'Quarterly report from previous year' },
  { id: 2, type: 'contract', name: 'Legacy Agreement - OldCorp', archivedDate: '2026-05-20', originalDate: '2024-01-10', archivedBy: 'Admin', description: 'Expired contract with legacy client' },
  { id: 3, type: 'client', name: 'OldCorp (Inactive)', archivedDate: '2026-05-20', originalDate: '2024-01-10', archivedBy: 'Admin', description: 'Inactive client moved to archive' },
  { id: 4, type: 'order', name: 'PO-2025-0891', archivedDate: '2026-04-15', originalDate: '2025-12-01', archivedBy: 'System', description: 'Completed order from last year' },
  { id: 5, type: 'task', name: 'Migrate legacy database', archivedDate: '2026-03-10', originalDate: '2025-11-20', archivedBy: 'Alice J.', description: 'Completed migration task' },
  { id: 6, type: 'document', name: 'Employee Handbook v2.pdf', archivedDate: '2026-02-28', originalDate: '2024-06-01', archivedBy: 'HR', description: 'Superseded by v3' },
  { id: 7, type: 'contract', name: 'Trial License - StartupZ', archivedDate: '2026-01-15', originalDate: '2025-07-01', archivedBy: 'System', description: 'Expired trial agreement' },
];

const typeConfig: Record<string, { label: string; variant: 'info' | 'success' | 'warning' | 'danger' }> = {
  document: { label: 'Document', variant: 'info' },
  contract: { label: 'Contract', variant: 'success' },
  client: { label: 'Client', variant: 'warning' },
  order: { label: 'Order', variant: 'danger' },
  task: { label: 'Task', variant: 'info' },
};

const types = ['All', 'document', 'contract', 'client', 'order', 'task'];

export default function ArchivePage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [restoring, setRestoring] = useState<number | null>(null);

  const filtered = mockArchivedItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleRestore = (id: number) => {
    setRestoring(id);
    setTimeout(() => {
      setRestoring(null);
      // Simulate: item restored
    }, 1000);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Archive</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="form-input"
              placeholder="Search archive..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 32, width: 200 }}
            />
          </div>
          <div className="btn-group" style={{ display: 'flex', gap: 2 }}>
            {types.map((t) => (
              <Button
                key={t}
                variant={typeFilter === t ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTypeFilter(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Archive size={40} />}
            message="No archived items found"
            action={<Button variant="primary" size="sm">Browse Archive</Button>}
          />
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Archived Date</th>
                  <th>Original Date</th>
                  <th>Archived By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => {
                  const cfg = typeConfig[item.type];
                  return (
                    <tr key={item.id}>
                      <td>
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      </td>
                      <td>
                        <div style={{ fontWeight: 500 }}>{item.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{item.description}</div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-sm)' }}>{item.archivedDate}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: 'var(--font-sm)' }}>{item.originalDate}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-sm)' }}>{item.archivedBy}</td>
                      <td>
                        <Button
                          variant="ghost"
                          size="sm"
                          loading={restoring === item.id}
                          onClick={() => handleRestore(item.id)}
                        >
                          <RotateCcw size={14} /> Restore
                        </Button>
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
