"use strict";

const categories = {
    all: { title: "Every Journey Starts Here.", kicker: "THE COMPLETE COLLECTION" },
    cars: { title: "Performance Meets Elegance.", kicker: "AUTOMOTIVE COLLECTION" },
    bikes: { title: "Born to Ride. Built to Perform.", kicker: "MOTORCYCLE COLLECTION" },
    buses: { title: "Move More. Travel Together.", kicker: "BUS & COACH COLLECTION" },
    bicycles: { title: "Find Your Own Rhythm.", kicker: "BICYCLE COLLECTION" },
    suvs: { title: "Adventure Has No Limits.", kicker: "SUV COLLECTION" },
    trucks: { title: "Power Behind Every Journey.", kicker: "COMMERCIAL COLLECTION" },
    electric: { title: "The Future Moves Electric.", kicker: "ELECTRIC MOBILITY" }
};

const makeVehicle = (id, name, brand, category, type, engine, power, price, range, query, variants, features) => ({
    id, name, brand, category, type, engine, power, price, range, query, variants, features,
    description: `${brand} ${name} brings together distinctive design, practical engineering and a driving experience designed for its category. Explore available configurations and specifications.`
});

const vehicles = [
    makeVehicle(1,"Civic","Honda","cars","Sedan","1.5L Turbo Petrol","176 HP","PKR 8.5M","5 seats","honda,civic,car",
        [{name:"Standard",price:"PKR 8.5M",engine:"1.5L Turbo",power:"176 HP",transmission:"CVT"},{name:"Oriel",price:"PKR 9.0M",engine:"1.5L Turbo",power:"176 HP",transmission:"CVT"},{name:"RS Turbo",price:"PKR 10.2M",engine:"1.5L Turbo",power:"176 HP",transmission:"CVT"}],
        ["Honda Sensing safety suite","Turbocharged engine","Apple CarPlay & Android Auto","Premium cabin","Multi-angle rear camera","Adaptive cruise control"]),
    makeVehicle(2,"Corolla","Toyota","cars","Sedan","1.6L / 1.8L Petrol","120–138 HP","PKR 7.5M","5 seats","toyota,corolla,sedan",
        [{name:"Altis 1.6",price:"PKR 7.5M",engine:"1.6L",power:"120 HP",transmission:"CVT"},{name:"Altis Grande",price:"PKR 8.3M",engine:"1.8L",power:"138 HP",transmission:"CVT"},{name:"Hybrid",price:"PKR 9.1M",engine:"1.8L Hybrid",power:"138 HP",transmission:"e-CVT"}],
        ["Toyota Safety Sense (selected trims)","Spacious cabin","Efficient powertrain options","Touchscreen infotainment","Rear camera","Comfortable ride"]),
    makeVehicle(3,"Model 3","Tesla","cars","Electric Sedan","Dual Motor Electric","510 HP (Performance)","PKR 18M","Electric","tesla,model 3,electric car",
        [{name:"Rear-Wheel Drive",price:"PKR 18M",engine:"Single Motor",power:"283 HP",transmission:"Single Speed"},{name:"Long Range",price:"PKR 22M",engine:"Dual Motor",power:"425 HP",transmission:"Single Speed"},{name:"Performance",price:"PKR 25M",engine:"Dual Motor",power:"510 HP",transmission:"Single Speed"}],
        ["Minimalist touchscreen interior","Over-the-air updates","Advanced driver assistance","Regenerative braking","Glass roof","Fast charging support"]),
    makeVehicle(4,"488 GTB","Ferrari","cars","Supercar","3.9L Twin-Turbo V8","661 HP","PKR 95M","2 seats","ferrari,488,supercar",
        [{name:"GTB",price:"PKR 95M",engine:"3.9L V8",power:"661 HP",transmission:"7-speed DCT"},{name:"Spider",price:"PKR 105M",engine:"3.9L V8",power:"661 HP",transmission:"7-speed DCT"},{name:"Pista",price:"PKR 125M",engine:"3.9L V8",power:"710 HP",transmission:"7-speed DCT"}],
        ["Twin-turbo V8 engine","Carbon-fibre construction options","Aerodynamic bodywork","Race-inspired cockpit","Launch control","High-performance braking"]),
    makeVehicle(5,"Mustang","Ford","cars","Muscle Car","5.0L V8 / 2.3L EcoBoost","315–480 HP","PKR 28M","4 seats","ford,mustang,car",
        [{name:"EcoBoost",price:"PKR 28M",engine:"2.3L Turbo",power:"315 HP",transmission:"10-speed Auto"},{name:"GT",price:"PKR 38M",engine:"5.0L V8",power:"480 HP",transmission:"6-speed Manual"},{name:"Dark Horse",price:"PKR 45M",engine:"5.0L V8",power:"500 HP",transmission:"6-speed Manual"}],
        ["Iconic muscle-car styling","Selectable drive modes","Digital instrument cluster","Performance exhaust (selected trims)","Track-inspired suspension","Advanced infotainment"]),
    makeVehicle(6,"911 Carrera","Porsche","cars","Sports Car","3.0L Twin-Turbo Flat-Six","388 HP","PKR 75M","2+2 seats","porsche,911,carrera",
        [{name:"Carrera",price:"PKR 75M",engine:"3.0L Flat-Six",power:"388 HP",transmission:"8-speed PDK"},{name:"Carrera GTS",price:"PKR 95M",engine:"3.6L T-Hybrid",power:"532 HP",transmission:"8-speed PDK"},{name:"Carrera 4 GTS",price:"PKR 105M",engine:"3.6L T-Hybrid",power:"532 HP",transmission:"8-speed PDK"}],
        ["Rear-engine performance","Precision steering","Porsche Communication Management","Sport Chrono package options","Adaptive suspension","Iconic silhouette"]),

    makeVehicle(7,"Ninja ZX-10R","Kawasaki","bikes","Superbike","998cc Inline-Four","203 HP","PKR 12M","2 seats","kawasaki,ninja,motorcycle",
        [{name:"Standard",price:"PKR 12M",engine:"998cc",power:"203 HP",transmission:"6-speed"},{name:"KRT Edition",price:"PKR 12.5M",engine:"998cc",power:"203 HP",transmission:"6-speed"},{name:"ABS Edition",price:"PKR 12.8M",engine:"998cc",power:"203 HP",transmission:"6-speed"}],
        ["Race-derived engine","Electronic rider aids","Quick shifter","Showa suspension","ABS braking","Aerodynamic fairing"]),
    makeVehicle(8,"CBR650R","Honda","bikes","Sport Bike","649cc Inline-Four","94 HP","PKR 5.5M","2 seats","honda,cbr,motorcycle",
        [{name:"Standard",price:"PKR 5.5M",engine:"649cc",power:"94 HP",transmission:"6-speed"},{name:"E-Clutch",price:"PKR 5.9M",engine:"649cc",power:"94 HP",transmission:"6-speed E-Clutch"},{name:"Special Edition",price:"PKR 6.1M",engine:"649cc",power:"94 HP",transmission:"6-speed"}],
        ["Four-cylinder engine","Sport riding position","LED lighting","Assist slipper clutch","Digital display","ABS"]),
    makeVehicle(9,"R 1250 GS","BMW","bikes","Adventure Tourer","1254cc Boxer Twin","136 HP","PKR 15M","2 seats","bmw,r1250gs,motorcycle",
        [{name:"GS Standard",price:"PKR 15M",engine:"1254cc Boxer",power:"136 HP",transmission:"6-speed"},{name:"GS Trophy",price:"PKR 16M",engine:"1254cc Boxer",power:"136 HP",transmission:"6-speed"},{name:"Adventure",price:"PKR 17M",engine:"1254cc Boxer",power:"136 HP",transmission:"6-speed"}],
        ["ShiftCam engine technology","Long-distance comfort","Riding modes","Dynamic traction control","Touring luggage options","Electronic suspension options"]),
    makeVehicle(10,"Ducati Panigale V4","Ducati","bikes","Superbike","1103cc V4","216 HP","PKR 22M","2 seats","ducati,panigale,motorcycle",
        [{name:"V4",price:"PKR 22M",engine:"1103cc V4",power:"216 HP",transmission:"6-speed"},{name:"V4 S",price:"PKR 26M",engine:"1103cc V4",power:"216 HP",transmission:"6-speed"},{name:"Speciale",price:"PKR 30M",engine:"1103cc V4",power:"216 HP",transmission:"6-speed"}],
        ["Desmosedici Stradale V4","Brembo braking","Advanced electronics package","Cornering ABS","Riding modes","Lightweight chassis"]),
    makeVehicle(11,"MT-07","Yamaha","bikes","Naked Bike","689cc Parallel Twin","73 HP","PKR 4.8M","2 seats","yamaha,mt07,motorcycle",
        [{name:"Standard",price:"PKR 4.8M",engine:"689cc",power:"73 HP",transmission:"6-speed"},{name:"ABS",price:"PKR 5.0M",engine:"689cc",power:"73 HP",transmission:"6-speed"},{name:"SP",price:"PKR 5.5M",engine:"689cc",power:"73 HP",transmission:"6-speed"}],
        ["CP2 crossplane engine","Lightweight frame","Upright riding position","LED headlight","ABS options","Responsive handling"]),
    makeVehicle(12,"Street Glide","Harley-Davidson","bikes","Touring Motorcycle","Milwaukee-Eight V-Twin","107 HP","PKR 18M","2 seats","harley,davidson,street glide,motorcycle",
        [{name:"Standard",price:"PKR 18M",engine:"Milwaukee-Eight",power:"107 HP",transmission:"6-speed"},{name:"Special",price:"PKR 20M",engine:"Milwaukee-Eight",power:"107 HP",transmission:"6-speed"},{name:"CVO",price:"PKR 27M",engine:"Milwaukee-Eight",power:"115 HP",transmission:"6-speed"}],
        ["Grand touring design","Batwing fairing","Premium audio","Cruise control","Touring suspension","Large storage capacity"]),

    makeVehicle(13,"Coaster","Toyota","buses","Mini Bus","4.0L Diesel","150 HP","PKR 35M","22–30 passengers","toyota,coaster,bus",
        [{name:"Standard",price:"PKR 35M",engine:"4.0L Diesel",power:"150 HP",transmission:"Manual"},{name:"Deluxe",price:"PKR 38M",engine:"4.0L Diesel",power:"150 HP",transmission:"Manual"},{name:"Touring",price:"PKR 40M",engine:"4.0L Diesel",power:"150 HP",transmission:"Manual"}],
        ["Passenger-focused layout","Air conditioning options","Durable commercial chassis","ABS braking","Wide entry doors","Touring luggage space"]),
    makeVehicle(14,"Higer KLQ","Higer","buses","Luxury Coach","Euro VI Diesel","350 HP","PKR 75M","45–55 passengers","higer,coach,bus",
        [{name:"Standard Coach",price:"PKR 75M",engine:"Diesel",power:"350 HP",transmission:"Manual"},{name:"Executive",price:"PKR 82M",engine:"Diesel",power:"350 HP",transmission:"Manual"},{name:"Luxury",price:"PKR 95M",engine:"Diesel",power:"380 HP",transmission:"Automatic"}],
        ["Touring passenger seats","Large luggage bays","Climate control","Entertainment system options","Air suspension options","Safety monitoring"]),
    makeVehicle(15,"Citaro","Mercedes-Benz","buses","City Bus","Euro VI Diesel","220 HP","PKR 60M","80–100 passengers","mercedes,citaro,city bus",
        [{name:"Standard",price:"PKR 60M",engine:"Diesel",power:"220 HP",transmission:"Automatic"},{name:"Articulated",price:"PKR 85M",engine:"Diesel",power:"350 HP",transmission:"Automatic"},{name:"Hybrid",price:"PKR 95M",engine:"Hybrid Diesel",power:"220 HP",transmission:"Automatic"}],
        ["Low-floor access","High passenger capacity","Urban transit configuration","Passenger information system","Advanced braking","Accessibility features"]),
    makeVehicle(16,"Volvo 9700","Volvo","buses","Touring Coach","D13 Diesel","460 HP","PKR 110M","45–55 passengers","volvo,9700,coach bus",
        [{name:"Standard",price:"PKR 110M",engine:"D13 Diesel",power:"460 HP",transmission:"I-Shift"},{name:"Luxury",price:"PKR 120M",engine:"D13 Diesel",power:"460 HP",transmission:"I-Shift"},{name:"Premium",price:"PKR 135M",engine:"D13 Diesel",power:"500 HP",transmission:"I-Shift"}],
        ["Long-distance comfort","Volvo Dynamic Steering","Safety assistance systems","Premium seating","Climate control","Large luggage compartments"]),
    makeVehicle(17,"Eicher Skyline","Eicher","buses","Staff Bus","5.1L Diesel","180 HP","PKR 28M","35–45 passengers","eicher,skyline,bus",
        [{name:"Standard",price:"PKR 28M",engine:"5.1L Diesel",power:"180 HP",transmission:"Manual"},{name:"Deluxe",price:"PKR 30M",engine:"5.1L Diesel",power:"180 HP",transmission:"Manual"},{name:"Touring",price:"PKR 33M",engine:"5.1L Diesel",power:"180 HP",transmission:"Manual"}],
        ["Commercial reliability","Passenger seating","Strong chassis","Air conditioning options","Easy maintenance","Fleet-friendly operation"]),
    makeVehicle(18,"Electric City Bus","BYD","buses","Electric Bus","Electric Motor","150–300 kW","PKR 90M","Electric","byd,electric city bus",
        [{name:"Standard",price:"PKR 90M",engine:"Electric",power:"150 kW",transmission:"Single Speed"},{name:"Long Range",price:"PKR 105M",engine:"Electric",power:"200 kW",transmission:"Single Speed"},{name:"Articulated",price:"PKR 140M",engine:"Electric",power:"300 kW",transmission:"Single Speed"}],
        ["Zero tailpipe emissions","Regenerative braking","Battery management system","Quiet urban operation","Low-floor accessibility","Electric drivetrain"]),

    makeVehicle(19,"Domane","Trek","bicycles","Road / Endurance","Human Powered","N/A","PKR 450K","Multiple sizes","trek,domane,road bicycle",
        [{name:"AL 2",price:"PKR 450K",engine:"Aluminium",power:"N/A",transmission:"Shimano"},{name:"SL 5",price:"PKR 850K",engine:"Carbon",power:"N/A",transmission:"Shimano 105"},{name:"SL 7",price:"PKR 1.4M",engine:"Carbon",power:"N/A",transmission:"Electronic"}],
        ["Endurance geometry","Road performance","Disc brake options","Multiple frame sizes","Carbon fork options","Long-distance comfort"]),
    makeVehicle(20,"Rockhopper","Specialized","bicycles","Mountain Bike","Human Powered","N/A","PKR 320K","Multiple sizes","specialized,rockhopper,mountain bicycle",
        [{name:"Sport",price:"PKR 320K",engine:"Aluminium",power:"N/A",transmission:"MicroSHIFT"},{name:"Comp",price:"PKR 430K",engine:"Aluminium",power:"N/A",transmission:"Shimano"},{name:"Expert",price:"PKR 560K",engine:"Aluminium",power:"N/A",transmission:"Shimano"}],
        ["Trail-ready geometry","Front suspension","Hydraulic disc brakes options","Wide tyres","Durable frame","Multiple sizes"]),
    makeVehicle(21,"FX 3","Trek","bicycles","Hybrid Bike","Human Powered","N/A","PKR 380K","Multiple sizes","trek,fx3,hybrid bicycle",
        [{name:"Standard",price:"PKR 380K",engine:"Aluminium",power:"N/A",transmission:"Shimano"},{name:"Disc",price:"PKR 430K",engine:"Aluminium",power:"N/A",transmission:"Shimano"},{name:"Stagger",price:"PKR 450K",engine:"Aluminium",power:"N/A",transmission:"Shimano"}],
        ["Versatile urban design","Lightweight aluminium","Commuter-friendly geometry","Disc brakes","Rack mounting points","Fitness riding comfort"]),
    makeVehicle(22,"Aeroad","Canyon","bicycles","Aero Road Bike","Human Powered","N/A","PKR 1.1M","Multiple sizes","canyon,aeroad,road bicycle",
        [{name:"CF SLX",price:"PKR 1.1M",engine:"Carbon",power:"N/A",transmission:"Shimano"},{name:"CF SLX Di2",price:"PKR 1.5M",engine:"Carbon",power:"N/A",transmission:"Electronic"},{name:"CFR",price:"PKR 2.2M",engine:"Premium Carbon",power:"N/A",transmission:"Electronic"}],
        ["Aerodynamic frame","Integrated cockpit","Carbon construction","Race-ready geometry","Electronic shifting options","High-speed road design"]),
    makeVehicle(23,"Madone","Trek","bicycles","Race Road Bike","Human Powered","N/A","PKR 1.3M","Multiple sizes","trek,madone,road bicycle",
        [{name:"SL 6",price:"PKR 1.3M",engine:"Carbon",power:"N/A",transmission:"Shimano"},{name:"SL 7",price:"PKR 1.7M",engine:"Carbon",power:"N/A",transmission:"Electronic"},{name:"SLR 9",price:"PKR 2.8M",engine:"Premium Carbon",power:"N/A",transmission:"Electronic"}],
        ["Race-focused aerodynamics","Lightweight carbon frame","Integrated cable routing","High-performance wheels","Electronic shifting options","Responsive handling"]),
    makeVehicle(24,"Turbo Levo","Specialized","bicycles","Electric Mountain Bike","Electric Assist","Up to 565W","PKR 1.8M","Electric","specialized,turbo levo,electric mountain bicycle",
        [{name:"Comp Alloy",price:"PKR 1.8M",engine:"Electric Assist",power:"565W",transmission:"Electronic Assist"},{name:"Expert",price:"PKR 2.4M",engine:"Electric Assist",power:"565W",transmission:"Electronic Assist"},{name:"S-Works",price:"PKR 3.8M",engine:"Electric Assist",power:"565W",transmission:"Electronic Assist"}],
        ["Integrated motor assistance","Trail-focused geometry","Rechargeable battery","Full suspension","Smart control system","Off-road capability"]),

    makeVehicle(25,"Land Cruiser","Toyota","suvs","Full-Size SUV","3.5L Twin-Turbo V6","409 HP","PKR 120M","7 seats","toyota,land cruiser,suv",
        [{name:"GX",price:"PKR 120M",engine:"3.5L V6",power:"409 HP",transmission:"10-speed Auto"},{name:"VX",price:"PKR 140M",engine:"3.5L V6",power:"409 HP",transmission:"10-speed Auto"},{name:"ZX",price:"PKR 155M",engine:"3.5L V6",power:"409 HP",transmission:"10-speed Auto"}],
        ["Full-time four-wheel drive","Advanced terrain management","Premium interior","Multi-terrain monitor","Adaptive suspension","Off-road capability"]),
    makeVehicle(26,"Fortuner","Toyota","suvs","Mid-Size SUV","2.7L Petrol / 2.8L Diesel","164–201 HP","PKR 18M","7 seats","toyota,fortuner,suv",
        [{name:"G",price:"PKR 18M",engine:"2.7L Petrol",power:"164 HP",transmission:"6-speed Auto"},{name:"V",price:"PKR 20M",engine:"2.8L Diesel",power:"201 HP",transmission:"6-speed Auto"},{name:"Legender",price:"PKR 24M",engine:"2.8L Diesel",power:"201 HP",transmission:"6-speed Auto"}],
        ["High ground clearance","7-seat configuration","Four-wheel drive options","Touchscreen display","Rear camera","Strong road presence"]),
    makeVehicle(27,"Range Rover Sport","Land Rover","suvs","Luxury SUV","3.0L Mild Hybrid / V8","355–626 HP","PKR 85M","5 seats","range rover sport,luxury suv",
        [{name:"Dynamic SE",price:"PKR 85M",engine:"3.0L",power:"355 HP",transmission:"Automatic"},{name:"Autobiography",price:"PKR 105M",engine:"3.0L",power:"395 HP",transmission:"Automatic"},{name:"SV",price:"PKR 145M",engine:"4.4L V8",power:"626 HP",transmission:"Automatic"}],
        ["Luxury cabin materials","Terrain Response","Adaptive dynamics","Air suspension","Premium audio options","Advanced driver assistance"]),
    makeVehicle(28,"Defender 110","Land Rover","suvs","Off-Road SUV","3.0L Mild Hybrid","395 HP","PKR 70M","5–7 seats","land rover,defender,suv",
        [{name:"S",price:"PKR 70M",engine:"3.0L",power:"395 HP",transmission:"Automatic"},{name:"X-Dynamic",price:"PKR 80M",engine:"3.0L",power:"395 HP",transmission:"Automatic"},{name:"X",price:"PKR 95M",engine:"3.0L",power:"395 HP",transmission:"Automatic"}],
        ["Advanced off-road technology","Configurable terrain modes","Rugged body structure","Water wading capability","Digital cockpit","Flexible seating"]),
    makeVehicle(29,"Model Y","Tesla","suvs","Electric SUV","Dual Motor Electric","384 HP","PKR 22M","Electric","tesla,model y,suv",
        [{name:"Rear-Wheel Drive",price:"PKR 22M",engine:"Single Motor",power:"295 HP",transmission:"Single Speed"},{name:"Long Range",price:"PKR 27M",engine:"Dual Motor",power:"384 HP",transmission:"Single Speed"},{name:"Performance",price:"PKR 31M",engine:"Dual Motor",power:"456 HP",transmission:"Single Speed"}],
        ["Electric powertrain","Large touchscreen","Over-the-air updates","Regenerative braking","Flexible cargo space","Advanced driver assistance"]),
    makeVehicle(30,"Palisade","Hyundai","suvs","Family SUV","3.8L V6 Petrol","291 HP","PKR 30M","7–8 seats","hyundai,palisade,suv",
        [{name:"SE",price:"PKR 30M",engine:"3.8L V6",power:"291 HP",transmission:"8-speed Auto"},{name:"SEL",price:"PKR 34M",engine:"3.8L V6",power:"291 HP",transmission:"8-speed Auto"},{name:"Calligraphy",price:"PKR 40M",engine:"3.8L V6",power:"291 HP",transmission:"8-speed Auto"}],
        ["Three-row seating","Family-friendly cabin","Large infotainment display","Advanced safety features","Comfortable suspension","Premium interior options"]),

    makeVehicle(31,"FH16","Volvo","trucks","Heavy-Duty Truck","16L Diesel","600 HP","PKR 55M","Heavy haulage","volvo,fh16,heavy truck",
        [{name:"Standard",price:"PKR 55M",engine:"16L Diesel",power:"600 HP",transmission:"I-Shift"},{name:"Aero",price:"PKR 60M",engine:"16L Diesel",power:"600 HP",transmission:"I-Shift"},{name:"Heavy Haul",price:"PKR 68M",engine:"16L Diesel",power:"750 HP",transmission:"I-Shift"}],
        ["Heavy-duty powertrain","Volvo I-Shift transmission","Driver comfort cabin","Advanced safety systems","Fleet connectivity","Long-distance efficiency"]),
    makeVehicle(32,"Actros","Mercedes-Benz","trucks","Long-Haul Truck","12.8L Diesel","476 HP","PKR 48M","Heavy haulage","mercedes,actros,truck",
        [{name:"1845",price:"PKR 48M",engine:"12.8L Diesel",power:"449 HP",transmission:"PowerShift"},{name:"1851",price:"PKR 54M",engine:"12.8L Diesel",power:"510 HP",transmission:"PowerShift"},{name:"1848",price:"PKR 51M",engine:"12.8L Diesel",power:"476 HP",transmission:"PowerShift"}],
        ["Digital cockpit","Predictive powertrain control","Advanced emergency braking","Aerodynamic cab","Driver assistance","Fleet management options"]),
    makeVehicle(33,"R 500","Scania","trucks","Heavy Transport","12.7L Diesel","500 HP","PKR 52M","Heavy haulage","scania,r500,truck",
        [{name:"Standard",price:"PKR 52M",engine:"12.7L Diesel",power:"500 HP",transmission:"Opticruise"},{name:"Highline",price:"PKR 58M",engine:"12.7L Diesel",power:"500 HP",transmission:"Opticruise"},{name:"V8",price:"PKR 70M",engine:"16.4L V8",power:"660 HP",transmission:"Opticruise"}],
        ["Scania Opticruise","High-torque engine","Driver-focused interior","Advanced fleet tools","Heavy-duty chassis","Long-haul comfort"]),
    makeVehicle(34,"F-150","Ford","trucks","Pickup Truck","3.5L EcoBoost V6","400 HP","PKR 32M","5 seats","ford,f150,pickup truck",
        [{name:"XL",price:"PKR 32M",engine:"3.3L V6",power:"290 HP",transmission:"10-speed Auto"},{name:"Lariat",price:"PKR 40M",engine:"3.5L EcoBoost",power:"400 HP",transmission:"10-speed Auto"},{name:"Raptor",price:"PKR 55M",engine:"3.5L EcoBoost",power:"450 HP",transmission:"10-speed Auto"}],
        ["High towing capacity","Pro Power Onboard options","Selectable drive modes","Large cargo bed","Off-road variants","Modern cabin technology"]),
    makeVehicle(35,"Hilux Revo","Toyota","trucks","Pickup Truck","2.8L Turbo Diesel","201 HP","PKR 15M","5 seats","toyota,hilux,revo,pickup",
        [{name:"E",price:"PKR 15M",engine:"2.4L Diesel",power:"148 HP",transmission:"Manual"},{name:"V",price:"PKR 18M",engine:"2.8L Diesel",power:"201 HP",transmission:"Automatic"},{name:"Rocco",price:"PKR 21M",engine:"2.8L Diesel",power:"201 HP",transmission:"Automatic"}],
        ["Durable pickup platform","Four-wheel drive options","Practical cargo bed","Rear differential lock options","Touchscreen infotainment","High ground clearance"]),
    makeVehicle(36,"Canter","Mitsubishi Fuso","trucks","Light Commercial Truck","3.0L Diesel","150 HP","PKR 12M","Commercial","fuso,canter,commercial truck",
        [{name:"Standard",price:"PKR 12M",engine:"3.0L Diesel",power:"150 HP",transmission:"Manual"},{name:"Long Wheelbase",price:"PKR 14M",engine:"3.0L Diesel",power:"150 HP",transmission:"Manual"},{name:"Heavy Duty",price:"PKR 16M",engine:"3.0L Diesel",power:"175 HP",transmission:"Manual"}],
        ["Compact commercial design","Strong payload capability","Easy manoeuvrability","Cab-over-engine layout","Fleet-friendly maintenance","Multiple body configurations"]),

    makeVehicle(37,"Model S","Tesla","electric","Electric Sedan","Dual Motor Electric","670 HP","PKR 35M","Electric","tesla,model s,electric car",
        [{name:"Standard",price:"PKR 35M",engine:"Dual Motor",power:"670 HP",transmission:"Single Speed"},{name:"Long Range",price:"PKR 40M",engine:"Dual Motor",power:"670 HP",transmission:"Single Speed"},{name:"Plaid",price:"PKR 55M",engine:"Tri Motor",power:"1020 HP",transmission:"Single Speed"}],
        ["All-electric drivetrain","Minimalist cabin","Large touchscreen","Over-the-air software","Fast charging network support","Advanced driver assistance"]),
    makeVehicle(38,"Taycan","Porsche","electric","Electric Sports Sedan","Dual Motor Electric","402–750 HP","PKR 48M","Electric","porsche,taycan,electric car",
        [{name:"Base",price:"PKR 48M",engine:"Electric",power:"402 HP",transmission:"2-speed"},{name:"4S",price:"PKR 60M",engine:"Dual Motor",power:"522 HP",transmission:"2-speed"},{name:"Turbo",price:"PKR 85M",engine:"Dual Motor",power:"670 HP",transmission:"2-speed"}],
        ["800V architecture","Porsche electric performance","Regenerative braking","Premium digital cockpit","Adaptive air suspension options","Fast charging capability"]),
    makeVehicle(39,"Ioniq 5","Hyundai","electric","Electric Crossover","Electric Motor","225–320 HP","PKR 20M","Electric","hyundai,ioniq 5,electric car",
        [{name:"Standard Range",price:"PKR 20M",engine:"Electric",power:"225 HP",transmission:"Single Speed"},{name:"Long Range",price:"PKR 24M",engine:"Electric",power:"320 HP",transmission:"Single Speed"},{name:"N",price:"PKR 32M",engine:"Dual Motor",power:"641 HP",transmission:"Single Speed"}],
        ["Retro-modern design","Ultra-fast charging architecture","Vehicle-to-load capability","Spacious flat floor","Digital cockpit","Advanced safety technology"]),
    makeVehicle(40,"EQE","Mercedes-Benz","electric","Electric Luxury Sedan","Electric Motor","288–402 HP","PKR 42M","Electric","mercedes,eqe,electric luxury car",
        [{name:"EQE 350+",price:"PKR 42M",engine:"Electric",power:"288 HP",transmission:"Single Speed"},{name:"EQE 350 4MATIC",price:"PKR 48M",engine:"Dual Motor",power:"288 HP",transmission:"Single Speed"},{name:"AMG EQE",price:"PKR 60M",engine:"Dual Motor",power:"617 HP",transmission:"Single Speed"}],
        ["MBUX infotainment","Luxury cabin materials","Electric driving experience","Driver assistance systems","Digital instrument display","Regenerative braking"]),
    makeVehicle(41,"Atto 3","BYD","electric","Electric SUV","Electric Motor","201 HP","PKR 18M","Electric","byd,atto 3,electric suv",
        [{name:"Standard Range",price:"PKR 18M",engine:"Electric",power:"201 HP",transmission:"Single Speed"},{name:"Extended Range",price:"PKR 21M",engine:"Electric",power:"201 HP",transmission:"Single Speed"},{name:"Premium",price:"PKR 23M",engine:"Electric",power:"201 HP",transmission:"Single Speed"}],
        ["Blade Battery technology","Rotating infotainment display","Vehicle-to-load capability","Panoramic roof options","Driver assistance systems","Electric powertrain"]),
    makeVehicle(42,"EV6","Kia","electric","Electric Crossover","Dual Motor Electric","225–576 HP","PKR 25M","Electric","kia,ev6,electric vehicle",
        [{name:"Light",price:"PKR 25M",engine:"Electric",power:"225 HP",transmission:"Single Speed"},{name:"Wind AWD",price:"PKR 31M",engine:"Dual Motor",power:"320 HP",transmission:"Single Speed"},{name:"GT",price:"PKR 45M",engine:"Dual Motor",power:"576 HP",transmission:"Single Speed"}],
        ["800V fast charging","Regenerative braking","Vehicle-to-load functionality","Modern digital cockpit","Advanced driver assistance","Sporty electric performance"])
];

