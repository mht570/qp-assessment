import express, { Request, Response, NextFunction } from "express";
import Config from "config";
import jwt, { Secret } from "jsonwebtoken";
import { UserRole, users } from "../models/user";

// Middleware to authenticate users
export const authenticateUser = (req: any, res: Response, next: NextFunction) => {
  // Check if authorization header is provided
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No authorization header provided" });
  }

  // Extract token from authorization header
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided in authorization header" });
  }

  //Verify JWT token

  try {
    const decodedToken = jwt.verify(token, Config.get("jwt.secretKey")) as { id: string; role: UserRole };

    req.user = users.find((user) => user.id === decodedToken.id);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to authorize user based on role
export const authorizeUser = (requiredRole: UserRole) => {
  return (req: any, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || user.role !== requiredRole) {
      return res.status(403).json({ message: "Access forbidden" });
    }
    next();
  };
};
