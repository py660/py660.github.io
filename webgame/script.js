
var myGamePiece;
var myObstacle;
var score = -2;
var highscore = 0;
var restart;
var gameover;
var usergravity;
const d = new Date();
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.key == "Escape") {
        alert("ESC pressed!");
    }
    if (evt.key == "Alt"){
        var url = document.getElementById("url").value;
        if (!url){
            url = "about:blank"
        }
        var newWindow = window.open(url, "HIHIHI");
    }
};
function onLoad() {
    console.log("1. Page has loaded.");
    if (d.getMonth() == 1 && d.getDate() == 14){
        document.body.style.background = "pink";
        document.getElementById("score").style.color = "pink";
        document.getElementById("gravitytext").style.color = "pink";
        console.log("> Happy Valentines Day! <")
    }


//START
let x = document.cookie;
console.log(x);
document.cookie = "hi=bye";
document.cookie = "bye=hi111";
function setcookie(name, value, days)
{
  if (days)
  {
    var date = new Date();
    date.setTime(date.getTime()+days*24*60*60*1000); // ) removed
    var expires = "; expires=" + date.toGMTString(); // + added
  }
  else
    var expires = "";
  document.cookie = name+"=" + value+expires + ";path=/"; // + and " added
}
setcookie("hi", "bye", 12345);
let y = document.cookie;
console.log(y);
    
//END
    
}
function startGame() {
    console.log("2. Game initialized.")
    usergravity = parseInt(document.getElementById("gravity").value);
    if (!usergravity){
        usergravity = 5;
    }
    usergravity = Math.max(Math.min(10, usergravity), 1);
    console.log("> Velocity: " + usergravity.toString())
    myGamePiece = new component(30, 30, "red", 10, 120, "player", usergravity);
    myObstacle  = new component(10, 200, "green", 300, 120, usergravity);  
    try{
    document.getElementById("play").remove();
    }
    catch{
        console.error("Cannot get element 'play'; /script.js:696969:6969")
    }
    document.getElementById("score").style.color = "black";
    document.getElementById("gravitytext").innerHTML = "Gravity: " + usergravity.toString();
    document.getElementById("gravitytext").style.color = "black";
    myGameArea.start();}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    console.log("3. Canvas created.");
    console.log("> Listening for keydown and keyup");
    this.canvas.setAttribute("tabindex", "0");
    this.frameNo = 0;
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 25);
    window.addEventListener('keydown', function (e) {
    myGameArea.key = e.keyCode;
    })

    window.addEventListener('keyup', function (e) {
    myGameArea.key = false;
    })
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}


function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}


function component(width, height, color, x, y, type, usergravity) {
    this.width = width;
    this.height = height;
    this.type = type;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = usergravity/2;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.type == "player"){
        this.gravitySpeed += this.gravity;
        this.y += this.speedY + this.gravitySpeed;}
        else{
        this.y += this.speedY;}
        
        this.x += this.speedX;
             
    }    

  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}
function restartGame() {
    //location.reload();
    score = -2;
    document.getElementById("gameovertext").innerHTML = "";
    myGameArea.stop();
    myGameArea.clear();
    myObstacles = [];
    startGame();
    /*
    score=-21;
    for (i = 0; i < myObstacles.length; i += 1) {
    }
    restart = true;
    startGame()*/
}

var myObstacles = [];


function updateGameArea() {
    if (!myGameArea.canvas.matches(":hover")){
        document.getElementById("hovertext").style.color = "red";
        document.getElementById("hovertext").innerHTML = "Move your cursor to the game window to continue.";
        return;
    }
    else{
        myGameArea.canvas.focus();
    }
    if (score > highscore){
        highscore = score;
        document.getElementById("highscore").innerHTML = "Best: " + highscore.toString();
    }

    document.getElementById("hovertext").style.color = "white";
    document.getElementById("hovertext").innerHTML = "You are currently focused on the game window.";
    if (restart == true && gameover!= true){
        console.log(restart, gameover)
        restart = false;
        gameover = false;
    }
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            gameover = true;
            myGameArea.clear()
            document.getElementById("gameovertext").innerHTML = "Game Over.";
            document.getElementById("gameovertext").style.color = "red";
            document.getElementById("score").style.color = "blue";
            document.getElementById("restart").style.color = "green";
            document.getElementById("restart").style.background = "#cccccc";
            return;
        } 
    }
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.key && ((myGameArea.key > 64 && myGameArea.key < 91) || (myGameArea.key > 96 && myGameArea.key < 123))){
        console.log("letter press")
    }
  if (myGameArea.key && (myGameArea.key == 38 || myGameArea.key == 32)) {myGamePiece.speedY = -(usergravity); }

  if (myGamePiece.y < 0){
      myGamePiece.y = 0;
  }
  if (myGamePiece.y > myGameArea.canvas.height - myGamePiece.height){
      myGamePiece.y = myGameArea.canvas.height - myGamePiece.height - 0;
  }
    myGameArea.frameNo += 1;


  if (myGameArea.frameNo == 1 || everyinterval(80 - Math.floor(myGameArea.frameNo / 100))) {
    score += 1;
    x = myGameArea.canvas.width;
    minHeight = 50;
    maxHeight = 170;
    height = (Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight))
    minGap = 70;
    maxGap = 100;
    gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    myObstacles.push(new component(10, height, "green", x, 0));
    myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
  }

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -5 - Math.floor(myGameArea.frameNo / 1000);
        myObstacles[i].update();
    }
    myGamePiece.update();
    if (score < 0){
    document.getElementById("score").innerHTML = "Score: 0";
    }
    else{
    document.getElementById("score").innerHTML = "Score: " + (Math.floor(score)).toString();
    }
}



