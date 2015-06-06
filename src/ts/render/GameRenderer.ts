import {Field, GameSetting} from './../logic/logic'
import {CellRenderer} from './cellrenderer'

class GameRenderer {
	private cellRenderer : CellRenderer;
	private ctx : CanvasRenderingContext2D;
	
	constructor(private canvas: HTMLCanvasElement, private setting: GameSetting) {		
		this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
		this.cellRenderer = new CellRenderer(this.ctx, setting);
	}
		
	public render(field: Field): void {
		this.canvas.height = field.getYCellCount() * this.setting.cellHeight;
		this.canvas.width = field.getXCellCount() * this.setting.cellWidth;
		
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0, 0, field.getXCellCount() * this.setting.cellWidth, field.getYCellCount() * this.setting.cellHeight);	
		 
		field.forEachField((x, y, cell) => this.cellRenderer.renderCell(x, y, cell));
	}
	
	public renderAt(field: Field, x: number, y: number) {
		var cell = field.getCellAt(x, y);
		if (cell)
			this.cellRenderer.renderCell(x, y, cell);
	}
}

export {GameRenderer}