const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database connectors
const connectMongo = require('./config/db-mongodb.js');
const sequelize = require('./config/db-mysql.js'); // Just importing this initializes it
require('./models/associations'); // Import associations to ensure they are registered

// Connect to MongoDB
connectMongo();

// Import route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON in request bodies

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/wishlist', wishlistRoutes); 

// Basic route for server health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Define the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});