import { RequestHandler } from "express";
import {
  DeleteUserService,
  GetsUserService,
  GetUserService,
  UpdateUserService,
} from "./auth.service";
import { UserRole } from "../../middleware/auth";

export const GetsUserController: RequestHandler = async (req, res) => {
  try {
    const user = await GetsUserService();

    res.status(200).json({
      success: true,
      message: "User data fetch successfully",
      data: user,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetUserController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const isAdmin = user.role === UserRole.ADMIN;

    const users = await GetUserService(
      req.params.id as string,
      isAdmin,
      user?.id,
    );

    res.status(200).json({
      success: true,
      message: "User data fetch successfully",
      data: users,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const UpdateUserController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const isAdmin = user.role === UserRole.ADMIN;

    const users = await UpdateUserService(
      req.params.id as string,
      req.body,
      isAdmin,
      user?.id,
    );

    res.status(200).json({
      success: true,
      message: "User data updated successfully",
      data: users,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const DeleteUserController: RequestHandler = async (req, res) => {
  try {
    const user = await DeleteUserService(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "User data updated successfully",
      data: user,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
