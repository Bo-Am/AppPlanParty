const express = require('express')
const router = express.Router()

const Party = require('../models/Party')
const {User} = require('../models/User')

router

  .post('/', async (req, res) => {
    const {
      partyName,
      partyPlace,
      partyDate,
      partyTime,
      partyPrice,
      id
    } = req.body

    const user = await User.findOne({_id: id})
    
    const party = await new Party({
      partyName,
      partyPlace,
      partyDate,
      partyTime,
      partyPrice,
      author: user._id
    })
    await party.save()
    res.status(200).end()
  })

  module.exports = router
