const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const {Chat} = require('./models/Chat');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})


//Connect Database
let connect = connectDB();

//init middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// объявляем хранилище, куда подключаем с помощью multer
let storage = multer.diskStorage({
  // destination - это ключ, который указывает, куда сохранять файлы
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  // filename - это ключ, который указывает, как сохранять
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
})
 
let upload = multer({ storage: storage }).single("file");
// добавляем с помощью запроса POST, сначала проверяем, авторизован ли отправитель
app.post("/api/chat/uploadfiles", (req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, url: res.req.file.path });
  })
});
// подключаем socket
io.on("connection", socket => {
  console.log('>>');
  socket.emit("Output Chat Message", 'doc');
  socket.on("Input Chat Message", async(msg) => {
  
      try {
          let chat = new Chat({ message: msg.chatMessage, sender:msg.userId, type: msg.type })

          chat.save((err, doc) => {
            console.log(doc)
            if(err) return res.json({ success: false, err })

            Chat.find({ "_id": doc._id })
            .populate("sender")
            .exec((err, doc)=> {

                return io.emit("Output Chat Message", doc);
            })
          })
      } catch (error) {
        console.error(error);
      }
   })

})

app.get('/', (req, res)=> {
  res.send('API Running...')
})

//Define Rotes
app.use('/api/chat', require('./routes/api/chat'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/newparty', require('./routes/parties'))
app.use('/api/myparties', require('./routes/myParties'))
app.use('/api/partyroom', require('./routes/partyRoom'))
app.use('/api/editparty', require('./routes/editParty'))


const PORT = process.env.PORT || 5000

server.listen(PORT, ()=> console.log(`Server started on ${PORT}`))
