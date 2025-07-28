const express = require('express');
const cors = require('cors')
const app = express();
const authRoutes = require('./routes/auth.routes');
const clientRoutes = require('./routes/client.routes');
const projectRoutes = require('./routes/project.routes');
const errorHandler = require('./middlewares/error.middleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin:'*', // Allow only your frontend
}));

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use(errorHandler);

module.exports = app;
