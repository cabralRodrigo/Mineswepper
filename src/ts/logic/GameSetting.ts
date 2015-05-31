class GameSetting {
	constructor(public bombFactor: number, public xCount: number, public yCount: number, public xCell: number, public yCell: number) {}
}

var settings = {
	easy: new GameSetting(0.8, 10, 10, 50, 50),
	medium: new GameSetting(0.8, 10, 10, 50, 50),
	hard: new GameSetting(0.9, 53, 24, 25, 25)
};

export {settings as GameSettings, GameSetting}