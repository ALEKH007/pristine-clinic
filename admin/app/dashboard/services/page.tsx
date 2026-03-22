'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface Service {
  _id: string;
  name: string;
  description: string;
  category: 'dental' | 'heart';
  price?: number;
  duration_minutes?: number;
  is_active: boolean;
}

const emptyForm = { name: '', description: '', category: 'dental' as 'dental' | 'heart', price: '', duration_minutes: '', is_active: true };

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; mode: 'add' | 'edit'; data: typeof emptyForm & { id?: string } } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const [saving, setSaving] = useState(false);

  function showToast(msg: string, type = 'success') {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    setLoading(true);
    const res = await fetch('/api/services');
    const d = await res.json();
    if (d.success) setServices(d.data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!modal) return;
    setSaving(true);
    const { id, price, duration_minutes, ...rest } = modal.data;
    const body: any = { ...rest };
    if (price) body.price = Number(price);
    if (duration_minutes) body.duration_minutes = Number(duration_minutes);
    const url = modal.mode === 'edit' ? `/api/services/${id}` : '/api/services';
    const method = modal.mode === 'edit' ? 'PATCH' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const d = await res.json();
    if (d.success) { showToast(modal.mode === 'edit' ? 'Service updated' : 'Service created'); setModal(null); load(); }
    else showToast(d.error || 'Failed', 'error');
    setSaving(false);
  }

  async function handleDelete(id: string) {
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    showToast('Service deleted'); setDeleteConfirm(null); load();
  }

  return (
    <DashboardLayout>
      {toast && <div className="toast-container"><div className={`toast toast-${toast.type}`}>{toast.type === 'success' ? '✅' : '❌'} {toast.msg}</div></div>}

      <div className="section-header">
        <div>
          <div className="section-title">Services</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{services.length} service(s)</div>
        </div>
        <button className="btn btn-primary" onClick={() => setModal({ open: true, mode: 'add', data: { ...emptyForm } })}>+ Add Service</button>
      </div>

      {loading ? (
        <div className="loading-wrap"><div className="spinner" /><p>Loading services...</p></div>
      ) : services.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">🦷</div><p>No services found. Add your first service!</p></div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s._id}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{s.name}</td>
                  <td><span className={`badge badge-${s.category}`}>{s.category}</span></td>
                  <td>{s.price ? `₹${s.price.toLocaleString()}` : '—'}</td>
                  <td>{s.duration_minutes ? `${s.duration_minutes} min` : '—'}</td>
                  <td>
                    <span className={`badge ${s.is_active ? 'badge-completed' : 'badge-cancelled'}`}>
                      {s.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-muted)', fontSize: 13 }}>
                    {s.description || '—'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setModal({ open: true, mode: 'edit', data: { id: s._id, name: s.name, description: s.description || '', category: s.category, price: s.price?.toString() || '', duration_minutes: s.duration_minutes?.toString() || '', is_active: s.is_active } })}>
                        ✏️ Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => setDeleteConfirm(s._id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal.mode === 'add' ? '+ Add Service' : '✏️ Edit Service'}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Service Name *</label>
                <input className="form-input" placeholder="e.g. Teeth Whitening" value={modal.data.name} onChange={e => setModal({ ...modal, data: { ...modal.data, name: e.target.value } })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select className="form-input" value={modal.data.category} onChange={e => setModal({ ...modal, data: { ...modal.data, category: e.target.value as 'dental' | 'heart' } })}>
                    <option value="dental">Dental</option>
                    <option value="heart">Heart</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input" value={modal.data.is_active ? 'active' : 'inactive'} onChange={e => setModal({ ...modal, data: { ...modal.data, is_active: e.target.value === 'active' } })}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input className="form-input" type="number" placeholder="e.g. 1500" value={modal.data.price} onChange={e => setModal({ ...modal, data: { ...modal.data, price: e.target.value } })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Duration (min)</label>
                  <input className="form-input" type="number" placeholder="e.g. 45" value={modal.data.duration_minutes} onChange={e => setModal({ ...modal, data: { ...modal.data, duration_minutes: e.target.value } })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" rows={3} placeholder="Describe this service..." value={modal.data.description} onChange={e => setModal({ ...modal, data: { ...modal.data, description: e.target.value } })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving || !modal.data.name}>
                {saving ? 'Saving...' : (modal.mode === 'add' ? 'Create Service' : 'Save Changes')}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>🗑️ Delete Service</h3></div>
            <div className="modal-body"><p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Are you sure you want to delete this service?</p></div>
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
