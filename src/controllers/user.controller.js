const knexQuerry = require('../modelknex/knex')
const {usernew} = require('../models')
const bcrypt = require('bcryptjs')

const create = async (req, res) => {
    try {
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
    catch (error) {
        console.log(error)
        return res.send({
            message: 'error occured',
            data: error
        })
    }
        
}

const login = async (req, res) => {
    try {
        const { username, password} = req.body

        if (!password || !username)  {
            return res.status(400).send({
                message: 'some field must be filled, cannot be empty'
            })
        }

        return res.status(200).send({
            message: 'login sukses'
        })

        const getUser = await usernew.findOne({
            where: {username : username}
        })


    }
    catch (error) {
        console.log(error)
        return res.send({
            message: 'error occured',
            data: error
        })
    }
}

module.exports = {create, login}