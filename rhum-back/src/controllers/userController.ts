import { Request, Response } from "express";
import User from "../models/User";
import { unlink } from "fs";
import { CustomRequest } from "../middlewares/auth";

const bcrypt = require("bcrypt");

export const createUser = async (req: Request, res: Response) => {
  const { email, password, pseudo, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      pseudo,
      role,
    });
    res
      .status(201)
      .json({ message: `User ${user.pseudo} was created successfully` });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.scope("withoutPassword").findAll();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const findUser = async (req: Request, res: Response) => {
  try {
    const user = await User.scope("withoutPassword").findByPk(
      req.body.userInfos.id
    );
    const userFavorites = await user.getBottles();
    res.json({ user, userFavorites });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateUser = async (req: CustomRequest, res: Response) => {
  let hashedPassword: string | undefined;
  if (req.body.password) {
    const password = req.body.password;
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must have a minimum of 6 characters" });
    }
    hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
    console.log(req.userInfos);
    const { email, pseudo } = req.body;
    const [updated] = await User.update(
      {
        email,
        pseudo,
        password: hashedPassword,
      },
      {
        where: { id: req.userInfos.id },
      }
    );
    console.log(updated);

    if (updated) {
      const updatedUser = await User.scope("withoutPassword").findByPk(
        req.userInfos.id
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      if (req.file) {
        if (updatedUser.avatar) {
          await unlink(updatedUser.avatar, (err) => {
            console.error("Error removing old avatar:", err);
          });
        }
        updatedUser.avatar = req.file.path;
        await updatedUser.save();
      }

      return res.json(updatedUser);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    if (req.file) {
      await unlink(req.file.path, (err) => {
        console.error("Error removing uploaded file:", err);
      });
    }
    return res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
};

export const updateUserAdmin = async (req: CustomRequest, res: Response) => {
  let hashedPassword: string | undefined;
  if (req.body.password) {
    const password = req.body.password;
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must have a minimum of 6 characters" });
    }
    hashedPassword = await bcrypt.hash(password, 10);
  }
  try {
    console.log(req.body);
    const { email, pseudo, userId, role } = req.body;
    const [updated] = await User.update(
      {
        email,
        pseudo,
        role,
        password: hashedPassword,
      },
      {
        where: { id: userId },
      }
    );
    if (updated) {
      const updatedUser = await User.scope("withoutPassword").findByPk(userId);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      if (req.file) {
        if (updatedUser.avatar) {
          await unlink(updatedUser.avatar, (err) => {
            console.error("Error removing old avatar:", err);
          });
        }
        updatedUser.avatar = req.file.path;
        await updatedUser.save();
      }

      return res.json(updatedUser);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    if (req.file) {
      await unlink(req.file.path, (err) => {
        console.error("Error removing uploaded file:", err);
      });
    }
    return res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.body.userInfos.id);
    if (user.avatar) {
      await unlink(user.avatar, (err) => {
        if (err) console.log(err);
      });
    }
    await User.destroy({ where: { id: req.body.userInfos.id } });
    res.clearCookie("jwt");
    res.json({ message: "user deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteUserAdmin = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.body.userId);
    if (user.avatar) {
      await unlink(user.avatar, (err) => {
        if (err) console.log(err);
      });
    }
    await User.destroy({ where: { id: req.body.userId } });
    res.json({ message: "user deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
