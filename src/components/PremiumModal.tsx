import React, { useState } from 'react';
import { Crown, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { updateUser } = useAuth();
  const { toast } = useToast();

  const features = [
    'Instantly contact any matched donor',
    'Priority listing in search results',
    'Direct phone & message access',
    'Book Uber for donor transport',
    'Unlimited blood requests',
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    updateUser({ isPremium: true });
    
    toast({
      title: 'Welcome to Premium!',
      description: 'You now have full access to contact donors directly.',
    });
    
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-center text-2xl">Go Premium</DialogTitle>
          <DialogDescription className="text-center">
            Unlock instant access to contact matched donors
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="text-center mb-6">
            <span className="text-4xl font-bold">₹199</span>
            <span className="text-muted-foreground ml-2">one-time</span>
          </div>

          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-success" />
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Button 
            onClick={handlePayment} 
            variant="premium" 
            size="lg" 
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Now
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Secure payment powered by Razorpay
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
