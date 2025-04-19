const User = require('../models/user.model')
const bcrypt = require('bcrypt')


exports.findAll = async(req,res)=>{
    console.log('Finding all users')

    try {
        const result = await User.find()
        res.status(200).json({status : true,data : result})
    } catch (error) {
        console.log('Problem in finding all users', error)
        res.status(400).json({status:false, data: error})
    }
}

exports.findOne = async(req,res)=>{
    let username = req.body.username
    console.log('Finding a spesific user')

    try {
        const result = await User.findOne({username: username})
        res.status(200).json({status: true, data: result})
    } catch (error) {
        console.log('Error in find a spesific user', error)
        res.status(400).json({status: false, data: error})
    }
}


exports.createUser = async(req,res)=>{
    console.log('Creating a new user')
    let data = req.body

    const saltOrRounds = 10
    const hashPassword = await bcrypt.hash(data.password, saltOrRounds)

    const newUser = new User({
        username: data.username,
        email: data.email,
        password: hashPassword,
        role: data.role
    })

    try {
       const result = await newUser.save()
       res.status(200).json({status:true, data:result})
    } catch (error) {
        console.log('Error in creating a new user', error)
        res.status(400).json({status: false, data: error})
        
    }
}

exports.registerUser = async(req,res)=>{
    console.log('Creating a new user')
    let data = req.body

    const saltOrRounds = 10
    const hashPassword = await bcrypt.hash(data.password, saltOrRounds)

    const newUser = new User({
        username: data.username,
        email: data.email,
        password: hashPassword,
       
    })

    try {
       const result = await newUser.save()
       res.status(200).json({status:true, data:result})
    } catch (error) {
        console.log('Error in creating a new user', error)
        res.status(400).json({status: false, data: error})
        
    }
}



exports.updateUser = async(req,res)=>{
    console.log('Updating a user')
    const username = req.body.username

    const updatedUser = req.body

    try {
        const result = await User.findOneAndUpdate({username: username}, updatedUser, {new: true})
        res.status(200).json({status:true, data:result})
    } catch (error) {
        console.log('Error in updating a user', error)
        res.status(400).json({status: false, data: error})
    }

}


exports.deleteOneUser = async(req,res)=>{
    console.log('Deleting a user')
    const username = req.params.username

    try {
        const result = await User.findOneAndDelete({username: username})
        res.status(200).json({status:true, data:result})
    } catch (error) {
        console.log('Error in deleting a user', error)
        res.status(400).json({status: false, data: error})
    }

}

