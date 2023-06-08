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
var LANDMINE_BUTTON_SELECTOR = '[data-name="landmine_button"]';
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
var punch_rainfall_stamina_cost = 2; // per punch
var stamina_cut_limb_cost = 4;
var shield_up_stamina_cost = 2; // per move I think
var lottery_shot_stamina_cost = 1;
var lucky_shot_stamina_cost = 1;
var action_splash_stamina_cost = 2;
var adrenaline_stamina_cost = 3;
var acid_bomb_stamina_cost = 3;

var rest_stamina_gain = 5;

var cooldown_cut_limb = 1; // duration
var cooldown_big_bro = 1; // duration

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
var adrenaline_range = 1;
var poisonous_adrenaline_range = 1;

var poisonous_adrenaline_duration = 2;
var poisonous_adrenaline_cooldown = 3;
var poisonous_adrenaline_flat_HP = 5;
var poisonous_adrenaline_flat_stamina = 5;
var poisonous_adrenaline_percent_HP = 0.05;
var poisonous_adrenaline_percent_stamina = 0.05;

var adrenaline_cooldown = 3;

var acid_bomb_duration = 2; // 2+1 really
var acid_bomb_cooldown = 5;
var acid_bomb_radius = 1.6;

var mines_0_distance_damage = 12;
var mines_1_distance_damage = 8;
var mines_1p5_distance_damage = 5;
var landmine_detection_radius = 2.9;
var landmine_diffuse_threshold = 10;

// This is a constant, will be moved to database later
var HP_values = [15, 30, 40, 55, 75, 100, 130, 165, 205, 250, 300, 355, 415];
var stamina_values = [30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195];
var strength_damage_map = [-2, 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55];
var move_action_map = [1, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
var bonus_action_map = [0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3];
var main_action_map = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3];

