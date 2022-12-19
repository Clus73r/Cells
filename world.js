import { Color, Particle } from "./particle.js";

export class Grid {
  constructor(size_x, size_y) {
    this.size_x = size_x;
    this.size_y = size_y;
    this.cells = new Array(size_x * size_y);
    this.cells.fill(null);
    this.deferred = [];
  }
  get_cell(x, y) {
    return this.cells[y * this.size_x + x];
  }
  set_cell(x, y, value) {
    this.cells[y * this.size_y + x] = value;
  }
  // swap_cells(x, y, x2, y2) {
  //   const p1 = this.get_cell(x, y);
  //   this.set_cell(x, y, this.get_cell(x2, y2));
  //   this.set_cell(x2, y2, p1);
  // }
  move_cell(x, y, x2, y2) {
    const p1 = this.get_cell(x, y);
    const p2 = this.get_cell(x2, y2);
    if (!p2) {
      this.set_cell(x2, y2, p1);
      this.set_cell(x, y, null);
    }
  }
  line_move_cell(x, y, x2, y2) {
    const p1 = this.get_cell(x, y);
    const [new_x, new_y] = this.line_trace(x, y, x2, y2);
    if (!this.get_cell(new_x, new_y)) {
      this.set_cell(new_x, new_y, p1);
      this.set_cell(x, y, null);
    }
  }
  line_trace(x, y, x2, y2) {
    const dx = x2 - x;
    const dy = y2 - y;
    let steps;
    if (Math.abs(dx) > Math.abs(dy)) {
      steps = Math.abs(dx);
    } else {
      steps = Math.abs(dy);
    }
    const x_inc = dx / Number(steps);
    const y_inc = dy / Number(steps);
    let draw_x = x;
    let draw_y = y;
    let last_x = x;
    let last_y = y;
    for (let i = 0; i < steps; ++i) {
      draw_x = draw_x + x_inc;
      draw_y = draw_y + y_inc;
      if (this.get_cell(draw_x, draw_y)) return [last_x, last_y];
      last_x = draw_x;
      last_y = draw_y;
    }
    return [x2, y2];
  }
  defer(act) {
    if (act && act.length > 0) this.deferred.push(act);
  }
  execute_deferred() {
    for (let i = this.deferred.length - 1; i > 0; --i) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deferred[i], this.deferred[j]] = [
        this.deferred[j],
        this.deferred[i],
      ];
    }
    for (let [func, ...args] of this.deferred) {
      func.call(this, ...args);
    }
    this.deferred = [];
  }
}

export class World {
  constructor(size_x, size_y) {
    this.grid = new Grid(size_x, size_y);
    this.dynamic_particles = [];
    this.solvers = [];
    this.last_frame_time = performance.now();
    // this.add_particle(5, 5, new Particle(new Color(50, 50, 50), ["falling"]));
    for (let i = 0; i < size_x; ++i) {
      this.add_particle(i, size_y - 1, new Particle(new Color(50, 50, 50), []));
    }
  }
  register_solver(solver) {
    this.solvers.push(solver);
  }

  add_particle(x, y, particle) {
    this.grid.set_cell(x, y, particle);
    this.dynamic_particles.push({ x: x, y: y, particle: particle });
  }
  step() {
    const now = performance.now();
    const elapsed = now - this.last_frame_time;
    if (elapsed < 10) return;
    this.last_frame_time = now;
    for (let solver of this.solvers) {
      for (let x = 0; x < this.grid.size_x; ++x) {
        for (let y = 0; y < this.grid.size_y; ++y) {
          const p = this.grid.get_cell(x, y);
          if (p) this.grid.defer(solver.solve(x, y, p));
        }
      }
    }
    this.grid.execute_deferred();
  }
}
