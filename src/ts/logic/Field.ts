import {Cell, FieldMatrix, GameSetting, CellState} from './logic'

class Field {
	private fieldMatrix: FieldMatrix;
	
	constructor(private settings: GameSetting) {
		this.fieldMatrix = new FieldMatrix(settings.xCount, settings.yCount);
	}
	
	public onCellChange(x: number, y: number): void {}
	
	public generateBombCount(): void {
		this.forEachField((x, y, cell) => {
			var cell = this.getCellAt(x, y);
			var count = this.getBombCountAround(x, y);
			cell.setBombCount(count);
			this.setCell(x, y, cell);
		});
	}
	
	public onCellClick(x: number, y: number, placeFlag: boolean) {
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
			
			if (cell.getBombCount() == 0 && cell.getState() == CellState.Clicked && !placeFlag) {
				
				for (var xi = -1; xi <= 1; xi++) 
					for (var yi = -1; yi <= 1; yi++)
						if (!(xi === x && yi === y))
							this.onCellClick(xi + x, yi + y, false);
						
			}
		}
	}
	
	public getXCellCount(): number {
		return this.settings.xCount;
	}
	
	public getYCellCount(): number {
		return this.settings.yCount;
	}
	
	public setCell(x: number, y: number, cell: Cell): boolean {
		this.fieldMatrix.setCellAt(x, y, cell);
		
		return true;
	}
	
	public forEachField(action: (x: number, y: number, cell: Cell) => void): void {
		for (var x = 0; x < this.getXCellCount(); x++)
			for (var y = 0; y < this.getYCellCount(); y++)
				action(x, y, this.fieldMatrix.getCellAt(x, y));		
	}
	
	public getCellAt(x: number, y: number): Cell {
		return this.fieldMatrix.getCellAt(x, y);
	}
	
	private getBombCountAround(x: number, y: number): number {
		var count = 0;
		
		for (var xi = -1; xi <= 1; xi ++)
			for (var yi = -1; yi <= 1; yi ++)
				if (x !== xi && y !== yi && !this.fieldMatrix.getCellAt(xi, yi).getIsBomb()) {
					var cell = this.getCellAt(x + xi, y + yi);
					if (cell)
						count += (cell.getIsBomb() ? 1 : 0);		
				}
			
		return count;
	}
}

export {Field}