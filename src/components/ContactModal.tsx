import React from 'react';
import { Phone, MessageCircle, MapPin, X, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Donor } from './DonorCard';

interface ContactModalProps {
  donor: Donor | null;
  isOpen: boolean;
  onClose: () => void;
  hospitalLocation?: { lat: number; lng: number; name: string };
}

const ContactModal: React.FC<ContactModalProps> = ({ donor, isOpen, onClose, hospitalLocation }) => {
  if (!donor) return null;

  const handleCall = () => {
    window.open(`tel:${donor.phone}`, '_self');
  };

  const handleMessage = () => {
    window.open(`sms:${donor.phone}`, '_self');
  };

  const handleShareLocation = () => {
    if (hospitalLocation) {
      const mapsUrl = `https://www.google.com/maps?q=${hospitalLocation.lat},${hospitalLocation.lng}`;
      window.open(mapsUrl, '_blank');
    }
  };

  const handleBookUber = () => {
    // Uber deep link - would need actual coordinates in production
    const pickupLat = donor.lat || 26.2183;
    const pickupLng = donor.lng || 78.1828;
    const dropoffLat = hospitalLocation?.lat || 26.2124;
    const dropoffLng = hospitalLocation?.lng || 78.1772;
    
    const uberUrl = `https://m.uber.com/ul/?action=setPickup&pickup[latitude]=${pickupLat}&pickup[longitude]=${pickupLng}&dropoff[latitude]=${dropoffLat}&dropoff[longitude]=${dropoffLng}`;
    window.open(uberUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {donor.name.charAt(0)}
            </div>
            <div>
              <span>{donor.name}</span>
              <p className="text-sm font-normal text-muted-foreground">{donor.bloodGroup} • {donor.location}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          <Button onClick={handleCall} className="w-full justify-start gap-3" size="lg">
            <Phone className="h-5 w-5" />
            <div className="text-left">
              <div>Call Donor</div>
              <div className="text-xs opacity-70">{donor.phone}</div>
            </div>
          </Button>

          <Button onClick={handleMessage} variant="outline" className="w-full justify-start gap-3" size="lg">
            <MessageCircle className="h-5 w-5" />
            <div className="text-left">
              <div>Send Message</div>
              <div className="text-xs opacity-70">Open SMS app</div>
            </div>
          </Button>

          {hospitalLocation && (
            <Button onClick={handleShareLocation} variant="outline" className="w-full justify-start gap-3" size="lg">
              <MapPin className="h-5 w-5" />
              <div className="text-left">
                <div>Share Hospital Location</div>
                <div className="text-xs opacity-70">{hospitalLocation.name}</div>
              </div>
            </Button>
          )}

          <Button onClick={handleBookUber} variant="secondary" className="w-full justify-start gap-3" size="lg">
            <Car className="h-5 w-5" />
            <div className="text-left">
              <div>Book Uber for Donor</div>
              <div className="text-xs opacity-70">Recipient pays fare directly</div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
