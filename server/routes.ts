import type { Express } from "express";
import { createServer, type Server } from "http";
import { sendContactEmail } from "./utils/mail";

export function registerRoutes(app: Express): Server {
  // Contact form submission endpoint
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
      const emailSent = await sendContactEmail({ name, email, message });

      if (!emailSent) {
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to send email notification. Please try again.' 
        });
      }

      // Log the submission and return success
      console.log('Contact Form Submission:', { name, email, message });
      res.json({ 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon.' 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while processing your request.' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}