import { express } from "../app";
import { sendEmail } from "../controllers/emailController";

const router = express.Router();

router.post("/", sendEmail)

module.exports = router;