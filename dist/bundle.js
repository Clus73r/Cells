/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _operators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./operators.js */ \"./src/operators.js\");\n/* harmony import */ var _particle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./particle.js */ \"./src/particle.js\");\n/* harmony import */ var _world_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./world.js */ \"./src/world.js\");\n/* harmony import */ var _world_renderer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./world_renderer.js */ \"./src/world_renderer.js\");\n/* harmony import */ var _rules_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rules.js */ \"./src/rules.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nlet operator = null;\r\nconst canvas = document.getElementById(\"canvas\");\r\n\r\nconst size_x = 256;\r\nconst size_y = 256;\r\nconst upscale = 10;\r\n// const size_x = 256;\r\n// const size_y = 256;\r\n// const upscale = 3;\r\n\r\naddEventListener(\"mousedown\", (e) => {\r\n  if (operator && \"mouse_down\" in operator) {\r\n    operator.mouse_down();\r\n  }\r\n});\r\n\r\naddEventListener(\"mouseup\", (e) => {\r\n  if (operator && \"mouse_up\" in operator) {\r\n    operator.mouse_up();\r\n  }\r\n});\r\n\r\naddEventListener(\"mousemove\", (e) => {\r\n  if (!operator) return;\r\n  const rect = canvas.getBoundingClientRect();\r\n  operator.x = Math.floor(\r\n    ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width\r\n  );\r\n  operator.y = Math.floor(\r\n    ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height\r\n  );\r\n  if (\"mouse_move\" in operator) {\r\n    operator.mouse_move();\r\n  }\r\n});\r\n\r\n(function main() {\r\n  canvas.setAttribute(\"width\", size_x);\r\n  canvas.setAttribute(\"height\", size_y);\r\n  // canvas.style.width = `${size_x * upscale}px`;\r\n  // canvas.style.height = `${size_y * upscale}px`;\r\n  const ctx = canvas.getContext(\"2d\");\r\n\r\n  let world = new _world_js__WEBPACK_IMPORTED_MODULE_2__.World(size_x, size_y);\r\n  let renderer = new _world_renderer_js__WEBPACK_IMPORTED_MODULE_3__.WorldRenderer(ctx, world);\r\n\r\n  let operators = [\r\n    new _operators_js__WEBPACK_IMPORTED_MODULE_0__.DrawGround(\"Ground\", world),\r\n    new _operators_js__WEBPACK_IMPORTED_MODULE_0__.DrawSand(\"Sand\", world),\r\n    new _operators_js__WEBPACK_IMPORTED_MODULE_0__.DrawWater(\"Water\", world),\r\n  ];\r\n\r\n  const operator_container = document.getElementById(\"operator-container\");\r\n  for (let op of operators) {\r\n    let operator_btn = document.createElement(\"input\");\r\n    let operator_lbl = document.createElement(\"label\");\r\n    // operator_btn.textContent = op.name;\r\n    operator_btn.setAttribute(\"type\", \"radio\");\r\n    operator_btn.setAttribute(\"class\", \"btn-check\");\r\n    operator_btn.setAttribute(\"width\", \"3cm\");\r\n    operator_btn.setAttribute(\"height\", \"3cm\");\r\n    operator_btn.setAttribute(\"id\", `op-${op.name}`);\r\n    operator_btn.setAttribute(\"name\", \"vbtn-radio\");\r\n    operator_lbl.setAttribute(\"class\", \"btn btn-dark\");\r\n    operator_lbl.setAttribute(\"for\", `op-${op.name}`);\r\n    operator_lbl.textContent = op.name;\r\n    operator_btn.addEventListener(\"click\", (e) => {\r\n      operator = op;\r\n    });\r\n    operator_container.appendChild(operator_btn);\r\n    operator_container.appendChild(operator_lbl);\r\n  }\r\n\r\n  operator = operators[0];\r\n  // operator = new DrawSand(world);\r\n\r\n  world.add_rule(new _rules_js__WEBPACK_IMPORTED_MODULE_4__.SolidMovingRule(world));\r\n  world.add_rule(new _rules_js__WEBPACK_IMPORTED_MODULE_4__.LiquidRule(world));\r\n  // world.register_solver(new LiquidSolver(world));\r\n\r\n  (function tick() {\r\n    if (\"tick\" in operator) operator.tick();\r\n    world.step();\r\n    renderer.render(ctx);\r\n    requestAnimationFrame(tick);\r\n  })();\r\n})();\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/operators.js":
/*!**************************!*\
  !*** ./src/operators.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DrawGround: () => (/* binding */ DrawGround),\n/* harmony export */   DrawSand: () => (/* binding */ DrawSand),\n/* harmony export */   DrawWater: () => (/* binding */ DrawWater)\n/* harmony export */ });\n/* harmony import */ var _particle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle.js */ \"./src/particle.js\");\n/* harmony import */ var _world_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./world.js */ \"./src/world.js\");\n\r\n\r\n\r\nclass DrawOperator {\r\n  constructor(name, world) {\r\n    this.world = world;\r\n    this.name = name;\r\n    this.x = 0;\r\n    this.y = 0;\r\n    this.size = 3;\r\n  }\r\n  set_size(val) {\r\n    this.size = val;\r\n  }\r\n  mouse_down() {\r\n    this.active = true;\r\n  }\r\n  mouse_up() {\r\n    this.active = false;\r\n  }\r\n  get_particle() {\r\n    new _particle_js__WEBPACK_IMPORTED_MODULE_0__.Particle(new _particle_js__WEBPACK_IMPORTED_MODULE_0__.Color(0, 0, 0), []);\r\n  }\r\n  vary(p) {\r\n    const small_rand = Math.floor(Math.random() * 20);\r\n    p.color.r -= this.rand - small_rand;\r\n    p.color.g -= this.rand - small_rand;\r\n  }\r\n  tick() {\r\n    if (\r\n      this.active &&\r\n      this.x > 0 &&\r\n      this.x < this.world.grid.size_x &&\r\n      this.y > 0 &&\r\n      this.world.grid.size_y\r\n    ) {\r\n      this.rand = Math.floor(Math.random() * 20);\r\n      // this.world.grid.set_cell(this.x, this.y, this.get_particle());\r\n      const radius_sqr = this.size * this.size;\r\n      for (let px = 0; px < 10; ++px) {\r\n        for (let py = 0; py < 10; ++py) {\r\n          const dx = Number(this.x) - Number(this.x + px - 5);\r\n          const dy = Number(this.y) - Number(this.y + py - 5);\r\n          const dst_sqr = dx * dx + dy * dy;\r\n          let p = this.get_particle();\r\n          this.vary(p);\r\n          if (dx * dx + dy * dy <= radius_sqr) {\r\n            this.world.grid.set_cell(this.x + px - 5, this.y + py - 5, p);\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nclass DrawSand extends DrawOperator {\r\n  get_particle() {\r\n    return new _particle_js__WEBPACK_IMPORTED_MODULE_0__.Particle(new _particle_js__WEBPACK_IMPORTED_MODULE_0__.Color(250, 170, 57), [\"SolidMoving\"]);\r\n  }\r\n}\r\n\r\nclass DrawWater extends DrawOperator {\r\n  get_particle() {\r\n    return new _particle_js__WEBPACK_IMPORTED_MODULE_0__.Particle(new _particle_js__WEBPACK_IMPORTED_MODULE_0__.Color(20, 150, 230), [\"Liquid\"]);\r\n  }\r\n  // vary(p) {}\r\n}\r\n\r\nclass DrawLineOperator {\r\n  constructor(name, world) {\r\n    this.world = world;\r\n    this.name = name;\r\n    this.x = 0;\r\n    this.y = 0;\r\n  }\r\n  mouse_down() {\r\n    this.active = true;\r\n    this.last_x = this.x;\r\n    this.last_y = this.y;\r\n  }\r\n  mouse_up() {\r\n    this.active = false;\r\n  }\r\n  get_particle() {}\r\n  mouse_move() {\r\n    if (\r\n      this.active &&\r\n      this.x > 0 &&\r\n      this.x < this.world.grid.size_x &&\r\n      this.y > 0 &&\r\n      this.world.grid.size_y\r\n    ) {\r\n      const dx = this.x - this.last_x;\r\n      const dy = this.y - this.last_y;\r\n      let steps;\r\n      if (Math.abs(dx) > Math.abs(dy)) {\r\n        steps = Math.abs(dx);\r\n      } else {\r\n        steps = Math.abs(dy);\r\n      }\r\n      const x_inc = dx / Number(steps);\r\n      const y_inc = dy / Number(steps);\r\n      let draw_x = this.last_x;\r\n      let draw_y = this.last_y;\r\n      for (let i = 0; i < steps; ++i) {\r\n        draw_x = draw_x + x_inc;\r\n        draw_y = draw_y + y_inc;\r\n        let p = this.get_particle();\r\n        this.world.grid.set_cell(Math.round(draw_x), Math.round(draw_y), p);\r\n      }\r\n      this.last_x = this.x;\r\n      this.last_y = this.y;\r\n    }\r\n  }\r\n}\r\n\r\nclass DrawGround extends DrawLineOperator {\r\n  get_particle() {\r\n    return new _particle_js__WEBPACK_IMPORTED_MODULE_0__.Particle(new _particle_js__WEBPACK_IMPORTED_MODULE_0__.Color(0, 0, 0), []);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/operators.js?");

