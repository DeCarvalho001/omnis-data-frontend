import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import Sidebar, { DesktopSidebar } from './Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useState as useSearchState } from 'react';

export default function Layout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await api.search(searchQuery);
      setSearchResults(res.results || []);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Mobile sidebar overlay */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Desktop sidebar */}
      <div style={{ display: 'none' }} className="desktop-sidebar">
        <DesktopSidebar />
      </div>

      {/* Main area */}
      <div className="main-area">
        <header className="header">
          <div className="header-left">
            <button className="mobile-menu-btn btn btn-ghost btn-sm" onClick={() => setSidebarOpen(true)}
                style={{ display: "none" }}>
              <Menu size={20} />
            </button>
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                className="header-search"
                placeholder="Buscar produtos, clientes, pedidos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setTimeout(() => setSearchResults([]), 200)}
              />
            </form>
            {searchResults.length > 0 && (
              <div style={{
                position: 'absolute', top: '100%', left: 24, right: 24,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', maxHeight: 300, overflowY: 'auto',
                zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              }}>
                {searchResults.map((r: any, i: number) => (
                  <div key={i} style={{
                    padding: '10px 14px', borderBottom: '1px solid var(--border)',
                    cursor: 'pointer', fontSize: 13,
                  }} onClick={() => {
                    const paths: Record<string, string> = { product: '/products', client: '/clients', order: '/orders', spreadsheet: '/upload' };
                    navigate(paths[r.type] || '/');
                    setSearchResults([]);
                    setSearchQuery('');
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span className={`badge badge-info`} style={{ marginRight: 8 }}>{r.type}</span>
                    {r.name || r.filename || r.code || `#${r.id}`}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="header-right">
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{user?.name}</span>
            <div className="user-avatar">{user?.name?.[0] || 'U'}</div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .sidebar { position: sticky !important; left: auto !important; }
          .desktop-sidebar { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
