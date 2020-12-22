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

module.exports = router
