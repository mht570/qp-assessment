import config from "config";
import { Router, Request, Response } from "express";
import adminRoutes from "./admin";
import userRoutes from "./user";
import { authenticateUser, authorizeUser } from "../middlwares/auth";
import { UserRole, users } from "../models/user";
import jwt, { Secret } from "jsonwebtoken";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../apiDocs/swagger.json";

const router = Router();

router.use("/admin", authenticateUser, authorizeUser(UserRole.ADMIN), adminRoutes);
router.use("/user", authenticateUser, authorizeUser(UserRole.USER), userRoutes);

//generteToken
router.get("/token", (req: Request, res: Response) => {
  try {
    const user: any = users.find((x) => x.username == req.query.username);
    const secretKey: Secret = config.get("jwt.secertKey");
    const token = jwt.sign({ user }, secretKey, { expiresIn: "24h" });
    res.json({ token });
  } catch (err) {
    console.log(err);
  }
});

//api documentation route
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
