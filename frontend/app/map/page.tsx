import Map from "@/components/map/Map";

const mockLocais = [
  {
    id: 1,
    name: "Esquenta Universitário (Perto da UFRN)",
    latitude: -5.8324, 
    longitude: -35.2054,
    category: "bar"
  },
  {
    id: 2,
    name: "Samba histórico",
    latitude: -5.7808,
    longitude: -35.2023,
    category: "cultural"
  },
  {
    id: 3,
    name: "Cervejaria Artesanal",
    latitude: -5.7891,
    longitude: -35.1972,
    category: "restaurante"
  },
  {
    id: 4,
    name: "Balada Fim de Noite",
    latitude: -5.8795,
    longitude: -35.1768,
    category: "balada"
  }
];

export default function MapPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="p-4 text-xl font-semibold">Mapa</header>
      <section className="flex-1">
        <Map locais={mockLocais} />
      </section>
    </main>
  );
}
