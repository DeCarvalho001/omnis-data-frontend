import { useState, useMemo } from 'react';
import { Plus, Search, Package, Image } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

interface Product {
  id: number;
  code: string;
  barcode: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  quantity: number;
  minStock: number;
  unitPrice: number;
  costPrice: number;
  supplier: string;
  suppliers: string[];
  status: 'active' | 'inactive' | 'discontinued';
  imageUrl: string | null;
  createdAt: string;
}

const mockProducts: Product[] = [
  { id: 1, code: 'PROD-001', barcode: '7891234560010', name: 'Arroz Integral 5kg', description: 'Arroz integral tipo 1', category: 'Alimentos', brand: 'MinhaMarca', quantity: 120, minStock: 20, unitPrice: 22.90, costPrice: 15.00, supplier: 'Distribuidora ABC', suppliers: ['Distribuidora ABC', 'Alimentos SP'], status: 'active', imageUrl: null, createdAt: '2025-01-15' },
  { id: 2, code: 'PROD-002', barcode: '7891234560027', name: 'Feijão Preto 1kg', description: 'Feijão preto selecionado', category: 'Alimentos', brand: 'MinhaMarca', quantity: 8, minStock: 30, unitPrice: 8.50, costPrice: 5.20, supplier: 'Alimentos SP', suppliers: ['Alimentos SP'], status: 'active', imageUrl: null, createdAt: '2025-02-10' },
  { id: 3, code: 'PROD-003', barcode: '7891234560034', name: 'Óleo de Soja 900ml', description: 'Óleo de soja refinado', category: 'Alimentos', brand: 'CozinhaFácil', quantity: 200, minStock: 50, unitPrice: 6.99, costPrice: 4.10, supplier: 'Distribuidora ABC', suppliers: ['Distribuidora ABC', 'Mega Distrib'], status: 'active', imageUrl: null, createdAt: '2025-01-20' },
  { id: 4, code: 'PROD-004', barcode: '7891234560041', name: 'Detergente Líquido 500ml', description: 'Detergente neutro', category: 'Limpeza', brand: 'Limpol', quantity: 0, minStock: 40, unitPrice: 2.50, costPrice: 1.30, supplier: 'Produtos de Limpeza Ltda', suppliers: ['Produtos de Limpeza Ltda'], status: 'inactive', imageUrl: null, createdAt: '2025-03-05' },
  { id: 5, code: 'PROD-005', barcode: '7891234560058', name: 'Sabão em Pó 1kg', description: 'Sabão em pó biological', category: 'Limpeza', brand: 'Limpol', quantity: 55, minStock: 25, unitPrice: 12.90, costPrice: 8.00, supplier: 'Produtos de Limpeza Ltda', suppliers: ['Produtos de Limpeza Ltda', 'Químicos União'], status: 'active', imageUrl: null, createdAt: '2025-02-28' },
  { id: 6, code: 'PROD-006', barcode: '7891234560065', name: 'Leite em Pó 400g', description: 'Leite em pó integral', category: 'Alimentos', brand: 'NutriLeite', quantity: 5, minStock: 15, unitPrice: 18.50, costPrice: 12.00, supplier: 'Laticínios Premium', suppliers: ['Laticínios Premium'], status: 'active', imageUrl: null, createdAt: '2025-04-01' },
  { id: 7, code: 'PROD-007', barcode: '7891234560072', name: 'Papel Higiênico 12un', description: 'Papel higiênico folha dupla', category: 'Higiene', brand: 'Conforto', quantity: 300, minStock: 60, unitPrice: 15.90, costPrice: 10.50, supplier: 'Higiene Total', suppliers: ['Higiene Total', 'Mega Distrib'], status: 'active', imageUrl: null, createdAt: '2025-01-10' },
  { id: 8, code: 'PROD-008', barcode: '7891234560089', name: 'Café Torrado 500g', description: 'Café torrado moído', category: 'Alimentos', brand: 'CaféBom', quantity: 0, minStock: 30, unitPrice: 14.90, costPrice: 9.00, supplier: 'Alimentos SP', suppliers: ['Alimentos SP'], status: 'discontinued', imageUrl: null, createdAt: '2025-05-12' },
  { id: 9, code: 'PROD-009', barcode: '7891234560096', name: 'Amaciante 2L', description: 'Amaciante concentrado', category: 'Limpeza', brand: 'MaciezTotal', quantity: 18, minStock: 20, unitPrice: 9.90, costPrice: 5.80, supplier: 'Químicos União', suppliers: ['Químicos União', 'Produtos de Limpeza Ltda'], status: 'active', imageUrl: null, createdAt: '2025-03-20' },
  { id: 10, code: 'PROD-010', barcode: '7891234560102', name: 'Água Sanitária 1L', description: 'Água sanitária cloro ativo', category: 'Limpeza', brand: 'BrilhoMax', quantity: 40, minStock: 20, unitPrice: 3.90, costPrice: 2.10, supplier: 'Produtos de Limpeza Ltda', suppliers: ['Produtos de Limpeza Ltda'], status: 'active', imageUrl: null, createdAt: '2025-04-15' },
];

