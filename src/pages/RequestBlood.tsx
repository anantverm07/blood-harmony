import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Droplets, 
  MapPin, 
  AlertTriangle,
  Phone,
  Building2,
  Loader2,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const RequestBlood: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: '',
    units: '1',
    city: '',
    area: '',
    urgency: 'medium',
    patientName: '',
    contactName: '',
    contactPhone: '',
    hospitalName: '',
    additionalNotes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Blood Request Submitted!',
      description: 'We are now matching you with nearby donors. You will be notified soon.',
    });

    navigate('/find-donors?bloodGroup=' + formData.bloodGroup);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4">
                <Droplets className="h-7 w-7 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Request Blood</CardTitle>
              <CardDescription>
                Submit a blood request and get matched with nearby donors
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Blood Requirements */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    Blood Requirements
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Required Blood Group *</Label>
                      <Select
                        value={formData.bloodGroup}
                        onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodGroups.map((group) => (
                            <SelectItem key={group} value={group}>{group}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="units">Units Required</Label>
                      <Select
                        value={formData.units}
                        onValueChange={(value) => setFormData({ ...formData, units: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select units" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((unit) => (
                            <SelectItem key={unit} value={unit.toString()}>
                              {unit} unit{unit > 1 ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Urgency Level */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    Urgency Level
                  </h3>
                  
                  <RadioGroup
                    value={formData.urgency}
                    onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                    className="grid sm:grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="high" id="high" className="peer sr-only" />
                      <Label
                        htmlFor="high"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 cursor-pointer hover:bg-muted/50 peer-data-[state=checked]:border-urgent peer-data-[state=checked]:bg-urgent/10"
                      >
                        <span className="text-urgent font-bold">High</span>
                        <span className="text-xs text-muted-foreground">Urgent / Emergency</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
                      <Label
                        htmlFor="medium"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 cursor-pointer hover:bg-muted/50 peer-data-[state=checked]:border-warning peer-data-[state=checked]:bg-warning/10"
                      >
                        <span className="text-warning font-bold">Medium</span>
                        <span className="text-xs text-muted-foreground">Within 24 hours</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="low" id="low" className="peer sr-only" />
                      <Label
                        htmlFor="low"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 cursor-pointer hover:bg-muted/50 peer-data-[state=checked]:border-success peer-data-[state=checked]:bg-success/10"
                      >
                        <span className="text-success font-bold">Low</span>
                        <span className="text-xs text-muted-foreground">Scheduled / Planned</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Gwalior"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Area / Locality</Label>
                      <Input
                        id="area"
                        placeholder="Lashkar"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Contact Details
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input
                        id="patientName"
                        placeholder="Patient name"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Person *</Label>
                      <Input
                        id="contactName"
                        placeholder="Your name"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Hospital (Optional) */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Hospital Details (Optional)
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hospitalName">Hospital Name</Label>
                    <Input
                      id="hospitalName"
                      placeholder="City Hospital, Gwalior"
                      value={formData.hospitalName}
                      onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      placeholder="Any additional information for donors..."
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Submit Blood Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RequestBlood;
