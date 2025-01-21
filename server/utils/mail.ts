import { ServerClient } from "postmark";

if (!process.env.POSTMARK_SERVER_TOKEN) {
  throw new Error("POSTMARK_SERVER_TOKEN environment variable must be set");
}

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

interface EmailParams {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(params: EmailParams): Promise<boolean> {
  try {
    await client.sendEmail({
      From: "contact@bugboom.com",
      To: "tech@sreeramvasanth.com",
      Subject: `New Contact Form Submission from ${params.name}`,
      HtmlBody: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${params.name}</p>
        <p><strong>Email:</strong> ${params.email}</p>
        <p><strong>Message:</strong></p>
        <p>${params.message}</p>
      `,
      TextBody: `
        New Contact Form Submission
        Name: ${params.name}
        Email: ${params.email}
        Message: ${params.message}
      `,
      MessageStream: "outbound"
    });
    return true;
  } catch (error) {
    console.error('Postmark email error:', error);
    return false;
  }
}
