"use client";
import NavetteSimulator from "@/components/NavetteSimulator";
import { useState } from "react";

/* ---------- Acordió reutilitzable ---------- */
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

/* ---------- Pàgina Navette ---------- */
export default function NavettePage() {
  const items = [
    {
      title: "Cicle 1",
      content: (
        <div className="prose text-sm">
          <p>
            <strong>Activació:</strong>
          </p>
          <ul>
            <li>Pas lateral 2×20m cada costat</li>
            <li>Pes mort a una cama 2×6 cada cama</li>
            <li>Skippings baixos 3×20m</li>
            <li>4 passos + pivot 6× cada cama</li>
          </ul>
          <p>
            <strong>Bloc principal (PER1 amb àudio):</strong>
          </p>
          <ul>
            <li>5′ cursa contínua</li>
            <li>3×60m progressius R1′ (acabant al 90%)</li>
            <li>5× PER 7 R1′</li>
            <li>RR 3–4′</li>
            <li>4× PER 7</li>
            <li>RR 3–4′</li>
            <li>Al fallo PER 7</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Cicle 2",
      content: (
        <div className="prose text-sm">
          <p>
            <strong>Activació:</strong>
          </p>
          <ul>
            <li>Rotació de maluc externa 3 passos ×20m</li>
            <li>Drill + arc de suport 2×6 cada cama</li>
            <li>Drop squat 1 cama 2×5</li>
            <li>Peu armat avançant 3×15m</li>
          </ul>
          <p>
            <strong>Bloc principal (VAM):</strong>
          </p>
          <ul>
            <li>8″ CC</li>
            <li>3×60m progressius (acabant al 90%)</li>
            <li>4×400m R1′30″</li>
            <li>RR 3′</li>
            <li>8×200m R45″</li>
            <li>3′ CC molt suau</li>
          </ul>
          <p>
            <em>Temps de referència VAM:</em>
            400m ràpid 1:41 / lent 1:52 200m ràpid 0:49 / lent 0:57 CC ritme
            ràpid 5:33/km, lent 6:43/km
          </p>
        </div>
      ),
    },
    {
      title: "Cicle 3",
      content: (
        <div className="prose text-sm">
          <p>
            <strong>Activació:</strong>
          </p>
          <ul>
            <li>Planxa comandament 3×8</li>
            <li>Pes mort a una cama 3×6 cada cama</li>
            <li>Pont de glutis 3×10</li>
          </ul>
          <p>
            <strong>Bloc principal (Força i mobilitat):</strong>
          </p>
          <ul>
            <li>Excèntrica turmell 3×8 R45″</li>
            <li>Drop squat a una cama 3×6 R30″</li>
            <li>Salts endavant i enrere 2×6 cada cama R30″</li>
            <li>Sentadeta goblet 3×10 R1′</li>
            <li>Zancada davantera goblet 3×8 cada cama R30″</li>
            <li>Zancada enrere goblet 2×8 cada cama R30″</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Cicle 4",
      content: (
        <div className="prose text-sm">
          <p>
            <strong>Activació:</strong>
          </p>
          <ul>
            <li>Cercle aeri en salt 3×8 cada cama</li>
            <li>Peu armat avançant 3×10m</li>
            <li>Sortida pivot + braços estirats 2×20m</li>
            <li>Sprint zancades 4× cada cama</li>
          </ul>
          <p>
            <strong>Bloc principal (Clusters CN amb àudio):</strong>
          </p>
          <ul>
            <li>5″ CC</li>
            <li>3×60m progressius (acabant al 90%)</li>
            <li>6×30m R30″ RR4′</li>
            <li>4×30m R30″ RR4′</li>
            <li>3×30m R30″ RR4′</li>
            <li>Al fallo R30″ RR4′</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-extrabold">Cursa Navette</h1>
      <p className="text-zinc-700">
        Barem 10 (dones): <b>≥ 13 períodes</b>
      </p>
      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Entrenament </h2>
        <Accordion items={items} />
        <p className="text-xs text-zinc-600 mt-3">
          * Els temps i recuperacions s’han calculat com si s’haguessin fet 8
          períodes al test.
        </p>
      </section>
      <NavetteSimulator />
    </main>
  );
}
