const express = require('express')
const router = express.Router()

const Party = require('../models/Party')
const User = require('../models/User')

router

  .get('/:id', async (req, res) => {
    const { id } = req.params
    const parties = await Party.find({author: id})
    res.json(parties)
  })

  module.exports = router
