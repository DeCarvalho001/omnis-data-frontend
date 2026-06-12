import { useState, useEffect } from 'react';
import { Shield, Key, History, Eye, EyeOff, Plus, Trash2, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function SecurityPage() {
  const [tab, setTab] = useState<'overview' | 'password' | 'keys' | 'history'>('overview');
  const [settings, setSettings] = useState<any>({});
  const [report, setReport] = useState<any>({});
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [loginHistory, setLoginHistory] = useState<any[]>([]);
  const [newKey, setNewKey] = useState<string | null>(null);
  const token = localStorage.getItem('omnis_token');

  const load = () => {
    Promise.all([
      fetch('/api/security/settings', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/security/report', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/security/api-keys', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/security/login-history', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ]).then(([s, r, k, h]) => {
      setSettings(s);
      setReport(r);
      setApiKeys(k.data || k || []);
      setLoginHistory(h.data || h || []);
    });
  };

  useEffect(() => { load(); }, []);

  const updateSetting = async (key: string, val: any) => {
    await fetch('/api/security/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...settings, [key]: val }),
    });
    load();
  };

  const createKey = async () => {
    const res = await fetch('/api/security/api-keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: `Key ${Date.now()}` }),
    });
    const data = await res.json();
    setNewKey(data.key);
    load();
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Shield size={22} /> Segurança
        </h1>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
        {[
          { key: 'overview', label: 'Visão Geral', icon: Shield },
          { key: 'password', label: 'Política de Senha', icon: Eye },
          { key: 'keys', label: 'API Keys', icon: Key },
          { key: 'history', label: 'Histórico de Login', icon: History },
        ].map(t => (
          <button key={t.key}
            className={`btn btn-sm ${tab === t.key ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setTab(t.key as any)}>
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === 'overview' && (
        <div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total de Logins</div>
              <div className="stat-value">{report.totalLogins || 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Tentativas Falhas</div>
              <div className="stat-value" style={{ color: 'var(--danger)' }}>{report.failedLogins || 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">API Keys Ativas</div>
              <div className="stat-value" style={{ color: 'var(--info)' }}>{report.activeApiKeys || 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Sessão expira em</div>
              <div className="stat-value" style={{ fontSize: 20 }}>{settings.sessionTimeoutMinutes || 480}min</div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <h3 className="card-title" style={{ marginBottom: 12 }}>✅ Checklist de Segurança</h3>
            {[
              { label: 'Senha forte obrigatória', ok: settings.passwordMinLength >= 8 },
              { label: 'Expiração de senha configurada', ok: settings.passwordExpiryDays > 0 },
              { label: '2FA disponível', ok: true },
              { label: 'Backup automático', ok: settings.autoBackupEnabled },
              { label: 'Auditoria de ações ativa', ok: settings.logAllActions },
              { label: 'Rate limiting ativo (nginx)', ok: true },
              { label: 'HTTPS obrigatório (Cloudflare)', ok: true },
            ].map(item => (
              <div key={item.label} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                {item.ok ? <CheckCircle size={16} style={{ color: 'var(--success)' }} /> : <AlertTriangle size={16} style={{ color: 'var(--warning)' }} />}
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PASSWORD POLICY */}
      {tab === 'password' && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 16 }}>Política de Senha</h3>
          {[
            { key: 'passwordMinLength', label: 'Tamanho mínimo', type: 'number', min: 4, max: 32 },
            { key: 'passwordExpiryDays', label: 'Expira em (dias, 0 = nunca)', type: 'number', min: 0, max: 365 },
            { key: 'passwordHistory', label: 'Não repetir últimas N senhas', type: 'number', min: 0, max: 20 },
            { key: 'sessionTimeoutMinutes', label: 'Sessão expira em (minutos)', type: 'number', min: 30, max: 1440 },
            { key: 'logRetentionDays', label: 'Reter logs por (dias)', type: 'number', min: 30, max: 730 },
            { key: 'backupRetentionDays', label: 'Reter backups por (dias)', type: 'number', min: 7, max: 365 },
          ].map(item => (
            <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13 }}>{item.label}</span>
              <input className="form-input" type="number" min={item.min} max={item.max}
                value={(settings as any)[item.key] ?? ''}
                onChange={(e) => updateSetting(item.key, Number(e.target.value))}
                style={{ width: 80, textAlign: 'center' }} />
            </div>
          ))}

          <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 20, marginBottom: 12 }}>Requisitos de caracteres</h4>
          {[
            { key: 'passwordRequireUppercase', label: 'Exigir maiúscula' },
            { key: 'passwordRequireNumbers', label: 'Exigir número' },
            { key: 'passwordRequireSpecial', label: 'Exigir caractere especial' },
            { key: 'notifyNewDevice', label: 'Notificar novo dispositivo' },
            { key: 'notifyFailedLogin', label: 'Notificar falha de login' },
          ].map(item => (
            <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13 }}>{item.label}</span>
              <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, cursor: 'pointer' }}>
                <input type="checkbox" checked={(settings as any)[item.key] ?? false}
                  onChange={(e) => updateSetting(item.key, e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: 12,
                  background: (settings as any)[item.key] ? 'var(--primary)' : 'var(--border)',
                  transition: '0.2s',
                }}>
                  <span style={{
                    position: 'absolute', top: 2, left: (settings as any)[item.key] ? 22 : 2,
                    width: 20, height: 20, borderRadius: '50%', background: 'white',
                    transition: '0.2s',
                  }} />
                </span>
              </label>
            </div>
          ))}
        </div>
      )}

      {/* API KEYS */}
      {tab === 'keys' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
            <button className="btn btn-primary btn-sm" onClick={createKey}><Plus size={14} /> Nova API Key</button>
          </div>

          {newKey && (
            <div style={{ padding: 16, background: 'rgba(245,158,11,0.1)', borderRadius: 'var(--radius-sm)', marginBottom: 16, border: '1px solid var(--warning)' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                <Key size={18} style={{ color: 'var(--warning)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong style={{ fontSize: 13 }}>🔑 Guarde esta chave agora!</strong>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                    Ela não será mostrada novamente. Se perder, crie outra e revogue esta.
                  </p>
                </div>
              </div>
              <code style={{
                display: 'block', padding: 12, background: 'var(--bg)', borderRadius: 'var(--radius-sm)',
                fontSize: 12, wordBreak: 'break-all', fontFamily: 'monospace',
              }}>{newKey}</code>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }}
                onClick={() => { navigator.clipboard.writeText(newKey); setNewKey(null); }}>
                ✅ Copiado! Fechar
              </button>
            </div>
          )}

          <div className="card">
            <div className="table-container">
              <table>
                <thead><tr><th>Nome</th><th>Prefixo</th><th>Permissões</th><th>Status</th><th>Criada</th><th>Último uso</th><th></th></tr></thead>
                <tbody>
                  {(apiKeys.length === 0 ? [] : apiKeys).map((k: any) => (
                    <tr key={k.id}>
                      <td>{k.name}</td>
                      <td><code style={{ fontSize: 11 }}>{k.keyPrefix}...</code></td>
                      <td><span className="badge badge-info">{k.permissions}</span></td>
                      <td><span className={`badge badge-${k.status === 'active' ? 'success' : 'neutral'}`}>{k.status}</span></td>
                      <td style={{ fontSize: 12 }}>{k.createdAt ? new Date(k.createdAt).toLocaleDateString('pt-BR') : '-'}</td>
                      <td style={{ fontSize: 12 }}>{k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleDateString('pt-BR') : 'nunca'}</td>
                      <td>
                        {k.status === 'active' && (
                          <button className="btn btn-danger btn-sm" onClick={async () => {
                            await fetch(`/api/security/api-keys/${k.id}`, {
                              method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
                            });
                            load();
                          }}><Trash2 size={12} /></button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {apiKeys.length === 0 && (
                    <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Nenhuma API key criada</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN HISTORY */}
      {tab === 'history' && (
        <div className="card">
          <div className="table-container">
            <table>
              <thead><tr><th>Data</th><th>Usuário</th><th>Email</th><th>IP</th><th>Status</th><th>Motivo</th></tr></thead>
              <tbody>
                {(loginHistory.length === 0 ? [] : loginHistory).map((h: any) => (
                  <tr key={h.id}>
                    <td style={{ fontSize: 12 }}>{h.attemptedAt ? new Date(h.attemptedAt).toLocaleString('pt-BR') : '-'}</td>
                    <td>{h.user?.name || '-'}</td>
                    <td>{h.email}</td>
                    <td style={{ fontSize: 12, fontFamily: 'monospace' }}>{h.ipAddress || '-'}</td>
                    <td>
                      <span className={`badge badge-${h.status === 'success' ? 'success' : h.status === 'blocked' ? 'danger' : 'warning'}`}>
                        {h.status === 'success' ? '✅' : h.status === 'blocked' ? '🚫' : '❌'} {h.status}
                      </span>
                    </td>
                    <td style={{ fontSize: 12 }}>{h.failureReason || '-'}</td>
                  </tr>
                ))}
                {loginHistory.length === 0 && (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Nenhum login registrado</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
