const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const user = require('./routes/user.routes')
const auth = require('./routes/auth.routes')
const teacher = require('./routes/teacher.routes')
const student = require('./routes/student.routes')


app.use(cors())

app.use('/api/users',user)
app.use('/api/auth',auth)
app.use('/api/teachers', teacher)
app.use('/api/students', student)



app.use('/', express.static('files'))

module.exports = app
