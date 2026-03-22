'use client';

import { useEffect, useState } from 'react';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    dateTime: '',
    service: 'Teeth Cleaning', // Fallback default
  });
  const [services, setServices] = useState<any[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setServices(data.data);
          setFormData(prev => ({ ...prev, service: data.data[0].name }));
        }
      })
      .catch(err => console.error('Failed to fetch services:', err))
      .finally(() => setServicesLoading(false));
  }, []);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          phone: formData.phone,
          appointment_date: formData.dateTime,
          service_name: formData.service,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Your appointment has been requested successfully! We will contact you soon.');
        setFormData({ fullName: '', phone: '', dateTime: '', service: 'Teeth Cleaning' });
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to book appointment. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please check your connection.');
    }
  };

  return (
    <section id="appointment" className="py-24 bg-medicalBlue">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 rounded-custom shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Request an Appointment</h2>
            <p className="text-gray-500">Fill out the form below and we'll confirm your slot shortly.</p>
          </div>

          {status === 'success' && (
            <div className="mb-8 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
              {message}
              {/*<div className="mt-2">
                <a href="/appointments" className="text-medicalBlue font-bold hover:underline">View All Appointments →</a>
              </div>*/}
            </div>
          )}

          {status === 'error' && (
            <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  className="w-full rounded-lg border-gray-200 focus:border-medicalBlue focus:ring-medicalBlue px-4 py-3 border"
                  placeholder="John Doe"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  className="w-full rounded-lg border-gray-200 focus:border-medicalBlue focus:ring-medicalBlue px-4 py-3 border"
                  placeholder="+91 00000 00000"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date &amp; Time</label>
                <input
                  className="w-full rounded-lg border-gray-200 focus:border-medicalBlue focus:ring-medicalBlue px-4 py-3 border"
                  type="datetime-local"
                  value={formData.dateTime}
                  onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Required</label>
                <select
                  className="w-full rounded-lg border-gray-200 focus:border-medicalBlue focus:ring-medicalBlue px-4 py-3 border"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  disabled={servicesLoading}
                >
                  {servicesLoading ? (
                    <option>Loading services...</option>
                  ) : services.length > 0 ? (
                    services.map(s => (
                      <option key={s._id} value={s.name}>{s.name}</option>
                    ))
                  ) : (
                    <>
                      <option>Teeth Cleaning</option>
                      <option>Root Canal Treatment</option>
                      <option>Dental Filling</option>
                      <option>Teeth Whitening</option>
                      <option>Dental Braces</option>
                      <option>Heart Consultation</option>
                      <option>Other</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            <button
              disabled={status === 'loading'}
              className="w-full py-4 bg-medicalBlue text-white font-bold rounded-custom shadow-lg hover:bg-blue-700 transition-colors uppercase tracking-wider disabled:bg-gray-400"
              type="submit"
            >
              {status === 'loading' ? 'Processing...' : 'Book Appointment Now'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
