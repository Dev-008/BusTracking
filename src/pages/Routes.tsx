import { useState } from 'react';
import { routes, locations, cities, getLocationByCity, Route } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Clock, DollarSign, Users, Star, Calendar, ArrowRightLeft, Search, Zap, Wifi, Droplets, Wind, AlertCircle, X, Bus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Routes() {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [viewMode, setViewMode] = useState<'routes' | 'places'>('routes');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const swapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  // Filter routes based on search criteria
  const filteredRoutes = routes.filter((route) => {
    if (fromCity && route.fromCity.toLowerCase() !== fromCity.toLowerCase()) return false;
    if (toCity && route.toCity.toLowerCase() !== toCity.toLowerCase()) return false;
    return true;
  });

  const handleBookRoute = (routeId: string) => {
    navigate(`/select-seats/${routeId}`);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'charging':
        return <Zap className="h-4 w-4" />;
      case 'water':
        return <Droplets className="h-4 w-4" />;
      case 'blanket':
        return <Wind className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Bus Routes & Destinations
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore all available routes and popular destinations across India
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 rounded-2xl border border-primary/20 bg-card p-6 shadow-lg">
          <div className="grid gap-4 sm:grid-cols-3 sm:items-end">
            {/* From City */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">From</label>
              <select
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="h-11 w-full rounded-lg border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select departure city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapCities}
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-secondary text-muted-foreground transition-colors hover:bg-accent"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </button>
            </div>

            {/* To City */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">To</label>
              <select
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="h-11 w-full rounded-lg border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select arrival city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button and Clear */}
          <div className="mt-4 flex gap-3">
            <Button className="flex-1 gap-2" size="lg">
              <Search className="h-4 w-4" />
              Search Buses
            </Button>
            {(fromCity || toCity) && (
              <Button
                variant="outline"
                onClick={() => {
                  setFromCity('');
                  setToCity('');
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* View Toggle */}
        <div className="mb-8 flex justify-center gap-4">
          <Button
            variant={viewMode === 'routes' ? 'default' : 'outline'}
            onClick={() => setViewMode('routes')}
            className="gap-2"
          >
            <MapPin className="h-4 w-4" />
            All Routes
          </Button>
          <Button
            variant={viewMode === 'places' ? 'default' : 'outline'}
            onClick={() => setViewMode('places')}
            className="gap-2"
          >
            <Star className="h-4 w-4" />
            Places & Locations
          </Button>
        </div>

        {/* Routes View */}
        {viewMode === 'routes' && (
          <div className="space-y-6">
            {(fromCity || toCity) && (
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Found <span className="font-semibold">{filteredRoutes.length}</span> route(s)
                  {fromCity && ` from ${fromCity}`}
                  {toCity && ` to ${toCity}`}
                </p>
              </div>
            )}

            {filteredRoutes.length === 0 && (fromCity || toCity) ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="text-lg font-semibold text-foreground">No routes found</p>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredRoutes.map((route) => {
                  return (
                    <Card
                      key={route.id}
                      className="overflow-hidden transition-all hover:shadow-lg"
                    >
                      {/* Header */}
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div>
                                <CardTitle className="flex items-center gap-2">
                                  <MapPin className="h-5 w-5 text-primary" />
                                  {route.fromCity} → {route.toCity}
                                </CardTitle>
                                <CardDescription className="mt-1">
                                  {route.bus.busName} • {route.bus.operator}
                                </CardDescription>
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary">{route.bus.busType}</Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-6">
                        {/* Timeline Section */}
                        <div className="mb-6 rounded-lg bg-secondary/30 p-4">
                          <div className="flex items-center justify-between">
                            {/* Departure */}
                            <div className="space-y-1 text-center">
                              <p className="text-xs font-semibold text-muted-foreground">DEPARTURE</p>
                              <p className="text-2xl font-bold text-foreground">{route.departureTime}</p>
                              <p className="text-xs text-muted-foreground">{route.fromCity}</p>
                            </div>

                            {/* Timeline Arrow */}
                            <div className="flex flex-1 items-center gap-2 px-4">
                              <div className="h-0.5 flex-1 bg-gradient-to-r from-primary to-primary/30" />
                              <div className="space-y-1 text-center">
                                <p className="text-xs font-semibold text-muted-foreground">DURATION</p>
                                <p className="text-sm font-semibold text-foreground">{route.duration}</p>
                              </div>
                              <div className="h-0.5 flex-1 bg-gradient-to-r from-primary/30 to-primary" />
                            </div>

                            {/* Arrival */}
                            <div className="space-y-1 text-center">
                              <p className="text-xs font-semibold text-muted-foreground">ARRIVAL</p>
                              <p className="text-2xl font-bold text-foreground">{route.arrivalTime}</p>
                              <p className="text-xs text-muted-foreground">{route.toCity}</p>
                            </div>
                          </div>
                        </div>

                        {/* Quick Info Grid */}
                        <div className="mb-6 grid gap-3 sm:grid-cols-4">
                          <div className="rounded-lg border bg-card p-3">
                            <p className="text-xs text-muted-foreground">Available Seats</p>
                            <p className="mt-1 flex items-center gap-2 text-lg font-bold text-green-600">
                              <Users className="h-4 w-4" />
                              {route.availableSeats}
                            </p>
                          </div>
                          <div className="rounded-lg border bg-card p-3">
                            <p className="text-xs text-muted-foreground">Booked Seats</p>
                            <p className="mt-1 flex items-center gap-2 text-lg font-bold text-red-600">
                              <AlertCircle className="h-4 w-4" />
                              {route.bookedSeats.length}
                            </p>
                          </div>
                          <div className="rounded-lg border bg-card p-3">
                            <p className="text-xs text-muted-foreground">Total Seats</p>
                            <p className="mt-1 text-lg font-bold text-foreground">{route.bus.totalSeats}</p>
                          </div>
                          <div className="rounded-lg border bg-card p-3">
                            <p className="text-xs text-muted-foreground">Price per Seat</p>
                            <p className="mt-1 flex items-center gap-2 text-lg font-bold text-primary">
                              <DollarSign className="h-4 w-4" />
                              ₹{route.price}
                            </p>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="mb-6 space-y-3">
                          <p className="font-semibold text-foreground">Amenities</p>
                          <div className="flex flex-wrap gap-2">
                            {route.bus.amenities.map((amenity) => (
                              <Badge key={amenity} variant="outline" className="gap-2">
                                {getAmenityIcon(amenity)}
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Bus Details */}
                        <div className="mb-6 rounded-lg bg-secondary/20 p-4">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">Bus Model:</span> {route.bus.busName}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">Operator:</span> {route.bus.operator}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">Bus Type:</span> {route.bus.busType}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">Total Capacity:</span> {route.bus.totalSeats} seats
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleBookRoute(route.id)}
                            className="flex-1 gap-2"
                            size="lg"
                          >
                            <Calendar className="h-4 w-4" />
                            Book Now
                          </Button>
                          <Button 
                            variant="outline" 
                            size="lg" 
                            className="gap-2"
                            onClick={() => setSelectedRoute(route)}
                          >
                            <MapPin className="h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Places View */}
        {viewMode === 'places' && !selectedLocation && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {locations.map((location) => {
              const locationRoutes = routes.filter(
                (r) => r.fromCity === location.city
              );

              return (
                <Card key={location.city} className="overflow-hidden transition-all hover:shadow-lg cursor-pointer" onClick={() => setSelectedLocation(location.city)}>
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                          <MapPin className="h-6 w-6 text-primary" />
                          {location.city}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {location.region}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {locationRoutes.length} Bus Routes
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {location.description}
                    </p>

                    <div>
                      <h4 className="mb-2 flex items-center gap-2 font-semibold">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Popular Attractions
                      </h4>
                      <ul className="space-y-1">
                        {location.attractions.map((attraction) => (
                          <li
                            key={attraction}
                            className="text-sm text-muted-foreground before:mr-2 before:content-['•']"
                          >
                            {attraction}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2 flex items-center gap-2 font-semibold">
                        <Calendar className="h-4 w-4" />
                        Best Time to Visit
                      </h4>
                      <p className="text-sm text-muted-foreground">{location.bestTime}</p>
                    </div>

                    {locationRoutes.length > 0 && (
                      <div>
                        <h4 className="mb-2 font-semibold">Available Destinations</h4>
                        <div className="flex flex-wrap gap-2">
                          {locationRoutes.slice(0, 4).map((route) => (
                            <Badge key={route.id} variant="outline" className="text-xs">
                              {route.toCity}
                            </Badge>
                          ))}
                          {locationRoutes.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{locationRoutes.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLocation(location.city);
                      }}
                    >
                      <Bus className="h-4 w-4" />
                      View Buses from {location.city}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Buses From Selected Location View */}
        {viewMode === 'places' && selectedLocation && (
          <div className="space-y-6">
            {/* Back Button */}
            <Button
              variant="outline"
              onClick={() => setSelectedLocation(null)}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Back to Locations
            </Button>

            {/* Header */}
            <div className="rounded-xl border bg-gradient-to-r from-primary/10 to-primary/5 p-6">
              <h2 className="flex items-center gap-3 text-3xl font-bold text-foreground">
                <Bus className="h-8 w-8 text-primary" />
                Buses Departing from {selectedLocation}
              </h2>
              <p className="mt-2 text-muted-foreground">
                Select a bus and destination to book your journey
              </p>
            </div>

            {/* Buses Grid */}
            {routes.filter((r) => r.fromCity === selectedLocation).length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <Bus className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="text-lg font-semibold text-foreground">No buses from {selectedLocation}</p>
                  <p className="text-muted-foreground">
                    This location doesn't have outgoing routes yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {routes
                  .filter((route) => route.fromCity === selectedLocation)
                  .map((route) => (
                    <Card 
                      key={route.id} 
                      className="overflow-hidden transition-all hover:shadow-lg flex flex-col"
                    >
                      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{selectedLocation} → {route.toCity}</CardTitle>
                            <CardDescription className="mt-1">{route.bus.busName}</CardDescription>
                          </div>
                          <Badge variant="secondary">{route.bus.busType}</Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 space-y-4 pt-4">
                        {/* Departure/Arrival Info */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between rounded-lg bg-secondary/30 p-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Departure</p>
                              <p className="text-lg font-bold text-foreground">{route.departureTime}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Arrival</p>
                              <p className="text-lg font-bold text-foreground">{route.arrivalTime}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Duration</p>
                              <p className="text-sm font-semibold text-foreground">{route.duration}</p>
                            </div>
                          </div>
                        </div>

                        {/* Bus Details Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-lg border bg-card p-3">
                            <p className="text-xs text-muted-foreground">Operator</p>
                            <p className="mt-1 text-sm font-semibold text-foreground">
                              {route.bus.operator}
                            </p>
                          </div>
                          <div className="rounded-lg border bg-card p-3">
                            <p className="text-xs text-muted-foreground">Price</p>
                            <p className="mt-1 flex items-center gap-1 text-sm font-bold text-primary">
                              <DollarSign className="h-3 w-3" />
                              ₹{route.price}
                            </p>
                          </div>
                          <div className="rounded-lg border bg-card p-3">
                            <p className="text-xs text-muted-foreground">Available</p>
                            <p className="mt-1 flex items-center gap-1 text-sm font-bold text-green-600">
                              <Users className="h-3 w-3" />
                              {route.availableSeats}
                            </p>
                          </div>
                          <div className="rounded-lg border bg-card p-3">
                            <p className="text-xs text-muted-foreground">Total Seats</p>
                            <p className="mt-1 text-sm font-bold text-foreground">{route.bus.totalSeats}</p>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div>
                          <p className="mb-2 text-xs font-semibold text-muted-foreground">Amenities</p>
                          <div className="flex flex-wrap gap-2">
                            {route.bus.amenities.slice(0, 3).map((amenity) => (
                              <Badge key={amenity} variant="outline" className="gap-1 text-xs">
                                {getAmenityIcon(amenity)}
                                {amenity}
                              </Badge>
                            ))}
                            {route.bus.amenities.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{route.bus.amenities.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>

                      <div className="border-t p-4">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleBookRoute(route.id)}
                            className="flex-1 gap-2"
                            size="sm"
                          >
                            <Calendar className="h-4 w-4" />
                            Book Now
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedRoute(route)}
                            className="gap-2"
                          >
                            <MapPin className="h-4 w-4" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}

            {/* Statistics for this location */}
            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2 text-center">
                    <p className="text-3xl font-bold text-primary">
                      {routes.filter((r) => r.fromCity === selectedLocation).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Buses Available</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2 text-center">
                    <p className="text-3xl font-bold text-primary">
                      {new Set(routes.filter((r) => r.fromCity === selectedLocation).map((r) => r.toCity)).size}
                    </p>
                    <p className="text-sm text-muted-foreground">Destinations</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2 text-center">
                    <p className="text-3xl font-bold text-primary">
                      {routes
                        .filter((r) => r.fromCity === selectedLocation)
                        .reduce((acc, r) => acc + r.availableSeats, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Seats Available</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2 text-center">
                    <p className="text-3xl font-bold text-primary">
                      ₹{Math.min(...routes.filter((r) => r.fromCity === selectedLocation).map((r) => r.price))}
                    </p>
                    <p className="text-sm text-muted-foreground">Starting Price</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2 text-center">
                <p className="text-4xl font-bold text-primary">
                  {viewMode === 'routes' && (fromCity || toCity) ? filteredRoutes.length : routes.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  {viewMode === 'routes' && (fromCity || toCity) ? 'Matching Routes' : 'Active Routes'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2 text-center">
                <p className="text-4xl font-bold text-primary">{locations.length}</p>
                <p className="text-sm text-muted-foreground">Destinations</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2 text-center">
                <p className="text-4xl font-bold text-primary">
                  {viewMode === 'routes' && (fromCity || toCity)
                    ? filteredRoutes.reduce((acc, route) => acc + route.availableSeats, 0)
                    : routes.reduce((acc, route) => acc + route.availableSeats, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Seats Available</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Route Details Modal */}
      <Dialog open={!!selectedRoute} onOpenChange={() => setSelectedRoute(null)}>
        <DialogContent className="max-h-screen overflow-y-auto sm:max-w-2xl">
          {selectedRoute && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <MapPin className="h-6 w-6 text-primary" />
                  {selectedRoute.fromCity} → {selectedRoute.toCity}
                </DialogTitle>
                <DialogDescription>
                  {selectedRoute.bus.busName} • {selectedRoute.bus.operator}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Timeline */}
                <div className="rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-xs font-semibold text-muted-foreground">DEPARTURE</p>
                      <p className="mt-2 text-2xl font-bold text-foreground">{selectedRoute.departureTime}</p>
                      <p className="text-xs text-muted-foreground">{selectedRoute.fromCity}</p>
                    </div>

                    <div className="flex flex-1 flex-col items-center gap-2 px-4">
                      <div className="h-0.5 w-full bg-gradient-to-r from-primary to-transparent" />
                      <p className="text-xs font-semibold text-muted-foreground">DURATION</p>
                      <p className="text-sm font-bold text-foreground">{selectedRoute.duration}</p>
                      <div className="h-0.5 w-full bg-gradient-to-l from-primary to-transparent" />
                    </div>

                    <div className="text-center">
                      <p className="text-xs font-semibold text-muted-foreground">ARRIVAL</p>
                      <p className="mt-2 text-2xl font-bold text-foreground">{selectedRoute.arrivalTime}</p>
                      <p className="text-xs text-muted-foreground">{selectedRoute.toCity}</p>
                    </div>
                  </div>
                </div>

                {/* Bus Details Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-sm font-semibold text-muted-foreground">Bus Model</p>
                    <p className="mt-2 text-lg font-bold text-foreground">{selectedRoute.bus.busName}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-sm font-semibold text-muted-foreground">Bus Type</p>
                    <p className="mt-2 text-lg font-bold text-foreground">{selectedRoute.bus.busType}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-sm font-semibold text-muted-foreground">Operator</p>
                    <p className="mt-2 text-lg font-bold text-foreground">{selectedRoute.bus.operator}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-sm font-semibold text-muted-foreground">Total Capacity</p>
                    <p className="mt-2 flex items-center gap-2 text-lg font-bold text-foreground">
                      <Users className="h-4 w-4" />
                      {selectedRoute.bus.totalSeats} seats
                    </p>
                  </div>
                </div>

                {/* Seat Information */}
                <div className="rounded-lg bg-secondary/30 p-4">
                  <h4 className="mb-4 font-semibold">Seat Availability</h4>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Available Seats</p>
                      <p className="mt-2 text-2xl font-bold text-green-600">{selectedRoute.availableSeats}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Booked Seats</p>
                      <p className="mt-2 text-2xl font-bold text-red-600">{selectedRoute.bookedSeats.length}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Price per Seat</p>
                      <p className="mt-2 flex items-center gap-2 text-2xl font-bold text-primary">
                        <DollarSign className="h-5 w-5" />
                        ₹{selectedRoute.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="mb-3 font-semibold">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoute.bus.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="gap-2">
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Booked Seats List */}
                {selectedRoute.bookedSeats.length > 0 && (
                  <div>
                    <h4 className="mb-3 font-semibold">Booked Seat Numbers</h4>
                    <div className="flex flex-wrap gap-2 rounded-lg bg-secondary/20 p-4">
                      {selectedRoute.bookedSeats.map((seat) => (
                        <Badge key={seat} variant="secondary">
                          Seat {seat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  onClick={() => {
                    setSelectedRoute(null);
                    navigate(`/select-seats/${selectedRoute.id}`);
                  }}
                  className="w-full gap-2"
                  size="lg"
                >
                  <Calendar className="h-4 w-4" />
                  Book This Route
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
