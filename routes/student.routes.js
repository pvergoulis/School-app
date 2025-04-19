const express = require('express')
const router = express.Router()

const studentController = require('../controllers/student.controller')

router.get('/', studentController.findAllStundents)
router.get('/:email', studentController.findOneStundentByEmail)
router.post('/create', studentController.createStudent)
router.patch('/update/:email', studentController.updateStudent)
router.delete('/delete/:email', studentController.deleteStudentByEmail)


module.exports = router