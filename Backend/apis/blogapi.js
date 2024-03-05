const express = require("express")
const blogapi = express.Router()

blogapi.use(express.json())
module.exports = blogapi