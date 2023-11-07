const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./models/userSchema')

//express
SECRECT_KEY = "hari"
const app = express()

//mongoDB
const URI = "mongodb+srv://h:h@cluster1.q2sily3.mongodb.net/HK?retryWrites=true&w=majority"
mongoose.
connect(URI).then(()=>{
    app.listen(3001,()=>{
        console.log("connected to mongo and 3001")
    })
})
.catch((error)=>{
    console.log(error)
})


//middleware

app.use(bodyParser.json())
app.use(cors())

//routes

app.post('/register',async(req,res)=>{
    try{
    const{email,username,password,confirmPassword,Department,hostel} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new User({email,username,password:hashedPassword,confirmPassword,Department,hostel})
    await newUser.save()
    res.status(201).json({message : 'register sucessful'})
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'error try again'})
    } 
})

app.get('/register',async(req,res)=>{
    try{
    const users = await User.find()
    res.status(201).json(users)
    }
    catch{
        res.status(500).json({error: 'error try again'})
    }
})

app.post('/login',async(req,res)=>{
    try
    {
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user)
    {
        return res.status(401).json({error: 'invalid credentials'})
    } 
    const passwordValid = await bcrypt.compare(password,user.password)
    if(!passwordValid)
    {
        return res.status(401).json({error: 'invalid credentials'})
    }
    const token = jwt.sign({userId : user._id}, SECRECT_KEY,{expiresIn:'1hr'})
    res.json({message: 'Login Successfull'})
     }
     catch(error){
        console.log(error)
        res.status(500).json({error: 'Login Failed'})
     }

})