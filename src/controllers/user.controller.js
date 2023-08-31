const knexQuerry = require('../modelknex/knex')
const {usernew} = require('../models')
const bcrypt = require('bcryptjs')

const create = async (req, res) => {
    const {nama_depan, nama_belakang, email,password, username} = req.body
    

    // data users merujuk ke tabel yg dibuat oleh knex di database mysql
    // const insertData = await knexQuerry('users').insert({
    //     firstName : body.nama_depan,
    //     lastName : body.nama_belakang,
    //     email : body.email,
    //     password : body.password
    // })

    if (!nama_depan || !email || !password || !username)  {
        return res.status(400).send({
            message: 'some field must be filled, cannot be empty'
        })
    }

    const hashedPassword = bcrypt.hashSync(password, 8)

    const input = await usernew.create({
        firstname: nama_depan,
        lastname: nama_belakang,
        username : username,
        email : email,
        password : hashedPassword
    })



    return res.status(201).send({
        message : "user created"
    })
        
}

module.exports = {create}