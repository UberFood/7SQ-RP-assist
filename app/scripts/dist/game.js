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

var TINY_EFFECT_CLASS = 'is-tiny';

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
			button.style.width = '100px';
			button.style.height = '100px';
			button.className = 'board_cell';
			button.onclick = function (event) {
				var character_profile_container = document.getElementById("character-info-container");
				character_profile_container.innerHTML = "";

				var cell = event.target;
				var index = cell.row * size + cell.column;
				console.log(board_state[index]);
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

	var _loop = function _loop(i) {
		button = document.createElement("button");

		button.innerHTML = obstacle_base[i];
		button.board_index = board_index;
		button.obstacle_name = obstacle_base[i];
		button.onclick = function (event) {
			var obstacle_picked = event.target;
			board_state[obstacle_picked.board_index] = (i + 1) * -1;
			var obstacle_unparsed = localStorage.getItem(obstacle_picked.obstacle_name);
			var obstacle = JSON.parse(obstacle_unparsed);
			var cell = document.getElementById("cell_" + obstacle_picked.board_index);
			cell.src = obstacle.avatar;

			var container = document.getElementById("character-info-container");
			container.innerHTML = "";
		};
		container.appendChild(button);
		tiny_animation(container);
	};

	for (var i = 0; i < obstacle_base.length; i++) {
		var button;

		_loop(i);
	}
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
	console.log(board_state[index]);
	console.log(character_detailed_info);
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
		var container = document.getElementById("character-info-container");
		container.innerHTML = "";

		board_state[event.target.index] = 0;
		event.target.cell.src = "./images/square.jpg";
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

function select_obstacle(index, cell) {
	var obstacle_id = board_state[index] * -1 - 1;
	var obstacle_unparsed = localStorage.getItem(obstacle_base[obstacle_id]);
	var obstacle = JSON.parse(obstacle_unparsed);

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
		var container = document.getElementById("character-info-container");
		container.innerHTML = "";

		board_state[event.target.index] = 0;
		HP_state[event.target.index] = "?";
		initiative_state[event.target.index] = "?";
		event.target.cell.src = "./images/square.jpg";
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
	var image = "./images/square.jpg";
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

function rollInitiative() {
	for (var i = 0; i < board_state.length; i++) {
		if (board_state[i] > 0) {
			// so there is character at position i
			// retrieve that character's agility
			var character_index = board_state[i] - 1;
			var character_unparsed = localStorage.getItem(character_base[character_index]);
			var character = JSON.parse(character_unparsed);

			var agility = character.agility;

			// roll initiative and add agility modificator
			var initiative = parseInt(agility) + Math.floor(Math.random() * 21);

			initiative_state[i] = initiative;
		}
	}
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
		} else if (data.command == 'construct_board_response') {
			construct_board(data.board_state, data.size, data.HP_state, data.initiative_state);
		} else if (data.command == 'add_character_response') {
			var character = data.character_info;
			character_detailed_info[data.character_number] = character;
			var cell = document.getElementById("cell_" + data.cell_id);
			cell.src = character.avatar;
			board_state[data.cell_id] = data.character_number;
			HP_state[data.cell_id] = HP_values[character.stamina];
		} else if (data.command = 'move_character_response') {
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
			old_cell.src = "./images/square.jpg";
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
    console.log('message', e.data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksK0JBQStCLG1DQUFuQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksa0NBQWtDLHNDQUF0Qzs7QUFFQSxJQUFJLDRCQUE0QixnQ0FBaEM7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7O0FBRUEsSUFBSSxpQkFBaUIsU0FBUyxNQUFULENBQWdCLE9BQWhCLENBQXdCLE9BQXhCLEVBQWlDLElBQWpDLENBQXJCOztBQUVBLElBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxlQUFlLE9BQWYsQ0FBdUIsVUFBdkIsQ0FBWCxDQUFkO0FBQ0EsSUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLGVBQWUsT0FBZixDQUF1QixXQUF2QixDQUFYLENBQWQ7QUFDQSxJQUFJLGlCQUFpQixFQUFyQjtBQUNBLElBQUksMEJBQTBCLEVBQTlCOztBQUVBLElBQUksb0JBQW9CLFNBQXhCOztBQUVBO0FBQ0EsSUFBTSxZQUFZLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQixDQUFsQjs7QUFFQSxJQUFJLGNBQWMsRUFBbEI7QUFDQSxJQUFJLFdBQVcsRUFBZjtBQUNBLElBQUksbUJBQW1CLEVBQXZCO0FBQ0EsSUFBSSxpQkFBaUIsRUFBckI7QUFDQSxJQUFJLGdCQUFnQixFQUFwQjtBQUNBLElBQUksYUFBSjs7QUFFQSxJQUFJLGVBQWUsQ0FBbkI7QUFDQSxJQUFJLHFCQUFKO0FBQ0EsSUFBSSwrQkFBSjtBQUNBLElB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bUIsVUFBQyxDQUFELEVBQU87QUFDeEIsWUFBUSxHQUFSLENBQVksU0FBWixFQUF1QixFQUFFLElBQXpCO0FBQ0EsUUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLEVBQUUsSUFBYixDQUFYO0FBQ0Esb0JBQWdCLElBQWhCO0FBQ0QsR0FKRDtBQUtEOztBQUVELFNBQVMsV0FBVCxDQUFxQixPQUFyQixFQUE4QjtBQUM1QixTQUFPLElBQVAsQ0FBWSxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQVo7QUFDRDs7a0JBRWM7QUFDYixZQURhO0FBRWIsMENBRmE7QUFHYixnREFIYTtBQUliO0FBSmEsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBzb2NrZXQgZnJvbSAnLi93cy1jbGllbnQnO1xyXG5cclxudmFyICQgPSB3aW5kb3cualF1ZXJ5O1xyXG5cclxudmFyIENSRUFURV9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImNyZWF0ZV9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgU0FWRV9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNhdmVfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIExPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJsb2FkX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBST0xMX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJyb2xsX2luaXRpYXRpdmVfYnV0dG9uXCJdJztcclxuXHJcbnZhciBCT0FSRF9TSVpFX0lOUFVUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJib2FyZF9zaXplX2lucHV0XCJdJztcclxudmFyIFNBVkVfTkFNRV9JTlBVVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2F2ZV9uYW1lX2lucHV0XCJdJztcclxuXHJcbnZhciBTRVJWRVJfQUREUkVTUyA9IGxvY2F0aW9uLm9yaWdpbi5yZXBsYWNlKC9eaHR0cC8sICd3cycpO1xyXG5cclxudmFyIG15X25hbWUgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJuYW1lJykpO1xyXG52YXIgbXlfcm9sZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcl9yb2xlJykpO1xyXG52YXIgY2hhcmFjdGVyX2xpc3QgPSBbXTtcclxudmFyIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvID0gW107XHJcblxyXG52YXIgVElOWV9FRkZFQ1RfQ0xBU1MgPSAnaXMtdGlueSc7XHJcblxyXG4vLyBUaGlzIGlzIGEgY29uc3RhbnQsIHdpbGwgYmUgbW92ZWQgdG8gZGF0YWJhc2UgbGF0ZXJcclxuY29uc3QgSFBfdmFsdWVzID0gWzE1LCAzMCwgNDAsIDU1LCA3NSwgMTAwLCAxMzAsIDE2NV07XHJcblxyXG5sZXQgYm9hcmRfc3RhdGUgPSBbXTtcclxubGV0IEhQX3N0YXRlID0gW107XHJcbmxldCBpbml0aWF0aXZlX3N0YXRlID0gW107XHJcbmxldCBjaGFyYWN0ZXJfYmFzZSA9IFtdO1xyXG5sZXQgb2JzdGFjbGVfYmFzZSA9IFtdO1xyXG5sZXQgc2l6ZTtcclxuXHJcbmxldCBmaWVsZF9jaG9zZW4gPSAwO1xyXG5sZXQgY2hvc2VuX2luZGV4O1xyXG5sZXQgY2hvc2VuX2NoYXJhY3Rlcl9pbmRleDtcclxubGV0IGNob3Nlbl9jaGFyYWN0ZXJfSFA7XHJcbmxldCBjaG9zZW5fY2hhcmFjdGVyX2luaXRpYXRpdmU7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcclxuXHRzaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZF9zaXplXCIpLnZhbHVlO1xyXG5cdGJvYXJkX3N0YXRlID0gW107XHJcblx0SFBfc3RhdGUgPSBbXTtcclxuXHRpbml0aWF0aXZlX3N0YXRlID0gW107XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaXplKnNpemU7IGkrKykge1xyXG5cdFx0Ym9hcmRfc3RhdGUucHVzaCgwKTtcclxuXHR9XHJcblx0c2VuZF9jb25zdHJ1Y3RfY29tbWFuZChib2FyZF9zdGF0ZSwgc2l6ZSwgSFBfc3RhdGUsIGluaXRpYXRpdmVfc3RhdGUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkQm9hcmQoKSB7XHJcblx0dmFyIG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcF9uYW1lXCIpLnZhbHVlO1xyXG5cdHZhciBnYW1lX3N0YXRlX3VucGFyc2VkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZSk7XHJcblx0dmFyIGdhbWVfc3RhdGUgPSBKU09OLnBhcnNlKGdhbWVfc3RhdGVfdW5wYXJzZWQpO1xyXG5cclxuXHRzZW5kX2NvbnN0cnVjdF9jb21tYW5kKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUsIE1hdGguc3FydChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlLmxlbmd0aCksIGdhbWVfc3RhdGUuSFBfc3RhdGUsIGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRfY29uc3RydWN0X2NvbW1hbmQobmV3X2JvYXJkX3N0YXRlLCBuZXdfc2l6ZSwgbmV3X0hQX3N0YXRlLCBuZXdfaW5pdGlhdGl2ZV9zdGF0ZSkge1xyXG5cdHZhciB0b1NlbmQgPSB7fTtcclxuXHR0b1NlbmQuY29tbWFuZCA9ICdjb25zdHJ1Y3RfYm9hcmQnO1xyXG5cdHRvU2VuZC5ib2FyZF9zdGF0ZSA9IG5ld19ib2FyZF9zdGF0ZTtcclxuXHR0b1NlbmQuc2l6ZSA9IG5ld19zaXplO1xyXG5cdHRvU2VuZC5IUF9zdGF0ZSA9IG5ld19IUF9zdGF0ZTtcclxuXHR0b1NlbmQuaW5pdGlhdGl2ZV9zdGF0ZSA9IG5ld19pbml0aWF0aXZlX3N0YXRlO1xyXG5cdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb25zdHJ1Y3RfYm9hcmQobmV3X2JvYXJkX3N0YXRlLCBuZXdfc2l6ZSwgbmV3X0hQX3N0YXRlLCBuZXdfaW5pdGlhdGl2ZV9zdGF0ZSkge1xyXG5cdGJvYXJkX3N0YXRlID0gbmV3X2JvYXJkX3N0YXRlO1xyXG5cdEhQX3N0YXRlID0gbmV3X0hQX3N0YXRlO1xyXG5cdGluaXRpYXRpdmVfc3RhdGUgPSBuZXdfaW5pdGlhdGl2ZV9zdGF0ZTtcclxuXHRzaXplID0gbmV3X3NpemU7XHJcblxyXG5cdGxldCBjaGFyYWN0ZXJfYmFzZV91bnBhcnNlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaGFyYWN0ZXJzJyk7XHJcblx0aWYgKGNoYXJhY3Rlcl9iYXNlX3VucGFyc2VkICE9IG51bGwpIHtcclxuXHRcdGNoYXJhY3Rlcl9iYXNlID0gSlNPTi5wYXJzZShjaGFyYWN0ZXJfYmFzZV91bnBhcnNlZCk7XHJcblx0fVxyXG5cclxuXHRsZXQgb2JzdGFjbGVfYmFzZV91bnBhcnNlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvYnN0YWNsZXMnKTtcclxuXHRpZiAob2JzdGFjbGVfYmFzZV91bnBhcnNlZCAhPSBudWxsKSB7XHJcblx0XHRvYnN0YWNsZV9iYXNlID0gSlNPTi5wYXJzZShvYnN0YWNsZV9iYXNlX3VucGFyc2VkKTtcclxuXHR9XHJcblxyXG5cdHZhciBpbmZvX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG5cdGluZm9fY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cdHZhciBib2FyZF9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkLWNvbnRhaW5lclwiKTtcclxuXHRib2FyZF9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHR2YXIgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XHJcblx0Ym9hcmQuY2xhc3NOYW1lID0gXCJib2FyZFwiO1xyXG5cclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG5cdFx0dmFyIHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHRcdHJvdy5jbGFzc05hbWUgPSBcImJvYXJkX3Jvd1wiO1xyXG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcclxuXHRcdFx0dmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcblx0XHRcdHZhciBjZWxsX2lkID0gaSpzaXplICsgajtcclxuXHRcdFx0YnV0dG9uLmlkID0gXCJjZWxsX1wiICsgY2VsbF9pZDtcclxuXHRcdFx0YnV0dG9uLnJvdyA9IGk7XHJcblx0XHRcdGJ1dHRvbi5jb2x1bW4gPSBqO1xyXG5cdFx0XHR2YXIgaW1hZ2VfbmFtZSA9IGdldF9vYmplY3RfcGljdHVyZShib2FyZF9zdGF0ZVtjZWxsX2lkXSk7XHJcblx0XHRcdGJ1dHRvbi5zcmMgPSBpbWFnZV9uYW1lO1xyXG5cdFx0XHRidXR0b24uc3R5bGUud2lkdGggPSAnMTAwcHgnO1xyXG5cdFx0XHRidXR0b24uc3R5bGUuaGVpZ2h0ID0gJzEwMHB4JztcclxuXHRcdFx0YnV0dG9uLmNsYXNzTmFtZSA9ICdib2FyZF9jZWxsJztcclxuXHRcdFx0YnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHR2YXIgY2hhcmFjdGVyX3Byb2ZpbGVfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0XHRcdGNoYXJhY3Rlcl9wcm9maWxlX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHRcdFx0XHR2YXIgY2VsbCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdFx0XHR2YXIgaW5kZXggPSBjZWxsLnJvdypzaXplICsgY2VsbC5jb2x1bW47XHJcblx0XHRcdFx0Y29uc29sZS5sb2coYm9hcmRfc3RhdGVbaW5kZXhdKTtcclxuXHRcdFx0XHRpZiAoYm9hcmRfc3RhdGVbaW5kZXhdID09IDApIHsgLy8gZW1wdHkgY2VsbCBjbGlja2VkXHJcblx0XHRcdFx0XHRpZiAoZmllbGRfY2hvc2VuID09IDApIHtcclxuXHRcdFx0XHRcdFx0YWRkX29iamVjdChpbmRleCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRtb3ZlX2NoYXJhY3RlcihpbmRleCwgY2VsbCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIGlmIChib2FyZF9zdGF0ZVtpbmRleF0gPiAwKSB7IC8vIGNoYXJhY3RlciBjbGlja2VkXHJcblx0XHRcdFx0XHRpZiAoZmllbGRfY2hvc2VuID09IDApIHtcclxuXHRcdFx0XHRcdFx0c2VsZWN0X2NoYXJhY3RlcihpbmRleCwgY2VsbCk7XHJcblxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dW5kb19zZWxlY3Rpb24oKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2UgeyAvLyBvYnN0YWNsZSBjbGlja2VkXHJcblx0XHRcdFx0XHRpZiAoZmllbGRfY2hvc2VuID09IDApIHtcclxuXHRcdFx0XHRcdFx0c2VsZWN0X29ic3RhY2xlKGluZGV4LCBjZWxsKTtcclxuXHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR1bmRvX3NlbGVjdGlvbigpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdFx0dmFyIGNlbGxfd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuXHRcdFx0Y2VsbF93cmFwLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcblx0XHRcdGNlbGxfd3JhcC5jbGFzc05hbWUgPSBcImNlbGxfd3JhcFwiO1xyXG5cdFx0XHRyb3cuYXBwZW5kQ2hpbGQoY2VsbF93cmFwKTtcclxuXHRcdH1cclxuXHRcdGJvYXJkLmFwcGVuZENoaWxkKHJvdyk7XHJcblx0fVxyXG5cdGJvYXJkX2NvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZCk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBhZGRfb2JqZWN0KGJvYXJkX2luZGV4KSB7XHJcblx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHR2YXIgYnV0dG9uX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0YnV0dG9uX2NvbnRhaW5lci5jbGFzc05hbWUgPSBcImFkZC1vYmplY3QtYnV0dG9uLWNvbnRhaW5lclwiO1xyXG5cclxuXHR2YXIgYnV0dG9uX2FkZF9jaGFyYWN0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5cdGJ1dHRvbl9hZGRfY2hhcmFjdGVyLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9C10YDRgdC+0L3QsNC20LBcIjtcclxuXHRidXR0b25fYWRkX2NoYXJhY3Rlci5vbmNsaWNrID0gZnVuY3Rpb24oKSB7YWRkX2NoYXJhY3Rlcihib2FyZF9pbmRleCk7fTtcclxuXHJcblx0dmFyIGJ1dHRvbl9hZGRfb2JzdGFjbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5cdGJ1dHRvbl9hZGRfb2JzdGFjbGUuaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMINC/0YDQtdC/0Y/RgtGB0YLQstC40LVcIjtcclxuXHRidXR0b25fYWRkX29ic3RhY2xlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHthZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpO307XHJcblxyXG5cdGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9jaGFyYWN0ZXIpO1xyXG5cdGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9vYnN0YWNsZSk7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9jb250YWluZXIpO1xyXG5cclxuXHR0aW55X2FuaW1hdGlvbihjb250YWluZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0aW55X2FuaW1hdGlvbihjb250YWluZXIpIHtcclxuXHRjb250YWluZXIuY2xhc3NMaXN0LmFkZChUSU5ZX0VGRkVDVF9DTEFTUyk7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICB9LCA1MCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZF9vYnN0YWNsZShib2FyZF9pbmRleCkge1xyXG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuXHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBvYnN0YWNsZV9iYXNlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRcdGJ1dHRvbi5pbm5lckhUTUwgPSBvYnN0YWNsZV9iYXNlW2ldO1xyXG5cdFx0YnV0dG9uLmJvYXJkX2luZGV4ID0gYm9hcmRfaW5kZXg7XHJcblx0XHRidXR0b24ub2JzdGFjbGVfbmFtZSA9IG9ic3RhY2xlX2Jhc2VbaV07XHJcblx0XHRidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdHZhciBvYnN0YWNsZV9waWNrZWQgPSBldmVudC50YXJnZXQ7XHJcblx0XHRcdGJvYXJkX3N0YXRlW29ic3RhY2xlX3BpY2tlZC5ib2FyZF9pbmRleF0gPSAoaSsxKSAqIC0xO1xyXG5cdFx0XHR2YXIgb2JzdGFjbGVfdW5wYXJzZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShvYnN0YWNsZV9waWNrZWQub2JzdGFjbGVfbmFtZSk7XHJcblx0XHRcdHZhciBvYnN0YWNsZSA9IEpTT04ucGFyc2Uob2JzdGFjbGVfdW5wYXJzZWQpO1xyXG5cdFx0XHR2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIG9ic3RhY2xlX3BpY2tlZC5ib2FyZF9pbmRleCk7XHJcblx0XHRcdGNlbGwuc3JjID0gb2JzdGFjbGUuYXZhdGFyO1xyXG5cclxuXHRcdFx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG5cdFx0XHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHRcdH07XHJcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuXHRcdHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcik7XHJcblx0fVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX2NoYXJhY3Rlcihib2FyZF9pbmRleCkge1xyXG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuXHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0dmFyIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcblx0c2VsZWN0LmlkID0gXCJjaGFyYWN0ZXJfY2hvc2VuXCI7XHJcblxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcblx0XHRjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBjaGFyYWN0ZXJfbGlzdFtpXTtcclxuXHRcdGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaTtcclxuXHRcdHNlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcblx0fVxyXG5cclxuXHR2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRidXR0b24uaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMXCI7XHJcblx0YnV0dG9uLmJvYXJkX2luZGV4ID0gYm9hcmRfaW5kZXg7XHJcblx0YnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0dmFyIGJ1dHRvbiA9IGV2ZW50LnRhcmdldDtcclxuXHRcdHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXJfY2hvc2VuXCIpLnZhbHVlKTtcclxuXHJcblx0XHR2YXIgdG9TZW5kID0ge307XHJcblx0XHR0b1NlbmQuY29tbWFuZCA9ICdhZGRfY2hhcmFjdGVyJztcclxuXHRcdHRvU2VuZC5jZWxsX2lkID0gYnV0dG9uLmJvYXJkX2luZGV4O1xyXG5cdFx0dG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyICsgMTtcclxuXHRcdHRvU2VuZC5jaGFyYWN0ZXJfbmFtZSA9IGNoYXJhY3Rlcl9saXN0W2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cdFx0c29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG5cdFx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG5cdFx0Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblx0fVxyXG5cclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuXHR0aW55X2FuaW1hdGlvbihjb250YWluZXIpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gbW92ZV9jaGFyYWN0ZXIodG9faW5kZXgsIHRvX2NlbGwpIHtcclxuXHRmaWVsZF9jaG9zZW4gPSAwO1xyXG5cdHZhciB0b1NlbmQgPSB7fTtcclxuXHR0b1NlbmQuY29tbWFuZCA9ICdtb3ZlX2NoYXJhY3Rlcic7XHJcblx0dG9TZW5kLmZyb21faW5kZXggPSBjaG9zZW5faW5kZXg7XHJcblx0dG9TZW5kLnRvX2luZGV4ID0gdG9faW5kZXg7XHJcblx0dG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4O1xyXG5cdHRvU2VuZC5jaGFyYWN0ZXJfaHAgPSBjaG9zZW5fY2hhcmFjdGVyX0hQO1xyXG5cdHRvU2VuZC5jaGFyYWN0ZXJfaW5pdGlhdGl2ZSA9IGNob3Nlbl9jaGFyYWN0ZXJfaW5pdGlhdGl2ZTtcclxuXHR0b1NlbmQuY2hhcmFjdGVyX2F2YXRhciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmF2YXRhcjtcclxuXHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0X2NoYXJhY3RlcihpbmRleCwgY2VsbCkge1xyXG5cdGNvbnNvbGUubG9nKGJvYXJkX3N0YXRlW2luZGV4XSk7XHJcblx0Y29uc29sZS5sb2coY2hhcmFjdGVyX2RldGFpbGVkX2luZm8pO1xyXG5cdHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tib2FyZF9zdGF0ZVtpbmRleF1dO1xyXG5cclxuXHRsZXQgbmFtZSA9IGNoYXJhY3Rlci5uYW1lO1xyXG5cdGxldCBhdmF0YXIgPSBjaGFyYWN0ZXIuYXZhdGFyO1xyXG5cclxuXHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cdHZhciBuYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcblx0bmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IG5hbWU7XHJcblxyXG5cdHZhciBhdmF0YXJfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcblx0YXZhdGFyX2Rpc3BsYXkuc3JjID0gYXZhdGFyO1xyXG5cdGF2YXRhcl9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuXHRhdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuXHR2YXIgc3RyZW5ndGhfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuXHRzdHJlbmd0aF9kaXNwbGF5LmlubmVySFRNTCA9IFwiQ9C40LvQsDogXCIgKyBjaGFyYWN0ZXIuc3RyZW5ndGg7XHJcblxyXG5cdHZhciBzdGFtaW5hX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcblx0c3RhbWluYV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KLQtdC70L7RgdC70L7QttC10L3QuNC1OiBcIiArIGNoYXJhY3Rlci5zdGFtaW5hO1xyXG5cclxuXHR2YXIgYWdpbGl0eV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG5cdGFnaWxpdHlfZGlzcGxheS5pbm5lckhUTUwgPSBcItCb0L7QstC60L7RgdGC0Yw6IFwiICsgY2hhcmFjdGVyLmFnaWxpdHk7XHJcblxyXG5cdHZhciBpbnRlbGxpZ2VuY2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuXHRpbnRlbGxpZ2VuY2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCY0L3RgtC10LvQu9C10LrRgjogXCIgKyBjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlO1xyXG5cclxuXHR2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuXHRIUF9kaXNwbGF5LmlkID0gXCJIUF9kaXNwbGF5XCI7XHJcblx0SFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgSFBfc3RhdGVbaW5kZXhdO1xyXG5cclxuXHR2YXIgaW5pdGlhdGl2ZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG5cdGluaXRpYXRpdmVfZGlzcGxheS5pbm5lckhUTUwgPSBcItCY0L3QuNGG0LjQsNGC0LjQstCwOiBcIiArIGluaXRpYXRpdmVfc3RhdGVbaW5kZXhdO1xyXG5cclxuXHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWVfZGlzcGxheSk7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGF2YXRhcl9kaXNwbGF5KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RyZW5ndGhfZGlzcGxheSk7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKHN0YW1pbmFfZGlzcGxheSk7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGFnaWxpdHlfZGlzcGxheSk7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGludGVsbGlnZW5jZV9kaXNwbGF5KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoSFBfZGlzcGxheSk7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGluaXRpYXRpdmVfZGlzcGxheSk7XHJcblxyXG5cdHZhciBtb3ZlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcblx0bW92ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQn9C10YDQtdC80LXRidC10L3QuNC1XCI7XHJcblx0bW92ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuXHRtb3ZlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuXHRtb3ZlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuXHRcdGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdFx0dmFyIGNoYXJhY3Rlcl9waWNrZWQgPSBldmVudC50YXJnZXQ7XHJcblx0XHRjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoY2hhcmFjdGVyX3BpY2tlZC5pbmRleCwgY2hhcmFjdGVyX3BpY2tlZC5jZWxsKTtcclxuXHR9XHJcblxyXG5cdHZhciBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRkZWxldGVfYnV0dG9uLmlubmVySFRNTCA9IFwi0KPQvdC40YfRgtC+0LbQuNGC0YxcIjtcclxuXHRkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcblx0ZGVsZXRlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuXHRkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG5cdFx0Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cdFx0Ym9hcmRfc3RhdGVbZXZlbnQudGFyZ2V0LmluZGV4XSA9IDA7XHJcblx0XHRldmVudC50YXJnZXQuY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL3NxdWFyZS5qcGdcIjtcclxuXHR9XHJcblxyXG5cdHZhciBkYW1hZ2VfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRkYW1hZ2VfYnV0dG9uLmlubmVySFRNTCA9IFwi0J3QsNC90LXRgdGC0Lgg0YPRgNC+0L1cIjtcclxuXHRkYW1hZ2VfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcblx0ZGFtYWdlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbWFnZV9maWVsZFwiKTtcclxuXHRcdGlmKCEoZGFtYWdlX2ZpZWxkLnZhbHVlID09PSBcIlwiKSkge1xyXG5cdFx0XHR2YXIgZGFtYWdlID0gcGFyc2VJbnQoZGFtYWdlX2ZpZWxkLnZhbHVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBkYW1hZ2UgPSAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdEhQX3N0YXRlW2V2ZW50LnRhcmdldC5pbmRleF0gPSBIUF9zdGF0ZVtldmVudC50YXJnZXQuaW5kZXhdIC0gZGFtYWdlO1xyXG5cclxuXHRcdHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJIUF9kaXNwbGF5XCIpO1xyXG5cdFx0SFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgSFBfc3RhdGVbZXZlbnQudGFyZ2V0LmluZGV4XTtcclxuXHJcblx0fVxyXG5cclxuXHR2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG5cdGRhbWFnZV9maWVsZC5pZCA9IFwiZGFtYWdlX2ZpZWxkXCI7XHJcblx0ZGFtYWdlX2ZpZWxkLnR5cGUgPSBcIm51bWJlclwiO1xyXG5cdGRhbWFnZV9maWVsZC5wbGFjZWhvbGRlciA9IFwi0JfQvdCw0YfQtdC90LjQtSDRg9GA0L7QvdCwXCI7XHJcblxyXG5cdHZhciBidXR0b25fbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuXHRidXR0b25fbGlzdC5jbGFzc05hbWUgPSBcImJ1dHRvbl9saXN0XCI7XHJcblx0dmFyIGxpbmUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG5cdHZhciBsaW5lMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuXHR2YXIgbGluZTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcblxyXG5cclxuXHRsaW5lMS5hcHBlbmRDaGlsZChtb3ZlX2J1dHRvbik7XHJcblx0bGluZTIuYXBwZW5kQ2hpbGQoZGVsZXRlX2J1dHRvbik7XHJcblx0bGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2J1dHRvbik7XHJcblx0bGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2ZpZWxkKTtcclxuXHJcblx0YnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTEpO1xyXG5cdGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUyKTtcclxuXHRidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMyk7XHJcblxyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25fbGlzdCk7XHJcblxyXG5cdHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcik7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3Rfb2JzdGFjbGUoaW5kZXgsIGNlbGwpIHtcclxuXHR2YXIgb2JzdGFjbGVfaWQgPSBib2FyZF9zdGF0ZVtpbmRleF0qKC0xKSAtIDE7XHJcblx0dmFyIG9ic3RhY2xlX3VucGFyc2VkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ob2JzdGFjbGVfYmFzZVtvYnN0YWNsZV9pZF0pO1xyXG5cdHZhciBvYnN0YWNsZSA9IEpTT04ucGFyc2Uob2JzdGFjbGVfdW5wYXJzZWQpO1xyXG5cclxuXHRsZXQgbmFtZSA9IG9ic3RhY2xlLm5hbWU7XHJcblx0bGV0IGF2YXRhciA9IG9ic3RhY2xlLmF2YXRhcjtcclxuXHJcblx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHR2YXIgbmFtZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG5cdG5hbWVfZGlzcGxheS5pbm5lckhUTUwgPSBuYW1lO1xyXG5cclxuXHR2YXIgYXZhdGFyX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG5cdGF2YXRhcl9kaXNwbGF5LnNyYyA9IGF2YXRhcjtcclxuXHRhdmF0YXJfZGlzcGxheS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcblx0YXZhdGFyX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuXHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWVfZGlzcGxheSk7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGF2YXRhcl9kaXNwbGF5KTtcclxuXHJcblx0dmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5cdGRlbGV0ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQo9C90LjRh9GC0L7QttC40YLRjFwiO1xyXG5cdGRlbGV0ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuXHRkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG5cdGRlbGV0ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcblx0XHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0XHRib2FyZF9zdGF0ZVtldmVudC50YXJnZXQuaW5kZXhdID0gMDtcclxuXHRcdEhQX3N0YXRlW2V2ZW50LnRhcmdldC5pbmRleF0gPSBcIj9cIjtcclxuXHRcdGluaXRpYXRpdmVfc3RhdGVbZXZlbnQudGFyZ2V0LmluZGV4XSA9IFwiP1wiO1xyXG5cdFx0ZXZlbnQudGFyZ2V0LmNlbGwuc3JjID0gXCIuL2ltYWdlcy9zcXVhcmUuanBnXCI7XHJcblx0fVxyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVfYnV0dG9uKTtcclxuXHJcblx0dGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwpIHtcclxuXHRmaWVsZF9jaG9zZW4gPSAxO1xyXG5cdGNob3Nlbl9pbmRleCA9IGluZGV4O1xyXG5cdGNob3Nlbl9jaGFyYWN0ZXJfSFAgPSBIUF9zdGF0ZVtpbmRleF07XHJcblx0Y2hvc2VuX2NoYXJhY3Rlcl9pbml0aWF0aXZlID0gaW5pdGlhdGl2ZV9zdGF0ZVtpbmRleF07XHJcblx0Y2hvc2VuX2NoYXJhY3Rlcl9pbmRleCA9IGJvYXJkX3N0YXRlW2luZGV4XTtcclxuXHRjZWxsLnNyYyA9IFwiLi9pbWFnZXMvbG9hZGluZy53ZWJwXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuZG9fc2VsZWN0aW9uKCkge1xyXG5cdGZpZWxkX2Nob3NlbiA9IDA7XHJcblx0dmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hvc2VuX2luZGV4KTtcclxuXHRvbGRfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tib2FyZF9zdGF0ZVtjaG9zZW5faW5kZXhdXS5hdmF0YXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldF9vYmplY3RfcGljdHVyZShpbmRleF9pbl9ib2FyZF9zdGF0ZSkge1xyXG5cdHZhciBpbWFnZSA9IFwiLi9pbWFnZXMvc3F1YXJlLmpwZ1wiO1xyXG5cdHZhciBpbmRleF9pbl9iYXNlO1xyXG5cdGlmIChpbmRleF9pbl9ib2FyZF9zdGF0ZSA+IDApIHtcclxuXHRcdGluZGV4X2luX2Jhc2UgPSBpbmRleF9pbl9ib2FyZF9zdGF0ZSAtIDE7XHJcblx0XHR2YXIgY2hhcmFjdGVyX3VucGFyc2VkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oY2hhcmFjdGVyX2Jhc2VbaW5kZXhfaW5fYmFzZV0pO1xyXG5cdFx0dmFyIGNoYXJhY3RlciA9IEpTT04ucGFyc2UoY2hhcmFjdGVyX3VucGFyc2VkKTtcclxuXHRcdGltYWdlID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuXHR9IGVsc2UgaWYgKGluZGV4X2luX2JvYXJkX3N0YXRlIDwgMCkge1xyXG5cdFx0aW5kZXhfaW5fYmFzZSA9IGluZGV4X2luX2JvYXJkX3N0YXRlKigtMSkgLSAxO1xyXG5cdFx0dmFyIG9ic3RhY2xlX3VucGFyc2VkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ob2JzdGFjbGVfYmFzZVtpbmRleF9pbl9iYXNlXSk7XHJcblx0XHR2YXIgb2JzdGFjbGUgPSBKU09OLnBhcnNlKG9ic3RhY2xlX3VucGFyc2VkKTtcclxuXHRcdGltYWdlID0gb2JzdGFjbGUuYXZhdGFyO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGltYWdlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlQm9hcmQoKSB7XHJcblx0dmFyIG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcF9uYW1lXCIpLnZhbHVlO1xyXG5cdHZhciBnYW1lX3N0YXRlID0ge2JvYXJkX3N0YXRlOiBib2FyZF9zdGF0ZSwgSFBfc3RhdGU6IEhQX3N0YXRlLCBpbml0aWF0aXZlX3N0YXRlOiBpbml0aWF0aXZlX3N0YXRlfTtcclxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeShnYW1lX3N0YXRlKSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsSW5pdGlhdGl2ZSgpIHtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkX3N0YXRlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRpZiAoYm9hcmRfc3RhdGVbaV0gPiAwKSB7IC8vIHNvIHRoZXJlIGlzIGNoYXJhY3RlciBhdCBwb3NpdGlvbiBpXHJcblx0XHRcdC8vIHJldHJpZXZlIHRoYXQgY2hhcmFjdGVyJ3MgYWdpbGl0eVxyXG5cdFx0XHR2YXIgY2hhcmFjdGVyX2luZGV4ID0gYm9hcmRfc3RhdGVbaV0gLSAxO1xyXG5cdFx0XHR2YXIgY2hhcmFjdGVyX3VucGFyc2VkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oY2hhcmFjdGVyX2Jhc2VbY2hhcmFjdGVyX2luZGV4XSk7XHJcblx0XHRcdHZhciBjaGFyYWN0ZXIgPSBKU09OLnBhcnNlKGNoYXJhY3Rlcl91bnBhcnNlZCk7XHJcblxyXG5cdFx0XHR2YXIgYWdpbGl0eSA9IGNoYXJhY3Rlci5hZ2lsaXR5O1xyXG5cclxuXHRcdFx0Ly8gcm9sbCBpbml0aWF0aXZlIGFuZCBhZGQgYWdpbGl0eSBtb2RpZmljYXRvclxyXG5cdFx0XHR2YXIgaW5pdGlhdGl2ZSA9IHBhcnNlSW50KGFnaWxpdHkpICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjEpO1xyXG5cclxuXHRcdFx0aW5pdGlhdGl2ZV9zdGF0ZVtpXSA9IGluaXRpYXRpdmU7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vL3NvY2tldC5pbml0KCd3czovL2xvY2FsaG9zdDozMDAxJyk7XHJcbnNvY2tldC5pbml0KFNFUlZFUl9BRERSRVNTKTtcclxuXHJcbnNvY2tldC5yZWdpc3Rlck9wZW5IYW5kbGVyKCgpID0+IHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAncGxheWVyX2luZm8nO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb2xlID0gbXlfcm9sZTtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICB0b1NlbmQucGFzc3dvcmQgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2dtX3Bhc3N3b3JkJykpO1xyXG4gIH1cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufSk7XHJcblxyXG5zb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcigoZGF0YSkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdGlmICgoZGF0YS50b19uYW1lID09IG15X25hbWUpfHwoZGF0YS50b19uYW1lID09ICdhbGwnKSkge1xyXG4gICAgaWYgKGRhdGEuY29tbWFuZCA9PSAncGxheWVyX2luZm9fcmVzcG9uc2UnKSB7XHJcblx0XHRcdGlmIChkYXRhLmlzVmFsaWQgPT0gMCkge1xyXG5cdFx0XHRcdGFsZXJ0KCfQotCwINC60LDQutC+0Lkg0YLRiyDQs9C8Jyk7XHJcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoZGF0YS5yb2xlID09ICdnbScpIHtcclxuXHRcdFx0XHRjcmVhdGVfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuXHRcdFx0XHRzYXZlX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcblx0XHRcdFx0bG9hZF9ib2FyZF9idXR0b24uc2hvdygpO1xyXG5cdFx0XHRcdHJvbGxfaW5pdGlhdGl2ZV9idXR0b24uc2hvdygpO1xyXG5cdFx0XHRcdHNhdmVfbmFtZV9pbnB1dC5zaG93KCk7XHJcblx0XHRcdFx0Ym9hcmRfc2l6ZV9pbnB1dC5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2hhcmFjdGVyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0O1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NvbnN0cnVjdF9ib2FyZF9yZXNwb25zZScpIHtcclxuXHRcdFx0Y29uc3RydWN0X2JvYXJkKGRhdGEuYm9hcmRfc3RhdGUsIGRhdGEuc2l6ZSwgZGF0YS5IUF9zdGF0ZSwgZGF0YS5pbml0aWF0aXZlX3N0YXRlKTtcclxuXHRcdH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdhZGRfY2hhcmFjdGVyX3Jlc3BvbnNlJykge1xyXG5cdFx0XHR2YXIgY2hhcmFjdGVyID0gZGF0YS5jaGFyYWN0ZXJfaW5mbztcclxuXHRcdFx0Y2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3RlcjtcclxuXHRcdFx0dmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBkYXRhLmNlbGxfaWQpO1xyXG5cdFx0XHRjZWxsLnNyYyA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcblx0XHRcdGJvYXJkX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBkYXRhLmNoYXJhY3Rlcl9udW1iZXI7XHJcblx0XHRcdEhQX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdO1xyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPSAnbW92ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcblx0XHRcdHZhciB0b19pbmRleCA9IGRhdGEudG9faW5kZXg7XHJcblx0XHRcdHZhciBmcm9tX2luZGV4ID0gZGF0YS5mcm9tX2luZGV4O1xyXG5cdFx0XHRib2FyZF9zdGF0ZVt0b19pbmRleF0gPSBkYXRhLmNoYXJhY3Rlcl9udW1iZXI7XHJcblx0XHRcdEhQX3N0YXRlW3RvX2luZGV4XSA9IGRhdGEuY2hhcmFjdGVyX2hwO1xyXG5cdFx0XHRpbml0aWF0aXZlX3N0YXRlW3RvX2luZGV4XSA9IGRhdGEuY2hhcmFjdGVyX2luaXRpYXRpdmU7XHJcblxyXG5cdFx0XHR2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcblx0XHRcdHRvX2NlbGwuc3JjID0gZGF0YS5jaGFyYWN0ZXJfYXZhdGFyO1xyXG5cclxuXHRcdFx0Ym9hcmRfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG5cdFx0XHRIUF9zdGF0ZVtmcm9tX2luZGV4XSA9IDA7XHJcblx0XHRcdGluaXRpYXRpdmVfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG5cdFx0XHR2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBmcm9tX2luZGV4KTtcclxuXHRcdFx0b2xkX2NlbGwuc3JjID0gXCIuL2ltYWdlcy9zcXVhcmUuanBnXCI7XHJcblx0XHR9XHJcbiAgfVxyXG59KTtcclxuXHJcbnZhciBjcmVhdGVfYm9hcmRfYnV0dG9uID0gJChDUkVBVEVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxuY3JlYXRlX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBjcmVhdGVCb2FyZCk7XHJcbmNyZWF0ZV9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHNhdmVfYm9hcmRfYnV0dG9uID0gJChTQVZFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnNhdmVfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIHNhdmVCb2FyZCk7XHJcbnNhdmVfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBsb2FkX2JvYXJkX2J1dHRvbiA9ICQoTE9BRF9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5sb2FkX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBsb2FkQm9hcmQpO1xyXG5sb2FkX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgcm9sbF9pbml0aWF0aXZlX2J1dHRvbiA9ICQoUk9MTF9JTklUSUFUSVZFX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnJvbGxfaW5pdGlhdGl2ZV9idXR0b24ub24oJ2NsaWNrJywgcm9sbEluaXRpYXRpdmUpO1xyXG5yb2xsX2luaXRpYXRpdmVfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBib2FyZF9zaXplX2lucHV0ID0gJChCT0FSRF9TSVpFX0lOUFVUX1NFTEVDVE9SKTtcclxuYm9hcmRfc2l6ZV9pbnB1dC5oaWRlKCk7XHJcblxyXG52YXIgc2F2ZV9uYW1lX2lucHV0ID0gJChTQVZFX05BTUVfSU5QVVRfU0VMRUNUT1IpO1xyXG5zYXZlX25hbWVfaW5wdXQuaGlkZSgpO1xyXG4iLCJsZXQgc29ja2V0O1xyXG5cclxuZnVuY3Rpb24gaW5pdCh1cmwpIHtcclxuICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybCk7XHJcbiAgY29uc29sZS5sb2coJ2Nvbm5lY3RpbmcuLicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnb3BlbicpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdtZXNzYWdlJywgZS5kYXRhKTtcclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKGRhdGEpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKHBheWxvYWQpIHtcclxuICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG4gIHJlZ2lzdGVyT3BlbkhhbmRsZXIsXHJcbiAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcixcclxuICBzZW5kTWVzc2FnZVxyXG59XHJcbiJdfQ==
