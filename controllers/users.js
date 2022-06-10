const { validationResult } = require('express-validator');
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const user = require('../models/user');


const getUsersController = async(req, res) => {

    const query = { state: true}
    const { limit = 5 } = req.query
   
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number(limit))
    ])

    res.json({
        total,
        users
    })
}

const postUsersController = async (req, res) => {

    const { name, email, password, role } = req.body
    const user = new User({name, email, password, role})
    
    //encript password
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    // save on bd
    await user.save()

    res.json({
        msg: 'Post Api - controller',
        name,
        email,
        password,
        role
    })
}

const putUsersController = async(req, res) => {
    const { id } = req.params
    
    const { password, google, ...others } = req.body
    
    // validate data whit database
    if (password) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync()
        others.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, others)

    res.json(user)
}

const deleteUsersController = async (req, res) => {
    const { id } = req.params

    const user = await User.findByIdAndUpdate(id, { state: false })

    res.json({
        user
    })
}

module.exports = {
    getUsersController,
    postUsersController,
    putUsersController,
    deleteUsersController
}