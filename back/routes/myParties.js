const express = require('express')
const router = express.Router()

const Party = require('../models/Party')

router

  .get('/:id', async (req, res) => {
    const { id } = req.params
    const parties = await Party.find({author: id})
    const members = await Party.find({members: id})
    res.json({parties, members})
  })

  module.exports = router
