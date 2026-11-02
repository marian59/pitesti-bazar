import { Ad, LocationCity } from '../types';

export const CITIES: LocationCity[] = ['Pitești', 'Mioveni', 'Curtea de Argeș'];

export const CATEGORIES = [
  'Toate categoriile',
  'Auto & Moto',
  'Imobiliare',
  'Electronice & Electrocasnice',
  'Casă și Grădină',
  'Modă & Frumusețe',
  'Piese Auto',
  'Servicii & Meșteșugari',
  'Sport & Timp liber',
  'Agro & Industrie',
];

export const NEIGHBORHOODS: Record<LocationCity, string[]> = {
  'Pitești': ['Centru', 'Trivale', 'Găvana', 'Nord', 'Craiovei', 'Prundu', 'Războieni', 'Tudor Vladimirescu', 'Banat'],
  'Mioveni': ['Centru', 'Colibași', 'Clucereasa', 'Făget', 'Zona Uzinei Dacia'],
  'Curtea de Argeș': ['Centru', 'Robea', 'Marina', 'Capu Dealului', 'Zona Mânăstire'],
};

export const PRESET_PHOTOS = [
  { label: 'Mașină / Auto', url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=80' },
  { label: 'Apartament', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80' },
  { label: 'Casă / Vilă', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80' },
  { label: 'Telefon / iPhone', url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80' },
  { label: 'Laptop / PC', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80' },
  { label: 'Bicicletă', url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80' },
  { label: 'Mobilă / Canapea', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80' },
  { label: 'Unelte / Scule', url: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=800&auto=format&fit=crop&q=80' },
  { label: 'Lemne de foc', url: 'https://images.unsplash.com/photo-1520110120835-c96534a4c9e4?w=800&auto=format&fit=crop&q=80' },
  { label: 'Televizor', url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80' },
];

export const INITIAL_ADS: Ad[] = [
  {
    id: 'ad-1',
    title: 'Dacia Duster 1.5 dCi 4x4 Prestige - 2019, Unic proprietar',
    description: 'Vând Dacia Duster an 2019, motor 1.5 dCi 115 CP, tracțiune 4x4 la buton. Echipare de top Prestige: navigație touchscreen, camere 360 grade, senzori unghi mort, jante aliaj originale 17", climatronic automat, keyless entry/go. Revizii efectuate doar la reprezentanță în Pitești, carte service completă. Kilometraj real 104.000 km verificabili. Mașina este impecabilă tehnic și optic, fără accidente.',
    price: 11800,
    currency: '€',
    isNegotiable: true,
    city: 'Pitești',
    neighborhood: 'Găvana',
    category: 'Auto & Moto',
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80'
    ],
    sellerName: 'Ionel Popescu',
    phone: '0744 321 890',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 min ago
    isFeatured: true,
    viewsCount: 142,
  },
  {
    id: 'ad-2',
    title: 'Apartament 2 camere decomandat, Trivale, etaj 2 din 4, mobilat',
    description: 'Proprietar, ofer spre vânzare apartament cu 2 camere confort 1 sporit, situat în cartierul Trivale, într-o zonă liniștită lângă pădure și parc. Suprafață utilă 56 mp + balcon închis cu termopan. Renovat recent: instalații sanitare și electrice schimbate, centrală termică nouă în condensare Vaillant, izolație termică exterioară. Se vinde parțial mobilat și utilat. Merită văzut!',
    price: 68500,
    currency: '€',
    isNegotiable: true,
    city: 'Pitești',
    neighborhood: 'Trivale',
    category: 'Imobiliare',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80'
    ],
    sellerName: 'Elena Marinescu',
    phone: '0721 554 321',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    isFeatured: true,
    viewsCount: 89,
  },
  {
    id: 'ad-3',
    title: 'iPhone 14 Pro 128GB Deep Purple, fără urme, sănătate baterie 89%',
    description: 'Vând Apple iPhone 14 Pro, capacitate 128 GB, culoarea Deep Purple. Telefonul a fost purtat din prima secundă doar cu folie de sticlă de calitate și husă originală Apple. Nu are nicio zgârietură sau lovitură. Liber de rețea (neverlocked), Face ID și camere funcționează ireproșabil. Vine în cutia originală cu cablu USB-C Lightning și 2 huse cadou. Predare personală în Mioveni sau Pitești.',
    price: 2850,
    currency: 'lei',
    isNegotiable: true,
    city: 'Mioveni',
    neighborhood: 'Centru',
    category: 'Electronice & Electrocasnice',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80'
    ],
    sellerName: 'Andrei Diaconu',
    phone: '0765 432 109',
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
    isFeatured: false,
    viewsCount: 65,
  },
  {
    id: 'ad-4',
    title: 'Bicicletă Mountain Bike aluminiu 29 inch, frâne hidraulice Shimano',
    description: 'Bicicletă MTB Cross Country, cadru aluminiu 6061 ușor mărimea M/L, roți pe 29" cu anvelope Schwalbe Smart Sam. Frâne pe disc hidraulice Shimano MT200, schimbătoare Shimano Deore 2x10 viteze, furcă pe aer cu blocaj pe ghidon. Revizie făcută acum două săptămâni (plăcuțe noi, lanț degresat și uns). Perfectă pentru dealurile din Curtea de Argeș și traseele montane din zonă.',
    price: 950,
    currency: 'lei',
    isNegotiable: false,
    city: 'Curtea de Argeș',
    neighborhood: 'Zona Mânăstire',
    category: 'Sport & Timp liber',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80'
    ],
    sellerName: 'Radu Bârloiu',
    phone: '0730 987 654',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    isFeatured: false,
    viewsCount: 41,
  },
  {
    id: 'ad-5',
    title: 'Lemne de foc uscate fag și carpen, tăiate și crăpate, transport gratuit',
    description: 'Aducem la comandă lemne de foc de calitate superioară (esență tare: fag, carpen, stejar). Lemnele sunt uscate din iarna trecută, gata de băgat pe foc. Tăiate la dimensiunea cerută de client (pentru centrală, sobă de teracotă sau șemineu). Transport asigurat în Curtea de Argeș, Pitești, Mioveni și comunele învecinate. Preț pe metru ster.',
    price: 450,
    currency: 'lei',
    isNegotiable: true,
    city: 'Curtea de Argeș',
    neighborhood: 'Capu Dealului',
    category: 'Agro & Industrie',
    images: [
      'https://images.unsplash.com/photo-1520110120835-c96534a4c9e4?w=800&auto=format&fit=crop&q=80'
    ],
    sellerName: 'Vasile Gospodaru',
    phone: '0740 665 544',
    createdAt: new Date(Date.now() - 1000 * 60 * 500).toISOString(),
    isFeatured: false,
    viewsCount: 110,
  },
  {
    id: 'ad-6',
    title: 'Închiriez garsonieră decomandată în Nord Pitești, complet utilată',
    description: 'Persoană fizică dau în chirie pe termen lung garsonieră cochetă în cartierul Nord, la 3 minute de stația de autobuz și magazine (Lidl, Penny). Etaj 3 din 4, bloc anvelopat termic, cheltuieli de întreținere foarte mici. Mobilier modern, pat dublu confortabil, mașină de spălat rufe, frigider, aragaz, TV smart. Se solicită o lună chirie + o lună garanție. Disponibilă imediat.',
    price: 1200,
    currency: 'lei',
    isNegotiable: false,
    city: 'Pitești',
    neighborhood: 'Nord',
    category: 'Imobiliare',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80'
    ],
    sellerName: 'Mariana Stancu',
    phone: '0723 112 233',
    createdAt: new Date(Date.now() - 1000 * 60 * 650).toISOString(),
    isFeatured: true,
    viewsCount: 78,
  },
  {
    id: 'ad-7',
    title: 'Jante aliaj originale Dacia Duster / Renault 16" cu anvelope vară',
    description: 'Set 4 jante de aliaj originale în 5 prezoane (5x114.3) pentru Dacia Duster, Renault Kadjar, Nissan Qashqai. Jantele nu sunt strâmbe, sudate sau revopsite, au vopseaua de fabrică în stare excelentă. Vin echipate cu anvelope Continental EcoContact 215/65 R16 în stare foarte bună, profil 6mm rămas. Echilibrate, gata de montat pe mașină.',
    price: 1400,
    currency: 'lei',
    isNegotiable: true,
    city: 'Mioveni',
    neighborhood: 'Zona Uzinei Dacia',
    category: 'Piese Auto',
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80'
    ],
    sellerName: 'Mihai Tudose',
    phone: '0751 234 567',
    createdAt: new Date(Date.now() - 1000 * 60 * 800).toISOString(),
    isFeatured: false,
    viewsCount: 52,
  },
  {
    id: 'ad-8',
    title: 'Televizor Smart Samsung 4K Ultra HD 138cm (55") Seria Crystal UHD',
    description: 'Televizor Samsung 55AU7172, diagonală 138 cm (55 inch), rezoluție 4K UHD, HDR10+, procesor Crystal 4K. Sistem de operare Tizen OS foarte rapid: merg YouTube, Netflix, HBO Max, Digi Online, Disney+. Vine cu telecomandă originală, cablu de alimentare și suport de masă. Se poate testa oricând în zona Centru Pitești. Nu trimit prin curier, doar ridicare personală.',
    price: 1350,
    currency: 'lei',
    isNegotiable: true,
    city: 'Pitești',
    neighborhood: 'Centru',
    category: 'Electronice & Electrocasnice',
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80'
    ],
    sellerName: 'Cristian Voinea',
    phone: '0760 998 877',
    createdAt: new Date(Date.now() - 1000 * 60 * 1100).toISOString(),
    isFeatured: false,
    viewsCount: 97,
  },
  {
    id: 'ad-9',
    title: 'Teren intravilan 1.200 mp, utilități la poartă, zonă superbă Mioveni',
    description: 'Vând teren intravilan ideal pentru construcție casă/vilă, situat în Mioveni (Colibași). Deschidere la drum asfaltat de 22 metri liniari. Toate utilitățile sunt chiar la limita proprietății: apă curentă, canalizare, gaze naturale, curent electric și fibră optică. Zonă liniștită de case, aer curat, priveliște panoramică. Cadastru și intabulare la zi.',
    price: 28800,
    currency: '€',
    isNegotiable: true,
    city: 'Mioveni',
    neighborhood: 'Colibași',
    category: 'Imobiliare',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80'
    ],
    sellerName: 'Dan Dumitrescu',
    phone: '0728 776 655',
    createdAt: new Date(Date.now() - 1000 * 60 * 1400).toISOString(),
    isFeatured: false,
    viewsCount: 64,
  },
  {
    id: 'ad-10',
    title: 'Canapea extensibilă 3 locuri cu ladă depozitare, stare ca nouă',
    description: 'Canapea extensibilă cumpărată acum un an, tapițerie din stofă impermeabilă gri antracit, foarte rezistentă și ușor de curățat. Are ladă generoasă pentru depozitare lenjerie și perne. Se extinde ușor pe sistem clic-clac, oferind suprafață de dormit 140x190 cm. Nu are defecte, nu e pătată sau lăsată. O vindem deoarece reamenajăm camera.',
    price: 750,
    currency: 'lei',
    isNegotiable: true,
    city: 'Pitești',
    neighborhood: 'Craiovei',
    category: 'Casă și Grădină',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80'
    ],
    sellerName: 'Anca Dumitru',
    phone: '0745 889 900',
    createdAt: new Date(Date.now() - 1000 * 60 * 1800).toISOString(),
    isFeatured: false,
    viewsCount: 38,
  },
  {
    id: 'ad-11',
    title: 'Bormașină rotopercutor profesional Bosch GBH 2-26 DFR cu mandrină',
    description: 'Ciocan rotopercutor Bosch Professional 800W, mandrină interschimbabilă SDS-plus și mandrină normală pentru burghie de fier și lemn. Funcționează impecabil, forță de percuție mare, ideal pentru lucrări de construcții și renovări. Se vinde în cutia originală cu limitator de adâncime și câteva burghie.',
    price: 380,
    currency: 'lei',
    isNegotiable: false,
    city: 'Curtea de Argeș',
    neighborhood: 'Marina',
    category: 'Casă și Grădină',
    images: [
      'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=800&auto=format&fit=crop&q=80'
    ],
    sellerName: 'Gheorghe M.',
    phone: '0733 456 789',
    createdAt: new Date(Date.now() - 1000 * 60 * 2200).toISOString(),
    isFeatured: false,
    viewsCount: 29,
  }
];
