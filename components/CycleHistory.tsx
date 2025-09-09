"use client";

import { useEffect, useState } from "react";

/* ---------- utils ---------- */
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

function gradeColor(n: number | null) {
  if (n === null) return "bg-zinc-100 text-zinc-700";
  if (n >= 9) return "bg-green-100 text-green-800";
  if (n >= 5) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
}

/* ---------- types ---------- */
type Entry = {
  date: string; // ISO
  cycle: string; // "Cicle 1", "Cicle 2"...
  metric?: number | null; // pes (kg), temps (s), paliers...
  notes?: string;
  done?: boolean;
};

type Props = {
  /** clau de localStorage per a aquesta prova (única!) */
  storageKey: string;
  /** títol a mostrar */
  title?: string;
  /** llista de cicles disponibles */
  cycles: string[];
  /** etiqueta per a la mètrica (opc.) p.ex. "Pes (kg)", "Temps (s)", "Paliers"  */
  metricLabel?: string;
  /** pas del input numèric (p.ex. 0.5 per paliers, 0.01 per segons) */
  metricStep?: number;
  /** placeholder del input numèric */
  metricPlaceholder?: string;
  /** funció per convertir mètrica a “nota” (opc.) — retorna 0..10 o null */
  metricToScore?: (m: number) => number | null;
};

export default function CycleHistory({
  storageKey,
  title = "Històric de cicles",
  cycles,
  metricLabel,
  metricStep = 1,
  metricPlaceholder,
  metricToScore,
}: Props) {
  const [log, setLog] = useLocalStorage<Entry[]>(storageKey, []);

  // form
  const [cycle, setCycle] = useState(cycles[0] ?? "Cicle 1");
  const [metric, setMetric] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  const metricNum =
    metric.trim() === "" ? null : Number(metric.replace(",", "."));
  const isMetricValid = metricLabel
    ? metricNum !== null && Number.isFinite(metricNum)
    : true;

  const canSave = cycle && isMetricValid;

  function save() {
    if (!canSave) return;
    const entry: Entry = {
      date: new Date().toISOString(),
      cycle,
      metric: metricLabel ? (metricNum as number) : undefined,
      notes: notes.trim() || undefined,
      done,
    };
    setLog([entry, ...log]);
    setNotes("");
    setMetric("");
    setDone(false);
  }

  function clearAll() {
    if (confirm("Segur que vols buidar l’històric?")) setLog([]);
  }

  return (
    <section className="rounded-2xl bg-white shadow p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={clearAll}
          className="text-xs px-2 py-1 rounded border hover:bg-zinc-50"
          title="Buidar històric"
        >
          Neteja
        </button>
      </div>

      {/* formulari */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
        <label className="block">
          <span className="font-medium">Cicle</span>
          <select
            className="mt-1 w-full rounded-md border px-3 py-2"
            value={cycle}
            onChange={(e) => setCycle(e.target.value)}
          >
            {cycles.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        {metricLabel && (
          <label className="block">
            <span className="font-medium">{metricLabel}</span>
            <input
              type="number"
              step={metricStep}
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder={metricPlaceholder}
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
            />
          </label>
        )}

        <label className="block sm:col-span-2">
          <span className="font-medium">Notes (opcional)</span>
          <input
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="Sensacions, càrrega, tècnica…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
          />
          <span className="text-sm">Cicle completat</span>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={!canSave}
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          Afegir al registre
        </button>

        {/* vista prèvia nota (si hi ha funció) */}
        {metricLabel && metricToScore && Number.isFinite(metricNum) && (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${gradeColor(
              metricToScore(metricNum as number)
            )}`}
          >
            Nota: {metricToScore(metricNum as number)}/10
          </span>
        )}
      </div>

      {/* llistat */}
      <div className="pt-2">
        {log.length === 0 ? (
          <p className="text-sm text-zinc-600">Encara no hi ha registres.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {log.map((r, i) => {
              const pts =
                metricLabel && metricToScore && r.metric != null
                  ? metricToScore(r.metric)
                  : null;
              return (
                <li
                  key={i}
                  className="rounded-md border p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <p>
                      <b>{new Date(r.date).toLocaleDateString()}</b> ·{" "}
                      <b>{r.cycle}</b>
                      {r.metric != null && (
                        <>
                          {" "}
                          · {metricLabel}: <b>{r.metric}</b>
                        </>
                      )}
                    </p>
                    {r.notes && (
                      <p className="text-zinc-600">Notes: {r.notes}</p>
                    )}
                    {r.done && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-zinc-100">
                        ✅ Completat
                      </span>
                    )}
                  </div>

                  {pts !== null && (
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${gradeColor(
                        pts
                      )}`}
                    >
                      {pts}/10
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
