export interface Bus {
  id: string;
  busName: string;
  operator: string;
  busType: 'AC Sleeper' | 'AC Seater' | 'Non-AC Seater' | 'Non-AC Sleeper';
  totalSeats: number;
  amenities: string[];
  routeDestinations?: Array<{ from: string; to: string }>;
}

export interface Location {
  city: string;
  description: string;
  region: string;
  attractions: string[];
  bestTime: string;
}

export type DayType = 'weekday' | 'weekend' | 'all';

export interface Route {
  id: string;
  fromCity: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  busId: string;
  bus: Bus;
  availableSeats: number;
  bookedSeats: number[];
  dayType: DayType; // 'weekday' for Mon-Fri, 'weekend' for Sat-Sun, 'all' for both
}

export interface PassengerDetail {
  name: string;
  age: string;
  phone: string;
  email: string;
}

export interface Booking {
  id: string;
  route: Route;
  seatNumbers: number[];
  passengerDetails: PassengerDetail[];
  bookingDate: string;
  travelDate: string;
  paymentStatus: 'paid' | 'pending' | 'cancelled';
  ticketVerified: boolean;
  totalPrice: number;
}

export const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune',
  'Hyderabad', 'Ahmedabad', 'Jaipur', 'Goa', 'Kolkata',
  'Chandigarh', 'Lucknow', 'Indore', 'Kochi', 'Thiruvananthapuram',
  'Nashik', 'Nagpur', 'Bhopal', 'Visakhapatnam', 'Manali',
  'Agra', 'Vadodara', 'Surat', 'Coimbatore', 'Amritsar',
  'Rishikesh', 'Shimla', 'Mysore', 'Udaipur', 'Varanasi',
  'Darjeeling', 'Ooty', 'Dehradun', 'Pushkar', 'Jaisalmer',
  'Jodhpur', 'Mount Abu', 'Ajmer'
];

export const locations: Location[] = [
  {
    city: 'Mumbai',
    description: 'The financial capital of India, known for Bollywood, Indian Gateway, and vibrant nightlife.',
    region: 'Maharashtra',
    attractions: ['Gateway of India', 'Marine Drive', 'Bandra Worli Sea Link', 'Film City'],
    bestTime: 'October to March'
  },
  {
    city: 'Delhi',
    description: 'The capital city, blending ancient history with modern development. Home to iconic monuments.',
    region: 'Delhi',
    attractions: ['Red Fort', 'India Gate', 'Jama Masjid', 'Raj Ghat'],
    bestTime: 'October to March'
  },
  {
    city: 'Bangalore',
    description: 'The IT hub of India with pleasant weather, tech parks, and vibrant culture.',
    region: 'Karnataka',
    attractions: ['Vidhana Soudha', 'Bangalore Palace', 'Cubbon Park', 'Lalbagh'],
    bestTime: 'June to September'
  },
  {
    city: 'Chennai',
    description: 'The gateway to South India, known for beaches, temples, and cultural heritage.',
    region: 'Tamil Nadu',
    attractions: ['Marina Beach', 'Kapaleeshwarar Temple', 'Fort St. George', 'Parthasarathy Temple'],
    bestTime: 'December to February'
  },
  {
    city: 'Pune',
    description: 'The Oxford of the East, featuring educational institutions, tech industry, and historic forts.',
    region: 'Maharashtra',
    attractions: ['Aga Khan Palace', 'Shaniwar Wada', 'Osho Ashram', 'Khadakvasla Lake'],
    bestTime: 'October to February'
  },
  {
    city: 'Hyderabad',
    description: 'The City of Pearls, famous for historic monuments and the thriving IT sector.',
    region: 'Telangana',
    attractions: ['Charminar', 'Mecca Masjid', 'Golconda Fort', 'Chowmahalla Palace'],
    bestTime: 'November to February'
  },
  {
    city: 'Ahmedabad',
    description: 'The textile capital of India and gateway to Gujarat, rich in history and culture.',
    region: 'Gujarat',
    attractions: ['Sabarmati Ashram', 'Jama Masjid', 'Paldi Pol', 'Calico Museum of Textiles'],
    bestTime: 'November to February'
  },
  {
    city: 'Jaipur',
    description: 'The Pink City, known for its unique city planning and the magnificent Hawa Mahal.',
    region: 'Rajasthan',
    attractions: ['Hawa Mahal', 'City Palace', 'Jantar Mantar', 'Albert Hall Museum'],
    bestTime: 'October to March'
  },
  {
    city: 'Goa',
    description: 'Beach paradise with Portuguese colonial architecture, beaches, and vibrant nightlife.',
    region: 'Goa',
    attractions: ['Baga Beach', 'Colva Beach', 'Basilica of Bom Jesus', 'Fort Aguada'],
    bestTime: 'November to March'
  },
  {
    city: 'Kolkata',
    description: 'The cultural capital of India, known for literature, art, and historic monuments.',
    region: 'West Bengal',
    attractions: ['Victoria Memorial', 'Howrah Bridge', 'Indian Museum', 'Belur Math'],
    bestTime: 'October to March'
  },
  {
    city: 'Chandigarh',
    description: 'A modern planned city and union territory at the foothills of the Himalayas.',
    region: 'Chandigarh',
    attractions: ['Rock Garden', 'Capitol Complex', 'Sukhna Lake', 'Rose Garden'],
    bestTime: 'October to March'
  },
  {
    city: 'Lucknow',
    description: 'The city of Nawabs, famous for its Mughal architecture and culinary heritage.',
    region: 'Uttar Pradesh',
    attractions: ['Bara Imambara', 'Chota Imambara', 'Hazratganj', 'Ambedkar Park'],
    bestTime: 'October to March'
  },
  {
    city: 'Indore',
    description: 'A major business hub in Central India, known for cleanliness and commerce.',
    region: 'Madhya Pradesh',
    attractions: ['Rajwada Palace', 'Lal Baag Palace', 'Central Market', 'Patalpani Falls'],
    bestTime: 'October to February'
  },
  {
    city: 'Kochi',
    description: 'The Queen of Arabian Sea, famous for backwaters and historic harbors.',
    region: 'Kerala',
    attractions: ['Chinese Fishing Nets', 'Fort Kochi', 'Mattancherry Palace', 'Backwaters'],
    bestTime: 'November to February'
  },
  {
    city: 'Thiruvananthapuram',
    description: 'The capital of Kerala, known for beaches, temples, and natural beauty.',
    region: 'Kerala',
    attractions: ['Padmanabhaswamy Temple', 'Kovalam Beach', 'Neyyar Dam', 'Kanyakumari'],
    bestTime: 'November to February'
  },
  {
    city: 'Nashik',
    description: 'The wine capital of India, dotted with vineyards and temples.',
    region: 'Maharashtra',
    attractions: ['Wine Valleys', 'Trimbakeshwar Temple', 'Sula Vineyards', 'Godavari River'],
    bestTime: 'October to March'
  },
  {
    city: 'Nagpur',
    description: 'The geographic heart of India, known for oranges and cultural heritage.',
    region: 'Maharashtra',
    attractions: ['Deekshabhoomi', 'Raman Science Center', 'Futala Lake', 'Sakkardara Tank'],
    bestTime: 'October to March'
  },
  {
    city: 'Bhopal',
    description: 'The lake city, known for its beautiful lakes and Islamic monuments.',
    region: 'Madhya Pradesh',
    attractions: ['Taj-ul-Masajid', 'Bhojpur Temple', 'Bhopal Lake', 'Van Vihar National Park'],
    bestTime: 'October to March'
  },
  {
    city: 'Visakhapatnam',
    description: 'The port city of Andhra Pradesh, with beautiful beaches and steel industry.',
    region: 'Andhra Pradesh',
    attractions: ['Beaches', 'INS Kurusura Submarine Museum', 'Araku Valley', 'Tirupati Temple'],
    bestTime: 'November to February'
  },
  {
    city: 'Manali',
    description: 'A picturesque hill station in Himachal Pradesh, perfect for adventure seekers.',
    region: 'Himachal Pradesh',
    attractions: ['Hadimba Temple', 'Solang Valley', 'Rohtang Pass', 'Adventure Sports'],
    bestTime: 'April to June & September to October'
  },
  {
    city: 'Agra',
    description: 'Home to the Taj Mahal, one of the Seven Wonders of the World.',
    region: 'Uttar Pradesh',
    attractions: ['Taj Mahal', 'Agra Fort', 'Mehtab Bagh', 'Akbar\'s Tomb'],
    bestTime: 'October to March'
  },
  {
    city: 'Vadodara',
    description: 'A cultural hub with palaces, museums, and vibrant arts scene.',
    region: 'Gujarat',
    attractions: ['Lakshmi Vilas Palace', 'Baroda Museum', 'Sakar Baugh Palace', 'Weavers Market'],
    bestTime: 'October to March'
  },
  {
    city: 'Surat',
    description: 'The diamond and textile hub of India, known for entrepreneurship.',
    region: 'Gujarat',
    attractions: ['Dutch Palace', 'Dumas Beach', 'Statue of Unity', 'Textile Market'],
    bestTime: 'October to March'
  },
  {
    city: 'Coimbatore',
    description: 'The industrial hub of Tamil Nadu, surrounded by coffee plantations.',
    region: 'Tamil Nadu',
    attractions: ['Nilgiri Mountains', 'Ooty', 'Tea Gardens', 'Isha Foundation Temple'],
    bestTime: 'October to March'
  },
  {
    city: 'Amritsar',
    description: 'The holy city of Punjab, famous for the Golden Temple.',
    region: 'Punjab',
    attractions: ['Golden Temple', 'Wagah Border', 'Jallianwala Bagh', 'Partition Museum'],
    bestTime: 'October to March'
  },
  {
    city: 'Rishikesh',
    description: 'The yoga capital of the world, situated on the banks of the Ganges River.',
    region: 'Uttarakhand',
    attractions: ['Laxman Jhula', 'RAM Jhula', 'Triveni Ghat', 'Adventure Sports'],
    bestTime: 'September to March'
  },
  {
    city: 'Shimla',
    description: 'A picturesque hill station with colonial charm and panoramic views.',
    region: 'Himachal Pradesh',
    attractions: ['Mall Road', 'Christ Church', 'Jakhoo Temple', 'Kufri Lake'],
    bestTime: 'April to June & September to October'
  },
  {
    city: 'Mysore',
    description: 'The city of palaces, known for its royal heritage and coffee plantations.',
    region: 'Karnataka',
    attractions: ['Mysore Palace', 'Chamundeshwari Temple', 'Brindavan Gardens', 'St. Philomena Church'],
    bestTime: 'October to February'
  },
  {
    city: 'Udaipur',
    description: 'The city of lakes, famous for its palaces on the banks of Lake Pichola.',
    region: 'Rajasthan',
    attractions: ['City Palace', 'Lake Palace', 'Jag Mandir', 'Saheliyon Ki Bari'],
    bestTime: 'October to March'
  },
  {
    city: 'Varanasi',
    description: 'The spiritual capital of India, one of the oldest continuously inhabited cities.',
    region: 'Uttar Pradesh',
    attractions: ['Kashi Vishwanath Temple', 'Ganges Aarti', 'Dashashwamedh Ghat', 'Benares Hindu University'],
    bestTime: 'October to November & February to March'
  },
  {
    city: 'Darjeeling',
    description: 'The tea garden capital, offering stunning views of the Kanchenjunga mountains.',
    region: 'West Bengal',
    attractions: ['Darjeeling Himalayan Railway', 'Tiger Hill', 'Japanese Peace Pagoda', 'Tea Gardens'],
    bestTime: 'March to May & September to December'
  },
  {
    city: 'Ooty',
    description: 'A charming hill station surrounded by eucalyptus forests and tea plantations.',
    region: 'Tamil Nadu',
    attractions: ['Nilgiri Mountain Railway', 'Ooty Lake', 'Botanical Gardens', 'Tea Factory'],
    bestTime: 'April to June & September to November'
  },
  {
    city: 'Dehradun',
    description: 'The gateway to the Himalayas, known for adventure and educational institutions.',
    region: 'Uttarakhand',
    attractions: ['Mussoorie', 'Raiwala Temple', 'Sakti Sanctuary', 'Forest Research Institute'],
    bestTime: 'October to March'
  },
  {
    city: 'Pushkar',
    description: 'A sacred pilgrimage town with a holy lake and vibrant spiritual atmosphere.',
    region: 'Rajasthan',
    attractions: ['Pushkar Lake', 'Brahma Temple', 'Desert Safari', 'Pushkar Fair'],
    bestTime: 'October to March'
  },
  {
    city: 'Jaisalmer',
    description: 'The golden city of Rajasthan, famous for its sand dunes and desert beauty.',
    region: 'Rajasthan',
    attractions: ['Jaisalmer Fort', 'Sam Sand Dunes', 'Patwon Ki Haveli', 'Desert Safari'],
    bestTime: 'October to March'
  },
  {
    city: 'Jodhpur',
    description: 'The blue city, known for its distinctive blue-painted houses and Mehrangarh Fort.',
    region: 'Rajasthan',
    attractions: ['Mehrangarh Fort', 'Umaid Bhawan Palace', 'Mandore Gardens', 'Clock Tower'],
    bestTime: 'October to March'
  },
  {
    city: 'Mount Abu',
    description: 'The only hill station in Rajasthan, offering cool climate and scenic beauty.',
    region: 'Rajasthan',
    attractions: ['Dilwara Temples', 'Nakki Lake', 'Gummeswar Temple', 'Sunset Point'],
    bestTime: 'May to July & October to March'
  },
  {
    city: 'Ajmer',
    description: 'A sacred pilgrimage destination with the famous Ajmer Sharif Dargah.',
    region: 'Rajasthan',
    attractions: ['Ajmer Sharif Dargah', 'Ana Sagar Lake', 'Akbar Fort', 'Taragarh Fort'],
    bestTime: 'October to March'
  }
];

