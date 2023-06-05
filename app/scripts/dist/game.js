(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _wsClient = require('./ws-client');

var _wsClient2 = _interopRequireDefault(_wsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var CHARACTER_STATE_CONSTANT = { HP: [], main_action: [], bonus_action: [], move_action: [], stamina: [], initiative: [], can_evade: [], has_moved: [], KD_points: [], current_weapon: [], visibility: [], invisibility: [], attack_bonus: [], damage_bonus: [], universal_bonus: [], bonus_KD: [], special_effects: [], ranged_advantage: [], melee_advantage: [], defensive_advantage: [], position: [] };

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
var ZONE_ENDPOINT_PIC = "./images/red_cross.jpg";
var FOG_IMAGE = "./images/fog.webp";
var QUESTION_IMAGE = "./images/question.jpg";

var MAX_ZONES = 25;
var CHAT_CASH = 15;

var stamina_weakspot_cost = 1;
var stamina_move_cost = 0;
var stamina_attack_cost = 1;
var punch_rainfall_stamina_cost = 2;
var stamina_cut_limb_cost = 4;
var shield_up_stamina_cost = 2;
var lottery_shot_stamina_cost = 1;
var lucky_shot_stamina_cost = 1;
var action_splash_stamina_cost = 2;

var rest_stamina_gain = 3;

var cooldown_cut_limb = 1;
var cooldown_big_bro = 1;

var shield_up_KD = 3;

var adrenaline_move_increase = 4;
var charge_move_increase = 4;

var gas_bomb_threshold = 11;
var gas_bomb_move_reduction = 2;
var gas_bomb_stamina_cost = 3;
var gas_bomb_obstacle = 15;
var gas_bomb_skill_cooldown = 5;

var light_sound_bomb_radius = 4;
var light_sound_bomb_threshold = 15;
var light_sound_bomb_skill_cooldown = 5;

var weak_spot_threshold = 15;

var shocked_cooldown = 0;

var pich_pich_cooldown = 4;
var pich_pich_move_increase = 4;

var force_field_radius = 1.6;
var force_field_stamina_cost = 5;
var force_field_cooldown = 10;
var force_field_obstacle = 24;

var action_splash_cooldown = 4;

var invisibility_detection_radius = 3;

var big_bro_range = 2;
var heal_range = 1;
var throw_base_range = 2;
var light_sound_bomb_range = 5;
var force_field_range = 1;

// This is a constant, will be moved to database later
var HP_values = [15, 30, 40, 55, 75, 100, 130, 165, 205, 250, 300, 355, 415];
var stamina_values = [30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195];
var strength_damage_map = [-2, 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55];
var move_action_map = [1, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
var bonus_action_map = [0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3];
var main_action_map = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3];

var game_state = { board_state: [], fog_state: [], zone_state: [], size: 0, search_modificator_state: [], terrain_effects: [], battle_mod: 0 };
var character_state = CHARACTER_STATE_CONSTANT;

var character_base = [];
var obstacle_base = [];

var gm_control_mod = 0; // normal mode

// in_process: 0 = nothing, 1 = move, 2 = attack, 3 = skill
var character_chosen = { in_process: 0, char_id: 0, char_position: 0, weapon_id: 0, skill_id: 0, cell: 0 };

var last_obstacle = 1;
var zone_endpoint = { index: -1, cell: 0 };

var gunshot_audio = new Audio('sounds/gunshot.mp3');
var sword_audio = new Audio('sounds/sword.wav');

gunshot_audio.volume = 0.2;
sword_audio.volume = 0.2;

function reconnect() {
  if (!_wsClient2.default.isReady()) {
    _wsClient2.default.init(SERVER_ADDRESS);
    _wsClient2.default.registerMessageHandlerDefault();
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

  for (var i = 0; i < game_state.size * game_state.size; i++) {
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
  _wsClient2.default.sendMessage(toSend);
}

function send_construct_command(new_game_state) {
  var toSend = {};
  toSend.command = 'construct_board';
  toSend.room_number = my_room;
  toSend.game_state = new_game_state;
  _wsClient2.default.sendMessage(toSend);
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
        zone_endpoint.index = index;
        zone_endpoint.cell = cell;
        cell.src = ZONE_ENDPOINT_PIC;
      } else {
        endpoint_assign_zone(index, zone_endpoint.index);
        zone_endpoint.cell.src = EMPTY_CELL_PIC;
        zone_endpoint.index = -1;
      }
    } else {
      var toSend = {};
      toSend.command = 'add_obstacle';
      toSend.cell_id = index;
      toSend.obstacle_number = last_obstacle;
      toSend.obstacle_name = obstacle_list[last_obstacle - 1];
      toSend.room_number = my_room;
      _wsClient2.default.sendMessage(toSend);
    }
  }
}

function ctrl_onclick(index) {
  if (my_role == 'gm') {
    var fog_value = game_state.fog_state[index];
    var mod = 1 - fog_value;
    var zone = game_state.zone_state[index];
    fogParseZone(mod, zone);
  }
}

function construct_board(new_game_state) {
  game_state.board_state = new_game_state.board_state;
  game_state.size = new_game_state.size;
  game_state.fog_state = new_game_state.fog_state;
  game_state.zone_state = new_game_state.zone_state;
  game_state.search_modificator_state = new_game_state.search_modificator_state;
  game_state.terrain_effects = new_game_state.terrain_effects;

  clear_containers();

  var board_container = document.getElementById("board-container");
  board_container.innerHTML = "";
  var board = document.createElement("table");
  board.className = "board";

  for (var i = 0; i < game_state.size; i++) {
    var row = document.createElement("tr");
    row.className = "board_row";
    for (var j = 0; j < game_state.size; j++) {
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
      button.onclick = function (event) {
        var cell = event.target;
        var index = cell.row * game_state.size + cell.column;

        if (event.shiftKey) {
          shift_onclick(index, cell);
        } else if (event.ctrlKey) {
          ctrl_onclick(index);
        } else {
          no_shift_onclick(my_role, gm_control_mod, game_state, character_chosen.in_process, cell, index);
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
  var size = game_state.size;

  var index_list = [];

  var coord1 = index_to_coordinates(endpoint1, size);
  var coord2 = index_to_coordinates(endpoint2, size);

  var top_left = top_left_coord(coord1, coord2);
  var bottom_right = bottom_right_coord(coord1, coord2);

  for (var i = top_left.x; i <= bottom_right.x; i++) {
    for (var j = top_left.y; j <= bottom_right.y; j++) {
      var coord = {};
      coord.x = i;
      coord.y = j;
      var index = coord_to_index(coord, size);

      index_list.push(index);
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
  _wsClient2.default.sendMessage(toSend);
}

function top_left_coord(coord1, coord2) {
  var toRet = {};
  toRet.x = Math.min(coord1.x, coord2.x);
  toRet.y = Math.min(coord1.y, coord2.y);
  return toRet;
}

function bottom_right_coord(coord1, coord2) {
  var toRet = {};
  toRet.x = Math.max(coord1.x, coord2.x);
  toRet.y = Math.max(coord1.y, coord2.y);
  return toRet;
}

function coord_to_index(coord, size) {
  var index = coord.x * size + coord.y;
  return index;
}

function assignZone(index) {
  var zone_number = zone_number_select.val();
  var modificator = search_modificator.val();

  var zone_text = document.getElementById('zone_text_' + index);
  zone_text.innerHTML = zone_number + '(' + modificator + ')';

  var index_list = [];
  index_list.push(index);

  var toSend = {};
  toSend.command = 'assign_zone';
  toSend.zone_number = zone_number;
  toSend.index_list = index_list;
  toSend.modificator = modificator;
  toSend.room_number = my_room;
  _wsClient2.default.sendMessage(toSend);
}

function fogOrPic(cell_id) {
  var picture_name = FOG_IMAGE;
  if (game_state.fog_state[cell_id] != 1 || my_role == 'gm') {
    var char_id = game_state.board_state[cell_id];
    if (character_state.invisibility[char_id] == "all" || character_state.invisibility[char_id] == my_name) {
      picture_name = get_object_picture(char_id);
    } else {
      picture_name = get_object_picture(0);
    }
  }
  return picture_name;
}

function standard_cell_onClick(index, cell, role) {
  if (game_state.board_state[index] == 0) {
    // empty cell clicked

    switch (character_chosen.in_process) {
      case 0:
        // nothing
        if (role == 'gm') {
          add_object(index);
        }
        break;
      case 1:
        // move
        move_character(index, cell);
        break;
      case 2:
        //attack
        stop_attack();
        break;
      case 3:
        //skill
        perform_skill(index, cell);
        break;
      default:
        console.log("Error resolving on_click empty");
    }
  } else if (game_state.board_state[index] > 0) {
    // character clicked
    switch (character_chosen.in_process) {
      case 0:
        // nothing
        select_character(index, cell);
        break;
      case 1:
        // move
        undo_selection();
        break;
      case 2:
        //attack
        perform_attack(index, cell);
        break;
      case 3:
        //skill
        perform_skill(index, cell);
        break;
      default:
        console.log("Error resolving on_click character");
    }
  } else {
    // obstacle clicked

    switch (character_chosen.in_process) {
      case 0:
        // nothing
        select_obstacle(index, cell);
        break;
      case 1:
        // move
        undo_selection();
        break;
      case 2:
        //attack
        stop_attack();
        break;
      case 3:
        //skill
        perform_skill(index, cell);
        break;
      default:
        console.log("Error resolving on_click obstacle");
    }
  }
}

function index_to_coordinates(index, size) {
  var toRet = {};
  toRet.x = Math.floor(index / size);
  toRet.y = index % size;
  return toRet;
}

function findDistance(index1, index2) {
  var x1 = Math.floor(index1 / game_state.size);
  var y1 = index1 % game_state.size;

  var x2 = Math.floor(index2 / game_state.size);
  var y2 = index2 % game_state.size;

  var distance_squared = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
  var distance = Math.sqrt(distance_squared);
  return Math.ceil(distance);
}

function isInRange(index1, index2, range) {
  var x1 = Math.floor(index1 / game_state.size);
  var y1 = index1 % game_state.size;

  var x2 = Math.floor(index2 / game_state.size);
  var y2 = index2 % game_state.size;

  var distance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
  return distance <= range * range;
}

function index_in_radius(index, range) {
  var size = game_state.size;
  var x = Math.floor(index / size);
  var y = index % size;
  var candidate_index_list = [];

  //console.log("x: " + x + " y: " + y + " index: " + index)

  for (var i = Math.floor(-1 * range); i <= Math.ceil(range); i++) {
    for (var j = Math.floor(-1 * range); j <= Math.ceil(range); j++) {
      var cand_x = x + i;
      var cand_y = y + j;
      //console.log("cand_x: " + cand_x + " cand_y: " + cand_y)
      if (cand_x >= 0 && cand_x < size && cand_y >= 0 && cand_y < size) {
        var cand_index = cand_x * size + cand_y;
        //console.log("cand_index: " + cand_index)
        if (isInRange(index, cand_index, range)) {
          //console.log("cand_index: " + cand_index + "was considered in range")
          candidate_index_list.push(cand_index);
        }
      }
    }
  }
  return candidate_index_list;
}

function roll_x(x) {
  return Math.floor(Math.random() * x) + 1;
}

function applyFog(index, cell) {
  if (game_state.fog_state[index] == 1) {
    // send update message
    var toSend = {};
    toSend.command = 'update_fog';
    toSend.update_type = 'remove';
    toSend.index = index;
    toSend.room_number = my_room;
    _wsClient2.default.sendMessage(toSend);
  } else {
    // send update message
    var toSend = {};
    toSend.command = 'update_fog';
    toSend.update_type = 'add';
    toSend.index = index;
    toSend.room_number = my_room;
    _wsClient2.default.sendMessage(toSend);
  }
}

function clear_containers() {
  character_info_container.html("");
  weapon_info_container.html("");
}

function tiny_animate_containers() {
  tiny_animation(character_info_container);
  tiny_animation(weapon_info_container);
}

function add_object(board_index) {
  clear_containers();

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
  character_info_container.append(button_container);

  tiny_animate_containers();
}

function tiny_animation(container) {
  container.addClass(TINY_EFFECT_CLASS);
  setTimeout(function () {
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
  _wsClient2.default.sendMessage(toSend);
}

function add_obstacle(board_index) {
  clear_containers();

  var select = document.createElement("select");
  select.id = "obstacle_chosen";
  select.className = "object_select";

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

    add_obstacle_command(button.board_index, obstacle_number);

    clear_containers();
  };

  character_info_container.append(select);
  character_info_container.append(button);
  tiny_animate_containers();
}

function add_character(board_index) {
  clear_containers();

  var select = document.createElement("select");
  select.id = "character_chosen";
  select.className = "object_select";

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
    toSend.room_number = my_room;
    _wsClient2.default.sendMessage(toSend);

    clear_containers(0);
  };

  character_info_container.append(select);
  character_info_container.append(button);
  tiny_animate_containers();
}

function move_character(to_index, to_cell) {
  character_chosen.in_process = 0; // end the motion
  var chosen_index = character_chosen.char_position;
  var chosen_character_index = character_chosen.char_id;

  var distance = findDistance(to_index, chosen_index);
  var max_distance = character_state.move_action[chosen_character_index];

  if (distance <= max_distance) {
    if (!(character_state.invisibility[chosen_character_index] != "all" && distance > 2)) {
      var toSend = {};
      toSend.command = 'move_character';
      toSend.from_index = chosen_index;
      toSend.to_index = to_index;
      toSend.character_number = chosen_character_index;
      toSend.character_avatar = character_detailed_info[chosen_character_index].avatar;
      toSend.room_number = my_room;
      toSend.distance = distance;
      toSend.left_shield = 0;

      if (character_state.special_effects[chosen_character_index].hasOwnProperty("force_field_target")) {
        var shield_index = character_state.special_effects[chosen_character_index].force_field_target.shield_index;
        if (!game_state.terrain_effects[shield_index].cells_protected.includes(to_index)) {
          // покинул зону защиты
          toSend.left_shield = 1;
          toSend.shield_index = shield_index;
        }
      }

      toSend.invisibility_ended_id = [];
      if (character_state.invisibility[chosen_character_index] != "all") {
        //user is invisible
        var immediate_nbh = index_in_radius(to_index, 1);
        for (var i = 0; i < immediate_nbh.length; i++) {
          if (game_state.board_state[immediate_nbh[i]] > 0 && game_state.board_state[immediate_nbh[i]] != chosen_character_index) {
            // there are characters there
            toSend.invisibility_ended_id.push(chosen_character_index);
            break;
          }
        }
        if (toSend.invisibility_ended_id.length == 0) {
          var extended_nbh = index_in_radius(to_index, invisibility_detection_radius);
          for (var _i = 0; _i < extended_nbh.length; _i++) {
            if (game_state.board_state[extended_nbh[_i]] > 0 && game_state.board_state[extended_nbh[_i]] != chosen_character_index) {
              // there are characters there
              var current_char_num = game_state.board_state[extended_nbh[_i]];
              var roll = roll_x(20) + parseInt(character_detailed_info[current_char_num].intelligence);
              if (roll > 10) {
                toSend.invisibility_ended_id.push(chosen_character_index);
                break;
              }
            }
          }
        }
      }

      var immediate_nbh = index_in_radius(to_index, 1);
      for (var _i2 = 0; _i2 < immediate_nbh.length; _i2++) {
        if (game_state.board_state[immediate_nbh[_i2]] > 0 && game_state.board_state[immediate_nbh[_i2]] != chosen_character_index) {
          // there are characters there
          if (character_state.invisibility[game_state.board_state[immediate_nbh[_i2]]] != "all") {
            toSend.invisibility_ended_id.push(game_state.board_state[immediate_nbh[_i2]]);
          }
        }
      }

      var extended_nbh = index_in_radius(to_index, invisibility_detection_radius);
      for (var _i3 = 0; _i3 < extended_nbh.length; _i3++) {
        if (game_state.board_state[extended_nbh[_i3]] > 0 && game_state.board_state[extended_nbh[_i3]] != chosen_character_index && !immediate_nbh.includes(extended_nbh[_i3])) {
          // there are characters there
          var current_char_num = game_state.board_state[extended_nbh[_i3]];
          if (character_state.invisibility[current_char_num] != "all") {
            var roll = roll_x(20) + parseInt(character_detailed_info[chosen_character_index].intelligence);
            if (roll > 10) {
              toSend.invisibility_ended_id.push(current_char_num);
            }
          }
        }
      }

      clear_containers();
      _wsClient2.default.sendMessage(toSend);

      character_chosen.char_position = to_index;
      var to_cell = document.getElementById('cell_' + to_index);
      character_chosen.cell = to_cell;
    } else {
      alert("В инвизе приходится красться (ходите по 1-2 клетки)");
      undo_selection();
    }
  } else {
    alert("Полегче, мсье Болт");
    undo_selection();
  }
}

function displayFog() {
  clear_containers();

  var info = document.createElement("p");
  info.innerHTML = 'Мы не знаем, что это такое. Если бы мы знали что это такое, но мы не знаем.';

  var fog_picture = document.createElement("IMG");
  fog_picture.src = QUESTION_IMAGE;
  fog_picture.style.width = '250px';
  fog_picture.style.height = '250px';

  character_info_container.append(info);
  character_info_container.append(fog_picture);

  tiny_animate_containers();
}

function delete_character(index, character_number) {
  clear_containers();
  var toSend = {};
  toSend.command = 'delete_character';
  toSend.room_number = my_room;
  toSend.index = index;
  toSend.character_number = character_number;
  _wsClient2.default.sendMessage(toSend);
}

function select_character(index, cell) {
  var character_number = game_state.board_state[index];

  if (character_state.invisibility[character_number] == "all" || character_state.invisibility[character_number] == my_name) {
    var character = character_detailed_info[character_number];

    character_chosen.char_id = character_number;
    character_chosen.char_position = index;
    character_chosen.cell = cell;

    var name = character.name;
    var avatar = character.avatar;

    clear_containers();

    var name_display = document.createElement("h2");
    name_display.innerHTML = name;

    var avatar_container = document.createElement("div");
    var avatar_display = document.createElement("IMG");
    avatar_display.src = avatar;
    avatar_display.style.width = '250px';
    avatar_display.style.height = '250px';

    avatar_container.appendChild(avatar_display);

    character_info_container.append(name_display);
    character_info_container.append(avatar_container);

    if (my_role == "gm" || character_state.visibility[character_number] == 1) {

      avatar_display.onmouseenter = function (event) {

        var main_action = character_state.main_action[character_number];
        var bonus_action = character_state.bonus_action[character_number];
        var move_action = character_state.move_action[character_number];

        var main_action_display = document.createElement("h2");
        main_action_display.id = "main_action_display";
        main_action_display.innerHTML = "Основных: " + main_action;

        var bonus_action_display = document.createElement("h2");
        bonus_action_display.id = "bonus_action_display";
        bonus_action_display.innerHTML = "Бонусных: " + bonus_action;

        var move_action_display = document.createElement("h2");
        move_action_display.id = "move_action_display";
        move_action_display.innerHTML = "Передвижение: " + move_action;

        weapon_info_container.append(main_action_display);
        weapon_info_container.append(bonus_action_display);
        weapon_info_container.append(move_action_display);
        weapon_info_container.show();
      };

      avatar_display.onmouseleave = function (event) {
        weapon_info_container.html("");
        weapon_info_container.hide();
      };

      var strength_display = document.createElement("h2");
      strength_display.innerHTML = "Cила: " + character.strength;

      var stamina_display = document.createElement("h2");
      stamina_display.innerHTML = "Телосложение: " + character.stamina;

      var agility_display = document.createElement("h2");
      agility_display.innerHTML = "Ловкость: " + character.agility;

      var intelligence_display = document.createElement("h2");
      intelligence_display.innerHTML = "Интеллект: " + character.intelligence;

      var KD_value = parseInt(character_state.KD_points[character_number]) + parseInt(character_state.bonus_KD[character_number]);
      var KD_display = document.createElement("h2");
      KD_display.innerHTML = "КД: " + KD_value;

      var hp_percent = parseFloat(character_state.HP[character_number]) / parseFloat(HP_values[character.stamina]);
      hp_percent = Math.floor(hp_percent * 100);

      var HP_display = document.createElement("h2");
      HP_display.id = "HP_display";
      HP_display.innerHTML = "ХП: " + character_state.HP[character_number] + " (" + hp_percent + "%)";

      var tired_percent = parseFloat(character_state.stamina[character_number]) / parseFloat(stamina_values[character.stamina]);
      tired_percent = Math.floor(tired_percent * 100);

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
      move_button.onclick = function (event) {
        var character_picked = event.target;
        var character_number = game_state.board_state[character_picked.index];
        var move_actions_left = character_state.move_action[character_number];
        if (move_actions_left > 0) {
          clear_containers();
          choose_character_to_move(character_picked.index, character_picked.cell);
        } else {
          alert("Вы потратили все перемещения на этом ходу!");
        }
      };

      if (my_role == "gm") {

        var delete_button = document.createElement("button");
        delete_button.innerHTML = "Уничтожить";
        delete_button.index = index;
        delete_button.cell = cell;
        delete_button.onclick = function (event) {
          delete_character(index, character_number);
        };

        var change_character_visibility_button = document.createElement("button");
        change_character_visibility_button.innerHTML = "Изменить видимость";
        change_character_visibility_button.onclick = function (event) {
          change_character_visibility(character_number);
        };

        var damage_button = document.createElement("button");
        damage_button.innerHTML = "Нанести урон";
        damage_button.index = index;
        damage_button.onclick = function (event) {
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
            _wsClient2.default.sendMessage(toSend);
          }
        };

        var damage_field = document.createElement("input");
        damage_field.id = "damage_field";
        damage_field.type = "number";
        damage_field.placeholder = "Значение урона";
      }

      var search_button = document.createElement("button");
      search_button.innerHTML = "Обыскать";
      search_button.index = index;
      search_button.onclick = function (event) {
        search_action(event.target);
      };

      var simple_roll_button = document.createElement("button");
      simple_roll_button.innerHTML = "Просто d20";
      simple_roll_button.onclick = function (event) {
        var roll = roll_x(20);
        var toSend = {};
        toSend.command = "simple_roll";
        toSend.character_name = character.name;
        toSend.room_number = my_room;
        toSend.roll = roll;
        _wsClient2.default.sendMessage(toSend);
      };

      var weapon_select = document.createElement("select");
      weapon_select.id = "weapon_chosen";

      var inventory = character.inventory;

      for (var i = 0; i < inventory.length; i++) {
        var current_option = document.createElement("option");
        current_option.innerHTML = weapon_list[inventory[i]];
        current_option.value = inventory[i];
        weapon_select.appendChild(current_option);
      }

      var pick_weapon_button = document.createElement("button");
      pick_weapon_button.innerHTML = "Сменить оружие";
      pick_weapon_button.index = index;
      pick_weapon_button.onclick = function (event) {
        var weapon_select = document.getElementById("weapon_chosen");
        var weapon_index = weapon_select.value;

        character_state.current_weapon[character_number] = weapon_index;
        character_chosen.weapon_id = weapon_index;

        var weapon = weapon_detailed_info[weapon_index];

        weapon_mini_display.src = weapon.avatar;
      };

      var default_weapon_index = character_state.current_weapon[character_number];
      character_chosen.weapon_id = default_weapon_index;
      var default_weapon = weapon_detailed_info[default_weapon_index];

      var weapon_mini_display = document.createElement("IMG");
      weapon_mini_display.id = "weapon_mini_display";
      weapon_mini_display.src = default_weapon.avatar;
      weapon_mini_display.style.width = '80px';
      weapon_mini_display.style.height = '80px';
      weapon_mini_display.onmouseenter = function (event) {
        var default_weapon_index = character_state.current_weapon[character_number];
        var default_weapon = weapon_detailed_info[default_weapon_index];

        var weapon_range_display = document.createElement("h2");
        weapon_range_display.id = "weapon_range_display";
        weapon_range_display.innerHTML = "Дальность: " + default_weapon.range;

        var weapon_damage_display = document.createElement("h2");
        weapon_damage_display.id = "weapon_damage_display";
        weapon_damage_display.innerHTML = "Урон: " + default_weapon.damage[0] + 'd' + default_weapon.damage[1];

        var weapon_name_display = document.createElement("h2");
        weapon_name_display.id = "weapon_name_display";
        weapon_name_display.innerHTML = default_weapon.name;

        var weapon_avatar_display = document.createElement("IMG");
        weapon_avatar_display.id = "weapon_avatar_display";
        weapon_avatar_display.src = default_weapon.avatar;
        weapon_avatar_display.style.width = '250px';
        weapon_avatar_display.style.height = '250px';

        weapon_info_container.append(weapon_name_display);
        weapon_info_container.append(weapon_avatar_display);
        weapon_info_container.append(weapon_range_display);
        weapon_info_container.append(weapon_damage_display);
        weapon_info_container.show();
      };

      weapon_mini_display.onmouseleave = function (event) {
        weapon_info_container.html("");
        weapon_info_container.hide();
      };

      avatar_container.append(weapon_mini_display);

      var attack_button = document.createElement("button");
      attack_button.innerHTML = "Атаковать";
      attack_button.onclick = function (event) {
        var main_actions_left = character_state.main_action[character_number];
        if (main_actions_left > 0) {
          choose_character_to_attack(cell);
        } else {
          alert("У вас не осталось действий!");
        }
      };

      var skill_select = document.createElement("select");
      skill_select.id = "skill_chosen";

      var skillset = character.skillset;

      for (var _i4 = 0; _i4 < skillset.length; _i4++) {
        var current_option = document.createElement("option");
        current_option.innerHTML = skill_list[skillset[_i4]];
        current_option.value = skillset[_i4];
        skill_select.appendChild(current_option);
      }

      var skill_button = document.createElement("button");
      skill_button.innerHTML = "Использовать умение";
      skill_button.onclick = function (event) {
        var skill_select = document.getElementById("skill_chosen");
        var skill_index = skill_select.value;
        use_skill(skill_index, character_number, index, cell);
      };

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

    tiny_animate_containers();
  }
}

function choose_character_to_attack(cell) {
  character_chosen.in_process = 2;
  cell.src = "./images/attack_placeholder.jpg";
}

function change_character_visibility(character_number) {
  var toSend = {};
  toSend.command = "change_character_visibility";
  toSend.character_number = character_number;
  toSend.room_number = my_room;

  if (character_state.visibility[character_number] == 0) {
    toSend.new_value = 1;
  } else {
    toSend.new_value = 0;
  }
  _wsClient2.default.sendMessage(toSend);
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
  _wsClient2.default.sendMessage(toSend);
}

function rollSearch(intelligence, mod) {
  return intelligence + roll_x(20) + mod;
}

function delete_object_command(index) {
  var toSend = {};
  toSend.command = 'delete_character';
  toSend.room_number = my_room;
  toSend.index = index;
  _wsClient2.default.sendMessage(toSend);
}

function delete_object(event) {
  clear_containers();

  delete_object_command(event.target.index);
}

function select_obstacle(index, cell) {
  clear_containers();
  var obstacle_id = game_state.board_state[index] * -1;
  var obstacle = obstacle_detailed_info[obstacle_id];

  // keep track of last chosen obstale to quickly add to the map
  last_obstacle = obstacle_id;

  var name = obstacle.name;
  var avatar = obstacle.avatar;

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
    delete_button.onclick = function (event) {
      delete_object(event);
    };
    character_info_container.append(delete_button);
  }

  tiny_animate_containers();
}

function choose_character_to_move(index, cell) {
  character_chosen.in_process = 1;
  character_chosen.char_position = index;
  character_chosen.char_id = game_state.board_state[index];
  cell.src = "./images/loading.webp";
}

function undo_selection() {
  character_chosen.in_process = 0;
  var old_cell = document.getElementById("cell_" + character_chosen.char_position);
  old_cell.src = character_detailed_info[character_chosen.char_id].avatar;
}

function stop_attack() {
  character_chosen.in_process = 0;
  var old_cell = document.getElementById("cell_" + character_chosen.char_position);
  old_cell.src = character_detailed_info[character_chosen.char_id].avatar;
}

function stop_skill() {
  character_chosen.in_process = 0;
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
    index_in_base = index_in_board_state * -1;
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
  _wsClient2.default.sendMessage(toSend);
}

function computeInitiative(agility) {
  return agility * 2 + roll_x(20);
}

function rollInitiative() {
  for (var i = 1; i < character_state.initiative.length; i++) {
    if (character_state.HP[i] > 0) {
      // so character i is present
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
  _wsClient2.default.sendMessage(toSend);
}

function fogModeChange() {
  if (gm_control_mod != 1) {
    // turn on fog adding mode
    gm_control_mod = 1;
    fog_button.text('Выкл Туман Войны');
    for (var i = 0; i < game_state.size * game_state.size; i++) {
      if (game_state.fog_state[i] == 1) {
        var current_cell = document.getElementById("cell_" + i);
        current_cell.src = FOG_IMAGE;
      }
    }
  } else {
    // turn off fog adding mode
    gm_control_mod = 0;
    fog_button.text('Вкл Туман Войны');
    for (var _i5 = 0; _i5 < game_state.size * game_state.size; _i5++) {
      if (game_state.fog_state[_i5] == 1) {
        var current_cell = document.getElementById("cell_" + _i5);
        current_cell.src = get_object_picture(game_state.board_state[_i5]);
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

    for (var i = 0; i < game_state.size * game_state.size; i++) {
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

    for (var _i6 = 0; _i6 < game_state.size * game_state.size; _i6++) {
      var current_zone_text = document.getElementById("zone_text_" + _i6);
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
  for (var i = 0; i < game_state.size * game_state.size; i++) {
    if (game_state.zone_state[i] == current_zone) {
      toSend.index = i;
      _wsClient2.default.sendMessage(toSend);
    }
  }
}

function pushToList(message) {
  for (var i = 1; i < CHAT_CASH; i++) {
    var element_to_copy = $('[data-name="notifications_list_element_' + i + '"]');
    var element_to_paste = $('[data-name="notifications_list_element_' + (i - 1) + '"]');

    element_to_paste.text(element_to_copy.text());
  }
  var top_element = $('[data-name="notifications_list_element_' + (CHAT_CASH - 1) + '"]');
  top_element.text(message);

  if (notifications_container.is(":hidden")) {
    chat_button.addClass("is-red");
  }
}

function changeChatVisibility() {
  if (chat_button.hasClass("is-red")) {
    chat_button.removeClass("is-red");
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
  var save_roll = [];

  for (var i = 1; i < character_state.can_evade.length; i++) {
    var character = character_detailed_info[i];
    if (character_state.special_effects[i] !== undefined && character_state.special_effects[i] !== null) {
      if (character_state.special_effects[i].hasOwnProperty("gas_bomb_poison")) {
        save_roll[i] = roll_x(20) + parseInt(character.stamina);
      }
    }
  }
  toSend.save_roll_list = save_roll;

  _wsClient2.default.sendMessage(toSend);
}

function roll_attack(type, attacker, target, advantage_bonus) {
  var advantage = 0;
  if (type == "ranged" || type == "energy") {
    advantage = character_state.ranged_advantage[attacker];
    if (character_state.special_effects[attacker].hasOwnProperty("adaptive_fighting")) {
      if (character_state.special_effects[attacker].adaptive_fighting == 0) {
        advantage = advantage + 1;
        console.log("Сработал рейнджовый стак универсальности");
      }
      character_state.special_effects[attacker].adaptive_fighting = 1;
    }
  } else if (type == "melee") {
    advantage = character_state.melee_advantage[attacker];
    if (character_state.special_effects[attacker].hasOwnProperty("adaptive_fighting")) {
      if (character_state.special_effects[attacker].adaptive_fighting == 1) {
        advantage = advantage + 1;
        console.log("Сработал милли стак универсальности");
      }
      character_state.special_effects[attacker].adaptive_fighting = 0;
    }
  }
  advantage = advantage - character_state.defensive_advantage[target] + advantage_bonus;

  var roll = 0;

  if (advantage >= 2) {
    // Дикое преимущество = 4 куба
    console.log("Дикое преимущество");
    var roll1 = roll_x(20);
    var roll2 = roll_x(20);
    var roll3 = roll_x(20);
    var roll4 = roll_x(20);
    roll = Math.max(roll1, roll2, roll3, roll4);
  } else if (advantage == 1) {
    console.log("Преимущество");
    var roll1 = roll_x(20);
    var roll2 = roll_x(20);
    roll = Math.max(roll1, roll2);
  } else if (advantage == 0) {
    roll = roll_x(20);
  } else if (advantage == -1) {
    console.log("Помеха");
    var roll1 = roll_x(20);
    var roll2 = roll_x(20);
    roll = Math.min(roll1, roll2);
  } else {
    console.log("Дикая помеха");
    var roll1 = roll_x(20);
    var roll2 = roll_x(20);
    var roll3 = roll_x(20);
    var roll4 = roll_x(20);
    roll = Math.min(roll1, roll2, roll3, roll4);
  }
  return roll;
}

function cover_mod(accumulated_cover) {
  var mod = {};
  mod.isPossible = true;
  mod.cover_level = accumulated_cover;
  switch (accumulated_cover) {
    case 0:
      mod.attack_bonus = 0;
      mod.advantage_bonus = 0;
      break;
    case 1:
      mod.attack_bonus = 0;
      mod.advantage_bonus = 0;
      break;
    case 2:
      mod.attack_bonus = -1;
      mod.advantage_bonus = 0;
      break;
    case 3:
      mod.attack_bonus = -2;
      mod.advantage_bonus = 0;
      break;
    case 4:
      mod.attack_bonus = -2;
      mod.advantage_bonus = -1;
      break;
    case 5:
      mod.attack_bonus = -3;
      mod.advantage_bonus = -1;
      break;
    case 6:
      mod.attack_bonus = -3;
      mod.advantage_bonus = -2;
      break;
    case 7:
      mod.attack_bonus = -4;
      mod.advantage_bonus = -2;
      break;
    case 8:
      mod.attack_bonus = -4;
      mod.advantage_bonus = -3;
      break;
    case 9:
      mod.attack_bonus = -5;
      mod.advantage_bonus = -3;
      break;
    default:
      mod.isPossible = false;
      break;
  }

  return mod;
}

function compute_cover(distance, cover) {
  var result = 0;
  if (distance < 0.15) {
    result = cover;
  } else if (distance < 0.3) {
    result = cover * 0.75;
  } else if (distance < 0.5) {
    result = cover * 0.5;
  } else if (distance < 0.65) {
    result = cover * 0.25;
  } else {
    result = 0;
  }

  return result;
}

function line_from_endpoints(point1, point2) {
  var line = {};
  line.a = -1 * (point1.y - point2.y);
  line.b = point1.x - point2.x;
  line.c = -1 * (line.a * point2.x + line.b * point2.y);
  return line;
}

function distance_to_line(endpoint1, endpoint2, size, testpoint) {
  var endpoint1_coord = index_to_coordinates(endpoint1, size);
  var endpoint2_coord = index_to_coordinates(endpoint2, size);
  var testpoint_coord = index_to_coordinates(testpoint, size);

  var line = line_from_endpoints(endpoint1_coord, endpoint2_coord);
  console.log(line);
  console.log(testpoint_coord);

  var distance = Math.abs(line.a * testpoint_coord.x + line.b * testpoint_coord.y + line.c) / Math.sqrt(line.a * line.a + line.b * line.b);

  console.log(distance);
  return distance;
}

function cells_on_line(endpoint1, endpoint2, size) {
  var endpoint1_coord = index_to_coordinates(endpoint1, size);
  var endpoint2_coord = index_to_coordinates(endpoint2, size);
  var line = line_from_endpoints(endpoint1_coord, endpoint2_coord);

  var scale = Math.max(Math.abs(line.a), Math.abs(line.b));
  // need to be reversed! remember line.a = delta y
  var x_step = line.b / scale;
  var y_step = -1 * line.a / scale;
  var current_point = endpoint2_coord;

  var safety_iter = 0;
  var candidate_cells = [];
  while (Math.abs(current_point.x - endpoint1_coord.x) > 0.5 || Math.abs(current_point.y - endpoint1_coord.y) > 0.5) {
    var ceil = {};
    ceil.x = Math.ceil(current_point.x);
    ceil.y = Math.ceil(current_point.y);
    var ceil_index = coord_to_index(ceil, size);

    var floor = {};
    floor.x = Math.floor(current_point.x);
    floor.y = Math.floor(current_point.y);
    var floor_index = coord_to_index(floor, size);

    candidate_cells.push(ceil_index);
    if (ceil_index != floor_index) {
      candidate_cells.push(floor_index);
    }

    current_point.x = current_point.x + x_step;
    current_point.y = current_point.y + y_step;
    safety_iter = safety_iter + 1;
    if (safety_iter > 50) {
      break;
    }
  }

  console.log(candidate_cells);
  return candidate_cells;
}

function perform_attack(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;

  var weapon = weapon_detailed_info[character_chosen.weapon_id];

  if (isInRange(index, user_position, weapon.range)) {

    var accumulated_cover = 0;
    var candidate_cells = cells_on_line(user_position, index, game_state.size);
    for (var i = 0; i < candidate_cells.length; i++) {
      var current_cell = candidate_cells[i];
      if (game_state.board_state[current_cell] < 0) {
        // это препятствие
        var obstacle = obstacle_detailed_info[Math.abs(game_state.board_state[current_cell])];
        var distance = distance_to_line(user_position, index, game_state.size, current_cell);
        accumulated_cover = accumulated_cover + compute_cover(distance, obstacle.cover);
      }
    }
    accumulated_cover = Math.ceil(accumulated_cover);
    var cover_modifier = cover_mod(accumulated_cover);

    var target_character_number = game_state.board_state[index];
    var target_character_KD = parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number]);
    var target_character = character_detailed_info[target_character_number];
    var attacking_character = character_detailed_info[user_character_number];

    var toSend = {};
    toSend.command = 'resolve_attack';
    toSend.room_number = my_room;
    toSend.attacker_id = user_character_number;
    toSend.attacker_position = user_position;
    toSend.target_id = target_character_number;
    toSend.attack_type = weapon.type;
    toSend.cover_level = cover_modifier.cover_level;

    if (cover_modifier.isPossible) {
      var attack_roll = roll_attack(weapon.type, user_character_number, target_character_number, cover_modifier.advantage_bonus);

      if (attack_roll < 20) {
        // no crit
        if (weapon.type == "ranged") {
          var cumulative_attack_roll = attack_roll + parseInt(attacking_character.intelligence);
        } else if (weapon.type == "melee") {
          var cumulative_attack_roll = attack_roll + parseInt(attacking_character.strength);
        } else if (weapon.type == "energy") {
          var cumulative_attack_roll = attack_roll + 2 * parseInt(attacking_character.intelligence);
        }

        var attack_bonus = character_state.attack_bonus[user_character_number];
        var universal_bonus = character_state.universal_bonus[user_character_number];

        cumulative_attack_roll = cumulative_attack_roll + attack_bonus + universal_bonus + cover_modifier.attack_bonus;

        toSend.attack_roll = cumulative_attack_roll;

        if (cumulative_attack_roll > target_character_KD) {
          // Есть пробитие
          if (character_state.can_evade[target_character_number] == 1) {
            var evade_roll = roll_x(20) + parseInt(target_character.agility) + character_state.universal_bonus[target_character_number];
            toSend.evade_roll = evade_roll;
            if (evade_roll > cumulative_attack_roll) {
              //succesfully evaded
              toSend.outcome = "evaded";
            } else {
              var damage_roll = compute_damage(weapon, user_character_number, attack_roll, target_character_number);
              toSend.damage_roll = damage_roll;
              toSend.outcome = "damage_after_evasion";
            }
          } else {
            var damage_roll = compute_damage(weapon, user_character_number, attack_roll, target_character_number);
            toSend.damage_roll = damage_roll;
            toSend.outcome = "damage_without_evasion";
          }
        } else {
          toSend.outcome = "KD_block";
        }
      } else {
        // full crit
        toSend.attack_roll = attack_roll;
        var damage_roll = compute_damage(weapon, user_character_number, attack_roll, target_character_number);
        toSend.damage_roll = damage_roll;
        toSend.outcome = "full_crit";
      }
    } else {
      toSend.outcome = "full_cover";
    }
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Далековато...");
  }
  stop_attack();
}

function compute_damage(weapon, character_number, attack_roll, target_number) {
  var damage = 0;
  var character = character_detailed_info[character_number];

  if (character.special_type == "sniper") {
    if (attack_roll < 16) {
      for (var i = 0; i < weapon.damage[0]; i++) {
        damage = damage + roll_x(weapon.damage[1]);
      }
      if (weapon.type == 'melee') {
        damage = damage + strength_damage_map[parseInt(character.strength)];
      }
      damage = damage + character_state.damage_bonus[character_number];
    } else {
      if (character_state.special_effects[target_number].hasOwnProperty("weakspot") && character_state.special_effects[target_number].weakspot.hunter_id == character_number) {
        switch (attack_roll) {
          case 18:
            damage = weapon.damage[1] * weapon.damage[0];
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)];
            }
            damage = damage + character_state.damage_bonus[character_number];
            damage = damage * 2;
            break;
          case 19:
            damage = weapon.damage[1] * weapon.damage[0];
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)];
            }
            damage = damage + character_state.damage_bonus[character_number];
            damage = damage * 2;
            break;
          case 20:
            damage = weapon.damage[1] * weapon.damage[0];
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)];
            }
            damage = damage + character_state.damage_bonus[character_number];
            damage = damage * 5;
            break;
          default:
            damage = weapon.damage[1] * weapon.damage[0];
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)];
            }
            damage = damage + character_state.damage_bonus[character_number];
        }
      } else {
        switch (attack_roll) {
          case 18:
            damage = weapon.damage[1] * weapon.damage[0];
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)];
            }
            damage = damage + character_state.damage_bonus[character_number];
            break;
          case 19:
            damage = weapon.damage[1] * weapon.damage[0];
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)];
            }
            damage = damage + character_state.damage_bonus[character_number];
            damage = damage * 2;
            break;
          case 20:
            damage = weapon.damage[1] * weapon.damage[0];
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)];
            }
            damage = damage + character_state.damage_bonus[character_number];
            damage = damage * 3;
            break;
          default:
            for (var _i7 = 0; _i7 < weapon.damage[0]; _i7++) {
              damage = damage + roll_x(weapon.damage[1]);
            }
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)];
            }
            damage = damage + character_state.damage_bonus[character_number];
        }
      }
    }
  } else {
    if (attack_roll < 19) {
      for (var _i8 = 0; _i8 < weapon.damage[0]; _i8++) {
        damage = damage + roll_x(weapon.damage[1]);
      }
    } else {
      damage = weapon.damage[1] * weapon.damage[0];
    }
    if (weapon.type == 'melee') {
      damage = damage + strength_damage_map[parseInt(character.strength)];
    }
    damage = damage + character_state.damage_bonus[character_number];

    if (attack_roll == 20) {
      damage = damage * 2;
    }
  }

  return damage;
}

