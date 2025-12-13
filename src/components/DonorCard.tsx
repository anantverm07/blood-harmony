import React from 'react';
import { MapPin, Calendar, Phone, MessageCircle, Car, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  distance: number;
  lastDonation: string;
  phone: string;
  location: string;
  available: boolean;
  lat?: number;
  lng?: number;
}

interface DonorCardProps {
  donor: Donor;
  isPremium: boolean;
  onContact: (donor: Donor) => void;
  onBookUber?: (donor: Donor) => void;
}

const DonorCard: React.FC<DonorCardProps> = ({ donor, isPremium, onContact, onBookUber }) => {
  const bloodGroupColors: Record<string, string> = {
    'A+': 'bg-primary/10 text-primary border-primary/30',
    'A-': 'bg-primary/10 text-primary border-primary/30',
    'B+': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    'B-': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    'AB+': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    'AB-': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    'O+': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30',
    'O-': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30',
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
              {donor.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{donor.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{donor.distance} km away</span>
              </div>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`text-lg font-bold px-3 py-1 ${bloodGroupColors[donor.bloodGroup] || 'bg-muted'}`}
          >
            {donor.bloodGroup}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Last donated: {donor.lastDonation}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{donor.location}</span>
          </div>
          {donor.available ? (
            <Badge variant="outline" className="bg-success/10 text-success border-success/30">
              Available to donate
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-muted text-muted-foreground">
              Not available
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          {isPremium ? (
            <>
              <Button 
                variant="default" 
                size="sm" 
                className="flex-1"
                onClick={() => onContact(donor)}
              >
                <Phone className="h-4 w-4 mr-1" />
                Contact
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onContact(donor)}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              {onBookUber && (
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => onBookUber(donor)}
                >
                  <Car className="h-4 w-4" />
                </Button>
              )}
            </>
          ) : (
            <Button 
              variant="premium" 
              size="sm" 
              className="flex-1"
              onClick={() => onContact(donor)}
            >
              <Lock className="h-4 w-4 mr-1" />
              Unlock Contact
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DonorCard;
