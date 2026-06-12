import { useState, useMemo } from 'react';
import { Plus, Search, CheckCircle, Circle, Flag, User, Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  dueDate: string | null;
  completedDate: string | null;
  assignedTo: string | null;
  category: string;
  estimatedHours: number;
  createdAt: string;
}

const mockTasks: Task[] = [
  { id: 1, title: 'Review monthly inventory report', description: 'Check all stock levels and identify items below minimum threshold', priority: 'high', status: 'in_progress', dueDate: '2026-06-12', completedDate: null, assignedTo: 'Carlos Lima', category: 'Inventory', estimatedHours: 3, createdAt: '2026-06-08' },
  { id: 2, title: 'Update client credit limits', description: 'Re-evaluate credit limits for Gold segment clients based on purchase history', priority: 'medium', status: 'pending', dueDate: '2026-06-15', completedDate: null, assignedTo: 'Ana Souza', category: 'Finance', estimatedHours: 4, createdAt: '2026-06-07' },
  { id: 3, title: 'Process pending order #ORD-2026-0004', description: 'Review and approve the pending order from Tech Solutions', priority: 'high', status: 'pending', dueDate: '2026-06-10', completedDate: null, assignedTo: 'Carlos Lima', category: 'Orders', estimatedHours: 1, createdAt: '2026-06-06' },
  { id: 4, title: 'Contact overdue clients', description: 'Call clients with payments past due date and negotiate', priority: 'high', status: 'pending', dueDate: '2026-06-11', completedDate: null, assignedTo: 'Marina Costa', category: 'Finance', estimatedHours: 5, createdAt: '2026-06-05' },
  { id: 5, title: 'Schedule supplier meeting', description: 'Arrange quarterly meeting with Distribuidora ABC and Alimentos SP', priority: 'low', status: 'completed', dueDate: '2026-06-09', completedDate: '2026-06-08', assignedTo: 'Pedro Santos', category: 'Suppliers', estimatedHours: 2, createdAt: '2026-06-01' },
  { id: 6, title: 'Update website product catalog', description: 'Add new products and update pricing on the online store', priority: 'medium', status: 'in_progress', dueDate: '2026-06-14', completedDate: null, assignedTo: 'Luiza Mendes', category: 'Marketing', estimatedHours: 6, createdAt: '2026-06-03' },
  { id: 7, title: 'Backup database', description: 'Perform full database backup and verify integrity', priority: 'high', status: 'completed', dueDate: '2026-06-07', completedDate: '2026-06-07', assignedTo: 'IT Team', category: 'IT', estimatedHours: 2, createdAt: '2026-06-01' },
  { id: 8, title: 'Prepare quarterly financial report', description: 'Compile income, expenses, and balance sheet for Q2 2026', priority: 'medium', status: 'pending', dueDate: '2026-06-25', completedDate: null, assignedTo: 'Ana Souza', category: 'Finance', estimatedHours: 10, createdAt: '2026-06-02' },
  { id: 9, title: 'Review employee timesheets', description: 'Approve timesheets for May payroll processing', priority: 'low', status: 'completed', dueDate: '2026-06-05', completedDate: '2026-06-04', assignedTo: 'HR Team', category: 'HR', estimatedHours: 2, createdAt: '2026-05-28' },
  { id: 10, title: 'Negotiate new supplier contract', description: 'Discuss pricing and terms with Químicos União for bulk purchase', priority: 'medium', status: 'pending', dueDate: '2026-06-18', completedDate: null, assignedTo: 'Pedro Santos', category: 'Suppliers', estimatedHours: 4, createdAt: '2026-06-06' },
  { id: 11, title: 'Fix stock alert for low inventory items', description: 'Configure automatic alerts when stock falls below minimum', priority: 'low', status: 'in_progress', dueDate: '2026-06-16', completedDate: null, assignedTo: 'IT Team', category: 'IT', estimatedHours: 3, createdAt: '2026-06-04' },
  { id: 12, title: 'Client onboarding - new Gold member', description: 'Set up account, credit, and welcome package for new client', priority: 'high', status: 'pending', dueDate: '2026-06-13', completedDate: null, assignedTo: 'Marina Costa', category: 'Sales', estimatedHours: 3, createdAt: '2026-06-09' },
];

type PriorityFilter = 'all' | 'high' | 'medium' | 'low';
type StatusFilter = 'all' | 'pending' | 'in_progress' | 'completed' | 'cancelled';

const PRIORITY_CONFIG: Record<string, { label: string; variant: 'danger' | 'warning' | 'info' | 'success' }> = {
  high: { label: 'High', variant: 'danger' },
  medium: { label: 'Medium', variant: 'warning' },
  low: { label: 'Low', variant: 'info' },
};

const STATUS_CONFIG: Record<string, { label: string; variant: 'warning' | 'info' | 'success' | 'danger' }> = {
  pending: { label: 'Pending', variant: 'warning' },
  in_progress: { label: 'In Progress', variant: 'info' },
  completed: { label: 'Completed', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'danger' },
};

