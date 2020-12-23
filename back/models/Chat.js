mongoose = require('mongoose');
const Schema = mongoose.Schema;
// создаем модель чата, где указываем само сообщение, отправителя и тип - видео, картинка или текст
const chatSchema = mongoose.Schema({
    message: {
        type: String
        },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user' 
    },
    type: {
        type: String
    },
    party: {
      type: Schema.Types.ObjectId,
        ref: 'party'
  }
}, { timestamps: true });

const Chat = mongoose.model('chat', chatSchema);
module.exports = {Chat}
 