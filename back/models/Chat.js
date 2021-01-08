mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema({
    message: {
        type: String
        },
    room: {
      type: Schema.Types.ObjectId,
        ref: 'party'
  },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
}, { timestamps: true });

const Chat = mongoose.model('chat', chatSchema);
module.exports = {Chat}
 