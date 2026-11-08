const image = (term, id) =>
  `https://loremflickr.com/1000/720/${encodeURIComponent(term)}?lock=${id}`;

const makeModels = (category, entries, offset) =>
  entries.map(([name, type, engine, power, price, keyword], index) => ({
    id: `${category}-${index + 1}`,
    name,
    type,
    engine,
    power,
    price,
    image: image(keyword, offset + index),
    description: `${name} is designed for people who value performance, comfort and practical everyday usability.`,
    features: ["Premium design", "Modern engineering", "Comfort-focused interior", "Advanced safety"],
    variants: [
      {
        name: "Standard",
        price: price,
        engine: engine,
        power: power,
        transmission: "Manual",
        features: ["Essential features", "Everyday comfort", "Reliable performance"]
      },
      {
        name: "Premium",
        price: price + Math.round(price * 0.12),
        engine: engine,
        power: `${power} (Enhanced)`,
        transmission: "Automatic",
        features: ["Premium interior", "Advanced infotainment", "Enhanced safety package"]
      },
      {
        name: "Performance",
        price: price + Math.round(price * 0.22),
        engine: engine,
        power: `${power} (Performance)`,
        transmission: "Automatic",
        features: ["Sport styling", "Performance tuning", "Premium technology package"]
      }
    ]
  }));

