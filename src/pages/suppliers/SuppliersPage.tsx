import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Search } from 'lucide-react';

export default function SuppliersPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ limit: '100' });
        if (search) params.set('search', search);
        const res = await api.getSuppliers(params.toString());
        setItems(res.data || []);
      } finally { setLoading(false); }
    })();
  }, [search]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Fornecedores</h1>
        <input className="form-input" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 200 }} />
      </div>
      <div className="card">
        {loading ? <div className="spinner" /> : (
          <div className="table-container">
            <table>
              <thead><tr><th>Razão Social</th><th>CNPJ</th><th>Contato</th><th>Email</th><th>Telefone</th><th>Avaliação</th><th>Status</th></tr></thead>
              <tbody>
                {items.length === 0 ? <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Nenhum fornecedor</td></tr>
                : items.map((s) => (<tr key={s.id}>
                  <td style={{ fontWeight: 500 }}>{s.corporateName}</td>
                  <td>{s.cnpj || '-'}</td>
                  <td>{s.contactPerson || '-'}</td>
                  <td>{s.email || '-'}</td>
                  <td>{s.phone || '-'}</td>
                  <td>{'⭐'.repeat(Math.round(s.rating || 0))}</td>
                  <td><span className={`badge badge-${s.status === 'active' ? 'success' : 'neutral'}`}>{s.status}</span></td>
                </tr>))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
