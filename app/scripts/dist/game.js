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

var SAVES_SELECT_SELECTOR = '[data-name="saves_select"]';

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
var saves_list = [];

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

var calingalator_range = 1.6;
var calingalator_obstacle = 20;
var calingalator_duration = 3;
var calingalator_stamina_cost = 3;
var calingalator_radius = 1.6;
var calingalator_skill_cooldown = 10;
var calingalator_flat_heal = 5;
var calingalator_roll_heal = 5;

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
    var toSend = {};
    toSend.command = 'ignore_me';
    _wsClient2.default.sendMessage(toSend);
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
  var name = saves_select.val();
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
        if (character_number > 0 && (my_role == "gm" || character_state.visibility[character_number] == 1) && (character_state.invisibility[character_number] == 'all' || character_state.invisibility[character_number] == my_name) && (my_role == "gm" || game_state.fog_state[index] == 0)) {
          choose_character_to_move(index, cell);
        }
      };
      button.ondrop = function (event) {
        var cell = event.target;
        var index = cell.row * game_state.size + cell.column;
        if (character_chosen.in_process == 1 && game_state.board_state[index] == 0 && (my_role == "gm" || game_state.fog_state[index] == 0)) {
          move_character(index, cell);
        } else {
          undo_selection();
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
    if (character.hasOwnProperty("chibi_avatar")) {
      image = character.chibi_avatar;
    } else {
      image = character.avatar;
    }
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
  if (character_chosen.in_process != 0) {
    character_chosen.in_process = 0;
    var old_cell = document.getElementById("cell_" + character_chosen.char_position);
    old_cell.src = get_object_picture(character_chosen.char_id);
  }
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
  old_cell.src = get_object_picture(character_chosen.char_id);
}

function stop_skill() {
  character_chosen.in_process = 0;
  var old_cell = document.getElementById("cell_" + character_chosen.char_position);
  old_cell.src = get_object_picture(character_chosen.char_id);
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
      if (character_state.main_action[character_number] > 0 || character_state.special_effects[character_number].hasOwnProperty("shield_up")) {
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

    case 32:
      // Кальингаллятор
      if (!character_state.special_effects[character_number].hasOwnProperty("calingalator_user")) {
        if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell);
        } else {
          alert("Не хватает действий!");
        }
      } else {
        alert("Чрезмерное калингалирование вредит вашему здоровью! (кулдаун)");
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
    case 32:
      calingalator(index, cell);
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

    if (game_state.board_state[index] == 0) {
      // анимация только в пустую клетку
      add_obstacle_command(index, gas_bomb_obstacle);
    }
  } else {
    alert("Мало каши ели для такого броска");
  }
}

