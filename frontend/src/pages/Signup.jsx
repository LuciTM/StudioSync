import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";
import { register } from "../utils/auth";
import { HERO_IMAGE } from "../data/mockData";

export default function Signup({ navigate, notify }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("renter"); // "renter" | "host"
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [attempted, setAttempted] = useState(false);

  const passwordRules = {
    length: password.length >= 8,
    special: /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/~`;']/.test(password),
  };
  const passwordValid = passwordRules.length && passwordRules.special;
  const passwordTouched = password.length > 0;

  const confirmTouched = confirmPassword.length > 0;
  const confirmMatches = confirmPassword === password;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const emailTouched = email.length > 0;

  const firstNameMissing = attempted && !firstName.trim();
  const lastNameMissing = attempted && !lastName.trim();
  const emailMissing = attempted && !email.trim();
  const passwordMissing = attempted && !password;
  const confirmMissing = attempted && !confirmPassword;

  const fieldClass = (hasError, isValid, isMissing) => {
    if (isMissing) return "border-[#B0453B]/60 focus:border-[#B0453B] bg-[#FBEAE9]/40";
    if (hasError) {
      return isValid
        ? "border-[#16803C]/50 focus:border-[#16803C]"
        : "border-[#B0453B]/50 focus:border-[#B0453B]";
    }
    return "border-[#171310]/15 focus:border-[#9C4526]";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const normalized = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
    };

    if (!normalized.firstName || !normalized.lastName || !normalized.email || !normalized.password) {
      setAttempted(true);
      setError("Fill in the highlighted fields.");
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
    if (!confirmMatches) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    try {
      await register(normalized);
      notify("Account created. Welcome!");
      navigate(role === "host" ? "host" : "landing");
    } catch (err) {
      if (err.errors?.email) {
        setError(err.errors.email[0]);
      } else {
        setError(err.message || "Couldn't create your account. Please try again.");
      }
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
              Find your spot
            </p>
            <h2 className="font-display text-[34px] leading-[1.1] text-white mt-2 max-w-[380px]">
              A room that's ready when you are.
            </h2>
            <p className="text-[14.5px] text-white/75 mt-3 max-w-[340px] leading-relaxed">
              Book a desk for an hour, or list your own space to the city.
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

          <p className="text-[11.5px] font-medium tracking-wide text-[#9C4526] uppercase">New here</p>
          <h1 className="font-display text-[28px] text-[#171310] mt-1">Create your account.</h1>
          <p className="text-[13.5px] text-[#171310]/55 mt-1">Takes a minute. We'll hold your spot.</p>

          <form onSubmit={handleSubmit} className="mt-6">
            {/* Role toggle */}
            <div className="relative flex mb-5 border border-[#171310]/15 rounded-full p-1">
              <motion.div
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[#9C4526]"
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

            <div className="flex gap-3 mb-1">
              <div className="flex-1">
                <label className="text-[13px] font-medium text-[#171310] block mb-1.5">First name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Juan"
                  className={`w-full border rounded-lg px-3 py-2.5 text-[13.5px] focus:outline-none transition-colors ${fieldClass(
                    false,
                    false,
                    firstNameMissing
                  )}`}
                />
              </div>
              <div className="flex-1">
                <label className="text-[13px] font-medium text-[#171310] block mb-1.5">Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Dela Cruz"
                  className={`w-full border rounded-lg px-3 py-2.5 text-[13.5px] focus:outline-none transition-colors ${fieldClass(
                    false,
                    false,
                    lastNameMissing
                  )}`}
                />
              </div>
            </div>
            {(firstNameMissing || lastNameMissing) && (
              <p className="text-[12px] text-[#B0453B] flex items-center gap-1.5 mb-3">
                <span>✕</span> Required
              </p>
            )}
            {!firstNameMissing && !lastNameMissing && <div className="mb-4" />}

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
                placeholder="At least 8 characters"
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

            <div className="flex gap-2 mt-2 mb-3">
              <p
                className={`text-[11.5px] flex-1 text-center py-1.5 rounded-lg transition-colors ${
                  !passwordTouched
                    ? "bg-[#171310]/[0.05] text-[#171310]/50"
                    : passwordRules.length
                    ? "bg-[#E7F4EC] text-[#16803C]"
                    : "bg-[#FBEAE9] text-[#B0453B]"
                }`}
              >
                At least 8 characters
              </p>
              <p
                className={`text-[11.5px] flex-1 text-center py-1.5 rounded-lg transition-colors ${
                  !passwordTouched
                    ? "bg-[#171310]/[0.05] text-[#171310]/50"
                    : passwordRules.special
                    ? "bg-[#E7F4EC] text-[#16803C]"
                    : "bg-[#FBEAE9] text-[#B0453B]"
                }`}
              >
                1 special character (e.g. ! @ # $ %)
              </p>
            </div>

            <label className="text-[13px] font-medium text-[#171310] block mb-1.5">Confirm password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type your password"
                className={`w-full border rounded-lg px-3 py-2.5 pr-10 text-[13.5px] focus:outline-none transition-colors ${fieldClass(
                  confirmTouched,
                  confirmMatches,
                  confirmMissing
                )}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#171310]/40 hover:text-[#171310]/70"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {confirmMissing && (
              <p className="text-[12px] text-[#B0453B] flex items-center gap-1.5 mt-2">
                <span>✕</span> Please confirm your password
              </p>
            )}
            {!confirmMissing && confirmTouched && !confirmMatches && (
              <p className="text-[12px] text-[#B0453B] flex items-center gap-1.5 mt-2">
                <span>✕</span> Passwords don't match
              </p>
            )}

            {error && <p className="text-[12.5px] text-[#B0453B] mt-3">{error}</p>}

            <Button
              type="submit"
              disabled={
                submitting ||
                (emailTouched && !emailValid) ||
                (passwordTouched && !passwordValid) ||
                (confirmTouched && !confirmMatches)
              }
              className="w-full mt-5 justify-center"
            >
              {submitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Creating account…
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <p className="text-[13px] text-[#171310]/55 text-center mt-6">
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
    </div>
  );
}