const categoryList = document.getElementById("categoryList");
const vehicleGrid = document.getElementById("vehicleGrid");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const categoryIntro = document.getElementById("categoryIntro");
const emptyState = document.getElementById("emptyState");
const backdrop = document.getElementById("modalBackdrop");
let activeCategory = "all";
let activeVehicle = null;
let activeVariant = 0;

const titleCase = value => value.charAt(0).toUpperCase() + value.slice(1);

function imageUrl(vehicle, width = 960, height = 640) {
    return `https://loremflickr.com/${width}/${height}/${encodeURIComponent(vehicle.query)}?lock=${vehicle.id}`;
}

function fallbackImage(image, vehicle) {
    image.onerror = () => {
        image.onerror = null;
        image.src = `https://placehold.co/960x640/202a20/ff852d?text=${encodeURIComponent(vehicle.brand + " " + vehicle.name)}`;
    };
}

function renderVehicles() {
    const term = searchInput.value.trim().toLowerCase();

    const filtered = vehicles.filter(vehicle => {
        const matchesCategory = activeCategory === "all" || vehicle.category === activeCategory;
        const searchable = `${vehicle.name} ${vehicle.brand} ${vehicle.type} ${vehicle.category} ${vehicle.features.join(" ")}`.toLowerCase();
        return matchesCategory && searchable.includes(term);
    });

    resultCount.textContent = filtered.length;
    const category = categories[activeCategory];
    categoryIntro.querySelector(".intro-kicker").textContent = category.kicker;
    categoryIntro.querySelector("h3").textContent = category.title;
    categoryIntro.querySelector(".intro-number").textContent = activeCategory === "all" ? "01 — 07" : `${Object.keys(categories).indexOf(activeCategory).toString().padStart(2,"0")} / 07`;

    vehicleGrid.innerHTML = filtered.map((vehicle,index) => `
        <article class="vehicle-card" data-id="${vehicle.id}" tabindex="0" role="button" aria-label="View ${vehicle.brand} ${vehicle.name}" style="animation-delay:${Math.min(index,10)*35}ms">
            <div class="vehicle-image">
                <img src="${imageUrl(vehicle)}" alt="${vehicle.brand} ${vehicle.name}" loading="lazy">
                <span class="vehicle-category-tag">${titleCase(vehicle.type)}</span>
            </div>
            <div class="vehicle-info">
                <span class="vehicle-brand">${vehicle.brand.toUpperCase()}</span>
                <h3>${vehicle.name}</h3>
                <p>${vehicle.description}</p>
                <div class="card-meta">
                    <span class="card-price"><small>STARTING FROM</small>${vehicle.price}</span>
                    <span class="view-details">VIEW DETAILS ↗</span>
                </div>
            </div>
        </article>
    `).join("");

    vehicleGrid.querySelectorAll("img").forEach(image => {
        const vehicle = filtered.find(item => item.id === Number(image.closest(".vehicle-card").dataset.id));
        fallbackImage(image, vehicle);
    });

    emptyState.classList.toggle("hidden", filtered.length !== 0);
    vehicleGrid.classList.toggle("hidden", filtered.length === 0);
}

