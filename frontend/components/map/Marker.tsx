import { Beer, Building2, LucideIcon, MapPin, Music, Utensils } from 'lucide-react';

interface MarkerRoleProps {
    name: string;
    category: string;
}

const categoriasConfig: Record<string, { color: string; icon: LucideIcon }> = {
    bar: { color: "bg-amber-500", icon: Beer },
    balada: { color: "bg-purple-600", icon: Music },
    restaurante: { color: "bg-emerald-600", icon: Utensils },
    cultural: { color: "bg-sky-600", icon: Building2 },
    default: { color: "bg-gray-500", icon: MapPin },
};

const MarkerRole = ({ name, category }: MarkerRoleProps) => {
    const { color, icon: Icon } = categoriasConfig[category] || categoriasConfig.default;

    return (
        <div className="group relative flex h-14 w-14 cursor-pointer items-center justify-center transition-transform hover:scale-110 active:scale-95">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full border-4 border-white ${color} text-2xl shadow-xl`}>
                <Icon className="h-6 w-6 text-white stroke-[2.5]" />
            </div>
            <div className={`absolute bottom-0 h-4 w-4 rotate-45 transform ${color} -z-10`}></div>
        </div>
    );
};

export default MarkerRole;