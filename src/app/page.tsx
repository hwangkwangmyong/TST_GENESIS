import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-12">
      <p className="text-xs tracking-[0.16em] text-slate-500 uppercase">Tokyo Signature Tours</p>
      <h1 className="mt-3 text-4xl font-semibold text-slate-900">TST GENESIS</h1>
      <p className="mt-3 text-slate-600">Phase 1 mock prototype (No DB connection).</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/dashboard"
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white"
          style={{ color: "#ffffff" }}
        >
          Open Admin Dashboard
        </Link>
        <Link
          href="/customer/intake"
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white"
          style={{ color: "#ffffff" }}
        >
          Open Customer Intake
        </Link>
        <Link
          href="/guide/mypage"
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white"
          style={{ color: "#ffffff" }}
        >
          Open Guide My Page
        </Link>
        <Link
          href="/review/form"
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white"
          style={{ color: "#ffffff" }}
        >
          Open Review Form
        </Link>
      </div>
    </main>
  );
}
