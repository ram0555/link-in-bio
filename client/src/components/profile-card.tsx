import { useProfile } from "@/contexts/profile-context";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Share, UserPlus } from "lucide-react";
import { useToastNotification } from "@/components/notification-toast";

export default function ProfileCard() {
  const { profile, isLoading } = useProfile();
  const { showNotification } = useToastNotification();
  
  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profile?.name} | Link in Bio`,
        text: `Check out ${profile?.name}'s profile`,
        url: window.location.href,
      })
      .catch(() => {
        // Fallback if sharing fails or is cancelled
        copyProfileLink();
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      copyProfileLink();
    }
  };
  
  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification("Profile link copied to clipboard!");
  };
  
  const handleFollowProfile = () => {
    showNotification("Following functionality coming soon!");
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 animate-fade-in">
        <div className="relative h-32 bg-gradient-to-r from-primary-500 to-secondary-500">
          <Skeleton className="absolute top-4 right-4 w-8 h-8 rounded-full" />
        </div>
        <div className="px-6 pt-0 pb-6 relative">
          <div className="flex justify-center">
            <Skeleton className="w-24 h-24 rounded-full -mt-12" />
          </div>
          <div className="text-center mt-3">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto mt-2" />
            <Skeleton className="h-16 w-full max-w-md mx-auto mt-3" />
          </div>
          <div className="mt-4 flex justify-center space-x-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 animate-fade-in">
      <div className="relative h-32 bg-gradient-to-r from-primary-500 to-secondary-500">
        <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition">
          <i className="ri-edit-line"></i>
        </button>
      </div>
      <div className="px-6 pt-0 pb-6 relative">
        <div className="flex justify-center">
          <img 
            src={profile?.avatarUrl} 
            alt={`${profile?.name}'s profile picture`} 
            className="w-24 h-24 rounded-full border-4 border-white shadow-md -mt-12 object-cover"
          />
        </div>
        <div className="text-center mt-3">
          <h1 className="text-2xl font-bold">{profile?.name}</h1>
          <p className="text-gray-600 mt-1">{profile?.title}</p>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
            {profile?.bio}
          </p>
        </div>
        <div className="mt-4 flex justify-center space-x-3">
          <Button 
            variant="outline" 
            className="rounded-full"
            onClick={handleShareProfile}
          >
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button 
            className="rounded-full"
            onClick={handleFollowProfile}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
}
