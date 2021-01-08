const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Party = require('../models/Party')


router
    .put('/', (req,res) => {
    })
    .delete('/:id', (req, res) => {
        const {id} = req.params
    })

module.exports = router
