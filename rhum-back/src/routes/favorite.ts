import { express } from "../app";
import { addFavorite, deleteFavorite } from "../controllers/favoriteController";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/", auth, addFavorite);
router.delete("/", auth, deleteFavorite);

module.exports = router;
