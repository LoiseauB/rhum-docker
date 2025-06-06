import { Request, Response } from "express";
import Comment from "../models/Comment";

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.findAll();
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { bottleId, userInfos, comment } = req.body;
    await Comment.create({ bottleId, userId: userInfos.id, comment });
    res.json({ message: "comment added" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateComments = async (req: Request, res: Response) => {
  try {
    const { bottleId, userInfo, id, comment } = req.body;
    const [updated] = await Comment.update(
      { comment },
      {
        where: { id, bottleId, userId: userInfo.id },
      }
    );
    if (updated) {
      return res.json({ message: "comment updated" });
    }
    res.status(404).json({ error: "comment don't found" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { bottleId, userInfos, id } = req.body;
    await Comment.destroy({
      where: { bottleId, userId: userInfos.id, id },
    });
    res.json({ message: "comment deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteCommentAdmin = async (req: Request, res: Response) => {
  try {
    const { bottleId, userId, id } = req.body;
    await Comment.destroy({
      where: { bottleId, userId, id },
    });
    res.json({ message: "comment deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
