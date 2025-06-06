import { NextFunction, Request, Response } from "express";

export interface CustomRequest extends Request {
  userInfos?: any;
}

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ error: "Access unauthorized" });

  jwt.verify(token, SECRET_KEY, (err: any, tokenDecoded: any) => {
    if (err) return res.status(403).json({ error: "Access forbidden" });
    req.body.userInfos = tokenDecoded;
    req.userInfos = tokenDecoded;
    next();
  });
};

export default auth;
