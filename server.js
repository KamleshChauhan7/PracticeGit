const express = require('express');
const { centralDB, projectDB } = require('./config/db');
const businessRoutes = require('./routes/businessRoutes');

const app = express();
app.use(express.json());

app.use('/api', businessRoutes);

// Sync both databases and start server
const startServer = async () => {
  try {
    // Authenticate both
    await centralDB.authenticate();
    await projectDB.authenticate();
    console.log('Both databases connected successfully.');

    // Sync models (creates tables if they don't exist)
    // Note: In production, use Migrations, not sync()
    await centralDB.sync(); 
    await projectDB.sync();

    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the databases:', error);
  }
};

startServer();