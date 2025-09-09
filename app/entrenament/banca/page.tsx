"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";

/** localStorage helper */
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

/** arrodoneix a 0.5 kg */
const round05 = (n: number) => Math.round(n * 2) / 2;

/** Acordeó senzill */
function Accordion({
  items,
}: {
  items: { title: string; content: ReactNode }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 bg-red-50 hover:bg-red-100"
            >
              <span className="font-semibold">{it.title}</span>
              <span className={`transition ${isOpen ? "rotate-90" : ""}`}>
                ➤
              </span>
            </button>
            {isOpen && <div className="p-4 bg-white">{it.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

type HistoryEntry = {
  cycle: 1 | 2 | 3;
  date: string;
  usedWeight?: number | null;
  note?: string;
};

type SimEntry = {
  date: string; // ISO
  reps: number; // reps en 45"
  weight?: number | null; // kg utilitzats (opcional)
  note?: string; // nota opcional
};

export default function BancaPage() {
  // Estat principal
  const [rm, setRm] = useLocalStorage<number | null>("banca.rm", null); // 1RM
  const [cycle, setCycle] = useLocalStorage<1 | 2 | 3>("banca.cycle", 1); // cicle actual
  const [notes, setNotes] = useLocalStorage<Record<number, string>>(
    "banca.notes",
    {}
  );
  const [usedWeight, setUsedWeight] = useLocalStorage<number | null>(
    "banca.used",
    null
  );
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>(
    "banca.history",
    []
  );

  // ── Simulacions (llistat “sempre visible”)
  const [sims, setSims] = useLocalStorage<SimEntry[]>("banca.sims", []);
  const lastSimISO = sims.length > 0 ? sims[0].date : null;

  // Percentatges per cicle (pots ajustar)
  const PCT = { c1: 0.6, c2: 0.8, c3: 0.7 };

  // Pesos calculats a partir del RM
  const W = useMemo(() => {
    if (!rm) return null;
    return {
      c1: round05(rm * PCT.c1),
      c2: round05(rm * PCT.c2),
      c3: round05(rm * PCT.c3),
    };
  }, [rm]);

  // Recordatori simulació cada 14 dies (basat en l’última simulació registrada)
  const simMsg = useMemo(() => {
    if (!lastSimISO)
      return "Encara no has registrat cap simulació. Fes-ne una.";
    const now = new Date();
    const last = new Date(lastSimISO);
    const diff = Math.round(
      (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    );
    const rem = 14 - diff;
    return rem <= 0
      ? `Toca simulació (han passat ${diff} dies).`
      : `Proper recordatori en ${rem} dies.`;
  }, [lastSimISO]);

  // Formulari “Registrar simulació”
  const [simReps, setSimReps] = useState<number | "">("");
  const [simWeight, setSimWeight] = useState<number | "">("");
  const [simNote, setSimNote] = useState<string>("");

  function addSimulation() {
    if (simReps === "" || Number.isNaN(simReps)) return;
    const entry: SimEntry = {
      date: new Date().toISOString(),
      reps: Number(simReps),
      weight: simWeight === "" ? undefined : Number(simWeight),
      note: simNote?.trim() || undefined,
    };
    setSims([entry, ...sims]);
    // neteja formulari
    setSimReps("");
    setSimWeight("");
    setSimNote("");
  }

  function completeCycle() {
    const entry: HistoryEntry = {
      cycle,
      date: new Date().toISOString(),
      usedWeight,
      note: notes[cycle],
    };
    setHistory([entry, ...history]);

    if (cycle < 3) {
      setCycle((cycle + 1) as unknown as 1 | 2 | 3);
    } else {
      // en acabar C3 → puja RM +2.5 kg i torna a C1
      if (rm !== null) setRm(round05(rm));
      setCycle(1);
      setNotes({});
      setUsedWeight(null);
    }
  }

  function resetBlock() {
    setCycle(1);
    setNotes({});
    setUsedWeight(null);
  }

  // Items de l’acordeó: MOSTREN el pes calculat directament
  const items = [
    {
      title: "Cicle 1 · Adaptació",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-800">
            <li>
              Banca <b>4×12</b>{" "}
              {rm ? (
                <>
                  amb <b>{W!.c1} kg</b> (≈{Math.round(PCT.c1 * 100)}% de 1RM)
                </>
              ) : (
                <span className="text-zinc-500">(introdueix el teu 1RM)</span>
              )}
            </li>
            <li>Press militar 3×10 (accessori)</li>
            <li>Fons/paral·leles 3×8–12</li>
          </ul>
          <p className="bg-muted/50 mt-4 text-sm border-2 border-dashed p-2 rounded text-muted-foreground italic">
            Quan sigui “fàcil”, passa a Cicle 2
          </p>
        </>
      ),
    },
    {
      title: "Cicle 2 · Força",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-800">
            <li>
              Banca <b>5×5</b>{" "}
              {rm ? (
                <>
                  amb <b>{W!.c2} kg</b> (≈{Math.round(PCT.c2 * 100)}% de 1RM)
                </>
              ) : (
                <span className="text-zinc-500">(introdueix el teu 1RM)</span>
              )}
            </li>
            <li>Rem amb barra 4×8</li>
            <li>Core anti-extensió 3×30–45"</li>
          </ul>
          <p className="bg-muted/50 mt-4 text-sm border-2 border-dashed p-2 rounded text-muted-foreground italic">
            Quan sigui “fàcil”, passa a Cicle 3
          </p>
        </>
      ),
    },
    {
      title: "Cicle 3 · Específic",
      content: (
        <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-800">
          <li>
            EMOM 10’: <b>45"</b> on / <b>15"</b> off{" "}
            {rm ? (
              <>
                amb <b>{W!.c3} kg</b> (≈{Math.round(PCT.c3 * 100)}% de 1RM) 20
                reps
              </>
            ) : (
              <span className="text-zinc-500">(introdueix el teu 1RM)</span>
            )}
          </li>
          <li>Supersèries: banca 10 reps + push-ups màximes</li>* Ritme constant
          i recorregut complet{" "}
        </ul>
      ),
    },
  ];

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-extrabold">Press de banca🏋️</h1>
      <p className="text-zinc-700">
        Barem 10 (dones): <b>42,5 kg</b>, <b>20 reps</b> en <b>45"</b>.
      </p>

      {/* 1RM i estat de cicle */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Calculadora de kg</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium">El teu 1RM (kg)</span>
            <input
              type="number"
              step="0.5"
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="ex. 45"
              value={rm ?? ""}
              onChange={(e) =>
                setRm(
                  e.target.value === ""
                    ? null
                    : round05(parseFloat(e.target.value))
                )
              }
            />
          </label>
          <div className="text-sm flex flex-col justify-end">
            <p>
              <span className="font-medium">Cicle actual:</span> <b>{cycle}</b>
              <span className="text-zinc-500">/3</span>
            </p>
          </div>
        </div>
      </section>

      {/* Sessió d’avui + completar cicle */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Sessió d’avui</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block text-sm">
            <span className="font-medium">Notes del cicle {cycle}</span>
            <textarea
              className="mt-1 w-full rounded-md border px-3 py-2 min-h-[88px]"
              placeholder="Com t'has sentit? Ritme, tècnica, fatiga…"
              value={notes[cycle] ?? ""}
              onChange={(e) => setNotes({ ...notes, [cycle]: e.target.value })}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
            onClick={completeCycle}
            disabled={rm === null}
          >
            Completar cicle {cycle}
          </button>

          <button
            className="rounded-md border px-4 py-2 hover:bg-zinc-50"
            onClick={resetBlock}
          >
            Reiniciar bloc
          </button>
        </div>
      </section>

      {/* Entrenament per cicles (acordeó amb KG integrats) */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Entrenament</h2>
        <Accordion items={items} />
        <div className="text-sm">
          Completa C1 → C2 → C3. En acabar C3, torna a fer RM <b>+2,5 kg</b> i
          tornaràs a C1. (si no surt, fes amb el mateix pes)
        </div>
      </section>

      {/* ╭──────────────────── Simulacions (sempre visible) ────────────────────╮ */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold">Simulador</h2>
          <span className="text-xs px-2 py-1 rounded bg-red-50 text-red-700 font-medium">
            Fes la simulació cada 2 setmanes
          </span>
        </div>
        {/* Formulari de registre */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="block text-sm">
            <span className="font-medium">Repeticions en 45"</span>
            <input
              type="number"
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="ex. 15"
              value={simReps}
              onChange={(e) =>
                setSimReps(
                  e.target.value === ""
                    ? ""
                    : Math.max(0, Math.floor(Number(e.target.value)))
                )
              }
            />
          </label>

          <label className="block text-sm sm:col-span-3">
            <span className="font-medium">Nota (opcional)</span>
            <textarea
              className="mt-1 w-full rounded-md border px-3 py-2 min-h-[68px]"
              placeholder="Ritme, tècnica, sensacions…"
              value={simNote}
              onChange={(e) => setSimNote(e.target.value)}
            />
          </label>
        </div>

        <div className="flex gap-3">
          <button
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
            onClick={addSimulation}
            disabled={simReps === "" || Number.isNaN(simReps)}
          >
            Registrar simulació (45")
          </button>

          <span className="px-2 py-1 rounded bg-zinc-100 text-zinc-800 text-sm">
            {simMsg}
          </span>
        </div>

        {/* Llistat de simulacions */}
        {sims.length === 0 ? (
          <p className="text-sm text-zinc-600">
            Encara no hi ha simulacions registrades.
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {sims.slice(0, 12).map((s, i) => (
              <li
                key={i}
                className="rounded-md border p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div>
                  <p>
                    <b>{new Date(s.date).toLocaleDateString()}</b> · {s.reps}{" "}
                    reps en 45"
                    {typeof s.weight === "number" ? (
                      <> · {s.weight} kg</>
                    ) : null}
                  </p>
                  {s.note && <p className="text-zinc-600">Nota: {s.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* ╰──────────────────────────────────────────────────────────────────────╯ */}

      {/* Històric de cicles (opcional) */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-3">
        <h2 className="text-lg font-semibold">Històric de cicles</h2>
        {history.length === 0 ? (
          <p className="text-sm text-zinc-600">Encara no hi ha registres.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {history.slice(0, 8).map((h, i) => (
              <li
                key={i}
                className="rounded-md border p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div>
                  <p>
                    <b>Cicle {h.cycle}</b> ·{" "}
                    {new Date(h.date).toLocaleDateString()}
                  </p>
                  {h.note && <p className="text-zinc-600">Nota: {h.note}</p>}
                </div>
                <div>
                  {h.usedWeight ? (
                    <>
                      Pes: <b>{h.usedWeight} kg</b>
                    </>
                  ) : (
                    "—"
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
