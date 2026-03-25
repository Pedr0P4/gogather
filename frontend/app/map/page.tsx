import Map from "@/components/map/Map";

export default function MapPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="p-4 text-xl font-semibold">Mapa</header>
      <section className="flex-1">
        <Map />
      </section>
    </main>
  );
}
