// получаем чат на этой ручке
const express = require('express');
const router = express.Router();
const {Chat}  = require('../../models/Chat');
const {User} = require('../../models/User');

router.get('/getChats', async (req, res) => {
  const chats = await Chat.find().populate('sender');
  // if (err) res.status(400).send(err);
  res.status(200).json(chats);
});

module.exports = router;
