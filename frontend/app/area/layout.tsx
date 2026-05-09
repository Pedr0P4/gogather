import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fbf1c7] font-sans">


      <div className="flex">
        <Sidebar />

        {/* area de conteúdo principal onde as páginas vao renderizadas */}
        <main className="flex-1 ml-64 p-8"> {/* ml-64 para dar espaço para a Sidebar fixa */}
          {children}
        </main>
      </div>
    </div>
  );
}
