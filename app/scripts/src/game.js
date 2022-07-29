import socket from './ws-client';

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
const HP_values = [15, 30, 40, 55, 75, 100, 130, 165];

let board_state = [];
let HP_state = [];
let initiative_state = [];
let size;

let character_base = [];
let obstacle_base = [];


let field_chosen = 0;
let chosen_index;
let chosen_character_index;
let chosen_character_HP;
let chosen_character_initiative;

function createBoard() {
	size = document.getElementById("board_size").value;
	board_state = [];
	HP_state = [];
	initiative_state = [];
	for (let i = 0; i < size*size; i++) {
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
	socket.sendMessage(toSend);
}

function send_construct_command(new_board_state, new_size, new_HP_state, new_initiative_state) {
	var toSend = {};
	toSend.command = 'construct_board';
	toSend.board_state = new_board_state;
	toSend.size = new_size;
	toSend.HP_state = new_HP_state;
	toSend.initiative_state = new_initiative_state;
	socket.sendMessage(toSend);
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

	for (let i = 0; i < size; i++) {
		var row = document.createElement("tr");
		row.className = "board_row";
		for (let j = 0; j < size; j++) {
			var button = document.createElement("IMG");
			var cell_id = i*size + j;
			button.id = "cell_" + cell_id;
			button.row = i;
			button.column = j;
			var image_name = get_object_picture(board_state[cell_id]);
			button.src = image_name;
			button.style.width = '50px';
			button.style.height = '50px';
			button.className = 'board_cell';
			button.onclick = function(event) {
			var character_profile_container = document.getElementById("character-info-container");
			character_profile_container.innerHTML = "";

				var cell = event.target;
				var index = cell.row*size + cell.column;
				if (board_state[index] == 0) { // empty cell clicked
					if (field_chosen == 0) {
						add_object(index);
					} else {
						move_character(index, cell);
					}
				} else if (board_state[index] > 0) { // character clicked
					if (field_chosen == 0) {
						select_character(index, cell);

					} else {
						undo_selection();
					}
				} else { // obstacle clicked
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
	button_add_character.onclick = function() {add_character(board_index);};

	var button_add_obstacle = document.createElement("button");
	button_add_obstacle.innerHTML = "Добавить препятствие";
	button_add_obstacle.onclick = function() {add_obstacle(board_index);};

	button_container.appendChild(button_add_character);
	button_container.appendChild(button_add_obstacle);
	container.appendChild(button_container);

	tiny_animation(container);
}

function tiny_animation(container) {
	container.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    container.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function add_obstacle(board_index) {
	var container = document.getElementById("character-info-container");
	container.innerHTML = "";

	var select = document.createElement("select");
	select.id = "obstacle_chosen";

	for (let i = 0; i < obstacle_list.length; i++) {
		var current_option = document.createElement("option");
		current_option.innerHTML = obstacle_list[i];
		current_option.value = i;
		select.appendChild(current_option);
	}

	var button = document.createElement("button");
	button.innerHTML = "Добавить";
	button.board_index = board_index;
	button.onclick = function(event) {
		var button = event.target;
		var obstacle_number = parseInt(document.getElementById("obstacle_chosen").value);

		var toSend = {};
		toSend.command = 'add_obstacle';
		toSend.cell_id = button.board_index;
		toSend.obstacle_number = obstacle_number + 1;
		toSend.obstacle_name = obstacle_list[obstacle_number];
		socket.sendMessage(toSend);

		var container = document.getElementById("character-info-container");
		container.innerHTML = "";
	}

	container.appendChild(select);
	container.appendChild(button);
	tiny_animation(container);

}

function add_character(board_index) {
	var container = document.getElementById("character-info-container");
	container.innerHTML = "";

	var select = document.createElement("select");
	select.id = "character_chosen";

	for (let i = 0; i < character_list.length; i++) {
		var current_option = document.createElement("option");
		current_option.innerHTML = character_list[i];
		current_option.value = i;
		select.appendChild(current_option);
	}

	var button = document.createElement("button");
	button.innerHTML = "Добавить";
	button.board_index = board_index;
	button.onclick = function(event) {
		var button = event.target;
		var character_number = parseInt(document.getElementById("character_chosen").value);

		var toSend = {};
		toSend.command = 'add_character';
		toSend.cell_id = button.board_index;
		toSend.character_number = character_number + 1;
		toSend.character_name = character_list[character_number];
		socket.sendMessage(toSend);

		var container = document.getElementById("character-info-container");
		container.innerHTML = "";
	}

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
	socket.sendMessage(toSend);
}

function select_character(index, cell) {
	var character = character_detailed_info[board_state[index]];

	let name = character.name;
	let avatar = character.avatar;

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
	move_button.onclick = function(event) {
		var container = document.getElementById("character-info-container");
		container.innerHTML = "";
		var character_picked = event.target;
		choose_character_to_move(character_picked.index, character_picked.cell);
	}

	var delete_button = document.createElement("button");
	delete_button.innerHTML = "Уничтожить";
	delete_button.index = index;
	delete_button.cell = cell;
	delete_button.onclick = function(event) {
		delete_object(event);
	}

	var damage_button = document.createElement("button");
	damage_button.innerHTML = "Нанести урон";
	damage_button.index = index;
	damage_button.onclick = function(event) {
		var damage_field = document.getElementById("damage_field");
		if(!(damage_field.value === "")) {
			var damage = parseInt(damage_field.value);
			var HP_display = document.getElementById("HP_display");
			var new_HP = HP_state[event.target.index] - damage;
			HP_display.innerHTML = "ХП: " + new_HP;

			var toSend = {};
			toSend.command = 'deal_damage';
			toSend.index = event.target.index;
			toSend.damage = damage;
			socket.sendMessage(toSend);
		}
	}

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
	socket.sendMessage(toSend);
}

function select_obstacle(index, cell) {
	var obstacle_id = board_state[index]*(-1);
	var obstacle = obstacle_detailed_info[obstacle_id];

	let name = obstacle.name;
	let avatar = obstacle.avatar;

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
	delete_button.onclick = function(event) {
		delete_object(event);
	}
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
		index_in_base = index_in_board_state*(-1);
		var obstacle = obstacle_detailed_info[index_in_base];
		image = obstacle.avatar;
	}

	return image;
}

function saveBoard() {
	var save_name = document.getElementById("map_name").value;
	var game_state = {board_state: board_state, HP_state: HP_state, initiative_state: initiative_state, character_detailed_info: character_detailed_info, obstacle_detailed_info: obstacle_detailed_info};

	var toSend = {};
	toSend.command = 'save_game';
	toSend.save_name = save_name;
	toSend.game_state = game_state;
	toSend.from_name = my_name;
	socket.sendMessage(toSend);
}

function computeInitiative(agility) {
	return agility + Math.floor(Math.random() * 21);
}

function rollInitiative() {
	for (let i = 0; i < board_state.length; i++) {
		if (board_state[i] > 0) { // so there is character at position i
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
	socket.sendMessage(toSend);
}

//socket.init('ws://localhost:3001');
socket.init(SERVER_ADDRESS);

socket.registerOpenHandler(() => {
  var toSend = {};
  toSend.command = 'player_info';
  toSend.from_name = my_name;
  toSend.role = my_role;
  if (my_role == 'gm') {
    toSend.password = JSON.parse(sessionStorage.getItem('gm_password'));
  }
  socket.sendMessage(toSend);
});

socket.registerMessageHandler((data) => {
  console.log(data);
	if ((data.to_name == my_name)||(data.to_name == 'all')) {
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
			board_state[data.cell_id] = data.obstacle_number * (-1);
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
