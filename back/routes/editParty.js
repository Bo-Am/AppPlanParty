const express = require('express')
const router = express.Router()

const Party = require('../models/Party')


router

  .get('/:id', async (req, res) => {
    const { id } = req.params
    const party = await Party.findById(id)
    res.json(party)
  })

  .put('/:id', async (req, res) => {
    const { id } = req.params
    const {
      partyName,
      partyPlace,
      partyDate,
      partyTime,
      partyPrice,
    } = req.body

    const party = await Party.findById(id)
    party.partyName = partyName;
    party.partyPlace = partyPlace;
    party.partyDate = partyDate;
    party.partyTime = partyTime;
    party.partyPrice = partyPrice

    await party.save()
    res.status(200).end()
  })

  module.exports = router
