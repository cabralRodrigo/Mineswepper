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
		this.canvas.height = field.getYCellCount() * this.setting.yCell;
		this.canvas.width = field.getXCellCount() * this.setting.xCell;
		
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0, 0, field.getXCellCount() * this.setting.xCell, field.getYCellCount() * this.setting.yCell);	
		 
		field.forEachField((x, y, cell) => this.cellRenderer.render(x, y, cell));
	}
	
	public renderAt(field: Field, x: number, y: number) {
		var cell = field.getCellAt(x, y);
		if (cell)
			this.cellRenderer.render(x, y, cell);
	}
}

export {GameRenderer}