const express = require("express")
const adminapi = express.Router()
adminapi.use(express.json())

module.exports = adminapi