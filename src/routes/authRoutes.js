import express from "express";
import {
  registerLandlord,
  loginLandlord,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerLandlord);
router.post("/login", loginLandlord);

export default router;
