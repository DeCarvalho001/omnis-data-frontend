import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  message: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon, message, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {icon && <div style={{ marginBottom: 12, opacity: 0.5 }}>{icon}</div>}
      <p style={{ color: 'var(--text-muted)', marginBottom: action ? 16 : 0 }}>{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
