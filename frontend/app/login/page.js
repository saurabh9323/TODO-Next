"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Fingerprint, KeyRound, LockKeyhole, Mail, Shield, Smartphone, UserRound, Waves } from "lucide-react";
import { demoAccounts, setSession } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("ADMIN");
  const [step, setStep] = useState("identity");
  const [email, setEmail] = useState("admin@todo.app");
  const [otp, setOtp] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [mfa, setMfa] = useState("");

  const account = useMemo(() => (role === "ADMIN" ? demoAccounts.admin : demoAccounts.user), [role]);

  function sendOtp(event) {
    event.preventDefault();
    setStep("otp");
  }

  function verifyOtp(event) {
    event.preventDefault();
    if (mfaEnabled) {
      setStep("mfa");
      return;
    }
    completeLogin();
  }

  function completeLogin() {
    setSession({ ...account, email: email || account.email });
    router.replace(role === "ADMIN" ? "/admin/dashboard" : "/user/todos");
  }

  function oauthLogin(provider) {
    setSession({ ...account, email: email || account.email, provider });
    router.replace(role === "ADMIN" ? "/admin/dashboard" : "/user/todos");
  }

  const currentStep = step === "identity" ? 1 : step === "otp" ? 2 : 3;

  return (
    <main className="grid min-h-screen grid-cols-1 overflow-hidden bg-blush dark:bg-ink lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative flex min-h-[44vh] flex-col justify-between overflow-hidden bg-plum p-6 text-white sm:p-8 lg:min-h-screen">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-black/25 to-transparent" />
        <div className="flex items-center justify-between">
          <div className="relative flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-white text-plum shadow-glow">
              <Shield size={21} />
            </span>
            <span className="text-xl font-black">Todo Command</span>
          </div>
          <ThemeToggle />
        </div>
        <div className="relative max-w-xl py-12">
          <p className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-black uppercase tracking-wide text-white/90">
            <LockKeyhole size={16} />
            Secure workspace access
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">One gateway for admin control and user focus.</h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/75">
            OTP-first login, MFA verification, and OAuth-ready access wrapped in a crisp command-center experience.
          </p>
        </div>
        <div className="relative grid gap-3 sm:grid-cols-3">
          {[
            ["OTP", "6 digit challenge"],
            ["OAuth", "Provider ready"],
            ["MFA", "Device confirmed"]
          ].map(([item, detail], index) => (
            <div key={item} className="animate-rise rounded-md border border-white/10 bg-white/10 p-4 backdrop-blur" style={{ animationDelay: `${index * 90}ms` }}>
              <p className="text-sm font-black">{item}</p>
              <p className="mt-1 text-xs text-white/70">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center p-6 sm:p-8">
        <div className="surface animate-rise w-full max-w-xl p-5 sm:p-7">
          <div className="mb-7 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-orchid">Identity check</p>
              <h2 className="mt-1 text-3xl font-black text-plum dark:text-white">Welcome back</h2>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-md bg-orchid/10 text-orchid">
              <Waves size={22} />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-md bg-lilac p-1 dark:bg-black/20">
            {["ADMIN", "USER"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setRole(item);
                  setEmail(item === "ADMIN" ? demoAccounts.admin.email : demoAccounts.user.email);
                  setStep("identity");
                }}
                className={`focus-ring rounded-md px-4 py-2 text-sm font-bold transition ${
                  role === item ? "bg-white text-plum shadow-sm dark:bg-plum dark:text-white" : "text-slate-500 dark:text-slate-300"
                }`}
              >
                {item === "ADMIN" ? "Admin" : "User"}
              </button>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-2 overflow-hidden rounded-full bg-plum/10 dark:bg-white/10">
                <div className={`h-full rounded-full transition-all duration-500 ${item <= currentStep ? "w-full bg-gradient-to-r from-plum to-orchid" : "w-0 bg-plum"}`} />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-sm font-black uppercase tracking-wide text-orchid">Step {currentStep} of {mfaEnabled ? "3" : "2"}</p>
            <h3 className="mt-2 text-2xl font-black text-ink dark:text-white">
              {step === "identity" && "Start with your email"}
              {step === "otp" && "Enter the OTP"}
              {step === "mfa" && "Confirm MFA"}
            </h3>
          </div>

          {step === "identity" && (
            <form onSubmit={sendOtp} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-200">Email address</span>
                <span className="field flex items-center gap-3">
                  <Mail size={18} className="text-orchid" />
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full bg-transparent outline-none"
                    type="email"
                    required
                  />
                </span>
              </label>
              <label className="flex items-center justify-between rounded-md border border-plum/10 bg-blush/70 p-3 dark:border-white/10 dark:bg-black/20">
                <span className="flex items-center gap-3 text-sm font-bold text-ink dark:text-white">
                  <Fingerprint size={18} className="text-orchid" />
                  MFA challenge
                </span>
                <input checked={mfaEnabled} onChange={(event) => setMfaEnabled(event.target.checked)} type="checkbox" className="h-5 w-5 accent-orchid" />
              </label>
              <button className="primary-button w-full py-3">
                Send OTP
                <ArrowRight size={17} />
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={verifyOtp} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-200">One-time password</span>
                <span className="field flex items-center gap-3">
                  <Smartphone size={18} className="text-orchid" />
                  <input
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    className="w-full bg-transparent outline-none"
                    placeholder="123456"
                    minLength={4}
                    required
                  />
                </span>
              </label>
              <button className="primary-button w-full py-3">
                Verify OTP
                <ArrowRight size={17} />
              </button>
            </form>
          )}

          {step === "mfa" && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                completeLogin();
              }}
              className="mt-6 space-y-4"
            >
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-200">Authenticator code</span>
                <span className="field flex items-center gap-3">
                  <KeyRound size={18} className="text-orchid" />
                  <input
                    value={mfa}
                    onChange={(event) => setMfa(event.target.value)}
                    className="w-full bg-transparent outline-none"
                    placeholder="000000"
                    minLength={4}
                    required
                  />
                </span>
              </label>
              <button className="primary-button w-full py-3">
                Continue
                <ArrowRight size={17} />
              </button>
            </form>
          )}

          <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            OAuth
            <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {["Google", "GitHub", "Microsoft"].map((provider) => (
              <button
                key={provider}
                type="button"
                onClick={() => oauthLogin(provider)}
                className="soft-button px-3"
              >
                <UserRound size={16} />
                {provider}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
