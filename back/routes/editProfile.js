const express = require('express');
const Party = require('../models/Party');
const router = express.Router()

const User = require('../models/User')


router

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const profile = await User.findById(id);
    res.json(profile)
  })

  .put('/:id', async(req, res) => {
    const { id } = req.params
    const {
      name,
      email
    } = req.body

    const profile = await User.findById(id)
    profile.name = name
    profile.email = email

    await profile.save()
    res.json()
  })

module.exports = router

