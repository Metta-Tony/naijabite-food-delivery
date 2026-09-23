import { Category, FoodItem } from '../types';

export const CATEGORIES: Category[] = [
  { 
    id: 'all', 
    name: 'Full Igbo Menu (Nri Igbo)', 
    icon: 'UtensilsCrossed', 
    description: 'Explore authentic Southeastern delicacies' 
  },
  { 
    id: 'swallows', 
    name: 'Ofe & Swallows', 
    icon: 'Soup', 
    description: 'Oha, Onugbu, Nsala, Ofe Owerri & Achara' 
  },
  { 
    id: 'grills', 
    name: 'Nkwobi, Isi Ewu & Grills', 
    icon: 'Beef', 
    description: 'Cow Foot Nkwobi, Isi Ewu, Spicy Asun & Suya' 
  },
  { 
    id: 'smallchops', 
    name: 'Abacha, Ukwa & Okpa', 
    icon: 'Pizza', 
    description: 'African Salad, Breadfruit (Ukwa), Nsukka Okpa' 
  },
  { 
    id: 'rice', 
    name: 'Abakaliki & Native Rice', 
    icon: 'Flame', 
    description: 'Native Palm Oil Rice, Coal City Jollof & Fried Rice' 
  },
  { 
    id: 'drinks', 
    name: 'Palm Wine (Nkwu Elu) & Drinks', 
    icon: 'Coffee', 
    description: 'Fresh Sweet Palm Wine, Zobo na Ginger, Cold Malt' 
  }
];

