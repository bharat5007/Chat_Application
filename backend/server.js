const express=require("express")
const userroutes=require("./routes/userroutes");
const grouproutes=require("./routes/grouproutes");
const chatroutes=require('./routes/chatroutes')
const connectdb= require("./config/db");
const cors =require("cors")

const app=express();
connectdb();

app.use(express.json());
app.use(cors());

app.use('/api/user',userroutes);
app.use('/api/group',grouproutes);
app.use('/api/chat',chatroutes);

const server=app.listen(8000,()=>console.log("Server Started"));

const io=require('socket.io')(server,{
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    }
})

const userSocketMap = new Map(); 

io.on('connection', (socket) => {
    console.log('connected to socket.io');
  
    socket.on('setup', (userdata) => {
      socket.join(userdata._id);
      userSocketMap.set(userdata._id,socket.id);
      console.log(userSocketMap.get(userdata._id))
      socket.emit('connected');
    });
  
    socket.on('join chat', (room) => {
      socket.join(room);
      console.log('user joined ' + room);
    });
  
    socket.on('new message', (newMessageReceived) => {
      const chat = newMessageReceived;
      socket.to(userSocketMap.get(chat.reciever)).emit('message received', newMessageReceived);
    });
  });