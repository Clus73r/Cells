export class SandSolver {
  constructor(world) {
    this.world = world;
  }
  solve(x, y, p) {
    if (!("falling" in p)) return null;
    const g = this.world.grid;
    const below = g.get_cell(x, y + 1);
    if (!below) {
      const nl = g.get_cell(x - 1, y);
      const nr = g.get_cell(x + 1, y);
      if (nl && "sticky" in nl) {
        delete nl.sticky;
      }
      if (nr && "sticky" in nr) {
        delete nr.sticky;
      }
      return [this.world.grid.swap_cells, x, y, x, y + 1];
    }
    if ("sticky" in p) return;
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
