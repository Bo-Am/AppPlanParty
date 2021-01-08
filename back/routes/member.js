const express = require('express')
const router = express.Router()

const {User} = require('../models/User')
const Party = require('../models/Party')

router   
    .get('/email/:email',async (req, res) => {
       const {email}  = req.params
        const user = await User.findOne({email})
            .populateventDefault();
            const name = e.target.name;
            fetch("/api/member", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, id }),
            }).then((res) => history.push(`/myparties/${id}`));
          })
    .put('/', async (req, res) => {
        const {email, id} = req.body
        const member = await User.findOne({email})
        const partyMember = await Party.findById(id)
        if (!partyMember.members.includes(member.id)) {
            partyMember.members.push(member)
        }
        if (!member.invite.includes(partyMember._id)) {
            member.invite.push(partyMember._id)
        }
        await partyMember.save()
        await member.save()
        res.status(200)
    })

    .get('/email/:email',async (req, res) => {
       const {email}  = req.params
        const user = await User.findOne({email})
            .populate('invite')
        console.log(user)
        res.json(user.invite)
    })
    .put('/', async (req, res) => {
      const {email, id} = req.body
      const member = await User.findOne({email})
      const tmppartyMember = await Party.findById(id)
      if (!tmppartyMember.members.includes(member.id)) {
        tmppartyMember.members.push(member)
      }
      tmppartyMember.partyRemainder = Math.ceil(+tmppartyMember.partyPrice / (tmppartyMember.members.length === 0 ? 1 : tmppartyMember.members.length));
      await tmppartyMember.save()
      const partyMember = await Party.findById(id).populate('members')
      await member.save()
      res.json(partyMember).status(200)
  })

  .get('/:id', async (req, res) => {
      const {id} = req.params
      const partyMembers = await Party.findById(id)
          .populate('members')
      res.json(partyMembers.members)
  })

  .delete('/', async (req, res) => {
    const userId = req.body.name
    const partyId = req.body.id
    const party = await Party.findById(partyId)
    const member = party.members[party.members.indexOf(userId)]
    const i = party.members.indexOf(userId)
    party.members.splice(i, 1)
    party.partyRemainder = Math.ceil(+party.partyPrice / (party.members.length === 0 ? 1 : party.members.length));
    await party.save()
    const partyMember = await Party.findById(partyId).populate('members')
    res.json(partyMember)
  })

module.exports = router
