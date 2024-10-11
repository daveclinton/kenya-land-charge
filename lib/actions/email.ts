import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(
  email: string,
  token: string,
  fullName: string
) {
  const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL}/confirm-email?token=${token}`;
  try {
    const data = await resend.emails.send({
      from: "Kiathagana <no-reply@kiathagana.com>",
      to: email,
      subject: "Confirm your email",
      html: `
          <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email - Kiathagana Financial LLC</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; border-radius: 5px;">
              <tr>
                  <td style="padding: 40px 20px; text-align: center;">
                      <h1 style="color: #1a5f7a; margin-bottom: 20px;">Kiathagana Financial LLC</h1>
                      <h2 style="color: #2c3e50;">Verify Your Email Address</h2>
                      <p style="font-size: 18px; margin-bottom: 20px;">Dear ${fullName},</p>
                      <p style="font-size: 16px; margin-bottom: 30px;">Welcome to Kiathagana Financial LLC! We're excited to have you on board. To complete your registration and ensure the security of your account, please verify your email address by clicking the button below:</p>
                      <a href="${confirmationLink}" style="background-color: #1a5f7a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin-bottom: 30px;">Verify Email</a>
                      <p style="font-size: 14px; color: #666666;">If you didn't create an account with us, please disregard this email.</p>
                  </td>
              </tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                  <td style="padding: 20px 0; text-align: center; font-size: 14px; color: #666666;">
                      <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
                      <p style="word-break: break-all;">${confirmationLink}</p>
                  </td>
              </tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; border-top: 1px solid #dddddd;">
              <tr>
                  <td style="padding: 20px 0; text-align: center; font-size: 12px; color: #888888;">
                      <p>&copy; 2023 Kiathagana Financial LLC. All rights reserved.</p>
                      <p>123 Financial Street, Suite 456, Nairobi, Kenya</p>
                      <p>Phone: +254 123 456 789 | Email: support@kiathaganafinancial.com</p>
                  </td>
              </tr>
          </table>
      </body>
      </html>
        `,
    });
    console.log("Email Sent Succesfully", data);
  } catch (error) {
    console.log("Error sending email:", error);
    throw new Error("Failed to send confirmation email");
  }
}
