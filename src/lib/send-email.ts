import { CreateEmailOptions, Resend } from 'resend'

interface SendEmailOptions {
  // from: string
  to: string | string[]
}

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({ to }: SendEmailOptions) => {
  const toUsers = typeof to === 'string' ? [to] : to

  const emailOptions: CreateEmailOptions = {
    from: process.env.MAIL_USER,
    to: toUsers,
    subject: 'Confirmación de asociación',
    html: '<p>it works!</p>',
  }

  await resend.emails.send(emailOptions)
}
