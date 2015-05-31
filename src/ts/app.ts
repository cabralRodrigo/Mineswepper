import {Minesweeper, GameSettings} from './Minesweeper'

var game = new Minesweeper('canvas', GameSettings.hard);
var btn = document.getElementById('btn');

btn.onclick = (e) => {
	game.update();
};