import type { Express } from "express";
import { createServer, type Server } from "http";
import { getAllBlogPosts, getBlogPost } from "./blog";

export function registerRoutes(app: Express): Server {

  // Blog API endpoints
  app.get('/api/blog', (req, res) => {
    try {
      const posts = getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  });

  app.get('/api/blog/:slug', (req, res) => {
    try {
      const { slug } = req.params;
      const post = getBlogPost(slug);
      
      if (!post) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      
      res.json(post);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}