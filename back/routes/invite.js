const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Party = require('../models/Party')


router
    .put('/', (req,res) => {
        console.log('123')
        console.log(email)
    })
    .delete('/:id', (req, res) => {
        const {id} = req.params
        console.log(id)
    })

module.exports = router
