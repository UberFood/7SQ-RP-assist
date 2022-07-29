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
var character_base = [];
var obstacle_base = [];
var size = void 0;

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
	var game_state_unparsed = localStorage.getItem(name);
	var game_state = JSON.parse(game_state_unparsed);

	send_construct_command(game_state.board_state, Math.sqrt(game_state.board_state.length), game_state.HP_state, game_state.initiative_state);
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

	var character_base_unparsed = localStorage.getItem('characters');
	if (character_base_unparsed != null) {
		character_base = JSON.parse(character_base_unparsed);
	}

	var obstacle_base_unparsed = localStorage.getItem('obstacles');
	if (obstacle_base_unparsed != null) {
		obstacle_base = JSON.parse(obstacle_base_unparsed);
	}

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
		} else {
			var damage = 0;
		}

		HP_state[event.target.index] = HP_state[event.target.index] - damage;

		var HP_display = document.getElementById("HP_display");
		HP_display.innerHTML = "ХП: " + HP_state[event.target.index];
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
		index_in_base = index_in_board_state - 1;
		var character_unparsed = localStorage.getItem(character_base[index_in_base]);
		var character = JSON.parse(character_unparsed);
		image = character.avatar;
	} else if (index_in_board_state < 0) {
		index_in_base = index_in_board_state * -1 - 1;
		var obstacle_unparsed = localStorage.getItem(obstacle_base[index_in_base]);
		var obstacle = JSON.parse(obstacle_unparsed);
		image = obstacle.avatar;
	}

	return image;
}

