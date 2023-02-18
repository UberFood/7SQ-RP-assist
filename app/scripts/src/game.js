import socket from './ws-client';

var $ = window.jQuery;

var CHARACTER_INFO_CONTANER_SELECTOR = '[data-name="character-info-container"]';
var WEAPON_INFO_CONTANER_SELECTOR = '[data-name="weapon-info-container"]';
var NOTIFICATIONS_CONTANER_SELECTOR = '[data-name="notifications-container"]';

var CREATE_BOARD_BUTTON_SELECTOR = '[data-name="create_board_button"]';
var SAVE_BOARD_BUTTON_SELECTOR = '[data-name="save_board_button"]';
var LOAD_BOARD_BUTTON_SELECTOR = '[data-name="load_board_button"]';
var ROLL_INITIATIVE_BUTTON_SELECTOR = '[data-name="roll_initiative_button"]';
var FOG_BUTTON_SELECTOR = '[data-name="fog_button"]';
var ZONE_BUTTON_SELECTOR = '[data-name="zone_button"]';
var CHAT_BUTTON_SELECTOR = '[data-name="chat_button"]';
var MIRROR_BUTTON_SELECTOR = '[data-name="mirror_button"]';
var NEXT_ROUND_BUTTON_SELECTOR = '[data-name="next_round_button"]';
var BATTLE_MOD_BUTTON_SELECTOR = '[data-name="battle_mod_button"]';
var SYNC_BUTTON_SELECTOR = '[data-name="sync_button"]';
var FOG_ZONE_BUTTON_SELECTOR = '[data-name="fog_zone_button"]';
var UNFOG_ZONE_BUTTON_SELECTOR = '[data-name="unfog_zone_button"]';

var ZONE_NUMBER_SELECTOR = '[data-name="zone_number_select"]';
var SEARCH_MODIFICATOR_SELECTOR = '[data-name="search_modificator"]';

var BOARD_SIZE_INPUT_SELECTOR = '[data-name="board_size_input"]';
var SAVE_NAME_INPUT_SELECTOR = '[data-name="save_name_input"]';

var NOTIFICATIONS_LIST_SELECTOR = '[data-name="notifications_list"]';

var SERVER_ADDRESS = location.origin.replace(/^http/, 'ws');

var my_name = JSON.parse(sessionStorage.getItem('username'));
var my_role = JSON.parse(sessionStorage.getItem('user_role'));
var my_room = JSON.parse(sessionStorage.getItem('room_number'));

var character_list = [];
var character_detailed_info = [];
var obstacle_list = [];
var obstacle_detailed_info = [];
var weapon_list = [];
var weapon_detailed_info = [];
var skill_list = [];

var TINY_EFFECT_CLASS = 'is-tiny';

var EMPTY_CELL_PIC = "./images/square.jpg";
var ZONE_ENDPOINT_PIC = "./images/red_cross.jpg"
var FOG_IMAGE = "./images/fog.webp";
var QUESTION_IMAGE = "./images/question.jpg";

var MAX_ZONES = 25;
var CHAT_CASH = 15;

var stamina_weakspot_cost = 1
var stamina_move_cost = 0
var stamina_attack_cost = 1
var stamina_cut_limb_cost = 4
var shield_up_stamina_cost = 2

var rest_stamina_gain = 3

var cooldown_cut_limb = 1
var cooldown_big_bro = 1

var shield_up_KD = 3

var adrenaline_move_increase = 4
var charge_move_increase = 4

var gas_bomb_threshold = 11
var gas_bomb_move_reduction = 2
var gas_bomb_stamina_cost = 3
var gas_bomb_obstacle = 15
var gas_bomb_skill_cooldown = 5

var light_sound_bomb_radius = 4
var light_sound_bomb_threshold = 15
var light_sound_bomb_skill_cooldown = 5

var weak_spot_threshold = 15

var shocked_cooldown = 0

var pich_pich_cooldown = 4
var pich_pich_move_increase = 4

var force_field_radius = 1.6
var force_field_stamina_cost = 5
var force_field_cooldown = 10
var force_field_obstacle = 24

var big_bro_range = 2
var heal_range = 1
var throw_base_range = 2
var light_sound_bomb_range = 5
var force_field_range = 1

// This is a constant, will be moved to database later
const HP_values = [15, 30, 40, 55, 75, 100, 130, 165, 205, 250, 300, 355, 415];
const stamina_values = [30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195];
const strength_damage_map = [-2, 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55]
const move_action_map = [1, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
const bonus_action_map= [0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3]
const main_action_map = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3]


let game_state = {board_state: [], fog_state: [], zone_state: [], size: 0, search_modificator_state: [], terrain_effects: []};
let character_state = {HP: [], main_action: [], bonus_action: [], move_action: [], stamina: [], initiative: [], can_evade: [], has_moved: [], KD_points: [], current_weapon: [], visibility: [], attack_bonus: [], damage_bonus: [], universal_bonus: [], bonus_KD: [], special_effects: [], ranged_advantage: [], melee_advantage: [], defensive_advantage: []}

let character_base = [];
let obstacle_base = [];

let gm_control_mod = 0; // normal mode
let battle_mod = 0

// in_process: 0 = nothing, 1 = move, 2 = attack, 3 = skill
let character_chosen = {in_process: 0, char_id: 0, char_position: 0, weapon_id: 0, skill_id: 0, cell: 0};

let last_obstacle = 1;
let zone_endpoint = {index: -1, cell: 0}

var gunshot_audio = new Audio('sounds/gunshot.mp3');
var sword_audio = new Audio('sounds/sword.wav');

gunshot_audio.volume = 0.2
sword_audio.volume = 0.2

function reconnect() {
  if (!socket.isReady()) {
    socket.init(SERVER_ADDRESS);
    socket.registerMessageHandlerDefault();
    console.log('Hopefully reconnected (pray)');
  } else {
    console.log('Was online anyway');
  }
}

function createBoard() {
  game_state.size = document.getElementById("board_size").value;
  game_state.board_state = [];
  game_state.fog_state = [];
  game_state.zone_state = [];
  game_state.search_modificator_state = [];
  game_state.terrain_effects = [];

  for (let i = 0; i < game_state.size * game_state.size; i++) {
    game_state.board_state.push(0);
    game_state.fog_state.push(0);
    game_state.zone_state.push(0);
    game_state.search_modificator_state.push(0);
  }
  send_construct_command(game_state);
}

function loadBoard() {
  var name = document.getElementById("map_name").value;
  var toSend = {};
  toSend.command = 'load_game';
  toSend.save_name = name;
  toSend.from_name = my_name;
  toSend.room_number = my_room;
  socket.sendMessage(toSend);
}

function send_construct_command(new_game_state) {
  var toSend = {};
  toSend.command = 'construct_board';
  toSend.room_number = my_room;
  toSend.game_state = new_game_state;
  socket.sendMessage(toSend);
}

function no_shift_onclick(my_role, gm_control_mod, game_state, field_chosen, cell, index) {
  if (my_role == 'gm') {
    // gm side
    if (gm_control_mod == 0) {
      // we are in normal add/move delete mode
      standard_cell_onClick(index, cell, my_role);
    } else if (gm_control_mod == 1) {
      // we are in fog mode
      applyFog(index, cell);
    } else if (gm_control_mod == 2) {
      // we are in zones mode
      assignZone(index);
    }
  } else {
    // player side
    if (game_state.fog_state[index] == 1) {
      // clicked fog
      if (field_chosen == 1) {
        undo_selection();
      } else {
        console.log(' fog detected');
        displayFog();
      }
    } else {
      standard_cell_onClick(index, cell, my_role);
    }
  }
}

function shift_onclick(index, cell) {
  if (my_role == 'gm') {
    if (gm_control_mod == 2) {
      if (zone_endpoint.index < 0) {
        zone_endpoint.index = index
        zone_endpoint.cell = cell
        cell.src = ZONE_ENDPOINT_PIC
      } else {
        endpoint_assign_zone(index, zone_endpoint.index)
        zone_endpoint.cell.src = EMPTY_CELL_PIC
        zone_endpoint.index = -1
      }
    } else {
      var toSend = {};
      toSend.command = 'add_obstacle';
      toSend.cell_id = index;
      toSend.obstacle_number = last_obstacle;
      toSend.obstacle_name = obstacle_list[last_obstacle - 1];
      toSend.room_number = my_room;
      socket.sendMessage(toSend);
    }
  }
}

function ctrl_onclick(index) {
  if (my_role == 'gm') {
    var fog_value = game_state.fog_state[index]
    var mod = 1 - fog_value
    var zone = game_state.zone_state[index]
    fogParseZone(mod, zone)
  }
}

function construct_board(new_game_state) {
  game_state.board_state = new_game_state.board_state;
  game_state.size = new_game_state.size;
  game_state.fog_state = new_game_state.fog_state;
  game_state.zone_state = new_game_state.zone_state;
  game_state.search_modificator_state = new_game_state.search_modificator_state;
  game_state.terrain_effects = new_game_state.terrain_effects;

  clear_containers()

  var board_container = document.getElementById("board-container");
  board_container.innerHTML = "";
  var board = document.createElement("table");
  board.className = "board";

  for (let i = 0; i < game_state.size; i++) {
    var row = document.createElement("tr");
    row.className = "board_row";
    for (let j = 0; j < game_state.size; j++) {
      var button = document.createElement("IMG");
      var cell_id = i * game_state.size + j;
      button.id = "cell_" + cell_id;
      button.row = i;
      button.column = j;
      var image_name = fogOrPic(cell_id);
      button.src = image_name;
      button.style.width = '50px';
      button.style.height = '50px';
      button.className = 'board_cell';
      button.onclick = function(event) {
        var cell = event.target;
        var index = cell.row * game_state.size + cell.column;

        if (event.shiftKey) {
          shift_onclick(index, cell)
        } else if (event.ctrlKey) {
          ctrl_onclick(index)
        } else {
          no_shift_onclick(my_role, gm_control_mod, game_state, character_chosen.in_process, cell, index)
        }

      };
      var cell_wrap = document.createElement("th");
      cell_wrap.appendChild(button);
      cell_wrap.className = "cell_wrap";

      var zone_text = document.createElement("div");
      zone_text.id = "zone_text_" + cell_id;
      zone_text.className = "zone_text";
      cell_wrap.appendChild(zone_text);

      row.appendChild(cell_wrap);
    }
    board.appendChild(row);
  }
  board_container.appendChild(board);
}

function endpoint_assign_zone(endpoint1, endpoint2) {
  var zone_number = zone_number_select.val();
  var modificator = search_modificator.val();
  var size = game_state.size

  var index_list = []

  var coord1 = index_to_coordinates(endpoint1, size)
  var coord2 = index_to_coordinates(endpoint2, size)

  var top_left = top_left_coord(coord1, coord2)
  var bottom_right = bottom_right_coord(coord1, coord2)

  for (let i = top_left.x; i <= bottom_right.x; i++) {
    for (let j = top_left.y; j <= bottom_right.y; j++) {
      var coord = {}
      coord.x = i
      coord.y = j
      var index = coord_to_index(coord, size)

      index_list.push(index)
      var zone_text = document.getElementById('zone_text_' + index);
      zone_text.innerHTML = zone_number + '(' + modificator + ')';
    }
  }

  var toSend = {};
  toSend.command = 'assign_zone';
  toSend.zone_number = zone_number;
  toSend.index_list = index_list;
  toSend.modificator = modificator;
  toSend.room_number = my_room;
  socket.sendMessage(toSend);
}

function top_left_coord(coord1, coord2) {
  var toRet = {}
  toRet.x = Math.min(coord1.x, coord2.x)
  toRet.y = Math.min(coord1.y, coord2.y)
  return toRet
}

function bottom_right_coord(coord1, coord2) {
  var toRet = {}
  toRet.x = Math.max(coord1.x, coord2.x)
  toRet.y = Math.max(coord1.y, coord2.y)
  return toRet
}

function coord_to_index(coord, size) {
  var index = coord.x * size + coord.y
  return index
}

function assignZone(index) {
  var zone_number = zone_number_select.val();
  var modificator = search_modificator.val();

  var zone_text = document.getElementById('zone_text_' + index);
  zone_text.innerHTML = zone_number + '(' + modificator + ')';

  var index_list = []
  index_list.push(index)

  var toSend = {};
  toSend.command = 'assign_zone';
  toSend.zone_number = zone_number;
  toSend.index_list = index_list;
  toSend.modificator = modificator;
  toSend.room_number = my_room;
  socket.sendMessage(toSend);
}

function fogOrPic(cell_id) {
  var picture_name = FOG_IMAGE;
  if ((game_state.fog_state[cell_id] != 1)||(my_role == 'gm')) {
    picture_name = get_object_picture(game_state.board_state[cell_id]);
  }
  return picture_name;
}

function standard_cell_onClick(index, cell, role) {
	if (game_state.board_state[index] == 0) { // empty cell clicked

    switch(character_chosen.in_process) {
      case 0: // nothing
        if (role == 'gm') {
          add_object(index);
        }
        break;
      case 1: // move
        move_character(index, cell);
        break;
      case 2: //attack
        stop_attack()
        break;
      case 3: //skill
        perform_skill(index, cell)
        break;
      default:
        console.log("Error resolving on_click empty")
    }

	} else if (game_state.board_state[index] > 0) { // character clicked
    switch(character_chosen.in_process) {
      case 0: // nothing
        select_character(index, cell);
        break;
      case 1: // move
        undo_selection();
        break;
      case 2: //attack
        perform_attack(index, cell)
        break;
      case 3: //skill
        perform_skill(index, cell)
        break;
      default:
        console.log("Error resolving on_click character")
    }

	} else { // obstacle clicked

    switch(character_chosen.in_process) {
      case 0: // nothing
        select_obstacle(index, cell);
        break;
      case 1: // move
        undo_selection();
        break;
      case 2: //attack
        stop_attack()
        break;
      case 3: //skill
        perform_skill(index, cell)
        break;
      default:
        console.log("Error resolving on_click obstacle")
    }

	}
}

function index_to_coordinates(index, size) {
  var toRet = {}
  toRet.x = Math.floor(index/size)
  toRet.y = index % size
  return toRet
}

function findDistance(index1, index2) {
  var x1 = Math.floor(index1/game_state.size)
  var y1 = index1 % game_state.size

  var x2 = Math.floor(index2/game_state.size)
  var y2 = index2 % game_state.size

  var distance_squared = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)
  var distance = Math.sqrt(distance_squared)
  return Math.ceil(distance)
}

function isInRange(index1, index2, range) {
  var x1 = Math.floor(index1/game_state.size)
  var y1 = index1 % game_state.size

  var x2 = Math.floor(index2/game_state.size)
  var y2 = index2 % game_state.size

  var distance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)
  return distance <= range*range
}

