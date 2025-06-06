import { users } from "./data/usersData";
import { rumCategories } from "./data/categoriesData";
import { sequelize } from "../services/connectDB";
import User from "../models/User";
import Category from "../models/Category";
import { rumBottles } from "./data/bottlesData";
import Bottle from "../models/Bottle";
import { favorites } from "./data/favoriteData";
import Favorite from "../models/Favorite";
import { ratings } from "./data/ratingsData";
import Rating from "../models/Rating";
import { comments } from "./data/commentsData";
import Comment from "../models/Comment";
const bcrypt = require("bcrypt");

async function loadUsers() {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await User.create({
      email: user.email,
      password: hashedPassword,
      pseudo: user.pseudo,
      role: user.role,
    });
  }
}
async function loadCategories() {
  for (const category of rumCategories) {
    await Category.create({ ...category });
  }
}

async function loadBottles() {
  for (const bottle of rumBottles) {
    await Bottle.create({ ...bottle });
  }
}

async function loadFavorites() {
  for (const like of favorites) {
    await Favorite.create({ ...like });
  }
}

async function loadRatings() {
  for (const rating of ratings) {
    await Rating.create({ ...rating });
  }
}

async function loadComments() {
  for (const comment of comments) {
    await Comment.create({ ...comment });
  }
}

async function loadFixtures() {
  try {
    await sequelize.sync({ force: true });
    await loadUsers();
    await loadCategories();
    await loadBottles();
    await loadFavorites();
    await loadRatings();
    await loadComments();
    console.log("All fixtures loaded successfully");
  } catch (error) {
    console.error("Failed to load fixtures:", error);
  } finally {
    process.exit();
  }
}

loadFixtures();
