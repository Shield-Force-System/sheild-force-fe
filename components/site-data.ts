export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/bodyguards", label: "Bodyguards" },
  { href: "/helicopter-booking", label: "Helicopter Booking" },
] as const;

export const heroStats = [
  { value: "UP + NCR", label: "Primary deployment belt" },
  { value: "24/7", label: "Website-led enquiry flow" },
  { value: "₹1,500", label: "Bodyguard registration charge" },
] as const;

export const serviceCards = [
  {
    id: "armed-rifle",
    title: "Armed Security - Rifle",
    href: "/services#armed-rifle",
    tag: "High Visibility",
    summary:
      "Licensed rifle deployment for rallies, route sanitisation, and exposed movement windows where deterrence matters.",
    price: "₹35,000 - ₹40,000 / month",
    support: "₹2,500 / day for event allocation",
    location: "UP, NCR",
  },
  {
    id: "armed-pistol",
    title: "Armed Security - Pistol",
    href: "/services#armed-pistol",
    tag: "Close Protection",
    summary:
      "Compact armed protection for VIP movement, airport transfers, and low-footprint executive security.",
    price: "Custom quote",
    support: "Client profile shared before deployment",
    location: "UP, NCR",
  },
  {
    id: "personal-bodyguard",
    title: "Personal Bodyguard",
    href: "/services#personal-bodyguard",
    tag: "Executive Escort",
    summary:
      "Normal bodyguard deployments for family movement, business travel, and daily personal protection with trained staff.",
    price: "₹20,000 - ₹30,000 / month",
    support: "₹1,000 / day for events",
    location: "UP, NCR",
  },
  {
    id: "helicopter-rental",
    title: "Helicopter Rental",
    href: "/helicopter-booking",
    tag: "Rapid Mobility",
    summary:
      "Helicopter booking for airport pick-up and drop, celebrity movement, politician rally logistics, and urgent transfers.",
    price: "₹50,000 - ₹350,000 / hour",
    support: "T&C apply",
    location: "UP, NCR",
  },
  {
    id: "events-security",
    title: "Events & Celebrity Security",
    href: "/services#events-security",
    tag: "Crowd-Control Ops",
    summary:
      "Managed deployments for celebrity events, public gatherings, airport reception, and politician rally support.",
    price: "Daily and monthly plans",
    support: "Armed and unarmed teams available",
    location: "UP, NCR",
  },
  {
    id: "on-demand-vehicle",
    title: "On Demand Bullet Proof Vehicles",
    href: "/services#on-demand-vehicle",
    tag: "Protected Transport",
    summary:
      "Protected SUV allocation with operating support, route planning, and optional security escort integration.",
    price: "₹10,000 - ₹20,000 / day",
    support: "SUV, 1000 km max, T&C apply",
    location: "UP, NCR",
  },
] as const;

export const pricingRows = [
  {
    service: "Trained Armed Security - Rifle",
    price: "₹35,000 - ₹40,000 / month",
    location: "UP, NCR",
    eventRate: "₹2,500 / day",
  },
  {
    service: "Normal Bodyguard",
    price: "₹20,000 - ₹30,000 / month",
    location: "UP, NCR",
    eventRate: "₹1,000 / day",
  },
  {
    service: "Helicopter Rental",
    price: "₹50,000 - ₹350,000 / hour",
    location: "UP, NCR",
    eventRate: "T&C apply",
  },
  {
    service: "Bullet Proof Vehicle - SUV",
    price: "₹10,000 - ₹20,000 / day",
    location: "UP, NCR",
    eventRate: "1000 km max, T&C apply",
  },
] as const;

