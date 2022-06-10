const { Router } = require('express')
const { check } = require('express-validator')
const { getUsersController, postUsersController, putUsersController, deleteUsersController } = require('../controllers/users')
const { fieldsValidation } = require('../midlewares/fields-validation')
const { isAvalidRole, validateEmailOnDb, isUserById } = require('../helpers/db-validators')

const router = Router()

router.get('/', getUsersController)

router.put('/:id', [
    check('id', 'Parameter is not a valid id').isMongoId(),
    check('id').custom( isUserById ),
    fieldsValidation,
], putUsersController)

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required and should have at least 6 letters').isLength({ min: 6 }),
    check('email', 'Email is required').isEmail(),
    check('email').custom( validateEmailOnDb ),
    // check('role', 'Is not allowed role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isAvalidRole ),
    fieldsValidation
], postUsersController)

router.delete('/:id', [
    check('id', 'Parameter is not a valid id').isMongoId(),
    check('id').custom( isUserById ),
    fieldsValidation,
], deleteUsersController)


module.exports = router