import React, { useEffect, useState } from 'react';
import { getResources, createBooking } from './api/client';
import { Users, DollarSign, CheckCircle, AlertCircle, Clock, CalendarDays } from 'lucide-react';

export default function App() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    start_time: '',
    end_time: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const fetchStudios = async () => {
    try {
      setLoading(true);
      const data = await getResources();
      setResources(data);
    } catch (err) {
      console.error('Failed to load studio spaces:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudios();
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      await createBooking({
        ...bookingForm,
        resource_id: selectedStudio.id,
      });

      setStatusMessage({ type: 'success', text: 'Booking confirmed successfully!' });
      setBookingForm({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        start_time: '',
        end_time: '',
        notes: '',
      });
      fetchStudios();
      setTimeout(() => setSelectedStudio(null), 1600);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(' ')
          : 'Failed to complete booking. Check time slot conflicts.');
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              S
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">StudioSync</span>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
            Backend: Port 8000
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Book Creative Spaces
          </h1>
          <p className="mt-3 text-slate-400 text-base max-w-2xl">
            Real-time availability, conflict-free scheduling, and automated billing for audio, podcast, and video production suites.
          </p>
        </div>

        {/* Studio Cards Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-500 text-sm">
            Loading studio resources...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((studio) => (
              <div
                key={studio.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-xl"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
                      {studio.category}
                    </span>
                    <div className="flex items-center text-emerald-400 font-bold text-lg">
                      <DollarSign className="w-4 h-4" />
                      {Number(studio.price_per_hour).toFixed(2)}
                      <span className="text-xs text-slate-400 font-normal ml-0.5">/hr</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mt-4">{studio.title}</h3>

                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      Up to {studio.capacity} people
                    </span>
                  </div>

                  {/* Amenities */}
                  <div className="mt-5">
                    <p className="text-xs font-medium text-slate-500 mb-2">Included Amenities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {studio.amenities?.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-slate-800/80 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Bookings */}
                  <div className="mt-6 pt-4 border-t border-slate-800/70 text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{studio.bookings?.length || 0} scheduled session(s)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedStudio(studio);
                    setStatusMessage(null);
                  }}
                  className="mt-6 w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer"
                >
                  Reserve Studio
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {selectedStudio && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white">Reserve {selectedStudio.title}</h2>
                <p className="text-xs text-slate-400">
                  ${Number(selectedStudio.price_per_hour).toFixed(2)}/hr • Max capacity: {selectedStudio.capacity}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudio(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {statusMessage && (
              <div
                className={`mt-4 p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={bookingForm.customer_name}
                  onChange={(e) => setBookingForm({ ...bookingForm, customer_name: e.target.value })}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={bookingForm.customer_email}
                    onChange={(e) => setBookingForm({ ...bookingForm, customer_email: e.target.value })}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={bookingForm.customer_phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, customer_phone: e.target.value })}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="09171234567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Start Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={bookingForm.start_time}
                    onChange={(e) => setBookingForm({ ...bookingForm, start_time: e.target.value })}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">End Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={bookingForm.end_time}
                    onChange={(e) => setBookingForm({ ...bookingForm, end_time: e.target.value })}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Session Notes (Optional)</label>
                <textarea
                  rows="2"
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g., Live recording with drum kit, video podcast setup"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudio(null)}
                  className="w-1/2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer"
                >
                  {submitting ? 'Checking slot...' : 'Confirm Reservation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}