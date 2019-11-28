function Shape(x, y) {
  this.x = x;
  this.y = y;
  
  this.draw = function() {
    console.log('x', this.x);
    console.log('y', this.y); 
  }
}

function Circle(x, y, r) {
  Shape.call(this, x, y);
  this.r = r;
}

Circle.prototype = Object.create(Shape.prototype)

var c = new Circle(1, 5, 10); 
// circle c with position x 1 and y // 5 with radius 5

c.draw(); // available
