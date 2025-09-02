const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const winston = require('winston');
const routes = require('./routes');
const { User } = require('./models');
const bcrypt = require('bcryptjs');
const sequelize = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

const logger = winston.createLogger({ level: 'info', transports: [new winston.transports.Console()] });

const swaggerDocument = {
  openapi: '3.0.0',
  info: { title: 'ERP API', version: '1.0.0' },
  paths: {
    '/auth/register': { post: { summary: 'Register new user (admin only)' } },
    '/auth/login': { post: { summary: 'Login user' } },
    // Add other paths manually or use swagger-jsdoc
  },
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);

const PORT = process.env.serverPORT || 3000;
app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);
  await sequelize.sync({ force: false });

  // Seed default admin
  const adminUsername = 'admin';
  const adminEmail = 'admin@university.com';
  const adminPassword = 'adminpass';

  // Find by username
  const admin = await User.findOne({ where: { username: adminUsername } });

  if (admin) {
    // Update existing admin
    await admin.update({
      email: adminEmail,
      hashed_password: await bcrypt.hash(adminPassword, 10),
      role: 'admin',
    });
    logger.info(`Default admin updated. Email: ${adminEmail}, Password: ${adminPassword} (change it)`);
  } else {
    // Create admin if not exists
    await User.create({
      username: adminUsername,
      email: adminEmail,
      hashed_password: await bcrypt.hash(adminPassword, 10),
      role: 'admin',
    });
    logger.info(`Default admin created. Email: ${adminEmail}, Password: ${adminPassword} (change it)`);
  }
});

module.exports = app;