// Mock data – replace with API later
export const BRANDS = ["Toyota","Honda","Ford","Tesla","BMW","Mercedes","Hyundai","Kia","Nissan","Audi"];

export const CARS = [
  {
    id: "tesla-model-3-2024",
    title: "2024 Tesla Model 3 Long Range",
    brand: "Tesla",
    price: 42990,
    year: 2024,
    mileage: 1200,
    body: "Sedan",
    engine: "Electric",
    transmission: "Automatic",
    color: "Pearl White",
    horsepower: 393,
    fuelEconomy: { city: 134, highway: 126, unit: "MPGe" },
    features: ["Autopilot","Heated seats","Wireless CarPlay","Premium audio"],
    safety: { rating: 5, agency: "NHTSA" },
    popularity: 92,
    images: ["/assets/images/tesla3/1.jpg","/assets/images/tesla3/2.jpg","/assets/images/tesla3/3.jpg"],
    video: "https://www.youtube.com/embed/someVideoId",
    seller: { name: "Raizer Direct", email: "sales@raizer.example", phone: "+1 555 1100" },
    vin: "5YJ3E1EA7JF000001",
    professionalScore: 8.9,
  },
  {
    id: "toyota-corolla-2023",
    title: "2023 Toyota Corolla SE",
    brand: "Toyota",
    price: 23990,
    year: 2023,
    mileage: 9800,
    body: "Sedan",
    engine: "Gas",
    transmission: "Automatic",
    color: "Black Sand Pearl",
    horsepower: 169,
    fuelEconomy: { city: 31, highway: 40, unit: "MPG" },
    features: ["Adaptive cruise","Lane keep","Android Auto"],
    safety: { rating: 5, agency: "IIHS" },
    popularity: 87,
    images: ["/assets/images/corolla/1.jpg","/assets/images/corolla/2.jpg"],
    video: "https://www.youtube.com/embed/anotherVideoId",
    seller: { name: "Metro Motors", email: "toyota@metro.example" },
    vin: "JTDEPMAE0PJ000002",
    professionalScore: 8.1,
  },
  // Add more for richness
];

export const NEWS = [
  { id:"news-ev-tax", title:"EV incentives updated for 2025", date:"2025-11-12", category:"Industry", excerpt:"New thresholds and point-of-sale rebates rolled out.", url:"#/news/news-ev-tax" },
  { id:"news-new-supra", title:"2026 Supra teased", date:"2025-11-18", category:"New Releases", excerpt:"Inline-6 hybrid configuration rumored.", url:"#/news/news-new-supra" },
];
