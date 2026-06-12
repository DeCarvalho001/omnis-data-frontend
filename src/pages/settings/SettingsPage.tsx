import { useState } from 'react';
import { Download, Database, FileSpreadsheet, FileText, Presentation, FileDown } from 'lucide-react';

export default function SettingsPage() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadAll = async () => {
    setDownloading(true);
    try {
      const token = localStorage.getItem('omnis_token');
      const res = await fetch('/api/settings/download-all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Falha ao baixar');

      // Trigger download do navegador
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `omnis-full-backup-${new Date().toISOString().split('T')[0]}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (err: any) {
      alert('Erro: ' + err.message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Configurações</h1>
      </div>

      {/* Seção: Backup de Dados */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <Database size={32} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 4 }} />
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Download de Todos os Dados</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.5 }}>
              Baixe tudo que você já enviou para o OMNIS em uma única planilha Excel.
              O arquivo conterá abas separadas para cada tipo de dado:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
              {[
                { icon: FileSpreadsheet, label: 'Planilhas Importadas', color: 'var(--info)' },
                { icon: FileText, label: 'Produtos', color: 'var(--success)' },
                { icon: FileText, label: 'Clientes', color: 'var(--primary)' },
                { icon: FileText, label: 'Pedidos', color: 'var(--warning)' },
                { icon: FileSpreadsheet, label: 'Financeiro', color: 'var(--danger)' },
                { icon: FileText, label: 'Base de Conhecimento', color: 'var(--success)' },
                { icon: FileText, label: 'Documentos', color: 'var(--info)' },
              ].map((item) => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px',
                  background: 'var(--bg)', borderRadius: 'var(--radius-sm)', fontSize: 12,
                }}>
                  <item.icon size={14} style={{ color: item.color }} />
                  {item.label}
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary"
              onClick={handleDownloadAll}
              disabled={downloading}
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              {downloading ? (
                'Gerando backup...'
              ) : downloaded ? (
                <>✅ Baixado com sucesso!</>
              ) : (
                <><Download size={18} /> Baixar Tudo em Um Clique</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Seção: Gerar Documentos */}
      <div className="card">
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <FileDown size={32} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 4 }} />
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Gerar Documentos Office</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.5 }}>
              No Assistente IA, peça qualquer coisa e depois clique em "Gerar" para baixar
              como Excel, PDF, Word ou PowerPoint — pronto para uso, sem formatação manual.
            </p>

            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { icon: FileSpreadsheet, label: 'Excel (.xlsx)', color: 'var(--success)' },
                { icon: FileText, label: 'PDF', color: 'var(--danger)' },
                { icon: FileText, label: 'Word (.docx)', color: 'var(--info)' },
                { icon: Presentation, label: 'PPT (.pptx)', color: 'var(--warning)' },
              ].map((fmt) => (
                <div key={fmt.label} style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
                  background: 'var(--bg)', borderRadius: 'var(--radius-sm)', fontSize: 12,
                }}>
                  <fmt.icon size={14} style={{ color: fmt.color }} />
                  {fmt.label}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12, padding: 12, background: 'var(--bg)', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--text-secondary)' }}>
              💡 <strong>Dica:</strong> Vá até o <a href="/ai" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Assistente IA</a>,
              pergunte algo como <em>"lista de produtos"</em> ou <em>"relatório financeiro"</em>,
              e clique no botão de download para gerar o documento automaticamente.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
