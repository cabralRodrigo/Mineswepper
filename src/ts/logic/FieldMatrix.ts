import {Cell} from './logic'

class FieldMatrix {
	
	private matrix: {[x: number]: {[y: number]: Cell}};
	
	constructor(x: number, y: number) {
		this.matrix = {};
	}
	
	public setCellAt(x: number, y: number, cell: Cell): void {
		this.matrix[x] = this.matrix[x] || {};
		this.matrix[x][y] = cell;
	}
	
	public getCellAt(x: number, y: number): Cell {
		if (this.matrix[x])
			return this.matrix[x][y];
		else
			return void 0;
	}
}

export {FieldMatrix}