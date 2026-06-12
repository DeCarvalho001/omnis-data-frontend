import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { BookOpen, Plus, FileText, Search } from 'lucide-react';
import Markdown from 'react-markdown';

export default function KnowledgePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', category: '', type: 'article', tags: '' });

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (category) params.set('category', category);
      if (search) params.set('search', search);
      const res = await api.getKnowledge(params.toString());
      setArticles(res.data || []);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [category, search]);

  const createArticle = async () => {
    await api.createKnowledge(form);
    setShowForm(false);
    setForm({ title: '', content: '', category: '', type: 'article', tags: '' });
    load();
  };

  return (
    <div style={{ display: 'flex', gap: 24, height: 'calc(100vh - 120px)' }}>
      {/* Sidebar - article list */}
      <div style={{ width: 300, flexShrink: 0 }}>
        <div className="page-header" style={{ marginBottom: 12 }}>
          <h2 className="page-title" style={{ fontSize: 18 }}>Base de Conhecimento</h2>
          <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>
            <Plus size={14} /> Novo
          </button>
        </div>

        <input className="form-input" placeholder="Buscar..." value={search}
          onChange={(e) => setSearch(e.target.value)} style={{ marginBottom: 8 }} />

        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginBottom: 12 }}>
          <option value="">Todas as categorias</option>
          <option value="etica">Ética</option>
          <option value="rh">RH</option>
          <option value="sistema">Sistema</option>
          <option value="processos">Processos</option>
          <option value="qualidade">Qualidade</option>
          <option value="seguranca">Segurança</option>
          <option value="geral">Geral</option>
        </select>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {loading ? <div className="spinner" /> : articles.map((a) => (
            <div key={a.id} onClick={() => setSelected(a)}
              style={{
                padding: '12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                background: selected?.id === a.id ? 'var(--primary-dim)' : 'transparent',
                borderBottom: '1px solid var(--border)',
              }}>
              <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 2 }}>{a.title}</div>
              <div style={{ display: 'flex', gap: 6, fontSize: 11, color: 'var(--text-muted)' }}>
                <span className={`badge badge-neutral`}>{a.category || 'geral'}</span>
                <span>{a.viewCount || 0} visualizações</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {showForm ? (
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>Novo Artigo</h3>
            <div className="form-group">
              <label className="form-label">Título</label>
              <input className="form-input" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Categoria</label>
                <select className="form-select" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                  <option value="">Selecione</option>
                  <option value="etica">Ética</option>
                  <option value="rh">RH</option>
                  <option value="sistema">Sistema</option>
                  <option value="processos">Processos</option>
                  <option value="qualidade">Qualidade</option>
                  <option value="seguranca">Segurança</option>
                  <option value="geral">Geral</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tags (vírgula)</label>
                <input className="form-input" value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Conteúdo (Markdown)</label>
              <textarea className="form-textarea" rows={12} value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} />
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={createArticle}>Publicar</button>
            </div>
          </div>
        ) : selected ? (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>{selected.title}</h2>
              <span className={`badge badge-info`}>{selected.category || 'geral'}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
              {selected.type} • {selected.viewCount || 0} visualizações • v{selected.version || '1.0'}
            </div>
            <div className="knowledge-content">
              {selected.content.split('\n').map((p: string, i: number) => <p key={i}>{p}</p>)}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <BookOpen size={48} />
            <p>Selecione um artigo ou crie um novo</p>
          </div>
        )}
      </div>
    </div>
  );
}
