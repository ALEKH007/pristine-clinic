'use client';
import { useEffect, useState } from "react";

interface Review {
  _id: string;
  user_name: string;
  rating: number;
  comment: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setReviews(data.data);
        } else {
          setError(data.error || 'Failed to load reviews');
        }
      })
      .catch(err => {
        console.error('Reviews fetch error:', err);
        setError('Connection error. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getBgColor = (index: number) => {
    const colors = ['bg-blue-100 text-medicalBlue', 'bg-green-100 text-medicalGreen', 'bg-purple-100 text-purple-500'];
    return colors[index % colors.length];
  };

  return (
    <section id="reviews" className="py-24 bg-softGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">What Our Patients Say</h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medicalBlue"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-custom border border-red-100 max-w-lg mx-auto">
            <p className="text-red-600 mb-2 font-semibold">Error Loading Reviews</p>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet.</p>
        ) : (
          <div className="horizontal-grid">
            {reviews.map((review, index) => (
              <div key={review._id} className="bg-white p-8 rounded-custom shadow-sm border border-gray-100 relative w-80 md:w-96">
                <div className="text-yellow-400 mb-4">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{review.comment}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getBgColor(index)}`}>
                    {getInitials(review.user_name)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{review.user_name}</p>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Verified Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
