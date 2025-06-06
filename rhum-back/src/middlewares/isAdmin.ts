import { NextFunction, Request, Response } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { userInfos } = req.body;
  if (userInfos.role === "ADMIN") return next();
  return res.status(403).json({ error: "Access forbidden" });
};

export default isAdmin;