function saveBoard() {
	var name = document.getElementById("map_name").value;
	var game_state = { board_state: board_state, HP_state: HP_state, initiative_state: initiative_state };
	localStorage.setItem(name, JSON.stringify(game_state));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksK0JBQStCLG1DQUFuQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksa0NBQWtDLHNDQUF0Qzs7QUFFQSxJQUFJLDRCQUE0QixnQ0FBaEM7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7O0FBRUEsSUFBSSxpQkFBaUIsU0FBUyxNQUFULENBQWdCLE9BQWhCLENBQXdCLE9BQXhCLEVBQWlDLElBQWpDLENBQXJCOztBQUVBLElBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxlQUFlLE9BQWYsQ0FBdUIsVUFBdkIsQ0FBWCxDQUFkO0FBQ0EsSUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLGVBQWUsT0FBZixDQUF1QixXQUF2QixDQUFYLENBQWQ7O0FBRUEsSUFBSSxpQkFBaUIsRUFBckI7QUFDQSxJQUFJLDBCQUEwQixFQUE5QjtBQUNBLElBQUksZ0JBQWdCLEVBQXBCO0FBQ0EsSUFBSSx5QkFBeUIsRUFBN0I7O0FBRUEsSUFBSSxvQkFBb0IsU0FBeEI7O0FBRUEsSUFBSSxpQkFBaUIscUJBQXJCOztBQUVBO0FBQ0EsSUFBTSxZQUFZLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQixDQUFsQjs7QUFFQSxJQUFJLGNBQWMsRUFBbEI7QUFDQSxJQUFJLFdBQVcsRUFBZjtBQUNBLElBQUksbUJBQW1CLEVBQXZCO0FBQ0EsSUFBSSxpQkFBaUIsRUFBckI7QUFDQSxJQUFJLGdCQUFnQixFQUFwQjtBQUNB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OUI7QUFDQSxrQkFBa0IsSUFBbEI7O0FBRUEsSUFBSSx5QkFBeUIsRUFBRSwrQkFBRixDQUE3QjtBQUNBLHVCQUF1QixFQUF2QixDQUEwQixPQUExQixFQUFtQyxjQUFuQztBQUNBLHVCQUF1QixJQUF2Qjs7QUFFQSxJQUFJLG1CQUFtQixFQUFFLHlCQUFGLENBQXZCO0FBQ0EsaUJBQWlCLElBQWpCOztBQUVBLElBQUksa0JBQWtCLEVBQUUsd0JBQUYsQ0FBdEI7QUFDQSxnQkFBZ0IsSUFBaEI7Ozs7Ozs7O0FDbmtCQSxJQUFJLGVBQUo7O0FBRUEsU0FBUyxJQUFULENBQWMsR0FBZCxFQUFtQjtBQUNqQixXQUFTLElBQUksU0FBSixDQUFjLEdBQWQsQ0FBVDtBQUNBLFVBQVEsR0FBUixDQUFZLGNBQVo7QUFDRDs7QUFFRCxTQUFTLG1CQUFULENBQTZCLGVBQTdCLEVBQThDO0FBQzVDLFNBQU8sTUFBUCxHQUFnQixZQUFNO0FBQ3BCLFlBQVEsR0FBUixDQUFZLE1BQVo7QUFDQTtBQUNELEdBSEQ7QUFJRDs7QUFFRCxTQUFTLHNCQUFULENBQWdDLGVBQWhDLEVBQWlEO0FBQy9DLFNBQU8sU0FBUCxHQUFtQixVQUFDLENBQUQsRUFBTztBQUN4QixRQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsRUFBRSxJQUFiLENBQVg7QUFDQSxvQkFBZ0IsSUFBaEI7QUFDRCxHQUhEO0FBSUQ7O0FBRUQsU0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQThCO0FBQzVCLFNBQU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBWjtBQUNEOztrQkFFYztBQUNiLFlBRGE7QUFFYiwwQ0FGYTtBQUdiLGdEQUhhO0FBSWI7QUFKYSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHNvY2tldCBmcm9tICcuL3dzLWNsaWVudCc7XHJcblxyXG52YXIgJCA9IHdpbmRvdy5qUXVlcnk7XHJcblxyXG52YXIgQ1JFQVRFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY3JlYXRlX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBTQVZFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2F2ZV9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgTE9BRF9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImxvYWRfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIFJPTExfSU5JVElBVElWRV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInJvbGxfaW5pdGlhdGl2ZV9idXR0b25cIl0nO1xyXG5cclxudmFyIEJPQVJEX1NJWkVfSU5QVVRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJvYXJkX3NpemVfaW5wdXRcIl0nO1xyXG52YXIgU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX25hbWVfaW5wdXRcIl0nO1xyXG5cclxudmFyIFNFUlZFUl9BRERSRVNTID0gbG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoL15odHRwLywgJ3dzJyk7XHJcblxyXG52YXIgbXlfbmFtZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKSk7XHJcbnZhciBteV9yb2xlID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3JvbGUnKSk7XHJcblxyXG52YXIgY2hhcmFjdGVyX2xpc3QgPSBbXTtcclxudmFyIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvID0gW107XHJcbnZhciBvYnN0YWNsZV9saXN0ID0gW107XHJcbnZhciBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gW107XHJcblxyXG52YXIgVElOWV9FRkZFQ1RfQ0xBU1MgPSAnaXMtdGlueSc7XHJcblxyXG52YXIgRU1QVFlfQ0VMTF9QSUMgPSBcIi4vaW1hZ2VzL3NxdWFyZS5qcGdcIjtcclxuXHJcbi8vIFRoaXMgaXMgYSBjb25zdGFudCwgd2lsbCBiZSBtb3ZlZCB0byBkYXRhYmFzZSBsYXRlclxyXG5jb25zdCBIUF92YWx1ZXMgPSBbMTUsIDMwLCA0MCwgNTUsIDc1LCAxMDAsIDEzMCwgMTY1XTtcclxuXHJcbmxldCBib2FyZF9zdGF0ZSA9IFtdO1xyXG5sZXQgSFBfc3RhdGUgPSBbXTtcclxubGV0IGluaXRpYXRpdmVfc3RhdGUgPSBbXTtcclxubGV0IGNoYXJhY3Rlcl9iYXNlID0gW107XHJcbmxldCBvYnN0YWNsZV9iYXNlID0gW107XHJcbmxldCBzaXplO1xyXG5cclxubGV0IGZpZWxkX2Nob3NlbiA9IDA7XHJcbmxldCBjaG9zZW5faW5kZXg7XHJcbmxldCBjaG9zZW5fY2hhcmFjdGVyX2luZGV4O1xyXG5sZXQgY2hvc2VuX2NoYXJhY3Rlcl9IUDtcclxubGV0IGNob3Nlbl9jaGFyYWN0ZXJfaW5pdGlhdGl2ZTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xyXG5cdHNpemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkX3NpemVcIikudmFsdWU7XHJcblx0Ym9hcmRfc3RhdGUgPSBbXTtcclxuXHRIUF9zdGF0ZSA9IFtdO1xyXG5cdGluaXRpYXRpdmVfc3RhdGUgPSBbXTtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNpemUqc2l6ZTsgaSsrKSB7XHJcblx0XHRib2FyZF9zdGF0ZS5wdXNoKDApO1xyXG5cdH1cclxuXHRzZW5kX2NvbnN0cnVjdF9jb21tYW5kKGJvYXJkX3N0YXRlLCBzaXplLCBIUF9zdGF0ZSwgaW5pdGlhdGl2ZV9zdGF0ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRCb2FyZCgpIHtcclxuXHR2YXIgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwX25hbWVcIikudmFsdWU7XHJcblx0dmFyIGdhbWVfc3RhdGVfdW5wYXJzZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lKTtcclxuXHR2YXIgZ2FtZV9zdGF0ZSA9IEpTT04ucGFyc2UoZ2FtZV9zdGF0ZV91bnBhcnNlZCk7XHJcblxyXG5cdHNlbmRfY29uc3RydWN0X2NvbW1hbmQoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZSwgTWF0aC5zcXJ0KGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUubGVuZ3RoKSwgZ2FtZV9zdGF0ZS5IUF9zdGF0ZSwgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZF9jb25zdHJ1Y3RfY29tbWFuZChuZXdfYm9hcmRfc3RhdGUsIG5ld19zaXplLCBuZXdfSFBfc3RhdGUsIG5ld19pbml0aWF0aXZlX3N0YXRlKSB7XHJcblx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdHRvU2VuZC5jb21tYW5kID0gJ2NvbnN0cnVjdF9ib2FyZCc7XHJcblx0dG9TZW5kLmJvYXJkX3N0YXRlID0gbmV3X2JvYXJkX3N0YXRlO1xyXG5cdHRvU2VuZC5zaXplID0gbmV3X3NpemU7XHJcblx0dG9TZW5kLkhQX3N0YXRlID0gbmV3X0hQX3N0YXRlO1xyXG5cdHRvU2VuZC5pbml0aWF0aXZlX3N0YXRlID0gbmV3X2luaXRpYXRpdmVfc3RhdGU7XHJcblx0c29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbnN0cnVjdF9ib2FyZChuZXdfYm9hcmRfc3RhdGUsIG5ld19zaXplLCBuZXdfSFBfc3RhdGUsIG5ld19pbml0aWF0aXZlX3N0YXRlKSB7XHJcblx0Ym9hcmRfc3RhdGUgPSBuZXdfYm9hcmRfc3RhdGU7XHJcblx0SFBfc3RhdGUgPSBuZXdfSFBfc3RhdGU7XHJcblx0aW5pdGlhdGl2ZV9zdGF0ZSA9IG5ld19pbml0aWF0aXZlX3N0YXRlO1xyXG5cdHNpemUgPSBuZXdfc2l6ZTtcclxuXHJcblx0bGV0IGNoYXJhY3Rlcl9iYXNlX3VucGFyc2VkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NoYXJhY3RlcnMnKTtcclxuXHRpZiAoY2hhcmFjdGVyX2Jhc2VfdW5wYXJzZWQgIT0gbnVsbCkge1xyXG5cdFx0Y2hhcmFjdGVyX2Jhc2UgPSBKU09OLnBhcnNlKGNoYXJhY3Rlcl9iYXNlX3VucGFyc2VkKTtcclxuXHR9XHJcblxyXG5cdGxldCBvYnN0YWNsZV9iYXNlX3VucGFyc2VkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ29ic3RhY2xlcycpO1xyXG5cdGlmIChvYnN0YWNsZV9iYXNlX3VucGFyc2VkICE9IG51bGwpIHtcclxuXHRcdG9ic3RhY2xlX2Jhc2UgPSBKU09OLnBhcnNlKG9ic3RhY2xlX2Jhc2VfdW5wYXJzZWQpO1xyXG5cdH1cclxuXHJcblx0dmFyIGluZm9fY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0aW5mb19jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0dmFyIGJvYXJkX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xyXG5cdGJvYXJkX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdHZhciBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuXHRib2FyZC5jbGFzc05hbWUgPSBcImJvYXJkXCI7XHJcblxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcblx0XHR2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cdFx0cm93LmNsYXNzTmFtZSA9IFwiYm9hcmRfcm93XCI7XHJcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xyXG5cdFx0XHR2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuXHRcdFx0dmFyIGNlbGxfaWQgPSBpKnNpemUgKyBqO1xyXG5cdFx0XHRidXR0b24uaWQgPSBcImNlbGxfXCIgKyBjZWxsX2lkO1xyXG5cdFx0XHRidXR0b24ucm93ID0gaTtcclxuXHRcdFx0YnV0dG9uLmNvbHVtbiA9IGo7XHJcblx0XHRcdHZhciBpbWFnZV9uYW1lID0gZ2V0X29iamVjdF9waWN0dXJlKGJvYXJkX3N0YXRlW2NlbGxfaWRdKTtcclxuXHRcdFx0YnV0dG9uLnNyYyA9IGltYWdlX25hbWU7XHJcblx0XHRcdGJ1dHRvbi5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuXHRcdFx0YnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuXHRcdFx0YnV0dG9uLmNsYXNzTmFtZSA9ICdib2FyZF9jZWxsJztcclxuXHRcdFx0YnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHR2YXIgY2hhcmFjdGVyX3Byb2ZpbGVfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0XHRcdGNoYXJhY3Rlcl9wcm9maWxlX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHRcdFx0XHR2YXIgY2VsbCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0XHR2YXIgaW5kZXggPSBjZWxsLnJvdypzaXplICsgY2VsbC5jb2x1bW47XHJcblx0XHRcdFx0aWYgKGJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7IC8vIGVtcHR5IGNlbGwgY2xpY2tlZFxyXG5cdFx0XHRcdFx0aWYgKGZpZWxkX2Nob3NlbiA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdGFkZF9vYmplY3QoaW5kZXgpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0bW92ZV9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoYm9hcmRfc3RhdGVbaW5kZXhdID4gMCkgeyAvLyBjaGFyYWN0ZXIgY2xpY2tlZFxyXG5cdFx0XHRcdFx0aWYgKGZpZWxkX2Nob3NlbiA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdHNlbGVjdF9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpO1xyXG5cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHVuZG9fc2VsZWN0aW9uKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHsgLy8gb2JzdGFjbGUgY2xpY2tlZFxyXG5cdFx0XHRcdFx0aWYgKGZpZWxkX2Nob3NlbiA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCk7XHJcblxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dW5kb19zZWxlY3Rpb24oKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHRcdHZhciBjZWxsX3dyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XHJcblx0XHRcdGNlbGxfd3JhcC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG5cdFx0XHRjZWxsX3dyYXAuY2xhc3NOYW1lID0gXCJjZWxsX3dyYXBcIjtcclxuXHRcdFx0cm93LmFwcGVuZENoaWxkKGNlbGxfd3JhcCk7XHJcblx0XHR9XHJcblx0XHRib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xyXG5cdH1cclxuXHRib2FyZF9jb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmQpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gYWRkX29iamVjdChib2FyZF9pbmRleCkge1xyXG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuXHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0dmFyIGJ1dHRvbl9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdGJ1dHRvbl9jb250YWluZXIuY2xhc3NOYW1lID0gXCJhZGQtb2JqZWN0LWJ1dHRvbi1jb250YWluZXJcIjtcclxuXHJcblx0dmFyIGJ1dHRvbl9hZGRfY2hhcmFjdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRidXR0b25fYWRkX2NoYXJhY3Rlci5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0Ywg0L/QtdGA0YHQvtC90LDQttCwXCI7XHJcblx0YnV0dG9uX2FkZF9jaGFyYWN0ZXIub25jbGljayA9IGZ1bmN0aW9uKCkge2FkZF9jaGFyYWN0ZXIoYm9hcmRfaW5kZXgpO307XHJcblxyXG5cdHZhciBidXR0b25fYWRkX29ic3RhY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRidXR0b25fYWRkX29ic3RhY2xlLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1XCI7XHJcblx0YnV0dG9uX2FkZF9vYnN0YWNsZS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7YWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KTt9O1xyXG5cclxuXHRidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfY2hhcmFjdGVyKTtcclxuXHRidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfb2JzdGFjbGUpO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25fY29udGFpbmVyKTtcclxuXHJcblx0dGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGlueV9hbmltYXRpb24oY29udGFpbmVyKSB7XHJcblx0Y29udGFpbmVyLmNsYXNzTGlzdC5hZGQoVElOWV9FRkZFQ1RfQ0xBU1MpO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShUSU5ZX0VGRkVDVF9DTEFTUyk7XHJcbiAgfSwgNTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpIHtcclxuXHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cdHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG5cdHNlbGVjdC5pZCA9IFwib2JzdGFjbGVfY2hvc2VuXCI7XHJcblxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgb2JzdGFjbGVfbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuXHRcdGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IG9ic3RhY2xlX2xpc3RbaV07XHJcblx0XHRjdXJyZW50X29wdGlvbi52YWx1ZSA9IGk7XHJcblx0XHRzZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG5cdH1cclxuXHJcblx0dmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcblx0YnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG5cdGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG5cdGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcblx0XHR2YXIgb2JzdGFjbGVfbnVtYmVyID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvYnN0YWNsZV9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuXHRcdHZhciB0b1NlbmQgPSB7fTtcclxuXHRcdHRvU2VuZC5jb21tYW5kID0gJ2FkZF9vYnN0YWNsZSc7XHJcblx0XHR0b1NlbmQuY2VsbF9pZCA9IGJ1dHRvbi5ib2FyZF9pbmRleDtcclxuXHRcdHRvU2VuZC5vYnN0YWNsZV9udW1iZXIgPSBvYnN0YWNsZV9udW1iZXIgKyAxO1xyXG5cdFx0dG9TZW5kLm9ic3RhY2xlX25hbWUgPSBvYnN0YWNsZV9saXN0W29ic3RhY2xlX251bWJlcl07XHJcblx0XHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcblx0XHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0XHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHR9XHJcblxyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3QpO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b24pO1xyXG5cdHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcik7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KSB7XHJcblx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHR2YXIgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuXHRzZWxlY3QuaWQgPSBcImNoYXJhY3Rlcl9jaG9zZW5cIjtcclxuXHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuXHRcdGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IGNoYXJhY3Rlcl9saXN0W2ldO1xyXG5cdFx0Y3VycmVudF9vcHRpb24udmFsdWUgPSBpO1xyXG5cdFx0c2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuXHR9XHJcblxyXG5cdHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5cdGJ1dHRvbi5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0YxcIjtcclxuXHRidXR0b24uYm9hcmRfaW5kZXggPSBib2FyZF9pbmRleDtcclxuXHRidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHR2YXIgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0dmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlcl9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuXHRcdHZhciB0b1NlbmQgPSB7fTtcclxuXHRcdHRvU2VuZC5jb21tYW5kID0gJ2FkZF9jaGFyYWN0ZXInO1xyXG5cdFx0dG9TZW5kLmNlbGxfaWQgPSBidXR0b24uYm9hcmRfaW5kZXg7XHJcblx0XHR0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXIgKyAxO1xyXG5cdFx0dG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gY2hhcmFjdGVyX2xpc3RbY2hhcmFjdGVyX251bWJlcl07XHJcblx0XHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcblx0XHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0XHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHR9XHJcblxyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3QpO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b24pO1xyXG5cdHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcik7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZlX2NoYXJhY3Rlcih0b19pbmRleCwgdG9fY2VsbCkge1xyXG5cdGZpZWxkX2Nob3NlbiA9IDA7XHJcblx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdHRvU2VuZC5jb21tYW5kID0gJ21vdmVfY2hhcmFjdGVyJztcclxuXHR0b1NlbmQuZnJvbV9pbmRleCA9IGNob3Nlbl9pbmRleDtcclxuXHR0b1NlbmQudG9faW5kZXggPSB0b19pbmRleDtcclxuXHR0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXg7XHJcblx0dG9TZW5kLmNoYXJhY3Rlcl9ocCA9IGNob3Nlbl9jaGFyYWN0ZXJfSFA7XHJcblx0dG9TZW5kLmNoYXJhY3Rlcl9pbml0aWF0aXZlID0gY2hvc2VuX2NoYXJhY3Rlcl9pbml0aWF0aXZlO1xyXG5cdHRvU2VuZC5jaGFyYWN0ZXJfYXZhdGFyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uYXZhdGFyO1xyXG5cdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RfY2hhcmFjdGVyKGluZGV4LCBjZWxsKSB7XHJcblx0dmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2JvYXJkX3N0YXRlW2luZGV4XV07XHJcblxyXG5cdGxldCBuYW1lID0gY2hhcmFjdGVyLm5hbWU7XHJcblx0bGV0IGF2YXRhciA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcblxyXG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuXHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0dmFyIG5hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuXHRuYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gbmFtZTtcclxuXHJcblx0dmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuXHRhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcblx0YXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG5cdGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG5cdHZhciBzdHJlbmd0aF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG5cdHN0cmVuZ3RoX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCJD0LjQu9CwOiBcIiArIGNoYXJhY3Rlci5zdHJlbmd0aDtcclxuXHJcblx0dmFyIHN0YW1pbmFfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuXHRzdGFtaW5hX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQotC10LvQvtGB0LvQvtC20LXQvdC40LU6IFwiICsgY2hhcmFjdGVyLnN0YW1pbmE7XHJcblxyXG5cdHZhciBhZ2lsaXR5X2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcblx0YWdpbGl0eV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JvQvtCy0LrQvtGB0YLRjDogXCIgKyBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcblx0dmFyIGludGVsbGlnZW5jZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG5cdGludGVsbGlnZW5jZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdGC0LXQu9C70LXQutGCOiBcIiArIGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcblxyXG5cdHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG5cdEhQX2Rpc3BsYXkuaWQgPSBcIkhQX2Rpc3BsYXlcIjtcclxuXHRIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBIUF9zdGF0ZVtpbmRleF07XHJcblxyXG5cdHZhciBpbml0aWF0aXZlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcblx0aW5pdGlhdGl2ZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdC40YbQuNCw0YLQuNCy0LA6IFwiICsgaW5pdGlhdGl2ZV9zdGF0ZVtpbmRleF07XHJcblxyXG5cclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQobmFtZV9kaXNwbGF5KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoYXZhdGFyX2Rpc3BsYXkpO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdHJlbmd0aF9kaXNwbGF5KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhbWluYV9kaXNwbGF5KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoYWdpbGl0eV9kaXNwbGF5KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoaW50ZWxsaWdlbmNlX2Rpc3BsYXkpO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChIUF9kaXNwbGF5KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5pdGlhdGl2ZV9kaXNwbGF5KTtcclxuXHJcblx0dmFyIG1vdmVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRtb3ZlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCf0LXRgNC10LzQtdGJ0LXQvdC40LVcIjtcclxuXHRtb3ZlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG5cdG1vdmVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG5cdG1vdmVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG5cdFx0Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblx0XHR2YXIgY2hhcmFjdGVyX3BpY2tlZCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShjaGFyYWN0ZXJfcGlja2VkLmluZGV4LCBjaGFyYWN0ZXJfcGlja2VkLmNlbGwpO1xyXG5cdH1cclxuXHJcblx0dmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5cdGRlbGV0ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQo9C90LjRh9GC0L7QttC40YLRjFwiO1xyXG5cdGRlbGV0ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuXHRkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG5cdGRlbGV0ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRkZWxldGVfb2JqZWN0KGV2ZW50KTtcclxuXHR9XHJcblxyXG5cdHZhciBkYW1hZ2VfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRkYW1hZ2VfYnV0dG9uLmlubmVySFRNTCA9IFwi0J3QsNC90LXRgdGC0Lgg0YPRgNC+0L1cIjtcclxuXHRkYW1hZ2VfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcblx0ZGFtYWdlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbWFnZV9maWVsZFwiKTtcclxuXHRcdGlmKCEoZGFtYWdlX2ZpZWxkLnZhbHVlID09PSBcIlwiKSkge1xyXG5cdFx0XHR2YXIgZGFtYWdlID0gcGFyc2VJbnQoZGFtYWdlX2ZpZWxkLnZhbHVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBkYW1hZ2UgPSAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdEhQX3N0YXRlW2V2ZW50LnRhcmdldC5pbmRleF0gPSBIUF9zdGF0ZVtldmVudC50YXJnZXQuaW5kZXhdIC0gZGFtYWdlO1xyXG5cclxuXHRcdHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJIUF9kaXNwbGF5XCIpO1xyXG5cdFx0SFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgSFBfc3RhdGVbZXZlbnQudGFyZ2V0LmluZGV4XTtcclxuXHJcblx0fVxyXG5cclxuXHR2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG5cdGRhbWFnZV9maWVsZC5pZCA9IFwiZGFtYWdlX2ZpZWxkXCI7XHJcblx0ZGFtYWdlX2ZpZWxkLnR5cGUgPSBcIm51bWJlclwiO1xyXG5cdGRhbWFnZV9maWVsZC5wbGFjZWhvbGRlciA9IFwi0JfQvdCw0YfQtdC90LjQtSDRg9GA0L7QvdCwXCI7XHJcblxyXG5cdHZhciBidXR0b25fbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuXHRidXR0b25fbGlzdC5jbGFzc05hbWUgPSBcImJ1dHRvbl9saXN0XCI7XHJcblx0dmFyIGxpbmUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG5cdHZhciBsaW5lMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuXHR2YXIgbGluZTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcblxyXG5cclxuXHRsaW5lMS5hcHBlbmRDaGlsZChtb3ZlX2J1dHRvbik7XHJcblx0bGluZTIuYXBwZW5kQ2hpbGQoZGVsZXRlX2J1dHRvbik7XHJcblx0bGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2J1dHRvbik7XHJcblx0bGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2ZpZWxkKTtcclxuXHJcblx0YnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTEpO1xyXG5cdGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUyKTtcclxuXHRidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMyk7XHJcblxyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25fbGlzdCk7XHJcblxyXG5cdHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcik7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfb2JqZWN0KGV2ZW50KSB7XHJcblx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHR2YXIgdG9TZW5kID0ge307XHJcblx0dG9TZW5kLmNvbW1hbmQgPSAnZGVsZXRlX2NoYXJhY3Rlcic7XHJcblx0dG9TZW5kLmluZGV4ID0gZXZlbnQudGFyZ2V0LmluZGV4O1xyXG5cdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3Rfb2JzdGFjbGUoaW5kZXgsIGNlbGwpIHtcclxuXHR2YXIgb2JzdGFjbGVfaWQgPSBib2FyZF9zdGF0ZVtpbmRleF0qKC0xKTtcclxuXHR2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW29ic3RhY2xlX2lkXTtcclxuXHJcblx0bGV0IG5hbWUgPSBvYnN0YWNsZS5uYW1lO1xyXG5cdGxldCBhdmF0YXIgPSBvYnN0YWNsZS5hdmF0YXI7XHJcblxyXG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuXHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0dmFyIG5hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuXHRuYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gbmFtZTtcclxuXHJcblx0dmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuXHRhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcblx0YXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG5cdGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lX2Rpc3BsYXkpO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChhdmF0YXJfZGlzcGxheSk7XHJcblxyXG5cdHZhciBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRkZWxldGVfYnV0dG9uLmlubmVySFRNTCA9IFwi0KPQvdC40YfRgtC+0LbQuNGC0YxcIjtcclxuXHRkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcblx0ZGVsZXRlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuXHRkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZGVsZXRlX29iamVjdChldmVudCk7XHJcblx0fVxyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVfYnV0dG9uKTtcclxuXHJcblx0dGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwpIHtcclxuXHRmaWVsZF9jaG9zZW4gPSAxO1xyXG5cdGNob3Nlbl9pbmRleCA9IGluZGV4O1xyXG5cdGNob3Nlbl9jaGFyYWN0ZXJfSFAgPSBIUF9zdGF0ZVtpbmRleF07XHJcblx0Y2hvc2VuX2NoYXJhY3Rlcl9pbml0aWF0aXZlID0gaW5pdGlhdGl2ZV9zdGF0ZVtpbmRleF07XHJcblx0Y2hvc2VuX2NoYXJhY3Rlcl9pbmRleCA9IGJvYXJkX3N0YXRlW2luZGV4XTtcclxuXHRjZWxsLnNyYyA9IFwiLi9pbWFnZXMvbG9hZGluZy53ZWJwXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuZG9fc2VsZWN0aW9uKCkge1xyXG5cdGZpZWxkX2Nob3NlbiA9IDA7XHJcblx0dmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hvc2VuX2luZGV4KTtcclxuXHRvbGRfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tib2FyZF9zdGF0ZVtjaG9zZW5faW5kZXhdXS5hdmF0YXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldF9vYmplY3RfcGljdHVyZShpbmRleF9pbl9ib2FyZF9zdGF0ZSkge1xyXG5cdHZhciBpbWFnZSA9IEVNUFRZX0NFTExfUElDO1xyXG5cdHZhciBpbmRleF9pbl9iYXNlO1xyXG5cdGlmIChpbmRleF9pbl9ib2FyZF9zdGF0ZSA+IDApIHtcclxuXHRcdGluZGV4X2luX2Jhc2UgPSBpbmRleF9pbl9ib2FyZF9zdGF0ZSAtIDE7XHJcblx0XHR2YXIgY2hhcmFjdGVyX3VucGFyc2VkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oY2hhcmFjdGVyX2Jhc2VbaW5kZXhfaW5fYmFzZV0pO1xyXG5cdFx0dmFyIGNoYXJhY3RlciA9IEpTT04ucGFyc2UoY2hhcmFjdGVyX3VucGFyc2VkKTtcclxuXHRcdGltYWdlID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuXHR9IGVsc2UgaWYgKGluZGV4X2luX2JvYXJkX3N0YXRlIDwgMCkge1xyXG5cdFx0aW5kZXhfaW5fYmFzZSA9IGluZGV4X2luX2JvYXJkX3N0YXRlKigtMSkgLSAxO1xyXG5cdFx0dmFyIG9ic3RhY2xlX3VucGFyc2VkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ob2JzdGFjbGVfYmFzZVtpbmRleF9pbl9iYXNlXSk7XHJcblx0XHR2YXIgb2JzdGFjbGUgPSBKU09OLnBhcnNlKG9ic3RhY2xlX3VucGFyc2VkKTtcclxuXHRcdGltYWdlID0gb2JzdGFjbGUuYXZhdGFyO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGltYWdlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlQm9hcmQoKSB7XHJcblx0dmFyIG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcF9uYW1lXCIpLnZhbHVlO1xyXG5cdHZhciBnYW1lX3N0YXRlID0ge2JvYXJkX3N0YXRlOiBib2FyZF9zdGF0ZSwgSFBfc3RhdGU6IEhQX3N0YXRlLCBpbml0aWF0aXZlX3N0YXRlOiBpbml0aWF0aXZlX3N0YXRlfTtcclxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeShnYW1lX3N0YXRlKSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlSW5pdGlhdGl2ZShhZ2lsaXR5KSB7XHJcblx0cmV0dXJuIGFnaWxpdHkgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxJbml0aWF0aXZlKCkge1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmRfc3RhdGUubGVuZ3RoOyBpKyspIHtcclxuXHRcdGlmIChib2FyZF9zdGF0ZVtpXSA+IDApIHsgLy8gc28gdGhlcmUgaXMgY2hhcmFjdGVyIGF0IHBvc2l0aW9uIGlcclxuXHRcdFx0Ly8gcmV0cmlldmUgdGhhdCBjaGFyYWN0ZXIncyBhZ2lsaXR5XHJcblx0XHRcdHZhciBjaGFyYWN0ZXJfaW5kZXggPSBib2FyZF9zdGF0ZVtpXTtcclxuXHRcdFx0dmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9pbmRleF07XHJcblxyXG5cdFx0XHR2YXIgYWdpbGl0eSA9IGNoYXJhY3Rlci5hZ2lsaXR5O1xyXG5cclxuXHRcdFx0Ly8gcm9sbCBpbml0aWF0aXZlIGFuZCBhZGQgYWdpbGl0eSBtb2RpZmljYXRvclxyXG5cdFx0XHR2YXIgaW5pdGlhdGl2ZSA9IGNvbXB1dGVJbml0aWF0aXZlKHBhcnNlSW50KGFnaWxpdHkpKTtcclxuXHJcblx0XHRcdGluaXRpYXRpdmVfc3RhdGVbaV0gPSBpbml0aWF0aXZlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHR2YXIgdG9TZW5kID0ge307XHJcblx0dG9TZW5kLmNvbW1hbmQgPSAncm9sbF9pbml0aWF0aXZlJztcclxuXHR0b1NlbmQuaW5pdGlhdGl2ZV9zdGF0ZSA9IGluaXRpYXRpdmVfc3RhdGU7XHJcblx0c29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbi8vc29ja2V0LmluaXQoJ3dzOi8vbG9jYWxob3N0OjMwMDEnKTtcclxuc29ja2V0LmluaXQoU0VSVkVSX0FERFJFU1MpO1xyXG5cclxuc29ja2V0LnJlZ2lzdGVyT3BlbkhhbmRsZXIoKCkgPT4ge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdwbGF5ZXJfaW5mbyc7XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvbGUgPSBteV9yb2xlO1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIHRvU2VuZC5wYXNzd29yZCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZ21fcGFzc3dvcmQnKSk7XHJcbiAgfVxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59KTtcclxuXHJcbnNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKChkYXRhKSA9PiB7XHJcbiAgY29uc29sZS5sb2coZGF0YSk7XHJcblx0aWYgKChkYXRhLnRvX25hbWUgPT0gbXlfbmFtZSl8fChkYXRhLnRvX25hbWUgPT0gJ2FsbCcpKSB7XHJcbiAgICBpZiAoZGF0YS5jb21tYW5kID09ICdwbGF5ZXJfaW5mb19yZXNwb25zZScpIHtcclxuXHRcdFx0aWYgKGRhdGEuaXNWYWxpZCA9PSAwKSB7XHJcblx0XHRcdFx0YWxlcnQoJ9Ci0LAg0LrQsNC60L7QuSDRgtGLINCz0LwnKTtcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChkYXRhLnJvbGUgPT0gJ2dtJykge1xyXG5cdFx0XHRcdGNyZWF0ZV9ib2FyZF9idXR0b24uc2hvdygpO1xyXG5cdFx0XHRcdHNhdmVfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuXHRcdFx0XHRsb2FkX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcblx0XHRcdFx0cm9sbF9pbml0aWF0aXZlX2J1dHRvbi5zaG93KCk7XHJcblx0XHRcdFx0c2F2ZV9uYW1lX2lucHV0LnNob3coKTtcclxuXHRcdFx0XHRib2FyZF9zaXplX2lucHV0LnNob3coKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjaGFyYWN0ZXJfbGlzdCA9IGRhdGEuY2hhcmFjdGVyX2xpc3Q7XHJcblx0XHRcdG9ic3RhY2xlX2xpc3QgPSBkYXRhLm9ic3RhY2xlX2xpc3Q7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnY29uc3RydWN0X2JvYXJkX3Jlc3BvbnNlJykge1xyXG5cdFx0XHRjb25zdHJ1Y3RfYm9hcmQoZGF0YS5ib2FyZF9zdGF0ZSwgZGF0YS5zaXplLCBkYXRhLkhQX3N0YXRlLCBkYXRhLmluaXRpYXRpdmVfc3RhdGUpO1xyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2FkZF9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcblx0XHRcdHZhciBjaGFyYWN0ZXIgPSBkYXRhLmNoYXJhY3Rlcl9pbmZvO1xyXG5cdFx0XHRjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyO1xyXG5cdFx0XHR2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGRhdGEuY2VsbF9pZCk7XHJcblx0XHRcdGNlbGwuc3JjID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuXHRcdFx0Ym9hcmRfc3RhdGVbZGF0YS5jZWxsX2lkXSA9IGRhdGEuY2hhcmFjdGVyX251bWJlcjtcclxuXHRcdFx0SFBfc3RhdGVbZGF0YS5jZWxsX2lkXSA9IEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV07XHJcblx0XHR9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX29ic3RhY2xlX3Jlc3BvbnNlJykge1xyXG5cdFx0XHR2YXIgb2JzdGFjbGUgPSBkYXRhLm9ic3RhY2xlX2luZm87XHJcblx0XHRcdG9ic3RhY2xlX2RldGFpbGVkX2luZm9bZGF0YS5vYnN0YWNsZV9udW1iZXJdID0gb2JzdGFjbGU7XHJcblx0XHRcdHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZGF0YS5jZWxsX2lkKTtcclxuXHRcdFx0Y2VsbC5zcmMgPSBvYnN0YWNsZS5hdmF0YXI7XHJcblx0XHRcdGJvYXJkX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBkYXRhLm9ic3RhY2xlX251bWJlciAqICgtMSk7XHJcblx0XHR9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbW92ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcblx0XHRcdHZhciB0b19pbmRleCA9IGRhdGEudG9faW5kZXg7XHJcblx0XHRcdHZhciBmcm9tX2luZGV4ID0gZGF0YS5mcm9tX2luZGV4O1xyXG5cdFx0XHRib2FyZF9zdGF0ZVt0b19pbmRleF0gPSBkYXRhLmNoYXJhY3Rlcl9udW1iZXI7XHJcblx0XHRcdEhQX3N0YXRlW3RvX2luZGV4XSA9IGRhdGEuY2hhcmFjdGVyX2hwO1xyXG5cdFx0XHRpbml0aWF0aXZlX3N0YXRlW3RvX2luZGV4XSA9IGRhdGEuY2hhcmFjdGVyX2luaXRpYXRpdmU7XHJcblxyXG5cdFx0XHR2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcblx0XHRcdHRvX2NlbGwuc3JjID0gZGF0YS5jaGFyYWN0ZXJfYXZhdGFyO1xyXG5cclxuXHRcdFx0Ym9hcmRfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG5cdFx0XHRIUF9zdGF0ZVtmcm9tX2luZGV4XSA9IDA7XHJcblx0XHRcdGluaXRpYXRpdmVfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG5cdFx0XHR2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBmcm9tX2luZGV4KTtcclxuXHRcdFx0b2xkX2NlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcblx0XHR9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnZGVsZXRlX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ2JpbiBjaGlsbGluZycpO1xyXG5cdFx0XHRib2FyZF9zdGF0ZVtkYXRhLmluZGV4XSA9IDA7XHJcblx0XHRcdHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEuaW5kZXgpO1xyXG5cdFx0XHRjZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3JvbGxfaW5pdGlhdGl2ZV9yZXNwb25zZScpIHtcclxuXHRcdFx0XHRpbml0aWF0aXZlX3N0YXRlID0gZGF0YS5pbml0aWF0aXZlX3N0YXRlO1xyXG5cdFx0fVxyXG4gIH1cclxufSk7XHJcblxyXG52YXIgY3JlYXRlX2JvYXJkX2J1dHRvbiA9ICQoQ1JFQVRFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmNyZWF0ZV9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgY3JlYXRlQm9hcmQpO1xyXG5jcmVhdGVfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBzYXZlX2JvYXJkX2J1dHRvbiA9ICQoU0FWRV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBzYXZlQm9hcmQpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgbG9hZF9ib2FyZF9idXR0b24gPSAkKExPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxubG9hZF9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgbG9hZEJvYXJkKTtcclxubG9hZF9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHJvbGxfaW5pdGlhdGl2ZV9idXR0b24gPSAkKFJPTExfSU5JVElBVElWRV9CVVRUT05fU0VMRUNUT1IpO1xyXG5yb2xsX2luaXRpYXRpdmVfYnV0dG9uLm9uKCdjbGljaycsIHJvbGxJbml0aWF0aXZlKTtcclxucm9sbF9pbml0aWF0aXZlX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgYm9hcmRfc2l6ZV9pbnB1dCA9ICQoQk9BUkRfU0laRV9JTlBVVF9TRUxFQ1RPUik7XHJcbmJvYXJkX3NpemVfaW5wdXQuaGlkZSgpO1xyXG5cclxudmFyIHNhdmVfbmFtZV9pbnB1dCA9ICQoU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SKTtcclxuc2F2ZV9uYW1lX2lucHV0LmhpZGUoKTtcclxuIiwibGV0IHNvY2tldDtcclxuXHJcbmZ1bmN0aW9uIGluaXQodXJsKSB7XHJcbiAgc29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xyXG4gIGNvbnNvbGUubG9nKCdjb25uZWN0aW5nLi4nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJPcGVuSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBzb2NrZXQub25vcGVuID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ29wZW4nKTtcclxuICAgIGhhbmRsZXJGdW5jdGlvbigpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XHJcbiAgc29ja2V0Lm9ubWVzc2FnZSA9IChlKSA9PiB7XHJcbiAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuICAgIGhhbmRsZXJGdW5jdGlvbihkYXRhKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShwYXlsb2FkKSB7XHJcbiAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgaW5pdCxcclxuICByZWdpc3Rlck9wZW5IYW5kbGVyLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIsXHJcbiAgc2VuZE1lc3NhZ2VcclxufVxyXG4iXX0=
