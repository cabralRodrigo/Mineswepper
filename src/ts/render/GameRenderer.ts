import {Field, GameSetting} from './../logic/logic'
import {CellRenderer} from './cellrenderer'

class GameRenderer {
	private cellRenderer : CellRenderer;
	private ctx : CanvasRenderingContext2D;
	
	/**
	 * Creates an new instace of the GameRenderer class
	 * @param canvas The canvas to render the gamme
	 * @param setting The settings for the current game
	 */
	constructor(private canvas: HTMLCanvasElement, private setting: GameSetting) {		
		this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
		this.cellRenderer = new CellRenderer(this.ctx, setting);
	}
		
	/**
	 * Renders the game
	 * @param field The field of the game
	 */
	public render(field: Field): void {
		this.canvas.height = field.getYCellCount() * this.setting.cellHeight;
		this.canvas.width = field.getXCellCount() * this.setting.cellWidth;
		
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0, 0, field.getXCellCount() * this.setting.cellWidth, field.getYCellCount() * this.setting.cellHeight);	
		 
		field.forEachField((x, y, cell) => this.cellRenderer.renderCell(x, y, cell));
	}
	
	/**
	 * Renders the an specific cell on a field
	 * @param field The field to render the cell
	 * @param x The number of the cell on the X axis
	 * @param y The number of the cell on the Y axis 
	 */
	public renderAt(field: Field, x: number, y: number) {
		var cell = field.getCellAt(x, y);
		if (cell)
			this.cellRenderer.renderCell(x, y, cell);
	}
}

export {GameRenderer}