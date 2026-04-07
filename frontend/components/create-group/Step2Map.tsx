import { EventStop } from "@/app/types";
import Map from "@/components/map/Map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, MapPin, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface Step2MapProps {
  stops: EventStop[];
  setStops: React.Dispatch<React.SetStateAction<EventStop[]>>;
  onBack: () => void;
  onNext: () => void;
}

export function Step2Map({ stops, setStops, onBack, onNext }: Step2MapProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const moveStop = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === stops.length - 1) return;

    const newStops = [...stops];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newStops[index], newStops[targetIndex]] = [newStops[targetIndex], newStops[index]];
    
    setStops(newStops);
  };

  const removeStop = (id: string) => {
    setStops(stops.filter(stop => stop.id !== id));
  };

  const handleAddMockLocation = () => {
    const newStop: EventStop = {
      id: crypto.randomUUID(),
      name: searchTerm || "Novo Local Adicionado",
      latitude: -5.83 + (Math.random() * 0.02 - 0.01),
      longitude: -35.20 + (Math.random() * 0.02 - 0.01),
      category: "bar",
      time: "20:00"
    };
    setStops([...stops, newStop]);
    setSearchTerm("");
  };

  const locaisForMap = stops.map((stop, index) => ({
    id: index,
    name: stop.name,
    time: stop.time || "A definir",
    latitude: stop.latitude,
    longitude: stop.longitude,
    category: stop.category || "default"
  }));

  return (
    <div className="w-full h-full flex flex-col md:flex-row animate-in fade-in duration-500">
      
      <div className="w-full md:w-[420px] h-full flex flex-col bg-white border-r border-gray-200 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.05)]">
        
        <div className="p-6 border-b border-gray-100 bg-white flex-shrink-0">
          <h2 className="text-2xl font-bold mb-1 text-gray-900">Defina a Rota</h2>
          <p className="text-gray-500 mb-6 text-sm">Busque e ordene as paradas do rolê.</p>
          
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gg-cyan pointer-events-none z-10" />
            
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: Bar do Zé, Restaurante..."
              className="w-full pl-12 pr-14 py-7 bg-white border-gray-200 focus-visible:ring-2 focus-visible:ring-[#458588] focus-visible:border-[#458588] rounded-xl text-base shadow-inner transition-all"
            />

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleAddMockLocation}
              disabled={!searchTerm.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-[#458588] hover:text-[#346b6e] hover:bg-[#458588]/10 disabled:opacity-30 rounded-lg transition-all"
            >
              <Plus className="w-6 h-6" strokeWidth={3} />
              <span className="sr-only">Adicionar local</span>
            </Button>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-3 bg-white overflow-y-auto">
          {stops.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <MapPin className="w-12 h-12 mb-2 opacity-30" />
              <p className="text-sm font-medium">Nenhuma parada adicionada.</p>
            </div>
          ) : (
            stops.map((stop, index) => (
              <div key={stop.id} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-[#458588]/40 transition-all group">
                
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => moveStop(index, "up")} 
                    disabled={index === 0} 
                    className="text-gray-300 hover:text-[#458588] disabled:opacity-10 transition-colors"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => moveStop(index, "down")} 
                    disabled={index === stops.length - 1} 
                    className="text-gray-300 hover:text-[#458588] disabled:opacity-10 transition-colors"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-shrink-0 w-8 h-8 bg-[#cc241a] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 leading-tight truncate">
                    {stop.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {stop.time || "Horário a definir"}
                  </div>
                </div>

                <button 
                  onClick={() => removeStop(stop.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex-shrink-0 mt-auto z-20 p-6 border-t border-gray-200 bg-white flex gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
          <Button 
            variant="outline"
            onClick={onBack}
            className="px-4 py-6 text-gray-600 border-gray-200 hover:bg-gray-50 rounded-xl font-bold"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={onNext}
            disabled={stops.length === 0}
            className="flex-1 py-6 bg-[#cc241a] hover:bg-[#a81d15] disabled:bg-gray-300 text-white font-bold rounded-xl shadow-md transition-all text-lg"
          >
            Finalizar <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

      </div>

      <div className="flex-1 bg-gray-200 relative h-[50vh] md:h-full">
        <Map locais={locaisForMap} />
      </div>

    </div>
  );
}