export const buses: Bus[] = [
  { id: 'bus1', busName: 'Royal Cruiser', operator: 'VRL Travels', busType: 'AC Sleeper', totalSeats: 36, amenities: ['WiFi', 'Charging', 'Blanket'] },
  { id: 'bus2', busName: 'Express Connect', operator: 'SRS Travels', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Water'] },
  { id: 'bus3', busName: 'Night Rider', operator: 'Neeta Travels', busType: 'Non-AC Sleeper', totalSeats: 36, amenities: ['Blanket'] },
  { id: 'bus4', busName: 'City Link', operator: 'Paulo Travels', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Charging', 'Water'] },
  { id: 'bus5', busName: 'Comfort Plus', operator: 'Kaveri Travels', busType: 'AC Sleeper', totalSeats: 36, amenities: ['WiFi', 'Charging', 'Blanket', 'Snacks'] },
  { id: 'bus6', busName: 'Budget Express', operator: 'Sharma Travels', busType: 'Non-AC Seater', totalSeats: 44, amenities: ['Water'] },
  { id: 'bus7', busName: 'Golden Eagle', operator: 'Golden Travels', busType: 'AC Sleeper', totalSeats: 36, amenities: ['WiFi', 'Charging', 'Blanket'] },
  { id: 'bus8', busName: 'Swift Journey', operator: 'Swift Motors', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Water', 'Charging'] },
  { id: 'bus9', busName: 'Mega Luxury', operator: 'Mega Travels', busType: 'AC Sleeper', totalSeats: 36, amenities: ['WiFi', 'Charging', 'Blanket', 'Snacks', 'Water'] },
  { id: 'bus10', busName: 'Jet Express', operator: 'Jet Airways Bus', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Charging', 'Water'] },
  { id: 'bus11', busName: 'Red Bus', operator: 'Red Bus Travels', busType: 'Non-AC Seater', totalSeats: 44, amenities: ['Water'] },
  { id: 'bus12', busName: 'Star Line', operator: 'Star Line Travels', busType: 'AC Sleeper', totalSeats: 36, amenities: ['Blanket', 'Water'] },
  { id: 'bus13', busName: 'Prime Express', operator: 'Prime Travels', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Charging'] },
  { id: 'bus14', busName: 'Silver Star', operator: 'Silver Travels', busType: 'AC Sleeper', totalSeats: 36, amenities: ['WiFi', 'Charging', 'Blanket'] },
  { id: 'bus15', busName: 'Crown Coach', operator: 'Crown Transport', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Water', 'Charging'] },
  { id: 'bus16', busName: 'Diamond Tours', operator: 'Diamond Bus Lines', busType: 'AC Sleeper', totalSeats: 36, amenities: ['WiFi', 'Charging', 'Blanket'] },
  { id: 'bus17', busName: 'Roadways Supreme', operator: 'State Roadways', busType: 'Non-AC Seater', totalSeats: 50, amenities: ['Water'] },
  { id: 'bus18', busName: 'Galaxy Tours', operator: 'Galaxy Travels', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Charging', 'Water'] },
  { id: 'bus19', busName: 'Mountain King', operator: 'Himalayan Tours', busType: 'Non-AC Seater', totalSeats: 44, amenities: ['Water', 'Blanket'] },
  { id: 'bus20', busName: 'Pearl Express', operator: 'Pearl Travels', busType: 'AC Sleeper', totalSeats: 36, amenities: ['WiFi', 'Charging', 'Blanket', 'Water'] },
  { id: 'bus21', busName: 'Green Journey', operator: 'Eco Tours', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Charging'] },
  { id: 'bus22', busName: 'Sunshine Travels', operator: 'Sunshine Motors', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Water', 'Charging'] },
  { id: 'bus23', busName: 'Blue Line Express', operator: 'Blue Line Tours', busType: 'AC Sleeper', totalSeats: 36, amenities: ['Charging', 'Blanket', 'Water'] },
  { id: 'bus24', busName: 'Kerala Express', operator: 'Kerala Travels', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Water'] },
  { id: 'bus25', busName: 'Titanium Coach', operator: 'Titanium Transport', busType: 'AC Sleeper', totalSeats: 36, amenities: ['WiFi', 'Charging', 'Blanket', 'Snacks'] },
  { id: 'bus26', busName: 'Liberty Express', operator: 'Liberty Travels', busType: 'AC Seater', totalSeats: 40, amenities: ['Charging', 'Water'] },
  { id: 'bus27', busName: 'Sapphire Tours', operator: 'Sapphire Bus Co', busType: 'Non-AC Seater', totalSeats: 44, amenities: ['Water'] },
  { id: 'bus28', busName: 'Emerald Journey', operator: 'Emerald Travels', busType: 'AC Sleeper', totalSeats: 36, amenities: ['WiFi', 'Charging', 'Water'] },
  { id: 'bus29', busName: 'Platinum Express', operator: 'Platinum Motors', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Charging', 'Water'] },
  { id: 'bus30', busName: 'Horizon Tours', operator: 'Horizon Travels', busType: 'AC Sleeper', totalSeats: 36, amenities: ['WiFi', 'Charging', 'Blanket'] },
  
  // Additional buses for enhanced coverage
  { id: 'bus31', busName: 'Alpine Explorer', operator: 'Mountain Trails', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Charging', 'Water'] },
  { id: 'bus32', busName: 'Rajasthan Tours', operator: 'Rajasthan Travels', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Water'] },
  { id: 'bus33', busName: 'Spiritual Journey', operator: 'Hindu Tours', busType: 'AC Sleeper', totalSeats: 36, amenities: ['Blanket', 'Water', 'Charging'] },
  { id: 'bus34', busName: 'Pearl Coast', operator: 'Coastal Express', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Charging', 'Water'] },
  { id: 'bus35', busName: 'Himalayan Summit', operator: 'Mountain High Tours', busType: 'Non-AC Seater', totalSeats: 44, amenities: ['Water', 'Blanket'] },
  { id: 'bus36', busName: 'Spice Route Express', operator: 'Heritage Travels', busType: 'AC Sleeper', totalSeats: 36, amenities: ['WiFi', 'Charging', 'Blanket', 'Snacks'] },
  { id: 'bus37', busName: 'Desert Dreams', operator: 'Desert Tours', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Charging'] },
  { id: 'bus38', busName: 'Garden City Express', operator: 'City Connections', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Water', 'Charging'] },
  { id: 'bus39', busName: 'Backwater Journey', operator: 'Kerala Cruises', busType: 'AC Sleeper', totalSeats: 36, amenities: ['WiFi', 'Charging', 'Blanket', 'Water'] },
  { id: 'bus40', busName: 'Valley Express', operator: 'Valley Tours', busType: 'AC Seater', totalSeats: 40, amenities: ['WiFi', 'Charging', 'Water'] },
];

export const routes: Route[] = [
  // Mumbai to Pune - Weekday buses
  { id: 'r1', fromCity: 'Mumbai', toCity: 'Pune', departureTime: '06:00', arrivalTime: '10:00', duration: '4h 00m', price: 450, busId: 'bus1', bus: buses[0], availableSeats: 28, bookedSeats: [3, 7, 12, 15, 22, 25, 30, 35], dayType: 'weekday' },
  { id: 'r2', fromCity: 'Mumbai', toCity: 'Pune', departureTime: '09:30', arrivalTime: '13:00', duration: '3h 30m', price: 350, busId: 'bus2', bus: buses[1], availableSeats: 32, bookedSeats: [1, 5, 10, 14, 20, 28, 33, 38], dayType: 'weekday' },
  { id: 'r3', fromCity: 'Mumbai', toCity: 'Pune', departureTime: '15:00', arrivalTime: '19:00', duration: '4h 00m', price: 400, busId: 'bus7', bus: buses[6], availableSeats: 30, bookedSeats: [2, 8, 15, 18, 24], dayType: 'all' },
  { id: 'r4', fromCity: 'Mumbai', toCity: 'Pune', departureTime: '22:00', arrivalTime: '02:00', duration: '4h 00m', price: 300, busId: 'bus3', bus: buses[2], availableSeats: 35, bookedSeats: [5, 10], dayType: 'weekend' },

  // Mumbai to Delhi - All days
  { id: 'r5', fromCity: 'Mumbai', toCity: 'Delhi', departureTime: '06:00', arrivalTime: '18:00', duration: '12h 00m', price: 1500, busId: 'bus1', bus: buses[0], availableSeats: 25, bookedSeats: [2, 5, 8, 12, 15, 18, 20, 25, 28, 30, 33, 36], dayType: 'weekday' },
  { id: 'r6', fromCity: 'Mumbai', toCity: 'Delhi', departureTime: '08:00', arrivalTime: '20:00', duration: '12h 00m', price: 1400, busId: 'bus5', bus: buses[4], availableSeats: 28, bookedSeats: [3, 7, 10, 14, 22, 26, 32], dayType: 'all' },
  { id: 'r7', fromCity: 'Mumbai', toCity: 'Delhi', departureTime: '10:00', arrivalTime: '22:00', duration: '12h 00m', price: 1300, busId: 'bus8', bus: buses[7], availableSeats: 32, bookedSeats: [1, 6, 11, 16, 20, 29], dayType: 'weekday' },
  { id: 'r8', fromCity: 'Mumbai', toCity: 'Delhi', departureTime: '14:00', arrivalTime: '02:00', duration: '12h 00m', price: 1200, busId: 'bus9', bus: buses[8], availableSeats: 30, bookedSeats: [4, 9, 13, 19, 24, 31, 35], dayType: 'all' },
  { id: 'r9', fromCity: 'Mumbai', toCity: 'Delhi', departureTime: '20:00', arrivalTime: '08:00', duration: '12h 00m', price: 1100, busId: 'bus3', bus: buses[2], availableSeats: 33, bookedSeats: [2, 8, 14, 21, 28, 34], dayType: 'weekend' },
  { id: 'r10', fromCity: 'Mumbai', toCity: 'Delhi', departureTime: '22:00', arrivalTime: '10:00', duration: '12h 00m', price: 1050, busId: 'bus12', bus: buses[11], availableSeats: 29, bookedSeats: [5, 11, 18, 23, 30], dayType: 'all' },

  // Mumbai to Goa
  { id: 'r11', fromCity: 'Mumbai', toCity: 'Goa', departureTime: '20:00', arrivalTime: '06:00', duration: '10h 00m', price: 1200, busId: 'bus3', bus: buses[2], availableSeats: 20, bookedSeats: [2, 4, 6, 8, 11, 13, 16, 18, 21, 23, 26, 28, 31, 33, 34, 36], dayType: 'weekend' },
  { id: 'r12', fromCity: 'Mumbai', toCity: 'Goa', departureTime: '18:00', arrivalTime: '04:00', duration: '10h 00m', price: 1300, busId: 'bus7', bus: buses[6], availableSeats: 26, bookedSeats: [3, 9, 15, 22, 29, 32], dayType: 'weekend' },

  // Bangalore to Chennai
  { id: 'r13', fromCity: 'Bangalore', toCity: 'Chennai', departureTime: '07:00', arrivalTime: '13:00', duration: '6h 00m', price: 650, busId: 'bus4', bus: buses[3], availableSeats: 34, bookedSeats: [2, 9, 17, 24, 31, 39], dayType: 'weekday' },
  { id: 'r14', fromCity: 'Bangalore', toCity: 'Chennai', departureTime: '14:00', arrivalTime: '20:00', duration: '6h 00m', price: 700, busId: 'bus8', bus: buses[7], availableSeats: 37, bookedSeats: [5, 12, 18, 25], dayType: 'weekday' },
  { id: 'r15', fromCity: 'Bangalore', toCity: 'Chennai', departureTime: '20:00', arrivalTime: '02:00', duration: '6h 00m', price: 600, busId: 'bus11', bus: buses[10], availableSeats: 40, bookedSeats: [8, 15, 22, 30], dayType: 'all' },

  // Delhi to Jaipur
  { id: 'r16', fromCity: 'Delhi', toCity: 'Jaipur', departureTime: '05:30', arrivalTime: '11:00', duration: '5h 30m', price: 800, busId: 'bus5', bus: buses[4], availableSeats: 24, bookedSeats: [1, 3, 5, 9, 14, 17, 20, 23, 27, 29, 32, 35], dayType: 'weekday' },
  { id: 'r17', fromCity: 'Delhi', toCity: 'Jaipur', departureTime: '10:00', arrivalTime: '15:30', duration: '5h 30m', price: 750, busId: 'bus10', bus: buses[9], availableSeats: 28, bookedSeats: [2, 7, 11, 16, 21, 26, 31, 36], dayType: 'weekend' },
  { id: 'r18', fromCity: 'Delhi', toCity: 'Jaipur', departureTime: '16:00', arrivalTime: '21:30', duration: '5h 30m', price: 700, busId: 'bus13', bus: buses[12], availableSeats: 35, bookedSeats: [4, 10, 18, 24], dayType: 'weekday' },
  { id: 'r19', fromCity: 'Delhi', toCity: 'Jaipur', departureTime: '22:00', arrivalTime: '03:30', duration: '5h 30m', price: 650, busId: 'bus6', bus: buses[5], availableSeats: 42, bookedSeats: [6, 14, 22, 30], dayType: 'all' },

  // Delhi to Ahmedabad
  { id: 'r20', fromCity: 'Delhi', toCity: 'Ahmedabad', departureTime: '16:00', arrivalTime: '06:00', duration: '14h 00m', price: 1400, busId: 'bus3', bus: buses[2], availableSeats: 18, bookedSeats: [1, 2, 5, 8, 11, 14, 17, 20, 23, 24, 27, 29, 30, 32, 34, 35, 36], dayType: 'weekday' },
  { id: 'r21', fromCity: 'Delhi', toCity: 'Ahmedabad', departureTime: '18:00', arrivalTime: '08:00', duration: '14h 00m', price: 1350, busId: 'bus9', bus: buses[8], availableSeats: 22, bookedSeats: [3, 9, 15, 21, 28, 33], dayType: 'weekday' },
  { id: 'r22', fromCity: 'Delhi', toCity: 'Ahmedabad', departureTime: '20:00', arrivalTime: '10:00', duration: '14h 00m', price: 1300, busId: 'bus14', bus: buses[13], availableSeats: 25, bookedSeats: [2, 8, 14, 20, 26, 32], dayType: 'all' },

  // Pune to Mumbai (reverse)
  { id: 'r23', fromCity: 'Pune', toCity: 'Mumbai', departureTime: '14:00', arrivalTime: '18:00', duration: '4h 00m', price: 300, busId: 'bus6', bus: buses[5], availableSeats: 38, bookedSeats: [4, 11, 19, 27, 36, 42], dayType: 'weekday' },
  { id: 'r24', fromCity: 'Pune', toCity: 'Mumbai', departureTime: '08:00', arrivalTime: '12:00', duration: '4h 00m', price: 400, busId: 'bus2', bus: buses[1], availableSeats: 36, bookedSeats: [3, 10, 17, 24, 31, 38], dayType: 'weekday' },
  { id: 'r25', fromCity: 'Pune', toCity: 'Mumbai', departureTime: '20:00', arrivalTime: '00:00', duration: '4h 00m', price: 350, busId: 'bus12', bus: buses[11], availableSeats: 34, bookedSeats: [5, 12, 19, 26, 33], dayType: 'all' },

  // Delhi to Mumbai (reverse)
  { id: 'r26', fromCity: 'Delhi', toCity: 'Mumbai', departureTime: '07:00', arrivalTime: '19:00', duration: '12h 00m', price: 1100, busId: 'bus4', bus: buses[3], availableSeats: 32, bookedSeats: [2, 7, 14, 21, 28, 35], dayType: 'weekday' },
  { id: 'r27', fromCity: 'Delhi', toCity: 'Mumbai', departureTime: '09:00', arrivalTime: '21:00', duration: '12h 00m', price: 1200, busId: 'bus8', bus: buses[7], availableSeats: 29, bookedSeats: [3, 10, 17, 24, 31, 38], dayType: 'weekday' },
  { id: 'r28', fromCity: 'Delhi', toCity: 'Mumbai', departureTime: '15:00', arrivalTime: '03:00', duration: '12h 00m', price: 1300, busId: 'bus14', bus: buses[13], availableSeats: 26, bookedSeats: [4, 11, 18, 25, 32], dayType: 'all' },
  { id: 'r29', fromCity: 'Delhi', toCity: 'Mumbai', departureTime: '21:00', arrivalTime: '09:00', duration: '12h 00m', price: 1250, busId: 'bus5', bus: buses[4], availableSeats: 28, bookedSeats: [2, 8, 15, 22, 29], dayType: 'weekday' },

  // Hyderabad to Bangalore
  { id: 'r30', fromCity: 'Hyderabad', toCity: 'Bangalore', departureTime: '21:00', arrivalTime: '05:30', duration: '8h 30m', price: 950, busId: 'bus1', bus: buses[0], availableSeats: 26, bookedSeats: [2, 6, 10, 14, 18, 22, 26, 30, 34, 36], dayType: 'weekday' },
  { id: 'r31', fromCity: 'Hyderabad', toCity: 'Bangalore', departureTime: '08:00', arrivalTime: '16:30', duration: '8h 30m', price: 1000, busId: 'bus9', bus: buses[8], availableSeats: 30, bookedSeats: [3, 9, 15, 21, 27], dayType: 'weekday' },
  { id: 'r32', fromCity: 'Hyderabad', toCity: 'Bangalore', departureTime: '14:00', arrivalTime: '22:30', duration: '8h 30m', price: 900, busId: 'bus13', bus: buses[12], availableSeats: 35, bookedSeats: [5, 12, 19, 26, 33], dayType: 'all' },

  // Chennai to Hyderabad
  { id: 'r33', fromCity: 'Chennai', toCity: 'Hyderabad', departureTime: '18:00', arrivalTime: '04:00', duration: '10h 00m', price: 1100, busId: 'bus5', bus: buses[4], availableSeats: 22, bookedSeats: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 33, 35, 36], dayType: 'weekday' },
  { id: 'r34', fromCity: 'Chennai', toCity: 'Hyderabad', departureTime: '06:00', arrivalTime: '16:00', duration: '10h 00m', price: 1150, busId: 'bus10', bus: buses[9], availableSeats: 25, bookedSeats: [2, 8, 14, 20, 26, 32], dayType: 'weekday' },
  { id: 'r35', fromCity: 'Chennai', toCity: 'Hyderabad', departureTime: '20:00', arrivalTime: '06:00', duration: '10h 00m', price: 1000, busId: 'bus3', bus: buses[2], availableSeats: 32, bookedSeats: [3, 10, 17, 24, 31], dayType: 'all' },

  // Kolkata to Delhi
  { id: 'r36', fromCity: 'Kolkata', toCity: 'Delhi', departureTime: '12:00', arrivalTime: '08:00', duration: '20h 00m', price: 1800, busId: 'bus4', bus: buses[3], availableSeats: 30, bookedSeats: [3, 8, 13, 18, 23, 28, 33, 37, 39, 40], dayType: 'all' },
  { id: 'r37', fromCity: 'Kolkata', toCity: 'Delhi', departureTime: '14:00', arrivalTime: '10:00', duration: '20h 00m', price: 1750, busId: 'bus1', bus: buses[0], availableSeats: 28, bookedSeats: [2, 7, 12, 17, 22, 27, 32], dayType: 'weekday' },
  { id: 'r38', fromCity: 'Kolkata', toCity: 'Delhi', departureTime: '20:00', arrivalTime: '16:00', duration: '20h 00m', price: 1700, busId: 'bus9', bus: buses[8], availableSeats: 32, bookedSeats: [4, 11, 18, 25, 32], dayType: 'weekday' },

  // Goa to Mumbai (reverse)
  { id: 'r39', fromCity: 'Goa', toCity: 'Mumbai', departureTime: '14:00', arrivalTime: '00:00', duration: '10h 00m', price: 1250, busId: 'bus7', bus: buses[6], availableSeats: 24, bookedSeats: [2, 6, 10, 14, 18, 22, 26, 28, 30, 33, 35], dayType: 'weekend' },
  { id: 'r40', fromCity: 'Goa', toCity: 'Mumbai', departureTime: '16:00', arrivalTime: '02:00', duration: '10h 00m', price: 1200, busId: 'bus12', bus: buses[11], availableSeats: 28, bookedSeats: [3, 9, 15, 21, 27], dayType: 'weekend' },

  // Jaipur to Delhi (reverse)
  { id: 'r41', fromCity: 'Jaipur', toCity: 'Delhi', departureTime: '06:00', arrivalTime: '11:30', duration: '5h 30m', price: 750, busId: 'bus2', bus: buses[1], availableSeats: 36, bookedSeats: [2, 8, 14, 20, 26, 32, 38], dayType: 'weekday' },
  { id: 'r42', fromCity: 'Jaipur', toCity: 'Delhi', departureTime: '11:00', arrivalTime: '16:30', duration: '5h 30m', price: 800, busId: 'bus14', bus: buses[13], availableSeats: 33, bookedSeats: [3, 10, 17, 24, 31], dayType: 'weekend' },
  { id: 'r43', fromCity: 'Jaipur', toCity: 'Delhi', departureTime: '19:00', arrivalTime: '00:30', duration: '5h 30m', price: 700, busId: 'bus6', bus: buses[5], availableSeats: 39, bookedSeats: [5, 12, 19], dayType: 'weekday' },

  // Ahmedabad to Delhi (reverse)
  { id: 'r44', fromCity: 'Ahmedabad', toCity: 'Delhi', departureTime: '08:00', arrivalTime: '22:00', duration: '14h 00m', price: 1350, busId: 'bus10', bus: buses[9], availableSeats: 26, bookedSeats: [3, 9, 15, 21, 27, 33], dayType: 'weekday' },
  { id: 'r45', fromCity: 'Ahmedabad', toCity: 'Delhi', departureTime: '10:00', arrivalTime: '00:00', duration: '14h 00m', price: 1400, busId: 'bus7', bus: buses[6], availableSeats: 24, bookedSeats: [2, 8, 14, 20, 26, 32, 36], dayType: 'weekday' },
  { id: 'r46', fromCity: 'Ahmedabad', toCity: 'Delhi', departureTime: '20:00', arrivalTime: '10:00', duration: '14h 00m', price: 1300, busId: 'bus5', bus: buses[4], availableSeats: 29, bookedSeats: [4, 11, 18, 25], dayType: 'all' },

  // Chennai to Bangalore (reverse)
  { id: 'r47', fromCity: 'Chennai', toCity: 'Bangalore', departureTime: '09:00', arrivalTime: '15:00', duration: '6h 00m', price: 700, busId: 'bus2', bus: buses[1], availableSeats: 35, bookedSeats: [2, 9, 16, 23, 30], dayType: 'weekday' },
  { id: 'r48', fromCity: 'Chennai', toCity: 'Bangalore', departureTime: '15:00', arrivalTime: '21:00', duration: '6h 00m', price: 650, busId: 'bus13', bus: buses[12], availableSeats: 38, bookedSeats: [4, 11, 18, 25, 32], dayType: 'weekday' },

  // Bangalore to Hyderabad (reverse)
  { id: 'r49', fromCity: 'Bangalore', toCity: 'Hyderabad', departureTime: '06:00', arrivalTime: '14:30', duration: '8h 30m', price: 950, busId: 'bus8', bus: buses[7], availableSeats: 31, bookedSeats: [2, 8, 15, 22, 29, 36], dayType: 'weekday' },
  { id: 'r50', fromCity: 'Bangalore', toCity: 'Hyderabad', departureTime: '16:00', arrivalTime: '00:30', duration: '8h 30m', price: 900, busId: 'bus11', bus: buses[10], availableSeats: 39, bookedSeats: [5, 12, 19], dayType: 'all' },

  // New routes for new cities
  // Delhi to Chandigarh
  { id: 'r51', fromCity: 'Delhi', toCity: 'Chandigarh', departureTime: '06:00', arrivalTime: '10:30', duration: '4h 30m', price: 600, busId: 'bus16', bus: buses[15], availableSeats: 32, bookedSeats: [3, 8, 15, 22, 29], dayType: 'weekday' },
  { id: 'r52', fromCity: 'Delhi', toCity: 'Chandigarh', departureTime: '15:00', arrivalTime: '19:30', duration: '4h 30m', price: 550, busId: 'bus18', bus: buses[17], availableSeats: 36, bookedSeats: [2, 10, 18, 26], dayType: 'weekday' },
  { id: 'r53', fromCity: 'Chandigarh', toCity: 'Delhi', departureTime: '07:00', arrivalTime: '11:30', duration: '4h 30m', price: 600, busId: 'bus20', bus: buses[19], availableSeats: 34, bookedSeats: [4, 12, 20, 28], dayType: 'all' },
  
  // Delhi to Amritsar
  { id: 'r54', fromCity: 'Delhi', toCity: 'Amritsar', departureTime: '08:00', arrivalTime: '20:00', duration: '12h 00m', price: 1100, busId: 'bus24', bus: buses[23], availableSeats: 38, bookedSeats: [2, 8, 15, 22], dayType: 'weekday' },
  { id: 'r55', fromCity: 'Amritsar', toCity: 'Delhi', departureTime: '06:00', arrivalTime: '18:00', duration: '12h 00m', price: 1100, busId: 'bus25', bus: buses[24], availableSeats: 32, bookedSeats: [3, 10, 17, 24, 31], dayType: 'weekday' },
  
  // Chandigarh to Manali
  { id: 'r56', fromCity: 'Chandigarh', toCity: 'Manali', departureTime: '06:00', arrivalTime: '18:00', duration: '12h 00m', price: 900, busId: 'bus19', bus: buses[18], availableSeats: 40, bookedSeats: [5, 12, 19, 26], dayType: 'weekend' },
  { id: 'r57', fromCity: 'Manali', toCity: 'Chandigarh', departureTime: '08:00', arrivalTime: '20:00', duration: '12h 00m', price: 900, busId: 'bus22', bus: buses[21], availableSeats: 38, bookedSeats: [2, 9, 16, 23, 30], dayType: 'weekend' },
  
  // Delhi to Agra
  { id: 'r58', fromCity: 'Delhi', toCity: 'Agra', departureTime: '07:00', arrivalTime: '12:00', duration: '5h 00m', price: 500, busId: 'bus26', bus: buses[25], availableSeats: 37, bookedSeats: [3, 10, 17, 24, 31, 38], dayType: 'weekend' },
  { id: 'r59', fromCity: 'Agra', toCity: 'Delhi', departureTime: '15:00', arrivalTime: '20:00', duration: '5h 00m', price: 500, busId: 'bus21', bus: buses[20], availableSeats: 39, bookedSeats: [4, 12, 20], dayType: 'weekend' },
  
  // Lucknow routes
  { id: 'r60', fromCity: 'Delhi', toCity: 'Lucknow', departureTime: '06:00', arrivalTime: '14:00', duration: '8h 00m', price: 800, busId: 'bus23', bus: buses[22], availableSeats: 33, bookedSeats: [2, 8, 15, 22, 29], dayType: 'weekday' },
  { id: 'r61', fromCity: 'Lucknow', toCity: 'Delhi', departureTime: '16:00', arrivalTime: '00:00', duration: '8h 00m', price: 800, busId: 'bus28', bus: buses[27], availableSeats: 31, bookedSeats: [3, 10, 17, 24, 31], dayType: 'weekday' },
  
  // Indore routes
  { id: 'r62', fromCity: 'Mumbai', toCity: 'Indore', departureTime: '08:00', arrivalTime: '20:00', duration: '12h 00m', price: 1200, busId: 'bus17', bus: buses[16], availableSeats: 48, bookedSeats: [5, 15, 25, 35, 45], dayType: 'weekday' },
  { id: 'r63', fromCity: 'Indore', toCity: 'Mumbai', departureTime: '10:00', arrivalTime: '22:00', duration: '12h 00m', price: 1200, busId: 'bus29', bus: buses[28], availableSeats: 38, bookedSeats: [2, 10, 18, 26, 34], dayType: 'weekday' },
  { id: 'r64', fromCity: 'Bhopal', toCity: 'Indore', departureTime: '08:00', arrivalTime: '12:00', duration: '4h 00m', price: 500, busId: 'bus14', bus: buses[13], availableSeats: 35, bookedSeats: [3, 12, 21, 30], dayType: 'all' },
  
  // Bhopal routes
  { id: 'r65', fromCity: 'Delhi', toCity: 'Bhopal', departureTime: '06:00', arrivalTime: '18:00', duration: '12h 00m', price: 1000, busId: 'bus30', bus: buses[29], availableSeats: 33, bookedSeats: [2, 8, 15, 22, 29], dayType: 'weekday' },
  { id: 'r66', fromCity: 'Bhopal', toCity: 'Delhi', departureTime: '18:00', arrivalTime: '06:00', duration: '12h 00m', price: 1000, busId: 'bus6', bus: buses[5], availableSeats: 44, bookedSeats: [5, 15, 25, 35], dayType: 'weekday' },
  
  // Nagpur routes
  { id: 'r67', fromCity: 'Mumbai', toCity: 'Nagpur', departureTime: '10:00', arrivalTime: '22:00', duration: '12h 00m', price: 1000, busId: 'bus4', bus: buses[3], availableSeats: 38, bookedSeats: [3, 10, 17, 24, 31, 38], dayType: 'weekday' },
  { id: 'r68', fromCity: 'Nagpur', toCity: 'Mumbai', departureTime: '08:00', arrivalTime: '20:00', duration: '12h 00m', price: 1000, busId: 'bus10', bus: buses[9], availableSeats: 36, bookedSeats: [2, 9, 16, 23, 30], dayType: 'weekday' },
  { id: 'r69', fromCity: 'Nagpur', toCity: 'Nashik', departureTime: '07:00', arrivalTime: '13:00', duration: '6h 00m', price: 600, busId: 'bus7', bus: buses[6], availableSeats: 34, bookedSeats: [4, 12, 20, 28], dayType: 'all' },
  
  // Nashik routes
  { id: 'r70', fromCity: 'Mumbai', toCity: 'Nashik', departureTime: '08:00', arrivalTime: '13:00', duration: '5h 00m', price: 600, busId: 'bus2', bus: buses[1], availableSeats: 38, bookedSeats: [3, 10, 17, 24, 31], dayType: 'weekday' },
  { id: 'r71', fromCity: 'Nashik', toCity: 'Mumbai', departureTime: '14:00', arrivalTime: '19:00', duration: '5h 00m', price: 600, busId: 'bus15', bus: buses[14], availableSeats: 39, bookedSeats: [5, 12, 19], dayType: 'weekday' },
  { id: 'r72', fromCity: 'Nashik', toCity: 'Nagpur', departureTime: '14:00', arrivalTime: '20:00', duration: '6h 00m', price: 600, busId: 'bus9', bus: buses[8], availableSeats: 33, bookedSeats: [2, 8, 15, 22, 29], dayType: 'all' },
  
  // Ahmedabad to Vadodara & Surat
  { id: 'r73', fromCity: 'Ahmedabad', toCity: 'Vadodara', departureTime: '07:00', arrivalTime: '10:00', duration: '3h 00m', price: 400, busId: 'bus11', bus: buses[10], availableSeats: 42, bookedSeats: [5, 15, 25, 35], dayType: 'weekday' },
  { id: 'r74', fromCity: 'Vadodara', toCity: 'Ahmedabad', departureTime: '11:00', arrivalTime: '14:00', duration: '3h 00m', price: 400, busId: 'bus3', bus: buses[2], availableSeats: 35, bookedSeats: [2, 10, 18, 26, 34], dayType: 'weekday' },
  { id: 'r75', fromCity: 'Ahmedabad', toCity: 'Surat', departureTime: '08:00', arrivalTime: '13:00', duration: '5h 00m', price: 500, busId: 'bus16', bus: buses[15], availableSeats: 34, bookedSeats: [3, 9, 15, 21, 27], dayType: 'weekday' },
  { id: 'r76', fromCity: 'Surat', toCity: 'Ahmedabad', departureTime: '14:00', arrivalTime: '19:00', duration: '5h 00m', price: 500, busId: 'bus12', bus: buses[11], availableSeats: 35, bookedSeats: [2, 8, 14, 20, 26, 32], dayType: 'weekday' },
  
  // Bangalore to Coimbatore
  { id: 'r77', fromCity: 'Bangalore', toCity: 'Coimbatore', departureTime: '06:00', arrivalTime: '11:00', duration: '5h 00m', price: 600, busId: 'bus14', bus: buses[13], availableSeats: 34, bookedSeats: [3, 10, 17, 24, 31], dayType: 'weekday' },
  { id: 'r78', fromCity: 'Coimbatore', toCity: 'Bangalore', departureTime: '14:00', arrivalTime: '19:00', duration: '5h 00m', price: 600, busId: 'bus20', bus: buses[19], availableSeats: 35, bookedSeats: [2, 9, 16, 23, 30], dayType: 'weekday' },
  
  // Chennai to Kochi
  { id: 'r79', fromCity: 'Chennai', toCity: 'Kochi', departureTime: '08:00', arrivalTime: '18:00', duration: '10h 00m', price: 950, busId: 'bus1', bus: buses[0], availableSeats: 30, bookedSeats: [2, 8, 15, 22, 29], dayType: 'weekend' },
  { id: 'r80', fromCity: 'Kochi', toCity: 'Chennai', departureTime: '09:00', arrivalTime: '19:00', duration: '10h 00m', price: 950, busId: 'bus5', bus: buses[4], availableSeats: 32, bookedSeats: [3, 10, 17, 24], dayType: 'weekend' },
  
  // Kochi to Thiruvananthapuram
  { id: 'r81', fromCity: 'Kochi', toCity: 'Thiruvananthapuram', departureTime: '07:00', arrivalTime: '13:00', duration: '6h 00m', price: 700, busId: 'bus24', bus: buses[23], availableSeats: 38, bookedSeats: [2, 8, 15, 22, 29], dayType: 'weekend' },
  { id: 'r82', fromCity: 'Thiruvananthapuram', toCity: 'Kochi', departureTime: '14:00', arrivalTime: '20:00', duration: '6h 00m', price: 700, busId: 'bus27', bus: buses[26], availableSeats: 42, bookedSeats: [3, 10, 17, 24, 31], dayType: 'weekend' },
  
  // Visakhapatnam routes
  { id: 'r83', fromCity: 'Bangalore', toCity: 'Visakhapatnam', departureTime: '08:00', arrivalTime: '22:00', duration: '14h 00m', price: 1200, busId: 'bus25', bus: buses[24], availableSeats: 33, bookedSeats: [2, 9, 16, 23, 30], dayType: 'all' },
  { id: 'r84', fromCity: 'Visakhapatnam', toCity: 'Bangalore', departureTime: '06:00', arrivalTime: '20:00', duration: '14h 00m', price: 1200, busId: 'bus4', bus: buses[3], availableSeats: 35, bookedSeats: [3, 10, 17, 24, 31], dayType: 'all' },
  { id: 'r85', fromCity: 'Visakhapatnam', toCity: 'Hyderabad', departureTime: '08:00', arrivalTime: '14:00', duration: '6h 00m', price: 700, busId: 'bus8', bus: buses[7], availableSeats: 38, bookedSeats: [2, 10, 18, 26], dayType: 'weekday' },
  
  // More cross-connections for better coverage
  { id: 'r86', fromCity: 'Kolkata', toCity: 'Lucknow', departureTime: '12:00', arrivalTime: '08:00', duration: '20h 00m', price: 1300, busId: 'bus9', bus: buses[8], availableSeats: 32, bookedSeats: [2, 8, 15, 22, 29], dayType: 'all' },
  { id: 'r87', fromCity: 'Lucknow', toCity: 'Kolkata', departureTime: '10:00', arrivalTime: '06:00', duration: '20h 00m', price: 1300, busId: 'bus15', bus: buses[14], availableSeats: 38, bookedSeats: [3, 10, 17, 24, 31], dayType: 'all' },
  
  { id: 'r88', fromCity: 'Pune', toCity: 'Nashik', departureTime: '08:00', arrivalTime: '12:00', duration: '4h 00m', price: 500, busId: 'bus17', bus: buses[16], availableSeats: 48, bookedSeats: [4, 12, 20, 28, 36, 44], dayType: 'weekday' },
  { id: 'r89', fromCity: 'Nashik', toCity: 'Pune', departureTime: '13:00', arrivalTime: '17:00', duration: '4h 00m', price: 500, busId: 'bus21', bus: buses[20], availableSeats: 39, bookedSeats: [2, 10, 18, 26], dayType: 'weekday' },
  
  { id: 'r90', fromCity: 'Hyderabad', toCity: 'Visakhapatnam', departureTime: '09:00', arrivalTime: '15:00', duration: '6h 00m', price: 700, busId: 'bus26', bus: buses[25], availableSeats: 38, bookedSeats: [3, 10, 17, 24, 31], dayType: 'weekday' },
  { id: 'r91', fromCity: 'Pune', toCity: 'Indore', departureTime: '10:00', arrivalTime: '18:00', duration: '8h 00m', price: 600, busId: 'bus28', bus: buses[27], availableSeats: 35, bookedSeats: [2, 9, 16, 23, 30], dayType: 'weekday' },
  { id: 'r92', fromCity: 'Indore', toCity: 'Pune', departureTime: '08:00', arrivalTime: '16:00', duration: '8h 00m', price: 600, busId: 'bus13', bus: buses[12], availableSeats: 38, bookedSeats: [3, 11, 19, 27], dayType: 'weekday' },

  // Hill Station Routes
  // Bangalore to Mysore & Ooty
  { id: 'r93', fromCity: 'Bangalore', toCity: 'Mysore', departureTime: '07:00', arrivalTime: '11:00', duration: '4h 00m', price: 450, busId: 'bus31', bus: buses[30], availableSeats: 35, bookedSeats: [4, 12, 20], dayType: 'weekend' },
  { id: 'r94', fromCity: 'Mysore', toCity: 'Bangalore', departureTime: '16:00', arrivalTime: '20:00', duration: '4h 00m', price: 450, busId: 'bus32', bus: buses[31], availableSeats: 36, bookedSeats: [3, 10], dayType: 'weekend' },
  { id: 'r95', fromCity: 'Bangalore', toCity: 'Ooty', departureTime: '06:00', arrivalTime: '14:00', duration: '8h 00m', price: 700, busId: 'bus35', bus: buses[34], availableSeats: 40, bookedSeats: [5, 15, 25], dayType: 'weekend' },
  { id: 'r96', fromCity: 'Ooty', toCity: 'Bangalore', departureTime: '15:00', arrivalTime: '23:00', duration: '8h 00m', price: 700, busId: 'bus40', bus: buses[39], availableSeats: 38, bookedSeats: [2, 10, 18], dayType: 'weekend' },

  // Chennai to Mysore & Ooty
  { id: 'r97', fromCity: 'Chennai', toCity: 'Ooty', departureTime: '08:00', arrivalTime: '17:00', duration: '9h 00m', price: 800, busId: 'bus34', bus: buses[33], availableSeats: 37, bookedSeats: [3, 11, 19, 27], dayType: 'weekend' },
  { id: 'r98', fromCity: 'Ooty', toCity: 'Chennai', departureTime: '09:00', arrivalTime: '18:00', duration: '9h 00m', price: 800, busId: 'bus38', bus: buses[37], availableSeats: 36, bookedSeats: [4, 12, 20], dayType: 'weekend' },
  { id: 'r99', fromCity: 'Coimbatore', toCity: 'Ooty', departureTime: '08:00', arrivalTime: '12:00', duration: '4h 00m', price: 350, busId: 'bus31', bus: buses[30], availableSeats: 39, bookedSeats: [2, 8], dayType: 'all' },
  { id: 'r100', fromCity: 'Ooty', toCity: 'Coimbatore', departureTime: '14:00', arrivalTime: '18:00', duration: '4h 00m', price: 350, busId: 'bus40', bus: buses[39], availableSeats: 40, bookedSeats: [5], dayType: 'all' },

  // Delhi to Hill Stations
  { id: 'r101', fromCity: 'Delhi', toCity: 'Shimla', departureTime: '07:00', arrivalTime: '18:00', duration: '11h 00m', price: 950, busId: 'bus35', bus: buses[34], availableSeats: 42, bookedSeats: [4, 12, 20, 28], dayType: 'weekend' },
  { id: 'r102', fromCity: 'Shimla', toCity: 'Delhi', departureTime: '08:00', arrivalTime: '19:00', duration: '11h 00m', price: 950, busId: 'bus31', bus: buses[30], availableSeats: 38, bookedSeats: [3, 10, 17, 24], dayType: 'weekend' },
  { id: 'r103', fromCity: 'Delhi', toCity: 'Rishikesh', departureTime: '06:00', arrivalTime: '11:00', duration: '5h 00m', price: 600, busId: 'bus33', bus: buses[32], availableSeats: 33, bookedSeats: [2, 10, 18], dayType: 'all' },
  { id: 'r104', fromCity: 'Rishikesh', toCity: 'Delhi', departureTime: '17:00', arrivalTime: '22:00', duration: '5h 00m', price: 600, busId: 'bus36', bus: buses[35], availableSeats: 32, bookedSeats: [3, 11, 19], dayType: 'all' },
  { id: 'r105', fromCity: 'Delhi', toCity: 'Dehradun', departureTime: '07:00', arrivalTime: '13:00', duration: '6h 00m', price: 700, busId: 'bus31', bus: buses[30], availableSeats: 36, bookedSeats: [2, 9, 16], dayType: 'all' },
  { id: 'r106', fromCity: 'Dehradun', toCity: 'Delhi', departureTime: '15:00', arrivalTime: '21:00', duration: '6h 00m', price: 700, busId: 'bus32', bus: buses[31], availableSeats: 37, bookedSeats: [4, 12], dayType: 'all' },
  
  // Chandigarh Hill Stations
  { id: 'r107', fromCity: 'Chandigarh', toCity: 'Shimla', departureTime: '08:00', arrivalTime: '14:00', duration: '6h 00m', price: 550, busId: 'bus35', bus: buses[34], availableSeats: 44, bookedSeats: [6, 14, 22], dayType: 'all' },
  { id: 'r108', fromCity: 'Shimla', toCity: 'Chandigarh', departureTime: '15:00', arrivalTime: '21:00', duration: '6h 00m', price: 550, busId: 'bus19', bus: buses[18], availableSeats: 42, bookedSeats: [3, 11, 19], dayType: 'all' },
  { id: 'r109', fromCity: 'Chandigarh', toCity: 'Dehradun', departureTime: '07:00', arrivalTime: '14:00', duration: '7h 00m', price: 650, busId: 'bus31', bus: buses[30], availableSeats: 38, bookedSeats: [2, 10, 18, 26], dayType: 'all' },

  // Rajasthan Tourist Routes
  { id: 'r110', fromCity: 'Jaipur', toCity: 'Udaipur', departureTime: '08:00', arrivalTime: '20:00', duration: '12h 00m', price: 1000, busId: 'bus32', bus: buses[31], availableSeats: 35, bookedSeats: [3, 10, 17, 24], dayType: 'weekend' },
  { id: 'r111', fromCity: 'Udaipur', toCity: 'Jaipur', departureTime: '08:00', arrivalTime: '20:00', duration: '12h 00m', price: 1000, busId: 'bus37', bus: buses[36], availableSeats: 36, bookedSeats: [2, 9, 16], dayType: 'weekend' },
  { id: 'r112', fromCity: 'Jaipur', toCity: 'Jodhpur', departureTime: '10:00', arrivalTime: '22:00', duration: '12h 00m', price: 900, busId: 'bus37', bus: buses[36], availableSeats: 38, bookedSeats: [4, 12, 20], dayType: 'weekend' },
  { id: 'r113', fromCity: 'Jodhpur', toCity: 'Jaipur', departureTime: '09:00', arrivalTime: '21:00', duration: '12h 00m', price: 900, busId: 'bus32', bus: buses[31], availableSeats: 37, bookedSeats: [2, 10, 18], dayType: 'weekend' },
  { id: 'r114', fromCity: 'Jaipur', toCity: 'Ajmer', departureTime: '08:00', arrivalTime: '13:00', duration: '5h 00m', price: 550, busId: 'bus40', bus: buses[39], availableSeats: 39, bookedSeats: [3, 11, 19], dayType: 'weekend' },
  { id: 'r115', fromCity: 'Ajmer', toCity: 'Jaipur', departureTime: '14:00', arrivalTime: '19:00', duration: '5h 00m', price: 550, busId: 'bus31', bus: buses[30], availableSeats: 40, bookedSeats: [2, 9], dayType: 'weekend' },
  { id: 'r116', fromCity: 'Jaipur', toCity: 'Pushkar', departureTime: '09:00', arrivalTime: '14:00', duration: '5h 00m', price: 500, busId: 'bus38', bus: buses[37], availableSeats: 38, bookedSeats: [4, 12, 20], dayType: 'weekend' },
  { id: 'r117', fromCity: 'Pushkar', toCity: 'Jaipur', departureTime: '15:00', arrivalTime: '20:00', duration: '5h 00m', price: 500, busId: 'bus40', bus: buses[39], availableSeats: 39, bookedSeats: [2, 10], dayType: 'weekend' },
  { id: 'r118', fromCity: 'Jodhpur', toCity: 'Jaisalmer', departureTime: '08:00', arrivalTime: '16:00', duration: '8h 00m', price: 700, busId: 'bus37', bus: buses[36], availableSeats: 36, bookedSeats: [3, 11, 19, 27], dayType: 'weekday' },
  { id: 'r119', fromCity: 'Jaisalmer', toCity: 'Jodhpur', departureTime: '09:00', arrivalTime: '17:00', duration: '8h 00m', price: 700, busId: 'bus32', bus: buses[31], availableSeats: 37, bookedSeats: [2, 10, 18], dayType: 'weekday' },

  // Varanasi Routes
  { id: 'r120', fromCity: 'Delhi', toCity: 'Varanasi', departureTime: '18:00', arrivalTime: '08:00', duration: '14h 00m', price: 1200, busId: 'bus33', bus: buses[32], availableSeats: 32, bookedSeats: [2, 8, 15, 22, 29], dayType: 'all' },
  { id: 'r121', fromCity: 'Varanasi', toCity: 'Delhi', departureTime: '20:00', arrivalTime: '10:00', duration: '14h 00m', price: 1200, busId: 'bus36', bus: buses[35], availableSeats: 34, bookedSeats: [3, 10, 17, 24], dayType: 'all' },
  { id: 'r122', fromCity: 'Lucknow', toCity: 'Varanasi', departureTime: '08:00', arrivalTime: '15:00', duration: '7h 00m', price: 700, busId: 'bus31', bus: buses[30], availableSeats: 37, bookedSeats: [2, 10, 18], dayType: 'all' },
  { id: 'r123', fromCity: 'Varanasi', toCity: 'Lucknow', departureTime: '16:00', arrivalTime: '23:00', duration: '7h 00m', price: 700, busId: 'bus40', bus: buses[39], availableSeats: 38, bookedSeats: [3, 11], dayType: 'all' },

  // Darjeeling Routes
  { id: 'r124', fromCity: 'Kolkata', toCity: 'Darjeeling', departureTime: '07:00', arrivalTime: '18:00', duration: '11h 00m', price: 850, busId: 'bus35', bus: buses[34], availableSeats: 42, bookedSeats: [4, 12, 20], dayType: 'weekend' },
  { id: 'r125', fromCity: 'Darjeeling', toCity: 'Kolkata', departureTime: '08:00', arrivalTime: '19:00', duration: '11h 00m', price: 850, busId: 'bus31', bus: buses[30], availableSeats: 40, bookedSeats: [2, 10, 18], dayType: 'weekend' },

  // Mount Abu Routes
  { id: 'r126', fromCity: 'Ahmedabad', toCity: 'Mount Abu', departureTime: '07:00', arrivalTime: '16:00', duration: '9h 00m', price: 800, busId: 'bus32', bus: buses[31], availableSeats: 38, bookedSeats: [3, 11, 19, 27], dayType: 'weekend' },
  { id: 'r127', fromCity: 'Mount Abu', toCity: 'Ahmedabad', departureTime: '08:00', arrivalTime: '17:00', duration: '9h 00m', price: 800, busId: 'bus37', bus: buses[36], availableSeats: 36, bookedSeats: [2, 10, 18], dayType: 'weekend' },
  { id: 'r128', fromCity: 'Jaipur', toCity: 'Mount Abu', departureTime: '08:00', arrivalTime: '19:00', duration: '11h 00m', price: 900, busId: 'bus40', bus: buses[39], availableSeats: 37, bookedSeats: [4, 12, 20], dayType: 'weekend' },

  // Udaipur to other destinations
  { id: 'r129', fromCity: 'Udaipur', toCity: 'Ahmedabad', departureTime: '10:00', arrivalTime: '19:00', duration: '9h 00m', price: 800, busId: 'bus34', bus: buses[33], availableSeats: 38, bookedSeats: [2, 10, 18], dayType: 'weekend' },
  { id: 'r130', fromCity: 'Ahmedabad', toCity: 'Udaipur', departureTime: '10:00', arrivalTime: '19:00', duration: '9h 00m', price: 800, busId: 'bus38', bus: buses[37], availableSeats: 37, bookedSeats: [3, 11, 19], dayType: 'weekend' },

  // Rishikesh to Dehradun
  { id: 'r131', fromCity: 'Rishikesh', toCity: 'Dehradun', departureTime: '10:00', arrivalTime: '15:00', duration: '5h 00m', price: 500, busId: 'bus33', bus: buses[32], availableSeats: 35, bookedSeats: [2, 10], dayType: 'all' },
  { id: 'r132', fromCity: 'Dehradun', toCity: 'Rishikesh', departureTime: '16:00', arrivalTime: '21:00', duration: '5h 00m', price: 500, busId: 'bus39', bus: buses[38], availableSeats: 36, bookedSeats: [3, 11, 19], dayType: 'all' },

  // Mysore to Coorg
  { id: 'r133', fromCity: 'Mysore', toCity: 'Coimbatore', departureTime: '08:00', arrivalTime: '16:00', duration: '8h 00m', price: 650, busId: 'bus31', bus: buses[30], availableSeats: 39, bookedSeats: [2, 10, 18], dayType: 'weekday' },
  { id: 'r134', fromCity: 'Coimbatore', toCity: 'Mysore', departureTime: '10:00', arrivalTime: '18:00', duration: '8h 00m', price: 650, busId: 'bus40', bus: buses[39], availableSeats: 38, bookedSeats: [3, 11, 19], dayType: 'weekday' },

  // Kochi to Vagamon/Munnar
  { id: 'r135', fromCity: 'Kochi', toCity: 'Thiruvananthapuram', departureTime: '08:00', arrivalTime: '13:00', duration: '5h 00m', price: 550, busId: 'bus39', bus: buses[38], availableSeats: 40, bookedSeats: [3, 10, 17], dayType: 'all' },
  { id: 'r136', fromCity: 'Thiruvananthapuram', toCity: 'Kochi', departureTime: '14:00', arrivalTime: '19:00', duration: '5h 00m', price: 550, busId: 'bus34', bus: buses[33], availableSeats: 41, bookedSeats: [2, 9], dayType: 'all' },

  // Additional cross-connections
  { id: 'r137', fromCity: 'Hyderabad', toCity: 'Nagpur', departureTime: '10:00', arrivalTime: '20:00', duration: '10h 00m', price: 900, busId: 'bus36', bus: buses[35], availableSeats: 34, bookedSeats: [4, 12, 20, 28], dayType: 'all' },
  { id: 'r138', fromCity: 'Nagpur', toCity: 'Hyderabad', departureTime: '12:00', arrivalTime: '22:00', duration: '10h 00m', price: 900, busId: 'bus33', bus: buses[32], availableSeats: 35, bookedSeats: [2, 10, 18], dayType: 'all' },

  // Surat to Vadodara to Ahmedabad
  { id: 'r139', fromCity: 'Surat', toCity: 'Vadodara', departureTime: '08:00', arrivalTime: '11:00', duration: '3h 00m', price: 350, busId: 'bus40', bus: buses[39], availableSeats: 39, bookedSeats: [2, 10], dayType: 'all' },
  { id: 'r140', fromCity: 'Vadodara', toCity: 'Surat', departureTime: '15:00', arrivalTime: '18:00', duration: '3h 00m', price: 350, busId: 'bus31', bus: buses[30], availableSeats: 40, bookedSeats: [3], dayType: 'all' },
];

export function generateBookingId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'SB';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Get day type from a date (weekday or weekend)
export function getDayType(date: string): DayType {
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  return (dayOfWeek === 0 || dayOfWeek === 6) ? 'weekend' : 'weekday';
}

// Search routes filtered by date
export function searchRoutes(from: string, to: string, date?: string): Route[] {
  let filtered = routes.filter(
    r => r.fromCity.toLowerCase() === from.toLowerCase() &&
         r.toCity.toLowerCase() === to.toLowerCase()
  );

  // Filter by date if provided
  if (date) {
    const dayType = getDayType(date);
    filtered = filtered.filter(r => r.dayType === dayType || r.dayType === 'all');
  }

  return filtered;
}

export function getRouteById(id: string): Route | undefined {
  return routes.find(r => r.id === id);
}

export function getLocationByCity(city: string): Location | undefined {
  return locations.find(l => l.city.toLowerCase() === city.toLowerCase());
}

export function getRoutesByBusId(busId: string): Route[] {
  return routes.filter(r => r.busId === busId);
}

export function getUniqueBusDestinations(busId: string): Array<{ from: string; to: string }> {
  const busRoutes = getRoutesByBusId(busId);
  const destinationMap = new Map<string, Set<string>>();
  
  busRoutes.forEach(route => {
    if (!destinationMap.has(route.fromCity)) {
      destinationMap.set(route.fromCity, new Set());
    }
    destinationMap.get(route.fromCity)!.add(route.toCity);
  });

  const destinations: Array<{ from: string; to: string }> = [];
  destinationMap.forEach((toSet, fromCity) => {
    toSet.forEach(toCity => {
      destinations.push({ from: fromCity, to: toCity });
    });
  });

  return destinations.sort((a, b) => {
    if (a.from === b.from) return a.to.localeCompare(b.to);
    return a.from.localeCompare(b.from);
  });
}

// Populate route destinations for each bus
buses.forEach(bus => {
  bus.routeDestinations = getUniqueBusDestinations(bus.id);
});