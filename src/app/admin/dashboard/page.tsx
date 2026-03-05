import Link from "next/link";
import { bookings, computeGuideCompensationPerHour, guides, type Role } from "@/mocks/data";

type AdminDashboardProps = {
  searchParams?: Promise<{ role?: Role }>;
};

const statusStyle: Record<string, string> = {
  Pending: "bg-slate-100 text-slate-700",
  Matching: "bg-amber-100 text-amber-700",
  Confirmed: "bg-emerald-100 text-emerald-700"
};

export default async function AdminDashboard({ searchParams }: AdminDashboardProps) {
  const query = searchParams ? await searchParams : undefined;
  const role = query?.role === "lead" ? "lead" : "admin";
  const isLead = role === "lead";

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Tokyo Signature Tours
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Admin / Lead Dashboard</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600">
          Booking pipeline, matching candidates, and final approvals in one workspace.
        </p>
        <div className="mt-5 flex gap-2">
          <Link
            href="/admin/dashboard?role=admin"
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              !isLead ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
            }`}
            style={!isLead ? { color: "#ffffff" } : undefined}
          >
            Admin View
          </Link>
          <Link
            href="/admin/dashboard?role=lead"
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              isLead ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
            }`}
            style={isLead ? { color: "#ffffff" } : undefined}
          >
            Lead View
          </Link>
        </div>
      </div>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        {["Pending", "Matching", "Confirmed"].map((status) => {
          const count = bookings.filter((b) => b.status === status).length;
          return (
            <article key={status} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">{status}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{count}</p>
              <p className="mt-1 text-sm text-slate-500">bookings</p>
            </article>
          );
        })}
      </section>

      <section className="space-y-4">
        {bookings.map((booking) => {
          const candidates = booking.candidateGuideIds
            .map((id) => guides.find((g) => g.id === id))
            .filter((g) => Boolean(g));

          return (
            <article
              key={booking.id}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500">{booking.id}</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">{booking.guestName}</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {booking.date} · {booking.pax} guests
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {booking.intentSnapshot.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    statusStyle[booking.status]
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {candidates.map((guide) => {
                  if (!guide) return null;
                  const accepted = booking.acceptedGuideIds.includes(guide.id);
                  const confirmed = booking.confirmedGuideId === guide.id;
                  const compensation = computeGuideCompensationPerHour(guide.rank, booking.pax);

                  return (
                    <div
                      key={guide.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900">{guide.name}</p>
                        <span className="text-xs text-slate-500">{guide.rank}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">
                        5-star reviews: {guide.star5Count}
                      </p>
                      {!isLead ? (
                        <p className="mt-1 text-sm text-slate-600">
                          Compensation: ${compensation}/hr
                        </p>
                      ) : null}
                      {!isLead ? (
                        <p className="mt-1 text-sm text-slate-600">
                          Booking Sales: ${booking.salesAmountUsd}
                        </p>
                      ) : null}

                      <div className="mt-4 flex items-center gap-2">
                        {confirmed ? (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Confirmed
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
                            style={{ color: "#ffffff" }}
                          >
                            承認する
                          </button>
                        )}
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            accepted
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {accepted ? "Accepted" : "Waiting"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
