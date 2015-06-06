import {Minesweeper, GameSettings} from './Minesweeper'

var game = new Minesweeper('canvas', GameSettings.hard);
var btn = document.getElementById('btn');

game.update();