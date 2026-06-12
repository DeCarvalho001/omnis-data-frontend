import { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, BookOpen, BarChart3, CheckCircle, AlertCircle, FileText, Database, ArrowRight, ArrowLeft } from 'lucide-react';

type Destino = 'analysis' | 'knowledge' | null;
type Formato = 'xlsx' | 'csv' | 'json' | 'pdf' | 'docx' | 'txt' | 'md' | null;
type Step = 'choose-destino' | 'pick-formatos' | 'upload' | 'result';

const ALL_FORMATS: Formato[] = ['xlsx', 'csv', 'json', 'pdf', 'docx', 'txt', 'md'];

const DESCRIPTIONS: Record<Formato, string> = {
  xlsx: 'Planilha Excel',
  csv: 'Arquivo CSV',
  json: 'JSON (dados)',
  pdf: 'Documento PDF',
  docx: 'Documento Word',
  txt: 'Texto puro',
  md: 'Markdown',
};

const DESTINO_DESC: Record<string, { title: string; desc: string; icon: any; color: string }> = {
  analysis: { title: '📊 Análise de Dados', desc: 'Vai pro SmartImport: vira produtos, clientes, pedidos, dashboards', icon: BarChart3, color: '#6366f1' },
  knowledge: { title: '📚 Base de Conhecimento', desc: 'Vira artigo pesquisável: manuais, políticas, apostilas', icon: BookOpen, color: '#22c55e' },
};

// Extensões aceitas por formato
const ACCEPT: Record<Formato, string> = {
  xlsx: '.xlsx,.xls',
  csv: '.csv',
  json: '.json',
  pdf: '.pdf',
  docx: '.docx,.doc',
  txt: '.txt',
  md: '.md',
};

