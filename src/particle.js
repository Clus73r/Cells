export class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

export class Particle {
  constructor(color, props) {
    this.color = color;
    this.properties = new Set(props);
    this.vel_x = 0;
    this.vel_y = 0;
    // for (let p of props) {
    //   this[p] = "";
    // }
  }
}
