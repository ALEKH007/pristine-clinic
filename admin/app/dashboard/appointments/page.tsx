'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface Appointment {
  _id: string;
  user_id: { full_name: string; phone: string } | null;
  service_id: { name: string; category: string } | null;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [search, setSearch] = useState('');
  const [notesModal, setNotesModal] = useState<{ id: string; notes: string } | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);

  function showToast(msg: string, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter) params.append('status', statusFilter);
    if (dateFilter) params.append('date', dateFilter);
    if (search) params.append('search', search);
    const res = await fetch('/api/appointments?' + params.toString());
    const data = await res.json();
    if (data.success) setAppointments(data.data);
    setLoading(false);
  }

  useEffect(() => { load(); }, [statusFilter, dateFilter, search]);

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (data.success) { showToast(`Status updated to ${status}`); load(); }
    else showToast('Failed to update', 'error');
  }

  async function saveNotes() {
    if (!notesModal) return;
    const res = await fetch(`/api/appointments/${notesModal.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: notesModal.notes })
    });
    const data = await res.json();
    if (data.success) { showToast('Notes saved'); setNotesModal(null); load(); }
    else showToast('Failed to save notes', 'error');
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  const statusActions: Record<string, { next: string[]; labels: string[] }> = {
    pending: { next: ['confirmed', 'cancelled'], labels: ['✅ Confirm', '❌ Cancel'] },
    confirmed: { next: ['completed', 'cancelled'], labels: ['✔️ Complete', '❌ Cancel'] },
    completed: { next: [], labels: [] },
    cancelled: { next: [], labels: [] },
  };

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
          <div className="section-title">Appointments</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{appointments.length} appointment(s) found</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-input-wrap" style={{ minWidth: 240 }}>
          <span className="search-icon">🔍</span>
          <input
            className="form-input"
            placeholder="Search patient name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="form-input" style={{ width: 160 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input type="date" className="form-input" style={{ width: 160 }} value={dateFilter} onChange={e => setDateFilter(e.target.value)} />
        {(statusFilter || dateFilter || search) && (
          <button className="btn btn-ghost" onClick={() => { setStatusFilter(''); setDateFilter(''); setSearch(''); }}>
            ✕ Clear
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading-wrap"><div className="spinner" /><p>Loading appointments...</p></div>
      ) : appointments.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">📅</div><p>No appointments found</p></div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(a => {
                return (
                  <tr key={a._id}>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                      {a.user_id?.full_name || 'Unknown'}
                    </td>
                    <td>{a.user_id?.phone || '—'}</td>
                    <td>
                      <span>{a.service_id?.name || '—'}</span>
                      {a.service_id?.category && (
                        <span className={`badge badge-${a.service_id.category}`} style={{ marginLeft: 6 }}>
                          {a.service_id.category}
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{formatDate(a.appointment_date)}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.appointment_time}</div>
                    </td>
                    <td>
                      <select 
                        className={`badge badge-${a.status}`} 
                        style={{ border: 'none', cursor: 'pointer', outline: 'none', appearance: 'auto', paddingRight: '8px' }}
                        value={a.status}
                        onChange={(e) => updateStatus(a._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm" onClick={() => setNotesModal({ id: a._id, notes: a.notes || '' })}>
                        📝 {a.notes ? 'Edit' : 'Add'}
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={async () => {
                        if(confirm('Delete this appointment?')) {
                          await fetch(`/api/appointments/${a._id}`, { method: 'DELETE' });
                          load();
                        }
                      }}>🗑️</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Notes Modal */}
      {notesModal && (
        <div className="modal-overlay" onClick={() => setNotesModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📝 Appointment Notes</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setNotesModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-input"
                rows={5}
                placeholder="Add notes about this appointment..."
                value={notesModal.notes}
                onChange={e => setNotesModal({ ...notesModal, notes: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setNotesModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveNotes}>Save Notes</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