export const vehicleCategories = [
  {
    id: "cars",
    name: "Cars",
    subtitle: "Sedans, hatchbacks and sports cars",
    icon: "🚘",
    image: image("luxury car", 1101),
    models: makeModels("cars", [
      ["Honda Civic", "Sedan", "1.5L Turbo", "180 HP", 8500000, "honda civic car"],
      ["Toyota Corolla", "Sedan", "1.8L Petrol", "138 HP", 7500000, "toyota corolla car"],
      ["Ferrari 488", "Sports Car", "3.9L V8", "661 HP", 85000000, "ferrari red sports car"],
      ["BMW 3 Series", "Luxury Sedan", "2.0L Turbo", "255 HP", 22000000, "bmw 3 series car"],
      ["Mercedes C-Class", "Luxury Sedan", "2.0L Turbo", "255 HP", 25000000, "mercedes benz c class"],
      ["Hyundai Elantra", "Sedan", "2.0L Petrol", "147 HP", 6800000, "hyundai elantra car"]
    ], 1200)
  },
  {
    id: "motorcycles",
    name: "Motorcycles",
    subtitle: "Street, sports and touring bikes",
    icon: "🏍️",
    image: image("sport motorcycle", 2101),
    models: makeModels("motorcycles", [
      ["Honda CB 150F", "Street Bike", "150cc", "11.5 HP", 500000, "honda cb motorcycle"],
      ["Yamaha YBR 125", "Commuter Bike", "125cc", "10 HP", 470000, "yamaha ybr motorcycle"],
      ["Kawasaki Ninja 400", "Sports Bike", "399cc", "45 HP", 2200000, "kawasaki ninja motorcycle"],
      ["Suzuki GSX-R1000", "Superbike", "999cc", "199 HP", 5500000, "suzuki gsxr motorcycle"],
      ["BMW R 1250 GS", "Adventure Bike", "1254cc", "136 HP", 9000000, "bmw adventure motorcycle"],
      ["KTM Duke 390", "Naked Bike", "398cc", "44 HP", 1800000, "ktm duke motorcycle"]
    ], 2200)
  },
  {
    id: "buses",
    name: "Buses",
    subtitle: "City, coach and passenger transport",
    icon: "🚌",
    image: image("modern passenger bus", 3101),
    models: makeModels("buses", [
      ["Mercedes Tourismo", "Luxury Coach", "12.8L Diesel", "428 HP", 85000000, "mercedes luxury coach bus"],
      ["Volvo 9700", "Touring Coach", "10.8L Diesel", "460 HP", 90000000, "volvo coach bus"],
      ["Yutong ZK6122", "Intercity Coach", "9.7L Diesel", "375 HP", 55000000, "yutong passenger bus"],
      ["Hino RK8", "Passenger Bus", "7.7L Diesel", "260 HP", 35000000, "hino passenger bus"],
      ["Scania Touring", "Luxury Coach", "13L Diesel", "450 HP", 95000000, "scania touring bus"],
      ["MAN Lion's City", "City Bus", "9L Diesel", "320 HP", 65000000, "man city bus"]
    ], 3200)
  },
  {
    id: "bicycles",
    name: "Bicycles",
    subtitle: "Road, mountain and urban cycles",
    icon: "🚲",
    image: image("mountain bicycle", 4101),
    models: makeModels("bicycles", [
      ["Trek Marlin 7", "Mountain Bike", "29-inch", "Hydraulic Disc", 350000, "trek mountain bicycle"],
      ["Giant Contend AR", "Road Bike", "700c", "Shimano Gear", 420000, "giant road bicycle"],
      ["Specialized Rockhopper", "Mountain Bike", "29-inch", "Hydraulic Disc", 390000, "specialized mountain bike"],
      ["Cannondale Quick", "Hybrid Bike", "700c", "21-Speed", 280000, "cannondale hybrid bicycle"],
      ["Brompton C Line", "Folding Bike", "16-inch", "6-Speed", 650000, "brompton folding bicycle"],
      ["Scott Speedster", "Road Bike", "700c", "Shimano Gear", 480000, "scott speedster road bike"]
    ], 4200)
  },
  {
    id: "suvs",
    name: "SUVs",
    subtitle: "Luxury, family and off-road SUVs",
    icon: "🚙",
    image: image("luxury suv", 5101),
    models: makeModels("suvs", [
      ["Toyota Land Cruiser", "Full-size SUV", "3.5L V6", "409 HP", 120000000, "toyota land cruiser suv"],
      ["Toyota Fortuner", "Family SUV", "2.8L Diesel", "201 HP", 18000000, "toyota fortuner suv"],
      ["Kia Sportage", "Compact SUV", "2.0L Petrol", "154 HP", 9500000, "kia sportage suv"],
      ["Hyundai Tucson", "Compact SUV", "2.0L Petrol", "156 HP", 10500000, "hyundai tucson suv"],
      ["Range Rover Sport", "Luxury SUV", "3.0L Turbo", "355 HP", 95000000, "range rover sport suv"],
      ["Jeep Wrangler", "Off-road SUV", "3.6L V6", "285 HP", 45000000, "jeep wrangler suv"]
    ], 5200)
  },
  {
    id: "trucks",
    name: "Trucks",
    subtitle: "Heavy-duty, pickup and cargo trucks",
    icon: "🚚",
    image: image("heavy duty truck", 6101),
    models: makeModels("trucks", [
      ["Ford F-150", "Pickup Truck", "3.5L V6", "400 HP", 25000000, "ford f150 pickup truck"],
      ["Toyota Hilux", "Pickup Truck", "2.8L Diesel", "201 HP", 15000000, "toyota hilux pickup"],
      ["Volvo FH16", "Heavy Truck", "16L Diesel", "750 HP", 110000000, "volvo fh16 truck"],
      ["Scania R Series", "Heavy Truck", "13L Diesel", "500 HP", 95000000, "scania r series truck"],
      ["Isuzu NPR", "Light Truck", "5.2L Diesel", "190 HP", 18000000, "isuzu npr truck"],
      ["Mitsubishi Fuso", "Cargo Truck", "3.0L Diesel", "150 HP", 14000000, "mitsubishi fuso truck"]
    ], 6200)
  },
  {
    id: "electric",
    name: "Electric Vehicles",
    subtitle: "Modern electric cars and mobility",
    icon: "⚡",
    image: image("electric car charging", 7101),
    models: makeModels("electric", [
      ["Tesla Model 3", "Electric Sedan", "Long Range Battery", "390 HP", 22000000, "tesla model 3 electric car"],
      ["Tesla Model Y", "Electric SUV", "Long Range Battery", "384 HP", 25000000, "tesla model y electric car"],
      ["Porsche Taycan", "Electric Sports Sedan", "Performance Battery", "402 HP", 65000000, "porsche taycan electric car"],
      ["Hyundai IONIQ 5", "Electric Crossover", "77.4 kWh", "225 HP", 18000000, "hyundai ioniq 5 electric"],
      ["BYD Atto 3", "Electric SUV", "60.5 kWh", "201 HP", 12500000, "byd atto 3 electric car"],
      ["MG ZS EV", "Electric SUV", "51 kWh", "174 HP", 10500000, "mg zs electric car"]
    ], 7200)
  }
];
