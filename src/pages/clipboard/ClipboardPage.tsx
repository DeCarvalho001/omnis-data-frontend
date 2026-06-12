import { useState, useRef } from 'react';
import {
  Clipboard, Image as ImageIcon, FileText, Link2, X, Plus,
  Upload, Download, Trash2, Copy, Check, ExternalLink,
  Search, Scissors, File, FolderOpen, Files,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

// ===== TIPOS =====
interface ClipboardItem {
  id: string;
  type: 'image' | 'document' | 'link' | 'note' | 'file';
  name: string;
  content: string;  // URL, text, or data
  thumbnail?: string;
  size?: string;
  source: 'upload' | 'clipboard' | 'drag' | 'capture';
  createdAt: string;
  tags: string[];
  pinned: boolean;
}

// ===== MOCK DATA =====
const MOCK_ITEMS: ClipboardItem[] = [
  {
    id: 'C001', type: 'image', name: 'Roller_Bearing_6205.jpg',
    content: '/uploads/parts/Roller_Bearing_6205.jpg',
    size: '2.4 MB', source: 'upload',
    createdAt: '2026-06-11 09:30', tags: ['bearing', 'part-6205'], pinned: true,
  },
  {
    id: 'C002', type: 'document', name: 'SKF_Catalog_2026.pdf',
    content: '/docs/SKF_Catalog_2026.pdf',
    size: '15.2 MB', source: 'upload',
    createdAt: '2026-06-10 14:00', tags: ['catalog', 'bearings'], pinned: false,
  },
  {
    id: 'C003', type: 'image', name: 'Hydraulic_Cylinder_HCD.jpg',
    content: '/uploads/parts/Hydraulic_Cylinder_HCD.jpg',
    size: '3.1 MB', source: 'capture',
    createdAt: '2026-06-09 16:45', tags: ['hydraulic', 'cylinder'], pinned: true,
  },
  {
    id: 'C004', type: 'link', name: 'How to Install 6205 Bearing',
    content: 'https://youtube.com/watch?v=example1',
    source: 'clipboard',
    createdAt: '2026-06-08 11:20', tags: ['video', 'tutorial'], pinned: false,
  },
  {
    id: 'C005', type: 'note', name: 'Part Dimensions Reference',
    content: '6205-2RS: 25x52x15mm\nSPB2000: 2000x16x10mm\nHCD-50-200: 50x200mm',
    source: 'clipboard',
    createdAt: '2026-06-07 08:00', tags: ['reference', 'dimensions'], pinned: false,
  },
];

// ===== TYPES CONFIG =====
const TYPE_CONFIG: Record<string, { icon: any; color: string; label: string }> = {
  image: { icon: ImageIcon, color: 'var(--accent)', label: 'Image' },
  document: { icon: FileText, color: 'var(--warning)', label: 'Document' },
  link: { icon: Link2, color: 'var(--info)', label: 'Link' },
  note: { icon: File, color: 'var(--success)', label: 'Note' },
  file: { icon: Files, color: 'var(--text-muted)', label: 'File' },
};

// ===== ITEM CARD COMPONENT =====
function ItemCard({ item, onDelete, onPin, onUse }: {
  item: ClipboardItem;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  onUse: (item: ClipboardItem) => void;
}) {
  const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.file;
  const Icon = config.icon;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(item.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: item.pinned ? '1px solid var(--accent)' : '1px solid var(--border)',
      borderRadius: 12, overflow: 'hidden',
      transition: 'border-color 0.2s, transform 0.2s',
      position: 'relative',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = item.pinned ? 'var(--accent)' : 'var(--border)'; e.currentTarget.style.transform = '' }}
    >
      {/* Thumbnail / Preview */}
      <div style={{
        height: 120,
        background: item.type === 'image'
          ? `var(--bg-secondary) url(${item.thumbnail || item.content}) center/cover no-repeat`
          : 'var(--bg-secondary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '1px solid var(--border)',
      }}>
        {item.type !== 'image' && <Icon size={36} style={{ opacity: 0.3, color: config.color }} />}
      </div>

      {/* Info */}
      <div style={{ padding: '10px 12px' }}>
        <div style={{
          fontSize: 12, fontWeight: 600, color: 'var(--text-primary)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          marginBottom: 4,
        }}>
          {item.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
          <Badge variant={item.type === 'image' ? 'info' : item.type === 'document' ? 'warning' : item.type === 'link' ? 'success' : 'info'}>
            {config.label}
          </Badge>
          {item.size && (
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{item.size}</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 4, gap: '4px', flexWrap: 'wrap' }}>
          {item.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{
              fontSize: 10, padding: '1px 6px', borderRadius: 4,
              background: 'var(--accent-light)', color: 'var(--accent)',
            }}>
              {tag}
            </span>
          ))}
          {item.tags.length > 2 && (
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>+{item.tags.length - 2}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex', borderTop: '1px solid var(--border)',
        padding: '4px 4px',
      }}>
        <button className="btn btn-ghost btn-sm" style={{ flex: 1, padding: '4px', fontSize: 11 }}
          onClick={() => onUse(item)} title="Use this item">
          <ExternalLink size={11} /> Use
        </button>
        <button className="btn btn-ghost btn-sm" style={{ padding: '4px' }}
          onClick={copyToClipboard} title="Copy content">
          {copied ? <Check size={11} style={{ color: 'var(--success)' }} /> : <Copy size={11} />}
        </button>
        <button className="btn btn-ghost btn-sm" style={{ padding: '4px' }}
          onClick={() => onPin(item.id)} title={item.pinned ? 'Unpin' : 'Pin'}>
          {item.pinned ? '📌' : '📍'}
        </button>
        <button className="btn btn-ghost btn-sm" style={{ padding: '4px', color: 'var(--danger)' }}
          onClick={() => onDelete(item.id)} title="Delete">
          <Trash2 size={11} />
        </button>
      </div>
    </div>
  );
}

