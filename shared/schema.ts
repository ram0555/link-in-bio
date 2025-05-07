import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User profile data
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  coverUrl: text("cover_url"),
  theme: text("theme").default("default"),
});

export const insertProfileSchema = createInsertSchema(profiles).omit({ 
  id: true 
});

// Social links
export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").notNull(),
  platform: text("platform").notNull(),
  username: text("username").notNull(),
  url: text("url").notNull(),
  order: integer("order").notNull(),
  icon: text("icon").notNull(),
  backgroundColor: text("background_color"),
  iconColor: text("icon_color"),
});

export const insertSocialLinkSchema = createInsertSchema(socialLinks).omit({
  id: true
});

// Featured content
export const featuredContent = pgTable("featured_content", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  url: text("url").notNull(),
  order: integer("order").notNull(),
});

export const insertFeaturedContentSchema = createInsertSchema(featuredContent).omit({
  id: true
});

// Analytics tracking
export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").notNull(),
  pageViews: integer("page_views").notNull().default(0),
  linkClicks: integer("link_clicks").notNull().default(0),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  lastUpdated: true
});

// Link click tracking
export const linkClicks = pgTable("link_clicks", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").notNull(),
  linkId: integer("link_id"), // social_links.id or featured_content.id
  linkType: text("link_type").notNull(), // "social" or "featured"
  clickedAt: timestamp("clicked_at").notNull().defaultNow(),
});

export const insertLinkClickSchema = createInsertSchema(linkClicks).omit({
  id: true,
  clickedAt: true
});

// Newsletter subscribers
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").notNull(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  subscribedAt: true
});

// Types
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

export type SocialLink = typeof socialLinks.$inferSelect;
export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;

export type FeaturedContent = typeof featuredContent.$inferSelect;
export type InsertFeaturedContent = z.infer<typeof insertFeaturedContentSchema>;

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;

export type LinkClick = typeof linkClicks.$inferSelect;
export type InsertLinkClick = z.infer<typeof insertLinkClickSchema>;

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
