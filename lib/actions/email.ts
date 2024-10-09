import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(email: string, token: string) {
  const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL}/confirm-email?token=${token}`;
  try {
    const data = await resend.emails.send({
      from: "Kiathagana <no-reply@kiathagana.com>",
      to: email,
      subject: "Confirm your email",
      html: `
         <h1>Confirm your email</h1>
        <p>Please click the link below to confirm your email address:</p>
        <a href="${confirmationLink}">Confirm Email</a>
        <p>If you didn't sign up for our service, you can safely ignore this email.</p>
        `,
    });
    console.log("Email Sent Succesfully", data);
  } catch (error) {
    console.log("Error sending email:", error);
    throw new Error("Failed to send confirmation email");
  }
}
