import { cn } from "@/lib/utils"
import React, { FC } from "react"

interface HeadingProps {
  title: string
  description: string
  children?: React.ReactNode
  className?: string
}

const Heading: FC<HeadingProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tighter">{title}</h2>
      <p className={cn("text-sm text-muted-foreground", className)}>
        {description}
      </p>
    </div>
  )
}

export default Heading
