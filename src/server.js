const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const PORT = process.env.PORT || 8000;

const server = http.Server(app);
const io = socketio(server)
const connectUsers = {};

io.on('connection',socket =>{
    console.log('user is connected', socket.id)
    const {user} =socket.handshake.query;
    connectUsers[user] = socket.id;
    
});

if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}
//middlewares

app.use((req,res,next)=>{
    req.io = io;
    req.connectUsers = connectUsers;
    return next();
})
app.use(cors())
app.use(express.json())
app.use("/files",express.static(path.resolve(__dirname,"..","files")));
app.use(routes);

try{
    mongoose.connect(process.env.MONGO_DB_CONNECTION,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("mongodb connected");

}catch(error){
    console.log(error)
}

//listen
server.listen(PORT,() => {
    console.log(`Listening on ${PORT}`)
});