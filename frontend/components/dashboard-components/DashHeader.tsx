import React from "react"

interface DashHeaderProps {
  children: React.ReactNode,
  className?: string,
  description?: string
}

export function DashHeader({ children, className, description = "" } : DashHeaderProps) {
  return (
    <div className={className}>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{children}</h1>
      { description.trim() !== "" && <p className="text-gray-600 mt-2 text-lg">{description}</p>}
    </div>
  )
}
