const express = require('express')
const router = express.Router()

const {User} = require('../models/User')


router
  
  .put('/', async (req, res) => {
    const { email, id } = req.body
    const friend = await User.findOne({email})
    console.log('>>>>' + friend.id);

    const mainUser = await User.findById(id)
    if(!mainUser.friends.includes(friend.id)){
    mainUser.friends.push(friend.id)
    } 
    await mainUser.save()
    console.log(mainUser);
    res.status(200).json(friend.name)

  })

module.exports = router
