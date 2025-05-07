import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/contexts/profile-context";
import ProfileCard from "@/components/profile-card";
import SocialLinks from "@/components/social-links";
import AdminControls from "@/components/admin-controls";
import ThemeSelector from "@/components/theme-selector";
import QRCodeSection from "@/components/qr-code-section";
import FeaturedContent from "@/components/featured-content";
import NewsletterSignup from "@/components/newsletter-signup";
import Footer from "@/components/footer";
import AddToHomeModal from "@/components/add-to-home-modal";
import { apiRequest } from "@/lib/queryClient";
import { useTheme } from "@/hooks/use-theme";

export default function Home() {
  const { profileId } = useProfile();
  const { theme } = useTheme();
  
  // Track page view when component mounts
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await apiRequest("GET", `/api/profile/${profileId}`);
      } catch (error) {
        console.error("Failed to track page view", error);
      }
    };
    
    trackPageView();
  }, [profileId]);
  
  // Fetch analytics data
  const { data: analytics } = useQuery({
    queryKey: [`/api/profile/${profileId}/analytics`],
    enabled: !!profileId,
  });
  
  return (
    <div className={`min-h-screen bg-pattern ${theme}`}>
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-8 relative">
        <AdminControls 
          pageViews={analytics?.pageViews || 0} 
          linkClicks={analytics?.linkClicks || 0} 
        />
        
        <ProfileCard />
        
        <ThemeSelector />
        
        <SocialLinks />
        
        <QRCodeSection />
        
        <FeaturedContent />
        
        <NewsletterSignup />
        
        <Footer />
      </main>
      
      <AddToHomeModal />
    </div>
  );
}