export const bodyguardProfiles = [
  {
    name: "Aarav Singh",
    role: "Executive Protection Lead",
    base: "Noida",
    training: "Corporate movement, hotel transfer, airport reception",
    licence: "Background checked",
    equipment: "Walky talky, safari suit, I-card",
    availability: "Available in 48 hours",
  },
  {
    name: "Kabir Chauhan",
    role: "Armed Rifle Specialist",
    base: "Lucknow",
    training: "Rally perimeter, stage-side deployment, convoy support",
    licence: "Rifle licensed",
    equipment: "Licensed weapon, comms kit, formal deployment dress",
    availability: "Available for monthly contract",
  },
  {
    name: "Vihaan Malik",
    role: "Close Protection - Pistol",
    base: "Ghaziabad",
    training: "Personal escort, discreet movement, executive meetings",
    licence: "Pistol licensed",
    equipment: "Concealed support, I-card, comms kit",
    availability: "Priority for NCR bookings",
  },
  {
    name: "Raghav Tiwari",
    role: "Celebrity Event Guard",
    base: "Delhi NCR",
    training: "Green room cover, crowd lane management, red carpet movement",
    licence: "Background checked",
    equipment: "Walky talky, event brief kit, safari suit",
    availability: "Available for event day deployment",
  },
  {
    name: "Ishaan Rawat",
    role: "Family Protection Officer",
    base: "Greater Noida",
    training: "Residential standby, school route escort, family travel",
    licence: "Background checked",
    equipment: "Dress code, I-card, incident reporting",
    availability: "Suitable for long-term retainers",
  },
  {
    name: "Dev Mehra",
    role: "Rapid Response Escort",
    base: "Meerut",
    training: "VIP arrival handling, short-notice deployment, route coordination",
    licence: "Background checked",
    equipment: "Walky talky, coordination handset, safari suit",
    availability: "Fast-response allocation",
  },
] as const;

export const deploymentProtocol = [
  {
    title: "Verification First",
    detail:
      "Shield Force checks background, licence, and operating readiness before any profile is shown to a client.",
  },
  {
    title: "Client Profile Share",
    detail:
      "Clients receive the guard profile, skill fit, and deployment intent before confirmation and order placement.",
  },
  {
    title: "Issued By Shield Force",
    detail:
      "Walky talky, dress code, I-cards, safari suit, and deployment accessories are issued to the team by us.",
  },
  {
    title: "Field Communication",
    detail:
      "Operational communication uses walky talky coordination, route instructions, and escalation reporting during the assignment.",
  },
] as const;

export const bookingSteps = [
  {
    title: "Choose a service",
    detail:
      "Select a bodyguard, helicopter request, event cover, or bullet proof vehicle requirement based on the assignment.",
  },
  {
    title: "Share deployment details",
    detail:
      "Provide city, dates, threat level, movement plan, and whether airport pickup, rally coverage, or VIP movement is required.",
  },
  {
    title: "Review profile and quote",
    detail:
      "Shield Force shares the proposed profile, verification status, and commercial terms before confirmation.",
  },
  {
    title: "Deploy with coordination",
    detail:
      "Once approved, the team moves with equipment, communication setup, dress code, and site brief in place.",
  },
] as const;

export const roadmapItems = [
  {
    phase: "Initial Phase",
    title: "Website-led enquiries only",
    detail:
      "The website handles customer onboarding, bodyguard onboarding, service discovery, and quote requests in the first launch.",
  },
  {
    phase: "Later Phase",
    title: "Internal and client app",
    detail:
      "Planned app features include police call support by area, video call recording for evidence, and ticket-based issue handling.",
  },
] as const;

export const helicopterUseCases = [
  "Airport pickup and drop for VIP, celebrity, and executive travel",
  "Politician rally movement with time-sensitive land-to-air coordination",
  "Premium intercity travel when road movement is inefficient or high-risk",
  "Event arrival and departure management with ground escort support",
] as const;

export const serviceSupportNotes = [
  "All listed bodyguards are intended to be in-house Shield Force employees.",
  "Any eligible bodyguard can onboard through the website with a ₹1,500 registration charge.",
  "Customer cab requirements are planned through a Daftar Route tie-up.",
  "Security accessory sales start with walky talky procurement, with delivery dates to be finalised.",
] as const;
