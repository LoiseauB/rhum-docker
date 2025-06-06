import { express } from "../app";
import { addComment, deleteComment } from "../controllers/commentController";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/", auth, addComment);
router.put("/", auth, addComment);
router.delete("/", auth, deleteComment);

module.exports = router;