import {Field, Cell, FieldMatrix, CellState, GameSetting} from './logic'

class InputHandler {
	
	/**
	 * Creates an new instance of the InputHandler class
	 * @param canvas A canvas reference for listening the input events
	 * @param field A Field instance for propagate the input events
	 * @param setting The settings for the current game
	 */
	constructor(canvas: HTMLCanvasElement, field: Field, private setting: GameSetting) {
		canvas.onmousedown = e => {		
			if (e.button == 2 && e.shiftKey)
				return;
			
			var {x, y} = this.convertToFieldsCoords(e.clientX, e.clientY);
			var cell = field.getCellAt(x, y);
			
			if (cell)
				field.onCellClick(x, y, e.button == 2);		
		};
		
		canvas.oncontextmenu = e => {
			if (!e.shiftKey)
				e.preventDefault();
		};
	}
	
	/**
	 * Gets the coordinates of an click event on the canvas and converts to fields coordinates
	 */
	private convertToFieldsCoords(clickX: number, clickY: number) {
		var x = Math.ceil(clickX / this.setting.cellWidth) - 1, y = Math.ceil(clickY / this.setting.cellHeight) - 1;
		return {x: x, y: y}
	}
}

export {InputHandler}