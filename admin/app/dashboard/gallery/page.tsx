'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface GalleryImage {
  _id: string;
  image_url: string;
  title: string;
  description: string;
  uploaded_at: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [newImage, setNewImage] = useState({ image_url: '', title: '', description: '' });
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const [saving, setSaving] = useState(false);

  function showToast(msg: string, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      const d = await res.json();
      if (d.success) setImages(d.data);
    } catch (err) {
      showToast('Failed to load gallery', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd() {
    if (!newImage.image_url) return;
    setSaving(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newImage)
      });
      const d = await res.json();
      if (d.success) {
        showToast('Image added to gallery');
        setModalOpen(false);
        setNewImage({ image_url: '', title: '', description: '' });
        load();
      } else {
        showToast(d.error || 'Failed to add image', 'error');
      }
    } catch (err) {
      showToast('Network error', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      const d = await res.json();
      if (d.success) {
        showToast('Image deleted');
        load();
      } else {
        showToast('Failed to delete', 'error');
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
          <div className="section-title">Gallery Management</div>
          <div className="section-subtitle">{images.length} image(s) in gallery</div>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          + Upload Image
        </button>
      </div>

      {loading ? (
        <div className="loading-wrap"><div className="spinner" /><p>Loading gallery...</p></div>
      ) : images.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🖼️</div>
          <p>No images in gallery. Upload your first one!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {images.map(img => (
            <div key={img._id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '100%', paddingTop: '60%', background: '#000' }}>
                <img 
                  src={img.image_url} 
                  alt={img.title} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x240?text=Invalid+Image+URL')}
                />
              </div>
              <div style={{ padding: 16, flex: 1 }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: 'var(--text-primary)' }}>{img.title || 'Untitled'}</h4>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {img.description || 'No description'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {new Date(img.uploaded_at).toLocaleDateString()}
                  </span>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(img._id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>+ Upload New Image</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Image URL *</label>
                <input 
                  className="form-input" 
                  placeholder="https://example.com/image.jpg" 
                  value={newImage.image_url}
                  onChange={e => setNewImage({ ...newImage, image_url: e.target.value })}
                />
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                  Paste a public image URL (e.g. from Unsplash, Imgur, or clinic website)
                </p>
              </div>
              
              {newImage.image_url && (
                <div style={{ width: '100%', height: 160, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', background: '#000', marginBottom: 16 }}>
                  <img 
                    src={newImage.image_url} 
                    alt="Preview" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x240?text=Invalid+Image+URL')}
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Title</label>
                <input 
                  className="form-input" 
                  placeholder="e.g. Modern Consultation Room" 
                  value={newImage.title}
                  onChange={e => setNewImage({ ...newImage, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-input" 
                  rows={3} 
                  placeholder="Brief description of the photo..." 
                  value={newImage.description}
                  onChange={e => setNewImage({ ...newImage, description: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd} disabled={saving || !newImage.image_url}>
                {saving ? 'Adding...' : 'Add to Gallery'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
