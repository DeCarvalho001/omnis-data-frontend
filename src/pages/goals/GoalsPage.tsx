import { useState } from 'react';
import { Target, CheckCircle, Circle, Plus, TrendingUp } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';

interface KeyResult {
  id: number;
  title: string;
  current: number;
  target: number;
  unit: string;
}

interface Goal {
  id: number;
  title: string;
  description: string;
  quarter: string;
  category: 'Revenue' | 'Product' | 'Customers' | 'Operations';
  keyResults: KeyResult[];
}

const mockGoals: Goal[] = [
  {
    id: 1,
    title: 'Increase Q3 Revenue',
    description: 'Achieve 25% revenue growth through upselling and new client acquisition',
    quarter: 'Q3 2026',
    category: 'Revenue',
    keyResults: [
      { id: 1, title: 'New recurring revenue (MRR)', current: 18500, target: 25000, unit: 'USD' },
      { id: 2, title: 'Enterprise deals closed', current: 3, target: 8, unit: 'deals' },
      { id: 3, title: 'Revenue from upsells', current: 4200, target: 10000, unit: 'USD' },
    ],
  },
  {
    id: 2,
    title: 'Improve Product Quality',
    description: 'Reduce bug reports and improve NPS score for the platform',
    quarter: 'Q3 2026',
    category: 'Product',
    keyResults: [
      { id: 4, title: 'Bug report count (monthly)', current: 34, target: 10, unit: 'reports' },
      { id: 5, title: 'NPS score', current: 42, target: 60, unit: 'points' },
      { id: 6, title: 'Feature adoption rate', current: 56, target: 80, unit: '%' },
    ],
  },
  {
    id: 3,
    title: 'Expand Customer Base',
    description: 'Grow active customer count and reduce churn',
    quarter: 'Q3 2026',
    category: 'Customers',
    keyResults: [
      { id: 7, title: 'New active customers', current: 45, target: 120, unit: 'customers' },
      { id: 8, title: 'Monthly churn rate', current: 5.2, target: 2.5, unit: '%' },
      { id: 9, title: 'Customer satisfaction score', current: 3.8, target: 4.5, unit: '/5' },
    ],
  },
];

function ProgressBar({ current, target, color }: { current: number; target: number; color: string }) {
  const pct = Math.min(Math.round((current / target) * 100), 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          flex: 1,
          height: 8,
          borderRadius: 4,
          background: 'var(--bg-primary)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            borderRadius: 4,
            background: color,
            transition: 'width 0.4s ease',
          }}
        />
      </div>
      <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--text-primary)', minWidth: 36, textAlign: 'right' }}>
        {pct}%
      </span>
    </div>
  );
}

function getCategoryColor(cat: Goal['category']): string {
  switch (cat) {
    case 'Revenue': return 'var(--success)';
    case 'Product': return 'var(--accent)';
    case 'Customers': return 'var(--warning)';
    case 'Operations': return 'var(--danger)';
  }
}

function getCategoryBadgeVariant(cat: Goal['category']): 'success' | 'info' | 'warning' | 'danger' {
  switch (cat) {
    case 'Revenue': return 'success';
    case 'Product': return 'info';
    case 'Customers': return 'warning';
    case 'Operations': return 'danger';
  }
}

export default function GoalsPage() {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Revenue', 'Product', 'Customers', 'Operations'];
  const filtered = filter === 'All' ? mockGoals : mockGoals.filter((g) => g.category === filter);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Goals & OKRs</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div className="btn-group" style={{ display: 'flex', gap: 2 }}>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <Button variant="primary" size="sm">
            <Plus size={14} /> New Goal
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Target size={48} />}
          message="No goals defined yet. Start by creating a new OKR."
          action={<Button variant="primary"><Plus size={14} /> Create Goal</Button>}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 16 }}>
          {filtered.map((goal) => {
            const overallPct = Math.round(
              goal.keyResults.reduce((sum, kr) => sum + Math.min(kr.current / kr.target, 1), 0) /
                goal.keyResults.length *
                100
            );
            const color = getCategoryColor(goal.category);
            return (
              <Card key={goal.id} title={goal.title}>
                <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Badge variant={getCategoryBadgeVariant(goal.category)}>{goal.category}</Badge>
                  <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)' }}>{goal.quarter}</span>
                </div>
                <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 16 }}>
                  {goal.description}
                </p>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Overall Progress
                    </span>
                    <span style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color }}>{overallPct}%</span>
                  </div>
                  <ProgressBar current={overallPct} target={100} color={color} />
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>
                    Key Results
                  </div>
                  {goal.keyResults.map((kr) => {
                    const krPct = Math.round(Math.min((kr.current / kr.target) * 100, 100));
                    return (
                      <div
                        key={kr.id}
                        style={{
                          padding: '8px 0',
                          borderBottom: '1px solid var(--border)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                            {krPct >= 100 ? (
                              <CheckCircle size={14} style={{ color: 'var(--success)' }} />
                            ) : (
                              <Circle size={14} style={{ color: 'var(--text-muted)' }} />
                            )}
                            {kr.title}
                          </div>
                          <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>
                            {kr.current} / {kr.target} {kr.unit}
                          </span>
                        </div>
                        <ProgressBar current={kr.current} target={kr.target} color={krPct >= 100 ? 'var(--success)' : color} />
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
