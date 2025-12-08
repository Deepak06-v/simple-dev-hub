import dotenv from 'dotenv';
import connectDB from './src/db/db.js';
import app from './server.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
