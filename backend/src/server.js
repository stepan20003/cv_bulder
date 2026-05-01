const app = require('./app');
const { getDb } = require('./config/database');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Ensure DB is initialized
    await getDb();
    console.log('Database initialized');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
