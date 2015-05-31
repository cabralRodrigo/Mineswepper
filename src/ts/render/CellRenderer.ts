import {Cell, CellState, GameSetting} from './../logic/logic'
import {Q} from './../libs/lib'

class CellRenderer {
	private colors: {[count: number] : string} = [];
	
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
	
	render(x: number, y: number, cell: Cell): void {
		var xSize = this.setting.xCell, ySize = this.setting.yCell;	
		var img = this.getImageFromCell(cell);	
			
		img.onload = () => {		
			this.ctx.drawImage(img, x * xSize, y * ySize, xSize, ySize);
			if (cell.getState() == CellState.Clicked && !cell.getIsBomb()) {
				this.ctx.fillStyle = this.colors[cell.getBombCount()];
				this.ctx.strokeStyle = "black";
				this.ctx.font = "25px Arial";
				var t = this.ctx.measureText(cell.getBombCount().toString()).width;
				
				this.ctx.fillText(cell.getBombCount().toString(), x * xSize + xSize / 2 - t / 2, (y + 1) * ySize - 3);
			}
		};
	}
	
	private getImageFromCell(cell: Cell) : HTMLImageElement {
		
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
		
		
		//if (cell.getIsBomb())
		//	img.src = './../assets/cell_mine.png';
		
		return img;
		

		var state = cell.getState();
		if (state == CellState.Hidden)
			return CellRenderer.cell_base;
		else if (state == CellState.Flaged)
			return CellRenderer.cell_flag;
		else if (state == CellState.Clicked) {
			if (cell.getIsBomb())
				return CellRenderer.cell_mine;
			else
				return CellRenderer.cell_clicked;
		}
		
		
	}
	
	private static cell_base: HTMLImageElement = CellRenderer.loadImage('cell_base');
	private static cell_flag: HTMLImageElement = CellRenderer.loadImage('cell_flag');
	private static cell_mine: HTMLImageElement = CellRenderer.loadImage('cell_mine');
	private static cell_clicked: HTMLImageElement = CellRenderer.loadImage('cell_clicked');
	
	
	private static loadImage(fileName: string): HTMLImageElement {
		var img = new Image();
		img.src = `./../assets/${fileName}.png`;
		return img;
	}
}

export {CellRenderer}