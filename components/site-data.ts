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
    href: "/bodyguards",
    tag: "High Visibility",
    image: {
      src: "/Images/ArmedSecurity2.png",
      alt: "Shield Force armed rifle security deployment",
    },
    summary:
      "Licensed rifle deployment for rallies, route sanitisation, and exposed movement windows where deterrence matters.",
    price: "₹35,000 - ₹40,000 / month",
    support: "₹2,500 / day for event allocation",
    location: "UP, NCR",
  },
  {
    id: "armed-pistol",
    title: "Armed Security - Pistol",
    href: "/bodyguards",
    tag: "Close Protection",
    image: {
      src: "/Images/ArmedSecurity1.png",
      alt: "Shield Force close protection armed security",
    },
    summary:
      "Compact armed protection for VIP movement, airport transfers, and low-footprint executive security.",
    price: "Custom quote",
    support: "Client profile shared before deployment",
    location: "UP, NCR",
  },
  {
    id: "personal-bodyguard",
    title: "Personal Bodyguard",
    href: "/bodyguards",
    tag: "Executive Escort",
    image: {
      src: "/Images/bodyguard.png",
      alt: "Shield Force personal bodyguard",
    },
    summary:
      "Normal bodyguard deployments for family movement, business travel, and daily personal protection with trained staff.",
    price: "₹20,000 - ₹30,000 / month",
    support: "₹1,000 / day for events",
    location: "UP, NCR",
  },
  {
    id: "helicopter-rental",
    title: "Helicopter Rental",
    href: "/charter-booking",
    tag: "Rapid Mobility",
    image: {
      src: "/Images/helicopter.png",
      alt: "Shield Force helicopter rental",
    },
    summary:
      "On-demand helicopter access for urgent, secure, and time-critical travel requirements. Operated with strict safety standards.",
    price: "₹50,000 - ₹350,000 / hour",
    support: "T&C apply",
    location: "UP, NCR",
  },
  {
    id: "events-security",
    title: "Event & VIP Security",
    href: "/services",
    tag: "Crowd-Control Ops",
    image: {
      src: "/Images/Events1.png",
      alt: "Shield Force events and celebrity security",
    },
    summary:
      "Comprehensive security management for events, ensuring controlled access, crowd safety, and VIP protection.",
    price: "Daily and monthly plans",
    support: "Armed and unarmed teams available",
    location: "UP, NCR",
  },
  {
    id: "on-demand-vehicle",
    title: "On-Demand Bullet Proof Vehicles",
    href: "/services",
    tag: "Protected Transport",
    image: {
      src: "/Images/Car.png",
      alt: "Shield Force protected vehicle",
    },
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
    title: "Verified Before Deployment",
    detail:
      "All personnel undergo background verification, license checks, and readiness validation.",
  },
  {
    title: "Operational Readiness",
    detail:
      "Every deployment is planned with route awareness, timing coordination, and communication protocols.",
  },
  {
    title: "Integrated Mobility",
    detail:
      "We combine ground security with transport and helicopter coordination for seamless movement.",
  },
  {
    title: "Manual Expert Oversight",
    detail:
      "No automated assignments every request is reviewed and executed by trained professionals.",
  },
] as const;

export const bookingSteps = [
  {
    title: "Choose a Service",
    detail:
      "Select a bodyguard, helicopter request, event cover, or bullet proof vehicle requirement based on the assignment.",
  },
  {
    title: "Submit the Website Form",
    detail:
      "Share city, dates, threat level, movement plan, and whether airport pickup, rally coverage, or VIP movement is required.",
  },
  {
    title: "Get a Follow-Up and Quote",
    detail:
      "Shield Force reviews the lead, shares the proposed profile or charter fit, and follows up with commercial terms.",
  },
  {
    title: "Confirm and Schedule",
    detail:
      "Once approved, the team schedules the assignment and coordinates equipment, dress code, and field brief manually.",
  },
] as const;

export const roadmapItems = [
  {
    phase: "Current Model",
    title: "Website listings and lead forms",
    detail:
      "The website lists services and bodyguards, collects customer enquiries, and captures onboarding requests for guards.",
  },
  {
    phase: "Follow-Up Process",
    title: "Manual review after every enquiry",
    detail:
      "After a form is submitted, Shield Force reviews the requirement, shortlists the fit, and follows up directly with the next steps.",
  },
] as const;

export const helicopterUseCases = [
  "Airport pickup and drop for VIP, celebrity, and executive travel",
  "Politician rally movement with time-sensitive land-to-air coordination",
  "Premium intercity travel when road movement is inefficient or high-risk",
  "Event arrival and departure management with ground escort support",
] as const;

