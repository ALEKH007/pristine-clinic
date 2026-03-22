'use client';
import { useEffect, useState } from "react";

interface GalleryImage {
  _id: string;
  image_url: string;
  title: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setImages(data.data);
        } else {
          setError(data.error || 'Failed to load gallery');
        }
      })
      .catch(err => {
        console.error('Gallery fetch error:', err);
        setError('Connection error. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Clinic Gallery</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medicalBlue"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-custom border border-red-100">
            <p className="text-red-600 mb-2 font-semibold">Error Loading Gallery</p>
            <p className="text-red-500 text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        ) : images.length === 0 ? (
          <p className="text-center text-gray-500">Gallery is empty.</p>
        ) : (
          <div className="horizontal-grid">
            {images.map((img) => (
              <img
                key={img._id}
                alt={img.title}
                className="rounded-custom w-72 md:w-80 h-64 object-cover shadow-sm hover:opacity-90 transition cursor-pointer"
                src={img.image_url}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
