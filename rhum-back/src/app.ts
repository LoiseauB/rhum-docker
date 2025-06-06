import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Express, Router } from "express";
import path from "path";

export const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

export const app: Express = express();

const defaultRoutes: Router = require("./routes/default");
const authRoutes: Router = require("./routes/auth");
const registerRoutes: Router = require("./routes/register");
const userRoutes: Router = require("./routes/user");
const ratingRoutes: Router = require("./routes/rating");
const favoriteRoutes: Router = require("./routes/favorite");
const bottleRoutes: Router = require("./routes/bottle");
const commentRoutes: Router = require("./routes/comment");
const adminRoutes: Router = require("./routes/admin");
const emailRoutes: Router = require("./routes/email");

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());

app.use("/api", defaultRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/bottle", bottleRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/email", emailRoutes);
