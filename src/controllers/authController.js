import Landlord from "../config/landlord.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST /api/auth/register
export const registerLandlord = async (req, res) => {
  try {
    const { name, email, password, paymentDetails } = req.body;

    // check if landlord exists
    const existing = await Landlord.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create landlord
    const landlord = await Landlord.create({
      name,
      email,
      password: hashedPassword,
      paymentDetails,
    });

    res.status(201).json({ message: "Landlord registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/login
export const loginLandlord = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find landlord
    const landlord = await Landlord.findOne({ email });
    if (!landlord)
      return res.status(400).json({ message: "Invalid credentials" });

    // compare password
    const isMatch = await bcrypt.compare(password, landlord.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // generate token
    const token = jwt.sign(
      { id: landlord._id, role: "landlord" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
