import {Field, Cell, FieldMatrix, CellState, GameSetting} from './logic'

class InputHandler {
	constructor(canvas: HTMLCanvasElement, field: Field, private setting: GameSetting) {
		canvas.onmousedown = e => {
			
			
			if (e.button == 2 && e.shiftKey)
				return;
			
			var {x, y} = this.processClickCoords(e.clientX, e.clientY);
			var cell = field.getCellAt(x, y);
			
			if (cell)
				field.onCellClick(x, y, e.button == 2);		
		};
		
		canvas.oncontextmenu = e => {
			if (!e.shiftKey)
				e.preventDefault();
		};
	}
	
	private processClickCoords(clickX: number, clickY: number) {
		var x = Math.ceil(clickX / this.setting.xCell) - 1, y = Math.ceil(clickY / this.setting.yCell) - 1;
		return {x: x, y: y}
	}
}

export {InputHandler}