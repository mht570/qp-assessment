import { Router } from "express";
import adminRoutes from "./admin";
import userRoutes from "./user";
import { authenticateUser, authorizeUser } from "../middlwares/auth";
import { UserRole } from "../models/user";

const router = Router();

router.use("/admin", authenticateUser, authorizeUser(UserRole.ADMIN), adminRoutes);
router.use("/user", authenticateUser, authorizeUser(UserRole.USER), userRoutes);

export default router;
