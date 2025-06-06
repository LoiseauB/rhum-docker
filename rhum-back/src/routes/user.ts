import { express } from "../app";
import upload from "../config/uploadConfig";
import { deleteUser, findUser, updateUser } from "../controllers/userController";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", auth, findUser);
router.put("/", auth, upload.single("avatar"), updateUser);
router.delete("/", auth, deleteUser);

module.exports = router;
