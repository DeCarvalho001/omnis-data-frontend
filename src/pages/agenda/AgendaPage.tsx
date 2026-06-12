import { useState, useMemo } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';

interface Appointment {
  id: number;
  title: string;
  date: string;
  time: string;
  endTime: string;
  type: 'meeting' | 'call' | 'task' | 'reminder';
  description: string;
  relatedTask?: string;
}

const mockAppointments: Appointment[] = [
  { id: 1, title: 'Sprint Planning', date: '2026-06-11', time: '09:00', endTime: '10:30', type: 'meeting', description: 'Weekly sprint planning with the dev team', relatedTask: 'OMNIS-234' },
  { id: 2, title: 'Call with Client ABC', date: '2026-06-11', time: '14:00', endTime: '14:45', type: 'call', description: 'Discuss Q3 requirements', relatedTask: 'OMNIS-240' },
  { id: 3, title: 'Code Review', date: '2026-06-11', time: '16:00', endTime: '17:00', type: 'task', description: 'Review PR #142 for auth module' },
  { id: 4, title: 'Team Standup', date: '2026-06-12', time: '09:30', endTime: '09:45', type: 'meeting', description: 'Daily standup' },
  { id: 5, title: 'Submit Report', date: '2026-06-13', time: '10:00', endTime: '11:00', type: 'task', description: 'Monthly financial report', relatedTask: 'OMNIS-245' },
  { id: 6, title: 'Doctor Appointment', date: '2026-06-14', time: '08:00', endTime: '09:00', type: 'reminder', description: 'Annual checkup' },
  { id: 7, title: 'Product Demo', date: '2026-06-15', time: '15:00', endTime: '16:00', type: 'meeting', description: 'Demo new features to stakeholders' },
];

