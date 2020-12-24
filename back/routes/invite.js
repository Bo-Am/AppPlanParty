const express = require('express')
const router = express.Router()

const {User} = require('../models/User')
const Party = require('../models/Party')


router
    .get('/:email', async (req, res) => {
        const {email}  = req.params
        const user = await User.findOne({email})
            .populate('invite')
        // console.log(user)
        res.json(user.invite)
    })
    .put('/', (req,res) => {
        console.log('123')
        // console.log(email)
    })
    .delete('/:id', async (req, res) => {
        const {id} = req.params
        const user = await User.findById(id)
        // console.log(user.invite)
        const i = user.invite.indexOf(id)
        user.invite.splice(i, 1)
        await user.save()
        res.status(200)
    })

module.exports = router
