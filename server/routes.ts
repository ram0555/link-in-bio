import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema, insertLinkClickSchema } from "@shared/schema";
import QRCode from "qrcode";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for profile
  app.get("/api/profile/:id", async (req, res) => {
    try {
      const profileId = parseInt(req.params.id);
      const profile = await storage.getProfile(profileId);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      // Track page view
      await storage.incrementPageView(profileId);
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  // API routes for social links
  app.get("/api/profile/:id/social", async (req, res) => {
    try {
      const profileId = parseInt(req.params.id);
      const socialLinks = await storage.getSocialLinks(profileId);
      res.json(socialLinks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch social links" });
    }
  });

  // API routes for featured content
  app.get("/api/profile/:id/featured", async (req, res) => {
    try {
      const profileId = parseInt(req.params.id);
      const featuredContent = await storage.getFeaturedContent(profileId);
      res.json(featuredContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured content" });
    }
  });

  // API routes for analytics
  app.get("/api/profile/:id/analytics", async (req, res) => {
    try {
      const profileId = parseInt(req.params.id);
      const analytics = await storage.getAnalytics(profileId);
      
      if (!analytics) {
        return res.status(404).json({ message: "Analytics not found" });
      }
      
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Track link clicks
  app.post("/api/track/click", async (req, res) => {
    try {
      const validatedData = insertLinkClickSchema.parse(req.body);
      const linkClick = await storage.trackLinkClick(validatedData);
      res.status(201).json(linkClick);
    } catch (error) {
      res.status(400).json({ message: "Invalid link click data" });
    }
  });

  // Subscribe to newsletter
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.addSubscriber(validatedData);
      res.status(201).json(subscriber);
    } catch (error) {
      res.status(400).json({ message: "Invalid subscriber data" });
    }
  });

  // Generate QR code
  app.get("/api/profile/:id/qrcode", async (req, res) => {
    try {
      const profileId = parseInt(req.params.id);
      const profile = await storage.getProfile(profileId);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      // In a real application, we would use the actual URL of the profile
      const profileUrl = `${req.protocol}://${req.get("host")}/profile/${profileId}`;
      
      const qrCodeDataUrl = await QRCode.toDataURL(profileUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff"
        }
      });
      
      res.json({ qrCode: qrCodeDataUrl });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate QR code" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
