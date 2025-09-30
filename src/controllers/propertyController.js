// src/controllers/propertyController.js
import Property from "../config/property.js";
// POST /api/properties
export const createProperty = async (req, res) => {
  try {
    const { title, address, rentAmount } = req.body;
    if (!title || !address || !rentAmount) {
      return res
        .status(400)
        .json({ message: "title, address and rentAmount are required" });
    }

    const property = await Property.create({
      title,
      address,
      rentAmount,
      landlord: req.user.id,
    });

    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/properties
export const listProperties = async (req, res) => {
  try {
    const properties = await Property.find({ landlord: req.user.id }).populate(
      "tenants",
      "name email phone"
    );
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/properties/:id
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      landlord: req.user.id,
    });

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // Optional: you might remove or update tenants referencing this property here
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