export default function TasksPage() {
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [assignedFilter, setAssignedFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', dueDate: '', assignedTo: '', category: '' });

  const assignees = useMemo(() => {
    const set = new Set(mockTasks.map(t => t.assignedTo).filter(Boolean));
    return ['all', ...Array.from(set)] as string[];
  }, []);

  const filtered = useMemo(() => {
    let data = [...mockTasks];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.assignedTo && t.assignedTo.toLowerCase().includes(q)) ||
        t.category.toLowerCase().includes(q)
      );
    }
    if (priorityFilter !== 'all') data = data.filter(t => t.priority === priorityFilter);
    if (statusFilter !== 'all') data = data.filter(t => t.status === statusFilter);
    if (assignedFilter !== 'all') data = data.filter(t => t.assignedTo === assignedFilter);
    return data;
  }, [search, priorityFilter, statusFilter, assignedFilter]);

  const pendingCount = mockTasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length;
  const completedCount = mockTasks.filter(t => t.status === 'completed').length;
  const highPriorityCount = mockTasks.filter(t => t.priority === 'high' && t.status !== 'completed').length;
  const overdueCount = mockTasks.filter(t => t.dueDate && t.status !== 'completed' && t.status !== 'cancelled' && new Date(t.dueDate) < new Date()).length;

  const save = () => {
    setShowForm(false);
    setForm({ title: '', description: '', priority: 'medium', dueDate: '', assignedTo: '', category: '' });
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tasks</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="form-input" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 200, paddingLeft: 30 }} />
          </div>
          <select className="form-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)} style={{ width: 120 }}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select className="form-input" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)} style={{ width: 120 }}>
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select className="form-input" value={assignedFilter} onChange={(e) => setAssignedFilter(e.target.value)} style={{ width: 140 }}>
            <option value="all">All Assignees</option>
            {assignees.filter(a => a !== 'all').map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <Button variant="primary" size="sm" onClick={() => setShowForm(true)}><Plus size={14} /> New Task</Button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Active Tasks</div>
          <div className="stat-value">{pendingCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Completed</div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>{completedCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">High Priority</div>
          <div className="stat-value" style={{ color: 'var(--danger)' }}>{highPriorityCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Overdue</div>
          <div className="stat-value" style={{ color: 'var(--danger)' }}>{overdueCount}</div>
        </div>
      </div>

      <Card title={`Tasks (${filtered.length})`}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<CheckCircle size={48} />}
            message="No tasks found matching your filters"
            action={<Button variant="primary" size="sm" onClick={() => setShowForm(true)}><Plus size={14} /> New Task</Button>}
          />
        ) : (
          <div>
            {filtered.map((t) => {
              const priorityCfg = PRIORITY_CONFIG[t.priority];
              const statusCfg = STATUS_CONFIG[t.status];
              const isOverdue = t.dueDate && t.status !== 'completed' && t.status !== 'cancelled' && new Date(t.dueDate) < new Date();

              return (
                <div key={t.id} style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  opacity: t.status === 'completed' ? 0.6 : 1,
                  transition: 'opacity 0.2s',
                }}>
                  <div style={{ marginTop: 2 }}>
                    {t.status === 'completed' ? (
                      <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                    ) : (
                      <Circle size={18} style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 500, fontSize: 14, textDecoration: t.status === 'completed' ? 'line-through' : 'none' }}>
                        {t.title}
                      </span>
                      <Badge variant={priorityCfg.variant}>{priorityCfg.label}</Badge>
                      <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                    </div>
                    {t.description && (
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>{t.description}</div>
                    )}
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                      {t.assignedTo && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <User size={12} />
                          {t.assignedTo}
                        </div>
                      )}
                      {t.dueDate && (
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 4,
                          color: isOverdue ? 'var(--danger)' : undefined,
                          fontWeight: isOverdue ? 600 : undefined,
                        }}>
                          <Calendar size={12} />
                          Due: {new Date(t.dueDate).toLocaleDateString('en-US')}
                          {isOverdue && ' (Overdue!)'}
                        </div>
                      )}
                      <Badge variant="info">{t.category}</Badge>
                      <span>{t.estimatedHours}h estimated</span>
                    </div>
                  </div>
                  {t.status !== 'completed' && (
                    <Button variant="ghost" size="sm">
                      <CheckCircle size={14} /> Complete
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">New Task</h3>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input className="form-input" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select className="form-select" value={form.priority} onChange={(e) => setForm({...form, priority: e.target.value})}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input className="form-input" type="date" value={form.dueDate} onChange={(e) => setForm({...form, dueDate: e.target.value})} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Assigned To</label>
                <select className="form-select" value={form.assignedTo} onChange={(e) => setForm({...form, assignedTo: e.target.value})}>
                  <option value="">Unassigned</option>
                  {assignees.filter(a => a !== 'all').map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                  <option value="">Select...</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Finance">Finance</option>
                  <option value="Orders">Orders</option>
                  <option value="Suppliers">Suppliers</option>
                  <option value="Marketing">Marketing</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button variant="primary" onClick={save}>Create Task</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
