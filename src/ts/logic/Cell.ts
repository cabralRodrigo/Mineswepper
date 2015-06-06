import {GameSetting} from './logic'

/**
 * The states that a cell can have
 */
enum CellState {
	/**
	 * The cell has this state when the player not yet clicked on it 
	 */
	Hidden,
	
	/**
	 * The cell has this state when the player placed a flag on it
	 */
	Flaged,
	
	/**
	 * The cell has this state when the player clicked on it
	 */
	Clicked
}

class Cell {
	private state: CellState;
	private bombCount: number;
	private isBomb: boolean;
	
	/**
	 * Create an new instance of the Cell class
	 */
	constructor() {
		this.state = CellState.Hidden;
		this.bombCount = 0;
		this.isBomb = false;
	}
	
	/**
	 * Creates a cell with random properties
	 * @param setting The game setting to randomize the creation of the cell
	 * @returns A new cell
	 */
	public static createRandomCell(setting: GameSetting): Cell {
		var cell = new Cell();
		cell.setIsBomb(Math.random() >= setting.bombFactor);
		
		return cell;
	}
	
	/**
	 * Get the current state of the cell
	 * @returns The state of the cell
	 */
	public getState(): CellState {
		return this.state;
	}
	
	/**
	 * Set the current state of the cell
	 * @param state The new state of the cell
	 */
	public setState(state: CellState): void {
		this.state = state;
	}
	
	/**
	 * Get the sum of all cells that have bombs around the cell
	 * @returns The count of bombs around the cell
	 * TODO: Move this logic of the FieldMatrix class
	 */
	public getBombCount(): number {
		return this.bombCount;
	}
	
	/**
	 * Set the sum of all cells that have bombs around the cell
	 * @param bombCount The new count of bombs around the cell
	 * TODO: Move this logic of the FieldMatrix class
	 */
	public setBombCount(bombCount: number): void {
		this.bombCount = bombCount;
	}
	
	/**
	 * Get the flag indicating if the cell is a bomb
	 * @returns Boolean indicating if the cell is a bomb
	 */
	public getIsBomb(): boolean {
		return this.isBomb;
	}
	
	/**
	 * Set if the cell is a bomb
	 * @param isBomb Boolean indicating if the cell is a bomb or not
	 */
	public setIsBomb(isBomb: boolean): void {
		this.isBomb = isBomb;
	}
}

export { Cell, CellState };