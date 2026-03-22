'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface User {
  _id: string;
  full_name: string;
  phone: string;
  email?: string;
  role: 'patient' | 'admin';
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);

  function showToast(msg: string, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (roleFilter) params.append('role', roleFilter);
    try {
      const res = await fetch('/api/users?' + params.toString());
      const d = await res.json();
      if (d.success) setUsers(d.data);
    } catch (err) {
      showToast('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [search, roleFilter]);

  async function toggleRole(id: string, currentRole: string) {
    const newRole = currentRole === 'admin' ? 'patient' : 'admin';
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      const d = await res.json();
      if (d.success) {
        showToast(`User promoted to ${newRole}`);
        load();
      } else {
        showToast('Failed to update role', 'error');
      }
    } catch (err) {
      showToast('Network error', 'error');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this user? This will also delete their appointments.')) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      const d = await res.json();
      if (d.success) {
        showToast('User deleted');
        load();
      } else {
        showToast('Failed to delete user', 'error');
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
          <div className="section-title">User Management</div>
          <div className="section-subtitle">{users.length} user(s) found</div>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-input-wrap" style={{ minWidth: 280 }}>
          <span className="search-icon">🔍</span>
          <input 
            className="form-input" 
            placeholder="Search by name, email, or phone..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="form-input" style={{ width: 140 }} value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="patient">Patient</option>
        </select>
        {(search || roleFilter) && (
          <button className="btn btn-ghost" onClick={() => { setSearch(''); setRoleFilter(''); }}>✕ Clear Filters</button>
        )}
      </div>

      {loading ? (
        <div className="loading-wrap"><div className="spinner" /><p>Loading users...</p></div>
      ) : users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <p>No users found matching your search.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{u.full_name}</td>
                  <td>{u.phone}</td>
                  <td>{u.email || '—'}</td>
                  <td>
                    <span className={`badge badge-${u.role}`}>{u.role}</span>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    {new Date(u.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button 
                        className={`btn btn-sm ${u.role === 'admin' ? 'btn-ghost' : 'btn-primary'}`} 
                        onClick={() => toggleRole(u._id, u.role)}
                        title={u.role === 'admin' ? 'Demote to Patient' : 'Promote to Admin'}
                      >
                        {u.role === 'admin' ? '👤 Demote' : '⭐️ Promote'}
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u._id)}>
                        🗑️ Delete
                      </button>
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
