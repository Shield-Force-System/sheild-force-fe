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
    href: "/services#armed-pistol",
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
    href: "/services#personal-bodyguard",
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
    href: "/helicopter-booking",
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
    title: "Events & Celebrity Security",
    href: "/services#events-security",
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
    title: "On Demand Bullet Proof Vehicles",
    href: "/services#on-demand-vehicle",
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
    title: "Choose a service",
    detail:
      "Select a bodyguard, helicopter request, event cover, or bullet proof vehicle requirement based on the assignment.",
  },
  {
    title: "Submit the website form",
    detail:
      "Share city, dates, threat level, movement plan, and whether airport pickup, rally coverage, or VIP movement is required.",
  },
  {
    title: "Get a follow-up and quote",
    detail:
      "Shield Force reviews the lead, shares the proposed profile or charter fit, and follows up with commercial terms.",
  },
  {
    title: "Confirm and schedule",
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
    question: "What services does Shield Force offer?",
    answer:
      "Shield Force offers professional security services in India, including trained bodyguards, VIP protection, event security, secure mobility solutions, and helicopter charter coordination through a single integrated platform.",
  },
  {
    category: "Services",
    question: "Who can hire Shield Force services?",
    answer:
      "Our services are designed for individuals, corporates, celebrities, events, and high-net-worth clients who require reliable and professional protection.",
  },
  {
    category: "Protection",
    question: "How are your bodyguards trained and verified?",
    answer:
      "All professionals are in-house and undergo strict background checks, training, and onboarding protocols to ensure the highest level of safety, discipline, and professionalism.",
  },
  {
    category: "Protection",
    question: "Can I customize my security requirements?",
    answer:
      "Yes. Every assignment is customised based on your needs, whether it is personal protection, event coverage, or travel security.",
  },
  {
    category: "Booking",
    question: "How does the booking process work?",
    answer:
      "You can request services directly through our platform. Once submitted, the requirements are assessed, our team gets back to you, the right professionals are assigned, and coordination and deployment are handled end to end.",
  },
  {
    category: "Services",
    question: "Is my information kept confidential?",
    answer:
      "We follow strict confidential security protocols to ensure complete privacy for all clients, especially for high-profile and VIP assignments.",
  },
  {
    category: "Mobility",
    question: "Do you provide security for travel and mobility?",
    answer:
      "Yes. We offer end-to-end mobility solutions, including secure transportation, route planning, and coordination through our network partners.",
  },
  {
    category: "Booking",
    question: "What is the cost of hiring your services?",
    answer:
      "The cost of hiring security services or bodyguards depends on duration, location, risk level, and the number of personnel. You can request a custom security quote through our platform.",
  },
  {
    category: "Booking",
    question: "How quickly can services be deployed?",
    answer:
      "We aim for fast turnaround and quick deployment, depending on availability and location.",
  },
  {
    category: "Protection",
    question: "Can bodyguards join your platform?",
    answer:
      "Yes. Trained individuals can apply to join our platform. We onboard only verified and skilled security professionals after a strict screening process.",
  },
  {
    category: "Protection",
    question: "How can I hire bodyguards or personal security?",
    answer:
      "You can easily hire bodyguards online through our platform. Simply submit your requirements, and we will assign trained personal security officers based on your needs and location.",
  },
  {
    category: "Protection",
    question: "Can I book security for events or corporate functions?",
    answer:
      "Absolutely. We provide event security services for corporate events, private functions, weddings, and large gatherings, ensuring crowd control and safety.",
  },
  {
    category: "Booking",
    question: "How do I book security services with Shield Force?",
    answer:
      "To book security services, click on “Request Protection” or “Send Enquiry,” share your details, and our team will handle the rest.",
  },
  {
    category: "Services",
    question: "Where are Shield Force services available?",
    answer:
      "At present, Shield Force operates in Lucknow and Delhi NCR, delivering trusted VIP protection and security services. As demand grows, we are expanding into new cities to offer our services across more regions in India.",
  },
  {
    category: "Helicopter",
    question: "How can I book a helicopter charter with Shield Force?",
    answer:
      "You can book a helicopter charter in India through our platform by submitting your travel details. Our team handles aircraft availability, permissions, and coordination for a seamless experience.",
  },
  {
    category: "Helicopter",
    question: "How much does it cost to hire a helicopter in India?",
    answer:
      "The cost of helicopter rental in India depends on factors like distance, duration, aircraft type, and permissions. Contact us for a custom helicopter charter quote based on your requirements.",
  },
  {
    category: "Helicopter",
    question: "Can helicopter services be combined with security arrangements?",
    answer:
      "Absolutely. We offer integrated helicopter and VIP security services, including ground coordination, bodyguards, and secure transport.",
  },
  {
    category: "Helicopter",
    question: "Can I book a helicopter for same-day travel?",
    answer:
      "Same-day helicopter charter bookings may be possible depending on availability and permissions. We recommend contacting us as early as possible for urgent requests.",
  },
  {
    category: "Helicopter",
    question: "Do you provide helicopter services for weddings and events?",
    answer:
      "Yes. We specialize in helicopter bookings for weddings, VIP entries, and special events, adding a premium and memorable experience.",
  },
] as const;
