(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _wsClient = require('./ws-client');

var _wsClient2 = _interopRequireDefault(_wsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = window.jQuery;

var CHARACTER_INFO_CONTANER_SELECTOR = '[data-name="character-info-container"]';
var WEAPON_INFO_CONTANER_SELECTOR = '[data-name="weapon-info-container"]';
var NOTIFICATIONS_CONTANER_SELECTOR = '[data-name="notifications-container"]';
var INITIATIVE_ORDER_CONTANER_SELECTOR = '[data-name="initiative-order-display-container"]';

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

var SKILL_MODAL_SELECTOR = '[data-name="skill-modal"]';
var SKILL_MODAL_CONTENT_SELECTOR = '[data-name="skill-modal-content"]';
var SKILL_DESCRIPTION_CONTAINER_SELECTOR = '[data-name="skill-description-container"]';
var NEXT_PAGE_BUTTON_CONTAINER_SELECTOR = '[data-name="next-page-button-container"]';

var SERVER_ADDRESS = location.origin.replace(/^http/, 'ws');

var my_name = JSON.parse(sessionStorage.getItem('username'));
var my_role = JSON.parse(sessionStorage.getItem('user_role'));
var my_room = JSON.parse(sessionStorage.getItem('room_number'));

var character_list = [];
var group_list = [];
var character_detailed_info = [];
var obstacle_list = [];
var obstacle_detailed_info = [];
var weapon_list = [];
var weapon_detailed_info = [];
var skill_list = [];
var skill_detailed_info;

var TINY_EFFECT_CLASS = 'is-tiny';

var EMPTY_CELL_PIC = "./images/square.jpg";
var ZONE_ENDPOINT_PIC = "./images/red_cross.jpg";
var FOG_IMAGE = "./images/fog.webp";
var QUESTION_IMAGE = "./images/question.jpg";
var INVISE_IMAGE = "./images/zorro_mask.jpeg";
var AIM_IMAGE = "./images/aim.jpg";
var RIGHT_ARROW_IMAGE = "./images/right_arrow.png";

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
var curved_bullets_stamina_cost = 2;

var cut_limb_cooldown = 1;

var rest_stamina_gain = 5;

var cut_limb_duration = 1;
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

var invisibility_detection_radius = 2;

var big_bro_range = 2;
var heal_range = 1;
var throw_base_range = 2;
var light_sound_bomb_range = 5;
var force_field_range = 1;
var adrenaline_range = 1;
var poisonous_adrenaline_range = 1;

var poisonous_adrenaline_duration = 2;
var poisonous_adrenaline_cooldown = 5;
var poisonous_adrenaline_flat_HP = 5;
var poisonous_adrenaline_flat_stamina = 5;
var poisonous_adrenaline_percent_HP = 0.05;
var poisonous_adrenaline_percent_stamina = 0.05;

var adrenaline_cooldown = 3;

var acid_bomb_duration = 2; // 2+1 really
var acid_bomb_cooldown = 5;
var acid_bomb_radius = 1.6;

var mines_0_distance_damage = 20;
var mines_1_distance_damage = 15;
var mines_1p5_distance_damage = 10;
var landmine_detection_radius = 2.9;
var landmine_diffuse_threshold = 10;

var tobacco_strike_hp_percentage = 0.1;
var tobacco_strike_bonus = 4;
var tobacco_strike_cooldown = 1;

// This is a constant, will be moved to database later
var HP_values = [15, 30, 40, 55, 75, 100, 130, 165, 205, 250, 300, 355, 415];
var stamina_values = [30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195];
var strength_damage_map = [-2, 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55];
var move_action_map = [1, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15];
var bonus_action_map = [0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3];
var main_action_map = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3];

var CHARACTER_STATE_CONSTANT = { HP: [], main_action: [], bonus_action: [], move_action: [], stamina: [], initiative: [], can_evade: [], has_moved: [], KD_points: [], current_weapon: [], visibility: [], invisibility: [], attack_bonus: [], damage_bonus: [], universal_bonus: [], bonus_KD: [], special_effects: [], ranged_advantage: [], melee_advantage: [], defensive_advantage: [], position: [], evade_bonus: [], melee_resist: [], bullet_resist: [] };
var game_state = { board_state: [], fog_state: [], zone_state: [], size: 0, search_modificator_state: [], terrain_effects: [], battle_mod: 0, landmines: { positions: [], knowers: [] } };
var character_state = CHARACTER_STATE_CONSTANT;

var gm_control_mod = 0; // normal mode

// in_process: 0 = nothing, 1 = move, 2 = attack, 3 = skill
var character_chosen = { in_process: 0, char_id: 0, char_position: 0, weapon_id: 0, skill_id: 0, cell: 0 };

var last_obstacle = 1;
var zone_endpoint = { index: -1, cell: 0 };

var gunshot_audio = new Audio('sounds/gunshot.mp3');
var sword_audio = new Audio('sounds/sword.wav');
var explosion_audio = new Audio('sounds/explosion.mp3');
var suriken_audio = new Audio('sounds/suriken.mp3');

gunshot_audio.volume = 0.2;
sword_audio.volume = 0.2;
suriken_audio.volume = 0.2;
explosion_audio.volume = 0.2;

function reconnect() {
  if (!_wsClient2.default.isReady()) {
    _wsClient2.default.init(SERVER_ADDRESS);
    _wsClient2.default.registerMessageHandlerDefault();
    console.log('Hopefully reconnected (pray)');
  } else {
    console.log('Was online anyway');
  }
}

// Создание доски, onclick клеток, save/load

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

function send_construct_command(new_game_state) {
  var toSend = {};
  toSend.command = 'construct_board';
  toSend.room_number = my_room;
  toSend.game_state = new_game_state;
  _wsClient2.default.sendMessage(toSend);
}

function construct_board(new_game_state) {
  game_state = new_game_state;
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

// Zone/fog related staff

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
    for (var _i = 0; _i < game_state.size * game_state.size; _i++) {
      if (game_state.fog_state[_i] == 1) {
        var current_cell = document.getElementById("cell_" + _i);
        current_cell.src = get_object_picture(game_state.board_state[_i]);
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

    for (var _i2 = 0; _i2 < game_state.size * game_state.size; _i2++) {
      var current_zone_text = document.getElementById("zone_text_" + _i2);
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

// Helper coordinate related functions

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

// animations, container maintance

function clear_containers() {
  character_info_container.html("");
  weapon_info_container.html("");
}

function tiny_animate_containers() {
  tiny_animation(character_info_container);
  tiny_animation(weapon_info_container);
}

function tiny_animation(container) {
  container.addClass(TINY_EFFECT_CLASS);
  setTimeout(function () {
    container.removeClass(TINY_EFFECT_CLASS);
  }, 50);
}

// adding objects, characters

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

  var players_optgroup = document.createElement("optgroup");
  players_optgroup.id = "players_optgroup";
  players_optgroup.className = "character_optgroup";
  players_optgroup.label = "Игроки";

  var penguin_optgroup = document.createElement("optgroup");
  penguin_optgroup.id = "penguin_optgroup";
  penguin_optgroup.className = "character_optgroup";
  penguin_optgroup.label = "Пингвины";

  var shield_optgroup = document.createElement("optgroup");
  shield_optgroup.id = "shield_optgroup";
  shield_optgroup.className = "character_optgroup";
  shield_optgroup.label = "Сквадовцы";

  var sword_optgroup = document.createElement("optgroup");
  sword_optgroup.id = "sword_optgroup";
  sword_optgroup.className = "character_optgroup";
  sword_optgroup.label = "Мечи";

  var mutant_optgroup = document.createElement("optgroup");
  mutant_optgroup.id = "mutant_optgroup";
  mutant_optgroup.className = "character_optgroup";
  mutant_optgroup.label = "Мутанты";

  var anima_optgroup = document.createElement("optgroup");
  anima_optgroup.id = "anima_optgroup";
  anima_optgroup.className = "character_optgroup";
  anima_optgroup.label = "Звери";

  var other_optgroup = document.createElement("optgroup");
  other_optgroup.id = "other_optgroup";
  other_optgroup.className = "character_optgroup";
  other_optgroup.label = "Остальные";

  for (var i = 0; i < character_list.length; i++) {
    var current_option = document.createElement("option");
    current_option.innerHTML = character_list[i];
    current_option.value = i;
    var character_group = group_list[i];
    switch (character_group) {
      case "player":
        players_optgroup.appendChild(current_option);
        break;
      case "penguin":
        penguin_optgroup.appendChild(current_option);
        break;
      case "shield":
        shield_optgroup.appendChild(current_option);
        break;
      case "sword":
        sword_optgroup.appendChild(current_option);
        break;
      case "mutant":
        mutant_optgroup.appendChild(current_option);
        break;
      case "anima":
        anima_optgroup.appendChild(current_option);
        break;
      default:
        other_optgroup.appendChild(current_option);

    }
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

  select.append(players_optgroup);
  select.append(shield_optgroup);
  select.append(sword_optgroup);
  select.append(mutant_optgroup);
  select.append(anima_optgroup);
  select.append(penguin_optgroup);
  select.append(other_optgroup);
  character_info_container.append(select);
  character_info_container.append(button);
  tiny_animate_containers();
}

// Picture/avatar management

function fogOrPic(cell_id) {
  var picture_name = FOG_IMAGE;
  if (game_state.fog_state[cell_id] != 1 || my_role == 'gm') {
    var char_id = game_state.board_state[cell_id];
    picture_name = get_object_picture(char_id);
    if (char_id > 0 && character_state.invisibility[char_id] != "all" && character_state.invisibility[char_id] != my_name) {
      picture_name = get_object_picture(0);
    }
  }
  return picture_name;
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

// Move - Delete - Select

function move_character(to_index, to_cell) {
  character_chosen.in_process = 0; // end the motion
  var chosen_index = character_chosen.char_position;
  var chosen_character_index = character_chosen.char_id;

  var distance = findDistance(to_index, chosen_index);
  var max_distance = character_state.move_action[chosen_character_index];

  if (distance <= max_distance) {
    if (!(game_state.battle_mod == 1 && distance > 1.6)) {
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
          for (var _i3 = 0; _i3 < extended_nbh.length; _i3++) {
            if (game_state.board_state[extended_nbh[_i3]] > 0 && game_state.board_state[extended_nbh[_i3]] != chosen_character_index) {
              // there are characters there
              var current_char_num = game_state.board_state[extended_nbh[_i3]];
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
      for (var _i4 = 0; _i4 < immediate_nbh.length; _i4++) {
        if (game_state.board_state[immediate_nbh[_i4]] > 0 && game_state.board_state[immediate_nbh[_i4]] != chosen_character_index) {
          // there are characters there
          if (character_state.invisibility[game_state.board_state[immediate_nbh[_i4]]] != "all") {
            toSend.invisibility_ended_id.push(game_state.board_state[immediate_nbh[_i4]]);
          }
        }

        if (game_state.landmines.positions.includes(immediate_nbh[_i4]) && immediate_nbh[_i4] != to_index) {
          toSend.mines_exploded.push(immediate_nbh[_i4]);
          toSend.mines_damage = toSend.mines_damage + roll_x(mines_1_distance_damage);
        }
      }

      var one_and_half_nbh = index_in_radius(to_index, 1.6);
      for (var _i5 = 0; _i5 < one_and_half_nbh.length; _i5++) {
        if (game_state.landmines.positions.includes(one_and_half_nbh[_i5]) && !immediate_nbh.includes(one_and_half_nbh[_i5])) {
          toSend.mines_exploded.push(one_and_half_nbh[_i5]);
          toSend.mines_damage = toSend.mines_damage + roll_x(mines_1p5_distance_damage);
        }
      }

      var extended_nbh = index_in_radius(to_index, invisibility_detection_radius);
      for (var _i6 = 0; _i6 < extended_nbh.length; _i6++) {
        if (game_state.board_state[extended_nbh[_i6]] > 0 && game_state.board_state[extended_nbh[_i6]] != chosen_character_index && !immediate_nbh.includes(extended_nbh[_i6])) {
          // there are characters there
          var current_char_num = game_state.board_state[extended_nbh[_i6]];
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
      alert("В бою нужно двигаться поступательно (1-2 клетки)");
      undo_selection();
    }
  } else {
    alert("Полегче, мсье Болт");
    undo_selection();
  }
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

      avatar_display.onclick = function () {
        show_modal(character_number, 0);
      };

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

        if (character_state.invisibility[character_number] != "all") {
          // в инвизе
          var invise_display = document.createElement("IMG");
          invise_display.src = INVISE_IMAGE;
          invise_display.style.height = '50px';
          invise_display.style.width = '50px';
        }

        if (character_state.special_effects[character_number].hasOwnProperty("aim")) {
          //  Прицелен
          var aim_display = document.createElement("IMG");
          aim_display.src = AIM_IMAGE;
          aim_display.style.height = '50px';
          aim_display.style.width = '50px';
        }

        weapon_info_container.append(main_action_display);
        weapon_info_container.append(bonus_action_display);
        weapon_info_container.append(move_action_display);
        weapon_info_container.append(invise_display);
        weapon_info_container.append(aim_display);
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

      for (var _i7 = 0; _i7 < skillset.length; _i7++) {
        var current_option = document.createElement("option");
        current_option.innerHTML = skill_list[skillset[_i7]];
        current_option.value = skillset[_i7];
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

function show_modal(character_number, starting_index) {
  hide_modal();
  var character = character_detailed_info[character_number];
  var skillset = character.skillset;

  var skill_table = $("<table>");

  var table_size = 3;

  for (var i = 0; i < table_size; i++) {
    var row = $("<tr>");
    for (var j = 0; j < table_size; j++) {
      var index = starting_index + table_size * i + j;
      if (index < skillset.length) {
        var skill_number = skillset[index];
        var column = $("<th>");
        var skill_icon = $("<IMG>");
        var avatar = QUESTION_IMAGE;
        if (skill_detailed_info[skill_number].hasOwnProperty('avatar')) {
          avatar = skill_detailed_info[skill_number].avatar;
        }
        skill_icon.addClass('skill_icon');
        skill_icon.attr('width', '100px');
        skill_icon.attr('skill_number', skill_number);
        skill_icon.attr('height', '100px');
        skill_icon.attr('src', avatar);
        skill_icon.on('click', function (event) {
          var position = character_state.position[character_number];
          var cell = document.getElementById("cell_" + position);
          use_skill(event.target.getAttribute('skill_number'), character_number, position, cell);
          hide_modal();
        });
        skill_icon.on('mouseenter', function (event) {
          var skill_number = event.target.getAttribute('skill_number');
          var skill_object = skill_detailed_info[skill_number];
          var skill_name_object = $("<h2>");
          var skill_name = skill_list[skill_number];
          skill_name_object.html(skill_name);
          skill_description_container.append(skill_name_object);

          var skill_cost_object = $("<h2>");
          if (skill_object.hasOwnProperty('cost')) {
            var skill_cost = skill_object.cost;
          } else {
            var skill_cost = "Неизвестно";
          }
          skill_cost_object.html("Требует действий: " + skill_cost);
          skill_description_container.append(skill_cost_object);

          var skill_description_object = $("<p>");
          if (skill_object.hasOwnProperty('description')) {
            var skill_description = skill_object.description;
          } else {
            var skill_description = "Мы сами не знаем что оно делает";
          }
          skill_description_object.html(skill_description);
          skill_description_container.append(skill_description_object);
        });

        skill_icon.on('mouseleave', function (event) {
          skill_description_container.html('');
        });
        column.append(skill_icon);
        row.append(column);
      }
    }
    skill_table.append(row);
  }
  skill_modal_content.append(skill_table);

  if (skillset.length > starting_index + table_size * table_size) {
    // there are more skills to display
    var next_page_button = $("<IMG>");
    next_page_button.attr('width', '100px');
    next_page_button.attr('height', '50px');
    next_page_button.attr('src', RIGHT_ARROW_IMAGE);
    next_page_button.on("click", function (event) {
      show_modal(character_number, starting_index + table_size * table_size);
    });

    next_page_button_container.append(next_page_button);
  }
  skill_modal.show();
}

function hide_modal() {
  skill_modal.hide();
  skill_modal_content.html("");
  skill_description_container.html("");
  next_page_button_container.html("");
}

// attack related helpers

function choose_character_to_attack(cell) {
  character_chosen.in_process = 2;
  cell.src = "./images/attack_placeholder.jpg";
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

// roll something

function roll_x(x) {
  return Math.floor(Math.random() * x) + 1;
}

function rollSearch(intelligence, mod) {
  return intelligence + roll_x(20) + mod;
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

function roll_evasion(target_character, target_character_number) {
  console.log("Бонус уворота: " + character_state.evade_bonus[target_character_number]);
  var evade_roll = roll_x(20) + parseInt(target_character.agility) + character_state.universal_bonus[target_character_number] + character_state.evade_bonus[target_character_number];
  return evade_roll;
}

// managing chat

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

// cover mechanics

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

function get_accumulated_cover(user_pos, target_pos) {
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
  return accumulated_cover;
}

// Miscelaneous actions

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

function computeInitiative(agility) {
  return agility * 2 + roll_x(20);
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

// attack related things (computation)

function character_KD(target_character_number) {
  return parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number]);
}

function assign_moves(character_number) {
  var character = character_detailed_info[character_number];
  character_state.move_action[character_number] = parseFloat(move_action_map[character.agility]);
  if (character.hasOwnProperty("extra_movement")) {
    character_state.move_action[character_number] = character_state.move_action[character_number] + parseFloat(character.extra_movement);
  }
}

function weapon_damage_bonus(raw_damage, weapon, character_number, isAimed) {
  var character = character_detailed_info[character_number];
  var total_damage = raw_damage;
  if (weapon.type == 'melee') {
    total_damage = total_damage + strength_damage_map[parseInt(character.strength)];
  } else if (weapon.type == 'throwing') {
    total_damage = total_damage + strength_damage_map[Math.ceil(parseInt(character.strength) / 2)];
  } else if (weapon.type == 'ranged') {
    if (isAimed && weapon.hasOwnProperty("aim_bonus")) {
      total_damage = total_damage + parseInt(weapon.aim_bonus);
    }
  }
  total_damage = total_damage + character_state.damage_bonus[character_number];
  return total_damage;
}

function perform_attack(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;

  var weapon = weapon_detailed_info[character_chosen.weapon_id];

  if (isInRange(index, user_position, weapon.range)) {

    var accumulated_cover = get_accumulated_cover(user_position, index);

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
    toSend.user_invisibility_ended = 0;

    if (character_state.invisibility[user_character_number] != "all" && weapon.type != "throwing") {
      toSend.user_invisibility_ended = 1;
    }

    if (cover_modifier.isPossible) {
      var attack_roll = roll_attack(weapon.type, user_character_number, target_character_number, cover_modifier.advantage_bonus);

      var isAimed = false;
      if (attack_roll < 20) {
        // no crit
        if (weapon.type == "ranged") {
          var cumulative_attack_roll = attack_roll + parseInt(attacking_character.intelligence);
          if (character_state.special_effects[user_character_number].hasOwnProperty("aim")) {
            // Прицел даблит бонус попадания
            cumulative_attack_roll = cumulative_attack_roll + parseInt(attacking_character.intelligence);
            isAimed = true;
            delete character_state.special_effects[user_character_number].aim;
          }
        } else if (weapon.type == "melee") {
          var cumulative_attack_roll = attack_roll + parseInt(attacking_character.strength);
        } else if (weapon.type == "energy") {
          var cumulative_attack_roll = attack_roll + 2 * parseInt(attacking_character.intelligence);
        } else if (weapon.type == "throwing") {
          var cumulative_attack_roll = attack_roll + parseInt(attacking_character.agility);
        }

        var attack_bonus = character_state.attack_bonus[user_character_number];
        var universal_bonus = character_state.universal_bonus[user_character_number];

        cumulative_attack_roll = cumulative_attack_roll + attack_bonus + universal_bonus + cover_modifier.attack_bonus;

        toSend.attack_roll = cumulative_attack_roll;

        if (cumulative_attack_roll > target_character_KD) {
          // Есть пробитие
          if (character_state.can_evade[target_character_number] == 1) {
            var evade_roll = roll_evasion(target_character, target_character_number);
            toSend.evade_roll = evade_roll;
            if (evade_roll > cumulative_attack_roll) {
              //succesfully evaded
              toSend.outcome = "evaded";
            } else {
              var damage_roll = compute_damage(weapon, user_character_number, attack_roll, target_character_number, isAimed);
              toSend.damage_roll = damage_roll;
              toSend.outcome = "damage_after_evasion";
            }
          } else {
            var damage_roll = compute_damage(weapon, user_character_number, attack_roll, target_character_number, isAimed);
            toSend.damage_roll = damage_roll;
            toSend.outcome = "damage_without_evasion";
          }
        } else {
          toSend.outcome = "KD_block";
        }
      } else {
        // full crit
        toSend.attack_roll = attack_roll;
        var damage_roll = compute_damage(weapon, user_character_number, attack_roll, target_character_number, isAimed);
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

function compute_damage(weapon, character_number, attack_roll, target_number, isAimed) {
  var damage = 0;
  var character = character_detailed_info[character_number];

  if (character.special_type == "sniper") {
    if (attack_roll < 16) {
      for (var i = 0; i < weapon.damage[0]; i++) {
        damage = damage + roll_x(weapon.damage[1]);
      }

      damage = weapon_damage_bonus(damage, weapon, character_number, isAimed);
    } else {
      if (character_state.special_effects[target_number].hasOwnProperty("weakspot") && character_state.special_effects[target_number].weakspot.hunter_id == character_number) {
        switch (attack_roll) {
          case 18:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number, isAimed);
            damage = damage * 2;
            break;
          case 19:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number, isAimed);
            damage = damage * 2;
            break;
          case 20:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number, isAimed);
            damage = damage * 5;
            break;
          default:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number, isAimed);
        }
      } else {
        switch (attack_roll) {
          case 18:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number, isAimed);
            break;
          case 19:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number, isAimed);
            damage = damage * 2;
            break;
          case 20:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number, isAimed);
            damage = damage * 3;
            break;
          default:
            for (var _i8 = 0; _i8 < weapon.damage[0]; _i8++) {
              damage = damage + roll_x(weapon.damage[1]);
            }
            damage = weapon_damage_bonus(damage, weapon, character_number, isAimed);
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
    damage = weapon_damage_bonus(damage, weapon, character_number, isAimed);

    if (attack_roll == 20) {
      damage = damage * 2;
    }
  }

  if (weapon.type == "ranged") {
    var damage_type = "bullet";
  } else if (weapon.type == "melee") {
    var damage_type = "melee";
  } else if (weapon.type == "energy") {
    var damage_type = "energy";
  } else if (weapon.type == "throwing") {
    var damage_type = "melee";
  }

  switch (damage_type) {
    case "melee":
      var resist = character_state.melee_resist[target_number];
      console.log("Урон до резиста: " + damage);
      damage = parseInt(damage * (1.0 - resist));
      console.log("Урон после резиста: " + damage);
      break;
    case "bullet":
      var resist = character_state.bullet_resist[target_number];
      console.log("Урон до резиста: " + damage);
      damage = parseInt(damage * (1.0 - resist));
      console.log("Урон после резиста: " + damage);
      break;
    default:
    //nothing for now
  }

  return damage;
}

function damage_skill_template(target_pos, user_pos, range, user_id, skill_id, bonus_attack, weapon, accumulated_cover) {
  if (isInRange(target_pos, user_pos, range)) {

    var target_character_number = game_state.board_state[target_pos];
    var target_character_KD = parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number]);
    var target_character = character_detailed_info[target_character_number];
    var attacking_character = character_detailed_info[user_id];

    var cover_modifier = cover_mod(accumulated_cover);

    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_id;
    toSend.target_id = target_character_number;
    toSend.cover_level = accumulated_cover;

    if (cover_modifier.isPossible) {

      var attack_roll = roll_attack(weapon.type, user_id, target_character_number, cover_modifier.advantage_bonus);

      if (attack_roll < 20) {
        // no crit
        var cumulative_attack_roll = attack_roll + bonus_attack + cover_modifier.attack_bonus;

        toSend.attack_roll = cumulative_attack_roll;
        var isAimed = false;

        if (cumulative_attack_roll > target_character_KD) {
          // Есть пробитие
          if (character_state.can_evade[target_character_number] == 1) {
            var evade_roll = roll_evasion(target_character, target_character_number);
            toSend.evade_roll = evade_roll;
            if (evade_roll > cumulative_attack_roll) {
              //succesfully evaded
              toSend.outcome = "evaded";
            } else {
              var damage_roll = compute_damage(weapon, user_id, attack_roll, target_character_number, isAimed);
              toSend.damage_roll = damage_roll;
              toSend.outcome = "damage_after_evasion";
            }
          } else {
            var damage_roll = compute_damage(weapon, user_id, attack_roll, target_character_number, isAimed);
            toSend.damage_roll = damage_roll;
            toSend.outcome = "damage_without_evasion";
          }
        } else {
          toSend.outcome = "KD_block";
        }
      } else {
        // full crit
        toSend.attack_roll = attack_roll;
        var damage_roll = compute_damage(weapon, user_id, attack_roll, target_character_number, isAimed);
        toSend.damage_roll = damage_roll;
        toSend.outcome = "full_crit";
      }
    } else {
      toSend.outcome = "full_cover";
    }
    return toSend;
  } else {
    return null;
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

function findThrowRange(character) {
  return throw_base_range + parseInt(character.strength) * 2;
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

// Skills!

function use_skill(skill_index, character_number, position, cell) {
  skill_index = parseInt(skill_index);
  switch (skill_index) {
    case 0:
      //Рывок
      if (character_state.bonus_action[character_number] > 0 && (!character_state.special_effects[character_number].hasOwnProperty("charge_user") || character_detailed_info[character_number].special_type == "rogue")) {
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
      if (!character_state.special_effects[character_number].hasOwnProperty("cut_limb_user")) {
        if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell);
        } else {
          alert("Не хватает действий!");
        }
      } else {
        alert("Умение все еще на кулдауне!");
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
      if (character_state.main_action[character_number] > 0) {
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

    case 27:
      // Никотиновый удар
      if (!character_state.special_effects[character_number].hasOwnProperty("tobacco_strike")) {
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index;
        toSend.user_index = character_number;
        _wsClient2.default.sendMessage(toSend);
      } else {
        alert("Нельзя затягиваться так часто! У вас зависимость");
      }
      break;
    case 28:
      // Крученые пули
      if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell);
      } else {
        alert("Не хватает действий!");
      }
      break;
    case 29:
      // Прицелиться
      if (character_state.bonus_action[character_number] > 0) {
        if (!character_state.special_effects[character_number].hasOwnProperty("aim")) {
          var toSend = {};
          toSend.command = 'skill';
          toSend.room_number = my_room;
          toSend.skill_index = skill_index;
          toSend.user_index = character_number;
          _wsClient2.default.sendMessage(toSend);
        } else {
          alert("Вы уже прицелились - пора шмалять");
        }
      } else {
        alert("Не хватает действий!");
      }
      break;

    default:
      alert("Не знаем это умение");
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
      // Большой брат
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
    case 28:
      curved_bullets(index, cell);
      stop_skill();
      break;
    default:
      alert("Unknown targeted skill");
  }
}

function choose_character_skill(skill_index, character_number, position, cell) {
  character_chosen.in_process = 3;
  character_chosen.skill_id = skill_index;
  character_chosen.char_id = character_number;
  character_chosen.char_position = position;
  cell.src = "./images/Chidori.webp";
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

// increase attack roll by agility bonus (2*mod)
function cut_limbs(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]];
  if (weapon.type == "melee") {
    var attacking_character = character_detailed_info[user_character_number];
    var bonus_attack = 2 * parseInt(attacking_character.agility) + character_state.attack_bonus[user_character_number] + character_state.universal_bonus[user_character_number];

    var accumulated_cover = get_accumulated_cover(index, user_position);
    var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon, accumulated_cover);
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
    var accumulated_cover = get_accumulated_cover(index, user_position);
    for (var i = 0; i < character_state.main_action[user_character_number]; i++) {
      var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon, accumulated_cover);
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

  var accumulated_cover = get_accumulated_cover(index, user_position);
  var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon, accumulated_cover);
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

function curved_bullets(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]];
  var attacking_character = character_detailed_info[user_character_number];
  var bonus_attack = parseInt(attacking_character.intelligence) + character_state.attack_bonus[user_character_number] + character_state.universal_bonus[user_character_number];

  var accumulated_cover = get_accumulated_cover(index, user_position);
  accumulated_cover = Math.max(parseInt(parseFloat(accumulated_cover) / 2) - 2, 0);
  var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon, accumulated_cover);
  if (toSend == null) {
    alert("Далековато");
  } else {
    _wsClient2.default.sendMessage(toSend);
  }
}

// прок газовой гранаты
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
      character_state.bonus_action[target_character_number] = character_state.bonus_action[target_character_number] - 1;
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

// More gm control actions

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
  if (my_role == "gm" || character_state.visibility[character_chosen.char_id] == 1) {
    if (character_chosen.in_process == 1) {
      undo_selection();
    } else {
      var index = character_chosen.char_position;
      var cell = character_chosen.cell;
      choose_character_to_move(index, cell);
    }
  }
}

function a_onclick() {
  if (my_role == "gm" || character_state.visibility[character_chosen.char_id] == 1) {

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
}

function compare_initiative(a, b) {
  if (character_state.initiative[a] < character_state.initiative[b]) {
    return 1;
  } else if (character_state.initiative[a] == character_state.initiative[b]) {
    return 0;
  } else {
    return -1;
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
      group_list = data.character_group_list;
      obstacle_list = data.obstacle_list;
      weapon_list = data.weapon_list;
      weapon_detailed_info = data.weapon_detailed_info;
      skill_detailed_info = data.skill_detailed_info;
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
      character_state.bonus_action[data.character_number] = bonus_action_map[character.agility];
      character_state.main_action[data.character_number] = main_action_map[character.agility];
      assign_moves(data.character_number);
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
      if (character.hasOwnProperty("evade_bonus")) {
        character_state.evade_bonus[data.character_number] = parseInt(character.evade_bonus);
      } else {
        character_state.evade_bonus[data.character_number] = 0;
      }

      if (character.hasOwnProperty("melee_resist")) {
        character_state.melee_resist[data.character_number] = parseFloat(character.melee_resist) / 100;
      } else {
        character_state.melee_resist[data.character_number] = 0.0;
      }

      if (character.hasOwnProperty("bullet_resist")) {
        character_state.bullet_resist[data.character_number] = parseFloat(character.bullet_resist) / 100;
      } else {
        character_state.bullet_resist[data.character_number] = 0.0;
      }

      // активация пассивок
      if (character.hasOwnProperty("adaptive_fighting")) {
        character_state.special_effects[data.character_number].adaptive_fighting = -1;
      }
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

      var character = character_detailed_info[data.character_number];

      if (!character.hasOwnProperty("landmine_immune")) {
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
          explosion_audio.play();
          do_damage(data.character_number, data.mines_damage);
          var message = character.name + " подрывается на минах получая " + data.mines_damage + " урона";
          pushToList(message);
        }
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
      var ordered_array = [];
      for (var _i12 = 0; _i12 < character_state.initiative.length; _i12++) {
        if (character_state.HP[_i12] > 0) {
          // character is present
          ordered_array.push(_i12);
        }
      }
      ordered_array.sort(compare_initiative);
      initiative_order_container.html("");

      var _loop = function _loop(_i13) {
        character = character_detailed_info[ordered_array[_i13]];
        query_string = '<img> id="initiative_image_' + _i13 + '"';
        img = $(query_string);

        img.attr('src', character.avatar);
        img.attr('height', '50px');
        img.attr('width', '50px');
        img.click(function () {
          var position = character_state.position[ordered_array[_i13]];
          var cell = document.getElementById('cell_' + position);
          //select_character(position, cell)
          no_shift_onclick(my_role, gm_control_mod, game_state, character_chosen.in_process, cell, position);
        });
        img.appendTo(initiative_order_container);
      };

      for (var _i13 = 0; _i13 < ordered_array.length; _i13++) {
        var character;
        var query_string;
        var img;

        _loop(_i13);
      }
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
      for (var _i14 = 0; _i14 < index_list.length; _i14++) {
        game_state.zone_state[index_list[_i14]] = data.zone_number;
        game_state.search_modificator_state[index_list[_i14]] = data.modificator;
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
          var charge_move_increase = parseInt(character.agility);
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          character_state.move_action[user_index] = character_state.move_action[user_index] + charge_move_increase;
          var charge_user_object = {};
          charge_user_object.cooldown = 0;
          character_state.special_effects[user_index].charge_user = charge_user_object;
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
          var cut_limb_object = {};
          cut_limb_object.cooldown = cut_limb_cooldown;
          character_state.special_effects[user_index].cut_limb_user = cut_limb_object;
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
                limb_cut_object.duration = cut_limb_duration;
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
                limb_cut_object.duration = cut_limb_duration;
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
              limb_cut_object.duration = cut_limb_duration + 1;
              character_state.special_effects[data.target_id].cut_limb = limb_cut_object;
              character_state.move_action[data.target_id] = -10;
              var message = attacker.name + " критически подрезает " + target.name + ", не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона.";
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              break;
            case "full_cover":
              var message = attacker.name + " пытался подрезать " + target.name + " но тот находится в полном укрытии.";
              pushToList(message);
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
          character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
          character_state.stamina[user_index] = character_state.stamina[user_index] - 1;
          var cooldown = 0;
          if (character_state.initiative[user_index] > character_state.initiative[data.target_id]) {
            // пациент не ходит в этот же ход
            character_state.main_action[data.target_id] = character_state.main_action[data.target_id] - 1;
            character_state.bonus_action[data.target_id] = character_state.bonus_action[data.target_id] - 1;
            character_state.move_action[data.target_id] = character_state.move_action[data.target_id] / 2;
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

          for (var _i15 = 0; _i15 < data.outcome_list.length; _i15++) {
            var character_number = data.character_list[_i15];
            var character = character_detailed_info[character_number];
            if (data.outcome_list[_i15] == 0) {
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
            case "full_cover":
              var message = attacker.name + " пытался шокировать " + target.name + " но тот находится в полном укрытии.";
              pushToList(message);
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

          for (var _i16 = 0; _i16 < char_list.length; _i16++) {
            var character_number = char_list[_i16];
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

        case 27:
          // никотиновый удар
          character = character_detailed_info[user_index];
          var full_hp = HP_values[character.stamina];
          character_state.HP[user_index] = character_state.HP[user_index] - full_hp * tobacco_strike_hp_percentage;
          character_state.attack_bonus[user_index] = character_state.attack_bonus[user_index] + tobacco_strike_bonus;
          var tobacco_strike_object = {};
          tobacco_strike_object.cooldown = tobacco_strike_cooldown;
          character_state.special_effects[user_index].tobacco_strike = tobacco_strike_object;
          var message = character.name + " хорошечно затягивается. Берегитесь!";
          pushToList(message);
          break;

        case 28:
          // крученые пули
          var attacker = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];
          if (game_state.battle_mod == 1) {
            character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
            character_state.stamina[user_index] = character_state.stamina[user_index] - curved_bullets_stamina_cost;
          }

          if (data.cover_level > 0) {
            var cover_string = "Уровень укрытия: " + data.cover_level;
          } else {
            var cover_string = "";
          }
          switch (data.outcome) {
            case "KD_block":
              var message = attacker.name + " пытается закрутить пулю в " + target.name + " (" + data.attack_roll + "), но не пробивает броню. " + cover_string;
              pushToList(message);
              break;
            case "evaded":
              var message = attacker.name + " пытался закрутить пулю в " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + "). " + cover_string;
              pushToList(message);
              if (target.special_type != 'rogue') {
                character_state.can_evade[data.target_id] = 0;
              }
              break;
            case "damage_without_evasion":
              var message = attacker.name + " успешно закрутил пулю " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона. " + cover_string;
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              break;
            case "damage_after_evasion":
              var message = attacker.name + " успешно закрутил пулю " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона. " + cover_string;
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              character_state.can_evade[data.target_id] = 0;
              break;
            case "full_crit":
              var message = attacker.name + " критически атакует " + target.name + "крученой пулей, не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона. " + cover_string;
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              character_state.can_evade[data.target_id] = 0;
              break;
            case "full_cover":
              var message = "Несмотря на попытку " + attacker.name + " обкрутить препятствие защищающее " + target.name + ", тот все равно находится в полном укрытии.";
              pushToList(message);
              break;
            default:
              console.log("fucked up resolving damage");
              break;
          }
          break;

        case 29:
          // Прицелиться
          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          }
          var aim_object = {};
          character_state.special_effects[user_index].aim = aim_object;
          break;

        default:
          alert("Received unknown skill command");
      }
    } else if (data.command == 'new_round_response') {
      var message = "Начало нового раунда!";
      pushToList(message);

      for (var _i17 = 0; _i17 < game_state.terrain_effects.length; _i17++) {
        if (game_state.terrain_effects[_i17] !== null && game_state.terrain_effects[_i17] !== undefined) {
          switch (game_state.terrain_effects[_i17].type) {
            case "gas_bomb":
              apply_bomb(game_state.terrain_effects[_i17].position, game_state.terrain_effects[_i17].radius);
              if (game_state.terrain_effects[_i17].radius >= 4) {
                if (my_role == "gm") {
                  delete_object_command(game_state.terrain_effects[_i17].position);
                }
                game_state.terrain_effects[_i17] = null;
              } else {
                game_state.terrain_effects[_i17].radius = game_state.terrain_effects[_i17].radius + 1;
              }
              break;
            default:
              console.log("Messed up resolving terrain effects");
          }
        }
      }

      for (var _i18 = 1; _i18 < character_state.can_evade.length; _i18++) {
        character = character_detailed_info[_i18];
        if (character !== undefined && character !== null && character_state.HP[_i18] !== null && character_state.HP[_i18] > 0) {
          character_state.can_evade[_i18] = 1;
          character_state.has_moved[_i18] = 0;
          assign_moves(_i18);
          character_state.bonus_action[_i18] = bonus_action_map[character.agility];
          character_state.main_action[_i18] = main_action_map[character.agility];

          if (character_state.special_effects[_i18].hasOwnProperty("tired")) {
            // Убрать бонусы от усталости прошлого хода (чтобы когда будут накаладываться новые не штрафовать дважды)
            character_state.universal_bonus[_i18] = character_state.universal_bonus[_i18] - character_state.special_effects[_i18].tired.bonus;
          }

          if (character_state.stamina[_i18] < stamina_values[character.stamina] * 0.67) {
            if (character_state.stamina[_i18] < stamina_values[character.stamina] * 0.34) {
              if (character_state.stamina[_i18] <= 0) {
                // 3я стадия
                var tired_object = {};
                tired_object.bonus = -3;
                tired_object.stage = 3;
                character_state.special_effects[_i18].tired = tired_object;
                character_state.universal_bonus[_i18] = character_state.universal_bonus[_i18] - 3;
                character_state.move_action[_i18] = parseFloat(character_state.move_action[_i18] * 0.25);
                if (character_state.main_action[_i18] == 1 && character_state.bonus_action[_i18] == 1) {
                  character_state.bonus_action[_i18] = 0;
                } else {
                  character_state.bonus_action[_i18] = 1;
                  character_state.main_action[_i18] = 1;
                }
              } else {
                // 2я стадия
                var tired_object = {};
                tired_object.bonus = -2;
                tired_object.stage = 2;
                character_state.special_effects[_i18].tired = tired_object;
                character_state.universal_bonus[_i18] = character_state.universal_bonus[_i18] - 2;
                character_state.move_action[_i18] = parseFloat(character_state.move_action[_i18] * 0.5);
              }
            } else {
              // 1я стадия
              var tired_object = {};
              tired_object.bonus = -1;
              tired_object.stage = 1;
              character_state.special_effects[_i18].tired = tired_object;
              character_state.universal_bonus[_i18] = character_state.universal_bonus[_i18] - 1;
              character_state.move_action[_i18] = parseFloat(character_state.move_action[_i18] * 0.75);
            }
          } else if (character_state.special_effects[_i18].hasOwnProperty("tired")) {
            // не устал -> убрать устлалость если была
            delete character_state.special_effects[_i18].tired;
          }

          if (character_state.special_effects[_i18].hasOwnProperty("light_sound_bomb_user")) {
            if (character_state.special_effects[_i18].light_sound_bomb_user.cooldown == 0) {
              delete character_state.special_effects[_i18].light_sound_bomb_user;
              var message = "Светошумовая граната у" + character.name + " готова к использованию.";
              pushToList(message);
            } else {
              character_state.special_effects[_i18].light_sound_bomb_user.cooldown = character_state.special_effects[_i18].light_sound_bomb_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("action_splash")) {
            if (character_state.special_effects[_i18].action_splash.cooldown == 0) {
              delete character_state.special_effects[_i18].action_splash;
              var message = character.name + " вновь может использовать всплеск действий.";
              pushToList(message);
            } else {
              character_state.special_effects[_i18].action_splash.cooldown = character_state.special_effects[_i18].action_splash.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("gas_bomb_user")) {
            if (character_state.special_effects[_i18].gas_bomb_user.cooldown == 0) {
              delete character_state.special_effects[_i18].gas_bomb_user;
              var message = "Газовая граната у" + character.name + " готова к использованию.";
              pushToList(message);
            } else {
              character_state.special_effects[_i18].gas_bomb_user.cooldown = character_state.special_effects[_i18].gas_bomb_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("acid_bomb_user")) {
            if (character_state.special_effects[_i18].acid_bomb_user.cooldown == 0) {
              delete character_state.special_effects[_i18].acid_bomb_user;
              var message = "Кислотная граната у" + character.name + " готова к использованию.";
              pushToList(message);
            } else {
              character_state.special_effects[_i18].acid_bomb_user.cooldown = character_state.special_effects[_i18].acid_bomb_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("force_field_user")) {
            if (character_state.special_effects[_i18].force_field_user.cooldown == 0) {
              delete character_state.special_effects[_i18].force_field_user;
              var message = "Силовое поле у " + character.name + " снова заряжено.";
              pushToList(message);
            } else {
              character_state.special_effects[_i18].force_field_user.cooldown = character_state.special_effects[_i18].force_field_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("pich_pich_user")) {
            if (character_state.special_effects[_i18].pich_pich_user.cooldown == 0) {
              delete character_state.special_effects[_i18].pich_pich_user;
              var message = "Умение Пыщ-Пыщ у " + character.name + " снова доступно.";
              pushToList(message);
            } else {
              if (character_state.special_effects[_i18].pich_pich_user.cooldown == pich_pich_cooldown) {
                character_state.bonus_action[_i18] = 0;
              }
              character_state.special_effects[_i18].pich_pich_user.cooldown = character_state.special_effects[_i18].pich_pich_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("pich_pich_target")) {
            var extra_actions = character_state.special_effects[_i18].pich_pich_target.extra_actions;
            while (extra_actions > 0) {
              if (extra_actions % 2 == 0) {
                character_state.move_action[_i18] = character_state.move_action[_i18] + adrenaline_move_increase;
              } else {
                character_state.main_action[_i18] = character_state.main_action[_i18] + 1;
              }
              extra_actions = extra_actions - 1;
            }
            delete character_state.special_effects[_i18].pich_pich_target;
          }

          if (character_state.special_effects[_i18].hasOwnProperty("adrenaline_user")) {
            character_state.special_effects[_i18].adrenaline_user.cooldown = character_state.special_effects[_i18].adrenaline_user.cooldown - 1;
            if (character_state.special_effects[_i18].adrenaline_user.cooldown == 0) {
              delete character_state.special_effects[_i18].adrenaline_user;
              var message = "Умение Прилив Адреналина у " + character.name + " снова доступно.";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("aim")) {
            delete character_state.special_effects[_i18].aim;
          }

          if (character_state.special_effects[_i18].hasOwnProperty("charge_user")) {
            if (character_state.special_effects[_i18].charge_user.cooldown == 0) {
              delete character_state.special_effects[_i18].charge_user;
            } else {
              character_state.special_effects[_i18].charge_user.cooldown = character_state.special_effects[_i18].charge_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("cut_limb_user")) {
            if (character_state.special_effects[_i18].cut_limb_user.cooldown == 0) {
              delete character_state.special_effects[_i18].cut_limb_user;
            } else {
              character_state.special_effects[_i18].cut_limb_user.cooldown = character_state.special_effects[_i18].cut_limb_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("poisonous_adrenaline_user")) {
            character_state.special_effects[_i18].poisonous_adrenaline_user.cooldown = character_state.special_effects[_i18].poisonous_adrenaline_user.cooldown - 1;
            if (character_state.special_effects[_i18].poisonous_adrenaline_user.cooldown == 0) {
              delete character_state.special_effects[_i18].poisonous_adrenaline_user;
              var message = "Умение Адреналиновый Потоп у " + character.name + " снова доступно.";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("adrenaline_target")) {
            var minus_actions = character_state.special_effects[_i18].adrenaline_target.minus_actions;
            while (minus_actions > 0) {
              if (minus_actions % 2 == 0) {
                character_state.move_action[_i18] = character_state.move_action[_i18] - adrenaline_move_increase;
              } else {
                character_state.main_action[_i18] = character_state.main_action[_i18] - 1;
              }
              minus_actions = minus_actions - 1;
            }
            delete character_state.special_effects[_i18].adrenaline_target;
          }

          if (character_state.special_effects[_i18].hasOwnProperty("poisonous_adrenaline_target")) {
            var turn = character_state.special_effects[_i18].poisonous_adrenaline_target.turn;
            character_state.special_effects[_i18].poisonous_adrenaline_target.turn = turn + 1;
            var extra_actions = character_state.special_effects[_i18].poisonous_adrenaline_target.extra_actions[turn];
            while (extra_actions > 0) {
              if (extra_actions % 2 == 0) {
                character_state.move_action[_i18] = character_state.move_action[_i18] + adrenaline_move_increase;
              } else {
                character_state.main_action[_i18] = character_state.main_action[_i18] + 1;
              }
              extra_actions = extra_actions - 1;
            }
            if (turn + 1 == poisonous_adrenaline_duration) {
              var character = character_detailed_info[_i18];
              var max_HP = HP_values[character.stamina];
              var max_stamina = stamina_values[character.stamina];
              var HP_cost = poisonous_adrenaline_flat_HP + parseInt(parseFloat(max_HP) * poisonous_adrenaline_percent_HP);
              var stamina_cost = poisonous_adrenaline_flat_stamina + parseInt(parseFloat(max_stamina) * poisonous_adrenaline_percent_stamina);
              character_state.HP[_i18] = character_state.HP[_i18] - HP_cost;
              character_state.stamina[_i18] = character_state.stamina[_i18] - stamina_cost;
              delete character_state.special_effects[_i18].poisonous_adrenaline_target;
              var message = "Адреналин в крови " + character.name + " заканчивается, наступает похмелье (" + HP_cost + " хп и " + stamina_cost + " выносливости)";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("shocked")) {
            if (character_state.special_effects[_i18].shocked.cooldown == 0) {
              character_state.defensive_advantage[_i18] = character_state.defensive_advantage[_i18] + 1;
              delete character_state.special_effects[_i18].shocked;
            } else {
              character_state.special_effects[_i18].shocked.cooldown = character_state.special_effects[_i18].shocked.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("cut_limb")) {
            if (character_state.special_effects[_i18].cut_limb.duration == 0) {
              delete character_state.special_effects[_i18].cut_limb;
              var message = "Сухожилия " + character.name + " восстановились.";
              pushToList(message);
            } else {
              character_state.move_action[_i18] = -10;
              character_state.special_effects[_i18].cut_limb.duration = character_state.special_effects[_i18].cut_limb.duration - 1;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("healed")) {
            if (character_state.special_effects[_i18].healed.cooldown > 0) {
              character_state.move_action[_i18] = character_state.move_action[_i18] / 2;
              character_state.main_action[_i18] = character_state.main_action[_i18] - 1;
              character_state.bonus_action[_i18] = character_state.bonus_action[_i18] - 1;
              character_state.special_effects[_i18].healed.cooldown = character_state.special_effects[_i18].healed.cooldown - 1;
            } else {
              delete character_state.special_effects[_i18].healed;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("blind")) {
            if (character_state.special_effects[_i18].blind.cooldown > 0) {
              character_state.special_effects[_i18].blind.cooldown = character_state.special_effects[_i18].blind.cooldown - 1;
            } else {
              delete character_state.special_effects[_i18].blind;
              character_state.ranged_advantage[_i18] = character_state.ranged_advantage[_i18] + 2;
              character_state.melee_advantage[_i18] = character_state.melee_advantage[_i18] + 1;
              var message = "Зрение " + character.name + " восстановилось";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("Markus_stacks")) {
            character_state.special_effects[_i18].Markus_stacks = character_state.special_effects[_i18].Markus_stacks - 1;
            if (character_state.special_effects[_i18].Markus_stacks == 0) {
              delete character_state.special_effects[_i18].Markus_stacks;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("shield_up")) {
            character_state.move_action[_i18] = Math.ceil(character_state.move_action[_i18] / 2);
            character_state.stamina[_i18] = character_state.stamina[_i18] - character_state.special_effects[_i18].shield_up.stamina_cost;
            var message = character.name + " продолжает держать щит (спасибо)";
            pushToList(message);
          }
          if (character_state.special_effects[_i18].hasOwnProperty("big_bro")) {
            if (character_state.special_effects[_i18].big_bro.cooldown == 0) {
              character_state.bonus_KD[_i18] = character_state.bonus_KD[_i18] - character_state.special_effects[_i18].big_bro.bonus_KD;
              delete character_state.special_effects[_i18].big_bro;
              var message = character.name + " теряет защиту Большого Брата";
              pushToList(message);
            } else {
              character_state.special_effects[_i18].big_bro.cooldown = character_state.special_effects[_i18].big_bro.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("tobacco_strike")) {
            if (character_state.special_effects[_i18].tobacco_strike.cooldown == 0) {
              delete character_state.special_effects[_i18].tobacco_strike;
            } else {
              if (character_state.special_effects[_i18].tobacco_strike.cooldown == tobacco_strike_cooldown) {
                character_state.attack_bonus[_i18] = character_state.attack_bonus[_i18] - tobacco_strike_bonus;
              }
              character_state.special_effects[_i18].tobacco_strike.cooldown = character_state.special_effects[_i18].tobacco_strike.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("acid_bomb_poison")) {
            if (character_state.special_effects[_i18].acid_bomb_poison.duration == 0) {
              character_state.bonus_KD[_i18] = character_state.bonus_KD[_i18] + character_state.special_effects[_i18].acid_bomb_poison.bonus_KD;
              delete character_state.special_effects[_i18].acid_bomb_poison;
              var message = "Броня " + character.name + " наконец восстановилась";
              pushToList(message);
            } else {
              character_state.special_effects[_i18].acid_bomb_poison.duration = character_state.special_effects[_i18].acid_bomb_poison.duration - 1;
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("gas_bomb_poison")) {
            var count = character_state.special_effects[_i18].gas_bomb_poison.poison_level;
            while (count > 0) {
              //character_state.move_action[i] = character_state.move_action[i] - gas_bomb_move_reduction
              if (count % 2 == 1) {
                character_state.main_action[_i18] = character_state.main_action[_i18] - 1;
              } else {
                character_state.bonus_action[_i18] = character_state.bonus_action[_i18] - 1;
              }
              count = count - 1;
            }
            var save_roll = data.save_roll_list[_i18];
            if (save_roll >= character_state.special_effects[_i18].gas_bomb_poison.threshold) {
              character_state.special_effects[_i18].gas_bomb_poison.poison_level = character_state.special_effects[_i18].gas_bomb_poison.poison_level - 1;
              var message = character.name + " успешно кидает спасбросок и уменьшает стадию отравления (теперь " + character_state.special_effects[_i18].gas_bomb_poison.poison_level + ")";
              pushToList(message);
            } else {
              var message = character.name + " проваливает спасбросок. Стадия отравления остается прежней (" + character_state.special_effects[_i18].gas_bomb_poison.poison_level + ")";
              pushToList(message);
            }
            if (character_state.special_effects[_i18].gas_bomb_poison.poison_level <= 0) {
              delete character_state.special_effects[_i18].gas_bomb_poison;
              var message = character.name + " больше не отравлен!";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("meleed")) {
            if (character_state.special_effects[_i18].meleed.cooldown <= 0) {
              delete character_state.special_effects[_i18].meleed;
              character_state.ranged_advantage[_i18] = character_state.ranged_advantage[_i18] + 1;
            } else {
              character_state.special_effects[_i18].meleed.cooldown = character_state.special_effects[_i18].meleed.cooldown - 1;
            }
          }

          if (character.special_type == 'sniper') {
            var effects_object = character_state.special_effects[_i18];
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
              character_state.attack_bonus[_i18] = character_state.attack_bonus[_i18] - current_attack_bonus + new_attack_bonus;
              character_state.damage_bonus[_i18] = character_state.damage_bonus[_i18] - current_damage_bonus + new_damage_bonus;
              character_state.special_effects[_i18].sniper_passive.attack_bonus = new_attack_bonus;
              character_state.special_effects[_i18].sniper_passive.damage_bonus = new_damage_bonus;
            } else {
              var sniper_passive_object = {};
              sniper_passive_object.attack_bonus = 0;
              sniper_passive_object.damage_bonus = 0;
              character_state.special_effects[_i18].sniper_passive = sniper_passive_object;
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
      } else {
        // default including energy and throwing
        var audio = suriken_audio;
      }
      audio.play();

      if (data.user_invisibility_ended == 1) {
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
        for (var _i19 = 0; _i19 < data.mines_detected.length; _i19++) {
          var mine = data.mines_detected[_i19];
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
for (var _i20 = 0; _i20 < CHAT_CASH; _i20++) {
  var current_element = $("<li>");
  current_element.attr('data-name', 'notifications_list_element_' + _i20);
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

var initiative_order_container = $(INITIATIVE_ORDER_CONTANER_SELECTOR);

var skill_modal = $(SKILL_MODAL_SELECTOR);

var skill_description_container = $(SKILL_DESCRIPTION_CONTAINER_SELECTOR);

var skill_modal_content = $(SKILL_MODAL_CONTENT_SELECTOR);

var next_page_button_container = $(NEXT_PAGE_BUTTON_CONTAINER_SELECTOR);

var span = document.getElementById("skill-modal-close");

span.onclick = function () {
  hide_modal();
};

span.style.display = 'none';

window.onclick = function (event) {
  if (event.target.id == skill_modal.attr('id')) {
    hide_modal();
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksbUNBQW1DLHdDQUF2QztBQUNBLElBQUksZ0NBQWdDLHFDQUFwQztBQUNBLElBQUksa0NBQWtDLHVDQUF0QztBQUNBLElBQUkscUNBQXFDLGtEQUF6Qzs7QUFFQSxJQUFJLCtCQUErQixtQ0FBbkM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLGtDQUFrQyxzQ0FBdEM7QUFDQSxJQUFJLHNCQUFzQiwwQkFBMUI7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHlCQUF5Qiw2QkFBN0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7O0FBRUEsSUFBSSx1QkFBdUIsa0NBQTNCO0FBQ0EsSUFBSSw4QkFBOEIsa0NBQWxDOztBQUVBLElBQUksNEJBQTRCLGdDQUFoQztBQUNBLElBQUksMkJBQTJCLCtCQUEvQjs7QUFFQSxJQUFJLDhCQUE4QixrQ0FBbEM7O0FBRUEsSUFBSSx1QkFBdUIsMkJBQTNCO0FBQ0EsSUFBSSwrQkFBK0IsbUNBQW5DO0FBQ0EsSUFBSSx1Q0FBdUMsMkNBQTNDO0FBQ0EsSUFBSSxzQ0FBc0MsMENBQTFDOztBQUVBLElBQUksaUJBQWlCLFNBQVMsTUFBVCxDQUFnQixPQUFoQixDQUF3QixPQUF4QixFQUFpQyxJ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U0FBTCxDQUFlLE9BQWYsQ0FBWjtBQUNELEdBRkQsTUFFTztBQUNMLFNBQUssY0FBTDtBQUNBLDJCQUF1QixpQkFBdkI7QUFDQSxRQUFJLE9BQU8sVUFBUCxLQUFzQixVQUFVLElBQXBDLEVBQTBDO0FBQ3hDLGFBQU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBWjtBQUNELEtBRkQsTUFFTztBQUNMLGNBQVEsR0FBUixDQUFZLDJCQUFaO0FBQ0Q7QUFDRjtBQUNGOztrQkFFYztBQUNiLFlBRGE7QUFFYiwwQ0FGYTtBQUdiLGdEQUhhO0FBSWIsMEJBSmE7QUFLYiw4REFMYTtBQU1iO0FBTmEsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBzb2NrZXQgZnJvbSAnLi93cy1jbGllbnQnO1xyXG5cclxudmFyICQgPSB3aW5kb3cualF1ZXJ5O1xyXG5cclxudmFyIENIQVJBQ1RFUl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIl0nO1xyXG52YXIgV0VBUE9OX0lORk9fQ09OVEFORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIndlYXBvbi1pbmZvLWNvbnRhaW5lclwiXSc7XHJcbnZhciBOT1RJRklDQVRJT05TX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zLWNvbnRhaW5lclwiXSc7XHJcbnZhciBJTklUSUFUSVZFX09SREVSX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJpbml0aWF0aXZlLW9yZGVyLWRpc3BsYXktY29udGFpbmVyXCJdJztcclxuXHJcbnZhciBDUkVBVEVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjcmVhdGVfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIFNBVkVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibG9hZF9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgUk9MTF9JTklUSUFUSVZFX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwicm9sbF9pbml0aWF0aXZlX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJmb2dfYnV0dG9uXCJdJztcclxudmFyIFpPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX2J1dHRvblwiXSc7XHJcbnZhciBDSEFUX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY2hhdF9idXR0b25cIl0nO1xyXG52YXIgTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibWlycm9yX2J1dHRvblwiXSc7XHJcbnZhciBORVhUX1JPVU5EX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibmV4dF9yb3VuZF9idXR0b25cIl0nO1xyXG52YXIgQkFUVExFX01PRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJhdHRsZV9tb2RfYnV0dG9uXCJdJztcclxudmFyIFNZTkNfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzeW5jX2J1dHRvblwiXSc7XHJcbnZhciBMQU5ETUlORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImxhbmRtaW5lX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImZvZ196b25lX2J1dHRvblwiXSc7XHJcbnZhciBVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwidW5mb2dfem9uZV9idXR0b25cIl0nO1xyXG5cclxudmFyIFpPTkVfTlVNQkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX251bWJlcl9zZWxlY3RcIl0nO1xyXG52YXIgU0VBUkNIX01PRElGSUNBVE9SX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzZWFyY2hfbW9kaWZpY2F0b3JcIl0nO1xyXG5cclxudmFyIEJPQVJEX1NJWkVfSU5QVVRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJvYXJkX3NpemVfaW5wdXRcIl0nO1xyXG52YXIgU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX25hbWVfaW5wdXRcIl0nO1xyXG5cclxudmFyIE5PVElGSUNBVElPTlNfTElTVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0XCJdJztcclxuXHJcbnZhciBTS0lMTF9NT0RBTF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2tpbGwtbW9kYWxcIl0nO1xyXG52YXIgU0tJTExfTU9EQUxfQ09OVEVOVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2tpbGwtbW9kYWwtY29udGVudFwiXSc7XHJcbnZhciBTS0lMTF9ERVNDUklQVElPTl9DT05UQUlORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNraWxsLWRlc2NyaXB0aW9uLWNvbnRhaW5lclwiXSc7XHJcbnZhciBORVhUX1BBR0VfQlVUVE9OX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibmV4dC1wYWdlLWJ1dHRvbi1jb250YWluZXJcIl0nO1xyXG5cclxudmFyIFNFUlZFUl9BRERSRVNTID0gbG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoL15odHRwLywgJ3dzJyk7XHJcblxyXG52YXIgbXlfbmFtZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKSk7XHJcbnZhciBteV9yb2xlID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3JvbGUnKSk7XHJcbnZhciBteV9yb29tID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdyb29tX251bWJlcicpKTtcclxuXHJcbnZhciBjaGFyYWN0ZXJfbGlzdCA9IFtdO1xyXG52YXIgZ3JvdXBfbGlzdCA9IFtdO1xyXG52YXIgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIG9ic3RhY2xlX2xpc3QgPSBbXTtcclxudmFyIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIHdlYXBvbl9saXN0ID0gW107XHJcbnZhciB3ZWFwb25fZGV0YWlsZWRfaW5mbyA9IFtdO1xyXG52YXIgc2tpbGxfbGlzdCA9IFtdO1xyXG52YXIgc2tpbGxfZGV0YWlsZWRfaW5mbztcclxuXHJcbnZhciBUSU5ZX0VGRkVDVF9DTEFTUyA9ICdpcy10aW55JztcclxuXHJcbnZhciBFTVBUWV9DRUxMX1BJQyA9IFwiLi9pbWFnZXMvc3F1YXJlLmpwZ1wiO1xyXG52YXIgWk9ORV9FTkRQT0lOVF9QSUMgPSBcIi4vaW1hZ2VzL3JlZF9jcm9zcy5qcGdcIlxyXG52YXIgRk9HX0lNQUdFID0gXCIuL2ltYWdlcy9mb2cud2VicFwiO1xyXG52YXIgUVVFU1RJT05fSU1BR0UgPSBcIi4vaW1hZ2VzL3F1ZXN0aW9uLmpwZ1wiO1xyXG52YXIgSU5WSVNFX0lNQUdFID0gXCIuL2ltYWdlcy96b3Jyb19tYXNrLmpwZWdcIjtcclxudmFyIEFJTV9JTUFHRSA9IFwiLi9pbWFnZXMvYWltLmpwZ1wiO1xyXG52YXIgUklHSFRfQVJST1dfSU1BR0UgPSBcIi4vaW1hZ2VzL3JpZ2h0X2Fycm93LnBuZ1wiO1xyXG5cclxudmFyIE1BWF9aT05FUyA9IDI1O1xyXG52YXIgQ0hBVF9DQVNIID0gMTU7XHJcblxyXG52YXIgc3RhbWluYV93ZWFrc3BvdF9jb3N0ID0gMVxyXG52YXIgc3RhbWluYV9tb3ZlX2Nvc3QgPSAwXHJcbnZhciBzdGFtaW5hX2F0dGFja19jb3N0ID0gMVxyXG52YXIgcHVuY2hfcmFpbmZhbGxfc3RhbWluYV9jb3N0ID0gMiAvLyBwZXIgcHVuY2hcclxudmFyIHN0YW1pbmFfY3V0X2xpbWJfY29zdCA9IDRcclxudmFyIHNoaWVsZF91cF9zdGFtaW5hX2Nvc3QgPSAyIC8vIHBlciBtb3ZlIEkgdGhpbmtcclxudmFyIGxvdHRlcnlfc2hvdF9zdGFtaW5hX2Nvc3QgPSAxXHJcbnZhciBsdWNreV9zaG90X3N0YW1pbmFfY29zdCA9IDFcclxudmFyIGFjdGlvbl9zcGxhc2hfc3RhbWluYV9jb3N0ID0gMlxyXG52YXIgYWRyZW5hbGluZV9zdGFtaW5hX2Nvc3QgPSAzXHJcbnZhciBhY2lkX2JvbWJfc3RhbWluYV9jb3N0ID0gM1xyXG52YXIgY3VydmVkX2J1bGxldHNfc3RhbWluYV9jb3N0ID0gMlxyXG5cclxudmFyIGN1dF9saW1iX2Nvb2xkb3duID0gMVxyXG5cclxudmFyIHJlc3Rfc3RhbWluYV9nYWluID0gNVxyXG5cclxudmFyIGN1dF9saW1iX2R1cmF0aW9uID0gMVxyXG52YXIgY29vbGRvd25fYmlnX2JybyA9IDEgLy8gZHVyYXRpb25cclxuXHJcbnZhciBzaGllbGRfdXBfS0QgPSAzXHJcblxyXG52YXIgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlID0gNFxyXG52YXIgY2hhcmdlX21vdmVfaW5jcmVhc2UgPSA0XHJcblxyXG52YXIgZ2FzX2JvbWJfdGhyZXNob2xkID0gMTFcclxudmFyIGdhc19ib21iX21vdmVfcmVkdWN0aW9uID0gMlxyXG52YXIgZ2FzX2JvbWJfc3RhbWluYV9jb3N0ID0gM1xyXG52YXIgZ2FzX2JvbWJfb2JzdGFjbGUgPSAxNVxyXG52YXIgZ2FzX2JvbWJfc2tpbGxfY29vbGRvd24gPSA1XHJcblxyXG52YXIgbGlnaHRfc291bmRfYm9tYl9yYWRpdXMgPSA0XHJcbnZhciBsaWdodF9zb3VuZF9ib21iX3RocmVzaG9sZCA9IDE1XHJcbnZhciBsaWdodF9zb3VuZF9ib21iX3NraWxsX2Nvb2xkb3duID0gNVxyXG5cclxudmFyIHdlYWtfc3BvdF90aHJlc2hvbGQgPSAxNVxyXG5cclxudmFyIHNob2NrZWRfY29vbGRvd24gPSAwXHJcblxyXG52YXIgcGljaF9waWNoX2Nvb2xkb3duID0gNFxyXG52YXIgcGljaF9waWNoX21vdmVfaW5jcmVhc2UgPSA0XHJcblxyXG52YXIgZm9yY2VfZmllbGRfcmFkaXVzID0gMS42XHJcbnZhciBmb3JjZV9maWVsZF9zdGFtaW5hX2Nvc3QgPSA1XHJcbnZhciBmb3JjZV9maWVsZF9jb29sZG93biA9IDEwXHJcbnZhciBmb3JjZV9maWVsZF9vYnN0YWNsZSA9IDI0XHJcblxyXG52YXIgYWN0aW9uX3NwbGFzaF9jb29sZG93biA9IDRcclxuXHJcbnZhciBpbnZpc2liaWxpdHlfZGV0ZWN0aW9uX3JhZGl1cyA9IDI7XHJcblxyXG52YXIgYmlnX2Jyb19yYW5nZSA9IDJcclxudmFyIGhlYWxfcmFuZ2UgPSAxXHJcbnZhciB0aHJvd19iYXNlX3JhbmdlID0gMlxyXG52YXIgbGlnaHRfc291bmRfYm9tYl9yYW5nZSA9IDVcclxudmFyIGZvcmNlX2ZpZWxkX3JhbmdlID0gMVxyXG52YXIgYWRyZW5hbGluZV9yYW5nZSA9IDFcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX3JhbmdlID0gMVxyXG5cclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX2R1cmF0aW9uID0gMlxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfY29vbGRvd24gPSA1XHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9mbGF0X0hQID0gNVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfZmxhdF9zdGFtaW5hID0gNVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfcGVyY2VudF9IUCA9IDAuMDVcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX3BlcmNlbnRfc3RhbWluYSA9IDAuMDVcclxuXHJcbnZhciBhZHJlbmFsaW5lX2Nvb2xkb3duID0gM1xyXG5cclxudmFyIGFjaWRfYm9tYl9kdXJhdGlvbiA9IDIgLy8gMisxIHJlYWxseVxyXG52YXIgYWNpZF9ib21iX2Nvb2xkb3duID0gNVxyXG52YXIgYWNpZF9ib21iX3JhZGl1cyA9IDEuNlxyXG5cclxudmFyIG1pbmVzXzBfZGlzdGFuY2VfZGFtYWdlID0gMjBcclxudmFyIG1pbmVzXzFfZGlzdGFuY2VfZGFtYWdlID0gMTVcclxudmFyIG1pbmVzXzFwNV9kaXN0YW5jZV9kYW1hZ2UgPSAxMFxyXG52YXIgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cyA9IDIuOVxyXG52YXIgbGFuZG1pbmVfZGlmZnVzZV90aHJlc2hvbGQgPSAxMFxyXG5cclxudmFyIHRvYmFjY29fc3RyaWtlX2hwX3BlcmNlbnRhZ2UgPSAwLjFcclxudmFyIHRvYmFjY29fc3RyaWtlX2JvbnVzID0gNFxyXG52YXIgdG9iYWNjb19zdHJpa2VfY29vbGRvd24gPSAxXHJcblxyXG4vLyBUaGlzIGlzIGEgY29uc3RhbnQsIHdpbGwgYmUgbW92ZWQgdG8gZGF0YWJhc2UgbGF0ZXJcclxuY29uc3QgSFBfdmFsdWVzID0gWzE1LCAzMCwgNDAsIDU1LCA3NSwgMTAwLCAxMzAsIDE2NSwgMjA1LCAyNTAsIDMwMCwgMzU1LCA0MTVdO1xyXG5jb25zdCBzdGFtaW5hX3ZhbHVlcyA9IFszMCwgNDUsIDYwLCA3NSwgOTAsIDEwNSwgMTIwLCAxMzUsIDE1MCwgMTY1LCAxODAsIDE5NV07XHJcbmNvbnN0IHN0cmVuZ3RoX2RhbWFnZV9tYXAgPSBbLTIsIDAsIDEsIDMsIDYsIDEwLCAxNSwgMjEsIDI4LCAzNiwgNDUsIDU1XVxyXG5jb25zdCBtb3ZlX2FjdGlvbl9tYXAgPSBbMSwgMywgNCwgNiwgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNV1cclxuY29uc3QgYm9udXNfYWN0aW9uX21hcD0gWzAsIDEsIDEsIDIsIDIsIDIsIDIsIDIsIDMsIDMsIDMsIDNdXHJcbmNvbnN0IG1haW5fYWN0aW9uX21hcCA9IFsxLCAxLCAxLCAxLCAxLCAxLCAyLCAyLCAyLCAyLCAyLCAzXVxyXG5cclxudmFyIENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVCA9IHtIUDogW10sIG1haW5fYWN0aW9uOiBbXSwgYm9udXNfYWN0aW9uOiBbXSwgbW92ZV9hY3Rpb246IFtdLCBzdGFtaW5hOiBbXSwgaW5pdGlhdGl2ZTogW10sIGNhbl9ldmFkZTogW10sIGhhc19tb3ZlZDogW10sIEtEX3BvaW50czogW10sIGN1cnJlbnRfd2VhcG9uOiBbXSwgdmlzaWJpbGl0eTogW10sIGludmlzaWJpbGl0eTogW10sIGF0dGFja19ib251czogW10sIGRhbWFnZV9ib251czogW10sIHVuaXZlcnNhbF9ib251czogW10sIGJvbnVzX0tEOiBbXSwgc3BlY2lhbF9lZmZlY3RzOiBbXSwgcmFuZ2VkX2FkdmFudGFnZTogW10sIG1lbGVlX2FkdmFudGFnZTogW10sIGRlZmVuc2l2ZV9hZHZhbnRhZ2U6IFtdLCBwb3NpdGlvbjogW10sIGV2YWRlX2JvbnVzOiBbXSwgbWVsZWVfcmVzaXN0OiBbXSwgYnVsbGV0X3Jlc2lzdDogW119O1xyXG5sZXQgZ2FtZV9zdGF0ZSA9IHtib2FyZF9zdGF0ZTogW10sIGZvZ19zdGF0ZTogW10sIHpvbmVfc3RhdGU6IFtdLCBzaXplOiAwLCBzZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGU6IFtdLCB0ZXJyYWluX2VmZmVjdHM6IFtdLCBiYXR0bGVfbW9kOiAwLCBsYW5kbWluZXM6IHtwb3NpdGlvbnM6IFtdLCBrbm93ZXJzOiBbXX19O1xyXG5sZXQgY2hhcmFjdGVyX3N0YXRlID0gQ0hBUkFDVEVSX1NUQVRFX0NPTlNUQU5UO1xyXG5cclxubGV0IGdtX2NvbnRyb2xfbW9kID0gMDsgLy8gbm9ybWFsIG1vZGVcclxuXHJcbi8vIGluX3Byb2Nlc3M6IDAgPSBub3RoaW5nLCAxID0gbW92ZSwgMiA9IGF0dGFjaywgMyA9IHNraWxsXHJcbmxldCBjaGFyYWN0ZXJfY2hvc2VuID0ge2luX3Byb2Nlc3M6IDAsIGNoYXJfaWQ6IDAsIGNoYXJfcG9zaXRpb246IDAsIHdlYXBvbl9pZDogMCwgc2tpbGxfaWQ6IDAsIGNlbGw6IDB9O1xyXG5cclxubGV0IGxhc3Rfb2JzdGFjbGUgPSAxO1xyXG5sZXQgem9uZV9lbmRwb2ludCA9IHtpbmRleDogLTEsIGNlbGw6IDB9XHJcblxyXG52YXIgZ3Vuc2hvdF9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL2d1bnNob3QubXAzJyk7XHJcbnZhciBzd29yZF9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL3N3b3JkLndhdicpO1xyXG52YXIgZXhwbG9zaW9uX2F1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvZXhwbG9zaW9uLm1wMycpO1xyXG52YXIgc3VyaWtlbl9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL3N1cmlrZW4ubXAzJyk7XHJcblxyXG5ndW5zaG90X2F1ZGlvLnZvbHVtZSA9IDAuMlxyXG5zd29yZF9hdWRpby52b2x1bWUgPSAwLjJcclxuc3VyaWtlbl9hdWRpby52b2x1bWUgPSAwLjJcclxuZXhwbG9zaW9uX2F1ZGlvLnZvbHVtZSA9IDAuMlxyXG5cclxuZnVuY3Rpb24gcmVjb25uZWN0KCkge1xyXG4gIGlmICghc29ja2V0LmlzUmVhZHkoKSkge1xyXG4gICAgc29ja2V0LmluaXQoU0VSVkVSX0FERFJFU1MpO1xyXG4gICAgc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0KCk7XHJcbiAgICBjb25zb2xlLmxvZygnSG9wZWZ1bGx5IHJlY29ubmVjdGVkIChwcmF5KScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnV2FzIG9ubGluZSBhbnl3YXknKTtcclxuICB9XHJcbn1cclxuXHJcbi8vINCh0L7Qt9C00LDQvdC40LUg0LTQvtGB0LrQuCwgb25jbGljayDQutC70LXRgtC+0LosIHNhdmUvbG9hZFxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XHJcbiAgZ2FtZV9zdGF0ZS5zaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZF9zaXplXCIpLnZhbHVlO1xyXG4gIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLmZvZ19zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuem9uZV9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUgKiBnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG4gICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGUucHVzaCgwKTtcclxuICB9XHJcbiAgc2VuZF9jb25zdHJ1Y3RfY29tbWFuZChnYW1lX3N0YXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEJvYXJkKCkge1xyXG4gIHZhciBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfbmFtZVwiKS52YWx1ZTtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnbG9hZF9nYW1lJztcclxuICB0b1NlbmQuc2F2ZV9uYW1lID0gbmFtZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlQm9hcmQoKSB7XHJcbiAgdmFyIHNhdmVfbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwX25hbWVcIikudmFsdWU7XHJcbiAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IHtcclxuICAgIGdhbWVfc3RhdGU6IGdhbWVfc3RhdGUsXHJcbiAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbzogY2hhcmFjdGVyX2RldGFpbGVkX2luZm8sXHJcbiAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvOiBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvLFxyXG4gICAgY2hhcmFjdGVyX3N0YXRlOiBjaGFyYWN0ZXJfc3RhdGVcclxuICB9O1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2F2ZV9nYW1lJztcclxuICB0b1NlbmQuc2F2ZV9uYW1lID0gc2F2ZV9uYW1lO1xyXG4gIHRvU2VuZC5mdWxsX2dhbWVfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGU7XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZF9jb25zdHJ1Y3RfY29tbWFuZChuZXdfZ2FtZV9zdGF0ZSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdjb25zdHJ1Y3RfYm9hcmQnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmdhbWVfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29uc3RydWN0X2JvYXJkKG5ld19nYW1lX3N0YXRlKSB7XHJcbiAgZ2FtZV9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlXHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBib2FyZF9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkLWNvbnRhaW5lclwiKTtcclxuICBib2FyZF9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICB2YXIgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XHJcbiAgYm9hcmQuY2xhc3NOYW1lID0gXCJib2FyZFwiO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICB2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG4gICAgcm93LmNsYXNzTmFtZSA9IFwiYm9hcmRfcm93XCI7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVfc3RhdGUuc2l6ZTsgaisrKSB7XHJcbiAgICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gICAgICB2YXIgY2VsbF9pZCA9IGkgKiBnYW1lX3N0YXRlLnNpemUgKyBqO1xyXG4gICAgICBidXR0b24uaWQgPSBcImNlbGxfXCIgKyBjZWxsX2lkO1xyXG4gICAgICBidXR0b24ucm93ID0gaTtcclxuICAgICAgYnV0dG9uLmNvbHVtbiA9IGo7XHJcbiAgICAgIHZhciBpbWFnZV9uYW1lID0gZm9nT3JQaWMoY2VsbF9pZCk7XHJcbiAgICAgIGJ1dHRvbi5zcmMgPSBpbWFnZV9uYW1lO1xyXG4gICAgICBidXR0b24uc3R5bGUud2lkdGggPSAnNTBweCc7XHJcbiAgICAgIGJ1dHRvbi5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XHJcbiAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAnYm9hcmRfY2VsbCc7XHJcbiAgICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICB2YXIgaW5kZXggPSBjZWxsLnJvdyAqIGdhbWVfc3RhdGUuc2l6ZSArIGNlbGwuY29sdW1uO1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgIHNoaWZ0X29uY2xpY2soaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgICBjdHJsX29uY2xpY2soaW5kZXgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vX3NoaWZ0X29uY2xpY2sobXlfcm9sZSwgZ21fY29udHJvbF9tb2QsIGdhbWVfc3RhdGUsIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcywgY2VsbCwgaW5kZXgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuICAgICAgdmFyIGNlbGxfd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuICAgICAgY2VsbF93cmFwLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgIGNlbGxfd3JhcC5jbGFzc05hbWUgPSBcImNlbGxfd3JhcFwiO1xyXG5cclxuICAgICAgdmFyIHpvbmVfdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIHpvbmVfdGV4dC5pZCA9IFwiem9uZV90ZXh0X1wiICsgY2VsbF9pZDtcclxuICAgICAgem9uZV90ZXh0LmNsYXNzTmFtZSA9IFwiem9uZV90ZXh0XCI7XHJcbiAgICAgIGNlbGxfd3JhcC5hcHBlbmRDaGlsZCh6b25lX3RleHQpO1xyXG5cclxuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGxfd3JhcCk7XHJcbiAgICB9XHJcbiAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xyXG4gIH1cclxuICBib2FyZF9jb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBub19zaGlmdF9vbmNsaWNrKG15X3JvbGUsIGdtX2NvbnRyb2xfbW9kLCBnYW1lX3N0YXRlLCBmaWVsZF9jaG9zZW4sIGNlbGwsIGluZGV4KSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgLy8gZ20gc2lkZVxyXG4gICAgaWYgKGdtX2NvbnRyb2xfbW9kID09IDApIHtcclxuICAgICAgLy8gd2UgYXJlIGluIG5vcm1hbCBhZGQvbW92ZSBkZWxldGUgbW9kZVxyXG4gICAgICBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIG15X3JvbGUpO1xyXG4gICAgfSBlbHNlIGlmIChnbV9jb250cm9sX21vZCA9PSAxKSB7XHJcbiAgICAgIC8vIHdlIGFyZSBpbiBmb2cgbW9kZVxyXG4gICAgICBhcHBseUZvZyhpbmRleCwgY2VsbCk7XHJcbiAgICB9IGVsc2UgaWYgKGdtX2NvbnRyb2xfbW9kID09IDIpIHtcclxuICAgICAgLy8gd2UgYXJlIGluIHpvbmVzIG1vZGVcclxuICAgICAgYXNzaWduWm9uZShpbmRleCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIHBsYXllciBzaWRlXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDEpIHtcclxuICAgICAgLy8gY2xpY2tlZCBmb2dcclxuICAgICAgaWYgKGZpZWxkX2Nob3NlbiA9PSAxKSB7XHJcbiAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIGZvZyBkZXRlY3RlZCcpO1xyXG4gICAgICAgIGRpc3BsYXlGb2coKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCBteV9yb2xlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNoaWZ0X29uY2xpY2soaW5kZXgsIGNlbGwpIHtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICBpZiAoZ21fY29udHJvbF9tb2QgPT0gMikge1xyXG4gICAgICBpZiAoem9uZV9lbmRwb2ludC5pbmRleCA8IDApIHtcclxuICAgICAgICB6b25lX2VuZHBvaW50LmluZGV4ID0gaW5kZXhcclxuICAgICAgICB6b25lX2VuZHBvaW50LmNlbGwgPSBjZWxsXHJcbiAgICAgICAgY2VsbC5zcmMgPSBaT05FX0VORFBPSU5UX1BJQ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVuZHBvaW50X2Fzc2lnbl96b25lKGluZGV4LCB6b25lX2VuZHBvaW50LmluZGV4KVxyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQ1xyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuaW5kZXggPSAtMVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9vYnN0YWNsZSc7XHJcbiAgICAgIHRvU2VuZC5jZWxsX2lkID0gaW5kZXg7XHJcbiAgICAgIHRvU2VuZC5vYnN0YWNsZV9udW1iZXIgPSBsYXN0X29ic3RhY2xlO1xyXG4gICAgICB0b1NlbmQub2JzdGFjbGVfbmFtZSA9IG9ic3RhY2xlX2xpc3RbbGFzdF9vYnN0YWNsZSAtIDFdO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGN0cmxfb25jbGljayhpbmRleCkge1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIHZhciBmb2dfdmFsdWUgPSBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF1cclxuICAgIHZhciBtb2QgPSAxIC0gZm9nX3ZhbHVlXHJcbiAgICB2YXIgem9uZSA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF1cclxuICAgIGZvZ1BhcnNlWm9uZShtb2QsIHpvbmUpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIHJvbGUpIHtcclxuXHRpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gPT0gMCkgeyAvLyBlbXB0eSBjZWxsIGNsaWNrZWRcclxuXHJcbiAgICBzd2l0Y2goY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzKSB7XHJcbiAgICAgIGNhc2UgMDogLy8gbm90aGluZ1xyXG4gICAgICAgIGlmIChyb2xlID09ICdnbScpIHtcclxuICAgICAgICAgIGFkZF9vYmplY3QoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxOiAvLyBtb3ZlXHJcbiAgICAgICAgbW92ZV9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6IC8vYXR0YWNrXHJcbiAgICAgICAgc3RvcF9hdHRhY2soKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6IC8vc2tpbGxcclxuICAgICAgICBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVzb2x2aW5nIG9uX2NsaWNrIGVtcHR5XCIpXHJcbiAgICB9XHJcblxyXG5cdH0gZWxzZSBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gPiAwKSB7IC8vIGNoYXJhY3RlciBjbGlja2VkXHJcbiAgICBzd2l0Y2goY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzKSB7XHJcbiAgICAgIGNhc2UgMDogLy8gbm90aGluZ1xyXG4gICAgICAgIHNlbGVjdF9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6IC8vIG1vdmVcclxuICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6IC8vYXR0YWNrXHJcbiAgICAgICAgcGVyZm9ybV9hdHRhY2soaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzogLy9za2lsbFxyXG4gICAgICAgIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXNvbHZpbmcgb25fY2xpY2sgY2hhcmFjdGVyXCIpXHJcbiAgICB9XHJcblxyXG5cdH0gZWxzZSB7IC8vIG9ic3RhY2xlIGNsaWNrZWRcclxuXHJcbiAgICBzd2l0Y2goY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzKSB7XHJcbiAgICAgIGNhc2UgMDogLy8gbm90aGluZ1xyXG4gICAgICAgIHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTogLy8gbW92ZVxyXG4gICAgICAgIHVuZG9fc2VsZWN0aW9uKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjogLy9hdHRhY2tcclxuICAgICAgICBzdG9wX2F0dGFjaygpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzogLy9za2lsbFxyXG4gICAgICAgIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXNvbHZpbmcgb25fY2xpY2sgb2JzdGFjbGVcIilcclxuICAgIH1cclxuXHJcblx0fVxyXG59XHJcblxyXG4vLyBab25lL2ZvZyByZWxhdGVkIHN0YWZmXHJcblxyXG5mdW5jdGlvbiBlbmRwb2ludF9hc3NpZ25fem9uZShlbmRwb2ludDEsIGVuZHBvaW50Mikge1xyXG4gIHZhciB6b25lX251bWJlciA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICB2YXIgbW9kaWZpY2F0b3IgPSBzZWFyY2hfbW9kaWZpY2F0b3IudmFsKCk7XHJcbiAgdmFyIHNpemUgPSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIGluZGV4X2xpc3QgPSBbXVxyXG5cclxuICB2YXIgY29vcmQxID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQxLCBzaXplKVxyXG4gIHZhciBjb29yZDIgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDIsIHNpemUpXHJcblxyXG4gIHZhciB0b3BfbGVmdCA9IHRvcF9sZWZ0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKVxyXG4gIHZhciBib3R0b21fcmlnaHQgPSBib3R0b21fcmlnaHRfY29vcmQoY29vcmQxLCBjb29yZDIpXHJcblxyXG4gIGZvciAobGV0IGkgPSB0b3BfbGVmdC54OyBpIDw9IGJvdHRvbV9yaWdodC54OyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSB0b3BfbGVmdC55OyBqIDw9IGJvdHRvbV9yaWdodC55OyBqKyspIHtcclxuICAgICAgdmFyIGNvb3JkID0ge31cclxuICAgICAgY29vcmQueCA9IGlcclxuICAgICAgY29vcmQueSA9IGpcclxuICAgICAgdmFyIGluZGV4ID0gY29vcmRfdG9faW5kZXgoY29vcmQsIHNpemUpXHJcblxyXG4gICAgICBpbmRleF9saXN0LnB1c2goaW5kZXgpXHJcbiAgICAgIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9uZV90ZXh0XycgKyBpbmRleCk7XHJcbiAgICAgIHpvbmVfdGV4dC5pbm5lckhUTUwgPSB6b25lX251bWJlciArICcoJyArIG1vZGlmaWNhdG9yICsgJyknO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2Fzc2lnbl96b25lJztcclxuICB0b1NlbmQuem9uZV9udW1iZXIgPSB6b25lX251bWJlcjtcclxuICB0b1NlbmQuaW5kZXhfbGlzdCA9IGluZGV4X2xpc3Q7XHJcbiAgdG9TZW5kLm1vZGlmaWNhdG9yID0gbW9kaWZpY2F0b3I7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduWm9uZShpbmRleCkge1xyXG4gIHZhciB6b25lX251bWJlciA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICB2YXIgbW9kaWZpY2F0b3IgPSBzZWFyY2hfbW9kaWZpY2F0b3IudmFsKCk7XHJcblxyXG4gIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9uZV90ZXh0XycgKyBpbmRleCk7XHJcbiAgem9uZV90ZXh0LmlubmVySFRNTCA9IHpvbmVfbnVtYmVyICsgJygnICsgbW9kaWZpY2F0b3IgKyAnKSc7XHJcblxyXG4gIHZhciBpbmRleF9saXN0ID0gW11cclxuICBpbmRleF9saXN0LnB1c2goaW5kZXgpXHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhc3NpZ25fem9uZSc7XHJcbiAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgdG9TZW5kLmluZGV4X2xpc3QgPSBpbmRleF9saXN0O1xyXG4gIHRvU2VuZC5tb2RpZmljYXRvciA9IG1vZGlmaWNhdG9yO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5Rm9nKGluZGV4LCBjZWxsKSB7XHJcblx0aWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9PSAxKSB7XHJcblx0XHQvLyBzZW5kIHVwZGF0ZSBtZXNzYWdlXHJcblx0XHR2YXIgdG9TZW5kID0ge307XHJcblx0XHR0b1NlbmQuY29tbWFuZCA9ICd1cGRhdGVfZm9nJztcclxuXHRcdHRvU2VuZC51cGRhdGVfdHlwZSA9ICdyZW1vdmUnO1xyXG5cdFx0dG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG5cdFx0c29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIHNlbmQgdXBkYXRlIG1lc3NhZ2VcclxuXHRcdHZhciB0b1NlbmQgPSB7fTtcclxuXHRcdHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG5cdFx0dG9TZW5kLnVwZGF0ZV90eXBlID0gJ2FkZCc7XHJcblx0XHR0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblx0XHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ01vZGVDaGFuZ2UoKSB7XHJcbiAgaWYgKGdtX2NvbnRyb2xfbW9kICE9IDEpIHtcclxuICAgIC8vIHR1cm4gb24gZm9nIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDE7XHJcbiAgICBmb2dfYnV0dG9uLnRleHQoJ9CS0YvQutC7INCi0YPQvNCw0L0g0JLQvtC50L3RiycpO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2ldID09IDEpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF9jZWxsLnNyYyA9IEZPR19JTUFHRTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyB0dXJuIG9mZiBmb2cgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMDtcclxuICAgIGZvZ19idXR0b24udGV4dCgn0JLQutC7INCi0YPQvNCw0L0g0JLQvtC50L3RiycpO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2ldID09IDEpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF9jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gem9uZU1vZGVDaGFuZ2UoKSB7XHJcbiAgaWYgKGdtX2NvbnRyb2xfbW9kICE9IDIpIHtcclxuICAgIC8vIHR1cm4gb24gem9uZSBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAyO1xyXG4gICAgem9uZV9idXR0b24udGV4dCgn0JLRi9C60Lsg0JfQvtC90LDQu9GM0L3Ri9C5INGA0LXQttC40LwnKTtcclxuICAgIHpvbmVfbnVtYmVyX3NlbGVjdC5zaG93KCk7XHJcbiAgICBmb2dfem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgdW5mb2dfem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgc2VhcmNoX21vZGlmaWNhdG9yLnNob3coKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRpZiAoZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldID4gMCkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X3pvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uZV90ZXh0X1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF96b25lX3RleHQuaW5uZXJIVE1MID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldICsgJygnICsgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaV0gKyAnKSc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gYmFjayB0byBub3JtYWwgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAwO1xyXG4gICAgem9uZV9idXR0b24udGV4dCgn0JLQutC7INCX0L7QvdCw0LvRjNC90YvQuSDRgNC10LbQuNC8Jyk7XHJcbiAgICB6b25lX251bWJlcl9zZWxlY3QuaGlkZSgpO1xyXG4gICAgZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuICAgIHVuZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuICAgIHNlYXJjaF9tb2RpZmljYXRvci5oaWRlKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF96b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmVfdGV4dF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfem9uZV90ZXh0LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0fVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9nQ3VycmVudFpvbmUoKSB7XHJcbiAgdmFyIGN1cnJlbnRfem9uZSA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICBmb2dQYXJzZVpvbmUoMSwgY3VycmVudF96b25lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5mb2dDdXJyZW50Wm9uZSgpIHtcclxuICBmb2dQYXJzZVpvbmUoMCwgY3VycmVudF96b25lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9nUGFyc2Vab25lKG1vZCwgY3VycmVudF96b25lKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgaWYgKG1vZCA9PSAwKSB7XHJcbiAgICB0b1NlbmQudXBkYXRlX3R5cGUgPSAncmVtb3ZlJztcclxuICB9IGVsc2UgaWYgKG1vZCA9PSAxKSB7XHJcbiAgICB0b1NlbmQudXBkYXRlX3R5cGUgPSAnYWRkJztcclxuICB9XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUgKiBnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG4gICAgaWYgKGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpXSA9PSBjdXJyZW50X3pvbmUpIHtcclxuICAgICAgdG9TZW5kLmluZGV4ID0gaTtcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBIZWxwZXIgY29vcmRpbmF0ZSByZWxhdGVkIGZ1bmN0aW9uc1xyXG5cclxuZnVuY3Rpb24gdG9wX2xlZnRfY29vcmQoY29vcmQxLCBjb29yZDIpIHtcclxuICB2YXIgdG9SZXQgPSB7fVxyXG4gIHRvUmV0LnggPSBNYXRoLm1pbihjb29yZDEueCwgY29vcmQyLngpXHJcbiAgdG9SZXQueSA9IE1hdGgubWluKGNvb3JkMS55LCBjb29yZDIueSlcclxuICByZXR1cm4gdG9SZXRcclxufVxyXG5cclxuZnVuY3Rpb24gYm90dG9tX3JpZ2h0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKSB7XHJcbiAgdmFyIHRvUmV0ID0ge31cclxuICB0b1JldC54ID0gTWF0aC5tYXgoY29vcmQxLngsIGNvb3JkMi54KVxyXG4gIHRvUmV0LnkgPSBNYXRoLm1heChjb29yZDEueSwgY29vcmQyLnkpXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvb3JkX3RvX2luZGV4KGNvb3JkLCBzaXplKSB7XHJcbiAgdmFyIGluZGV4ID0gY29vcmQueCAqIHNpemUgKyBjb29yZC55XHJcbiAgcmV0dXJuIGluZGV4XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluZGV4X3RvX2Nvb3JkaW5hdGVzKGluZGV4LCBzaXplKSB7XHJcbiAgdmFyIHRvUmV0ID0ge31cclxuICB0b1JldC54ID0gTWF0aC5mbG9vcihpbmRleC9zaXplKVxyXG4gIHRvUmV0LnkgPSBpbmRleCAlIHNpemVcclxuICByZXR1cm4gdG9SZXRcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZERpc3RhbmNlKGluZGV4MSwgaW5kZXgyKSB7XHJcbiAgdmFyIHgxID0gTWF0aC5mbG9vcihpbmRleDEvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MSA9IGluZGV4MSAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgeDIgPSBNYXRoLmZsb29yKGluZGV4Mi9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkyID0gaW5kZXgyICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciBkaXN0YW5jZV9zcXVhcmVkID0gKHgxLXgyKSooeDEteDIpICsgKHkxLXkyKSooeTEteTIpXHJcbiAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KGRpc3RhbmNlX3NxdWFyZWQpXHJcbiAgcmV0dXJuIHBhcnNlRmxvYXQoZGlzdGFuY2UpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzSW5SYW5nZShpbmRleDEsIGluZGV4MiwgcmFuZ2UpIHtcclxuICB2YXIgeDEgPSBNYXRoLmZsb29yKGluZGV4MS9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkxID0gaW5kZXgxICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciB4MiA9IE1hdGguZmxvb3IoaW5kZXgyL2dhbWVfc3RhdGUuc2l6ZSlcclxuICB2YXIgeTIgPSBpbmRleDIgJSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIGRpc3RhbmNlID0gKHgxLXgyKSooeDEteDIpICsgKHkxLXkyKSooeTEteTIpXHJcbiAgcmV0dXJuIGRpc3RhbmNlIDw9IHJhbmdlKnJhbmdlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluZGV4X2luX3JhZGl1cyhpbmRleCwgcmFuZ2UpIHtcclxuICB2YXIgc2l6ZSA9IGdhbWVfc3RhdGUuc2l6ZVxyXG4gIHZhciB4ID0gTWF0aC5mbG9vcihpbmRleC9zaXplKVxyXG4gIHZhciB5ID0gaW5kZXggJSBzaXplXHJcbiAgdmFyIGNhbmRpZGF0ZV9pbmRleF9saXN0ID0gW11cclxuXHJcbiAgLy9jb25zb2xlLmxvZyhcIng6IFwiICsgeCArIFwiIHk6IFwiICsgeSArIFwiIGluZGV4OiBcIiArIGluZGV4KVxyXG5cclxuICBmb3IgKGxldCBpID0gTWF0aC5mbG9vcigtMSAqIHJhbmdlKTsgaSA8PSBNYXRoLmNlaWwocmFuZ2UpOyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSBNYXRoLmZsb29yKC0xICogcmFuZ2UpOyBqIDw9IE1hdGguY2VpbChyYW5nZSk7IGorKykge1xyXG4gICAgICB2YXIgY2FuZF94ID0geCArIGlcclxuICAgICAgdmFyIGNhbmRfeSA9IHkgKyBqXHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJjYW5kX3g6IFwiICsgY2FuZF94ICsgXCIgY2FuZF95OiBcIiArIGNhbmRfeSlcclxuICAgICAgaWYgKGNhbmRfeCA+PTAgJiYgY2FuZF94IDwgc2l6ZSAmJiBjYW5kX3kgPj0wICYmIGNhbmRfeSA8IHNpemUpIHtcclxuICAgICAgICB2YXIgY2FuZF9pbmRleCA9IGNhbmRfeCpzaXplICsgY2FuZF95XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImNhbmRfaW5kZXg6IFwiICsgY2FuZF9pbmRleClcclxuICAgICAgICBpZiAoaXNJblJhbmdlKGluZGV4LCBjYW5kX2luZGV4LCByYW5nZSkpIHtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjYW5kX2luZGV4OiBcIiArIGNhbmRfaW5kZXggKyBcIndhcyBjb25zaWRlcmVkIGluIHJhbmdlXCIpXHJcbiAgICAgICAgICBjYW5kaWRhdGVfaW5kZXhfbGlzdC5wdXNoKGNhbmRfaW5kZXgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjYW5kaWRhdGVfaW5kZXhfbGlzdFxyXG59XHJcblxyXG5mdW5jdGlvbiBsaW5lX2Zyb21fZW5kcG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XHJcbiAgdmFyIGxpbmUgPSB7fVxyXG4gIGxpbmUuYSA9IC0xKihwb2ludDEueSAtIHBvaW50Mi55KVxyXG4gIGxpbmUuYiA9IHBvaW50MS54IC0gcG9pbnQyLnhcclxuICBsaW5lLmMgPSAtMSoobGluZS5hICogcG9pbnQyLnggKyBsaW5lLmIgKiBwb2ludDIueSlcclxuICByZXR1cm4gbGluZVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaXN0YW5jZV90b19saW5lKGVuZHBvaW50MSwgZW5kcG9pbnQyLCBzaXplLCB0ZXN0cG9pbnQpIHtcclxuICB2YXIgZW5kcG9pbnQxX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQxLCBzaXplKVxyXG4gIHZhciBlbmRwb2ludDJfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDIsIHNpemUpXHJcbiAgdmFyIHRlc3Rwb2ludF9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKHRlc3Rwb2ludCwgc2l6ZSlcclxuXHJcbiAgdmFyIGxpbmUgPSBsaW5lX2Zyb21fZW5kcG9pbnRzKGVuZHBvaW50MV9jb29yZCwgZW5kcG9pbnQyX2Nvb3JkKVxyXG4gIGNvbnNvbGUubG9nKGxpbmUpXHJcbiAgY29uc29sZS5sb2codGVzdHBvaW50X2Nvb3JkKVxyXG5cclxuICB2YXIgZGlzdGFuY2UgPSBNYXRoLmFicyhsaW5lLmEqdGVzdHBvaW50X2Nvb3JkLnggKyBsaW5lLmIqdGVzdHBvaW50X2Nvb3JkLnkgKyBsaW5lLmMpL01hdGguc3FydChsaW5lLmEqbGluZS5hICsgbGluZS5iKmxpbmUuYilcclxuXHJcbiAgY29uc29sZS5sb2coZGlzdGFuY2UpXHJcbiAgcmV0dXJuIGRpc3RhbmNlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNlbGxzX29uX2xpbmUoZW5kcG9pbnQxLCBlbmRwb2ludDIsIHNpemUpIHtcclxuICB2YXIgZW5kcG9pbnQxX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQxLCBzaXplKVxyXG4gIHZhciBlbmRwb2ludDJfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDIsIHNpemUpXHJcbiAgdmFyIGxpbmUgPSBsaW5lX2Zyb21fZW5kcG9pbnRzKGVuZHBvaW50MV9jb29yZCwgZW5kcG9pbnQyX2Nvb3JkKVxyXG5cclxuICB2YXIgc2NhbGUgPSBNYXRoLm1heChNYXRoLmFicyhsaW5lLmEpLCBNYXRoLmFicyhsaW5lLmIpKVxyXG4gIC8vIG5lZWQgdG8gYmUgcmV2ZXJzZWQhIHJlbWVtYmVyIGxpbmUuYSA9IGRlbHRhIHlcclxuICB2YXIgeF9zdGVwID0gbGluZS5iL3NjYWxlXHJcbiAgdmFyIHlfc3RlcCA9IC0xKmxpbmUuYS9zY2FsZVxyXG4gIHZhciBjdXJyZW50X3BvaW50ID0gZW5kcG9pbnQyX2Nvb3JkXHJcblxyXG4gIHZhciBzYWZldHlfaXRlciA9IDBcclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gW11cclxuICB3aGlsZSAoTWF0aC5hYnMoY3VycmVudF9wb2ludC54IC0gZW5kcG9pbnQxX2Nvb3JkLngpID4gMC41IHx8IE1hdGguYWJzKGN1cnJlbnRfcG9pbnQueSAtIGVuZHBvaW50MV9jb29yZC55KSA+IDAuNSkge1xyXG4gICAgdmFyIGNlaWwgPSB7fVxyXG4gICAgY2VpbC54ID0gTWF0aC5jZWlsKGN1cnJlbnRfcG9pbnQueClcclxuICAgIGNlaWwueSA9IE1hdGguY2VpbChjdXJyZW50X3BvaW50LnkpXHJcbiAgICB2YXIgY2VpbF9pbmRleCA9IGNvb3JkX3RvX2luZGV4KGNlaWwsIHNpemUpXHJcblxyXG4gICAgdmFyIGZsb29yID0ge31cclxuICAgIGZsb29yLnggPSBNYXRoLmZsb29yKGN1cnJlbnRfcG9pbnQueClcclxuICAgIGZsb29yLnkgPSBNYXRoLmZsb29yKGN1cnJlbnRfcG9pbnQueSlcclxuICAgIHZhciBmbG9vcl9pbmRleCA9IGNvb3JkX3RvX2luZGV4KGZsb29yLCBzaXplKVxyXG5cclxuXHJcbiAgICBjYW5kaWRhdGVfY2VsbHMucHVzaChjZWlsX2luZGV4KVxyXG4gICAgaWYgKGNlaWxfaW5kZXggIT0gZmxvb3JfaW5kZXgpIHtcclxuICAgICAgY2FuZGlkYXRlX2NlbGxzLnB1c2goZmxvb3JfaW5kZXgpXHJcbiAgICB9XHJcblxyXG4gICAgY3VycmVudF9wb2ludC54ID0gY3VycmVudF9wb2ludC54ICArIHhfc3RlcFxyXG4gICAgY3VycmVudF9wb2ludC55ID0gY3VycmVudF9wb2ludC55ICArIHlfc3RlcFxyXG4gICAgc2FmZXR5X2l0ZXIgPSBzYWZldHlfaXRlciArIDFcclxuICAgIGlmIChzYWZldHlfaXRlciA+IDUwKSB7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coY2FuZGlkYXRlX2NlbGxzKVxyXG4gIHJldHVybiBjYW5kaWRhdGVfY2VsbHNcclxufVxyXG5cclxuLy8gYW5pbWF0aW9ucywgY29udGFpbmVyIG1haW50YW5jZVxyXG5cclxuZnVuY3Rpb24gY2xlYXJfY29udGFpbmVycygpIHtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKCkge1xyXG4gIHRpbnlfYW5pbWF0aW9uKGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lcik7XHJcbiAgdGlueV9hbmltYXRpb24od2VhcG9uX2luZm9fY29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGlueV9hbmltYXRpb24oY29udGFpbmVyKSB7XHJcbiAgY29udGFpbmVyLmFkZENsYXNzKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICB9LCA1MCk7XHJcbn1cclxuXHJcbi8vIGFkZGluZyBvYmplY3RzLCBjaGFyYWN0ZXJzXHJcblxyXG5mdW5jdGlvbiBhZGRfb2JqZWN0KGJvYXJkX2luZGV4KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBidXR0b25fY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBidXR0b25fY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiYWRkLW9iamVjdC1idXR0b24tY29udGFpbmVyXCI7XHJcblxyXG4gIHZhciBidXR0b25fYWRkX2NoYXJhY3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uX2FkZF9jaGFyYWN0ZXIuaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMINC/0LXRgNGB0L7QvdCw0LbQsFwiO1xyXG4gIGJ1dHRvbl9hZGRfY2hhcmFjdGVyLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGFkZF9jaGFyYWN0ZXIoYm9hcmRfaW5kZXgpO1xyXG4gIH07XHJcblxyXG4gIHZhciBidXR0b25fYWRkX29ic3RhY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b25fYWRkX29ic3RhY2xlLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1XCI7XHJcbiAgYnV0dG9uX2FkZF9vYnN0YWNsZS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpO1xyXG4gIH07XHJcblxyXG4gIGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9jaGFyYWN0ZXIpO1xyXG4gIGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9vYnN0YWNsZSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b25fY29udGFpbmVyKTtcclxuXHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgb2JzdGFjbGVfbnVtYmVyKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9vYnN0YWNsZSc7XHJcbiAgdG9TZW5kLmNlbGxfaWQgPSBpbmRleDtcclxuICB0b1NlbmQub2JzdGFjbGVfbnVtYmVyID0gb2JzdGFjbGVfbnVtYmVyICsgMTtcclxuICB0b1NlbmQub2JzdGFjbGVfbmFtZSA9IG9ic3RhY2xlX2xpc3Rbb2JzdGFjbGVfbnVtYmVyXTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2VsZWN0LmlkID0gXCJvYnN0YWNsZV9jaG9zZW5cIjtcclxuICBzZWxlY3QuY2xhc3NOYW1lID0gXCJvYmplY3Rfc2VsZWN0XCJcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYnN0YWNsZV9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gb2JzdGFjbGVfbGlzdFtpXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaTtcclxuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgfVxyXG5cclxuICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b24uaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMXCI7XHJcbiAgYnV0dG9uLmJvYXJkX2luZGV4ID0gYm9hcmRfaW5kZXg7XHJcbiAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGJ1dHRvbiA9IGV2ZW50LnRhcmdldDtcclxuICAgIHZhciBvYnN0YWNsZV9udW1iZXIgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9ic3RhY2xlX2Nob3NlblwiKS52YWx1ZSk7XHJcblxyXG4gICAgYWRkX29ic3RhY2xlX2NvbW1hbmQoYnV0dG9uLmJvYXJkX2luZGV4LCBvYnN0YWNsZV9udW1iZXIpXHJcblxyXG4gICAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgfVxyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHNlbGVjdCk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b24pO1xyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZF9jaGFyYWN0ZXIoYm9hcmRfaW5kZXgpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2VsZWN0LmlkID0gXCJjaGFyYWN0ZXJfY2hvc2VuXCI7XHJcbiAgc2VsZWN0LmNsYXNzTmFtZSA9IFwib2JqZWN0X3NlbGVjdFwiXHJcblxyXG4gIHZhciBwbGF5ZXJzX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHBsYXllcnNfb3B0Z3JvdXAuaWQgPSBcInBsYXllcnNfb3B0Z3JvdXBcIlxyXG4gIHBsYXllcnNfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHBsYXllcnNfb3B0Z3JvdXAubGFiZWwgPSBcItCY0LPRgNC+0LrQuFwiXHJcblxyXG4gIHZhciBwZW5ndWluX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHBlbmd1aW5fb3B0Z3JvdXAuaWQgPSBcInBlbmd1aW5fb3B0Z3JvdXBcIlxyXG4gIHBlbmd1aW5fb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHBlbmd1aW5fb3B0Z3JvdXAubGFiZWwgPSBcItCf0LjQvdCz0LLQuNC90YtcIlxyXG5cclxuICB2YXIgc2hpZWxkX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHNoaWVsZF9vcHRncm91cC5pZCA9IFwic2hpZWxkX29wdGdyb3VwXCJcclxuICBzaGllbGRfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHNoaWVsZF9vcHRncm91cC5sYWJlbCA9IFwi0KHQutCy0LDQtNC+0LLRhtGLXCJcclxuXHJcbiAgdmFyIHN3b3JkX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHN3b3JkX29wdGdyb3VwLmlkID0gXCJzd29yZF9vcHRncm91cFwiXHJcbiAgc3dvcmRfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHN3b3JkX29wdGdyb3VwLmxhYmVsID0gXCLQnNC10YfQuFwiXHJcblxyXG4gIHZhciBtdXRhbnRfb3B0Z3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0Z3JvdXBcIik7XHJcbiAgbXV0YW50X29wdGdyb3VwLmlkID0gXCJtdXRhbnRfb3B0Z3JvdXBcIlxyXG4gIG11dGFudF9vcHRncm91cC5jbGFzc05hbWUgPSBcImNoYXJhY3Rlcl9vcHRncm91cFwiXHJcbiAgbXV0YW50X29wdGdyb3VwLmxhYmVsID0gXCLQnNGD0YLQsNC90YLRi1wiXHJcblxyXG4gIHZhciBhbmltYV9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBhbmltYV9vcHRncm91cC5pZCA9IFwiYW5pbWFfb3B0Z3JvdXBcIlxyXG4gIGFuaW1hX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBhbmltYV9vcHRncm91cC5sYWJlbCA9IFwi0JfQstC10YDQuFwiXHJcblxyXG4gIHZhciBvdGhlcl9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBvdGhlcl9vcHRncm91cC5pZCA9IFwib3RoZXJfb3B0Z3JvdXBcIlxyXG4gIG90aGVyX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBvdGhlcl9vcHRncm91cC5sYWJlbCA9IFwi0J7RgdGC0LDQu9GM0L3Ri9C1XCJcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IGNoYXJhY3Rlcl9saXN0W2ldO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpO1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9ncm91cCA9IGdyb3VwX2xpc3RbaV1cclxuICAgIHN3aXRjaChjaGFyYWN0ZXJfZ3JvdXApIHtcclxuICAgICAgY2FzZSBcInBsYXllclwiOlxyXG4gICAgICAgIHBsYXllcnNfb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwicGVuZ3VpblwiOlxyXG4gICAgICAgIHBlbmd1aW5fb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwic2hpZWxkXCI6XHJcbiAgICAgICAgc2hpZWxkX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInN3b3JkXCI6XHJcbiAgICAgICAgc3dvcmRfb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibXV0YW50XCI6XHJcbiAgICAgICAgbXV0YW50X29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImFuaW1hXCI6XHJcbiAgICAgICAgYW5pbWFfb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIG90aGVyX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG4gIGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG4gIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcbiAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyX2Nob3NlblwiKS52YWx1ZSk7XHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX2NoYXJhY3Rlcic7XHJcbiAgICB0b1NlbmQuY2VsbF9pZCA9IGJ1dHRvbi5ib2FyZF9pbmRleDtcclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlciArIDE7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBjaGFyYWN0ZXJfbGlzdFtjaGFyYWN0ZXJfbnVtYmVyXTtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgICBjbGVhcl9jb250YWluZXJzKDApXHJcbiAgfVxyXG5cclxuICBzZWxlY3QuYXBwZW5kKHBsYXllcnNfb3B0Z3JvdXApO1xyXG4gIHNlbGVjdC5hcHBlbmQoc2hpZWxkX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKHN3b3JkX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKG11dGFudF9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChhbmltYV9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChwZW5ndWluX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKG90aGVyX29wdGdyb3VwKTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHNlbGVjdCk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b24pO1xyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbi8vIFBpY3R1cmUvYXZhdGFyIG1hbmFnZW1lbnRcclxuXHJcbmZ1bmN0aW9uIGZvZ09yUGljKGNlbGxfaWQpIHtcclxuICB2YXIgcGljdHVyZV9uYW1lID0gRk9HX0lNQUdFO1xyXG4gIGlmICgoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbY2VsbF9pZF0gIT0gMSl8fChteV9yb2xlID09ICdnbScpKSB7XHJcbiAgICB2YXIgY2hhcl9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2VsbF9pZF1cclxuICAgIHBpY3R1cmVfbmFtZSA9IGdldF9vYmplY3RfcGljdHVyZShjaGFyX2lkKTtcclxuICAgIGlmIChjaGFyX2lkID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJfaWRdICE9IFwiYWxsXCIgJiYgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyX2lkXSAhPSBteV9uYW1lKSB7XHJcbiAgICAgIHBpY3R1cmVfbmFtZSA9IGdldF9vYmplY3RfcGljdHVyZSgwKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG4gIHJldHVybiBwaWN0dXJlX25hbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlGb2coKSB7XHJcblx0Y2xlYXJfY29udGFpbmVycygpXHJcblxyXG5cdHZhciBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgaW5mby5pbm5lckhUTUwgPSAn0JzRiyDQvdC1INC30L3QsNC10LwsINGH0YLQviDRjdGC0L4g0YLQsNC60L7QtS4g0JXRgdC70Lgg0LHRiyDQvNGLINC30L3QsNC70Lgg0YfRgtC+INGN0YLQviDRgtCw0LrQvtC1LCDQvdC+INC80Ysg0L3QtSDQt9C90LDQtdC8Lic7XHJcblxyXG5cdHZhciBmb2dfcGljdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgZm9nX3BpY3R1cmUuc3JjID0gUVVFU1RJT05fSU1BR0U7XHJcbiAgZm9nX3BpY3R1cmUuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGZvZ19waWN0dXJlLnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG5cdGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoaW5mbyk7XHJcblx0Y2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChmb2dfcGljdHVyZSk7XHJcblxyXG50aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldF9vYmplY3RfcGljdHVyZShpbmRleF9pbl9ib2FyZF9zdGF0ZSkge1xyXG4gIHZhciBpbWFnZSA9IEVNUFRZX0NFTExfUElDO1xyXG4gIHZhciBpbmRleF9pbl9iYXNlO1xyXG4gIGlmIChpbmRleF9pbl9ib2FyZF9zdGF0ZSA+IDApIHtcclxuICAgIGluZGV4X2luX2Jhc2UgPSBpbmRleF9pbl9ib2FyZF9zdGF0ZTtcclxuICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpbmRleF9pbl9iYXNlXTtcclxuICAgIGltYWdlID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuICB9IGVsc2UgaWYgKGluZGV4X2luX2JvYXJkX3N0YXRlIDwgMCkge1xyXG4gICAgaW5kZXhfaW5fYmFzZSA9IGluZGV4X2luX2JvYXJkX3N0YXRlICogKC0xKTtcclxuICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9baW5kZXhfaW5fYmFzZV07XHJcbiAgICBpbWFnZSA9IG9ic3RhY2xlLmF2YXRhcjtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbWFnZTtcclxufVxyXG5cclxuLy8gTW92ZSAtIERlbGV0ZSAtIFNlbGVjdFxyXG5cclxuZnVuY3Rpb24gbW92ZV9jaGFyYWN0ZXIodG9faW5kZXgsIHRvX2NlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwOyAvLyBlbmQgdGhlIG1vdGlvblxyXG4gIHZhciBjaG9zZW5faW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgZGlzdGFuY2UgPSBmaW5kRGlzdGFuY2UodG9faW5kZXgsIGNob3Nlbl9pbmRleClcclxuICB2YXIgbWF4X2Rpc3RhbmNlID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdXHJcblxyXG4gIGlmIChkaXN0YW5jZSA8PSBtYXhfZGlzdGFuY2UpIHtcclxuICAgIGlmICghKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxICYmIGRpc3RhbmNlID4gMS42KSkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ21vdmVfY2hhcmFjdGVyJztcclxuICAgICAgdG9TZW5kLmZyb21faW5kZXggPSBjaG9zZW5faW5kZXg7XHJcbiAgICAgIHRvU2VuZC50b19pbmRleCA9IHRvX2luZGV4O1xyXG4gICAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXg7XHJcbiAgICAgIHRvU2VuZC5jaGFyYWN0ZXJfYXZhdGFyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uYXZhdGFyO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQuZGlzdGFuY2UgPSBkaXN0YW5jZVxyXG4gICAgICB0b1NlbmQubGVmdF9zaGllbGQgPSAwXHJcbiAgICAgIHRvU2VuZC5taW5lc19leHBsb2RlZCA9IFtdXHJcbiAgICAgIHRvU2VuZC5taW5lc19kYW1hZ2UgPSAwXHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcImZvcmNlX2ZpZWxkX3RhcmdldFwiKSkge1xyXG4gICAgICAgIHZhciBzaGllbGRfaW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmZvcmNlX2ZpZWxkX3RhcmdldC5zaGllbGRfaW5kZXhcclxuICAgICAgICBpZighZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5jZWxsc19wcm90ZWN0ZWQuaW5jbHVkZXModG9faW5kZXgpKSB7Ly8g0L/QvtC60LjQvdGD0Lsg0LfQvtC90YMg0LfQsNGJ0LjRgtGLXHJcbiAgICAgICAgICB0b1NlbmQubGVmdF9zaGllbGQgPSAxXHJcbiAgICAgICAgICB0b1NlbmQuc2hpZWxkX2luZGV4ID0gc2hpZWxkX2luZGV4XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkID0gW107XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdICE9IFwiYWxsXCIpIHsvL3VzZXIgaXMgaW52aXNpYmxlXHJcbiAgICAgICAgdmFyIGltbWVkaWF0ZV9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIDEpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1tZWRpYXRlX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSAhPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4KSB7Ly8gdGhlcmUgYXJlIGNoYXJhY3RlcnMgdGhlcmVcclxuICAgICAgICAgICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkLnB1c2goY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgIHZhciBleHRlbmRlZF9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIGludmlzaWJpbGl0eV9kZXRlY3Rpb25fcmFkaXVzKTtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXh0ZW5kZWRfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dICE9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgpIHsvLyB0aGVyZSBhcmUgY2hhcmFjdGVycyB0aGVyZVxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfY2hhcl9udW0gPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV07XHJcbiAgICAgICAgICAgICAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjdXJyZW50X2NoYXJfbnVtXS5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvbGwgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkLnB1c2goY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXModG9faW5kZXgpKSB7XHJcbiAgICAgICAgdG9TZW5kLm1pbmVzX2V4cGxvZGVkLnB1c2godG9faW5kZXgpXHJcbiAgICAgICAgdG9TZW5kLm1pbmVzX2RhbWFnZSA9IHRvU2VuZC5taW5lc19kYW1hZ2UgKyByb2xsX3gobWluZXNfMF9kaXN0YW5jZV9kYW1hZ2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgaW1tZWRpYXRlX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgMSk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1tZWRpYXRlX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gPiAwICYmIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCkgey8vIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIHRoZXJlXHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2dhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV1dICE9IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMoaW1tZWRpYXRlX25iaFtpXSkgJiYgaW1tZWRpYXRlX25iaFtpXSAhPSB0b19pbmRleCkge1xyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZXhwbG9kZWQucHVzaChpbW1lZGlhdGVfbmJoW2ldKVxyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZGFtYWdlID0gdG9TZW5kLm1pbmVzX2RhbWFnZSArIHJvbGxfeChtaW5lc18xX2Rpc3RhbmNlX2RhbWFnZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBvbmVfYW5kX2hhbGZfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCAxLjYpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9uZV9hbmRfaGFsZl9uYmgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMob25lX2FuZF9oYWxmX25iaFtpXSkgJiYgKCFpbW1lZGlhdGVfbmJoLmluY2x1ZGVzKG9uZV9hbmRfaGFsZl9uYmhbaV0pKSkge1xyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZXhwbG9kZWQucHVzaChvbmVfYW5kX2hhbGZfbmJoW2ldKVxyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZGFtYWdlID0gdG9TZW5kLm1pbmVzX2RhbWFnZSArIHJvbGxfeChtaW5lc18xcDVfZGlzdGFuY2VfZGFtYWdlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGV4dGVuZGVkX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgaW52aXNpYmlsaXR5X2RldGVjdGlvbl9yYWRpdXMpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4dGVuZGVkX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dICE9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXggJiYgKCFpbW1lZGlhdGVfbmJoLmluY2x1ZGVzKGV4dGVuZGVkX25iaFtpXSkpKSB7Ly8gdGhlcmUgYXJlIGNoYXJhY3RlcnMgdGhlcmVcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRfY2hhcl9udW0gPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV07XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2N1cnJlbnRfY2hhcl9udW1dICE9IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICAgICAgICAgIGlmIChyb2xsID4gMTApIHtcclxuICAgICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChjdXJyZW50X2NoYXJfbnVtKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY2xlYXJfY29udGFpbmVycygpO1xyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgICAgIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IHRvX2luZGV4XHJcbiAgICAgIHZhciB0b19jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHRvX2luZGV4KTtcclxuICAgICAgY2hhcmFjdGVyX2Nob3Nlbi5jZWxsID0gdG9fY2VsbFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQkiDQsdC+0Y4g0L3Rg9C20L3QviDQtNCy0LjQs9Cw0YLRjNGB0Y8g0L/QvtGB0YLRg9C/0LDRgtC10LvRjNC90L4gKDEtMiDQutC70LXRgtC60LgpXCIpXHJcbiAgICAgIHVuZG9fc2VsZWN0aW9uKClcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQn9C+0LvQtdCz0YfQtSwg0LzRgdGM0LUg0JHQvtC70YJcIilcclxuICAgIHVuZG9fc2VsZWN0aW9uKClcclxuICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfY2hhcmFjdGVyKGluZGV4LCBjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2RlbGV0ZV9jaGFyYWN0ZXInO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdF9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcblxyXG5cclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSBcImFsbFwiIHx8IGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gbXlfbmFtZSkge1xyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkID0gY2hhcmFjdGVyX251bWJlclxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IGluZGV4XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jZWxsID0gY2VsbFxyXG5cclxuICBsZXQgbmFtZSA9IGNoYXJhY3Rlci5uYW1lO1xyXG4gIGxldCBhdmF0YXIgPSBjaGFyYWN0ZXIuYXZhdGFyO1xyXG5cclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIG5hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBuYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gbmFtZTtcclxuXHJcbiAgdmFyIGF2YXRhcl9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHZhciBhdmF0YXJfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3JjID0gYXZhdGFyO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuICBhdmF0YXJfY29udGFpbmVyLmFwcGVuZENoaWxkKGF2YXRhcl9kaXNwbGF5KVxyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKG5hbWVfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChhdmF0YXJfY29udGFpbmVyKTtcclxuXHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiIHx8IGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IDEpIHtcclxuXHJcbiAgICBhdmF0YXJfZGlzcGxheS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNob3dfbW9kYWwoY2hhcmFjdGVyX251bWJlciwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXZhdGFyX2Rpc3BsYXkub25tb3VzZWVudGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgICAgIHZhciBtYWluX2FjdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgYm9udXNfYWN0aW9uID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbW92ZV9hY3Rpb24gPSBNYXRoLmZsb29yKGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSlcclxuXHJcbiAgICAgIHZhciBtYWluX2FjdGlvbl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICBtYWluX2FjdGlvbl9kaXNwbGF5LmlkID0gXCJtYWluX2FjdGlvbl9kaXNwbGF5XCI7XHJcbiAgICAgIG1haW5fYWN0aW9uX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQntGB0L3QvtCy0L3Ri9GFOiBcIiArIG1haW5fYWN0aW9uXHJcblxyXG4gICAgICB2YXIgYm9udXNfYWN0aW9uX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgIGJvbnVzX2FjdGlvbl9kaXNwbGF5LmlkID0gXCJib251c19hY3Rpb25fZGlzcGxheVwiO1xyXG4gICAgICBib251c19hY3Rpb25fZGlzcGxheS5pbm5lckhUTUwgPSBcItCR0L7QvdGD0YHQvdGL0YU6IFwiICsgYm9udXNfYWN0aW9uXHJcblxyXG4gICAgICB2YXIgbW92ZV9hY3Rpb25fZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgbW92ZV9hY3Rpb25fZGlzcGxheS5pZCA9IFwibW92ZV9hY3Rpb25fZGlzcGxheVwiO1xyXG4gICAgICBtb3ZlX2FjdGlvbl9kaXNwbGF5LmlubmVySFRNTCA9IFwi0J/QtdGA0LXQtNCy0LjQttC10L3QuNC1OiBcIiArIG1vdmVfYWN0aW9uXHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSAhPSBcImFsbFwiKSB7Ly8g0LIg0LjQvdCy0LjQt9C1XHJcbiAgICAgICAgdmFyIGludmlzZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICAgICAgICBpbnZpc2VfZGlzcGxheS5zcmMgPSBJTlZJU0VfSU1BR0U7XHJcbiAgICAgICAgaW52aXNlX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xyXG4gICAgICAgIGludmlzZV9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzUwcHgnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSkgey8vICDQn9GA0LjRhtC10LvQtdC9XHJcbiAgICAgICAgdmFyIGFpbV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICAgICAgICBhaW1fZGlzcGxheS5zcmMgPSBBSU1fSU1BR0U7XHJcbiAgICAgICAgYWltX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xyXG4gICAgICAgIGFpbV9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzUwcHgnO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChtYWluX2FjdGlvbl9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKGJvbnVzX2FjdGlvbl9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKG1vdmVfYWN0aW9uX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoaW52aXNlX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYWltX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5zaG93KClcclxuICAgIH1cclxuXHJcbiAgICBhdmF0YXJfZGlzcGxheS5vbm1vdXNlbGVhdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuaGlkZSgpXHJcbiAgICB9XHJcblxyXG4gIHZhciBzdHJlbmd0aF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHN0cmVuZ3RoX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCJD0LjQu9CwOiBcIiArIGNoYXJhY3Rlci5zdHJlbmd0aDtcclxuXHJcbiAgdmFyIHN0YW1pbmFfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBzdGFtaW5hX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQotC10LvQvtGB0LvQvtC20LXQvdC40LU6IFwiICsgY2hhcmFjdGVyLnN0YW1pbmE7XHJcblxyXG4gIHZhciBhZ2lsaXR5X2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgYWdpbGl0eV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JvQvtCy0LrQvtGB0YLRjDogXCIgKyBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcbiAgdmFyIGludGVsbGlnZW5jZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGludGVsbGlnZW5jZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdGC0LXQu9C70LXQutGCOiBcIiArIGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcblxyXG4gIHZhciBLRF92YWx1ZSA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2NoYXJhY3Rlcl9udW1iZXJdKVxyXG4gIHZhciBLRF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIEtEX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQmtCUOiBcIiArIEtEX3ZhbHVlO1xyXG5cclxuICB2YXIgaHBfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgaHBfcGVyY2VudCA9IE1hdGguZmxvb3IoaHBfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIEhQX2Rpc3BsYXkuaWQgPSBcIkhQX2Rpc3BsYXlcIjtcclxuICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gKyBcIiAoXCIgKyBocF9wZXJjZW50ICsgXCIlKVwiO1xyXG5cclxuICB2YXIgdGlyZWRfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0pL3BhcnNlRmxvYXQoc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKVxyXG4gIHRpcmVkX3BlcmNlbnQgPSBNYXRoLmZsb29yKHRpcmVkX3BlcmNlbnQqMTAwKVxyXG5cclxuICB2YXIgdGlyZWRfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB0aXJlZF9kaXNwbGF5LmlkID0gXCJ0aXJlZF9kaXNwbGF5XCI7XHJcbiAgdGlyZWRfZGlzcGxheS5pbm5lckhUTUwgPSBcItCS0YvQvdC+0YHQu9C40LLQvtGB0YLRjDogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSArIFwiIChcIiArIHRpcmVkX3BlcmNlbnQgKyBcIiUpXCI7XHJcblxyXG4gIHZhciBpbml0aWF0aXZlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgaW5pdGlhdGl2ZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdC40YbQuNCw0YLQuNCy0LA6IFwiICsgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoc3RyZW5ndGhfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzdGFtaW5hX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYWdpbGl0eV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGludGVsbGlnZW5jZV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKEtEX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoSFBfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZCh0aXJlZF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGluaXRpYXRpdmVfZGlzcGxheSk7XHJcblxyXG4gIHZhciBtb3ZlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgbW92ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQn9C10YDQtdC80LXRidC10L3QuNC1XCI7XHJcbiAgbW92ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBtb3ZlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICBtb3ZlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBjaGFyYWN0ZXJfcGlja2VkID0gZXZlbnQudGFyZ2V0XHJcbiAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2hhcmFjdGVyX3BpY2tlZC5pbmRleF07XHJcbiAgICB2YXIgbW92ZV9hY3Rpb25zX2xlZnQgPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgIGlmIChtb3ZlX2FjdGlvbnNfbGVmdCA+IDApIHtcclxuICAgICAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShjaGFyYWN0ZXJfcGlja2VkLmluZGV4LCBjaGFyYWN0ZXJfcGlja2VkLmNlbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQktGLINC/0L7RgtGA0LDRgtC40LvQuCDQstGB0LUg0L/QtdGA0LXQvNC10YnQtdC90LjRjyDQvdCwINGN0YLQvtC8INGF0L7QtNGDIVwiKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcblxyXG4gICAgdmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCj0L3QuNGH0YLQvtC20LjRgtGMXCI7XHJcbiAgICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgICBkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZGVsZXRlX2NoYXJhY3RlcihpbmRleCwgY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbi5pbm5lckhUTUwgPSBcItCY0LfQvNC10L3QuNGC0Ywg0LLQuNC00LjQvNC+0YHRgtGMXCI7XHJcbiAgICBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHkoY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRhbWFnZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGFtYWdlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCd0LDQvdC10YHRgtC4INGD0YDQvtC9XCI7XHJcbiAgICBkYW1hZ2VfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgICBkYW1hZ2VfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW1hZ2VfZmllbGRcIik7XHJcbiAgICAgIGlmICghKGRhbWFnZV9maWVsZC52YWx1ZSA9PT0gXCJcIikpIHtcclxuICAgICAgICB2YXIgZGFtYWdlID0gcGFyc2VJbnQoZGFtYWdlX2ZpZWxkLnZhbHVlKTtcclxuICAgICAgICB2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiSFBfZGlzcGxheVwiKTtcclxuICAgICAgICB2YXIgbmV3X0hQID0gY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdIC0gZGFtYWdlO1xyXG4gICAgICAgIEhQX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQpdCfOiBcIiArIG5ld19IUDtcclxuXHJcbiAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ2RlYWxfZGFtYWdlJztcclxuICAgICAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICAgIHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBkYW1hZ2VfZmllbGQuaWQgPSBcImRhbWFnZV9maWVsZFwiO1xyXG4gICAgZGFtYWdlX2ZpZWxkLnR5cGUgPSBcIm51bWJlclwiO1xyXG4gICAgZGFtYWdlX2ZpZWxkLnBsYWNlaG9sZGVyID0gXCLQl9C90LDRh9C10L3QuNC1INGD0YDQvtC90LBcIjtcclxuXHJcbiAgfVxyXG5cclxuICB2YXIgc2VhcmNoX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgc2VhcmNoX2J1dHRvbi5pbm5lckhUTUwgPSBcItCe0LHRi9GB0LrQsNGC0YxcIjtcclxuICBzZWFyY2hfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgc2VhcmNoX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHNlYXJjaF9hY3Rpb24oZXZlbnQudGFyZ2V0KTtcclxuICB9XHJcblxyXG4gIHZhciBzaW1wbGVfcm9sbF9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHNpbXBsZV9yb2xsX2J1dHRvbi5pbm5lckhUTUwgPSBcItCf0YDQvtGB0YLQviBkMjBcIjtcclxuICBzaW1wbGVfcm9sbF9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMClcclxuICAgIHZhciB0b1NlbmQgPSB7fVxyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSBcInNpbXBsZV9yb2xsXCJcclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbmFtZSA9IGNoYXJhY3Rlci5uYW1lXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tXHJcbiAgICB0b1NlbmQucm9sbCA9IHJvbGxcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHdlYXBvbl9zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHdlYXBvbl9zZWxlY3QuaWQgPSBcIndlYXBvbl9jaG9zZW5cIjtcclxuXHJcbiAgdmFyIGludmVudG9yeSA9IGNoYXJhY3Rlci5pbnZlbnRvcnlcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnZlbnRvcnkubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSB3ZWFwb25fbGlzdFtpbnZlbnRvcnlbaV1dO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpbnZlbnRvcnlbaV07XHJcbiAgICB3ZWFwb25fc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICB9XHJcblxyXG4gIHZhciBwaWNrX3dlYXBvbl9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHBpY2tfd2VhcG9uX2J1dHRvbi5pbm5lckhUTUwgPSBcItCh0LzQtdC90LjRgtGMINC+0YDRg9C20LjQtVwiO1xyXG4gIHBpY2tfd2VhcG9uX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIHBpY2tfd2VhcG9uX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciB3ZWFwb25fc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWFwb25fY2hvc2VuXCIpXHJcbiAgICB2YXIgd2VhcG9uX2luZGV4ID0gd2VhcG9uX3NlbGVjdC52YWx1ZVxyXG5cclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltjaGFyYWN0ZXJfbnVtYmVyXSA9IHdlYXBvbl9pbmRleFxyXG4gICAgY2hhcmFjdGVyX2Nob3Nlbi53ZWFwb25faWQgPSB3ZWFwb25faW5kZXhcclxuXHJcbiAgICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bd2VhcG9uX2luZGV4XVxyXG5cclxuICAgIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3JjID0gd2VhcG9uLmF2YXRhcjtcclxuICB9XHJcblxyXG4gIHZhciBkZWZhdWx0X3dlYXBvbl9pbmRleCA9IGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4ud2VhcG9uX2lkID0gZGVmYXVsdF93ZWFwb25faW5kZXhcclxuICB2YXIgZGVmYXVsdF93ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tkZWZhdWx0X3dlYXBvbl9pbmRleF1cclxuXHJcbiAgdmFyIHdlYXBvbl9taW5pX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9taW5pX2Rpc3BsYXlcIlxyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3JjID0gZGVmYXVsdF93ZWFwb24uYXZhdGFyO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnODBweCc7XHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnODBweCc7XHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5vbm1vdXNlZW50ZXIgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGRlZmF1bHRfd2VhcG9uX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgZGVmYXVsdF93ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tkZWZhdWx0X3dlYXBvbl9pbmRleF1cclxuXHJcbiAgICB2YXIgd2VhcG9uX3JhbmdlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICB3ZWFwb25fcmFuZ2VfZGlzcGxheS5pZCA9IFwid2VhcG9uX3JhbmdlX2Rpc3BsYXlcIjtcclxuICAgIHdlYXBvbl9yYW5nZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JTQsNC70YzQvdC+0YHRgtGMOiBcIiArIGRlZmF1bHRfd2VhcG9uLnJhbmdlXHJcblxyXG4gICAgdmFyIHdlYXBvbl9kYW1hZ2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgIHdlYXBvbl9kYW1hZ2VfZGlzcGxheS5pZCA9IFwid2VhcG9uX2RhbWFnZV9kaXNwbGF5XCI7XHJcbiAgICB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQo9GA0L7QvTogXCIgKyBkZWZhdWx0X3dlYXBvbi5kYW1hZ2VbMF0gKyAnZCcgKyBkZWZhdWx0X3dlYXBvbi5kYW1hZ2VbMV1cclxuXHJcbiAgICB2YXIgd2VhcG9uX25hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgIHdlYXBvbl9uYW1lX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9uYW1lX2Rpc3BsYXlcIjtcclxuICAgIHdlYXBvbl9uYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gZGVmYXVsdF93ZWFwb24ubmFtZVxyXG5cclxuICAgIHZhciB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fYXZhdGFyX2Rpc3BsYXlcIlxyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LnNyYyA9IGRlZmF1bHRfd2VhcG9uLmF2YXRhcjtcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKHdlYXBvbl9uYW1lX2Rpc3BsYXkpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKHdlYXBvbl9hdmF0YXJfZGlzcGxheSlcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQod2VhcG9uX3JhbmdlX2Rpc3BsYXkpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKHdlYXBvbl9kYW1hZ2VfZGlzcGxheSlcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5zaG93KClcclxuICB9XHJcblxyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuaGlkZSgpXHJcbiAgfVxyXG5cclxuICBhdmF0YXJfY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fbWluaV9kaXNwbGF5KVxyXG5cclxuICB2YXIgYXR0YWNrX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYXR0YWNrX2J1dHRvbi5pbm5lckhUTUwgPSBcItCQ0YLQsNC60L7QstCw0YLRjFwiO1xyXG4gIGF0dGFja19idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgbWFpbl9hY3Rpb25zX2xlZnQgPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgIGlmIChtYWluX2FjdGlvbnNfbGVmdCA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl90b19hdHRhY2soY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0KMg0LLQsNGBINC90LUg0L7RgdGC0LDQu9C+0YHRjCDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIHNraWxsX3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2tpbGxfc2VsZWN0LmlkID0gXCJza2lsbF9jaG9zZW5cIjtcclxuXHJcbiAgdmFyIHNraWxsc2V0ID0gY2hhcmFjdGVyLnNraWxsc2V0XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbGxzZXQubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBza2lsbF9saXN0W3NraWxsc2V0W2ldXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gc2tpbGxzZXRbaV07XHJcbiAgICBza2lsbF9zZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIHNraWxsX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgc2tpbGxfYnV0dG9uLmlubmVySFRNTCA9IFwi0JjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINGD0LzQtdC90LjQtVwiO1xyXG4gIHNraWxsX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBza2lsbF9zZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsX2Nob3NlblwiKVxyXG4gICAgdmFyIHNraWxsX2luZGV4ID0gc2tpbGxfc2VsZWN0LnZhbHVlXHJcbiAgICB1c2Vfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIGluZGV4LCBjZWxsKVxyXG4gIH1cclxuXHJcblxyXG4gIHZhciBidXR0b25fbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICBidXR0b25fbGlzdC5jbGFzc05hbWUgPSBcImJ1dHRvbl9saXN0XCI7XHJcbiAgdmFyIGxpbmUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lOCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcblxyXG4gIGxpbmUxLmFwcGVuZENoaWxkKG1vdmVfYnV0dG9uKTtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgIGxpbmUyLmFwcGVuZENoaWxkKGRlbGV0ZV9idXR0b24pO1xyXG4gICAgbGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2J1dHRvbik7XHJcbiAgICBsaW5lMy5hcHBlbmRDaGlsZChkYW1hZ2VfZmllbGQpO1xyXG4gICAgbGluZTguYXBwZW5kQ2hpbGQoY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbik7XHJcbiAgfVxyXG4gIGxpbmU0LmFwcGVuZENoaWxkKHNlYXJjaF9idXR0b24pO1xyXG4gIGxpbmU1LmFwcGVuZENoaWxkKHBpY2tfd2VhcG9uX2J1dHRvbik7XHJcbiAgbGluZTUuYXBwZW5kQ2hpbGQod2VhcG9uX3NlbGVjdCk7XHJcbiAgbGluZTYuYXBwZW5kQ2hpbGQoYXR0YWNrX2J1dHRvbik7XHJcbiAgbGluZTcuYXBwZW5kQ2hpbGQoc2ltcGxlX3JvbGxfYnV0dG9uKTtcclxuICBsaW5lOS5hcHBlbmRDaGlsZChza2lsbF9idXR0b24pO1xyXG4gIGxpbmU5LmFwcGVuZENoaWxkKHNraWxsX3NlbGVjdCk7XHJcblxyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUxKTtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUyKTtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUzKTtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU4KTtcclxuICB9XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTQpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU1KTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNik7XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTkpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU3KTtcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b25fbGlzdCk7XHJcblxyXG59IGVsc2Uge1xyXG4gIHZhciBocF9wZXJjZW50ID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0pL3BhcnNlRmxvYXQoSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSlcclxuICBocF9wZXJjZW50ID0gTWF0aC5mbG9vcihocF9wZXJjZW50KjEwMClcclxuXHJcbiAgdmFyIEhQX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgSFBfZGlzcGxheS5pZCA9IFwiSFBfZGlzcGxheVwiO1xyXG4gIEhQX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQpdCfOiBcIiArIGhwX3BlcmNlbnQgKyBcIiVcIjtcclxuXHJcbiAgdmFyIHRpcmVkX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSlcclxuICB0aXJlZF9wZXJjZW50ID0gTWF0aC5mbG9vcih0aXJlZF9wZXJjZW50KjEwMClcclxuXHJcbiAgdmFyIHRpcmVkX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgdGlyZWRfZGlzcGxheS5pZCA9IFwidGlyZWRfZGlzcGxheVwiO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQktGL0L3QvtGB0LvQuNCy0L7RgdGC0Yw6IFwiICsgdGlyZWRfcGVyY2VudCArIFwiJVwiO1xyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKEhQX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQodGlyZWRfZGlzcGxheSk7XHJcbn1cclxuXHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG5cclxufVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlX29iamVjdF9jb21tYW5kKGluZGV4KSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2RlbGV0ZV9jaGFyYWN0ZXInO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZV9vYmplY3QoZXZlbnQpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgZGVsZXRlX29iamVjdF9jb21tYW5kKGV2ZW50LnRhcmdldC5pbmRleClcclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0X29ic3RhY2xlKGluZGV4LCBjZWxsKSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgdmFyIG9ic3RhY2xlX2lkID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gKiAoLTEpO1xyXG4gIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9bb2JzdGFjbGVfaWRdO1xyXG5cclxuICAvLyBrZWVwIHRyYWNrIG9mIGxhc3QgY2hvc2VuIG9ic3RhbGUgdG8gcXVpY2tseSBhZGQgdG8gdGhlIG1hcFxyXG4gIGxhc3Rfb2JzdGFjbGUgPSBvYnN0YWNsZV9pZFxyXG5cclxuICBsZXQgbmFtZSA9IG9ic3RhY2xlLm5hbWU7XHJcbiAgbGV0IGF2YXRhciA9IG9ic3RhY2xlLmF2YXRhcjtcclxuXHJcbiAgdmFyIG5hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBuYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gbmFtZTtcclxuXHJcbiAgdmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQobmFtZV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGF2YXRhcl9kaXNwbGF5KTtcclxuXHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICB2YXIgZGVsZXRlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBkZWxldGVfYnV0dG9uLmlubmVySFRNTCA9IFwi0KPQvdC40YfRgtC+0LbQuNGC0YxcIjtcclxuICAgIGRlbGV0ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICAgIGRlbGV0ZV9idXR0b24uY2VsbCA9IGNlbGw7XHJcbiAgICBkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBkZWxldGVfb2JqZWN0KGV2ZW50KTtcclxuICAgIH1cclxuICAgIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoZGVsZXRlX2J1dHRvbik7XHJcbiAgfVxyXG5cclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAxXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gaW5kZXg7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF07XHJcbiAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL2xvYWRpbmcud2VicFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1bmRvX3NlbGVjdGlvbigpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwXHJcbiAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uKTtcclxuICBvbGRfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRdLmF2YXRhcjtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd19tb2RhbChjaGFyYWN0ZXJfbnVtYmVyLCBzdGFydGluZ19pbmRleCkge1xyXG4gIGhpZGVfbW9kYWwoKTtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgc2tpbGxzZXQgPSBjaGFyYWN0ZXIuc2tpbGxzZXRcclxuXHJcbiAgdmFyIHNraWxsX3RhYmxlID0gJChcIjx0YWJsZT5cIik7XHJcblxyXG4gIHZhciB0YWJsZV9zaXplID0gM1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlX3NpemU7IGkrKykge1xyXG4gICAgdmFyIHJvdyA9ICQoXCI8dHI+XCIpO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0YWJsZV9zaXplOyBqKyspIHtcclxuICAgICAgdmFyIGluZGV4ID0gc3RhcnRpbmdfaW5kZXggKyB0YWJsZV9zaXplKmkgKyBqXHJcbiAgICAgIGlmIChpbmRleCA8IHNraWxsc2V0Lmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBza2lsbF9udW1iZXIgPSBza2lsbHNldFtpbmRleF1cclxuICAgICAgICB2YXIgY29sdW1uID0gJChcIjx0aD5cIik7XHJcbiAgICAgICAgdmFyIHNraWxsX2ljb24gPSAkKFwiPElNRz5cIik7XHJcbiAgICAgICAgdmFyIGF2YXRhciA9IFFVRVNUSU9OX0lNQUdFXHJcbiAgICAgICAgaWYgKHNraWxsX2RldGFpbGVkX2luZm9bc2tpbGxfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eSgnYXZhdGFyJykpIHtcclxuICAgICAgICAgIGF2YXRhciA9IHNraWxsX2RldGFpbGVkX2luZm9bc2tpbGxfbnVtYmVyXS5hdmF0YXJcclxuICAgICAgICB9XHJcbiAgICAgICAgc2tpbGxfaWNvbi5hZGRDbGFzcygnc2tpbGxfaWNvbicpO1xyXG4gICAgICAgIHNraWxsX2ljb24uYXR0cignd2lkdGgnLCAnMTAwcHgnKTtcclxuICAgICAgICBza2lsbF9pY29uLmF0dHIoJ3NraWxsX251bWJlcicsIHNraWxsX251bWJlcik7XHJcbiAgICAgICAgc2tpbGxfaWNvbi5hdHRyKCdoZWlnaHQnLCAnMTAwcHgnKTtcclxuICAgICAgICBza2lsbF9pY29uLmF0dHIoJ3NyYycsIGF2YXRhcik7XHJcbiAgICAgICAgc2tpbGxfaWNvbi5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgdmFyIHBvc2l0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIHBvc2l0aW9uKTtcclxuICAgICAgICAgIHVzZV9za2lsbChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdza2lsbF9udW1iZXInKSwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICBoaWRlX21vZGFsKClcclxuICAgICAgICB9KTtcclxuICAgICAgICBza2lsbF9pY29uLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHZhciBza2lsbF9udW1iZXIgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdza2lsbF9udW1iZXInKTtcclxuICAgICAgICAgIHZhciBza2lsbF9vYmplY3QgPSBza2lsbF9kZXRhaWxlZF9pbmZvW3NraWxsX251bWJlcl07XHJcbiAgICAgICAgICB2YXIgc2tpbGxfbmFtZV9vYmplY3QgPSAkKFwiPGgyPlwiKTtcclxuICAgICAgICAgIHZhciBza2lsbF9uYW1lID0gc2tpbGxfbGlzdFtza2lsbF9udW1iZXJdO1xyXG4gICAgICAgICAgc2tpbGxfbmFtZV9vYmplY3QuaHRtbChza2lsbF9uYW1lKTtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5hcHBlbmQoc2tpbGxfbmFtZV9vYmplY3QpO1xyXG5cclxuICAgICAgICAgIHZhciBza2lsbF9jb3N0X29iamVjdCA9ICQoXCI8aDI+XCIpO1xyXG4gICAgICAgICAgaWYgKHNraWxsX29iamVjdC5oYXNPd25Qcm9wZXJ0eSgnY29zdCcpKSB7XHJcbiAgICAgICAgICAgIHZhciBza2lsbF9jb3N0ID0gc2tpbGxfb2JqZWN0LmNvc3Q7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfY29zdCA9IFwi0J3QtdC40LfQstC10YHRgtC90L5cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2tpbGxfY29zdF9vYmplY3QuaHRtbChcItCi0YDQtdCx0YPQtdGCINC00LXQudGB0YLQstC40Lk6IFwiICsgc2tpbGxfY29zdCk7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuYXBwZW5kKHNraWxsX2Nvc3Rfb2JqZWN0KTtcclxuXHJcbiAgICAgICAgICB2YXIgc2tpbGxfZGVzY3JpcHRpb25fb2JqZWN0ID0gJChcIjxwPlwiKTtcclxuICAgICAgICAgIGlmIChza2lsbF9vYmplY3QuaGFzT3duUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJykpIHtcclxuICAgICAgICAgICAgdmFyIHNraWxsX2Rlc2NyaXB0aW9uID0gc2tpbGxfb2JqZWN0LmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHNraWxsX2Rlc2NyaXB0aW9uID0gXCLQnNGLINGB0LDQvNC4INC90LUg0LfQvdCw0LXQvCDRh9GC0L4g0L7QvdC+INC00LXQu9Cw0LXRglwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9vYmplY3QuaHRtbChza2lsbF9kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuYXBwZW5kKHNraWxsX2Rlc2NyaXB0aW9uX29iamVjdCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgc2tpbGxfaWNvbi5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuaHRtbCgnJyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb2x1bW4uYXBwZW5kKHNraWxsX2ljb24pO1xyXG4gICAgICAgIHJvdy5hcHBlbmQoY29sdW1uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2tpbGxfdGFibGUuYXBwZW5kKHJvdyk7XHJcbiAgfVxyXG4gIHNraWxsX21vZGFsX2NvbnRlbnQuYXBwZW5kKHNraWxsX3RhYmxlKTtcclxuXHJcbiAgaWYgKHNraWxsc2V0Lmxlbmd0aCA+IHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSp0YWJsZV9zaXplKSB7Ly8gdGhlcmUgYXJlIG1vcmUgc2tpbGxzIHRvIGRpc3BsYXlcclxuICAgIHZhciBuZXh0X3BhZ2VfYnV0dG9uID0gJChcIjxJTUc+XCIpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCd3aWR0aCcsICcxMDBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdoZWlnaHQnLCAnNTBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdzcmMnLCBSSUdIVF9BUlJPV19JTUFHRSk7XHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgc2hvd19tb2RhbChjaGFyYWN0ZXJfbnVtYmVyLCBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqdGFibGVfc2l6ZSk7XHJcbiAgICB9KVxyXG5cclxuICAgIG5leHRfcGFnZV9idXR0b25fY29udGFpbmVyLmFwcGVuZChuZXh0X3BhZ2VfYnV0dG9uKTtcclxuICB9XHJcbiAgc2tpbGxfbW9kYWwuc2hvdygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlX21vZGFsKCkge1xyXG4gIHNraWxsX21vZGFsLmhpZGUoKTtcclxuICBza2lsbF9tb2RhbF9jb250ZW50Lmh0bWwoXCJcIik7XHJcbiAgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLmh0bWwoXCJcIik7XHJcbiAgbmV4dF9wYWdlX2J1dHRvbl9jb250YWluZXIuaHRtbChcIlwiKTtcclxufVxyXG5cclxuLy8gYXR0YWNrIHJlbGF0ZWQgaGVscGVyc1xyXG5cclxuZnVuY3Rpb24gY2hvb3NlX2NoYXJhY3Rlcl90b19hdHRhY2soY2VsbCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDJcclxuICBjZWxsLnNyYyA9IFwiLi9pbWFnZXMvYXR0YWNrX3BsYWNlaG9sZGVyLmpwZ1wiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wX2F0dGFjaygpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwXHJcbiAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uKTtcclxuICBvbGRfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRdLmF2YXRhcjtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RvcF9za2lsbCgpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwXHJcbiAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uKTtcclxuICBvbGRfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRdLmF2YXRhcjtcclxufVxyXG5cclxuXHJcbi8vIHJvbGwgc29tZXRoaW5nXHJcblxyXG5mdW5jdGlvbiByb2xsX3goeCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB4KSArIDFcclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbFNlYXJjaChpbnRlbGxpZ2VuY2UsIG1vZCkge1xyXG4gIHJldHVybiBpbnRlbGxpZ2VuY2UgKyByb2xsX3goMjApICsgbW9kO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsSW5pdGlhdGl2ZSgpIHtcclxuICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLkhQW2ldID4gMCkgeyAvLyBzbyBjaGFyYWN0ZXIgaSBpcyBwcmVzZW50XHJcbiAgICAgIC8vIHJldHJpZXZlIHRoYXQgY2hhcmFjdGVyJ3MgYWdpbGl0eVxyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baV07XHJcbiAgICAgIHZhciBhZ2lsaXR5ID0gY2hhcmFjdGVyLmFnaWxpdHk7XHJcblxyXG4gICAgICAvLyByb2xsIGluaXRpYXRpdmUgYW5kIGFkZCBhZ2lsaXR5IG1vZGlmaWNhdG9yXHJcbiAgICAgIHZhciBpbml0aWF0aXZlID0gY29tcHV0ZUluaXRpYXRpdmUocGFyc2VJbnQoYWdpbGl0eSkpO1xyXG5cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbaV0gPSBpbml0aWF0aXZlO1xyXG4gICAgfVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAncm9sbF9pbml0aWF0aXZlJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbml0aWF0aXZlX3N0YXRlID0gY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmU7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxfYXR0YWNrKHR5cGUsIGF0dGFja2VyLCB0YXJnZXQsIGFkdmFudGFnZV9ib251cykge1xyXG4gIHZhciBhZHZhbnRhZ2UgPSAwXHJcbiAgaWYgKCh0eXBlID09IFwicmFuZ2VkXCIpfHwodHlwZSA9PSBcImVuZXJneVwiKSkge1xyXG4gICAgYWR2YW50YWdlID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbYXR0YWNrZXJdO1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmhhc093blByb3BlcnR5KFwiYWRhcHRpdmVfZmlnaHRpbmdcIikpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID09IDApIHtcclxuICAgICAgICBhZHZhbnRhZ2UgPSBhZHZhbnRhZ2UgKyAxO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KHRgNCw0LHQvtGC0LDQuyDRgNC10LnQvdC00LbQvtCy0YvQuSDRgdGC0LDQuiDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0LhcIik7XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uYWRhcHRpdmVfZmlnaHRpbmcgPSAxO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAodHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIGFkdmFudGFnZSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbYXR0YWNrZXJdXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uaGFzT3duUHJvcGVydHkoXCJhZGFwdGl2ZV9maWdodGluZ1wiKSkge1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uYWRhcHRpdmVfZmlnaHRpbmcgPT0gMSkge1xyXG4gICAgICAgIGFkdmFudGFnZSA9IGFkdmFudGFnZSArIDE7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQodGA0LDQsdC+0YLQsNC7INC80LjQu9C70Lgg0YHRgtCw0Log0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtC4XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gMDtcclxuICAgIH1cclxuICB9XHJcbiAgYWR2YW50YWdlID0gYWR2YW50YWdlIC0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbdGFyZ2V0XSArIGFkdmFudGFnZV9ib251c1xyXG5cclxuICB2YXIgcm9sbCA9IDBcclxuXHJcbiAgaWYgKGFkdmFudGFnZSA+PSAyKSB7IC8vINCU0LjQutC+0LUg0L/RgNC10LjQvNGD0YnQtdGB0YLQstC+ID0gNCDQutGD0LHQsFxyXG4gICAgY29uc29sZS5sb2coXCLQlNC40LrQvtC1INC/0YDQtdC40LzRg9GJ0LXRgdGC0LLQvlwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwzID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGw0ID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWF4KHJvbGwxLCByb2xsMiwgcm9sbDMsIHJvbGw0KVxyXG4gIH0gZWxzZSBpZiAoYWR2YW50YWdlID09IDEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwi0J/RgNC10LjQvNGD0YnQtdGB0YLQstC+XCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5tYXgocm9sbDEsIHJvbGwyKVxyXG4gIH0gZWxzZSBpZiAoYWR2YW50YWdlID09IDApIHtcclxuICAgIHJvbGwgPSByb2xsX3goMjApXHJcbiAgfSBlbHNlIGlmIChhZHZhbnRhZ2UgPT0gLTEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwi0J/QvtC80LXRhdCwXCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5taW4ocm9sbDEsIHJvbGwyKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZyhcItCU0LjQutCw0Y8g0L/QvtC80LXRhdCwXCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDMgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDQgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5taW4ocm9sbDEsIHJvbGwyLCByb2xsMywgcm9sbDQpXHJcbiAgfVxyXG4gIHJldHVybiByb2xsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxfZXZhc2lvbih0YXJnZXRfY2hhcmFjdGVyLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcikge1xyXG4gIGNvbnNvbGUubG9nKFwi0JHQvtC90YPRgSDRg9Cy0L7RgNC+0YLQsDogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKVxyXG4gIHZhciBldmFkZV9yb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KHRhcmdldF9jaGFyYWN0ZXIuYWdpbGl0eSkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICByZXR1cm4gZXZhZGVfcm9sbFxyXG59XHJcblxyXG4vLyBtYW5hZ2luZyBjaGF0XHJcblxyXG5mdW5jdGlvbiBwdXNoVG9MaXN0KG1lc3NhZ2UpIHtcclxuICBmb3IgKGxldCBpPTE7IGkgPCBDSEFUX0NBU0g7IGkrKykge1xyXG4gICAgdmFyIGVsZW1lbnRfdG9fY29weSA9ICQoJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgaSArICdcIl0nKTtcclxuICAgIHZhciBlbGVtZW50X3RvX3Bhc3RlID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyAoaS0xKSArICdcIl0nKTtcclxuXHJcbiAgICBlbGVtZW50X3RvX3Bhc3RlLnRleHQoZWxlbWVudF90b19jb3B5LnRleHQoKSk7XHJcbiAgfVxyXG4gIHZhciB0b3BfZWxlbWVudCA9ICQoJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgKENIQVRfQ0FTSC0xKSArICdcIl0nKTtcclxuICB0b3BfZWxlbWVudC50ZXh0KG1lc3NhZ2UpO1xyXG5cclxuICBpZiAobm90aWZpY2F0aW9uc19jb250YWluZXIuaXMoXCI6aGlkZGVuXCIpKSB7XHJcbiAgICBjaGF0X2J1dHRvbi5hZGRDbGFzcyhcImlzLXJlZFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlQ2hhdFZpc2liaWxpdHkoKSB7XHJcbiAgaWYgKGNoYXRfYnV0dG9uLmhhc0NsYXNzKFwiaXMtcmVkXCIpKSB7XHJcbiAgICBjaGF0X2J1dHRvbi5yZW1vdmVDbGFzcyhcImlzLXJlZFwiKVxyXG4gIH1cclxuICBpZiAobm90aWZpY2F0aW9uc19jb250YWluZXIuaXMoXCI6aGlkZGVuXCIpKSB7XHJcbiAgICBub3RpZmljYXRpb25zX2NvbnRhaW5lci5zaG93KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLmhpZGUoKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGNvdmVyIG1lY2hhbmljc1xyXG5cclxuZnVuY3Rpb24gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKSB7XHJcbiAgdmFyIG1vZCA9IHt9XHJcbiAgbW9kLmlzUG9zc2libGUgPSB0cnVlXHJcbiAgbW9kLmNvdmVyX2xldmVsID0gYWNjdW11bGF0ZWRfY292ZXJcclxuICBzd2l0Y2goYWNjdW11bGF0ZWRfY292ZXIpIHtcclxuICAgIGNhc2UgMDpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IDBcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAwXHJcbiAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAwXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOlxyXG4gICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTFcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMlxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTJcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTFcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgNTpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTNcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTFcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgNjpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTNcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTJcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgNzpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTRcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTJcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgODpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTRcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTNcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgOTpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTVcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTNcclxuICAgICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbW9kLmlzUG9zc2libGUgPSBmYWxzZVxyXG4gICAgICAgIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1vZFxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlX2NvdmVyKGRpc3RhbmNlLCBjb3Zlcikge1xyXG4gIHZhciByZXN1bHQgPSAwXHJcbiAgaWYgKGRpc3RhbmNlIDwgMC4xNSkge1xyXG4gICAgcmVzdWx0ID0gY292ZXJcclxuICB9IGVsc2UgaWYgKGRpc3RhbmNlIDwgMC4zKSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlciAqIDAuNzVcclxuICB9IGVsc2UgaWYgKGRpc3RhbmNlIDwgMC41KSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlciAqIDAuNVxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjY1KSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlciAqIDAuMjVcclxuICB9IGVsc2Uge1xyXG4gICAgcmVzdWx0ID0gMFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdFxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfYWNjdW11bGF0ZWRfY292ZXIodXNlcl9wb3MsIHRhcmdldF9wb3MpIHtcclxuICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSAwXHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGNlbGxzX29uX2xpbmUodXNlcl9wb3MsIHRhcmdldF9wb3MsIGdhbWVfc3RhdGUuc2l6ZSlcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfY2VsbCA9IGNhbmRpZGF0ZV9jZWxsc1tpXVxyXG4gICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXSA8IDApIHsvLyDRjdGC0L4g0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVxyXG4gICAgICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW01hdGguYWJzKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXSldXHJcbiAgICAgIHZhciBkaXN0YW5jZSA9IGRpc3RhbmNlX3RvX2xpbmUodXNlcl9wb3MsIHRhcmdldF9wb3MsIGdhbWVfc3RhdGUuc2l6ZSwgY3VycmVudF9jZWxsKVxyXG4gICAgICBhY2N1bXVsYXRlZF9jb3ZlciA9IGFjY3VtdWxhdGVkX2NvdmVyICsgY29tcHV0ZV9jb3ZlcihkaXN0YW5jZSwgb2JzdGFjbGUuY292ZXIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGFjY3VtdWxhdGVkX2NvdmVyID0gTWF0aC5jZWlsKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gIHJldHVybiBhY2N1bXVsYXRlZF9jb3ZlclxyXG59XHJcblxyXG4vLyBNaXNjZWxhbmVvdXMgYWN0aW9uc1xyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5KGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSBcImNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eVwiO1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAwKSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMFxyXG4gIH1cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VhcmNoX2FjdGlvbihzZWFyY2hfYnV0dG9uKSB7XHJcbiAgdmFyIGluZGV4ID0gc2VhcmNoX2J1dHRvbi5pbmRleDtcclxuICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBpZiAoIShnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSAmJiBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdIDwgMSkpIHtcclxuXHJcbiAgICB2YXIgbmFtZSA9IGNoYXJhY3Rlci5uYW1lO1xyXG4gICAgdmFyIG1vZGlmaWNhdG9yID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaW5kZXhdO1xyXG4gICAgdmFyIGludGVsbGlnZW5jZSA9IGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcbiAgICB2YXIgcm9sbCA9IHJvbGxTZWFyY2gocGFyc2VJbnQoaW50ZWxsaWdlbmNlKSwgcGFyc2VJbnQobW9kaWZpY2F0b3IpKTtcclxuICAgIHZhciB6b25lX251bWJlciA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF07XHJcbiAgICBwdXNoVG9MaXN0KCfQn9C10YDRgdC+0L3QsNC2ICcgKyBuYW1lICsgJyDQsdGA0L7RgdC40LsgJyArIHJvbGwgKyAnINC90LAg0LLQvdC40LzQsNGC0LXQu9GM0L3QvtGB0YLRjCcpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NlYXJjaF9hY3Rpb24nO1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gbmFtZTtcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbDtcclxuICAgIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5wbGF5ZXJfbmFtZSA9IG15X25hbWVcclxuICAgIHRvU2VuZC5taW5lc19kZXRlY3RlZCA9IFtdXHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICB2YXIgbGFuZG1pbmVfY2FuZGlkYXRlcyA9IGluZGV4X2luX3JhZGl1cyhpbmRleCwgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cylcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFuZG1pbmVfY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMobGFuZG1pbmVfY2FuZGlkYXRlc1tpXSkpIHtcclxuICAgICAgICAgIHRvU2VuZC5taW5lc19kZXRlY3RlZC5wdXNoKGxhbmRtaW5lX2NhbmRpZGF0ZXNbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQntCx0YvRgdC6INCy0L4g0LLRgNC10LzRjyDQsdC+0Y8g0YHRgtC+0LjRgiDQsdC+0L3Rg9GB0L3QvtC1INC00LXQudGB0YLQstC40LUhXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlSW5pdGlhdGl2ZShhZ2lsaXR5KSB7XHJcbiAgcmV0dXJuIGFnaWxpdHkqMiArIHJvbGxfeCgyMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0X25ld19yb3VuZCgpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnbmV3X3JvdW5kJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHZhciBzYXZlX3JvbGwgPSBbXVxyXG5cclxuICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGUubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0gIT09IHVuZGVmaW5lZCAmJiBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldICE9PSBudWxsKSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgc2F2ZV9yb2xsW2ldID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlci5zdGFtaW5hKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRvU2VuZC5zYXZlX3JvbGxfbGlzdCA9IHNhdmVfcm9sbFxyXG5cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2JhdHRsZV9tb2QoKSB7XHJcbiAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMFxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMVxyXG4gIH1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2JhdHRsZV9tb2QnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnZhbHVlID0gbmV3X3ZhbHVlXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbi8vIGF0dGFjayByZWxhdGVkIHRoaW5ncyAoY29tcHV0YXRpb24pXHJcblxyXG5mdW5jdGlvbiBjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpIHtcclxuICByZXR1cm4gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduX21vdmVzKGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUZsb2F0KG1vdmVfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV0pO1xyXG4gIGlmIChjaGFyYWN0ZXIuaGFzT3duUHJvcGVydHkoXCJleHRyYV9tb3ZlbWVudFwiKSkge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdICsgcGFyc2VGbG9hdChjaGFyYWN0ZXIuZXh0cmFfbW92ZW1lbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gd2VhcG9uX2RhbWFnZV9ib251cyhyYXdfZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIsIGlzQWltZWQpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdG90YWxfZGFtYWdlID0gcmF3X2RhbWFnZVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSAndGhyb3dpbmcnKSB7XHJcbiAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW01hdGguY2VpbChwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpLzIpXVxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gJ3JhbmdlZCcpIHtcclxuICAgIGlmIChpc0FpbWVkICYmIHdlYXBvbi5oYXNPd25Qcm9wZXJ0eShcImFpbV9ib251c1wiKSkge1xyXG4gICAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBwYXJzZUludCh3ZWFwb24uYWltX2JvbnVzKVxyXG4gICAgfVxyXG4gIH1cclxuICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgcmV0dXJuIHRvdGFsX2RhbWFnZVxyXG59XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtX2F0dGFjayhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX2Nob3Nlbi53ZWFwb25faWRdXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSkpIHtcclxuXHJcbiAgICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIodXNlcl9wb3NpdGlvbiwgaW5kZXgpXHJcblxyXG4gICAgdmFyIGNvdmVyX21vZGlmaWVyID0gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG5cclxuXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfS0QgPSBjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3Jlc29sdmVfYXR0YWNrJztcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQuYXR0YWNrZXJfaWQgPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5hdHRhY2tlcl9wb3NpdGlvbiA9IHVzZXJfcG9zaXRpb25cclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmF0dGFja190eXBlID0gd2VhcG9uLnR5cGVcclxuICAgIHRvU2VuZC5jb3Zlcl9sZXZlbCA9IGNvdmVyX21vZGlmaWVyLmNvdmVyX2xldmVsXHJcbiAgICB0b1NlbmQudXNlcl9pbnZpc2liaWxpdHlfZW5kZWQgPSAwXHJcblxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSAhPSBcImFsbFwiICYmIHdlYXBvbi50eXBlICE9IFwidGhyb3dpbmdcIikge1xyXG4gICAgICB0b1NlbmQudXNlcl9pbnZpc2liaWxpdHlfZW5kZWQgPSAxXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvdmVyX21vZGlmaWVyLmlzUG9zc2libGUpIHtcclxuICAgICAgdmFyIGF0dGFja19yb2xsID0gcm9sbF9hdHRhY2sod2VhcG9uLnR5cGUsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGNvdmVyX21vZGlmaWVyLmFkdmFudGFnZV9ib251cylcclxuXHJcbiAgICAgIHZhciBpc0FpbWVkID0gZmFsc2U7XHJcbiAgICAgIGlmIChhdHRhY2tfcm9sbCA8IDIwKSB7Ly8gbm8gY3JpdFxyXG4gICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7Ly8g0J/RgNC40YbQtdC7INC00LDQsdC70LjRgiDQsdC+0L3Rg9GBINC/0L7Qv9Cw0LTQsNC90LjRj1xyXG4gICAgICAgICAgICBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKTtcclxuICAgICAgICAgICAgaXNBaW1lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uYWltXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgICAgICAgIHZhciBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gYXR0YWNrX3JvbGwgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLnN0cmVuZ3RoKVxyXG4gICAgICAgIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJlbmVyZ3lcIikge1xyXG4gICAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIDIqcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcInRocm93aW5nXCIpIHtcclxuICAgICAgICAgIHZhciBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gYXR0YWNrX3JvbGwgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmFnaWxpdHkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYXR0YWNrX2JvbnVzID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgdmFyIHVuaXZlcnNhbF9ib251cyA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgICAgICBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCArIGF0dGFja19ib251cyArIHVuaXZlcnNhbF9ib251cyArIGNvdmVyX21vZGlmaWVyLmF0dGFja19ib251c1xyXG5cclxuICAgICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsXHJcblxyXG4gICAgICAgIGlmIChjdW11bGF0aXZlX2F0dGFja19yb2xsID4gdGFyZ2V0X2NoYXJhY3Rlcl9LRCkgey8vINCV0YHRgtGMINC/0YDQvtCx0LjRgtC40LVcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBldmFkZV9yb2xsID0gcm9sbF9ldmFzaW9uKHRhcmdldF9jaGFyYWN0ZXIsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICB0b1NlbmQuZXZhZGVfcm9sbCA9IGV2YWRlX3JvbGxcclxuICAgICAgICAgICAgaWYgKGV2YWRlX3JvbGwgPiBjdW11bGF0aXZlX2F0dGFja19yb2xsKSB7IC8vc3VjY2VzZnVsbHkgZXZhZGVkXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImV2YWRlZFwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgaXNBaW1lZClcclxuICAgICAgICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGlzQWltZWQpXHJcbiAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcIktEX2Jsb2NrXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7IC8vIGZ1bGwgY3JpdFxyXG4gICAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsXHJcbiAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgaXNBaW1lZClcclxuICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmdWxsX2NyaXRcIlxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZ1bGxfY292ZXJcIlxyXG4gIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+Li4uXCIpXHJcbiAgfVxyXG4gIHN0b3BfYXR0YWNrKClcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X251bWJlciwgaXNBaW1lZCkge1xyXG4gIHZhciBkYW1hZ2UgPSAwXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwic25pcGVyXCIpIHtcclxuICAgIGlmIChhdHRhY2tfcm9sbCA8IDE2KSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KHdlYXBvbi5kYW1hZ2VbMV0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIsIGlzQWltZWQpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcIndlYWtzcG90XCIpICYmIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X251bWJlcl0ud2Vha3Nwb3QuaHVudGVyX2lkID09IGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICAgICAgICBzd2l0Y2ggKGF0dGFja19yb2xsKSB7XHJcbiAgICAgICAgICBjYXNlIDE4OlxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyLCBpc0FpbWVkKVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqMlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMTk6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlciwgaXNBaW1lZClcclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSoyXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlciwgaXNBaW1lZClcclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSo1XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIsIGlzQWltZWQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3aXRjaCAoYXR0YWNrX3JvbGwpIHtcclxuICAgICAgICAgIGNhc2UgMTg6XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIsIGlzQWltZWQpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOTpcclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyLCBpc0FpbWVkKVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjJcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyLCBpc0FpbWVkKVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjNcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlciwgaXNBaW1lZClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGF0dGFja19yb2xsIDwgMTkpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWFwb24uZGFtYWdlWzBdOyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3god2VhcG9uLmRhbWFnZVsxXSlcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgIH1cclxuICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIsIGlzQWltZWQpXHJcblxyXG4gICAgaWYgKGF0dGFja19yb2xsID09IDIwKSB7XHJcbiAgICAgIGRhbWFnZSA9IGRhbWFnZSAqIDJcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICB2YXIgZGFtYWdlX3R5cGUgPSBcImJ1bGxldFwiXHJcbiAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIHZhciBkYW1hZ2VfdHlwZSA9IFwibWVsZWVcIlxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJlbmVyZ3lcIikge1xyXG4gICAgICB2YXIgZGFtYWdlX3R5cGUgPSBcImVuZXJneVwiXHJcbiAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcInRocm93aW5nXCIpIHtcclxuICAgICAgdmFyIGRhbWFnZV90eXBlID0gXCJtZWxlZVwiXHJcbiAgfVxyXG5cclxuICBzd2l0Y2goZGFtYWdlX3R5cGUpIHtcclxuICAgIGNhc2UgXCJtZWxlZVwiOlxyXG4gICAgICB2YXIgcmVzaXN0ID0gY2hhcmFjdGVyX3N0YXRlLm1lbGVlX3Jlc2lzdFt0YXJnZXRfbnVtYmVyXVxyXG4gICAgICBjb25zb2xlLmxvZyhcItCj0YDQvtC9INC00L4g0YDQtdC30LjRgdGC0LA6IFwiICsgZGFtYWdlKVxyXG4gICAgICBkYW1hZ2UgPSBwYXJzZUludChkYW1hZ2UgKiAoMS4wIC0gcmVzaXN0KSlcclxuICAgICAgY29uc29sZS5sb2coXCLQo9GA0L7QvSDQv9C+0YHQu9C1INGA0LXQt9C40YHRgtCwOiBcIiArIGRhbWFnZSlcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiYnVsbGV0XCI6XHJcbiAgICAgIHZhciByZXNpc3QgPSBjaGFyYWN0ZXJfc3RhdGUuYnVsbGV0X3Jlc2lzdFt0YXJnZXRfbnVtYmVyXVxyXG4gICAgICBjb25zb2xlLmxvZyhcItCj0YDQvtC9INC00L4g0YDQtdC30LjRgdGC0LA6IFwiICsgZGFtYWdlKVxyXG4gICAgICBkYW1hZ2UgPSBwYXJzZUludChkYW1hZ2UgKiAoMS4wIC0gcmVzaXN0KSlcclxuICAgICAgY29uc29sZS5sb2coXCLQo9GA0L7QvSDQv9C+0YHQu9C1INGA0LXQt9C40YHRgtCwOiBcIiArIGRhbWFnZSlcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICAvL25vdGhpbmcgZm9yIG5vd1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRhbWFnZVxyXG59XHJcblxyXG5mdW5jdGlvbiBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUodGFyZ2V0X3BvcywgdXNlcl9wb3MsIHJhbmdlLCB1c2VyX2lkLCBza2lsbF9pZCwgYm9udXNfYXR0YWNrLCB3ZWFwb24sIGFjY3VtdWxhdGVkX2NvdmVyKSB7XHJcbiAgaWYgKGlzSW5SYW5nZSh0YXJnZXRfcG9zLCB1c2VyX3BvcywgcmFuZ2UpKSB7XHJcblxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVt0YXJnZXRfcG9zXVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfS0QgPSBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pZF1cclxuXHJcbiAgICB2YXIgY292ZXJfbW9kaWZpZXIgPSBjb3Zlcl9tb2QoYWNjdW11bGF0ZWRfY292ZXIpXHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfaWRcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmNvdmVyX2xldmVsID0gYWNjdW11bGF0ZWRfY292ZXJcclxuXHJcbiAgICBpZiAoY292ZXJfbW9kaWZpZXIuaXNQb3NzaWJsZSkge1xyXG5cclxuICAgICAgdmFyIGF0dGFja19yb2xsID0gcm9sbF9hdHRhY2sod2VhcG9uLnR5cGUsIHVzZXJfaWQsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyLCBjb3Zlcl9tb2RpZmllci5hZHZhbnRhZ2VfYm9udXMpXHJcblxyXG4gICAgICBpZiAoYXR0YWNrX3JvbGwgPCAyMCkgey8vIG5vIGNyaXRcclxuICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgYm9udXNfYXR0YWNrICsgY292ZXJfbW9kaWZpZXIuYXR0YWNrX2JvbnVzXHJcblxyXG4gICAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGN1bXVsYXRpdmVfYXR0YWNrX3JvbGxcclxuICAgICAgICB2YXIgaXNBaW1lZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA+IHRhcmdldF9jaGFyYWN0ZXJfS0QpIHsvLyDQldGB0YLRjCDQv9GA0L7QsdC40YLQuNC1XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgZXZhZGVfcm9sbCA9IHJvbGxfZXZhc2lvbih0YXJnZXRfY2hhcmFjdGVyLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgdG9TZW5kLmV2YWRlX3JvbGwgPSBldmFkZV9yb2xsXHJcbiAgICAgICAgICAgIGlmIChldmFkZV9yb2xsID4gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCkgeyAvL3N1Y2Nlc2Z1bGx5IGV2YWRlZFxyXG4gICAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJldmFkZWRcIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9pZCwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyLCBpc0FpbWVkKVxyXG4gICAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2lkLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGlzQWltZWQpXHJcbiAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcIktEX2Jsb2NrXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7IC8vIGZ1bGwgY3JpdFxyXG4gICAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsXHJcbiAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2lkLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGlzQWltZWQpXHJcbiAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jcml0XCJcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZ1bGxfY292ZXJcIlxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvU2VuZFxyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX2RhbWFnZShjaGFyYWN0ZXJfbnVtYmVyLCBkYW1hZ2UpIHtcclxuICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJmb3JjZV9maWVsZF90YXJnZXRcIikpIHtcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSAtIGRhbWFnZVxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgc2hpZWxkX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXQuc2hpZWxkX2luZGV4XHJcbiAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkIC0gZGFtYWdlXHJcbiAgICB2YXIgbWVzc2FnZSA9IFwi0KnQuNGCINC/0YDQuNC90Y/QuyDRg9GA0L7QvSDQvdCwINGB0LXQsdGPISDQntGB0YLQsNCy0YjQsNGP0YHRjyDQv9GA0L7Rh9C90L7RgdGC0Yw6IFwiICsgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5zaGllbGRcclxuICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIGlmIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZCA8PSAwKSB7Ly8g0YnQuNGCINGD0L3QuNGH0YLQvtC20LXQvVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IFwiUHJlc3MgRiDQqdC40YLRgy4uLlwiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgdmFyIGNoYXJfbGlzdCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uY2hhcmFjdGVyX2xpc3RcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJfbGlzdFtpXVxyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldFxyXG4gICAgICB9XHJcbiAgICAgIGRlbGV0ZV9vYmplY3RfY29tbWFuZChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnBvc2l0aW9uKVxyXG4gICAgICBkZWxldGUgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFRocm93UmFuZ2UoY2hhcmFjdGVyKSB7XHJcbiAgcmV0dXJuIHRocm93X2Jhc2VfcmFuZ2UgKyBwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpKjJcclxufVxyXG5cclxuZnVuY3Rpb24gbWVsZWVfcGVuYWx0eShkYXRhKSB7XHJcbiAgaWYgKGRhdGEuYXR0YWNrX3R5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmhhc093blByb3BlcnR5KFwibWVsZWVkXCIpKSB7IC8vINC40L3QsNGH0LUg0Y3RhNGE0LXQutGCINGD0LbQtSDQvdCw0LvQvtC20LXQvSwg0L3QtSDQv9C+0LLRgtC+0YDRj9C10LxcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbZGF0YS50YXJnZXRfaWRdIC0gMVxyXG4gICAgICB2YXIgbWVsZWVkX29iamVjdCA9IHt9XHJcbiAgICAgIG1lbGVlZF9vYmplY3QuY29vbGRvd24gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLm1lbGVlZCA9IG1lbGVlZF9vYmplY3RcclxuICAgIH1cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEudGFyZ2V0X2lkXSA9PSAxKSB7XHJcbiAgICAgIHZhciBjb29sZG93biA9IDFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBjb29sZG93biA9IDBcclxuICAgIH1cclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLm1lbGVlZC5jb29sZG93biA9IGNvb2xkb3duXHJcbiAgfVxyXG59XHJcblxyXG4vLyBTa2lsbHMhXHJcblxyXG5mdW5jdGlvbiB1c2Vfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKSB7XHJcbiAgc2tpbGxfaW5kZXggPSBwYXJzZUludChza2lsbF9pbmRleClcclxuICBzd2l0Y2goc2tpbGxfaW5kZXgpIHtcclxuICAgIGNhc2UgMDogLy/QoNGL0LLQvtC6XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJjaGFyZ2VfdXNlclwiKSB8fCBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXS5zcGVjaWFsX3R5cGUgPT0gXCJyb2d1ZVwiKSkge1xyXG4gICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxOiAvL9Cf0YDQuNC70LjQsiDQkNC00YDQtdC90LDQu9C40L3QsFxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFkcmVuYWxpbmVfdXNlclwiKSkge1xyXG4gICAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1XCIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6IC8vINCf0L7QtNGA0LXQt9Cw0YLRjCDRgdGD0YXQvtC20LjQu9C40Y9cclxuICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImN1dF9saW1iX3VzZXJcIikpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LUhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDM6IC8vINCh0LvQsNCx0L7QtSDQvNC10YHRgtC+XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNDogLy8g0JvQtdGH0LXQvdC40LVcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDU6IC8vINCR0L7Qu9GM0YjQvtC5INCx0YDQsNGCXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNjogLy8g0J/QvtC00L3Rj9GC0Ywg0YnQuNGC0YtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwic2hpZWxkX3VwXCIpKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInNoaWVsZF9kb3duXCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic2hpZWxkX3VwXCJcclxuICAgICAgfVxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA3OiAvLyDQv9C+0LbQuNGA0LDQvdC40LUg0YHRg9GJ0L3QvtGB0YLQuFxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgODogLy8g0YPQt9C90LDRgtGMINCx0LjQvtC/0YPQu1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImJpb3Bvb2xcIikpIHtcclxuICAgICAgICBhbGVydChcItCd0LDQutC+0L/Qu9C10L3QvdGL0Lkg0LHQuNC+0L/Rg9C7OiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uYmlvcG9vbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LDQutC+0L/Qu9C10L3QvdGL0Lkg0LHQuNC+0L/Rg9C7INC+0YLRgdGD0YLRgdGC0LLRg9C10YJcIilcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDk6IC8vINCx0LXQt9GD0L/RgNC10YfQvdC+0LUg0LLQvtGB0YHRgtCw0L3QvtCy0LvQtdC90LjQtVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDEwOiAvLyDQvtCx0YvRh9C90L7QtSDQsiDQsdC+0L3Rg9GB0L3QvtC1XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC+0YHQvdC+0LLQvdGL0YUg0LTQtdC50YHRgtCy0LjQuSwg0YfRgtC+0LHRiyDQv9GA0LXQstGA0LDRgtC40YLRjCDQsiDQsdC+0L3Rg9GB0L3Ri9C1IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxMTogLy8g0L7RgtC00YvRhVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbY2hhcmFjdGVyX251bWJlcl0gPT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3X3N0YW1pbmEgPSBNYXRoLm1pbihjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSArIHJlc3Rfc3RhbWluYV9nYWluLCBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXS5zdGFtaW5hXSlcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICAgIHRvU2VuZC5uZXdfc3RhbWluYSA9IG5ld19zdGFtaW5hXHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0JLRiyDRg9C20LUg0YHQvtCy0LXRgNGI0LDQu9C4INC00LXQudGB0YLQstC40Y8g0L3QsCDRjdGC0L7QvCDRhdC+0LTRgywg0YLQsNC6INGH0YLQviDQvdC1INC80L7QttC10YLQtSDQvtGC0LTQvtGF0L3Rg9GC0YxcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDEyOiAvLyDQs9Cw0LfQvtCy0LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCjINCz0YDQsNC90LDRgtGLINC60YPQu9C00LDRg9C9ICjQs9Cw0Lcg0Y3RjdGNINC30LDQstCw0YDQuNCy0LDQtdGC0YHRjywg0YXQtylcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxMzogLy8g0YHQstC10YLQvtGI0YPQvNC+0LLQsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJsaWdodF9zb3VuZF9ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCT0YDQsNC90LDRgtCwINC10YnQtSDQvdC1INCz0L7RgtC+0LLQsFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTQ6IC8vINCo0L7QutC+0LLRi9C5INC40LzQv9GD0LvRjNGBXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTU6IC8vINCf0YvRiS3Qv9GL0Ykt0LPQvlxyXG4gICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJwaWNoX3BpY2hfdXNlclwiKSkge1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCf0YvRiSDQv9GL0Ykg0LXRidC1INC90LAg0L/QtdGA0LXQt9Cw0YDRj9C00LrQtSFcIilcclxuICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTY6IC8vINCh0LjQu9C+0LLQvtC1INC/0L7Qu9C1XHJcbiAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiZm9yY2VfZmllbGRfdXNlclwiKSkge1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQk9C10L3QtdGA0LDRgtC+0YAg0YHQuNC70L7QstC+0LPQviDQv9C+0LvRjyDQtdGJ0LUg0L3QtSDQt9Cw0YDRj9C00LjQu9GB0Y8hXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTc6IC8vINCY0L3QstC40LdcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXg7XHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJuYW1lID0gbXlfbmFtZTtcclxuICAgICAgICAgICAgdG9TZW5kLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE4OiAvLyDQkdC+0LXQstCw0Y8g0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtGMXHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleDtcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxOTogLy8g0JvQsNC60Lgg0YjQvtGCXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjA6IC8vINCb0L7RgtC10YDQtdC50L3Ri9C5INCy0YvRgdGC0YDQtdC7XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjE6IC8v0J/RgNC40LvQuNCyINC00LXQudGB0YLQstC40LlcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhY3Rpb25fc3BsYXNoXCIpKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICB0b1NlbmQuZXh0cmFfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcblxyXG4gICAgY2FzZSAyMjogLy8g0LPRgNCw0LQg0YPQtNCw0YDQvtCyXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDEpIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCU0LvRjyDQs9GA0LDQtNCwINGD0LTQsNGA0L7QsiDRgtGA0LXQsdGD0LXRgtGB0Y8g0LHQvtC70YzRiNC1IDEg0L7RgdC90L7QstC90L7Qs9C+INC00LXQudGB0YLQstC40Y8hXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIzOiAvL9CQ0LTRgNC10L3QsNC70LjQvdC+0LLRi9C5INC/0L7RgtC+0L9cclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInBvaXNvbm91c19hZHJlbmFsaW5lX3VzZXJcIikpIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1XCIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI0OiAvLyDQutC40YHQu9C+0YLQvdCw0Y8g0LPRgNCw0L3QsNGC0LBcclxuICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFjaWRfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0KMg0LPRgNCw0L3QsNGC0Ysg0LrRg9C70LTQsNGD0L0gKNC60LjRgdC70L7RgtCwINC+0LrQuNGB0LvRj9C10YLRgdGPKVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyNTogLy8g0JfQsNC80LjQvdC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgICB0b1NlbmQucGxheWVyX25hbWUgPSBteV9uYW1lXHJcbiAgICAgICAgICAgIHRvU2VuZC5wb3NpdGlvbiA9IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI2OiAvLyDQntCx0LXQt9Cy0YDQtdC00LjRgtGMINC80LjQvdGDXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCt0YLQviDRg9C80LXQvdC40LUg0YLRgNC10LHRg9C10YIgMSDQsdC+0L3Rg9GB0L3QvtC1INC00LXQudGB0YLQstC40LUhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI3OiAvLyDQndC40LrQvtGC0LjQvdC+0LLRi9C5INGD0LTQsNGAXHJcbiAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJ0b2JhY2NvX3N0cmlrZVwiKSkge1xyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC10LvRjNC30Y8g0LfQsNGC0Y/Qs9C40LLQsNGC0YzRgdGPINGC0LDQuiDRh9Cw0YHRgtC+ISDQoyDQstCw0YEg0LfQsNCy0LjRgdC40LzQvtGB0YLRjFwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI4OiAvLyDQmtGA0YPRh9C10L3Ri9C1INC/0YPQu9C4XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOTogLy8g0J/RgNC40YbQtdC70LjRgtGM0YHRj1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSkge1xyXG4gICAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0JLRiyDRg9C20LUg0L/RgNC40YbQtdC70LjQu9C40YHRjCAtINC/0L7RgNCwINGI0LzQsNC70Y/RgtGMXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBhbGVydChcItCd0LUg0LfQvdCw0LXQvCDRjdGC0L4g0YPQvNC10L3QuNC1XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKSB7XHJcbiAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQpIHtcclxuICAgIGNhc2UgMTpcclxuICAgICAgYWRyZW5hbGluZShpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOiAvLyDQn9C+0LTRgNC10LfQsNGC0Ywg0YHRg9GF0L7QttC40LvQuNGPXHJcbiAgICAgIGN1dF9saW1icyhpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzOiAvLyDQodC70LDQsdC+0LUg0LzQtdGB0YLQvlxyXG4gICAgICB3ZWFrX3Nwb3QoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDogLy8g0JvQtdGH0LXQvdC40LVcclxuICAgICAgaGVhbChpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA1OiAvLyDQkdC+0LvRjNGI0L7QuSDQsdGA0LDRglxyXG4gICAgICBiaWdfYnJvKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDc6IC8vINC/0L7QttC40YDQsNC90LjQtVxyXG4gICAgICBkZXZvdXIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgOTpcclxuICAgICAgYWJzb2x1dGVfcmVjb3ZlcnkoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTI6XHJcbiAgICAgIGdhc19ib21iKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDEzOlxyXG4gICAgICBsaWdodF9zb3VuZF9ib21iKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE0OlxyXG4gICAgICBzaG9ja193YXZlKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE1OlxyXG4gICAgICBwaWNoX3BpY2hfZ28oaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTY6XHJcbiAgICAgIGZvcmNlX2ZpZWxkKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxOTpcclxuICAgICAgbHVja3lfc2hvdChpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjA6XHJcbiAgICAgIGxvdHRlcnlfc2hvdChpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjI6XHJcbiAgICAgIHB1bmNoX3JhaW5mYWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMzpcclxuICAgICAgcG9pc29ub3VzX2FkcmVuYWxpbmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI0OlxyXG4gICAgICBhY2lkX2JvbWIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI2OlxyXG4gICAgICBkaWZmdXNlX2xhbmRtaW5lKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI4OlxyXG4gICAgICBjdXJ2ZWRfYnVsbGV0cyhpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYWxlcnQoXCJVbmtub3duIHRhcmdldGVkIHNraWxsXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDNcclxuICBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkID0gc2tpbGxfaW5kZXhcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gcG9zaXRpb25cclxuICBjZWxsLnNyYyA9IFwiLi9pbWFnZXMvQ2hpZG9yaS53ZWJwXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdlYWtfc3BvdChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcblxyXG4gIHZhciBpbnRfY2hlY2sgPSByb2xsX3goMjApICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGludF9jaGVjayA+PSB3ZWFrX3Nwb3RfdGhyZXNob2xkKSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgfSBlbHNlIHtcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICB9XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZWFsKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgaGVhbF9yYW5nZSkpIHtcclxuXHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgaGVhbGVyX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdGFyZ2V0X2hwID0gY2hhcmFjdGVyX3N0YXRlLkhQW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0YXJnZXRfZnVsbF9ocCA9IEhQX3ZhbHVlc1t0YXJnZXRfY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgdmFyIHJhdGlvID0gcGFyc2VGbG9hdCh0YXJnZXRfaHApL3BhcnNlRmxvYXQodGFyZ2V0X2Z1bGxfaHApXHJcblxyXG4gIHZhciBoZWFsX3JvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoaGVhbGVyX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgIGhlYWxfcm9sbCA9IGhlYWxfcm9sbCArIHBhcnNlSW50KGhlYWxlcl9jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLmhlYWxfcm9sbCA9IGhlYWxfcm9sbFxyXG5cclxuICB2YXIgdGhyZXNob2xkID0gMFxyXG4gIHZhciBjcml0aWNhbF90aHJlc2hvbGQgPSAwXHJcblxyXG4gIGlmIChyYXRpbyA+IDAuOSkge1xyXG4gICAgdGhyZXNob2xkID0gMTBcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC43NSkge1xyXG4gICAgdGhyZXNob2xkID0gMTVcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjk1KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjBcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI5XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuOTUpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC44MilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjMpIHtcclxuICAgIHRocmVzaG9sZCA9IDIzXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSAzMlxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjgyKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC4xNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjZcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDM1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC40KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuMDUpIHtcclxuICAgIHRocmVzaG9sZCA9IDMwXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSA0MFxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjQpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC4yMilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgfVxyXG5cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0J3Rg9C20L3QviDQv9C+0LTQvtC50YLQuCDQsdC70LjQttC1INC6INGG0LXQu9C4INGH0YLQvtCx0Ysg0LLRi9C70LXRh9C40YLRjFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYmlnX2JybyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGJpZ19icm9fcmFuZ2UpKSB7XHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuXHJcbiAgdmFyIHNoaWVsZF9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICB2YXIgdGFyZ2V0X0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuXHJcbiAgdmFyIGJvbnVzX0tEID0gTWF0aC5tYXgoc2hpZWxkX0tEIC0gIHRhcmdldF9LRCwgMClcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5ib251c19LRCA9IGJvbnVzX0tEXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQkdC+0LvRjNGI0L7QuSDQsdGA0LDRgiDQvdC1INC00L7RgdGC0LDQtdGCINC00L4g0LzQsNC70L7Qs9C+IVwiKVxyXG59XHJcbn1cclxuXHJcbi8vIGluY3JlYXNlIGF0dGFjayByb2xsIGJ5IGFnaWxpdHkgYm9udXMgKDIqbW9kKVxyXG5mdW5jdGlvbiBjdXRfbGltYnMoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcbiAgaWYgKHdlYXBvbi50eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYm9udXNfYXR0YWNrID0gMipwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmFnaWxpdHkpICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKGluZGV4LCB1c2VyX3Bvc2l0aW9uKVxyXG4gICAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICAgIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSB0b1NlbmQuZGFtYWdlX3JvbGxcclxuICAgICAgICB2YXIgZmxhdF9kYW1hZ2UgPSBkYW1hZ2Vfcm9sbCAtIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5zdHJlbmd0aCldIC0gY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgdmFyIGZ1bGxfZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICBpZiAoZmxhdF9kYW1hZ2UgPiBmdWxsX2RhbWFnZS8zKSB7XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgfSAgZWxzZSB7XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgICAgfVxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQv9C+0LTRgNC10LfQsNGC0Ywg0YHRg9GF0L7QttC40LvRjNGPINGN0YLQuNC8INC+0YDRg9C20LjQtdC8XCIpXHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1bmNoX3JhaW5mYWxsKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIHRhcmdldF9jaGFyX2lkID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJfaWRdXHJcbiAgICB2YXIgYm9udXNfYXR0YWNrID0gcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5hZ2lsaXR5KSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIHZhciB0b3RhbF9kYW1hZ2UgPSAwO1xyXG4gICAgdmFyIGF0dGFja3Nfc3VjY2Vzc2Z1bCA9IDA7XHJcbiAgICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIoaW5kZXgsIHVzZXJfcG9zaXRpb24pO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXTsgaSsrKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbiwgYWNjdW11bGF0ZWRfY292ZXIpXHJcbiAgICAgIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImZ1bGxfY3JpdFwiKSB7XHJcbiAgICAgICAgICAgIGF0dGFja3Nfc3VjY2Vzc2Z1bCA9IGF0dGFja3Nfc3VjY2Vzc2Z1bCArIDE7XHJcbiAgICAgICAgICAgIHRvdGFsX2RhbWFnZSA9IHRvdGFsX2RhbWFnZSArIHRvU2VuZC5kYW1hZ2Vfcm9sbDtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVt0YXJnZXRfY2hhcl9pZF0gPSAwO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0b1NlbmQub3V0Y29tZSA9PSBcImV2YWRlZFwiICYmIHRhcmdldF9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlICE9IFwicm9ndWVcIikge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyX2lkXSA9IDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgbXVsdGlwbHllciA9IDEuMCArIHBhcnNlRmxvYXQoYXR0YWNrc19zdWNjZXNzZnVsIC0gMSkvMi4wXHJcbiAgICB2YXIgbWVzc2FnZSA9IFwi0JzQvdC+0LbQuNGC0LXQu9GMINCz0YDQsNC00LAg0LHRi9C7OiBcIiArIG11bHRpcGx5ZXJcclxuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpXHJcbiAgICB2YXIgZmluYWxfZGFtYWdlID0gcGFyc2VJbnQocGFyc2VGbG9hdCh0b3RhbF9kYW1hZ2UpKm11bHRpcGx5ZXIpXHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJfaWRcclxuICAgIHRvU2VuZC50b3RhbF9hdHRhY2tzID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgIHRvU2VuZC5zdWNjZXNzZnVsbF9hdHRhY2tzID0gYXR0YWNrc19zdWNjZXNzZnVsXHJcbiAgICB0b1NlbmQuZGFtYWdlID0gZmluYWxfZGFtYWdlXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JPRgNCw0LQg0YPQtNCw0YDQvtCyINC80L7QttC90L4g0YHQvtCy0YDQtdGI0LjRgtGMINGC0L7Qu9GM0LrQviDRgNGD0LrQvtC/0LDRiNC90YvQvCDQvtGA0YPQttC40LXQvCFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob2NrX3dhdmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcbiAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIGJvbnVzX2F0dGFjayA9IHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIoaW5kZXgsIHVzZXJfcG9zaXRpb24pO1xyXG4gIHZhciB0b1NlbmQgPSBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbiwgYWNjdW11bGF0ZWRfY292ZXIpXHJcbiAgaWYgKHRvU2VuZCA9PSBudWxsKSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICh0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJmdWxsX2NyaXRcIikge1xyXG4gICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRldm91cihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIDEpKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIHN0YWNrcyA9IDBcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcIk1hcmt1c19zdGFja3NcIikpIHtcclxuICAgICAgc3RhY2tzID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uTWFya3VzX3N0YWNrc1xyXG4gICAgfVxyXG4gICAgdmFyIGRhbWFnZSA9IHN0YWNrcyo1ICsgcm9sbF94KDEwKVxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5kYW1hZ2UgPSBkYW1hZ2VcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhYnNvbHV0ZV9yZWNvdmVyeShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIDEpKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIGhlYWxfYW1vdW50ID0gMFxyXG5cclxuICAgIHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbWFnZV9maWVsZFwiKTtcclxuICAgIGlmICghKGRhbWFnZV9maWVsZC52YWx1ZSA9PT0gXCJcIikpIHtcclxuICAgICAgaGVhbF9hbW91bnQgPSBwYXJzZUludChkYW1hZ2VfZmllbGQudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBiaW9wb29sID0gMFxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImJpb3Bvb2xcIikpIHtcclxuICAgICAgYmlvcG9vbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXS5iaW9wb29sXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGhlYWxfYW1vdW50ID4gMCAmJiBiaW9wb29sID49IGhlYWxfYW1vdW50KSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICB0b1NlbmQuaGVhbF9hbW91bnQgPSBoZWFsX2Ftb3VudFxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtdCy0L7Qt9C80L7QttC90L7QtSDQt9C90LDRh9C10L3QuNC1INC70LXRh9C10L3QuNGPXCIpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdhc19ib21iKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGhyb3dfcmFuZ2UgPSBmaW5kVGhyb3dSYW5nZShjaGFyYWN0ZXIpXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgdGhyb3dfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcbiAgICB0b1NlbmQudGhyZXNob2xkID0gZ2FzX2JvbWJfdGhyZXNob2xkXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgICBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgZ2FzX2JvbWJfb2JzdGFjbGUpXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JzQsNC70L4g0LrQsNGI0Lgg0LXQu9C4INC00LvRjyDRgtCw0LrQvtCz0L4g0LHRgNC+0YHQutCwXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmdXNlX2xhbmRtaW5lKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBsYW5kbWluZV9kZXRlY3Rpb25fcmFkaXVzKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG4gICAgdG9TZW5kLm91dGNvbWUgPSBcImVtcHR5XCJcclxuXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluY2x1ZGVzKGluZGV4KSkge1xyXG4gICAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gICAgICBpZiAocm9sbCA+IGxhbmRtaW5lX2RpZmZ1c2VfdGhyZXNob2xkKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0KHQu9C40YjQutC+0Lwg0LTQsNC70LXQutC+INC00LvRjyDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQuNGPXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhY2lkX2JvbWIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0aHJvd19yYW5nZSA9IGZpbmRUaHJvd1JhbmdlKGNoYXJhY3RlcilcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB0aHJvd19yYW5nZSkpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCc0LDQu9C+INC60LDRiNC4INC10LvQuCDQtNC70Y8g0YLQsNC60L7Qs9C+INCx0YDQvtGB0LrQsFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlnaHRfc291bmRfYm9tYihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBsaWdodF9zb3VuZF9ib21iX3JhbmdlKSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG5cclxuICB2YXIgY2hhcmFjdGVyX2xpc3QgPSBbXVxyXG4gIHZhciBvdXRjb21lX2xpc3QgPSBbXVxyXG5cclxuICB2YXIgcmFkaXVzID0gbGlnaHRfc291bmRfYm9tYl9yYWRpdXNcclxuXHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhpbmRleCwgcmFkaXVzKVxyXG4gIGNvbnNvbGUubG9nKGNhbmRpZGF0ZV9jZWxscylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDQsdC+0LzQsdGLXHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgaWYgKGNoYXJhY3Rlci5zcGVjaWFsX3R5cGUgIT09IFwiZHJvbmVcIikge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9saXN0LnB1c2godGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgdmFyIHNhdmVfcm9sbCA9IHJvbGxfeCgyMCkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSArIHBhcnNlSW50KGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgaWYgKHNhdmVfcm9sbCA+IGxpZ2h0X3NvdW5kX2JvbWJfdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICBvdXRjb21lX2xpc3QucHVzaCgwKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvdXRjb21lX2xpc3QucHVzaCgxKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICB0b1NlbmQuY2hhcmFjdGVyX2xpc3QgPSBjaGFyYWN0ZXJfbGlzdFxyXG4gIHRvU2VuZC5vdXRjb21lX2xpc3QgPSBvdXRjb21lX2xpc3RcclxuXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQlNGA0L7QvSDQvdC1INC00L7QutC40L3QtdGCXCIpXHJcbn1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9yY2VfZmllbGQoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgZm9yY2VfZmllbGRfcmFuZ2UpKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcblxyXG4gIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgc2hpZWxkID0gTWF0aC5jZWlsKHBhcnNlRmxvYXQoSFBfdmFsdWVzW3VzZXIuc3RhbWluYV0pLzIpXHJcbiAgdG9TZW5kLnNoaWVsZCA9IHNoaWVsZFxyXG5cclxuICB2YXIgY2hhcmFjdGVyX2xpc3QgPSBbXVxyXG5cclxuICB2YXIgcmFkaXVzID0gZm9yY2VfZmllbGRfcmFkaXVzXHJcblxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhZGl1cylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDRidC40YLQsFxyXG4gICAgICAgIGNoYXJhY3Rlcl9saXN0LnB1c2godGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHRvU2VuZC5jZWxsc19wcm90ZWN0ZWQgPSBjYW5kaWRhdGVfY2VsbHNcclxuICB0b1NlbmQuY2hhcmFjdGVyX2xpc3QgPSBjaGFyYWN0ZXJfbGlzdFxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgZm9yY2VfZmllbGRfb2JzdGFjbGUpXHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQk9C10L3QtdGA0LDRgtC+0YAg0LTQvtC70LbQtdC9INCx0YvRgtGMINGD0YHRgtCw0L3QvtCy0LvQtdC9INC/0L7QsdC70LjQttC1XCIpXHJcbn1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRyZW5hbGluZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgdGFyZ2V0X251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIGFkcmVuYWxpbmVfcmFuZ2UgPSAxXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgYWRyZW5hbGluZV9yYW5nZSkpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pbmRleCA9IHRhcmdldF9udW1iZXJcclxuICAgIHZhciBleHRyYV9hY3Rpb25zID0gcm9sbF94KDQpXHJcbiAgICB2YXIgbWludXNfYWN0aW9ucyA9IHJvbGxfeCg0KVxyXG4gICAgdG9TZW5kLmV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zXHJcbiAgICB0b1NlbmQubWludXNfYWN0aW9ucyA9IG1pbnVzX2FjdGlvbnNcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwb2lzb25vdXNfYWRyZW5hbGluZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgdGFyZ2V0X251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgcG9pc29ub3VzX2FkcmVuYWxpbmVfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaW5kZXggPSB0YXJnZXRfbnVtYmVyXHJcbiAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IFtdXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaXNvbm91c19hZHJlbmFsaW5lX2R1cmF0aW9uOyBpKyspIHtcclxuICAgICAgZXh0cmFfYWN0aW9ucy5wdXNoKHJvbGxfeCg0KSlcclxuICAgIH1cclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0KDQsNC00LjRg9GBINCw0LTRgNC10L3QsNC70LjQvdCwIDEg0LrQu9C10YLQutCwIVwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGljaF9waWNoX2dvKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGFyZ2V0X251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9udW1iZXJdXHJcbiAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgPT0gXCJkcm9uZVwiKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaW5kZXggPSB0YXJnZXRfbnVtYmVyXHJcbiAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IE1hdGguY2VpbChwYXJzZUZsb2F0KHVzZXIuaW50ZWxsaWdlbmNlKS8yKVxyXG4gICAgdG9TZW5kLmV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQktGLINC90LUg0LzQvtC20LXRgtC1INC/0YvRiS3Qv9GL0Ykg0LrQvtCz0L4g0L/QvtC/0LDQu9C+IVwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbHVja3lfc2hvdChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnJvbGwgPSByb2xsX3goMTApXHJcbiAgICBpZiAodG9TZW5kLnJvbGwgPT0gNykge1xyXG4gICAgICB0b1NlbmQuZGFtYWdlID0gcm9sbF94KDcpXHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvdHRlcnlfc2hvdChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnJvbGwgPSByb2xsX3goMTAwKVxyXG4gICAgaWYgKHRvU2VuZC5yb2xsID09IDcpIHtcclxuICAgICAgdmFyIGRhbWFnZSA9IDBcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3goNylcclxuICAgICAgfVxyXG4gICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICB9IGVsc2UgaWYgKHRvU2VuZC5yb2xsID09IDc3KSB7XHJcbiAgICAgIHZhciBkYW1hZ2UgPSAwXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTQ7IGkrKykge1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCg3KVxyXG4gICAgICB9XHJcbiAgICAgIHRvU2VuZC5kYW1hZ2UgPSBkYW1hZ2VcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3VydmVkX2J1bGxldHMoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcbiAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIGJvbnVzX2F0dGFjayA9IHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIoaW5kZXgsIHVzZXJfcG9zaXRpb24pO1xyXG4gIGFjY3VtdWxhdGVkX2NvdmVyID0gTWF0aC5tYXgocGFyc2VJbnQocGFyc2VGbG9hdChhY2N1bXVsYXRlZF9jb3ZlcikvMikgLSAyLCAwKVxyXG4gIHZhciB0b1NlbmQgPSBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbiwgYWNjdW11bGF0ZWRfY292ZXIpXHJcbiAgaWYgKHRvU2VuZCA9PSBudWxsKSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfSBlbHNlIHtcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g0L/RgNC+0Log0LPQsNC30L7QstC+0Lkg0LPRgNCw0L3QsNGC0YtcclxuZnVuY3Rpb24gYXBwbHlfYm9tYihwb3NpdGlvbiwgcmFkaXVzKSB7XHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhwb3NpdGlvbiwgcmFkaXVzKVxyXG4gIC8vY29uc29sZS5sb2coY2FuZGlkYXRlX2NlbGxzKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NhbmRpZGF0ZV9jZWxsc1tpXV1cclxuICAgIGlmICh0YXJnZXRfY2hhcmFjdGVyX251bWJlciA+IDApIHsvLyDQv9C10YDRgdC+0L3QsNC2INCyINGA0LDQtNC40YPRgdC1INCx0L7QvNCx0YtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC/0LDQtNCw0LXRgiDQv9C+0LQg0LTQtdC50YHRgtCy0LjQtSDQs9Cw0LfQvtCy0L7QuSDQsdC+0LzQsdGLXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCArIDFcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgZ2FzX2JvbWJfcG9pc29uX29iamVjdCA9IHt9XHJcbiAgICAgICAgZ2FzX2JvbWJfcG9pc29uX29iamVjdC5wb2lzb25fbGV2ZWwgPSAxXHJcbiAgICAgICAgZ2FzX2JvbWJfcG9pc29uX29iamVjdC50aHJlc2hvbGQgPSBnYXNfYm9tYl90aHJlc2hvbGRcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5nYXNfYm9tYl9wb2lzb24gPSBnYXNfYm9tYl9wb2lzb25fb2JqZWN0XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSAtIDFcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseV9hY2lkX2JvbWIocG9zaXRpb24sIHJhZGl1cykge1xyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMocG9zaXRpb24sIHJhZGl1cylcclxuICAvL2NvbnNvbGUubG9nKGNhbmRpZGF0ZV9jZWxscylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDQsdC+0LzQsdGLXHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0L7Qv9Cw0LTQsNC10YIg0L/QvtC0INC00LXQudGB0YLQstC40LUg0LrQuNGB0LvQvtGC0L3QvtC5INCz0YDQsNC90LDRgtGLXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhY2lkX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uYWNpZF9ib21iX3BvaXNvbi5kdXJhdGlvbiA9IGFjaWRfYm9tYl9kdXJhdGlvblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBhY2lkX2JvbWJfcG9pc29uX29iamVjdCA9IHt9XHJcbiAgICAgICAgYWNpZF9ib21iX3BvaXNvbl9vYmplY3QuZHVyYXRpb24gPSBhY2lkX2JvbWJfZHVyYXRpb25cclxuICAgICAgICB2YXIgS0RfY2hhbmdlID0gcGFyc2VJbnQoY2hhcmFjdGVyX0tEKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKS8yKVxyXG4gICAgICAgIGFjaWRfYm9tYl9wb2lzb25fb2JqZWN0LmJvbnVzX0tEID0gS0RfY2hhbmdlXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uYWNpZF9ib21iX3BvaXNvbiA9IGFjaWRfYm9tYl9wb2lzb25fb2JqZWN0XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gLSBLRF9jaGFuZ2VcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob2NrZWRfZWZmZWN0KHRhcmdldCkge1xyXG4gIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRdLmhhc093blByb3BlcnR5KFwic2hvY2tlZFwiKSkge1xyXG4gICAgdmFyIHNob2NrZWRfb2JqZWN0ID0ge31cclxuICAgIHNob2NrZWRfb2JqZWN0LmNvb2xkb3duID0gc2hvY2tlZF9jb29sZG93blxyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRdLnNob2NrZWQgPSBzaG9ja2VkX29iamVjdFxyXG4gICAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbdGFyZ2V0XSA9IGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW3RhcmdldF0gLSAxXHJcbiAgfSBlbHNlIHtcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0XS5zaG9ja2VkLmNvb2xkb3duID0gc2hvY2tlZF9jb29sZG93blxyXG4gIH1cclxufVxyXG5cclxuLy8gTW9yZSBnbSBjb250cm9sIGFjdGlvbnNcclxuXHJcbmZ1bmN0aW9uIG1pcnJvcl9ib2FyZCgpIHtcclxuICB2YXIgbGVmdF9pbmRleDtcclxuICB2YXIgcmlnaHRfaW5kZXg7XHJcbiAgdmFyIHRlbXA7XHJcbiAgdmFyIGxlZnRfY2VsbDtcclxuICB2YXIgcmlnaHRfY2VsbDtcclxuICBmb3IgKGxldCB5ID0gMDsgeSA8IGdhbWVfc3RhdGUuc2l6ZTsgeSsrKSB7XHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGdhbWVfc3RhdGUuc2l6ZS8yOyB4KyspIHtcclxuXHJcbiAgICAgIGxlZnRfaW5kZXggPSB5KmdhbWVfc3RhdGUuc2l6ZSArIHg7XHJcbiAgICAgIHJpZ2h0X2luZGV4ID0geSpnYW1lX3N0YXRlLnNpemUgKyBwYXJzZUludChnYW1lX3N0YXRlLnNpemUpIC0geCAtIDE7XHJcbiAgICAgIC8vY29uc29sZS5sb2coJ3k6ICcgKyB5ICsgJyB4OiAnICsgeCArICcgbGVmdCBpbmRleDogJyArIGxlZnRfaW5kZXggKyAnIHJpZ2h0IGluZGV4OiAnICsgcmlnaHRfaW5kZXgpO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuZm9nX3N0YXRlW2xlZnRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuZm9nX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbcmlnaHRfaW5kZXhdID0gdGVtcDtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2xlZnRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbcmlnaHRfaW5kZXhdID0gdGVtcDtcclxuXHJcbiAgICAgIGxlZnRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBsZWZ0X2luZGV4KTtcclxuICAgICAgcmlnaHRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyByaWdodF9pbmRleCk7XHJcblxyXG4gICAgICB0ZW1wID0gbGVmdF9jZWxsLnNyYztcclxuICAgICAgbGVmdF9jZWxsLnNyYyA9IHJpZ2h0X2NlbGwuc3JjO1xyXG4gICAgICByaWdodF9jZWxsLnNyYyA9IHRlbXA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzeW5jX2JvYXJkKCkge1xyXG4gIHZhciBmdWxsX2dhbWVfc3RhdGUgPSB7XHJcbiAgICBnYW1lX3N0YXRlOiBnYW1lX3N0YXRlLFxyXG4gICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm86IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvLFxyXG4gICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbzogb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyxcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZTogY2hhcmFjdGVyX3N0YXRlXHJcbiAgfTtcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3N5bmNfYm9hcmQnO1xyXG4gIHRvU2VuZC5mdWxsX2dhbWVfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGU7XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd19sYW5kbWluZXMoKSB7XHJcbiAgdmFyIGxhbmRtaW5lc19hcnJheSA9IGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9uc1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGFuZG1pbmVzX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9taW5lID0gbGFuZG1pbmVzX2FycmF5W2ldXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1tjdXJyZW50X21pbmVdLmluY2x1ZGVzKG15X25hbWUpKSB7XHJcbiAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGN1cnJlbnRfbWluZSk7XHJcbiAgICAgIGNlbGwuc3JjID0gXCIvaW1hZ2VzL2xhbmRtaW5lLmpmaWZcIlxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJfY2hhcmFjdGVyX3N0YXRlKCkge1xyXG4gIGNoYXJhY3Rlcl9zdGF0ZSA9IENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVFxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhcl9jaGFyYWN0ZXIobnVtYmVyKSB7XHJcbiAgLy9jaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5IUFtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW251bWJlcl0gPSB7fVxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW251bWJlcl0gPSBudWxsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdfb25jbGljaygpIHtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIgfHwgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXSA9PSAxKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID09IDEpIHtcclxuICAgICAgdW5kb19zZWxlY3Rpb24oKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGluZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgICAgIHZhciBjZWxsID0gY2hhcmFjdGVyX2Nob3Nlbi5jZWxsXHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShpbmRleCwgY2VsbCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhX29uY2xpY2soKSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiIHx8IGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2NoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZF0gPT0gMSkge1xyXG5cclxuICAgIGlmIChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPT0gMikge1xyXG4gICAgICBzdG9wX2F0dGFjaygpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gICAgICB2YXIgY2VsbCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2VsbFxyXG4gICAgICB2YXIgbWFpbl9hY3Rpb25zX2xlZnQgPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgaWYgKG1haW5fYWN0aW9uc19sZWZ0ID4gMCkge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fYXR0YWNrKGNlbGwpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQoyDQstCw0YEg0L3QtSDQvtGB0YLQsNC70L7RgdGMINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXBhcmVfaW5pdGlhdGl2ZShhLGIpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbYV0gPCBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtiXSkge1xyXG4gICAgcmV0dXJuIDE7XHJcbiAgfSBlbHNlIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVthXSA9PSBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtiXSkge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAtMTtcclxuICB9XHJcbn1cclxuXHJcbi8vc29ja2V0LmluaXQoJ3dzOi8vbG9jYWxob3N0OjMwMDEnKTtcclxuc29ja2V0LmluaXQoU0VSVkVSX0FERFJFU1MpO1xyXG5cclxuc29ja2V0LnJlZ2lzdGVyT3BlbkhhbmRsZXIoKCkgPT4ge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdwbGF5ZXJfaW5mbyc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9sZSA9IG15X3JvbGU7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgdG9TZW5kLnBhc3N3b3JkID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdnbV9wYXNzd29yZCcpKTtcclxuICB9XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0pO1xyXG5cclxuc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoKGRhdGEpID0+IHtcclxuICAvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG4gIGlmICgoKGRhdGEudG9fbmFtZSA9PSBteV9uYW1lKSB8fCAoZGF0YS50b19uYW1lID09ICdhbGwnKSkgJiYgKGRhdGEucm9vbV9udW1iZXIgPT0gbXlfcm9vbSkpIHtcclxuICAgIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3BsYXllcl9pbmZvX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5pc1ZhbGlkID09IDApIHtcclxuICAgICAgICBhbGVydCgn0KLQsCDQutCw0LrQvtC5INGC0Ysg0LPQvCcpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRhdGEucm9sZSA9PSAnZ20nKSB7XHJcbiAgICAgICAgY3JlYXRlX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgc2F2ZV9ib2FyZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIGxvYWRfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuICAgICAgICByb2xsX2luaXRpYXRpdmVfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBmb2dfYnV0dG9uLnNob3coKTtcclxuICAgICAgICB6b25lX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgc2F2ZV9uYW1lX2lucHV0LnNob3coKTtcclxuICAgICAgICBib2FyZF9zaXplX2lucHV0LnNob3coKTtcclxuICAgICAgICBtaXJyb3JfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBuZXh0X3JvdW5kX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgYmF0dGxlX21vZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHN5bmNfYnV0dG9uLnNob3coKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGU7XHJcbiAgICAgICAgICAgIC8vIHFcclxuICAgICAgICAgICAgaWYoa2V5Q29kZSA9PSA4MSkge1xyXG4gICAgICAgICAgICAgICAgZm9nTW9kZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT0gODcpIHsgLy8gd1xyXG4gICAgICAgICAgICAgIHdfb25jbGljaygpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PSA2NSkgeyAvLyBhXHJcbiAgICAgICAgICAgICAgYV9vbmNsaWNrKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0O1xyXG4gICAgICBncm91cF9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfZ3JvdXBfbGlzdDtcclxuICAgICAgb2JzdGFjbGVfbGlzdCA9IGRhdGEub2JzdGFjbGVfbGlzdDtcclxuICAgICAgd2VhcG9uX2xpc3QgPSBkYXRhLndlYXBvbl9saXN0XHJcbiAgICAgIHdlYXBvbl9kZXRhaWxlZF9pbmZvID0gZGF0YS53ZWFwb25fZGV0YWlsZWRfaW5mb1xyXG4gICAgICBza2lsbF9kZXRhaWxlZF9pbmZvID0gZGF0YS5za2lsbF9kZXRhaWxlZF9pbmZvXHJcbiAgICAgIHNraWxsX2xpc3QgPSBkYXRhLnNraWxsX2xpc3RcclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnY29uc3RydWN0X2JvYXJkX3Jlc3BvbnNlJykge1xyXG4gICAgICBjbGVhcl9jaGFyYWN0ZXJfc3RhdGUoKVxyXG4gICAgICBjb25zdHJ1Y3RfYm9hcmQoZGF0YS5nYW1lX3N0YXRlKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdhZGRfY2hhcmFjdGVyX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gZGF0YS5jaGFyYWN0ZXJfaW5mbztcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3RlcjtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZGF0YS5jZWxsX2lkXSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGRhdGEuY2VsbF9pZCk7XHJcbiAgICAgICAgY2VsbC5zcmMgPSBjaGFyYWN0ZXIuYXZhdGFyO1xyXG4gICAgICB9XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZGF0YS5jZWxsX2lkXSA9IGRhdGEuY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBib251c19hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBtYWluX2FjdGlvbl9tYXBbY2hhcmFjdGVyLmFnaWxpdHldO1xyXG4gICAgICBhc3NpZ25fbW92ZXMoZGF0YS5jaGFyYWN0ZXJfbnVtYmVyKTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlci5hZ2lsaXR5O1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXIuS0RfcG9pbnRzO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDA7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDE7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDA7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBcImFsbFwiO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlci5pbnZlbnRvcnlbMF1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSB7fVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGRhdGEuY2VsbF9pZDtcclxuICAgICAgaWYgKGNoYXJhY3Rlci5oYXNPd25Qcm9wZXJ0eShcImV2YWRlX2JvbnVzXCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUludChjaGFyYWN0ZXIuZXZhZGVfYm9udXMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlci5oYXNPd25Qcm9wZXJ0eShcIm1lbGVlX3Jlc2lzdFwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9yZXNpc3RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyLm1lbGVlX3Jlc2lzdCkvMTAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9yZXNpc3RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDAuMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlci5oYXNPd25Qcm9wZXJ0eShcImJ1bGxldF9yZXNpc3RcIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYnVsbGV0X3Jlc2lzdFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gcGFyc2VGbG9hdChjaGFyYWN0ZXIuYnVsbGV0X3Jlc2lzdCkvMTAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5idWxsZXRfcmVzaXN0W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwLjA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vINCw0LrRgtC40LLQsNGG0LjRjyDQv9Cw0YHRgdC40LLQvtC6XHJcbiAgICAgIGlmIChjaGFyYWN0ZXIuaGFzT3duUHJvcGVydHkoXCJhZGFwdGl2ZV9maWdodGluZ1wiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5hZGFwdGl2ZV9maWdodGluZyA9IC0xO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdhZGRfb2JzdGFjbGVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBvYnN0YWNsZSA9IGRhdGEub2JzdGFjbGVfaW5mbztcclxuICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tkYXRhLm9ic3RhY2xlX251bWJlcl0gPSBvYnN0YWNsZTtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZGF0YS5jZWxsX2lkXSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGRhdGEuY2VsbF9pZCk7XHJcbiAgICAgICAgY2VsbC5zcmMgPSBvYnN0YWNsZS5hdmF0YXI7XHJcbiAgICAgIH1cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmNlbGxfaWRdID0gZGF0YS5vYnN0YWNsZV9udW1iZXIgKiAoLTEpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ21vdmVfY2hhcmFjdGVyX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgdG9faW5kZXggPSBkYXRhLnRvX2luZGV4O1xyXG4gICAgICB2YXIgZnJvbV9pbmRleCA9IGRhdGEuZnJvbV9pbmRleDtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVt0b19pbmRleF0gPSBkYXRhLmNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gdG9faW5kZXg7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuaW52aXNpYmlsaXR5X2VuZGVkX2lkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGlkID0gZGF0YS5pbnZpc2liaWxpdHlfZW5kZWRfaWRbaV07XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtpZF0gPSBcImFsbFwiO1xyXG5cclxuICAgICAgICB2YXIgcG9zaXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25baWRdO1xyXG4gICAgICAgIHZhciB0b19jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHBvc2l0aW9uKTtcclxuICAgICAgICB2YXIgYXZhdGFyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baWRdLmF2YXRhcjtcclxuICAgICAgICB0b19jZWxsLnNyYyA9IGF2YXRhcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgICAgIGlmICghY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwibGFuZG1pbmVfaW1tdW5lXCIpKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLm1pbmVzX2V4cGxvZGVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgbWluZV9wb3NpdGlvbiA9IGRhdGEubWluZXNfZXhwbG9kZWRbaV1cclxuICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIG1pbmVfcG9zaXRpb24pO1xyXG4gICAgICAgICAgY2VsbC5zcmMgPSBmb2dPclBpYyhtaW5lX3Bvc2l0aW9uKVxyXG4gICAgICAgICAgdmFyIGluZGV4ID0gZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluZGV4T2YobWluZV9wb3NpdGlvbilcclxuICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5zcGxpY2UoaW5kZXgsMSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbbWluZV9wb3NpdGlvbl0gPSBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubWluZXNfZGFtYWdlID4gMCkge1xyXG4gICAgICAgICAgZXhwbG9zaW9uX2F1ZGlvLnBsYXkoKTtcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLmNoYXJhY3Rlcl9udW1iZXIsIGRhdGEubWluZXNfZGFtYWdlKVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0L7QtNGA0YvQstCw0LXRgtGB0Y8g0L3QsCDQvNC40L3QsNGFINC/0L7Qu9GD0YfQsNGPIFwiICsgZGF0YS5taW5lc19kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyByZW1vdmUgc2hpZWxkZWQgcHJvcGVydHkgZnJvbSBjaGFyYWN0ZXIgYW5kIHJlbW92ZSBjaGFyYWN0ZXIgZnJvbSBzaGllbGRlZCBsaXN0XHJcbiAgICAgIGlmIChkYXRhLmxlZnRfc2hpZWxkID09IDEpIHtcclxuICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldFxyXG4gICAgICAgIHZhciBpbmRleCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2RhdGEuc2hpZWxkX2luZGV4XS5jaGFyYWN0ZXJfbGlzdC5pbmRleE9mKGRhdGEuY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tkYXRhLnNoaWVsZF9pbmRleF0uY2hhcmFjdGVyX2xpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDE7XHJcblxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIHN0YW1pbmFfbW92ZV9jb3N0XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIHBhcnNlRmxvYXQoZGF0YS5kaXN0YW5jZSlcclxuICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwic25pcGVyXCIpIHtcclxuICAgICAgICAgIHZhciBlZmZlY3RzX29iamVjdCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgaWYgKGVmZmVjdHNfb2JqZWN0Lmhhc093blByb3BlcnR5KFwic25pcGVyX3Bhc3NpdmVcIikpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRfYXR0YWNrX2JvbnVzID0gZWZmZWN0c19vYmplY3Quc25pcGVyX3Bhc3NpdmUuYXR0YWNrX2JvbnVzXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50X2RhbWFnZV9ib251cyA9IGVmZmVjdHNfb2JqZWN0LnNuaXBlcl9wYXNzaXZlLmRhbWFnZV9ib251c1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBjdXJyZW50X2F0dGFja19ib251cyAtIDVcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gY3VycmVudF9kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdLnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251cyA9IC01XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc25pcGVyX3Bhc3NpdmVfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmF0dGFja19ib251cyA9IC01XHJcbiAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZSA9IHNuaXBlcl9wYXNzaXZlX29iamVjdFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSA1XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoISgoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbdG9faW5kZXhdID09IDEpKSB8fCAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdICE9IFwiYWxsXCIgJiYgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdICE9IG15X25hbWUpKSkge1xyXG4gICAgICAgIHZhciB0b19jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHRvX2luZGV4KTtcclxuICAgICAgICB0b19jZWxsLnNyYyA9IGRhdGEuY2hhcmFjdGVyX2F2YXRhcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtmcm9tX2luZGV4XSA9IDA7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2Zyb21faW5kZXhdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBvbGRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGZyb21faW5kZXgpO1xyXG4gICAgICAgIG9sZF9jZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnZGVsZXRlX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJjaGFyYWN0ZXJfbnVtYmVyXCIpKSB7XHJcbiAgICAgICAgY2xlYXJfY2hhcmFjdGVyKGRhdGEuY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgfVxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuaW5kZXhdID0gMDtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZGF0YS5pbmRleF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgZGF0YS5pbmRleCk7XHJcbiAgICAgICAgY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3JvbGxfaW5pdGlhdGl2ZV9yZXNwb25zZScpIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmUgPSBkYXRhLmluaXRpYXRpdmVfc3RhdGU7XHJcbiAgICAgIHZhciBvcmRlcmVkX2FycmF5ID0gW11cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gPiAwKSB7Ly8gY2hhcmFjdGVyIGlzIHByZXNlbnRcclxuICAgICAgICAgIG9yZGVyZWRfYXJyYXkucHVzaChpKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBvcmRlcmVkX2FycmF5LnNvcnQoY29tcGFyZV9pbml0aWF0aXZlKTtcclxuICAgICAgaW5pdGlhdGl2ZV9vcmRlcl9jb250YWluZXIuaHRtbChcIlwiKVxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9yZGVyZWRfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bb3JkZXJlZF9hcnJheVtpXV1cclxuICAgICAgICB2YXIgcXVlcnlfc3RyaW5nID0gJzxpbWc+IGlkPVwiaW5pdGlhdGl2ZV9pbWFnZV8nICsgaSArICdcIidcclxuICAgICAgICB2YXIgaW1nID0gJChxdWVyeV9zdHJpbmcpXHJcbiAgICAgICAgaW1nLmF0dHIoJ3NyYycsIGNoYXJhY3Rlci5hdmF0YXIpO1xyXG4gICAgICAgIGltZy5hdHRyKCdoZWlnaHQnLCAnNTBweCcpO1xyXG4gICAgICAgIGltZy5hdHRyKCd3aWR0aCcsICc1MHB4Jyk7XHJcbiAgICAgICAgaW1nLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIHBvc2l0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW29yZGVyZWRfYXJyYXlbaV1dXHJcbiAgICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBwb3NpdGlvbik7XHJcbiAgICAgICAgICAvL3NlbGVjdF9jaGFyYWN0ZXIocG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICBub19zaGlmdF9vbmNsaWNrKG15X3JvbGUsIGdtX2NvbnRyb2xfbW9kLCBnYW1lX3N0YXRlLCBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MsIGNlbGwsIHBvc2l0aW9uKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaW1nLmFwcGVuZFRvKGluaXRpYXRpdmVfb3JkZXJfY29udGFpbmVyKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnZGVhbF9kYW1hZ2VfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBkYXRhLmRhbWFnZTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdzYXZlX2dhbWVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT0gMSkge1xyXG4gICAgICAgIGFsZXJ0KCdHYW1lICcgKyBkYXRhLnNhdmVfbmFtZSArICcgc2F2ZWQgc3VjY2VzZnVsbHknKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydCgnR2FtZSB3aXRoIG5hbWUgJyArIGRhdGEuc2F2ZV9uYW1lICsgJyBhbHJlYWR5IGV4aXN0IScpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbG9hZF9nYW1lX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICB2YXIgZnVsbF9nYW1lX3N0YXRlID0gZGF0YS5mdWxsX2dhbWVfc3RhdGU7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlID0gZnVsbF9nYW1lX3N0YXRlLmNoYXJhY3Rlcl9zdGF0ZTtcclxuICAgICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbztcclxuICAgICAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gZnVsbF9nYW1lX3N0YXRlLm9ic3RhY2xlX2RldGFpbGVkX2luZm87XHJcbiAgICAgICAgY29uc3RydWN0X2JvYXJkKGZ1bGxfZ2FtZV9zdGF0ZS5nYW1lX3N0YXRlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydCgnRmFpbGVkIHRvIGxvYWQgZ2FtZSAnICsgZGF0YS5zYXZlX25hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc3luY19ib2FyZF9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IGRhdGEuZnVsbF9nYW1lX3N0YXRlO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX3N0YXRlO1xyXG4gICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbztcclxuICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5vYnN0YWNsZV9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICBjb25zdHJ1Y3RfYm9hcmQoZnVsbF9nYW1lX3N0YXRlLmdhbWVfc3RhdGUpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3VwZGF0ZV9mb2dfcmVzcG9uc2UnKSB7XHJcblx0XHRcdFx0dmFyIGluZGV4ID0gZGF0YS5pbmRleDtcclxuXHRcdFx0XHR2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBpbmRleCk7XHJcblx0XHRcdFx0aWYgKGRhdGEudXBkYXRlX3R5cGUgPT0gJ3JlbW92ZScpIHtcclxuXHRcdFx0XHRcdGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9IDA7XHJcblx0XHRcdFx0XHRjZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9IDE7XHJcblx0XHRcdFx0XHRjZWxsLnNyYyA9IEZPR19JTUFHRTtcclxuXHRcdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYXNzaWduX3pvbmVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBpbmRleF9saXN0ID0gZGF0YS5pbmRleF9saXN0XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF9saXN0W2ldXSA9IGRhdGEuem9uZV9udW1iZXI7XHJcbiAgICAgICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaW5kZXhfbGlzdFtpXV0gPSBkYXRhLm1vZGlmaWNhdG9yO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X3Jlc3BvbnNlJykge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gZGF0YS5uZXdfdmFsdWU7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2ltcGxlX3JvbGxfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5jaGFyYWN0ZXJfbmFtZSArIFwiINCx0YDQvtGB0LDQtdGCIFwiICsgZGF0YS5yb2xsXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdza2lsbF9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIHVzZXJfaW5kZXggPSBkYXRhLnVzZXJfaW5kZXhcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFt1c2VyX2luZGV4XSA9IDFcclxuICAgICAgc3dpdGNoKGRhdGEuc2tpbGxfaW5kZXgpIHtcclxuICAgICAgICBjYXNlIDA6IC8vINGA0YvQstC+0LpcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgdmFyIGNoYXJnZV9tb3ZlX2luY3JlYXNlID0gcGFyc2VJbnQoY2hhcmFjdGVyLmFnaWxpdHkpXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gKyBjaGFyZ2VfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICB2YXIgY2hhcmdlX3VzZXJfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgY2hhcmdlX3VzZXJfb2JqZWN0LmNvb2xkb3duID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmNoYXJnZV91c2VyID0gY2hhcmdlX3VzZXJfb2JqZWN0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC+0LLQtdGA0YjQsNC10YIg0YDRi9Cy0L7QulwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE6IC8vINC/0YDQuNC70LjQsiDQsNC00YDQtdC90LDQu9C40L3QsFxyXG4gICAgICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRfaW5kZXggPSBkYXRhLnRhcmdldF9pbmRleFxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdGFyZ2V0X2luZGV4XSAtIGFkcmVuYWxpbmVfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gKyAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF90YXJnZXQgPSB7fVxyXG4gICAgICAgICAgICBhZHJlbmFsaW5lX29iamVjdF90YXJnZXQubWludXNfYWN0aW9ucyA9IGRhdGEubWludXNfYWN0aW9uc1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pbmRleF0uYWRyZW5hbGluZV90YXJnZXQgPSBhZHJlbmFsaW5lX29iamVjdF90YXJnZXRcclxuXHJcbiAgICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF91c2VyID0ge31cclxuICAgICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdXNlci5jb29sZG93biA9IGFkcmVuYWxpbmVfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5hZHJlbmFsaW5lX3VzZXIgPSBhZHJlbmFsaW5lX29iamVjdF91c2VyXHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINC/0YDQuNC70LjQsiDQsNC00YDQtdC90LDQu9C40L3QsC4gXCIgICsgdGFyZ2V0Lm5hbWUgKyBcIiDQv9C+0LvRg9GH0LDQtdGCIFwiICsgZGF0YS5leHRyYV9hY3Rpb25zICsgXCIg0LTQtdC50YHRgtCy0LjQuS4g0K3RgtC+INCx0YPQtNC10YIg0YHRgtC+0LjRgtGMIFwiICsgZGF0YS5taW51c19hY3Rpb25zICsgXCIg0LTQtdC50YHRgtCy0LjQuSDQvdCwINGB0LvQtdC00YPRjtGJ0LjQuSDRhdC+0LQuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjogLy8g0L/QvtC00YDQtdC30LDQvdC40LUg0YHRg9GF0L7QttC40LvQuNC5XHJcbiAgICAgICAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHN0YW1pbmFfY3V0X2xpbWJfY29zdFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY3V0X2xpbWJfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgY3V0X2xpbWJfb2JqZWN0LmNvb2xkb3duID0gY3V0X2xpbWJfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5jdXRfbGltYl91c2VyID0gY3V0X2xpbWJfb2JqZWN0XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLlwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L7QtNC90LDQutC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDRg9C00LDQu9C+0YHRjCDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlICE9ICdyb2d1ZScpIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc2tpbGxfb3V0Y29tZSA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbGltYl9jdXRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgICAgbGltYl9jdXRfb2JqZWN0LmR1cmF0aW9uID0gY3V0X2xpbWJfZHVyYXRpb25cclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uY3V0X2xpbWIgPSBsaW1iX2N1dF9vYmplY3RcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IC0xMFxyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQv9C+0LTRgNC10LfQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LHQtdC30YPRgdC/0LXRiNC90L4g0L/Ri9GC0LDQtdGC0YHRjyDQv9C+0LTRgNC10LfQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5za2lsbF9vdXRjb21lID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBsaW1iX2N1dF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgICBsaW1iX2N1dF9vYmplY3QuZHVyYXRpb24gPSBjdXRfbGltYl9kdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5jdXRfbGltYiA9IGxpbWJfY3V0X29iamVjdFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gLTEwXHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC/0L7QtNGA0LXQt9Cw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LHQtdC30YPRgdC/0LXRiNC90L4g0L/Ri9GC0LDQtdGC0YHRjyDQv9C+0LTRgNC10LfQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgICAgICB2YXIgbGltYl9jdXRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICBsaW1iX2N1dF9vYmplY3QuZHVyYXRpb24gPSBjdXRfbGltYl9kdXJhdGlvbiArIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5jdXRfbGltYiA9IGxpbWJfY3V0X29iamVjdFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAtMTBcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQv9C+0LTRgNC10LfQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiLCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZ1bGxfY292ZXJcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQv9C+0LTRgNC10LfQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90L4g0YLQvtGCINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6IC8vINGB0LvQsNCx0L7QtSDQvNC10YHRgtC+XHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gc3RhbWluYV93ZWFrc3BvdF9jb3N0XHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZGF0YS5vdXRjb21lID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgIHZhciB3ZWFrc3BvdF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICB3ZWFrc3BvdF9vYmplY3QuaHVudGVyX2lkID0gdXNlcl9pbmRleFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS53ZWFrc3BvdCA9IHdlYWtzcG90X29iamVjdFxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQvtCx0L3QsNGA0YPQttC40Lsg0YHQu9Cw0LHQvtC1INC80LXRgdGC0L4gXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L3QtSDRg9C00LDQu9C+0YHRjCDQvtCx0L3QsNGA0YPQttC40YLRjCDRgdC70LDQsdC+0LUg0LzQtdGB0YLQviBcIiArIHRhcmdldC5uYW1lXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSA0OiAvLyDQu9C10YfQtdC90LjQtVxyXG4gICAgICAgIHZhciBoZWFsZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICB2YXIgY29vbGRvd24gPSAwXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW3VzZXJfaW5kZXhdID4gY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbZGF0YS50YXJnZXRfaWRdKSB7XHJcbiAgICAgICAgICAvLyDQv9Cw0YbQuNC10L3RgiDQvdC1INGF0L7QtNC40YIg0LIg0Y3RgtC+0YIg0LbQtSDRhdC+0LRcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS50YXJnZXRfaWRdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdLzJcclxuICAgICAgICAgIGNvb2xkb3duID0gMFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb29sZG93biA9IDFcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGhlYWxlZF9vYmplY3QgPSB7fVxyXG4gICAgICAgIGhlYWxlZF9vYmplY3QuY29vbGRvd24gPSBjb29sZG93blxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmhlYWxlZCA9IGhlYWxlZF9vYmplY3RcclxuICAgICAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmYWlsXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCjIFwiICsgaGVhbGVyLm5hbWUgKyBcIiDQvdC1INC/0L7Qu9GD0YfQuNC70L7RgdGMINCy0YvQu9C10YfQuNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuaGVhbF9yb2xsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCjIFwiICsgaGVhbGVyLm5hbWUgKyBcIiDQv9C+0LvRg9GH0LjQu9C+0YHRjCDRg9GB0L/QtdGI0L3QviDQstGL0LvQtdGH0LjRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmhlYWxfcm9sbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBkYXRhLm5ld19ocFxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY3JpdGljYWwgc3VjY2Vzc1wiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQoyBcIiArIGhlYWxlci5uYW1lICsgXCIg0L/QvtC70YPRh9C40LvQvtGB0Ywg0LrRgNC40YLQuNGH0LXRgdC60LggKDIg0YHRgtC10L/QtdC90LgpINCy0YvQu9C10YfQuNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuaGVhbF9yb2xsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGRhdGEubmV3X2hwXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLQntGI0LjQsdC60LAg0L/RgNC4INGA0LDQt9Cx0L7RgNC1INC+0YLRhdC40LvQsFwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OiAvLyDQsdC+0LvRjNGI0L7QuSDQsdGA0LDRglxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgdmFyIHNoaWVsZCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHNoaWVsZC5uYW1lICsgXCIg0LfQsNGJ0LjRgtC40LsgXCIgKyAgdGFyZ2V0Lm5hbWUgKyBcIiAoK1wiICsgZGF0YS5ib251c19LRCArIFwi0LrQtClcIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtkYXRhLnRhcmdldF9pZF0gKyBkYXRhLmJvbnVzX0tEXHJcbiAgICAgICAgICB2YXIgYmlnX2Jyb19vYmplY3QgPSB7fVxyXG4gICAgICAgICAgYmlnX2Jyb19vYmplY3QuY29vbGRvd24gPSBjb29sZG93bl9iaWdfYnJvXHJcbiAgICAgICAgICBiaWdfYnJvX29iamVjdC5ib251c19LRCA9IGRhdGEuYm9udXNfS0RcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmJpZ19icm8gPSBiaWdfYnJvX29iamVjdFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OiAvLyDQv9C+0LTQvdGP0YLRjCDRidC40YLRi1xyXG4gICAgICAgICAgdmFyIHNoaWVsZCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBpZiAoZGF0YS5vdXRjb21lID09IFwic2hpZWxkX3VwXCIpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3VzZXJfaW5kZXhdICsgc2hpZWxkX3VwX0tEXHJcbiAgICAgICAgICAgIHZhciBzaGllbGRfdXBfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgc2hpZWxkX3VwX29iamVjdC5zdGFtaW5hX2Nvc3QgPSBzaGllbGRfdXBfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIHNoaWVsZF91cF9vYmplY3QuS0QgPSBzaGllbGRfdXBfS0RcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5zaGllbGRfdXAgPSBzaGllbGRfdXBfb2JqZWN0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQv9C+0LTQvdGP0Lsg0YnQuNGC0Ysg0LfQsCDRh9Cw0YJcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gLSBzaGllbGRfdXBfS0RcclxuICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uc2hpZWxkX3VwXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQvtC/0YPRgdGC0LjQuyDRidC40YIuINCn0LDRgiDQv9GA0L7RgdGC0LgoXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OiAvLyDQv9C+0LbQuNGA0LDQvdC40LUg0YHRg9GJ0L3QvtGB0YLQuFxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdIC0gZGF0YS5kYW1hZ2VcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5oYXNPd25Qcm9wZXJ0eShcIk1hcmt1c19zdGFja3NcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uTWFya3VzX3N0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLk1hcmt1c19zdGFja3MgKyAyXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5NYXJrdXNfc3RhY2tzID0gMlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uaGFzT3duUHJvcGVydHkoXCJiaW9wb29sXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCArIGRhdGEuZGFtYWdlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgPSBkYXRhLmRhbWFnZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L3QsNC90L7RgdC40YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwINC+0YIg0LrQvtGC0L7RgNC+0LPQviDQvdC10LLQvtC30LzQvtC20L3QviDRg9Cy0LXRgNC90YPRgtGM0YHRj1wiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDk6IC8vINCw0LHRgdC+0LvRjtGC0L3QvtC1INCy0L7RgdGB0YLQsNC90L7QstC70LXQvdC40LVcclxuICAgICAgICAgIHZhciBoZWFsZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gMVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdICsgZGF0YS5oZWFsX2Ftb3VudFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sIC0gZGF0YS5oZWFsX2Ftb3VudFxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBoZWFsZXIubmFtZSArIFwiINCy0L7RgdGB0YLQsNC90LDQu9C40LLQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIFwiICsgZGF0YS5oZWFsX2Ftb3VudCArIFwiINGF0L9cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMDogLy8g0L/QvtC70YPRh9C40YLRjCDQsdC+0L3Rg9GBXHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gKyAxXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvNC10L3Rj9C10YIg0L7QsdGL0YfQvdC+0LUg0L3QsCDQsdC+0L3Rg9GB0L3QvtC1INC00LXQudGB0YLQstC40LVcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTE6IC8vINC+0YLQtNGL0YVcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gZGF0YS5uZXdfc3RhbWluYVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L7RgtC00YvRhdCw0LXRgi4g0KXQvtGA0L7RiNC10LPQviDQvtGC0L/Rg9GB0LrQsCFcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDEyOiAvLyDQs9Cw0LfQvtCy0LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gZ2FzX2JvbWJfc3RhbWluYV9jb3N0XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LHRgNC+0YHQsNC10YIg0LPQsNC30L7QstGD0Y4g0LHQvtC80LHRgy4g0KHQvtCy0LXRgtGD0LXQvCDQt9Cw0LTQtdGA0LbQsNGC0Ywg0LTRi9GF0LDQvdC40LUuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgICAgdmFyIGJvbWJfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgYm9tYl9vYmplY3QudHlwZSA9IFwiZ2FzX2JvbWJcIlxyXG4gICAgICAgICAgICBib21iX29iamVjdC5wb3NpdGlvbiA9IGRhdGEucG9zaXRpb25cclxuICAgICAgICAgICAgYm9tYl9vYmplY3QudGhyZXNob2xkID0gZGF0YS50aHJlc2hvbGRcclxuICAgICAgICAgICAgYm9tYl9vYmplY3QucmFkaXVzID0gM1xyXG4gICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5wdXNoKGJvbWJfb2JqZWN0KVxyXG5cclxuICAgICAgICAgICAgdmFyIGdhc19ib21iX3VzZXIgPSB7fVxyXG4gICAgICAgICAgICBnYXNfYm9tYl91c2VyLmNvb2xkb3duID0gZ2FzX2JvbWJfc2tpbGxfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5nYXNfYm9tYl91c2VyID0gZ2FzX2JvbWJfdXNlclxyXG5cclxuICAgICAgICAgICAgdmFyIGluaXRpYWxfcmFkaXVzID0gMlxyXG5cclxuICAgICAgICAgICAgYXBwbHlfYm9tYihkYXRhLnBvc2l0aW9uLCBpbml0aWFsX3JhZGl1cylcclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDEzOiAvLyDRgdCy0LXRgtC+0YjRg9C80L7QstCw0Y8g0LPRgNCw0L3QsNGCXHJcbiAgICAgICAgICAgIHZhciBsaWdodF9zb3VuZF9ib21iX3VzZXIgPSB7fVxyXG4gICAgICAgICAgICBsaWdodF9zb3VuZF9ib21iX3VzZXIuY29vbGRvd24gPSBsaWdodF9zb3VuZF9ib21iX3NraWxsX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ubGlnaHRfc291bmRfYm9tYl91c2VyID0gbGlnaHRfc291bmRfYm9tYl91c2VyXHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEub3V0Y29tZV9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBkYXRhLmNoYXJhY3Rlcl9saXN0W2ldXHJcbiAgICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICAgICAgaWYgKGRhdGEub3V0Y29tZV9saXN0W2ldID09IDApIHsgLy8g0J/RgNC+0YjQtdC7INGB0L/QsNGB0LHRgNC+0YHQvtC6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YPRgdC/0LXQuyDQv9GA0LjQutGA0YvRgtGMINCz0LvQsNC30LBcIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L7RgdC70LXQvyDQvdCwIDIg0YXQvtC00LBcIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJibGluZFwiKSkgey8vINC90LUg0L3QsNC60LvQsNC00YvQstCy0LDQtdC8INC10YnQtSDRiNGC0YDQsNGEXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uYmxpbmQuY29vbGRvd24gPSAyXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgYmxpbmRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgICAgYmxpbmRfb2JqZWN0LmNvb2xkb3duID0gMlxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmJsaW5kID0gYmxpbmRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gLSAyXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdIC0gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxNDogLy8g0YjQvtC60LjRgNC+0LLQsNGC0YwgKNC00YDQvtC9ICsg0YPRj9C30LLQuNC80L7RgdGC0YwpXHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlICE9ICdyb2d1ZScpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgIHNob2NrZWRfZWZmZWN0KGRhdGEudGFyZ2V0X2lkKVxyXG5cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YHRgtGA0LXQu9GP0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjyDQuCDRiNC+0LrQuNGA0YPQtdGCINGG0LXQu9GMICjRg9GP0LfQstC40LzQvtGB0YLRjCkuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgIHNob2NrZWRfZWZmZWN0KGRhdGEudGFyZ2V0X2lkKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKSDQuCDRiNC+0LrQuNGA0YPQtdGCINGG0LXQu9GMICjRg9GP0LfQstC40LzQvtGB0YLRjCkuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgIHNob2NrZWRfZWZmZWN0KGRhdGEudGFyZ2V0X2lkKVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0L/QvtC/0LDQtNCw0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPINC4INGI0L7QutC40YDRg9C10YIg0YbQtdC70YwuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0YjQvtC60LjRgNC+0LLQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90L4g0YLQvtGCINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTU6IC8vINC/0YvRiSDQv9GL0Ykg0LPQvtGDXHJcbiAgICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0X2luZGV4ID0gZGF0YS50YXJnZXRfaW5kZXhcclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIHBpY2hfcGljaF9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBwaWNoX3BpY2hfb2JqZWN0X3RhcmdldCA9IHt9XHJcbiAgICAgICAgICBwaWNoX3BpY2hfb2JqZWN0X3RhcmdldC5leHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pbmRleF0ucGljaF9waWNoX3RhcmdldCA9IHBpY2hfcGljaF9vYmplY3RfdGFyZ2V0XHJcblxyXG4gICAgICAgICAgdmFyIHBpY2hfcGljaF9vYmplY3RfdXNlciA9IHt9XHJcbiAgICAgICAgICBwaWNoX3BpY2hfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBwaWNoX3BpY2hfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ucGljaF9waWNoX3VzZXIgPSBwaWNoX3BpY2hfb2JqZWN0X3VzZXJcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINCf0YvRiS3Qn9GL0Ykt0JPQvtGDLiBcIiAgKyB0YXJnZXQubmFtZSArIFwiINC/0L7Qu9GD0YfQsNC10YIgXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnMgKyBcIiDQtNC+0L8g0LTQtdC50YHRgtCy0LjQuSDQvdCwINGN0YLQvtGCINC4INGB0LvQtdC00YPRjtGJ0LjQuSDRhdC+0LQuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTY6IC8vINGB0LjQu9C+0LLQvtC1INC/0L7Qu9C1XHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gZm9yY2VfZmllbGRfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNoaWVsZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LnR5cGUgPSBcImZvcmNlX2ZpZWxkXCJcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5wb3NpdGlvbiA9IGRhdGEucG9zaXRpb25cclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5yYWRpdXMgPSBmb3JjZV9maWVsZF9yYWRpdXNcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5zaGllbGQgPSBkYXRhLnNoaWVsZFxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LmNoYXJhY3Rlcl9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfbGlzdFxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LmNlbGxzX3Byb3RlY3RlZCA9IGRhdGEuY2VsbHNfcHJvdGVjdGVkXHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzLnB1c2goc2hpZWxkX29iamVjdClcclxuXHJcbiAgICAgICAgICAgIHZhciBzaGllbGRfaW5kZXggPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5sZW5ndGggLSAxXHJcbiAgICAgICAgICAgIHZhciBjaGFyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9yY2VfZmllbGRfdGFyZ2V0ID0ge31cclxuICAgICAgICAgICAgZm9yY2VfZmllbGRfdGFyZ2V0LnNoaWVsZF9pbmRleCA9IHNoaWVsZF9pbmRleFxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJfbGlzdFtpXVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uZm9yY2VfZmllbGRfdGFyZ2V0ID0gZm9yY2VfZmllbGRfdGFyZ2V0XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JjZV9maWVsZF91c2VyID0ge31cclxuICAgICAgICAgICAgZm9yY2VfZmllbGRfdXNlci5jb29sZG93biA9IGZvcmNlX2ZpZWxkX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uZm9yY2VfZmllbGRfdXNlciA9IGZvcmNlX2ZpZWxkX3VzZXJcclxuICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsNC60YLQuNCy0LjRgNGD0LXRgiDRgdC40LvQvtCy0L7QtSDQv9C+0LvQtVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTc6IC8vINC40L3QstC40LdcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbdXNlcl9pbmRleF0gPSBkYXRhLnVzZXJuYW1lXHJcbiAgICAgICAgICBpZiAobXlfbmFtZSAhPSBkYXRhLnVzZXJuYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBjZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTg6IC8vINCx0L7QtdCy0LDRjyDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWRhcHRpdmVfZmlnaHRpbmcgPSAtMTtcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCw0LrRgtC40LLQuNGA0YPQtdGCINCx0L7QtdCy0YPRjiDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTk6IC8vINC70LDQutC4INGI0L7RglxyXG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBsdWNreV9zaG90X3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLnJvbGwgPT0gNykge1xyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KPQtNCw0YfQsCDQsdC70LDQs9C+0LLQvtC70LjRgiBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINC60L7RgtC+0YDRi9C5INC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwIFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5yb2xsICsgXCIg0Y3RgtC+INC90LUg0YfQuNGB0LvQviBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINGC0LDQuiDRh9GC0L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINC40LfQsdC10LPQsNC10YIg0LDRgtCw0LrQuC5cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyMDogLy8gbG90dGVyeV9zaG90XHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGxvdHRlcnlfc2hvdF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGF0YS5yb2xsID09IDcpIHtcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZSlcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCa0LDQutCw0Y8g0YPQtNCw0YfQsCEg0KTQvtGA0YLRg9C90LAg0Y/QstC90L4g0L3QsCDRgdGC0L7RgNC+0L3QtSBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINC60L7RgtC+0YDRi9C5INC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwIFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yb2xsID09IDc3KSB7XHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQlNC20LXQutC/0L7RgiEgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINGB0LXQs9C+0LTQvdGPINGB0YLQvtC40YIg0LrRg9C/0LjRgtGMINC70L7RgtC10YDQtdC50L3Ri9C5INCx0LjQu9C10YIsINCwINC/0L7QutCwINC+0L0g0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAgXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBkYXRhLnJvbGwgKyBcIiDRjdGC0L4g0L3QtSDRh9C40YHQu9C+IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiwg0YLQsNC6INGH0YLQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0LjQt9Cx0LXQs9Cw0LXRgiDQsNGC0LDQutC4LlwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIxOiAvL9Cy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40LlcclxuICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSArIGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gYWN0aW9uX3NwbGFzaF9zdGFtaW5hX2Nvc3QqZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIGFjdGlvbl9zcGxhc2hfb2JqZWN0ID0ge31cclxuICAgICAgICAgIGFjdGlvbl9zcGxhc2hfb2JqZWN0LmNvb2xkb3duID0gYWN0aW9uX3NwbGFzaF9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5hY3Rpb25fc3BsYXNoID0gYWN0aW9uX3NwbGFzaF9vYmplY3RcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINCy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40Lkg0Lgg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9ucyArIFwiINC+0YHQvdC+0LLQvdGL0YUg0LTQtdC50YHRgtCy0LjQuSDQstC80LXRgdGC0L4g0LHQvtC90YPRgdC90YvRhS5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIyOiAvLyDQs9GA0LDQtCDRg9C00LDRgNC+0LJcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHB1bmNoX3JhaW5mYWxsX3N0YW1pbmFfY29zdCpkYXRhLnRvdGFsX2F0dGFja3NcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChkYXRhLmRhbWFnZSA+IDApIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L3QsNC90L7RgdC40YIg0LPRgNCw0LQg0LjQtyBcIiArIGRhdGEudG90YWxfYXR0YWNrcyArIFwiINGD0LTQsNGA0L7Qsiwg0LjQtyDQutC+0YLQvtGA0YvRhSBcIiArIGRhdGEuc3VjY2Vzc2Z1bGxfYXR0YWNrcyArIFwiINC/0L7Qv9Cw0LTQsNGO0YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90LDQvdC+0YHRjyBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsC5cIlxyXG5cclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjM6IC8vINCw0LTRgNC10L3QsNC70LjQvdC+0LLRi9C5INC/0L7RgtC+0L9cclxuICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXRfaW5kZXggPSBkYXRhLnRhcmdldF9pbmRleFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pbmRleF1cclxuICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zWzBdXHJcbiAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF90YXJnZXQgPSB7fVxyXG4gICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0LmV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldC50dXJuID0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaW5kZXhdLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldCA9IGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldFxyXG5cclxuICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF91c2VyID0ge31cclxuICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBwb2lzb25vdXNfYWRyZW5hbGluZV9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyID0gYWRyZW5hbGluZV9vYmplY3RfdXNlclxyXG5cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0LjRgdC/0L7Qu9GM0LfRg9C10YIg0LDQtNGA0LXQvdCw0LvQuNC90L7QstGL0Lkg0L/QvtGC0L7Qvy4gXCIgICsgdGFyZ2V0Lm5hbWUgKyBcIiDQv9C+0LvRg9GH0LDQtdGCIFwiICsgZGF0YS5leHRyYV9hY3Rpb25zWzBdICsgXCIg0LTQtdC50YHRgtCy0LjQuSDQsiDRjdGC0L7RgiDRhdC+0LQsINC4IFwiICsgZGF0YS5leHRyYV9hY3Rpb25zWzFdICsgXCIg0LIg0YHQu9C10LTRg9GO0YnQuNC5LiDQrdGC0L4g0LHRg9C00LXRgiDRgdGC0L7QuNGC0Ywg0LbQuNC30L3QtdC5INC4INCy0YvQvdC+0YHQu9C40LLQvtGB0YLQuCwg0LjRgdC/0L7Qu9GM0LfRg9C50YLQtSDRgSDRg9C80L7QvC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG5cclxuICAgICAgY2FzZSAyNDogLy8g0LrQuNGB0LvQvtGC0L3QsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGFjaWRfYm9tYl9zdGFtaW5hX2Nvc3RcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LHRgNC+0YHQsNC10YIg0LrQuNGB0LvQvtGC0L3Rg9GOINCz0YDQsNC90LDRgtGDLiDQkCDQvtC90Lgg0YLQvtC70YzQutC+INC60YPQv9C40LvQuCDQvdC+0LLRi9C1INC00L7RgdC/0LXRhdC4Li4uXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICB2YXIgYWNpZF9ib21iX3VzZXIgPSB7fVxyXG4gICAgICAgICAgYWNpZF9ib21iX3VzZXIuY29vbGRvd24gPSBhY2lkX2JvbWJfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWNpZF9ib21iX3VzZXIgPSBhY2lkX2JvbWJfdXNlclxyXG5cclxuICAgICAgICAgIGFwcGx5X2FjaWRfYm9tYihkYXRhLnBvc2l0aW9uLCBhY2lkX2JvbWJfcmFkaXVzKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyNTogLy8g0LfQsNC80LjQvdC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluY2x1ZGVzKGRhdGEucG9zaXRpb24pKSB7XHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMucHVzaChkYXRhLnBvc2l0aW9uKVxyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1tkYXRhLnBvc2l0aW9uXSA9IFtdXHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW2RhdGEucG9zaXRpb25dLnB1c2goZGF0YS5wbGF5ZXJfbmFtZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI2OiAvLyDQvtCx0LXQt9Cy0YDQtdC00LjRgtGMINC80LjQvdGDXHJcblxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHN3aXRjaChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImVtcHR5XCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KEg0YfQtdC8IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQvtCy0LDRgtGMP1wiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZhaWxcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9C+0L/Ri9GC0LDQu9GB0Y8g0L7QsdC10LfQstGA0LXQtNC40YLRjCDQvNC40L3Rgywg0L3QviDQvdC1INGB0YPQvNC10LsuXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtaW5lX3Bvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgbWluZV9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBjZWxsLnNyYyA9IGZvZ09yUGljKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5kZXhPZihtaW5lX3Bvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLnNwbGljZShpbmRleCwxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1ttaW5lX3Bvc2l0aW9uXSA9IFtdXHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LfQsNC/0YDQtdGJ0LDQtdGCINC80LjQvdC1INCy0LfRgNGL0LLQsNGC0YzRgdGPIVwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN3aXRjaCDQvtCx0LXQstC30YDQtdC20LXQvdC40Y8g0L/QvtGI0LXQuyDQvdC1INGC0LDQulwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI3OiAvLyDQvdC40LrQvtGC0LjQvdC+0LLRi9C5INGD0LTQsNGAXHJcbiAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIGZ1bGxfaHAgPSBIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbdXNlcl9pbmRleF0gLSBmdWxsX2hwICogdG9iYWNjb19zdHJpa2VfaHBfcGVyY2VudGFnZVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9pbmRleF0gKyB0b2JhY2NvX3N0cmlrZV9ib251c1xyXG4gICAgICAgICAgdmFyIHRvYmFjY29fc3RyaWtlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICB0b2JhY2NvX3N0cmlrZV9vYmplY3QuY29vbGRvd24gPSB0b2JhY2NvX3N0cmlrZV9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS50b2JhY2NvX3N0cmlrZSA9IHRvYmFjY29fc3RyaWtlX29iamVjdFxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGF0L7RgNC+0YjQtdGH0L3QviDQt9Cw0YLRj9Cz0LjQstCw0LXRgtGB0Y8uINCR0LXRgNC10LPQuNGC0LXRgdGMIVwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI4OiAvLyDQutGA0YPRh9C10L3Ri9C1INC/0YPQu9C4XHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBjdXJ2ZWRfYnVsbGV0c19zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGF0YS5jb3Zlcl9sZXZlbCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwi0KPRgNC+0LLQtdC90Ywg0YPQutGA0YvRgtC40Y86IFwiICsgZGF0YS5jb3Zlcl9sZXZlbFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwiXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0LfQsNC60YDRg9GC0LjRgtGMINC/0YPQu9GOINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0LfQsNC60YDRg9GC0LjRgtGMINC/0YPQu9GOINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC30LDQutGA0YPRgtC40Lsg0L/Rg9C70Y4gXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQt9Cw0LrRgNGD0YLQuNC7INC/0YPQu9GOIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCLQutGA0YPRh9C10L3QvtC5INC/0YPQu9C10LksINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZ1bGxfY292ZXJcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0J3QtdGB0LzQvtGC0YDRjyDQvdCwINC/0L7Qv9GL0YLQutGDIFwiICsgYXR0YWNrZXIubmFtZSArIFwiINC+0LHQutGA0YPRgtC40YLRjCDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1INC30LDRidC40YnQsNGO0YnQtdC1IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0YLQvtGCINCy0YHQtSDRgNCw0LLQvdC+INC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI5OiAvLyDQn9GA0LjRhtC10LvQuNGC0YzRgdGPXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgYWltX29iamVjdCA9IHt9XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFpbSA9IGFpbV9vYmplY3RcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGFsZXJ0KFwiUmVjZWl2ZWQgdW5rbm93biBza2lsbCBjb21tYW5kXCIpXHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbmV3X3JvdW5kX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IFwi0J3QsNGH0LDQu9C+INC90L7QstC+0LPQviDRgNCw0YPQvdC00LAhXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXSAhPT0gbnVsbCAmJiBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBzd2l0Y2ggKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImdhc19ib21iXCI6XHJcbiAgICAgICAgICAgICAgICBhcHBseV9ib21iKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnBvc2l0aW9uLCBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5yYWRpdXMpXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzID49IDQpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX29iamVjdF9jb21tYW5kKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzICsgMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NlZCB1cCByZXNvbHZpbmcgdGVycmFpbiBlZmZlY3RzXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2ldXHJcbiAgICAgICAgaWYgKGNoYXJhY3RlciAhPT0gdW5kZWZpbmVkICYmIGNoYXJhY3RlciAhPT0gbnVsbCAmJiBjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gIT09IG51bGwgJiYgY2hhcmFjdGVyX3N0YXRlLkhQW2ldID4gMCkge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtpXSA9IDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbaV0gPSAwXHJcbiAgICAgICAgICBhc3NpZ25fbW92ZXMoaSlcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSBib251c19hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IG1haW5fYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJ0aXJlZFwiKSkgeyAvLyDQo9Cx0YDQsNGC0Ywg0LHQvtC90YPRgdGLINC+0YIg0YPRgdGC0LDQu9C+0YHRgtC4INC/0YDQvtGI0LvQvtCz0L4g0YXQvtC00LAgKNGH0YLQvtCx0Ysg0LrQvtCz0LTQsCDQsdGD0LTRg9GCINC90LDQutCw0LvQsNC00YvQstCw0YLRjNGB0Y8g0L3QvtCy0YvQtSDQvdC1INGI0YLRgNCw0YTQvtCy0LDRgtGMINC00LLQsNC20LTRiylcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkLmJvbnVzXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIDwgc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdICogMC42Nykge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPCBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0gKiAwLjM0KSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIDw9IDApIHsgLy8gM9GPINGB0YLQsNC00LjRj1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpcmVkX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICB0aXJlZF9vYmplY3QuYm9udXMgPSAtM1xyXG4gICAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LnN0YWdlID0gM1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50aXJlZCA9IHRpcmVkX29iamVjdFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSAzXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSowLjI1KVxyXG4gICAgICAgICAgICAgICAgaWYgKChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPT0gMSkmJihjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID09IDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSAwXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gMVxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gMtGPINGB0YLQsNC00LjRj1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpcmVkX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICB0aXJlZF9vYmplY3QuYm9udXMgPSAtMlxyXG4gICAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LnN0YWdlID0gMlxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50aXJlZCA9IHRpcmVkX29iamVjdFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSAyXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSowLjUpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyAx0Y8g0YHRgtCw0LTQuNGPXHJcbiAgICAgICAgICAgICAgdmFyIHRpcmVkX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LmJvbnVzID0gLTFcclxuICAgICAgICAgICAgICB0aXJlZF9vYmplY3Quc3RhZ2UgPSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50aXJlZCA9IHRpcmVkX29iamVjdFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldIC0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldKjAuNzUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInRpcmVkXCIpKSB7IC8vINC90LUg0YPRgdGC0LDQuyAtPiDRg9Cx0YDQsNGC0Ywg0YPRgdGC0LvQsNC70L7RgdGC0Ywg0LXRgdC70Lgg0LHRi9C70LBcclxuICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWRcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImxpZ2h0X3NvdW5kX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5saWdodF9zb3VuZF9ib21iX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmxpZ2h0X3NvdW5kX2JvbWJfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodCy0LXRgtC+0YjRg9C80L7QstCw0Y8g0LPRgNCw0L3QsNGC0LAg0YNcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LPQvtGC0L7QstCwINC6INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGOLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubGlnaHRfc291bmRfYm9tYl91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5saWdodF9zb3VuZF9ib21iX3VzZXIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFjdGlvbl9zcGxhc2hcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWN0aW9uX3NwbGFzaC5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWN0aW9uX3NwbGFzaFxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQstC90L7QstGMINC80L7QttC10YIg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINCy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40LkuXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY3Rpb25fc3BsYXNoLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY3Rpb25fc3BsYXNoLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3VzZXJcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JPQsNC30L7QstCw0Y8g0LPRgNCw0L3QsNGC0LAg0YNcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LPQvtGC0L7QstCwINC6INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGOLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfdXNlci5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYWNpZF9ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl91c2VyXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCa0LjRgdC70L7RgtC90LDRjyDQs9GA0LDQvdCw0YLQsCDRg1wiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQs9C+0YLQvtCy0LAg0Log0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3VzZXIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImZvcmNlX2ZpZWxkX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZm9yY2VfZmllbGRfdXNlci5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZm9yY2VfZmllbGRfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodC40LvQvtCy0L7QtSDQv9C+0LvQtSDRgyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvdC+0LLQsCDQt9Cw0YDRj9C20LXQvdC+LlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZm9yY2VfZmllbGRfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZm9yY2VfZmllbGRfdXNlci5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwicGljaF9waWNoX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCj0LzQtdC90LjQtSDQn9GL0Ykt0J/Ri9GJINGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC90L7QstCwINC00L7RgdGC0YPQv9C90L4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gPT0gcGljaF9waWNoX2Nvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gMFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwicGljaF9waWNoX3RhcmdldFwiKSkge1xyXG4gICAgICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdGFyZ2V0LmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldICsgMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF90YXJnZXRcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFkcmVuYWxpbmVfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZV91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hZHJlbmFsaW5lX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQo9C80LXQvdC40LUg0J/RgNC40LvQuNCyINCQ0LTRgNC10L3QsNC70LjQvdCwINGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC90L7QstCwINC00L7RgdGC0YPQv9C90L4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSkge1xyXG4gICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5haW1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImNoYXJnZV91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmNoYXJnZV91c2VyLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jaGFyZ2VfdXNlclxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY2hhcmdlX3VzZXIuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmNoYXJnZV91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJjdXRfbGltYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iX3VzZXJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iX3VzZXIuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iX3VzZXIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInBvaXNvbm91c19hZHJlbmFsaW5lX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCj0LzQtdC90LjQtSDQkNC00YDQtdC90LDQu9C40L3QvtCy0YvQuSDQn9C+0YLQvtC/INGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC90L7QstCwINC00L7RgdGC0YPQv9C90L4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFkcmVuYWxpbmVfdGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIG1pbnVzX2FjdGlvbnMgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdGFyZ2V0Lm1pbnVzX2FjdGlvbnNcclxuICAgICAgICAgICAgICB3aGlsZSAobWludXNfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChtaW51c19hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSAtIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldIC0gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbWludXNfYWN0aW9ucyA9IG1pbnVzX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdGFyZ2V0XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJwb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXRcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgdHVybiA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0LnR1cm5cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldC50dXJuID0gdHVybiArIDFcclxuICAgICAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0LmV4dHJhX2FjdGlvbnNbdHVybl1cclxuICAgICAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldICsgMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmICh0dXJuICsgMSA9PSBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2ldXHJcbiAgICAgICAgICAgICAgICB2YXIgbWF4X0hQID0gSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXVxyXG4gICAgICAgICAgICAgICAgdmFyIG1heF9zdGFtaW5hID0gc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgICAgICAgICAgICAgICB2YXIgSFBfY29zdCA9IHBvaXNvbm91c19hZHJlbmFsaW5lX2ZsYXRfSFAgKyBwYXJzZUludChwYXJzZUZsb2F0KG1heF9IUCkgKiBwb2lzb25vdXNfYWRyZW5hbGluZV9wZXJjZW50X0hQKVxyXG4gICAgICAgICAgICAgICAgdmFyIHN0YW1pbmFfY29zdCA9IHBvaXNvbm91c19hZHJlbmFsaW5lX2ZsYXRfc3RhbWluYSArIHBhcnNlSW50KHBhcnNlRmxvYXQobWF4X3N0YW1pbmEpICogcG9pc29ub3VzX2FkcmVuYWxpbmVfcGVyY2VudF9zdGFtaW5hKVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2ldID0gY2hhcmFjdGVyX3N0YXRlLkhQW2ldIC0gSFBfY29zdFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSAtIHN0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JDQtNGA0LXQvdCw0LvQuNC9INCyINC60YDQvtCy0LggXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINC30LDQutCw0L3Rh9C40LLQsNC10YLRgdGPLCDQvdCw0YHRgtGD0L/QsNC10YIg0L/QvtGF0LzQtdC70YzQtSAoXCIgKyBIUF9jb3N0ICsgXCIg0YXQvyDQuCBcIiArIHN0YW1pbmFfY29zdCArIFwiINCy0YvQvdC+0YHQu9C40LLQvtGB0YLQuClcIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInNob2NrZWRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZC5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtpXSArIDFcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJjdXRfbGltYlwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYi5kdXJhdGlvbiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY3V0X2xpbWJcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KHRg9GF0L7QttC40LvQuNGPIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQstC+0YHRgdGC0LDQvdC+0LLQuNC70LjRgdGMLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IC0xMFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY3V0X2xpbWIuZHVyYXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iLmR1cmF0aW9uIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJoZWFsZWRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGVhbGVkLmNvb2xkb3duID4gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXS8yXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldIC0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldIC0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGVhbGVkLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oZWFsZWQuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGVhbGVkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImJsaW5kXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJsaW5kLmNvb2xkb3duID4gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmxpbmQuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJsaW5kLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJsaW5kXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtpXSArIDJcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtpXSArIDFcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JfRgNC10L3QuNC1IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQstC+0YHRgdGC0LDQvdC+0LLQuNC70L7RgdGMXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcIk1hcmt1c19zdGFja3NcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5NYXJrdXNfc3RhY2tzID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5NYXJrdXNfc3RhY2tzIC0gMVxyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5NYXJrdXNfc3RhY2tzID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5NYXJrdXNfc3RhY2tzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInNoaWVsZF91cFwiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBNYXRoLmNlaWwoY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldLzIpXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNoaWVsZF91cC5zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0YDQvtC00L7Qu9C20LDQtdGCINC00LXRgNC20LDRgtGMINGJ0LjRgiAo0YHQv9Cw0YHQuNCx0L4pXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJiaWdfYnJvXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm8uY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtpXSAtIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyby5ib251c19LRFxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm9cclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YLQtdGA0Y/QtdGCINC30LDRidC40YLRgyDQkdC+0LvRjNGI0L7Qs9C+INCR0YDQsNGC0LBcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm8uY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm8uY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInRvYmFjY29fc3RyaWtlXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRvYmFjY29fc3RyaWtlLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50b2JhY2NvX3N0cmlrZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRvYmFjY29fc3RyaWtlLmNvb2xkb3duID09IHRvYmFjY29fc3RyaWtlX2Nvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tpXSAtIHRvYmFjY29fc3RyaWtlX2JvbnVzXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udG9iYWNjb19zdHJpa2UuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRvYmFjY29fc3RyaWtlLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJhY2lkX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uZHVyYXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtpXSArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3BvaXNvbi5ib251c19LRFxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb25cclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JHRgNC+0L3RjyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0L3QsNC60L7QvdC10YYg0LLQvtGB0YHRgtCw0L3QvtCy0LjQu9Cw0YHRjFwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3BvaXNvbi5kdXJhdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3BvaXNvbi5kdXJhdGlvbiAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbFxyXG4gICAgICAgICAgICB3aGlsZSAoY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgLy9jaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gLSBnYXNfYm9tYl9tb3ZlX3JlZHVjdGlvblxyXG4gICAgICAgICAgICAgIGlmIChjb3VudCAlIDIgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldIC0gMVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSAtIDFcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY291bnQgPSBjb3VudCAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc2F2ZV9yb2xsID0gZGF0YS5zYXZlX3JvbGxfbGlzdFtpXVxyXG4gICAgICAgICAgICBpZiAoc2F2ZV9yb2xsID49IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCAtIDFcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LrQuNC00LDQtdGCINGB0L/QsNGB0LHRgNC+0YHQvtC6INC4INGD0LzQtdC90YzRiNCw0LXRgiDRgdGC0LDQtNC40Y4g0L7RgtGA0LDQstC70LXQvdC40Y8gKNGC0LXQv9C10YDRjCBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GA0L7QstCw0LvQuNCy0LDQtdGCINGB0L/QsNGB0LHRgNC+0YHQvtC6LiDQodGC0LDQtNC40Y8g0L7RgtGA0LDQstC70LXQvdC40Y8g0L7RgdGC0LDQtdGC0YHRjyDQv9GA0LXQttC90LXQuSAoXCIgKyBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsIDw9IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb25cclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LHQvtC70YzRiNC1INC90LUg0L7RgtGA0LDQstC70LXQvSFcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwibWVsZWVkXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLm1lbGVlZC5jb29sZG93biA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubWVsZWVkXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtpXSArIDFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLm1lbGVlZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubWVsZWVkLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gJ3NuaXBlcicpIHtcclxuICAgICAgICAgICAgdmFyIGVmZmVjdHNfb2JqZWN0ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXVxyXG4gICAgICAgICAgICBpZiAoZWZmZWN0c19vYmplY3QuaGFzT3duUHJvcGVydHkoXCJzbmlwZXJfcGFzc2l2ZVwiKSkge1xyXG4gICAgICAgICAgICAgIHZhciBjdXJyZW50X2F0dGFja19ib251cyA9IGVmZmVjdHNfb2JqZWN0LnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251c1xyXG4gICAgICAgICAgICAgIHZhciBjdXJyZW50X2RhbWFnZV9ib251cyA9IGVmZmVjdHNfb2JqZWN0LnNuaXBlcl9wYXNzaXZlLmRhbWFnZV9ib251c1xyXG4gICAgICAgICAgICAgIGlmIChjdXJyZW50X2F0dGFja19ib251cyA9PSAtNSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19hdHRhY2tfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2RhbWFnZV9ib251cyA9IDBcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19hdHRhY2tfYm9udXMgPSBNYXRoLm1pbihjdXJyZW50X2F0dGFja19ib251cyArIDEsIDQpXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2RhbWFnZV9ib251cyA9IE1hdGgubWluKGN1cnJlbnRfZGFtYWdlX2JvbnVzICsgMiwgOClcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gLSBjdXJyZW50X2F0dGFja19ib251cyArIG5ld19hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tpXSAtIGN1cnJlbnRfZGFtYWdlX2JvbnVzICsgbmV3X2RhbWFnZV9ib251c1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc25pcGVyX3Bhc3NpdmUuYXR0YWNrX2JvbnVzID0gbmV3X2F0dGFja19ib251c1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc25pcGVyX3Bhc3NpdmUuZGFtYWdlX2JvbnVzID0gbmV3X2RhbWFnZV9ib251c1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBzbmlwZXJfcGFzc2l2ZV9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5hdHRhY2tfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmRhbWFnZV9ib251cyA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNuaXBlcl9wYXNzaXZlID0gc25pcGVyX3Bhc3NpdmVfb2JqZWN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdiYXR0bGVfbW9kX3Jlc3BvbnNlJykge1xyXG4gICAgICBnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPSBkYXRhLnZhbHVlXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMCkge1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gXCLQkdC+0Lkg0L7QutC+0L3Rh9C10L0hINCd0LDRgdGC0YPQv9C40Lsg0LzQuNGAINCy0L4g0LLRgdC10Lwg0LzQuNGA0LVcIlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gXCLQndCw0YfQsNC70L4g0LHQvtGPISDQm9GO0LTQuCDRg9C80LjRgNCw0Y7Rgiwg0LXRgdC70Lgg0LjRhSDRg9Cx0LjRgtGMXCJcclxuICAgICAgfVxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAncmVzb2x2ZV9hdHRhY2tfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmF0dGFja190eXBlID09IFwicmFuZ2VkXCIpIHtcclxuICAgICAgICB2YXIgYXVkaW8gPSBndW5zaG90X2F1ZGlvXHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5hdHRhY2tfdHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgICAgICB2YXIgYXVkaW8gPSBzd29yZF9hdWRpb1xyXG4gICAgICB9IGVsc2Ugey8vIGRlZmF1bHQgaW5jbHVkaW5nIGVuZXJneSBhbmQgdGhyb3dpbmdcclxuICAgICAgICB2YXIgYXVkaW8gPSBzdXJpa2VuX2F1ZGlvXHJcbiAgICAgIH1cclxuICAgICAgYXVkaW8ucGxheSgpO1xyXG5cclxuICAgICAgaWYgKGRhdGEudXNlcl9pbnZpc2liaWxpdHlfZW5kZWQgPT0gMSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5hdHRhY2tlcl9pZF0gPSBcImFsbFwiXHJcbiAgICAgICAgdmFyIGF0dGFja2VyX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgZGF0YS5hdHRhY2tlcl9wb3NpdGlvbik7XHJcbiAgICAgICAgYXR0YWNrZXJfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmF0dGFja2VyX2lkXS5hdmF0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuYXR0YWNrZXJfaWRdXHJcbiAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtkYXRhLmF0dGFja2VyX2lkXSA9IDFcclxuXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuYXR0YWNrZXJfaWRdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5hdHRhY2tlcl9pZF0gLSBzdGFtaW5hX2F0dGFja19jb3N0XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEuYXR0YWNrZXJfaWRdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEuYXR0YWNrZXJfaWRdIC0gMVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5jb3Zlcl9sZXZlbCA+IDApIHtcclxuICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCLQo9GA0L7QstC10L3RjCDRg9C60YDRi9GC0LjRjzogXCIgKyBkYXRhLmNvdmVyX2xldmVsXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwiXCJcclxuICAgICAgfVxyXG4gICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlICE9ICdyb2d1ZScpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY292ZXJcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINCw0YLQsNC60L7QstCw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QviDRgtC+0YIg0L3QsNGF0L7QtNC40YLRgdGPINCyINC/0L7Qu9C90L7QvCDRg9C60YDRi9GC0LjQuC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2VhcmNoX2FjdGlvbl9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgIHB1c2hUb0xpc3QoZGF0YS5jaGFyYWN0ZXJfbmFtZSArICcg0LHRgNC+0YHQuNC7ICcgKyBkYXRhLnJvbGwgKyAnINC90LAg0LLQvdC40LzQsNGC0LXQu9GM0L3QvtGB0YLRjCDQsiDQt9C+0L3QtSAnICsgZGF0YS56b25lX251bWJlcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIDFcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEubWluZXNfZGV0ZWN0ZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5jaGFyYWN0ZXJfbmFtZSArIFwiINC+0LHQvdCw0YDRg9C20LjQstCw0LXRgiBcIiArIGRhdGEubWluZXNfZGV0ZWN0ZWQubGVuZ3RoICsgXCIg0LzQuNC9INGA0Y/QtNC+0Lwg0YEg0YHQvtCx0L7QuVwiXHJcbiAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5taW5lc19kZXRlY3RlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIG1pbmUgPSBkYXRhLm1pbmVzX2RldGVjdGVkW2ldXHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW21pbmVdLnB1c2goZGF0YS5wbGF5ZXJfbmFtZSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxudmFyIGNyZWF0ZV9ib2FyZF9idXR0b24gPSAkKENSRUFURV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5jcmVhdGVfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGNyZWF0ZUJvYXJkKTtcclxuY3JlYXRlX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgc2F2ZV9ib2FyZF9idXR0b24gPSAkKFNBVkVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxuc2F2ZV9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgc2F2ZUJvYXJkKTtcclxuc2F2ZV9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGxvYWRfYm9hcmRfYnV0dG9uID0gJChMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxvYWRfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGxvYWRCb2FyZCk7XHJcbmxvYWRfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciByb2xsX2luaXRpYXRpdmVfYnV0dG9uID0gJChST0xMX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SKTtcclxucm9sbF9pbml0aWF0aXZlX2J1dHRvbi5vbignY2xpY2snLCByb2xsSW5pdGlhdGl2ZSk7XHJcbnJvbGxfaW5pdGlhdGl2ZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGZvZ19idXR0b24gPSAkKEZPR19CVVRUT05fU0VMRUNUT1IpO1xyXG5mb2dfYnV0dG9uLm9uKCdjbGljaycsIGZvZ01vZGVDaGFuZ2UpO1xyXG5mb2dfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciB6b25lX2J1dHRvbiA9ICQoWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG56b25lX2J1dHRvbi5vbignY2xpY2snLCB6b25lTW9kZUNoYW5nZSk7XHJcbnpvbmVfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBjaGF0X2J1dHRvbiA9ICQoQ0hBVF9CVVRUT05fU0VMRUNUT1IpO1xyXG5jaGF0X2J1dHRvbi5vbignY2xpY2snLCBjaGFuZ2VDaGF0VmlzaWJpbGl0eSk7XHJcblxyXG52YXIgbWlycm9yX2J1dHRvbiA9ICQoTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUik7XHJcbm1pcnJvcl9idXR0b24ub24oJ2NsaWNrJywgbWlycm9yX2JvYXJkKTtcclxubWlycm9yX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgbmV4dF9yb3VuZF9idXR0b24gPSAkKE5FWFRfUk9VTkRfQlVUVE9OX1NFTEVDVE9SKTtcclxubmV4dF9yb3VuZF9idXR0b24ub24oJ2NsaWNrJywgc3RhcnRfbmV3X3JvdW5kKTtcclxubmV4dF9yb3VuZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGJhdHRsZV9tb2RfYnV0dG9uID0gJChCQVRUTEVfTU9EX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmJhdHRsZV9tb2RfYnV0dG9uLm9uKCdjbGljaycsIGNoYW5nZV9iYXR0bGVfbW9kKTtcclxuYmF0dGxlX21vZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHN5bmNfYnV0dG9uID0gJChTWU5DX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnN5bmNfYnV0dG9uLm9uKCdjbGljaycsIHN5bmNfYm9hcmQpO1xyXG5zeW5jX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgbGFuZG1pbmVfYnV0dG9uID0gJChMQU5ETUlORV9CVVRUT05fU0VMRUNUT1IpO1xyXG5sYW5kbWluZV9idXR0b24ub24oJ2NsaWNrJywgc2hvd19sYW5kbWluZXMpO1xyXG5cclxudmFyIGZvZ196b25lX2J1dHRvbiA9ICQoRk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxuZm9nX3pvbmVfYnV0dG9uLm9uKCdjbGljaycsIGZvZ0N1cnJlbnRab25lKTtcclxuZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciB1bmZvZ196b25lX2J1dHRvbiA9ICQoVU5GT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG51bmZvZ196b25lX2J1dHRvbi5vbignY2xpY2snLCB1bmZvZ0N1cnJlbnRab25lKTtcclxudW5mb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHpvbmVfbnVtYmVyX3NlbGVjdCA9ICQoWk9ORV9OVU1CRVJfU0VMRUNUT1IpO1xyXG56b25lX251bWJlcl9zZWxlY3QuaGlkZSgpO1xyXG5mb3IgKGxldCBpID0gMTsgaSA8IE1BWF9aT05FUzsgaSsrKSB7XHJcbiAgdmFyIGN1cnJlbnRfb3B0aW9uID0gJChcIjxvcHRpb24+XCIpO1xyXG4gIGN1cnJlbnRfb3B0aW9uLnRleHQoJ9CX0L7QvdCwICcgKyBpKTtcclxuICBjdXJyZW50X29wdGlvbi52YWwoaSk7XHJcbiAgem9uZV9udW1iZXJfc2VsZWN0LmFwcGVuZChjdXJyZW50X29wdGlvbik7XHJcbn1cclxuXHJcbnZhciBzZWFyY2hfbW9kaWZpY2F0b3IgPSAkKFNFQVJDSF9NT0RJRklDQVRPUl9TRUxFQ1RPUik7XHJcbnNlYXJjaF9tb2RpZmljYXRvci5oaWRlKCk7XHJcblxyXG52YXIgbm90aWZpY2F0aW9uc19saXN0ID0gJChOT1RJRklDQVRJT05TX0xJU1RfU0VMRUNUT1IpO1xyXG5mb3IgKGxldCBpID0gMDsgaSA8IENIQVRfQ0FTSDsgaSsrKSB7XHJcbiAgdmFyIGN1cnJlbnRfZWxlbWVudCA9ICQoXCI8bGk+XCIpO1xyXG4gIGN1cnJlbnRfZWxlbWVudC5hdHRyKCdkYXRhLW5hbWUnLCAnbm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIGkpO1xyXG4gIGN1cnJlbnRfZWxlbWVudC5hdHRyKCdjbGFzcycsICdub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudCcpO1xyXG4gIG5vdGlmaWNhdGlvbnNfbGlzdC5hcHBlbmQoY3VycmVudF9lbGVtZW50KTtcclxufVxyXG5cclxudmFyIGJvYXJkX3NpemVfaW5wdXQgPSAkKEJPQVJEX1NJWkVfSU5QVVRfU0VMRUNUT1IpO1xyXG5ib2FyZF9zaXplX2lucHV0LmhpZGUoKTtcclxuXHJcbnZhciBzYXZlX25hbWVfaW5wdXQgPSAkKFNBVkVfTkFNRV9JTlBVVF9TRUxFQ1RPUik7XHJcbnNhdmVfbmFtZV9pbnB1dC5oaWRlKCk7XHJcblxyXG52YXIgbm90aWZpY2F0aW9uc19jb250YWluZXIgPSAkKE5PVElGSUNBVElPTlNfQ09OVEFORVJfU0VMRUNUT1IpO1xyXG5ub3RpZmljYXRpb25zX2NvbnRhaW5lci5oaWRlKCk7XHJcblxyXG52YXIgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyID0gJChDSEFSQUNURVJfSU5GT19DT05UQU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgd2VhcG9uX2luZm9fY29udGFpbmVyID0gJChXRUFQT05fSU5GT19DT05UQU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgaW5pdGlhdGl2ZV9vcmRlcl9jb250YWluZXIgPSAkKElOSVRJQVRJVkVfT1JERVJfQ09OVEFORVJfU0VMRUNUT1IpO1xyXG5cclxudmFyIHNraWxsX21vZGFsID0gJChTS0lMTF9NT0RBTF9TRUxFQ1RPUik7XHJcblxyXG52YXIgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyID0gJChTS0lMTF9ERVNDUklQVElPTl9DT05UQUlORVJfU0VMRUNUT1IpO1xyXG5cclxudmFyIHNraWxsX21vZGFsX2NvbnRlbnQgPSAkKFNLSUxMX01PREFMX0NPTlRFTlRfU0VMRUNUT1IpO1xyXG5cclxudmFyIG5leHRfcGFnZV9idXR0b25fY29udGFpbmVyID0gJChORVhUX1BBR0VfQlVUVE9OX0NPTlRBSU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgc3BhbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGwtbW9kYWwtY2xvc2VcIik7XHJcblxyXG5zcGFuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBoaWRlX21vZGFsKCk7XHJcbn1cclxuXHJcbnNwYW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbndpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICBpZiAoZXZlbnQudGFyZ2V0LmlkID09IHNraWxsX21vZGFsLmF0dHIoJ2lkJykpIHtcclxuICAgIGhpZGVfbW9kYWwoKTtcclxuICB9XHJcbn1cclxuXHJcbmRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZTtcclxuICAgIC8vIHdcclxuICAgIGlmKGtleUNvZGUgPT0gODcpIHtcclxuICAgICAgICB3X29uY2xpY2soKVxyXG4gICAgfSBlbHNlIGlmIChrZXlDb2RlID09IDY1KSB7IC8vIGFcclxuICAgICAgYV9vbmNsaWNrKClcclxuICAgIH1cclxufTtcclxuXHJcbnNldEludGVydmFsKHJlY29ubmVjdCwgMTUqMTAwMClcclxuIiwibGV0IHNvY2tldDtcclxubGV0IHNlcnZlcl9hZGRyZXNzO1xyXG5sZXQgb25NZXNzYWdlRnVuY3Rpb247XHJcblxyXG5mdW5jdGlvbiBpbml0KHVybCkge1xyXG4gIHNlcnZlcl9hZGRyZXNzID0gdXJsO1xyXG4gIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUmVhZHkoKSB7XHJcbiAgcmV0dXJuIHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTlxyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnb3BlbicpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBvbk1lc3NhZ2VGdW5jdGlvbiA9IGhhbmRsZXJGdW5jdGlvbjtcclxuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKGRhdGEpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0KCkge1xyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICBvbk1lc3NhZ2VGdW5jdGlvbihkYXRhKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShwYXlsb2FkKSB7XHJcbiAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbml0KHNlcnZlcl9hZGRyZXNzKTtcclxuICAgIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIob25NZXNzYWdlRnVuY3Rpb24pO1xyXG4gICAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnTm90IHNlbmQsIGJ1dCByZWNvbm5lY3RlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgcmVnaXN0ZXJPcGVuSGFuZGxlcixcclxuICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyLFxyXG4gIHNlbmRNZXNzYWdlLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0LFxyXG4gIGlzUmVhZHlcclxufVxyXG4iXX0=
