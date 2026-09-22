const mongoose = require('mongoose');
const env = require('./config/env');
const User = require('./models/User.model');
const Service = require('./models/Service.model');
const Project = require('./models/Project.model');
const Testimonial = require('./models/Testimonial.model');
const Partner = require('./models/Partner.model');
const Career = require('./models/Career.model');
const ProjectInquiry = require('./models/ProjectInquiry.model');
const JobApplication = require('./models/JobApplication.model');
const Newsletter = require('./models/Newsletter.model');

const initialServices = [
  {
    title: 'Website Development',
    slug: 'website-development',
    description: 'We build fast, responsive and SEO-friendly websites that drive results.',
    icon: 'Code',
    order: 1,
  },
  {
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    description: 'We create powerful mobile applications for Android and iOS platforms.',
    icon: 'Smartphone',
    order: 2,
  },
  {
    title: 'App Development',
    slug: 'app-development',
    description: 'Custom app applications that cater to your business objectives.',
    icon: 'Layout',
    order: 3,
  },
  {
    title: 'Machine Learning & AI',
    slug: 'machine-learning-ai',
    description: 'Smart AI solutions to automate processes and improve efficiency.',
    icon: 'Brain',
    order: 4,
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    description: 'Boost your online presence with data-driven digital marketing strategies.',
    icon: 'Megaphone',
    order: 5,
  },
  {
    title: 'Integration Services',
    slug: 'integration-services',
    description: 'Seamless integration of third-party APIs and enterprise solutions.',
    icon: 'Wifi',
    order: 6,
  },
];

const initialProjects = [
  {
    title: 'Enterprise ERP & Analytics Platform',
    category: 'Cloud & SaaS',
    tags: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    description: 'Custom enterprise resource planning solution with real-time financial telemetry and automated operational workflows.',
    metrics: '+140% Operational Efficiency',
    color: 'from-purple-100/50 to-indigo-50/40',
    featured: true,
  },
  {
    title: 'AI Predictive Healthcare Suite',
    category: 'AI & ML',
    tags: ['Python', 'Machine Learning', 'AWS', 'React'],
    description: 'Intelligent diagnostic dashboard leveraging deep learning algorithms for automated patient risk assessment.',
    metrics: '99.4% Model Accuracy',
    color: 'from-blue-100/50 to-indigo-50/40',
    featured: true,
  },
  {
    title: 'Next-Gen FinTech Mobile App',
    category: 'Mobile App',
    tags: ['React Native', 'Node.js', 'Docker', 'AWS'],
    description: 'High-speed crypto and fiat payment gateway with biometric authentication and instant cross-border settlement.',
    metrics: '2.5M+ Active Users',
    color: 'from-emerald-100/50 to-purple-50/40',
    featured: true,
  },
  {
    title: 'Omnichannel E-Commerce Cloud',
    category: 'Web App',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
    description: 'Scalable multi-tenant e-commerce platform handling millions of requests with sub-100ms page load speeds.',
    metrics: '400k+ Monthly Orders',
    color: 'from-pink-100/50 to-purple-50/40',
    featured: true,
  },
];

const initialTestimonials = [
  {
    name: 'Amit Verma',
    title: 'CEO',
    company: 'Tech Solutions',
    quote: 'SS Infotech delivered an excellent solution that exceeded our expectations. Their team is professional and dedicated.',
    rating: 5,
  },
  {
    name: 'Neha Sharma',
    title: 'Marketing Head',
    company: 'Genpact',
    quote: 'Great experience working with SS Infotech. They understood our requirements perfectly and delivered on time.',
    rating: 5,
  },
  {
    name: 'Rahul Khanna',
    title: 'Founder',
    company: 'InnovateHub',
    quote: 'The team is responsive, innovative and committed. Highly recommended for any enterprise digital transformation.',
    rating: 5,
  },
];

const initialPartners = [
  { name: 'Infosys', order: 1 },
  { name: 'Tech Mahindra', order: 2 },
  { name: 'Expleo', order: 3 },
  { name: 'Genpact', order: 4 },
  { name: 'HCL', order: 5 },
  { name: 'HP', order: 6 },
];

const initialCareers = [
  {
    title: 'Senior Full Stack Engineer (React & Node.js)',
    department: 'Engineering',
    location: 'Bangalore / Hybrid',
    type: 'Full-time',
    description: 'We are seeking an experienced Full Stack Developer to build high-scale web platforms.',
    requirements: ['4+ years with Next.js, Node.js, Express', 'Proficiency with MongoDB / PostgreSQL', 'Clean architecture principles'],
  },
  {
    title: 'AI / Machine Learning Engineer',
    department: 'AI Lab',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    description: 'Join our AI team to build predictive models and computer vision pipelines.',
    requirements: ['Python, PyTorch / TensorFlow', 'API deployment experience', 'Strong mathematical foundation'],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('🌱 Connected to MongoDB for seeding...');

    // Clear existing collections & drop old unused ones
    const oldCollections = ['contacts', 'newsletters', 'activitylogs', 'teams'];
    for (const colName of oldCollections) {
      try { await mongoose.connection.db.dropCollection(colName); } catch (e) {}
    }

    await User.deleteMany();
    try { await Service.collection.drop(); } catch (e) {}
    await Project.deleteMany();
    await Testimonial.deleteMany();
    await Partner.deleteMany();
    await Career.deleteMany();
    await ProjectInquiry.deleteMany();
    await JobApplication.deleteMany();
    await Newsletter.deleteMany();

    // Create Default Super Admin
    const admin = await User.create({
      name: 'SS Infotech Admin',
      email: 'admin@ssinfotech.com',
      password: 'AdminPassword123!',
      role: 'SUPER_ADMIN',
    });
    console.log(`✅ Default Super Admin Created: admin@ssinfotech.com / AdminPassword123!`);

    // Insert Initial Datasets
    await Service.insertMany(initialServices);
    console.log(`✅ ${initialServices.length} Services seeded.`);

    await Project.insertMany(initialProjects);
    console.log(`✅ ${initialProjects.length} Portfolio Projects seeded.`);

    await Testimonial.insertMany(initialTestimonials);
    console.log(`✅ ${initialTestimonials.length} Testimonials seeded.`);

    await Partner.insertMany(initialPartners);
    console.log(`✅ ${initialPartners.length} Partners seeded.`);

    await Career.insertMany(initialCareers);
    console.log(`✅ ${initialCareers.length} Careers seeded.`);

    await ProjectInquiry.create({
      clientName: 'Rajesh Sharma',
      clientEmail: 'rajesh@enterprise.com',
      serviceRequested: 'Cloud Architecture & Web App',
      projectDetails: 'Requirement for high-concurrency cloud architecture migration for enterprise SaaS platform.',
      status: 'New',
    });
    console.log(`✅ 1 Project Inquiry seeded to project_inquiries.`);

    await JobApplication.create({
      candidateName: 'Anil Kumar',
      candidateEmail: 'anil@dev.com',
      jobTitle: 'Senior Full Stack Engineer',
      portfolioLink: 'https://github.com/anil-dev',
      coverNote: '5+ years experience with React, Next.js, Node.js and MongoDB.',
      status: 'New',
    });
    console.log(`✅ 1 Job Application seeded to job_applications.`);

    await Newsletter.create({
      email: 'subscriber@ssinfotech.org',
    });
    console.log(`✅ 1 Subscriber seeded to newsletter_subscribers.`);

    console.log('\n🎉 Database Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
