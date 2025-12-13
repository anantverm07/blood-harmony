import React from 'react';
import { MapPin, Phone, Clock, Droplets } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BloodBank {
  id: string;
  name: string;
  phone: string;
  address: string;
  hours: string;
  available: {
    wholeBlood: number;
    rbc: number;
    plasma: number;
  };
}

const bloodBanks: BloodBank[] = [
  {
    id: '1',
    name: 'Shree Blood Bank',
    phone: '0751-2429254',
    address: 'Civil Lines, Gwalior',
    hours: '9:00 AM - 6:00 PM',
    available: { wholeBlood: 45, rbc: 32, plasma: 28 },
  },
  {
    id: '2',
    name: 'Shri Radheswami Blood Bank',
    phone: '9826501162',
    address: 'Lashkar, Gwalior',
    hours: '8:00 AM - 8:00 PM',
    available: { wholeBlood: 38, rbc: 25, plasma: 20 },
  },
  {
    id: '3',
    name: 'Indian Red Cross Blood Bank',
    phone: '09329767276',
    address: 'City Center, Gwalior',
    hours: '24x7',
    available: { wholeBlood: 52, rbc: 40, plasma: 35 },
  },
  {
    id: '4',
    name: 'Emergency Blood Centre',
    phone: '1800-XXX-XXXX',
    address: 'Near Railway Station, Gwalior',
    hours: '24x7',
    available: { wholeBlood: 30, rbc: 22, plasma: 18 },
  },
  {
    id: '5',
    name: 'J.A. Group of Hospitals Blood Bank',
    phone: '0751-2345678',
    address: 'Jhansi Road, Gwalior',
    hours: '9:00 AM - 9:00 PM',
    available: { wholeBlood: 28, rbc: 20, plasma: 15 },
  },
];

const BloodBanks: React.FC = () => {
  const totalStats = bloodBanks.reduce(
    (acc, bank) => ({
      wholeBlood: acc.wholeBlood + bank.available.wholeBlood,
      rbc: acc.rbc + bank.available.rbc,
      plasma: acc.plasma + bank.available.plasma,
    }),
    { wholeBlood: 0, rbc: 0, plasma: 0 }
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Nearby Blood Banks</h1>
            <p className="text-muted-foreground">Find blood banks in Gwalior region</p>
          </div>

          {/* Stats Overview */}
          <div className="grid sm:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-foreground">{bloodBanks.length}</p>
                <p className="text-sm text-muted-foreground">Blood Banks</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-primary">{totalStats.wholeBlood}</p>
                <p className="text-sm text-muted-foreground">Whole Blood Units</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-primary">{totalStats.rbc}</p>
                <p className="text-sm text-muted-foreground">RBC Units</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-primary">{totalStats.plasma}</p>
                <p className="text-sm text-muted-foreground">Plasma/Platelet Units</p>
              </CardContent>
            </Card>
          </div>

          {/* Blood Banks List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bloodBanks.map((bank) => (
              <Card key={bank.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{bank.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {bank.address}
                      </CardDescription>
                    </div>
                    {bank.hours === '24x7' && (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                        24x7
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <a href={`tel:${bank.phone}`} className="text-primary hover:underline">
                      {bank.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{bank.hours}</span>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Droplets className="h-3 w-3" />
                      Available Units (Approx.)
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-muted">
                        <p className="text-lg font-bold text-foreground">{bank.available.wholeBlood}</p>
                        <p className="text-xs text-muted-foreground">Whole</p>
                      </div>
                      <div className="p-2 rounded-lg bg-muted">
                        <p className="text-lg font-bold text-foreground">{bank.available.rbc}</p>
                        <p className="text-xs text-muted-foreground">RBC</p>
                      </div>
                      <div className="p-2 rounded-lg bg-muted">
                        <p className="text-lg font-bold text-foreground">{bank.available.plasma}</p>
                        <p className="text-xs text-muted-foreground">Plasma</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BloodBanks;
