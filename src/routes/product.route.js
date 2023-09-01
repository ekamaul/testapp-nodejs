const express = require('express')
const {allProduct, productById} = require("../controllers/product.controller")
const {verifyToken} = require('../middlewares/verifyToken')
const { verify } = require('jsonwebtoken')

const router = express.Router()

router.get('/', verifyToken, allProduct)
router.get("/:id", productById)

module.exports = router