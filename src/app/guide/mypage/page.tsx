"use client";

import { useMemo, useState } from "react";
import { bookings, guideAvailabilityById, guides, type Booking } from "@/mocks/data";

const activeGuideSeed = guides.find((guide) => guide.id === "g-2") ?? guides[0];

function monthGrid(year: number, monthZeroBased: number) {
  const firstDay = new Date(Date.UTC(year, monthZeroBased, 1));
  const firstWeekday = firstDay.getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, monthZeroBased + 1, 0)).getUTCDate();

  const cells: Array<{ date: string; day: number; inMonth: boolean }> = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push({ date: `pad-${i}`, day: 0, inMonth: false });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(Date.UTC(year, monthZeroBased, day)).toISOString().slice(0, 10);
    cells.push({ date, day, inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ date: `tail-${cells.length}`, day: 0, inMonth: false });
  }

  return cells;
}

export default function GuideMyPage() {
  const [profile, setProfile] = useState({
    name: activeGuideSeed.name,
    education: activeGuideSeed.profile.education,
    yearsAsGuide: activeGuideSeed.profile.yearsAsGuide,
    specialties: activeGuideSeed.profile.specialties.join(", "),
    personality: activeGuideSeed.profile.personality
  });
  const [bookingState, setBookingState] = useState<Booking[]>(bookings);
  const [availability, setAvailability] = useState<Set<string>>(
    new Set(guideAvailabilityById[activeGuideSeed.id] ?? [])
  );
  const [message, setMessage] = useState("");

  const cells = useMemo(() => monthGrid(2026, 3), []);

  const myOffers = bookingState.filter((booking) =>
    booking.candidateGuideIds.includes(activeGuideSeed.id)
  );
  const confirmedForMe = bookingState.filter(
    (booking) => booking.confirmedGuideId === activeGuideSeed.id
  );

  const toggleAvailability = (date: string) => {
    if (date.startsWith("pad-") || date.startsWith("tail-")) return;
    setAvailability((prev) => {
      const next = new Set(prev);
      if (next.has(date)) next.delete(date);
      else next.add(date);
      return next;
    });
  };

  const saveProfile = () => {
    setMessage("プロフィールを更新しました（Mock）。");
  };

  const saveAvailability = () => {
    setMessage("稼働可能日を更新しました（Mock）。");
  };

  const handleOfferAction = (bookingId: string, action: "accept" | "decline") => {
    setBookingState((prev) =>
      prev.map((booking) => {
        if (booking.id !== bookingId) return booking;
        const set = new Set(booking.acceptedGuideIds);
        if (action === "accept") set.add(activeGuideSeed.id);
        if (action === "decline") set.delete(activeGuideSeed.id);
        return { ...booking, acceptedGuideIds: Array.from(set) };
      })
    );
    setMessage(action === "accept" ? "案件を受諾しました（Mock）。" : "案件を辞退しました（Mock）。");
  };

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          TST GENESIS
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Guide My Page</h1>
        <p className="mt-2 text-sm text-slate-600">
          My Profile / Availability / Acceptance Portal / Guest Brief
        </p>
      </section>

      {message ? (
        <section className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 ring-1 ring-emerald-200">
          {message}
        </section>
      ) : null}

      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">My Profile</h2>
          <div className="mt-4 grid gap-3">
            <Field label="名前" value={profile.name} onChange={(v) => setProfile((p) => ({ ...p, name: v }))} />
            <Field
              label="学歴"
              value={profile.education}
              onChange={(v) => setProfile((p) => ({ ...p, education: v }))}
            />
            <Field
              label="ツアー歴（年）"
              type="number"
              value={String(profile.yearsAsGuide)}
              onChange={(v) => setProfile((p) => ({ ...p, yearsAsGuide: Number(v || 0) }))}
            />
            <Field
              label="得意分野（カンマ区切り）"
              value={profile.specialties}
              onChange={(v) => setProfile((p) => ({ ...p, specialties: v }))}
            />
            <label className="grid gap-1 text-sm text-slate-700">
              人柄
              <textarea
                className="rounded-xl border border-slate-300 px-3 py-2"
                rows={4}
                value={profile.personality}
                onChange={(e) => setProfile((p) => ({ ...p, personality: e.target.value }))}
              />
            </label>
            <button
              type="button"
              className="w-fit rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
              style={{ color: "#ffffff" }}
              onClick={saveProfile}
            >
              プロフィールを保存
            </button>
          </div>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Availability Calendar</h2>
          <p className="mt-1 text-sm text-slate-600">日付をタップして稼働可能日を切り替えます。</p>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2">
            {cells.map((cell) => {
              if (!cell.inMonth) return <div key={cell.date} className="h-10 rounded-lg bg-transparent" />;
              const selected = availability.has(cell.date);
              return (
                <button
                  key={cell.date}
                  type="button"
                  onClick={() => toggleAvailability(cell.date)}
                  className={`h-10 rounded-lg text-sm font-medium ${
                    selected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                  style={selected ? { color: "#ffffff" } : undefined}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="mt-4 w-fit rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
            style={{ color: "#ffffff" }}
            onClick={saveAvailability}
          >
            稼働日を保存
          </button>
        </article>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Acceptance Portal</h2>
          <div className="mt-4 space-y-3">
            {myOffers.map((offer) => {
              const accepted = offer.acceptedGuideIds.includes(activeGuideSeed.id);
              const locked = Boolean(offer.confirmedGuideId);
              return (
                <div key={offer.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    {offer.id} · {offer.guestName}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    {offer.date} / {offer.pax} guests / {offer.status}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      disabled={locked}
                      onClick={() => handleOfferAction(offer.id, "accept")}
                      className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white disabled:opacity-40"
                      style={{ color: "#ffffff" }}
                    >
                      受諾
                    </button>
                    <button
                      type="button"
                      disabled={locked}
                      onClick={() => handleOfferAction(offer.id, "decline")}
                      className="rounded-full bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40"
                    >
                      辞退
                    </button>
                    <span
                      className={`rounded-full px-3 py-2 text-xs ${
                        accepted ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {accepted ? "Accepted" : "Awaiting"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Guest Brief</h2>
          <p className="mt-1 text-sm text-slate-600">
            承認確定後のみ、顧客詳細とIntent Snapshotを表示します。
          </p>
          <div className="mt-4 space-y-3">
            {confirmedForMe.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                確定済み案件はまだありません。
              </div>
            ) : (
              confirmedForMe.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.id} · {item.guestName}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Contact: {item.guestEmail} / {item.guestPhone}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">{item.guestBrief}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.intentSnapshot.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
}) {
  return (
    <label className="grid gap-1 text-sm text-slate-700">
      {label}
      <input
        type={type}
        className="rounded-xl border border-slate-300 px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
