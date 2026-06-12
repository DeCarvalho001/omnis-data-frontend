import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../../services/api';
import {
  Package, DollarSign, AlertTriangle, ShoppingCart,
  TrendingUp, TrendingDown, Inbox, Plus, X, GripVertical,
  Save, RefreshCw, Layout, BarChart3, FileText, Users, Settings2,
  PanelRightClose, PanelRightOpen,
} from 'lucide-react';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';

// ===== TIPOS =====
interface WidgetDef {
  id: string;
  type: string;
  title: string;
  w: number;
  h: number;
  x: number;
  y: number;
  minW?: number;
  minH?: number;
}

interface DashboardLayout {
  widgets: WidgetDef[];
  name: string;
}

// ===== WIDGETS DISPONÍVEIS =====
const AVAILABLE_WIDGETS = [
  { id: 'stats', type: 'stats', title: 'Quick Stats', defaultW: 4, defaultH: 1, icon: BarChart3 },
  { id: 'low_stock', type: 'low_stock', title: 'Low Stock Items', defaultW: 2, defaultH: 2, icon: AlertTriangle },
  { id: 'financial', type: 'financial', title: 'Financial Summary', defaultW: 2, defaultH: 2, icon: DollarSign },
  { id: 'recent_orders', type: 'recent_orders', title: 'Recent Orders', defaultW: 2, defaultH: 2, icon: ShoppingCart },
  { id: 'products_summary', type: 'products_summary', title: 'Products Overview', defaultW: 2, defaultH: 2, icon: Package },
  { id: 'alerts_list', type: 'alerts_list', title: 'Active Alerts', defaultW: 2, defaultH: 2, icon: AlertTriangle },
  { id: 'recent_docs', type: 'recent_docs', title: 'Recent Documents', defaultW: 2, defaultH: 2, icon: FileText },
  { id: 'top_clients', type: 'top_clients', title: 'Top Clients', defaultW: 2, defaultH: 2, icon: Users },
];

