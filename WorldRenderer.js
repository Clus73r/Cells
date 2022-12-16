export class WorldRenderer {
  constructor(ctx, world) {
    this.world = world;
    this.ctx = ctx;
  }

  render(ctx) {
    const s_x = this.world.grid.size_x;
    const s_y = this.world.grid.size_y;
    const imageData = this.ctx.createImageData(
      s_x,
      s_y
    );

    for (let x = 0; x < s_x; x++) {
      for (let y = 0; y < s_y; y++) {
        const id = y * s_x + x;
        // imageData.data[id * 4] = 50;
        imageData.data[id * 4 + 0] = (y * 20) % 255;
        imageData.data[id * 4 + 1] = (x * 20) % 255;
        imageData.data[id * 4 + 2] = x + y;
        imageData.data[id * 4 + 3] = 255;
      }
    }
    // for (let x = 0; x < s_x; ++x) {
    //   for (let y = 0; y < s_y; ++y) {
    //     imageData.data[y * s_x + x] = 1;
    //   }
    // }

    // for (let i = 0; i < imageData.data.length; ++i){
    //   imageData.data[i] = 255;
    // }

    this.ctx.putImageData(imageData, 20, 20);
  }
}
