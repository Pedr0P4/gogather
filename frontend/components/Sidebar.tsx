"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Users, Compass, Mail, Settings, LayoutDashboard } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Visão Geral", icon: LayoutDashboard, href: "dashboard" },
    { name: "Meus Rolês", icon: Map, href: "roles" },
    { name: "Amigos", icon: Users, href: "friends" },
    { name: "Explorar IA", icon: Compass, href: "explore" },
    { name: "Convites", icon: Mail, href: "invites" },
  ];
  return (
    <aside className="w-64 fixed left-0 top-[80px] h-[calc(100vh-80px)] bg-white border-r border-gray-100 shadow-sm flex flex-col justify-between py-6 z-40">
      <div className="px-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href; //faz a verificação se a rota atual é a do item

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                isActive
                  ? 'bg-[#fbf2c7] text-[#cc241a]'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-[#458588]'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
      {/* rodapé de configurações */}
      <div className="px-4">
        <Link
          href="/dashboard/configuracoes"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
            pathname === "/dashboard/configuracoes"
              ? 'bg-[#fbf2c7] text-[#cc241a]'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Settings className="w-5 h-5" />
          Configurações
        </Link>
      </div>
    </aside>
  );
}
