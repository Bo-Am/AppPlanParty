const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const {Chat} = require('./models/Chat');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');
const Party = require('./models/Party');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})


//Connect Database
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log("Connection socket");

  socket.on("CONNECT_ROOM", async room  => {
    socket.join(room);
    console.log(`>>>>>>>>> Подключен к ${room}`);
    socket.emit('initMSG',await Chat.find({room}).populate('user'))
    });

  socket.on("NEW_MESSAGE",  async ([ room, message, user]) => {
    socket.to(room).broadcast.emit("NEW_MESSAGE:CLIENT", room, message, user);
    let chat = await new Chat({room, message, user: user._id}).populate('user')
    await chat.save()
  });
  
  socket.on('leaveRoom', (room) =>{
    socket.leave(room);
    console.log('Room leaved')
  })

  socket.on("WRITE_MESSAGE", (room, user) => {
      socket.to(room).broadcast.emit("WRITE_MESSAGE:CLIENT", user);
  });
  
  //Disconnect
  socket.on("disconnect", (socket) => {
    console.log("disconnect socket");
  });
});

app.get('/', (req, res)=> {
  res.send('API Running...')
})

//Define Rotes
app.use('/api/chat', require('./routes/api/chat'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/newparty', require('./routes/parties'))
app.use('/api/myparties', require('./routes/myParties'))
app.use('/api/partyroom', require('./routes/partyRoom'))
app.use('/api/editparty', require('./routes/editParty'))
app.use('/api/editprofile', require('./routes/editProfile'))
app.use('/api/addfriend', require('./routes/addFriend'))
app.use('/api/member', require('./routes/member'))
app.use('/api/invite', require('./routes/invite'))

const PORT = process.env.PORT || 5000

server.listen(PORT, ()=> console.log(`Server started on ${PORT}`))
