class GameSetting {
	constructor(
		/**
		 * The factor to control how common the bombs will be on the game's field
		 */
		public bombFactor: number, 
		
		/**
		 * The total of cells that the game will have on the X axis
		 */
		public xSize: number, 
		
		/**
		 * The total of cells that the game will have on the Y axis
		 */
		public ySize: number, 
		
		/**
		 * The width (in pixels) of the cells
		 */
		public cellWidth: number, 
		
		/**
		 * The height (in pixels) of the cells
		 */
		public cellHeight: number
		) {}
}

/**
 * TODO: Define the real values of the pre-defined settings
 */
var settings = {
	easy: new GameSetting(0.8, 10, 10, 50, 50),
	medium: new GameSetting(0.8, 10, 10, 50, 50),
	hard: new GameSetting(0.9, 53, 24, 25, 25)
};

export {settings as GameSettings, GameSetting}