export const serviceSupportNotes = [
  "Client Requests, In-House Professionals, Onboarding Process, Mobility Coordination, Equipment & Support. Add heading in the cards: ",
  "All assignments are handled with strict confidentiality protocols, ensuring complete privacy for every client and operation.",
  "Any eligible bodyguard can onboard through the website with a ₹1,500 registration charge.",
  "Customer cab requirements are planned through a Daftar Route tie-up.",
  "Security accessory sales start with walky talky procurement, with delivery dates to be finalised.",
] as const;

export const frequentlyAskedQuestions = [
  {
    category: "Services",
    question: "What Services Does Shield Force Offer?",
    answer:
      "Shield Force offers professional security services in India, including trained bodyguards, VIP protection, event security, secure mobility solutions, and helicopter charter coordination through a single integrated platform.",
  },
  {
    category: "Services",
    question: "Who Can Hire Shield Force Services?",
    answer:
      "Our services are designed for individuals, corporates, celebrities, events, and high-net-worth clients who require reliable and professional protection.",
  },
  {
    category: "Protection",
    question: "How Are Your Bodyguards Trained and Verified?",
    answer:
      "All professionals are in-house and undergo strict background checks, training, and onboarding protocols to ensure the highest level of safety, discipline, and professionalism.",
  },
  {
    category: "Protection",
    question: "Can I Customize My Security Requirements?",
    answer:
      "Yes. Every assignment is customised based on your needs, whether it is personal protection, event coverage, or travel security.",
  },
  {
    category: "Booking",
    question: "How Does the Booking Process Work?",
    answer:
      "You can request services directly through our platform. Once submitted, the requirements are assessed, our team gets back to you, the right professionals are assigned, and coordination and deployment are handled end to end.",
  },
  {
    category: "Services",
    question: "Is My Information Kept Confidential?",
    answer:
      "We follow strict confidential security protocols to ensure complete privacy for all clients, especially for high-profile and VIP assignments.",
  },
  {
    category: "Mobility",
    question: "Do You Provide Security for Travel and Mobility?",
    answer:
      "Yes. We offer end-to-end mobility solutions, including secure transportation, route planning, and coordination through our network partners.",
  },
  {
    category: "Booking",
    question: "What Is the Cost of Hiring Your Services?",
    answer:
      "The cost of hiring security services or bodyguards depends on duration, location, risk level, and the number of personnel. You can request a custom security quote through our platform.",
  },
  {
    category: "Booking",
    question: "How Quickly Can Services Be Deployed?",
    answer:
      "We aim for fast turnaround and quick deployment, depending on availability and location.",
  },
  {
    category: "Protection",
    question: "Can Bodyguards Join Your Platform?",
    answer:
      "Yes. Trained individuals can apply to join our platform. We onboard only verified and skilled security professionals after a strict screening process.",
  },
  {
    category: "Protection",
    question: "How Can I Hire Bodyguards or Personal Security?",
    answer:
      "You can easily hire bodyguards online through our platform. Simply submit your requirements, and we will assign trained personal security officers based on your needs and location.",
  },
  {
    category: "Protection",
    question: "Can I Book Security for Events or Corporate Functions?",
    answer:
      "Absolutely. We provide event security services for corporate events, private functions, weddings, and large gatherings, ensuring crowd control and safety.",
  },
  {
    category: "Booking",
    question: "How Do I Book Security Services With Shield Force?",
    answer:
      "To book security services, click on “Request Protection” or “Send Enquiry,” share your details, and our team will handle the rest.",
  },
  {
    category: "Services",
    question: "Where Are Shield Force Services Available?",
    answer:
      "At present, Shield Force operates in Lucknow and Delhi NCR, delivering trusted VIP protection and security services. As demand grows, we are expanding into new cities to offer our services across more regions in India.",
  },
  {
    category: "Helicopter",
    question: "How Can I Book a Helicopter Charter With Shield Force?",
    answer:
      "You can book a helicopter charter in India through our platform by submitting your travel details. Our team handles aircraft availability, permissions, and coordination for a seamless experience.",
  },
  {
    category: "Helicopter",
    question: "How Much Does It Cost to Hire a Helicopter in India?",
    answer:
      "The cost of helicopter rental in India depends on factors like distance, duration, aircraft type, and permissions. Contact us for a custom helicopter charter quote based on your requirements.",
  },
  {
    category: "Helicopter",
    question: "Can Helicopter Services Be Combined With Security Arrangements?",
    answer:
      "Absolutely. We offer integrated helicopter and VIP security services, including ground coordination, bodyguards, and secure transport.",
  },
  {
    category: "Helicopter",
    question: "Can I Book a Helicopter for Same-Day Travel?",
    answer:
      "Same-day helicopter charter bookings may be possible depending on availability and permissions. We recommend contacting us as early as possible for urgent requests.",
  },
  {
    category: "Helicopter",
    question: "Do You Provide Helicopter Services for Weddings and Events?",
    answer:
      "Yes. We specialize in helicopter bookings for weddings, VIP entries, and special events, adding a premium and memorable experience.",
  },
] as const;
