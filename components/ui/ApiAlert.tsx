"use client"

import { FC } from "react"
import { Alert, AlertDescription, AlertTitle } from "./Alert"
import { Copy, ServerIcon } from "lucide-react"
import { Badge, BadgeProps } from "./Badge"
import { Button } from "./Button"
import { useToast } from "@/hooks/useToast"

interface ApiAlertProps {
  title: string
  description: string
  variant: "public" | "admin"
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "public",
  admin: "admin",
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
}

const ApiAlert: FC<ApiAlertProps> = ({
  description,
  title,
  variant = "public",
}) => {
  const { toast } = useToast()

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description)
    toast({
      title: "Copied",
      description: "Copied to clipboard",
    })
  }

  return (
    <Alert>
      <ServerIcon className="w-6 h-6 " />
      <AlertTitle className="flex items-center gap-x-2">
        <Badge variant={variantMap[variant]}> {textMap[variant]} </Badge>
        {title}
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] text-mono text-sm font-semibold">
          {description}
        </code>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onCopy(description)}
        >
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}

export default ApiAlert
