"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { GroupData } from "@/app/types";

export function GroupParticipantsSection({ groupId }: { groupId: string }) {
  const { data: group, isLoading } = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      const res = await api.get<GroupData>(`/groups/${groupId}`);
      return res.data;
    },
    enabled: !!groupId,
  });

  if (isLoading || !group) {
    return (
      <div>
        <h3 className="text-xs font-bold text-gray-500 mb-4 tracking-wider">PARTICIPANTES</h3>
        <div className="flex flex-col gap-3 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const members = group.members || [];

  return (
    <div>
      <h3 className="text-xs font-bold text-gray-500 mb-4 tracking-wider">
        PARTICIPANTES ({members.length})
      </h3>
      <div className="flex flex-col gap-3">
        {members.map((member) => {
          const nameToUse = member.displayName || member.username || 'U';
          const initials = nameToUse.substring(0, 2).toUpperCase();
          
          return (
            <div key={member.memberExternalId} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gg-cyan-extralight text-gg-cyan-dark flex items-center justify-center text-xs font-bold shrink-0">
                {initials}
              </div>
              <span className="text-sm font-medium text-gray-700 truncate">
                {nameToUse}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
