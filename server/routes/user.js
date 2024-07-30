const express = require("express")
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "-" + file.originalname)
  }
})

const upload = multer({ storage: storage })
const router = express.Router()
const userController = require("../controllers/UserController")
const verifyJWT = require("../middelware/verifyJWT")
const verifyAdmin = require("../middelware/verifyAdmin")

router.use(verifyJWT)

router.get("/", userController.getAllUsers)
router.get("/:_id",userController.getUserById)
router.post("/",verifyAdmin, upload.single('image'), userController.creatUser)
router.put("/", upload.single('image'), userController.updateUser)
router.delete("/",verifyAdmin, userController.deleteUser)
module.exports = router