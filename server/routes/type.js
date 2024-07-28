const express = require("express")
const router = express.Router()
const typeController = require("../controllers/TypeController")
const verifyJWT=require("../middelware/verifyJWT")
// const verifyAdmin=require("../middelware/verifyAdmin")

router.use(verifyJWT)
// router.use(verifyAdmin)

router.get("/",typeController.getAllTypes)
router.get("/:_id",typeController.getTypeById)
router.post("/",typeController.creatType)
router.put("/",typeController.updateType)
router.delete("/",typeController.deleteType)
module.exports=router