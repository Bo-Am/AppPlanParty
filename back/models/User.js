mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  email:{
    type: String,
    required:true,
    unique: true
  },
  password:{
    type: String,
    required:true,
  },
  avatar:{
    type: String
  },
  date:{
    type: Date,
    default:Date.now
  },
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  invite:[{type: mongoose.Schema.Types.ObjectId, ref: 'party'}]
});

const User = mongoose.model('user', userSchema)

module.exports = {User}