function index_in_radius(index, range) {
  var size = game_state.size
  var x = Math.floor(index/size)
  var y = index % size
  var candidate_index_list = []

  //console.log("x: " + x + " y: " + y + " index: " + index)

  for (let i = Math.floor(-1 * range); i <= Math.ceil(range); i++) {
    for (let j = Math.floor(-1 * range); j <= Math.ceil(range); j++) {
      var cand_x = x + i
      var cand_y = y + j
      //console.log("cand_x: " + cand_x + " cand_y: " + cand_y)
      if (cand_x >=0 && cand_x < size && cand_y >=0 && cand_y < size) {
        var cand_index = cand_x*size + cand_y
        //console.log("cand_index: " + cand_index)
        if (isInRange(index, cand_index, range)) {
          //console.log("cand_index: " + cand_index + "was considered in range")
          candidate_index_list.push(cand_index)
        }
      }
    }
  }
  return candidate_index_list
}

function roll_x(x) {
  return Math.floor(Math.random() * x) + 1
}

function applyFog(index, cell) {
	if (game_state.fog_state[index] == 1) {
		// send update message
		var toSend = {};
		toSend.command = 'update_fog';
		toSend.update_type = 'remove';
		toSend.index = index;
    toSend.room_number = my_room;
		socket.sendMessage(toSend);
	} else {
		// send update message
		var toSend = {};
		toSend.command = 'update_fog';
		toSend.update_type = 'add';
		toSend.index = index;
    toSend.room_number = my_room;
		socket.sendMessage(toSend);
	}
}

function clear_containers() {
  character_info_container.html("")
  weapon_info_container.html("")
}

function tiny_animate_containers() {
  tiny_animation(character_info_container);
  tiny_animation(weapon_info_container);
}

function add_object(board_index) {
  clear_containers()

  var button_container = document.createElement("div");
  button_container.className = "add-object-button-container";

  var button_add_character = document.createElement("button");
  button_add_character.innerHTML = "Добавить персонажа";
  button_add_character.onclick = function() {
    add_character(board_index);
  };

  var button_add_obstacle = document.createElement("button");
  button_add_obstacle.innerHTML = "Добавить препятствие";
  button_add_obstacle.onclick = function() {
    add_obstacle(board_index);
  };

  button_container.appendChild(button_add_character);
  button_container.appendChild(button_add_obstacle);
  character_info_container.append(button_container);

  tiny_animate_containers()
}

function tiny_animation(container) {
  container.addClass(TINY_EFFECT_CLASS);
  setTimeout(function() {
    container.removeClass(TINY_EFFECT_CLASS);
  }, 50);
}

function add_obstacle_command(index, obstacle_number) {
  var toSend = {};
  toSend.command = 'add_obstacle';
  toSend.cell_id = index;
  toSend.obstacle_number = obstacle_number + 1;
  toSend.obstacle_name = obstacle_list[obstacle_number];
  toSend.room_number = my_room;
  socket.sendMessage(toSend);
}

function add_obstacle(board_index) {
  clear_containers()

  var select = document.createElement("select");
  select.id = "obstacle_chosen";
  select.className = "object_select"

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

    add_obstacle_command(button.board_index, obstacle_number)

    clear_containers()
  }

  character_info_container.append(select);
  character_info_container.append(button);
  tiny_animate_containers()

}

function add_character(board_index) {
  clear_containers()

  var select = document.createElement("select");
  select.id = "character_chosen";
  select.className = "object_select"

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
    toSend.room_number = my_room;
    socket.sendMessage(toSend);

    clear_containers(0)
  }

  character_info_container.append(select);
  character_info_container.append(button);
  tiny_animate_containers()

}

function move_character(to_index, to_cell) {
  character_chosen.in_process = 0; // end the motion
  var chosen_index = character_chosen.char_position
  var chosen_character_index = character_chosen.char_id

  var distance = findDistance(to_index, chosen_index)
  var max_distance = character_state.move_action[chosen_character_index]

  if (distance <= max_distance) {
    var toSend = {};
    toSend.command = 'move_character';
    toSend.from_index = chosen_index;
    toSend.to_index = to_index;
    toSend.character_number = chosen_character_index;
    toSend.character_avatar = character_detailed_info[chosen_character_index].avatar;
    toSend.room_number = my_room;
    toSend.distance = distance
    toSend.left_shield = 0

    if (character_state.special_effects[chosen_character_index].hasOwnProperty("force_field_target")) {
      var shield_index = character_state.special_effects[chosen_character_index].force_field_target.shield_index
      if(!game_state.terrain_effects[shield_index].cells_protected.includes(to_index)) {// покинул зону защиты
        toSend.left_shield = 1
        toSend.shield_index = shield_index
      }
    }
    socket.sendMessage(toSend);

    character_chosen.char_position = to_index
    var to_cell = document.getElementById('cell_' + to_index);
    character_chosen.cell = to_cell
  } else {
    alert("Полегче, мсье Болт")
    undo_selection()
  }

}

function displayFog() {
	clear_containers()

	var info = document.createElement("p");
  info.innerHTML = 'Мы не знаем, что это такое. Если бы мы знали что это такое, но мы не знаем.';

	var fog_picture = document.createElement("IMG");
  fog_picture.src = QUESTION_IMAGE;
  fog_picture.style.width = '250px';
  fog_picture.style.height = '250px';

	character_info_container.append(info);
	character_info_container.append(fog_picture);

tiny_animate_containers()
}

function delete_character(index, character_number) {
  clear_containers()
  var toSend = {};
  toSend.command = 'delete_character';
  toSend.room_number = my_room;
  toSend.index = index;
  toSend.character_number = character_number
  socket.sendMessage(toSend);
}

function select_character(index, cell) {
  var character_number = game_state.board_state[index]
  var character = character_detailed_info[character_number];

  character_chosen.char_id = character_number
  character_chosen.char_position = index
  character_chosen.cell = cell

  let name = character.name;
  let avatar = character.avatar;

  clear_containers()

  var name_display = document.createElement("h2");
  name_display.innerHTML = name;

  var avatar_container = document.createElement("div");
  var avatar_display = document.createElement("IMG");
  avatar_display.src = avatar;
  avatar_display.style.width = '250px';
  avatar_display.style.height = '250px';

  avatar_container.appendChild(avatar_display)

  character_info_container.append(name_display);
  character_info_container.append(avatar_container);

  if (my_role == "gm" || character_state.visibility[character_number] == 1) {

    avatar_display.onmouseenter = function(event) {

      var main_action = character_state.main_action[character_number]
      var bonus_action = character_state.bonus_action[character_number]
      var move_action = character_state.move_action[character_number]

      var main_action_display = document.createElement("h2");
      main_action_display.id = "main_action_display";
      main_action_display.innerHTML = "Основных: " + main_action

      var bonus_action_display = document.createElement("h2");
      bonus_action_display.id = "bonus_action_display";
      bonus_action_display.innerHTML = "Бонусных: " + bonus_action

      var move_action_display = document.createElement("h2");
      move_action_display.id = "move_action_display";
      move_action_display.innerHTML = "Передвижение: " + move_action


      weapon_info_container.append(main_action_display)
      weapon_info_container.append(bonus_action_display)
      weapon_info_container.append(move_action_display)
      weapon_info_container.show()
    }

    avatar_display.onmouseleave = function(event) {
      weapon_info_container.html("")
      weapon_info_container.hide()
    }

  var strength_display = document.createElement("h2");
  strength_display.innerHTML = "Cила: " + character.strength;

  var stamina_display = document.createElement("h2");
  stamina_display.innerHTML = "Телосложение: " + character.stamina;

  var agility_display = document.createElement("h2");
  agility_display.innerHTML = "Ловкость: " + character.agility;

  var intelligence_display = document.createElement("h2");
  intelligence_display.innerHTML = "Интеллект: " + character.intelligence;

  var KD_value = parseInt(character_state.KD_points[character_number]) + parseInt(character_state.bonus_KD[character_number])
  var KD_display = document.createElement("h2");
  KD_display.innerHTML = "КД: " + KD_value;

  var hp_percent = parseFloat(character_state.HP[character_number])/parseFloat(HP_values[character.stamina])
  hp_percent = Math.floor(hp_percent*100)

  var HP_display = document.createElement("h2");
  HP_display.id = "HP_display";
  HP_display.innerHTML = "ХП: " + character_state.HP[character_number] + " (" + hp_percent + "%)";

  var tired_percent = parseFloat(character_state.stamina[character_number])/parseFloat(stamina_values[character.stamina])
  tired_percent = Math.floor(tired_percent*100)

  var tired_display = document.createElement("h2");
  tired_display.id = "tired_display";
  tired_display.innerHTML = "Выносливость: " + character_state.stamina[character_number] + " (" + tired_percent + "%)";

  var initiative_display = document.createElement("h2");
  initiative_display.innerHTML = "Инициатива: " + character_state.initiative[character_number];

  character_info_container.append(strength_display);
  character_info_container.append(stamina_display);
  character_info_container.append(agility_display);
  character_info_container.append(intelligence_display);
  character_info_container.append(KD_display);
  character_info_container.append(HP_display);
  character_info_container.append(tired_display);
  character_info_container.append(initiative_display);

  var move_button = document.createElement("button");
  move_button.innerHTML = "Перемещение";
  move_button.index = index;
  move_button.cell = cell;
  move_button.onclick = function(event) {
    var character_picked = event.target
    var character_number = game_state.board_state[character_picked.index];
    var move_actions_left = character_state.move_action[character_number]
    if (move_actions_left > 0) {
      clear_containers()
      choose_character_to_move(character_picked.index, character_picked.cell);
    } else {
      alert("Вы потратили все перемещения на этом ходу!")
    }
  }

  if (my_role == "gm") {

    var delete_button = document.createElement("button");
    delete_button.innerHTML = "Уничтожить";
    delete_button.index = index;
    delete_button.cell = cell;
    delete_button.onclick = function(event) {
      delete_character(index, character_number);
    }

    var change_character_visibility_button = document.createElement("button");
    change_character_visibility_button.innerHTML = "Изменить видимость";
    change_character_visibility_button.onclick = function(event) {
      change_character_visibility(character_number);
    }

    var damage_button = document.createElement("button");
    damage_button.innerHTML = "Нанести урон";
    damage_button.index = index;
    damage_button.onclick = function(event) {
      var damage_field = document.getElementById("damage_field");
      if (!(damage_field.value === "")) {
        var damage = parseInt(damage_field.value);
        var HP_display = document.getElementById("HP_display");
        var new_HP = character_state.HP[character_number] - damage;
        HP_display.innerHTML = "ХП: " + new_HP;

        var toSend = {};
        toSend.command = 'deal_damage';
        toSend.character_number = character_number;
        toSend.damage = damage;
        toSend.room_number = my_room;
        socket.sendMessage(toSend);
      }
  }

    var damage_field = document.createElement("input");
    damage_field.id = "damage_field";
    damage_field.type = "number";
    damage_field.placeholder = "Значение урона";

  }

  var search_button = document.createElement("button");
  search_button.innerHTML = "Обыскать";
  search_button.index = index;
  search_button.onclick = function(event) {
    search_action(event.target);
  }

  var simple_roll_button = document.createElement("button");
  simple_roll_button.innerHTML = "Просто d20";
  simple_roll_button.onclick = function(event) {
    var roll = roll_x(20)
    var toSend = {}
    toSend.command = "simple_roll"
    toSend.character_name = character.name
    toSend.room_number = my_room
    toSend.roll = roll
    socket.sendMessage(toSend);
  }

  var weapon_select = document.createElement("select");
  weapon_select.id = "weapon_chosen";

  var inventory = character.inventory

  for (let i = 0; i < inventory.length; i++) {
    var current_option = document.createElement("option");
    current_option.innerHTML = weapon_list[inventory[i]];
    current_option.value = inventory[i];
    weapon_select.appendChild(current_option);
  }

  var pick_weapon_button = document.createElement("button");
  pick_weapon_button.innerHTML = "Сменить оружие";
  pick_weapon_button.index = index;
  pick_weapon_button.onclick = function(event) {
    var weapon_select = document.getElementById("weapon_chosen")
    var weapon_index = weapon_select.value

    character_state.current_weapon[character_number] = weapon_index
    character_chosen.weapon_id = weapon_index

    var weapon = weapon_detailed_info[weapon_index]

    weapon_mini_display.src = weapon.avatar;
  }

  var default_weapon_index = character_state.current_weapon[character_number]
  character_chosen.weapon_id = default_weapon_index
  var default_weapon = weapon_detailed_info[default_weapon_index]

  var weapon_mini_display = document.createElement("IMG");
  weapon_mini_display.id = "weapon_mini_display"
  weapon_mini_display.src = default_weapon.avatar;
  weapon_mini_display.style.width = '80px';
  weapon_mini_display.style.height = '80px';
  weapon_mini_display.onmouseenter = function(event) {
    var default_weapon_index = character_state.current_weapon[character_number]
    var default_weapon = weapon_detailed_info[default_weapon_index]

    var weapon_range_display = document.createElement("h2");
    weapon_range_display.id = "weapon_range_display";
    weapon_range_display.innerHTML = "Дальность: " + default_weapon.range

    var weapon_damage_display = document.createElement("h2");
    weapon_damage_display.id = "weapon_damage_display";
    weapon_damage_display.innerHTML = "Урон: " + default_weapon.damage[0] + 'd' + default_weapon.damage[1]

    var weapon_name_display = document.createElement("h2");
    weapon_name_display.id = "weapon_name_display";
    weapon_name_display.innerHTML = default_weapon.name

    var weapon_avatar_display = document.createElement("IMG");
    weapon_avatar_display.id = "weapon_avatar_display"
    weapon_avatar_display.src = default_weapon.avatar;
    weapon_avatar_display.style.width = '250px';
    weapon_avatar_display.style.height = '250px';

    weapon_info_container.append(weapon_name_display)
    weapon_info_container.append(weapon_avatar_display)
    weapon_info_container.append(weapon_range_display)
    weapon_info_container.append(weapon_damage_display)
    weapon_info_container.show()
  }

  weapon_mini_display.onmouseleave = function(event) {
    weapon_info_container.html("")
    weapon_info_container.hide()
  }

  avatar_container.append(weapon_mini_display)

  var attack_button = document.createElement("button");
  attack_button.innerHTML = "Атаковать";
  attack_button.onclick = function(event) {
    var main_actions_left = character_state.main_action[character_number]
    if (main_actions_left > 0) {
      choose_character_to_attack(cell)
    } else {
      alert("У вас не осталось действий!")
    }
  }

  var skill_select = document.createElement("select");
  skill_select.id = "skill_chosen";

  var skillset = character.skillset

  for (let i = 0; i < skillset.length; i++) {
    var current_option = document.createElement("option");
    current_option.innerHTML = skill_list[skillset[i]];
    current_option.value = skillset[i];
    skill_select.appendChild(current_option);
  }

  var skill_button = document.createElement("button");
  skill_button.innerHTML = "Использовать умение";
  skill_button.onclick = function(event) {
    var skill_select = document.getElementById("skill_chosen")
    var skill_index = skill_select.value
    use_skill(skill_index, character_number, index, cell)
  }


  var button_list = document.createElement("ul");
  button_list.className = "button_list";
  var line1 = document.createElement("li");
  var line2 = document.createElement("li");
  var line3 = document.createElement("li");
  var line4 = document.createElement("li");
  var line5 = document.createElement("li");
  var line6 = document.createElement("li");
  var line7 = document.createElement("li");
  var line8 = document.createElement("li");
  var line9 = document.createElement("li");

  line1.appendChild(move_button);
  if (my_role == "gm") {
    line2.appendChild(delete_button);
    line3.appendChild(damage_button);
    line3.appendChild(damage_field);
    line8.appendChild(change_character_visibility_button);
  }
  line4.appendChild(search_button);
  line5.appendChild(pick_weapon_button);
  line5.appendChild(weapon_select);
  line6.appendChild(attack_button);
  line7.appendChild(simple_roll_button);
  line9.appendChild(skill_button);
  line9.appendChild(skill_select);

  button_list.appendChild(line1);
  if (my_role == "gm") {
    button_list.appendChild(line2);
    button_list.appendChild(line3);
    button_list.appendChild(line8);
  }
  button_list.appendChild(line4);
  button_list.appendChild(line5);
  button_list.appendChild(line6);
  button_list.appendChild(line9);
  button_list.appendChild(line7);

  character_info_container.append(button_list);

}

  tiny_animate_containers()

}

