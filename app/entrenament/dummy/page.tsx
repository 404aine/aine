"use client";

import { useEffect, useState } from "react";

/* ---------- hook localStorage ---------- */
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

/* ---------- utils temps ---------- */
function parseTimeToSeconds(input: string): number | null {
  const s = input.trim().replace(",", ".");
  if (!s) return null;
  if (s.includes(":")) {
    const [mStr, secStr] = s.split(":");
    const m = Number(mStr);
    const sec = Number(secStr);
    if (Number.isFinite(m) && Number.isFinite(sec))
      return Math.round((m * 60 + sec) * 100) / 100;
    return null;
  }
  const val = Number(s);
  return Number.isFinite(val) ? Math.round(val * 100) / 100 : null;
}

function fmtSeconds(x: number) {
  if (x >= 60) {
    const m = Math.floor(x / 60);
    const s = (x - m * 60).toFixed(2).padStart(5, "0");
    return `${m}:${s}"`;
  }
  return `${x.toFixed(2)}"`;
}

/* ---------- barem dones Dummy ---------- */
function getDummyScore(timeSec: number): number {
  if (timeSec < 30) return 10;
  if (timeSec < 31) return 9.5;
  if (timeSec < 32) return 9;
  if (timeSec < 33) return 8.5;
  if (timeSec < 34) return 8;
  if (timeSec < 35) return 7.5;
  if (timeSec < 36) return 7;
  if (timeSec < 37) return 6.5;
  if (timeSec < 38) return 6;
  if (timeSec < 39) return 5.5;
  if (timeSec < 40) return 5;
  return 0;
}

function gradeColor(points: number) {
  if (points >= 9) return "bg-green-100 text-green-800";
  if (points >= 5) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
}

/* ---------- tipus ---------- */
type DummyEntry = {
  date: string;
  timeSec: number;
  note?: string;
};

/* ---------- Acordió reutilitzable (UNA SOLA DEFINICIÓ) ---------- */
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

