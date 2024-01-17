import formData from 'form-data'
import Mailgun, { MessagesSendResult } from 'mailgun.js'
const mailgun = new Mailgun(formData)
const client = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY!,
})

export async function sendEmailWithText(
  toEmail: string | string[],
  subject: string,
  text: string
): Promise<MessagesSendResult> {
  return client.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: 'Just#Kudo Team <hello@justkudo.com>',
    to: toEmail,
    subject,
    text,
  })
}
