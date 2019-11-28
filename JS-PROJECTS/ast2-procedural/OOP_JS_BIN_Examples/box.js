function Box(parentElement) {
  this.x = 10;
  this.y = 10;
  this.width = 50;
  this.height = 50;
  this.element = null;
  this.parentElement = parentElement;
  var that = this;
  
  this.init = function() {
    var box = document.createElement('div');
    box.style.height = this.height + 'px';
    box.style.width = this.width + 'px';
    box.classList.add('box');
    this.parentElement.appendChild(box);
    this.element = box;
    this.element.onclick = this.boxClicked.bind(this);
    this.draw();    
  }
  
  this.boxClicked = function() {
    console.log('boxClicked', this.width);
  }
  
  this.draw = function() {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }
  
}

var parentElement = document.getElementById('app');

new Box(parentElement).init();