import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, Users, Truck, ShoppingCart, DollarSign,
  CheckSquare, FileText, BookOpen, Brain, SettingsIcon, LogOut, Menu,
  AlertTriangle, Upload, CalendarDays, MessageSquare, Mail, Shield,
  BarChart3, Target, FileSignature, Users2, Archive, Clock,
  Building2, TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

const navGroups = [
  {
    title: 'Main',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/upload', icon: Upload, label: 'Import' },
      { to: '/visualsearch', icon: Search, label: 'Visual Search' },
      { to: '/clipboard', icon: Clipboard, label: 'Clipboard' },
    ],
  },
  {
    title: 'Operational',
    items: [
      { to: '/products', icon: Package, label: 'Products' },
      { to: '/clients', icon: Users, label: 'Clients' },
      { to: '/suppliers', icon: Truck, label: 'Suppliers' },
      { to: '/orders', icon: ShoppingCart, label: 'Orders' },
    ],
  },
  {
    title: 'Financial',
    items: [
      { to: '/financial', icon: DollarSign, label: 'Financial' },
      { to: '/reports', icon: BarChart3, label: 'Reports' },
    ],
  },
  {
    title: 'Management',
    items: [
      { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
      { to: '/agenda', icon: CalendarDays, label: 'Agenda' },
      { to: '/goals', icon: Target, label: 'Goals' },
      { to: '/contracts', icon: FileSignature, label: 'Contracts' },
      { to: '/documents', icon: FileText, label: 'Documents' },
    ],
  },
  {
    title: 'People',
    items: [
      { to: '/employees', icon: Users2, label: 'Employees' },
      { to: '/directives', icon: MessageSquare, label: 'Directives' },
      { to: '/emails', icon: Mail, label: 'Emails' },
    ],
  },
  {
    title: 'Knowledge',
    items: [
      { to: '/knowledge', icon: BookOpen, label: 'Knowledge Base' },
      { to: '/ai', icon: Brain, label: 'AI Assistant' },
    ],
  },
  {
    title: 'System',
    items: [
      { to: '/alerts', icon: AlertTriangle, label: 'Alerts' },
      { to: '/archive', icon: Archive, label: 'Archive' },
      { to: '/settings', icon: SettingsIcon, label: 'Settings' },
      { to: '/security', icon: Shield, label: 'Security' },
    ],
  },
];

function SidebarContent({ user, logout, onItemClick }: { user: any; logout: () => void; onItemClick?: () => void }) {
  const location = useLocation();

  return (
    <>
      <div className="sidebar-logo">
        <svg width="28" height="28" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1"/>
              <stop offset="100%" stopColor="#3b82f6"/>
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="20" fill="url(#lg)"/>
          <text x="50" y="68" fontFamily="Arial" fontSize="45" fontWeight="bold" fill="white" textAnchor="middle">O</text>
        </svg>
        <span>OMNIS Data</span>
      </div>

      <nav className="sidebar-nav">
        {navGroups.map((group) => (
          <div className="nav-section" key={group.title}>
            <div className="nav-section-title">{group.title}</div>
            {group.items.map((item) => {
              const isActive = location.pathname.startsWith(item.to);
              return (
                <NavLink
                  to={item.to}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={onItemClick}
                  key={item.to}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 12px', marginBottom: 4, borderRadius: 8,
        }}>
          <div className="user-avatar">{user?.name?.[0] || 'U'}</div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'User'}
            </div>
            {user?.email && (
              <div style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.email}
              </div>
            )}
          </div>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={logout}
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </>
  );
}

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, logout } = useAuth();

  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            zIndex: 40, backdropFilter: 'blur(4px)',
          }}
        />
      )}
      <aside
        className={`sidebar ${open ? 'open' : ''}`}
        style={{
          position: 'fixed',
          left: open ? 0 : undefined,
          top: 0,
          height: '100%',
          zIndex: 45,
          transition: 'left 0.25s ease',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-sidebar)',
          width: 240,
        } as React.CSSProperties}
      >
        <SidebarContent user={user} logout={logout} onItemClick={onClose} />
      </aside>
    </>
  );
}

export function DesktopSidebar() {
  const { user, logout } = useAuth();

  return (
    <aside
      className="sidebar"
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-sidebar)',
        width: 240,
        borderRight: '1px solid var(--border)',
      }}
    >
      <SidebarContent user={user} logout={logout} />
    </aside>
  );
}


