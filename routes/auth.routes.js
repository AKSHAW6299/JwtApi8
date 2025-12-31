import express from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logoutUser);

// 🔐 Protected route
// protect => middleware [runs before controller]
// getUserProfile => controller
router.get("/profile", protect, getUserProfile);


router.get(
  "/admin",
  protect,
  authorizeRoles("admin", "superadmin"),
  (req, res) => {
    res.json({ success: true, message: "Admin access" });
  }
);

router.get(
  "/superadmin",
  protect,
  authorizeRoles("superadmin"),
  (req, res) => {
    res.json({ success: true, message: "Super Admin access" });
  }
);

export default router;