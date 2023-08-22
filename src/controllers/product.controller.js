const productData = require('../models/mock_data_products.json')

const allProduct = (req, res) => {
    res.send({
        message: 'Data product retrieved',
        status: 'Oke',
        data: productData

        
    })
}

const productById = (req, res) => {
    const params = req.params.id
    console.log(params)

    res.send({
        message: 'Data product retrieved',
        status: 'Oke',

        
    })
}

module.exports = {allProduct, productById}