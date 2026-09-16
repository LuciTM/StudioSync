import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Button from "../components/ui/Button";

export default function Signup({ navigate, notify }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("renter"); // "renter" | "host"
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const passwordRules = {
    length: password.length >= 8,
    special: /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/~`;']/.test(password),
  };
  const passwordValid = passwordRules.length && passwordRules.special;
  const passwordTouched = password.length > 0;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const emailTouched = email.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Normalize before validating/sending
    const normalized = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
    };

    if (!normalized.firstName || !normalized.lastName || !normalized.email || !normalized.password) {
      setError("Fill in your first name, last name, email, and password.");
      return;
    }
    if (!emailValid) {
      setError("Enter a valid email address.");
      return;
    }
    if (!passwordValid) {
      setError("Password needs at least 8 characters and 1 special character.");
      return;
    }

    setSubmitting(true);

    // TODO: replace with the real request once the backend contract is confirmed —
    // e.g. POST /api/register with normalized { firstName, lastName, email, password, role }, then either:
    //   - store the returned token (Sanctum token-based auth), or
    //   - rely on the Set-Cookie response (session-based auth) and just re-fetch /api/user
    setTimeout(() => {
      setSubmitting(false);
      notify("Account created. Welcome!");
      navigate(role === "host" ? "host" : "landing");
    }, 700);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5">
      <div className="w-full max-w-[380px]">
        <h1 className="font-display text-[30px] text-[#171310] text-center">Create your account.</h1>
        <p className="text-[13.5px] text-[#171310]/55 text-center mt-2">
          Book a space, or list your own — takes a minute.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 bg-white/60 border border-[#171310]/10 rounded-2xl p-6">
          {/* Role toggle */}
          <div className="relative flex mb-5 border border-[#171310]/15 rounded-full p-1">
            <motion.div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[#171310]"
              initial={false}
              animate={{ x: role === "renter" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              style={{ left: "4px" }}
            />
            <button
              type="button"
              onClick={() => setRole("renter")}
              className={`relative z-10 flex-1 text-[12.5px] font-medium py-1.5 rounded-full transition-colors duration-200 ${
                role === "renter" ? "text-white" : "text-[#171310]/60"
              }`}
            >
              I'm booking a space
            </button>
            <button
              type="button"
              onClick={() => setRole("host")}
              className={`relative z-10 flex-1 text-[12.5px] font-medium py-1.5 rounded-full transition-colors duration-200 ${
                role === "host" ? "text-white" : "text-[#171310]/60"
              }`}
            >
              I'm listing a space
            </button>
          </div>

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="text-[13px] font-medium text-[#171310] block mb-1.5">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Juan"
                className="w-full border border-[#171310]/20 rounded-md px-3 py-2 text-[13.5px] focus:outline-none focus:border-[#9C4526]"
              />
            </div>
            <div className="flex-1">
              <label className="text-[13px] font-medium text-[#171310] block mb-1.5">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Dela Cruz"
                className="w-full border border-[#171310]/20 rounded-md px-3 py-2 text-[13.5px] focus:outline-none focus:border-[#9C4526]"
              />
            </div>
          </div>

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
            placeholder="At least 8 characters"
            className={`w-full border rounded-md px-3 py-2 text-[13.5px] focus:outline-none transition-colors ${
              passwordTouched
                ? passwordValid
                  ? "border-[#16803C]/50 focus:border-[#16803C]"
                  : "border-[#B0453B]/50 focus:border-[#B0453B]"
                : "border-[#171310]/20 focus:border-[#9C4526]"
            }`}
          />

          <div className="mt-2 space-y-1">
            <p
              className={`text-[12px] flex items-center gap-1.5 transition-colors ${
                !passwordTouched
                  ? "text-[#171310]/45"
                  : passwordRules.length
                  ? "text-[#16803C]"
                  : "text-[#B0453B]"
              }`}
            >
              <span>{passwordTouched ? (passwordRules.length ? "✓" : "✕") : "•"}</span>
              At least 8 characters
            </p>
            <p
              className={`text-[12px] flex items-center gap-1.5 transition-colors ${
                !passwordTouched
                  ? "text-[#171310]/45"
                  : passwordRules.special
                  ? "text-[#16803C]"
                  : "text-[#B0453B]"
              }`}
            >
              <span>{passwordTouched ? (passwordRules.special ? "✓" : "✕") : "•"}</span>
              At least 1 special character (e.g. ! @ # $ %)
            </p>
          </div>

          {error && <p className="text-[12.5px] text-[#B0453B] mt-3">{error}</p>}

          <Button
            type="submit"
            disabled={
              submitting ||
              (emailTouched && !emailValid) ||
              (passwordTouched && !passwordValid)
            }
            className="w-full mt-5">
            {submitting ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Creating account…
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <p className="text-[13px] text-[#171310]/55 text-center mt-5">
          Already have an account?{" "}
          <button
            onClick={() => navigate("login")}
            className="text-[#9C4526] font-medium hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}