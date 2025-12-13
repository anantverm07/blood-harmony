import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Bell, 
  Award, 
  MapPin, 
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Crown,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  const isDonor = user?.role === 'donor';
  
  // Demo data for donor
  const donorStats = {
    points: user?.points || 150,
    donations: user?.donations || 2,
    livesHelped: (user?.donations || 2) * 3,
    nextBadge: 'Silver',
    pointsToNext: 150,
    badge: user?.badge || 'bronze',
  };

  const badgeLevels = {
    bronze: { name: 'Bronze', color: 'text-orange-600', min: 1, icon: '🥉' },
    silver: { name: 'Silver', color: 'text-gray-400', min: 3, icon: '🥈' },
    gold: { name: 'Gold', color: 'text-yellow-500', min: 5, icon: '🥇' },
  };

  // Demo nearby requests for donors
  const nearbyRequests = [
    { id: '1', bloodGroup: 'A+', location: 'City Hospital, Gwalior', urgency: 'high', distance: '2.5 km' },
    { id: '2', bloodGroup: 'O+', location: 'District Hospital', urgency: 'medium', distance: '4.2 km' },
  ];

  // Demo active requests for receivers
  const activeRequests = [
    { id: '1', bloodGroup: 'B+', status: 'matched', matchedDonors: 3, createdAt: '2 hours ago' },
    { id: '2', bloodGroup: 'O-', status: 'pending', matchedDonors: 0, createdAt: '1 day ago' },
  ];

  // Demo notifications
  const notifications = [
    { id: '1', message: 'A donor has accepted your request', time: '5 min ago', type: 'success' },
    { id: '2', message: 'Your blood request matched with 3 donors', time: '1 hour ago', type: 'info' },
    { id: '3', message: 'New urgent request near your location', time: '3 hours ago', type: 'urgent' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name || 'User'}!</h1>
              <p className="text-muted-foreground capitalize">
                {user?.role} Dashboard • {user?.bloodGroup || 'Blood group not set'}
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/profile">
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              {!user?.isPremium && (
                <Link to="/premium">
                  <Button variant="premium">
                    <Crown className="h-4 w-4 mr-2" />
                    Go Premium
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {isDonor ? (
                <>
                  {/* Rewards Card - Donors */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Your Rewards
                      </CardTitle>
                      <CardDescription>Track your donations and earn badges</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 rounded-xl bg-primary/10">
                          <p className="text-3xl font-bold text-primary">{donorStats.points}</p>
                          <p className="text-sm text-muted-foreground">Total Points</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-muted">
                          <p className="text-3xl font-bold text-foreground">{donorStats.donations}</p>
                          <p className="text-sm text-muted-foreground">Donations</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-success/10">
                          <p className="text-3xl font-bold text-success">{donorStats.livesHelped}</p>
                          <p className="text-sm text-muted-foreground">Lives Helped</p>
                        </div>
                      </div>
                      
                      <div className="border-t border-border pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{badgeLevels[donorStats.badge as keyof typeof badgeLevels]?.icon}</span>
                            <span className="font-semibold">{badgeLevels[donorStats.badge as keyof typeof badgeLevels]?.name} Donor</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {donorStats.pointsToNext} pts to {donorStats.nextBadge}
                          </span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Nearby Requests - Donors */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />
                        Requests Near You
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {nearbyRequests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <Badge 
                              variant="outline" 
                              className={`text-lg font-bold px-3 py-1 ${
                                request.urgency === 'high' 
                                  ? 'bg-urgent/10 text-urgent border-urgent/30' 
                                  : 'bg-warning/10 text-warning border-warning/30'
                              }`}
                            >
                              {request.bloodGroup}
                            </Badge>
                            <div>
                              <p className="font-medium">{request.location}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {request.distance}
                              </p>
                            </div>
                          </div>
                          <Button size="sm">
                            Accept
                          </Button>
                        </div>
                      ))}
                      <Link to="/find-donors">
                        <Button variant="ghost" className="w-full">
                          View All Requests
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  {/* Active Requests - Receivers */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="h-5 w-5 text-primary" />
                          Your Blood Requests
                        </CardTitle>
                        <Link to="/request-blood">
                          <Button size="sm">New Request</Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {activeRequests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-4 rounded-xl border border-border">
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-lg font-bold px-3 py-1">
                              {request.bloodGroup}
                            </Badge>
                            <div>
                              <div className="flex items-center gap-2">
                                {request.status === 'matched' ? (
                                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    {request.matchedDonors} Matched
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{request.createdAt}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Suggested Donors */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Suggested Donors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Link to="/find-donors">
                        <Button variant="outline" className="w-full">
                          Find Matching Donors
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Donation History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    {isDonor ? 'Donation History' : 'Request History'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No {isDonor ? 'donation' : 'request'} history yet</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Notifications */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-lg border ${
                        notification.type === 'success' 
                          ? 'bg-success/5 border-success/20' 
                          : notification.type === 'urgent'
                          ? 'bg-urgent/5 border-urgent/20'
                          : 'bg-muted border-border'
                      }`}
                    >
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {isDonor ? (
                    <>
                      <Link to="/find-donors">
                        <Button variant="outline" className="w-full justify-start">
                          <Users className="h-4 w-4 mr-2" />
                          View Requests
                        </Button>
                      </Link>
                      <Link to="/profile">
                        <Button variant="outline" className="w-full justify-start">
                          <Edit className="h-4 w-4 mr-2" />
                          Update Availability
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/request-blood">
                        <Button variant="outline" className="w-full justify-start">
                          <Heart className="h-4 w-4 mr-2" />
                          New Blood Request
                        </Button>
                      </Link>
                      <Link to="/find-donors">
                        <Button variant="outline" className="w-full justify-start">
                          <Users className="h-4 w-4 mr-2" />
                          Find Donors
                        </Button>
                      </Link>
                    </>
                  )}
                  <Link to="/blood-banks">
                    <Button variant="outline" className="w-full justify-start">
                      <MapPin className="h-4 w-4 mr-2" />
                      Nearby Blood Banks
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
