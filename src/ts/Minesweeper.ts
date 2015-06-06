import {Cell, Field, CellState, InputHandler, GameSettings, GameSetting} from './logic/Logic'
import {GameRenderer} from './render/GameRenderer'

class Minesweeper {
	private field: Field;
	private renderer: GameRenderer;
	private inputHandler: InputHandler;
	private canvas: HTMLCanvasElement;
	
	/**
	 * Creates an new instance of the Minesweeper class (or game, haha)
	 * @param canvasId The canvas id to render the game
	 * @param setting The setting to create the game
	 */
	constructor(canvasId: string, private setting: GameSetting) {
		this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
		this.field = new Field(setting);
		this.renderer = new GameRenderer(this.canvas, setting);
		this.inputHandler = new InputHandler(this.canvas, this.field, setting);
		
		this.generateField();		
		this.field.onCellChange = (x, y) => this.renderer.renderAt(this.field, x, y);
	}
	
	/**
	 * Generate the field of the game
	 */
	private generateField(): void {
		for (var x = 0; x < this.field.getXCellCount(); x++)
			for (var y = 0; y < this.field.getYCellCount(); y++) {
				var cell = Cell.createRandomCell(this.setting);
				this.field.setCell(x, y, cell);
			}
			
		this.field.generateBombCount();
	}
	
	/**
	 * Updates the game
	 */
	public update(): void {
		this.renderer.render(this.field);
	}
}

export {Minesweeper, GameSettings}