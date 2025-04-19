const express = require('express')
const router = express.Router()

const teacherController = require('../controllers/teacher.controller')

router.get('/', teacherController.findAllTeachers)
router.get('/:vat', teacherController.findTeacherByVat)
router.get('/email/:email',teacherController.findTeacherByEmail)
router.get('/firstname/:firstname', teacherController.findTeacherByFirstname)
router.post('/create', teacherController.createTeacher)
router.patch('/update/:vat',teacherController.updateTeacher)
router.delete('/delete/vat/:vat',teacherController.deleteTeacherByVat)
router.delete('/delete/email/:email',teacherController.deleteTeacherByEmail)



module.exports= router