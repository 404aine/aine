"use client";
import { useState, useEffect } from "react";

// Barem oficial 2025 – Circuit d’agilitat (dones)
const BAREM_2025: Array<{ maxSeconds: number; points: number }> = [
  { maxSeconds: 17.33, points: 10 },
  { maxSeconds: 18.34, points: 9.5 },
  { maxSeconds: 19.22, points: 9 },
  { maxSeconds: 20.19, points: 8.5 },
  { maxSeconds: 21.18, points: 8 },
  { maxSeconds: 22.15, points: 7.5 },
  { maxSeconds: 23.13, points: 7 },
  { maxSeconds: 24.1, points: 6.5 },
  { maxSeconds: 25.07, points: 6 },
  { maxSeconds: 26.08, points: 5.5 },
  { maxSeconds: 27.06, points: 5 },
  { maxSeconds: Infinity, points: 0 },
];

// Nota según mejor tiempo
function getAgilityScoreFromBest(bestSeconds: number): number {
  for (const band of BAREM_2025) {
    if (bestSeconds <= band.maxSeconds) return band.points;
  }
  return 0;
}
function gradeColor(points: number) {
  if (points >= 9) return "bg-green-100 text-green-800";
  if (points >= 5) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
}

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

// Acordeón reutilizable
function Accordion({
  items,
}: {
  items: { title: string; content: React.ReactNode }[];
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

type CircuitEntry = {
  date: string; // ISO
  pass1: number; // segons
  pass2: number; // segons
  note?: string;
};

export default function CircuitPage() {
  // Formulari d’entrada
  const [p1, setP1] = useState<string>("");
  const [p2, setP2] = useState<string>("");
  const [note, setNote] = useState<string>("");

  // Històric de temps (localStorage)
  const [log, setLog] = useLocalStorage<CircuitEntry[]>("circuit.times", []);

  // Validació simple
  const p1Num = p1 === "" ? NaN : Number(p1.replace(",", "."));
  const p2Num = p2 === "" ? NaN : Number(p2.replace(",", "."));
  const canSave =
    Number.isFinite(p1Num) && p1Num > 0 && Number.isFinite(p2Num) && p2Num > 0;

  function saveToday() {
    if (!canSave) return;
    const entry: CircuitEntry = {
      date: new Date().toISOString(),
      pass1: Math.round(p1Num * 100) / 100,
      pass2: Math.round(p2Num * 100) / 100,
      note: note.trim() || undefined,
    };
    setLog([entry, ...log]);
    setP1("");
    setP2("");
    setNote("");
  }

  function fmt(s: number) {
    return s.toFixed(2).replace(".", ",") + '"';
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-extrabold">
        Circuit d'agilitat
      </h1>
      <p className="text-zinc-700">
        Barem 10 (dones): <b>≤ 17,33"</b>.
      </p>

      {/* 1. Pliometria */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">1. Calentament</h2>
        <ul className="list-disc pl-5 text-sm text-zinc-800 space-y-1">
          <li>Salts al calaix (box jump): 4×6 reps · controlant aterratges</li>
          <li>Salts horitzontals amb els dos peus: 5×8 salts (rec. 60")</li>
          <li>Salts unipodals (dreta/esquerra): 3×10 per cama</li>
          <li>Pliometria lateral sobre banc baix/con: 3×12 reps ràpides</li>
          <li>Skater jumps (salt lateral llarg): 3×12 reps</li>
        </ul>
        <p className="text-xs text-zinc-600">
          Posa èmfasi en la rapidesa i la reactivitat del contacte amb el terra
          (“amortització curta”).
        </p>
        <p className="text-xs text-zinc-600">
          Mantén la tècnica neta i l’aterratge suau. Intensitat alta, volum
          controlat.
        </p>
      </section>

      {/* 2. Cicles del circuit */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">2. Específic</h2>
        <Accordion
          items={[
            {
              title: "Cicle 1 · Salt trampolí i barra",
              content: (
                <>
                  <ul className="list-disc pl-5 text-sm text-zinc-800 space-y-1">
                    <li>Salt al trampolí i barra: 5×10</li>
                    <li>Caminar per la barra endavant i enrere</li>
                  </ul>
                  <p className="bg-muted/50 mt-4 text-sm border-2 border-dashed p-2 rounded text-muted-foreground italic">
                    Quan sigui “fàcil”, passa a Cicle 2
                  </p>
                </>
              ),
            },
            {
              title: "Cicle 2 · Barra avançada",
              content: (
                <>
                  <ul className="list-disc pl-5 text-sm text-zinc-800 space-y-1">
                    <li>Caminar per la barra</li>
                    <li>
                      Seure i aixecar-se a la barra sense perdre equilibri
                    </li>
                  </ul>
                  <p className="bg-muted/50 mt-4 text-sm border-2 border-dashed p-2 rounded text-muted-foreground italic">
                    Quan sigui “fàcil”, passa a Cicle 3
                  </p>
                </>
              ),
            },
            {
              title: "Cicle 3 · Tanques",
              content: (
                <ul className="list-disc pl-5 text-sm text-zinc-800 space-y-1">
                  <li>
                    Comptar passos des de la tombarella fins a la 1a tanca
                  </li>
                  <li>De la 1a tanca fins al plint</li>
                  <li>Del plint fins a la 2a tanca</li>
                  <li>
                    Passar per sota la 2a tanca + sprint fins a completar el
                    salt final
                  </li>
                </ul>
              ),
            },
          ]}
        />
        <p className="text-xs text-zinc-600">
          Completa el cicle 1 → 2 → 3. Abans de cada cicle cronometra una
          passada i una altra en acabar.
        </p>
      </section>

      {/* 3. Estiraments */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">3. Estiraments</h2>
        <ul className="list-disc pl-5 text-sm text-zinc-800 space-y-1">
          <li>Isquiosurals (seure a terra i tocar puntes): 2×30” per cama</li>
          <li>Quadríceps (dempeus, agafar peu al gluti): 2×30” per cama</li>
          <li>Glutis / piramidal (tumbada creuant cama sobre genoll): 2×30”</li>
          <li>Panxells (empènyer paret, taló a terra): 2×30” per cama</li>
          <li>Lumbars / esquena baixa (gats i gossos): 5–6 reps lentes</li>
        </ul>
        <p className="text-xs text-zinc-600">
          Mantén cada posició sense rebotar, respirant profundament.
        </p>
      </section>
      {/* Cronometratge */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold">Simulador</h2>
          <span className="text-xs px-2 py-1 rounded bg-red-50 text-red-700 font-medium">
            Les 2 primeres passades del dia es cronometren
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <label className="block">
            <span className="font-medium">Passada 1 (segons)</span>
            <input
              type="text"
              inputMode="decimal"
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="ex. 18.25"
              value={p1}
              onChange={(e) => setP1(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="font-medium">Passada 2 (segons)</span>
            <input
              type="text"
              inputMode="decimal"
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="ex. 17.90"
              value={p2}
              onChange={(e) => setP2(e.target.value)}
            />
          </label>

          <label className="block sm:col-span-3">
            <span className="font-medium">Nota (opcional)</span>
            <textarea
              className="mt-1 w-full rounded-md border px-3 py-2 min-h-[72px]"
              placeholder="Traçat, sensacions, errors de tècnica…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
        </div>

        <div className="flex gap-3">
          <button
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
            onClick={saveToday}
            disabled={!canSave}
            title={
              !canSave
                ? "Introdueix ambdós temps (> 0)"
                : "Desar registre d'avui"
            }
          >
            Desar temps d’avui
          </button>
        </div>
      </section>

      {/* Històric de passades (sempre visible) */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-3">
        <h2 className="text-lg font-semibold">Històric de passades</h2>
        {log.length === 0 ? (
          <p className="text-sm text-zinc-600">Encara no hi ha registres.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {log.slice(0, 20).map((r, i) => {
              const best = Math.min(r.pass1, r.pass2);
              const pts = getAgilityScoreFromBest(best);
              return (
                <li
                  key={i}
                  className="rounded-md border p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <p>
                      <b>{new Date(r.date).toLocaleDateString()}</b> · Passada
                      1: <b>{fmt(r.pass1)}</b> · Passada 2:{" "}
                      <b>{fmt(r.pass2)}</b>
                    </p>
                    {r.note && <p className="text-zinc-600">Nota: {r.note}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-700">
                      Millor: <b>{fmt(best)}</b>
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${gradeColor(
                        pts
                      )}`}
                    >
                      Nota: {pts}/10
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