/***/ }),

/***/ "./src/particle.js":
/*!*************************!*\
  !*** ./src/particle.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Color: () => (/* binding */ Color),\n/* harmony export */   Particle: () => (/* binding */ Particle)\n/* harmony export */ });\nclass Color {\r\n  constructor(r, g, b) {\r\n    this.r = r;\r\n    this.g = g;\r\n    this.b = b;\r\n  }\r\n}\r\n\r\nclass Particle {\r\n  constructor(color, props) {\r\n    this.color = color;\r\n    this.properties = new Set(props);\r\n    this.vel_x = 0;\r\n    this.vel_y = 0;\r\n    // for (let p of props) {\r\n    //   this[p] = \"\";\r\n    // }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/particle.js?");

/***/ }),

/***/ "./src/rules.js":
/*!**********************!*\
  !*** ./src/rules.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LiquidRule: () => (/* binding */ LiquidRule),\n/* harmony export */   SolidMovingRule: () => (/* binding */ SolidMovingRule)\n/* harmony export */ });\nclass SolidMovingRule {\r\n  constructor(world) {\r\n    this.world = world;\r\n  }\r\n  apply(x, y, p) {\r\n    if (!p.properties.has(\"SolidMoving\")) return;\r\n    const g = this.world.grid;\r\n    const w = this.world;\r\n    const below = g.get_cell(x, y + 1);\r\n    if (p.vel_x > 0) p.vel_x -= 1;\r\n    if (p.vel_x < 0) p.vel_x += 1;\r\n    if (p.vel_y > 0) p.vel_y -= 1;\r\n    if (p.vel_y < 0) p.vel_y += 1;\r\n    if (!below) {\r\n      p.vel_y += 2;\r\n      return;\r\n    }\r\n    if (below) {\r\n      // let sign_x;\r\n      // if (p.vel_x === 0) sign_x = Math.random() > 0.5 ? 1 : -1;\r\n      // else sign_x = p.vel_x / Math.abs(p.vel_x);\r\n      const r = Math.floor(p.vel_y * ((Math.random() - 0.5) / 3));\r\n      p.vel_x = r;\r\n      // p.vel_x = 0;\r\n      p.vel_y = 0;\r\n      if (Math.abs(p.vel_x) >= 2) return;\r\n    }\r\n    const right = g.get_cell(x + 1, y);\r\n    const left = g.get_cell(x - 1, y);\r\n    const left_down = g.get_cell(x - 1, y + 1);\r\n    const right_down = g.get_cell(x + 1, y + 1);\r\n\r\n    const try_fall_left = () => {\r\n      if (!left && !left_down) {\r\n        p.vel_x -= 1;\r\n        p.vel_y += 1;\r\n        return true;\r\n      }\r\n      return false;\r\n    };\r\n    const try_fall_right = () => {\r\n      if (!right && !right_down) {\r\n        p.vel_x += 1;\r\n        p.vel_y += 1;\r\n        return true;\r\n      }\r\n      return false;\r\n    };\r\n    if (Math.random() > 0.5) {\r\n      if (!try_fall_left()) try_fall_right();\r\n    } else {\r\n      if (!try_fall_right()) try_fall_left();\r\n    }\r\n  }\r\n}\r\n\r\nclass LiquidRule {\r\n  constructor(world) {\r\n    this.world = world;\r\n  }\r\n  apply(x, y, p) {\r\n    if (!p.properties.has(\"Liquid\")) return;\r\n    const g = this.world.grid;\r\n    const w = this.world;\r\n    const below = g.get_cell(x, y + 1);\r\n    if (!below) {\r\n      p.vel_y += 2;\r\n      return;\r\n    }\r\n    const right = g.get_cell(x + 1, y);\r\n    const left = g.get_cell(x - 1, y);\r\n    const left_down = g.get_cell(x - 1, y + 1);\r\n    const right_down = g.get_cell(x + 1, y + 1);\r\n    if (!right && !right_down) {\r\n      p.vel_x = 1;\r\n      p.vel_y = 1;\r\n      return;\r\n    }\r\n    if (!left && !left_down) {\r\n      p.vel_x = -1;\r\n      p.vel_y = 1;\r\n      return;\r\n    }\r\n    if (!left) {\r\n      p.vel_x = -1;\r\n      p.vel_y = 0;\r\n      return;\r\n    }\r\n    if (!right) {\r\n      p.vel_x = 1;\r\n      p.vel_y = 0;\r\n      return;\r\n    }\r\n  }\r\n}\r\n\r\n// export class FallingSolver {\r\n//   constructor(world) {\r\n//     this.world = world;\r\n//   }\r\n//   solve(x, y, p) {\r\n//     if (!p.properties.has(\"falling\")) return;\r\n//     const g = this.world.grid;\r\n//     const below = g.get_cell(x, y + 1);\r\n//     if (!below) {\r\n//       const nl = g.get_cell(x - 1, y);\r\n//       const nr = g.get_cell(x + 1, y);\r\n//       if (nl && nl.properties.has(\"sticky\")) {\r\n//         delete nl.sticky;\r\n//       }\r\n//       if (nr && nr.properties.has(\"sticky\")) {\r\n//         delete nr.sticky;\r\n//       }\r\n//       return [this.world.grid.move_cell, x, y, x, y + 1];\r\n//     }\r\n//     if (p.properties.has(\"sticky\")) return;\r\n//     const rand = Math.random();\r\n//     const rand2 = Math.random();\r\n//     const left = g.get_cell(x - 1, y + 1);\r\n//     if (rand > 0.5) {\r\n//       if (!left && !g.get_cell(x - 1, y) && rand2 > 0.1)\r\n//         return [this.world.grid.move_cell, x, y, x - 1, y + 1];\r\n//     } else {\r\n//       const right = g.get_cell(x + 1, y + 1);\r\n//       if (!right && !g.get_cell(x + 1, y) && rand2 > 0.1)\r\n//         return [this.world.grid.move_cell, x, y, x + 1, y + 1];\r\n//     }\r\n//     const rand3 = Math.random();\r\n//     if (rand3 > 0.99) {\r\n//       p.sticky = \"\";\r\n//     }\r\n//   }\r\n// }\r\n\r\n// export class LiquidSolver {\r\n//   constructor(world) {\r\n//     this.world = world;\r\n//   }\r\n//   solve(x, y, p) {\r\n//     if (!p.properties.has(\"liquid\")) return;\r\n//     const g = this.world.grid;\r\n//     const below = g.get_cell(x, y + 1);\r\n//     if (!below) {\r\n//       return [g.move_cell, x, y, x, y + 1];\r\n//     }\r\n//     const left = g.get_cell(x - 1, y);\r\n//     const right = g.get_cell(x + 1, y);\r\n//     if (left && right) return [];\r\n//     if (!p.properties.has(\"flow_left\") && !p.properties.has(\"flow_right\")) {\r\n//       if (Math.random() > 0.5) {\r\n//         p.properties.add(\"flow_left\");\r\n//       } else {\r\n//         p.properties.add(\"flow_right\");\r\n//       }\r\n//     }\r\n//     if (p.properties.has(\"flow_left\") && left) {\r\n//       p.properties.delete(\"flow_left\");\r\n//       p.properties.add(\"flow_right\");\r\n//     }\r\n//     if (p.properties.has(\"flow_right\") && right) {\r\n//       p.properties.delete(\"flow_right\");\r\n//       p.properties.add(\"flow_left\");\r\n//     }\r\n//     if (p.properties.has(\"flow_right\")) {\r\n//       // return [g.move_cell, x, y, x + 1, y];\r\n//       if (!g.get_cell(x + 1, y + 1)) return [g.move_cell, x, y, x + 1, y + 1];\r\n//       return [g.line_move_cell, x, y, x + 1, y];\r\n//     }\r\n//     if (p.properties.has(\"flow_left\")) {\r\n//       // return [g.move_cell, x, y, x - 1, y];\r\n//       if (!g.get_cell(x - 1, y + 1)) return [g.move_cell, x, y, x - 1, y + 1];\r\n//       return [g.line_move_cell, x, y, x - 1, y];\r\n//     }\r\n//     // if (\r\n//     //   (!p.properties.has(\"flow_left\") || g.get_cell(x - 1, y)) &&\r\n//     //   !g.get_cell(x + 1, y)\r\n//     // )\r\n//     //   return [\r\n//     //     () => {\r\n//     //       g.line_move_cell(x, y, x + 3, y);\r\n//     //       p.properties.add(\"flow_right\");\r\n//     //     },\r\n//     //   ];\r\n//     // if (!g.get_cell(x - 1, y))\r\n//     //   return [\r\n//     //     () => {\r\n//     //       g.line_move_cell(x, y, x - 3, y);\r\n//     //       p.properties.add(\"flow_left\");\r\n//     //     },\r\n//     //   ];\r\n//     // if (!g.get_cell(x - 1, y + 1) && !g.get_cell(x - 1, y))\r\n//     //   return [g.move_cell, x, y, x - 1, y + 1];\r\n//     // if (!g.get_cell(x - 1, y)) return [g.move_cell, x, y, x - 1, y];\r\n//     // if (!g.get_cell(x + 1, y + 1) && !g.get_cell(x + 1, y))\r\n//     //   return [g.move_cell, x, y, x + 1, y + 1];\r\n//     // // const right = g.get_cell(x + 1, y);\r\n//     // if (!g.get_cell(x + 1, y)) return [g.move_cell, x, y, x + 1, y];\r\n//   }\r\n// }\r\n\n\n//# sourceURL=webpack:///./src/rules.js?");

/***/ }),

/***/ "./src/world.js":
/*!**********************!*\
  !*** ./src/world.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Grid: () => (/* binding */ Grid),\n/* harmony export */   World: () => (/* binding */ World)\n/* harmony export */ });\n/* harmony import */ var _particle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle.js */ \"./src/particle.js\");\n\r\n\r\nclass Grid {\r\n  constructor(size_x, size_y) {\r\n    this.size_x = size_x;\r\n    this.size_y = size_y;\r\n    this.cells = new Array(size_x * size_y);\r\n    this.cells.fill(null);\r\n    this.deferred = [];\r\n  }\r\n  get_cell(x, y) {\r\n    return this.cells[y * this.size_x + x];\r\n  }\r\n  set_cell(x, y, value) {\r\n    this.cells[y * this.size_y + x] = value;\r\n  }\r\n  swap_cells(x, y, x2, y2) {\r\n    const p1 = this.get_cell(x, y);\r\n    this.set_cell(x, y, this.get_cell(x2, y2));\r\n    this.set_cell(x2, y2, p1);\r\n  }\r\n  move_cell(x, y, x2, y2) {\r\n    if (x >= 0 && x < this.size_x && y >= 0 && y < this.size_y) {\r\n      const p1 = this.get_cell(x, y);\r\n      const p2 = this.get_cell(x2, y2);\r\n      if (!p2) {\r\n        this.set_cell(x2, y2, p1);\r\n        this.set_cell(x, y, null);\r\n      }\r\n    }\r\n  }\r\n  // line_move_cell(x, y, x2, y2) {\r\n  //   const p1 = this.get_cell(x, y);\r\n  //   const [new_x, new_y] = this.line_trace(x, y, x2, y2);\r\n  //   if (!this.get_cell(new_x, new_y)) {\r\n  //     this.set_cell(new_x, new_y, p1);\r\n  //     this.set_cell(x, y, null);\r\n  //   }\r\n  // }\r\n  line_trace(x, y, x2, y2) {\r\n    const dx = x2 - x;\r\n    const dy = y2 - y;\r\n    let steps;\r\n    if (Math.abs(dx) > Math.abs(dy)) {\r\n      steps = Math.abs(dx);\r\n    } else {\r\n      steps = Math.abs(dy);\r\n    }\r\n    const x_inc = dx / Number(steps);\r\n    const y_inc = dy / Number(steps);\r\n    let draw_x = x;\r\n    let draw_y = y;\r\n    let last_x = x;\r\n    let last_y = y;\r\n    for (let i = 0; i < steps; ++i) {\r\n      draw_x = draw_x + x_inc;\r\n      draw_y = draw_y + y_inc;\r\n      if (this.get_cell(draw_x, draw_y)) return [last_x, last_y];\r\n      last_x = draw_x;\r\n      last_y = draw_y;\r\n    }\r\n    return [x2, y2];\r\n  }\r\n  defer(...act) {\r\n    if (act) this.deferred.push(act);\r\n  }\r\n  execute_deferred() {\r\n    for (let i = this.deferred.length - 1; i > 0; --i) {\r\n      const j = Math.floor(Math.random() * (i + 1));\r\n      [this.deferred[i], this.deferred[j]] = [\r\n        this.deferred[j],\r\n        this.deferred[i],\r\n      ];\r\n    }\r\n    for (let [func, ...args] of this.deferred) {\r\n      func.call(this, ...args);\r\n    }\r\n    this.deferred = [];\r\n  }\r\n}\r\n\r\nclass World {\r\n  constructor(size_x, size_y) {\r\n    this.grid = new Grid(size_x, size_y);\r\n    this.dynamic_particles = [];\r\n    this.rules = [];\r\n    this.last_frame_time = performance.now();\r\n    // this.add_particle(5, 5, new Particle(new Color(50, 50, 50), [\"falling\"]));\r\n    for (let i = 0; i < size_x; ++i) {\r\n      this.add_particle(i, size_y - 1, new _particle_js__WEBPACK_IMPORTED_MODULE_0__.Particle(new _particle_js__WEBPACK_IMPORTED_MODULE_0__.Color(50, 50, 50), []));\r\n    }\r\n  }\r\n  add_rule(rule) {\r\n    this.rules.push(rule);\r\n  }\r\n\r\n  add_particle(x, y, particle) {\r\n    this.grid.set_cell(x, y, particle);\r\n    this.dynamic_particles.push({ x: x, y: y, particle: particle });\r\n  }\r\n  step() {\r\n    const now = performance.now();\r\n    const elapsed = now - this.last_frame_time;\r\n    if (elapsed < 10) return;\r\n    this.last_frame_time = now;\r\n    for (let rule of this.rules) {\r\n      for (let x = 0; x < this.grid.size_x; ++x) {\r\n        for (let y = 0; y < this.grid.size_y; ++y) {\r\n          const p = this.grid.get_cell(x, y);\r\n          if (p) rule.apply(x, y, p);\r\n        }\r\n      }\r\n    }\r\n    for (let x = 0; x < this.grid.size_x; ++x) {\r\n      for (let y = 0; y < this.grid.size_y; ++y) {\r\n        const p = this.grid.get_cell(x, y);\r\n        if (p)\r\n          if ((p && p.vel_x !== 0) || p.vel_y !== 0) {\r\n            const [nx, ny] = this.grid.line_trace(\r\n              x,\r\n              y,\r\n              x + p.vel_x,\r\n              y + p.vel_y\r\n            );\r\n            this.grid.defer(this.grid.move_cell, x, y, nx, ny);\r\n          }\r\n      }\r\n    }\r\n    this.grid.execute_deferred();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/world.js?");

