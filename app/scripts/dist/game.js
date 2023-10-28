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

var safety_service_range = 2;
var safety_service_cooldown = 1;
var safety_service_duration = 1;
var safety_service_defensive_advantage = 1;
var safety_service_evade_bonus = 3;
var safety_service_bonus_actions_cost = 2;

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
      button.draggable = true;
      button.ondragover = function (event) {
        event.preventDefault();
      };
      button.ondragstart = function (event) {
        var cell = event.target;
        var index = cell.row * game_state.size + cell.column;
        var character_number = game_state.board_state[index];
        if (character_number > 0 && (my_role == "gm" || character_state.visibility[character_number] == 1) && (character_state.invisibility[character_number] == 'all' || character_state.invisibility[character_number] == my_name)) {
          choose_character_to_move(index, cell);
        }
      };
      button.ondrop = function (event) {
        var cell = event.target;
        var index = cell.row * game_state.size + cell.column;
        if (character_chosen.in_process == 1 && game_state.board_state[index] == 0) {
          move_character(index, cell);
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

function change_weapon(character_number, weapon_index) {
  character_state.current_weapon[character_number] = weapon_index;
  character_chosen.weapon_id = weapon_index;

  var weapon = weapon_detailed_info[weapon_index];

  var weapon_mini_display = document.getElementById("weapon_mini_display");
  weapon_mini_display.src = weapon.avatar;
}

function display_weapon_detailed(weapon_index, container, showImage) {
  var default_weapon = weapon_detailed_info[weapon_index];

  var weapon_range_display = document.createElement("h2");
  weapon_range_display.id = "weapon_range_display";
  weapon_range_display.innerHTML = "Дальность: " + default_weapon.range;

  var weapon_damage_display = document.createElement("h2");
  weapon_damage_display.id = "weapon_damage_display";
  weapon_damage_display.innerHTML = "Урон: " + default_weapon.damage[0] + 'd' + default_weapon.damage[1];

  var weapon_name_display = document.createElement("h2");
  weapon_name_display.id = "weapon_name_display";
  weapon_name_display.innerHTML = default_weapon.name;

  if (showImage) {
    var weapon_avatar_display = document.createElement("IMG");
    weapon_avatar_display.id = "weapon_avatar_display";
    weapon_avatar_display.src = default_weapon.avatar;
    weapon_avatar_display.style.width = '250px';
    weapon_avatar_display.style.height = '250px';
  }
  container.append(weapon_name_display);
  if (showImage) {
    container.append(weapon_avatar_display);
  }
  container.append(weapon_range_display);
  container.append(weapon_damage_display);
  container.show();
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

      //var weapon_select = document.createElement("select");
      //weapon_select.id = "weapon_chosen";

      var inventory = character.inventory;

      /*
      for (let i = 0; i < inventory.length; i++) {
        var current_option = document.createElement("option");
        current_option.innerHTML = weapon_list[inventory[i]];
        current_option.value = inventory[i];
        weapon_select.appendChild(current_option);
      }
      */

      /*
      var pick_weapon_button = document.createElement("button");
      pick_weapon_button.innerHTML = "Сменить оружие";
      pick_weapon_button.index = index;
      pick_weapon_button.onclick = function(event) {
        var weapon_select = document.getElementById("weapon_chosen")
        var weapon_index = weapon_select.value
          change_weapon(character_number, weapon_index)
      }
      */

      var default_weapon_index = character_state.current_weapon[character_number];
      character_chosen.weapon_id = default_weapon_index;
      var default_weapon = weapon_detailed_info[default_weapon_index];

      var weapon_mini_display = document.createElement("IMG");
      weapon_mini_display.id = "weapon_mini_display";
      weapon_mini_display.src = default_weapon.avatar;
      weapon_mini_display.style.width = '80px';
      weapon_mini_display.style.height = '80px';
      weapon_mini_display.onmouseenter = function (event) {
        var weapon_index = character_state.current_weapon[character_number];
        display_weapon_detailed(weapon_index, weapon_info_container, true);
      };

      weapon_mini_display.onmouseleave = function (event) {
        weapon_info_container.html("");
        weapon_info_container.hide();
      };

      weapon_mini_display.onclick = function () {
        show_weapon_modal(character_number, 0);
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

      /*
      var skill_select = document.createElement("select");
      skill_select.id = "skill_chosen";
      */

      var skillset = character.skillset;

      /*
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
      */

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
      //line5.appendChild(pick_weapon_button);
      //line5.appendChild(weapon_select);
      line6.appendChild(attack_button);
      line7.appendChild(simple_roll_button);
      //line9.appendChild(skill_button);
      //line9.appendChild(skill_select);

      button_list.appendChild(line1);
      if (my_role == "gm") {
        button_list.appendChild(line2);
        button_list.appendChild(line3);
        button_list.appendChild(line8);
      }
      button_list.appendChild(line4);
      //button_list.appendChild(line5);
      button_list.appendChild(line6);
      //button_list.appendChild(line9);
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

function show_weapon_modal(character_number, starting_index) {
  hide_modal();
  var character = character_detailed_info[character_number];
  var inventory = character.inventory;

  var weapon_table = $("<table>");
  var table_size = 3;

  for (var i = 0; i < table_size; i++) {
    var row = $("<tr>");
    for (var j = 0; j < table_size; j++) {
      var index = starting_index + table_size * i + j;
      if (index < inventory.length) {
        var weapon_number = inventory[index];
        var column = $("<th>");
        var weapon_icon = $("<IMG>");
        var avatar = QUESTION_IMAGE;
        if (weapon_detailed_info[weapon_number].hasOwnProperty('avatar')) {
          avatar = weapon_detailed_info[weapon_number].avatar;
        }
        weapon_icon.addClass('weapon_icon');
        weapon_icon.attr('width', '100px');
        weapon_icon.attr('weapon_number', weapon_number);
        weapon_icon.attr('height', '100px');
        weapon_icon.attr('src', avatar);
        weapon_icon.on('click', function (event) {
          var weapon_num = event.target.getAttribute('weapon_number');
          change_weapon(character_number, weapon_num);
          hide_modal();
        });
        weapon_icon.on('mouseenter', function (event) {
          var weapon_num = event.target.getAttribute('weapon_number');
          display_weapon_detailed(weapon_num, skill_description_container, false);
        });

        weapon_icon.on('mouseleave', function (event) {
          skill_description_container.html('');
        });
        column.append(weapon_icon);
        row.append(column);
      }
    }
    weapon_table.append(row);
  }
  skill_modal_content.append(weapon_table);

  if (inventory.length > starting_index + table_size * table_size) {
    // there are more skills to display
    var next_page_button = $("<IMG>");
    next_page_button.attr('width', '100px');
    next_page_button.attr('height', '50px');
    next_page_button.attr('src', RIGHT_ARROW_IMAGE);
    next_page_button.on("click", function (event) {
      show_weapon_modal(character_number, starting_index + table_size * table_size);
    });

    next_page_button_container.append(next_page_button);
  }
  skill_modal.show();
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

function weapon_damage_bonus(raw_damage, weapon, character_number) {
  var character = character_detailed_info[character_number];
  var total_damage = raw_damage;
  if (weapon.type == 'melee') {
    total_damage = total_damage + strength_damage_map[parseInt(character.strength)];
  } else if (weapon.type == 'throwing') {
    total_damage = total_damage + strength_damage_map[Math.ceil(parseInt(character.strength) / 2)];
  } else if (weapon.type == 'ranged') {
    if (character_state.special_effects[character_number].hasOwnProperty("aim") && weapon.hasOwnProperty("aim_bonus")) {
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

    if (weapon.hasOwnProperty("subtype") && weapon.subtype == "PP") {
      toSend.quick_attack_ready = true;
    }

    if (character_state.invisibility[user_character_number] != "all" && weapon.type != "throwing") {
      toSend.user_invisibility_ended = 1;
    }

    if (cover_modifier.isPossible) {
      var attack_roll = roll_attack(weapon.type, user_character_number, target_character_number, cover_modifier.advantage_bonus);
      if (attack_roll < 20) {
        // no crit
        if (weapon.type == "ranged") {
          var cumulative_attack_roll = attack_roll + parseInt(attacking_character.intelligence);
          if (character_state.special_effects[user_character_number].hasOwnProperty("aim")) {
            // Прицел даблит бонус попадания
            cumulative_attack_roll = cumulative_attack_roll + parseInt(attacking_character.intelligence);
            toSend.aim_over = 1;
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

    if (toSend.hasOwnProperty("damage_roll") && weapon.hasOwnProperty("subtype") && weapon.subtype == "drobovik") {
      var slow_scale = parseFloat(weapon.slow_scale);
      var full_hp = HP_values[parseInt(target_character.stamina)];
      var current_moves = character_state.move_action[target_character_number];
      var fraction = parseFloat(toSend.damage_roll) / parseFloat(full_hp);
      var move_reduction = current_moves * fraction * slow_scale;
      toSend.move_reduction = move_reduction;
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

      damage = weapon_damage_bonus(damage, weapon, character_number);
    } else {
      if (character_state.special_effects[target_number].hasOwnProperty("weakspot") && character_state.special_effects[target_number].weakspot.hunter_id == character_number) {
        switch (attack_roll) {
          case 18:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number);
            damage = damage * 2;
            break;
          case 19:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number);
            damage = damage * 2;
            break;
          case 20:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number);
            damage = damage * 5;
            break;
          default:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number);
        }
      } else {
        switch (attack_roll) {
          case 18:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number);
            break;
          case 19:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number);
            damage = damage * 2;
            break;
          case 20:
            damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, character_number);
            damage = damage * 3;
            break;
          default:
            for (var _i7 = 0; _i7 < weapon.damage[0]; _i7++) {
              damage = damage + roll_x(weapon.damage[1]);
            }
            damage = weapon_damage_bonus(damage, weapon, character_number);
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
    damage = weapon_damage_bonus(damage, weapon, character_number);

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

        if (cumulative_attack_roll > target_character_KD) {
          // Есть пробитие
          if (character_state.can_evade[target_character_number] == 1) {
            var evade_roll = roll_evasion(target_character, target_character_number);
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

    case 30:
      // быстрая атака
      if (character_state.bonus_action[character_number] > 0) {
        if (character_state.special_effects[character_number].hasOwnProperty("quick_attack_ready")) {
          choose_character_skill(skill_index, character_number, position, cell);
        } else {
          alert("Сперва нужно совершить основную атаку!");
        }
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 31:
      // служба спасения
      if (character_state.bonus_action[character_number] > 1) {
        // два бонусных
        if (!character_state.special_effects[character_number].hasOwnProperty("safety_service_user")) {
          choose_character_skill(skill_index, character_number, position, cell);
        } else {
          alert("Умение все еще на кулдауне");
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
      break;
    case 2:
      // Подрезать сухожилия
      cut_limbs(index, cell);
      break;
    case 3:
      // Слабое место
      weak_spot(index, cell);
      break;
    case 4:
      // Лечение
      heal(index, cell);
      break;
    case 5:
      // Большой брат
      big_bro(index, cell);
      break;
    case 7:
      // пожирание
      devour(index, cell);
      break;
    case 9:
      absolute_recovery(index, cell);
      break;
    case 12:
      gas_bomb(index, cell);
      break;
    case 13:
      light_sound_bomb(index, cell);
      break;
    case 14:
      shock_wave(index, cell);
      break;
    case 15:
      pich_pich_go(index, cell);
      break;
    case 16:
      force_field(index, cell);
      break;

    case 19:
      lucky_shot(index, cell);
      break;

    case 20:
      lottery_shot(index, cell);
      break;

    case 22:
      punch_rainfall(index, cell);
      break;

    case 23:
      poisonous_adrenaline(index, cell);
      break;

    case 24:
      acid_bomb(index, cell);
      break;

    case 26:
      diffuse_landmine(index, cell);
      break;
    case 28:
      curved_bullets(index, cell);
      break;
    case 30:
      quick_attack(index, cell);
      break;
    case 31:
      safety_service(index, cell);
      break;
    default:
      alert("Unknown targeted skill");
  }
  stop_skill();
}

function choose_character_skill(skill_index, character_number, position, cell) {
  character_chosen.in_process = 3;
  character_chosen.skill_id = skill_index;
  character_chosen.char_id = character_number;
  character_chosen.char_position = position;
  cell.src = "./images/Chidori.webp";
}

function safety_service(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  if (isInRange(index, user_position, safety_service_range)) {
    var target_character_number = game_state.board_state[index];
    if (!character_state.special_effects[target_character_number].hasOwnProperty("safety_service_target")) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id;
      toSend.room_number = my_room;
      toSend.user_index = user_character_number;
      toSend.target_id = target_character_number;
      _wsClient2.default.sendMessage(toSend);
    } else {
      alert("Эта цель уже под защитой");
    }
  } else {
    alert("Вы не можете защищать с такого расстояния");
  }
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

function quick_attack(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]];
  if (weapon.hasOwnProperty("subtype") && weapon.subtype == "PP") {
    var attacking_character = character_detailed_info[user_character_number];
    var bonus_attack = parseInt(attacking_character.intelligence) + character_state.attack_bonus[user_character_number] + character_state.universal_bonus[user_character_number];

    var accumulated_cover = get_accumulated_cover(index, user_position);
    var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon, accumulated_cover);
    if (toSend == null) {
      alert("Далековато");
    } else {
      toSend.damage_roll = toSend.damage_roll / 2; // быстрая атака наносит половину урона
      _wsClient2.default.sendMessage(toSend);
    }
  } else {
    alert("Быструю атаку можно совершить только пистолетом-пулеметом");
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

function curved_bullets(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]];
  var attacking_character = character_detailed_info[user_character_number];
  var bonus_attack = parseInt(attacking_character.intelligence) + character_state.attack_bonus[user_character_number] + character_state.universal_bonus[user_character_number];
  if (character_state.special_effects[user_character_number].hasOwnProperty("aim")) {
    bonus_attack = bonus_attack + parseInt(attacking_character.intelligence);
  }
  var accumulated_cover = get_accumulated_cover(index, user_position);
  accumulated_cover = Math.max(parseInt(parseFloat(accumulated_cover) / 2) - 2, 0);
  var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon, accumulated_cover);
  if (toSend == null) {
    alert("Далековато");
  } else {
    if (character_state.special_effects[user_character_number].hasOwnProperty("aim")) {
      toSend.aim_over = 1;
    }
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
        for (var _i10 = 0; _i10 < data.mines_exploded.length; _i10++) {
          var mine_position = data.mines_exploded[_i10];
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
      for (var _i11 = 0; _i11 < character_state.initiative.length; _i11++) {
        if (character_state.HP[_i11] > 0) {
          // character is present
          ordered_array.push(_i11);
        }
      }
      ordered_array.sort(compare_initiative);
      initiative_order_container.html("");

      var _loop = function _loop(_i12) {
        character = character_detailed_info[ordered_array[_i12]];
        query_string = '<img> id="initiative_image_' + _i12 + '"';
        img = $(query_string);

        img.attr('src', character.avatar);
        img.attr('height', '50px');
        img.attr('width', '50px');
        img.click(function () {
          var position = character_state.position[ordered_array[_i12]];
          var cell = document.getElementById('cell_' + position);
          //select_character(position, cell)
          no_shift_onclick(my_role, gm_control_mod, game_state, character_chosen.in_process, cell, position);
        });
        img.appendTo(initiative_order_container);
      };

      for (var _i12 = 0; _i12 < ordered_array.length; _i12++) {
        var character;
        var query_string;
        var img;

        _loop(_i12);
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
      for (var _i13 = 0; _i13 < index_list.length; _i13++) {
        game_state.zone_state[index_list[_i13]] = data.zone_number;
        game_state.search_modificator_state[index_list[_i13]] = data.modificator;
      }
    } else if (data.command == 'change_character_visibility_response') {
      character_state.visibility[data.character_number] = data.new_value;
    } else if (data.command == 'simple_roll_response') {
      var message = data.character_name + " бросает " + data.roll;
      pushToList(message);
    } else if (data.command == 'skill_response') {
      var user_index = data.user_index;
      character_state.has_moved[user_index] = 1;
      if (data.hasOwnProperty("aim_over")) {
        delete character_state.special_effects[user_index].aim;
      }
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

          for (var _i14 = 0; _i14 < data.outcome_list.length; _i14++) {
            var character_number = data.character_list[_i14];
            var character = character_detailed_info[character_number];
            if (data.outcome_list[_i14] == 0) {
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

          for (var _i15 = 0; _i15 < char_list.length; _i15++) {
            var character_number = char_list[_i15];
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

        case 30:
          // быстрая атака
          var attacker = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];
          character_state.has_moved[user_index] = 1;

          if (character_state.special_effects[user_index].hasOwnProperty("quick_attack_ready")) {
            delete character_state.special_effects[user_index].quick_attack_ready;
          }

          if (game_state.battle_mod == 1) {
            character_state.stamina[user_index] = character_state.stamina[user_index] - stamina_attack_cost;
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          }

          if (data.cover_level > 0) {
            var cover_string = "Уровень укрытия: " + data.cover_level;
          } else {
            var cover_string = "";
          }
          switch (data.outcome) {
            case "KD_block":
              var message = attacker.name + " быстро атакует " + target.name + " (" + data.attack_roll + "), но не пробивает броню. " + cover_string;
              pushToList(message);
              break;
            case "evaded":
              var message = attacker.name + " быстро атакует " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + "). " + cover_string;
              pushToList(message);
              if (target.special_type != 'rogue') {
                character_state.can_evade[data.target_id] = 0;
              }
              break;
            case "damage_without_evasion":
              var message = attacker.name + " успешно быстро атакует " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона. " + cover_string;
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              melee_penalty(data);
              break;
            case "damage_after_evasion":
              var message = attacker.name + " успешно быстро атакует " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона. " + cover_string;
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              character_state.can_evade[data.target_id] = 0;
              melee_penalty(data);
              break;
            case "full_crit":
              var message = attacker.name + " критически быстро атакует " + target.name + ", не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона. " + cover_string;
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              character_state.can_evade[data.target_id] = 0;
              melee_penalty(data);
              break;
            case "full_cover":
              var message = attacker.name + " пытался быстро атаковать " + target.name + " но тот находится в полном укрытии.";
              pushToList(message);
              break;
            default:
              console.log("fucked up resolving damage");
              break;
          }
          break;

        case 31:
          // служба спасения
          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - safety_service_bonus_actions_cost;
          }
          var savior = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];
          var message = savior.name + " не даст в обиду " + target.name;
          pushToList(message);
          character_state.defensive_advantage[data.target_id] = character_state.defensive_advantage[data.target_id] + safety_service_defensive_advantage;
          character_state.evade_bonus[data.target_id] = character_state.evade_bonus[data.target_id] + safety_service_evade_bonus;

          var safety_service_target_object = {};
          safety_service_target_object.duration = safety_service_duration;
          character_state.special_effects[data.target_id].safety_service_target = safety_service_target_object;

          var safety_service_user_object = {};
          safety_service_user_object.cooldown = safety_service_cooldown;
          character_state.special_effects[user_index].safety_service_user = safety_service_user_object;
          break;

        default:
          alert("Received unknown skill command");
      }
    } else if (data.command == 'new_round_response') {
      var message = "Начало нового раунда!";
      pushToList(message);

      for (var _i16 = 0; _i16 < game_state.terrain_effects.length; _i16++) {
        if (game_state.terrain_effects[_i16] !== null && game_state.terrain_effects[_i16] !== undefined) {
          switch (game_state.terrain_effects[_i16].type) {
            case "gas_bomb":
              apply_bomb(game_state.terrain_effects[_i16].position, game_state.terrain_effects[_i16].radius);
              if (game_state.terrain_effects[_i16].radius >= 4) {
                if (my_role == "gm") {
                  delete_object_command(game_state.terrain_effects[_i16].position);
                }
                game_state.terrain_effects[_i16] = null;
              } else {
                game_state.terrain_effects[_i16].radius = game_state.terrain_effects[_i16].radius + 1;
              }
              break;
            default:
              console.log("Messed up resolving terrain effects");
          }
        }
      }

      for (var _i17 = 1; _i17 < character_state.can_evade.length; _i17++) {
        character = character_detailed_info[_i17];
        if (character !== undefined && character !== null && character_state.HP[_i17] !== null && character_state.HP[_i17] > 0) {
          character_state.can_evade[_i17] = 1;
          character_state.has_moved[_i17] = 0;
          assign_moves(_i17);
          character_state.bonus_action[_i17] = bonus_action_map[character.agility];
          character_state.main_action[_i17] = main_action_map[character.agility];

          if (character_state.special_effects[_i17].hasOwnProperty("tired")) {
            // Убрать бонусы от усталости прошлого хода (чтобы когда будут накаладываться новые не штрафовать дважды)
            character_state.universal_bonus[_i17] = character_state.universal_bonus[_i17] - character_state.special_effects[_i17].tired.bonus;
          }

          if (character_state.stamina[_i17] < stamina_values[character.stamina] * 0.67) {
            if (character_state.stamina[_i17] < stamina_values[character.stamina] * 0.34) {
              if (character_state.stamina[_i17] <= 0) {
                // 3я стадия
                var tired_object = {};
                tired_object.bonus = -3;
                tired_object.stage = 3;
                character_state.special_effects[_i17].tired = tired_object;
                character_state.universal_bonus[_i17] = character_state.universal_bonus[_i17] - 3;
                character_state.move_action[_i17] = parseFloat(character_state.move_action[_i17] * 0.25);
                if (character_state.main_action[_i17] == 1 && character_state.bonus_action[_i17] == 1) {
                  character_state.bonus_action[_i17] = 0;
                } else {
                  character_state.bonus_action[_i17] = 1;
                  character_state.main_action[_i17] = 1;
                }
              } else {
                // 2я стадия
                var tired_object = {};
                tired_object.bonus = -2;
                tired_object.stage = 2;
                character_state.special_effects[_i17].tired = tired_object;
                character_state.universal_bonus[_i17] = character_state.universal_bonus[_i17] - 2;
                character_state.move_action[_i17] = parseFloat(character_state.move_action[_i17] * 0.5);
              }
            } else {
              // 1я стадия
              var tired_object = {};
              tired_object.bonus = -1;
              tired_object.stage = 1;
              character_state.special_effects[_i17].tired = tired_object;
              character_state.universal_bonus[_i17] = character_state.universal_bonus[_i17] - 1;
              character_state.move_action[_i17] = parseFloat(character_state.move_action[_i17] * 0.75);
            }
          } else if (character_state.special_effects[_i17].hasOwnProperty("tired")) {
            // не устал -> убрать устлалость если была
            delete character_state.special_effects[_i17].tired;
          }

          if (character_state.special_effects[_i17].hasOwnProperty("light_sound_bomb_user")) {
            if (character_state.special_effects[_i17].light_sound_bomb_user.cooldown == 0) {
              delete character_state.special_effects[_i17].light_sound_bomb_user;
              var message = "Светошумовая граната у" + character.name + " готова к использованию.";
              pushToList(message);
            } else {
              character_state.special_effects[_i17].light_sound_bomb_user.cooldown = character_state.special_effects[_i17].light_sound_bomb_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("action_splash")) {
            if (character_state.special_effects[_i17].action_splash.cooldown == 0) {
              delete character_state.special_effects[_i17].action_splash;
              var message = character.name + " вновь может использовать всплеск действий.";
              pushToList(message);
            } else {
              character_state.special_effects[_i17].action_splash.cooldown = character_state.special_effects[_i17].action_splash.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("safety_service_user")) {
            if (character_state.special_effects[_i17].safety_service_user.cooldown == 0) {
              delete character_state.special_effects[_i17].safety_service_user;
            } else {
              character_state.special_effects[_i17].safety_service_user.cooldown = character_state.special_effects[_i17].safety_service_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("safety_service_target")) {
            if (character_state.special_effects[_i17].safety_service_target.duration == 0) {
              character_state.defensive_advantage[_i17] = character_state.defensive_advantage[_i17] - safety_service_defensive_advantage;
              character_state.evade_bonus[_i17] = character_state.evade_bonus[_i17] - safety_service_evade_bonus;
              delete character_state.special_effects[_i17].safety_service_target;
            } else {
              character_state.special_effects[_i17].safety_service_target.duration = character_state.special_effects[_i17].safety_service_target.duration - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("gas_bomb_user")) {
            if (character_state.special_effects[_i17].gas_bomb_user.cooldown == 0) {
              delete character_state.special_effects[_i17].gas_bomb_user;
              var message = "Газовая граната у" + character.name + " готова к использованию.";
              pushToList(message);
            } else {
              character_state.special_effects[_i17].gas_bomb_user.cooldown = character_state.special_effects[_i17].gas_bomb_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("acid_bomb_user")) {
            if (character_state.special_effects[_i17].acid_bomb_user.cooldown == 0) {
              delete character_state.special_effects[_i17].acid_bomb_user;
              var message = "Кислотная граната у" + character.name + " готова к использованию.";
              pushToList(message);
            } else {
              character_state.special_effects[_i17].acid_bomb_user.cooldown = character_state.special_effects[_i17].acid_bomb_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("force_field_user")) {
            if (character_state.special_effects[_i17].force_field_user.cooldown == 0) {
              delete character_state.special_effects[_i17].force_field_user;
              var message = "Силовое поле у " + character.name + " снова заряжено.";
              pushToList(message);
            } else {
              character_state.special_effects[_i17].force_field_user.cooldown = character_state.special_effects[_i17].force_field_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("pich_pich_user")) {
            if (character_state.special_effects[_i17].pich_pich_user.cooldown == 0) {
              delete character_state.special_effects[_i17].pich_pich_user;
              var message = "Умение Пыщ-Пыщ у " + character.name + " снова доступно.";
              pushToList(message);
            } else {
              if (character_state.special_effects[_i17].pich_pich_user.cooldown == pich_pich_cooldown) {
                character_state.bonus_action[_i17] = 0;
              }
              character_state.special_effects[_i17].pich_pich_user.cooldown = character_state.special_effects[_i17].pich_pich_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("pich_pich_target")) {
            var extra_actions = character_state.special_effects[_i17].pich_pich_target.extra_actions;
            while (extra_actions > 0) {
              if (extra_actions % 2 == 0) {
                character_state.move_action[_i17] = character_state.move_action[_i17] + adrenaline_move_increase;
              } else {
                character_state.main_action[_i17] = character_state.main_action[_i17] + 1;
              }
              extra_actions = extra_actions - 1;
            }
            delete character_state.special_effects[_i17].pich_pich_target;
          }

          if (character_state.special_effects[_i17].hasOwnProperty("adrenaline_user")) {
            character_state.special_effects[_i17].adrenaline_user.cooldown = character_state.special_effects[_i17].adrenaline_user.cooldown - 1;
            if (character_state.special_effects[_i17].adrenaline_user.cooldown == 0) {
              delete character_state.special_effects[_i17].adrenaline_user;
              var message = "Умение Прилив Адреналина у " + character.name + " снова доступно.";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("aim")) {
            delete character_state.special_effects[_i17].aim;
          }

          if (character_state.special_effects[_i17].hasOwnProperty("charge_user")) {
            if (character_state.special_effects[_i17].charge_user.cooldown == 0) {
              delete character_state.special_effects[_i17].charge_user;
            } else {
              character_state.special_effects[_i17].charge_user.cooldown = character_state.special_effects[_i17].charge_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("cut_limb_user")) {
            if (character_state.special_effects[_i17].cut_limb_user.cooldown == 0) {
              delete character_state.special_effects[_i17].cut_limb_user;
            } else {
              character_state.special_effects[_i17].cut_limb_user.cooldown = character_state.special_effects[_i17].cut_limb_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("poisonous_adrenaline_user")) {
            character_state.special_effects[_i17].poisonous_adrenaline_user.cooldown = character_state.special_effects[_i17].poisonous_adrenaline_user.cooldown - 1;
            if (character_state.special_effects[_i17].poisonous_adrenaline_user.cooldown == 0) {
              delete character_state.special_effects[_i17].poisonous_adrenaline_user;
              var message = "Умение Адреналиновый Потоп у " + character.name + " снова доступно.";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("adrenaline_target")) {
            var minus_actions = character_state.special_effects[_i17].adrenaline_target.minus_actions;
            while (minus_actions > 0) {
              if (minus_actions % 2 == 0) {
                character_state.move_action[_i17] = character_state.move_action[_i17] - adrenaline_move_increase;
              } else {
                character_state.main_action[_i17] = character_state.main_action[_i17] - 1;
              }
              minus_actions = minus_actions - 1;
            }
            delete character_state.special_effects[_i17].adrenaline_target;
          }

          if (character_state.special_effects[_i17].hasOwnProperty("poisonous_adrenaline_target")) {
            var turn = character_state.special_effects[_i17].poisonous_adrenaline_target.turn;
            character_state.special_effects[_i17].poisonous_adrenaline_target.turn = turn + 1;
            var extra_actions = character_state.special_effects[_i17].poisonous_adrenaline_target.extra_actions[turn];
            while (extra_actions > 0) {
              if (extra_actions % 2 == 0) {
                character_state.move_action[_i17] = character_state.move_action[_i17] + adrenaline_move_increase;
              } else {
                character_state.main_action[_i17] = character_state.main_action[_i17] + 1;
              }
              extra_actions = extra_actions - 1;
            }
            if (turn + 1 == poisonous_adrenaline_duration) {
              var character = character_detailed_info[_i17];
              var max_HP = HP_values[character.stamina];
              var max_stamina = stamina_values[character.stamina];
              var HP_cost = poisonous_adrenaline_flat_HP + parseInt(parseFloat(max_HP) * poisonous_adrenaline_percent_HP);
              var stamina_cost = poisonous_adrenaline_flat_stamina + parseInt(parseFloat(max_stamina) * poisonous_adrenaline_percent_stamina);
              character_state.HP[_i17] = character_state.HP[_i17] - HP_cost;
              character_state.stamina[_i17] = character_state.stamina[_i17] - stamina_cost;
              delete character_state.special_effects[_i17].poisonous_adrenaline_target;
              var message = "Адреналин в крови " + character.name + " заканчивается, наступает похмелье (" + HP_cost + " хп и " + stamina_cost + " выносливости)";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("shocked")) {
            if (character_state.special_effects[_i17].shocked.cooldown == 0) {
              character_state.defensive_advantage[_i17] = character_state.defensive_advantage[_i17] + 1;
              delete character_state.special_effects[_i17].shocked;
            } else {
              character_state.special_effects[_i17].shocked.cooldown = character_state.special_effects[_i17].shocked.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("cut_limb")) {
            if (character_state.special_effects[_i17].cut_limb.duration == 0) {
              delete character_state.special_effects[_i17].cut_limb;
              var message = "Сухожилия " + character.name + " восстановились.";
              pushToList(message);
            } else {
              character_state.move_action[_i17] = -10;
              character_state.special_effects[_i17].cut_limb.duration = character_state.special_effects[_i17].cut_limb.duration - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("healed")) {
            if (character_state.special_effects[_i17].healed.cooldown > 0) {
              character_state.move_action[_i17] = character_state.move_action[_i17] / 2;
              character_state.main_action[_i17] = character_state.main_action[_i17] - 1;
              character_state.bonus_action[_i17] = character_state.bonus_action[_i17] - 1;
              character_state.special_effects[_i17].healed.cooldown = character_state.special_effects[_i17].healed.cooldown - 1;
            } else {
              delete character_state.special_effects[_i17].healed;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("blind")) {
            if (character_state.special_effects[_i17].blind.cooldown > 0) {
              character_state.special_effects[_i17].blind.cooldown = character_state.special_effects[_i17].blind.cooldown - 1;
            } else {
              delete character_state.special_effects[_i17].blind;
              character_state.ranged_advantage[_i17] = character_state.ranged_advantage[_i17] + 2;
              character_state.melee_advantage[_i17] = character_state.melee_advantage[_i17] + 1;
              var message = "Зрение " + character.name + " восстановилось";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("Markus_stacks")) {
            character_state.special_effects[_i17].Markus_stacks = character_state.special_effects[_i17].Markus_stacks - 1;
            if (character_state.special_effects[_i17].Markus_stacks == 0) {
              delete character_state.special_effects[_i17].Markus_stacks;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("shield_up")) {
            character_state.move_action[_i17] = Math.ceil(character_state.move_action[_i17] / 2);
            character_state.stamina[_i17] = character_state.stamina[_i17] - character_state.special_effects[_i17].shield_up.stamina_cost;
            var message = character.name + " продолжает держать щит (спасибо)";
            pushToList(message);
          }
          if (character_state.special_effects[_i17].hasOwnProperty("big_bro")) {
            if (character_state.special_effects[_i17].big_bro.cooldown == 0) {
              character_state.bonus_KD[_i17] = character_state.bonus_KD[_i17] - character_state.special_effects[_i17].big_bro.bonus_KD;
              delete character_state.special_effects[_i17].big_bro;
              var message = character.name + " теряет защиту Большого Брата";
              pushToList(message);
            } else {
              character_state.special_effects[_i17].big_bro.cooldown = character_state.special_effects[_i17].big_bro.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("tobacco_strike")) {
            if (character_state.special_effects[_i17].tobacco_strike.cooldown == 0) {
              delete character_state.special_effects[_i17].tobacco_strike;
            } else {
              if (character_state.special_effects[_i17].tobacco_strike.cooldown == tobacco_strike_cooldown) {
                character_state.attack_bonus[_i17] = character_state.attack_bonus[_i17] - tobacco_strike_bonus;
              }
              character_state.special_effects[_i17].tobacco_strike.cooldown = character_state.special_effects[_i17].tobacco_strike.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("acid_bomb_poison")) {
            if (character_state.special_effects[_i17].acid_bomb_poison.duration == 0) {
              character_state.bonus_KD[_i17] = character_state.bonus_KD[_i17] + character_state.special_effects[_i17].acid_bomb_poison.bonus_KD;
              delete character_state.special_effects[_i17].acid_bomb_poison;
              var message = "Броня " + character.name + " наконец восстановилась";
              pushToList(message);
            } else {
              character_state.special_effects[_i17].acid_bomb_poison.duration = character_state.special_effects[_i17].acid_bomb_poison.duration - 1;
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("gas_bomb_poison")) {
            var count = character_state.special_effects[_i17].gas_bomb_poison.poison_level;
            while (count > 0) {
              //character_state.move_action[i] = character_state.move_action[i] - gas_bomb_move_reduction
              if (count % 2 == 1) {
                character_state.main_action[_i17] = character_state.main_action[_i17] - 1;
              } else {
                character_state.bonus_action[_i17] = character_state.bonus_action[_i17] - 1;
              }
              count = count - 1;
            }
            var save_roll = data.save_roll_list[_i17];
            if (save_roll >= character_state.special_effects[_i17].gas_bomb_poison.threshold) {
              character_state.special_effects[_i17].gas_bomb_poison.poison_level = character_state.special_effects[_i17].gas_bomb_poison.poison_level - 1;
              var message = character.name + " успешно кидает спасбросок и уменьшает стадию отравления (теперь " + character_state.special_effects[_i17].gas_bomb_poison.poison_level + ")";
              pushToList(message);
            } else {
              var message = character.name + " проваливает спасбросок. Стадия отравления остается прежней (" + character_state.special_effects[_i17].gas_bomb_poison.poison_level + ")";
              pushToList(message);
            }
            if (character_state.special_effects[_i17].gas_bomb_poison.poison_level <= 0) {
              delete character_state.special_effects[_i17].gas_bomb_poison;
              var message = character.name + " больше не отравлен!";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i17].hasOwnProperty("meleed")) {
            if (character_state.special_effects[_i17].meleed.cooldown <= 0) {
              delete character_state.special_effects[_i17].meleed;
              character_state.ranged_advantage[_i17] = character_state.ranged_advantage[_i17] + 1;
            } else {
              character_state.special_effects[_i17].meleed.cooldown = character_state.special_effects[_i17].meleed.cooldown - 1;
            }
          }

          if (character.special_type == 'sniper') {
            var effects_object = character_state.special_effects[_i17];
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
              character_state.attack_bonus[_i17] = character_state.attack_bonus[_i17] - current_attack_bonus + new_attack_bonus;
              character_state.damage_bonus[_i17] = character_state.damage_bonus[_i17] - current_damage_bonus + new_damage_bonus;
              character_state.special_effects[_i17].sniper_passive.attack_bonus = new_attack_bonus;
              character_state.special_effects[_i17].sniper_passive.damage_bonus = new_damage_bonus;
            } else {
              var sniper_passive_object = {};
              sniper_passive_object.attack_bonus = 0;
              sniper_passive_object.damage_bonus = 0;
              character_state.special_effects[_i17].sniper_passive = sniper_passive_object;
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

      if (data.hasOwnProperty("aim_over")) {
        delete character_state.special_effects[data.attacker_id].aim;
      }

      if (data.hasOwnProperty("quick_attack_ready")) {
        character_state.special_effects[data.attacker_id].quick_attack_ready = true;
      }

      if (data.hasOwnProperty("move_reduction")) {
        character_state.move_action[data.target_id] = character_state.move_action[data.target_id] - data.move_reduction;
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
        for (var _i18 = 0; _i18 < data.mines_detected.length; _i18++) {
          var mine = data.mines_detected[_i18];
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
for (var _i19 = 0; _i19 < CHAT_CASH; _i19++) {
  var current_element = $("<li>");
  current_element.attr('data-name', 'notifications_list_element_' + _i19);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksbUNBQW1DLHdDQUF2QztBQUNBLElBQUksZ0NBQWdDLHFDQUFwQztBQUNBLElBQUksa0NBQWtDLHVDQUF0QztBQUNBLElBQUkscUNBQXFDLGtEQUF6Qzs7QUFFQSxJQUFJLCtCQUErQixtQ0FBbkM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLGtDQUFrQyxzQ0FBdEM7QUFDQSxJQUFJLHNCQUFzQiwwQkFBMUI7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHlCQUF5Qiw2QkFBN0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7O0FBRUEsSUFBSSx1QkFBdUIsa0NBQTNCO0FBQ0EsSUFBSSw4QkFBOEIsa0NBQWxDOztBQUVBLElBQUksNEJBQTRCLGdDQUFoQztBQUNBLElBQUksMkJBQTJCLCtCQUEvQjs7QUFFQSxJQUFJLDhCQUE4QixrQ0FBbEM7O0FBRUEsSUFBSSx1QkFBdUIsMkJBQTNCO0FBQ0EsSUFBSSwrQkFBK0IsbUNBQW5DO0FBQ0EsSUFBSSx1Q0FBdUMsMkNBQTNDO0FBQ0EsSUFBSSxzQ0FBc0MsMENBQTFDOztBQUVBLElBQUksaUJBQWlCLFNBQVMsTUFBVCxDQUFnQixPQUFoQixDQUF3QixPQUF4QixFQUFpQyxJ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QUFVLElBQXBDLEVBQTBDO0FBQ3hDLGFBQU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBWjtBQUNELEtBRkQsTUFFTztBQUNMLGNBQVEsR0FBUixDQUFZLDJCQUFaO0FBQ0Q7QUFDRjtBQUNGOztrQkFFYztBQUNiLFlBRGE7QUFFYiwwQ0FGYTtBQUdiLGdEQUhhO0FBSWIsMEJBSmE7QUFLYiw4REFMYTtBQU1iO0FBTmEsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBzb2NrZXQgZnJvbSAnLi93cy1jbGllbnQnO1xyXG5cclxudmFyICQgPSB3aW5kb3cualF1ZXJ5O1xyXG5cclxudmFyIENIQVJBQ1RFUl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIl0nO1xyXG52YXIgV0VBUE9OX0lORk9fQ09OVEFORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIndlYXBvbi1pbmZvLWNvbnRhaW5lclwiXSc7XHJcbnZhciBOT1RJRklDQVRJT05TX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zLWNvbnRhaW5lclwiXSc7XHJcbnZhciBJTklUSUFUSVZFX09SREVSX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJpbml0aWF0aXZlLW9yZGVyLWRpc3BsYXktY29udGFpbmVyXCJdJztcclxuXHJcbnZhciBDUkVBVEVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjcmVhdGVfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIFNBVkVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibG9hZF9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgUk9MTF9JTklUSUFUSVZFX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwicm9sbF9pbml0aWF0aXZlX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJmb2dfYnV0dG9uXCJdJztcclxudmFyIFpPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX2J1dHRvblwiXSc7XHJcbnZhciBDSEFUX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY2hhdF9idXR0b25cIl0nO1xyXG52YXIgTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibWlycm9yX2J1dHRvblwiXSc7XHJcbnZhciBORVhUX1JPVU5EX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibmV4dF9yb3VuZF9idXR0b25cIl0nO1xyXG52YXIgQkFUVExFX01PRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJhdHRsZV9tb2RfYnV0dG9uXCJdJztcclxudmFyIFNZTkNfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzeW5jX2J1dHRvblwiXSc7XHJcbnZhciBMQU5ETUlORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImxhbmRtaW5lX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImZvZ196b25lX2J1dHRvblwiXSc7XHJcbnZhciBVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwidW5mb2dfem9uZV9idXR0b25cIl0nO1xyXG5cclxudmFyIFpPTkVfTlVNQkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX251bWJlcl9zZWxlY3RcIl0nO1xyXG52YXIgU0VBUkNIX01PRElGSUNBVE9SX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzZWFyY2hfbW9kaWZpY2F0b3JcIl0nO1xyXG5cclxudmFyIEJPQVJEX1NJWkVfSU5QVVRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJvYXJkX3NpemVfaW5wdXRcIl0nO1xyXG52YXIgU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX25hbWVfaW5wdXRcIl0nO1xyXG5cclxudmFyIE5PVElGSUNBVElPTlNfTElTVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0XCJdJztcclxuXHJcbnZhciBTS0lMTF9NT0RBTF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2tpbGwtbW9kYWxcIl0nO1xyXG52YXIgU0tJTExfTU9EQUxfQ09OVEVOVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2tpbGwtbW9kYWwtY29udGVudFwiXSc7XHJcbnZhciBTS0lMTF9ERVNDUklQVElPTl9DT05UQUlORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNraWxsLWRlc2NyaXB0aW9uLWNvbnRhaW5lclwiXSc7XHJcbnZhciBORVhUX1BBR0VfQlVUVE9OX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibmV4dC1wYWdlLWJ1dHRvbi1jb250YWluZXJcIl0nO1xyXG5cclxudmFyIFNFUlZFUl9BRERSRVNTID0gbG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoL15odHRwLywgJ3dzJyk7XHJcblxyXG52YXIgbXlfbmFtZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKSk7XHJcbnZhciBteV9yb2xlID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3JvbGUnKSk7XHJcbnZhciBteV9yb29tID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdyb29tX251bWJlcicpKTtcclxuXHJcbnZhciBjaGFyYWN0ZXJfbGlzdCA9IFtdO1xyXG52YXIgZ3JvdXBfbGlzdCA9IFtdO1xyXG52YXIgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIG9ic3RhY2xlX2xpc3QgPSBbXTtcclxudmFyIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIHdlYXBvbl9saXN0ID0gW107XHJcbnZhciB3ZWFwb25fZGV0YWlsZWRfaW5mbyA9IFtdO1xyXG52YXIgc2tpbGxfbGlzdCA9IFtdO1xyXG52YXIgc2tpbGxfZGV0YWlsZWRfaW5mbztcclxuXHJcbnZhciBUSU5ZX0VGRkVDVF9DTEFTUyA9ICdpcy10aW55JztcclxuXHJcbnZhciBFTVBUWV9DRUxMX1BJQyA9IFwiLi9pbWFnZXMvc3F1YXJlLmpwZ1wiO1xyXG52YXIgWk9ORV9FTkRQT0lOVF9QSUMgPSBcIi4vaW1hZ2VzL3JlZF9jcm9zcy5qcGdcIlxyXG52YXIgRk9HX0lNQUdFID0gXCIuL2ltYWdlcy9mb2cud2VicFwiO1xyXG52YXIgUVVFU1RJT05fSU1BR0UgPSBcIi4vaW1hZ2VzL3F1ZXN0aW9uLmpwZ1wiO1xyXG52YXIgSU5WSVNFX0lNQUdFID0gXCIuL2ltYWdlcy96b3Jyb19tYXNrLmpwZWdcIjtcclxudmFyIEFJTV9JTUFHRSA9IFwiLi9pbWFnZXMvYWltLmpwZ1wiO1xyXG52YXIgUklHSFRfQVJST1dfSU1BR0UgPSBcIi4vaW1hZ2VzL3JpZ2h0X2Fycm93LnBuZ1wiO1xyXG5cclxudmFyIE1BWF9aT05FUyA9IDI1O1xyXG52YXIgQ0hBVF9DQVNIID0gMTU7XHJcblxyXG52YXIgc3RhbWluYV93ZWFrc3BvdF9jb3N0ID0gMVxyXG52YXIgc3RhbWluYV9tb3ZlX2Nvc3QgPSAwXHJcbnZhciBzdGFtaW5hX2F0dGFja19jb3N0ID0gMVxyXG52YXIgcHVuY2hfcmFpbmZhbGxfc3RhbWluYV9jb3N0ID0gMiAvLyBwZXIgcHVuY2hcclxudmFyIHN0YW1pbmFfY3V0X2xpbWJfY29zdCA9IDRcclxudmFyIHNoaWVsZF91cF9zdGFtaW5hX2Nvc3QgPSAyIC8vIHBlciBtb3ZlIEkgdGhpbmtcclxudmFyIGxvdHRlcnlfc2hvdF9zdGFtaW5hX2Nvc3QgPSAxXHJcbnZhciBsdWNreV9zaG90X3N0YW1pbmFfY29zdCA9IDFcclxudmFyIGFjdGlvbl9zcGxhc2hfc3RhbWluYV9jb3N0ID0gMlxyXG52YXIgYWRyZW5hbGluZV9zdGFtaW5hX2Nvc3QgPSAzXHJcbnZhciBhY2lkX2JvbWJfc3RhbWluYV9jb3N0ID0gM1xyXG52YXIgY3VydmVkX2J1bGxldHNfc3RhbWluYV9jb3N0ID0gMlxyXG5cclxudmFyIGN1dF9saW1iX2Nvb2xkb3duID0gMVxyXG5cclxudmFyIHJlc3Rfc3RhbWluYV9nYWluID0gNVxyXG5cclxudmFyIGN1dF9saW1iX2R1cmF0aW9uID0gMVxyXG52YXIgY29vbGRvd25fYmlnX2JybyA9IDEgLy8gZHVyYXRpb25cclxuXHJcbnZhciBzaGllbGRfdXBfS0QgPSAzXHJcblxyXG52YXIgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlID0gNFxyXG52YXIgY2hhcmdlX21vdmVfaW5jcmVhc2UgPSA0XHJcblxyXG52YXIgZ2FzX2JvbWJfdGhyZXNob2xkID0gMTFcclxudmFyIGdhc19ib21iX21vdmVfcmVkdWN0aW9uID0gMlxyXG52YXIgZ2FzX2JvbWJfc3RhbWluYV9jb3N0ID0gM1xyXG52YXIgZ2FzX2JvbWJfb2JzdGFjbGUgPSAxNVxyXG52YXIgZ2FzX2JvbWJfc2tpbGxfY29vbGRvd24gPSA1XHJcblxyXG52YXIgbGlnaHRfc291bmRfYm9tYl9yYWRpdXMgPSA0XHJcbnZhciBsaWdodF9zb3VuZF9ib21iX3RocmVzaG9sZCA9IDE1XHJcbnZhciBsaWdodF9zb3VuZF9ib21iX3NraWxsX2Nvb2xkb3duID0gNVxyXG5cclxudmFyIHdlYWtfc3BvdF90aHJlc2hvbGQgPSAxNVxyXG5cclxudmFyIHNob2NrZWRfY29vbGRvd24gPSAwXHJcblxyXG52YXIgcGljaF9waWNoX2Nvb2xkb3duID0gNFxyXG52YXIgcGljaF9waWNoX21vdmVfaW5jcmVhc2UgPSA0XHJcblxyXG52YXIgZm9yY2VfZmllbGRfcmFkaXVzID0gMS42XHJcbnZhciBmb3JjZV9maWVsZF9zdGFtaW5hX2Nvc3QgPSA1XHJcbnZhciBmb3JjZV9maWVsZF9jb29sZG93biA9IDEwXHJcbnZhciBmb3JjZV9maWVsZF9vYnN0YWNsZSA9IDI0XHJcblxyXG52YXIgYWN0aW9uX3NwbGFzaF9jb29sZG93biA9IDRcclxuXHJcbnZhciBpbnZpc2liaWxpdHlfZGV0ZWN0aW9uX3JhZGl1cyA9IDI7XHJcblxyXG52YXIgYmlnX2Jyb19yYW5nZSA9IDJcclxudmFyIGhlYWxfcmFuZ2UgPSAxXHJcbnZhciB0aHJvd19iYXNlX3JhbmdlID0gMlxyXG52YXIgbGlnaHRfc291bmRfYm9tYl9yYW5nZSA9IDVcclxudmFyIGZvcmNlX2ZpZWxkX3JhbmdlID0gMVxyXG52YXIgYWRyZW5hbGluZV9yYW5nZSA9IDFcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX3JhbmdlID0gMVxyXG5cclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX2R1cmF0aW9uID0gMlxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfY29vbGRvd24gPSA1XHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9mbGF0X0hQID0gNVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfZmxhdF9zdGFtaW5hID0gNVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfcGVyY2VudF9IUCA9IDAuMDVcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX3BlcmNlbnRfc3RhbWluYSA9IDAuMDVcclxuXHJcbnZhciBhZHJlbmFsaW5lX2Nvb2xkb3duID0gM1xyXG5cclxudmFyIGFjaWRfYm9tYl9kdXJhdGlvbiA9IDIgLy8gMisxIHJlYWxseVxyXG52YXIgYWNpZF9ib21iX2Nvb2xkb3duID0gNVxyXG52YXIgYWNpZF9ib21iX3JhZGl1cyA9IDEuNlxyXG5cclxudmFyIG1pbmVzXzBfZGlzdGFuY2VfZGFtYWdlID0gMjBcclxudmFyIG1pbmVzXzFfZGlzdGFuY2VfZGFtYWdlID0gMTVcclxudmFyIG1pbmVzXzFwNV9kaXN0YW5jZV9kYW1hZ2UgPSAxMFxyXG52YXIgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cyA9IDIuOVxyXG52YXIgbGFuZG1pbmVfZGlmZnVzZV90aHJlc2hvbGQgPSAxMFxyXG5cclxudmFyIHRvYmFjY29fc3RyaWtlX2hwX3BlcmNlbnRhZ2UgPSAwLjFcclxudmFyIHRvYmFjY29fc3RyaWtlX2JvbnVzID0gNFxyXG52YXIgdG9iYWNjb19zdHJpa2VfY29vbGRvd24gPSAxXHJcblxyXG52YXIgc2FmZXR5X3NlcnZpY2VfcmFuZ2UgPSAyO1xyXG52YXIgc2FmZXR5X3NlcnZpY2VfY29vbGRvd24gPSAxO1xyXG52YXIgc2FmZXR5X3NlcnZpY2VfZHVyYXRpb24gPSAxO1xyXG52YXIgc2FmZXR5X3NlcnZpY2VfZGVmZW5zaXZlX2FkdmFudGFnZSA9IDE7XHJcbnZhciBzYWZldHlfc2VydmljZV9ldmFkZV9ib251cyA9IDM7XHJcbnZhciBzYWZldHlfc2VydmljZV9ib251c19hY3Rpb25zX2Nvc3QgPSAyO1xyXG5cclxuLy8gVGhpcyBpcyBhIGNvbnN0YW50LCB3aWxsIGJlIG1vdmVkIHRvIGRhdGFiYXNlIGxhdGVyXHJcbmNvbnN0IEhQX3ZhbHVlcyA9IFsxNSwgMzAsIDQwLCA1NSwgNzUsIDEwMCwgMTMwLCAxNjUsIDIwNSwgMjUwLCAzMDAsIDM1NSwgNDE1XTtcclxuY29uc3Qgc3RhbWluYV92YWx1ZXMgPSBbMzAsIDQ1LCA2MCwgNzUsIDkwLCAxMDUsIDEyMCwgMTM1LCAxNTAsIDE2NSwgMTgwLCAxOTVdO1xyXG5jb25zdCBzdHJlbmd0aF9kYW1hZ2VfbWFwID0gWy0yLCAwLCAxLCAzLCA2LCAxMCwgMTUsIDIxLCAyOCwgMzYsIDQ1LCA1NV1cclxuY29uc3QgbW92ZV9hY3Rpb25fbWFwID0gWzEsIDMsIDQsIDYsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTVdXHJcbmNvbnN0IGJvbnVzX2FjdGlvbl9tYXA9IFswLCAxLCAxLCAyLCAyLCAyLCAyLCAyLCAzLCAzLCAzLCAzXVxyXG5jb25zdCBtYWluX2FjdGlvbl9tYXAgPSBbMSwgMSwgMSwgMSwgMSwgMSwgMiwgMiwgMiwgMiwgMiwgM11cclxuXHJcbnZhciBDSEFSQUNURVJfU1RBVEVfQ09OU1RBTlQgPSB7SFA6IFtdLCBtYWluX2FjdGlvbjogW10sIGJvbnVzX2FjdGlvbjogW10sIG1vdmVfYWN0aW9uOiBbXSwgc3RhbWluYTogW10sIGluaXRpYXRpdmU6IFtdLCBjYW5fZXZhZGU6IFtdLCBoYXNfbW92ZWQ6IFtdLCBLRF9wb2ludHM6IFtdLCBjdXJyZW50X3dlYXBvbjogW10sIHZpc2liaWxpdHk6IFtdLCBpbnZpc2liaWxpdHk6IFtdLCBhdHRhY2tfYm9udXM6IFtdLCBkYW1hZ2VfYm9udXM6IFtdLCB1bml2ZXJzYWxfYm9udXM6IFtdLCBib251c19LRDogW10sIHNwZWNpYWxfZWZmZWN0czogW10sIHJhbmdlZF9hZHZhbnRhZ2U6IFtdLCBtZWxlZV9hZHZhbnRhZ2U6IFtdLCBkZWZlbnNpdmVfYWR2YW50YWdlOiBbXSwgcG9zaXRpb246IFtdLCBldmFkZV9ib251czogW10sIG1lbGVlX3Jlc2lzdDogW10sIGJ1bGxldF9yZXNpc3Q6IFtdfTtcclxubGV0IGdhbWVfc3RhdGUgPSB7Ym9hcmRfc3RhdGU6IFtdLCBmb2dfc3RhdGU6IFtdLCB6b25lX3N0YXRlOiBbXSwgc2l6ZTogMCwgc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlOiBbXSwgdGVycmFpbl9lZmZlY3RzOiBbXSwgYmF0dGxlX21vZDogMCwgbGFuZG1pbmVzOiB7cG9zaXRpb25zOiBbXSwga25vd2VyczogW119fTtcclxubGV0IGNoYXJhY3Rlcl9zdGF0ZSA9IENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVDtcclxuXHJcbmxldCBnbV9jb250cm9sX21vZCA9IDA7IC8vIG5vcm1hbCBtb2RlXHJcblxyXG4vLyBpbl9wcm9jZXNzOiAwID0gbm90aGluZywgMSA9IG1vdmUsIDIgPSBhdHRhY2ssIDMgPSBza2lsbFxyXG5sZXQgY2hhcmFjdGVyX2Nob3NlbiA9IHtpbl9wcm9jZXNzOiAwLCBjaGFyX2lkOiAwLCBjaGFyX3Bvc2l0aW9uOiAwLCB3ZWFwb25faWQ6IDAsIHNraWxsX2lkOiAwLCBjZWxsOiAwfTtcclxuXHJcbmxldCBsYXN0X29ic3RhY2xlID0gMTtcclxubGV0IHpvbmVfZW5kcG9pbnQgPSB7aW5kZXg6IC0xLCBjZWxsOiAwfVxyXG5cclxudmFyIGd1bnNob3RfYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9ndW5zaG90Lm1wMycpO1xyXG52YXIgc3dvcmRfYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9zd29yZC53YXYnKTtcclxudmFyIGV4cGxvc2lvbl9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL2V4cGxvc2lvbi5tcDMnKTtcclxudmFyIHN1cmlrZW5fYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9zdXJpa2VuLm1wMycpO1xyXG5cclxuZ3Vuc2hvdF9hdWRpby52b2x1bWUgPSAwLjJcclxuc3dvcmRfYXVkaW8udm9sdW1lID0gMC4yXHJcbnN1cmlrZW5fYXVkaW8udm9sdW1lID0gMC4yXHJcbmV4cGxvc2lvbl9hdWRpby52b2x1bWUgPSAwLjJcclxuXHJcbmZ1bmN0aW9uIHJlY29ubmVjdCgpIHtcclxuICBpZiAoIXNvY2tldC5pc1JlYWR5KCkpIHtcclxuICAgIHNvY2tldC5pbml0KFNFUlZFUl9BRERSRVNTKTtcclxuICAgIHNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyRGVmYXVsdCgpO1xyXG4gICAgY29uc29sZS5sb2coJ0hvcGVmdWxseSByZWNvbm5lY3RlZCAocHJheSknKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coJ1dhcyBvbmxpbmUgYW55d2F5Jyk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDQodC+0LfQtNCw0L3QuNC1INC00L7RgdC60LgsIG9uY2xpY2sg0LrQu9C10YLQvtC6LCBzYXZlL2xvYWRcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xyXG4gIGdhbWVfc3RhdGUuc2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRfc2l6ZVwiKS52YWx1ZTtcclxuICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLnpvbmVfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplICogZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlLnB1c2goMCk7XHJcbiAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlLnB1c2goMCk7XHJcbiAgfVxyXG4gIHNlbmRfY29uc3RydWN0X2NvbW1hbmQoZ2FtZV9zdGF0ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRCb2FyZCgpIHtcclxuICB2YXIgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwX25hbWVcIikudmFsdWU7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2xvYWRfZ2FtZSc7XHJcbiAgdG9TZW5kLnNhdmVfbmFtZSA9IG5hbWU7XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZUJvYXJkKCkge1xyXG4gIHZhciBzYXZlX25hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcF9uYW1lXCIpLnZhbHVlO1xyXG4gIHZhciBmdWxsX2dhbWVfc3RhdGUgPSB7XHJcbiAgICBnYW1lX3N0YXRlOiBnYW1lX3N0YXRlLFxyXG4gICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm86IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvLFxyXG4gICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbzogb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyxcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZTogY2hhcmFjdGVyX3N0YXRlXHJcbiAgfTtcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NhdmVfZ2FtZSc7XHJcbiAgdG9TZW5kLnNhdmVfbmFtZSA9IHNhdmVfbmFtZTtcclxuICB0b1NlbmQuZnVsbF9nYW1lX3N0YXRlID0gZnVsbF9nYW1lX3N0YXRlO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRfY29uc3RydWN0X2NvbW1hbmQobmV3X2dhbWVfc3RhdGUpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnY29uc3RydWN0X2JvYXJkJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5nYW1lX3N0YXRlID0gbmV3X2dhbWVfc3RhdGU7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbnN0cnVjdF9ib2FyZChuZXdfZ2FtZV9zdGF0ZSkge1xyXG4gIGdhbWVfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZVxyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgYm9hcmRfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC1jb250YWluZXJcIik7XHJcbiAgYm9hcmRfY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgdmFyIGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xyXG4gIGJvYXJkLmNsYXNzTmFtZSA9IFwiYm9hcmRcIjtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG4gICAgdmFyIHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuICAgIHJvdy5jbGFzc05hbWUgPSBcImJvYXJkX3Jvd1wiO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lX3N0YXRlLnNpemU7IGorKykge1xyXG4gICAgICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICAgICAgdmFyIGNlbGxfaWQgPSBpICogZ2FtZV9zdGF0ZS5zaXplICsgajtcclxuICAgICAgYnV0dG9uLmlkID0gXCJjZWxsX1wiICsgY2VsbF9pZDtcclxuICAgICAgYnV0dG9uLnJvdyA9IGk7XHJcbiAgICAgIGJ1dHRvbi5jb2x1bW4gPSBqO1xyXG4gICAgICB2YXIgaW1hZ2VfbmFtZSA9IGZvZ09yUGljKGNlbGxfaWQpO1xyXG4gICAgICBidXR0b24uc3JjID0gaW1hZ2VfbmFtZTtcclxuICAgICAgYnV0dG9uLnN0eWxlLndpZHRoID0gJzUwcHgnO1xyXG4gICAgICBidXR0b24uc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xyXG4gICAgICBidXR0b24uY2xhc3NOYW1lID0gJ2JvYXJkX2NlbGwnO1xyXG4gICAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gY2VsbC5yb3cgKiBnYW1lX3N0YXRlLnNpemUgKyBjZWxsLmNvbHVtbjtcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICBzaGlmdF9vbmNsaWNrKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgICAgY3RybF9vbmNsaWNrKGluZGV4KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBub19zaGlmdF9vbmNsaWNrKG15X3JvbGUsIGdtX2NvbnRyb2xfbW9kLCBnYW1lX3N0YXRlLCBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MsIGNlbGwsIGluZGV4KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH07XHJcbiAgICAgIGJ1dHRvbi5kcmFnZ2FibGUgPSB0cnVlO1xyXG4gICAgICBidXR0b24ub25kcmFnb3ZlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgICBidXR0b24ub25kcmFnc3RhcnQgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHZhciBpbmRleCA9IGNlbGwucm93ICogZ2FtZV9zdGF0ZS5zaXplICsgY2VsbC5jb2x1bW47XHJcbiAgICAgICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XTtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX251bWJlciA+IDAgJiYgKG15X3JvbGUgPT0gXCJnbVwiIHx8IGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IDEpICYmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09ICdhbGwnIHx8IGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gbXlfbmFtZSkpIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShpbmRleCwgY2VsbClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgYnV0dG9uLm9uZHJvcCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gY2VsbC5yb3cgKiBnYW1lX3N0YXRlLnNpemUgKyBjZWxsLmNvbHVtbjtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID09IDEgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gPT0gMCkge1xyXG4gICAgICAgICAgbW92ZV9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHZhciBjZWxsX3dyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XHJcbiAgICAgIGNlbGxfd3JhcC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICBjZWxsX3dyYXAuY2xhc3NOYW1lID0gXCJjZWxsX3dyYXBcIjtcclxuXHJcbiAgICAgIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICB6b25lX3RleHQuaWQgPSBcInpvbmVfdGV4dF9cIiArIGNlbGxfaWQ7XHJcbiAgICAgIHpvbmVfdGV4dC5jbGFzc05hbWUgPSBcInpvbmVfdGV4dFwiO1xyXG4gICAgICBjZWxsX3dyYXAuYXBwZW5kQ2hpbGQoem9uZV90ZXh0KTtcclxuXHJcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsX3dyYXApO1xyXG4gICAgfVxyXG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQocm93KTtcclxuICB9XHJcbiAgYm9hcmRfY29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbm9fc2hpZnRfb25jbGljayhteV9yb2xlLCBnbV9jb250cm9sX21vZCwgZ2FtZV9zdGF0ZSwgZmllbGRfY2hvc2VuLCBjZWxsLCBpbmRleCkge1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIC8vIGdtIHNpZGVcclxuICAgIGlmIChnbV9jb250cm9sX21vZCA9PSAwKSB7XHJcbiAgICAgIC8vIHdlIGFyZSBpbiBub3JtYWwgYWRkL21vdmUgZGVsZXRlIG1vZGVcclxuICAgICAgc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCBteV9yb2xlKTtcclxuICAgIH0gZWxzZSBpZiAoZ21fY29udHJvbF9tb2QgPT0gMSkge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gZm9nIG1vZGVcclxuICAgICAgYXBwbHlGb2coaW5kZXgsIGNlbGwpO1xyXG4gICAgfSBlbHNlIGlmIChnbV9jb250cm9sX21vZCA9PSAyKSB7XHJcbiAgICAgIC8vIHdlIGFyZSBpbiB6b25lcyBtb2RlXHJcbiAgICAgIGFzc2lnblpvbmUoaW5kZXgpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBwbGF5ZXIgc2lkZVxyXG4gICAgaWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9PSAxKSB7XHJcbiAgICAgIC8vIGNsaWNrZWQgZm9nXHJcbiAgICAgIGlmIChmaWVsZF9jaG9zZW4gPT0gMSkge1xyXG4gICAgICAgIHVuZG9fc2VsZWN0aW9uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyBmb2cgZGV0ZWN0ZWQnKTtcclxuICAgICAgICBkaXNwbGF5Rm9nKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0YW5kYXJkX2NlbGxfb25DbGljayhpbmRleCwgY2VsbCwgbXlfcm9sZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaGlmdF9vbmNsaWNrKGluZGV4LCBjZWxsKSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgaWYgKGdtX2NvbnRyb2xfbW9kID09IDIpIHtcclxuICAgICAgaWYgKHpvbmVfZW5kcG9pbnQuaW5kZXggPCAwKSB7XHJcbiAgICAgICAgem9uZV9lbmRwb2ludC5pbmRleCA9IGluZGV4XHJcbiAgICAgICAgem9uZV9lbmRwb2ludC5jZWxsID0gY2VsbFxyXG4gICAgICAgIGNlbGwuc3JjID0gWk9ORV9FTkRQT0lOVF9QSUNcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbmRwb2ludF9hc3NpZ25fem9uZShpbmRleCwgem9uZV9lbmRwb2ludC5pbmRleClcclxuICAgICAgICB6b25lX2VuZHBvaW50LmNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUNcclxuICAgICAgICB6b25lX2VuZHBvaW50LmluZGV4ID0gLTFcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdhZGRfb2JzdGFjbGUnO1xyXG4gICAgICB0b1NlbmQuY2VsbF9pZCA9IGluZGV4O1xyXG4gICAgICB0b1NlbmQub2JzdGFjbGVfbnVtYmVyID0gbGFzdF9vYnN0YWNsZTtcclxuICAgICAgdG9TZW5kLm9ic3RhY2xlX25hbWUgPSBvYnN0YWNsZV9saXN0W2xhc3Rfb2JzdGFjbGUgLSAxXTtcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjdHJsX29uY2xpY2soaW5kZXgpIHtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICB2YXIgZm9nX3ZhbHVlID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgbW9kID0gMSAtIGZvZ192YWx1ZVxyXG4gICAgdmFyIHpvbmUgPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaW5kZXhdXHJcbiAgICBmb2dQYXJzZVpvbmUobW9kLCB6b25lKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCByb2xlKSB7XHJcblx0aWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID09IDApIHsgLy8gZW1wdHkgY2VsbCBjbGlja2VkXHJcblxyXG4gICAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2Vzcykge1xyXG4gICAgICBjYXNlIDA6IC8vIG5vdGhpbmdcclxuICAgICAgICBpZiAocm9sZSA9PSAnZ20nKSB7XHJcbiAgICAgICAgICBhZGRfb2JqZWN0KGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTogLy8gbW92ZVxyXG4gICAgICAgIG1vdmVfY2hhcmFjdGVyKGluZGV4LCBjZWxsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOiAvL2F0dGFja1xyXG4gICAgICAgIHN0b3BfYXR0YWNrKClcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOiAvL3NraWxsXHJcbiAgICAgICAgcGVyZm9ybV9za2lsbChpbmRleCwgY2VsbClcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJlc29sdmluZyBvbl9jbGljayBlbXB0eVwiKVxyXG4gICAgfVxyXG5cclxuXHR9IGVsc2UgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID4gMCkgeyAvLyBjaGFyYWN0ZXIgY2xpY2tlZFxyXG4gICAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2Vzcykge1xyXG4gICAgICBjYXNlIDA6IC8vIG5vdGhpbmdcclxuICAgICAgICBzZWxlY3RfY2hhcmFjdGVyKGluZGV4LCBjZWxsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxOiAvLyBtb3ZlXHJcbiAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOiAvL2F0dGFja1xyXG4gICAgICAgIHBlcmZvcm1fYXR0YWNrKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6IC8vc2tpbGxcclxuICAgICAgICBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVzb2x2aW5nIG9uX2NsaWNrIGNoYXJhY3RlclwiKVxyXG4gICAgfVxyXG5cclxuXHR9IGVsc2UgeyAvLyBvYnN0YWNsZSBjbGlja2VkXHJcblxyXG4gICAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2Vzcykge1xyXG4gICAgICBjYXNlIDA6IC8vIG5vdGhpbmdcclxuICAgICAgICBzZWxlY3Rfb2JzdGFjbGUoaW5kZXgsIGNlbGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6IC8vIG1vdmVcclxuICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6IC8vYXR0YWNrXHJcbiAgICAgICAgc3RvcF9hdHRhY2soKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6IC8vc2tpbGxcclxuICAgICAgICBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVzb2x2aW5nIG9uX2NsaWNrIG9ic3RhY2xlXCIpXHJcbiAgICB9XHJcblxyXG5cdH1cclxufVxyXG5cclxuLy8gWm9uZS9mb2cgcmVsYXRlZCBzdGFmZlxyXG5cclxuZnVuY3Rpb24gZW5kcG9pbnRfYXNzaWduX3pvbmUoZW5kcG9pbnQxLCBlbmRwb2ludDIpIHtcclxuICB2YXIgem9uZV9udW1iZXIgPSB6b25lX251bWJlcl9zZWxlY3QudmFsKCk7XHJcbiAgdmFyIG1vZGlmaWNhdG9yID0gc2VhcmNoX21vZGlmaWNhdG9yLnZhbCgpO1xyXG4gIHZhciBzaXplID0gZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciBpbmRleF9saXN0ID0gW11cclxuXHJcbiAgdmFyIGNvb3JkMSA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgY29vcmQyID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG5cclxuICB2YXIgdG9wX2xlZnQgPSB0b3BfbGVmdF9jb29yZChjb29yZDEsIGNvb3JkMilcclxuICB2YXIgYm90dG9tX3JpZ2h0ID0gYm90dG9tX3JpZ2h0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKVxyXG5cclxuICBmb3IgKGxldCBpID0gdG9wX2xlZnQueDsgaSA8PSBib3R0b21fcmlnaHQueDsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gdG9wX2xlZnQueTsgaiA8PSBib3R0b21fcmlnaHQueTsgaisrKSB7XHJcbiAgICAgIHZhciBjb29yZCA9IHt9XHJcbiAgICAgIGNvb3JkLnggPSBpXHJcbiAgICAgIGNvb3JkLnkgPSBqXHJcbiAgICAgIHZhciBpbmRleCA9IGNvb3JkX3RvX2luZGV4KGNvb3JkLCBzaXplKVxyXG5cclxuICAgICAgaW5kZXhfbGlzdC5wdXNoKGluZGV4KVxyXG4gICAgICB2YXIgem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3pvbmVfdGV4dF8nICsgaW5kZXgpO1xyXG4gICAgICB6b25lX3RleHQuaW5uZXJIVE1MID0gem9uZV9udW1iZXIgKyAnKCcgKyBtb2RpZmljYXRvciArICcpJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhc3NpZ25fem9uZSc7XHJcbiAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgdG9TZW5kLmluZGV4X2xpc3QgPSBpbmRleF9saXN0O1xyXG4gIHRvU2VuZC5tb2RpZmljYXRvciA9IG1vZGlmaWNhdG9yO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzc2lnblpvbmUoaW5kZXgpIHtcclxuICB2YXIgem9uZV9udW1iZXIgPSB6b25lX251bWJlcl9zZWxlY3QudmFsKCk7XHJcbiAgdmFyIG1vZGlmaWNhdG9yID0gc2VhcmNoX21vZGlmaWNhdG9yLnZhbCgpO1xyXG5cclxuICB2YXIgem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3pvbmVfdGV4dF8nICsgaW5kZXgpO1xyXG4gIHpvbmVfdGV4dC5pbm5lckhUTUwgPSB6b25lX251bWJlciArICcoJyArIG1vZGlmaWNhdG9yICsgJyknO1xyXG5cclxuICB2YXIgaW5kZXhfbGlzdCA9IFtdXHJcbiAgaW5kZXhfbGlzdC5wdXNoKGluZGV4KVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnYXNzaWduX3pvbmUnO1xyXG4gIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gIHRvU2VuZC5pbmRleF9saXN0ID0gaW5kZXhfbGlzdDtcclxuICB0b1NlbmQubW9kaWZpY2F0b3IgPSBtb2RpZmljYXRvcjtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseUZvZyhpbmRleCwgY2VsbCkge1xyXG5cdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPT0gMSkge1xyXG5cdFx0Ly8gc2VuZCB1cGRhdGUgbWVzc2FnZVxyXG5cdFx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdFx0dG9TZW5kLmNvbW1hbmQgPSAndXBkYXRlX2ZvZyc7XHJcblx0XHR0b1NlbmQudXBkYXRlX3R5cGUgPSAncmVtb3ZlJztcclxuXHRcdHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuXHRcdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQvLyBzZW5kIHVwZGF0ZSBtZXNzYWdlXHJcblx0XHR2YXIgdG9TZW5kID0ge307XHJcblx0XHR0b1NlbmQuY29tbWFuZCA9ICd1cGRhdGVfZm9nJztcclxuXHRcdHRvU2VuZC51cGRhdGVfdHlwZSA9ICdhZGQnO1xyXG5cdFx0dG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG5cdFx0c29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dNb2RlQ2hhbmdlKCkge1xyXG4gIGlmIChnbV9jb250cm9sX21vZCAhPSAxKSB7XHJcbiAgICAvLyB0dXJuIG9uIGZvZyBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAxO1xyXG4gICAgZm9nX2J1dHRvbi50ZXh0KCfQktGL0LrQuyDQotGD0LzQsNC9INCS0L7QudC90YsnKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpXSA9PSAxKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfY2VsbC5zcmMgPSBGT0dfSU1BR0U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gdHVybiBvZmYgZm9nIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDA7XHJcbiAgICBmb2dfYnV0dG9uLnRleHQoJ9CS0LrQuyDQotGD0LzQsNC9INCS0L7QudC90YsnKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpXSA9PSAxKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfY2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHpvbmVNb2RlQ2hhbmdlKCkge1xyXG4gIGlmIChnbV9jb250cm9sX21vZCAhPSAyKSB7XHJcbiAgICAvLyB0dXJuIG9uIHpvbmUgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMjtcclxuICAgIHpvbmVfYnV0dG9uLnRleHQoJ9CS0YvQutC7INCX0L7QvdCw0LvRjNC90YvQuSDRgNC10LbQuNC8Jyk7XHJcbiAgICB6b25lX251bWJlcl9zZWxlY3Quc2hvdygpO1xyXG4gICAgZm9nX3pvbmVfYnV0dG9uLnNob3coKTtcclxuICAgIHVuZm9nX3pvbmVfYnV0dG9uLnNob3coKTtcclxuICAgIHNlYXJjaF9tb2RpZmljYXRvci5zaG93KCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpXSA+IDApIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF96b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmVfdGV4dF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfem9uZV90ZXh0LmlubmVySFRNTCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpXSArICcoJyArIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2ldICsgJyknO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIGJhY2sgdG8gbm9ybWFsIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMDtcclxuICAgIHpvbmVfYnV0dG9uLnRleHQoJ9CS0LrQuyDQl9C+0L3QsNC70YzQvdGL0Lkg0YDQtdC20LjQvCcpO1xyXG4gICAgem9uZV9udW1iZXJfc2VsZWN0LmhpZGUoKTtcclxuICAgIGZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcbiAgICB1bmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcbiAgICBzZWFyY2hfbW9kaWZpY2F0b3IuaGlkZSgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25lX3RleHRfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X3pvbmVfdGV4dC5pbm5lckhUTUwgPSAnJztcclxuXHRcdH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ0N1cnJlbnRab25lKCkge1xyXG4gIHZhciBjdXJyZW50X3pvbmUgPSB6b25lX251bWJlcl9zZWxlY3QudmFsKCk7XHJcbiAgZm9nUGFyc2Vab25lKDEsIGN1cnJlbnRfem9uZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuZm9nQ3VycmVudFpvbmUoKSB7XHJcbiAgZm9nUGFyc2Vab25lKDAsIGN1cnJlbnRfem9uZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ1BhcnNlWm9uZShtb2QsIGN1cnJlbnRfem9uZSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICd1cGRhdGVfZm9nJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIGlmIChtb2QgPT0gMCkge1xyXG4gICAgdG9TZW5kLnVwZGF0ZV90eXBlID0gJ3JlbW92ZSc7XHJcbiAgfSBlbHNlIGlmIChtb2QgPT0gMSkge1xyXG4gICAgdG9TZW5kLnVwZGF0ZV90eXBlID0gJ2FkZCc7XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplICogZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIGlmIChnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaV0gPT0gY3VycmVudF96b25lKSB7XHJcbiAgICAgIHRvU2VuZC5pbmRleCA9IGk7XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gSGVscGVyIGNvb3JkaW5hdGUgcmVsYXRlZCBmdW5jdGlvbnNcclxuXHJcbmZ1bmN0aW9uIHRvcF9sZWZ0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKSB7XHJcbiAgdmFyIHRvUmV0ID0ge31cclxuICB0b1JldC54ID0gTWF0aC5taW4oY29vcmQxLngsIGNvb3JkMi54KVxyXG4gIHRvUmV0LnkgPSBNYXRoLm1pbihjb29yZDEueSwgY29vcmQyLnkpXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJvdHRvbV9yaWdodF9jb29yZChjb29yZDEsIGNvb3JkMikge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGgubWF4KGNvb3JkMS54LCBjb29yZDIueClcclxuICB0b1JldC55ID0gTWF0aC5tYXgoY29vcmQxLnksIGNvb3JkMi55KVxyXG4gIHJldHVybiB0b1JldFxyXG59XHJcblxyXG5mdW5jdGlvbiBjb29yZF90b19pbmRleChjb29yZCwgc2l6ZSkge1xyXG4gIHZhciBpbmRleCA9IGNvb3JkLnggKiBzaXplICsgY29vcmQueVxyXG4gIHJldHVybiBpbmRleFxyXG59XHJcblxyXG5mdW5jdGlvbiBpbmRleF90b19jb29yZGluYXRlcyhpbmRleCwgc2l6ZSkge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGguZmxvb3IoaW5kZXgvc2l6ZSlcclxuICB0b1JldC55ID0gaW5kZXggJSBzaXplXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmREaXN0YW5jZShpbmRleDEsIGluZGV4Mikge1xyXG4gIHZhciB4MSA9IE1hdGguZmxvb3IoaW5kZXgxL2dhbWVfc3RhdGUuc2l6ZSlcclxuICB2YXIgeTEgPSBpbmRleDEgJSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIHgyID0gTWF0aC5mbG9vcihpbmRleDIvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MiA9IGluZGV4MiAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgZGlzdGFuY2Vfc3F1YXJlZCA9ICh4MS14MikqKHgxLXgyKSArICh5MS15MikqKHkxLXkyKVxyXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChkaXN0YW5jZV9zcXVhcmVkKVxyXG4gIHJldHVybiBwYXJzZUZsb2F0KGRpc3RhbmNlKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0luUmFuZ2UoaW5kZXgxLCBpbmRleDIsIHJhbmdlKSB7XHJcbiAgdmFyIHgxID0gTWF0aC5mbG9vcihpbmRleDEvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MSA9IGluZGV4MSAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgeDIgPSBNYXRoLmZsb29yKGluZGV4Mi9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkyID0gaW5kZXgyICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciBkaXN0YW5jZSA9ICh4MS14MikqKHgxLXgyKSArICh5MS15MikqKHkxLXkyKVxyXG4gIHJldHVybiBkaXN0YW5jZSA8PSByYW5nZSpyYW5nZVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhbmdlKSB7XHJcbiAgdmFyIHNpemUgPSBnYW1lX3N0YXRlLnNpemVcclxuICB2YXIgeCA9IE1hdGguZmxvb3IoaW5kZXgvc2l6ZSlcclxuICB2YXIgeSA9IGluZGV4ICUgc2l6ZVxyXG4gIHZhciBjYW5kaWRhdGVfaW5kZXhfbGlzdCA9IFtdXHJcblxyXG4gIC8vY29uc29sZS5sb2coXCJ4OiBcIiArIHggKyBcIiB5OiBcIiArIHkgKyBcIiBpbmRleDogXCIgKyBpbmRleClcclxuXHJcbiAgZm9yIChsZXQgaSA9IE1hdGguZmxvb3IoLTEgKiByYW5nZSk7IGkgPD0gTWF0aC5jZWlsKHJhbmdlKTsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gTWF0aC5mbG9vcigtMSAqIHJhbmdlKTsgaiA8PSBNYXRoLmNlaWwocmFuZ2UpOyBqKyspIHtcclxuICAgICAgdmFyIGNhbmRfeCA9IHggKyBpXHJcbiAgICAgIHZhciBjYW5kX3kgPSB5ICsgalxyXG4gICAgICAvL2NvbnNvbGUubG9nKFwiY2FuZF94OiBcIiArIGNhbmRfeCArIFwiIGNhbmRfeTogXCIgKyBjYW5kX3kpXHJcbiAgICAgIGlmIChjYW5kX3ggPj0wICYmIGNhbmRfeCA8IHNpemUgJiYgY2FuZF95ID49MCAmJiBjYW5kX3kgPCBzaXplKSB7XHJcbiAgICAgICAgdmFyIGNhbmRfaW5kZXggPSBjYW5kX3gqc2l6ZSArIGNhbmRfeVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJjYW5kX2luZGV4OiBcIiArIGNhbmRfaW5kZXgpXHJcbiAgICAgICAgaWYgKGlzSW5SYW5nZShpbmRleCwgY2FuZF9pbmRleCwgcmFuZ2UpKSB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FuZF9pbmRleDogXCIgKyBjYW5kX2luZGV4ICsgXCJ3YXMgY29uc2lkZXJlZCBpbiByYW5nZVwiKVxyXG4gICAgICAgICAgY2FuZGlkYXRlX2luZGV4X2xpc3QucHVzaChjYW5kX2luZGV4KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY2FuZGlkYXRlX2luZGV4X2xpc3RcclxufVxyXG5cclxuZnVuY3Rpb24gbGluZV9mcm9tX2VuZHBvaW50cyhwb2ludDEsIHBvaW50Mikge1xyXG4gIHZhciBsaW5lID0ge31cclxuICBsaW5lLmEgPSAtMSoocG9pbnQxLnkgLSBwb2ludDIueSlcclxuICBsaW5lLmIgPSBwb2ludDEueCAtIHBvaW50Mi54XHJcbiAgbGluZS5jID0gLTEqKGxpbmUuYSAqIHBvaW50Mi54ICsgbGluZS5iICogcG9pbnQyLnkpXHJcbiAgcmV0dXJuIGxpbmVcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzdGFuY2VfdG9fbGluZShlbmRwb2ludDEsIGVuZHBvaW50Miwgc2l6ZSwgdGVzdHBvaW50KSB7XHJcbiAgdmFyIGVuZHBvaW50MV9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgZW5kcG9pbnQyX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG4gIHZhciB0ZXN0cG9pbnRfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyh0ZXN0cG9pbnQsIHNpemUpXHJcblxyXG4gIHZhciBsaW5lID0gbGluZV9mcm9tX2VuZHBvaW50cyhlbmRwb2ludDFfY29vcmQsIGVuZHBvaW50Ml9jb29yZClcclxuICBjb25zb2xlLmxvZyhsaW5lKVxyXG4gIGNvbnNvbGUubG9nKHRlc3Rwb2ludF9jb29yZClcclxuXHJcbiAgdmFyIGRpc3RhbmNlID0gTWF0aC5hYnMobGluZS5hKnRlc3Rwb2ludF9jb29yZC54ICsgbGluZS5iKnRlc3Rwb2ludF9jb29yZC55ICsgbGluZS5jKS9NYXRoLnNxcnQobGluZS5hKmxpbmUuYSArIGxpbmUuYipsaW5lLmIpXHJcblxyXG4gIGNvbnNvbGUubG9nKGRpc3RhbmNlKVxyXG4gIHJldHVybiBkaXN0YW5jZVxyXG59XHJcblxyXG5mdW5jdGlvbiBjZWxsc19vbl9saW5lKGVuZHBvaW50MSwgZW5kcG9pbnQyLCBzaXplKSB7XHJcbiAgdmFyIGVuZHBvaW50MV9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgZW5kcG9pbnQyX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG4gIHZhciBsaW5lID0gbGluZV9mcm9tX2VuZHBvaW50cyhlbmRwb2ludDFfY29vcmQsIGVuZHBvaW50Ml9jb29yZClcclxuXHJcbiAgdmFyIHNjYWxlID0gTWF0aC5tYXgoTWF0aC5hYnMobGluZS5hKSwgTWF0aC5hYnMobGluZS5iKSlcclxuICAvLyBuZWVkIHRvIGJlIHJldmVyc2VkISByZW1lbWJlciBsaW5lLmEgPSBkZWx0YSB5XHJcbiAgdmFyIHhfc3RlcCA9IGxpbmUuYi9zY2FsZVxyXG4gIHZhciB5X3N0ZXAgPSAtMSpsaW5lLmEvc2NhbGVcclxuICB2YXIgY3VycmVudF9wb2ludCA9IGVuZHBvaW50Ml9jb29yZFxyXG5cclxuICB2YXIgc2FmZXR5X2l0ZXIgPSAwXHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IFtdXHJcbiAgd2hpbGUgKE1hdGguYWJzKGN1cnJlbnRfcG9pbnQueCAtIGVuZHBvaW50MV9jb29yZC54KSA+IDAuNSB8fCBNYXRoLmFicyhjdXJyZW50X3BvaW50LnkgLSBlbmRwb2ludDFfY29vcmQueSkgPiAwLjUpIHtcclxuICAgIHZhciBjZWlsID0ge31cclxuICAgIGNlaWwueCA9IE1hdGguY2VpbChjdXJyZW50X3BvaW50LngpXHJcbiAgICBjZWlsLnkgPSBNYXRoLmNlaWwoY3VycmVudF9wb2ludC55KVxyXG4gICAgdmFyIGNlaWxfaW5kZXggPSBjb29yZF90b19pbmRleChjZWlsLCBzaXplKVxyXG5cclxuICAgIHZhciBmbG9vciA9IHt9XHJcbiAgICBmbG9vci54ID0gTWF0aC5mbG9vcihjdXJyZW50X3BvaW50LngpXHJcbiAgICBmbG9vci55ID0gTWF0aC5mbG9vcihjdXJyZW50X3BvaW50LnkpXHJcbiAgICB2YXIgZmxvb3JfaW5kZXggPSBjb29yZF90b19pbmRleChmbG9vciwgc2l6ZSlcclxuXHJcblxyXG4gICAgY2FuZGlkYXRlX2NlbGxzLnB1c2goY2VpbF9pbmRleClcclxuICAgIGlmIChjZWlsX2luZGV4ICE9IGZsb29yX2luZGV4KSB7XHJcbiAgICAgIGNhbmRpZGF0ZV9jZWxscy5wdXNoKGZsb29yX2luZGV4KVxyXG4gICAgfVxyXG5cclxuICAgIGN1cnJlbnRfcG9pbnQueCA9IGN1cnJlbnRfcG9pbnQueCAgKyB4X3N0ZXBcclxuICAgIGN1cnJlbnRfcG9pbnQueSA9IGN1cnJlbnRfcG9pbnQueSAgKyB5X3N0ZXBcclxuICAgIHNhZmV0eV9pdGVyID0gc2FmZXR5X2l0ZXIgKyAxXHJcbiAgICBpZiAoc2FmZXR5X2l0ZXIgPiA1MCkge1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKGNhbmRpZGF0ZV9jZWxscylcclxuICByZXR1cm4gY2FuZGlkYXRlX2NlbGxzXHJcbn1cclxuXHJcbi8vIGFuaW1hdGlvbnMsIGNvbnRhaW5lciBtYWludGFuY2VcclxuXHJcbmZ1bmN0aW9uIGNsZWFyX2NvbnRhaW5lcnMoKSB7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICB3ZWFwb25faW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0aW55X2FuaW1hdGVfY29udGFpbmVycygpIHtcclxuICB0aW55X2FuaW1hdGlvbihjaGFyYWN0ZXJfaW5mb19jb250YWluZXIpO1xyXG4gIHRpbnlfYW5pbWF0aW9uKHdlYXBvbl9pbmZvX2NvbnRhaW5lcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcikge1xyXG4gIGNvbnRhaW5lci5hZGRDbGFzcyhUSU5ZX0VGRkVDVF9DTEFTUyk7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcyhUSU5ZX0VGRkVDVF9DTEFTUyk7XHJcbiAgfSwgNTApO1xyXG59XHJcblxyXG4vLyBhZGRpbmcgb2JqZWN0cywgY2hhcmFjdGVyc1xyXG5cclxuZnVuY3Rpb24gYWRkX29iamVjdChib2FyZF9pbmRleCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgYnV0dG9uX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgYnV0dG9uX2NvbnRhaW5lci5jbGFzc05hbWUgPSBcImFkZC1vYmplY3QtYnV0dG9uLWNvbnRhaW5lclwiO1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9jaGFyYWN0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbl9hZGRfY2hhcmFjdGVyLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9C10YDRgdC+0L3QsNC20LBcIjtcclxuICBidXR0b25fYWRkX2NoYXJhY3Rlci5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9vYnN0YWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uX2FkZF9vYnN0YWNsZS5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0Ywg0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVwiO1xyXG4gIGJ1dHRvbl9hZGRfb2JzdGFjbGUub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgYWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfY2hhcmFjdGVyKTtcclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfb2JzdGFjbGUpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uX2NvbnRhaW5lcik7XHJcblxyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIG9ic3RhY2xlX251bWJlcikge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhZGRfb2JzdGFjbGUnO1xyXG4gIHRvU2VuZC5jZWxsX2lkID0gaW5kZXg7XHJcbiAgdG9TZW5kLm9ic3RhY2xlX251bWJlciA9IG9ic3RhY2xlX251bWJlciArIDE7XHJcbiAgdG9TZW5kLm9ic3RhY2xlX25hbWUgPSBvYnN0YWNsZV9saXN0W29ic3RhY2xlX251bWJlcl07XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNlbGVjdC5pZCA9IFwib2JzdGFjbGVfY2hvc2VuXCI7XHJcbiAgc2VsZWN0LmNsYXNzTmFtZSA9IFwib2JqZWN0X3NlbGVjdFwiXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgb2JzdGFjbGVfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IG9ic3RhY2xlX2xpc3RbaV07XHJcbiAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG4gIGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG4gIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcbiAgICB2YXIgb2JzdGFjbGVfbnVtYmVyID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvYnN0YWNsZV9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuICAgIGFkZF9vYnN0YWNsZV9jb21tYW5kKGJ1dHRvbi5ib2FyZF9pbmRleCwgb2JzdGFjbGVfbnVtYmVyKVxyXG5cclxuICAgIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gIH1cclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzZWxlY3QpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uKTtcclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNlbGVjdC5pZCA9IFwiY2hhcmFjdGVyX2Nob3NlblwiO1xyXG4gIHNlbGVjdC5jbGFzc05hbWUgPSBcIm9iamVjdF9zZWxlY3RcIlxyXG5cclxuICB2YXIgcGxheWVyc19vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBwbGF5ZXJzX29wdGdyb3VwLmlkID0gXCJwbGF5ZXJzX29wdGdyb3VwXCJcclxuICBwbGF5ZXJzX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBwbGF5ZXJzX29wdGdyb3VwLmxhYmVsID0gXCLQmNCz0YDQvtC60LhcIlxyXG5cclxuICB2YXIgcGVuZ3Vpbl9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBwZW5ndWluX29wdGdyb3VwLmlkID0gXCJwZW5ndWluX29wdGdyb3VwXCJcclxuICBwZW5ndWluX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBwZW5ndWluX29wdGdyb3VwLmxhYmVsID0gXCLQn9C40L3Qs9Cy0LjQvdGLXCJcclxuXHJcbiAgdmFyIHNoaWVsZF9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBzaGllbGRfb3B0Z3JvdXAuaWQgPSBcInNoaWVsZF9vcHRncm91cFwiXHJcbiAgc2hpZWxkX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBzaGllbGRfb3B0Z3JvdXAubGFiZWwgPSBcItCh0LrQstCw0LTQvtCy0YbRi1wiXHJcblxyXG4gIHZhciBzd29yZF9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBzd29yZF9vcHRncm91cC5pZCA9IFwic3dvcmRfb3B0Z3JvdXBcIlxyXG4gIHN3b3JkX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBzd29yZF9vcHRncm91cC5sYWJlbCA9IFwi0JzQtdGH0LhcIlxyXG5cclxuICB2YXIgbXV0YW50X29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIG11dGFudF9vcHRncm91cC5pZCA9IFwibXV0YW50X29wdGdyb3VwXCJcclxuICBtdXRhbnRfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIG11dGFudF9vcHRncm91cC5sYWJlbCA9IFwi0JzRg9GC0LDQvdGC0YtcIlxyXG5cclxuICB2YXIgYW5pbWFfb3B0Z3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0Z3JvdXBcIik7XHJcbiAgYW5pbWFfb3B0Z3JvdXAuaWQgPSBcImFuaW1hX29wdGdyb3VwXCJcclxuICBhbmltYV9vcHRncm91cC5jbGFzc05hbWUgPSBcImNoYXJhY3Rlcl9vcHRncm91cFwiXHJcbiAgYW5pbWFfb3B0Z3JvdXAubGFiZWwgPSBcItCX0LLQtdGA0LhcIlxyXG5cclxuICB2YXIgb3RoZXJfb3B0Z3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0Z3JvdXBcIik7XHJcbiAgb3RoZXJfb3B0Z3JvdXAuaWQgPSBcIm90aGVyX29wdGdyb3VwXCJcclxuICBvdGhlcl9vcHRncm91cC5jbGFzc05hbWUgPSBcImNoYXJhY3Rlcl9vcHRncm91cFwiXHJcbiAgb3RoZXJfb3B0Z3JvdXAubGFiZWwgPSBcItCe0YHRgtCw0LvRjNC90YvQtVwiXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBjaGFyYWN0ZXJfbGlzdFtpXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaTtcclxuICAgIHZhciBjaGFyYWN0ZXJfZ3JvdXAgPSBncm91cF9saXN0W2ldXHJcbiAgICBzd2l0Y2goY2hhcmFjdGVyX2dyb3VwKSB7XHJcbiAgICAgIGNhc2UgXCJwbGF5ZXJcIjpcclxuICAgICAgICBwbGF5ZXJzX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInBlbmd1aW5cIjpcclxuICAgICAgICBwZW5ndWluX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNoaWVsZFwiOlxyXG4gICAgICAgIHNoaWVsZF9vcHRncm91cC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJzd29yZFwiOlxyXG4gICAgICAgIHN3b3JkX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIm11dGFudFwiOlxyXG4gICAgICAgIG11dGFudF9vcHRncm91cC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJhbmltYVwiOlxyXG4gICAgICAgIGFuaW1hX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBvdGhlcl9vcHRncm91cC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbi5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0YxcIjtcclxuICBidXR0b24uYm9hcmRfaW5kZXggPSBib2FyZF9pbmRleDtcclxuICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlcl9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9jaGFyYWN0ZXInO1xyXG4gICAgdG9TZW5kLmNlbGxfaWQgPSBidXR0b24uYm9hcmRfaW5kZXg7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXIgKyAxO1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gY2hhcmFjdGVyX2xpc3RbY2hhcmFjdGVyX251bWJlcl07XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgY2xlYXJfY29udGFpbmVycygwKVxyXG4gIH1cclxuXHJcbiAgc2VsZWN0LmFwcGVuZChwbGF5ZXJzX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKHNoaWVsZF9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChzd29yZF9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChtdXRhbnRfb3B0Z3JvdXApO1xyXG4gIHNlbGVjdC5hcHBlbmQoYW5pbWFfb3B0Z3JvdXApO1xyXG4gIHNlbGVjdC5hcHBlbmQocGVuZ3Vpbl9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChvdGhlcl9vcHRncm91cCk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzZWxlY3QpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uKTtcclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG4vLyBQaWN0dXJlL2F2YXRhciBtYW5hZ2VtZW50XHJcblxyXG5mdW5jdGlvbiBmb2dPclBpYyhjZWxsX2lkKSB7XHJcbiAgdmFyIHBpY3R1cmVfbmFtZSA9IEZPR19JTUFHRTtcclxuICBpZiAoKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2NlbGxfaWRdICE9IDEpfHwobXlfcm9sZSA9PSAnZ20nKSkge1xyXG4gICAgdmFyIGNoYXJfaWQgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NlbGxfaWRdXHJcbiAgICBwaWN0dXJlX25hbWUgPSBnZXRfb2JqZWN0X3BpY3R1cmUoY2hhcl9pZCk7XHJcbiAgICBpZiAoY2hhcl9pZCA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyX2lkXSAhPSBcImFsbFwiICYmIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcl9pZF0gIT0gbXlfbmFtZSkge1xyXG4gICAgICBwaWN0dXJlX25hbWUgPSBnZXRfb2JqZWN0X3BpY3R1cmUoMCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuICByZXR1cm4gcGljdHVyZV9uYW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5Rm9nKCkge1xyXG5cdGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuXHR2YXIgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIGluZm8uaW5uZXJIVE1MID0gJ9Cc0Ysg0L3QtSDQt9C90LDQtdC8LCDRh9GC0L4g0Y3RgtC+INGC0LDQutC+0LUuINCV0YHQu9C4INCx0Ysg0LzRiyDQt9C90LDQu9C4INGH0YLQviDRjdGC0L4g0YLQsNC60L7QtSwg0L3QviDQvNGLINC90LUg0LfQvdCw0LXQvC4nO1xyXG5cclxuXHR2YXIgZm9nX3BpY3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIGZvZ19waWN0dXJlLnNyYyA9IFFVRVNUSU9OX0lNQUdFO1xyXG4gIGZvZ19waWN0dXJlLnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBmb2dfcGljdHVyZS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuXHRjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGluZm8pO1xyXG5cdGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoZm9nX3BpY3R1cmUpO1xyXG5cclxudGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfb2JqZWN0X3BpY3R1cmUoaW5kZXhfaW5fYm9hcmRfc3RhdGUpIHtcclxuICB2YXIgaW1hZ2UgPSBFTVBUWV9DRUxMX1BJQztcclxuICB2YXIgaW5kZXhfaW5fYmFzZTtcclxuICBpZiAoaW5kZXhfaW5fYm9hcmRfc3RhdGUgPiAwKSB7XHJcbiAgICBpbmRleF9pbl9iYXNlID0gaW5kZXhfaW5fYm9hcmRfc3RhdGU7XHJcbiAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baW5kZXhfaW5fYmFzZV07XHJcbiAgICBpbWFnZSA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcbiAgfSBlbHNlIGlmIChpbmRleF9pbl9ib2FyZF9zdGF0ZSA8IDApIHtcclxuICAgIGluZGV4X2luX2Jhc2UgPSBpbmRleF9pbl9ib2FyZF9zdGF0ZSAqICgtMSk7XHJcbiAgICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW2luZGV4X2luX2Jhc2VdO1xyXG4gICAgaW1hZ2UgPSBvYnN0YWNsZS5hdmF0YXI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaW1hZ2U7XHJcbn1cclxuXHJcbi8vIE1vdmUgLSBEZWxldGUgLSBTZWxlY3RcclxuXHJcbmZ1bmN0aW9uIG1vdmVfY2hhcmFjdGVyKHRvX2luZGV4LCB0b19jZWxsKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMDsgLy8gZW5kIHRoZSBtb3Rpb25cclxuICB2YXIgY2hvc2VuX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIGRpc3RhbmNlID0gZmluZERpc3RhbmNlKHRvX2luZGV4LCBjaG9zZW5faW5kZXgpXHJcbiAgdmFyIG1heF9kaXN0YW5jZSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltjaG9zZW5fY2hhcmFjdGVyX2luZGV4XVxyXG5cclxuICBpZiAoZGlzdGFuY2UgPD0gbWF4X2Rpc3RhbmNlKSB7XHJcbiAgICBpZiAoIShnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSAmJiBkaXN0YW5jZSA+IDEuNikpIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdtb3ZlX2NoYXJhY3Rlcic7XHJcbiAgICAgIHRvU2VuZC5mcm9tX2luZGV4ID0gY2hvc2VuX2luZGV4O1xyXG4gICAgICB0b1NlbmQudG9faW5kZXggPSB0b19pbmRleDtcclxuICAgICAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4O1xyXG4gICAgICB0b1NlbmQuY2hhcmFjdGVyX2F2YXRhciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmF2YXRhcjtcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLmRpc3RhbmNlID0gZGlzdGFuY2VcclxuICAgICAgdG9TZW5kLmxlZnRfc2hpZWxkID0gMFxyXG4gICAgICB0b1NlbmQubWluZXNfZXhwbG9kZWQgPSBbXVxyXG4gICAgICB0b1NlbmQubWluZXNfZGFtYWdlID0gMFxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uaGFzT3duUHJvcGVydHkoXCJmb3JjZV9maWVsZF90YXJnZXRcIikpIHtcclxuICAgICAgICB2YXIgc2hpZWxkX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5mb3JjZV9maWVsZF90YXJnZXQuc2hpZWxkX2luZGV4XHJcbiAgICAgICAgaWYoIWdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uY2VsbHNfcHJvdGVjdGVkLmluY2x1ZGVzKHRvX2luZGV4KSkgey8vINC/0L7QutC40L3Rg9C7INC30L7QvdGDINC30LDRidC40YLRi1xyXG4gICAgICAgICAgdG9TZW5kLmxlZnRfc2hpZWxkID0gMVxyXG4gICAgICAgICAgdG9TZW5kLnNoaWVsZF9pbmRleCA9IHNoaWVsZF9pbmRleFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZCA9IFtdO1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaG9zZW5fY2hhcmFjdGVyX2luZGV4XSAhPSBcImFsbFwiKSB7Ly91c2VyIGlzIGludmlzaWJsZVxyXG4gICAgICAgIHZhciBpbW1lZGlhdGVfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCAxKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltbWVkaWF0ZV9uYmgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gPiAwICYmIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCkgey8vIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIHRoZXJlXHJcbiAgICAgICAgICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5wdXNoKGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICB2YXIgZXh0ZW5kZWRfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCBpbnZpc2liaWxpdHlfZGV0ZWN0aW9uX3JhZGl1cyk7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4dGVuZGVkX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV0gPiAwICYmIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXSAhPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4KSB7Ly8gdGhlcmUgYXJlIGNoYXJhY3RlcnMgdGhlcmVcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50X2NoYXJfbnVtID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY3VycmVudF9jaGFyX251bV0uaW50ZWxsaWdlbmNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChyb2xsID4gMTApIHtcclxuICAgICAgICAgICAgICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5wdXNoKGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluY2x1ZGVzKHRvX2luZGV4KSkge1xyXG4gICAgICAgIHRvU2VuZC5taW5lc19leHBsb2RlZC5wdXNoKHRvX2luZGV4KVxyXG4gICAgICAgIHRvU2VuZC5taW5lc19kYW1hZ2UgPSB0b1NlbmQubWluZXNfZGFtYWdlICsgcm9sbF94KG1pbmVzXzBfZGlzdGFuY2VfZGFtYWdlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGltbWVkaWF0ZV9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIDEpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltbWVkaWF0ZV9uYmgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dID4gMCAmJiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dICE9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgpIHsvLyB0aGVyZSBhcmUgY2hhcmFjdGVycyB0aGVyZVxyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dXSAhPSBcImFsbFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkLnB1c2goZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluY2x1ZGVzKGltbWVkaWF0ZV9uYmhbaV0pICYmIGltbWVkaWF0ZV9uYmhbaV0gIT0gdG9faW5kZXgpIHtcclxuICAgICAgICAgICAgdG9TZW5kLm1pbmVzX2V4cGxvZGVkLnB1c2goaW1tZWRpYXRlX25iaFtpXSlcclxuICAgICAgICAgICAgdG9TZW5kLm1pbmVzX2RhbWFnZSA9IHRvU2VuZC5taW5lc19kYW1hZ2UgKyByb2xsX3gobWluZXNfMV9kaXN0YW5jZV9kYW1hZ2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgb25lX2FuZF9oYWxmX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgMS42KTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbmVfYW5kX2hhbGZfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluY2x1ZGVzKG9uZV9hbmRfaGFsZl9uYmhbaV0pICYmICghaW1tZWRpYXRlX25iaC5pbmNsdWRlcyhvbmVfYW5kX2hhbGZfbmJoW2ldKSkpIHtcclxuICAgICAgICAgICAgdG9TZW5kLm1pbmVzX2V4cGxvZGVkLnB1c2gob25lX2FuZF9oYWxmX25iaFtpXSlcclxuICAgICAgICAgICAgdG9TZW5kLm1pbmVzX2RhbWFnZSA9IHRvU2VuZC5taW5lc19kYW1hZ2UgKyByb2xsX3gobWluZXNfMXA1X2Rpc3RhbmNlX2RhbWFnZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBleHRlbmRlZF9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIGludmlzaWJpbGl0eV9kZXRlY3Rpb25fcmFkaXVzKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleHRlbmRlZF9uYmgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV0gPiAwICYmIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXSAhPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4ICYmICghaW1tZWRpYXRlX25iaC5pbmNsdWRlcyhleHRlbmRlZF9uYmhbaV0pKSkgey8vIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIHRoZXJlXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50X2NoYXJfbnVtID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dO1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjdXJyZW50X2NoYXJfbnVtXSAhPSBcImFsbFwiKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHJvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uaW50ZWxsaWdlbmNlKTtcclxuICAgICAgICAgICAgICBpZiAocm9sbCA+IDEwKSB7XHJcbiAgICAgICAgICAgICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkLnB1c2goY3VycmVudF9jaGFyX251bSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNsZWFyX2NvbnRhaW5lcnMoKTtcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24gPSB0b19pbmRleFxyXG4gICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcbiAgICAgIGNoYXJhY3Rlcl9jaG9zZW4uY2VsbCA9IHRvX2NlbGxcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0JIg0LHQvtGOINC90YPQttC90L4g0LTQstC40LPQsNGC0YzRgdGPINC/0L7RgdGC0YPQv9Cw0YLQtdC70YzQvdC+ICgxLTIg0LrQu9C10YLQutC4KVwiKVxyXG4gICAgICB1bmRvX3NlbGVjdGlvbigpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0J/QvtC70LXQs9GH0LUsINC80YHRjNC1INCR0L7Qu9GCXCIpXHJcbiAgICB1bmRvX3NlbGVjdGlvbigpXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlX2NoYXJhY3RlcihpbmRleCwgY2hhcmFjdGVyX251bWJlcikge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdkZWxldGVfY2hhcmFjdGVyJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2Vfd2VhcG9uKGNoYXJhY3Rlcl9udW1iZXIsIHdlYXBvbl9pbmRleCkge1xyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltjaGFyYWN0ZXJfbnVtYmVyXSA9IHdlYXBvbl9pbmRleFxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4ud2VhcG9uX2lkID0gd2VhcG9uX2luZGV4XHJcblxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1t3ZWFwb25faW5kZXhdXHJcblxyXG4gIHZhciB3ZWFwb25fbWluaV9kaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWFwb25fbWluaV9kaXNwbGF5XCIpO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3JjID0gd2VhcG9uLmF2YXRhcjtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheV93ZWFwb25fZGV0YWlsZWQod2VhcG9uX2luZGV4LCBjb250YWluZXIsIHNob3dJbWFnZSkge1xyXG4gIHZhciBkZWZhdWx0X3dlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW3dlYXBvbl9pbmRleF1cclxuXHJcbiAgdmFyIHdlYXBvbl9yYW5nZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHdlYXBvbl9yYW5nZV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fcmFuZ2VfZGlzcGxheVwiO1xyXG4gIHdlYXBvbl9yYW5nZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JTQsNC70YzQvdC+0YHRgtGMOiBcIiArIGRlZmF1bHRfd2VhcG9uLnJhbmdlXHJcblxyXG4gIHZhciB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgd2VhcG9uX2RhbWFnZV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fZGFtYWdlX2Rpc3BsYXlcIjtcclxuICB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQo9GA0L7QvTogXCIgKyBkZWZhdWx0X3dlYXBvbi5kYW1hZ2VbMF0gKyAnZCcgKyBkZWZhdWx0X3dlYXBvbi5kYW1hZ2VbMV1cclxuXHJcbiAgdmFyIHdlYXBvbl9uYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgd2VhcG9uX25hbWVfZGlzcGxheS5pZCA9IFwid2VhcG9uX25hbWVfZGlzcGxheVwiO1xyXG4gIHdlYXBvbl9uYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gZGVmYXVsdF93ZWFwb24ubmFtZVxyXG5cclxuICBpZiAoc2hvd0ltYWdlKSB7XHJcbiAgICB2YXIgd2VhcG9uX2F2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5pZCA9IFwid2VhcG9uX2F2YXRhcl9kaXNwbGF5XCJcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zcmMgPSBkZWZhdWx0X3dlYXBvbi5hdmF0YXI7XHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcbiAgfVxyXG4gIGNvbnRhaW5lci5hcHBlbmQod2VhcG9uX25hbWVfZGlzcGxheSlcclxuICBpZiAoc2hvd0ltYWdlKSB7XHJcbiAgICBjb250YWluZXIuYXBwZW5kKHdlYXBvbl9hdmF0YXJfZGlzcGxheSlcclxuICB9XHJcbiAgY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fcmFuZ2VfZGlzcGxheSlcclxuICBjb250YWluZXIuYXBwZW5kKHdlYXBvbl9kYW1hZ2VfZGlzcGxheSlcclxuICBjb250YWluZXIuc2hvdygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdF9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcblxyXG5cclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSBcImFsbFwiIHx8IGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gbXlfbmFtZSkge1xyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkID0gY2hhcmFjdGVyX251bWJlclxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IGluZGV4XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jZWxsID0gY2VsbFxyXG5cclxuICBsZXQgbmFtZSA9IGNoYXJhY3Rlci5uYW1lO1xyXG4gIGxldCBhdmF0YXIgPSBjaGFyYWN0ZXIuYXZhdGFyO1xyXG5cclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIG5hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBuYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gbmFtZTtcclxuXHJcbiAgdmFyIGF2YXRhcl9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHZhciBhdmF0YXJfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3JjID0gYXZhdGFyO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuICBhdmF0YXJfY29udGFpbmVyLmFwcGVuZENoaWxkKGF2YXRhcl9kaXNwbGF5KVxyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKG5hbWVfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChhdmF0YXJfY29udGFpbmVyKTtcclxuXHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiIHx8IGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IDEpIHtcclxuXHJcbiAgICBhdmF0YXJfZGlzcGxheS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNob3dfbW9kYWwoY2hhcmFjdGVyX251bWJlciwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXZhdGFyX2Rpc3BsYXkub25tb3VzZWVudGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgICAgIHZhciBtYWluX2FjdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgYm9udXNfYWN0aW9uID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbW92ZV9hY3Rpb24gPSBNYXRoLmZsb29yKGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSlcclxuXHJcbiAgICAgIHZhciBtYWluX2FjdGlvbl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICBtYWluX2FjdGlvbl9kaXNwbGF5LmlkID0gXCJtYWluX2FjdGlvbl9kaXNwbGF5XCI7XHJcbiAgICAgIG1haW5fYWN0aW9uX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQntGB0L3QvtCy0L3Ri9GFOiBcIiArIG1haW5fYWN0aW9uXHJcblxyXG4gICAgICB2YXIgYm9udXNfYWN0aW9uX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgIGJvbnVzX2FjdGlvbl9kaXNwbGF5LmlkID0gXCJib251c19hY3Rpb25fZGlzcGxheVwiO1xyXG4gICAgICBib251c19hY3Rpb25fZGlzcGxheS5pbm5lckhUTUwgPSBcItCR0L7QvdGD0YHQvdGL0YU6IFwiICsgYm9udXNfYWN0aW9uXHJcblxyXG4gICAgICB2YXIgbW92ZV9hY3Rpb25fZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgbW92ZV9hY3Rpb25fZGlzcGxheS5pZCA9IFwibW92ZV9hY3Rpb25fZGlzcGxheVwiO1xyXG4gICAgICBtb3ZlX2FjdGlvbl9kaXNwbGF5LmlubmVySFRNTCA9IFwi0J/QtdGA0LXQtNCy0LjQttC10L3QuNC1OiBcIiArIG1vdmVfYWN0aW9uXHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSAhPSBcImFsbFwiKSB7Ly8g0LIg0LjQvdCy0LjQt9C1XHJcbiAgICAgICAgdmFyIGludmlzZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICAgICAgICBpbnZpc2VfZGlzcGxheS5zcmMgPSBJTlZJU0VfSU1BR0U7XHJcbiAgICAgICAgaW52aXNlX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xyXG4gICAgICAgIGludmlzZV9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzUwcHgnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSkgey8vICDQn9GA0LjRhtC10LvQtdC9XHJcbiAgICAgICAgdmFyIGFpbV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICAgICAgICBhaW1fZGlzcGxheS5zcmMgPSBBSU1fSU1BR0U7XHJcbiAgICAgICAgYWltX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xyXG4gICAgICAgIGFpbV9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzUwcHgnO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChtYWluX2FjdGlvbl9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKGJvbnVzX2FjdGlvbl9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKG1vdmVfYWN0aW9uX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoaW52aXNlX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYWltX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5zaG93KClcclxuICAgIH1cclxuXHJcbiAgICBhdmF0YXJfZGlzcGxheS5vbm1vdXNlbGVhdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuaGlkZSgpXHJcbiAgICB9XHJcblxyXG4gIHZhciBzdHJlbmd0aF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHN0cmVuZ3RoX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCJD0LjQu9CwOiBcIiArIGNoYXJhY3Rlci5zdHJlbmd0aDtcclxuXHJcbiAgdmFyIHN0YW1pbmFfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBzdGFtaW5hX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQotC10LvQvtGB0LvQvtC20LXQvdC40LU6IFwiICsgY2hhcmFjdGVyLnN0YW1pbmE7XHJcblxyXG4gIHZhciBhZ2lsaXR5X2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgYWdpbGl0eV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JvQvtCy0LrQvtGB0YLRjDogXCIgKyBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcbiAgdmFyIGludGVsbGlnZW5jZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGludGVsbGlnZW5jZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdGC0LXQu9C70LXQutGCOiBcIiArIGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcblxyXG4gIHZhciBLRF92YWx1ZSA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2NoYXJhY3Rlcl9udW1iZXJdKVxyXG4gIHZhciBLRF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIEtEX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQmtCUOiBcIiArIEtEX3ZhbHVlO1xyXG5cclxuICB2YXIgaHBfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgaHBfcGVyY2VudCA9IE1hdGguZmxvb3IoaHBfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIEhQX2Rpc3BsYXkuaWQgPSBcIkhQX2Rpc3BsYXlcIjtcclxuICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gKyBcIiAoXCIgKyBocF9wZXJjZW50ICsgXCIlKVwiO1xyXG5cclxuICB2YXIgdGlyZWRfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0pL3BhcnNlRmxvYXQoc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKVxyXG4gIHRpcmVkX3BlcmNlbnQgPSBNYXRoLmZsb29yKHRpcmVkX3BlcmNlbnQqMTAwKVxyXG5cclxuICB2YXIgdGlyZWRfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB0aXJlZF9kaXNwbGF5LmlkID0gXCJ0aXJlZF9kaXNwbGF5XCI7XHJcbiAgdGlyZWRfZGlzcGxheS5pbm5lckhUTUwgPSBcItCS0YvQvdC+0YHQu9C40LLQvtGB0YLRjDogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSArIFwiIChcIiArIHRpcmVkX3BlcmNlbnQgKyBcIiUpXCI7XHJcblxyXG4gIHZhciBpbml0aWF0aXZlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgaW5pdGlhdGl2ZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdC40YbQuNCw0YLQuNCy0LA6IFwiICsgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoc3RyZW5ndGhfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzdGFtaW5hX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYWdpbGl0eV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGludGVsbGlnZW5jZV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKEtEX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoSFBfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZCh0aXJlZF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGluaXRpYXRpdmVfZGlzcGxheSk7XHJcblxyXG4gIHZhciBtb3ZlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgbW92ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQn9C10YDQtdC80LXRidC10L3QuNC1XCI7XHJcbiAgbW92ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBtb3ZlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICBtb3ZlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBjaGFyYWN0ZXJfcGlja2VkID0gZXZlbnQudGFyZ2V0XHJcbiAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2hhcmFjdGVyX3BpY2tlZC5pbmRleF07XHJcbiAgICB2YXIgbW92ZV9hY3Rpb25zX2xlZnQgPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgIGlmIChtb3ZlX2FjdGlvbnNfbGVmdCA+IDApIHtcclxuICAgICAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShjaGFyYWN0ZXJfcGlja2VkLmluZGV4LCBjaGFyYWN0ZXJfcGlja2VkLmNlbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQktGLINC/0L7RgtGA0LDRgtC40LvQuCDQstGB0LUg0L/QtdGA0LXQvNC10YnQtdC90LjRjyDQvdCwINGN0YLQvtC8INGF0L7QtNGDIVwiKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcblxyXG4gICAgdmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCj0L3QuNGH0YLQvtC20LjRgtGMXCI7XHJcbiAgICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgICBkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZGVsZXRlX2NoYXJhY3RlcihpbmRleCwgY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbi5pbm5lckhUTUwgPSBcItCY0LfQvNC10L3QuNGC0Ywg0LLQuNC00LjQvNC+0YHRgtGMXCI7XHJcbiAgICBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHkoY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRhbWFnZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGFtYWdlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCd0LDQvdC10YHRgtC4INGD0YDQvtC9XCI7XHJcbiAgICBkYW1hZ2VfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgICBkYW1hZ2VfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW1hZ2VfZmllbGRcIik7XHJcbiAgICAgIGlmICghKGRhbWFnZV9maWVsZC52YWx1ZSA9PT0gXCJcIikpIHtcclxuICAgICAgICB2YXIgZGFtYWdlID0gcGFyc2VJbnQoZGFtYWdlX2ZpZWxkLnZhbHVlKTtcclxuICAgICAgICB2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiSFBfZGlzcGxheVwiKTtcclxuICAgICAgICB2YXIgbmV3X0hQID0gY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdIC0gZGFtYWdlO1xyXG4gICAgICAgIEhQX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQpdCfOiBcIiArIG5ld19IUDtcclxuXHJcbiAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ2RlYWxfZGFtYWdlJztcclxuICAgICAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICAgIHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBkYW1hZ2VfZmllbGQuaWQgPSBcImRhbWFnZV9maWVsZFwiO1xyXG4gICAgZGFtYWdlX2ZpZWxkLnR5cGUgPSBcIm51bWJlclwiO1xyXG4gICAgZGFtYWdlX2ZpZWxkLnBsYWNlaG9sZGVyID0gXCLQl9C90LDRh9C10L3QuNC1INGD0YDQvtC90LBcIjtcclxuXHJcbiAgfVxyXG5cclxuICB2YXIgc2VhcmNoX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgc2VhcmNoX2J1dHRvbi5pbm5lckhUTUwgPSBcItCe0LHRi9GB0LrQsNGC0YxcIjtcclxuICBzZWFyY2hfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgc2VhcmNoX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHNlYXJjaF9hY3Rpb24oZXZlbnQudGFyZ2V0KTtcclxuICB9XHJcblxyXG4gIHZhciBzaW1wbGVfcm9sbF9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHNpbXBsZV9yb2xsX2J1dHRvbi5pbm5lckhUTUwgPSBcItCf0YDQvtGB0YLQviBkMjBcIjtcclxuICBzaW1wbGVfcm9sbF9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMClcclxuICAgIHZhciB0b1NlbmQgPSB7fVxyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSBcInNpbXBsZV9yb2xsXCJcclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbmFtZSA9IGNoYXJhY3Rlci5uYW1lXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tXHJcbiAgICB0b1NlbmQucm9sbCA9IHJvbGxcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH1cclxuXHJcbiAgLy92YXIgd2VhcG9uX3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgLy93ZWFwb25fc2VsZWN0LmlkID0gXCJ3ZWFwb25fY2hvc2VuXCI7XHJcblxyXG4gIHZhciBpbnZlbnRvcnkgPSBjaGFyYWN0ZXIuaW52ZW50b3J5XHJcblxyXG4gIC8qXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnZlbnRvcnkubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSB3ZWFwb25fbGlzdFtpbnZlbnRvcnlbaV1dO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpbnZlbnRvcnlbaV07XHJcbiAgICB3ZWFwb25fc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICB9XHJcbiAgKi9cclxuXHJcbiAgLypcclxuICB2YXIgcGlja193ZWFwb25fYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBwaWNrX3dlYXBvbl9idXR0b24uaW5uZXJIVE1MID0gXCLQodC80LXQvdC40YLRjCDQvtGA0YPQttC40LVcIjtcclxuICBwaWNrX3dlYXBvbl9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBwaWNrX3dlYXBvbl9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgd2VhcG9uX3NlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhcG9uX2Nob3NlblwiKVxyXG4gICAgdmFyIHdlYXBvbl9pbmRleCA9IHdlYXBvbl9zZWxlY3QudmFsdWVcclxuXHJcbiAgICBjaGFuZ2Vfd2VhcG9uKGNoYXJhY3Rlcl9udW1iZXIsIHdlYXBvbl9pbmRleClcclxuICB9XHJcbiAgKi9cclxuXHJcbiAgdmFyIGRlZmF1bHRfd2VhcG9uX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi53ZWFwb25faWQgPSBkZWZhdWx0X3dlYXBvbl9pbmRleFxyXG4gIHZhciBkZWZhdWx0X3dlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2RlZmF1bHRfd2VhcG9uX2luZGV4XVxyXG5cclxuICB2YXIgd2VhcG9uX21pbmlfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5pZCA9IFwid2VhcG9uX21pbmlfZGlzcGxheVwiXHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5zcmMgPSBkZWZhdWx0X3dlYXBvbi5hdmF0YXI7XHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5zdHlsZS53aWR0aCA9ICc4MHB4JztcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICc4MHB4JztcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5Lm9ubW91c2VlbnRlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgd2VhcG9uX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBkaXNwbGF5X3dlYXBvbl9kZXRhaWxlZCh3ZWFwb25faW5kZXgsIHdlYXBvbl9pbmZvX2NvbnRhaW5lciwgdHJ1ZSlcclxuICB9XHJcblxyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuaGlkZSgpXHJcbiAgfVxyXG5cclxuICB3ZWFwb25fbWluaV9kaXNwbGF5Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIHNob3dfd2VhcG9uX21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIDApO1xyXG4gIH1cclxuXHJcbiAgYXZhdGFyX2NvbnRhaW5lci5hcHBlbmQod2VhcG9uX21pbmlfZGlzcGxheSlcclxuXHJcbiAgdmFyIGF0dGFja19idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGF0dGFja19idXR0b24uaW5uZXJIVE1MID0gXCLQkNGC0LDQutC+0LLQsNGC0YxcIjtcclxuICBhdHRhY2tfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIG1haW5fYWN0aW9uc19sZWZ0ID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBpZiAobWFpbl9hY3Rpb25zX2xlZnQgPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fYXR0YWNrKGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCjINCy0LDRgSDQvdC1INC+0YHRgtCw0LvQvtGB0Ywg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qXHJcbiAgdmFyIHNraWxsX3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2tpbGxfc2VsZWN0LmlkID0gXCJza2lsbF9jaG9zZW5cIjtcclxuICAqL1xyXG5cclxuICB2YXIgc2tpbGxzZXQgPSBjaGFyYWN0ZXIuc2tpbGxzZXRcclxuXHJcbiAgLypcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNraWxsc2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gc2tpbGxfbGlzdFtza2lsbHNldFtpXV07XHJcbiAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IHNraWxsc2V0W2ldO1xyXG4gICAgc2tpbGxfc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICB9XHJcblxyXG4gIHZhciBza2lsbF9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHNraWxsX2J1dHRvbi5pbm5lckhUTUwgPSBcItCY0YHQv9C+0LvRjNC30L7QstCw0YLRjCDRg9C80LXQvdC40LVcIjtcclxuICBza2lsbF9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgc2tpbGxfc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbF9jaG9zZW5cIilcclxuICAgIHZhciBza2lsbF9pbmRleCA9IHNraWxsX3NlbGVjdC52YWx1ZVxyXG4gICAgdXNlX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBpbmRleCwgY2VsbClcclxuICB9XHJcbiAgKi9cclxuXHJcblxyXG4gIHZhciBidXR0b25fbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICBidXR0b25fbGlzdC5jbGFzc05hbWUgPSBcImJ1dHRvbl9saXN0XCI7XHJcbiAgdmFyIGxpbmUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lOCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcblxyXG4gIGxpbmUxLmFwcGVuZENoaWxkKG1vdmVfYnV0dG9uKTtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgIGxpbmUyLmFwcGVuZENoaWxkKGRlbGV0ZV9idXR0b24pO1xyXG4gICAgbGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2J1dHRvbik7XHJcbiAgICBsaW5lMy5hcHBlbmRDaGlsZChkYW1hZ2VfZmllbGQpO1xyXG4gICAgbGluZTguYXBwZW5kQ2hpbGQoY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbik7XHJcbiAgfVxyXG4gIGxpbmU0LmFwcGVuZENoaWxkKHNlYXJjaF9idXR0b24pO1xyXG4gIC8vbGluZTUuYXBwZW5kQ2hpbGQocGlja193ZWFwb25fYnV0dG9uKTtcclxuICAvL2xpbmU1LmFwcGVuZENoaWxkKHdlYXBvbl9zZWxlY3QpO1xyXG4gIGxpbmU2LmFwcGVuZENoaWxkKGF0dGFja19idXR0b24pO1xyXG4gIGxpbmU3LmFwcGVuZENoaWxkKHNpbXBsZV9yb2xsX2J1dHRvbik7XHJcbiAgLy9saW5lOS5hcHBlbmRDaGlsZChza2lsbF9idXR0b24pO1xyXG4gIC8vbGluZTkuYXBwZW5kQ2hpbGQoc2tpbGxfc2VsZWN0KTtcclxuXHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTEpO1xyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTIpO1xyXG4gICAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTMpO1xyXG4gICAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTgpO1xyXG4gIH1cclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNCk7XHJcbiAgLy9idXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNSk7XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTYpO1xyXG4gIC8vYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTkpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU3KTtcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b25fbGlzdCk7XHJcblxyXG59IGVsc2Uge1xyXG4gIHZhciBocF9wZXJjZW50ID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0pL3BhcnNlRmxvYXQoSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSlcclxuICBocF9wZXJjZW50ID0gTWF0aC5mbG9vcihocF9wZXJjZW50KjEwMClcclxuXHJcbiAgdmFyIEhQX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgSFBfZGlzcGxheS5pZCA9IFwiSFBfZGlzcGxheVwiO1xyXG4gIEhQX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQpdCfOiBcIiArIGhwX3BlcmNlbnQgKyBcIiVcIjtcclxuXHJcbiAgdmFyIHRpcmVkX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSlcclxuICB0aXJlZF9wZXJjZW50ID0gTWF0aC5mbG9vcih0aXJlZF9wZXJjZW50KjEwMClcclxuXHJcbiAgdmFyIHRpcmVkX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgdGlyZWRfZGlzcGxheS5pZCA9IFwidGlyZWRfZGlzcGxheVwiO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQktGL0L3QvtGB0LvQuNCy0L7RgdGC0Yw6IFwiICsgdGlyZWRfcGVyY2VudCArIFwiJVwiO1xyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKEhQX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQodGlyZWRfZGlzcGxheSk7XHJcbn1cclxuXHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG5cclxufVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlX29iamVjdF9jb21tYW5kKGluZGV4KSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2RlbGV0ZV9jaGFyYWN0ZXInO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZV9vYmplY3QoZXZlbnQpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgZGVsZXRlX29iamVjdF9jb21tYW5kKGV2ZW50LnRhcmdldC5pbmRleClcclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0X29ic3RhY2xlKGluZGV4LCBjZWxsKSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgdmFyIG9ic3RhY2xlX2lkID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gKiAoLTEpO1xyXG4gIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9bb2JzdGFjbGVfaWRdO1xyXG5cclxuICAvLyBrZWVwIHRyYWNrIG9mIGxhc3QgY2hvc2VuIG9ic3RhbGUgdG8gcXVpY2tseSBhZGQgdG8gdGhlIG1hcFxyXG4gIGxhc3Rfb2JzdGFjbGUgPSBvYnN0YWNsZV9pZFxyXG5cclxuICBsZXQgbmFtZSA9IG9ic3RhY2xlLm5hbWU7XHJcbiAgbGV0IGF2YXRhciA9IG9ic3RhY2xlLmF2YXRhcjtcclxuXHJcbiAgdmFyIG5hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBuYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gbmFtZTtcclxuXHJcbiAgdmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQobmFtZV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGF2YXRhcl9kaXNwbGF5KTtcclxuXHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICB2YXIgZGVsZXRlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBkZWxldGVfYnV0dG9uLmlubmVySFRNTCA9IFwi0KPQvdC40YfRgtC+0LbQuNGC0YxcIjtcclxuICAgIGRlbGV0ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICAgIGRlbGV0ZV9idXR0b24uY2VsbCA9IGNlbGw7XHJcbiAgICBkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBkZWxldGVfb2JqZWN0KGV2ZW50KTtcclxuICAgIH1cclxuICAgIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoZGVsZXRlX2J1dHRvbik7XHJcbiAgfVxyXG5cclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAxXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gaW5kZXg7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF07XHJcbiAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL2xvYWRpbmcud2VicFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1bmRvX3NlbGVjdGlvbigpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwXHJcbiAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uKTtcclxuICBvbGRfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRdLmF2YXRhcjtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd193ZWFwb25fbW9kYWwoY2hhcmFjdGVyX251bWJlciwgc3RhcnRpbmdfaW5kZXgpIHtcclxuICBoaWRlX21vZGFsKClcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgaW52ZW50b3J5ID0gY2hhcmFjdGVyLmludmVudG9yeVxyXG5cclxuICB2YXIgd2VhcG9uX3RhYmxlID0gJChcIjx0YWJsZT5cIik7XHJcbiAgdmFyIHRhYmxlX3NpemUgPSAzXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGVfc2l6ZTsgaSsrKSB7XHJcbiAgICB2YXIgcm93ID0gJChcIjx0cj5cIik7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRhYmxlX3NpemU7IGorKykge1xyXG4gICAgICB2YXIgaW5kZXggPSBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqaSArIGpcclxuICAgICAgaWYgKGluZGV4IDwgaW52ZW50b3J5Lmxlbmd0aCkge1xyXG4gICAgICAgIHZhciB3ZWFwb25fbnVtYmVyID0gaW52ZW50b3J5W2luZGV4XVxyXG4gICAgICAgIHZhciBjb2x1bW4gPSAkKFwiPHRoPlwiKTtcclxuICAgICAgICB2YXIgd2VhcG9uX2ljb24gPSAkKFwiPElNRz5cIik7XHJcbiAgICAgICAgdmFyIGF2YXRhciA9IFFVRVNUSU9OX0lNQUdFXHJcbiAgICAgICAgaWYgKHdlYXBvbl9kZXRhaWxlZF9pbmZvW3dlYXBvbl9udW1iZXJdLmhhc093blByb3BlcnR5KCdhdmF0YXInKSkge1xyXG4gICAgICAgICAgYXZhdGFyID0gd2VhcG9uX2RldGFpbGVkX2luZm9bd2VhcG9uX251bWJlcl0uYXZhdGFyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdlYXBvbl9pY29uLmFkZENsYXNzKCd3ZWFwb25faWNvbicpO1xyXG4gICAgICAgIHdlYXBvbl9pY29uLmF0dHIoJ3dpZHRoJywgJzEwMHB4Jyk7XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYXR0cignd2VhcG9uX251bWJlcicsIHdlYXBvbl9udW1iZXIpO1xyXG4gICAgICAgIHdlYXBvbl9pY29uLmF0dHIoJ2hlaWdodCcsICcxMDBweCcpO1xyXG4gICAgICAgIHdlYXBvbl9pY29uLmF0dHIoJ3NyYycsIGF2YXRhcik7XHJcbiAgICAgICAgd2VhcG9uX2ljb24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHZhciB3ZWFwb25fbnVtID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnd2VhcG9uX251bWJlcicpO1xyXG4gICAgICAgICAgY2hhbmdlX3dlYXBvbihjaGFyYWN0ZXJfbnVtYmVyLCB3ZWFwb25fbnVtKTtcclxuICAgICAgICAgIGhpZGVfbW9kYWwoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdlYXBvbl9pY29uLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHZhciB3ZWFwb25fbnVtID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnd2VhcG9uX251bWJlcicpO1xyXG4gICAgICAgICAgZGlzcGxheV93ZWFwb25fZGV0YWlsZWQod2VhcG9uX251bSwgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLCBmYWxzZSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB3ZWFwb25faWNvbi5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuaHRtbCgnJyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb2x1bW4uYXBwZW5kKHdlYXBvbl9pY29uKTtcclxuICAgICAgICByb3cuYXBwZW5kKGNvbHVtbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHdlYXBvbl90YWJsZS5hcHBlbmQocm93KTtcclxuICB9XHJcbiAgc2tpbGxfbW9kYWxfY29udGVudC5hcHBlbmQod2VhcG9uX3RhYmxlKTtcclxuXHJcbiAgaWYgKGludmVudG9yeS5sZW5ndGggPiBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqdGFibGVfc2l6ZSkgey8vIHRoZXJlIGFyZSBtb3JlIHNraWxscyB0byBkaXNwbGF5XHJcbiAgICB2YXIgbmV4dF9wYWdlX2J1dHRvbiA9ICQoXCI8SU1HPlwiKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24uYXR0cignd2lkdGgnLCAnMTAwcHgnKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24uYXR0cignaGVpZ2h0JywgJzUwcHgnKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24uYXR0cignc3JjJywgUklHSFRfQVJST1dfSU1BR0UpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHNob3dfd2VhcG9uX21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSp0YWJsZV9zaXplKTtcclxuICAgIH0pXHJcblxyXG4gICAgbmV4dF9wYWdlX2J1dHRvbl9jb250YWluZXIuYXBwZW5kKG5leHRfcGFnZV9idXR0b24pO1xyXG4gIH1cclxuICBza2lsbF9tb2RhbC5zaG93KCk7XHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd19tb2RhbChjaGFyYWN0ZXJfbnVtYmVyLCBzdGFydGluZ19pbmRleCkge1xyXG4gIGhpZGVfbW9kYWwoKTtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgc2tpbGxzZXQgPSBjaGFyYWN0ZXIuc2tpbGxzZXRcclxuXHJcbiAgdmFyIHNraWxsX3RhYmxlID0gJChcIjx0YWJsZT5cIik7XHJcblxyXG4gIHZhciB0YWJsZV9zaXplID0gM1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlX3NpemU7IGkrKykge1xyXG4gICAgdmFyIHJvdyA9ICQoXCI8dHI+XCIpO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0YWJsZV9zaXplOyBqKyspIHtcclxuICAgICAgdmFyIGluZGV4ID0gc3RhcnRpbmdfaW5kZXggKyB0YWJsZV9zaXplKmkgKyBqXHJcbiAgICAgIGlmIChpbmRleCA8IHNraWxsc2V0Lmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBza2lsbF9udW1iZXIgPSBza2lsbHNldFtpbmRleF1cclxuICAgICAgICB2YXIgY29sdW1uID0gJChcIjx0aD5cIik7XHJcbiAgICAgICAgdmFyIHNraWxsX2ljb24gPSAkKFwiPElNRz5cIik7XHJcbiAgICAgICAgdmFyIGF2YXRhciA9IFFVRVNUSU9OX0lNQUdFXHJcbiAgICAgICAgaWYgKHNraWxsX2RldGFpbGVkX2luZm9bc2tpbGxfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eSgnYXZhdGFyJykpIHtcclxuICAgICAgICAgIGF2YXRhciA9IHNraWxsX2RldGFpbGVkX2luZm9bc2tpbGxfbnVtYmVyXS5hdmF0YXJcclxuICAgICAgICB9XHJcbiAgICAgICAgc2tpbGxfaWNvbi5hZGRDbGFzcygnc2tpbGxfaWNvbicpO1xyXG4gICAgICAgIHNraWxsX2ljb24uYXR0cignd2lkdGgnLCAnMTAwcHgnKTtcclxuICAgICAgICBza2lsbF9pY29uLmF0dHIoJ3NraWxsX251bWJlcicsIHNraWxsX251bWJlcik7XHJcbiAgICAgICAgc2tpbGxfaWNvbi5hdHRyKCdoZWlnaHQnLCAnMTAwcHgnKTtcclxuICAgICAgICBza2lsbF9pY29uLmF0dHIoJ3NyYycsIGF2YXRhcik7XHJcbiAgICAgICAgc2tpbGxfaWNvbi5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgdmFyIHBvc2l0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIHBvc2l0aW9uKTtcclxuICAgICAgICAgIHVzZV9za2lsbChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdza2lsbF9udW1iZXInKSwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICBoaWRlX21vZGFsKClcclxuICAgICAgICB9KTtcclxuICAgICAgICBza2lsbF9pY29uLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHZhciBza2lsbF9udW1iZXIgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdza2lsbF9udW1iZXInKTtcclxuICAgICAgICAgIHZhciBza2lsbF9vYmplY3QgPSBza2lsbF9kZXRhaWxlZF9pbmZvW3NraWxsX251bWJlcl07XHJcbiAgICAgICAgICB2YXIgc2tpbGxfbmFtZV9vYmplY3QgPSAkKFwiPGgyPlwiKTtcclxuICAgICAgICAgIHZhciBza2lsbF9uYW1lID0gc2tpbGxfbGlzdFtza2lsbF9udW1iZXJdO1xyXG4gICAgICAgICAgc2tpbGxfbmFtZV9vYmplY3QuaHRtbChza2lsbF9uYW1lKTtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5hcHBlbmQoc2tpbGxfbmFtZV9vYmplY3QpO1xyXG5cclxuICAgICAgICAgIHZhciBza2lsbF9jb3N0X29iamVjdCA9ICQoXCI8aDI+XCIpO1xyXG4gICAgICAgICAgaWYgKHNraWxsX29iamVjdC5oYXNPd25Qcm9wZXJ0eSgnY29zdCcpKSB7XHJcbiAgICAgICAgICAgIHZhciBza2lsbF9jb3N0ID0gc2tpbGxfb2JqZWN0LmNvc3Q7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfY29zdCA9IFwi0J3QtdC40LfQstC10YHRgtC90L5cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2tpbGxfY29zdF9vYmplY3QuaHRtbChcItCi0YDQtdCx0YPQtdGCINC00LXQudGB0YLQstC40Lk6IFwiICsgc2tpbGxfY29zdCk7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuYXBwZW5kKHNraWxsX2Nvc3Rfb2JqZWN0KTtcclxuXHJcbiAgICAgICAgICB2YXIgc2tpbGxfZGVzY3JpcHRpb25fb2JqZWN0ID0gJChcIjxwPlwiKTtcclxuICAgICAgICAgIGlmIChza2lsbF9vYmplY3QuaGFzT3duUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJykpIHtcclxuICAgICAgICAgICAgdmFyIHNraWxsX2Rlc2NyaXB0aW9uID0gc2tpbGxfb2JqZWN0LmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHNraWxsX2Rlc2NyaXB0aW9uID0gXCLQnNGLINGB0LDQvNC4INC90LUg0LfQvdCw0LXQvCDRh9GC0L4g0L7QvdC+INC00LXQu9Cw0LXRglwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9vYmplY3QuaHRtbChza2lsbF9kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuYXBwZW5kKHNraWxsX2Rlc2NyaXB0aW9uX29iamVjdCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgc2tpbGxfaWNvbi5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuaHRtbCgnJyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb2x1bW4uYXBwZW5kKHNraWxsX2ljb24pO1xyXG4gICAgICAgIHJvdy5hcHBlbmQoY29sdW1uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2tpbGxfdGFibGUuYXBwZW5kKHJvdyk7XHJcbiAgfVxyXG4gIHNraWxsX21vZGFsX2NvbnRlbnQuYXBwZW5kKHNraWxsX3RhYmxlKTtcclxuXHJcbiAgaWYgKHNraWxsc2V0Lmxlbmd0aCA+IHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSp0YWJsZV9zaXplKSB7Ly8gdGhlcmUgYXJlIG1vcmUgc2tpbGxzIHRvIGRpc3BsYXlcclxuICAgIHZhciBuZXh0X3BhZ2VfYnV0dG9uID0gJChcIjxJTUc+XCIpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCd3aWR0aCcsICcxMDBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdoZWlnaHQnLCAnNTBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdzcmMnLCBSSUdIVF9BUlJPV19JTUFHRSk7XHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgc2hvd19tb2RhbChjaGFyYWN0ZXJfbnVtYmVyLCBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqdGFibGVfc2l6ZSk7XHJcbiAgICB9KVxyXG5cclxuICAgIG5leHRfcGFnZV9idXR0b25fY29udGFpbmVyLmFwcGVuZChuZXh0X3BhZ2VfYnV0dG9uKTtcclxuICB9XHJcbiAgc2tpbGxfbW9kYWwuc2hvdygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlX21vZGFsKCkge1xyXG4gIHNraWxsX21vZGFsLmhpZGUoKTtcclxuICBza2lsbF9tb2RhbF9jb250ZW50Lmh0bWwoXCJcIik7XHJcbiAgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLmh0bWwoXCJcIik7XHJcbiAgbmV4dF9wYWdlX2J1dHRvbl9jb250YWluZXIuaHRtbChcIlwiKTtcclxufVxyXG5cclxuLy8gYXR0YWNrIHJlbGF0ZWQgaGVscGVyc1xyXG5cclxuZnVuY3Rpb24gY2hvb3NlX2NoYXJhY3Rlcl90b19hdHRhY2soY2VsbCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDJcclxuICBjZWxsLnNyYyA9IFwiLi9pbWFnZXMvYXR0YWNrX3BsYWNlaG9sZGVyLmpwZ1wiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wX2F0dGFjaygpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwXHJcbiAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uKTtcclxuICBvbGRfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRdLmF2YXRhcjtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RvcF9za2lsbCgpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwXHJcbiAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uKTtcclxuICBvbGRfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRdLmF2YXRhcjtcclxufVxyXG5cclxuXHJcbi8vIHJvbGwgc29tZXRoaW5nXHJcblxyXG5mdW5jdGlvbiByb2xsX3goeCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB4KSArIDFcclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbFNlYXJjaChpbnRlbGxpZ2VuY2UsIG1vZCkge1xyXG4gIHJldHVybiBpbnRlbGxpZ2VuY2UgKyByb2xsX3goMjApICsgbW9kO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsSW5pdGlhdGl2ZSgpIHtcclxuICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLkhQW2ldID4gMCkgeyAvLyBzbyBjaGFyYWN0ZXIgaSBpcyBwcmVzZW50XHJcbiAgICAgIC8vIHJldHJpZXZlIHRoYXQgY2hhcmFjdGVyJ3MgYWdpbGl0eVxyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baV07XHJcbiAgICAgIHZhciBhZ2lsaXR5ID0gY2hhcmFjdGVyLmFnaWxpdHk7XHJcblxyXG4gICAgICAvLyByb2xsIGluaXRpYXRpdmUgYW5kIGFkZCBhZ2lsaXR5IG1vZGlmaWNhdG9yXHJcbiAgICAgIHZhciBpbml0aWF0aXZlID0gY29tcHV0ZUluaXRpYXRpdmUocGFyc2VJbnQoYWdpbGl0eSkpO1xyXG5cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbaV0gPSBpbml0aWF0aXZlO1xyXG4gICAgfVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAncm9sbF9pbml0aWF0aXZlJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbml0aWF0aXZlX3N0YXRlID0gY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmU7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxfYXR0YWNrKHR5cGUsIGF0dGFja2VyLCB0YXJnZXQsIGFkdmFudGFnZV9ib251cykge1xyXG4gIHZhciBhZHZhbnRhZ2UgPSAwXHJcbiAgaWYgKCh0eXBlID09IFwicmFuZ2VkXCIpfHwodHlwZSA9PSBcImVuZXJneVwiKSkge1xyXG4gICAgYWR2YW50YWdlID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbYXR0YWNrZXJdO1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmhhc093blByb3BlcnR5KFwiYWRhcHRpdmVfZmlnaHRpbmdcIikpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID09IDApIHtcclxuICAgICAgICBhZHZhbnRhZ2UgPSBhZHZhbnRhZ2UgKyAxO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KHRgNCw0LHQvtGC0LDQuyDRgNC10LnQvdC00LbQvtCy0YvQuSDRgdGC0LDQuiDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0LhcIik7XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uYWRhcHRpdmVfZmlnaHRpbmcgPSAxO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAodHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIGFkdmFudGFnZSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbYXR0YWNrZXJdXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uaGFzT3duUHJvcGVydHkoXCJhZGFwdGl2ZV9maWdodGluZ1wiKSkge1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uYWRhcHRpdmVfZmlnaHRpbmcgPT0gMSkge1xyXG4gICAgICAgIGFkdmFudGFnZSA9IGFkdmFudGFnZSArIDE7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQodGA0LDQsdC+0YLQsNC7INC80LjQu9C70Lgg0YHRgtCw0Log0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtC4XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gMDtcclxuICAgIH1cclxuICB9XHJcbiAgYWR2YW50YWdlID0gYWR2YW50YWdlIC0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbdGFyZ2V0XSArIGFkdmFudGFnZV9ib251c1xyXG5cclxuICB2YXIgcm9sbCA9IDBcclxuXHJcbiAgaWYgKGFkdmFudGFnZSA+PSAyKSB7IC8vINCU0LjQutC+0LUg0L/RgNC10LjQvNGD0YnQtdGB0YLQstC+ID0gNCDQutGD0LHQsFxyXG4gICAgY29uc29sZS5sb2coXCLQlNC40LrQvtC1INC/0YDQtdC40LzRg9GJ0LXRgdGC0LLQvlwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwzID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGw0ID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWF4KHJvbGwxLCByb2xsMiwgcm9sbDMsIHJvbGw0KVxyXG4gIH0gZWxzZSBpZiAoYWR2YW50YWdlID09IDEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwi0J/RgNC10LjQvNGD0YnQtdGB0YLQstC+XCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5tYXgocm9sbDEsIHJvbGwyKVxyXG4gIH0gZWxzZSBpZiAoYWR2YW50YWdlID09IDApIHtcclxuICAgIHJvbGwgPSByb2xsX3goMjApXHJcbiAgfSBlbHNlIGlmIChhZHZhbnRhZ2UgPT0gLTEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwi0J/QvtC80LXRhdCwXCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5taW4ocm9sbDEsIHJvbGwyKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZyhcItCU0LjQutCw0Y8g0L/QvtC80LXRhdCwXCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDMgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDQgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5taW4ocm9sbDEsIHJvbGwyLCByb2xsMywgcm9sbDQpXHJcbiAgfVxyXG4gIHJldHVybiByb2xsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxfZXZhc2lvbih0YXJnZXRfY2hhcmFjdGVyLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcikge1xyXG4gIGNvbnNvbGUubG9nKFwi0JHQvtC90YPRgSDRg9Cy0L7RgNC+0YLQsDogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKVxyXG4gIHZhciBldmFkZV9yb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KHRhcmdldF9jaGFyYWN0ZXIuYWdpbGl0eSkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICByZXR1cm4gZXZhZGVfcm9sbFxyXG59XHJcblxyXG4vLyBtYW5hZ2luZyBjaGF0XHJcblxyXG5mdW5jdGlvbiBwdXNoVG9MaXN0KG1lc3NhZ2UpIHtcclxuICBmb3IgKGxldCBpPTE7IGkgPCBDSEFUX0NBU0g7IGkrKykge1xyXG4gICAgdmFyIGVsZW1lbnRfdG9fY29weSA9ICQoJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgaSArICdcIl0nKTtcclxuICAgIHZhciBlbGVtZW50X3RvX3Bhc3RlID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyAoaS0xKSArICdcIl0nKTtcclxuXHJcbiAgICBlbGVtZW50X3RvX3Bhc3RlLnRleHQoZWxlbWVudF90b19jb3B5LnRleHQoKSk7XHJcbiAgfVxyXG4gIHZhciB0b3BfZWxlbWVudCA9ICQoJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgKENIQVRfQ0FTSC0xKSArICdcIl0nKTtcclxuICB0b3BfZWxlbWVudC50ZXh0KG1lc3NhZ2UpO1xyXG5cclxuICBpZiAobm90aWZpY2F0aW9uc19jb250YWluZXIuaXMoXCI6aGlkZGVuXCIpKSB7XHJcbiAgICBjaGF0X2J1dHRvbi5hZGRDbGFzcyhcImlzLXJlZFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlQ2hhdFZpc2liaWxpdHkoKSB7XHJcbiAgaWYgKGNoYXRfYnV0dG9uLmhhc0NsYXNzKFwiaXMtcmVkXCIpKSB7XHJcbiAgICBjaGF0X2J1dHRvbi5yZW1vdmVDbGFzcyhcImlzLXJlZFwiKVxyXG4gIH1cclxuICBpZiAobm90aWZpY2F0aW9uc19jb250YWluZXIuaXMoXCI6aGlkZGVuXCIpKSB7XHJcbiAgICBub3RpZmljYXRpb25zX2NvbnRhaW5lci5zaG93KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLmhpZGUoKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGNvdmVyIG1lY2hhbmljc1xyXG5cclxuZnVuY3Rpb24gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKSB7XHJcbiAgdmFyIG1vZCA9IHt9XHJcbiAgbW9kLmlzUG9zc2libGUgPSB0cnVlXHJcbiAgbW9kLmNvdmVyX2xldmVsID0gYWNjdW11bGF0ZWRfY292ZXJcclxuICBzd2l0Y2goYWNjdW11bGF0ZWRfY292ZXIpIHtcclxuICAgIGNhc2UgMDpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IDBcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAwXHJcbiAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAwXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOlxyXG4gICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTFcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMlxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTJcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTFcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgNTpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTNcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTFcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgNjpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTNcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTJcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgNzpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTRcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTJcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgODpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTRcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTNcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgOTpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTVcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTNcclxuICAgICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbW9kLmlzUG9zc2libGUgPSBmYWxzZVxyXG4gICAgICAgIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1vZFxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlX2NvdmVyKGRpc3RhbmNlLCBjb3Zlcikge1xyXG4gIHZhciByZXN1bHQgPSAwXHJcbiAgaWYgKGRpc3RhbmNlIDwgMC4xNSkge1xyXG4gICAgcmVzdWx0ID0gY292ZXJcclxuICB9IGVsc2UgaWYgKGRpc3RhbmNlIDwgMC4zKSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlciAqIDAuNzVcclxuICB9IGVsc2UgaWYgKGRpc3RhbmNlIDwgMC41KSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlciAqIDAuNVxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjY1KSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlciAqIDAuMjVcclxuICB9IGVsc2Uge1xyXG4gICAgcmVzdWx0ID0gMFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdFxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfYWNjdW11bGF0ZWRfY292ZXIodXNlcl9wb3MsIHRhcmdldF9wb3MpIHtcclxuICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSAwXHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGNlbGxzX29uX2xpbmUodXNlcl9wb3MsIHRhcmdldF9wb3MsIGdhbWVfc3RhdGUuc2l6ZSlcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfY2VsbCA9IGNhbmRpZGF0ZV9jZWxsc1tpXVxyXG4gICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXSA8IDApIHsvLyDRjdGC0L4g0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVxyXG4gICAgICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW01hdGguYWJzKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXSldXHJcbiAgICAgIHZhciBkaXN0YW5jZSA9IGRpc3RhbmNlX3RvX2xpbmUodXNlcl9wb3MsIHRhcmdldF9wb3MsIGdhbWVfc3RhdGUuc2l6ZSwgY3VycmVudF9jZWxsKVxyXG4gICAgICBhY2N1bXVsYXRlZF9jb3ZlciA9IGFjY3VtdWxhdGVkX2NvdmVyICsgY29tcHV0ZV9jb3ZlcihkaXN0YW5jZSwgb2JzdGFjbGUuY292ZXIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGFjY3VtdWxhdGVkX2NvdmVyID0gTWF0aC5jZWlsKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gIHJldHVybiBhY2N1bXVsYXRlZF9jb3ZlclxyXG59XHJcblxyXG4vLyBNaXNjZWxhbmVvdXMgYWN0aW9uc1xyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5KGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSBcImNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eVwiO1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAwKSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMFxyXG4gIH1cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VhcmNoX2FjdGlvbihzZWFyY2hfYnV0dG9uKSB7XHJcbiAgdmFyIGluZGV4ID0gc2VhcmNoX2J1dHRvbi5pbmRleDtcclxuICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBpZiAoIShnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSAmJiBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdIDwgMSkpIHtcclxuXHJcbiAgICB2YXIgbmFtZSA9IGNoYXJhY3Rlci5uYW1lO1xyXG4gICAgdmFyIG1vZGlmaWNhdG9yID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaW5kZXhdO1xyXG4gICAgdmFyIGludGVsbGlnZW5jZSA9IGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcbiAgICB2YXIgcm9sbCA9IHJvbGxTZWFyY2gocGFyc2VJbnQoaW50ZWxsaWdlbmNlKSwgcGFyc2VJbnQobW9kaWZpY2F0b3IpKTtcclxuICAgIHZhciB6b25lX251bWJlciA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF07XHJcbiAgICBwdXNoVG9MaXN0KCfQn9C10YDRgdC+0L3QsNC2ICcgKyBuYW1lICsgJyDQsdGA0L7RgdC40LsgJyArIHJvbGwgKyAnINC90LAg0LLQvdC40LzQsNGC0LXQu9GM0L3QvtGB0YLRjCcpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NlYXJjaF9hY3Rpb24nO1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gbmFtZTtcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbDtcclxuICAgIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5wbGF5ZXJfbmFtZSA9IG15X25hbWVcclxuICAgIHRvU2VuZC5taW5lc19kZXRlY3RlZCA9IFtdXHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICB2YXIgbGFuZG1pbmVfY2FuZGlkYXRlcyA9IGluZGV4X2luX3JhZGl1cyhpbmRleCwgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cylcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFuZG1pbmVfY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMobGFuZG1pbmVfY2FuZGlkYXRlc1tpXSkpIHtcclxuICAgICAgICAgIHRvU2VuZC5taW5lc19kZXRlY3RlZC5wdXNoKGxhbmRtaW5lX2NhbmRpZGF0ZXNbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQntCx0YvRgdC6INCy0L4g0LLRgNC10LzRjyDQsdC+0Y8g0YHRgtC+0LjRgiDQsdC+0L3Rg9GB0L3QvtC1INC00LXQudGB0YLQstC40LUhXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlSW5pdGlhdGl2ZShhZ2lsaXR5KSB7XHJcbiAgcmV0dXJuIGFnaWxpdHkqMiArIHJvbGxfeCgyMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0X25ld19yb3VuZCgpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnbmV3X3JvdW5kJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHZhciBzYXZlX3JvbGwgPSBbXVxyXG5cclxuICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGUubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0gIT09IHVuZGVmaW5lZCAmJiBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldICE9PSBudWxsKSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgc2F2ZV9yb2xsW2ldID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlci5zdGFtaW5hKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRvU2VuZC5zYXZlX3JvbGxfbGlzdCA9IHNhdmVfcm9sbFxyXG5cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2JhdHRsZV9tb2QoKSB7XHJcbiAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMFxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMVxyXG4gIH1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2JhdHRsZV9tb2QnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnZhbHVlID0gbmV3X3ZhbHVlXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbi8vIGF0dGFjayByZWxhdGVkIHRoaW5ncyAoY29tcHV0YXRpb24pXHJcblxyXG5mdW5jdGlvbiBjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpIHtcclxuICByZXR1cm4gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduX21vdmVzKGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUZsb2F0KG1vdmVfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV0pO1xyXG4gIGlmIChjaGFyYWN0ZXIuaGFzT3duUHJvcGVydHkoXCJleHRyYV9tb3ZlbWVudFwiKSkge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdICsgcGFyc2VGbG9hdChjaGFyYWN0ZXIuZXh0cmFfbW92ZW1lbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gd2VhcG9uX2RhbWFnZV9ib251cyhyYXdfZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdG90YWxfZGFtYWdlID0gcmF3X2RhbWFnZVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSAndGhyb3dpbmcnKSB7XHJcbiAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW01hdGguY2VpbChwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpLzIpXVxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gJ3JhbmdlZCcpIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpICYmIHdlYXBvbi5oYXNPd25Qcm9wZXJ0eShcImFpbV9ib251c1wiKSkge1xyXG4gICAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBwYXJzZUludCh3ZWFwb24uYWltX2JvbnVzKVxyXG4gICAgfVxyXG4gIH1cclxuICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgcmV0dXJuIHRvdGFsX2RhbWFnZVxyXG59XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtX2F0dGFjayhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX2Nob3Nlbi53ZWFwb25faWRdXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSkpIHtcclxuXHJcbiAgICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIodXNlcl9wb3NpdGlvbiwgaW5kZXgpXHJcblxyXG4gICAgdmFyIGNvdmVyX21vZGlmaWVyID0gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG5cclxuXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfS0QgPSBjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3Jlc29sdmVfYXR0YWNrJztcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQuYXR0YWNrZXJfaWQgPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5hdHRhY2tlcl9wb3NpdGlvbiA9IHVzZXJfcG9zaXRpb25cclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmF0dGFja190eXBlID0gd2VhcG9uLnR5cGVcclxuICAgIHRvU2VuZC5jb3Zlcl9sZXZlbCA9IGNvdmVyX21vZGlmaWVyLmNvdmVyX2xldmVsXHJcbiAgICB0b1NlbmQudXNlcl9pbnZpc2liaWxpdHlfZW5kZWQgPSAwXHJcblxyXG4gICAgaWYgKHdlYXBvbi5oYXNPd25Qcm9wZXJ0eShcInN1YnR5cGVcIikgJiYgd2VhcG9uLnN1YnR5cGUgPT0gXCJQUFwiKSB7XHJcbiAgICAgIHRvU2VuZC5xdWlja19hdHRhY2tfcmVhZHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W3VzZXJfY2hhcmFjdGVyX251bWJlcl0gIT0gXCJhbGxcIiAmJiB3ZWFwb24udHlwZSAhPSBcInRocm93aW5nXCIpIHtcclxuICAgICAgdG9TZW5kLnVzZXJfaW52aXNpYmlsaXR5X2VuZGVkID0gMVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb3Zlcl9tb2RpZmllci5pc1Bvc3NpYmxlKSB7XHJcbiAgICAgIHZhciBhdHRhY2tfcm9sbCA9IHJvbGxfYXR0YWNrKHdlYXBvbi50eXBlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyLCBjb3Zlcl9tb2RpZmllci5hZHZhbnRhZ2VfYm9udXMpXHJcbiAgICAgIGlmIChhdHRhY2tfcm9sbCA8IDIwKSB7Ly8gbm8gY3JpdFxyXG4gICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7Ly8g0J/RgNC40YbQtdC7INC00LDQsdC70LjRgiDQsdC+0L3Rg9GBINC/0L7Qv9Cw0LTQsNC90LjRj1xyXG4gICAgICAgICAgICBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKTtcclxuICAgICAgICAgICAgdG9TZW5kLmFpbV9vdmVyID0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuc3RyZW5ndGgpXHJcbiAgICAgICAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcImVuZXJneVwiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgMipwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSlcclxuICAgICAgICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwidGhyb3dpbmdcIikge1xyXG4gICAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuYWdpbGl0eSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBhdHRhY2tfYm9udXMgPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICB2YXIgdW5pdmVyc2FsX2JvbnVzID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgICAgIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsICsgYXR0YWNrX2JvbnVzICsgdW5pdmVyc2FsX2JvbnVzICsgY292ZXJfbW9kaWZpZXIuYXR0YWNrX2JvbnVzXHJcblxyXG4gICAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGN1bXVsYXRpdmVfYXR0YWNrX3JvbGxcclxuXHJcbiAgICAgICAgaWYgKGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPiB0YXJnZXRfY2hhcmFjdGVyX0tEKSB7Ly8g0JXRgdGC0Ywg0L/RgNC+0LHQuNGC0LjQtVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID09IDEpIHtcclxuICAgICAgICAgICAgdmFyIGV2YWRlX3JvbGwgPSByb2xsX2V2YXNpb24odGFyZ2V0X2NoYXJhY3RlciwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIHRvU2VuZC5ldmFkZV9yb2xsID0gZXZhZGVfcm9sbFxyXG4gICAgICAgICAgICBpZiAoZXZhZGVfcm9sbCA+IGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwpIHsgLy9zdWNjZXNmdWxseSBldmFkZWRcclxuICAgICAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZXZhZGVkXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfY2hhcmFjdGVyX251bWJlciwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiS0RfYmxvY2tcIlxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHsgLy8gZnVsbCBjcml0XHJcbiAgICAgICAgdG9TZW5kLmF0dGFja19yb2xsID0gYXR0YWNrX3JvbGxcclxuICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfY2hhcmFjdGVyX251bWJlciwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZ1bGxfY3JpdFwiXHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jb3ZlclwiXHJcbiAgfVxyXG5cclxuICAgIGlmICh0b1NlbmQuaGFzT3duUHJvcGVydHkoXCJkYW1hZ2Vfcm9sbFwiKSAmJiB3ZWFwb24uaGFzT3duUHJvcGVydHkoXCJzdWJ0eXBlXCIpICYmIHdlYXBvbi5zdWJ0eXBlID09IFwiZHJvYm92aWtcIikge1xyXG4gICAgICB2YXIgc2xvd19zY2FsZSA9IHBhcnNlRmxvYXQod2VhcG9uLnNsb3dfc2NhbGUpO1xyXG4gICAgICB2YXIgZnVsbF9ocCA9IEhQX3ZhbHVlc1twYXJzZUludCh0YXJnZXRfY2hhcmFjdGVyLnN0YW1pbmEpXVxyXG4gICAgICB2YXIgY3VycmVudF9tb3ZlcyA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIGZyYWN0aW9uID0gcGFyc2VGbG9hdCh0b1NlbmQuZGFtYWdlX3JvbGwpL3BhcnNlRmxvYXQoZnVsbF9ocClcclxuICAgICAgdmFyIG1vdmVfcmVkdWN0aW9uID0gY3VycmVudF9tb3ZlcyAqIGZyYWN0aW9uICogc2xvd19zY2FsZTtcclxuICAgICAgdG9TZW5kLm1vdmVfcmVkdWN0aW9uID0gbW92ZV9yZWR1Y3Rpb247XHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvi4uLlwiKVxyXG4gIH1cclxuICBzdG9wX2F0dGFjaygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgY2hhcmFjdGVyX251bWJlciwgYXR0YWNrX3JvbGwsIHRhcmdldF9udW1iZXIpIHtcclxuICB2YXIgZGFtYWdlID0gMFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICBpZiAoY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcInNuaXBlclwiKSB7XHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAxNikge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlYXBvbi5kYW1hZ2VbMF07IGkrKykge1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJ3ZWFrc3BvdFwiKSAmJiBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9udW1iZXJdLndlYWtzcG90Lmh1bnRlcl9pZCA9PSBjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgICAgICAgc3dpdGNoIChhdHRhY2tfcm9sbCkge1xyXG4gICAgICAgICAgY2FzZSAxODpcclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjJcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE5OlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqMlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDIwOlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqNVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2l0Y2ggKGF0dGFja19yb2xsKSB7XHJcbiAgICAgICAgICBjYXNlIDE4OlxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMTk6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSoyXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSozXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlYXBvbi5kYW1hZ2VbMF07IGkrKykge1xyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3god2VhcG9uLmRhbWFnZVsxXSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmIChhdHRhY2tfcm9sbCA8IDE5KSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KHdlYXBvbi5kYW1hZ2VbMV0pXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICB9XHJcbiAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG5cclxuICAgIGlmIChhdHRhY2tfcm9sbCA9PSAyMCkge1xyXG4gICAgICBkYW1hZ2UgPSBkYW1hZ2UgKiAyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAod2VhcG9uLnR5cGUgPT0gXCJyYW5nZWRcIikge1xyXG4gICAgdmFyIGRhbWFnZV90eXBlID0gXCJidWxsZXRcIlxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICB2YXIgZGFtYWdlX3R5cGUgPSBcIm1lbGVlXCJcclxuICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwiZW5lcmd5XCIpIHtcclxuICAgICAgdmFyIGRhbWFnZV90eXBlID0gXCJlbmVyZ3lcIlxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJ0aHJvd2luZ1wiKSB7XHJcbiAgICAgIHZhciBkYW1hZ2VfdHlwZSA9IFwibWVsZWVcIlxyXG4gIH1cclxuXHJcbiAgc3dpdGNoKGRhbWFnZV90eXBlKSB7XHJcbiAgICBjYXNlIFwibWVsZWVcIjpcclxuICAgICAgdmFyIHJlc2lzdCA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9yZXNpc3RbdGFyZ2V0X251bWJlcl1cclxuICAgICAgY29uc29sZS5sb2coXCLQo9GA0L7QvSDQtNC+INGA0LXQt9C40YHRgtCwOiBcIiArIGRhbWFnZSlcclxuICAgICAgZGFtYWdlID0gcGFyc2VJbnQoZGFtYWdlICogKDEuMCAtIHJlc2lzdCkpXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi0KPRgNC+0L0g0L/QvtGB0LvQtSDRgNC10LfQuNGB0YLQsDogXCIgKyBkYW1hZ2UpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImJ1bGxldFwiOlxyXG4gICAgICB2YXIgcmVzaXN0ID0gY2hhcmFjdGVyX3N0YXRlLmJ1bGxldF9yZXNpc3RbdGFyZ2V0X251bWJlcl1cclxuICAgICAgY29uc29sZS5sb2coXCLQo9GA0L7QvSDQtNC+INGA0LXQt9C40YHRgtCwOiBcIiArIGRhbWFnZSlcclxuICAgICAgZGFtYWdlID0gcGFyc2VJbnQoZGFtYWdlICogKDEuMCAtIHJlc2lzdCkpXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi0KPRgNC+0L0g0L/QvtGB0LvQtSDRgNC10LfQuNGB0YLQsDogXCIgKyBkYW1hZ2UpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgLy9ub3RoaW5nIGZvciBub3dcclxuICB9XHJcblxyXG4gIHJldHVybiBkYW1hZ2VcclxufVxyXG5cclxuZnVuY3Rpb24gZGFtYWdlX3NraWxsX3RlbXBsYXRlKHRhcmdldF9wb3MsIHVzZXJfcG9zLCByYW5nZSwgdXNlcl9pZCwgc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3Zlcikge1xyXG4gIGlmIChpc0luUmFuZ2UodGFyZ2V0X3BvcywgdXNlcl9wb3MsIHJhbmdlKSkge1xyXG5cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdGFyZ2V0X3Bvc11cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaWRdXHJcblxyXG4gICAgdmFyIGNvdmVyX21vZGlmaWVyID0gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2lkXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5jb3Zlcl9sZXZlbCA9IGFjY3VtdWxhdGVkX2NvdmVyXHJcblxyXG4gICAgaWYgKGNvdmVyX21vZGlmaWVyLmlzUG9zc2libGUpIHtcclxuXHJcbiAgICAgIHZhciBhdHRhY2tfcm9sbCA9IHJvbGxfYXR0YWNrKHdlYXBvbi50eXBlLCB1c2VyX2lkLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgY292ZXJfbW9kaWZpZXIuYWR2YW50YWdlX2JvbnVzKVxyXG5cclxuICAgICAgaWYgKGF0dGFja19yb2xsIDwgMjApIHsvLyBubyBjcml0XHJcbiAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIGJvbnVzX2F0dGFjayArIGNvdmVyX21vZGlmaWVyLmF0dGFja19ib251c1xyXG5cclxuICAgICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsXHJcblxyXG4gICAgICAgIGlmIChjdW11bGF0aXZlX2F0dGFja19yb2xsID4gdGFyZ2V0X2NoYXJhY3Rlcl9LRCkgey8vINCV0YHRgtGMINC/0YDQvtCx0LjRgtC40LVcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBldmFkZV9yb2xsID0gcm9sbF9ldmFzaW9uKHRhcmdldF9jaGFyYWN0ZXIsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICB0b1NlbmQuZXZhZGVfcm9sbCA9IGV2YWRlX3JvbGxcclxuICAgICAgICAgICAgaWYgKGV2YWRlX3JvbGwgPiBjdW11bGF0aXZlX2F0dGFja19yb2xsKSB7IC8vc3VjY2VzZnVsbHkgZXZhZGVkXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImV2YWRlZFwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2lkLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfaWQsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiS0RfYmxvY2tcIlxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHsgLy8gZnVsbCBjcml0XHJcbiAgICAgICAgdG9TZW5kLmF0dGFja19yb2xsID0gYXR0YWNrX3JvbGxcclxuICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfaWQsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmdWxsX2NyaXRcIlxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jb3ZlclwiXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG9TZW5kXHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZG9fZGFtYWdlKGNoYXJhY3Rlcl9udW1iZXIsIGRhbWFnZSkge1xyXG4gIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImZvcmNlX2ZpZWxkX3RhcmdldFwiKSkge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdIC0gZGFtYWdlXHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBzaGllbGRfaW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldC5zaGllbGRfaW5kZXhcclxuICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5zaGllbGQgLSBkYW1hZ2VcclxuICAgIHZhciBtZXNzYWdlID0gXCLQqdC40YIg0L/RgNC40L3Rj9C7INGD0YDQvtC9INC90LAg0YHQtdCx0Y8hINCe0YHRgtCw0LLRiNCw0Y/RgdGPINC/0YDQvtGH0L3QvtGB0YLRjDogXCIgKyBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZFxyXG4gICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgaWYgKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkIDw9IDApIHsvLyDRidC40YIg0YPQvdC40YfRgtC+0LbQtdC9XHJcbiAgICAgIHZhciBtZXNzYWdlID0gXCJQcmVzcyBGINCp0LjRgtGDLi4uXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICB2YXIgY2hhcl9saXN0ID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5jaGFyYWN0ZXJfbGlzdFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gY2hhcl9saXN0W2ldXHJcbiAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uZm9yY2VfZmllbGRfdGFyZ2V0XHJcbiAgICAgIH1cclxuICAgICAgZGVsZXRlX29iamVjdF9jb21tYW5kKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0ucG9zaXRpb24pXHJcbiAgICAgIGRlbGV0ZSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kVGhyb3dSYW5nZShjaGFyYWN0ZXIpIHtcclxuICByZXR1cm4gdGhyb3dfYmFzZV9yYW5nZSArIHBhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCkqMlxyXG59XHJcblxyXG5mdW5jdGlvbiBtZWxlZV9wZW5hbHR5KGRhdGEpIHtcclxuICBpZiAoZGF0YS5hdHRhY2tfdHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uaGFzT3duUHJvcGVydHkoXCJtZWxlZWRcIikpIHsgLy8g0LjQvdCw0YfQtSDRjdGE0YTQtdC60YIg0YPQttC1INC90LDQu9C+0LbQtdC9LCDQvdC1INC/0L7QstGC0L7RgNGP0LXQvFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gLSAxXHJcbiAgICAgIHZhciBtZWxlZWRfb2JqZWN0ID0ge31cclxuICAgICAgbWVsZWVkX29iamVjdC5jb29sZG93biA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ubWVsZWVkID0gbWVsZWVkX29iamVjdFxyXG4gICAgfVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbZGF0YS50YXJnZXRfaWRdID09IDEpIHtcclxuICAgICAgdmFyIGNvb2xkb3duID0gMVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvb2xkb3duID0gMFxyXG4gICAgfVxyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ubWVsZWVkLmNvb2xkb3duID0gY29vbGRvd25cclxuICB9XHJcbn1cclxuXHJcbi8vIFNraWxscyFcclxuXHJcbmZ1bmN0aW9uIHVzZV9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpIHtcclxuICBza2lsbF9pbmRleCA9IHBhcnNlSW50KHNraWxsX2luZGV4KVxyXG4gIHN3aXRjaChza2lsbF9pbmRleCkge1xyXG4gICAgY2FzZSAwOiAvL9Cg0YvQstC+0LpcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImNoYXJnZV91c2VyXCIpIHx8IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdLnNwZWNpYWxfdHlwZSA9PSBcInJvZ3VlXCIpKSB7XHJcbiAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE6IC8v0J/RgNC40LvQuNCyINCQ0LTRgNC10L3QsNC70LjQvdCwXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWRyZW5hbGluZV91c2VyXCIpKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMjogLy8g0J/QvtC00YDQtdC30LDRgtGMINGB0YPRhdC+0LbQuNC70LjRj1xyXG4gICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiY3V0X2xpbWJfdXNlclwiKSkge1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzogLy8g0KHQu9Cw0LHQvtC1INC80LXRgdGC0L5cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA0OiAvLyDQm9C10YfQtdC90LjQtVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNTogLy8g0JHQvtC70YzRiNC+0Lkg0LHRgNCw0YJcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA2OiAvLyDQn9C+0LTQvdGP0YLRjCDRidC40YLRi1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJzaGllbGRfdXBcIikpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic2hpZWxkX2Rvd25cIlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzaGllbGRfdXBcIlxyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDc6IC8vINC/0L7QttC40YDQsNC90LjQtSDRgdGD0YnQvdC+0YHRgtC4XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA4OiAvLyDRg9C30L3QsNGC0Ywg0LHQuNC+0L/Rg9C7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYmlvcG9vbFwiKSkge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QsNC60L7Qv9C70LXQvdC90YvQuSDQsdC40L7Qv9GD0Ls6IFwiICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5iaW9wb29sKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QsNC60L7Qv9C70LXQvdC90YvQuSDQsdC40L7Qv9GD0Lsg0L7RgtGB0YPRgtGB0YLQstGD0LXRglwiKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgOTogLy8g0LHQtdC30YPQv9GA0LXRh9C90L7QtSDQstC+0YHRgdGC0LDQvdC+0LLQu9C10L3QuNC1XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTA6IC8vINC+0LHRi9GH0L3QvtC1INCyINCx0L7QvdGD0YHQvdC+0LVcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0L7RgdC90L7QstC90YvRhSDQtNC10LnRgdGC0LLQuNC5LCDRh9GC0L7QsdGLINC/0YDQtdCy0YDQsNGC0LjRgtGMINCyINCx0L7QvdGD0YHQvdGL0LUhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDExOiAvLyDQvtGC0LTRi9GFXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdfc3RhbWluYSA9IE1hdGgubWluKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2NoYXJhY3Rlcl9udW1iZXJdICsgcmVzdF9zdGFtaW5hX2dhaW4sIHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdLnN0YW1pbmFdKVxyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgICAgdG9TZW5kLm5ld19zdGFtaW5hID0gbmV3X3N0YW1pbmFcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQktGLINGD0LbQtSDRgdC+0LLQtdGA0YjQsNC70Lgg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGN0YLQvtC8INGF0L7QtNGDLCDRgtCw0Log0YfRgtC+INC90LUg0LzQvtC20LXRgtC1INC+0YLQtNC+0YXQvdGD0YLRjFwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTI6IC8vINCz0LDQt9C+0LLQsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0KMg0LPRgNCw0L3QsNGC0Ysg0LrRg9C70LTQsNGD0L0gKNCz0LDQtyDRjdGN0Y0g0LfQsNCy0LDRgNC40LLQsNC10YLRgdGPLCDRhdC3KVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDEzOiAvLyDRgdCy0LXRgtC+0YjRg9C80L7QstCw0Y8g0LPRgNCw0L3QsNGC0LBcclxuICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImxpZ2h0X3NvdW5kX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0JPRgNCw0L3QsNGC0LAg0LXRidC1INC90LUg0LPQvtGC0L7QstCwXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNDogLy8g0KjQvtC60L7QstGL0Lkg0LjQvNC/0YPQu9GM0YFcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNTogLy8g0J/Ri9GJLdC/0YvRiS3Qs9C+XHJcbiAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInBpY2hfcGljaF91c2VyXCIpKSB7XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J/Ri9GJINC/0YvRiSDQtdGJ0LUg0L3QsCDQv9C10YDQtdC30LDRgNGP0LTQutC1IVwiKVxyXG4gICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxNjogLy8g0KHQuNC70L7QstC+0LUg0L/QvtC70LVcclxuICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJmb3JjZV9maWVsZF91c2VyXCIpKSB7XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCT0LXQvdC10YDQsNGC0L7RgCDRgdC40LvQvtCy0L7Qs9C+INC/0L7Qu9GPINC10YnQtSDQvdC1INC30LDRgNGP0LTQuNC70YHRjyFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxNzogLy8g0JjQvdCy0LjQt1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleDtcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICAgICAgICB0b1NlbmQudXNlcm5hbWUgPSBteV9uYW1lO1xyXG4gICAgICAgICAgICB0b1NlbmQucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTg6IC8vINCR0L7QtdCy0LDRjyDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4O1xyXG4gICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDE5OiAvLyDQm9Cw0LrQuCDRiNC+0YJcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMDogLy8g0JvQvtGC0LXRgNC10LnQvdGL0Lkg0LLRi9GB0YLRgNC10LtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMTogLy/Qn9GA0LjQu9C40LIg0LTQtdC50YHRgtCy0LjQuVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFjdGlvbl9zcGxhc2hcIikpIHtcclxuICAgICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtVwiKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICBjYXNlIDIyOiAvLyDQs9GA0LDQtCDRg9C00LDRgNC+0LJcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMSkge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0JTQu9GPINCz0YDQsNC00LAg0YPQtNCw0YDQvtCyINGC0YDQtdCx0YPQtdGC0YHRjyDQsdC+0LvRjNGI0LUgMSDQvtGB0L3QvtCy0L3QvtCz0L4g0LTQtdC50YHRgtCy0LjRjyFcIilcclxuICAgICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjM6IC8v0JDQtNGA0LXQvdCw0LvQuNC90L7QstGL0Lkg0L/QvtGC0L7Qv1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwicG9pc29ub3VzX2FkcmVuYWxpbmVfdXNlclwiKSkge1xyXG4gICAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjQ6IC8vINC60LjRgdC70L7RgtC90LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWNpZF9ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQoyDQs9GA0LDQvdCw0YLRiyDQutGD0LvQtNCw0YPQvSAo0LrQuNGB0LvQvtGC0LAg0L7QutC40YHQu9GP0LXRgtGB0Y8pXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI1OiAvLyDQl9Cw0LzQuNC90LjRgNC+0LLQsNGC0YxcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICAgIHRvU2VuZC5wbGF5ZXJfbmFtZSA9IG15X25hbWVcclxuICAgICAgICAgICAgdG9TZW5kLnBvc2l0aW9uID0gcG9zaXRpb25cclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjY6IC8vINCe0LHQtdC30LLRgNC10LTQuNGC0Ywg0LzQuNC90YNcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0K3RgtC+INGD0LzQtdC90LjQtSDRgtGA0LXQsdGD0LXRgiAxINCx0L7QvdGD0YHQvdC+0LUg0LTQtdC50YHRgtCy0LjQtSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjc6IC8vINCd0LjQutC+0YLQuNC90L7QstGL0Lkg0YPQtNCw0YBcclxuICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInRvYmFjY29fc3RyaWtlXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LXQu9GM0LfRjyDQt9Cw0YLRj9Cz0LjQstCw0YLRjNGB0Y8g0YLQsNC6INGH0LDRgdGC0L4hINCjINCy0LDRgSDQt9Cw0LLQuNGB0LjQvNC+0YHRgtGMXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMjg6IC8vINCa0YDRg9GH0LXQvdGL0LUg0L/Rg9C70LhcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI5OiAvLyDQn9GA0LjRhtC10LvQuNGC0YzRgdGPXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQktGLINGD0LbQtSDQv9GA0LjRhtC10LvQuNC70LjRgdGMIC0g0L/QvtGA0LAg0YjQvNCw0LvRj9GC0YxcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzA6IC8vINCx0YvRgdGC0YDQsNGPINCw0YLQsNC60LBcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwicXVpY2tfYXR0YWNrX3JlYWR5XCIpKSB7XHJcbiAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0KHQv9C10YDQstCwINC90YPQttC90L4g0YHQvtCy0LXRgNGI0LjRgtGMINC+0YHQvdC+0LLQvdGD0Y4g0LDRgtCw0LrRgyFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzE6IC8vINGB0LvRg9C20LHQsCDRgdC/0LDRgdC10L3QuNGPXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDEpIHsvLyDQtNCy0LAg0LHQvtC90YPRgdC90YvRhVxyXG4gICAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJzYWZldHlfc2VydmljZV91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1XCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYWxlcnQoXCLQndC1INC30L3QsNC10Lwg0Y3RgtC+INGD0LzQtdC90LjQtVwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGVyZm9ybV9za2lsbChpbmRleCwgY2VsbCkge1xyXG4gIHN3aXRjaChjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkKSB7XHJcbiAgICBjYXNlIDE6XHJcbiAgICAgIGFkcmVuYWxpbmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOiAvLyDQn9C+0LTRgNC10LfQsNGC0Ywg0YHRg9GF0L7QttC40LvQuNGPXHJcbiAgICAgIGN1dF9saW1icyhpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM6IC8vINCh0LvQsNCx0L7QtSDQvNC10YHRgtC+XHJcbiAgICAgIHdlYWtfc3BvdChpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDQ6IC8vINCb0LXRh9C10L3QuNC1XHJcbiAgICAgIGhlYWwoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA1OiAvLyDQkdC+0LvRjNGI0L7QuSDQsdGA0LDRglxyXG4gICAgICBiaWdfYnJvKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNzogLy8g0L/QvtC20LjRgNCw0L3QuNC1XHJcbiAgICAgIGRldm91cihpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDk6XHJcbiAgICAgIGFic29sdXRlX3JlY292ZXJ5KGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTI6XHJcbiAgICAgIGdhc19ib21iKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTM6XHJcbiAgICAgIGxpZ2h0X3NvdW5kX2JvbWIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNDpcclxuICAgICAgc2hvY2tfd2F2ZShpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE1OlxyXG4gICAgICBwaWNoX3BpY2hfZ28oaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNjpcclxuICAgICAgZm9yY2VfZmllbGQoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTk6XHJcbiAgICAgIGx1Y2t5X3Nob3QoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjA6XHJcbiAgICAgIGxvdHRlcnlfc2hvdChpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMjpcclxuICAgICAgcHVuY2hfcmFpbmZhbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjM6XHJcbiAgICAgIHBvaXNvbm91c19hZHJlbmFsaW5lKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI0OlxyXG4gICAgICBhY2lkX2JvbWIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjY6XHJcbiAgICAgIGRpZmZ1c2VfbGFuZG1pbmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyODpcclxuICAgICAgY3VydmVkX2J1bGxldHMoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzMDpcclxuICAgICAgcXVpY2tfYXR0YWNrKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzE6XHJcbiAgICAgIHNhZmV0eV9zZXJ2aWNlKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGFsZXJ0KFwiVW5rbm93biB0YXJnZXRlZCBza2lsbFwiKVxyXG4gIH1cclxuICBzdG9wX3NraWxsKClcclxufVxyXG5cclxuZnVuY3Rpb24gY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAzXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCA9IHNraWxsX2luZGV4XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkID0gY2hhcmFjdGVyX251bWJlclxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IHBvc2l0aW9uXHJcbiAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL0NoaWRvcmkud2VicFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYWZldHlfc2VydmljZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHNhZmV0eV9zZXJ2aWNlX3JhbmdlKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJzYWZldHlfc2VydmljZV90YXJnZXRcIikpIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQrdGC0LAg0YbQtdC70Ywg0YPQttC1INC/0L7QtCDQt9Cw0YnQuNGC0L7QuVwiKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCS0Ysg0L3QtSDQvNC+0LbQtdGC0LUg0LfQsNGJ0LjRidCw0YLRjCDRgSDRgtCw0LrQvtCz0L4g0YDQsNGB0YHRgtC+0Y/QvdC40Y9cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdlYWtfc3BvdChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcblxyXG4gIHZhciBpbnRfY2hlY2sgPSByb2xsX3goMjApICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGludF9jaGVjayA+PSB3ZWFrX3Nwb3RfdGhyZXNob2xkKSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgfSBlbHNlIHtcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICB9XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZWFsKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgaGVhbF9yYW5nZSkpIHtcclxuXHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgaGVhbGVyX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdGFyZ2V0X2hwID0gY2hhcmFjdGVyX3N0YXRlLkhQW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0YXJnZXRfZnVsbF9ocCA9IEhQX3ZhbHVlc1t0YXJnZXRfY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgdmFyIHJhdGlvID0gcGFyc2VGbG9hdCh0YXJnZXRfaHApL3BhcnNlRmxvYXQodGFyZ2V0X2Z1bGxfaHApXHJcblxyXG4gIHZhciBoZWFsX3JvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoaGVhbGVyX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgIGhlYWxfcm9sbCA9IGhlYWxfcm9sbCArIHBhcnNlSW50KGhlYWxlcl9jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLmhlYWxfcm9sbCA9IGhlYWxfcm9sbFxyXG5cclxuICB2YXIgdGhyZXNob2xkID0gMFxyXG4gIHZhciBjcml0aWNhbF90aHJlc2hvbGQgPSAwXHJcblxyXG4gIGlmIChyYXRpbyA+IDAuOSkge1xyXG4gICAgdGhyZXNob2xkID0gMTBcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC43NSkge1xyXG4gICAgdGhyZXNob2xkID0gMTVcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjk1KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjBcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI5XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuOTUpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC44MilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjMpIHtcclxuICAgIHRocmVzaG9sZCA9IDIzXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSAzMlxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjgyKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC4xNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjZcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDM1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC40KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuMDUpIHtcclxuICAgIHRocmVzaG9sZCA9IDMwXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSA0MFxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjQpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC4yMilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgfVxyXG5cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0J3Rg9C20L3QviDQv9C+0LTQvtC50YLQuCDQsdC70LjQttC1INC6INGG0LXQu9C4INGH0YLQvtCx0Ysg0LLRi9C70LXRh9C40YLRjFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYmlnX2JybyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGJpZ19icm9fcmFuZ2UpKSB7XHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuXHJcbiAgdmFyIHNoaWVsZF9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICB2YXIgdGFyZ2V0X0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuXHJcbiAgdmFyIGJvbnVzX0tEID0gTWF0aC5tYXgoc2hpZWxkX0tEIC0gIHRhcmdldF9LRCwgMClcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5ib251c19LRCA9IGJvbnVzX0tEXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQkdC+0LvRjNGI0L7QuSDQsdGA0LDRgiDQvdC1INC00L7RgdGC0LDQtdGCINC00L4g0LzQsNC70L7Qs9C+IVwiKVxyXG59XHJcbn1cclxuXHJcbi8vIGluY3JlYXNlIGF0dGFjayByb2xsIGJ5IGFnaWxpdHkgYm9udXMgKDIqbW9kKVxyXG5mdW5jdGlvbiBjdXRfbGltYnMoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcbiAgaWYgKHdlYXBvbi50eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYm9udXNfYXR0YWNrID0gMipwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmFnaWxpdHkpICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKGluZGV4LCB1c2VyX3Bvc2l0aW9uKVxyXG4gICAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICAgIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSB0b1NlbmQuZGFtYWdlX3JvbGxcclxuICAgICAgICB2YXIgZmxhdF9kYW1hZ2UgPSBkYW1hZ2Vfcm9sbCAtIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5zdHJlbmd0aCldIC0gY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgdmFyIGZ1bGxfZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICBpZiAoZmxhdF9kYW1hZ2UgPiBmdWxsX2RhbWFnZS8zKSB7XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgfSAgZWxzZSB7XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgICAgfVxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQv9C+0LTRgNC10LfQsNGC0Ywg0YHRg9GF0L7QttC40LvRjNGPINGN0YLQuNC8INC+0YDRg9C20LjQtdC8XCIpXHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHF1aWNrX2F0dGFjayhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuICBpZiAod2VhcG9uLmhhc093blByb3BlcnR5KFwic3VidHlwZVwiKSAmJiB3ZWFwb24uc3VidHlwZSA9PSBcIlBQXCIpIHtcclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGJvbnVzX2F0dGFjayA9IHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3ZlcihpbmRleCwgdXNlcl9wb3NpdGlvbilcclxuICAgIHZhciB0b1NlbmQgPSBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbiwgYWNjdW11bGF0ZWRfY292ZXIpXHJcbiAgICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gdG9TZW5kLmRhbWFnZV9yb2xsLzI7IC8vINCx0YvRgdGC0YDQsNGPINCw0YLQsNC60LAg0L3QsNC90L7RgdC40YIg0L/QvtC70L7QstC40L3RgyDRg9GA0L7QvdCwXHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfVxyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQkdGL0YHRgtGA0YPRjiDQsNGC0LDQutGDINC80L7QttC90L4g0YHQvtCy0LXRgNGI0LjRgtGMINGC0L7Qu9GM0LrQviDQv9C40YHRgtC+0LvQtdGC0L7QvC3Qv9GD0LvQtdC80LXRgtC+0LxcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1bmNoX3JhaW5mYWxsKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIHRhcmdldF9jaGFyX2lkID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJfaWRdXHJcbiAgICB2YXIgYm9udXNfYXR0YWNrID0gcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5hZ2lsaXR5KSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIHZhciB0b3RhbF9kYW1hZ2UgPSAwO1xyXG4gICAgdmFyIGF0dGFja3Nfc3VjY2Vzc2Z1bCA9IDA7XHJcbiAgICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIoaW5kZXgsIHVzZXJfcG9zaXRpb24pO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXTsgaSsrKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbiwgYWNjdW11bGF0ZWRfY292ZXIpXHJcbiAgICAgIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImZ1bGxfY3JpdFwiKSB7XHJcbiAgICAgICAgICAgIGF0dGFja3Nfc3VjY2Vzc2Z1bCA9IGF0dGFja3Nfc3VjY2Vzc2Z1bCArIDE7XHJcbiAgICAgICAgICAgIHRvdGFsX2RhbWFnZSA9IHRvdGFsX2RhbWFnZSArIHRvU2VuZC5kYW1hZ2Vfcm9sbDtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVt0YXJnZXRfY2hhcl9pZF0gPSAwO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0b1NlbmQub3V0Y29tZSA9PSBcImV2YWRlZFwiICYmIHRhcmdldF9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlICE9IFwicm9ndWVcIikge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyX2lkXSA9IDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgbXVsdGlwbHllciA9IDEuMCArIHBhcnNlRmxvYXQoYXR0YWNrc19zdWNjZXNzZnVsIC0gMSkvMi4wXHJcbiAgICB2YXIgbWVzc2FnZSA9IFwi0JzQvdC+0LbQuNGC0LXQu9GMINCz0YDQsNC00LAg0LHRi9C7OiBcIiArIG11bHRpcGx5ZXJcclxuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpXHJcbiAgICB2YXIgZmluYWxfZGFtYWdlID0gcGFyc2VJbnQocGFyc2VGbG9hdCh0b3RhbF9kYW1hZ2UpKm11bHRpcGx5ZXIpXHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJfaWRcclxuICAgIHRvU2VuZC50b3RhbF9hdHRhY2tzID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgIHRvU2VuZC5zdWNjZXNzZnVsbF9hdHRhY2tzID0gYXR0YWNrc19zdWNjZXNzZnVsXHJcbiAgICB0b1NlbmQuZGFtYWdlID0gZmluYWxfZGFtYWdlXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JPRgNCw0LQg0YPQtNCw0YDQvtCyINC80L7QttC90L4g0YHQvtCy0YDQtdGI0LjRgtGMINGC0L7Qu9GM0LrQviDRgNGD0LrQvtC/0LDRiNC90YvQvCDQvtGA0YPQttC40LXQvCFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob2NrX3dhdmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcbiAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIGJvbnVzX2F0dGFjayA9IHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIoaW5kZXgsIHVzZXJfcG9zaXRpb24pO1xyXG4gIHZhciB0b1NlbmQgPSBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbiwgYWNjdW11bGF0ZWRfY292ZXIpXHJcbiAgaWYgKHRvU2VuZCA9PSBudWxsKSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICh0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJmdWxsX2NyaXRcIikge1xyXG4gICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRldm91cihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIDEpKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIHN0YWNrcyA9IDBcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcIk1hcmt1c19zdGFja3NcIikpIHtcclxuICAgICAgc3RhY2tzID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uTWFya3VzX3N0YWNrc1xyXG4gICAgfVxyXG4gICAgdmFyIGRhbWFnZSA9IHN0YWNrcyo1ICsgcm9sbF94KDEwKVxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5kYW1hZ2UgPSBkYW1hZ2VcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhYnNvbHV0ZV9yZWNvdmVyeShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIDEpKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIGhlYWxfYW1vdW50ID0gMFxyXG5cclxuICAgIHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbWFnZV9maWVsZFwiKTtcclxuICAgIGlmICghKGRhbWFnZV9maWVsZC52YWx1ZSA9PT0gXCJcIikpIHtcclxuICAgICAgaGVhbF9hbW91bnQgPSBwYXJzZUludChkYW1hZ2VfZmllbGQudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBiaW9wb29sID0gMFxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImJpb3Bvb2xcIikpIHtcclxuICAgICAgYmlvcG9vbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXS5iaW9wb29sXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGhlYWxfYW1vdW50ID4gMCAmJiBiaW9wb29sID49IGhlYWxfYW1vdW50KSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICB0b1NlbmQuaGVhbF9hbW91bnQgPSBoZWFsX2Ftb3VudFxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtdCy0L7Qt9C80L7QttC90L7QtSDQt9C90LDRh9C10L3QuNC1INC70LXRh9C10L3QuNGPXCIpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdhc19ib21iKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGhyb3dfcmFuZ2UgPSBmaW5kVGhyb3dSYW5nZShjaGFyYWN0ZXIpXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgdGhyb3dfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcbiAgICB0b1NlbmQudGhyZXNob2xkID0gZ2FzX2JvbWJfdGhyZXNob2xkXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgICBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgZ2FzX2JvbWJfb2JzdGFjbGUpXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JzQsNC70L4g0LrQsNGI0Lgg0LXQu9C4INC00LvRjyDRgtCw0LrQvtCz0L4g0LHRgNC+0YHQutCwXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmdXNlX2xhbmRtaW5lKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBsYW5kbWluZV9kZXRlY3Rpb25fcmFkaXVzKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG4gICAgdG9TZW5kLm91dGNvbWUgPSBcImVtcHR5XCJcclxuXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluY2x1ZGVzKGluZGV4KSkge1xyXG4gICAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gICAgICBpZiAocm9sbCA+IGxhbmRtaW5lX2RpZmZ1c2VfdGhyZXNob2xkKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0KHQu9C40YjQutC+0Lwg0LTQsNC70LXQutC+INC00LvRjyDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQuNGPXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhY2lkX2JvbWIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0aHJvd19yYW5nZSA9IGZpbmRUaHJvd1JhbmdlKGNoYXJhY3RlcilcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB0aHJvd19yYW5nZSkpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCc0LDQu9C+INC60LDRiNC4INC10LvQuCDQtNC70Y8g0YLQsNC60L7Qs9C+INCx0YDQvtGB0LrQsFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlnaHRfc291bmRfYm9tYihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBsaWdodF9zb3VuZF9ib21iX3JhbmdlKSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG5cclxuICB2YXIgY2hhcmFjdGVyX2xpc3QgPSBbXVxyXG4gIHZhciBvdXRjb21lX2xpc3QgPSBbXVxyXG5cclxuICB2YXIgcmFkaXVzID0gbGlnaHRfc291bmRfYm9tYl9yYWRpdXNcclxuXHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhpbmRleCwgcmFkaXVzKVxyXG4gIGNvbnNvbGUubG9nKGNhbmRpZGF0ZV9jZWxscylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDQsdC+0LzQsdGLXHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgaWYgKGNoYXJhY3Rlci5zcGVjaWFsX3R5cGUgIT09IFwiZHJvbmVcIikge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9saXN0LnB1c2godGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgdmFyIHNhdmVfcm9sbCA9IHJvbGxfeCgyMCkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSArIHBhcnNlSW50KGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgaWYgKHNhdmVfcm9sbCA+IGxpZ2h0X3NvdW5kX2JvbWJfdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICBvdXRjb21lX2xpc3QucHVzaCgwKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvdXRjb21lX2xpc3QucHVzaCgxKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICB0b1NlbmQuY2hhcmFjdGVyX2xpc3QgPSBjaGFyYWN0ZXJfbGlzdFxyXG4gIHRvU2VuZC5vdXRjb21lX2xpc3QgPSBvdXRjb21lX2xpc3RcclxuXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQlNGA0L7QvSDQvdC1INC00L7QutC40L3QtdGCXCIpXHJcbn1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9yY2VfZmllbGQoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgZm9yY2VfZmllbGRfcmFuZ2UpKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcblxyXG4gIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgc2hpZWxkID0gTWF0aC5jZWlsKHBhcnNlRmxvYXQoSFBfdmFsdWVzW3VzZXIuc3RhbWluYV0pLzIpXHJcbiAgdG9TZW5kLnNoaWVsZCA9IHNoaWVsZFxyXG5cclxuICB2YXIgY2hhcmFjdGVyX2xpc3QgPSBbXVxyXG5cclxuICB2YXIgcmFkaXVzID0gZm9yY2VfZmllbGRfcmFkaXVzXHJcblxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhZGl1cylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDRidC40YLQsFxyXG4gICAgICAgIGNoYXJhY3Rlcl9saXN0LnB1c2godGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHRvU2VuZC5jZWxsc19wcm90ZWN0ZWQgPSBjYW5kaWRhdGVfY2VsbHNcclxuICB0b1NlbmQuY2hhcmFjdGVyX2xpc3QgPSBjaGFyYWN0ZXJfbGlzdFxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgZm9yY2VfZmllbGRfb2JzdGFjbGUpXHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQk9C10L3QtdGA0LDRgtC+0YAg0LTQvtC70LbQtdC9INCx0YvRgtGMINGD0YHRgtCw0L3QvtCy0LvQtdC9INC/0L7QsdC70LjQttC1XCIpXHJcbn1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRyZW5hbGluZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgdGFyZ2V0X251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIGFkcmVuYWxpbmVfcmFuZ2UgPSAxXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgYWRyZW5hbGluZV9yYW5nZSkpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pbmRleCA9IHRhcmdldF9udW1iZXJcclxuICAgIHZhciBleHRyYV9hY3Rpb25zID0gcm9sbF94KDQpXHJcbiAgICB2YXIgbWludXNfYWN0aW9ucyA9IHJvbGxfeCg0KVxyXG4gICAgdG9TZW5kLmV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zXHJcbiAgICB0b1NlbmQubWludXNfYWN0aW9ucyA9IG1pbnVzX2FjdGlvbnNcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwb2lzb25vdXNfYWRyZW5hbGluZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgdGFyZ2V0X251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgcG9pc29ub3VzX2FkcmVuYWxpbmVfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaW5kZXggPSB0YXJnZXRfbnVtYmVyXHJcbiAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IFtdXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaXNvbm91c19hZHJlbmFsaW5lX2R1cmF0aW9uOyBpKyspIHtcclxuICAgICAgZXh0cmFfYWN0aW9ucy5wdXNoKHJvbGxfeCg0KSlcclxuICAgIH1cclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0KDQsNC00LjRg9GBINCw0LTRgNC10L3QsNC70LjQvdCwIDEg0LrQu9C10YLQutCwIVwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGljaF9waWNoX2dvKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGFyZ2V0X251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9udW1iZXJdXHJcbiAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgPT0gXCJkcm9uZVwiKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaW5kZXggPSB0YXJnZXRfbnVtYmVyXHJcbiAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IE1hdGguY2VpbChwYXJzZUZsb2F0KHVzZXIuaW50ZWxsaWdlbmNlKS8yKVxyXG4gICAgdG9TZW5kLmV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQktGLINC90LUg0LzQvtC20LXRgtC1INC/0YvRiS3Qv9GL0Ykg0LrQvtCz0L4g0L/QvtC/0LDQu9C+IVwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbHVja3lfc2hvdChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnJvbGwgPSByb2xsX3goMTApXHJcbiAgICBpZiAodG9TZW5kLnJvbGwgPT0gNykge1xyXG4gICAgICB0b1NlbmQuZGFtYWdlID0gcm9sbF94KDcpXHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvdHRlcnlfc2hvdChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnJvbGwgPSByb2xsX3goMTAwKVxyXG4gICAgaWYgKHRvU2VuZC5yb2xsID09IDcpIHtcclxuICAgICAgdmFyIGRhbWFnZSA9IDBcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3goNylcclxuICAgICAgfVxyXG4gICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICB9IGVsc2UgaWYgKHRvU2VuZC5yb2xsID09IDc3KSB7XHJcbiAgICAgIHZhciBkYW1hZ2UgPSAwXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTQ7IGkrKykge1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCg3KVxyXG4gICAgICB9XHJcbiAgICAgIHRvU2VuZC5kYW1hZ2UgPSBkYW1hZ2VcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3VydmVkX2J1bGxldHMoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcbiAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIGJvbnVzX2F0dGFjayA9IHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhaW1cIikpIHtcclxuICAgIGJvbnVzX2F0dGFjayA9IGJvbnVzX2F0dGFjayArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKTtcclxuICB9XHJcbiAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKGluZGV4LCB1c2VyX3Bvc2l0aW9uKTtcclxuICBhY2N1bXVsYXRlZF9jb3ZlciA9IE1hdGgubWF4KHBhcnNlSW50KHBhcnNlRmxvYXQoYWNjdW11bGF0ZWRfY292ZXIpLzIpIC0gMiwgMClcclxuICB2YXIgdG9TZW5kID0gZGFtYWdlX3NraWxsX3RlbXBsYXRlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCwgYm9udXNfYXR0YWNrLCB3ZWFwb24sIGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7XHJcbiAgICAgIHRvU2VuZC5haW1fb3ZlciA9IDE7XHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9XHJcbn1cclxuXHJcbi8vINC/0YDQvtC6INCz0LDQt9C+0LLQvtC5INCz0YDQsNC90LDRgtGLXHJcbmZ1bmN0aW9uIGFwcGx5X2JvbWIocG9zaXRpb24sIHJhZGl1cykge1xyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMocG9zaXRpb24sIHJhZGl1cylcclxuICAvL2NvbnNvbGUubG9nKGNhbmRpZGF0ZV9jZWxscylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDQsdC+0LzQsdGLXHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0L7Qv9Cw0LTQsNC10YIg0L/QvtC0INC00LXQudGB0YLQstC40LUg0LPQsNC30L7QstC+0Lkg0LHQvtC80LHRi1wiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgKyAxXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGdhc19ib21iX3BvaXNvbl9vYmplY3QgPSB7fVxyXG4gICAgICAgIGdhc19ib21iX3BvaXNvbl9vYmplY3QucG9pc29uX2xldmVsID0gMVxyXG4gICAgICAgIGdhc19ib21iX3BvaXNvbl9vYmplY3QudGhyZXNob2xkID0gZ2FzX2JvbWJfdGhyZXNob2xkXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uID0gZ2FzX2JvbWJfcG9pc29uX29iamVjdFxyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdIC0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlfYWNpZF9ib21iKHBvc2l0aW9uLCByYWRpdXMpIHtcclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gaW5kZXhfaW5fcmFkaXVzKHBvc2l0aW9uLCByYWRpdXMpXHJcbiAgLy9jb25zb2xlLmxvZyhjYW5kaWRhdGVfY2VsbHMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0LHQvtC80LHRi1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9C+0L/QsNC00LDQtdGCINC/0L7QtCDQtNC10LnRgdGC0LLQuNC1INC60LjRgdC70L7RgtC90L7QuSDQs9GA0LDQvdCw0YLRi1wiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWNpZF9ib21iX3BvaXNvblwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmFjaWRfYm9tYl9wb2lzb24uZHVyYXRpb24gPSBhY2lkX2JvbWJfZHVyYXRpb25cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgYWNpZF9ib21iX3BvaXNvbl9vYmplY3QgPSB7fVxyXG4gICAgICAgIGFjaWRfYm9tYl9wb2lzb25fb2JqZWN0LmR1cmF0aW9uID0gYWNpZF9ib21iX2R1cmF0aW9uXHJcbiAgICAgICAgdmFyIEtEX2NoYW5nZSA9IHBhcnNlSW50KGNoYXJhY3Rlcl9LRCh0YXJnZXRfY2hhcmFjdGVyX251bWJlcikvMilcclxuICAgICAgICBhY2lkX2JvbWJfcG9pc29uX29iamVjdC5ib251c19LRCA9IEtEX2NoYW5nZVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmFjaWRfYm9tYl9wb2lzb24gPSBhY2lkX2JvbWJfcG9pc29uX29iamVjdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdIC0gS0RfY2hhbmdlXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG9ja2VkX2VmZmVjdCh0YXJnZXQpIHtcclxuICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0XS5oYXNPd25Qcm9wZXJ0eShcInNob2NrZWRcIikpIHtcclxuICAgIHZhciBzaG9ja2VkX29iamVjdCA9IHt9XHJcbiAgICBzaG9ja2VkX29iamVjdC5jb29sZG93biA9IHNob2NrZWRfY29vbGRvd25cclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0XS5zaG9ja2VkID0gc2hvY2tlZF9vYmplY3RcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW3RhcmdldF0gPSBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVt0YXJnZXRdIC0gMVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uc2hvY2tlZC5jb29sZG93biA9IHNob2NrZWRfY29vbGRvd25cclxuICB9XHJcbn1cclxuXHJcbi8vIE1vcmUgZ20gY29udHJvbCBhY3Rpb25zXHJcblxyXG5mdW5jdGlvbiBtaXJyb3JfYm9hcmQoKSB7XHJcbiAgdmFyIGxlZnRfaW5kZXg7XHJcbiAgdmFyIHJpZ2h0X2luZGV4O1xyXG4gIHZhciB0ZW1wO1xyXG4gIHZhciBsZWZ0X2NlbGw7XHJcbiAgdmFyIHJpZ2h0X2NlbGw7XHJcbiAgZm9yIChsZXQgeSA9IDA7IHkgPCBnYW1lX3N0YXRlLnNpemU7IHkrKykge1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBnYW1lX3N0YXRlLnNpemUvMjsgeCsrKSB7XHJcblxyXG4gICAgICBsZWZ0X2luZGV4ID0geSpnYW1lX3N0YXRlLnNpemUgKyB4O1xyXG4gICAgICByaWdodF9pbmRleCA9IHkqZ2FtZV9zdGF0ZS5zaXplICsgcGFyc2VJbnQoZ2FtZV9zdGF0ZS5zaXplKSAtIHggLSAxO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCd5OiAnICsgeSArICcgeDogJyArIHggKyAnIGxlZnQgaW5kZXg6ICcgKyBsZWZ0X2luZGV4ICsgJyByaWdodCBpbmRleDogJyArIHJpZ2h0X2luZGV4KTtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2xlZnRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbcmlnaHRfaW5kZXhdID0gdGVtcDtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2xlZnRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbcmlnaHRfaW5kZXhdID0gdGVtcDtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICBsZWZ0X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgbGVmdF9pbmRleCk7XHJcbiAgICAgIHJpZ2h0X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgcmlnaHRfaW5kZXgpO1xyXG5cclxuICAgICAgdGVtcCA9IGxlZnRfY2VsbC5zcmM7XHJcbiAgICAgIGxlZnRfY2VsbC5zcmMgPSByaWdodF9jZWxsLnNyYztcclxuICAgICAgcmlnaHRfY2VsbC5zcmMgPSB0ZW1wO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3luY19ib2FyZCgpIHtcclxuICB2YXIgZnVsbF9nYW1lX3N0YXRlID0ge1xyXG4gICAgZ2FtZV9zdGF0ZTogZ2FtZV9zdGF0ZSxcclxuICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvOiBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyxcclxuICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm86IG9ic3RhY2xlX2RldGFpbGVkX2luZm8sXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGU6IGNoYXJhY3Rlcl9zdGF0ZVxyXG4gIH07XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdzeW5jX2JvYXJkJztcclxuICB0b1NlbmQuZnVsbF9nYW1lX3N0YXRlID0gZnVsbF9nYW1lX3N0YXRlO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dfbGFuZG1pbmVzKCkge1xyXG4gIHZhciBsYW5kbWluZXNfYXJyYXkgPSBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnNcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxhbmRtaW5lc19hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfbWluZSA9IGxhbmRtaW5lc19hcnJheVtpXVxyXG4gICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbY3VycmVudF9taW5lXS5pbmNsdWRlcyhteV9uYW1lKSkge1xyXG4gICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBjdXJyZW50X21pbmUpO1xyXG4gICAgICBjZWxsLnNyYyA9IFwiL2ltYWdlcy9sYW5kbWluZS5qZmlmXCJcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyX2NoYXJhY3Rlcl9zdGF0ZSgpIHtcclxuICBjaGFyYWN0ZXJfc3RhdGUgPSBDSEFSQUNURVJfU1RBVEVfQ09OU1RBTlRcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJfY2hhcmFjdGVyKG51bWJlcikge1xyXG4gIC8vY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuSFBbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tudW1iZXJdID0ge31cclxuICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtudW1iZXJdID0gbnVsbFxyXG59XHJcblxyXG5mdW5jdGlvbiB3X29uY2xpY2soKSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiIHx8IGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2NoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZF0gPT0gMSkge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9PSAxKSB7XHJcbiAgICAgIHVuZG9fc2VsZWN0aW9uKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBpbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gICAgICB2YXIgY2VsbCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2VsbFxyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYV9vbmNsaWNrKCkge1xyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIiB8fCBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRdID09IDEpIHtcclxuXHJcbiAgICBpZiAoY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID09IDIpIHtcclxuICAgICAgc3RvcF9hdHRhY2soKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICAgICAgdmFyIGNlbGwgPSBjaGFyYWN0ZXJfY2hvc2VuLmNlbGxcclxuICAgICAgdmFyIG1haW5fYWN0aW9uc19sZWZ0ID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIGlmIChtYWluX2FjdGlvbnNfbGVmdCA+IDApIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX2F0dGFjayhjZWxsKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0KMg0LLQsNGBINC90LUg0L7RgdGC0LDQu9C+0YHRjCDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wYXJlX2luaXRpYXRpdmUoYSxiKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2FdIDwgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbYl0pIHtcclxuICAgIHJldHVybiAxO1xyXG4gIH0gZWxzZSBpZiAoY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbYV0gPT0gY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbYl0pIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfVxyXG59XHJcblxyXG4vL3NvY2tldC5pbml0KCd3czovL2xvY2FsaG9zdDozMDAxJyk7XHJcbnNvY2tldC5pbml0KFNFUlZFUl9BRERSRVNTKTtcclxuXHJcbnNvY2tldC5yZWdpc3Rlck9wZW5IYW5kbGVyKCgpID0+IHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAncGxheWVyX2luZm8nO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvbGUgPSBteV9yb2xlO1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIHRvU2VuZC5wYXNzd29yZCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZ21fcGFzc3dvcmQnKSk7XHJcbiAgfVxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59KTtcclxuXHJcbnNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKChkYXRhKSA9PiB7XHJcbiAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICBpZiAoKChkYXRhLnRvX25hbWUgPT0gbXlfbmFtZSkgfHwgKGRhdGEudG9fbmFtZSA9PSAnYWxsJykpICYmIChkYXRhLnJvb21fbnVtYmVyID09IG15X3Jvb20pKSB7XHJcbiAgICBpZiAoZGF0YS5jb21tYW5kID09ICdwbGF5ZXJfaW5mb19yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuaXNWYWxpZCA9PSAwKSB7XHJcbiAgICAgICAgYWxlcnQoJ9Ci0LAg0LrQsNC60L7QuSDRgtGLINCz0LwnKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkYXRhLnJvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgIGNyZWF0ZV9ib2FyZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBsb2FkX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgcm9sbF9pbml0aWF0aXZlX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgZm9nX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfbmFtZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgYm9hcmRfc2l6ZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgbWlycm9yX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgbmV4dF9yb3VuZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIGJhdHRsZV9tb2RfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBzeW5jX2J1dHRvbi5zaG93KCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlO1xyXG4gICAgICAgICAgICAvLyBxXHJcbiAgICAgICAgICAgIGlmKGtleUNvZGUgPT0gODEpIHtcclxuICAgICAgICAgICAgICAgIGZvZ01vZGVDaGFuZ2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09IDg3KSB7IC8vIHdcclxuICAgICAgICAgICAgICB3X29uY2xpY2soKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT0gNjUpIHsgLy8gYVxyXG4gICAgICAgICAgICAgIGFfb25jbGljaygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfbGlzdDtcclxuICAgICAgZ3JvdXBfbGlzdCA9IGRhdGEuY2hhcmFjdGVyX2dyb3VwX2xpc3Q7XHJcbiAgICAgIG9ic3RhY2xlX2xpc3QgPSBkYXRhLm9ic3RhY2xlX2xpc3Q7XHJcbiAgICAgIHdlYXBvbl9saXN0ID0gZGF0YS53ZWFwb25fbGlzdFxyXG4gICAgICB3ZWFwb25fZGV0YWlsZWRfaW5mbyA9IGRhdGEud2VhcG9uX2RldGFpbGVkX2luZm9cclxuICAgICAgc2tpbGxfZGV0YWlsZWRfaW5mbyA9IGRhdGEuc2tpbGxfZGV0YWlsZWRfaW5mb1xyXG4gICAgICBza2lsbF9saXN0ID0gZGF0YS5za2lsbF9saXN0XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NvbnN0cnVjdF9ib2FyZF9yZXNwb25zZScpIHtcclxuICAgICAgY2xlYXJfY2hhcmFjdGVyX3N0YXRlKClcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGRhdGEuZ2FtZV9zdGF0ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGRhdGEuY2hhcmFjdGVyX2luZm87XHJcbiAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXI7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuY2VsbF9pZF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBkYXRhLmNlbGxfaWQpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuICAgICAgfVxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBkYXRhLmNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gYm9udXNfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gbWFpbl9hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgYXNzaWduX21vdmVzKGRhdGEuY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyLktEX3BvaW50cztcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAxO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gXCJhbGxcIjtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXIuaW52ZW50b3J5WzBdXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0ge31cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBkYXRhLmNlbGxfaWQ7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXIuaGFzT3duUHJvcGVydHkoXCJldmFkZV9ib251c1wiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gcGFyc2VJbnQoY2hhcmFjdGVyLmV2YWRlX2JvbnVzKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXIuaGFzT3duUHJvcGVydHkoXCJtZWxlZV9yZXNpc3RcIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfcmVzaXN0W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUZsb2F0KGNoYXJhY3Rlci5tZWxlZV9yZXNpc3QpLzEwMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfcmVzaXN0W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwLjA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXIuaGFzT3duUHJvcGVydHkoXCJidWxsZXRfcmVzaXN0XCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJ1bGxldF9yZXNpc3RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyLmJ1bGxldF9yZXNpc3QpLzEwMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYnVsbGV0X3Jlc2lzdFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMC4wO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyDQsNC60YLQuNCy0LDRhtC40Y8g0L/QsNGB0YHQuNCy0L7QulxyXG4gICAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwiYWRhcHRpdmVfZmlnaHRpbmdcIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uYWRhcHRpdmVfZmlnaHRpbmcgPSAtMTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX29ic3RhY2xlX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgb2JzdGFjbGUgPSBkYXRhLm9ic3RhY2xlX2luZm87XHJcbiAgICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm9bZGF0YS5vYnN0YWNsZV9udW1iZXJdID0gb2JzdGFjbGU7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuY2VsbF9pZF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBkYXRhLmNlbGxfaWQpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gb2JzdGFjbGUuYXZhdGFyO1xyXG4gICAgICB9XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZGF0YS5jZWxsX2lkXSA9IGRhdGEub2JzdGFjbGVfbnVtYmVyICogKC0xKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdtb3ZlX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIHRvX2luZGV4ID0gZGF0YS50b19pbmRleDtcclxuICAgICAgdmFyIGZyb21faW5kZXggPSBkYXRhLmZyb21faW5kZXg7XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdG9faW5kZXhdID0gZGF0YS5jaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHRvX2luZGV4O1xyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmludmlzaWJpbGl0eV9lbmRlZF9pZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBpZCA9IGRhdGEuaW52aXNpYmlsaXR5X2VuZGVkX2lkW2ldO1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbaWRdID0gXCJhbGxcIjtcclxuXHJcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW2lkXTtcclxuICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBwb3NpdGlvbik7XHJcbiAgICAgICAgdmFyIGF2YXRhciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2lkXS5hdmF0YXI7XHJcbiAgICAgICAgdG9fY2VsbC5zcmMgPSBhdmF0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgICBpZiAoIWNoYXJhY3Rlci5oYXNPd25Qcm9wZXJ0eShcImxhbmRtaW5lX2ltbXVuZVwiKSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5taW5lc19leHBsb2RlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIG1pbmVfcG9zaXRpb24gPSBkYXRhLm1pbmVzX2V4cGxvZGVkW2ldXHJcbiAgICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBtaW5lX3Bvc2l0aW9uKTtcclxuICAgICAgICAgIGNlbGwuc3JjID0gZm9nT3JQaWMobWluZV9wb3NpdGlvbilcclxuICAgICAgICAgIHZhciBpbmRleCA9IGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmRleE9mKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuc3BsaWNlKGluZGV4LDEpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW21pbmVfcG9zaXRpb25dID0gW11cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLm1pbmVzX2RhbWFnZSA+IDApIHtcclxuICAgICAgICAgIGV4cGxvc2lvbl9hdWRpby5wbGF5KCk7XHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS5jaGFyYWN0ZXJfbnVtYmVyLCBkYXRhLm1pbmVzX2RhbWFnZSlcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9C+0LTRgNGL0LLQsNC10YLRgdGPINC90LAg0LzQuNC90LDRhSDQv9C+0LvRg9GH0LDRjyBcIiArIGRhdGEubWluZXNfZGFtYWdlICsgXCIg0YPRgNC+0L3QsFwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcmVtb3ZlIHNoaWVsZGVkIHByb3BlcnR5IGZyb20gY2hhcmFjdGVyIGFuZCByZW1vdmUgY2hhcmFjdGVyIGZyb20gc2hpZWxkZWQgbGlzdFxyXG4gICAgICBpZiAoZGF0YS5sZWZ0X3NoaWVsZCA9PSAxKSB7XHJcbiAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXRcclxuICAgICAgICB2YXIgaW5kZXggPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tkYXRhLnNoaWVsZF9pbmRleF0uY2hhcmFjdGVyX2xpc3QuaW5kZXhPZihkYXRhLmNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbZGF0YS5zaGllbGRfaW5kZXhdLmNoYXJhY3Rlcl9saXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAxO1xyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBzdGFtaW5hX21vdmVfY29zdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBwYXJzZUZsb2F0KGRhdGEuZGlzdGFuY2UpXHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICBpZiAoY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcInNuaXBlclwiKSB7XHJcbiAgICAgICAgICB2YXIgZWZmZWN0c19vYmplY3QgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIGlmIChlZmZlY3RzX29iamVjdC5oYXNPd25Qcm9wZXJ0eShcInNuaXBlcl9wYXNzaXZlXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50X2F0dGFja19ib251cyA9IGVmZmVjdHNfb2JqZWN0LnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251c1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudF9kYW1hZ2VfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gY3VycmVudF9hdHRhY2tfYm9udXMgLSA1XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIGN1cnJlbnRfZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHNuaXBlcl9wYXNzaXZlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUgPSBzbmlwZXJfcGFzc2l2ZV9vYmplY3RcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gNVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCEoKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW3RvX2luZGV4XSA9PSAxKSkgfHwgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAhPSBcImFsbFwiICYmIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAhPSBteV9uYW1lKSkpIHtcclxuICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcbiAgICAgICAgdG9fY2VsbC5zcmMgPSBkYXRhLmNoYXJhY3Rlcl9hdmF0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtmcm9tX2luZGV4XSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBmcm9tX2luZGV4KTtcclxuICAgICAgICBvbGRfY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlbGV0ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiY2hhcmFjdGVyX251bWJlclwiKSkge1xyXG4gICAgICAgIGNsZWFyX2NoYXJhY3RlcihkYXRhLmNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgIH1cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmluZGV4XSA9IDA7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuaW5kZXhdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEuaW5kZXgpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdyb2xsX2luaXRpYXRpdmVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlID0gZGF0YS5pbml0aWF0aXZlX3N0YXRlO1xyXG4gICAgICB2YXIgb3JkZXJlZF9hcnJheSA9IFtdXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLkhQW2ldID4gMCkgey8vIGNoYXJhY3RlciBpcyBwcmVzZW50XHJcbiAgICAgICAgICBvcmRlcmVkX2FycmF5LnB1c2goaSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgb3JkZXJlZF9hcnJheS5zb3J0KGNvbXBhcmVfaW5pdGlhdGl2ZSk7XHJcbiAgICAgIGluaXRpYXRpdmVfb3JkZXJfY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmRlcmVkX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW29yZGVyZWRfYXJyYXlbaV1dXHJcbiAgICAgICAgdmFyIHF1ZXJ5X3N0cmluZyA9ICc8aW1nPiBpZD1cImluaXRpYXRpdmVfaW1hZ2VfJyArIGkgKyAnXCInXHJcbiAgICAgICAgdmFyIGltZyA9ICQocXVlcnlfc3RyaW5nKVxyXG4gICAgICAgIGltZy5hdHRyKCdzcmMnLCBjaGFyYWN0ZXIuYXZhdGFyKTtcclxuICAgICAgICBpbWcuYXR0cignaGVpZ2h0JywgJzUwcHgnKTtcclxuICAgICAgICBpbWcuYXR0cignd2lkdGgnLCAnNTBweCcpO1xyXG4gICAgICAgIGltZy5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBwb3NpdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltvcmRlcmVkX2FycmF5W2ldXVxyXG4gICAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgcG9zaXRpb24pO1xyXG4gICAgICAgICAgLy9zZWxlY3RfY2hhcmFjdGVyKHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgbm9fc2hpZnRfb25jbGljayhteV9yb2xlLCBnbV9jb250cm9sX21vZCwgZ2FtZV9zdGF0ZSwgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzLCBjZWxsLCBwb3NpdGlvbilcclxuICAgICAgICB9KVxyXG4gICAgICAgIGltZy5hcHBlbmRUbyhpbml0aWF0aXZlX29yZGVyX2NvbnRhaW5lcik7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlYWxfZGFtYWdlX3Jlc3BvbnNlJykge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gZGF0YS5kYW1hZ2U7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2F2ZV9nYW1lX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICBhbGVydCgnR2FtZSAnICsgZGF0YS5zYXZlX25hbWUgKyAnIHNhdmVkIHN1Y2Nlc2Z1bGx5Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0dhbWUgd2l0aCBuYW1lICcgKyBkYXRhLnNhdmVfbmFtZSArICcgYWxyZWFkeSBleGlzdCEnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2xvYWRfZ2FtZV9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IGRhdGEuZnVsbF9nYW1lX3N0YXRlO1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfc3RhdGU7XHJcbiAgICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX2RldGFpbGVkX2luZm87XHJcbiAgICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5vYnN0YWNsZV9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICAgIGNvbnN0cnVjdF9ib2FyZChmdWxsX2dhbWVfc3RhdGUuZ2FtZV9zdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBsb2FkIGdhbWUgJyArIGRhdGEuc2F2ZV9uYW1lKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3N5bmNfYm9hcmRfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBmdWxsX2dhbWVfc3RhdGUgPSBkYXRhLmZ1bGxfZ2FtZV9zdGF0ZTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlID0gZnVsbF9nYW1lX3N0YXRlLmNoYXJhY3Rlcl9zdGF0ZTtcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX2RldGFpbGVkX2luZm87XHJcbiAgICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUub2JzdGFjbGVfZGV0YWlsZWRfaW5mbztcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGZ1bGxfZ2FtZV9zdGF0ZS5nYW1lX3N0YXRlKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICd1cGRhdGVfZm9nX3Jlc3BvbnNlJykge1xyXG5cdFx0XHRcdHZhciBpbmRleCA9IGRhdGEuaW5kZXg7XHJcblx0XHRcdFx0dmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgaW5kZXgpO1xyXG5cdFx0XHRcdGlmIChkYXRhLnVwZGF0ZV90eXBlID09ICdyZW1vdmUnKSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAwO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAxO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBGT0dfSU1BR0U7XHJcblx0XHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2Fzc2lnbl96b25lX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgaW5kZXhfbGlzdCA9IGRhdGEuaW5kZXhfbGlzdFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4X2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaW5kZXhfbGlzdFtpXV0gPSBkYXRhLnpvbmVfbnVtYmVyO1xyXG4gICAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2luZGV4X2xpc3RbaV1dID0gZGF0YS5tb2RpZmljYXRvcjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9yZXNwb25zZScpIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGRhdGEubmV3X3ZhbHVlO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NpbXBsZV9yb2xsX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IGRhdGEuY2hhcmFjdGVyX25hbWUgKyBcIiDQsdGA0L7RgdCw0LXRgiBcIiArIGRhdGEucm9sbFxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2tpbGxfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciB1c2VyX2luZGV4ID0gZGF0YS51c2VyX2luZGV4XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbdXNlcl9pbmRleF0gPSAxXHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiYWltX292ZXJcIikpIHtcclxuICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5haW1cclxuICAgICAgfVxyXG4gICAgICBzd2l0Y2goZGF0YS5za2lsbF9pbmRleCkge1xyXG4gICAgICAgIGNhc2UgMDogLy8g0YDRi9Cy0L7QulxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgY2hhcmdlX21vdmVfaW5jcmVhc2UgPSBwYXJzZUludChjaGFyYWN0ZXIuYWdpbGl0eSlcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt1c2VyX2luZGV4XSArIGNoYXJnZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgIHZhciBjaGFyZ2VfdXNlcl9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBjaGFyZ2VfdXNlcl9vYmplY3QuY29vbGRvd24gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uY2hhcmdlX3VzZXIgPSBjaGFyZ2VfdXNlcl9vYmplY3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGB0L7QstC10YDRiNCw0LXRgiDRgNGL0LLQvtC6XCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMTogLy8g0L/RgNC40LvQuNCyINCw0LTRgNC10L3QsNC70LjQvdCwXHJcbiAgICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgdmFyIHRhcmdldF9pbmRleCA9IGRhdGEudGFyZ2V0X2luZGV4XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfaW5kZXhdXHJcbiAgICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt0YXJnZXRfaW5kZXhdIC0gYWRyZW5hbGluZV9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gKyBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIDFcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldCA9IHt9XHJcbiAgICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldC5taW51c19hY3Rpb25zID0gZGF0YS5taW51c19hY3Rpb25zXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2luZGV4XS5hZHJlbmFsaW5lX3RhcmdldCA9IGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldFxyXG5cclxuICAgICAgICAgICAgdmFyIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIgPSB7fVxyXG4gICAgICAgICAgICBhZHJlbmFsaW5lX29iamVjdF91c2VyLmNvb2xkb3duID0gYWRyZW5hbGluZV9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFkcmVuYWxpbmVfdXNlciA9IGFkcmVuYWxpbmVfb2JqZWN0X3VzZXJcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0LjRgdC/0L7Qu9GM0LfRg9C10YIg0L/RgNC40LvQuNCyINCw0LTRgNC10L3QsNC70LjQvdCwLiBcIiAgKyB0YXJnZXQubmFtZSArIFwiINC/0L7Qu9GD0YfQsNC10YIgXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnMgKyBcIiDQtNC10LnRgdGC0LLQuNC5LiDQrdGC0L4g0LHRg9C00LXRgiDRgdGC0L7QuNGC0YwgXCIgKyBkYXRhLm1pbnVzX2FjdGlvbnMgKyBcIiDQtNC10LnRgdGC0LLQuNC5INC90LAg0YHQu9C10LTRg9GO0YnQuNC5INGF0L7QtC5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyOiAvLyDQv9C+0LTRgNC10LfQsNC90LjQtSDRgdGD0YXQvtC20LjQu9C40LlcclxuICAgICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gc3RhbWluYV9jdXRfbGltYl9jb3N0XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjdXRfbGltYl9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBjdXRfbGltYl9vYmplY3QuY29vbGRvd24gPSBjdXRfbGltYl9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmN1dF9saW1iX3VzZXIgPSBjdXRfbGltYl9vYmplY3RcclxuICAgICAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS5cIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5za2lsbF9vdXRjb21lID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBsaW1iX2N1dF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgICBsaW1iX2N1dF9vYmplY3QuZHVyYXRpb24gPSBjdXRfbGltYl9kdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5jdXRfbGltYiA9IGxpbWJfY3V0X29iamVjdFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gLTEwXHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC/0L7QtNGA0LXQt9Cw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdC10LfRg9GB0L/QtdGI0L3QviDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnNraWxsX291dGNvbWUgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGxpbWJfY3V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgIGxpbWJfY3V0X29iamVjdC5kdXJhdGlvbiA9IGN1dF9saW1iX2R1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmN1dF9saW1iID0gbGltYl9jdXRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAtMTBcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L/QvtC00YDQtdC30LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdC10LfRg9GB0L/QtdGI0L3QviDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgICAgIHZhciBsaW1iX2N1dF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIGxpbWJfY3V0X29iamVjdC5kdXJhdGlvbiA9IGN1dF9saW1iX2R1cmF0aW9uICsgMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmN1dF9saW1iID0gbGltYl9jdXRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IC0xMFxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INC/0L7QtNGA0LXQt9Cw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QviDRgtC+0YIg0L3QsNGF0L7QtNC40YLRgdGPINCyINC/0L7Qu9C90L7QvCDRg9C60YDRi9GC0LjQuC5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzogLy8g0YHQu9Cw0LHQvtC1INC80LXRgdGC0L5cclxuICAgICAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBzdGFtaW5hX3dlYWtzcG90X2Nvc3RcclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChkYXRhLm91dGNvbWUgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgdmFyIHdlYWtzcG90X29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIHdlYWtzcG90X29iamVjdC5odW50ZXJfaWQgPSB1c2VyX2luZGV4XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLndlYWtzcG90ID0gd2Vha3Nwb3Rfb2JqZWN0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC+0LHQvdCw0YDRg9C20LjQuyDRgdC70LDQsdC+0LUg0LzQtdGB0YLQviBcIiArIHRhcmdldC5uYW1lXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQvdC1INGD0LTQsNC70L7RgdGMINC+0LHQvdCw0YDRg9C20LjRgtGMINGB0LvQsNCx0L7QtSDQvNC10YHRgtC+IFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDQ6IC8vINC70LXRh9C10L3QuNC1XHJcbiAgICAgICAgdmFyIGhlYWxlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgIHZhciBjb29sZG93biA9IDBcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbdXNlcl9pbmRleF0gPiBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtkYXRhLnRhcmdldF9pZF0pIHtcclxuICAgICAgICAgIC8vINC/0LDRhtC40LXQvdGCINC90LUg0YXQvtC00LjRgiDQsiDRjdGC0L7RgiDQttC1INGF0L7QtFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS50YXJnZXRfaWRdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0vMlxyXG4gICAgICAgICAgY29vbGRvd24gPSAwXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvb2xkb3duID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaGVhbGVkX29iamVjdCA9IHt9XHJcbiAgICAgICAgaGVhbGVkX29iamVjdC5jb29sZG93biA9IGNvb2xkb3duXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uaGVhbGVkID0gaGVhbGVkX29iamVjdFxyXG4gICAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImZhaWxcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC90LUg0L/QvtC70YPRh9C40LvQvtGB0Ywg0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC/0L7Qu9GD0YfQuNC70L7RgdGMINGD0YHQv9C10YjQvdC+INCy0YvQu9C10YfQuNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuaGVhbF9yb2xsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGRhdGEubmV3X2hwXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjcml0aWNhbCBzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCjIFwiICsgaGVhbGVyLm5hbWUgKyBcIiDQv9C+0LvRg9GH0LjQu9C+0YHRjCDQutGA0LjRgtC40YfQtdGB0LrQuCAoMiDRgdGC0LXQv9C10L3QuCkg0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gZGF0YS5uZXdfaHBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0YDQsNC30LHQvtGA0LUg0L7RgtGF0LjQu9CwXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6IC8vINCx0L7Qu9GM0YjQvtC5INCx0YDQsNGCXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB2YXIgc2hpZWxkID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQt9Cw0YnQuNGC0LjQuyBcIiArICB0YXJnZXQubmFtZSArIFwiICgrXCIgKyBkYXRhLmJvbnVzX0tEICsgXCLQutC0KVwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2RhdGEudGFyZ2V0X2lkXSArIGRhdGEuYm9udXNfS0RcclxuICAgICAgICAgIHZhciBiaWdfYnJvX29iamVjdCA9IHt9XHJcbiAgICAgICAgICBiaWdfYnJvX29iamVjdC5jb29sZG93biA9IGNvb2xkb3duX2JpZ19icm9cclxuICAgICAgICAgIGJpZ19icm9fb2JqZWN0LmJvbnVzX0tEID0gZGF0YS5ib251c19LRFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uYmlnX2JybyA9IGJpZ19icm9fb2JqZWN0XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDY6IC8vINC/0L7QtNC90Y/RgtGMINGJ0LjRgtGLXHJcbiAgICAgICAgICB2YXIgc2hpZWxkID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGlmIChkYXRhLm91dGNvbWUgPT0gXCJzaGllbGRfdXBcIikge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gKyBzaGllbGRfdXBfS0RcclxuICAgICAgICAgICAgdmFyIHNoaWVsZF91cF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBzaGllbGRfdXBfb2JqZWN0LnN0YW1pbmFfY29zdCA9IHNoaWVsZF91cF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgICAgc2hpZWxkX3VwX29iamVjdC5LRCA9IHNoaWVsZF91cF9LRFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnNoaWVsZF91cCA9IHNoaWVsZF91cF9vYmplY3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaGllbGQubmFtZSArIFwiINC/0L7QtNC90Y/QuyDRidC40YLRiyDQt9CwINGH0LDRglwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2luZGV4XSAtIHNoaWVsZF91cF9LRFxyXG4gICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5zaGllbGRfdXBcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaGllbGQubmFtZSArIFwiINC+0L/Rg9GB0YLQuNC7INGJ0LjRgi4g0KfQsNGCINC/0YDQvtGB0YLQuChcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6IC8vINC/0L7QttC40YDQsNC90LjQtSDRgdGD0YnQvdC+0YHRgtC4XHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcblxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gLSBkYXRhLmRhbWFnZVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmhhc093blByb3BlcnR5KFwiTWFya3VzX3N0YWNrc1wiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5NYXJrdXNfc3RhY2tzID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uTWFya3VzX3N0YWNrcyArIDJcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLk1hcmt1c19zdGFja3MgPSAyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcImJpb3Bvb2xcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sICsgZGF0YS5kYW1hZ2VcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCA9IGRhdGEuZGFtYWdlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQvdCw0L3QvtGB0LjRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAg0L7RgiDQutC+0YLQvtGA0L7Qs9C+INC90LXQstC+0LfQvNC+0LbQvdC+INGD0LLQtdGA0L3Rg9GC0YzRgdGPXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgOTogLy8g0LDQsdGB0L7Qu9GO0YLQvdC+0LUg0LLQvtGB0YHRgtCw0L3QvtCy0LvQtdC90LjQtVxyXG4gICAgICAgICAgdmFyIGhlYWxlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcblxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gKyBkYXRhLmhlYWxfYW1vdW50XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgLSBkYXRhLmhlYWxfYW1vdW50XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGhlYWxlci5uYW1lICsgXCIg0LLQvtGB0YHRgtCw0L3QsNC70LjQstCw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgXCIgKyBkYXRhLmhlYWxfYW1vdW50ICsgXCIg0YXQv1wiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEwOiAvLyDQv9C+0LvRg9GH0LjRgtGMINCx0L7QvdGD0YFcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSArIDFcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC80LXQvdGP0LXRgiDQvtCx0YvRh9C90L7QtSDQvdCwINCx0L7QvdGD0YHQvdC+0LUg0LTQtdC50YHRgtCy0LjQtVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMTogLy8g0L7RgtC00YvRhVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBkYXRhLm5ld19zdGFtaW5hXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvtGC0LTRi9GF0LDQtdGCLiDQpdC+0YDQvtGI0LXQs9C+INC+0YLQv9GD0YHQutCwIVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTI6IC8vINCz0LDQt9C+0LLQsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBnYXNfYm9tYl9zdGFtaW5hX2Nvc3RcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsdGA0L7RgdCw0LXRgiDQs9Cw0LfQvtCy0YPRjiDQsdC+0LzQsdGDLiDQodC+0LLQtdGC0YPQtdC8INC30LDQtNC10YDQttCw0YLRjCDQtNGL0YXQsNC90LjQtS5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgICB2YXIgYm9tYl9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBib21iX29iamVjdC50eXBlID0gXCJnYXNfYm9tYlwiXHJcbiAgICAgICAgICAgIGJvbWJfb2JqZWN0LnBvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgICAgICBib21iX29iamVjdC50aHJlc2hvbGQgPSBkYXRhLnRocmVzaG9sZFxyXG4gICAgICAgICAgICBib21iX29iamVjdC5yYWRpdXMgPSAzXHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzLnB1c2goYm9tYl9vYmplY3QpXHJcblxyXG4gICAgICAgICAgICB2YXIgZ2FzX2JvbWJfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGdhc19ib21iX3VzZXIuY29vbGRvd24gPSBnYXNfYm9tYl9za2lsbF9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmdhc19ib21iX3VzZXIgPSBnYXNfYm9tYl91c2VyXHJcblxyXG4gICAgICAgICAgICB2YXIgaW5pdGlhbF9yYWRpdXMgPSAyXHJcblxyXG4gICAgICAgICAgICBhcHBseV9ib21iKGRhdGEucG9zaXRpb24sIGluaXRpYWxfcmFkaXVzKVxyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTM6IC8vINGB0LLQtdGC0L7RiNGD0LzQvtCy0LDRjyDQs9GA0LDQvdCw0YJcclxuICAgICAgICAgICAgdmFyIGxpZ2h0X3NvdW5kX2JvbWJfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGxpZ2h0X3NvdW5kX2JvbWJfdXNlci5jb29sZG93biA9IGxpZ2h0X3NvdW5kX2JvbWJfc2tpbGxfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5saWdodF9zb3VuZF9ib21iX3VzZXIgPSBsaWdodF9zb3VuZF9ib21iX3VzZXJcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5vdXRjb21lX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGRhdGEuY2hhcmFjdGVyX2xpc3RbaV1cclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgICAgICBpZiAoZGF0YS5vdXRjb21lX2xpc3RbaV0gPT0gMCkgeyAvLyDQn9GA0L7RiNC10Lsg0YHQv9Cw0YHQsdGA0L7RgdC+0LpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRg9GB0L/QtdC7INC/0YDQuNC60YDRi9GC0Ywg0LPQu9Cw0LfQsFwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvtGB0LvQtdC/INC90LAgMiDRhdC+0LTQsFwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImJsaW5kXCIpKSB7Ly8g0L3QtSDQvdCw0LrQu9Cw0LTRi9Cy0LLQsNC10Lwg0LXRidC1INGI0YLRgNCw0YRcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5ibGluZC5jb29sZG93biA9IDJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBibGluZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgICBibGluZF9vYmplY3QuY29vbGRvd24gPSAyXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uYmxpbmQgPSBibGluZF9vYmplY3RcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSAtIDJcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE0OiAvLyDRiNC+0LrQuNGA0L7QstCw0YLRjCAo0LTRgNC+0L0gKyDRg9GP0LfQstC40LzQvtGB0YLRjClcclxuICAgICAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YHRgtGA0LXQu9GP0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgICAgc2hvY2tlZF9lZmZlY3QoZGF0YS50YXJnZXRfaWQpXHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPINC4INGI0L7QutC40YDRg9C10YIg0YbQtdC70YwgKNGD0Y/Qt9Cy0LjQvNC+0YHRgtGMKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgICAgc2hvY2tlZF9lZmZlY3QoZGF0YS50YXJnZXRfaWQpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpINC4INGI0L7QutC40YDRg9C10YIg0YbQtdC70YwgKNGD0Y/Qt9Cy0LjQvNC+0YHRgtGMKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgc2hvY2tlZF9lZmZlY3QoZGF0YS50YXJnZXRfaWQpXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQv9C+0L/QsNC00LDQtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8g0Lgg0YjQvtC60LjRgNGD0LXRgiDRhtC10LvRjC4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDRiNC+0LrQuNGA0L7QstCw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QviDRgtC+0YIg0L3QsNGF0L7QtNC40YLRgdGPINCyINC/0L7Qu9C90L7QvCDRg9C60YDRi9GC0LjQuC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxNTogLy8g0L/Ri9GJINC/0YvRiSDQs9C+0YNcclxuICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXRfaW5kZXggPSBkYXRhLnRhcmdldF9pbmRleFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pbmRleF1cclxuICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgcGljaF9waWNoX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIHBpY2hfcGljaF9vYmplY3RfdGFyZ2V0ID0ge31cclxuICAgICAgICAgIHBpY2hfcGljaF9vYmplY3RfdGFyZ2V0LmV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2luZGV4XS5waWNoX3BpY2hfdGFyZ2V0ID0gcGljaF9waWNoX29iamVjdF90YXJnZXRcclxuXHJcbiAgICAgICAgICB2YXIgcGljaF9waWNoX29iamVjdF91c2VyID0ge31cclxuICAgICAgICAgIHBpY2hfcGljaF9vYmplY3RfdXNlci5jb29sZG93biA9IHBpY2hfcGljaF9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5waWNoX3BpY2hfdXNlciA9IHBpY2hfcGljaF9vYmplY3RfdXNlclxyXG5cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0LjRgdC/0L7Qu9GM0LfRg9C10YIg0J/Ri9GJLdCf0YvRiS3Qk9C+0YMuIFwiICArIHRhcmdldC5uYW1lICsgXCIg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9ucyArIFwiINC00L7QvyDQtNC10LnRgdGC0LLQuNC5INC90LAg0Y3RgtC+0YIg0Lgg0YHQu9C10LTRg9GO0YnQuNC5INGF0L7QtC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNjogLy8g0YHQuNC70L7QstC+0LUg0L/QvtC70LVcclxuICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBmb3JjZV9maWVsZF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc2hpZWxkX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3QudHlwZSA9IFwiZm9yY2VfZmllbGRcIlxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LnBvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LnJhZGl1cyA9IGZvcmNlX2ZpZWxkX3JhZGl1c1xyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LnNoaWVsZCA9IGRhdGEuc2hpZWxkXHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3QuY2hhcmFjdGVyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0XHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3QuY2VsbHNfcHJvdGVjdGVkID0gZGF0YS5jZWxsc19wcm90ZWN0ZWRcclxuICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMucHVzaChzaGllbGRfb2JqZWN0KVxyXG5cclxuICAgICAgICAgICAgdmFyIHNoaWVsZF9pbmRleCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzLmxlbmd0aCAtIDFcclxuICAgICAgICAgICAgdmFyIGNoYXJfbGlzdCA9IGRhdGEuY2hhcmFjdGVyX2xpc3RcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JjZV9maWVsZF90YXJnZXQgPSB7fVxyXG4gICAgICAgICAgICBmb3JjZV9maWVsZF90YXJnZXQuc2hpZWxkX2luZGV4ID0gc2hpZWxkX2luZGV4XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gY2hhcl9saXN0W2ldXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXQgPSBmb3JjZV9maWVsZF90YXJnZXRcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGZvcmNlX2ZpZWxkX3VzZXIgPSB7fVxyXG4gICAgICAgICAgICBmb3JjZV9maWVsZF91c2VyLmNvb2xkb3duID0gZm9yY2VfZmllbGRfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5mb3JjZV9maWVsZF91c2VyID0gZm9yY2VfZmllbGRfdXNlclxyXG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCw0LrRgtC40LLQuNGA0YPQtdGCINGB0LjQu9C+0LLQvtC1INC/0L7Qu9C1XCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxNzogLy8g0LjQvdCy0LjQt1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVt1c2VyX2luZGV4XSA9IGRhdGEudXNlcm5hbWVcclxuICAgICAgICAgIGlmIChteV9uYW1lICE9IGRhdGEudXNlcm5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgZGF0YS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxODogLy8g0LHQvtC10LLQsNGPINGD0L3QuNCy0LXRgNGB0LDQu9GM0L3QvtGB0YLRjFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5hZGFwdGl2ZV9maWdodGluZyA9IC0xO1xyXG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LDQutGC0LjQstC40YDRg9C10YIg0LHQvtC10LLRg9GOINGD0L3QuNCy0LXRgNGB0LDQu9GM0L3QvtGB0YLRjFwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxOTogLy8g0LvQsNC60Lgg0YjQvtGCXHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGx1Y2t5X3Nob3Rfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGRhdGEucm9sbCA9PSA3KSB7XHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQo9C00LDRh9CwINCx0LvQsNCz0L7QstC+0LvQuNGCIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiwg0LrQvtGC0L7RgNGL0Lkg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAgXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBkYXRhLnJvbGwgKyBcIiDRjdGC0L4g0L3QtSDRh9C40YHQu9C+IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiwg0YLQsNC6INGH0YLQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0LjQt9Cx0LXQs9Cw0LXRgiDQsNGC0LDQutC4LlwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIwOiAvLyBsb3R0ZXJ5X3Nob3RcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gbG90dGVyeV9zaG90X3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLnJvbGwgPT0gNykge1xyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JrQsNC60LDRjyDRg9C00LDRh9CwISDQpNC+0YDRgtGD0L3QsCDRj9Cy0L3QviDQvdCwINGB0YLQvtGA0L7QvdC1IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiwg0LrQvtGC0L7RgNGL0Lkg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAgXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJvbGwgPT0gNzcpIHtcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZSlcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCU0LbQtdC60L/QvtGCISBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQtdCz0L7QtNC90Y8g0YHRgtC+0LjRgiDQutGD0L/QuNGC0Ywg0LvQvtGC0LXRgNC10LnQvdGL0Lkg0LHQuNC70LXRgiwg0LAg0L/QvtC60LAg0L7QvSDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsCBcIiArIHRhcmdldC5uYW1lXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGRhdGEucm9sbCArIFwiINGN0YLQviDQvdC1INGH0LjRgdC70L4gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiLCDRgtCw0Log0YfRgtC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQuNC30LHQtdCz0LDQtdGCINCw0YLQsNC60LguXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjE6IC8v0LLRgdC/0LvQtdGB0Log0LTQtdC50YHRgtCy0LjQuVxyXG4gICAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdICsgZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBhY3Rpb25fc3BsYXNoX3N0YW1pbmFfY29zdCpkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2YXIgYWN0aW9uX3NwbGFzaF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgYWN0aW9uX3NwbGFzaF9vYmplY3QuY29vbGRvd24gPSBhY3Rpb25fc3BsYXNoX2Nvb2xkb3duXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFjdGlvbl9zcGxhc2ggPSBhY3Rpb25fc3BsYXNoX29iamVjdFxyXG5cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0LjRgdC/0L7Qu9GM0LfRg9C10YIg0LLRgdC/0LvQtdGB0Log0LTQtdC50YHRgtCy0LjQuSDQuCDQv9C+0LvRg9GH0LDQtdGCIFwiICsgZGF0YS5leHRyYV9hY3Rpb25zICsgXCIg0L7RgdC90L7QstC90YvRhSDQtNC10LnRgdGC0LLQuNC5INCy0LzQtdGB0YLQviDQsdC+0L3Rg9GB0L3Ri9GFLlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjI6IC8vINCz0YDQsNC0INGD0LTQsNGA0L7QslxyXG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gcHVuY2hfcmFpbmZhbGxfc3RhbWluYV9jb3N0KmRhdGEudG90YWxfYXR0YWNrc1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGRhdGEuZGFtYWdlID4gMCkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZSlcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvdCw0L3QvtGB0LjRgiDQs9GA0LDQtCDQuNC3IFwiICsgZGF0YS50b3RhbF9hdHRhY2tzICsgXCIg0YPQtNCw0YDQvtCyLCDQuNC3INC60L7RgtC+0YDRi9GFIFwiICsgZGF0YS5zdWNjZXNzZnVsbF9hdHRhY2tzICsgXCIg0L/QvtC/0LDQtNCw0Y7RgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QsNC90L7RgdGPIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwLlwiXHJcblxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyMzogLy8g0LDQtNGA0LXQvdCw0LvQuNC90L7QstGL0Lkg0L/QvtGC0L7Qv1xyXG4gICAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldF9pbmRleCA9IGRhdGEudGFyZ2V0X2luZGV4XHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2luZGV4XVxyXG4gICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNbMF1cclxuICAgICAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gKyBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldCA9IHt9XHJcbiAgICAgICAgICBhZHJlbmFsaW5lX29iamVjdF90YXJnZXQuZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0LnR1cm4gPSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pbmRleF0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0ID0gYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0XHJcblxyXG4gICAgICAgICAgdmFyIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIgPSB7fVxyXG4gICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdXNlci5jb29sZG93biA9IHBvaXNvbm91c19hZHJlbmFsaW5lX2Nvb2xkb3duXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnBvaXNvbm91c19hZHJlbmFsaW5lX3VzZXIgPSBhZHJlbmFsaW5lX29iamVjdF91c2VyXHJcblxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQsNC00YDQtdC90LDQu9C40L3QvtCy0YvQuSDQv9C+0YLQvtC/LiBcIiAgKyB0YXJnZXQubmFtZSArIFwiINC/0L7Qu9GD0YfQsNC10YIgXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnNbMF0gKyBcIiDQtNC10LnRgdGC0LLQuNC5INCyINGN0YLQvtGCINGF0L7QtCwg0LggXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnNbMV0gKyBcIiDQsiDRgdC70LXQtNGD0Y7RidC40LkuINCt0YLQviDQsdGD0LTQtdGCINGB0YLQvtC40YLRjCDQttC40LfQvdC10Lkg0Lgg0LLRi9C90L7RgdC70LjQstC+0YHRgtC4LCDQuNGB0L/QvtC70YzQt9GD0LnRgtC1INGBINGD0LzQvtC8LlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcblxyXG4gICAgICBjYXNlIDI0OiAvLyDQutC40YHQu9C+0YLQvdCw0Y8g0LPRgNCw0L3QsNGC0LBcclxuICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcblxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gYWNpZF9ib21iX3N0YW1pbmFfY29zdFxyXG5cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsdGA0L7RgdCw0LXRgiDQutC40YHQu9C+0YLQvdGD0Y4g0LPRgNCw0L3QsNGC0YMuINCQINC+0L3QuCDRgtC+0LvRjNC60L4g0LrRg9C/0LjQu9C4INC90L7QstGL0LUg0LTQvtGB0L/QtdGF0LguLi5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgIHZhciBhY2lkX2JvbWJfdXNlciA9IHt9XHJcbiAgICAgICAgICBhY2lkX2JvbWJfdXNlci5jb29sZG93biA9IGFjaWRfYm9tYl9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5hY2lkX2JvbWJfdXNlciA9IGFjaWRfYm9tYl91c2VyXHJcblxyXG4gICAgICAgICAgYXBwbHlfYWNpZF9ib21iKGRhdGEucG9zaXRpb24sIGFjaWRfYm9tYl9yYWRpdXMpXHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI1OiAvLyDQt9Cw0LzQuNC90LjRgNC+0LLQsNGC0YxcclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMoZGF0YS5wb3NpdGlvbikpIHtcclxuICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5wdXNoKGRhdGEucG9zaXRpb24pXHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW2RhdGEucG9zaXRpb25dID0gW11cclxuICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbZGF0YS5wb3NpdGlvbl0ucHVzaChkYXRhLnBsYXllcl9uYW1lKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjY6IC8vINC+0LHQtdC30LLRgNC10LTQuNGC0Ywg0LzQuNC90YNcclxuXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgc3dpdGNoKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiZW1wdHlcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQoSDRh9C10LwgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINCy0LfQsNC40LzQvtC00LXQudGB0YLQstC+0LLQsNGC0Yw/XCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZmFpbFwiOlxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0L7Qv9GL0YLQsNC70YHRjyDQvtCx0LXQt9Cy0YDQtdC00LjRgtGMINC80LjQvdGDLCDQvdC+INC90LUg0YHRg9C80LXQuy5cIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwic3VjY2Vzc1wiOlxyXG4gICAgICAgICAgICAgICAgdmFyIG1pbmVfcG9zaXRpb24gPSBkYXRhLnBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBtaW5lX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGNlbGwuc3JjID0gZm9nT3JQaWMobWluZV9wb3NpdGlvbilcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmRleE9mKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuc3BsaWNlKGluZGV4LDEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW21pbmVfcG9zaXRpb25dID0gW11cclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQt9Cw0L/RgNC10YnQsNC10YIg0LzQuNC90LUg0LLQt9GA0YvQstCw0YLRjNGB0Y8hXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3dpdGNoINC+0LHQtdCy0LfRgNC10LbQtdC90LjRjyDQv9C+0YjQtdC7INC90LUg0YLQsNC6XCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjc6IC8vINC90LjQutC+0YLQuNC90L7QstGL0Lkg0YPQtNCw0YBcclxuICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgZnVsbF9ocCA9IEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFt1c2VyX2luZGV4XSAtIGZ1bGxfaHAgKiB0b2JhY2NvX3N0cmlrZV9ocF9wZXJjZW50YWdlXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2luZGV4XSArIHRvYmFjY29fc3RyaWtlX2JvbnVzXHJcbiAgICAgICAgICB2YXIgdG9iYWNjb19zdHJpa2Vfb2JqZWN0ID0ge31cclxuICAgICAgICAgIHRvYmFjY29fc3RyaWtlX29iamVjdC5jb29sZG93biA9IHRvYmFjY29fc3RyaWtlX2Nvb2xkb3duXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnRvYmFjY29fc3RyaWtlID0gdG9iYWNjb19zdHJpa2Vfb2JqZWN0XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YXQvtGA0L7RiNC10YfQvdC+INC30LDRgtGP0LPQuNCy0LDQtdGC0YHRjy4g0JHQtdGA0LXQs9C40YLQtdGB0YwhXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjg6IC8vINC60YDRg9GH0LXQvdGL0LUg0L/Rg9C70LhcclxuICAgICAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGN1cnZlZF9idWxsZXRzX3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLmNvdmVyX2xldmVsID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCLQo9GA0L7QstC10L3RjCDRg9C60YDRi9GC0LjRjzogXCIgKyBkYXRhLmNvdmVyX2xldmVsXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQtdGC0YHRjyDQt9Cw0LrRgNGD0YLQuNGC0Ywg0L/Rg9C70Y4g0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQt9Cw0LrRgNGD0YLQuNGC0Ywg0L/Rg9C70Y4g0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LfQsNC60YDRg9GC0LjQuyDQv9GD0LvRjiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC30LDQutGA0YPRgtC40Lsg0L/Rg9C70Y4gXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcItC60YDRg9GH0LXQvdC+0Lkg0L/Rg9C70LXQuSwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQndC10YHQvNC+0YLRgNGPINC90LAg0L/QvtC/0YvRgtC60YMgXCIgKyBhdHRhY2tlci5uYW1lICsgXCIg0L7QsdC60YDRg9GC0LjRgtGMINC/0YDQtdC/0Y/RgtGB0YLQstC40LUg0LfQsNGJ0LjRidCw0Y7RidC10LUgXCIgKyB0YXJnZXQubmFtZSArIFwiLCDRgtC+0YIg0LLRgdC1INGA0LDQstC90L4g0L3QsNGF0L7QtNC40YLRgdGPINCyINC/0L7Qu9C90L7QvCDRg9C60YDRi9GC0LjQuC5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjk6IC8vINCf0YDQuNGG0LXQu9C40YLRjNGB0Y9cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBhaW1fb2JqZWN0ID0ge31cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWltID0gYWltX29iamVjdFxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDMwOiAvLyDQsdGL0YHRgtGA0LDRjyDQsNGC0LDQutCwXHJcbiAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFt1c2VyX2luZGV4XSA9IDFcclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmhhc093blByb3BlcnR5KFwicXVpY2tfYXR0YWNrX3JlYWR5XCIpKSB7XHJcbiAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ucXVpY2tfYXR0YWNrX3JlYWR5XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBzdGFtaW5hX2F0dGFja19jb3N0XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLmNvdmVyX2xldmVsID4gMCkge1xyXG4gICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcItCj0YDQvtCy0LXQvdGMINGD0LrRgNGL0YLQuNGPOiBcIiArIGRhdGEuY292ZXJfbGV2ZWxcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCJcIlxyXG4gICAgICB9XHJcbiAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdGL0YHRgtGA0L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCx0YvRgdGC0YDQviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L7QtNC90LDQutC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDRg9C00LDQu9C+0YHRjCDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INCx0YvRgdGC0YDQviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQsdGL0YHRgtGA0L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INCx0YvRgdGC0YDQviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQsdGL0YHRgtGA0L4g0LDRgtCw0LrQvtCy0LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdC+INGC0L7RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAzMTogLy8g0YHQu9GD0LbQsdCwINGB0L/QsNGB0LXQvdC40Y9cclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gc2FmZXR5X3NlcnZpY2VfYm9udXNfYWN0aW9uc19jb3N0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzYXZpb3IgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICB2YXIgbWVzc2FnZSA9IHNhdmlvci5uYW1lICsgXCIg0L3QtSDQtNCw0YHRgiDQsiDQvtCx0LjQtNGDIFwiICsgIHRhcmdldC5uYW1lXHJcbiAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2RhdGEudGFyZ2V0X2lkXSArIHNhZmV0eV9zZXJ2aWNlX2RlZmVuc2l2ZV9hZHZhbnRhZ2VcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW2RhdGEudGFyZ2V0X2lkXSArIHNhZmV0eV9zZXJ2aWNlX2V2YWRlX2JvbnVzXHJcblxyXG4gICAgICAgIHZhciBzYWZldHlfc2VydmljZV90YXJnZXRfb2JqZWN0ID0ge31cclxuICAgICAgICBzYWZldHlfc2VydmljZV90YXJnZXRfb2JqZWN0LmR1cmF0aW9uID0gc2FmZXR5X3NlcnZpY2VfZHVyYXRpb25cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5zYWZldHlfc2VydmljZV90YXJnZXQgPSBzYWZldHlfc2VydmljZV90YXJnZXRfb2JqZWN0XHJcblxyXG4gICAgICAgIHZhciBzYWZldHlfc2VydmljZV91c2VyX29iamVjdCA9IHt9XHJcbiAgICAgICAgc2FmZXR5X3NlcnZpY2VfdXNlcl9vYmplY3QuY29vbGRvd24gPSBzYWZldHlfc2VydmljZV9jb29sZG93blxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uc2FmZXR5X3NlcnZpY2VfdXNlciA9IHNhZmV0eV9zZXJ2aWNlX3VzZXJfb2JqZWN0XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBhbGVydChcIlJlY2VpdmVkIHVua25vd24gc2tpbGwgY29tbWFuZFwiKVxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ25ld19yb3VuZF9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIG1lc3NhZ2UgPSBcItCd0LDRh9Cw0LvQviDQvdC+0LLQvtCz0L4g0YDQsNGD0L3QtNCwIVwiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0gIT09IG51bGwgJiYgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgc3dpdGNoIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnYXNfYm9tYlwiOlxyXG4gICAgICAgICAgICAgICAgYXBwbHlfYm9tYihnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5wb3NpdGlvbiwgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cyA+PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZV9vYmplY3RfY29tbWFuZChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5wb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXSA9IG51bGxcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cyA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cyArIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJNZXNzZWQgdXAgcmVzb2x2aW5nIHRlcnJhaW4gZWZmZWN0c1wiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXIgIT09IHVuZGVmaW5lZCAmJiBjaGFyYWN0ZXIgIT09IG51bGwgJiYgY2hhcmFjdGVyX3N0YXRlLkhQW2ldICE9PSBudWxsICYmIGNoYXJhY3Rlcl9zdGF0ZS5IUFtpXSA+IDApIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbaV0gPSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2ldID0gMFxyXG4gICAgICAgICAgYXNzaWduX21vdmVzKGkpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gYm9udXNfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBtYWluX2FjdGlvbl9tYXBbY2hhcmFjdGVyLmFnaWxpdHldO1xyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwidGlyZWRcIikpIHsgLy8g0KPQsdGA0LDRgtGMINCx0L7QvdGD0YHRiyDQvtGCINGD0YHRgtCw0LvQvtGB0YLQuCDQv9GA0L7RiNC70L7Qs9C+INGF0L7QtNCwICjRh9GC0L7QsdGLINC60L7Qs9C00LAg0LHRg9C00YPRgiDQvdCw0LrQsNC70LDQtNGL0LLQsNGC0YzRgdGPINC90L7QstGL0LUg0L3QtSDRiNGC0YDQsNGE0L7QstCw0YLRjCDQtNCy0LDQttC00YspXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldIC0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50aXJlZC5ib251c1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA8IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSAqIDAuNjcpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIDwgc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdICogMC4zNCkge1xyXG4gICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA8PSAwKSB7IC8vIDPRjyDRgdGC0LDQtNC40Y9cclxuICAgICAgICAgICAgICAgIHZhciB0aXJlZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LmJvbnVzID0gLTNcclxuICAgICAgICAgICAgICAgIHRpcmVkX29iamVjdC5zdGFnZSA9IDNcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQgPSB0aXJlZF9vYmplY3RcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldIC0gM1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0qMC4yNSlcclxuICAgICAgICAgICAgICAgIGlmICgoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID09IDEpJiYoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9PSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gMFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDFcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7IC8vIDLRjyDRgdGC0LDQtNC40Y9cclxuICAgICAgICAgICAgICAgIHZhciB0aXJlZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LmJvbnVzID0gLTJcclxuICAgICAgICAgICAgICAgIHRpcmVkX29iamVjdC5zdGFnZSA9IDJcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQgPSB0aXJlZF9vYmplY3RcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldIC0gMlxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0qMC41KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gMdGPINGB0YLQsNC00LjRj1xyXG4gICAgICAgICAgICAgIHZhciB0aXJlZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIHRpcmVkX29iamVjdC5ib251cyA9IC0xXHJcbiAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LnN0YWdlID0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQgPSB0aXJlZF9vYmplY3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSowLjc1KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJ0aXJlZFwiKSkgeyAvLyDQvdC1INGD0YHRgtCw0LsgLT4g0YPQsdGA0LDRgtGMINGD0YHRgtC70LDQu9C+0YHRgtGMINC10YHQu9C4INCx0YvQu9CwXHJcbiAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJsaWdodF9zb3VuZF9ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubGlnaHRfc291bmRfYm9tYl91c2VyLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5saWdodF9zb3VuZF9ib21iX3VzZXJcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KHQstC10YLQvtGI0YPQvNC+0LLQsNGPINCz0YDQsNC90LDRgtCwINGDXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINCz0L7RgtC+0LLQsCDQuiDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRji5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmxpZ2h0X3NvdW5kX2JvbWJfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubGlnaHRfc291bmRfYm9tYl91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJhY3Rpb25fc3BsYXNoXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjdGlvbl9zcGxhc2guY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjdGlvbl9zcGxhc2hcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQvdC+0LLRjCDQvNC+0LbQtdGCINC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDQstGB0L/Qu9C10YHQuiDQtNC10LnRgdGC0LLQuNC5LlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWN0aW9uX3NwbGFzaC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWN0aW9uX3NwbGFzaC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwic2FmZXR5X3NlcnZpY2VfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zYWZldHlfc2VydmljZV91c2VyLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zYWZldHlfc2VydmljZV91c2VyXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zYWZldHlfc2VydmljZV91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zYWZldHlfc2VydmljZV91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJzYWZldHlfc2VydmljZV90YXJnZXRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2FmZXR5X3NlcnZpY2VfdGFyZ2V0LmR1cmF0aW9uID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2ldIC0gc2FmZXR5X3NlcnZpY2VfZGVmZW5zaXZlX2FkdmFudGFnZVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1tpXSAtIHNhZmV0eV9zZXJ2aWNlX2V2YWRlX2JvbnVzXHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2FmZXR5X3NlcnZpY2VfdGFyZ2V0XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zYWZldHlfc2VydmljZV90YXJnZXQuZHVyYXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNhZmV0eV9zZXJ2aWNlX3RhcmdldC5kdXJhdGlvbiAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl91c2VyLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl91c2VyXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCT0LDQt9C+0LLQsNGPINCz0YDQsNC90LDRgtCwINGDXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINCz0L7RgtC+0LLQsCDQuiDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRji5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3VzZXIuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3VzZXIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFjaWRfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl91c2VyLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQmtC40YHQu9C+0YLQvdCw0Y8g0LPRgNCw0L3QsNGC0LAg0YNcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LPQvtGC0L7QstCwINC6INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGOLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3VzZXIuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJmb3JjZV9maWVsZF91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmZvcmNlX2ZpZWxkX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmZvcmNlX2ZpZWxkX3VzZXJcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KHQuNC70L7QstC+0LUg0L/QvtC70LUg0YMgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINGB0L3QvtCy0LAg0LfQsNGA0Y/QttC10L3Qvi5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmZvcmNlX2ZpZWxkX3VzZXIuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmZvcmNlX2ZpZWxkX3VzZXIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInBpY2hfcGljaF91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQo9C80LXQvdC40LUg0J/Ri9GJLdCf0YvRiSDRgyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvdC+0LLQsCDQtNC+0YHRgtGD0L/QvdC+LlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyLmNvb2xkb3duID09IHBpY2hfcGljaF9jb29sZG93bikge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInBpY2hfcGljaF90YXJnZXRcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3RhcmdldC5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gKyBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSArIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zIC0gMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdGFyZ2V0XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJhZHJlbmFsaW5lX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hZHJlbmFsaW5lX3VzZXIuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdXNlci5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZV91c2VyLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hZHJlbmFsaW5lX3VzZXJcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KPQvNC10L3QuNC1INCf0YDQuNC70LjQsiDQkNC00YDQtdC90LDQu9C40L3QsCDRgyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvdC+0LLQsCDQtNC+0YHRgtGD0L/QvdC+LlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJhaW1cIikpIHtcclxuICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWltXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJjaGFyZ2VfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jaGFyZ2VfdXNlci5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY2hhcmdlX3VzZXJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmNoYXJnZV91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jaGFyZ2VfdXNlci5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiY3V0X2xpbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYl91c2VyLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYl91c2VyXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYl91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYl91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJwb2lzb25vdXNfYWRyZW5hbGluZV91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdXNlci5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdXNlci5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQo9C80LXQvdC40LUg0JDQtNGA0LXQvdCw0LvQuNC90L7QstGL0Lkg0J/QvtGC0L7QvyDRgyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvdC+0LLQsCDQtNC+0YHRgtGD0L/QvdC+LlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJhZHJlbmFsaW5lX3RhcmdldFwiKSkge1xyXG4gICAgICAgICAgICAgIHZhciBtaW51c19hY3Rpb25zID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hZHJlbmFsaW5lX3RhcmdldC5taW51c19hY3Rpb25zXHJcbiAgICAgICAgICAgICAgd2hpbGUgKG1pbnVzX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWludXNfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gLSBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSAtIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1pbnVzX2FjdGlvbnMgPSBtaW51c19hY3Rpb25zIC0gMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hZHJlbmFsaW5lX3RhcmdldFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwicG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHR1cm4gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldC50dXJuXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXQudHVybiA9IHR1cm4gKyAxXHJcbiAgICAgICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldC5leHRyYV9hY3Rpb25zW3R1cm5dXHJcbiAgICAgICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gKyBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSArIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zIC0gMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodHVybiArIDEgPT0gcG9pc29ub3VzX2FkcmVuYWxpbmVfZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXVxyXG4gICAgICAgICAgICAgICAgdmFyIG1heF9IUCA9IEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV1cclxuICAgICAgICAgICAgICAgIHZhciBtYXhfc3RhbWluYSA9IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXVxyXG4gICAgICAgICAgICAgICAgdmFyIEhQX2Nvc3QgPSBwb2lzb25vdXNfYWRyZW5hbGluZV9mbGF0X0hQICsgcGFyc2VJbnQocGFyc2VGbG9hdChtYXhfSFApICogcG9pc29ub3VzX2FkcmVuYWxpbmVfcGVyY2VudF9IUClcclxuICAgICAgICAgICAgICAgIHZhciBzdGFtaW5hX2Nvc3QgPSBwb2lzb25vdXNfYWRyZW5hbGluZV9mbGF0X3N0YW1pbmEgKyBwYXJzZUludChwYXJzZUZsb2F0KG1heF9zdGFtaW5hKSAqIHBvaXNvbm91c19hZHJlbmFsaW5lX3BlcmNlbnRfc3RhbWluYSlcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtpXSAtIEhQX2Nvc3RcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gLSBzdGFtaW5hX2Nvc3RcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldFxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCQ0LTRgNC10L3QsNC70LjQvSDQsiDQutGA0L7QstC4IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQt9Cw0LrQsNC90YfQuNCy0LDQtdGC0YHRjywg0L3QsNGB0YLRg9C/0LDQtdGCINC/0L7RhdC80LXQu9GM0LUgKFwiICsgSFBfY29zdCArIFwiINGF0L8g0LggXCIgKyBzdGFtaW5hX2Nvc3QgKyBcIiDQstGL0L3QvtGB0LvQuNCy0L7RgdGC0LgpXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJzaG9ja2VkXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNob2NrZWQuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiY3V0X2xpbWJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY3V0X2xpbWIuZHVyYXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCh0YPRhdC+0LbQuNC70LjRjyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQvtGB0YHRgtCw0L3QvtCy0LjQu9C40YHRjC5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSAtMTBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iLmR1cmF0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYi5kdXJhdGlvbiAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiaGVhbGVkXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZC5jb29sZG93biA+IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0vMlxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGVhbGVkLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJibGluZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biA+IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJsaW5kLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gKyAyXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCX0YDQtdC90LjQtSBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQvtGB0YHRgtCw0L3QvtCy0LjQu9C+0YHRjFwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyAtIDFcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJzaGllbGRfdXBcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gTWF0aC5jZWlsKGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXS8yKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIC0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaGllbGRfdXAuc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GA0L7QtNC+0LvQttCw0LXRgiDQtNC10YDQttCw0YLRjCDRidC40YIgKNGB0L/QsNGB0LjQsdC+KVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYmlnX2Jyb1wiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm8uYm9udXNfS0RcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGC0LXRgNGP0LXRgiDQt9Cw0YnQuNGC0YMg0JHQvtC70YzRiNC+0LPQviDQkdGA0LDRgtCwXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJ0b2JhY2NvX3N0cmlrZVwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50b2JhY2NvX3N0cmlrZS5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udG9iYWNjb19zdHJpa2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50b2JhY2NvX3N0cmlrZS5jb29sZG93biA9PSB0b2JhY2NvX3N0cmlrZV9jb29sZG93bikge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gLSB0b2JhY2NvX3N0cmlrZV9ib251c1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRvYmFjY29fc3RyaWtlLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50b2JhY2NvX3N0cmlrZS5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYWNpZF9ib21iX3BvaXNvblwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gKyBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uYm9udXNfS0RcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCR0YDQvtC90Y8gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINC90LDQutC+0L3QtdGGINCy0L7RgdGB0YLQsNC90L7QstC40LvQsNGB0YxcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uZHVyYXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uZHVyYXRpb24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImdhc19ib21iX3BvaXNvblwiKSkge1xyXG4gICAgICAgICAgICB2YXIgY291bnQgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWxcclxuICAgICAgICAgICAgd2hpbGUgKGNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgIC8vY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldIC0gZ2FzX2JvbWJfbW92ZV9yZWR1Y3Rpb25cclxuICAgICAgICAgICAgICBpZiAoY291bnQgJSAyID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSAtIDFcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvdW50ID0gY291bnQgLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNhdmVfcm9sbCA9IGRhdGEuc2F2ZV9yb2xsX2xpc3RbaV1cclxuICAgICAgICAgICAgaWYgKHNhdmVfcm9sbCA+PSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi50aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgLSAxXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC60LjQtNCw0LXRgiDRgdC/0LDRgdCx0YDQvtGB0L7QuiDQuCDRg9C80LXQvdGM0YjQsNC10YIg0YHRgtCw0LTQuNGOINC+0YLRgNCw0LLQu9C10L3QuNGPICjRgtC10L/QtdGA0YwgXCIgKyBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/RgNC+0LLQsNC70LjQstCw0LXRgiDRgdC/0LDRgdCx0YDQvtGB0L7Qui4g0KHRgtCw0LTQuNGPINC+0YLRgNCw0LLQu9C10L3QuNGPINC+0YHRgtCw0LXRgtGB0Y8g0L/RgNC10LbQvdC10LkgKFwiICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCx0L7Qu9GM0YjQtSDQvdC1INC+0YLRgNCw0LLQu9C10L0hXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcIm1lbGVlZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWQuY29vbGRvd24gPD0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLm1lbGVlZFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWQuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLm1lbGVlZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09ICdzbmlwZXInKSB7XHJcbiAgICAgICAgICAgIHZhciBlZmZlY3RzX29iamVjdCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV1cclxuICAgICAgICAgICAgaWYgKGVmZmVjdHNfb2JqZWN0Lmhhc093blByb3BlcnR5KFwic25pcGVyX3Bhc3NpdmVcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9hdHRhY2tfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9kYW1hZ2VfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgICBpZiAoY3VycmVudF9hdHRhY2tfYm9udXMgPT0gLTUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfYXR0YWNrX2JvbnVzID0gTWF0aC5taW4oY3VycmVudF9hdHRhY2tfYm9udXMgKyAxLCA0KVxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19kYW1hZ2VfYm9udXMgPSBNYXRoLm1pbihjdXJyZW50X2RhbWFnZV9ib251cyArIDIsIDgpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2ldIC0gY3VycmVudF9hdHRhY2tfYm9udXMgKyBuZXdfYXR0YWNrX2JvbnVzXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbaV0gLSBjdXJyZW50X2RhbWFnZV9ib251cyArIG5ld19kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251cyA9IG5ld19hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNuaXBlcl9wYXNzaXZlLmRhbWFnZV9ib251cyA9IG5ld19kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgc25pcGVyX3Bhc3NpdmVfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zbmlwZXJfcGFzc2l2ZSA9IHNuaXBlcl9wYXNzaXZlX29iamVjdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYmF0dGxlX21vZF9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID0gZGF0YS52YWx1ZVxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDApIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JHQvtC5INC+0LrQvtC90YfQtdC9ISDQndCw0YHRgtGD0L/QuNC7INC80LjRgCDQstC+INCy0YHQtdC8INC80LjRgNC1XCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0J3QsNGH0LDQu9C+INCx0L7RjyEg0JvRjtC00Lgg0YPQvNC40YDQsNGO0YIsINC10YHQu9C4INC40YUg0YPQsdC40YLRjFwiXHJcbiAgICAgIH1cclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3Jlc29sdmVfYXR0YWNrX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5hdHRhY2tfdHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gZ3Vuc2hvdF9hdWRpb1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGEuYXR0YWNrX3R5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gc3dvcmRfYXVkaW9cclxuICAgICAgfSBlbHNlIHsvLyBkZWZhdWx0IGluY2x1ZGluZyBlbmVyZ3kgYW5kIHRocm93aW5nXHJcbiAgICAgICAgdmFyIGF1ZGlvID0gc3VyaWtlbl9hdWRpb1xyXG4gICAgICB9XHJcbiAgICAgIGF1ZGlvLnBsYXkoKTtcclxuXHJcbiAgICAgIGlmIChkYXRhLnVzZXJfaW52aXNpYmlsaXR5X2VuZGVkID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuYXR0YWNrZXJfaWRdID0gXCJhbGxcIlxyXG4gICAgICAgIHZhciBhdHRhY2tlcl9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEuYXR0YWNrZXJfcG9zaXRpb24pO1xyXG4gICAgICAgIGF0dGFja2VyX2NlbGwuc3JjID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5hdHRhY2tlcl9pZF0uYXZhdGFyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmF0dGFja2VyX2lkXVxyXG4gICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbZGF0YS5hdHRhY2tlcl9pZF0gPSAxXHJcblxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmF0dGFja2VyX2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuYXR0YWNrZXJfaWRdIC0gc3RhbWluYV9hdHRhY2tfY29zdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmF0dGFja2VyX2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmF0dGFja2VyX2lkXSAtIDFcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJhaW1fb3ZlclwiKSkge1xyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuYXR0YWNrZXJfaWRdLmFpbVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShcInF1aWNrX2F0dGFja19yZWFkeVwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5hdHRhY2tlcl9pZF0ucXVpY2tfYXR0YWNrX3JlYWR5ID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJtb3ZlX3JlZHVjdGlvblwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdIC0gZGF0YS5tb3ZlX3JlZHVjdGlvbjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuY292ZXJfbGV2ZWwgPiAwKSB7XHJcbiAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwi0KPRgNC+0LLQtdC90Ywg0YPQutGA0YvRgtC40Y86IFwiICsgZGF0YS5jb3Zlcl9sZXZlbFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcIlwiXHJcbiAgICAgIH1cclxuICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L7QtNC90LDQutC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDRg9C00LDQu9C+0YHRjCDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQsNGC0LDQutC+0LLQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90L4g0YLQvtGCINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NlYXJjaF9hY3Rpb25fcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgICAgICBwdXNoVG9MaXN0KGRhdGEuY2hhcmFjdGVyX25hbWUgKyAnINCx0YDQvtGB0LjQuyAnICsgZGF0YS5yb2xsICsgJyDQvdCwINCy0L3QuNC80LDRgtC10LvRjNC90L7RgdGC0Ywg0LIg0LfQvtC90LUgJyArIGRhdGEuem9uZV9udW1iZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLm1pbmVzX2RldGVjdGVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IGRhdGEuY2hhcmFjdGVyX25hbWUgKyBcIiDQvtCx0L3QsNGA0YPQttC40LLQsNC10YIgXCIgKyBkYXRhLm1pbmVzX2RldGVjdGVkLmxlbmd0aCArIFwiINC80LjQvSDRgNGP0LTQvtC8INGBINGB0L7QsdC+0LlcIlxyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubWluZXNfZGV0ZWN0ZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHZhciBtaW5lID0gZGF0YS5taW5lc19kZXRlY3RlZFtpXVxyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1ttaW5lXS5wdXNoKGRhdGEucGxheWVyX25hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbnZhciBjcmVhdGVfYm9hcmRfYnV0dG9uID0gJChDUkVBVEVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxuY3JlYXRlX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBjcmVhdGVCb2FyZCk7XHJcbmNyZWF0ZV9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHNhdmVfYm9hcmRfYnV0dG9uID0gJChTQVZFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnNhdmVfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIHNhdmVCb2FyZCk7XHJcbnNhdmVfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBsb2FkX2JvYXJkX2J1dHRvbiA9ICQoTE9BRF9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5sb2FkX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBsb2FkQm9hcmQpO1xyXG5sb2FkX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgcm9sbF9pbml0aWF0aXZlX2J1dHRvbiA9ICQoUk9MTF9JTklUSUFUSVZFX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnJvbGxfaW5pdGlhdGl2ZV9idXR0b24ub24oJ2NsaWNrJywgcm9sbEluaXRpYXRpdmUpO1xyXG5yb2xsX2luaXRpYXRpdmVfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBmb2dfYnV0dG9uID0gJChGT0dfQlVUVE9OX1NFTEVDVE9SKTtcclxuZm9nX2J1dHRvbi5vbignY2xpY2snLCBmb2dNb2RlQ2hhbmdlKTtcclxuZm9nX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgem9uZV9idXR0b24gPSAkKFpPTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxuem9uZV9idXR0b24ub24oJ2NsaWNrJywgem9uZU1vZGVDaGFuZ2UpO1xyXG56b25lX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgY2hhdF9idXR0b24gPSAkKENIQVRfQlVUVE9OX1NFTEVDVE9SKTtcclxuY2hhdF9idXR0b24ub24oJ2NsaWNrJywgY2hhbmdlQ2hhdFZpc2liaWxpdHkpO1xyXG5cclxudmFyIG1pcnJvcl9idXR0b24gPSAkKE1JUlJPUl9CVVRUT05fU0VMRUNUT1IpO1xyXG5taXJyb3JfYnV0dG9uLm9uKCdjbGljaycsIG1pcnJvcl9ib2FyZCk7XHJcbm1pcnJvcl9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIG5leHRfcm91bmRfYnV0dG9uID0gJChORVhUX1JPVU5EX0JVVFRPTl9TRUxFQ1RPUik7XHJcbm5leHRfcm91bmRfYnV0dG9uLm9uKCdjbGljaycsIHN0YXJ0X25ld19yb3VuZCk7XHJcbm5leHRfcm91bmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBiYXR0bGVfbW9kX2J1dHRvbiA9ICQoQkFUVExFX01PRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5iYXR0bGVfbW9kX2J1dHRvbi5vbignY2xpY2snLCBjaGFuZ2VfYmF0dGxlX21vZCk7XHJcbmJhdHRsZV9tb2RfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBzeW5jX2J1dHRvbiA9ICQoU1lOQ19CVVRUT05fU0VMRUNUT1IpO1xyXG5zeW5jX2J1dHRvbi5vbignY2xpY2snLCBzeW5jX2JvYXJkKTtcclxuc3luY19idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGxhbmRtaW5lX2J1dHRvbiA9ICQoTEFORE1JTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxubGFuZG1pbmVfYnV0dG9uLm9uKCdjbGljaycsIHNob3dfbGFuZG1pbmVzKTtcclxuXHJcbnZhciBmb2dfem9uZV9idXR0b24gPSAkKEZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmZvZ196b25lX2J1dHRvbi5vbignY2xpY2snLCBmb2dDdXJyZW50Wm9uZSk7XHJcbmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgdW5mb2dfem9uZV9idXR0b24gPSAkKFVORk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxudW5mb2dfem9uZV9idXR0b24ub24oJ2NsaWNrJywgdW5mb2dDdXJyZW50Wm9uZSk7XHJcbnVuZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciB6b25lX251bWJlcl9zZWxlY3QgPSAkKFpPTkVfTlVNQkVSX1NFTEVDVE9SKTtcclxuem9uZV9udW1iZXJfc2VsZWN0LmhpZGUoKTtcclxuZm9yIChsZXQgaSA9IDE7IGkgPCBNQVhfWk9ORVM7IGkrKykge1xyXG4gIHZhciBjdXJyZW50X29wdGlvbiA9ICQoXCI8b3B0aW9uPlwiKTtcclxuICBjdXJyZW50X29wdGlvbi50ZXh0KCfQl9C+0L3QsCAnICsgaSk7XHJcbiAgY3VycmVudF9vcHRpb24udmFsKGkpO1xyXG4gIHpvbmVfbnVtYmVyX3NlbGVjdC5hcHBlbmQoY3VycmVudF9vcHRpb24pO1xyXG59XHJcblxyXG52YXIgc2VhcmNoX21vZGlmaWNhdG9yID0gJChTRUFSQ0hfTU9ESUZJQ0FUT1JfU0VMRUNUT1IpO1xyXG5zZWFyY2hfbW9kaWZpY2F0b3IuaGlkZSgpO1xyXG5cclxudmFyIG5vdGlmaWNhdGlvbnNfbGlzdCA9ICQoTk9USUZJQ0FUSU9OU19MSVNUX1NFTEVDVE9SKTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCBDSEFUX0NBU0g7IGkrKykge1xyXG4gIHZhciBjdXJyZW50X2VsZW1lbnQgPSAkKFwiPGxpPlwiKTtcclxuICBjdXJyZW50X2VsZW1lbnQuYXR0cignZGF0YS1uYW1lJywgJ25vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyBpKTtcclxuICBjdXJyZW50X2VsZW1lbnQuYXR0cignY2xhc3MnLCAnbm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnQnKTtcclxuICBub3RpZmljYXRpb25zX2xpc3QuYXBwZW5kKGN1cnJlbnRfZWxlbWVudCk7XHJcbn1cclxuXHJcbnZhciBib2FyZF9zaXplX2lucHV0ID0gJChCT0FSRF9TSVpFX0lOUFVUX1NFTEVDVE9SKTtcclxuYm9hcmRfc2l6ZV9pbnB1dC5oaWRlKCk7XHJcblxyXG52YXIgc2F2ZV9uYW1lX2lucHV0ID0gJChTQVZFX05BTUVfSU5QVVRfU0VMRUNUT1IpO1xyXG5zYXZlX25hbWVfaW5wdXQuaGlkZSgpO1xyXG5cclxudmFyIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyID0gJChOT1RJRklDQVRJT05TX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxubm90aWZpY2F0aW9uc19jb250YWluZXIuaGlkZSgpO1xyXG5cclxudmFyIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lciA9ICQoQ0hBUkFDVEVSX0lORk9fQ09OVEFORVJfU0VMRUNUT1IpO1xyXG5cclxudmFyIHdlYXBvbl9pbmZvX2NvbnRhaW5lciA9ICQoV0VBUE9OX0lORk9fQ09OVEFORVJfU0VMRUNUT1IpO1xyXG5cclxudmFyIGluaXRpYXRpdmVfb3JkZXJfY29udGFpbmVyID0gJChJTklUSUFUSVZFX09SREVSX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciBza2lsbF9tb2RhbCA9ICQoU0tJTExfTU9EQUxfU0VMRUNUT1IpO1xyXG5cclxudmFyIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lciA9ICQoU0tJTExfREVTQ1JJUFRJT05fQ09OVEFJTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciBza2lsbF9tb2RhbF9jb250ZW50ID0gJChTS0lMTF9NT0RBTF9DT05URU5UX1NFTEVDVE9SKTtcclxuXHJcbnZhciBuZXh0X3BhZ2VfYnV0dG9uX2NvbnRhaW5lciA9ICQoTkVYVF9QQUdFX0JVVFRPTl9DT05UQUlORVJfU0VMRUNUT1IpO1xyXG5cclxudmFyIHNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsLW1vZGFsLWNsb3NlXCIpO1xyXG5cclxuc3Bhbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgaGlkZV9tb2RhbCgpO1xyXG59XHJcblxyXG5zcGFuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG53aW5kb3cub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PSBza2lsbF9tb2RhbC5hdHRyKCdpZCcpKSB7XHJcbiAgICBoaWRlX21vZGFsKCk7XHJcbiAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5vbmtleWRvd24gPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGU7XHJcbiAgICAvLyB3XHJcbiAgICBpZihrZXlDb2RlID09IDg3KSB7XHJcbiAgICAgICAgd19vbmNsaWNrKClcclxuICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PSA2NSkgeyAvLyBhXHJcbiAgICAgIGFfb25jbGljaygpXHJcbiAgICB9XHJcbn07XHJcblxyXG5zZXRJbnRlcnZhbChyZWNvbm5lY3QsIDE1KjEwMDApXHJcbiIsImxldCBzb2NrZXQ7XHJcbmxldCBzZXJ2ZXJfYWRkcmVzcztcclxubGV0IG9uTWVzc2FnZUZ1bmN0aW9uO1xyXG5cclxuZnVuY3Rpb24gaW5pdCh1cmwpIHtcclxuICBzZXJ2ZXJfYWRkcmVzcyA9IHVybDtcclxuICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybCk7XHJcbiAgY29uc29sZS5sb2coJ2Nvbm5lY3RpbmcuLicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1JlYWR5KCkge1xyXG4gIHJldHVybiBzb2NrZXQucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU5cclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJPcGVuSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBzb2NrZXQub25vcGVuID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ29wZW4nKTtcclxuICAgIGhhbmRsZXJGdW5jdGlvbigpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XHJcbiAgb25NZXNzYWdlRnVuY3Rpb24gPSBoYW5kbGVyRnVuY3Rpb247XHJcbiAgc29ja2V0Lm9ubWVzc2FnZSA9IChlKSA9PiB7XHJcbiAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuICAgIGhhbmRsZXJGdW5jdGlvbihkYXRhKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyRGVmYXVsdCgpIHtcclxuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgb25NZXNzYWdlRnVuY3Rpb24oZGF0YSk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UocGF5bG9hZCkge1xyXG4gIGlmIChzb2NrZXQucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4pIHtcclxuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaW5pdChzZXJ2ZXJfYWRkcmVzcyk7XHJcbiAgICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKG9uTWVzc2FnZUZ1bmN0aW9uKTtcclxuICAgIGlmIChzb2NrZXQucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4pIHtcclxuICAgICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ05vdCBzZW5kLCBidXQgcmVjb25uZWN0ZWQnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG4gIHJlZ2lzdGVyT3BlbkhhbmRsZXIsXHJcbiAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcixcclxuICBzZW5kTWVzc2FnZSxcclxuICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyRGVmYXVsdCxcclxuICBpc1JlYWR5XHJcbn1cclxuIl19
