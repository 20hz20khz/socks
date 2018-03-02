var framesPerSecond = 20;
var username = "foo";
var platArray = [];
var heroDictionary = {};
let coinArray = [];
//let heroArray = [];
let score=0;
let img1;
let img2;
let brickpic;
let gridHeight;
let brickWidth;
var myHero;
let gravity =.2;
let coinSineCount=0;
let width = 1000;
let height = 600;

function preload(){
  brickpic = loadImage('https://cdn.glitch.com/e3090096-8c2e-4fe1-b543-08d827467d32%2Fbrick.jpg?1512020822398');
  img1 = loadImage('https://cdn.glitch.com/e3090096-8c2e-4fe1-b543-08d827467d32%2Foctocat02.png?1510604313602');
  img2 = loadImage('https://cdn.glitch.com/e3090096-8c2e-4fe1-b543-08d827467d32%2Foctocat01.png?1510604310548');
}

function setup(){
  //createCanvas(windowWidth,windowHeight);
  //var myCanvas = createCanvas(windowWidth-20,windowHeight-20);
  var myCanvas = createCanvas(1000,600);
  myCanvas.parent("canvasContainer");
  gridHeight = int(height / 40);
  brickWidth = int(width / 40);
  //makeNewPlatforms();
  myHero = new Hero(0,0,10,username);
  //heroArray.push(new Hero(0,0,10));
}

function draw(){
  background(0);//black
  fill(255);
  textAlign(LEFT);
  text(score,10,10);
  drawAllPlatforms();
  drawAllCoins();
  drawAllHeroes();
  checkForCoinCollision();
  //checkForEnemyCollision();
  myHero.show();
  myHero.move();
  controlMyHero();
  coinSineCount+=0.1;
}


function checkForCoinCollision(){
  for (var i=coinArray.length-1;i>=0;i--){
    if(dist(coinArray[i].x,coinArray[i].y,myHero.x,myHero.y) < 12){
      coinArray.splice(i,1);
      score++;
      if (coinArray.length <= 0){
        // next level
        break
      }
    }
  }
}
// function checkForEnemyCollision(){
//   for (var i=enemyArray.length-1;i>=0;i--){
//     if(dist(enemyArray[i].x,enemyArray[i].y,myHero.x,myHero.y) < 12){
//       //coinArray.splice(i,1);
//       if(score>0)
//         coinArray.push(new Coin(myHero.x,myHero.y-80));
//       score--;
//       myHero.y+=33;
//     }
//   }
// }

function drawAllPlatforms(){
  for (var i=0;i<platArray.length;i++){
    platArray[i].show();
  }
}
function drawAllCoins(){
  for (var i=0;i<coinArray.length;i++){
    coinArray[i].show();
  }
}
function drawAllHeroes(){
  // for (var i=0;i<heroArray.length;i++){
  //   heroArray[i].show();
  //   heroArray[i].move();
  // }
  // let i;
  // for (i in heroDictionary){
  //   let tempHero = heroDictionary[i];
  //   tempHero.show();
  //   tempHero.move();
  //}
  for (var i in heroDictionary) {
    if (heroDictionary.hasOwnProperty(i)) {
      //console.log(typeof heroDictionary[i]);
      //console.log(heroDictionary[i]);
      //console.log("heroDictionary[i] instanceof Hero???");
      //console.log(heroDictionary[i] instanceof Hero);
      heroDictionary[i].show();
      heroDictionary[i].move();
    }
}
}