const typeColors: Record<string, 'info' | 'success' | 'warning' | 'danger'> = {
  meeting: 'info',
  call: 'success',
  task: 'warning',
  reminder: 'danger',
};

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function AgendaPage() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(formatDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = formatDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  const navigate = (direction: 'prev' | 'next') => {
    const delta = direction === 'prev' ? -1 : 1;
    if (view === 'month') {
      setCurrentDate(new Date(year, month + delta, 1));
    } else if (view === 'week') {
      setCurrentDate(new Date(year, month, currentDate.getDate() + 7 * delta));
    } else {
      setCurrentDate(new Date(year, month, currentDate.getDate() + delta));
    }
  };

  const appointmentsForDate = (date: string) => {
    return mockAppointments.filter((a) => a.date === date);
  };

  const selectedAppointments = appointmentsForDate(selectedDate);

  const weekDays = useMemo(() => {
    const days: string[] = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      days.push(formatDate(d.getFullYear(), d.getMonth(), d.getDate()));
    }
    return days;
  }, [currentDate]);

  const titleLabel =
    view === 'month'
      ? currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      : view === 'week'
      ? `Week of ${weekDays[0]}`
      : currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Agenda</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div className="btn-group" style={{ display: 'flex', gap: 2 }}>
            {(['day', 'week', 'month'] as const).map((v) => (
              <Button
                key={v}
                variant={view === v ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setView(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Button>
            ))}
          </div>
          <Button variant="primary" size="sm">
            <Plus size={14} /> New
          </Button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
        <Button variant="ghost" size="sm" onClick={() => navigate('prev')}>
          <ChevronLeft size={18} />
        </Button>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, minWidth: 200, textAlign: 'center' }}>
          {titleLabel}
        </h2>
        <Button variant="ghost" size="sm" onClick={() => navigate('next')}>
          <ChevronRight size={18} />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => {
          const d = new Date();
          setCurrentDate(d);
          setSelectedDate(formatDate(d.getFullYear(), d.getMonth(), d.getDate()));
        }}>
          Today
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
        {/* Calendar grid */}
        <Card>
          {view === 'month' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0 }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div
                  key={d}
                  style={{
                    padding: '8px 4px',
                    textAlign: 'center',
                    fontSize: 'var(--font-sm)',
                    color: 'var(--text-muted)',
                    fontWeight: 500,
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {d}
                </div>
              ))}
              {Array.from({ length: getFirstDayOfMonth(year, month) }).map((_, i) => (
                <div key={`empty-${i}`} style={{ minHeight: 80, borderBottom: '1px solid var(--border)' }} />
              ))}
              {Array.from({ length: getDaysInMonth(year, month) }).map((_, i) => {
                const day = i + 1;
                const dateStr = formatDate(year, month, day);
                const dayApps = appointmentsForDate(dateStr);
                const isToday = dateStr === today;
                const isSelected = dateStr === selectedDate;
                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    style={{
                      minHeight: 80,
                      padding: 4,
                      borderBottom: '1px solid var(--border)',
                      borderRight: '1px solid var(--border)',
                      cursor: 'pointer',
                      background: isSelected ? 'color-mix(in srgb, var(--accent) 8%, transparent)' : 'transparent',
                      transition: 'background 0.15s',
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        fontSize: 'var(--font-sm)',
                        fontWeight: isToday ? 700 : 400,
                        background: isToday ? 'var(--accent)' : 'transparent',
                        color: isToday ? '#fff' : 'var(--text-primary)',
                        marginBottom: 2,
                      }}
                    >
                      {day}
                    </div>
                    {dayApps.slice(0, 3).map((app) => (
                      <div
                        key={app.id}
                        style={{
                          fontSize: 10,
                          padding: '1px 4px',
                          borderRadius: 3,
                          marginBottom: 1,
                          background:
                            app.type === 'meeting'
                              ? 'color-mix(in srgb, var(--accent) 20%, transparent)'
                              : app.type === 'call'
                              ? 'color-mix(in srgb, var(--success) 20%, transparent)'
                              : app.type === 'task'
                              ? 'color-mix(in srgb, var(--warning) 20%, transparent)'
                              : 'color-mix(in srgb, var(--danger) 20%, transparent)',
                          color: 'var(--text-primary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {app.time} {app.title}
                      </div>
                    ))}
                    {dayApps.length > 3 && (
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', paddingLeft: 2 }}>
                        +{dayApps.length - 3} more
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {view === 'week' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0 }}>
              {weekDays.map((dateStr) => {
                const dayApps = appointmentsForDate(dateStr);
                const d = new Date(dateStr);
                const isToday = dateStr === today;
                return (
                  <div
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    style={{
                      minHeight: 120,
                      padding: 6,
                      borderRight: '1px solid var(--border)',
                      cursor: 'pointer',
                      background: dateStr === selectedDate ? 'color-mix(in srgb, var(--accent) 8%, transparent)' : 'transparent',
                    }}
                  >
                    <div
                      style={{
                        textAlign: 'center',
                        fontWeight: isToday ? 700 : 400,
                        fontSize: 'var(--font-sm)',
                        marginBottom: 8,
                        color: isToday ? 'var(--accent)' : 'var(--text-secondary)',
                      }}
                    >
                      {d.toLocaleDateString('en-US', { weekday: 'short' })}
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          margin: '2px auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          background: isToday ? 'var(--accent)' : 'transparent',
                          color: isToday ? '#fff' : 'var(--text-primary)',
                          fontSize: 'var(--font-sm)',
                        }}
                      >
                        {d.getDate()}
                      </div>
                    </div>
                    {dayApps.slice(0, 4).map((app) => (
                      <div
                        key={app.id}
                        style={{
                          fontSize: 10,
                          padding: '2px 4px',
                          borderRadius: 3,
                          marginBottom: 2,
                          background:
                            app.type === 'meeting'
                              ? 'color-mix(in srgb, var(--accent) 20%, transparent)'
                              : app.type === 'call'
                              ? 'color-mix(in srgb, var(--success) 20%, transparent)'
                              : app.type === 'task'
                              ? 'color-mix(in srgb, var(--warning) 20%, transparent)'
                              : 'color-mix(in srgb, var(--danger) 20%, transparent)',
                        }}
                      >
                        {app.time}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {view === 'day' && (
            <div>
              <div
                style={{
                  fontSize: 'var(--font-lg)',
                  fontWeight: 600,
                  marginBottom: 16,
                  color: 'var(--text-primary)',
                }}
              >
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              {selectedAppointments.length === 0 ? (
                <EmptyState
                  icon={<Clock size={40} />}
                  message="No appointments for this day"
                  action={<Button variant="primary" size="sm"><Plus size={14} /> Add Appointment</Button>}
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {Array.from({ length: 24 }).map((_, hour) => {
                    const hourStr = `${String(hour).padStart(2, '0')}:00`;
                    const hourApps = selectedAppointments.filter(
                      (a) => parseInt(a.time) <= hour && parseInt(a.endTime || a.time) > hour
                    );
                    return (
                      <div
                        key={hour}
                        style={{
                          display: 'flex',
                          gap: 12,
                          minHeight: 40,
                          borderTop: '1px solid var(--border)',
                          padding: '4px 0',
                        }}
                      >
                        <div
                          style={{
                            width: 60,
                            fontSize: 'var(--font-sm)',
                            color: 'var(--text-muted)',
                            textAlign: 'right',
                            paddingRight: 8,
                            flexShrink: 0,
                          }}
                        >
                          {hourStr}
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {hourApps.map((app) => (
                            <div
                              key={app.id}
                              style={{
                                padding: '6px 10px',
                                borderRadius: 'var(--radius-sm)',
                                background:
                                  app.type === 'meeting'
                                    ? 'color-mix(in srgb, var(--accent) 15%, transparent)'
                                    : app.type === 'call'
                                    ? 'color-mix(in srgb, var(--success) 15%, transparent)'
                                    : app.type === 'task'
                                    ? 'color-mix(in srgb, var(--warning) 15%, transparent)'
                                    : 'color-mix(in srgb, var(--danger) 15%, transparent)',
                                border: `1px solid color-mix(in srgb, var(--border) 50%, transparent)`,
                                cursor: 'pointer',
                              }}
                            >
                              <div style={{ fontWeight: 500, fontSize: 'var(--font-sm)' }}>{app.title}</div>
                              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                                {app.time} - {app.endTime}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Details panel */}
        <Card title={selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a date'}>
          {selectedAppointments.length === 0 ? (
            <EmptyState
              icon={<Calendar size={32} />}
              message="No appointments on this day"
              action={<Button variant="primary" size="sm"><Plus size={14} /> Add</Button>}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {selectedAppointments.map((app) => (
                <div
                  key={app.id}
                  style={{
                    padding: 12,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-secondary)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontWeight: 600, fontSize: 'var(--font-sm)' }}>{app.title}</div>
                    <Badge variant={typeColors[app.type]}>{app.type}</Badge>
                  </div>
                  <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 4 }}>
                    <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                    {app.time} - {app.endTime}
                  </div>
                  <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)' }}>
                    {app.description}
                  </div>
                  {app.relatedTask && (
                    <div style={{ marginTop: 6, fontSize: 11, color: 'var(--accent)' }}>
                      🔗 Task: {app.relatedTask}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
