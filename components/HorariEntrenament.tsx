"use client";
import { useState } from "react";

export default function HorariEntrenament() {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-2xl bg-white shadow p-6">
      <div className="flex gap-6 justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">
            Horari d’entrenament setmanal
          </h2>
          <p className="text-zinc-700 text-sm mb-4">
            Pots adaptar-lo segons energia i disponibilitat.
          </p>
        </div>

        {/* Botó amb popup */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md bg-red-500 px-3 py-1.5 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Aclaracions
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border bg-white p-4 text-sm shadow-lg z-20">
              <h3 className="font-semibold mb-2">Com interpretar l’horari</h3>
              <p className="text-zinc-700 mb-2">
                Els entrenaments inclouen Navette, Dummy, força general/press,
                natació i circuit.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>
                  <span className="font-medium text-red-600">🏃‍♀️ CN:</span>{" "}
                  entrenament de Cursa Navette.
                </li>
                <li>
                  <span className="font-medium text-red-600">🧲 Dummy:</span>{" "}
                  arrossegament de maniquí + força específica.
                </li>
                <li>
                  <span className="font-medium text-red-600">
                    💪 Força V / D:
                  </span>{" "}
                  força velocitat (Navette) i força Dummy.
                </li>
                <li>
                  <span className="font-medium text-red-600">⚡ Circuit*:</span>{" "}
                  dies amb * = intensitat baixa (1 passada amb crono).
                </li>
                <li>
                  <span className="font-medium text-red-600">🏋️ Gym*:</span>{" "}
                  optatiu segons com et trobis.
                </li>
              </ul>
              <p className="mt-3 text-xs text-zinc-600">
                Objectiu: combinar qualitat, tècnica i recuperació.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-3 text-xs text-red-600 hover:underline"
              >
                Tancar
              </button>
              <div
                className="absolute -top-2 left-6 h-3 w-3 rotate-45 bg-white border-l border-t"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
