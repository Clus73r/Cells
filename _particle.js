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
    // for (let p of props) {
    //   this[p] = "";
    // }
  }
}
