import React from 'react';

interface BadgeProps {
  variant?: 'warning' | 'danger' | 'success' | 'info' | 'neutral';
  children: React.ReactNode;
}

const variantMap: Record<string, string> = {
  warning: 'badge-warning',
  danger: 'badge-danger',
  success: 'badge-success',
  info: 'badge-info',
  neutral: 'badge-neutral',
};

export default function Badge({ variant = 'neutral', children }: BadgeProps) {
  const cls = variantMap[variant] || 'badge-neutral';
  return <span className={`badge ${cls}`}>{children}</span>;
}