function choose_character_to_attack(cell) {
  character_chosen.in_process = 2
  cell.src = "./images/attack_placeholder.jpg";
}

function change_character_visibility(character_number) {
  var toSend = {};
  toSend.command = "change_character_visibility";
  toSend.character_number = character_number
  toSend.room_number = my_room;

  if (character_state.visibility[character_number] == 0) {
    toSend.new_value = 1
  } else {
    toSend.new_value = 0
  }
  socket.sendMessage(toSend);
}

function search_action(search_button) {
  var index = search_button.index;
  var character = character_detailed_info[game_state.board_state[index]];

  var name = character.name;
  var modificator = game_state.search_modificator_state[index];
  var intelligence = character.intelligence;
  var roll = rollSearch(parseInt(intelligence), parseInt(modificator));
  var zone_number = game_state.zone_state[index];
  pushToList('Персонаж ' + name + ' бросил ' + roll + ' на внимательность');

  var toSend = {};
  toSend.command = 'search_action';
  toSend.character_name = name;
  toSend.roll = roll;
  toSend.zone_number = zone_number;
  toSend.room_number = my_room;
  socket.sendMessage(toSend);
}

function rollSearch(intelligence, mod) {
  return intelligence + roll_x(20) + mod;
}

function delete_object_command(index) {
  var toSend = {};
  toSend.command = 'delete_character';
  toSend.room_number = my_room;
  toSend.index = index;
  socket.sendMessage(toSend);
}

function delete_object(event) {
  clear_containers()

  delete_object_command(event.target.index)
}

function select_obstacle(index, cell) {
  clear_containers()
  var obstacle_id = game_state.board_state[index] * (-1);
  var obstacle = obstacle_detailed_info[obstacle_id];

  // keep track of last chosen obstale to quickly add to the map
  last_obstacle = obstacle_id

  let name = obstacle.name;
  let avatar = obstacle.avatar;

  var name_display = document.createElement("h2");
  name_display.innerHTML = name;

  var avatar_display = document.createElement("IMG");
  avatar_display.src = avatar;
  avatar_display.style.width = '250px';
  avatar_display.style.height = '250px';

  character_info_container.append(name_display);
  character_info_container.append(avatar_display);

  if (my_role == "gm") {
    var delete_button = document.createElement("button");
    delete_button.innerHTML = "Уничтожить";
    delete_button.index = index;
    delete_button.cell = cell;
    delete_button.onclick = function(event) {
      delete_object(event);
    }
    character_info_container.append(delete_button);
  }

  tiny_animate_containers()

}

function choose_character_to_move(index, cell) {
  character_chosen.in_process = 1
  character_chosen.char_position = index;
  character_chosen.char_id = game_state.board_state[index];
  cell.src = "./images/loading.webp";
}

function undo_selection() {
  character_chosen.in_process = 0
  var old_cell = document.getElementById("cell_" + character_chosen.char_position);
  old_cell.src = character_detailed_info[character_chosen.char_id].avatar;
}

function stop_attack() {
  character_chosen.in_process = 0
  var old_cell = document.getElementById("cell_" + character_chosen.char_position);
  old_cell.src = character_detailed_info[character_chosen.char_id].avatar;
}

function stop_skill() {
  character_chosen.in_process = 0
  var old_cell = document.getElementById("cell_" + character_chosen.char_position);
  old_cell.src = character_detailed_info[character_chosen.char_id].avatar;
}

function get_object_picture(index_in_board_state) {
  var image = EMPTY_CELL_PIC;
  var index_in_base;
  if (index_in_board_state > 0) {
    index_in_base = index_in_board_state;
    var character = character_detailed_info[index_in_base];
    image = character.avatar;
  } else if (index_in_board_state < 0) {
    index_in_base = index_in_board_state * (-1);
    var obstacle = obstacle_detailed_info[index_in_base];
    image = obstacle.avatar;
  }

  return image;
}

function saveBoard() {
  var save_name = document.getElementById("map_name").value;
  var full_game_state = {
    game_state: game_state,
    character_detailed_info: character_detailed_info,
    obstacle_detailed_info: obstacle_detailed_info,
    character_state: character_state
  };

  var toSend = {};
  toSend.command = 'save_game';
  toSend.save_name = save_name;
  toSend.full_game_state = full_game_state;
  toSend.from_name = my_name;
  toSend.room_number = my_room;
  socket.sendMessage(toSend);
}

function computeInitiative(agility) {
  return agility*2 + roll_x(20);
}

function rollInitiative() {
  for (let i = 1; i < character_state.initiative.length; i++) {
    if (character_state.HP[i] > 0) { // so character i is present
      // retrieve that character's agility
      var character = character_detailed_info[i];
      var agility = character.agility;

      // roll initiative and add agility modificator
      var initiative = computeInitiative(parseInt(agility));

      character_state.initiative[i] = initiative;
    }
  }
  var toSend = {};
  toSend.command = 'roll_initiative';
  toSend.room_number = my_room;
  toSend.initiative_state = character_state.initiative;
  socket.sendMessage(toSend);
}

function fogModeChange() {
  if (gm_control_mod != 1) {
    // turn on fog adding mode
    gm_control_mod = 1;
    fog_button.text('Выкл Туман Войны');
		for (let i = 0; i < game_state.size*game_state.size; i++) {
			if (game_state.fog_state[i] == 1) {
				var current_cell = document.getElementById("cell_" + i);
				current_cell.src = FOG_IMAGE;
			}
		}
  } else {
    // turn off fog adding mode
    gm_control_mod = 0;
    fog_button.text('Вкл Туман Войны');
		for (let i = 0; i < game_state.size*game_state.size; i++) {
			if (game_state.fog_state[i] == 1) {
				var current_cell = document.getElementById("cell_" + i);
				current_cell.src = get_object_picture(game_state.board_state[i]);
			}
		}
  }
}

function zoneModeChange() {
  if (gm_control_mod != 2) {
    // turn on zone adding mode
    gm_control_mod = 2;
    zone_button.text('Выкл Зональный режим');
    zone_number_select.show();
    fog_zone_button.show();
    unfog_zone_button.show();
    search_modificator.show();

    for (let i = 0; i < game_state.size*game_state.size; i++) {
			if (game_state.zone_state[i] > 0) {
				var current_zone_text = document.getElementById("zone_text_" + i);
				current_zone_text.innerHTML = game_state.zone_state[i] + '(' + game_state.search_modificator_state[i] + ')';
			}
		}
  } else {
    // back to normal mode
    gm_control_mod = 0;
    zone_button.text('Вкл Зональный режим');
    zone_number_select.hide();
    fog_zone_button.hide();
    unfog_zone_button.hide();
    search_modificator.hide();

    for (let i = 0; i < game_state.size*game_state.size; i++) {
				var current_zone_text = document.getElementById("zone_text_" + i);
				current_zone_text.innerHTML = '';
		}
  }
}

function fogCurrentZone() {
  var current_zone = zone_number_select.val();
  fogParseZone(1, current_zone);
}

function unfogCurrentZone() {
  fogParseZone(0, current_zone);
}

function fogParseZone(mod, current_zone) {
  var toSend = {};
  toSend.command = 'update_fog';
  toSend.room_number = my_room;
  if (mod == 0) {
    toSend.update_type = 'remove';
  } else if (mod == 1) {
    toSend.update_type = 'add';
  }
  for (let i = 0; i < game_state.size * game_state.size; i++) {
    if (game_state.zone_state[i] == current_zone) {
      toSend.index = i;
      socket.sendMessage(toSend);
    }
  }
}

function pushToList(message) {
  for (let i=1; i < CHAT_CASH; i++) {
    var element_to_copy = $('[data-name="notifications_list_element_' + i + '"]');
    var element_to_paste = $('[data-name="notifications_list_element_' + (i-1) + '"]');

    element_to_paste.text(element_to_copy.text());
  }
  var top_element = $('[data-name="notifications_list_element_' + (CHAT_CASH-1) + '"]');
  top_element.text(message);

  if (notifications_container.is(":hidden")) {
    chat_button.addClass("is-red")
  }
}

function changeChatVisibility() {
  if (chat_button.hasClass("is-red")) {
    chat_button.removeClass("is-red")
  }
  if (notifications_container.is(":hidden")) {
    notifications_container.show();
  } else {
    notifications_container.hide();
  }
}

function start_new_round() {
  var toSend = {};
  toSend.command = 'new_round';
  toSend.room_number = my_room;
  var save_roll = []

  for (let i = 1; i < character_state.can_evade.length; i++) {
    var character = character_detailed_info[i]
    if (character_state.special_effects[i] !== undefined && character_state.special_effects[i] !== null) {
      if (character_state.special_effects[i].hasOwnProperty("gas_bomb_poison")) {
        save_roll[i] = roll_x(20) + parseInt(character.stamina)
      }
    }
  }
  toSend.save_roll_list = save_roll

  socket.sendMessage(toSend);
}

function roll_attack(type, attacker, target, advantage_bonus) {
  var advantage = 0
  if ((type == "ranged")||(type == "energy")) {
    advantage = character_state.ranged_advantage[attacker]
  } else if (type == "melee") {
    advantage = character_state.melee_advantage[attacker]
  }
  advantage = advantage - character_state.defensive_advantage[target] + advantage_bonus
  var roll = 0

  if (advantage >= 2) { // Дикое преимущество = 4 куба
    console.log("Дикое преимущество")
    var roll1 = roll_x(20)
    var roll2 = roll_x(20)
    var roll3 = roll_x(20)
    var roll4 = roll_x(20)
    roll = Math.max(roll1, roll2, roll3, roll4)
  } else if (advantage == 1) {
    console.log("Преимущество")
    var roll1 = roll_x(20)
    var roll2 = roll_x(20)
    roll = Math.max(roll1, roll2)
  } else if (advantage == 0) {
    roll = roll_x(20)
  } else if (advantage == -1) {
    console.log("Помеха")
    var roll1 = roll_x(20)
    var roll2 = roll_x(20)
    roll = Math.min(roll1, roll2)
  } else {
    console.log("Дикая помеха")
    var roll1 = roll_x(20)
    var roll2 = roll_x(20)
    var roll3 = roll_x(20)
    var roll4 = roll_x(20)
    roll = Math.min(roll1, roll2, roll3, roll4)
  }
  return roll
}

function cover_mod(accumulated_cover) {
  var mod = {}
  mod.isPossible = true
  mod.cover_level = accumulated_cover
  switch(accumulated_cover) {
    case 0:
      mod.attack_bonus = 0
      mod.advantage_bonus = 0
      break;
    case 1:
      mod.attack_bonus = 0
      mod.advantage_bonus = 0
      break;
    case 2:
      mod.attack_bonus = -1
      mod.advantage_bonus = 0
      break;
    case 3:
      mod.attack_bonus = -2
      mod.advantage_bonus = 0
      break;
    case 4:
        mod.attack_bonus = -2
        mod.advantage_bonus = -1
        break;
    case 5:
        mod.attack_bonus = -3
        mod.advantage_bonus = -1
        break;
    case 6:
        mod.attack_bonus = -3
        mod.advantage_bonus = -2
        break;
    case 7:
        mod.attack_bonus = -4
        mod.advantage_bonus = -2
        break;
    case 8:
        mod.attack_bonus = -4
        mod.advantage_bonus = -3
        break;
    case 9:
        mod.attack_bonus = -5
        mod.advantage_bonus = -3
        break;
    default:
        mod.isPossible = false
        break;
  }

  return mod
}

function compute_cover(distance, cover) {
  var result = 0
  if (distance < 0.15) {
    result = cover
  } else if (distance < 0.3) {
    result = cover * 0.75
  } else if (distance < 0.5) {
    result = cover * 0.5
  } else if (distance < 0.65) {
    result = cover * 0.25
  } else {
    result = 0
  }

  return result
}

function line_from_endpoints(point1, point2) {
  var line = {}
  line.a = -1*(point1.y - point2.y)
  line.b = point1.x - point2.x
  line.c = (line.a * point2.x - line.b * point2.y)
  return line
}

function distance_to_line(endpoint1, endpoint2, size, testpoint) {
  var endpoint1_coord = index_to_coordinates(endpoint1, size)
  var endpoint2_coord = index_to_coordinates(endpoint2, size)
  var testpoint_coord = index_to_coordinates(testpoint, size)

  var line = line_from_endpoints(endpoint1_coord, endpoint2_coord)
  console.log(line)
  console.log(testpoint_coord)

  var distance = Math.abs(line.a*testpoint_coord.x + line.b*testpoint_coord.y + line.c)/Math.sqrt(line.a*line.a + line.b*line.b)

  console.log(distance)
  return distance
}

function cells_on_line(endpoint1, endpoint2, size) {
  var endpoint1_coord = index_to_coordinates(endpoint1, size)
  var endpoint2_coord = index_to_coordinates(endpoint2, size)
  var line = line_from_endpoints(endpoint1_coord, endpoint2_coord)

  var scale = Math.max(Math.abs(line.a), Math.abs(line.b))
  // need to be reversed! remember line.a = delta y
  var x_step = line.b/scale
  var y_step = -1*line.a/scale
  var current_point = endpoint2_coord

  var safety_iter = 0
  var candidate_cells = []
  while (Math.abs(current_point.x - endpoint1_coord.x) > 0.5 || Math.abs(current_point.y - endpoint1_coord.y) > 0.5) {
    var ceil = {}
    ceil.x = Math.ceil(current_point.x)
    ceil.y = Math.ceil(current_point.y)
    var ceil_index = coord_to_index(ceil, size)

    var floor = {}
    floor.x = Math.floor(current_point.x)
    floor.y = Math.floor(current_point.y)
    var floor_index = coord_to_index(floor, size)


    candidate_cells.push(ceil_index)
    if (ceil_index != floor_index) {
      candidate_cells.push(floor_index)
    }

    current_point.x = current_point.x  + x_step
    current_point.y = current_point.y  + y_step
    safety_iter = safety_iter + 1
    if (safety_iter > 50) {
      break;
    }
  }

  console.log(candidate_cells)
  return candidate_cells
}

