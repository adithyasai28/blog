const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")

const PORT = process.env.PORT
const MONGOURL = process.env.MONGOURL

app.use(express.json())
app.use(cors())

const userapi = require("./apis/userapi")
const blogapi = require("./apis/blogapi")
const adminapi = require("./apis/adminapi")

app.use("/userapi",userapi)
app.use("/blogapi",blogapi)
app.use("/adminapi",adminapi)

const mongoclient = require("mongodb").MongoClient

mongoclient.connect(MONGOURL)
.then((client) => {
    const db = client.db("blogapp")
    const usercollection = db.collection("usercollection")
    const blogcollection = db.collection("blogcollection")
    app.set("usercollection",usercollection)
    app.set("blogcollection",blogcollection)
    
    console.log("mongo connected")
})
.catch((err) => {
    console.log("Mongo connection error")
})

app.use((req,res,err) => {
    res.send({errmessage : err})
})
app.listen(() => {
    console.log(`server started ${PORT}`)
})