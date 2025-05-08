const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");  // Required to check and create directory
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads'

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Create 'uploads' folder if it doesn't exist
}

// Set up multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Store images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Save the file with a unique name
  },
});

const upload = multer({ storage: storage });

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Import Models
const User = require('./models/User');
const Product = require('./models/Product');
const Event = require('./models/Event')

// User Routes
app.post('/api/signup', async (req, res) => {
  try {
    const {name, email, password } = req.body;
    const newUser = new User({uid, name, email, password });
    await newUser.save();
    console.log("New User Saved:", newUser);
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

// Sign In Route
app.post('/api/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Simple password check (you should hash passwords in real apps)
      if (user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      res.json({ message: "Login successful", user });
    } catch (error) {
      console.error("Error during signin:", error);
      res.status(500).json({ message: "Signin failed", error: error.message });
    }
  });
  
// Product Routes
// Create Product Route (with Image Upload)
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;  // Get image URL

    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Fetching products failed", error: error.message });
  }
});

// Get a single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Fetching product failed", error: error.message });
  }
});

// Delete Product Route
app.delete('/api/products/:id', async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
  });

  //Event Posting

  app.post('/api/events', upload.single('banner'), async (req, res) => {
    try {
      console.log("Received form data:", req.body);
      console.log("Received file:", req.file);
  
      const { title, date, venue, description, userEmail } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  
      const newEvent = new Event({
        title,
        date,
        venue,
        description,
        imageUrl,
        userEmail,
      });
  
      await newEvent.save();
      res.status(201).json({ message: "Event added successfully" });
    } catch (error) {
      console.error("Error adding event:", error);  // Will show the error in terminal
      res.status(500).json({ message: "Failed to create event", error: error.message });
    }
  });

  
  app.get('/api/events', async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Fetching events failed", error: error.message });
    }
  });
  

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
