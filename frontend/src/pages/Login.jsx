import { useState } from "react";
import { Loader2 } from "lucide-react";
import Button from "../components/ui/Button";

export default function Login({ navigate, notify }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const emailTouched = email.length > 0;

  const passwordTouched = password.length > 0;
  const passwordValid = password.length >= 8;

  const canSubmit =
    email.trim() !== "" &&
    password !== "" &&
    emailValid &&
    passwordValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }
    if (!emailValid) {
      setError("Enter a valid email address.");
      return;
    }
    if (!passwordValid) {
      setError("Password should be at least 8 characters.");
      return;
    }

    setSubmitting(true);

    // TODO: replace with the real request once the backend contract is confirmed —
    // e.g. POST /api/login with { email: email.trim().toLowerCase(), password }, then either:
    //   - store the returned token (Sanctum token-based auth), or
    //   - rely on the Set-Cookie response (session-based auth) and just re-fetch /api/user
    setTimeout(() => {
      setSubmitting(false);
      notify("Welcome back.");
      navigate("landing");
    }, 700);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5">
      <div className="w-full max-w-[380px]">
        <h1 className="font-display text-[30px] text-[#171310] text-center">Welcome back.</h1>
        <p className="text-[13.5px] text-[#171310]/55 text-center mt-2">
          Log in to book a space or check your reservations.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 bg-white/60 border border-[#171310]/10 rounded-2xl p-6">
          <label className="text-[13px] font-medium text-[#171310] block mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className={`w-full border rounded-md px-3 py-2 text-[13.5px] focus:outline-none transition-colors mb-1 ${
              emailTouched
                ? emailValid
                  ? "border-[#16803C]/50 focus:border-[#16803C]"
                  : "border-[#B0453B]/50 focus:border-[#B0453B]"
                : "border-[#171310]/20 focus:border-[#9C4526]"
            }`}
          />
          {emailTouched && !emailValid && (
            <p className="text-[12px] text-[#B0453B] flex items-center gap-1.5 mb-4">
              <span>✕</span> Enter a valid email address
            </p>
          )}
          {(!emailTouched || emailValid) && <div className="mb-4" />}

          <label className="text-[13px] font-medium text-[#171310] block mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full border rounded-md px-3 py-2 text-[13.5px] focus:outline-none transition-colors mb-1 ${
              passwordTouched
                ? passwordValid
                  ? "border-[#16803C]/50 focus:border-[#16803C]"
                  : "border-[#B0453B]/50 focus:border-[#B0453B]"
                : "border-[#171310]/20 focus:border-[#9C4526]"
            }`}
          />
          {passwordTouched && !passwordValid && (
            <p className="text-[12px] text-[#B0453B] flex items-center gap-1.5">
              <span>✕</span> At least 8 characters
            </p>
          )}

          {error && <p className="text-[12.5px] text-[#B0453B] mt-3">{error}</p>}

          <Button type="submit" disabled={submitting || !canSubmit} className="w-full mt-5">
            {submitting ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Logging in…
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>

        <p className="text-[13px] text-[#171310]/55 text-center mt-5">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("signup")}
            className="text-[#9C4526] font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}