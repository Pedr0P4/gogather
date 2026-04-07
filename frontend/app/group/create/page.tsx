"use client";

import { EventFormData, EventStop, Step } from "@/app/types";
import { Step1Info } from "@/components/create-group/Step1Info";
import { Step2Map } from "@/components/create-group/Step2Map";
import StepIndicator from "@/components/create-group/StepIndicator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function CreateRolePage() {
  const [step, setStep] = useState<Step>(1);

  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    date: "",
    description: "",
  });

  const [stops, setStops] = useState<EventStop[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className=" h-screen bg-[#fbf2c7]/30 flex flex-col font-sans text-gray-900">
      <header className="w-full bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between">
          {step === 1 ? (
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group"
            >
              <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                Voltar ao Início
              </span>
            </Link>
          ) : (
            <button
              onClick={() => setStep((prev) => (prev - 1) as Step)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group"
            >
              <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight">Voltar</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-4 text-sm font-bold text-gray-400">
              <StepIndicator current={step} />
          </div>
        </div>  
      </header>

      <section
        className={`flex-1 w-full flex flex-col ${
          step === 2
            ? "h-[calc(100vh-73px)] overflow-hidden"
            : "max-w-7xl mx-auto p-6 items-center justify-center"
        }`}
      >
        {step === 1 && (
          <Step1Info
            formData={formData}
            handleInputChange={handleInputChange}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <Step2Map 
              stops={stops} 
              setStops={setStops} 
              onBack={() => setStep(1)} 
              onNext={() => setStep(3)} 
            />
        )}

        {step === 3 && (
          <div className="w-full text-center">
            <h1 className="text-3xl font-bold">Etapa 3</h1>
          </div>
        )}
      </section>
    </main>
  );
}
