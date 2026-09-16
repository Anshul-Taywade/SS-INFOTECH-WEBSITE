const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const env = require('./config/env');
const { notFound, errorHandler } = require('./middleware/error.middleware');

// Route imports
const authRoutes = require('./routes/auth.routes');
const contactRoutes = require('./routes/contact.routes');
const newsletterRoutes = require('./routes/newsletter.routes');
const serviceRoutes = require('./routes/service.routes');
const projectRoutes = require('./routes/project.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const partnerRoutes = require('./routes/partner.routes');
const careerRoutes = require('./routes/career.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

// Initialize app
const app = express();

// Connect to Database in persistent environment
if (!process.env.VERCEL) {
  connectDB();
}


// Security Middlewares - disable contentSecurityPolicy in helmet for local static serving
app.use(helmet({ contentSecurityPolicy: false }));

// Enable CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // allow all origins in development / preview or specific origins in production
      callback(null, true);
    },
    credentials: true,
  })
);

// DB auto-connect middleware for serverless invocations
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    await connectDB();
  }
  next();
});

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body Parser & Logger
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check Route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SS Infotech Backend API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/newsletter', newsletterRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/partners', partnerRoutes);
app.use('/api/v1/careers', careerRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// 1. Serve Admin Application at /admin
const adminDistPath = path.join(__dirname, '../admin/dist');
if (fs.existsSync(adminDistPath)) {
  app.use('/admin', express.static(adminDistPath));
  app.get(['/admin', '/admin/*'], (req, res) => {
    res.sendFile(path.join(adminDistPath, 'index.html'));
  });
}

// 2. Serve Frontend User Website at /
const frontendDistPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  // Error Middlewares if dist is not built yet
  app.use(notFound);
  app.use(errorHandler);
}

// Start Server locally if not running in Vercel Serverless environment
if (!process.env.VERCEL) {
  const PORT = env.PORT;
  app.listen(PORT, () => {
    console.log(`🚀 Application running at: http://localhost:${PORT}/`);
  });
}

module.exports = app;

