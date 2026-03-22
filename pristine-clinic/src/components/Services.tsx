'use client';
import { useEffect, useState } from "react";
import Link from "next/link";

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setServices(data.data);
        } else {
          setError(data.error || 'Failed to load services');
        }
      })
      .catch(err => {
        console.error('Services fetch error:', err);
        setError('Connection error. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  const getIcon = (category: string) => {
    if (category === 'heart') {
      return (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      );
    }
    // Default Dental icon
    return (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
      </svg>
    );
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Providing a wide range of specialized treatments to ensure your overall health and well-being.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medicalBlue"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-custom border border-red-100 max-w-lg mx-auto mb-10">
            <p className="text-red-600 mb-2 font-semibold">Error Loading Services</p>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : (
          <div className="horizontal-grid">
            {services.map((service) => (
              <div key={service._id} className="p-8 bg-softGray rounded-custom border border-gray-100 hover-lift shadow-sm w-80 md:w-96">
                <div className="w-14 h-14 bg-white text-medicalBlue rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  {getIcon(service.category)}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}

            <div className="p-8 bg-medicalBlue rounded-custom flex flex-col items-center justify-center text-center text-white shadow-lg hover-lift w-80 md:w-96">
              <h3 className="text-2xl font-bold mb-4">Need Something Else?</h3>
              <p className="mb-6 text-blue-100">Explore our full range of treatments.</p>
              <Link href="#contact" className="px-6 py-2 bg-white text-medicalBlue rounded-full font-bold">
                Inquire Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
