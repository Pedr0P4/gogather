"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { GroupData } from "@/app/types";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function GroupInfoSection({ groupId }: { groupId: string }) {
  const { data: group, isLoading } = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      const res = await api.get<GroupData>(`/groups/${groupId}`);
      return res.data;
    },
    enabled: !!groupId,
  });

  if (isLoading) {
    return <div className="animate-pulse h-24 bg-gray-100 rounded-md"></div>;
  }

  if (!group) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold text-gray-900">{group.name}</h2>
      <p className="text-sm text-gray-500 leading-relaxed">
        {group.description || "Sem descrição disponível."}
      </p>
      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
        <Calendar className="w-4 h-4" />
        <span>
          {group.eventDate ? format(new Date(group.eventDate), "EEEE, d 'de' MMMM '•' HH'h'", { locale: ptBR }) : 'Data não definida'}
        </span>
      </div>
    </div>
  );
}
