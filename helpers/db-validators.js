const Role = require('../models/role')
const User = require('../models/user')


const isAvalidRole = async (role) => {
    const isRole = await Role.findOne({ role })
    if (!isRole) {
        throw new Error(`Role ${role} is not defined on DB`)
    }
}

const validateEmailOnDb = async (email) => {
    const isEmailUsed = await User.findOne({ email })
    if (isEmailUsed) {
       throw new Error(`Email ${email} is already used by other user`)
    }
}

const isUserById = async (id) => {
    const userExist = await User.findById(id)
    if(!userExist) {
        throw new Error(`User ${id} does not exist`)
    }
}

module.exports = {
    isAvalidRole,
    validateEmailOnDb,
    isUserById
}