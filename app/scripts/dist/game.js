(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _wsClient = require('./ws-client');

var _wsClient2 = _interopRequireDefault(_wsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = window.jQuery;

var CREATE_BOARD_BUTTON_SELECTOR = '[data-name="create_board_button"]';
var SAVE_BOARD_BUTTON_SELECTOR = '[data-name="save_board_button"]';
var LOAD_BOARD_BUTTON_SELECTOR = '[data-name="load_board_button"]';
var ROLL_INITIATIVE_BUTTON_SELECTOR = '[data-name="roll_initiative_button"]';

var BOARD_SIZE_INPUT_SELECTOR = '[data-name="board_size_input"]';
var SAVE_NAME_INPUT_SELECTOR = '[data-name="save_name_input"]';

var SERVER_ADDRESS = location.origin.replace(/^http/, 'ws');

var my_name = JSON.parse(sessionStorage.getItem('username'));
var my_role = JSON.parse(sessionStorage.getItem('user_role'));

var character_list = [];
var character_detailed_info = [];
var obstacle_list = [];
var obstacle_detailed_info = [];

var TINY_EFFECT_CLASS = 'is-tiny';

var EMPTY_CELL_PIC = "./images/square.jpg";

// This is a constant, will be moved to database later
var HP_values = [15, 30, 40, 55, 75, 100, 130, 165];

var board_state = [];
var HP_state = [];
var initiative_state = [];
var size = void 0;

var character_base = [];
var obstacle_base = [];

var field_chosen = 0;
var chosen_index = void 0;
var chosen_character_index = void 0;
var chosen_character_HP = void 0;
var chosen_character_initiative = void 0;

function createBoard() {
	size = document.getElementById("board_size").value;
	board_state = [];
	HP_state = [];
	initiative_state = [];
	for (var i = 0; i < size * size; i++) {
		board_state.push(0);
	}
	send_construct_command(board_state, size, HP_state, initiative_state);
}

function loadBoard() {
	var name = document.getElementById("map_name").value;
	var toSend = {};
	toSend.command = 'load_game';
	toSend.save_name = name;
	toSend.from_name = my_name;
	_wsClient2.default.sendMessage(toSend);
}

function send_construct_command(new_board_state, new_size, new_HP_state, new_initiative_state) {
	var toSend = {};
	toSend.command = 'construct_board';
	toSend.board_state = new_board_state;
	toSend.size = new_size;
	toSend.HP_state = new_HP_state;
	toSend.initiative_state = new_initiative_state;
	_wsClient2.default.sendMessage(toSend);
}

function construct_board(new_board_state, new_size, new_HP_state, new_initiative_state) {
	board_state = new_board_state;
	HP_state = new_HP_state;
	initiative_state = new_initiative_state;
	size = new_size;

	var info_container = document.getElementById("character-info-container");
	info_container.innerHTML = "";

	var board_container = document.getElementById("board-container");
	board_container.innerHTML = "";
	var board = document.createElement("table");
	board.className = "board";

	for (var i = 0; i < size; i++) {
		var row = document.createElement("tr");
		row.className = "board_row";
		for (var j = 0; j < size; j++) {
			var button = document.createElement("IMG");
			var cell_id = i * size + j;
			button.id = "cell_" + cell_id;
			button.row = i;
			button.column = j;
			var image_name = get_object_picture(board_state[cell_id]);
			button.src = image_name;
			button.style.width = '50px';
			button.style.height = '50px';
			button.className = 'board_cell';
			button.onclick = function (event) {
				var character_profile_container = document.getElementById("character-info-container");
				character_profile_container.innerHTML = "";

				var cell = event.target;
				var index = cell.row * size + cell.column;
				if (board_state[index] == 0) {
					// empty cell clicked
					if (field_chosen == 0) {
						add_object(index);
					} else {
						move_character(index, cell);
					}
				} else if (board_state[index] > 0) {
					// character clicked
					if (field_chosen == 0) {
						select_character(index, cell);
					} else {
						undo_selection();
					}
				} else {
					// obstacle clicked
					if (field_chosen == 0) {
						select_obstacle(index, cell);
					} else {
						undo_selection();
					}
				}
			};
			var cell_wrap = document.createElement("th");
			cell_wrap.appendChild(button);
			cell_wrap.className = "cell_wrap";
			row.appendChild(cell_wrap);
		}
		board.appendChild(row);
	}
	board_container.appendChild(board);
}

function add_object(board_index) {
	var container = document.getElementById("character-info-container");
	container.innerHTML = "";

	var button_container = document.createElement("div");
	button_container.className = "add-object-button-container";

	var button_add_character = document.createElement("button");
	button_add_character.innerHTML = "Добавить персонажа";
	button_add_character.onclick = function () {
		add_character(board_index);
	};

	var button_add_obstacle = document.createElement("button");
	button_add_obstacle.innerHTML = "Добавить препятствие";
	button_add_obstacle.onclick = function () {
		add_obstacle(board_index);
	};

	button_container.appendChild(button_add_character);
	button_container.appendChild(button_add_obstacle);
	container.appendChild(button_container);

	tiny_animation(container);
}

function tiny_animation(container) {
	container.classList.add(TINY_EFFECT_CLASS);
	setTimeout(function () {
		container.classList.remove(TINY_EFFECT_CLASS);
	}, 50);
}

function add_obstacle(board_index) {
	var container = document.getElementById("character-info-container");
	container.innerHTML = "";

	var select = document.createElement("select");
	select.id = "obstacle_chosen";

	for (var i = 0; i < obstacle_list.length; i++) {
		var current_option = document.createElement("option");
		current_option.innerHTML = obstacle_list[i];
		current_option.value = i;
		select.appendChild(current_option);
	}

	var button = document.createElement("button");
	button.innerHTML = "Добавить";
	button.board_index = board_index;
	button.onclick = function (event) {
		var button = event.target;
		var obstacle_number = parseInt(document.getElementById("obstacle_chosen").value);

		var toSend = {};
		toSend.command = 'add_obstacle';
		toSend.cell_id = button.board_index;
		toSend.obstacle_number = obstacle_number + 1;
		toSend.obstacle_name = obstacle_list[obstacle_number];
		_wsClient2.default.sendMessage(toSend);

		var container = document.getElementById("character-info-container");
		container.innerHTML = "";
	};

	container.appendChild(select);
	container.appendChild(button);
	tiny_animation(container);
}

function add_character(board_index) {
	var container = document.getElementById("character-info-container");
	container.innerHTML = "";

	var select = document.createElement("select");
	select.id = "character_chosen";

	for (var i = 0; i < character_list.length; i++) {
		var current_option = document.createElement("option");
		current_option.innerHTML = character_list[i];
		current_option.value = i;
		select.appendChild(current_option);
	}

	var button = document.createElement("button");
	button.innerHTML = "Добавить";
	button.board_index = board_index;
	button.onclick = function (event) {
		var button = event.target;
		var character_number = parseInt(document.getElementById("character_chosen").value);

		var toSend = {};
		toSend.command = 'add_character';
		toSend.cell_id = button.board_index;
		toSend.character_number = character_number + 1;
		toSend.character_name = character_list[character_number];
		_wsClient2.default.sendMessage(toSend);

		var container = document.getElementById("character-info-container");
		container.innerHTML = "";
	};

	container.appendChild(select);
	container.appendChild(button);
	tiny_animation(container);
}

function move_character(to_index, to_cell) {
	field_chosen = 0;
	var toSend = {};
	toSend.command = 'move_character';
	toSend.from_index = chosen_index;
	toSend.to_index = to_index;
	toSend.character_number = chosen_character_index;
	toSend.character_hp = chosen_character_HP;
	toSend.character_initiative = chosen_character_initiative;
	toSend.character_avatar = character_detailed_info[chosen_character_index].avatar;
	_wsClient2.default.sendMessage(toSend);
}

function select_character(index, cell) {
	var character = character_detailed_info[board_state[index]];

	var name = character.name;
	var avatar = character.avatar;

	var container = document.getElementById("character-info-container");
	container.innerHTML = "";

	var name_display = document.createElement("h2");
	name_display.innerHTML = name;

	var avatar_display = document.createElement("IMG");
	avatar_display.src = avatar;
	avatar_display.style.width = '250px';
	avatar_display.style.height = '250px';

	var strength_display = document.createElement("h2");
	strength_display.innerHTML = "Cила: " + character.strength;

	var stamina_display = document.createElement("h2");
	stamina_display.innerHTML = "Телосложение: " + character.stamina;

	var agility_display = document.createElement("h2");
	agility_display.innerHTML = "Ловкость: " + character.agility;

	var intelligence_display = document.createElement("h2");
	intelligence_display.innerHTML = "Интеллект: " + character.intelligence;

	var HP_display = document.createElement("h2");
	HP_display.id = "HP_display";
	HP_display.innerHTML = "ХП: " + HP_state[index];

	var initiative_display = document.createElement("h2");
	initiative_display.innerHTML = "Инициатива: " + initiative_state[index];

	container.appendChild(name_display);
	container.appendChild(avatar_display);
	container.appendChild(strength_display);
	container.appendChild(stamina_display);
	container.appendChild(agility_display);
	container.appendChild(intelligence_display);
	container.appendChild(HP_display);
	container.appendChild(initiative_display);

	var move_button = document.createElement("button");
	move_button.innerHTML = "Перемещение";
	move_button.index = index;
	move_button.cell = cell;
	move_button.onclick = function (event) {
		var container = document.getElementById("character-info-container");
		container.innerHTML = "";
		var character_picked = event.target;
		choose_character_to_move(character_picked.index, character_picked.cell);
	};

	var delete_button = document.createElement("button");
	delete_button.innerHTML = "Уничтожить";
	delete_button.index = index;
	delete_button.cell = cell;
	delete_button.onclick = function (event) {
		delete_object(event);
	};

	var damage_button = document.createElement("button");
	damage_button.innerHTML = "Нанести урон";
	damage_button.index = index;
	damage_button.onclick = function (event) {
		var damage_field = document.getElementById("damage_field");
		if (!(damage_field.value === "")) {
			var damage = parseInt(damage_field.value);
			var HP_display = document.getElementById("HP_display");
			var new_HP = HP_state[event.target.index] - damage;
			HP_display.innerHTML = "ХП: " + new_HP;

			var toSend = {};
			toSend.command = 'deal_damage';
			toSend.index = event.target.index;
			toSend.damage = damage;
			_wsClient2.default.sendMessage(toSend);
		}
	};

	var damage_field = document.createElement("input");
	damage_field.id = "damage_field";
	damage_field.type = "number";
	damage_field.placeholder = "Значение урона";

	var button_list = document.createElement("ul");
	button_list.className = "button_list";
	var line1 = document.createElement("li");
	var line2 = document.createElement("li");
	var line3 = document.createElement("li");

	line1.appendChild(move_button);
	line2.appendChild(delete_button);
	line3.appendChild(damage_button);
	line3.appendChild(damage_field);

	button_list.appendChild(line1);
	button_list.appendChild(line2);
	button_list.appendChild(line3);

	container.appendChild(button_list);

	tiny_animation(container);
}

function delete_object(event) {
	var container = document.getElementById("character-info-container");
	container.innerHTML = "";

	var toSend = {};
	toSend.command = 'delete_character';
	toSend.index = event.target.index;
	_wsClient2.default.sendMessage(toSend);
}

function select_obstacle(index, cell) {
	var obstacle_id = board_state[index] * -1;
	var obstacle = obstacle_detailed_info[obstacle_id];

	var name = obstacle.name;
	var avatar = obstacle.avatar;

	var container = document.getElementById("character-info-container");
	container.innerHTML = "";

	var name_display = document.createElement("h2");
	name_display.innerHTML = name;

	var avatar_display = document.createElement("IMG");
	avatar_display.src = avatar;
	avatar_display.style.width = '250px';
	avatar_display.style.height = '250px';

	container.appendChild(name_display);
	container.appendChild(avatar_display);

	var delete_button = document.createElement("button");
	delete_button.innerHTML = "Уничтожить";
	delete_button.index = index;
	delete_button.cell = cell;
	delete_button.onclick = function (event) {
		delete_object(event);
	};
	container.appendChild(delete_button);

	tiny_animation(container);
}

function choose_character_to_move(index, cell) {
	field_chosen = 1;
	chosen_index = index;
	chosen_character_HP = HP_state[index];
	chosen_character_initiative = initiative_state[index];
	chosen_character_index = board_state[index];
	cell.src = "./images/loading.webp";
}

function undo_selection() {
	field_chosen = 0;
	var old_cell = document.getElementById("cell_" + chosen_index);
	old_cell.src = character_detailed_info[board_state[chosen_index]].avatar;
}

function get_object_picture(index_in_board_state) {
	var image = EMPTY_CELL_PIC;
	var index_in_base;
	if (index_in_board_state > 0) {
		index_in_base = index_in_board_state;
		var character = character_detailed_info[index_in_base];
		image = character.avatar;
	} else if (index_in_board_state < 0) {
		index_in_base = index_in_board_state * -1;
		var obstacle = obstacle_detailed_info[index_in_base];
		image = obstacle.avatar;
	}

	return image;
}

function saveBoard() {
	var save_name = document.getElementById("map_name").value;
	var game_state = { board_state: board_state, HP_state: HP_state, initiative_state: initiative_state, character_detailed_info: character_detailed_info, obstacle_detailed_info: obstacle_detailed_info };

	var toSend = {};
	toSend.command = 'save_game';
	toSend.save_name = save_name;
	toSend.game_state = game_state;
	toSend.from_name = my_name;
	_wsClient2.default.sendMessage(toSend);
}

function computeInitiative(agility) {
	return agility + Math.floor(Math.random() * 21);
}

function rollInitiative() {
	for (var i = 0; i < board_state.length; i++) {
		if (board_state[i] > 0) {
			// so there is character at position i
			// retrieve that character's agility
			var character_index = board_state[i];
			var character = character_detailed_info[character_index];

			var agility = character.agility;

			// roll initiative and add agility modificator
			var initiative = computeInitiative(parseInt(agility));

			initiative_state[i] = initiative;
		}
	}
	var toSend = {};
	toSend.command = 'roll_initiative';
	toSend.initiative_state = initiative_state;
	_wsClient2.default.sendMessage(toSend);
}

//socket.init('ws://localhost:3001');
_wsClient2.default.init(SERVER_ADDRESS);

_wsClient2.default.registerOpenHandler(function () {
	var toSend = {};
	toSend.command = 'player_info';
	toSend.from_name = my_name;
	toSend.role = my_role;
	if (my_role == 'gm') {
		toSend.password = JSON.parse(sessionStorage.getItem('gm_password'));
	}
	_wsClient2.default.sendMessage(toSend);
});

_wsClient2.default.registerMessageHandler(function (data) {
	console.log(data);
	if (data.to_name == my_name || data.to_name == 'all') {
		if (data.command == 'player_info_response') {
			if (data.isValid == 0) {
				alert('Та какой ты гм');
				window.location.href = "/";
			}
			if (data.role == 'gm') {
				create_board_button.show();
				save_board_button.show();
				load_board_button.show();
				roll_initiative_button.show();
				save_name_input.show();
				board_size_input.show();
			}
			character_list = data.character_list;
			obstacle_list = data.obstacle_list;
		} else if (data.command == 'construct_board_response') {
			construct_board(data.board_state, data.size, data.HP_state, data.initiative_state);
		} else if (data.command == 'add_character_response') {
			var character = data.character_info;
			character_detailed_info[data.character_number] = character;
			var cell = document.getElementById("cell_" + data.cell_id);
			cell.src = character.avatar;
			board_state[data.cell_id] = data.character_number;
			HP_state[data.cell_id] = HP_values[character.stamina];
		} else if (data.command == 'add_obstacle_response') {
			var obstacle = data.obstacle_info;
			obstacle_detailed_info[data.obstacle_number] = obstacle;
			var cell = document.getElementById("cell_" + data.cell_id);
			cell.src = obstacle.avatar;
			board_state[data.cell_id] = data.obstacle_number * -1;
		} else if (data.command == 'move_character_response') {
			var to_index = data.to_index;
			var from_index = data.from_index;
			board_state[to_index] = data.character_number;
			HP_state[to_index] = data.character_hp;
			initiative_state[to_index] = data.character_initiative;

			var to_cell = document.getElementById('cell_' + to_index);
			to_cell.src = data.character_avatar;

			board_state[from_index] = 0;
			HP_state[from_index] = 0;
			initiative_state[from_index] = 0;
			var old_cell = document.getElementById("cell_" + from_index);
			old_cell.src = EMPTY_CELL_PIC;
		} else if (data.command == 'delete_character_response') {
			console.log('bin chilling');
			board_state[data.index] = 0;
			var cell = document.getElementById('cell_' + data.index);
			cell.src = EMPTY_CELL_PIC;
		} else if (data.command == 'roll_initiative_response') {
			initiative_state = data.initiative_state;
		} else if (data.command == 'deal_damage_response') {
			HP_state[data.index] = HP_state[data.index] - data.damage;
		} else if (data.command == 'save_game_response') {
			if (data.success == 1) {
				alert('Game ' + data.save_name + ' saved succesfully');
			} else {
				alert('Game with name ' + data.save_name + ' already exist!');
			}
		} else if (data.command == 'load_game_response') {
			if (data.success == 1) {
				var game_state = data.game_state;
				character_detailed_info = game_state.character_detailed_info;
				obstacle_detailed_info = game_state.obstacle_detailed_info;
				construct_board(game_state.board_state, Math.sqrt(game_state.board_state.length), game_state.HP_state, game_state.initiative_state);
			} else {
				alert('Failed to load game ' + data.save_name);
			}
		}
	}
});

var create_board_button = $(CREATE_BOARD_BUTTON_SELECTOR);
create_board_button.on('click', createBoard);
create_board_button.hide();

var save_board_button = $(SAVE_BOARD_BUTTON_SELECTOR);
save_board_button.on('click', saveBoard);
save_board_button.hide();

var load_board_button = $(LOAD_BOARD_BUTTON_SELECTOR);
load_board_button.on('click', loadBoard);
load_board_button.hide();

var roll_initiative_button = $(ROLL_INITIATIVE_BUTTON_SELECTOR);
roll_initiative_button.on('click', rollInitiative);
roll_initiative_button.hide();

var board_size_input = $(BOARD_SIZE_INPUT_SELECTOR);
board_size_input.hide();

var save_name_input = $(SAVE_NAME_INPUT_SELECTOR);
save_name_input.hide();

},{"./ws-client":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var socket = void 0;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting..');
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = function () {
    console.log('open');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = function (e) {
    var data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

exports.default = {
  init: init,
  registerOpenHandler: registerOpenHandler,
  registerMessageHandler: registerMessageHandler,
  sendMessage: sendMessage
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksK0JBQStCLG1DQUFuQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksa0NBQWtDLHNDQUF0Qzs7QUFFQSxJQUFJLDRCQUE0QixnQ0FBaEM7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7O0FBRUEsSUFBSSxpQkFBaUIsU0FBUyxNQUFULENBQWdCLE9BQWhCLENBQXdCLE9BQXhCLEVBQWlDLElBQWpDLENBQXJCOztBQUVBLElBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxlQUFlLE9BQWYsQ0FBdUIsVUFBdkIsQ0FBWCxDQUFkO0FBQ0EsSUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLGVBQWUsT0FBZixDQUF1QixXQUF2QixDQUFYLENBQWQ7O0FBRUEsSUFBSSxpQkFBaUIsRUFBckI7QUFDQSxJQUFJLDBCQUEwQixFQUE5QjtBQUNBLElBQUksZ0JBQWdCLEVBQXBCO0FBQ0EsSUFBSSx5QkFBeUIsRUFBN0I7O0FBRUEsSUFBSSxvQkFBb0IsU0FBeEI7O0FBRUEsSUFBSSxpQkFBaUIscUJBQXJCOztBQUVBO0FBQ0EsSUFBTSxZQUFZLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQixDQUFsQjs7QUFFQSxJQUFJLGNBQWMsRUFBbEI7QUFDQSxJQUFJLFdBQVcsRUFBZjtBQUNBLElBQUksbUJBQW1CLEVBQXZCO0FBQ0EsSUFBSSxhQUFKOztBQUVBLElBQUksaUJBQWlCLEVBQXJCO0FBQ0EsSUFBSSxnQkFBZ0IsRUFBcEI7O0FBR0EsSUFBSSxlQUFlLENBQW5CO0FBQ0EsSUFBSSxxQkFBSjtBQUNBLElBQUksK0JBQUo7QUFDQSxJQUFJLDRCQUFKO0FBQ0EsSUFBSSxvQ0FBSjs7QUFFQSxTQUFTLFdBQVQsR0FBdUI7QUFDdEIsUUFBTyxTQUFTLGNBQVQsQ0FBd0IsWUFBeEIsRUFBc0MsS0FBN0M7QUFDQSxlQUFjLEVBQWQ7QUFDQSxZQUFXLEVBQVg7QUFDQSxvQkFBbUIsRUFBbkI7QUFDQSxNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksT0FBSyxJQUF6QixFQUErQixHQUEvQixFQUFvQztBQUNuQyxjQUFZLElBQVosQ0FBaUIsQ0FBakI7QUFDQTtBQUNELHdCQUF1QixXQUF2QixFQUFvQyxJQUFwQyxFQUEwQyxRQUExQyxFQUFvRCxnQkFBcEQ7QUFDQTs7QUFFRCxTQUFTLFNBQVQsR0FBcUI7QUFDcEIsS0FBSSxPQUFPLFNBQVMsY0FBVCxDQUF3QixVQUF4QixFQUFvQyxLQUEvQztBQUNBLEtBQUksU0FBUyxFQUFiO0FBQ0EsUUFBTyxPQUFQLEdBQWlCLFdBQWpCO0FBQ0EsUUFBTyxTQUFQLEdBQW1CLElBQW5CO0FBQ0EsUUFBTyxTQUFQLEdBQW1CLE9BQW5CO0FBQ0Esb0JBQU8sV0FBUCxDQUFtQixNQUFuQjtBQUNBOztBQUVELFNBQVMsc0JBQVQsQ0FBZ0MsZUFBaEMsRUFBaUQsUUFBakQsRUFBMkQsWUFBM0QsRUFBeUUsb0JBQXpFLEVBQStGO0FBQzlGLEtBQUksU0FBUyxFQUFiO0FBQ0EsUUFBTyxPQUFQLEdBQWlCLGlCQUFqQjtBQUNBLFFBQU8sV0FBUCxHQUFxQixlQUFyQjtBQUNBLFFBQU8sSUFBUCxHQUFjLFFBQWQ7QUFDQSxRQUFPLFFBQVAsR0FBa0IsWUFBbEI7QUFDQSxRQUFPLGdCQUFQLEdBQTBCLG9CQUExQjtBQUNBLG9CQUFPLFdBQVAsQ0FBbUIsTUFBbkI7QUFDQTs7QUFFRCxTQUFTLGVBQVQsQ0FBeUIsZUFBekIsRUFBMEMsUUFBMUMsRUFBb0QsWUFBcEQsRUFBa0Usb0JBQWxFLEVBQXdGO0FBQ3ZGLGVBQWMsZUFBZDtBQUNBLFlBQVcsWUFBWDtBQUNBLG9CQUFtQixvQkFBbkI7QUFDQSxRQUFPLFFBQVA7O0FBRUEsS0FBSSxpQkFBaUIsU0FBUyxjQUFULENBQXdCLDBCQUF4QixDQUFyQjtBQUNBLGdCQUFlLFNBQWYsR0FBMkIsRUFBM0I7O0FBRUEsS0FBSSxrQkFBa0IsU0FBUyxjQUFULENBQXdCLGlCQUF4QixDQUF0QjtBQUNBLGlCQUFnQixTQUFoQixHQUE0QixFQUE1QjtBQUNBLEtBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWjtBQUNBLE9BQU0sU0FBTixHQUFrQixPQUFsQjs7QUFFQSxNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksSUFBcEIsRUFBMEIsR0FBMUIsRUFBK0I7QUFDOUIsTUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFWO0FBQ0EsTUFBSSxTQUFKLEdBQWdCLFdBQWhCO0FBQ0EsT0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLElBQXBCLEVBQTBCLEdBQTFCLEVBQStCO0FBQzlCLE9BQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBLE9BQUksVUFBVSxJQUFFLElBQUYsR0FBUyxDQUF2QjtBQUNBLFVBQU8sRUFBUCxHQUFZLFVBQVUsT0FBdEI7QUFDQSxVQUFPLEdBQVAsR0FBYSxDQUFiO0FBQ0EsVUFBTyxNQUFQLEdBQWdCLENBQWhCO0FBQ0EsT0FBSSxhQUFhLG1CQUFtQixZQUFZLE9BQVosQ0FBbkIsQ0FBakI7QUFDQSxVQUFPLEdBQVAsR0FBYSxVQUFiO0FBQ0EsVUFBTyxLQUFQLENBQWEsS0FBYixHQUFxQixNQUFyQjtBQUNBLFVBQU8sS0FBUCxDQUFhLE1BQWIsR0FBc0IsTUFBdEI7QUFDQSxVQUFPLFNBQVAsR0FBbUIsWUFBbkI7QUFDQSxVQUFPLE9BQVAsR0FBaUIsVUFBUyxLQUFULEVBQWdCO0FBQ2pDLFFBQUksOEJBQThCLFNBQVMsY0FBVCxDQUF3QiwwQkFBeEIsQ0FBbEM7QUFDQSxnQ0FBNEIsU0FBNUIsR0FBd0MsRUFBeEM7O0FBRUMsUUFBSSxPQUFPLE1BQU0sTUFBakI7QUFDQSxRQUFJLFFBQVEsS0FBSyxHQUFMLEdBQVMsSUFBVCxHQUFnQixLQUFLLE1BQWpDO0FBQ0EsUUFBSSxZQUFZLEtBQVosS0FBc0IsQ0FBMUIsRUFBNkI7QUFBRTtBQUM5QixTQUFJLGdCQUFnQixDQUFwQixFQUF1QjtBQUN0QixpQkFBVyxLQUFYO0FBQ0EsTUFGRCxNQUVPO0FBQ04scUJBQWUsS0FBZixFQUFzQixJQUF0QjtBQUNBO0FBQ0QsS0FORCxNQU1PLElBQUksWUFBWSxLQUFaLElBQXFCLENBQXpCLEVBQTRCO0FBQUU7QUFDcEMsU0FBSSxnQkFBZ0IsQ0FBcEIsRUFBdUI7QUFDdEIsdUJBQWlCLEtBQWpCLEVBQXdCLElBQXhCO0FBRUEsTUFIRCxNQUdPO0FBQ047QUFDQTtBQUNELEtBUE0sTUFPQTtBQUFFO0FBQ1IsU0FBSSxnQkFBZ0IsQ0FBcEIsRUFBdUI7QUFDdEIsc0JBQWdCLEtBQWhCLEVBQXVCLElBQXZCO0FBRUEsTUFIRCxNQUdPO0FBQ047QUFDQTtBQUNEO0FBQ0QsSUEzQkQ7QUE0QkEsT0FBSSxZQUFZLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFoQjtBQUNBLGFBQVUsV0FBVixDQUFzQixNQUF0QjtBQUNBLGFBQVUsU0FBVixHQUFzQixXQUF0QjtBQUNBLE9BQUksV0FBSixDQUFnQixTQUFoQjtBQUNBO0FBQ0QsUUFBTSxXQUFOLENBQWtCLEdBQWxCO0FBQ0E7QUFDRCxpQkFBZ0IsV0FBaEIsQ0FBNEIsS0FBNUI7QUFDQTs7QUFHRCxTQUFTLFVBQVQsQ0FBb0IsV0FBcEIsRUFBaUM7QUFDaEMsS0FBSSxZQUFZLFNBQVMsY0FBVCxDQUF3QiwwQkFBeEIsQ0FBaEI7QUFDQSxXQUFVLFNBQVYsR0FBc0IsRUFBdEI7O0FBRUEsS0FBSSxtQkFBbUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0FBQ0Esa0JBQWlCLFNBQWpCLEdBQTZCLDZCQUE3Qjs7QUFFQSxLQUFJLHVCQUF1QixTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBM0I7QUFDQSxzQkFBcUIsU0FBckIsR0FBaUMsb0JBQWpDO0FBQ0Esc0JBQXFCLE9BQXJCLEdBQStCLFlBQVc7QUFBQyxnQkFBYyxXQUFkO0FBQTRCLEVBQXZFOztBQUVBLEtBQUksc0JBQXNCLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUExQjtBQUNBLHFCQUFvQixTQUFwQixHQUFnQyxzQkFBaEM7QUFDQSxxQkFBb0IsT0FBcEIsR0FBOEIsWUFBVztBQUFDLGVBQWEsV0FBYjtBQUEyQixFQUFyRTs7QUFFQSxrQkFBaUIsV0FBakIsQ0FBNkIsb0JBQTdCO0FBQ0Esa0JBQWlCLFdBQWpCLENBQTZCLG1CQUE3QjtBQUNBLFdBQVUsV0FBVixDQUFzQixnQkFBdEI7O0FBRUEsZ0JBQWUsU0FBZjtBQUNBOztBQUVELFNBQVMsY0FBVCxDQUF3QixTQUF4QixFQUFtQztBQUNsQyxXQUFVLFNBQVYsQ0FBb0IsR0FBcEIsQ0FBd0IsaUJBQXhCO0FBQ0MsWUFBVyxZQUFXO0FBQ3BCLFlBQVUsU0FBVixDQUFvQixNQUFwQixDQUEyQixpQkFBM0I7QUFDRCxFQUZELEVBRUcsRUFGSDtBQUdEOztBQUVELFNBQVMsWUFBVCxDQUFzQixXQUF0QixFQUFtQztBQUNsQyxLQUFJLFlBQVksU0FBUyxjQUFULENBQXdCLDBCQUF4QixDQUFoQjtBQUNBLFdBQVUsU0FBVixHQUFzQixFQUF0Qjs7QUFFQSxLQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxRQUFPLEVBQVAsR0FBWSxpQkFBWjs7QUFFQSxNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksY0FBYyxNQUFsQyxFQUEwQyxHQUExQyxFQUErQztBQUM5QyxNQUFJLGlCQUFpQixTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBckI7QUFDQSxpQkFBZSxTQUFmLEdBQTJCLGNBQWMsQ0FBZCxDQUEzQjtBQUNBLGlCQUFlLEtBQWYsR0FBdUIsQ0FBdkI7QUFDQSxTQUFPLFdBQVAsQ0FBbUIsY0FBbkI7QUFDQTs7QUFFRCxLQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxRQUFPLFNBQVAsR0FBbUIsVUFBbkI7QUFDQSxRQUFPLFdBQVAsR0FBcUIsV0FBckI7QUFDQSxRQUFPLE9BQVAsR0FBaUIsVUFBUyxLQUFULEVBQWdCO0FBQ2hDLE1BQUksU0FBUyxNQUFNLE1BQW5CO0FBQ0EsTUFBSSxrQkFBa0IsU0FBUyxTQUFTLGNBQVQsQ0FBd0IsaUJBQXhCLEVBQTJDLEtBQXBELENBQXRCOztBQUVBLE1BQUksU0FBUyxFQUFiO0FBQ0EsU0FBTyxPQUFQLEdBQWlCLGNBQWpCO0FBQ0EsU0FBTyxPQUFQLEdBQWlCLE9BQU8sV0FBeEI7QUFDQSxTQUFPLGVBQVAsR0FBeUIsa0JBQWtCLENBQTNDO0FBQ0EsU0FBTyxhQUFQLEdBQXVCLGNBQWMsZUFBZCxDQUF2QjtBQUNBLHFCQUFPLFdBQVAsQ0FBbUIsTUFBbkI7O0FBRUEsTUFBSSxZQUFZLFNBQVMsY0FBVCxDQUF3QiwwQkFBeEIsQ0FBaEI7QUFDQSxZQUFVLFNBQVYsR0FBc0IsRUFBdEI7QUFDQSxFQWJEOztBQWVBLFdBQVUsV0FBVixDQUFzQixNQUF0QjtBQUNBLFdBQVUsV0FBVixDQUFzQixNQUF0QjtBQUNBLGdCQUFlLFNBQWY7QUFFQTs7QUFFRCxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0M7QUFDbkMsS0FBSSxZQUFZLFNBQVMsY0FBVCxDQUF3QiwwQkFBeEIsQ0FBaEI7QUFDQSxXQUFVLFNBQVYsR0FBc0IsRUFBdEI7O0FBRUEsS0FBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0EsUUFBTyxFQUFQLEdBQVksa0JBQVo7O0FBRUEsTUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLGVBQWUsTUFBbkMsRUFBMkMsR0FBM0MsRUFBZ0Q7QUFDL0MsTUFBSSxpQkFBaUIsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQXJCO0FBQ0EsaUJBQWUsU0FBZixHQUEyQixlQUFlLENBQWYsQ0FBM0I7QUFDQSxpQkFBZSxLQUFmLEdBQXVCLENBQXZCO0FBQ0EsU0FBTyxXQUFQLENBQW1CLGNBQW5CO0FBQ0E7O0FBRUQsS0FBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0EsUUFBTyxTQUFQLEdBQW1CLFVBQW5CO0FBQ0EsUUFBTyxXQUFQLEdBQXFCLFdBQXJCO0FBQ0EsUUFBTyxPQUFQLEdBQWlCLFVBQVMsS0FBVCxFQUFnQjtBQUNoQyxNQUFJLFNBQVMsTUFBTSxNQUFuQjtBQUNBLE1BQUksbUJBQW1CLFNBQVMsU0FBUyxjQUFULENBQXdCLGtCQUF4QixFQUE0QyxLQUFyRCxDQUF2Qjs7QUFFQSxNQUFJLFNBQVMsRUFBYjtBQUNBLFNBQU8sT0FBUCxHQUFpQixlQUFqQjtBQUNBLFNBQU8sT0FBUCxHQUFpQixPQUFPLFdBQXhCO0FBQ0EsU0FBTyxnQkFBUCxHQUEwQixtQkFBbUIsQ0FBN0M7QUFDQSxTQUFPLGNBQVAsR0FBd0IsZUFBZSxnQkFBZixDQUF4QjtBQUNBLHFCQUFPLFdBQVAsQ0FBbUIsTUFBbkI7O0FBRUEsTUFBSSxZQUFZLFNBQVMsY0FBVCxDQUF3QiwwQkFBeEIsQ0FBaEI7QUFDQSxZQUFVLFNBQVYsR0FBc0IsRUFBdEI7QUFDQSxFQWJEOztBQWVBLFdBQVUsV0FBVixDQUFzQixNQUF0QjtBQUNBLFdBQVUsV0FBVixDQUFzQixNQUF0QjtBQUNBLGdCQUFlLFNBQWY7QUFFQTs7QUFFRCxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0MsT0FBbEMsRUFBMkM7QUFDMUMsZ0JBQWUsQ0FBZjtBQUNBLEtBQUksU0FBUyxFQUFiO0FBQ0EsUUFBTyxPQUFQLEdBQWlCLGdCQUFqQjtBQUNBLFFBQU8sVUFBUCxHQUFvQixZQUFwQjtBQUNBLFFBQU8sUUFBUCxHQUFrQixRQUFsQjtBQUNBLFFBQU8sZ0JBQVAsR0FBMEIsc0JBQTFCO0FBQ0EsUUFBTyxZQUFQLEdBQXNCLG1CQUF0QjtBQUNBLFFBQU8sb0JBQVAsR0FBOEIsMkJBQTlCO0FBQ0EsUUFBTyxnQkFBUCxHQUEwQix3QkFBd0Isc0JBQXhCLEVBQWdELE1BQTFFO0FBQ0Esb0JBQU8sV0FBUCxDQUFtQixNQUFuQjtBQUNBOztBQUVELFNBQVMsZ0JBQVQsQ0FBMEIsS0FBMUIsRUFBaUMsSUFBakMsRUFBdUM7QUFDdEMsS0FBSSxZQUFZLHdCQUF3QixZQUFZLEtBQVosQ0FBeEIsQ0FBaEI7O0FBRUEsS0FBSSxPQUFPLFVBQVUsSUFBckI7QUFDQSxLQUFJLFNBQVMsVUFBVSxNQUF2Qjs7QUFFQSxLQUFJLFlBQVksU0FBUyxjQUFULENBQXdCLDBCQUF4QixDQUFoQjtBQUNBLFdBQVUsU0FBVixHQUFzQixFQUF0Qjs7QUFFQSxLQUFJLGVBQWUsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQW5CO0FBQ0EsY0FBYSxTQUFiLEdBQXlCLElBQXpCOztBQUVBLEtBQUksaUJBQWlCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFyQjtBQUNBLGdCQUFlLEdBQWYsR0FBcUIsTUFBckI7QUFDQSxnQkFBZSxLQUFmLENBQXFCLEtBQXJCLEdBQTZCLE9BQTdCO0FBQ0EsZ0JBQWUsS0FBZixDQUFxQixNQUFyQixHQUE4QixPQUE5Qjs7QUFFQSxLQUFJLG1CQUFtQixTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBdkI7QUFDQSxrQkFBaUIsU0FBakIsR0FBNkIsV0FBVyxVQUFVLFFBQWxEOztBQUVBLEtBQUksa0JBQWtCLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUF0QjtBQUNBLGlCQUFnQixTQUFoQixHQUE0QixtQkFBbUIsVUFBVSxPQUF6RDs7QUFFQSxLQUFJLGtCQUFrQixTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBdEI7QUFDQSxpQkFBZ0IsU0FBaEIsR0FBNEIsZUFBZSxVQUFVLE9BQXJEOztBQUVBLEtBQUksdUJBQXVCLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUEzQjtBQUNBLHNCQUFxQixTQUFyQixHQUFpQyxnQkFBZ0IsVUFBVSxZQUEzRDs7QUFFQSxLQUFJLGFBQWEsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQWpCO0FBQ0EsWUFBVyxFQUFYLEdBQWdCLFlBQWhCO0FBQ0EsWUFBVyxTQUFYLEdBQXVCLFNBQVMsU0FBUyxLQUFULENBQWhDOztBQUVBLEtBQUkscUJBQXFCLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUF6QjtBQUNBLG9CQUFtQixTQUFuQixHQUErQixpQkFBaUIsaUJBQWlCLEtBQWpCLENBQWhEOztBQUdBLFdBQVUsV0FBVixDQUFzQixZQUF0QjtBQUNBLFdBQVUsV0FBVixDQUFzQixjQUF0QjtBQUNBLFdBQVUsV0FBVixDQUFzQixnQkFBdEI7QUFDQSxXQUFVLFdBQVYsQ0FBc0IsZUFBdEI7QUFDQSxXQUFVLFdBQVYsQ0FBc0IsZUFBdEI7QUFDQSxXQUFVLFdBQVYsQ0FBc0Isb0JBQXRCO0FBQ0EsV0FBVSxXQUFWLENBQXNCLFVBQXRCO0FBQ0EsV0FBVSxXQUFWLENBQXNCLGtCQUF0Qjs7QUFFQSxLQUFJLGNBQWMsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQWxCO0FBQ0EsYUFBWSxTQUFaLEdBQXdCLGFBQXhCO0FBQ0EsYUFBWSxLQUFaLEdBQW9CLEtBQXBCO0FBQ0EsYUFBWSxJQUFaLEdBQW1CLElBQW5CO0FBQ0EsYUFBWSxPQUFaLEdBQXNCLFVBQVMsS0FBVCxFQUFnQjtBQUNyQyxNQUFJLFlBQVksU0FBUyxjQUFULENBQXdCLDBCQUF4QixDQUFoQjtBQUNBLFlBQVUsU0FBVixHQUFzQixFQUF0QjtBQUNBLE1BQUksbUJBQW1CLE1BQU0sTUFBN0I7QUFDQSwyQkFBeUIsaUJBQWlCLEtBQTFDLEVBQWlELGlCQUFpQixJQUFsRTtBQUNBLEVBTEQ7O0FBT0EsS0FBSSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQXBCO0FBQ0EsZUFBYyxTQUFkLEdBQTBCLFlBQTFCO0FBQ0EsZUFBYyxLQUFkLEdBQXNCLEtBQXRCO0FBQ0EsZUFBYyxJQUFkLEdBQXFCLElBQXJCO0FBQ0EsZUFBYyxPQUFkLEdBQXdCLFVBQVMsS0FBVCxFQUFnQjtBQUN2QyxnQkFBYyxLQUFkO0FBQ0EsRUFGRDs7QUFJQSxLQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBcEI7QUFDQSxlQUFjLFNBQWQsR0FBMEIsY0FBMUI7QUFDQSxlQUFjLEtBQWQsR0FBc0IsS0FBdEI7QUFDQSxlQUFjLE9BQWQsR0FBd0IsVUFBUyxLQUFULEVBQWdCO0FBQ3ZDLE1BQUksZUFBZSxTQUFTLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBbkI7QUFDQSxNQUFHLEVBQUUsYUFBYSxLQUFiLEtBQXVCLEVBQXpCLENBQUgsRUFBaUM7QUFDaEMsT0FBSSxTQUFTLFNBQVMsYUFBYSxLQUF0QixDQUFiO0FBQ0EsT0FBSSxhQUFhLFNBQVMsY0FBVCxDQUF3QixZQUF4QixDQUFqQjtBQUNBLE9BQUksU0FBUyxTQUFTLE1BQU0sTUFBTixDQUFhLEtBQXRCLElBQStCLE1BQTVDO0FBQ0EsY0FBVyxTQUFYLEdBQXVCLFNBQVMsTUFBaEM7O0FBRUEsT0FBSSxTQUFTLEVBQWI7QUFDQSxVQUFPLE9BQVAsR0FBaUIsYUFBakI7QUFDQSxVQUFPLEtBQVAsR0FBZSxNQUFNLE1BQU4sQ0FBYSxLQUE1QjtBQUNBLFVBQU8sTUFBUCxHQUFnQixNQUFoQjtBQUNBLHNCQUFPLFdBQVAsQ0FBbUIsTUFBbkI7QUFDQTtBQUNELEVBZEQ7O0FBZ0JBLEtBQUksZUFBZSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBbkI7QUFDQSxjQUFhLEVBQWIsR0FBa0IsY0FBbEI7QUFDQSxjQUFhLElBQWIsR0FBb0IsUUFBcEI7QUFDQSxjQUFhLFdBQWIsR0FBMkIsZ0JBQTNCOztBQUVBLEtBQUksY0FBYyxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBbEI7QUFDQSxhQUFZLFNBQVosR0FBd0IsYUFBeEI7QUFDQSxLQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQVo7QUFDQSxLQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQVo7QUFDQSxLQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQVo7O0FBR0EsT0FBTSxXQUFOLENBQWtCLFdBQWxCO0FBQ0EsT0FBTSxXQUFOLENBQWtCLGFBQWxCO0FBQ0EsT0FBTSxXQUFOLENBQWtCLGFBQWxCO0FBQ0EsT0FBTSxXQUFOLENBQWtCLFlBQWxCOztBQUVBLGFBQVksV0FBWixDQUF3QixLQUF4QjtBQUNBLGFBQVksV0FBWixDQUF3QixLQUF4QjtBQUNBLGFBQVksV0FBWixDQUF3QixLQUF4Qjs7QUFFQSxXQUFVLFdBQVYsQ0FBc0IsV0FBdEI7O0FBRUEsZ0JBQWUsU0FBZjtBQUVBOztBQUVELFNBQVMsYUFBVCxDQUF1QixLQUF2QixFQUE4QjtBQUM3QixLQUFJLFlBQVksU0FBUyxjQUFULENBQXdCLDBCQUF4QixDQUFoQjtBQUNBLFdBQVUsU0FBVixHQUFzQixFQUF0Qjs7QUFFQSxLQUFJLFNBQVMsRUFBYjtBQUNBLFFBQU8sT0FBUCxHQUFpQixrQkFBakI7QUFDQSxRQUFPLEtBQVAsR0FBZSxNQUFNLE1BQU4sQ0FBYSxLQUE1QjtBQUNBLG9CQUFPLFdBQVAsQ0FBbUIsTUFBbkI7QUFDQTs7QUFFRCxTQUFTLGVBQVQsQ0FBeUIsS0FBekIsRUFBZ0MsSUFBaEMsRUFBc0M7QUFDckMsS0FBSSxjQUFjLFlBQVksS0FBWixJQUFvQixDQUFDLENBQXZDO0FBQ0EsS0FBSSxXQUFXLHVCQUF1QixXQUF2QixDQUFmOztBQUVBLEtBQUksT0FBTyxTQUFTLElBQXBCO0FBQ0EsS0FBSSxTQUFTLFNBQVMsTUFBdEI7O0FBRUEsS0FBSSxZQUFZLFNBQVMsY0FBVCxDQUF3QiwwQkFBeEIsQ0FBaEI7QUFDQSxXQUFVLFNBQVYsR0FBc0IsRUFBdEI7O0FBRUEsS0FBSSxlQUFlLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFuQjtBQUNBLGNBQWEsU0FBYixHQUF5QixJQUF6Qjs7QUFFQSxLQUFJLGlCQUFpQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBckI7QUFDQSxnQkFBZSxHQUFmLEdBQXFCLE1BQXJCO0FBQ0EsZ0JBQWUsS0FBZixDQUFxQixLQUFyQixHQUE2QixPQUE3QjtBQUNBLGdCQUFlLEtBQWYsQ0FBcUIsTUFBckIsR0FBOEIsT0FBOUI7O0FBRUEsV0FBVSxXQUFWLENBQXNCLFlBQXRCO0FBQ0EsV0FBVSxXQUFWLENBQXNCLGNBQXRCOztBQUVBLEtBQUksZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFwQjtBQUNBLGVBQWMsU0FBZCxHQUEwQixZQUExQjtBQUNBLGVBQWMsS0FBZCxHQUFzQixLQUF0QjtBQUNBLGVBQWMsSUFBZCxHQUFxQixJQUFyQjtBQUNBLGVBQWMsT0FBZCxHQUF3QixVQUFTLEtBQVQsRUFBZ0I7QUFDdkMsZ0JBQWMsS0FBZDtBQUNBLEVBRkQ7QUFHQSxXQUFVLFdBQVYsQ0FBc0IsYUFBdEI7O0FBRUEsZ0JBQWUsU0FBZjtBQUVBOztBQUdELFNBQVMsd0JBQVQsQ0FBa0MsS0FBbEMsRUFBeUMsSUFBekMsRUFBK0M7QUFDOUMsZ0JBQWUsQ0FBZjtBQUNBLGdCQUFlLEtBQWY7QUFDQSx1QkFBc0IsU0FBUyxLQUFULENBQXRCO0FBQ0EsK0JBQThCLGlCQUFpQixLQUFqQixDQUE5QjtBQUNBLDBCQUF5QixZQUFZLEtBQVosQ0FBekI7QUFDQSxNQUFLLEdBQUwsR0FBVyx1QkFBWDtBQUNBOztBQUVELFNBQVMsY0FBVCxHQUEwQjtBQUN6QixnQkFBZSxDQUFmO0FBQ0EsS0FBSSxXQUFXLFNBQVMsY0FBVCxDQUF3QixVQUFVLFlBQWxDLENBQWY7QUFDQSxVQUFTLEdBQVQsR0FBZSx3QkFBd0IsWUFBWSxZQUFaLENBQXhCLEVBQW1ELE1BQWxFO0FBQ0E7O0FBRUQsU0FBUyxrQkFBVCxDQUE0QixvQkFBNUIsRUFBa0Q7QUFDakQsS0FBSSxRQUFRLGNBQVo7QUFDQSxLQUFJLGFBQUo7QUFDQSxLQUFJLHVCQUF1QixDQUEzQixFQUE4QjtBQUM3QixrQkFBZ0Isb0JBQWhCO0FBQ0EsTUFBSSxZQUFZLHdCQUF3QixhQUF4QixDQUFoQjtBQUNBLFVBQVEsVUFBVSxNQUFsQjtBQUNBLEVBSkQsTUFJTyxJQUFJLHVCQUF1QixDQUEzQixFQUE4QjtBQUNwQyxrQkFBZ0IsdUJBQXNCLENBQUMsQ0FBdkM7QUFDQSxNQUFJLFdBQVcsdUJBQXVCLGFBQXZCLENBQWY7QUFDQSxVQUFRLFNBQVMsTUFBakI7QUFDQTs7QUFFRCxRQUFPLEtBQVA7QUFDQTs7QUFFRCxTQUFTLFNBQVQsR0FBcUI7QUFDcEIsS0FBSSxZQUFZLFNBQVMsY0FBVCxDQUF3QixVQUF4QixFQUFvQyxLQUFwRDtBQUNBLEtBQUksYUFBYSxFQUFDLGFBQWEsV0FBZCxFQUEyQixVQUFVLFFBQXJDLEVBQStDLGtCQUFrQixnQkFBakUsRUFBbUYseUJBQXlCLHVCQUE1RyxFQUFxSSx3QkFBd0Isc0JBQTdKLEVBQWpCOztBQUVBLEtBQUksU0FBUyxFQUFiO0FBQ0EsUUFBTyxPQUFQLEdBQWlCLFdBQWpCO0FBQ0EsUUFBTyxTQUFQLEdBQW1CLFNBQW5CO0FBQ0EsUUFBTyxVQUFQLEdBQW9CLFVBQXBCO0FBQ0EsUUFBTyxTQUFQLEdBQW1CLE9BQW5CO0FBQ0Esb0JBQU8sV0FBUCxDQUFtQixNQUFuQjtBQUNBOztBQUVELFNBQVMsaUJBQVQsQ0FBMkIsT0FBM0IsRUFBb0M7QUFDbkMsUUFBTyxVQUFVLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixFQUEzQixDQUFqQjtBQUNBOztBQUVELFNBQVMsY0FBVCxHQUEwQjtBQUN6QixNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksWUFBWSxNQUFoQyxFQUF3QyxHQUF4QyxFQUE2QztBQUM1QyxNQUFJLFlBQVksQ0FBWixJQUFpQixDQUFyQixFQUF3QjtBQUFFO0FBQ3pCO0FBQ0EsT0FBSSxrQkFBa0IsWUFBWSxDQUFaLENBQXRCO0FBQ0EsT0FBSSxZQUFZLHdCQUF3QixlQUF4QixDQUFoQjs7QUFFQSxPQUFJLFVBQVUsVUFBVSxPQUF4Qjs7QUFFQTtBQUNBLE9BQUksYUFBYSxrQkFBa0IsU0FBUyxPQUFULENBQWxCLENBQWpCOztBQUVBLG9CQUFpQixDQUFqQixJQUFzQixVQUF0QjtBQUNBO0FBQ0Q7QUFDRCxLQUFJLFNBQVMsRUFBYjtBQUNBLFFBQU8sT0FBUCxHQUFpQixpQkFBakI7QUFDQSxRQUFPLGdCQUFQLEdBQTBCLGdCQUExQjtBQUNBLG9CQUFPLFdBQVAsQ0FBbUIsTUFBbkI7QUFDQTs7QUFFRDtBQUNBLG1CQUFPLElBQVAsQ0FBWSxjQUFaOztBQUVBLG1CQUFPLG1CQUFQLENBQTJCLFlBQU07QUFDL0IsS0FBSSxTQUFTLEVBQWI7QUFDQSxRQUFPLE9BQVAsR0FBaUIsYUFBakI7QUFDQSxRQUFPLFNBQVAsR0FBbUIsT0FBbkI7QUFDQSxRQUFPLElBQVAsR0FBYyxPQUFkO0FBQ0EsS0FBSSxXQUFXLElBQWYsRUFBcUI7QUFDbkIsU0FBTyxRQUFQLEdBQWtCLEtBQUssS0FBTCxDQUFXLGVBQWUsT0FBZixDQUF1QixhQUF2QixDQUFYLENBQWxCO0FBQ0Q7QUFDRCxvQkFBTyxXQUFQLENBQW1CLE1BQW5CO0FBQ0QsQ0FURDs7QUFXQSxtQkFBTyxzQkFBUCxDQUE4QixVQUFDLElBQUQsRUFBVTtBQUN0QyxTQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0QsS0FBSyxLQUFLLE9BQUwsSUFBZ0IsT0FBakIsSUFBNEIsS0FBSyxPQUFMLElBQWdCLEtBQWhELEVBQXdEO0FBQ3JELE1BQUksS0FBSyxPQUFMLElBQWdCLHNCQUFwQixFQUE0QztBQUM3QyxPQUFJLEtBQUssT0FBTCxJQUFnQixDQUFwQixFQUF1QjtBQUN0QixVQUFNLGdCQUFOO0FBQ0EsV0FBTyxRQUFQLENBQWdCLElBQWhCLEdBQXVCLEdBQXZCO0FBQ0E7QUFDRCxPQUFJLEtBQUssSUFBTCxJQUFhLElBQWpCLEVBQXVCO0FBQ3RCLHdCQUFvQixJQUFwQjtBQUNBLHNCQUFrQixJQUFsQjtBQUNBLHNCQUFrQixJQUFsQjtBQUNBLDJCQUF1QixJQUF2QjtBQUNBLG9CQUFnQixJQUFoQjtBQUNBLHFCQUFpQixJQUFqQjtBQUNBO0FBQ0Qsb0JBQWlCLEtBQUssY0FBdEI7QUFDQSxtQkFBZ0IsS0FBSyxhQUFyQjtBQUNFLEdBZkQsTUFlTyxJQUFJLEtBQUssT0FBTCxJQUFnQiwwQkFBcEIsRUFBZ0Q7QUFDeEQsbUJBQWdCLEtBQUssV0FBckIsRUFBa0MsS0FBSyxJQUF2QyxFQUE2QyxLQUFLLFFBQWxELEVBQTRELEtBQUssZ0JBQWpFO0FBQ0EsR0FGUSxNQUVGLElBQUksS0FBSyxPQUFMLElBQWdCLHdCQUFwQixFQUE4QztBQUNwRCxPQUFJLFlBQVksS0FBSyxjQUFyQjtBQUNBLDJCQUF3QixLQUFLLGdCQUE3QixJQUFpRCxTQUFqRDtBQUNBLE9BQUksT0FBTyxTQUFTLGNBQVQsQ0FBd0IsVUFBVSxLQUFLLE9BQXZDLENBQVg7QUFDQSxRQUFLLEdBQUwsR0FBVyxVQUFVLE1BQXJCO0FBQ0EsZUFBWSxLQUFLLE9BQWpCLElBQTRCLEtBQUssZ0JBQWpDO0FBQ0EsWUFBUyxLQUFLLE9BQWQsSUFBeUIsVUFBVSxVQUFVLE9BQXBCLENBQXpCO0FBQ0EsR0FQTSxNQU9BLElBQUksS0FBSyxPQUFMLElBQWdCLHVCQUFwQixFQUE2QztBQUNuRCxPQUFJLFdBQVcsS0FBSyxhQUFwQjtBQUNBLDBCQUF1QixLQUFLLGVBQTVCLElBQStDLFFBQS9DO0FBQ0EsT0FBSSxPQUFPLFNBQVMsY0FBVCxDQUF3QixVQUFVLEtBQUssT0FBdkMsQ0FBWDtBQUNBLFFBQUssR0FBTCxHQUFXLFNBQVMsTUFBcEI7QUFDQSxlQUFZLEtBQUssT0FBakIsSUFBNEIsS0FBSyxlQUFMLEdBQXdCLENBQUMsQ0FBckQ7QUFDQSxHQU5NLE1BTUEsSUFBSSxLQUFLLE9BQUwsSUFBZ0IseUJBQXBCLEVBQStDO0FBQ3JELE9BQUksV0FBVyxLQUFLLFFBQXBCO0FBQ0EsT0FBSSxhQUFhLEtBQUssVUFBdEI7QUFDQSxlQUFZLFFBQVosSUFBd0IsS0FBSyxnQkFBN0I7QUFDQSxZQUFTLFFBQVQsSUFBcUIsS0FBSyxZQUExQjtBQUNBLG9CQUFpQixRQUFqQixJQUE2QixLQUFLLG9CQUFsQzs7QUFFQSxPQUFJLFVBQVUsU0FBUyxjQUFULENBQXdCLFVBQVUsUUFBbEMsQ0FBZDtBQUNBLFdBQVEsR0FBUixHQUFjLEtBQUssZ0JBQW5COztBQUVBLGVBQVksVUFBWixJQUEwQixDQUExQjtBQUNBLFlBQVMsVUFBVCxJQUF1QixDQUF2QjtBQUNBLG9CQUFpQixVQUFqQixJQUErQixDQUEvQjtBQUNBLE9BQUksV0FBVyxTQUFTLGNBQVQsQ0FBd0IsVUFBVSxVQUFsQyxDQUFmO0FBQ0EsWUFBUyxHQUFULEdBQWUsY0FBZjtBQUNBLEdBZk0sTUFlQSxJQUFJLEtBQUssT0FBTCxJQUFnQiwyQkFBcEIsRUFBaUQ7QUFDdkQsV0FBUSxHQUFSLENBQVksY0FBWjtBQUNBLGVBQVksS0FBSyxLQUFqQixJQUEwQixDQUExQjtBQUNBLE9BQUksT0FBTyxTQUFTLGNBQVQsQ0FBd0IsVUFBVSxLQUFLLEtBQXZDLENBQVg7QUFDQSxRQUFLLEdBQUwsR0FBVyxjQUFYO0FBQ0EsR0FMTSxNQUtBLElBQUksS0FBSyxPQUFMLElBQWdCLDBCQUFwQixFQUFnRDtBQUNyRCxzQkFBbUIsS0FBSyxnQkFBeEI7QUFDRCxHQUZNLE1BRUEsSUFBSSxLQUFLLE9BQUwsSUFBZ0Isc0JBQXBCLEVBQTRDO0FBQ2xELFlBQVMsS0FBSyxLQUFkLElBQXVCLFNBQVMsS0FBSyxLQUFkLElBQXVCLEtBQUssTUFBbkQ7QUFDQSxHQUZNLE1BRUEsSUFBSSxLQUFLLE9BQUwsSUFBZ0Isb0JBQXBCLEVBQTBDO0FBQ2hELE9BQUksS0FBSyxPQUFMLElBQWdCLENBQXBCLEVBQXVCO0FBQ3RCLFVBQU0sVUFBVSxLQUFLLFNBQWYsR0FBMkIsb0JBQWpDO0FBQ0EsSUFGRCxNQUVPO0FBQ04sVUFBTSxvQkFBb0IsS0FBSyxTQUF6QixHQUFxQyxpQkFBM0M7QUFDQTtBQUNELEdBTk0sTUFNQSxJQUFJLEtBQUssT0FBTCxJQUFnQixvQkFBcEIsRUFBMEM7QUFDaEQsT0FBSSxLQUFLLE9BQUwsSUFBZ0IsQ0FBcEIsRUFBdUI7QUFDdEIsUUFBSSxhQUFhLEtBQUssVUFBdEI7QUFDQSw4QkFBMEIsV0FBVyx1QkFBckM7QUFDQSw2QkFBeUIsV0FBVyxzQkFBcEM7QUFDQSxvQkFBZ0IsV0FBVyxXQUEzQixFQUF3QyxLQUFLLElBQUwsQ0FBVSxXQUFXLFdBQVgsQ0FBdUIsTUFBakMsQ0FBeEMsRUFBa0YsV0FBVyxRQUE3RixFQUF1RyxXQUFXLGdCQUFsSDtBQUNBLElBTEQsTUFLTztBQUNOLFVBQU0seUJBQXlCLEtBQUssU0FBcEM7QUFDQTtBQUNEO0FBQ0E7QUFDRixDQTFFRDs7QUE0RUEsSUFBSSxzQkFBc0IsRUFBRSw0QkFBRixDQUExQjtBQUNBLG9CQUFvQixFQUFwQixDQUF1QixPQUF2QixFQUFnQyxXQUFoQztBQUNBLG9CQUFvQixJQUFwQjs7QUFFQSxJQUFJLG9CQUFvQixFQUFFLDBCQUFGLENBQXhCO0FBQ0Esa0JBQWtCLEVBQWxCLENBQXFCLE9BQXJCLEVBQThCLFNBQTlCO0FBQ0Esa0JBQWtCLElBQWxCOztBQUVBLElBQUksb0JBQW9CLEVBQUUsMEJBQUYsQ0FBeEI7QUFDQSxrQkFBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsU0FBOUI7QUFDQSxrQkFBa0IsSUFBbEI7O0FBRUEsSUFBSSx5QkFBeUIsRUFBRSwrQkFBRixDQUE3QjtBQUNBLHVCQUF1QixFQUF2QixDQUEwQixPQUExQixFQUFtQyxjQUFuQztBQUNBLHVCQUF1QixJQUF2Qjs7QUFFQSxJQUFJLG1CQUFtQixFQUFFLHlCQUFGLENBQXZCO0FBQ0EsaUJBQWlCLElBQWpCOztBQUVBLElBQUksa0JBQWtCLEVBQUUsd0JBQUYsQ0FBdEI7QUFDQSxnQkFBZ0IsSUFBaEI7Ozs7Ozs7O0FDamxCQSxJQUFJLGVBQUo7O0FBRUEsU0FBUyxJQUFULENBQWMsR0FBZCxFQUFtQjtBQUNqQixXQUFTLElBQUksU0FBSixDQUFjLEdBQWQsQ0FBVDtBQUNBLFVBQVEsR0FBUixDQUFZLGNBQVo7QUFDRDs7QUFFRCxTQUFTLG1CQUFULENBQTZCLGVBQTdCLEVBQThDO0FBQzVDLFNBQU8sTUFBUCxHQUFnQixZQUFNO0FBQ3BCLFlBQVEsR0FBUixDQUFZLE1BQVo7QUFDQTtBQUNELEdBSEQ7QUFJRDs7QUFFRCxTQUFTLHNCQUFULENBQWdDLGVBQWhDLEVBQWlEO0FBQy9DLFNBQU8sU0FBUCxHQUFtQixVQUFDLENBQUQsRUFBTztBQUN4QixRQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsRUFBRSxJQUFiLENBQVg7QUFDQSxvQkFBZ0IsSUFBaEI7QUFDRCxHQUhEO0FBSUQ7O0FBRUQsU0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQThCO0FBQzVCLFNBQU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBWjtBQUNEOztrQkFFYztBQUNiLFlBRGE7QUFFYiwwQ0FGYTtBQUdiLGdEQUhhO0FBSWI7QUFKYSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHNvY2tldCBmcm9tICcuL3dzLWNsaWVudCc7XHJcblxyXG52YXIgJCA9IHdpbmRvdy5qUXVlcnk7XHJcblxyXG52YXIgQ1JFQVRFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY3JlYXRlX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBTQVZFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2F2ZV9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgTE9BRF9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImxvYWRfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIFJPTExfSU5JVElBVElWRV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInJvbGxfaW5pdGlhdGl2ZV9idXR0b25cIl0nO1xyXG5cclxudmFyIEJPQVJEX1NJWkVfSU5QVVRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJvYXJkX3NpemVfaW5wdXRcIl0nO1xyXG52YXIgU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX25hbWVfaW5wdXRcIl0nO1xyXG5cclxudmFyIFNFUlZFUl9BRERSRVNTID0gbG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoL15odHRwLywgJ3dzJyk7XHJcblxyXG52YXIgbXlfbmFtZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKSk7XHJcbnZhciBteV9yb2xlID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3JvbGUnKSk7XHJcblxyXG52YXIgY2hhcmFjdGVyX2xpc3QgPSBbXTtcclxudmFyIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvID0gW107XHJcbnZhciBvYnN0YWNsZV9saXN0ID0gW107XHJcbnZhciBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gW107XHJcblxyXG52YXIgVElOWV9FRkZFQ1RfQ0xBU1MgPSAnaXMtdGlueSc7XHJcblxyXG52YXIgRU1QVFlfQ0VMTF9QSUMgPSBcIi4vaW1hZ2VzL3NxdWFyZS5qcGdcIjtcclxuXHJcbi8vIFRoaXMgaXMgYSBjb25zdGFudCwgd2lsbCBiZSBtb3ZlZCB0byBkYXRhYmFzZSBsYXRlclxyXG5jb25zdCBIUF92YWx1ZXMgPSBbMTUsIDMwLCA0MCwgNTUsIDc1LCAxMDAsIDEzMCwgMTY1XTtcclxuXHJcbmxldCBib2FyZF9zdGF0ZSA9IFtdO1xyXG5sZXQgSFBfc3RhdGUgPSBbXTtcclxubGV0IGluaXRpYXRpdmVfc3RhdGUgPSBbXTtcclxubGV0IHNpemU7XHJcblxyXG5sZXQgY2hhcmFjdGVyX2Jhc2UgPSBbXTtcclxubGV0IG9ic3RhY2xlX2Jhc2UgPSBbXTtcclxuXHJcblxyXG5sZXQgZmllbGRfY2hvc2VuID0gMDtcclxubGV0IGNob3Nlbl9pbmRleDtcclxubGV0IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXg7XHJcbmxldCBjaG9zZW5fY2hhcmFjdGVyX0hQO1xyXG5sZXQgY2hvc2VuX2NoYXJhY3Rlcl9pbml0aWF0aXZlO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XHJcblx0c2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRfc2l6ZVwiKS52YWx1ZTtcclxuXHRib2FyZF9zdGF0ZSA9IFtdO1xyXG5cdEhQX3N0YXRlID0gW107XHJcblx0aW5pdGlhdGl2ZV9zdGF0ZSA9IFtdO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZSpzaXplOyBpKyspIHtcclxuXHRcdGJvYXJkX3N0YXRlLnB1c2goMCk7XHJcblx0fVxyXG5cdHNlbmRfY29uc3RydWN0X2NvbW1hbmQoYm9hcmRfc3RhdGUsIHNpemUsIEhQX3N0YXRlLCBpbml0aWF0aXZlX3N0YXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEJvYXJkKCkge1xyXG5cdHZhciBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfbmFtZVwiKS52YWx1ZTtcclxuXHR2YXIgdG9TZW5kID0ge307XHJcblx0dG9TZW5kLmNvbW1hbmQgPSAnbG9hZF9nYW1lJztcclxuXHR0b1NlbmQuc2F2ZV9uYW1lID0gbmFtZTtcclxuXHR0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuXHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZF9jb25zdHJ1Y3RfY29tbWFuZChuZXdfYm9hcmRfc3RhdGUsIG5ld19zaXplLCBuZXdfSFBfc3RhdGUsIG5ld19pbml0aWF0aXZlX3N0YXRlKSB7XHJcblx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdHRvU2VuZC5jb21tYW5kID0gJ2NvbnN0cnVjdF9ib2FyZCc7XHJcblx0dG9TZW5kLmJvYXJkX3N0YXRlID0gbmV3X2JvYXJkX3N0YXRlO1xyXG5cdHRvU2VuZC5zaXplID0gbmV3X3NpemU7XHJcblx0dG9TZW5kLkhQX3N0YXRlID0gbmV3X0hQX3N0YXRlO1xyXG5cdHRvU2VuZC5pbml0aWF0aXZlX3N0YXRlID0gbmV3X2luaXRpYXRpdmVfc3RhdGU7XHJcblx0c29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbnN0cnVjdF9ib2FyZChuZXdfYm9hcmRfc3RhdGUsIG5ld19zaXplLCBuZXdfSFBfc3RhdGUsIG5ld19pbml0aWF0aXZlX3N0YXRlKSB7XHJcblx0Ym9hcmRfc3RhdGUgPSBuZXdfYm9hcmRfc3RhdGU7XHJcblx0SFBfc3RhdGUgPSBuZXdfSFBfc3RhdGU7XHJcblx0aW5pdGlhdGl2ZV9zdGF0ZSA9IG5ld19pbml0aWF0aXZlX3N0YXRlO1xyXG5cdHNpemUgPSBuZXdfc2l6ZTtcclxuXHJcblx0dmFyIGluZm9fY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0aW5mb19jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0dmFyIGJvYXJkX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xyXG5cdGJvYXJkX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdHZhciBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuXHRib2FyZC5jbGFzc05hbWUgPSBcImJvYXJkXCI7XHJcblxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcblx0XHR2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cdFx0cm93LmNsYXNzTmFtZSA9IFwiYm9hcmRfcm93XCI7XHJcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xyXG5cdFx0XHR2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuXHRcdFx0dmFyIGNlbGxfaWQgPSBpKnNpemUgKyBqO1xyXG5cdFx0XHRidXR0b24uaWQgPSBcImNlbGxfXCIgKyBjZWxsX2lkO1xyXG5cdFx0XHRidXR0b24ucm93ID0gaTtcclxuXHRcdFx0YnV0dG9uLmNvbHVtbiA9IGo7XHJcblx0XHRcdHZhciBpbWFnZV9uYW1lID0gZ2V0X29iamVjdF9waWN0dXJlKGJvYXJkX3N0YXRlW2NlbGxfaWRdKTtcclxuXHRcdFx0YnV0dG9uLnNyYyA9IGltYWdlX25hbWU7XHJcblx0XHRcdGJ1dHRvbi5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuXHRcdFx0YnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuXHRcdFx0YnV0dG9uLmNsYXNzTmFtZSA9ICdib2FyZF9jZWxsJztcclxuXHRcdFx0YnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHR2YXIgY2hhcmFjdGVyX3Byb2ZpbGVfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0XHRcdGNoYXJhY3Rlcl9wcm9maWxlX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHRcdFx0XHR2YXIgY2VsbCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0XHR2YXIgaW5kZXggPSBjZWxsLnJvdypzaXplICsgY2VsbC5jb2x1bW47XHJcblx0XHRcdFx0aWYgKGJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7IC8vIGVtcHR5IGNlbGwgY2xpY2tlZFxyXG5cdFx0XHRcdFx0aWYgKGZpZWxkX2Nob3NlbiA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdGFkZF9vYmplY3QoaW5kZXgpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0bW92ZV9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoYm9hcmRfc3RhdGVbaW5kZXhdID4gMCkgeyAvLyBjaGFyYWN0ZXIgY2xpY2tlZFxyXG5cdFx0XHRcdFx0aWYgKGZpZWxkX2Nob3NlbiA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdHNlbGVjdF9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpO1xyXG5cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHVuZG9fc2VsZWN0aW9uKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHsgLy8gb2JzdGFjbGUgY2xpY2tlZFxyXG5cdFx0XHRcdFx0aWYgKGZpZWxkX2Nob3NlbiA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCk7XHJcblxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dW5kb19zZWxlY3Rpb24oKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHRcdHZhciBjZWxsX3dyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XHJcblx0XHRcdGNlbGxfd3JhcC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG5cdFx0XHRjZWxsX3dyYXAuY2xhc3NOYW1lID0gXCJjZWxsX3dyYXBcIjtcclxuXHRcdFx0cm93LmFwcGVuZENoaWxkKGNlbGxfd3JhcCk7XHJcblx0XHR9XHJcblx0XHRib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xyXG5cdH1cclxuXHRib2FyZF9jb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmQpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gYWRkX29iamVjdChib2FyZF9pbmRleCkge1xyXG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuXHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0dmFyIGJ1dHRvbl9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdGJ1dHRvbl9jb250YWluZXIuY2xhc3NOYW1lID0gXCJhZGQtb2JqZWN0LWJ1dHRvbi1jb250YWluZXJcIjtcclxuXHJcblx0dmFyIGJ1dHRvbl9hZGRfY2hhcmFjdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRidXR0b25fYWRkX2NoYXJhY3Rlci5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0Ywg0L/QtdGA0YHQvtC90LDQttCwXCI7XHJcblx0YnV0dG9uX2FkZF9jaGFyYWN0ZXIub25jbGljayA9IGZ1bmN0aW9uKCkge2FkZF9jaGFyYWN0ZXIoYm9hcmRfaW5kZXgpO307XHJcblxyXG5cdHZhciBidXR0b25fYWRkX29ic3RhY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRidXR0b25fYWRkX29ic3RhY2xlLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1XCI7XHJcblx0YnV0dG9uX2FkZF9vYnN0YWNsZS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7YWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KTt9O1xyXG5cclxuXHRidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfY2hhcmFjdGVyKTtcclxuXHRidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfb2JzdGFjbGUpO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25fY29udGFpbmVyKTtcclxuXHJcblx0dGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGlueV9hbmltYXRpb24oY29udGFpbmVyKSB7XHJcblx0Y29udGFpbmVyLmNsYXNzTGlzdC5hZGQoVElOWV9FRkZFQ1RfQ0xBU1MpO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShUSU5ZX0VGRkVDVF9DTEFTUyk7XHJcbiAgfSwgNTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpIHtcclxuXHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cdHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG5cdHNlbGVjdC5pZCA9IFwib2JzdGFjbGVfY2hvc2VuXCI7XHJcblxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgb2JzdGFjbGVfbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuXHRcdGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IG9ic3RhY2xlX2xpc3RbaV07XHJcblx0XHRjdXJyZW50X29wdGlvbi52YWx1ZSA9IGk7XHJcblx0XHRzZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG5cdH1cclxuXHJcblx0dmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcblx0YnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG5cdGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG5cdGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcblx0XHR2YXIgb2JzdGFjbGVfbnVtYmVyID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvYnN0YWNsZV9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuXHRcdHZhciB0b1NlbmQgPSB7fTtcclxuXHRcdHRvU2VuZC5jb21tYW5kID0gJ2FkZF9vYnN0YWNsZSc7XHJcblx0XHR0b1NlbmQuY2VsbF9pZCA9IGJ1dHRvbi5ib2FyZF9pbmRleDtcclxuXHRcdHRvU2VuZC5vYnN0YWNsZV9udW1iZXIgPSBvYnN0YWNsZV9udW1iZXIgKyAxO1xyXG5cdFx0dG9TZW5kLm9ic3RhY2xlX25hbWUgPSBvYnN0YWNsZV9saXN0W29ic3RhY2xlX251bWJlcl07XHJcblx0XHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcblx0XHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0XHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHR9XHJcblxyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3QpO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b24pO1xyXG5cdHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcik7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KSB7XHJcblx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHR2YXIgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuXHRzZWxlY3QuaWQgPSBcImNoYXJhY3Rlcl9jaG9zZW5cIjtcclxuXHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuXHRcdGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IGNoYXJhY3Rlcl9saXN0W2ldO1xyXG5cdFx0Y3VycmVudF9vcHRpb24udmFsdWUgPSBpO1xyXG5cdFx0c2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuXHR9XHJcblxyXG5cdHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5cdGJ1dHRvbi5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0YxcIjtcclxuXHRidXR0b24uYm9hcmRfaW5kZXggPSBib2FyZF9pbmRleDtcclxuXHRidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHR2YXIgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0dmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlcl9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuXHRcdHZhciB0b1NlbmQgPSB7fTtcclxuXHRcdHRvU2VuZC5jb21tYW5kID0gJ2FkZF9jaGFyYWN0ZXInO1xyXG5cdFx0dG9TZW5kLmNlbGxfaWQgPSBidXR0b24uYm9hcmRfaW5kZXg7XHJcblx0XHR0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXIgKyAxO1xyXG5cdFx0dG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gY2hhcmFjdGVyX2xpc3RbY2hhcmFjdGVyX251bWJlcl07XHJcblx0XHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcblx0XHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0XHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHR9XHJcblxyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3QpO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b24pO1xyXG5cdHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcik7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZlX2NoYXJhY3Rlcih0b19pbmRleCwgdG9fY2VsbCkge1xyXG5cdGZpZWxkX2Nob3NlbiA9IDA7XHJcblx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdHRvU2VuZC5jb21tYW5kID0gJ21vdmVfY2hhcmFjdGVyJztcclxuXHR0b1NlbmQuZnJvbV9pbmRleCA9IGNob3Nlbl9pbmRleDtcclxuXHR0b1NlbmQudG9faW5kZXggPSB0b19pbmRleDtcclxuXHR0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXg7XHJcblx0dG9TZW5kLmNoYXJhY3Rlcl9ocCA9IGNob3Nlbl9jaGFyYWN0ZXJfSFA7XHJcblx0dG9TZW5kLmNoYXJhY3Rlcl9pbml0aWF0aXZlID0gY2hvc2VuX2NoYXJhY3Rlcl9pbml0aWF0aXZlO1xyXG5cdHRvU2VuZC5jaGFyYWN0ZXJfYXZhdGFyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uYXZhdGFyO1xyXG5cdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RfY2hhcmFjdGVyKGluZGV4LCBjZWxsKSB7XHJcblx0dmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2JvYXJkX3N0YXRlW2luZGV4XV07XHJcblxyXG5cdGxldCBuYW1lID0gY2hhcmFjdGVyLm5hbWU7XHJcblx0bGV0IGF2YXRhciA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcblxyXG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuXHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0dmFyIG5hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuXHRuYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gbmFtZTtcclxuXHJcblx0dmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuXHRhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcblx0YXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG5cdGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG5cdHZhciBzdHJlbmd0aF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG5cdHN0cmVuZ3RoX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCJD0LjQu9CwOiBcIiArIGNoYXJhY3Rlci5zdHJlbmd0aDtcclxuXHJcblx0dmFyIHN0YW1pbmFfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuXHRzdGFtaW5hX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQotC10LvQvtGB0LvQvtC20LXQvdC40LU6IFwiICsgY2hhcmFjdGVyLnN0YW1pbmE7XHJcblxyXG5cdHZhciBhZ2lsaXR5X2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcblx0YWdpbGl0eV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JvQvtCy0LrQvtGB0YLRjDogXCIgKyBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcblx0dmFyIGludGVsbGlnZW5jZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG5cdGludGVsbGlnZW5jZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdGC0LXQu9C70LXQutGCOiBcIiArIGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcblxyXG5cdHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG5cdEhQX2Rpc3BsYXkuaWQgPSBcIkhQX2Rpc3BsYXlcIjtcclxuXHRIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBIUF9zdGF0ZVtpbmRleF07XHJcblxyXG5cdHZhciBpbml0aWF0aXZlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcblx0aW5pdGlhdGl2ZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdC40YbQuNCw0YLQuNCy0LA6IFwiICsgaW5pdGlhdGl2ZV9zdGF0ZVtpbmRleF07XHJcblxyXG5cclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQobmFtZV9kaXNwbGF5KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoYXZhdGFyX2Rpc3BsYXkpO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdHJlbmd0aF9kaXNwbGF5KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhbWluYV9kaXNwbGF5KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoYWdpbGl0eV9kaXNwbGF5KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoaW50ZWxsaWdlbmNlX2Rpc3BsYXkpO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChIUF9kaXNwbGF5KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5pdGlhdGl2ZV9kaXNwbGF5KTtcclxuXHJcblx0dmFyIG1vdmVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRtb3ZlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCf0LXRgNC10LzQtdGJ0LXQvdC40LVcIjtcclxuXHRtb3ZlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG5cdG1vdmVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG5cdG1vdmVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG5cdFx0Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblx0XHR2YXIgY2hhcmFjdGVyX3BpY2tlZCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShjaGFyYWN0ZXJfcGlja2VkLmluZGV4LCBjaGFyYWN0ZXJfcGlja2VkLmNlbGwpO1xyXG5cdH1cclxuXHJcblx0dmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5cdGRlbGV0ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQo9C90LjRh9GC0L7QttC40YLRjFwiO1xyXG5cdGRlbGV0ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuXHRkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG5cdGRlbGV0ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRkZWxldGVfb2JqZWN0KGV2ZW50KTtcclxuXHR9XHJcblxyXG5cdHZhciBkYW1hZ2VfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRkYW1hZ2VfYnV0dG9uLmlubmVySFRNTCA9IFwi0J3QsNC90LXRgdGC0Lgg0YPRgNC+0L1cIjtcclxuXHRkYW1hZ2VfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcblx0ZGFtYWdlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbWFnZV9maWVsZFwiKTtcclxuXHRcdGlmKCEoZGFtYWdlX2ZpZWxkLnZhbHVlID09PSBcIlwiKSkge1xyXG5cdFx0XHR2YXIgZGFtYWdlID0gcGFyc2VJbnQoZGFtYWdlX2ZpZWxkLnZhbHVlKTtcclxuXHRcdFx0dmFyIEhQX2Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkhQX2Rpc3BsYXlcIik7XHJcblx0XHRcdHZhciBuZXdfSFAgPSBIUF9zdGF0ZVtldmVudC50YXJnZXQuaW5kZXhdIC0gZGFtYWdlO1xyXG5cdFx0XHRIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBuZXdfSFA7XHJcblxyXG5cdFx0XHR2YXIgdG9TZW5kID0ge307XHJcblx0XHRcdHRvU2VuZC5jb21tYW5kID0gJ2RlYWxfZGFtYWdlJztcclxuXHRcdFx0dG9TZW5kLmluZGV4ID0gZXZlbnQudGFyZ2V0LmluZGV4O1xyXG5cdFx0XHR0b1NlbmQuZGFtYWdlID0gZGFtYWdlO1xyXG5cdFx0XHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcblx0ZGFtYWdlX2ZpZWxkLmlkID0gXCJkYW1hZ2VfZmllbGRcIjtcclxuXHRkYW1hZ2VfZmllbGQudHlwZSA9IFwibnVtYmVyXCI7XHJcblx0ZGFtYWdlX2ZpZWxkLnBsYWNlaG9sZGVyID0gXCLQl9C90LDRh9C10L3QuNC1INGD0YDQvtC90LBcIjtcclxuXHJcblx0dmFyIGJ1dHRvbl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG5cdGJ1dHRvbl9saXN0LmNsYXNzTmFtZSA9IFwiYnV0dG9uX2xpc3RcIjtcclxuXHR2YXIgbGluZTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcblx0dmFyIGxpbmUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG5cdHZhciBsaW5lMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuXHJcblxyXG5cdGxpbmUxLmFwcGVuZENoaWxkKG1vdmVfYnV0dG9uKTtcclxuXHRsaW5lMi5hcHBlbmRDaGlsZChkZWxldGVfYnV0dG9uKTtcclxuXHRsaW5lMy5hcHBlbmRDaGlsZChkYW1hZ2VfYnV0dG9uKTtcclxuXHRsaW5lMy5hcHBlbmRDaGlsZChkYW1hZ2VfZmllbGQpO1xyXG5cclxuXHRidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMSk7XHJcblx0YnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTIpO1xyXG5cdGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUzKTtcclxuXHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9saXN0KTtcclxuXHJcblx0dGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZV9vYmplY3QoZXZlbnQpIHtcclxuXHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cdHZhciB0b1NlbmQgPSB7fTtcclxuXHR0b1NlbmQuY29tbWFuZCA9ICdkZWxldGVfY2hhcmFjdGVyJztcclxuXHR0b1NlbmQuaW5kZXggPSBldmVudC50YXJnZXQuaW5kZXg7XHJcblx0c29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCkge1xyXG5cdHZhciBvYnN0YWNsZV9pZCA9IGJvYXJkX3N0YXRlW2luZGV4XSooLTEpO1xyXG5cdHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9bb2JzdGFjbGVfaWRdO1xyXG5cclxuXHRsZXQgbmFtZSA9IG9ic3RhY2xlLm5hbWU7XHJcblx0bGV0IGF2YXRhciA9IG9ic3RhY2xlLmF2YXRhcjtcclxuXHJcblx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHR2YXIgbmFtZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG5cdG5hbWVfZGlzcGxheS5pbm5lckhUTUwgPSBuYW1lO1xyXG5cclxuXHR2YXIgYXZhdGFyX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG5cdGF2YXRhcl9kaXNwbGF5LnNyYyA9IGF2YXRhcjtcclxuXHRhdmF0YXJfZGlzcGxheS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcblx0YXZhdGFyX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuXHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWVfZGlzcGxheSk7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGF2YXRhcl9kaXNwbGF5KTtcclxuXHJcblx0dmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5cdGRlbGV0ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQo9C90LjRh9GC0L7QttC40YLRjFwiO1xyXG5cdGRlbGV0ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuXHRkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG5cdGRlbGV0ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRkZWxldGVfb2JqZWN0KGV2ZW50KTtcclxuXHR9XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGRlbGV0ZV9idXR0b24pO1xyXG5cclxuXHR0aW55X2FuaW1hdGlvbihjb250YWluZXIpO1xyXG5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShpbmRleCwgY2VsbCkge1xyXG5cdGZpZWxkX2Nob3NlbiA9IDE7XHJcblx0Y2hvc2VuX2luZGV4ID0gaW5kZXg7XHJcblx0Y2hvc2VuX2NoYXJhY3Rlcl9IUCA9IEhQX3N0YXRlW2luZGV4XTtcclxuXHRjaG9zZW5fY2hhcmFjdGVyX2luaXRpYXRpdmUgPSBpbml0aWF0aXZlX3N0YXRlW2luZGV4XTtcclxuXHRjaG9zZW5fY2hhcmFjdGVyX2luZGV4ID0gYm9hcmRfc3RhdGVbaW5kZXhdO1xyXG5cdGNlbGwuc3JjID0gXCIuL2ltYWdlcy9sb2FkaW5nLndlYnBcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5kb19zZWxlY3Rpb24oKSB7XHJcblx0ZmllbGRfY2hvc2VuID0gMDtcclxuXHR2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBjaG9zZW5faW5kZXgpO1xyXG5cdG9sZF9jZWxsLnNyYyA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2JvYXJkX3N0YXRlW2Nob3Nlbl9pbmRleF1dLmF2YXRhcjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X29iamVjdF9waWN0dXJlKGluZGV4X2luX2JvYXJkX3N0YXRlKSB7XHJcblx0dmFyIGltYWdlID0gRU1QVFlfQ0VMTF9QSUM7XHJcblx0dmFyIGluZGV4X2luX2Jhc2U7XHJcblx0aWYgKGluZGV4X2luX2JvYXJkX3N0YXRlID4gMCkge1xyXG5cdFx0aW5kZXhfaW5fYmFzZSA9IGluZGV4X2luX2JvYXJkX3N0YXRlO1xyXG5cdFx0dmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2luZGV4X2luX2Jhc2VdO1xyXG5cdFx0aW1hZ2UgPSBjaGFyYWN0ZXIuYXZhdGFyO1xyXG5cdH0gZWxzZSBpZiAoaW5kZXhfaW5fYm9hcmRfc3RhdGUgPCAwKSB7XHJcblx0XHRpbmRleF9pbl9iYXNlID0gaW5kZXhfaW5fYm9hcmRfc3RhdGUqKC0xKTtcclxuXHRcdHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9baW5kZXhfaW5fYmFzZV07XHJcblx0XHRpbWFnZSA9IG9ic3RhY2xlLmF2YXRhcjtcclxuXHR9XHJcblxyXG5cdHJldHVybiBpbWFnZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZUJvYXJkKCkge1xyXG5cdHZhciBzYXZlX25hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcF9uYW1lXCIpLnZhbHVlO1xyXG5cdHZhciBnYW1lX3N0YXRlID0ge2JvYXJkX3N0YXRlOiBib2FyZF9zdGF0ZSwgSFBfc3RhdGU6IEhQX3N0YXRlLCBpbml0aWF0aXZlX3N0YXRlOiBpbml0aWF0aXZlX3N0YXRlLCBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbzogY2hhcmFjdGVyX2RldGFpbGVkX2luZm8sIG9ic3RhY2xlX2RldGFpbGVkX2luZm86IG9ic3RhY2xlX2RldGFpbGVkX2luZm99O1xyXG5cclxuXHR2YXIgdG9TZW5kID0ge307XHJcblx0dG9TZW5kLmNvbW1hbmQgPSAnc2F2ZV9nYW1lJztcclxuXHR0b1NlbmQuc2F2ZV9uYW1lID0gc2F2ZV9uYW1lO1xyXG5cdHRvU2VuZC5nYW1lX3N0YXRlID0gZ2FtZV9zdGF0ZTtcclxuXHR0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuXHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZUluaXRpYXRpdmUoYWdpbGl0eSkge1xyXG5cdHJldHVybiBhZ2lsaXR5ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsSW5pdGlhdGl2ZSgpIHtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkX3N0YXRlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRpZiAoYm9hcmRfc3RhdGVbaV0gPiAwKSB7IC8vIHNvIHRoZXJlIGlzIGNoYXJhY3RlciBhdCBwb3NpdGlvbiBpXHJcblx0XHRcdC8vIHJldHJpZXZlIHRoYXQgY2hhcmFjdGVyJ3MgYWdpbGl0eVxyXG5cdFx0XHR2YXIgY2hhcmFjdGVyX2luZGV4ID0gYm9hcmRfc3RhdGVbaV07XHJcblx0XHRcdHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfaW5kZXhdO1xyXG5cclxuXHRcdFx0dmFyIGFnaWxpdHkgPSBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcblx0XHRcdC8vIHJvbGwgaW5pdGlhdGl2ZSBhbmQgYWRkIGFnaWxpdHkgbW9kaWZpY2F0b3JcclxuXHRcdFx0dmFyIGluaXRpYXRpdmUgPSBjb21wdXRlSW5pdGlhdGl2ZShwYXJzZUludChhZ2lsaXR5KSk7XHJcblxyXG5cdFx0XHRpbml0aWF0aXZlX3N0YXRlW2ldID0gaW5pdGlhdGl2ZTtcclxuXHRcdH1cclxuXHR9XHJcblx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdHRvU2VuZC5jb21tYW5kID0gJ3JvbGxfaW5pdGlhdGl2ZSc7XHJcblx0dG9TZW5kLmluaXRpYXRpdmVfc3RhdGUgPSBpbml0aWF0aXZlX3N0YXRlO1xyXG5cdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG4vL3NvY2tldC5pbml0KCd3czovL2xvY2FsaG9zdDozMDAxJyk7XHJcbnNvY2tldC5pbml0KFNFUlZFUl9BRERSRVNTKTtcclxuXHJcbnNvY2tldC5yZWdpc3Rlck9wZW5IYW5kbGVyKCgpID0+IHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAncGxheWVyX2luZm8nO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb2xlID0gbXlfcm9sZTtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICB0b1NlbmQucGFzc3dvcmQgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2dtX3Bhc3N3b3JkJykpO1xyXG4gIH1cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufSk7XHJcblxyXG5zb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcigoZGF0YSkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdGlmICgoZGF0YS50b19uYW1lID09IG15X25hbWUpfHwoZGF0YS50b19uYW1lID09ICdhbGwnKSkge1xyXG4gICAgaWYgKGRhdGEuY29tbWFuZCA9PSAncGxheWVyX2luZm9fcmVzcG9uc2UnKSB7XHJcblx0XHRcdGlmIChkYXRhLmlzVmFsaWQgPT0gMCkge1xyXG5cdFx0XHRcdGFsZXJ0KCfQotCwINC60LDQutC+0Lkg0YLRiyDQs9C8Jyk7XHJcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoZGF0YS5yb2xlID09ICdnbScpIHtcclxuXHRcdFx0XHRjcmVhdGVfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuXHRcdFx0XHRzYXZlX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcblx0XHRcdFx0bG9hZF9ib2FyZF9idXR0b24uc2hvdygpO1xyXG5cdFx0XHRcdHJvbGxfaW5pdGlhdGl2ZV9idXR0b24uc2hvdygpO1xyXG5cdFx0XHRcdHNhdmVfbmFtZV9pbnB1dC5zaG93KCk7XHJcblx0XHRcdFx0Ym9hcmRfc2l6ZV9pbnB1dC5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2hhcmFjdGVyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0O1xyXG5cdFx0XHRvYnN0YWNsZV9saXN0ID0gZGF0YS5vYnN0YWNsZV9saXN0O1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NvbnN0cnVjdF9ib2FyZF9yZXNwb25zZScpIHtcclxuXHRcdFx0Y29uc3RydWN0X2JvYXJkKGRhdGEuYm9hcmRfc3RhdGUsIGRhdGEuc2l6ZSwgZGF0YS5IUF9zdGF0ZSwgZGF0YS5pbml0aWF0aXZlX3N0YXRlKTtcclxuXHRcdH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdhZGRfY2hhcmFjdGVyX3Jlc3BvbnNlJykge1xyXG5cdFx0XHR2YXIgY2hhcmFjdGVyID0gZGF0YS5jaGFyYWN0ZXJfaW5mbztcclxuXHRcdFx0Y2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3RlcjtcclxuXHRcdFx0dmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBkYXRhLmNlbGxfaWQpO1xyXG5cdFx0XHRjZWxsLnNyYyA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcblx0XHRcdGJvYXJkX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBkYXRhLmNoYXJhY3Rlcl9udW1iZXI7XHJcblx0XHRcdEhQX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdO1xyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2FkZF9vYnN0YWNsZV9yZXNwb25zZScpIHtcclxuXHRcdFx0dmFyIG9ic3RhY2xlID0gZGF0YS5vYnN0YWNsZV9pbmZvO1xyXG5cdFx0XHRvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW2RhdGEub2JzdGFjbGVfbnVtYmVyXSA9IG9ic3RhY2xlO1xyXG5cdFx0XHR2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGRhdGEuY2VsbF9pZCk7XHJcblx0XHRcdGNlbGwuc3JjID0gb2JzdGFjbGUuYXZhdGFyO1xyXG5cdFx0XHRib2FyZF9zdGF0ZVtkYXRhLmNlbGxfaWRdID0gZGF0YS5vYnN0YWNsZV9udW1iZXIgKiAoLTEpO1xyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ21vdmVfY2hhcmFjdGVyX3Jlc3BvbnNlJykge1xyXG5cdFx0XHR2YXIgdG9faW5kZXggPSBkYXRhLnRvX2luZGV4O1xyXG5cdFx0XHR2YXIgZnJvbV9pbmRleCA9IGRhdGEuZnJvbV9pbmRleDtcclxuXHRcdFx0Ym9hcmRfc3RhdGVbdG9faW5kZXhdID0gZGF0YS5jaGFyYWN0ZXJfbnVtYmVyO1xyXG5cdFx0XHRIUF9zdGF0ZVt0b19pbmRleF0gPSBkYXRhLmNoYXJhY3Rlcl9ocDtcclxuXHRcdFx0aW5pdGlhdGl2ZV9zdGF0ZVt0b19pbmRleF0gPSBkYXRhLmNoYXJhY3Rlcl9pbml0aWF0aXZlO1xyXG5cclxuXHRcdFx0dmFyIHRvX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgdG9faW5kZXgpO1xyXG5cdFx0XHR0b19jZWxsLnNyYyA9IGRhdGEuY2hhcmFjdGVyX2F2YXRhcjtcclxuXHJcblx0XHRcdGJvYXJkX3N0YXRlW2Zyb21faW5kZXhdID0gMDtcclxuXHRcdFx0SFBfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG5cdFx0XHRpbml0aWF0aXZlX3N0YXRlW2Zyb21faW5kZXhdID0gMDtcclxuXHRcdFx0dmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZnJvbV9pbmRleCk7XHJcblx0XHRcdG9sZF9jZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlbGV0ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdiaW4gY2hpbGxpbmcnKTtcclxuXHRcdFx0Ym9hcmRfc3RhdGVbZGF0YS5pbmRleF0gPSAwO1xyXG5cdFx0XHR2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBkYXRhLmluZGV4KTtcclxuXHRcdFx0Y2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuXHRcdH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdyb2xsX2luaXRpYXRpdmVfcmVzcG9uc2UnKSB7XHJcblx0XHRcdFx0aW5pdGlhdGl2ZV9zdGF0ZSA9IGRhdGEuaW5pdGlhdGl2ZV9zdGF0ZTtcclxuXHRcdH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdkZWFsX2RhbWFnZV9yZXNwb25zZScpIHtcclxuXHRcdFx0SFBfc3RhdGVbZGF0YS5pbmRleF0gPSBIUF9zdGF0ZVtkYXRhLmluZGV4XSAtIGRhdGEuZGFtYWdlO1xyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NhdmVfZ2FtZV9yZXNwb25zZScpIHtcclxuXHRcdFx0aWYgKGRhdGEuc3VjY2VzcyA9PSAxKSB7XHJcblx0XHRcdFx0YWxlcnQoJ0dhbWUgJyArIGRhdGEuc2F2ZV9uYW1lICsgJyBzYXZlZCBzdWNjZXNmdWxseScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGFsZXJ0KCdHYW1lIHdpdGggbmFtZSAnICsgZGF0YS5zYXZlX25hbWUgKyAnIGFscmVhZHkgZXhpc3QhJyk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdsb2FkX2dhbWVfcmVzcG9uc2UnKSB7XHJcblx0XHRcdGlmIChkYXRhLnN1Y2Nlc3MgPT0gMSkge1xyXG5cdFx0XHRcdHZhciBnYW1lX3N0YXRlID0gZGF0YS5nYW1lX3N0YXRlO1xyXG5cdFx0XHRcdGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvID0gZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbztcclxuXHRcdFx0XHRvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gZ2FtZV9zdGF0ZS5vYnN0YWNsZV9kZXRhaWxlZF9pbmZvO1xyXG5cdFx0XHRcdGNvbnN0cnVjdF9ib2FyZChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlLCBNYXRoLnNxcnQoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZS5sZW5ndGgpLCBnYW1lX3N0YXRlLkhQX3N0YXRlLCBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGFsZXJ0KCdGYWlsZWQgdG8gbG9hZCBnYW1lICcgKyBkYXRhLnNhdmVfbmFtZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9XHJcbn0pO1xyXG5cclxudmFyIGNyZWF0ZV9ib2FyZF9idXR0b24gPSAkKENSRUFURV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5jcmVhdGVfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGNyZWF0ZUJvYXJkKTtcclxuY3JlYXRlX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgc2F2ZV9ib2FyZF9idXR0b24gPSAkKFNBVkVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxuc2F2ZV9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgc2F2ZUJvYXJkKTtcclxuc2F2ZV9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGxvYWRfYm9hcmRfYnV0dG9uID0gJChMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxvYWRfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGxvYWRCb2FyZCk7XHJcbmxvYWRfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciByb2xsX2luaXRpYXRpdmVfYnV0dG9uID0gJChST0xMX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SKTtcclxucm9sbF9pbml0aWF0aXZlX2J1dHRvbi5vbignY2xpY2snLCByb2xsSW5pdGlhdGl2ZSk7XHJcbnJvbGxfaW5pdGlhdGl2ZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGJvYXJkX3NpemVfaW5wdXQgPSAkKEJPQVJEX1NJWkVfSU5QVVRfU0VMRUNUT1IpO1xyXG5ib2FyZF9zaXplX2lucHV0LmhpZGUoKTtcclxuXHJcbnZhciBzYXZlX25hbWVfaW5wdXQgPSAkKFNBVkVfTkFNRV9JTlBVVF9TRUxFQ1RPUik7XHJcbnNhdmVfbmFtZV9pbnB1dC5oaWRlKCk7XHJcbiIsImxldCBzb2NrZXQ7XHJcblxyXG5mdW5jdGlvbiBpbml0KHVybCkge1xyXG4gIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyT3BlbkhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XHJcbiAgc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdvcGVuJyk7XHJcbiAgICBoYW5kbGVyRnVuY3Rpb24oKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICBoYW5kbGVyRnVuY3Rpb24oZGF0YSk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UocGF5bG9hZCkge1xyXG4gIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgcmVnaXN0ZXJPcGVuSGFuZGxlcixcclxuICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyLFxyXG4gIHNlbmRNZXNzYWdlXHJcbn1cclxuIl19