function perform_attack(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id

  var weapon = weapon_detailed_info[character_chosen.weapon_id]

  if (isInRange(index, user_position, weapon.range)) {

    var accumulated_cover = 0
    var candidate_cells = cells_on_line(user_position, index, game_state.size)
    for (let i = 0; i < candidate_cells.length; i++) {
      var current_cell = candidate_cells[i]
      if (game_state.board_state[current_cell] < 0) {// это препятствие
        var obstacle = obstacle_detailed_info[Math.abs(game_state.board_state[current_cell])]
        var distance = distance_to_line(user_position, index, game_state.size, current_cell)
        accumulated_cover = accumulated_cover + compute_cover(distance, obstacle.cover)
      }
    }
    accumulated_cover = Math.ceil(accumulated_cover)
    var cover_modifier = cover_mod(accumulated_cover)


    var target_character_number = game_state.board_state[index]
    var target_character_KD = parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number])
    var target_character = character_detailed_info[target_character_number]
    var attacking_character = character_detailed_info[user_character_number]


    var toSend = {};
    toSend.command = 'resolve_attack';
    toSend.room_number = my_room;
    toSend.attacker_id = user_character_number
    toSend.target_id = target_character_number
    toSend.attack_type = weapon.type
    toSend.cover_level = cover_modifier.cover_level

    if (cover_modifier.isPossible) {
      var attack_roll = roll_attack(weapon.type, user_character_number, target_character_number, cover_modifier.advantage_bonus)

      if (attack_roll < 20) {// no crit
        if (weapon.type == "ranged") {
          var cumulative_attack_roll = attack_roll + parseInt(attacking_character.intelligence)
        } else if (weapon.type == "melee") {
          var cumulative_attack_roll = attack_roll + parseInt(attacking_character.strength)
        } else if (weapon.type == "energy") {
          var cumulative_attack_roll = attack_roll + 2*parseInt(attacking_character.intelligence)
        }

        var attack_bonus = character_state.attack_bonus[user_character_number]
        var universal_bonus = character_state.universal_bonus[user_character_number]

        cumulative_attack_roll = cumulative_attack_roll + attack_bonus + universal_bonus + cover_modifier.attack_bonus

        toSend.attack_roll = cumulative_attack_roll

        if (cumulative_attack_roll > target_character_KD) {// Есть пробитие
          if (character_state.can_evade[target_character_number] == 1) {
            var evade_roll = roll_x(20) + parseInt(target_character.agility) + character_state.universal_bonus[target_character_number]
            toSend.evade_roll = evade_roll
            if (evade_roll > cumulative_attack_roll) { //succesfully evaded
              toSend.outcome = "evaded"
            } else {
              var damage_roll = compute_damage(weapon, user_character_number, attack_roll, target_character_number)
              toSend.damage_roll = damage_roll
              toSend.outcome = "damage_after_evasion"
            }
          } else {
            var damage_roll = compute_damage(weapon, user_character_number, attack_roll, target_character_number)
            toSend.damage_roll = damage_roll
            toSend.outcome = "damage_without_evasion"
          }
        } else {
          toSend.outcome = "KD_block"
        }
      } else { // full crit
        toSend.attack_roll = attack_roll
        var damage_roll = compute_damage(weapon, user_character_number, attack_roll, target_character_number)
        toSend.damage_roll = damage_roll
        toSend.outcome = "full_crit"
      }

    } else {
      toSend.outcome = "full_cover"
  }
    socket.sendMessage(toSend);

  } else {
      alert("Далековато...")
  }
  stop_attack()
}

function compute_damage(weapon, character_number, attack_roll, target_number) {
  var damage = 0
  var character = character_detailed_info[character_number]

  if (character.special_type == "sniper") {
    if (attack_roll < 16) {
      for (let i = 0; i < weapon.damage[0]; i++) {
        damage = damage + roll_x(weapon.damage[1])
      }
      if (weapon.type == 'melee') {
        damage = damage + strength_damage_map[parseInt(character.strength)]
      }
      damage = damage + character_state.damage_bonus[character_number]
    } else {
      if (character_state.special_effects[target_number].hasOwnProperty("weakspot") && character_state.special_effects[target_number].weakspot.hunter_id == character_number) {
        switch (attack_roll) {
          case 18:
            damage = weapon.damage[1] * weapon.damage[0]
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)]
            }
            damage = damage + character_state.damage_bonus[character_number]
            damage = damage*2
            break;
          case 19:
          damage = weapon.damage[1] * weapon.damage[0]
          if (weapon.type == 'melee') {
            damage = damage + strength_damage_map[parseInt(character.strength)]
          }
          damage = damage + character_state.damage_bonus[character_number]
          damage = damage*2
          break;
          case 20:
          damage = weapon.damage[1] * weapon.damage[0]
          if (weapon.type == 'melee') {
            damage = damage + strength_damage_map[parseInt(character.strength)]
          }
          damage = damage + character_state.damage_bonus[character_number]
          damage = damage*5
          break;
          default:
            damage = weapon.damage[1] * weapon.damage[0]
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)]
            }
            damage = damage + character_state.damage_bonus[character_number]
        }
      } else {
        switch (attack_roll) {
          case 18:
            damage = weapon.damage[1] * weapon.damage[0]
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)]
            }
            damage = damage + character_state.damage_bonus[character_number]
            break;
          case 19:
          damage = weapon.damage[1] * weapon.damage[0]
          if (weapon.type == 'melee') {
            damage = damage + strength_damage_map[parseInt(character.strength)]
          }
          damage = damage + character_state.damage_bonus[character_number]
          damage = damage*2
          break;
          case 20:
          damage = weapon.damage[1] * weapon.damage[0]
          if (weapon.type == 'melee') {
            damage = damage + strength_damage_map[parseInt(character.strength)]
          }
          damage = damage + character_state.damage_bonus[character_number]
          damage = damage*3
          break;
          default:
          for (let i = 0; i < weapon.damage[0]; i++) {
            damage = damage + roll_x(weapon.damage[1])
          }
          if (weapon.type == 'melee') {
            damage = damage + strength_damage_map[parseInt(character.strength)]
          }
          damage = damage + character_state.damage_bonus[character_number]
        }
      }
    }
  } else {
    if (attack_roll < 19) {
      for (let i = 0; i < weapon.damage[0]; i++) {
        damage = damage + roll_x(weapon.damage[1])
      }
    } else {
      damage = weapon.damage[1] * weapon.damage[0]
    }
    if (weapon.type == 'melee') {
      damage = damage + strength_damage_map[parseInt(character.strength)]
    }
    damage = damage + character_state.damage_bonus[character_number]

    if (attack_roll == 20) {
      damage = damage * 2
    }
  }

  return damage
}

function weak_spot(index, cell) {
  var target_character_number = game_state.board_state[index]
  var user_character_number = character_chosen.char_id
  var attacking_character = character_detailed_info[user_character_number]

  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = character_chosen.skill_id
  toSend.room_number = my_room;
  toSend.user_index = user_character_number
  toSend.target_id = target_character_number

  var int_check = roll_x(20) + parseInt(attacking_character.intelligence) + character_state.universal_bonus[user_character_number]
  if (int_check >= weak_spot_threshold) {
    toSend.outcome = "success"
  } else {
    toSend.outcome = "fail"
  }

  socket.sendMessage(toSend);
}

function heal(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  if (isInRange(index, user_position, heal_range)) {

  var target_character_number = game_state.board_state[index]
  var healer_character = character_detailed_info[user_character_number]
  var target_character = character_detailed_info[target_character_number]

  var target_hp = character_state.HP[target_character_number]
  var target_full_hp = HP_values[target_character.stamina]
  var ratio = parseFloat(target_hp)/parseFloat(target_full_hp)

  var heal_roll = roll_x(20) + parseInt(healer_character.intelligence) + character_state.universal_bonus[user_character_number]
  if (healer_character.special_type == "med") {
    heal_roll = heal_roll + parseInt(healer_character.intelligence)
  }
  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = character_chosen.skill_id
  toSend.room_number = my_room;
  toSend.user_index = user_character_number
  toSend.target_id = target_character_number
  toSend.heal_roll = heal_roll

  var threshold = 0
  var critical_threshold = 0

  if (ratio > 0.9) {
    threshold = 10
    if (heal_roll > threshold) {
      toSend.outcome = "success"
      toSend.new_hp = target_full_hp
    } else {
      toSend.outcome = "fail"
    }
  } else if (ratio > 0.75) {
    threshold = 15
    critical_threshold = 25
    if (heal_roll > threshold) {
      if (heal_roll > critical_threshold && healer_character.special_type == "med") {
        toSend.outcome = "critical success"
        toSend.new_hp = target_full_hp
      } else {
        toSend.outcome = "success"
        toSend.new_hp = Math.floor(target_full_hp * 0.95)
      }
    } else {
      toSend.outcome = "fail"
    }
  } else if (ratio > 0.5) {
    threshold = 20
    critical_threshold = 29
    if (heal_roll > threshold) {
      if (heal_roll > critical_threshold && healer_character.special_type == "med") {
        toSend.outcome = "critical success"
        toSend.new_hp = Math.floor(target_full_hp * 0.95)
      } else {
        toSend.outcome = "success"
        toSend.new_hp = Math.floor(target_full_hp * 0.82)
      }
    } else {
      toSend.outcome = "fail"
    }
  } else if (ratio > 0.3) {
    threshold = 23
    critical_threshold = 32
    if (heal_roll > threshold) {
      if (heal_roll > critical_threshold && healer_character.special_type == "med") {
        toSend.outcome = "critical success"
        toSend.new_hp = Math.floor(target_full_hp * 0.82)
      } else {
        toSend.outcome = "success"
        toSend.new_hp = Math.floor(target_full_hp * 0.62)
      }
    } else {
      toSend.outcome = "fail"
    }
  } else if (ratio > 0.15) {
    threshold = 26
    critical_threshold = 35
    if (heal_roll > threshold) {
      if (heal_roll > critical_threshold && healer_character.special_type == "med") {
        toSend.outcome = "critical success"
        toSend.new_hp = Math.floor(target_full_hp * 0.62)
      } else {
        toSend.outcome = "success"
        toSend.new_hp = Math.floor(target_full_hp * 0.4)
      }
    } else {
      toSend.outcome = "fail"
    }
  } else if (ratio > 0.05) {
    threshold = 30
    critical_threshold = 40
    if (heal_roll > threshold) {
      if (heal_roll > critical_threshold && healer_character.special_type == "med") {
        toSend.outcome = "critical success"
        toSend.new_hp = Math.floor(target_full_hp * 0.4)
      } else {
        toSend.outcome = "success"
        toSend.new_hp = Math.floor(target_full_hp * 0.22)
      }
    } else {
      toSend.outcome = "fail"
    }
  } else {
    toSend.outcome = "fail"
  }

  socket.sendMessage(toSend);

  } else {
    alert("Нужно подойти ближе к цели чтобы вылечить")
  }
}

function big_bro(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  if (isInRange(index, user_position, big_bro_range)) {
  var target_character_number = game_state.board_state[index]

  var shield_KD = parseInt(character_state.KD_points[user_character_number]) + parseInt(character_state.bonus_KD[user_character_number])
  var target_KD = parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number])

  var bonus_KD = Math.max(shield_KD -  target_KD, 0)

  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = character_chosen.skill_id
  toSend.room_number = my_room;
  toSend.user_index = user_character_number
  toSend.target_id = target_character_number
  toSend.bonus_KD = bonus_KD
  socket.sendMessage(toSend);
} else {
  alert("Большой брат не достает до малого!")
}
}

function damage_skill_template(target_pos, user_pos, range, user_id, skill_id, bonus_attack, weapon) {
  if (isInRange(target_pos, user_pos, range)) {

    var target_character_number = game_state.board_state[target_pos]
    var target_character_KD = parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number])
    var target_character = character_detailed_info[target_character_number]
    var attacking_character = character_detailed_info[user_id]
    var attack_roll = roll_attack(weapon.type, user_id, target_character_number)

    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = skill_id
    toSend.room_number = my_room;
    toSend.user_index = user_id
    toSend.target_id = target_character_number

    if (attack_roll < 20) {// no crit
      var cumulative_attack_roll = attack_roll + bonus_attack

      toSend.attack_roll = cumulative_attack_roll

      if (cumulative_attack_roll > target_character_KD) {// Есть пробитие
        if (character_state.can_evade[target_character_number] == 1) {
          var evade_roll = roll_x(20) + parseInt(target_character.agility) + character_state.universal_bonus[target_character_number]
          toSend.evade_roll = evade_roll
          if (evade_roll > cumulative_attack_roll) { //succesfully evaded
            toSend.outcome = "evaded"
          } else {
            var damage_roll = compute_damage(weapon, user_id, attack_roll, target_character_number)
            toSend.damage_roll = damage_roll
            toSend.outcome = "damage_after_evasion"
          }
        } else {
          var damage_roll = compute_damage(weapon, user_id, attack_roll, target_character_number)
          toSend.damage_roll = damage_roll
          toSend.outcome = "damage_without_evasion"
        }
      } else {
        toSend.outcome = "KD_block"
      }
    } else { // full crit
      toSend.attack_roll = attack_roll
      var damage_roll = compute_damage(weapon, user_id, attack_roll, target_character_number)
      toSend.damage_roll = damage_roll
      toSend.outcome = "full_crit"
    }
    return toSend

  } else {
    return null
  }
}

// increase attack roll by agility bonus (2*mod)
function cut_limbs(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]]
  if (weapon.type == "melee") {
    var attacking_character = character_detailed_info[user_character_number]
    var bonus_attack = 2*parseInt(attacking_character.agility) + character_state.attack_bonus[user_character_number] + character_state.universal_bonus[user_character_number]

    var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon)
    if (toSend == null) {
      alert("Далековато")
    } else {
      if (toSend.outcome == "damage_after_evasion" || toSend.outcome == "damage_without_evasion" || toSend.outcome == "full_crit") {
        var damage_roll = toSend.damage_roll
        var flat_damage = damage_roll - strength_damage_map[parseInt(attacking_character.strength)] - character_state.damage_bonus[user_character_number]
        var full_damage = weapon.damage[1] * weapon.damage[0]
        if (flat_damage > full_damage/3) {
          toSend.skill_outcome = "success"
        }  else {
          toSend.skill_outcome = "fail"
        }
      } else {
        toSend.skill_outcome = "fail"
      }
      socket.sendMessage(toSend);
    }

  } else {
    alert("Вы не можете подрезать сухожилья этим оружием")
  }


}

function shock_wave(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]]
  var attacking_character = character_detailed_info[user_character_number]
  var bonus_attack = parseInt(attacking_character.intelligence) + character_state.attack_bonus[user_character_number] + character_state.universal_bonus[user_character_number]

  var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon)
  if (toSend == null) {
    alert("Далековато")
  } else {
    if (toSend.outcome == "damage_after_evasion" || toSend.outcome == "damage_without_evasion" || toSend.outcome == "full_crit") {
      toSend.skill_outcome = "success"
    } else {
      toSend.skill_outcome = "fail"
    }
    socket.sendMessage(toSend);
  }
}

