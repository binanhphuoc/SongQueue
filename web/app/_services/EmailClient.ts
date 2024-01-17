import Mailgun, { MessagesSendResult } from "mailgun.js"
import formData from "form-data"

const mailgun = new Mailgun(formData)
const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY!,
})

export async function sendEmailWithText(
  toEmail: string | string[],
  subject: string,
  text: string
): Promise<MessagesSendResult> {
  return client.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: "SongQueue Team <hello@songqueue.com>",
    to: toEmail,
    subject,
    text,
  })
}
