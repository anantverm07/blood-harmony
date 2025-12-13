import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Filter, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import DonorCard, { Donor } from '@/components/DonorCard';
import ContactModal from '@/components/ContactModal';
import PremiumModal from '@/components/PremiumModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Demo donors data
const demoDonors: Donor[] = [
  { id: '1', name: 'Rahul Sharma', bloodGroup: 'A+', distance: 2.5, lastDonation: '3 months ago', phone: '+91 9876543210', location: 'Lashkar, Gwalior', available: true, lat: 26.2183, lng: 78.1828 },
  { id: '2', name: 'Priya Patel', bloodGroup: 'O+', distance: 3.2, lastDonation: '6 months ago', phone: '+91 9876543211', location: 'City Center, Gwalior', available: true, lat: 26.2200, lng: 78.1850 },
  { id: '3', name: 'Amit Kumar', bloodGroup: 'B+', distance: 4.1, lastDonation: '2 months ago', phone: '+91 9876543212', location: 'Thatipur, Gwalior', available: true, lat: 26.2250, lng: 78.1900 },
  { id: '4', name: 'Sneha Gupta', bloodGroup: 'AB+', distance: 5.5, lastDonation: '4 months ago', phone: '+91 9876543213', location: 'Morar, Gwalior', available: false, lat: 26.2300, lng: 78.1950 },
  { id: '5', name: 'Vikram Singh', bloodGroup: 'O-', distance: 1.8, lastDonation: '5 months ago', phone: '+91 9876543214', location: 'Hazira, Gwalior', available: true, lat: 26.2150, lng: 78.1800 },
  { id: '6', name: 'Anita Verma', bloodGroup: 'A-', distance: 6.2, lastDonation: '7 months ago', phone: '+91 9876543215', location: 'Birla Nagar, Gwalior', available: true, lat: 26.2350, lng: 78.2000 },
  { id: '7', name: 'Deepak Joshi', bloodGroup: 'B-', distance: 3.8, lastDonation: '1 month ago', phone: '+91 9876543216', location: 'Phool Bagh, Gwalior', available: true, lat: 26.2280, lng: 78.1880 },
  { id: '8', name: 'Kavita Mishra', bloodGroup: 'AB-', distance: 7.5, lastDonation: '8 months ago', phone: '+91 9876543217', location: 'Jhansi Road, Gwalior', available: false, lat: 26.2400, lng: 78.2050 },
];

const FindDonors: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [searchLocation, setSearchLocation] = useState(searchParams.get('location') || '');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(searchParams.get('bloodGroup') || 'All');
  const [maxDistance, setMaxDistance] = useState([10]);
  const [availableOnly, setAvailableOnly] = useState(false);
  
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const filteredDonors = useMemo(() => {
    return demoDonors.filter(donor => {
      if (selectedBloodGroup !== 'All' && donor.bloodGroup !== selectedBloodGroup) return false;
      if (donor.distance > maxDistance[0]) return false;
      if (availableOnly && !donor.available) return false;
      return true;
    }).sort((a, b) => a.distance - b.distance);
  }, [selectedBloodGroup, maxDistance, availableOnly]);

  const handleContact = (donor: Donor) => {
    if (user?.isPremium) {
      setSelectedDonor(donor);
      setShowContactModal(true);
    } else {
      setShowPremiumModal(true);
    }
  };

  const handleBookUber = (donor: Donor) => {
    setSelectedDonor(donor);
    setShowContactModal(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Find Blood Donors</h1>
            <p className="text-muted-foreground">Search for verified blood donors near your location</p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter your location..."
                className="pl-10 h-12"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            
            <Select value={selectedBloodGroup} onValueChange={setSelectedBloodGroup}>
              <SelectTrigger className="w-full md:w-40 h-12">
                <SelectValue placeholder="Blood Group" />
              </SelectTrigger>
              <SelectContent>
                {bloodGroups.map((group) => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="h-12">
                  <Sliders className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Donors</SheetTitle>
                  <SheetDescription>
                    Refine your search to find the perfect match
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-6 py-6">
                  <div className="space-y-4">
                    <Label>Maximum Distance: {maxDistance[0]} km</Label>
                    <Slider
                      value={maxDistance}
                      onValueChange={setMaxDistance}
                      max={20}
                      min={1}
                      step={1}
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="available"
                      checked={availableOnly}
                      onCheckedChange={(checked) => setAvailableOnly(!!checked)}
                    />
                    <label htmlFor="available" className="text-sm cursor-pointer">
                      Show only available donors
                    </label>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredDonors.length}</span> donors
              {selectedBloodGroup !== 'All' && ` with blood group ${selectedBloodGroup}`}
            </p>
          </div>

          {/* Donors Grid */}
          {filteredDonors.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDonors.map((donor) => (
                <DonorCard
                  key={donor.id}
                  donor={donor}
                  isPremium={user?.isPremium || false}
                  onContact={handleContact}
                  onBookUber={handleBookUber}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No donors found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search location</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      
      <ContactModal
        donor={selectedDonor}
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        hospitalLocation={{ lat: 26.2124, lng: 78.1772, name: 'City Hospital, Gwalior' }}
      />
      
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </div>
  );
};

export default FindDonors;