function setCategory(category) {
    activeCategory = category;
    categoryList.querySelectorAll(".category-btn").forEach(button => {
        button.classList.toggle("active", button.dataset.category === category);
    });
    renderVehicles();
}

categoryList.addEventListener("click", event => {
    const button = event.target.closest(".category-btn");
    if (button) setCategory(button.dataset.category);
});

searchInput.addEventListener("input", renderVehicles);

document.getElementById("resetFilters").addEventListener("click", () => {
    searchInput.value = "";
    setCategory("all");
});

function openVehicle(id) {
    const vehicle = vehicles.find(item => item.id === id);
    if (!vehicle) return;

    activeVehicle = vehicle;
    activeVariant = 0;

    const image = document.getElementById("modalImage");
    image.onerror = null;
    image.src = imageUrl(vehicle,1200,850);
    image.alt = `${vehicle.brand} ${vehicle.name}`;
    fallbackImage(image,vehicle);

    document.getElementById("modalCategory").textContent = `${titleCase(vehicle.category)} / ${vehicle.type}`;
    document.getElementById("modalBrand").textContent = vehicle.brand.toUpperCase();
    document.getElementById("modalTitle").textContent = vehicle.name;
    document.getElementById("modalDescription").textContent = vehicle.description;
    document.getElementById("variantCount").textContent = `${vehicle.variants.length} configurations`;

    renderVariant();
    document.getElementById("featureList").innerHTML = vehicle.features.map(feature => `<li>${feature}</li>`).join("");

    backdrop.classList.add("open");
    backdrop.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
    document.getElementById("modalClose").focus();
}

