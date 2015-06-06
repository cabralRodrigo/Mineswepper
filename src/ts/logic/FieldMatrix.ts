import {Cell} from './logic'

class FieldMatrix {
	
	private matrix: {[x: number]: {[y: number]: Cell}};
	
	/**
	 * Creates an new instance of the FieldMatrix class
	 */
	constructor(x: number, y: number) {
		this.matrix = {};
	}
	
	/**
	 * Sets a cell on the matrix
	 * @param x The index of the cell on the X axis
	 * @param y The index of the cell on the Y axis
	 * @param cell The cell to be setted on the matrix
	 */
	public setCellAt(x: number, y: number, cell: Cell): void {
		this.matrix[x] = this.matrix[x] || {};
		this.matrix[x][y] = cell;
	}
	
	/**
	 * Gets a cell on the matrix
	 * @param x The index of the cell on the X axis
	 * @param y The index of the cell on the Y axis
	 * @returns The cell if it exists on the matrix, undefined the the cell does not exists 
	 */
	public getCellAt(x: number, y: number): Cell {
		if (this.matrix[x])
			return this.matrix[x][y];
		else
			return void 0;
	}
}

export {FieldMatrix}