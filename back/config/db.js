const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const tmp = 'mongodb://localhost:27017/partytime'

const connectDB = async()=>{
  try{
    await mongoose.connect(tmp, {
      useNewUrlParser:true,
      useCreateIndex: true,
      useFindAndModify:false
    });

    console.log('Mongoose Connected...')
  }catch(err){
    console.error(err.messagee);
    //Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB;
