import { Plus, Sparkles, Map, MapPin, CalendarDays, Ticket, Users } from 'lucide-react';
import { DashHeader } from '@/components/dashboard-components/DashHeader';
import { DashSubHeader } from '@/components/dashboard-components/DashSubHeader';
import { DashHeaderButton } from '@/components/dashboard-components/DashHeaderButton';
import { DashInfoCards } from '@/components/dashboard-components/DashInfoCards';
import { DashActionCard } from '@/components/dashboard-components/DashActionCard';
import { DashEmpty } from '@/components/dashboard-components/DashEmpty';
import Link from 'next/link';

export default function DashboardHome() {
  return (
    <div className="max-w-6xl mx-auto pt-4 md:pt-6 pb-12">
      {/* header */}
      <div className="flex justify-between items-center mb-8">
        <DashHeader description='Acompanhe seus eventos e convites pendentes'>Visão Geral</DashHeader>
        <DashHeaderButton variant='red' Icon={Plus}>Novo Rolê</DashHeaderButton>
      </div>
      {/* cards de stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <DashInfoCards info='0' color='cyan' Icon={CalendarDays}>Próximos Rolês</DashInfoCards>
        <DashInfoCards info='0' color='red' Icon={Ticket}>Convites Pendentes</DashInfoCards>
        <DashInfoCards info='12' color='beige' Icon={Users}>Amigos na rede</DashInfoCards>
      </div>
      {/* ações rápidas */}
      <div className="mb-12">
        <DashSubHeader className='mb-4'>Ações rápidas</DashSubHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <DashActionCard title='Criar com IA' footer='Gerar roteiro mágico →' color='cyan' Icon={Sparkles}>
            Deixe a magia acontecer! Diga a vibe da galera e nós sugerimos os melhores lugares e roteiros.
          </DashActionCard>

          <DashActionCard title='Criar Manualmente' footer='Montar roteiro do zero →' color='red' Icon={MapPin} href='/group/create'>
            Você no controle! Escolha os locais, defina a data, trace a rota e convide seus amigos.
          </DashActionCard>

        </div>
      </div>
      {/* lista de eventos */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <DashSubHeader>Próximos encontros</DashSubHeader>
          <button className="text-sm font-bold text-[#458588] hover:underline">Ver histórico</button>
        </div>
        <DashEmpty title='Nenhum encontro agendado.' Icon={CalendarDays}>
          Crie um novo rolê acima para começar a preencher sua agenda.
        </DashEmpty>
      </div>

    </div>
  );
}
