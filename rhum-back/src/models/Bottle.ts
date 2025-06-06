import { DataTypes } from "sequelize";
import { sequelize } from "../services/connectDB";
import Category from "./Category";

const Bottle = sequelize.define(
  "Bottle",
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
    description: {
      type: DataTypes.STRING,
      field: "description",
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      field: "country",
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      },
      field: 'category_id'
    }
  },
  {
    tableName: "bottles",
  }
);

Category.hasMany(Bottle, {
  foreignKey: 'categoryId',
  as: 'bottles'
});

Bottle.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
})

export default Bottle;
