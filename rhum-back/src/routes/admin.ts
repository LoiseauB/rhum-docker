import { express } from "../app";
import upload from "../config/uploadConfig";
import { deleteCommentAdmin, getAllComments } from "../controllers/commentController";
import { createUser, deleteUserAdmin, getAllUser, updateUserAdmin } from "../controllers/userController";
import auth from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

const router = express.Router();

router.get("/users", auth, isAdmin, getAllUser)
router.post("/users", auth, isAdmin, createUser)
router.put("/users", auth, isAdmin, upload.single("avatar"), updateUserAdmin)
router.delete("/users", auth, isAdmin, deleteUserAdmin)

router.get("/comments", auth, isAdmin, getAllComments)
router.delete("/comments", auth, isAdmin, deleteCommentAdmin)

module.exports = router;