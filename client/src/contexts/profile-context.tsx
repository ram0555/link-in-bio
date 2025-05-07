import { createContext, useContext, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Profile, type SocialLink, type FeaturedContent } from "@shared/schema";

interface ProfileContextType {
  profileId: number;
  profile: Profile | undefined;
  socialLinks: SocialLink[];
  featuredContent: FeaturedContent[];
  isLoading: boolean;
  isError: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  // Default to profile ID 1 for this application
  const [profileId] = useState<number>(1);
  
  // Fetch profile data
  const { data: profile, isLoading: isProfileLoading, isError: isProfileError } = useQuery({
    queryKey: [`/api/profile/${profileId}`],
    enabled: !!profileId,
  });
  
  // Fetch social links
  const { data: socialLinks = [], isLoading: isSocialLinksLoading, isError: isSocialLinksError } = useQuery({
    queryKey: [`/api/profile/${profileId}/social`],
    enabled: !!profileId,
  });
  
  // Fetch featured content
  const { data: featuredContent = [], isLoading: isFeaturedContentLoading, isError: isFeaturedContentError } = useQuery({
    queryKey: [`/api/profile/${profileId}/featured`],
    enabled: !!profileId,
  });
  
  const isLoading = isProfileLoading || isSocialLinksLoading || isFeaturedContentLoading;
  const isError = isProfileError || isSocialLinksError || isFeaturedContentError;
  
  return (
    <ProfileContext.Provider
      value={{
        profileId,
        profile,
        socialLinks,
        featuredContent,
        isLoading,
        isError
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  
  return context;
}
