"use client"

import { FC, use, useEffect, useState } from "react"
import Modal from "../Modal"
import { Button } from "../Button"

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

const AlertModal: FC<AlertModalProps> = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <Modal
        title="Orpavdu si přejete provést tuto akci?"
        isOpen={isOpen}
        description="Tato akce je nevratná."
        onClose={onClose}
      >
        <div className="pt-6 space-x-2 flex item-center justify-end w-full">
          <Button disabled={loading} variant="outline" onClick={onClose}>
            Zrušit
          </Button>
          <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            Pokračovat
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default AlertModal
