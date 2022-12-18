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
  swap_cells(x, y, x2, y2) {
    const p1 = this.get_cell(x, y);
    this.set_cell(x, y, this.get_cell(x2, y2));
    this.set_cell(x2, y2, p1);
  }
  defer(act) {
    if (act) this.deferred.push(act);
  }
  execute_deferred() {
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
