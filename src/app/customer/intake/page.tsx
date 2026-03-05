"use client";

import { useMemo, useState } from "react";

type IntakeState = {
  date: string;
  time: string;
  guests: number;
  areas: string;
  offBeatenPath: number;
  walkingPace: number;
  foodDrink: number;
  history: number;
  culture: number;
  spontaneity: number;
  experienceNote: string;
};

const sliderLabels = ["1", "2", "3", "4", "5"];

export default function CustomerIntakePage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<IntakeState>({
    date: "",
    time: "",
    guests: 2,
    areas: "",
    offBeatenPath: 3,
    walkingPace: 3,
    foodDrink: 3,
    history: 3,
    culture: 3,
    spontaneity: 3,
    experienceNote: ""
  });

  const isStep1Valid = useMemo(
    () => Boolean(data.date && data.time && data.guests > 0),
    [data.date, data.time, data.guests]
  );

  const updateField = <K extends keyof IntakeState>(key: K, value: IntakeState[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-10">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          TST GENESIS
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Customer Intake Form</h1>
        <p className="mt-2 text-sm text-slate-600">
          Logistics と Experience Calibration の2ステップでご希望を収集します。
        </p>

        <div className="mt-6 flex gap-2">
          <div
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              step === 1 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"
            }`}
            style={step === 1 ? { color: "#ffffff" } : undefined}
          >
            Step 1: Logistics
          </div>
          <div
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              step === 2 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"
            }`}
            style={step === 2 ? { color: "#ffffff" } : undefined}
          >
            Step 2: Experience Calibration
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        {step === 1 ? (
          <div className="grid gap-4">
            <h2 className="text-lg font-semibold text-slate-900">Logistics</h2>
            <label className="grid gap-1 text-sm text-slate-700">
              希望日
              <input
                type="date"
                className="rounded-xl border border-slate-300 px-3 py-2"
                value={data.date}
                onChange={(e) => updateField("date", e.target.value)}
              />
            </label>
            <label className="grid gap-1 text-sm text-slate-700">
              開始時間
              <input
                type="time"
                className="rounded-xl border border-slate-300 px-3 py-2"
                value={data.time}
                onChange={(e) => updateField("time", e.target.value)}
              />
            </label>
            <label className="grid gap-1 text-sm text-slate-700">
              人数
              <input
                type="number"
                min={1}
                max={12}
                className="rounded-xl border border-slate-300 px-3 py-2"
                value={data.guests}
                onChange={(e) => updateField("guests", Number(e.target.value))}
              />
            </label>
            <label className="grid gap-1 text-sm text-slate-700">
              希望エリア（任意）
              <input
                type="text"
                className="rounded-xl border border-slate-300 px-3 py-2"
                placeholder="Asakusa, Yanaka..."
                value={data.areas}
                onChange={(e) => updateField("areas", e.target.value)}
              />
            </label>

            <div className="mt-2">
              <button
                type="button"
                disabled={!isStep1Valid}
                onClick={() => setStep(2)}
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white disabled:opacity-40"
                style={{ color: "#ffffff" }}
              >
                Step 2へ進む
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            <h2 className="text-lg font-semibold text-slate-900">Experience Calibration</h2>

            <SliderRow
              label="Off the beaten path vs Main attractions"
              value={data.offBeatenPath}
              onChange={(value) => updateField("offBeatenPath", value)}
            />
            <SliderRow
              label="Walking pace"
              value={data.walkingPace}
              onChange={(value) => updateField("walkingPace", value)}
            />
            <SliderRow
              label="Food & drink"
              value={data.foodDrink}
              onChange={(value) => updateField("foodDrink", value)}
            />
            <SliderRow
              label="History"
              value={data.history}
              onChange={(value) => updateField("history", value)}
            />
            <SliderRow
              label="Culture"
              value={data.culture}
              onChange={(value) => updateField("culture", value)}
            />
            <SliderRow
              label="Spontaneity"
              value={data.spontaneity}
              onChange={(value) => updateField("spontaneity", value)}
            />

            <label className="grid gap-1 text-sm text-slate-700">
              What I want from my experience
              <textarea
                rows={5}
                className="rounded-xl border border-slate-300 px-3 py-2"
                value={data.experienceNote}
                onChange={(e) => updateField("experienceNote", e.target.value)}
                placeholder="I want a calm day with hidden food alleys..."
              />
            </label>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-700"
              >
                戻る
              </button>
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
                style={{ color: "#ffffff" }}
              >
                送信（Mock）
              </button>
            </div>
          </div>
        )}
      </section>

      {submitted ? (
        <section className="mt-5 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-200">
          <h3 className="font-semibold text-emerald-800">送信完了（Mock）</h3>
          <p className="mt-1 text-sm text-emerald-700">
            予約リクエストを受け付けました。次のフェーズでAI Intent Snapshotとマッチングへ連携します。
          </p>
        </section>
      ) : null}

      <div className="mt-4 text-xs text-slate-500">{sliderLabels.join(" · ")}</div>
    </main>
  );
}

function SliderRow({
  label,
  value,
  onChange
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm text-slate-700">
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
