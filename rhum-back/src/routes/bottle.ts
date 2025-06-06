import { express } from "../app";
import { findBottle, getAllBottles } from "../controllers/bottleController";

const router = express.Router();

router.get("/", getAllBottles);
router.get("/:id", findBottle);

module.exports = router;
