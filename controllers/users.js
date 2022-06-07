
const getUsersController = (req, res) => {

    const { nombre, apikey } = req.query
    res.json({
        msg: "first api",
        nombre,
        apikey,
    })
}

const postUsersController = (req, res) => {
    const { nombre, edad } = req.body

    res.json({
        msg: 'Post Api - controller',
        nombre,
        edad,
    })
}

const putUsersController = (req, res) => {
    const {id} = req.params
    res.json({
        msg: 'Put Users - controller',
        id,
    })
}

module.exports = {
    getUsersController,
    postUsersController,
    putUsersController
}