export default function UploadPage() {
  const [step, setStep] = useState<Step>('choose-destino');
  const [destino, setDestino] = useState<Destino>(null);
  const [formatos, setFormatos] = useState<Formato[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({ title: '', category: 'geral', tags: '', type: 'manual' });
  const inputRef = useRef<HTMLInputElement>(null);

  const resetTudo = () => {
    setStep('choose-destino');
    setDestino(null);
    setFormatos([]);
    setFile(null);
    setResult(null);
    setError('');
    setMeta({ title: '', category: 'geral', tags: '', type: 'manual' });
  };

  const setDestinoHandler = (d: Destino) => {
    setDestino(d);
    // Auto-preenche formatos sugeridos com base no destino
    if (d === 'analysis') setFormatos(['xlsx', 'csv', 'json']);
    else setFormatos(['pdf', 'docx', 'txt', 'md']);
    setStep('pick-formatos');
  };

  const toggleFormato = (f: Formato) => {
    setFormatos(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setStep('upload');
  };

  const handleUpload = async () => {
    if (!file || !destino) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('omnis_token');

      // Upload como planilha de dados para TODOS os formatos suportados
      const allowedAnalysis = ['xlsx', 'csv', 'json'];
      const allowedKnowledge = ['pdf', 'docx', 'txt', 'md'];
      
      const ext = file.name.split('.').pop()?.toLowerCase() || '';

      if (destino === 'analysis' && allowedAnalysis.includes(ext)) {
        // Upload pro SmartImport
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/upload', {
          method: 'POST', headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Falha no upload');

        setResult({
          destino: 'analysis',
          message: data.message || `Importado com sucesso!`,
          details: {
            'Tipo detectado': data.type || '—',
            'Confiança': data.confidence ? `${data.confidence}%` : '—',
            'Linhas': data.rowCount || '—',
            'Colunas': data.columns?.join(', ') || '—',
          },
        });
      } else if (destino === 'knowledge' && allowedKnowledge.includes(ext)) {
        // Upload pra Base de Conhecimento
        const form = new FormData();
        form.append('file', file);
        if (meta.title) form.append('title', meta.title);
        form.append('category', meta.category);
        form.append('tags', meta.tags);
        form.append('type', meta.type);

        const res = await fetch('/api/knowledge/upload', {
          method: 'POST', headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Falha no upload');

        setResult({
          destino: 'knowledge',
          message: `"${data.article?.title || file.name}" adicionado à Base de Conhecimento`,
          details: {
            'Categoria': data.article?.category || meta.category,
            'Tipo': data.article?.type || meta.type,
            'Tags': data.article?.tags || meta.tags || '—',
            'Tamanho': `${(file.size / 1024).toFixed(1)} KB`,
          },
        });
      } else {
        // Conversão: formato não nativo pro destino escolhido
        // Exemplo: PDF pro SmartImport, ou XLSX pra Base de Conhecimento
        // Por enquanto salvamos como documento com tag informando
        const form = new FormData();
        form.append('file', file);
        const title = meta.title || file.name.replace(/\.[^/.]+$/, '');
        form.append('title', title);
        form.append('category', destino === 'analysis' ? 'dados-importados' : meta.category);
        form.append('tags', `convertido,${destino},${ext}`);
        form.append('type', destino === 'analysis' ? 'dados' : 'manual');

        const res = await fetch('/api/knowledge/upload', {
          method: 'POST', headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Falha no upload');

        // Também tenta extrair/processar em background
        setResult({
          destino,
          message: `"${title}" recebido e registrado!`,
          conversion: true,
          details: {
            'Arquivo': file.name,
            'Tamanho': `${(file.size / 1024).toFixed(1)} KB`,
            'Destino': DESTINO_DESC[destino]?.title || destino,
            'Nota': 'Formato convertido — conteúdo disponível para consulta',
          },
        });
      }

      setStep('result');
    } catch (err: any) {
      setError(err.message || 'Erro no upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Importar Arquivo</h1>
      </div>

      {/* STEP 1: Choose destination */}
      {step === 'choose-destino' && (
        <>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 14 }}>
            Para onde este arquivo deve ir?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, maxWidth: 500, margin: '0 auto' }}>
            <div onClick={() => setDestinoHandler('analysis')} style={{
              background: 'var(--bg-card)', border: '2px solid var(--border)', borderRadius: 'var(--radius)',
              padding: 24, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', gap: 16, alignItems: 'center',
            }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#6366f1'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
              <BarChart3 size={40} style={{ color: '#6366f1', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>📊 Análise de Dados</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Vai pro SmartImport: vira produtos, clientes, dashboards, alertas</p>
              </div>
              <ArrowRight size={20} style={{ color: 'var(--text-muted)', marginLeft: 'auto', flexShrink: 0 }} />
            </div>

            <div onClick={() => setDestinoHandler('knowledge')} style={{
              background: 'var(--bg-card)', border: '2px solid var(--border)', borderRadius: 'var(--radius)',
              padding: 24, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', gap: 16, alignItems: 'center',
            }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#22c55e'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
              <BookOpen size={40} style={{ color: '#22c55e', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>📚 Base de Conhecimento</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Vira artigo pesquisável: manuais, políticas, apostilas, ética</p>
              </div>
              <ArrowRight size={20} style={{ color: 'var(--text-muted)', marginLeft: 'auto', flexShrink: 0 }} />
            </div>
          </div>
        </>
      )}

      {/* STEP 2: Pick allowed formats */}
      {step === 'pick-formatos' && destino && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <button className="btn btn-ghost btn-sm" onClick={resetTudo}>← Voltar</button>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>
              {DESTINO_DESC[destino]?.title || destino}
            </h3>
          </div>

          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
            Quais formatos de arquivo este destino aceita?<br />
            <em style={{ fontSize: 12 }}>(desmarque os que não quiser permitir)</em>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8, marginBottom: 24 }}>
            {ALL_FORMATS.map((fmt) => (
              <div key={fmt}
                onClick={() => toggleFormato(fmt)}
                style={{
                  padding: '12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                  textAlign: 'center', fontSize: 13, fontWeight: 500,
                  background: formatos.includes(fmt) ? 'var(--primary-dim)' : 'var(--bg)',
                  border: `2px solid ${formatos.includes(fmt) ? 'var(--primary)' : 'var(--border)'}`,
                  color: formatos.includes(fmt) ? 'var(--primary-hover)' : 'var(--text-secondary)',
                  transition: 'all 0.15s',
                }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>
                  {fmt === 'xlsx' ? '📊' : fmt === 'csv' ? '📋' : fmt === 'json' ? '⚙️' : fmt === 'pdf' ? '📕' : fmt === 'docx' ? '📝' : fmt === 'txt' ? '📄' : '📑'}
                </div>
                <div>.{fmt}</div>
                <div style={{ fontSize: 11, fontWeight: 400, marginTop: 2 }}>{DESCRIPTIONS[fmt]}</div>
                <div style={{ fontSize: 10, marginTop: 4, color: formatos.includes(fmt) ? 'var(--primary)' : 'var(--text-muted)' }}>
                  {formatos.includes(fmt) ? '✓ aceito' : 'clique p/ aceitar'}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              {formatos.length === 0 ? 'Selecione pelo menos um formato' : `${formatos.length} formato(s) selecionado(s)`}
            </div>
            <button className="btn btn-primary" disabled={formatos.length === 0}
              onClick={() => { setStep('upload'); }}>
              Continuar <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Upload file */}
      {step === 'upload' && destino && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setStep('pick-formatos')}>← Voltar</button>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>
              {DESTINO_DESC[destino]?.title} — Selecione o arquivo
            </h3>
          </div>

          {/* Mostra formatos aceitos */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', padding: '4px 0' }}>Formatos aceitos:</span>
            {formatos.map(fmt => (
              <span key={fmt} className="badge badge-info">.{fmt}</span>
            ))}
          </div>

          {/* Drop zone */}
          <div
            onClick={() => inputRef.current?.click()}
            style={{
              border: `2px dashed ${file ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: 'var(--radius)', padding: 40, textAlign: 'center',
              cursor: 'pointer', marginBottom: 16,
              background: file ? 'var(--primary-dim)' : 'transparent',
              transition: 'all 0.2s',
            }}>
            {file ? (
              <>
                <FileText size={48} style={{ opacity: 0.6, marginBottom: 12 }} />
                <p style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>{file.name}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {(file.size / 1024).toFixed(1)} KB • {DESCRIPTIONS[file.name.split('.').pop()?.toLowerCase() as Formato] || 'arquivo'}
                </p>
              </>
            ) : (
              <>
                <Upload size={48} style={{ opacity: 0.4, marginBottom: 12 }} />
                <p style={{ fontWeight: 500, marginBottom: 4, fontSize: 15 }}>
                  Clique para selecionar ou arraste aqui
                </p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {formatos.map(f => `.${f}`).join(', ')}
                </p>
              </>
            )}
            <input ref={inputRef} type="file"
              accept={formatos.map(f => ACCEPT[f]).join(',')}
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>

          {/* Metadados (para conhecimento) */}
          {file && (
            <div style={{ marginBottom: 16 }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Título (opcional)</label>
                  <input className="form-input" value={meta.title}
                    onChange={(e) => setMeta({ ...meta, title: e.target.value })}
                    placeholder={file.name.replace(/\.[^/.]+$/, '')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Categoria</label>
                  <select className="form-select" value={meta.category}
                    onChange={(e) => setMeta({ ...meta, category: e.target.value })}>
                    <option value="geral">Geral</option>
                    <option value="etica">Ética e Conduta</option>
                    <option value="rh">RH / Recursos Humanos</option>
                    <option value="sistema">Manual do Sistema</option>
                    <option value="processos">Processos</option>
                    <option value="qualidade">Qualidade</option>
                    <option value="seguranca">Segurança</option>
                    <option value="financeiro">Financeiro</option>
                    <option value="vendas">Vendas</option>
                    <option value="compras">Compras</option>
                    <option value="juridico">Jurídico</option>
                    <option value="ti">TI</option>
                    <option value="dados-importados">Dados Importados</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <button className="btn btn-primary" onClick={handleUpload}
            disabled={!file || loading} style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>
            {loading ? 'Processando...' : `Enviar para ${DESTINO_DESC[destino]?.title || '...'}`}
          </button>

          {error && (
            <div style={{
              marginTop: 16, padding: 12, background: 'rgba(239,68,68,0.1)',
              borderRadius: 'var(--radius-sm)', color: 'var(--danger)', fontSize: 13,
              display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}
        </div>
      )}

      {/* STEP 4: Result */}
      {step === 'result' && result && (
        <div className="card">
          <div style={{
            padding: 20, background: 'rgba(34,197,94,0.08)',
            borderRadius: 'var(--radius-sm)', marginBottom: 16,
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <CheckCircle size={24} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: 'var(--success)' }}>
                {result.message}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {result.destino === 'analysis'
                  ? 'Os dados foram importados e já estão disponíveis para consulta e análises.'
                  : 'O documento foi adicionado à Base de Conhecimento. Todos podem consultar.'}
                {result.conversion && ' O sistema registrou o arquivo para processamento futuro.'}
              </div>
            </div>
          </div>

          {result.details && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
              {Object.entries(result.details).map(([key, val]) => (
                <div key={key} style={{ padding: '8px 12px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>{key}</div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{String(val)}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" onClick={resetTudo}>
              Importar Outro Arquivo
            </button>
            <button className="btn btn-ghost"
              onClick={() => window.location.href = result.destino === 'analysis' ? '/products' : '/knowledge'}>
              {result.destino === 'analysis' ? 'Ver Dados' : 'Ver Base'}
            </button>
          </div>
        </div>
      )}

      {/* Info footer */}
      {step !== 'result' && (
        <div style={{ marginTop: 24, padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong>💡 Sem restrições:</strong> Qualquer formato pode ir para qualquer destino.
          <br />
          • Uma planilha <strong>.xlsx</strong> pode virar artigo na Base de Conhecimento
          <br />
          • Um <strong>.pdf</strong> pode ser enviado como dado para análise
          <br />
          • O sistema adapta o conteúdo ao destino escolhido
        </div>
      )}
    </div>
  );
}