function weak_spot(index, cell) {
  var target_character_number = game_state.board_state[index];
  var user_character_number = character_chosen.char_id;
  var attacking_character = character_detailed_info[user_character_number];

  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = character_chosen.skill_id;
  toSend.room_number = my_room;
  toSend.user_index = user_character_number;
  toSend.target_id = target_character_number;

  var int_check = roll_x(20) + parseInt(attacking_character.intelligence) + character_state.universal_bonus[user_character_number];
  if (int_check >= weak_spot_threshold) {
    toSend.outcome = "success";
  } else {
    toSend.outcome = "fail";
  }

  _wsClient2.default.sendMessage(toSend);
}

function heal(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  if (isInRange(index, user_position, heal_range)) {

    var target_character_number = game_state.board_state[index];
    var healer_character = character_detailed_info[user_character_number];
    var target_character = character_detailed_info[target_character_number];

    var target_hp = character_state.HP[target_character_number];
    var target_full_hp = HP_values[target_character.stamina];
    var ratio = parseFloat(target_hp) / parseFloat(target_full_hp);

    var heal_roll = roll_x(20) + parseInt(healer_character.intelligence) + character_state.universal_bonus[user_character_number];
    if (healer_character.special_type == "med") {
      heal_roll = heal_roll + parseInt(healer_character.intelligence);
    }
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_character_number;
    toSend.target_id = target_character_number;
    toSend.heal_roll = heal_roll;

    var threshold = 0;
    var critical_threshold = 0;

    if (ratio > 0.9) {
      threshold = 10;
      if (heal_roll > threshold) {
        toSend.outcome = "success";
        toSend.new_hp = target_full_hp;
      } else {
        toSend.outcome = "fail";
      }
    } else if (ratio > 0.75) {
      threshold = 15;
      critical_threshold = 25;
      if (heal_roll > threshold) {
        if (heal_roll > critical_threshold && healer_character.special_type == "med") {
          toSend.outcome = "critical success";
          toSend.new_hp = target_full_hp;
        } else {
          toSend.outcome = "success";
          toSend.new_hp = Math.floor(target_full_hp * 0.95);
        }
      } else {
        toSend.outcome = "fail";
      }
    } else if (ratio > 0.5) {
      threshold = 20;
      critical_threshold = 29;
      if (heal_roll > threshold) {
        if (heal_roll > critical_threshold && healer_character.special_type == "med") {
          toSend.outcome = "critical success";
          toSend.new_hp = Math.floor(target_full_hp * 0.95);
        } else {
          toSend.outcome = "success";
          toSend.new_hp = Math.floor(target_full_hp * 0.82);
        }
      } else {
        toSend.outcome = "fail";
      }
    } else if (ratio > 0.3) {
      threshold = 23;
      critical_threshold = 32;
      if (heal_roll > threshold) {
        if (heal_roll > critical_threshold && healer_character.special_type == "med") {
          toSend.outcome = "critical success";
          toSend.new_hp = Math.floor(target_full_hp * 0.82);
        } else {
          toSend.outcome = "success";
          toSend.new_hp = Math.floor(target_full_hp * 0.62);
        }
      } else {
        toSend.outcome = "fail";
      }
    } else if (ratio > 0.15) {
      threshold = 26;
      critical_threshold = 35;
      if (heal_roll > threshold) {
        if (heal_roll > critical_threshold && healer_character.special_type == "med") {
          toSend.outcome = "critical success";
          toSend.new_hp = Math.floor(target_full_hp * 0.62);
        } else {
          toSend.outcome = "success";
          toSend.new_hp = Math.floor(target_full_hp * 0.4);
        }
      } else {
        toSend.outcome = "fail";
      }
    } else if (ratio > 0.05) {
      threshold = 30;
      critical_threshold = 40;
      if (heal_roll > threshold) {
        if (heal_roll > critical_threshold && healer_character.special_type == "med") {
          toSend.outcome = "critical success";
          toSend.new_hp = Math.floor(target_full_hp * 0.4);
        } else {
          toSend.outcome = "success";
          toSend.new_hp = Math.floor(target_full_hp * 0.22);
        }
      } else {
        toSend.outcome = "fail";
      }
    } else {
      toSend.outcome = "fail";
    }

    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Нужно подойти ближе к цели чтобы вылечить");
  }
}

function big_bro(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  if (isInRange(index, user_position, big_bro_range)) {
    var target_character_number = game_state.board_state[index];

    var shield_KD = parseInt(character_state.KD_points[user_character_number]) + parseInt(character_state.bonus_KD[user_character_number]);
    var target_KD = parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number]);

    var bonus_KD = Math.max(shield_KD - target_KD, 0);

    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_character_number;
    toSend.target_id = target_character_number;
    toSend.bonus_KD = bonus_KD;
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Большой брат не достает до малого!");
  }
}

function damage_skill_template(target_pos, user_pos, range, user_id, skill_id, bonus_attack, weapon) {
  if (isInRange(target_pos, user_pos, range)) {

    var target_character_number = game_state.board_state[target_pos];
    var target_character_KD = parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number]);
    var target_character = character_detailed_info[target_character_number];
    var attacking_character = character_detailed_info[user_id];

    var accumulated_cover = 0;
    var candidate_cells = cells_on_line(user_pos, target_pos, game_state.size);
    for (var i = 0; i < candidate_cells.length; i++) {
      var current_cell = candidate_cells[i];
      if (game_state.board_state[current_cell] < 0) {
        // это препятствие
        var obstacle = obstacle_detailed_info[Math.abs(game_state.board_state[current_cell])];
        var distance = distance_to_line(user_pos, target_pos, game_state.size, current_cell);
        accumulated_cover = accumulated_cover + compute_cover(distance, obstacle.cover);
      }
    }
    accumulated_cover = Math.ceil(accumulated_cover);
    var cover_modifier = cover_mod(accumulated_cover);

    var attack_roll = roll_attack(weapon.type, user_id, target_character_number, cover_modifier.advantage_bonus);

    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_id;
    toSend.target_id = target_character_number;

    if (attack_roll < 20) {
      // no crit
      var cumulative_attack_roll = attack_roll + bonus_attack;

      toSend.attack_roll = cumulative_attack_roll;

      if (cumulative_attack_roll > target_character_KD) {
        // Есть пробитие
        if (character_state.can_evade[target_character_number] == 1) {
          var evade_roll = roll_x(20) + parseInt(target_character.agility) + character_state.universal_bonus[target_character_number];
          toSend.evade_roll = evade_roll;
          if (evade_roll > cumulative_attack_roll) {
            //succesfully evaded
            toSend.outcome = "evaded";
          } else {
            var damage_roll = compute_damage(weapon, user_id, attack_roll, target_character_number);
            toSend.damage_roll = damage_roll;
            toSend.outcome = "damage_after_evasion";
          }
        } else {
          var damage_roll = compute_damage(weapon, user_id, attack_roll, target_character_number);
          toSend.damage_roll = damage_roll;
          toSend.outcome = "damage_without_evasion";
        }
      } else {
        toSend.outcome = "KD_block";
      }
    } else {
      // full crit
      toSend.attack_roll = attack_roll;
      var damage_roll = compute_damage(weapon, user_id, attack_roll, target_character_number);
      toSend.damage_roll = damage_roll;
      toSend.outcome = "full_crit";
    }
    return toSend;
  } else {
    return null;
  }
}

// increase attack roll by agility bonus (2*mod)
function cut_limbs(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]];
  if (weapon.type == "melee") {
    var attacking_character = character_detailed_info[user_character_number];
    var bonus_attack = 2 * parseInt(attacking_character.agility) + character_state.attack_bonus[user_character_number] + character_state.universal_bonus[user_character_number];

    var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon);
    if (toSend == null) {
      alert("Далековато");
    } else {
      if (toSend.outcome == "damage_after_evasion" || toSend.outcome == "damage_without_evasion" || toSend.outcome == "full_crit") {
        var damage_roll = toSend.damage_roll;
        var flat_damage = damage_roll - strength_damage_map[parseInt(attacking_character.strength)] - character_state.damage_bonus[user_character_number];
        var full_damage = weapon.damage[1] * weapon.damage[0];
        if (flat_damage > full_damage / 3) {
          toSend.skill_outcome = "success";
        } else {
          toSend.skill_outcome = "fail";
        }
      } else {
        toSend.skill_outcome = "fail";
      }
      _wsClient2.default.sendMessage(toSend);
    }
  } else {
    alert("Вы не можете подрезать сухожилья этим оружием");
  }
}

function punch_rainfall(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]];
  if (weapon.type == "melee") {
    var attacking_character = character_detailed_info[user_character_number];
    var target_char_id = game_state.board_state[index];
    var target_character = character_detailed_info[target_char_id];
    var bonus_attack = parseInt(attacking_character.agility) + character_state.attack_bonus[user_character_number] + character_state.universal_bonus[user_character_number];

    var total_damage = 0;
    var attacks_successful = 0;
    for (var i = 0; i < character_state.main_action[user_character_number]; i++) {
      var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon);
      if (toSend == null) {
        alert("Далековато");
        return;
      } else {
        if (toSend.outcome == "damage_after_evasion" || toSend.outcome == "damage_without_evasion" || toSend.outcome == "full_crit") {
          attacks_successful = attacks_successful + 1;
          total_damage = total_damage + toSend.damage_roll;
          character_state.can_evade[target_char_id] = 0;
        } else if (toSend.outcome == "evaded" && target_character.special_type != "rogue") {
          character_state.can_evade[target_char_id] = 0;
        }
      }
    }

    var multiplyer = 1.0 + parseFloat(attacks_successful - 1) / 2.0;
    var message = "Множитель града был: " + multiplyer;
    console.log(message);
    var final_damage = parseInt(parseFloat(total_damage) * multiplyer);

    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_character_number;
    toSend.target_id = target_char_id;
    toSend.total_attacks = character_state.main_action[user_character_number];
    toSend.successfull_attacks = attacks_successful;
    toSend.damage = final_damage;
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Град ударов можно соврешить только рукопашным оружием!");
  }
}

function shock_wave(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]];
  var attacking_character = character_detailed_info[user_character_number];
  var bonus_attack = parseInt(attacking_character.intelligence) + character_state.attack_bonus[user_character_number] + character_state.universal_bonus[user_character_number];

  var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon);
  if (toSend == null) {
    alert("Далековато");
  } else {
    if (toSend.outcome == "damage_after_evasion" || toSend.outcome == "damage_without_evasion" || toSend.outcome == "full_crit") {
      toSend.skill_outcome = "success";
    } else {
      toSend.skill_outcome = "fail";
    }
    _wsClient2.default.sendMessage(toSend);
  }
}

function devour(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  if (isInRange(index, user_position, 1)) {
    var target_character_number = game_state.board_state[index];
    var stacks = 0;
    if (character_state.special_effects[target_character_number].hasOwnProperty("Markus_stacks")) {
      stacks = character_state.special_effects[target_character_number].Markus_stacks;
    }
    var damage = stacks * 5 + roll_x(10);
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_character_number;
    toSend.target_id = target_character_number;
    toSend.damage = damage;
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Далековато");
  }
}

function absolute_recovery(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  if (isInRange(index, user_position, 1)) {
    var target_character_number = game_state.board_state[index];
    var heal_amount = 0;

    var damage_field = document.getElementById("damage_field");
    if (!(damage_field.value === "")) {
      heal_amount = parseInt(damage_field.value);
    }

    var biopool = 0;
    if (character_state.special_effects[user_character_number].hasOwnProperty("biopool")) {
      biopool = character_state.special_effects[user_character_number].biopool;
    }

    if (heal_amount > 0 && biopool >= heal_amount) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id;
      toSend.room_number = my_room;
      toSend.user_index = user_character_number;
      toSend.target_id = target_character_number;
      toSend.heal_amount = heal_amount;
      _wsClient2.default.sendMessage(toSend);
    } else {
      alert("Невозможное значение лечения");
    }
  } else {
    alert("Далековато");
  }
}

function gas_bomb(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var character = character_detailed_info[user_character_number];
  var throw_range = throw_base_range + parseInt(character.strength) * 2;
  if (isInRange(index, user_position, throw_range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_character_number;
    toSend.position = index;
    toSend.threshold = gas_bomb_threshold;
    _wsClient2.default.sendMessage(toSend);

    add_obstacle_command(index, gas_bomb_obstacle);
  } else {
    alert("Мало каши ели для такого броска");
  }
}

function light_sound_bomb(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;

  if (isInRange(index, user_position, light_sound_bomb_range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_character_number;
    toSend.position = index;

    var character_list = [];
    var outcome_list = [];

    var radius = light_sound_bomb_radius;

    var candidate_cells = index_in_radius(index, radius);
    console.log(candidate_cells);
    for (var i = 0; i < candidate_cells.length; i++) {
      var target_character_number = game_state.board_state[candidate_cells[i]];
      if (target_character_number > 0) {
        // персонаж в радиусе бомбы
        var character = character_detailed_info[target_character_number];
        if (character.special_type !== "drone") {
          character_list.push(target_character_number);
          var save_roll = roll_x(20) + character_state.universal_bonus[target_character_number] + parseInt(character.intelligence);
          if (save_roll > light_sound_bomb_threshold) {
            outcome_list.push(0);
          } else {
            outcome_list.push(1);
          }
        }
      }
    }
    toSend.character_list = character_list;
    toSend.outcome_list = outcome_list;

    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Дрон не докинет");
  }
}

function force_field(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;

  if (isInRange(index, user_position, force_field_range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_character_number;
    toSend.position = index;

    var user = character_detailed_info[user_character_number];

    var shield = Math.ceil(parseFloat(HP_values[user.stamina]) / 2);
    toSend.shield = shield;

    var character_list = [];

    var radius = force_field_radius;

    var candidate_cells = index_in_radius(index, radius);
    for (var i = 0; i < candidate_cells.length; i++) {
      var target_character_number = game_state.board_state[candidate_cells[i]];
      if (target_character_number > 0) {
        // персонаж в радиусе щита
        character_list.push(target_character_number);
      }
    }
    toSend.cells_protected = candidate_cells;
    toSend.character_list = character_list;
    _wsClient2.default.sendMessage(toSend);

    add_obstacle_command(index, force_field_obstacle);
  } else {
    alert("Генератор должен быть установлен поближе");
  }
}

function adrenaline(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;

  var target_number = game_state.board_state[index];
  var adrenaline_range = 1;
  if (isInRange(index, user_position, adrenaline_range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.room_number = my_room;
    toSend.skill_index = character_chosen.skill_id;
    toSend.user_index = user_character_number;
    toSend.target_index = target_number;
    var extra_actions = roll_x(4);
    var minus_actions = roll_x(4);
    toSend.extra_actions = extra_actions;
    toSend.minus_actions = minus_actions;
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Далековато");
  }
}

function pich_pich_go(index, cell) {
  var user_character_number = character_chosen.char_id;

  var user = character_detailed_info[user_character_number];
  var target_number = game_state.board_state[index];
  var target = character_detailed_info[target_number];
  if (target.special_type == "drone") {
    var toSend = {};
    toSend.command = 'skill';
    toSend.room_number = my_room;
    toSend.skill_index = character_chosen.skill_id;
    toSend.user_index = user_character_number;
    toSend.target_index = target_number;
    var extra_actions = Math.ceil(parseFloat(user.intelligence) / 2);
    toSend.extra_actions = extra_actions;
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Вы не можете пыщ-пыщ кого попало!");
  }
}

function lucky_shot(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var target_character_number = game_state.board_state[index];
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]];

  if (isInRange(index, user_position, weapon.range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_character_number;
    toSend.target_id = target_character_number;
    toSend.roll = roll_x(10);
    if (toSend.roll == 7) {
      toSend.damage = roll_x(7);
    }
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Далековато");
  }
}

function lottery_shot(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var target_character_number = game_state.board_state[index];
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]];

  if (isInRange(index, user_position, weapon.range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_character_number;
    toSend.target_id = target_character_number;
    toSend.roll = roll_x(100);
    if (toSend.roll == 7) {
      var damage = 0;
      for (var i = 0; i < 7; i++) {
        damage = damage + roll_x(7);
      }
      toSend.damage = damage;
    } else if (toSend.roll == 77) {
      var damage = 0;
      for (var _i9 = 0; _i9 < 14; _i9++) {
        damage = damage + roll_x(7);
      }
      toSend.damage = damage;
    }
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Далековато");
  }
}

function perform_skill(index, cell) {
  switch (character_chosen.skill_id) {
    case 1:
      adrenaline(index, cell);
      stop_skill();
      break;
    case 2:
      // Подрезать сухожилия
      cut_limbs(index, cell);
      stop_skill();
      break;
    case 3:
      // Слабое место
      weak_spot(index, cell);
      stop_skill();
      break;
    case 4:
      // Лечение
      heal(index, cell);
      stop_skill();
      break;
    case 5:
      // Лечение
      big_bro(index, cell);
      stop_skill();
      break;
    case 7:
      // пожирание
      devour(index, cell);
      stop_skill();
      break;
    case 9:
      absolute_recovery(index, cell);
      stop_skill();
      break;
    case 12:
      gas_bomb(index, cell);
      stop_skill();
      break;
    case 13:
      light_sound_bomb(index, cell);
      stop_skill();
      break;
    case 14:
      shock_wave(index, cell);
      stop_skill();
      break;
    case 15:
      pich_pich_go(index, cell);
      stop_skill();
      break;
    case 16:
      force_field(index, cell);
      stop_skill();
      break;

    case 19:
      lucky_shot(index, cell);
      stop_skill();
      break;

    case 20:
      lottery_shot(index, cell);
      stop_skill();
      break;

    case 22:
      punch_rainfall(index, cell);
      stop_skill();
      break;

    default:
      alert("Unknown targeted skill");
  }
}

function use_skill(skill_index, character_number, position, cell) {
  skill_index = parseInt(skill_index);
  switch (skill_index) {
    case 0:
      //Рывок
      if (character_state.bonus_action[character_number] > 0) {
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index;
        toSend.user_index = character_number;
        _wsClient2.default.sendMessage(toSend);
      } else {
        alert("Не хватает действий!");
      }
      break;
    case 1:
      //Прилив Адреналина
      if (character_state.special_effects[character_number].hasOwnProperty("adrenaline_user")) {
        alert("Умение все еще на кулдауне");
      } else {
        choose_character_skill(skill_index, character_number, position, cell);
      }
      break;
    case 2:
      // Подрезать сухожилия
      if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell);
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 3:
      // Слабое место
      if (character_state.bonus_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell);
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 4:
      // Лечение
      if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell);
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 5:
      // Большой брат
      if (character_state.bonus_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell);
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 6:
      // Поднять щиты
      if (character_state.main_action[character_number] > 0) {
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index;
        toSend.user_index = character_number;

        if (character_state.special_effects[character_number].hasOwnProperty("shield_up")) {
          toSend.outcome = "shield_down";
        } else {
          toSend.outcome = "shield_up";
        }
        _wsClient2.default.sendMessage(toSend);
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 7:
      // пожирание сущности
      if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell);
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 8:
      // узнать биопул
      if (character_state.special_effects[character_number].hasOwnProperty("biopool")) {
        alert("Накопленный биопул: " + character_state.special_effects[character_number].biopool);
      } else {
        alert("Накопленный биопул отсутствует");
      }
      break;

    case 9:
      // безупречное восстановление
      if (character_state.bonus_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell);
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 10:
      // обычное в бонусное
      if (character_state.main_action[character_number] > 0) {
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index;
        toSend.user_index = character_number;
        _wsClient2.default.sendMessage(toSend);
      } else {
        alert("Не хватает основных действий, чтобы превратить в бонусные!");
      }
      break;

    case 11:
      // отдых
      if (character_state.has_moved[character_number] == 0) {
        var new_stamina = Math.min(character_state.stamina[character_number] + rest_stamina_gain, stamina_values[character_detailed_info[character_number].stamina]);
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index;
        toSend.new_stamina = new_stamina;
        toSend.user_index = character_number;
        _wsClient2.default.sendMessage(toSend);
      } else {
        alert("Вы уже совершали действия на этом ходу, так что не можете отдохнуть");
      }
      break;

    case 12:
      // газовая граната
      if (!character_state.special_effects[character_number].hasOwnProperty("gas_bomb_user")) {
        if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell);
        } else {
          alert("Не хватает действий!");
        }
      } else {
        alert("У гранаты кулдаун (газ эээ заваривается, хз)");
      }
      break;
    case 13:
      // светошумовая граната
      if (!character_state.special_effects[character_number].hasOwnProperty("light_sound_bomb_user")) {
        if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell);
        } else {
          alert("Не хватает действий!");
        }
      } else {
        alert("Граната еще не готова");
      }
      break;
    case 14:
      // Шоковый импульс
      if (character_state.main_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell);
      } else {
        alert("Не хватает действий!");
      }
      break;
    case 15:
      // Пыщ-пыщ-го
      if (!character_state.special_effects[character_number].hasOwnProperty("pich_pich_user")) {
        if (character_state.bonus_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell);
        } else {
          alert("Не хватает действий!");
        }
      } else {
        alert("Пыщ пыщ еще на перезарядке!");
      }
      break;

    case 16:
      // Силовое поле
      if (!character_state.special_effects[character_number].hasOwnProperty("force_field_user")) {
        if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell);
        } else {
          alert("Не хватает действий!");
        }
      } else {
        alert("Генератор силового поля еще не зарядился!");
      }
      break;

    case 17:
      // Инвиз
      if (character_state.bonus_action[character_number] > 0) {
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index;
        toSend.user_index = character_number;
        toSend.username = my_name;
        toSend.position = position;
        _wsClient2.default.sendMessage(toSend);
      } else {
        alert("Не хватает действий!");
      }
      break;
    case 18:
      // Боевая универсальность
      var toSend = {};
      toSend.command = 'skill';
      toSend.room_number = my_room;
      toSend.skill_index = skill_index;
      toSend.user_index = character_number;
      _wsClient2.default.sendMessage(toSend);
      break;

    case 19:
      // Лаки шот
      if (character_state.bonus_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell);
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 20:
      // Лотерейный выстрел
      if (character_state.bonus_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell);
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 21:
      //Прилив действий
      if (character_state.special_effects[character_number].hasOwnProperty("action_splash")) {
        alert("Умение все еще на кулдауне");
      } else {
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index;
        toSend.user_index = character_number;
        toSend.extra_actions = character_state.bonus_action[character_number];
        _wsClient2.default.sendMessage(toSend);
      }
      break;

    case 22:
      // град ударов
      if (character_state.main_action[character_number] > 1) {
        choose_character_skill(skill_index, character_number, position, cell);
      } else {
        alert("Для града ударов требуется больше 1 основного действия!");
      }
      break;

    default:
      alert("Не знаем это умение");
  }
}

function choose_character_skill(skill_index, character_number, position, cell) {
  character_chosen.in_process = 3;
  character_chosen.skill_id = skill_index;
  character_chosen.char_id = character_number;
  character_chosen.char_position = position;
  cell.src = "./images/Chidori.webp";
}

function apply_bomb(position, radius) {
  var candidate_cells = index_in_radius(position, radius);
  console.log(candidate_cells);
  for (var i = 0; i < candidate_cells.length; i++) {
    var target_character_number = game_state.board_state[candidate_cells[i]];
    if (target_character_number > 0) {
      // персонаж в радиусе бомбы
      var character = character_detailed_info[target_character_number];
      var message = character.name + " попадает под действие газовой бомбы";
      pushToList(message);
      if (character_state.special_effects[target_character_number].hasOwnProperty("gas_bomb_poison")) {
        character_state.special_effects[target_character_number].gas_bomb_poison.poison_level = character_state.special_effects[target_character_number].gas_bomb_poison.poison_level + 1;
      } else {
        var gas_bomb_poison_object = {};
        gas_bomb_poison_object.poison_level = 1;
        gas_bomb_poison_object.threshold = gas_bomb_threshold;
        character_state.special_effects[target_character_number].gas_bomb_poison = gas_bomb_poison_object;
      }
      character_state.move_action[target_character_number] = character_state.move_action[target_character_number] - gas_bomb_move_reduction;
      character_state.main_action[target_character_number] = character_state.main_action[target_character_number] - 1;
    }
  }
}

function shocked_effect(target) {
  if (!character_state.special_effects[target].hasOwnProperty("shocked")) {
    var shocked_object = {};
    shocked_object.cooldown = shocked_cooldown;
    character_state.special_effects[target].shocked = shocked_object;
    character_state.defensive_advantage[target] = character_state.defensive_advantage[target] - 1;
  } else {
    character_state.special_effects[target].shocked.cooldown = shocked_cooldown;
  }
}

function melee_penalty(data) {
  if (data.attack_type == "melee") {
    if (!character_state.special_effects[data.target_id].hasOwnProperty("meleed")) {
      // иначе эффект уже наложен, не повторяем
      character_state.ranged_advantage[data.target_id] = character_state.ranged_advantage[data.target_id] - 1;
      var meleed_object = {};
      meleed_object.cooldown = 0;
      character_state.special_effects[data.target_id].meleed = meleed_object;
    }
    if (character_state.has_moved[data.target_id] == 1) {
      var cooldown = 1;
    } else {
      var cooldown = 0;
    }
    character_state.special_effects[data.target_id].meleed.cooldown = cooldown;
  }
}

function do_damage(character_number, damage) {
  if (!character_state.special_effects[character_number].hasOwnProperty("force_field_target")) {
    character_state.HP[character_number] = character_state.HP[character_number] - damage;
  } else {
    var shield_index = character_state.special_effects[character_number].force_field_target.shield_index;
    game_state.terrain_effects[shield_index].shield = game_state.terrain_effects[shield_index].shield - damage;
    var message = "Щит принял урон на себя! Оставшаяся прочность: " + game_state.terrain_effects[shield_index].shield;
    pushToList(message);
    if (game_state.terrain_effects[shield_index].shield <= 0) {
      // щит уничтожен
      var message = "Press F Щиту...";
      pushToList(message);
      var char_list = game_state.terrain_effects[shield_index].character_list;
      for (var i = 0; i < char_list.length; i++) {
        var character_number = char_list[i];
        delete character_state.special_effects[character_number].force_field_target;
      }
      delete_object_command(game_state.terrain_effects[shield_index].position);
      delete game_state.terrain_effects[shield_index];
    }
  }
}

function change_battle_mod() {
  if (game_state.battle_mod == 1) {
    var new_value = 0;
  } else {
    var new_value = 1;
  }

  var toSend = {};
  toSend.command = 'battle_mod';
  toSend.room_number = my_room;
  toSend.value = new_value;
  _wsClient2.default.sendMessage(toSend);
}