/***/ }),

/***/ "./src/world_renderer.js":
/*!*******************************!*\
  !*** ./src/world_renderer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WorldRenderer: () => (/* binding */ WorldRenderer)\n/* harmony export */ });\nclass WorldRenderer {\r\n  constructor(ctx, world) {\r\n    this.world = world;\r\n    this.ctx = ctx;\r\n  }\r\n\r\n  render(ctx) {\r\n    const s_x = this.world.grid.size_x;\r\n    const s_y = this.world.grid.size_y;\r\n    const imageData = this.ctx.createImageData(s_x, s_y);\r\n\r\n    for (let x = 0; x < s_x; x++) {\r\n      for (let y = 0; y < s_y; y++) {\r\n        const id = y * s_x + x;\r\n        // imageData.data[id * 4] = 50;\r\n        const particle = this.world.grid.get_cell(x, y);\r\n        if (particle) {\r\n          imageData.data[id * 4 + 0] = particle.color.r;\r\n          imageData.data[id * 4 + 1] = particle.color.g;\r\n          imageData.data[id * 4 + 2] = particle.color.b;\r\n          imageData.data[id * 4 + 3] = 255;\r\n        } else {\r\n          imageData.data[id * 4 + 0] = 200;\r\n          imageData.data[id * 4 + 1] = 200;\r\n          imageData.data[id * 4 + 2] = 200;\r\n          imageData.data[id * 4 + 3] = 255;\r\n        }\r\n      }\r\n    }\r\n\r\n    this.ctx.putImageData(imageData, 0, 0);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/world_renderer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;