function calingalator(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var character = character_detailed_info[user_character_number];
  if (game_state.board_state[index] == 0) {
    // устанавливается только в пустую клетку
    if (isInRange(index, user_position, calingalator_range)) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id;
      toSend.room_number = my_room;
      toSend.user_index = user_character_number;
      toSend.position = index;
      _wsClient2.default.sendMessage(toSend);

      add_obstacle_command(index, calingalator_obstacle);
    } else {
      alert("Кальингаллятор можно установить лишь в пределах 1.5 клетки от вас");
    }
  } else {
    alert("Кальингаллятор можно установить лишь в пустую клетку");
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

// helper function patterns
function check_cooldown(character_number, effect, message) {
  if (character_state.special_effects[character_number].hasOwnProperty(effect)) {
    if (character_state.special_effects[character_number][effect].cooldown == 0) {
      delete character_state.special_effects[character_number][effect];
      if (message.length > 0) {
        pushToList(message);
      }
    } else {
      character_state.special_effects[character_number][effect].cooldown = character_state.special_effects[character_number][effect].cooldown - 1;
    }
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

function apply_calingalator(position, radius, flat_heal, roll_heal) {
  var candidate_cells = index_in_radius(position, radius);
  for (var i = 0; i < candidate_cells.length; i++) {
    var target_character_number = game_state.board_state[candidate_cells[i]];
    if (target_character_number > 0) {
      // персонаж в радиусе для отхила
      var character = character_detailed_info[target_character_number];
      var rolled_heal = flat_heal + roll_x(roll_heal);
      character_state.HP[target_character_number] = Math.min(character_state.HP[target_character_number] + rolled_heal, HP_values[character.stamina]);
      var message = character.name + " вдыхает целебные пары и восстанавливает " + rolled_heal + " хп.";
      pushToList(message);
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
        saves_select.show();

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
      saves_list = data.saves_list;

      for (var i = 0; i < saves_list.length; i++) {
        var current_option = $("<option>");
        current_option.text(saves_list[i]);
        current_option.val(saves_list[i]);
        saves_select.append(current_option);
      }
    } else if (data.command == 'construct_board_response') {
      clear_character_state();
      construct_board(data.game_state);
    } else if (data.command == 'add_character_response') {
      game_state.board_state[data.cell_id] = data.character_number;
      var character = data.character_info;
      character_detailed_info[data.character_number] = character;
      if (!(my_role == 'player' && game_state.fog_state[data.cell_id] == 1)) {
        var cell = document.getElementById("cell_" + data.cell_id);
        cell.src = get_object_picture(data.character_number);
      }
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

      for (var _i10 = 0; _i10 < data.invisibility_ended_id.length; _i10++) {
        var id = data.invisibility_ended_id[_i10];
        character_state.invisibility[id] = "all";

        var position = character_state.position[id];
        var to_cell = document.getElementById('cell_' + position);
        var avatar = get_object_picture(id);
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
        to_cell.src = get_object_picture(data.character_number);
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
        saves_list.push(data.save_name);
        var current_option = $("<option>");
        current_option.text(data.save_name);
        current_option.val(data.save_name);
        saves_select.append(current_option);
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
          if (data.outcome == "shield_up") {
            character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
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

        case 32:
          // кальингалятор
          character = character_detailed_info[user_index];
          character_state.main_action[user_index] = character_state.main_action[user_index] - 1;
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1;
          character_state.stamina[user_index] = character_state.stamina[user_index] - calingalator_stamina_cost;

          var message = character.name + " устанавливает кальингалятор. Собирайтесь вокруг!.";
          pushToList(message);

          var calingalator_object = {};
          calingalator_object.type = "calingalator";
          calingalator_object.position = data.position;
          calingalator_object.duration = calingalator_duration;
          calingalator_object.radius = calingalator_radius;
          calingalator_object.flat_heal = calingalator_flat_heal;
          calingalator_object.roll_heal = calingalator_roll_heal;
          game_state.terrain_effects.push(calingalator_object);

          var calingalator_user = {};
          calingalator_user.cooldown = calingalator_skill_cooldown;
          character_state.special_effects[user_index].calingalator_user = calingalator_user;
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
            case "calingalator":
              apply_calingalator(game_state.terrain_effects[_i17].position, game_state.terrain_effects[_i17].radius, game_state.terrain_effects[_i17].flat_heal, game_state.terrain_effects[_i17].roll_heal);
              game_state.terrain_effects[_i17].duration = game_state.terrain_effects[_i17].duration - 1;
              if (game_state.terrain_effects[_i17].duration == 0) {
                if (my_role == "gm") {
                  delete_object_command(game_state.terrain_effects[_i17].position);
                }
                game_state.terrain_effects[_i17] = null;
              }
              break;
            default:
              console.log("Messed up resolving terrain effects");
              console.log(game_state.terrain_effects[_i17].type);
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

          check_cooldown(_i18, "light_sound_bomb_user", "Светошумовая граната у " + character.name + " готова к использованию.");
          check_cooldown(_i18, "action_splash", character.name + " вновь может использовать всплеск действий.");
          check_cooldown(_i18, "safety_service_user", "");
          check_cooldown(_i18, "calingalator_user", "");
          check_cooldown(_i18, "gas_bomb_user", "Газовая граната у " + character.name + " готова к использованию.");
          check_cooldown(_i18, "acid_bomb_user", "Кислотная граната у " + character.name + " готова к использованию.");
          check_cooldown(_i18, "force_field_user", "Силовое поле у " + character.name + " снова заряжено.");
          check_cooldown(_i18, "charge_user", "");
          check_cooldown(_i18, "cut_limb_user", "");
          check_cooldown(_i18, "adrenaline_user", "Умение Прилив Адреналина у " + character.name + " снова доступно.");
          check_cooldown(_i18, "poisonous_adrenaline_user", "Умение Адреналиновый Потоп у " + character.name + " снова доступно.");

          if (character_state.special_effects[_i18].hasOwnProperty("safety_service_target")) {
            if (character_state.special_effects[_i18].safety_service_target.duration == 0) {
              character_state.defensive_advantage[_i18] = character_state.defensive_advantage[_i18] - safety_service_defensive_advantage;
              character_state.evade_bonus[_i18] = character_state.evade_bonus[_i18] - safety_service_evade_bonus;
              delete character_state.special_effects[_i18].safety_service_target;
            } else {
              character_state.special_effects[_i18].safety_service_target.duration = character_state.special_effects[_i18].safety_service_target.duration - 1;
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

          if (character_state.special_effects[_i18].hasOwnProperty("aim")) {
            delete character_state.special_effects[_i18].aim;
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

var saves_select = $(SAVES_SELECT_SELECTOR);
saves_select.hide();

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

setInterval(reconnect, 30 * 1000);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksbUNBQW1DLHdDQUF2QztBQUNBLElBQUksZ0NBQWdDLHFDQUFwQztBQUNBLElBQUksa0NBQWtDLHVDQUF0QztBQUNBLElBQUkscUNBQXFDLGtEQUF6Qzs7QUFFQSxJQUFJLCtCQUErQixtQ0FBbkM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLGtDQUFrQyxzQ0FBdEM7QUFDQSxJQUFJLHNCQUFzQiwwQkFBMUI7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHlCQUF5Qiw2QkFBN0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7O0FBRUEsSUFBSSx3QkFBd0IsNEJBQTVCOztBQUVBLElBQUksdUJBQXVCLGtDQUEzQjtBQUNBLElBQUksOEJBQThCLGtDQUFsQzs7QUFFQSxJQUFJLDRCQUE0QixnQ0FBaEM7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7O0FBRUEsSUFBSSw4QkFBOEIsa0NBQWxDOztBQUVBLElBQUksdUJBQXVCLDJCQUEzQjtBQUNBLElBQUksK0JBQStCLG1DQUFuQztBQUNBLElBQUksdUNBQXVDLDJDQUEzQztBQUNBLElBQUksc0NBQXNDLDBDQUExQzs7QUFFQSxJQUFJLGlCQUFpQixTQUFTLE1BQVQsQ0FBZ0Is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ckIsRUFBOEI7QUFDNUIsTUFBSSxPQUFPLFVBQVAsS0FBc0IsVUFBVSxJQUFwQyxFQUEwQztBQUN4QyxXQUFPLElBQVAsQ0FBWSxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQVo7QUFDRCxHQUZELE1BRU87QUFDTCxTQUFLLGNBQUw7QUFDQSwyQkFBdUIsaUJBQXZCO0FBQ0EsUUFBSSxPQUFPLFVBQVAsS0FBc0IsVUFBVSxJQUFwQyxFQUEwQztBQUN4QyxhQUFPLElBQVAsQ0FBWSxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQVo7QUFDRCxLQUZELE1BRU87QUFDTCxjQUFRLEdBQVIsQ0FBWSwyQkFBWjtBQUNEO0FBQ0Y7QUFDRjs7a0JBRWM7QUFDYixZQURhO0FBRWIsMENBRmE7QUFHYixnREFIYTtBQUliLDBCQUphO0FBS2IsOERBTGE7QUFNYjtBQU5hLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgc29ja2V0IGZyb20gJy4vd3MtY2xpZW50JztcclxuXHJcbnZhciAkID0gd2luZG93LmpRdWVyeTtcclxuXHJcbnZhciBDSEFSQUNURVJfSU5GT19DT05UQU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCJdJztcclxudmFyIFdFQVBPTl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ3ZWFwb24taW5mby1jb250YWluZXJcIl0nO1xyXG52YXIgTk9USUZJQ0FUSU9OU19DT05UQU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9ucy1jb250YWluZXJcIl0nO1xyXG52YXIgSU5JVElBVElWRV9PUkRFUl9DT05UQU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiaW5pdGlhdGl2ZS1vcmRlci1kaXNwbGF5LWNvbnRhaW5lclwiXSc7XHJcblxyXG52YXIgQ1JFQVRFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY3JlYXRlX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBTQVZFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2F2ZV9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgTE9BRF9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImxvYWRfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIFJPTExfSU5JVElBVElWRV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInJvbGxfaW5pdGlhdGl2ZV9idXR0b25cIl0nO1xyXG52YXIgRk9HX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiZm9nX2J1dHRvblwiXSc7XHJcbnZhciBaT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiem9uZV9idXR0b25cIl0nO1xyXG52YXIgQ0hBVF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImNoYXRfYnV0dG9uXCJdJztcclxudmFyIE1JUlJPUl9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm1pcnJvcl9idXR0b25cIl0nO1xyXG52YXIgTkVYVF9ST1VORF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm5leHRfcm91bmRfYnV0dG9uXCJdJztcclxudmFyIEJBVFRMRV9NT0RfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJiYXR0bGVfbW9kX2J1dHRvblwiXSc7XHJcbnZhciBTWU5DX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic3luY19idXR0b25cIl0nO1xyXG52YXIgTEFORE1JTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJsYW5kbWluZV9idXR0b25cIl0nO1xyXG52YXIgRk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJmb2dfem9uZV9idXR0b25cIl0nO1xyXG52YXIgVU5GT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInVuZm9nX3pvbmVfYnV0dG9uXCJdJztcclxuXHJcbnZhciBTQVZFU19TRUxFQ1RfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNhdmVzX3NlbGVjdFwiXSc7XHJcblxyXG52YXIgWk9ORV9OVU1CRVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInpvbmVfbnVtYmVyX3NlbGVjdFwiXSc7XHJcbnZhciBTRUFSQ0hfTU9ESUZJQ0FUT1JfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNlYXJjaF9tb2RpZmljYXRvclwiXSc7XHJcblxyXG52YXIgQk9BUkRfU0laRV9JTlBVVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiYm9hcmRfc2l6ZV9pbnB1dFwiXSc7XHJcbnZhciBTQVZFX05BTUVfSU5QVVRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNhdmVfbmFtZV9pbnB1dFwiXSc7XHJcblxyXG52YXIgTk9USUZJQ0FUSU9OU19MSVNUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RcIl0nO1xyXG5cclxudmFyIFNLSUxMX01PREFMX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJza2lsbC1tb2RhbFwiXSc7XHJcbnZhciBTS0lMTF9NT0RBTF9DT05URU5UX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJza2lsbC1tb2RhbC1jb250ZW50XCJdJztcclxudmFyIFNLSUxMX0RFU0NSSVBUSU9OX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2tpbGwtZGVzY3JpcHRpb24tY29udGFpbmVyXCJdJztcclxudmFyIE5FWFRfUEFHRV9CVVRUT05fQ09OVEFJTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJuZXh0LXBhZ2UtYnV0dG9uLWNvbnRhaW5lclwiXSc7XHJcblxyXG52YXIgU0VSVkVSX0FERFJFU1MgPSBsb2NhdGlvbi5vcmlnaW4ucmVwbGFjZSgvXmh0dHAvLCAnd3MnKTtcclxuXHJcbnZhciBteV9uYW1lID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpKTtcclxudmFyIG15X3JvbGUgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJfcm9sZScpKTtcclxudmFyIG15X3Jvb20gPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Jvb21fbnVtYmVyJykpO1xyXG5cclxudmFyIGNoYXJhY3Rlcl9saXN0ID0gW107XHJcbnZhciBncm91cF9saXN0ID0gW107XHJcbnZhciBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyA9IFtdO1xyXG52YXIgb2JzdGFjbGVfbGlzdCA9IFtdO1xyXG52YXIgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyA9IFtdO1xyXG52YXIgd2VhcG9uX2xpc3QgPSBbXTtcclxudmFyIHdlYXBvbl9kZXRhaWxlZF9pbmZvID0gW107XHJcbnZhciBza2lsbF9saXN0ID0gW107XHJcbnZhciBza2lsbF9kZXRhaWxlZF9pbmZvO1xyXG52YXIgc2F2ZXNfbGlzdCA9IFtdO1xyXG5cclxudmFyIFRJTllfRUZGRUNUX0NMQVNTID0gJ2lzLXRpbnknO1xyXG5cclxudmFyIEVNUFRZX0NFTExfUElDID0gXCIuL2ltYWdlcy9zcXVhcmUuanBnXCI7XHJcbnZhciBaT05FX0VORFBPSU5UX1BJQyA9IFwiLi9pbWFnZXMvcmVkX2Nyb3NzLmpwZ1wiXHJcbnZhciBGT0dfSU1BR0UgPSBcIi4vaW1hZ2VzL2ZvZy53ZWJwXCI7XHJcbnZhciBRVUVTVElPTl9JTUFHRSA9IFwiLi9pbWFnZXMvcXVlc3Rpb24uanBnXCI7XHJcbnZhciBJTlZJU0VfSU1BR0UgPSBcIi4vaW1hZ2VzL3pvcnJvX21hc2suanBlZ1wiO1xyXG52YXIgQUlNX0lNQUdFID0gXCIuL2ltYWdlcy9haW0uanBnXCI7XHJcbnZhciBSSUdIVF9BUlJPV19JTUFHRSA9IFwiLi9pbWFnZXMvcmlnaHRfYXJyb3cucG5nXCI7XHJcblxyXG52YXIgTUFYX1pPTkVTID0gMjU7XHJcbnZhciBDSEFUX0NBU0ggPSAxNTtcclxuXHJcbnZhciBzdGFtaW5hX3dlYWtzcG90X2Nvc3QgPSAxXHJcbnZhciBzdGFtaW5hX21vdmVfY29zdCA9IDBcclxudmFyIHN0YW1pbmFfYXR0YWNrX2Nvc3QgPSAxXHJcbnZhciBwdW5jaF9yYWluZmFsbF9zdGFtaW5hX2Nvc3QgPSAyIC8vIHBlciBwdW5jaFxyXG52YXIgc3RhbWluYV9jdXRfbGltYl9jb3N0ID0gNFxyXG52YXIgc2hpZWxkX3VwX3N0YW1pbmFfY29zdCA9IDIgLy8gcGVyIG1vdmUgSSB0aGlua1xyXG52YXIgbG90dGVyeV9zaG90X3N0YW1pbmFfY29zdCA9IDFcclxudmFyIGx1Y2t5X3Nob3Rfc3RhbWluYV9jb3N0ID0gMVxyXG52YXIgYWN0aW9uX3NwbGFzaF9zdGFtaW5hX2Nvc3QgPSAyXHJcbnZhciBhZHJlbmFsaW5lX3N0YW1pbmFfY29zdCA9IDNcclxudmFyIGFjaWRfYm9tYl9zdGFtaW5hX2Nvc3QgPSAzXHJcbnZhciBjdXJ2ZWRfYnVsbGV0c19zdGFtaW5hX2Nvc3QgPSAyXHJcblxyXG52YXIgY3V0X2xpbWJfY29vbGRvd24gPSAxXHJcblxyXG52YXIgcmVzdF9zdGFtaW5hX2dhaW4gPSA1XHJcblxyXG52YXIgY3V0X2xpbWJfZHVyYXRpb24gPSAxXHJcbnZhciBjb29sZG93bl9iaWdfYnJvID0gMSAvLyBkdXJhdGlvblxyXG5cclxudmFyIHNoaWVsZF91cF9LRCA9IDNcclxuXHJcbnZhciBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2UgPSA0XHJcbnZhciBjaGFyZ2VfbW92ZV9pbmNyZWFzZSA9IDRcclxuXHJcbnZhciBnYXNfYm9tYl90aHJlc2hvbGQgPSAxMVxyXG52YXIgZ2FzX2JvbWJfbW92ZV9yZWR1Y3Rpb24gPSAyXHJcbnZhciBnYXNfYm9tYl9zdGFtaW5hX2Nvc3QgPSAzXHJcbnZhciBnYXNfYm9tYl9vYnN0YWNsZSA9IDE1XHJcbnZhciBnYXNfYm9tYl9za2lsbF9jb29sZG93biA9IDVcclxuXHJcbnZhciBsaWdodF9zb3VuZF9ib21iX3JhZGl1cyA9IDRcclxudmFyIGxpZ2h0X3NvdW5kX2JvbWJfdGhyZXNob2xkID0gMTVcclxudmFyIGxpZ2h0X3NvdW5kX2JvbWJfc2tpbGxfY29vbGRvd24gPSA1XHJcblxyXG52YXIgd2Vha19zcG90X3RocmVzaG9sZCA9IDE1XHJcblxyXG52YXIgc2hvY2tlZF9jb29sZG93biA9IDBcclxuXHJcbnZhciBwaWNoX3BpY2hfY29vbGRvd24gPSA0XHJcbnZhciBwaWNoX3BpY2hfbW92ZV9pbmNyZWFzZSA9IDRcclxuXHJcbnZhciBmb3JjZV9maWVsZF9yYWRpdXMgPSAxLjZcclxudmFyIGZvcmNlX2ZpZWxkX3N0YW1pbmFfY29zdCA9IDVcclxudmFyIGZvcmNlX2ZpZWxkX2Nvb2xkb3duID0gMTBcclxudmFyIGZvcmNlX2ZpZWxkX29ic3RhY2xlID0gMjRcclxuXHJcbnZhciBhY3Rpb25fc3BsYXNoX2Nvb2xkb3duID0gNFxyXG5cclxudmFyIGludmlzaWJpbGl0eV9kZXRlY3Rpb25fcmFkaXVzID0gMjtcclxuXHJcbnZhciBiaWdfYnJvX3JhbmdlID0gMlxyXG52YXIgaGVhbF9yYW5nZSA9IDFcclxudmFyIHRocm93X2Jhc2VfcmFuZ2UgPSAyXHJcbnZhciBsaWdodF9zb3VuZF9ib21iX3JhbmdlID0gNVxyXG52YXIgZm9yY2VfZmllbGRfcmFuZ2UgPSAxXHJcbnZhciBhZHJlbmFsaW5lX3JhbmdlID0gMVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfcmFuZ2UgPSAxXHJcblxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfZHVyYXRpb24gPSAyXHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9jb29sZG93biA9IDVcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX2ZsYXRfSFAgPSA1XHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9mbGF0X3N0YW1pbmEgPSA1XHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9wZXJjZW50X0hQID0gMC4wNVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfcGVyY2VudF9zdGFtaW5hID0gMC4wNVxyXG5cclxudmFyIGFkcmVuYWxpbmVfY29vbGRvd24gPSAzXHJcblxyXG52YXIgYWNpZF9ib21iX2R1cmF0aW9uID0gMiAvLyAyKzEgcmVhbGx5XHJcbnZhciBhY2lkX2JvbWJfY29vbGRvd24gPSA1XHJcbnZhciBhY2lkX2JvbWJfcmFkaXVzID0gMS42XHJcblxyXG52YXIgbWluZXNfMF9kaXN0YW5jZV9kYW1hZ2UgPSAyMFxyXG52YXIgbWluZXNfMV9kaXN0YW5jZV9kYW1hZ2UgPSAxNVxyXG52YXIgbWluZXNfMXA1X2Rpc3RhbmNlX2RhbWFnZSA9IDEwXHJcbnZhciBsYW5kbWluZV9kZXRlY3Rpb25fcmFkaXVzID0gMi45XHJcbnZhciBsYW5kbWluZV9kaWZmdXNlX3RocmVzaG9sZCA9IDEwXHJcblxyXG52YXIgdG9iYWNjb19zdHJpa2VfaHBfcGVyY2VudGFnZSA9IDAuMVxyXG52YXIgdG9iYWNjb19zdHJpa2VfYm9udXMgPSA0XHJcbnZhciB0b2JhY2NvX3N0cmlrZV9jb29sZG93biA9IDFcclxuXHJcbnZhciBzYWZldHlfc2VydmljZV9yYW5nZSA9IDI7XHJcbnZhciBzYWZldHlfc2VydmljZV9jb29sZG93biA9IDE7XHJcbnZhciBzYWZldHlfc2VydmljZV9kdXJhdGlvbiA9IDE7XHJcbnZhciBzYWZldHlfc2VydmljZV9kZWZlbnNpdmVfYWR2YW50YWdlID0gMTtcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2V2YWRlX2JvbnVzID0gMztcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2JvbnVzX2FjdGlvbnNfY29zdCA9IDI7XHJcblxyXG52YXIgY2FsaW5nYWxhdG9yX3JhbmdlID0gMS42O1xyXG52YXIgY2FsaW5nYWxhdG9yX29ic3RhY2xlID0gMjA7XHJcbnZhciBjYWxpbmdhbGF0b3JfZHVyYXRpb24gPSAzO1xyXG52YXIgY2FsaW5nYWxhdG9yX3N0YW1pbmFfY29zdCA9IDM7XHJcbnZhciBjYWxpbmdhbGF0b3JfcmFkaXVzID0gMS42O1xyXG52YXIgY2FsaW5nYWxhdG9yX3NraWxsX2Nvb2xkb3duID0gMTA7XHJcbnZhciBjYWxpbmdhbGF0b3JfZmxhdF9oZWFsID0gNTtcclxudmFyIGNhbGluZ2FsYXRvcl9yb2xsX2hlYWwgPSA1O1xyXG5cclxuLy8gVGhpcyBpcyBhIGNvbnN0YW50LCB3aWxsIGJlIG1vdmVkIHRvIGRhdGFiYXNlIGxhdGVyXHJcbmNvbnN0IEhQX3ZhbHVlcyA9IFsxNSwgMzAsIDQwLCA1NSwgNzUsIDEwMCwgMTMwLCAxNjUsIDIwNSwgMjUwLCAzMDAsIDM1NSwgNDE1XTtcclxuY29uc3Qgc3RhbWluYV92YWx1ZXMgPSBbMzAsIDQ1LCA2MCwgNzUsIDkwLCAxMDUsIDEyMCwgMTM1LCAxNTAsIDE2NSwgMTgwLCAxOTVdO1xyXG5jb25zdCBzdHJlbmd0aF9kYW1hZ2VfbWFwID0gWy0yLCAwLCAxLCAzLCA2LCAxMCwgMTUsIDIxLCAyOCwgMzYsIDQ1LCA1NV1cclxuY29uc3QgbW92ZV9hY3Rpb25fbWFwID0gWzEsIDMsIDQsIDYsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTVdXHJcbmNvbnN0IGJvbnVzX2FjdGlvbl9tYXA9IFswLCAxLCAxLCAyLCAyLCAyLCAyLCAyLCAzLCAzLCAzLCAzXVxyXG5jb25zdCBtYWluX2FjdGlvbl9tYXAgPSBbMSwgMSwgMSwgMSwgMSwgMSwgMiwgMiwgMiwgMiwgMiwgM11cclxuXHJcbnZhciBDSEFSQUNURVJfU1RBVEVfQ09OU1RBTlQgPSB7SFA6IFtdLCBtYWluX2FjdGlvbjogW10sIGJvbnVzX2FjdGlvbjogW10sIG1vdmVfYWN0aW9uOiBbXSwgc3RhbWluYTogW10sIGluaXRpYXRpdmU6IFtdLCBjYW5fZXZhZGU6IFtdLCBoYXNfbW92ZWQ6IFtdLCBLRF9wb2ludHM6IFtdLCBjdXJyZW50X3dlYXBvbjogW10sIHZpc2liaWxpdHk6IFtdLCBpbnZpc2liaWxpdHk6IFtdLCBhdHRhY2tfYm9udXM6IFtdLCBkYW1hZ2VfYm9udXM6IFtdLCB1bml2ZXJzYWxfYm9udXM6IFtdLCBib251c19LRDogW10sIHNwZWNpYWxfZWZmZWN0czogW10sIHJhbmdlZF9hZHZhbnRhZ2U6IFtdLCBtZWxlZV9hZHZhbnRhZ2U6IFtdLCBkZWZlbnNpdmVfYWR2YW50YWdlOiBbXSwgcG9zaXRpb246IFtdLCBldmFkZV9ib251czogW10sIG1lbGVlX3Jlc2lzdDogW10sIGJ1bGxldF9yZXNpc3Q6IFtdfTtcclxubGV0IGdhbWVfc3RhdGUgPSB7Ym9hcmRfc3RhdGU6IFtdLCBmb2dfc3RhdGU6IFtdLCB6b25lX3N0YXRlOiBbXSwgc2l6ZTogMCwgc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlOiBbXSwgdGVycmFpbl9lZmZlY3RzOiBbXSwgYmF0dGxlX21vZDogMCwgbGFuZG1pbmVzOiB7cG9zaXRpb25zOiBbXSwga25vd2VyczogW119fTtcclxubGV0IGNoYXJhY3Rlcl9zdGF0ZSA9IENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVDtcclxuXHJcbmxldCBnbV9jb250cm9sX21vZCA9IDA7IC8vIG5vcm1hbCBtb2RlXHJcblxyXG4vLyBpbl9wcm9jZXNzOiAwID0gbm90aGluZywgMSA9IG1vdmUsIDIgPSBhdHRhY2ssIDMgPSBza2lsbFxyXG5sZXQgY2hhcmFjdGVyX2Nob3NlbiA9IHtpbl9wcm9jZXNzOiAwLCBjaGFyX2lkOiAwLCBjaGFyX3Bvc2l0aW9uOiAwLCB3ZWFwb25faWQ6IDAsIHNraWxsX2lkOiAwLCBjZWxsOiAwfTtcclxuXHJcbmxldCBsYXN0X29ic3RhY2xlID0gMTtcclxubGV0IHpvbmVfZW5kcG9pbnQgPSB7aW5kZXg6IC0xLCBjZWxsOiAwfVxyXG5cclxudmFyIGd1bnNob3RfYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9ndW5zaG90Lm1wMycpO1xyXG52YXIgc3dvcmRfYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9zd29yZC53YXYnKTtcclxudmFyIGV4cGxvc2lvbl9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL2V4cGxvc2lvbi5tcDMnKTtcclxudmFyIHN1cmlrZW5fYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9zdXJpa2VuLm1wMycpO1xyXG5cclxuZ3Vuc2hvdF9hdWRpby52b2x1bWUgPSAwLjJcclxuc3dvcmRfYXVkaW8udm9sdW1lID0gMC4yXHJcbnN1cmlrZW5fYXVkaW8udm9sdW1lID0gMC4yXHJcbmV4cGxvc2lvbl9hdWRpby52b2x1bWUgPSAwLjJcclxuXHJcbmZ1bmN0aW9uIHJlY29ubmVjdCgpIHtcclxuICBpZiAoIXNvY2tldC5pc1JlYWR5KCkpIHtcclxuICAgIHNvY2tldC5pbml0KFNFUlZFUl9BRERSRVNTKTtcclxuICAgIHNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyRGVmYXVsdCgpO1xyXG4gICAgY29uc29sZS5sb2coJ0hvcGVmdWxseSByZWNvbm5lY3RlZCAocHJheSknKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coJ1dhcyBvbmxpbmUgYW55d2F5Jyk7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdpZ25vcmVfbWUnO1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDQodC+0LfQtNCw0L3QuNC1INC00L7RgdC60LgsIG9uY2xpY2sg0LrQu9C10YLQvtC6LCBzYXZlL2xvYWRcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xyXG4gIGdhbWVfc3RhdGUuc2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRfc2l6ZVwiKS52YWx1ZTtcclxuICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLnpvbmVfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplICogZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlLnB1c2goMCk7XHJcbiAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlLnB1c2goMCk7XHJcbiAgfVxyXG4gIHNlbmRfY29uc3RydWN0X2NvbW1hbmQoZ2FtZV9zdGF0ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRCb2FyZCgpIHtcclxuICB2YXIgbmFtZSA9IHNhdmVzX3NlbGVjdC52YWwoKTtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnbG9hZF9nYW1lJztcclxuICB0b1NlbmQuc2F2ZV9uYW1lID0gbmFtZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlQm9hcmQoKSB7XHJcbiAgdmFyIHNhdmVfbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwX25hbWVcIikudmFsdWU7XHJcbiAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IHtcclxuICAgIGdhbWVfc3RhdGU6IGdhbWVfc3RhdGUsXHJcbiAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbzogY2hhcmFjdGVyX2RldGFpbGVkX2luZm8sXHJcbiAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvOiBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvLFxyXG4gICAgY2hhcmFjdGVyX3N0YXRlOiBjaGFyYWN0ZXJfc3RhdGVcclxuICB9O1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2F2ZV9nYW1lJztcclxuICB0b1NlbmQuc2F2ZV9uYW1lID0gc2F2ZV9uYW1lO1xyXG4gIHRvU2VuZC5mdWxsX2dhbWVfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGU7XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZF9jb25zdHJ1Y3RfY29tbWFuZChuZXdfZ2FtZV9zdGF0ZSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdjb25zdHJ1Y3RfYm9hcmQnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmdhbWVfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29uc3RydWN0X2JvYXJkKG5ld19nYW1lX3N0YXRlKSB7XHJcbiAgZ2FtZV9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlXHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBib2FyZF9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkLWNvbnRhaW5lclwiKTtcclxuICBib2FyZF9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICB2YXIgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XHJcbiAgYm9hcmQuY2xhc3NOYW1lID0gXCJib2FyZFwiO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICB2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG4gICAgcm93LmNsYXNzTmFtZSA9IFwiYm9hcmRfcm93XCI7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVfc3RhdGUuc2l6ZTsgaisrKSB7XHJcbiAgICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gICAgICB2YXIgY2VsbF9pZCA9IGkgKiBnYW1lX3N0YXRlLnNpemUgKyBqO1xyXG4gICAgICBidXR0b24uaWQgPSBcImNlbGxfXCIgKyBjZWxsX2lkO1xyXG4gICAgICBidXR0b24ucm93ID0gaTtcclxuICAgICAgYnV0dG9uLmNvbHVtbiA9IGo7XHJcbiAgICAgIHZhciBpbWFnZV9uYW1lID0gZm9nT3JQaWMoY2VsbF9pZCk7XHJcbiAgICAgIGJ1dHRvbi5zcmMgPSBpbWFnZV9uYW1lO1xyXG4gICAgICBidXR0b24uc3R5bGUud2lkdGggPSAnNTBweCc7XHJcbiAgICAgIGJ1dHRvbi5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XHJcbiAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAnYm9hcmRfY2VsbCc7XHJcbiAgICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICB2YXIgaW5kZXggPSBjZWxsLnJvdyAqIGdhbWVfc3RhdGUuc2l6ZSArIGNlbGwuY29sdW1uO1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgIHNoaWZ0X29uY2xpY2soaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgICBjdHJsX29uY2xpY2soaW5kZXgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vX3NoaWZ0X29uY2xpY2sobXlfcm9sZSwgZ21fY29udHJvbF9tb2QsIGdhbWVfc3RhdGUsIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcywgY2VsbCwgaW5kZXgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuICAgICAgYnV0dG9uLmRyYWdnYWJsZSA9IHRydWU7XHJcbiAgICAgIGJ1dHRvbi5vbmRyYWdvdmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGJ1dHRvbi5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gY2VsbC5yb3cgKiBnYW1lX3N0YXRlLnNpemUgKyBjZWxsLmNvbHVtbjtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdO1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfbnVtYmVyID4gMCAmJiAobXlfcm9sZSA9PSBcImdtXCIgfHwgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gMSkgJiYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gJ2FsbCcgfHwgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSBteV9uYW1lKSAmJiAobXlfcm9sZSA9PSBcImdtXCIgfHwgZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDApKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGJ1dHRvbi5vbmRyb3AgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHZhciBpbmRleCA9IGNlbGwucm93ICogZ2FtZV9zdGF0ZS5zaXplICsgY2VsbC5jb2x1bW47XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9PSAxICYmIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID09IDAgJiYgKG15X3JvbGUgPT0gXCJnbVwiIHx8IGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9PSAwKSkge1xyXG4gICAgICAgICAgbW92ZV9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHVuZG9fc2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHZhciBjZWxsX3dyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XHJcbiAgICAgIGNlbGxfd3JhcC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICBjZWxsX3dyYXAuY2xhc3NOYW1lID0gXCJjZWxsX3dyYXBcIjtcclxuXHJcbiAgICAgIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICB6b25lX3RleHQuaWQgPSBcInpvbmVfdGV4dF9cIiArIGNlbGxfaWQ7XHJcbiAgICAgIHpvbmVfdGV4dC5jbGFzc05hbWUgPSBcInpvbmVfdGV4dFwiO1xyXG4gICAgICBjZWxsX3dyYXAuYXBwZW5kQ2hpbGQoem9uZV90ZXh0KTtcclxuXHJcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsX3dyYXApO1xyXG4gICAgfVxyXG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQocm93KTtcclxuICB9XHJcbiAgYm9hcmRfY29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbm9fc2hpZnRfb25jbGljayhteV9yb2xlLCBnbV9jb250cm9sX21vZCwgZ2FtZV9zdGF0ZSwgZmllbGRfY2hvc2VuLCBjZWxsLCBpbmRleCkge1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIC8vIGdtIHNpZGVcclxuICAgIGlmIChnbV9jb250cm9sX21vZCA9PSAwKSB7XHJcbiAgICAgIC8vIHdlIGFyZSBpbiBub3JtYWwgYWRkL21vdmUgZGVsZXRlIG1vZGVcclxuICAgICAgc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCBteV9yb2xlKTtcclxuICAgIH0gZWxzZSBpZiAoZ21fY29udHJvbF9tb2QgPT0gMSkge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gZm9nIG1vZGVcclxuICAgICAgYXBwbHlGb2coaW5kZXgsIGNlbGwpO1xyXG4gICAgfSBlbHNlIGlmIChnbV9jb250cm9sX21vZCA9PSAyKSB7XHJcbiAgICAgIC8vIHdlIGFyZSBpbiB6b25lcyBtb2RlXHJcbiAgICAgIGFzc2lnblpvbmUoaW5kZXgpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBwbGF5ZXIgc2lkZVxyXG4gICAgaWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9PSAxKSB7XHJcbiAgICAgIC8vIGNsaWNrZWQgZm9nXHJcbiAgICAgIGlmIChmaWVsZF9jaG9zZW4gPT0gMSkge1xyXG4gICAgICAgIHVuZG9fc2VsZWN0aW9uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyBmb2cgZGV0ZWN0ZWQnKTtcclxuICAgICAgICBkaXNwbGF5Rm9nKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0YW5kYXJkX2NlbGxfb25DbGljayhpbmRleCwgY2VsbCwgbXlfcm9sZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaGlmdF9vbmNsaWNrKGluZGV4LCBjZWxsKSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgaWYgKGdtX2NvbnRyb2xfbW9kID09IDIpIHtcclxuICAgICAgaWYgKHpvbmVfZW5kcG9pbnQuaW5kZXggPCAwKSB7XHJcbiAgICAgICAgem9uZV9lbmRwb2ludC5pbmRleCA9IGluZGV4XHJcbiAgICAgICAgem9uZV9lbmRwb2ludC5jZWxsID0gY2VsbFxyXG4gICAgICAgIGNlbGwuc3JjID0gWk9ORV9FTkRQT0lOVF9QSUNcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbmRwb2ludF9hc3NpZ25fem9uZShpbmRleCwgem9uZV9lbmRwb2ludC5pbmRleClcclxuICAgICAgICB6b25lX2VuZHBvaW50LmNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUNcclxuICAgICAgICB6b25lX2VuZHBvaW50LmluZGV4ID0gLTFcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdhZGRfb2JzdGFjbGUnO1xyXG4gICAgICB0b1NlbmQuY2VsbF9pZCA9IGluZGV4O1xyXG4gICAgICB0b1NlbmQub2JzdGFjbGVfbnVtYmVyID0gbGFzdF9vYnN0YWNsZTtcclxuICAgICAgdG9TZW5kLm9ic3RhY2xlX25hbWUgPSBvYnN0YWNsZV9saXN0W2xhc3Rfb2JzdGFjbGUgLSAxXTtcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjdHJsX29uY2xpY2soaW5kZXgpIHtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICB2YXIgZm9nX3ZhbHVlID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgbW9kID0gMSAtIGZvZ192YWx1ZVxyXG4gICAgdmFyIHpvbmUgPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaW5kZXhdXHJcbiAgICBmb2dQYXJzZVpvbmUobW9kLCB6b25lKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCByb2xlKSB7XHJcblx0aWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID09IDApIHsgLy8gZW1wdHkgY2VsbCBjbGlja2VkXHJcblxyXG4gICAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2Vzcykge1xyXG4gICAgICBjYXNlIDA6IC8vIG5vdGhpbmdcclxuICAgICAgICBpZiAocm9sZSA9PSAnZ20nKSB7XHJcbiAgICAgICAgICBhZGRfb2JqZWN0KGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTogLy8gbW92ZVxyXG4gICAgICAgIG1vdmVfY2hhcmFjdGVyKGluZGV4LCBjZWxsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOiAvL2F0dGFja1xyXG4gICAgICAgIHN0b3BfYXR0YWNrKClcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOiAvL3NraWxsXHJcbiAgICAgICAgcGVyZm9ybV9za2lsbChpbmRleCwgY2VsbClcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJlc29sdmluZyBvbl9jbGljayBlbXB0eVwiKVxyXG4gICAgfVxyXG5cclxuXHR9IGVsc2UgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID4gMCkgeyAvLyBjaGFyYWN0ZXIgY2xpY2tlZFxyXG4gICAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2Vzcykge1xyXG4gICAgICBjYXNlIDA6IC8vIG5vdGhpbmdcclxuICAgICAgICBzZWxlY3RfY2hhcmFjdGVyKGluZGV4LCBjZWxsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxOiAvLyBtb3ZlXHJcbiAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOiAvL2F0dGFja1xyXG4gICAgICAgIHBlcmZvcm1fYXR0YWNrKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6IC8vc2tpbGxcclxuICAgICAgICBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVzb2x2aW5nIG9uX2NsaWNrIGNoYXJhY3RlclwiKVxyXG4gICAgfVxyXG5cclxuXHR9IGVsc2UgeyAvLyBvYnN0YWNsZSBjbGlja2VkXHJcblxyXG4gICAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2Vzcykge1xyXG4gICAgICBjYXNlIDA6IC8vIG5vdGhpbmdcclxuICAgICAgICBzZWxlY3Rfb2JzdGFjbGUoaW5kZXgsIGNlbGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6IC8vIG1vdmVcclxuICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6IC8vYXR0YWNrXHJcbiAgICAgICAgc3RvcF9hdHRhY2soKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6IC8vc2tpbGxcclxuICAgICAgICBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVzb2x2aW5nIG9uX2NsaWNrIG9ic3RhY2xlXCIpXHJcbiAgICB9XHJcblxyXG5cdH1cclxufVxyXG5cclxuLy8gWm9uZS9mb2cgcmVsYXRlZCBzdGFmZlxyXG5cclxuZnVuY3Rpb24gZW5kcG9pbnRfYXNzaWduX3pvbmUoZW5kcG9pbnQxLCBlbmRwb2ludDIpIHtcclxuICB2YXIgem9uZV9udW1iZXIgPSB6b25lX251bWJlcl9zZWxlY3QudmFsKCk7XHJcbiAgdmFyIG1vZGlmaWNhdG9yID0gc2VhcmNoX21vZGlmaWNhdG9yLnZhbCgpO1xyXG4gIHZhciBzaXplID0gZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciBpbmRleF9saXN0ID0gW11cclxuXHJcbiAgdmFyIGNvb3JkMSA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgY29vcmQyID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG5cclxuICB2YXIgdG9wX2xlZnQgPSB0b3BfbGVmdF9jb29yZChjb29yZDEsIGNvb3JkMilcclxuICB2YXIgYm90dG9tX3JpZ2h0ID0gYm90dG9tX3JpZ2h0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKVxyXG5cclxuICBmb3IgKGxldCBpID0gdG9wX2xlZnQueDsgaSA8PSBib3R0b21fcmlnaHQueDsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gdG9wX2xlZnQueTsgaiA8PSBib3R0b21fcmlnaHQueTsgaisrKSB7XHJcbiAgICAgIHZhciBjb29yZCA9IHt9XHJcbiAgICAgIGNvb3JkLnggPSBpXHJcbiAgICAgIGNvb3JkLnkgPSBqXHJcbiAgICAgIHZhciBpbmRleCA9IGNvb3JkX3RvX2luZGV4KGNvb3JkLCBzaXplKVxyXG5cclxuICAgICAgaW5kZXhfbGlzdC5wdXNoKGluZGV4KVxyXG4gICAgICB2YXIgem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3pvbmVfdGV4dF8nICsgaW5kZXgpO1xyXG4gICAgICB6b25lX3RleHQuaW5uZXJIVE1MID0gem9uZV9udW1iZXIgKyAnKCcgKyBtb2RpZmljYXRvciArICcpJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhc3NpZ25fem9uZSc7XHJcbiAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgdG9TZW5kLmluZGV4X2xpc3QgPSBpbmRleF9saXN0O1xyXG4gIHRvU2VuZC5tb2RpZmljYXRvciA9IG1vZGlmaWNhdG9yO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzc2lnblpvbmUoaW5kZXgpIHtcclxuICB2YXIgem9uZV9udW1iZXIgPSB6b25lX251bWJlcl9zZWxlY3QudmFsKCk7XHJcbiAgdmFyIG1vZGlmaWNhdG9yID0gc2VhcmNoX21vZGlmaWNhdG9yLnZhbCgpO1xyXG5cclxuICB2YXIgem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3pvbmVfdGV4dF8nICsgaW5kZXgpO1xyXG4gIHpvbmVfdGV4dC5pbm5lckhUTUwgPSB6b25lX251bWJlciArICcoJyArIG1vZGlmaWNhdG9yICsgJyknO1xyXG5cclxuICB2YXIgaW5kZXhfbGlzdCA9IFtdXHJcbiAgaW5kZXhfbGlzdC5wdXNoKGluZGV4KVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnYXNzaWduX3pvbmUnO1xyXG4gIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gIHRvU2VuZC5pbmRleF9saXN0ID0gaW5kZXhfbGlzdDtcclxuICB0b1NlbmQubW9kaWZpY2F0b3IgPSBtb2RpZmljYXRvcjtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseUZvZyhpbmRleCwgY2VsbCkge1xyXG5cdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPT0gMSkge1xyXG5cdFx0Ly8gc2VuZCB1cGRhdGUgbWVzc2FnZVxyXG5cdFx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdFx0dG9TZW5kLmNvbW1hbmQgPSAndXBkYXRlX2ZvZyc7XHJcblx0XHR0b1NlbmQudXBkYXRlX3R5cGUgPSAncmVtb3ZlJztcclxuXHRcdHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuXHRcdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQvLyBzZW5kIHVwZGF0ZSBtZXNzYWdlXHJcblx0XHR2YXIgdG9TZW5kID0ge307XHJcblx0XHR0b1NlbmQuY29tbWFuZCA9ICd1cGRhdGVfZm9nJztcclxuXHRcdHRvU2VuZC51cGRhdGVfdHlwZSA9ICdhZGQnO1xyXG5cdFx0dG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG5cdFx0c29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dNb2RlQ2hhbmdlKCkge1xyXG4gIGlmIChnbV9jb250cm9sX21vZCAhPSAxKSB7XHJcbiAgICAvLyB0dXJuIG9uIGZvZyBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAxO1xyXG4gICAgZm9nX2J1dHRvbi50ZXh0KCfQktGL0LrQuyDQotGD0LzQsNC9INCS0L7QudC90YsnKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpXSA9PSAxKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfY2VsbC5zcmMgPSBGT0dfSU1BR0U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gdHVybiBvZmYgZm9nIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDA7XHJcbiAgICBmb2dfYnV0dG9uLnRleHQoJ9CS0LrQuyDQotGD0LzQsNC9INCS0L7QudC90YsnKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpXSA9PSAxKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfY2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHpvbmVNb2RlQ2hhbmdlKCkge1xyXG4gIGlmIChnbV9jb250cm9sX21vZCAhPSAyKSB7XHJcbiAgICAvLyB0dXJuIG9uIHpvbmUgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMjtcclxuICAgIHpvbmVfYnV0dG9uLnRleHQoJ9CS0YvQutC7INCX0L7QvdCw0LvRjNC90YvQuSDRgNC10LbQuNC8Jyk7XHJcbiAgICB6b25lX251bWJlcl9zZWxlY3Quc2hvdygpO1xyXG4gICAgZm9nX3pvbmVfYnV0dG9uLnNob3coKTtcclxuICAgIHVuZm9nX3pvbmVfYnV0dG9uLnNob3coKTtcclxuICAgIHNlYXJjaF9tb2RpZmljYXRvci5zaG93KCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpXSA+IDApIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF96b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmVfdGV4dF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfem9uZV90ZXh0LmlubmVySFRNTCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpXSArICcoJyArIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2ldICsgJyknO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIGJhY2sgdG8gbm9ybWFsIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMDtcclxuICAgIHpvbmVfYnV0dG9uLnRleHQoJ9CS0LrQuyDQl9C+0L3QsNC70YzQvdGL0Lkg0YDQtdC20LjQvCcpO1xyXG4gICAgem9uZV9udW1iZXJfc2VsZWN0LmhpZGUoKTtcclxuICAgIGZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcbiAgICB1bmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcbiAgICBzZWFyY2hfbW9kaWZpY2F0b3IuaGlkZSgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25lX3RleHRfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X3pvbmVfdGV4dC5pbm5lckhUTUwgPSAnJztcclxuXHRcdH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ0N1cnJlbnRab25lKCkge1xyXG4gIHZhciBjdXJyZW50X3pvbmUgPSB6b25lX251bWJlcl9zZWxlY3QudmFsKCk7XHJcbiAgZm9nUGFyc2Vab25lKDEsIGN1cnJlbnRfem9uZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuZm9nQ3VycmVudFpvbmUoKSB7XHJcbiAgZm9nUGFyc2Vab25lKDAsIGN1cnJlbnRfem9uZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ1BhcnNlWm9uZShtb2QsIGN1cnJlbnRfem9uZSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICd1cGRhdGVfZm9nJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIGlmIChtb2QgPT0gMCkge1xyXG4gICAgdG9TZW5kLnVwZGF0ZV90eXBlID0gJ3JlbW92ZSc7XHJcbiAgfSBlbHNlIGlmIChtb2QgPT0gMSkge1xyXG4gICAgdG9TZW5kLnVwZGF0ZV90eXBlID0gJ2FkZCc7XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplICogZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIGlmIChnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaV0gPT0gY3VycmVudF96b25lKSB7XHJcbiAgICAgIHRvU2VuZC5pbmRleCA9IGk7XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gSGVscGVyIGNvb3JkaW5hdGUgcmVsYXRlZCBmdW5jdGlvbnNcclxuXHJcbmZ1bmN0aW9uIHRvcF9sZWZ0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKSB7XHJcbiAgdmFyIHRvUmV0ID0ge31cclxuICB0b1JldC54ID0gTWF0aC5taW4oY29vcmQxLngsIGNvb3JkMi54KVxyXG4gIHRvUmV0LnkgPSBNYXRoLm1pbihjb29yZDEueSwgY29vcmQyLnkpXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJvdHRvbV9yaWdodF9jb29yZChjb29yZDEsIGNvb3JkMikge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGgubWF4KGNvb3JkMS54LCBjb29yZDIueClcclxuICB0b1JldC55ID0gTWF0aC5tYXgoY29vcmQxLnksIGNvb3JkMi55KVxyXG4gIHJldHVybiB0b1JldFxyXG59XHJcblxyXG5mdW5jdGlvbiBjb29yZF90b19pbmRleChjb29yZCwgc2l6ZSkge1xyXG4gIHZhciBpbmRleCA9IGNvb3JkLnggKiBzaXplICsgY29vcmQueVxyXG4gIHJldHVybiBpbmRleFxyXG59XHJcblxyXG5mdW5jdGlvbiBpbmRleF90b19jb29yZGluYXRlcyhpbmRleCwgc2l6ZSkge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGguZmxvb3IoaW5kZXgvc2l6ZSlcclxuICB0b1JldC55ID0gaW5kZXggJSBzaXplXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmREaXN0YW5jZShpbmRleDEsIGluZGV4Mikge1xyXG4gIHZhciB4MSA9IE1hdGguZmxvb3IoaW5kZXgxL2dhbWVfc3RhdGUuc2l6ZSlcclxuICB2YXIgeTEgPSBpbmRleDEgJSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIHgyID0gTWF0aC5mbG9vcihpbmRleDIvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MiA9IGluZGV4MiAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgZGlzdGFuY2Vfc3F1YXJlZCA9ICh4MS14MikqKHgxLXgyKSArICh5MS15MikqKHkxLXkyKVxyXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChkaXN0YW5jZV9zcXVhcmVkKVxyXG4gIHJldHVybiBwYXJzZUZsb2F0KGRpc3RhbmNlKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0luUmFuZ2UoaW5kZXgxLCBpbmRleDIsIHJhbmdlKSB7XHJcbiAgdmFyIHgxID0gTWF0aC5mbG9vcihpbmRleDEvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MSA9IGluZGV4MSAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgeDIgPSBNYXRoLmZsb29yKGluZGV4Mi9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkyID0gaW5kZXgyICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciBkaXN0YW5jZSA9ICh4MS14MikqKHgxLXgyKSArICh5MS15MikqKHkxLXkyKVxyXG4gIHJldHVybiBkaXN0YW5jZSA8PSByYW5nZSpyYW5nZVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhbmdlKSB7XHJcbiAgdmFyIHNpemUgPSBnYW1lX3N0YXRlLnNpemVcclxuICB2YXIgeCA9IE1hdGguZmxvb3IoaW5kZXgvc2l6ZSlcclxuICB2YXIgeSA9IGluZGV4ICUgc2l6ZVxyXG4gIHZhciBjYW5kaWRhdGVfaW5kZXhfbGlzdCA9IFtdXHJcblxyXG4gIC8vY29uc29sZS5sb2coXCJ4OiBcIiArIHggKyBcIiB5OiBcIiArIHkgKyBcIiBpbmRleDogXCIgKyBpbmRleClcclxuXHJcbiAgZm9yIChsZXQgaSA9IE1hdGguZmxvb3IoLTEgKiByYW5nZSk7IGkgPD0gTWF0aC5jZWlsKHJhbmdlKTsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gTWF0aC5mbG9vcigtMSAqIHJhbmdlKTsgaiA8PSBNYXRoLmNlaWwocmFuZ2UpOyBqKyspIHtcclxuICAgICAgdmFyIGNhbmRfeCA9IHggKyBpXHJcbiAgICAgIHZhciBjYW5kX3kgPSB5ICsgalxyXG4gICAgICAvL2NvbnNvbGUubG9nKFwiY2FuZF94OiBcIiArIGNhbmRfeCArIFwiIGNhbmRfeTogXCIgKyBjYW5kX3kpXHJcbiAgICAgIGlmIChjYW5kX3ggPj0wICYmIGNhbmRfeCA8IHNpemUgJiYgY2FuZF95ID49MCAmJiBjYW5kX3kgPCBzaXplKSB7XHJcbiAgICAgICAgdmFyIGNhbmRfaW5kZXggPSBjYW5kX3gqc2l6ZSArIGNhbmRfeVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJjYW5kX2luZGV4OiBcIiArIGNhbmRfaW5kZXgpXHJcbiAgICAgICAgaWYgKGlzSW5SYW5nZShpbmRleCwgY2FuZF9pbmRleCwgcmFuZ2UpKSB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FuZF9pbmRleDogXCIgKyBjYW5kX2luZGV4ICsgXCJ3YXMgY29uc2lkZXJlZCBpbiByYW5nZVwiKVxyXG4gICAgICAgICAgY2FuZGlkYXRlX2luZGV4X2xpc3QucHVzaChjYW5kX2luZGV4KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY2FuZGlkYXRlX2luZGV4X2xpc3RcclxufVxyXG5cclxuZnVuY3Rpb24gbGluZV9mcm9tX2VuZHBvaW50cyhwb2ludDEsIHBvaW50Mikge1xyXG4gIHZhciBsaW5lID0ge31cclxuICBsaW5lLmEgPSAtMSoocG9pbnQxLnkgLSBwb2ludDIueSlcclxuICBsaW5lLmIgPSBwb2ludDEueCAtIHBvaW50Mi54XHJcbiAgbGluZS5jID0gLTEqKGxpbmUuYSAqIHBvaW50Mi54ICsgbGluZS5iICogcG9pbnQyLnkpXHJcbiAgcmV0dXJuIGxpbmVcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzdGFuY2VfdG9fbGluZShlbmRwb2ludDEsIGVuZHBvaW50Miwgc2l6ZSwgdGVzdHBvaW50KSB7XHJcbiAgdmFyIGVuZHBvaW50MV9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgZW5kcG9pbnQyX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG4gIHZhciB0ZXN0cG9pbnRfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyh0ZXN0cG9pbnQsIHNpemUpXHJcblxyXG4gIHZhciBsaW5lID0gbGluZV9mcm9tX2VuZHBvaW50cyhlbmRwb2ludDFfY29vcmQsIGVuZHBvaW50Ml9jb29yZClcclxuICBjb25zb2xlLmxvZyhsaW5lKVxyXG4gIGNvbnNvbGUubG9nKHRlc3Rwb2ludF9jb29yZClcclxuXHJcbiAgdmFyIGRpc3RhbmNlID0gTWF0aC5hYnMobGluZS5hKnRlc3Rwb2ludF9jb29yZC54ICsgbGluZS5iKnRlc3Rwb2ludF9jb29yZC55ICsgbGluZS5jKS9NYXRoLnNxcnQobGluZS5hKmxpbmUuYSArIGxpbmUuYipsaW5lLmIpXHJcblxyXG4gIGNvbnNvbGUubG9nKGRpc3RhbmNlKVxyXG4gIHJldHVybiBkaXN0YW5jZVxyXG59XHJcblxyXG5mdW5jdGlvbiBjZWxsc19vbl9saW5lKGVuZHBvaW50MSwgZW5kcG9pbnQyLCBzaXplKSB7XHJcbiAgdmFyIGVuZHBvaW50MV9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgZW5kcG9pbnQyX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG4gIHZhciBsaW5lID0gbGluZV9mcm9tX2VuZHBvaW50cyhlbmRwb2ludDFfY29vcmQsIGVuZHBvaW50Ml9jb29yZClcclxuXHJcbiAgdmFyIHNjYWxlID0gTWF0aC5tYXgoTWF0aC5hYnMobGluZS5hKSwgTWF0aC5hYnMobGluZS5iKSlcclxuICAvLyBuZWVkIHRvIGJlIHJldmVyc2VkISByZW1lbWJlciBsaW5lLmEgPSBkZWx0YSB5XHJcbiAgdmFyIHhfc3RlcCA9IGxpbmUuYi9zY2FsZVxyXG4gIHZhciB5X3N0ZXAgPSAtMSpsaW5lLmEvc2NhbGVcclxuICB2YXIgY3VycmVudF9wb2ludCA9IGVuZHBvaW50Ml9jb29yZFxyXG5cclxuICB2YXIgc2FmZXR5X2l0ZXIgPSAwXHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IFtdXHJcbiAgd2hpbGUgKE1hdGguYWJzKGN1cnJlbnRfcG9pbnQueCAtIGVuZHBvaW50MV9jb29yZC54KSA+IDAuNSB8fCBNYXRoLmFicyhjdXJyZW50X3BvaW50LnkgLSBlbmRwb2ludDFfY29vcmQueSkgPiAwLjUpIHtcclxuICAgIHZhciBjZWlsID0ge31cclxuICAgIGNlaWwueCA9IE1hdGguY2VpbChjdXJyZW50X3BvaW50LngpXHJcbiAgICBjZWlsLnkgPSBNYXRoLmNlaWwoY3VycmVudF9wb2ludC55KVxyXG4gICAgdmFyIGNlaWxfaW5kZXggPSBjb29yZF90b19pbmRleChjZWlsLCBzaXplKVxyXG5cclxuICAgIHZhciBmbG9vciA9IHt9XHJcbiAgICBmbG9vci54ID0gTWF0aC5mbG9vcihjdXJyZW50X3BvaW50LngpXHJcbiAgICBmbG9vci55ID0gTWF0aC5mbG9vcihjdXJyZW50X3BvaW50LnkpXHJcbiAgICB2YXIgZmxvb3JfaW5kZXggPSBjb29yZF90b19pbmRleChmbG9vciwgc2l6ZSlcclxuXHJcblxyXG4gICAgY2FuZGlkYXRlX2NlbGxzLnB1c2goY2VpbF9pbmRleClcclxuICAgIGlmIChjZWlsX2luZGV4ICE9IGZsb29yX2luZGV4KSB7XHJcbiAgICAgIGNhbmRpZGF0ZV9jZWxscy5wdXNoKGZsb29yX2luZGV4KVxyXG4gICAgfVxyXG5cclxuICAgIGN1cnJlbnRfcG9pbnQueCA9IGN1cnJlbnRfcG9pbnQueCAgKyB4X3N0ZXBcclxuICAgIGN1cnJlbnRfcG9pbnQueSA9IGN1cnJlbnRfcG9pbnQueSAgKyB5X3N0ZXBcclxuICAgIHNhZmV0eV9pdGVyID0gc2FmZXR5X2l0ZXIgKyAxXHJcbiAgICBpZiAoc2FmZXR5X2l0ZXIgPiA1MCkge1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKGNhbmRpZGF0ZV9jZWxscylcclxuICByZXR1cm4gY2FuZGlkYXRlX2NlbGxzXHJcbn1cclxuXHJcbi8vIGFuaW1hdGlvbnMsIGNvbnRhaW5lciBtYWludGFuY2VcclxuXHJcbmZ1bmN0aW9uIGNsZWFyX2NvbnRhaW5lcnMoKSB7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICB3ZWFwb25faW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0aW55X2FuaW1hdGVfY29udGFpbmVycygpIHtcclxuICB0aW55X2FuaW1hdGlvbihjaGFyYWN0ZXJfaW5mb19jb250YWluZXIpO1xyXG4gIHRpbnlfYW5pbWF0aW9uKHdlYXBvbl9pbmZvX2NvbnRhaW5lcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcikge1xyXG4gIGNvbnRhaW5lci5hZGRDbGFzcyhUSU5ZX0VGRkVDVF9DTEFTUyk7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcyhUSU5ZX0VGRkVDVF9DTEFTUyk7XHJcbiAgfSwgNTApO1xyXG59XHJcblxyXG4vLyBhZGRpbmcgb2JqZWN0cywgY2hhcmFjdGVyc1xyXG5cclxuZnVuY3Rpb24gYWRkX29iamVjdChib2FyZF9pbmRleCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgYnV0dG9uX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgYnV0dG9uX2NvbnRhaW5lci5jbGFzc05hbWUgPSBcImFkZC1vYmplY3QtYnV0dG9uLWNvbnRhaW5lclwiO1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9jaGFyYWN0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbl9hZGRfY2hhcmFjdGVyLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9C10YDRgdC+0L3QsNC20LBcIjtcclxuICBidXR0b25fYWRkX2NoYXJhY3Rlci5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9vYnN0YWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uX2FkZF9vYnN0YWNsZS5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0Ywg0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVwiO1xyXG4gIGJ1dHRvbl9hZGRfb2JzdGFjbGUub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgYWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfY2hhcmFjdGVyKTtcclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfb2JzdGFjbGUpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uX2NvbnRhaW5lcik7XHJcblxyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIG9ic3RhY2xlX251bWJlcikge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhZGRfb2JzdGFjbGUnO1xyXG4gIHRvU2VuZC5jZWxsX2lkID0gaW5kZXg7XHJcbiAgdG9TZW5kLm9ic3RhY2xlX251bWJlciA9IG9ic3RhY2xlX251bWJlciArIDE7XHJcbiAgdG9TZW5kLm9ic3RhY2xlX25hbWUgPSBvYnN0YWNsZV9saXN0W29ic3RhY2xlX251bWJlcl07XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNlbGVjdC5pZCA9IFwib2JzdGFjbGVfY2hvc2VuXCI7XHJcbiAgc2VsZWN0LmNsYXNzTmFtZSA9IFwib2JqZWN0X3NlbGVjdFwiXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgb2JzdGFjbGVfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IG9ic3RhY2xlX2xpc3RbaV07XHJcbiAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG4gIGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG4gIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcbiAgICB2YXIgb2JzdGFjbGVfbnVtYmVyID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvYnN0YWNsZV9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuICAgIGFkZF9vYnN0YWNsZV9jb21tYW5kKGJ1dHRvbi5ib2FyZF9pbmRleCwgb2JzdGFjbGVfbnVtYmVyKVxyXG5cclxuICAgIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gIH1cclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzZWxlY3QpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uKTtcclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNlbGVjdC5pZCA9IFwiY2hhcmFjdGVyX2Nob3NlblwiO1xyXG4gIHNlbGVjdC5jbGFzc05hbWUgPSBcIm9iamVjdF9zZWxlY3RcIlxyXG5cclxuICB2YXIgcGxheWVyc19vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBwbGF5ZXJzX29wdGdyb3VwLmlkID0gXCJwbGF5ZXJzX29wdGdyb3VwXCJcclxuICBwbGF5ZXJzX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBwbGF5ZXJzX29wdGdyb3VwLmxhYmVsID0gXCLQmNCz0YDQvtC60LhcIlxyXG5cclxuICB2YXIgcGVuZ3Vpbl9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBwZW5ndWluX29wdGdyb3VwLmlkID0gXCJwZW5ndWluX29wdGdyb3VwXCJcclxuICBwZW5ndWluX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBwZW5ndWluX29wdGdyb3VwLmxhYmVsID0gXCLQn9C40L3Qs9Cy0LjQvdGLXCJcclxuXHJcbiAgdmFyIHNoaWVsZF9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBzaGllbGRfb3B0Z3JvdXAuaWQgPSBcInNoaWVsZF9vcHRncm91cFwiXHJcbiAgc2hpZWxkX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBzaGllbGRfb3B0Z3JvdXAubGFiZWwgPSBcItCh0LrQstCw0LTQvtCy0YbRi1wiXHJcblxyXG4gIHZhciBzd29yZF9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBzd29yZF9vcHRncm91cC5pZCA9IFwic3dvcmRfb3B0Z3JvdXBcIlxyXG4gIHN3b3JkX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBzd29yZF9vcHRncm91cC5sYWJlbCA9IFwi0JzQtdGH0LhcIlxyXG5cclxuICB2YXIgbXV0YW50X29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIG11dGFudF9vcHRncm91cC5pZCA9IFwibXV0YW50X29wdGdyb3VwXCJcclxuICBtdXRhbnRfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIG11dGFudF9vcHRncm91cC5sYWJlbCA9IFwi0JzRg9GC0LDQvdGC0YtcIlxyXG5cclxuICB2YXIgYW5pbWFfb3B0Z3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0Z3JvdXBcIik7XHJcbiAgYW5pbWFfb3B0Z3JvdXAuaWQgPSBcImFuaW1hX29wdGdyb3VwXCJcclxuICBhbmltYV9vcHRncm91cC5jbGFzc05hbWUgPSBcImNoYXJhY3Rlcl9vcHRncm91cFwiXHJcbiAgYW5pbWFfb3B0Z3JvdXAubGFiZWwgPSBcItCX0LLQtdGA0LhcIlxyXG5cclxuICB2YXIgb3RoZXJfb3B0Z3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0Z3JvdXBcIik7XHJcbiAgb3RoZXJfb3B0Z3JvdXAuaWQgPSBcIm90aGVyX29wdGdyb3VwXCJcclxuICBvdGhlcl9vcHRncm91cC5jbGFzc05hbWUgPSBcImNoYXJhY3Rlcl9vcHRncm91cFwiXHJcbiAgb3RoZXJfb3B0Z3JvdXAubGFiZWwgPSBcItCe0YHRgtCw0LvRjNC90YvQtVwiXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBjaGFyYWN0ZXJfbGlzdFtpXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaTtcclxuICAgIHZhciBjaGFyYWN0ZXJfZ3JvdXAgPSBncm91cF9saXN0W2ldXHJcbiAgICBzd2l0Y2goY2hhcmFjdGVyX2dyb3VwKSB7XHJcbiAgICAgIGNhc2UgXCJwbGF5ZXJcIjpcclxuICAgICAgICBwbGF5ZXJzX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInBlbmd1aW5cIjpcclxuICAgICAgICBwZW5ndWluX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNoaWVsZFwiOlxyXG4gICAgICAgIHNoaWVsZF9vcHRncm91cC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJzd29yZFwiOlxyXG4gICAgICAgIHN3b3JkX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIm11dGFudFwiOlxyXG4gICAgICAgIG11dGFudF9vcHRncm91cC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJhbmltYVwiOlxyXG4gICAgICAgIGFuaW1hX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBvdGhlcl9vcHRncm91cC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbi5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0YxcIjtcclxuICBidXR0b24uYm9hcmRfaW5kZXggPSBib2FyZF9pbmRleDtcclxuICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlcl9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9jaGFyYWN0ZXInO1xyXG4gICAgdG9TZW5kLmNlbGxfaWQgPSBidXR0b24uYm9hcmRfaW5kZXg7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXIgKyAxO1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gY2hhcmFjdGVyX2xpc3RbY2hhcmFjdGVyX251bWJlcl07XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgY2xlYXJfY29udGFpbmVycygwKVxyXG4gIH1cclxuXHJcbiAgc2VsZWN0LmFwcGVuZChwbGF5ZXJzX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKHNoaWVsZF9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChzd29yZF9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChtdXRhbnRfb3B0Z3JvdXApO1xyXG4gIHNlbGVjdC5hcHBlbmQoYW5pbWFfb3B0Z3JvdXApO1xyXG4gIHNlbGVjdC5hcHBlbmQocGVuZ3Vpbl9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChvdGhlcl9vcHRncm91cCk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzZWxlY3QpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uKTtcclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG4vLyBQaWN0dXJlL2F2YXRhciBtYW5hZ2VtZW50XHJcblxyXG5mdW5jdGlvbiBmb2dPclBpYyhjZWxsX2lkKSB7XHJcbiAgdmFyIHBpY3R1cmVfbmFtZSA9IEZPR19JTUFHRTtcclxuICBpZiAoKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2NlbGxfaWRdICE9IDEpfHwobXlfcm9sZSA9PSAnZ20nKSkge1xyXG4gICAgdmFyIGNoYXJfaWQgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NlbGxfaWRdXHJcbiAgICBwaWN0dXJlX25hbWUgPSBnZXRfb2JqZWN0X3BpY3R1cmUoY2hhcl9pZCk7XHJcbiAgICBpZiAoY2hhcl9pZCA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyX2lkXSAhPSBcImFsbFwiICYmIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcl9pZF0gIT0gbXlfbmFtZSkge1xyXG4gICAgICBwaWN0dXJlX25hbWUgPSBnZXRfb2JqZWN0X3BpY3R1cmUoMCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuICByZXR1cm4gcGljdHVyZV9uYW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5Rm9nKCkge1xyXG5cdGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuXHR2YXIgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIGluZm8uaW5uZXJIVE1MID0gJ9Cc0Ysg0L3QtSDQt9C90LDQtdC8LCDRh9GC0L4g0Y3RgtC+INGC0LDQutC+0LUuINCV0YHQu9C4INCx0Ysg0LzRiyDQt9C90LDQu9C4INGH0YLQviDRjdGC0L4g0YLQsNC60L7QtSwg0L3QviDQvNGLINC90LUg0LfQvdCw0LXQvC4nO1xyXG5cclxuXHR2YXIgZm9nX3BpY3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIGZvZ19waWN0dXJlLnNyYyA9IFFVRVNUSU9OX0lNQUdFO1xyXG4gIGZvZ19waWN0dXJlLnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBmb2dfcGljdHVyZS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuXHRjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGluZm8pO1xyXG5cdGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoZm9nX3BpY3R1cmUpO1xyXG5cclxudGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfb2JqZWN0X3BpY3R1cmUoaW5kZXhfaW5fYm9hcmRfc3RhdGUpIHtcclxuICB2YXIgaW1hZ2UgPSBFTVBUWV9DRUxMX1BJQztcclxuICB2YXIgaW5kZXhfaW5fYmFzZTtcclxuICBpZiAoaW5kZXhfaW5fYm9hcmRfc3RhdGUgPiAwKSB7XHJcbiAgICBpbmRleF9pbl9iYXNlID0gaW5kZXhfaW5fYm9hcmRfc3RhdGU7XHJcbiAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baW5kZXhfaW5fYmFzZV07XHJcbiAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwiY2hpYmlfYXZhdGFyXCIpKSB7XHJcbiAgICAgIGltYWdlID0gY2hhcmFjdGVyLmNoaWJpX2F2YXRhcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGltYWdlID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGluZGV4X2luX2JvYXJkX3N0YXRlIDwgMCkge1xyXG4gICAgaW5kZXhfaW5fYmFzZSA9IGluZGV4X2luX2JvYXJkX3N0YXRlICogKC0xKTtcclxuICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9baW5kZXhfaW5fYmFzZV07XHJcbiAgICBpbWFnZSA9IG9ic3RhY2xlLmF2YXRhcjtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbWFnZTtcclxufVxyXG5cclxuLy8gTW92ZSAtIERlbGV0ZSAtIFNlbGVjdFxyXG5cclxuZnVuY3Rpb24gbW92ZV9jaGFyYWN0ZXIodG9faW5kZXgsIHRvX2NlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwOyAvLyBlbmQgdGhlIG1vdGlvblxyXG4gIHZhciBjaG9zZW5faW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgZGlzdGFuY2UgPSBmaW5kRGlzdGFuY2UodG9faW5kZXgsIGNob3Nlbl9pbmRleClcclxuICB2YXIgbWF4X2Rpc3RhbmNlID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdXHJcblxyXG4gIGlmIChkaXN0YW5jZSA8PSBtYXhfZGlzdGFuY2UpIHtcclxuICAgIGlmICghKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxICYmIGRpc3RhbmNlID4gMS42KSkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ21vdmVfY2hhcmFjdGVyJztcclxuICAgICAgdG9TZW5kLmZyb21faW5kZXggPSBjaG9zZW5faW5kZXg7XHJcbiAgICAgIHRvU2VuZC50b19pbmRleCA9IHRvX2luZGV4O1xyXG4gICAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXg7XHJcbiAgICAgIHRvU2VuZC5jaGFyYWN0ZXJfYXZhdGFyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uYXZhdGFyO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQuZGlzdGFuY2UgPSBkaXN0YW5jZVxyXG4gICAgICB0b1NlbmQubGVmdF9zaGllbGQgPSAwXHJcbiAgICAgIHRvU2VuZC5taW5lc19leHBsb2RlZCA9IFtdXHJcbiAgICAgIHRvU2VuZC5taW5lc19kYW1hZ2UgPSAwXHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcImZvcmNlX2ZpZWxkX3RhcmdldFwiKSkge1xyXG4gICAgICAgIHZhciBzaGllbGRfaW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmZvcmNlX2ZpZWxkX3RhcmdldC5zaGllbGRfaW5kZXhcclxuICAgICAgICBpZighZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5jZWxsc19wcm90ZWN0ZWQuaW5jbHVkZXModG9faW5kZXgpKSB7Ly8g0L/QvtC60LjQvdGD0Lsg0LfQvtC90YMg0LfQsNGJ0LjRgtGLXHJcbiAgICAgICAgICB0b1NlbmQubGVmdF9zaGllbGQgPSAxXHJcbiAgICAgICAgICB0b1NlbmQuc2hpZWxkX2luZGV4ID0gc2hpZWxkX2luZGV4XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkID0gW107XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdICE9IFwiYWxsXCIpIHsvL3VzZXIgaXMgaW52aXNpYmxlXHJcbiAgICAgICAgdmFyIGltbWVkaWF0ZV9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIDEpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1tZWRpYXRlX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSAhPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4KSB7Ly8gdGhlcmUgYXJlIGNoYXJhY3RlcnMgdGhlcmVcclxuICAgICAgICAgICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkLnB1c2goY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgIHZhciBleHRlbmRlZF9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIGludmlzaWJpbGl0eV9kZXRlY3Rpb25fcmFkaXVzKTtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXh0ZW5kZWRfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dICE9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgpIHsvLyB0aGVyZSBhcmUgY2hhcmFjdGVycyB0aGVyZVxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfY2hhcl9udW0gPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV07XHJcbiAgICAgICAgICAgICAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjdXJyZW50X2NoYXJfbnVtXS5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvbGwgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkLnB1c2goY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXModG9faW5kZXgpKSB7XHJcbiAgICAgICAgdG9TZW5kLm1pbmVzX2V4cGxvZGVkLnB1c2godG9faW5kZXgpXHJcbiAgICAgICAgdG9TZW5kLm1pbmVzX2RhbWFnZSA9IHRvU2VuZC5taW5lc19kYW1hZ2UgKyByb2xsX3gobWluZXNfMF9kaXN0YW5jZV9kYW1hZ2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgaW1tZWRpYXRlX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgMSk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1tZWRpYXRlX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gPiAwICYmIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCkgey8vIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIHRoZXJlXHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2dhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV1dICE9IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMoaW1tZWRpYXRlX25iaFtpXSkgJiYgaW1tZWRpYXRlX25iaFtpXSAhPSB0b19pbmRleCkge1xyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZXhwbG9kZWQucHVzaChpbW1lZGlhdGVfbmJoW2ldKVxyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZGFtYWdlID0gdG9TZW5kLm1pbmVzX2RhbWFnZSArIHJvbGxfeChtaW5lc18xX2Rpc3RhbmNlX2RhbWFnZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBvbmVfYW5kX2hhbGZfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCAxLjYpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9uZV9hbmRfaGFsZl9uYmgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMob25lX2FuZF9oYWxmX25iaFtpXSkgJiYgKCFpbW1lZGlhdGVfbmJoLmluY2x1ZGVzKG9uZV9hbmRfaGFsZl9uYmhbaV0pKSkge1xyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZXhwbG9kZWQucHVzaChvbmVfYW5kX2hhbGZfbmJoW2ldKVxyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZGFtYWdlID0gdG9TZW5kLm1pbmVzX2RhbWFnZSArIHJvbGxfeChtaW5lc18xcDVfZGlzdGFuY2VfZGFtYWdlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGV4dGVuZGVkX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgaW52aXNpYmlsaXR5X2RldGVjdGlvbl9yYWRpdXMpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4dGVuZGVkX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dICE9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXggJiYgKCFpbW1lZGlhdGVfbmJoLmluY2x1ZGVzKGV4dGVuZGVkX25iaFtpXSkpKSB7Ly8gdGhlcmUgYXJlIGNoYXJhY3RlcnMgdGhlcmVcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRfY2hhcl9udW0gPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV07XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2N1cnJlbnRfY2hhcl9udW1dICE9IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICAgICAgICAgIGlmIChyb2xsID4gMTApIHtcclxuICAgICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChjdXJyZW50X2NoYXJfbnVtKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY2xlYXJfY29udGFpbmVycygpO1xyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgICAgIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IHRvX2luZGV4XHJcbiAgICAgIHZhciB0b19jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHRvX2luZGV4KTtcclxuICAgICAgY2hhcmFjdGVyX2Nob3Nlbi5jZWxsID0gdG9fY2VsbFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQkiDQsdC+0Y4g0L3Rg9C20L3QviDQtNCy0LjQs9Cw0YLRjNGB0Y8g0L/QvtGB0YLRg9C/0LDRgtC10LvRjNC90L4gKDEtMiDQutC70LXRgtC60LgpXCIpXHJcbiAgICAgIHVuZG9fc2VsZWN0aW9uKClcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQn9C+0LvQtdCz0YfQtSwg0LzRgdGM0LUg0JHQvtC70YJcIilcclxuICAgIHVuZG9fc2VsZWN0aW9uKClcclxuICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfY2hhcmFjdGVyKGluZGV4LCBjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2RlbGV0ZV9jaGFyYWN0ZXInO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZV93ZWFwb24oY2hhcmFjdGVyX251bWJlciwgd2VhcG9uX2luZGV4KSB7XHJcbiAgY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW2NoYXJhY3Rlcl9udW1iZXJdID0gd2VhcG9uX2luZGV4XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi53ZWFwb25faWQgPSB3ZWFwb25faW5kZXhcclxuXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW3dlYXBvbl9pbmRleF1cclxuXHJcbiAgdmFyIHdlYXBvbl9taW5pX2Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXBvbl9taW5pX2Rpc3BsYXlcIik7XHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5zcmMgPSB3ZWFwb24uYXZhdGFyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5X3dlYXBvbl9kZXRhaWxlZCh3ZWFwb25faW5kZXgsIGNvbnRhaW5lciwgc2hvd0ltYWdlKSB7XHJcbiAgdmFyIGRlZmF1bHRfd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bd2VhcG9uX2luZGV4XVxyXG5cclxuICB2YXIgd2VhcG9uX3JhbmdlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgd2VhcG9uX3JhbmdlX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9yYW5nZV9kaXNwbGF5XCI7XHJcbiAgd2VhcG9uX3JhbmdlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQlNCw0LvRjNC90L7RgdGC0Yw6IFwiICsgZGVmYXVsdF93ZWFwb24ucmFuZ2VcclxuXHJcbiAgdmFyIHdlYXBvbl9kYW1hZ2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9kYW1hZ2VfZGlzcGxheVwiO1xyXG4gIHdlYXBvbl9kYW1hZ2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCj0YDQvtC9OiBcIiArIGRlZmF1bHRfd2VhcG9uLmRhbWFnZVswXSArICdkJyArIGRlZmF1bHRfd2VhcG9uLmRhbWFnZVsxXVxyXG5cclxuICB2YXIgd2VhcG9uX25hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB3ZWFwb25fbmFtZV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fbmFtZV9kaXNwbGF5XCI7XHJcbiAgd2VhcG9uX25hbWVfZGlzcGxheS5pbm5lckhUTUwgPSBkZWZhdWx0X3dlYXBvbi5uYW1lXHJcblxyXG4gIGlmIChzaG93SW1hZ2UpIHtcclxuICAgIHZhciB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fYXZhdGFyX2Rpc3BsYXlcIlxyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LnNyYyA9IGRlZmF1bHRfd2VhcG9uLmF2YXRhcjtcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuICB9XHJcbiAgY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fbmFtZV9kaXNwbGF5KVxyXG4gIGlmIChzaG93SW1hZ2UpIHtcclxuICAgIGNvbnRhaW5lci5hcHBlbmQod2VhcG9uX2F2YXRhcl9kaXNwbGF5KVxyXG4gIH1cclxuICBjb250YWluZXIuYXBwZW5kKHdlYXBvbl9yYW5nZV9kaXNwbGF5KVxyXG4gIGNvbnRhaW5lci5hcHBlbmQod2VhcG9uX2RhbWFnZV9kaXNwbGF5KVxyXG4gIGNvbnRhaW5lci5zaG93KClcclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0X2NoYXJhY3RlcihpbmRleCwgY2VsbCkge1xyXG4gIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuXHJcblxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IFwiYWxsXCIgfHwgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSBteV9uYW1lKSB7XHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gaW5kZXhcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNlbGwgPSBjZWxsXHJcblxyXG4gIGxldCBuYW1lID0gY2hhcmFjdGVyLm5hbWU7XHJcbiAgbGV0IGF2YXRhciA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcblxyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgbmFtZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIG5hbWVfZGlzcGxheS5pbm5lckhUTUwgPSBuYW1lO1xyXG5cclxuICB2YXIgYXZhdGFyX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgdmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG4gIGF2YXRhcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYXZhdGFyX2Rpc3BsYXkpXHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQobmFtZV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGF2YXRhcl9jb250YWluZXIpO1xyXG5cclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIgfHwgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gMSkge1xyXG5cclxuICAgIGF2YXRhcl9kaXNwbGF5Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgc2hvd19tb2RhbChjaGFyYWN0ZXJfbnVtYmVyLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBhdmF0YXJfZGlzcGxheS5vbm1vdXNlZW50ZXIgPSBmdW5jdGlvbihldmVudCkge1xyXG5cclxuICAgICAgdmFyIG1haW5fYWN0aW9uID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIHZhciBib251c19hY3Rpb24gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIHZhciBtb3ZlX2FjdGlvbiA9IE1hdGguZmxvb3IoY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdKVxyXG5cclxuICAgICAgdmFyIG1haW5fYWN0aW9uX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgIG1haW5fYWN0aW9uX2Rpc3BsYXkuaWQgPSBcIm1haW5fYWN0aW9uX2Rpc3BsYXlcIjtcclxuICAgICAgbWFpbl9hY3Rpb25fZGlzcGxheS5pbm5lckhUTUwgPSBcItCe0YHQvdC+0LLQvdGL0YU6IFwiICsgbWFpbl9hY3Rpb25cclxuXHJcbiAgICAgIHZhciBib251c19hY3Rpb25fZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgYm9udXNfYWN0aW9uX2Rpc3BsYXkuaWQgPSBcImJvbnVzX2FjdGlvbl9kaXNwbGF5XCI7XHJcbiAgICAgIGJvbnVzX2FjdGlvbl9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JHQvtC90YPRgdC90YvRhTogXCIgKyBib251c19hY3Rpb25cclxuXHJcbiAgICAgIHZhciBtb3ZlX2FjdGlvbl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICBtb3ZlX2FjdGlvbl9kaXNwbGF5LmlkID0gXCJtb3ZlX2FjdGlvbl9kaXNwbGF5XCI7XHJcbiAgICAgIG1vdmVfYWN0aW9uX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQn9C10YDQtdC00LLQuNC20LXQvdC40LU6IFwiICsgbW92ZV9hY3Rpb25cclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdICE9IFwiYWxsXCIpIHsvLyDQsiDQuNC90LLQuNC30LVcclxuICAgICAgICB2YXIgaW52aXNlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gICAgICAgIGludmlzZV9kaXNwbGF5LnNyYyA9IElOVklTRV9JTUFHRTtcclxuICAgICAgICBpbnZpc2VfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XHJcbiAgICAgICAgaW52aXNlX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnNTBweCc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7Ly8gINCf0YDQuNGG0LXQu9C10L1cclxuICAgICAgICB2YXIgYWltX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gICAgICAgIGFpbV9kaXNwbGF5LnNyYyA9IEFJTV9JTUFHRTtcclxuICAgICAgICBhaW1fZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XHJcbiAgICAgICAgYWltX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnNTBweCc7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKG1haW5fYWN0aW9uX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYm9udXNfYWN0aW9uX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQobW92ZV9hY3Rpb25fZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChpbnZpc2VfZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChhaW1fZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLnNob3coKVxyXG4gICAgfVxyXG5cclxuICAgIGF2YXRhcl9kaXNwbGF5Lm9ubW91c2VsZWF2ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5oaWRlKClcclxuICAgIH1cclxuXHJcbiAgdmFyIHN0cmVuZ3RoX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgc3RyZW5ndGhfZGlzcGxheS5pbm5lckhUTUwgPSBcIkPQuNC70LA6IFwiICsgY2hhcmFjdGVyLnN0cmVuZ3RoO1xyXG5cclxuICB2YXIgc3RhbWluYV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHN0YW1pbmFfZGlzcGxheS5pbm5lckhUTUwgPSBcItCi0LXQu9C+0YHQu9C+0LbQtdC90LjQtTogXCIgKyBjaGFyYWN0ZXIuc3RhbWluYTtcclxuXHJcbiAgdmFyIGFnaWxpdHlfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBhZ2lsaXR5X2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQm9C+0LLQutC+0YHRgtGMOiBcIiArIGNoYXJhY3Rlci5hZ2lsaXR5O1xyXG5cclxuICB2YXIgaW50ZWxsaWdlbmNlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgaW50ZWxsaWdlbmNlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQmNC90YLQtdC70LvQtdC60YI6IFwiICsgY2hhcmFjdGVyLmludGVsbGlnZW5jZTtcclxuXHJcbiAgdmFyIEtEX3ZhbHVlID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1tjaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbY2hhcmFjdGVyX251bWJlcl0pXHJcbiAgdmFyIEtEX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgS0RfZGlzcGxheS5pbm5lckhUTUwgPSBcItCa0JQ6IFwiICsgS0RfdmFsdWU7XHJcblxyXG4gIHZhciBocF9wZXJjZW50ID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0pL3BhcnNlRmxvYXQoSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSlcclxuICBocF9wZXJjZW50ID0gTWF0aC5mbG9vcihocF9wZXJjZW50KjEwMClcclxuXHJcbiAgdmFyIEhQX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgSFBfZGlzcGxheS5pZCA9IFwiSFBfZGlzcGxheVwiO1xyXG4gIEhQX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQpdCfOiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSArIFwiIChcIiArIGhwX3BlcmNlbnQgKyBcIiUpXCI7XHJcblxyXG4gIHZhciB0aXJlZF9wZXJjZW50ID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSkvcGFyc2VGbG9hdChzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgdGlyZWRfcGVyY2VudCA9IE1hdGguZmxvb3IodGlyZWRfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciB0aXJlZF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaWQgPSBcInRpcmVkX2Rpc3BsYXlcIjtcclxuICB0aXJlZF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JLRi9C90L7RgdC70LjQstC+0YHRgtGMOiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2NoYXJhY3Rlcl9udW1iZXJdICsgXCIgKFwiICsgdGlyZWRfcGVyY2VudCArIFwiJSlcIjtcclxuXHJcbiAgdmFyIGluaXRpYXRpdmVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBpbml0aWF0aXZlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQmNC90LjRhtC40LDRgtC40LLQsDogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtjaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzdHJlbmd0aF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHN0YW1pbmFfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChhZ2lsaXR5X2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoaW50ZWxsaWdlbmNlX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoS0RfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChIUF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHRpcmVkX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoaW5pdGlhdGl2ZV9kaXNwbGF5KTtcclxuXHJcbiAgdmFyIG1vdmVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBtb3ZlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCf0LXRgNC10LzQtdGJ0LXQvdC40LVcIjtcclxuICBtb3ZlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIG1vdmVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG4gIG1vdmVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9waWNrZWQgPSBldmVudC50YXJnZXRcclxuICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjaGFyYWN0ZXJfcGlja2VkLmluZGV4XTtcclxuICAgIHZhciBtb3ZlX2FjdGlvbnNfbGVmdCA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgaWYgKG1vdmVfYWN0aW9uc19sZWZ0ID4gMCkge1xyXG4gICAgICBjbGVhcl9jb250YWluZXJzKClcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl90b19tb3ZlKGNoYXJhY3Rlcl9waWNrZWQuaW5kZXgsIGNoYXJhY3Rlcl9waWNrZWQuY2VsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCS0Ysg0L/QvtGC0YDQsNGC0LjQu9C4INCy0YHQtSDQv9C10YDQtdC80LXRidC10L3QuNGPINC90LAg0Y3RgtC+0Lwg0YXQvtC00YMhXCIpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuXHJcbiAgICB2YXIgZGVsZXRlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBkZWxldGVfYnV0dG9uLmlubmVySFRNTCA9IFwi0KPQvdC40YfRgtC+0LbQuNGC0YxcIjtcclxuICAgIGRlbGV0ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICAgIGRlbGV0ZV9idXR0b24uY2VsbCA9IGNlbGw7XHJcbiAgICBkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBkZWxldGVfY2hhcmFjdGVyKGluZGV4LCBjaGFyYWN0ZXJfbnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfYnV0dG9uLmlubmVySFRNTCA9IFwi0JjQt9C80LXQvdC40YLRjCDQstC40LTQuNC80L7RgdGC0YxcIjtcclxuICAgIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eShjaGFyYWN0ZXJfbnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGFtYWdlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBkYW1hZ2VfYnV0dG9uLmlubmVySFRNTCA9IFwi0J3QsNC90LXRgdGC0Lgg0YPRgNC+0L1cIjtcclxuICAgIGRhbWFnZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICAgIGRhbWFnZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbWFnZV9maWVsZFwiKTtcclxuICAgICAgaWYgKCEoZGFtYWdlX2ZpZWxkLnZhbHVlID09PSBcIlwiKSkge1xyXG4gICAgICAgIHZhciBkYW1hZ2UgPSBwYXJzZUludChkYW1hZ2VfZmllbGQudmFsdWUpO1xyXG4gICAgICAgIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJIUF9kaXNwbGF5XCIpO1xyXG4gICAgICAgIHZhciBuZXdfSFAgPSBjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gLSBkYW1hZ2U7XHJcbiAgICAgICAgSFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgbmV3X0hQO1xyXG5cclxuICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnZGVhbF9kYW1hZ2UnO1xyXG4gICAgICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gICAgdmFyIGRhbWFnZV9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGRhbWFnZV9maWVsZC5pZCA9IFwiZGFtYWdlX2ZpZWxkXCI7XHJcbiAgICBkYW1hZ2VfZmllbGQudHlwZSA9IFwibnVtYmVyXCI7XHJcbiAgICBkYW1hZ2VfZmllbGQucGxhY2Vob2xkZXIgPSBcItCX0L3QsNGH0LXQvdC40LUg0YPRgNC+0L3QsFwiO1xyXG5cclxuICB9XHJcblxyXG4gIHZhciBzZWFyY2hfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBzZWFyY2hfYnV0dG9uLmlubmVySFRNTCA9IFwi0J7QsdGL0YHQutCw0YLRjFwiO1xyXG4gIHNlYXJjaF9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBzZWFyY2hfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgc2VhcmNoX2FjdGlvbihldmVudC50YXJnZXQpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHNpbXBsZV9yb2xsX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgc2ltcGxlX3JvbGxfYnV0dG9uLmlubmVySFRNTCA9IFwi0J/RgNC+0YHRgtC+IGQyMFwiO1xyXG4gIHNpbXBsZV9yb2xsX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciByb2xsID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHRvU2VuZCA9IHt9XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9IFwic2ltcGxlX3JvbGxcIlxyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gY2hhcmFjdGVyLm5hbWVcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb21cclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbFxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG5cclxuICAvL3ZhciB3ZWFwb25fc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICAvL3dlYXBvbl9zZWxlY3QuaWQgPSBcIndlYXBvbl9jaG9zZW5cIjtcclxuXHJcbiAgdmFyIGludmVudG9yeSA9IGNoYXJhY3Rlci5pbnZlbnRvcnlcclxuXHJcbiAgLypcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGludmVudG9yeS5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IHdlYXBvbl9saXN0W2ludmVudG9yeVtpXV07XHJcbiAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IGludmVudG9yeVtpXTtcclxuICAgIHdlYXBvbl9zZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuICAqL1xyXG5cclxuICAvKlxyXG4gIHZhciBwaWNrX3dlYXBvbl9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHBpY2tfd2VhcG9uX2J1dHRvbi5pbm5lckhUTUwgPSBcItCh0LzQtdC90LjRgtGMINC+0YDRg9C20LjQtVwiO1xyXG4gIHBpY2tfd2VhcG9uX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIHBpY2tfd2VhcG9uX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciB3ZWFwb25fc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWFwb25fY2hvc2VuXCIpXHJcbiAgICB2YXIgd2VhcG9uX2luZGV4ID0gd2VhcG9uX3NlbGVjdC52YWx1ZVxyXG5cclxuICAgIGNoYW5nZV93ZWFwb24oY2hhcmFjdGVyX251bWJlciwgd2VhcG9uX2luZGV4KVxyXG4gIH1cclxuICAqL1xyXG5cclxuICB2YXIgZGVmYXVsdF93ZWFwb25faW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bY2hhcmFjdGVyX251bWJlcl1cclxuICBjaGFyYWN0ZXJfY2hvc2VuLndlYXBvbl9pZCA9IGRlZmF1bHRfd2VhcG9uX2luZGV4XHJcbiAgdmFyIGRlZmF1bHRfd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bZGVmYXVsdF93ZWFwb25faW5kZXhdXHJcblxyXG4gIHZhciB3ZWFwb25fbWluaV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fbWluaV9kaXNwbGF5XCJcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LnNyYyA9IGRlZmF1bHRfd2VhcG9uLmF2YXRhcjtcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzgwcHgnO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzgwcHgnO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkub25tb3VzZWVudGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciB3ZWFwb25faW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgIGRpc3BsYXlfd2VhcG9uX2RldGFpbGVkKHdlYXBvbl9pbmRleCwgd2VhcG9uX2luZm9fY29udGFpbmVyLCB0cnVlKVxyXG4gIH1cclxuXHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5vbm1vdXNlbGVhdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5oaWRlKClcclxuICB9XHJcblxyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgc2hvd193ZWFwb25fbW9kYWwoY2hhcmFjdGVyX251bWJlciwgMCk7XHJcbiAgfVxyXG5cclxuICBhdmF0YXJfY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fbWluaV9kaXNwbGF5KVxyXG5cclxuICB2YXIgYXR0YWNrX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYXR0YWNrX2J1dHRvbi5pbm5lckhUTUwgPSBcItCQ0YLQsNC60L7QstCw0YLRjFwiO1xyXG4gIGF0dGFja19idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgbWFpbl9hY3Rpb25zX2xlZnQgPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgIGlmIChtYWluX2FjdGlvbnNfbGVmdCA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl90b19hdHRhY2soY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0KMg0LLQsNGBINC90LUg0L7RgdGC0LDQu9C+0YHRjCDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLypcclxuICB2YXIgc2tpbGxfc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICBza2lsbF9zZWxlY3QuaWQgPSBcInNraWxsX2Nob3NlblwiO1xyXG4gICovXHJcblxyXG4gIHZhciBza2lsbHNldCA9IGNoYXJhY3Rlci5za2lsbHNldFxyXG5cclxuICAvKlxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbGxzZXQubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBza2lsbF9saXN0W3NraWxsc2V0W2ldXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gc2tpbGxzZXRbaV07XHJcbiAgICBza2lsbF9zZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIHNraWxsX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgc2tpbGxfYnV0dG9uLmlubmVySFRNTCA9IFwi0JjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINGD0LzQtdC90LjQtVwiO1xyXG4gIHNraWxsX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBza2lsbF9zZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsX2Nob3NlblwiKVxyXG4gICAgdmFyIHNraWxsX2luZGV4ID0gc2tpbGxfc2VsZWN0LnZhbHVlXHJcbiAgICB1c2Vfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIGluZGV4LCBjZWxsKVxyXG4gIH1cclxuICAqL1xyXG5cclxuXHJcbiAgdmFyIGJ1dHRvbl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gIGJ1dHRvbl9saXN0LmNsYXNzTmFtZSA9IFwiYnV0dG9uX2xpc3RcIjtcclxuICB2YXIgbGluZTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lOSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuXHJcbiAgbGluZTEuYXBwZW5kQ2hpbGQobW92ZV9idXR0b24pO1xyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgbGluZTIuYXBwZW5kQ2hpbGQoZGVsZXRlX2J1dHRvbik7XHJcbiAgICBsaW5lMy5hcHBlbmRDaGlsZChkYW1hZ2VfYnV0dG9uKTtcclxuICAgIGxpbmUzLmFwcGVuZENoaWxkKGRhbWFnZV9maWVsZCk7XHJcbiAgICBsaW5lOC5hcHBlbmRDaGlsZChjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfYnV0dG9uKTtcclxuICB9XHJcbiAgbGluZTQuYXBwZW5kQ2hpbGQoc2VhcmNoX2J1dHRvbik7XHJcbiAgLy9saW5lNS5hcHBlbmRDaGlsZChwaWNrX3dlYXBvbl9idXR0b24pO1xyXG4gIC8vbGluZTUuYXBwZW5kQ2hpbGQod2VhcG9uX3NlbGVjdCk7XHJcbiAgbGluZTYuYXBwZW5kQ2hpbGQoYXR0YWNrX2J1dHRvbik7XHJcbiAgbGluZTcuYXBwZW5kQ2hpbGQoc2ltcGxlX3JvbGxfYnV0dG9uKTtcclxuICAvL2xpbmU5LmFwcGVuZENoaWxkKHNraWxsX2J1dHRvbik7XHJcbiAgLy9saW5lOS5hcHBlbmRDaGlsZChza2lsbF9zZWxlY3QpO1xyXG5cclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMSk7XHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMik7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMyk7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lOCk7XHJcbiAgfVxyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU0KTtcclxuICAvL2J1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU1KTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNik7XHJcbiAgLy9idXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lOSk7XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTcpO1xyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGJ1dHRvbl9saXN0KTtcclxuXHJcbn0gZWxzZSB7XHJcbiAgdmFyIGhwX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSkvcGFyc2VGbG9hdChIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKVxyXG4gIGhwX3BlcmNlbnQgPSBNYXRoLmZsb29yKGhwX3BlcmNlbnQqMTAwKVxyXG5cclxuICB2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBIUF9kaXNwbGF5LmlkID0gXCJIUF9kaXNwbGF5XCI7XHJcbiAgSFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgaHBfcGVyY2VudCArIFwiJVwiO1xyXG5cclxuICB2YXIgdGlyZWRfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0pL3BhcnNlRmxvYXQoc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKVxyXG4gIHRpcmVkX3BlcmNlbnQgPSBNYXRoLmZsb29yKHRpcmVkX3BlcmNlbnQqMTAwKVxyXG5cclxuICB2YXIgdGlyZWRfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB0aXJlZF9kaXNwbGF5LmlkID0gXCJ0aXJlZF9kaXNwbGF5XCI7XHJcbiAgdGlyZWRfZGlzcGxheS5pbm5lckhUTUwgPSBcItCS0YvQvdC+0YHQu9C40LLQvtGB0YLRjDogXCIgKyB0aXJlZF9wZXJjZW50ICsgXCIlXCI7XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoSFBfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZCh0aXJlZF9kaXNwbGF5KTtcclxufVxyXG5cclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfb2JqZWN0X2NvbW1hbmQoaW5kZXgpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnZGVsZXRlX2NoYXJhY3Rlcic7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlX29iamVjdChldmVudCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICBkZWxldGVfb2JqZWN0X2NvbW1hbmQoZXZlbnQudGFyZ2V0LmluZGV4KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3Rfb2JzdGFjbGUoaW5kZXgsIGNlbGwpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuICB2YXIgb2JzdGFjbGVfaWQgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSAqICgtMSk7XHJcbiAgdmFyIG9ic3RhY2xlID0gb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tvYnN0YWNsZV9pZF07XHJcblxyXG4gIC8vIGtlZXAgdHJhY2sgb2YgbGFzdCBjaG9zZW4gb2JzdGFsZSB0byBxdWlja2x5IGFkZCB0byB0aGUgbWFwXHJcbiAgbGFzdF9vYnN0YWNsZSA9IG9ic3RhY2xlX2lkXHJcblxyXG4gIGxldCBuYW1lID0gb2JzdGFjbGUubmFtZTtcclxuICBsZXQgYXZhdGFyID0gb2JzdGFjbGUuYXZhdGFyO1xyXG5cclxuICB2YXIgbmFtZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIG5hbWVfZGlzcGxheS5pbm5lckhUTUwgPSBuYW1lO1xyXG5cclxuICB2YXIgYXZhdGFyX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnNyYyA9IGF2YXRhcjtcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChuYW1lX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYXZhdGFyX2Rpc3BsYXkpO1xyXG5cclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgIHZhciBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRlbGV0ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQo9C90LjRh9GC0L7QttC40YLRjFwiO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gICAgZGVsZXRlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICAgIGRlbGV0ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGRlbGV0ZV9vYmplY3QoZXZlbnQpO1xyXG4gICAgfVxyXG4gICAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChkZWxldGVfYnV0dG9uKTtcclxuICB9XHJcblxyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShpbmRleCwgY2VsbCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDFcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24gPSBpbmRleDtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XTtcclxuICBjZWxsLnNyYyA9IFwiLi9pbWFnZXMvbG9hZGluZy53ZWJwXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuZG9fc2VsZWN0aW9uKCkge1xyXG4gIGlmIChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgIT0gMCkge1xyXG4gICAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMFxyXG4gICAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uKTtcclxuICAgIG9sZF9jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd193ZWFwb25fbW9kYWwoY2hhcmFjdGVyX251bWJlciwgc3RhcnRpbmdfaW5kZXgpIHtcclxuICBoaWRlX21vZGFsKClcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgaW52ZW50b3J5ID0gY2hhcmFjdGVyLmludmVudG9yeVxyXG5cclxuICB2YXIgd2VhcG9uX3RhYmxlID0gJChcIjx0YWJsZT5cIik7XHJcbiAgdmFyIHRhYmxlX3NpemUgPSAzXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGVfc2l6ZTsgaSsrKSB7XHJcbiAgICB2YXIgcm93ID0gJChcIjx0cj5cIik7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRhYmxlX3NpemU7IGorKykge1xyXG4gICAgICB2YXIgaW5kZXggPSBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqaSArIGpcclxuICAgICAgaWYgKGluZGV4IDwgaW52ZW50b3J5Lmxlbmd0aCkge1xyXG4gICAgICAgIHZhciB3ZWFwb25fbnVtYmVyID0gaW52ZW50b3J5W2luZGV4XVxyXG4gICAgICAgIHZhciBjb2x1bW4gPSAkKFwiPHRoPlwiKTtcclxuICAgICAgICB2YXIgd2VhcG9uX2ljb24gPSAkKFwiPElNRz5cIik7XHJcbiAgICAgICAgdmFyIGF2YXRhciA9IFFVRVNUSU9OX0lNQUdFXHJcbiAgICAgICAgaWYgKHdlYXBvbl9kZXRhaWxlZF9pbmZvW3dlYXBvbl9udW1iZXJdLmhhc093blByb3BlcnR5KCdhdmF0YXInKSkge1xyXG4gICAgICAgICAgYXZhdGFyID0gd2VhcG9uX2RldGFpbGVkX2luZm9bd2VhcG9uX251bWJlcl0uYXZhdGFyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdlYXBvbl9pY29uLmFkZENsYXNzKCd3ZWFwb25faWNvbicpO1xyXG4gICAgICAgIHdlYXBvbl9pY29uLmF0dHIoJ3dpZHRoJywgJzEwMHB4Jyk7XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYXR0cignd2VhcG9uX251bWJlcicsIHdlYXBvbl9udW1iZXIpO1xyXG4gICAgICAgIHdlYXBvbl9pY29uLmF0dHIoJ2hlaWdodCcsICcxMDBweCcpO1xyXG4gICAgICAgIHdlYXBvbl9pY29uLmF0dHIoJ3NyYycsIGF2YXRhcik7XHJcbiAgICAgICAgd2VhcG9uX2ljb24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHZhciB3ZWFwb25fbnVtID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnd2VhcG9uX251bWJlcicpO1xyXG4gICAgICAgICAgY2hhbmdlX3dlYXBvbihjaGFyYWN0ZXJfbnVtYmVyLCB3ZWFwb25fbnVtKTtcclxuICAgICAgICAgIGhpZGVfbW9kYWwoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdlYXBvbl9pY29uLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHZhciB3ZWFwb25fbnVtID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnd2VhcG9uX251bWJlcicpO1xyXG4gICAgICAgICAgZGlzcGxheV93ZWFwb25fZGV0YWlsZWQod2VhcG9uX251bSwgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLCBmYWxzZSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB3ZWFwb25faWNvbi5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuaHRtbCgnJyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb2x1bW4uYXBwZW5kKHdlYXBvbl9pY29uKTtcclxuICAgICAgICByb3cuYXBwZW5kKGNvbHVtbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHdlYXBvbl90YWJsZS5hcHBlbmQocm93KTtcclxuICB9XHJcbiAgc2tpbGxfbW9kYWxfY29udGVudC5hcHBlbmQod2VhcG9uX3RhYmxlKTtcclxuXHJcbiAgaWYgKGludmVudG9yeS5sZW5ndGggPiBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqdGFibGVfc2l6ZSkgey8vIHRoZXJlIGFyZSBtb3JlIHNraWxscyB0byBkaXNwbGF5XHJcbiAgICB2YXIgbmV4dF9wYWdlX2J1dHRvbiA9ICQoXCI8SU1HPlwiKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24uYXR0cignd2lkdGgnLCAnMTAwcHgnKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24uYXR0cignaGVpZ2h0JywgJzUwcHgnKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24uYXR0cignc3JjJywgUklHSFRfQVJST1dfSU1BR0UpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHNob3dfd2VhcG9uX21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSp0YWJsZV9zaXplKTtcclxuICAgIH0pXHJcblxyXG4gICAgbmV4dF9wYWdlX2J1dHRvbl9jb250YWluZXIuYXBwZW5kKG5leHRfcGFnZV9idXR0b24pO1xyXG4gIH1cclxuICBza2lsbF9tb2RhbC5zaG93KCk7XHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd19tb2RhbChjaGFyYWN0ZXJfbnVtYmVyLCBzdGFydGluZ19pbmRleCkge1xyXG4gIGhpZGVfbW9kYWwoKTtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgc2tpbGxzZXQgPSBjaGFyYWN0ZXIuc2tpbGxzZXRcclxuXHJcbiAgdmFyIHNraWxsX3RhYmxlID0gJChcIjx0YWJsZT5cIik7XHJcblxyXG4gIHZhciB0YWJsZV9zaXplID0gM1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlX3NpemU7IGkrKykge1xyXG4gICAgdmFyIHJvdyA9ICQoXCI8dHI+XCIpO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0YWJsZV9zaXplOyBqKyspIHtcclxuICAgICAgdmFyIGluZGV4ID0gc3RhcnRpbmdfaW5kZXggKyB0YWJsZV9zaXplKmkgKyBqXHJcbiAgICAgIGlmIChpbmRleCA8IHNraWxsc2V0Lmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBza2lsbF9udW1iZXIgPSBza2lsbHNldFtpbmRleF1cclxuICAgICAgICB2YXIgY29sdW1uID0gJChcIjx0aD5cIik7XHJcbiAgICAgICAgdmFyIHNraWxsX2ljb24gPSAkKFwiPElNRz5cIik7XHJcbiAgICAgICAgdmFyIGF2YXRhciA9IFFVRVNUSU9OX0lNQUdFXHJcbiAgICAgICAgaWYgKHNraWxsX2RldGFpbGVkX2luZm9bc2tpbGxfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eSgnYXZhdGFyJykpIHtcclxuICAgICAgICAgIGF2YXRhciA9IHNraWxsX2RldGFpbGVkX2luZm9bc2tpbGxfbnVtYmVyXS5hdmF0YXJcclxuICAgICAgICB9XHJcbiAgICAgICAgc2tpbGxfaWNvbi5hZGRDbGFzcygnc2tpbGxfaWNvbicpO1xyXG4gICAgICAgIHNraWxsX2ljb24uYXR0cignd2lkdGgnLCAnMTAwcHgnKTtcclxuICAgICAgICBza2lsbF9pY29uLmF0dHIoJ3NraWxsX251bWJlcicsIHNraWxsX251bWJlcik7XHJcbiAgICAgICAgc2tpbGxfaWNvbi5hdHRyKCdoZWlnaHQnLCAnMTAwcHgnKTtcclxuICAgICAgICBza2lsbF9pY29uLmF0dHIoJ3NyYycsIGF2YXRhcik7XHJcbiAgICAgICAgc2tpbGxfaWNvbi5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgdmFyIHBvc2l0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIHBvc2l0aW9uKTtcclxuICAgICAgICAgIHVzZV9za2lsbChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdza2lsbF9udW1iZXInKSwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICBoaWRlX21vZGFsKClcclxuICAgICAgICB9KTtcclxuICAgICAgICBza2lsbF9pY29uLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHZhciBza2lsbF9udW1iZXIgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdza2lsbF9udW1iZXInKTtcclxuICAgICAgICAgIHZhciBza2lsbF9vYmplY3QgPSBza2lsbF9kZXRhaWxlZF9pbmZvW3NraWxsX251bWJlcl07XHJcbiAgICAgICAgICB2YXIgc2tpbGxfbmFtZV9vYmplY3QgPSAkKFwiPGgyPlwiKTtcclxuICAgICAgICAgIHZhciBza2lsbF9uYW1lID0gc2tpbGxfbGlzdFtza2lsbF9udW1iZXJdO1xyXG4gICAgICAgICAgc2tpbGxfbmFtZV9vYmplY3QuaHRtbChza2lsbF9uYW1lKTtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5hcHBlbmQoc2tpbGxfbmFtZV9vYmplY3QpO1xyXG5cclxuICAgICAgICAgIHZhciBza2lsbF9jb3N0X29iamVjdCA9ICQoXCI8aDI+XCIpO1xyXG4gICAgICAgICAgaWYgKHNraWxsX29iamVjdC5oYXNPd25Qcm9wZXJ0eSgnY29zdCcpKSB7XHJcbiAgICAgICAgICAgIHZhciBza2lsbF9jb3N0ID0gc2tpbGxfb2JqZWN0LmNvc3Q7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfY29zdCA9IFwi0J3QtdC40LfQstC10YHRgtC90L5cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2tpbGxfY29zdF9vYmplY3QuaHRtbChcItCi0YDQtdCx0YPQtdGCINC00LXQudGB0YLQstC40Lk6IFwiICsgc2tpbGxfY29zdCk7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuYXBwZW5kKHNraWxsX2Nvc3Rfb2JqZWN0KTtcclxuXHJcbiAgICAgICAgICB2YXIgc2tpbGxfZGVzY3JpcHRpb25fb2JqZWN0ID0gJChcIjxwPlwiKTtcclxuICAgICAgICAgIGlmIChza2lsbF9vYmplY3QuaGFzT3duUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJykpIHtcclxuICAgICAgICAgICAgdmFyIHNraWxsX2Rlc2NyaXB0aW9uID0gc2tpbGxfb2JqZWN0LmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHNraWxsX2Rlc2NyaXB0aW9uID0gXCLQnNGLINGB0LDQvNC4INC90LUg0LfQvdCw0LXQvCDRh9GC0L4g0L7QvdC+INC00LXQu9Cw0LXRglwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9vYmplY3QuaHRtbChza2lsbF9kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuYXBwZW5kKHNraWxsX2Rlc2NyaXB0aW9uX29iamVjdCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgc2tpbGxfaWNvbi5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuaHRtbCgnJyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb2x1bW4uYXBwZW5kKHNraWxsX2ljb24pO1xyXG4gICAgICAgIHJvdy5hcHBlbmQoY29sdW1uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2tpbGxfdGFibGUuYXBwZW5kKHJvdyk7XHJcbiAgfVxyXG4gIHNraWxsX21vZGFsX2NvbnRlbnQuYXBwZW5kKHNraWxsX3RhYmxlKTtcclxuXHJcbiAgaWYgKHNraWxsc2V0Lmxlbmd0aCA+IHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSp0YWJsZV9zaXplKSB7Ly8gdGhlcmUgYXJlIG1vcmUgc2tpbGxzIHRvIGRpc3BsYXlcclxuICAgIHZhciBuZXh0X3BhZ2VfYnV0dG9uID0gJChcIjxJTUc+XCIpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCd3aWR0aCcsICcxMDBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdoZWlnaHQnLCAnNTBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdzcmMnLCBSSUdIVF9BUlJPV19JTUFHRSk7XHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgc2hvd19tb2RhbChjaGFyYWN0ZXJfbnVtYmVyLCBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqdGFibGVfc2l6ZSk7XHJcbiAgICB9KVxyXG5cclxuICAgIG5leHRfcGFnZV9idXR0b25fY29udGFpbmVyLmFwcGVuZChuZXh0X3BhZ2VfYnV0dG9uKTtcclxuICB9XHJcbiAgc2tpbGxfbW9kYWwuc2hvdygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlX21vZGFsKCkge1xyXG4gIHNraWxsX21vZGFsLmhpZGUoKTtcclxuICBza2lsbF9tb2RhbF9jb250ZW50Lmh0bWwoXCJcIik7XHJcbiAgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLmh0bWwoXCJcIik7XHJcbiAgbmV4dF9wYWdlX2J1dHRvbl9jb250YWluZXIuaHRtbChcIlwiKTtcclxufVxyXG5cclxuLy8gYXR0YWNrIHJlbGF0ZWQgaGVscGVyc1xyXG5cclxuZnVuY3Rpb24gY2hvb3NlX2NoYXJhY3Rlcl90b19hdHRhY2soY2VsbCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDJcclxuICBjZWxsLnNyYyA9IFwiLi9pbWFnZXMvYXR0YWNrX3BsYWNlaG9sZGVyLmpwZ1wiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wX2F0dGFjaygpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwXHJcbiAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uKTtcclxuICBvbGRfY2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RvcF9za2lsbCgpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwXHJcbiAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uKTtcclxuICBvbGRfY2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkKTtcclxufVxyXG5cclxuXHJcbi8vIHJvbGwgc29tZXRoaW5nXHJcblxyXG5mdW5jdGlvbiByb2xsX3goeCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB4KSArIDFcclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbFNlYXJjaChpbnRlbGxpZ2VuY2UsIG1vZCkge1xyXG4gIHJldHVybiBpbnRlbGxpZ2VuY2UgKyByb2xsX3goMjApICsgbW9kO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsSW5pdGlhdGl2ZSgpIHtcclxuICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLkhQW2ldID4gMCkgeyAvLyBzbyBjaGFyYWN0ZXIgaSBpcyBwcmVzZW50XHJcbiAgICAgIC8vIHJldHJpZXZlIHRoYXQgY2hhcmFjdGVyJ3MgYWdpbGl0eVxyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baV07XHJcbiAgICAgIHZhciBhZ2lsaXR5ID0gY2hhcmFjdGVyLmFnaWxpdHk7XHJcblxyXG4gICAgICAvLyByb2xsIGluaXRpYXRpdmUgYW5kIGFkZCBhZ2lsaXR5IG1vZGlmaWNhdG9yXHJcbiAgICAgIHZhciBpbml0aWF0aXZlID0gY29tcHV0ZUluaXRpYXRpdmUocGFyc2VJbnQoYWdpbGl0eSkpO1xyXG5cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbaV0gPSBpbml0aWF0aXZlO1xyXG4gICAgfVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAncm9sbF9pbml0aWF0aXZlJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbml0aWF0aXZlX3N0YXRlID0gY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmU7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxfYXR0YWNrKHR5cGUsIGF0dGFja2VyLCB0YXJnZXQsIGFkdmFudGFnZV9ib251cykge1xyXG4gIHZhciBhZHZhbnRhZ2UgPSAwXHJcbiAgaWYgKCh0eXBlID09IFwicmFuZ2VkXCIpfHwodHlwZSA9PSBcImVuZXJneVwiKSkge1xyXG4gICAgYWR2YW50YWdlID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbYXR0YWNrZXJdO1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmhhc093blByb3BlcnR5KFwiYWRhcHRpdmVfZmlnaHRpbmdcIikpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID09IDApIHtcclxuICAgICAgICBhZHZhbnRhZ2UgPSBhZHZhbnRhZ2UgKyAxO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KHRgNCw0LHQvtGC0LDQuyDRgNC10LnQvdC00LbQvtCy0YvQuSDRgdGC0LDQuiDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0LhcIik7XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uYWRhcHRpdmVfZmlnaHRpbmcgPSAxO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAodHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIGFkdmFudGFnZSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbYXR0YWNrZXJdXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uaGFzT3duUHJvcGVydHkoXCJhZGFwdGl2ZV9maWdodGluZ1wiKSkge1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uYWRhcHRpdmVfZmlnaHRpbmcgPT0gMSkge1xyXG4gICAgICAgIGFkdmFudGFnZSA9IGFkdmFudGFnZSArIDE7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQodGA0LDQsdC+0YLQsNC7INC80LjQu9C70Lgg0YHRgtCw0Log0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtC4XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gMDtcclxuICAgIH1cclxuICB9XHJcbiAgYWR2YW50YWdlID0gYWR2YW50YWdlIC0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbdGFyZ2V0XSArIGFkdmFudGFnZV9ib251c1xyXG5cclxuICB2YXIgcm9sbCA9IDBcclxuXHJcbiAgaWYgKGFkdmFudGFnZSA+PSAyKSB7IC8vINCU0LjQutC+0LUg0L/RgNC10LjQvNGD0YnQtdGB0YLQstC+ID0gNCDQutGD0LHQsFxyXG4gICAgY29uc29sZS5sb2coXCLQlNC40LrQvtC1INC/0YDQtdC40LzRg9GJ0LXRgdGC0LLQvlwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwzID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGw0ID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWF4KHJvbGwxLCByb2xsMiwgcm9sbDMsIHJvbGw0KVxyXG4gIH0gZWxzZSBpZiAoYWR2YW50YWdlID09IDEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwi0J/RgNC10LjQvNGD0YnQtdGB0YLQstC+XCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5tYXgocm9sbDEsIHJvbGwyKVxyXG4gIH0gZWxzZSBpZiAoYWR2YW50YWdlID09IDApIHtcclxuICAgIHJvbGwgPSByb2xsX3goMjApXHJcbiAgfSBlbHNlIGlmIChhZHZhbnRhZ2UgPT0gLTEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwi0J/QvtC80LXRhdCwXCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5taW4ocm9sbDEsIHJvbGwyKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZyhcItCU0LjQutCw0Y8g0L/QvtC80LXRhdCwXCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDMgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDQgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5taW4ocm9sbDEsIHJvbGwyLCByb2xsMywgcm9sbDQpXHJcbiAgfVxyXG4gIHJldHVybiByb2xsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxfZXZhc2lvbih0YXJnZXRfY2hhcmFjdGVyLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcikge1xyXG4gIGNvbnNvbGUubG9nKFwi0JHQvtC90YPRgSDRg9Cy0L7RgNC+0YLQsDogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKVxyXG4gIHZhciBldmFkZV9yb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KHRhcmdldF9jaGFyYWN0ZXIuYWdpbGl0eSkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICByZXR1cm4gZXZhZGVfcm9sbFxyXG59XHJcblxyXG4vLyBtYW5hZ2luZyBjaGF0XHJcblxyXG5mdW5jdGlvbiBwdXNoVG9MaXN0KG1lc3NhZ2UpIHtcclxuICBmb3IgKGxldCBpPTE7IGkgPCBDSEFUX0NBU0g7IGkrKykge1xyXG4gICAgdmFyIGVsZW1lbnRfdG9fY29weSA9ICQoJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgaSArICdcIl0nKTtcclxuICAgIHZhciBlbGVtZW50X3RvX3Bhc3RlID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyAoaS0xKSArICdcIl0nKTtcclxuXHJcbiAgICBlbGVtZW50X3RvX3Bhc3RlLnRleHQoZWxlbWVudF90b19jb3B5LnRleHQoKSk7XHJcbiAgfVxyXG4gIHZhciB0b3BfZWxlbWVudCA9ICQoJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgKENIQVRfQ0FTSC0xKSArICdcIl0nKTtcclxuICB0b3BfZWxlbWVudC50ZXh0KG1lc3NhZ2UpO1xyXG5cclxuICBpZiAobm90aWZpY2F0aW9uc19jb250YWluZXIuaXMoXCI6aGlkZGVuXCIpKSB7XHJcbiAgICBjaGF0X2J1dHRvbi5hZGRDbGFzcyhcImlzLXJlZFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlQ2hhdFZpc2liaWxpdHkoKSB7XHJcbiAgaWYgKGNoYXRfYnV0dG9uLmhhc0NsYXNzKFwiaXMtcmVkXCIpKSB7XHJcbiAgICBjaGF0X2J1dHRvbi5yZW1vdmVDbGFzcyhcImlzLXJlZFwiKVxyXG4gIH1cclxuICBpZiAobm90aWZpY2F0aW9uc19jb250YWluZXIuaXMoXCI6aGlkZGVuXCIpKSB7XHJcbiAgICBub3RpZmljYXRpb25zX2NvbnRhaW5lci5zaG93KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLmhpZGUoKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGNvdmVyIG1lY2hhbmljc1xyXG5cclxuZnVuY3Rpb24gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKSB7XHJcbiAgdmFyIG1vZCA9IHt9XHJcbiAgbW9kLmlzUG9zc2libGUgPSB0cnVlXHJcbiAgbW9kLmNvdmVyX2xldmVsID0gYWNjdW11bGF0ZWRfY292ZXJcclxuICBzd2l0Y2goYWNjdW11bGF0ZWRfY292ZXIpIHtcclxuICAgIGNhc2UgMDpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IDBcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAwXHJcbiAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAwXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOlxyXG4gICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTFcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMlxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTJcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTFcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgNTpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTNcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTFcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgNjpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTNcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTJcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgNzpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTRcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTJcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgODpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTRcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTNcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgOTpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTVcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTNcclxuICAgICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbW9kLmlzUG9zc2libGUgPSBmYWxzZVxyXG4gICAgICAgIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1vZFxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlX2NvdmVyKGRpc3RhbmNlLCBjb3Zlcikge1xyXG4gIHZhciByZXN1bHQgPSAwXHJcbiAgaWYgKGRpc3RhbmNlIDwgMC4xNSkge1xyXG4gICAgcmVzdWx0ID0gY292ZXJcclxuICB9IGVsc2UgaWYgKGRpc3RhbmNlIDwgMC4zKSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlciAqIDAuNzVcclxuICB9IGVsc2UgaWYgKGRpc3RhbmNlIDwgMC41KSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlciAqIDAuNVxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjY1KSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlciAqIDAuMjVcclxuICB9IGVsc2Uge1xyXG4gICAgcmVzdWx0ID0gMFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdFxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfYWNjdW11bGF0ZWRfY292ZXIodXNlcl9wb3MsIHRhcmdldF9wb3MpIHtcclxuICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSAwXHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGNlbGxzX29uX2xpbmUodXNlcl9wb3MsIHRhcmdldF9wb3MsIGdhbWVfc3RhdGUuc2l6ZSlcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfY2VsbCA9IGNhbmRpZGF0ZV9jZWxsc1tpXVxyXG4gICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXSA8IDApIHsvLyDRjdGC0L4g0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVxyXG4gICAgICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW01hdGguYWJzKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXSldXHJcbiAgICAgIHZhciBkaXN0YW5jZSA9IGRpc3RhbmNlX3RvX2xpbmUodXNlcl9wb3MsIHRhcmdldF9wb3MsIGdhbWVfc3RhdGUuc2l6ZSwgY3VycmVudF9jZWxsKVxyXG4gICAgICBhY2N1bXVsYXRlZF9jb3ZlciA9IGFjY3VtdWxhdGVkX2NvdmVyICsgY29tcHV0ZV9jb3ZlcihkaXN0YW5jZSwgb2JzdGFjbGUuY292ZXIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGFjY3VtdWxhdGVkX2NvdmVyID0gTWF0aC5jZWlsKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gIHJldHVybiBhY2N1bXVsYXRlZF9jb3ZlclxyXG59XHJcblxyXG4vLyBNaXNjZWxhbmVvdXMgYWN0aW9uc1xyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5KGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSBcImNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eVwiO1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAwKSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMFxyXG4gIH1cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VhcmNoX2FjdGlvbihzZWFyY2hfYnV0dG9uKSB7XHJcbiAgdmFyIGluZGV4ID0gc2VhcmNoX2J1dHRvbi5pbmRleDtcclxuICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBpZiAoIShnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSAmJiBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdIDwgMSkpIHtcclxuXHJcbiAgICB2YXIgbmFtZSA9IGNoYXJhY3Rlci5uYW1lO1xyXG4gICAgdmFyIG1vZGlmaWNhdG9yID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaW5kZXhdO1xyXG4gICAgdmFyIGludGVsbGlnZW5jZSA9IGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcbiAgICB2YXIgcm9sbCA9IHJvbGxTZWFyY2gocGFyc2VJbnQoaW50ZWxsaWdlbmNlKSwgcGFyc2VJbnQobW9kaWZpY2F0b3IpKTtcclxuICAgIHZhciB6b25lX251bWJlciA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF07XHJcbiAgICBwdXNoVG9MaXN0KCfQn9C10YDRgdC+0L3QsNC2ICcgKyBuYW1lICsgJyDQsdGA0L7RgdC40LsgJyArIHJvbGwgKyAnINC90LAg0LLQvdC40LzQsNGC0LXQu9GM0L3QvtGB0YLRjCcpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NlYXJjaF9hY3Rpb24nO1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gbmFtZTtcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbDtcclxuICAgIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5wbGF5ZXJfbmFtZSA9IG15X25hbWVcclxuICAgIHRvU2VuZC5taW5lc19kZXRlY3RlZCA9IFtdXHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICB2YXIgbGFuZG1pbmVfY2FuZGlkYXRlcyA9IGluZGV4X2luX3JhZGl1cyhpbmRleCwgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cylcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFuZG1pbmVfY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMobGFuZG1pbmVfY2FuZGlkYXRlc1tpXSkpIHtcclxuICAgICAgICAgIHRvU2VuZC5taW5lc19kZXRlY3RlZC5wdXNoKGxhbmRtaW5lX2NhbmRpZGF0ZXNbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQntCx0YvRgdC6INCy0L4g0LLRgNC10LzRjyDQsdC+0Y8g0YHRgtC+0LjRgiDQsdC+0L3Rg9GB0L3QvtC1INC00LXQudGB0YLQstC40LUhXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlSW5pdGlhdGl2ZShhZ2lsaXR5KSB7XHJcbiAgcmV0dXJuIGFnaWxpdHkqMiArIHJvbGxfeCgyMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0X25ld19yb3VuZCgpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnbmV3X3JvdW5kJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHZhciBzYXZlX3JvbGwgPSBbXVxyXG5cclxuICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGUubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0gIT09IHVuZGVmaW5lZCAmJiBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldICE9PSBudWxsKSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgc2F2ZV9yb2xsW2ldID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlci5zdGFtaW5hKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRvU2VuZC5zYXZlX3JvbGxfbGlzdCA9IHNhdmVfcm9sbFxyXG5cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2JhdHRsZV9tb2QoKSB7XHJcbiAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMFxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMVxyXG4gIH1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2JhdHRsZV9tb2QnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnZhbHVlID0gbmV3X3ZhbHVlXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbi8vIGF0dGFjayByZWxhdGVkIHRoaW5ncyAoY29tcHV0YXRpb24pXHJcblxyXG5mdW5jdGlvbiBjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpIHtcclxuICByZXR1cm4gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduX21vdmVzKGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUZsb2F0KG1vdmVfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV0pO1xyXG4gIGlmIChjaGFyYWN0ZXIuaGFzT3duUHJvcGVydHkoXCJleHRyYV9tb3ZlbWVudFwiKSkge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdICsgcGFyc2VGbG9hdChjaGFyYWN0ZXIuZXh0cmFfbW92ZW1lbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gd2VhcG9uX2RhbWFnZV9ib251cyhyYXdfZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdG90YWxfZGFtYWdlID0gcmF3X2RhbWFnZVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSAndGhyb3dpbmcnKSB7XHJcbiAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW01hdGguY2VpbChwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpLzIpXVxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gJ3JhbmdlZCcpIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpICYmIHdlYXBvbi5oYXNPd25Qcm9wZXJ0eShcImFpbV9ib251c1wiKSkge1xyXG4gICAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBwYXJzZUludCh3ZWFwb24uYWltX2JvbnVzKVxyXG4gICAgfVxyXG4gIH1cclxuICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgcmV0dXJuIHRvdGFsX2RhbWFnZVxyXG59XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtX2F0dGFjayhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX2Nob3Nlbi53ZWFwb25faWRdXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSkpIHtcclxuXHJcbiAgICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIodXNlcl9wb3NpdGlvbiwgaW5kZXgpXHJcblxyXG4gICAgdmFyIGNvdmVyX21vZGlmaWVyID0gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG5cclxuXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfS0QgPSBjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3Jlc29sdmVfYXR0YWNrJztcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQuYXR0YWNrZXJfaWQgPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5hdHRhY2tlcl9wb3NpdGlvbiA9IHVzZXJfcG9zaXRpb25cclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmF0dGFja190eXBlID0gd2VhcG9uLnR5cGVcclxuICAgIHRvU2VuZC5jb3Zlcl9sZXZlbCA9IGNvdmVyX21vZGlmaWVyLmNvdmVyX2xldmVsXHJcbiAgICB0b1NlbmQudXNlcl9pbnZpc2liaWxpdHlfZW5kZWQgPSAwXHJcblxyXG4gICAgaWYgKHdlYXBvbi5oYXNPd25Qcm9wZXJ0eShcInN1YnR5cGVcIikgJiYgd2VhcG9uLnN1YnR5cGUgPT0gXCJQUFwiKSB7XHJcbiAgICAgIHRvU2VuZC5xdWlja19hdHRhY2tfcmVhZHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W3VzZXJfY2hhcmFjdGVyX251bWJlcl0gIT0gXCJhbGxcIiAmJiB3ZWFwb24udHlwZSAhPSBcInRocm93aW5nXCIpIHtcclxuICAgICAgdG9TZW5kLnVzZXJfaW52aXNpYmlsaXR5X2VuZGVkID0gMVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb3Zlcl9tb2RpZmllci5pc1Bvc3NpYmxlKSB7XHJcbiAgICAgIHZhciBhdHRhY2tfcm9sbCA9IHJvbGxfYXR0YWNrKHdlYXBvbi50eXBlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyLCBjb3Zlcl9tb2RpZmllci5hZHZhbnRhZ2VfYm9udXMpXHJcbiAgICAgIGlmIChhdHRhY2tfcm9sbCA8IDIwKSB7Ly8gbm8gY3JpdFxyXG4gICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7Ly8g0J/RgNC40YbQtdC7INC00LDQsdC70LjRgiDQsdC+0L3Rg9GBINC/0L7Qv9Cw0LTQsNC90LjRj1xyXG4gICAgICAgICAgICBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKTtcclxuICAgICAgICAgICAgdG9TZW5kLmFpbV9vdmVyID0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuc3RyZW5ndGgpXHJcbiAgICAgICAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcImVuZXJneVwiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgMipwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSlcclxuICAgICAgICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwidGhyb3dpbmdcIikge1xyXG4gICAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuYWdpbGl0eSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBhdHRhY2tfYm9udXMgPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICB2YXIgdW5pdmVyc2FsX2JvbnVzID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgICAgIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsICsgYXR0YWNrX2JvbnVzICsgdW5pdmVyc2FsX2JvbnVzICsgY292ZXJfbW9kaWZpZXIuYXR0YWNrX2JvbnVzXHJcblxyXG4gICAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGN1bXVsYXRpdmVfYXR0YWNrX3JvbGxcclxuXHJcbiAgICAgICAgaWYgKGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPiB0YXJnZXRfY2hhcmFjdGVyX0tEKSB7Ly8g0JXRgdGC0Ywg0L/RgNC+0LHQuNGC0LjQtVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID09IDEpIHtcclxuICAgICAgICAgICAgdmFyIGV2YWRlX3JvbGwgPSByb2xsX2V2YXNpb24odGFyZ2V0X2NoYXJhY3RlciwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIHRvU2VuZC5ldmFkZV9yb2xsID0gZXZhZGVfcm9sbFxyXG4gICAgICAgICAgICBpZiAoZXZhZGVfcm9sbCA+IGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwpIHsgLy9zdWNjZXNmdWxseSBldmFkZWRcclxuICAgICAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZXZhZGVkXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfY2hhcmFjdGVyX251bWJlciwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiS0RfYmxvY2tcIlxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHsgLy8gZnVsbCBjcml0XHJcbiAgICAgICAgdG9TZW5kLmF0dGFja19yb2xsID0gYXR0YWNrX3JvbGxcclxuICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfY2hhcmFjdGVyX251bWJlciwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZ1bGxfY3JpdFwiXHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jb3ZlclwiXHJcbiAgfVxyXG5cclxuICAgIGlmICh0b1NlbmQuaGFzT3duUHJvcGVydHkoXCJkYW1hZ2Vfcm9sbFwiKSAmJiB3ZWFwb24uaGFzT3duUHJvcGVydHkoXCJzdWJ0eXBlXCIpICYmIHdlYXBvbi5zdWJ0eXBlID09IFwiZHJvYm92aWtcIikge1xyXG4gICAgICB2YXIgc2xvd19zY2FsZSA9IHBhcnNlRmxvYXQod2VhcG9uLnNsb3dfc2NhbGUpO1xyXG4gICAgICB2YXIgZnVsbF9ocCA9IEhQX3ZhbHVlc1twYXJzZUludCh0YXJnZXRfY2hhcmFjdGVyLnN0YW1pbmEpXVxyXG4gICAgICB2YXIgY3VycmVudF9tb3ZlcyA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIGZyYWN0aW9uID0gcGFyc2VGbG9hdCh0b1NlbmQuZGFtYWdlX3JvbGwpL3BhcnNlRmxvYXQoZnVsbF9ocClcclxuICAgICAgdmFyIG1vdmVfcmVkdWN0aW9uID0gY3VycmVudF9tb3ZlcyAqIGZyYWN0aW9uICogc2xvd19zY2FsZTtcclxuICAgICAgdG9TZW5kLm1vdmVfcmVkdWN0aW9uID0gbW92ZV9yZWR1Y3Rpb247XHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvi4uLlwiKVxyXG4gIH1cclxuICBzdG9wX2F0dGFjaygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgY2hhcmFjdGVyX251bWJlciwgYXR0YWNrX3JvbGwsIHRhcmdldF9udW1iZXIpIHtcclxuICB2YXIgZGFtYWdlID0gMFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICBpZiAoY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcInNuaXBlclwiKSB7XHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAxNikge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlYXBvbi5kYW1hZ2VbMF07IGkrKykge1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJ3ZWFrc3BvdFwiKSAmJiBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9udW1iZXJdLndlYWtzcG90Lmh1bnRlcl9pZCA9PSBjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgICAgICAgc3dpdGNoIChhdHRhY2tfcm9sbCkge1xyXG4gICAgICAgICAgY2FzZSAxODpcclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjJcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE5OlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqMlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDIwOlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqNVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2l0Y2ggKGF0dGFja19yb2xsKSB7XHJcbiAgICAgICAgICBjYXNlIDE4OlxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMTk6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSoyXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSozXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlYXBvbi5kYW1hZ2VbMF07IGkrKykge1xyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3god2VhcG9uLmRhbWFnZVsxXSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmIChhdHRhY2tfcm9sbCA8IDE5KSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KHdlYXBvbi5kYW1hZ2VbMV0pXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICB9XHJcbiAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG5cclxuICAgIGlmIChhdHRhY2tfcm9sbCA9PSAyMCkge1xyXG4gICAgICBkYW1hZ2UgPSBkYW1hZ2UgKiAyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAod2VhcG9uLnR5cGUgPT0gXCJyYW5nZWRcIikge1xyXG4gICAgdmFyIGRhbWFnZV90eXBlID0gXCJidWxsZXRcIlxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICB2YXIgZGFtYWdlX3R5cGUgPSBcIm1lbGVlXCJcclxuICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwiZW5lcmd5XCIpIHtcclxuICAgICAgdmFyIGRhbWFnZV90eXBlID0gXCJlbmVyZ3lcIlxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJ0aHJvd2luZ1wiKSB7XHJcbiAgICAgIHZhciBkYW1hZ2VfdHlwZSA9IFwibWVsZWVcIlxyXG4gIH1cclxuXHJcbiAgc3dpdGNoKGRhbWFnZV90eXBlKSB7XHJcbiAgICBjYXNlIFwibWVsZWVcIjpcclxuICAgICAgdmFyIHJlc2lzdCA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9yZXNpc3RbdGFyZ2V0X251bWJlcl1cclxuICAgICAgY29uc29sZS5sb2coXCLQo9GA0L7QvSDQtNC+INGA0LXQt9C40YHRgtCwOiBcIiArIGRhbWFnZSlcclxuICAgICAgZGFtYWdlID0gcGFyc2VJbnQoZGFtYWdlICogKDEuMCAtIHJlc2lzdCkpXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi0KPRgNC+0L0g0L/QvtGB0LvQtSDRgNC10LfQuNGB0YLQsDogXCIgKyBkYW1hZ2UpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImJ1bGxldFwiOlxyXG4gICAgICB2YXIgcmVzaXN0ID0gY2hhcmFjdGVyX3N0YXRlLmJ1bGxldF9yZXNpc3RbdGFyZ2V0X251bWJlcl1cclxuICAgICAgY29uc29sZS5sb2coXCLQo9GA0L7QvSDQtNC+INGA0LXQt9C40YHRgtCwOiBcIiArIGRhbWFnZSlcclxuICAgICAgZGFtYWdlID0gcGFyc2VJbnQoZGFtYWdlICogKDEuMCAtIHJlc2lzdCkpXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi0KPRgNC+0L0g0L/QvtGB0LvQtSDRgNC10LfQuNGB0YLQsDogXCIgKyBkYW1hZ2UpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgLy9ub3RoaW5nIGZvciBub3dcclxuICB9XHJcblxyXG4gIHJldHVybiBkYW1hZ2VcclxufVxyXG5cclxuZnVuY3Rpb24gZGFtYWdlX3NraWxsX3RlbXBsYXRlKHRhcmdldF9wb3MsIHVzZXJfcG9zLCByYW5nZSwgdXNlcl9pZCwgc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3Zlcikge1xyXG4gIGlmIChpc0luUmFuZ2UodGFyZ2V0X3BvcywgdXNlcl9wb3MsIHJhbmdlKSkge1xyXG5cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdGFyZ2V0X3Bvc11cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaWRdXHJcblxyXG4gICAgdmFyIGNvdmVyX21vZGlmaWVyID0gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2lkXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5jb3Zlcl9sZXZlbCA9IGFjY3VtdWxhdGVkX2NvdmVyXHJcblxyXG4gICAgaWYgKGNvdmVyX21vZGlmaWVyLmlzUG9zc2libGUpIHtcclxuXHJcbiAgICAgIHZhciBhdHRhY2tfcm9sbCA9IHJvbGxfYXR0YWNrKHdlYXBvbi50eXBlLCB1c2VyX2lkLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgY292ZXJfbW9kaWZpZXIuYWR2YW50YWdlX2JvbnVzKVxyXG5cclxuICAgICAgaWYgKGF0dGFja19yb2xsIDwgMjApIHsvLyBubyBjcml0XHJcbiAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIGJvbnVzX2F0dGFjayArIGNvdmVyX21vZGlmaWVyLmF0dGFja19ib251c1xyXG5cclxuICAgICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsXHJcblxyXG4gICAgICAgIGlmIChjdW11bGF0aXZlX2F0dGFja19yb2xsID4gdGFyZ2V0X2NoYXJhY3Rlcl9LRCkgey8vINCV0YHRgtGMINC/0YDQvtCx0LjRgtC40LVcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBldmFkZV9yb2xsID0gcm9sbF9ldmFzaW9uKHRhcmdldF9jaGFyYWN0ZXIsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICB0b1NlbmQuZXZhZGVfcm9sbCA9IGV2YWRlX3JvbGxcclxuICAgICAgICAgICAgaWYgKGV2YWRlX3JvbGwgPiBjdW11bGF0aXZlX2F0dGFja19yb2xsKSB7IC8vc3VjY2VzZnVsbHkgZXZhZGVkXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImV2YWRlZFwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2lkLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfaWQsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiS0RfYmxvY2tcIlxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHsgLy8gZnVsbCBjcml0XHJcbiAgICAgICAgdG9TZW5kLmF0dGFja19yb2xsID0gYXR0YWNrX3JvbGxcclxuICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfaWQsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmdWxsX2NyaXRcIlxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jb3ZlclwiXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG9TZW5kXHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZG9fZGFtYWdlKGNoYXJhY3Rlcl9udW1iZXIsIGRhbWFnZSkge1xyXG4gIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImZvcmNlX2ZpZWxkX3RhcmdldFwiKSkge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdIC0gZGFtYWdlXHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBzaGllbGRfaW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldC5zaGllbGRfaW5kZXhcclxuICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5zaGllbGQgLSBkYW1hZ2VcclxuICAgIHZhciBtZXNzYWdlID0gXCLQqdC40YIg0L/RgNC40L3Rj9C7INGD0YDQvtC9INC90LAg0YHQtdCx0Y8hINCe0YHRgtCw0LLRiNCw0Y/RgdGPINC/0YDQvtGH0L3QvtGB0YLRjDogXCIgKyBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZFxyXG4gICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgaWYgKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkIDw9IDApIHsvLyDRidC40YIg0YPQvdC40YfRgtC+0LbQtdC9XHJcbiAgICAgIHZhciBtZXNzYWdlID0gXCJQcmVzcyBGINCp0LjRgtGDLi4uXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICB2YXIgY2hhcl9saXN0ID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5jaGFyYWN0ZXJfbGlzdFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gY2hhcl9saXN0W2ldXHJcbiAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uZm9yY2VfZmllbGRfdGFyZ2V0XHJcbiAgICAgIH1cclxuICAgICAgZGVsZXRlX29iamVjdF9jb21tYW5kKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0ucG9zaXRpb24pXHJcbiAgICAgIGRlbGV0ZSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kVGhyb3dSYW5nZShjaGFyYWN0ZXIpIHtcclxuICByZXR1cm4gdGhyb3dfYmFzZV9yYW5nZSArIHBhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCkqMlxyXG59XHJcblxyXG5mdW5jdGlvbiBtZWxlZV9wZW5hbHR5KGRhdGEpIHtcclxuICBpZiAoZGF0YS5hdHRhY2tfdHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uaGFzT3duUHJvcGVydHkoXCJtZWxlZWRcIikpIHsgLy8g0LjQvdCw0YfQtSDRjdGE0YTQtdC60YIg0YPQttC1INC90LDQu9C+0LbQtdC9LCDQvdC1INC/0L7QstGC0L7RgNGP0LXQvFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gLSAxXHJcbiAgICAgIHZhciBtZWxlZWRfb2JqZWN0ID0ge31cclxuICAgICAgbWVsZWVkX29iamVjdC5jb29sZG93biA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ubWVsZWVkID0gbWVsZWVkX29iamVjdFxyXG4gICAgfVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbZGF0YS50YXJnZXRfaWRdID09IDEpIHtcclxuICAgICAgdmFyIGNvb2xkb3duID0gMVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvb2xkb3duID0gMFxyXG4gICAgfVxyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ubWVsZWVkLmNvb2xkb3duID0gY29vbGRvd25cclxuICB9XHJcbn1cclxuXHJcbi8vIFNraWxscyFcclxuXHJcbmZ1bmN0aW9uIHVzZV9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpIHtcclxuICBza2lsbF9pbmRleCA9IHBhcnNlSW50KHNraWxsX2luZGV4KVxyXG4gIHN3aXRjaChza2lsbF9pbmRleCkge1xyXG4gICAgY2FzZSAwOiAvL9Cg0YvQstC+0LpcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImNoYXJnZV91c2VyXCIpIHx8IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdLnNwZWNpYWxfdHlwZSA9PSBcInJvZ3VlXCIpKSB7XHJcbiAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE6IC8v0J/RgNC40LvQuNCyINCQ0LTRgNC10L3QsNC70LjQvdCwXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWRyZW5hbGluZV91c2VyXCIpKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMjogLy8g0J/QvtC00YDQtdC30LDRgtGMINGB0YPRhdC+0LbQuNC70LjRj1xyXG4gICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiY3V0X2xpbWJfdXNlclwiKSkge1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzogLy8g0KHQu9Cw0LHQvtC1INC80LXRgdGC0L5cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA0OiAvLyDQm9C10YfQtdC90LjQtVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNTogLy8g0JHQvtC70YzRiNC+0Lkg0LHRgNCw0YJcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA2OiAvLyDQn9C+0LTQvdGP0YLRjCDRidC40YLRi1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgfHwgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInNoaWVsZF91cFwiKSkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInNoaWVsZF91cFwiKSkge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzaGllbGRfZG93blwiXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInNoaWVsZF91cFwiXHJcbiAgICAgIH1cclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNzogLy8g0L/QvtC20LjRgNCw0L3QuNC1INGB0YPRidC90L7RgdGC0LhcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDg6IC8vINGD0LfQvdCw0YLRjCDQsdC40L7Qv9GD0LtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJiaW9wb29sXCIpKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndCw0LrQvtC/0LvQtdC90L3Ri9C5INCx0LjQvtC/0YPQuzogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmJpb3Bvb2wpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndCw0LrQvtC/0LvQtdC90L3Ri9C5INCx0LjQvtC/0YPQuyDQvtGC0YHRg9GC0YHRgtCy0YPQtdGCXCIpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA5OiAvLyDQsdC10LfRg9C/0YDQtdGH0L3QvtC1INCy0L7RgdGB0YLQsNC90L7QstC70LXQvdC40LVcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxMDogLy8g0L7QsdGL0YfQvdC+0LUg0LIg0LHQvtC90YPRgdC90L7QtVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQvtGB0L3QvtCy0L3Ri9GFINC00LXQudGB0YLQstC40LksINGH0YLQvtCx0Ysg0L/RgNC10LLRgNCw0YLQuNGC0Ywg0LIg0LHQvtC90YPRgdC90YvQtSFcIilcclxuICAgICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTE6IC8vINC+0YLQtNGL0YVcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2NoYXJhY3Rlcl9udW1iZXJdID09IDApIHtcclxuICAgICAgICAgICAgdmFyIG5ld19zdGFtaW5hID0gTWF0aC5taW4oY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0gKyByZXN0X3N0YW1pbmFfZ2Fpbiwgc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl0uc3RhbWluYV0pXHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgICB0b1NlbmQubmV3X3N0YW1pbmEgPSBuZXdfc3RhbWluYVxyXG4gICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCS0Ysg0YPQttC1INGB0L7QstC10YDRiNCw0LvQuCDQtNC10LnRgdGC0LLQuNGPINC90LAg0Y3RgtC+0Lwg0YXQvtC00YMsINGC0LDQuiDRh9GC0L4g0L3QtSDQvNC+0LbQtdGC0LUg0L7RgtC00L7RhdC90YPRgtGMXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxMjogLy8g0LPQsNC30L7QstCw0Y8g0LPRgNCw0L3QsNGC0LBcclxuICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImdhc19ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQoyDQs9GA0LDQvdCw0YLRiyDQutGD0LvQtNCw0YPQvSAo0LPQsNC3INGN0Y3RjSDQt9Cw0LLQsNGA0LjQstCw0LXRgtGB0Y8sINGF0LcpXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTM6IC8vINGB0LLQtdGC0L7RiNGD0LzQvtCy0LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwibGlnaHRfc291bmRfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQk9GA0LDQvdCw0YLQsCDQtdGJ0LUg0L3QtSDQs9C+0YLQvtCy0LBcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE0OiAvLyDQqNC+0LrQvtCy0YvQuSDQuNC80L/Rg9C70YzRgVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE1OiAvLyDQn9GL0Ykt0L/Ri9GJLdCz0L5cclxuICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwicGljaF9waWNoX3VzZXJcIikpIHtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQn9GL0Ykg0L/Ri9GJINC10YnQtSDQvdCwINC/0LXRgNC10LfQsNGA0Y/QtNC60LUhXCIpXHJcbiAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDE2OiAvLyDQodC40LvQvtCy0L7QtSDQv9C+0LvQtVxyXG4gICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImZvcmNlX2ZpZWxkX3VzZXJcIikpIHtcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0JPQtdC90LXRgNCw0YLQvtGAINGB0LjQu9C+0LLQvtCz0L4g0L/QvtC70Y8g0LXRidC1INC90LUg0LfQsNGA0Y/QtNC40LvRgdGPIVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDE3OiAvLyDQmNC90LLQuNC3XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4O1xyXG4gICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VybmFtZSA9IG15X25hbWU7XHJcbiAgICAgICAgICAgIHRvU2VuZC5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxODogLy8g0JHQvtC10LLQsNGPINGD0L3QuNCy0LXRgNGB0LDQu9GM0L3QvtGB0YLRjFxyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXg7XHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTk6IC8vINCb0LDQutC4INGI0L7RglxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIwOiAvLyDQm9C+0YLQtdGA0LXQudC90YvQuSDQstGL0YHRgtGA0LXQu1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIxOiAvL9Cf0YDQuNC70LjQsiDQtNC10LnRgdGC0LLQuNC5XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWN0aW9uX3NwbGFzaFwiKSkge1xyXG4gICAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1XCIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgdG9TZW5kLmV4dHJhX2FjdGlvbnMgPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG5cclxuICAgIGNhc2UgMjI6IC8vINCz0YDQsNC0INGD0LTQsNGA0L7QslxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAxKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQlNC70Y8g0LPRgNCw0LTQsCDRg9C00LDRgNC+0LIg0YLRgNC10LHRg9C10YLRgdGPINCx0L7Qu9GM0YjQtSAxINC+0YHQvdC+0LLQvdC+0LPQviDQtNC10LnRgdGC0LLQuNGPIVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMzogLy/QkNC00YDQtdC90LDQu9C40L3QvtCy0YvQuSDQv9C+0YLQvtC/XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJwb2lzb25vdXNfYWRyZW5hbGluZV91c2VyXCIpKSB7XHJcbiAgICAgICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtVwiKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyNDogLy8g0LrQuNGB0LvQvtGC0L3QsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhY2lkX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCjINCz0YDQsNC90LDRgtGLINC60YPQu9C00LDRg9C9ICjQutC40YHQu9C+0YLQsCDQvtC60LjRgdC70Y/QtdGC0YHRjylcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjU6IC8vINCX0LDQvNC40L3QuNGA0L7QstCw0YLRjFxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICAgICAgdG9TZW5kLnBsYXllcl9uYW1lID0gbXlfbmFtZVxyXG4gICAgICAgICAgICB0b1NlbmQucG9zaXRpb24gPSBwb3NpdGlvblxyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyNjogLy8g0J7QsdC10LfQstGA0LXQtNC40YLRjCDQvNC40L3Rg1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQrdGC0L4g0YPQvNC10L3QuNC1INGC0YDQtdCx0YPQtdGCIDEg0LHQvtC90YPRgdC90L7QtSDQtNC10LnRgdGC0LLQuNC1IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyNzogLy8g0J3QuNC60L7RgtC40L3QvtCy0YvQuSDRg9C00LDRgFxyXG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwidG9iYWNjb19zdHJpa2VcIikpIHtcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtdC70YzQt9GPINC30LDRgtGP0LPQuNCy0LDRgtGM0YHRjyDRgtCw0Log0YfQsNGB0YLQviEg0KMg0LLQsNGBINC30LDQstC40YHQuNC80L7RgdGC0YxcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyODogLy8g0JrRgNGD0YfQtdC90YvQtSDQv9GD0LvQuFxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMjk6IC8vINCf0YDQuNGG0LXQu9C40YLRjNGB0Y9cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhaW1cIikpIHtcclxuICAgICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCS0Ysg0YPQttC1INC/0YDQuNGG0LXQu9C40LvQuNGB0YwgLSDQv9C+0YDQsCDRiNC80LDQu9GP0YLRjFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzMDogLy8g0LHRi9GB0YLRgNCw0Y8g0LDRgtCw0LrQsFxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJxdWlja19hdHRhY2tfcmVhZHlcIikpIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQodC/0LXRgNCy0LAg0L3Rg9C20L3QviDRgdC+0LLQtdGA0YjQuNGC0Ywg0L7RgdC90L7QstC90YPRjiDQsNGC0LDQutGDIVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzMTogLy8g0YHQu9GD0LbQsdCwINGB0L/QsNGB0LXQvdC40Y9cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMSkgey8vINC00LLQsCDQsdC+0L3Rg9GB0L3Ri9GFXHJcbiAgICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInNhZmV0eV9zZXJ2aWNlX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDMyOiAvLyDQmtCw0LvRjNC40L3Qs9Cw0LvQu9GP0YLQvtGAXHJcbiAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiY2FsaW5nYWxhdG9yX3VzZXJcIikpIHtcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0KfRgNC10LfQvNC10YDQvdC+0LUg0LrQsNC70LjQvdCz0LDQu9C40YDQvtCy0LDQvdC40LUg0LLRgNC10LTQuNGCINCy0LDRiNC10LzRgyDQt9C00L7RgNC+0LLRjNGOISAo0LrRg9C70LTQsNGD0L0pXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDQt9C90LDQtdC8INGN0YLQviDRg9C80LXQvdC40LVcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpIHtcclxuICBzd2l0Y2goY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCkge1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICBhZHJlbmFsaW5lKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMjogLy8g0J/QvtC00YDQtdC30LDRgtGMINGB0YPRhdC+0LbQuNC70LjRj1xyXG4gICAgICBjdXRfbGltYnMoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzOiAvLyDQodC70LDQsdC+0LUg0LzQtdGB0YLQvlxyXG4gICAgICB3ZWFrX3Nwb3QoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA0OiAvLyDQm9C10YfQtdC90LjQtVxyXG4gICAgICBoZWFsKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNTogLy8g0JHQvtC70YzRiNC+0Lkg0LHRgNCw0YJcclxuICAgICAgYmlnX2JybyhpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDc6IC8vINC/0L7QttC40YDQsNC90LjQtVxyXG4gICAgICBkZXZvdXIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA5OlxyXG4gICAgICBhYnNvbHV0ZV9yZWNvdmVyeShpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDEyOlxyXG4gICAgICBnYXNfYm9tYihpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDEzOlxyXG4gICAgICBsaWdodF9zb3VuZF9ib21iKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTQ6XHJcbiAgICAgIHNob2NrX3dhdmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNTpcclxuICAgICAgcGljaF9waWNoX2dvKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTY6XHJcbiAgICAgIGZvcmNlX2ZpZWxkKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDE5OlxyXG4gICAgICBsdWNreV9zaG90KGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIwOlxyXG4gICAgICBsb3R0ZXJ5X3Nob3QoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjI6XHJcbiAgICAgIHB1bmNoX3JhaW5mYWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIzOlxyXG4gICAgICBwb2lzb25vdXNfYWRyZW5hbGluZShpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyNDpcclxuICAgICAgYWNpZF9ib21iKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI2OlxyXG4gICAgICBkaWZmdXNlX2xhbmRtaW5lKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMjg6XHJcbiAgICAgIGN1cnZlZF9idWxsZXRzKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzA6XHJcbiAgICAgIHF1aWNrX2F0dGFjayhpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDMxOlxyXG4gICAgICBzYWZldHlfc2VydmljZShpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDMyOlxyXG4gICAgICBjYWxpbmdhbGF0b3IoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYWxlcnQoXCJVbmtub3duIHRhcmdldGVkIHNraWxsXCIpXHJcbiAgfVxyXG4gIHN0b3Bfc2tpbGwoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDNcclxuICBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkID0gc2tpbGxfaW5kZXhcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gcG9zaXRpb25cclxuICBjZWxsLnNyYyA9IFwiLi9pbWFnZXMvQ2hpZG9yaS53ZWJwXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhZmV0eV9zZXJ2aWNlKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgc2FmZXR5X3NlcnZpY2VfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInNhZmV0eV9zZXJ2aWNlX3RhcmdldFwiKSkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCt0YLQsCDRhtC10LvRjCDRg9C20LUg0L/QvtC0INC30LDRidC40YLQvtC5XCIpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQt9Cw0YnQuNGJ0LDRgtGMINGBINGC0LDQutC+0LPQviDRgNCw0YHRgdGC0L7Rj9C90LjRj1wiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gd2Vha19zcG90KGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgdmFyIGludF9jaGVjayA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICBpZiAoaW50X2NoZWNrID49IHdlYWtfc3BvdF90aHJlc2hvbGQpIHtcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICB9IGVsc2Uge1xyXG4gICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gIH1cclxuXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhlYWwoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBoZWFsX3JhbmdlKSkge1xyXG5cclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciBoZWFsZXJfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gIHZhciB0YXJnZXRfaHAgPSBjaGFyYWN0ZXJfc3RhdGUuSFBbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRhcmdldF9mdWxsX2hwID0gSFBfdmFsdWVzW3RhcmdldF9jaGFyYWN0ZXIuc3RhbWluYV1cclxuICB2YXIgcmF0aW8gPSBwYXJzZUZsb2F0KHRhcmdldF9ocCkvcGFyc2VGbG9hdCh0YXJnZXRfZnVsbF9ocClcclxuXHJcbiAgdmFyIGhlYWxfcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChoZWFsZXJfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICBpZiAoaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgaGVhbF9yb2xsID0gaGVhbF9yb2xsICsgcGFyc2VJbnQoaGVhbGVyX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgfVxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQuaGVhbF9yb2xsID0gaGVhbF9yb2xsXHJcblxyXG4gIHZhciB0aHJlc2hvbGQgPSAwXHJcbiAgdmFyIGNyaXRpY2FsX3RocmVzaG9sZCA9IDBcclxuXHJcbiAgaWYgKHJhdGlvID4gMC45KSB7XHJcbiAgICB0aHJlc2hvbGQgPSAxMFxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgIHRvU2VuZC5uZXdfaHAgPSB0YXJnZXRfZnVsbF9ocFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjc1KSB7XHJcbiAgICB0aHJlc2hvbGQgPSAxNVxyXG4gICAgY3JpdGljYWxfdGhyZXNob2xkID0gMjVcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgaWYgKGhlYWxfcm9sbCA+IGNyaXRpY2FsX3RocmVzaG9sZCAmJiBoZWFsZXJfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcIm1lZFwiKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImNyaXRpY2FsIHN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSB0YXJnZXRfZnVsbF9ocFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuOTUpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC41KSB7XHJcbiAgICB0aHJlc2hvbGQgPSAyMFxyXG4gICAgY3JpdGljYWxfdGhyZXNob2xkID0gMjlcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgaWYgKGhlYWxfcm9sbCA+IGNyaXRpY2FsX3RocmVzaG9sZCAmJiBoZWFsZXJfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcIm1lZFwiKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImNyaXRpY2FsIHN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC45NSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjgyKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuMykge1xyXG4gICAgdGhyZXNob2xkID0gMjNcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDMyXHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuODIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC42MilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjE1KSB7XHJcbiAgICB0aHJlc2hvbGQgPSAyNlxyXG4gICAgY3JpdGljYWxfdGhyZXNob2xkID0gMzVcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgaWYgKGhlYWxfcm9sbCA+IGNyaXRpY2FsX3RocmVzaG9sZCAmJiBoZWFsZXJfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcIm1lZFwiKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImNyaXRpY2FsIHN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC42MilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjQpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC4wNSkge1xyXG4gICAgdGhyZXNob2xkID0gMzBcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDQwXHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjIyKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICB9XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQndGD0LbQvdC+INC/0L7QtNC+0LnRgtC4INCx0LvQuNC20LUg0Log0YbQtdC70Lgg0YfRgtC+0LHRiyDQstGL0LvQtdGH0LjRgtGMXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBiaWdfYnJvKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgYmlnX2Jyb19yYW5nZSkpIHtcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG5cclxuICB2YXIgc2hpZWxkX0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdKVxyXG4gIHZhciB0YXJnZXRfS0QgPSBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKVxyXG5cclxuICB2YXIgYm9udXNfS0QgPSBNYXRoLm1heChzaGllbGRfS0QgLSAgdGFyZ2V0X0tELCAwKVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLmJvbnVzX0tEID0gYm9udXNfS0RcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufSBlbHNlIHtcclxuICBhbGVydChcItCR0L7Qu9GM0YjQvtC5INCx0YDQsNGCINC90LUg0LTQvtGB0YLQsNC10YIg0LTQviDQvNCw0LvQvtCz0L4hXCIpXHJcbn1cclxufVxyXG5cclxuLy8gaW5jcmVhc2UgYXR0YWNrIHJvbGwgYnkgYWdpbGl0eSBib251cyAoMiptb2QpXHJcbmZ1bmN0aW9uIGN1dF9saW1icyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuICBpZiAod2VhcG9uLnR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgIHZhciBib251c19hdHRhY2sgPSAyKnBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuYWdpbGl0eSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIoaW5kZXgsIHVzZXJfcG9zaXRpb24pXHJcbiAgICB2YXIgdG9TZW5kID0gZGFtYWdlX3NraWxsX3RlbXBsYXRlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCwgYm9udXNfYXR0YWNrLCB3ZWFwb24sIGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gICAgaWYgKHRvU2VuZCA9PSBudWxsKSB7XHJcbiAgICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJmdWxsX2NyaXRcIikge1xyXG4gICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IHRvU2VuZC5kYW1hZ2Vfcm9sbFxyXG4gICAgICAgIHZhciBmbGF0X2RhbWFnZSA9IGRhbWFnZV9yb2xsIC0gc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLnN0cmVuZ3RoKV0gLSBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICB2YXIgZnVsbF9kYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgIGlmIChmbGF0X2RhbWFnZSA+IGZ1bGxfZGFtYWdlLzMpIHtcclxuICAgICAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB9ICBlbHNlIHtcclxuICAgICAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfVxyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQktGLINC90LUg0LzQvtC20LXRgtC1INC/0L7QtNGA0LXQt9Cw0YLRjCDRgdGD0YXQvtC20LjQu9GM0Y8g0Y3RgtC40Lwg0L7RgNGD0LbQuNC10LxcIilcclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gcXVpY2tfYXR0YWNrKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIGlmICh3ZWFwb24uaGFzT3duUHJvcGVydHkoXCJzdWJ0eXBlXCIpICYmIHdlYXBvbi5zdWJ0eXBlID09IFwiUFBcIikge1xyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYm9udXNfYXR0YWNrID0gcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKGluZGV4LCB1c2VyX3Bvc2l0aW9uKVxyXG4gICAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICAgIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSB0b1NlbmQuZGFtYWdlX3JvbGwvMjsgLy8g0LHRi9GB0YLRgNCw0Y8g0LDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiDQv9C+0LvQvtCy0LjQvdGDINGD0YDQvtC90LBcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCR0YvRgdGC0YDRg9GOINCw0YLQsNC60YMg0LzQvtC20L3QviDRgdC+0LLQtdGA0YjQuNGC0Ywg0YLQvtC70YzQutC+INC/0LjRgdGC0L7Qu9C10YLQvtC8LdC/0YPQu9C10LzQtdGC0L7QvFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHVuY2hfcmFpbmZhbGwoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcbiAgaWYgKHdlYXBvbi50eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJfaWQgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcl9pZF1cclxuICAgIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmFnaWxpdHkpICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgdmFyIHRvdGFsX2RhbWFnZSA9IDA7XHJcbiAgICB2YXIgYXR0YWNrc19zdWNjZXNzZnVsID0gMDtcclxuICAgIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3ZlcihpbmRleCwgdXNlcl9wb3NpdGlvbik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdOyBpKyspIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICAgICAgaWYgKHRvU2VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgICAgICAgYXR0YWNrc19zdWNjZXNzZnVsID0gYXR0YWNrc19zdWNjZXNzZnVsICsgMTtcclxuICAgICAgICAgICAgdG90YWxfZGFtYWdlID0gdG90YWxfZGFtYWdlICsgdG9TZW5kLmRhbWFnZV9yb2xsO1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyX2lkXSA9IDA7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRvU2VuZC5vdXRjb21lID09IFwiZXZhZGVkXCIgJiYgdGFyZ2V0X2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgIT0gXCJyb2d1ZVwiKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJfaWRdID0gMDtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBtdWx0aXBseWVyID0gMS4wICsgcGFyc2VGbG9hdChhdHRhY2tzX3N1Y2Nlc3NmdWwgLSAxKS8yLjBcclxuICAgIHZhciBtZXNzYWdlID0gXCLQnNC90L7QttC40YLQtdC70Ywg0LPRgNCw0LTQsCDQsdGL0Ls6IFwiICsgbXVsdGlwbHllclxyXG4gICAgY29uc29sZS5sb2cobWVzc2FnZSlcclxuICAgIHZhciBmaW5hbF9kYW1hZ2UgPSBwYXJzZUludChwYXJzZUZsb2F0KHRvdGFsX2RhbWFnZSkqbXVsdGlwbHllcilcclxuXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcl9pZFxyXG4gICAgdG9TZW5kLnRvdGFsX2F0dGFja3MgPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdG9TZW5kLnN1Y2Nlc3NmdWxsX2F0dGFja3MgPSBhdHRhY2tzX3N1Y2Nlc3NmdWxcclxuICAgIHRvU2VuZC5kYW1hZ2UgPSBmaW5hbF9kYW1hZ2VcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQk9GA0LDQtCDRg9C00LDRgNC+0LIg0LzQvtC20L3QviDRgdC+0LLRgNC10YjQuNGC0Ywg0YLQvtC70YzQutC+INGA0YPQutC+0L/QsNGI0L3Ri9C8INC+0YDRg9C20LjQtdC8IVwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvY2tfd2F2ZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgYm9udXNfYXR0YWNrID0gcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3ZlcihpbmRleCwgdXNlcl9wb3NpdGlvbik7XHJcbiAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImZ1bGxfY3JpdFwiKSB7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGV2b3VyKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgMSkpIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgc3RhY2tzID0gMFxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiTWFya3VzX3N0YWNrc1wiKSkge1xyXG4gICAgICBzdGFja3MgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5NYXJrdXNfc3RhY2tzXHJcbiAgICB9XHJcbiAgICB2YXIgZGFtYWdlID0gc3RhY2tzKjUgKyByb2xsX3goMTApXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFic29sdXRlX3JlY292ZXJ5KGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgMSkpIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgaGVhbF9hbW91bnQgPSAwXHJcblxyXG4gICAgdmFyIGRhbWFnZV9maWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFtYWdlX2ZpZWxkXCIpO1xyXG4gICAgaWYgKCEoZGFtYWdlX2ZpZWxkLnZhbHVlID09PSBcIlwiKSkge1xyXG4gICAgICBoZWFsX2Ftb3VudCA9IHBhcnNlSW50KGRhbWFnZV9maWVsZC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJpb3Bvb2wgPSAwXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYmlvcG9vbFwiKSkge1xyXG4gICAgICBiaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmJpb3Bvb2xcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaGVhbF9hbW91bnQgPiAwICYmIGJpb3Bvb2wgPj0gaGVhbF9hbW91bnQpIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHRvU2VuZC5oZWFsX2Ftb3VudCA9IGhlYWxfYW1vdW50XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC10LLQvtC30LzQvtC20L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LvQtdGH0LXQvdC40Y9cIilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2FzX2JvbWIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0aHJvd19yYW5nZSA9IGZpbmRUaHJvd1JhbmdlKGNoYXJhY3RlcilcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB0aHJvd19yYW5nZSkpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHRvU2VuZC50aHJlc2hvbGQgPSBnYXNfYm9tYl90aHJlc2hvbGRcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7Ly8g0LDQvdC40LzQsNGG0LjRjyDRgtC+0LvRjNC60L4g0LIg0L/Rg9GB0YLRg9GOINC60LvQtdGC0LrRg1xyXG4gICAgICBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgZ2FzX2JvbWJfb2JzdGFjbGUpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JzQsNC70L4g0LrQsNGI0Lgg0LXQu9C4INC00LvRjyDRgtCw0LrQvtCz0L4g0LHRgNC+0YHQutCwXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYWxpbmdhbGF0b3IoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7Ly8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YLRgdGPINGC0L7Qu9GM0LrQviDQsiDQv9GD0YHRgtGD0Y4g0LrQu9C10YLQutGDXHJcbiAgICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBjYWxpbmdhbGF0b3JfcmFuZ2UpKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgICAgYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIGNhbGluZ2FsYXRvcl9vYnN0YWNsZSlcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCa0LDQu9GM0LjQvdCz0LDQu9C70Y/RgtC+0YAg0LzQvtC20L3QviDRg9GB0YLQsNC90L7QstC40YLRjCDQu9C40YjRjCDQsiDQv9GA0LXQtNC10LvQsNGFIDEuNSDQutC70LXRgtC60Lgg0L7RgiDQstCw0YFcIilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQmtCw0LvRjNC40L3Qs9Cw0LvQu9GP0YLQvtGAINC80L7QttC90L4g0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0LvQuNGI0Ywg0LIg0L/Rg9GB0YLRg9GOINC60LvQtdGC0LrRg1wiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGlmZnVzZV9sYW5kbWluZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cykpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJlbXB0eVwiXHJcblxyXG4gICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhpbmRleCkpIHtcclxuICAgICAgdmFyIHJvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoY2hhcmFjdGVyLmludGVsbGlnZW5jZSlcclxuICAgICAgaWYgKHJvbGwgPiBsYW5kbWluZV9kaWZmdXNlX3RocmVzaG9sZCkge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCh0LvQuNGI0LrQvtC8INC00LDQu9C10LrQviDQtNC70Y8g0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0LjRj1wiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWNpZF9ib21iKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGhyb3dfcmFuZ2UgPSBmaW5kVGhyb3dSYW5nZShjaGFyYWN0ZXIpXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgdGhyb3dfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQnNCw0LvQviDQutCw0YjQuCDQtdC70Lgg0LTQu9GPINGC0LDQutC+0LPQviDQsdGA0L7RgdC60LBcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpZ2h0X3NvdW5kX2JvbWIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgbGlnaHRfc291bmRfYm9tYl9yYW5nZSkpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuXHJcbiAgdmFyIGNoYXJhY3Rlcl9saXN0ID0gW11cclxuICB2YXIgb3V0Y29tZV9saXN0ID0gW11cclxuXHJcbiAgdmFyIHJhZGl1cyA9IGxpZ2h0X3NvdW5kX2JvbWJfcmFkaXVzXHJcblxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhZGl1cylcclxuICBjb25zb2xlLmxvZyhjYW5kaWRhdGVfY2VsbHMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0LHQvtC80LHRi1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlICE9PSBcImRyb25lXCIpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfbGlzdC5wdXNoKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIHZhciBzYXZlX3JvbGwgPSByb2xsX3goMjApICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gKyBwYXJzZUludChjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gICAgICAgIGlmIChzYXZlX3JvbGwgPiBsaWdodF9zb3VuZF9ib21iX3RocmVzaG9sZCkge1xyXG4gICAgICAgICAgb3V0Y29tZV9saXN0LnB1c2goMClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb3V0Y29tZV9saXN0LnB1c2goMSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9saXN0ID0gY2hhcmFjdGVyX2xpc3RcclxuICB0b1NlbmQub3V0Y29tZV9saXN0ID0gb3V0Y29tZV9saXN0XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59IGVsc2Uge1xyXG4gIGFsZXJ0KFwi0JTRgNC+0L0g0L3QtSDQtNC+0LrQuNC90LXRglwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcmNlX2ZpZWxkKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGZvcmNlX2ZpZWxkX3JhbmdlKSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG5cclxuICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgdmFyIHNoaWVsZCA9IE1hdGguY2VpbChwYXJzZUZsb2F0KEhQX3ZhbHVlc1t1c2VyLnN0YW1pbmFdKS8yKVxyXG4gIHRvU2VuZC5zaGllbGQgPSBzaGllbGRcclxuXHJcbiAgdmFyIGNoYXJhY3Rlcl9saXN0ID0gW11cclxuXHJcbiAgdmFyIHJhZGl1cyA9IGZvcmNlX2ZpZWxkX3JhZGl1c1xyXG5cclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gaW5kZXhfaW5fcmFkaXVzKGluZGV4LCByYWRpdXMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0YnQuNGC0LBcclxuICAgICAgICBjaGFyYWN0ZXJfbGlzdC5wdXNoKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgfVxyXG4gIH1cclxuICB0b1NlbmQuY2VsbHNfcHJvdGVjdGVkID0gY2FuZGlkYXRlX2NlbGxzXHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9saXN0ID0gY2hhcmFjdGVyX2xpc3RcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIGZvcmNlX2ZpZWxkX29ic3RhY2xlKVxyXG59IGVsc2Uge1xyXG4gIGFsZXJ0KFwi0JPQtdC90LXRgNCw0YLQvtGAINC00L7Qu9C20LXQvSDQsdGL0YLRjCDRg9GB0YLQsNC90L7QstC70LXQvSDQv9C+0LHQu9C40LbQtVwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkcmVuYWxpbmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciBhZHJlbmFsaW5lX3JhbmdlID0gMVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGFkcmVuYWxpbmVfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaW5kZXggPSB0YXJnZXRfbnVtYmVyXHJcbiAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IHJvbGxfeCg0KVxyXG4gICAgdmFyIG1pbnVzX2FjdGlvbnMgPSByb2xsX3goNClcclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgdG9TZW5kLm1pbnVzX2FjdGlvbnMgPSBtaW51c19hY3Rpb25zXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcG9pc29ub3VzX2FkcmVuYWxpbmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHBvaXNvbm91c19hZHJlbmFsaW5lX3JhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2luZGV4ID0gdGFyZ2V0X251bWJlclxyXG4gICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBbXVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbjsgaSsrKSB7XHJcbiAgICAgIGV4dHJhX2FjdGlvbnMucHVzaChyb2xsX3goNCkpXHJcbiAgICB9XHJcbiAgICB0b1NlbmQuZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnNcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCg0LDQtNC40YPRgSDQsNC00YDQtdC90LDQu9C40L3QsCAxINC60LvQtdGC0LrQsCFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBpY2hfcGljaF9nbyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfbnVtYmVyXVxyXG4gIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlID09IFwiZHJvbmVcIikge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2luZGV4ID0gdGFyZ2V0X251bWJlclxyXG4gICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBNYXRoLmNlaWwocGFyc2VGbG9hdCh1c2VyLmludGVsbGlnZW5jZSkvMilcclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQv9GL0Ykt0L/Ri9GJINC60L7Qs9C+INC/0L7Qv9Cw0LvQviFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGx1Y2t5X3Nob3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbF94KDEwKVxyXG4gICAgaWYgKHRvU2VuZC5yb2xsID09IDcpIHtcclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IHJvbGxfeCg3KVxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb3R0ZXJ5X3Nob3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbF94KDEwMClcclxuICAgIGlmICh0b1NlbmQucm9sbCA9PSA3KSB7XHJcbiAgICAgIHZhciBkYW1hZ2UgPSAwXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KDcpXHJcbiAgICAgIH1cclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZVxyXG4gICAgfSBlbHNlIGlmICh0b1NlbmQucm9sbCA9PSA3Nykge1xyXG4gICAgICB2YXIgZGFtYWdlID0gMFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE0OyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3goNylcclxuICAgICAgfVxyXG4gICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGN1cnZlZF9idWxsZXRzKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7XHJcbiAgICBib251c19hdHRhY2sgPSBib251c19hdHRhY2sgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSk7XHJcbiAgfVxyXG4gIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3ZlcihpbmRleCwgdXNlcl9wb3NpdGlvbik7XHJcbiAgYWNjdW11bGF0ZWRfY292ZXIgPSBNYXRoLm1heChwYXJzZUludChwYXJzZUZsb2F0KGFjY3VtdWxhdGVkX2NvdmVyKS8yKSAtIDIsIDApXHJcbiAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSkge1xyXG4gICAgICB0b1NlbmQuYWltX292ZXIgPSAxO1xyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBoZWxwZXIgZnVuY3Rpb24gcGF0dGVybnNcclxuZnVuY3Rpb24gY2hlY2tfY29vbGRvd24oY2hhcmFjdGVyX251bWJlciwgZWZmZWN0LCBtZXNzYWdlKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoZWZmZWN0KSkge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl1bZWZmZWN0XS5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdW2VmZmVjdF1cclxuICAgICAgaWYgKG1lc3NhZ2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXVtlZmZlY3RdLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXVtlZmZlY3RdLmNvb2xkb3duIC0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8g0L/RgNC+0Log0LPQsNC30L7QstC+0Lkg0LPRgNCw0L3QsNGC0YtcclxuZnVuY3Rpb24gYXBwbHlfYm9tYihwb3NpdGlvbiwgcmFkaXVzKSB7XHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhwb3NpdGlvbiwgcmFkaXVzKVxyXG4gIC8vY29uc29sZS5sb2coY2FuZGlkYXRlX2NlbGxzKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NhbmRpZGF0ZV9jZWxsc1tpXV1cclxuICAgIGlmICh0YXJnZXRfY2hhcmFjdGVyX251bWJlciA+IDApIHsvLyDQv9C10YDRgdC+0L3QsNC2INCyINGA0LDQtNC40YPRgdC1INCx0L7QvNCx0YtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC/0LDQtNCw0LXRgiDQv9C+0LQg0LTQtdC50YHRgtCy0LjQtSDQs9Cw0LfQvtCy0L7QuSDQsdC+0LzQsdGLXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCArIDFcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgZ2FzX2JvbWJfcG9pc29uX29iamVjdCA9IHt9XHJcbiAgICAgICAgZ2FzX2JvbWJfcG9pc29uX29iamVjdC5wb2lzb25fbGV2ZWwgPSAxXHJcbiAgICAgICAgZ2FzX2JvbWJfcG9pc29uX29iamVjdC50aHJlc2hvbGQgPSBnYXNfYm9tYl90aHJlc2hvbGRcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5nYXNfYm9tYl9wb2lzb24gPSBnYXNfYm9tYl9wb2lzb25fb2JqZWN0XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSAtIDFcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseV9jYWxpbmdhbGF0b3IocG9zaXRpb24sIHJhZGl1cywgZmxhdF9oZWFsLCByb2xsX2hlYWwpIHtcclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gaW5kZXhfaW5fcmFkaXVzKHBvc2l0aW9uLCByYWRpdXMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0LTQu9GPINC+0YLRhdC40LvQsFxyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIHZhciByb2xsZWRfaGVhbCA9IGZsYXRfaGVhbCArIHJvbGxfeChyb2xsX2hlYWwpO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gTWF0aC5taW4oY2hhcmFjdGVyX3N0YXRlLkhQW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSArIHJvbGxlZF9oZWFsLCBIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKTtcclxuICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCy0LTRi9GF0LDQtdGCINGG0LXQu9C10LHQvdGL0LUg0L/QsNGA0Ysg0Lgg0LLQvtGB0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCIFwiICsgcm9sbGVkX2hlYWwgKyBcIiDRhdC/LlwiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5X2FjaWRfYm9tYihwb3NpdGlvbiwgcmFkaXVzKSB7XHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhwb3NpdGlvbiwgcmFkaXVzKVxyXG4gIC8vY29uc29sZS5sb2coY2FuZGlkYXRlX2NlbGxzKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NhbmRpZGF0ZV9jZWxsc1tpXV1cclxuICAgIGlmICh0YXJnZXRfY2hhcmFjdGVyX251bWJlciA+IDApIHsvLyDQv9C10YDRgdC+0L3QsNC2INCyINGA0LDQtNC40YPRgdC1INCx0L7QvNCx0YtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC/0LDQtNCw0LXRgiDQv9C+0LQg0LTQtdC50YHRgtCy0LjQtSDQutC40YHQu9C+0YLQvdC+0Lkg0LPRgNCw0L3QsNGC0YtcIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFjaWRfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uID0gYWNpZF9ib21iX2R1cmF0aW9uXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGFjaWRfYm9tYl9wb2lzb25fb2JqZWN0ID0ge31cclxuICAgICAgICBhY2lkX2JvbWJfcG9pc29uX29iamVjdC5kdXJhdGlvbiA9IGFjaWRfYm9tYl9kdXJhdGlvblxyXG4gICAgICAgIHZhciBLRF9jaGFuZ2UgPSBwYXJzZUludChjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpLzIpXHJcbiAgICAgICAgYWNpZF9ib21iX3BvaXNvbl9vYmplY3QuYm9udXNfS0QgPSBLRF9jaGFuZ2VcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5hY2lkX2JvbWJfcG9pc29uID0gYWNpZF9ib21iX3BvaXNvbl9vYmplY3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSAtIEtEX2NoYW5nZVxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvY2tlZF9lZmZlY3QodGFyZ2V0KSB7XHJcbiAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uaGFzT3duUHJvcGVydHkoXCJzaG9ja2VkXCIpKSB7XHJcbiAgICB2YXIgc2hvY2tlZF9vYmplY3QgPSB7fVxyXG4gICAgc2hvY2tlZF9vYmplY3QuY29vbGRvd24gPSBzaG9ja2VkX2Nvb2xkb3duXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uc2hvY2tlZCA9IHNob2NrZWRfb2JqZWN0XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVt0YXJnZXRdID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbdGFyZ2V0XSAtIDFcclxuICB9IGVsc2Uge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRdLnNob2NrZWQuY29vbGRvd24gPSBzaG9ja2VkX2Nvb2xkb3duXHJcbiAgfVxyXG59XHJcblxyXG4vLyBNb3JlIGdtIGNvbnRyb2wgYWN0aW9uc1xyXG5cclxuZnVuY3Rpb24gbWlycm9yX2JvYXJkKCkge1xyXG4gIHZhciBsZWZ0X2luZGV4O1xyXG4gIHZhciByaWdodF9pbmRleDtcclxuICB2YXIgdGVtcDtcclxuICB2YXIgbGVmdF9jZWxsO1xyXG4gIHZhciByaWdodF9jZWxsO1xyXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgZ2FtZV9zdGF0ZS5zaXplOyB5KyspIHtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgZ2FtZV9zdGF0ZS5zaXplLzI7IHgrKykge1xyXG5cclxuICAgICAgbGVmdF9pbmRleCA9IHkqZ2FtZV9zdGF0ZS5zaXplICsgeDtcclxuICAgICAgcmlnaHRfaW5kZXggPSB5KmdhbWVfc3RhdGUuc2l6ZSArIHBhcnNlSW50KGdhbWVfc3RhdGUuc2l6ZSkgLSB4IC0gMTtcclxuICAgICAgLy9jb25zb2xlLmxvZygneTogJyArIHkgKyAnIHg6ICcgKyB4ICsgJyBsZWZ0IGluZGV4OiAnICsgbGVmdF9pbmRleCArICcgcmlnaHQgaW5kZXg6ICcgKyByaWdodF9pbmRleCk7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgbGVmdF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGxlZnRfaW5kZXgpO1xyXG4gICAgICByaWdodF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHJpZ2h0X2luZGV4KTtcclxuXHJcbiAgICAgIHRlbXAgPSBsZWZ0X2NlbGwuc3JjO1xyXG4gICAgICBsZWZ0X2NlbGwuc3JjID0gcmlnaHRfY2VsbC5zcmM7XHJcbiAgICAgIHJpZ2h0X2NlbGwuc3JjID0gdGVtcDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN5bmNfYm9hcmQoKSB7XHJcbiAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IHtcclxuICAgIGdhbWVfc3RhdGU6IGdhbWVfc3RhdGUsXHJcbiAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbzogY2hhcmFjdGVyX2RldGFpbGVkX2luZm8sXHJcbiAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvOiBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvLFxyXG4gICAgY2hhcmFjdGVyX3N0YXRlOiBjaGFyYWN0ZXJfc3RhdGVcclxuICB9O1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc3luY19ib2FyZCc7XHJcbiAgdG9TZW5kLmZ1bGxfZ2FtZV9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93X2xhbmRtaW5lcygpIHtcclxuICB2YXIgbGFuZG1pbmVzX2FycmF5ID0gZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYW5kbWluZXNfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X21pbmUgPSBsYW5kbWluZXNfYXJyYXlbaV1cclxuICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW2N1cnJlbnRfbWluZV0uaW5jbHVkZXMobXlfbmFtZSkpIHtcclxuICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgY3VycmVudF9taW5lKTtcclxuICAgICAgY2VsbC5zcmMgPSBcIi9pbWFnZXMvbGFuZG1pbmUuamZpZlwiXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhcl9jaGFyYWN0ZXJfc3RhdGUoKSB7XHJcbiAgY2hhcmFjdGVyX3N0YXRlID0gQ0hBUkFDVEVSX1NUQVRFX0NPTlNUQU5UXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyX2NoYXJhY3RlcihudW1iZXIpIHtcclxuICAvL2NoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLkhQW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbbnVtYmVyXSA9IHt9XHJcbiAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbbnVtYmVyXSA9IG51bGxcclxufVxyXG5cclxuZnVuY3Rpb24gd19vbmNsaWNrKCkge1xyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIiB8fCBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRdID09IDEpIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPT0gMSkge1xyXG4gICAgICB1bmRvX3NlbGVjdGlvbigpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICAgICAgdmFyIGNlbGwgPSBjaGFyYWN0ZXJfY2hvc2VuLmNlbGxcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl90b19tb3ZlKGluZGV4LCBjZWxsKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFfb25jbGljaygpIHtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIgfHwgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXSA9PSAxKSB7XHJcblxyXG4gICAgaWYgKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9PSAyKSB7XHJcbiAgICAgIHN0b3BfYXR0YWNrKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgICAgIHZhciBjZWxsID0gY2hhcmFjdGVyX2Nob3Nlbi5jZWxsXHJcbiAgICAgIHZhciBtYWluX2FjdGlvbnNfbGVmdCA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICBpZiAobWFpbl9hY3Rpb25zX2xlZnQgPiAwKSB7XHJcbiAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl90b19hdHRhY2soY2VsbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCjINCy0LDRgSDQvdC1INC+0YHRgtCw0LvQvtGB0Ywg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY29tcGFyZV9pbml0aWF0aXZlKGEsYikge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVthXSA8IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2JdKSB7XHJcbiAgICByZXR1cm4gMTtcclxuICB9IGVsc2UgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2FdID09IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2JdKSB7XHJcbiAgICByZXR1cm4gMDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIC0xO1xyXG4gIH1cclxufVxyXG5cclxuLy9zb2NrZXQuaW5pdCgnd3M6Ly9sb2NhbGhvc3Q6MzAwMScpO1xyXG5zb2NrZXQuaW5pdChTRVJWRVJfQUREUkVTUyk7XHJcblxyXG5zb2NrZXQucmVnaXN0ZXJPcGVuSGFuZGxlcigoKSA9PiB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3BsYXllcl9pbmZvJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb2xlID0gbXlfcm9sZTtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICB0b1NlbmQucGFzc3dvcmQgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2dtX3Bhc3N3b3JkJykpO1xyXG4gIH1cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufSk7XHJcblxyXG5zb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcigoZGF0YSkgPT4ge1xyXG4gIC8vY29uc29sZS5sb2coZGF0YSk7XHJcbiAgaWYgKCgoZGF0YS50b19uYW1lID09IG15X25hbWUpIHx8IChkYXRhLnRvX25hbWUgPT0gJ2FsbCcpKSAmJiAoZGF0YS5yb29tX251bWJlciA9PSBteV9yb29tKSkge1xyXG4gICAgaWYgKGRhdGEuY29tbWFuZCA9PSAncGxheWVyX2luZm9fcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmlzVmFsaWQgPT0gMCkge1xyXG4gICAgICAgIGFsZXJ0KCfQotCwINC60LDQutC+0Lkg0YLRiyDQs9C8Jyk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF0YS5yb2xlID09ICdnbScpIHtcclxuICAgICAgICBjcmVhdGVfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBzYXZlX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgbG9hZF9ib2FyZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHJvbGxfaW5pdGlhdGl2ZV9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIGZvZ19idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHpvbmVfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBzYXZlX25hbWVfaW5wdXQuc2hvdygpO1xyXG4gICAgICAgIGJvYXJkX3NpemVfaW5wdXQuc2hvdygpO1xyXG4gICAgICAgIG1pcnJvcl9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIG5leHRfcm91bmRfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBiYXR0bGVfbW9kX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgc3luY19idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVzX3NlbGVjdC5zaG93KCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlO1xyXG4gICAgICAgICAgICAvLyBxXHJcbiAgICAgICAgICAgIGlmKGtleUNvZGUgPT0gODEpIHtcclxuICAgICAgICAgICAgICAgIGZvZ01vZGVDaGFuZ2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09IDg3KSB7IC8vIHdcclxuICAgICAgICAgICAgICB3X29uY2xpY2soKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT0gNjUpIHsgLy8gYVxyXG4gICAgICAgICAgICAgIGFfb25jbGljaygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfbGlzdDtcclxuICAgICAgZ3JvdXBfbGlzdCA9IGRhdGEuY2hhcmFjdGVyX2dyb3VwX2xpc3Q7XHJcbiAgICAgIG9ic3RhY2xlX2xpc3QgPSBkYXRhLm9ic3RhY2xlX2xpc3Q7XHJcbiAgICAgIHdlYXBvbl9saXN0ID0gZGF0YS53ZWFwb25fbGlzdFxyXG4gICAgICB3ZWFwb25fZGV0YWlsZWRfaW5mbyA9IGRhdGEud2VhcG9uX2RldGFpbGVkX2luZm9cclxuICAgICAgc2tpbGxfZGV0YWlsZWRfaW5mbyA9IGRhdGEuc2tpbGxfZGV0YWlsZWRfaW5mb1xyXG4gICAgICBza2lsbF9saXN0ID0gZGF0YS5za2lsbF9saXN0XHJcbiAgICAgIHNhdmVzX2xpc3QgPSBkYXRhLnNhdmVzX2xpc3RcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2F2ZXNfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBjdXJyZW50X29wdGlvbiA9ICQoXCI8b3B0aW9uPlwiKTtcclxuICAgICAgICBjdXJyZW50X29wdGlvbi50ZXh0KHNhdmVzX2xpc3RbaV0pO1xyXG4gICAgICAgIGN1cnJlbnRfb3B0aW9uLnZhbChzYXZlc19saXN0W2ldKTtcclxuICAgICAgICBzYXZlc19zZWxlY3QuYXBwZW5kKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdjb25zdHJ1Y3RfYm9hcmRfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNsZWFyX2NoYXJhY3Rlcl9zdGF0ZSgpXHJcbiAgICAgIGNvbnN0cnVjdF9ib2FyZChkYXRhLmdhbWVfc3RhdGUpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2FkZF9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZGF0YS5jZWxsX2lkXSA9IGRhdGEuY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGRhdGEuY2hhcmFjdGVyX2luZm87XHJcbiAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXI7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuY2VsbF9pZF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBkYXRhLmNlbGxfaWQpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKGRhdGEuY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBib251c19hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBtYWluX2FjdGlvbl9tYXBbY2hhcmFjdGVyLmFnaWxpdHldO1xyXG4gICAgICBhc3NpZ25fbW92ZXMoZGF0YS5jaGFyYWN0ZXJfbnVtYmVyKTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlci5hZ2lsaXR5O1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXIuS0RfcG9pbnRzO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDA7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDE7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDA7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBcImFsbFwiO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlci5pbnZlbnRvcnlbMF1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSB7fVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGRhdGEuY2VsbF9pZDtcclxuICAgICAgaWYgKGNoYXJhY3Rlci5oYXNPd25Qcm9wZXJ0eShcImV2YWRlX2JvbnVzXCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUludChjaGFyYWN0ZXIuZXZhZGVfYm9udXMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlci5oYXNPd25Qcm9wZXJ0eShcIm1lbGVlX3Jlc2lzdFwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9yZXNpc3RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyLm1lbGVlX3Jlc2lzdCkvMTAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9yZXNpc3RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDAuMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlci5oYXNPd25Qcm9wZXJ0eShcImJ1bGxldF9yZXNpc3RcIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYnVsbGV0X3Jlc2lzdFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gcGFyc2VGbG9hdChjaGFyYWN0ZXIuYnVsbGV0X3Jlc2lzdCkvMTAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5idWxsZXRfcmVzaXN0W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwLjA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vINCw0LrRgtC40LLQsNGG0LjRjyDQv9Cw0YHRgdC40LLQvtC6XHJcbiAgICAgIGlmIChjaGFyYWN0ZXIuaGFzT3duUHJvcGVydHkoXCJhZGFwdGl2ZV9maWdodGluZ1wiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5hZGFwdGl2ZV9maWdodGluZyA9IC0xO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdhZGRfb2JzdGFjbGVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBvYnN0YWNsZSA9IGRhdGEub2JzdGFjbGVfaW5mbztcclxuICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tkYXRhLm9ic3RhY2xlX251bWJlcl0gPSBvYnN0YWNsZTtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZGF0YS5jZWxsX2lkXSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGRhdGEuY2VsbF9pZCk7XHJcbiAgICAgICAgY2VsbC5zcmMgPSBvYnN0YWNsZS5hdmF0YXI7XHJcbiAgICAgIH1cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmNlbGxfaWRdID0gZGF0YS5vYnN0YWNsZV9udW1iZXIgKiAoLTEpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ21vdmVfY2hhcmFjdGVyX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgdG9faW5kZXggPSBkYXRhLnRvX2luZGV4O1xyXG4gICAgICB2YXIgZnJvbV9pbmRleCA9IGRhdGEuZnJvbV9pbmRleDtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVt0b19pbmRleF0gPSBkYXRhLmNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gdG9faW5kZXg7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuaW52aXNpYmlsaXR5X2VuZGVkX2lkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGlkID0gZGF0YS5pbnZpc2liaWxpdHlfZW5kZWRfaWRbaV07XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtpZF0gPSBcImFsbFwiO1xyXG5cclxuICAgICAgICB2YXIgcG9zaXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25baWRdO1xyXG4gICAgICAgIHZhciB0b19jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHBvc2l0aW9uKTtcclxuICAgICAgICB2YXIgYXZhdGFyID0gZ2V0X29iamVjdF9waWN0dXJlKGlkKTtcclxuICAgICAgICB0b19jZWxsLnNyYyA9IGF2YXRhcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgICAgIGlmICghY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwibGFuZG1pbmVfaW1tdW5lXCIpKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLm1pbmVzX2V4cGxvZGVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgbWluZV9wb3NpdGlvbiA9IGRhdGEubWluZXNfZXhwbG9kZWRbaV1cclxuICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIG1pbmVfcG9zaXRpb24pO1xyXG4gICAgICAgICAgY2VsbC5zcmMgPSBmb2dPclBpYyhtaW5lX3Bvc2l0aW9uKVxyXG4gICAgICAgICAgdmFyIGluZGV4ID0gZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluZGV4T2YobWluZV9wb3NpdGlvbilcclxuICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5zcGxpY2UoaW5kZXgsMSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbbWluZV9wb3NpdGlvbl0gPSBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubWluZXNfZGFtYWdlID4gMCkge1xyXG4gICAgICAgICAgZXhwbG9zaW9uX2F1ZGlvLnBsYXkoKTtcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLmNoYXJhY3Rlcl9udW1iZXIsIGRhdGEubWluZXNfZGFtYWdlKVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0L7QtNGA0YvQstCw0LXRgtGB0Y8g0L3QsCDQvNC40L3QsNGFINC/0L7Qu9GD0YfQsNGPIFwiICsgZGF0YS5taW5lc19kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyByZW1vdmUgc2hpZWxkZWQgcHJvcGVydHkgZnJvbSBjaGFyYWN0ZXIgYW5kIHJlbW92ZSBjaGFyYWN0ZXIgZnJvbSBzaGllbGRlZCBsaXN0XHJcbiAgICAgIGlmIChkYXRhLmxlZnRfc2hpZWxkID09IDEpIHtcclxuICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldFxyXG4gICAgICAgIHZhciBpbmRleCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2RhdGEuc2hpZWxkX2luZGV4XS5jaGFyYWN0ZXJfbGlzdC5pbmRleE9mKGRhdGEuY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tkYXRhLnNoaWVsZF9pbmRleF0uY2hhcmFjdGVyX2xpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDE7XHJcblxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIHN0YW1pbmFfbW92ZV9jb3N0XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIHBhcnNlRmxvYXQoZGF0YS5kaXN0YW5jZSlcclxuICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwic25pcGVyXCIpIHtcclxuICAgICAgICAgIHZhciBlZmZlY3RzX29iamVjdCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgaWYgKGVmZmVjdHNfb2JqZWN0Lmhhc093blByb3BlcnR5KFwic25pcGVyX3Bhc3NpdmVcIikpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRfYXR0YWNrX2JvbnVzID0gZWZmZWN0c19vYmplY3Quc25pcGVyX3Bhc3NpdmUuYXR0YWNrX2JvbnVzXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50X2RhbWFnZV9ib251cyA9IGVmZmVjdHNfb2JqZWN0LnNuaXBlcl9wYXNzaXZlLmRhbWFnZV9ib251c1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBjdXJyZW50X2F0dGFja19ib251cyAtIDVcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gY3VycmVudF9kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdLnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251cyA9IC01XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc25pcGVyX3Bhc3NpdmVfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmF0dGFja19ib251cyA9IC01XHJcbiAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZSA9IHNuaXBlcl9wYXNzaXZlX29iamVjdFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSA1XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoISgoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbdG9faW5kZXhdID09IDEpKSB8fCAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdICE9IFwiYWxsXCIgJiYgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdICE9IG15X25hbWUpKSkge1xyXG4gICAgICAgIHZhciB0b19jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHRvX2luZGV4KTtcclxuICAgICAgICB0b19jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShkYXRhLmNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2Zyb21faW5kZXhdID0gMDtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZnJvbV9pbmRleF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZnJvbV9pbmRleCk7XHJcbiAgICAgICAgb2xkX2NlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdkZWxldGVfY2hhcmFjdGVyX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShcImNoYXJhY3Rlcl9udW1iZXJcIikpIHtcclxuICAgICAgICBjbGVhcl9jaGFyYWN0ZXIoZGF0YS5jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICB9XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZGF0YS5pbmRleF0gPSAwO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtkYXRhLmluZGV4XSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBkYXRhLmluZGV4KTtcclxuICAgICAgICBjZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAncm9sbF9pbml0aWF0aXZlX3Jlc3BvbnNlJykge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZSA9IGRhdGEuaW5pdGlhdGl2ZV9zdGF0ZTtcclxuICAgICAgdmFyIG9yZGVyZWRfYXJyYXkgPSBbXVxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5IUFtpXSA+IDApIHsvLyBjaGFyYWN0ZXIgaXMgcHJlc2VudFxyXG4gICAgICAgICAgb3JkZXJlZF9hcnJheS5wdXNoKGkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIG9yZGVyZWRfYXJyYXkuc29ydChjb21wYXJlX2luaXRpYXRpdmUpO1xyXG4gICAgICBpbml0aWF0aXZlX29yZGVyX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3JkZXJlZF9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tvcmRlcmVkX2FycmF5W2ldXVxyXG4gICAgICAgIHZhciBxdWVyeV9zdHJpbmcgPSAnPGltZz4gaWQ9XCJpbml0aWF0aXZlX2ltYWdlXycgKyBpICsgJ1wiJ1xyXG4gICAgICAgIHZhciBpbWcgPSAkKHF1ZXJ5X3N0cmluZylcclxuICAgICAgICBpbWcuYXR0cignc3JjJywgY2hhcmFjdGVyLmF2YXRhcik7XHJcbiAgICAgICAgaW1nLmF0dHIoJ2hlaWdodCcsICc1MHB4Jyk7XHJcbiAgICAgICAgaW1nLmF0dHIoJ3dpZHRoJywgJzUwcHgnKTtcclxuICAgICAgICBpbWcuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgcG9zaXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25bb3JkZXJlZF9hcnJheVtpXV1cclxuICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHBvc2l0aW9uKTtcclxuICAgICAgICAgIC8vc2VsZWN0X2NoYXJhY3Rlcihwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIG5vX3NoaWZ0X29uY2xpY2sobXlfcm9sZSwgZ21fY29udHJvbF9tb2QsIGdhbWVfc3RhdGUsIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcywgY2VsbCwgcG9zaXRpb24pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpbWcuYXBwZW5kVG8oaW5pdGlhdGl2ZV9vcmRlcl9jb250YWluZXIpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdkZWFsX2RhbWFnZV9yZXNwb25zZScpIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIGRhdGEuZGFtYWdlO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NhdmVfZ2FtZV9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgYWxlcnQoJ0dhbWUgJyArIGRhdGEuc2F2ZV9uYW1lICsgJyBzYXZlZCBzdWNjZXNmdWxseScpO1xyXG4gICAgICAgIHNhdmVzX2xpc3QucHVzaChkYXRhLnNhdmVfbmFtZSk7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gJChcIjxvcHRpb24+XCIpO1xyXG4gICAgICAgIGN1cnJlbnRfb3B0aW9uLnRleHQoZGF0YS5zYXZlX25hbWUpO1xyXG4gICAgICAgIGN1cnJlbnRfb3B0aW9uLnZhbChkYXRhLnNhdmVfbmFtZSk7XHJcbiAgICAgICAgc2F2ZXNfc2VsZWN0LmFwcGVuZChjdXJyZW50X29wdGlvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0dhbWUgd2l0aCBuYW1lICcgKyBkYXRhLnNhdmVfbmFtZSArICcgYWxyZWFkeSBleGlzdCEnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2xvYWRfZ2FtZV9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IGRhdGEuZnVsbF9nYW1lX3N0YXRlO1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfc3RhdGU7XHJcbiAgICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX2RldGFpbGVkX2luZm87XHJcbiAgICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5vYnN0YWNsZV9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICAgIGNvbnN0cnVjdF9ib2FyZChmdWxsX2dhbWVfc3RhdGUuZ2FtZV9zdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBsb2FkIGdhbWUgJyArIGRhdGEuc2F2ZV9uYW1lKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3N5bmNfYm9hcmRfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBmdWxsX2dhbWVfc3RhdGUgPSBkYXRhLmZ1bGxfZ2FtZV9zdGF0ZTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlID0gZnVsbF9nYW1lX3N0YXRlLmNoYXJhY3Rlcl9zdGF0ZTtcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX2RldGFpbGVkX2luZm87XHJcbiAgICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUub2JzdGFjbGVfZGV0YWlsZWRfaW5mbztcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGZ1bGxfZ2FtZV9zdGF0ZS5nYW1lX3N0YXRlKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICd1cGRhdGVfZm9nX3Jlc3BvbnNlJykge1xyXG5cdFx0XHRcdHZhciBpbmRleCA9IGRhdGEuaW5kZXg7XHJcblx0XHRcdFx0dmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgaW5kZXgpO1xyXG5cdFx0XHRcdGlmIChkYXRhLnVwZGF0ZV90eXBlID09ICdyZW1vdmUnKSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAwO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAxO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBGT0dfSU1BR0U7XHJcblx0XHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2Fzc2lnbl96b25lX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgaW5kZXhfbGlzdCA9IGRhdGEuaW5kZXhfbGlzdFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4X2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaW5kZXhfbGlzdFtpXV0gPSBkYXRhLnpvbmVfbnVtYmVyO1xyXG4gICAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2luZGV4X2xpc3RbaV1dID0gZGF0YS5tb2RpZmljYXRvcjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9yZXNwb25zZScpIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGRhdGEubmV3X3ZhbHVlO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NpbXBsZV9yb2xsX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IGRhdGEuY2hhcmFjdGVyX25hbWUgKyBcIiDQsdGA0L7RgdCw0LXRgiBcIiArIGRhdGEucm9sbFxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2tpbGxfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciB1c2VyX2luZGV4ID0gZGF0YS51c2VyX2luZGV4XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbdXNlcl9pbmRleF0gPSAxXHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiYWltX292ZXJcIikpIHtcclxuICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5haW1cclxuICAgICAgfVxyXG4gICAgICBzd2l0Y2goZGF0YS5za2lsbF9pbmRleCkge1xyXG4gICAgICAgIGNhc2UgMDogLy8g0YDRi9Cy0L7QulxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgY2hhcmdlX21vdmVfaW5jcmVhc2UgPSBwYXJzZUludChjaGFyYWN0ZXIuYWdpbGl0eSlcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt1c2VyX2luZGV4XSArIGNoYXJnZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgIHZhciBjaGFyZ2VfdXNlcl9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBjaGFyZ2VfdXNlcl9vYmplY3QuY29vbGRvd24gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uY2hhcmdlX3VzZXIgPSBjaGFyZ2VfdXNlcl9vYmplY3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGB0L7QstC10YDRiNCw0LXRgiDRgNGL0LLQvtC6XCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMTogLy8g0L/RgNC40LvQuNCyINCw0LTRgNC10L3QsNC70LjQvdCwXHJcbiAgICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgdmFyIHRhcmdldF9pbmRleCA9IGRhdGEudGFyZ2V0X2luZGV4XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfaW5kZXhdXHJcbiAgICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt0YXJnZXRfaW5kZXhdIC0gYWRyZW5hbGluZV9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gKyBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIDFcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldCA9IHt9XHJcbiAgICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldC5taW51c19hY3Rpb25zID0gZGF0YS5taW51c19hY3Rpb25zXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2luZGV4XS5hZHJlbmFsaW5lX3RhcmdldCA9IGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldFxyXG5cclxuICAgICAgICAgICAgdmFyIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIgPSB7fVxyXG4gICAgICAgICAgICBhZHJlbmFsaW5lX29iamVjdF91c2VyLmNvb2xkb3duID0gYWRyZW5hbGluZV9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFkcmVuYWxpbmVfdXNlciA9IGFkcmVuYWxpbmVfb2JqZWN0X3VzZXJcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0LjRgdC/0L7Qu9GM0LfRg9C10YIg0L/RgNC40LvQuNCyINCw0LTRgNC10L3QsNC70LjQvdCwLiBcIiAgKyB0YXJnZXQubmFtZSArIFwiINC/0L7Qu9GD0YfQsNC10YIgXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnMgKyBcIiDQtNC10LnRgdGC0LLQuNC5LiDQrdGC0L4g0LHRg9C00LXRgiDRgdGC0L7QuNGC0YwgXCIgKyBkYXRhLm1pbnVzX2FjdGlvbnMgKyBcIiDQtNC10LnRgdGC0LLQuNC5INC90LAg0YHQu9C10LTRg9GO0YnQuNC5INGF0L7QtC5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyOiAvLyDQv9C+0LTRgNC10LfQsNC90LjQtSDRgdGD0YXQvtC20LjQu9C40LlcclxuICAgICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gc3RhbWluYV9jdXRfbGltYl9jb3N0XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjdXRfbGltYl9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBjdXRfbGltYl9vYmplY3QuY29vbGRvd24gPSBjdXRfbGltYl9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmN1dF9saW1iX3VzZXIgPSBjdXRfbGltYl9vYmplY3RcclxuICAgICAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS5cIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5za2lsbF9vdXRjb21lID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBsaW1iX2N1dF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgICBsaW1iX2N1dF9vYmplY3QuZHVyYXRpb24gPSBjdXRfbGltYl9kdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5jdXRfbGltYiA9IGxpbWJfY3V0X29iamVjdFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gLTEwXHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC/0L7QtNGA0LXQt9Cw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdC10LfRg9GB0L/QtdGI0L3QviDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnNraWxsX291dGNvbWUgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGxpbWJfY3V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgIGxpbWJfY3V0X29iamVjdC5kdXJhdGlvbiA9IGN1dF9saW1iX2R1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmN1dF9saW1iID0gbGltYl9jdXRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAtMTBcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L/QvtC00YDQtdC30LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdC10LfRg9GB0L/QtdGI0L3QviDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgICAgIHZhciBsaW1iX2N1dF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIGxpbWJfY3V0X29iamVjdC5kdXJhdGlvbiA9IGN1dF9saW1iX2R1cmF0aW9uICsgMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmN1dF9saW1iID0gbGltYl9jdXRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IC0xMFxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INC/0L7QtNGA0LXQt9Cw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QviDRgtC+0YIg0L3QsNGF0L7QtNC40YLRgdGPINCyINC/0L7Qu9C90L7QvCDRg9C60YDRi9GC0LjQuC5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzogLy8g0YHQu9Cw0LHQvtC1INC80LXRgdGC0L5cclxuICAgICAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBzdGFtaW5hX3dlYWtzcG90X2Nvc3RcclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChkYXRhLm91dGNvbWUgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgdmFyIHdlYWtzcG90X29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIHdlYWtzcG90X29iamVjdC5odW50ZXJfaWQgPSB1c2VyX2luZGV4XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLndlYWtzcG90ID0gd2Vha3Nwb3Rfb2JqZWN0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC+0LHQvdCw0YDRg9C20LjQuyDRgdC70LDQsdC+0LUg0LzQtdGB0YLQviBcIiArIHRhcmdldC5uYW1lXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQvdC1INGD0LTQsNC70L7RgdGMINC+0LHQvdCw0YDRg9C20LjRgtGMINGB0LvQsNCx0L7QtSDQvNC10YHRgtC+IFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDQ6IC8vINC70LXRh9C10L3QuNC1XHJcbiAgICAgICAgdmFyIGhlYWxlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgIHZhciBjb29sZG93biA9IDBcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbdXNlcl9pbmRleF0gPiBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtkYXRhLnRhcmdldF9pZF0pIHtcclxuICAgICAgICAgIC8vINC/0LDRhtC40LXQvdGCINC90LUg0YXQvtC00LjRgiDQsiDRjdGC0L7RgiDQttC1INGF0L7QtFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS50YXJnZXRfaWRdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0vMlxyXG4gICAgICAgICAgY29vbGRvd24gPSAwXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvb2xkb3duID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaGVhbGVkX29iamVjdCA9IHt9XHJcbiAgICAgICAgaGVhbGVkX29iamVjdC5jb29sZG93biA9IGNvb2xkb3duXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uaGVhbGVkID0gaGVhbGVkX29iamVjdFxyXG4gICAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImZhaWxcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC90LUg0L/QvtC70YPRh9C40LvQvtGB0Ywg0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC/0L7Qu9GD0YfQuNC70L7RgdGMINGD0YHQv9C10YjQvdC+INCy0YvQu9C10YfQuNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuaGVhbF9yb2xsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGRhdGEubmV3X2hwXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjcml0aWNhbCBzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCjIFwiICsgaGVhbGVyLm5hbWUgKyBcIiDQv9C+0LvRg9GH0LjQu9C+0YHRjCDQutGA0LjRgtC40YfQtdGB0LrQuCAoMiDRgdGC0LXQv9C10L3QuCkg0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gZGF0YS5uZXdfaHBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0YDQsNC30LHQvtGA0LUg0L7RgtGF0LjQu9CwXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6IC8vINCx0L7Qu9GM0YjQvtC5INCx0YDQsNGCXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB2YXIgc2hpZWxkID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQt9Cw0YnQuNGC0LjQuyBcIiArICB0YXJnZXQubmFtZSArIFwiICgrXCIgKyBkYXRhLmJvbnVzX0tEICsgXCLQutC0KVwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2RhdGEudGFyZ2V0X2lkXSArIGRhdGEuYm9udXNfS0RcclxuICAgICAgICAgIHZhciBiaWdfYnJvX29iamVjdCA9IHt9XHJcbiAgICAgICAgICBiaWdfYnJvX29iamVjdC5jb29sZG93biA9IGNvb2xkb3duX2JpZ19icm9cclxuICAgICAgICAgIGJpZ19icm9fb2JqZWN0LmJvbnVzX0tEID0gZGF0YS5ib251c19LRFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uYmlnX2JybyA9IGJpZ19icm9fb2JqZWN0XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDY6IC8vINC/0L7QtNC90Y/RgtGMINGJ0LjRgtGLXHJcbiAgICAgICAgICB2YXIgc2hpZWxkID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGlmIChkYXRhLm91dGNvbWUgPT0gXCJzaGllbGRfdXBcIikge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2luZGV4XSArIHNoaWVsZF91cF9LRFxyXG4gICAgICAgICAgICB2YXIgc2hpZWxkX3VwX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIHNoaWVsZF91cF9vYmplY3Quc3RhbWluYV9jb3N0ID0gc2hpZWxkX3VwX3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICBzaGllbGRfdXBfb2JqZWN0LktEID0gc2hpZWxkX3VwX0tEXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uc2hpZWxkX3VwID0gc2hpZWxkX3VwX29iamVjdFxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHNoaWVsZC5uYW1lICsgXCIg0L/QvtC00L3Rj9C7INGJ0LjRgtGLINC30LAg0YfQsNGCXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3VzZXJfaW5kZXhdIC0gc2hpZWxkX3VwX0tEXHJcbiAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnNoaWVsZF91cFxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHNoaWVsZC5uYW1lICsgXCIg0L7Qv9GD0YHRgtC40Lsg0YnQuNGCLiDQp9Cw0YIg0L/RgNC+0YHRgtC4KFwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNzogLy8g0L/QvtC20LjRgNCw0L3QuNC1INGB0YPRidC90L7RgdGC0LhcclxuICAgICAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSAtIGRhdGEuZGFtYWdlXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLk1hcmt1c19zdGFja3MgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5NYXJrdXNfc3RhY2tzICsgMlxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uTWFya3VzX3N0YWNrcyA9IDJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmhhc093blByb3BlcnR5KFwiYmlvcG9vbFwiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgKyBkYXRhLmRhbWFnZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sID0gZGF0YS5kYW1hZ2VcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC90LDQvdC+0YHQuNGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsCDQvtGCINC60L7RgtC+0YDQvtCz0L4g0L3QtdCy0L7Qt9C80L7QttC90L4g0YPQstC10YDQvdGD0YLRjNGB0Y9cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA5OiAvLyDQsNCx0YHQvtC70Y7RgtC90L7QtSDQstC+0YHRgdGC0LDQvdC+0LLQu9C10L3QuNC1XHJcbiAgICAgICAgICB2YXIgaGVhbGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIDFcclxuXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSArIGRhdGEuaGVhbF9hbW91bnRcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCAtIGRhdGEuaGVhbF9hbW91bnRcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gaGVhbGVyLm5hbWUgKyBcIiDQstC+0YHRgdGC0LDQvdCw0LvQuNCy0LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiBcIiArIGRhdGEuaGVhbF9hbW91bnQgKyBcIiDRhdC/XCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTA6IC8vINC/0L7Qu9GD0YfQuNGC0Ywg0LHQvtC90YPRgVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdICsgMVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LzQtdC90Y/QtdGCINC+0LHRi9GH0L3QvtC1INC90LAg0LHQvtC90YPRgdC90L7QtSDQtNC10LnRgdGC0LLQuNC1XCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDExOiAvLyDQvtGC0LTRi9GFXHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGRhdGEubmV3X3N0YW1pbmFcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC+0YLQtNGL0YXQsNC10YIuINCl0L7RgNC+0YjQtdCz0L4g0L7RgtC/0YPRgdC60LAhXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxMjogLy8g0LPQsNC30L7QstCw0Y8g0LPRgNCw0L3QsNGC0LBcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGdhc19ib21iX3N0YW1pbmFfY29zdFxyXG5cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCx0YDQvtGB0LDQtdGCINCz0LDQt9C+0LLRg9GOINCx0L7QvNCx0YMuINCh0L7QstC10YLRg9C10Lwg0LfQsNC00LXRgNC20LDRgtGMINC00YvRhdCw0L3QuNC1LlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICAgIHZhciBib21iX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIGJvbWJfb2JqZWN0LnR5cGUgPSBcImdhc19ib21iXCJcclxuICAgICAgICAgICAgYm9tYl9vYmplY3QucG9zaXRpb24gPSBkYXRhLnBvc2l0aW9uXHJcbiAgICAgICAgICAgIGJvbWJfb2JqZWN0LnRocmVzaG9sZCA9IGRhdGEudGhyZXNob2xkXHJcbiAgICAgICAgICAgIGJvbWJfb2JqZWN0LnJhZGl1cyA9IDNcclxuICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMucHVzaChib21iX29iamVjdClcclxuXHJcbiAgICAgICAgICAgIHZhciBnYXNfYm9tYl91c2VyID0ge31cclxuICAgICAgICAgICAgZ2FzX2JvbWJfdXNlci5jb29sZG93biA9IGdhc19ib21iX3NraWxsX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uZ2FzX2JvbWJfdXNlciA9IGdhc19ib21iX3VzZXJcclxuXHJcbiAgICAgICAgICAgIHZhciBpbml0aWFsX3JhZGl1cyA9IDJcclxuXHJcbiAgICAgICAgICAgIGFwcGx5X2JvbWIoZGF0YS5wb3NpdGlvbiwgaW5pdGlhbF9yYWRpdXMpXHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxMzogLy8g0YHQstC10YLQvtGI0YPQvNC+0LLQsNGPINCz0YDQsNC90LDRglxyXG4gICAgICAgICAgICB2YXIgbGlnaHRfc291bmRfYm9tYl91c2VyID0ge31cclxuICAgICAgICAgICAgbGlnaHRfc291bmRfYm9tYl91c2VyLmNvb2xkb3duID0gbGlnaHRfc291bmRfYm9tYl9za2lsbF9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmxpZ2h0X3NvdW5kX2JvbWJfdXNlciA9IGxpZ2h0X3NvdW5kX2JvbWJfdXNlclxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLm91dGNvbWVfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gZGF0YS5jaGFyYWN0ZXJfbGlzdFtpXVxyXG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgICAgIGlmIChkYXRhLm91dGNvbWVfbGlzdFtpXSA9PSAwKSB7IC8vINCf0YDQvtGI0LXQuyDRgdC/0LDRgdCx0YDQvtGB0L7QulxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGD0YHQv9C10Lsg0L/RgNC40LrRgNGL0YLRjCDQs9C70LDQt9CwXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC+0YHQu9C10L8g0L3QsCAyINGF0L7QtNCwXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYmxpbmRcIikpIHsvLyDQvdC1INC90LDQutC70LDQtNGL0LLQstCw0LXQvCDQtdGJ0LUg0YjRgtGA0LDRhFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmJsaW5kLmNvb2xkb3duID0gMlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGJsaW5kX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgIGJsaW5kX29iamVjdC5jb29sZG93biA9IDJcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5ibGluZCA9IGJsaW5kX29iamVjdFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdIC0gMlxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSAtIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTQ6IC8vINGI0L7QutC40YDQvtCy0LDRgtGMICjQtNGA0L7QvSArINGD0Y/Qt9Cy0LjQvNC+0YHRgtGMKVxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YHRgtGA0LXQu9GP0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L7QtNC90LDQutC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDRg9C00LDQu9C+0YHRjCDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICBzaG9ja2VkX2VmZmVjdChkYXRhLnRhcmdldF9pZClcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8g0Lgg0YjQvtC60LjRgNGD0LXRgiDRhtC10LvRjCAo0YPRj9C30LLQuNC80L7RgdGC0YwpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICBzaG9ja2VkX2VmZmVjdChkYXRhLnRhcmdldF9pZClcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YHRgtGA0LXQu9GP0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikg0Lgg0YjQvtC60LjRgNGD0LXRgiDRhtC10LvRjCAo0YPRj9C30LLQuNC80L7RgdGC0YwpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICBzaG9ja2VkX2VmZmVjdChkYXRhLnRhcmdldF9pZClcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INC/0L7Qv9Cw0LTQsNC10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiLCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjyDQuCDRiNC+0LrQuNGA0YPQtdGCINGG0LXQu9GMLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY292ZXJcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINGI0L7QutC40YDQvtCy0LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdC+INGC0L7RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE1OiAvLyDQv9GL0Ykg0L/Ri9GJINCz0L7Rg1xyXG4gICAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldF9pbmRleCA9IGRhdGEudGFyZ2V0X2luZGV4XHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2luZGV4XVxyXG4gICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gKyBwaWNoX3BpY2hfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gKyAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgcGljaF9waWNoX29iamVjdF90YXJnZXQgPSB7fVxyXG4gICAgICAgICAgcGljaF9waWNoX29iamVjdF90YXJnZXQuZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaW5kZXhdLnBpY2hfcGljaF90YXJnZXQgPSBwaWNoX3BpY2hfb2JqZWN0X3RhcmdldFxyXG5cclxuICAgICAgICAgIHZhciBwaWNoX3BpY2hfb2JqZWN0X3VzZXIgPSB7fVxyXG4gICAgICAgICAgcGljaF9waWNoX29iamVjdF91c2VyLmNvb2xkb3duID0gcGljaF9waWNoX2Nvb2xkb3duXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnBpY2hfcGljaF91c2VyID0gcGljaF9waWNoX29iamVjdF91c2VyXHJcblxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQn9GL0Ykt0J/Ri9GJLdCT0L7Rgy4gXCIgICsgdGFyZ2V0Lm5hbWUgKyBcIiDQv9C+0LvRg9GH0LDQtdGCIFwiICsgZGF0YS5leHRyYV9hY3Rpb25zICsgXCIg0LTQvtC/INC00LXQudGB0YLQstC40Lkg0L3QsCDRjdGC0L7RgiDQuCDRgdC70LXQtNGD0Y7RidC40Lkg0YXQvtC0LlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE2OiAvLyDRgdC40LvQvtCy0L7QtSDQv9C+0LvQtVxyXG4gICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGZvcmNlX2ZpZWxkX3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzaGllbGRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC50eXBlID0gXCJmb3JjZV9maWVsZFwiXHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3QucG9zaXRpb24gPSBkYXRhLnBvc2l0aW9uXHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3QucmFkaXVzID0gZm9yY2VfZmllbGRfcmFkaXVzXHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3Quc2hpZWxkID0gZGF0YS5zaGllbGRcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5jaGFyYWN0ZXJfbGlzdCA9IGRhdGEuY2hhcmFjdGVyX2xpc3RcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5jZWxsc19wcm90ZWN0ZWQgPSBkYXRhLmNlbGxzX3Byb3RlY3RlZFxyXG4gICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5wdXNoKHNoaWVsZF9vYmplY3QpXHJcblxyXG4gICAgICAgICAgICB2YXIgc2hpZWxkX2luZGV4ID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMubGVuZ3RoIC0gMVxyXG4gICAgICAgICAgICB2YXIgY2hhcl9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfbGlzdFxyXG5cclxuICAgICAgICAgICAgdmFyIGZvcmNlX2ZpZWxkX3RhcmdldCA9IHt9XHJcbiAgICAgICAgICAgIGZvcmNlX2ZpZWxkX3RhcmdldC5zaGllbGRfaW5kZXggPSBzaGllbGRfaW5kZXhcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcl9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyX2xpc3RbaV1cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldCA9IGZvcmNlX2ZpZWxkX3RhcmdldFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9yY2VfZmllbGRfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGZvcmNlX2ZpZWxkX3VzZXIuY29vbGRvd24gPSBmb3JjZV9maWVsZF9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmZvcmNlX2ZpZWxkX3VzZXIgPSBmb3JjZV9maWVsZF91c2VyXHJcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LDQutGC0LjQstC40YDRg9C10YIg0YHQuNC70L7QstC+0LUg0L/QvtC70LVcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE3OiAvLyDQuNC90LLQuNC3XHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W3VzZXJfaW5kZXhdID0gZGF0YS51c2VybmFtZVxyXG4gICAgICAgICAgaWYgKG15X25hbWUgIT0gZGF0YS51c2VybmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBkYXRhLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE4OiAvLyDQsdC+0LXQstCw0Y8g0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtGMXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gLTE7XHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsNC60YLQuNCy0LjRgNGD0LXRgiDQsdC+0LXQstGD0Y4g0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtGMXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE5OiAvLyDQu9Cw0LrQuCDRiNC+0YJcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gbHVja3lfc2hvdF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGF0YS5yb2xsID09IDcpIHtcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZSlcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCj0LTQsNGH0LAg0LHQu9Cw0LPQvtCy0L7Qu9C40YIgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiLCDQutC+0YLQvtGA0YvQuSDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsCBcIiArIHRhcmdldC5uYW1lXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGRhdGEucm9sbCArIFwiINGN0YLQviDQvdC1INGH0LjRgdC70L4gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiLCDRgtCw0Log0YfRgtC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQuNC30LHQtdCz0LDQtdGCINCw0YLQsNC60LguXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjA6IC8vIGxvdHRlcnlfc2hvdFxyXG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBsb3R0ZXJ5X3Nob3Rfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGRhdGEucm9sbCA9PSA3KSB7XHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQmtCw0LrQsNGPINGD0LTQsNGH0LAhINCk0L7RgNGC0YPQvdCwINGP0LLQvdC+INC90LAg0YHRgtC+0YDQvtC90LUgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiLCDQutC+0YLQvtGA0YvQuSDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsCBcIiArIHRhcmdldC5uYW1lXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucm9sbCA9PSA3Nykge1xyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JTQttC10LrQv9C+0YIhIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC10LPQvtC00L3RjyDRgdGC0L7QuNGCINC60YPQv9C40YLRjCDQu9C+0YLQtdGA0LXQudC90YvQuSDQsdC40LvQtdGCLCDQsCDQv9C+0LrQsCDQvtC9INC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwIFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5yb2xsICsgXCIg0Y3RgtC+INC90LUg0YfQuNGB0LvQviBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINGC0LDQuiDRh9GC0L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINC40LfQsdC10LPQsNC10YIg0LDRgtCw0LrQuC5cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyMTogLy/QstGB0L/Qu9C10YHQuiDQtNC10LnRgdGC0LLQuNC5XHJcbiAgICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gKyBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGFjdGlvbl9zcGxhc2hfc3RhbWluYV9jb3N0KmRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciBhY3Rpb25fc3BsYXNoX29iamVjdCA9IHt9XHJcbiAgICAgICAgICBhY3Rpb25fc3BsYXNoX29iamVjdC5jb29sZG93biA9IGFjdGlvbl9zcGxhc2hfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWN0aW9uX3NwbGFzaCA9IGFjdGlvbl9zcGxhc2hfb2JqZWN0XHJcblxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQstGB0L/Qu9C10YHQuiDQtNC10LnRgdGC0LLQuNC5INC4INC/0L7Qu9GD0YfQsNC10YIgXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnMgKyBcIiDQvtGB0L3QvtCy0L3Ri9GFINC00LXQudGB0YLQstC40Lkg0LLQvNC10YHRgtC+INCx0L7QvdGD0YHQvdGL0YUuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyMjogLy8g0LPRgNCw0LQg0YPQtNCw0YDQvtCyXHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBwdW5jaF9yYWluZmFsbF9zdGFtaW5hX2Nvc3QqZGF0YS50b3RhbF9hdHRhY2tzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZGF0YS5kYW1hZ2UgPiAwKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlKVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC90LDQvdC+0YHQuNGCINCz0YDQsNC0INC40LcgXCIgKyBkYXRhLnRvdGFsX2F0dGFja3MgKyBcIiDRg9C00LDRgNC+0LIsINC40Lcg0LrQvtGC0L7RgNGL0YUgXCIgKyBkYXRhLnN1Y2Nlc3NmdWxsX2F0dGFja3MgKyBcIiDQv9C+0L/QsNC00LDRjtGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdCw0L3QvtGB0Y8gXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAuXCJcclxuXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIzOiAvLyDQsNC00YDQtdC90LDQu9C40L3QvtCy0YvQuSDQv9C+0YLQvtC/XHJcbiAgICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0X2luZGV4ID0gZGF0YS50YXJnZXRfaW5kZXhcclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1swXVxyXG4gICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gKyAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0ID0ge31cclxuICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldC5leHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICBhZHJlbmFsaW5lX29iamVjdF90YXJnZXQudHVybiA9IDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2luZGV4XS5wb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXQgPSBhZHJlbmFsaW5lX29iamVjdF90YXJnZXRcclxuXHJcbiAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdXNlciA9IHt9XHJcbiAgICAgICAgICBhZHJlbmFsaW5lX29iamVjdF91c2VyLmNvb2xkb3duID0gcG9pc29ub3VzX2FkcmVuYWxpbmVfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdXNlciA9IGFkcmVuYWxpbmVfb2JqZWN0X3VzZXJcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINCw0LTRgNC10L3QsNC70LjQvdC+0LLRi9C5INC/0L7RgtC+0L8uIFwiICArIHRhcmdldC5uYW1lICsgXCIg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9uc1swXSArIFwiINC00LXQudGB0YLQstC40Lkg0LIg0Y3RgtC+0YIg0YXQvtC0LCDQuCBcIiArIGRhdGEuZXh0cmFfYWN0aW9uc1sxXSArIFwiINCyINGB0LvQtdC00YPRjtGJ0LjQuS4g0K3RgtC+INCx0YPQtNC10YIg0YHRgtC+0LjRgtGMINC20LjQt9C90LXQuSDQuCDQstGL0L3QvtGB0LvQuNCy0L7RgdGC0LgsINC40YHQv9C+0LvRjNC30YPQudGC0LUg0YEg0YPQvNC+0LwuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgIGNhc2UgMjQ6IC8vINC60LjRgdC70L7RgtC90LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBhY2lkX2JvbWJfc3RhbWluYV9jb3N0XHJcblxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCx0YDQvtGB0LDQtdGCINC60LjRgdC70L7RgtC90YPRjiDQs9GA0LDQvdCw0YLRgy4g0JAg0L7QvdC4INGC0L7Qu9GM0LrQviDQutGD0L/QuNC70Lgg0L3QvtCy0YvQtSDQtNC+0YHQv9C10YXQuC4uLlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgdmFyIGFjaWRfYm9tYl91c2VyID0ge31cclxuICAgICAgICAgIGFjaWRfYm9tYl91c2VyLmNvb2xkb3duID0gYWNpZF9ib21iX2Nvb2xkb3duXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFjaWRfYm9tYl91c2VyID0gYWNpZF9ib21iX3VzZXJcclxuXHJcbiAgICAgICAgICBhcHBseV9hY2lkX2JvbWIoZGF0YS5wb3NpdGlvbiwgYWNpZF9ib21iX3JhZGl1cylcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjU6IC8vINC30LDQvNC40L3QuNGA0L7QstCw0YLRjFxyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhkYXRhLnBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLnB1c2goZGF0YS5wb3NpdGlvbilcclxuICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbZGF0YS5wb3NpdGlvbl0gPSBbXVxyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1tkYXRhLnBvc2l0aW9uXS5wdXNoKGRhdGEucGxheWVyX25hbWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyNjogLy8g0L7QsdC10LfQstGA0LXQtNC40YLRjCDQvNC40L3Rg1xyXG5cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICBzd2l0Y2goZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlbXB0eVwiOlxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItChINGH0LXQvCBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0L7QstCw0YLRjD9cIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmYWlsXCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC/0YvRgtCw0LvRgdGPINC+0LHQtdC30LLRgNC10LTQuNGC0Ywg0LzQuNC90YMsINC90L4g0L3QtSDRgdGD0LzQtdC7LlwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWluZV9wb3NpdGlvbiA9IGRhdGEucG9zaXRpb25cclxuICAgICAgICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIG1pbmVfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgY2VsbC5zcmMgPSBmb2dPclBpYyhtaW5lX3Bvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluZGV4T2YobWluZV9wb3NpdGlvbilcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5zcGxpY2UoaW5kZXgsMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbbWluZV9wb3NpdGlvbl0gPSBbXVxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC30LDQv9GA0LXRidCw0LXRgiDQvNC40L3QtSDQstC30YDRi9Cy0LDRgtGM0YHRjyFcIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTd2l0Y2gg0L7QsdC10LLQt9GA0LXQttC10L3QuNGPINC/0L7RiNC10Lsg0L3QtSDRgtCw0LpcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyNzogLy8g0L3QuNC60L7RgtC40L3QvtCy0YvQuSDRg9C00LDRgFxyXG4gICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciBmdWxsX2hwID0gSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLkhQW3VzZXJfaW5kZXhdIC0gZnVsbF9ocCAqIHRvYmFjY29fc3RyaWtlX2hwX3BlcmNlbnRhZ2VcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfaW5kZXhdICsgdG9iYWNjb19zdHJpa2VfYm9udXNcclxuICAgICAgICAgIHZhciB0b2JhY2NvX3N0cmlrZV9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgdG9iYWNjb19zdHJpa2Vfb2JqZWN0LmNvb2xkb3duID0gdG9iYWNjb19zdHJpa2VfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0udG9iYWNjb19zdHJpa2UgPSB0b2JhY2NvX3N0cmlrZV9vYmplY3RcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRhdC+0YDQvtGI0LXRh9C90L4g0LfQsNGC0Y/Qs9C40LLQsNC10YLRgdGPLiDQkdC10YDQtdCz0LjRgtC10YHRjCFcIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyODogLy8g0LrRgNGD0YfQtdC90YvQtSDQv9GD0LvQuFxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gY3VydmVkX2J1bGxldHNfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGRhdGEuY292ZXJfbGV2ZWwgPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcItCj0YDQvtCy0LXQvdGMINGD0LrRgNGL0YLQuNGPOiBcIiArIGRhdGEuY292ZXJfbGV2ZWxcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC10YLRgdGPINC30LDQutGA0YPRgtC40YLRjCDQv9GD0LvRjiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINC30LDQutGA0YPRgtC40YLRjCDQv9GD0LvRjiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L7QtNC90LDQutC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDRg9C00LDQu9C+0YHRjCDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlICE9ICdyb2d1ZScpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQt9Cw0LrRgNGD0YLQuNC7INC/0YPQu9GOIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LfQsNC60YDRg9GC0LjQuyDQv9GD0LvRjiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwi0LrRgNGD0YfQtdC90L7QuSDQv9GD0LvQtdC5LCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCd0LXRgdC80L7RgtGA0Y8g0L3QsCDQv9C+0L/Ri9GC0LrRgyBcIiArIGF0dGFja2VyLm5hbWUgKyBcIiDQvtCx0LrRgNGD0YLQuNGC0Ywg0L/RgNC10L/Rj9GC0YHRgtCy0LjQtSDQt9Cw0YnQuNGJ0LDRjtGJ0LXQtSBcIiArIHRhcmdldC5uYW1lICsgXCIsINGC0L7RgiDQstGB0LUg0YDQsNCy0L3QviDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyOTogLy8g0J/RgNC40YbQtdC70LjRgtGM0YHRj1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIGFpbV9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5haW0gPSBhaW1fb2JqZWN0XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzA6IC8vINCx0YvRgdGC0YDQsNGPINCw0YLQsNC60LBcclxuICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW3VzZXJfaW5kZXhdID0gMVxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uaGFzT3duUHJvcGVydHkoXCJxdWlja19hdHRhY2tfcmVhZHlcIikpIHtcclxuICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5xdWlja19hdHRhY2tfcmVhZHlcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHN0YW1pbmFfYXR0YWNrX2Nvc3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuY292ZXJfbGV2ZWwgPiAwKSB7XHJcbiAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwi0KPRgNC+0LLQtdC90Ywg0YPQutGA0YvRgtC40Y86IFwiICsgZGF0YS5jb3Zlcl9sZXZlbFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcIlwiXHJcbiAgICAgIH1cclxuICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCx0YvRgdGC0YDQviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LHRi9GB0YLRgNC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlICE9ICdyb2d1ZScpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LHRi9GB0YLRgNC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INCx0YvRgdGC0YDQviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0LHRi9GB0YLRgNC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY292ZXJcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINCx0YvRgdGC0YDQviDQsNGC0LDQutC+0LLQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90L4g0YLQvtGCINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDMxOiAvLyDRgdC70YPQttCx0LAg0YHQv9Cw0YHQtdC90LjRj1xyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSBzYWZldHlfc2VydmljZV9ib251c19hY3Rpb25zX2Nvc3RcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNhdmlvciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gc2F2aW9yLm5hbWUgKyBcIiDQvdC1INC00LDRgdGCINCyINC+0LHQuNC00YMgXCIgKyAgdGFyZ2V0Lm5hbWVcclxuICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbZGF0YS50YXJnZXRfaWRdICsgc2FmZXR5X3NlcnZpY2VfZGVmZW5zaXZlX2FkdmFudGFnZVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1tkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbZGF0YS50YXJnZXRfaWRdICsgc2FmZXR5X3NlcnZpY2VfZXZhZGVfYm9udXNcclxuXHJcbiAgICAgICAgdmFyIHNhZmV0eV9zZXJ2aWNlX3RhcmdldF9vYmplY3QgPSB7fVxyXG4gICAgICAgIHNhZmV0eV9zZXJ2aWNlX3RhcmdldF9vYmplY3QuZHVyYXRpb24gPSBzYWZldHlfc2VydmljZV9kdXJhdGlvblxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLnNhZmV0eV9zZXJ2aWNlX3RhcmdldCA9IHNhZmV0eV9zZXJ2aWNlX3RhcmdldF9vYmplY3RcclxuXHJcbiAgICAgICAgdmFyIHNhZmV0eV9zZXJ2aWNlX3VzZXJfb2JqZWN0ID0ge31cclxuICAgICAgICBzYWZldHlfc2VydmljZV91c2VyX29iamVjdC5jb29sZG93biA9IHNhZmV0eV9zZXJ2aWNlX2Nvb2xkb3duXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5zYWZldHlfc2VydmljZV91c2VyID0gc2FmZXR5X3NlcnZpY2VfdXNlcl9vYmplY3RcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzI6IC8vINC60LDQu9GM0LjQvdCz0LDQu9GP0YLQvtGAXHJcbiAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGNhbGluZ2FsYXRvcl9zdGFtaW5hX2Nvc3RcclxuXHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINC60LDQu9GM0LjQvdCz0LDQu9GP0YLQvtGALiDQodC+0LHQuNGA0LDQudGC0LXRgdGMINCy0L7QutGA0YPQsyEuXCJcclxuICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgIHZhciBjYWxpbmdhbGF0b3Jfb2JqZWN0ID0ge31cclxuICAgICAgICBjYWxpbmdhbGF0b3Jfb2JqZWN0LnR5cGUgPSBcImNhbGluZ2FsYXRvclwiXHJcbiAgICAgICAgY2FsaW5nYWxhdG9yX29iamVjdC5wb3NpdGlvbiA9IGRhdGEucG9zaXRpb25cclxuICAgICAgICBjYWxpbmdhbGF0b3Jfb2JqZWN0LmR1cmF0aW9uID0gY2FsaW5nYWxhdG9yX2R1cmF0aW9uXHJcbiAgICAgICAgY2FsaW5nYWxhdG9yX29iamVjdC5yYWRpdXMgPSBjYWxpbmdhbGF0b3JfcmFkaXVzXHJcbiAgICAgICAgY2FsaW5nYWxhdG9yX29iamVjdC5mbGF0X2hlYWwgPSBjYWxpbmdhbGF0b3JfZmxhdF9oZWFsXHJcbiAgICAgICAgY2FsaW5nYWxhdG9yX29iamVjdC5yb2xsX2hlYWwgPSBjYWxpbmdhbGF0b3Jfcm9sbF9oZWFsXHJcbiAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMucHVzaChjYWxpbmdhbGF0b3Jfb2JqZWN0KVxyXG5cclxuICAgICAgICB2YXIgY2FsaW5nYWxhdG9yX3VzZXIgPSB7fVxyXG4gICAgICAgIGNhbGluZ2FsYXRvcl91c2VyLmNvb2xkb3duID0gY2FsaW5nYWxhdG9yX3NraWxsX2Nvb2xkb3duXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5jYWxpbmdhbGF0b3JfdXNlciA9IGNhbGluZ2FsYXRvcl91c2VyXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGFsZXJ0KFwiUmVjZWl2ZWQgdW5rbm93biBza2lsbCBjb21tYW5kXCIpXHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbmV3X3JvdW5kX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IFwi0J3QsNGH0LDQu9C+INC90L7QstC+0LPQviDRgNCw0YPQvdC00LAhXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXSAhPT0gbnVsbCAmJiBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBzd2l0Y2ggKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImdhc19ib21iXCI6XHJcbiAgICAgICAgICAgICAgICBhcHBseV9ib21iKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnBvc2l0aW9uLCBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5yYWRpdXMpXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzID49IDQpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX29iamVjdF9jb21tYW5kKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzICsgMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjYWxpbmdhbGF0b3JcIjpcclxuICAgICAgICAgICAgICAgIGFwcGx5X2NhbGluZ2FsYXRvcihnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5wb3NpdGlvbiwgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzLCBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5mbGF0X2hlYWwsIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJvbGxfaGVhbCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5kdXJhdGlvbiA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLmR1cmF0aW9uIC0gMVxyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLmR1cmF0aW9uID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX29iamVjdF9jb21tYW5kKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NlZCB1cCByZXNvbHZpbmcgdGVycmFpbiBlZmZlY3RzXCIpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS50eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baV1cclxuICAgICAgICBpZiAoY2hhcmFjdGVyICE9PSB1bmRlZmluZWQgJiYgY2hhcmFjdGVyICE9PSBudWxsICYmIGNoYXJhY3Rlcl9zdGF0ZS5IUFtpXSAhPT0gbnVsbCAmJiBjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gPiAwKSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2ldID0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtpXSA9IDBcclxuICAgICAgICAgIGFzc2lnbl9tb3ZlcyhpKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IGJvbnVzX2FjdGlvbl9tYXBbY2hhcmFjdGVyLmFnaWxpdHldO1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gbWFpbl9hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInRpcmVkXCIpKSB7IC8vINCj0LHRgNCw0YLRjCDQsdC+0L3Rg9GB0Ysg0L7RgiDRg9GB0YLQsNC70L7RgdGC0Lgg0L/RgNC+0YjQu9C+0LPQviDRhdC+0LTQsCAo0YfRgtC+0LHRiyDQutC+0LPQtNCwINCx0YPQtNGD0YIg0L3QsNC60LDQu9Cw0LTRi9Cy0LDRgtGM0YHRjyDQvdC+0LLRi9C1INC90LUg0YjRgtGA0LDRhNC+0LLQsNGC0Ywg0LTQstCw0LbQtNGLKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQuYm9udXNcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPCBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0gKiAwLjY3KSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA8IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSAqIDAuMzQpIHtcclxuICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPD0gMCkgeyAvLyAz0Y8g0YHRgtCw0LTQuNGPXHJcbiAgICAgICAgICAgICAgICB2YXIgdGlyZWRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgIHRpcmVkX29iamVjdC5ib251cyA9IC0zXHJcbiAgICAgICAgICAgICAgICB0aXJlZF9vYmplY3Quc3RhZ2UgPSAzXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkID0gdGlyZWRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIDNcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldKjAuMjUpXHJcbiAgICAgICAgICAgICAgICBpZiAoKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9PSAxKSYmKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPT0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSAxXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2UgeyAvLyAy0Y8g0YHRgtCw0LTQuNGPXHJcbiAgICAgICAgICAgICAgICB2YXIgdGlyZWRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgIHRpcmVkX29iamVjdC5ib251cyA9IC0yXHJcbiAgICAgICAgICAgICAgICB0aXJlZF9vYmplY3Quc3RhZ2UgPSAyXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkID0gdGlyZWRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIDJcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldKjAuNSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIDHRjyDRgdGC0LDQtNC40Y9cclxuICAgICAgICAgICAgICB2YXIgdGlyZWRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICB0aXJlZF9vYmplY3QuYm9udXMgPSAtMVxyXG4gICAgICAgICAgICAgIHRpcmVkX29iamVjdC5zdGFnZSA9IDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkID0gdGlyZWRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0qMC43NSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwidGlyZWRcIikpIHsgLy8g0L3QtSDRg9GB0YLQsNC7IC0+INGD0LHRgNCw0YLRjCDRg9GB0YLQu9Cw0LvQvtGB0YLRjCDQtdGB0LvQuCDQsdGL0LvQsFxyXG4gICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50aXJlZFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwibGlnaHRfc291bmRfYm9tYl91c2VyXCIsIFwi0KHQstC10YLQvtGI0YPQvNC+0LLQsNGPINCz0YDQsNC90LDRgtCwINGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQs9C+0YLQvtCy0LAg0Log0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y4uXCIpO1xyXG4gICAgICAgICAgY2hlY2tfY29vbGRvd24oaSwgXCJhY3Rpb25fc3BsYXNoXCIsIGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQvdC+0LLRjCDQvNC+0LbQtdGCINC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDQstGB0L/Qu9C10YHQuiDQtNC10LnRgdGC0LLQuNC5LlwiKTtcclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwic2FmZXR5X3NlcnZpY2VfdXNlclwiLCBcIlwiKTtcclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwiY2FsaW5nYWxhdG9yX3VzZXJcIiwgXCJcIik7XHJcbiAgICAgICAgICBjaGVja19jb29sZG93bihpLCBcImdhc19ib21iX3VzZXJcIiwgXCLQk9Cw0LfQvtCy0LDRjyDQs9GA0LDQvdCw0YLQsCDRgyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LPQvtGC0L7QstCwINC6INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGOLlwiKTtcclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwiYWNpZF9ib21iX3VzZXJcIiwgXCLQmtC40YHQu9C+0YLQvdCw0Y8g0LPRgNCw0L3QsNGC0LAg0YMgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINCz0L7RgtC+0LLQsCDQuiDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRji5cIik7XHJcbiAgICAgICAgICBjaGVja19jb29sZG93bihpLCBcImZvcmNlX2ZpZWxkX3VzZXJcIiwgXCLQodC40LvQvtCy0L7QtSDQv9C+0LvQtSDRgyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvdC+0LLQsCDQt9Cw0YDRj9C20LXQvdC+LlwiKTtcclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwiY2hhcmdlX3VzZXJcIiwgXCJcIik7XHJcbiAgICAgICAgICBjaGVja19jb29sZG93bihpLCBcImN1dF9saW1iX3VzZXJcIiwgXCJcIik7XHJcbiAgICAgICAgICBjaGVja19jb29sZG93bihpLCBcImFkcmVuYWxpbmVfdXNlclwiLCBcItCj0LzQtdC90LjQtSDQn9GA0LjQu9C40LIg0JDQtNGA0LXQvdCw0LvQuNC90LAg0YMgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINGB0L3QvtCy0LAg0LTQvtGB0YLRg9C/0L3Qvi5cIik7XHJcbiAgICAgICAgICBjaGVja19jb29sZG93bihpLCBcInBvaXNvbm91c19hZHJlbmFsaW5lX3VzZXJcIiwgXCLQo9C80LXQvdC40LUg0JDQtNGA0LXQvdCw0LvQuNC90L7QstGL0Lkg0J/QvtGC0L7QvyDRgyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvdC+0LLQsCDQtNC+0YHRgtGD0L/QvdC+LlwiKTtcclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInNhZmV0eV9zZXJ2aWNlX3RhcmdldFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zYWZldHlfc2VydmljZV90YXJnZXQuZHVyYXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbaV0gLSBzYWZldHlfc2VydmljZV9kZWZlbnNpdmVfYWR2YW50YWdlXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW2ldIC0gc2FmZXR5X3NlcnZpY2VfZXZhZGVfYm9udXNcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zYWZldHlfc2VydmljZV90YXJnZXRcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNhZmV0eV9zZXJ2aWNlX3RhcmdldC5kdXJhdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2FmZXR5X3NlcnZpY2VfdGFyZ2V0LmR1cmF0aW9uIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJwaWNoX3BpY2hfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXJcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KPQvNC10L3QuNC1INCf0YvRiS3Qn9GL0Ykg0YMgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINGB0L3QvtCy0LAg0LTQvtGB0YLRg9C/0L3Qvi5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biA9PSBwaWNoX3BpY2hfY29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSAwXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJwaWNoX3BpY2hfdGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF90YXJnZXQuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gKyAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3RhcmdldFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFpbVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYWRyZW5hbGluZV90YXJnZXRcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgbWludXNfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZV90YXJnZXQubWludXNfYWN0aW9uc1xyXG4gICAgICAgICAgICAgIHdoaWxlIChtaW51c19hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pbnVzX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldIC0gYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtaW51c19hY3Rpb25zID0gbWludXNfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZV90YXJnZXRcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldFwiKSkge1xyXG4gICAgICAgICAgICAgIHZhciB0dXJuID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXQudHVyblxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0LnR1cm4gPSB0dXJuICsgMVxyXG4gICAgICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXQuZXh0cmFfYWN0aW9uc1t0dXJuXVxyXG4gICAgICAgICAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gKyAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHR1cm4gKyAxID09IHBvaXNvbm91c19hZHJlbmFsaW5lX2R1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baV1cclxuICAgICAgICAgICAgICAgIHZhciBtYXhfSFAgPSBIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgICAgICAgICAgICAgICB2YXIgbWF4X3N0YW1pbmEgPSBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV1cclxuICAgICAgICAgICAgICAgIHZhciBIUF9jb3N0ID0gcG9pc29ub3VzX2FkcmVuYWxpbmVfZmxhdF9IUCArIHBhcnNlSW50KHBhcnNlRmxvYXQobWF4X0hQKSAqIHBvaXNvbm91c19hZHJlbmFsaW5lX3BlcmNlbnRfSFApXHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhbWluYV9jb3N0ID0gcG9pc29ub3VzX2FkcmVuYWxpbmVfZmxhdF9zdGFtaW5hICsgcGFyc2VJbnQocGFyc2VGbG9hdChtYXhfc3RhbWluYSkgKiBwb2lzb25vdXNfYWRyZW5hbGluZV9wZXJjZW50X3N0YW1pbmEpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gLSBIUF9jb3N0XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIC0gc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXRcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQkNC00YDQtdC90LDQu9C40L0g0LIg0LrRgNC+0LLQuCBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LfQsNC60LDQvdGH0LjQstCw0LXRgtGB0Y8sINC90LDRgdGC0YPQv9Cw0LXRgiDQv9C+0YXQvNC10LvRjNC1IChcIiArIEhQX2Nvc3QgKyBcIiDRhdC/INC4IFwiICsgc3RhbWluYV9jb3N0ICsgXCIg0LLRi9C90L7RgdC70LjQstC+0YHRgtC4KVwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwic2hvY2tlZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2ldICsgMVxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNob2NrZWRcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNob2NrZWQuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNob2NrZWQuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImN1dF9saW1iXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iLmR1cmF0aW9uID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodGD0YXQvtC20LjQu9C40Y8gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINCy0L7RgdGB0YLQsNC90L7QstC40LvQuNGB0YwuXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gLTEwXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYi5kdXJhdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY3V0X2xpbWIuZHVyYXRpb24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImhlYWxlZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oZWFsZWQuY29vbGRvd24gPiAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldLzJcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oZWFsZWQuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oZWFsZWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYmxpbmRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmxpbmQuY29vbGRvd24gPiAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmxpbmQuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmxpbmRcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldICsgMlxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbaV0gPSBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2ldICsgMVxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQl9GA0LXQvdC40LUgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINCy0L7RgdGB0YLQsNC90L7QstC40LvQvtGB0YxcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiTWFya3VzX3N0YWNrc1wiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLk1hcmt1c19zdGFja3MgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLk1hcmt1c19zdGFja3MgLSAxXHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLk1hcmt1c19zdGFja3MgPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLk1hcmt1c19zdGFja3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwic2hpZWxkX3VwXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IE1hdGguY2VpbChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0vMilcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSAtIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hpZWxkX3VwLnN0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/RgNC+0LTQvtC70LbQsNC10YIg0LTQtdGA0LbQsNGC0Ywg0YnQuNGCICjRgdC/0LDRgdC40LHQvilcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImJpZ19icm9cIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyby5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2ldID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2ldIC0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmJvbnVzX0tEXHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyb1xyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRgtC10YDRj9C10YIg0LfQsNGJ0LjRgtGDINCR0L7Qu9GM0YjQvtCz0L4g0JHRgNCw0YLQsFwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyby5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyby5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwidG9iYWNjb19zdHJpa2VcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udG9iYWNjb19zdHJpa2UuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRvYmFjY29fc3RyaWtlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udG9iYWNjb19zdHJpa2UuY29vbGRvd24gPT0gdG9iYWNjb19zdHJpa2VfY29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2ldIC0gdG9iYWNjb19zdHJpa2VfYm9udXNcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50b2JhY2NvX3N0cmlrZS5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udG9iYWNjb19zdHJpa2UuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFjaWRfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3BvaXNvbi5kdXJhdGlvbiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2ldID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2ldICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uLmJvbnVzX0tEXHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3BvaXNvblxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQkdGA0L7QvdGPIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQvdCw0LrQvtC90LXRhiDQstC+0YHRgdGC0LDQvdC+0LLQuNC70LDRgdGMXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsXHJcbiAgICAgICAgICAgIHdoaWxlIChjb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAvL2NoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSAtIGdhc19ib21iX21vdmVfcmVkdWN0aW9uXHJcbiAgICAgICAgICAgICAgaWYgKGNvdW50ICUgMiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldIC0gMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb3VudCA9IGNvdW50IC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzYXZlX3JvbGwgPSBkYXRhLnNhdmVfcm9sbF9saXN0W2ldXHJcbiAgICAgICAgICAgIGlmIChzYXZlX3JvbGwgPj0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24udGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsIC0gMVxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQutC40LTQsNC10YIg0YHQv9Cw0YHQsdGA0L7RgdC+0Log0Lgg0YPQvNC10L3RjNGI0LDQtdGCINGB0YLQsNC00LjRjiDQvtGC0YDQsNCy0LvQtdC90LjRjyAo0YLQtdC/0LXRgNGMIFwiICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0YDQvtCy0LDQu9C40LLQsNC10YIg0YHQv9Cw0YHQsdGA0L7RgdC+0LouINCh0YLQsNC00LjRjyDQvtGC0YDQsNCy0LvQtdC90LjRjyDQvtGB0YLQsNC10YLRgdGPINC/0YDQtdC20L3QtdC5IChcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgPD0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvblxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsdC+0LvRjNGI0LUg0L3QtSDQvtGC0YDQsNCy0LvQtdC9IVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJtZWxlZWRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubWVsZWVkLmNvb2xkb3duIDw9IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWRcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldICsgMVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubWVsZWVkLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWQuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSAnc25pcGVyJykge1xyXG4gICAgICAgICAgICB2YXIgZWZmZWN0c19vYmplY3QgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldXHJcbiAgICAgICAgICAgIGlmIChlZmZlY3RzX29iamVjdC5oYXNPd25Qcm9wZXJ0eShcInNuaXBlcl9wYXNzaXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfYXR0YWNrX2JvbnVzID0gZWZmZWN0c19vYmplY3Quc25pcGVyX3Bhc3NpdmUuYXR0YWNrX2JvbnVzXHJcbiAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfZGFtYWdlX2JvbnVzID0gZWZmZWN0c19vYmplY3Quc25pcGVyX3Bhc3NpdmUuZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnRfYXR0YWNrX2JvbnVzID09IC01KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2F0dGFja19ib251cyA9IDBcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2F0dGFja19ib251cyA9IE1hdGgubWluKGN1cnJlbnRfYXR0YWNrX2JvbnVzICsgMSwgNClcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfZGFtYWdlX2JvbnVzID0gTWF0aC5taW4oY3VycmVudF9kYW1hZ2VfYm9udXMgKyAyLCA4KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tpXSAtIGN1cnJlbnRfYXR0YWNrX2JvbnVzICsgbmV3X2F0dGFja19ib251c1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2ldIC0gY3VycmVudF9kYW1hZ2VfYm9udXMgKyBuZXdfZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXMgPSBuZXdfYXR0YWNrX2JvbnVzXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXMgPSBuZXdfZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIHNuaXBlcl9wYXNzaXZlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmF0dGFja19ib251cyA9IDBcclxuICAgICAgICAgICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc25pcGVyX3Bhc3NpdmUgPSBzbmlwZXJfcGFzc2l2ZV9vYmplY3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2JhdHRsZV9tb2RfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9IGRhdGEudmFsdWVcclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAwKSB7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCR0L7QuSDQvtC60L7QvdGH0LXQvSEg0J3QsNGB0YLRg9C/0LjQuyDQvNC40YAg0LLQviDQstGB0LXQvCDQvNC40YDQtVwiXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCd0LDRh9Cw0LvQviDQsdC+0Y8hINCb0Y7QtNC4INGD0LzQuNGA0LDRjtGCLCDQtdGB0LvQuCDQuNGFINGD0LHQuNGC0YxcIlxyXG4gICAgICB9XHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdyZXNvbHZlX2F0dGFja19yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuYXR0YWNrX3R5cGUgPT0gXCJyYW5nZWRcIikge1xyXG4gICAgICAgIHZhciBhdWRpbyA9IGd1bnNob3RfYXVkaW9cclxuICAgICAgfSBlbHNlIGlmIChkYXRhLmF0dGFja190eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgICAgIHZhciBhdWRpbyA9IHN3b3JkX2F1ZGlvXHJcbiAgICAgIH0gZWxzZSB7Ly8gZGVmYXVsdCBpbmNsdWRpbmcgZW5lcmd5IGFuZCB0aHJvd2luZ1xyXG4gICAgICAgIHZhciBhdWRpbyA9IHN1cmlrZW5fYXVkaW9cclxuICAgICAgfVxyXG4gICAgICBhdWRpby5wbGF5KCk7XHJcblxyXG4gICAgICBpZiAoZGF0YS51c2VyX2ludmlzaWJpbGl0eV9lbmRlZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtkYXRhLmF0dGFja2VyX2lkXSA9IFwiYWxsXCJcclxuICAgICAgICB2YXIgYXR0YWNrZXJfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBkYXRhLmF0dGFja2VyX3Bvc2l0aW9uKTtcclxuICAgICAgICBhdHRhY2tlcl9jZWxsLnNyYyA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuYXR0YWNrZXJfaWRdLmF2YXRhcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5hdHRhY2tlcl9pZF1cclxuICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuYXR0YWNrZXJfaWRdID0gMVxyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmF0dGFja2VyX2lkXSAtIHN0YW1pbmFfYXR0YWNrX2Nvc3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gLSAxXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiYWltX292ZXJcIikpIHtcclxuICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmF0dGFja2VyX2lkXS5haW1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJxdWlja19hdHRhY2tfcmVhZHlcIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuYXR0YWNrZXJfaWRdLnF1aWNrX2F0dGFja19yZWFkeSA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwibW92ZV9yZWR1Y3Rpb25cIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSAtIGRhdGEubW92ZV9yZWR1Y3Rpb247XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLmNvdmVyX2xldmVsID4gMCkge1xyXG4gICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcItCj0YDQvtCy0LXQvdGMINGD0LrRgNGL0YLQuNGPOiBcIiArIGRhdGEuY292ZXJfbGV2ZWxcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCJcIlxyXG4gICAgICB9XHJcbiAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiLCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0LDRgtCw0LrQvtCy0LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdC+INGC0L7RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdzZWFyY2hfYWN0aW9uX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICAgICAgcHVzaFRvTGlzdChkYXRhLmNoYXJhY3Rlcl9uYW1lICsgJyDQsdGA0L7RgdC40LsgJyArIGRhdGEucm9sbCArICcg0L3QsCDQstC90LjQvNCw0YLQtdC70YzQvdC+0YHRgtGMINCyINC30L7QvdC1ICcgKyBkYXRhLnpvbmVfbnVtYmVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gMVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5taW5lc19kZXRlY3RlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBkYXRhLmNoYXJhY3Rlcl9uYW1lICsgXCIg0L7QsdC90LDRgNGD0LbQuNCy0LDQtdGCIFwiICsgZGF0YS5taW5lc19kZXRlY3RlZC5sZW5ndGggKyBcIiDQvNC40L0g0YDRj9C00L7QvCDRgSDRgdC+0LHQvtC5XCJcclxuICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLm1pbmVzX2RldGVjdGVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgbWluZSA9IGRhdGEubWluZXNfZGV0ZWN0ZWRbaV1cclxuICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbbWluZV0ucHVzaChkYXRhLnBsYXllcl9uYW1lKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG52YXIgY3JlYXRlX2JvYXJkX2J1dHRvbiA9ICQoQ1JFQVRFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmNyZWF0ZV9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgY3JlYXRlQm9hcmQpO1xyXG5jcmVhdGVfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBzYXZlX2JvYXJkX2J1dHRvbiA9ICQoU0FWRV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBzYXZlQm9hcmQpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgbG9hZF9ib2FyZF9idXR0b24gPSAkKExPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxubG9hZF9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgbG9hZEJvYXJkKTtcclxubG9hZF9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHJvbGxfaW5pdGlhdGl2ZV9idXR0b24gPSAkKFJPTExfSU5JVElBVElWRV9CVVRUT05fU0VMRUNUT1IpO1xyXG5yb2xsX2luaXRpYXRpdmVfYnV0dG9uLm9uKCdjbGljaycsIHJvbGxJbml0aWF0aXZlKTtcclxucm9sbF9pbml0aWF0aXZlX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgZm9nX2J1dHRvbiA9ICQoRk9HX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmZvZ19idXR0b24ub24oJ2NsaWNrJywgZm9nTW9kZUNoYW5nZSk7XHJcbmZvZ19idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHpvbmVfYnV0dG9uID0gJChaT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnpvbmVfYnV0dG9uLm9uKCdjbGljaycsIHpvbmVNb2RlQ2hhbmdlKTtcclxuem9uZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGNoYXRfYnV0dG9uID0gJChDSEFUX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmNoYXRfYnV0dG9uLm9uKCdjbGljaycsIGNoYW5nZUNoYXRWaXNpYmlsaXR5KTtcclxuXHJcbnZhciBtaXJyb3JfYnV0dG9uID0gJChNSVJST1JfQlVUVE9OX1NFTEVDVE9SKTtcclxubWlycm9yX2J1dHRvbi5vbignY2xpY2snLCBtaXJyb3JfYm9hcmQpO1xyXG5taXJyb3JfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBuZXh0X3JvdW5kX2J1dHRvbiA9ICQoTkVYVF9ST1VORF9CVVRUT05fU0VMRUNUT1IpO1xyXG5uZXh0X3JvdW5kX2J1dHRvbi5vbignY2xpY2snLCBzdGFydF9uZXdfcm91bmQpO1xyXG5uZXh0X3JvdW5kX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgYmF0dGxlX21vZF9idXR0b24gPSAkKEJBVFRMRV9NT0RfQlVUVE9OX1NFTEVDVE9SKTtcclxuYmF0dGxlX21vZF9idXR0b24ub24oJ2NsaWNrJywgY2hhbmdlX2JhdHRsZV9tb2QpO1xyXG5iYXR0bGVfbW9kX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgc3luY19idXR0b24gPSAkKFNZTkNfQlVUVE9OX1NFTEVDVE9SKTtcclxuc3luY19idXR0b24ub24oJ2NsaWNrJywgc3luY19ib2FyZCk7XHJcbnN5bmNfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBsYW5kbWluZV9idXR0b24gPSAkKExBTkRNSU5FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxhbmRtaW5lX2J1dHRvbi5vbignY2xpY2snLCBzaG93X2xhbmRtaW5lcyk7XHJcblxyXG52YXIgZm9nX3pvbmVfYnV0dG9uID0gJChGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG5mb2dfem9uZV9idXR0b24ub24oJ2NsaWNrJywgZm9nQ3VycmVudFpvbmUpO1xyXG5mb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHVuZm9nX3pvbmVfYnV0dG9uID0gJChVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnVuZm9nX3pvbmVfYnV0dG9uLm9uKCdjbGljaycsIHVuZm9nQ3VycmVudFpvbmUpO1xyXG51bmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgem9uZV9udW1iZXJfc2VsZWN0ID0gJChaT05FX05VTUJFUl9TRUxFQ1RPUik7XHJcbnpvbmVfbnVtYmVyX3NlbGVjdC5oaWRlKCk7XHJcbmZvciAobGV0IGkgPSAxOyBpIDwgTUFYX1pPTkVTOyBpKyspIHtcclxuICB2YXIgY3VycmVudF9vcHRpb24gPSAkKFwiPG9wdGlvbj5cIik7XHJcbiAgY3VycmVudF9vcHRpb24udGV4dCgn0JfQvtC90LAgJyArIGkpO1xyXG4gIGN1cnJlbnRfb3B0aW9uLnZhbChpKTtcclxuICB6b25lX251bWJlcl9zZWxlY3QuYXBwZW5kKGN1cnJlbnRfb3B0aW9uKTtcclxufVxyXG5cclxudmFyIHNhdmVzX3NlbGVjdCA9ICQoU0FWRVNfU0VMRUNUX1NFTEVDVE9SKTtcclxuc2F2ZXNfc2VsZWN0LmhpZGUoKTtcclxuXHJcbnZhciBzZWFyY2hfbW9kaWZpY2F0b3IgPSAkKFNFQVJDSF9NT0RJRklDQVRPUl9TRUxFQ1RPUik7XHJcbnNlYXJjaF9tb2RpZmljYXRvci5oaWRlKCk7XHJcblxyXG52YXIgbm90aWZpY2F0aW9uc19saXN0ID0gJChOT1RJRklDQVRJT05TX0xJU1RfU0VMRUNUT1IpO1xyXG5mb3IgKGxldCBpID0gMDsgaSA8IENIQVRfQ0FTSDsgaSsrKSB7XHJcbiAgdmFyIGN1cnJlbnRfZWxlbWVudCA9ICQoXCI8bGk+XCIpO1xyXG4gIGN1cnJlbnRfZWxlbWVudC5hdHRyKCdkYXRhLW5hbWUnLCAnbm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIGkpO1xyXG4gIGN1cnJlbnRfZWxlbWVudC5hdHRyKCdjbGFzcycsICdub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudCcpO1xyXG4gIG5vdGlmaWNhdGlvbnNfbGlzdC5hcHBlbmQoY3VycmVudF9lbGVtZW50KTtcclxufVxyXG5cclxudmFyIGJvYXJkX3NpemVfaW5wdXQgPSAkKEJPQVJEX1NJWkVfSU5QVVRfU0VMRUNUT1IpO1xyXG5ib2FyZF9zaXplX2lucHV0LmhpZGUoKTtcclxuXHJcbnZhciBzYXZlX25hbWVfaW5wdXQgPSAkKFNBVkVfTkFNRV9JTlBVVF9TRUxFQ1RPUik7XHJcbnNhdmVfbmFtZV9pbnB1dC5oaWRlKCk7XHJcblxyXG52YXIgbm90aWZpY2F0aW9uc19jb250YWluZXIgPSAkKE5PVElGSUNBVElPTlNfQ09OVEFORVJfU0VMRUNUT1IpO1xyXG5ub3RpZmljYXRpb25zX2NvbnRhaW5lci5oaWRlKCk7XHJcblxyXG52YXIgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyID0gJChDSEFSQUNURVJfSU5GT19DT05UQU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgd2VhcG9uX2luZm9fY29udGFpbmVyID0gJChXRUFQT05fSU5GT19DT05UQU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgaW5pdGlhdGl2ZV9vcmRlcl9jb250YWluZXIgPSAkKElOSVRJQVRJVkVfT1JERVJfQ09OVEFORVJfU0VMRUNUT1IpO1xyXG5cclxudmFyIHNraWxsX21vZGFsID0gJChTS0lMTF9NT0RBTF9TRUxFQ1RPUik7XHJcblxyXG52YXIgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyID0gJChTS0lMTF9ERVNDUklQVElPTl9DT05UQUlORVJfU0VMRUNUT1IpO1xyXG5cclxudmFyIHNraWxsX21vZGFsX2NvbnRlbnQgPSAkKFNLSUxMX01PREFMX0NPTlRFTlRfU0VMRUNUT1IpO1xyXG5cclxudmFyIG5leHRfcGFnZV9idXR0b25fY29udGFpbmVyID0gJChORVhUX1BBR0VfQlVUVE9OX0NPTlRBSU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgc3BhbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGwtbW9kYWwtY2xvc2VcIik7XHJcblxyXG5zcGFuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBoaWRlX21vZGFsKCk7XHJcbn1cclxuXHJcbnNwYW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbndpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICBpZiAoZXZlbnQudGFyZ2V0LmlkID09IHNraWxsX21vZGFsLmF0dHIoJ2lkJykpIHtcclxuICAgIGhpZGVfbW9kYWwoKTtcclxuICB9XHJcbn1cclxuXHJcbmRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZTtcclxuICAgIC8vIHdcclxuICAgIGlmKGtleUNvZGUgPT0gODcpIHtcclxuICAgICAgICB3X29uY2xpY2soKVxyXG4gICAgfSBlbHNlIGlmIChrZXlDb2RlID09IDY1KSB7IC8vIGFcclxuICAgICAgYV9vbmNsaWNrKClcclxuICAgIH1cclxufTtcclxuXHJcbnNldEludGVydmFsKHJlY29ubmVjdCwgMzAqMTAwMClcclxuIiwibGV0IHNvY2tldDtcclxubGV0IHNlcnZlcl9hZGRyZXNzO1xyXG5sZXQgb25NZXNzYWdlRnVuY3Rpb247XHJcblxyXG5mdW5jdGlvbiBpbml0KHVybCkge1xyXG4gIHNlcnZlcl9hZGRyZXNzID0gdXJsO1xyXG4gIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUmVhZHkoKSB7XHJcbiAgcmV0dXJuIHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTlxyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnb3BlbicpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBvbk1lc3NhZ2VGdW5jdGlvbiA9IGhhbmRsZXJGdW5jdGlvbjtcclxuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKGRhdGEpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0KCkge1xyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICBvbk1lc3NhZ2VGdW5jdGlvbihkYXRhKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShwYXlsb2FkKSB7XHJcbiAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbml0KHNlcnZlcl9hZGRyZXNzKTtcclxuICAgIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIob25NZXNzYWdlRnVuY3Rpb24pO1xyXG4gICAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnTm90IHNlbmQsIGJ1dCByZWNvbm5lY3RlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgcmVnaXN0ZXJPcGVuSGFuZGxlcixcclxuICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyLFxyXG4gIHNlbmRNZXNzYWdlLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0LFxyXG4gIGlzUmVhZHlcclxufVxyXG4iXX0=
