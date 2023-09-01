const knexQuerry = require('../modelknex/knex')
const {usernew} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

        
        const getUser = await usernew.findOne({
            where: {username : username}
        })

        if (!getUser) {
            return res.status(404).send({
                message: 'User ' + username +' not Found'
            })
        }

        const isValidPassword = bcrypt.compareSync(password, getUser.dataValues.password)

        

        // !isValidPassword bisa sama dengan isValidPassword == false

        if (!isValidPassword){
            return res.status(404).send({
                message : 'Password atau Username tidak Cocok'
            })
        }

        const token = jwt.sign({
            id : getUser.dataValues.id,
            username : getUser.dataValues.username
        }, process.env.JWT_SECRET, {expiresIn: 240})

        


        return res.status(200).send({
            message : 'login berhasil',
            token : token
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

const update = async (req, res) => {
    try {
        const idUser = req.user.id 

        const {nama_depan, nama_belakang, username} = req.body

        const updateData = await usernew.update({
            firstname: nama_depan,
            lastname : nama_belakang,
            username : username
            
        },
        {where: {id: idUser}}, {new: true}
        ) 

        const data = await usernew.findOne({
            where: {id: idUser}
        })

        
        


        console.log(req.user)
        res.status(201).send({
            message : 'user updated'
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

const deleteUser = async (req, res) => {
    try {

        const idUser = req.user.id 

        const deleteUser = await usernew.destroy({
            where : {id: idUser}
        })
        
        res.status(200).send({
            message: 'your account has been deleted',
            data : deleteUser
        })

    } catch (error) {
        console.log(error)
        return res.send({
            message: 'error occured',
            data: error
        })
    }
}

const uploadPic = async (req, res) => {
    try {
        console.log(req.file)
        
        return res.status(201).send({
            message: 'upload success'

            
        })
    } catch (error) {
        return res.send({
            message: 'error occured',
            data: error
        })
        
    }
}

module.exports = {create, login, update, deleteUser, uploadPic}