// function makeNewPlatforms(){
//   platArray = [];
//   coinArray = [];
//   // enemyArray = [];
//   for(let i=0;i<10;i++){
//     let platX = random(0,width-20);
//     let platY = floor(random(3,gridHeight))*40;
//     let platW = floor(random(2,brickWidth))*20;
//     platArray.push(new Platform(platX,platY,platW));
//     // if(i%1==0){
//     //   enemyArray.push(new Enemy(platX+(platW/2),platY-10));
//     // }
//     if(i%4==0){
//       coinArray.push(new Coin(platX+(platW/2),platY-80));
//     }
//   }
//   //make ladders
//   let ladderX = random(0,width*.33-20);
//   for(let j=floor(random(1,gridHeight/2))*40;j<height;j+=40){
//     platArray.push(new Platform(ladderX,j,20));
//   }
//   ladderX = random(width*.33,width*.66-20);
//   for(let j=floor(random(1,gridHeight/2))*40;j<height;j+=40){
//     platArray.push(new Platform(ladderX,j,20));
//   }
//   ladderX = random(width*.66,width-20);
//   for(let j=floor(random(1,gridHeight/2))*40;j<height;j+=40){
//     platArray.push(new Platform(ladderX,j,20));
//   }
// }
// class Enemy{
//   constructor(x,y){
//     this.x=x;
//     this.y=y;
//     this.speed = random(3.0,3.9);
//   }
//   show(){
//     if (this.touchingPlat() == true){
//       this.x += this.speed;
//     } else {
//       this.speed *= -1;
//       this.x += this.speed;
//     }
//     fill('red');
//     ellipse(this.x,this.y,10,20);
//   }
//   touchingPlat(){
//     let result=false;
//     for (var i=0;i<platArray.length;i++){
//       if (platArray[i].contains(this.x, this.y+12)){
//         result=true;
//         this.y=platArray[i].y-12;
//       }
//     }
//     //console.log("hi");
//     return result;
//   }
// }
class Coin{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
  show(){
    this.y = this.y+sin(coinSineCount)*3;
    fill('yellow');
    ellipse(this.x,this.y,15,15);
  }
}

class Platform{
  constructor(x,y,w){
    this.x=x;
    this.y=y;
    this.width=w;
    this.height=20;
    //this.r = random(255);
    //this.g = random(255);
    //this.b = random(255);
  }
  show(){
    fill(100);
    //rect(this.x, this.y, this.width, this.height);
    //tint(this.r,this.g,this.b);
    for(let i=0;i<floor(this.width/20);i++){
      image(brickpic,this.x+(i*20),this.y);
    }
  }
  contains(_mousex,_mousey){
    if (_mousex >= this.x && _mousex <= this.x+this.width && _mousey >= this.y && _mousey <= this.y+this.height){
      return true;
    } else {
      return false;
    }
  }
}

class Hero{
  constructor(x,y,w,name){
    this.x=x;
    this.y=y;
    this.width=w;
    this.name=name;
    this.height=20;
    this.velocityx=0;
    this.velocityy=0;
    this.img1=img1;
    this.img2=img2;
	//this.img1 = loadImage("https://cdn.glitch.com/e3090096-8c2e-4fe1-b543-08d827467d32%2Foctocat02.png?1510604313602");  // Load the image
	//this.img2 = loadImage("https://cdn.glitch.com/e3090096-8c2e-4fe1-b543-08d827467d32%2Foctocat01.png?1510604310548");  // Load the image
	this.heroimg = this.img2;
	this.imgcounter = 0;
  }
  show(){
    fill(255);
    //ellipse(this.x, this.y, this.width, this.height);
    textAlign(CENTER);
    text(this.name, this.x, this.y-30);
	  image(this.heroimg, this.x-15, this.y-15, this.img2.width, this.img2.height);
  }
  move(){
    if (this.x<0){
      this.x=width-1;
    }else if (this.x>width){
      //score++;
      //makeNewPlatforms();
      //this.x=0;
      //this.y-=10;
      this.x=1;
    }else if (this.y>height){
      //score--;
      //makeNewPlatforms();
      //this.x=0;
      this.y=0;
      this.velocityy=0;
    }
    
    if (this.touchingPlat()){
		// standing on a platform
      this.velocityy=0;
//       if (!keyIsDown(UP_ARROW) && !keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)){
//         //standing still
//         return
//       }else if (keyIsDown(UP_ARROW)){
//         this.velocityy = -5;
//         this.y+=this.velocityy;
        
//       }
//   	  this.imgcounter++;
//   	  if (this.imgcounter>20){
//   		  this.imgcounter=0;
//   		  if (this.heroimg == this.img2){
//   			  this.heroimg = this.img1;
//   		  } else {
//   			  this.heroimg = this.img2;
//   		  }
//   	  }
    }else{
		// in the air
      this.velocityy+=gravity;
      this.y+=this.velocityy;
    }
//     if (keyIsDown(LEFT_ARROW))
//       this.x-=5;
      
//     if (keyIsDown(RIGHT_ARROW))
//       this.x+=5;
      

    
  }
  touchingPlat(){
    //let result=false;
    for (var i=0;i<platArray.length;i++){
      if (platArray[i].contains(this.x, this.y+12)){
        this.y=platArray[i].y-12; // move hero to top of plat
		return true;
      }
    }
    //console.log("hi");
    //return result;
	return false;
  }
}

