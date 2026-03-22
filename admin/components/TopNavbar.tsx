'use client';
import { usePathname } from 'next/navigation';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of clinic operations' },
  '/dashboard/appointments': { title: 'Appointments', subtitle: 'Manage patient appointments' },
  '/dashboard/reviews': { title: 'Reviews', subtitle: 'Manage patient testimonials' },
  '/dashboard/services': { title: 'Services', subtitle: 'Manage clinic services' },
  '/dashboard/gallery': { title: 'Gallery', subtitle: 'Manage clinic photo gallery' },
  '/dashboard/users': { title: 'Users', subtitle: 'Manage registered users' },
  '/dashboard/contacts': { title: 'Contact Messages', subtitle: 'View and manage patient inquiries' },
};

export default function TopNavbar() {
  const pathname = usePathname();
  const page = pageTitles[pathname] || { title: 'Dashboard', subtitle: '' };

  return (
    <header style={{
      height: 64,
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{page.title}</h1>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{page.subtitle}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Date/Time */}
        <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'right' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
        </div>

        {/* Avatar */}
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), #8B5CF6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          fontWeight: 600,
          color: '#fff',
          cursor: 'pointer',
          flexShrink: 0,
        }}>
          A
        </div>
      </div>
    </header>
  );
}
