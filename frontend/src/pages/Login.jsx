import { useState } from "react";
import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";
import { login } from "../utils/auth";
import { HERO_IMAGE } from "../data/mockData";

export default function Login({ navigate, notify, onAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [attempted, setAttempted] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const emailTouched = email.length > 0;

  const passwordTouched = password.length > 0;
  const passwordValid = password.length >= 8;

  const emailMissing = attempted && !email.trim();
  const passwordMissing = attempted && !password;

  const fieldClass = (hasError, isValid, isMissing) => {
    if (isMissing) return "border-[#B0453B]/60 focus:border-[#B0453B] bg-[#FBEAE9]/40";
    if (hasError) {
      return isValid
        ? "border-[#16803C]/50 focus:border-[#16803C]"
        : "border-[#B0453B]/50 focus:border-[#B0453B]";
    }
    return "border-[#171310]/15 focus:border-[#9C4526]";
  };

  const canSubmit = email.trim() !== "" && password !== "" && emailValid && passwordValid;

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setAttempted(true);
      setError("Fill in the highlighted fields.");
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
    try {
      const user = await login({ email, password });
      notify("Welcome back.");
      onAuthenticated(user);
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 items-stretch">
      {/* LEFT — brand / photo panel */}
      <div className="hidden lg:flex flex-col relative bg-white">
        <img src={HERO_IMAGE} alt="A sunlit shared workspace" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171310]/90 via-[#171310]/20 to-[#171310]/10" />
        <button
          onClick={() => navigate("landing")}
          className="relative z-10 flex items-center gap-2 px-10 pt-8"
        >
          <span className="w-7 h-7 rounded-md bg-[#9C4526] text-white font-display text-[14px] flex items-center justify-center">
            S
          </span>
          <span className="font-display text-[16px] text-white">StudioSync</span>
        </button>
        <div className="relative z-10 flex-1 flex flex-col justify-end px-10 pb-14">
          <p className="text-[11.5px] font-medium tracking-wide text-white/70 uppercase">
            Welcome back
          </p>
          <h2 className="font-display text-[34px] leading-[1.1] text-white mt-2 max-w-[380px]">
            Right where you left off.
          </h2>
          <p className="text-[14.5px] text-white/75 mt-3 max-w-[340px] leading-relaxed">
            Check your bookings, or find a new spot for today.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {["Desks", "Studios", "Meeting rooms"].map((t) => (
              <span
                key={t}
                className="text-[12.5px] font-medium text-white bg-white/15 px-3.5 py-1.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — form panel */}
      <div className="bg-[#FBF8F2] flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-10">
        <div className="w-full max-w-[400px] mx-auto">
          <button
            onClick={() => navigate("landing")}
            className="flex items-center gap-1.5 text-[13px] font-medium text-[#171310]/50 hover:text-[#171310] mb-6 lg:hidden"
          >
            <ArrowLeft size={14} /> Back to StudioSync
          </button>

          <p className="text-[11.5px] font-medium tracking-wide text-[#9C4526] uppercase">Welcome back</p>
          <h1 className="font-display text-[28px] text-[#171310] mt-1">Log in to StudioSync.</h1>
          <p className="text-[13.5px] text-[#171310]/55 mt-1">
            Book a space, or check your reservations.
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <label className="text-[13px] font-medium text-[#171310] block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className={`w-full border rounded-lg px-3 py-2.5 text-[13.5px] focus:outline-none transition-colors mb-1 ${fieldClass(
                emailTouched,
                emailValid,
                emailMissing
              )}`}
            />
            {emailMissing && (
              <p className="text-[12px] text-[#B0453B] flex items-center gap-1.5 mb-4">
                <span>✕</span> Email is required
              </p>
            )}
            {!emailMissing && emailTouched && !emailValid && (
              <p className="text-[12px] text-[#B0453B] flex items-center gap-1.5 mb-4">
                <span>✕</span> Enter a valid email address
              </p>
            )}
            {!emailMissing && (!emailTouched || emailValid) && <div className="mb-4" />}

            <label className="text-[13px] font-medium text-[#171310] block mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full border rounded-lg px-3 py-2.5 pr-10 text-[13.5px] focus:outline-none transition-colors ${fieldClass(
                  passwordTouched,
                  passwordValid,
                  passwordMissing
                )}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#171310]/40 hover:text-[#171310]/70"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {passwordMissing && (
              <p className="text-[12px] text-[#B0453B] flex items-center gap-1.5 mt-2">
                <span>✕</span> Password is required
              </p>
            )}
            {!passwordMissing && passwordTouched && !passwordValid && (
              <p className="text-[12px] text-[#B0453B] flex items-center gap-1.5 mt-2">
                <span>✕</span> At least 8 characters
              </p>
            )}

            {error && <p className="text-[12.5px] text-[#B0453B] mt-3">{error}</p>}

            <Button type="submit" disabled={submitting || !canSubmit} className="w-full mt-5 justify-center">
              {submitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Logging in…
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>

          <p className="text-[13px] text-[#171310]/55 text-center mt-6">
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
    </div>
  );
}