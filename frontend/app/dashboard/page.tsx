import { Plus, Sparkles, Map, MapPin, CalendarDays, Ticket, Users } from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="max-w-6xl mx-auto pt-4 md:pt-6 pb-12">
      {/* header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Visão Geral</h1>
          <p className="text-gray-600 mt-2 text-lg">Acompanhe seus eventos e convites pendentes.</p>
        </div>
        
        <button className="bg-[#cc241a] text-white px-6 py-3 rounded-full font-bold hover:bg-[#a81d15] hover:-translate-y-1 transition-all shadow-md flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Novo Rolê
        </button>
      </div>
      {/* cards de stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#458588]/10 text-[#458588] rounded-full flex items-center justify-center">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Próximos Rolês</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#cc241a]/10 text-[#cc241a] rounded-full flex items-center justify-center">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Convites Pendentes</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#fbf2c7] text-[#b38b12] rounded-full flex items-center justify-center border border-[#f5eabc]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Amigos na Rede</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>
      </div>
      {/* ações rápidas */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* opção de criar com IA */}
          <button className="bg-white p-8 rounded-3xl shadow-sm border-2 border-transparent hover:border-[#458588] transition-all text-left group">
            <div className="w-14 h-14 bg-[#458588] text-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Criar com IA</h3>
            <p className="text-gray-500 mb-6 line-clamp-2">
              Deixe a magia acontecer. Diga a vibe da galera e nós sugerimos os melhores lugares e roteiros.
            </p>
            <span className="text-[#458588] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
              Gerar roteiro mágico →
            </span>
          </button>

          {/* opção de criar manualmente (futuramente poderá ser trocado por visualizar o mapa) */}
          <button className="bg-white p-8 rounded-3xl shadow-sm border-2 border-transparent hover:border-[#cc241a] transition-all text-left group">
            <div className="w-14 h-14 bg-[#cc241a] text-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Criar Manualmente</h3>
            <p className="text-gray-500 mb-6 line-clamp-2">
              Você no controle. Escolha os locais, defina a data, trace a rota e convide seus amigos.
            </p>
            <span className="text-[#cc241a] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
              Montar roteiro do zero →
            </span>
          </button>

        </div>
      </div>
      {/* lista de eventos */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Próximos Encontros</h2>
          <button className="text-sm font-bold text-[#458588] hover:underline">Ver histórico</button>
        </div>
        <div className="bg-white/40 border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
          <CalendarDays className="w-10 h-10 text-gray-400 mb-3" />
          <p className="text-gray-600 font-medium">Nenhum encontro agendado.</p>
          <p className="text-gray-400 text-sm mt-1">Crie um novo rolê acima para começar a preencher sua agenda.</p>
        </div>
      </div>
      
    </div>
  );
}