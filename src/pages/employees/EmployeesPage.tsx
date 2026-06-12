import { useState } from 'react';
import { Users, Clock, Plus, Search } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: 'active' | 'on-leave' | 'inactive';
  hireDate: string;
}

const mockEmployees: Employee[] = [
  { id: 1, name: 'Alice Johnson', position: 'Software Engineer', department: 'Engineering', email: 'alice@omnisdata.com', phone: '+1 (555) 123-4567', status: 'active', hireDate: '2024-03-15' },
  { id: 2, name: 'Bob Smith', position: 'Product Manager', department: 'Product', email: 'bob@omnisdata.com', phone: '+1 (555) 234-5678', status: 'active', hireDate: '2023-11-01' },
  { id: 3, name: 'Carol Davis', position: 'UX Designer', department: 'Design', email: 'carol@omnisdata.com', phone: '+1 (555) 345-6789', status: 'on-leave', hireDate: '2024-06-10' },
  { id: 4, name: 'David Lee', position: 'Data Analyst', department: 'Analytics', email: 'david@omnisdata.com', phone: '+1 (555) 456-7890', status: 'active', hireDate: '2025-01-20' },
  { id: 5, name: 'Emma Wilson', position: 'Sales Representative', department: 'Sales', email: 'emma@omnisdata.com', phone: '+1 (555) 567-8901', status: 'inactive', hireDate: '2024-09-05' },
  { id: 6, name: 'Frank Brown', position: 'DevOps Engineer', department: 'Engineering', email: 'frank@omnisdata.com', phone: '+1 (555) 678-9012', status: 'active', hireDate: '2025-04-12' },
];

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
  active: { label: 'Active', variant: 'success' },
  'on-leave': { label: 'On Leave', variant: 'warning' },
  inactive: { label: 'Inactive', variant: 'danger' },
};

const departments = ['All', 'Engineering', 'Product', 'Design', 'Analytics', 'Sales'];

export default function EmployeesPage() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);

  const filtered = mockEmployees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept = department === 'All' || e.department === department;
    return matchesSearch && matchesDept;
  });

  const handleClock = () => {
    if (clockedIn) {
      setClockedIn(false);
    } else {
      setClockedIn(true);
      setClockTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Employees</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button variant="primary" size="sm" onClick={handleClock}>
            <Clock size={14} /> {clockedIn ? 'Clock Out' : 'Clock In'}
          </Button>
          <Button variant="primary" size="sm">
            <Plus size={14} /> Add Employee
          </Button>
        </div>
      </div>

      {/* Clock status indicator */}
      {clockedIn && clockTime && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'color-mix(in srgb, var(--success) 12%, transparent)',
            border: '1px solid color-mix(in srgb, var(--success) 30%, transparent)',
            marginBottom: 16,
          }}
        >
          <Clock size={16} style={{ color: 'var(--success)' }} />
          <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>
            Clocked in at {clockTime}
          </span>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 300 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            className="form-input"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 32, width: '100%' }}
          />
        </div>
        <div className="btn-group" style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {departments.map((d) => (
            <Button
              key={d}
              variant={department === d ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setDepartment(d)}
            >
              {d}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Users size={40} />}
            message="No employees found"
            action={<Button variant="primary" size="sm"><Plus size={14} /> Add Employee</Button>}
          />
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp) => {
                  const cfg = statusConfig[emp.status];
                  return (
                    <tr key={emp.id}>
                      <td style={{ fontWeight: 500 }}>{emp.name}</td>
                      <td>{emp.position}</td>
                      <td>{emp.department}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-sm)' }}>{emp.email}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: 'var(--font-sm)' }}>{emp.phone}</td>
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
