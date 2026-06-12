import { useState, useRef } from 'react';
import {
  Search, Camera, Upload, Package, Ruler, FileText,
  Youtube, ExternalLink, Clipboard, Check, X, Plus,
  Image as ImageIcon, Trash2, AlertTriangle, DollarSign,
  Truck, Layers, Hash, Weight,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

// ===== TIPOS =====
interface PartSpecs {
  dimensions: string;
  weight: string;
  material: string;
  color: string;
  category: string;
}

interface PartResult {
  id: string;
  name: string;
  code: string;
  description: string;
  image?: string;
  specs: PartSpecs;
  stock: number;
  minStock: number;
  price: number;
  supplier: string;
  location: string;  // physical location in warehouse/factory
  lastUpdated: string;
  documents: { name: string; type: string }[];
  similarParts: { name: string; code: string }[];
  videos: { title: string; url: string }[];
}

// ===== MOCK DATA =====
const MOCK_PARTS: PartResult[] = [
  {
    id: 'P001', name: 'Roller Bearing 6205-2RS', code: 'RB-6205-2RS',
    description: 'Sealed deep groove ball bearing, 25x52x15mm. Double rubber seal. Suitable for electric motors and conveyor systems.',
    specs: { dimensions: '25mm × 52mm × 15mm', weight: '0.13 kg', material: 'Chrome Steel GCr15', color: 'Silver / Black seals', category: 'Bearings' },
    stock: 234, minStock: 50, price: 8.50, supplier: 'SKF do Brasil',
    location: 'Aisle B, Shelf 3, Bin 14', lastUpdated: '2026-06-10',
    documents: [
      { name: 'SKF 6205-2RS Datasheet.pdf', type: 'PDF' },
      { name: 'Installation Guide Bearings.pdf', type: 'PDF' },
      { name: 'Maintenance Log - Line 3.xlsx', type: 'Excel' },
    ],
    similarParts: [
      { name: 'Roller Bearing 6204-2RS', code: 'RB-6204-2RS' },
      { name: 'Roller Bearing 6206-2RS', code: 'RB-6206-2RS' },
      { name: 'Sealed Bearing 6305-2RS', code: 'SB-6305-2RS' },
    ],
    videos: [
      { title: 'How to Install 6205-2RS Bearing', url: 'https://youtube.com/watch?v=example1' },
      { title: 'Bearing Maintenance Tips', url: 'https://youtube.com/watch?v=example2' },
    ],
  },
  {
    id: 'P002', name: 'V-Belt SPB 2000', code: 'VB-SPB2000',
    description: 'Industrial V-belt, SPB section, 2000mm pitch length. For industrial machinery transmission.',
    specs: { dimensions: '2000mm × 16mm × 10mm', weight: '0.35 kg', material: 'Reinforced Rubber', color: 'Black', category: 'Belts' },
    stock: 89, minStock: 30, price: 12.90, supplier: 'Gates do Brasil',
    location: 'Aisle A, Shelf 7', lastUpdated: '2026-06-08',
    documents: [
      { name: 'Gates SPB Belt Specs.pdf', type: 'PDF' },
      { name: 'Belt Tension Guide.pdf', type: 'PDF' },
    ],
    similarParts: [
      { name: 'V-Belt SPB 1800', code: 'VB-SPB1800' },
      { name: 'V-Belt SPB 2240', code: 'VB-SPB2240' },
    ],
    videos: [
      { title: 'How to Replace V-Belt', url: 'https://youtube.com/watch?v=example3' },
    ],
  },
  {
    id: 'P003', name: 'Hydraulic Cylinder HCD-50-200', code: 'HYD-HCD50200',
    description: 'Double acting hydraulic cylinder, 50mm bore, 200mm stroke. Max pressure 210 bar.',
    specs: { dimensions: '50mm bore × 200mm stroke × 350mm total', weight: '8.2 kg', material: 'Carbon Steel / Chrome Plated Rod', color: 'Blue painted', category: 'Hydraulics' },
    stock: 12, minStock: 20, price: 245.00, supplier: 'Bosch Rexroth',
    location: 'Aisle D, Rack 2', lastUpdated: '2026-06-11',
    documents: [
      { name: 'Rexroth HCD Series Catalog.pdf', type: 'PDF' },
      { name: 'Hydraulic Diagram - Press 3.pdf', type: 'PDF' },
      { name: 'Safety Manual Hydraulics.pdf', type: 'PDF' },
    ],
    similarParts: [
      { name: 'Hydraulic Cylinder HCD-40-200', code: 'HYD-HCD40200' },
      { name: 'Hydraulic Cylinder HCD-50-150', code: 'HYD-HCD50150' },
    ],
    videos: [
      { title: 'Hydraulic Cylinder Installation', url: 'https://youtube.com/watch?v=example4' },
      { title: 'Troubleshooting Hydraulic Leaks', url: 'https://youtube.com/watch?v=example5' },
    ],
  },
];

// ===== PART DETAIL CARD =====
function PartDetail({ part, onClose }: { part: PartResult; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'info' | 'docs' | 'videos'>('info');
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 16, width: '100%', maxWidth: 700,
        maxHeight: '90vh', overflow: 'auto',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 16,
          padding: 24, borderBottom: '1px solid var(--border)',
          position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 1,
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: 12,
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, fontSize: 10, color: 'var(--text-muted)',
          }}>
            <ImageIcon size={32} style={{ opacity: 0.3 }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{part.name}</h2>
              {part.stock <= part.minStock && (
                <Badge variant="danger">Low Stock</Badge>
              )}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'monospace', marginBottom: 4 }}>
              {part.code}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {part.supplier} • {part.location}
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm" style={{ padding: 6 }}>
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
          {(['info', 'docs', 'videos'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, padding: '10px', textAlign: 'center',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 500,
                color: activeTab === tab ? 'var(--accent)' : 'var(--text-muted)',
                borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
                textTransform: 'capitalize',
              }}>
              {tab === 'info' ? '📋 Details' : tab === 'docs' ? '📄 Docs' : '🎬 Videos'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: 20 }}>
          {activeTab === 'info' && (
            <div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>
                {part.description}
              </p>

              {/* Specs Grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
                marginBottom: 16,
              }}>
                {[
                  { icon: Ruler, label: 'Dimensions', value: part.specs.dimensions },
                  { icon: Weight, label: 'Weight', value: part.specs.weight },
                  { icon: Layers, label: 'Material', value: part.specs.material },
                  { icon: Hash, label: 'Code', value: part.code },
                ].map(s => (
                  <div key={s.label} style={{
                    background: 'var(--bg-secondary)', borderRadius: 8,
                    padding: '10px 12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <s.icon size={12} style={{ color: 'var(--accent)' }} />
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>
                      {s.value}
                      <button onClick={() => copyToClipboard(s.value, s.label)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8, verticalAlign: 'middle' }}>
                        {copied === s.label
                          ? <Check size={12} style={{ color: 'var(--success)' }} />
                          : <Clipboard size={12} style={{ color: 'var(--text-muted)' }} />
                        }
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stock & Price */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{
                  background: 'var(--bg-secondary)', borderRadius: 8,
                  padding: '10px 12px',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Stock</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: part.stock <= part.minStock ? 'var(--danger)' : 'var(--success)' }}>
                    {part.stock} units
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Min: {part.minStock}</div>
                </div>
                <div style={{
                  background: 'var(--bg-secondary)', borderRadius: 8,
                  padding: '10px 12px',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Price</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)' }}>
                    $ {part.price.toFixed(2)}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>per unit</div>
                </div>
              </div>

              {/* Similar Parts */}
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
                  Similar Parts
                </h4>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {part.similarParts.map(p => (
                    <button key={p.code} className="btn btn-secondary btn-sm" style={{ fontSize: 12 }}>
                      <Package size={12} /> {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'docs' && (
            <div>
              <div style={{ marginBottom: 12 }}>
                <Button variant="primary" size="sm">
                  <Upload size={14} /> Upload Document
                </Button>
              </div>
              {part.documents.map((doc, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 8,
                  background: 'var(--bg-secondary)', marginBottom: 8,
                }}>
                  <FileText size={16} style={{ color: 'var(--accent)' }} />
                  <span style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)' }}>{doc.name}</span>
                  <Badge variant="info">{doc.type}</Badge>
                  <button className="btn btn-ghost btn-sm">
                    <ExternalLink size={12} />
                  </button>
                </div>
              ))}
              {part.documents.length === 0 && (
                <EmptyState icon={<FileText size={24} />} message="No documents for this part" />
              )}
            </div>
          )}

          {activeTab === 'videos' && (
            <div>
              <div style={{ marginBottom: 12 }}>
                <Button variant="secondary" size="sm">
                  <Youtube size={14} /> Search YouTube
                </Button>
              </div>
              {part.videos.map((video, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 8,
                  background: 'var(--bg-secondary)', marginBottom: 8,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'rgba(255,0,0,0.15)', color: '#ef4444',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Youtube size={16} />
                  </div>
                  <span style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)' }}>{video.title}</span>
                  <button className="btn btn-ghost btn-sm"
                    onClick={() => window.open(video.url, '_blank')}>
                    <ExternalLink size={12} /> Watch
                  </button>
                </div>
              ))}
              {part.videos.length === 0 && (
                <EmptyState icon={<Youtube size={24} />} message="No videos found" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== MAIN VISUAL SEARCH PAGE =====
export default function VisualSearchPage() {
  const [searchMode, setSearchMode] = useState<'text' | 'camera'>('text');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PartResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PartResult | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    setSearching(true);
    setSearched(true);
    // Mock search - filter by query
    const q = query.toLowerCase();
    setTimeout(() => {
      const filtered = MOCK_PARTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.supplier.toLowerCase().includes(q)
      );
      setResults(filtered);
      setSearching(false);
    }, 600);
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
      setSearching(true);
      setSearched(true);
      // Simulate visual search
      setTimeout(() => {
        setResults(MOCK_PARTS);
        setSearching(false);
      }, 1200);
    };
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => {
    setPhotoPreview(null);
    setResults([]);
    setSearched(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const quickActions = [
    { icon: Package, label: 'Scan Barcode', color: 'var(--accent)' },
    { icon: Ruler, label: 'Measure Part', color: 'var(--success)' },
    { icon: Youtube, label: 'Video Guides', color: '#ef4444' },
    { icon: FileText, label: 'Recent Docs', color: 'var(--warning)' },
    { icon: Clipboard, label: 'Last Viewed', color: 'var(--info)' },
    { icon: Plus, label: 'Quick Add', color: 'var(--accent)' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Visual Search</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className={`btn ${searchMode === 'text' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setSearchMode('text')}
          >
            <Search size={14} /> Text
          </button>
          <button
            className={`btn ${searchMode === 'camera' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setSearchMode('camera')}
          >
            <Camera size={14} /> Photo
          </button>
        </div>
      </div>

      {/* Search Area */}
      {searchMode === 'text' ? (
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={14} style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }} />
            <input
              className="form-input"
              style={{ paddingLeft: 36 }}
              placeholder='Search by name, code, supplier, or description...'
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button variant="primary" onClick={handleSearch} loading={searching}>
            <Search size={14} /> Search
          </Button>
        </div>
      ) : (
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 12, padding: 24, marginBottom: 20, textAlign: 'center',
        }}>
          {photoPreview ? (
            <div>
              <img src={photoPreview} alt="Captured part"
                style={{
                  maxWidth: '100%', maxHeight: 300, borderRadius: 8,
                  marginBottom: 12, objectFit: 'contain',
                }} />
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <Button variant="primary" loading={searching}>
                  <Search size={14} /> Identify Part
                </Button>
                <Button variant="ghost" onClick={clearPhoto}>
                  <Trash2 size={14} /> Remove
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{
                width: 80, height: 80, borderRadius: 20,
                background: 'var(--accent-light)', margin: '0 auto 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Camera size={36} style={{ color: 'var(--accent)' }} />
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
                Take a photo of the part to identify it instantly
              </p>
              <Button variant="primary" onClick={() => fileInputRef.current?.click()}>
                <Camera size={14} /> Take or Upload Photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                style={{ display: 'none' }}
                onChange={handlePhotoCapture}
              />
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 12 }}>
                Works with camera or gallery images
              </p>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 8, marginBottom: 20,
      }}>
        {quickActions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button key={i} className="btn btn-secondary btn-sm"
              style={{ justifyContent: 'flex-start', gap: 8, padding: '10px 12px' }}>
              <Icon size={14} style={{ color: action.color }} />
              {action.label}
            </button>
          );
        })}
      </div>

      {/* Results */}
      {searching && (
        <div style={{ textAlign: 'center', padding: 32 }}>
          <div className="spinner" style={{ height: 'auto', padding: 20 }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Searching parts...</span>
          </div>
        </div>
      )}

      {!searching && searched && results.length === 0 && (
        <EmptyState
          icon={<Package size={48} />}
          message="No parts found"
          action={
            <Button variant="primary" size="sm">
              <Plus size={14} /> Add New Part
            </Button>
          }
        />
      )}

      {!searching && results.length > 0 && (
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
            Found {results.length} part{results.length > 1 ? 's' : ''}
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {results.map(part => (
              <div key={part.id}
                onClick={() => setSelectedPart(part)}
                style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: 16, cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: 16, alignItems: 'center',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                {/* Thumbnail */}
                <div style={{
                  width: 56, height: 56, borderRadius: 10,
                  background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 10, color: 'var(--text-muted)',
                }}>
                  <ImageIcon size={24} style={{ opacity: 0.3 }} />
                </div>

                {/* Info */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                      {part.name}
                    </span>
                    {part.stock <= part.minStock && (
                      <Badge variant="danger">Low</Badge>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'monospace', marginBottom: 4 }}>
                    {part.code}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {part.specs.dimensions} • {part.stock} in stock • {part.supplier}
                  </div>
                </div>

                {/* Price & CTA */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
                    $ {part.price.toFixed(2)}
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {part.specs.weight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Part Detail Modal */}
      {selectedPart && (
        <PartDetail part={selectedPart} onClose={() => setSelectedPart(null)} />
      )}
    </div>
  );
}