// ===== MAIN PAGE =====
export default function ClipboardPage() {
  const [items, setItems] = useState<ClipboardItem[]>(MOCK_ITEMS);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter(item => {
    if (filter !== 'all' && item.type !== filter) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase()) &&
        !item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const pinnedItems = filteredItems.filter(i => i.pinned);
  const unpinnedItems = filteredItems.filter(i => !i.pinned);

  const handleDelete = (id: string) => setItems(items.filter(i => i.id !== id));
  const handlePin = (id: string) => setItems(items.map(i => i.id === id ? { ...i, pinned: !i.pinned } : i));
  const handleUse = (item: ClipboardItem) => {
    // Simulate sending to another module
    alert(`Item "${item.name}" sent to active module.\nYou can now use it in Products, Orders, etc.`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (const file of Array.from(files)) {
      const newItem: ClipboardItem = {
        id: `C${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        name: file.name,
        content: URL.createObjectURL(file),
        size: `${(file.size / (1024*1024)).toFixed(1)} MB`,
        source: 'upload',
        createdAt: new Date().toLocaleString(),
        tags: [],
        pinned: false,
      };
      setItems(prev => [newItem, ...prev]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      for (const file of Array.from(files)) {
        const newItem: ClipboardItem = {
          id: `C${Date.now()}_drop`,
          type: file.type.startsWith('image/') ? 'image' : 'document',
          name: file.name,
          content: URL.createObjectURL(file),
          size: `${(file.size / (1024*1024)).toFixed(1)} MB`,
          source: 'drag',
          createdAt: new Date().toLocaleString(),
          tags: [],
          pinned: false,
        };
        setItems(prev => [newItem, ...prev]);
      }
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        const isUrl = text.startsWith('http://') || text.startsWith('https://');
        const newItem: ClipboardItem = {
          id: `C${Date.now()}_paste`,
          type: isUrl ? 'link' : 'note',
          name: isUrl ? text.split('/').pop()?.slice(0, 40) || 'Link' : 'Pasted Text',
          content: text,
          source: 'clipboard',
          createdAt: new Date().toLocaleString(),
          tags: [],
          pinned: false,
        };
        setItems(prev => [newItem, ...prev]);
      }
    } catch {
      alert('Could not read clipboard. Paste manually or upload a file.');
    }
  };

  const filterTypes = [
    { id: 'all', label: 'All', icon: Files },
    { id: 'image', label: 'Images', icon: ImageIcon },
    { id: 'document', label: 'Documents', icon: FileText },
    { id: 'link', label: 'Links', icon: Link2 },
    { id: 'note', label: 'Notes', icon: File },
  ];

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Clipboard</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button variant="secondary" size="sm" onClick={handlePasteFromClipboard}>
            <Clipboard size={14} /> Paste
          </Button>
          <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
            <Upload size={14} /> Upload
          </Button>
          <input ref={fileInputRef} type="file" multiple
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <Button variant="ghost" size="sm"
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
            {view === 'grid' ? '📋 List' : '📐 Grid'}
          </Button>
        </div>
      </div>

      {/* Drop Zone */}
      <div onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: dragging ? '2px dashed var(--accent)' : '2px dashed var(--border)',
          borderRadius: 12, padding: dragging ? 24 : 16,
          marginBottom: 20, textAlign: 'center',
          background: dragging ? 'var(--accent-light)' : 'transparent',
          transition: 'all 0.2s',
          cursor: 'pointer',
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        {dragging ? (
          <div>
            <Upload size={24} style={{ color: 'var(--accent)', marginBottom: 8 }} />
            <p style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>
              Drop files here
            </p>
          </div>
        ) : (
          <div>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'var(--accent-light)', margin: '0 auto 8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FolderOpen size={24} style={{ color: 'var(--accent)' }} />
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Drag & drop files, photos, or links here
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
              Or click to browse
            </p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {filterTypes.map(ft => {
          const Icon = ft.icon;
          return (
            <button key={ft.id}
              className={`btn btn-sm ${filter === ft.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter(ft.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon size={12} />
              {ft.label}
            </button>
          );
        })}
        <div style={{ flex: 1 }} />
        <div style={{ position: 'relative', width: 200 }}>
          <Search size={12} style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
          }} />
          <input className="form-input" style={{ paddingLeft: 28, fontSize: 12 }}
            placeholder="Search..." value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex', gap: 16, marginBottom: 16, fontSize: 12, color: 'var(--text-muted)',
      }}>
        <span>📦 {items.length} items</span>
        <span>📌 {items.filter(i => i.pinned).length} pinned</span>
        <span>🖼️ {items.filter(i => i.type === 'image').length} images</span>
        <span>📄 {items.filter(i => i.type === 'document').length} documents</span>
        <span>🔗 {items.filter(i => i.type === 'link').length} links</span>
      </div>

      {/* Content */}
      {filteredItems.length === 0 ? (
        <EmptyState
          icon={<Clipboard size={48} />}
          message="Nothing in clipboard"
          action={
            <Button variant="primary" onClick={() => fileInputRef.current?.click()}>
              <Upload size={14} /> Upload your first file
            </Button>
          }
        />
      ) : (
        <div>
          {/* Pinned Section */}
          {pinnedItems.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
                📌 Pinned
              </h3>
              <div style={{
                display: view === 'grid'
                  ? 'grid'
                  : 'flex',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                flexDirection: 'column',
                gap: 8,
              }}>
                {pinnedItems.map(item => (
                  view === 'grid' ? (
                    <ItemCard key={item.id} item={item} onDelete={handleDelete} onPin={handlePin} onUse={handleUse} />
                  ) : (
                    <div key={item.id} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '8px 12px', borderRadius: 8,
                      background: 'var(--bg-card)', border: '1px solid var(--border)',
                    }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 6,
                        background: 'var(--bg-secondary)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                      }}>
                        {React.createElement(TYPE_CONFIG[item.type]?.icon || File, { size: 14, style: { color: TYPE_CONFIG[item.type]?.color || 'var(--text-muted)' } })}
                      </div>
                      <span style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)' }}>{item.name}</span>
                      <Badge variant="info">{TYPE_CONFIG[item.type]?.label}</Badge>
                      <button className="btn btn-ghost btn-sm" onClick={() => handleUse(item)}>
                        <ExternalLink size={12} />
                      </button>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* All Items */}
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
              All Items
            </h3>
            <div style={{
              display: view === 'grid'
                ? 'grid'
                : 'flex',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              flexDirection: 'column',
              gap: 8,
            }}>
              {unpinnedItems.map(item => (
                view === 'grid' ? (
                  <ItemCard key={item.id} item={item} onDelete={handleDelete} onPin={handlePin} onUse={handleUse} />
                ) : (
                  <div key={item.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '8px 12px', borderRadius: 8,
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 6,
                      background: 'var(--bg-secondary)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      {React.createElement(TYPE_CONFIG[item.type]?.icon || File, { size: 14 })}
                    </div>
                    <span style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)' }}>{item.name}</span>
                    <Badge variant="info">{TYPE_CONFIG[item.type]?.label}</Badge>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleUse(item)}>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      )}

      {/* File input hidden */}
      <input ref={fileInputRef} type="file" multiple
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
    </div>
  );
}
