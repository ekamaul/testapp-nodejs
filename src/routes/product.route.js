const express = require('express')
const {allProduct, productById} = require("../controllers/product.controller")

const router = express.Router()

router.get("/", allProduct)
router.get("/:id", productById)

module.exports = router