type StatusFilter = 'all' | 'active' | 'inactive' | 'discontinued';
type StockFilter = 'all' | 'low' | 'out' | 'ok';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [stockFilter, setStockFilter] = useState<StockFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const categories = useMemo(() => {
    const cats = new Set(mockProducts.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    let data = [...mockProducts];

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.barcode.includes(q) ||
        p.supplier.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') {
      data = data.filter(p => p.status === statusFilter);
    }
    if (stockFilter === 'low') {
      data = data.filter(p => p.quantity > 0 && p.quantity <= p.minStock);
    } else if (stockFilter === 'out') {
      data = data.filter(p => p.quantity === 0);
    } else if (stockFilter === 'ok') {
      data = data.filter(p => p.quantity > p.minStock);
    }
    if (categoryFilter !== 'all') {
      data = data.filter(p => p.category === categoryFilter);
    }

    return data;
  }, [search, statusFilter, stockFilter, categoryFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  const getStockBadge = (qty: number, min: number) => {
    if (qty === 0) return <Badge variant="danger">Out of Stock</Badge>;
    if (qty <= min) return <Badge variant="warning">Low Stock</Badge>;
    return <Badge variant="success">In Stock</Badge>;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="success">Active</Badge>;
      case 'inactive': return <Badge variant="warning">Inactive</Badge>;
      case 'discontinued': return <Badge variant="danger">Discontinued</Badge>;
      default: return <Badge variant="info">{status}</Badge>;
    }
  };

  const productCount = mockProducts.length;
  const lowStockCount = mockProducts.filter(p => p.quantity > 0 && p.quantity <= p.minStock).length;
  const outOfStockCount = mockProducts.filter(p => p.quantity === 0).length;
  const totalValue = mockProducts.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <form onSubmit={(e) => { e.preventDefault(); setPage(1); }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                className="form-input"
                placeholder="Search products..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={{ width: 220, paddingLeft: 30 }}
              />
            </div>
          </form>
          <select className="form-input" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as StatusFilter); setPage(1); }} style={{ width: 130 }}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="discontinued">Discontinued</option>
          </select>
          <select className="form-input" value={stockFilter} onChange={(e) => { setStockFilter(e.target.value as StockFilter); setPage(1); }} style={{ width: 130 }}>
            <option value="all">All Stock</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
            <option value="ok">In Stock</option>
          </select>
          <select className="form-input" value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }} style={{ width: 130 }}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
          <Button variant="primary" size="sm"><Plus size={14} /> Add Product</Button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Total Products</div>
          <div className="stat-value">{productCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Low Stock</div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{lowStockCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Out of Stock</div>
          <div className="stat-value" style={{ color: 'var(--danger)' }}>{outOfStockCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Inventory Value</div>
          <div className="stat-value">${totalValue.toFixed(2)}</div>
        </div>
      </div>

      <Card title={`Products (${filtered.length})`}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Package size={48} />}
            message="No products found matching your filters"
            action={<Button variant="primary" size="sm"><Plus size={14} /> Add Product</Button>}
          />
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style={{ width: 50 }}>Photo</th>
                  <th>Code / Barcode</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Min. Stock</th>
                  <th>Price</th>
                  <th>Suppliers</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{
                        width: 40, height: 40, borderRadius: 6,
                        background: 'var(--bg-secondary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid var(--border)'
                      }}>
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt={p.name} style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} />
                        ) : (
                          <Image size={18} style={{ color: 'var(--text-muted)' }} />
                        )}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{p.code}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{p.barcode}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.brand}</div>
                    </td>
                    <td><Badge variant="info">{p.category}</Badge></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontWeight: 600, color: p.quantity === 0 ? 'var(--danger)' : p.quantity <= p.minStock ? 'var(--warning)' : undefined }}>
                          {p.quantity}
                        </span>
                        {getStockBadge(p.quantity, p.minStock)}
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{p.minStock}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>${p.unitPrice.toFixed(2)}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Cost: ${p.costPrice.toFixed(2)}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: 13 }}>{p.supplier}</div>
                      {p.suppliers.length > 1 && (
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>+{p.suppliers.length - 1} more</div>
                      )}
                    </td>
                    <td>{getStatusBadge(p.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
            <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button>
            <span style={{ padding: '4px 8px', fontSize: 13, color: 'var(--text-secondary)' }}>{page} of {totalPages}</span>
            <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
