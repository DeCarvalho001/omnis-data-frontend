import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, Star, Rocket, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'For small businesses starting to organize their data',
    icon: Zap,
    color: '#3b82f6',
    features: [
      'Smart spreadsheet import',
      'Product & inventory management',
      'Basic CRM (up to 200 clients)',
      'Financial dashboard',
      'Low stock alerts',
      'Excel and CSV export',
      '1 user',
      'Up to 5 uploads/month',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For growing businesses that need more power',
    icon: Star,
    color: '#8b5cf6',
    features: [
      'Everything in Starter, plus:',
      'Unlimited product imports',
      'Unlimited clients',
      'Order & supplier management',
      'AI Assistant (OmnisBrain)',
      'Document generation (Word, Excel, PDF)',
      'Up to 5 users',
      'Unlimited uploads',
      'Priority support',
      'Custom alerts & notifications',
    ],
    cta: 'Start Free',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For organizations with advanced needs',
    icon: Rocket,
    color: '#f59e0b',
    features: [
      'Everything in Pro, plus:',
      'Custom integrations & API',
      'Dedicated support',
      'Team accounts (unlimited)',
      'Advanced security & audit',
      'SLA guarantee',
      'Custom training',
      'White-label option',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      padding: '60px 24px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{
          fontSize: 36,
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: 12,
        }}>
          Simple, transparent pricing
        </h1>
        <p style={{
          fontSize: 16,
          color: 'var(--text-secondary)',
          maxWidth: 500,
          margin: '0 auto',
        }}>
          Choose the plan that fits your business. All plans include a 14-day free trial.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 24,
        maxWidth: 1100,
        margin: '0 auto',
        alignItems: 'start',
      }}>
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isPopular = plan.popular;

          return (
            <div key={plan.name} style={{
              background: isPopular
                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))'
                : 'var(--bg-card)',
              border: isPopular
                ? '1px solid rgba(139, 92, 246, 0.3)'
                : '1px solid var(--border)',
              borderRadius: 16,
              padding: 32,
              position: 'relative',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = isPopular ? 'rgba(139, 92, 246, 0.5)' : 'var(--border-light)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = isPopular ? 'rgba(139, 92, 246, 0.3)' : 'var(--border)' }}
            >
              {isPopular && (
                <div style={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: 'white',
                  padding: '4px 16px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                }}>
                  Most Popular
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${plan.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: plan.color,
                }}>
                  <Icon size={22} />
                </div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>{plan.name}</h2>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{plan.description}</p>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: 'var(--text-primary)' }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{plan.period}</span>
              </div>

              <div style={{ marginBottom: 24 }}>
                {plan.features.map((feat, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '6px 0',
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                  }}>
                    <Check size={14} style={{ color: plan.color, flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={isPopular ? 'primary' : 'secondary'}
                size="lg"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => navigate('/register')}
              >
                {plan.cta}
                <ArrowRight size={16} />
              </Button>
            </div>
          );
        })}
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: 48,
        padding: 32,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        maxWidth: 700,
        margin: '48px auto 0',
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
          Need a custom solution?
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
          We offer custom plans for large organizations. Contact us to discuss your needs.
        </p>
        <Button variant="secondary" onClick={() => window.location.href = 'mailto:sales@omnisdata.app'}>
          Contact Sales
        </Button>
      </div>
    </div>
  );
}
