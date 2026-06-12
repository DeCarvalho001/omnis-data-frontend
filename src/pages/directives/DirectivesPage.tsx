import { useState, useEffect } from 'react';
import { MessageSquare, AlertTriangle, CheckCircle, Clock, User, Send, ThumbsDown } from 'lucide-react';

export default function DirectivesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', assignedTo: '', priority: 'medium', source: 'verbal', dueDate: '' });
  const token = localStorage.getItem('omnis_token');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/directives', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setItems(data.data || []);
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    await fetch('/api/directives', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    setForm({ title: '', description: '', assignedTo: '', priority: 'medium', source: 'verbal', dueDate: '' });
    load();
  };

  const acknowledge = async (id: number) => {
    await fetch(`/api/directives/${id}/acknowledge`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } });
    load();
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MessageSquare size={22} /> Ordens e Diretivas
        </h1>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}><Send size={14} /> Nova Ordem</button>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Registre ordens verbais, ordens de reunião, e-mails de superiores — tudo vira registro com data, origem e responsável.
        Se mudarem a versão da história, o sistema mostra quem disse o quê e quando.
      </p>

      <div className="card">
        {loading ? <div className="spinner" /> : items.length === 0 ? (
          <div className="empty-state"><MessageSquare size={48} /><p>Nenhuma ordem registrada</p></div>
        ) : (
          <div>
            {items.map((d) => (
              <div key={d.id} style={{
                padding: '14px 16px', borderBottom: '1px solid var(--border)',
                borderLeft: `3px solid ${d.status === 'disputed' ? 'var(--danger)' : d.priority === 'urgent' || d.priority === 'high' ? 'var(--warning)' : 'var(--primary)'}`,
                marginBottom: 4, background: d.status === 'disputed' ? 'rgba(239,68,68,0.04)' : 'transparent',
                borderRadius: 'var(--radius-sm)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{d.title}</div>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <span className={`badge badge-${d.priority === 'urgent' ? 'danger' : d.priority === 'high' ? 'warning' : 'neutral'}`}>
                      {d.priority}
                    </span>
                    <span className={`badge badge-${d.status === 'completed' ? 'success' : d.status === 'disputed' ? 'danger' : 'warning'}`}>
                      {d.status}
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{d.description}</div>

                <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                  {d.issuer?.name && <span>🗣️ {d.issuer.name}</span>}
                  {d.assignee?.name && <span>👤 para: {d.assignee.name}</span>}
                  <span>📅 {d.issuedDate ? new Date(d.issuedDate).toLocaleDateString('pt-BR') : ''}</span>
                  <span>📬 via: {d.source}</span>
                  {d.dueDate && <span>⏰ vence: {new Date(d.dueDate).toLocaleDateString('pt-BR')}</span>}
                  {d.acknowledged && <span style={{ color: 'var(--success)' }}>✅ Ciência {d.acknowledgedAt ? new Date(d.acknowledgedAt).toLocaleDateString('pt-BR') : ''}</span>}
                  {d.status === 'disputed' && (
                    <span style={{ color: 'var(--danger)' }}>
                      ⚠️ Disputa: {d.disputeReason || 'sem justificativa'}
                    </span>
                  )}
                </div>

                {!d.acknowledged && d.status !== 'cancelled' && (
                  <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                    <button className="btn btn-primary btn-sm" onClick={() => acknowledge(d.id)}>
                      <CheckCircle size={12} /> Dar Ciência
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Registrar Ordem</h3>
            <div className="form-group">
              <label className="form-label">Título</label>
              <input className="form-input" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Descrição</label>
              <textarea className="form-textarea" rows={4} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Prioridade</label>
                <select className="form-select" value={form.priority} onChange={(e) => setForm({...form, priority: e.target.value})}>
                  <option value="low">Baixa</option><option value="medium">Média</option>
                  <option value="high">Alta</option><option value="urgent">Urgente</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Origem</label>
                <select className="form-select" value={form.source} onChange={(e) => setForm({...form, source: e.target.value})}>
                  <option value="verbal">Verbal</option><option value="email">E-mail</option>
                  <option value="meeting">Reunião</option><option value="whatsapp">WhatsApp</option>
                  <option value="system">Sistema</option><option value="written">Escrito</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Para (ID do usuário)</label>
                <input className="form-input" value={form.assignedTo} onChange={(e) => setForm({...form, assignedTo: e.target.value})} placeholder="opcional" />
              </div>
              <div className="form-group">
                <label className="form-label">Data limite</label>
                <input className="form-input" type="date" value={form.dueDate} onChange={(e) => setForm({...form, dueDate: e.target.value})} />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={save}>Registrar Ordem</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
