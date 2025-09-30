// src/controllers/landlordController.js
import Landlord from "../config/landlord.js";

// GET /api/landlords/me
export const getMe = async (req, res) => {
  try {
    const landlord = await Landlord.findById(req.user.id).select("-password");
    if (!landlord)
      return res.status(404).json({ message: "Landlord not found" });
    res.json(landlord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
