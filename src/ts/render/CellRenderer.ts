import {Cell, CellState, GameSetting} from './../logic/logic'

class CellRenderer {
	private colors: {[count: number] : string} = [];
	
	/**
	 * Creates an new instance of the CellRenderer class
	 * @param ctx The context 2D of a canvas to render the cells
	 * @param setting The settings of the current game 
	 */
	constructor(private ctx: CanvasRenderingContext2D, private setting: GameSetting) {
		this.colors[0] = "black";
		this.colors[1] = "blue";
		this.colors[2] = "green";
		this.colors[3] = "purple";
		this.colors[4] = "red";
		this.colors[5] = "black";
		this.colors[6] = "brown";
		this.colors[7] = "black";
		this.colors[8] = "black";
	}
	
	/**
	 * Renders a cell
	 * @param x The index of the cell to render on the X axis
	 * @param y The index of the cell to render on the Y axis
	 * @param cell The cell to render
	 */
	public renderCell(x: number, y: number, cell: Cell): void {
		var xSize = this.setting.cellWidth, ySize = this.setting.cellHeight;	
		var img = this.getTexture(cell);	
			
		
		//TODO: Stop load the image on each render cycle
		img.onload = () => {		
			this.ctx.drawImage(img, x * xSize, y * ySize, xSize, ySize);
			if (cell.getState() == CellState.Clicked && !cell.getIsBomb() && cell.getBombCount() > 0) {
				this.ctx.fillStyle = this.colors[cell.getBombCount()];
				this.ctx.strokeStyle = "black";
				this.ctx.font = "25px Arial";
				var t = this.ctx.measureText(cell.getBombCount().toString()).width;
				
				this.ctx.fillText(cell.getBombCount().toString(), x * xSize + xSize / 2 - t / 2, (y + 1) * ySize - 3);
			}
		};
	}
	
	/**
	 * Gets a texture for a cell
	 * @param cell The cell to get the texture
	 */
	private getTexture(cell: Cell) : HTMLImageElement {
		
		var img = new Image();
		var state = cell.getState();
		
		if (state == CellState.Hidden)
			img.src = './../assets/cell_base.png';
		else if (state == CellState.Flaged)
			img.src = './../assets/cell_flag.png';
		else if (state == CellState.Clicked) {
			if (cell.getIsBomb())
				img.src = './../assets/cell_mine.png';
			else
				img.src = './../assets/cell_clicked.png';
		}
		
		return img;
	}
}

export {CellRenderer}