/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;

class Root {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.maxSize = Math.random() * 7 + 5;
    this.size = Math.random() * 1 + 2;
    this.vs = Math.random () * 0.2 + 0.05;
    this.angleX = Math.random() * 6.2;
    this.vax = Math.random() * 0.6 - 0.3;
    this.angleY = Math.random() * 6.2;
    this.vay = Math.random() * 0.6 - 0.3;
    this.lightness = 10;
  }

  update() {
    this.x += this.speedX + Math.sin(this.angleX);
    this.y += this.speedY + Math.sin(this.angleY);
    this.size += this.vs;
    this.angleX += this.vax;
    this.angleY += this.vay;
    if (this.lightness < 70) this.lightness += 0.25;
    if (this.size < this.maxSize) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(107, 100%, ' + this.lightness + '%)';
      ctx.fill();
      ctx.stroke();
      requestAnimationFrame(this.update.bind(this));
    }
    else {
      const flower = new Flower(this.x, this.y, this.size, this.size);
      flower.grow();
    }
  }
}

class Flower {
  constructor (x,y ,size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.maxFlowerSize = this.size + Math.random() * 50;
    this.image = new Image();
    this.image.src = './assets/flowers.png';
    this.frameSize = 100;
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);
    this.size > 11.5 ? this.willFlower = true : this.willFlower = false;
  }
  grow () {
    if (this.size < this.maxFlowerSize && this.willFlower) {
      this.size += 0.3;
      ctx.drawImage(this.image, this.frameSize * this.frameX, this.frameSize * this.frameY, this.frameSize, this.frameSize, this.x - this.size/2, this.y, this.size, this.size);
      requestAnimationFrame(this.grow.bind(this));
    }
  }
}

window.addEventListener('mousemove', (e) => {
  if (drawing) {
    for (let i = 0; i < 3; i++) {
      const root = new Root(e.x, e.y);
      root.update();  
    }
  }
})

window.addEventListener('mousedown', () => {
  drawing = true;
})
window.addEventListener('mouseup', () => {
  drawing = false;
})

