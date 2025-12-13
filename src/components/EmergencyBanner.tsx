import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface EmergencyBannerProps {
  count?: number;
  onDismiss?: () => void;
}

const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ count = 2, onDismiss }) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-urgent text-urgent-foreground rounded-xl shadow-2xl p-4 animate-pulse-urgent">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-urgent-foreground/20 rounded-lg">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wide">SOS</span>
              <span className="px-2 py-0.5 bg-urgent-foreground/20 rounded-full text-xs font-bold">
                {count} Urgent
              </span>
            </div>
            <p className="text-sm font-medium mb-3">
              Emergency blood requests near you
            </p>
            <Link to="/find-donors?urgent=true">
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full bg-urgent-foreground text-urgent hover:bg-urgent-foreground/90"
              >
                View Emergency Requests
              </Button>
            </Link>
          </div>
          {onDismiss && (
            <button 
              onClick={onDismiss}
              className="p-1 hover:bg-urgent-foreground/20 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;
