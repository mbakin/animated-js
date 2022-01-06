/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
  }

  update() {
    this.x += this.speedX + Math.sin(this.angleX);
    this.y += this.speedY + Math.sin(this.angleY);
    this.size += this.vs;
    this.angleX += this.vax;
    this.angleY += this.vay;
    if (this.size < this.maxSize) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(315, 89%, 64%, 0.99)';
      ctx.fill();
      ctx.stroke();
      requestAnimationFrame(this.update.bind(this));
    } 
  }
}

window.addEventListener('mousemove', (e) => {
  const root = new Root(e.x, e.y);
  root.update();
})

