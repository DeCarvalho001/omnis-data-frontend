import { useState, useEffect } from 'react';
import { Mail, Inbox, AlertTriangle, Archive, Flag, ChevronRight, Search } from 'lucide-react';

export default function EmailsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [filter, setFilter] = useState('');
  const [stats, setStats] = useState({ unread: 0, urgent: 0, total: 0 });
  const token = localStorage.getItem('omnis_token');

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '200' });
      if (filter) params.set('status', filter);
      const [emailsRes, statsRes] = await Promise.all([
        fetch(`/api/emails?${params}`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/emails/stats', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const emails = await emailsRes.json();
      setItems(emails.data || []);
      setStats(await statsRes.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [filter]);

  const viewEmail = async (email: any) => {
    setSelected(email);
    if (email.status === 'unread') {
      await fetch(`/api/emails/${email.id}/status`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: 'read' }),
      });
      load();
    }
  };

  return (
    <div style={{ display: 'flex', gap: 24, height: 'calc(100vh - 120px)' }}>
      {/* Sidebar */}
      <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div className="page-header" style={{ marginBottom: 12 }}>
          <h1 className="page-title" style={{ fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Mail size={18} /> Emails
          </h1>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <div className="stat-card" style={{ padding: '8px 12px', flex: 1 }}>
            <div className="stat-label" style={{ fontSize: 10 }}>Não lidos</div>
            <div className="stat-value" style={{ fontSize: 18, color: 'var(--primary)' }}>{stats.unread}</div>
          </div>
          <div className="stat-card" style={{ padding: '8px 12px', flex: 1 }}>
            <div className="stat-label" style={{ fontSize: 10 }}>Urgentes</div>
            <div className="stat-value" style={{ fontSize: 18, color: 'var(--danger)' }}>{stats.urgent}</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
          {[
            { key: '', label: 'Todas', icon: Inbox },
            { key: 'unread', label: 'Não lidas', icon: AlertTriangle },
            { key: 'flagged', label: 'Sinalizadas', icon: Flag },
            { key: 'archived', label: 'Arquivadas', icon: Archive },
          ].map(f => (
            <button key={f.key} className={`btn btn-sm ${filter === f.key ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter(f.key)} style={{ fontSize: 11 }}>
              <f.icon size={12} /> {f.label}
            </button>
          ))}
        </div>

        {/* Email list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {loading ? <div className="spinner" /> : items.length === 0 ? (
            <div className="empty-state" style={{ padding: 20 }}><p>Nenhum email</p></div>
          ) : items.map((e) => (
            <div key={e.id} onClick={() => viewEmail(e)}
              style={{
                padding: '10px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                borderBottom: '1px solid var(--border)',
                background: selected?.id === e.id ? 'var(--primary-dim)' : e.status === 'unread' ? 'rgba(99,102,241,0.03)' : 'transparent',
                fontWeight: e.status === 'unread' ? 600 : 400,
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <span style={{ fontSize: 13 }}>{e.fromName || e.fromEmail}</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {e.urgency === 'urgent' && <span className="badge badge-danger">!</span>}
                  {e.status === 'unread' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />}
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {e.subject}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                {new Date(e.receivedAt).toLocaleString('pt-BR')} · {e.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Viewer */}
      <div style={{ flex: 1 }}>
        {selected ? (
          <div className="card" style={{ height: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{selected.subject}</h2>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  <strong>De:</strong> {selected.fromName ? `${selected.fromName} <${selected.fromEmail}>` : selected.fromEmail}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  <strong>Recebido:</strong> {new Date(selected.receivedAt).toLocaleString('pt-BR')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <span className={`badge badge-${selected.urgency === 'urgent' ? 'danger' : 'neutral'}`}>{selected.urgency}</span>
                <span className="badge badge-info">{selected.category}</span>
              </div>
            </div>

            <div style={{ padding: 16, background: 'var(--bg)', borderRadius: 'var(--radius-sm)', fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {selected.body || selected.bodyPlain || '(sem conteúdo)'}
            </div>

            <div style={{ marginTop: 16, display: 'flex', gap: 6 }}>
              <button className="btn btn-ghost btn-sm" onClick={async () => {
                await fetch(`/api/emails/${selected.id}/status`, {
                  method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                  body: JSON.stringify({ status: selected.status === 'archived' ? 'read' : 'archived' }),
                });
                load(); setSelected(null);
              }}><Archive size={14} /> {selected.status === 'archived' ? 'Restaurar' : 'Arquivar'}</button>
              <button className="btn btn-ghost btn-sm" onClick={async () => {
                await fetch(`/api/emails/${selected.id}/status`, {
                  method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                  body: JSON.stringify({ status: 'flagged' }),
                });
                load();
              }}><Flag size={14} /> Sinalizar</button>
            </div>
          </div>
        ) : (
          <div className="empty-state" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Mail size={48} />
            <p>Selecione um email para visualizar</p>
          </div>
        )}
      </div>
    </div>
  );
}
