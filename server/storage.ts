import {
  type Profile,
  type InsertProfile,
  type SocialLink,
  type InsertSocialLink,
  type FeaturedContent,
  type InsertFeaturedContent,
  type Analytics,
  type InsertAnalytics,
  type LinkClick,
  type InsertLinkClick,
  type Subscriber,
  type InsertSubscriber,
} from "@shared/schema";

export interface IStorage {
  // Profile methods
  getProfile(id: number): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: number, profile: Partial<Profile>): Promise<Profile | undefined>;
  
  // Social links methods
  getSocialLinks(profileId: number): Promise<SocialLink[]>;
  createSocialLink(link: InsertSocialLink): Promise<SocialLink>;
  updateSocialLink(id: number, link: Partial<SocialLink>): Promise<SocialLink | undefined>;
  deleteSocialLink(id: number): Promise<boolean>;
  
  // Featured content methods
  getFeaturedContent(profileId: number): Promise<FeaturedContent[]>;
  createFeaturedContent(content: InsertFeaturedContent): Promise<FeaturedContent>;
  updateFeaturedContent(id: number, content: Partial<FeaturedContent>): Promise<FeaturedContent | undefined>;
  deleteFeaturedContent(id: number): Promise<boolean>;
  
  // Analytics methods
  getAnalytics(profileId: number): Promise<Analytics | undefined>;
  incrementPageView(profileId: number): Promise<Analytics | undefined>;
  incrementLinkClick(profileId: number): Promise<Analytics | undefined>;
  
  // Click tracking methods
  trackLinkClick(linkClick: InsertLinkClick): Promise<LinkClick>;
  getLinkClicks(profileId: number): Promise<LinkClick[]>;
  
  // Newsletter subscribers methods
  addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscribers(profileId: number): Promise<Subscriber[]>;
}

export class MemStorage implements IStorage {
  private profiles: Map<number, Profile>;
  private socialLinks: Map<number, SocialLink>;
  private featuredContent: Map<number, FeaturedContent>;
  private analytics: Map<number, Analytics>;
  private linkClicks: Map<number, LinkClick>;
  private subscribers: Map<number, Subscriber>;
  
  private profileIdCounter: number;
  private socialLinkIdCounter: number;
  private featuredContentIdCounter: number;
  private analyticsIdCounter: number;
  private linkClickIdCounter: number;
  private subscriberIdCounter: number;
  
  constructor() {
    this.profiles = new Map();
    this.socialLinks = new Map();
    this.featuredContent = new Map();
    this.analytics = new Map();
    this.linkClicks = new Map();
    this.subscribers = new Map();
    
    this.profileIdCounter = 1;
    this.socialLinkIdCounter = 1;
    this.featuredContentIdCounter = 1;
    this.analyticsIdCounter = 1;
    this.linkClickIdCounter = 1;
    this.subscriberIdCounter = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }
  
