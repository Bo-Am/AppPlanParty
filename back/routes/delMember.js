const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Party = require('../models/Party')


router

  .delete('/', async (req, res) => {
    const userId = req.body.name
    const partyId = req.body.id

    const party = await Party.findById(partyId)

    party.members.forEach(el => {
     const i = party.members.indexOf(userId)
      console.log(i);
      
      return party.members.splice(i, 1)
      
    })
    await party.save()
    console.log(party)
    res.json(party)
  })






module.exports = router
