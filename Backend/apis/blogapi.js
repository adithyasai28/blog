const express=require('express')
const expressAsyncHandler = require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const authorapi=exp.Router()


let authorscollection
let articlescollection
authorapi.use((req,res,next)=>{
    authorscollection=req.app.get('authorscollection')
    articlescollection=req.app.get("articlescollection")
    next()
})

authorapi.post('/user',expressAsyncHandler(async(req,res)=>{
    const newUser=req.body
    const dbuser=await authorscollection.findOne({username:newUser.username})
    if(dbuser!==null){
        res.send({message:"User Existed"})
    }else{
        const hashedPassword=await bcryptjs.hash(newUser.password,6)
        newUser.password=hashedPassword
        await authorscollection.insertOne(newUser)
        res.send({message:"Author Created"})
    }
}))

authorapi.post('/login',expressAsyncHandler(async(req,res)=>{
    const userCred=req.body;
    const dbuser=await authorscollection.findOne({username:userCred.username})
    if(dbuser===null){
        res.send({message:"Invalid Username"})
    }else{
        const status=await bcryptjs.compare(userCred.password,dbuser.password)
        if(status===false){
            res.send({message:"Invalid Password"})
        }else{
            const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:20})
            res.send({message:"Login Success",token:signedToken,user:dbuser})
        }
    }
}))

authorapi.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const newArticle=req.body
    await articlescollection.insertOne(newArticle)
    res.send({message:"New article created"})
})) 

authorapi.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const modifiedArticle=req.body
    await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    res.send({message:"Article modified"})
}))

authorapi.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    const articleIdFromUrl=req.params.articleId
    const articleToDelete=req.body
    await articlescollection.updateOne({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:false}})
    res.send({message:"Article removed"})
}))

authorapi.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    const authorName=req.params.username 
    const articlesList=await articlescollection.find({status:true,username:authorName}).toArray()
    res.send({message:"List of articles",payload:articlesList})
}))

module.exports=authorapi
