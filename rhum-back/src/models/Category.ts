import { DataTypes } from "sequelize";
import { sequelize } from "../services/connectDB";

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      field: "name",
      allowNull: false,
    },
  },
  {
    tableName: "categories",
  }
);

export default Category;
