import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { to, from, subject, html } = req.body;
      const data = await resend.emails.send({
        from,
        to,
        subject,
        html,
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
