import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { ProfileProvider } from "@/contexts/profile-context";
import { NotificationToastProvider } from "@/components/notification-toast";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <NotificationToastProvider>
        <ProfileProvider>
          <Toaster />
          <Router />
        </ProfileProvider>
      </NotificationToastProvider>
    </TooltipProvider>
  );
}

export default App;
