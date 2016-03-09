//adds the html stuff variables
var p = document.getElementById("playground");
var stop = document.getElementById("stop");
var ctx = p.getContext("2d");
var start = document.getElementById("start");

var canvas_size = p.getAttribute('height');

//style of canvas
ctx.fillStyle = "#000000";
ctx.strokeStyle = "#000000";

//x and y coordinates of dvd
var x = 0;
var y = 0;

//x and y velocities of dvd
var velx = 0;
var vely = 0;

//variable for animation frame
var anim = 0;
var inc = 0.3;
var dojocat = new Image();
dojocat.src = "dojocat.png";

var doge = new Image();
doge.src = "doge.png"

var image_size = 70;
var collision_radius = image_size / 2;

function Doge(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
}

var dogeList = new Array();
//dogeList.push(new Doge(x, y, dx, dy));
//
function levelUp() {
    dogeList.push(new Doge(Math.random() * canvas_size,
                           Math.random() * canvas_size,
                           Math.random() * 3,
                           Math.random() * 3));
}

//clear canvas

function stopCanvas(){
    cancelAnimationFrame(anim);
}

//left = 37 up = 38 right = 39 down = 40
function ctrlpuck(e){
    if (e.keyCode == 39)
        velx += inc ;
    if (e.keyCode == 37) 
        velx -= inc;
    if (e.keyCode == 38) 
        vely -= inc;
    if (e.keyCode == 40) 
        vely += inc;
}

function everySec(e){
    ctx.clearRect(0,0,canvas_size,canvas_size);
    ctx.beginPath();
    ctx.drawImage(dojocat, x, y, image_size, image_size);
    ctx.closePath();
    ctx.stroke();
    if ((x >= (canvas_size - image_size) && velx > 0) || (x <= 0 && velx < 0)) velx = -velx;
    if ((y >= (canvas_size - image_size) && vely > 0) || (y <= 0 && vely < 0)) vely = -vely
    x += velx;
    y += vely;
    anim = requestAnimationFrame(everySec);
}

document.addEventListener("keydown", ctrlpuck);
start.addEventListener("click", everySec);
stop.addEventListener("click", stopCanvas);
