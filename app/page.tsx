// app/page.tsx
// app/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HorariEntrenament from "@/components/HorariEntrenament";

function EntrenamentPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Entrenament</h1>

      {/* Aquí pintamos el horario */}
      <HorariEntrenament />
    </main>
  );
}
export default function Home() {
  return (
    <main className="flex flex-col gap-8 min-h-screen items-center justify-center p-6">
      <div className="mx-auto grid w-full max-w-3xl gap-6">
        {/* HERO */}
        <Card className="shadow-md">
          <CardHeader className="space-y-2">
            <Badge className="w-fit">
              Opositora a Bombera de la Generalitat
            </Badge>
            <CardTitle className="text-3xl font-extrabold text-red-700/50">
              Presentació
            </CardTitle>
            <p className="text-zinc-700">
              Plataforma amb accés a informació contrastada sobre les proves
              físiques de l’oposició a Bombers de la Generalitat, amb programes
              d’entrenament específics per optimitzar el rendiment en cada
              prova.
            </p>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button asChild className="bg-red-500">
              <a href="mailto:ainegar555@gmail.com">Contacta’m</a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/404aine"
                target="_blank"
                rel="noreferrer"
              >
                El meu GitHub
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* ENTRENAMENT FÍSIC */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Entrenament</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {/* Fila amb la resta de proves */}
            <div className="grid grid-cols-3 gap-4 sm:grid-cols- md:grid-cols-5">
              {/* Fila de Força sola */}
              <div className="md:col-span-5">
                <Link
                  href="/entrenament/forca"
                  className="inline-block font-medium text-white bg-blue-400 px-3 py-1.5 rounded-md hover:bg-blue-500 transition"
                >
                  Força
                </Link>
                <p className="text-zinc-700 mt-1">Sessió gym</p>
              </div>

              <div>
                <Link
                  href="/entrenament/banca"
                  className="inline-block font-medium text-white bg-red-400 px-3 py-1.5 rounded-md hover:bg-red-500 transition"
                >
                  Banca
                </Link>
                <p className="text-zinc-700 mt-1">≥ 42,5kg</p>
              </div>

              <div>
                <Link
                  href="/entrenament/circuit"
                  className="inline-block font-medium text-white bg-red-400 px-3 py-1.5 rounded-md hover:bg-red-500 transition"
                >
                  Circuit
                </Link>
                <p className="text-zinc-700 mt-1">≤ 17,33"</p>
              </div>

              <div>
                <Link
                  href="/entrenament/navette"
                  className="inline-block font-medium text-white bg-red-400 px-3 py-1.5 rounded-md hover:bg-red-500 transition"
                >
                  Navette
                </Link>
                <p className="text-zinc-700 mt-1">≥ 13 períodes</p>
              </div>

              <div>
                <Link
                  href="/entrenament/dummy"
                  className="inline-block font-medium text-white bg-red-400 px-3 py-1.5 rounded-md hover:bg-red-500 transition"
                >
                  Dummy
                </Link>
                <p className="text-zinc-700 mt-1">&lt; 30"</p>
              </div>

              <div>
                <Link
                  href="/entrenament/natacio"
                  className="inline-block font-medium text-white bg-red-400 px-3 py-1.5 rounded-md hover:bg-red-500 transition"
                >
                  Natació
                </Link>
                <p className="text-zinc-700 mt-1">Apte o no apte</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* HORARI D'ENTRENAMENT */}
        <section className="rounded-2xl bg-white shadow p-6">
          <div className="flex gap-6 justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Horari d’entrenament setmanal
              </h2>
              <p className="text-zinc-700 text-sm mb-4">
                Pots adaptar-lo segons energia i disponibilitat.
              </p>
            </div>

            {/* Botó amb popup */}
            <EntrenamentPage />
          </div>

          {/* --- VISTA MÒBIL: TARGETES (sm:hidden) --- */}
          <div className="grid gap-3 sm:hidden">
            {/* Dilluns */}
            <div className="rounded-xl border p-4">
              <div className="font-semibold mb-1">Dilluns</div>
              <div className="text-sm">🏃‍♀️ CN · 🏊 Natació</div>
              <div className="text-sm text-zinc-700">⚡ Circuit*</div>
            </div>
            {/* Dimarts */}
            <div className="rounded-xl border p-4 bg-zinc-50">
              <div className="font-semibold mb-1">Dimarts</div>
              <div className="text-sm">🧲 Dummy · 💪 Força V · ⚡ Circuit</div>
              <div className="text-sm text-zinc-700">🏋️ Gym*</div>
            </div>
            {/* Dimecres */}
            <div className="rounded-xl border p-4">
              <div className="font-semibold mb-1">Dimecres</div>
              <div className="text-sm">🏃‍♀️ CN</div>
              <div className="text-sm text-zinc-700">⚡ Circuit* · 🏋️ Gym*</div>
            </div>
            {/* Dijous */}
            <div className="rounded-xl border p-4 bg-zinc-50">
              <div className="font-semibold mb-1">Dijous</div>
              <div className="text-sm">
                🧲 Dummy · 🏋️ Gym+Press · ⚡ Circuit
              </div>
              <div className="text-sm text-zinc-700">—</div>
            </div>
            {/* Divendres */}
            <div className="rounded-xl border p-4">
              <div className="font-semibold mb-1">Divendres</div>
              <div className="text-sm">🏃‍♀️ CN · 💪 Força D</div>
              <div className="text-sm text-zinc-700">⚡ Circuit*</div>
            </div>
            {/* Dissabte */}
            <div className="rounded-xl border p-4 bg-zinc-50">
              <div className="font-semibold mb-1">Dissabte</div>
              <div className="text-sm">🏋️ Gym+Press</div>
              <div className="text-sm text-zinc-700">🏊 Natació</div>
            </div>
            {/* Diumenge */}
            <div className="rounded-xl border p-4">
              <div className="font-semibold mb-1">Diumenge</div>
              <div className="text-sm">☁️ Descans</div>
              <div className="text-sm text-zinc-700">—</div>
            </div>
          </div>

          {/* --- VISTA ESCRIPTORI: TAULA (oculta al mòbil) --- */}
          <div className="overflow-x-auto hidden sm:block">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-red-100 text-left">
                  <th className="p-3 border">Dia</th>
                  <th className="p-3 border">Proves principals</th>
                  <th className="p-3 border">Complement / Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border font-medium">Dilluns</td>
                  <td className="p-3 border">🏃‍♀️ CN · 🏊 Natació</td>
                  <td className="p-3 border">⚡ Circuit*</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-3 border font-medium">Dimarts</td>
                  <td className="p-3 border">
                    🧲 Dummy · 💪 Força V · ⚡ Circuit
                  </td>
                  <td className="p-3 border">🏋️ Gym*</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Dimecres</td>
                  <td className="p-3 border">🏃‍♀️ CN</td>
                  <td className="p-3 border">⚡ Circuit* · 🏋️ Gym*</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-3 border font-medium">Dijous</td>
                  <td className="p-3 border">
                    🧲 Dummy · 🏋️ Gym+Press · ⚡ Circuit
                  </td>
                  <td className="p-3 border">—</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Divendres</td>
                  <td className="p-3 border">🏃‍♀️ CN · 💪 Força D</td>
                  <td className="p-3 border">⚡ Circuit*</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-3 border font-medium">Dissabte</td>
                  <td className="p-3 border">🏋️ Gym+Press</td>
                  <td className="p-3 border">🏊 Natació</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Diumenge</td>
                  <td className="p-3 border">☁️ Descans</td>
                  <td className="p-3 border">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        {/* CONSELLS DE PREPARACIÓ */}
        <section className="rounded-2xl bg-white shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Consells de preparació</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {/* Consell 1 */}
            <div className="border rounded-lg p-4 hover:shadow-md transition">
              <h3 className="font-medium text-red-600 mb-2">
                🏃‍♀️ Cursa Navette
              </h3>
              <p className="text-zinc-700">
                Independentment del dia específic de Navette, fes carrera diària
                d'una hora on corris 1' a sprint i descansiss 5'. Cada setmana
                augmenta el temps del sprint. Això ajuda a hipertrofiar el cor i
                augmentar la resistència pulmonar.
              </p>
            </div>

            {/* Consell 2 */}
            <div className="border rounded-lg p-4 hover:shadow-md transition">
              <h3 className="font-medium text-red-600 mb-2">
                💪 Press de banca
              </h3>
              <p className="text-zinc-700">
                Entrena amb més pes que el que demana la prova, d'aquesta manera
                familiaritzaràs molt ràpid el pes. Recorda fer bona tècnica:
                peus esputjen al terra, retracció d'espatlles, cul fixe a la
                banca i inclinació de la columna.
              </p>
            </div>

            {/* Consell 3 */}
            <div className="border rounded-lg p-4 hover:shadow-md transition">
              <h3 className="font-medium text-red-600 mb-2">🧲 Dummy</h3>
              <p className="text-zinc-700">
                Treballa traccions pesades (deadlift, farmer walk) fes sèries
                només d'anada amb lastre.
              </p>
            </div>

            {/* Consell 4 */}
            <div className="border rounded-lg p-4 hover:shadow-md transition">
              <h3 className="font-medium text-red-600 mb-2">
                ⚡ Circuit d’agilitat
              </h3>
              <p className="text-zinc-700">
                El circuit es millora fent-lo. Però pots millorar l'equilibri,
                la rapidesa als canvis de sentit i la potència fent pliomètrics.
              </p>
            </div>

            {/* Consell 5 */}
            <div className="border rounded-lg p-4 hover:shadow-md transition">
              <h3 className="font-medium text-red-600 mb-2">🏊 Natació</h3>
              <p className="text-zinc-700">
                No es una prova difícil, simplement es recomanable nedar i estar
                familiaritzat amb el recorregut de la piscina.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
