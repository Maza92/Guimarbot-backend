// import { CreateEmailOptions, Resend } from 'resend'

// interface SendEmailOptions {
//   // from: string
//   to: string | string[]
// }

// export const resendConfig = () => ({
//   apiKey: process.env.RESEND_API_kEY,
// })

// const resend = new Resend(resendConfig().apiKey)

// export const sendEmail = async ({ to }: SendEmailOptions) => {
//   const toUsers = typeof to === 'string' ? [to] : to

//   const emailOptions: CreateEmailOptions = {
//     from: process.env.MAIL_USER,
//     to: toUsers,
//     subject: 'Confirmación de asociación',
//     html: '<p>it works!</p>',
//   }

//   await resend.emails.send(emailOptions)
// }
