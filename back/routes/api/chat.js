// получаем чат на этой ручке
const express = require('express');
const router = express.Router();
const {Chat}  = require('../../models/Chat');
const {User} = require('../../models/User');

router.get('/getChats', async (req, res) => {
  const chats = await Chat.find().populate('sender');
  res.json(chats).status(200);
});

module.exports = router;
