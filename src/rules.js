export class SolidMovingRule {
  constructor(world) {
    this.world = world;
  }
  apply(x, y, p) {
    if (!p.properties.has("SolidMoving")) return;
    const g = this.world.grid;
    const w = this.world;
    const below = g.get_cell(x, y + 1);
    if (p.vel_x > 0) p.vel_x -= 1;
    if (p.vel_x < 0) p.vel_x += 1;
    if (p.vel_y > 0) p.vel_y -= 1;
    if (p.vel_y < 0) p.vel_y += 1;
    if (!below) {
      p.vel_y += 2;
      return;
    }
    if (below) {
      // let sign_x;
      // if (p.vel_x === 0) sign_x = Math.random() > 0.5 ? 1 : -1;
      // else sign_x = p.vel_x / Math.abs(p.vel_x);
      const r = Math.floor(p.vel_y * ((Math.random() - 0.5) / 3));
      p.vel_x = r;
      // p.vel_x = 0;
      p.vel_y = 0;
      if (Math.abs(p.vel_x) >= 2) return;
    }
    const right = g.get_cell(x + 1, y);
    const left = g.get_cell(x - 1, y);
    const left_down = g.get_cell(x - 1, y + 1);
    const right_down = g.get_cell(x + 1, y + 1);

    const try_fall_left = () => {
      if (!left && !left_down) {
        p.vel_x -= 1;
        p.vel_y += 1;
        return true;
      }
      return false;
    };
    const try_fall_right = () => {
      if (!right && !right_down) {
        p.vel_x += 1;
        p.vel_y += 1;
        return true;
      }
      return false;
    };
    if (Math.random() > 0.5) {
      if (!try_fall_left()) try_fall_right();
    } else {
      if (!try_fall_right()) try_fall_left();
    }
  }
}

export class LiquidRule {
  constructor(world) {
    this.world = world;
  }
  apply(x, y, p) {
    if (!p.properties.has("Liquid")) return;
    const g = this.world.grid;
    const w = this.world;
    const below = g.get_cell(x, y + 1);
    if (!below) {
      p.vel_y += 2;
      return;
    }
    const right = g.get_cell(x + 1, y);
    const left = g.get_cell(x - 1, y);
    const left_down = g.get_cell(x - 1, y + 1);
    const right_down = g.get_cell(x + 1, y + 1);
    if (!right && !right_down) {
      p.vel_x = 1;
      p.vel_y = 1;
      return;
    }
    if (!left && !left_down) {
      p.vel_x = -1;
      p.vel_y = 1;
      return;
    }
    if (!left) {
      p.vel_x = -1;
      p.vel_y = 0;
      return;
    }
    if (!right) {
      p.vel_x = 1;
      p.vel_y = 0;
      return;
    }
  }
}

// export class FallingSolver {
//   constructor(world) {
//     this.world = world;
//   }
//   solve(x, y, p) {
//     if (!p.properties.has("falling")) return;
//     const g = this.world.grid;
//     const below = g.get_cell(x, y + 1);
//     if (!below) {
//       const nl = g.get_cell(x - 1, y);
//       const nr = g.get_cell(x + 1, y);
//       if (nl && nl.properties.has("sticky")) {
//         delete nl.sticky;
//       }
//       if (nr && nr.properties.has("sticky")) {
//         delete nr.sticky;
//       }
//       return [this.world.grid.move_cell, x, y, x, y + 1];
//     }
//     if (p.properties.has("sticky")) return;
//     const rand = Math.random();
//     const rand2 = Math.random();
//     const left = g.get_cell(x - 1, y + 1);
//     if (rand > 0.5) {
//       if (!left && !g.get_cell(x - 1, y) && rand2 > 0.1)
//         return [this.world.grid.move_cell, x, y, x - 1, y + 1];
//     } else {
//       const right = g.get_cell(x + 1, y + 1);
//       if (!right && !g.get_cell(x + 1, y) && rand2 > 0.1)
//         return [this.world.grid.move_cell, x, y, x + 1, y + 1];
//     }
//     const rand3 = Math.random();
//     if (rand3 > 0.99) {
//       p.sticky = "";
//     }
//   }
// }

// export class LiquidSolver {
//   constructor(world) {
//     this.world = world;
//   }
//   solve(x, y, p) {
//     if (!p.properties.has("liquid")) return;
//     const g = this.world.grid;
//     const below = g.get_cell(x, y + 1);
//     if (!below) {
//       return [g.move_cell, x, y, x, y + 1];
//     }
//     const left = g.get_cell(x - 1, y);
//     const right = g.get_cell(x + 1, y);
//     if (left && right) return [];
//     if (!p.properties.has("flow_left") && !p.properties.has("flow_right")) {
//       if (Math.random() > 0.5) {
//         p.properties.add("flow_left");
//       } else {
//         p.properties.add("flow_right");
//       }
//     }
//     if (p.properties.has("flow_left") && left) {
//       p.properties.delete("flow_left");
//       p.properties.add("flow_right");
//     }
//     if (p.properties.has("flow_right") && right) {
//       p.properties.delete("flow_right");
//       p.properties.add("flow_left");
//     }
//     if (p.properties.has("flow_right")) {
//       // return [g.move_cell, x, y, x + 1, y];
//       if (!g.get_cell(x + 1, y + 1)) return [g.move_cell, x, y, x + 1, y + 1];
//       return [g.line_move_cell, x, y, x + 1, y];
//     }
//     if (p.properties.has("flow_left")) {
//       // return [g.move_cell, x, y, x - 1, y];
//       if (!g.get_cell(x - 1, y + 1)) return [g.move_cell, x, y, x - 1, y + 1];
//       return [g.line_move_cell, x, y, x - 1, y];
//     }
//     // if (
//     //   (!p.properties.has("flow_left") || g.get_cell(x - 1, y)) &&
//     //   !g.get_cell(x + 1, y)
//     // )
//     //   return [
//     //     () => {
//     //       g.line_move_cell(x, y, x + 3, y);
//     //       p.properties.add("flow_right");
//     //     },
//     //   ];
//     // if (!g.get_cell(x - 1, y))
//     //   return [
//     //     () => {
//     //       g.line_move_cell(x, y, x - 3, y);
//     //       p.properties.add("flow_left");
//     //     },
//     //   ];
//     // if (!g.get_cell(x - 1, y + 1) && !g.get_cell(x - 1, y))
//     //   return [g.move_cell, x, y, x - 1, y + 1];
//     // if (!g.get_cell(x - 1, y)) return [g.move_cell, x, y, x - 1, y];
//     // if (!g.get_cell(x + 1, y + 1) && !g.get_cell(x + 1, y))
//     //   return [g.move_cell, x, y, x + 1, y + 1];
//     // // const right = g.get_cell(x + 1, y);
//     // if (!g.get_cell(x + 1, y)) return [g.move_cell, x, y, x + 1, y];
//   }
// }
