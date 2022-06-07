const { Router } = require('express')
const { getUsersController,  postUsersController, putUsersController } = require('../controllers/users')

const router = Router()

router.get('/', getUsersController)

router.put('/:id', putUsersController)

router.post('/', postUsersController)


module.exports = router