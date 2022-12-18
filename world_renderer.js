export class WorldRenderer {
  constructor(ctx, world) {
    this.world = world;
    this.ctx = ctx;
  }

  render(ctx) {
    const s_x = this.world.grid.size_x;
    const s_y = this.world.grid.size_y;
    const imageData = this.ctx.createImageData(s_x, s_y);

    for (let x = 0; x < s_x; x++) {
      for (let y = 0; y < s_y; y++) {
        const id = y * s_x + x;
        // imageData.data[id * 4] = 50;
        const particle = this.world.grid.get_cell(x, y);
        if (particle) {
          imageData.data[id * 4 + 0] = particle.color.r;
          imageData.data[id * 4 + 1] = particle.color.g;
          imageData.data[id * 4 + 2] = particle.color.b;
          imageData.data[id * 4 + 3] = 255;
        } else {
          imageData.data[id * 4 + 0] = 200;
          imageData.data[id * 4 + 1] = 200;
          imageData.data[id * 4 + 2] = 200;
          imageData.data[id * 4 + 3] = 255;
        }
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }
}
