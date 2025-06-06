import { Request, Response } from "express";

exports.index = (req: Request, response: Response) => {
  response.json({
    message: "Welcome to BakeAPI!",
    documentation: "/api-docs",
  });
};
