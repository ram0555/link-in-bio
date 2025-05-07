import { useMutation } from "@tanstack/react-query";
import { useProfile } from "@/contexts/profile-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { ExternalLink } from "lucide-react";

export default function SocialLinks() {
  const { profileId, socialLinks, isLoading } = useProfile();
  
  const trackClickMutation = useMutation({
    mutationFn: async (linkId: number) => {
      return apiRequest("POST", "/api/track/click", {
        profileId,
        linkId,
        linkType: "social"
      });
    }
  });
  
  const handleLinkClick = (linkId: number, url: string) => {
    trackClickMutation.mutate(linkId);
    window.open(url, "_blank", "noopener,noreferrer");
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 mb-8 animate-fade-in">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center p-4 bg-white rounded-xl shadow-sm">
            <Skeleton className="w-10 h-10 rounded-full mr-4" />
            <div className="flex-1">
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="w-6 h-6" />
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-4 mb-8 animate-fade-in">
      {socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.url}
          className="social-link block bg-white rounded-xl shadow-sm hover:shadow-md p-4 transition-all flex items-center"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick(link.id, link.url);
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
            style={{ 
              backgroundColor: link.backgroundColor || "#f3f4f6", 
              color: link.iconColor || "#4b5563" 
            }}
          >
            <i className={`${link.icon} text-xl`}></i>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{link.platform}</h3>
            <p className="text-sm text-gray-500">{link.username}</p>
          </div>
          <div className="text-gray-400">
            <ExternalLink size={18} />
          </div>
        </a>
      ))}
    </div>
  );
}