function devour(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  if (isInRange(index, user_position, 1)) {
    var target_character_number = game_state.board_state[index]
    var stacks = 0
    if (character_state.special_effects[target_character_number].hasOwnProperty("Markus_stacks")) {
      stacks = character_state.special_effects[target_character_number].Markus_stacks
    }
    var damage = stacks*5 + roll_x(10)
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id
    toSend.room_number = my_room;
    toSend.user_index = user_character_number
    toSend.target_id = target_character_number
    toSend.damage = damage
    socket.sendMessage(toSend);
  } else {
    alert("Далековато")
  }
}

function absolute_recovery(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  if (isInRange(index, user_position, 1)) {
    var target_character_number = game_state.board_state[index]
    var heal_amount = 0

    var damage_field = document.getElementById("damage_field");
    if (!(damage_field.value === "")) {
      heal_amount = parseInt(damage_field.value);
    }

    var biopool = 0
    if (character_state.special_effects[user_character_number].hasOwnProperty("biopool")) {
      biopool = character_state.special_effects[user_character_number].biopool
    }

    if (heal_amount > 0 && biopool >= heal_amount) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id
      toSend.room_number = my_room;
      toSend.user_index = user_character_number
      toSend.target_id = target_character_number
      toSend.heal_amount = heal_amount
      socket.sendMessage(toSend);
    } else {
      alert("Невозможное значение лечения")
    }
  } else {
    alert("Далековато")
  }
}

function gas_bomb(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var character = character_detailed_info[user_character_number]
  var throw_range = throw_base_range + parseInt(character.strength)*2
  if (isInRange(index, user_position, throw_range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id
    toSend.room_number = my_room;
    toSend.user_index = user_character_number
    toSend.position = index
    toSend.threshold = gas_bomb_threshold
    socket.sendMessage(toSend);

    add_obstacle_command(index, gas_bomb_obstacle)
  } else {
    alert("Мало каши ели для такого броска")
  }
}

function light_sound_bomb(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id

  if (isInRange(index, user_position, light_sound_bomb_range)) {
  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = character_chosen.skill_id
  toSend.room_number = my_room;
  toSend.user_index = user_character_number
  toSend.position = index

  var character_list = []
  var outcome_list = []

  var radius = light_sound_bomb_radius

  var candidate_cells = index_in_radius(index, radius)
  console.log(candidate_cells)
  for (let i = 0; i < candidate_cells.length; i++) {
    var target_character_number = game_state.board_state[candidate_cells[i]]
    if (target_character_number > 0) {// персонаж в радиусе бомбы
      var character = character_detailed_info[target_character_number]
      if (character.special_type !== "drone") {
        character_list.push(target_character_number)
        var save_roll = roll_x(20) + character_state.universal_bonus[target_character_number] + parseInt(character.intelligence)
        if (save_roll > light_sound_bomb_threshold) {
          outcome_list.push(0)
        } else {
          outcome_list.push(1)
        }
      }
    }
  }
  toSend.character_list = character_list
  toSend.outcome_list = outcome_list

  socket.sendMessage(toSend);
} else {
  alert("Дрон не докинет")
}
}

function force_field(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id

  if (isInRange(index, user_position, force_field_range)) {
  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = character_chosen.skill_id
  toSend.room_number = my_room;
  toSend.user_index = user_character_number
  toSend.position = index

  var user = character_detailed_info[user_character_number]

  var shield = Math.ceil(parseFloat(HP_values[user.stamina])/2)
  toSend.shield = shield

  var character_list = []

  var radius = force_field_radius

  var candidate_cells = index_in_radius(index, radius)
  for (let i = 0; i < candidate_cells.length; i++) {
    var target_character_number = game_state.board_state[candidate_cells[i]]
    if (target_character_number > 0) {// персонаж в радиусе щита
        character_list.push(target_character_number)
    }
  }
  toSend.cells_protected = candidate_cells
  toSend.character_list = character_list
  socket.sendMessage(toSend);

  add_obstacle_command(index, force_field_obstacle)
} else {
  alert("Генератор должен быть установлен поближе")
}
}

function adrenaline(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id

  var target_number = game_state.board_state[index]
  var adrenaline_range = 1
  if (isInRange(index, user_position, adrenaline_range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.room_number = my_room;
    toSend.skill_index = character_chosen.skill_id
    toSend.user_index = user_character_number
    toSend.target_index = target_number
    var extra_actions = roll_x(4)
    var minus_actions = roll_x(4)
    toSend.extra_actions = extra_actions
    toSend.minus_actions = minus_actions
    socket.sendMessage(toSend);
  } else {
    alert("Далековато")
  }
}

function pich_pich_go(index, cell) {
  var user_character_number = character_chosen.char_id

  var user = character_detailed_info[user_character_number]
  var target_number = game_state.board_state[index]
  var target = character_detailed_info[target_number]
  if (target.special_type == "drone") {
    var toSend = {};
    toSend.command = 'skill';
    toSend.room_number = my_room;
    toSend.skill_index = character_chosen.skill_id
    toSend.user_index = user_character_number
    toSend.target_index = target_number
    var extra_actions = Math.ceil(parseFloat(user.intelligence)/2)
    toSend.extra_actions = extra_actions
    socket.sendMessage(toSend);
  } else {
    alert("Вы не можете пыщ-пыщ кого попало!")
  }
}

function perform_skill(index, cell) {
  switch(character_chosen.skill_id) {
    case 1:
      adrenaline(index, cell)
      stop_skill()
      break;
    case 2: // Подрезать сухожилия
      cut_limbs(index, cell)
      stop_skill()
      break;
    case 3: // Слабое место
      weak_spot(index, cell)
      stop_skill()
      break;
    case 4: // Лечение
      heal(index, cell)
      stop_skill()
      break;
    case 5: // Лечение
      big_bro(index, cell)
      stop_skill()
      break;
    case 7: // пожирание
      devour(index, cell)
      stop_skill()
      break;
    case 9:
      absolute_recovery(index, cell)
      stop_skill()
      break;
    case 12:
      gas_bomb(index, cell)
      stop_skill()
      break;
    case 13:
      light_sound_bomb(index, cell)
      stop_skill()
      break;
    case 14:
      shock_wave(index, cell)
      stop_skill()
      break;
    case 15:
      pich_pich_go(index, cell)
      stop_skill()
      break;
    case 16:
      force_field(index, cell)
      stop_skill()
      break;

    default:
      alert("Unknown targeted skill")
  }
}

function use_skill(skill_index, character_number, position, cell) {
  skill_index = parseInt(skill_index)
  switch(skill_index) {
    case 0: //Рывок
      if (character_state.bonus_action[character_number] > 0) {
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index
        toSend.user_index = character_number
        socket.sendMessage(toSend);
      } else {
        alert("Не хватает действий!")
      }
      break;
    case 1: //Прилив Адреналина
      if (character_state.special_effects[character_number].hasOwnProperty("adrenaline_user")) {
        alert("Умение все еще на кулдауне")
      } else {
        choose_character_skill(skill_index, character_number, position, cell)
      }
      break;
    case 2: // Подрезать сухожилия
    if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
      choose_character_skill(skill_index, character_number, position, cell)
    } else {
      alert("Не хватает действий!")
    }
    break;

    case 3: // Слабое место
    if (character_state.bonus_action[character_number] > 0) {
      choose_character_skill(skill_index, character_number, position, cell)
    } else {
      alert("Не хватает действий!")
    }
    break;

    case 4: // Лечение
    if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
      choose_character_skill(skill_index, character_number, position, cell)
    } else {
      alert("Не хватает действий!")
    }
    break;

    case 5: // Большой брат
    if (character_state.bonus_action[character_number] > 0) {
      choose_character_skill(skill_index, character_number, position, cell)
    } else {
      alert("Не хватает действий!")
    }
    break;

    case 6: // Поднять щиты
    if (character_state.main_action[character_number] > 0) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.room_number = my_room;
      toSend.skill_index = skill_index
      toSend.user_index = character_number

      if (character_state.special_effects[character_number].hasOwnProperty("shield_up")) {
        toSend.outcome = "shield_down"
      } else {
        toSend.outcome = "shield_up"
      }
      socket.sendMessage(toSend);
    } else {
      alert("Не хватает действий!")
    }
    break;

    case 7: // пожирание сущности
    if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
      choose_character_skill(skill_index, character_number, position, cell)
    } else {
      alert("Не хватает действий!")
    }
    break;

    case 8: // узнать биопул
      if (character_state.special_effects[character_number].hasOwnProperty("biopool")) {
        alert("Накопленный биопул: " + character_state.special_effects[character_number].biopool)
      } else {
        alert("Накопленный биопул отсутствует")
      }
      break;

    case 9: // безупречное восстановление
      if (character_state.bonus_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell)
      } else {
        alert("Не хватает действий!")
      }
      break;

    case 10: // обычное в бонусное
        if (character_state.main_action[character_number] > 0) {
          var toSend = {};
          toSend.command = 'skill';
          toSend.room_number = my_room;
          toSend.skill_index = skill_index
          toSend.user_index = character_number
          socket.sendMessage(toSend);
        } else {
          alert("Не хватает основных действий, чтобы превратить в бонусные!")
        }
      break;

    case 11: // отдых
          if (character_state.has_moved[character_number] == 0) {
            var new_stamina = Math.min(character_state.stamina[character_number] + rest_stamina_gain, stamina_values[character_detailed_info[character_number].stamina])
            var toSend = {};
            toSend.command = 'skill';
            toSend.room_number = my_room;
            toSend.skill_index = skill_index
            toSend.new_stamina = new_stamina
            toSend.user_index = character_number
            socket.sendMessage(toSend);
          } else {
            alert("Вы уже совершали действия на этом ходу, так что не можете отдохнуть")
          }
        break;

    case 12: // газовая граната
          if (!character_state.special_effects[character_number].hasOwnProperty("gas_bomb_user")) {
            if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
              choose_character_skill(skill_index, character_number, position, cell)
            } else {
              alert("Не хватает действий!")
            }
          } else {
            alert("У гранаты кулдаун (газ эээ заваривается, хз)")
          }
          break;
    case 13: // светошумовая граната
          if (!character_state.special_effects[character_number].hasOwnProperty("light_sound_bomb_user")) {
              if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
                choose_character_skill(skill_index, character_number, position, cell)
              } else {
                alert("Не хватает действий!")
              }
            } else {
              alert("Граната еще не готова")
            }
          break;
    case 14: // Шоковый импульс
      if (character_state.main_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell)
      } else {
        alert("Не хватает действий!")
      }
        break;
    case 15: // Пыщ-пыщ-го
      if (!character_state.special_effects[character_number].hasOwnProperty("pich_pich_user")) {
        if (character_state.bonus_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell)
        } else {
          alert("Не хватает действий!")
        }
      } else {
        alert("Пыщ пыщ еще на перезарядке!")
      }
        break;

    case 16: // Силовое поле
        if (!character_state.special_effects[character_number].hasOwnProperty("force_field_user")) {
          if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
            choose_character_skill(skill_index, character_number, position, cell)
          } else {
            alert("Не хватает действий!")
          }
        } else {
          alert("Генератор силового поля еще не зарядился!")
        }
        break;

    default:
      alert("Не знаем это умение")
  }
}

function choose_character_skill(skill_index, character_number, position, cell) {
  character_chosen.in_process = 3
  character_chosen.skill_id = skill_index
  character_chosen.char_id = character_number
  character_chosen.char_position = position
  cell.src = "./images/Chidori.webp";
}

function apply_bomb(position, radius) {
  var candidate_cells = index_in_radius(position, radius)
  console.log(candidate_cells)
  for (let i = 0; i < candidate_cells.length; i++) {
    var target_character_number = game_state.board_state[candidate_cells[i]]
    if (target_character_number > 0) {// персонаж в радиусе бомбы
      var character = character_detailed_info[target_character_number]
      var message = character.name + " попадает под действие газовой бомбы"
      pushToList(message)
      if (character_state.special_effects[target_character_number].hasOwnProperty("gas_bomb_poison")) {
        character_state.special_effects[target_character_number].gas_bomb_poison.poison_level = character_state.special_effects[target_character_number].gas_bomb_poison.poison_level + 1
      } else {
        var gas_bomb_poison_object = {}
        gas_bomb_poison_object.poison_level = 1
        gas_bomb_poison_object.threshold = gas_bomb_threshold
        character_state.special_effects[target_character_number].gas_bomb_poison = gas_bomb_poison_object
      }
      character_state.move_action[target_character_number] = character_state.move_action[target_character_number] - gas_bomb_move_reduction
      character_state.main_action[target_character_number] = character_state.main_action[target_character_number] - 1
    }
  }
}

function shocked_effect(target) {
  if (!character_state.special_effects[target].hasOwnProperty("shocked")) {
    var shocked_object = {}
    shocked_object.cooldown = shocked_cooldown
    character_state.special_effects[target].shocked = shocked_object
    character_state.defensive_advantage[target] = character_state.defensive_advantage[target] - 1
  } else {
    character_state.special_effects[target].shocked.cooldown = shocked_cooldown
  }
}

function melee_penalty(data) {
  if (data.attack_type == "melee") {
    if (!character_state.special_effects[data.target_id].hasOwnProperty("meleed")) { // иначе эффект уже наложен, не повторяем
      character_state.ranged_advantage[data.target_id] = character_state.ranged_advantage[data.target_id] - 1
      var meleed_object = {}
      meleed_object.cooldown = 0
      character_state.special_effects[data.target_id].meleed = meleed_object
    }
    if (character_state.has_moved[data.target_id] == 1) {
      var cooldown = 1
    } else {
      var cooldown = 0
    }
    character_state.special_effects[data.target_id].meleed.cooldown = cooldown
  }
}

function do_damage(character_number, damage) {
  if (!character_state.special_effects[character_number].hasOwnProperty("force_field_target")) {
    character_state.HP[character_number] = character_state.HP[character_number] - damage
  } else {
    var shield_index = character_state.special_effects[character_number].force_field_target.shield_index
    game_state.terrain_effects[shield_index].shield = game_state.terrain_effects[shield_index].shield - damage
    var message = "Щит принял урон на себя! Оставшаяся прочность: " + game_state.terrain_effects[shield_index].shield
    pushToList(message)
    if (game_state.terrain_effects[shield_index].shield <= 0) {// щит уничтожен
      var message = "Press F Щиту..."
      pushToList(message)
      var char_list = game_state.terrain_effects[shield_index].character_list
      for (let i = 0; i < char_list.length; i++) {
        var character_number = char_list[i]
        delete character_state.special_effects[character_number].force_field_target
      }
      delete_object_command(game_state.terrain_effects[shield_index].position)
      delete game_state.terrain_effects[shield_index]
    }
  }
}

