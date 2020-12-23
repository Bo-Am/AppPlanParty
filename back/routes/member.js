const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Party = require('../models/Party')



router
  
  .put('/', async (req, res) => {
    const { email, id } = req.body
    const member = await User.findOne({email})
    console.log(member);

    const partyMember = await Party.findById(id)
    if(!partyMember.members.includes(member.id)){
      partyMember.members.push(member)
    } 
    await partyMember.save()
    console.log(partyMember);
    res.status(200)
  })

  .get('/:id', async (req, res) => {
    console.log('fira');
    const { id } = req.params
    const partyMembers = await Party.findById(id)
    .populate('members')
    console.log(partyMembers);
    res.json(partyMembers.members)
  })

 

  .delete('/', async (req, res) => {
    const userId = req.body.name
    const partyId = req.body.id

    const party = await Party.findById(partyId)

    const i = party.members.indexOf(userId)
    party.members.splice(i, 1)
    await party.save()
    console.log(party)
    res.json(party)
  })




module.exports = router

module.exports = router
