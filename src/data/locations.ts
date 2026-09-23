import { DeliveryZone } from '../types';

export type SoutheasternCity = 
  | 'Enugu' 
  | 'Owerri' 
  | 'Onitsha' 
  | 'Aba' 
  | 'Awka' 
  | 'Umuahia'
  | 'Abakaliki'
  | 'Asaba';

export const SOUTHEASTERN_CITIES: SoutheasternCity[] = [
  'Enugu',
  'Owerri',
  'Onitsha',
  'Aba',
  'Awka',
  'Umuahia',
  'Abakaliki',
  'Asaba',
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  // ================= ENUGU (Coal City State) =================
  { 
    id: 'enu-abakpa-emene-obiagu', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'Abakpa, Emene, Obiagu', 
    deliveryFee: 650, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'enu-abakpa', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'Abakpa Nike / Liberty / Federal Housing Estate', 
    deliveryFee: 750, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'enu-emene', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'Emene / Airport Road / PRODA / Eke Obinagu', 
    deliveryFee: 750, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'enu-obiagu', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'Obiagu / Ogui New Layout / CPS', 
    deliveryFee: 600, 
    estimatedTime: '15-25 mins' 
  },
  { 
    id: 'enu-independence', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'Independence Layout / Govt House / Ebeano', 
    deliveryFee: 650, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'enu-newhaven', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'New Haven / Chime Avenue / Upper Chime', 
    deliveryFee: 600, 
    estimatedTime: '15-25 mins' 
  },
  { 
    id: 'enu-gra', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'Enugu GRA / Park Lane / Polo Park Mall', 
    deliveryFee: 700, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'enu-ogui', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'Ogui Road / Zik Avenue / Nnamdi Azikiwe Stadium', 
    deliveryFee: 600, 
    estimatedTime: '15-25 mins' 
  },
  { 
    id: 'enu-trans-ekulu', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'Trans-Ekulu / Damija / Phase 6', 
    deliveryFee: 800, 
    estimatedTime: '25-35 mins' 
  },
  { 
    id: 'enu-achara', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'Achara Layout / Agbani Road / Idaw River', 
    deliveryFee: 750, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'enu-abakpa', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'Abakpa Nike / Liberty / Federal Housing Estate', 
    deliveryFee: 850, 
    estimatedTime: '25-35 mins' 
  },
  { 
    id: 'enu-gariki', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'Gariki / Awkunanaw / One Day / Topland', 
    deliveryFee: 800, 
    estimatedTime: '25-35 mins' 
  },
  { 
    id: 'enu-unec', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'UNEC Campus (UNN Enugu) / Kenyatta Market', 
    deliveryFee: 650, 
    estimatedTime: '15-25 mins' 
  },
  { 
    id: 'enu-nsukka', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: 'Nsukka Town / UNN Main Campus / Odenigbo', 
    deliveryFee: 1500, 
    estimatedTime: '45-60 mins' 
  },
  { 
    id: 'enu-9thmile', 
    city: 'Enugu', 
    state: 'Enugu State', 
    area: '9th Mile Corner / Ngwo / Toll Gate', 
    deliveryFee: 1100, 
    estimatedTime: '30-45 mins' 
  },

  // ================= OWERRI (Imo State - Heartland) =================
  { 
    id: 'ow-ikenegbu', 
    city: 'Owerri', 
    state: 'Imo State', 
    area: 'Ikenegbu Layout / Maris Junction / Cherubim', 
    deliveryFee: 750, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'ow-aladinma', 
    city: 'Owerri', 
    state: 'Imo State', 
    area: 'Aladinma Housing Estate / IMSU Extension', 
    deliveryFee: 700, 
    estimatedTime: '15-25 mins' 
  },
  { 
    id: 'ow-gra', 
    city: 'Owerri', 
    state: 'Imo State', 
    area: 'Owerri GRA / Civic Centre / Concorde Boulevard', 
    deliveryFee: 800, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'ow-worldbank', 
    city: 'Owerri', 
    state: 'Imo State', 
    area: 'World Bank Estate / Umuguma Housing', 
    deliveryFee: 850, 
    estimatedTime: '25-35 mins' 
  },
  { 
    id: 'ow-orji', 
    city: 'Owerri', 
    state: 'Imo State', 
    area: 'Orji Flyover / Toronto Junction / Owerri-Okigwe Rd', 
    deliveryFee: 800, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'ow-futo', 
    city: 'Owerri', 
    state: 'Imo State', 
    area: 'FUTO Campus / Ihiagwa / Nekede Poly', 
    deliveryFee: 1300, 
    estimatedTime: '35-50 mins' 
  },
  { 
    id: 'ow-douglas', 
    city: 'Owerri', 
    state: 'Imo State', 
    area: 'Douglas Road / Wetheral / Emmanuel College', 
    deliveryFee: 700, 
    estimatedTime: '15-25 mins' 
  },

  // ================= ONITSHA (Anambra State - Commercial Capital) =================
  { 
    id: 'on-gra', 
    city: 'Onitsha', 
    state: 'Anambra State', 
    area: 'Onitsha GRA / Ridge Road / Court Road', 
    deliveryFee: 750, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'on-33', 
    city: 'Onitsha', 
    state: 'Anambra State', 
    area: '33 Estate / Nkwelle Ezunaka / Trans-Nkisi', 
    deliveryFee: 900, 
    estimatedTime: '25-35 mins' 
  },
  { 
    id: 'on-awka-rd', 
    city: 'Onitsha', 
    state: 'Anambra State', 
    area: 'Awka Road / DMGS Roundabout / Dennis Memorial', 
    deliveryFee: 700, 
    estimatedTime: '15-25 mins' 
  },
  { 
    id: 'on-fegge', 
    city: 'Onitsha', 
    state: 'Anambra State', 
    area: 'Fegge / Port Harcourt Rd / Modebe Avenue', 
    deliveryFee: 800, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'on-nkpor', 
    city: 'Onitsha', 
    state: 'Anambra State', 
    area: 'Nkpor Junction / Obosi / New Parts Market', 
    deliveryFee: 900, 
    estimatedTime: '25-35 mins' 
  },

  // ================= ABA (Abia State - Enyimba City) =================
  { 
    id: 'aba-gra', 
    city: 'Aba', 
    state: 'Abia State', 
    area: 'Aba GRA / Brass Junction / Georges Street', 
    deliveryFee: 750, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'aba-ariaria', 
    city: 'Aba', 
    state: 'Abia State', 
    area: 'Faulks Road / Ariaria Int\'l Market / Samek', 
    deliveryFee: 850, 
    estimatedTime: '20-35 mins' 
  },
  { 
    id: 'aba-ogborhill', 
    city: 'Aba', 
    state: 'Abia State', 
    area: 'Ogbor Hill / Waterside / Opobo Road / Ehere', 
    deliveryFee: 900, 
    estimatedTime: '25-40 mins' 
  },
  { 
    id: 'aba-osisioma', 
    city: 'Aba', 
    state: 'Abia State', 
    area: 'Abayi / Osisioma Flyover / Aba-Owerri Expressway', 
    deliveryFee: 950, 
    estimatedTime: '25-40 mins' 
  },

  // ================= AWKA (Anambra State - Capital) =================
  { 
    id: 'awk-aroma', 
    city: 'Awka', 
    state: 'Anambra State', 
    area: 'Aroma Junction / State Secretariat / Club Road', 
    deliveryFee: 700, 
    estimatedTime: '15-25 mins' 
  },
  { 
    id: 'awk-unizik', 
    city: 'Awka', 
    state: 'Anambra State', 
    area: 'UNIZIK Permanent Site / Ifite Awka / Miracle Valley', 
    deliveryFee: 750, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'awk-tempsite', 
    city: 'Awka', 
    state: 'Anambra State', 
    area: 'Temp Site / Okpuno / Regina Caeli Road', 
    deliveryFee: 650, 
    estimatedTime: '15-25 mins' 
  },

  // ================= UMUAHIA (Abia State - Capital) =================
  { 
    id: 'umu-isigate', 
    city: 'Umuahia', 
    state: 'Abia State', 
    area: 'Isi Gate / Market Road / BCA / Aba Road', 
    deliveryFee: 700, 
    estimatedTime: '15-25 mins' 
  },
  { 
    id: 'umu-gra', 
    city: 'Umuahia', 
    state: 'Abia State', 
    area: 'Umuahia GRA / Government House / Low Cost Housing', 
    deliveryFee: 750, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'umu-worldbank', 
    city: 'Umuahia', 
    state: 'Abia State', 
    area: 'World Bank Housing / Ubakala / FMC Umuahia', 
    deliveryFee: 800, 
    estimatedTime: '20-30 mins' 
  },

  // ================= ABAKALIKI (Ebonyi State - Capital) =================
  { 
    id: 'abk-vanco', 
    city: 'Abakaliki', 
    state: 'Ebonyi State', 
    area: 'Vanco Junction / Water Works / Ogoja Road', 
    deliveryFee: 650, 
    estimatedTime: '15-25 mins' 
  },
  { 
    id: 'abk-ebsu', 
    city: 'Abakaliki', 
    state: 'Ebonyi State', 
    area: 'EBSU CAS Campus / Mile 50 / Presco Campus', 
    deliveryFee: 700, 
    estimatedTime: '15-25 mins' 
  },
  { 
    id: 'abk-ricemill', 
    city: 'Abakaliki', 
    state: 'Ebonyi State', 
    area: 'Abakaliki Rice Mill / Ezza Road / Kpirikpiri', 
    deliveryFee: 750, 
    estimatedTime: '20-30 mins' 
  },

  // ================= ASABA (Anioma / Western Igbo Capital) =================
  { 
    id: 'asb-gra', 
    city: 'Asaba', 
    state: 'Delta State', 
    area: 'Asaba GRA / Government House / Cable Point', 
    deliveryFee: 750, 
    estimatedTime: '20-30 mins' 
  },
  { 
    id: 'asb-nnebisi', 
    city: 'Asaba', 
    state: 'Delta State', 
    area: 'Nnebisi Road / Summit Junction / Interbau Flyover', 
    deliveryFee: 700, 
    estimatedTime: '15-25 mins' 
  },
  { 
    id: 'asb-okpanam', 
    city: 'Asaba', 
    state: 'Delta State', 
    area: 'Okpanam Road / Asaba Airport Corridor / Maryam Babangida', 
    deliveryFee: 850, 
    estimatedTime: '20-30 mins' 
  }
];

// Set default delivery to Enugu (Abakpa, Emene, Obiagu)
export const DEFAULT_DELIVERY_ZONE = DELIVERY_ZONES[0];
