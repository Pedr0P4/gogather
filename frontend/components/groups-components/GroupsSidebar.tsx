"use client"

import { GroupSimpleData } from "@/app/types"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Search, Plus } from "lucide-react"
import { useState } from "react"

interface GroupsSidebarProps {
  selectedGroupId?: string | null;
  onSelectGroup?: (id: string) => void;
}

export function GroupsSidebar({ selectedGroupId, onSelectGroup }: GroupsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const {data: groups, isLoading} = useQuery({
    queryKey: ['groups-list'],
    queryFn: async () => {
      const res = await api.get<GroupSimpleData[]>('/groups');
      return res.data;
    }
  })

  const avatarColors = [
    'bg-gg-cyan text-white',
    'bg-gg-red text-white',
    'bg-gg-beige-extradark text-white',
    'bg-blue-600 text-white',
    'bg-purple-600 text-white',
  ];

  const filteredGroups = groups?.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="h-full w-full bg-gg-beige-extralight flex flex-col p-4 border-r border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-xl text-gray-900">Meus Rolês</h1>
        <button className="p-1 hover:bg-gg-beige-light rounded-md transition-colors text-gray-500">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="relative mb-6">
        <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${searchQuery ? 'text-gg-cyan' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Buscar rolê..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gg-cyan/20 focus:border-gg-cyan transition-all"
        />
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-1 -mr-1">
        {isLoading ? (
          <div className="animate-pulse flex flex-col gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-gg-beige-light"></div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-4 bg-gg-beige-light rounded w-24"></div>
                  <div className="h-3 bg-gg-beige-light rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredGroups && filteredGroups.length > 0 ? (
          filteredGroups.map((group, index) => {
            const eventDate = new Date(group.eventDate);
            const day = String(eventDate.getDate()).padStart(2, '0');
            const month = String(eventDate.getMonth() + 1).padStart(2, '0');
            const hour = String(eventDate.getHours()).padStart(2, '0');
            const minute = String(eventDate.getMinutes()).padStart(2, '0');

            const isSelected = selectedGroupId === group.externalId;
            const initials = group.name.substring(0, 1).toUpperCase();
            const colorIndex = group.externalId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % avatarColors.length;
            const colorClass = avatarColors[colorIndex];

            return (
              <div
                key={group.externalId}
                onClick={() => onSelectGroup?.(group.externalId)}
                className={`
                  relative flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all duration-200
                  ${isSelected ? 'bg-white shadow-sm ring-1 ring-gray-100' : 'hover:bg-white/50'}
                `}
              >
                {isSelected && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gg-cyan rounded-r-full" />
                )}

                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 ${colorClass} ${isSelected ? 'ml-1' : ''} transition-all`}>
                  {initials}
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className={`font-semibold truncate text-sm ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                    {group.name}
                  </h2>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {`${day}/${month} às ${hour}:${minute}`}
                    <span className="mx-1.5 opacity-40">•</span>
                    {`${group.memberAmount} ${group.memberAmount > 1 ? 'participantes' : 'participante'}`}
                  </p>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center text-gray-400 text-sm py-4">
            Nenhum rolê encontrado.
          </div>
        )}
      </div>
    </aside>
  )
}
