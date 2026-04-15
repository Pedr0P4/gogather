import React from "react"

interface DashSubHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DashSubHeader({ children, className }: DashSubHeaderProps) {
  return (
    <h2 className={`text-xl font-bold text-gray-900 ${className}`}>{children}</h2>
  )
}
