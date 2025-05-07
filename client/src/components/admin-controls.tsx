import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

interface AdminControlsProps {
  pageViews: number;
  linkClicks: number;
}

export default function AdminControls({ pageViews, linkClicks }: AdminControlsProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  // Calculate conversion rate
  const conversionRate = pageViews > 0 ? ((linkClicks / pageViews) * 100).toFixed(1) : "0.0";
  
  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  if (!isVisible) {
    return (
      <div className="mb-8 text-right">
        <Button variant="outline" size="sm" onClick={() => setIsVisible(true)}>
          Show Admin Controls
        </Button>
      </div>
    );
  }
  
  return (
    <Card className="mb-8 animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Admin Controls</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsVisible(false)}
          >
            Hide
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-600 mb-2">Total Views</p>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{formatNumber(pageViews)}</span>
              <span className="ml-2 text-green-500 text-sm flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                12%
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-600 mb-2">Link Clicks</p>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{formatNumber(linkClicks)}</span>
              <span className="ml-2 text-green-500 text-sm flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                5%
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-600 mb-2">Conversion Rate</p>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{conversionRate}%</span>
              <span className="ml-2 text-red-500 text-sm flex items-center">
                <ArrowDown className="h-4 w-4 mr-1" />
                1.2%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
