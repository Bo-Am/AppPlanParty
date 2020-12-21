const mongoose = require('mongoose')
const { Schema } = mongoose

const partySchema = new Schema({
  partyName: {type: String, required: true},
  partyPlace: {type: String, required: true},
  partyDate: {type: String, required: true},
  partyTime: {type: String, required: true},
  partyPrice: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

const Party = mongoose.model('Party', partySchema)

module.exports = Party
