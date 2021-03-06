import {Cell, GameSetting, CellState} from './logic'

class Matrix2D<T> {
	private matrix: {[x: number]: {[y: number]: T}};
	
	/**
	 * Creates an new instance of the Matrix2D class
	 */
	constructor() {
		this.matrix = {};
	}
	
	/**
	 * Sets an item on the matrix
	 * @param x The index of the item on the X axis
	 * @param y The index of the item on the Y axis
	 * @param item The item to be setted on the matrix
	 */
	public setItem(x: number, y: number, item: T): void {
		this.matrix[x] = this.matrix[x] || {};
		this.matrix[x][y] = item;
	}
	
	/**
	 * Gets an item on the matrix
	 * @param x The index of the item on the X axis
	 * @param y The index of the item on the Y axis
	 * @returns The item if it exists on the matrix, undefined if the item does not exists 
	 */
	public getItem(x: number, y: number): T {
		if (this.matrix[x])
			return this.matrix[x][y];
		else
			return void 0;
	}
}

class Field {
	private matrix: Matrix2D<Cell>;
	
	/**
	 * Creates an new instance of the Field class
	 * @param settings The game settings for create the field
	 */
	constructor(private settings: GameSetting) {
		this.matrix = new Matrix2D<Cell>();
	}
	
	/**
	 * Function that is called when some cell changed on the field
	 * @param x The number of the cell on the X axis
	 * @param y The number of the cell on the Y axis
	 */
	public onCellChange(x: number, y: number): void { }
	
	/**
	 * Generates the bomb count of each cell on the field (calculates the sum of the cells that has a bomb around each cell) and sets this information on each cell
	 */
	public generateBombCount(): void {
		this.forEachField((x, y, cell) => {
			var cell = this.getCellAt(x, y);
			var count = this.getBombCountAround(x, y);
			cell.setBombCount(count);
			this.setCell(x, y, cell);
		});
	}
	
	/**
	 * Function called when the player clicked on a cell
	 * @param x The number of the cell on the X axis
	 * @param y The number of the cell on the Y axis
	 * @param placeFlag Boolean indicating if the player clicked on the cel to place a flag
	 */
	public onCellClick(x: number, y: number, placeFlag: boolean): void {
		var cell = this.getCellAt(x, y);
		
		if (!cell)
			return;
		
		var updateCell = false;
		
		if (cell.getState() == CellState.Hidden) {
			if (placeFlag)
				cell.setState(CellState.Flaged);
			else 
				cell.setState(CellState.Clicked);			
			updateCell = true;			
			
		} else if (cell.getState() == CellState.Flaged && placeFlag) {
			cell.setState(CellState.Hidden);
			updateCell = true;
		}
		
		if (updateCell) {
			this.setCell(x, y, cell);
			this.onCellChange(x, y);
			
			if (cell.getBombCount() == 0 && cell.getState() == CellState.Clicked && !placeFlag)				
				for (var xi = -1; xi <= 1; xi++) 
					for (var yi = -1; yi <= 1; yi++)
						if (xi !== x && yi !== y) {
							let cell = this.getCellAt(xi + x, yi + y);
							if (cell && !cell.getIsBomb())
								this.onCellClick(xi + x, yi + y, false);
						}
									
		}
	}
	
	/**
	 * Gets the total of cells on the X axis of the field
	 * @returns The total of cells on the X axis of the field
	 */
	public getXCellCount(): number {
		return this.settings.xSize;
	}
	
	/**
	 * Gets the total of cells on the Y axis of the field
	 * @returns The total of cells on the Y axis of the field
	 */
	public getYCellCount(): number {
		return this.settings.ySize;
	}
	
	/**
	 * Sets a cell on the field
	 * @param x The number of the cell to set on the X axis
	 * @param y The number of the cell to set on the Y axis
	 * @param cell The cell to set on the field
	 */
	public setCell(x: number, y: number, cell: Cell): void {
		this.matrix.setItem(x, y, cell);
	}
	
	/**
	 * Iterates on each cell on the field
	 * @param action A function that will be executed for each cell on the field
	 */
	public forEachField(action: (x: number, y: number, cell: Cell) => void): void {
		for (var x = 0; x < this.getXCellCount(); x++)
			for (var y = 0; y < this.getYCellCount(); y++)
				action(x, y, this.matrix.getItem(x, y));		
	}
	
	/**
	 * Gets a cell on the field
	 * @param x The number of the cell on the X axis
	 * @param y The number of the cell ont the Y axis
	 * @returns The cell if it exists on the field, undefined if the cell does not exists
	 */
	public getCellAt(x: number, y: number): Cell {
		return this.matrix.getItem(x, y);
	}
	
	/**
	 * Gets the total of cells that have a bomb around another cell
	 * @param The number of the cell on the X axis
	 * @param The number of the cell on the Y axis
	 * @returns The tottal of cell that have a bomb
	 */
	private getBombCountAround(x: number, y: number): number {
		var count = 0;
		
		for (var xi = -1; xi <= 1; xi ++)
			for (var yi = -1; yi <= 1; yi ++)
				if (x !== xi && y !== yi) {
					var cell = this.getCellAt(x + xi, y + yi);
					if (cell)
						count += (cell.getIsBomb() ? 1 : 0);		
				}
			
		return count;
	}
}

export {Field}