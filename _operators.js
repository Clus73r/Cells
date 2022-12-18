import { Color, Particle } from "./_particle.js";
import { World, Grid } from "./_world.js";

class DrawOperator {
  constructor(name, world) {
    this.world = world;
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.size = 5;
  }
  set_size(val) {
    this.size = val;
  }
  mouse_down() {
    this.active = true;
  }
  mouse_up() {
    this.active = false;
  }
  get_particle() {
    new Particle(new Color(0, 0, 0), []);
  }
  vary(p) {
    const small_rand = Math.floor(Math.random() * 20);
    p.color.r -= this.rand - small_rand;
    p.color.g -= this.rand - small_rand;
  }
  tick() {
    if (
      this.active &&
      this.x > 0 &&
      this.x < this.world.grid.size_x &&
      this.y > 0 &&
      this.world.grid.size_y
    ) {
      this.rand = Math.floor(Math.random() * 20);
      const radius_sqr = this.size * this.size;
      for (let px = 0; px < 10; ++px) {
        for (let py = 0; py < 10; ++py) {
          const dx = Number(this.x) - Number(this.x + px - 5);
          const dy = Number(this.y) - Number(this.y + py - 5);
          const dst_sqr = dx * dx + dy * dy;
          let p = this.get_particle();
          this.vary(p);
          if (dx * dx + dy * dy <= radius_sqr) {
            this.world.grid.set_cell(this.x + px - 5, this.y + py - 5, p);
          }
        }
      }
    }
  }
}

export class DrawSand extends DrawOperator {
  get_particle() {
    return new Particle(new Color(250, 170, 57), ["falling"]);
  }
}

export class DrawWater extends DrawOperator {
  get_particle() {
    return new Particle(new Color(20, 150, 230), ["liquid"]);
  }
  // vary(p) {}
}

class DrawLineOperator {
  constructor(name, world) {
    this.world = world;
    this.name = name;
    this.x = 0;
    this.y = 0;
  }
  mouse_down() {
    this.active = true;
    this.last_x = this.x;
    this.last_y = this.y;
  }
  mouse_up() {
    this.active = false;
  }
  get_particle() {}
  mouse_move() {
    if (
      this.active &&
      this.x > 0 &&
      this.x < this.world.grid.size_x &&
      this.y > 0 &&
      this.world.grid.size_y
    ) {
      const dx = this.x - this.last_x;
      const dy = this.y - this.last_y;
      let steps;
      if (Math.abs(dx) > Math.abs(dy)) {
        steps = Math.abs(dx);
      } else {
        steps = Math.abs(dy);
      }
      const x_inc = dx / Number(steps);
      const y_inc = dy / Number(steps);
      let draw_x = this.last_x;
      let draw_y = this.last_y;
      for (let i = 0; i < steps; ++i) {
        draw_x = draw_x + x_inc;
        draw_y = draw_y + y_inc;
        let p = this.get_particle();
        this.world.grid.set_cell(Math.round(draw_x), Math.round(draw_y), p);
      }
      this.last_x = this.x;
      this.last_y = this.y;
    }
  }
}

export class DrawGround extends DrawLineOperator {
  get_particle() {
    return new Particle(new Color(0, 0, 0), []);
  }
}
