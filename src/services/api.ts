const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('omnis_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> || {}),
  };

  // Don't set Content-Type for FormData
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    localStorage.removeItem('omnis_token');
    window.location.href = '/login';
    throw new Error('Not authenticated');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }

  return res.json();
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ token: string; user: any }>('/auth/login', {
      method: 'POST', body: JSON.stringify({ email, password }),
    }),
  register: (data: { name: string; email: string; password: string; companyName: string }) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  me: () => request<any>('/auth/me'),

  // Products
  getProducts: (params?: string) =>
    request<any>(`/products?${params || ''}`),
  getProduct: (id: number) => request<any>(`/products/${id}`),
  updateProduct: (id: number, data: any) =>
    request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id: number) =>
    request(`/products/${id}`, { method: 'DELETE' }),

  // Clients
  getClients: (params?: string) => request<any>(`/clients?${params || ''}`),
  createClient: (data: any) => request('/clients', { method: 'POST', body: JSON.stringify(data) }),
  updateClient: (id: number, data: any) => request(`/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteClient: (id: number) => request(`/clients/${id}`, { method: 'DELETE' }),

  // Suppliers
  getSuppliers: (params?: string) => request<any>(`/suppliers?${params || ''}`),
  createSupplier: (data: any) => request('/suppliers', { method: 'POST', body: JSON.stringify(data) }),

  // Orders
  getOrders: (params?: string) => request<any>(`/orders?${params || ''}`),
  createOrder: (data: any) => request('/orders', { method: 'POST', body: JSON.stringify(data) }),

  // Financial
  getFinancial: (params?: string) => request<any>(`/financial?${params || ''}`),
  createTransaction: (data: any) => request('/financial', { method: 'POST', body: JSON.stringify(data) }),

  // Tasks
  getTasks: (params?: string) => request<any>(`/tasks?${params || ''}`),
  createTask: (data: any) => request('/tasks', { method: 'POST', body: JSON.stringify(data) }),
  completeTask: (id: number) => request(`/tasks/${id}/complete`, { method: 'PUT' }),

  // Dashboard
  getDashboardStats: () => request<any>('/dashboard/stats'),
  getDashboardWidgets: () => request<any>('/dashboard/widgets'),
  getDashboardLayout: () => request<any>('/dashboard/layout'),
  saveDashboardLayout: (data: any) => request('/dashboard/layout', { method: 'PUT', body: JSON.stringify(data) }),

  // Knowledge Base
  getKnowledge: (params?: string) => request<any>(`/knowledge?${params || ''}`),
  createKnowledge: (data: any) => request('/knowledge', { method: 'POST', body: JSON.stringify(data) }),

  // AI
  askAI: (query: string) => request<any>('/ai/ask', { method: 'POST', body: JSON.stringify({ query }) }),
  getAIHistory: () => request<any>('/ai/history'),

  // Upload
  uploadSpreadsheet: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return request<any>('/upload', { method: 'POST', body: form });
  },

  // Global search
  search: (q: string) => request<any>(`/search?q=${encodeURIComponent(q)}`),
};