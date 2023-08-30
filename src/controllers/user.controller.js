const knexQuerry = require('../models/knex')

const create = async (req, res) => {
    const body = req.body
    

    // data users merujuk ke tabel yg dibuat oleh knex di database mysql
    const insertData = await knexQuerry('users').insert({
        firstName : body.nama_depan,
        lastName : body.nama_belakang,
        email : body.email,
        password : body.password
    })



    return res.status(201).send({
        message : "user created"
    })
        
}

module.exports = {create}