var game_state = { board_state: [], fog_state: [], zone_state: [], size: 0, search_modificator_state: [], terrain_effects: [], battle_mod: 0, landmines: { positions: [], knowers: [] } };
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
  return parseFloat(distance);
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
      toSend.mines_exploded = [];
      toSend.mines_damage = 0;

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

      if (game_state.landmines.positions.includes(to_index)) {
        toSend.mines_exploded.push(to_index);
        toSend.mines_damage = toSend.mines_damage + roll_x(mines_0_distance_damage);
      }

      var immediate_nbh = index_in_radius(to_index, 1);
      for (var _i2 = 0; _i2 < immediate_nbh.length; _i2++) {
        if (game_state.board_state[immediate_nbh[_i2]] > 0 && game_state.board_state[immediate_nbh[_i2]] != chosen_character_index) {
          // there are characters there
          if (character_state.invisibility[game_state.board_state[immediate_nbh[_i2]]] != "all") {
            toSend.invisibility_ended_id.push(game_state.board_state[immediate_nbh[_i2]]);
          }
        }

        if (game_state.landmines.positions.includes(immediate_nbh[_i2]) && immediate_nbh[_i2] != to_index) {
          toSend.mines_exploded.push(immediate_nbh[_i2]);
          toSend.mines_damage = toSend.mines_damage + roll_x(mines_1_distance_damage);
        }
      }

      var one_and_half_nbh = index_in_radius(to_index, 1.6);
      for (var _i3 = 0; _i3 < one_and_half_nbh.length; _i3++) {
        if (game_state.landmines.positions.includes(one_and_half_nbh[_i3]) && !immediate_nbh.includes(one_and_half_nbh[_i3])) {
          toSend.mines_exploded.push(one_and_half_nbh[_i3]);
          toSend.mines_damage = toSend.mines_damage + roll_x(mines_1p5_distance_damage);
        }
      }

      var extended_nbh = index_in_radius(to_index, invisibility_detection_radius);
      for (var _i4 = 0; _i4 < extended_nbh.length; _i4++) {
        if (game_state.board_state[extended_nbh[_i4]] > 0 && game_state.board_state[extended_nbh[_i4]] != chosen_character_index && !immediate_nbh.includes(extended_nbh[_i4])) {
          // there are characters there
          var current_char_num = game_state.board_state[extended_nbh[_i4]];
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
        var move_action = Math.floor(character_state.move_action[character_number]);

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

      for (var _i5 = 0; _i5 < skillset.length; _i5++) {
        var current_option = document.createElement("option");
        current_option.innerHTML = skill_list[skillset[_i5]];
        current_option.value = skillset[_i5];
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
    } else {
      var hp_percent = parseFloat(character_state.HP[character_number]) / parseFloat(HP_values[character.stamina]);
      hp_percent = Math.floor(hp_percent * 100);

      var HP_display = document.createElement("h2");
      HP_display.id = "HP_display";
      HP_display.innerHTML = "ХП: " + hp_percent + "%";

      var tired_percent = parseFloat(character_state.stamina[character_number]) / parseFloat(stamina_values[character.stamina]);
      tired_percent = Math.floor(tired_percent * 100);

      var tired_display = document.createElement("h2");
      tired_display.id = "tired_display";
      tired_display.innerHTML = "Выносливость: " + tired_percent + "%";

      character_info_container.append(HP_display);
      character_info_container.append(tired_display);
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
  var character_number = game_state.board_state[index];
  var character = character_detailed_info[character_number];

  if (!(game_state.battle_mod == 1 && character_state.bonus_action[character_number] < 1)) {

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
    toSend.player_name = my_name;
    toSend.mines_detected = [];
    toSend.character_number = character_number;

    var landmine_candidates = index_in_radius(index, landmine_detection_radius);
    for (var i = 0; i < landmine_candidates.length; i++) {
      if (game_state.landmines.positions.includes(landmine_candidates[i])) {
        toSend.mines_detected.push(landmine_candidates[i]);
      }
    }
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Обыск во время боя стоит бонусное действие!");
  }
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
    for (var _i6 = 0; _i6 < game_state.size * game_state.size; _i6++) {
      if (game_state.fog_state[_i6] == 1) {
        var current_cell = document.getElementById("cell_" + _i6);
        current_cell.src = get_object_picture(game_state.board_state[_i6]);
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

    for (var _i7 = 0; _i7 < game_state.size * game_state.size; _i7++) {
      var current_zone_text = document.getElementById("zone_text_" + _i7);
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

function character_KD(target_character_number) {
  return parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number]);
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
    var target_character_KD = character_KD(target_character_number);
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
            for (var _i8 = 0; _i8 < weapon.damage[0]; _i8++) {
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
      for (var _i9 = 0; _i9 < weapon.damage[0]; _i9++) {
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
  var throw_range = findThrowRange(character);
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

function diffuse_landmine(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var character = character_detailed_info[user_character_number];
  if (isInRange(index, user_position, landmine_detection_radius)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_character_number;
    toSend.position = index;
    toSend.outcome = "empty";

    if (game_state.landmines.positions.includes(index)) {
      var roll = roll_x(20) + parseInt(character.intelligence);
      if (roll > landmine_diffuse_threshold) {
        toSend.outcome = "success";
      } else {
        toSend.outcome = "fail";
      }
    }
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Слишком далеко для взаимодействия");
  }
}

function findThrowRange(character) {
  return throw_base_range + parseInt(character.strength) * 2;
}

function acid_bomb(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var character = character_detailed_info[user_character_number];
  var throw_range = findThrowRange(character);
  if (isInRange(index, user_position, throw_range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_character_number;
    toSend.position = index;
    _wsClient2.default.sendMessage(toSend);
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

function poisonous_adrenaline(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;

  var target_number = game_state.board_state[index];
  if (isInRange(index, user_position, poisonous_adrenaline_range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.room_number = my_room;
    toSend.skill_index = character_chosen.skill_id;
    toSend.user_index = user_character_number;
    toSend.target_index = target_number;
    var extra_actions = [];
    for (var i = 0; i < poisonous_adrenaline_duration; i++) {
      extra_actions.push(roll_x(4));
    }
    toSend.extra_actions = extra_actions;
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Радиус адреналина 1 клетка!");
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
      for (var _i10 = 0; _i10 < 14; _i10++) {
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

    case 23:
      poisonous_adrenaline(index, cell);
      stop_skill();
      break;

    case 24:
      acid_bomb(index, cell);
      stop_skill();
      break;

    case 26:
      diffuse_landmine(index, cell);
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

    case 23:
      //Адреналиновый потоп
      if (character_state.special_effects[character_number].hasOwnProperty("poisonous_adrenaline_user")) {
        alert("Умение все еще на кулдауне");
      } else {
        choose_character_skill(skill_index, character_number, position, cell);
      }
      break;

    case 24:
      // кислотная граната
      if (!character_state.special_effects[character_number].hasOwnProperty("acid_bomb_user")) {
        if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell);
        } else {
          alert("Не хватает действий!");
        }
      } else {
        alert("У гранаты кулдаун (кислота окисляется)");
      }
      break;

    case 25:
      // Заминировать
      if (character_state.bonus_action[character_number] > 0) {
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index;
        toSend.user_index = character_number;
        toSend.player_name = my_name;
        toSend.position = position;
        _wsClient2.default.sendMessage(toSend);
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 26:
      // Обезвредить мину
      if (character_state.bonus_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell);
      } else {
        alert("Это умение требует 1 бонусное действие!");
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
  //console.log(candidate_cells)
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

function apply_acid_bomb(position, radius) {
  var candidate_cells = index_in_radius(position, radius);
  //console.log(candidate_cells)
  for (var i = 0; i < candidate_cells.length; i++) {
    var target_character_number = game_state.board_state[candidate_cells[i]];
    if (target_character_number > 0) {
      // персонаж в радиусе бомбы
      var character = character_detailed_info[target_character_number];
      var message = character.name + " попадает под действие кислотной гранаты";
      pushToList(message);
      if (character_state.special_effects[target_character_number].hasOwnProperty("acid_bomb_poison")) {
        character_state.special_effects[target_character_number].acid_bomb_poison.duration = acid_bomb_duration;
      } else {
        var acid_bomb_poison_object = {};
        acid_bomb_poison_object.duration = acid_bomb_duration;
        var KD_change = parseInt(character_KD(target_character_number) / 2);
        acid_bomb_poison_object.bonus_KD = KD_change;
        character_state.special_effects[target_character_number].acid_bomb_poison = acid_bomb_poison_object;
        character_state.bonus_KD[target_character_number] = character_state.bonus_KD[target_character_number] - KD_change;
      }
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

function show_landmines() {
  var landmines_array = game_state.landmines.positions;
  for (var i = 0; i < landmines_array.length; i++) {
    var current_mine = landmines_array[i];
    if (game_state.landmines.knowers[current_mine].includes(my_name)) {
      var cell = document.getElementById('cell_' + current_mine);
      cell.src = "/images/landmine.jfif";
    }
  }
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
      character_state.move_action[data.character_number] = parseFloat(move_action_map[character.agility]);
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

      for (var _i11 = 0; _i11 < data.mines_exploded.length; _i11++) {
        var mine_position = data.mines_exploded[_i11];
        var cell = document.getElementById('cell_' + mine_position);
        cell.src = fogOrPic(mine_position);
        var index = game_state.landmines.positions.indexOf(mine_position);
        if (index > -1) {
          game_state.landmines.positions.splice(index, 1);
        }
        game_state.landmines.knowers[mine_position] = [];
      }

      if (data.mines_damage > 0) {
        do_damage(data.character_number, data.mines_damage);
        var character = character_detailed_info[data.character_number];
        var message = character.name + " подрывается на минах получая " + data.mines_damage + " урона";
        pushToList(message);
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
        character_state.move_action[data.character_number] = character_state.move_action[data.character_number] - parseFloat(data.distance);
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
      for (var _i12 = 0; _i12 < index_list.length; _i12++) {
        game_state.zone_state[index_list[_i12]] = data.zone_number;
        game_state.search_modificator_state[index_list[_i12]] = data.modificator;
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
          // рывок
          character = character_detailed_info[user_index];
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          character_state.move_action[user_index] = character_state.move_action[user_index] + charge_move_increase;
          var message = character.name + " совершает рывок";
          pushToList(message);
          break;
        case 1:
          // прилив адреналина
          var user = character_detailed_info[user_index];
          var target_index = data.target_index;
          var target = character_detailed_info[target_index];
          var extra_actions = data.extra_actions;
          character_state.stamina[target_index] = character_state.stamina[target_index] - adrenaline_stamina_cost;
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
          adrenaline_object_user.cooldown = adrenaline_cooldown;
          character_state.special_effects[user_index].adrenaline_user = adrenaline_object_user;

          var message = user.name + " использует прилив адреналина. " + target.name + " получает " + data.extra_actions + " действий. Это будет стоить " + data.minus_actions + " действий на следующий ход.";
          pushToList(message);
          break;
        case 2:
          // подрезание сухожилий
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
          // слабое место
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
          // лечение
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
          // большой брат
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
          // поднять щиты
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
          // пожирание сущности
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
          // абсолютное восстановление
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
          // получить бонус
          character = character_detailed_info[user_index];
          character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] + 1;
          var message = character.name + " меняет обычное на бонусное действие";
          pushToList(message);
          break;
        case 11:
          // отдых
          character = character_detailed_info[user_index];
          character_state.main_action[user_index] = 0;
          character_state.bonus_action[user_index] = 0;
          character_state.move_action[user_index] = 0;
          character_state.stamina[user_index] = data.new_stamina;
          var message = character.name + " отдыхает. Хорошего отпуска!";
          pushToList(message);
          break;

        case 12:
          // газовая граната
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
          // светошумовая гранат
          var light_sound_bomb_user = {};
          light_sound_bomb_user.cooldown = light_sound_bomb_skill_cooldown;
          character_state.special_effects[user_index].light_sound_bomb_user = light_sound_bomb_user;

          for (var _i13 = 0; _i13 < data.outcome_list.length; _i13++) {
            var character_number = data.character_list[_i13];
            var character = character_detailed_info[character_number];
            if (data.outcome_list[_i13] == 0) {
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
          // шокировать (дрон + уязвимость)
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
          // пыщ пыщ гоу
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
          // силовое поле
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

          for (var _i14 = 0; _i14 < char_list.length; _i14++) {
            var character_number = char_list[_i14];
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

        case 23:
          // адреналиновый потоп
          var user = character_detailed_info[user_index];
          var target_index = data.target_index;
          var target = character_detailed_info[target_index];
          var extra_actions = data.extra_actions[0];
          while (extra_actions > 0) {
            if (extra_actions % 2 == 0) {
              character_state.move_action[target_index] = character_state.move_action[target_index] + adrenaline_move_increase;
            } else {
              character_state.main_action[target_index] = character_state.main_action[target_index] + 1;
            }
            extra_actions = extra_actions - 1;
          }
          var adrenaline_object_target = {};
          adrenaline_object_target.extra_actions = data.extra_actions;
          adrenaline_object_target.turn = 1;
          character_state.special_effects[target_index].poisonous_adrenaline_target = adrenaline_object_target;

          var adrenaline_object_user = {};
          adrenaline_object_user.cooldown = poisonous_adrenaline_cooldown;
          character_state.special_effects[user_index].poisonous_adrenaline_user = adrenaline_object_user;

          var message = user.name + " использует адреналиновый потоп. " + target.name + " получает " + data.extra_actions[0] + " действий в этот ход, и " + data.extra_actions[1] + " в следующий. Это будет стоить жизней и выносливости, используйте с умом.";
          pushToList(message);
          break;

        case 24:
          // кислотная граната
          character = character_detailed_info[user_index];

          character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          character_state.stamina[user_index] = character_state.stamina[user_index] - acid_bomb_stamina_cost;

          var message = character.name + " бросает кислотную гранату. А они только купили новые доспехи...";
          pushToList(message);

          var acid_bomb_user = {};
          acid_bomb_user.cooldown = acid_bomb_cooldown;
          character_state.special_effects[user_index].acid_bomb_user = acid_bomb_user;

          apply_acid_bomb(data.position, acid_bomb_radius);

          break;

        case 25:
          // заминировать
          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          }

          if (!game_state.landmines.positions.includes(data.position)) {
            game_state.landmines.positions.push(data.position);
            game_state.landmines.knowers[data.position] = [];
            game_state.landmines.knowers[data.position].push(data.player_name);
          }

          break;

        case 26:
          // обезвредить мину

          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          }
          character = character_detailed_info[user_index];
          switch (data.outcome) {
            case "empty":
              var message = "С чем " + character.name + " пытался взаимодействовать?";
              pushToList(message);
              break;
            case "fail":
              var message = character.name + " попытался обезвредить мину, но не сумел.";
              pushToList(message);
              break;

            case "success":
              var mine_position = data.position;
              var cell = document.getElementById('cell_' + mine_position);
              cell.src = fogOrPic(mine_position);
              var index = game_state.landmines.positions.indexOf(mine_position);
              if (index > -1) {
                game_state.landmines.positions.splice(index, 1);
              }
              game_state.landmines.knowers[mine_position] = [];
              var message = character.name + " запрещает мине взрываться!";
              pushToList(message);
              break;

            default:
              console.log("Switch обевзрежения пошел не так");
          }
          break;

        default:
          alert("Received unknown skill command");
      }
    } else if (data.command == 'new_round_response') {
      var message = "Начало нового раунда!";
      pushToList(message);

      for (var _i15 = 0; _i15 < game_state.terrain_effects.length; _i15++) {
        if (game_state.terrain_effects[_i15] !== null && game_state.terrain_effects[_i15] !== undefined) {
          switch (game_state.terrain_effects[_i15].type) {
            case "gas_bomb":
              apply_bomb(game_state.terrain_effects[_i15].position, game_state.terrain_effects[_i15].radius);
              if (game_state.terrain_effects[_i15].radius >= 4) {
                if (my_role == "gm") {
                  delete_object_command(game_state.terrain_effects[_i15].position);
                }
                game_state.terrain_effects[_i15] = null;
              } else {
                game_state.terrain_effects[_i15].radius = game_state.terrain_effects[_i15].radius + 1;
              }
              break;
            default:
              console.log("Messed up resolving terrain effects");
          }
        }
      }

      for (var _i16 = 1; _i16 < character_state.can_evade.length; _i16++) {
        character = character_detailed_info[_i16];
        if (character !== undefined && character !== null) {
          character_state.can_evade[_i16] = 1;
          character_state.has_moved[_i16] = 0;
          character_state.move_action[_i16] = parseFloat(move_action_map[character.agility]);
          character_state.bonus_action[_i16] = bonus_action_map[character.agility];
          character_state.main_action[_i16] = main_action_map[character.agility];

          if (character_state.special_effects[_i16].hasOwnProperty("tired")) {
            // Убрать бонусы от усталости прошлого хода (чтобы когда будут накаладываться новые не штрафовать дважды)
            character_state.universal_bonus[_i16] = character_state.universal_bonus[_i16] - character_state.special_effects[_i16].tired.bonus;
          }

          if (character_state.stamina[_i16] < stamina_values[character.stamina] * 0.67) {
            if (character_state.stamina[_i16] < stamina_values[character.stamina] * 0.34) {
              if (character_state.stamina[_i16] <= 0) {
                // 3я стадия
                var tired_object = {};
                tired_object.bonus = -3;
                tired_object.stage = 3;
                character_state.special_effects[_i16].tired = tired_object;
                character_state.universal_bonus[_i16] = character_state.universal_bonus[_i16] - 3;
                character_state.move_action[_i16] = parseFloat(Math.ceil(character_state.move_action[_i16] * 0.25));
                if (character_state.main_action[_i16] == 1 && character_state.bonus_action[_i16] == 1) {
                  character_state.bonus_action[_i16] = 0;
                } else {
                  character_state.bonus_action[_i16] = 1;
                  character_state.main_action[_i16] = 1;
                }
              } else {
                // 2я стадия
                var tired_object = {};
                tired_object.bonus = -2;
                tired_object.stage = 2;
                character_state.special_effects[_i16].tired = tired_object;
                character_state.universal_bonus[_i16] = character_state.universal_bonus[_i16] - 2;
                character_state.move_action[_i16] = parseFloat(Math.ceil(character_state.move_action[_i16] * 0.5));
              }
            } else {
              // 1я стадия
              var tired_object = {};
              tired_object.bonus = -1;
              tired_object.stage = 1;
              character_state.special_effects[_i16].tired = tired_object;
              character_state.universal_bonus[_i16] = character_state.universal_bonus[_i16] - 1;
              character_state.move_action[_i16] = parseFloat(Math.ceil(character_state.move_action[_i16] * 0.75));
            }
          } else if (character_state.special_effects[_i16].hasOwnProperty("tired")) {
            // не устал -> убрать устлалость если была
            delete character_state.special_effects[_i16].tired;
          }

          if (character_state.special_effects[_i16].hasOwnProperty("light_sound_bomb_user")) {
            if (character_state.special_effects[_i16].light_sound_bomb_user.cooldown == 0) {
              delete character_state.special_effects[_i16].light_sound_bomb_user;
              var message = "Светошумовая граната у" + character.name + " готова к использованию.";
              pushToList(message);
            } else {
              character_state.special_effects[_i16].light_sound_bomb_user.cooldown = character_state.special_effects[_i16].light_sound_bomb_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("action_splash")) {
            if (character_state.special_effects[_i16].action_splash.cooldown == 0) {
              delete character_state.special_effects[_i16].action_splash;
              var message = character.name + " вновь может использовать всплеск действий.";
              pushToList(message);
            } else {
              character_state.special_effects[_i16].action_splash.cooldown = character_state.special_effects[_i16].action_splash.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("gas_bomb_user")) {
            if (character_state.special_effects[_i16].gas_bomb_user.cooldown == 0) {
              delete character_state.special_effects[_i16].gas_bomb_user;
              var message = "Газовая граната у" + character.name + " готова к использованию.";
              pushToList(message);
            } else {
              character_state.special_effects[_i16].gas_bomb_user.cooldown = character_state.special_effects[_i16].gas_bomb_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("acid_bomb_user")) {
            if (character_state.special_effects[_i16].acid_bomb_user.cooldown == 0) {
              delete character_state.special_effects[_i16].acid_bomb_user;
              var message = "Кислотная граната у" + character.name + " готова к использованию.";
              pushToList(message);
            } else {
              character_state.special_effects[_i16].acid_bomb_user.cooldown = character_state.special_effects[_i16].acid_bomb_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("force_field_user")) {
            if (character_state.special_effects[_i16].force_field_user.cooldown == 0) {
              delete character_state.special_effects[_i16].force_field_user;
              var message = "Силовое поле у " + character.name + " снова заряжено.";
              pushToList(message);
            } else {
              character_state.special_effects[_i16].force_field_user.cooldown = character_state.special_effects[_i16].force_field_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("pich_pich_user")) {
            if (character_state.special_effects[_i16].pich_pich_user.cooldown == 0) {
              delete character_state.special_effects[_i16].pich_pich_user;
              var message = "Умение Пыщ-Пыщ у " + character.name + " снова доступно.";
              pushToList(message);
            } else {
              if (character_state.special_effects[_i16].pich_pich_user.cooldown == pich_pich_cooldown) {
                character_state.bonus_action[_i16] = 0;
              }
              character_state.special_effects[_i16].pich_pich_user.cooldown = character_state.special_effects[_i16].pich_pich_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("pich_pich_target")) {
            var extra_actions = character_state.special_effects[_i16].pich_pich_target.extra_actions;
            while (extra_actions > 0) {
              if (extra_actions % 2 == 0) {
                character_state.move_action[_i16] = character_state.move_action[_i16] + adrenaline_move_increase;
              } else {
                character_state.main_action[_i16] = character_state.main_action[_i16] + 1;
              }
              extra_actions = extra_actions - 1;
            }
            delete character_state.special_effects[_i16].pich_pich_target;
          }

          if (character_state.special_effects[_i16].hasOwnProperty("adrenaline_user")) {
            character_state.special_effects[_i16].adrenaline_user.cooldown = character_state.special_effects[_i16].adrenaline_user.cooldown - 1;
            if (character_state.special_effects[_i16].adrenaline_user.cooldown == 0) {
              delete character_state.special_effects[_i16].adrenaline_user;
              var message = "Умение Прилив Адреналина у " + character.name + " снова доступно.";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("poisonous_adrenaline_user")) {
            character_state.special_effects[_i16].poisonous_adrenaline_user.cooldown = character_state.special_effects[_i16].poisonous_adrenaline_user.cooldown - 1;
            if (character_state.special_effects[_i16].poisonous_adrenaline_user.cooldown == 0) {
              delete character_state.special_effects[_i16].poisonous_adrenaline_user;
              var message = "Умение Адреналиновый Потоп у " + character.name + " снова доступно.";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("adrenaline_target")) {
            var minus_actions = character_state.special_effects[_i16].adrenaline_target.minus_actions;
            while (minus_actions > 0) {
              if (minus_actions % 2 == 0) {
                character_state.move_action[_i16] = character_state.move_action[_i16] - adrenaline_move_increase;
              } else {
                character_state.main_action[_i16] = character_state.main_action[_i16] - 1;
              }
              minus_actions = minus_actions - 1;
            }
            delete character_state.special_effects[_i16].adrenaline_target;
          }

          if (character_state.special_effects[_i16].hasOwnProperty("poisonous_adrenaline_target")) {
            var turn = character_state.special_effects[_i16].poisonous_adrenaline_target.turn;
            character_state.special_effects[_i16].poisonous_adrenaline_target.turn = turn + 1;
            var extra_actions = character_state.special_effects[_i16].poisonous_adrenaline_target.extra_actions[turn];
            while (extra_actions > 0) {
              if (extra_actions % 2 == 0) {
                character_state.move_action[_i16] = character_state.move_action[_i16] + adrenaline_move_increase;
              } else {
                character_state.main_action[_i16] = character_state.main_action[_i16] + 1;
              }
              extra_actions = extra_actions - 1;
            }
            if (turn + 1 == poisonous_adrenaline_duration) {
              var character = character_detailed_info[_i16];
              var max_HP = HP_values[character.stamina];
              var max_stamina = stamina_values[character.stamina];
              var HP_cost = poisonous_adrenaline_flat_HP + parseInt(parseFloat(max_HP) * poisonous_adrenaline_percent_HP);
              var stamina_cost = poisonous_adrenaline_flat_stamina + parseInt(parseFloat(max_stamina) * poisonous_adrenaline_percent_stamina);
              character_state.HP[_i16] = character_state.HP[_i16] - HP_cost;
              character_state.stamina[_i16] = character_state.stamina[_i16] - stamina_cost;
              delete character_state.special_effects[_i16].poisonous_adrenaline_target;
              var message = "Адреналин в крови " + character.name + " заканчивается, наступает похмелье (" + HP_cost + " хп и " + stamina_cost + " выносливости)";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("shocked")) {
            if (character_state.special_effects[_i16].shocked.cooldown == 0) {
              character_state.defensive_advantage[_i16] = character_state.defensive_advantage[_i16] + 1;
              delete character_state.special_effects[_i16].shocked;
            } else {
              character_state.special_effects[_i16].shocked.cooldown = character_state.special_effects[_i16].shocked.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("cut_limb")) {
            character_state.move_action[_i16] = -10;
            character_state.special_effects[_i16].cut_limb.cooldown = character_state.special_effects[_i16].cut_limb.cooldown - 1;
            if (character_state.special_effects[_i16].cut_limb.cooldown == 0) {
              delete character_state.special_effects[_i16].cut_limb;
              var message = "Сухожилия " + character.name + " восстановятся на следующем ходу.";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("healed")) {
            if (character_state.special_effects[_i16].healed.cooldown > 0) {
              character_state.move_action[_i16] = 0;
              character_state.main_action[_i16] = 0;
              character_state.bonus_action[_i16] = 0;
              character_state.special_effects[_i16].healed.cooldown = character_state.special_effects[_i16].healed.cooldown - 1;
            } else {
              delete character_state.special_effects[_i16].healed;
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("blind")) {
            if (character_state.special_effects[_i16].blind.cooldown > 0) {
              character_state.special_effects[_i16].blind.cooldown = character_state.special_effects[_i16].blind.cooldown - 1;
            } else {
              delete character_state.special_effects[_i16].blind;
              character_state.ranged_advantage[_i16] = character_state.ranged_advantage[_i16] + 2;
              character_state.melee_advantage[_i16] = character_state.melee_advantage[_i16] + 1;
              var message = "Зрение " + character.name + " восстановилось";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("Markus_stacks")) {
            character_state.special_effects[_i16].Markus_stacks = character_state.special_effects[_i16].Markus_stacks - 1;
            if (character_state.special_effects[_i16].Markus_stacks == 0) {
              delete character_state.special_effects[_i16].Markus_stacks;
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("shield_up")) {
            character_state.move_action[_i16] = Math.ceil(character_state.move_action[_i16] / 2);
            character_state.stamina[_i16] = character_state.stamina[_i16] - character_state.special_effects[_i16].shield_up.stamina_cost;
            var message = character.name + " продолжает держать щит (спасибо)";
            pushToList(message);
          }
          if (character_state.special_effects[_i16].hasOwnProperty("big_bro")) {
            if (character_state.special_effects[_i16].big_bro.cooldown == 0) {
              character_state.bonus_KD[_i16] = character_state.bonus_KD[_i16] - character_state.special_effects[_i16].big_bro.bonus_KD;
              delete character_state.special_effects[_i16].big_bro;
              var message = character.name + " теряет защиту Большого Брата";
              pushToList(message);
            } else {
              character_state.special_effects[_i16].big_bro.cooldown = character_state.special_effects[_i16].big_bro.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("acid_bomb_poison")) {
            if (character_state.special_effects[_i16].acid_bomb_poison.duration == 0) {
              character_state.bonus_KD[_i16] = character_state.bonus_KD[_i16] + character_state.special_effects[_i16].acid_bomb_poison.bonus_KD;
              delete character_state.special_effects[_i16].acid_bomb_poison;
              var message = "Броня " + character.name + " наконец восстановилась";
              pushToList(message);
            } else {
              character_state.special_effects[_i16].acid_bomb_poison.duration = character_state.special_effects[_i16].acid_bomb_poison.duration - 1;
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("gas_bomb_poison")) {
            var count = character_state.special_effects[_i16].gas_bomb_poison.poison_level;
            while (count > 0) {
              character_state.move_action[_i16] = character_state.move_action[_i16] - gas_bomb_move_reduction;
              if (count % 2 == 1) {
                character_state.main_action[_i16] = character_state.main_action[_i16] - 1;
              } else {
                character_state.bonus_action[_i16] = character_state.bonus_action[_i16] - 1;
              }
              count = count - 1;
            }
            var save_roll = data.save_roll_list[_i16];
            if (save_roll >= character_state.special_effects[_i16].gas_bomb_poison.threshold) {
              character_state.special_effects[_i16].gas_bomb_poison.poison_level = character_state.special_effects[_i16].gas_bomb_poison.poison_level - 1;
              var message = character.name + " успешно кидает спасбросок и уменьшает стадию отравления (теперь " + character_state.special_effects[_i16].gas_bomb_poison.poison_level + ")";
              pushToList(message);
            } else {
              var message = character.name + " проваливает спасбросок. Стадия отравления остается прежней (" + character_state.special_effects[_i16].gas_bomb_poison.poison_level + ")";
              pushToList(message);
            }
            if (character_state.special_effects[_i16].gas_bomb_poison.poison_level <= 0) {
              delete character_state.special_effects[_i16].gas_bomb_poison;
              var message = character.name + " больше не отравлен!";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i16].hasOwnProperty("meleed")) {
            if (character_state.special_effects[_i16].meleed.cooldown <= 0) {
              delete character_state.special_effects[_i16].meleed;
              character_state.ranged_advantage[_i16] = character_state.ranged_advantage[_i16] + 1;
            } else {
              character_state.special_effects[_i16].meleed.cooldown = character_state.special_effects[_i16].meleed.cooldown - 1;
            }
          }

          if (character.special_type == 'sniper') {
            var effects_object = character_state.special_effects[_i16];
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
              character_state.attack_bonus[_i16] = character_state.attack_bonus[_i16] - current_attack_bonus + new_attack_bonus;
              character_state.damage_bonus[_i16] = character_state.damage_bonus[_i16] - current_damage_bonus + new_damage_bonus;
              character_state.special_effects[_i16].sniper_passive.attack_bonus = new_attack_bonus;
              character_state.special_effects[_i16].sniper_passive.damage_bonus = new_damage_bonus;
            } else {
              var sniper_passive_object = {};
              sniper_passive_object.attack_bonus = 0;
              sniper_passive_object.damage_bonus = 0;
              character_state.special_effects[_i16].sniper_passive = sniper_passive_object;
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

      if (game_state.battle_mod == 1) {
        character_state.bonus_action[data.character_number] = character_state.bonus_action[data.character_number] - 1;
      }

      if (data.mines_detected.length > 0) {
        var message = data.character_name + " обнаруживает " + data.mines_detected.length + " мин рядом с собой";
        pushToList(message);
        for (var _i17 = 0; _i17 < data.mines_detected.length; _i17++) {
          var mine = data.mines_detected[_i17];
          game_state.landmines.knowers[mine].push(data.player_name);
        }
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

var landmine_button = $(LANDMINE_BUTTON_SELECTOR);
landmine_button.on('click', show_landmines);

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
for (var _i18 = 0; _i18 < CHAT_CASH; _i18++) {
  var current_element = $("<li>");
  current_element.attr('data-name', 'notifications_list_element_' + _i18);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksbUNBQW1DLHdDQUF2QztBQUNBLElBQUksZ0NBQWdDLHFDQUFwQztBQUNBLElBQUksa0NBQWtDLHVDQUF0Qzs7QUFFQSxJQUFJLCtCQUErQixtQ0FBbkM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLGtDQUFrQyxzQ0FBdEM7QUFDQSxJQUFJLHNCQUFzQiwwQkFBMUI7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHlCQUF5Qiw2QkFBN0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7O0FBRUEsSUFBSSx1QkFBdUIsa0NBQTNCO0FBQ0EsSUFBSSw4QkFBOEIsa0NBQWxDOztBQUVBLElBQUksNEJBQTRCLGdDQUFoQztBQUNBLElBQUksMkJBQTJCLCtCQUEvQjs7QUFFQSxJQUFJLDhCQUE4QixrQ0FBbEM7O0FBRUEsSUFBSSxpQkFBaUIsU0FBUyxNQUFULENBQWdCLE9BQWhCLENBQXdCLE9BQXhCLEVBQWlDLElBQWpDLENBQXJCOztBQUVBLElBQUksMkJBQTJCLEVBQUMsSUFBSSxFQUFMLEVBQVMsYUFBYSxFQUF0QixFQUEwQixjQUFjLEVBQXhDLEVBQTRDLGFBQWEsRUFBekQsRUFBNkQsU0FBUyxFQUF0RSxFQUEwRSxZQUFZ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QUFPLFNBQVAsR0FBbUIsVUFBQyxDQUFELEVBQU87QUFDeEIsUUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLEVBQUUsSUFBYixDQUFYO0FBQ0Esb0JBQWdCLElBQWhCO0FBQ0QsR0FIRDtBQUlEOztBQUVELFNBQVMsNkJBQVQsR0FBeUM7QUFDdkMsU0FBTyxTQUFQLEdBQW1CLFVBQUMsQ0FBRCxFQUFPO0FBQ3hCLFFBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxFQUFFLElBQWIsQ0FBWDtBQUNBLHNCQUFrQixJQUFsQjtBQUNELEdBSEQ7QUFJRDs7QUFFRCxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEI7QUFDNUIsTUFBSSxPQUFPLFVBQVAsS0FBc0IsVUFBVSxJQUFwQyxFQUEwQztBQUN4QyxXQUFPLElBQVAsQ0FBWSxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQVo7QUFDRCxHQUZELE1BRU87QUFDTCxTQUFLLGNBQUw7QUFDQSwyQkFBdUIsaUJBQXZCO0FBQ0EsUUFBSSxPQUFPLFVBQVAsS0FBc0IsVUFBVSxJQUFwQyxFQUEwQztBQUN4QyxhQUFPLElBQVAsQ0FBWSxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQVo7QUFDRCxLQUZELE1BRU87QUFDTCxjQUFRLEdBQVIsQ0FBWSwyQkFBWjtBQUNEO0FBQ0Y7QUFDRjs7a0JBRWM7QUFDYixZQURhO0FBRWIsMENBRmE7QUFHYixnREFIYTtBQUliLDBCQUphO0FBS2IsOERBTGE7QUFNYjtBQU5hLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgc29ja2V0IGZyb20gJy4vd3MtY2xpZW50JztcclxuXHJcbnZhciAkID0gd2luZG93LmpRdWVyeTtcclxuXHJcbnZhciBDSEFSQUNURVJfSU5GT19DT05UQU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCJdJztcclxudmFyIFdFQVBPTl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ3ZWFwb24taW5mby1jb250YWluZXJcIl0nO1xyXG52YXIgTk9USUZJQ0FUSU9OU19DT05UQU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9ucy1jb250YWluZXJcIl0nO1xyXG5cclxudmFyIENSRUFURV9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImNyZWF0ZV9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgU0FWRV9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNhdmVfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIExPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJsb2FkX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBST0xMX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJyb2xsX2luaXRpYXRpdmVfYnV0dG9uXCJdJztcclxudmFyIEZPR19CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImZvZ19idXR0b25cIl0nO1xyXG52YXIgWk9ORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInpvbmVfYnV0dG9uXCJdJztcclxudmFyIENIQVRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjaGF0X2J1dHRvblwiXSc7XHJcbnZhciBNSVJST1JfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJtaXJyb3JfYnV0dG9uXCJdJztcclxudmFyIE5FWFRfUk9VTkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJuZXh0X3JvdW5kX2J1dHRvblwiXSc7XHJcbnZhciBCQVRUTEVfTU9EX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiYmF0dGxlX21vZF9idXR0b25cIl0nO1xyXG52YXIgU1lOQ19CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInN5bmNfYnV0dG9uXCJdJztcclxudmFyIExBTkRNSU5FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibGFuZG1pbmVfYnV0dG9uXCJdJztcclxudmFyIEZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiZm9nX3pvbmVfYnV0dG9uXCJdJztcclxudmFyIFVORk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ1bmZvZ196b25lX2J1dHRvblwiXSc7XHJcblxyXG52YXIgWk9ORV9OVU1CRVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInpvbmVfbnVtYmVyX3NlbGVjdFwiXSc7XHJcbnZhciBTRUFSQ0hfTU9ESUZJQ0FUT1JfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNlYXJjaF9tb2RpZmljYXRvclwiXSc7XHJcblxyXG52YXIgQk9BUkRfU0laRV9JTlBVVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiYm9hcmRfc2l6ZV9pbnB1dFwiXSc7XHJcbnZhciBTQVZFX05BTUVfSU5QVVRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNhdmVfbmFtZV9pbnB1dFwiXSc7XHJcblxyXG52YXIgTk9USUZJQ0FUSU9OU19MSVNUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RcIl0nO1xyXG5cclxudmFyIFNFUlZFUl9BRERSRVNTID0gbG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoL15odHRwLywgJ3dzJyk7XHJcblxyXG52YXIgQ0hBUkFDVEVSX1NUQVRFX0NPTlNUQU5UID0ge0hQOiBbXSwgbWFpbl9hY3Rpb246IFtdLCBib251c19hY3Rpb246IFtdLCBtb3ZlX2FjdGlvbjogW10sIHN0YW1pbmE6IFtdLCBpbml0aWF0aXZlOiBbXSwgY2FuX2V2YWRlOiBbXSwgaGFzX21vdmVkOiBbXSwgS0RfcG9pbnRzOiBbXSwgY3VycmVudF93ZWFwb246IFtdLCB2aXNpYmlsaXR5OiBbXSwgaW52aXNpYmlsaXR5OiBbXSwgYXR0YWNrX2JvbnVzOiBbXSwgZGFtYWdlX2JvbnVzOiBbXSwgdW5pdmVyc2FsX2JvbnVzOiBbXSwgYm9udXNfS0Q6IFtdLCBzcGVjaWFsX2VmZmVjdHM6IFtdLCByYW5nZWRfYWR2YW50YWdlOiBbXSwgbWVsZWVfYWR2YW50YWdlOiBbXSwgZGVmZW5zaXZlX2FkdmFudGFnZTogW10sIHBvc2l0aW9uOiBbXX07XHJcblxyXG52YXIgbXlfbmFtZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKSk7XHJcbnZhciBteV9yb2xlID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3JvbGUnKSk7XHJcbnZhciBteV9yb29tID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdyb29tX251bWJlcicpKTtcclxuXHJcbnZhciBjaGFyYWN0ZXJfbGlzdCA9IFtdO1xyXG52YXIgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIG9ic3RhY2xlX2xpc3QgPSBbXTtcclxudmFyIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIHdlYXBvbl9saXN0ID0gW107XHJcbnZhciB3ZWFwb25fZGV0YWlsZWRfaW5mbyA9IFtdO1xyXG52YXIgc2tpbGxfbGlzdCA9IFtdO1xyXG5cclxudmFyIFRJTllfRUZGRUNUX0NMQVNTID0gJ2lzLXRpbnknO1xyXG5cclxudmFyIEVNUFRZX0NFTExfUElDID0gXCIuL2ltYWdlcy9zcXVhcmUuanBnXCI7XHJcbnZhciBaT05FX0VORFBPSU5UX1BJQyA9IFwiLi9pbWFnZXMvcmVkX2Nyb3NzLmpwZ1wiXHJcbnZhciBGT0dfSU1BR0UgPSBcIi4vaW1hZ2VzL2ZvZy53ZWJwXCI7XHJcbnZhciBRVUVTVElPTl9JTUFHRSA9IFwiLi9pbWFnZXMvcXVlc3Rpb24uanBnXCI7XHJcblxyXG52YXIgTUFYX1pPTkVTID0gMjU7XHJcbnZhciBDSEFUX0NBU0ggPSAxNTtcclxuXHJcbnZhciBzdGFtaW5hX3dlYWtzcG90X2Nvc3QgPSAxXHJcbnZhciBzdGFtaW5hX21vdmVfY29zdCA9IDBcclxudmFyIHN0YW1pbmFfYXR0YWNrX2Nvc3QgPSAxXHJcbnZhciBwdW5jaF9yYWluZmFsbF9zdGFtaW5hX2Nvc3QgPSAyIC8vIHBlciBwdW5jaFxyXG52YXIgc3RhbWluYV9jdXRfbGltYl9jb3N0ID0gNFxyXG52YXIgc2hpZWxkX3VwX3N0YW1pbmFfY29zdCA9IDIgLy8gcGVyIG1vdmUgSSB0aGlua1xyXG52YXIgbG90dGVyeV9zaG90X3N0YW1pbmFfY29zdCA9IDFcclxudmFyIGx1Y2t5X3Nob3Rfc3RhbWluYV9jb3N0ID0gMVxyXG52YXIgYWN0aW9uX3NwbGFzaF9zdGFtaW5hX2Nvc3QgPSAyXHJcbnZhciBhZHJlbmFsaW5lX3N0YW1pbmFfY29zdCA9IDNcclxudmFyIGFjaWRfYm9tYl9zdGFtaW5hX2Nvc3QgPSAzXHJcblxyXG52YXIgcmVzdF9zdGFtaW5hX2dhaW4gPSA1XHJcblxyXG52YXIgY29vbGRvd25fY3V0X2xpbWIgPSAxIC8vIGR1cmF0aW9uXHJcbnZhciBjb29sZG93bl9iaWdfYnJvID0gMSAvLyBkdXJhdGlvblxyXG5cclxudmFyIHNoaWVsZF91cF9LRCA9IDNcclxuXHJcbnZhciBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2UgPSA0XHJcbnZhciBjaGFyZ2VfbW92ZV9pbmNyZWFzZSA9IDRcclxuXHJcbnZhciBnYXNfYm9tYl90aHJlc2hvbGQgPSAxMVxyXG52YXIgZ2FzX2JvbWJfbW92ZV9yZWR1Y3Rpb24gPSAyXHJcbnZhciBnYXNfYm9tYl9zdGFtaW5hX2Nvc3QgPSAzXHJcbnZhciBnYXNfYm9tYl9vYnN0YWNsZSA9IDE1XHJcbnZhciBnYXNfYm9tYl9za2lsbF9jb29sZG93biA9IDVcclxuXHJcbnZhciBsaWdodF9zb3VuZF9ib21iX3JhZGl1cyA9IDRcclxudmFyIGxpZ2h0X3NvdW5kX2JvbWJfdGhyZXNob2xkID0gMTVcclxudmFyIGxpZ2h0X3NvdW5kX2JvbWJfc2tpbGxfY29vbGRvd24gPSA1XHJcblxyXG52YXIgd2Vha19zcG90X3RocmVzaG9sZCA9IDE1XHJcblxyXG52YXIgc2hvY2tlZF9jb29sZG93biA9IDBcclxuXHJcbnZhciBwaWNoX3BpY2hfY29vbGRvd24gPSA0XHJcbnZhciBwaWNoX3BpY2hfbW92ZV9pbmNyZWFzZSA9IDRcclxuXHJcbnZhciBmb3JjZV9maWVsZF9yYWRpdXMgPSAxLjZcclxudmFyIGZvcmNlX2ZpZWxkX3N0YW1pbmFfY29zdCA9IDVcclxudmFyIGZvcmNlX2ZpZWxkX2Nvb2xkb3duID0gMTBcclxudmFyIGZvcmNlX2ZpZWxkX29ic3RhY2xlID0gMjRcclxuXHJcbnZhciBhY3Rpb25fc3BsYXNoX2Nvb2xkb3duID0gNFxyXG5cclxudmFyIGludmlzaWJpbGl0eV9kZXRlY3Rpb25fcmFkaXVzID0gMztcclxuXHJcbnZhciBiaWdfYnJvX3JhbmdlID0gMlxyXG52YXIgaGVhbF9yYW5nZSA9IDFcclxudmFyIHRocm93X2Jhc2VfcmFuZ2UgPSAyXHJcbnZhciBsaWdodF9zb3VuZF9ib21iX3JhbmdlID0gNVxyXG52YXIgZm9yY2VfZmllbGRfcmFuZ2UgPSAxXHJcbnZhciBhZHJlbmFsaW5lX3JhbmdlID0gMVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfcmFuZ2UgPSAxXHJcblxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfZHVyYXRpb24gPSAyXHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9jb29sZG93biA9IDNcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX2ZsYXRfSFAgPSA1XHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9mbGF0X3N0YW1pbmEgPSA1XHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9wZXJjZW50X0hQID0gMC4wNVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfcGVyY2VudF9zdGFtaW5hID0gMC4wNVxyXG5cclxudmFyIGFkcmVuYWxpbmVfY29vbGRvd24gPSAzXHJcblxyXG52YXIgYWNpZF9ib21iX2R1cmF0aW9uID0gMiAvLyAyKzEgcmVhbGx5XHJcbnZhciBhY2lkX2JvbWJfY29vbGRvd24gPSA1XHJcbnZhciBhY2lkX2JvbWJfcmFkaXVzID0gMS42XHJcblxyXG52YXIgbWluZXNfMF9kaXN0YW5jZV9kYW1hZ2UgPSAxMlxyXG52YXIgbWluZXNfMV9kaXN0YW5jZV9kYW1hZ2UgPSA4XHJcbnZhciBtaW5lc18xcDVfZGlzdGFuY2VfZGFtYWdlID0gNVxyXG52YXIgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cyA9IDIuOVxyXG52YXIgbGFuZG1pbmVfZGlmZnVzZV90aHJlc2hvbGQgPSAxMFxyXG5cclxuLy8gVGhpcyBpcyBhIGNvbnN0YW50LCB3aWxsIGJlIG1vdmVkIHRvIGRhdGFiYXNlIGxhdGVyXHJcbmNvbnN0IEhQX3ZhbHVlcyA9IFsxNSwgMzAsIDQwLCA1NSwgNzUsIDEwMCwgMTMwLCAxNjUsIDIwNSwgMjUwLCAzMDAsIDM1NSwgNDE1XTtcclxuY29uc3Qgc3RhbWluYV92YWx1ZXMgPSBbMzAsIDQ1LCA2MCwgNzUsIDkwLCAxMDUsIDEyMCwgMTM1LCAxNTAsIDE2NSwgMTgwLCAxOTVdO1xyXG5jb25zdCBzdHJlbmd0aF9kYW1hZ2VfbWFwID0gWy0yLCAwLCAxLCAzLCA2LCAxMCwgMTUsIDIxLCAyOCwgMzYsIDQ1LCA1NV1cclxuY29uc3QgbW92ZV9hY3Rpb25fbWFwID0gWzEsIDMsIDQsIDYsIDgsIDEwLCAxMiwgMTQsIDE2LCAxOCwgMjAsIDIyXVxyXG5jb25zdCBib251c19hY3Rpb25fbWFwPSBbMCwgMSwgMSwgMiwgMiwgMiwgMiwgMiwgMywgMywgMywgM11cclxuY29uc3QgbWFpbl9hY3Rpb25fbWFwID0gWzEsIDEsIDEsIDEsIDEsIDEsIDIsIDIsIDIsIDIsIDIsIDNdXHJcblxyXG5cclxubGV0IGdhbWVfc3RhdGUgPSB7Ym9hcmRfc3RhdGU6IFtdLCBmb2dfc3RhdGU6IFtdLCB6b25lX3N0YXRlOiBbXSwgc2l6ZTogMCwgc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlOiBbXSwgdGVycmFpbl9lZmZlY3RzOiBbXSwgYmF0dGxlX21vZDogMCwgbGFuZG1pbmVzOiB7cG9zaXRpb25zOiBbXSwga25vd2VyczogW119fTtcclxubGV0IGNoYXJhY3Rlcl9zdGF0ZSA9IENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVDtcclxuXHJcbmxldCBjaGFyYWN0ZXJfYmFzZSA9IFtdO1xyXG5sZXQgb2JzdGFjbGVfYmFzZSA9IFtdO1xyXG5cclxubGV0IGdtX2NvbnRyb2xfbW9kID0gMDsgLy8gbm9ybWFsIG1vZGVcclxuXHJcbi8vIGluX3Byb2Nlc3M6IDAgPSBub3RoaW5nLCAxID0gbW92ZSwgMiA9IGF0dGFjaywgMyA9IHNraWxsXHJcbmxldCBjaGFyYWN0ZXJfY2hvc2VuID0ge2luX3Byb2Nlc3M6IDAsIGNoYXJfaWQ6IDAsIGNoYXJfcG9zaXRpb246IDAsIHdlYXBvbl9pZDogMCwgc2tpbGxfaWQ6IDAsIGNlbGw6IDB9O1xyXG5cclxubGV0IGxhc3Rfb2JzdGFjbGUgPSAxO1xyXG5sZXQgem9uZV9lbmRwb2ludCA9IHtpbmRleDogLTEsIGNlbGw6IDB9XHJcblxyXG52YXIgZ3Vuc2hvdF9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL2d1bnNob3QubXAzJyk7XHJcbnZhciBzd29yZF9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL3N3b3JkLndhdicpO1xyXG5cclxuZ3Vuc2hvdF9hdWRpby52b2x1bWUgPSAwLjJcclxuc3dvcmRfYXVkaW8udm9sdW1lID0gMC4yXHJcblxyXG5mdW5jdGlvbiByZWNvbm5lY3QoKSB7XHJcbiAgaWYgKCFzb2NrZXQuaXNSZWFkeSgpKSB7XHJcbiAgICBzb2NrZXQuaW5pdChTRVJWRVJfQUREUkVTUyk7XHJcbiAgICBzb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlckRlZmF1bHQoKTtcclxuICAgIGNvbnNvbGUubG9nKCdIb3BlZnVsbHkgcmVjb25uZWN0ZWQgKHByYXkpJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKCdXYXMgb25saW5lIGFueXdheScpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XHJcbiAgZ2FtZV9zdGF0ZS5zaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZF9zaXplXCIpLnZhbHVlO1xyXG4gIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLmZvZ19zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuem9uZV9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUgKiBnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG4gICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGUucHVzaCgwKTtcclxuICB9XHJcbiAgc2VuZF9jb25zdHJ1Y3RfY29tbWFuZChnYW1lX3N0YXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEJvYXJkKCkge1xyXG4gIHZhciBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfbmFtZVwiKS52YWx1ZTtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnbG9hZF9nYW1lJztcclxuICB0b1NlbmQuc2F2ZV9uYW1lID0gbmFtZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kX2NvbnN0cnVjdF9jb21tYW5kKG5ld19nYW1lX3N0YXRlKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2NvbnN0cnVjdF9ib2FyZCc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuZ2FtZV9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBub19zaGlmdF9vbmNsaWNrKG15X3JvbGUsIGdtX2NvbnRyb2xfbW9kLCBnYW1lX3N0YXRlLCBmaWVsZF9jaG9zZW4sIGNlbGwsIGluZGV4KSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgLy8gZ20gc2lkZVxyXG4gICAgaWYgKGdtX2NvbnRyb2xfbW9kID09IDApIHtcclxuICAgICAgLy8gd2UgYXJlIGluIG5vcm1hbCBhZGQvbW92ZSBkZWxldGUgbW9kZVxyXG4gICAgICBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIG15X3JvbGUpO1xyXG4gICAgfSBlbHNlIGlmIChnbV9jb250cm9sX21vZCA9PSAxKSB7XHJcbiAgICAgIC8vIHdlIGFyZSBpbiBmb2cgbW9kZVxyXG4gICAgICBhcHBseUZvZyhpbmRleCwgY2VsbCk7XHJcbiAgICB9IGVsc2UgaWYgKGdtX2NvbnRyb2xfbW9kID09IDIpIHtcclxuICAgICAgLy8gd2UgYXJlIGluIHpvbmVzIG1vZGVcclxuICAgICAgYXNzaWduWm9uZShpbmRleCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIHBsYXllciBzaWRlXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDEpIHtcclxuICAgICAgLy8gY2xpY2tlZCBmb2dcclxuICAgICAgaWYgKGZpZWxkX2Nob3NlbiA9PSAxKSB7XHJcbiAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIGZvZyBkZXRlY3RlZCcpO1xyXG4gICAgICAgIGRpc3BsYXlGb2coKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCBteV9yb2xlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNoaWZ0X29uY2xpY2soaW5kZXgsIGNlbGwpIHtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICBpZiAoZ21fY29udHJvbF9tb2QgPT0gMikge1xyXG4gICAgICBpZiAoem9uZV9lbmRwb2ludC5pbmRleCA8IDApIHtcclxuICAgICAgICB6b25lX2VuZHBvaW50LmluZGV4ID0gaW5kZXhcclxuICAgICAgICB6b25lX2VuZHBvaW50LmNlbGwgPSBjZWxsXHJcbiAgICAgICAgY2VsbC5zcmMgPSBaT05FX0VORFBPSU5UX1BJQ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVuZHBvaW50X2Fzc2lnbl96b25lKGluZGV4LCB6b25lX2VuZHBvaW50LmluZGV4KVxyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQ1xyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuaW5kZXggPSAtMVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9vYnN0YWNsZSc7XHJcbiAgICAgIHRvU2VuZC5jZWxsX2lkID0gaW5kZXg7XHJcbiAgICAgIHRvU2VuZC5vYnN0YWNsZV9udW1iZXIgPSBsYXN0X29ic3RhY2xlO1xyXG4gICAgICB0b1NlbmQub2JzdGFjbGVfbmFtZSA9IG9ic3RhY2xlX2xpc3RbbGFzdF9vYnN0YWNsZSAtIDFdO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGN0cmxfb25jbGljayhpbmRleCkge1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIHZhciBmb2dfdmFsdWUgPSBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF1cclxuICAgIHZhciBtb2QgPSAxIC0gZm9nX3ZhbHVlXHJcbiAgICB2YXIgem9uZSA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF1cclxuICAgIGZvZ1BhcnNlWm9uZShtb2QsIHpvbmUpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb25zdHJ1Y3RfYm9hcmQobmV3X2dhbWVfc3RhdGUpIHtcclxuICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlID0gbmV3X2dhbWVfc3RhdGUuYm9hcmRfc3RhdGU7XHJcbiAgZ2FtZV9zdGF0ZS5zaXplID0gbmV3X2dhbWVfc3RhdGUuc2l6ZTtcclxuICBnYW1lX3N0YXRlLmZvZ19zdGF0ZSA9IG5ld19nYW1lX3N0YXRlLmZvZ19zdGF0ZTtcclxuICBnYW1lX3N0YXRlLnpvbmVfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZS56b25lX3N0YXRlO1xyXG4gIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlID0gbmV3X2dhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlO1xyXG4gIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzID0gbmV3X2dhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzO1xyXG5cclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIGJvYXJkX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xyXG4gIGJvYXJkX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIHZhciBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuICBib2FyZC5jbGFzc05hbWUgPSBcImJvYXJkXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIHZhciByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICByb3cuY2xhc3NOYW1lID0gXCJib2FyZF9yb3dcIjtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZV9zdGF0ZS5zaXplOyBqKyspIHtcclxuICAgICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICAgIHZhciBjZWxsX2lkID0gaSAqIGdhbWVfc3RhdGUuc2l6ZSArIGo7XHJcbiAgICAgIGJ1dHRvbi5pZCA9IFwiY2VsbF9cIiArIGNlbGxfaWQ7XHJcbiAgICAgIGJ1dHRvbi5yb3cgPSBpO1xyXG4gICAgICBidXR0b24uY29sdW1uID0gajtcclxuICAgICAgdmFyIGltYWdlX25hbWUgPSBmb2dPclBpYyhjZWxsX2lkKTtcclxuICAgICAgYnV0dG9uLnNyYyA9IGltYWdlX25hbWU7XHJcbiAgICAgIGJ1dHRvbi5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdib2FyZF9jZWxsJztcclxuICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHZhciBpbmRleCA9IGNlbGwucm93ICogZ2FtZV9zdGF0ZS5zaXplICsgY2VsbC5jb2x1bW47XHJcblxyXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgc2hpZnRfb25jbGljayhpbmRleCwgY2VsbClcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAgIGN0cmxfb25jbGljayhpbmRleClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbm9fc2hpZnRfb25jbGljayhteV9yb2xlLCBnbV9jb250cm9sX21vZCwgZ2FtZV9zdGF0ZSwgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzLCBjZWxsLCBpbmRleClcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG4gICAgICB2YXIgY2VsbF93cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xyXG4gICAgICBjZWxsX3dyYXAuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgY2VsbF93cmFwLmNsYXNzTmFtZSA9IFwiY2VsbF93cmFwXCI7XHJcblxyXG4gICAgICB2YXIgem9uZV90ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgem9uZV90ZXh0LmlkID0gXCJ6b25lX3RleHRfXCIgKyBjZWxsX2lkO1xyXG4gICAgICB6b25lX3RleHQuY2xhc3NOYW1lID0gXCJ6b25lX3RleHRcIjtcclxuICAgICAgY2VsbF93cmFwLmFwcGVuZENoaWxkKHpvbmVfdGV4dCk7XHJcblxyXG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbF93cmFwKTtcclxuICAgIH1cclxuICAgIGJvYXJkLmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgfVxyXG4gIGJvYXJkX2NvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVuZHBvaW50X2Fzc2lnbl96b25lKGVuZHBvaW50MSwgZW5kcG9pbnQyKSB7XHJcbiAgdmFyIHpvbmVfbnVtYmVyID0gem9uZV9udW1iZXJfc2VsZWN0LnZhbCgpO1xyXG4gIHZhciBtb2RpZmljYXRvciA9IHNlYXJjaF9tb2RpZmljYXRvci52YWwoKTtcclxuICB2YXIgc2l6ZSA9IGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgaW5kZXhfbGlzdCA9IFtdXHJcblxyXG4gIHZhciBjb29yZDEgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDEsIHNpemUpXHJcbiAgdmFyIGNvb3JkMiA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50Miwgc2l6ZSlcclxuXHJcbiAgdmFyIHRvcF9sZWZ0ID0gdG9wX2xlZnRfY29vcmQoY29vcmQxLCBjb29yZDIpXHJcbiAgdmFyIGJvdHRvbV9yaWdodCA9IGJvdHRvbV9yaWdodF9jb29yZChjb29yZDEsIGNvb3JkMilcclxuXHJcbiAgZm9yIChsZXQgaSA9IHRvcF9sZWZ0Lng7IGkgPD0gYm90dG9tX3JpZ2h0Lng7IGkrKykge1xyXG4gICAgZm9yIChsZXQgaiA9IHRvcF9sZWZ0Lnk7IGogPD0gYm90dG9tX3JpZ2h0Lnk7IGorKykge1xyXG4gICAgICB2YXIgY29vcmQgPSB7fVxyXG4gICAgICBjb29yZC54ID0gaVxyXG4gICAgICBjb29yZC55ID0galxyXG4gICAgICB2YXIgaW5kZXggPSBjb29yZF90b19pbmRleChjb29yZCwgc2l6ZSlcclxuXHJcbiAgICAgIGluZGV4X2xpc3QucHVzaChpbmRleClcclxuICAgICAgdmFyIHpvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd6b25lX3RleHRfJyArIGluZGV4KTtcclxuICAgICAgem9uZV90ZXh0LmlubmVySFRNTCA9IHpvbmVfbnVtYmVyICsgJygnICsgbW9kaWZpY2F0b3IgKyAnKSc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnYXNzaWduX3pvbmUnO1xyXG4gIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gIHRvU2VuZC5pbmRleF9saXN0ID0gaW5kZXhfbGlzdDtcclxuICB0b1NlbmQubW9kaWZpY2F0b3IgPSBtb2RpZmljYXRvcjtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b3BfbGVmdF9jb29yZChjb29yZDEsIGNvb3JkMikge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGgubWluKGNvb3JkMS54LCBjb29yZDIueClcclxuICB0b1JldC55ID0gTWF0aC5taW4oY29vcmQxLnksIGNvb3JkMi55KVxyXG4gIHJldHVybiB0b1JldFxyXG59XHJcblxyXG5mdW5jdGlvbiBib3R0b21fcmlnaHRfY29vcmQoY29vcmQxLCBjb29yZDIpIHtcclxuICB2YXIgdG9SZXQgPSB7fVxyXG4gIHRvUmV0LnggPSBNYXRoLm1heChjb29yZDEueCwgY29vcmQyLngpXHJcbiAgdG9SZXQueSA9IE1hdGgubWF4KGNvb3JkMS55LCBjb29yZDIueSlcclxuICByZXR1cm4gdG9SZXRcclxufVxyXG5cclxuZnVuY3Rpb24gY29vcmRfdG9faW5kZXgoY29vcmQsIHNpemUpIHtcclxuICB2YXIgaW5kZXggPSBjb29yZC54ICogc2l6ZSArIGNvb3JkLnlcclxuICByZXR1cm4gaW5kZXhcclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduWm9uZShpbmRleCkge1xyXG4gIHZhciB6b25lX251bWJlciA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICB2YXIgbW9kaWZpY2F0b3IgPSBzZWFyY2hfbW9kaWZpY2F0b3IudmFsKCk7XHJcblxyXG4gIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9uZV90ZXh0XycgKyBpbmRleCk7XHJcbiAgem9uZV90ZXh0LmlubmVySFRNTCA9IHpvbmVfbnVtYmVyICsgJygnICsgbW9kaWZpY2F0b3IgKyAnKSc7XHJcblxyXG4gIHZhciBpbmRleF9saXN0ID0gW11cclxuICBpbmRleF9saXN0LnB1c2goaW5kZXgpXHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhc3NpZ25fem9uZSc7XHJcbiAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgdG9TZW5kLmluZGV4X2xpc3QgPSBpbmRleF9saXN0O1xyXG4gIHRvU2VuZC5tb2RpZmljYXRvciA9IG1vZGlmaWNhdG9yO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ09yUGljKGNlbGxfaWQpIHtcclxuICB2YXIgcGljdHVyZV9uYW1lID0gRk9HX0lNQUdFO1xyXG4gIGlmICgoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbY2VsbF9pZF0gIT0gMSl8fChteV9yb2xlID09ICdnbScpKSB7XHJcbiAgICB2YXIgY2hhcl9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2VsbF9pZF1cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJfaWRdID09IFwiYWxsXCIgfHwgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyX2lkXSA9PSBteV9uYW1lKSB7XHJcbiAgICAgIHBpY3R1cmVfbmFtZSA9IGdldF9vYmplY3RfcGljdHVyZShjaGFyX2lkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBpY3R1cmVfbmFtZSA9IGdldF9vYmplY3RfcGljdHVyZSgwKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHBpY3R1cmVfbmFtZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCByb2xlKSB7XHJcblx0aWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID09IDApIHsgLy8gZW1wdHkgY2VsbCBjbGlja2VkXHJcblxyXG4gICAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2Vzcykge1xyXG4gICAgICBjYXNlIDA6IC8vIG5vdGhpbmdcclxuICAgICAgICBpZiAocm9sZSA9PSAnZ20nKSB7XHJcbiAgICAgICAgICBhZGRfb2JqZWN0KGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTogLy8gbW92ZVxyXG4gICAgICAgIG1vdmVfY2hhcmFjdGVyKGluZGV4LCBjZWxsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOiAvL2F0dGFja1xyXG4gICAgICAgIHN0b3BfYXR0YWNrKClcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOiAvL3NraWxsXHJcbiAgICAgICAgcGVyZm9ybV9za2lsbChpbmRleCwgY2VsbClcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJlc29sdmluZyBvbl9jbGljayBlbXB0eVwiKVxyXG4gICAgfVxyXG5cclxuXHR9IGVsc2UgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID4gMCkgeyAvLyBjaGFyYWN0ZXIgY2xpY2tlZFxyXG4gICAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2Vzcykge1xyXG4gICAgICBjYXNlIDA6IC8vIG5vdGhpbmdcclxuICAgICAgICBzZWxlY3RfY2hhcmFjdGVyKGluZGV4LCBjZWxsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxOiAvLyBtb3ZlXHJcbiAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOiAvL2F0dGFja1xyXG4gICAgICAgIHBlcmZvcm1fYXR0YWNrKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6IC8vc2tpbGxcclxuICAgICAgICBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVzb2x2aW5nIG9uX2NsaWNrIGNoYXJhY3RlclwiKVxyXG4gICAgfVxyXG5cclxuXHR9IGVsc2UgeyAvLyBvYnN0YWNsZSBjbGlja2VkXHJcblxyXG4gICAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2Vzcykge1xyXG4gICAgICBjYXNlIDA6IC8vIG5vdGhpbmdcclxuICAgICAgICBzZWxlY3Rfb2JzdGFjbGUoaW5kZXgsIGNlbGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6IC8vIG1vdmVcclxuICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6IC8vYXR0YWNrXHJcbiAgICAgICAgc3RvcF9hdHRhY2soKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6IC8vc2tpbGxcclxuICAgICAgICBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVzb2x2aW5nIG9uX2NsaWNrIG9ic3RhY2xlXCIpXHJcbiAgICB9XHJcblxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5kZXhfdG9fY29vcmRpbmF0ZXMoaW5kZXgsIHNpemUpIHtcclxuICB2YXIgdG9SZXQgPSB7fVxyXG4gIHRvUmV0LnggPSBNYXRoLmZsb29yKGluZGV4L3NpemUpXHJcbiAgdG9SZXQueSA9IGluZGV4ICUgc2l6ZVxyXG4gIHJldHVybiB0b1JldFxyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kRGlzdGFuY2UoaW5kZXgxLCBpbmRleDIpIHtcclxuICB2YXIgeDEgPSBNYXRoLmZsb29yKGluZGV4MS9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkxID0gaW5kZXgxICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciB4MiA9IE1hdGguZmxvb3IoaW5kZXgyL2dhbWVfc3RhdGUuc2l6ZSlcclxuICB2YXIgeTIgPSBpbmRleDIgJSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIGRpc3RhbmNlX3NxdWFyZWQgPSAoeDEteDIpKih4MS14MikgKyAoeTEteTIpKih5MS15MilcclxuICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZGlzdGFuY2Vfc3F1YXJlZClcclxuICByZXR1cm4gcGFyc2VGbG9hdChkaXN0YW5jZSlcclxufVxyXG5cclxuZnVuY3Rpb24gaXNJblJhbmdlKGluZGV4MSwgaW5kZXgyLCByYW5nZSkge1xyXG4gIHZhciB4MSA9IE1hdGguZmxvb3IoaW5kZXgxL2dhbWVfc3RhdGUuc2l6ZSlcclxuICB2YXIgeTEgPSBpbmRleDEgJSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIHgyID0gTWF0aC5mbG9vcihpbmRleDIvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MiA9IGluZGV4MiAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgZGlzdGFuY2UgPSAoeDEteDIpKih4MS14MikgKyAoeTEteTIpKih5MS15MilcclxuICByZXR1cm4gZGlzdGFuY2UgPD0gcmFuZ2UqcmFuZ2VcclxufVxyXG5cclxuZnVuY3Rpb24gaW5kZXhfaW5fcmFkaXVzKGluZGV4LCByYW5nZSkge1xyXG4gIHZhciBzaXplID0gZ2FtZV9zdGF0ZS5zaXplXHJcbiAgdmFyIHggPSBNYXRoLmZsb29yKGluZGV4L3NpemUpXHJcbiAgdmFyIHkgPSBpbmRleCAlIHNpemVcclxuICB2YXIgY2FuZGlkYXRlX2luZGV4X2xpc3QgPSBbXVxyXG5cclxuICAvL2NvbnNvbGUubG9nKFwieDogXCIgKyB4ICsgXCIgeTogXCIgKyB5ICsgXCIgaW5kZXg6IFwiICsgaW5kZXgpXHJcblxyXG4gIGZvciAobGV0IGkgPSBNYXRoLmZsb29yKC0xICogcmFuZ2UpOyBpIDw9IE1hdGguY2VpbChyYW5nZSk7IGkrKykge1xyXG4gICAgZm9yIChsZXQgaiA9IE1hdGguZmxvb3IoLTEgKiByYW5nZSk7IGogPD0gTWF0aC5jZWlsKHJhbmdlKTsgaisrKSB7XHJcbiAgICAgIHZhciBjYW5kX3ggPSB4ICsgaVxyXG4gICAgICB2YXIgY2FuZF95ID0geSArIGpcclxuICAgICAgLy9jb25zb2xlLmxvZyhcImNhbmRfeDogXCIgKyBjYW5kX3ggKyBcIiBjYW5kX3k6IFwiICsgY2FuZF95KVxyXG4gICAgICBpZiAoY2FuZF94ID49MCAmJiBjYW5kX3ggPCBzaXplICYmIGNhbmRfeSA+PTAgJiYgY2FuZF95IDwgc2l6ZSkge1xyXG4gICAgICAgIHZhciBjYW5kX2luZGV4ID0gY2FuZF94KnNpemUgKyBjYW5kX3lcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FuZF9pbmRleDogXCIgKyBjYW5kX2luZGV4KVxyXG4gICAgICAgIGlmIChpc0luUmFuZ2UoaW5kZXgsIGNhbmRfaW5kZXgsIHJhbmdlKSkge1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNhbmRfaW5kZXg6IFwiICsgY2FuZF9pbmRleCArIFwid2FzIGNvbnNpZGVyZWQgaW4gcmFuZ2VcIilcclxuICAgICAgICAgIGNhbmRpZGF0ZV9pbmRleF9saXN0LnB1c2goY2FuZF9pbmRleClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGNhbmRpZGF0ZV9pbmRleF9saXN0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxfeCh4KSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHgpICsgMVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseUZvZyhpbmRleCwgY2VsbCkge1xyXG5cdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPT0gMSkge1xyXG5cdFx0Ly8gc2VuZCB1cGRhdGUgbWVzc2FnZVxyXG5cdFx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdFx0dG9TZW5kLmNvbW1hbmQgPSAndXBkYXRlX2ZvZyc7XHJcblx0XHR0b1NlbmQudXBkYXRlX3R5cGUgPSAncmVtb3ZlJztcclxuXHRcdHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuXHRcdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQvLyBzZW5kIHVwZGF0ZSBtZXNzYWdlXHJcblx0XHR2YXIgdG9TZW5kID0ge307XHJcblx0XHR0b1NlbmQuY29tbWFuZCA9ICd1cGRhdGVfZm9nJztcclxuXHRcdHRvU2VuZC51cGRhdGVfdHlwZSA9ICdhZGQnO1xyXG5cdFx0dG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG5cdFx0c29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhcl9jb250YWluZXJzKCkge1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgd2VhcG9uX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxufVxyXG5cclxuZnVuY3Rpb24gdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKSB7XHJcbiAgdGlueV9hbmltYXRpb24oY2hhcmFjdGVyX2luZm9fY29udGFpbmVyKTtcclxuICB0aW55X2FuaW1hdGlvbih3ZWFwb25faW5mb19jb250YWluZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JqZWN0KGJvYXJkX2luZGV4KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBidXR0b25fY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBidXR0b25fY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiYWRkLW9iamVjdC1idXR0b24tY29udGFpbmVyXCI7XHJcblxyXG4gIHZhciBidXR0b25fYWRkX2NoYXJhY3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uX2FkZF9jaGFyYWN0ZXIuaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMINC/0LXRgNGB0L7QvdCw0LbQsFwiO1xyXG4gIGJ1dHRvbl9hZGRfY2hhcmFjdGVyLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGFkZF9jaGFyYWN0ZXIoYm9hcmRfaW5kZXgpO1xyXG4gIH07XHJcblxyXG4gIHZhciBidXR0b25fYWRkX29ic3RhY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b25fYWRkX29ic3RhY2xlLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1XCI7XHJcbiAgYnV0dG9uX2FkZF9vYnN0YWNsZS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpO1xyXG4gIH07XHJcblxyXG4gIGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9jaGFyYWN0ZXIpO1xyXG4gIGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9vYnN0YWNsZSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b25fY29udGFpbmVyKTtcclxuXHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0aW55X2FuaW1hdGlvbihjb250YWluZXIpIHtcclxuICBjb250YWluZXIuYWRkQ2xhc3MoVElOWV9FRkZFQ1RfQ0xBU1MpO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoVElOWV9FRkZFQ1RfQ0xBU1MpO1xyXG4gIH0sIDUwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIG9ic3RhY2xlX251bWJlcikge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhZGRfb2JzdGFjbGUnO1xyXG4gIHRvU2VuZC5jZWxsX2lkID0gaW5kZXg7XHJcbiAgdG9TZW5kLm9ic3RhY2xlX251bWJlciA9IG9ic3RhY2xlX251bWJlciArIDE7XHJcbiAgdG9TZW5kLm9ic3RhY2xlX25hbWUgPSBvYnN0YWNsZV9saXN0W29ic3RhY2xlX251bWJlcl07XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNlbGVjdC5pZCA9IFwib2JzdGFjbGVfY2hvc2VuXCI7XHJcbiAgc2VsZWN0LmNsYXNzTmFtZSA9IFwib2JqZWN0X3NlbGVjdFwiXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgb2JzdGFjbGVfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IG9ic3RhY2xlX2xpc3RbaV07XHJcbiAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG4gIGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG4gIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcbiAgICB2YXIgb2JzdGFjbGVfbnVtYmVyID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvYnN0YWNsZV9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuICAgIGFkZF9vYnN0YWNsZV9jb21tYW5kKGJ1dHRvbi5ib2FyZF9pbmRleCwgb2JzdGFjbGVfbnVtYmVyKVxyXG5cclxuICAgIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gIH1cclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzZWxlY3QpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uKTtcclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNlbGVjdC5pZCA9IFwiY2hhcmFjdGVyX2Nob3NlblwiO1xyXG4gIHNlbGVjdC5jbGFzc05hbWUgPSBcIm9iamVjdF9zZWxlY3RcIlxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJhY3Rlcl9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gY2hhcmFjdGVyX2xpc3RbaV07XHJcbiAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG4gIGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG4gIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcbiAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyX2Nob3NlblwiKS52YWx1ZSk7XHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX2NoYXJhY3Rlcic7XHJcbiAgICB0b1NlbmQuY2VsbF9pZCA9IGJ1dHRvbi5ib2FyZF9pbmRleDtcclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlciArIDE7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBjaGFyYWN0ZXJfbGlzdFtjaGFyYWN0ZXJfbnVtYmVyXTtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgICBjbGVhcl9jb250YWluZXJzKDApXHJcbiAgfVxyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHNlbGVjdCk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b24pO1xyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vdmVfY2hhcmFjdGVyKHRvX2luZGV4LCB0b19jZWxsKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMDsgLy8gZW5kIHRoZSBtb3Rpb25cclxuICB2YXIgY2hvc2VuX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIGRpc3RhbmNlID0gZmluZERpc3RhbmNlKHRvX2luZGV4LCBjaG9zZW5faW5kZXgpXHJcbiAgdmFyIG1heF9kaXN0YW5jZSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltjaG9zZW5fY2hhcmFjdGVyX2luZGV4XVxyXG5cclxuICBpZiAoZGlzdGFuY2UgPD0gbWF4X2Rpc3RhbmNlKSB7XHJcbiAgICBpZiAoIShjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdICE9IFwiYWxsXCIgJiYgZGlzdGFuY2UgPiAyKSkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ21vdmVfY2hhcmFjdGVyJztcclxuICAgICAgdG9TZW5kLmZyb21faW5kZXggPSBjaG9zZW5faW5kZXg7XHJcbiAgICAgIHRvU2VuZC50b19pbmRleCA9IHRvX2luZGV4O1xyXG4gICAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXg7XHJcbiAgICAgIHRvU2VuZC5jaGFyYWN0ZXJfYXZhdGFyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uYXZhdGFyO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQuZGlzdGFuY2UgPSBkaXN0YW5jZVxyXG4gICAgICB0b1NlbmQubGVmdF9zaGllbGQgPSAwXHJcbiAgICAgIHRvU2VuZC5taW5lc19leHBsb2RlZCA9IFtdXHJcbiAgICAgIHRvU2VuZC5taW5lc19kYW1hZ2UgPSAwXHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcImZvcmNlX2ZpZWxkX3RhcmdldFwiKSkge1xyXG4gICAgICAgIHZhciBzaGllbGRfaW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmZvcmNlX2ZpZWxkX3RhcmdldC5zaGllbGRfaW5kZXhcclxuICAgICAgICBpZighZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5jZWxsc19wcm90ZWN0ZWQuaW5jbHVkZXModG9faW5kZXgpKSB7Ly8g0L/QvtC60LjQvdGD0Lsg0LfQvtC90YMg0LfQsNGJ0LjRgtGLXHJcbiAgICAgICAgICB0b1NlbmQubGVmdF9zaGllbGQgPSAxXHJcbiAgICAgICAgICB0b1NlbmQuc2hpZWxkX2luZGV4ID0gc2hpZWxkX2luZGV4XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkID0gW107XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdICE9IFwiYWxsXCIpIHsvL3VzZXIgaXMgaW52aXNpYmxlXHJcbiAgICAgICAgdmFyIGltbWVkaWF0ZV9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIDEpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1tZWRpYXRlX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSAhPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4KSB7Ly8gdGhlcmUgYXJlIGNoYXJhY3RlcnMgdGhlcmVcclxuICAgICAgICAgICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkLnB1c2goY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgIHZhciBleHRlbmRlZF9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIGludmlzaWJpbGl0eV9kZXRlY3Rpb25fcmFkaXVzKTtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXh0ZW5kZWRfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dICE9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgpIHsvLyB0aGVyZSBhcmUgY2hhcmFjdGVycyB0aGVyZVxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfY2hhcl9udW0gPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV07XHJcbiAgICAgICAgICAgICAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjdXJyZW50X2NoYXJfbnVtXS5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvbGwgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkLnB1c2goY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXModG9faW5kZXgpKSB7XHJcbiAgICAgICAgdG9TZW5kLm1pbmVzX2V4cGxvZGVkLnB1c2godG9faW5kZXgpXHJcbiAgICAgICAgdG9TZW5kLm1pbmVzX2RhbWFnZSA9IHRvU2VuZC5taW5lc19kYW1hZ2UgKyByb2xsX3gobWluZXNfMF9kaXN0YW5jZV9kYW1hZ2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgaW1tZWRpYXRlX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgMSk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1tZWRpYXRlX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gPiAwICYmIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCkgey8vIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIHRoZXJlXHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2dhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV1dICE9IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMoaW1tZWRpYXRlX25iaFtpXSkgJiYgaW1tZWRpYXRlX25iaFtpXSAhPSB0b19pbmRleCkge1xyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZXhwbG9kZWQucHVzaChpbW1lZGlhdGVfbmJoW2ldKVxyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZGFtYWdlID0gdG9TZW5kLm1pbmVzX2RhbWFnZSArIHJvbGxfeChtaW5lc18xX2Rpc3RhbmNlX2RhbWFnZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBvbmVfYW5kX2hhbGZfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCAxLjYpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9uZV9hbmRfaGFsZl9uYmgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMob25lX2FuZF9oYWxmX25iaFtpXSkgJiYgKCFpbW1lZGlhdGVfbmJoLmluY2x1ZGVzKG9uZV9hbmRfaGFsZl9uYmhbaV0pKSkge1xyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZXhwbG9kZWQucHVzaChvbmVfYW5kX2hhbGZfbmJoW2ldKVxyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZGFtYWdlID0gdG9TZW5kLm1pbmVzX2RhbWFnZSArIHJvbGxfeChtaW5lc18xcDVfZGlzdGFuY2VfZGFtYWdlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGV4dGVuZGVkX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgaW52aXNpYmlsaXR5X2RldGVjdGlvbl9yYWRpdXMpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4dGVuZGVkX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dICE9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXggJiYgKCFpbW1lZGlhdGVfbmJoLmluY2x1ZGVzKGV4dGVuZGVkX25iaFtpXSkpKSB7Ly8gdGhlcmUgYXJlIGNoYXJhY3RlcnMgdGhlcmVcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRfY2hhcl9udW0gPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV07XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2N1cnJlbnRfY2hhcl9udW1dICE9IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICAgICAgICAgIGlmIChyb2xsID4gMTApIHtcclxuICAgICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChjdXJyZW50X2NoYXJfbnVtKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY2xlYXJfY29udGFpbmVycygpO1xyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgICAgIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IHRvX2luZGV4XHJcbiAgICAgIHZhciB0b19jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHRvX2luZGV4KTtcclxuICAgICAgY2hhcmFjdGVyX2Nob3Nlbi5jZWxsID0gdG9fY2VsbFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQkiDQuNC90LLQuNC30LUg0L/RgNC40YXQvtC00LjRgtGB0Y8g0LrRgNCw0YHRgtGM0YHRjyAo0YXQvtC00LjRgtC1INC/0L4gMS0yINC60LvQtdGC0LrQuClcIilcclxuICAgICAgdW5kb19zZWxlY3Rpb24oKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCf0L7Qu9C10LPRh9C1LCDQvNGB0YzQtSDQkdC+0LvRglwiKVxyXG4gICAgdW5kb19zZWxlY3Rpb24oKVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlGb2coKSB7XHJcblx0Y2xlYXJfY29udGFpbmVycygpXHJcblxyXG5cdHZhciBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgaW5mby5pbm5lckhUTUwgPSAn0JzRiyDQvdC1INC30L3QsNC10LwsINGH0YLQviDRjdGC0L4g0YLQsNC60L7QtS4g0JXRgdC70Lgg0LHRiyDQvNGLINC30L3QsNC70Lgg0YfRgtC+INGN0YLQviDRgtCw0LrQvtC1LCDQvdC+INC80Ysg0L3QtSDQt9C90LDQtdC8Lic7XHJcblxyXG5cdHZhciBmb2dfcGljdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgZm9nX3BpY3R1cmUuc3JjID0gUVVFU1RJT05fSU1BR0U7XHJcbiAgZm9nX3BpY3R1cmUuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGZvZ19waWN0dXJlLnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG5cdGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoaW5mbyk7XHJcblx0Y2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChmb2dfcGljdHVyZSk7XHJcblxyXG50aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZV9jaGFyYWN0ZXIoaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnZGVsZXRlX2NoYXJhY3Rlcic7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0X2NoYXJhY3RlcihpbmRleCwgY2VsbCkge1xyXG4gIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuXHJcblxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IFwiYWxsXCIgfHwgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSBteV9uYW1lKSB7XHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gaW5kZXhcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNlbGwgPSBjZWxsXHJcblxyXG4gIGxldCBuYW1lID0gY2hhcmFjdGVyLm5hbWU7XHJcbiAgbGV0IGF2YXRhciA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcblxyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgbmFtZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIG5hbWVfZGlzcGxheS5pbm5lckhUTUwgPSBuYW1lO1xyXG5cclxuICB2YXIgYXZhdGFyX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgdmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG4gIGF2YXRhcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYXZhdGFyX2Rpc3BsYXkpXHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQobmFtZV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGF2YXRhcl9jb250YWluZXIpO1xyXG5cclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIgfHwgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gMSkge1xyXG5cclxuICAgIGF2YXRhcl9kaXNwbGF5Lm9ubW91c2VlbnRlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICB2YXIgbWFpbl9hY3Rpb24gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIGJvbnVzX2FjdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIG1vdmVfYWN0aW9uID0gTWF0aC5mbG9vcihjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0pXHJcblxyXG4gICAgICB2YXIgbWFpbl9hY3Rpb25fZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgbWFpbl9hY3Rpb25fZGlzcGxheS5pZCA9IFwibWFpbl9hY3Rpb25fZGlzcGxheVwiO1xyXG4gICAgICBtYWluX2FjdGlvbl9kaXNwbGF5LmlubmVySFRNTCA9IFwi0J7RgdC90L7QstC90YvRhTogXCIgKyBtYWluX2FjdGlvblxyXG5cclxuICAgICAgdmFyIGJvbnVzX2FjdGlvbl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICBib251c19hY3Rpb25fZGlzcGxheS5pZCA9IFwiYm9udXNfYWN0aW9uX2Rpc3BsYXlcIjtcclxuICAgICAgYm9udXNfYWN0aW9uX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQkdC+0L3Rg9GB0L3Ri9GFOiBcIiArIGJvbnVzX2FjdGlvblxyXG5cclxuICAgICAgdmFyIG1vdmVfYWN0aW9uX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgIG1vdmVfYWN0aW9uX2Rpc3BsYXkuaWQgPSBcIm1vdmVfYWN0aW9uX2Rpc3BsYXlcIjtcclxuICAgICAgbW92ZV9hY3Rpb25fZGlzcGxheS5pbm5lckhUTUwgPSBcItCf0LXRgNC10LTQstC40LbQtdC90LjQtTogXCIgKyBtb3ZlX2FjdGlvblxyXG5cclxuXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQobWFpbl9hY3Rpb25fZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChib251c19hY3Rpb25fZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChtb3ZlX2FjdGlvbl9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuc2hvdygpXHJcbiAgICB9XHJcblxyXG4gICAgYXZhdGFyX2Rpc3BsYXkub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmhpZGUoKVxyXG4gICAgfVxyXG5cclxuICB2YXIgc3RyZW5ndGhfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBzdHJlbmd0aF9kaXNwbGF5LmlubmVySFRNTCA9IFwiQ9C40LvQsDogXCIgKyBjaGFyYWN0ZXIuc3RyZW5ndGg7XHJcblxyXG4gIHZhciBzdGFtaW5hX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgc3RhbWluYV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KLQtdC70L7RgdC70L7QttC10L3QuNC1OiBcIiArIGNoYXJhY3Rlci5zdGFtaW5hO1xyXG5cclxuICB2YXIgYWdpbGl0eV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGFnaWxpdHlfZGlzcGxheS5pbm5lckhUTUwgPSBcItCb0L7QstC60L7RgdGC0Yw6IFwiICsgY2hhcmFjdGVyLmFnaWxpdHk7XHJcblxyXG4gIHZhciBpbnRlbGxpZ2VuY2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBpbnRlbGxpZ2VuY2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCY0L3RgtC10LvQu9C10LrRgjogXCIgKyBjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlO1xyXG5cclxuICB2YXIgS0RfdmFsdWUgPSBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtjaGFyYWN0ZXJfbnVtYmVyXSlcclxuICB2YXIgS0RfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBLRF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JrQlDogXCIgKyBLRF92YWx1ZTtcclxuXHJcbiAgdmFyIGhwX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSkvcGFyc2VGbG9hdChIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKVxyXG4gIGhwX3BlcmNlbnQgPSBNYXRoLmZsb29yKGhwX3BlcmNlbnQqMTAwKVxyXG5cclxuICB2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBIUF9kaXNwbGF5LmlkID0gXCJIUF9kaXNwbGF5XCI7XHJcbiAgSFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdICsgXCIgKFwiICsgaHBfcGVyY2VudCArIFwiJSlcIjtcclxuXHJcbiAgdmFyIHRpcmVkX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSlcclxuICB0aXJlZF9wZXJjZW50ID0gTWF0aC5mbG9vcih0aXJlZF9wZXJjZW50KjEwMClcclxuXHJcbiAgdmFyIHRpcmVkX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgdGlyZWRfZGlzcGxheS5pZCA9IFwidGlyZWRfZGlzcGxheVwiO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQktGL0L3QvtGB0LvQuNCy0L7RgdGC0Yw6IFwiICsgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0gKyBcIiAoXCIgKyB0aXJlZF9wZXJjZW50ICsgXCIlKVwiO1xyXG5cclxuICB2YXIgaW5pdGlhdGl2ZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGluaXRpYXRpdmVfZGlzcGxheS5pbm5lckhUTUwgPSBcItCY0L3QuNGG0LjQsNGC0LjQstCwOiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHN0cmVuZ3RoX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoc3RhbWluYV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGFnaWxpdHlfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChpbnRlbGxpZ2VuY2VfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChLRF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKEhQX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQodGlyZWRfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChpbml0aWF0aXZlX2Rpc3BsYXkpO1xyXG5cclxuICB2YXIgbW92ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIG1vdmVfYnV0dG9uLmlubmVySFRNTCA9IFwi0J/QtdGA0LXQvNC10YnQtdC90LjQtVwiO1xyXG4gIG1vdmVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgbW92ZV9idXR0b24uY2VsbCA9IGNlbGw7XHJcbiAgbW92ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgY2hhcmFjdGVyX3BpY2tlZCA9IGV2ZW50LnRhcmdldFxyXG4gICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NoYXJhY3Rlcl9waWNrZWQuaW5kZXhdO1xyXG4gICAgdmFyIG1vdmVfYWN0aW9uc19sZWZ0ID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBpZiAobW92ZV9hY3Rpb25zX2xlZnQgPiAwKSB7XHJcbiAgICAgIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoY2hhcmFjdGVyX3BpY2tlZC5pbmRleCwgY2hhcmFjdGVyX3BpY2tlZC5jZWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0JLRiyDQv9C+0YLRgNCw0YLQuNC70Lgg0LLRgdC1INC/0LXRgNC10LzQtdGJ0LXQvdC40Y8g0L3QsCDRjdGC0L7QvCDRhdC+0LTRgyFcIilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG5cclxuICAgIHZhciBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRlbGV0ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQo9C90LjRh9GC0L7QttC40YLRjFwiO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gICAgZGVsZXRlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICAgIGRlbGV0ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGRlbGV0ZV9jaGFyYWN0ZXIoaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24uaW5uZXJIVE1MID0gXCLQmNC30LzQtdC90LjRgtGMINCy0LjQtNC40LzQvtGB0YLRjFwiO1xyXG4gICAgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5KGNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkYW1hZ2VfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRhbWFnZV9idXR0b24uaW5uZXJIVE1MID0gXCLQndCw0L3QtdGB0YLQuCDRg9GA0L7QvVwiO1xyXG4gICAgZGFtYWdlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gICAgZGFtYWdlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgdmFyIGRhbWFnZV9maWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFtYWdlX2ZpZWxkXCIpO1xyXG4gICAgICBpZiAoIShkYW1hZ2VfZmllbGQudmFsdWUgPT09IFwiXCIpKSB7XHJcbiAgICAgICAgdmFyIGRhbWFnZSA9IHBhcnNlSW50KGRhbWFnZV9maWVsZC52YWx1ZSk7XHJcbiAgICAgICAgdmFyIEhQX2Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkhQX2Rpc3BsYXlcIik7XHJcbiAgICAgICAgdmFyIG5ld19IUCA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSAtIGRhbWFnZTtcclxuICAgICAgICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBuZXdfSFA7XHJcblxyXG4gICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdkZWFsX2RhbWFnZSc7XHJcbiAgICAgICAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICAgIHRvU2VuZC5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgZGFtYWdlX2ZpZWxkLmlkID0gXCJkYW1hZ2VfZmllbGRcIjtcclxuICAgIGRhbWFnZV9maWVsZC50eXBlID0gXCJudW1iZXJcIjtcclxuICAgIGRhbWFnZV9maWVsZC5wbGFjZWhvbGRlciA9IFwi0JfQvdCw0YfQtdC90LjQtSDRg9GA0L7QvdCwXCI7XHJcblxyXG4gIH1cclxuXHJcbiAgdmFyIHNlYXJjaF9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHNlYXJjaF9idXR0b24uaW5uZXJIVE1MID0gXCLQntCx0YvRgdC60LDRgtGMXCI7XHJcbiAgc2VhcmNoX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIHNlYXJjaF9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBzZWFyY2hfYWN0aW9uKGV2ZW50LnRhcmdldCk7XHJcbiAgfVxyXG5cclxuICB2YXIgc2ltcGxlX3JvbGxfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBzaW1wbGVfcm9sbF9idXR0b24uaW5uZXJIVE1MID0gXCLQn9GA0L7RgdGC0L4gZDIwXCI7XHJcbiAgc2ltcGxlX3JvbGxfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIHJvbGwgPSByb2xsX3goMjApXHJcbiAgICB2YXIgdG9TZW5kID0ge31cclxuICAgIHRvU2VuZC5jb21tYW5kID0gXCJzaW1wbGVfcm9sbFwiXHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBjaGFyYWN0ZXIubmFtZVxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbVxyXG4gICAgdG9TZW5kLnJvbGwgPSByb2xsXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9XHJcblxyXG4gIHZhciB3ZWFwb25fc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICB3ZWFwb25fc2VsZWN0LmlkID0gXCJ3ZWFwb25fY2hvc2VuXCI7XHJcblxyXG4gIHZhciBpbnZlbnRvcnkgPSBjaGFyYWN0ZXIuaW52ZW50b3J5XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW52ZW50b3J5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gd2VhcG9uX2xpc3RbaW52ZW50b3J5W2ldXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaW52ZW50b3J5W2ldO1xyXG4gICAgd2VhcG9uX3NlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgfVxyXG5cclxuICB2YXIgcGlja193ZWFwb25fYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBwaWNrX3dlYXBvbl9idXR0b24uaW5uZXJIVE1MID0gXCLQodC80LXQvdC40YLRjCDQvtGA0YPQttC40LVcIjtcclxuICBwaWNrX3dlYXBvbl9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBwaWNrX3dlYXBvbl9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgd2VhcG9uX3NlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhcG9uX2Nob3NlblwiKVxyXG4gICAgdmFyIHdlYXBvbl9pbmRleCA9IHdlYXBvbl9zZWxlY3QudmFsdWVcclxuXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bY2hhcmFjdGVyX251bWJlcl0gPSB3ZWFwb25faW5kZXhcclxuICAgIGNoYXJhY3Rlcl9jaG9zZW4ud2VhcG9uX2lkID0gd2VhcG9uX2luZGV4XHJcblxyXG4gICAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW3dlYXBvbl9pbmRleF1cclxuXHJcbiAgICB3ZWFwb25fbWluaV9kaXNwbGF5LnNyYyA9IHdlYXBvbi5hdmF0YXI7XHJcbiAgfVxyXG5cclxuICB2YXIgZGVmYXVsdF93ZWFwb25faW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bY2hhcmFjdGVyX251bWJlcl1cclxuICBjaGFyYWN0ZXJfY2hvc2VuLndlYXBvbl9pZCA9IGRlZmF1bHRfd2VhcG9uX2luZGV4XHJcbiAgdmFyIGRlZmF1bHRfd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bZGVmYXVsdF93ZWFwb25faW5kZXhdXHJcblxyXG4gIHZhciB3ZWFwb25fbWluaV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fbWluaV9kaXNwbGF5XCJcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LnNyYyA9IGRlZmF1bHRfd2VhcG9uLmF2YXRhcjtcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzgwcHgnO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzgwcHgnO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkub25tb3VzZWVudGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBkZWZhdWx0X3dlYXBvbl9pbmRleCA9IGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGRlZmF1bHRfd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bZGVmYXVsdF93ZWFwb25faW5kZXhdXHJcblxyXG4gICAgdmFyIHdlYXBvbl9yYW5nZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgd2VhcG9uX3JhbmdlX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9yYW5nZV9kaXNwbGF5XCI7XHJcbiAgICB3ZWFwb25fcmFuZ2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCU0LDQu9GM0L3QvtGB0YLRjDogXCIgKyBkZWZhdWx0X3dlYXBvbi5yYW5nZVxyXG5cclxuICAgIHZhciB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9kYW1hZ2VfZGlzcGxheVwiO1xyXG4gICAgd2VhcG9uX2RhbWFnZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KPRgNC+0L06IFwiICsgZGVmYXVsdF93ZWFwb24uZGFtYWdlWzBdICsgJ2QnICsgZGVmYXVsdF93ZWFwb24uZGFtYWdlWzFdXHJcblxyXG4gICAgdmFyIHdlYXBvbl9uYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICB3ZWFwb25fbmFtZV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fbmFtZV9kaXNwbGF5XCI7XHJcbiAgICB3ZWFwb25fbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IGRlZmF1bHRfd2VhcG9uLm5hbWVcclxuXHJcbiAgICB2YXIgd2VhcG9uX2F2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5pZCA9IFwid2VhcG9uX2F2YXRhcl9kaXNwbGF5XCJcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zcmMgPSBkZWZhdWx0X3dlYXBvbi5hdmF0YXI7XHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fbmFtZV9kaXNwbGF5KVxyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fYXZhdGFyX2Rpc3BsYXkpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKHdlYXBvbl9yYW5nZV9kaXNwbGF5KVxyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fZGFtYWdlX2Rpc3BsYXkpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuc2hvdygpXHJcbiAgfVxyXG5cclxuICB3ZWFwb25fbWluaV9kaXNwbGF5Lm9ubW91c2VsZWF2ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmhpZGUoKVxyXG4gIH1cclxuXHJcbiAgYXZhdGFyX2NvbnRhaW5lci5hcHBlbmQod2VhcG9uX21pbmlfZGlzcGxheSlcclxuXHJcbiAgdmFyIGF0dGFja19idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGF0dGFja19idXR0b24uaW5uZXJIVE1MID0gXCLQkNGC0LDQutC+0LLQsNGC0YxcIjtcclxuICBhdHRhY2tfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIG1haW5fYWN0aW9uc19sZWZ0ID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBpZiAobWFpbl9hY3Rpb25zX2xlZnQgPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fYXR0YWNrKGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCjINCy0LDRgSDQvdC1INC+0YHRgtCw0LvQvtGB0Ywg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciBza2lsbF9zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNraWxsX3NlbGVjdC5pZCA9IFwic2tpbGxfY2hvc2VuXCI7XHJcblxyXG4gIHZhciBza2lsbHNldCA9IGNoYXJhY3Rlci5za2lsbHNldFxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNraWxsc2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gc2tpbGxfbGlzdFtza2lsbHNldFtpXV07XHJcbiAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IHNraWxsc2V0W2ldO1xyXG4gICAgc2tpbGxfc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICB9XHJcblxyXG4gIHZhciBza2lsbF9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHNraWxsX2J1dHRvbi5pbm5lckhUTUwgPSBcItCY0YHQv9C+0LvRjNC30L7QstCw0YLRjCDRg9C80LXQvdC40LVcIjtcclxuICBza2lsbF9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgc2tpbGxfc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbF9jaG9zZW5cIilcclxuICAgIHZhciBza2lsbF9pbmRleCA9IHNraWxsX3NlbGVjdC52YWx1ZVxyXG4gICAgdXNlX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBpbmRleCwgY2VsbClcclxuICB9XHJcblxyXG5cclxuICB2YXIgYnV0dG9uX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgYnV0dG9uX2xpc3QuY2xhc3NOYW1lID0gXCJidXR0b25fbGlzdFwiO1xyXG4gIHZhciBsaW5lMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmUzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG5cclxuICBsaW5lMS5hcHBlbmRDaGlsZChtb3ZlX2J1dHRvbik7XHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICBsaW5lMi5hcHBlbmRDaGlsZChkZWxldGVfYnV0dG9uKTtcclxuICAgIGxpbmUzLmFwcGVuZENoaWxkKGRhbWFnZV9idXR0b24pO1xyXG4gICAgbGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2ZpZWxkKTtcclxuICAgIGxpbmU4LmFwcGVuZENoaWxkKGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24pO1xyXG4gIH1cclxuICBsaW5lNC5hcHBlbmRDaGlsZChzZWFyY2hfYnV0dG9uKTtcclxuICBsaW5lNS5hcHBlbmRDaGlsZChwaWNrX3dlYXBvbl9idXR0b24pO1xyXG4gIGxpbmU1LmFwcGVuZENoaWxkKHdlYXBvbl9zZWxlY3QpO1xyXG4gIGxpbmU2LmFwcGVuZENoaWxkKGF0dGFja19idXR0b24pO1xyXG4gIGxpbmU3LmFwcGVuZENoaWxkKHNpbXBsZV9yb2xsX2J1dHRvbik7XHJcbiAgbGluZTkuYXBwZW5kQ2hpbGQoc2tpbGxfYnV0dG9uKTtcclxuICBsaW5lOS5hcHBlbmRDaGlsZChza2lsbF9zZWxlY3QpO1xyXG5cclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMSk7XHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMik7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMyk7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lOCk7XHJcbiAgfVxyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU0KTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNSk7XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTYpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU5KTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNyk7XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uX2xpc3QpO1xyXG5cclxufSBlbHNlIHtcclxuICB2YXIgaHBfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgaHBfcGVyY2VudCA9IE1hdGguZmxvb3IoaHBfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIEhQX2Rpc3BsYXkuaWQgPSBcIkhQX2Rpc3BsYXlcIjtcclxuICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBocF9wZXJjZW50ICsgXCIlXCI7XHJcblxyXG4gIHZhciB0aXJlZF9wZXJjZW50ID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSkvcGFyc2VGbG9hdChzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgdGlyZWRfcGVyY2VudCA9IE1hdGguZmxvb3IodGlyZWRfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciB0aXJlZF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaWQgPSBcInRpcmVkX2Rpc3BsYXlcIjtcclxuICB0aXJlZF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JLRi9C90L7RgdC70LjQstC+0YHRgtGMOiBcIiArIHRpcmVkX3BlcmNlbnQgKyBcIiVcIjtcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChIUF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHRpcmVkX2Rpc3BsYXkpO1xyXG59XHJcblxyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNob29zZV9jaGFyYWN0ZXJfdG9fYXR0YWNrKGNlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAyXHJcbiAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL2F0dGFja19wbGFjZWhvbGRlci5qcGdcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5KGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSBcImNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eVwiO1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAwKSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMFxyXG4gIH1cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VhcmNoX2FjdGlvbihzZWFyY2hfYnV0dG9uKSB7XHJcbiAgdmFyIGluZGV4ID0gc2VhcmNoX2J1dHRvbi5pbmRleDtcclxuICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBpZiAoIShnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSAmJiBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdIDwgMSkpIHtcclxuXHJcbiAgICB2YXIgbmFtZSA9IGNoYXJhY3Rlci5uYW1lO1xyXG4gICAgdmFyIG1vZGlmaWNhdG9yID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaW5kZXhdO1xyXG4gICAgdmFyIGludGVsbGlnZW5jZSA9IGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcbiAgICB2YXIgcm9sbCA9IHJvbGxTZWFyY2gocGFyc2VJbnQoaW50ZWxsaWdlbmNlKSwgcGFyc2VJbnQobW9kaWZpY2F0b3IpKTtcclxuICAgIHZhciB6b25lX251bWJlciA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF07XHJcbiAgICBwdXNoVG9MaXN0KCfQn9C10YDRgdC+0L3QsNC2ICcgKyBuYW1lICsgJyDQsdGA0L7RgdC40LsgJyArIHJvbGwgKyAnINC90LAg0LLQvdC40LzQsNGC0LXQu9GM0L3QvtGB0YLRjCcpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NlYXJjaF9hY3Rpb24nO1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gbmFtZTtcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbDtcclxuICAgIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5wbGF5ZXJfbmFtZSA9IG15X25hbWVcclxuICAgIHRvU2VuZC5taW5lc19kZXRlY3RlZCA9IFtdXHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICB2YXIgbGFuZG1pbmVfY2FuZGlkYXRlcyA9IGluZGV4X2luX3JhZGl1cyhpbmRleCwgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cylcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFuZG1pbmVfY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMobGFuZG1pbmVfY2FuZGlkYXRlc1tpXSkpIHtcclxuICAgICAgICAgIHRvU2VuZC5taW5lc19kZXRlY3RlZC5wdXNoKGxhbmRtaW5lX2NhbmRpZGF0ZXNbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQntCx0YvRgdC6INCy0L4g0LLRgNC10LzRjyDQsdC+0Y8g0YHRgtC+0LjRgiDQsdC+0L3Rg9GB0L3QvtC1INC00LXQudGB0YLQstC40LUhXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsU2VhcmNoKGludGVsbGlnZW5jZSwgbW9kKSB7XHJcbiAgcmV0dXJuIGludGVsbGlnZW5jZSArIHJvbGxfeCgyMCkgKyBtb2Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZV9vYmplY3RfY29tbWFuZChpbmRleCkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdkZWxldGVfY2hhcmFjdGVyJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfb2JqZWN0KGV2ZW50KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIGRlbGV0ZV9vYmplY3RfY29tbWFuZChldmVudC50YXJnZXQuaW5kZXgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gIHZhciBvYnN0YWNsZV9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdICogKC0xKTtcclxuICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW29ic3RhY2xlX2lkXTtcclxuXHJcbiAgLy8ga2VlcCB0cmFjayBvZiBsYXN0IGNob3NlbiBvYnN0YWxlIHRvIHF1aWNrbHkgYWRkIHRvIHRoZSBtYXBcclxuICBsYXN0X29ic3RhY2xlID0gb2JzdGFjbGVfaWRcclxuXHJcbiAgbGV0IG5hbWUgPSBvYnN0YWNsZS5uYW1lO1xyXG4gIGxldCBhdmF0YXIgPSBvYnN0YWNsZS5hdmF0YXI7XHJcblxyXG4gIHZhciBuYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IG5hbWU7XHJcblxyXG4gIHZhciBhdmF0YXJfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3JjID0gYXZhdGFyO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKG5hbWVfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChhdmF0YXJfZGlzcGxheSk7XHJcblxyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgdmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCj0L3QuNGH0YLQvtC20LjRgtGMXCI7XHJcbiAgICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgICBkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZGVsZXRlX29iamVjdChldmVudCk7XHJcbiAgICB9XHJcbiAgICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGRlbGV0ZV9idXR0b24pO1xyXG4gIH1cclxuXHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gY2hvb3NlX2NoYXJhY3Rlcl90b19tb3ZlKGluZGV4LCBjZWxsKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMVxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IGluZGV4O1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdO1xyXG4gIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9sb2FkaW5nLndlYnBcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5kb19zZWxlY3Rpb24oKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMFxyXG4gIHZhciBvbGRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbik7XHJcbiAgb2xkX2NlbGwuc3JjID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXS5hdmF0YXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3BfYXR0YWNrKCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDBcclxuICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24pO1xyXG4gIG9sZF9jZWxsLnNyYyA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZF0uYXZhdGFyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wX3NraWxsKCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDBcclxuICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24pO1xyXG4gIG9sZF9jZWxsLnNyYyA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZF0uYXZhdGFyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfb2JqZWN0X3BpY3R1cmUoaW5kZXhfaW5fYm9hcmRfc3RhdGUpIHtcclxuICB2YXIgaW1hZ2UgPSBFTVBUWV9DRUxMX1BJQztcclxuICB2YXIgaW5kZXhfaW5fYmFzZTtcclxuICBpZiAoaW5kZXhfaW5fYm9hcmRfc3RhdGUgPiAwKSB7XHJcbiAgICBpbmRleF9pbl9iYXNlID0gaW5kZXhfaW5fYm9hcmRfc3RhdGU7XHJcbiAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baW5kZXhfaW5fYmFzZV07XHJcbiAgICBpbWFnZSA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcbiAgfSBlbHNlIGlmIChpbmRleF9pbl9ib2FyZF9zdGF0ZSA8IDApIHtcclxuICAgIGluZGV4X2luX2Jhc2UgPSBpbmRleF9pbl9ib2FyZF9zdGF0ZSAqICgtMSk7XHJcbiAgICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW2luZGV4X2luX2Jhc2VdO1xyXG4gICAgaW1hZ2UgPSBvYnN0YWNsZS5hdmF0YXI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaW1hZ2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVCb2FyZCgpIHtcclxuICB2YXIgc2F2ZV9uYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfbmFtZVwiKS52YWx1ZTtcclxuICB2YXIgZnVsbF9nYW1lX3N0YXRlID0ge1xyXG4gICAgZ2FtZV9zdGF0ZTogZ2FtZV9zdGF0ZSxcclxuICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvOiBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyxcclxuICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm86IG9ic3RhY2xlX2RldGFpbGVkX2luZm8sXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGU6IGNoYXJhY3Rlcl9zdGF0ZVxyXG4gIH07XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdzYXZlX2dhbWUnO1xyXG4gIHRvU2VuZC5zYXZlX25hbWUgPSBzYXZlX25hbWU7XHJcbiAgdG9TZW5kLmZ1bGxfZ2FtZV9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlSW5pdGlhdGl2ZShhZ2lsaXR5KSB7XHJcbiAgcmV0dXJuIGFnaWxpdHkqMiArIHJvbGxfeCgyMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxJbml0aWF0aXZlKCkge1xyXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmUubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gPiAwKSB7IC8vIHNvIGNoYXJhY3RlciBpIGlzIHByZXNlbnRcclxuICAgICAgLy8gcmV0cmlldmUgdGhhdCBjaGFyYWN0ZXIncyBhZ2lsaXR5XHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXTtcclxuICAgICAgdmFyIGFnaWxpdHkgPSBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcbiAgICAgIC8vIHJvbGwgaW5pdGlhdGl2ZSBhbmQgYWRkIGFnaWxpdHkgbW9kaWZpY2F0b3JcclxuICAgICAgdmFyIGluaXRpYXRpdmUgPSBjb21wdXRlSW5pdGlhdGl2ZShwYXJzZUludChhZ2lsaXR5KSk7XHJcblxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtpXSA9IGluaXRpYXRpdmU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdyb2xsX2luaXRpYXRpdmUnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmluaXRpYXRpdmVfc3RhdGUgPSBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9nTW9kZUNoYW5nZSgpIHtcclxuICBpZiAoZ21fY29udHJvbF9tb2QgIT0gMSkge1xyXG4gICAgLy8gdHVybiBvbiBmb2cgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMTtcclxuICAgIGZvZ19idXR0b24udGV4dCgn0JLRi9C60Lsg0KLRg9C80LDQvSDQktC+0LnQvdGLJyk7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaV0gPT0gMSkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X2NlbGwuc3JjID0gRk9HX0lNQUdFO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIHR1cm4gb2ZmIGZvZyBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAwO1xyXG4gICAgZm9nX2J1dHRvbi50ZXh0KCfQktC60Lsg0KLRg9C80LDQvSDQktC+0LnQvdGLJyk7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaV0gPT0gMSkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X2NlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB6b25lTW9kZUNoYW5nZSgpIHtcclxuICBpZiAoZ21fY29udHJvbF9tb2QgIT0gMikge1xyXG4gICAgLy8gdHVybiBvbiB6b25lIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDI7XHJcbiAgICB6b25lX2J1dHRvbi50ZXh0KCfQktGL0LrQuyDQl9C+0L3QsNC70YzQvdGL0Lkg0YDQtdC20LjQvCcpO1xyXG4gICAgem9uZV9udW1iZXJfc2VsZWN0LnNob3coKTtcclxuICAgIGZvZ196b25lX2J1dHRvbi5zaG93KCk7XHJcbiAgICB1bmZvZ196b25lX2J1dHRvbi5zaG93KCk7XHJcbiAgICBzZWFyY2hfbW9kaWZpY2F0b3Iuc2hvdygpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaV0gPiAwKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25lX3RleHRfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X3pvbmVfdGV4dC5pbm5lckhUTUwgPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaV0gKyAnKCcgKyBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtpXSArICcpJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBiYWNrIHRvIG5vcm1hbCBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDA7XHJcbiAgICB6b25lX2J1dHRvbi50ZXh0KCfQktC60Lsg0JfQvtC90LDQu9GM0L3Ri9C5INGA0LXQttC40LwnKTtcclxuICAgIHpvbmVfbnVtYmVyX3NlbGVjdC5oaWRlKCk7XHJcbiAgICBmb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG4gICAgdW5mb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG4gICAgc2VhcmNoX21vZGlmaWNhdG9yLmhpZGUoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X3pvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uZV90ZXh0X1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF96b25lX3RleHQuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dDdXJyZW50Wm9uZSgpIHtcclxuICB2YXIgY3VycmVudF96b25lID0gem9uZV9udW1iZXJfc2VsZWN0LnZhbCgpO1xyXG4gIGZvZ1BhcnNlWm9uZSgxLCBjdXJyZW50X3pvbmUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1bmZvZ0N1cnJlbnRab25lKCkge1xyXG4gIGZvZ1BhcnNlWm9uZSgwLCBjdXJyZW50X3pvbmUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dQYXJzZVpvbmUobW9kLCBjdXJyZW50X3pvbmUpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAndXBkYXRlX2ZvZyc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBpZiAobW9kID09IDApIHtcclxuICAgIHRvU2VuZC51cGRhdGVfdHlwZSA9ICdyZW1vdmUnO1xyXG4gIH0gZWxzZSBpZiAobW9kID09IDEpIHtcclxuICAgIHRvU2VuZC51cGRhdGVfdHlwZSA9ICdhZGQnO1xyXG4gIH1cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSAqIGdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldID09IGN1cnJlbnRfem9uZSkge1xyXG4gICAgICB0b1NlbmQuaW5kZXggPSBpO1xyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1c2hUb0xpc3QobWVzc2FnZSkge1xyXG4gIGZvciAobGV0IGk9MTsgaSA8IENIQVRfQ0FTSDsgaSsrKSB7XHJcbiAgICB2YXIgZWxlbWVudF90b19jb3B5ID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyBpICsgJ1wiXScpO1xyXG4gICAgdmFyIGVsZW1lbnRfdG9fcGFzdGUgPSAkKCdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIChpLTEpICsgJ1wiXScpO1xyXG5cclxuICAgIGVsZW1lbnRfdG9fcGFzdGUudGV4dChlbGVtZW50X3RvX2NvcHkudGV4dCgpKTtcclxuICB9XHJcbiAgdmFyIHRvcF9lbGVtZW50ID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyAoQ0hBVF9DQVNILTEpICsgJ1wiXScpO1xyXG4gIHRvcF9lbGVtZW50LnRleHQobWVzc2FnZSk7XHJcblxyXG4gIGlmIChub3RpZmljYXRpb25zX2NvbnRhaW5lci5pcyhcIjpoaWRkZW5cIikpIHtcclxuICAgIGNoYXRfYnV0dG9uLmFkZENsYXNzKFwiaXMtcmVkXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VDaGF0VmlzaWJpbGl0eSgpIHtcclxuICBpZiAoY2hhdF9idXR0b24uaGFzQ2xhc3MoXCJpcy1yZWRcIikpIHtcclxuICAgIGNoYXRfYnV0dG9uLnJlbW92ZUNsYXNzKFwiaXMtcmVkXCIpXHJcbiAgfVxyXG4gIGlmIChub3RpZmljYXRpb25zX2NvbnRhaW5lci5pcyhcIjpoaWRkZW5cIikpIHtcclxuICAgIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLnNob3coKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbm90aWZpY2F0aW9uc19jb250YWluZXIuaGlkZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRfbmV3X3JvdW5kKCkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICduZXdfcm91bmQnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdmFyIHNhdmVfcm9sbCA9IFtdXHJcblxyXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZS5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2ldXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXSAhPT0gdW5kZWZpbmVkICYmIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0gIT09IG51bGwpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBzYXZlX3JvbGxbaV0gPSByb2xsX3goMjApICsgcGFyc2VJbnQoY2hhcmFjdGVyLnN0YW1pbmEpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgdG9TZW5kLnNhdmVfcm9sbF9saXN0ID0gc2F2ZV9yb2xsXHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsX2F0dGFjayh0eXBlLCBhdHRhY2tlciwgdGFyZ2V0LCBhZHZhbnRhZ2VfYm9udXMpIHtcclxuICB2YXIgYWR2YW50YWdlID0gMFxyXG4gIGlmICgodHlwZSA9PSBcInJhbmdlZFwiKXx8KHR5cGUgPT0gXCJlbmVyZ3lcIikpIHtcclxuICAgIGFkdmFudGFnZSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2F0dGFja2VyXTtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5oYXNPd25Qcm9wZXJ0eShcImFkYXB0aXZlX2ZpZ2h0aW5nXCIpKSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5hZGFwdGl2ZV9maWdodGluZyA9PSAwKSB7XHJcbiAgICAgICAgYWR2YW50YWdlID0gYWR2YW50YWdlICsgMTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCh0YDQsNCx0L7RgtCw0Lsg0YDQtdC50L3QtNC20L7QstGL0Lkg0YHRgtCw0Log0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtC4XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gMTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICBhZHZhbnRhZ2UgPSBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2F0dGFja2VyXVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmhhc093blByb3BlcnR5KFwiYWRhcHRpdmVfZmlnaHRpbmdcIikpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID09IDEpIHtcclxuICAgICAgICBhZHZhbnRhZ2UgPSBhZHZhbnRhZ2UgKyAxO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KHRgNCw0LHQvtGC0LDQuyDQvNC40LvQu9C4INGB0YLQsNC6INGD0L3QuNCy0LXRgNGB0LDQu9GM0L3QvtGB0YLQuFwiKTtcclxuICAgICAgfVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5hZGFwdGl2ZV9maWdodGluZyA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGFkdmFudGFnZSA9IGFkdmFudGFnZSAtIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW3RhcmdldF0gKyBhZHZhbnRhZ2VfYm9udXNcclxuXHJcbiAgdmFyIHJvbGwgPSAwXHJcblxyXG4gIGlmIChhZHZhbnRhZ2UgPj0gMikgeyAvLyDQlNC40LrQvtC1INC/0YDQtdC40LzRg9GJ0LXRgdGC0LLQviA9IDQg0LrRg9Cx0LBcclxuICAgIGNvbnNvbGUubG9nKFwi0JTQuNC60L7QtSDQv9GA0LXQuNC80YPRidC10YHRgtCy0L5cIilcclxuICAgIHZhciByb2xsMSA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMiA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMyA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsNCA9IHJvbGxfeCgyMClcclxuICAgIHJvbGwgPSBNYXRoLm1heChyb2xsMSwgcm9sbDIsIHJvbGwzLCByb2xsNClcclxuICB9IGVsc2UgaWYgKGFkdmFudGFnZSA9PSAxKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcItCf0YDQtdC40LzRg9GJ0LXRgdGC0LLQvlwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWF4KHJvbGwxLCByb2xsMilcclxuICB9IGVsc2UgaWYgKGFkdmFudGFnZSA9PSAwKSB7XHJcbiAgICByb2xsID0gcm9sbF94KDIwKVxyXG4gIH0gZWxzZSBpZiAoYWR2YW50YWdlID09IC0xKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcItCf0L7QvNC10YXQsFwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWluKHJvbGwxLCByb2xsMilcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coXCLQlNC40LrQsNGPINC/0L7QvNC10YXQsFwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwzID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGw0ID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWluKHJvbGwxLCByb2xsMiwgcm9sbDMsIHJvbGw0KVxyXG4gIH1cclxuICByZXR1cm4gcm9sbFxyXG59XHJcblxyXG5mdW5jdGlvbiBjb3Zlcl9tb2QoYWNjdW11bGF0ZWRfY292ZXIpIHtcclxuICB2YXIgbW9kID0ge31cclxuICBtb2QuaXNQb3NzaWJsZSA9IHRydWVcclxuICBtb2QuY292ZXJfbGV2ZWwgPSBhY2N1bXVsYXRlZF9jb3ZlclxyXG4gIHN3aXRjaChhY2N1bXVsYXRlZF9jb3Zlcikge1xyXG4gICAgY2FzZSAwOlxyXG4gICAgICBtb2QuYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IDBcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMVxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IC0yXHJcbiAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAwXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA0OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMlxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA1OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtM1xyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA2OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtM1xyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA3OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNFxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA4OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNFxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtM1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA5OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtM1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgICBtb2QuaXNQb3NzaWJsZSA9IGZhbHNlXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVfY292ZXIoZGlzdGFuY2UsIGNvdmVyKSB7XHJcbiAgdmFyIHJlc3VsdCA9IDBcclxuICBpZiAoZGlzdGFuY2UgPCAwLjE1KSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlclxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjMpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC43NVxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjUpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC41XHJcbiAgfSBlbHNlIGlmIChkaXN0YW5jZSA8IDAuNjUpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC4yNVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXN1bHQgPSAwXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpbmVfZnJvbV9lbmRwb2ludHMocG9pbnQxLCBwb2ludDIpIHtcclxuICB2YXIgbGluZSA9IHt9XHJcbiAgbGluZS5hID0gLTEqKHBvaW50MS55IC0gcG9pbnQyLnkpXHJcbiAgbGluZS5iID0gcG9pbnQxLnggLSBwb2ludDIueFxyXG4gIGxpbmUuYyA9IC0xKihsaW5lLmEgKiBwb2ludDIueCArIGxpbmUuYiAqIHBvaW50Mi55KVxyXG4gIHJldHVybiBsaW5lXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3RhbmNlX3RvX2xpbmUoZW5kcG9pbnQxLCBlbmRwb2ludDIsIHNpemUsIHRlc3Rwb2ludCkge1xyXG4gIHZhciBlbmRwb2ludDFfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDEsIHNpemUpXHJcbiAgdmFyIGVuZHBvaW50Ml9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50Miwgc2l6ZSlcclxuICB2YXIgdGVzdHBvaW50X2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXModGVzdHBvaW50LCBzaXplKVxyXG5cclxuICB2YXIgbGluZSA9IGxpbmVfZnJvbV9lbmRwb2ludHMoZW5kcG9pbnQxX2Nvb3JkLCBlbmRwb2ludDJfY29vcmQpXHJcbiAgY29uc29sZS5sb2cobGluZSlcclxuICBjb25zb2xlLmxvZyh0ZXN0cG9pbnRfY29vcmQpXHJcblxyXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguYWJzKGxpbmUuYSp0ZXN0cG9pbnRfY29vcmQueCArIGxpbmUuYip0ZXN0cG9pbnRfY29vcmQueSArIGxpbmUuYykvTWF0aC5zcXJ0KGxpbmUuYSpsaW5lLmEgKyBsaW5lLmIqbGluZS5iKVxyXG5cclxuICBjb25zb2xlLmxvZyhkaXN0YW5jZSlcclxuICByZXR1cm4gZGlzdGFuY2VcclxufVxyXG5cclxuZnVuY3Rpb24gY2VsbHNfb25fbGluZShlbmRwb2ludDEsIGVuZHBvaW50Miwgc2l6ZSkge1xyXG4gIHZhciBlbmRwb2ludDFfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDEsIHNpemUpXHJcbiAgdmFyIGVuZHBvaW50Ml9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50Miwgc2l6ZSlcclxuICB2YXIgbGluZSA9IGxpbmVfZnJvbV9lbmRwb2ludHMoZW5kcG9pbnQxX2Nvb3JkLCBlbmRwb2ludDJfY29vcmQpXHJcblxyXG4gIHZhciBzY2FsZSA9IE1hdGgubWF4KE1hdGguYWJzKGxpbmUuYSksIE1hdGguYWJzKGxpbmUuYikpXHJcbiAgLy8gbmVlZCB0byBiZSByZXZlcnNlZCEgcmVtZW1iZXIgbGluZS5hID0gZGVsdGEgeVxyXG4gIHZhciB4X3N0ZXAgPSBsaW5lLmIvc2NhbGVcclxuICB2YXIgeV9zdGVwID0gLTEqbGluZS5hL3NjYWxlXHJcbiAgdmFyIGN1cnJlbnRfcG9pbnQgPSBlbmRwb2ludDJfY29vcmRcclxuXHJcbiAgdmFyIHNhZmV0eV9pdGVyID0gMFxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBbXVxyXG4gIHdoaWxlIChNYXRoLmFicyhjdXJyZW50X3BvaW50LnggLSBlbmRwb2ludDFfY29vcmQueCkgPiAwLjUgfHwgTWF0aC5hYnMoY3VycmVudF9wb2ludC55IC0gZW5kcG9pbnQxX2Nvb3JkLnkpID4gMC41KSB7XHJcbiAgICB2YXIgY2VpbCA9IHt9XHJcbiAgICBjZWlsLnggPSBNYXRoLmNlaWwoY3VycmVudF9wb2ludC54KVxyXG4gICAgY2VpbC55ID0gTWF0aC5jZWlsKGN1cnJlbnRfcG9pbnQueSlcclxuICAgIHZhciBjZWlsX2luZGV4ID0gY29vcmRfdG9faW5kZXgoY2VpbCwgc2l6ZSlcclxuXHJcbiAgICB2YXIgZmxvb3IgPSB7fVxyXG4gICAgZmxvb3IueCA9IE1hdGguZmxvb3IoY3VycmVudF9wb2ludC54KVxyXG4gICAgZmxvb3IueSA9IE1hdGguZmxvb3IoY3VycmVudF9wb2ludC55KVxyXG4gICAgdmFyIGZsb29yX2luZGV4ID0gY29vcmRfdG9faW5kZXgoZmxvb3IsIHNpemUpXHJcblxyXG5cclxuICAgIGNhbmRpZGF0ZV9jZWxscy5wdXNoKGNlaWxfaW5kZXgpXHJcbiAgICBpZiAoY2VpbF9pbmRleCAhPSBmbG9vcl9pbmRleCkge1xyXG4gICAgICBjYW5kaWRhdGVfY2VsbHMucHVzaChmbG9vcl9pbmRleClcclxuICAgIH1cclxuXHJcbiAgICBjdXJyZW50X3BvaW50LnggPSBjdXJyZW50X3BvaW50LnggICsgeF9zdGVwXHJcbiAgICBjdXJyZW50X3BvaW50LnkgPSBjdXJyZW50X3BvaW50LnkgICsgeV9zdGVwXHJcbiAgICBzYWZldHlfaXRlciA9IHNhZmV0eV9pdGVyICsgMVxyXG4gICAgaWYgKHNhZmV0eV9pdGVyID4gNTApIHtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyhjYW5kaWRhdGVfY2VsbHMpXHJcbiAgcmV0dXJuIGNhbmRpZGF0ZV9jZWxsc1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpIHtcclxuICByZXR1cm4gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxufVxyXG5cclxuZnVuY3Rpb24gcGVyZm9ybV9hdHRhY2soaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9jaG9zZW4ud2VhcG9uX2lkXVxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UpKSB7XHJcblxyXG4gICAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gMFxyXG4gICAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGNlbGxzX29uX2xpbmUodXNlcl9wb3NpdGlvbiwgaW5kZXgsIGdhbWVfc3RhdGUuc2l6ZSlcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBjdXJyZW50X2NlbGwgPSBjYW5kaWRhdGVfY2VsbHNbaV1cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXSA8IDApIHsvLyDRjdGC0L4g0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVxyXG4gICAgICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9bTWF0aC5hYnMoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjdXJyZW50X2NlbGxdKV1cclxuICAgICAgICB2YXIgZGlzdGFuY2UgPSBkaXN0YW5jZV90b19saW5lKHVzZXJfcG9zaXRpb24sIGluZGV4LCBnYW1lX3N0YXRlLnNpemUsIGN1cnJlbnRfY2VsbClcclxuICAgICAgICBhY2N1bXVsYXRlZF9jb3ZlciA9IGFjY3VtdWxhdGVkX2NvdmVyICsgY29tcHV0ZV9jb3ZlcihkaXN0YW5jZSwgb2JzdGFjbGUuY292ZXIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGFjY3VtdWxhdGVkX2NvdmVyID0gTWF0aC5jZWlsKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gICAgdmFyIGNvdmVyX21vZGlmaWVyID0gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG5cclxuXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfS0QgPSBjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3Jlc29sdmVfYXR0YWNrJztcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQuYXR0YWNrZXJfaWQgPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5hdHRhY2tlcl9wb3NpdGlvbiA9IHVzZXJfcG9zaXRpb25cclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmF0dGFja190eXBlID0gd2VhcG9uLnR5cGVcclxuICAgIHRvU2VuZC5jb3Zlcl9sZXZlbCA9IGNvdmVyX21vZGlmaWVyLmNvdmVyX2xldmVsXHJcblxyXG4gICAgaWYgKGNvdmVyX21vZGlmaWVyLmlzUG9zc2libGUpIHtcclxuICAgICAgdmFyIGF0dGFja19yb2xsID0gcm9sbF9hdHRhY2sod2VhcG9uLnR5cGUsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGNvdmVyX21vZGlmaWVyLmFkdmFudGFnZV9ib251cylcclxuXHJcbiAgICAgIGlmIChhdHRhY2tfcm9sbCA8IDIwKSB7Ly8gbm8gY3JpdFxyXG4gICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgICAgICAgIHZhciBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gYXR0YWNrX3JvbGwgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLnN0cmVuZ3RoKVxyXG4gICAgICAgIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJlbmVyZ3lcIikge1xyXG4gICAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIDIqcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYXR0YWNrX2JvbnVzID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgdmFyIHVuaXZlcnNhbF9ib251cyA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgICAgICBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCArIGF0dGFja19ib251cyArIHVuaXZlcnNhbF9ib251cyArIGNvdmVyX21vZGlmaWVyLmF0dGFja19ib251c1xyXG5cclxuICAgICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsXHJcblxyXG4gICAgICAgIGlmIChjdW11bGF0aXZlX2F0dGFja19yb2xsID4gdGFyZ2V0X2NoYXJhY3Rlcl9LRCkgey8vINCV0YHRgtGMINC/0YDQvtCx0LjRgtC40LVcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBldmFkZV9yb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KHRhcmdldF9jaGFyYWN0ZXIuYWdpbGl0eSkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgICB0b1NlbmQuZXZhZGVfcm9sbCA9IGV2YWRlX3JvbGxcclxuICAgICAgICAgICAgaWYgKGV2YWRlX3JvbGwgPiBjdW11bGF0aXZlX2F0dGFja19yb2xsKSB7IC8vc3VjY2VzZnVsbHkgZXZhZGVkXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImV2YWRlZFwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcIktEX2Jsb2NrXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7IC8vIGZ1bGwgY3JpdFxyXG4gICAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsXHJcbiAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmdWxsX2NyaXRcIlxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZ1bGxfY292ZXJcIlxyXG4gIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+Li4uXCIpXHJcbiAgfVxyXG4gIHN0b3BfYXR0YWNrKClcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X251bWJlcikge1xyXG4gIHZhciBkYW1hZ2UgPSAwXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwic25pcGVyXCIpIHtcclxuICAgIGlmIChhdHRhY2tfcm9sbCA8IDE2KSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KHdlYXBvbi5kYW1hZ2VbMV0pXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgICAgIH1cclxuICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJ3ZWFrc3BvdFwiKSAmJiBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9udW1iZXJdLndlYWtzcG90Lmh1bnRlcl9pZCA9PSBjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgICAgICAgc3dpdGNoIChhdHRhY2tfcm9sbCkge1xyXG4gICAgICAgICAgY2FzZSAxODpcclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqMlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMTk6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjJcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICBpZiAod2VhcG9uLnR5cGUgPT0gJ21lbGVlJykge1xyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqNVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBpZiAod2VhcG9uLnR5cGUgPT0gJ21lbGVlJykge1xyXG4gICAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3aXRjaCAoYXR0YWNrX3JvbGwpIHtcclxuICAgICAgICAgIGNhc2UgMTg6XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE5OlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKV1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSoyXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjNcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAxOSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlYXBvbi5kYW1hZ2VbMF07IGkrKykge1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgfVxyXG4gICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgfVxyXG4gICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIGlmIChhdHRhY2tfcm9sbCA9PSAyMCkge1xyXG4gICAgICBkYW1hZ2UgPSBkYW1hZ2UgKiAyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGFtYWdlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdlYWtfc3BvdChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcblxyXG4gIHZhciBpbnRfY2hlY2sgPSByb2xsX3goMjApICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGludF9jaGVjayA+PSB3ZWFrX3Nwb3RfdGhyZXNob2xkKSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgfSBlbHNlIHtcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICB9XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZWFsKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgaGVhbF9yYW5nZSkpIHtcclxuXHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgaGVhbGVyX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdGFyZ2V0X2hwID0gY2hhcmFjdGVyX3N0YXRlLkhQW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0YXJnZXRfZnVsbF9ocCA9IEhQX3ZhbHVlc1t0YXJnZXRfY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgdmFyIHJhdGlvID0gcGFyc2VGbG9hdCh0YXJnZXRfaHApL3BhcnNlRmxvYXQodGFyZ2V0X2Z1bGxfaHApXHJcblxyXG4gIHZhciBoZWFsX3JvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoaGVhbGVyX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgIGhlYWxfcm9sbCA9IGhlYWxfcm9sbCArIHBhcnNlSW50KGhlYWxlcl9jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLmhlYWxfcm9sbCA9IGhlYWxfcm9sbFxyXG5cclxuICB2YXIgdGhyZXNob2xkID0gMFxyXG4gIHZhciBjcml0aWNhbF90aHJlc2hvbGQgPSAwXHJcblxyXG4gIGlmIChyYXRpbyA+IDAuOSkge1xyXG4gICAgdGhyZXNob2xkID0gMTBcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC43NSkge1xyXG4gICAgdGhyZXNob2xkID0gMTVcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjk1KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjBcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI5XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuOTUpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC44MilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjMpIHtcclxuICAgIHRocmVzaG9sZCA9IDIzXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSAzMlxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjgyKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC4xNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjZcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDM1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC40KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuMDUpIHtcclxuICAgIHRocmVzaG9sZCA9IDMwXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSA0MFxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjQpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC4yMilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgfVxyXG5cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0J3Rg9C20L3QviDQv9C+0LTQvtC50YLQuCDQsdC70LjQttC1INC6INGG0LXQu9C4INGH0YLQvtCx0Ysg0LLRi9C70LXRh9C40YLRjFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYmlnX2JybyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGJpZ19icm9fcmFuZ2UpKSB7XHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuXHJcbiAgdmFyIHNoaWVsZF9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICB2YXIgdGFyZ2V0X0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuXHJcbiAgdmFyIGJvbnVzX0tEID0gTWF0aC5tYXgoc2hpZWxkX0tEIC0gIHRhcmdldF9LRCwgMClcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5ib251c19LRCA9IGJvbnVzX0tEXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQkdC+0LvRjNGI0L7QuSDQsdGA0LDRgiDQvdC1INC00L7RgdGC0LDQtdGCINC00L4g0LzQsNC70L7Qs9C+IVwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRhbWFnZV9za2lsbF90ZW1wbGF0ZSh0YXJnZXRfcG9zLCB1c2VyX3BvcywgcmFuZ2UsIHVzZXJfaWQsIHNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbikge1xyXG4gIGlmIChpc0luUmFuZ2UodGFyZ2V0X3BvcywgdXNlcl9wb3MsIHJhbmdlKSkge1xyXG5cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdGFyZ2V0X3Bvc11cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaWRdXHJcblxyXG4gICAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gMFxyXG4gICAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGNlbGxzX29uX2xpbmUodXNlcl9wb3MsIHRhcmdldF9wb3MsIGdhbWVfc3RhdGUuc2l6ZSlcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBjdXJyZW50X2NlbGwgPSBjYW5kaWRhdGVfY2VsbHNbaV1cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXSA8IDApIHsvLyDRjdGC0L4g0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVxyXG4gICAgICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9bTWF0aC5hYnMoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjdXJyZW50X2NlbGxdKV1cclxuICAgICAgICB2YXIgZGlzdGFuY2UgPSBkaXN0YW5jZV90b19saW5lKHVzZXJfcG9zLCB0YXJnZXRfcG9zLCBnYW1lX3N0YXRlLnNpemUsIGN1cnJlbnRfY2VsbClcclxuICAgICAgICBhY2N1bXVsYXRlZF9jb3ZlciA9IGFjY3VtdWxhdGVkX2NvdmVyICsgY29tcHV0ZV9jb3ZlcihkaXN0YW5jZSwgb2JzdGFjbGUuY292ZXIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGFjY3VtdWxhdGVkX2NvdmVyID0gTWF0aC5jZWlsKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gICAgdmFyIGNvdmVyX21vZGlmaWVyID0gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG5cclxuICAgIHZhciBhdHRhY2tfcm9sbCA9IHJvbGxfYXR0YWNrKHdlYXBvbi50eXBlLCB1c2VyX2lkLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgY292ZXJfbW9kaWZpZXIuYWR2YW50YWdlX2JvbnVzKVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2lkXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAyMCkgey8vIG5vIGNyaXRcclxuICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIGJvbnVzX2F0dGFja1xyXG5cclxuICAgICAgdG9TZW5kLmF0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbFxyXG5cclxuICAgICAgaWYgKGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPiB0YXJnZXRfY2hhcmFjdGVyX0tEKSB7Ly8g0JXRgdGC0Ywg0L/RgNC+0LHQuNGC0LjQtVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcbiAgICAgICAgICB2YXIgZXZhZGVfcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludCh0YXJnZXRfY2hhcmFjdGVyLmFnaWxpdHkpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIHRvU2VuZC5ldmFkZV9yb2xsID0gZXZhZGVfcm9sbFxyXG4gICAgICAgICAgaWYgKGV2YWRlX3JvbGwgPiBjdW11bGF0aXZlX2F0dGFja19yb2xsKSB7IC8vc3VjY2VzZnVsbHkgZXZhZGVkXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJldmFkZWRcIlxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2lkLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9pZCwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcIktEX2Jsb2NrXCJcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHsgLy8gZnVsbCBjcml0XHJcbiAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsXHJcbiAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9pZCwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jcml0XCJcclxuICAgIH1cclxuICAgIHJldHVybiB0b1NlbmRcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG59XHJcblxyXG4vLyBpbmNyZWFzZSBhdHRhY2sgcm9sbCBieSBhZ2lsaXR5IGJvbnVzICgyKm1vZClcclxuZnVuY3Rpb24gY3V0X2xpbWJzKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGJvbnVzX2F0dGFjayA9IDIqcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5hZ2lsaXR5KSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbilcclxuICAgIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSB0b1NlbmQuZGFtYWdlX3JvbGxcclxuICAgICAgICB2YXIgZmxhdF9kYW1hZ2UgPSBkYW1hZ2Vfcm9sbCAtIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5zdHJlbmd0aCldIC0gY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgdmFyIGZ1bGxfZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICBpZiAoZmxhdF9kYW1hZ2UgPiBmdWxsX2RhbWFnZS8zKSB7XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgfSAgZWxzZSB7XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgICAgfVxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQv9C+0LTRgNC10LfQsNGC0Ywg0YHRg9GF0L7QttC40LvRjNGPINGN0YLQuNC8INC+0YDRg9C20LjQtdC8XCIpXHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1bmNoX3JhaW5mYWxsKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIHRhcmdldF9jaGFyX2lkID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJfaWRdXHJcbiAgICB2YXIgYm9udXNfYXR0YWNrID0gcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5hZ2lsaXR5KSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIHZhciB0b3RhbF9kYW1hZ2UgPSAwO1xyXG4gICAgdmFyIGF0dGFja3Nfc3VjY2Vzc2Z1bCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdOyBpKyspIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uKVxyXG4gICAgICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICh0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJmdWxsX2NyaXRcIikge1xyXG4gICAgICAgICAgICBhdHRhY2tzX3N1Y2Nlc3NmdWwgPSBhdHRhY2tzX3N1Y2Nlc3NmdWwgKyAxO1xyXG4gICAgICAgICAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyB0b1NlbmQuZGFtYWdlX3JvbGw7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJfaWRdID0gMDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJldmFkZWRcIiAmJiB0YXJnZXRfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSAhPSBcInJvZ3VlXCIpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVt0YXJnZXRfY2hhcl9pZF0gPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG11bHRpcGx5ZXIgPSAxLjAgKyBwYXJzZUZsb2F0KGF0dGFja3Nfc3VjY2Vzc2Z1bCAtIDEpLzIuMFxyXG4gICAgdmFyIG1lc3NhZ2UgPSBcItCc0L3QvtC20LjRgtC10LvRjCDQs9GA0LDQtNCwINCx0YvQuzogXCIgKyBtdWx0aXBseWVyXHJcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxyXG4gICAgdmFyIGZpbmFsX2RhbWFnZSA9IHBhcnNlSW50KHBhcnNlRmxvYXQodG90YWxfZGFtYWdlKSptdWx0aXBseWVyKVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyX2lkXHJcbiAgICB0b1NlbmQudG90YWxfYXR0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB0b1NlbmQuc3VjY2Vzc2Z1bGxfYXR0YWNrcyA9IGF0dGFja3Nfc3VjY2Vzc2Z1bFxyXG4gICAgdG9TZW5kLmRhbWFnZSA9IGZpbmFsX2RhbWFnZVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCT0YDQsNC0INGD0LTQsNGA0L7QsiDQvNC+0LbQvdC+INGB0L7QstGA0LXRiNC40YLRjCDRgtC+0LvRjNC60L4g0YDRg9C60L7Qv9Cw0YjQvdGL0Lwg0L7RgNGD0LbQuNC10LwhXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG9ja193YXZlKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uKVxyXG4gIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZXZvdXIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCAxKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciBzdGFja3MgPSAwXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgIHN0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLk1hcmt1c19zdGFja3NcclxuICAgIH1cclxuICAgIHZhciBkYW1hZ2UgPSBzdGFja3MqNSArIHJvbGxfeCgxMClcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWJzb2x1dGVfcmVjb3ZlcnkoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCAxKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciBoZWFsX2Ftb3VudCA9IDBcclxuXHJcbiAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW1hZ2VfZmllbGRcIik7XHJcbiAgICBpZiAoIShkYW1hZ2VfZmllbGQudmFsdWUgPT09IFwiXCIpKSB7XHJcbiAgICAgIGhlYWxfYW1vdW50ID0gcGFyc2VJbnQoZGFtYWdlX2ZpZWxkLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYmlvcG9vbCA9IDBcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJiaW9wb29sXCIpKSB7XHJcbiAgICAgIGJpb3Bvb2wgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uYmlvcG9vbFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChoZWFsX2Ftb3VudCA+IDAgJiYgYmlvcG9vbCA+PSBoZWFsX2Ftb3VudCkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLmhlYWxfYW1vdW50ID0gaGVhbF9hbW91bnRcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LXQstC+0LfQvNC+0LbQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQu9C10YfQtdC90LjRj1wiKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnYXNfYm9tYihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRocm93X3JhbmdlID0gZmluZFRocm93UmFuZ2UoY2hhcmFjdGVyKVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHRocm93X3JhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG4gICAgdG9TZW5kLnRocmVzaG9sZCA9IGdhc19ib21iX3RocmVzaG9sZFxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIGdhc19ib21iX29ic3RhY2xlKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCc0LDQu9C+INC60LDRiNC4INC10LvQuCDQtNC70Y8g0YLQsNC60L7Qs9C+INCx0YDQvtGB0LrQsFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGlmZnVzZV9sYW5kbWluZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cykpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJlbXB0eVwiXHJcblxyXG4gICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhpbmRleCkpIHtcclxuICAgICAgdmFyIHJvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoY2hhcmFjdGVyLmludGVsbGlnZW5jZSlcclxuICAgICAgaWYgKHJvbGwgPiBsYW5kbWluZV9kaWZmdXNlX3RocmVzaG9sZCkge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCh0LvQuNGI0LrQvtC8INC00LDQu9C10LrQviDQtNC70Y8g0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0LjRj1wiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFRocm93UmFuZ2UoY2hhcmFjdGVyKSB7XHJcbiAgcmV0dXJuIHRocm93X2Jhc2VfcmFuZ2UgKyBwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpKjJcclxufVxyXG5cclxuZnVuY3Rpb24gYWNpZF9ib21iKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGhyb3dfcmFuZ2UgPSBmaW5kVGhyb3dSYW5nZShjaGFyYWN0ZXIpXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgdGhyb3dfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQnNCw0LvQviDQutCw0YjQuCDQtdC70Lgg0LTQu9GPINGC0LDQutC+0LPQviDQsdGA0L7RgdC60LBcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpZ2h0X3NvdW5kX2JvbWIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgbGlnaHRfc291bmRfYm9tYl9yYW5nZSkpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuXHJcbiAgdmFyIGNoYXJhY3Rlcl9saXN0ID0gW11cclxuICB2YXIgb3V0Y29tZV9saXN0ID0gW11cclxuXHJcbiAgdmFyIHJhZGl1cyA9IGxpZ2h0X3NvdW5kX2JvbWJfcmFkaXVzXHJcblxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhZGl1cylcclxuICBjb25zb2xlLmxvZyhjYW5kaWRhdGVfY2VsbHMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0LHQvtC80LHRi1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlICE9PSBcImRyb25lXCIpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfbGlzdC5wdXNoKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIHZhciBzYXZlX3JvbGwgPSByb2xsX3goMjApICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gKyBwYXJzZUludChjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gICAgICAgIGlmIChzYXZlX3JvbGwgPiBsaWdodF9zb3VuZF9ib21iX3RocmVzaG9sZCkge1xyXG4gICAgICAgICAgb3V0Y29tZV9saXN0LnB1c2goMClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb3V0Y29tZV9saXN0LnB1c2goMSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9saXN0ID0gY2hhcmFjdGVyX2xpc3RcclxuICB0b1NlbmQub3V0Y29tZV9saXN0ID0gb3V0Y29tZV9saXN0XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59IGVsc2Uge1xyXG4gIGFsZXJ0KFwi0JTRgNC+0L0g0L3QtSDQtNC+0LrQuNC90LXRglwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcmNlX2ZpZWxkKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGZvcmNlX2ZpZWxkX3JhbmdlKSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG5cclxuICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgdmFyIHNoaWVsZCA9IE1hdGguY2VpbChwYXJzZUZsb2F0KEhQX3ZhbHVlc1t1c2VyLnN0YW1pbmFdKS8yKVxyXG4gIHRvU2VuZC5zaGllbGQgPSBzaGllbGRcclxuXHJcbiAgdmFyIGNoYXJhY3Rlcl9saXN0ID0gW11cclxuXHJcbiAgdmFyIHJhZGl1cyA9IGZvcmNlX2ZpZWxkX3JhZGl1c1xyXG5cclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gaW5kZXhfaW5fcmFkaXVzKGluZGV4LCByYWRpdXMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0YnQuNGC0LBcclxuICAgICAgICBjaGFyYWN0ZXJfbGlzdC5wdXNoKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgfVxyXG4gIH1cclxuICB0b1NlbmQuY2VsbHNfcHJvdGVjdGVkID0gY2FuZGlkYXRlX2NlbGxzXHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9saXN0ID0gY2hhcmFjdGVyX2xpc3RcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIGZvcmNlX2ZpZWxkX29ic3RhY2xlKVxyXG59IGVsc2Uge1xyXG4gIGFsZXJ0KFwi0JPQtdC90LXRgNCw0YLQvtGAINC00L7Qu9C20LXQvSDQsdGL0YLRjCDRg9GB0YLQsNC90L7QstC70LXQvSDQv9C+0LHQu9C40LbQtVwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkcmVuYWxpbmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciBhZHJlbmFsaW5lX3JhbmdlID0gMVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGFkcmVuYWxpbmVfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaW5kZXggPSB0YXJnZXRfbnVtYmVyXHJcbiAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IHJvbGxfeCg0KVxyXG4gICAgdmFyIG1pbnVzX2FjdGlvbnMgPSByb2xsX3goNClcclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgdG9TZW5kLm1pbnVzX2FjdGlvbnMgPSBtaW51c19hY3Rpb25zXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcG9pc29ub3VzX2FkcmVuYWxpbmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHBvaXNvbm91c19hZHJlbmFsaW5lX3JhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2luZGV4ID0gdGFyZ2V0X251bWJlclxyXG4gICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBbXVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbjsgaSsrKSB7XHJcbiAgICAgIGV4dHJhX2FjdGlvbnMucHVzaChyb2xsX3goNCkpXHJcbiAgICB9XHJcbiAgICB0b1NlbmQuZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnNcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCg0LDQtNC40YPRgSDQsNC00YDQtdC90LDQu9C40L3QsCAxINC60LvQtdGC0LrQsCFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBpY2hfcGljaF9nbyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfbnVtYmVyXVxyXG4gIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlID09IFwiZHJvbmVcIikge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2luZGV4ID0gdGFyZ2V0X251bWJlclxyXG4gICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBNYXRoLmNlaWwocGFyc2VGbG9hdCh1c2VyLmludGVsbGlnZW5jZSkvMilcclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQv9GL0Ykt0L/Ri9GJINC60L7Qs9C+INC/0L7Qv9Cw0LvQviFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGx1Y2t5X3Nob3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbF94KDEwKVxyXG4gICAgaWYgKHRvU2VuZC5yb2xsID09IDcpIHtcclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IHJvbGxfeCg3KVxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb3R0ZXJ5X3Nob3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbF94KDEwMClcclxuICAgIGlmICh0b1NlbmQucm9sbCA9PSA3KSB7XHJcbiAgICAgIHZhciBkYW1hZ2UgPSAwXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KDcpXHJcbiAgICAgIH1cclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZVxyXG4gICAgfSBlbHNlIGlmICh0b1NlbmQucm9sbCA9PSA3Nykge1xyXG4gICAgICB2YXIgZGFtYWdlID0gMFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE0OyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3goNylcclxuICAgICAgfVxyXG4gICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpIHtcclxuICBzd2l0Y2goY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCkge1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICBhZHJlbmFsaW5lKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6IC8vINCf0L7QtNGA0LXQt9Cw0YLRjCDRgdGD0YXQvtC20LjQu9C40Y9cclxuICAgICAgY3V0X2xpbWJzKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM6IC8vINCh0LvQsNCx0L7QtSDQvNC10YHRgtC+XHJcbiAgICAgIHdlYWtfc3BvdChpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA0OiAvLyDQm9C10YfQtdC90LjQtVxyXG4gICAgICBoZWFsKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDU6IC8vINCb0LXRh9C10L3QuNC1XHJcbiAgICAgIGJpZ19icm8oaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNzogLy8g0L/QvtC20LjRgNCw0L3QuNC1XHJcbiAgICAgIGRldm91cihpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA5OlxyXG4gICAgICBhYnNvbHV0ZV9yZWNvdmVyeShpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxMjpcclxuICAgICAgZ2FzX2JvbWIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTM6XHJcbiAgICAgIGxpZ2h0X3NvdW5kX2JvbWIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTQ6XHJcbiAgICAgIHNob2NrX3dhdmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTU6XHJcbiAgICAgIHBpY2hfcGljaF9nbyhpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNjpcclxuICAgICAgZm9yY2VfZmllbGQoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDE5OlxyXG4gICAgICBsdWNreV9zaG90KGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMDpcclxuICAgICAgbG90dGVyeV9zaG90KGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMjpcclxuICAgICAgcHVuY2hfcmFpbmZhbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIzOlxyXG4gICAgICBwb2lzb25vdXNfYWRyZW5hbGluZShpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjQ6XHJcbiAgICAgIGFjaWRfYm9tYihpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjY6XHJcbiAgICAgIGRpZmZ1c2VfbGFuZG1pbmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBhbGVydChcIlVua25vd24gdGFyZ2V0ZWQgc2tpbGxcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZV9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpIHtcclxuICBza2lsbF9pbmRleCA9IHBhcnNlSW50KHNraWxsX2luZGV4KVxyXG4gIHN3aXRjaChza2lsbF9pbmRleCkge1xyXG4gICAgY2FzZSAwOiAvL9Cg0YvQstC+0LpcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE6IC8v0J/RgNC40LvQuNCyINCQ0LTRgNC10L3QsNC70LjQvdCwXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWRyZW5hbGluZV91c2VyXCIpKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMjogLy8g0J/QvtC00YDQtdC30LDRgtGMINGB0YPRhdC+0LbQuNC70LjRj1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzogLy8g0KHQu9Cw0LHQvtC1INC80LXRgdGC0L5cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA0OiAvLyDQm9C10YfQtdC90LjQtVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNTogLy8g0JHQvtC70YzRiNC+0Lkg0LHRgNCw0YJcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA2OiAvLyDQn9C+0LTQvdGP0YLRjCDRidC40YLRi1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJzaGllbGRfdXBcIikpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic2hpZWxkX2Rvd25cIlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzaGllbGRfdXBcIlxyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDc6IC8vINC/0L7QttC40YDQsNC90LjQtSDRgdGD0YnQvdC+0YHRgtC4XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA4OiAvLyDRg9C30L3QsNGC0Ywg0LHQuNC+0L/Rg9C7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYmlvcG9vbFwiKSkge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QsNC60L7Qv9C70LXQvdC90YvQuSDQsdC40L7Qv9GD0Ls6IFwiICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5iaW9wb29sKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QsNC60L7Qv9C70LXQvdC90YvQuSDQsdC40L7Qv9GD0Lsg0L7RgtGB0YPRgtGB0YLQstGD0LXRglwiKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgOTogLy8g0LHQtdC30YPQv9GA0LXRh9C90L7QtSDQstC+0YHRgdGC0LDQvdC+0LLQu9C10L3QuNC1XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTA6IC8vINC+0LHRi9GH0L3QvtC1INCyINCx0L7QvdGD0YHQvdC+0LVcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0L7RgdC90L7QstC90YvRhSDQtNC10LnRgdGC0LLQuNC5LCDRh9GC0L7QsdGLINC/0YDQtdCy0YDQsNGC0LjRgtGMINCyINCx0L7QvdGD0YHQvdGL0LUhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDExOiAvLyDQvtGC0LTRi9GFXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdfc3RhbWluYSA9IE1hdGgubWluKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2NoYXJhY3Rlcl9udW1iZXJdICsgcmVzdF9zdGFtaW5hX2dhaW4sIHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdLnN0YW1pbmFdKVxyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgICAgdG9TZW5kLm5ld19zdGFtaW5hID0gbmV3X3N0YW1pbmFcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQktGLINGD0LbQtSDRgdC+0LLQtdGA0YjQsNC70Lgg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGN0YLQvtC8INGF0L7QtNGDLCDRgtCw0Log0YfRgtC+INC90LUg0LzQvtC20LXRgtC1INC+0YLQtNC+0YXQvdGD0YLRjFwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTI6IC8vINCz0LDQt9C+0LLQsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0KMg0LPRgNCw0L3QsNGC0Ysg0LrRg9C70LTQsNGD0L0gKNCz0LDQtyDRjdGN0Y0g0LfQsNCy0LDRgNC40LLQsNC10YLRgdGPLCDRhdC3KVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDEzOiAvLyDRgdCy0LXRgtC+0YjRg9C80L7QstCw0Y8g0LPRgNCw0L3QsNGC0LBcclxuICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImxpZ2h0X3NvdW5kX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0JPRgNCw0L3QsNGC0LAg0LXRidC1INC90LUg0LPQvtGC0L7QstCwXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNDogLy8g0KjQvtC60L7QstGL0Lkg0LjQvNC/0YPQu9GM0YFcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNTogLy8g0J/Ri9GJLdC/0YvRiS3Qs9C+XHJcbiAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInBpY2hfcGljaF91c2VyXCIpKSB7XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J/Ri9GJINC/0YvRiSDQtdGJ0LUg0L3QsCDQv9C10YDQtdC30LDRgNGP0LTQutC1IVwiKVxyXG4gICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxNjogLy8g0KHQuNC70L7QstC+0LUg0L/QvtC70LVcclxuICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJmb3JjZV9maWVsZF91c2VyXCIpKSB7XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCT0LXQvdC10YDQsNGC0L7RgCDRgdC40LvQvtCy0L7Qs9C+INC/0L7Qu9GPINC10YnQtSDQvdC1INC30LDRgNGP0LTQuNC70YHRjyFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxNzogLy8g0JjQvdCy0LjQt1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleDtcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICAgICAgICB0b1NlbmQudXNlcm5hbWUgPSBteV9uYW1lO1xyXG4gICAgICAgICAgICB0b1NlbmQucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTg6IC8vINCR0L7QtdCy0LDRjyDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4O1xyXG4gICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDE5OiAvLyDQm9Cw0LrQuCDRiNC+0YJcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMDogLy8g0JvQvtGC0LXRgNC10LnQvdGL0Lkg0LLRi9GB0YLRgNC10LtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMTogLy/Qn9GA0LjQu9C40LIg0LTQtdC50YHRgtCy0LjQuVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFjdGlvbl9zcGxhc2hcIikpIHtcclxuICAgICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtVwiKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICBjYXNlIDIyOiAvLyDQs9GA0LDQtCDRg9C00LDRgNC+0LJcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMSkge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0JTQu9GPINCz0YDQsNC00LAg0YPQtNCw0YDQvtCyINGC0YDQtdCx0YPQtdGC0YHRjyDQsdC+0LvRjNGI0LUgMSDQvtGB0L3QvtCy0L3QvtCz0L4g0LTQtdC50YHRgtCy0LjRjyFcIilcclxuICAgICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjM6IC8v0JDQtNGA0LXQvdCw0LvQuNC90L7QstGL0Lkg0L/QvtGC0L7Qv1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwicG9pc29ub3VzX2FkcmVuYWxpbmVfdXNlclwiKSkge1xyXG4gICAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjQ6IC8vINC60LjRgdC70L7RgtC90LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWNpZF9ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQoyDQs9GA0LDQvdCw0YLRiyDQutGD0LvQtNCw0YPQvSAo0LrQuNGB0LvQvtGC0LAg0L7QutC40YHQu9GP0LXRgtGB0Y8pXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI1OiAvLyDQl9Cw0LzQuNC90LjRgNC+0LLQsNGC0YxcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICAgIHRvU2VuZC5wbGF5ZXJfbmFtZSA9IG15X25hbWVcclxuICAgICAgICAgICAgdG9TZW5kLnBvc2l0aW9uID0gcG9zaXRpb25cclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjY6IC8vINCe0LHQtdC30LLRgNC10LTQuNGC0Ywg0LzQuNC90YNcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0K3RgtC+INGD0LzQtdC90LjQtSDRgtGA0LXQsdGD0LXRgiAxINCx0L7QvdGD0YHQvdC+0LUg0LTQtdC50YHRgtCy0LjQtSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDQt9C90LDQtdC8INGN0YLQviDRg9C80LXQvdC40LVcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gM1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQgPSBza2lsbF9pbmRleFxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24gPSBwb3NpdGlvblxyXG4gIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9DaGlkb3JpLndlYnBcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlfYm9tYihwb3NpdGlvbiwgcmFkaXVzKSB7XHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhwb3NpdGlvbiwgcmFkaXVzKVxyXG4gIC8vY29uc29sZS5sb2coY2FuZGlkYXRlX2NlbGxzKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NhbmRpZGF0ZV9jZWxsc1tpXV1cclxuICAgIGlmICh0YXJnZXRfY2hhcmFjdGVyX251bWJlciA+IDApIHsvLyDQv9C10YDRgdC+0L3QsNC2INCyINGA0LDQtNC40YPRgdC1INCx0L7QvNCx0YtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC/0LDQtNCw0LXRgiDQv9C+0LQg0LTQtdC50YHRgtCy0LjQtSDQs9Cw0LfQvtCy0L7QuSDQsdC+0LzQsdGLXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCArIDFcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgZ2FzX2JvbWJfcG9pc29uX29iamVjdCA9IHt9XHJcbiAgICAgICAgZ2FzX2JvbWJfcG9pc29uX29iamVjdC5wb2lzb25fbGV2ZWwgPSAxXHJcbiAgICAgICAgZ2FzX2JvbWJfcG9pc29uX29iamVjdC50aHJlc2hvbGQgPSBnYXNfYm9tYl90aHJlc2hvbGRcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5nYXNfYm9tYl9wb2lzb24gPSBnYXNfYm9tYl9wb2lzb25fb2JqZWN0XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gLSBnYXNfYm9tYl9tb3ZlX3JlZHVjdGlvblxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSAtIDFcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5X2FjaWRfYm9tYihwb3NpdGlvbiwgcmFkaXVzKSB7XHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhwb3NpdGlvbiwgcmFkaXVzKVxyXG4gIC8vY29uc29sZS5sb2coY2FuZGlkYXRlX2NlbGxzKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NhbmRpZGF0ZV9jZWxsc1tpXV1cclxuICAgIGlmICh0YXJnZXRfY2hhcmFjdGVyX251bWJlciA+IDApIHsvLyDQv9C10YDRgdC+0L3QsNC2INCyINGA0LDQtNC40YPRgdC1INCx0L7QvNCx0YtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC/0LDQtNCw0LXRgiDQv9C+0LQg0LTQtdC50YHRgtCy0LjQtSDQutC40YHQu9C+0YLQvdC+0Lkg0LPRgNCw0L3QsNGC0YtcIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFjaWRfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uID0gYWNpZF9ib21iX2R1cmF0aW9uXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGFjaWRfYm9tYl9wb2lzb25fb2JqZWN0ID0ge31cclxuICAgICAgICBhY2lkX2JvbWJfcG9pc29uX29iamVjdC5kdXJhdGlvbiA9IGFjaWRfYm9tYl9kdXJhdGlvblxyXG4gICAgICAgIHZhciBLRF9jaGFuZ2UgPSBwYXJzZUludChjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpLzIpXHJcbiAgICAgICAgYWNpZF9ib21iX3BvaXNvbl9vYmplY3QuYm9udXNfS0QgPSBLRF9jaGFuZ2VcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5hY2lkX2JvbWJfcG9pc29uID0gYWNpZF9ib21iX3BvaXNvbl9vYmplY3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSAtIEtEX2NoYW5nZVxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvY2tlZF9lZmZlY3QodGFyZ2V0KSB7XHJcbiAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uaGFzT3duUHJvcGVydHkoXCJzaG9ja2VkXCIpKSB7XHJcbiAgICB2YXIgc2hvY2tlZF9vYmplY3QgPSB7fVxyXG4gICAgc2hvY2tlZF9vYmplY3QuY29vbGRvd24gPSBzaG9ja2VkX2Nvb2xkb3duXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uc2hvY2tlZCA9IHNob2NrZWRfb2JqZWN0XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVt0YXJnZXRdID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbdGFyZ2V0XSAtIDFcclxuICB9IGVsc2Uge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRdLnNob2NrZWQuY29vbGRvd24gPSBzaG9ja2VkX2Nvb2xkb3duXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtZWxlZV9wZW5hbHR5KGRhdGEpIHtcclxuICBpZiAoZGF0YS5hdHRhY2tfdHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uaGFzT3duUHJvcGVydHkoXCJtZWxlZWRcIikpIHsgLy8g0LjQvdCw0YfQtSDRjdGE0YTQtdC60YIg0YPQttC1INC90LDQu9C+0LbQtdC9LCDQvdC1INC/0L7QstGC0L7RgNGP0LXQvFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gLSAxXHJcbiAgICAgIHZhciBtZWxlZWRfb2JqZWN0ID0ge31cclxuICAgICAgbWVsZWVkX29iamVjdC5jb29sZG93biA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ubWVsZWVkID0gbWVsZWVkX29iamVjdFxyXG4gICAgfVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbZGF0YS50YXJnZXRfaWRdID09IDEpIHtcclxuICAgICAgdmFyIGNvb2xkb3duID0gMVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvb2xkb3duID0gMFxyXG4gICAgfVxyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ubWVsZWVkLmNvb2xkb3duID0gY29vbGRvd25cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX2RhbWFnZShjaGFyYWN0ZXJfbnVtYmVyLCBkYW1hZ2UpIHtcclxuICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJmb3JjZV9maWVsZF90YXJnZXRcIikpIHtcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSAtIGRhbWFnZVxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgc2hpZWxkX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXQuc2hpZWxkX2luZGV4XHJcbiAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkIC0gZGFtYWdlXHJcbiAgICB2YXIgbWVzc2FnZSA9IFwi0KnQuNGCINC/0YDQuNC90Y/QuyDRg9GA0L7QvSDQvdCwINGB0LXQsdGPISDQntGB0YLQsNCy0YjQsNGP0YHRjyDQv9GA0L7Rh9C90L7RgdGC0Yw6IFwiICsgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5zaGllbGRcclxuICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIGlmIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZCA8PSAwKSB7Ly8g0YnQuNGCINGD0L3QuNGH0YLQvtC20LXQvVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IFwiUHJlc3MgRiDQqdC40YLRgy4uLlwiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgdmFyIGNoYXJfbGlzdCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uY2hhcmFjdGVyX2xpc3RcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJfbGlzdFtpXVxyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldFxyXG4gICAgICB9XHJcbiAgICAgIGRlbGV0ZV9vYmplY3RfY29tbWFuZChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnBvc2l0aW9uKVxyXG4gICAgICBkZWxldGUgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2JhdHRsZV9tb2QoKSB7XHJcbiAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMFxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMVxyXG4gIH1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2JhdHRsZV9tb2QnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnZhbHVlID0gbmV3X3ZhbHVlXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbi8vIHtib2FyZF9zdGF0ZTogW10sIEhQX3N0YXRlOiBbXSwgaW5pdGlhdGl2ZV9zdGF0ZTogW10sIGZvZ19zdGF0ZTogW10sIHpvbmVfc3RhdGU6IFtdLCBzaXplOiAwLCBzZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGU6IFtdfTtcclxuZnVuY3Rpb24gbWlycm9yX2JvYXJkKCkge1xyXG4gIHZhciBsZWZ0X2luZGV4O1xyXG4gIHZhciByaWdodF9pbmRleDtcclxuICB2YXIgdGVtcDtcclxuICB2YXIgbGVmdF9jZWxsO1xyXG4gIHZhciByaWdodF9jZWxsO1xyXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgZ2FtZV9zdGF0ZS5zaXplOyB5KyspIHtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgZ2FtZV9zdGF0ZS5zaXplLzI7IHgrKykge1xyXG5cclxuICAgICAgbGVmdF9pbmRleCA9IHkqZ2FtZV9zdGF0ZS5zaXplICsgeDtcclxuICAgICAgcmlnaHRfaW5kZXggPSB5KmdhbWVfc3RhdGUuc2l6ZSArIHBhcnNlSW50KGdhbWVfc3RhdGUuc2l6ZSkgLSB4IC0gMTtcclxuICAgICAgLy9jb25zb2xlLmxvZygneTogJyArIHkgKyAnIHg6ICcgKyB4ICsgJyBsZWZ0IGluZGV4OiAnICsgbGVmdF9pbmRleCArICcgcmlnaHQgaW5kZXg6ICcgKyByaWdodF9pbmRleCk7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgbGVmdF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGxlZnRfaW5kZXgpO1xyXG4gICAgICByaWdodF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHJpZ2h0X2luZGV4KTtcclxuXHJcbiAgICAgIHRlbXAgPSBsZWZ0X2NlbGwuc3JjO1xyXG4gICAgICBsZWZ0X2NlbGwuc3JjID0gcmlnaHRfY2VsbC5zcmM7XHJcbiAgICAgIHJpZ2h0X2NlbGwuc3JjID0gdGVtcDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN5bmNfYm9hcmQoKSB7XHJcbiAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IHtcclxuICAgIGdhbWVfc3RhdGU6IGdhbWVfc3RhdGUsXHJcbiAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbzogY2hhcmFjdGVyX2RldGFpbGVkX2luZm8sXHJcbiAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvOiBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvLFxyXG4gICAgY2hhcmFjdGVyX3N0YXRlOiBjaGFyYWN0ZXJfc3RhdGVcclxuICB9O1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc3luY19ib2FyZCc7XHJcbiAgdG9TZW5kLmZ1bGxfZ2FtZV9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93X2xhbmRtaW5lcygpIHtcclxuICB2YXIgbGFuZG1pbmVzX2FycmF5ID0gZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYW5kbWluZXNfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X21pbmUgPSBsYW5kbWluZXNfYXJyYXlbaV1cclxuICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW2N1cnJlbnRfbWluZV0uaW5jbHVkZXMobXlfbmFtZSkpIHtcclxuICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgY3VycmVudF9taW5lKTtcclxuICAgICAgY2VsbC5zcmMgPSBcIi9pbWFnZXMvbGFuZG1pbmUuamZpZlwiXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhcl9jaGFyYWN0ZXJfc3RhdGUoKSB7XHJcbiAgY2hhcmFjdGVyX3N0YXRlID0gQ0hBUkFDVEVSX1NUQVRFX0NPTlNUQU5UXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyX2NoYXJhY3RlcihudW1iZXIpIHtcclxuICAvL2NoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLkhQW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbbnVtYmVyXSA9IHt9XHJcbiAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbbnVtYmVyXSA9IG51bGxcclxufVxyXG5cclxuZnVuY3Rpb24gd19vbmNsaWNrKCkge1xyXG4gIGlmIChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPT0gMSkge1xyXG4gICAgdW5kb19zZWxlY3Rpb24oKVxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICAgIHZhciBjZWxsID0gY2hhcmFjdGVyX2Nob3Nlbi5jZWxsXHJcbiAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYV9vbmNsaWNrKCkge1xyXG4gIGlmIChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPT0gMikge1xyXG4gICAgc3RvcF9hdHRhY2soKVxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gICAgdmFyIGNlbGwgPSBjaGFyYWN0ZXJfY2hvc2VuLmNlbGxcclxuICAgIHZhciBtYWluX2FjdGlvbnNfbGVmdCA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgaWYgKG1haW5fYWN0aW9uc19sZWZ0ID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX2F0dGFjayhjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQoyDQstCw0YEg0L3QtSDQvtGB0YLQsNC70L7RgdGMINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vL3NvY2tldC5pbml0KCd3czovL2xvY2FsaG9zdDozMDAxJyk7XHJcbnNvY2tldC5pbml0KFNFUlZFUl9BRERSRVNTKTtcclxuXHJcbnNvY2tldC5yZWdpc3Rlck9wZW5IYW5kbGVyKCgpID0+IHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAncGxheWVyX2luZm8nO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvbGUgPSBteV9yb2xlO1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIHRvU2VuZC5wYXNzd29yZCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZ21fcGFzc3dvcmQnKSk7XHJcbiAgfVxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59KTtcclxuXHJcbnNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKChkYXRhKSA9PiB7XHJcbiAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICBpZiAoKChkYXRhLnRvX25hbWUgPT0gbXlfbmFtZSkgfHwgKGRhdGEudG9fbmFtZSA9PSAnYWxsJykpICYmIChkYXRhLnJvb21fbnVtYmVyID09IG15X3Jvb20pKSB7XHJcbiAgICBpZiAoZGF0YS5jb21tYW5kID09ICdwbGF5ZXJfaW5mb19yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuaXNWYWxpZCA9PSAwKSB7XHJcbiAgICAgICAgYWxlcnQoJ9Ci0LAg0LrQsNC60L7QuSDRgtGLINCz0LwnKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkYXRhLnJvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgIGNyZWF0ZV9ib2FyZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBsb2FkX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgcm9sbF9pbml0aWF0aXZlX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgZm9nX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfbmFtZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgYm9hcmRfc2l6ZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgbWlycm9yX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgbmV4dF9yb3VuZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIGJhdHRsZV9tb2RfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBzeW5jX2J1dHRvbi5zaG93KCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlO1xyXG4gICAgICAgICAgICAvLyBxXHJcbiAgICAgICAgICAgIGlmKGtleUNvZGUgPT0gODEpIHtcclxuICAgICAgICAgICAgICAgIGZvZ01vZGVDaGFuZ2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09IDg3KSB7IC8vIHdcclxuICAgICAgICAgICAgICB3X29uY2xpY2soKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT0gNjUpIHsgLy8gYVxyXG4gICAgICAgICAgICAgIGFfb25jbGljaygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfbGlzdDtcclxuICAgICAgb2JzdGFjbGVfbGlzdCA9IGRhdGEub2JzdGFjbGVfbGlzdDtcclxuICAgICAgd2VhcG9uX2xpc3QgPSBkYXRhLndlYXBvbl9saXN0XHJcbiAgICAgIHdlYXBvbl9kZXRhaWxlZF9pbmZvID0gZGF0YS53ZWFwb25fZGV0YWlsZWRfaW5mb1xyXG4gICAgICBza2lsbF9saXN0ID0gZGF0YS5za2lsbF9saXN0XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NvbnN0cnVjdF9ib2FyZF9yZXNwb25zZScpIHtcclxuICAgICAgY2xlYXJfY2hhcmFjdGVyX3N0YXRlKClcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGRhdGEuZ2FtZV9zdGF0ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGRhdGEuY2hhcmFjdGVyX2luZm87XHJcbiAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXI7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuY2VsbF9pZF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBkYXRhLmNlbGxfaWQpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuICAgICAgfVxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBkYXRhLmNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUZsb2F0KG1vdmVfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV0pO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBib251c19hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBtYWluX2FjdGlvbl9tYXBbY2hhcmFjdGVyLmFnaWxpdHldO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyLmFnaWxpdHk7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlci5LRF9wb2ludHM7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDA7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IFwiYWxsXCI7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyLmludmVudG9yeVswXVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHt9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gZGF0YS5jZWxsX2lkO1xyXG5cclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX29ic3RhY2xlX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgb2JzdGFjbGUgPSBkYXRhLm9ic3RhY2xlX2luZm87XHJcbiAgICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm9bZGF0YS5vYnN0YWNsZV9udW1iZXJdID0gb2JzdGFjbGU7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuY2VsbF9pZF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBkYXRhLmNlbGxfaWQpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gb2JzdGFjbGUuYXZhdGFyO1xyXG4gICAgICB9XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZGF0YS5jZWxsX2lkXSA9IGRhdGEub2JzdGFjbGVfbnVtYmVyICogKC0xKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdtb3ZlX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIHRvX2luZGV4ID0gZGF0YS50b19pbmRleDtcclxuICAgICAgdmFyIGZyb21faW5kZXggPSBkYXRhLmZyb21faW5kZXg7XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdG9faW5kZXhdID0gZGF0YS5jaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHRvX2luZGV4O1xyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmludmlzaWJpbGl0eV9lbmRlZF9pZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBpZCA9IGRhdGEuaW52aXNpYmlsaXR5X2VuZGVkX2lkW2ldO1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbaWRdID0gXCJhbGxcIjtcclxuXHJcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW2lkXTtcclxuICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBwb3NpdGlvbik7XHJcbiAgICAgICAgdmFyIGF2YXRhciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2lkXS5hdmF0YXI7XHJcbiAgICAgICAgdG9fY2VsbC5zcmMgPSBhdmF0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5taW5lc19leHBsb2RlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBtaW5lX3Bvc2l0aW9uID0gZGF0YS5taW5lc19leHBsb2RlZFtpXVxyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIG1pbmVfcG9zaXRpb24pO1xyXG4gICAgICAgIGNlbGwuc3JjID0gZm9nT3JQaWMobWluZV9wb3NpdGlvbilcclxuICAgICAgICB2YXIgaW5kZXggPSBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5kZXhPZihtaW5lX3Bvc2l0aW9uKVxyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuc3BsaWNlKGluZGV4LDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbbWluZV9wb3NpdGlvbl0gPSBbXVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5taW5lc19kYW1hZ2UgPiAwKSB7XHJcbiAgICAgICAgZG9fZGFtYWdlKGRhdGEuY2hhcmFjdGVyX251bWJlciwgZGF0YS5taW5lc19kYW1hZ2UpXHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC00YDRi9Cy0LDQtdGC0YHRjyDQvdCwINC80LjQvdCw0YUg0L/QvtC70YPRh9Cw0Y8gXCIgKyBkYXRhLm1pbmVzX2RhbWFnZSArIFwiINGD0YDQvtC90LBcIlxyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcmVtb3ZlIHNoaWVsZGVkIHByb3BlcnR5IGZyb20gY2hhcmFjdGVyIGFuZCByZW1vdmUgY2hhcmFjdGVyIGZyb20gc2hpZWxkZWQgbGlzdFxyXG4gICAgICBpZiAoZGF0YS5sZWZ0X3NoaWVsZCA9PSAxKSB7XHJcbiAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXRcclxuICAgICAgICB2YXIgaW5kZXggPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tkYXRhLnNoaWVsZF9pbmRleF0uY2hhcmFjdGVyX2xpc3QuaW5kZXhPZihkYXRhLmNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbZGF0YS5zaGllbGRfaW5kZXhdLmNoYXJhY3Rlcl9saXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAxO1xyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBzdGFtaW5hX21vdmVfY29zdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBwYXJzZUZsb2F0KGRhdGEuZGlzdGFuY2UpXHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICBpZiAoY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcInNuaXBlclwiKSB7XHJcbiAgICAgICAgICB2YXIgZWZmZWN0c19vYmplY3QgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIGlmIChlZmZlY3RzX29iamVjdC5oYXNPd25Qcm9wZXJ0eShcInNuaXBlcl9wYXNzaXZlXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50X2F0dGFja19ib251cyA9IGVmZmVjdHNfb2JqZWN0LnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251c1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudF9kYW1hZ2VfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gY3VycmVudF9hdHRhY2tfYm9udXMgLSA1XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIGN1cnJlbnRfZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHNuaXBlcl9wYXNzaXZlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUgPSBzbmlwZXJfcGFzc2l2ZV9vYmplY3RcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gNVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCEoKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW3RvX2luZGV4XSA9PSAxKSkgfHwgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAhPSBcImFsbFwiICYmIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAhPSBteV9uYW1lKSkpIHtcclxuICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcbiAgICAgICAgdG9fY2VsbC5zcmMgPSBkYXRhLmNoYXJhY3Rlcl9hdmF0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtmcm9tX2luZGV4XSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBmcm9tX2luZGV4KTtcclxuICAgICAgICBvbGRfY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlbGV0ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiY2hhcmFjdGVyX251bWJlclwiKSkge1xyXG4gICAgICAgIGNsZWFyX2NoYXJhY3RlcihkYXRhLmNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgIH1cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmluZGV4XSA9IDA7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuaW5kZXhdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEuaW5kZXgpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdyb2xsX2luaXRpYXRpdmVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlID0gZGF0YS5pbml0aWF0aXZlX3N0YXRlO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlYWxfZGFtYWdlX3Jlc3BvbnNlJykge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gZGF0YS5kYW1hZ2U7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2F2ZV9nYW1lX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICBhbGVydCgnR2FtZSAnICsgZGF0YS5zYXZlX25hbWUgKyAnIHNhdmVkIHN1Y2Nlc2Z1bGx5Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0dhbWUgd2l0aCBuYW1lICcgKyBkYXRhLnNhdmVfbmFtZSArICcgYWxyZWFkeSBleGlzdCEnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2xvYWRfZ2FtZV9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IGRhdGEuZnVsbF9nYW1lX3N0YXRlO1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfc3RhdGU7XHJcbiAgICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX2RldGFpbGVkX2luZm87XHJcbiAgICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5vYnN0YWNsZV9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICAgIGNvbnN0cnVjdF9ib2FyZChmdWxsX2dhbWVfc3RhdGUuZ2FtZV9zdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBsb2FkIGdhbWUgJyArIGRhdGEuc2F2ZV9uYW1lKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3N5bmNfYm9hcmRfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBmdWxsX2dhbWVfc3RhdGUgPSBkYXRhLmZ1bGxfZ2FtZV9zdGF0ZTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlID0gZnVsbF9nYW1lX3N0YXRlLmNoYXJhY3Rlcl9zdGF0ZTtcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX2RldGFpbGVkX2luZm87XHJcbiAgICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUub2JzdGFjbGVfZGV0YWlsZWRfaW5mbztcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGZ1bGxfZ2FtZV9zdGF0ZS5nYW1lX3N0YXRlKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICd1cGRhdGVfZm9nX3Jlc3BvbnNlJykge1xyXG5cdFx0XHRcdHZhciBpbmRleCA9IGRhdGEuaW5kZXg7XHJcblx0XHRcdFx0dmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgaW5kZXgpO1xyXG5cdFx0XHRcdGlmIChkYXRhLnVwZGF0ZV90eXBlID09ICdyZW1vdmUnKSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAwO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAxO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBGT0dfSU1BR0U7XHJcblx0XHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2Fzc2lnbl96b25lX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgaW5kZXhfbGlzdCA9IGRhdGEuaW5kZXhfbGlzdFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4X2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaW5kZXhfbGlzdFtpXV0gPSBkYXRhLnpvbmVfbnVtYmVyO1xyXG4gICAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2luZGV4X2xpc3RbaV1dID0gZGF0YS5tb2RpZmljYXRvcjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9yZXNwb25zZScpIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGRhdGEubmV3X3ZhbHVlO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NpbXBsZV9yb2xsX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IGRhdGEuY2hhcmFjdGVyX25hbWUgKyBcIiDQsdGA0L7RgdCw0LXRgiBcIiArIGRhdGEucm9sbFxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2tpbGxfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciB1c2VyX2luZGV4ID0gZGF0YS51c2VyX2luZGV4XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbdXNlcl9pbmRleF0gPSAxXHJcbiAgICAgIHN3aXRjaChkYXRhLnNraWxsX2luZGV4KSB7XHJcbiAgICAgICAgY2FzZSAwOiAvLyDRgNGL0LLQvtC6XHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gKyBjaGFyZ2VfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvtCy0LXRgNGI0LDQtdGCINGA0YvQstC+0LpcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOiAvLyDQv9GA0LjQu9C40LIg0LDQtNGA0LXQvdCw0LvQuNC90LBcclxuICAgICAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0X2luZGV4ID0gZGF0YS50YXJnZXRfaW5kZXhcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pbmRleF1cclxuICAgICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3RhcmdldF9pbmRleF0gLSBhZHJlbmFsaW5lX3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0ID0ge31cclxuICAgICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0Lm1pbnVzX2FjdGlvbnMgPSBkYXRhLm1pbnVzX2FjdGlvbnNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaW5kZXhdLmFkcmVuYWxpbmVfdGFyZ2V0ID0gYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0XHJcblxyXG4gICAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBhZHJlbmFsaW5lX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWRyZW5hbGluZV91c2VyID0gYWRyZW5hbGluZV9vYmplY3RfdXNlclxyXG5cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQv9GA0LjQu9C40LIg0LDQtNGA0LXQvdCw0LvQuNC90LAuIFwiICArIHRhcmdldC5uYW1lICsgXCIg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9ucyArIFwiINC00LXQudGB0YLQstC40LkuINCt0YLQviDQsdGD0LTQtdGCINGB0YLQvtC40YLRjCBcIiArIGRhdGEubWludXNfYWN0aW9ucyArIFwiINC00LXQudGB0YLQstC40Lkg0L3QsCDRgdC70LXQtNGD0Y7RidC40Lkg0YXQvtC0LlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6IC8vINC/0L7QtNGA0LXQt9Cw0L3QuNC1INGB0YPRhdC+0LbQuNC70LjQuVxyXG4gICAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBzdGFtaW5hX2N1dF9saW1iX2Nvc3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS5cIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5za2lsbF9vdXRjb21lID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBsaW1iX2N1dF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgICBsaW1iX2N1dF9vYmplY3QuY29vbGRvd24gPSBjb29sZG93bl9jdXRfbGltYlxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5jdXRfbGltYiA9IGxpbWJfY3V0X29iamVjdFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gLTEwXHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC/0L7QtNGA0LXQt9Cw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdC10LfRg9GB0L/QtdGI0L3QviDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnNraWxsX291dGNvbWUgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGxpbWJfY3V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgIGxpbWJfY3V0X29iamVjdC5jb29sZG93biA9IGNvb2xkb3duX2N1dF9saW1iXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmN1dF9saW1iID0gbGltYl9jdXRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAtMTBcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L/QvtC00YDQtdC30LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdC10LfRg9GB0L/QtdGI0L3QviDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgICAgIHZhciBsaW1iX2N1dF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIGxpbWJfY3V0X29iamVjdC5jb29sZG93biA9IGNvb2xkb3duX2N1dF9saW1iICsgMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmN1dF9saW1iID0gbGltYl9jdXRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IC0xMFxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INC/0L7QtNGA0LXQt9Cw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOiAvLyDRgdC70LDQsdC+0LUg0LzQtdGB0YLQvlxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHN0YW1pbmFfd2Vha3Nwb3RfY29zdFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGRhdGEub3V0Y29tZSA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICB2YXIgd2Vha3Nwb3Rfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgd2Vha3Nwb3Rfb2JqZWN0Lmh1bnRlcl9pZCA9IHVzZXJfaW5kZXhcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ud2Vha3Nwb3QgPSB3ZWFrc3BvdF9vYmplY3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L7QsdC90LDRgNGD0LbQuNC7INGB0LvQsNCx0L7QtSDQvNC10YHRgtC+IFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC90LUg0YPQtNCw0LvQvtGB0Ywg0L7QsdC90LDRgNGD0LbQuNGC0Ywg0YHQu9Cw0LHQvtC1INC80LXRgdGC0L4gXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgNDogLy8g0LvQtdGH0LXQvdC40LVcclxuICAgICAgICB2YXIgaGVhbGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgdmFyIGNvb2xkb3duID0gMFxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVt1c2VyX2luZGV4XSA+IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2RhdGEudGFyZ2V0X2lkXSkge1xyXG4gICAgICAgICAgLy8g0L/QsNGG0LjQtdC90YIg0L3QtSDRhdC+0LTQuNGCINCyINGN0YLQvtGCINC20LUg0YXQvtC0XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgY29vbGRvd24gPSAwXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvb2xkb3duID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaGVhbGVkX29iamVjdCA9IHt9XHJcbiAgICAgICAgaGVhbGVkX29iamVjdC5jb29sZG93biA9IGNvb2xkb3duXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uaGVhbGVkID0gaGVhbGVkX29iamVjdFxyXG4gICAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImZhaWxcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC90LUg0L/QvtC70YPRh9C40LvQvtGB0Ywg0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC/0L7Qu9GD0YfQuNC70L7RgdGMINGD0YHQv9C10YjQvdC+INCy0YvQu9C10YfQuNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuaGVhbF9yb2xsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGRhdGEubmV3X2hwXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjcml0aWNhbCBzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCjIFwiICsgaGVhbGVyLm5hbWUgKyBcIiDQv9C+0LvRg9GH0LjQu9C+0YHRjCDQutGA0LjRgtC40YfQtdGB0LrQuCAoMiDRgdGC0LXQv9C10L3QuCkg0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gZGF0YS5uZXdfaHBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0YDQsNC30LHQvtGA0LUg0L7RgtGF0LjQu9CwXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6IC8vINCx0L7Qu9GM0YjQvtC5INCx0YDQsNGCXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB2YXIgc2hpZWxkID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQt9Cw0YnQuNGC0LjQuyBcIiArICB0YXJnZXQubmFtZSArIFwiICgrXCIgKyBkYXRhLmJvbnVzX0tEICsgXCLQutC0KVwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2RhdGEudGFyZ2V0X2lkXSArIGRhdGEuYm9udXNfS0RcclxuICAgICAgICAgIHZhciBiaWdfYnJvX29iamVjdCA9IHt9XHJcbiAgICAgICAgICBiaWdfYnJvX29iamVjdC5jb29sZG93biA9IGNvb2xkb3duX2JpZ19icm9cclxuICAgICAgICAgIGJpZ19icm9fb2JqZWN0LmJvbnVzX0tEID0gZGF0YS5ib251c19LRFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uYmlnX2JybyA9IGJpZ19icm9fb2JqZWN0XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDY6IC8vINC/0L7QtNC90Y/RgtGMINGJ0LjRgtGLXHJcbiAgICAgICAgICB2YXIgc2hpZWxkID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGlmIChkYXRhLm91dGNvbWUgPT0gXCJzaGllbGRfdXBcIikge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gKyBzaGllbGRfdXBfS0RcclxuICAgICAgICAgICAgdmFyIHNoaWVsZF91cF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBzaGllbGRfdXBfb2JqZWN0LnN0YW1pbmFfY29zdCA9IHNoaWVsZF91cF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgICAgc2hpZWxkX3VwX29iamVjdC5LRCA9IHNoaWVsZF91cF9LRFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnNoaWVsZF91cCA9IHNoaWVsZF91cF9vYmplY3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaGllbGQubmFtZSArIFwiINC/0L7QtNC90Y/QuyDRidC40YLRiyDQt9CwINGH0LDRglwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2luZGV4XSAtIHNoaWVsZF91cF9LRFxyXG4gICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5zaGllbGRfdXBcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaGllbGQubmFtZSArIFwiINC+0L/Rg9GB0YLQuNC7INGJ0LjRgi4g0KfQsNGCINC/0YDQvtGB0YLQuChcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6IC8vINC/0L7QttC40YDQsNC90LjQtSDRgdGD0YnQvdC+0YHRgtC4XHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcblxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gLSBkYXRhLmRhbWFnZVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmhhc093blByb3BlcnR5KFwiTWFya3VzX3N0YWNrc1wiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5NYXJrdXNfc3RhY2tzID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uTWFya3VzX3N0YWNrcyArIDJcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLk1hcmt1c19zdGFja3MgPSAyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcImJpb3Bvb2xcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sICsgZGF0YS5kYW1hZ2VcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCA9IGRhdGEuZGFtYWdlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQvdCw0L3QvtGB0LjRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAg0L7RgiDQutC+0YLQvtGA0L7Qs9C+INC90LXQstC+0LfQvNC+0LbQvdC+INGD0LLQtdGA0L3Rg9GC0YzRgdGPXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgOTogLy8g0LDQsdGB0L7Qu9GO0YLQvdC+0LUg0LLQvtGB0YHRgtCw0L3QvtCy0LvQtdC90LjQtVxyXG4gICAgICAgICAgdmFyIGhlYWxlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcblxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gKyBkYXRhLmhlYWxfYW1vdW50XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgLSBkYXRhLmhlYWxfYW1vdW50XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGhlYWxlci5uYW1lICsgXCIg0LLQvtGB0YHRgtCw0L3QsNC70LjQstCw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgXCIgKyBkYXRhLmhlYWxfYW1vdW50ICsgXCIg0YXQv1wiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEwOiAvLyDQv9C+0LvRg9GH0LjRgtGMINCx0L7QvdGD0YFcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSArIDFcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC80LXQvdGP0LXRgiDQvtCx0YvRh9C90L7QtSDQvdCwINCx0L7QvdGD0YHQvdC+0LUg0LTQtdC50YHRgtCy0LjQtVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMTogLy8g0L7RgtC00YvRhVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBkYXRhLm5ld19zdGFtaW5hXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvtGC0LTRi9GF0LDQtdGCLiDQpdC+0YDQvtGI0LXQs9C+INC+0YLQv9GD0YHQutCwIVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTI6IC8vINCz0LDQt9C+0LLQsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBnYXNfYm9tYl9zdGFtaW5hX2Nvc3RcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsdGA0L7RgdCw0LXRgiDQs9Cw0LfQvtCy0YPRjiDQsdC+0LzQsdGDLiDQodC+0LLQtdGC0YPQtdC8INC30LDQtNC10YDQttCw0YLRjCDQtNGL0YXQsNC90LjQtS5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgICB2YXIgYm9tYl9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBib21iX29iamVjdC50eXBlID0gXCJnYXNfYm9tYlwiXHJcbiAgICAgICAgICAgIGJvbWJfb2JqZWN0LnBvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgICAgICBib21iX29iamVjdC50aHJlc2hvbGQgPSBkYXRhLnRocmVzaG9sZFxyXG4gICAgICAgICAgICBib21iX29iamVjdC5yYWRpdXMgPSAzXHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzLnB1c2goYm9tYl9vYmplY3QpXHJcblxyXG4gICAgICAgICAgICB2YXIgZ2FzX2JvbWJfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGdhc19ib21iX3VzZXIuY29vbGRvd24gPSBnYXNfYm9tYl9za2lsbF9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmdhc19ib21iX3VzZXIgPSBnYXNfYm9tYl91c2VyXHJcblxyXG4gICAgICAgICAgICB2YXIgaW5pdGlhbF9yYWRpdXMgPSAyXHJcblxyXG4gICAgICAgICAgICBhcHBseV9ib21iKGRhdGEucG9zaXRpb24sIGluaXRpYWxfcmFkaXVzKVxyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTM6IC8vINGB0LLQtdGC0L7RiNGD0LzQvtCy0LDRjyDQs9GA0LDQvdCw0YJcclxuICAgICAgICAgICAgdmFyIGxpZ2h0X3NvdW5kX2JvbWJfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGxpZ2h0X3NvdW5kX2JvbWJfdXNlci5jb29sZG93biA9IGxpZ2h0X3NvdW5kX2JvbWJfc2tpbGxfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5saWdodF9zb3VuZF9ib21iX3VzZXIgPSBsaWdodF9zb3VuZF9ib21iX3VzZXJcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5vdXRjb21lX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGRhdGEuY2hhcmFjdGVyX2xpc3RbaV1cclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgICAgICBpZiAoZGF0YS5vdXRjb21lX2xpc3RbaV0gPT0gMCkgeyAvLyDQn9GA0L7RiNC10Lsg0YHQv9Cw0YHQsdGA0L7RgdC+0LpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRg9GB0L/QtdC7INC/0YDQuNC60YDRi9GC0Ywg0LPQu9Cw0LfQsFwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvtGB0LvQtdC/INC90LAgMiDRhdC+0LTQsFwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImJsaW5kXCIpKSB7Ly8g0L3QtSDQvdCw0LrQu9Cw0LTRi9Cy0LLQsNC10Lwg0LXRidC1INGI0YLRgNCw0YRcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5ibGluZC5jb29sZG93biA9IDJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBibGluZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgICBibGluZF9vYmplY3QuY29vbGRvd24gPSAyXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uYmxpbmQgPSBibGluZF9vYmplY3RcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSAtIDJcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE0OiAvLyDRiNC+0LrQuNGA0L7QstCw0YLRjCAo0LTRgNC+0L0gKyDRg9GP0LfQstC40LzQvtGB0YLRjClcclxuICAgICAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YHRgtGA0LXQu9GP0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgICAgc2hvY2tlZF9lZmZlY3QoZGF0YS50YXJnZXRfaWQpXHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPINC4INGI0L7QutC40YDRg9C10YIg0YbQtdC70YwgKNGD0Y/Qt9Cy0LjQvNC+0YHRgtGMKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgICAgc2hvY2tlZF9lZmZlY3QoZGF0YS50YXJnZXRfaWQpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpINC4INGI0L7QutC40YDRg9C10YIg0YbQtdC70YwgKNGD0Y/Qt9Cy0LjQvNC+0YHRgtGMKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgc2hvY2tlZF9lZmZlY3QoZGF0YS50YXJnZXRfaWQpXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQv9C+0L/QsNC00LDQtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8g0Lgg0YjQvtC60LjRgNGD0LXRgiDRhtC10LvRjC4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTU6IC8vINC/0YvRiSDQv9GL0Ykg0LPQvtGDXHJcbiAgICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0X2luZGV4ID0gZGF0YS50YXJnZXRfaW5kZXhcclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIHBpY2hfcGljaF9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBwaWNoX3BpY2hfb2JqZWN0X3RhcmdldCA9IHt9XHJcbiAgICAgICAgICBwaWNoX3BpY2hfb2JqZWN0X3RhcmdldC5leHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pbmRleF0ucGljaF9waWNoX3RhcmdldCA9IHBpY2hfcGljaF9vYmplY3RfdGFyZ2V0XHJcblxyXG4gICAgICAgICAgdmFyIHBpY2hfcGljaF9vYmplY3RfdXNlciA9IHt9XHJcbiAgICAgICAgICBwaWNoX3BpY2hfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBwaWNoX3BpY2hfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ucGljaF9waWNoX3VzZXIgPSBwaWNoX3BpY2hfb2JqZWN0X3VzZXJcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINCf0YvRiS3Qn9GL0Ykt0JPQvtGDLiBcIiAgKyB0YXJnZXQubmFtZSArIFwiINC/0L7Qu9GD0YfQsNC10YIgXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnMgKyBcIiDQtNC+0L8g0LTQtdC50YHRgtCy0LjQuSDQvdCwINGN0YLQvtGCINC4INGB0LvQtdC00YPRjtGJ0LjQuSDRhdC+0LQuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTY6IC8vINGB0LjQu9C+0LLQvtC1INC/0L7Qu9C1XHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gZm9yY2VfZmllbGRfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNoaWVsZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LnR5cGUgPSBcImZvcmNlX2ZpZWxkXCJcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5wb3NpdGlvbiA9IGRhdGEucG9zaXRpb25cclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5yYWRpdXMgPSBmb3JjZV9maWVsZF9yYWRpdXNcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5zaGllbGQgPSBkYXRhLnNoaWVsZFxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LmNoYXJhY3Rlcl9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfbGlzdFxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LmNlbGxzX3Byb3RlY3RlZCA9IGRhdGEuY2VsbHNfcHJvdGVjdGVkXHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzLnB1c2goc2hpZWxkX29iamVjdClcclxuXHJcbiAgICAgICAgICAgIHZhciBzaGllbGRfaW5kZXggPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5sZW5ndGggLSAxXHJcbiAgICAgICAgICAgIHZhciBjaGFyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9yY2VfZmllbGRfdGFyZ2V0ID0ge31cclxuICAgICAgICAgICAgZm9yY2VfZmllbGRfdGFyZ2V0LnNoaWVsZF9pbmRleCA9IHNoaWVsZF9pbmRleFxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJfbGlzdFtpXVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uZm9yY2VfZmllbGRfdGFyZ2V0ID0gZm9yY2VfZmllbGRfdGFyZ2V0XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JjZV9maWVsZF91c2VyID0ge31cclxuICAgICAgICAgICAgZm9yY2VfZmllbGRfdXNlci5jb29sZG93biA9IGZvcmNlX2ZpZWxkX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uZm9yY2VfZmllbGRfdXNlciA9IGZvcmNlX2ZpZWxkX3VzZXJcclxuICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsNC60YLQuNCy0LjRgNGD0LXRgiDRgdC40LvQvtCy0L7QtSDQv9C+0LvQtVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTc6IC8vINC40L3QstC40LdcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbdXNlcl9pbmRleF0gPSBkYXRhLnVzZXJuYW1lXHJcbiAgICAgICAgICBpZiAobXlfbmFtZSAhPSBkYXRhLnVzZXJuYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBjZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTg6IC8vINCx0L7QtdCy0LDRjyDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWRhcHRpdmVfZmlnaHRpbmcgPSAtMTtcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCw0LrRgtC40LLQuNGA0YPQtdGCINCx0L7QtdCy0YPRjiDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTk6IC8vINC70LDQutC4INGI0L7RglxyXG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBsdWNreV9zaG90X3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLnJvbGwgPT0gNykge1xyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KPQtNCw0YfQsCDQsdC70LDQs9C+0LLQvtC70LjRgiBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINC60L7RgtC+0YDRi9C5INC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwIFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5yb2xsICsgXCIg0Y3RgtC+INC90LUg0YfQuNGB0LvQviBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINGC0LDQuiDRh9GC0L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINC40LfQsdC10LPQsNC10YIg0LDRgtCw0LrQuC5cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyMDogLy8gbG90dGVyeV9zaG90XHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGxvdHRlcnlfc2hvdF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGF0YS5yb2xsID09IDcpIHtcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZSlcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCa0LDQutCw0Y8g0YPQtNCw0YfQsCEg0KTQvtGA0YLRg9C90LAg0Y/QstC90L4g0L3QsCDRgdGC0L7RgNC+0L3QtSBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINC60L7RgtC+0YDRi9C5INC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwIFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yb2xsID09IDc3KSB7XHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQlNC20LXQutC/0L7RgiEgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINGB0LXQs9C+0LTQvdGPINGB0YLQvtC40YIg0LrRg9C/0LjRgtGMINC70L7RgtC10YDQtdC50L3Ri9C5INCx0LjQu9C10YIsINCwINC/0L7QutCwINC+0L0g0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAgXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBkYXRhLnJvbGwgKyBcIiDRjdGC0L4g0L3QtSDRh9C40YHQu9C+IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiwg0YLQsNC6INGH0YLQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0LjQt9Cx0LXQs9Cw0LXRgiDQsNGC0LDQutC4LlwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIxOiAvL9Cy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40LlcclxuICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSArIGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gYWN0aW9uX3NwbGFzaF9zdGFtaW5hX2Nvc3QqZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIGFjdGlvbl9zcGxhc2hfb2JqZWN0ID0ge31cclxuICAgICAgICAgIGFjdGlvbl9zcGxhc2hfb2JqZWN0LmNvb2xkb3duID0gYWN0aW9uX3NwbGFzaF9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5hY3Rpb25fc3BsYXNoID0gYWN0aW9uX3NwbGFzaF9vYmplY3RcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINCy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40Lkg0Lgg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9ucyArIFwiINC+0YHQvdC+0LLQvdGL0YUg0LTQtdC50YHRgtCy0LjQuSDQstC80LXRgdGC0L4g0LHQvtC90YPRgdC90YvRhS5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIyOiAvLyDQs9GA0LDQtCDRg9C00LDRgNC+0LJcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHB1bmNoX3JhaW5mYWxsX3N0YW1pbmFfY29zdCpkYXRhLnRvdGFsX2F0dGFja3NcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChkYXRhLmRhbWFnZSA+IDApIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L3QsNC90L7RgdC40YIg0LPRgNCw0LQg0LjQtyBcIiArIGRhdGEudG90YWxfYXR0YWNrcyArIFwiINGD0LTQsNGA0L7Qsiwg0LjQtyDQutC+0YLQvtGA0YvRhSBcIiArIGRhdGEuc3VjY2Vzc2Z1bGxfYXR0YWNrcyArIFwiINC/0L7Qv9Cw0LTQsNGO0YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90LDQvdC+0YHRjyBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsC5cIlxyXG5cclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjM6IC8vINCw0LTRgNC10L3QsNC70LjQvdC+0LLRi9C5INC/0L7RgtC+0L9cclxuICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXRfaW5kZXggPSBkYXRhLnRhcmdldF9pbmRleFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pbmRleF1cclxuICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zWzBdXHJcbiAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF90YXJnZXQgPSB7fVxyXG4gICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0LmV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldC50dXJuID0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaW5kZXhdLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldCA9IGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldFxyXG5cclxuICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF91c2VyID0ge31cclxuICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBwb2lzb25vdXNfYWRyZW5hbGluZV9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyID0gYWRyZW5hbGluZV9vYmplY3RfdXNlclxyXG5cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0LjRgdC/0L7Qu9GM0LfRg9C10YIg0LDQtNGA0LXQvdCw0LvQuNC90L7QstGL0Lkg0L/QvtGC0L7Qvy4gXCIgICsgdGFyZ2V0Lm5hbWUgKyBcIiDQv9C+0LvRg9GH0LDQtdGCIFwiICsgZGF0YS5leHRyYV9hY3Rpb25zWzBdICsgXCIg0LTQtdC50YHRgtCy0LjQuSDQsiDRjdGC0L7RgiDRhdC+0LQsINC4IFwiICsgZGF0YS5leHRyYV9hY3Rpb25zWzFdICsgXCIg0LIg0YHQu9C10LTRg9GO0YnQuNC5LiDQrdGC0L4g0LHRg9C00LXRgiDRgdGC0L7QuNGC0Ywg0LbQuNC30L3QtdC5INC4INCy0YvQvdC+0YHQu9C40LLQvtGB0YLQuCwg0LjRgdC/0L7Qu9GM0LfRg9C50YLQtSDRgSDRg9C80L7QvC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG5cclxuICAgICAgY2FzZSAyNDogLy8g0LrQuNGB0LvQvtGC0L3QsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGFjaWRfYm9tYl9zdGFtaW5hX2Nvc3RcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LHRgNC+0YHQsNC10YIg0LrQuNGB0LvQvtGC0L3Rg9GOINCz0YDQsNC90LDRgtGDLiDQkCDQvtC90Lgg0YLQvtC70YzQutC+INC60YPQv9C40LvQuCDQvdC+0LLRi9C1INC00L7RgdC/0LXRhdC4Li4uXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICB2YXIgYWNpZF9ib21iX3VzZXIgPSB7fVxyXG4gICAgICAgICAgYWNpZF9ib21iX3VzZXIuY29vbGRvd24gPSBhY2lkX2JvbWJfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWNpZF9ib21iX3VzZXIgPSBhY2lkX2JvbWJfdXNlclxyXG5cclxuICAgICAgICAgIGFwcGx5X2FjaWRfYm9tYihkYXRhLnBvc2l0aW9uLCBhY2lkX2JvbWJfcmFkaXVzKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyNTogLy8g0LfQsNC80LjQvdC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluY2x1ZGVzKGRhdGEucG9zaXRpb24pKSB7XHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMucHVzaChkYXRhLnBvc2l0aW9uKVxyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1tkYXRhLnBvc2l0aW9uXSA9IFtdXHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW2RhdGEucG9zaXRpb25dLnB1c2goZGF0YS5wbGF5ZXJfbmFtZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI2OiAvLyDQvtCx0LXQt9Cy0YDQtdC00LjRgtGMINC80LjQvdGDXHJcblxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHN3aXRjaChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImVtcHR5XCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KEg0YfQtdC8IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQvtCy0LDRgtGMP1wiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZhaWxcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9C+0L/Ri9GC0LDQu9GB0Y8g0L7QsdC10LfQstGA0LXQtNC40YLRjCDQvNC40L3Rgywg0L3QviDQvdC1INGB0YPQvNC10LsuXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtaW5lX3Bvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgbWluZV9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBjZWxsLnNyYyA9IGZvZ09yUGljKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5kZXhPZihtaW5lX3Bvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLnNwbGljZShpbmRleCwxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1ttaW5lX3Bvc2l0aW9uXSA9IFtdXHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LfQsNC/0YDQtdGJ0LDQtdGCINC80LjQvdC1INCy0LfRgNGL0LLQsNGC0YzRgdGPIVwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN3aXRjaCDQvtCx0LXQstC30YDQtdC20LXQvdC40Y8g0L/QvtGI0LXQuyDQvdC1INGC0LDQulwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBhbGVydChcIlJlY2VpdmVkIHVua25vd24gc2tpbGwgY29tbWFuZFwiKVxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ25ld19yb3VuZF9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIG1lc3NhZ2UgPSBcItCd0LDRh9Cw0LvQviDQvdC+0LLQvtCz0L4g0YDQsNGD0L3QtNCwIVwiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0gIT09IG51bGwgJiYgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgc3dpdGNoIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnYXNfYm9tYlwiOlxyXG4gICAgICAgICAgICAgICAgYXBwbHlfYm9tYihnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5wb3NpdGlvbiwgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cyA+PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZV9vYmplY3RfY29tbWFuZChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5wb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXSA9IG51bGxcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cyA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cyArIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJNZXNzZWQgdXAgcmVzb2x2aW5nIHRlcnJhaW4gZWZmZWN0c1wiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXIgIT09IHVuZGVmaW5lZCAmJiBjaGFyYWN0ZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbaV0gPSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2ldID0gMFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gcGFyc2VGbG9hdChtb3ZlX2FjdGlvbl9tYXBbY2hhcmFjdGVyLmFnaWxpdHldKTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSBib251c19hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IG1haW5fYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJ0aXJlZFwiKSkgeyAvLyDQo9Cx0YDQsNGC0Ywg0LHQvtC90YPRgdGLINC+0YIg0YPRgdGC0LDQu9C+0YHRgtC4INC/0YDQvtGI0LvQvtCz0L4g0YXQvtC00LAgKNGH0YLQvtCx0Ysg0LrQvtCz0LTQsCDQsdGD0LTRg9GCINC90LDQutCw0LvQsNC00YvQstCw0YLRjNGB0Y8g0L3QvtCy0YvQtSDQvdC1INGI0YLRgNCw0YTQvtCy0LDRgtGMINC00LLQsNC20LTRiylcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkLmJvbnVzXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIDwgc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdICogMC42Nykge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPCBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0gKiAwLjM0KSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIDw9IDApIHsgLy8gM9GPINGB0YLQsNC00LjRj1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpcmVkX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICB0aXJlZF9vYmplY3QuYm9udXMgPSAtM1xyXG4gICAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LnN0YWdlID0gM1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50aXJlZCA9IHRpcmVkX29iamVjdFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSAzXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBwYXJzZUZsb2F0KE1hdGguY2VpbChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0qMC4yNSkpXHJcbiAgICAgICAgICAgICAgICBpZiAoKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9PSAxKSYmKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPT0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSAxXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2UgeyAvLyAy0Y8g0YHRgtCw0LTQuNGPXHJcbiAgICAgICAgICAgICAgICB2YXIgdGlyZWRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgIHRpcmVkX29iamVjdC5ib251cyA9IC0yXHJcbiAgICAgICAgICAgICAgICB0aXJlZF9vYmplY3Quc3RhZ2UgPSAyXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkID0gdGlyZWRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIDJcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IHBhcnNlRmxvYXQoTWF0aC5jZWlsKGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSowLjUpKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gMdGPINGB0YLQsNC00LjRj1xyXG4gICAgICAgICAgICAgIHZhciB0aXJlZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIHRpcmVkX29iamVjdC5ib251cyA9IC0xXHJcbiAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LnN0YWdlID0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQgPSB0aXJlZF9vYmplY3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBwYXJzZUZsb2F0KE1hdGguY2VpbChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0qMC43NSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInRpcmVkXCIpKSB7IC8vINC90LUg0YPRgdGC0LDQuyAtPiDRg9Cx0YDQsNGC0Ywg0YPRgdGC0LvQsNC70L7RgdGC0Ywg0LXRgdC70Lgg0LHRi9C70LBcclxuICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWRcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImxpZ2h0X3NvdW5kX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5saWdodF9zb3VuZF9ib21iX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmxpZ2h0X3NvdW5kX2JvbWJfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodCy0LXRgtC+0YjRg9C80L7QstCw0Y8g0LPRgNCw0L3QsNGC0LAg0YNcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LPQvtGC0L7QstCwINC6INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGOLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubGlnaHRfc291bmRfYm9tYl91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5saWdodF9zb3VuZF9ib21iX3VzZXIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFjdGlvbl9zcGxhc2hcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWN0aW9uX3NwbGFzaC5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWN0aW9uX3NwbGFzaFxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQstC90L7QstGMINC80L7QttC10YIg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINCy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40LkuXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY3Rpb25fc3BsYXNoLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY3Rpb25fc3BsYXNoLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3VzZXJcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JPQsNC30L7QstCw0Y8g0LPRgNCw0L3QsNGC0LAg0YNcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LPQvtGC0L7QstCwINC6INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGOLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfdXNlci5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYWNpZF9ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl91c2VyXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCa0LjRgdC70L7RgtC90LDRjyDQs9GA0LDQvdCw0YLQsCDRg1wiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQs9C+0YLQvtCy0LAg0Log0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3VzZXIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImZvcmNlX2ZpZWxkX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZm9yY2VfZmllbGRfdXNlci5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZm9yY2VfZmllbGRfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodC40LvQvtCy0L7QtSDQv9C+0LvQtSDRgyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvdC+0LLQsCDQt9Cw0YDRj9C20LXQvdC+LlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZm9yY2VfZmllbGRfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZm9yY2VfZmllbGRfdXNlci5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwicGljaF9waWNoX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCj0LzQtdC90LjQtSDQn9GL0Ykt0J/Ri9GJINGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC90L7QstCwINC00L7RgdGC0YPQv9C90L4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gPT0gcGljaF9waWNoX2Nvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gMFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwicGljaF9waWNoX3RhcmdldFwiKSkge1xyXG4gICAgICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdGFyZ2V0LmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldICsgMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF90YXJnZXRcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFkcmVuYWxpbmVfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZV91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hZHJlbmFsaW5lX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQo9C80LXQvdC40LUg0J/RgNC40LvQuNCyINCQ0LTRgNC10L3QsNC70LjQvdCwINGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC90L7QstCwINC00L7RgdGC0YPQv9C90L4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInBvaXNvbm91c19hZHJlbmFsaW5lX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCj0LzQtdC90LjQtSDQkNC00YDQtdC90LDQu9C40L3QvtCy0YvQuSDQn9C+0YLQvtC/INGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC90L7QstCwINC00L7RgdGC0YPQv9C90L4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFkcmVuYWxpbmVfdGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIG1pbnVzX2FjdGlvbnMgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdGFyZ2V0Lm1pbnVzX2FjdGlvbnNcclxuICAgICAgICAgICAgICB3aGlsZSAobWludXNfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChtaW51c19hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSAtIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldIC0gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbWludXNfYWN0aW9ucyA9IG1pbnVzX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdGFyZ2V0XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJwb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXRcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgdHVybiA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0LnR1cm5cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldC50dXJuID0gdHVybiArIDFcclxuICAgICAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0LmV4dHJhX2FjdGlvbnNbdHVybl1cclxuICAgICAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldICsgMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmICh0dXJuICsgMSA9PSBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2ldXHJcbiAgICAgICAgICAgICAgICB2YXIgbWF4X0hQID0gSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXVxyXG4gICAgICAgICAgICAgICAgdmFyIG1heF9zdGFtaW5hID0gc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgICAgICAgICAgICAgICB2YXIgSFBfY29zdCA9IHBvaXNvbm91c19hZHJlbmFsaW5lX2ZsYXRfSFAgKyBwYXJzZUludChwYXJzZUZsb2F0KG1heF9IUCkgKiBwb2lzb25vdXNfYWRyZW5hbGluZV9wZXJjZW50X0hQKVxyXG4gICAgICAgICAgICAgICAgdmFyIHN0YW1pbmFfY29zdCA9IHBvaXNvbm91c19hZHJlbmFsaW5lX2ZsYXRfc3RhbWluYSArIHBhcnNlSW50KHBhcnNlRmxvYXQobWF4X3N0YW1pbmEpICogcG9pc29ub3VzX2FkcmVuYWxpbmVfcGVyY2VudF9zdGFtaW5hKVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2ldID0gY2hhcmFjdGVyX3N0YXRlLkhQW2ldIC0gSFBfY29zdFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSAtIHN0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JDQtNGA0LXQvdCw0LvQuNC9INCyINC60YDQvtCy0LggXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINC30LDQutCw0L3Rh9C40LLQsNC10YLRgdGPLCDQvdCw0YHRgtGD0L/QsNC10YIg0L/QvtGF0LzQtdC70YzQtSAoXCIgKyBIUF9jb3N0ICsgXCIg0YXQvyDQuCBcIiArIHN0YW1pbmFfY29zdCArIFwiINCy0YvQvdC+0YHQu9C40LLQvtGB0YLQuClcIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInNob2NrZWRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZC5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtpXSArIDFcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJjdXRfbGltYlwiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSAtMTBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYi5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY3V0X2xpbWIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodGD0YXQvtC20LjQu9C40Y8gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINCy0L7RgdGB0YLQsNC90L7QstGP0YLRgdGPINC90LAg0YHQu9C10LTRg9GO0YnQtdC8INGF0L7QtNGDLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJoZWFsZWRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGVhbGVkLmNvb2xkb3duID4gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSAwXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGVhbGVkLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJibGluZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biA+IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJsaW5kLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gKyAyXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCX0YDQtdC90LjQtSBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQvtGB0YHRgtCw0L3QvtCy0LjQu9C+0YHRjFwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyAtIDFcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJzaGllbGRfdXBcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gTWF0aC5jZWlsKGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXS8yKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIC0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaGllbGRfdXAuc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GA0L7QtNC+0LvQttCw0LXRgiDQtNC10YDQttCw0YLRjCDRidC40YIgKNGB0L/QsNGB0LjQsdC+KVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYmlnX2Jyb1wiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm8uYm9udXNfS0RcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGC0LXRgNGP0LXRgiDQt9Cw0YnQuNGC0YMg0JHQvtC70YzRiNC+0LPQviDQkdGA0LDRgtCwXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJhY2lkX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uZHVyYXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtpXSArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3BvaXNvbi5ib251c19LRFxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb25cclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JHRgNC+0L3RjyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0L3QsNC60L7QvdC10YYg0LLQvtGB0YHRgtCw0L3QvtCy0LjQu9Cw0YHRjFwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3BvaXNvbi5kdXJhdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3BvaXNvbi5kdXJhdGlvbiAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbFxyXG4gICAgICAgICAgICB3aGlsZSAoY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldIC0gZ2FzX2JvbWJfbW92ZV9yZWR1Y3Rpb25cclxuICAgICAgICAgICAgICBpZiAoY291bnQgJSAyID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSAtIDFcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvdW50ID0gY291bnQgLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNhdmVfcm9sbCA9IGRhdGEuc2F2ZV9yb2xsX2xpc3RbaV1cclxuICAgICAgICAgICAgaWYgKHNhdmVfcm9sbCA+PSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi50aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgLSAxXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC60LjQtNCw0LXRgiDRgdC/0LDRgdCx0YDQvtGB0L7QuiDQuCDRg9C80LXQvdGM0YjQsNC10YIg0YHRgtCw0LTQuNGOINC+0YLRgNCw0LLQu9C10L3QuNGPICjRgtC10L/QtdGA0YwgXCIgKyBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/RgNC+0LLQsNC70LjQstCw0LXRgiDRgdC/0LDRgdCx0YDQvtGB0L7Qui4g0KHRgtCw0LTQuNGPINC+0YLRgNCw0LLQu9C10L3QuNGPINC+0YHRgtCw0LXRgtGB0Y8g0L/RgNC10LbQvdC10LkgKFwiICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCx0L7Qu9GM0YjQtSDQvdC1INC+0YLRgNCw0LLQu9C10L0hXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcIm1lbGVlZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWQuY29vbGRvd24gPD0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLm1lbGVlZFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWQuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLm1lbGVlZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09ICdzbmlwZXInKSB7XHJcbiAgICAgICAgICAgIHZhciBlZmZlY3RzX29iamVjdCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV1cclxuICAgICAgICAgICAgaWYgKGVmZmVjdHNfb2JqZWN0Lmhhc093blByb3BlcnR5KFwic25pcGVyX3Bhc3NpdmVcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9hdHRhY2tfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9kYW1hZ2VfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgICBpZiAoY3VycmVudF9hdHRhY2tfYm9udXMgPT0gLTUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfYXR0YWNrX2JvbnVzID0gTWF0aC5taW4oY3VycmVudF9hdHRhY2tfYm9udXMgKyAxLCA0KVxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19kYW1hZ2VfYm9udXMgPSBNYXRoLm1pbihjdXJyZW50X2RhbWFnZV9ib251cyArIDIsIDgpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2ldIC0gY3VycmVudF9hdHRhY2tfYm9udXMgKyBuZXdfYXR0YWNrX2JvbnVzXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbaV0gLSBjdXJyZW50X2RhbWFnZV9ib251cyArIG5ld19kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251cyA9IG5ld19hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNuaXBlcl9wYXNzaXZlLmRhbWFnZV9ib251cyA9IG5ld19kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgc25pcGVyX3Bhc3NpdmVfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zbmlwZXJfcGFzc2l2ZSA9IHNuaXBlcl9wYXNzaXZlX29iamVjdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYmF0dGxlX21vZF9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID0gZGF0YS52YWx1ZVxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDApIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JHQvtC5INC+0LrQvtC90YfQtdC9ISDQndCw0YHRgtGD0L/QuNC7INC80LjRgCDQstC+INCy0YHQtdC8INC80LjRgNC1XCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0J3QsNGH0LDQu9C+INCx0L7RjyEg0JvRjtC00Lgg0YPQvNC40YDQsNGO0YIsINC10YHQu9C4INC40YUg0YPQsdC40YLRjFwiXHJcbiAgICAgIH1cclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3Jlc29sdmVfYXR0YWNrX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5hdHRhY2tfdHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gZ3Vuc2hvdF9hdWRpb1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGEuYXR0YWNrX3R5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gc3dvcmRfYXVkaW9cclxuICAgICAgfVxyXG4gICAgICBhdWRpby5wbGF5KCk7XHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtkYXRhLmF0dGFja2VyX2lkXSAhPSBcImFsbFwiKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtkYXRhLmF0dGFja2VyX2lkXSA9IFwiYWxsXCJcclxuICAgICAgICB2YXIgYXR0YWNrZXJfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBkYXRhLmF0dGFja2VyX3Bvc2l0aW9uKTtcclxuICAgICAgICBhdHRhY2tlcl9jZWxsLnNyYyA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuYXR0YWNrZXJfaWRdLmF2YXRhcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5hdHRhY2tlcl9pZF1cclxuICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuYXR0YWNrZXJfaWRdID0gMVxyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmF0dGFja2VyX2lkXSAtIHN0YW1pbmFfYXR0YWNrX2Nvc3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gLSAxXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLmNvdmVyX2xldmVsID4gMCkge1xyXG4gICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcItCj0YDQvtCy0LXQvdGMINGD0LrRgNGL0YLQuNGPOiBcIiArIGRhdGEuY292ZXJfbGV2ZWxcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCJcIlxyXG4gICAgICB9XHJcbiAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiLCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0LDRgtCw0LrQvtCy0LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdC+INGC0L7RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdzZWFyY2hfYWN0aW9uX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICAgICAgcHVzaFRvTGlzdChkYXRhLmNoYXJhY3Rlcl9uYW1lICsgJyDQsdGA0L7RgdC40LsgJyArIGRhdGEucm9sbCArICcg0L3QsCDQstC90LjQvNCw0YLQtdC70YzQvdC+0YHRgtGMINCyINC30L7QvdC1ICcgKyBkYXRhLnpvbmVfbnVtYmVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gMVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5taW5lc19kZXRlY3RlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBkYXRhLmNoYXJhY3Rlcl9uYW1lICsgXCIg0L7QsdC90LDRgNGD0LbQuNCy0LDQtdGCIFwiICsgZGF0YS5taW5lc19kZXRlY3RlZC5sZW5ndGggKyBcIiDQvNC40L0g0YDRj9C00L7QvCDRgSDRgdC+0LHQvtC5XCJcclxuICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLm1pbmVzX2RldGVjdGVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgbWluZSA9IGRhdGEubWluZXNfZGV0ZWN0ZWRbaV1cclxuICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbbWluZV0ucHVzaChkYXRhLnBsYXllcl9uYW1lKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG52YXIgY3JlYXRlX2JvYXJkX2J1dHRvbiA9ICQoQ1JFQVRFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmNyZWF0ZV9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgY3JlYXRlQm9hcmQpO1xyXG5jcmVhdGVfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBzYXZlX2JvYXJkX2J1dHRvbiA9ICQoU0FWRV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBzYXZlQm9hcmQpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgbG9hZF9ib2FyZF9idXR0b24gPSAkKExPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxubG9hZF9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgbG9hZEJvYXJkKTtcclxubG9hZF9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHJvbGxfaW5pdGlhdGl2ZV9idXR0b24gPSAkKFJPTExfSU5JVElBVElWRV9CVVRUT05fU0VMRUNUT1IpO1xyXG5yb2xsX2luaXRpYXRpdmVfYnV0dG9uLm9uKCdjbGljaycsIHJvbGxJbml0aWF0aXZlKTtcclxucm9sbF9pbml0aWF0aXZlX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgZm9nX2J1dHRvbiA9ICQoRk9HX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmZvZ19idXR0b24ub24oJ2NsaWNrJywgZm9nTW9kZUNoYW5nZSk7XHJcbmZvZ19idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHpvbmVfYnV0dG9uID0gJChaT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnpvbmVfYnV0dG9uLm9uKCdjbGljaycsIHpvbmVNb2RlQ2hhbmdlKTtcclxuem9uZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGNoYXRfYnV0dG9uID0gJChDSEFUX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmNoYXRfYnV0dG9uLm9uKCdjbGljaycsIGNoYW5nZUNoYXRWaXNpYmlsaXR5KTtcclxuXHJcbnZhciBtaXJyb3JfYnV0dG9uID0gJChNSVJST1JfQlVUVE9OX1NFTEVDVE9SKTtcclxubWlycm9yX2J1dHRvbi5vbignY2xpY2snLCBtaXJyb3JfYm9hcmQpO1xyXG5taXJyb3JfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBuZXh0X3JvdW5kX2J1dHRvbiA9ICQoTkVYVF9ST1VORF9CVVRUT05fU0VMRUNUT1IpO1xyXG5uZXh0X3JvdW5kX2J1dHRvbi5vbignY2xpY2snLCBzdGFydF9uZXdfcm91bmQpO1xyXG5uZXh0X3JvdW5kX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgYmF0dGxlX21vZF9idXR0b24gPSAkKEJBVFRMRV9NT0RfQlVUVE9OX1NFTEVDVE9SKTtcclxuYmF0dGxlX21vZF9idXR0b24ub24oJ2NsaWNrJywgY2hhbmdlX2JhdHRsZV9tb2QpO1xyXG5iYXR0bGVfbW9kX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgc3luY19idXR0b24gPSAkKFNZTkNfQlVUVE9OX1NFTEVDVE9SKTtcclxuc3luY19idXR0b24ub24oJ2NsaWNrJywgc3luY19ib2FyZCk7XHJcbnN5bmNfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBsYW5kbWluZV9idXR0b24gPSAkKExBTkRNSU5FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxhbmRtaW5lX2J1dHRvbi5vbignY2xpY2snLCBzaG93X2xhbmRtaW5lcyk7XHJcblxyXG52YXIgZm9nX3pvbmVfYnV0dG9uID0gJChGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG5mb2dfem9uZV9idXR0b24ub24oJ2NsaWNrJywgZm9nQ3VycmVudFpvbmUpO1xyXG5mb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHVuZm9nX3pvbmVfYnV0dG9uID0gJChVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnVuZm9nX3pvbmVfYnV0dG9uLm9uKCdjbGljaycsIHVuZm9nQ3VycmVudFpvbmUpO1xyXG51bmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgem9uZV9udW1iZXJfc2VsZWN0ID0gJChaT05FX05VTUJFUl9TRUxFQ1RPUik7XHJcbnpvbmVfbnVtYmVyX3NlbGVjdC5oaWRlKCk7XHJcbmZvciAobGV0IGkgPSAxOyBpIDwgTUFYX1pPTkVTOyBpKyspIHtcclxuICB2YXIgY3VycmVudF9vcHRpb24gPSAkKFwiPG9wdGlvbj5cIik7XHJcbiAgY3VycmVudF9vcHRpb24udGV4dCgn0JfQvtC90LAgJyArIGkpO1xyXG4gIGN1cnJlbnRfb3B0aW9uLnZhbChpKTtcclxuICB6b25lX251bWJlcl9zZWxlY3QuYXBwZW5kKGN1cnJlbnRfb3B0aW9uKTtcclxufVxyXG5cclxudmFyIHNlYXJjaF9tb2RpZmljYXRvciA9ICQoU0VBUkNIX01PRElGSUNBVE9SX1NFTEVDVE9SKTtcclxuc2VhcmNoX21vZGlmaWNhdG9yLmhpZGUoKTtcclxuXHJcbnZhciBub3RpZmljYXRpb25zX2xpc3QgPSAkKE5PVElGSUNBVElPTlNfTElTVF9TRUxFQ1RPUik7XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgQ0hBVF9DQVNIOyBpKyspIHtcclxuICB2YXIgY3VycmVudF9lbGVtZW50ID0gJChcIjxsaT5cIik7XHJcbiAgY3VycmVudF9lbGVtZW50LmF0dHIoJ2RhdGEtbmFtZScsICdub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgaSk7XHJcbiAgY3VycmVudF9lbGVtZW50LmF0dHIoJ2NsYXNzJywgJ25vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50Jyk7XHJcbiAgbm90aWZpY2F0aW9uc19saXN0LmFwcGVuZChjdXJyZW50X2VsZW1lbnQpO1xyXG59XHJcblxyXG52YXIgYm9hcmRfc2l6ZV9pbnB1dCA9ICQoQk9BUkRfU0laRV9JTlBVVF9TRUxFQ1RPUik7XHJcbmJvYXJkX3NpemVfaW5wdXQuaGlkZSgpO1xyXG5cclxudmFyIHNhdmVfbmFtZV9pbnB1dCA9ICQoU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SKTtcclxuc2F2ZV9uYW1lX2lucHV0LmhpZGUoKTtcclxuXHJcbnZhciBub3RpZmljYXRpb25zX2NvbnRhaW5lciA9ICQoTk9USUZJQ0FUSU9OU19DT05UQU5FUl9TRUxFQ1RPUik7XHJcbm5vdGlmaWNhdGlvbnNfY29udGFpbmVyLmhpZGUoKTtcclxuXHJcbnZhciBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIgPSAkKENIQVJBQ1RFUl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciB3ZWFwb25faW5mb19jb250YWluZXIgPSAkKFdFQVBPTl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxuXHJcbmRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZTtcclxuICAgIC8vIHdcclxuICAgIGlmKGtleUNvZGUgPT0gODcpIHtcclxuICAgICAgICB3X29uY2xpY2soKVxyXG4gICAgfSBlbHNlIGlmIChrZXlDb2RlID09IDY1KSB7IC8vIGFcclxuICAgICAgYV9vbmNsaWNrKClcclxuICAgIH1cclxufTtcclxuXHJcbnNldEludGVydmFsKHJlY29ubmVjdCwgMTUqMTAwMClcclxuIiwibGV0IHNvY2tldDtcclxubGV0IHNlcnZlcl9hZGRyZXNzO1xyXG5sZXQgb25NZXNzYWdlRnVuY3Rpb247XHJcblxyXG5mdW5jdGlvbiBpbml0KHVybCkge1xyXG4gIHNlcnZlcl9hZGRyZXNzID0gdXJsO1xyXG4gIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUmVhZHkoKSB7XHJcbiAgcmV0dXJuIHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTlxyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnb3BlbicpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBvbk1lc3NhZ2VGdW5jdGlvbiA9IGhhbmRsZXJGdW5jdGlvbjtcclxuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKGRhdGEpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0KCkge1xyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICBvbk1lc3NhZ2VGdW5jdGlvbihkYXRhKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShwYXlsb2FkKSB7XHJcbiAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbml0KHNlcnZlcl9hZGRyZXNzKTtcclxuICAgIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIob25NZXNzYWdlRnVuY3Rpb24pO1xyXG4gICAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnTm90IHNlbmQsIGJ1dCByZWNvbm5lY3RlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgcmVnaXN0ZXJPcGVuSGFuZGxlcixcclxuICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyLFxyXG4gIHNlbmRNZXNzYWdlLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0LFxyXG4gIGlzUmVhZHlcclxufVxyXG4iXX0=
