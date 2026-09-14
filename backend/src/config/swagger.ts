import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'APH YAH - Integrated UMKM Business Growth Intelligence Platform API',
      version: '1.0.0',
      description: `
**APH YAH (Dari Data Usaha Menjadi Arah Pertumbuhan)**
Engineered specifically for UMKM in West Java.

### Key Engines:
1. **Business Intelligence Engine**: Data ingestion, automated insights, revenue & trend analytics.
2. **Opportunity Matcher Engine**: Intelligence-based matching of West Java funding, exhibitions, & training.
3. **AI Growth Assistant**: RAG-powered interactive business consultant with context provenance.

---
      `,
      contact: {
        name: 'Muhammad Rakha Syam Putra (APH YAH Team)',
        email: 'Muhammadrakhasyamputra@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server (Local)',
      },
      {
        url: 'https://aphyah-backend.vercel.app',
        description: 'Production Server (Vercel)',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token obtained from `/api/auth/login`',
        },
      },
      schemas: {
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation completed successfully' },
            data: { type: 'object' },
            errors: { type: 'array', items: { type: 'string' } },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'usr_demo_001' },
            email: { type: 'string', example: 'demo@aphyah.id' },
            fullName: { type: 'string', example: 'Budi Santoso' },
            role: { type: 'string', enum: ['ADMIN', 'UMKM_OWNER', 'STAFF'], example: 'UMKM_OWNER' },
            phone: { type: 'string', example: '081234567890' },
          },
        },
        Business: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'biz_kopi_001' },
            name: { type: 'string', example: 'Kopi Karawang Heritage' },
            category: { type: 'string', example: 'KULINER' },
            city: { type: 'string', example: 'Karawang' },
            province: { type: 'string', example: 'Jawa Barat' },
            description: { type: 'string', example: 'Produsen kopi lokal' },
            address: { type: 'string', example: 'Jl. Interchange Karawang Barat No. 45' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'prod_001' },
            sku: { type: 'string', example: 'KPR-001' },
            name: { type: 'string', example: 'Kopi Robusta Karawang 250g' },
            category: { type: 'string', example: 'Biji Kopi' },
            price: { type: 'number', example: 45000 },
            costPrice: { type: 'number', example: 28000 },
            stock: { type: 'integer', example: 120 },
          },
        },
        Transaction: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'trx_001' },
            invoiceNumber: { type: 'string', example: 'INV/202609/001' },
            transactionDate: { type: 'string', format: 'date-time' },
            totalAmount: { type: 'number', example: 180000 },
            paymentMethod: { type: 'string', example: 'QRIS' },
            status: { type: 'string', example: 'COMPLETED' },
          },
        },
        Opportunity: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'opp_001' },
            title: { type: 'string', example: 'Kurasi UMKM Ekspor Jawa Barat 2026' },
            organizer: { type: 'string', example: 'Dinas Indag Jabar & Bank Indonesia' },
            category: { type: 'string', example: 'EXHIBITION' },
            description: { type: 'string' },
            city: { type: 'string', example: 'Bandung' },
            province: { type: 'string', example: 'Jawa Barat' },
            minScale: { type: 'string', example: 'SMALL' },
            fundingAmount: { type: 'number', example: 50000000 },
            deadline: { type: 'string', format: 'date-time' },
            linkUrl: { type: 'string', example: 'https://disindag.jabarprov.go.id' },
          },
        },
        Recommendation: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'rec_001' },
            businessId: { type: 'string' },
            opportunityId: { type: 'string' },
            matchScore: { type: 'number', example: 92 },
            matchReasons: { type: 'array', items: { type: 'string' } },
            opportunity: { $ref: '#/components/schemas/Opportunity' },
          },
        },
        AssistantMessage: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            sender: { type: 'string', enum: ['USER', 'ASSISTANT'] },
            content: { type: 'string' },
            sources: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      '/health': {
        get: {
          summary: 'Health Check Endpoint',
          tags: ['System'],
          responses: {
            200: {
              description: 'System healthy',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } },
            },
          },
        },
      },
      '/api/auth/register': {
        post: {
          summary: 'Register new UMKM user',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password', 'fullName'],
                  properties: {
                    email: { type: 'string', example: 'pemilik@kuliner.id' },
                    password: { type: 'string', example: 'Secret123!' },
                    fullName: { type: 'string', example: 'Siti Rahma' },
                    businessName: { type: 'string', example: 'Dapur Sunda Rahma' },
                    category: { type: 'string', example: 'KULINER' },
                    city: { type: 'string', example: 'Bandung' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'User registered successfully' },
            400: { description: 'Validation error or email exists' },
          },
        },
      },
      '/api/auth/login': {
        post: {
          summary: 'Login user & retrieve JWT token',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', example: 'demo@aphyah.id' },
                    password: { type: 'string', example: 'Demo123!' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Login successful, returns token & user profile' },
            401: { description: 'Invalid credentials' },
          },
        },
      },
      '/api/auth/me': {
        get: {
          summary: 'Get current user profile & business info',
          tags: ['Auth'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'User profile retrieved' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/api/business': {
        get: {
          summary: 'Get active business profile & statistics',
          tags: ['Business Profile'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Business data retrieved' },
          },
        },
        put: {
          summary: 'Update business profile information',
          tags: ['Business Profile'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    category: { type: 'string' },
                    city: { type: 'string' },
                    description: { type: 'string' },
                    monthlyRevenue: { type: 'number' },
                    employeeCount: { type: 'integer' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Business profile updated' },
          },
        },
      },
      '/api/products': {
        get: {
          summary: 'List products of active business',
          tags: ['Products'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of products' },
          },
        },
        post: {
          summary: 'Create new product',
          tags: ['Products'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' },
              },
            },
          },
          responses: {
            201: { description: 'Product created' },
          },
        },
      },
      '/api/business-data/upload': {
        post: {
          summary: 'Upload sales/transaction CSV file for automatic ingestion',
          tags: ['Business Intelligence'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: { type: 'string', format: 'binary' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'CSV file ingested and processed into BI engine' },
          },
        },
      },
      '/api/transactions': {
        get: {
          summary: 'List transactions with optional date and search filters',
          tags: ['Transactions'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'startDate', in: 'query', schema: { type: 'string' } },
            { name: 'endDate', in: 'query', schema: { type: 'string' } },
            { name: 'status', in: 'query', schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Transactions list' },
          },
        },
      },
      '/api/bi/dashboard': {
        get: {
          summary: 'Get full Business Intelligence dashboard summary (KPIs, revenue breakdown, growth scores)',
          tags: ['Business Intelligence'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Dashboard intelligence data' },
          },
        },
      },
      '/api/bi/insights': {
        get: {
          summary: 'Get automated business insights generated by BI engine',
          tags: ['Business Intelligence'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of insights' },
          },
        },
      },
      '/api/opportunities': {
        get: {
          summary: 'List available West Java opportunities (exhibitions, funding, training)',
          tags: ['Opportunity Matcher'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'category', in: 'query', schema: { type: 'string' } },
            { name: 'city', in: 'query', schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Opportunities list' },
          },
        },
      },
      '/api/recommendations': {
        get: {
          summary: 'Get matched & scored opportunity recommendations for active business profile',
          tags: ['Opportunity Matcher'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Scored opportunity recommendations with match reasons' },
          },
        },
      },
      '/api/knowledge': {
        get: {
          summary: 'List knowledge base documents',
          tags: ['Knowledge Base'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Knowledge documents list' },
          },
        },
        post: {
          summary: 'Create/upload new knowledge base document',
          tags: ['Knowledge Base'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['title', 'category', 'content'],
                  properties: {
                    title: { type: 'string' },
                    category: { type: 'string' },
                    tags: { type: 'string' },
                    content: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Document created' },
          },
        },
      },
      '/api/assistant/chat': {
        post: {
          summary: 'Chat with RAG-powered AI Growth Assistant',
          tags: ['AI Assistant'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['message'],
                  properties: {
                    message: { type: 'string', example: 'Bagaimana cara mendaftar Sertifikasi Halal SEHATI Jabar?' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'AI Assistant response with relevant knowledge sources' },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
