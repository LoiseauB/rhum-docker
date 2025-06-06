import { DataTypes } from "sequelize";
import { sequelize } from "../services/connectDB";
import User from "./User";
import Bottle from "./Bottle";

const Favorite = sequelize.define(
  "Favorite",
  {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      field: "user_id",
    },
    BottleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "bottles",
        key: "id",
      },
      field: "bottle_id",
    },
  },
  {
    tableName: "favorites",
  }
);

User.belongsToMany(Bottle, { through: Favorite });
Bottle.belongsToMany(User, { through: Favorite });

export default Favorite;