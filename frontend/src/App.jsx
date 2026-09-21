import { useCallback, useEffect, useState } from "react";
import { INITIAL_BOOKINGS, RESOURCES } from "./data/mockData";
import { getCurrentUser, logout as logoutRequest } from "./utils/auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HostHeader from "./components/HostHeader";
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

  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // On first load, ask the backend if there's already a logged-in session
  // (so refreshing the page doesn't silently log someone out on the frontend).
  useEffect(() => {
    getCurrentUser().then((u) => {
      setUser(u);
      setCheckingSession(false);
    });
  }, []);

  const notify = useCallback((msg) => setToast(msg), []);

  const navigate = useCallback(
    (next, payload) => {
      if (next === "details" && payload) setSelectedResource(payload);
      if (next === "booking" && payload) setBookingDraft(payload);
      if (next === "confirmation" && payload) setLastBooking(payload);

      // Gate the host portal — no bouncing a renter (or a logged-out visitor) into it.
      if (next === "host" && user?.role !== "host") {
        setView(user ? "landing" : "login");
        return;
      }
      // My Bookings requires a session at all.
      if (next === "mybookings" && !user) {
        setView("login");
        return;
      }

      setView(next);
      window.scrollTo?.({ top: 0, behavior: "instant" });
    },
    [user]
  );

  const handleConfirm = useCallback((booking) => {
    setBookings((cur) => [booking, ...cur]);
  }, []);

  // Called by Login/Signup once the backend confirms who they are.
  const handleAuthenticated = useCallback(
    (loggedInUser) => {
      setUser(loggedInUser);
      navigate(loggedInUser.role === "host" ? "host" : "landing");
    },
    [navigate]
  );

  const handleLogout = useCallback(async () => {
    await logoutRequest();
    setUser(null);
    navigate("landing");
    notify("Logged out.");
  }, [navigate, notify]);

  if (checkingSession) {
    // Avoid a flash of "logged out" nav before we know the real state.
    return <div className="min-h-screen bg-[#F7F1E7]" />;
  }

  const isHost = view === "host";

  return (
    <div className="min-h-screen bg-[#F7F1E7] text-[#171310] font-sans">
      {isHost ? (
        <HostHeader navigate={navigate} user={user} onLogout={handleLogout} />
      ) : (
        <Navbar view={view} navigate={navigate} user={user} onLogout={handleLogout} />
      )}

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
        {view === "login" && (
          <Login navigate={navigate} notify={notify} onAuthenticated={handleAuthenticated} />
        )}
        {view === "signup" && (
          <Signup navigate={navigate} notify={notify} onAuthenticated={handleAuthenticated} />
        )}
      </main>

      {!isHost && <Footer navigate={navigate} />}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}