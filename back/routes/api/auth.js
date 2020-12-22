const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator/check')
const config = require('config')
const bcrypt = require('bcryptjs')


const {User} = require('../../models/User')

//@route  GET api/auth
//@desc   Test route
//@acess  Public
router.get('/', auth, async (req,res)=> {
  try{
    const user = await User.findById(req.user.id).select('-password');

    // localStorage.setItem('userName', JSON.stringify(user))
    // const raw = localStorage.getItem('userName')
    // const user1 = JSON.parse(raw)
    // console.log(user1)
    res.json(user)
  }catch(err){
    console.error(err.message)
    res.status(500).send('Server error')
  }
});



//@route  POST api/auth
//@desc   Authenticate user & get token
//@acess  Public
router.post('/', [
  //check validatin form
    check('email', 'Please include a valid email')
    .isEmail(),
    check('password', 'Password is required').exists()
  
  ], async(req,res)=> {
   const errors = validationResult(req)
   if(!errors.isEmpty()){
     return res.status(400).json({errors: errors.array()})
   }
  
   const {email, password} = req.body;
  
  try{
    let user = await User.findOne({email});
    //check user in DB
    if(!user){
      return res.status(400).json({ errors: [{msg:'Invalide Credentials'}] })
    }
  
    //check password
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({ errors: [{msg:'Invalide Credentials'}] })
    }


    const payload = {
      user:{
        id: user.id
      }
    }
  
    jwt.sign(payload, config.get('jwtSecret'),
    {expiresIn:360000},
    (err,token)=>{
      if(err) throw err;
      res.json({token})
    })
  
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error')
  }
  
  });



module.exports = router;
