"use client";

import { useState } from "react";

const spots = [
  "Asakusa",
  "Shibuya",
  "Tsukiji",
  "Meiji Shrine",
  "Yanaka",
  "Odaiba",
  "Ueno",
  "Kiyosumi"
];

export default function ReviewFormPage() {
  const [rating, setRating] = useState(5);
  const [selectedSpots, setSelectedSpots] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleSpot = (spot: string) => {
    setSelectedSpots((prev) =>
      prev.includes(spot) ? prev.filter((item) => item !== spot) : [...prev, spot]
    );
  };

  const submitReview = () => {
    setSubmitted(true);
  };

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-10">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          TST GENESIS
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Review Form</h1>
        <p className="mt-2 text-sm text-slate-600">
          ツアー体験の評価を入力してください。送信後にGoogle Map投稿へ案内します。
        </p>
      </section>

      <section className="mt-5 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">1) 星評価（5段階）</h2>
        <div className="mt-3 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-3xl ${star <= rating ? "text-amber-400" : "text-slate-300"}`}
              aria-label={`${star} star`}
            >
              ★
            </button>
          ))}
          <span className="ml-2 text-sm text-slate-600">{rating}/5</span>
        </div>

        <h2 className="mt-8 text-lg font-semibold text-slate-900">2) Spot Selector</h2>
        <p className="mt-1 text-sm text-slate-600">良かったスポットを選択してください。</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {spots.map((spot) => {
            const selected = selectedSpots.includes(spot);
            return (
              <button
                key={spot}
                type="button"
                onClick={() => toggleSpot(spot)}
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  selected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                }`}
                style={selected ? { color: "#ffffff" } : undefined}
              >
                {spot}
              </button>
            );
          })}
        </div>

        <h2 className="mt-8 text-lg font-semibold text-slate-900">3) コメント（任意）</h2>
        <textarea
          className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2"
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="ガイドの良かった点、改善点など"
        />

        <div className="mt-6">
          <button
            type="button"
            onClick={submitReview}
            className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white"
            style={{ color: "#ffffff" }}
          >
            送信（Mock）
          </button>
        </div>
      </section>

      {submitted ? (
        <section className="mt-5 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-200">
          <h3 className="font-semibold text-emerald-800">レビュー送信ありがとうございます</h3>
          <p className="mt-1 text-sm text-emerald-700">
            体験をさらに多くの方へ届けるため、Google Mapにもご投稿いただけると嬉しいです。
          </p>
          <a
            className="mt-3 inline-block rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
            style={{ color: "#ffffff" }}
            href="https://www.google.com/maps"
            target="_blank"
            rel="noreferrer"
          >
            Google Map に投稿する
          </a>
        </section>
      ) : null}
    </main>
  );
}
