import { Plus, Sparkles, Map, MapPin, CalendarDays, Ticket, Users } from 'lucide-react';
import { Header } from '@/components/area-components/Header';
import { SubHeader } from '@/components/area-components/SubHeader';
import { HeaderButton } from '@/components/area-components/HeaderButton';
import { InfoCards } from '@/components/area-components/InfoCards';
import { ActionCard } from '@/components/area-components/ActionCard';
import { Empty } from '@/components/area-components/Empty';

export default function DashboardHome() {
  return (
    <div className="max-w-6xl mx-auto pt-4 md:pt-6 pb-12">
      {/* header */}
      <div className="flex justify-between items-center mb-8">
        <Header description='Acompanhe seus eventos e convites pendentes'>Visão Geral</Header>
        <HeaderButton variant='red' Icon={Plus}>Novo Rolê</HeaderButton>
      </div>
      {/* cards de stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <InfoCards info='0' color='cyan' Icon={CalendarDays}>Próximos Rolês</InfoCards>
        <InfoCards info='0' color='red' Icon={Ticket}>Convites Pendentes</InfoCards>
        <InfoCards info='12' color='beige' Icon={Users}>Amigos na rede</InfoCards>
      </div>
      {/* ações rápidas */}
      <div className="mb-12">
        <SubHeader className='mb-4'>Ações rápidas</SubHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <ActionCard title='Criar com IA' footer='Gerar roteiro mágico →' color='cyan' Icon={Sparkles}>
            Deixe a magia acontecer! Diga a vibe da galera e nós sugerimos os melhores lugares e roteiros.
          </ActionCard>

          <ActionCard title='Criar Manualmente' footer='Montar roteiro do zero →' color='red' Icon={MapPin} href='/group/create'>
            Você no controle! Escolha os locais, defina a data, trace a rota e convide seus amigos.
          </ActionCard>

        </div>
      </div>
      {/* lista de eventos */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <SubHeader>Próximos encontros</SubHeader>
          <button className="text-sm font-bold text-[#458588] hover:underline">Ver histórico</button>
        </div>
        <Empty title='Nenhum encontro agendado.' Icon={CalendarDays}>
          Crie um novo rolê acima para começar a preencher sua agenda.
        </Empty>
      </div>

    </div>
  );
}
