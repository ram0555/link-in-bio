import { useMutation } from "@tanstack/react-query";
import { useProfile } from "@/contexts/profile-context";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";

export default function FeaturedContent() {
  const { profileId, featuredContent, isLoading } = useProfile();
  
  const trackClickMutation = useMutation({
    mutationFn: async (contentId: number) => {
      return apiRequest("POST", "/api/track/click", {
        profileId,
        linkId: contentId,
        linkType: "featured"
      });
    }
  });
  
  const handleContentClick = (contentId: number, url: string) => {
    trackClickMutation.mutate(contentId);
    window.open(url, "_blank", "noopener,noreferrer");
  };
  
  if (isLoading) {
    return (
      <Card className="mb-8 animate-fade-in">
        <CardContent className="p-6">
          <Skeleton className="h-8 w-40 mb-4 mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (featuredContent.length === 0) {
    return null;
  }
  
  return (
    <Card className="mb-8 animate-fade-in">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Featured Content</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredContent.map((content) => (
            <div 
              key={content.id}
              className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleContentClick(content.id, content.url)}
            >
              <img 
                src={content.imageUrl} 
                alt={`${content.title} thumbnail`} 
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-gray-800 group-hover:text-primary-500 transition-colors">
                  {content.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{content.description}</p>
              </div>
              <a 
                href={content.url}
                className="absolute inset-0"
                aria-label={`View ${content.title}`}
                onClick={(e) => e.preventDefault()}
                target="_blank" 
                rel="noopener noreferrer"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
