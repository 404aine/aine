"use client";

import { useEffect, useState } from "react";

/* --- utilitat per localStorage --- */
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

type SwimEntry = {
  date: string;
  note?: string;
};

export default function NatacioPage() {
  const [note, setNote] = useState("");
  const [log, setLog] = useLocalStorage<SwimEntry[]>("natacio.notes", []);

  function saveToday() {
    const entry: SwimEntry = {
      date: new Date().toISOString(),
      note: note.trim() || undefined,
    };
    setLog([entry, ...log]);
    setNote("");
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-extrabold">Natació</h1>

      <section className="rounded-2xl bg-white shadow p-6 space-y-3">
        <p className="text-zinc-700">
          Prova oficial: <b> apte / no apte</b>.
        </p>
        <p className="text-sm text-zinc-600">
          Recomanació: 1–2 sessions setmanals per mantenir tècnica i respiració.
        </p>
      </section>

      {/* Entrenament recomanat (simple) */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Entrenament recomanat</h2>
        <ul className="list-disc pl-5 text-sm text-zinc-800 space-y-1">
          <li>
            <b>Sessió 1</b>: 6×25 m <b>esquena</b> · descans 30″ entre sèries
          </li>
          <li>
            <b>Sessió 2</b>: 6×25 m <b>crol</b> amb respiració cada 3–4 braçades
          </li>
          <li>
            <b>Sessió 3</b>: 4×25 m canviant d’estil (crol ⇄ esquena) i{" "}
            <b>esquivant un objecte</b> al carril (per ex. pull-buoy)
          </li>
        </ul>
        <p className="text-xs text-zinc-600">
          Treballa canvis d’estil fluids i mantén cap i malucs alineats en
          esquena.
        </p>
      </section>

      {/* Registre de sessions */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Registre de sessions</h2>
        <label className="block text-sm">
          <span className="font-medium">Comentari o nota</span>
          <input
            type="text"
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="ex. 6×25m esquena + 4×25m crol amb obstacles"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <button
          onClick={saveToday}
          className="rounded-md bg-red-300 px-4 py-2 text-white hover:bg-red-400"
        >
          Afegir sessió
        </button>

        <div className="pt-2">
          {log.length === 0 ? (
            <p className="text-sm text-zinc-600">Encara no hi ha registres.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {log.map((r, i) => (
                <li
                  key={i}
                  className="rounded-md border p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <p>
                      <b>{new Date(r.date).toLocaleDateString()}</b>
                      {r.note && <> · {r.note}</>}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
