import { ReactNode } from "react"

interface CardProps {
  className?: string
  children: ReactNode
}

const Card = ({ className = "", children }: CardProps) => {

  return (
    <div className={`bg-card z-1 shadow-lg rounded-xl w-[min(400px,100vw)] p-7 m-6 flex flex-col gap-4 ${className}`}>
      {children}
    </div>
  )
}

export default Card