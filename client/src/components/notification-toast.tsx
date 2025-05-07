import { createContext, useContext, useState, ReactNode } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export type NotificationType = "success" | "error" | "info";

interface NotificationToastProps {
  message: string;
  type: NotificationType;
  isVisible: boolean;
  onClose: () => void;
}

interface NotificationToastContextType {
  showNotification: (message: string, type?: NotificationType) => void;
}

export const NotificationToastContext = createContext<NotificationToastContextType | undefined>(undefined);

function NotificationToast({ message, type, isVisible, onClose }: NotificationToastProps) {
  if (!isVisible) return null;
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    onClose();
  }, 3000);
  
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500 text-xl" />;
      case "error":
        return <XCircle className="text-red-500 text-xl" />;
      case "info":
      default:
        return <i className="ri-information-line text-blue-500 text-xl"></i>;
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 flex items-center max-w-xs animate-fade-in">
      <div className="flex-shrink-0 mr-3">
        {getIcon()}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{message}</p>
      </div>
      <div className="ml-4 flex-shrink-0 flex">
        <button 
          className="inline-flex text-gray-400 hover:text-gray-500"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

interface NotificationToastProviderProps {
  children: ReactNode;
}

export function NotificationToastProvider({ children }: NotificationToastProviderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");
  
  const showNotification = (msg: string, notificationType: NotificationType = "success") => {
    setMessage(msg);
    setType(notificationType);
    setIsVisible(true);
  };
  
  const hideNotification = () => {
    setIsVisible(false);
  };
  
  return (
    <NotificationToastContext.Provider value={{ showNotification }}>
      {children}
      <NotificationToast 
        message={message} 
        type={type} 
        isVisible={isVisible} 
        onClose={hideNotification} 
      />
    </NotificationToastContext.Provider>
  );
}

export function useToastNotification() {
  const context = useContext(NotificationToastContext);
  
  if (context === undefined) {
    throw new Error("useToastNotification must be used within a NotificationToastProvider");
  }
  
  return context;
}
