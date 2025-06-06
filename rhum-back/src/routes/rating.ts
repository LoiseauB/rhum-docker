import { express } from "../app";
import { addRate, deleteRate, getRate } from "../controllers/ratingController";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/:bottleId", auth, getRate)
router.post("/", auth, addRate);
router.delete("/:bottleId", auth, deleteRate);

module.exports = router;
