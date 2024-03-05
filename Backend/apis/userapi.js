const express = require("express")
const userapi = express.Router()
userapi.use(express.json())

const bcryptjs = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")
const expressAsyncHandler = require("express-async-handler")

userapi.post("/register", expressAsyncHandler(async (req, res) => {

    let usercollection = req.app.get("usercollection")
    let newuser = req.body
    let user = await usercollection.findOne({ username: newuser.username })
    if (!user) {
        let hashedpassword = await bcryptjs.hash(newuser.password, 5)
        newuser.password = hashedpassword
        const dbres = await usercollection.insertOne(newuser)

        if (dbres.acknowledged)
            res.send({ message: "new user added to collection" })
        else
            req.send({ message: "error in inserting into database" })
    }
    else
        res.send({ messaage: "username is alredy taken choose another one ..." })

}));

userapi.post("/signin", expressAsyncHandler(async (req, res) => {
    let usercollection = req.app.get("usercollection")
    let newuser = req.body
    let userDB = await usercollection.findOne({ username: newuser.username })
    if(userDB){
        let status = await bcryptjs.compare(loginuser.password, userDB.password)
        if (!status){
            req.send({ message: "invalid password" })
        }
        else {
            let token = jwt.sign({ username: loginuser.username }, 'abcdef', { expiresIn: "7d"})
            res.send({ message: "login successful", payload: token, user: userDB })
        }
    }
    else
        res.send({ message: "username doesnot exist" })
}));

userapi.get("/allBlogs" , expressAsyncHandler(async(req,res) => {

    const blogcollection = req.app.get("blogcollection")
    const blogFromDB = blogcollection.find().toArray()
    res.send({message : "All blogs" ,payload : blogFromDB})

}))
module.exports = userapi