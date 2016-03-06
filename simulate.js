console.log('simulation js loaded');

var state = 0;
// state variable:
//     0 -- Blank canvas, no center of mass
//     1 -- Center of mass placed, placing planets

// creates a planet object inside javascript
function Planet(x, y, dx, dy, mass, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.mass = mass;
    this.color = color;
    this.stroke = true;
}

var spaceCanvas = document.getElementById('space');
