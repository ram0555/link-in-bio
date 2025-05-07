import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/contexts/profile-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Link } from "lucide-react";
import { useToastNotification } from "@/components/notification-toast";

export default function QRCodeSection() {
  const { profileId } = useProfile();
  const { showNotification } = useToastNotification();
  
  interface QRCodeData {
    qrCode: string;
  }
  
  const { data: qrCodeData, isLoading } = useQuery<QRCodeData>({
    queryKey: [`/api/profile/${profileId}/qrcode`],
    enabled: !!profileId,
  });
  
  const handleDownloadQR = () => {
    if (!qrCodeData?.qrCode) return;
    
    const link = document.createElement("a");
    link.href = qrCodeData.qrCode;
    link.download = "profile-qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification("QR code downloaded successfully!");
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification("Profile link copied to clipboard!");
  };
  
  return (
    <Card className="mb-8 animate-fade-in">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Share Your Profile</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center">
            <p className="text-gray-600 mb-4">
              Scan this QR code to share your profile with others or download it for printing.
            </p>
            <div className="flex flex-col gap-3">
              <Button 
                className="w-full"
                onClick={handleDownloadQR}
                disabled={isLoading}
              >
                <Download className="mr-2 h-4 w-4" />
                Download QR Code
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleCopyLink}
              >
                <Link className="mr-2 h-4 w-4" />
                Copy Profile Link
              </Button>
            </div>
          </div>
          <div className="w-48 h-48 bg-white p-2 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
            {isLoading ? (
              <Skeleton className="w-full h-full rounded" />
            ) : qrCodeData?.qrCode ? (
              <img 
                src={qrCodeData.qrCode} 
                alt="Profile QR Code" 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                <i className="ri-qr-code-line text-6xl text-gray-400"></i>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
