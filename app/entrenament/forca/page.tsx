"use client";

export default function ForcaPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-extrabold">Força general</h1>
      <p className="text-zinc-700">
        Sessió complementària de gimnàs per mantenir la força necessària a totes
        les proves. Es recomana fer-la <b>1–2 cops per setmana</b>.
      </p>

      <section className="rounded-2xl bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Força</h2>

        <div className="prose text-sm">
          <p>
            <strong>Activació (18′):</strong>
          </p>
          <ul>
            <li>
              Rotació toràcica en quatre suports: 2×15″ per cama (4 sèries) · R
              10″
            </li>
            <li>
              Pes mort a una cama explosius: 2×6 per cama (4 sèries) · R 20″
            </li>
            <li>Planxa comandament: 4×4 (R 30″)</li>
            <li>
              Pont de glutis a una cama elevada: 2×6 per cama (4 sèries) · R 30″
            </li>
          </ul>

          <p>
            <strong>Part complementària (9′, opcional):</strong>
          </p>
          <ul>
            <li>Sentadilla búlgara goblet: 3×8 per cama @20 kg · R 1′</li>
          </ul>

          <p>
            <strong>Bloc principal (25′):</strong>
          </p>

          <div className="ml-4 space-y-2">
            <p>
              <em>Opció A (gimnàs):</em>
            </p>
            <ul>
              <li>
                Sentadilla posterior: mig 3×8 @30–50 kg; alt 4×8 @50–80 kg · R
                1′30″
              </li>
              <li>
                Press d’espatlla amb manuelles: mig 2×6 @ — ; alt 3×6 @ — ; fer
                el moviment a màxima velocitat intencional · R 1′30″
              </li>
              <li>
                Hip thrust: mig 3×8 @30–60 kg; alt 4×8 @60–100 kg · R 1′30″
              </li>
              <li>Jaló al pit: 3×8 · R 1′</li>
              <li>
                Tracció vertical amb banda (1 mà): 2×8 per braç (4 sèries
                totals) · R 30″
              </li>
            </ul>

            <p>
              <em>Opció B (sense gimnàs):</em>
            </p>
            <ul>
              <li>Sentadilla goblet: mig 3×8; alt 4×8 · R 1′</li>
              <li>Flexions amb salt: mig 2×5; alt 3×5 · R 1′</li>
              <li>
                Hip thrust isomètric a una cama: mig 2×15″ @5–10 kg; alt 3×15″
                @10–20 kg · R 30″
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
