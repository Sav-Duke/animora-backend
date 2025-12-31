import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import diseaseRoutes from './routes/diseaseRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import seoRoutes from './routes/seoRoutes.js';
import codeValidatorRoutes from './routes/codeValidatorRoutes.js';

dotenv.config();

const app = express();
// --- Example CORS code for Express backend (Animora AI) ---
// Only allow requests from your deployed frontends (replace with your actual Vercel domains):
const allowedOrigins = [
  'https://your-main-frontend.vercel.app',
  'https://your-admin-frontend.vercel.app',
  'http://localhost:3000'
];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
// To customize, edit allowedOrigins above. For more info, see: https://expressjs.com/en/resources/middleware/cors.html
app.use(express.json({ limit: '50mb' })); // Increased limit for image uploads
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// (server will be started after routes are registered and PORT is defined)

// --- Routes ---
app.use('/api/diseases', diseaseRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/code-validator', codeValidatorRoutes);

// --- Test route ---
app.get("/", (req, res) => {
  res.send("Animora AI backend is running!");
});

const PORT = process.env.PORT || 4001;

// Start server only after MongoDB connection succeeds
(async function start() {
  try {
    // Try to connect to MongoDB, but don't fail if it's not available
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000
      });
      console.log("✅ Connected to MongoDB (animora)");
    } else {
      console.log("⚠️ MONGO_URI not set - running without database");
    }

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Animora AI backend running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} in use — free the port or set PORT env var.`);
        process.exit(1);
      }
      console.error('Server error', err);
    });

  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log("⚠️ Starting server anyway...");
    
    // Start server even if MongoDB fails
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Animora AI backend running on port ${PORT} (without database)`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} in use`);
        process.exit(1);
      }
      console.error('Server error', err);
    });
  }
})();
