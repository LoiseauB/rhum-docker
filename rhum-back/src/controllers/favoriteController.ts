import { Request, Response } from "express";
import Favorite from "../models/Favorite";

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { bottleId, userInfos } = req.body;
    await Favorite.create({ BottleId: bottleId, UserId: userInfos.id });
    res.json({ message: `bottle ${bottleId} added to favorite` });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const { bottleId, userInfos } = req.body;
    await Favorite.destroy({
      where: { BottleId: bottleId, UserId: userInfos.id },
    });
    res.json({ message: "favorite deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
