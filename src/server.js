import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

// Comment out other routes temporarily
// import authRoutes from "./routes/authRoutes.js";
import landlordRoutes from "./routes/landlordRoutes.js";

// import propertyRoutes from "./routes/propertyRoutes.js";
// import tenantRoutes from "./routes/tenantRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());

// app.use("/api/auth", authRoutes);
app.use("/api/landlords", landlordRoutes);
// app.use("/api/properties", propertyRoutes);
// app.use("/api/tenants", tenantRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
