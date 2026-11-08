const photo = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

const makeModels = (category, entries) =>
  entries.map(([name, type, engine, power, price, imageId], index) => ({
    id: `${category}-${index + 1}`,
    name,
    type,
    engine,
    power,
    price,
    image: photo(imageId),
    description: `${name} is designed for people who value performance, comfort and practical everyday usability.`,
    features: [
      "Premium design",
      "Modern engineering",
      "Comfort-focused interior",
      "Advanced safety"
    ],
    variants: [
      {
        name: "Standard",
        price,
        engine,
        power,
        transmission: "Manual",
        features: ["Essential features", "Everyday comfort", "Reliable performance"]
      },
      {
        name: "Premium",
        price: price + Math.round(price * 0.12),
        engine,
        power: `${power} (Enhanced)`,
        transmission: "Automatic",
        features: ["Premium interior", "Advanced infotainment", "Enhanced safety package"]
      },
      {
        name: "Performance",
        price: price + Math.round(price * 0.22),
        engine,
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
    image: photo("photo-1492144534655-ae79c964c9d7"),
    models: makeModels("cars", [
      ["Honda Civic", "Sedan", "1.5L Turbo", "180 HP", 8500000, "photo-1492144534655-ae79c964c9d7"],
      ["Toyota Corolla", "Sedan", "1.8L Petrol", "138 HP", 7500000, "photo-1503376780353-7e6692767b70"],
      ["Ferrari 488", "Sports Car", "3.9L V8", "661 HP", 85000000, "photo-1552519507-da3b142c6e3d"],
      ["BMW 3 Series", "Luxury Sedan", "2.0L Turbo", "255 HP", 22000000, "photo-1549317661-bd32c8ce0db2"],
      ["Mercedes C-Class", "Luxury Sedan", "2.0L Turbo", "255 HP", 25000000, "photo-1494976388531-d1058494cdd8"],
      ["Hyundai Elantra", "Sedan", "2.0L Petrol", "147 HP", 6800000, "photo-1489824904134-891ab64532f1"]
    ])
  },
  {
    id: "motorcycles",
    name: "Motorcycles",
    subtitle: "Street, sports and touring bikes",
    icon: "🏍️",
    image: photo("photo-1558981806-ec527fa84c39"),
    models: makeModels("motorcycles", [
      ["Honda CB 150F", "Street Bike", "150cc", "11.5 HP", 500000, "photo-1558981806-ec527fa84c39"],
      ["Yamaha YBR 125", "Commuter Bike", "125cc", "10 HP", 470000, "photo-1558981403-c5f9899a28bc"],
      ["Kawasaki Ninja 400", "Sports Bike", "399cc", "45 HP", 2200000, "photo-1558981806-ec527fa84c39"],
      ["Suzuki GSX-R1000", "Superbike", "999cc", "199 HP", 5500000, "photo-1558981403-c5f9899a28bc"],
      ["BMW R 1250 GS", "Adventure Bike", "1254cc", "136 HP", 9000000, "photo-1558981806-ec527fa84c39"],
      ["KTM Duke 390", "Naked Bike", "398cc", "44 HP", 1800000, "photo-1558981403-c5f9899a28bc"]
    ])
  },
  {
    id: "buses",
    name: "Buses",
    subtitle: "City, coach and passenger transport",
    icon: "🚌",
    image: photo("photo-1570125909232-eb263c188f7e"),
    models: makeModels("buses", [
      ["Mercedes Tourismo", "Luxury Coach", "12.8L Diesel", "428 HP", 85000000, "photo-1570125909232-eb263c188f7e"],
      ["Volvo 9700", "Touring Coach", "10.8L Diesel", "460 HP", 90000000, "photo-1544620347-c4fd4a3d5957"],
      ["Yutong ZK6122", "Intercity Coach", "9.7L Diesel", "375 HP", 55000000, "photo-1570125909232-eb263c188f7e"],
      ["Hino RK8", "Passenger Bus", "7.7L Diesel", "260 HP", 35000000, "photo-1544620347-c4fd4a3d5957"],
      ["Scania Touring", "Luxury Coach", "13L Diesel", "450 HP", 95000000, "photo-1570125909232-eb263c188f7e"],
      ["MAN Lion's City", "City Bus", "9L Diesel", "320 HP", 65000000, "photo-1544620347-c4fd4a3d5957"]
    ])
  },
  {
    id: "bicycles",
    name: "Bicycles",
    subtitle: "Road, mountain and urban cycles",
    icon: "🚲",
    image: photo("photo-1485965120184-e220f721d03e"),
    models: makeModels("bicycles", [
      ["Trek Marlin 7", "Mountain Bike", "29-inch", "Hydraulic Disc", 350000, "photo-1485965120184-e220f721d03e"],
      ["Giant Contend AR", "Road Bike", "700c", "Shimano Gear", 420000, "photo-1507035895480-2b3156c31fc8"],
      ["Specialized Rockhopper", "Mountain Bike", "29-inch", "Hydraulic Disc", 390000, "photo-1511994298241-608e28f14fde"],
      ["Cannondale Quick", "Hybrid Bike", "700c", "21-Speed", 280000, "photo-1471506480208-91b3a4cc78be"],
      ["Brompton C Line", "Folding Bike", "16-inch", "6-Speed", 650000, "photo-1485965120184-e220f721d03e"],
      ["Scott Speedster", "Road Bike", "700c", "Shimano Gear", 480000, "photo-1507035895480-2b3156c31fc8"]
    ])
  },
  {
    id: "suvs",
    name: "SUVs",
    subtitle: "Luxury, family and off-road SUVs",
    icon: "🚙",
    image: photo("photo-1519641471654-76ce0107ad1b"),
    models: makeModels("suvs", [
      ["Toyota Land Cruiser", "Full-size SUV", "3.5L V6", "409 HP", 120000000, "photo-1519641471654-76ce0107ad1b"],
      ["Toyota Fortuner", "Family SUV", "2.8L Diesel", "201 HP", 18000000, "photo-1533473359331-0135ef1b58bf"],
      ["Kia Sportage", "Compact SUV", "2.0L Petrol", "154 HP", 9500000, "photo-1519641471654-76ce0107ad1b"],
      ["Hyundai Tucson", "Compact SUV", "2.0L Petrol", "156 HP", 10500000, "photo-1533473359331-0135ef1b58bf"],
      ["Range Rover Sport", "Luxury SUV", "3.0L Turbo", "355 HP", 95000000, "photo-1519641471654-76ce0107ad1b"],
      ["Jeep Wrangler", "Off-road SUV", "3.6L V6", "285 HP", 45000000, "photo-1533473359331-0135ef1b58bf"]
    ])
  },
  {
    id: "trucks",
    name: "Trucks",
    subtitle: "Heavy-duty, pickup and cargo trucks",
    icon: "🚚",
    image: photo("photo-1519003722824-194d4455a60c"),
    models: makeModels("trucks", [
      ["Ford F-150", "Pickup Truck", "3.5L V6", "400 HP", 25000000, "photo-1519003722824-194d4455a60c"],
      ["Toyota Hilux", "Pickup Truck", "2.8L Diesel", "201 HP", 15000000, "photo-1601584115197-04ecc0da31d7"],
      ["Volvo FH16", "Heavy Truck", "16L Diesel", "750 HP", 110000000, "photo-1519003722824-194d4455a60c"],
      ["Scania R Series", "Heavy Truck", "13L Diesel", "500 HP", 95000000, "photo-1601584115197-04ecc0da31d7"],
      ["Isuzu NPR", "Light Truck", "5.2L Diesel", "190 HP", 18000000, "photo-1519003722824-194d4455a60c"],
      ["Mitsubishi Fuso", "Cargo Truck", "3.0L Diesel", "150 HP", 14000000, "photo-1601584115197-04ecc0da31d7"]
    ])
  },
  {
    id: "electric",
    name: "Electric Vehicles",
    subtitle: "Modern electric cars and mobility",
    icon: "⚡",
    image: photo("photo-1593941707882-a5bba14938c7"),
    models: makeModels("electric", [
      ["Tesla Model 3", "Electric Sedan", "Long Range Battery", "390 HP", 22000000, "photo-1593941707882-a5bba14938c7"],
      ["Tesla Model Y", "Electric SUV", "Long Range Battery", "384 HP", 25000000, "photo-1593941707882-a5bba14938c7"],
      ["Porsche Taycan", "Electric Sports Sedan", "Performance Battery", "402 HP", 65000000, "photo-1552519507-da3b142c6e3d"],
      ["Hyundai IONIQ 5", "Electric Crossover", "77.4 kWh", "225 HP", 18000000, "photo-1593941707882-a5bba14938c7"],
      ["BYD Atto 3", "Electric SUV", "60.5 kWh", "201 HP", 12500000, "photo-1593941707882-a5bba14938c7"],
      ["MG ZS EV", "Electric SUV", "51 kWh", "174 HP", 10500000, "photo-1593941707882-a5bba14938c7"]
    ])
  }
];
