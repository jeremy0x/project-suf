import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserAdd01Icon,
  LoaderPinwheelIcon,
  CheckmarkCircle01Icon,
  LockKeyIcon,
  EyeIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { setCookie } from "@/lib/crypto";
import Logo from "@/components/Logo";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

function StepItem({
  number,
  text,
  active,
}: {
  number: number;
  text: string;
  active?: boolean;
}) {
  return (
    <motion.div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active
          ? "bg-white text-brand-dark border border-white/20 shadow-lg"
          : "bg-white/5 text-white/60 border border-transparent"
      }`}
      variants={itemVariants}
    >
      <span
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
          active ? "bg-brand-dark text-white" : "bg-white/10 text-white/40"
        }`}
      >
        {active ? (
          <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} />
        ) : (
          number
        )}
      </span>
      <span className={`text-sm font-medium ${active ? "" : "text-white/40"}`}>
        {text}
      </span>
    </motion.div>
  );
}

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const loginMutation = useMutation(api.auth.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    setError("");
    try {
      const result = await loginMutation({ password });
      setCookie("suf_admin_token", result.token, 7);
      onLogin();
    } catch (err) {
      setIsSigningIn(false);
      setError(err instanceof Error ? err.message : "Invalid password");
    }
  };

  const steps = [
    { number: 1, text: "Authenticate identity", active: true },
    { number: 2, text: "Access dashboard", active: false },
    { number: 3, text: "Manage content", active: false },
  ];

  if (isSigningIn) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center gap-4 transition-all duration-500">
        <HugeiconsIcon
          icon={LoaderPinwheelIcon}
          size={48}
          className="text-brand-blue animate-spin"
        />
        <p className="text-white font-medium font-heading tracking-wide animate-pulse">
          Signing in...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark selection:bg-brand-blue/30 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
      <div className="flex min-h-full w-full lg:h-full">
        <motion.div
          className="hidden lg:flex relative flex-col items-center justify-between pb-12 px-12 rounded-3xl overflow-hidden shadow-2xl h-full w-[52%]"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src="https://images.unsplash.com/photo-1590487988256-9ed24133863e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3ltfGVufDB8fDB8fHww"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/40 to-brand-dark/60" />
          <div
            className="absolute inset-0 z-0 opacity-[0.08]"
            aria-hidden="true"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`,
              backgroundSize: `32px 32px`,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-0"
            aria-hidden="true"
          >
            <div className="absolute right-[-20%] top-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/20 blur-[120px]" />
            <div className="absolute left-[-10%] bottom-[-20%] w-[35%] h-[35%] rounded-full bg-brand-blue/20 blur-[100px]" />
          </div>
          <motion.div
            className="relative z-10 w-full flex flex-col h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex items-center gap-3 pt-6"
              variants={itemVariants}
            >
              <Logo variant="white" />
              <span className="text-lg font-bold font-heading tracking-tight text-white">
                Shape Up Fitness
              </span>
            </motion.div>
            <div className="flex-1" />
            <motion.div className="space-y-3 mb-10" variants={itemVariants}>
              <h2 className="text-4xl font-medium font-heading tracking-tight text-white">
                Admin Portal
              </h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Manage products, gallery images, and site content all in one
                place.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden">
          <motion.div
            className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-medium font-heading tracking-tight text-white">
                Admin Login
              </h1>
              <p className="text-white/40 text-sm mt-1">
                Enter your credentials to access the dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20">
                    <HugeiconsIcon icon={LockKeyIcon} size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter admin password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl h-12 pl-10 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-sm"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? (
                      <HugeiconsIcon icon={ViewOffIcon} size={16} />
                    ) : (
                      <HugeiconsIcon icon={EyeIcon} size={16} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  className="text-red-400 text-sm text-center bg-red-500/10 rounded-xl py-2.5 px-4 border border-red-500/20"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full h-12 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-blue/90 active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2"
              >
                <HugeiconsIcon icon={UserAdd01Icon} size={18} />
                Sign In
              </button>
            </form>

            <p className="text-center text-white/20 text-xs">
              Authorized personnel only
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
