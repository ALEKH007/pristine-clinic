'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';

interface Stats {
  totalAppointments: number;
  todayAppointments: number;
  totalUsers: number;
  pendingMessages: number;
  totalReviews: number;
  totalServices: number;
  totalGallery: number;
  dailyData: { _id: string; count: number }[];
  statusData: { _id: string; count: number }[];
}

const statCards = [
  { key: 'totalAppointments', label: 'Total Appointments', icon: '📅', color: '#3B82F6', bg: 'rgba(59,130,246,0.15)', href: '/dashboard/appointments' },
  { key: 'todayAppointments', label: "Today's Appointments", icon: '🗓️', color: '#10B981', bg: 'rgba(16,185,129,0.15)', href: '/dashboard/appointments' },
  { key: 'totalUsers', label: 'Registered Users', icon: '👥', color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)', href: '/dashboard/users' },
  { key: 'pendingMessages', label: 'Pending Messages', icon: '📩', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)', href: '/dashboard/contacts' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(r => r.json())
      .then(d => { if (d.success) setStats(d.data); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!stats || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const data = stats.dailyData;
    const padding = { top: 20, right: 20, bottom: 36, left: 36 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const maxVal = Math.max(...data.map(d => d.count), 1);

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
    }

    if (data.length > 0) {
      const stepX = chartW / Math.max(data.length - 1, 1);

      // Gradient fill
      const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
      gradient.addColorStop(0, 'rgba(59,130,246,0.4)');
      gradient.addColorStop(1, 'rgba(59,130,246,0.02)');

      ctx.beginPath();
      data.forEach((d, i) => {
        const x = padding.left + i * stepX;
        const y = padding.top + chartH - (d.count / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      // close path for fill
      ctx.lineTo(padding.left + (data.length - 1) * stepX, padding.top + chartH);
      ctx.lineTo(padding.left, padding.top + chartH);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Line
      ctx.beginPath();
      data.forEach((d, i) => {
        const x = padding.left + i * stepX;
        const y = padding.top + chartH - (d.count / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Dots
      data.forEach((d, i) => {
        const x = padding.left + i * stepX;
        const y = padding.top + chartH - (d.count / maxVal) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#3B82F6';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      });

      // X labels
      ctx.fillStyle = '#64748B';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      data.forEach((d, i) => {
        const x = padding.left + i * stepX;
        const label = d._id.slice(5); // MM-DD
        ctx.fillText(label, x, h - 8);
      });
    }
  }, [stats]);

  const statusColors: Record<string, string> = {
    pending: '#F59E0B',
    confirmed: '#3B82F6',
    completed: '#10B981',
    cancelled: '#EF4444',
  };

  return (
    <DashboardLayout>
      {loading ? (
        <div className="loading-wrap"><div className="spinner" /><p>Loading stats...</p></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {statCards.map(card => (
              <Link key={card.key} href={card.href} style={{ textDecoration: 'none' }}>
                <div className="stat-card" style={{ cursor: 'pointer' }}>
                  <div className="stat-icon" style={{ background: card.bg }}>
                    <span style={{ fontSize: 22 }}>{card.icon}</span>
                  </div>
                  <div className="stat-info">
                    <div className="stat-value" style={{ color: card.color }}>
                      {stats ? (stats as any)[card.key] : 0}
                    </div>
                    <div className="stat-label">{card.label}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Extra stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            {[
              { label: 'Reviews', value: stats?.totalReviews, icon: '⭐', href: '/dashboard/reviews' },
              { label: 'Services', value: stats?.totalServices, icon: '🦷', href: '/dashboard/services' },
              { label: 'Gallery', value: stats?.totalGallery, icon: '🖼️', href: '/dashboard/gallery' },
            ].map(s => (
              <Link key={s.label} href={s.href} style={{ textDecoration: 'none', flex: 1 }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>{s.value ?? 0}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
            {/* Line Chart */}
            <div className="card">
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>Appointments – Last 7 Days</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Daily booking trend</div>
              </div>
              <canvas ref={canvasRef} style={{ width: '100%', height: 200 }} />
            </div>

            {/* Status Breakdown */}
            <div className="card">
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>By Status</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Appointment breakdown</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(stats?.statusData || []).map(s => {
                  const total = stats?.totalAppointments || 1;
                  const pct = Math.round((s.count / total) * 100);
                  const color = statusColors[s._id] || '#64748B';
                  return (
                    <div key={s._id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 13, color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{s._id}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color }}>{s.count}</span>
                      </div>
                      <div style={{ height: 6, background: 'var(--border)', borderRadius: 3 }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width 0.5s' }} />
                      </div>
                    </div>
                  );
                })}
                {(!stats?.statusData?.length) && (
                  <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No appointment data yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
