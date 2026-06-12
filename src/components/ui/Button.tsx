import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  style,
  onClick,
  disabled,
  children
}: ButtonProps) {
  const classNames = `btn btn-${variant} btn-${size} ${className}`.trim();

  return (
    <button
      className={classNames}
      style={style}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <span className="spinner" style={{ width: 14, height: 14, marginRight: 4 }} /> : null}
      {children}
    </button>
  );
}
