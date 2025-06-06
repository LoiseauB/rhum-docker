import { express } from "../app"

const router = express.Router()
const defaultController = require('../controllers/defaultController')

router.get('/', defaultController.index)

module.exports = router