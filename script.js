import { World } from "./world.js";
import { WorldRenderer } from "./WorldRenderer.js";

main();

function main() {
  const canvas = document.getElementById("canvas");
  const size_x = 64;
  const size_y = 64;
  const upscale = 16;
  canvas.setAttribute("width", size_x)
  canvas.setAttribute("height", size_y)
  canvas.style.width = `${size_x * upscale}px`;
  canvas.style.height = `${size_y * upscale}px`;
  const ctx = canvas.getContext("2d");

  let world = new World(size_x, size_y);
  let renderer = new WorldRenderer(ctx, world);

  renderer.render(ctx);


}