  private initSampleData() {
    // Create sample profile
    const sampleProfile: InsertProfile = {
      name: "Jamie Smith",
      title: "Digital Creator & Social Media Specialist",
      bio: "Connecting people through creative content. Follow me for tips on social media, digital marketing, and lifestyle inspiration.",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200",
      coverUrl: "",
      theme: "default"
    };
    
    const profile = this.createProfile(sampleProfile);
    
    // Create sample social links
    const socialLinksData = [
      {
        profileId: 1,
        platform: "Instagram",
        username: "@jamiesmithcreative",
        url: "https://instagram.com/jamiesmithcreative",
        order: 1,
        icon: "ri-instagram-line",
        backgroundColor: "#f3e8ff",
        iconColor: "#9333ea"
      },
      {
        profileId: 1,
        platform: "Twitter",
        username: "@jamiesmithcreator",
        url: "https://twitter.com/jamiesmithcreator",
        order: 2,
        icon: "ri-twitter-x-line",
        backgroundColor: "#dbeafe",
        iconColor: "#2563eb"
      },
      {
        profileId: 1,
        platform: "YouTube",
        username: "Jamie Smith Creative",
        url: "https://youtube.com/c/jamiesmithcreative",
        order: 3,
        icon: "ri-youtube-line",
        backgroundColor: "#fee2e2",
        iconColor: "#dc2626"
      },
      {
        profileId: 1,
        platform: "Spotify",
        username: "My Weekly Playlist",
        url: "https://open.spotify.com/user/jamiesmithcreative",
        order: 4,
        icon: "ri-spotify-line",
        backgroundColor: "#dcfce7",
        iconColor: "#16a34a"
      },
      {
        profileId: 1,
        platform: "LinkedIn",
        username: "Connect Professionally",
        url: "https://linkedin.com/in/jamiesmithcreative",
        order: 5,
        icon: "ri-linkedin-line",
        backgroundColor: "#dbeafe",
        iconColor: "#2563eb"
      },
      {
        profileId: 1,
        platform: "TikTok",
        username: "@jamiesmithofficial",
        url: "https://tiktok.com/@jamiesmithofficial",
        order: 6,
        icon: "ri-tiktok-line",
        backgroundColor: "#fce7f3",
        iconColor: "#db2777"
      }
    ];
    
    socialLinksData.forEach(link => this.createSocialLink(link));
    
    // Create sample featured content
    const featuredContentData = [
      {
        profileId: 1,
        title: "Digital Marketing Strategies",
        description: "Learn the top 5 strategies for growing your social media presence",
        imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
        url: "https://example.com/digital-marketing-strategies",
        order: 1
      },
      {
        profileId: 1,
        title: "Content Creation Workshop",
        description: "Join our upcoming workshop on creating engaging content",
        imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
        url: "https://example.com/content-creation-workshop",
        order: 2
      }
    ];
    
    featuredContentData.forEach(content => this.createFeaturedContent(content));
    
    // Initialize analytics
    this.createAnalytics({
      profileId: 1,
      pageViews: 3482,
      linkClicks: 782
    });
  }
  
  // Profile methods
  async getProfile(id: number): Promise<Profile | undefined> {
    return this.profiles.get(id);
  }
  
  async createProfile(profile: InsertProfile): Promise<Profile> {
    const id = this.profileIdCounter++;
    const newProfile: Profile = { ...profile, id };
    this.profiles.set(id, newProfile);
    return newProfile;
  }
  
  async updateProfile(id: number, profile: Partial<Profile>): Promise<Profile | undefined> {
    const existingProfile = this.profiles.get(id);
    if (!existingProfile) return undefined;
    
    const updatedProfile = { ...existingProfile, ...profile };
    this.profiles.set(id, updatedProfile);
    return updatedProfile;
  }
  
  // Social links methods
  async getSocialLinks(profileId: number): Promise<SocialLink[]> {
    return Array.from(this.socialLinks.values())
      .filter(link => link.profileId === profileId)
      .sort((a, b) => a.order - b.order);
  }
  
  async createSocialLink(link: InsertSocialLink): Promise<SocialLink> {
    const id = this.socialLinkIdCounter++;
    const newLink: SocialLink = { ...link, id };
    this.socialLinks.set(id, newLink);
    return newLink;
  }
  
  async updateSocialLink(id: number, link: Partial<SocialLink>): Promise<SocialLink | undefined> {
    const existingLink = this.socialLinks.get(id);
    if (!existingLink) return undefined;
    
    const updatedLink = { ...existingLink, ...link };
    this.socialLinks.set(id, updatedLink);
    return updatedLink;
  }
  
  async deleteSocialLink(id: number): Promise<boolean> {
    return this.socialLinks.delete(id);
  }
  
  // Featured content methods
  async getFeaturedContent(profileId: number): Promise<FeaturedContent[]> {
    return Array.from(this.featuredContent.values())
      .filter(content => content.profileId === profileId)
      .sort((a, b) => a.order - b.order);
  }
  
