const express = require('express')
const router = express.Router()

const Party = require('../models/Party')

router

  .get('/:id', async (req, res) => {
    const { id } = req.params
    const partyRoom = await Party.findById(id)
    res.json(partyRoom)
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params
    await Party.findByIdAndDelete(id)
    res.json()
  })

  module.exports = router
