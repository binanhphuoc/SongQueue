import { requestProfileImageUploadLink } from "@/app/_services/storage"
import { useState } from "react"

export enum ImageUploadStatus {
  IDLE,
  PENDING,
  SUCCESS,
  FAILED,
}

type ImageUploadResponse = [
  ImageUploadStatus,
  (file: File) => void,
  string?,
  Error?,
]

/**
 *
 * @param file the file to upload
 *
 * @returns [status, uploadImage, url, error]
 */
export function useProfileImageUpload(): ImageUploadResponse {
  const [status, setStatus] = useState(ImageUploadStatus.IDLE)
  const responseData: { url?: string; error?: Error } = {}

  function uploadImage(file: File) {
    setStatus(ImageUploadStatus.PENDING)
    requestProfileImageUploadLink(file.type)
      .then(({ url, fields }) => {
        const formData = new FormData()
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string)
        })
        formData.append("file", file)

        return fetch(url, {
          method: "POST",
          body: formData,
        })
      })
      .then((uploadResponse) => {
        if (uploadResponse.ok) {
          setStatus(ImageUploadStatus.SUCCESS)
        } else {
          throw new Error(uploadResponse.statusText)
        }
      })
      .catch((e: Error) => {
        responseData.error = e
        setStatus(ImageUploadStatus.FAILED)
      })
  }

  return [status, uploadImage, responseData.url, responseData.error]
}