function change_battle_mod() {
  if (battle_mod == 1) {
    var new_value = 0
  } else {
    var new_value = 1
  }

  var toSend = {};
  toSend.command = 'battle_mod';
  toSend.room_number = my_room;
  toSend.value = new_value
  socket.sendMessage(toSend);
}

// {board_state: [], HP_state: [], initiative_state: [], fog_state: [], zone_state: [], size: 0, search_modificator_state: []};
function mirror_board() {
  var left_index;
  var right_index;
  var temp;
  var left_cell;
  var right_cell;
  for (let y = 0; y < game_state.size; y++) {
    for (let x = 0; x < game_state.size/2; x++) {

      left_index = y*game_state.size + x;
      right_index = y*game_state.size + parseInt(game_state.size) - x - 1;
      //console.log('y: ' + y + ' x: ' + x + ' left index: ' + left_index + ' right index: ' + right_index);

      temp = game_state.board_state[left_index];
      game_state.board_state[left_index] = game_state.board_state[right_index];
      game_state.board_state[right_index] = temp;

      temp = game_state.fog_state[left_index];
      game_state.fog_state[left_index] = game_state.fog_state[right_index];
      game_state.fog_state[right_index] = temp;

      temp = game_state.zone_state[left_index];
      game_state.zone_state[left_index] = game_state.zone_state[right_index];
      game_state.zone_state[right_index] = temp;

      temp = game_state.search_modificator_state[left_index];
      game_state.search_modificator_state[left_index] = game_state.search_modificator_state[right_index];
      game_state.search_modificator_state[right_index] = temp;

      left_cell = document.getElementById('cell_' + left_index);
      right_cell = document.getElementById('cell_' + right_index);

      temp = left_cell.src;
      left_cell.src = right_cell.src;
      right_cell.src = temp;
    }
  }
}

function sync_board() {
  var full_game_state = {
    game_state: game_state,
    character_detailed_info: character_detailed_info,
    obstacle_detailed_info: obstacle_detailed_info,
    character_state: character_state
  };

  var toSend = {};
  toSend.command = 'sync_board';
  toSend.full_game_state = full_game_state;
  toSend.from_name = my_name;
  toSend.room_number = my_room;
  socket.sendMessage(toSend);
}

function clear_character_state() {
  character_state = {HP: [], main_action: [], bonus_action: [], move_action: [], stamina: [], initiative: [], can_evade: [], has_moved: [], KD_points: [], current_weapon: [], visibility: [], attack_bonus: [], damage_bonus: [], universal_bonus: [], bonus_KD: [], special_effects: [], ranged_advantage: [], melee_advantage: [], defensive_advantage: []}
}

function clear_character(number) {
  //character_detailed_info[number] = null
  character_state.HP[number] = null
  character_state.main_action[number] = null
  character_state.bonus_action[number] = null
  character_state.move_action[number] = null
  character_state.stamina[number] = null
  character_state.initiative[number] = null
  character_state.can_evade[number] = null
  character_state.has_moved[number] = null
  character_state.KD_points[number] = null
  character_state.current_weapon[number] = null
  character_state.visibility[number] = null
  character_state.attack_bonus[number] = null
  character_state.damage_bonus[number] = null
  character_state.universal_bonus[number] = null
  character_state.bonus_KD[number] = null
  character_state.special_effects[number] = {}
  character_state.ranged_advantage[number] = null
  character_state.melee_advantage[number] = null
  character_state.defensive_advantage[number] = null
}

function w_onclick() {
  if (character_chosen.in_process == 1) {
    undo_selection()
  } else {
    var index = character_chosen.char_position
    var cell = character_chosen.cell
    choose_character_to_move(index, cell);
  }
}

function a_onclick() {
  if (character_chosen.in_process == 2) {
    stop_attack()
  } else {
    var character_number = character_chosen.char_id
    var cell = character_chosen.cell
    var main_actions_left = character_state.main_action[character_number]
    if (main_actions_left > 0) {
      choose_character_to_attack(cell)
    } else {
      alert("У вас не осталось действий!")
    }
  }
}

//socket.init('ws://localhost:3001');
socket.init(SERVER_ADDRESS);

socket.registerOpenHandler(() => {
  var toSend = {};
  toSend.command = 'player_info';
  toSend.room_number = my_room;
  toSend.from_name = my_name;
  toSend.role = my_role;
  if (my_role == 'gm') {
    toSend.password = JSON.parse(sessionStorage.getItem('gm_password'));
  }
  socket.sendMessage(toSend);
});

