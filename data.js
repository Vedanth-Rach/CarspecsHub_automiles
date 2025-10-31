// Comprehensive Indian Cars Data for 2025 - All Major Brands and Models
const indianCarsData = [
  // MARUTI SUZUKI
  {
    id: 'maruti-alto-k10-2025',
    brand: 'Maruti Suzuki',
    model: 'Alto K10',
    year: 2025,
    category: 'Entry Hatchback',
    bodyType: '5-Door Hatchback',
    seatingCapacity: 5,
    budgetCategory: 'budget', // budget, mid-range, premium, luxury
    description: "The Maruti Suzuki Alto K10 2025 is India's most affordable car with improved fuel efficiency and modern features.",
    pros: ['Most affordable', 'Excellent fuel efficiency', 'Low maintenance', 'Wide service network'],
    cons: ['Basic interior', 'Limited features', 'Small boot space', 'Average build quality'],
    videoReview: 'https://www.youtube.com/embed/-h-AEA0tWkw?si=Fty_bTPjqOT1g__7', // Replace with actual review
    variants: [
      {
        id: 'alto-k10-std',
        name: 'STD',
        pricing: {
          exShowroom: 399000,
          roadTax: 39900,
          insurance: 19950,
          total: 458850
        },
        mileage: { city: 24, highway: 33, combined: 28 },
        engine: {
          type: '3-Cylinder Petrol',
          displacement: '1.0L',
          power: '68 HP',
          torque: '90 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3530, width: 1490, height: 1520, wheelbase: 2380,
          bootSpace: 177, groundClearance: 160
        },
        features: ['Manual Steering', 'Basic Interior', 'Front Power Windows'],
        safety: {
          rating: 2,
          features: ['Driver Airbag', 'ABS', 'Seatbelt Reminder']
        },
        colors: ['Solid White', 'Silver', 'Red'],
        image: 'https://www.popularmaruti.com/storage/upload/vehicle/colors/1661161763_sizziling-red.png'
      },
      {
        id: 'alto-k10-lxi',
        name: 'LXI',
        pricing: {
          exShowroom: 449000,
          roadTax: 44900,
          insurance: 22450,
          total: 516350
        },
        mileage: { city: 24, highway: 33, combined: 28 },
        engine: {
          type: '3-Cylinder Petrol',
          displacement: '1.0L',
          power: '68 HP',
          torque: '90 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3530, width: 1490, height: 1520, wheelbase: 2380,
          bootSpace: 177, groundClearance: 160
        },
        features: ['Power Steering', 'Central Locking', 'All Power Windows', 'Body Colored Bumpers'],
        safety: {
          rating: 2,
          features: ['Driver Airbag', 'ABS', 'Seatbelt Reminder', 'Speed Alert']
        },
        colors: ['Solid White', 'Silver', 'Red', 'Blue'],
        image: 'https://www.popularmaruti.com/storage/upload/vehicle/colors/1661161763_sizziling-red.png'
      },
      {
        id: 'alto-k10-vxi',
        name: 'VXI',
        pricing: {
          exShowroom: 499000,
          roadTax: 49900,
          insurance: 24950,
          total: 573850
        },
        mileage: { city: 24, highway: 33, combined: 28 },
        engine: {
          type: '3-Cylinder Petrol',
          displacement: '1.0L',
          power: '68 HP',
          torque: '90 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3530, width: 1490, height: 1520, wheelbase: 2380,
          bootSpace: 177, groundClearance: 160
        },
        features: ['Power Steering', 'Central Locking', 'All Power Windows', 'AC', 'Music System'],
        safety: {
          rating: 2,
          features: ['Driver Airbag', 'ABS', 'Seatbelt Reminder', 'Speed Alert', 'Reverse Parking Sensors']
        },
        colors: ['Solid White', 'Silver', 'Red', 'Blue', 'Grey'],
        image: 'https://www.popularmaruti.com/storage/upload/vehicle/colors/1661161763_sizziling-red.png'
      }
    ]
  },
  {
    id: 'maruti-swift-2025',
    brand: 'Maruti Suzuki',
    model: 'Swift',
    year: 2025,
    category: 'Premium Hatchback',
    bodyType: '5-Door Hatchback',
    seatingCapacity: 5,
    budgetCategory: 'budget',
    description: 'The Maruti Suzuki Swift 2025 continues to be India\'s most popular premium hatchback with refreshed design, improved fuel efficiency, and modern features.',
    pros: ['Excellent fuel efficiency', 'Sporty design', 'Easy maintenance', 'Good resale value', 'Wide service network', 'Affordable pricing'],
    cons: ['Limited rear space', 'Average build quality', 'Road noise at high speeds', 'Basic interior materials'],
    videoReview: 'https://www.youtube.com/embed/RnF48gRWvGI?si=Z2rks1uYeycf4-TK',
    variants: [
      {
        id: 'swift-lxi',
        name: 'LXI',
        pricing: {
          exShowroom: 599000,
          roadTax: 59900,
          insurance: 29950,
          total: 688850
        },
        mileage: { city: 22, highway: 28, combined: 25 },
        engine: {
          type: '3-Cylinder Petrol',
          displacement: '1.2L',
          power: '90 HP',
          torque: '113 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3845, width: 1735, height: 1530, wheelbase: 2450,
          bootSpace: 268, groundClearance: 163
        },
        features: [
          'Manual Air Conditioning', 'Power Steering', 'Central Locking',
          'Power Windows (Front)', 'Dual Airbags', 'ABS with EBD',
          'Rear Parking Sensors', 'Digital Instrument Cluster'
        ],
        safety: {
          rating: 3,
          features: ['ABS with EBD', 'Brake Assist', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System', 'Seatbelt Reminder']
        },
        colors: ['Pearl Arctic White', 'Metallic Magma Grey', 'Prime Lucent Orange', 'Solid Fire Red'],
        image: 'https://www.varunmaruti.com/uploads/products/colors/new-swift-pearl-arctic-white.png'
      },
      {
        id: 'swift-vxi',
        name: 'VXI',
        pricing: {
          exShowroom: 699000,
          roadTax: 69900,
          insurance: 34950,
          total: 803850
        },
        mileage: { city: 21, highway: 27, combined: 24 },
        engine: {
          type: '3-Cylinder Petrol',
          displacement: '1.2L',
          power: '90 HP',
          torque: '113 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3845, width: 1735, height: 1530, wheelbase: 2450,
          bootSpace: 268, groundClearance: 163
        },
        features: [
          'Manual Air Conditioning', 'Power Steering', 'Central Locking',
          'Power Windows (All)', 'Dual Airbags', 'ABS with EBD',
          'Rear Parking Sensors', '7" Touchscreen Infotainment',
          'Android Auto & Apple CarPlay', 'Steering Mounted Controls'
        ],
        safety: {
          rating: 3,
          features: ['ABS with EBD', 'Brake Assist', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System', 'Seatbelt Reminder', 'Reverse Parking Camera']
        },
        colors: ['Pearl Arctic White', 'Metallic Magma Grey', 'Prime Lucent Orange', 'Solid Fire Red', 'Metallic Silky Silver'],
        image: 'https://www.varunmaruti.com/uploads/products/colors/new-swift-pearl-arctic-white.png'
      },
      {
        id: 'swift-zxi',
        name: 'ZXI',
        pricing: {
          exShowroom: 799000,
          roadTax: 79900,
          insurance: 39950,
          total: 918850
        },
        mileage: { city: 20, highway: 26, combined: 23 },
        engine: {
          type: '3-Cylinder Petrol',
          displacement: '1.2L',
          power: '90 HP',
          torque: '113 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3845, width: 1735, height: 1530, wheelbase: 2450,
          bootSpace: 268, groundClearance: 163
        },
        features: [
          'Automatic Climate Control', 'Power Steering', 'Central Locking',
          'Power Windows (All)', 'Dual Airbags', 'ABS with EBD',
          'Rear Parking Camera', '7" Touchscreen Infotainment',
          'Android Auto & Apple CarPlay', 'Steering Mounted Controls',
          'Push Button Start', 'Keyless Entry', 'LED Headlamps',
          'Alloy Wheels', 'Rear Wiper & Washer'
        ],
        safety: {
          rating: 3,
          features: ['ABS with EBD', 'Brake Assist', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System', 'Seatbelt Reminder', 'Reverse Parking Camera', 'Electronic Stability Program']
        },
        colors: ['Pearl Arctic White', 'Metallic Magma Grey', 'Prime Lucent Orange', 'Solid Fire Red', 'Metallic Silky Silver', 'Midnight Black'],
        image: 'https://www.varunmaruti.com/uploads/products/colors/new-swift-pearl-arctic-white.png'
      },
      {
        id: 'swift-zxi-amt',
        name: 'ZXI+ AMT',
        pricing: {
          exShowroom: 849000,
          roadTax: 84900,
          insurance: 42450,
          total: 976350
        },
        mileage: { city: 19, highway: 25, combined: 22 },
        engine: {
          type: '3-Cylinder Petrol',
          displacement: '1.2L',
          power: '90 HP',
          torque: '113 Nm',
          transmission: 'AMT (Automatic)',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3845, width: 1735, height: 1530, wheelbase: 2450,
          bootSpace: 268, groundClearance: 163
        },
        features: [
          'Automatic Climate Control', 'Power Steering', 'Central Locking',
          'Power Windows (All)', 'Dual Airbags', 'ABS with EBD',
          'Rear Parking Camera', '7" Touchscreen Infotainment',
          'Android Auto & Apple CarPlay', 'Steering Mounted Controls',
          'Push Button Start', 'Keyless Entry', 'LED Headlamps',
          'Alloy Wheels', 'Rear Wiper & Washer', 'Cruise Control'
        ],
        safety: {
          rating: 3,
          features: ['ABS with EBD', 'Brake Assist', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System', 'Seatbelt Reminder', 'Reverse Parking Camera', 'Electronic Stability Program', 'Hill Hold Assist']
        },
        colors: ['Pearl Arctic White', 'Metallic Magma Grey', 'Prime Lucent Orange', 'Solid Fire Red', 'Metallic Silky Silver', 'Midnight Black', 'Blazing Blue'],
        image: 'https://www.varunmaruti.com/uploads/products/colors/new-swift-pearl-arctic-white.png'
      }
    ]
  },
  {
    id: 'maruti-baleno-2025',
    brand: 'Maruti Suzuki',
    model: 'Baleno',
    year: 2025,
    category: 'Premium Hatchback',
    bodyType: '5-Door Hatchback',
    seatingCapacity: 5,
    budgetCategory: 'mid-range',
    description: 'The Maruti Suzuki Baleno 2025 is a premium hatchback with spacious interiors, advanced features, and excellent fuel efficiency.',
    pros: ['Spacious interior', 'Premium features', 'Good fuel efficiency', 'Comfortable ride', 'Strong build quality'],
    cons: ['Higher price than Swift', 'Average ground clearance', 'Road noise', 'Service costs'],
    videoReview: 'https://www.youtube.com/embed/uEL_qwpppWA?si=BzGTEuAMQETxx9iG&amp;start=60',
    variants: [
      {
        id: 'baleno-sigma',
        name: 'Sigma',
        pricing: {
          exShowroom: 649000,
          roadTax: 64900,
          insurance: 32450,
          total: 746350
        },
        mileage: { city: 21, highway: 27, combined: 24 },
        engine: {
          type: '4-Cylinder Petrol',
          displacement: '1.2L',
          power: '90 HP',
          torque: '113 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3990, width: 1745, height: 1500, wheelbase: 2520,
          bootSpace: 339, groundClearance: 170
        },
        features: ['Manual AC', 'Power Steering', 'Central Locking', 'Front Power Windows'],
        safety: {
          rating: 4,
          features: ['Dual Airbags', 'ABS with EBD', 'ISOFIX', 'Reverse Parking Sensors']
        },
        colors: ['Arctic White', 'Splendid Silver', 'Grandeur Grey'],
        image: 'https://www.varunmaruti.com/uploads/products/colors/baleno-grandeur-grey.png'
      },
      {
        id: 'baleno-delta',
        name: 'Delta',
        pricing: {
          exShowroom: 749000,
          roadTax: 74900,
          insurance: 37450,
          total: 861350
        },
        mileage: { city: 20, highway: 26, combined: 23 },
        engine: {
          type: '4-Cylinder Petrol',
          displacement: '1.2L',
          power: '90 HP',
          torque: '113 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3990, width: 1745, height: 1500, wheelbase: 2520,
          bootSpace: 339, groundClearance: 170
        },
        features: ['Auto AC', 'Power Steering', 'Central Locking', 'All Power Windows', '7" Touchscreen', 'Steering Controls'],
        safety: {
          rating: 4,
          features: ['Dual Airbags', 'ABS with EBD', 'ISOFIX', 'Reverse Camera', 'ESP']
        },
        colors: ['Arctic White', 'Splendid Silver', 'Grandeur Grey', 'Luxe Beige', 'Nexa Blue'],
        image: 'https://www.varunmaruti.com/uploads/products/colors/baleno-grandeur-grey.png'
      },
      {
        id: 'baleno-zeta',
        name: 'Zeta',
        pricing: {
          exShowroom: 849000,
          roadTax: 84900,
          insurance: 42450,
          total: 976350
        },
        mileage: { city: 19, highway: 25, combined: 22 },
        engine: {
          type: '4-Cylinder Petrol',
          displacement: '1.2L',
          power: '90 HP',
          torque: '113 Nm',
          transmission: 'CVT Automatic',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3990, width: 1745, height: 1500, wheelbase: 2520,
          bootSpace: 339, groundClearance: 170
        },
        features: ['Auto AC', 'Power Steering', 'Push Button Start', 'All Power Windows', '9" Touchscreen', 'Premium Audio', 'Alloy Wheels'],
        safety: {
          rating: 4,
          features: ['6 Airbags', 'ABS with EBD', 'ISOFIX', '360 Camera', 'ESP', 'Hill Hold']
        },
        colors: ['Arctic White', 'Splendid Silver', 'Grandeur Grey', 'Luxe Beige', 'Nexa Blue', 'Phoenix Red'],
        image: 'https://www.varunmaruti.com/uploads/products/colors/baleno-grandeur-grey.png'
      }
    ]
  },
  // TATA MOTORS
  {
    id: 'tata-tiago-2025',
    brand: 'Tata',
    model: 'Tiago',
    year: 2025,
    category: 'Compact Hatchback',
    bodyType: '5-Door Hatchback',
    seatingCapacity: 5,
    budgetCategory: 'budget',
    description: 'The Tata Tiago 2025 is a stylish and feature-rich compact hatchback with excellent build quality and safety features.',
    pros: ['Stylish design', 'Good build quality', 'Feature-rich', 'Spacious interior', 'Good safety rating'],
    cons: ['Average fuel efficiency', 'Engine refinement', 'Service network', 'Resale value'],
    videoReview: 'https://www.youtube.com/embed/90OAjgw3fnE?si=z3oeSYkfiX3IKYPQ',
    variants: [
      {
        id: 'tiago-xe',
        name: 'XE',
        pricing: {
          exShowroom: 549000,
          roadTax: 54900,
          insurance: 27450,
          total: 631350
        },
        mileage: { city: 19, highway: 26, combined: 22 },
        engine: {
          type: '3-Cylinder Petrol',
          displacement: '1.2L',
          power: '86 HP',
          torque: '113 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3746, width: 1647, height: 1535, wheelbase: 2400,
          bootSpace: 242, groundClearance: 170
        },
        features: ['Manual Steering', 'Manual AC', 'Front Power Windows', 'Central Locking'],
        safety: {
          rating: 4,
          features: ['Dual Airbags', 'ABS with EBD', 'Corner Stability Control', 'ISOFIX']
        },
        colors: ['Polar White', 'Flame Red', 'Daytona Grey'],
        image: 'https://cars.tatamotors.com/content/dam/tml/pv/products/tiago/year-2025/ice/promoting-vc/lifestyle/lifestyle-02.jpg'
      },
      {
        id: 'tiago-xm',
        name: 'XM',
        pricing: {
          exShowroom: 649000,
          roadTax: 64900,
          insurance: 32450,
          total: 746350
        },
        mileage: { city: 18, highway: 25, combined: 21 },
        engine: {
          type: '3-Cylinder Petrol',
          displacement: '1.2L',
          power: '86 HP',
          torque: '113 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3746, width: 1647, height: 1535, wheelbase: 2400,
          bootSpace: 242, groundClearance: 170
        },
        features: ['Power Steering', 'Manual AC', 'All Power Windows', 'Central Locking', '7" Touchscreen'],
        safety: {
          rating: 4,
          features: ['Dual Airbags', 'ABS with EBD', 'Corner Stability Control', 'ISOFIX', 'Reverse Camera']
        },
        colors: ['Polar White', 'Flame Red', 'Daytona Grey', 'Foliage Green'],
        image: 'https://cars.tatamotors.com/content/dam/tml/pv/products/tiago/year-2025/ice/promoting-vc/lifestyle/lifestyle-02.jpg'
      },
      {
        id: 'tiago-xt',
        name: 'XT',
        pricing: {
          exShowroom: 749000,
          roadTax: 74900,
          insurance: 37450,
          total: 861350
        },
        mileage: { city: 17, highway: 24, combined: 20 },
        engine: {
          type: '3-Cylinder Petrol',
          displacement: '1.2L',
          power: '86 HP',
          torque: '113 Nm',
          transmission: 'AMT',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3746, width: 1647, height: 1535, wheelbase: 2400,
          bootSpace: 242, groundClearance: 170
        },
        features: ['Power Steering', 'Auto AC', 'All Power Windows', 'Push Button Start', '7" Touchscreen', 'Alloy Wheels'],
        safety: {
          rating: 4,
          features: ['4 Airbags', 'ABS with EBD', 'Corner Stability Control', 'ISOFIX', 'Reverse Camera', 'ESP']
        },
        colors: ['Polar White', 'Flame Red', 'Daytona Grey', 'Foliage Green', 'Arizona Blue'],
        image: 'https://cars.tatamotors.com/content/dam/tml/pv/products/tiago/year-2025/ice/promoting-vc/lifestyle/lifestyle-02.jpg'
      }
    ]
  },
  {
    id: 'tata-nexon-2025',
    brand: 'Tata',
    model: 'Nexon',
    year: 2025,
    category: 'Compact SUV',
    bodyType: '5-Door Compact SUV',
    seatingCapacity: 5,
    budgetCategory: 'mid-range',
    description: "The Tata Nexon 2025 continues to be India's safest compact SUV with a 5-star Global NCAP rating, featuring bold design and advanced safety features.",
    pros: ['5-star safety rating', 'Spacious interior', 'Good build quality', 'Feature-rich', 'Strong brand value', 'Excellent ground clearance'],
    cons: ['Engine refinement', 'Rear seat comfort', 'Service network in rural areas', 'Road noise'],
    videoReview: 'https://www.youtube.com/embed/PC-ztrSrDMo?si=glsx-IpJ6wrRZj0l',
    variants: [
      {
        id: 'nexon-smart',
        name: 'Smart',
        pricing: {
          exShowroom: 799000,
          roadTax: 79900,
          insurance: 39950,
          total: 918850
        },
        mileage: { city: 16, highway: 21, combined: 18 },
        engine: {
          type: '3-Cylinder Turbo Petrol',
          displacement: '1.2L',
          power: '120 HP',
          torque: '170 Nm',
          transmission: '6-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3993, width: 1811, height: 1606, wheelbase: 2498,
          bootSpace: 350, groundClearance: 208
        },
        features: [
          'Manual Air Conditioning', 'Power Steering', 'Central Locking',
          'Power Windows', 'Dual Airbags', 'ABS with EBD',
          'Rear Parking Sensors', 'Digital Instrument Cluster'
        ],
        safety: {
          rating: 5,
          features: ['ABS with EBD', 'Corner Stability Control', 'Electronic Stability Program', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System']
        },
        colors: ['Pure White', 'Flame Red', 'Foliage Green', 'Calgary White', 'Daytona Grey'],
        image: 'https://st1.techlusive.in/wp-content/uploads/2023/09/nexon-cover.jpg'
      },
      {
        id: 'nexon-smart-plus',
        name: 'Smart+',
        pricing: {
          exShowroom: 949000,
          roadTax: 94900,
          insurance: 47450,
          total: 1091350
        },
        mileage: { city: 15, highway: 20, combined: 17 },
        engine: {
          type: '3-Cylinder Turbo Petrol',
          displacement: '1.2L',
          power: '120 HP',
          torque: '170 Nm',
          transmission: '6-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3993, width: 1811, height: 1606, wheelbase: 2498,
          bootSpace: 350, groundClearance: 208
        },
        features: [
          'Manual Air Conditioning', 'Power Steering', 'Central Locking',
          'Power Windows', '4 Airbags', 'ABS with EBD',
          'Rear Parking Camera', '7" Touchscreen Infotainment',
          'Android Auto & Apple CarPlay', 'Steering Mounted Controls'
        ],
        safety: {
          rating: 5,
          features: ['ABS with EBD', 'Corner Stability Control', 'Electronic Stability Program', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System', 'Reverse Parking Camera']
        },
        colors: ['Pure White', 'Flame Red', 'Foliage Green', 'Calgary White', 'Daytona Grey', 'Magnetic Red'],
        image: 'https://st1.techlusive.in/wp-content/uploads/2023/09/nexon-cover.jpg'
      },
      {
        id: 'nexon-pure-plus',
        name: 'Pure+',
        pricing: {
          exShowroom: 1149000,
          roadTax: 114900,
          insurance: 57450,
          total: 1321350
        },
        mileage: { city: 14, highway: 19, combined: 16 },
        engine: {
          type: '3-Cylinder Turbo Petrol',
          displacement: '1.2L',
          power: '120 HP',
          torque: '170 Nm',
          transmission: 'AMT (Automatic)',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3993, width: 1811, height: 1606, wheelbase: 2498,
          bootSpace: 350, groundClearance: 208
        },
        features: [
          'Automatic Climate Control', 'Power Steering', 'Central Locking',
          'Power Windows', '6 Airbags', 'ABS with EBD',
          'Rear Parking Camera', '10.25" Touchscreen Infotainment',
          'Android Auto & Apple CarPlay', 'Steering Mounted Controls',
          'Push Button Start', 'Keyless Entry', 'Alloy Wheels'
        ],
        safety: {
          rating: 5,
          features: ['ABS with EBD', 'Corner Stability Control', 'Electronic Stability Program', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System', 'Reverse Parking Camera', 'Front Parking Sensors']
        },
        colors: ['Pure White', 'Flame Red', 'Foliage Green', 'Calgary White', 'Daytona Grey', 'Magnetic Red', 'Fearless Purple'],
        image: 'https://st1.techlusive.in/wp-content/uploads/2023/09/nexon-cover.jpg'
      },
      {
        id: 'nexon-fearless-plus',
        name: 'Fearless+',
        pricing: {
          exShowroom: 1399000,
          roadTax: 139900,
          insurance: 69950,
          total: 1608850
        },
        mileage: { city: 13, highway: 18, combined: 15 },
        engine: {
          type: '3-Cylinder Turbo Petrol',
          displacement: '1.2L',
          power: '120 HP',
          torque: '170 Nm',
          transmission: '7-Speed DCT',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3993, width: 1811, height: 1606, wheelbase: 2498,
          bootSpace: 350, groundClearance: 208
        },
        features: [
          'Automatic Climate Control', 'Power Steering', 'Central Locking',
          'Power Windows', '6 Airbags', 'ABS with EBD',
          '360-Degree Camera', '10.25" Touchscreen Infotainment',
          'Android Auto & Apple CarPlay', 'Steering Mounted Controls',
          'Push Button Start', 'Keyless Entry', 'LED Headlamps',
          'Sunroof', 'Wireless Phone Charging', 'JBL Sound System',
          'Air Purifier', 'Ventilated Front Seats'
        ],
        safety: {
          rating: 5,
          features: ['ABS with EBD', 'Corner Stability Control', 'Electronic Stability Program', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System', '360-Degree Camera', 'Front & Rear Parking Sensors', 'Tyre Pressure Monitoring', 'Electronic Parking Brake']
        },
        colors: ['Pure White', 'Flame Red', 'Foliage Green', 'Calgary White', 'Daytona Grey', 'Magnetic Red', 'Fearless Purple', 'Pristine White'],
        image: 'https://st1.techlusive.in/wp-content/uploads/2023/09/nexon-cover.jpg'
      }
    ]
  },
  // HYUNDAI
  {
    id: 'hyundai-i10-nios-2025',
    brand: 'Hyundai',
    model: 'Grand i10 Nios',
    year: 2025,
    category: 'Compact Hatchback',
    bodyType: '5-Door Hatchback',
    seatingCapacity: 5,
    budgetCategory: 'budget',
    description: 'The Hyundai Grand i10 Nios 2025 is a feature-rich compact hatchback with premium interiors and advanced connectivity features.',
    pros: ['Premium interiors', 'Feature-rich', 'Good build quality', 'Comfortable ride', 'Strong after-sales service'],
    cons: ['Higher price', 'Average fuel efficiency', 'Limited boot space', 'Engine refinement'],
    videoReview: 'https://www.youtube.com/embed/MBv-pH-KJik?si=q6wVxhvafx-cVzZm',
    variants: [
      {
        id: 'i10-nios-era',
        name: 'Era',
        pricing: {
          exShowroom: 579000,
          roadTax: 57900,
          insurance: 28950,
          total: 665850
        },
        mileage: { city: 20, highway: 26, combined: 23 },
        engine: {
          type: '4-Cylinder Petrol',
          displacement: '1.2L',
          power: '83 HP',
          torque: '114 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3805, width: 1680, height: 1520, wheelbase: 2450,
          bootSpace: 260, groundClearance: 165
        },
        features: ['Manual AC', 'Power Steering', 'Central Locking', 'Front Power Windows'],
        safety: {
          rating: 3,
          features: ['Driver Airbag', 'ABS with EBD', 'Rear Parking Sensors', 'Seatbelt Reminder']
        },
        colors: ['Polar White', 'Fiery Red', 'Typhoon Silver'],
        image: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Ext_1120x600_3.jpg'
      },
      {
        id: 'i10-nios-magna',
        name: 'Magna',
        pricing: {
          exShowroom: 679000,
          roadTax: 67900,
          insurance: 33950,
          total: 780850
        },
        mileage: { city: 19, highway: 25, combined: 22 },
        engine: {
          type: '4-Cylinder Petrol',
          displacement: '1.2L',
          power: '83 HP',
          torque: '114 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3805, width: 1680, height: 1520, wheelbase: 2450,
          bootSpace: 260, groundClearance: 165
        },
        features: ['Manual AC', 'Power Steering', 'Central Locking', 'All Power Windows', '8" Touchscreen', 'Steering Controls'],
        safety: {
          rating: 3,
          features: ['Dual Airbags', 'ABS with EBD', 'Rear Parking Sensors', 'Seatbelt Reminder', 'ISOFIX']
        },
        colors: ['Polar White', 'Fiery Red', 'Typhoon Silver', 'Aqua Teal'],
        image: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Ext_1120x600_3.jpg'
      },
      {
        id: 'i10-nios-sportz',
        name: 'Sportz',
        pricing: {
          exShowroom: 779000,
          roadTax: 77900,
          insurance: 38950,
          total: 895850
        },
        mileage: { city: 18, highway: 24, combined: 21 },
        engine: {
          type: '4-Cylinder Petrol',
          displacement: '1.2L',
          power: '83 HP',
          torque: '114 Nm',
          transmission: 'AMT',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 3805, width: 1680, height: 1520, wheelbase: 2450,
          bootSpace: 260, groundClearance: 165
        },
        features: ['Auto AC', 'Power Steering', 'Push Button Start', 'All Power Windows', '8" Touchscreen', 'Wireless Charging', 'Alloy Wheels'],
        safety: {
          rating: 3,
          features: ['6 Airbags', 'ABS with EBD', 'Rear Camera', 'Seatbelt Reminder', 'ISOFIX', 'ESP']
        },
        colors: ['Polar White', 'Fiery Red', 'Typhoon Silver', 'Aqua Teal', 'Titan Grey'],
        image: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Ext_1120x600_3.jpg'
      }
    ]
  },
  {
    id: 'hyundai-creta-2025',
    brand: 'Hyundai',
    model: 'Creta',
    year: 2025,
    category: 'Compact SUV',
    bodyType: '5-Door Compact SUV',
    seatingCapacity: 5,
    budgetCategory: 'mid-range',
    description: "The Hyundai Creta 2025 is India's most popular compact SUV with refreshed design, advanced features, and efficient turbo engines.",
    pros: ['Stylish design', 'Feature-loaded cabin', 'Smooth automatic transmission', 'Good after-sales service', 'Excellent ride quality'],
    cons: ['Average rear seat space', 'Engine noise at idle', 'High service costs', 'Limited off-road capability'],
    videoReview: 'https://www.youtube.com/embed/qqu-IFY2gdI?si=75TjjS28IM9H3h-j',
    variants: [
      {
        id: 'creta-e',
        name: 'E',
        pricing: {
          exShowroom: 1099000,
          roadTax: 109900,
          insurance: 54950,
          total: 1263850
        },
        mileage: { city: 16, highway: 21, combined: 18 },
        engine: {
          type: '4-Cylinder Naturally Aspirated',
          displacement: '1.5L',
          power: '115 HP',
          torque: '144 Nm',
          transmission: '6-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4300, width: 1790, height: 1635, wheelbase: 2610,
          bootSpace: 433, groundClearance: 190
        },
        features: [
          '8" Touchscreen Infotainment', 'Manual Air Conditioning',
          'Fabric Seats', 'Power Windows', 'Central Locking',
          'Dual Airbags', 'ABS with EBD', 'Rear Parking Sensors'
        ],
        safety: {
          rating: 4,
          features: ['ABS with EBD', 'Electronic Stability Control', 'Vehicle Stability Management', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System']
        },
        colors: ['Polar White', 'Phantom Black', 'Titan Grey', 'Atlas White'],
        image: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/mob/cretagalleryb2.jpg'
      },
      {
        id: 'creta-ex',
        name: 'EX',
        pricing: {
          exShowroom: 1299000,
          roadTax: 129900,
          insurance: 64950,
          total: 1493850
        },
        mileage: { city: 15, highway: 20, combined: 17 },
        engine: {
          type: '4-Cylinder Turbo Petrol',
          displacement: '1.5L',
          power: '160 HP',
          torque: '253 Nm',
          transmission: '6-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4300, width: 1790, height: 1635, wheelbase: 2610,
          bootSpace: 433, groundClearance: 190
        },
        features: [
          '10.25" Touchscreen Infotainment', 'Automatic Climate Control',
          'Leatherette Seats', 'Power Windows', 'Central Locking',
          '6 Airbags', 'ABS with EBD', 'Rear Parking Camera',
          'Android Auto & Apple CarPlay', 'Wireless Phone Charging'
        ],
        safety: {
          rating: 4,
          features: ['ABS with EBD', 'Electronic Stability Control', 'Vehicle Stability Management', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System', 'Reverse Camera']
        },
        colors: ['Polar White', 'Phantom Black', 'Titan Grey', 'Atlas White', 'Fiery Red'],
        image: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/mob/cretagalleryb2.jpg'
      },
      {
        id: 'creta-s',
        name: 'S Turbo CVT',
        pricing: {
          exShowroom: 1599000,
          roadTax: 159900,
          insurance: 79950,
          total: 1838850
        },
        mileage: { city: 14, highway: 19, combined: 16 },
        engine: {
          type: '4-Cylinder Turbo Petrol',
          displacement: '1.5L',
          power: '160 HP',
          torque: '253 Nm',
          transmission: 'CVT Automatic',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4300, width: 1790, height: 1635, wheelbase: 2610,
          bootSpace: 433, groundClearance: 190
        },
        features: [
          '10.25" Touchscreen Infotainment', 'Automatic Climate Control',
          'Ventilated Front Seats', 'Power Windows', 'Central Locking',
          '6 Airbags', 'ABS with EBD', 'Rear Parking Camera',
          'Android Auto & Apple CarPlay', 'Wireless Phone Charging',
          'Sunroof', 'Premium Bose Audio', 'Cruise Control'
        ],
        safety: {
          rating: 4,
          features: ['ABS with EBD', 'Electronic Stability Control', 'Vehicle Stability Management', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System', 'Reverse Camera', 'Front Parking Sensors']
        },
        colors: ['Polar White', 'Phantom Black', 'Titan Grey', 'Atlas White', 'Fiery Red', 'Knight Black'],
        image: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/mob/cretagalleryb2.jpg'
      },
      {
        id: 'creta-sx',
        name: 'SX(O) Turbo DCT',
        pricing: {
          exShowroom: 1899000,
          roadTax: 189900,
          insurance: 94950,
          total: 2183850
        },
        mileage: { city: 13, highway: 18, combined: 15 },
        engine: {
          type: '4-Cylinder Turbo Petrol',
          displacement: '1.5L',
          power: '160 HP',
          torque: '253 Nm',
          transmission: '7-Speed DCT',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4300, width: 1790, height: 1635, wheelbase: 2610,
          bootSpace: 433, groundClearance: 190
        },
        features: [
          '10.25" Touchscreen Infotainment', 'Dual-Zone Climate Control',
          'Ventilated Front Seats', 'Power Windows', 'Central Locking',
          '6 Airbags', 'ABS with EBD', '360-Degree Camera',
          'Android Auto & Apple CarPlay', 'Wireless Phone Charging',
          'Panoramic Sunroof', 'Premium Bose Audio', 'Cruise Control',
          'BlueLink Connected Car', 'Air Purifier', 'Ambient Lighting'
        ],
        safety: {
          rating: 4,
          features: ['ABS with EBD', 'Electronic Stability Control', 'Vehicle Stability Management', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System', '360-Degree Camera', 'Front & Rear Parking Sensors', 'Tyre Pressure Monitoring']
        },
        colors: ['Polar White', 'Phantom Black', 'Titan Grey', 'Atlas White', 'Fiery Red', 'Knight Black', 'Typhoon Silver'],
        image: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/mob/cretagalleryb2.jpg'
      }
    ]
  },
  // MAHINDRA
  {
    id: 'mahindra-xuv700-2025',
    brand: 'Mahindra',
    model: 'XUV700',
    year: 2025,
    category: 'SUV',
    bodyType: '7-Seater SUV',
    seatingCapacity: 7,
    budgetCategory: 'premium',
    description: 'The Mahindra XUV700 is a premium 7-seater SUV that combines bold design, advanced technology, and powerful performance with best-in-class features.',
    pros: ['Spacious 7-seater cabin', 'Feature-rich interior', 'Powerful engine options', 'Good build quality', 'ADAS Level 2', 'Premium Sony audio'],
    cons: ['High maintenance cost', 'Average fuel efficiency', 'Road noise at high speeds', 'Expensive top variants'],
    videoReview: 'https://www.youtube.com/embed/3oAZMKZ1-HA?si=Nd-dxToAD1Cg02VU&amp;start=28',
    variants: [
      {
        id: 'xuv700-mx-petrol',
        name: 'MX Petrol',
        pricing: {
          exShowroom: 1399000,
          roadTax: 139900,
          insurance: 69950,
          total: 1608850
        },
        mileage: { city: 12, highway: 16, combined: 14 },
        engine: {
          type: '4-Cylinder Turbo Petrol',
          displacement: '2.0L',
          power: '200 HP',
          torque: '380 Nm',
          transmission: '6-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4695, width: 1890, height: 1755, wheelbase: 2750,
          bootSpace: 678, groundClearance: 200
        },
        features: [
          '10.25" Touchscreen Infotainment', 'Dual-Zone Climate Control',
          'LED Headlamps', 'Cruise Control', 'Push Button Start',
          '6 Airbags', 'Tyre Pressure Monitoring', 'Hill Hold Control'
        ],
        safety: {
          rating: 5,
          features: ['ABS with EBD', 'Electronic Stability Control', 'Hill Start Assist', 'ISOFIX Child Seat Mounts', 'Reverse Parking Camera', 'Front & Rear Parking Sensors']
        },
        colors: ['Napoli Black', 'Dazzling Silver', 'Red Rage', 'Everest White', 'Electric Blue'],
        image: 'https://images.hindustantimes.com/auto/img/2024/05/04/1600x900/Mahindra_XUV700_Blaze_Edition_1714791323031_1714791332084.jpg'
      },
      {
        id: 'xuv700-ax5-petrol',
        name: 'AX5 Petrol AT',
        pricing: {
          exShowroom: 1699000,
          roadTax: 169900,
          insurance: 84950,
          total: 1953850
        },
        mileage: { city: 11, highway: 15, combined: 13 },
        engine: {
          type: '4-Cylinder Turbo Petrol',
          displacement: '2.0L',
          power: '200 HP',
          torque: '380 Nm',
          transmission: '6-Speed Automatic',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4695, width: 1890, height: 1755, wheelbase: 2750,
          bootSpace: 678, groundClearance: 200
        },
        features: [
          '10.25" Touchscreen Infotainment', 'Dual-Zone Climate Control',
          'LED Headlamps', 'Cruise Control', 'Push Button Start',
          '7 Airbags', 'Panoramic Sunroof', '12-Speaker Sony Audio',
          'Wireless Phone Charging', 'AdrenoX Connect'
        ],
        safety: {
          rating: 5,
          features: ['ABS with EBD', 'Electronic Stability Control', 'Hill Start Assist', 'ISOFIX Child Seat Mounts', 'Reverse Parking Camera', '360-Degree Camera', 'Blind Spot Detection']
        },
        colors: ['Napoli Black', 'Dazzling Silver', 'Red Rage', 'Everest White', 'Electric Blue', 'Midnight Black'],
        image: 'https://images.hindustantimes.com/auto/img/2024/05/04/1600x900/Mahindra_XUV700_Blaze_Edition_1714791323031_1714791332084.jpg'
      },
      {
        id: 'xuv700-ax7-diesel',
        name: 'AX7 Diesel AT',
        pricing: {
          exShowroom: 1999000,
          roadTax: 199900,
          insurance: 99950,
          total: 2298850
        },
        mileage: { city: 14, highway: 18, combined: 16 },
        engine: {
          type: '4-Cylinder Turbo Diesel',
          displacement: '2.2L',
          power: '185 HP',
          torque: '420 Nm',
          transmission: '6-Speed Automatic',
          fuelType: 'Diesel'
        },
        dimensions: {
          length: 4695, width: 1890, height: 1755, wheelbase: 2750,
          bootSpace: 678, groundClearance: 200
        },
        features: [
          '10.25" Touchscreen Infotainment', 'Dual-Zone Climate Control',
          'LED Headlamps', 'Cruise Control', 'Push Button Start',
          '7 Airbags', 'Panoramic Sunroof', '12-Speaker Sony Audio',
          'Wireless Phone Charging', 'AdrenoX Connect', 'ADAS Level 2',
          'Flush Door Handles', 'Alexa Built-in'
        ],
        safety: {
          rating: 5,
          features: ['ABS with EBD', 'Electronic Stability Control', 'Hill Start Assist', 'ISOFIX Child Seat Mounts', '360-Degree Camera', 'Blind Spot Detection', 'Forward Collision Warning', 'Autonomous Emergency Braking']
        },
        colors: ['Napoli Black', 'Dazzling Silver', 'Red Rage', 'Everest White', 'Electric Blue', 'Midnight Black', 'Pearl White'],
        image: 'https://images.hindustantimes.com/auto/img/2024/05/04/1600x900/Mahindra_XUV700_Blaze_Edition_1714791323031_1714791332084.jpg'
      },
      {
        id: 'xuv700-ax7l-diesel-4wd',
        name: 'AX7L Diesel 4WD',
        pricing: {
          exShowroom: 2399000,
          roadTax: 239900,
          insurance: 119950,
          total: 2758850
        },
        mileage: { city: 13, highway: 17, combined: 15 },
        engine: {
          type: '4-Cylinder Turbo Diesel',
          displacement: '2.2L',
          power: '185 HP',
          torque: '420 Nm',
          transmission: '6-Speed Automatic + 4WD',
          fuelType: 'Diesel'
        },
        dimensions: {
          length: 4695, width: 1890, height: 1755, wheelbase: 2750,
          bootSpace: 678, groundClearance: 200
        },
        features: [
          '10.25" Touchscreen Infotainment', 'Dual-Zone Climate Control',
          'LED Headlamps', 'Cruise Control', 'Push Button Start',
          '7 Airbags', 'Panoramic Sunroof', '12-Speaker Sony Audio',
          'Wireless Phone Charging', 'AdrenoX Connect', 'ADAS Level 2',
          'Flush Door Handles', 'Alexa Built-in', '4WD System',
          'Terrain Response Modes', 'Electronic Differential Lock'
        ],
        safety: {
          rating: 5,
          features: ['ABS with EBD', 'Electronic Stability Control', 'Hill Start Assist', 'Hill Descent Control', 'ISOFIX Child Seat Mounts', '360-Degree Camera', 'Blind Spot Detection', 'Forward Collision Warning', 'Autonomous Emergency Braking']
        },
        colors: ['Napoli Black', 'Dazzling Silver', 'Red Rage', 'Everest White', 'Electric Blue', 'Midnight Black', 'Pearl White'],
        image: 'https://images.hindustantimes.com/auto/img/2024/05/04/1600x900/Mahindra_XUV700_Blaze_Edition_1714791323031_1714791332084.jpg'
      }
    ]
  },
  {
    id: 'mahindra-scorpio-n-2025',
    brand: 'Mahindra',
    model: 'Scorpio-N',
    year: 2025,
    category: 'SUV',
    bodyType: '7-Seater SUV',
    seatingCapacity: 7,
    budgetCategory: 'premium',
    description: 'The Mahindra Scorpio-N 2025 is a powerful and rugged SUV that combines traditional Scorpio DNA with modern technology and premium features.',
    pros: ['Powerful engine options', 'Commanding road presence', 'Spacious 7-seater cabin', 'Good off-road capability', '4WD available', 'Strong build quality'],
    cons: ['High fuel consumption', 'Expensive maintenance', 'Road noise', 'Stiff ride quality'],
    videoReview: 'https://www.youtube.com/embed/pO19p8vgJC8?si=uBMb0XEOQKm3QH6H',
    variants: [
      {
        id: 'scorpio-n-z2',
        name: 'Z2',
        pricing: {
          exShowroom: 1299000,
          roadTax: 129900,
          insurance: 64950,
          total: 1493850
        },
        mileage: { city: 13, highway: 17, combined: 15 },
        engine: {
          type: '4-Cylinder Turbo Petrol',
          displacement: '2.0L',
          power: '203 HP',
          torque: '370 Nm',
          transmission: '6-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4662, width: 1917, height: 1870, wheelbase: 2750,
          bootSpace: 203, groundClearance: 200
        },
        features: [
          'Manual Air Conditioning', 'Power Steering', 'Central Locking',
          'Power Windows', 'Dual Airbags', 'ABS with EBD',
          'Rear Parking Sensors', '8" Touchscreen Infotainment'
        ],
        safety: {
          rating: 4,
          features: ['ABS with EBD', 'Electronic Stability Program', 'Hill Start Assist', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System']
        },
        colors: ['Pearl White', 'Napoli Black', 'Red Rage', 'Dazzling Silver'],
        image: 'https://stimg.cardekho.com/images/car-images/930x620/Mahindra/Scorpio-N/12418/1740458975937/Black_0d0d11.jpg'
      },
      {
        id: 'scorpio-n-z4',
        name: 'Z4',
        pricing: {
          exShowroom: 1599000,
          roadTax: 159900,
          insurance: 79950,
          total: 1838850
        },
        mileage: { city: 12, highway: 16, combined: 14 },
        engine: {
          type: '4-Cylinder Turbo Petrol',
          displacement: '2.0L',
          power: '203 HP',
          torque: '370 Nm',
          transmission: '6-Speed Automatic',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4662, width: 1917, height: 1870, wheelbase: 2750,
          bootSpace: 203, groundClearance: 200
        },
        features: [
          'Dual-Zone Climate Control', 'Power Steering', 'Central Locking',
          'Power Windows', '6 Airbags', 'ABS with EBD',
          'Rear Parking Camera', '8" Touchscreen Infotainment',
          'Android Auto & Apple CarPlay', 'Cruise Control'
        ],
        safety: {
          rating: 4,
          features: ['ABS with EBD', 'Electronic Stability Program', 'Hill Start Assist', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System', 'Reverse Camera']
        },
        colors: ['Pearl White', 'Napoli Black', 'Red Rage', 'Dazzling Silver', 'Electric Blue'],
        image: 'https://stimg.cardekho.com/images/car-images/930x620/Mahindra/Scorpio-N/12418/1740458975937/Black_0d0d11.jpg'
      },
      {
        id: 'scorpio-n-z6',
        name: 'Z6 Diesel',
        pricing: {
          exShowroom: 1799000,
          roadTax: 179900,
          insurance: 89950,
          total: 2068850
        },
        mileage: { city: 15, highway: 19, combined: 17 },
        engine: {
          type: '4-Cylinder Turbo Diesel',
          displacement: '2.2L',
          power: '175 HP',
          torque: '400 Nm',
          transmission: '6-Speed Manual',
          fuelType: 'Diesel'
        },
        dimensions: {
          length: 4662, width: 1917, height: 1870, wheelbase: 2750,
          bootSpace: 203, groundClearance: 200
        },
        features: [
          'Dual-Zone Climate Control', 'Power Steering', 'Central Locking',
          'Power Windows', '6 Airbags', 'ABS with EBD',
          'Rear Parking Camera', '8" Touchscreen Infotainment',
          'Android Auto & Apple CarPlay', 'Cruise Control',
          'LED Headlamps', 'Alloy Wheels', 'Roof Rails'
        ],
        safety: {
          rating: 4,
          features: ['ABS with EBD', 'Electronic Stability Program', 'Hill Start Assist', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System', 'Reverse Camera', 'Front Parking Sensors']
        },
        colors: ['Pearl White', 'Napoli Black', 'Red Rage', 'Dazzling Silver', 'Electric Blue', 'Midnight Black'],
        image: 'https://stimg.cardekho.com/images/car-images/930x620/Mahindra/Scorpio-N/12418/1740458975937/Black_0d0d11.jpg'
      },
      {
        id: 'scorpio-n-z8l-4wd',
        name: 'Z8L Diesel 4WD',
        pricing: {
          exShowroom: 2199000,
          roadTax: 219900,
          insurance: 109950,
          total: 2528850
        },
        mileage: { city: 14, highway: 18, combined: 16 },
        engine: {
          type: '4-Cylinder Turbo Diesel',
          displacement: '2.2L',
          power: '175 HP',
          torque: '400 Nm',
          transmission: '6-Speed Automatic + 4WD',
          fuelType: 'Diesel'
        },
        dimensions: {
          length: 4662, width: 1917, height: 1870, wheelbase: 2750,
          bootSpace: 203, groundClearance: 200
        },
        features: [
          'Dual-Zone Climate Control', 'Power Steering', 'Central Locking',
          'Power Windows', '6 Airbags', 'ABS with EBD',
          '360-Degree Camera', '8" Touchscreen Infotainment',
          'Android Auto & Apple CarPlay', 'Cruise Control',
          'LED Headlamps', 'Alloy Wheels', 'Roof Rails',
          '4WD System', 'Terrain Response Modes', 'Wireless Phone Charging',
          'Premium Audio System', 'Captain Seats (2nd Row)'
        ],
        safety: {
          rating: 4,
          features: ['ABS with EBD', 'Electronic Stability Program', 'Hill Start Assist', 'Hill Descent Control', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Speed Alert System', '360-Degree Camera', 'Front & Rear Parking Sensors', 'Tyre Pressure Monitoring']
        },
        colors: ['Pearl White', 'Napoli Black', 'Red Rage', 'Dazzling Silver', 'Electric Blue', 'Midnight Black', 'Everest White'],
        image: 'https://stimg.cardekho.com/images/car-images/930x620/Mahindra/Scorpio-N/12418/1740458975937/Black_0d0d11.jpg'
      }
    ]
  },
  // TOYOTA
  {
    id: 'toyota-innova-crysta-2025',
    brand: 'Toyota',
    model: 'Innova Crysta',
    year: 2025,
    category: 'MPV',
    bodyType: '8-Seater MPV',
    seatingCapacity: 8,
    budgetCategory: 'premium',
    description: "The Toyota Innova Crysta 2025 remains India's most trusted premium MPV with enhanced features, improved comfort, and legendary Toyota reliability.",
    pros: ['Excellent reliability', 'Spacious and comfortable', 'Strong resale value', 'Smooth ride quality', 'Premium build quality', 'Wide service network'],
    cons: ['High price', 'Average fuel efficiency', 'Limited boot space with all seats up', 'Expensive maintenance'],
    videoReview: 'https://www.youtube.com/embed/3IvEa4nWEI8?si=LozioBI5bNbeH-9m&amp;start=45',
    variants: [
      {
        id: 'innova-gx',
        name: 'GX',
        pricing: {
          exShowroom: 1899000,
          roadTax: 189900,
          insurance: 94950,
          total: 2183850
        },
        mileage: { city: 13, highway: 17, combined: 15 },
        engine: {
          type: '4-Cylinder Diesel',
          displacement: '2.4L',
          power: '150 HP',
          torque: '343 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Diesel'
        },
        dimensions: {
          length: 4735, width: 1830, height: 1795, wheelbase: 2750,
          bootSpace: 300, groundClearance: 178
        },
        features: [
          '8" Touchscreen Infotainment', 'Manual Air Conditioning',
          'Fabric Seats', 'Power Windows', 'Central Locking',
          'Dual Airbags', 'ABS with EBD', 'Rear Parking Sensors'
        ],
        safety: {
          rating: 4,
          features: ['ABS with EBD', 'Brake Assist', 'Vehicle Stability Control', 'Hill Start Assist', 'ISOFIX Child Seat Anchors', 'Immobilizer']
        },
        colors: ['Super White', 'Silver Metallic', 'Grey Metallic', 'Avant Garde Bronze'],
        image: 'https://static3.toyotabharat.com/images/showroom/innova-mmc/unmatched-unrivaled-banner1600x850.jpg'
      },
      {
        id: 'innova-vx',
        name: 'VX',
        pricing: {
          exShowroom: 2199000,
          roadTax: 219900,
          insurance: 109950,
          total: 2528850
        },
        mileage: { city: 12, highway: 16, combined: 14 },
        engine: {
          type: '4-Cylinder Diesel',
          displacement: '2.4L',
          power: '150 HP',
          torque: '343 Nm',
          transmission: '6-Speed Automatic',
          fuelType: 'Diesel'
        },
        dimensions: {
          length: 4735, width: 1830, height: 1795, wheelbase: 2750,
          bootSpace: 300, groundClearance: 178
        },
        features: [
          '9" Touchscreen Infotainment', 'Automatic Climate Control',
          'Leather Seats', 'Power Windows', 'Central Locking',
          '6 Airbags', 'ABS with EBD', 'Rear Parking Camera',
          'Cruise Control', 'Push Button Start', 'Smart Entry',
          'Captain Seats (2nd Row)'
        ],
        safety: {
          rating: 4,
          features: ['ABS with EBD', 'Brake Assist', 'Vehicle Stability Control', 'Hill Start Assist', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Reverse Camera', 'Front Parking Sensors']
        },
        colors: ['Super White', 'Silver Metallic', 'Grey Metallic', 'Avant Garde Bronze', 'Phantom Brown'],
        image: 'https://static3.toyotabharat.com/images/showroom/innova-mmc/unmatched-unrivaled-banner1600x850.jpg'
      },
      {
        id: 'innova-zx',
        name: 'ZX',
        pricing: {
          exShowroom: 2499000,
          roadTax: 249900,
          insurance: 124950,
          total: 2873850
        },
        mileage: { city: 12, highway: 16, combined: 14 },
        engine: {
          type: '4-Cylinder Diesel',
          displacement: '2.4L',
          power: '150 HP',
          torque: '343 Nm',
          transmission: '6-Speed Automatic',
          fuelType: 'Diesel'
        },
        dimensions: {
          length: 4735, width: 1830, height: 1795, wheelbase: 2750,
          bootSpace: 300, groundClearance: 178
        },
        features: [
          '9" Touchscreen Infotainment', 'Automatic Climate Control',
          'Premium Leather Seats', 'Power Windows', 'Central Locking',
          '7 Airbags', 'ABS with EBD', 'Rear Parking Camera',
          'Cruise Control', 'Push Button Start', 'Smart Entry',
          'Captain Seats (2nd Row)', 'Roof Rails', 'LED Headlamps',
          'Alloy Wheels', 'Premium Audio System', 'Wireless Phone Charging'
        ],
        safety: {
          rating: 4,
          features: ['ABS with EBD', 'Brake Assist', 'Vehicle Stability Control', 'Hill Start Assist', 'ISOFIX Child Seat Anchors', 'Immobilizer', 'Reverse Camera', 'Front & Rear Parking Sensors', 'Tyre Pressure Monitoring']
        },
        colors: ['Super White', 'Silver Metallic', 'Grey Metallic', 'Avant Garde Bronze', 'Phantom Brown', 'Pearl White'],
        image: 'https://static3.toyotabharat.com/images/showroom/innova-mmc/unmatched-unrivaled-banner1600x850.jpg'
      }
    ]
  },
  // HONDA
  {
    id: 'honda-city-2025',
    brand: 'Honda',
    model: 'City',
    year: 2025,
    category: 'Sedan',
    bodyType: '4-Door Sedan',
    seatingCapacity: 5,
    budgetCategory: 'mid-range',
    description: "The Honda City 2025 is a premium sedan with refined interiors, advanced features, and Honda's legendary reliability.",
    pros: ['Premium interiors', 'Smooth engine', 'Good fuel efficiency', 'Spacious cabin', 'Strong resale value'],
    cons: ['High price', 'Average ground clearance', 'Road noise', 'Service costs'],
    videoReview: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    variants: [
      {
        id: 'city-v',
        name: 'V',
        pricing: {
          exShowroom: 1199000,
          roadTax: 119900,
          insurance: 59950,
          total: 1378850
        },
        mileage: { city: 17, highway: 24, combined: 20 },
        engine: {
          type: '4-Cylinder Petrol',
          displacement: '1.5L',
          power: '121 HP',
          torque: '145 Nm',
          transmission: '6-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4549, width: 1748, height: 1489, wheelbase: 2600,
          bootSpace: 506, groundClearance: 165
        },
        features: ['Manual AC', 'Power Steering', 'Central Locking', 'All Power Windows', '8" Touchscreen'],
        safety: {
          rating: 4,
          features: ['6 Airbags', 'ABS with EBD', 'VSA', 'Hill Start Assist', 'ISOFIX']
        },
        colors: ['Platinum White Pearl', 'Metallic Taffeta White', 'Lunar Silver Metallic'],
        image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-76.jpeg'
      },
      {
        id: 'city-vx',
        name: 'VX',
        pricing: {
          exShowroom: 1349000,
          roadTax: 134900,
          insurance: 67450,
          total: 1551350
        },
        mileage: { city: 16, highway: 23, combined: 19 },
        engine: {
          type: '4-Cylinder Petrol',
          displacement: '1.5L',
          power: '121 HP',
          torque: '145 Nm',
          transmission: 'CVT Automatic',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4549, width: 1748, height: 1489, wheelbase: 2600,
          bootSpace: 506, groundClearance: 165
        },
        features: ['Auto AC', 'Power Steering', 'Push Button Start', 'All Power Windows', '8" Touchscreen', 'Sunroof', 'Alloy Wheels'],
        safety: {
          rating: 4,
          features: ['6 Airbags', 'ABS with EBD', 'VSA', 'Hill Start Assist', 'ISOFIX', 'Reverse Camera']
        },
        colors: ['Platinum White Pearl', 'Metallic Taffeta White', 'Lunar Silver Metallic', 'Golden Brown Metallic'],
        image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-76.jpeg'
      },
      {
        id: 'city-zx',
        name: 'ZX',
        pricing: {
          exShowroom: 1499000,
          roadTax: 149900,
          insurance: 74950,
          total: 1723850
        },
        mileage: { city: 16, highway: 23, combined: 19 },
        engine: {
          type: '4-Cylinder Petrol',
          displacement: '1.5L',
          power: '121 HP',
          torque: '145 Nm',
          transmission: 'CVT Automatic',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4549, width: 1748, height: 1489, wheelbase: 2600,
          bootSpace: 506, groundClearance: 165
        },
        features: ['Auto AC', 'Power Steering', 'Push Button Start', 'All Power Windows', '8" Touchscreen', 'Sunroof', 'LED Headlamps', 'Premium Audio', 'Wireless Charging'],
        safety: {
          rating: 4,
          features: ['6 Airbags', 'ABS with EBD', 'VSA', 'Hill Start Assist', 'ISOFIX', 'Reverse Camera', 'Honda SENSING']
        },
        colors: ['Platinum White Pearl', 'Metallic Taffeta White', 'Lunar Silver Metallic', 'Golden Brown Metallic', 'Radiant Red Metallic'],
        image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-76.jpeg'
      }
    ]
  },
  // KIASELTOS
  {
    id: 'kia-seltos-2025',
    brand: 'Kia',
    model: 'Seltos',
    year: 2025,
    category: 'Compact SUV',
    bodyType: '5-Door Compact SUV',
    seatingCapacity: 5,
    budgetCategory: 'mid-range',
    description: 'The Kia Seltos 2025 is a feature-packed compact SUV with bold design, advanced technology, and multiple engine options.',
    pros: ['Bold design', 'Feature-rich', 'Multiple engine options', 'Good build quality', 'Spacious interior'],
    cons: ['Average fuel efficiency', 'Service network', 'Road noise', 'Expensive variants'],
    videoReview: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    variants: [
      {
        id: 'seltos-hte',
        name: 'HTE',
        pricing: {
          exShowroom: 1099000,
          roadTax: 109900,
          insurance: 54950,
          total: 1263850
        },
        mileage: { city: 16, highway: 21, combined: 18 },
        engine: {
          type: '4-Cylinder Petrol',
          displacement: '1.5L',
          power: '115 HP',
          torque: '144 Nm',
          transmission: '6-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4315, width: 1800, height: 1645, wheelbase: 2610,
          bootSpace: 433, groundClearance: 190
        },
        features: ['Manual AC', 'Power Steering', 'Central Locking', 'All Power Windows', '8" Touchscreen'],
        safety: {
          rating: 3,
          features: ['6 Airbags', 'ABS with EBD', 'ESC', 'Hill Start Assist', 'ISOFIX']
        },
        colors: ['Clear White', 'Steel Silver', 'Gravity Grey'],
        image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/115777/seltos-exterior-right-front-three-quarter-73.jpeg'
      },
      {
        id: 'seltos-htk',
        name: 'HTK',
        pricing: {
          exShowroom: 1299000,
          roadTax: 129900,
          insurance: 64950,
          total: 1493850
        },
        mileage: { city: 15, highway: 20, combined: 17 },
        engine: {
          type: '4-Cylinder Turbo Petrol',
          displacement: '1.4L',
          power: '140 HP',
          torque: '242 Nm',
          transmission: '6-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4315, width: 1800, height: 1645, wheelbase: 2610,
          bootSpace: 433, groundClearance: 190
        },
        features: ['Auto AC', 'Power Steering', 'Central Locking', 'All Power Windows', '10.25" Touchscreen', 'Wireless Charging'],
        safety: {
          rating: 3,
          features: ['6 Airbags', 'ABS with EBD', 'ESC', 'Hill Start Assist', 'ISOFIX', 'Reverse Camera']
        },
        colors: ['Clear White', 'Steel Silver', 'Gravity Grey', 'Intense Red'],
        image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/115777/seltos-exterior-right-front-three-quarter-73.jpeg'
      },
      {
        id: 'seltos-gtx',
        name: 'GTX',
        pricing: {
          exShowroom: 1699000,
          roadTax: 169900,
          insurance: 84950,
          total: 1953850
        },
        mileage: { city: 14, highway: 19, combined: 16 },
        engine: {
          type: '4-Cylinder Turbo Petrol',
          displacement: '1.4L',
          power: '140 HP',
          torque: '242 Nm',
          transmission: '7-Speed DCT',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4315, width: 1800, height: 1645, wheelbase: 2610,
          bootSpace: 433, groundClearance: 190
        },
        features: ['Auto AC', 'Power Steering', 'Push Button Start', 'All Power Windows', '10.25" Touchscreen', 'Sunroof', 'Ventilated Seats', 'Premium Audio'],
        safety: {
          rating: 3,
          features: ['6 Airbags', 'ABS with EBD', 'ESC', 'Hill Start Assist', 'ISOFIX', '360 Camera', 'Blind Spot Monitor']
        },
        colors: ['Clear White', 'Steel Silver', 'Gravity Grey', 'Intense Red', 'Aurora Black Pearl'],
        image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/115777/seltos-exterior-right-front-three-quarter-73.jpeg'
      }
    ]
  },
  // --- ADDED DATA FOR MG (Morris Garages) ---
  {
    id: 'mg-astor-2025',
    brand: 'MG',
    model: 'Astor',
    year: 2025,
    category: 'Compact SUV',
    bodyType: '5-Door Compact SUV',
    seatingCapacity: 5,
    budgetCategory: 'mid-range',
    description: 'The MG Astor 2025 is a mid-range compact SUV known for its premium, feature-loaded cabin, personal AI assistant, and distinct British styling.',
    pros: ['Premium interior quality', 'Feature-rich (AI assistant, ADAS)', 'Comfortable ride', 'High safety ratings', 'Turbo-petrol option'],
    cons: ['Average fuel efficiency', 'High maintenance costs', 'Relatively small dealer network', 'CVT gearbox performance'],
    videoReview: 'https://www.youtube.com/embed/iA6zM-vY-F8?si=g7zM_1r5Q_wX-u6C', // Placeholder review
    variants: [
      {
        id: 'astor-style',
        name: 'Style (NA Petrol)',
        pricing: {
          exShowroom: 998000,
          roadTax: 99800,
          insurance: 49900,
          total: 1147700
        },
        mileage: { city: 14, highway: 18, combined: 16 },
        engine: {
          type: '4-Cylinder Naturally Aspirated',
          displacement: '1.5L',
          power: '110 HP',
          torque: '144 Nm',
          transmission: '5-Speed Manual',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4323, width: 1809, height: 1650, wheelbase: 2610,
          bootSpace: 448, groundClearance: 205
        },
        features: ['Manual AC', 'Power Steering', 'Central Locking', 'Front & Rear Power Windows', '10.1" Touchscreen', 'Dual Airbags'],
        safety: {
          rating: 4, // Global NCAP expected
          features: ['ABS with EBD', 'Brake Assist', 'ESP', 'Traction Control', 'Hill Hold', 'ISOFIX']
        },
        colors: ['White', 'Silver', 'Black'],
        image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/52217/astor-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80'
      },
      {
        id: 'astor-super-turbo',
        name: 'Super (Turbo AT)',
        pricing: {
          exShowroom: 1548000,
          roadTax: 154800,
          insurance: 77400,
          total: 1780200
        },
        mileage: { city: 12, highway: 16, combined: 14 },
        engine: {
          type: '3-Cylinder Turbo Petrol',
          displacement: '1.3L',
          power: '140 HP',
          torque: '220 Nm',
          transmission: '6-Speed Automatic',
          fuelType: 'Petrol'
        },
        dimensions: {
          length: 4323, width: 1809, height: 1650, wheelbase: 2610,
          bootSpace: 448, groundClearance: 205
        },
        features: ['Automatic Climate Control', 'Push Button Start', 'Panoramic Sunroof', '10.1" Touchscreen', 'Personal AI Assistant', '6 Airbags', 'Heated ORVMs'],
        safety: {
          rating: 4,
          features: ['ABS with EBD', 'Brake Assist', 'ESP', 'Traction Control', 'Hill Hold', 'ISOFIX', '360 Camera', 'ADAS Level 2']
        },
        colors: ['White', 'Silver', 'Black', 'Red', 'Orange'],
        image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/52217/astor-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80'
      }
    ]
  },
  // --- ADDED DATA FOR BYD (Build Your Dreams) ---
  {
    id: 'byd-atto-3-2025',
    brand: 'BYD',
    model: 'Atto 3',
    year: 2025,
    category: 'Electric SUV',
    bodyType: '5-Door Electric SUV',
    seatingCapacity: 5,
    budgetCategory: 'premium',
    description: 'The BYD Atto 3 2025 is a premium electric SUV known for its blade battery technology, long range, and high-tech, spacious interior.',
    pros: ['Excellent range (400+ km)', 'Unique, high-tech interior', '5-star Euro NCAP rating', 'Fast charging capability', 'Zero emissions'],
    cons: ['High initial price', 'Limited service network', 'Design is polarizing', 'Long charging times on slow chargers'],
    videoReview: 'https://www.youtube.com/embed/8qR-Yd-8qI8?si=l6B7jTq4v_0z6gR4', // Placeholder review
    variants: [
      {
        id: 'atto3-extended-range',
        name: 'Extended Range',
        pricing: {
          exShowroom: 3399000,
          roadTax: 0, // EVs often have 0 road tax
          insurance: 169950,
          total: 3568950
        },
        mileage: { city: 'N/A', highway: 'N/A', combined: '480 km (ARAI)' }, // Mileage in km of range
        engine: {
          type: 'Permanent Magnet Synchronous Motor',
          displacement: 'N/A',
          power: '201 HP',
          torque: '310 Nm',
          transmission: 'Single Speed Reduction Gear (Automatic)',
          fuelType: 'Electric (60.48 kWh Blade Battery)'
        },
        dimensions: {
          length: 4455, width: 1875, height: 1615, wheelbase: 2720,
          bootSpace: 440, groundClearance: 175
        },
        features: ['Automatic Climate Control', 'Power Seats', 'Panoramic Sunroof', '12.8" Rotatable Touchscreen', 'ADAS Level 2', 'Wireless Charging'],
        safety: {
          rating: 5, // Euro NCAP
          features: ['7 Airbags', 'ABS with EBD', 'Traction Control', 'Adaptive Cruise Control', 'Automatic Emergency Braking', '360 Camera']
        },
        colors: ['Parkour Red', 'Ski White', 'Boulder Grey', 'Forest Green'],
				image: 'https://media.assettype.com/thequint%2F2022-10%2F6b00ebd6-81d7-48ce-acba-07b553aa5df7%2Fcomposit.jpg?auto=format%2Ccompress&fmt=webp&width=720&w=1200'
      }
    ]
  }
];

// Budget categories for filtering
const budgetCategories = {
  'budget': { min: 0, max: 1000000, label: 'Under ₹10 Lakh' },
  'mid-range': { min: 1000000, max: 2000000, label: '₹10-20 Lakh' },
  'premium': { min: 2000000, max: 3500000, label: '₹20-35 Lakh' },
  'luxury': { min: 3500000, max: 10000000, label: 'Above ₹35 Lakh' }
};

// Export for use in app.js
window.indianCarsData = indianCarsData;
window.budgetCategories = budgetCategories;