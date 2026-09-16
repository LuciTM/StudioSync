import { useCallback, useState } from "react";
import { INITIAL_BOOKINGS, RESOURCES } from "./data/mockData";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/ui/Toast";
import Landing from "./pages/Landing";
import Browse from "./pages/Browse";
import Details from "./pages/Details";
import BookingFlow from "./pages/BookingFlow";
import Confirmation from "./pages/Confirmation";
import MyBookings from "./pages/MyBookings";
import HostDashboard from "./pages/HostDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const [view, setView] = useState("landing");
  const [selectedResource, setSelectedResource] = useState(RESOURCES[4]);
  const [bookingDraft, setBookingDraft] = useState(null);
  const [lastBooking, setLastBooking] = useState(null);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [toast, setToast] = useState(null);

  const notify = useCallback((msg) => setToast(msg), []);

  const navigate = useCallback((next, payload) => {
    if (next === "details" && payload) setSelectedResource(payload);
    if (next === "booking" && payload) setBookingDraft(payload);
    if (next === "confirmation" && payload) setLastBooking(payload);
    setView(next);
    window.scrollTo?.({ top: 0, behavior: "instant" });
  }, []);

  const handleConfirm = useCallback((booking) => {
    setBookings((cur) => [booking, ...cur]);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F1E7] text-[#171310] font-sans">
      <Navbar view={view} navigate={navigate} />

      <main>
        {view === "landing" && <Landing navigate={navigate} notify={notify} />}
        {view === "browse" && <Browse navigate={navigate} />}
        {view === "details" && <Details resource={selectedResource} navigate={navigate} />}
        {view === "booking" && (
          <BookingFlow draft={bookingDraft} navigate={navigate} onConfirm={handleConfirm} />
        )}
        {view === "confirmation" && <Confirmation booking={lastBooking} navigate={navigate} />}
        {view === "mybookings" && <MyBookings bookings={bookings} navigate={navigate} />}
        {view === "host" && <HostDashboard navigate={navigate} notify={notify} />}
        {view === "login" && <Login navigate={navigate} notify={notify} />}
        {view === "signup" && <Signup navigate={navigate} notify={notify} />}
      </main>

      <Footer navigate={navigate} />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}