const express = require('express')
const {create, login, update, deleteUser, uploadPic} = require("../controllers/user.controller")
const { verifyToken } = require('../middlewares/verifyToken')
const multer = require('multer')



const router = express.Router()

const uploadFotoDir = `${process.cwd()}/upload/image`
const uploadDocDir = `${process.cwd()}/upload/doc`

const uploadFoto = multer({dest: uploadFotoDir })
const uploadDoc = multer({dest: uploadDocDir })



router.post("/", create)
router.post("/login", login)
router.put("/update", verifyToken ,update)
router.delete("/delete", verifyToken, deleteUser)

router.post("/uploadfoto", verifyToken, uploadFoto.single('profilepic'), uploadPic)


module.exports = router