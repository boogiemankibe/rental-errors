// src/routes/propertyRoutes.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createProperty,
  listProperties,
  deleteProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

router.post("/", authMiddleware, createProperty);
router.get("/", authMiddleware, listProperties);
router.delete("/:id", authMiddleware, deleteProperty);

export default router;
