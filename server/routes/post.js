const express = require("express")
const router = express.Router()
const verifyJWT=require("../middelware/verifyJWT")

const postController = require("../controllers/postController")

router.use(verifyJWT)

router.get("/",postController.getAllPosts)
router.post("/",postController.creatPost)
router.delete("/",postController.deletePost)
module.exports=router