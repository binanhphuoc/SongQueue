'use server'

import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'
import { allowedFileTypes } from './@types'

const client = new S3Client({
  endpoint: process.env.S3_ENDPOINT!,
  forcePathStyle: true,
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!, // Access key pair. You can create access key pairs using the control panel or API.
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!, // Secret access key defined through an environment variable.
  },
})

export async function requestProfileImageUploadLink(
  fileType: string
): Promise<{ url: string; fields: Record<string, string> }> {
  if (!allowedFileTypes.includes(fileType)) {
    throw 'Not supported file type'
  }

  // .. Must authenticate to get userid
  const userid = '123'

  return createPresignedPost(client, {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: `profile/${userid}/${uuidv4()}`,
    Conditions: [
      ['content-length-range', 0, 10485760], // up to 10 MB
      ['starts-with', '$Content-Type', fileType],
    ],
    Fields: {
      acl: 'public-read',
      'Content-Type': fileType,
    },
    Expires: 600, // Seconds before the presigned post expires. 3600 by default.
  })
    .then(({ url, fields }) => {
      return { url, fields }
    })
    .catch((e) => {
      throw Error(e)
    })
}
