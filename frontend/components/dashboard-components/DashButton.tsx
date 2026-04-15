import React, { ElementType } from "react";
import { Button } from "../ui/button";

interface DashButtonProps {
  children: React.ReactNode;
  variant: 'dark' | 'light' | 'emerald' | 'red' | 'cyan' | 'beige';
  className?: string;
  Icon?: ElementType;
}

const variants = {
  dark: 'bg-zinc-800 hover:bg-zinc-950 text-zinc-50',
  light: 'bg-zinc-50 hover:bg-zinc-200 text-zinc-800',
  emerald: 'bg-emerald-500 hover:bg-emerald-600 text-zinc-50',
  red: 'bg-gg-red hover:bg-gg-red-dark text-zinc-50',
  cyan: 'bg-gg-cyan hover:bg-gg-cyan-dark text-zinc-50',
  beige: 'bg-gg-beige-midlight hover:bg-gg-beige-light text-gg-beige-extradark'
}

export function DashButton({ children, variant, className, Icon }: DashButtonProps) {
  return (
    <Button className={`hover:cursor-pointer shadow ${variants[variant]} ${className}`}>
      {Icon && <Icon className='w-3 h-3'/>}
      {children}
    </Button>
  )
}