/* ---------- Contingut de les sessions ---------- */
const sessions: { title: string; content: React.ReactNode }[] = [
  {
    title: "Cicle 1 (40′)",
    content: (
      <>
        <div className="prose text-sm text-zinc-800 space-y-4">
          <div>
            <h3 className="font-semibold">Activació (13′)</h3>
            <ul className="list-disc pl-5">
              <li>Transicions 90/90 amb suport — 2×10 (5 per costat) · R30″</li>
              <li>Press Pallof — 4×10 (2 per costat) · R30″</li>
              <li>Halo amb mancuerna/KB — 3×3 voltes · R20″</li>
              <li>Planxa RKC — 4×10″ · R30″</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Força (17′)</h3>
            <ul className="list-disc pl-5">
              <li>
                Goblet mantingut — Mig: 4×20″ @20 kg · R30″ · Mig/alt: 4×30″ @24
                kg · R30″ · Alt: 5×30″ @24 kg · R30″
              </li>
              <li>
                Sentadilla goblet amb banda enrere — Mig: 2×10 @16 kg · R1′ ·
                Mig/alt: 3×10 @20 kg · R1′ · Alt: 3×12 @24 kg · R1′
              </li>
              <li>
                Sentadilla en politja baixa (o goma) — Mig: 3×10 · R1′ ·
                Mig/alt: 4×10 · R1′ · Alt: 4×12 · R1′
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Maniquí (10′)</h3>
            <ul className="list-disc pl-5">
              <li>
                Sèries de 10 m (~70 kg): Mig 5 · R1′30″ · Mig/alt 6 · R1′30″ ·
                Alt 6 · R1′
              </li>
            </ul>
          </div>
        </div>
        <p className="bg-muted/50 mt-4 text-sm border-2 border-dashed p-2 rounded text-muted-foreground italic">
          Quan sigui “fàcil”, passa a Cicle 2
        </p>
      </>
    ),
  },
  {
    title: "Cicle 2 (39′)",
    content: (
      <>
        <div className="prose text-sm text-zinc-800 space-y-4">
          <div>
            <h3 className="font-semibold">Activació (13′)</h3>
            <ul className="list-disc pl-5">
              <li>Transicions 90/90 amb suport — 2×10 (5 per costat) · R30″</li>
              <li>Press Pallof front-arriba — 4×6 (2 per costat) · R30″</li>
              <li>Halo amb KB — 4×3 voltes · R20″</li>
              <li>Planxa RKC — 4×10″ · R30″</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Força (14′)</h3>
            <ul className="list-disc pl-5">
              <li>
                Goblet mantingut — Mig: 2×30″ @20 kg · R30″ · Mig/alt: 3×30″ @24
                kg · R30″ · Alt: 3×45″ @24 kg · R30″
              </li>
              <li>
                Sentadilla goblet amb banda enrere — Mig: 2×10 @16 kg · R1′ ·
                Mig/alt: 3×10 @20 kg · R1′ · Alt: 3×12 @24 kg · R1′
              </li>
              <li>
                Sentadilla en politja baixa (o goma) — Mig: 2×12 · R1′ ·
                Mig/alt: 3×12 · R1′ · Alt: 3×15 · R1′
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Maniquí (12′)</h3>
            <ul className="list-disc pl-5">
              <li>15 m: Mig 3 · R1′30″ · Mig/alt 4 · R1′30″ · Alt 4 · R1′</li>
              <li>Descansa 3′</li>
              <li>10 m: Mig 2 · R1′ · Mig/alt 3 · R1′ · Alt 3 · R45″</li>
            </ul>
          </div>
        </div>
        <p className="bg-muted/50 mt-4 text-sm border-2 border-dashed p-2 rounded text-muted-foreground italic">
          Quan sigui “fàcil”, passa a Cicle 3
        </p>
      </>
    ),
  },
  {
    title: "Cicle 3 (38′)",
    content: (
      <>
        <div className="prose text-sm text-zinc-800 space-y-4">
          <div>
            <h3 className="font-semibold">Activació (11′)</h3>
            <ul className="list-disc pl-5">
              <li>Transicions 90/90 — 1×12 (6 per costat) · R30″</li>
              <li>Press Pallof front-arriba — 2×8 (1 per costat) · R30″</li>
              <li>Seq. Planxa RKC + lateral — 3×(10″+10″+10″+10″) · R1′</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Força (14′)</h3>
            <ul className="list-disc pl-5">
              <li>
                Isomètrica 1 cama goblet — Mig: 2×20″ @20 kg · Mig/alt: 2×30″
                @24 kg · Alt: 2×45″ @24 kg · (R20″)
              </li>
              <li>
                Sentadilla goblet amb banda enrere — Mig: 2×10 @16 kg · R1′ ·
                Mig/alt: 3×10 @20 kg · R1′ · Alt: 3×12 @24 kg · R1′
              </li>
              <li>
                Sentadilla en politja baixa — Mig: 2×12 · R1′ · Mig/alt: 3×12 ·
                R1′ · Alt: 3×15 · R1′
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Maniquí (13′)</h3>
            <ul className="list-disc pl-5">
              <li>15 m: Mig 4 · R1′30″ · Mig/alt 5 · R1′30″ · Alt 5 · R1′</li>
              <li>Descansa 2′</li>
              <li>10 m: Mig 2 · R1′ · Mig/alt 3 · R1′ · Alt 3 · R45″</li>
            </ul>
          </div>
        </div>
        <p className="bg-muted/50 mt-4 text-sm border-2 border-dashed p-2 rounded text-muted-foreground italic">
          Quan sigui “fàcil”, passa a Cicle 4
        </p>
      </>
    ),
  },
  {
    title: "Cicle 4 (38′)",
    content: (
      <>
        <div className="prose text-sm text-zinc-800 space-y-4">
          <div>
            <h3 className="font-semibold">Activació (10′)</h3>
            <ul className="list-disc pl-5">
              <li>Transicions 90/90 — 1×12 (6 per costat) · R30″</li>
              <li>Press Pallof front-arriba — 2×8 (1 per costat) · R30″</li>
              <li>Seq. Planxa RKC + lateral — 4×(10″+10″+10″+10″) · R1′</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Força (12′)</h3>
            <ul className="list-disc pl-5">
              <li>
                Isomètrica 1 cama goblet — Mig: 1×20″ @20 kg · Mig/alt: 1×30″
                @24 kg · Alt: 1×45″ @24 kg · (R20″)
              </li>
              <li>
                Sentadilla goblet amb banda enrere — Mig: 2×10 @16 kg · R1′ ·
                Mig/alt: 3×10 @20 kg · R1′ · Alt: 3×12 @24 kg · R1′
              </li>
              <li>
                Zancada posterior goblet — Mig: 2×6/cama @16 kg · R30″ ·
                Mig/alt: 2×8/cama @20 kg · R30″ · Alt: 2×8/cama @24 kg · R30″
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Maniquí (15′)</h3>
            <ul className="list-disc pl-5">
              <li>20 m: Mig 3 · R1′30″ · Mig/alt 4 · R1′30″ · Alt 4 · R1′</li>
              <li>Descansa 2′</li>
              <li>10 m: Mig 4 · R45″ · Mig/alt 5 · R45″ · Alt 5 · R30″</li>
            </ul>
          </div>
        </div>
        <p className="bg-muted/50 mt-4 text-sm border-2 border-dashed p-2 rounded text-muted-foreground italic">
          Quan sigui “fàcil”, passa a Cicle 5
        </p>
      </>
    ),
  },
  {
    title: "Cicle 5 (36′) SIMULACIÓ",
    content: (
      <div className="prose text-sm text-zinc-800 space-y-4">
        <div>
          <h3 className="font-semibold">Activació (9′)</h3>
          <ul className="list-disc pl-5">
            <li>Transicions 90/90 — 1×12 (6 per costat) · R30″</li>
            <li>Press Pallof front-arriba — 2×8 (1 per costat) · R30″</li>
            <li>Seq. Planxa RKC + lateral — 3×(10″+10″+10″+10″) · R1′</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Força (6′)</h3>
          <ul className="list-disc pl-5">
            <li>
              Isomètrica 1 cama goblet — Mig: 1×20″ @20 kg · Mig/alt: 1×30″ @24
              kg · Alt: 1×45″ @24 kg · (R20″)
            </li>
            <li>
              Sentadilla goblet amb banda enrere — Mig: 2×8 @16 kg · R1′ ·
              Mig/alt: 2×10 @20 kg · R1′ · Alt: 2×12 @24 kg · R1′
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Maniquí (21′)</h3>
          <ul className="list-disc pl-5">
            <li>Escalfament — 10 m: 2 sèries (tots) · R1′ (no a tope)</li>
            <li>TEST: 1r intent (oficial) · descansa 4′ · 2n intent</li>
            <li>Final — 15 m: Mig 2 · R1′ · Mig/alt 3 · R1′ · Alt 3 · R1′</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "CICLE 6 (38′)",
    content: (
      <div className="prose text-sm text-zinc-800 space-y-4">
        <div>
          <h3 className="font-semibold">Activació (10′)</h3>
          <ul className="list-disc pl-5">
            <li>Transicions 90/90 — 1×12 (6 per costat) · R30″</li>
            <li>Press Pallof front-arriba — 2×8 (1 per costat) · R30″</li>
            <li>Seq. Planxa RKC + lateral — 4×(10″+10″+10″+10″) · R1′</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Força (12′)</h3>
          <ul className="list-disc pl-5">
            <li>
              Isomètrica 1 cama goblet — Mig: 1×20″ @20 kg · Mig/alt: 1×30″ @24
              kg · Alt: 1×45″ @24 kg · (R20″)
            </li>
            <li>
              Sentadilla goblet amb banda enrere — Mig: 2×10 @16 kg · R1′ ·
              Mig/alt: 3×10 @20 kg · R1′ · Alt: 3×12 @24 kg · R1′
            </li>
            <li>
              Zancada posterior goblet — Mig: 2×6/cama @16 kg · R30″ · Mig/alt:
              2×8/cama @20 kg · R30″ · Alt: 2×8/cama @24 kg · R30″
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Maniquí (15′)</h3>
          <ul className="list-disc pl-5">
            <li>20 m: Mig 4 · R1′30″ · Mig/alt 5 · R1′30″ · Alt 5 · R1′</li>
            <li>Descansa 2′</li>
            <li>10 m: Mig 3 · R45″ · Mig/alt 4 · R45″ · Alt 4 · R30″</li>
          </ul>
        </div>
      </div>
    ),
  },
];

/* ---------- Pàgina ---------- */
export default function DummyPage() {
  const [rawTime, setRawTime] = useState("");
  const [note, setNote] = useState("");
  const [log, setLog] = useLocalStorage<DummyEntry[]>("dummy.times", []);

  const parsed = parseTimeToSeconds(rawTime);
  const canSave = parsed !== null && parsed > 0;

  function saveEntry() {
    if (!canSave) return;
    const entry: DummyEntry = {
      date: new Date().toISOString(),
      timeSec: parsed!,
      note: note.trim() || undefined,
    };
    setLog([entry, ...log]);
    setRawTime("");
    setNote("");
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-extrabold">
        Arrossegament de maniquí🧲
      </h1>
      <p className="text-zinc-700">
        Barem 10 (dones): <b>{'< 30"'}</b>. Simula la prova cada 2 setmanes.
      </p>

      {/* Entrenament per sessions */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Entrenament per sessions</h2>
        <Accordion items={sessions} />
      </section>

      {/* Simulador */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Simulador de Dummy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <label className="block">
            <span className="font-medium">Temps (mm:ss o ss.ss)</span>
            <input
              type="text"
              inputMode="decimal"
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="ex. 00:28 o 28.40"
              value={rawTime}
              onChange={(e) => setRawTime(e.target.value)}
            />
          </label>
          <label className="block sm:col-span-3">
            <span className="font-medium">Nota (opcional)</span>
            <textarea
              className="mt-1 w-full rounded-md border px-3 py-2 min-h-[72px]"
              placeholder="Tècnica, sensacions…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
        </div>
        <div className="flex gap-3">
          <button
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
            onClick={saveEntry}
            disabled={!canSave}
          >
            Desar registre
          </button>
        </div>
      </section>

      {/* Històric */}
      <section className="rounded-2xl bg-white shadow p-6 space-y-3">
        <h2 className="text-lg font-semibold">Històric</h2>
        {log.length === 0 ? (
          <p className="text-sm text-zinc-600">Encara no hi ha registres.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {log.slice(0, 30).map((r, i) => {
              const pts = getDummyScore(r.timeSec);
              return (
                <li
                  key={i}
                  className="rounded-md border p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <p>
                      <b>{new Date(r.date).toLocaleDateString()}</b> · Temps:{" "}
                      <b>{fmtSeconds(r.timeSec)}</b>
                    </p>
                    {r.note && <p className="text-zinc-600">Nota: {r.note}</p>}
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${gradeColor(pts)}`}
                  >
                    {pts}/10
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
