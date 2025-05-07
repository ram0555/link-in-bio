import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function AddToHomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Check if the user is on a mobile device
  const isMobile = () => {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  
  // Show the modal after a delay, only on mobile devices
  useEffect(() => {
    if (isMobile()) {
      const timer = setTimeout(() => {
        // Check if the user has already seen the modal
        const hasSeenModal = localStorage.getItem("hasSeenAddToHomeModal");
        
        if (!hasSeenModal) {
          setIsOpen(true);
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleAddToHomeScreen = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenAddToHomeModal", "true");
  };
  
  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenAddToHomeModal", "true");
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 mb-4">
            <Home className="h-6 w-6 text-primary-600" />
          </div>
          <DialogTitle className="text-center">Add to Home Screen</DialogTitle>
          <DialogDescription className="text-center">
            Add this page to your home screen for quick access to my content and updates!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-2 flex-col sm:flex-row">
          <Button type="button" onClick={handleAddToHomeScreen}>
            Add to Home Screen
          </Button>
          <Button type="button" variant="outline" onClick={handleClose}>
            Not Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
