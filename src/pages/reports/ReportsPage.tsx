import { useState } from 'react';
import { FileText, Download, Filter, BarChart3, TrendingUp, Users, DollarSign, Package } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';

interface ReportType {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  count: number;
  lastGenerated: string;
}

const reportTypes: ReportType[] = [
  { id: 'sales', icon: <TrendingUp size={24} />, title: 'Sales Report', description: 'Revenue, orders, and sales performance', count: 12, lastGenerated: '2026-06-10' },
  { id: 'products', icon: <Package size={24} />, title: 'Products Report', description: 'Inventory levels, top sellers, stock alerts', count: 8, lastGenerated: '2026-06-09' },
  { id: 'clients', icon: <Users size={24} />, title: 'Clients Report', description: 'Client acquisition, retention, demographics', count: 6, lastGenerated: '2026-06-08' },
  { id: 'financial', icon: <DollarSign size={24} />, title: 'Financial Report', description: 'P&L, cash flow, expenses, revenue breakdown', count: 10, lastGenerated: '2026-06-07' },
];

const periods = ['Today', 'This Week', 'This Month', 'This Quarter', 'This Year', 'Custom'];

export default function ReportsPage() {
  const [period, setPeriod] = useState('This Month');
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExport = (id: string) => {
    setExporting(id);
    setTimeout(() => setExporting(null), 1500);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reports</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Filter size={14} style={{ color: 'var(--text-muted)' }} />
          <select
            className="form-select"
            style={{ width: 160 }}
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            {periods.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {reportTypes.length === 0 ? (
        <EmptyState
          icon={<BarChart3 size={48} />}
          message="No reports available yet"
          action={<Button variant="primary">Generate Report</Button>}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {reportTypes.map((report) => (
            <Card key={report.id} title={report.title}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-md)',
                    background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)',
                    flexShrink: 0,
                  }}
                >
                  {report.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 4 }}>
                    {report.description}
                  </div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 'var(--font-sm)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                      <FileText size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                      {report.count} reports
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      Last: {report.lastGenerated}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button
                  variant="primary"
                  size="sm"
                  loading={exporting === report.id}
                  onClick={() => handleExport(report.id)}
                >
                  <Download size={14} /> Export
                </Button>
                <Button variant="secondary" size="sm">
                  <FileText size={14} /> View
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
