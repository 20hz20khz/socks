// Setup basic express server 
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static('public'));
app.use(express.static('node_modules/p5/lib'));
app.use(express.static('node_modules/p5/lib/addons'));

// Chatroom 
var maxUsers = 99;
var numUsers = 0;
let width = 1000;
let height = 600;
let gridHeight = (height / 40);
let brickWidth = (width / 40);
function makeNewPlatforms(){
  let newPlatArray = [];
  //coinArray = [];
  // enemyArray = [];
  newPlatArray.push(new Platform(0,Math.floor(Math.random()*gridHeight+3)*40,Math.floor(Math.random()*brickWidth+2)*20));
  for(let i=0;i<10;i++){
    let platX = Math.random()*(width-20);
    let platY = Math.floor(Math.random()*gridHeight+3)*40;
    let platW = Math.floor(Math.random()*brickWidth+2)*20;
    newPlatArray.push(new Platform(platX,platY,platW));
    // if(i%1==0){
    //   enemyArray.push(new Enemy(platX+(platW/2),platY-10));
    // }
    // if(i%4==0){
    //   coinArray.push(new Coin(platX+(platW/2),platY-80));
    // }
  }
  //make ladders
  let ladderX = Math.random()*width*.33-20;
  for(let j=Math.floor(Math.random()*gridHeight/2+1)*40;j<height;j+=40){
    newPlatArray.push(new Platform(ladderX,j,20));
  }
  ladderX = Math.random()*width*.33+width*.33-20;
  for(let j=Math.floor(Math.random()*gridHeight/2+1)*40;j<height;j+=40){
    newPlatArray.push(new Platform(ladderX,j,20));
  }
  ladderX = Math.random()*width+width*.66-20;
  for(let j=Math.floor(Math.random()*gridHeight/2+1)*40;j<height;j+=40){
    newPlatArray.push(new Platform(ladderX,j,20));
  }
  return newPlatArray;
}
class Platform{
  constructor(x,y,w){
    this.x=x;
    this.y=y;
    this.width=w;
    this.height=20;
  }
}
var platArray = makeNewPlatforms();
function getPlats(){
  return platArray
}

io.on('connection', function (socket) {
  //var platArray = makeNewPlatforms();
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    console.log(data);
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
  
  // when the client emits 'get plats', this listens and executes
  socket.on('get plats', function (platArray) {
    platArray = getPlats();
    console.log(platArray);
    // platArray = makeNewPlatforms();
    // we tell the clients to execute 'plats'
    socket.emit('plats', {
      message: platArray 
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (numUsers > maxUsers) return;
    console.log(username);
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    // emit to ALL including the new user. emit to ALL including the new user. emit to ALL including the new user.
    socket.emit('login', {
      numUsers: numUsers
    });
    
    // echo globally (all clients) that a person has connected
    // socket.broadcast.emit is only sent to old users not the new user
    socket.broadcast.emit('user joined', {
    //socket.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
    console.log(socket.username);
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});