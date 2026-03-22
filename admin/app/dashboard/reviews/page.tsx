'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface Review {
  _id: string;
  user_name: string;
  rating: number;
  comment: string;
  source: 'manual' | 'google';
  is_featured: boolean;
  created_at: string;
}

const emptyForm = { user_name: '', rating: 5, comment: '', source: 'manual' as 'manual' | 'google', is_featured: false };

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; mode: 'add' | 'edit'; data: typeof emptyForm & { id?: string } } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const [saving, setSaving] = useState(false);

  function showToast(msg: string, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    setLoading(true);
    const res = await fetch('/api/reviews');
    const d = await res.json();
    if (d.success) setReviews(d.data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!modal) return;
    setSaving(true);
    const { id, ...body } = modal.data;
    const url = modal.mode === 'edit' ? `/api/reviews/${id}` : '/api/reviews';
    const method = modal.mode === 'edit' ? 'PATCH' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const d = await res.json();
    if (d.success) { showToast(modal.mode === 'edit' ? 'Review updated' : 'Review added'); setModal(null); load(); }
    else showToast(d.error || 'Failed', 'error');
    setSaving(false);
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
    const d = await res.json();
    if (d.success) { showToast('Review deleted'); setDeleteConfirm(null); load(); }
    else showToast('Failed to delete', 'error');
  }

  async function toggleFeatured(r: Review) {
    await fetch(`/api/reviews/${r._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_featured: !r.is_featured })
    });
    load();
  }

  function Stars({ n }: { n: number }) {
    return <div className="stars">{[1,2,3,4,5].map(i => <span key={i} className={i <= n ? 'star' : 'star-empty'}>★</span>)}</div>;
  }

  function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    return (
      <div style={{ display: 'flex', gap: 4 }}>
        {[1,2,3,4,5].map(i => (
          <button key={i} type="button" onClick={() => onChange(i)} style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', color: i <= value ? '#F59E0B' : '#334155', transition: 'color 0.15s' }}>★</button>
        ))}
      </div>
    );
  }

  return (
    <DashboardLayout>
      {toast && <div className="toast-container"><div className={`toast toast-${toast.type}`}>{toast.type === 'success' ? '✅' : '❌'} {toast.msg}</div></div>}

      <div className="section-header">
        <div>
          <div className="section-title">Reviews</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{reviews.length} review(s)</div>
        </div>
        <button className="btn btn-primary" onClick={() => setModal({ open: true, mode: 'add', data: { ...emptyForm } })}>
          + Add Review
        </button>
      </div>

      {loading ? (
        <div className="loading-wrap"><div className="spinner" /><p>Loading reviews...</p></div>
      ) : reviews.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">⭐</div><p>No reviews yet. Add the first one!</p></div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Source</th>
                <th>Featured</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(r => (
                <tr key={r._id}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{r.user_name}</td>
                  <td><Stars n={r.rating} /></td>
                  <td style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.comment || '—'}</td>
                  <td><span className={`badge badge-${r.source}`}>{r.source}</span></td>
                  <td>
                    <button
                      onClick={() => toggleFeatured(r)}
                      style={{ background: r.is_featured ? 'var(--success-light)' : 'var(--bg-hover)', color: r.is_featured ? 'var(--success)' : 'var(--text-muted)', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 500 }}
                    >
                      {r.is_featured ? '⭐ Featured' : '☆ Feature'}
                    </button>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {new Date(r.created_at).toLocaleDateString('en-IN')}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setModal({ open: true, mode: 'edit', data: { id: r._id, user_name: r.user_name, rating: r.rating, comment: r.comment || '', source: r.source, is_featured: r.is_featured } })}>
                        ✏️ Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => setDeleteConfirm(r._id)}>🗑️ Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal.mode === 'add' ? '+ Add Review' : '✏️ Edit Review'}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Patient Name *</label>
                <input className="form-input" placeholder="e.g. Rahul Sharma" value={modal.data.user_name} onChange={e => setModal({ ...modal, data: { ...modal.data, user_name: e.target.value } })} />
              </div>
              <div className="form-group">
                <label className="form-label">Rating *</label>
                <StarPicker value={modal.data.rating} onChange={v => setModal({ ...modal, data: { ...modal.data, rating: v } })} />
              </div>
              <div className="form-group">
                <label className="form-label">Comment *</label>
                <textarea className="form-input" rows={4} placeholder="Write review comment..." value={modal.data.comment} onChange={e => setModal({ ...modal, data: { ...modal.data, comment: e.target.value } })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Source</label>
                  <select className="form-input" value={modal.data.source} onChange={e => setModal({ ...modal, data: { ...modal.data, source: e.target.value as 'manual' | 'google' } })}>
                    <option value="manual">Manual</option>
                    <option value="google">Google</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Featured?</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                    <input type="checkbox" id="featured" checked={modal.data.is_featured} onChange={e => setModal({ ...modal, data: { ...modal.data, is_featured: e.target.checked } })} style={{ width: 18, height: 18, accentColor: 'var(--accent)' }} />
                    <label htmlFor="featured" style={{ fontSize: 14, color: 'var(--text-secondary)', cursor: 'pointer' }}>Show on homepage</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving || !modal.data.user_name || !modal.data.comment}>
                {saving ? 'Saving...' : (modal.mode === 'add' ? 'Add Review' : 'Save Changes')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>🗑️ Delete Review</h3></div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Are you sure you want to delete this review? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
