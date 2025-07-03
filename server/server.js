const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/real_estate", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"));

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  contact: String,
});

const Property = mongoose.model("Property", propertySchema);

app.post("/api/properties", async (req, res) => {
  try {
    const { title, description, image, contact } = req.body;
    if (!title || !description || !image || !contact) {
      return res.status(400).json({ message: "Incomplete property data" });
    }
    const newProperty = new Property({ title, description, image, contact, reviews: [] });
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/properties", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/properties/:id/review", async (req, res) => {
  const { user, rating, comment } = req.body;
  try {
    const property = await Property.findById(req.params.id);
    property.reviews.push({ user, rating, comment });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/properties/:id", async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted", deletedProperty });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
