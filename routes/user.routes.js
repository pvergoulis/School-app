const express= require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const verifyToken = require('../middlewares/auth.middleware').verifyToken

router.get('/', userController.findAll)
router.get('/:username', userController.findOne)
router.post('/register', userController.registerUser)
router.post('/create',verifyToken, userController.createUser)
router.patch('/update/:username',verifyToken, userController.updateUser)
router.delete('/delete/:username',verifyToken,userController.deleteOneUser)



module.exports = router