import { Request, Response } from "express";
import Rating from "../models/Rating";

export const addRate = async (req: Request, res: Response) => {
  try {
    const { bottleId, userInfos, rating } = req.body;
    await Rating.create({ bottleId, userId: userInfos.id, rating });
    res.json({ message: "rate added" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteRate = async (req: Request, res: Response) => {
  try {
    const { bottleId } = req.params;
    const { userInfos } = req.body;
    await Rating.destroy({
      where: { bottleId: bottleId, userId: userInfos.id },
    });
    res.json({ message: "rate deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getRate = async (req: Request, res: Response) => {
  try {
    const { bottleId } = req.params;
    const { userInfos } = req.body;
    const rate = await Rating.findOne({
      where: { bottleId: bottleId, userId: userInfos.id },
    });
    if (!rate) {
      return res.status(404).json({ error: "rate don't found" });
    }
    res.json({ rate });
  } catch (error) {
    res.status(500).json({ error });
  }
};
