import { express } from "../app";
import { register } from "../controllers/registerController";
import upload from "../config/uploadConfig";

const router = express.Router();

router.post("/", upload.single("avatar"), register);

module.exports = router;