socket.registerMessageHandler((data) => {
  console.log(data);
  if (((data.to_name == my_name) || (data.to_name == 'all')) && (data.room_number == my_room)) {
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
        fog_button.show();
        zone_button.show();
        save_name_input.show();
        board_size_input.show();
        mirror_button.show();
        next_round_button.show();
        battle_mod_button.show();
        sync_button.show();

        document.onkeydown = function (e) {
            var keyCode = e.keyCode;
            // q
            if(keyCode == 81) {
                fogModeChange();
            } else if (keyCode == 87) { // w
              w_onclick()
            } else if (keyCode == 65) { // a
              a_onclick()
            }
        };
      }
      character_list = data.character_list;
      obstacle_list = data.obstacle_list;
      weapon_list = data.weapon_list
      weapon_detailed_info = data.weapon_detailed_info
      skill_list = data.skill_list

    } else if (data.command == 'construct_board_response') {
      clear_character_state()
      construct_board(data.game_state);
    } else if (data.command == 'add_character_response') {
      var character = data.character_info;
      character_detailed_info[data.character_number] = character;
      if (!((my_role == 'player')&&(game_state.fog_state[data.cell_id] == 1))) {
        var cell = document.getElementById("cell_" + data.cell_id);
        cell.src = character.avatar;
      }
      game_state.board_state[data.cell_id] = data.character_number;
      character_state.HP[data.character_number] = HP_values[character.stamina];
      character_state.stamina[data.character_number] = stamina_values[character.stamina];
      character_state.move_action[data.character_number] = move_action_map[character.agility];
      character_state.bonus_action[data.character_number] = bonus_action_map[character.agility];
      character_state.main_action[data.character_number] = main_action_map[character.agility];
      character_state.initiative[data.character_number] = character.agility;
      character_state.KD_points[data.character_number] = character.KD_points;
      character_state.bonus_KD[data.character_number] = 0;
      character_state.can_evade[data.character_number] = 1;
      character_state.has_moved[data.character_number] = 0;
      character_state.visibility[data.character_number] = 0;
      character_state.current_weapon[data.character_number] = character.inventory[0]
      character_state.attack_bonus[data.character_number] = 0
      character_state.damage_bonus[data.character_number] = 0
      character_state.universal_bonus[data.character_number] = 0
      character_state.ranged_advantage[data.character_number] = 0
      character_state.melee_advantage[data.character_number] = 0
      character_state.defensive_advantage[data.character_number] = 0
      character_state.special_effects[data.character_number] = {}


    } else if (data.command == 'add_obstacle_response') {
      var obstacle = data.obstacle_info;
      obstacle_detailed_info[data.obstacle_number] = obstacle;
      if (!((my_role == 'player')&&(game_state.fog_state[data.cell_id] == 1))) {
        var cell = document.getElementById("cell_" + data.cell_id);
        cell.src = obstacle.avatar;
      }
      game_state.board_state[data.cell_id] = data.obstacle_number * (-1);
    } else if (data.command == 'move_character_response') {
      var to_index = data.to_index;
      var from_index = data.from_index;
      game_state.board_state[to_index] = data.character_number;

      // remove shielded property from character and remove character from shielded list
      if (data.left_shield == 1) {
        delete character_state.special_effects[data.character_number].force_field_target
        var index = game_state.terrain_effects[data.shield_index].character_list.indexOf(data.character_number)
        if (index !== -1) {
          game_state.terrain_effects[data.shield_index].character_list.splice(index, 1);
        }
      }

      character_state.has_moved[data.character_number] = 1

      if (battle_mod == 1) {
        character_state.stamina[data.character_number] = character_state.stamina[data.character_number] - stamina_move_cost
        character_state.move_action[data.character_number] = character_state.move_action[data.character_number] - data.distance
        var character = character_detailed_info[data.character_number]
        if (character.special_type == "sniper") {
          var effects_object = character_state.special_effects[data.character_number]
          if (effects_object.hasOwnProperty("sniper_passive")) {
            var current_attack_bonus = effects_object.sniper_passive.attack_bonus
            var current_damage_bonus = effects_object.sniper_passive.damage_bonus
            character_state.attack_bonus[data.character_number] = character_state.attack_bonus[data.character_number] - current_attack_bonus - 5
            character_state.damage_bonus[data.character_number] = character_state.damage_bonus[data.character_number] - current_damage_bonus
            character_state.special_effects[data.character_number].sniper_passive.attack_bonus = -5
            character_state.special_effects[data.character_number].sniper_passive.damage_bonus = 0
          } else {
            var sniper_passive_object = {}
            sniper_passive_object.attack_bonus = -5
            sniper_passive_object.damage_bonus = 0
            character_state.special_effects[data.character_number].sniper_passive = sniper_passive_object
            character_state.attack_bonus[data.character_number] = character_state.attack_bonus[data.character_number] - 5
          }
        }
      }

      if (!((my_role == 'player')&&(game_state.fog_state[to_index] == 1))) {
        var to_cell = document.getElementById('cell_' + to_index);
        to_cell.src = data.character_avatar;
      }

      game_state.board_state[from_index] = 0;
      if (!((my_role == 'player')&&(game_state.fog_state[from_index] == 1))) {
        var old_cell = document.getElementById("cell_" + from_index);
        old_cell.src = EMPTY_CELL_PIC;
      }
    } else if (data.command == 'delete_character_response') {
      if (data.hasOwnProperty("character_number")) {
        clear_character(data.character_number)
      }
      game_state.board_state[data.index] = 0;
      if (!((my_role == 'player')&&(game_state.fog_state[data.index] == 1))) {
        var cell = document.getElementById('cell_' + data.index);
        cell.src = EMPTY_CELL_PIC;
      }
    } else if (data.command == 'roll_initiative_response') {
      character_state.initiative = data.initiative_state;
    } else if (data.command == 'deal_damage_response') {
      character_state.HP[data.character_number] = character_state.HP[data.character_number] - data.damage;
    } else if (data.command == 'save_game_response') {
      if (data.success == 1) {
        alert('Game ' + data.save_name + ' saved succesfully');
      } else {
        alert('Game with name ' + data.save_name + ' already exist!');
      }
    } else if (data.command == 'load_game_response') {
      if (data.success == 1) {
        var full_game_state = data.full_game_state;
        character_state = full_game_state.character_state;
        character_detailed_info = full_game_state.character_detailed_info;
        obstacle_detailed_info = full_game_state.obstacle_detailed_info;
        construct_board(full_game_state.game_state);
      } else {
        alert('Failed to load game ' + data.save_name);
      }
    } else if (data.command == 'sync_board_response') {
      var full_game_state = data.full_game_state;
      character_state = full_game_state.character_state;
      character_detailed_info = full_game_state.character_detailed_info;
      obstacle_detailed_info = full_game_state.obstacle_detailed_info;
      construct_board(full_game_state.game_state);
    } else if (data.command == 'update_fog_response') {
				var index = data.index;
				var cell = document.getElementById('cell_' + index);
				if (data.update_type == 'remove') {
					game_state.fog_state[index] = 0;
					cell.src = get_object_picture(game_state.board_state[index]);
				} else {
					game_state.fog_state[index] = 1;
					cell.src = FOG_IMAGE;
				}
		} else if (data.command == 'assign_zone_response') {
      var index_list = data.index_list
      for (let i = 0; i < index_list.length; i++) {
        game_state.zone_state[index_list[i]] = data.zone_number;
        game_state.search_modificator_state[index_list[i]] = data.modificator;
      }
    } else if (data.command == 'change_character_visibility_response') {
      character_state.visibility[data.character_number] = data.new_value;
    } else if (data.command == 'simple_roll_response') {
      var message = data.character_name + " бросает " + data.roll
      pushToList(message)
    } else if (data.command == 'skill_response') {
      var user_index = data.user_index
      character_state.has_moved[user_index] = 1
      switch(data.skill_index) {
        case 0:
            character = character_detailed_info[user_index]
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
            character_state.move_action[user_index] = character_state.move_action[user_index] + charge_move_increase
            var message = character.name + " совершает рывок"
            pushToList(message)
            break;
          case 1:
            var user = character_detailed_info[user_index]
            var target_index = data.target_index
            var target = character_detailed_info[target_index]
            var extra_actions = data.extra_actions
            while (extra_actions > 0) {
              if (extra_actions % 2 == 0) {
                character_state.move_action[target_index] = character_state.move_action[target_index] + adrenaline_move_increase
              } else {
                character_state.main_action[target_index] = character_state.main_action[target_index] + 1
              }
              extra_actions = extra_actions - 1
            }
            var adrenaline_object_target = {}
            adrenaline_object_target.minus_actions = data.minus_actions
            character_state.special_effects[target_index].adrenaline_target = adrenaline_object_target

            var adrenaline_object_user = {}
            adrenaline_object_user.cooldown = 3
            character_state.special_effects[user_index].adrenaline_user = adrenaline_object_user

            var message = user.name + " использует прилив адреналина. "  + target.name + " получает " + data.extra_actions + " действий. Это будет стоить " + data.minus_actions + " действий на следующий ход."
            pushToList(message)
            break;
          case 2:
            var attacker = character_detailed_info[user_index]
            var target = character_detailed_info[data.target_id]
            if (battle_mod == 1) {
              character_state.stamina[user_index] = character_state.stamina[user_index] - stamina_cut_limb_cost
              character_state.main_action[user_index] = character_state.main_action[user_index] - 1
              character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
            }
            switch (data.outcome) {
              case "KD_block":
                var message = attacker.name + " пытается подрезать " + target.name + " (" + data.attack_roll + "), но не пробивает броню."
                pushToList(message)
                break;
              case "evaded":
                var message = attacker.name + " пытается подрезать " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + ")."
                pushToList(message)
                if (target.special_type != 'rogue') {
                  character_state.can_evade[data.target_id] = 0
                }
                break;
              case "damage_without_evasion":
                if (data.skill_outcome == "success") {
                  var limb_cut_object = {}
                  limb_cut_object.cooldown = cooldown_cut_limb
                  character_state.special_effects[data.target_id].cut_limb = limb_cut_object
                  character_state.move_action[data.target_id] = -10
                  var message = attacker.name + " успешно подрезает " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона."
                } else {
                  var message = attacker.name + " безуспешно пытается подрезать " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона."
                }
                pushToList(message)
                do_damage(data.target_id, data.damage_roll)
                break;
              case "damage_after_evasion":
                if (data.skill_outcome == "success") {
                  var limb_cut_object = {}
                  limb_cut_object.cooldown = cooldown_cut_limb
                  character_state.special_effects[data.target_id].cut_limb = limb_cut_object
                  character_state.move_action[data.target_id] = -10
                  var message = attacker.name + " успешно подрезает " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона."
                } else {
                  var message = attacker.name + " безуспешно пытается подрезать " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона."
                }
                pushToList(message)
                do_damage(data.target_id, data.damage_roll)
                character_state.can_evade[data.target_id] = 0
                break;
            case "full_crit":
              var limb_cut_object = {}
              limb_cut_object.cooldown = cooldown_cut_limb + 1
              character_state.special_effects[data.target_id].cut_limb = limb_cut_object
              character_state.move_action[data.target_id] = -10
              var message = attacker.name + " критически подрезает " + target.name + ", не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона."
              pushToList(message)
              do_damage(data.target_id, data.damage_roll)
              break;
            default:
              console.log("fucked up resolving damage")
              break;
          }
            break;
        case 3:
          var attacker = character_detailed_info[user_index]
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
          character_state.stamina[user_index] = character_state.stamina[user_index] - stamina_weakspot_cost
          var target = character_detailed_info[data.target_id]
          if (data.outcome == "success") {
            var weakspot_object = {}
            weakspot_object.hunter_id = user_index
            character_state.special_effects[data.target_id].weakspot = weakspot_object
            var message = attacker.name + " успешно обнаружил слабое место " + target.name
          } else {
            var message = attacker.name + " не удалось обнаружить слабое место " + target.name
          }
          pushToList(message)
          break;

        case 4:
        var healer = character_detailed_info[user_index]
        var target = character_detailed_info[data.target_id]
        character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
        character_state.main_action[user_index] = character_state.main_action[user_index] - 1
        character_state.stamina[user_index] = character_state.stamina[user_index] - 1
        var cooldown = 0
        if (character_state.initiative[user_index] > character_state.initiative[data.target_id]) {
          // пациент не ходит в этот же ход
          character_state.main_action[data.target_id] = 0
          character_state.bonus_action[data.target_id] = 0
          character_state.move_action[data.target_id] = 0
          cooldown = 0
        } else {
          cooldown = 1
        }
        var healed_object = {}
        healed_object.cooldown = cooldown
        character_state.special_effects[data.target_id].healed = healed_object
          switch (data.outcome) {
            case "fail":
              var message = "У " + healer.name + " не получилось вылечить " + target.name + " (" + data.heal_roll + ")"
              pushToList(message)
              break;
            case "success":
              var message = "У " + healer.name + " получилось успешно вылечить " + target.name + " (" + data.heal_roll + ")"
              pushToList(message)
              character_state.HP[data.target_id] = data.new_hp
              break;
            case "critical success":
              var message = "У " + healer.name + " получилось критически (2 степени) вылечить " + target.name + " (" + data.heal_roll + ")"
              pushToList(message)
              character_state.HP[data.target_id] = data.new_hp
              break;
            default:
              console.log("Ошибка при разборе отхила")
          }
          break;
        case 5:
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
          character_state.stamina[user_index] = character_state.stamina[user_index] - 1
          var shield = character_detailed_info[user_index]
          var target = character_detailed_info[data.target_id]
          var message = shield.name + " защитил " +  target.name + " (+" + data.bonus_KD + "кд)"
          pushToList(message)
          character_state.bonus_KD[data.target_id] = character_state.bonus_KD[data.target_id] + data.bonus_KD
          var big_bro_object = {}
          big_bro_object.cooldown = cooldown_big_bro
          big_bro_object.bonus_KD = data.bonus_KD
          character_state.special_effects[data.target_id].big_bro = big_bro_object
          break;
        case 6:
          var shield = character_detailed_info[user_index]
          character_state.main_action[user_index] = character_state.main_action[user_index] - 1
          if (data.outcome == "shield_up") {
            character_state.bonus_KD[user_index] = character_state.bonus_KD[user_index] + shield_up_KD
            var shield_up_object = {}
            shield_up_object.stamina_cost = shield_up_stamina_cost
            shield_up_object.KD = shield_up_KD
            character_state.special_effects[user_index].shield_up = shield_up_object
            var message = shield.name + " поднял щиты за чат"
            pushToList(message)
          } else {
            character_state.bonus_KD[user_index] = character_state.bonus_KD[user_index] - shield_up_KD
            delete character_state.special_effects[user_index].shield_up
            var message = shield.name + " опустил щит. Чат прости("
            pushToList(message)
          }
          break;
        case 7:
          var attacker = character_detailed_info[user_index]
          var target = character_detailed_info[data.target_id]
          character_state.main_action[user_index] = character_state.main_action[user_index] - 1
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1

          character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage
          if (character_state.special_effects[data.target_id].hasOwnProperty("Markus_stacks")) {
            character_state.special_effects[data.target_id].Markus_stacks = character_state.special_effects[data.target_id].Markus_stacks + 2
          } else {
            character_state.special_effects[data.target_id].Markus_stacks = 2
          }
          if (character_state.special_effects[user_index].hasOwnProperty("biopool")) {
            character_state.special_effects[user_index].biopool = character_state.special_effects[user_index].biopool + data.damage
          } else {
            character_state.special_effects[user_index].biopool = data.damage
          }
          var message = attacker.name + " наносит " + target.name + " " + data.damage + " урона от которого невозможно увернуться"
          pushToList(message)
          break;
        case 9:
          var healer = character_detailed_info[user_index]
          var target = character_detailed_info[data.target_id]
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
          character_state.stamina[user_index] = character_state.stamina[user_index] - 1

          character_state.HP[data.target_id] = character_state.HP[data.target_id] + data.heal_amount
          character_state.special_effects[user_index].biopool = character_state.special_effects[user_index].biopool - data.heal_amount
          var message = healer.name + " восстаналивает " + target.name + " " + data.heal_amount + " хп"
          pushToList(message)
          break;
        case 10:
            character = character_detailed_info[user_index]
            character_state.main_action[user_index] = character_state.main_action[user_index] - 1
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] + 1
            var message = character.name + " меняет обычное на бонусное действие"
            pushToList(message)
            break;
        case 11:
            character = character_detailed_info[user_index]
            character_state.main_action[user_index] = 0
            character_state.bonus_action[user_index] = 0
            character_state.move_action[user_index] = 0
            character_state.stamina[user_index] = data.new_stamina
            var message = character.name + " отдыхает. Хорошего отпуска!"
            pushToList(message)
            break;

        case 12:
            character = character_detailed_info[user_index]
            character_state.main_action[user_index] = character_state.main_action[user_index] - 1
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
            character_state.stamina[user_index] = character_state.stamina[user_index] - gas_bomb_stamina_cost

            var message = character.name + " бросает газовую бомбу. Советуем задержать дыхание."
            pushToList(message)

            var bomb_object = {}
            bomb_object.type = "gas_bomb"
            bomb_object.position = data.position
            bomb_object.threshold = data.threshold
            bomb_object.radius = 3
            game_state.terrain_effects.push(bomb_object)

            var gas_bomb_user = {}
            gas_bomb_user.cooldown = gas_bomb_skill_cooldown
            character_state.special_effects[user_index].gas_bomb_user = gas_bomb_user

            var initial_radius = 2

            apply_bomb(data.position, initial_radius)

            break;

        case 13:
            var light_sound_bomb_user = {}
            light_sound_bomb_user.cooldown = light_sound_bomb_skill_cooldown
            character_state.special_effects[user_index].light_sound_bomb_user = light_sound_bomb_user

            for (let i = 0; i < data.outcome_list.length; i++) {
              var character_number = data.character_list[i]
              var character = character_detailed_info[character_number]
              if (data.outcome_list[i] == 0) { // Прошел спасбросок
                var message = character.name + " успел прикрыть глаза"
                pushToList(message)
              } else {
                var message = character.name + " ослеп на 2 хода"
                pushToList(message)
                if (character_state.special_effects[character_number].hasOwnProperty("blind")) {// не накладывваем еще штраф
                  character_state.special_effects[character_number].blind.cooldown = 2
                } else {
                  var blind_object = {}
                  blind_object.cooldown = 2
                  character_state.special_effects[character_number].blind = blind_object
                  character_state.ranged_advantage[character_number] = character_state.ranged_advantage[character_number] - 2
                  character_state.melee_advantage[character_number] = character_state.melee_advantage[character_number] - 1
                }
              }
            }
            break;

        case 14:
          var attacker = character_detailed_info[user_index]
          var target = character_detailed_info[data.target_id]
          if (battle_mod == 1) {
            character_state.main_action[user_index] = character_state.main_action[user_index] - 1
          }
        switch (data.outcome) {
          case "KD_block":
            var message = attacker.name + " стреляет в " + target.name + " (" + data.attack_roll + "), но не пробивает броню."
            pushToList(message)
            break;
          case "evaded":
            var message = attacker.name + " стреляет в " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + ")."
            pushToList(message)
            if (target.special_type != 'rogue') {
              character_state.can_evade[data.target_id] = 0
            }
            break;
          case "damage_without_evasion":
            shocked_effect(data.target_id)

            var message = attacker.name + " стреляет в " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться и шокирует цель (уязвимость). Атака наносит " + data.damage_roll + " урона."
            pushToList(message)
            do_damage(data.target_id, data.damage_roll)
            character_state.can_evade[data.target_id] = 0
            break;
          case "damage_after_evasion":
            shocked_effect(data.target_id)
            var message = attacker.name + " стреляет в " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + ") и шокирует цель (уязвимость). Атака наносит " + data.damage_roll + " урона."
            pushToList(message)
            do_damage(data.target_id, data.damage_roll)
            character_state.can_evade[data.target_id] = 0
            break;
        case "full_crit":
          shocked_effect(data.target_id)
          var message = attacker.name + " критически попадает в " + target.name + ", не оставляя возможности увернуться и шокирует цель. Атака наносит " + data.damage_roll + " урона."
          pushToList(message)
          do_damage(data.target_id, data.damage_roll)
          character_state.can_evade[data.target_id] = 0
          break;
        default:
          console.log("fucked up resolving damage")
          break;
      }
          break;

        case 15:
          var user = character_detailed_info[user_index]
          var target_index = data.target_index
          var target = character_detailed_info[target_index]
          var extra_actions = data.extra_actions
          if (battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
          }
          while (extra_actions > 0) {
            if (extra_actions % 2 == 0) {
              character_state.move_action[target_index] = character_state.move_action[target_index] + pich_pich_move_increase
            } else {
              character_state.main_action[target_index] = character_state.main_action[target_index] + 1
            }
            extra_actions = extra_actions - 1
          }
          var pich_pich_object_target = {}
          pich_pich_object_target.extra_actions = data.extra_actions
          character_state.special_effects[target_index].pich_pich_target = pich_pich_object_target

          var pich_pich_object_user = {}
          pich_pich_object_user.cooldown = pich_pich_cooldown
          character_state.special_effects[user_index].pich_pich_user = pich_pich_object_user

          var message = user.name + " использует Пыщ-Пыщ-Гоу. "  + target.name + " получает " + data.extra_actions + " доп действий на этот и следующий ход."
          pushToList(message)
          break;
        case 16:
            if (battle_mod == 1) {
              character_state.main_action[user_index] = character_state.main_action[user_index] - 1
              character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
              character_state.stamina[user_index] = character_state.stamina[user_index] - force_field_stamina_cost
            }
            var shield_object = {}
            shield_object.type = "force_field"
            shield_object.position = data.position
            shield_object.radius = force_field_radius
            shield_object.shield = data.shield
            shield_object.character_list = data.character_list
            shield_object.cells_protected = data.cells_protected
            game_state.terrain_effects.push(shield_object)

            var shield_index = game_state.terrain_effects.length - 1
            var char_list = data.character_list

            var force_field_target = {}
            force_field_target.shield_index = shield_index

            for (let i = 0; i < char_list.length; i++) {
              var character_number = char_list[i]
              character_state.special_effects[character_number].force_field_target = force_field_target
            }

            var force_field_user = {}
            force_field_user.cooldown = force_field_cooldown
            character_state.special_effects[user_index].force_field_user = force_field_user
            var character = character_detailed_info[user_index]
            var message = character.name + " активирует силовое поле"
            pushToList(message)
            break;

        default:
          alert("Received unknown skill command")
      }
    } else if (data.command == 'new_round_response') {
      var message = "Начало нового раунда!"
      pushToList(message)

      for (let i = 0; i < game_state.terrain_effects.length; i++) {
        if (game_state.terrain_effects[i] !== null && game_state.terrain_effects[i] !== undefined) {
          switch (game_state.terrain_effects[i].type) {
            case "gas_bomb":
                apply_bomb(game_state.terrain_effects[i].position, game_state.terrain_effects[i].radius)
                if (game_state.terrain_effects[i].radius >= 4) {
                  if (my_role == "gm") {
                    delete_object_command(game_state.terrain_effects[i].position)
                  }
                  game_state.terrain_effects[i] = null
                } else {
                  game_state.terrain_effects[i].radius = game_state.terrain_effects[i].radius + 1
                }
                break;
            default:
                console.log("Messed up resolving terrain effects")
            }
        }
      }

      for (let i = 1; i < character_state.can_evade.length; i++) {
        character = character_detailed_info[i]
        if (character !== undefined && character !== null) {
          character_state.can_evade[i] = 1
          character_state.has_moved[i] = 0
          character_state.move_action[i] = move_action_map[character.agility];
          character_state.bonus_action[i] = bonus_action_map[character.agility];
          character_state.main_action[i] = main_action_map[character.agility];

          if (character_state.special_effects[i].hasOwnProperty("tired")) { // Убрать бонусы от усталости прошлого хода (чтобы когда будут накаладываться новые не штрафовать дважды)
            character_state.universal_bonus[i] = character_state.universal_bonus[i] - character_state.special_effects[i].tired.bonus
          }

          if (character_state.stamina[i] < stamina_values[character.stamina] * 0.67) {
            if (character_state.stamina[i] < stamina_values[character.stamina] * 0.34) {
              if (character_state.stamina[i] <= 0) { // 3я стадия
                var tired_object = {}
                tired_object.bonus = -3
                tired_object.stage = 3
                character_state.special_effects[i].tired = tired_object
                character_state.universal_bonus[i] = character_state.universal_bonus[i] - 3
                character_state.move_action[i] = Math.ceil(character_state.move_action[i]*0.25)
                if ((character_state.main_action[i] == 1)&&(character_state.bonus_action[i] == 1)) {
                  character_state.bonus_action[i] = 0
                } else {
                  character_state.bonus_action[i] = 1
                  character_state.main_action[i] = 1
                }
              } else { // 2я стадия
                var tired_object = {}
                tired_object.bonus = -2
                tired_object.stage = 2
                character_state.special_effects[i].tired = tired_object
                character_state.universal_bonus[i] = character_state.universal_bonus[i] - 2
                character_state.move_action[i] = Math.ceil(character_state.move_action[i]*0.5)
              }
            } else { // 1я стадия
              var tired_object = {}
              tired_object.bonus = -1
              tired_object.stage = 1
              character_state.special_effects[i].tired = tired_object
              character_state.universal_bonus[i] = character_state.universal_bonus[i] - 1
              character_state.move_action[i] = Math.ceil(character_state.move_action[i]*0.75)
            }
          } else if (character_state.special_effects[i].hasOwnProperty("tired")) { // не устал -> убрать устлалость если была
            delete character_state.special_effects[i].tired
          }

          if (character_state.special_effects[i].hasOwnProperty("light_sound_bomb_user")) {
            if (character_state.special_effects[i].light_sound_bomb_user.cooldown == 0) {
              delete character_state.special_effects[i].light_sound_bomb_user
              var message = "Светошумовая граната у" + character.name + " готова к использованию."
              pushToList(message)
            } else {
              character_state.special_effects[i].light_sound_bomb_user.cooldown = character_state.special_effects[i].light_sound_bomb_user.cooldown - 1
            }
          }

          if (character_state.special_effects[i].hasOwnProperty("gas_bomb_user")) {
            if (character_state.special_effects[i].gas_bomb_user.cooldown == 0) {
              delete character_state.special_effects[i].gas_bomb_user
              var message = "Газовая граната у" + character.name + " готова к использованию."
              pushToList(message)
            } else {
              character_state.special_effects[i].gas_bomb_user.cooldown = character_state.special_effects[i].gas_bomb_user.cooldown - 1
            }
          }

          if (character_state.special_effects[i].hasOwnProperty("force_field_user")) {
            if (character_state.special_effects[i].force_field_user.cooldown == 0) {
              delete character_state.special_effects[i].force_field_user
              var message = "Силовое поле у " + character.name + " снова заряжено."
              pushToList(message)
            } else {
              character_state.special_effects[i].force_field_user.cooldown = character_state.special_effects[i].force_field_user.cooldown - 1
            }
          }

          if (character_state.special_effects[i].hasOwnProperty("pich_pich_user")) {
            if (character_state.special_effects[i].pich_pich_user.cooldown == 0) {
              delete character_state.special_effects[i].pich_pich_user
              var message = "Умение Пыщ-Пыщ у " + character.name + " снова доступно."
              pushToList(message)
            } else {
              if (character_state.special_effects[i].pich_pich_user.cooldown == pich_pich_cooldown) {
                character_state.bonus_action[i] = 0
              }
              character_state.special_effects[i].pich_pich_user.cooldown = character_state.special_effects[i].pich_pich_user.cooldown - 1
            }
          }

          if (character_state.special_effects[i].hasOwnProperty("pich_pich_target")) {
              var extra_actions = character_state.special_effects[i].pich_pich_target.extra_actions
              while (extra_actions > 0) {
                if (extra_actions % 2 == 0) {
                  character_state.move_action[i] = character_state.move_action[i] + adrenaline_move_increase
                } else {
                  character_state.main_action[i] = character_state.main_action[i] + 1
                }
                extra_actions = extra_actions - 1
              }
              delete character_state.special_effects[i].pich_pich_target
          }

          if (character_state.special_effects[i].hasOwnProperty("adrenaline_user")) {
            character_state.special_effects[i].adrenaline_user.cooldown = character_state.special_effects[i].adrenaline_user.cooldown - 1
            if (character_state.special_effects[i].adrenaline_user.cooldown == 0) {
              delete character_state.special_effects[i].adrenaline_user
              var message = "Умение Прилив Адреналина у " + character.name + " снова доступно."
              pushToList(message)
            }
          }

          if (character_state.special_effects[i].hasOwnProperty("adrenaline_target")) {
              var minus_actions = character_state.special_effects[i].adrenaline_target.minus_actions
              while (minus_actions > 0) {
                if (minus_actions % 2 == 0) {
                  character_state.move_action[i] = character_state.move_action[i] - adrenaline_move_increase
                } else {
                  character_state.main_action[i] = character_state.main_action[i] - 1
                }
                minus_actions = minus_actions - 1
              }
              delete character_state.special_effects[i].adrenaline_target
          }

          if (character_state.special_effects[i].hasOwnProperty("shocked")) {
            if (character_state.special_effects[i].shocked.cooldown == 0) {
              character_state.defensive_advantage[i] = character_state.defensive_advantage[i] + 1
              delete character_state.special_effects[i].shocked
            } else {
              character_state.special_effects[i].shocked.cooldown = character_state.special_effects[i].shocked.cooldown - 1
            }
          }

          if (character_state.special_effects[i].hasOwnProperty("cut_limb")) {
            character_state.move_action[i] = -10
            character_state.special_effects[i].cut_limb.cooldown = character_state.special_effects[i].cut_limb.cooldown - 1
            if (character_state.special_effects[i].cut_limb.cooldown == 0) {
              delete character_state.special_effects[i].cut_limb
              var message = "Сухожилия " + character.name + " восстановятся на следующем ходу."
              pushToList(message)
            }
          }

          if (character_state.special_effects[i].hasOwnProperty("healed")) {
            if (character_state.special_effects[i].healed.cooldown > 0) {
              character_state.move_action[i] = 0
              character_state.main_action[i] = 0
              character_state.bonus_action[i] = 0
              character_state.special_effects[i].healed.cooldown = character_state.special_effects[i].healed.cooldown - 1
            } else {
              delete character_state.special_effects[i].healed
            }
          }

          if (character_state.special_effects[i].hasOwnProperty("blind")) {
            if (character_state.special_effects[i].blind.cooldown > 0) {
              character_state.special_effects[i].blind.cooldown = character_state.special_effects[i].blind.cooldown - 1
            } else {
              delete character_state.special_effects[i].blind
              character_state.ranged_advantage[i] = character_state.ranged_advantage[i] + 2
              character_state.melee_advantage[i] = character_state.melee_advantage[i] + 1
              var message = "Зрение " + character.name + " восстановилось"
              pushToList(message)
            }
          }

          if (character_state.special_effects[i].hasOwnProperty("Markus_stacks")) {
            character_state.special_effects[i].Markus_stacks = character_state.special_effects[i].Markus_stacks - 1
            if (character_state.special_effects[i].Markus_stacks == 0) {
              delete character_state.special_effects[i].Markus_stacks
            }
          }

          if (character_state.special_effects[i].hasOwnProperty("shield_up")) {
            character_state.move_action[i] = Math.ceil(character_state.move_action[i]/2)
            character_state.stamina[i] = character_state.stamina[i] - character_state.special_effects[i].shield_up.stamina_cost
            var message = character.name + " продолжает держать щит (спасибо)"
            pushToList(message)
          }
          if (character_state.special_effects[i].hasOwnProperty("big_bro")) {
            if (character_state.special_effects[i].big_bro.cooldown == 0) {
              character_state.bonus_KD[i] = character_state.bonus_KD[i] - character_state.special_effects[i].big_bro.bonus_KD
              delete character_state.special_effects[i].big_bro
              var message = character.name + " теряет защиту Большого Брата"
              pushToList(message)
            } else {
              character_state.special_effects[i].big_bro.cooldown = character_state.special_effects[i].big_bro.cooldown - 1
            }
          }
          if (character_state.special_effects[i].hasOwnProperty("gas_bomb_poison")) {
            var count = character_state.special_effects[i].gas_bomb_poison.poison_level
            while (count > 0) {
              character_state.move_action[i] = character_state.move_action[i] - gas_bomb_move_reduction
              if (count % 2 == 1) {
                character_state.main_action[i] = character_state.main_action[i] - 1
              } else {
                character_state.bonus_action[i] = character_state.bonus_action[i] - 1
              }
              count = count - 1
            }
            var save_roll = data.save_roll_list[i]
            if (save_roll >= character_state.special_effects[i].gas_bomb_poison.threshold) {
              character_state.special_effects[i].gas_bomb_poison.poison_level = character_state.special_effects[i].gas_bomb_poison.poison_level - 1
              var message = character.name + " успешно кидает спасбросок и уменьшает стадию отравления (теперь " + character_state.special_effects[i].gas_bomb_poison.poison_level + ")"
              pushToList(message)
            } else {
              var message = character.name + " проваливает спасбросок. Стадия отравления остается прежней (" + character_state.special_effects[i].gas_bomb_poison.poison_level + ")"
              pushToList(message)
            }
            if (character_state.special_effects[i].gas_bomb_poison.poison_level <= 0) {
              delete character_state.special_effects[i].gas_bomb_poison
              var message = character.name + " больше не отравлен!"
              pushToList(message)
            }
          }

          if (character_state.special_effects[i].hasOwnProperty("meleed")) {
            if (character_state.special_effects[i].meleed.cooldown <= 0) {
              delete character_state.special_effects[i].meleed
              character_state.ranged_advantage[i] = character_state.ranged_advantage[i] + 1
            } else {
              character_state.special_effects[i].meleed.cooldown = character_state.special_effects[i].meleed.cooldown - 1
            }
          }

          if (character.special_type == 'sniper') {
            var effects_object = character_state.special_effects[i]
            if (effects_object.hasOwnProperty("sniper_passive")) {
              var current_attack_bonus = effects_object.sniper_passive.attack_bonus
              var current_damage_bonus = effects_object.sniper_passive.damage_bonus
              if (current_attack_bonus == -5) {
                var new_attack_bonus = 0
                var new_damage_bonus = 0
              } else {
                var new_attack_bonus = Math.min(current_attack_bonus + 1, 4)
                var new_damage_bonus = Math.min(current_damage_bonus + 2, 8)
              }
              character_state.attack_bonus[i] = character_state.attack_bonus[i] - current_attack_bonus + new_attack_bonus
              character_state.damage_bonus[i] = character_state.damage_bonus[i] - current_damage_bonus + new_damage_bonus
              character_state.special_effects[i].sniper_passive.attack_bonus = new_attack_bonus
              character_state.special_effects[i].sniper_passive.damage_bonus = new_damage_bonus
            } else {
              var sniper_passive_object = {}
              sniper_passive_object.attack_bonus = 0
              sniper_passive_object.damage_bonus = 0
              character_state.special_effects[i].sniper_passive = sniper_passive_object
            }
          }
        }
      }
    } else if (data.command == 'battle_mod_response') {
      battle_mod = data.value
      if (battle_mod == 0) {
        var message = "Бой окончен! Наступил мир во всем мире"
      } else {
        var message = "Начало боя! Люди умирают, если их убить"
      }
      pushToList(message)
    } else if (data.command == 'resolve_attack_response') {
      if (data.attack_type == "ranged") {
        var audio = gunshot_audio
      } else if (data.attack_type == "melee") {
        var audio = sword_audio
      }
      audio.play();

      var attacker = character_detailed_info[data.attacker_id]
      var target = character_detailed_info[data.target_id]
      character_state.has_moved[data.attacker_id] = 1

      if (battle_mod == 1) {
        character_state.stamina[data.attacker_id] = character_state.stamina[data.attacker_id] - stamina_attack_cost
        character_state.main_action[data.attacker_id] = character_state.main_action[data.attacker_id] - 1
      }

      if (data.cover_level > 0) {
        var cover_string = "Уровень укрытия: " + data.cover_level
      } else {
        var cover_string = ""
      }
      switch (data.outcome) {
        case "KD_block":
          var message = attacker.name + " атакует " + target.name + " (" + data.attack_roll + "), но не пробивает броню. " + cover_string
          pushToList(message)
          break;
        case "evaded":
          var message = attacker.name + " атакует " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + "). " + cover_string
          pushToList(message)
          if (target.special_type != 'rogue') {
            character_state.can_evade[data.target_id] = 0
          }
          break;
        case "damage_without_evasion":
          var message = attacker.name + " успешно атакует " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона. " + cover_string
          pushToList(message)
          do_damage(data.target_id, data.damage_roll)
          melee_penalty(data)
          break;
        case "damage_after_evasion":
          var message = attacker.name + " успешно атакует " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона. " + cover_string
          pushToList(message)
          do_damage(data.target_id, data.damage_roll)
          character_state.can_evade[data.target_id] = 0
          melee_penalty(data)
          break;
        case "full_crit":
          var message = attacker.name + " критически атакует " + target.name + ", не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона. " + cover_string
          pushToList(message)
          do_damage(data.target_id, data.damage_roll)
          character_state.can_evade[data.target_id] = 0
          melee_penalty(data)
          break;
        case "full_cover":
          var message = attacker.name + " пытался атаковать " + target.name + " но тот находится в полном укрытии."
          pushToList(message)
          break;
        default:
          console.log("fucked up resolving damage")
          break;
      }
    } else if (data.command == 'search_action_response') {
      if (my_role == 'gm') {
        pushToList(data.character_name + ' бросил ' + data.roll + ' на внимательность в зоне ' + data.zone_number);
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

var fog_button = $(FOG_BUTTON_SELECTOR);
fog_button.on('click', fogModeChange);
fog_button.hide();

var zone_button = $(ZONE_BUTTON_SELECTOR);
zone_button.on('click', zoneModeChange);
zone_button.hide();

var chat_button = $(CHAT_BUTTON_SELECTOR);
chat_button.on('click', changeChatVisibility);

var mirror_button = $(MIRROR_BUTTON_SELECTOR);
mirror_button.on('click', mirror_board);
mirror_button.hide();

var next_round_button = $(NEXT_ROUND_BUTTON_SELECTOR);
next_round_button.on('click', start_new_round);
next_round_button.hide();

var battle_mod_button = $(BATTLE_MOD_BUTTON_SELECTOR);
battle_mod_button.on('click', change_battle_mod);
battle_mod_button.hide();

var sync_button = $(SYNC_BUTTON_SELECTOR);
sync_button.on('click', sync_board);
sync_button.hide();

var fog_zone_button = $(FOG_ZONE_BUTTON_SELECTOR);
fog_zone_button.on('click', fogCurrentZone);
fog_zone_button.hide();

var unfog_zone_button = $(UNFOG_ZONE_BUTTON_SELECTOR);
unfog_zone_button.on('click', unfogCurrentZone);
unfog_zone_button.hide();

var zone_number_select = $(ZONE_NUMBER_SELECTOR);
zone_number_select.hide();
for (let i = 1; i < MAX_ZONES; i++) {
  var current_option = $("<option>");
  current_option.text('Зона ' + i);
  current_option.val(i);
  zone_number_select.append(current_option);
}

var search_modificator = $(SEARCH_MODIFICATOR_SELECTOR);
search_modificator.hide();

var notifications_list = $(NOTIFICATIONS_LIST_SELECTOR);
for (let i = 0; i < CHAT_CASH; i++) {
  var current_element = $("<li>");
  current_element.attr('data-name', 'notifications_list_element_' + i);
  current_element.attr('class', 'notifications_list_element');
  notifications_list.append(current_element);
}

var board_size_input = $(BOARD_SIZE_INPUT_SELECTOR);
board_size_input.hide();

var save_name_input = $(SAVE_NAME_INPUT_SELECTOR);
save_name_input.hide();

var notifications_container = $(NOTIFICATIONS_CONTANER_SELECTOR);
notifications_container.hide();

var character_info_container = $(CHARACTER_INFO_CONTANER_SELECTOR);

var weapon_info_container = $(WEAPON_INFO_CONTANER_SELECTOR);

document.onkeydown = function (e) {
    var keyCode = e.keyCode;
    // w
    if(keyCode == 87) {
        w_onclick()
    } else if (keyCode == 65) { // a
      a_onclick()
    }
};

setInterval(reconnect, 15*1000)
