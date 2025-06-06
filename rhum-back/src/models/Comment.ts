import { DataTypes } from "sequelize";
import { sequelize } from "../services/connectDB";
import Bottle from "./Bottle";
import User from "./User";

const Comment = sequelize.define(
  'Comment',
  {
    comment: {
      type: DataTypes.STRING,
      field: 'comment',
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      field: "user_id",
    },
    bottleId: {
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
    tableName: "comments",
  }
)
Bottle.hasMany(Comment, {
  foreignKey: 'bottleId',
  as: 'comments'
});

Comment.belongsTo(Bottle, {
  foreignKey: 'bottleId',
  as: 'bottle'
})
User.hasMany(Comment, {
  foreignKey: 'userId',
  as: 'comments'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})

export default Comment;
