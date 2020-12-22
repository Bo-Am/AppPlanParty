const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')


const app = express()

//Connect Database
connectDB();

//init middleware
app.use(express.json({ extended:false }))
app.use(cors())

app.get('/', (req, res)=> {
  res.send('API Running...')
})

//Define Rotes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/newparty', require('./routes/parties'))
app.use('/api/myparties', require('./routes/myParties'))
app.use('/api/partyroom', require('./routes/partyRoom'))
app.use('/api/editparty', require('./routes/editParty'))
app.use('/api/editprofile', require('./routes/editProfile'))
app.use('/api/addfriend', require('./routes/addFriend'))
app.use('/api/addmember', require('./routes/addMember'))
app.use('/api/delmember', require('./routes/delMember'))






const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Server started on ${PORT}`))
