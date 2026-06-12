export interface User {
  id: number;
  companyId: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Product {
  id: number;
  companyId: number;
  code: string;
  name: string;
  description: string | null;
  category: string;
  supplier: string | null;
  brand: string | null;
  quantity: number | null;
  unitPrice: number | null;
  costPrice: number | null;
  expiryDate: string | null;
  status: string;
}

export interface Client {
  id: number; name: string; type: string; email: string | null;
  phone: string | null; cpfCnpj: string | null; status: string;
  city: string | null; state: string | null; creditLimit: number;
}

export interface Order {
  id: number; orderNumber: string; type: string; status: string;
  total: number; clientId: number | null; supplierId: number | null;
  orderDate: string; expectedDate: string | null;
}

export interface Transaction {
  id: number; type: string; category: string; amount: number;
  date: string; dueDate: string | null; status: string; description: string | null;
}

export interface KnowledgeBase {
  id: number; title: string; content: string; type: string;
  category: string | null; tags: string | null; status: string;
  summary: string | null; viewCount: number;
}

export interface DashboardWidget {
  id: string; type: string; title: string; size: string; order: number;
}

export interface Task {
  id: number; title: string; description: string | null; priority: string;
  status: string; dueDate: string | null; assignedTo: number | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; perPage: number; currentPage: number; lastPage: number; };
}
