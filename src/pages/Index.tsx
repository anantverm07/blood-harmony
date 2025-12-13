import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Search, 
  Users, 
  MapPin, 
  Shield, 
  Clock, 
  ArrowRight,
  Droplets,
  Activity,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsCounter from '@/components/StatsCounter';
import EmergencyBanner from '@/components/EmergencyBanner';

const Index: React.FC = () => {
  const [showEmergency, setShowEmergency] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');

  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: 'Find Donors Instantly',
      description: 'Search verified blood donors near your location in real-time.',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Location-Based Matching',
      description: 'Get matched with donors in your area based on blood group and distance.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Verified & Safe',
      description: 'All donors are verified and health-screened for safe donations.',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Emergency Support',
      description: '24/7 urgent blood request handling for critical situations.',
    },
  ];

  const whyDonate = [
    {
      icon: <Droplets className="h-8 w-8" />,
      title: 'Save Up to 3 Lives',
      description: 'One donation can save up to three lives. Your blood is separated into red cells, platelets, and plasma.',
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: 'Health Benefits',
      description: 'Regular donation reduces harmful iron stores and can lower risk of heart disease.',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Earn Rewards',
      description: 'Collect points, unlock badges, and get recognition for every donation you make.',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float animation-delay-200" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-slide-up">
                <Heart className="h-4 w-4" />
                <span>Join 1,200+ verified donors</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-slide-up animation-delay-100">
                Find Blood Donors{' '}
                <span className="text-primary">Near You</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up animation-delay-200">
                Connecting donors, patients & hospitals in emergencies. 
                Every drop counts, every donor is a hero.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-slide-up animation-delay-300">
                <Link to="/register-donor">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    <Heart className="h-5 w-5 mr-2" />
                    Register as Donor
                  </Button>
                </Link>
                <Link to="/request-blood">
                  <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                    Request Blood
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Quick Search */}
              <div className="max-w-md mx-auto animate-slide-up animation-delay-400">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter your location to find donors..."
                    className="pl-12 pr-28 h-14 text-base rounded-full shadow-lg border-2"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                  <Link 
                    to={`/find-donors${searchLocation ? `?location=${encodeURIComponent(searchLocation)}` : ''}`}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <Button size="sm" className="rounded-full px-6 h-10">
                      Search
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <StatsCounter />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How Blood Bridge Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Simple, fast, and reliable blood donation matching platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Donate Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Blood Donation Matters
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your donation doesn't just save lives—it makes a difference in countless ways.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyDonate.map((item, index) => (
                <div
                  key={item.title}
                  className="text-center p-8 rounded-2xl bg-card border border-border shadow-sm"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-12 text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Save Lives?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Join our community of heroes. Whether you're a donor or need blood, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register-donor">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Become a Donor
                  </Button>
                </Link>
                <Link to="/find-donors">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Find Donors Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {showEmergency && (
        <EmergencyBanner count={2} onDismiss={() => setShowEmergency(false)} />
      )}
    </div>
  );
};

export default Index;
