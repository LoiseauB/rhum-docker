import { express } from "../app"
import { login, logout } from "../controllers/authController"
import auth from "../middlewares/auth"

const router = express.Router()

router.post('/login', login)
router.post('/logout', auth, logout)

module.exports = router