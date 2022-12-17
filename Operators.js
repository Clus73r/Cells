import { Color, Particle } from "./Particle.js";
import { World, Grid } from "./World.js";

export class DrawSand {
  constructor(name, world) {
    this.world = world;
    this.name = name;
    this.x = 0;
    this.y = 0;
  }
  mouse_down() {
    this.active = true;
  }
  mouse_up() {
    this.active = false;
  }
  tick() {
    if (this.active) {
      const radius_sqr = 5 * 5;
      const rand = Math.floor(Math.random() * 30);
      for (let px = 0; px < 10; ++px) {
        for (let py = 0; py < 10; ++py) {
          const dx = Number(this.x) - Number(this.x + px - 5);
          const dy = Number(this.y) - Number(this.y + py - 5);
          const dst_sqr = dx * dx + dy * dy;
          const small_rand = Math.floor(Math.random() * 10);
          if (dx * dx + dy * dy <= radius_sqr) {
            this.world.grid.set_cell(
              this.x + px - 5,
              this.y + py - 5,
              new Particle(
                new Color(250 - rand - small_rand, 170 - rand - small_rand, 57),
                ["falling"]
              )
            );
          }
        }
      }
    }
  }
}

export class DrawGround {
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
  mouse_move() {
    if (this.active) {
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
        this.world.grid.set_cell(
          Math.round(draw_x),
          Math.round(draw_y),
          new Particle(new Color(0, 0, 0), [])
        );
      }
      this.last_x = this.x;
      this.last_y = this.y;
    }
  }
}
