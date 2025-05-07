import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useProfile } from "@/contexts/profile-context";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToastNotification } from "@/components/notification-toast";

export default function NewsletterSignup() {
  const { profileId } = useProfile();
  const [email, setEmail] = useState("");
  const { showNotification } = useToastNotification();
  
  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/subscribe", {
        profileId,
        email
      });
    },
    onSuccess: () => {
      setEmail("");
      showNotification("Thanks for subscribing to the newsletter!");
    },
    onError: () => {
      showNotification("Failed to subscribe. Please try again later.", "error");
    }
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      showNotification("Please enter your email address.", "error");
      return;
    }
    
    subscribeMutation.mutate(email);
  };
  
  return (
    <Card className="mb-8 animate-fade-in">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Stay Updated</h2>
        <p className="text-gray-600 text-center mb-4">
          Subscribe to my newsletter for exclusive content and updates
        </p>
        <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleSubmit}>
          <Input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={subscribeMutation.isPending}
          >
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          I'll never spam you or share your email
        </p>
      </CardContent>
    </Card>
  );
}
