const express = require("express")
const router = express.Router()
const typeController = require("../controllers/TypeController")
const verifyJWT=require("../middelware/verifyJWT")
const verifyAdmin=require("../middelware/verifyAdmin")

router.use(verifyJWT)
// router.use(verifyAdmin)

router.get("/",typeController.getAllTypes)
router.get("/:_id",verifyAdmin,typeController.getTypeById)
router.post("/",verifyAdmin,typeController.creatType)
router.put("/",verifyAdmin,typeController.updateType)
router.delete("/",verifyAdmin,typeController.deleteType)
module.exports=router