// ===== WIDGET RENDERER =====
function WidgetContent({ widget, stats, widgets }: { widget: WidgetDef; stats: any; widgets: any }) {
  switch (widget.type) {
    case 'stats':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, height: '100%' }}>
          {[
            { label: 'Products', value: stats?.totalProducts || 0, color: 'var(--accent)' },
            { label: 'Low Stock', value: stats?.lowStock?.length || 0, color: 'var(--warning)' },
            { label: 'Out of Stock', value: stats?.outOfStock || 0, color: 'var(--danger)' },
            { label: 'Alerts', value: stats?.alerts?.length || 0, color: 'var(--info)' },
          ].map((s) => (
            <div key={s.label} style={{
              background: 'var(--bg-secondary)', borderRadius: 8, padding: '14px 12px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      );

    case 'financial': {
      const w = widgets?.widgets;
      const finData = w ? Object.entries(w).find(([, v]: any) => v?.income !== undefined)?.[1] as any : null;
      if (!finData) return <EmptyState icon={<DollarSign size={24} />} message="No financial data" />;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', justifyContent: 'center' }}>
          {[
            { label: 'Revenue', value: finData.income, color: 'var(--success)' },
            { label: 'Expenses', value: finData.expense, color: 'var(--danger)' },
            { label: 'Balance', value: finData.balance, color: finData.balance >= 0 ? 'var(--success)' : 'var(--danger)', big: true },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</span>
              <span style={{ fontSize: s.big ? 22 : 16, fontWeight: 700, color: s.color }}>
                $ {s.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      );
    }

    case 'low_stock': {
      const items = stats?.lowStock || [];
      if (items.length === 0) return <EmptyState icon={<Package size={24} />} message="All items well stocked" />;
      return (
        <div style={{ overflow: 'auto', height: '100%' }}>
          {items.slice(0, 8).map((item: any) => (
            <div key={item.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 12,
            }}>
              <span style={{ color: 'var(--text-primary)' }}>{item.name}</span>
              <Badge variant={item.quantity < 3 ? 'danger' : 'warning'}>{item.quantity}</Badge>
            </div>
          ))}
        </div>
      );
    }

    default:
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: 13 }}>
          Widget data loading...
        </div>
      );
  }
}

// ===== MAIN DASHBOARD COMPONENT =====
export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [widgets, setWidgets] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<WidgetDef[]>(() => {
    try {
      const saved = localStorage.getItem('omnis_dashboard_layout');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Layout padrão
    return [
      { id: 'stats', type: 'stats', title: 'Quick Stats', w: 4, h: 1, x: 0, y: 0 },
      { id: 'financial', type: 'financial', title: 'Financial Summary', w: 2, h: 2, x: 0, y: 1 },
      { id: 'low_stock', type: 'low_stock', title: 'Low Stock Items', w: 2, h: 2, x: 2, y: 1 },
    ];
  });
  const [editMode, setEditMode] = useState(false);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [saving, setSaving] = useState(false);
  const dragItem = useRef<{ widget: WidgetDef; index: number } | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => {
    Promise.all([
      api.getDashboardStats(),
      api.getDashboardWidgets(),
    ]).then(([s, w]) => {
      setStats(s);
      setWidgets(w);
    }).finally(() => setLoading(false));
  }, []);

  // Salvar layout
  const saveLayout = useCallback(() => {
    setSaving(true);
    localStorage.setItem('omnis_dashboard_layout', JSON.stringify(layout));
    setTimeout(() => setSaving(false), 600);
  }, [layout]);

  // Reset layout
  const resetLayout = useCallback(() => {
    const defaultLayout = [
      { id: 'stats', type: 'stats', title: 'Quick Stats', w: 4, h: 1, x: 0, y: 0 },
      { id: 'financial', type: 'financial', title: 'Financial Summary', w: 2, h: 2, x: 0, y: 1 },
      { id: 'low_stock', type: 'low_stock', title: 'Low Stock Items', w: 2, h: 2, x: 2, y: 1 },
    ];
    setLayout(defaultLayout);
    localStorage.setItem('omnis_dashboard_layout', JSON.stringify(defaultLayout));
  }, []);

  // Adicionar widget
  const addWidget = (def: typeof AVAILABLE_WIDGETS[0]) => {
    const maxY = Math.max(...layout.map(w => w.y + w.h), 0);
    const newWidget: WidgetDef = {
      id: `${def.id}_${Date.now()}`,
      type: def.id,
      title: def.title,
      w: def.defaultW,
      h: def.defaultH,
      x: 0,
      y: maxY,
    };
    const newLayout = [...layout, newWidget];
    setLayout(newLayout);
    localStorage.setItem('omnis_dashboard_layout', JSON.stringify(newLayout));
    setShowAddPanel(false);
  };

  // Remover widget
  const removeWidget = (id: string) => {
    const newLayout = layout.filter(w => w.id !== id);
    setLayout(newLayout);
    localStorage.setItem('omnis_dashboard_layout', JSON.stringify(newLayout));
  };

  // Redimensionar widget (simplificado - cicla entre tamanhos)
  const cycleSize = (widget: WidgetDef) => {
    const sizes = [
      { w: 1, h: 1 }, { w: 2, h: 1 }, { w: 2, h: 2 }, { w: 3, h: 2 }, { w: 4, h: 2 },
    ];
    const currentIdx = sizes.findIndex(s => s.w === widget.w && s.h === widget.h);
    const nextIdx = (currentIdx + 1) % sizes.length;
    const newLayout = layout.map(w =>
      w.id === widget.id ? { ...w, w: sizes[nextIdx].w, h: sizes[nextIdx].h } : w
    );
    setLayout(newLayout);
    localStorage.setItem('omnis_dashboard_layout', JSON.stringify(newLayout));
  };

  // ===== DRAG & DROP =====
  const handleDragStart = (widget: WidgetDef, index: number) => {
    dragItem.current = { widget, index };
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const newLayout = [...layout];
    const dragItemContent = newLayout[dragItem.current.index];
    newLayout.splice(dragItem.current.index, 1);
    newLayout.splice(dragOverItem.current, 0, dragItemContent);
    setLayout(newLayout);
    localStorage.setItem('omnis_dashboard_layout', JSON.stringify(newLayout));
    dragItem.current = null;
    dragOverItem.current = null;
  };

  if (loading) return <div className="spinner" />;

  // Calcular grid columns baseado nos widgets
  const gridCols = 4;
  const columnWidth = `${100 / gridCols}%`;

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {editMode && (
            <>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowAddPanel(!showAddPanel)}
              >
                <Plus size={14} /> Add Widget
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={resetLayout}
                title="Reset to default layout"
              >
                <RefreshCw size={14} />
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={saveLayout}
                disabled={saving}
              >
                <Save size={14} /> {saving ? 'Saved!' : 'Save'}
              </button>
            </>
          )}
          <button
            className={`btn ${editMode ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => { setEditMode(!editMode); setShowAddPanel(false); }}
          >
            <Layout size={14} /> {editMode ? 'Done' : 'Customize'}
          </button>
        </div>
      </div>

      {/* Add Widget Panel */}
      {showAddPanel && (
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 12, padding: 20, marginBottom: 20,
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
            Available Widgets
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
            {AVAILABLE_WIDGETS.filter(
              def => !layout.some(w => w.type === def.id)
            ).map((def) => {
              const Icon = def.icon;
              return (
                <button
                  key={def.id}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'flex-start', gap: 8, padding: '10px 12px' }}
                  onClick={() => addWidget(def)}
                >
                  <Icon size={14} />
                  <span>{def.title}</span>
                </button>
              );
            })}
            {AVAILABLE_WIDGETS.filter(def => !layout.some(w => w.type === def.id)).length === 0 && (
              <div style={{ fontSize: 13, color: 'var(--text-muted)', padding: 8 }}>
                All widgets are already on your dashboard!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dashboard Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gap: 16,
        gridAutoRows: 'minmax(120px, auto)',
        position: 'relative',
      }}>
        {layout.map((widget, index) => {
          const widgetDef = AVAILABLE_WIDGETS.find(w => w.id === widget.type);
          const Icon = widgetDef?.icon || PanelRightClose;

          return (
            <div
              key={widget.id}
              draggable={editMode}
              onDragStart={() => handleDragStart(widget, index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              style={{
                gridColumn: `span ${Math.min(widget.w, gridCols)}`,
                gridRow: `span ${widget.h}`,
                background: 'var(--bg-card)',
                border: editMode ? '2px dashed var(--accent)' : '1px solid var(--border)',
                borderRadius: 12,
                padding: 16,
                cursor: editMode ? 'grab' : 'default',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Widget Header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 12, gap: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                  {editMode && (
                    <GripVertical size={14} style={{ color: 'var(--text-muted)', cursor: 'grab', flexShrink: 0 }} />
                  )}
                  <Icon size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <h3 style={{
                    fontSize: 13, fontWeight: 600, color: 'var(--text-primary)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {widget.title}
                  </h3>
                </div>
                {editMode && (
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '4px' }}
                      onClick={() => cycleSize(widget)}
                      title="Resize widget"
                    >
                      <PanelRightOpen size={12} />
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '4px', color: 'var(--danger)' }}
                      onClick={() => removeWidget(widget.id)}
                      title="Remove widget"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>

              {/* Widget Content */}
              <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
                <WidgetContent widget={widget} stats={stats} widgets={widgets} />
              </div>
            </div>
          );
        })}

        {/* Empty state when no widgets */}
        {layout.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            padding: 48,
            textAlign: 'center',
            color: 'var(--text-muted)',
          }}>
            <Layout size={48} style={{ opacity: 0.3, marginBottom: 12 }} />
            <p style={{ fontSize: 14, marginBottom: 16 }}>Your dashboard is empty!</p>
            <button className="btn btn-primary" onClick={() => setShowAddPanel(true)}>
              <Plus size={14} /> Add your first widget
            </button>
          </div>
        )}
      </div>

      {/* Edit mode indicator */}
      {editMode && (
        <div style={{
          marginTop: 16, padding: '10px 16px',
          background: 'var(--accent-light)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: 8,
          fontSize: 12,
          color: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <Settings2 size={14} />
          <span>
            <strong>Customize mode:</strong> Drag to reorder • Click resize to change size • Click X to remove • Add widgets from the panel
          </span>
        </div>
      )}
    </div>
  );
}
