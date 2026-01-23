import express from "express";
import {
  DeleteUserController,
  GetsUserController,
  GetUserController,
  UpdateUserController,
} from "./auth.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.get("/user", GetsUserController);
router.get("user/:id", auth(UserRole.ADMIN, UserRole.USER), GetUserController);
router.put(
  "user/:id",
  auth(UserRole.ADMIN, UserRole.USER),
  UpdateUserController,
);
router.delete(
  "user/:id",
  auth(UserRole.ADMIN, UserRole.USER),
  DeleteUserController,
);

export default router;
