import { DrawGround, DrawSand, DrawWater } from "./_operators.js";
import { Color, Particle } from "./_particle.js";
import { World } from "./_world.js";
import { WorldRenderer } from "./_world_renderer.js";
import { FallingSolver, LiquidSolver } from "./_solvers.js";

let operator = null;
const canvas = document.getElementById("canvas");

const size_x = 64;
const size_y = 64;
const upscale = 10;
// const size_x = 256;
// const size_y = 256;
// const upscale = 3;

addEventListener("mousedown", (e) => {
  if (operator && "mouse_down" in operator) {
    operator.mouse_down();
  }
});

addEventListener("mouseup", (e) => {
  if (operator && "mouse_up" in operator) {
    operator.mouse_up();
  }
});

addEventListener("mousemove", (e) => {
  if (!operator) return;
  const rect = canvas.getBoundingClientRect();
  operator.x = Math.floor(
    ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width
  );
  operator.y = Math.floor(
    ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
  );
  if ("mouse_move" in operator) {
    operator.mouse_move();
  }
});

(function main() {
  canvas.setAttribute("width", size_x);
  canvas.setAttribute("height", size_y);
  // canvas.style.width = `${size_x * upscale}px`;
  // canvas.style.height = `${size_y * upscale}px`;
  const ctx = canvas.getContext("2d");

  let world = new World(size_x, size_y);
  let renderer = new WorldRenderer(ctx, world);

  let operators = [
    new DrawGround("Ground", world),
    new DrawSand("Sand", world),
    new DrawWater("Water", world),
  ];

  const operator_container = document.getElementById("operator-container");
  for (let op of operators) {
    let operator_btn = document.createElement("input");
    let operator_lbl = document.createElement("label");
    // operator_btn.textContent = op.name;
    operator_btn.setAttribute("type", "radio");
    operator_btn.setAttribute("class", "btn-check");
    operator_btn.setAttribute("width", "3cm");
    operator_btn.setAttribute("height", "3cm");
    operator_btn.setAttribute("id", `op-${op.name}`);
    operator_btn.setAttribute("name", "vbtn-radio");
    operator_lbl.setAttribute("class", "btn btn-dark");
    operator_lbl.setAttribute("for", `op-${op.name}`);
    operator_lbl.textContent = op.name;
    operator_btn.addEventListener("click", (e) => {
      operator = op;
    });
    operator_container.appendChild(operator_btn);
    operator_container.appendChild(operator_lbl);
  }

  operator = operators[0];
  // operator = new DrawSand(world);

  world.register_solver(new FallingSolver(world));
  world.register_solver(new LiquidSolver(world));

  (function tick() {
    if ("tick" in operator) operator.tick();
    world.step();
    renderer.render(ctx);
    requestAnimationFrame(tick);
  })();
})();