// {board_state: [], HP_state: [], initiative_state: [], fog_state: [], zone_state: [], size: 0, search_modificator_state: []};
function mirror_board() {
  var left_index;
  var right_index;
  var temp;
  var left_cell;
  var right_cell;
  for (var y = 0; y < game_state.size; y++) {
    for (var x = 0; x < game_state.size / 2; x++) {

      left_index = y * game_state.size + x;
      right_index = y * game_state.size + parseInt(game_state.size) - x - 1;
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
  _wsClient2.default.sendMessage(toSend);
}

function clear_character_state() {
  character_state = CHARACTER_STATE_CONSTANT;
}

function clear_character(number) {
  //character_detailed_info[number] = null
  character_state.HP[number] = null;
  character_state.main_action[number] = null;
  character_state.bonus_action[number] = null;
  character_state.move_action[number] = null;
  character_state.stamina[number] = null;
  character_state.initiative[number] = null;
  character_state.can_evade[number] = null;
  character_state.has_moved[number] = null;
  character_state.KD_points[number] = null;
  character_state.current_weapon[number] = null;
  character_state.visibility[number] = null;
  character_state.attack_bonus[number] = null;
  character_state.damage_bonus[number] = null;
  character_state.universal_bonus[number] = null;
  character_state.bonus_KD[number] = null;
  character_state.special_effects[number] = {};
  character_state.ranged_advantage[number] = null;
  character_state.melee_advantage[number] = null;
  character_state.defensive_advantage[number] = null;
}

function w_onclick() {
  if (character_chosen.in_process == 1) {
    undo_selection();
  } else {
    var index = character_chosen.char_position;
    var cell = character_chosen.cell;
    choose_character_to_move(index, cell);
  }
}

function a_onclick() {
  if (character_chosen.in_process == 2) {
    stop_attack();
  } else {
    var character_number = character_chosen.char_id;
    var cell = character_chosen.cell;
    var main_actions_left = character_state.main_action[character_number];
    if (main_actions_left > 0) {
      choose_character_to_attack(cell);
    } else {
      alert("У вас не осталось действий!");
    }
  }
}

//socket.init('ws://localhost:3001');
_wsClient2.default.init(SERVER_ADDRESS);

_wsClient2.default.registerOpenHandler(function () {
  var toSend = {};
  toSend.command = 'player_info';
  toSend.room_number = my_room;
  toSend.from_name = my_name;
  toSend.role = my_role;
  if (my_role == 'gm') {
    toSend.password = JSON.parse(sessionStorage.getItem('gm_password'));
  }
  _wsClient2.default.sendMessage(toSend);
});

_wsClient2.default.registerMessageHandler(function (data) {
  //console.log(data);
  if ((data.to_name == my_name || data.to_name == 'all') && data.room_number == my_room) {
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
          if (keyCode == 81) {
            fogModeChange();
          } else if (keyCode == 87) {
            // w
            w_onclick();
          } else if (keyCode == 65) {
            // a
            a_onclick();
          }
        };
      }
      character_list = data.character_list;
      obstacle_list = data.obstacle_list;
      weapon_list = data.weapon_list;
      weapon_detailed_info = data.weapon_detailed_info;
      skill_list = data.skill_list;
    } else if (data.command == 'construct_board_response') {
      clear_character_state();
      construct_board(data.game_state);
    } else if (data.command == 'add_character_response') {
      var character = data.character_info;
      character_detailed_info[data.character_number] = character;
      if (!(my_role == 'player' && game_state.fog_state[data.cell_id] == 1)) {
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
      character_state.invisibility[data.character_number] = "all";
      character_state.current_weapon[data.character_number] = character.inventory[0];
      character_state.attack_bonus[data.character_number] = 0;
      character_state.damage_bonus[data.character_number] = 0;
      character_state.universal_bonus[data.character_number] = 0;
      character_state.ranged_advantage[data.character_number] = 0;
      character_state.melee_advantage[data.character_number] = 0;
      character_state.defensive_advantage[data.character_number] = 0;
      character_state.special_effects[data.character_number] = {};
      character_state.position[data.character_number] = data.cell_id;
    } else if (data.command == 'add_obstacle_response') {
      var obstacle = data.obstacle_info;
      obstacle_detailed_info[data.obstacle_number] = obstacle;
      if (!(my_role == 'player' && game_state.fog_state[data.cell_id] == 1)) {
        var cell = document.getElementById("cell_" + data.cell_id);
        cell.src = obstacle.avatar;
      }
      game_state.board_state[data.cell_id] = data.obstacle_number * -1;
    } else if (data.command == 'move_character_response') {
      var to_index = data.to_index;
      var from_index = data.from_index;
      game_state.board_state[to_index] = data.character_number;
      character_state.position[data.character_number] = to_index;

      for (var i = 0; i < data.invisibility_ended_id.length; i++) {
        var id = data.invisibility_ended_id[i];
        character_state.invisibility[id] = "all";

        var position = character_state.position[id];
        var to_cell = document.getElementById('cell_' + position);
        var avatar = character_detailed_info[id].avatar;
        to_cell.src = avatar;
      }

      // remove shielded property from character and remove character from shielded list
      if (data.left_shield == 1) {
        delete character_state.special_effects[data.character_number].force_field_target;
        var index = game_state.terrain_effects[data.shield_index].character_list.indexOf(data.character_number);
        if (index !== -1) {
          game_state.terrain_effects[data.shield_index].character_list.splice(index, 1);
        }
      }

      character_state.has_moved[data.character_number] = 1;

      if (game_state.battle_mod == 1) {
        character_state.stamina[data.character_number] = character_state.stamina[data.character_number] - stamina_move_cost;
        character_state.move_action[data.character_number] = character_state.move_action[data.character_number] - data.distance;
        var character = character_detailed_info[data.character_number];
        if (character.special_type == "sniper") {
          var effects_object = character_state.special_effects[data.character_number];
          if (effects_object.hasOwnProperty("sniper_passive")) {
            var current_attack_bonus = effects_object.sniper_passive.attack_bonus;
            var current_damage_bonus = effects_object.sniper_passive.damage_bonus;
            character_state.attack_bonus[data.character_number] = character_state.attack_bonus[data.character_number] - current_attack_bonus - 5;
            character_state.damage_bonus[data.character_number] = character_state.damage_bonus[data.character_number] - current_damage_bonus;
            character_state.special_effects[data.character_number].sniper_passive.attack_bonus = -5;
            character_state.special_effects[data.character_number].sniper_passive.damage_bonus = 0;
          } else {
            var sniper_passive_object = {};
            sniper_passive_object.attack_bonus = -5;
            sniper_passive_object.damage_bonus = 0;
            character_state.special_effects[data.character_number].sniper_passive = sniper_passive_object;
            character_state.attack_bonus[data.character_number] = character_state.attack_bonus[data.character_number] - 5;
          }
        }
      }

      if (!(my_role == 'player' && game_state.fog_state[to_index] == 1 || character_state.invisibility[data.character_number] != "all" && character_state.invisibility[data.character_number] != my_name)) {
        var to_cell = document.getElementById('cell_' + to_index);
        to_cell.src = data.character_avatar;
      }

      game_state.board_state[from_index] = 0;
      if (!(my_role == 'player' && game_state.fog_state[from_index] == 1)) {
        var old_cell = document.getElementById("cell_" + from_index);
        old_cell.src = EMPTY_CELL_PIC;
      }
    } else if (data.command == 'delete_character_response') {
      if (data.hasOwnProperty("character_number")) {
        clear_character(data.character_number);
      }
      game_state.board_state[data.index] = 0;
      if (!(my_role == 'player' && game_state.fog_state[data.index] == 1)) {
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
      var index_list = data.index_list;
      for (var _i10 = 0; _i10 < index_list.length; _i10++) {
        game_state.zone_state[index_list[_i10]] = data.zone_number;
        game_state.search_modificator_state[index_list[_i10]] = data.modificator;
      }
    } else if (data.command == 'change_character_visibility_response') {
      character_state.visibility[data.character_number] = data.new_value;
    } else if (data.command == 'simple_roll_response') {
      var message = data.character_name + " бросает " + data.roll;
      pushToList(message);
    } else if (data.command == 'skill_response') {
      var user_index = data.user_index;
      character_state.has_moved[user_index] = 1;
      switch (data.skill_index) {
        case 0:
          character = character_detailed_info[user_index];
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          character_state.move_action[user_index] = character_state.move_action[user_index] + charge_move_increase;
          var message = character.name + " совершает рывок";
          pushToList(message);
          break;
        case 1:
          var user = character_detailed_info[user_index];
          var target_index = data.target_index;
          var target = character_detailed_info[target_index];
          var extra_actions = data.extra_actions;
          while (extra_actions > 0) {
            if (extra_actions % 2 == 0) {
              character_state.move_action[target_index] = character_state.move_action[target_index] + adrenaline_move_increase;
            } else {
              character_state.main_action[target_index] = character_state.main_action[target_index] + 1;
            }
            extra_actions = extra_actions - 1;
          }
          var adrenaline_object_target = {};
          adrenaline_object_target.minus_actions = data.minus_actions;
          character_state.special_effects[target_index].adrenaline_target = adrenaline_object_target;

          var adrenaline_object_user = {};
          adrenaline_object_user.cooldown = 3;
          character_state.special_effects[user_index].adrenaline_user = adrenaline_object_user;

          var message = user.name + " использует прилив адреналина. " + target.name + " получает " + data.extra_actions + " действий. Это будет стоить " + data.minus_actions + " действий на следующий ход.";
          pushToList(message);
          break;
        case 2:
          var attacker = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];
          if (game_state.battle_mod == 1) {
            character_state.stamina[user_index] = character_state.stamina[user_index] - stamina_cut_limb_cost;
            character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          }
          switch (data.outcome) {
            case "KD_block":
              var message = attacker.name + " пытается подрезать " + target.name + " (" + data.attack_roll + "), но не пробивает броню.";
              pushToList(message);
              break;
            case "evaded":
              var message = attacker.name + " пытается подрезать " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + ").";
              pushToList(message);
              if (target.special_type != 'rogue') {
                character_state.can_evade[data.target_id] = 0;
              }
              break;
            case "damage_without_evasion":
              if (data.skill_outcome == "success") {
                var limb_cut_object = {};
                limb_cut_object.cooldown = cooldown_cut_limb;
                character_state.special_effects[data.target_id].cut_limb = limb_cut_object;
                character_state.move_action[data.target_id] = -10;
                var message = attacker.name + " успешно подрезает " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона.";
              } else {
                var message = attacker.name + " безуспешно пытается подрезать " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона.";
              }
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              break;
            case "damage_after_evasion":
              if (data.skill_outcome == "success") {
                var limb_cut_object = {};
                limb_cut_object.cooldown = cooldown_cut_limb;
                character_state.special_effects[data.target_id].cut_limb = limb_cut_object;
                character_state.move_action[data.target_id] = -10;
                var message = attacker.name + " успешно подрезает " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона.";
              } else {
                var message = attacker.name + " безуспешно пытается подрезать " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона.";
              }
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              character_state.can_evade[data.target_id] = 0;
              break;
            case "full_crit":
              var limb_cut_object = {};
              limb_cut_object.cooldown = cooldown_cut_limb + 1;
              character_state.special_effects[data.target_id].cut_limb = limb_cut_object;
              character_state.move_action[data.target_id] = -10;
              var message = attacker.name + " критически подрезает " + target.name + ", не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона.";
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              break;
            default:
              console.log("fucked up resolving damage");
              break;
          }
          break;
        case 3:
          var attacker = character_detailed_info[user_index];
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          character_state.stamina[user_index] = character_state.stamina[user_index] - stamina_weakspot_cost;
          var target = character_detailed_info[data.target_id];
          if (data.outcome == "success") {
            var weakspot_object = {};
            weakspot_object.hunter_id = user_index;
            character_state.special_effects[data.target_id].weakspot = weakspot_object;
            var message = attacker.name + " успешно обнаружил слабое место " + target.name;
          } else {
            var message = attacker.name + " не удалось обнаружить слабое место " + target.name;
          }
          pushToList(message);
          break;

        case 4:
          var healer = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
          character_state.stamina[user_index] = character_state.stamina[user_index] - 1;
          var cooldown = 0;
          if (character_state.initiative[user_index] > character_state.initiative[data.target_id]) {
            // пациент не ходит в этот же ход
            character_state.main_action[data.target_id] = 0;
            character_state.bonus_action[data.target_id] = 0;
            character_state.move_action[data.target_id] = 0;
            cooldown = 0;
          } else {
            cooldown = 1;
          }
          var healed_object = {};
          healed_object.cooldown = cooldown;
          character_state.special_effects[data.target_id].healed = healed_object;
          switch (data.outcome) {
            case "fail":
              var message = "У " + healer.name + " не получилось вылечить " + target.name + " (" + data.heal_roll + ")";
              pushToList(message);
              break;
            case "success":
              var message = "У " + healer.name + " получилось успешно вылечить " + target.name + " (" + data.heal_roll + ")";
              pushToList(message);
              character_state.HP[data.target_id] = data.new_hp;
              break;
            case "critical success":
              var message = "У " + healer.name + " получилось критически (2 степени) вылечить " + target.name + " (" + data.heal_roll + ")";
              pushToList(message);
              character_state.HP[data.target_id] = data.new_hp;
              break;
            default:
              console.log("Ошибка при разборе отхила");
          }
          break;
        case 5:
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          character_state.stamina[user_index] = character_state.stamina[user_index] - 1;
          var shield = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];
          var message = shield.name + " защитил " + target.name + " (+" + data.bonus_KD + "кд)";
          pushToList(message);
          character_state.bonus_KD[data.target_id] = character_state.bonus_KD[data.target_id] + data.bonus_KD;
          var big_bro_object = {};
          big_bro_object.cooldown = cooldown_big_bro;
          big_bro_object.bonus_KD = data.bonus_KD;
          character_state.special_effects[data.target_id].big_bro = big_bro_object;
          break;
        case 6:
          var shield = character_detailed_info[user_index];
          character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
          if (data.outcome == "shield_up") {
            character_state.bonus_KD[user_index] = character_state.bonus_KD[user_index] + shield_up_KD;
            var shield_up_object = {};
            shield_up_object.stamina_cost = shield_up_stamina_cost;
            shield_up_object.KD = shield_up_KD;
            character_state.special_effects[user_index].shield_up = shield_up_object;
            var message = shield.name + " поднял щиты за чат";
            pushToList(message);
          } else {
            character_state.bonus_KD[user_index] = character_state.bonus_KD[user_index] - shield_up_KD;
            delete character_state.special_effects[user_index].shield_up;
            var message = shield.name + " опустил щит. Чат прости(";
            pushToList(message);
          }
          break;
        case 7:
          var attacker = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];
          character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;

          character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage;
          if (character_state.special_effects[data.target_id].hasOwnProperty("Markus_stacks")) {
            character_state.special_effects[data.target_id].Markus_stacks = character_state.special_effects[data.target_id].Markus_stacks + 2;
          } else {
            character_state.special_effects[data.target_id].Markus_stacks = 2;
          }
          if (character_state.special_effects[user_index].hasOwnProperty("biopool")) {
            character_state.special_effects[user_index].biopool = character_state.special_effects[user_index].biopool + data.damage;
          } else {
            character_state.special_effects[user_index].biopool = data.damage;
          }
          var message = attacker.name + " наносит " + target.name + " " + data.damage + " урона от которого невозможно увернуться";
          pushToList(message);
          break;
        case 9:
          var healer = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          character_state.stamina[user_index] = character_state.stamina[user_index] - 1;

          character_state.HP[data.target_id] = character_state.HP[data.target_id] + data.heal_amount;
          character_state.special_effects[user_index].biopool = character_state.special_effects[user_index].biopool - data.heal_amount;
          var message = healer.name + " восстаналивает " + target.name + " " + data.heal_amount + " хп";
          pushToList(message);
          break;
        case 10:
          character = character_detailed_info[user_index];
          character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] + 1;
          var message = character.name + " меняет обычное на бонусное действие";
          pushToList(message);
          break;
        case 11:
          character = character_detailed_info[user_index];
          character_state.main_action[user_index] = 0;
          character_state.bonus_action[user_index] = 0;
          character_state.move_action[user_index] = 0;
          character_state.stamina[user_index] = data.new_stamina;
          var message = character.name + " отдыхает. Хорошего отпуска!";
          pushToList(message);
          break;

        case 12:
          character = character_detailed_info[user_index];
          character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          character_state.stamina[user_index] = character_state.stamina[user_index] - gas_bomb_stamina_cost;

          var message = character.name + " бросает газовую бомбу. Советуем задержать дыхание.";
          pushToList(message);

          var bomb_object = {};
          bomb_object.type = "gas_bomb";
          bomb_object.position = data.position;
          bomb_object.threshold = data.threshold;
          bomb_object.radius = 3;
          game_state.terrain_effects.push(bomb_object);

          var gas_bomb_user = {};
          gas_bomb_user.cooldown = gas_bomb_skill_cooldown;
          character_state.special_effects[user_index].gas_bomb_user = gas_bomb_user;

          var initial_radius = 2;

          apply_bomb(data.position, initial_radius);

          break;

        case 13:
          var light_sound_bomb_user = {};
          light_sound_bomb_user.cooldown = light_sound_bomb_skill_cooldown;
          character_state.special_effects[user_index].light_sound_bomb_user = light_sound_bomb_user;

          for (var _i11 = 0; _i11 < data.outcome_list.length; _i11++) {
            var character_number = data.character_list[_i11];
            var character = character_detailed_info[character_number];
            if (data.outcome_list[_i11] == 0) {
              // Прошел спасбросок
              var message = character.name + " успел прикрыть глаза";
              pushToList(message);
            } else {
              var message = character.name + " ослеп на 2 хода";
              pushToList(message);
              if (character_state.special_effects[character_number].hasOwnProperty("blind")) {
                // не накладывваем еще штраф
                character_state.special_effects[character_number].blind.cooldown = 2;
              } else {
                var blind_object = {};
                blind_object.cooldown = 2;
                character_state.special_effects[character_number].blind = blind_object;
                character_state.ranged_advantage[character_number] = character_state.ranged_advantage[character_number] - 2;
                character_state.melee_advantage[character_number] = character_state.melee_advantage[character_number] - 1;
              }
            }
          }
          break;

        case 14:
          var attacker = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];
          if (game_state.battle_mod == 1) {
            character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
          }
          switch (data.outcome) {
            case "KD_block":
              var message = attacker.name + " стреляет в " + target.name + " (" + data.attack_roll + "), но не пробивает броню.";
              pushToList(message);
              break;
            case "evaded":
              var message = attacker.name + " стреляет в " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + ").";
              pushToList(message);
              if (target.special_type != 'rogue') {
                character_state.can_evade[data.target_id] = 0;
              }
              break;
            case "damage_without_evasion":
              shocked_effect(data.target_id);

              var message = attacker.name + " стреляет в " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться и шокирует цель (уязвимость). Атака наносит " + data.damage_roll + " урона.";
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              character_state.can_evade[data.target_id] = 0;
              break;
            case "damage_after_evasion":
              shocked_effect(data.target_id);
              var message = attacker.name + " стреляет в " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + ") и шокирует цель (уязвимость). Атака наносит " + data.damage_roll + " урона.";
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              character_state.can_evade[data.target_id] = 0;
              break;
            case "full_crit":
              shocked_effect(data.target_id);
              var message = attacker.name + " критически попадает в " + target.name + ", не оставляя возможности увернуться и шокирует цель. Атака наносит " + data.damage_roll + " урона.";
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              character_state.can_evade[data.target_id] = 0;
              break;
            default:
              console.log("fucked up resolving damage");
              break;
          }
          break;

        case 15:
          var user = character_detailed_info[user_index];
          var target_index = data.target_index;
          var target = character_detailed_info[target_index];
          var extra_actions = data.extra_actions;
          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          }
          while (extra_actions > 0) {
            if (extra_actions % 2 == 0) {
              character_state.move_action[target_index] = character_state.move_action[target_index] + pich_pich_move_increase;
            } else {
              character_state.main_action[target_index] = character_state.main_action[target_index] + 1;
            }
            extra_actions = extra_actions - 1;
          }
          var pich_pich_object_target = {};
          pich_pich_object_target.extra_actions = data.extra_actions;
          character_state.special_effects[target_index].pich_pich_target = pich_pich_object_target;

          var pich_pich_object_user = {};
          pich_pich_object_user.cooldown = pich_pich_cooldown;
          character_state.special_effects[user_index].pich_pich_user = pich_pich_object_user;

          var message = user.name + " использует Пыщ-Пыщ-Гоу. " + target.name + " получает " + data.extra_actions + " доп действий на этот и следующий ход.";
          pushToList(message);
          break;
        case 16:
          if (game_state.battle_mod == 1) {
            character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
            character_state.stamina[user_index] = character_state.stamina[user_index] - force_field_stamina_cost;
          }
          var shield_object = {};
          shield_object.type = "force_field";
          shield_object.position = data.position;
          shield_object.radius = force_field_radius;
          shield_object.shield = data.shield;
          shield_object.character_list = data.character_list;
          shield_object.cells_protected = data.cells_protected;
          game_state.terrain_effects.push(shield_object);

          var shield_index = game_state.terrain_effects.length - 1;
          var char_list = data.character_list;

          var force_field_target = {};
          force_field_target.shield_index = shield_index;

          for (var _i12 = 0; _i12 < char_list.length; _i12++) {
            var character_number = char_list[_i12];
            character_state.special_effects[character_number].force_field_target = force_field_target;
          }

          var force_field_user = {};
          force_field_user.cooldown = force_field_cooldown;
          character_state.special_effects[user_index].force_field_user = force_field_user;
          var character = character_detailed_info[user_index];
          var message = character.name + " активирует силовое поле";
          pushToList(message);
          break;

        case 17:
          // инвиз
          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          }
          character_state.invisibility[user_index] = data.username;
          if (my_name != data.username) {
            var cell = document.getElementById('cell_' + data.position);
            cell.src = EMPTY_CELL_PIC;
          }
          break;

        case 18:
          // боевая универсальность
          character_state.special_effects[user_index].adaptive_fighting = -1;
          var character = character_detailed_info[user_index];
          var message = character.name + " активирует боевую универсальность";
          pushToList(message);
          break;

        case 19:
          // лаки шот
          var character = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];
          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
            character_state.stamina[user_index] = character_state.stamina[user_index] - lucky_shot_stamina_cost;
          }

          if (data.roll == 7) {
            do_damage(data.target_id, data.damage);
            var message = "Удача благоволит " + character.name + ", который наносит " + data.damage + " урона " + target.name;
          } else {
            var message = data.roll + " это не число " + character.name + ", так что " + target.name + " избегает атаки.";
          }
          pushToList(message);

          break;

        case 20:
          // lottery_shot
          var character = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];
          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
            character_state.stamina[user_index] = character_state.stamina[user_index] - lottery_shot_stamina_cost;
          }

          if (data.roll == 7) {
            do_damage(data.target_id, data.damage);
            var message = "Какая удача! Фортуна явно на стороне " + character.name + ", который наносит " + data.damage + " урона " + target.name;
          } else if (data.roll == 77) {
            do_damage(data.target_id, data.damage);
            var message = "Джекпот! " + character.name + " сегодня стоит купить лотерейный билет, а пока он наносит " + data.damage + " урона " + target.name;
          } else {
            var message = data.roll + " это не число " + character.name + ", так что " + target.name + " избегает атаки.";
          }
          pushToList(message);

          break;

        case 21:
          //всплеск действий
          var user = character_detailed_info[user_index];
          character_state.main_action[user_index] = character_state.main_action[user_index] + data.extra_actions;
          character_state.bonus_action[user_index] = 0;
          if (game_state.battle_mod == 1) {
            character_state.stamina[user_index] = character_state.stamina[user_index] - action_splash_stamina_cost * data.extra_actions;
          }

          var action_splash_object = {};
          action_splash_object.cooldown = action_splash_cooldown;
          character_state.special_effects[user_index].action_splash = action_splash_object;

          var message = user.name + " использует всплеск действий и получает " + data.extra_actions + " основных действий вместо бонусных.";
          pushToList(message);
          break;

        case 22:
          // град ударов
          var character = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];
          if (game_state.battle_mod == 1) {
            character_state.main_action[user_index] = 0;
            character_state.stamina[user_index] = character_state.stamina[user_index] - punch_rainfall_stamina_cost * data.total_attacks;
          }
          if (data.damage > 0) {
            character_state.can_evade[data.target_id] = 0;
          }

          do_damage(data.target_id, data.damage);
          var message = character.name + " наносит град из " + data.total_attacks + " ударов, из которых " + data.successfull_attacks + " попадают в " + target.name + " нанося " + data.damage + " урона.";

          pushToList(message);

          break;

        default:
          alert("Received unknown skill command");
      }
    } else if (data.command == 'new_round_response') {
      var message = "Начало нового раунда!";
      pushToList(message);

      for (var _i13 = 0; _i13 < game_state.terrain_effects.length; _i13++) {
        if (game_state.terrain_effects[_i13] !== null && game_state.terrain_effects[_i13] !== undefined) {
          switch (game_state.terrain_effects[_i13].type) {
            case "gas_bomb":
              apply_bomb(game_state.terrain_effects[_i13].position, game_state.terrain_effects[_i13].radius);
              if (game_state.terrain_effects[_i13].radius >= 4) {
                if (my_role == "gm") {
                  delete_object_command(game_state.terrain_effects[_i13].position);
                }
                game_state.terrain_effects[_i13] = null;
              } else {
                game_state.terrain_effects[_i13].radius = game_state.terrain_effects[_i13].radius + 1;
              }
              break;
            default:
              console.log("Messed up resolving terrain effects");
          }
        }
      }

      for (var _i14 = 1; _i14 < character_state.can_evade.length; _i14++) {
        character = character_detailed_info[_i14];
        if (character !== undefined && character !== null) {
          character_state.can_evade[_i14] = 1;
          character_state.has_moved[_i14] = 0;
          character_state.move_action[_i14] = move_action_map[character.agility];
          character_state.bonus_action[_i14] = bonus_action_map[character.agility];
          character_state.main_action[_i14] = main_action_map[character.agility];

          if (character_state.special_effects[_i14].hasOwnProperty("tired")) {
            // Убрать бонусы от усталости прошлого хода (чтобы когда будут накаладываться новые не штрафовать дважды)
            character_state.universal_bonus[_i14] = character_state.universal_bonus[_i14] - character_state.special_effects[_i14].tired.bonus;
          }

          if (character_state.stamina[_i14] < stamina_values[character.stamina] * 0.67) {
            if (character_state.stamina[_i14] < stamina_values[character.stamina] * 0.34) {
              if (character_state.stamina[_i14] <= 0) {
                // 3я стадия
                var tired_object = {};
                tired_object.bonus = -3;
                tired_object.stage = 3;
                character_state.special_effects[_i14].tired = tired_object;
                character_state.universal_bonus[_i14] = character_state.universal_bonus[_i14] - 3;
                character_state.move_action[_i14] = Math.ceil(character_state.move_action[_i14] * 0.25);
                if (character_state.main_action[_i14] == 1 && character_state.bonus_action[_i14] == 1) {
                  character_state.bonus_action[_i14] = 0;
                } else {
                  character_state.bonus_action[_i14] = 1;
                  character_state.main_action[_i14] = 1;
                }
              } else {
                // 2я стадия
                var tired_object = {};
                tired_object.bonus = -2;
                tired_object.stage = 2;
                character_state.special_effects[_i14].tired = tired_object;
                character_state.universal_bonus[_i14] = character_state.universal_bonus[_i14] - 2;
                character_state.move_action[_i14] = Math.ceil(character_state.move_action[_i14] * 0.5);
              }
            } else {
              // 1я стадия
              var tired_object = {};
              tired_object.bonus = -1;
              tired_object.stage = 1;
              character_state.special_effects[_i14].tired = tired_object;
              character_state.universal_bonus[_i14] = character_state.universal_bonus[_i14] - 1;
              character_state.move_action[_i14] = Math.ceil(character_state.move_action[_i14] * 0.75);
            }
          } else if (character_state.special_effects[_i14].hasOwnProperty("tired")) {
            // не устал -> убрать устлалость если была
            delete character_state.special_effects[_i14].tired;
          }

          if (character_state.special_effects[_i14].hasOwnProperty("light_sound_bomb_user")) {
            if (character_state.special_effects[_i14].light_sound_bomb_user.cooldown == 0) {
              delete character_state.special_effects[_i14].light_sound_bomb_user;
              var message = "Светошумовая граната у" + character.name + " готова к использованию.";
              pushToList(message);
            } else {
              character_state.special_effects[_i14].light_sound_bomb_user.cooldown = character_state.special_effects[_i14].light_sound_bomb_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i14].hasOwnProperty("action_splash")) {
            if (character_state.special_effects[_i14].action_splash.cooldown == 0) {
              delete character_state.special_effects[_i14].action_splash;
              var message = character.name + " вновь может использовать всплеск действий.";
              pushToList(message);
            } else {
              character_state.special_effects[_i14].action_splash.cooldown = character_state.special_effects[_i14].action_splash.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i14].hasOwnProperty("gas_bomb_user")) {
            if (character_state.special_effects[_i14].gas_bomb_user.cooldown == 0) {
              delete character_state.special_effects[_i14].gas_bomb_user;
              var message = "Газовая граната у" + character.name + " готова к использованию.";
              pushToList(message);
            } else {
              character_state.special_effects[_i14].gas_bomb_user.cooldown = character_state.special_effects[_i14].gas_bomb_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i14].hasOwnProperty("force_field_user")) {
            if (character_state.special_effects[_i14].force_field_user.cooldown == 0) {
              delete character_state.special_effects[_i14].force_field_user;
              var message = "Силовое поле у " + character.name + " снова заряжено.";
              pushToList(message);
            } else {
              character_state.special_effects[_i14].force_field_user.cooldown = character_state.special_effects[_i14].force_field_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i14].hasOwnProperty("pich_pich_user")) {
            if (character_state.special_effects[_i14].pich_pich_user.cooldown == 0) {
              delete character_state.special_effects[_i14].pich_pich_user;
              var message = "Умение Пыщ-Пыщ у " + character.name + " снова доступно.";
              pushToList(message);
            } else {
              if (character_state.special_effects[_i14].pich_pich_user.cooldown == pich_pich_cooldown) {
                character_state.bonus_action[_i14] = 0;
              }
              character_state.special_effects[_i14].pich_pich_user.cooldown = character_state.special_effects[_i14].pich_pich_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i14].hasOwnProperty("pich_pich_target")) {
            var extra_actions = character_state.special_effects[_i14].pich_pich_target.extra_actions;
            while (extra_actions > 0) {
              if (extra_actions % 2 == 0) {
                character_state.move_action[_i14] = character_state.move_action[_i14] + adrenaline_move_increase;
              } else {
                character_state.main_action[_i14] = character_state.main_action[_i14] + 1;
              }
              extra_actions = extra_actions - 1;
            }
            delete character_state.special_effects[_i14].pich_pich_target;
          }

          if (character_state.special_effects[_i14].hasOwnProperty("adrenaline_user")) {
            character_state.special_effects[_i14].adrenaline_user.cooldown = character_state.special_effects[_i14].adrenaline_user.cooldown - 1;
            if (character_state.special_effects[_i14].adrenaline_user.cooldown == 0) {
              delete character_state.special_effects[_i14].adrenaline_user;
              var message = "Умение Прилив Адреналина у " + character.name + " снова доступно.";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i14].hasOwnProperty("adrenaline_target")) {
            var minus_actions = character_state.special_effects[_i14].adrenaline_target.minus_actions;
            while (minus_actions > 0) {
              if (minus_actions % 2 == 0) {
                character_state.move_action[_i14] = character_state.move_action[_i14] - adrenaline_move_increase;
              } else {
                character_state.main_action[_i14] = character_state.main_action[_i14] - 1;
              }
              minus_actions = minus_actions - 1;
            }
            delete character_state.special_effects[_i14].adrenaline_target;
          }

          if (character_state.special_effects[_i14].hasOwnProperty("shocked")) {
            if (character_state.special_effects[_i14].shocked.cooldown == 0) {
              character_state.defensive_advantage[_i14] = character_state.defensive_advantage[_i14] + 1;
              delete character_state.special_effects[_i14].shocked;
            } else {
              character_state.special_effects[_i14].shocked.cooldown = character_state.special_effects[_i14].shocked.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i14].hasOwnProperty("cut_limb")) {
            character_state.move_action[_i14] = -10;
            character_state.special_effects[_i14].cut_limb.cooldown = character_state.special_effects[_i14].cut_limb.cooldown - 1;
            if (character_state.special_effects[_i14].cut_limb.cooldown == 0) {
              delete character_state.special_effects[_i14].cut_limb;
              var message = "Сухожилия " + character.name + " восстановятся на следующем ходу.";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i14].hasOwnProperty("healed")) {
            if (character_state.special_effects[_i14].healed.cooldown > 0) {
              character_state.move_action[_i14] = 0;
              character_state.main_action[_i14] = 0;
              character_state.bonus_action[_i14] = 0;
              character_state.special_effects[_i14].healed.cooldown = character_state.special_effects[_i14].healed.cooldown - 1;
            } else {
              delete character_state.special_effects[_i14].healed;
            }
          }

          if (character_state.special_effects[_i14].hasOwnProperty("blind")) {
            if (character_state.special_effects[_i14].blind.cooldown > 0) {
              character_state.special_effects[_i14].blind.cooldown = character_state.special_effects[_i14].blind.cooldown - 1;
            } else {
              delete character_state.special_effects[_i14].blind;
              character_state.ranged_advantage[_i14] = character_state.ranged_advantage[_i14] + 2;
              character_state.melee_advantage[_i14] = character_state.melee_advantage[_i14] + 1;
              var message = "Зрение " + character.name + " восстановилось";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i14].hasOwnProperty("Markus_stacks")) {
            character_state.special_effects[_i14].Markus_stacks = character_state.special_effects[_i14].Markus_stacks - 1;
            if (character_state.special_effects[_i14].Markus_stacks == 0) {
              delete character_state.special_effects[_i14].Markus_stacks;
            }
          }

          if (character_state.special_effects[_i14].hasOwnProperty("shield_up")) {
            character_state.move_action[_i14] = Math.ceil(character_state.move_action[_i14] / 2);
            character_state.stamina[_i14] = character_state.stamina[_i14] - character_state.special_effects[_i14].shield_up.stamina_cost;
            var message = character.name + " продолжает держать щит (спасибо)";
            pushToList(message);
          }
          if (character_state.special_effects[_i14].hasOwnProperty("big_bro")) {
            if (character_state.special_effects[_i14].big_bro.cooldown == 0) {
              character_state.bonus_KD[_i14] = character_state.bonus_KD[_i14] - character_state.special_effects[_i14].big_bro.bonus_KD;
              delete character_state.special_effects[_i14].big_bro;
              var message = character.name + " теряет защиту Большого Брата";
              pushToList(message);
            } else {
              character_state.special_effects[_i14].big_bro.cooldown = character_state.special_effects[_i14].big_bro.cooldown - 1;
            }
          }
          if (character_state.special_effects[_i14].hasOwnProperty("gas_bomb_poison")) {
            var count = character_state.special_effects[_i14].gas_bomb_poison.poison_level;
            while (count > 0) {
              character_state.move_action[_i14] = character_state.move_action[_i14] - gas_bomb_move_reduction;
              if (count % 2 == 1) {
                character_state.main_action[_i14] = character_state.main_action[_i14] - 1;
              } else {
                character_state.bonus_action[_i14] = character_state.bonus_action[_i14] - 1;
              }
              count = count - 1;
            }
            var save_roll = data.save_roll_list[_i14];
            if (save_roll >= character_state.special_effects[_i14].gas_bomb_poison.threshold) {
              character_state.special_effects[_i14].gas_bomb_poison.poison_level = character_state.special_effects[_i14].gas_bomb_poison.poison_level - 1;
              var message = character.name + " успешно кидает спасбросок и уменьшает стадию отравления (теперь " + character_state.special_effects[_i14].gas_bomb_poison.poison_level + ")";
              pushToList(message);
            } else {
              var message = character.name + " проваливает спасбросок. Стадия отравления остается прежней (" + character_state.special_effects[_i14].gas_bomb_poison.poison_level + ")";
              pushToList(message);
            }
            if (character_state.special_effects[_i14].gas_bomb_poison.poison_level <= 0) {
              delete character_state.special_effects[_i14].gas_bomb_poison;
              var message = character.name + " больше не отравлен!";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i14].hasOwnProperty("meleed")) {
            if (character_state.special_effects[_i14].meleed.cooldown <= 0) {
              delete character_state.special_effects[_i14].meleed;
              character_state.ranged_advantage[_i14] = character_state.ranged_advantage[_i14] + 1;
            } else {
              character_state.special_effects[_i14].meleed.cooldown = character_state.special_effects[_i14].meleed.cooldown - 1;
            }
          }

          if (character.special_type == 'sniper') {
            var effects_object = character_state.special_effects[_i14];
            if (effects_object.hasOwnProperty("sniper_passive")) {
              var current_attack_bonus = effects_object.sniper_passive.attack_bonus;
              var current_damage_bonus = effects_object.sniper_passive.damage_bonus;
              if (current_attack_bonus == -5) {
                var new_attack_bonus = 0;
                var new_damage_bonus = 0;
              } else {
                var new_attack_bonus = Math.min(current_attack_bonus + 1, 4);
                var new_damage_bonus = Math.min(current_damage_bonus + 2, 8);
              }
              character_state.attack_bonus[_i14] = character_state.attack_bonus[_i14] - current_attack_bonus + new_attack_bonus;
              character_state.damage_bonus[_i14] = character_state.damage_bonus[_i14] - current_damage_bonus + new_damage_bonus;
              character_state.special_effects[_i14].sniper_passive.attack_bonus = new_attack_bonus;
              character_state.special_effects[_i14].sniper_passive.damage_bonus = new_damage_bonus;
            } else {
              var sniper_passive_object = {};
              sniper_passive_object.attack_bonus = 0;
              sniper_passive_object.damage_bonus = 0;
              character_state.special_effects[_i14].sniper_passive = sniper_passive_object;
            }
          }
        }
      }
    } else if (data.command == 'battle_mod_response') {
      game_state.battle_mod = data.value;
      if (game_state.battle_mod == 0) {
        var message = "Бой окончен! Наступил мир во всем мире";
      } else {
        var message = "Начало боя! Люди умирают, если их убить";
      }
      pushToList(message);
    } else if (data.command == 'resolve_attack_response') {
      if (data.attack_type == "ranged") {
        var audio = gunshot_audio;
      } else if (data.attack_type == "melee") {
        var audio = sword_audio;
      }
      audio.play();

      if (character_state.invisibility[data.attacker_id] != "all") {
        character_state.invisibility[data.attacker_id] = "all";
        var attacker_cell = document.getElementById('cell_' + data.attacker_position);
        attacker_cell.src = character_detailed_info[data.attacker_id].avatar;
      }

      var attacker = character_detailed_info[data.attacker_id];
      var target = character_detailed_info[data.target_id];
      character_state.has_moved[data.attacker_id] = 1;

      if (game_state.battle_mod == 1) {
        character_state.stamina[data.attacker_id] = character_state.stamina[data.attacker_id] - stamina_attack_cost;
        character_state.main_action[data.attacker_id] = character_state.main_action[data.attacker_id] - 1;
      }

      if (data.cover_level > 0) {
        var cover_string = "Уровень укрытия: " + data.cover_level;
      } else {
        var cover_string = "";
      }
      switch (data.outcome) {
        case "KD_block":
          var message = attacker.name + " атакует " + target.name + " (" + data.attack_roll + "), но не пробивает броню. " + cover_string;
          pushToList(message);
          break;
        case "evaded":
          var message = attacker.name + " атакует " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + "). " + cover_string;
          pushToList(message);
          if (target.special_type != 'rogue') {
            character_state.can_evade[data.target_id] = 0;
          }
          break;
        case "damage_without_evasion":
          var message = attacker.name + " успешно атакует " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона. " + cover_string;
          pushToList(message);
          do_damage(data.target_id, data.damage_roll);
          melee_penalty(data);
          break;
        case "damage_after_evasion":
          var message = attacker.name + " успешно атакует " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона. " + cover_string;
          pushToList(message);
          do_damage(data.target_id, data.damage_roll);
          character_state.can_evade[data.target_id] = 0;
          melee_penalty(data);
          break;
        case "full_crit":
          var message = attacker.name + " критически атакует " + target.name + ", не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона. " + cover_string;
          pushToList(message);
          do_damage(data.target_id, data.damage_roll);
          character_state.can_evade[data.target_id] = 0;
          melee_penalty(data);
          break;
        case "full_cover":
          var message = attacker.name + " пытался атаковать " + target.name + " но тот находится в полном укрытии.";
          pushToList(message);
          break;
        default:
          console.log("fucked up resolving damage");
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
for (var i = 1; i < MAX_ZONES; i++) {
  var current_option = $("<option>");
  current_option.text('Зона ' + i);
  current_option.val(i);
  zone_number_select.append(current_option);
}

var search_modificator = $(SEARCH_MODIFICATOR_SELECTOR);
search_modificator.hide();

var notifications_list = $(NOTIFICATIONS_LIST_SELECTOR);
for (var _i15 = 0; _i15 < CHAT_CASH; _i15++) {
  var current_element = $("<li>");
  current_element.attr('data-name', 'notifications_list_element_' + _i15);
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
  if (keyCode == 87) {
    w_onclick();
  } else if (keyCode == 65) {
    // a
    a_onclick();
  }
};

setInterval(reconnect, 15 * 1000);

},{"./ws-client":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var socket = void 0;
var server_address = void 0;
var onMessageFunction = void 0;

function init(url) {
  server_address = url;
  socket = new WebSocket(url);
  console.log('connecting..');
}

function isReady() {
  return socket.readyState === WebSocket.OPEN;
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = function () {
    console.log('open');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  onMessageFunction = handlerFunction;
  socket.onmessage = function (e) {
    var data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function registerMessageHandlerDefault() {
  socket.onmessage = function (e) {
    var data = JSON.parse(e.data);
    onMessageFunction(data);
  };
}

function sendMessage(payload) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(payload));
  } else {
    init(server_address);
    registerMessageHandler(onMessageFunction);
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
    } else {
      console.log('Not send, but reconnected');
    }
  }
}

exports.default = {
  init: init,
  registerOpenHandler: registerOpenHandler,
  registerMessageHandler: registerMessageHandler,
  sendMessage: sendMessage,
  registerMessageHandlerDefault: registerMessageHandlerDefault,
  isReady: isReady
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksbUNBQW1DLHdDQUF2QztBQUNBLElBQUksZ0NBQWdDLHFDQUFwQztBQUNBLElBQUksa0NBQWtDLHVDQUF0Qzs7QUFFQSxJQUFJLCtCQUErQixtQ0FBbkM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLGtDQUFrQyxzQ0FBdEM7QUFDQSxJQUFJLHNCQUFzQiwwQkFBMUI7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHlCQUF5Qiw2QkFBN0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7O0FBRUEsSUFBSSx1QkFBdUIsa0NBQTNCO0FBQ0EsSUFBSSw4QkFBOEIsa0NBQWxDOztBQUVBLElBQUksNEJBQTRCLGdDQUFoQztBQUNBLElBQUksMkJBQTJCLCtCQUEvQjs7QUFFQSxJQUFJLDhCQUE4QixrQ0FBbEM7O0FBRUEsSUFBSSxpQkFBaUIsU0FBUyxNQUFULENBQWdCLE9BQWhCLENBQXdCLE9BQXhCLEVBQWlDLElBQWpDLENBQXJCOztBQUVBLElBQUksMkJBQTJCLEVBQUMsSUFBSSxFQUFMLEVBQVMsYUFBYSxFQUF0QixFQUEwQixjQUFjLEVBQXhDLEVBQTRDLGFBQWEsRUFBekQsRUFBNkQsU0FBUyxFQUF0RSxFQUEwRSxZQUFZLEVBQXRGLEVBQTBGLFdBQVcsRUFBckcs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QU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBWjtBQUNELEtBRkQsTUFFTztBQUNMLGNBQVEsR0FBUixDQUFZLDJCQUFaO0FBQ0Q7QUFDRjtBQUNGOztrQkFFYztBQUNiLFlBRGE7QUFFYiwwQ0FGYTtBQUdiLGdEQUhhO0FBSWIsMEJBSmE7QUFLYiw4REFMYTtBQU1iO0FBTmEsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBzb2NrZXQgZnJvbSAnLi93cy1jbGllbnQnO1xyXG5cclxudmFyICQgPSB3aW5kb3cualF1ZXJ5O1xyXG5cclxudmFyIENIQVJBQ1RFUl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIl0nO1xyXG52YXIgV0VBUE9OX0lORk9fQ09OVEFORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIndlYXBvbi1pbmZvLWNvbnRhaW5lclwiXSc7XHJcbnZhciBOT1RJRklDQVRJT05TX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zLWNvbnRhaW5lclwiXSc7XHJcblxyXG52YXIgQ1JFQVRFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY3JlYXRlX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBTQVZFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2F2ZV9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgTE9BRF9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImxvYWRfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIFJPTExfSU5JVElBVElWRV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInJvbGxfaW5pdGlhdGl2ZV9idXR0b25cIl0nO1xyXG52YXIgRk9HX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiZm9nX2J1dHRvblwiXSc7XHJcbnZhciBaT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiem9uZV9idXR0b25cIl0nO1xyXG52YXIgQ0hBVF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImNoYXRfYnV0dG9uXCJdJztcclxudmFyIE1JUlJPUl9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm1pcnJvcl9idXR0b25cIl0nO1xyXG52YXIgTkVYVF9ST1VORF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm5leHRfcm91bmRfYnV0dG9uXCJdJztcclxudmFyIEJBVFRMRV9NT0RfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJiYXR0bGVfbW9kX2J1dHRvblwiXSc7XHJcbnZhciBTWU5DX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic3luY19idXR0b25cIl0nO1xyXG52YXIgRk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJmb2dfem9uZV9idXR0b25cIl0nO1xyXG52YXIgVU5GT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInVuZm9nX3pvbmVfYnV0dG9uXCJdJztcclxuXHJcbnZhciBaT05FX05VTUJFUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiem9uZV9udW1iZXJfc2VsZWN0XCJdJztcclxudmFyIFNFQVJDSF9NT0RJRklDQVRPUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2VhcmNoX21vZGlmaWNhdG9yXCJdJztcclxuXHJcbnZhciBCT0FSRF9TSVpFX0lOUFVUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJib2FyZF9zaXplX2lucHV0XCJdJztcclxudmFyIFNBVkVfTkFNRV9JTlBVVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2F2ZV9uYW1lX2lucHV0XCJdJztcclxuXHJcbnZhciBOT1RJRklDQVRJT05TX0xJU1RfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdFwiXSc7XHJcblxyXG52YXIgU0VSVkVSX0FERFJFU1MgPSBsb2NhdGlvbi5vcmlnaW4ucmVwbGFjZSgvXmh0dHAvLCAnd3MnKTtcclxuXHJcbnZhciBDSEFSQUNURVJfU1RBVEVfQ09OU1RBTlQgPSB7SFA6IFtdLCBtYWluX2FjdGlvbjogW10sIGJvbnVzX2FjdGlvbjogW10sIG1vdmVfYWN0aW9uOiBbXSwgc3RhbWluYTogW10sIGluaXRpYXRpdmU6IFtdLCBjYW5fZXZhZGU6IFtdLCBoYXNfbW92ZWQ6IFtdLCBLRF9wb2ludHM6IFtdLCBjdXJyZW50X3dlYXBvbjogW10sIHZpc2liaWxpdHk6IFtdLCBpbnZpc2liaWxpdHk6IFtdLCBhdHRhY2tfYm9udXM6IFtdLCBkYW1hZ2VfYm9udXM6IFtdLCB1bml2ZXJzYWxfYm9udXM6IFtdLCBib251c19LRDogW10sIHNwZWNpYWxfZWZmZWN0czogW10sIHJhbmdlZF9hZHZhbnRhZ2U6IFtdLCBtZWxlZV9hZHZhbnRhZ2U6IFtdLCBkZWZlbnNpdmVfYWR2YW50YWdlOiBbXSwgcG9zaXRpb246IFtdfTtcclxuXHJcbnZhciBteV9uYW1lID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpKTtcclxudmFyIG15X3JvbGUgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJfcm9sZScpKTtcclxudmFyIG15X3Jvb20gPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Jvb21fbnVtYmVyJykpO1xyXG5cclxudmFyIGNoYXJhY3Rlcl9saXN0ID0gW107XHJcbnZhciBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyA9IFtdO1xyXG52YXIgb2JzdGFjbGVfbGlzdCA9IFtdO1xyXG52YXIgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyA9IFtdO1xyXG52YXIgd2VhcG9uX2xpc3QgPSBbXTtcclxudmFyIHdlYXBvbl9kZXRhaWxlZF9pbmZvID0gW107XHJcbnZhciBza2lsbF9saXN0ID0gW107XHJcblxyXG52YXIgVElOWV9FRkZFQ1RfQ0xBU1MgPSAnaXMtdGlueSc7XHJcblxyXG52YXIgRU1QVFlfQ0VMTF9QSUMgPSBcIi4vaW1hZ2VzL3NxdWFyZS5qcGdcIjtcclxudmFyIFpPTkVfRU5EUE9JTlRfUElDID0gXCIuL2ltYWdlcy9yZWRfY3Jvc3MuanBnXCJcclxudmFyIEZPR19JTUFHRSA9IFwiLi9pbWFnZXMvZm9nLndlYnBcIjtcclxudmFyIFFVRVNUSU9OX0lNQUdFID0gXCIuL2ltYWdlcy9xdWVzdGlvbi5qcGdcIjtcclxuXHJcbnZhciBNQVhfWk9ORVMgPSAyNTtcclxudmFyIENIQVRfQ0FTSCA9IDE1O1xyXG5cclxudmFyIHN0YW1pbmFfd2Vha3Nwb3RfY29zdCA9IDFcclxudmFyIHN0YW1pbmFfbW92ZV9jb3N0ID0gMFxyXG52YXIgc3RhbWluYV9hdHRhY2tfY29zdCA9IDFcclxudmFyIHB1bmNoX3JhaW5mYWxsX3N0YW1pbmFfY29zdCA9IDJcclxudmFyIHN0YW1pbmFfY3V0X2xpbWJfY29zdCA9IDRcclxudmFyIHNoaWVsZF91cF9zdGFtaW5hX2Nvc3QgPSAyXHJcbnZhciBsb3R0ZXJ5X3Nob3Rfc3RhbWluYV9jb3N0ID0gMVxyXG52YXIgbHVja3lfc2hvdF9zdGFtaW5hX2Nvc3QgPSAxXHJcbnZhciBhY3Rpb25fc3BsYXNoX3N0YW1pbmFfY29zdCA9IDJcclxuXHJcbnZhciByZXN0X3N0YW1pbmFfZ2FpbiA9IDNcclxuXHJcbnZhciBjb29sZG93bl9jdXRfbGltYiA9IDFcclxudmFyIGNvb2xkb3duX2JpZ19icm8gPSAxXHJcblxyXG52YXIgc2hpZWxkX3VwX0tEID0gM1xyXG5cclxudmFyIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZSA9IDRcclxudmFyIGNoYXJnZV9tb3ZlX2luY3JlYXNlID0gNFxyXG5cclxudmFyIGdhc19ib21iX3RocmVzaG9sZCA9IDExXHJcbnZhciBnYXNfYm9tYl9tb3ZlX3JlZHVjdGlvbiA9IDJcclxudmFyIGdhc19ib21iX3N0YW1pbmFfY29zdCA9IDNcclxudmFyIGdhc19ib21iX29ic3RhY2xlID0gMTVcclxudmFyIGdhc19ib21iX3NraWxsX2Nvb2xkb3duID0gNVxyXG5cclxudmFyIGxpZ2h0X3NvdW5kX2JvbWJfcmFkaXVzID0gNFxyXG52YXIgbGlnaHRfc291bmRfYm9tYl90aHJlc2hvbGQgPSAxNVxyXG52YXIgbGlnaHRfc291bmRfYm9tYl9za2lsbF9jb29sZG93biA9IDVcclxuXHJcbnZhciB3ZWFrX3Nwb3RfdGhyZXNob2xkID0gMTVcclxuXHJcbnZhciBzaG9ja2VkX2Nvb2xkb3duID0gMFxyXG5cclxudmFyIHBpY2hfcGljaF9jb29sZG93biA9IDRcclxudmFyIHBpY2hfcGljaF9tb3ZlX2luY3JlYXNlID0gNFxyXG5cclxudmFyIGZvcmNlX2ZpZWxkX3JhZGl1cyA9IDEuNlxyXG52YXIgZm9yY2VfZmllbGRfc3RhbWluYV9jb3N0ID0gNVxyXG52YXIgZm9yY2VfZmllbGRfY29vbGRvd24gPSAxMFxyXG52YXIgZm9yY2VfZmllbGRfb2JzdGFjbGUgPSAyNFxyXG5cclxudmFyIGFjdGlvbl9zcGxhc2hfY29vbGRvd24gPSA0XHJcblxyXG52YXIgaW52aXNpYmlsaXR5X2RldGVjdGlvbl9yYWRpdXMgPSAzO1xyXG5cclxudmFyIGJpZ19icm9fcmFuZ2UgPSAyXHJcbnZhciBoZWFsX3JhbmdlID0gMVxyXG52YXIgdGhyb3dfYmFzZV9yYW5nZSA9IDJcclxudmFyIGxpZ2h0X3NvdW5kX2JvbWJfcmFuZ2UgPSA1XHJcbnZhciBmb3JjZV9maWVsZF9yYW5nZSA9IDFcclxuXHJcbi8vIFRoaXMgaXMgYSBjb25zdGFudCwgd2lsbCBiZSBtb3ZlZCB0byBkYXRhYmFzZSBsYXRlclxyXG5jb25zdCBIUF92YWx1ZXMgPSBbMTUsIDMwLCA0MCwgNTUsIDc1LCAxMDAsIDEzMCwgMTY1LCAyMDUsIDI1MCwgMzAwLCAzNTUsIDQxNV07XHJcbmNvbnN0IHN0YW1pbmFfdmFsdWVzID0gWzMwLCA0NSwgNjAsIDc1LCA5MCwgMTA1LCAxMjAsIDEzNSwgMTUwLCAxNjUsIDE4MCwgMTk1XTtcclxuY29uc3Qgc3RyZW5ndGhfZGFtYWdlX21hcCA9IFstMiwgMCwgMSwgMywgNiwgMTAsIDE1LCAyMSwgMjgsIDM2LCA0NSwgNTVdXHJcbmNvbnN0IG1vdmVfYWN0aW9uX21hcCA9IFsxLCAzLCA0LCA2LCA4LCAxMCwgMTIsIDE0LCAxNiwgMTgsIDIwLCAyMl1cclxuY29uc3QgYm9udXNfYWN0aW9uX21hcD0gWzAsIDEsIDEsIDIsIDIsIDIsIDIsIDIsIDMsIDMsIDMsIDNdXHJcbmNvbnN0IG1haW5fYWN0aW9uX21hcCA9IFsxLCAxLCAxLCAxLCAxLCAxLCAyLCAyLCAyLCAyLCAyLCAzXVxyXG5cclxuXHJcbmxldCBnYW1lX3N0YXRlID0ge2JvYXJkX3N0YXRlOiBbXSwgZm9nX3N0YXRlOiBbXSwgem9uZV9zdGF0ZTogW10sIHNpemU6IDAsIHNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZTogW10sIHRlcnJhaW5fZWZmZWN0czogW10sIGJhdHRsZV9tb2Q6IDB9O1xyXG5sZXQgY2hhcmFjdGVyX3N0YXRlID0gQ0hBUkFDVEVSX1NUQVRFX0NPTlNUQU5UO1xyXG5cclxubGV0IGNoYXJhY3Rlcl9iYXNlID0gW107XHJcbmxldCBvYnN0YWNsZV9iYXNlID0gW107XHJcblxyXG5sZXQgZ21fY29udHJvbF9tb2QgPSAwOyAvLyBub3JtYWwgbW9kZVxyXG5cclxuLy8gaW5fcHJvY2VzczogMCA9IG5vdGhpbmcsIDEgPSBtb3ZlLCAyID0gYXR0YWNrLCAzID0gc2tpbGxcclxubGV0IGNoYXJhY3Rlcl9jaG9zZW4gPSB7aW5fcHJvY2VzczogMCwgY2hhcl9pZDogMCwgY2hhcl9wb3NpdGlvbjogMCwgd2VhcG9uX2lkOiAwLCBza2lsbF9pZDogMCwgY2VsbDogMH07XHJcblxyXG5sZXQgbGFzdF9vYnN0YWNsZSA9IDE7XHJcbmxldCB6b25lX2VuZHBvaW50ID0ge2luZGV4OiAtMSwgY2VsbDogMH1cclxuXHJcbnZhciBndW5zaG90X2F1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvZ3Vuc2hvdC5tcDMnKTtcclxudmFyIHN3b3JkX2F1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvc3dvcmQud2F2Jyk7XHJcblxyXG5ndW5zaG90X2F1ZGlvLnZvbHVtZSA9IDAuMlxyXG5zd29yZF9hdWRpby52b2x1bWUgPSAwLjJcclxuXHJcbmZ1bmN0aW9uIHJlY29ubmVjdCgpIHtcclxuICBpZiAoIXNvY2tldC5pc1JlYWR5KCkpIHtcclxuICAgIHNvY2tldC5pbml0KFNFUlZFUl9BRERSRVNTKTtcclxuICAgIHNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyRGVmYXVsdCgpO1xyXG4gICAgY29uc29sZS5sb2coJ0hvcGVmdWxseSByZWNvbm5lY3RlZCAocHJheSknKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coJ1dhcyBvbmxpbmUgYW55d2F5Jyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcclxuICBnYW1lX3N0YXRlLnNpemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkX3NpemVcIikudmFsdWU7XHJcbiAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuZm9nX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSAqIGdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlLnB1c2goMCk7XHJcbiAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlLnB1c2goMCk7XHJcbiAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZS5wdXNoKDApO1xyXG4gIH1cclxuICBzZW5kX2NvbnN0cnVjdF9jb21tYW5kKGdhbWVfc3RhdGUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkQm9hcmQoKSB7XHJcbiAgdmFyIG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcF9uYW1lXCIpLnZhbHVlO1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdsb2FkX2dhbWUnO1xyXG4gIHRvU2VuZC5zYXZlX25hbWUgPSBuYW1lO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRfY29uc3RydWN0X2NvbW1hbmQobmV3X2dhbWVfc3RhdGUpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnY29uc3RydWN0X2JvYXJkJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5nYW1lX3N0YXRlID0gbmV3X2dhbWVfc3RhdGU7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vX3NoaWZ0X29uY2xpY2sobXlfcm9sZSwgZ21fY29udHJvbF9tb2QsIGdhbWVfc3RhdGUsIGZpZWxkX2Nob3NlbiwgY2VsbCwgaW5kZXgpIHtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICAvLyBnbSBzaWRlXHJcbiAgICBpZiAoZ21fY29udHJvbF9tb2QgPT0gMCkge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gbm9ybWFsIGFkZC9tb3ZlIGRlbGV0ZSBtb2RlXHJcbiAgICAgIHN0YW5kYXJkX2NlbGxfb25DbGljayhpbmRleCwgY2VsbCwgbXlfcm9sZSk7XHJcbiAgICB9IGVsc2UgaWYgKGdtX2NvbnRyb2xfbW9kID09IDEpIHtcclxuICAgICAgLy8gd2UgYXJlIGluIGZvZyBtb2RlXHJcbiAgICAgIGFwcGx5Rm9nKGluZGV4LCBjZWxsKTtcclxuICAgIH0gZWxzZSBpZiAoZ21fY29udHJvbF9tb2QgPT0gMikge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gem9uZXMgbW9kZVxyXG4gICAgICBhc3NpZ25ab25lKGluZGV4KTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gcGxheWVyIHNpZGVcclxuICAgIGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPT0gMSkge1xyXG4gICAgICAvLyBjbGlja2VkIGZvZ1xyXG4gICAgICBpZiAoZmllbGRfY2hvc2VuID09IDEpIHtcclxuICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgZm9nIGRldGVjdGVkJyk7XHJcbiAgICAgICAgZGlzcGxheUZvZygpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIG15X3JvbGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hpZnRfb25jbGljayhpbmRleCwgY2VsbCkge1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIGlmIChnbV9jb250cm9sX21vZCA9PSAyKSB7XHJcbiAgICAgIGlmICh6b25lX2VuZHBvaW50LmluZGV4IDwgMCkge1xyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuaW5kZXggPSBpbmRleFxyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuY2VsbCA9IGNlbGxcclxuICAgICAgICBjZWxsLnNyYyA9IFpPTkVfRU5EUE9JTlRfUElDXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZW5kcG9pbnRfYXNzaWduX3pvbmUoaW5kZXgsIHpvbmVfZW5kcG9pbnQuaW5kZXgpXHJcbiAgICAgICAgem9uZV9lbmRwb2ludC5jZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDXHJcbiAgICAgICAgem9uZV9lbmRwb2ludC5pbmRleCA9IC0xXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX29ic3RhY2xlJztcclxuICAgICAgdG9TZW5kLmNlbGxfaWQgPSBpbmRleDtcclxuICAgICAgdG9TZW5kLm9ic3RhY2xlX251bWJlciA9IGxhc3Rfb2JzdGFjbGU7XHJcbiAgICAgIHRvU2VuZC5vYnN0YWNsZV9uYW1lID0gb2JzdGFjbGVfbGlzdFtsYXN0X29ic3RhY2xlIC0gMV07XHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3RybF9vbmNsaWNrKGluZGV4KSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgdmFyIGZvZ192YWx1ZSA9IGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIG1vZCA9IDEgLSBmb2dfdmFsdWVcclxuICAgIHZhciB6b25lID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2luZGV4XVxyXG4gICAgZm9nUGFyc2Vab25lKG1vZCwgem9uZSlcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbnN0cnVjdF9ib2FyZChuZXdfZ2FtZV9zdGF0ZSkge1xyXG4gIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZTtcclxuICBnYW1lX3N0YXRlLnNpemUgPSBuZXdfZ2FtZV9zdGF0ZS5zaXplO1xyXG4gIGdhbWVfc3RhdGUuZm9nX3N0YXRlID0gbmV3X2dhbWVfc3RhdGUuZm9nX3N0YXRlO1xyXG4gIGdhbWVfc3RhdGUuem9uZV9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlLnpvbmVfc3RhdGU7XHJcbiAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGU7XHJcbiAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMgPSBuZXdfZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHM7XHJcblxyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgYm9hcmRfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC1jb250YWluZXJcIik7XHJcbiAgYm9hcmRfY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgdmFyIGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xyXG4gIGJvYXJkLmNsYXNzTmFtZSA9IFwiYm9hcmRcIjtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG4gICAgdmFyIHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuICAgIHJvdy5jbGFzc05hbWUgPSBcImJvYXJkX3Jvd1wiO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lX3N0YXRlLnNpemU7IGorKykge1xyXG4gICAgICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICAgICAgdmFyIGNlbGxfaWQgPSBpICogZ2FtZV9zdGF0ZS5zaXplICsgajtcclxuICAgICAgYnV0dG9uLmlkID0gXCJjZWxsX1wiICsgY2VsbF9pZDtcclxuICAgICAgYnV0dG9uLnJvdyA9IGk7XHJcbiAgICAgIGJ1dHRvbi5jb2x1bW4gPSBqO1xyXG4gICAgICB2YXIgaW1hZ2VfbmFtZSA9IGZvZ09yUGljKGNlbGxfaWQpO1xyXG4gICAgICBidXR0b24uc3JjID0gaW1hZ2VfbmFtZTtcclxuICAgICAgYnV0dG9uLnN0eWxlLndpZHRoID0gJzUwcHgnO1xyXG4gICAgICBidXR0b24uc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xyXG4gICAgICBidXR0b24uY2xhc3NOYW1lID0gJ2JvYXJkX2NlbGwnO1xyXG4gICAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gY2VsbC5yb3cgKiBnYW1lX3N0YXRlLnNpemUgKyBjZWxsLmNvbHVtbjtcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICBzaGlmdF9vbmNsaWNrKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgICAgY3RybF9vbmNsaWNrKGluZGV4KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBub19zaGlmdF9vbmNsaWNrKG15X3JvbGUsIGdtX2NvbnRyb2xfbW9kLCBnYW1lX3N0YXRlLCBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MsIGNlbGwsIGluZGV4KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH07XHJcbiAgICAgIHZhciBjZWxsX3dyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XHJcbiAgICAgIGNlbGxfd3JhcC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICBjZWxsX3dyYXAuY2xhc3NOYW1lID0gXCJjZWxsX3dyYXBcIjtcclxuXHJcbiAgICAgIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICB6b25lX3RleHQuaWQgPSBcInpvbmVfdGV4dF9cIiArIGNlbGxfaWQ7XHJcbiAgICAgIHpvbmVfdGV4dC5jbGFzc05hbWUgPSBcInpvbmVfdGV4dFwiO1xyXG4gICAgICBjZWxsX3dyYXAuYXBwZW5kQ2hpbGQoem9uZV90ZXh0KTtcclxuXHJcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsX3dyYXApO1xyXG4gICAgfVxyXG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQocm93KTtcclxuICB9XHJcbiAgYm9hcmRfY29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZW5kcG9pbnRfYXNzaWduX3pvbmUoZW5kcG9pbnQxLCBlbmRwb2ludDIpIHtcclxuICB2YXIgem9uZV9udW1iZXIgPSB6b25lX251bWJlcl9zZWxlY3QudmFsKCk7XHJcbiAgdmFyIG1vZGlmaWNhdG9yID0gc2VhcmNoX21vZGlmaWNhdG9yLnZhbCgpO1xyXG4gIHZhciBzaXplID0gZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciBpbmRleF9saXN0ID0gW11cclxuXHJcbiAgdmFyIGNvb3JkMSA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgY29vcmQyID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG5cclxuICB2YXIgdG9wX2xlZnQgPSB0b3BfbGVmdF9jb29yZChjb29yZDEsIGNvb3JkMilcclxuICB2YXIgYm90dG9tX3JpZ2h0ID0gYm90dG9tX3JpZ2h0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKVxyXG5cclxuICBmb3IgKGxldCBpID0gdG9wX2xlZnQueDsgaSA8PSBib3R0b21fcmlnaHQueDsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gdG9wX2xlZnQueTsgaiA8PSBib3R0b21fcmlnaHQueTsgaisrKSB7XHJcbiAgICAgIHZhciBjb29yZCA9IHt9XHJcbiAgICAgIGNvb3JkLnggPSBpXHJcbiAgICAgIGNvb3JkLnkgPSBqXHJcbiAgICAgIHZhciBpbmRleCA9IGNvb3JkX3RvX2luZGV4KGNvb3JkLCBzaXplKVxyXG5cclxuICAgICAgaW5kZXhfbGlzdC5wdXNoKGluZGV4KVxyXG4gICAgICB2YXIgem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3pvbmVfdGV4dF8nICsgaW5kZXgpO1xyXG4gICAgICB6b25lX3RleHQuaW5uZXJIVE1MID0gem9uZV9udW1iZXIgKyAnKCcgKyBtb2RpZmljYXRvciArICcpJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhc3NpZ25fem9uZSc7XHJcbiAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgdG9TZW5kLmluZGV4X2xpc3QgPSBpbmRleF9saXN0O1xyXG4gIHRvU2VuZC5tb2RpZmljYXRvciA9IG1vZGlmaWNhdG9yO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvcF9sZWZ0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKSB7XHJcbiAgdmFyIHRvUmV0ID0ge31cclxuICB0b1JldC54ID0gTWF0aC5taW4oY29vcmQxLngsIGNvb3JkMi54KVxyXG4gIHRvUmV0LnkgPSBNYXRoLm1pbihjb29yZDEueSwgY29vcmQyLnkpXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJvdHRvbV9yaWdodF9jb29yZChjb29yZDEsIGNvb3JkMikge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGgubWF4KGNvb3JkMS54LCBjb29yZDIueClcclxuICB0b1JldC55ID0gTWF0aC5tYXgoY29vcmQxLnksIGNvb3JkMi55KVxyXG4gIHJldHVybiB0b1JldFxyXG59XHJcblxyXG5mdW5jdGlvbiBjb29yZF90b19pbmRleChjb29yZCwgc2l6ZSkge1xyXG4gIHZhciBpbmRleCA9IGNvb3JkLnggKiBzaXplICsgY29vcmQueVxyXG4gIHJldHVybiBpbmRleFxyXG59XHJcblxyXG5mdW5jdGlvbiBhc3NpZ25ab25lKGluZGV4KSB7XHJcbiAgdmFyIHpvbmVfbnVtYmVyID0gem9uZV9udW1iZXJfc2VsZWN0LnZhbCgpO1xyXG4gIHZhciBtb2RpZmljYXRvciA9IHNlYXJjaF9tb2RpZmljYXRvci52YWwoKTtcclxuXHJcbiAgdmFyIHpvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd6b25lX3RleHRfJyArIGluZGV4KTtcclxuICB6b25lX3RleHQuaW5uZXJIVE1MID0gem9uZV9udW1iZXIgKyAnKCcgKyBtb2RpZmljYXRvciArICcpJztcclxuXHJcbiAgdmFyIGluZGV4X2xpc3QgPSBbXVxyXG4gIGluZGV4X2xpc3QucHVzaChpbmRleClcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2Fzc2lnbl96b25lJztcclxuICB0b1NlbmQuem9uZV9udW1iZXIgPSB6b25lX251bWJlcjtcclxuICB0b1NlbmQuaW5kZXhfbGlzdCA9IGluZGV4X2xpc3Q7XHJcbiAgdG9TZW5kLm1vZGlmaWNhdG9yID0gbW9kaWZpY2F0b3I7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9nT3JQaWMoY2VsbF9pZCkge1xyXG4gIHZhciBwaWN0dXJlX25hbWUgPSBGT0dfSU1BR0U7XHJcbiAgaWYgKChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtjZWxsX2lkXSAhPSAxKXx8KG15X3JvbGUgPT0gJ2dtJykpIHtcclxuICAgIHZhciBjaGFyX2lkID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjZWxsX2lkXVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcl9pZF0gPT0gXCJhbGxcIiB8fCBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJfaWRdID09IG15X25hbWUpIHtcclxuICAgICAgcGljdHVyZV9uYW1lID0gZ2V0X29iamVjdF9waWN0dXJlKGNoYXJfaWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGljdHVyZV9uYW1lID0gZ2V0X29iamVjdF9waWN0dXJlKDApO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcGljdHVyZV9uYW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIHJvbGUpIHtcclxuXHRpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gPT0gMCkgeyAvLyBlbXB0eSBjZWxsIGNsaWNrZWRcclxuXHJcbiAgICBzd2l0Y2goY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzKSB7XHJcbiAgICAgIGNhc2UgMDogLy8gbm90aGluZ1xyXG4gICAgICAgIGlmIChyb2xlID09ICdnbScpIHtcclxuICAgICAgICAgIGFkZF9vYmplY3QoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxOiAvLyBtb3ZlXHJcbiAgICAgICAgbW92ZV9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6IC8vYXR0YWNrXHJcbiAgICAgICAgc3RvcF9hdHRhY2soKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6IC8vc2tpbGxcclxuICAgICAgICBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVzb2x2aW5nIG9uX2NsaWNrIGVtcHR5XCIpXHJcbiAgICB9XHJcblxyXG5cdH0gZWxzZSBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gPiAwKSB7IC8vIGNoYXJhY3RlciBjbGlja2VkXHJcbiAgICBzd2l0Y2goY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzKSB7XHJcbiAgICAgIGNhc2UgMDogLy8gbm90aGluZ1xyXG4gICAgICAgIHNlbGVjdF9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6IC8vIG1vdmVcclxuICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6IC8vYXR0YWNrXHJcbiAgICAgICAgcGVyZm9ybV9hdHRhY2soaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzogLy9za2lsbFxyXG4gICAgICAgIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXNvbHZpbmcgb25fY2xpY2sgY2hhcmFjdGVyXCIpXHJcbiAgICB9XHJcblxyXG5cdH0gZWxzZSB7IC8vIG9ic3RhY2xlIGNsaWNrZWRcclxuXHJcbiAgICBzd2l0Y2goY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzKSB7XHJcbiAgICAgIGNhc2UgMDogLy8gbm90aGluZ1xyXG4gICAgICAgIHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTogLy8gbW92ZVxyXG4gICAgICAgIHVuZG9fc2VsZWN0aW9uKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjogLy9hdHRhY2tcclxuICAgICAgICBzdG9wX2F0dGFjaygpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzogLy9za2lsbFxyXG4gICAgICAgIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXNvbHZpbmcgb25fY2xpY2sgb2JzdGFjbGVcIilcclxuICAgIH1cclxuXHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbmRleF90b19jb29yZGluYXRlcyhpbmRleCwgc2l6ZSkge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGguZmxvb3IoaW5kZXgvc2l6ZSlcclxuICB0b1JldC55ID0gaW5kZXggJSBzaXplXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmREaXN0YW5jZShpbmRleDEsIGluZGV4Mikge1xyXG4gIHZhciB4MSA9IE1hdGguZmxvb3IoaW5kZXgxL2dhbWVfc3RhdGUuc2l6ZSlcclxuICB2YXIgeTEgPSBpbmRleDEgJSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIHgyID0gTWF0aC5mbG9vcihpbmRleDIvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MiA9IGluZGV4MiAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgZGlzdGFuY2Vfc3F1YXJlZCA9ICh4MS14MikqKHgxLXgyKSArICh5MS15MikqKHkxLXkyKVxyXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChkaXN0YW5jZV9zcXVhcmVkKVxyXG4gIHJldHVybiBNYXRoLmNlaWwoZGlzdGFuY2UpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzSW5SYW5nZShpbmRleDEsIGluZGV4MiwgcmFuZ2UpIHtcclxuICB2YXIgeDEgPSBNYXRoLmZsb29yKGluZGV4MS9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkxID0gaW5kZXgxICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciB4MiA9IE1hdGguZmxvb3IoaW5kZXgyL2dhbWVfc3RhdGUuc2l6ZSlcclxuICB2YXIgeTIgPSBpbmRleDIgJSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIGRpc3RhbmNlID0gKHgxLXgyKSooeDEteDIpICsgKHkxLXkyKSooeTEteTIpXHJcbiAgcmV0dXJuIGRpc3RhbmNlIDw9IHJhbmdlKnJhbmdlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluZGV4X2luX3JhZGl1cyhpbmRleCwgcmFuZ2UpIHtcclxuICB2YXIgc2l6ZSA9IGdhbWVfc3RhdGUuc2l6ZVxyXG4gIHZhciB4ID0gTWF0aC5mbG9vcihpbmRleC9zaXplKVxyXG4gIHZhciB5ID0gaW5kZXggJSBzaXplXHJcbiAgdmFyIGNhbmRpZGF0ZV9pbmRleF9saXN0ID0gW11cclxuXHJcbiAgLy9jb25zb2xlLmxvZyhcIng6IFwiICsgeCArIFwiIHk6IFwiICsgeSArIFwiIGluZGV4OiBcIiArIGluZGV4KVxyXG5cclxuICBmb3IgKGxldCBpID0gTWF0aC5mbG9vcigtMSAqIHJhbmdlKTsgaSA8PSBNYXRoLmNlaWwocmFuZ2UpOyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSBNYXRoLmZsb29yKC0xICogcmFuZ2UpOyBqIDw9IE1hdGguY2VpbChyYW5nZSk7IGorKykge1xyXG4gICAgICB2YXIgY2FuZF94ID0geCArIGlcclxuICAgICAgdmFyIGNhbmRfeSA9IHkgKyBqXHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJjYW5kX3g6IFwiICsgY2FuZF94ICsgXCIgY2FuZF95OiBcIiArIGNhbmRfeSlcclxuICAgICAgaWYgKGNhbmRfeCA+PTAgJiYgY2FuZF94IDwgc2l6ZSAmJiBjYW5kX3kgPj0wICYmIGNhbmRfeSA8IHNpemUpIHtcclxuICAgICAgICB2YXIgY2FuZF9pbmRleCA9IGNhbmRfeCpzaXplICsgY2FuZF95XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImNhbmRfaW5kZXg6IFwiICsgY2FuZF9pbmRleClcclxuICAgICAgICBpZiAoaXNJblJhbmdlKGluZGV4LCBjYW5kX2luZGV4LCByYW5nZSkpIHtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjYW5kX2luZGV4OiBcIiArIGNhbmRfaW5kZXggKyBcIndhcyBjb25zaWRlcmVkIGluIHJhbmdlXCIpXHJcbiAgICAgICAgICBjYW5kaWRhdGVfaW5kZXhfbGlzdC5wdXNoKGNhbmRfaW5kZXgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjYW5kaWRhdGVfaW5kZXhfbGlzdFxyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsX3goeCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB4KSArIDFcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlGb2coaW5kZXgsIGNlbGwpIHtcclxuXHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDEpIHtcclxuXHRcdC8vIHNlbmQgdXBkYXRlIG1lc3NhZ2VcclxuXHRcdHZhciB0b1NlbmQgPSB7fTtcclxuXHRcdHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG5cdFx0dG9TZW5kLnVwZGF0ZV90eXBlID0gJ3JlbW92ZSc7XHJcblx0XHR0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblx0XHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gc2VuZCB1cGRhdGUgbWVzc2FnZVxyXG5cdFx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdFx0dG9TZW5kLmNvbW1hbmQgPSAndXBkYXRlX2ZvZyc7XHJcblx0XHR0b1NlbmQudXBkYXRlX3R5cGUgPSAnYWRkJztcclxuXHRcdHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuXHRcdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJfY29udGFpbmVycygpIHtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKCkge1xyXG4gIHRpbnlfYW5pbWF0aW9uKGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lcik7XHJcbiAgdGlueV9hbmltYXRpb24od2VhcG9uX2luZm9fY29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX29iamVjdChib2FyZF9pbmRleCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgYnV0dG9uX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgYnV0dG9uX2NvbnRhaW5lci5jbGFzc05hbWUgPSBcImFkZC1vYmplY3QtYnV0dG9uLWNvbnRhaW5lclwiO1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9jaGFyYWN0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbl9hZGRfY2hhcmFjdGVyLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9C10YDRgdC+0L3QsNC20LBcIjtcclxuICBidXR0b25fYWRkX2NoYXJhY3Rlci5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9vYnN0YWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uX2FkZF9vYnN0YWNsZS5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0Ywg0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVwiO1xyXG4gIGJ1dHRvbl9hZGRfb2JzdGFjbGUub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgYWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfY2hhcmFjdGVyKTtcclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfb2JzdGFjbGUpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uX2NvbnRhaW5lcik7XHJcblxyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxufVxyXG5cclxuZnVuY3Rpb24gdGlueV9hbmltYXRpb24oY29udGFpbmVyKSB7XHJcbiAgY29udGFpbmVyLmFkZENsYXNzKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICB9LCA1MCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZF9vYnN0YWNsZV9jb21tYW5kKGluZGV4LCBvYnN0YWNsZV9udW1iZXIpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX29ic3RhY2xlJztcclxuICB0b1NlbmQuY2VsbF9pZCA9IGluZGV4O1xyXG4gIHRvU2VuZC5vYnN0YWNsZV9udW1iZXIgPSBvYnN0YWNsZV9udW1iZXIgKyAxO1xyXG4gIHRvU2VuZC5vYnN0YWNsZV9uYW1lID0gb2JzdGFjbGVfbGlzdFtvYnN0YWNsZV9udW1iZXJdO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZF9vYnN0YWNsZShib2FyZF9pbmRleCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICBzZWxlY3QuaWQgPSBcIm9ic3RhY2xlX2Nob3NlblwiO1xyXG4gIHNlbGVjdC5jbGFzc05hbWUgPSBcIm9iamVjdF9zZWxlY3RcIlxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG9ic3RhY2xlX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBvYnN0YWNsZV9saXN0W2ldO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpO1xyXG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICB9XHJcblxyXG4gIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbi5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0YxcIjtcclxuICBidXR0b24uYm9hcmRfaW5kZXggPSBib2FyZF9pbmRleDtcclxuICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgdmFyIG9ic3RhY2xlX251bWJlciA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2JzdGFjbGVfY2hvc2VuXCIpLnZhbHVlKTtcclxuXHJcbiAgICBhZGRfb2JzdGFjbGVfY29tbWFuZChidXR0b24uYm9hcmRfaW5kZXgsIG9ic3RhY2xlX251bWJlcilcclxuXHJcbiAgICBjbGVhcl9jb250YWluZXJzKClcclxuICB9XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoc2VsZWN0KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGJ1dHRvbik7XHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX2NoYXJhY3Rlcihib2FyZF9pbmRleCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICBzZWxlY3QuaWQgPSBcImNoYXJhY3Rlcl9jaG9zZW5cIjtcclxuICBzZWxlY3QuY2xhc3NOYW1lID0gXCJvYmplY3Rfc2VsZWN0XCJcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IGNoYXJhY3Rlcl9saXN0W2ldO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpO1xyXG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICB9XHJcblxyXG4gIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbi5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0YxcIjtcclxuICBidXR0b24uYm9hcmRfaW5kZXggPSBib2FyZF9pbmRleDtcclxuICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlcl9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9jaGFyYWN0ZXInO1xyXG4gICAgdG9TZW5kLmNlbGxfaWQgPSBidXR0b24uYm9hcmRfaW5kZXg7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXIgKyAxO1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gY2hhcmFjdGVyX2xpc3RbY2hhcmFjdGVyX251bWJlcl07XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgY2xlYXJfY29udGFpbmVycygwKVxyXG4gIH1cclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzZWxlY3QpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uKTtcclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZlX2NoYXJhY3Rlcih0b19pbmRleCwgdG9fY2VsbCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDA7IC8vIGVuZCB0aGUgbW90aW9uXHJcbiAgdmFyIGNob3Nlbl9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciBjaG9zZW5fY2hhcmFjdGVyX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcblxyXG4gIHZhciBkaXN0YW5jZSA9IGZpbmREaXN0YW5jZSh0b19pbmRleCwgY2hvc2VuX2luZGV4KVxyXG4gIHZhciBtYXhfZGlzdGFuY2UgPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF1cclxuXHJcbiAgaWYgKGRpc3RhbmNlIDw9IG1heF9kaXN0YW5jZSkge1xyXG4gICAgaWYgKCEoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaG9zZW5fY2hhcmFjdGVyX2luZGV4XSAhPSBcImFsbFwiICYmIGRpc3RhbmNlID4gMikpIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdtb3ZlX2NoYXJhY3Rlcic7XHJcbiAgICAgIHRvU2VuZC5mcm9tX2luZGV4ID0gY2hvc2VuX2luZGV4O1xyXG4gICAgICB0b1NlbmQudG9faW5kZXggPSB0b19pbmRleDtcclxuICAgICAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4O1xyXG4gICAgICB0b1NlbmQuY2hhcmFjdGVyX2F2YXRhciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmF2YXRhcjtcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLmRpc3RhbmNlID0gZGlzdGFuY2VcclxuICAgICAgdG9TZW5kLmxlZnRfc2hpZWxkID0gMFxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uaGFzT3duUHJvcGVydHkoXCJmb3JjZV9maWVsZF90YXJnZXRcIikpIHtcclxuICAgICAgICB2YXIgc2hpZWxkX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5mb3JjZV9maWVsZF90YXJnZXQuc2hpZWxkX2luZGV4XHJcbiAgICAgICAgaWYoIWdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uY2VsbHNfcHJvdGVjdGVkLmluY2x1ZGVzKHRvX2luZGV4KSkgey8vINC/0L7QutC40L3Rg9C7INC30L7QvdGDINC30LDRidC40YLRi1xyXG4gICAgICAgICAgdG9TZW5kLmxlZnRfc2hpZWxkID0gMVxyXG4gICAgICAgICAgdG9TZW5kLnNoaWVsZF9pbmRleCA9IHNoaWVsZF9pbmRleFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZCA9IFtdO1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaG9zZW5fY2hhcmFjdGVyX2luZGV4XSAhPSBcImFsbFwiKSB7Ly91c2VyIGlzIGludmlzaWJsZVxyXG4gICAgICAgIHZhciBpbW1lZGlhdGVfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCAxKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltbWVkaWF0ZV9uYmgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gPiAwICYmIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCkgey8vIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIHRoZXJlXHJcbiAgICAgICAgICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5wdXNoKGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICB2YXIgZXh0ZW5kZWRfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCBpbnZpc2liaWxpdHlfZGV0ZWN0aW9uX3JhZGl1cyk7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4dGVuZGVkX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV0gPiAwICYmIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXSAhPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4KSB7Ly8gdGhlcmUgYXJlIGNoYXJhY3RlcnMgdGhlcmVcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50X2NoYXJfbnVtID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY3VycmVudF9jaGFyX251bV0uaW50ZWxsaWdlbmNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChyb2xsID4gMTApIHtcclxuICAgICAgICAgICAgICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5wdXNoKGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgaW1tZWRpYXRlX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgMSk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1tZWRpYXRlX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gPiAwICYmIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCkgey8vIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIHRoZXJlXHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2dhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV1dICE9IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZXh0ZW5kZWRfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCBpbnZpc2liaWxpdHlfZGV0ZWN0aW9uX3JhZGl1cyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXh0ZW5kZWRfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dID4gMCAmJiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCAmJiAoIWltbWVkaWF0ZV9uYmguaW5jbHVkZXMoZXh0ZW5kZWRfbmJoW2ldKSkpIHsvLyB0aGVyZSBhcmUgY2hhcmFjdGVycyB0aGVyZVxyXG4gICAgICAgICAgICB2YXIgY3VycmVudF9jaGFyX251bSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXTtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY3VycmVudF9jaGFyX251bV0gIT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgICAgIHZhciByb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmludGVsbGlnZW5jZSk7XHJcbiAgICAgICAgICAgICAgaWYgKHJvbGwgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5wdXNoKGN1cnJlbnRfY2hhcl9udW0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjbGVhcl9jb250YWluZXJzKCk7XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgICAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gdG9faW5kZXhcclxuICAgICAgdmFyIHRvX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgdG9faW5kZXgpO1xyXG4gICAgICBjaGFyYWN0ZXJfY2hvc2VuLmNlbGwgPSB0b19jZWxsXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCSINC40L3QstC40LfQtSDQv9GA0LjRhdC+0LTQuNGC0YHRjyDQutGA0LDRgdGC0YzRgdGPICjRhdC+0LTQuNGC0LUg0L/QviAxLTIg0LrQu9C10YLQutC4KVwiKVxyXG4gICAgICB1bmRvX3NlbGVjdGlvbigpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0J/QvtC70LXQs9GH0LUsINC80YHRjNC1INCR0L7Qu9GCXCIpXHJcbiAgICB1bmRvX3NlbGVjdGlvbigpXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheUZvZygpIHtcclxuXHRjbGVhcl9jb250YWluZXJzKClcclxuXHJcblx0dmFyIGluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBpbmZvLmlubmVySFRNTCA9ICfQnNGLINC90LUg0LfQvdCw0LXQvCwg0YfRgtC+INGN0YLQviDRgtCw0LrQvtC1LiDQldGB0LvQuCDQsdGLINC80Ysg0LfQvdCw0LvQuCDRh9GC0L4g0Y3RgtC+INGC0LDQutC+0LUsINC90L4g0LzRiyDQvdC1INC30L3QsNC10LwuJztcclxuXHJcblx0dmFyIGZvZ19waWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBmb2dfcGljdHVyZS5zcmMgPSBRVUVTVElPTl9JTUFHRTtcclxuICBmb2dfcGljdHVyZS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcbiAgZm9nX3BpY3R1cmUuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuXHJcblx0Y2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChpbmZvKTtcclxuXHRjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGZvZ19waWN0dXJlKTtcclxuXHJcbnRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlX2NoYXJhY3RlcihpbmRleCwgY2hhcmFjdGVyX251bWJlcikge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdkZWxldGVfY2hhcmFjdGVyJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RfY2hhcmFjdGVyKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG5cclxuXHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gXCJhbGxcIiB8fCBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IG15X25hbWUpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24gPSBpbmRleFxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2VsbCA9IGNlbGxcclxuXHJcbiAgbGV0IG5hbWUgPSBjaGFyYWN0ZXIubmFtZTtcclxuICBsZXQgYXZhdGFyID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuXHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBuYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IG5hbWU7XHJcblxyXG4gIHZhciBhdmF0YXJfY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICB2YXIgYXZhdGFyX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnNyYyA9IGF2YXRhcjtcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuXHJcbiAgYXZhdGFyX2NvbnRhaW5lci5hcHBlbmRDaGlsZChhdmF0YXJfZGlzcGxheSlcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChuYW1lX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYXZhdGFyX2NvbnRhaW5lcik7XHJcblxyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIiB8fCBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcblxyXG4gICAgYXZhdGFyX2Rpc3BsYXkub25tb3VzZWVudGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgICAgIHZhciBtYWluX2FjdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgYm9udXNfYWN0aW9uID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbW92ZV9hY3Rpb24gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgICAgIHZhciBtYWluX2FjdGlvbl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICBtYWluX2FjdGlvbl9kaXNwbGF5LmlkID0gXCJtYWluX2FjdGlvbl9kaXNwbGF5XCI7XHJcbiAgICAgIG1haW5fYWN0aW9uX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQntGB0L3QvtCy0L3Ri9GFOiBcIiArIG1haW5fYWN0aW9uXHJcblxyXG4gICAgICB2YXIgYm9udXNfYWN0aW9uX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgIGJvbnVzX2FjdGlvbl9kaXNwbGF5LmlkID0gXCJib251c19hY3Rpb25fZGlzcGxheVwiO1xyXG4gICAgICBib251c19hY3Rpb25fZGlzcGxheS5pbm5lckhUTUwgPSBcItCR0L7QvdGD0YHQvdGL0YU6IFwiICsgYm9udXNfYWN0aW9uXHJcblxyXG4gICAgICB2YXIgbW92ZV9hY3Rpb25fZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgbW92ZV9hY3Rpb25fZGlzcGxheS5pZCA9IFwibW92ZV9hY3Rpb25fZGlzcGxheVwiO1xyXG4gICAgICBtb3ZlX2FjdGlvbl9kaXNwbGF5LmlubmVySFRNTCA9IFwi0J/QtdGA0LXQtNCy0LjQttC10L3QuNC1OiBcIiArIG1vdmVfYWN0aW9uXHJcblxyXG5cclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChtYWluX2FjdGlvbl9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKGJvbnVzX2FjdGlvbl9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKG1vdmVfYWN0aW9uX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5zaG93KClcclxuICAgIH1cclxuXHJcbiAgICBhdmF0YXJfZGlzcGxheS5vbm1vdXNlbGVhdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuaGlkZSgpXHJcbiAgICB9XHJcblxyXG4gIHZhciBzdHJlbmd0aF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHN0cmVuZ3RoX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCJD0LjQu9CwOiBcIiArIGNoYXJhY3Rlci5zdHJlbmd0aDtcclxuXHJcbiAgdmFyIHN0YW1pbmFfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBzdGFtaW5hX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQotC10LvQvtGB0LvQvtC20LXQvdC40LU6IFwiICsgY2hhcmFjdGVyLnN0YW1pbmE7XHJcblxyXG4gIHZhciBhZ2lsaXR5X2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgYWdpbGl0eV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JvQvtCy0LrQvtGB0YLRjDogXCIgKyBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcbiAgdmFyIGludGVsbGlnZW5jZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGludGVsbGlnZW5jZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdGC0LXQu9C70LXQutGCOiBcIiArIGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcblxyXG4gIHZhciBLRF92YWx1ZSA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2NoYXJhY3Rlcl9udW1iZXJdKVxyXG4gIHZhciBLRF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIEtEX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQmtCUOiBcIiArIEtEX3ZhbHVlO1xyXG5cclxuICB2YXIgaHBfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgaHBfcGVyY2VudCA9IE1hdGguZmxvb3IoaHBfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIEhQX2Rpc3BsYXkuaWQgPSBcIkhQX2Rpc3BsYXlcIjtcclxuICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gKyBcIiAoXCIgKyBocF9wZXJjZW50ICsgXCIlKVwiO1xyXG5cclxuICB2YXIgdGlyZWRfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0pL3BhcnNlRmxvYXQoc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKVxyXG4gIHRpcmVkX3BlcmNlbnQgPSBNYXRoLmZsb29yKHRpcmVkX3BlcmNlbnQqMTAwKVxyXG5cclxuICB2YXIgdGlyZWRfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB0aXJlZF9kaXNwbGF5LmlkID0gXCJ0aXJlZF9kaXNwbGF5XCI7XHJcbiAgdGlyZWRfZGlzcGxheS5pbm5lckhUTUwgPSBcItCS0YvQvdC+0YHQu9C40LLQvtGB0YLRjDogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSArIFwiIChcIiArIHRpcmVkX3BlcmNlbnQgKyBcIiUpXCI7XHJcblxyXG4gIHZhciBpbml0aWF0aXZlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgaW5pdGlhdGl2ZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdC40YbQuNCw0YLQuNCy0LA6IFwiICsgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoc3RyZW5ndGhfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzdGFtaW5hX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYWdpbGl0eV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGludGVsbGlnZW5jZV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKEtEX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoSFBfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZCh0aXJlZF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGluaXRpYXRpdmVfZGlzcGxheSk7XHJcblxyXG4gIHZhciBtb3ZlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgbW92ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQn9C10YDQtdC80LXRidC10L3QuNC1XCI7XHJcbiAgbW92ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBtb3ZlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICBtb3ZlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBjaGFyYWN0ZXJfcGlja2VkID0gZXZlbnQudGFyZ2V0XHJcbiAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2hhcmFjdGVyX3BpY2tlZC5pbmRleF07XHJcbiAgICB2YXIgbW92ZV9hY3Rpb25zX2xlZnQgPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgIGlmIChtb3ZlX2FjdGlvbnNfbGVmdCA+IDApIHtcclxuICAgICAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShjaGFyYWN0ZXJfcGlja2VkLmluZGV4LCBjaGFyYWN0ZXJfcGlja2VkLmNlbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQktGLINC/0L7RgtGA0LDRgtC40LvQuCDQstGB0LUg0L/QtdGA0LXQvNC10YnQtdC90LjRjyDQvdCwINGN0YLQvtC8INGF0L7QtNGDIVwiKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcblxyXG4gICAgdmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCj0L3QuNGH0YLQvtC20LjRgtGMXCI7XHJcbiAgICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgICBkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZGVsZXRlX2NoYXJhY3RlcihpbmRleCwgY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbi5pbm5lckhUTUwgPSBcItCY0LfQvNC10L3QuNGC0Ywg0LLQuNC00LjQvNC+0YHRgtGMXCI7XHJcbiAgICBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHkoY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRhbWFnZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGFtYWdlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCd0LDQvdC10YHRgtC4INGD0YDQvtC9XCI7XHJcbiAgICBkYW1hZ2VfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgICBkYW1hZ2VfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW1hZ2VfZmllbGRcIik7XHJcbiAgICAgIGlmICghKGRhbWFnZV9maWVsZC52YWx1ZSA9PT0gXCJcIikpIHtcclxuICAgICAgICB2YXIgZGFtYWdlID0gcGFyc2VJbnQoZGFtYWdlX2ZpZWxkLnZhbHVlKTtcclxuICAgICAgICB2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiSFBfZGlzcGxheVwiKTtcclxuICAgICAgICB2YXIgbmV3X0hQID0gY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdIC0gZGFtYWdlO1xyXG4gICAgICAgIEhQX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQpdCfOiBcIiArIG5ld19IUDtcclxuXHJcbiAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ2RlYWxfZGFtYWdlJztcclxuICAgICAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICAgIHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBkYW1hZ2VfZmllbGQuaWQgPSBcImRhbWFnZV9maWVsZFwiO1xyXG4gICAgZGFtYWdlX2ZpZWxkLnR5cGUgPSBcIm51bWJlclwiO1xyXG4gICAgZGFtYWdlX2ZpZWxkLnBsYWNlaG9sZGVyID0gXCLQl9C90LDRh9C10L3QuNC1INGD0YDQvtC90LBcIjtcclxuXHJcbiAgfVxyXG5cclxuICB2YXIgc2VhcmNoX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgc2VhcmNoX2J1dHRvbi5pbm5lckhUTUwgPSBcItCe0LHRi9GB0LrQsNGC0YxcIjtcclxuICBzZWFyY2hfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgc2VhcmNoX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHNlYXJjaF9hY3Rpb24oZXZlbnQudGFyZ2V0KTtcclxuICB9XHJcblxyXG4gIHZhciBzaW1wbGVfcm9sbF9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHNpbXBsZV9yb2xsX2J1dHRvbi5pbm5lckhUTUwgPSBcItCf0YDQvtGB0YLQviBkMjBcIjtcclxuICBzaW1wbGVfcm9sbF9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMClcclxuICAgIHZhciB0b1NlbmQgPSB7fVxyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSBcInNpbXBsZV9yb2xsXCJcclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbmFtZSA9IGNoYXJhY3Rlci5uYW1lXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tXHJcbiAgICB0b1NlbmQucm9sbCA9IHJvbGxcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHdlYXBvbl9zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHdlYXBvbl9zZWxlY3QuaWQgPSBcIndlYXBvbl9jaG9zZW5cIjtcclxuXHJcbiAgdmFyIGludmVudG9yeSA9IGNoYXJhY3Rlci5pbnZlbnRvcnlcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnZlbnRvcnkubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSB3ZWFwb25fbGlzdFtpbnZlbnRvcnlbaV1dO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpbnZlbnRvcnlbaV07XHJcbiAgICB3ZWFwb25fc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICB9XHJcblxyXG4gIHZhciBwaWNrX3dlYXBvbl9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHBpY2tfd2VhcG9uX2J1dHRvbi5pbm5lckhUTUwgPSBcItCh0LzQtdC90LjRgtGMINC+0YDRg9C20LjQtVwiO1xyXG4gIHBpY2tfd2VhcG9uX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIHBpY2tfd2VhcG9uX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciB3ZWFwb25fc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWFwb25fY2hvc2VuXCIpXHJcbiAgICB2YXIgd2VhcG9uX2luZGV4ID0gd2VhcG9uX3NlbGVjdC52YWx1ZVxyXG5cclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltjaGFyYWN0ZXJfbnVtYmVyXSA9IHdlYXBvbl9pbmRleFxyXG4gICAgY2hhcmFjdGVyX2Nob3Nlbi53ZWFwb25faWQgPSB3ZWFwb25faW5kZXhcclxuXHJcbiAgICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bd2VhcG9uX2luZGV4XVxyXG5cclxuICAgIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3JjID0gd2VhcG9uLmF2YXRhcjtcclxuICB9XHJcblxyXG4gIHZhciBkZWZhdWx0X3dlYXBvbl9pbmRleCA9IGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4ud2VhcG9uX2lkID0gZGVmYXVsdF93ZWFwb25faW5kZXhcclxuICB2YXIgZGVmYXVsdF93ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tkZWZhdWx0X3dlYXBvbl9pbmRleF1cclxuXHJcbiAgdmFyIHdlYXBvbl9taW5pX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9taW5pX2Rpc3BsYXlcIlxyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3JjID0gZGVmYXVsdF93ZWFwb24uYXZhdGFyO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnODBweCc7XHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnODBweCc7XHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5vbm1vdXNlZW50ZXIgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGRlZmF1bHRfd2VhcG9uX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgZGVmYXVsdF93ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tkZWZhdWx0X3dlYXBvbl9pbmRleF1cclxuXHJcbiAgICB2YXIgd2VhcG9uX3JhbmdlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICB3ZWFwb25fcmFuZ2VfZGlzcGxheS5pZCA9IFwid2VhcG9uX3JhbmdlX2Rpc3BsYXlcIjtcclxuICAgIHdlYXBvbl9yYW5nZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JTQsNC70YzQvdC+0YHRgtGMOiBcIiArIGRlZmF1bHRfd2VhcG9uLnJhbmdlXHJcblxyXG4gICAgdmFyIHdlYXBvbl9kYW1hZ2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgIHdlYXBvbl9kYW1hZ2VfZGlzcGxheS5pZCA9IFwid2VhcG9uX2RhbWFnZV9kaXNwbGF5XCI7XHJcbiAgICB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQo9GA0L7QvTogXCIgKyBkZWZhdWx0X3dlYXBvbi5kYW1hZ2VbMF0gKyAnZCcgKyBkZWZhdWx0X3dlYXBvbi5kYW1hZ2VbMV1cclxuXHJcbiAgICB2YXIgd2VhcG9uX25hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgIHdlYXBvbl9uYW1lX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9uYW1lX2Rpc3BsYXlcIjtcclxuICAgIHdlYXBvbl9uYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gZGVmYXVsdF93ZWFwb24ubmFtZVxyXG5cclxuICAgIHZhciB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fYXZhdGFyX2Rpc3BsYXlcIlxyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LnNyYyA9IGRlZmF1bHRfd2VhcG9uLmF2YXRhcjtcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKHdlYXBvbl9uYW1lX2Rpc3BsYXkpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKHdlYXBvbl9hdmF0YXJfZGlzcGxheSlcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQod2VhcG9uX3JhbmdlX2Rpc3BsYXkpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKHdlYXBvbl9kYW1hZ2VfZGlzcGxheSlcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5zaG93KClcclxuICB9XHJcblxyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuaGlkZSgpXHJcbiAgfVxyXG5cclxuICBhdmF0YXJfY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fbWluaV9kaXNwbGF5KVxyXG5cclxuICB2YXIgYXR0YWNrX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYXR0YWNrX2J1dHRvbi5pbm5lckhUTUwgPSBcItCQ0YLQsNC60L7QstCw0YLRjFwiO1xyXG4gIGF0dGFja19idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgbWFpbl9hY3Rpb25zX2xlZnQgPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgIGlmIChtYWluX2FjdGlvbnNfbGVmdCA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl90b19hdHRhY2soY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0KMg0LLQsNGBINC90LUg0L7RgdGC0LDQu9C+0YHRjCDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIHNraWxsX3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2tpbGxfc2VsZWN0LmlkID0gXCJza2lsbF9jaG9zZW5cIjtcclxuXHJcbiAgdmFyIHNraWxsc2V0ID0gY2hhcmFjdGVyLnNraWxsc2V0XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbGxzZXQubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBza2lsbF9saXN0W3NraWxsc2V0W2ldXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gc2tpbGxzZXRbaV07XHJcbiAgICBza2lsbF9zZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIHNraWxsX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgc2tpbGxfYnV0dG9uLmlubmVySFRNTCA9IFwi0JjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINGD0LzQtdC90LjQtVwiO1xyXG4gIHNraWxsX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBza2lsbF9zZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsX2Nob3NlblwiKVxyXG4gICAgdmFyIHNraWxsX2luZGV4ID0gc2tpbGxfc2VsZWN0LnZhbHVlXHJcbiAgICB1c2Vfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIGluZGV4LCBjZWxsKVxyXG4gIH1cclxuXHJcblxyXG4gIHZhciBidXR0b25fbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICBidXR0b25fbGlzdC5jbGFzc05hbWUgPSBcImJ1dHRvbl9saXN0XCI7XHJcbiAgdmFyIGxpbmUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lOCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcblxyXG4gIGxpbmUxLmFwcGVuZENoaWxkKG1vdmVfYnV0dG9uKTtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgIGxpbmUyLmFwcGVuZENoaWxkKGRlbGV0ZV9idXR0b24pO1xyXG4gICAgbGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2J1dHRvbik7XHJcbiAgICBsaW5lMy5hcHBlbmRDaGlsZChkYW1hZ2VfZmllbGQpO1xyXG4gICAgbGluZTguYXBwZW5kQ2hpbGQoY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbik7XHJcbiAgfVxyXG4gIGxpbmU0LmFwcGVuZENoaWxkKHNlYXJjaF9idXR0b24pO1xyXG4gIGxpbmU1LmFwcGVuZENoaWxkKHBpY2tfd2VhcG9uX2J1dHRvbik7XHJcbiAgbGluZTUuYXBwZW5kQ2hpbGQod2VhcG9uX3NlbGVjdCk7XHJcbiAgbGluZTYuYXBwZW5kQ2hpbGQoYXR0YWNrX2J1dHRvbik7XHJcbiAgbGluZTcuYXBwZW5kQ2hpbGQoc2ltcGxlX3JvbGxfYnV0dG9uKTtcclxuICBsaW5lOS5hcHBlbmRDaGlsZChza2lsbF9idXR0b24pO1xyXG4gIGxpbmU5LmFwcGVuZENoaWxkKHNraWxsX3NlbGVjdCk7XHJcblxyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUxKTtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUyKTtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUzKTtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU4KTtcclxuICB9XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTQpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU1KTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNik7XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTkpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU3KTtcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b25fbGlzdCk7XHJcblxyXG59XHJcblxyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNob29zZV9jaGFyYWN0ZXJfdG9fYXR0YWNrKGNlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAyXHJcbiAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL2F0dGFja19wbGFjZWhvbGRlci5qcGdcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5KGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSBcImNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eVwiO1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAwKSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMFxyXG4gIH1cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VhcmNoX2FjdGlvbihzZWFyY2hfYnV0dG9uKSB7XHJcbiAgdmFyIGluZGV4ID0gc2VhcmNoX2J1dHRvbi5pbmRleDtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1dO1xyXG5cclxuICB2YXIgbmFtZSA9IGNoYXJhY3Rlci5uYW1lO1xyXG4gIHZhciBtb2RpZmljYXRvciA9IGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2luZGV4XTtcclxuICB2YXIgaW50ZWxsaWdlbmNlID0gY2hhcmFjdGVyLmludGVsbGlnZW5jZTtcclxuICB2YXIgcm9sbCA9IHJvbGxTZWFyY2gocGFyc2VJbnQoaW50ZWxsaWdlbmNlKSwgcGFyc2VJbnQobW9kaWZpY2F0b3IpKTtcclxuICB2YXIgem9uZV9udW1iZXIgPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaW5kZXhdO1xyXG4gIHB1c2hUb0xpc3QoJ9Cf0LXRgNGB0L7QvdCw0LYgJyArIG5hbWUgKyAnINCx0YDQvtGB0LjQuyAnICsgcm9sbCArICcg0L3QsCDQstC90LjQvNCw0YLQtdC70YzQvdC+0YHRgtGMJyk7XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdzZWFyY2hfYWN0aW9uJztcclxuICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBuYW1lO1xyXG4gIHRvU2VuZC5yb2xsID0gcm9sbDtcclxuICB0b1NlbmQuem9uZV9udW1iZXIgPSB6b25lX251bWJlcjtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsU2VhcmNoKGludGVsbGlnZW5jZSwgbW9kKSB7XHJcbiAgcmV0dXJuIGludGVsbGlnZW5jZSArIHJvbGxfeCgyMCkgKyBtb2Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZV9vYmplY3RfY29tbWFuZChpbmRleCkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdkZWxldGVfY2hhcmFjdGVyJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfb2JqZWN0KGV2ZW50KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIGRlbGV0ZV9vYmplY3RfY29tbWFuZChldmVudC50YXJnZXQuaW5kZXgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gIHZhciBvYnN0YWNsZV9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdICogKC0xKTtcclxuICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW29ic3RhY2xlX2lkXTtcclxuXHJcbiAgLy8ga2VlcCB0cmFjayBvZiBsYXN0IGNob3NlbiBvYnN0YWxlIHRvIHF1aWNrbHkgYWRkIHRvIHRoZSBtYXBcclxuICBsYXN0X29ic3RhY2xlID0gb2JzdGFjbGVfaWRcclxuXHJcbiAgbGV0IG5hbWUgPSBvYnN0YWNsZS5uYW1lO1xyXG4gIGxldCBhdmF0YXIgPSBvYnN0YWNsZS5hdmF0YXI7XHJcblxyXG4gIHZhciBuYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IG5hbWU7XHJcblxyXG4gIHZhciBhdmF0YXJfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3JjID0gYXZhdGFyO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKG5hbWVfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChhdmF0YXJfZGlzcGxheSk7XHJcblxyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgdmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCj0L3QuNGH0YLQvtC20LjRgtGMXCI7XHJcbiAgICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgICBkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZGVsZXRlX29iamVjdChldmVudCk7XHJcbiAgICB9XHJcbiAgICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGRlbGV0ZV9idXR0b24pO1xyXG4gIH1cclxuXHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gY2hvb3NlX2NoYXJhY3Rlcl90b19tb3ZlKGluZGV4LCBjZWxsKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMVxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IGluZGV4O1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdO1xyXG4gIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9sb2FkaW5nLndlYnBcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5kb19zZWxlY3Rpb24oKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMFxyXG4gIHZhciBvbGRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbik7XHJcbiAgb2xkX2NlbGwuc3JjID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXS5hdmF0YXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3BfYXR0YWNrKCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDBcclxuICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24pO1xyXG4gIG9sZF9jZWxsLnNyYyA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZF0uYXZhdGFyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wX3NraWxsKCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDBcclxuICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24pO1xyXG4gIG9sZF9jZWxsLnNyYyA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZF0uYXZhdGFyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfb2JqZWN0X3BpY3R1cmUoaW5kZXhfaW5fYm9hcmRfc3RhdGUpIHtcclxuICB2YXIgaW1hZ2UgPSBFTVBUWV9DRUxMX1BJQztcclxuICB2YXIgaW5kZXhfaW5fYmFzZTtcclxuICBpZiAoaW5kZXhfaW5fYm9hcmRfc3RhdGUgPiAwKSB7XHJcbiAgICBpbmRleF9pbl9iYXNlID0gaW5kZXhfaW5fYm9hcmRfc3RhdGU7XHJcbiAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baW5kZXhfaW5fYmFzZV07XHJcbiAgICBpbWFnZSA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcbiAgfSBlbHNlIGlmIChpbmRleF9pbl9ib2FyZF9zdGF0ZSA8IDApIHtcclxuICAgIGluZGV4X2luX2Jhc2UgPSBpbmRleF9pbl9ib2FyZF9zdGF0ZSAqICgtMSk7XHJcbiAgICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW2luZGV4X2luX2Jhc2VdO1xyXG4gICAgaW1hZ2UgPSBvYnN0YWNsZS5hdmF0YXI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaW1hZ2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVCb2FyZCgpIHtcclxuICB2YXIgc2F2ZV9uYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfbmFtZVwiKS52YWx1ZTtcclxuICB2YXIgZnVsbF9nYW1lX3N0YXRlID0ge1xyXG4gICAgZ2FtZV9zdGF0ZTogZ2FtZV9zdGF0ZSxcclxuICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvOiBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyxcclxuICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm86IG9ic3RhY2xlX2RldGFpbGVkX2luZm8sXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGU6IGNoYXJhY3Rlcl9zdGF0ZVxyXG4gIH07XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdzYXZlX2dhbWUnO1xyXG4gIHRvU2VuZC5zYXZlX25hbWUgPSBzYXZlX25hbWU7XHJcbiAgdG9TZW5kLmZ1bGxfZ2FtZV9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlSW5pdGlhdGl2ZShhZ2lsaXR5KSB7XHJcbiAgcmV0dXJuIGFnaWxpdHkqMiArIHJvbGxfeCgyMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxJbml0aWF0aXZlKCkge1xyXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmUubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gPiAwKSB7IC8vIHNvIGNoYXJhY3RlciBpIGlzIHByZXNlbnRcclxuICAgICAgLy8gcmV0cmlldmUgdGhhdCBjaGFyYWN0ZXIncyBhZ2lsaXR5XHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXTtcclxuICAgICAgdmFyIGFnaWxpdHkgPSBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcbiAgICAgIC8vIHJvbGwgaW5pdGlhdGl2ZSBhbmQgYWRkIGFnaWxpdHkgbW9kaWZpY2F0b3JcclxuICAgICAgdmFyIGluaXRpYXRpdmUgPSBjb21wdXRlSW5pdGlhdGl2ZShwYXJzZUludChhZ2lsaXR5KSk7XHJcblxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtpXSA9IGluaXRpYXRpdmU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdyb2xsX2luaXRpYXRpdmUnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmluaXRpYXRpdmVfc3RhdGUgPSBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9nTW9kZUNoYW5nZSgpIHtcclxuICBpZiAoZ21fY29udHJvbF9tb2QgIT0gMSkge1xyXG4gICAgLy8gdHVybiBvbiBmb2cgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMTtcclxuICAgIGZvZ19idXR0b24udGV4dCgn0JLRi9C60Lsg0KLRg9C80LDQvSDQktC+0LnQvdGLJyk7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaV0gPT0gMSkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X2NlbGwuc3JjID0gRk9HX0lNQUdFO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIHR1cm4gb2ZmIGZvZyBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAwO1xyXG4gICAgZm9nX2J1dHRvbi50ZXh0KCfQktC60Lsg0KLRg9C80LDQvSDQktC+0LnQvdGLJyk7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaV0gPT0gMSkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X2NlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB6b25lTW9kZUNoYW5nZSgpIHtcclxuICBpZiAoZ21fY29udHJvbF9tb2QgIT0gMikge1xyXG4gICAgLy8gdHVybiBvbiB6b25lIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDI7XHJcbiAgICB6b25lX2J1dHRvbi50ZXh0KCfQktGL0LrQuyDQl9C+0L3QsNC70YzQvdGL0Lkg0YDQtdC20LjQvCcpO1xyXG4gICAgem9uZV9udW1iZXJfc2VsZWN0LnNob3coKTtcclxuICAgIGZvZ196b25lX2J1dHRvbi5zaG93KCk7XHJcbiAgICB1bmZvZ196b25lX2J1dHRvbi5zaG93KCk7XHJcbiAgICBzZWFyY2hfbW9kaWZpY2F0b3Iuc2hvdygpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaV0gPiAwKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25lX3RleHRfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X3pvbmVfdGV4dC5pbm5lckhUTUwgPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaV0gKyAnKCcgKyBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtpXSArICcpJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBiYWNrIHRvIG5vcm1hbCBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDA7XHJcbiAgICB6b25lX2J1dHRvbi50ZXh0KCfQktC60Lsg0JfQvtC90LDQu9GM0L3Ri9C5INGA0LXQttC40LwnKTtcclxuICAgIHpvbmVfbnVtYmVyX3NlbGVjdC5oaWRlKCk7XHJcbiAgICBmb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG4gICAgdW5mb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG4gICAgc2VhcmNoX21vZGlmaWNhdG9yLmhpZGUoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X3pvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uZV90ZXh0X1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF96b25lX3RleHQuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dDdXJyZW50Wm9uZSgpIHtcclxuICB2YXIgY3VycmVudF96b25lID0gem9uZV9udW1iZXJfc2VsZWN0LnZhbCgpO1xyXG4gIGZvZ1BhcnNlWm9uZSgxLCBjdXJyZW50X3pvbmUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1bmZvZ0N1cnJlbnRab25lKCkge1xyXG4gIGZvZ1BhcnNlWm9uZSgwLCBjdXJyZW50X3pvbmUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dQYXJzZVpvbmUobW9kLCBjdXJyZW50X3pvbmUpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAndXBkYXRlX2ZvZyc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBpZiAobW9kID09IDApIHtcclxuICAgIHRvU2VuZC51cGRhdGVfdHlwZSA9ICdyZW1vdmUnO1xyXG4gIH0gZWxzZSBpZiAobW9kID09IDEpIHtcclxuICAgIHRvU2VuZC51cGRhdGVfdHlwZSA9ICdhZGQnO1xyXG4gIH1cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSAqIGdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldID09IGN1cnJlbnRfem9uZSkge1xyXG4gICAgICB0b1NlbmQuaW5kZXggPSBpO1xyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1c2hUb0xpc3QobWVzc2FnZSkge1xyXG4gIGZvciAobGV0IGk9MTsgaSA8IENIQVRfQ0FTSDsgaSsrKSB7XHJcbiAgICB2YXIgZWxlbWVudF90b19jb3B5ID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyBpICsgJ1wiXScpO1xyXG4gICAgdmFyIGVsZW1lbnRfdG9fcGFzdGUgPSAkKCdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIChpLTEpICsgJ1wiXScpO1xyXG5cclxuICAgIGVsZW1lbnRfdG9fcGFzdGUudGV4dChlbGVtZW50X3RvX2NvcHkudGV4dCgpKTtcclxuICB9XHJcbiAgdmFyIHRvcF9lbGVtZW50ID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyAoQ0hBVF9DQVNILTEpICsgJ1wiXScpO1xyXG4gIHRvcF9lbGVtZW50LnRleHQobWVzc2FnZSk7XHJcblxyXG4gIGlmIChub3RpZmljYXRpb25zX2NvbnRhaW5lci5pcyhcIjpoaWRkZW5cIikpIHtcclxuICAgIGNoYXRfYnV0dG9uLmFkZENsYXNzKFwiaXMtcmVkXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VDaGF0VmlzaWJpbGl0eSgpIHtcclxuICBpZiAoY2hhdF9idXR0b24uaGFzQ2xhc3MoXCJpcy1yZWRcIikpIHtcclxuICAgIGNoYXRfYnV0dG9uLnJlbW92ZUNsYXNzKFwiaXMtcmVkXCIpXHJcbiAgfVxyXG4gIGlmIChub3RpZmljYXRpb25zX2NvbnRhaW5lci5pcyhcIjpoaWRkZW5cIikpIHtcclxuICAgIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLnNob3coKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbm90aWZpY2F0aW9uc19jb250YWluZXIuaGlkZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRfbmV3X3JvdW5kKCkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICduZXdfcm91bmQnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdmFyIHNhdmVfcm9sbCA9IFtdXHJcblxyXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZS5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2ldXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXSAhPT0gdW5kZWZpbmVkICYmIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0gIT09IG51bGwpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBzYXZlX3JvbGxbaV0gPSByb2xsX3goMjApICsgcGFyc2VJbnQoY2hhcmFjdGVyLnN0YW1pbmEpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgdG9TZW5kLnNhdmVfcm9sbF9saXN0ID0gc2F2ZV9yb2xsXHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsX2F0dGFjayh0eXBlLCBhdHRhY2tlciwgdGFyZ2V0LCBhZHZhbnRhZ2VfYm9udXMpIHtcclxuICB2YXIgYWR2YW50YWdlID0gMFxyXG4gIGlmICgodHlwZSA9PSBcInJhbmdlZFwiKXx8KHR5cGUgPT0gXCJlbmVyZ3lcIikpIHtcclxuICAgIGFkdmFudGFnZSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2F0dGFja2VyXTtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5oYXNPd25Qcm9wZXJ0eShcImFkYXB0aXZlX2ZpZ2h0aW5nXCIpKSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5hZGFwdGl2ZV9maWdodGluZyA9PSAwKSB7XHJcbiAgICAgICAgYWR2YW50YWdlID0gYWR2YW50YWdlICsgMTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCh0YDQsNCx0L7RgtCw0Lsg0YDQtdC50L3QtNC20L7QstGL0Lkg0YHRgtCw0Log0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtC4XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gMTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICBhZHZhbnRhZ2UgPSBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2F0dGFja2VyXVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmhhc093blByb3BlcnR5KFwiYWRhcHRpdmVfZmlnaHRpbmdcIikpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID09IDEpIHtcclxuICAgICAgICBhZHZhbnRhZ2UgPSBhZHZhbnRhZ2UgKyAxO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KHRgNCw0LHQvtGC0LDQuyDQvNC40LvQu9C4INGB0YLQsNC6INGD0L3QuNCy0LXRgNGB0LDQu9GM0L3QvtGB0YLQuFwiKTtcclxuICAgICAgfVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5hZGFwdGl2ZV9maWdodGluZyA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGFkdmFudGFnZSA9IGFkdmFudGFnZSAtIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW3RhcmdldF0gKyBhZHZhbnRhZ2VfYm9udXNcclxuXHJcbiAgdmFyIHJvbGwgPSAwXHJcblxyXG4gIGlmIChhZHZhbnRhZ2UgPj0gMikgeyAvLyDQlNC40LrQvtC1INC/0YDQtdC40LzRg9GJ0LXRgdGC0LLQviA9IDQg0LrRg9Cx0LBcclxuICAgIGNvbnNvbGUubG9nKFwi0JTQuNC60L7QtSDQv9GA0LXQuNC80YPRidC10YHRgtCy0L5cIilcclxuICAgIHZhciByb2xsMSA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMiA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMyA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsNCA9IHJvbGxfeCgyMClcclxuICAgIHJvbGwgPSBNYXRoLm1heChyb2xsMSwgcm9sbDIsIHJvbGwzLCByb2xsNClcclxuICB9IGVsc2UgaWYgKGFkdmFudGFnZSA9PSAxKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcItCf0YDQtdC40LzRg9GJ0LXRgdGC0LLQvlwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWF4KHJvbGwxLCByb2xsMilcclxuICB9IGVsc2UgaWYgKGFkdmFudGFnZSA9PSAwKSB7XHJcbiAgICByb2xsID0gcm9sbF94KDIwKVxyXG4gIH0gZWxzZSBpZiAoYWR2YW50YWdlID09IC0xKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcItCf0L7QvNC10YXQsFwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWluKHJvbGwxLCByb2xsMilcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coXCLQlNC40LrQsNGPINC/0L7QvNC10YXQsFwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwzID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGw0ID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWluKHJvbGwxLCByb2xsMiwgcm9sbDMsIHJvbGw0KVxyXG4gIH1cclxuICByZXR1cm4gcm9sbFxyXG59XHJcblxyXG5mdW5jdGlvbiBjb3Zlcl9tb2QoYWNjdW11bGF0ZWRfY292ZXIpIHtcclxuICB2YXIgbW9kID0ge31cclxuICBtb2QuaXNQb3NzaWJsZSA9IHRydWVcclxuICBtb2QuY292ZXJfbGV2ZWwgPSBhY2N1bXVsYXRlZF9jb3ZlclxyXG4gIHN3aXRjaChhY2N1bXVsYXRlZF9jb3Zlcikge1xyXG4gICAgY2FzZSAwOlxyXG4gICAgICBtb2QuYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IDBcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMVxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IC0yXHJcbiAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAwXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA0OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMlxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA1OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtM1xyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA2OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtM1xyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA3OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNFxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA4OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNFxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtM1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA5OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtM1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgICBtb2QuaXNQb3NzaWJsZSA9IGZhbHNlXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVfY292ZXIoZGlzdGFuY2UsIGNvdmVyKSB7XHJcbiAgdmFyIHJlc3VsdCA9IDBcclxuICBpZiAoZGlzdGFuY2UgPCAwLjE1KSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlclxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjMpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC43NVxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjUpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC41XHJcbiAgfSBlbHNlIGlmIChkaXN0YW5jZSA8IDAuNjUpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC4yNVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXN1bHQgPSAwXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpbmVfZnJvbV9lbmRwb2ludHMocG9pbnQxLCBwb2ludDIpIHtcclxuICB2YXIgbGluZSA9IHt9XHJcbiAgbGluZS5hID0gLTEqKHBvaW50MS55IC0gcG9pbnQyLnkpXHJcbiAgbGluZS5iID0gcG9pbnQxLnggLSBwb2ludDIueFxyXG4gIGxpbmUuYyA9IC0xKihsaW5lLmEgKiBwb2ludDIueCArIGxpbmUuYiAqIHBvaW50Mi55KVxyXG4gIHJldHVybiBsaW5lXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3RhbmNlX3RvX2xpbmUoZW5kcG9pbnQxLCBlbmRwb2ludDIsIHNpemUsIHRlc3Rwb2ludCkge1xyXG4gIHZhciBlbmRwb2ludDFfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDEsIHNpemUpXHJcbiAgdmFyIGVuZHBvaW50Ml9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50Miwgc2l6ZSlcclxuICB2YXIgdGVzdHBvaW50X2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXModGVzdHBvaW50LCBzaXplKVxyXG5cclxuICB2YXIgbGluZSA9IGxpbmVfZnJvbV9lbmRwb2ludHMoZW5kcG9pbnQxX2Nvb3JkLCBlbmRwb2ludDJfY29vcmQpXHJcbiAgY29uc29sZS5sb2cobGluZSlcclxuICBjb25zb2xlLmxvZyh0ZXN0cG9pbnRfY29vcmQpXHJcblxyXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguYWJzKGxpbmUuYSp0ZXN0cG9pbnRfY29vcmQueCArIGxpbmUuYip0ZXN0cG9pbnRfY29vcmQueSArIGxpbmUuYykvTWF0aC5zcXJ0KGxpbmUuYSpsaW5lLmEgKyBsaW5lLmIqbGluZS5iKVxyXG5cclxuICBjb25zb2xlLmxvZyhkaXN0YW5jZSlcclxuICByZXR1cm4gZGlzdGFuY2VcclxufVxyXG5cclxuZnVuY3Rpb24gY2VsbHNfb25fbGluZShlbmRwb2ludDEsIGVuZHBvaW50Miwgc2l6ZSkge1xyXG4gIHZhciBlbmRwb2ludDFfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDEsIHNpemUpXHJcbiAgdmFyIGVuZHBvaW50Ml9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50Miwgc2l6ZSlcclxuICB2YXIgbGluZSA9IGxpbmVfZnJvbV9lbmRwb2ludHMoZW5kcG9pbnQxX2Nvb3JkLCBlbmRwb2ludDJfY29vcmQpXHJcblxyXG4gIHZhciBzY2FsZSA9IE1hdGgubWF4KE1hdGguYWJzKGxpbmUuYSksIE1hdGguYWJzKGxpbmUuYikpXHJcbiAgLy8gbmVlZCB0byBiZSByZXZlcnNlZCEgcmVtZW1iZXIgbGluZS5hID0gZGVsdGEgeVxyXG4gIHZhciB4X3N0ZXAgPSBsaW5lLmIvc2NhbGVcclxuICB2YXIgeV9zdGVwID0gLTEqbGluZS5hL3NjYWxlXHJcbiAgdmFyIGN1cnJlbnRfcG9pbnQgPSBlbmRwb2ludDJfY29vcmRcclxuXHJcbiAgdmFyIHNhZmV0eV9pdGVyID0gMFxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBbXVxyXG4gIHdoaWxlIChNYXRoLmFicyhjdXJyZW50X3BvaW50LnggLSBlbmRwb2ludDFfY29vcmQueCkgPiAwLjUgfHwgTWF0aC5hYnMoY3VycmVudF9wb2ludC55IC0gZW5kcG9pbnQxX2Nvb3JkLnkpID4gMC41KSB7XHJcbiAgICB2YXIgY2VpbCA9IHt9XHJcbiAgICBjZWlsLnggPSBNYXRoLmNlaWwoY3VycmVudF9wb2ludC54KVxyXG4gICAgY2VpbC55ID0gTWF0aC5jZWlsKGN1cnJlbnRfcG9pbnQueSlcclxuICAgIHZhciBjZWlsX2luZGV4ID0gY29vcmRfdG9faW5kZXgoY2VpbCwgc2l6ZSlcclxuXHJcbiAgICB2YXIgZmxvb3IgPSB7fVxyXG4gICAgZmxvb3IueCA9IE1hdGguZmxvb3IoY3VycmVudF9wb2ludC54KVxyXG4gICAgZmxvb3IueSA9IE1hdGguZmxvb3IoY3VycmVudF9wb2ludC55KVxyXG4gICAgdmFyIGZsb29yX2luZGV4ID0gY29vcmRfdG9faW5kZXgoZmxvb3IsIHNpemUpXHJcblxyXG5cclxuICAgIGNhbmRpZGF0ZV9jZWxscy5wdXNoKGNlaWxfaW5kZXgpXHJcbiAgICBpZiAoY2VpbF9pbmRleCAhPSBmbG9vcl9pbmRleCkge1xyXG4gICAgICBjYW5kaWRhdGVfY2VsbHMucHVzaChmbG9vcl9pbmRleClcclxuICAgIH1cclxuXHJcbiAgICBjdXJyZW50X3BvaW50LnggPSBjdXJyZW50X3BvaW50LnggICsgeF9zdGVwXHJcbiAgICBjdXJyZW50X3BvaW50LnkgPSBjdXJyZW50X3BvaW50LnkgICsgeV9zdGVwXHJcbiAgICBzYWZldHlfaXRlciA9IHNhZmV0eV9pdGVyICsgMVxyXG4gICAgaWYgKHNhZmV0eV9pdGVyID4gNTApIHtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyhjYW5kaWRhdGVfY2VsbHMpXHJcbiAgcmV0dXJuIGNhbmRpZGF0ZV9jZWxsc1xyXG59XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtX2F0dGFjayhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX2Nob3Nlbi53ZWFwb25faWRdXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSkpIHtcclxuXHJcbiAgICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSAwXHJcbiAgICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gY2VsbHNfb25fbGluZSh1c2VyX3Bvc2l0aW9uLCBpbmRleCwgZ2FtZV9zdGF0ZS5zaXplKVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGN1cnJlbnRfY2VsbCA9IGNhbmRpZGF0ZV9jZWxsc1tpXVxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjdXJyZW50X2NlbGxdIDwgMCkgey8vINGN0YLQviDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1XHJcbiAgICAgICAgdmFyIG9ic3RhY2xlID0gb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tNYXRoLmFicyhnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2N1cnJlbnRfY2VsbF0pXVxyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IGRpc3RhbmNlX3RvX2xpbmUodXNlcl9wb3NpdGlvbiwgaW5kZXgsIGdhbWVfc3RhdGUuc2l6ZSwgY3VycmVudF9jZWxsKVxyXG4gICAgICAgIGFjY3VtdWxhdGVkX2NvdmVyID0gYWNjdW11bGF0ZWRfY292ZXIgKyBjb21wdXRlX2NvdmVyKGRpc3RhbmNlLCBvYnN0YWNsZS5jb3ZlcilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWNjdW11bGF0ZWRfY292ZXIgPSBNYXRoLmNlaWwoYWNjdW11bGF0ZWRfY292ZXIpXHJcbiAgICB2YXIgY292ZXJfbW9kaWZpZXIgPSBjb3Zlcl9tb2QoYWNjdW11bGF0ZWRfY292ZXIpXHJcblxyXG5cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3Jlc29sdmVfYXR0YWNrJztcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQuYXR0YWNrZXJfaWQgPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5hdHRhY2tlcl9wb3NpdGlvbiA9IHVzZXJfcG9zaXRpb25cclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmF0dGFja190eXBlID0gd2VhcG9uLnR5cGVcclxuICAgIHRvU2VuZC5jb3Zlcl9sZXZlbCA9IGNvdmVyX21vZGlmaWVyLmNvdmVyX2xldmVsXHJcblxyXG4gICAgaWYgKGNvdmVyX21vZGlmaWVyLmlzUG9zc2libGUpIHtcclxuICAgICAgdmFyIGF0dGFja19yb2xsID0gcm9sbF9hdHRhY2sod2VhcG9uLnR5cGUsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGNvdmVyX21vZGlmaWVyLmFkdmFudGFnZV9ib251cylcclxuXHJcbiAgICAgIGlmIChhdHRhY2tfcm9sbCA8IDIwKSB7Ly8gbm8gY3JpdFxyXG4gICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgICAgICAgIHZhciBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gYXR0YWNrX3JvbGwgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLnN0cmVuZ3RoKVxyXG4gICAgICAgIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJlbmVyZ3lcIikge1xyXG4gICAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIDIqcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYXR0YWNrX2JvbnVzID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgdmFyIHVuaXZlcnNhbF9ib251cyA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgICAgICBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCArIGF0dGFja19ib251cyArIHVuaXZlcnNhbF9ib251cyArIGNvdmVyX21vZGlmaWVyLmF0dGFja19ib251c1xyXG5cclxuICAgICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsXHJcblxyXG4gICAgICAgIGlmIChjdW11bGF0aXZlX2F0dGFja19yb2xsID4gdGFyZ2V0X2NoYXJhY3Rlcl9LRCkgey8vINCV0YHRgtGMINC/0YDQvtCx0LjRgtC40LVcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBldmFkZV9yb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KHRhcmdldF9jaGFyYWN0ZXIuYWdpbGl0eSkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgICB0b1NlbmQuZXZhZGVfcm9sbCA9IGV2YWRlX3JvbGxcclxuICAgICAgICAgICAgaWYgKGV2YWRlX3JvbGwgPiBjdW11bGF0aXZlX2F0dGFja19yb2xsKSB7IC8vc3VjY2VzZnVsbHkgZXZhZGVkXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImV2YWRlZFwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcIktEX2Jsb2NrXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7IC8vIGZ1bGwgY3JpdFxyXG4gICAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsXHJcbiAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmdWxsX2NyaXRcIlxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZ1bGxfY292ZXJcIlxyXG4gIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+Li4uXCIpXHJcbiAgfVxyXG4gIHN0b3BfYXR0YWNrKClcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X251bWJlcikge1xyXG4gIHZhciBkYW1hZ2UgPSAwXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwic25pcGVyXCIpIHtcclxuICAgIGlmIChhdHRhY2tfcm9sbCA8IDE2KSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KHdlYXBvbi5kYW1hZ2VbMV0pXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgICAgIH1cclxuICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJ3ZWFrc3BvdFwiKSAmJiBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9udW1iZXJdLndlYWtzcG90Lmh1bnRlcl9pZCA9PSBjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgICAgICAgc3dpdGNoIChhdHRhY2tfcm9sbCkge1xyXG4gICAgICAgICAgY2FzZSAxODpcclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqMlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMTk6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjJcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICBpZiAod2VhcG9uLnR5cGUgPT0gJ21lbGVlJykge1xyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqNVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBpZiAod2VhcG9uLnR5cGUgPT0gJ21lbGVlJykge1xyXG4gICAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3aXRjaCAoYXR0YWNrX3JvbGwpIHtcclxuICAgICAgICAgIGNhc2UgMTg6XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE5OlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKV1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSoyXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjNcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAxOSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlYXBvbi5kYW1hZ2VbMF07IGkrKykge1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgfVxyXG4gICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgfVxyXG4gICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIGlmIChhdHRhY2tfcm9sbCA9PSAyMCkge1xyXG4gICAgICBkYW1hZ2UgPSBkYW1hZ2UgKiAyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGFtYWdlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdlYWtfc3BvdChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcblxyXG4gIHZhciBpbnRfY2hlY2sgPSByb2xsX3goMjApICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGludF9jaGVjayA+PSB3ZWFrX3Nwb3RfdGhyZXNob2xkKSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgfSBlbHNlIHtcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICB9XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZWFsKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgaGVhbF9yYW5nZSkpIHtcclxuXHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgaGVhbGVyX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdGFyZ2V0X2hwID0gY2hhcmFjdGVyX3N0YXRlLkhQW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0YXJnZXRfZnVsbF9ocCA9IEhQX3ZhbHVlc1t0YXJnZXRfY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgdmFyIHJhdGlvID0gcGFyc2VGbG9hdCh0YXJnZXRfaHApL3BhcnNlRmxvYXQodGFyZ2V0X2Z1bGxfaHApXHJcblxyXG4gIHZhciBoZWFsX3JvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoaGVhbGVyX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgIGhlYWxfcm9sbCA9IGhlYWxfcm9sbCArIHBhcnNlSW50KGhlYWxlcl9jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLmhlYWxfcm9sbCA9IGhlYWxfcm9sbFxyXG5cclxuICB2YXIgdGhyZXNob2xkID0gMFxyXG4gIHZhciBjcml0aWNhbF90aHJlc2hvbGQgPSAwXHJcblxyXG4gIGlmIChyYXRpbyA+IDAuOSkge1xyXG4gICAgdGhyZXNob2xkID0gMTBcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC43NSkge1xyXG4gICAgdGhyZXNob2xkID0gMTVcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjk1KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjBcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI5XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuOTUpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC44MilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjMpIHtcclxuICAgIHRocmVzaG9sZCA9IDIzXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSAzMlxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjgyKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC4xNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjZcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDM1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC40KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuMDUpIHtcclxuICAgIHRocmVzaG9sZCA9IDMwXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSA0MFxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjQpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC4yMilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgfVxyXG5cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0J3Rg9C20L3QviDQv9C+0LTQvtC50YLQuCDQsdC70LjQttC1INC6INGG0LXQu9C4INGH0YLQvtCx0Ysg0LLRi9C70LXRh9C40YLRjFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYmlnX2JybyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGJpZ19icm9fcmFuZ2UpKSB7XHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuXHJcbiAgdmFyIHNoaWVsZF9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICB2YXIgdGFyZ2V0X0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuXHJcbiAgdmFyIGJvbnVzX0tEID0gTWF0aC5tYXgoc2hpZWxkX0tEIC0gIHRhcmdldF9LRCwgMClcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5ib251c19LRCA9IGJvbnVzX0tEXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQkdC+0LvRjNGI0L7QuSDQsdGA0LDRgiDQvdC1INC00L7RgdGC0LDQtdGCINC00L4g0LzQsNC70L7Qs9C+IVwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRhbWFnZV9za2lsbF90ZW1wbGF0ZSh0YXJnZXRfcG9zLCB1c2VyX3BvcywgcmFuZ2UsIHVzZXJfaWQsIHNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbikge1xyXG4gIGlmIChpc0luUmFuZ2UodGFyZ2V0X3BvcywgdXNlcl9wb3MsIHJhbmdlKSkge1xyXG5cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdGFyZ2V0X3Bvc11cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaWRdXHJcblxyXG4gICAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gMFxyXG4gICAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGNlbGxzX29uX2xpbmUodXNlcl9wb3MsIHRhcmdldF9wb3MsIGdhbWVfc3RhdGUuc2l6ZSlcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBjdXJyZW50X2NlbGwgPSBjYW5kaWRhdGVfY2VsbHNbaV1cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXSA8IDApIHsvLyDRjdGC0L4g0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVxyXG4gICAgICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9bTWF0aC5hYnMoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjdXJyZW50X2NlbGxdKV1cclxuICAgICAgICB2YXIgZGlzdGFuY2UgPSBkaXN0YW5jZV90b19saW5lKHVzZXJfcG9zLCB0YXJnZXRfcG9zLCBnYW1lX3N0YXRlLnNpemUsIGN1cnJlbnRfY2VsbClcclxuICAgICAgICBhY2N1bXVsYXRlZF9jb3ZlciA9IGFjY3VtdWxhdGVkX2NvdmVyICsgY29tcHV0ZV9jb3ZlcihkaXN0YW5jZSwgb2JzdGFjbGUuY292ZXIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGFjY3VtdWxhdGVkX2NvdmVyID0gTWF0aC5jZWlsKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gICAgdmFyIGNvdmVyX21vZGlmaWVyID0gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG5cclxuICAgIHZhciBhdHRhY2tfcm9sbCA9IHJvbGxfYXR0YWNrKHdlYXBvbi50eXBlLCB1c2VyX2lkLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgY292ZXJfbW9kaWZpZXIuYWR2YW50YWdlX2JvbnVzKVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2lkXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAyMCkgey8vIG5vIGNyaXRcclxuICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIGJvbnVzX2F0dGFja1xyXG5cclxuICAgICAgdG9TZW5kLmF0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbFxyXG5cclxuICAgICAgaWYgKGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPiB0YXJnZXRfY2hhcmFjdGVyX0tEKSB7Ly8g0JXRgdGC0Ywg0L/RgNC+0LHQuNGC0LjQtVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcbiAgICAgICAgICB2YXIgZXZhZGVfcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludCh0YXJnZXRfY2hhcmFjdGVyLmFnaWxpdHkpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIHRvU2VuZC5ldmFkZV9yb2xsID0gZXZhZGVfcm9sbFxyXG4gICAgICAgICAgaWYgKGV2YWRlX3JvbGwgPiBjdW11bGF0aXZlX2F0dGFja19yb2xsKSB7IC8vc3VjY2VzZnVsbHkgZXZhZGVkXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJldmFkZWRcIlxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2lkLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9pZCwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcIktEX2Jsb2NrXCJcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHsgLy8gZnVsbCBjcml0XHJcbiAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsXHJcbiAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9pZCwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jcml0XCJcclxuICAgIH1cclxuICAgIHJldHVybiB0b1NlbmRcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG59XHJcblxyXG4vLyBpbmNyZWFzZSBhdHRhY2sgcm9sbCBieSBhZ2lsaXR5IGJvbnVzICgyKm1vZClcclxuZnVuY3Rpb24gY3V0X2xpbWJzKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGJvbnVzX2F0dGFjayA9IDIqcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5hZ2lsaXR5KSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbilcclxuICAgIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSB0b1NlbmQuZGFtYWdlX3JvbGxcclxuICAgICAgICB2YXIgZmxhdF9kYW1hZ2UgPSBkYW1hZ2Vfcm9sbCAtIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5zdHJlbmd0aCldIC0gY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgdmFyIGZ1bGxfZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICBpZiAoZmxhdF9kYW1hZ2UgPiBmdWxsX2RhbWFnZS8zKSB7XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgfSAgZWxzZSB7XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgICAgfVxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQv9C+0LTRgNC10LfQsNGC0Ywg0YHRg9GF0L7QttC40LvRjNGPINGN0YLQuNC8INC+0YDRg9C20LjQtdC8XCIpXHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1bmNoX3JhaW5mYWxsKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIHRhcmdldF9jaGFyX2lkID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJfaWRdXHJcbiAgICB2YXIgYm9udXNfYXR0YWNrID0gcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5hZ2lsaXR5KSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIHZhciB0b3RhbF9kYW1hZ2UgPSAwO1xyXG4gICAgdmFyIGF0dGFja3Nfc3VjY2Vzc2Z1bCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdOyBpKyspIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uKVxyXG4gICAgICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICh0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJmdWxsX2NyaXRcIikge1xyXG4gICAgICAgICAgICBhdHRhY2tzX3N1Y2Nlc3NmdWwgPSBhdHRhY2tzX3N1Y2Nlc3NmdWwgKyAxO1xyXG4gICAgICAgICAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyB0b1NlbmQuZGFtYWdlX3JvbGw7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJfaWRdID0gMDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJldmFkZWRcIiAmJiB0YXJnZXRfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSAhPSBcInJvZ3VlXCIpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVt0YXJnZXRfY2hhcl9pZF0gPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG11bHRpcGx5ZXIgPSAxLjAgKyBwYXJzZUZsb2F0KGF0dGFja3Nfc3VjY2Vzc2Z1bCAtIDEpLzIuMFxyXG4gICAgdmFyIG1lc3NhZ2UgPSBcItCc0L3QvtC20LjRgtC10LvRjCDQs9GA0LDQtNCwINCx0YvQuzogXCIgKyBtdWx0aXBseWVyXHJcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxyXG4gICAgdmFyIGZpbmFsX2RhbWFnZSA9IHBhcnNlSW50KHBhcnNlRmxvYXQodG90YWxfZGFtYWdlKSptdWx0aXBseWVyKVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyX2lkXHJcbiAgICB0b1NlbmQudG90YWxfYXR0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB0b1NlbmQuc3VjY2Vzc2Z1bGxfYXR0YWNrcyA9IGF0dGFja3Nfc3VjY2Vzc2Z1bFxyXG4gICAgdG9TZW5kLmRhbWFnZSA9IGZpbmFsX2RhbWFnZVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCT0YDQsNC0INGD0LTQsNGA0L7QsiDQvNC+0LbQvdC+INGB0L7QstGA0LXRiNC40YLRjCDRgtC+0LvRjNC60L4g0YDRg9C60L7Qv9Cw0YjQvdGL0Lwg0L7RgNGD0LbQuNC10LwhXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG9ja193YXZlKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uKVxyXG4gIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZXZvdXIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCAxKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciBzdGFja3MgPSAwXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgIHN0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLk1hcmt1c19zdGFja3NcclxuICAgIH1cclxuICAgIHZhciBkYW1hZ2UgPSBzdGFja3MqNSArIHJvbGxfeCgxMClcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWJzb2x1dGVfcmVjb3ZlcnkoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCAxKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciBoZWFsX2Ftb3VudCA9IDBcclxuXHJcbiAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW1hZ2VfZmllbGRcIik7XHJcbiAgICBpZiAoIShkYW1hZ2VfZmllbGQudmFsdWUgPT09IFwiXCIpKSB7XHJcbiAgICAgIGhlYWxfYW1vdW50ID0gcGFyc2VJbnQoZGFtYWdlX2ZpZWxkLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYmlvcG9vbCA9IDBcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJiaW9wb29sXCIpKSB7XHJcbiAgICAgIGJpb3Bvb2wgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uYmlvcG9vbFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChoZWFsX2Ftb3VudCA+IDAgJiYgYmlvcG9vbCA+PSBoZWFsX2Ftb3VudCkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLmhlYWxfYW1vdW50ID0gaGVhbF9hbW91bnRcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LXQstC+0LfQvNC+0LbQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQu9C10YfQtdC90LjRj1wiKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnYXNfYm9tYihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRocm93X3JhbmdlID0gdGhyb3dfYmFzZV9yYW5nZSArIHBhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCkqMlxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHRocm93X3JhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG4gICAgdG9TZW5kLnRocmVzaG9sZCA9IGdhc19ib21iX3RocmVzaG9sZFxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIGdhc19ib21iX29ic3RhY2xlKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCc0LDQu9C+INC60LDRiNC4INC10LvQuCDQtNC70Y8g0YLQsNC60L7Qs9C+INCx0YDQvtGB0LrQsFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlnaHRfc291bmRfYm9tYihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBsaWdodF9zb3VuZF9ib21iX3JhbmdlKSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG5cclxuICB2YXIgY2hhcmFjdGVyX2xpc3QgPSBbXVxyXG4gIHZhciBvdXRjb21lX2xpc3QgPSBbXVxyXG5cclxuICB2YXIgcmFkaXVzID0gbGlnaHRfc291bmRfYm9tYl9yYWRpdXNcclxuXHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhpbmRleCwgcmFkaXVzKVxyXG4gIGNvbnNvbGUubG9nKGNhbmRpZGF0ZV9jZWxscylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDQsdC+0LzQsdGLXHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgaWYgKGNoYXJhY3Rlci5zcGVjaWFsX3R5cGUgIT09IFwiZHJvbmVcIikge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9saXN0LnB1c2godGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgdmFyIHNhdmVfcm9sbCA9IHJvbGxfeCgyMCkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSArIHBhcnNlSW50KGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgaWYgKHNhdmVfcm9sbCA+IGxpZ2h0X3NvdW5kX2JvbWJfdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICBvdXRjb21lX2xpc3QucHVzaCgwKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvdXRjb21lX2xpc3QucHVzaCgxKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICB0b1NlbmQuY2hhcmFjdGVyX2xpc3QgPSBjaGFyYWN0ZXJfbGlzdFxyXG4gIHRvU2VuZC5vdXRjb21lX2xpc3QgPSBvdXRjb21lX2xpc3RcclxuXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQlNGA0L7QvSDQvdC1INC00L7QutC40L3QtdGCXCIpXHJcbn1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9yY2VfZmllbGQoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgZm9yY2VfZmllbGRfcmFuZ2UpKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcblxyXG4gIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgc2hpZWxkID0gTWF0aC5jZWlsKHBhcnNlRmxvYXQoSFBfdmFsdWVzW3VzZXIuc3RhbWluYV0pLzIpXHJcbiAgdG9TZW5kLnNoaWVsZCA9IHNoaWVsZFxyXG5cclxuICB2YXIgY2hhcmFjdGVyX2xpc3QgPSBbXVxyXG5cclxuICB2YXIgcmFkaXVzID0gZm9yY2VfZmllbGRfcmFkaXVzXHJcblxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhZGl1cylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDRidC40YLQsFxyXG4gICAgICAgIGNoYXJhY3Rlcl9saXN0LnB1c2godGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHRvU2VuZC5jZWxsc19wcm90ZWN0ZWQgPSBjYW5kaWRhdGVfY2VsbHNcclxuICB0b1NlbmQuY2hhcmFjdGVyX2xpc3QgPSBjaGFyYWN0ZXJfbGlzdFxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgZm9yY2VfZmllbGRfb2JzdGFjbGUpXHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQk9C10L3QtdGA0LDRgtC+0YAg0LTQvtC70LbQtdC9INCx0YvRgtGMINGD0YHRgtCw0L3QvtCy0LvQtdC9INC/0L7QsdC70LjQttC1XCIpXHJcbn1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRyZW5hbGluZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgdGFyZ2V0X251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIGFkcmVuYWxpbmVfcmFuZ2UgPSAxXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgYWRyZW5hbGluZV9yYW5nZSkpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pbmRleCA9IHRhcmdldF9udW1iZXJcclxuICAgIHZhciBleHRyYV9hY3Rpb25zID0gcm9sbF94KDQpXHJcbiAgICB2YXIgbWludXNfYWN0aW9ucyA9IHJvbGxfeCg0KVxyXG4gICAgdG9TZW5kLmV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zXHJcbiAgICB0b1NlbmQubWludXNfYWN0aW9ucyA9IG1pbnVzX2FjdGlvbnNcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwaWNoX3BpY2hfZ28oaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcblxyXG4gIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0YXJnZXRfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X251bWJlcl1cclxuICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSA9PSBcImRyb25lXCIpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pbmRleCA9IHRhcmdldF9udW1iZXJcclxuICAgIHZhciBleHRyYV9hY3Rpb25zID0gTWF0aC5jZWlsKHBhcnNlRmxvYXQodXNlci5pbnRlbGxpZ2VuY2UpLzIpXHJcbiAgICB0b1NlbmQuZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnNcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCS0Ysg0L3QtSDQvNC+0LbQtdGC0LUg0L/Ri9GJLdC/0YvRiSDQutC+0LPQviDQv9C+0L/QsNC70L4hXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsdWNreV9zaG90KGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSkpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQucm9sbCA9IHJvbGxfeCgxMClcclxuICAgIGlmICh0b1NlbmQucm9sbCA9PSA3KSB7XHJcbiAgICAgIHRvU2VuZC5kYW1hZ2UgPSByb2xsX3goNylcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG90dGVyeV9zaG90KGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSkpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQucm9sbCA9IHJvbGxfeCgxMDApXHJcbiAgICBpZiAodG9TZW5kLnJvbGwgPT0gNykge1xyXG4gICAgICB2YXIgZGFtYWdlID0gMFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCg3KVxyXG4gICAgICB9XHJcbiAgICAgIHRvU2VuZC5kYW1hZ2UgPSBkYW1hZ2VcclxuICAgIH0gZWxzZSBpZiAodG9TZW5kLnJvbGwgPT0gNzcpIHtcclxuICAgICAgdmFyIGRhbWFnZSA9IDBcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNDsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KDcpXHJcbiAgICAgIH1cclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZVxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKSB7XHJcbiAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQpIHtcclxuICAgIGNhc2UgMTpcclxuICAgICAgYWRyZW5hbGluZShpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOiAvLyDQn9C+0LTRgNC10LfQsNGC0Ywg0YHRg9GF0L7QttC40LvQuNGPXHJcbiAgICAgIGN1dF9saW1icyhpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzOiAvLyDQodC70LDQsdC+0LUg0LzQtdGB0YLQvlxyXG4gICAgICB3ZWFrX3Nwb3QoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDogLy8g0JvQtdGH0LXQvdC40LVcclxuICAgICAgaGVhbChpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA1OiAvLyDQm9C10YfQtdC90LjQtVxyXG4gICAgICBiaWdfYnJvKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDc6IC8vINC/0L7QttC40YDQsNC90LjQtVxyXG4gICAgICBkZXZvdXIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgOTpcclxuICAgICAgYWJzb2x1dGVfcmVjb3ZlcnkoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTI6XHJcbiAgICAgIGdhc19ib21iKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDEzOlxyXG4gICAgICBsaWdodF9zb3VuZF9ib21iKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE0OlxyXG4gICAgICBzaG9ja193YXZlKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE1OlxyXG4gICAgICBwaWNoX3BpY2hfZ28oaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTY6XHJcbiAgICAgIGZvcmNlX2ZpZWxkKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxOTpcclxuICAgICAgbHVja3lfc2hvdChpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjA6XHJcbiAgICAgIGxvdHRlcnlfc2hvdChpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjI6XHJcbiAgICAgIHB1bmNoX3JhaW5mYWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYWxlcnQoXCJVbmtub3duIHRhcmdldGVkIHNraWxsXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1c2Vfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKSB7XHJcbiAgc2tpbGxfaW5kZXggPSBwYXJzZUludChza2lsbF9pbmRleClcclxuICBzd2l0Y2goc2tpbGxfaW5kZXgpIHtcclxuICAgIGNhc2UgMDogLy/QoNGL0LLQvtC6XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxOiAvL9Cf0YDQuNC70LjQsiDQkNC00YDQtdC90LDQu9C40L3QsFxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFkcmVuYWxpbmVfdXNlclwiKSkge1xyXG4gICAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1XCIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6IC8vINCf0L7QtNGA0LXQt9Cw0YLRjCDRgdGD0YXQvtC20LjQu9C40Y9cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDM6IC8vINCh0LvQsNCx0L7QtSDQvNC10YHRgtC+XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNDogLy8g0JvQtdGH0LXQvdC40LVcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDU6IC8vINCR0L7Qu9GM0YjQvtC5INCx0YDQsNGCXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNjogLy8g0J/QvtC00L3Rj9GC0Ywg0YnQuNGC0YtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwic2hpZWxkX3VwXCIpKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInNoaWVsZF9kb3duXCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic2hpZWxkX3VwXCJcclxuICAgICAgfVxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA3OiAvLyDQv9C+0LbQuNGA0LDQvdC40LUg0YHRg9GJ0L3QvtGB0YLQuFxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgODogLy8g0YPQt9C90LDRgtGMINCx0LjQvtC/0YPQu1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImJpb3Bvb2xcIikpIHtcclxuICAgICAgICBhbGVydChcItCd0LDQutC+0L/Qu9C10L3QvdGL0Lkg0LHQuNC+0L/Rg9C7OiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uYmlvcG9vbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LDQutC+0L/Qu9C10L3QvdGL0Lkg0LHQuNC+0L/Rg9C7INC+0YLRgdGD0YLRgdGC0LLRg9C10YJcIilcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDk6IC8vINCx0LXQt9GD0L/RgNC10YfQvdC+0LUg0LLQvtGB0YHRgtCw0L3QvtCy0LvQtdC90LjQtVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDEwOiAvLyDQvtCx0YvRh9C90L7QtSDQsiDQsdC+0L3Rg9GB0L3QvtC1XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC+0YHQvdC+0LLQvdGL0YUg0LTQtdC50YHRgtCy0LjQuSwg0YfRgtC+0LHRiyDQv9GA0LXQstGA0LDRgtC40YLRjCDQsiDQsdC+0L3Rg9GB0L3Ri9C1IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxMTogLy8g0L7RgtC00YvRhVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbY2hhcmFjdGVyX251bWJlcl0gPT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3X3N0YW1pbmEgPSBNYXRoLm1pbihjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSArIHJlc3Rfc3RhbWluYV9nYWluLCBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXS5zdGFtaW5hXSlcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICAgIHRvU2VuZC5uZXdfc3RhbWluYSA9IG5ld19zdGFtaW5hXHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0JLRiyDRg9C20LUg0YHQvtCy0LXRgNGI0LDQu9C4INC00LXQudGB0YLQstC40Y8g0L3QsCDRjdGC0L7QvCDRhdC+0LTRgywg0YLQsNC6INGH0YLQviDQvdC1INC80L7QttC10YLQtSDQvtGC0LTQvtGF0L3Rg9GC0YxcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDEyOiAvLyDQs9Cw0LfQvtCy0LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCjINCz0YDQsNC90LDRgtGLINC60YPQu9C00LDRg9C9ICjQs9Cw0Lcg0Y3RjdGNINC30LDQstCw0YDQuNCy0LDQtdGC0YHRjywg0YXQtylcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxMzogLy8g0YHQstC10YLQvtGI0YPQvNC+0LLQsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJsaWdodF9zb3VuZF9ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCT0YDQsNC90LDRgtCwINC10YnQtSDQvdC1INCz0L7RgtC+0LLQsFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTQ6IC8vINCo0L7QutC+0LLRi9C5INC40LzQv9GD0LvRjNGBXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTU6IC8vINCf0YvRiS3Qv9GL0Ykt0LPQvlxyXG4gICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJwaWNoX3BpY2hfdXNlclwiKSkge1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCf0YvRiSDQv9GL0Ykg0LXRidC1INC90LAg0L/QtdGA0LXQt9Cw0YDRj9C00LrQtSFcIilcclxuICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTY6IC8vINCh0LjQu9C+0LLQvtC1INC/0L7Qu9C1XHJcbiAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiZm9yY2VfZmllbGRfdXNlclwiKSkge1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQk9C10L3QtdGA0LDRgtC+0YAg0YHQuNC70L7QstC+0LPQviDQv9C+0LvRjyDQtdGJ0LUg0L3QtSDQt9Cw0YDRj9C00LjQu9GB0Y8hXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTc6IC8vINCY0L3QstC40LdcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXg7XHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJuYW1lID0gbXlfbmFtZTtcclxuICAgICAgICAgICAgdG9TZW5kLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE4OiAvLyDQkdC+0LXQstCw0Y8g0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtGMXHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleDtcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxOTogLy8g0JvQsNC60Lgg0YjQvtGCXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjA6IC8vINCb0L7RgtC10YDQtdC50L3Ri9C5INCy0YvRgdGC0YDQtdC7XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjE6IC8v0J/RgNC40LvQuNCyINC00LXQudGB0YLQstC40LlcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhY3Rpb25fc3BsYXNoXCIpKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICB0b1NlbmQuZXh0cmFfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcblxyXG4gICAgY2FzZSAyMjogLy8g0LPRgNCw0LQg0YPQtNCw0YDQvtCyXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDEpIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCU0LvRjyDQs9GA0LDQtNCwINGD0LTQsNGA0L7QsiDRgtGA0LXQsdGD0LXRgtGB0Y8g0LHQvtC70YzRiNC1IDEg0L7RgdC90L7QstC90L7Qs9C+INC00LXQudGB0YLQstC40Y8hXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcblxyXG5cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDQt9C90LDQtdC8INGN0YLQviDRg9C80LXQvdC40LVcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gM1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQgPSBza2lsbF9pbmRleFxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24gPSBwb3NpdGlvblxyXG4gIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9DaGlkb3JpLndlYnBcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlfYm9tYihwb3NpdGlvbiwgcmFkaXVzKSB7XHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhwb3NpdGlvbiwgcmFkaXVzKVxyXG4gIGNvbnNvbGUubG9nKGNhbmRpZGF0ZV9jZWxscylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDQsdC+0LzQsdGLXHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0L7Qv9Cw0LTQsNC10YIg0L/QvtC0INC00LXQudGB0YLQstC40LUg0LPQsNC30L7QstC+0Lkg0LHQvtC80LHRi1wiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgKyAxXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGdhc19ib21iX3BvaXNvbl9vYmplY3QgPSB7fVxyXG4gICAgICAgIGdhc19ib21iX3BvaXNvbl9vYmplY3QucG9pc29uX2xldmVsID0gMVxyXG4gICAgICAgIGdhc19ib21iX3BvaXNvbl9vYmplY3QudGhyZXNob2xkID0gZ2FzX2JvbWJfdGhyZXNob2xkXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uID0gZ2FzX2JvbWJfcG9pc29uX29iamVjdFxyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdIC0gZ2FzX2JvbWJfbW92ZV9yZWR1Y3Rpb25cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG9ja2VkX2VmZmVjdCh0YXJnZXQpIHtcclxuICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0XS5oYXNPd25Qcm9wZXJ0eShcInNob2NrZWRcIikpIHtcclxuICAgIHZhciBzaG9ja2VkX29iamVjdCA9IHt9XHJcbiAgICBzaG9ja2VkX29iamVjdC5jb29sZG93biA9IHNob2NrZWRfY29vbGRvd25cclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0XS5zaG9ja2VkID0gc2hvY2tlZF9vYmplY3RcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW3RhcmdldF0gPSBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVt0YXJnZXRdIC0gMVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uc2hvY2tlZC5jb29sZG93biA9IHNob2NrZWRfY29vbGRvd25cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1lbGVlX3BlbmFsdHkoZGF0YSkge1xyXG4gIGlmIChkYXRhLmF0dGFja190eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5oYXNPd25Qcm9wZXJ0eShcIm1lbGVlZFwiKSkgeyAvLyDQuNC90LDRh9C1INGN0YTRhNC10LrRgiDRg9C20LUg0L3QsNC70L7QttC10L0sINC90LUg0L/QvtCy0YLQvtGA0Y/QtdC8XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2RhdGEudGFyZ2V0X2lkXSAtIDFcclxuICAgICAgdmFyIG1lbGVlZF9vYmplY3QgPSB7fVxyXG4gICAgICBtZWxlZWRfb2JqZWN0LmNvb2xkb3duID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5tZWxlZWQgPSBtZWxlZWRfb2JqZWN0XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtkYXRhLnRhcmdldF9pZF0gPT0gMSkge1xyXG4gICAgICB2YXIgY29vbGRvd24gPSAxXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgY29vbGRvd24gPSAwXHJcbiAgICB9XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5tZWxlZWQuY29vbGRvd24gPSBjb29sZG93blxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZG9fZGFtYWdlKGNoYXJhY3Rlcl9udW1iZXIsIGRhbWFnZSkge1xyXG4gIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImZvcmNlX2ZpZWxkX3RhcmdldFwiKSkge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdIC0gZGFtYWdlXHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBzaGllbGRfaW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldC5zaGllbGRfaW5kZXhcclxuICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5zaGllbGQgLSBkYW1hZ2VcclxuICAgIHZhciBtZXNzYWdlID0gXCLQqdC40YIg0L/RgNC40L3Rj9C7INGD0YDQvtC9INC90LAg0YHQtdCx0Y8hINCe0YHRgtCw0LLRiNCw0Y/RgdGPINC/0YDQvtGH0L3QvtGB0YLRjDogXCIgKyBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZFxyXG4gICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgaWYgKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkIDw9IDApIHsvLyDRidC40YIg0YPQvdC40YfRgtC+0LbQtdC9XHJcbiAgICAgIHZhciBtZXNzYWdlID0gXCJQcmVzcyBGINCp0LjRgtGDLi4uXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICB2YXIgY2hhcl9saXN0ID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5jaGFyYWN0ZXJfbGlzdFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gY2hhcl9saXN0W2ldXHJcbiAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uZm9yY2VfZmllbGRfdGFyZ2V0XHJcbiAgICAgIH1cclxuICAgICAgZGVsZXRlX29iamVjdF9jb21tYW5kKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0ucG9zaXRpb24pXHJcbiAgICAgIGRlbGV0ZSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VfYmF0dGxlX21vZCgpIHtcclxuICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgIHZhciBuZXdfdmFsdWUgPSAwXHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBuZXdfdmFsdWUgPSAxXHJcbiAgfVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnYmF0dGxlX21vZCc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudmFsdWUgPSBuZXdfdmFsdWVcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuLy8ge2JvYXJkX3N0YXRlOiBbXSwgSFBfc3RhdGU6IFtdLCBpbml0aWF0aXZlX3N0YXRlOiBbXSwgZm9nX3N0YXRlOiBbXSwgem9uZV9zdGF0ZTogW10sIHNpemU6IDAsIHNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZTogW119O1xyXG5mdW5jdGlvbiBtaXJyb3JfYm9hcmQoKSB7XHJcbiAgdmFyIGxlZnRfaW5kZXg7XHJcbiAgdmFyIHJpZ2h0X2luZGV4O1xyXG4gIHZhciB0ZW1wO1xyXG4gIHZhciBsZWZ0X2NlbGw7XHJcbiAgdmFyIHJpZ2h0X2NlbGw7XHJcbiAgZm9yIChsZXQgeSA9IDA7IHkgPCBnYW1lX3N0YXRlLnNpemU7IHkrKykge1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBnYW1lX3N0YXRlLnNpemUvMjsgeCsrKSB7XHJcblxyXG4gICAgICBsZWZ0X2luZGV4ID0geSpnYW1lX3N0YXRlLnNpemUgKyB4O1xyXG4gICAgICByaWdodF9pbmRleCA9IHkqZ2FtZV9zdGF0ZS5zaXplICsgcGFyc2VJbnQoZ2FtZV9zdGF0ZS5zaXplKSAtIHggLSAxO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCd5OiAnICsgeSArICcgeDogJyArIHggKyAnIGxlZnQgaW5kZXg6ICcgKyBsZWZ0X2luZGV4ICsgJyByaWdodCBpbmRleDogJyArIHJpZ2h0X2luZGV4KTtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2xlZnRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbcmlnaHRfaW5kZXhdID0gdGVtcDtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2xlZnRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbcmlnaHRfaW5kZXhdID0gdGVtcDtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICBsZWZ0X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgbGVmdF9pbmRleCk7XHJcbiAgICAgIHJpZ2h0X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgcmlnaHRfaW5kZXgpO1xyXG5cclxuICAgICAgdGVtcCA9IGxlZnRfY2VsbC5zcmM7XHJcbiAgICAgIGxlZnRfY2VsbC5zcmMgPSByaWdodF9jZWxsLnNyYztcclxuICAgICAgcmlnaHRfY2VsbC5zcmMgPSB0ZW1wO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3luY19ib2FyZCgpIHtcclxuICB2YXIgZnVsbF9nYW1lX3N0YXRlID0ge1xyXG4gICAgZ2FtZV9zdGF0ZTogZ2FtZV9zdGF0ZSxcclxuICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvOiBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyxcclxuICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm86IG9ic3RhY2xlX2RldGFpbGVkX2luZm8sXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGU6IGNoYXJhY3Rlcl9zdGF0ZVxyXG4gIH07XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdzeW5jX2JvYXJkJztcclxuICB0b1NlbmQuZnVsbF9nYW1lX3N0YXRlID0gZnVsbF9nYW1lX3N0YXRlO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyX2NoYXJhY3Rlcl9zdGF0ZSgpIHtcclxuICBjaGFyYWN0ZXJfc3RhdGUgPSBDSEFSQUNURVJfU1RBVEVfQ09OU1RBTlRcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJfY2hhcmFjdGVyKG51bWJlcikge1xyXG4gIC8vY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuSFBbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tudW1iZXJdID0ge31cclxuICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtudW1iZXJdID0gbnVsbFxyXG59XHJcblxyXG5mdW5jdGlvbiB3X29uY2xpY2soKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9PSAxKSB7XHJcbiAgICB1bmRvX3NlbGVjdGlvbigpXHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBpbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gICAgdmFyIGNlbGwgPSBjaGFyYWN0ZXJfY2hvc2VuLmNlbGxcclxuICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShpbmRleCwgY2VsbCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhX29uY2xpY2soKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9PSAyKSB7XHJcbiAgICBzdG9wX2F0dGFjaygpXHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgICB2YXIgY2VsbCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2VsbFxyXG4gICAgdmFyIG1haW5fYWN0aW9uc19sZWZ0ID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBpZiAobWFpbl9hY3Rpb25zX2xlZnQgPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fYXR0YWNrKGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCjINCy0LDRgSDQvdC1INC+0YHRgtCw0LvQvtGB0Ywg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vc29ja2V0LmluaXQoJ3dzOi8vbG9jYWxob3N0OjMwMDEnKTtcclxuc29ja2V0LmluaXQoU0VSVkVSX0FERFJFU1MpO1xyXG5cclxuc29ja2V0LnJlZ2lzdGVyT3BlbkhhbmRsZXIoKCkgPT4ge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdwbGF5ZXJfaW5mbyc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9sZSA9IG15X3JvbGU7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgdG9TZW5kLnBhc3N3b3JkID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdnbV9wYXNzd29yZCcpKTtcclxuICB9XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0pO1xyXG5cclxuc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoKGRhdGEpID0+IHtcclxuICAvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG4gIGlmICgoKGRhdGEudG9fbmFtZSA9PSBteV9uYW1lKSB8fCAoZGF0YS50b19uYW1lID09ICdhbGwnKSkgJiYgKGRhdGEucm9vbV9udW1iZXIgPT0gbXlfcm9vbSkpIHtcclxuICAgIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3BsYXllcl9pbmZvX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5pc1ZhbGlkID09IDApIHtcclxuICAgICAgICBhbGVydCgn0KLQsCDQutCw0LrQvtC5INGC0Ysg0LPQvCcpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRhdGEucm9sZSA9PSAnZ20nKSB7XHJcbiAgICAgICAgY3JlYXRlX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgc2F2ZV9ib2FyZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIGxvYWRfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuICAgICAgICByb2xsX2luaXRpYXRpdmVfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBmb2dfYnV0dG9uLnNob3coKTtcclxuICAgICAgICB6b25lX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgc2F2ZV9uYW1lX2lucHV0LnNob3coKTtcclxuICAgICAgICBib2FyZF9zaXplX2lucHV0LnNob3coKTtcclxuICAgICAgICBtaXJyb3JfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBuZXh0X3JvdW5kX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgYmF0dGxlX21vZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHN5bmNfYnV0dG9uLnNob3coKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGU7XHJcbiAgICAgICAgICAgIC8vIHFcclxuICAgICAgICAgICAgaWYoa2V5Q29kZSA9PSA4MSkge1xyXG4gICAgICAgICAgICAgICAgZm9nTW9kZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT0gODcpIHsgLy8gd1xyXG4gICAgICAgICAgICAgIHdfb25jbGljaygpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PSA2NSkgeyAvLyBhXHJcbiAgICAgICAgICAgICAgYV9vbmNsaWNrKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0O1xyXG4gICAgICBvYnN0YWNsZV9saXN0ID0gZGF0YS5vYnN0YWNsZV9saXN0O1xyXG4gICAgICB3ZWFwb25fbGlzdCA9IGRhdGEud2VhcG9uX2xpc3RcclxuICAgICAgd2VhcG9uX2RldGFpbGVkX2luZm8gPSBkYXRhLndlYXBvbl9kZXRhaWxlZF9pbmZvXHJcbiAgICAgIHNraWxsX2xpc3QgPSBkYXRhLnNraWxsX2xpc3RcclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnY29uc3RydWN0X2JvYXJkX3Jlc3BvbnNlJykge1xyXG4gICAgICBjbGVhcl9jaGFyYWN0ZXJfc3RhdGUoKVxyXG4gICAgICBjb25zdHJ1Y3RfYm9hcmQoZGF0YS5nYW1lX3N0YXRlKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdhZGRfY2hhcmFjdGVyX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gZGF0YS5jaGFyYWN0ZXJfaW5mbztcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3RlcjtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZGF0YS5jZWxsX2lkXSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGRhdGEuY2VsbF9pZCk7XHJcbiAgICAgICAgY2VsbC5zcmMgPSBjaGFyYWN0ZXIuYXZhdGFyO1xyXG4gICAgICB9XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZGF0YS5jZWxsX2lkXSA9IGRhdGEuY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IG1vdmVfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGJvbnVzX2FjdGlvbl9tYXBbY2hhcmFjdGVyLmFnaWxpdHldO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IG1haW5fYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyLktEX3BvaW50cztcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAxO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gXCJhbGxcIjtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXIuaW52ZW50b3J5WzBdXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0ge31cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBkYXRhLmNlbGxfaWQ7XHJcblxyXG5cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdhZGRfb2JzdGFjbGVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBvYnN0YWNsZSA9IGRhdGEub2JzdGFjbGVfaW5mbztcclxuICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tkYXRhLm9ic3RhY2xlX251bWJlcl0gPSBvYnN0YWNsZTtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZGF0YS5jZWxsX2lkXSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGRhdGEuY2VsbF9pZCk7XHJcbiAgICAgICAgY2VsbC5zcmMgPSBvYnN0YWNsZS5hdmF0YXI7XHJcbiAgICAgIH1cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmNlbGxfaWRdID0gZGF0YS5vYnN0YWNsZV9udW1iZXIgKiAoLTEpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ21vdmVfY2hhcmFjdGVyX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgdG9faW5kZXggPSBkYXRhLnRvX2luZGV4O1xyXG4gICAgICB2YXIgZnJvbV9pbmRleCA9IGRhdGEuZnJvbV9pbmRleDtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVt0b19pbmRleF0gPSBkYXRhLmNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gdG9faW5kZXg7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuaW52aXNpYmlsaXR5X2VuZGVkX2lkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGlkID0gZGF0YS5pbnZpc2liaWxpdHlfZW5kZWRfaWRbaV07XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtpZF0gPSBcImFsbFwiO1xyXG5cclxuICAgICAgICB2YXIgcG9zaXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25baWRdO1xyXG4gICAgICAgIHZhciB0b19jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHBvc2l0aW9uKTtcclxuICAgICAgICB2YXIgYXZhdGFyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baWRdLmF2YXRhcjtcclxuICAgICAgICB0b19jZWxsLnNyYyA9IGF2YXRhcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcmVtb3ZlIHNoaWVsZGVkIHByb3BlcnR5IGZyb20gY2hhcmFjdGVyIGFuZCByZW1vdmUgY2hhcmFjdGVyIGZyb20gc2hpZWxkZWQgbGlzdFxyXG4gICAgICBpZiAoZGF0YS5sZWZ0X3NoaWVsZCA9PSAxKSB7XHJcbiAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXRcclxuICAgICAgICB2YXIgaW5kZXggPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tkYXRhLnNoaWVsZF9pbmRleF0uY2hhcmFjdGVyX2xpc3QuaW5kZXhPZihkYXRhLmNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbZGF0YS5zaGllbGRfaW5kZXhdLmNoYXJhY3Rlcl9saXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAxO1xyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBzdGFtaW5hX21vdmVfY29zdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBkYXRhLmRpc3RhbmNlXHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICBpZiAoY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcInNuaXBlclwiKSB7XHJcbiAgICAgICAgICB2YXIgZWZmZWN0c19vYmplY3QgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIGlmIChlZmZlY3RzX29iamVjdC5oYXNPd25Qcm9wZXJ0eShcInNuaXBlcl9wYXNzaXZlXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50X2F0dGFja19ib251cyA9IGVmZmVjdHNfb2JqZWN0LnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251c1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudF9kYW1hZ2VfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gY3VycmVudF9hdHRhY2tfYm9udXMgLSA1XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIGN1cnJlbnRfZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHNuaXBlcl9wYXNzaXZlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUgPSBzbmlwZXJfcGFzc2l2ZV9vYmplY3RcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gNVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCEoKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW3RvX2luZGV4XSA9PSAxKSkgfHwgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAhPSBcImFsbFwiICYmIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAhPSBteV9uYW1lKSkpIHtcclxuICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcbiAgICAgICAgdG9fY2VsbC5zcmMgPSBkYXRhLmNoYXJhY3Rlcl9hdmF0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtmcm9tX2luZGV4XSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBmcm9tX2luZGV4KTtcclxuICAgICAgICBvbGRfY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlbGV0ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiY2hhcmFjdGVyX251bWJlclwiKSkge1xyXG4gICAgICAgIGNsZWFyX2NoYXJhY3RlcihkYXRhLmNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgIH1cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmluZGV4XSA9IDA7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuaW5kZXhdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEuaW5kZXgpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdyb2xsX2luaXRpYXRpdmVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlID0gZGF0YS5pbml0aWF0aXZlX3N0YXRlO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlYWxfZGFtYWdlX3Jlc3BvbnNlJykge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gZGF0YS5kYW1hZ2U7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2F2ZV9nYW1lX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICBhbGVydCgnR2FtZSAnICsgZGF0YS5zYXZlX25hbWUgKyAnIHNhdmVkIHN1Y2Nlc2Z1bGx5Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0dhbWUgd2l0aCBuYW1lICcgKyBkYXRhLnNhdmVfbmFtZSArICcgYWxyZWFkeSBleGlzdCEnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2xvYWRfZ2FtZV9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IGRhdGEuZnVsbF9nYW1lX3N0YXRlO1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfc3RhdGU7XHJcbiAgICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX2RldGFpbGVkX2luZm87XHJcbiAgICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5vYnN0YWNsZV9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICAgIGNvbnN0cnVjdF9ib2FyZChmdWxsX2dhbWVfc3RhdGUuZ2FtZV9zdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBsb2FkIGdhbWUgJyArIGRhdGEuc2F2ZV9uYW1lKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3N5bmNfYm9hcmRfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBmdWxsX2dhbWVfc3RhdGUgPSBkYXRhLmZ1bGxfZ2FtZV9zdGF0ZTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlID0gZnVsbF9nYW1lX3N0YXRlLmNoYXJhY3Rlcl9zdGF0ZTtcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX2RldGFpbGVkX2luZm87XHJcbiAgICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUub2JzdGFjbGVfZGV0YWlsZWRfaW5mbztcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGZ1bGxfZ2FtZV9zdGF0ZS5nYW1lX3N0YXRlKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICd1cGRhdGVfZm9nX3Jlc3BvbnNlJykge1xyXG5cdFx0XHRcdHZhciBpbmRleCA9IGRhdGEuaW5kZXg7XHJcblx0XHRcdFx0dmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgaW5kZXgpO1xyXG5cdFx0XHRcdGlmIChkYXRhLnVwZGF0ZV90eXBlID09ICdyZW1vdmUnKSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAwO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAxO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBGT0dfSU1BR0U7XHJcblx0XHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2Fzc2lnbl96b25lX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgaW5kZXhfbGlzdCA9IGRhdGEuaW5kZXhfbGlzdFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4X2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaW5kZXhfbGlzdFtpXV0gPSBkYXRhLnpvbmVfbnVtYmVyO1xyXG4gICAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2luZGV4X2xpc3RbaV1dID0gZGF0YS5tb2RpZmljYXRvcjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9yZXNwb25zZScpIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGRhdGEubmV3X3ZhbHVlO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NpbXBsZV9yb2xsX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IGRhdGEuY2hhcmFjdGVyX25hbWUgKyBcIiDQsdGA0L7RgdCw0LXRgiBcIiArIGRhdGEucm9sbFxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2tpbGxfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciB1c2VyX2luZGV4ID0gZGF0YS51c2VyX2luZGV4XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbdXNlcl9pbmRleF0gPSAxXHJcbiAgICAgIHN3aXRjaChkYXRhLnNraWxsX2luZGV4KSB7XHJcbiAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3VzZXJfaW5kZXhdICsgY2hhcmdlX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGB0L7QstC10YDRiNCw0LXRgiDRgNGL0LLQvtC6XCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0X2luZGV4ID0gZGF0YS50YXJnZXRfaW5kZXhcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pbmRleF1cclxuICAgICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gKyBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIDFcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldCA9IHt9XHJcbiAgICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldC5taW51c19hY3Rpb25zID0gZGF0YS5taW51c19hY3Rpb25zXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2luZGV4XS5hZHJlbmFsaW5lX3RhcmdldCA9IGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldFxyXG5cclxuICAgICAgICAgICAgdmFyIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIgPSB7fVxyXG4gICAgICAgICAgICBhZHJlbmFsaW5lX29iamVjdF91c2VyLmNvb2xkb3duID0gM1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFkcmVuYWxpbmVfdXNlciA9IGFkcmVuYWxpbmVfb2JqZWN0X3VzZXJcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0LjRgdC/0L7Qu9GM0LfRg9C10YIg0L/RgNC40LvQuNCyINCw0LTRgNC10L3QsNC70LjQvdCwLiBcIiAgKyB0YXJnZXQubmFtZSArIFwiINC/0L7Qu9GD0YfQsNC10YIgXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnMgKyBcIiDQtNC10LnRgdGC0LLQuNC5LiDQrdGC0L4g0LHRg9C00LXRgiDRgdGC0L7QuNGC0YwgXCIgKyBkYXRhLm1pbnVzX2FjdGlvbnMgKyBcIiDQtNC10LnRgdGC0LLQuNC5INC90LAg0YHQu9C10LTRg9GO0YnQuNC5INGF0L7QtC5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBzdGFtaW5hX2N1dF9saW1iX2Nvc3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS5cIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5za2lsbF9vdXRjb21lID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBsaW1iX2N1dF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgICBsaW1iX2N1dF9vYmplY3QuY29vbGRvd24gPSBjb29sZG93bl9jdXRfbGltYlxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5jdXRfbGltYiA9IGxpbWJfY3V0X29iamVjdFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gLTEwXHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC/0L7QtNGA0LXQt9Cw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdC10LfRg9GB0L/QtdGI0L3QviDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnNraWxsX291dGNvbWUgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGxpbWJfY3V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgIGxpbWJfY3V0X29iamVjdC5jb29sZG93biA9IGNvb2xkb3duX2N1dF9saW1iXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmN1dF9saW1iID0gbGltYl9jdXRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAtMTBcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L/QvtC00YDQtdC30LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdC10LfRg9GB0L/QtdGI0L3QviDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgICAgIHZhciBsaW1iX2N1dF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIGxpbWJfY3V0X29iamVjdC5jb29sZG93biA9IGNvb2xkb3duX2N1dF9saW1iICsgMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmN1dF9saW1iID0gbGltYl9jdXRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IC0xMFxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INC/0L7QtNGA0LXQt9Cw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHN0YW1pbmFfd2Vha3Nwb3RfY29zdFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGRhdGEub3V0Y29tZSA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICB2YXIgd2Vha3Nwb3Rfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgd2Vha3Nwb3Rfb2JqZWN0Lmh1bnRlcl9pZCA9IHVzZXJfaW5kZXhcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ud2Vha3Nwb3QgPSB3ZWFrc3BvdF9vYmplY3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L7QsdC90LDRgNGD0LbQuNC7INGB0LvQsNCx0L7QtSDQvNC10YHRgtC+IFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC90LUg0YPQtNCw0LvQvtGB0Ywg0L7QsdC90LDRgNGD0LbQuNGC0Ywg0YHQu9Cw0LHQvtC1INC80LXRgdGC0L4gXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgNDpcclxuICAgICAgICB2YXIgaGVhbGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgdmFyIGNvb2xkb3duID0gMFxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVt1c2VyX2luZGV4XSA+IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2RhdGEudGFyZ2V0X2lkXSkge1xyXG4gICAgICAgICAgLy8g0L/QsNGG0LjQtdC90YIg0L3QtSDRhdC+0LTQuNGCINCyINGN0YLQvtGCINC20LUg0YXQvtC0XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgY29vbGRvd24gPSAwXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvb2xkb3duID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaGVhbGVkX29iamVjdCA9IHt9XHJcbiAgICAgICAgaGVhbGVkX29iamVjdC5jb29sZG93biA9IGNvb2xkb3duXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uaGVhbGVkID0gaGVhbGVkX29iamVjdFxyXG4gICAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImZhaWxcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC90LUg0L/QvtC70YPRh9C40LvQvtGB0Ywg0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC/0L7Qu9GD0YfQuNC70L7RgdGMINGD0YHQv9C10YjQvdC+INCy0YvQu9C10YfQuNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuaGVhbF9yb2xsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGRhdGEubmV3X2hwXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjcml0aWNhbCBzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCjIFwiICsgaGVhbGVyLm5hbWUgKyBcIiDQv9C+0LvRg9GH0LjQu9C+0YHRjCDQutGA0LjRgtC40YfQtdGB0LrQuCAoMiDRgdGC0LXQv9C10L3QuCkg0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gZGF0YS5uZXdfaHBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0YDQsNC30LHQvtGA0LUg0L7RgtGF0LjQu9CwXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB2YXIgc2hpZWxkID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQt9Cw0YnQuNGC0LjQuyBcIiArICB0YXJnZXQubmFtZSArIFwiICgrXCIgKyBkYXRhLmJvbnVzX0tEICsgXCLQutC0KVwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2RhdGEudGFyZ2V0X2lkXSArIGRhdGEuYm9udXNfS0RcclxuICAgICAgICAgIHZhciBiaWdfYnJvX29iamVjdCA9IHt9XHJcbiAgICAgICAgICBiaWdfYnJvX29iamVjdC5jb29sZG93biA9IGNvb2xkb3duX2JpZ19icm9cclxuICAgICAgICAgIGJpZ19icm9fb2JqZWN0LmJvbnVzX0tEID0gZGF0YS5ib251c19LRFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uYmlnX2JybyA9IGJpZ19icm9fb2JqZWN0XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICB2YXIgc2hpZWxkID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGlmIChkYXRhLm91dGNvbWUgPT0gXCJzaGllbGRfdXBcIikge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gKyBzaGllbGRfdXBfS0RcclxuICAgICAgICAgICAgdmFyIHNoaWVsZF91cF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBzaGllbGRfdXBfb2JqZWN0LnN0YW1pbmFfY29zdCA9IHNoaWVsZF91cF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgICAgc2hpZWxkX3VwX29iamVjdC5LRCA9IHNoaWVsZF91cF9LRFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnNoaWVsZF91cCA9IHNoaWVsZF91cF9vYmplY3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaGllbGQubmFtZSArIFwiINC/0L7QtNC90Y/QuyDRidC40YLRiyDQt9CwINGH0LDRglwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2luZGV4XSAtIHNoaWVsZF91cF9LRFxyXG4gICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5zaGllbGRfdXBcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaGllbGQubmFtZSArIFwiINC+0L/Rg9GB0YLQuNC7INGJ0LjRgi4g0KfQsNGCINC/0YDQvtGB0YLQuChcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcblxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gLSBkYXRhLmRhbWFnZVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmhhc093blByb3BlcnR5KFwiTWFya3VzX3N0YWNrc1wiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5NYXJrdXNfc3RhY2tzID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uTWFya3VzX3N0YWNrcyArIDJcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLk1hcmt1c19zdGFja3MgPSAyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcImJpb3Bvb2xcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sICsgZGF0YS5kYW1hZ2VcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCA9IGRhdGEuZGFtYWdlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQvdCw0L3QvtGB0LjRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAg0L7RgiDQutC+0YLQvtGA0L7Qs9C+INC90LXQstC+0LfQvNC+0LbQvdC+INGD0LLQtdGA0L3Rg9GC0YzRgdGPXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgIHZhciBoZWFsZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gMVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdICsgZGF0YS5oZWFsX2Ftb3VudFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sIC0gZGF0YS5oZWFsX2Ftb3VudFxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBoZWFsZXIubmFtZSArIFwiINCy0L7RgdGB0YLQsNC90LDQu9C40LLQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIFwiICsgZGF0YS5oZWFsX2Ftb3VudCArIFwiINGF0L9cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSArIDFcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC80LXQvdGP0LXRgiDQvtCx0YvRh9C90L7QtSDQvdCwINCx0L7QvdGD0YHQvdC+0LUg0LTQtdC50YHRgtCy0LjQtVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gZGF0YS5uZXdfc3RhbWluYVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L7RgtC00YvRhdCw0LXRgi4g0KXQvtGA0L7RiNC10LPQviDQvtGC0L/Rg9GB0LrQsCFcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDEyOlxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gZ2FzX2JvbWJfc3RhbWluYV9jb3N0XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LHRgNC+0YHQsNC10YIg0LPQsNC30L7QstGD0Y4g0LHQvtC80LHRgy4g0KHQvtCy0LXRgtGD0LXQvCDQt9Cw0LTQtdGA0LbQsNGC0Ywg0LTRi9GF0LDQvdC40LUuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgICAgdmFyIGJvbWJfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgYm9tYl9vYmplY3QudHlwZSA9IFwiZ2FzX2JvbWJcIlxyXG4gICAgICAgICAgICBib21iX29iamVjdC5wb3NpdGlvbiA9IGRhdGEucG9zaXRpb25cclxuICAgICAgICAgICAgYm9tYl9vYmplY3QudGhyZXNob2xkID0gZGF0YS50aHJlc2hvbGRcclxuICAgICAgICAgICAgYm9tYl9vYmplY3QucmFkaXVzID0gM1xyXG4gICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5wdXNoKGJvbWJfb2JqZWN0KVxyXG5cclxuICAgICAgICAgICAgdmFyIGdhc19ib21iX3VzZXIgPSB7fVxyXG4gICAgICAgICAgICBnYXNfYm9tYl91c2VyLmNvb2xkb3duID0gZ2FzX2JvbWJfc2tpbGxfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5nYXNfYm9tYl91c2VyID0gZ2FzX2JvbWJfdXNlclxyXG5cclxuICAgICAgICAgICAgdmFyIGluaXRpYWxfcmFkaXVzID0gMlxyXG5cclxuICAgICAgICAgICAgYXBwbHlfYm9tYihkYXRhLnBvc2l0aW9uLCBpbml0aWFsX3JhZGl1cylcclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDEzOlxyXG4gICAgICAgICAgICB2YXIgbGlnaHRfc291bmRfYm9tYl91c2VyID0ge31cclxuICAgICAgICAgICAgbGlnaHRfc291bmRfYm9tYl91c2VyLmNvb2xkb3duID0gbGlnaHRfc291bmRfYm9tYl9za2lsbF9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmxpZ2h0X3NvdW5kX2JvbWJfdXNlciA9IGxpZ2h0X3NvdW5kX2JvbWJfdXNlclxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLm91dGNvbWVfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gZGF0YS5jaGFyYWN0ZXJfbGlzdFtpXVxyXG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgICAgIGlmIChkYXRhLm91dGNvbWVfbGlzdFtpXSA9PSAwKSB7IC8vINCf0YDQvtGI0LXQuyDRgdC/0LDRgdCx0YDQvtGB0L7QulxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGD0YHQv9C10Lsg0L/RgNC40LrRgNGL0YLRjCDQs9C70LDQt9CwXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC+0YHQu9C10L8g0L3QsCAyINGF0L7QtNCwXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYmxpbmRcIikpIHsvLyDQvdC1INC90LDQutC70LDQtNGL0LLQstCw0LXQvCDQtdGJ0LUg0YjRgtGA0LDRhFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmJsaW5kLmNvb2xkb3duID0gMlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGJsaW5kX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgIGJsaW5kX29iamVjdC5jb29sZG93biA9IDJcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5ibGluZCA9IGJsaW5kX29iamVjdFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdIC0gMlxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSAtIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTQ6XHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlICE9ICdyb2d1ZScpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgIHNob2NrZWRfZWZmZWN0KGRhdGEudGFyZ2V0X2lkKVxyXG5cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YHRgtGA0LXQu9GP0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjyDQuCDRiNC+0LrQuNGA0YPQtdGCINGG0LXQu9GMICjRg9GP0LfQstC40LzQvtGB0YLRjCkuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgIHNob2NrZWRfZWZmZWN0KGRhdGEudGFyZ2V0X2lkKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKSDQuCDRiNC+0LrQuNGA0YPQtdGCINGG0LXQu9GMICjRg9GP0LfQstC40LzQvtGB0YLRjCkuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgIHNob2NrZWRfZWZmZWN0KGRhdGEudGFyZ2V0X2lkKVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0L/QvtC/0LDQtNCw0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPINC4INGI0L7QutC40YDRg9C10YIg0YbQtdC70YwuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE1OlxyXG4gICAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldF9pbmRleCA9IGRhdGEudGFyZ2V0X2luZGV4XHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2luZGV4XVxyXG4gICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gKyBwaWNoX3BpY2hfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gKyAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgcGljaF9waWNoX29iamVjdF90YXJnZXQgPSB7fVxyXG4gICAgICAgICAgcGljaF9waWNoX29iamVjdF90YXJnZXQuZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaW5kZXhdLnBpY2hfcGljaF90YXJnZXQgPSBwaWNoX3BpY2hfb2JqZWN0X3RhcmdldFxyXG5cclxuICAgICAgICAgIHZhciBwaWNoX3BpY2hfb2JqZWN0X3VzZXIgPSB7fVxyXG4gICAgICAgICAgcGljaF9waWNoX29iamVjdF91c2VyLmNvb2xkb3duID0gcGljaF9waWNoX2Nvb2xkb3duXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnBpY2hfcGljaF91c2VyID0gcGljaF9waWNoX29iamVjdF91c2VyXHJcblxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQn9GL0Ykt0J/Ri9GJLdCT0L7Rgy4gXCIgICsgdGFyZ2V0Lm5hbWUgKyBcIiDQv9C+0LvRg9GH0LDQtdGCIFwiICsgZGF0YS5leHRyYV9hY3Rpb25zICsgXCIg0LTQvtC/INC00LXQudGB0YLQstC40Lkg0L3QsCDRjdGC0L7RgiDQuCDRgdC70LXQtNGD0Y7RidC40Lkg0YXQvtC0LlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE2OlxyXG4gICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGZvcmNlX2ZpZWxkX3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzaGllbGRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC50eXBlID0gXCJmb3JjZV9maWVsZFwiXHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3QucG9zaXRpb24gPSBkYXRhLnBvc2l0aW9uXHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3QucmFkaXVzID0gZm9yY2VfZmllbGRfcmFkaXVzXHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3Quc2hpZWxkID0gZGF0YS5zaGllbGRcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5jaGFyYWN0ZXJfbGlzdCA9IGRhdGEuY2hhcmFjdGVyX2xpc3RcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5jZWxsc19wcm90ZWN0ZWQgPSBkYXRhLmNlbGxzX3Byb3RlY3RlZFxyXG4gICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5wdXNoKHNoaWVsZF9vYmplY3QpXHJcblxyXG4gICAgICAgICAgICB2YXIgc2hpZWxkX2luZGV4ID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMubGVuZ3RoIC0gMVxyXG4gICAgICAgICAgICB2YXIgY2hhcl9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfbGlzdFxyXG5cclxuICAgICAgICAgICAgdmFyIGZvcmNlX2ZpZWxkX3RhcmdldCA9IHt9XHJcbiAgICAgICAgICAgIGZvcmNlX2ZpZWxkX3RhcmdldC5zaGllbGRfaW5kZXggPSBzaGllbGRfaW5kZXhcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcl9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyX2xpc3RbaV1cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldCA9IGZvcmNlX2ZpZWxkX3RhcmdldFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9yY2VfZmllbGRfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGZvcmNlX2ZpZWxkX3VzZXIuY29vbGRvd24gPSBmb3JjZV9maWVsZF9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmZvcmNlX2ZpZWxkX3VzZXIgPSBmb3JjZV9maWVsZF91c2VyXHJcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LDQutGC0LjQstC40YDRg9C10YIg0YHQuNC70L7QstC+0LUg0L/QvtC70LVcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE3OiAvLyDQuNC90LLQuNC3XHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W3VzZXJfaW5kZXhdID0gZGF0YS51c2VybmFtZVxyXG4gICAgICAgICAgaWYgKG15X25hbWUgIT0gZGF0YS51c2VybmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBkYXRhLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE4OiAvLyDQsdC+0LXQstCw0Y8g0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtGMXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gLTE7XHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsNC60YLQuNCy0LjRgNGD0LXRgiDQsdC+0LXQstGD0Y4g0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtGMXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE5OiAvLyDQu9Cw0LrQuCDRiNC+0YJcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gbHVja3lfc2hvdF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGF0YS5yb2xsID09IDcpIHtcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZSlcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCj0LTQsNGH0LAg0LHQu9Cw0LPQvtCy0L7Qu9C40YIgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiLCDQutC+0YLQvtGA0YvQuSDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsCBcIiArIHRhcmdldC5uYW1lXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGRhdGEucm9sbCArIFwiINGN0YLQviDQvdC1INGH0LjRgdC70L4gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiLCDRgtCw0Log0YfRgtC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQuNC30LHQtdCz0LDQtdGCINCw0YLQsNC60LguXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjA6IC8vIGxvdHRlcnlfc2hvdFxyXG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBsb3R0ZXJ5X3Nob3Rfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGRhdGEucm9sbCA9PSA3KSB7XHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQmtCw0LrQsNGPINGD0LTQsNGH0LAhINCk0L7RgNGC0YPQvdCwINGP0LLQvdC+INC90LAg0YHRgtC+0YDQvtC90LUgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiLCDQutC+0YLQvtGA0YvQuSDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsCBcIiArIHRhcmdldC5uYW1lXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucm9sbCA9PSA3Nykge1xyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JTQttC10LrQv9C+0YIhIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC10LPQvtC00L3RjyDRgdGC0L7QuNGCINC60YPQv9C40YLRjCDQu9C+0YLQtdGA0LXQudC90YvQuSDQsdC40LvQtdGCLCDQsCDQv9C+0LrQsCDQvtC9INC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwIFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5yb2xsICsgXCIg0Y3RgtC+INC90LUg0YfQuNGB0LvQviBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINGC0LDQuiDRh9GC0L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINC40LfQsdC10LPQsNC10YIg0LDRgtCw0LrQuC5cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyMTogLy/QstGB0L/Qu9C10YHQuiDQtNC10LnRgdGC0LLQuNC5XHJcbiAgICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gKyBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGFjdGlvbl9zcGxhc2hfc3RhbWluYV9jb3N0KmRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciBhY3Rpb25fc3BsYXNoX29iamVjdCA9IHt9XHJcbiAgICAgICAgICBhY3Rpb25fc3BsYXNoX29iamVjdC5jb29sZG93biA9IGFjdGlvbl9zcGxhc2hfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWN0aW9uX3NwbGFzaCA9IGFjdGlvbl9zcGxhc2hfb2JqZWN0XHJcblxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQstGB0L/Qu9C10YHQuiDQtNC10LnRgdGC0LLQuNC5INC4INC/0L7Qu9GD0YfQsNC10YIgXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnMgKyBcIiDQvtGB0L3QvtCy0L3Ri9GFINC00LXQudGB0YLQstC40Lkg0LLQvNC10YHRgtC+INCx0L7QvdGD0YHQvdGL0YUuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyMjogLy8g0LPRgNCw0LQg0YPQtNCw0YDQvtCyXHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBwdW5jaF9yYWluZmFsbF9zdGFtaW5hX2Nvc3QqZGF0YS50b3RhbF9hdHRhY2tzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZGF0YS5kYW1hZ2UgPiAwKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlKVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC90LDQvdC+0YHQuNGCINCz0YDQsNC0INC40LcgXCIgKyBkYXRhLnRvdGFsX2F0dGFja3MgKyBcIiDRg9C00LDRgNC+0LIsINC40Lcg0LrQvtGC0L7RgNGL0YUgXCIgKyBkYXRhLnN1Y2Nlc3NmdWxsX2F0dGFja3MgKyBcIiDQv9C+0L/QsNC00LDRjtGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdCw0L3QvtGB0Y8gXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAuXCJcclxuXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBhbGVydChcIlJlY2VpdmVkIHVua25vd24gc2tpbGwgY29tbWFuZFwiKVxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ25ld19yb3VuZF9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIG1lc3NhZ2UgPSBcItCd0LDRh9Cw0LvQviDQvdC+0LLQvtCz0L4g0YDQsNGD0L3QtNCwIVwiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0gIT09IG51bGwgJiYgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgc3dpdGNoIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnYXNfYm9tYlwiOlxyXG4gICAgICAgICAgICAgICAgYXBwbHlfYm9tYihnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5wb3NpdGlvbiwgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cyA+PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZV9vYmplY3RfY29tbWFuZChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5wb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXSA9IG51bGxcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cyA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cyArIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJNZXNzZWQgdXAgcmVzb2x2aW5nIHRlcnJhaW4gZWZmZWN0c1wiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXIgIT09IHVuZGVmaW5lZCAmJiBjaGFyYWN0ZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbaV0gPSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2ldID0gMFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gbW92ZV9hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSBib251c19hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IG1haW5fYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJ0aXJlZFwiKSkgeyAvLyDQo9Cx0YDQsNGC0Ywg0LHQvtC90YPRgdGLINC+0YIg0YPRgdGC0LDQu9C+0YHRgtC4INC/0YDQvtGI0LvQvtCz0L4g0YXQvtC00LAgKNGH0YLQvtCx0Ysg0LrQvtCz0LTQsCDQsdGD0LTRg9GCINC90LDQutCw0LvQsNC00YvQstCw0YLRjNGB0Y8g0L3QvtCy0YvQtSDQvdC1INGI0YLRgNCw0YTQvtCy0LDRgtGMINC00LLQsNC20LTRiylcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkLmJvbnVzXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIDwgc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdICogMC42Nykge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPCBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0gKiAwLjM0KSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIDw9IDApIHsgLy8gM9GPINGB0YLQsNC00LjRj1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpcmVkX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICB0aXJlZF9vYmplY3QuYm9udXMgPSAtM1xyXG4gICAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LnN0YWdlID0gM1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50aXJlZCA9IHRpcmVkX29iamVjdFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSAzXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBNYXRoLmNlaWwoY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldKjAuMjUpXHJcbiAgICAgICAgICAgICAgICBpZiAoKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9PSAxKSYmKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPT0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSAxXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2UgeyAvLyAy0Y8g0YHRgtCw0LTQuNGPXHJcbiAgICAgICAgICAgICAgICB2YXIgdGlyZWRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgIHRpcmVkX29iamVjdC5ib251cyA9IC0yXHJcbiAgICAgICAgICAgICAgICB0aXJlZF9vYmplY3Quc3RhZ2UgPSAyXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkID0gdGlyZWRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIDJcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IE1hdGguY2VpbChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0qMC41KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gMdGPINGB0YLQsNC00LjRj1xyXG4gICAgICAgICAgICAgIHZhciB0aXJlZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIHRpcmVkX29iamVjdC5ib251cyA9IC0xXHJcbiAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LnN0YWdlID0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQgPSB0aXJlZF9vYmplY3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBNYXRoLmNlaWwoY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldKjAuNzUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInRpcmVkXCIpKSB7IC8vINC90LUg0YPRgdGC0LDQuyAtPiDRg9Cx0YDQsNGC0Ywg0YPRgdGC0LvQsNC70L7RgdGC0Ywg0LXRgdC70Lgg0LHRi9C70LBcclxuICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWRcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImxpZ2h0X3NvdW5kX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5saWdodF9zb3VuZF9ib21iX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmxpZ2h0X3NvdW5kX2JvbWJfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodCy0LXRgtC+0YjRg9C80L7QstCw0Y8g0LPRgNCw0L3QsNGC0LAg0YNcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LPQvtGC0L7QstCwINC6INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGOLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubGlnaHRfc291bmRfYm9tYl91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5saWdodF9zb3VuZF9ib21iX3VzZXIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFjdGlvbl9zcGxhc2hcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWN0aW9uX3NwbGFzaC5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWN0aW9uX3NwbGFzaFxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQstC90L7QstGMINC80L7QttC10YIg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINCy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40LkuXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY3Rpb25fc3BsYXNoLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY3Rpb25fc3BsYXNoLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3VzZXJcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JPQsNC30L7QstCw0Y8g0LPRgNCw0L3QsNGC0LAg0YNcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LPQvtGC0L7QstCwINC6INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGOLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfdXNlci5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiZm9yY2VfZmllbGRfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5mb3JjZV9maWVsZF91c2VyLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5mb3JjZV9maWVsZF91c2VyXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCh0LjQu9C+0LLQvtC1INC/0L7Qu9C1INGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC90L7QstCwINC30LDRgNGP0LbQtdC90L4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5mb3JjZV9maWVsZF91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5mb3JjZV9maWVsZF91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJwaWNoX3BpY2hfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXJcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KPQvNC10L3QuNC1INCf0YvRiS3Qn9GL0Ykg0YMgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINGB0L3QvtCy0LAg0LTQvtGB0YLRg9C/0L3Qvi5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biA9PSBwaWNoX3BpY2hfY29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSAwXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJwaWNoX3BpY2hfdGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF90YXJnZXQuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gKyAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3RhcmdldFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYWRyZW5hbGluZV91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZV91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hZHJlbmFsaW5lX3VzZXIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdXNlci5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZV91c2VyXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCj0LzQtdC90LjQtSDQn9GA0LjQu9C40LIg0JDQtNGA0LXQvdCw0LvQuNC90LAg0YMgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINGB0L3QvtCy0LAg0LTQvtGB0YLRg9C/0L3Qvi5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYWRyZW5hbGluZV90YXJnZXRcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgbWludXNfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZV90YXJnZXQubWludXNfYWN0aW9uc1xyXG4gICAgICAgICAgICAgIHdoaWxlIChtaW51c19hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pbnVzX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldIC0gYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtaW51c19hY3Rpb25zID0gbWludXNfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZV90YXJnZXRcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInNob2NrZWRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZC5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtpXSArIDFcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJjdXRfbGltYlwiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSAtMTBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYi5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY3V0X2xpbWIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodGD0YXQvtC20LjQu9C40Y8gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINCy0L7RgdGB0YLQsNC90L7QstGP0YLRgdGPINC90LAg0YHQu9C10LTRg9GO0YnQtdC8INGF0L7QtNGDLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJoZWFsZWRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGVhbGVkLmNvb2xkb3duID4gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSAwXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGVhbGVkLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJibGluZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biA+IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJsaW5kLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gKyAyXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCX0YDQtdC90LjQtSBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQvtGB0YHRgtCw0L3QvtCy0LjQu9C+0YHRjFwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyAtIDFcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJzaGllbGRfdXBcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gTWF0aC5jZWlsKGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXS8yKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIC0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaGllbGRfdXAuc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GA0L7QtNC+0LvQttCw0LXRgiDQtNC10YDQttCw0YLRjCDRidC40YIgKNGB0L/QsNGB0LjQsdC+KVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYmlnX2Jyb1wiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm8uYm9udXNfS0RcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGC0LXRgNGP0LXRgiDQt9Cw0YnQuNGC0YMg0JHQvtC70YzRiNC+0LPQviDQkdGA0LDRgtCwXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImdhc19ib21iX3BvaXNvblwiKSkge1xyXG4gICAgICAgICAgICB2YXIgY291bnQgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWxcclxuICAgICAgICAgICAgd2hpbGUgKGNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSAtIGdhc19ib21iX21vdmVfcmVkdWN0aW9uXHJcbiAgICAgICAgICAgICAgaWYgKGNvdW50ICUgMiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldIC0gMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb3VudCA9IGNvdW50IC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzYXZlX3JvbGwgPSBkYXRhLnNhdmVfcm9sbF9saXN0W2ldXHJcbiAgICAgICAgICAgIGlmIChzYXZlX3JvbGwgPj0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24udGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsIC0gMVxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQutC40LTQsNC10YIg0YHQv9Cw0YHQsdGA0L7RgdC+0Log0Lgg0YPQvNC10L3RjNGI0LDQtdGCINGB0YLQsNC00LjRjiDQvtGC0YDQsNCy0LvQtdC90LjRjyAo0YLQtdC/0LXRgNGMIFwiICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0YDQvtCy0LDQu9C40LLQsNC10YIg0YHQv9Cw0YHQsdGA0L7RgdC+0LouINCh0YLQsNC00LjRjyDQvtGC0YDQsNCy0LvQtdC90LjRjyDQvtGB0YLQsNC10YLRgdGPINC/0YDQtdC20L3QtdC5IChcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgPD0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvblxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsdC+0LvRjNGI0LUg0L3QtSDQvtGC0YDQsNCy0LvQtdC9IVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJtZWxlZWRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubWVsZWVkLmNvb2xkb3duIDw9IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWRcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldICsgMVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubWVsZWVkLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWQuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSAnc25pcGVyJykge1xyXG4gICAgICAgICAgICB2YXIgZWZmZWN0c19vYmplY3QgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldXHJcbiAgICAgICAgICAgIGlmIChlZmZlY3RzX29iamVjdC5oYXNPd25Qcm9wZXJ0eShcInNuaXBlcl9wYXNzaXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfYXR0YWNrX2JvbnVzID0gZWZmZWN0c19vYmplY3Quc25pcGVyX3Bhc3NpdmUuYXR0YWNrX2JvbnVzXHJcbiAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfZGFtYWdlX2JvbnVzID0gZWZmZWN0c19vYmplY3Quc25pcGVyX3Bhc3NpdmUuZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnRfYXR0YWNrX2JvbnVzID09IC01KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2F0dGFja19ib251cyA9IDBcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2F0dGFja19ib251cyA9IE1hdGgubWluKGN1cnJlbnRfYXR0YWNrX2JvbnVzICsgMSwgNClcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfZGFtYWdlX2JvbnVzID0gTWF0aC5taW4oY3VycmVudF9kYW1hZ2VfYm9udXMgKyAyLCA4KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tpXSAtIGN1cnJlbnRfYXR0YWNrX2JvbnVzICsgbmV3X2F0dGFja19ib251c1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2ldIC0gY3VycmVudF9kYW1hZ2VfYm9udXMgKyBuZXdfZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXMgPSBuZXdfYXR0YWNrX2JvbnVzXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXMgPSBuZXdfZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIHNuaXBlcl9wYXNzaXZlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmF0dGFja19ib251cyA9IDBcclxuICAgICAgICAgICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc25pcGVyX3Bhc3NpdmUgPSBzbmlwZXJfcGFzc2l2ZV9vYmplY3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2JhdHRsZV9tb2RfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9IGRhdGEudmFsdWVcclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAwKSB7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCR0L7QuSDQvtC60L7QvdGH0LXQvSEg0J3QsNGB0YLRg9C/0LjQuyDQvNC40YAg0LLQviDQstGB0LXQvCDQvNC40YDQtVwiXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCd0LDRh9Cw0LvQviDQsdC+0Y8hINCb0Y7QtNC4INGD0LzQuNGA0LDRjtGCLCDQtdGB0LvQuCDQuNGFINGD0LHQuNGC0YxcIlxyXG4gICAgICB9XHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdyZXNvbHZlX2F0dGFja19yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuYXR0YWNrX3R5cGUgPT0gXCJyYW5nZWRcIikge1xyXG4gICAgICAgIHZhciBhdWRpbyA9IGd1bnNob3RfYXVkaW9cclxuICAgICAgfSBlbHNlIGlmIChkYXRhLmF0dGFja190eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgICAgIHZhciBhdWRpbyA9IHN3b3JkX2F1ZGlvXHJcbiAgICAgIH1cclxuICAgICAgYXVkaW8ucGxheSgpO1xyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5hdHRhY2tlcl9pZF0gIT0gXCJhbGxcIikge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5hdHRhY2tlcl9pZF0gPSBcImFsbFwiXHJcbiAgICAgICAgdmFyIGF0dGFja2VyX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgZGF0YS5hdHRhY2tlcl9wb3NpdGlvbik7XHJcbiAgICAgICAgYXR0YWNrZXJfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmF0dGFja2VyX2lkXS5hdmF0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuYXR0YWNrZXJfaWRdXHJcbiAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtkYXRhLmF0dGFja2VyX2lkXSA9IDFcclxuXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuYXR0YWNrZXJfaWRdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5hdHRhY2tlcl9pZF0gLSBzdGFtaW5hX2F0dGFja19jb3N0XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEuYXR0YWNrZXJfaWRdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEuYXR0YWNrZXJfaWRdIC0gMVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5jb3Zlcl9sZXZlbCA+IDApIHtcclxuICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCLQo9GA0L7QstC10L3RjCDRg9C60YDRi9GC0LjRjzogXCIgKyBkYXRhLmNvdmVyX2xldmVsXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwiXCJcclxuICAgICAgfVxyXG4gICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlICE9ICdyb2d1ZScpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY292ZXJcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINCw0YLQsNC60L7QstCw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QviDRgtC+0YIg0L3QsNGF0L7QtNC40YLRgdGPINCyINC/0L7Qu9C90L7QvCDRg9C60YDRi9GC0LjQuC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2VhcmNoX2FjdGlvbl9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgIHB1c2hUb0xpc3QoZGF0YS5jaGFyYWN0ZXJfbmFtZSArICcg0LHRgNC+0YHQuNC7ICcgKyBkYXRhLnJvbGwgKyAnINC90LAg0LLQvdC40LzQsNGC0LXQu9GM0L3QvtGB0YLRjCDQsiDQt9C+0L3QtSAnICsgZGF0YS56b25lX251bWJlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxudmFyIGNyZWF0ZV9ib2FyZF9idXR0b24gPSAkKENSRUFURV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5jcmVhdGVfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGNyZWF0ZUJvYXJkKTtcclxuY3JlYXRlX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgc2F2ZV9ib2FyZF9idXR0b24gPSAkKFNBVkVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxuc2F2ZV9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgc2F2ZUJvYXJkKTtcclxuc2F2ZV9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGxvYWRfYm9hcmRfYnV0dG9uID0gJChMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxvYWRfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGxvYWRCb2FyZCk7XHJcbmxvYWRfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciByb2xsX2luaXRpYXRpdmVfYnV0dG9uID0gJChST0xMX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SKTtcclxucm9sbF9pbml0aWF0aXZlX2J1dHRvbi5vbignY2xpY2snLCByb2xsSW5pdGlhdGl2ZSk7XHJcbnJvbGxfaW5pdGlhdGl2ZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGZvZ19idXR0b24gPSAkKEZPR19CVVRUT05fU0VMRUNUT1IpO1xyXG5mb2dfYnV0dG9uLm9uKCdjbGljaycsIGZvZ01vZGVDaGFuZ2UpO1xyXG5mb2dfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciB6b25lX2J1dHRvbiA9ICQoWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG56b25lX2J1dHRvbi5vbignY2xpY2snLCB6b25lTW9kZUNoYW5nZSk7XHJcbnpvbmVfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBjaGF0X2J1dHRvbiA9ICQoQ0hBVF9CVVRUT05fU0VMRUNUT1IpO1xyXG5jaGF0X2J1dHRvbi5vbignY2xpY2snLCBjaGFuZ2VDaGF0VmlzaWJpbGl0eSk7XHJcblxyXG52YXIgbWlycm9yX2J1dHRvbiA9ICQoTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUik7XHJcbm1pcnJvcl9idXR0b24ub24oJ2NsaWNrJywgbWlycm9yX2JvYXJkKTtcclxubWlycm9yX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgbmV4dF9yb3VuZF9idXR0b24gPSAkKE5FWFRfUk9VTkRfQlVUVE9OX1NFTEVDVE9SKTtcclxubmV4dF9yb3VuZF9idXR0b24ub24oJ2NsaWNrJywgc3RhcnRfbmV3X3JvdW5kKTtcclxubmV4dF9yb3VuZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGJhdHRsZV9tb2RfYnV0dG9uID0gJChCQVRUTEVfTU9EX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmJhdHRsZV9tb2RfYnV0dG9uLm9uKCdjbGljaycsIGNoYW5nZV9iYXR0bGVfbW9kKTtcclxuYmF0dGxlX21vZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHN5bmNfYnV0dG9uID0gJChTWU5DX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnN5bmNfYnV0dG9uLm9uKCdjbGljaycsIHN5bmNfYm9hcmQpO1xyXG5zeW5jX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgZm9nX3pvbmVfYnV0dG9uID0gJChGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG5mb2dfem9uZV9idXR0b24ub24oJ2NsaWNrJywgZm9nQ3VycmVudFpvbmUpO1xyXG5mb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHVuZm9nX3pvbmVfYnV0dG9uID0gJChVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnVuZm9nX3pvbmVfYnV0dG9uLm9uKCdjbGljaycsIHVuZm9nQ3VycmVudFpvbmUpO1xyXG51bmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgem9uZV9udW1iZXJfc2VsZWN0ID0gJChaT05FX05VTUJFUl9TRUxFQ1RPUik7XHJcbnpvbmVfbnVtYmVyX3NlbGVjdC5oaWRlKCk7XHJcbmZvciAobGV0IGkgPSAxOyBpIDwgTUFYX1pPTkVTOyBpKyspIHtcclxuICB2YXIgY3VycmVudF9vcHRpb24gPSAkKFwiPG9wdGlvbj5cIik7XHJcbiAgY3VycmVudF9vcHRpb24udGV4dCgn0JfQvtC90LAgJyArIGkpO1xyXG4gIGN1cnJlbnRfb3B0aW9uLnZhbChpKTtcclxuICB6b25lX251bWJlcl9zZWxlY3QuYXBwZW5kKGN1cnJlbnRfb3B0aW9uKTtcclxufVxyXG5cclxudmFyIHNlYXJjaF9tb2RpZmljYXRvciA9ICQoU0VBUkNIX01PRElGSUNBVE9SX1NFTEVDVE9SKTtcclxuc2VhcmNoX21vZGlmaWNhdG9yLmhpZGUoKTtcclxuXHJcbnZhciBub3RpZmljYXRpb25zX2xpc3QgPSAkKE5PVElGSUNBVElPTlNfTElTVF9TRUxFQ1RPUik7XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgQ0hBVF9DQVNIOyBpKyspIHtcclxuICB2YXIgY3VycmVudF9lbGVtZW50ID0gJChcIjxsaT5cIik7XHJcbiAgY3VycmVudF9lbGVtZW50LmF0dHIoJ2RhdGEtbmFtZScsICdub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgaSk7XHJcbiAgY3VycmVudF9lbGVtZW50LmF0dHIoJ2NsYXNzJywgJ25vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50Jyk7XHJcbiAgbm90aWZpY2F0aW9uc19saXN0LmFwcGVuZChjdXJyZW50X2VsZW1lbnQpO1xyXG59XHJcblxyXG52YXIgYm9hcmRfc2l6ZV9pbnB1dCA9ICQoQk9BUkRfU0laRV9JTlBVVF9TRUxFQ1RPUik7XHJcbmJvYXJkX3NpemVfaW5wdXQuaGlkZSgpO1xyXG5cclxudmFyIHNhdmVfbmFtZV9pbnB1dCA9ICQoU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SKTtcclxuc2F2ZV9uYW1lX2lucHV0LmhpZGUoKTtcclxuXHJcbnZhciBub3RpZmljYXRpb25zX2NvbnRhaW5lciA9ICQoTk9USUZJQ0FUSU9OU19DT05UQU5FUl9TRUxFQ1RPUik7XHJcbm5vdGlmaWNhdGlvbnNfY29udGFpbmVyLmhpZGUoKTtcclxuXHJcbnZhciBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIgPSAkKENIQVJBQ1RFUl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciB3ZWFwb25faW5mb19jb250YWluZXIgPSAkKFdFQVBPTl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxuXHJcbmRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZTtcclxuICAgIC8vIHdcclxuICAgIGlmKGtleUNvZGUgPT0gODcpIHtcclxuICAgICAgICB3X29uY2xpY2soKVxyXG4gICAgfSBlbHNlIGlmIChrZXlDb2RlID09IDY1KSB7IC8vIGFcclxuICAgICAgYV9vbmNsaWNrKClcclxuICAgIH1cclxufTtcclxuXHJcbnNldEludGVydmFsKHJlY29ubmVjdCwgMTUqMTAwMClcclxuIiwibGV0IHNvY2tldDtcclxubGV0IHNlcnZlcl9hZGRyZXNzO1xyXG5sZXQgb25NZXNzYWdlRnVuY3Rpb247XHJcblxyXG5mdW5jdGlvbiBpbml0KHVybCkge1xyXG4gIHNlcnZlcl9hZGRyZXNzID0gdXJsO1xyXG4gIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUmVhZHkoKSB7XHJcbiAgcmV0dXJuIHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTlxyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnb3BlbicpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBvbk1lc3NhZ2VGdW5jdGlvbiA9IGhhbmRsZXJGdW5jdGlvbjtcclxuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKGRhdGEpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0KCkge1xyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICBvbk1lc3NhZ2VGdW5jdGlvbihkYXRhKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShwYXlsb2FkKSB7XHJcbiAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbml0KHNlcnZlcl9hZGRyZXNzKTtcclxuICAgIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIob25NZXNzYWdlRnVuY3Rpb24pO1xyXG4gICAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnTm90IHNlbmQsIGJ1dCByZWNvbm5lY3RlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgcmVnaXN0ZXJPcGVuSGFuZGxlcixcclxuICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyLFxyXG4gIHNlbmRNZXNzYWdlLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0LFxyXG4gIGlzUmVhZHlcclxufVxyXG4iXX0=
