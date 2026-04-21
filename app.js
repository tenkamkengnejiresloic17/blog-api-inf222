const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const articlesRouter = require('./src/routes/articles');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Blog - INF222',
      version: '1.0.0',
      description: 'API backend pour gérer un blog simple - TAF1 INF222'
    },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/articles', articlesRouter);

app.get('/', (req, res) => {
  res.json({
    message: "Bienvenue sur l'API Blog INF222 !",
    documentation: "http://localhost:3000/api-docs"
  });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📚 Documentation Swagger : http://localhost:${PORT}/api-docs`);
});
