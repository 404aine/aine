"use client";

import { useEffect, useState } from "react";

/* ---------- utilitats ---------- */
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue] as const;
}

function gradeColor(points: number) {
  if (points >= 9) return "bg-green-100 text-green-800";
  if (points >= 5) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
}

/** Nota Navette (DONES) a partir del palier assolit */
function getNavetteScoreWomen(paliers: number): number {
  if (paliers >= 13) return 10;
  if (paliers >= 12.5) return 9.5;
  if (paliers >= 12) return 9;
  if (paliers >= 11.5) return 8.5;
  if (paliers >= 11) return 8;
  if (paliers >= 10.5) return 7.5;
  if (paliers >= 10) return 7;
  if (paliers >= 9.5) return 6.5;
  if (paliers >= 9) return 6;
  if (paliers >= 8.5) return 5.5;
  if (paliers >= 8) return 5;
  return 0; // ≤ 7.5
}

/* ---------- tipus ---------- */
type NavetteSim = { date: string; paliers: number; note?: string };

type Props = {
  /** clau per a localStorage (per si en vols una altra) */
  storageKey?: string;
  /** títol a mostrar al capçal */
  title?: string;
};

/* ---------- component ---------- */
export default function NavetteSimulator({
  storageKey = "navette.sims",
  title = "Simulador",
}: Props) {
  const [paliersRaw, setPaliersRaw] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const [log, setLog] = useLocalStorage<NavetteSim[]>(storageKey, []);

  const pal = paliersRaw === "" ? NaN : Number(paliersRaw.replace(",", "."));
  const valid = Number.isFinite(pal) && pal >= 0;

  function saveSim() {
    if (!valid) return;
    const entry: NavetteSim = {
      date: new Date().toISOString(),
      paliers: Math.round(pal * 10) / 10, // permet .5
      note: note.trim() || undefined,
    };
    setLog([entry, ...log]);
    setPaliersRaw("");
    setNote("");
  }

  const previewPts =
    Number.isFinite(pal) && pal >= 0 ? getNavetteScoreWomen(pal) : null;

  return (
    <section className="rounded-2xl bg-white shadow p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-xs px-2 py-1 rounded bg-red-50 text-red-700 font-medium">
          Fes la simulació cada 2 setmanes
        </span>
      </div>

      {/* Formulari */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <label className="block">
          <span className="font-medium">Paliers assolits</span>
          <input
            type="number"
            step="0.5"
            min="0"
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="ex. 11.5 (dona: 13 és 10)"
            value={paliersRaw}
            onChange={(e) => setPaliersRaw(e.target.value)}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="font-medium">Nota (opcional)</span>
          <textarea
            className="mt-1 w-full rounded-md border px-3 py-2 min-h-[44px]"
            placeholder="Sensacions, ritme, fatiga…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
      </div>

      {/* Accions + vista prèvia nota */}
      <div className="flex items-center gap-3">
        <button
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          onClick={saveSim}
          disabled={!valid}
        >
          Desar simulació
        </button>

        {previewPts !== null && (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${gradeColor(
              previewPts
            )}`}
          >
            Nota prevista: {previewPts}/10
          </span>
        )}
      </div>

      {/* Històric */}
      <div className="pt-2">
        <h3 className="text-lg font-semibold mb-2">Històric</h3>
        {log.length === 0 ? (
          <p className="text-sm text-zinc-600">Encara no hi ha registres.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {log.slice(0, 30).map((r, i) => {
              const pts = getNavetteScoreWomen(r.paliers);
              return (
                <li
                  key={i}
                  className="rounded-md border p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <p>
                      <b>{new Date(r.date).toLocaleDateString()}</b> · Paliers:{" "}
                      <b>{r.paliers}</b>
                    </p>
                    {r.note && <p className="text-zinc-600">Nota: {r.note}</p>}
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${gradeColor(
                      pts
                    )}`}
                  >
                    {pts}/10
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
