import { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { Brain, Send, History } from 'lucide-react';

export default function AiPage() {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [lastSources, setLastSources] = useState<any[]>([]);
  const [canGenerate, setCanGenerate] = useState<string[]>([]);
  const [generating, setGenerating] = useState<string | null>(null);

  const generateDoc = async (format: string) => {
    setGenerating(format);
    try {
      const token = localStorage.getItem('omnis_token');
      // Use the last actual query from conversation
      const lastUserMsg = conversation.filter(c => c.role === 'user').pop()?.content || query;
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ query: lastUserMsg, format, sourceType: lastSources[0]?.type || '' }),
      });
      if (!res.ok) throw new Error('Failed to generate');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `omnis-${format}-${Date.now()}.${format === 'excel' ? 'xlsx' : format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setConversation(prev => [...prev, { role: 'assistant', content: `❌ Error generating document: ${err.message}` }]);
    } finally { setGenerating(null); }
  };
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getAIHistory().then(res => setHistory(res.data || [])).catch(() => {});
  }, []);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [conversation]);

  const ask = async () => {
    if (!query.trim() || loading) return;
    const q = query;
    setQuery('');
    setConversation(prev => [...prev, { role: 'user', content: q }]);
    setLoading(true);
    try {
      const res = await api.askAI(q);
      setConversation(prev => [...prev, { role: 'assistant', content: res.response }]);
      setLastSources(res.sources || []);
      setCanGenerate(res.canGenerate || []);
    } catch (err: any) {
      setConversation(prev => [...prev, { role: 'assistant', content: `❌ Error: ${err.message}` }]);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ display: 'flex', gap: 24, height: 'calc(100vh - 120px)' }}>
      {/* Chat */}
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="page-header" style={{ marginBottom: 0, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
          <h2 className="page-title" style={{ fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Brain size={20} /> Internal Assistant
          </h2>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowHistory(!showHistory)}>
            <History size={14} /> History
          </button>
        </div>

        <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
          {conversation.length === 0 && (
            <div className="empty-state" style={{ paddingTop: 80 }}>
              <Brain size={48} />
              <p>Ask anything about your company</p>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300, margin: '16px auto' }}>
                {['What is our return policy?', 'How to register a client?', 'How many open orders?', 'Show me pending tasks'].map((s) => (
                  <button key={s} className="btn btn-ghost btn-sm" onClick={() => { setQuery(s); }} style={{ fontSize: 12 }}>{s}</button>
                ))}
              </div>
            </div>
          )}
          {conversation.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.role}`}>
              {msg.content.split('\n').map((p, j) => <p key={j} style={{ marginBottom: 4 }}>{p}</p>)}
            </div>
          ))}
          {loading && <div className="chat-message assistant"><div className="spinner" style={{ width: 20, height: 20, margin: 0 }} /></div>}
          {canGenerate.length > 0 && conversation.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', padding: '4px 0' }}>Generate document:</span>
              {canGenerate.includes('excel') && (
                <button className="btn btn-ghost btn-sm" onClick={() => generateDoc('excel')} disabled={!!generating}>
                  {generating === 'excel' ? '...' : <FileSpreadsheet size={14} />} Excel
                </button>
              )}
              {canGenerate.includes('pdf') && (
                <button className="btn btn-ghost btn-sm" onClick={() => generateDoc('pdf')} disabled={!!generating}>
                  {generating === 'pdf' ? '...' : <FileText size={14} />} PDF
                </button>
              )}
              {canGenerate.includes('docx') && (
                <button className="btn btn-ghost btn-sm" onClick={() => generateDoc('docx')} disabled={!!generating}>
                  {generating === 'docx' ? '...' : <FileText size={14} />} Word
                </button>
              )}
              {canGenerate.includes('pptx') && (
                <button className="btn btn-ghost btn-sm" onClick={() => generateDoc('pptx')} disabled={!!generating}>
                  {generating === 'pptx' ? '...' : <Presentation size={14} />} PowerPoint
                </button>
              )}
            </div>
          )}
          <div ref={chatEnd} />
        </div>

        <div className="chat-input-area">
          <input className="chat-input" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question..." onKeyDown={(e) => e.key === 'Enter' && ask()} />
          <button className="btn btn-primary" onClick={ask} disabled={loading || !query.trim()}>
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* History sidebar */}
      {showHistory && (
        <div style={{ width: 280, flexShrink: 0 }}>
          <div className="card" style={{ height: '100%', overflowY: 'auto' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Question History</h3>
            {history.length === 0 ? (
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>No questions yet</div>
            ) : history.map((h: any) => (
              <div key={h.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                onClick={() => setConversation([{ role: 'user', content: h.query }, { role: 'assistant', content: h.response }])}>
                <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{h.query}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{h.responseTimeMs ? `${(h.responseTimeMs / 1000).toFixed(1)}s` : ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
