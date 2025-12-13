import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  MapPin, 
  Droplets, 
  Heart, 
  Check,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const healthQuestions = [
  { id: 'age', label: 'I am 18 years or older' },
  { id: 'weight', label: 'I weigh at least 50 kg (110 lbs)' },
  { id: 'healthy', label: 'I am in good health and feeling well today' },
  { id: 'notSick', label: 'I have not had any illness in the past 2 weeks' },
  { id: 'noTattoo', label: 'I have not gotten a tattoo or piercing in the last 6 months' },
  { id: 'noMedication', label: 'I am not currently taking antibiotics or other medications' },
];

const RegisterDonor: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: '',
    gender: '',
    bloodGroup: '',
    city: '',
    area: '',
    lastDonation: '',
  });
  
  const [healthChecks, setHealthChecks] = useState<Record<string, boolean>>({});

  const completedFields = [
    formData.name,
    formData.age,
    formData.gender,
    formData.bloodGroup,
    formData.city,
  ].filter(Boolean).length;

  const progress = (completedFields / 5) * 100;

  const allHealthChecksComplete = healthQuestions.every(q => healthChecks[q.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!allHealthChecksComplete) {
      toast({
        title: 'Health eligibility required',
        description: 'Please confirm all health eligibility requirements.',
        variant: 'destructive',
      });
      return;
    }

    if (parseInt(formData.age) < 18) {
      toast({
        title: 'Age requirement',
        description: 'You must be 18 years or older to donate blood.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    updateUser({
      bloodGroup: formData.bloodGroup,
      location: `${formData.area}, ${formData.city}`,
    });

    toast({
      title: 'Registration Complete!',
      description: 'You are now registered as a blood donor. Thank you for your commitment to save lives!',
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4">
                <Heart className="h-7 w-7 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Register as Blood Donor</CardTitle>
              <CardDescription>
                Join our community of life-savers. Your donation can save up to 3 lives.
              </CardDescription>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Profile completion</span>
                  <span className="font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Personal Information
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        min="18"
                        max="65"
                        placeholder="25"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => setFormData({ ...formData, gender: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group *</Label>
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
                  </div>
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

                {/* Donation History */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Donation History
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastDonation">Last Donation Date (Optional)</Label>
                    <Input
                      id="lastDonation"
                      type="date"
                      value={formData.lastDonation}
                      onChange={(e) => setFormData({ ...formData, lastDonation: e.target.value })}
                    />
                  </div>
                </div>

                {/* Health Eligibility */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    Health Eligibility
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Please confirm the following to ensure you're eligible to donate:
                  </p>
                  
                  <div className="space-y-3">
                    {healthQuestions.map((question) => (
                      <div key={question.id} className="flex items-start gap-3">
                        <Checkbox
                          id={question.id}
                          checked={healthChecks[question.id] || false}
                          onCheckedChange={(checked) => 
                            setHealthChecks({ ...healthChecks, [question.id]: !!checked })
                          }
                        />
                        <label
                          htmlFor={question.id}
                          className="text-sm cursor-pointer leading-relaxed"
                        >
                          {question.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isLoading || !allHealthChecksComplete}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5" />
                      Complete Registration
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

export default RegisterDonor;
