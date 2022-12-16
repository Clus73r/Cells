export class Grid {
    constructor(size_x, size_y){
        this.size_x = size_x;
        this.size_y = size_y;
        this.cells = new Array(size_x * size_y);
    }
    get_cell(x, y){
        return this.cells[y * this.size_x + x];
    }
    set_cell(x, y, value){
        this.cells[y * this.size_y + x] = value;
    }
}

export class World {
    constructor(size_x, size_y){
        this.grid = new Grid(size_x, size_y);
    }
}