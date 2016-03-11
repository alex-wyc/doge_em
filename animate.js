//adds the html stuff variables
var p = document.getElementById("playground");
var stop = document.getElementById("pause");
var ctx = p.getContext("2d");
var start = document.getElementById("start");
var clear = document.getElementById('clear');

var canvas_width = p.getAttribute('width');
var canvas_height = p.getAttribute('height') - 50;

//style of canvas
//x and y coordinates of dvd
var x = canvas_width / 2;
var y = canvas_height / 2;

//x and y velocities of dvd
var velx = 0;
var vely = 0;

//variable for animation frame
var anim = 0;
var inc = 0.3;
var dojocat = new Image();
dojocat.src = "dojocat.png";

dojocat.onload = function() {
    init();
};

var doge = new Image();
doge.src = "doge.png"

doge.onload = function() {
    init();
};

var dogeList = new Array();

var playing = false;

function Doge(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
}

//dogeList.push(new Doge(x, y, dx, dy));

function levelUp() {
    dogeList.push(new Doge(Math.random() * canvas_width,
                           Math.random() * canvas_height,
                           Math.random() * 3,
                           Math.random() * 3));
}

var image_size = 70;
var collision_radius = image_size / 2;

var score = 0;
var counter = 0;
var health = 1000;
var max_health = health;
var damage = 5;

function init() {

    stopCanvas();

    dogeList = [];

    velx = 0;
    vely = 0;
    x = canvas_width / 2;
    y = canvas_height / 2;
    counter = 0;
    health = max_health;
    score = 0;

    for (var i = 0 ; i < 5 ; i++) {
        levelUp();
    }

    ctx.clearRect(0,0,canvas_width,canvas_height);
ctx.drawImage(dojocat, x - collision_radius, y - collision_radius, image_size, image_size);
    ctx.drawImage(doge, 70, 50, image_size, image_size);
    ctx.drawImage(doge, 210, 50, image_size, image_size);
    ctx.drawImage(doge, 350, 50, image_size, image_size);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, canvas_height, canvas_width, 50);
    ctx.font = '30px Comic Sans MS';
    ctx.textAligh = 'center';
    ctx.fillText("HOW MANY OF THEM CAN YOU DOGE?", 30, 150);
    ctx.fillText("Instructions:", 70, 300);
    ctx.fillText("Arrow Keys to Accelerate", 150, 340);
    ctx.fillText("Space Bar to Start/Pause", 230, 380);
    ctx.fillText("Dodge to DOGES!!!", 310, 420);
    ctx.fillStyle = 'white';
    ctx.fillText("HEALTH", 20, canvas_height + 35);
    ctx.fillStyle = 'red';
    ctx.fillRect(155, canvas_height + 7, (canvas_width - 155 - 20) * health / max_health, 37);
}

//clear canvas

function stopCanvas(){
    cancelAnimationFrame(anim);
    start.disabled = false;
    stop.disabled = true;
    playing = false;
}

//left = 37 up = 38 right = 39 down = 40
function ctrl(e){
    if (e.keyCode == 39)
        velx += inc ;
    if (e.keyCode == 37) 
        velx -= inc;
    if (e.keyCode == 38) 
        vely -= inc;
    if (e.keyCode == 40) 
        vely += inc;
    if (e.keyCode == 32) {
        if (playing) {
            stopCanvas();
        }
        else {
            everySec();
        }
    }
}

// collision --> true/false if distance within collision radius
function collision(x1, y1, x2, y2) {
    return Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) <= Math.pow(collision_radius, 2);
}

function draw_doge(a_doge) {
    ctx.drawImage(doge, a_doge.x, a_doge.y, image_size, image_size);
}

function sortAndAppendList(ul, new_el) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(new_el));
    ul.appendChild(li);

    var list_els = Array.prototype.slice.call(ul.children, 0);
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    list_els.sort(function(a, b) {
        return parseInt(b.childNodes[0].data, 10) - parseInt(a.childNodes[0].data, 10);
    });

    for (var i = 0 ; i < list_els.length ; i++) {
        ul.appendChild(list_els[i]);
    }
}

function everySec(e){

    playing = true;

    start.disabled = true;
    stop.disabled = false;

    ctx.clearRect(0,0,canvas_width,canvas_height);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, canvas_height, canvas_width, 50);
    ctx.textAligh = 'center';
    ctx.font = '30px Comic Sans MS';
    ctx.fillText("SCORE: " + score, 0, 30);
    ctx.fillStyle = 'white';
    ctx.fillText("HEALTH", 20, canvas_height + 35);
    ctx.fillStyle = 'red';
    ctx.fillRect(155, canvas_height + 7, (canvas_width - 155 - 20) * health / max_health, 37);

    for (var i = 0 ; i < dogeList.length ; i++) {
        var curr = dogeList[i];
        draw_doge(curr);
        if ((curr.x >= (canvas_width - image_size) && curr.dx > 0) || (curr.x <= 0 && curr.dx < 0)) curr.dx = -curr.dx;
        if ((curr.y >= (canvas_height - image_size) && curr.dy > 0) || (curr.y <= 0 && curr.dy < 0)) curr.dy = -curr.dy;
        curr.x += curr.dx;
        curr.y += curr.dy;

        if (collision(curr.x, curr.y, x, y)) {
            health -= damage;
            if (health <= 0) {
                alert("You died....");
                sortAndAppendList(document.getElementById('scoreboard'), score);
                init();
                return;
            }
        }
    }

    ctx.drawImage(dojocat, x, y, image_size, image_size);
    if ((x >= (canvas_width - image_size) && velx > 0) || (x <= 0 && velx < 0)) velx = -velx / 2;
    if ((y >= (canvas_height - image_size) && vely > 0) || (y <= 0 && vely < 0)) vely = -vely / 2;
    x += velx;
    y += vely;

    score += dogeList.length;

    counter++;
    if (counter % 800 == 0) {
        levelUp();
    }

    anim = requestAnimationFrame(everySec);
}

document.addEventListener("keydown", ctrl);
start.addEventListener("click", everySec);
stop.addEventListener("click", stopCanvas);
clear.addEventListener('click', init);