// controls for myHero
function keyPressed(){
  if (keyIsDown(DOWN_ARROW))
    myHero.y+=21;
}
function controlMyHero(){
  if (myHero.touchingPlat()){
		// standing on a platform
      myHero.velocityy=0;
      if (!keyIsDown(UP_ARROW) && !keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && !keyIsDown(32)){
        //standing still
        return
      }else if (keyIsDown(UP_ARROW) || keyIsDown(32)){
        myHero.velocityy = -5;
        myHero.y+=myHero.velocityy;
        
      }
  	  myHero.imgcounter++;
  	  if (myHero.imgcounter>20){
  		  myHero.imgcounter=0;
  		  if (myHero.heroimg == myHero.img2){
  			  myHero.heroimg = myHero.img1;
  		  } else {
  			  myHero.heroimg = myHero.img2;
  		  }
  	  }
    }else{
		// in the air
      myHero.velocityy+=gravity;
      myHero.y+=myHero.velocityy;
    }
    if (keyIsDown(LEFT_ARROW))
      myHero.x-=5;
      
    if (keyIsDown(RIGHT_ARROW))
      myHero.x+=5;
}

$(function() {
  var FADE_TIME = 150; // ms
  //var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  // Initialize variables
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  //var $messages = $('.messages'); // Messages area
  //var $inputMessage = $('.inputMessage'); // Input message input box

  var $loginPage = $('.login.page'); // The login page
  //var $chatPage = $('.chat.page'); // The chatroom page
  var $gamePage = $('.game.page'); // The game page
   var $textAlert = $('.textAlerts'); // The heading

  // Prompt for setting a username
  var username;
  var connected = false;
  //var typing = false;
  //var lastTypingTime;
  var $currentInput = $usernameInput.focus();

  var socket = io();
  


  function addParticipantsMessage (data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "there is 1 participant";
      // Tell the server you want a new game
      //socket.emit('new game', platArray);
    } else {
      message += "there are " + data.numUsers + " participants";
    }
    //console.log(message);
    $textAlert.text(message);
    socket.emit('get plats', platArray);
    
  }

  // Sets the client's username
  function setUsername () {
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
      
      $loginPage.fadeOut();
      $gamePage.show();
      $loginPage.off('click');
      //$currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit('add user', username);
      //console.log(username);
      myHero.name = username;
    }
  }

  // Sends a chat message
  function sendMessage (message) {
    //var message = $inputMessage.val();
    // Prevent markup from being injected into the message
    //message = cleanInput(message);
    // if there is a non-empty message and a socket connection
    // if (message && connected) {
    //   $inputMessage.val('');
    //   addChatMessage({
    //     username: username,
    //     message: message
    //   });
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message);
      //console.log(message);
    //}
  }


  // Prevents input from having injected markup
  function cleanInput (input) {
    return $('<div/>').text(input).text();
  }



  // Gets the color of a username through our hash function
  function getUsernameColor (username) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  // Keyboard events
  var anyPressed = false;
  $window.keydown(function(event) {
    //console.log("keydown event")
    if (typeof username !== 'undefined') {
      if (36 < event.which < 41 || event.which === 32)
        anyPressed = true;
    } else if (event.which === 13) {// When the client hits ENTER on their keyboard
      
      if (username) {
        // sendMessage();
        // socket.emit('stop typing');
        //typing = false;
      } else {
        setUsername();
      }
    }
  }).keyup(function(event) {
    if (36 < event.which < 41 || event.which === 32) { // ctrl
      anyPressed = false;
    }
  });
  function sendLocation(){
    if (typeof username !== 'undefined' && anyPressed) {
      //console.log("movement event")
      sendMessage (myHero);
    }
  }
  setInterval(sendLocation,1000/framesPerSecond);
  
