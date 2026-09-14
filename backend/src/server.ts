import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config/env.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { sendSuccess } from './utils/response.js';

// Import Routers
import authRouter from './modules/auth/auth.routes.js';
import businessRouter from './modules/business/business.routes.js';
import productsRouter from './modules/products/products.routes.js';
import businessDataRouter from './modules/business-data/dataUpload.routes.js';
import transactionsRouter from './modules/transactions/transactions.routes.js';
import biRouter from './modules/bi/bi.routes.js';
import opportunityRouter from './modules/opportunities/opportunity.routes.js';
import recommendationRouter from './modules/recommendations/recommendation.routes.js';
import knowledgeRouter from './modules/knowledge/knowledge.routes.js';
import assistantRouter from './modules/assistant/assistant.routes.js';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';

const app = express();

// Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, serverless) or any origin in dev/vercel
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, data: null, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Swagger Documentation Endpoints
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Root & API Base Welcome Endpoints
app.get('/', (req, res) => {
  return sendSuccess(res, {
    status: 'ONLINE',
    app: 'APH YAH - Integrated UMKM Business Growth Intelligence Platform',
    documentation: '/api/docs',
    health: '/api/health',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  }, 'APH YAH Backend API Service is running');
});

app.get('/api', (req, res) => {
  return sendSuccess(res, {
    status: 'ONLINE',
    app: 'APH YAH - Integrated UMKM Business Growth Intelligence Platform',
    documentation: 'http://localhost:5000/api/docs',
    endpoints: [
      '/api/health',
      '/api/docs',
      '/api/auth',
      '/api/business',
      '/api/products',
      '/api/business-data',
      '/api/transactions',
      '/api/bi',
      '/api/opportunities',
      '/api/recommendations',
      '/api/knowledge',
      '/api/assistant',
    ],
    timestamp: new Date().toISOString(),
  }, 'APH YAH REST API v1.0.0');
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  return sendSuccess(res, {
    status: 'ONLINE',
    app: 'APH YAH - Integrated UMKM Business Growth Intelligence Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API Routes Mount
app.use('/api/auth', authRouter);
app.use('/api/business', businessRouter);
app.use('/api/products', productsRouter);
app.use('/api/business-data', businessDataRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/bi', biRouter);
app.use('/api/opportunities', opportunityRouter);
app.use('/api/recommendations', recommendationRouter);
app.use('/api/knowledge', knowledgeRouter);
app.use('/api/assistant', assistantRouter);

// Global Error Handler
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 APH YAH Backend Service running on port ${PORT}`);
  console.log(`📡 REST API available at http://localhost:${PORT}/api`);
});

export default app;