  async createFeaturedContent(content: InsertFeaturedContent): Promise<FeaturedContent> {
    const id = this.featuredContentIdCounter++;
    const newContent: FeaturedContent = { ...content, id };
    this.featuredContent.set(id, newContent);
    return newContent;
  }
  
  async updateFeaturedContent(id: number, content: Partial<FeaturedContent>): Promise<FeaturedContent | undefined> {
    const existingContent = this.featuredContent.get(id);
    if (!existingContent) return undefined;
    
    const updatedContent = { ...existingContent, ...content };
    this.featuredContent.set(id, updatedContent);
    return updatedContent;
  }
  
  async deleteFeaturedContent(id: number): Promise<boolean> {
    return this.featuredContent.delete(id);
  }
  
  // Analytics methods
  async getAnalytics(profileId: number): Promise<Analytics | undefined> {
    return Array.from(this.analytics.values())
      .find(analytics => analytics.profileId === profileId);
  }
  
  async createAnalytics(analytics: InsertAnalytics): Promise<Analytics> {
    const id = this.analyticsIdCounter++;
    const newAnalytics: Analytics = { 
      ...analytics, 
      id, 
      lastUpdated: new Date() 
    };
    this.analytics.set(id, newAnalytics);
    return newAnalytics;
  }
  
  async incrementPageView(profileId: number): Promise<Analytics | undefined> {
    const analytics = await this.getAnalytics(profileId);
    
    if (!analytics) {
      return this.createAnalytics({
        profileId,
        pageViews: 1,
        linkClicks: 0
      });
    }
    
    const updatedAnalytics: Analytics = {
      ...analytics,
      pageViews: analytics.pageViews + 1,
      lastUpdated: new Date()
    };
    
    this.analytics.set(analytics.id, updatedAnalytics);
    return updatedAnalytics;
  }
  
  async incrementLinkClick(profileId: number): Promise<Analytics | undefined> {
    const analytics = await this.getAnalytics(profileId);
    
    if (!analytics) {
      return this.createAnalytics({
        profileId,
        pageViews: 0,
        linkClicks: 1
      });
    }
    
    const updatedAnalytics: Analytics = {
      ...analytics,
      linkClicks: analytics.linkClicks + 1,
      lastUpdated: new Date()
    };
    
    this.analytics.set(analytics.id, updatedAnalytics);
    return updatedAnalytics;
  }
  
  // Click tracking methods
  async trackLinkClick(linkClick: InsertLinkClick): Promise<LinkClick> {
    const id = this.linkClickIdCounter++;
    const newLinkClick: LinkClick = {
      ...linkClick,
      id,
      clickedAt: new Date()
    };
    
    this.linkClicks.set(id, newLinkClick);
    await this.incrementLinkClick(linkClick.profileId);
    
    return newLinkClick;
  }
  
  async getLinkClicks(profileId: number): Promise<LinkClick[]> {
    return Array.from(this.linkClicks.values())
      .filter(click => click.profileId === profileId)
      .sort((a, b) => b.clickedAt.getTime() - a.clickedAt.getTime());
  }
  
  // Newsletter subscribers methods
  async addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    // Check if email already exists
    const existingSubscriber = Array.from(this.subscribers.values())
      .find(s => s.email === subscriber.email && s.profileId === subscriber.profileId);
    
    if (existingSubscriber) {
      return existingSubscriber;
    }
    
    const id = this.subscriberIdCounter++;
    const newSubscriber: Subscriber = {
      ...subscriber,
      id,
      subscribedAt: new Date()
    };
    
    this.subscribers.set(id, newSubscriber);
    return newSubscriber;
  }
  
  async getSubscribers(profileId: number): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values())
      .filter(subscriber => subscriber.profileId === profileId)
      .sort((a, b) => b.subscribedAt.getTime() - a.subscribedAt.getTime());
  }
}

export const storage = new MemStorage();
