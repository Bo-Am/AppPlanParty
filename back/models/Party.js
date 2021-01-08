const mongoose = require('mongoose')
const { Schema } = mongoose

const partySchema = new Schema({
  partyName: {type: String, required: true},
  partyPlace: {type: String, required: true},
  partyDate: {type: String, required: true},
  partyTime: {type: String, required: true},
  partyPrice: {type: String, required: true},
  partyRemainder: {type: Number, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  chat: [{type: mongoose.Schema.Types.ObjectId, ref: 'chat'}],
})

const Party = mongoose.model('party', partySchema)

module.exports = Party
