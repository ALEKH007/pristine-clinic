'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Appointment {
  _id: string;
  user_id: { full_name: string; phone: string };
  service_id: { name: string; category: string };
  appointment_date: string;
  appointment_time: string;
  status: string;
  created_at: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data);
      } else {
        setError(data.error || 'Failed to fetch appointments');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-softGray flex flex-col">
      <Navbar />

      <main className="grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-custom shadow-xl overflow-hidden border border-gray-100">
            <div className="px-8 py-10 bg-medicalBlue bg-opacity-5 border-b border-gray-100">
              <h1 className="text-3xl font-bold text-gray-900">Booked Appointments</h1>
              <p className="text-gray-500 mt-2">Manage and view all incoming clinic requests.</p>
            </div>

            <div className="p-8">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medicalBlue"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-6 rounded-lg text-center font-medium">
                  ⚠️ {error}
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-6">📅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Appointments Yet</h3>
                  <p className="text-gray-500 mb-8">Appointments booked via the website will appear here.</p>
                  <a href="/#appointment" className="inline-block px-8 py-3 bg-medicalBlue text-white rounded-full font-bold hover:bg-blue-600 transition shadow-md">
                    Book One Now
                  </a>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-100 uppercase text-xs font-bold text-gray-400 tracking-wider">
                        <th className="px-4 py-4">Patient</th>
                        <th className="px-4 py-4">Service</th>
                        <th className="px-4 py-4">Status</th>
                        <th className="px-4 py-4">Requested Date</th>
                        <th className="px-4 py-4">Booked On</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {appointments.map((apt) => (
                        <tr key={apt._id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-4 py-6">
                            <p className="font-bold text-gray-900">{apt.user_id?.full_name || 'N/A'}</p>
                            <p className="text-sm text-gray-500">{apt.user_id?.phone || 'N/A'}</p>
                          </td>
                          <td className="px-4 py-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-medicalBlue">
                              {apt.service_id?.name || 'General Service'}
                            </span>
                          </td>
                          <td className="px-4 py-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${apt.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {apt.status || 'Pending'}
                            </span>
                          </td>
                          <td className="px-4 py-6">
                            <p className="text-sm font-bold text-gray-900">
                              {new Date(apt.appointment_date).toLocaleDateString('en-IN', {
                                day: 'numeric', month: 'short', year: 'numeric'
                              })}
                            </p>
                            <p className="text-xs text-gray-500 tracking-tight">{apt.appointment_time}</p>
                          </td>
                          <td className="px-4 py-6 text-sm text-gray-400">
                            {new Date(apt.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
