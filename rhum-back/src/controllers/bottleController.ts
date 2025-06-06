import { Request, Response } from "express";
import Bottle from "../models/Bottle";
import Rating from "../models/Rating";
import { sequelize } from "../services/connectDB";
import Comment from "../models/Comment";
import User from "../models/User";

export const getAllBottles = async (req: Request, res: Response) => {
  try {
    const bottles = await Bottle.findAll();
    res.json({ bottles });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const findBottle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const bottle = await Bottle.findOne({
      where: { id },
      include: [
        {
          model: Rating,
          as: "ratings",
          attributes: [],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment", "userId"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["pseudo", "avatar"],
            },
          ],
        },
      ],
      attributes: {
        include: [
          [sequelize.literal("ROUND(AVG(ratings.rating), 0)"), "avgRating"],
        ],
      },
      group: ["Bottle.id", "comments.id"],
    });
    if (!bottle) {
      return res.status(404).json({ error: "bottle not found" });
    }
    res.json({ bottle });
  } catch (error) {
    res.status(500).json({ error });
  }
};
