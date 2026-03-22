'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface ContactMessage {
  _id: string;
  full_name: string;
  phone: string;
  message: string;
  status: 'new' | 'read' | 'resolved';
  created_at: string;
}

export default function ContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);

  function showToast(msg: string, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const d = await res.json();
      if (d.success) {
        let data = d.data;
        if (statusFilter) {
          data = data.filter((m: any) => m.status === statusFilter);
        }
        setMessages(data);
      }
    } catch (err) {
      showToast('Failed to load messages', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [statusFilter]);

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const d = await res.json();
      if (d.success) {
        showToast(`Message marked as ${status}`);
        load();
      } else {
        showToast('Failed to update status', 'error');
      }
    } catch (err) {
      showToast('Network error', 'error');
    }
  }

  return (
    <DashboardLayout>
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>
            {toast.type === 'success' ? '✅' : '❌'} {toast.msg}
          </div>
        </div>
      )}

      <div className="section-header">
        <div>
          <div className="section-title">Contact Messages</div>
          <div className="section-subtitle">{messages.length} message(s) in inbox</div>
        </div>
      </div>

      <div className="filters-bar">
        <select className="form-input" style={{ width: 160 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="resolved">Resolved</option>
        </select>
        {statusFilter && (
          <button className="btn btn-ghost" onClick={() => setStatusFilter('')}>✕ Clear Filter</button>
        )}
      </div>

      {loading ? (
        <div className="loading-wrap"><div className="spinner" /><p>Loading messages...</p></div>
      ) : messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📩</div>
          <p>No messages found in inbox.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(m => (
                <tr key={m._id}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{m.full_name}</td>
                  <td>{m.phone}</td>
                  <td style={{ maxWidth: 300, fontSize: 14 }}>
                    <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                      {m.message}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${m.status}`}>{m.status}</span>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {new Date(m.created_at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {m.status === 'new' && (
                        <button className="btn btn-sm btn-ghost" onClick={() => updateStatus(m._id, 'read')}>
                          👁️ Mark Read
                        </button>
                      )}
                      {m.status !== 'resolved' && (
                        <button className="btn btn-sm btn-success" onClick={() => updateStatus(m._id, 'resolved')}>
                          ✔️ Resolve
                        </button>
                      )}
                      {m.status === 'resolved' && (
                        <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>Done</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
