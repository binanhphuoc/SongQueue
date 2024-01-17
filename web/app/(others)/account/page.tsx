'use client'

import { useEffect, useState } from 'react'
import {
  ImageUploadStatus,
  useProfileImageUpload,
} from './ProfileImageUploadHook'
import { allowedFileTypes } from '@/app/_services/storage/@types'

export default function Page() {
  const [file, setFile] = useState<File | null>(null)
  const [status, uploadImage, url, error] = useProfileImageUpload()

  useEffect(() => {
    if (status == ImageUploadStatus.SUCCESS) {
      setFile(null)
    }
  }, [status])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    uploadImage(file!)
  }

  return (
    <div>
      <h1>Upload a File to S3</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="file"
          type="file"
          onChange={(e) => {
            const files = e.target.files
            if (files) {
              setFile(files[0])
            }
          }}
          accept={allowedFileTypes.join(',')}
        />
        <button
          type="submit"
          disabled={status == ImageUploadStatus.PENDING || !file}
        >
          Upload
        </button>
      </form>
    </div>
  )
}
