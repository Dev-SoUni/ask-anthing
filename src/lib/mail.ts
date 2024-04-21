import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
})

export const sendEmailVerificationTokenEmail = async ({
  to,
  token,
}: {
  to: string
  token: string
}) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/email-verification?token=${token}`

  await transporter.sendMail({
    from: "Ask Anything",
    to,
    subject: "당신의 이메일을 인증하세요.",
    html: `<p>본인임을 인증하려면 <a href="${confirmLink}">여기</a>를 클릭해주세요.</p>`,
  })
}