//       if (36 < event.which < 41 || event.which === 32) {
//         while(anyPressed){
//           console.log("movement event")
//           sendMessage (myHero);
  
//   $window.keydown(function (event) {
//     console.log("keydown event")
//     if (typeof username !== 'undefined') {
//       if (36 < event.which < 41 || event.which === 32) {
//         while(anyPressed){
//           console.log("movement event")
//           sendMessage (myHero);
//         }
//       }
//       // // Auto-focus the current input when a key is typed
//       // if (!(event.ctrlKey || event.metaKey || event.altKey)) {
//       //   $currentInput.focus();
//       // }
//     } else if (event.which === 13) {// When the client hits ENTER on their keyboard
      
//       if (username) {
//         // sendMessage();
//         // socket.emit('stop typing');
//         //typing = false;
//       } else {
//         setUsername();
//       }
//     }
    
//   });



  // Click events

  // Focus input when clicking anywhere on login page
  $loginPage.click(function () {
    $currentInput.focus();
  });

  
  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on('login', function (data) {
//     console.log("socket on login")
//     console.log(data);
//     console.log(data.numUsers);
//     console.log(data.message);
//     if(!connected){
//       for (var i = 0;i<data.message.length;i++){
//         platArray.push(new Platform(data.message[i].x,data.message[i].y,data.message[i].width));
//       }
      
//     }
    connected = true;
    // Display the welcome message
    // var message = "Welcome to Socket.IO Chat – ";
    // log(message, {
    //   prepend: true
    // });
    //console.log(data);
    addParticipantsMessage(data);
    
  });

    // Whenever the server emits 'plats', log the platarray
  socket.on('plats', function (data) {
    //console.log(data);
    
    for (var i = 0;i<data.message.length;i++){
      platArray.push(new Platform(data.message[i].x,data.message[i].y,data.message[i].width));
    }
    
  });
  
  // Whenever the server emits 'new message', update the chat body
  // This is broadcast and therefore will only be messages from other users
  socket.on('new message', function (data) {
    if (!(data.username in heroDictionary)){ // true if "key" doesn't exist in heroDictionary
      heroDictionary[data.username] = new Hero(0,0,10,data.username);
    }
    heroDictionary[data.username].x = data.message.x;
    heroDictionary[data.username].y = data.message.y;
    heroDictionary[data.username].velocityy = data.message.velocityy;
    heroDictionary[data.username].imgcounter = data.message.imgcounter;
    //console.log(data);
    //addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data) {
    //console.log(data.username + ' joined');
    $textAlert.text(data.username + ' joined');
    if (!(data.username in heroDictionary)){ // true if "key" doesn't exist in heroDictionary
      heroDictionary[data.username] = new Hero(0,0,10,data.username);
      //console.log("heroDictionary[data.username] instanceof Hero???");
      //console.log(heroDictionary[data.username] instanceof Hero);
    }
    //console.log(heroDictionary[data.username]);
    //addParticipantsMessage(data.username + ' joined');
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (data) {
    //console.log(data.username + ' left');
    addParticipantsMessage(data.username + ' left');
    delete heroDictionary[data.username];
    // removeChatTyping(data);
  });

 
});