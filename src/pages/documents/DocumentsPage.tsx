import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function DocumentsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/documents?limit=100', { headers: { Authorization: `Bearer ${localStorage.getItem('omnis_token')}` } }).then(r => r.json());
        setItems(res.data || []);
      } finally { setLoading(false); }
    })();
  }, []);

  return (
    <div>
      <div className="page-header"><h1 className="page-title">Documentos</h1></div>
      <div className="card">
        {loading ? <div className="spinner" /> : (
          <div className="table-container">
            <table>
              <thead><tr><th>Título</th><th>Tipo</th><th>Categoria</th><th>Emissão</th><th>Vencimento</th><th>Status</th></tr></thead>
              <tbody>
                {items.length === 0 ? <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Nenhum documento</td></tr>
                : items.map((d) => (<tr key={d.id}>
                  <td style={{ fontWeight: 500 }}>{d.title}</td>
                  <td><span className="badge badge-neutral">{d.type}</span></td>
                  <td>{d.category || '-'}</td>
                  <td>{d.issueDate ? new Date(d.issueDate).toLocaleDateString('pt-BR') : '-'}</td>
                  <td style={{ color: d.expiryDate && new Date(d.expiryDate) < new Date() ? 'var(--danger)' : undefined, fontWeight: d.expiryDate ? 600 : undefined }}>
                    {d.expiryDate ? new Date(d.expiryDate).toLocaleDateString('pt-BR') : '-'}
                  </td>
                  <td><span className={`badge badge-${d.status === 'active' ? 'success' : 'neutral'}`}>{d.status}</span></td>
                </tr>))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
