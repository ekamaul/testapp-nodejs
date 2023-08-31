const productData = require('../modelknex/mock_data_products.json')

const allProduct = (req, res) => {
    res.send({
        message: 'Data product retrieved',
        status: 'Oke',
        data: productData

        
    })
}

const productById = (req, res) => {
    const params = req.params.id
    const intParams = parseInt(params)
    console.log(intParams)


    if (intParams > 30) {
        res.send({
            message: 'Data Product Not Found !',
            status: 'Error',
            data: null
            
        })

    } 
    else {
        res.send({
            message: 'Data product retrieved',
            status: 'Oke',
            data : productData.products[intParams - 1]
        })

    }

    

    
}

// mengambil object pada json caranya nama/alias json productData.product kemudian ditambah titik dan kemudia object nya

module.exports = {allProduct, productById}