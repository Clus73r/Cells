export class FallingSolver {
  constructor(world) {
    this.world = world;
  }
  solve(x, y, p) {
    if (!p.properties.has("falling")) return;
    const g = this.world.grid;
    const below = g.get_cell(x, y + 1);
    if (!below) {
      const nl = g.get_cell(x - 1, y);
      const nr = g.get_cell(x + 1, y);
      if (nl && nl.properties.has("sticky")) {
        delete nl.sticky;
      }
      if (nr && nr.properties.has("sticky")) {
        delete nr.sticky;
      }
      return [this.world.grid.swap_cells, x, y, x, y + 1];
    }
    if (p.properties.has("sticky")) return;
    const rand = Math.random();
    const rand2 = Math.random();
    const left = g.get_cell(x - 1, y + 1);
    if (rand > 0.5) {
      if (!left && !g.get_cell(x - 1, y) && rand2 > 0.8)
        return [this.world.grid.swap_cells, x, y, x - 1, y + 1];
    } else {
      const right = g.get_cell(x + 1, y + 1);
      if (!right && !g.get_cell(x + 1, y) && rand2 > 0.8)
        return [this.world.grid.swap_cells, x, y, x + 1, y + 1];
    }
    const rand3 = Math.random();
    if (rand3 > 0.99) {
      p.sticky = "";
    }
  }
}

export class LiquidSolver {
  constructor(world) {
    this.world = world;
  }
  solve(x, y, p) {
    if (!p.properties.has("liquid")) return;
    const g = this.world.grid;
    const below = g.get_cell(x, y + 1);
    if (!below) {
      return [g.swap_cells, x, y, x, y + 1];
    }
    if (!g.get_cell(x - 1, y + 1) && !g.get_cell(x - 1, y))
      return [g.swap_cells, x, y, x - 1, y + 1];
    if (!g.get_cell(x - 1, y)) return [g.swap_cells, x, y, x - 1, y];
    if (!g.get_cell(x + 1, y + 1) && !g.get_cell(x + 1, y))
      return [g.swap_cells, x, y, x + 1, y + 1];
    // const right = g.get_cell(x + 1, y);
    if (!g.get_cell(x + 1, y)) return [g.swap_cells, x, y, x + 1, y];
  }
}
