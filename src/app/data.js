export const projectsData = [
  // ===================== AI PROJECTS =====================

  {
    id: 1,
    name: "ChatSathi",
    tag: "AI · SaaS Platform",
    featured: true,
    description:
      "Multi-tenant AI chatbot SaaS enabling businesses to deploy custom assistants on any website via an embeddable script.",
    bullets: [
      "Built embeddable JavaScript SDK for seamless chatbot integration across any website",
      "Designed multi-tenant backend managing isolated chatbot configs and conversations",
      "Integrated Gemini 2.5 Flash for fast, low-latency AI-powered responses",
      "Scaled to multiple organizations with Scalekit-based access control",
    ],
    status: "Completed",
    techStack: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Gemini API",
      "Scalekit",
      "TailwindCSS",
      "Vercel",
    ],
    GithubLink: "https://github.com/anishsingh234/ChatSathi",
    demoLink: "https://chat-sathi.vercel.app/",
  },

  {
    id: 2,
    name: "HopeBridge",
    tag: "AI · RAG System",
    featured: true,
    description:
      "AI-powered medical assistant delivering source-grounded cancer insights using Retrieval-Augmented Generation architecture.",
    bullets: [
      "Engineered full RAG pipeline using LLMs + vector embeddings for accurate retrieval",
      "Built semantic search with Pinecone + LangChain for contextual medical Q&A",
      "Reduced hallucinations with document-grounded, cited responses",
      "Implemented scalable document ingestion and vector indexing pipeline",
    ],
    status: "Completed",
    techStack: [
      "Next.js",
      "FastAPI",
      "LangChain",
      "Pinecone",
      "MongoDB",
      "TypeScript",
    ],
    GithubLink: "https://github.com/anishsingh234/HopeBridge",
    demoLink: "https://try-hope-bridge.vercel.app/",
  },

  {
    id: 3,
    name: "Trip Bandhu",
    tag: "AI · Travel",
    featured: false,
    description:
      "AI-powered trip planner generating custom itineraries based on user preferences, destinations, and budget.",
    bullets: [
      "LLM-based itinerary generation tailored to user preferences and budget",
      "Real-time data sync via ConvexDB for live collaborative planning sessions",
      "Intuitive UX for location-specific, budget-aware travel planning",
    ],
    status: "Completed",
    techStack: ["Next.js", "ConvexDB", "MongoDB", "TypeScript", "TailwindCSS"],
    GithubLink: "https://github.com/anishsingh234/TripBandhu.git",
    demoLink: null,
  },

  {
    id: 4,
    name: "AI Diet Planner",
    tag: "AI · Mobile",
    featured: false,
    description:
      "Smart nutrition app with AI-powered personalized meal recommendations and real-time nutritional tracking.",
    bullets: [
      "Cross-platform mobile app built with React Native and Expo",
      "Integrated Google Gemini AI for personalized dietary recommendations",
      "Real-time nutritional tracking and health goal management",
    ],
    status: "Completed",
    techStack: ["React Native", "Expo", "TypeScript", "Google Gemini AI"],
    GithubLink: "https://github.com/anishsingh234/NutriMate.git",
    demoLink: null,
  },

  // ===================== FULL STACK PROJECTS =====================

  {
    id: 5,
    name: "HealSync",
    tag: "Full Stack · Healthcare",
    featured: true,
    description:
      "Healthcare platform enabling appointment booking, video consultations, and real-time scheduling for patients and doctors.",
    bullets: [
      "End-to-end booking system with real-time scheduling and availability management",
      "Integrated secure video consultation for remote healthcare delivery",
      "RBAC-based admin panel with separate doctor and patient dashboards",
      "Scaled to support 100+ concurrent users with an optimized backend",
    ],
    status: "Completed",
    techStack: [
      "Next.js",
      "Prisma ORM",
      "MongoDB",
      "TypeScript",
      "TailwindCSS",
    ],
    GithubLink: "https://github.com/anishsingh234/HealSync.git",
    demoLink: "https://heal-sync-amber.vercel.app/",
  },

  {
    id: 6,
    name: "QuickBasket",
    tag: "Full Stack · E-Commerce",
    featured: false,
    description:
      "Full-featured e-commerce platform with advanced product filters, cart management, and a responsive shopping experience.",
    bullets: [
      "Product catalog with advanced filtering, search, and sorting",
      "Cart management and checkout flow powered by Prisma ORM + MongoDB",
      "Fully responsive UI optimized for all screen sizes",
    ],
    status: "Completed",
    techStack: [
      "Next.js",
      "Prisma ORM",
      "MongoDB",
      "TypeScript",
      "TailwindCSS",
    ],
    GithubLink: "https://github.com/anishsingh234/QuickBasket.git",
    demoLink: null,
  },

  {
    id: 7,
    name: "JobHunt",
    tag: "Full Stack · Job Board",
    featured: false,
    description:
      "Comprehensive job application and recruitment platform connecting job seekers and employers with applicant tracking.",
    bullets: [
      "Dual-role platform: job seekers search/apply, employers post and manage openings",
      "Applicant tracking system with candidate review pipeline",
      "Secure auth and company profile management",
      "Prisma ORM + PostgreSQL for robust relational data handling",
    ],
    status: "Completed",
    techStack: ["Next.js", "TypeScript", "Prisma ORM", "PostgreSQL"],
    GithubLink: "https://github.com/anishsingh234/jobHunt.git",
    demoLink: null,
  },

  {
    id: 8,
    name: "DarkStoreIMS",
    tag: "Full Stack · Enterprise",
    featured: false,
    description:
      "Advanced inventory management system for dark store operations with real-time analytics and stock tracking.",
    bullets: [
      "Real-time inventory tracking with ConvexDB for live data sync",
      "Data-driven analytics dashboard with actionable stock insights",
      "Operations workflow optimized for dark store use cases",
    ],
    status: "Completed",
    techStack: ["Next.js", "ConvexDB", "MongoDB", "TypeScript", "TailwindCSS"],
    GithubLink: "https://github.com/anishsingh234/DarkStoreIMS.git",
    demoLink: null,
  },

  // ===================== DSA PRACTICE =====================

  {
    id: 9,
    name: "LeetCode",
    tag: "DSA · Practice",
    featured: false,
    description:
      "350+ problems solved covering data structures, algorithms, and competitive programming using C++ and Java.",
    bullets: [
      "350+ problems spanning arrays, trees, graphs, dynamic programming, and more",
      "Consistent practice across Easy, Medium, and Hard difficulty levels",
    ],
    status: "Always Working",
    techStack: ["C++", "Java"],
    GithubLink: "https://github.com/anishsingh234/LeetCode.git",
    demoLink: null,
  },

  {
    id: 10,
    name: "GeeksForGeeks",
    tag: "DSA · Practice",
    featured: false,
    description:
      "Competitive programming solutions demonstrating mastery of core CS fundamentals in C++ and Java.",
    bullets: [
      "Problems covering sorting, recursion, bit manipulation, and core CS fundamentals",
      "Consistent practice building a strong algorithmic foundation",
    ],
    status: "Always Working",
    techStack: ["C++", "Java"],
    GithubLink: "https://github.com/anishsingh234/GeeksforGeeks.git",
    demoLink: null,
  },

  // ===================== MINI PROJECTS =====================

  {
    id: 11,
    name: "Password Generator",
    tag: "Mini · Web App",
    featured: false,
    description:
      "Secure password generator with customizable rules and a clean, responsive UI built in React.",
    bullets: [
      "Generates strong passwords with configurable length and character rules",
      "Copy-to-clipboard with a clean, responsive interface",
    ],
    status: "Completed",
    techStack: ["React", "Next.js", "JavaScript"],
    GithubLink: "https://github.com/anishsingh234/PassWordGen.git",
    demoLink: null,
  },

  {
    id: 12,
    name: "Weather App",
    tag: "Mini · Web App",
    featured: false,
    description:
      "Real-time weather app fetching live data for any location with a clean, intuitive interface.",
    bullets: [
      "Live weather data from public APIs with location-based lookup",
      "Displays temperature, humidity, and weather conditions at a glance",
    ],
    status: "Completed",
    techStack: ["HTML", "CSS", "JavaScript"],
    GithubLink: "https://github.com/anishsingh234/WeatherApp",
    demoLink: null,
  },

  {
    id: 13,
    name: "Quiz App",
    tag: "Mini · Web App",
    featured: false,
    description:
      "Interactive quiz app with multiple-choice questions, instant feedback, and score tracking.",
    bullets: [
      "Multiple-choice format with instant answer validation and feedback",
      "Score tracking with a user-friendly, engaging interface",
    ],
    status: "Completed",
    techStack: ["HTML", "CSS", "JavaScript"],
    GithubLink: "https://github.com/anishsingh234/QuizApp.git",
    demoLink: null,
  },

  {
    id: 14,
    name: "Background Changer",
    tag: "Mini · Web App",
    featured: false,
    description:
      "React-based app that dynamically fetches and applies high-quality backgrounds via the Unsplash API.",
    bullets: [
      "Unsplash API integration to fetch and apply random high-quality images",
      "React state management for dynamic, instant UI updates",
    ],
    status: "Completed",
    techStack: ["React", "JavaScript", "Unsplash API"],
    GithubLink: "https://github.com/anishsingh234/BackGroundChanger.git",
    demoLink: null,
  },

  {
    id: 15,
    name: "Counter App",
    tag: "Mini · React",
    featured: false,
    description:
      "Foundational React app demonstrating state management through increment and decrement interactions.",
    bullets: [
      "Clean component structure demonstrating React state fundamentals",
      "Increment/decrement controls with boundary handling",
    ],
    status: "Completed",
    techStack: ["React", "JavaScript"],
    GithubLink: "https://github.com/anishsingh234/CounterApp/tree/main/counter",
    demoLink: null,
  },
];

export const BtnList = [
  { label: "Home", link: "/", icon: "home", newTab: false },
  { label: "About", link: "/about", icon: "about", newTab: false },
  { label: "Projects", link: "/projects", icon: "projects", newTab: false },
  { label: "Contact", link: "/#contact", icon: "contact", newTab: false },
  {
    label: "Github",
    link: "https://github.com/anishsingh234",
    icon: "github",
    newTab: true,
  },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/anish-ai/",
    icon: "linkedin",
    newTab: true,
  },
  {
    label: "Codolio",
    link: "https://codolio.com/profile/J3g5yuKI",
    icon: "Code",
    newTab: true,
  },
  {
    label: "Resume",
    link: "/resume.pdf",
    icon: "resume",
    newTab: true,
  },
];




