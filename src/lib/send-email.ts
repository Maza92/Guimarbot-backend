import { CreateEmailOptions, Resend } from 'resend'

interface SendEmailOptions {
  to: string | string[]
  host: string
  token: string
}

export const resendConfig = () => ({
  apiKey: process.env.RESEND_API_kEY,
})

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({ to, host, token }: SendEmailOptions) => {
  const toUsers = typeof to === 'string' ? [to] : to

  const emailOptions: CreateEmailOptions = {
    from: process.env.MAIL_USER,
    to: toUsers,
    subject: 'Confirmación de asociación',
    html: `
      <h1>Nueva invatación</h1>
      
      <a href="${host}/verifation/${token}/accept">Accept invation</a>
    `,
  }

  await resend.emails.send(emailOptions)
}
