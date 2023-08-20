"use client"

import { FC, useEffect, useState } from "react"
import { Button } from "./Button"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"

interface ImageUploadProps {
  disabled?: boolean
  onChange: (url: string) => void
  onRemove: (url: string) => void
  value: string[]
}

const ImageUpload: FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
  disabled,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)

    if (!isMounted) {
      return null
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url, index) => (
          <div
            key={index}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                variant="destructive"
                size="icon"
                type="button"
                onClick={() => onRemove(url)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" src={url} alt="Image" />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="fvct1z9z">
        {({ open }) => {
          const onClick = () => {
            open()
          }
          return (
            <Button
              type="button"
              variant="secondary"
              disabled={disabled}
              onClick={onClick}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Add Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </>
  )
}

export default ImageUpload