export const FOOD_ITEMS: FoodItem[] = [
  // ================= SOUTHEASTERN SOUPS & SWALLOWS =================
  {
    id: 'ofe-oha-special',
    name: 'Authentic Enugu Ofe Oha (Oha Soup)',
    localName: 'Ofe Oha na Achi / Ogbono Thickener',
    description: 'Freshly shredded tender Oha leaves simmered in slow-cooked stockfish broth, tender goat meat, cow leg (kpomo), dry mangala fish, and aromatic Uziza leaves with choice of hot swallow.',
    price: 4900,
    category: 'swallows',
    image: new URL('../../images/oha.jpeg', import.meta.url).href,
    spicyLevel: 'Spicy',
    prepTime: '20-30 mins',
    isPopular: true,
    isChefsSpecial: true,
    availableSwallows: [
      { name: 'Hot Pounded Yam (Nri Ji)', priceDelta: 0 },
      { name: 'Yellow Garri (Eba Uturu)', priceDelta: 0 },
      { name: 'Cassava Fufu (Akpu / Santana)', priceDelta: 0 },
      { name: 'Smooth Semovita', priceDelta: 0 },
      { name: 'Wheat Meal', priceDelta: 200 }
    ],
    availableProteins: [
      { name: 'Tender Goat Meat & Cow Leg (Kpomo)', priceDelta: 0 },
      { name: 'Stockfish Head (Okporoko) & Dried Mangala', priceDelta: 1200 },
      { name: 'Assorted Beef, Shaki & Kidney', priceDelta: 0 },
      { name: 'Fresh River Catfish (Cut)', priceDelta: 1000 }
    ],
    availableSides: [
      { name: 'Extra Wrap of Hot Pounded Yam', priceDelta: 800 },
      { name: 'Extra Wrap of Yellow Garri (Eba)', priceDelta: 500 },
      { name: 'Extra Wrap of Akpu / Fufu', priceDelta: 500 }
    ]
  },
  {
    id: 'ofe-onugbu-anambra',
    name: 'Anambra Royal Ofe Onugbu (Bitterleaf Soup)',
    localName: 'Ofe Onugbu na Ede (Cocoyam Paste)',
    description: 'Sweet, expertly washed bitterleaf cooked with creamy pounded cocoyam (Ede) paste, aromatic Ogiri Igbo, crayfish, dry stockfish (Okporoko), and rich unrefined palm oil.',
    price: 4800,
    category: 'swallows',
    image: new URL('../../images/onugbu.jpeg', import.meta.url).href,
    spicyLevel: 'Spicy',
    prepTime: '25-35 mins',
    isPopular: true,
    availableSwallows: [
      { name: 'Fresh Cassava Fufu (Akpu / Santana)', priceDelta: 0 },
      { name: 'Hot Pounded Yam (Nri Ji)', priceDelta: 0 },
      { name: 'Yellow Garri (Eba Uturu)', priceDelta: 0 },
      { name: 'Semovita', priceDelta: 0 }
    ],
    availableProteins: [
      { name: 'Assorted Goat Meat, Shaki & Kpomo', priceDelta: 0 },
      { name: 'Okporoko (Dry Stockfish) & Smoked Catfish', priceDelta: 1200 },
      { name: 'Fried Titus Fish Cut', priceDelta: 600 }
    ],
    availableSides: [
      { name: 'Extra Wrap of Fufu / Akpu', priceDelta: 500 },
      { name: 'Extra Bowl of Onugbu Soup', priceDelta: 1600 }
    ]
  },
  {
    id: 'ofe-nsala-white-soup',
    name: 'Eastern Royal Ofe Nsala (White Soup with Fresh Catfish)',
    localName: 'Ofe Nsala na Eja Fresh & Utazi',
    description: 'The celebrated Igbo herbal white soup prepared without palm oil. Thickened with yam puree, packed with fresh river catfish, uda pods, calabash nutmeg, and fresh bitter Utazi leaves.',
    price: 5400,
    category: 'swallows',
    image: new URL('../../images/nsala.jpeg', import.meta.url).href,
    spicyLevel: 'Extra Hot',
    prepTime: '25-35 mins',
    isChefsSpecial: true,
    availableSwallows: [
      { name: 'Hot Pounded Yam (Traditional Perfect Pair)', priceDelta: 0 },
      { name: 'Smooth Semovita', priceDelta: 0 },
      { name: 'Akpu / Fufu', priceDelta: 0 }
    ],
    availableProteins: [
      { name: 'Fresh Catfish Cut & Tender Goat Meat', priceDelta: 0 },
      { name: 'Whole Point & Kill Fresh River Catfish', priceDelta: 1800 },
      { name: 'Local Smoked Mangala Fish', priceDelta: 900 }
    ],
    availableSides: [
      { name: 'Extra Pounded Yam Wrap', priceDelta: 800 }
    ]
  },
  {
    id: 'ofe-owerri-regal',
    name: 'Legendary Ofe Owerri (The Soup of Kings)',
    localName: 'Ofe Owerri na Azu Asa & Eju (Snails)',
    description: '"Onye na-enweghi ego anaghi eri ofe Owerri". A regal Imo specialty prepared with Ugu, Uziza, and Okazi leaves, dried giant African snails (Eju), Azu Asa (knife fish), stockfish chunks, and tender goat meat.',
    price: 5800,
    category: 'swallows',
    image: new URL('../../images/owerri.jpeg', import.meta.url).href,
    spicyLevel: 'Spicy',
    prepTime: '30-40 mins',
    isChefsSpecial: true,
    isPopular: true,
    availableSwallows: [
      { name: 'Piping Hot Pounded Yam (Nri Ji)', priceDelta: 0 },
      { name: 'Yellow Garri (Eba Uturu)', priceDelta: 0 },
      { name: 'Fresh Akpu (Fufu)', priceDelta: 0 }
    ],
    availableProteins: [
      { name: 'Giant African Snails (Eju), Azu Asa & Goat Meat', priceDelta: 0 },
      { name: 'Extra Large Okporoko (Stockfish Head)', priceDelta: 1400 },
      { name: 'Peppered Goat Meat Cut', priceDelta: 1000 }
    ],
    availableSides: [
      { name: 'Extra Wrap of Pounded Yam', priceDelta: 800 },
      { name: 'Pair with Fresh Palm Wine (50cl)', priceDelta: 1000 }
    ]
  },
  {
    id: 'ofe-achara-egusi',
    name: 'Abia Ofe Achara na Akpuruakpu Egusi',
    localName: 'Ofe Achara na Egusi Mgbam (Umuahia Special)',
    description: 'Peeled tender elephant grass shoots (Achara) and dense hand-rolled melon seed balls (Akpuruakpu Egusi) simmered with shredded Okazi, dry prawns, and smoked mangala fish in palm oil broth.',
    price: 5100,
    category: 'swallows',
    image: new URL('../../images/achara.jpeg', import.meta.url).href,
    spicyLevel: 'Spicy',
    prepTime: '25-35 mins',
    availableSwallows: [
      { name: 'Yellow Garri (Eba Uturu)', priceDelta: 0 },
      { name: 'Hot Pounded Yam', priceDelta: 0 },
      { name: 'Fresh Fufu / Akpu', priceDelta: 0 }
    ],
    availableProteins: [
      { name: 'Steamed Assorted Meats & Kpomo', priceDelta: 0 },
      { name: 'Stockfish & Smoked Fish Medley', priceDelta: 1100 }
    ],
    availableSides: [
      { name: 'Extra Wrap of Eba Uturu', priceDelta: 500 }
    ]
  },
  {
    id: 'ofe-ogbono-okro',
    name: 'Enugu Silky Ogbono & Chunky Okro (Draw Soup)',
    localName: 'Ofe Ogbono na Okwuru with Kpomo',
    description: 'Viscous, aromatic wild bush mango seed (Ogbono) soup combined with crunchy diced okro, dry prawns, periwinkles, and choice of swallow.',
    price: 4700,
    category: 'swallows',
    image: new URL('../../images/ogbono.jpeg', import.meta.url).href,
    spicyLevel: 'Mild',
    prepTime: '20-30 mins',
    availableSwallows: [
      { name: 'Cassava Akpu (Fufu)', priceDelta: 0 },
      { name: 'Yellow Garri (Eba Uturu)', priceDelta: 0 },
      { name: 'Hot Pounded Yam', priceDelta: 0 }
    ],
    availableProteins: [
      { name: 'Towel, Shaki, Beef & Soft Kpomo', priceDelta: 0 },
      { name: 'Tender Stewed Goat Meat', priceDelta: 1000 },
      { name: 'Fried Titus Fish Cut', priceDelta: 600 }
    ]
  },

  // ================= NKWOBI, ISI EWU & GRILLS =================
  {
    id: 'authentic-nkwobi',
    name: 'Eastern Cow Foot Nkwobi Bowl',
    localName: 'Original Nkwobi in Carved Wooden Okwa Bowl',
    description: 'Gelatinous cow foot cuts braised tender and tossed in rich palm oil curd (Ncha), fresh Utazi leaf shreds, potash, calabash nutmeg (Ehuru), and sweet red onion rings.',
    price: 4800,
    category: 'grills',
    image: new URL('../../images/nkwobi.jpeg', import.meta.url).href,
    spicyLevel: 'Spicy',
    prepTime: '15-20 mins',
    isPopular: true,
    isChefsSpecial: true,
    availableSides: [
      { name: 'Chilled Bottle of Fresh Palm Wine (Nkwu Elu)', priceDelta: 1200 },
      { name: 'Extra Sliced Bitter Utazi & Onions', priceDelta: 300 },
      { name: 'Crispy Fried Yam Chips (Dundun)', priceDelta: 1000 }
    ]
  },
  {
    id: 'isi-ewu-igbo',
    name: 'Traditional Igbo Isi Ewu (Spicy Goat Head Pot)',
    localName: 'Isi Ewu na Ehuru & Utazi in Okwa Bowl',
    description: 'Whole seasoned goat head chopped and braised into savory bites in thick aromatic ehuru spice and red palm oil paste, garnished with garden egg leaves and sweet onions.',
    price: 5800,
    category: 'grills',
    image: new URL('../../images/isi ewu.jpeg', import.meta.url).href,
    spicyLevel: 'Extra Hot',
    prepTime: '20-25 mins',
    isChefsSpecial: true,
    availableSides: [
      { name: '1L Bottle of Fresh Sweet Palm Wine', priceDelta: 1800 },
      { name: 'Extra Utazi & Sliced Red Onions', priceDelta: 400 }
    ]
  },
  {
    id: 'peppered-asun-eastern',
    name: 'Fire-Smoked Peppered Goat Meat (Eastern Asun)',
    localName: 'Asun with Crushed Scotch Bonnet & Onions',
    description: 'Wood-smoked diced goat meat flash-fried in fiery yellow and red rodo scotch bonnets and sweet onions.',
    price: 4500,
    category: 'grills',
    image: new URL('../../images/peppered goat.jpeg', import.meta.url).href,
    spicyLevel: 'Extra Hot',
    prepTime: '15-20 mins',
    isPopular: true,
    availableSides: [
      { name: 'Fried Plantain (Dodo)', priceDelta: 700 },
      { name: 'Roasted Yam with Pepper Sauce', priceDelta: 900 }
    ]
  },
  {
    id: 'beef-suya-skewer',
    name: 'Eastern Coal City Beef Suya Platter',
    localName: 'Tsire Suya with Yaji Pepper & Onions',
    description: 'Thinly sliced boneless beef skewers marinated in spicy peanut kuli-kuli powder, ginger, and chili, grilled over charcoal.',
    price: 3200,
    category: 'grills',
    image: new URL('../../images/suya.jpeg', import.meta.url).href,
    spicyLevel: 'Extra Hot',
    prepTime: '15-20 mins',
    isPopular: true,
    availableSides: [
      { name: 'Extra Packet of Yaji Spice', priceDelta: 200 },
      { name: 'Fried Yam Chips (Dundun)', priceDelta: 1000 }
    ]
  },

  // ================= ABACHA, UKWA & OKPA =================
  {
    id: 'abacha-african-salad',
    name: 'Enugu Abacha & Ugba Special (African Salad)',
    localName: 'Abacha na Ugba with Fried Titus Fish & Kpomo',
    description: 'Sun-dried shredded cassava tossed in seasoned fermented oil bean seeds (Ugba), garden egg slices, utazi, ground crayfish, palm oil curd, and crispy fried Titus fish.',
    price: 3900,
    category: 'smallchops',
    image: new URL('../../images/Abacha na ugba.jpeg', import.meta.url).href,
    spicyLevel: 'Spicy',
    prepTime: '15-20 mins',
    isPopular: true,
    isChefsSpecial: true,
    availableProteins: [
      { name: 'Crispy Fried Titus Fish & Diced Kpomo', priceDelta: 0 },
      { name: 'Deep-Fried Croaker Fish', priceDelta: 1200 },
      { name: 'Spicy Fried Grasscutter (Bushmeat)', priceDelta: 1800 }
    ],
    availableSides: [
      { name: 'Extra Fermented Ugba (Oil Bean)', priceDelta: 600 },
      { name: 'Garden Egg & Spicy Peanut Paste', priceDelta: 400 },
      { name: 'Fried Kpomo cubes', priceDelta: 500 }
    ]
  },
  {
    id: 'ukwa-delicacy-eastern',
    name: 'Traditional African Breadfruit Porridge (Ukwa na Aki)',
    localName: 'Ukwa with Smoked Mangala Fish & Roasted Coconut',
    description: 'Delicately boiled African breadfruit infused with potash, dried mangala fish, sweet corn bits, and fragrant scent leaves. A premier Eastern Igbo delicacy.',
    price: 4600,
    category: 'smallchops',
    image: new URL('../../images/ukwa.jpeg', import.meta.url).href,
    spicyLevel: 'Mild',
    prepTime: '20-25 mins',
    isChefsSpecial: true,
    isPopular: true,
    availableProteins: [
      { name: 'Shredded Smoked Mangala Fish & Dry Prawns', priceDelta: 0 },
      { name: 'Slow Braised Goat Meat Cuts', priceDelta: 1000 }
    ],
    availableSides: [
      { name: 'Crispy Roasted Coconut Slices (Aki)', priceDelta: 400 },
      { name: 'Extra Smoked Fish', priceDelta: 800 }
    ]
  },
  {
    id: 'nsukka-okpa-di-oku',
    name: 'Authentic Nsukka Okpa di Oku (4 Wraps)',
    localName: 'Steamed Bambara Nut Pudding in Plantain Leaves',
    description: 'The world-famous Nsukka delicacy. Spicy, golden steamed Bambara nut pudding wrapped in fresh plantain leaves with rich palm oil and scotch bonnet peppers. Served piping hot.',
    price: 2400,
    category: 'smallchops',
    image: new URL('../../images/okpa - Copy.jpeg', import.meta.url).href,
    spicyLevel: 'Spicy',
    prepTime: '10 mins',
    isPopular: true,
    availableSides: [
      { name: 'Ice Cold Maltina Can', priceDelta: 800 },
      { name: 'Cold Bottle of Zobo na Ginger', priceDelta: 1000 }
    ]
  },
  {
    id: 'ji-mmiri-oku-soup',
    name: 'Ji Mmiri Oku (Igbo Yam Pepper Soup with Fresh Catfish)',
    localName: 'Yam Pepper Soup na Nchanwu & Uda',
    description: 'Steaming medicinal yam broth cooked with soft white yam cubes, fresh river catfish, uziza seeds, uda pods, and fragrant scent leaves (nchanwu).',
    price: 4500,
    category: 'smallchops',
    image: new URL('../../images/ji mmiri oku.jpeg', import.meta.url).href,
    spicyLevel: 'Extra Hot',
    prepTime: '20 mins',
    isPopular: true,
    availableProteins: [
      { name: 'Fresh Catfish Cut & Utazi', priceDelta: 0 },
      { name: 'Tender Goat Meat & Cow Leg', priceDelta: 800 }
    ]
  },

  // ================= ABAKALIKI & NATIVE RICE =================
  {
    id: 'native-iwuk-rice',
    name: 'Village Native Palm Oil Rice (Iwuk Edesi / Abakaliki)',
    localName: 'Native Abakaliki Palm Oil Rice with Smoked Fish',
    description: 'Aromatic native palm oil rice cooked with dried mangala fish, scent leaves, ground crayfish, locust beans (Ogiri), and dry prawns.',
    price: 4500,
    category: 'rice',
    image: new URL('../../images/native rice.jpeg', import.meta.url).href,
    spicyLevel: 'Spicy',
    prepTime: '20-25 mins',
    isPopular: true,
    isChefsSpecial: true,
    availableProteins: [
      { name: 'Smoked Mangala Fish & Diced Kpomo', priceDelta: 0 },
      { name: 'Peppered Goat Meat Cut', priceDelta: 1200 },
      { name: 'Fried Titus Fish Cut', priceDelta: 600 }
    ],
    availableSides: [
      { name: 'Extra Golden Fried Plantains (Dodo)', priceDelta: 700 },
      { name: 'Fried Boiled Egg', priceDelta: 400 }
    ]
  },
  {
    id: 'coal-city-jollof',
    name: 'Coal City Firewood Smokey Party Jollof',
    localName: 'Party Jollof & Dodo with Smoked Quarter Chicken',
    description: 'Deeply smokey Nigerian firewood Jollof rice served with golden fried ripe plantains (Dodo) and choice of seasoned protein.',
    price: 3800,
    category: 'rice',
    image: new URL('../../images/jollof.jpeg', import.meta.url).href,
    spicyLevel: 'Spicy',
    prepTime: '20 mins',
    isPopular: true,
    availableProteins: [
      { name: 'Smoked Quarter Chicken', priceDelta: 0 },
      { name: 'Spicy Fried Beef (2 pcs)', priceDelta: 400 },
      { name: 'Fried Titus Fish', priceDelta: 600 },
      { name: 'Peppered Turkey Wing', priceDelta: 1500 },
      { name: 'Tender Goat Meat Cut', priceDelta: 1200 }
    ],
    availableSides: [
      { name: 'Extra Portion of Dodo', priceDelta: 700 },
      { name: 'Rich Moin-Moin', priceDelta: 900 }
    ]
  },
  {
    id: 'special-fried-rice-eastern',
    name: 'Eastern Chef Special Fried Rice with Liver',
    localName: 'Fried Rice with Sweet Corn & Diced Liver',
    description: 'Wok-tossed seasoned yellow rice packed with diced beef liver, sweet corn, green peas, carrots, and sweet bell peppers.',
    price: 4200,
    category: 'rice',
    image: new URL('../../images/fried rice.jpeg', import.meta.url).href,
    spicyLevel: 'Mild',
    prepTime: '20 mins',
    availableProteins: [
      { name: 'Crispy Fried Chicken', priceDelta: 0 },
      { name: 'Peppered Beef Cut', priceDelta: 400 },
      { name: 'Spicy Turkey Wing', priceDelta: 1500 }
    ],
    availableSides: [
      { name: 'Extra Dodo', priceDelta: 700 },
      { name: 'Creamy Coleslaw', priceDelta: 600 }
    ]
  },

  // ================= PALM WINE & LOCAL DRINKS =================
  {
    id: 'fresh-palm-wine-1l',
    name: 'Fresh Tapped Sweet Eastern Palm Wine (Nkwu Elu - 1L)',
    localName: 'Nkwu Elu / Mmanyo Ocha from Ngwo & Udi Palms',
    description: '100% natural, sweet effervescent palm wine directly tapped from fresh Eastern oil palms and delivered ice cold in sealed bottles.',
    price: 2200,
    category: 'drinks',
    image: new URL('../../images/palm whine.jpeg', import.meta.url).href,
    spicyLevel: 'None',
    prepTime: '5 mins',
    isPopular: true,
    isChefsSpecial: true
  },
  {
    id: 'chilled-zobo-drink',
    name: 'Chilled Spiced Hibiscus Zobo (50cl)',
    localName: 'Zobo with Ginger, Cloves & Sweet Pineapple',
    description: 'Freshly brewed dried roselle hibiscus flowers infused with spicy raw ginger, cloves, sweet pineapple juice, and fresh mint.',
    price: 1000,
    category: 'drinks',
    image: new URL('../../images/zobo.jpeg', import.meta.url).href,
    spicyLevel: 'None',
    prepTime: '5 mins',
    isPopular: true
  },
  {
    id: 'classic-chapman',
    name: 'Chilled Eastern Chapman Mocktail (Bottle)',
    localName: 'Naija Chapman with Angostura Bitters & Cucumber',
    description: 'Refreshing sparkling blend of Fanta, Sprite, Grenadine, fresh cucumber slices, and Angostura bitters.',
    price: 1600,
    category: 'drinks',
    image: new URL('../../images/zobo.jpeg', import.meta.url).href,
    spicyLevel: 'None',
    prepTime: '5 mins',
    isPopular: true
  },
  {
    id: 'chilled-maltina',
    name: 'Ice-Cold Malta Guinness / Maltina Can',
    localName: 'Cold Nigerian Malt Beverage',
    description: 'Rich, non-alcoholic malt drink packed with vitamins and natural nourishment.',
    price: 800,
    category: 'drinks',
    image: new URL('../../images/malt.jpeg', import.meta.url).href,
    spicyLevel: 'None',
    prepTime: '5 mins'
  }
];

export const PACKAGING_FEE = 250;
