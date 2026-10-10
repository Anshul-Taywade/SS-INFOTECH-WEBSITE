import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, X, Sparkles, CheckCircle2, Info } from 'lucide-react';

// Original Brand Icons (SVG) with subtle ambient animations and large viewBox sizing
const ReactIcon = ({ className = "w-12 h-12 sm:w-14 sm:h-14" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "50px 50px" }}
    >
      <ellipse cx="50" cy="50" rx="44" ry="17" stroke="#61DAFB" strokeWidth="4.5" fill="none" transform="rotate(0 50 50)"/>
      <ellipse cx="50" cy="50" rx="44" ry="17" stroke="#61DAFB" strokeWidth="4.5" fill="none" transform="rotate(60 50 50)"/>
      <ellipse cx="50" cy="50" rx="44" ry="17" stroke="#61DAFB" strokeWidth="4.5" fill="none" transform="rotate(120 50 50)"/>
    </motion.g>
    <circle cx="50" cy="50" r="8.5" fill="#61DAFB"/>
  </svg>
);

const NextjsIcon = ({ className = "w-12 h-12 sm:w-14 sm:h-14" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="64" className="fill-slate-900 dark:fill-white" />
    <path d="M102.5 107.5L47.5 37H38V91H47V48.5L95.5 111C98 110 100.5 108.8 102.5 107.5Z" fill="url(#next-grad)" />
    <rect x="80" y="37" width="9" height="54" className="fill-white dark:fill-slate-900" />
    <defs>
      <linearGradient id="next-grad" x1="68" y1="64" x2="100" y2="105" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" className="dark:[stop-color:#0f172a]" />
        <stop offset="1" stopColor="white" stopOpacity="0" className="dark:[stop-color:#0f172a]" />
      </linearGradient>
    </defs>
  </svg>
);

const NodejsIcon = ({ className = "w-12 h-12 sm:w-14 sm:h-14" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M64 8L12 38v60l52 30 52-30V38L64 8z" fill="#5FA04E"/>
    <path d="M64 8v120l52-30V38L64 8z" fill="#417E38"/>
    <path d="M78 62c-1-.6-5-2.4-10-3-5.5-.6-12 .6-12 5.9 0 4.9 5.8 6 10.4 6.9 6 1.1 12.3 2.5 12.3 9.4 0 7.3-7 10.8-13.9 10.8-7.2 0-12.3-3.1-14.5-4.6l2.5-5.9c1.8 1.3 6.3 4.3 12 4.3 4 0 7.6-1.9 7.6-5.3 0-4.3-5.1-5.2-10.3-6.2-6.7-1.3-12.4-3.1-12.4-9.8 0-7.6 7.2-11.4 14.1-11.4 6 0 11.1 2.7 12.4 3.5L78 62z" fill="#FFFFFF"/>
  </svg>
);

const MongoDBIcon = ({ className = "w-12 h-12 sm:w-14 sm:h-14" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M65 4c-1.6 0-3 1.1-3.6 2.6-3.3 7.8-27.3 65.4-27.3 79.4 0 17.4 14.2 31.6 31.6 31.6s31.6-14.2 31.6-31.6c0-14.1-24.6-71.7-27.9-79.4-.6-1.5-2-2.6-3.6-2.6zm-1 10.8c12.3 20.4 23.5 47 23.5 71 0 13-10.5 23.5-23.5 23.5S40.5 98.8 40.5 85.8c0-24 11.2-50.6 23.5-71zm-2.6 26.2v63.2c-9.8-1.9-17.2-10.4-17.2-20.9 0-12.2 11.4-30.1 17.2-42.3zm5.2 0c5.8 12.2 17.2 30.1 17.2 42.3 0 10.5-7.4 19-17.2 20.9V41z" fill="#13AA52"/>
  </svg>
);

const PythonIcon = ({ className = "w-12 h-12 sm:w-14 sm:h-14" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M62.6 4c-33.5 0-31.4 14.5-31.4 14.5l.1 15.1h31.9v4.5H19.1S0 36 0 69.3c0 33.3 16.7 32 16.7 32h9.9V87.3s-.2-16.7 16.4-16.7h28.2s15.6.2 15.6-15V16s-2.3-12-24.2-12zM46.8 14.2c2.3 0 4.2 1.9 4.2 4.2s-1.9 4.2-4.2 4.2-4.2-1.9-4.2-4.2 1.9-4.2 4.2-4.2z" fill="#3776AB"/>
    <path d="M65.4 124c33.5 0 31.4-14.5 31.4-14.5l-.1-15.1H64.8v-4.5h43.9s19.1 2.1 19.1-31.2c0-33.3-16.7-32-16.7-32h-9.9v14c0 0 .2 16.7-16.4 16.7H56.6s-15.6-.2-15.6 15v35.8s2.3 12 24.4 12zm15.8-10.2c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2z" fill="#FFD43B"/>
  </svg>
);

const JavaIcon = ({ className = "w-12 h-12 sm:w-14 sm:h-14" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.2 99s-4.9 2.8 3.2 3.8c12.5 1.5 24.2 1.3 40.9-2.1 0 0 3.3 2.3 7.8 4-26.1 8.7-60.2 4-51.9-5.7zM34.9 86.8s-4.7 3.7 3.9 4.9c15.5 2.2 32.5 1.8 53.1-2.8 0 0 2.4 2.5 6.2 4.1-30.7 8.2-71.7 4.4-63.2-6.2zM69.2 57.3c6.1 7-8.4 15.3-17.2 22.5 0 0 11.9 1.8 19.5-5.2 7.7-7 9.1-13.1 9.1-13.1s-5.7 2.7-11.4-4.2zM82.9 46.8s4.7 5.6-4.9 11.3c-9.7 5.7-20.3 9.8-35.3 13.4 0 0 4.6 3.1 12.7 2.3 14.2-1.4 27.2-6.9 36.7-14 9.5-7.1 6.7-14.1 6.7-14.1l-15.9 1.1z" fill="#E76F00"/>
    <motion.g
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M65.5 10.7c-5.5 6.4-7.4 13.1-3.3 20.6 4.5 8.2 2.9 12.1-1.7 18.3 0 0 9.4-6.7 8.2-15.6-1.2-8.9-9.3-13.8-3.2-23.3z" fill="#5382A1"/>
      <path d="M77.3 22.8s6.9 7.2 3.2 14.8c-3.7 7.6-1.3 11.6 4 17 0 0-1.4-6.9-4.6-11.7-3.3-4.8.8-13-2.6-20.1z" fill="#5382A1"/>
    </motion.g>
    <path d="M93.4 111.4s7.6.9 13.3-4.3c0 0-3.5 1.7-8.5 2-8.1.4-15.4-.9-15.4-.9s3.6 1.4 10.6 3.2z" fill="#5382A1"/>
  </svg>
);

const MySQLIcon = ({ className = "w-12 h-12 sm:w-14 sm:h-14" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M123.3 73.6c-.9-.6-2.9-1.8-5.2-2.1-3.9-.6-7.4 1.1-10.6 3.7-2.1 1.7-5.2 4.3-8.9 6.1-7 3.6-14.6 3.2-19.9.1-5.9-3.4-9.2-9.4-10.5-16.5-1-5.2-.2-10.7 1.4-15.4 1.9-5.5 5.3-10.1 10-13.3 4.1-2.9 9-4.4 14-4.4 2.2 0 4.5.3 6.8.9 6.1 1.7 11.2 5.6 14 10.9 1 1.7 1.6 3.7 2.1 5.6.6 2.8.5 5.6-.2 8.3-.7 2.6-2 5-3.9 6.9-1.3 1.4-2.9 2.5-4.6 3.3-2.1.9-4.4 1.3-6.7 1.2-2.6-.2-5.2-1-7.3-2.5-2.4-1.7-4.3-4-5.3-6.7-.8-2.2-1-4.5-.6-6.8.4-2.4 1.4-4.7 3-6.5 1.5-1.9 3.6-3.3 5.9-4.1 2.2-.8 4.5-1 6.8-.6 2.4.4 4.7 1.4 6.5 3 .7.6 1.4 1.3 1.9 2l4.4-2.7c-.8-1.1-1.8-2.2-3-3.1-2.9-2.2-6.4-3.8-10.1-4.4-3.6-.6-7.2-.2-10.6 1-3.6 1.3-6.8 3.5-9.2 6.3-2.4 2.9-4 6.4-4.7 10.2-.6 3.6-.3 7.3.9 10.7 1.5 4.2 4.3 7.8 8 10.3 3.3 2.3 7.2 3.6 11.2 3.9 3.6.2 7.1-.4 10.4-1.8 2.7-1.2 5.1-2.9 7-5 2.8-3 4.8-6.5 5.8-10.5 1.1-4.1 1.2-8.4.3-12.6-.7-3-1.8-5.9-3.3-8.5-4.3-7.8-11.9-13.6-21-16-3.3-.9-6.8-1.3-10.2-1.3-7.6 0-15 2.4-21.2 6.7-7.1 5-12.3 12.2-15.1 20.6-2.6 7.7-2.9 16-.8 23.8 2.2 8.2 7.2 15.4 14.3 20.1 6.2 4.1 13.6 6.2 21.1 5.8 5.1-.2 10.1-1.6 14.6-4 5.6-3 10.4-7.2 13.6-12.4 3.9-6.3 6.1-13.5 6.3-20.9.1-2.4-.2-4.9-.8-7.2-.6-2.1-1.4-4.2-2.6-6l-4.3 2.9c.9 1.4 1.5 3 2 4.6.5 1.8.7 3.7.6 5.6-.2 5.7-1.9 11.2-4.9 16-2.4 4-6.1 7.2-10.4 9.5-3.5 1.8-7.3 2.9-11.2 3-5.7.2-11.4-1.3-16.2-4.5-5.5-3.6-9.4-9.1-11-15.4-1.6-6-1.4-12.4.6-18.3 2.1-6.4 6.1-11.9 11.6-15.8 4.7-3.3 10.4-5.1 16.2-5.1 2.6 0 5.3.3 7.8 1 7 1.8 12.8 6.2 16.1 12.2 1.1 2 1.9 4.3 2.4 6.6l4.4-2.7z" fill="#00618A"/>
    <path d="M119.8 65.9c-1.4-.2-2.9-.2-4.3 0-2.7.4-5.2 1.7-7 3.6-2.3 2.4-3.8 5.6-4.1 9-.2 3 .5 6 2.1 8.5 1.8 2.8 4.5 4.9 7.7 5.8 2.7.8 5.6.5 8.1-.9 2.4-1.3 4.3-3.4 5.4-5.9 1.1-2.6 1.4-5.5.7-8.2-.7-2.6-2.1-4.9-4.2-6.4-2.7-2-6-3-9.4-3zm3.6 17c-1.6.8-3.4 1-5.1.6-2-.6-3.8-1.8-4.9-3.6-1-1.6-1.5-3.5-1.3-5.4.2-2.1 1.1-4.2 2.5-5.7 1.2-1.2 2.8-2 4.5-2.3.9-.1 1.8-.1 2.7 0 2.2.3 4.1 1.3 5.5 3 1.3 1.5 2.1 3.5 2.1 5.6 0 2.7-1.2 5.3-3.2 7.1-.8.7-1.8 1.2-2.8 1.4z" fill="#E48E00"/>
  </svg>
);

const AWSIcon = ({ className = "w-12 h-12 sm:w-14 sm:h-14" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35.9 62.8c0-3.3.8-5.7 2.4-7.2 1.6-1.5 3.8-2.2 6.7-2.2 3.2 0 5.6.8 7.1 2.4 1.5 1.6 2.3 4 2.3 7.4 0 3.3-.8 5.7-2.3 7.2-1.5 1.6-3.9 2.4-7.2 2.4-3.1 0-5.5-.8-7-2.3-1.6-1.7-2.3-4.1-2.3-7.7zm9.1 22.4c6.6 0 11.6-1.8 15.2-5.4V83.8h8V52.7h-8v4.1c-3.5-3.4-8.5-5.1-15-5.1-6 0-10.8 2.1-14.4 6.2-3.6 4.2-5.4 9.4-5.4 15.8 0 6.3 1.8 11.6 5.4 15.8 3.6 4.3 8.4 6.4 14.2 6.4zm31.7-1.7l8.4-32.8h-8.4l-5.5 23.5-5.5-23.5h-8.3l8.4 32.8h10.9zm35.5 1.7c4.2 0 8-.9 11.5-2.9V75c-2.8 2-6.1 3-9.8 3-3 0-5.3-.7-6.9-2.1-1.6-1.4-2.4-3.4-2.4-5.9 0-2.2.7-3.9 2.1-5.3 1.4-1.3 4-2.6 7.8-3.8l3.5-1.1c4.7-1.5 8.1-3.2 10.1-5.1 2-1.9 3-4.6 3-8 0-4.4-1.8-7.8-5.3-10.2-3.5-2.5-8.3-3.7-14.2-3.7-4 0-7.8.7-11.7 2.2V42c3.4-1.8 6.9-2.7 10.6-2.7 2.8 0 4.9.6 6.2 1.9 1.4 1.3 2.1 3 2.1 5.1 0 2-.6 3.6-1.9 4.8-1.3 1.2-3.8 2.5-7.5 3.6l-3.5 1.1c-4.9 1.5-8.4 3.3-10.6 5.3-2.2 2-3.3 4.9-3.3 8.5 0 4.6 1.8 8.2 5.4 10.7 3.7 2.6 8.5 3.9 14.8 3.9z" fill="#232F3E" className="dark:fill-white"/>
    <path d="M103.2 93.9c-13.2 9.8-32.4 15-48.8 15-23.1 0-43.9-8.5-59.8-22.7-1.3-1.2-.2-2.7 1.4-1.8 17.1 10 38.4 16 59.8 16 14.6 0 30.3-3.7 44.6-11.5 2.2-1.2 4.1.9 2.8 5z" fill="#FF9900"/>
    <path d="M110.1 87c-1.7-2.1-3.6-4.3-5.7-6.5-.9-1-.2-1.4.8-.9 6.7 3.2 15.5 6.1 17.7 7 .2.1.2.3 0 .4-.2.1-1.7.3-3.3.4-6 0-16.6 6.7-18.9 7.7-2.3 1-1.7-.4-.7-1.4 2.2-2.2 5.4-6.4 6.8-9.2z" fill="#FF9900"/>
  </svg>
);

const DockerIcon = ({ className = "w-12 h-12 sm:w-14 sm:h-14" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M74.6 59.1h11.3v11.3H74.6V59.1zm-14.1 0h11.3v11.3H60.5V59.1zm-14.1 0h11.3v11.3H46.4V59.1zm-14.2 0h11.3v11.3H32.2V59.1zm-14.1 0h11.3v11.3H18.1V59.1zm42.4-14.1h11.3v11.3H60.5V45zm-14.1 0h11.3v11.3H46.4V45zm-14.2 0h11.3v11.3H32.2V45zm28.3-14.1h11.3v11.3H60.5V30.9z" fill="#2496ED"/>
    <motion.path
      animate={{ y: [0, 2, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      d="M126.8 64.1c-1.9-1.3-7.7-4.8-15.7-3.9-1.5-2.8-3.6-5.4-6.2-7.6l-2.5-2-1.8 2.6c-3.3 4.7-5 10.3-4.9 16.1H8c-.9 0-1.6.7-1.6 1.6 0 12 3.2 23.2 9.4 32.4 6.2 9.2 15.2 15.8 25.9 19.1 4.5 1.4 9.3 2.1 14.1 2.1 26.5 0 49.5-16.2 58.1-40.1 9.5-.8 15.8-5.3 16.4-5.7 1.3-1 1.3-2.9-.4-3.9z" fill="#2496ED"
    />
  </svg>
);

const GitIcon = ({ className = "w-12 h-12 sm:w-14 sm:h-14" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M120.9 57.7L70.3 7.1a12.1 12.1 0 0 0-17.1 0l-8.7 8.7 19.4 19.4a14.4 14.4 0 0 1 17.3 17.5l18.4 18.4a14.3 14.3 0 0 1 14.5 23.4 14.4 14.4 0 0 1-23.4-14.5L72.3 61.6v34.8a14.4 14.4 0 1 1-12.1-1.4V47.8a14.4 14.4 0 0 1-6.8-18.7L35.5 10.2 7.1 38.6a12.1 12.1 0 0 0 0 17.1l50.6 50.6a12.1 12.1 0 0 0 17.1 0l46.1-46.1a12.1 12.1 0 0 0 0-17.5z" fill="#F05032"/>
  </svg>
);

const technologies = [
  { 
    name: 'React', 
    category: 'Frontend', 
    icon: ReactIcon, 
    desc: 'UI Library',
    fullDesc: 'React is a popular open-source JavaScript library for building fast, interactive, and component-based user interfaces.',
    features: ['Virtual DOM Performance', 'Reusable Component Architecture', 'Rich Ecosystem & Hooks', 'Cross-Platform with React Native'],
    useCase: 'Modern Single Page Applications (SPAs), Interactive Dashboards, and Enterprise Web Interfaces.',
    color: '#61DAFB'
  },
  { 
    name: 'Next.js', 
    category: 'Frontend', 
    icon: NextjsIcon, 
    desc: 'React Framework',
    fullDesc: 'Next.js provides hybrid static & server-side rendering, TypeScript support, smart bundling, and route pre-fetching out of the box.',
    features: ['Server-Side Rendering (SSR)', 'Static Site Generation (SSG)', 'Built-in Image & Font Optimization', 'API Routes & Edge Functions'],
    useCase: 'High-performance corporate websites, e-commerce platforms, and SEO-critical web portals.',
    color: '#000000'
  },
  { 
    name: 'Node.js', 
    category: 'Backend', 
    icon: NodejsIcon, 
    desc: 'JS Runtime',
    fullDesc: 'Node.js is an event-driven, non-blocking I/O JavaScript runtime engineered for scalable backend services and microservices.',
    features: ['Asynchronous & Non-blocking I/O', 'V8 JavaScript Engine Speed', 'Vast NPM Package Ecosystem', 'Real-time WebSockets Support'],
    useCase: 'Scalable REST APIs, GraphQL Backends, Real-time Chat Apps, and Streaming Services.',
    color: '#5FA04E'
  },
  { 
    name: 'MongoDB', 
    category: 'Database', 
    icon: MongoDBIcon, 
    desc: 'NoSQL Database',
    fullDesc: 'MongoDB is a document-oriented NoSQL database designed for high availability, flexible schemas, and horizontal scaling.',
    features: ['Flexible JSON-like Documents', 'Powerful Aggregation Pipeline', 'Automatic Sharding & Replication', 'Atlas Cloud Integration'],
    useCase: 'Big data applications, content management systems, user profiles, and dynamic catalogs.',
    color: '#13AA52'
  },
  { 
    name: 'Python', 
    category: 'Backend', 
    icon: PythonIcon, 
    desc: 'AI & Data Science',
    fullDesc: 'Python is a high-level programming language renowned for AI, machine learning, data engineering, and rapid backend API development.',
    features: ['Machine Learning (PyTorch, TensorFlow)', 'Data Analysis & Automation', 'Clean, Readable Syntax', 'Django & FastAPI Web Frameworks'],
    useCase: 'AI/ML Solutions, Predictive Analytics Engine, Web Scraping, and Automation Pipelines.',
    color: '#3776AB'
  },
  { 
    name: 'Java', 
    category: 'Backend', 
    icon: JavaIcon, 
    desc: 'Enterprise Systems',
    fullDesc: 'Java is an enterprise-grade object-oriented language known for robust performance, multi-threading, and rock-solid platform independence.',
    features: ['JVM Platform Independence', 'Spring Boot Microservices', 'High Concurrency & Threading', 'Enterprise Security Standards'],
    useCase: 'Large-scale ERP systems, banking software, microservices, and mission-critical enterprise applications.',
    color: '#E76F00'
  },
  { 
    name: 'MySQL', 
    category: 'Database', 
    icon: MySQLIcon, 
    desc: 'Relational Database',
    fullDesc: 'MySQL is the world’s most popular open-source relational database management system, providing strict ACID compliance and high availability.',
    features: ['ACID Transaction Reliability', 'Complex Relational Joins & Indexing', 'High Performance Caching', 'Enterprise Security & Backup'],
    useCase: 'Transactional data management, financial records, billing systems, and relational backend schemas.',
    color: '#00618A'
  },
  { 
    name: 'AWS', 
    category: 'Cloud', 
    icon: AWSIcon, 
    desc: 'Cloud Infrastructure',
    fullDesc: 'Amazon Web Services (AWS) offers reliable, scalable, and inexpensive cloud computing services with global infrastructure footprint.',
    features: ['Auto-scaling EC2 Instances', 'Serverless Lambda Functions', 'S3 Secure Asset Storage', 'CloudFront Global CDN & Route 53'],
    useCase: 'Cloud infrastructure hosting, serverless APIs, CI/CD deployment pipelines, and global content delivery.',
    color: '#FF9900'
  },
  { 
    name: 'Docker', 
    category: 'Cloud', 
    icon: DockerIcon, 
    desc: 'Containerization',
    fullDesc: 'Docker automates the deployment of applications inside lightweight, portable software containers that run consistently anywhere.',
    features: ['Consistent Dev/Prod Environments', 'Lightweight Container Isolation', 'Docker Compose & Swarm Support', 'Fast Deployment & Scaling'],
    useCase: 'Microservices containerization, isolated dev environments, and seamless multi-cloud deployments.',
    color: '#2496ED'
  },
  { 
    name: 'Git', 
    category: 'Tools', 
    icon: GitIcon, 
    desc: 'Version Control',
    fullDesc: 'Git is a distributed version control system designed to handle everything from small to very large projects with speed and efficiency.',
    features: ['Distributed Architecture', 'Non-linear Branching & Merging', 'Cryptographic Staging Integrity', 'GitHub & GitLab Integration'],
    useCase: 'Source code management, collaborative team workflows, pull request reviews, and version tracking.',
    color: '#F05032'
  }
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Cloud', 'Tools'];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState(null);

  const filteredTech = activeCategory === 'All' 
    ? technologies 
    : technologies.filter(t => t.category === activeCategory);

  return (
    <section id="technologies" className="relative py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 dark:bg-purple-600/25 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12 space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta"
        >
          <Cpu size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Modern Tech Stack</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-outfit"
        >
          Technologies We <span className="gradient-accent">Work With</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium font-outfit"
        >
          We build enterprise software using high-performance, robust, and modern technology frameworks. Click any technology to view details.
        </motion.p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 font-jakarta">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all duration-300 cursor-pointer ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-purple-800 via-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-600/35 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800 border border-purple-200/80 dark:border-slate-800 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto"
      >
        {filteredTech.map((tech) => {
          const IconComponent = tech.icon;
          if (!IconComponent) return null; 

          return (
            <motion.div 
              layout
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedTech(tech)}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="group cursor-pointer glass-card rounded-3xl p-4 sm:p-5 border border-purple-200/80 dark:border-slate-800 hover:border-purple-400 bg-white/80 dark:bg-slate-900/80 flex flex-col items-center justify-center gap-3 text-center transition-all shadow-md hover:shadow-xl hover:shadow-purple-500/15 relative overflow-hidden"
            >
              {/* Subtle hover prompt badge */}
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="w-2 h-2 rounded-full bg-purple-500 block animate-ping" />
              </div>

              {/* Icon container - tight box padding so the icon fills maximum space */}
              <motion.div 
                whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="p-2 sm:p-2.5 rounded-2xl bg-transparent group-hover:bg-purple-50/70 dark:group-hover:bg-slate-800/80 transition-all duration-300 flex items-center justify-center"
              >
                <IconComponent className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-sm" />
              </motion.div>

              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-outfit">
                  {tech.name}
                </h4>
                <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-extrabold font-jakarta">
                  {tech.desc}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Tech Details Modal */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTech(null)}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-purple-200/80 dark:border-slate-800 shadow-2xl overflow-hidden font-jakarta"
            >
              {/* Decorative background glow */}
              <div 
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: selectedTech.color || '#9333ea' }}
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedTech(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-slate-700 dark:hover:text-purple-300 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-slate-800 border border-purple-100 dark:border-slate-700 shadow-inner flex items-center justify-center shrink-0">
                  <selectedTech.icon className="w-14 h-14" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white font-outfit">
                      {selectedTech.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[11px] font-extrabold uppercase">
                      {selectedTech.category}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                    {selectedTech.desc}
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Info size={14} className="text-purple-500" /> Overview
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
                    {selectedTech.fullDesc}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-purple-500" /> Key Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedTech.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-purple-50/60 dark:bg-slate-800/60 border border-purple-100/60 dark:border-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-200">
                        <CheckCircle2 size={15} className="text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                    How We Use It At SS Infotech
                  </h4>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 leading-relaxed">
                    {selectedTech.useCase}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-7 flex justify-end">
                <button
                  onClick={() => setSelectedTech(null)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}