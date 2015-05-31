import {GameSetting} from './logic'

enum CellState {
	Hidden,
	Flaged,
	Clicked
}

class Cell {
	private state: CellState;
	private bombCount: number;
	private isBomb: boolean;
	
	constructor() {
		this.state = CellState.Hidden;
		this.bombCount = 0;
		this.isBomb = false;
	}
	
	public static createRandomCell(setting: GameSetting): Cell {
		var cell = new Cell();
		cell.setIsBomb(Math.random() >= setting.bombFactor);
		
		return cell;
	}
	
	public getState(): CellState {
		return this.state;
	}
	
	public setState(state: CellState): void {
		this.state = state;
	}
	
	public getBombCount(): number {
		return this.bombCount;
	}
	
	public setBombCount(bombCount: number): void {
		this.bombCount = bombCount;
	}
	
	public getIsBomb(): boolean {
		return this.isBomb;
	}
	
	public setIsBomb(isBomb: boolean): void {
		this.isBomb = isBomb;
	}
}

export { Cell, CellState };