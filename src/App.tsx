import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './globals.css';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import UploadPage from './pages/dashboard/UploadPage';
import AlertsPage from './pages/dashboard/AlertsPage';
import ProductsPage from './pages/products/ProductsPage';
import ClientsPage from './pages/clients/ClientsPage';
import SuppliersPage from './pages/suppliers/SuppliersPage';
import OrdersPage from './pages/orders/OrdersPage';
import FinancialPage from './pages/financial/FinancialPage';
import TasksPage from './pages/tasks/TasksPage';
import DocumentsPage from './pages/documents/DocumentsPage';
import KnowledgePage from './pages/knowledge/KnowledgePage';
import AiPage from './pages/ai/AiPage';
import PricingPage from './pages/pricing/PricingPage';
import SettingsPage from './pages/settings/SettingsPage';
import CalendarPage from './pages/calendar/CalendarPage';
import DirectivesPage from './pages/directives/DirectivesPage';
import SecurityPage from './pages/security/SecurityPage';
import EmailsPage from './pages/emails/EmailsPage';

import AgendaPage from './pages/agenda/AgendaPage';
import ReportsPage from './pages/reports/ReportsPage';
import GoalsPage from './pages/goals/GoalsPage';
import ContractsPage from './pages/contracts/ContractsPage';
import EmployeesPage from './pages/employees/EmployeesPage';
import ArchivePage from './pages/archive/ArchivePage';
import VisualSearchPage from './pages/visualsearch/VisualSearchPage';
import ClipboardPage from './pages/clipboard/ClipboardPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  if (loading) return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" /></div>;
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  if (loading) return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" /></div>;
  if (token) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/agenda" element={<ProtectedRoute><AgendaPage /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
          <Route path="/goals" element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
          <Route path="/contracts" element={<ProtectedRoute><ContractsPage /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><EmployeesPage /></ProtectedRoute>} />
          <Route path="/archive" element={<ProtectedRoute><ArchivePage /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="alerts" element={<AlertsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="suppliers" element={<SuppliersPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="financial" element={<FinancialPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="knowledge" element={<KnowledgePage />} />
            <Route path="ai" element={<AiPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="directives" element={<DirectivesPage />} />
            <Route path="emails" element={<EmailsPage />} />
            <Route path="security" element={<SecurityPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}



