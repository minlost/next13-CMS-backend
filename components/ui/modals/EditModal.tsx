"use client"

import { FC, use, useEffect, useState } from "react"
import Modal from "../Modal"
import { Button } from "../Button"

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  loading: boolean
  children?: React.ReactNode
  description: string
  title: string
}

const EditModal: FC<AlertModalProps> = ({
  isOpen,
  loading,
  onClose,
  children,
  description,
  title,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <Modal
        title={title}
        isOpen={isOpen}
        description={description}
        onClose={onClose}
      >
        <div className="pt-6 space-x-2 flex flex-col w-full">
          {children}
          <div className="flex justify-center gap-5 mt-5"></div>
        </div>
      </Modal>
    </>
  )
}

export default EditModal