function renderVariant() {
    const vehicle = activeVehicle;
    const variant = vehicle.variants[activeVariant];

    document.getElementById("modalPrice").textContent = variant.price;

    document.getElementById("variantList").innerHTML = vehicle.variants.map((item,index) => `
        <button class="variant-btn ${index === activeVariant ? "active" : ""}" data-index="${index}">${item.name}</button>
    `).join("");

    document.getElementById("variantList").querySelectorAll(".variant-btn").forEach(button => {
        button.addEventListener("click", () => {
            activeVariant = Number(button.dataset.index);
            renderVariant();
        });
    });

    const specs = [
        ["ENGINE / POWERTRAIN",variant.engine],
        ["POWER OUTPUT",variant.power],
        ["TRANSMISSION",variant.transmission],
        ["VEHICLE CATEGORY",titleCase(vehicle.category)],
        ["BODY / VEHICLE TYPE",vehicle.type],
        ["CAPACITY / RANGE",vehicle.range]
    ];

    document.getElementById("specGrid").innerHTML = specs.map(([label,value]) => `
        <div class="spec-item"><span>${label}</span><strong>${value}</strong></div>
    `).join("");
}

function closeModal() {
    backdrop.classList.remove("open");
    backdrop.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    activeVehicle = null;
}

vehicleGrid.addEventListener("click", event => {
    const card = event.target.closest(".vehicle-card");
    if (card) openVehicle(Number(card.dataset.id));
});

vehicleGrid.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches(".vehicle-card")) {
        event.preventDefault();
        openVehicle(Number(event.target.dataset.id));
    }
});

document.getElementById("modalClose").addEventListener("click",closeModal);
backdrop.addEventListener("click",event => {
    if (event.target === backdrop) closeModal();
});

document.addEventListener("keydown",event => {
    if (event.key === "Escape" && backdrop.classList.contains("open")) closeModal();
});

document.getElementById("menuToggle").addEventListener("click",() => {
    document.querySelector(".header-nav").classList.toggle("open");
});

document.querySelectorAll(".header-nav a").forEach(link => {
    link.addEventListener("click",() => document.querySelector(".header-nav").classList.remove("open"));
});

const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll",() => {
    backToTop.classList.toggle("visible",window.scrollY > 450);
},{passive:true});
backToTop.addEventListener("click",() => window.scrollTo({top:0,behavior:"smooth"}));

renderVehicles();
console.log("VeloVault showroom initialized:",vehicles.length,"vehicles across",Object.keys(categories).length - 1,"categories.");
