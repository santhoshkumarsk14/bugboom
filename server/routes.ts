import type { Express } from "express";
import { createServer, type Server } from "http";

export function registerRoutes(app: Express): Server {
  // Contact form submission endpoint
  app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Log the submission (in a real app, you'd save this to a database)
    console.log('Contact Form Submission:', { name, email, message });

    // Return success response
    res.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you soon.' 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}