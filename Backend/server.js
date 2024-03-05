const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")

const PORT = process.env.PORT
const MONGOURL = process.env.MONGOURL

app.use(express.json())
app.use(cors())

const userapi = require("./apis/userapi")
const authorapi = require("./apis/authorapi")
const adminapi = require("./apis/adminapi")

app.use("/userapi",userapi)
app.use("/authorapi",authorapi)
app.use("/adminapi",adminapi)

const mongoclient = require("mongodb").MongoClient

mongoclient.connect(MONGOURL)
.then((client) => {
    const db = client.db("blogapp")
    const usercollection = db.collection("usercollection")
    const authorcollection = db.collection("authorcollection")
    const blogcollection = db.collection("blogcollecion")
    app.set("usercollection",usercollection)
    app.set("blogcollection",blogcollection)
    app.set("authorcollection",authorcollection)
    
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
