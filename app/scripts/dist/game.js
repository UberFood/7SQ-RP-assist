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
setInterval(poke_server, 45 * 1000);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksbUNBQW1DLHdDQUF2QztBQUNBLElBQUksZ0NBQWdDLHFDQUFwQztBQUNBLElBQUksa0NBQWtDLHVDQUF0QztBQUNBLElBQUkscUNBQXFDLGtEQUF6Qzs7QUFFQSxJQUFJLCtCQUErQixtQ0FBbkM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLGtDQUFrQyxzQ0FBdEM7QUFDQSxJQUFJLHNCQUFzQiwwQkFBMUI7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHlCQUF5Qiw2QkFBN0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7O0FBRUEsSUFBSSx3QkFBd0IsNEJBQTVCOztBQUVBLElBQUksdUJBQXVCLGtDQUEzQjtBQUNBLElBQUksOEJBQThCLGtDQUFsQzs7QUFFQSxJQUFJLDRCQUE0QixnQ0FBaEM7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7O0FBRUEsSUFBSSw4QkFBOEIsa0NBQWxDOztBQUVBLElBQUksdUJBQXVCLDJCQUEzQjtBQUNBLElBQUksK0JBQStCLG1DQUFuQztBQUNBLElBQUksdUNBQXVDLDJDQUEzQztBQUNBLElBQUksc0NBQXNDLDBDQUExQzs7QUFFQSxJQUFJLGlCQUFpQixTQUFTLE1BQVQsQ0FBZ0Is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RDtBQUlEOztBQUVELFNBQVMsV0FBVCxDQUFxQixPQUFyQixFQUE4QjtBQUM1QixNQUFJLE9BQU8sVUFBUCxLQUFzQixVQUFVLElBQXBDLEVBQTBDO0FBQ3hDLFdBQU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBWjtBQUNELEdBRkQsTUFFTztBQUNMLFNBQUssY0FBTDtBQUNBLDJCQUF1QixpQkFBdkI7QUFDQSxRQUFJLE9BQU8sVUFBUCxLQUFzQixVQUFVLElBQXBDLEVBQTBDO0FBQ3hDLGFBQU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBWjtBQUNELEtBRkQsTUFFTztBQUNMLGNBQVEsR0FBUixDQUFZLDJCQUFaO0FBQ0Q7QUFDRjtBQUNGOztrQkFFYztBQUNiLFlBRGE7QUFFYiwwQ0FGYTtBQUdiLGdEQUhhO0FBSWIsMEJBSmE7QUFLYiw4REFMYTtBQU1iO0FBTmEsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBzb2NrZXQgZnJvbSAnLi93cy1jbGllbnQnO1xyXG5cclxudmFyICQgPSB3aW5kb3cualF1ZXJ5O1xyXG5cclxudmFyIENIQVJBQ1RFUl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIl0nO1xyXG52YXIgV0VBUE9OX0lORk9fQ09OVEFORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIndlYXBvbi1pbmZvLWNvbnRhaW5lclwiXSc7XHJcbnZhciBOT1RJRklDQVRJT05TX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zLWNvbnRhaW5lclwiXSc7XHJcbnZhciBJTklUSUFUSVZFX09SREVSX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJpbml0aWF0aXZlLW9yZGVyLWRpc3BsYXktY29udGFpbmVyXCJdJztcclxuXHJcbnZhciBDUkVBVEVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjcmVhdGVfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIFNBVkVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibG9hZF9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgUk9MTF9JTklUSUFUSVZFX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwicm9sbF9pbml0aWF0aXZlX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJmb2dfYnV0dG9uXCJdJztcclxudmFyIFpPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX2J1dHRvblwiXSc7XHJcbnZhciBDSEFUX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY2hhdF9idXR0b25cIl0nO1xyXG52YXIgTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibWlycm9yX2J1dHRvblwiXSc7XHJcbnZhciBORVhUX1JPVU5EX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibmV4dF9yb3VuZF9idXR0b25cIl0nO1xyXG52YXIgQkFUVExFX01PRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJhdHRsZV9tb2RfYnV0dG9uXCJdJztcclxudmFyIFNZTkNfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzeW5jX2J1dHRvblwiXSc7XHJcbnZhciBMQU5ETUlORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImxhbmRtaW5lX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImZvZ196b25lX2J1dHRvblwiXSc7XHJcbnZhciBVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwidW5mb2dfem9uZV9idXR0b25cIl0nO1xyXG5cclxudmFyIFNBVkVTX1NFTEVDVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2F2ZXNfc2VsZWN0XCJdJztcclxuXHJcbnZhciBaT05FX05VTUJFUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiem9uZV9udW1iZXJfc2VsZWN0XCJdJztcclxudmFyIFNFQVJDSF9NT0RJRklDQVRPUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2VhcmNoX21vZGlmaWNhdG9yXCJdJztcclxuXHJcbnZhciBCT0FSRF9TSVpFX0lOUFVUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJib2FyZF9zaXplX2lucHV0XCJdJztcclxudmFyIFNBVkVfTkFNRV9JTlBVVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2F2ZV9uYW1lX2lucHV0XCJdJztcclxuXHJcbnZhciBOT1RJRklDQVRJT05TX0xJU1RfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdFwiXSc7XHJcblxyXG52YXIgU0tJTExfTU9EQUxfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNraWxsLW1vZGFsXCJdJztcclxudmFyIFNLSUxMX01PREFMX0NPTlRFTlRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNraWxsLW1vZGFsLWNvbnRlbnRcIl0nO1xyXG52YXIgU0tJTExfREVTQ1JJUFRJT05fQ09OVEFJTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJza2lsbC1kZXNjcmlwdGlvbi1jb250YWluZXJcIl0nO1xyXG52YXIgTkVYVF9QQUdFX0JVVFRPTl9DT05UQUlORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm5leHQtcGFnZS1idXR0b24tY29udGFpbmVyXCJdJztcclxuXHJcbnZhciBTRVJWRVJfQUREUkVTUyA9IGxvY2F0aW9uLm9yaWdpbi5yZXBsYWNlKC9eaHR0cC8sICd3cycpO1xyXG5cclxudmFyIG15X25hbWUgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJuYW1lJykpO1xyXG52YXIgbXlfcm9sZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcl9yb2xlJykpO1xyXG52YXIgbXlfcm9vbSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncm9vbV9udW1iZXInKSk7XHJcblxyXG52YXIgY2hhcmFjdGVyX2xpc3QgPSBbXTtcclxudmFyIGdyb3VwX2xpc3QgPSBbXTtcclxudmFyIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvID0gW107XHJcbnZhciBvYnN0YWNsZV9saXN0ID0gW107XHJcbnZhciBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gW107XHJcbnZhciB3ZWFwb25fbGlzdCA9IFtdO1xyXG52YXIgd2VhcG9uX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIHNraWxsX2xpc3QgPSBbXTtcclxudmFyIHNraWxsX2RldGFpbGVkX2luZm87XHJcbnZhciBzYXZlc19saXN0ID0gW107XHJcblxyXG52YXIgVElOWV9FRkZFQ1RfQ0xBU1MgPSAnaXMtdGlueSc7XHJcblxyXG52YXIgRU1QVFlfQ0VMTF9QSUMgPSBcIi4vaW1hZ2VzL3NxdWFyZS5qcGdcIjtcclxudmFyIFpPTkVfRU5EUE9JTlRfUElDID0gXCIuL2ltYWdlcy9yZWRfY3Jvc3MuanBnXCJcclxudmFyIEZPR19JTUFHRSA9IFwiLi9pbWFnZXMvZm9nLndlYnBcIjtcclxudmFyIFFVRVNUSU9OX0lNQUdFID0gXCIuL2ltYWdlcy9xdWVzdGlvbi5qcGdcIjtcclxudmFyIElOVklTRV9JTUFHRSA9IFwiLi9pbWFnZXMvem9ycm9fbWFzay5qcGVnXCI7XHJcbnZhciBBSU1fSU1BR0UgPSBcIi4vaW1hZ2VzL2FpbS5qcGdcIjtcclxudmFyIFJJR0hUX0FSUk9XX0lNQUdFID0gXCIuL2ltYWdlcy9yaWdodF9hcnJvdy5wbmdcIjtcclxuXHJcbnZhciBNQVhfWk9ORVMgPSAyNTtcclxudmFyIENIQVRfQ0FTSCA9IDE1O1xyXG5cclxudmFyIHN0YW1pbmFfd2Vha3Nwb3RfY29zdCA9IDFcclxudmFyIHN0YW1pbmFfbW92ZV9jb3N0ID0gMFxyXG52YXIgc3RhbWluYV9hdHRhY2tfY29zdCA9IDFcclxudmFyIHB1bmNoX3JhaW5mYWxsX3N0YW1pbmFfY29zdCA9IDIgLy8gcGVyIHB1bmNoXHJcbnZhciBzdGFtaW5hX2N1dF9saW1iX2Nvc3QgPSA0XHJcbnZhciBzaGllbGRfdXBfc3RhbWluYV9jb3N0ID0gMiAvLyBwZXIgbW92ZSBJIHRoaW5rXHJcbnZhciBsb3R0ZXJ5X3Nob3Rfc3RhbWluYV9jb3N0ID0gMVxyXG52YXIgbHVja3lfc2hvdF9zdGFtaW5hX2Nvc3QgPSAxXHJcbnZhciBhY3Rpb25fc3BsYXNoX3N0YW1pbmFfY29zdCA9IDJcclxudmFyIGFkcmVuYWxpbmVfc3RhbWluYV9jb3N0ID0gM1xyXG52YXIgYWNpZF9ib21iX3N0YW1pbmFfY29zdCA9IDNcclxudmFyIGN1cnZlZF9idWxsZXRzX3N0YW1pbmFfY29zdCA9IDJcclxuXHJcbnZhciBjdXRfbGltYl9jb29sZG93biA9IDFcclxuXHJcbnZhciByZXN0X3N0YW1pbmFfZ2FpbiA9IDVcclxuXHJcbnZhciBjdXRfbGltYl9kdXJhdGlvbiA9IDFcclxudmFyIGNvb2xkb3duX2JpZ19icm8gPSAxIC8vIGR1cmF0aW9uXHJcblxyXG52YXIgc2hpZWxkX3VwX0tEID0gM1xyXG5cclxudmFyIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZSA9IDRcclxudmFyIGNoYXJnZV9tb3ZlX2luY3JlYXNlID0gNFxyXG5cclxudmFyIGdhc19ib21iX3RocmVzaG9sZCA9IDExXHJcbnZhciBnYXNfYm9tYl9tb3ZlX3JlZHVjdGlvbiA9IDJcclxudmFyIGdhc19ib21iX3N0YW1pbmFfY29zdCA9IDNcclxudmFyIGdhc19ib21iX29ic3RhY2xlID0gMTVcclxudmFyIGdhc19ib21iX3NraWxsX2Nvb2xkb3duID0gNVxyXG5cclxudmFyIGxpZ2h0X3NvdW5kX2JvbWJfcmFkaXVzID0gNFxyXG52YXIgbGlnaHRfc291bmRfYm9tYl90aHJlc2hvbGQgPSAxNVxyXG52YXIgbGlnaHRfc291bmRfYm9tYl9za2lsbF9jb29sZG93biA9IDVcclxuXHJcbnZhciB3ZWFrX3Nwb3RfdGhyZXNob2xkID0gMTVcclxuXHJcbnZhciBzaG9ja2VkX2Nvb2xkb3duID0gMFxyXG5cclxudmFyIHBpY2hfcGljaF9jb29sZG93biA9IDRcclxudmFyIHBpY2hfcGljaF9tb3ZlX2luY3JlYXNlID0gNFxyXG5cclxudmFyIGZvcmNlX2ZpZWxkX3JhZGl1cyA9IDEuNlxyXG52YXIgZm9yY2VfZmllbGRfc3RhbWluYV9jb3N0ID0gNVxyXG52YXIgZm9yY2VfZmllbGRfY29vbGRvd24gPSAxMFxyXG52YXIgZm9yY2VfZmllbGRfb2JzdGFjbGUgPSAyNFxyXG5cclxudmFyIGFjdGlvbl9zcGxhc2hfY29vbGRvd24gPSA0XHJcblxyXG52YXIgaW52aXNpYmlsaXR5X2RldGVjdGlvbl9yYWRpdXMgPSAyO1xyXG5cclxudmFyIGJpZ19icm9fcmFuZ2UgPSAyXHJcbnZhciBoZWFsX3JhbmdlID0gMVxyXG52YXIgdGhyb3dfYmFzZV9yYW5nZSA9IDJcclxudmFyIGxpZ2h0X3NvdW5kX2JvbWJfcmFuZ2UgPSA1XHJcbnZhciBmb3JjZV9maWVsZF9yYW5nZSA9IDFcclxudmFyIGFkcmVuYWxpbmVfcmFuZ2UgPSAxXHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9yYW5nZSA9IDFcclxuXHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbiA9IDJcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX2Nvb2xkb3duID0gNVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfZmxhdF9IUCA9IDVcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX2ZsYXRfc3RhbWluYSA9IDVcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX3BlcmNlbnRfSFAgPSAwLjA1XHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9wZXJjZW50X3N0YW1pbmEgPSAwLjA1XHJcblxyXG52YXIgYWRyZW5hbGluZV9jb29sZG93biA9IDNcclxuXHJcbnZhciBhY2lkX2JvbWJfZHVyYXRpb24gPSAyIC8vIDIrMSByZWFsbHlcclxudmFyIGFjaWRfYm9tYl9jb29sZG93biA9IDVcclxudmFyIGFjaWRfYm9tYl9yYWRpdXMgPSAxLjZcclxuXHJcbnZhciBtaW5lc18wX2Rpc3RhbmNlX2RhbWFnZSA9IDIwXHJcbnZhciBtaW5lc18xX2Rpc3RhbmNlX2RhbWFnZSA9IDE1XHJcbnZhciBtaW5lc18xcDVfZGlzdGFuY2VfZGFtYWdlID0gMTBcclxudmFyIGxhbmRtaW5lX2RldGVjdGlvbl9yYWRpdXMgPSAyLjlcclxudmFyIGxhbmRtaW5lX2RpZmZ1c2VfdGhyZXNob2xkID0gMTBcclxuXHJcbnZhciB0b2JhY2NvX3N0cmlrZV9ocF9wZXJjZW50YWdlID0gMC4xXHJcbnZhciB0b2JhY2NvX3N0cmlrZV9ib251cyA9IDRcclxudmFyIHRvYmFjY29fc3RyaWtlX2Nvb2xkb3duID0gMVxyXG5cclxudmFyIHNhZmV0eV9zZXJ2aWNlX3JhbmdlID0gMjtcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2Nvb2xkb3duID0gMTtcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2R1cmF0aW9uID0gMTtcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2RlZmVuc2l2ZV9hZHZhbnRhZ2UgPSAxO1xyXG52YXIgc2FmZXR5X3NlcnZpY2VfZXZhZGVfYm9udXMgPSAzO1xyXG52YXIgc2FmZXR5X3NlcnZpY2VfYm9udXNfYWN0aW9uc19jb3N0ID0gMjtcclxuXHJcbnZhciBjYWxpbmdhbGF0b3JfcmFuZ2UgPSAxLjY7XHJcbnZhciBjYWxpbmdhbGF0b3Jfb2JzdGFjbGUgPSAyMDtcclxudmFyIGNhbGluZ2FsYXRvcl9kdXJhdGlvbiA9IDM7XHJcbnZhciBjYWxpbmdhbGF0b3Jfc3RhbWluYV9jb3N0ID0gMztcclxudmFyIGNhbGluZ2FsYXRvcl9yYWRpdXMgPSAxLjY7XHJcbnZhciBjYWxpbmdhbGF0b3Jfc2tpbGxfY29vbGRvd24gPSAxMDtcclxudmFyIGNhbGluZ2FsYXRvcl9mbGF0X2hlYWwgPSA1O1xyXG52YXIgY2FsaW5nYWxhdG9yX3JvbGxfaGVhbCA9IDU7XHJcblxyXG4vLyBUaGlzIGlzIGEgY29uc3RhbnQsIHdpbGwgYmUgbW92ZWQgdG8gZGF0YWJhc2UgbGF0ZXJcclxuY29uc3QgSFBfdmFsdWVzID0gWzE1LCAzMCwgNDAsIDU1LCA3NSwgMTAwLCAxMzAsIDE2NSwgMjA1LCAyNTAsIDMwMCwgMzU1LCA0MTVdO1xyXG5jb25zdCBzdGFtaW5hX3ZhbHVlcyA9IFszMCwgNDUsIDYwLCA3NSwgOTAsIDEwNSwgMTIwLCAxMzUsIDE1MCwgMTY1LCAxODAsIDE5NV07XHJcbmNvbnN0IHN0cmVuZ3RoX2RhbWFnZV9tYXAgPSBbLTIsIDAsIDEsIDMsIDYsIDEwLCAxNSwgMjEsIDI4LCAzNiwgNDUsIDU1XVxyXG5jb25zdCBtb3ZlX2FjdGlvbl9tYXAgPSBbMSwgMywgNCwgNiwgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNV1cclxuY29uc3QgYm9udXNfYWN0aW9uX21hcD0gWzAsIDEsIDEsIDIsIDIsIDIsIDIsIDIsIDMsIDMsIDMsIDNdXHJcbmNvbnN0IG1haW5fYWN0aW9uX21hcCA9IFsxLCAxLCAxLCAxLCAxLCAxLCAyLCAyLCAyLCAyLCAyLCAzXVxyXG5cclxudmFyIENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVCA9IHtIUDogW10sIG1haW5fYWN0aW9uOiBbXSwgYm9udXNfYWN0aW9uOiBbXSwgbW92ZV9hY3Rpb246IFtdLCBzdGFtaW5hOiBbXSwgaW5pdGlhdGl2ZTogW10sIGNhbl9ldmFkZTogW10sIGhhc19tb3ZlZDogW10sIEtEX3BvaW50czogW10sIGN1cnJlbnRfd2VhcG9uOiBbXSwgdmlzaWJpbGl0eTogW10sIGludmlzaWJpbGl0eTogW10sIGF0dGFja19ib251czogW10sIGRhbWFnZV9ib251czogW10sIHVuaXZlcnNhbF9ib251czogW10sIGJvbnVzX0tEOiBbXSwgc3BlY2lhbF9lZmZlY3RzOiBbXSwgcmFuZ2VkX2FkdmFudGFnZTogW10sIG1lbGVlX2FkdmFudGFnZTogW10sIGRlZmVuc2l2ZV9hZHZhbnRhZ2U6IFtdLCBwb3NpdGlvbjogW10sIGV2YWRlX2JvbnVzOiBbXSwgbWVsZWVfcmVzaXN0OiBbXSwgYnVsbGV0X3Jlc2lzdDogW119O1xyXG5sZXQgZ2FtZV9zdGF0ZSA9IHtib2FyZF9zdGF0ZTogW10sIGZvZ19zdGF0ZTogW10sIHpvbmVfc3RhdGU6IFtdLCBzaXplOiAwLCBzZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGU6IFtdLCB0ZXJyYWluX2VmZmVjdHM6IFtdLCBiYXR0bGVfbW9kOiAwLCBsYW5kbWluZXM6IHtwb3NpdGlvbnM6IFtdLCBrbm93ZXJzOiBbXX19O1xyXG5sZXQgY2hhcmFjdGVyX3N0YXRlID0gQ0hBUkFDVEVSX1NUQVRFX0NPTlNUQU5UO1xyXG5cclxubGV0IGdtX2NvbnRyb2xfbW9kID0gMDsgLy8gbm9ybWFsIG1vZGVcclxuXHJcbi8vIGluX3Byb2Nlc3M6IDAgPSBub3RoaW5nLCAxID0gbW92ZSwgMiA9IGF0dGFjaywgMyA9IHNraWxsXHJcbmxldCBjaGFyYWN0ZXJfY2hvc2VuID0ge2luX3Byb2Nlc3M6IDAsIGNoYXJfaWQ6IDAsIGNoYXJfcG9zaXRpb246IDAsIHdlYXBvbl9pZDogMCwgc2tpbGxfaWQ6IDAsIGNlbGw6IDB9O1xyXG5cclxubGV0IGxhc3Rfb2JzdGFjbGUgPSAxO1xyXG5sZXQgem9uZV9lbmRwb2ludCA9IHtpbmRleDogLTEsIGNlbGw6IDB9XHJcblxyXG52YXIgZ3Vuc2hvdF9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL2d1bnNob3QubXAzJyk7XHJcbnZhciBzd29yZF9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL3N3b3JkLndhdicpO1xyXG52YXIgZXhwbG9zaW9uX2F1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvZXhwbG9zaW9uLm1wMycpO1xyXG52YXIgc3VyaWtlbl9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL3N1cmlrZW4ubXAzJyk7XHJcblxyXG5ndW5zaG90X2F1ZGlvLnZvbHVtZSA9IDAuMlxyXG5zd29yZF9hdWRpby52b2x1bWUgPSAwLjJcclxuc3VyaWtlbl9hdWRpby52b2x1bWUgPSAwLjJcclxuZXhwbG9zaW9uX2F1ZGlvLnZvbHVtZSA9IDAuMlxyXG5cclxuZnVuY3Rpb24gcmVjb25uZWN0KCkge1xyXG4gIGlmICghc29ja2V0LmlzUmVhZHkoKSkge1xyXG4gICAgc29ja2V0LmluaXQoU0VSVkVSX0FERFJFU1MpO1xyXG4gICAgc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0KCk7XHJcbiAgICBjb25zb2xlLmxvZygnSG9wZWZ1bGx5IHJlY29ubmVjdGVkIChwcmF5KScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnV2FzIG9ubGluZSBhbnl3YXknKTtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ2lnbm9yZV9tZSc7XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9XHJcbn1cclxuXHJcbi8vINCh0L7Qt9C00LDQvdC40LUg0LTQvtGB0LrQuCwgb25jbGljayDQutC70LXRgtC+0LosIHNhdmUvbG9hZFxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XHJcbiAgZ2FtZV9zdGF0ZS5zaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZF9zaXplXCIpLnZhbHVlO1xyXG4gIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLmZvZ19zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuem9uZV9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUgKiBnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG4gICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGUucHVzaCgwKTtcclxuICB9XHJcbiAgc2VuZF9jb25zdHJ1Y3RfY29tbWFuZChnYW1lX3N0YXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEJvYXJkKCkge1xyXG4gIHZhciBuYW1lID0gc2F2ZXNfc2VsZWN0LnZhbCgpO1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdsb2FkX2dhbWUnO1xyXG4gIHRvU2VuZC5zYXZlX25hbWUgPSBuYW1lO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVCb2FyZCgpIHtcclxuICB2YXIgc2F2ZV9uYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfbmFtZVwiKS52YWx1ZTtcclxuICB2YXIgZnVsbF9nYW1lX3N0YXRlID0ge1xyXG4gICAgZ2FtZV9zdGF0ZTogZ2FtZV9zdGF0ZSxcclxuICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvOiBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyxcclxuICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm86IG9ic3RhY2xlX2RldGFpbGVkX2luZm8sXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGU6IGNoYXJhY3Rlcl9zdGF0ZVxyXG4gIH07XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdzYXZlX2dhbWUnO1xyXG4gIHRvU2VuZC5zYXZlX25hbWUgPSBzYXZlX25hbWU7XHJcbiAgdG9TZW5kLmZ1bGxfZ2FtZV9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kX2NvbnN0cnVjdF9jb21tYW5kKG5ld19nYW1lX3N0YXRlKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2NvbnN0cnVjdF9ib2FyZCc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuZ2FtZV9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb25zdHJ1Y3RfYm9hcmQobmV3X2dhbWVfc3RhdGUpIHtcclxuICBnYW1lX3N0YXRlID0gbmV3X2dhbWVfc3RhdGVcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIGJvYXJkX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xyXG4gIGJvYXJkX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIHZhciBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuICBib2FyZC5jbGFzc05hbWUgPSBcImJvYXJkXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIHZhciByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICByb3cuY2xhc3NOYW1lID0gXCJib2FyZF9yb3dcIjtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZV9zdGF0ZS5zaXplOyBqKyspIHtcclxuICAgICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICAgIHZhciBjZWxsX2lkID0gaSAqIGdhbWVfc3RhdGUuc2l6ZSArIGo7XHJcbiAgICAgIGJ1dHRvbi5pZCA9IFwiY2VsbF9cIiArIGNlbGxfaWQ7XHJcbiAgICAgIGJ1dHRvbi5yb3cgPSBpO1xyXG4gICAgICBidXR0b24uY29sdW1uID0gajtcclxuICAgICAgdmFyIGltYWdlX25hbWUgPSBmb2dPclBpYyhjZWxsX2lkKTtcclxuICAgICAgYnV0dG9uLnNyYyA9IGltYWdlX25hbWU7XHJcbiAgICAgIGJ1dHRvbi5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdib2FyZF9jZWxsJztcclxuICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHZhciBpbmRleCA9IGNlbGwucm93ICogZ2FtZV9zdGF0ZS5zaXplICsgY2VsbC5jb2x1bW47XHJcblxyXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgc2hpZnRfb25jbGljayhpbmRleCwgY2VsbClcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAgIGN0cmxfb25jbGljayhpbmRleClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbm9fc2hpZnRfb25jbGljayhteV9yb2xlLCBnbV9jb250cm9sX21vZCwgZ2FtZV9zdGF0ZSwgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzLCBjZWxsLCBpbmRleClcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG4gICAgICBidXR0b24uZHJhZ2dhYmxlID0gdHJ1ZTtcclxuICAgICAgYnV0dG9uLm9uZHJhZ292ZXIgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgICAgYnV0dG9uLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICB2YXIgaW5kZXggPSBjZWxsLnJvdyAqIGdhbWVfc3RhdGUuc2l6ZSArIGNlbGwuY29sdW1uO1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF07XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9udW1iZXIgPiAwICYmIChteV9yb2xlID09IFwiZ21cIiB8fCBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSAmJiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAnYWxsJyB8fCBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IG15X25hbWUpICYmIChteV9yb2xlID09IFwiZ21cIiB8fCBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPT0gMCkpIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShpbmRleCwgY2VsbClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgYnV0dG9uLm9uZHJvcCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gY2VsbC5yb3cgKiBnYW1lX3N0YXRlLnNpemUgKyBjZWxsLmNvbHVtbjtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID09IDEgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gPT0gMCAmJiAobXlfcm9sZSA9PSBcImdtXCIgfHwgZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDApKSB7XHJcbiAgICAgICAgICBtb3ZlX2NoYXJhY3RlcihpbmRleCwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGNlbGxfd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuICAgICAgY2VsbF93cmFwLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgIGNlbGxfd3JhcC5jbGFzc05hbWUgPSBcImNlbGxfd3JhcFwiO1xyXG5cclxuICAgICAgdmFyIHpvbmVfdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIHpvbmVfdGV4dC5pZCA9IFwiem9uZV90ZXh0X1wiICsgY2VsbF9pZDtcclxuICAgICAgem9uZV90ZXh0LmNsYXNzTmFtZSA9IFwiem9uZV90ZXh0XCI7XHJcbiAgICAgIGNlbGxfd3JhcC5hcHBlbmRDaGlsZCh6b25lX3RleHQpO1xyXG5cclxuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGxfd3JhcCk7XHJcbiAgICB9XHJcbiAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xyXG4gIH1cclxuICBib2FyZF9jb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBub19zaGlmdF9vbmNsaWNrKG15X3JvbGUsIGdtX2NvbnRyb2xfbW9kLCBnYW1lX3N0YXRlLCBmaWVsZF9jaG9zZW4sIGNlbGwsIGluZGV4KSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgLy8gZ20gc2lkZVxyXG4gICAgaWYgKGdtX2NvbnRyb2xfbW9kID09IDApIHtcclxuICAgICAgLy8gd2UgYXJlIGluIG5vcm1hbCBhZGQvbW92ZSBkZWxldGUgbW9kZVxyXG4gICAgICBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIG15X3JvbGUpO1xyXG4gICAgfSBlbHNlIGlmIChnbV9jb250cm9sX21vZCA9PSAxKSB7XHJcbiAgICAgIC8vIHdlIGFyZSBpbiBmb2cgbW9kZVxyXG4gICAgICBhcHBseUZvZyhpbmRleCwgY2VsbCk7XHJcbiAgICB9IGVsc2UgaWYgKGdtX2NvbnRyb2xfbW9kID09IDIpIHtcclxuICAgICAgLy8gd2UgYXJlIGluIHpvbmVzIG1vZGVcclxuICAgICAgYXNzaWduWm9uZShpbmRleCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIHBsYXllciBzaWRlXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDEpIHtcclxuICAgICAgLy8gY2xpY2tlZCBmb2dcclxuICAgICAgaWYgKGZpZWxkX2Nob3NlbiA9PSAxKSB7XHJcbiAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIGZvZyBkZXRlY3RlZCcpO1xyXG4gICAgICAgIGRpc3BsYXlGb2coKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCBteV9yb2xlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNoaWZ0X29uY2xpY2soaW5kZXgsIGNlbGwpIHtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICBpZiAoZ21fY29udHJvbF9tb2QgPT0gMikge1xyXG4gICAgICBpZiAoem9uZV9lbmRwb2ludC5pbmRleCA8IDApIHtcclxuICAgICAgICB6b25lX2VuZHBvaW50LmluZGV4ID0gaW5kZXhcclxuICAgICAgICB6b25lX2VuZHBvaW50LmNlbGwgPSBjZWxsXHJcbiAgICAgICAgY2VsbC5zcmMgPSBaT05FX0VORFBPSU5UX1BJQ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVuZHBvaW50X2Fzc2lnbl96b25lKGluZGV4LCB6b25lX2VuZHBvaW50LmluZGV4KVxyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQ1xyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuaW5kZXggPSAtMVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9vYnN0YWNsZSc7XHJcbiAgICAgIHRvU2VuZC5jZWxsX2lkID0gaW5kZXg7XHJcbiAgICAgIHRvU2VuZC5vYnN0YWNsZV9udW1iZXIgPSBsYXN0X29ic3RhY2xlO1xyXG4gICAgICB0b1NlbmQub2JzdGFjbGVfbmFtZSA9IG9ic3RhY2xlX2xpc3RbbGFzdF9vYnN0YWNsZSAtIDFdO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGN0cmxfb25jbGljayhpbmRleCkge1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIHZhciBmb2dfdmFsdWUgPSBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF1cclxuICAgIHZhciBtb2QgPSAxIC0gZm9nX3ZhbHVlXHJcbiAgICB2YXIgem9uZSA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF1cclxuICAgIGZvZ1BhcnNlWm9uZShtb2QsIHpvbmUpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIHJvbGUpIHtcclxuXHRpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gPT0gMCkgeyAvLyBlbXB0eSBjZWxsIGNsaWNrZWRcclxuXHJcbiAgICBzd2l0Y2goY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzKSB7XHJcbiAgICAgIGNhc2UgMDogLy8gbm90aGluZ1xyXG4gICAgICAgIGlmIChyb2xlID09ICdnbScpIHtcclxuICAgICAgICAgIGFkZF9vYmplY3QoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxOiAvLyBtb3ZlXHJcbiAgICAgICAgbW92ZV9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6IC8vYXR0YWNrXHJcbiAgICAgICAgc3RvcF9hdHRhY2soKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6IC8vc2tpbGxcclxuICAgICAgICBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVzb2x2aW5nIG9uX2NsaWNrIGVtcHR5XCIpXHJcbiAgICB9XHJcblxyXG5cdH0gZWxzZSBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gPiAwKSB7IC8vIGNoYXJhY3RlciBjbGlja2VkXHJcbiAgICBzd2l0Y2goY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzKSB7XHJcbiAgICAgIGNhc2UgMDogLy8gbm90aGluZ1xyXG4gICAgICAgIHNlbGVjdF9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6IC8vIG1vdmVcclxuICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6IC8vYXR0YWNrXHJcbiAgICAgICAgcGVyZm9ybV9hdHRhY2soaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzogLy9za2lsbFxyXG4gICAgICAgIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXNvbHZpbmcgb25fY2xpY2sgY2hhcmFjdGVyXCIpXHJcbiAgICB9XHJcblxyXG5cdH0gZWxzZSB7IC8vIG9ic3RhY2xlIGNsaWNrZWRcclxuXHJcbiAgICBzd2l0Y2goY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzKSB7XHJcbiAgICAgIGNhc2UgMDogLy8gbm90aGluZ1xyXG4gICAgICAgIHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTogLy8gbW92ZVxyXG4gICAgICAgIHVuZG9fc2VsZWN0aW9uKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjogLy9hdHRhY2tcclxuICAgICAgICBzdG9wX2F0dGFjaygpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzogLy9za2lsbFxyXG4gICAgICAgIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXNvbHZpbmcgb25fY2xpY2sgb2JzdGFjbGVcIilcclxuICAgIH1cclxuXHJcblx0fVxyXG59XHJcblxyXG4vLyBab25lL2ZvZyByZWxhdGVkIHN0YWZmXHJcblxyXG5mdW5jdGlvbiBlbmRwb2ludF9hc3NpZ25fem9uZShlbmRwb2ludDEsIGVuZHBvaW50Mikge1xyXG4gIHZhciB6b25lX251bWJlciA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICB2YXIgbW9kaWZpY2F0b3IgPSBzZWFyY2hfbW9kaWZpY2F0b3IudmFsKCk7XHJcbiAgdmFyIHNpemUgPSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIGluZGV4X2xpc3QgPSBbXVxyXG5cclxuICB2YXIgY29vcmQxID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQxLCBzaXplKVxyXG4gIHZhciBjb29yZDIgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDIsIHNpemUpXHJcblxyXG4gIHZhciB0b3BfbGVmdCA9IHRvcF9sZWZ0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKVxyXG4gIHZhciBib3R0b21fcmlnaHQgPSBib3R0b21fcmlnaHRfY29vcmQoY29vcmQxLCBjb29yZDIpXHJcblxyXG4gIGZvciAobGV0IGkgPSB0b3BfbGVmdC54OyBpIDw9IGJvdHRvbV9yaWdodC54OyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSB0b3BfbGVmdC55OyBqIDw9IGJvdHRvbV9yaWdodC55OyBqKyspIHtcclxuICAgICAgdmFyIGNvb3JkID0ge31cclxuICAgICAgY29vcmQueCA9IGlcclxuICAgICAgY29vcmQueSA9IGpcclxuICAgICAgdmFyIGluZGV4ID0gY29vcmRfdG9faW5kZXgoY29vcmQsIHNpemUpXHJcblxyXG4gICAgICBpbmRleF9saXN0LnB1c2goaW5kZXgpXHJcbiAgICAgIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9uZV90ZXh0XycgKyBpbmRleCk7XHJcbiAgICAgIHpvbmVfdGV4dC5pbm5lckhUTUwgPSB6b25lX251bWJlciArICcoJyArIG1vZGlmaWNhdG9yICsgJyknO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2Fzc2lnbl96b25lJztcclxuICB0b1NlbmQuem9uZV9udW1iZXIgPSB6b25lX251bWJlcjtcclxuICB0b1NlbmQuaW5kZXhfbGlzdCA9IGluZGV4X2xpc3Q7XHJcbiAgdG9TZW5kLm1vZGlmaWNhdG9yID0gbW9kaWZpY2F0b3I7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduWm9uZShpbmRleCkge1xyXG4gIHZhciB6b25lX251bWJlciA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICB2YXIgbW9kaWZpY2F0b3IgPSBzZWFyY2hfbW9kaWZpY2F0b3IudmFsKCk7XHJcblxyXG4gIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9uZV90ZXh0XycgKyBpbmRleCk7XHJcbiAgem9uZV90ZXh0LmlubmVySFRNTCA9IHpvbmVfbnVtYmVyICsgJygnICsgbW9kaWZpY2F0b3IgKyAnKSc7XHJcblxyXG4gIHZhciBpbmRleF9saXN0ID0gW11cclxuICBpbmRleF9saXN0LnB1c2goaW5kZXgpXHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhc3NpZ25fem9uZSc7XHJcbiAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgdG9TZW5kLmluZGV4X2xpc3QgPSBpbmRleF9saXN0O1xyXG4gIHRvU2VuZC5tb2RpZmljYXRvciA9IG1vZGlmaWNhdG9yO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5Rm9nKGluZGV4LCBjZWxsKSB7XHJcblx0aWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9PSAxKSB7XHJcblx0XHQvLyBzZW5kIHVwZGF0ZSBtZXNzYWdlXHJcblx0XHR2YXIgdG9TZW5kID0ge307XHJcblx0XHR0b1NlbmQuY29tbWFuZCA9ICd1cGRhdGVfZm9nJztcclxuXHRcdHRvU2VuZC51cGRhdGVfdHlwZSA9ICdyZW1vdmUnO1xyXG5cdFx0dG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG5cdFx0c29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIHNlbmQgdXBkYXRlIG1lc3NhZ2VcclxuXHRcdHZhciB0b1NlbmQgPSB7fTtcclxuXHRcdHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG5cdFx0dG9TZW5kLnVwZGF0ZV90eXBlID0gJ2FkZCc7XHJcblx0XHR0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblx0XHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ01vZGVDaGFuZ2UoKSB7XHJcbiAgaWYgKGdtX2NvbnRyb2xfbW9kICE9IDEpIHtcclxuICAgIC8vIHR1cm4gb24gZm9nIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDE7XHJcbiAgICBmb2dfYnV0dG9uLnRleHQoJ9CS0YvQutC7INCi0YPQvNCw0L0g0JLQvtC50L3RiycpO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2ldID09IDEpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF9jZWxsLnNyYyA9IEZPR19JTUFHRTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyB0dXJuIG9mZiBmb2cgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMDtcclxuICAgIGZvZ19idXR0b24udGV4dCgn0JLQutC7INCi0YPQvNCw0L0g0JLQvtC50L3RiycpO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2ldID09IDEpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF9jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gem9uZU1vZGVDaGFuZ2UoKSB7XHJcbiAgaWYgKGdtX2NvbnRyb2xfbW9kICE9IDIpIHtcclxuICAgIC8vIHR1cm4gb24gem9uZSBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAyO1xyXG4gICAgem9uZV9idXR0b24udGV4dCgn0JLRi9C60Lsg0JfQvtC90LDQu9GM0L3Ri9C5INGA0LXQttC40LwnKTtcclxuICAgIHpvbmVfbnVtYmVyX3NlbGVjdC5zaG93KCk7XHJcbiAgICBmb2dfem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgdW5mb2dfem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgc2VhcmNoX21vZGlmaWNhdG9yLnNob3coKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRpZiAoZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldID4gMCkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X3pvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uZV90ZXh0X1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF96b25lX3RleHQuaW5uZXJIVE1MID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldICsgJygnICsgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaV0gKyAnKSc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gYmFjayB0byBub3JtYWwgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAwO1xyXG4gICAgem9uZV9idXR0b24udGV4dCgn0JLQutC7INCX0L7QvdCw0LvRjNC90YvQuSDRgNC10LbQuNC8Jyk7XHJcbiAgICB6b25lX251bWJlcl9zZWxlY3QuaGlkZSgpO1xyXG4gICAgZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuICAgIHVuZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuICAgIHNlYXJjaF9tb2RpZmljYXRvci5oaWRlKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF96b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmVfdGV4dF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfem9uZV90ZXh0LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0fVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9nQ3VycmVudFpvbmUoKSB7XHJcbiAgdmFyIGN1cnJlbnRfem9uZSA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICBmb2dQYXJzZVpvbmUoMSwgY3VycmVudF96b25lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5mb2dDdXJyZW50Wm9uZSgpIHtcclxuICBmb2dQYXJzZVpvbmUoMCwgY3VycmVudF96b25lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9nUGFyc2Vab25lKG1vZCwgY3VycmVudF96b25lKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgaWYgKG1vZCA9PSAwKSB7XHJcbiAgICB0b1NlbmQudXBkYXRlX3R5cGUgPSAncmVtb3ZlJztcclxuICB9IGVsc2UgaWYgKG1vZCA9PSAxKSB7XHJcbiAgICB0b1NlbmQudXBkYXRlX3R5cGUgPSAnYWRkJztcclxuICB9XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUgKiBnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG4gICAgaWYgKGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpXSA9PSBjdXJyZW50X3pvbmUpIHtcclxuICAgICAgdG9TZW5kLmluZGV4ID0gaTtcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBIZWxwZXIgY29vcmRpbmF0ZSByZWxhdGVkIGZ1bmN0aW9uc1xyXG5cclxuZnVuY3Rpb24gdG9wX2xlZnRfY29vcmQoY29vcmQxLCBjb29yZDIpIHtcclxuICB2YXIgdG9SZXQgPSB7fVxyXG4gIHRvUmV0LnggPSBNYXRoLm1pbihjb29yZDEueCwgY29vcmQyLngpXHJcbiAgdG9SZXQueSA9IE1hdGgubWluKGNvb3JkMS55LCBjb29yZDIueSlcclxuICByZXR1cm4gdG9SZXRcclxufVxyXG5cclxuZnVuY3Rpb24gYm90dG9tX3JpZ2h0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKSB7XHJcbiAgdmFyIHRvUmV0ID0ge31cclxuICB0b1JldC54ID0gTWF0aC5tYXgoY29vcmQxLngsIGNvb3JkMi54KVxyXG4gIHRvUmV0LnkgPSBNYXRoLm1heChjb29yZDEueSwgY29vcmQyLnkpXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvb3JkX3RvX2luZGV4KGNvb3JkLCBzaXplKSB7XHJcbiAgdmFyIGluZGV4ID0gY29vcmQueCAqIHNpemUgKyBjb29yZC55XHJcbiAgcmV0dXJuIGluZGV4XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluZGV4X3RvX2Nvb3JkaW5hdGVzKGluZGV4LCBzaXplKSB7XHJcbiAgdmFyIHRvUmV0ID0ge31cclxuICB0b1JldC54ID0gTWF0aC5mbG9vcihpbmRleC9zaXplKVxyXG4gIHRvUmV0LnkgPSBpbmRleCAlIHNpemVcclxuICByZXR1cm4gdG9SZXRcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZERpc3RhbmNlKGluZGV4MSwgaW5kZXgyKSB7XHJcbiAgdmFyIHgxID0gTWF0aC5mbG9vcihpbmRleDEvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MSA9IGluZGV4MSAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgeDIgPSBNYXRoLmZsb29yKGluZGV4Mi9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkyID0gaW5kZXgyICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciBkaXN0YW5jZV9zcXVhcmVkID0gKHgxLXgyKSooeDEteDIpICsgKHkxLXkyKSooeTEteTIpXHJcbiAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KGRpc3RhbmNlX3NxdWFyZWQpXHJcbiAgcmV0dXJuIHBhcnNlRmxvYXQoZGlzdGFuY2UpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzSW5SYW5nZShpbmRleDEsIGluZGV4MiwgcmFuZ2UpIHtcclxuICB2YXIgeDEgPSBNYXRoLmZsb29yKGluZGV4MS9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkxID0gaW5kZXgxICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciB4MiA9IE1hdGguZmxvb3IoaW5kZXgyL2dhbWVfc3RhdGUuc2l6ZSlcclxuICB2YXIgeTIgPSBpbmRleDIgJSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIGRpc3RhbmNlID0gKHgxLXgyKSooeDEteDIpICsgKHkxLXkyKSooeTEteTIpXHJcbiAgcmV0dXJuIGRpc3RhbmNlIDw9IHJhbmdlKnJhbmdlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluZGV4X2luX3JhZGl1cyhpbmRleCwgcmFuZ2UpIHtcclxuICB2YXIgc2l6ZSA9IGdhbWVfc3RhdGUuc2l6ZVxyXG4gIHZhciB4ID0gTWF0aC5mbG9vcihpbmRleC9zaXplKVxyXG4gIHZhciB5ID0gaW5kZXggJSBzaXplXHJcbiAgdmFyIGNhbmRpZGF0ZV9pbmRleF9saXN0ID0gW11cclxuXHJcbiAgLy9jb25zb2xlLmxvZyhcIng6IFwiICsgeCArIFwiIHk6IFwiICsgeSArIFwiIGluZGV4OiBcIiArIGluZGV4KVxyXG5cclxuICBmb3IgKGxldCBpID0gTWF0aC5mbG9vcigtMSAqIHJhbmdlKTsgaSA8PSBNYXRoLmNlaWwocmFuZ2UpOyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSBNYXRoLmZsb29yKC0xICogcmFuZ2UpOyBqIDw9IE1hdGguY2VpbChyYW5nZSk7IGorKykge1xyXG4gICAgICB2YXIgY2FuZF94ID0geCArIGlcclxuICAgICAgdmFyIGNhbmRfeSA9IHkgKyBqXHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJjYW5kX3g6IFwiICsgY2FuZF94ICsgXCIgY2FuZF95OiBcIiArIGNhbmRfeSlcclxuICAgICAgaWYgKGNhbmRfeCA+PTAgJiYgY2FuZF94IDwgc2l6ZSAmJiBjYW5kX3kgPj0wICYmIGNhbmRfeSA8IHNpemUpIHtcclxuICAgICAgICB2YXIgY2FuZF9pbmRleCA9IGNhbmRfeCpzaXplICsgY2FuZF95XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImNhbmRfaW5kZXg6IFwiICsgY2FuZF9pbmRleClcclxuICAgICAgICBpZiAoaXNJblJhbmdlKGluZGV4LCBjYW5kX2luZGV4LCByYW5nZSkpIHtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjYW5kX2luZGV4OiBcIiArIGNhbmRfaW5kZXggKyBcIndhcyBjb25zaWRlcmVkIGluIHJhbmdlXCIpXHJcbiAgICAgICAgICBjYW5kaWRhdGVfaW5kZXhfbGlzdC5wdXNoKGNhbmRfaW5kZXgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjYW5kaWRhdGVfaW5kZXhfbGlzdFxyXG59XHJcblxyXG5mdW5jdGlvbiBsaW5lX2Zyb21fZW5kcG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XHJcbiAgdmFyIGxpbmUgPSB7fVxyXG4gIGxpbmUuYSA9IC0xKihwb2ludDEueSAtIHBvaW50Mi55KVxyXG4gIGxpbmUuYiA9IHBvaW50MS54IC0gcG9pbnQyLnhcclxuICBsaW5lLmMgPSAtMSoobGluZS5hICogcG9pbnQyLnggKyBsaW5lLmIgKiBwb2ludDIueSlcclxuICByZXR1cm4gbGluZVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaXN0YW5jZV90b19saW5lKGVuZHBvaW50MSwgZW5kcG9pbnQyLCBzaXplLCB0ZXN0cG9pbnQpIHtcclxuICB2YXIgZW5kcG9pbnQxX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQxLCBzaXplKVxyXG4gIHZhciBlbmRwb2ludDJfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDIsIHNpemUpXHJcbiAgdmFyIHRlc3Rwb2ludF9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKHRlc3Rwb2ludCwgc2l6ZSlcclxuXHJcbiAgdmFyIGxpbmUgPSBsaW5lX2Zyb21fZW5kcG9pbnRzKGVuZHBvaW50MV9jb29yZCwgZW5kcG9pbnQyX2Nvb3JkKVxyXG4gIGNvbnNvbGUubG9nKGxpbmUpXHJcbiAgY29uc29sZS5sb2codGVzdHBvaW50X2Nvb3JkKVxyXG5cclxuICB2YXIgZGlzdGFuY2UgPSBNYXRoLmFicyhsaW5lLmEqdGVzdHBvaW50X2Nvb3JkLnggKyBsaW5lLmIqdGVzdHBvaW50X2Nvb3JkLnkgKyBsaW5lLmMpL01hdGguc3FydChsaW5lLmEqbGluZS5hICsgbGluZS5iKmxpbmUuYilcclxuXHJcbiAgY29uc29sZS5sb2coZGlzdGFuY2UpXHJcbiAgcmV0dXJuIGRpc3RhbmNlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNlbGxzX29uX2xpbmUoZW5kcG9pbnQxLCBlbmRwb2ludDIsIHNpemUpIHtcclxuICB2YXIgZW5kcG9pbnQxX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQxLCBzaXplKVxyXG4gIHZhciBlbmRwb2ludDJfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDIsIHNpemUpXHJcbiAgdmFyIGxpbmUgPSBsaW5lX2Zyb21fZW5kcG9pbnRzKGVuZHBvaW50MV9jb29yZCwgZW5kcG9pbnQyX2Nvb3JkKVxyXG5cclxuICB2YXIgc2NhbGUgPSBNYXRoLm1heChNYXRoLmFicyhsaW5lLmEpLCBNYXRoLmFicyhsaW5lLmIpKVxyXG4gIC8vIG5lZWQgdG8gYmUgcmV2ZXJzZWQhIHJlbWVtYmVyIGxpbmUuYSA9IGRlbHRhIHlcclxuICB2YXIgeF9zdGVwID0gbGluZS5iL3NjYWxlXHJcbiAgdmFyIHlfc3RlcCA9IC0xKmxpbmUuYS9zY2FsZVxyXG4gIHZhciBjdXJyZW50X3BvaW50ID0gZW5kcG9pbnQyX2Nvb3JkXHJcblxyXG4gIHZhciBzYWZldHlfaXRlciA9IDBcclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gW11cclxuICB3aGlsZSAoTWF0aC5hYnMoY3VycmVudF9wb2ludC54IC0gZW5kcG9pbnQxX2Nvb3JkLngpID4gMC41IHx8IE1hdGguYWJzKGN1cnJlbnRfcG9pbnQueSAtIGVuZHBvaW50MV9jb29yZC55KSA+IDAuNSkge1xyXG4gICAgdmFyIGNlaWwgPSB7fVxyXG4gICAgY2VpbC54ID0gTWF0aC5jZWlsKGN1cnJlbnRfcG9pbnQueClcclxuICAgIGNlaWwueSA9IE1hdGguY2VpbChjdXJyZW50X3BvaW50LnkpXHJcbiAgICB2YXIgY2VpbF9pbmRleCA9IGNvb3JkX3RvX2luZGV4KGNlaWwsIHNpemUpXHJcblxyXG4gICAgdmFyIGZsb29yID0ge31cclxuICAgIGZsb29yLnggPSBNYXRoLmZsb29yKGN1cnJlbnRfcG9pbnQueClcclxuICAgIGZsb29yLnkgPSBNYXRoLmZsb29yKGN1cnJlbnRfcG9pbnQueSlcclxuICAgIHZhciBmbG9vcl9pbmRleCA9IGNvb3JkX3RvX2luZGV4KGZsb29yLCBzaXplKVxyXG5cclxuXHJcbiAgICBjYW5kaWRhdGVfY2VsbHMucHVzaChjZWlsX2luZGV4KVxyXG4gICAgaWYgKGNlaWxfaW5kZXggIT0gZmxvb3JfaW5kZXgpIHtcclxuICAgICAgY2FuZGlkYXRlX2NlbGxzLnB1c2goZmxvb3JfaW5kZXgpXHJcbiAgICB9XHJcblxyXG4gICAgY3VycmVudF9wb2ludC54ID0gY3VycmVudF9wb2ludC54ICArIHhfc3RlcFxyXG4gICAgY3VycmVudF9wb2ludC55ID0gY3VycmVudF9wb2ludC55ICArIHlfc3RlcFxyXG4gICAgc2FmZXR5X2l0ZXIgPSBzYWZldHlfaXRlciArIDFcclxuICAgIGlmIChzYWZldHlfaXRlciA+IDUwKSB7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coY2FuZGlkYXRlX2NlbGxzKVxyXG4gIHJldHVybiBjYW5kaWRhdGVfY2VsbHNcclxufVxyXG5cclxuLy8gYW5pbWF0aW9ucywgY29udGFpbmVyIG1haW50YW5jZVxyXG5cclxuZnVuY3Rpb24gY2xlYXJfY29udGFpbmVycygpIHtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKCkge1xyXG4gIHRpbnlfYW5pbWF0aW9uKGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lcik7XHJcbiAgdGlueV9hbmltYXRpb24od2VhcG9uX2luZm9fY29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGlueV9hbmltYXRpb24oY29udGFpbmVyKSB7XHJcbiAgY29udGFpbmVyLmFkZENsYXNzKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICB9LCA1MCk7XHJcbn1cclxuXHJcbi8vIGFkZGluZyBvYmplY3RzLCBjaGFyYWN0ZXJzXHJcblxyXG5mdW5jdGlvbiBhZGRfb2JqZWN0KGJvYXJkX2luZGV4KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBidXR0b25fY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBidXR0b25fY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiYWRkLW9iamVjdC1idXR0b24tY29udGFpbmVyXCI7XHJcblxyXG4gIHZhciBidXR0b25fYWRkX2NoYXJhY3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uX2FkZF9jaGFyYWN0ZXIuaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMINC/0LXRgNGB0L7QvdCw0LbQsFwiO1xyXG4gIGJ1dHRvbl9hZGRfY2hhcmFjdGVyLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGFkZF9jaGFyYWN0ZXIoYm9hcmRfaW5kZXgpO1xyXG4gIH07XHJcblxyXG4gIHZhciBidXR0b25fYWRkX29ic3RhY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b25fYWRkX29ic3RhY2xlLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1XCI7XHJcbiAgYnV0dG9uX2FkZF9vYnN0YWNsZS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpO1xyXG4gIH07XHJcblxyXG4gIGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9jaGFyYWN0ZXIpO1xyXG4gIGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9vYnN0YWNsZSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b25fY29udGFpbmVyKTtcclxuXHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgb2JzdGFjbGVfbnVtYmVyKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9vYnN0YWNsZSc7XHJcbiAgdG9TZW5kLmNlbGxfaWQgPSBpbmRleDtcclxuICB0b1NlbmQub2JzdGFjbGVfbnVtYmVyID0gb2JzdGFjbGVfbnVtYmVyICsgMTtcclxuICB0b1NlbmQub2JzdGFjbGVfbmFtZSA9IG9ic3RhY2xlX2xpc3Rbb2JzdGFjbGVfbnVtYmVyXTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2VsZWN0LmlkID0gXCJvYnN0YWNsZV9jaG9zZW5cIjtcclxuICBzZWxlY3QuY2xhc3NOYW1lID0gXCJvYmplY3Rfc2VsZWN0XCJcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYnN0YWNsZV9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gb2JzdGFjbGVfbGlzdFtpXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaTtcclxuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgfVxyXG5cclxuICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b24uaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMXCI7XHJcbiAgYnV0dG9uLmJvYXJkX2luZGV4ID0gYm9hcmRfaW5kZXg7XHJcbiAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGJ1dHRvbiA9IGV2ZW50LnRhcmdldDtcclxuICAgIHZhciBvYnN0YWNsZV9udW1iZXIgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9ic3RhY2xlX2Nob3NlblwiKS52YWx1ZSk7XHJcblxyXG4gICAgYWRkX29ic3RhY2xlX2NvbW1hbmQoYnV0dG9uLmJvYXJkX2luZGV4LCBvYnN0YWNsZV9udW1iZXIpXHJcblxyXG4gICAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgfVxyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHNlbGVjdCk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b24pO1xyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZF9jaGFyYWN0ZXIoYm9hcmRfaW5kZXgpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2VsZWN0LmlkID0gXCJjaGFyYWN0ZXJfY2hvc2VuXCI7XHJcbiAgc2VsZWN0LmNsYXNzTmFtZSA9IFwib2JqZWN0X3NlbGVjdFwiXHJcblxyXG4gIHZhciBwbGF5ZXJzX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHBsYXllcnNfb3B0Z3JvdXAuaWQgPSBcInBsYXllcnNfb3B0Z3JvdXBcIlxyXG4gIHBsYXllcnNfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHBsYXllcnNfb3B0Z3JvdXAubGFiZWwgPSBcItCY0LPRgNC+0LrQuFwiXHJcblxyXG4gIHZhciBwZW5ndWluX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHBlbmd1aW5fb3B0Z3JvdXAuaWQgPSBcInBlbmd1aW5fb3B0Z3JvdXBcIlxyXG4gIHBlbmd1aW5fb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHBlbmd1aW5fb3B0Z3JvdXAubGFiZWwgPSBcItCf0LjQvdCz0LLQuNC90YtcIlxyXG5cclxuICB2YXIgc2hpZWxkX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHNoaWVsZF9vcHRncm91cC5pZCA9IFwic2hpZWxkX29wdGdyb3VwXCJcclxuICBzaGllbGRfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHNoaWVsZF9vcHRncm91cC5sYWJlbCA9IFwi0KHQutCy0LDQtNC+0LLRhtGLXCJcclxuXHJcbiAgdmFyIHN3b3JkX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHN3b3JkX29wdGdyb3VwLmlkID0gXCJzd29yZF9vcHRncm91cFwiXHJcbiAgc3dvcmRfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHN3b3JkX29wdGdyb3VwLmxhYmVsID0gXCLQnNC10YfQuFwiXHJcblxyXG4gIHZhciBtdXRhbnRfb3B0Z3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0Z3JvdXBcIik7XHJcbiAgbXV0YW50X29wdGdyb3VwLmlkID0gXCJtdXRhbnRfb3B0Z3JvdXBcIlxyXG4gIG11dGFudF9vcHRncm91cC5jbGFzc05hbWUgPSBcImNoYXJhY3Rlcl9vcHRncm91cFwiXHJcbiAgbXV0YW50X29wdGdyb3VwLmxhYmVsID0gXCLQnNGD0YLQsNC90YLRi1wiXHJcblxyXG4gIHZhciBhbmltYV9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBhbmltYV9vcHRncm91cC5pZCA9IFwiYW5pbWFfb3B0Z3JvdXBcIlxyXG4gIGFuaW1hX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBhbmltYV9vcHRncm91cC5sYWJlbCA9IFwi0JfQstC10YDQuFwiXHJcblxyXG4gIHZhciBvdGhlcl9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBvdGhlcl9vcHRncm91cC5pZCA9IFwib3RoZXJfb3B0Z3JvdXBcIlxyXG4gIG90aGVyX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBvdGhlcl9vcHRncm91cC5sYWJlbCA9IFwi0J7RgdGC0LDQu9GM0L3Ri9C1XCJcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IGNoYXJhY3Rlcl9saXN0W2ldO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpO1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9ncm91cCA9IGdyb3VwX2xpc3RbaV1cclxuICAgIHN3aXRjaChjaGFyYWN0ZXJfZ3JvdXApIHtcclxuICAgICAgY2FzZSBcInBsYXllclwiOlxyXG4gICAgICAgIHBsYXllcnNfb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwicGVuZ3VpblwiOlxyXG4gICAgICAgIHBlbmd1aW5fb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwic2hpZWxkXCI6XHJcbiAgICAgICAgc2hpZWxkX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInN3b3JkXCI6XHJcbiAgICAgICAgc3dvcmRfb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibXV0YW50XCI6XHJcbiAgICAgICAgbXV0YW50X29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImFuaW1hXCI6XHJcbiAgICAgICAgYW5pbWFfb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIG90aGVyX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG4gIGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG4gIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcbiAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyX2Nob3NlblwiKS52YWx1ZSk7XHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX2NoYXJhY3Rlcic7XHJcbiAgICB0b1NlbmQuY2VsbF9pZCA9IGJ1dHRvbi5ib2FyZF9pbmRleDtcclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlciArIDE7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBjaGFyYWN0ZXJfbGlzdFtjaGFyYWN0ZXJfbnVtYmVyXTtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgICBjbGVhcl9jb250YWluZXJzKDApXHJcbiAgfVxyXG5cclxuICBzZWxlY3QuYXBwZW5kKHBsYXllcnNfb3B0Z3JvdXApO1xyXG4gIHNlbGVjdC5hcHBlbmQoc2hpZWxkX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKHN3b3JkX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKG11dGFudF9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChhbmltYV9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChwZW5ndWluX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKG90aGVyX29wdGdyb3VwKTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHNlbGVjdCk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b24pO1xyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbi8vIFBpY3R1cmUvYXZhdGFyIG1hbmFnZW1lbnRcclxuXHJcbmZ1bmN0aW9uIGZvZ09yUGljKGNlbGxfaWQpIHtcclxuICB2YXIgcGljdHVyZV9uYW1lID0gRk9HX0lNQUdFO1xyXG4gIGlmICgoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbY2VsbF9pZF0gIT0gMSl8fChteV9yb2xlID09ICdnbScpKSB7XHJcbiAgICB2YXIgY2hhcl9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2VsbF9pZF1cclxuICAgIHBpY3R1cmVfbmFtZSA9IGdldF9vYmplY3RfcGljdHVyZShjaGFyX2lkKTtcclxuICAgIGlmIChjaGFyX2lkID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJfaWRdICE9IFwiYWxsXCIgJiYgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyX2lkXSAhPSBteV9uYW1lKSB7XHJcbiAgICAgIHBpY3R1cmVfbmFtZSA9IGdldF9vYmplY3RfcGljdHVyZSgwKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG4gIHJldHVybiBwaWN0dXJlX25hbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlGb2coKSB7XHJcblx0Y2xlYXJfY29udGFpbmVycygpXHJcblxyXG5cdHZhciBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgaW5mby5pbm5lckhUTUwgPSAn0JzRiyDQvdC1INC30L3QsNC10LwsINGH0YLQviDRjdGC0L4g0YLQsNC60L7QtS4g0JXRgdC70Lgg0LHRiyDQvNGLINC30L3QsNC70Lgg0YfRgtC+INGN0YLQviDRgtCw0LrQvtC1LCDQvdC+INC80Ysg0L3QtSDQt9C90LDQtdC8Lic7XHJcblxyXG5cdHZhciBmb2dfcGljdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgZm9nX3BpY3R1cmUuc3JjID0gUVVFU1RJT05fSU1BR0U7XHJcbiAgZm9nX3BpY3R1cmUuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGZvZ19waWN0dXJlLnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG5cdGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoaW5mbyk7XHJcblx0Y2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChmb2dfcGljdHVyZSk7XHJcblxyXG50aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldF9vYmplY3RfcGljdHVyZShpbmRleF9pbl9ib2FyZF9zdGF0ZSkge1xyXG4gIHZhciBpbWFnZSA9IEVNUFRZX0NFTExfUElDO1xyXG4gIHZhciBpbmRleF9pbl9iYXNlO1xyXG4gIGlmIChpbmRleF9pbl9ib2FyZF9zdGF0ZSA+IDApIHtcclxuICAgIGluZGV4X2luX2Jhc2UgPSBpbmRleF9pbl9ib2FyZF9zdGF0ZTtcclxuICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpbmRleF9pbl9iYXNlXTtcclxuICAgIGlmIChjaGFyYWN0ZXIuaGFzT3duUHJvcGVydHkoXCJjaGliaV9hdmF0YXJcIikpIHtcclxuICAgICAgaW1hZ2UgPSBjaGFyYWN0ZXIuY2hpYmlfYXZhdGFyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW1hZ2UgPSBjaGFyYWN0ZXIuYXZhdGFyO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoaW5kZXhfaW5fYm9hcmRfc3RhdGUgPCAwKSB7XHJcbiAgICBpbmRleF9pbl9iYXNlID0gaW5kZXhfaW5fYm9hcmRfc3RhdGUgKiAoLTEpO1xyXG4gICAgdmFyIG9ic3RhY2xlID0gb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tpbmRleF9pbl9iYXNlXTtcclxuICAgIGltYWdlID0gb2JzdGFjbGUuYXZhdGFyO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGltYWdlO1xyXG59XHJcblxyXG4vLyBNb3ZlIC0gRGVsZXRlIC0gU2VsZWN0XHJcblxyXG5mdW5jdGlvbiBtb3ZlX2NoYXJhY3Rlcih0b19pbmRleCwgdG9fY2VsbCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDA7IC8vIGVuZCB0aGUgbW90aW9uXHJcbiAgdmFyIGNob3Nlbl9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciBjaG9zZW5fY2hhcmFjdGVyX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcblxyXG4gIHZhciBkaXN0YW5jZSA9IGZpbmREaXN0YW5jZSh0b19pbmRleCwgY2hvc2VuX2luZGV4KVxyXG4gIHZhciBtYXhfZGlzdGFuY2UgPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF1cclxuXHJcbiAgaWYgKGRpc3RhbmNlIDw9IG1heF9kaXN0YW5jZSkge1xyXG4gICAgaWYgKCEoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEgJiYgZGlzdGFuY2UgPiAxLjYpKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnbW92ZV9jaGFyYWN0ZXInO1xyXG4gICAgICB0b1NlbmQuZnJvbV9pbmRleCA9IGNob3Nlbl9pbmRleDtcclxuICAgICAgdG9TZW5kLnRvX2luZGV4ID0gdG9faW5kZXg7XHJcbiAgICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleDtcclxuICAgICAgdG9TZW5kLmNoYXJhY3Rlcl9hdmF0YXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5hdmF0YXI7XHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC5kaXN0YW5jZSA9IGRpc3RhbmNlXHJcbiAgICAgIHRvU2VuZC5sZWZ0X3NoaWVsZCA9IDBcclxuICAgICAgdG9TZW5kLm1pbmVzX2V4cGxvZGVkID0gW11cclxuICAgICAgdG9TZW5kLm1pbmVzX2RhbWFnZSA9IDBcclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmhhc093blByb3BlcnR5KFwiZm9yY2VfZmllbGRfdGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgdmFyIHNoaWVsZF9pbmRleCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uZm9yY2VfZmllbGRfdGFyZ2V0LnNoaWVsZF9pbmRleFxyXG4gICAgICAgIGlmKCFnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLmNlbGxzX3Byb3RlY3RlZC5pbmNsdWRlcyh0b19pbmRleCkpIHsvLyDQv9C+0LrQuNC90YPQuyDQt9C+0L3RgyDQt9Cw0YnQuNGC0YtcclxuICAgICAgICAgIHRvU2VuZC5sZWZ0X3NoaWVsZCA9IDFcclxuICAgICAgICAgIHRvU2VuZC5zaGllbGRfaW5kZXggPSBzaGllbGRfaW5kZXhcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQgPSBbXTtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0gIT0gXCJhbGxcIikgey8vdXNlciBpcyBpbnZpc2libGVcclxuICAgICAgICB2YXIgaW1tZWRpYXRlX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgMSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbW1lZGlhdGVfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dID4gMCAmJiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dICE9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgpIHsvLyB0aGVyZSBhcmUgY2hhcmFjdGVycyB0aGVyZVxyXG4gICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChjaG9zZW5fY2hhcmFjdGVyX2luZGV4KTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgdmFyIGV4dGVuZGVkX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgaW52aXNpYmlsaXR5X2RldGVjdGlvbl9yYWRpdXMpO1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleHRlbmRlZF9uYmgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dID4gMCAmJiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCkgey8vIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIHRoZXJlXHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudF9jaGFyX251bSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXTtcclxuICAgICAgICAgICAgICAgIHZhciByb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2N1cnJlbnRfY2hhcl9udW1dLmludGVsbGlnZW5jZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocm9sbCA+IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChjaG9zZW5fY2hhcmFjdGVyX2luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyh0b19pbmRleCkpIHtcclxuICAgICAgICB0b1NlbmQubWluZXNfZXhwbG9kZWQucHVzaCh0b19pbmRleClcclxuICAgICAgICB0b1NlbmQubWluZXNfZGFtYWdlID0gdG9TZW5kLm1pbmVzX2RhbWFnZSArIHJvbGxfeChtaW5lc18wX2Rpc3RhbmNlX2RhbWFnZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBpbW1lZGlhdGVfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCAxKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbW1lZGlhdGVfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSAhPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4KSB7Ly8gdGhlcmUgYXJlIGNoYXJhY3RlcnMgdGhlcmVcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXV0gIT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5wdXNoKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhpbW1lZGlhdGVfbmJoW2ldKSAmJiBpbW1lZGlhdGVfbmJoW2ldICE9IHRvX2luZGV4KSB7XHJcbiAgICAgICAgICAgIHRvU2VuZC5taW5lc19leHBsb2RlZC5wdXNoKGltbWVkaWF0ZV9uYmhbaV0pXHJcbiAgICAgICAgICAgIHRvU2VuZC5taW5lc19kYW1hZ2UgPSB0b1NlbmQubWluZXNfZGFtYWdlICsgcm9sbF94KG1pbmVzXzFfZGlzdGFuY2VfZGFtYWdlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIG9uZV9hbmRfaGFsZl9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIDEuNik7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb25lX2FuZF9oYWxmX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhvbmVfYW5kX2hhbGZfbmJoW2ldKSAmJiAoIWltbWVkaWF0ZV9uYmguaW5jbHVkZXMob25lX2FuZF9oYWxmX25iaFtpXSkpKSB7XHJcbiAgICAgICAgICAgIHRvU2VuZC5taW5lc19leHBsb2RlZC5wdXNoKG9uZV9hbmRfaGFsZl9uYmhbaV0pXHJcbiAgICAgICAgICAgIHRvU2VuZC5taW5lc19kYW1hZ2UgPSB0b1NlbmQubWluZXNfZGFtYWdlICsgcm9sbF94KG1pbmVzXzFwNV9kaXN0YW5jZV9kYW1hZ2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZXh0ZW5kZWRfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCBpbnZpc2liaWxpdHlfZGV0ZWN0aW9uX3JhZGl1cyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXh0ZW5kZWRfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dID4gMCAmJiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCAmJiAoIWltbWVkaWF0ZV9uYmguaW5jbHVkZXMoZXh0ZW5kZWRfbmJoW2ldKSkpIHsvLyB0aGVyZSBhcmUgY2hhcmFjdGVycyB0aGVyZVxyXG4gICAgICAgICAgICB2YXIgY3VycmVudF9jaGFyX251bSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXTtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY3VycmVudF9jaGFyX251bV0gIT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgICAgIHZhciByb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmludGVsbGlnZW5jZSk7XHJcbiAgICAgICAgICAgICAgaWYgKHJvbGwgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5wdXNoKGN1cnJlbnRfY2hhcl9udW0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjbGVhcl9jb250YWluZXJzKCk7XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgICAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gdG9faW5kZXhcclxuICAgICAgdmFyIHRvX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgdG9faW5kZXgpO1xyXG4gICAgICBjaGFyYWN0ZXJfY2hvc2VuLmNlbGwgPSB0b19jZWxsXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCSINCx0L7RjiDQvdGD0LbQvdC+INC00LLQuNCz0LDRgtGM0YHRjyDQv9C+0YHRgtGD0L/QsNGC0LXQu9GM0L3QviAoMS0yINC60LvQtdGC0LrQuClcIilcclxuICAgICAgdW5kb19zZWxlY3Rpb24oKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCf0L7Qu9C10LPRh9C1LCDQvNGB0YzQtSDQkdC+0LvRglwiKVxyXG4gICAgdW5kb19zZWxlY3Rpb24oKVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZV9jaGFyYWN0ZXIoaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnZGVsZXRlX2NoYXJhY3Rlcic7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX3dlYXBvbihjaGFyYWN0ZXJfbnVtYmVyLCB3ZWFwb25faW5kZXgpIHtcclxuICBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bY2hhcmFjdGVyX251bWJlcl0gPSB3ZWFwb25faW5kZXhcclxuICBjaGFyYWN0ZXJfY2hvc2VuLndlYXBvbl9pZCA9IHdlYXBvbl9pbmRleFxyXG5cclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bd2VhcG9uX2luZGV4XVxyXG5cclxuICB2YXIgd2VhcG9uX21pbmlfZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhcG9uX21pbmlfZGlzcGxheVwiKTtcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LnNyYyA9IHdlYXBvbi5hdmF0YXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlfd2VhcG9uX2RldGFpbGVkKHdlYXBvbl9pbmRleCwgY29udGFpbmVyLCBzaG93SW1hZ2UpIHtcclxuICB2YXIgZGVmYXVsdF93ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1t3ZWFwb25faW5kZXhdXHJcblxyXG4gIHZhciB3ZWFwb25fcmFuZ2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB3ZWFwb25fcmFuZ2VfZGlzcGxheS5pZCA9IFwid2VhcG9uX3JhbmdlX2Rpc3BsYXlcIjtcclxuICB3ZWFwb25fcmFuZ2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCU0LDQu9GM0L3QvtGB0YLRjDogXCIgKyBkZWZhdWx0X3dlYXBvbi5yYW5nZVxyXG5cclxuICB2YXIgd2VhcG9uX2RhbWFnZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHdlYXBvbl9kYW1hZ2VfZGlzcGxheS5pZCA9IFwid2VhcG9uX2RhbWFnZV9kaXNwbGF5XCI7XHJcbiAgd2VhcG9uX2RhbWFnZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KPRgNC+0L06IFwiICsgZGVmYXVsdF93ZWFwb24uZGFtYWdlWzBdICsgJ2QnICsgZGVmYXVsdF93ZWFwb24uZGFtYWdlWzFdXHJcblxyXG4gIHZhciB3ZWFwb25fbmFtZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHdlYXBvbl9uYW1lX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9uYW1lX2Rpc3BsYXlcIjtcclxuICB3ZWFwb25fbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IGRlZmF1bHRfd2VhcG9uLm5hbWVcclxuXHJcbiAgaWYgKHNob3dJbWFnZSkge1xyXG4gICAgdmFyIHdlYXBvbl9hdmF0YXJfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9hdmF0YXJfZGlzcGxheVwiXHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3JjID0gZGVmYXVsdF93ZWFwb24uYXZhdGFyO1xyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG4gIH1cclxuICBjb250YWluZXIuYXBwZW5kKHdlYXBvbl9uYW1lX2Rpc3BsYXkpXHJcbiAgaWYgKHNob3dJbWFnZSkge1xyXG4gICAgY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fYXZhdGFyX2Rpc3BsYXkpXHJcbiAgfVxyXG4gIGNvbnRhaW5lci5hcHBlbmQod2VhcG9uX3JhbmdlX2Rpc3BsYXkpXHJcbiAgY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fZGFtYWdlX2Rpc3BsYXkpXHJcbiAgY29udGFpbmVyLnNob3coKVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RfY2hhcmFjdGVyKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG5cclxuXHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gXCJhbGxcIiB8fCBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IG15X25hbWUpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24gPSBpbmRleFxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2VsbCA9IGNlbGxcclxuXHJcbiAgbGV0IG5hbWUgPSBjaGFyYWN0ZXIubmFtZTtcclxuICBsZXQgYXZhdGFyID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuXHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBuYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IG5hbWU7XHJcblxyXG4gIHZhciBhdmF0YXJfY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICB2YXIgYXZhdGFyX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnNyYyA9IGF2YXRhcjtcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuXHJcbiAgYXZhdGFyX2NvbnRhaW5lci5hcHBlbmRDaGlsZChhdmF0YXJfZGlzcGxheSlcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChuYW1lX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYXZhdGFyX2NvbnRhaW5lcik7XHJcblxyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIiB8fCBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcblxyXG4gICAgYXZhdGFyX2Rpc3BsYXkub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBzaG93X21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIGF2YXRhcl9kaXNwbGF5Lm9ubW91c2VlbnRlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICB2YXIgbWFpbl9hY3Rpb24gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIGJvbnVzX2FjdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIG1vdmVfYWN0aW9uID0gTWF0aC5mbG9vcihjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0pXHJcblxyXG4gICAgICB2YXIgbWFpbl9hY3Rpb25fZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgbWFpbl9hY3Rpb25fZGlzcGxheS5pZCA9IFwibWFpbl9hY3Rpb25fZGlzcGxheVwiO1xyXG4gICAgICBtYWluX2FjdGlvbl9kaXNwbGF5LmlubmVySFRNTCA9IFwi0J7RgdC90L7QstC90YvRhTogXCIgKyBtYWluX2FjdGlvblxyXG5cclxuICAgICAgdmFyIGJvbnVzX2FjdGlvbl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICBib251c19hY3Rpb25fZGlzcGxheS5pZCA9IFwiYm9udXNfYWN0aW9uX2Rpc3BsYXlcIjtcclxuICAgICAgYm9udXNfYWN0aW9uX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQkdC+0L3Rg9GB0L3Ri9GFOiBcIiArIGJvbnVzX2FjdGlvblxyXG5cclxuICAgICAgdmFyIG1vdmVfYWN0aW9uX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgIG1vdmVfYWN0aW9uX2Rpc3BsYXkuaWQgPSBcIm1vdmVfYWN0aW9uX2Rpc3BsYXlcIjtcclxuICAgICAgbW92ZV9hY3Rpb25fZGlzcGxheS5pbm5lckhUTUwgPSBcItCf0LXRgNC10LTQstC40LbQtdC90LjQtTogXCIgKyBtb3ZlX2FjdGlvblxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gIT0gXCJhbGxcIikgey8vINCyINC40L3QstC40LfQtVxyXG4gICAgICAgIHZhciBpbnZpc2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICAgICAgaW52aXNlX2Rpc3BsYXkuc3JjID0gSU5WSVNFX0lNQUdFO1xyXG4gICAgICAgIGludmlzZV9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuICAgICAgICBpbnZpc2VfZGlzcGxheS5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhaW1cIikpIHsvLyAg0J/RgNC40YbQtdC70LXQvVxyXG4gICAgICAgIHZhciBhaW1fZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICAgICAgYWltX2Rpc3BsYXkuc3JjID0gQUlNX0lNQUdFO1xyXG4gICAgICAgIGFpbV9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuICAgICAgICBhaW1fZGlzcGxheS5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQobWFpbl9hY3Rpb25fZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChib251c19hY3Rpb25fZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChtb3ZlX2FjdGlvbl9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKGludmlzZV9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKGFpbV9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuc2hvdygpXHJcbiAgICB9XHJcblxyXG4gICAgYXZhdGFyX2Rpc3BsYXkub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmhpZGUoKVxyXG4gICAgfVxyXG5cclxuICB2YXIgc3RyZW5ndGhfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBzdHJlbmd0aF9kaXNwbGF5LmlubmVySFRNTCA9IFwiQ9C40LvQsDogXCIgKyBjaGFyYWN0ZXIuc3RyZW5ndGg7XHJcblxyXG4gIHZhciBzdGFtaW5hX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgc3RhbWluYV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KLQtdC70L7RgdC70L7QttC10L3QuNC1OiBcIiArIGNoYXJhY3Rlci5zdGFtaW5hO1xyXG5cclxuICB2YXIgYWdpbGl0eV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGFnaWxpdHlfZGlzcGxheS5pbm5lckhUTUwgPSBcItCb0L7QstC60L7RgdGC0Yw6IFwiICsgY2hhcmFjdGVyLmFnaWxpdHk7XHJcblxyXG4gIHZhciBpbnRlbGxpZ2VuY2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBpbnRlbGxpZ2VuY2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCY0L3RgtC10LvQu9C10LrRgjogXCIgKyBjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlO1xyXG5cclxuICB2YXIgS0RfdmFsdWUgPSBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtjaGFyYWN0ZXJfbnVtYmVyXSlcclxuICB2YXIgS0RfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBLRF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JrQlDogXCIgKyBLRF92YWx1ZTtcclxuXHJcbiAgdmFyIGhwX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSkvcGFyc2VGbG9hdChIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKVxyXG4gIGhwX3BlcmNlbnQgPSBNYXRoLmZsb29yKGhwX3BlcmNlbnQqMTAwKVxyXG5cclxuICB2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBIUF9kaXNwbGF5LmlkID0gXCJIUF9kaXNwbGF5XCI7XHJcbiAgSFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdICsgXCIgKFwiICsgaHBfcGVyY2VudCArIFwiJSlcIjtcclxuXHJcbiAgdmFyIHRpcmVkX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSlcclxuICB0aXJlZF9wZXJjZW50ID0gTWF0aC5mbG9vcih0aXJlZF9wZXJjZW50KjEwMClcclxuXHJcbiAgdmFyIHRpcmVkX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgdGlyZWRfZGlzcGxheS5pZCA9IFwidGlyZWRfZGlzcGxheVwiO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQktGL0L3QvtGB0LvQuNCy0L7RgdGC0Yw6IFwiICsgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0gKyBcIiAoXCIgKyB0aXJlZF9wZXJjZW50ICsgXCIlKVwiO1xyXG5cclxuICB2YXIgaW5pdGlhdGl2ZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGluaXRpYXRpdmVfZGlzcGxheS5pbm5lckhUTUwgPSBcItCY0L3QuNGG0LjQsNGC0LjQstCwOiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHN0cmVuZ3RoX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoc3RhbWluYV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGFnaWxpdHlfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChpbnRlbGxpZ2VuY2VfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChLRF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKEhQX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQodGlyZWRfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChpbml0aWF0aXZlX2Rpc3BsYXkpO1xyXG5cclxuICB2YXIgbW92ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIG1vdmVfYnV0dG9uLmlubmVySFRNTCA9IFwi0J/QtdGA0LXQvNC10YnQtdC90LjQtVwiO1xyXG4gIG1vdmVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgbW92ZV9idXR0b24uY2VsbCA9IGNlbGw7XHJcbiAgbW92ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgY2hhcmFjdGVyX3BpY2tlZCA9IGV2ZW50LnRhcmdldFxyXG4gICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NoYXJhY3Rlcl9waWNrZWQuaW5kZXhdO1xyXG4gICAgdmFyIG1vdmVfYWN0aW9uc19sZWZ0ID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBpZiAobW92ZV9hY3Rpb25zX2xlZnQgPiAwKSB7XHJcbiAgICAgIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoY2hhcmFjdGVyX3BpY2tlZC5pbmRleCwgY2hhcmFjdGVyX3BpY2tlZC5jZWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0JLRiyDQv9C+0YLRgNCw0YLQuNC70Lgg0LLRgdC1INC/0LXRgNC10LzQtdGJ0LXQvdC40Y8g0L3QsCDRjdGC0L7QvCDRhdC+0LTRgyFcIilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG5cclxuICAgIHZhciBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRlbGV0ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQo9C90LjRh9GC0L7QttC40YLRjFwiO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gICAgZGVsZXRlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICAgIGRlbGV0ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGRlbGV0ZV9jaGFyYWN0ZXIoaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24uaW5uZXJIVE1MID0gXCLQmNC30LzQtdC90LjRgtGMINCy0LjQtNC40LzQvtGB0YLRjFwiO1xyXG4gICAgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5KGNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkYW1hZ2VfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRhbWFnZV9idXR0b24uaW5uZXJIVE1MID0gXCLQndCw0L3QtdGB0YLQuCDRg9GA0L7QvVwiO1xyXG4gICAgZGFtYWdlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gICAgZGFtYWdlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgdmFyIGRhbWFnZV9maWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFtYWdlX2ZpZWxkXCIpO1xyXG4gICAgICBpZiAoIShkYW1hZ2VfZmllbGQudmFsdWUgPT09IFwiXCIpKSB7XHJcbiAgICAgICAgdmFyIGRhbWFnZSA9IHBhcnNlSW50KGRhbWFnZV9maWVsZC52YWx1ZSk7XHJcbiAgICAgICAgdmFyIEhQX2Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkhQX2Rpc3BsYXlcIik7XHJcbiAgICAgICAgdmFyIG5ld19IUCA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSAtIGRhbWFnZTtcclxuICAgICAgICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBuZXdfSFA7XHJcblxyXG4gICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdkZWFsX2RhbWFnZSc7XHJcbiAgICAgICAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICAgIHRvU2VuZC5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgZGFtYWdlX2ZpZWxkLmlkID0gXCJkYW1hZ2VfZmllbGRcIjtcclxuICAgIGRhbWFnZV9maWVsZC50eXBlID0gXCJudW1iZXJcIjtcclxuICAgIGRhbWFnZV9maWVsZC5wbGFjZWhvbGRlciA9IFwi0JfQvdCw0YfQtdC90LjQtSDRg9GA0L7QvdCwXCI7XHJcblxyXG4gIH1cclxuXHJcbiAgdmFyIHNlYXJjaF9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHNlYXJjaF9idXR0b24uaW5uZXJIVE1MID0gXCLQntCx0YvRgdC60LDRgtGMXCI7XHJcbiAgc2VhcmNoX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIHNlYXJjaF9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBzZWFyY2hfYWN0aW9uKGV2ZW50LnRhcmdldCk7XHJcbiAgfVxyXG5cclxuICB2YXIgc2ltcGxlX3JvbGxfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBzaW1wbGVfcm9sbF9idXR0b24uaW5uZXJIVE1MID0gXCLQn9GA0L7RgdGC0L4gZDIwXCI7XHJcbiAgc2ltcGxlX3JvbGxfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIHJvbGwgPSByb2xsX3goMjApXHJcbiAgICB2YXIgdG9TZW5kID0ge31cclxuICAgIHRvU2VuZC5jb21tYW5kID0gXCJzaW1wbGVfcm9sbFwiXHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBjaGFyYWN0ZXIubmFtZVxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbVxyXG4gICAgdG9TZW5kLnJvbGwgPSByb2xsXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9XHJcblxyXG4gIC8vdmFyIHdlYXBvbl9zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIC8vd2VhcG9uX3NlbGVjdC5pZCA9IFwid2VhcG9uX2Nob3NlblwiO1xyXG5cclxuICB2YXIgaW52ZW50b3J5ID0gY2hhcmFjdGVyLmludmVudG9yeVxyXG5cclxuICAvKlxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW52ZW50b3J5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gd2VhcG9uX2xpc3RbaW52ZW50b3J5W2ldXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaW52ZW50b3J5W2ldO1xyXG4gICAgd2VhcG9uX3NlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgfVxyXG4gICovXHJcblxyXG4gIC8qXHJcbiAgdmFyIHBpY2tfd2VhcG9uX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgcGlja193ZWFwb25fYnV0dG9uLmlubmVySFRNTCA9IFwi0KHQvNC10L3QuNGC0Ywg0L7RgNGD0LbQuNC1XCI7XHJcbiAgcGlja193ZWFwb25fYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgcGlja193ZWFwb25fYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIHdlYXBvbl9zZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXBvbl9jaG9zZW5cIilcclxuICAgIHZhciB3ZWFwb25faW5kZXggPSB3ZWFwb25fc2VsZWN0LnZhbHVlXHJcblxyXG4gICAgY2hhbmdlX3dlYXBvbihjaGFyYWN0ZXJfbnVtYmVyLCB3ZWFwb25faW5kZXgpXHJcbiAgfVxyXG4gICovXHJcblxyXG4gIHZhciBkZWZhdWx0X3dlYXBvbl9pbmRleCA9IGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4ud2VhcG9uX2lkID0gZGVmYXVsdF93ZWFwb25faW5kZXhcclxuICB2YXIgZGVmYXVsdF93ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tkZWZhdWx0X3dlYXBvbl9pbmRleF1cclxuXHJcbiAgdmFyIHdlYXBvbl9taW5pX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9taW5pX2Rpc3BsYXlcIlxyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3JjID0gZGVmYXVsdF93ZWFwb24uYXZhdGFyO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnODBweCc7XHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnODBweCc7XHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5vbm1vdXNlZW50ZXIgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIHdlYXBvbl9pbmRleCA9IGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgZGlzcGxheV93ZWFwb25fZGV0YWlsZWQod2VhcG9uX2luZGV4LCB3ZWFwb25faW5mb19jb250YWluZXIsIHRydWUpXHJcbiAgfVxyXG5cclxuICB3ZWFwb25fbWluaV9kaXNwbGF5Lm9ubW91c2VsZWF2ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmhpZGUoKVxyXG4gIH1cclxuXHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBzaG93X3dlYXBvbl9tb2RhbChjaGFyYWN0ZXJfbnVtYmVyLCAwKTtcclxuICB9XHJcblxyXG4gIGF2YXRhcl9jb250YWluZXIuYXBwZW5kKHdlYXBvbl9taW5pX2Rpc3BsYXkpXHJcblxyXG4gIHZhciBhdHRhY2tfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBhdHRhY2tfYnV0dG9uLmlubmVySFRNTCA9IFwi0JDRgtCw0LrQvtCy0LDRgtGMXCI7XHJcbiAgYXR0YWNrX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBtYWluX2FjdGlvbnNfbGVmdCA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgaWYgKG1haW5fYWN0aW9uc19sZWZ0ID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX2F0dGFjayhjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQoyDQstCw0YEg0L3QtSDQvtGB0YLQsNC70L7RgdGMINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gIHZhciBza2lsbF9zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNraWxsX3NlbGVjdC5pZCA9IFwic2tpbGxfY2hvc2VuXCI7XHJcbiAgKi9cclxuXHJcbiAgdmFyIHNraWxsc2V0ID0gY2hhcmFjdGVyLnNraWxsc2V0XHJcblxyXG4gIC8qXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2lsbHNldC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IHNraWxsX2xpc3Rbc2tpbGxzZXRbaV1dO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBza2lsbHNldFtpXTtcclxuICAgIHNraWxsX3NlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgfVxyXG5cclxuICB2YXIgc2tpbGxfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBza2lsbF9idXR0b24uaW5uZXJIVE1MID0gXCLQmNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0YPQvNC10L3QuNC1XCI7XHJcbiAgc2tpbGxfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIHNraWxsX3NlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGxfY2hvc2VuXCIpXHJcbiAgICB2YXIgc2tpbGxfaW5kZXggPSBza2lsbF9zZWxlY3QudmFsdWVcclxuICAgIHVzZV9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgaW5kZXgsIGNlbGwpXHJcbiAgfVxyXG4gICovXHJcblxyXG5cclxuICB2YXIgYnV0dG9uX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgYnV0dG9uX2xpc3QuY2xhc3NOYW1lID0gXCJidXR0b25fbGlzdFwiO1xyXG4gIHZhciBsaW5lMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmUzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG5cclxuICBsaW5lMS5hcHBlbmRDaGlsZChtb3ZlX2J1dHRvbik7XHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICBsaW5lMi5hcHBlbmRDaGlsZChkZWxldGVfYnV0dG9uKTtcclxuICAgIGxpbmUzLmFwcGVuZENoaWxkKGRhbWFnZV9idXR0b24pO1xyXG4gICAgbGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2ZpZWxkKTtcclxuICAgIGxpbmU4LmFwcGVuZENoaWxkKGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24pO1xyXG4gIH1cclxuICBsaW5lNC5hcHBlbmRDaGlsZChzZWFyY2hfYnV0dG9uKTtcclxuICAvL2xpbmU1LmFwcGVuZENoaWxkKHBpY2tfd2VhcG9uX2J1dHRvbik7XHJcbiAgLy9saW5lNS5hcHBlbmRDaGlsZCh3ZWFwb25fc2VsZWN0KTtcclxuICBsaW5lNi5hcHBlbmRDaGlsZChhdHRhY2tfYnV0dG9uKTtcclxuICBsaW5lNy5hcHBlbmRDaGlsZChzaW1wbGVfcm9sbF9idXR0b24pO1xyXG4gIC8vbGluZTkuYXBwZW5kQ2hpbGQoc2tpbGxfYnV0dG9uKTtcclxuICAvL2xpbmU5LmFwcGVuZENoaWxkKHNraWxsX3NlbGVjdCk7XHJcblxyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUxKTtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUyKTtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUzKTtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU4KTtcclxuICB9XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTQpO1xyXG4gIC8vYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTUpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU2KTtcclxuICAvL2J1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU5KTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNyk7XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uX2xpc3QpO1xyXG5cclxufSBlbHNlIHtcclxuICB2YXIgaHBfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgaHBfcGVyY2VudCA9IE1hdGguZmxvb3IoaHBfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIEhQX2Rpc3BsYXkuaWQgPSBcIkhQX2Rpc3BsYXlcIjtcclxuICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBocF9wZXJjZW50ICsgXCIlXCI7XHJcblxyXG4gIHZhciB0aXJlZF9wZXJjZW50ID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSkvcGFyc2VGbG9hdChzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgdGlyZWRfcGVyY2VudCA9IE1hdGguZmxvb3IodGlyZWRfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciB0aXJlZF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaWQgPSBcInRpcmVkX2Rpc3BsYXlcIjtcclxuICB0aXJlZF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JLRi9C90L7RgdC70LjQstC+0YHRgtGMOiBcIiArIHRpcmVkX3BlcmNlbnQgKyBcIiVcIjtcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChIUF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHRpcmVkX2Rpc3BsYXkpO1xyXG59XHJcblxyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZV9vYmplY3RfY29tbWFuZChpbmRleCkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdkZWxldGVfY2hhcmFjdGVyJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfb2JqZWN0KGV2ZW50KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIGRlbGV0ZV9vYmplY3RfY29tbWFuZChldmVudC50YXJnZXQuaW5kZXgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gIHZhciBvYnN0YWNsZV9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdICogKC0xKTtcclxuICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW29ic3RhY2xlX2lkXTtcclxuXHJcbiAgLy8ga2VlcCB0cmFjayBvZiBsYXN0IGNob3NlbiBvYnN0YWxlIHRvIHF1aWNrbHkgYWRkIHRvIHRoZSBtYXBcclxuICBsYXN0X29ic3RhY2xlID0gb2JzdGFjbGVfaWRcclxuXHJcbiAgbGV0IG5hbWUgPSBvYnN0YWNsZS5uYW1lO1xyXG4gIGxldCBhdmF0YXIgPSBvYnN0YWNsZS5hdmF0YXI7XHJcblxyXG4gIHZhciBuYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IG5hbWU7XHJcblxyXG4gIHZhciBhdmF0YXJfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3JjID0gYXZhdGFyO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKG5hbWVfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChhdmF0YXJfZGlzcGxheSk7XHJcblxyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgdmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCj0L3QuNGH0YLQvtC20LjRgtGMXCI7XHJcbiAgICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgICBkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZGVsZXRlX29iamVjdChldmVudCk7XHJcbiAgICB9XHJcbiAgICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGRlbGV0ZV9idXR0b24pO1xyXG4gIH1cclxuXHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gY2hvb3NlX2NoYXJhY3Rlcl90b19tb3ZlKGluZGV4LCBjZWxsKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMVxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IGluZGV4O1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdO1xyXG4gIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9sb2FkaW5nLndlYnBcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5kb19zZWxlY3Rpb24oKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyAhPSAwKSB7XHJcbiAgICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwXHJcbiAgICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24pO1xyXG4gICAgb2xkX2NlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93X3dlYXBvbl9tb2RhbChjaGFyYWN0ZXJfbnVtYmVyLCBzdGFydGluZ19pbmRleCkge1xyXG4gIGhpZGVfbW9kYWwoKVxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBpbnZlbnRvcnkgPSBjaGFyYWN0ZXIuaW52ZW50b3J5XHJcblxyXG4gIHZhciB3ZWFwb25fdGFibGUgPSAkKFwiPHRhYmxlPlwiKTtcclxuICB2YXIgdGFibGVfc2l6ZSA9IDNcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZV9zaXplOyBpKyspIHtcclxuICAgIHZhciByb3cgPSAkKFwiPHRyPlwiKTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGFibGVfc2l6ZTsgaisrKSB7XHJcbiAgICAgIHZhciBpbmRleCA9IHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSppICsgalxyXG4gICAgICBpZiAoaW5kZXggPCBpbnZlbnRvcnkubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIHdlYXBvbl9udW1iZXIgPSBpbnZlbnRvcnlbaW5kZXhdXHJcbiAgICAgICAgdmFyIGNvbHVtbiA9ICQoXCI8dGg+XCIpO1xyXG4gICAgICAgIHZhciB3ZWFwb25faWNvbiA9ICQoXCI8SU1HPlwiKTtcclxuICAgICAgICB2YXIgYXZhdGFyID0gUVVFU1RJT05fSU1BR0VcclxuICAgICAgICBpZiAod2VhcG9uX2RldGFpbGVkX2luZm9bd2VhcG9uX251bWJlcl0uaGFzT3duUHJvcGVydHkoJ2F2YXRhcicpKSB7XHJcbiAgICAgICAgICBhdmF0YXIgPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1t3ZWFwb25fbnVtYmVyXS5hdmF0YXJcclxuICAgICAgICB9XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYWRkQ2xhc3MoJ3dlYXBvbl9pY29uJyk7XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYXR0cignd2lkdGgnLCAnMTAwcHgnKTtcclxuICAgICAgICB3ZWFwb25faWNvbi5hdHRyKCd3ZWFwb25fbnVtYmVyJywgd2VhcG9uX251bWJlcik7XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYXR0cignaGVpZ2h0JywgJzEwMHB4Jyk7XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYXR0cignc3JjJywgYXZhdGFyKTtcclxuICAgICAgICB3ZWFwb25faWNvbi5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgdmFyIHdlYXBvbl9udW0gPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCd3ZWFwb25fbnVtYmVyJyk7XHJcbiAgICAgICAgICBjaGFuZ2Vfd2VhcG9uKGNoYXJhY3Rlcl9udW1iZXIsIHdlYXBvbl9udW0pO1xyXG4gICAgICAgICAgaGlkZV9tb2RhbCgpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2VhcG9uX2ljb24ub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgdmFyIHdlYXBvbl9udW0gPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCd3ZWFwb25fbnVtYmVyJyk7XHJcbiAgICAgICAgICBkaXNwbGF5X3dlYXBvbl9kZXRhaWxlZCh3ZWFwb25fbnVtLCBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIsIGZhbHNlKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHdlYXBvbl9pY29uLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5odG1sKCcnKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbHVtbi5hcHBlbmQod2VhcG9uX2ljb24pO1xyXG4gICAgICAgIHJvdy5hcHBlbmQoY29sdW1uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgd2VhcG9uX3RhYmxlLmFwcGVuZChyb3cpO1xyXG4gIH1cclxuICBza2lsbF9tb2RhbF9jb250ZW50LmFwcGVuZCh3ZWFwb25fdGFibGUpO1xyXG5cclxuICBpZiAoaW52ZW50b3J5Lmxlbmd0aCA+IHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSp0YWJsZV9zaXplKSB7Ly8gdGhlcmUgYXJlIG1vcmUgc2tpbGxzIHRvIGRpc3BsYXlcclxuICAgIHZhciBuZXh0X3BhZ2VfYnV0dG9uID0gJChcIjxJTUc+XCIpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCd3aWR0aCcsICcxMDBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdoZWlnaHQnLCAnNTBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdzcmMnLCBSSUdIVF9BUlJPV19JTUFHRSk7XHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgc2hvd193ZWFwb25fbW9kYWwoY2hhcmFjdGVyX251bWJlciwgc3RhcnRpbmdfaW5kZXggKyB0YWJsZV9zaXplKnRhYmxlX3NpemUpO1xyXG4gICAgfSlcclxuXHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uX2NvbnRhaW5lci5hcHBlbmQobmV4dF9wYWdlX2J1dHRvbik7XHJcbiAgfVxyXG4gIHNraWxsX21vZGFsLnNob3coKTtcclxuXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93X21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIHN0YXJ0aW5nX2luZGV4KSB7XHJcbiAgaGlkZV9tb2RhbCgpO1xyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBza2lsbHNldCA9IGNoYXJhY3Rlci5za2lsbHNldFxyXG5cclxuICB2YXIgc2tpbGxfdGFibGUgPSAkKFwiPHRhYmxlPlwiKTtcclxuXHJcbiAgdmFyIHRhYmxlX3NpemUgPSAzXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGVfc2l6ZTsgaSsrKSB7XHJcbiAgICB2YXIgcm93ID0gJChcIjx0cj5cIik7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRhYmxlX3NpemU7IGorKykge1xyXG4gICAgICB2YXIgaW5kZXggPSBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqaSArIGpcclxuICAgICAgaWYgKGluZGV4IDwgc2tpbGxzZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIHNraWxsX251bWJlciA9IHNraWxsc2V0W2luZGV4XVxyXG4gICAgICAgIHZhciBjb2x1bW4gPSAkKFwiPHRoPlwiKTtcclxuICAgICAgICB2YXIgc2tpbGxfaWNvbiA9ICQoXCI8SU1HPlwiKTtcclxuICAgICAgICB2YXIgYXZhdGFyID0gUVVFU1RJT05fSU1BR0VcclxuICAgICAgICBpZiAoc2tpbGxfZGV0YWlsZWRfaW5mb1tza2lsbF9udW1iZXJdLmhhc093blByb3BlcnR5KCdhdmF0YXInKSkge1xyXG4gICAgICAgICAgYXZhdGFyID0gc2tpbGxfZGV0YWlsZWRfaW5mb1tza2lsbF9udW1iZXJdLmF2YXRhclxyXG4gICAgICAgIH1cclxuICAgICAgICBza2lsbF9pY29uLmFkZENsYXNzKCdza2lsbF9pY29uJyk7XHJcbiAgICAgICAgc2tpbGxfaWNvbi5hdHRyKCd3aWR0aCcsICcxMDBweCcpO1xyXG4gICAgICAgIHNraWxsX2ljb24uYXR0cignc2tpbGxfbnVtYmVyJywgc2tpbGxfbnVtYmVyKTtcclxuICAgICAgICBza2lsbF9pY29uLmF0dHIoJ2hlaWdodCcsICcxMDBweCcpO1xyXG4gICAgICAgIHNraWxsX2ljb24uYXR0cignc3JjJywgYXZhdGFyKTtcclxuICAgICAgICBza2lsbF9pY29uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICB2YXIgcG9zaXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgcG9zaXRpb24pO1xyXG4gICAgICAgICAgdXNlX3NraWxsKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3NraWxsX251bWJlcicpLCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIGhpZGVfbW9kYWwoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNraWxsX2ljb24ub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgdmFyIHNraWxsX251bWJlciA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3NraWxsX251bWJlcicpO1xyXG4gICAgICAgICAgdmFyIHNraWxsX29iamVjdCA9IHNraWxsX2RldGFpbGVkX2luZm9bc2tpbGxfbnVtYmVyXTtcclxuICAgICAgICAgIHZhciBza2lsbF9uYW1lX29iamVjdCA9ICQoXCI8aDI+XCIpO1xyXG4gICAgICAgICAgdmFyIHNraWxsX25hbWUgPSBza2lsbF9saXN0W3NraWxsX251bWJlcl07XHJcbiAgICAgICAgICBza2lsbF9uYW1lX29iamVjdC5odG1sKHNraWxsX25hbWUpO1xyXG4gICAgICAgICAgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLmFwcGVuZChza2lsbF9uYW1lX29iamVjdCk7XHJcblxyXG4gICAgICAgICAgdmFyIHNraWxsX2Nvc3Rfb2JqZWN0ID0gJChcIjxoMj5cIik7XHJcbiAgICAgICAgICBpZiAoc2tpbGxfb2JqZWN0Lmhhc093blByb3BlcnR5KCdjb3N0JykpIHtcclxuICAgICAgICAgICAgdmFyIHNraWxsX2Nvc3QgPSBza2lsbF9vYmplY3QuY29zdDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBza2lsbF9jb3N0ID0gXCLQndC10LjQt9Cy0LXRgdGC0L3QvlwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBza2lsbF9jb3N0X29iamVjdC5odG1sKFwi0KLRgNC10LHRg9C10YIg0LTQtdC50YHRgtCy0LjQuTogXCIgKyBza2lsbF9jb3N0KTtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5hcHBlbmQoc2tpbGxfY29zdF9vYmplY3QpO1xyXG5cclxuICAgICAgICAgIHZhciBza2lsbF9kZXNjcmlwdGlvbl9vYmplY3QgPSAkKFwiPHA+XCIpO1xyXG4gICAgICAgICAgaWYgKHNraWxsX29iamVjdC5oYXNPd25Qcm9wZXJ0eSgnZGVzY3JpcHRpb24nKSkge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfZGVzY3JpcHRpb24gPSBza2lsbF9vYmplY3QuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfZGVzY3JpcHRpb24gPSBcItCc0Ysg0YHQsNC80Lgg0L3QtSDQt9C90LDQtdC8INGH0YLQviDQvtC90L4g0LTQtdC70LDQtdGCXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX29iamVjdC5odG1sKHNraWxsX2Rlc2NyaXB0aW9uKTtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5hcHBlbmQoc2tpbGxfZGVzY3JpcHRpb25fb2JqZWN0KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBza2lsbF9pY29uLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5odG1sKCcnKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbHVtbi5hcHBlbmQoc2tpbGxfaWNvbik7XHJcbiAgICAgICAgcm93LmFwcGVuZChjb2x1bW4pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBza2lsbF90YWJsZS5hcHBlbmQocm93KTtcclxuICB9XHJcbiAgc2tpbGxfbW9kYWxfY29udGVudC5hcHBlbmQoc2tpbGxfdGFibGUpO1xyXG5cclxuICBpZiAoc2tpbGxzZXQubGVuZ3RoID4gc3RhcnRpbmdfaW5kZXggKyB0YWJsZV9zaXplKnRhYmxlX3NpemUpIHsvLyB0aGVyZSBhcmUgbW9yZSBza2lsbHMgdG8gZGlzcGxheVxyXG4gICAgdmFyIG5leHRfcGFnZV9idXR0b24gPSAkKFwiPElNRz5cIik7XHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uLmF0dHIoJ3dpZHRoJywgJzEwMHB4Jyk7XHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uLmF0dHIoJ2hlaWdodCcsICc1MHB4Jyk7XHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uLmF0dHIoJ3NyYycsIFJJR0hUX0FSUk9XX0lNQUdFKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24ub24oXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBzaG93X21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSp0YWJsZV9zaXplKTtcclxuICAgIH0pXHJcblxyXG4gICAgbmV4dF9wYWdlX2J1dHRvbl9jb250YWluZXIuYXBwZW5kKG5leHRfcGFnZV9idXR0b24pO1xyXG4gIH1cclxuICBza2lsbF9tb2RhbC5zaG93KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVfbW9kYWwoKSB7XHJcbiAgc2tpbGxfbW9kYWwuaGlkZSgpO1xyXG4gIHNraWxsX21vZGFsX2NvbnRlbnQuaHRtbChcIlwiKTtcclxuICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuaHRtbChcIlwiKTtcclxuICBuZXh0X3BhZ2VfYnV0dG9uX2NvbnRhaW5lci5odG1sKFwiXCIpO1xyXG59XHJcblxyXG4vLyBhdHRhY2sgcmVsYXRlZCBoZWxwZXJzXHJcblxyXG5mdW5jdGlvbiBjaG9vc2VfY2hhcmFjdGVyX3RvX2F0dGFjayhjZWxsKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMlxyXG4gIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9hdHRhY2tfcGxhY2Vob2xkZXIuanBnXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3BfYXR0YWNrKCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDBcclxuICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24pO1xyXG4gIG9sZF9jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wX3NraWxsKCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDBcclxuICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24pO1xyXG4gIG9sZF9jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQpO1xyXG59XHJcblxyXG5cclxuLy8gcm9sbCBzb21ldGhpbmdcclxuXHJcbmZ1bmN0aW9uIHJvbGxfeCh4KSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHgpICsgMVxyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsU2VhcmNoKGludGVsbGlnZW5jZSwgbW9kKSB7XHJcbiAgcmV0dXJuIGludGVsbGlnZW5jZSArIHJvbGxfeCgyMCkgKyBtb2Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxJbml0aWF0aXZlKCkge1xyXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmUubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gPiAwKSB7IC8vIHNvIGNoYXJhY3RlciBpIGlzIHByZXNlbnRcclxuICAgICAgLy8gcmV0cmlldmUgdGhhdCBjaGFyYWN0ZXIncyBhZ2lsaXR5XHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXTtcclxuICAgICAgdmFyIGFnaWxpdHkgPSBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcbiAgICAgIC8vIHJvbGwgaW5pdGlhdGl2ZSBhbmQgYWRkIGFnaWxpdHkgbW9kaWZpY2F0b3JcclxuICAgICAgdmFyIGluaXRpYXRpdmUgPSBjb21wdXRlSW5pdGlhdGl2ZShwYXJzZUludChhZ2lsaXR5KSk7XHJcblxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtpXSA9IGluaXRpYXRpdmU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdyb2xsX2luaXRpYXRpdmUnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmluaXRpYXRpdmVfc3RhdGUgPSBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbF9hdHRhY2sodHlwZSwgYXR0YWNrZXIsIHRhcmdldCwgYWR2YW50YWdlX2JvbnVzKSB7XHJcbiAgdmFyIGFkdmFudGFnZSA9IDBcclxuICBpZiAoKHR5cGUgPT0gXCJyYW5nZWRcIil8fCh0eXBlID09IFwiZW5lcmd5XCIpKSB7XHJcbiAgICBhZHZhbnRhZ2UgPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVthdHRhY2tlcl07XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uaGFzT3duUHJvcGVydHkoXCJhZGFwdGl2ZV9maWdodGluZ1wiKSkge1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uYWRhcHRpdmVfZmlnaHRpbmcgPT0gMCkge1xyXG4gICAgICAgIGFkdmFudGFnZSA9IGFkdmFudGFnZSArIDE7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQodGA0LDQsdC+0YLQsNC7INGA0LXQudC90LTQttC+0LLRi9C5INGB0YLQsNC6INGD0L3QuNCy0LXRgNGB0LDQu9GM0L3QvtGB0YLQuFwiKTtcclxuICAgICAgfVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5hZGFwdGl2ZV9maWdodGluZyA9IDE7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICh0eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgYWR2YW50YWdlID0gY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVthdHRhY2tlcl1cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5oYXNPd25Qcm9wZXJ0eShcImFkYXB0aXZlX2ZpZ2h0aW5nXCIpKSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5hZGFwdGl2ZV9maWdodGluZyA9PSAxKSB7XHJcbiAgICAgICAgYWR2YW50YWdlID0gYWR2YW50YWdlICsgMTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCh0YDQsNCx0L7RgtCw0Lsg0LzQuNC70LvQuCDRgdGC0LDQuiDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0LhcIik7XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uYWRhcHRpdmVfZmlnaHRpbmcgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuICBhZHZhbnRhZ2UgPSBhZHZhbnRhZ2UgLSBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVt0YXJnZXRdICsgYWR2YW50YWdlX2JvbnVzXHJcblxyXG4gIHZhciByb2xsID0gMFxyXG5cclxuICBpZiAoYWR2YW50YWdlID49IDIpIHsgLy8g0JTQuNC60L7QtSDQv9GA0LXQuNC80YPRidC10YHRgtCy0L4gPSA0INC60YPQsdCwXHJcbiAgICBjb25zb2xlLmxvZyhcItCU0LjQutC+0LUg0L/RgNC10LjQvNGD0YnQtdGB0YLQstC+XCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDMgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDQgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5tYXgocm9sbDEsIHJvbGwyLCByb2xsMywgcm9sbDQpXHJcbiAgfSBlbHNlIGlmIChhZHZhbnRhZ2UgPT0gMSkge1xyXG4gICAgY29uc29sZS5sb2coXCLQn9GA0LXQuNC80YPRidC10YHRgtCy0L5cIilcclxuICAgIHZhciByb2xsMSA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMiA9IHJvbGxfeCgyMClcclxuICAgIHJvbGwgPSBNYXRoLm1heChyb2xsMSwgcm9sbDIpXHJcbiAgfSBlbHNlIGlmIChhZHZhbnRhZ2UgPT0gMCkge1xyXG4gICAgcm9sbCA9IHJvbGxfeCgyMClcclxuICB9IGVsc2UgaWYgKGFkdmFudGFnZSA9PSAtMSkge1xyXG4gICAgY29uc29sZS5sb2coXCLQn9C+0LzQtdGF0LBcIilcclxuICAgIHZhciByb2xsMSA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMiA9IHJvbGxfeCgyMClcclxuICAgIHJvbGwgPSBNYXRoLm1pbihyb2xsMSwgcm9sbDIpXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKFwi0JTQuNC60LDRjyDQv9C+0LzQtdGF0LBcIilcclxuICAgIHZhciByb2xsMSA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMiA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMyA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsNCA9IHJvbGxfeCgyMClcclxuICAgIHJvbGwgPSBNYXRoLm1pbihyb2xsMSwgcm9sbDIsIHJvbGwzLCByb2xsNClcclxuICB9XHJcbiAgcmV0dXJuIHJvbGxcclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbF9ldmFzaW9uKHRhcmdldF9jaGFyYWN0ZXIsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgY29uc29sZS5sb2coXCLQkdC+0L3Rg9GBINGD0LLQvtGA0L7RgtCwOiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pXHJcbiAgdmFyIGV2YWRlX3JvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQodGFyZ2V0X2NoYXJhY3Rlci5hZ2lsaXR5KSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHJldHVybiBldmFkZV9yb2xsXHJcbn1cclxuXHJcbi8vIG1hbmFnaW5nIGNoYXRcclxuXHJcbmZ1bmN0aW9uIHB1c2hUb0xpc3QobWVzc2FnZSkge1xyXG4gIGZvciAobGV0IGk9MTsgaSA8IENIQVRfQ0FTSDsgaSsrKSB7XHJcbiAgICB2YXIgZWxlbWVudF90b19jb3B5ID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyBpICsgJ1wiXScpO1xyXG4gICAgdmFyIGVsZW1lbnRfdG9fcGFzdGUgPSAkKCdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIChpLTEpICsgJ1wiXScpO1xyXG5cclxuICAgIGVsZW1lbnRfdG9fcGFzdGUudGV4dChlbGVtZW50X3RvX2NvcHkudGV4dCgpKTtcclxuICB9XHJcbiAgdmFyIHRvcF9lbGVtZW50ID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyAoQ0hBVF9DQVNILTEpICsgJ1wiXScpO1xyXG4gIHRvcF9lbGVtZW50LnRleHQobWVzc2FnZSk7XHJcblxyXG4gIGlmIChub3RpZmljYXRpb25zX2NvbnRhaW5lci5pcyhcIjpoaWRkZW5cIikpIHtcclxuICAgIGNoYXRfYnV0dG9uLmFkZENsYXNzKFwiaXMtcmVkXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VDaGF0VmlzaWJpbGl0eSgpIHtcclxuICBpZiAoY2hhdF9idXR0b24uaGFzQ2xhc3MoXCJpcy1yZWRcIikpIHtcclxuICAgIGNoYXRfYnV0dG9uLnJlbW92ZUNsYXNzKFwiaXMtcmVkXCIpXHJcbiAgfVxyXG4gIGlmIChub3RpZmljYXRpb25zX2NvbnRhaW5lci5pcyhcIjpoaWRkZW5cIikpIHtcclxuICAgIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLnNob3coKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbm90aWZpY2F0aW9uc19jb250YWluZXIuaGlkZSgpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gY292ZXIgbWVjaGFuaWNzXHJcblxyXG5mdW5jdGlvbiBjb3Zlcl9tb2QoYWNjdW11bGF0ZWRfY292ZXIpIHtcclxuICB2YXIgbW9kID0ge31cclxuICBtb2QuaXNQb3NzaWJsZSA9IHRydWVcclxuICBtb2QuY292ZXJfbGV2ZWwgPSBhY2N1bXVsYXRlZF9jb3ZlclxyXG4gIHN3aXRjaChhY2N1bXVsYXRlZF9jb3Zlcikge1xyXG4gICAgY2FzZSAwOlxyXG4gICAgICBtb2QuYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IDBcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMVxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IC0yXHJcbiAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAwXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA0OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMlxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA1OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtM1xyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA2OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtM1xyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA3OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNFxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA4OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNFxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtM1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA5OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtM1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgICBtb2QuaXNQb3NzaWJsZSA9IGZhbHNlXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVfY292ZXIoZGlzdGFuY2UsIGNvdmVyKSB7XHJcbiAgdmFyIHJlc3VsdCA9IDBcclxuICBpZiAoZGlzdGFuY2UgPCAwLjE1KSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlclxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjMpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC43NVxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjUpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC41XHJcbiAgfSBlbHNlIGlmIChkaXN0YW5jZSA8IDAuNjUpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC4yNVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXN1bHQgPSAwXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldF9hY2N1bXVsYXRlZF9jb3Zlcih1c2VyX3BvcywgdGFyZ2V0X3Bvcykge1xyXG4gIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IDBcclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gY2VsbHNfb25fbGluZSh1c2VyX3BvcywgdGFyZ2V0X3BvcywgZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9jZWxsID0gY2FuZGlkYXRlX2NlbGxzW2ldXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjdXJyZW50X2NlbGxdIDwgMCkgey8vINGN0YLQviDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1XHJcbiAgICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9bTWF0aC5hYnMoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjdXJyZW50X2NlbGxdKV1cclxuICAgICAgdmFyIGRpc3RhbmNlID0gZGlzdGFuY2VfdG9fbGluZSh1c2VyX3BvcywgdGFyZ2V0X3BvcywgZ2FtZV9zdGF0ZS5zaXplLCBjdXJyZW50X2NlbGwpXHJcbiAgICAgIGFjY3VtdWxhdGVkX2NvdmVyID0gYWNjdW11bGF0ZWRfY292ZXIgKyBjb21wdXRlX2NvdmVyKGRpc3RhbmNlLCBvYnN0YWNsZS5jb3ZlcilcclxuICAgIH1cclxuICB9XHJcbiAgYWNjdW11bGF0ZWRfY292ZXIgPSBNYXRoLmNlaWwoYWNjdW11bGF0ZWRfY292ZXIpXHJcbiAgcmV0dXJuIGFjY3VtdWxhdGVkX2NvdmVyXHJcbn1cclxuXHJcbi8vIE1pc2NlbGFuZW91cyBhY3Rpb25zXHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHkoY2hhcmFjdGVyX251bWJlcikge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9IFwiY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5XCI7XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuXHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IDApIHtcclxuICAgIHRvU2VuZC5uZXdfdmFsdWUgPSAxXHJcbiAgfSBlbHNlIHtcclxuICAgIHRvU2VuZC5uZXdfdmFsdWUgPSAwXHJcbiAgfVxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZWFyY2hfYWN0aW9uKHNlYXJjaF9idXR0b24pIHtcclxuICB2YXIgaW5kZXggPSBzZWFyY2hfYnV0dG9uLmluZGV4O1xyXG4gIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGlmICghKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxICYmIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPCAxKSkge1xyXG5cclxuICAgIHZhciBuYW1lID0gY2hhcmFjdGVyLm5hbWU7XHJcbiAgICB2YXIgbW9kaWZpY2F0b3IgPSBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtpbmRleF07XHJcbiAgICB2YXIgaW50ZWxsaWdlbmNlID0gY2hhcmFjdGVyLmludGVsbGlnZW5jZTtcclxuICAgIHZhciByb2xsID0gcm9sbFNlYXJjaChwYXJzZUludChpbnRlbGxpZ2VuY2UpLCBwYXJzZUludChtb2RpZmljYXRvcikpO1xyXG4gICAgdmFyIHpvbmVfbnVtYmVyID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2luZGV4XTtcclxuICAgIHB1c2hUb0xpc3QoJ9Cf0LXRgNGB0L7QvdCw0LYgJyArIG5hbWUgKyAnINCx0YDQvtGB0LjQuyAnICsgcm9sbCArICcg0L3QsCDQstC90LjQvNCw0YLQtdC70YzQvdC+0YHRgtGMJyk7XHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2VhcmNoX2FjdGlvbic7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBuYW1lO1xyXG4gICAgdG9TZW5kLnJvbGwgPSByb2xsO1xyXG4gICAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnBsYXllcl9uYW1lID0gbXlfbmFtZVxyXG4gICAgdG9TZW5kLm1pbmVzX2RldGVjdGVkID0gW11cclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG5cclxuICAgIHZhciBsYW5kbWluZV9jYW5kaWRhdGVzID0gaW5kZXhfaW5fcmFkaXVzKGluZGV4LCBsYW5kbWluZV9kZXRlY3Rpb25fcmFkaXVzKVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYW5kbWluZV9jYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhsYW5kbWluZV9jYW5kaWRhdGVzW2ldKSkge1xyXG4gICAgICAgICAgdG9TZW5kLm1pbmVzX2RldGVjdGVkLnB1c2gobGFuZG1pbmVfY2FuZGlkYXRlc1tpXSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCe0LHRi9GB0Log0LLQviDQstGA0LXQvNGPINCx0L7RjyDRgdGC0L7QuNGCINCx0L7QvdGD0YHQvdC+0LUg0LTQtdC50YHRgtCy0LjQtSFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVJbml0aWF0aXZlKGFnaWxpdHkpIHtcclxuICByZXR1cm4gYWdpbGl0eSoyICsgcm9sbF94KDIwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRfbmV3X3JvdW5kKCkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICduZXdfcm91bmQnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdmFyIHNhdmVfcm9sbCA9IFtdXHJcblxyXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZS5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2ldXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXSAhPT0gdW5kZWZpbmVkICYmIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0gIT09IG51bGwpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBzYXZlX3JvbGxbaV0gPSByb2xsX3goMjApICsgcGFyc2VJbnQoY2hhcmFjdGVyLnN0YW1pbmEpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgdG9TZW5kLnNhdmVfcm9sbF9saXN0ID0gc2F2ZV9yb2xsXHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VfYmF0dGxlX21vZCgpIHtcclxuICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgIHZhciBuZXdfdmFsdWUgPSAwXHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBuZXdfdmFsdWUgPSAxXHJcbiAgfVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnYmF0dGxlX21vZCc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudmFsdWUgPSBuZXdfdmFsdWVcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuLy8gYXR0YWNrIHJlbGF0ZWQgdGhpbmdzIChjb21wdXRhdGlvbilcclxuXHJcbmZ1bmN0aW9uIGNoYXJhY3Rlcl9LRCh0YXJnZXRfY2hhcmFjdGVyX251bWJlcikge1xyXG4gIHJldHVybiBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhc3NpZ25fbW92ZXMoY2hhcmFjdGVyX251bWJlcikge1xyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA9IHBhcnNlRmxvYXQobW92ZV9hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XSk7XHJcbiAgaWYgKGNoYXJhY3Rlci5oYXNPd25Qcm9wZXJ0eShcImV4dHJhX21vdmVtZW50XCIpKSB7XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gKyBwYXJzZUZsb2F0KGNoYXJhY3Rlci5leHRyYV9tb3ZlbWVudCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB3ZWFwb25fZGFtYWdlX2JvbnVzKHJhd19kYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcikge1xyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0b3RhbF9kYW1hZ2UgPSByYXdfZGFtYWdlXHJcbiAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgIHRvdGFsX2RhbWFnZSA9IHRvdGFsX2RhbWFnZSArIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKV1cclxuICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09ICd0aHJvd2luZycpIHtcclxuICAgIHRvdGFsX2RhbWFnZSA9IHRvdGFsX2RhbWFnZSArIHN0cmVuZ3RoX2RhbWFnZV9tYXBbTWF0aC5jZWlsKHBhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCkvMildXHJcbiAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSAncmFuZ2VkJykge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhaW1cIikgJiYgd2VhcG9uLmhhc093blByb3BlcnR5KFwiYWltX2JvbnVzXCIpKSB7XHJcbiAgICAgIHRvdGFsX2RhbWFnZSA9IHRvdGFsX2RhbWFnZSArIHBhcnNlSW50KHdlYXBvbi5haW1fYm9udXMpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHRvdGFsX2RhbWFnZSA9IHRvdGFsX2RhbWFnZSArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl1cclxuICByZXR1cm4gdG90YWxfZGFtYWdlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBlcmZvcm1fYXR0YWNrKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcblxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfY2hvc2VuLndlYXBvbl9pZF1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG5cclxuICAgIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3Zlcih1c2VyX3Bvc2l0aW9uLCBpbmRleClcclxuXHJcbiAgICB2YXIgY292ZXJfbW9kaWZpZXIgPSBjb3Zlcl9tb2QoYWNjdW11bGF0ZWRfY292ZXIpXHJcblxyXG5cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9LRCA9IGNoYXJhY3Rlcl9LRCh0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAncmVzb2x2ZV9hdHRhY2snO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5hdHRhY2tlcl9pZCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmF0dGFja2VyX3Bvc2l0aW9uID0gdXNlcl9wb3NpdGlvblxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQuYXR0YWNrX3R5cGUgPSB3ZWFwb24udHlwZVxyXG4gICAgdG9TZW5kLmNvdmVyX2xldmVsID0gY292ZXJfbW9kaWZpZXIuY292ZXJfbGV2ZWxcclxuICAgIHRvU2VuZC51c2VyX2ludmlzaWJpbGl0eV9lbmRlZCA9IDBcclxuXHJcbiAgICBpZiAod2VhcG9uLmhhc093blByb3BlcnR5KFwic3VidHlwZVwiKSAmJiB3ZWFwb24uc3VidHlwZSA9PSBcIlBQXCIpIHtcclxuICAgICAgdG9TZW5kLnF1aWNrX2F0dGFja19yZWFkeSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSAhPSBcImFsbFwiICYmIHdlYXBvbi50eXBlICE9IFwidGhyb3dpbmdcIikge1xyXG4gICAgICB0b1NlbmQudXNlcl9pbnZpc2liaWxpdHlfZW5kZWQgPSAxXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvdmVyX21vZGlmaWVyLmlzUG9zc2libGUpIHtcclxuICAgICAgdmFyIGF0dGFja19yb2xsID0gcm9sbF9hdHRhY2sod2VhcG9uLnR5cGUsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGNvdmVyX21vZGlmaWVyLmFkdmFudGFnZV9ib251cylcclxuICAgICAgaWYgKGF0dGFja19yb2xsIDwgMjApIHsvLyBubyBjcml0XHJcbiAgICAgICAgaWYgKHdlYXBvbi50eXBlID09IFwicmFuZ2VkXCIpIHtcclxuICAgICAgICAgIHZhciBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gYXR0YWNrX3JvbGwgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSlcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhaW1cIikpIHsvLyDQn9GA0LjRhtC10Lsg0LTQsNCx0LvQuNGCINCx0L7QvdGD0YEg0L/QvtC/0LDQtNCw0L3QuNGPXHJcbiAgICAgICAgICAgIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICAgICAgICB0b1NlbmQuYWltX292ZXIgPSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5zdHJlbmd0aClcclxuICAgICAgICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwiZW5lcmd5XCIpIHtcclxuICAgICAgICAgIHZhciBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gYXR0YWNrX3JvbGwgKyAyKnBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gICAgICAgIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJ0aHJvd2luZ1wiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5hZ2lsaXR5KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGF0dGFja19ib251cyA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIHZhciB1bml2ZXJzYWxfYm9udXMgPSBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgICAgICAgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgKyBhdHRhY2tfYm9udXMgKyB1bml2ZXJzYWxfYm9udXMgKyBjb3Zlcl9tb2RpZmllci5hdHRhY2tfYm9udXNcclxuXHJcbiAgICAgICAgdG9TZW5kLmF0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbFxyXG5cclxuICAgICAgICBpZiAoY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA+IHRhcmdldF9jaGFyYWN0ZXJfS0QpIHsvLyDQldGB0YLRjCDQv9GA0L7QsdC40YLQuNC1XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgZXZhZGVfcm9sbCA9IHJvbGxfZXZhc2lvbih0YXJnZXRfY2hhcmFjdGVyLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgdG9TZW5kLmV2YWRlX3JvbGwgPSBldmFkZV9yb2xsXHJcbiAgICAgICAgICAgIGlmIChldmFkZV9yb2xsID4gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCkgeyAvL3N1Y2Nlc2Z1bGx5IGV2YWRlZFxyXG4gICAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJldmFkZWRcIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfY2hhcmFjdGVyX251bWJlciwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJLRF9ibG9ja1wiXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgeyAvLyBmdWxsIGNyaXRcclxuICAgICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbFxyXG4gICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jcml0XCJcclxuICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmdWxsX2NvdmVyXCJcclxuICB9XHJcblxyXG4gICAgaWYgKHRvU2VuZC5oYXNPd25Qcm9wZXJ0eShcImRhbWFnZV9yb2xsXCIpICYmIHdlYXBvbi5oYXNPd25Qcm9wZXJ0eShcInN1YnR5cGVcIikgJiYgd2VhcG9uLnN1YnR5cGUgPT0gXCJkcm9ib3Zpa1wiKSB7XHJcbiAgICAgIHZhciBzbG93X3NjYWxlID0gcGFyc2VGbG9hdCh3ZWFwb24uc2xvd19zY2FsZSk7XHJcbiAgICAgIHZhciBmdWxsX2hwID0gSFBfdmFsdWVzW3BhcnNlSW50KHRhcmdldF9jaGFyYWN0ZXIuc3RhbWluYSldXHJcbiAgICAgIHZhciBjdXJyZW50X21vdmVzID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgZnJhY3Rpb24gPSBwYXJzZUZsb2F0KHRvU2VuZC5kYW1hZ2Vfcm9sbCkvcGFyc2VGbG9hdChmdWxsX2hwKVxyXG4gICAgICB2YXIgbW92ZV9yZWR1Y3Rpb24gPSBjdXJyZW50X21vdmVzICogZnJhY3Rpb24gKiBzbG93X3NjYWxlO1xyXG4gICAgICB0b1NlbmQubW92ZV9yZWR1Y3Rpb24gPSBtb3ZlX3JlZHVjdGlvbjtcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+Li4uXCIpXHJcbiAgfVxyXG4gIHN0b3BfYXR0YWNrKClcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X251bWJlcikge1xyXG4gIHZhciBkYW1hZ2UgPSAwXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwic25pcGVyXCIpIHtcclxuICAgIGlmIChhdHRhY2tfcm9sbCA8IDE2KSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KHdlYXBvbi5kYW1hZ2VbMV0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcIndlYWtzcG90XCIpICYmIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X251bWJlcl0ud2Vha3Nwb3QuaHVudGVyX2lkID09IGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICAgICAgICBzd2l0Y2ggKGF0dGFja19yb2xsKSB7XHJcbiAgICAgICAgICBjYXNlIDE4OlxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqMlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMTk6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSoyXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSo1XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3aXRjaCAoYXR0YWNrX3JvbGwpIHtcclxuICAgICAgICAgIGNhc2UgMTg6XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOTpcclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjJcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjNcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGF0dGFja19yb2xsIDwgMTkpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWFwb24uZGFtYWdlWzBdOyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3god2VhcG9uLmRhbWFnZVsxXSlcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgIH1cclxuICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcblxyXG4gICAgaWYgKGF0dGFja19yb2xsID09IDIwKSB7XHJcbiAgICAgIGRhbWFnZSA9IGRhbWFnZSAqIDJcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICB2YXIgZGFtYWdlX3R5cGUgPSBcImJ1bGxldFwiXHJcbiAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIHZhciBkYW1hZ2VfdHlwZSA9IFwibWVsZWVcIlxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJlbmVyZ3lcIikge1xyXG4gICAgICB2YXIgZGFtYWdlX3R5cGUgPSBcImVuZXJneVwiXHJcbiAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcInRocm93aW5nXCIpIHtcclxuICAgICAgdmFyIGRhbWFnZV90eXBlID0gXCJtZWxlZVwiXHJcbiAgfVxyXG5cclxuICBzd2l0Y2goZGFtYWdlX3R5cGUpIHtcclxuICAgIGNhc2UgXCJtZWxlZVwiOlxyXG4gICAgICB2YXIgcmVzaXN0ID0gY2hhcmFjdGVyX3N0YXRlLm1lbGVlX3Jlc2lzdFt0YXJnZXRfbnVtYmVyXVxyXG4gICAgICBjb25zb2xlLmxvZyhcItCj0YDQvtC9INC00L4g0YDQtdC30LjRgdGC0LA6IFwiICsgZGFtYWdlKVxyXG4gICAgICBkYW1hZ2UgPSBwYXJzZUludChkYW1hZ2UgKiAoMS4wIC0gcmVzaXN0KSlcclxuICAgICAgY29uc29sZS5sb2coXCLQo9GA0L7QvSDQv9C+0YHQu9C1INGA0LXQt9C40YHRgtCwOiBcIiArIGRhbWFnZSlcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiYnVsbGV0XCI6XHJcbiAgICAgIHZhciByZXNpc3QgPSBjaGFyYWN0ZXJfc3RhdGUuYnVsbGV0X3Jlc2lzdFt0YXJnZXRfbnVtYmVyXVxyXG4gICAgICBjb25zb2xlLmxvZyhcItCj0YDQvtC9INC00L4g0YDQtdC30LjRgdGC0LA6IFwiICsgZGFtYWdlKVxyXG4gICAgICBkYW1hZ2UgPSBwYXJzZUludChkYW1hZ2UgKiAoMS4wIC0gcmVzaXN0KSlcclxuICAgICAgY29uc29sZS5sb2coXCLQo9GA0L7QvSDQv9C+0YHQu9C1INGA0LXQt9C40YHRgtCwOiBcIiArIGRhbWFnZSlcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICAvL25vdGhpbmcgZm9yIG5vd1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRhbWFnZVxyXG59XHJcblxyXG5mdW5jdGlvbiBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUodGFyZ2V0X3BvcywgdXNlcl9wb3MsIHJhbmdlLCB1c2VyX2lkLCBza2lsbF9pZCwgYm9udXNfYXR0YWNrLCB3ZWFwb24sIGFjY3VtdWxhdGVkX2NvdmVyKSB7XHJcbiAgaWYgKGlzSW5SYW5nZSh0YXJnZXRfcG9zLCB1c2VyX3BvcywgcmFuZ2UpKSB7XHJcblxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVt0YXJnZXRfcG9zXVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfS0QgPSBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pZF1cclxuXHJcbiAgICB2YXIgY292ZXJfbW9kaWZpZXIgPSBjb3Zlcl9tb2QoYWNjdW11bGF0ZWRfY292ZXIpXHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfaWRcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmNvdmVyX2xldmVsID0gYWNjdW11bGF0ZWRfY292ZXJcclxuXHJcbiAgICBpZiAoY292ZXJfbW9kaWZpZXIuaXNQb3NzaWJsZSkge1xyXG5cclxuICAgICAgdmFyIGF0dGFja19yb2xsID0gcm9sbF9hdHRhY2sod2VhcG9uLnR5cGUsIHVzZXJfaWQsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyLCBjb3Zlcl9tb2RpZmllci5hZHZhbnRhZ2VfYm9udXMpXHJcblxyXG4gICAgICBpZiAoYXR0YWNrX3JvbGwgPCAyMCkgey8vIG5vIGNyaXRcclxuICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgYm9udXNfYXR0YWNrICsgY292ZXJfbW9kaWZpZXIuYXR0YWNrX2JvbnVzXHJcblxyXG4gICAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGN1bXVsYXRpdmVfYXR0YWNrX3JvbGxcclxuXHJcbiAgICAgICAgaWYgKGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPiB0YXJnZXRfY2hhcmFjdGVyX0tEKSB7Ly8g0JXRgdGC0Ywg0L/RgNC+0LHQuNGC0LjQtVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID09IDEpIHtcclxuICAgICAgICAgICAgdmFyIGV2YWRlX3JvbGwgPSByb2xsX2V2YXNpb24odGFyZ2V0X2NoYXJhY3RlciwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIHRvU2VuZC5ldmFkZV9yb2xsID0gZXZhZGVfcm9sbFxyXG4gICAgICAgICAgICBpZiAoZXZhZGVfcm9sbCA+IGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwpIHsgLy9zdWNjZXNmdWxseSBldmFkZWRcclxuICAgICAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZXZhZGVkXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfaWQsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9pZCwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJLRF9ibG9ja1wiXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgeyAvLyBmdWxsIGNyaXRcclxuICAgICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbFxyXG4gICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9pZCwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZ1bGxfY3JpdFwiXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmdWxsX2NvdmVyXCJcclxuICAgIH1cclxuICAgIHJldHVybiB0b1NlbmRcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkb19kYW1hZ2UoY2hhcmFjdGVyX251bWJlciwgZGFtYWdlKSB7XHJcbiAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiZm9yY2VfZmllbGRfdGFyZ2V0XCIpKSB7XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gLSBkYW1hZ2VcclxuICB9IGVsc2Uge1xyXG4gICAgdmFyIHNoaWVsZF9pbmRleCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uZm9yY2VfZmllbGRfdGFyZ2V0LnNoaWVsZF9pbmRleFxyXG4gICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5zaGllbGQgPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZCAtIGRhbWFnZVxyXG4gICAgdmFyIG1lc3NhZ2UgPSBcItCp0LjRgiDQv9GA0LjQvdGP0Lsg0YPRgNC+0L0g0L3QsCDRgdC10LHRjyEg0J7RgdGC0LDQstGI0LDRj9GB0Y8g0L/RgNC+0YfQvdC+0YHRgtGMOiBcIiArIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkXHJcbiAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5zaGllbGQgPD0gMCkgey8vINGJ0LjRgiDRg9C90LjRh9GC0L7QttC10L1cclxuICAgICAgdmFyIG1lc3NhZ2UgPSBcIlByZXNzIEYg0KnQuNGC0YMuLi5cIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgIHZhciBjaGFyX2xpc3QgPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLmNoYXJhY3Rlcl9saXN0XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcl9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyX2xpc3RbaV1cclxuICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXRcclxuICAgICAgfVxyXG4gICAgICBkZWxldGVfb2JqZWN0X2NvbW1hbmQoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5wb3NpdGlvbilcclxuICAgICAgZGVsZXRlIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRUaHJvd1JhbmdlKGNoYXJhY3Rlcikge1xyXG4gIHJldHVybiB0aHJvd19iYXNlX3JhbmdlICsgcGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKSoyXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1lbGVlX3BlbmFsdHkoZGF0YSkge1xyXG4gIGlmIChkYXRhLmF0dGFja190eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5oYXNPd25Qcm9wZXJ0eShcIm1lbGVlZFwiKSkgeyAvLyDQuNC90LDRh9C1INGN0YTRhNC10LrRgiDRg9C20LUg0L3QsNC70L7QttC10L0sINC90LUg0L/QvtCy0YLQvtGA0Y/QtdC8XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2RhdGEudGFyZ2V0X2lkXSAtIDFcclxuICAgICAgdmFyIG1lbGVlZF9vYmplY3QgPSB7fVxyXG4gICAgICBtZWxlZWRfb2JqZWN0LmNvb2xkb3duID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5tZWxlZWQgPSBtZWxlZWRfb2JqZWN0XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtkYXRhLnRhcmdldF9pZF0gPT0gMSkge1xyXG4gICAgICB2YXIgY29vbGRvd24gPSAxXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgY29vbGRvd24gPSAwXHJcbiAgICB9XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5tZWxlZWQuY29vbGRvd24gPSBjb29sZG93blxyXG4gIH1cclxufVxyXG5cclxuLy8gU2tpbGxzIVxyXG5cclxuZnVuY3Rpb24gdXNlX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbCkge1xyXG4gIHNraWxsX2luZGV4ID0gcGFyc2VJbnQoc2tpbGxfaW5kZXgpXHJcbiAgc3dpdGNoKHNraWxsX2luZGV4KSB7XHJcbiAgICBjYXNlIDA6IC8v0KDRi9Cy0L7QulxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiY2hhcmdlX3VzZXJcIikgfHwgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl0uc3BlY2lhbF90eXBlID09IFwicm9ndWVcIikpIHtcclxuICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTogLy/Qn9GA0LjQu9C40LIg0JDQtNGA0LXQvdCw0LvQuNC90LBcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhZHJlbmFsaW5lX3VzZXJcIikpIHtcclxuICAgICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtVwiKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOiAvLyDQn9C+0LTRgNC10LfQsNGC0Ywg0YHRg9GF0L7QttC40LvQuNGPXHJcbiAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJjdXRfbGltYl91c2VyXCIpKSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzOiAvLyDQodC70LDQsdC+0LUg0LzQtdGB0YLQvlxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDQ6IC8vINCb0LXRh9C10L3QuNC1XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA1OiAvLyDQkdC+0LvRjNGI0L7QuSDQsdGA0LDRglxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDY6IC8vINCf0L7QtNC90Y/RgtGMINGJ0LjRgtGLXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCB8fCBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwic2hpZWxkX3VwXCIpKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwic2hpZWxkX3VwXCIpKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInNoaWVsZF9kb3duXCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic2hpZWxkX3VwXCJcclxuICAgICAgfVxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA3OiAvLyDQv9C+0LbQuNGA0LDQvdC40LUg0YHRg9GJ0L3QvtGB0YLQuFxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgODogLy8g0YPQt9C90LDRgtGMINCx0LjQvtC/0YPQu1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImJpb3Bvb2xcIikpIHtcclxuICAgICAgICBhbGVydChcItCd0LDQutC+0L/Qu9C10L3QvdGL0Lkg0LHQuNC+0L/Rg9C7OiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uYmlvcG9vbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LDQutC+0L/Qu9C10L3QvdGL0Lkg0LHQuNC+0L/Rg9C7INC+0YLRgdGD0YLRgdGC0LLRg9C10YJcIilcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDk6IC8vINCx0LXQt9GD0L/RgNC10YfQvdC+0LUg0LLQvtGB0YHRgtCw0L3QvtCy0LvQtdC90LjQtVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDEwOiAvLyDQvtCx0YvRh9C90L7QtSDQsiDQsdC+0L3Rg9GB0L3QvtC1XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC+0YHQvdC+0LLQvdGL0YUg0LTQtdC50YHRgtCy0LjQuSwg0YfRgtC+0LHRiyDQv9GA0LXQstGA0LDRgtC40YLRjCDQsiDQsdC+0L3Rg9GB0L3Ri9C1IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxMTogLy8g0L7RgtC00YvRhVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbY2hhcmFjdGVyX251bWJlcl0gPT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3X3N0YW1pbmEgPSBNYXRoLm1pbihjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSArIHJlc3Rfc3RhbWluYV9nYWluLCBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXS5zdGFtaW5hXSlcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICAgIHRvU2VuZC5uZXdfc3RhbWluYSA9IG5ld19zdGFtaW5hXHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0JLRiyDRg9C20LUg0YHQvtCy0LXRgNGI0LDQu9C4INC00LXQudGB0YLQstC40Y8g0L3QsCDRjdGC0L7QvCDRhdC+0LTRgywg0YLQsNC6INGH0YLQviDQvdC1INC80L7QttC10YLQtSDQvtGC0LTQvtGF0L3Rg9GC0YxcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDEyOiAvLyDQs9Cw0LfQvtCy0LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCjINCz0YDQsNC90LDRgtGLINC60YPQu9C00LDRg9C9ICjQs9Cw0Lcg0Y3RjdGNINC30LDQstCw0YDQuNCy0LDQtdGC0YHRjywg0YXQtylcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxMzogLy8g0YHQstC10YLQvtGI0YPQvNC+0LLQsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJsaWdodF9zb3VuZF9ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCT0YDQsNC90LDRgtCwINC10YnQtSDQvdC1INCz0L7RgtC+0LLQsFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTQ6IC8vINCo0L7QutC+0LLRi9C5INC40LzQv9GD0LvRjNGBXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTU6IC8vINCf0YvRiS3Qv9GL0Ykt0LPQvlxyXG4gICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJwaWNoX3BpY2hfdXNlclwiKSkge1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCf0YvRiSDQv9GL0Ykg0LXRidC1INC90LAg0L/QtdGA0LXQt9Cw0YDRj9C00LrQtSFcIilcclxuICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTY6IC8vINCh0LjQu9C+0LLQvtC1INC/0L7Qu9C1XHJcbiAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiZm9yY2VfZmllbGRfdXNlclwiKSkge1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQk9C10L3QtdGA0LDRgtC+0YAg0YHQuNC70L7QstC+0LPQviDQv9C+0LvRjyDQtdGJ0LUg0L3QtSDQt9Cw0YDRj9C00LjQu9GB0Y8hXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTc6IC8vINCY0L3QstC40LdcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXg7XHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJuYW1lID0gbXlfbmFtZTtcclxuICAgICAgICAgICAgdG9TZW5kLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE4OiAvLyDQkdC+0LXQstCw0Y8g0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtGMXHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleDtcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxOTogLy8g0JvQsNC60Lgg0YjQvtGCXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjA6IC8vINCb0L7RgtC10YDQtdC50L3Ri9C5INCy0YvRgdGC0YDQtdC7XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjE6IC8v0J/RgNC40LvQuNCyINC00LXQudGB0YLQstC40LlcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhY3Rpb25fc3BsYXNoXCIpKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICB0b1NlbmQuZXh0cmFfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcblxyXG4gICAgY2FzZSAyMjogLy8g0LPRgNCw0LQg0YPQtNCw0YDQvtCyXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDEpIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCU0LvRjyDQs9GA0LDQtNCwINGD0LTQsNGA0L7QsiDRgtGA0LXQsdGD0LXRgtGB0Y8g0LHQvtC70YzRiNC1IDEg0L7RgdC90L7QstC90L7Qs9C+INC00LXQudGB0YLQstC40Y8hXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIzOiAvL9CQ0LTRgNC10L3QsNC70LjQvdC+0LLRi9C5INC/0L7RgtC+0L9cclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInBvaXNvbm91c19hZHJlbmFsaW5lX3VzZXJcIikpIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1XCIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI0OiAvLyDQutC40YHQu9C+0YLQvdCw0Y8g0LPRgNCw0L3QsNGC0LBcclxuICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFjaWRfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0KMg0LPRgNCw0L3QsNGC0Ysg0LrRg9C70LTQsNGD0L0gKNC60LjRgdC70L7RgtCwINC+0LrQuNGB0LvRj9C10YLRgdGPKVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyNTogLy8g0JfQsNC80LjQvdC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgICB0b1NlbmQucGxheWVyX25hbWUgPSBteV9uYW1lXHJcbiAgICAgICAgICAgIHRvU2VuZC5wb3NpdGlvbiA9IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI2OiAvLyDQntCx0LXQt9Cy0YDQtdC00LjRgtGMINC80LjQvdGDXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCt0YLQviDRg9C80LXQvdC40LUg0YLRgNC10LHRg9C10YIgMSDQsdC+0L3Rg9GB0L3QvtC1INC00LXQudGB0YLQstC40LUhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI3OiAvLyDQndC40LrQvtGC0LjQvdC+0LLRi9C5INGD0LTQsNGAXHJcbiAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJ0b2JhY2NvX3N0cmlrZVwiKSkge1xyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC10LvRjNC30Y8g0LfQsNGC0Y/Qs9C40LLQsNGC0YzRgdGPINGC0LDQuiDRh9Cw0YHRgtC+ISDQoyDQstCw0YEg0LfQsNCy0LjRgdC40LzQvtGB0YLRjFwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI4OiAvLyDQmtGA0YPRh9C10L3Ri9C1INC/0YPQu9C4XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOTogLy8g0J/RgNC40YbQtdC70LjRgtGM0YHRj1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSkge1xyXG4gICAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0JLRiyDRg9C20LUg0L/RgNC40YbQtdC70LjQu9C40YHRjCAtINC/0L7RgNCwINGI0LzQsNC70Y/RgtGMXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDMwOiAvLyDQsdGL0YHRgtGA0LDRjyDQsNGC0LDQutCwXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInF1aWNrX2F0dGFja19yZWFkeVwiKSkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCh0L/QtdGA0LLQsCDQvdGD0LbQvdC+INGB0L7QstC10YDRiNC40YLRjCDQvtGB0L3QvtCy0L3Rg9GOINCw0YLQsNC60YMhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDMxOiAvLyDRgdC70YPQttCx0LAg0YHQv9Cw0YHQtdC90LjRj1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAxKSB7Ly8g0LTQstCwINCx0L7QvdGD0YHQvdGL0YVcclxuICAgICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwic2FmZXR5X3NlcnZpY2VfdXNlclwiKSkge1xyXG4gICAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzI6IC8vINCa0LDQu9GM0LjQvdCz0LDQu9C70Y/RgtC+0YBcclxuICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJjYWxpbmdhbGF0b3JfdXNlclwiKSkge1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQp9GA0LXQt9C80LXRgNC90L7QtSDQutCw0LvQuNC90LPQsNC70LjRgNC+0LLQsNC90LjQtSDQstGA0LXQtNC40YIg0LLQsNGI0LXQvNGDINC30LTQvtGA0L7QstGM0Y4hICjQutGD0LvQtNCw0YPQvSlcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYWxlcnQoXCLQndC1INC30L3QsNC10Lwg0Y3RgtC+INGD0LzQtdC90LjQtVwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGVyZm9ybV9za2lsbChpbmRleCwgY2VsbCkge1xyXG4gIHN3aXRjaChjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkKSB7XHJcbiAgICBjYXNlIDE6XHJcbiAgICAgIGFkcmVuYWxpbmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOiAvLyDQn9C+0LTRgNC10LfQsNGC0Ywg0YHRg9GF0L7QttC40LvQuNGPXHJcbiAgICAgIGN1dF9saW1icyhpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM6IC8vINCh0LvQsNCx0L7QtSDQvNC10YHRgtC+XHJcbiAgICAgIHdlYWtfc3BvdChpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDQ6IC8vINCb0LXRh9C10L3QuNC1XHJcbiAgICAgIGhlYWwoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA1OiAvLyDQkdC+0LvRjNGI0L7QuSDQsdGA0LDRglxyXG4gICAgICBiaWdfYnJvKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNzogLy8g0L/QvtC20LjRgNCw0L3QuNC1XHJcbiAgICAgIGRldm91cihpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDk6XHJcbiAgICAgIGFic29sdXRlX3JlY292ZXJ5KGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTI6XHJcbiAgICAgIGdhc19ib21iKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTM6XHJcbiAgICAgIGxpZ2h0X3NvdW5kX2JvbWIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNDpcclxuICAgICAgc2hvY2tfd2F2ZShpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE1OlxyXG4gICAgICBwaWNoX3BpY2hfZ28oaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNjpcclxuICAgICAgZm9yY2VfZmllbGQoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTk6XHJcbiAgICAgIGx1Y2t5X3Nob3QoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjA6XHJcbiAgICAgIGxvdHRlcnlfc2hvdChpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMjpcclxuICAgICAgcHVuY2hfcmFpbmZhbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjM6XHJcbiAgICAgIHBvaXNvbm91c19hZHJlbmFsaW5lKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI0OlxyXG4gICAgICBhY2lkX2JvbWIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjY6XHJcbiAgICAgIGRpZmZ1c2VfbGFuZG1pbmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyODpcclxuICAgICAgY3VydmVkX2J1bGxldHMoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzMDpcclxuICAgICAgcXVpY2tfYXR0YWNrKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzE6XHJcbiAgICAgIHNhZmV0eV9zZXJ2aWNlKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzI6XHJcbiAgICAgIGNhbGluZ2FsYXRvcihpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBhbGVydChcIlVua25vd24gdGFyZ2V0ZWQgc2tpbGxcIilcclxuICB9XHJcbiAgc3RvcF9za2lsbCgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gM1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQgPSBza2lsbF9pbmRleFxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24gPSBwb3NpdGlvblxyXG4gIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9DaGlkb3JpLndlYnBcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gc2FmZXR5X3NlcnZpY2UoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBzYWZldHlfc2VydmljZV9yYW5nZSkpIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwic2FmZXR5X3NlcnZpY2VfdGFyZ2V0XCIpKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0K3RgtCwINGG0LXQu9GMINGD0LbQtSDQv9C+0LQg0LfQsNGJ0LjRgtC+0LlcIilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQktGLINC90LUg0LzQvtC20LXRgtC1INC30LDRidC40YnQsNGC0Ywg0YEg0YLQsNC60L7Qs9C+INGA0LDRgdGB0YLQvtGP0L3QuNGPXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB3ZWFrX3Nwb3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG5cclxuICB2YXIgaW50X2NoZWNrID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIGlmIChpbnRfY2hlY2sgPj0gd2Vha19zcG90X3RocmVzaG9sZCkge1xyXG4gICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgfVxyXG5cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGVhbChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGhlYWxfcmFuZ2UpKSB7XHJcblxyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIGhlYWxlcl9jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgdmFyIHRhcmdldF9ocCA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGFyZ2V0X2Z1bGxfaHAgPSBIUF92YWx1ZXNbdGFyZ2V0X2NoYXJhY3Rlci5zdGFtaW5hXVxyXG4gIHZhciByYXRpbyA9IHBhcnNlRmxvYXQodGFyZ2V0X2hwKS9wYXJzZUZsb2F0KHRhcmdldF9mdWxsX2hwKVxyXG5cclxuICB2YXIgaGVhbF9yb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGhlYWxlcl9jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIGlmIChoZWFsZXJfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcIm1lZFwiKSB7XHJcbiAgICBoZWFsX3JvbGwgPSBoZWFsX3JvbGwgKyBwYXJzZUludChoZWFsZXJfY2hhcmFjdGVyLmludGVsbGlnZW5jZSlcclxuICB9XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5oZWFsX3JvbGwgPSBoZWFsX3JvbGxcclxuXHJcbiAgdmFyIHRocmVzaG9sZCA9IDBcclxuICB2YXIgY3JpdGljYWxfdGhyZXNob2xkID0gMFxyXG5cclxuICBpZiAocmF0aW8gPiAwLjkpIHtcclxuICAgIHRocmVzaG9sZCA9IDEwXHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgdG9TZW5kLm5ld19ocCA9IHRhcmdldF9mdWxsX2hwXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuNzUpIHtcclxuICAgIHRocmVzaG9sZCA9IDE1XHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSAyNVxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IHRhcmdldF9mdWxsX2hwXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC45NSlcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjUpIHtcclxuICAgIHRocmVzaG9sZCA9IDIwXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSAyOVxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjk1KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuODIpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC4zKSB7XHJcbiAgICB0aHJlc2hvbGQgPSAyM1xyXG4gICAgY3JpdGljYWxfdGhyZXNob2xkID0gMzJcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgaWYgKGhlYWxfcm9sbCA+IGNyaXRpY2FsX3RocmVzaG9sZCAmJiBoZWFsZXJfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcIm1lZFwiKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImNyaXRpY2FsIHN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC44MilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjYyKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuMTUpIHtcclxuICAgIHRocmVzaG9sZCA9IDI2XHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSAzNVxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjYyKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNClcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjA1KSB7XHJcbiAgICB0aHJlc2hvbGQgPSAzMFxyXG4gICAgY3JpdGljYWxfdGhyZXNob2xkID0gNDBcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgaWYgKGhlYWxfcm9sbCA+IGNyaXRpY2FsX3RocmVzaG9sZCAmJiBoZWFsZXJfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcIm1lZFwiKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImNyaXRpY2FsIHN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC40KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuMjIpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gIH1cclxuXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCd0YPQttC90L4g0L/QvtC00L7QudGC0Lgg0LHQu9C40LbQtSDQuiDRhtC10LvQuCDRh9GC0L7QsdGLINCy0YvQu9C10YfQuNGC0YxcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJpZ19icm8oaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBiaWdfYnJvX3JhbmdlKSkge1xyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcblxyXG4gIHZhciBzaGllbGRfS0QgPSBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3VzZXJfY2hhcmFjdGVyX251bWJlcl0pXHJcbiAgdmFyIHRhcmdldF9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pXHJcblxyXG4gIHZhciBib251c19LRCA9IE1hdGgubWF4KHNoaWVsZF9LRCAtICB0YXJnZXRfS0QsIDApXHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQuYm9udXNfS0QgPSBib251c19LRFxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59IGVsc2Uge1xyXG4gIGFsZXJ0KFwi0JHQvtC70YzRiNC+0Lkg0LHRgNCw0YIg0L3QtSDQtNC+0YHRgtCw0LXRgiDQtNC+INC80LDQu9C+0LPQviFcIilcclxufVxyXG59XHJcblxyXG4vLyBpbmNyZWFzZSBhdHRhY2sgcm9sbCBieSBhZ2lsaXR5IGJvbnVzICgyKm1vZClcclxuZnVuY3Rpb24gY3V0X2xpbWJzKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGJvbnVzX2F0dGFjayA9IDIqcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5hZ2lsaXR5KSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3ZlcihpbmRleCwgdXNlcl9wb3NpdGlvbilcclxuICAgIHZhciB0b1NlbmQgPSBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbiwgYWNjdW11bGF0ZWRfY292ZXIpXHJcbiAgICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImZ1bGxfY3JpdFwiKSB7XHJcbiAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gdG9TZW5kLmRhbWFnZV9yb2xsXHJcbiAgICAgICAgdmFyIGZsYXRfZGFtYWdlID0gZGFtYWdlX3JvbGwgLSBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuc3RyZW5ndGgpXSAtIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIHZhciBmdWxsX2RhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgaWYgKGZsYXRfZGFtYWdlID4gZnVsbF9kYW1hZ2UvMykge1xyXG4gICAgICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIH0gIGVsc2Uge1xyXG4gICAgICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICAgIH1cclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCS0Ysg0L3QtSDQvNC+0LbQtdGC0LUg0L/QvtC00YDQtdC30LDRgtGMINGB0YPRhdC+0LbQuNC70YzRjyDRjdGC0LjQvCDQvtGA0YPQttC40LXQvFwiKVxyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBxdWlja19hdHRhY2soaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcbiAgaWYgKHdlYXBvbi5oYXNPd25Qcm9wZXJ0eShcInN1YnR5cGVcIikgJiYgd2VhcG9uLnN1YnR5cGUgPT0gXCJQUFwiKSB7XHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIoaW5kZXgsIHVzZXJfcG9zaXRpb24pXHJcbiAgICB2YXIgdG9TZW5kID0gZGFtYWdlX3NraWxsX3RlbXBsYXRlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCwgYm9udXNfYXR0YWNrLCB3ZWFwb24sIGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gICAgaWYgKHRvU2VuZCA9PSBudWxsKSB7XHJcbiAgICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IHRvU2VuZC5kYW1hZ2Vfcm9sbC8yOyAvLyDQsdGL0YHRgtGA0LDRjyDQsNGC0LDQutCwINC90LDQvdC+0YHQuNGCINC/0L7Qu9C+0LLQuNC90YMg0YPRgNC+0L3QsFxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JHRi9GB0YLRgNGD0Y4g0LDRgtCw0LrRgyDQvNC+0LbQvdC+INGB0L7QstC10YDRiNC40YLRjCDRgtC+0LvRjNC60L4g0L/QuNGB0YLQvtC70LXRgtC+0Lwt0L/Rg9C70LXQvNC10YLQvtC8XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwdW5jaF9yYWluZmFsbChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuICBpZiAod2VhcG9uLnR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgIHZhciB0YXJnZXRfY2hhcl9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyX2lkXVxyXG4gICAgdmFyIGJvbnVzX2F0dGFjayA9IHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuYWdpbGl0eSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgICB2YXIgdG90YWxfZGFtYWdlID0gMDtcclxuICAgIHZhciBhdHRhY2tzX3N1Y2Nlc3NmdWwgPSAwO1xyXG4gICAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKGluZGV4LCB1c2VyX3Bvc2l0aW9uKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl07IGkrKykge1xyXG4gICAgICB2YXIgdG9TZW5kID0gZGFtYWdlX3NraWxsX3RlbXBsYXRlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCwgYm9udXNfYXR0YWNrLCB3ZWFwb24sIGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gICAgICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICh0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJmdWxsX2NyaXRcIikge1xyXG4gICAgICAgICAgICBhdHRhY2tzX3N1Y2Nlc3NmdWwgPSBhdHRhY2tzX3N1Y2Nlc3NmdWwgKyAxO1xyXG4gICAgICAgICAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyB0b1NlbmQuZGFtYWdlX3JvbGw7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJfaWRdID0gMDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJldmFkZWRcIiAmJiB0YXJnZXRfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSAhPSBcInJvZ3VlXCIpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVt0YXJnZXRfY2hhcl9pZF0gPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG11bHRpcGx5ZXIgPSAxLjAgKyBwYXJzZUZsb2F0KGF0dGFja3Nfc3VjY2Vzc2Z1bCAtIDEpLzIuMFxyXG4gICAgdmFyIG1lc3NhZ2UgPSBcItCc0L3QvtC20LjRgtC10LvRjCDQs9GA0LDQtNCwINCx0YvQuzogXCIgKyBtdWx0aXBseWVyXHJcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxyXG4gICAgdmFyIGZpbmFsX2RhbWFnZSA9IHBhcnNlSW50KHBhcnNlRmxvYXQodG90YWxfZGFtYWdlKSptdWx0aXBseWVyKVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyX2lkXHJcbiAgICB0b1NlbmQudG90YWxfYXR0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB0b1NlbmQuc3VjY2Vzc2Z1bGxfYXR0YWNrcyA9IGF0dGFja3Nfc3VjY2Vzc2Z1bFxyXG4gICAgdG9TZW5kLmRhbWFnZSA9IGZpbmFsX2RhbWFnZVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCT0YDQsNC0INGD0LTQsNGA0L7QsiDQvNC+0LbQvdC+INGB0L7QstGA0LXRiNC40YLRjCDRgtC+0LvRjNC60L4g0YDRg9C60L7Qv9Cw0YjQvdGL0Lwg0L7RgNGD0LbQuNC10LwhXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG9ja193YXZlKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKGluZGV4LCB1c2VyX3Bvc2l0aW9uKTtcclxuICB2YXIgdG9TZW5kID0gZGFtYWdlX3NraWxsX3RlbXBsYXRlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCwgYm9udXNfYXR0YWNrLCB3ZWFwb24sIGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZXZvdXIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCAxKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciBzdGFja3MgPSAwXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgIHN0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLk1hcmt1c19zdGFja3NcclxuICAgIH1cclxuICAgIHZhciBkYW1hZ2UgPSBzdGFja3MqNSArIHJvbGxfeCgxMClcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWJzb2x1dGVfcmVjb3ZlcnkoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCAxKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciBoZWFsX2Ftb3VudCA9IDBcclxuXHJcbiAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW1hZ2VfZmllbGRcIik7XHJcbiAgICBpZiAoIShkYW1hZ2VfZmllbGQudmFsdWUgPT09IFwiXCIpKSB7XHJcbiAgICAgIGhlYWxfYW1vdW50ID0gcGFyc2VJbnQoZGFtYWdlX2ZpZWxkLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYmlvcG9vbCA9IDBcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJiaW9wb29sXCIpKSB7XHJcbiAgICAgIGJpb3Bvb2wgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uYmlvcG9vbFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChoZWFsX2Ftb3VudCA+IDAgJiYgYmlvcG9vbCA+PSBoZWFsX2Ftb3VudCkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLmhlYWxfYW1vdW50ID0gaGVhbF9hbW91bnRcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LXQstC+0LfQvNC+0LbQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQu9C10YfQtdC90LjRj1wiKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnYXNfYm9tYihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRocm93X3JhbmdlID0gZmluZFRocm93UmFuZ2UoY2hhcmFjdGVyKVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHRocm93X3JhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG4gICAgdG9TZW5kLnRocmVzaG9sZCA9IGdhc19ib21iX3RocmVzaG9sZFxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID09IDApIHsvLyDQsNC90LjQvNCw0YbQuNGPINGC0L7Qu9GM0LrQviDQsiDQv9GD0YHRgtGD0Y4g0LrQu9C10YLQutGDXHJcbiAgICAgIGFkZF9vYnN0YWNsZV9jb21tYW5kKGluZGV4LCBnYXNfYm9tYl9vYnN0YWNsZSlcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQnNCw0LvQviDQutCw0YjQuCDQtdC70Lgg0LTQu9GPINGC0LDQutC+0LPQviDQsdGA0L7RgdC60LBcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGluZ2FsYXRvcihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID09IDApIHsvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXRgtGB0Y8g0YLQvtC70YzQutC+INCyINC/0YPRgdGC0YPRjiDQutC70LXRgtC60YNcclxuICAgIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGNhbGluZ2FsYXRvcl9yYW5nZSkpIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgICBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgY2FsaW5nYWxhdG9yX29ic3RhY2xlKVxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0JrQsNC70YzQuNC90LPQsNC70LvRj9GC0L7RgCDQvNC+0LbQvdC+INGD0YHRgtCw0L3QvtCy0LjRgtGMINC70LjRiNGMINCyINC/0YDQtdC00LXQu9Cw0YUgMS41INC60LvQtdGC0LrQuCDQvtGCINCy0LDRgVwiKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCa0LDQu9GM0LjQvdCz0LDQu9C70Y/RgtC+0YAg0LzQvtC20L3QviDRg9GB0YLQsNC90L7QstC40YLRjCDQu9C40YjRjCDQsiDQv9GD0YHRgtGD0Y4g0LrQu9C10YLQutGDXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmdXNlX2xhbmRtaW5lKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBsYW5kbWluZV9kZXRlY3Rpb25fcmFkaXVzKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG4gICAgdG9TZW5kLm91dGNvbWUgPSBcImVtcHR5XCJcclxuXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluY2x1ZGVzKGluZGV4KSkge1xyXG4gICAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gICAgICBpZiAocm9sbCA+IGxhbmRtaW5lX2RpZmZ1c2VfdGhyZXNob2xkKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0KHQu9C40YjQutC+0Lwg0LTQsNC70LXQutC+INC00LvRjyDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQuNGPXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhY2lkX2JvbWIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0aHJvd19yYW5nZSA9IGZpbmRUaHJvd1JhbmdlKGNoYXJhY3RlcilcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB0aHJvd19yYW5nZSkpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCc0LDQu9C+INC60LDRiNC4INC10LvQuCDQtNC70Y8g0YLQsNC60L7Qs9C+INCx0YDQvtGB0LrQsFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlnaHRfc291bmRfYm9tYihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBsaWdodF9zb3VuZF9ib21iX3JhbmdlKSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG5cclxuICB2YXIgY2hhcmFjdGVyX2xpc3QgPSBbXVxyXG4gIHZhciBvdXRjb21lX2xpc3QgPSBbXVxyXG5cclxuICB2YXIgcmFkaXVzID0gbGlnaHRfc291bmRfYm9tYl9yYWRpdXNcclxuXHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhpbmRleCwgcmFkaXVzKVxyXG4gIGNvbnNvbGUubG9nKGNhbmRpZGF0ZV9jZWxscylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDQsdC+0LzQsdGLXHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgaWYgKGNoYXJhY3Rlci5zcGVjaWFsX3R5cGUgIT09IFwiZHJvbmVcIikge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9saXN0LnB1c2godGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgdmFyIHNhdmVfcm9sbCA9IHJvbGxfeCgyMCkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSArIHBhcnNlSW50KGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgaWYgKHNhdmVfcm9sbCA+IGxpZ2h0X3NvdW5kX2JvbWJfdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICBvdXRjb21lX2xpc3QucHVzaCgwKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvdXRjb21lX2xpc3QucHVzaCgxKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICB0b1NlbmQuY2hhcmFjdGVyX2xpc3QgPSBjaGFyYWN0ZXJfbGlzdFxyXG4gIHRvU2VuZC5vdXRjb21lX2xpc3QgPSBvdXRjb21lX2xpc3RcclxuXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQlNGA0L7QvSDQvdC1INC00L7QutC40L3QtdGCXCIpXHJcbn1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9yY2VfZmllbGQoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgZm9yY2VfZmllbGRfcmFuZ2UpKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcblxyXG4gIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgc2hpZWxkID0gTWF0aC5jZWlsKHBhcnNlRmxvYXQoSFBfdmFsdWVzW3VzZXIuc3RhbWluYV0pLzIpXHJcbiAgdG9TZW5kLnNoaWVsZCA9IHNoaWVsZFxyXG5cclxuICB2YXIgY2hhcmFjdGVyX2xpc3QgPSBbXVxyXG5cclxuICB2YXIgcmFkaXVzID0gZm9yY2VfZmllbGRfcmFkaXVzXHJcblxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhZGl1cylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDRidC40YLQsFxyXG4gICAgICAgIGNoYXJhY3Rlcl9saXN0LnB1c2godGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHRvU2VuZC5jZWxsc19wcm90ZWN0ZWQgPSBjYW5kaWRhdGVfY2VsbHNcclxuICB0b1NlbmQuY2hhcmFjdGVyX2xpc3QgPSBjaGFyYWN0ZXJfbGlzdFxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgZm9yY2VfZmllbGRfb2JzdGFjbGUpXHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQk9C10L3QtdGA0LDRgtC+0YAg0LTQvtC70LbQtdC9INCx0YvRgtGMINGD0YHRgtCw0L3QvtCy0LvQtdC9INC/0L7QsdC70LjQttC1XCIpXHJcbn1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRyZW5hbGluZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgdGFyZ2V0X251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIGFkcmVuYWxpbmVfcmFuZ2UgPSAxXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgYWRyZW5hbGluZV9yYW5nZSkpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pbmRleCA9IHRhcmdldF9udW1iZXJcclxuICAgIHZhciBleHRyYV9hY3Rpb25zID0gcm9sbF94KDQpXHJcbiAgICB2YXIgbWludXNfYWN0aW9ucyA9IHJvbGxfeCg0KVxyXG4gICAgdG9TZW5kLmV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zXHJcbiAgICB0b1NlbmQubWludXNfYWN0aW9ucyA9IG1pbnVzX2FjdGlvbnNcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwb2lzb25vdXNfYWRyZW5hbGluZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgdGFyZ2V0X251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgcG9pc29ub3VzX2FkcmVuYWxpbmVfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaW5kZXggPSB0YXJnZXRfbnVtYmVyXHJcbiAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IFtdXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaXNvbm91c19hZHJlbmFsaW5lX2R1cmF0aW9uOyBpKyspIHtcclxuICAgICAgZXh0cmFfYWN0aW9ucy5wdXNoKHJvbGxfeCg0KSlcclxuICAgIH1cclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0KDQsNC00LjRg9GBINCw0LTRgNC10L3QsNC70LjQvdCwIDEg0LrQu9C10YLQutCwIVwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGljaF9waWNoX2dvKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGFyZ2V0X251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9udW1iZXJdXHJcbiAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgPT0gXCJkcm9uZVwiKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaW5kZXggPSB0YXJnZXRfbnVtYmVyXHJcbiAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IE1hdGguY2VpbChwYXJzZUZsb2F0KHVzZXIuaW50ZWxsaWdlbmNlKS8yKVxyXG4gICAgdG9TZW5kLmV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQktGLINC90LUg0LzQvtC20LXRgtC1INC/0YvRiS3Qv9GL0Ykg0LrQvtCz0L4g0L/QvtC/0LDQu9C+IVwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbHVja3lfc2hvdChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnJvbGwgPSByb2xsX3goMTApXHJcbiAgICBpZiAodG9TZW5kLnJvbGwgPT0gNykge1xyXG4gICAgICB0b1NlbmQuZGFtYWdlID0gcm9sbF94KDcpXHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvdHRlcnlfc2hvdChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnJvbGwgPSByb2xsX3goMTAwKVxyXG4gICAgaWYgKHRvU2VuZC5yb2xsID09IDcpIHtcclxuICAgICAgdmFyIGRhbWFnZSA9IDBcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3goNylcclxuICAgICAgfVxyXG4gICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICB9IGVsc2UgaWYgKHRvU2VuZC5yb2xsID09IDc3KSB7XHJcbiAgICAgIHZhciBkYW1hZ2UgPSAwXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTQ7IGkrKykge1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCg3KVxyXG4gICAgICB9XHJcbiAgICAgIHRvU2VuZC5kYW1hZ2UgPSBkYW1hZ2VcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3VydmVkX2J1bGxldHMoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcbiAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIGJvbnVzX2F0dGFjayA9IHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhaW1cIikpIHtcclxuICAgIGJvbnVzX2F0dGFjayA9IGJvbnVzX2F0dGFjayArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKTtcclxuICB9XHJcbiAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKGluZGV4LCB1c2VyX3Bvc2l0aW9uKTtcclxuICBhY2N1bXVsYXRlZF9jb3ZlciA9IE1hdGgubWF4KHBhcnNlSW50KHBhcnNlRmxvYXQoYWNjdW11bGF0ZWRfY292ZXIpLzIpIC0gMiwgMClcclxuICB2YXIgdG9TZW5kID0gZGFtYWdlX3NraWxsX3RlbXBsYXRlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCwgYm9udXNfYXR0YWNrLCB3ZWFwb24sIGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7XHJcbiAgICAgIHRvU2VuZC5haW1fb3ZlciA9IDE7XHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGhlbHBlciBmdW5jdGlvbiBwYXR0ZXJuc1xyXG5mdW5jdGlvbiBjaGVja19jb29sZG93bihjaGFyYWN0ZXJfbnVtYmVyLCBlZmZlY3QsIG1lc3NhZ2UpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShlZmZlY3QpKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXVtlZmZlY3RdLmNvb2xkb3duID09IDApIHtcclxuICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl1bZWZmZWN0XVxyXG4gICAgICBpZiAobWVzc2FnZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdW2VmZmVjdF0uY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdW2VmZmVjdF0uY29vbGRvd24gLSAxXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyDQv9GA0L7QuiDQs9Cw0LfQvtCy0L7QuSDQs9GA0LDQvdCw0YLRi1xyXG5mdW5jdGlvbiBhcHBseV9ib21iKHBvc2l0aW9uLCByYWRpdXMpIHtcclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gaW5kZXhfaW5fcmFkaXVzKHBvc2l0aW9uLCByYWRpdXMpXHJcbiAgLy9jb25zb2xlLmxvZyhjYW5kaWRhdGVfY2VsbHMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0LHQvtC80LHRi1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9C+0L/QsNC00LDQtdGCINC/0L7QtCDQtNC10LnRgdGC0LLQuNC1INCz0LDQt9C+0LLQvtC5INCx0L7QvNCx0YtcIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImdhc19ib21iX3BvaXNvblwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsICsgMVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBnYXNfYm9tYl9wb2lzb25fb2JqZWN0ID0ge31cclxuICAgICAgICBnYXNfYm9tYl9wb2lzb25fb2JqZWN0LnBvaXNvbl9sZXZlbCA9IDFcclxuICAgICAgICBnYXNfYm9tYl9wb2lzb25fb2JqZWN0LnRocmVzaG9sZCA9IGdhc19ib21iX3RocmVzaG9sZFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmdhc19ib21iX3BvaXNvbiA9IGdhc19ib21iX3BvaXNvbl9vYmplY3RcclxuICAgICAgfVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdIC0gMVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSAtIDFcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5X2NhbGluZ2FsYXRvcihwb3NpdGlvbiwgcmFkaXVzLCBmbGF0X2hlYWwsIHJvbGxfaGVhbCkge1xyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMocG9zaXRpb24sIHJhZGl1cylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDQtNC70Y8g0L7RgtGF0LjQu9CwXHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIHJvbGxlZF9oZWFsID0gZmxhdF9oZWFsICsgcm9sbF94KHJvbGxfaGVhbCk7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPSBNYXRoLm1pbihjaGFyYWN0ZXJfc3RhdGUuSFBbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdICsgcm9sbGVkX2hlYWwsIEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pO1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQtNGL0YXQsNC10YIg0YbQtdC70LXQsdC90YvQtSDQv9Cw0YDRiyDQuCDQstC+0YHRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIgXCIgKyByb2xsZWRfaGVhbCArIFwiINGF0L8uXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlfYWNpZF9ib21iKHBvc2l0aW9uLCByYWRpdXMpIHtcclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gaW5kZXhfaW5fcmFkaXVzKHBvc2l0aW9uLCByYWRpdXMpXHJcbiAgLy9jb25zb2xlLmxvZyhjYW5kaWRhdGVfY2VsbHMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0LHQvtC80LHRi1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9C+0L/QsNC00LDQtdGCINC/0L7QtCDQtNC10LnRgdGC0LLQuNC1INC60LjRgdC70L7RgtC90L7QuSDQs9GA0LDQvdCw0YLRi1wiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWNpZF9ib21iX3BvaXNvblwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmFjaWRfYm9tYl9wb2lzb24uZHVyYXRpb24gPSBhY2lkX2JvbWJfZHVyYXRpb25cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgYWNpZF9ib21iX3BvaXNvbl9vYmplY3QgPSB7fVxyXG4gICAgICAgIGFjaWRfYm9tYl9wb2lzb25fb2JqZWN0LmR1cmF0aW9uID0gYWNpZF9ib21iX2R1cmF0aW9uXHJcbiAgICAgICAgdmFyIEtEX2NoYW5nZSA9IHBhcnNlSW50KGNoYXJhY3Rlcl9LRCh0YXJnZXRfY2hhcmFjdGVyX251bWJlcikvMilcclxuICAgICAgICBhY2lkX2JvbWJfcG9pc29uX29iamVjdC5ib251c19LRCA9IEtEX2NoYW5nZVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmFjaWRfYm9tYl9wb2lzb24gPSBhY2lkX2JvbWJfcG9pc29uX29iamVjdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdIC0gS0RfY2hhbmdlXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG9ja2VkX2VmZmVjdCh0YXJnZXQpIHtcclxuICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0XS5oYXNPd25Qcm9wZXJ0eShcInNob2NrZWRcIikpIHtcclxuICAgIHZhciBzaG9ja2VkX29iamVjdCA9IHt9XHJcbiAgICBzaG9ja2VkX29iamVjdC5jb29sZG93biA9IHNob2NrZWRfY29vbGRvd25cclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0XS5zaG9ja2VkID0gc2hvY2tlZF9vYmplY3RcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW3RhcmdldF0gPSBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVt0YXJnZXRdIC0gMVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uc2hvY2tlZC5jb29sZG93biA9IHNob2NrZWRfY29vbGRvd25cclxuICB9XHJcbn1cclxuXHJcbi8vIE1vcmUgZ20gY29udHJvbCBhY3Rpb25zXHJcblxyXG5mdW5jdGlvbiBtaXJyb3JfYm9hcmQoKSB7XHJcbiAgdmFyIGxlZnRfaW5kZXg7XHJcbiAgdmFyIHJpZ2h0X2luZGV4O1xyXG4gIHZhciB0ZW1wO1xyXG4gIHZhciBsZWZ0X2NlbGw7XHJcbiAgdmFyIHJpZ2h0X2NlbGw7XHJcbiAgZm9yIChsZXQgeSA9IDA7IHkgPCBnYW1lX3N0YXRlLnNpemU7IHkrKykge1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBnYW1lX3N0YXRlLnNpemUvMjsgeCsrKSB7XHJcblxyXG4gICAgICBsZWZ0X2luZGV4ID0geSpnYW1lX3N0YXRlLnNpemUgKyB4O1xyXG4gICAgICByaWdodF9pbmRleCA9IHkqZ2FtZV9zdGF0ZS5zaXplICsgcGFyc2VJbnQoZ2FtZV9zdGF0ZS5zaXplKSAtIHggLSAxO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCd5OiAnICsgeSArICcgeDogJyArIHggKyAnIGxlZnQgaW5kZXg6ICcgKyBsZWZ0X2luZGV4ICsgJyByaWdodCBpbmRleDogJyArIHJpZ2h0X2luZGV4KTtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2xlZnRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbcmlnaHRfaW5kZXhdID0gdGVtcDtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2xlZnRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbcmlnaHRfaW5kZXhdID0gdGVtcDtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICBsZWZ0X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgbGVmdF9pbmRleCk7XHJcbiAgICAgIHJpZ2h0X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgcmlnaHRfaW5kZXgpO1xyXG5cclxuICAgICAgdGVtcCA9IGxlZnRfY2VsbC5zcmM7XHJcbiAgICAgIGxlZnRfY2VsbC5zcmMgPSByaWdodF9jZWxsLnNyYztcclxuICAgICAgcmlnaHRfY2VsbC5zcmMgPSB0ZW1wO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3luY19ib2FyZCgpIHtcclxuICB2YXIgZnVsbF9nYW1lX3N0YXRlID0ge1xyXG4gICAgZ2FtZV9zdGF0ZTogZ2FtZV9zdGF0ZSxcclxuICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvOiBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyxcclxuICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm86IG9ic3RhY2xlX2RldGFpbGVkX2luZm8sXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGU6IGNoYXJhY3Rlcl9zdGF0ZVxyXG4gIH07XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdzeW5jX2JvYXJkJztcclxuICB0b1NlbmQuZnVsbF9nYW1lX3N0YXRlID0gZnVsbF9nYW1lX3N0YXRlO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dfbGFuZG1pbmVzKCkge1xyXG4gIHZhciBsYW5kbWluZXNfYXJyYXkgPSBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnNcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxhbmRtaW5lc19hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfbWluZSA9IGxhbmRtaW5lc19hcnJheVtpXVxyXG4gICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbY3VycmVudF9taW5lXS5pbmNsdWRlcyhteV9uYW1lKSkge1xyXG4gICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBjdXJyZW50X21pbmUpO1xyXG4gICAgICBjZWxsLnNyYyA9IFwiL2ltYWdlcy9sYW5kbWluZS5qZmlmXCJcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyX2NoYXJhY3Rlcl9zdGF0ZSgpIHtcclxuICBjaGFyYWN0ZXJfc3RhdGUgPSBDSEFSQUNURVJfU1RBVEVfQ09OU1RBTlRcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJfY2hhcmFjdGVyKG51bWJlcikge1xyXG4gIC8vY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuSFBbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tudW1iZXJdID0ge31cclxuICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtudW1iZXJdID0gbnVsbFxyXG59XHJcblxyXG5mdW5jdGlvbiB3X29uY2xpY2soKSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiIHx8IGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2NoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZF0gPT0gMSkge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9PSAxKSB7XHJcbiAgICAgIHVuZG9fc2VsZWN0aW9uKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBpbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gICAgICB2YXIgY2VsbCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2VsbFxyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYV9vbmNsaWNrKCkge1xyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIiB8fCBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRdID09IDEpIHtcclxuXHJcbiAgICBpZiAoY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID09IDIpIHtcclxuICAgICAgc3RvcF9hdHRhY2soKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICAgICAgdmFyIGNlbGwgPSBjaGFyYWN0ZXJfY2hvc2VuLmNlbGxcclxuICAgICAgdmFyIG1haW5fYWN0aW9uc19sZWZ0ID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIGlmIChtYWluX2FjdGlvbnNfbGVmdCA+IDApIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX2F0dGFjayhjZWxsKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0KMg0LLQsNGBINC90LUg0L7RgdGC0LDQu9C+0YHRjCDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wYXJlX2luaXRpYXRpdmUoYSxiKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2FdIDwgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbYl0pIHtcclxuICAgIHJldHVybiAxO1xyXG4gIH0gZWxzZSBpZiAoY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbYV0gPT0gY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbYl0pIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfVxyXG59XHJcblxyXG4vL3NvY2tldC5pbml0KCd3czovL2xvY2FsaG9zdDozMDAxJyk7XHJcbnNvY2tldC5pbml0KFNFUlZFUl9BRERSRVNTKTtcclxuXHJcbnNvY2tldC5yZWdpc3Rlck9wZW5IYW5kbGVyKCgpID0+IHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAncGxheWVyX2luZm8nO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvbGUgPSBteV9yb2xlO1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIHRvU2VuZC5wYXNzd29yZCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZ21fcGFzc3dvcmQnKSk7XHJcbiAgfVxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59KTtcclxuXHJcbnNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKChkYXRhKSA9PiB7XHJcbiAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICBpZiAoKChkYXRhLnRvX25hbWUgPT0gbXlfbmFtZSkgfHwgKGRhdGEudG9fbmFtZSA9PSAnYWxsJykpICYmIChkYXRhLnJvb21fbnVtYmVyID09IG15X3Jvb20pKSB7XHJcbiAgICBpZiAoZGF0YS5jb21tYW5kID09ICdwbGF5ZXJfaW5mb19yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuaXNWYWxpZCA9PSAwKSB7XHJcbiAgICAgICAgYWxlcnQoJ9Ci0LAg0LrQsNC60L7QuSDRgtGLINCz0LwnKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkYXRhLnJvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgIGNyZWF0ZV9ib2FyZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBsb2FkX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgcm9sbF9pbml0aWF0aXZlX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgZm9nX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfbmFtZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgYm9hcmRfc2l6ZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgbWlycm9yX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgbmV4dF9yb3VuZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIGJhdHRsZV9tb2RfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBzeW5jX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgc2F2ZXNfc2VsZWN0LnNob3coKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGU7XHJcbiAgICAgICAgICAgIC8vIHFcclxuICAgICAgICAgICAgaWYoa2V5Q29kZSA9PSA4MSkge1xyXG4gICAgICAgICAgICAgICAgZm9nTW9kZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT0gODcpIHsgLy8gd1xyXG4gICAgICAgICAgICAgIHdfb25jbGljaygpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PSA2NSkgeyAvLyBhXHJcbiAgICAgICAgICAgICAgYV9vbmNsaWNrKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0O1xyXG4gICAgICBncm91cF9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfZ3JvdXBfbGlzdDtcclxuICAgICAgb2JzdGFjbGVfbGlzdCA9IGRhdGEub2JzdGFjbGVfbGlzdDtcclxuICAgICAgd2VhcG9uX2xpc3QgPSBkYXRhLndlYXBvbl9saXN0XHJcbiAgICAgIHdlYXBvbl9kZXRhaWxlZF9pbmZvID0gZGF0YS53ZWFwb25fZGV0YWlsZWRfaW5mb1xyXG4gICAgICBza2lsbF9kZXRhaWxlZF9pbmZvID0gZGF0YS5za2lsbF9kZXRhaWxlZF9pbmZvXHJcbiAgICAgIHNraWxsX2xpc3QgPSBkYXRhLnNraWxsX2xpc3RcclxuICAgICAgc2F2ZXNfbGlzdCA9IGRhdGEuc2F2ZXNfbGlzdFxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzYXZlc19saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gJChcIjxvcHRpb24+XCIpO1xyXG4gICAgICAgIGN1cnJlbnRfb3B0aW9uLnRleHQoc2F2ZXNfbGlzdFtpXSk7XHJcbiAgICAgICAgY3VycmVudF9vcHRpb24udmFsKHNhdmVzX2xpc3RbaV0pO1xyXG4gICAgICAgIHNhdmVzX3NlbGVjdC5hcHBlbmQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NvbnN0cnVjdF9ib2FyZF9yZXNwb25zZScpIHtcclxuICAgICAgY2xlYXJfY2hhcmFjdGVyX3N0YXRlKClcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGRhdGEuZ2FtZV9zdGF0ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmNlbGxfaWRdID0gZGF0YS5jaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gZGF0YS5jaGFyYWN0ZXJfaW5mbztcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3RlcjtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZGF0YS5jZWxsX2lkXSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGRhdGEuY2VsbF9pZCk7XHJcbiAgICAgICAgY2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZGF0YS5jaGFyYWN0ZXJfbnVtYmVyKTtcclxuICAgICAgfVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV07XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV07XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGJvbnVzX2FjdGlvbl9tYXBbY2hhcmFjdGVyLmFnaWxpdHldO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IG1haW5fYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcbiAgICAgIGFzc2lnbl9tb3ZlcyhkYXRhLmNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyLmFnaWxpdHk7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlci5LRF9wb2ludHM7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDA7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IFwiYWxsXCI7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyLmludmVudG9yeVswXVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHt9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gZGF0YS5jZWxsX2lkO1xyXG4gICAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwiZXZhZGVfYm9udXNcIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHBhcnNlSW50KGNoYXJhY3Rlci5ldmFkZV9ib251cyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwibWVsZWVfcmVzaXN0XCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX3Jlc2lzdFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gcGFyc2VGbG9hdChjaGFyYWN0ZXIubWVsZWVfcmVzaXN0KS8xMDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX3Jlc2lzdFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMC4wO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwiYnVsbGV0X3Jlc2lzdFwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5idWxsZXRfcmVzaXN0W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUZsb2F0KGNoYXJhY3Rlci5idWxsZXRfcmVzaXN0KS8xMDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJ1bGxldF9yZXNpc3RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDAuMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8g0LDQutGC0LjQstCw0YbQuNGPINC/0LDRgdGB0LjQstC+0LpcclxuICAgICAgaWYgKGNoYXJhY3Rlci5oYXNPd25Qcm9wZXJ0eShcImFkYXB0aXZlX2ZpZ2h0aW5nXCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gLTE7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2FkZF9vYnN0YWNsZV9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIG9ic3RhY2xlID0gZGF0YS5vYnN0YWNsZV9pbmZvO1xyXG4gICAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW2RhdGEub2JzdGFjbGVfbnVtYmVyXSA9IG9ic3RhY2xlO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtkYXRhLmNlbGxfaWRdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZGF0YS5jZWxsX2lkKTtcclxuICAgICAgICBjZWxsLnNyYyA9IG9ic3RhY2xlLmF2YXRhcjtcclxuICAgICAgfVxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBkYXRhLm9ic3RhY2xlX251bWJlciAqICgtMSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbW92ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciB0b19pbmRleCA9IGRhdGEudG9faW5kZXg7XHJcbiAgICAgIHZhciBmcm9tX2luZGV4ID0gZGF0YS5mcm9tX2luZGV4O1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3RvX2luZGV4XSA9IGRhdGEuY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSB0b19pbmRleDtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5pbnZpc2liaWxpdHlfZW5kZWRfaWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgaWQgPSBkYXRhLmludmlzaWJpbGl0eV9lbmRlZF9pZFtpXTtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2lkXSA9IFwiYWxsXCI7XHJcblxyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltpZF07XHJcbiAgICAgICAgdmFyIHRvX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgcG9zaXRpb24pO1xyXG4gICAgICAgIHZhciBhdmF0YXIgPSBnZXRfb2JqZWN0X3BpY3R1cmUoaWQpO1xyXG4gICAgICAgIHRvX2NlbGwuc3JjID0gYXZhdGFyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgICAgaWYgKCFjaGFyYWN0ZXIuaGFzT3duUHJvcGVydHkoXCJsYW5kbWluZV9pbW11bmVcIikpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubWluZXNfZXhwbG9kZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHZhciBtaW5lX3Bvc2l0aW9uID0gZGF0YS5taW5lc19leHBsb2RlZFtpXVxyXG4gICAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgbWluZV9wb3NpdGlvbik7XHJcbiAgICAgICAgICBjZWxsLnNyYyA9IGZvZ09yUGljKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICB2YXIgaW5kZXggPSBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5kZXhPZihtaW5lX3Bvc2l0aW9uKVxyXG4gICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLnNwbGljZShpbmRleCwxKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1ttaW5lX3Bvc2l0aW9uXSA9IFtdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5taW5lc19kYW1hZ2UgPiAwKSB7XHJcbiAgICAgICAgICBleHBsb3Npb25fYXVkaW8ucGxheSgpO1xyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEuY2hhcmFjdGVyX251bWJlciwgZGF0YS5taW5lc19kYW1hZ2UpXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC00YDRi9Cy0LDQtdGC0YHRjyDQvdCwINC80LjQvdCw0YUg0L/QvtC70YPRh9Cw0Y8gXCIgKyBkYXRhLm1pbmVzX2RhbWFnZSArIFwiINGD0YDQvtC90LBcIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHJlbW92ZSBzaGllbGRlZCBwcm9wZXJ0eSBmcm9tIGNoYXJhY3RlciBhbmQgcmVtb3ZlIGNoYXJhY3RlciBmcm9tIHNoaWVsZGVkIGxpc3RcclxuICAgICAgaWYgKGRhdGEubGVmdF9zaGllbGQgPT0gMSkge1xyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uZm9yY2VfZmllbGRfdGFyZ2V0XHJcbiAgICAgICAgdmFyIGluZGV4ID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbZGF0YS5zaGllbGRfaW5kZXhdLmNoYXJhY3Rlcl9saXN0LmluZGV4T2YoZGF0YS5jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2RhdGEuc2hpZWxkX2luZGV4XS5jaGFyYWN0ZXJfbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMTtcclxuXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gc3RhbWluYV9tb3ZlX2Nvc3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gcGFyc2VGbG9hdChkYXRhLmRpc3RhbmNlKVxyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJzbmlwZXJcIikge1xyXG4gICAgICAgICAgdmFyIGVmZmVjdHNfb2JqZWN0ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICBpZiAoZWZmZWN0c19vYmplY3QuaGFzT3duUHJvcGVydHkoXCJzbmlwZXJfcGFzc2l2ZVwiKSkge1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudF9hdHRhY2tfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRfZGFtYWdlX2JvbnVzID0gZWZmZWN0c19vYmplY3Quc25pcGVyX3Bhc3NpdmUuZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIGN1cnJlbnRfYXR0YWNrX2JvbnVzIC0gNVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBjdXJyZW50X2RhbWFnZV9ib251c1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUuYXR0YWNrX2JvbnVzID0gLTVcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdLnNuaXBlcl9wYXNzaXZlLmRhbWFnZV9ib251cyA9IDBcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBzbmlwZXJfcGFzc2l2ZV9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuYXR0YWNrX2JvbnVzID0gLTVcclxuICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmRhbWFnZV9ib251cyA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdLnNuaXBlcl9wYXNzaXZlID0gc25pcGVyX3Bhc3NpdmVfb2JqZWN0XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIDVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghKCgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVt0b19pbmRleF0gPT0gMSkpIHx8IChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gIT0gXCJhbGxcIiAmJiBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gIT0gbXlfbmFtZSkpKSB7XHJcbiAgICAgICAgdmFyIHRvX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgdG9faW5kZXgpO1xyXG4gICAgICAgIHRvX2NlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKGRhdGEuY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtmcm9tX2luZGV4XSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBmcm9tX2luZGV4KTtcclxuICAgICAgICBvbGRfY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlbGV0ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiY2hhcmFjdGVyX251bWJlclwiKSkge1xyXG4gICAgICAgIGNsZWFyX2NoYXJhY3RlcihkYXRhLmNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgIH1cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmluZGV4XSA9IDA7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuaW5kZXhdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEuaW5kZXgpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdyb2xsX2luaXRpYXRpdmVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlID0gZGF0YS5pbml0aWF0aXZlX3N0YXRlO1xyXG4gICAgICB2YXIgb3JkZXJlZF9hcnJheSA9IFtdXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLkhQW2ldID4gMCkgey8vIGNoYXJhY3RlciBpcyBwcmVzZW50XHJcbiAgICAgICAgICBvcmRlcmVkX2FycmF5LnB1c2goaSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgb3JkZXJlZF9hcnJheS5zb3J0KGNvbXBhcmVfaW5pdGlhdGl2ZSk7XHJcbiAgICAgIGluaXRpYXRpdmVfb3JkZXJfY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmRlcmVkX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW29yZGVyZWRfYXJyYXlbaV1dXHJcbiAgICAgICAgdmFyIHF1ZXJ5X3N0cmluZyA9ICc8aW1nPiBpZD1cImluaXRpYXRpdmVfaW1hZ2VfJyArIGkgKyAnXCInXHJcbiAgICAgICAgdmFyIGltZyA9ICQocXVlcnlfc3RyaW5nKVxyXG4gICAgICAgIGltZy5hdHRyKCdzcmMnLCBjaGFyYWN0ZXIuYXZhdGFyKTtcclxuICAgICAgICBpbWcuYXR0cignaGVpZ2h0JywgJzUwcHgnKTtcclxuICAgICAgICBpbWcuYXR0cignd2lkdGgnLCAnNTBweCcpO1xyXG4gICAgICAgIGltZy5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBwb3NpdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltvcmRlcmVkX2FycmF5W2ldXVxyXG4gICAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgcG9zaXRpb24pO1xyXG4gICAgICAgICAgLy9zZWxlY3RfY2hhcmFjdGVyKHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgbm9fc2hpZnRfb25jbGljayhteV9yb2xlLCBnbV9jb250cm9sX21vZCwgZ2FtZV9zdGF0ZSwgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzLCBjZWxsLCBwb3NpdGlvbilcclxuICAgICAgICB9KVxyXG4gICAgICAgIGltZy5hcHBlbmRUbyhpbml0aWF0aXZlX29yZGVyX2NvbnRhaW5lcik7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlYWxfZGFtYWdlX3Jlc3BvbnNlJykge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gZGF0YS5kYW1hZ2U7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2F2ZV9nYW1lX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICBhbGVydCgnR2FtZSAnICsgZGF0YS5zYXZlX25hbWUgKyAnIHNhdmVkIHN1Y2Nlc2Z1bGx5Jyk7XHJcbiAgICAgICAgc2F2ZXNfbGlzdC5wdXNoKGRhdGEuc2F2ZV9uYW1lKTtcclxuICAgICAgICB2YXIgY3VycmVudF9vcHRpb24gPSAkKFwiPG9wdGlvbj5cIik7XHJcbiAgICAgICAgY3VycmVudF9vcHRpb24udGV4dChkYXRhLnNhdmVfbmFtZSk7XHJcbiAgICAgICAgY3VycmVudF9vcHRpb24udmFsKGRhdGEuc2F2ZV9uYW1lKTtcclxuICAgICAgICBzYXZlc19zZWxlY3QuYXBwZW5kKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydCgnR2FtZSB3aXRoIG5hbWUgJyArIGRhdGEuc2F2ZV9uYW1lICsgJyBhbHJlYWR5IGV4aXN0IScpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbG9hZF9nYW1lX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICB2YXIgZnVsbF9nYW1lX3N0YXRlID0gZGF0YS5mdWxsX2dhbWVfc3RhdGU7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlID0gZnVsbF9nYW1lX3N0YXRlLmNoYXJhY3Rlcl9zdGF0ZTtcclxuICAgICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbztcclxuICAgICAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gZnVsbF9nYW1lX3N0YXRlLm9ic3RhY2xlX2RldGFpbGVkX2luZm87XHJcbiAgICAgICAgY29uc3RydWN0X2JvYXJkKGZ1bGxfZ2FtZV9zdGF0ZS5nYW1lX3N0YXRlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydCgnRmFpbGVkIHRvIGxvYWQgZ2FtZSAnICsgZGF0YS5zYXZlX25hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc3luY19ib2FyZF9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IGRhdGEuZnVsbF9nYW1lX3N0YXRlO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX3N0YXRlO1xyXG4gICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbztcclxuICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5vYnN0YWNsZV9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICBjb25zdHJ1Y3RfYm9hcmQoZnVsbF9nYW1lX3N0YXRlLmdhbWVfc3RhdGUpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3VwZGF0ZV9mb2dfcmVzcG9uc2UnKSB7XHJcblx0XHRcdFx0dmFyIGluZGV4ID0gZGF0YS5pbmRleDtcclxuXHRcdFx0XHR2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBpbmRleCk7XHJcblx0XHRcdFx0aWYgKGRhdGEudXBkYXRlX3R5cGUgPT0gJ3JlbW92ZScpIHtcclxuXHRcdFx0XHRcdGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9IDA7XHJcblx0XHRcdFx0XHRjZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9IDE7XHJcblx0XHRcdFx0XHRjZWxsLnNyYyA9IEZPR19JTUFHRTtcclxuXHRcdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYXNzaWduX3pvbmVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBpbmRleF9saXN0ID0gZGF0YS5pbmRleF9saXN0XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF9saXN0W2ldXSA9IGRhdGEuem9uZV9udW1iZXI7XHJcbiAgICAgICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaW5kZXhfbGlzdFtpXV0gPSBkYXRhLm1vZGlmaWNhdG9yO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X3Jlc3BvbnNlJykge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gZGF0YS5uZXdfdmFsdWU7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2ltcGxlX3JvbGxfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5jaGFyYWN0ZXJfbmFtZSArIFwiINCx0YDQvtGB0LDQtdGCIFwiICsgZGF0YS5yb2xsXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdza2lsbF9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIHVzZXJfaW5kZXggPSBkYXRhLnVzZXJfaW5kZXhcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFt1c2VyX2luZGV4XSA9IDFcclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJhaW1fb3ZlclwiKSkge1xyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFpbVxyXG4gICAgICB9XHJcbiAgICAgIHN3aXRjaChkYXRhLnNraWxsX2luZGV4KSB7XHJcbiAgICAgICAgY2FzZSAwOiAvLyDRgNGL0LLQvtC6XHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIHZhciBjaGFyZ2VfbW92ZV9pbmNyZWFzZSA9IHBhcnNlSW50KGNoYXJhY3Rlci5hZ2lsaXR5KVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3VzZXJfaW5kZXhdICsgY2hhcmdlX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgdmFyIGNoYXJnZV91c2VyX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIGNoYXJnZV91c2VyX29iamVjdC5jb29sZG93biA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5jaGFyZ2VfdXNlciA9IGNoYXJnZV91c2VyX29iamVjdFxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvtCy0LXRgNGI0LDQtdGCINGA0YvQstC+0LpcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOiAvLyDQv9GA0LjQu9C40LIg0LDQtNGA0LXQvdCw0LvQuNC90LBcclxuICAgICAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0X2luZGV4ID0gZGF0YS50YXJnZXRfaW5kZXhcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pbmRleF1cclxuICAgICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3RhcmdldF9pbmRleF0gLSBhZHJlbmFsaW5lX3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0ID0ge31cclxuICAgICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0Lm1pbnVzX2FjdGlvbnMgPSBkYXRhLm1pbnVzX2FjdGlvbnNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaW5kZXhdLmFkcmVuYWxpbmVfdGFyZ2V0ID0gYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0XHJcblxyXG4gICAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBhZHJlbmFsaW5lX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWRyZW5hbGluZV91c2VyID0gYWRyZW5hbGluZV9vYmplY3RfdXNlclxyXG5cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQv9GA0LjQu9C40LIg0LDQtNGA0LXQvdCw0LvQuNC90LAuIFwiICArIHRhcmdldC5uYW1lICsgXCIg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9ucyArIFwiINC00LXQudGB0YLQstC40LkuINCt0YLQviDQsdGD0LTQtdGCINGB0YLQvtC40YLRjCBcIiArIGRhdGEubWludXNfYWN0aW9ucyArIFwiINC00LXQudGB0YLQstC40Lkg0L3QsCDRgdC70LXQtNGD0Y7RidC40Lkg0YXQvtC0LlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6IC8vINC/0L7QtNGA0LXQt9Cw0L3QuNC1INGB0YPRhdC+0LbQuNC70LjQuVxyXG4gICAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBzdGFtaW5hX2N1dF9saW1iX2Nvc3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGN1dF9saW1iX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIGN1dF9saW1iX29iamVjdC5jb29sZG93biA9IGN1dF9saW1iX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uY3V0X2xpbWJfdXNlciA9IGN1dF9saW1iX29iamVjdFxyXG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQtdGC0YHRjyDQv9C+0LTRgNC10LfQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji5cIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQtdGC0YHRjyDQv9C+0LTRgNC10LfQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLlwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnNraWxsX291dGNvbWUgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGxpbWJfY3V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgIGxpbWJfY3V0X29iamVjdC5kdXJhdGlvbiA9IGN1dF9saW1iX2R1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmN1dF9saW1iID0gbGltYl9jdXRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAtMTBcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L/QvtC00YDQtdC30LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCx0LXQt9GD0YHQv9C10YjQvdC+INC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc2tpbGxfb3V0Y29tZSA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbGltYl9jdXRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgICAgbGltYl9jdXRfb2JqZWN0LmR1cmF0aW9uID0gY3V0X2xpbWJfZHVyYXRpb25cclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uY3V0X2xpbWIgPSBsaW1iX2N1dF9vYmplY3RcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IC0xMFxyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQv9C+0LTRgNC10LfQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCx0LXQt9GD0YHQv9C10YjQvdC+INC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICAgICAgdmFyIGxpbWJfY3V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgbGltYl9jdXRfb2JqZWN0LmR1cmF0aW9uID0gY3V0X2xpbWJfZHVyYXRpb24gKyAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uY3V0X2xpbWIgPSBsaW1iX2N1dF9vYmplY3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gLTEwXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0L/QvtC00YDQtdC30LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdC+INGC0L7RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOiAvLyDRgdC70LDQsdC+0LUg0LzQtdGB0YLQvlxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHN0YW1pbmFfd2Vha3Nwb3RfY29zdFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGRhdGEub3V0Y29tZSA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICB2YXIgd2Vha3Nwb3Rfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgd2Vha3Nwb3Rfb2JqZWN0Lmh1bnRlcl9pZCA9IHVzZXJfaW5kZXhcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ud2Vha3Nwb3QgPSB3ZWFrc3BvdF9vYmplY3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L7QsdC90LDRgNGD0LbQuNC7INGB0LvQsNCx0L7QtSDQvNC10YHRgtC+IFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC90LUg0YPQtNCw0LvQvtGB0Ywg0L7QsdC90LDRgNGD0LbQuNGC0Ywg0YHQu9Cw0LHQvtC1INC80LXRgdGC0L4gXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgNDogLy8g0LvQtdGH0LXQvdC40LVcclxuICAgICAgICB2YXIgaGVhbGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgdmFyIGNvb2xkb3duID0gMFxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVt1c2VyX2luZGV4XSA+IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2RhdGEudGFyZ2V0X2lkXSkge1xyXG4gICAgICAgICAgLy8g0L/QsNGG0LjQtdC90YIg0L3QtSDRhdC+0LTQuNGCINCyINGN0YLQvtGCINC20LUg0YXQvtC0XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXS8yXHJcbiAgICAgICAgICBjb29sZG93biA9IDBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29vbGRvd24gPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBoZWFsZWRfb2JqZWN0ID0ge31cclxuICAgICAgICBoZWFsZWRfb2JqZWN0LmNvb2xkb3duID0gY29vbGRvd25cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5oZWFsZWQgPSBoZWFsZWRfb2JqZWN0XHJcbiAgICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiZmFpbFwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQoyBcIiArIGhlYWxlci5uYW1lICsgXCIg0L3QtSDQv9C+0LvRg9GH0LjQu9C+0YHRjCDQstGL0LvQtdGH0LjRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmhlYWxfcm9sbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic3VjY2Vzc1wiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQoyBcIiArIGhlYWxlci5uYW1lICsgXCIg0L/QvtC70YPRh9C40LvQvtGB0Ywg0YPRgdC/0LXRiNC90L4g0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gZGF0YS5uZXdfaHBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNyaXRpY2FsIHN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC/0L7Qu9GD0YfQuNC70L7RgdGMINC60YDQuNGC0LjRh9C10YHQutC4ICgyINGB0YLQtdC/0LXQvdC4KSDQstGL0LvQtdGH0LjRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmhlYWxfcm9sbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBkYXRhLm5ld19ocFxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0J7RiNC40LHQutCwINC/0YDQuCDRgNCw0LfQsdC+0YDQtSDQvtGC0YXQuNC70LBcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTogLy8g0LHQvtC70YzRiNC+0Lkg0LHRgNCw0YJcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIHZhciBzaGllbGQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaGllbGQubmFtZSArIFwiINC30LDRidC40YLQuNC7IFwiICsgIHRhcmdldC5uYW1lICsgXCIgKCtcIiArIGRhdGEuYm9udXNfS0QgKyBcItC60LQpXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbZGF0YS50YXJnZXRfaWRdICsgZGF0YS5ib251c19LRFxyXG4gICAgICAgICAgdmFyIGJpZ19icm9fb2JqZWN0ID0ge31cclxuICAgICAgICAgIGJpZ19icm9fb2JqZWN0LmNvb2xkb3duID0gY29vbGRvd25fYmlnX2Jyb1xyXG4gICAgICAgICAgYmlnX2Jyb19vYmplY3QuYm9udXNfS0QgPSBkYXRhLmJvbnVzX0tEXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5iaWdfYnJvID0gYmlnX2Jyb19vYmplY3RcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNjogLy8g0L/QvtC00L3Rj9GC0Ywg0YnQuNGC0YtcclxuICAgICAgICAgIHZhciBzaGllbGQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgaWYgKGRhdGEub3V0Y29tZSA9PSBcInNoaWVsZF91cFwiKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3VzZXJfaW5kZXhdICsgc2hpZWxkX3VwX0tEXHJcbiAgICAgICAgICAgIHZhciBzaGllbGRfdXBfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgc2hpZWxkX3VwX29iamVjdC5zdGFtaW5hX2Nvc3QgPSBzaGllbGRfdXBfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIHNoaWVsZF91cF9vYmplY3QuS0QgPSBzaGllbGRfdXBfS0RcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5zaGllbGRfdXAgPSBzaGllbGRfdXBfb2JqZWN0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQv9C+0LTQvdGP0Lsg0YnQuNGC0Ysg0LfQsCDRh9Cw0YJcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gLSBzaGllbGRfdXBfS0RcclxuICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uc2hpZWxkX3VwXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQvtC/0YPRgdGC0LjQuyDRidC40YIuINCn0LDRgiDQv9GA0L7RgdGC0LgoXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OiAvLyDQv9C+0LbQuNGA0LDQvdC40LUg0YHRg9GJ0L3QvtGB0YLQuFxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdIC0gZGF0YS5kYW1hZ2VcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5oYXNPd25Qcm9wZXJ0eShcIk1hcmt1c19zdGFja3NcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uTWFya3VzX3N0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLk1hcmt1c19zdGFja3MgKyAyXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5NYXJrdXNfc3RhY2tzID0gMlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uaGFzT3duUHJvcGVydHkoXCJiaW9wb29sXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCArIGRhdGEuZGFtYWdlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgPSBkYXRhLmRhbWFnZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L3QsNC90L7RgdC40YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwINC+0YIg0LrQvtGC0L7RgNC+0LPQviDQvdC10LLQvtC30LzQvtC20L3QviDRg9Cy0LXRgNC90YPRgtGM0YHRj1wiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDk6IC8vINCw0LHRgdC+0LvRjtGC0L3QvtC1INCy0L7RgdGB0YLQsNC90L7QstC70LXQvdC40LVcclxuICAgICAgICAgIHZhciBoZWFsZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gMVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdICsgZGF0YS5oZWFsX2Ftb3VudFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sIC0gZGF0YS5oZWFsX2Ftb3VudFxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBoZWFsZXIubmFtZSArIFwiINCy0L7RgdGB0YLQsNC90LDQu9C40LLQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIFwiICsgZGF0YS5oZWFsX2Ftb3VudCArIFwiINGF0L9cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMDogLy8g0L/QvtC70YPRh9C40YLRjCDQsdC+0L3Rg9GBXHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gKyAxXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvNC10L3Rj9C10YIg0L7QsdGL0YfQvdC+0LUg0L3QsCDQsdC+0L3Rg9GB0L3QvtC1INC00LXQudGB0YLQstC40LVcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTE6IC8vINC+0YLQtNGL0YVcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gZGF0YS5uZXdfc3RhbWluYVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L7RgtC00YvRhdCw0LXRgi4g0KXQvtGA0L7RiNC10LPQviDQvtGC0L/Rg9GB0LrQsCFcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDEyOiAvLyDQs9Cw0LfQvtCy0LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gZ2FzX2JvbWJfc3RhbWluYV9jb3N0XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LHRgNC+0YHQsNC10YIg0LPQsNC30L7QstGD0Y4g0LHQvtC80LHRgy4g0KHQvtCy0LXRgtGD0LXQvCDQt9Cw0LTQtdGA0LbQsNGC0Ywg0LTRi9GF0LDQvdC40LUuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgICAgdmFyIGJvbWJfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgYm9tYl9vYmplY3QudHlwZSA9IFwiZ2FzX2JvbWJcIlxyXG4gICAgICAgICAgICBib21iX29iamVjdC5wb3NpdGlvbiA9IGRhdGEucG9zaXRpb25cclxuICAgICAgICAgICAgYm9tYl9vYmplY3QudGhyZXNob2xkID0gZGF0YS50aHJlc2hvbGRcclxuICAgICAgICAgICAgYm9tYl9vYmplY3QucmFkaXVzID0gM1xyXG4gICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5wdXNoKGJvbWJfb2JqZWN0KVxyXG5cclxuICAgICAgICAgICAgdmFyIGdhc19ib21iX3VzZXIgPSB7fVxyXG4gICAgICAgICAgICBnYXNfYm9tYl91c2VyLmNvb2xkb3duID0gZ2FzX2JvbWJfc2tpbGxfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5nYXNfYm9tYl91c2VyID0gZ2FzX2JvbWJfdXNlclxyXG5cclxuICAgICAgICAgICAgdmFyIGluaXRpYWxfcmFkaXVzID0gMlxyXG5cclxuICAgICAgICAgICAgYXBwbHlfYm9tYihkYXRhLnBvc2l0aW9uLCBpbml0aWFsX3JhZGl1cylcclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDEzOiAvLyDRgdCy0LXRgtC+0YjRg9C80L7QstCw0Y8g0LPRgNCw0L3QsNGCXHJcbiAgICAgICAgICAgIHZhciBsaWdodF9zb3VuZF9ib21iX3VzZXIgPSB7fVxyXG4gICAgICAgICAgICBsaWdodF9zb3VuZF9ib21iX3VzZXIuY29vbGRvd24gPSBsaWdodF9zb3VuZF9ib21iX3NraWxsX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ubGlnaHRfc291bmRfYm9tYl91c2VyID0gbGlnaHRfc291bmRfYm9tYl91c2VyXHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEub3V0Y29tZV9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBkYXRhLmNoYXJhY3Rlcl9saXN0W2ldXHJcbiAgICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICAgICAgaWYgKGRhdGEub3V0Y29tZV9saXN0W2ldID09IDApIHsgLy8g0J/RgNC+0YjQtdC7INGB0L/QsNGB0LHRgNC+0YHQvtC6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YPRgdC/0LXQuyDQv9GA0LjQutGA0YvRgtGMINCz0LvQsNC30LBcIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L7RgdC70LXQvyDQvdCwIDIg0YXQvtC00LBcIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJibGluZFwiKSkgey8vINC90LUg0L3QsNC60LvQsNC00YvQstCy0LDQtdC8INC10YnQtSDRiNGC0YDQsNGEXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uYmxpbmQuY29vbGRvd24gPSAyXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgYmxpbmRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgICAgYmxpbmRfb2JqZWN0LmNvb2xkb3duID0gMlxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmJsaW5kID0gYmxpbmRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gLSAyXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdIC0gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxNDogLy8g0YjQvtC60LjRgNC+0LLQsNGC0YwgKNC00YDQvtC9ICsg0YPRj9C30LLQuNC80L7RgdGC0YwpXHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlICE9ICdyb2d1ZScpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgIHNob2NrZWRfZWZmZWN0KGRhdGEudGFyZ2V0X2lkKVxyXG5cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YHRgtGA0LXQu9GP0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjyDQuCDRiNC+0LrQuNGA0YPQtdGCINGG0LXQu9GMICjRg9GP0LfQstC40LzQvtGB0YLRjCkuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgIHNob2NrZWRfZWZmZWN0KGRhdGEudGFyZ2V0X2lkKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKSDQuCDRiNC+0LrQuNGA0YPQtdGCINGG0LXQu9GMICjRg9GP0LfQstC40LzQvtGB0YLRjCkuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgIHNob2NrZWRfZWZmZWN0KGRhdGEudGFyZ2V0X2lkKVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0L/QvtC/0LDQtNCw0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPINC4INGI0L7QutC40YDRg9C10YIg0YbQtdC70YwuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0YjQvtC60LjRgNC+0LLQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90L4g0YLQvtGCINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTU6IC8vINC/0YvRiSDQv9GL0Ykg0LPQvtGDXHJcbiAgICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0X2luZGV4ID0gZGF0YS50YXJnZXRfaW5kZXhcclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIHBpY2hfcGljaF9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBwaWNoX3BpY2hfb2JqZWN0X3RhcmdldCA9IHt9XHJcbiAgICAgICAgICBwaWNoX3BpY2hfb2JqZWN0X3RhcmdldC5leHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pbmRleF0ucGljaF9waWNoX3RhcmdldCA9IHBpY2hfcGljaF9vYmplY3RfdGFyZ2V0XHJcblxyXG4gICAgICAgICAgdmFyIHBpY2hfcGljaF9vYmplY3RfdXNlciA9IHt9XHJcbiAgICAgICAgICBwaWNoX3BpY2hfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBwaWNoX3BpY2hfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ucGljaF9waWNoX3VzZXIgPSBwaWNoX3BpY2hfb2JqZWN0X3VzZXJcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINCf0YvRiS3Qn9GL0Ykt0JPQvtGDLiBcIiAgKyB0YXJnZXQubmFtZSArIFwiINC/0L7Qu9GD0YfQsNC10YIgXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnMgKyBcIiDQtNC+0L8g0LTQtdC50YHRgtCy0LjQuSDQvdCwINGN0YLQvtGCINC4INGB0LvQtdC00YPRjtGJ0LjQuSDRhdC+0LQuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTY6IC8vINGB0LjQu9C+0LLQvtC1INC/0L7Qu9C1XHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gZm9yY2VfZmllbGRfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNoaWVsZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LnR5cGUgPSBcImZvcmNlX2ZpZWxkXCJcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5wb3NpdGlvbiA9IGRhdGEucG9zaXRpb25cclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5yYWRpdXMgPSBmb3JjZV9maWVsZF9yYWRpdXNcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5zaGllbGQgPSBkYXRhLnNoaWVsZFxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LmNoYXJhY3Rlcl9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfbGlzdFxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LmNlbGxzX3Byb3RlY3RlZCA9IGRhdGEuY2VsbHNfcHJvdGVjdGVkXHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzLnB1c2goc2hpZWxkX29iamVjdClcclxuXHJcbiAgICAgICAgICAgIHZhciBzaGllbGRfaW5kZXggPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5sZW5ndGggLSAxXHJcbiAgICAgICAgICAgIHZhciBjaGFyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9yY2VfZmllbGRfdGFyZ2V0ID0ge31cclxuICAgICAgICAgICAgZm9yY2VfZmllbGRfdGFyZ2V0LnNoaWVsZF9pbmRleCA9IHNoaWVsZF9pbmRleFxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJfbGlzdFtpXVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uZm9yY2VfZmllbGRfdGFyZ2V0ID0gZm9yY2VfZmllbGRfdGFyZ2V0XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JjZV9maWVsZF91c2VyID0ge31cclxuICAgICAgICAgICAgZm9yY2VfZmllbGRfdXNlci5jb29sZG93biA9IGZvcmNlX2ZpZWxkX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uZm9yY2VfZmllbGRfdXNlciA9IGZvcmNlX2ZpZWxkX3VzZXJcclxuICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsNC60YLQuNCy0LjRgNGD0LXRgiDRgdC40LvQvtCy0L7QtSDQv9C+0LvQtVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTc6IC8vINC40L3QstC40LdcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbdXNlcl9pbmRleF0gPSBkYXRhLnVzZXJuYW1lXHJcbiAgICAgICAgICBpZiAobXlfbmFtZSAhPSBkYXRhLnVzZXJuYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBjZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTg6IC8vINCx0L7QtdCy0LDRjyDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWRhcHRpdmVfZmlnaHRpbmcgPSAtMTtcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCw0LrRgtC40LLQuNGA0YPQtdGCINCx0L7QtdCy0YPRjiDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTk6IC8vINC70LDQutC4INGI0L7RglxyXG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBsdWNreV9zaG90X3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLnJvbGwgPT0gNykge1xyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KPQtNCw0YfQsCDQsdC70LDQs9C+0LLQvtC70LjRgiBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINC60L7RgtC+0YDRi9C5INC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwIFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5yb2xsICsgXCIg0Y3RgtC+INC90LUg0YfQuNGB0LvQviBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINGC0LDQuiDRh9GC0L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINC40LfQsdC10LPQsNC10YIg0LDRgtCw0LrQuC5cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyMDogLy8gbG90dGVyeV9zaG90XHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGxvdHRlcnlfc2hvdF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGF0YS5yb2xsID09IDcpIHtcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZSlcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCa0LDQutCw0Y8g0YPQtNCw0YfQsCEg0KTQvtGA0YLRg9C90LAg0Y/QstC90L4g0L3QsCDRgdGC0L7RgNC+0L3QtSBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINC60L7RgtC+0YDRi9C5INC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwIFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yb2xsID09IDc3KSB7XHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQlNC20LXQutC/0L7RgiEgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINGB0LXQs9C+0LTQvdGPINGB0YLQvtC40YIg0LrRg9C/0LjRgtGMINC70L7RgtC10YDQtdC50L3Ri9C5INCx0LjQu9C10YIsINCwINC/0L7QutCwINC+0L0g0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAgXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBkYXRhLnJvbGwgKyBcIiDRjdGC0L4g0L3QtSDRh9C40YHQu9C+IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiwg0YLQsNC6INGH0YLQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0LjQt9Cx0LXQs9Cw0LXRgiDQsNGC0LDQutC4LlwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIxOiAvL9Cy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40LlcclxuICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSArIGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gYWN0aW9uX3NwbGFzaF9zdGFtaW5hX2Nvc3QqZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIGFjdGlvbl9zcGxhc2hfb2JqZWN0ID0ge31cclxuICAgICAgICAgIGFjdGlvbl9zcGxhc2hfb2JqZWN0LmNvb2xkb3duID0gYWN0aW9uX3NwbGFzaF9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5hY3Rpb25fc3BsYXNoID0gYWN0aW9uX3NwbGFzaF9vYmplY3RcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINCy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40Lkg0Lgg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9ucyArIFwiINC+0YHQvdC+0LLQvdGL0YUg0LTQtdC50YHRgtCy0LjQuSDQstC80LXRgdGC0L4g0LHQvtC90YPRgdC90YvRhS5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIyOiAvLyDQs9GA0LDQtCDRg9C00LDRgNC+0LJcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHB1bmNoX3JhaW5mYWxsX3N0YW1pbmFfY29zdCpkYXRhLnRvdGFsX2F0dGFja3NcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChkYXRhLmRhbWFnZSA+IDApIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L3QsNC90L7RgdC40YIg0LPRgNCw0LQg0LjQtyBcIiArIGRhdGEudG90YWxfYXR0YWNrcyArIFwiINGD0LTQsNGA0L7Qsiwg0LjQtyDQutC+0YLQvtGA0YvRhSBcIiArIGRhdGEuc3VjY2Vzc2Z1bGxfYXR0YWNrcyArIFwiINC/0L7Qv9Cw0LTQsNGO0YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90LDQvdC+0YHRjyBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsC5cIlxyXG5cclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjM6IC8vINCw0LTRgNC10L3QsNC70LjQvdC+0LLRi9C5INC/0L7RgtC+0L9cclxuICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXRfaW5kZXggPSBkYXRhLnRhcmdldF9pbmRleFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pbmRleF1cclxuICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zWzBdXHJcbiAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF90YXJnZXQgPSB7fVxyXG4gICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0LmV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldC50dXJuID0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaW5kZXhdLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldCA9IGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldFxyXG5cclxuICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF91c2VyID0ge31cclxuICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBwb2lzb25vdXNfYWRyZW5hbGluZV9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyID0gYWRyZW5hbGluZV9vYmplY3RfdXNlclxyXG5cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0LjRgdC/0L7Qu9GM0LfRg9C10YIg0LDQtNGA0LXQvdCw0LvQuNC90L7QstGL0Lkg0L/QvtGC0L7Qvy4gXCIgICsgdGFyZ2V0Lm5hbWUgKyBcIiDQv9C+0LvRg9GH0LDQtdGCIFwiICsgZGF0YS5leHRyYV9hY3Rpb25zWzBdICsgXCIg0LTQtdC50YHRgtCy0LjQuSDQsiDRjdGC0L7RgiDRhdC+0LQsINC4IFwiICsgZGF0YS5leHRyYV9hY3Rpb25zWzFdICsgXCIg0LIg0YHQu9C10LTRg9GO0YnQuNC5LiDQrdGC0L4g0LHRg9C00LXRgiDRgdGC0L7QuNGC0Ywg0LbQuNC30L3QtdC5INC4INCy0YvQvdC+0YHQu9C40LLQvtGB0YLQuCwg0LjRgdC/0L7Qu9GM0LfRg9C50YLQtSDRgSDRg9C80L7QvC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG5cclxuICAgICAgY2FzZSAyNDogLy8g0LrQuNGB0LvQvtGC0L3QsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGFjaWRfYm9tYl9zdGFtaW5hX2Nvc3RcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LHRgNC+0YHQsNC10YIg0LrQuNGB0LvQvtGC0L3Rg9GOINCz0YDQsNC90LDRgtGDLiDQkCDQvtC90Lgg0YLQvtC70YzQutC+INC60YPQv9C40LvQuCDQvdC+0LLRi9C1INC00L7RgdC/0LXRhdC4Li4uXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICB2YXIgYWNpZF9ib21iX3VzZXIgPSB7fVxyXG4gICAgICAgICAgYWNpZF9ib21iX3VzZXIuY29vbGRvd24gPSBhY2lkX2JvbWJfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWNpZF9ib21iX3VzZXIgPSBhY2lkX2JvbWJfdXNlclxyXG5cclxuICAgICAgICAgIGFwcGx5X2FjaWRfYm9tYihkYXRhLnBvc2l0aW9uLCBhY2lkX2JvbWJfcmFkaXVzKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyNTogLy8g0LfQsNC80LjQvdC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluY2x1ZGVzKGRhdGEucG9zaXRpb24pKSB7XHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMucHVzaChkYXRhLnBvc2l0aW9uKVxyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1tkYXRhLnBvc2l0aW9uXSA9IFtdXHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW2RhdGEucG9zaXRpb25dLnB1c2goZGF0YS5wbGF5ZXJfbmFtZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI2OiAvLyDQvtCx0LXQt9Cy0YDQtdC00LjRgtGMINC80LjQvdGDXHJcblxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHN3aXRjaChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImVtcHR5XCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KEg0YfQtdC8IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQvtCy0LDRgtGMP1wiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZhaWxcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9C+0L/Ri9GC0LDQu9GB0Y8g0L7QsdC10LfQstGA0LXQtNC40YLRjCDQvNC40L3Rgywg0L3QviDQvdC1INGB0YPQvNC10LsuXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtaW5lX3Bvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgbWluZV9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBjZWxsLnNyYyA9IGZvZ09yUGljKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5kZXhPZihtaW5lX3Bvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLnNwbGljZShpbmRleCwxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1ttaW5lX3Bvc2l0aW9uXSA9IFtdXHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LfQsNC/0YDQtdGJ0LDQtdGCINC80LjQvdC1INCy0LfRgNGL0LLQsNGC0YzRgdGPIVwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN3aXRjaCDQvtCx0LXQstC30YDQtdC20LXQvdC40Y8g0L/QvtGI0LXQuyDQvdC1INGC0LDQulwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI3OiAvLyDQvdC40LrQvtGC0LjQvdC+0LLRi9C5INGD0LTQsNGAXHJcbiAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIGZ1bGxfaHAgPSBIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbdXNlcl9pbmRleF0gLSBmdWxsX2hwICogdG9iYWNjb19zdHJpa2VfaHBfcGVyY2VudGFnZVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9pbmRleF0gKyB0b2JhY2NvX3N0cmlrZV9ib251c1xyXG4gICAgICAgICAgdmFyIHRvYmFjY29fc3RyaWtlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICB0b2JhY2NvX3N0cmlrZV9vYmplY3QuY29vbGRvd24gPSB0b2JhY2NvX3N0cmlrZV9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS50b2JhY2NvX3N0cmlrZSA9IHRvYmFjY29fc3RyaWtlX29iamVjdFxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGF0L7RgNC+0YjQtdGH0L3QviDQt9Cw0YLRj9Cz0LjQstCw0LXRgtGB0Y8uINCR0LXRgNC10LPQuNGC0LXRgdGMIVwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI4OiAvLyDQutGA0YPRh9C10L3Ri9C1INC/0YPQu9C4XHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBjdXJ2ZWRfYnVsbGV0c19zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGF0YS5jb3Zlcl9sZXZlbCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwi0KPRgNC+0LLQtdC90Ywg0YPQutGA0YvRgtC40Y86IFwiICsgZGF0YS5jb3Zlcl9sZXZlbFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwiXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0LfQsNC60YDRg9GC0LjRgtGMINC/0YPQu9GOINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0LfQsNC60YDRg9GC0LjRgtGMINC/0YPQu9GOINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC30LDQutGA0YPRgtC40Lsg0L/Rg9C70Y4gXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQt9Cw0LrRgNGD0YLQuNC7INC/0YPQu9GOIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCLQutGA0YPRh9C10L3QvtC5INC/0YPQu9C10LksINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZ1bGxfY292ZXJcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0J3QtdGB0LzQvtGC0YDRjyDQvdCwINC/0L7Qv9GL0YLQutGDIFwiICsgYXR0YWNrZXIubmFtZSArIFwiINC+0LHQutGA0YPRgtC40YLRjCDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1INC30LDRidC40YnQsNGO0YnQtdC1IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0YLQvtGCINCy0YHQtSDRgNCw0LLQvdC+INC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI5OiAvLyDQn9GA0LjRhtC10LvQuNGC0YzRgdGPXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgYWltX29iamVjdCA9IHt9XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFpbSA9IGFpbV9vYmplY3RcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAzMDogLy8g0LHRi9GB0YLRgNCw0Y8g0LDRgtCw0LrQsFxyXG4gICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbdXNlcl9pbmRleF0gPSAxXHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcInF1aWNrX2F0dGFja19yZWFkeVwiKSkge1xyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnF1aWNrX2F0dGFja19yZWFkeVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gc3RhbWluYV9hdHRhY2tfY29zdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5jb3Zlcl9sZXZlbCA+IDApIHtcclxuICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCLQo9GA0L7QstC10L3RjCDRg9C60YDRi9GC0LjRjzogXCIgKyBkYXRhLmNvdmVyX2xldmVsXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwiXCJcclxuICAgICAgfVxyXG4gICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LHRi9GB0YLRgNC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdGL0YHRgtGA0L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQsdGL0YHRgtGA0L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LHRi9GB0YLRgNC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQsdGL0YHRgtGA0L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiLCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0LHRi9GB0YLRgNC+INCw0YLQsNC60L7QstCw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QviDRgtC+0YIg0L3QsNGF0L7QtNC40YLRgdGPINCyINC/0L7Qu9C90L7QvCDRg9C60YDRi9GC0LjQuC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzE6IC8vINGB0LvRg9C20LHQsCDRgdC/0LDRgdC10L3QuNGPXHJcbiAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIHNhZmV0eV9zZXJ2aWNlX2JvbnVzX2FjdGlvbnNfY29zdFxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2F2aW9yID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBzYXZpb3IubmFtZSArIFwiINC90LUg0LTQsNGB0YIg0LIg0L7QsdC40LTRgyBcIiArICB0YXJnZXQubmFtZVxyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gKyBzYWZldHlfc2VydmljZV9kZWZlbnNpdmVfYWR2YW50YWdlXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1tkYXRhLnRhcmdldF9pZF0gKyBzYWZldHlfc2VydmljZV9ldmFkZV9ib251c1xyXG5cclxuICAgICAgICB2YXIgc2FmZXR5X3NlcnZpY2VfdGFyZ2V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgc2FmZXR5X3NlcnZpY2VfdGFyZ2V0X29iamVjdC5kdXJhdGlvbiA9IHNhZmV0eV9zZXJ2aWNlX2R1cmF0aW9uXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uc2FmZXR5X3NlcnZpY2VfdGFyZ2V0ID0gc2FmZXR5X3NlcnZpY2VfdGFyZ2V0X29iamVjdFxyXG5cclxuICAgICAgICB2YXIgc2FmZXR5X3NlcnZpY2VfdXNlcl9vYmplY3QgPSB7fVxyXG4gICAgICAgIHNhZmV0eV9zZXJ2aWNlX3VzZXJfb2JqZWN0LmNvb2xkb3duID0gc2FmZXR5X3NlcnZpY2VfY29vbGRvd25cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnNhZmV0eV9zZXJ2aWNlX3VzZXIgPSBzYWZldHlfc2VydmljZV91c2VyX29iamVjdFxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAzMjogLy8g0LrQsNC70YzQuNC90LPQsNC70Y/RgtC+0YBcclxuICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gY2FsaW5nYWxhdG9yX3N0YW1pbmFfY29zdFxyXG5cclxuICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0LrQsNC70YzQuNC90LPQsNC70Y/RgtC+0YAuINCh0L7QsdC40YDQsNC50YLQtdGB0Ywg0LLQvtC60YDRg9CzIS5cIlxyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgdmFyIGNhbGluZ2FsYXRvcl9vYmplY3QgPSB7fVxyXG4gICAgICAgIGNhbGluZ2FsYXRvcl9vYmplY3QudHlwZSA9IFwiY2FsaW5nYWxhdG9yXCJcclxuICAgICAgICBjYWxpbmdhbGF0b3Jfb2JqZWN0LnBvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgIGNhbGluZ2FsYXRvcl9vYmplY3QuZHVyYXRpb24gPSBjYWxpbmdhbGF0b3JfZHVyYXRpb25cclxuICAgICAgICBjYWxpbmdhbGF0b3Jfb2JqZWN0LnJhZGl1cyA9IGNhbGluZ2FsYXRvcl9yYWRpdXNcclxuICAgICAgICBjYWxpbmdhbGF0b3Jfb2JqZWN0LmZsYXRfaGVhbCA9IGNhbGluZ2FsYXRvcl9mbGF0X2hlYWxcclxuICAgICAgICBjYWxpbmdhbGF0b3Jfb2JqZWN0LnJvbGxfaGVhbCA9IGNhbGluZ2FsYXRvcl9yb2xsX2hlYWxcclxuICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5wdXNoKGNhbGluZ2FsYXRvcl9vYmplY3QpXHJcblxyXG4gICAgICAgIHZhciBjYWxpbmdhbGF0b3JfdXNlciA9IHt9XHJcbiAgICAgICAgY2FsaW5nYWxhdG9yX3VzZXIuY29vbGRvd24gPSBjYWxpbmdhbGF0b3Jfc2tpbGxfY29vbGRvd25cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmNhbGluZ2FsYXRvcl91c2VyID0gY2FsaW5nYWxhdG9yX3VzZXJcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgYWxlcnQoXCJSZWNlaXZlZCB1bmtub3duIHNraWxsIGNvbW1hbmRcIilcclxuICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICduZXdfcm91bmRfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBtZXNzYWdlID0gXCLQndCw0YfQsNC70L4g0L3QvtCy0L7Qs9C+INGA0LDRg9C90LTQsCFcIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldICE9PSBudWxsICYmIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHN3aXRjaCAoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0udHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiZ2FzX2JvbWJcIjpcclxuICAgICAgICAgICAgICAgIGFwcGx5X2JvbWIoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucG9zaXRpb24sIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cylcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5yYWRpdXMgPj0gNCkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGVfb2JqZWN0X2NvbW1hbmQoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0gPSBudWxsXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5yYWRpdXMgPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5yYWRpdXMgKyAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNhbGluZ2FsYXRvclwiOlxyXG4gICAgICAgICAgICAgICAgYXBwbHlfY2FsaW5nYWxhdG9yKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnBvc2l0aW9uLCBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5yYWRpdXMsIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLmZsYXRfaGVhbCwgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucm9sbF9oZWFsKTtcclxuICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLmR1cmF0aW9uID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0uZHVyYXRpb24gLSAxXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0uZHVyYXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGVfb2JqZWN0X2NvbW1hbmQoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0gPSBudWxsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2VkIHVwIHJlc29sdmluZyB0ZXJyYWluIGVmZmVjdHNcIilcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXIgIT09IHVuZGVmaW5lZCAmJiBjaGFyYWN0ZXIgIT09IG51bGwgJiYgY2hhcmFjdGVyX3N0YXRlLkhQW2ldICE9PSBudWxsICYmIGNoYXJhY3Rlcl9zdGF0ZS5IUFtpXSA+IDApIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbaV0gPSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2ldID0gMFxyXG4gICAgICAgICAgYXNzaWduX21vdmVzKGkpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gYm9udXNfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBtYWluX2FjdGlvbl9tYXBbY2hhcmFjdGVyLmFnaWxpdHldO1xyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwidGlyZWRcIikpIHsgLy8g0KPQsdGA0LDRgtGMINCx0L7QvdGD0YHRiyDQvtGCINGD0YHRgtCw0LvQvtGB0YLQuCDQv9GA0L7RiNC70L7Qs9C+INGF0L7QtNCwICjRh9GC0L7QsdGLINC60L7Qs9C00LAg0LHRg9C00YPRgiDQvdCw0LrQsNC70LDQtNGL0LLQsNGC0YzRgdGPINC90L7QstGL0LUg0L3QtSDRiNGC0YDQsNGE0L7QstCw0YLRjCDQtNCy0LDQttC00YspXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldIC0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50aXJlZC5ib251c1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA8IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSAqIDAuNjcpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIDwgc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdICogMC4zNCkge1xyXG4gICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA8PSAwKSB7IC8vIDPRjyDRgdGC0LDQtNC40Y9cclxuICAgICAgICAgICAgICAgIHZhciB0aXJlZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LmJvbnVzID0gLTNcclxuICAgICAgICAgICAgICAgIHRpcmVkX29iamVjdC5zdGFnZSA9IDNcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQgPSB0aXJlZF9vYmplY3RcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldIC0gM1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0qMC4yNSlcclxuICAgICAgICAgICAgICAgIGlmICgoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID09IDEpJiYoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9PSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gMFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDFcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7IC8vIDLRjyDRgdGC0LDQtNC40Y9cclxuICAgICAgICAgICAgICAgIHZhciB0aXJlZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LmJvbnVzID0gLTJcclxuICAgICAgICAgICAgICAgIHRpcmVkX29iamVjdC5zdGFnZSA9IDJcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQgPSB0aXJlZF9vYmplY3RcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldIC0gMlxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0qMC41KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gMdGPINGB0YLQsNC00LjRj1xyXG4gICAgICAgICAgICAgIHZhciB0aXJlZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIHRpcmVkX29iamVjdC5ib251cyA9IC0xXHJcbiAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LnN0YWdlID0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQgPSB0aXJlZF9vYmplY3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSowLjc1KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJ0aXJlZFwiKSkgeyAvLyDQvdC1INGD0YHRgtCw0LsgLT4g0YPQsdGA0LDRgtGMINGD0YHRgtC70LDQu9C+0YHRgtGMINC10YHQu9C4INCx0YvQu9CwXHJcbiAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY2hlY2tfY29vbGRvd24oaSwgXCJsaWdodF9zb3VuZF9ib21iX3VzZXJcIiwgXCLQodCy0LXRgtC+0YjRg9C80L7QstCw0Y8g0LPRgNCw0L3QsNGC0LAg0YMgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINCz0L7RgtC+0LLQsCDQuiDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRji5cIik7XHJcbiAgICAgICAgICBjaGVja19jb29sZG93bihpLCBcImFjdGlvbl9zcGxhc2hcIiwgY2hhcmFjdGVyLm5hbWUgKyBcIiDQstC90L7QstGMINC80L7QttC10YIg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINCy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40LkuXCIpO1xyXG4gICAgICAgICAgY2hlY2tfY29vbGRvd24oaSwgXCJzYWZldHlfc2VydmljZV91c2VyXCIsIFwiXCIpO1xyXG4gICAgICAgICAgY2hlY2tfY29vbGRvd24oaSwgXCJjYWxpbmdhbGF0b3JfdXNlclwiLCBcIlwiKTtcclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwiZ2FzX2JvbWJfdXNlclwiLCBcItCT0LDQt9C+0LLQsNGPINCz0YDQsNC90LDRgtCwINGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQs9C+0YLQvtCy0LAg0Log0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y4uXCIpO1xyXG4gICAgICAgICAgY2hlY2tfY29vbGRvd24oaSwgXCJhY2lkX2JvbWJfdXNlclwiLCBcItCa0LjRgdC70L7RgtC90LDRjyDQs9GA0LDQvdCw0YLQsCDRgyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LPQvtGC0L7QstCwINC6INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGOLlwiKTtcclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwiZm9yY2VfZmllbGRfdXNlclwiLCBcItCh0LjQu9C+0LLQvtC1INC/0L7Qu9C1INGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC90L7QstCwINC30LDRgNGP0LbQtdC90L4uXCIpO1xyXG4gICAgICAgICAgY2hlY2tfY29vbGRvd24oaSwgXCJjaGFyZ2VfdXNlclwiLCBcIlwiKTtcclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwiY3V0X2xpbWJfdXNlclwiLCBcIlwiKTtcclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwiYWRyZW5hbGluZV91c2VyXCIsIFwi0KPQvNC10L3QuNC1INCf0YDQuNC70LjQsiDQkNC00YDQtdC90LDQu9C40L3QsCDRgyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvdC+0LLQsCDQtNC+0YHRgtGD0L/QvdC+LlwiKTtcclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwicG9pc29ub3VzX2FkcmVuYWxpbmVfdXNlclwiLCBcItCj0LzQtdC90LjQtSDQkNC00YDQtdC90LDQu9C40L3QvtCy0YvQuSDQn9C+0YLQvtC/INGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC90L7QstCwINC00L7RgdGC0YPQv9C90L4uXCIpO1xyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwic2FmZXR5X3NlcnZpY2VfdGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNhZmV0eV9zZXJ2aWNlX3RhcmdldC5kdXJhdGlvbiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtpXSAtIHNhZmV0eV9zZXJ2aWNlX2RlZmVuc2l2ZV9hZHZhbnRhZ2VcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbaV0gLSBzYWZldHlfc2VydmljZV9ldmFkZV9ib251c1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNhZmV0eV9zZXJ2aWNlX3RhcmdldFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2FmZXR5X3NlcnZpY2VfdGFyZ2V0LmR1cmF0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zYWZldHlfc2VydmljZV90YXJnZXQuZHVyYXRpb24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInBpY2hfcGljaF91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQo9C80LXQvdC40LUg0J/Ri9GJLdCf0YvRiSDRgyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvdC+0LLQsCDQtNC+0YHRgtGD0L/QvdC+LlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyLmNvb2xkb3duID09IHBpY2hfcGljaF9jb29sZG93bikge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInBpY2hfcGljaF90YXJnZXRcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3RhcmdldC5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gKyBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSArIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zIC0gMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdGFyZ2V0XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJhaW1cIikpIHtcclxuICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWltXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJhZHJlbmFsaW5lX3RhcmdldFwiKSkge1xyXG4gICAgICAgICAgICAgIHZhciBtaW51c19hY3Rpb25zID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hZHJlbmFsaW5lX3RhcmdldC5taW51c19hY3Rpb25zXHJcbiAgICAgICAgICAgICAgd2hpbGUgKG1pbnVzX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWludXNfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gLSBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSAtIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1pbnVzX2FjdGlvbnMgPSBtaW51c19hY3Rpb25zIC0gMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hZHJlbmFsaW5lX3RhcmdldFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwicG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHR1cm4gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldC50dXJuXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXQudHVybiA9IHR1cm4gKyAxXHJcbiAgICAgICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldC5leHRyYV9hY3Rpb25zW3R1cm5dXHJcbiAgICAgICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gKyBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSArIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zIC0gMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodHVybiArIDEgPT0gcG9pc29ub3VzX2FkcmVuYWxpbmVfZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXVxyXG4gICAgICAgICAgICAgICAgdmFyIG1heF9IUCA9IEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV1cclxuICAgICAgICAgICAgICAgIHZhciBtYXhfc3RhbWluYSA9IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXVxyXG4gICAgICAgICAgICAgICAgdmFyIEhQX2Nvc3QgPSBwb2lzb25vdXNfYWRyZW5hbGluZV9mbGF0X0hQICsgcGFyc2VJbnQocGFyc2VGbG9hdChtYXhfSFApICogcG9pc29ub3VzX2FkcmVuYWxpbmVfcGVyY2VudF9IUClcclxuICAgICAgICAgICAgICAgIHZhciBzdGFtaW5hX2Nvc3QgPSBwb2lzb25vdXNfYWRyZW5hbGluZV9mbGF0X3N0YW1pbmEgKyBwYXJzZUludChwYXJzZUZsb2F0KG1heF9zdGFtaW5hKSAqIHBvaXNvbm91c19hZHJlbmFsaW5lX3BlcmNlbnRfc3RhbWluYSlcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtpXSAtIEhQX2Nvc3RcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gLSBzdGFtaW5hX2Nvc3RcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldFxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCQ0LTRgNC10L3QsNC70LjQvSDQsiDQutGA0L7QstC4IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQt9Cw0LrQsNC90YfQuNCy0LDQtdGC0YHRjywg0L3QsNGB0YLRg9C/0LDQtdGCINC/0L7RhdC80LXQu9GM0LUgKFwiICsgSFBfY29zdCArIFwiINGF0L8g0LggXCIgKyBzdGFtaW5hX2Nvc3QgKyBcIiDQstGL0L3QvtGB0LvQuNCy0L7RgdGC0LgpXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJzaG9ja2VkXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNob2NrZWQuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiY3V0X2xpbWJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY3V0X2xpbWIuZHVyYXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCh0YPRhdC+0LbQuNC70LjRjyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQvtGB0YHRgtCw0L3QvtCy0LjQu9C40YHRjC5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSAtMTBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iLmR1cmF0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYi5kdXJhdGlvbiAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiaGVhbGVkXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZC5jb29sZG93biA+IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0vMlxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGVhbGVkLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJibGluZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biA+IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJsaW5kLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gKyAyXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCX0YDQtdC90LjQtSBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQvtGB0YHRgtCw0L3QvtCy0LjQu9C+0YHRjFwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyAtIDFcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJzaGllbGRfdXBcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gTWF0aC5jZWlsKGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXS8yKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIC0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaGllbGRfdXAuc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GA0L7QtNC+0LvQttCw0LXRgiDQtNC10YDQttCw0YLRjCDRidC40YIgKNGB0L/QsNGB0LjQsdC+KVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYmlnX2Jyb1wiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm8uYm9udXNfS0RcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGC0LXRgNGP0LXRgiDQt9Cw0YnQuNGC0YMg0JHQvtC70YzRiNC+0LPQviDQkdGA0LDRgtCwXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJ0b2JhY2NvX3N0cmlrZVwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50b2JhY2NvX3N0cmlrZS5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udG9iYWNjb19zdHJpa2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50b2JhY2NvX3N0cmlrZS5jb29sZG93biA9PSB0b2JhY2NvX3N0cmlrZV9jb29sZG93bikge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gLSB0b2JhY2NvX3N0cmlrZV9ib251c1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRvYmFjY29fc3RyaWtlLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50b2JhY2NvX3N0cmlrZS5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYWNpZF9ib21iX3BvaXNvblwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gKyBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uYm9udXNfS0RcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCR0YDQvtC90Y8gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINC90LDQutC+0L3QtdGGINCy0L7RgdGB0YLQsNC90L7QstC40LvQsNGB0YxcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uZHVyYXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uZHVyYXRpb24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImdhc19ib21iX3BvaXNvblwiKSkge1xyXG4gICAgICAgICAgICB2YXIgY291bnQgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWxcclxuICAgICAgICAgICAgd2hpbGUgKGNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgIC8vY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldIC0gZ2FzX2JvbWJfbW92ZV9yZWR1Y3Rpb25cclxuICAgICAgICAgICAgICBpZiAoY291bnQgJSAyID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSAtIDFcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvdW50ID0gY291bnQgLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNhdmVfcm9sbCA9IGRhdGEuc2F2ZV9yb2xsX2xpc3RbaV1cclxuICAgICAgICAgICAgaWYgKHNhdmVfcm9sbCA+PSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi50aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgLSAxXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC60LjQtNCw0LXRgiDRgdC/0LDRgdCx0YDQvtGB0L7QuiDQuCDRg9C80LXQvdGM0YjQsNC10YIg0YHRgtCw0LTQuNGOINC+0YLRgNCw0LLQu9C10L3QuNGPICjRgtC10L/QtdGA0YwgXCIgKyBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/RgNC+0LLQsNC70LjQstCw0LXRgiDRgdC/0LDRgdCx0YDQvtGB0L7Qui4g0KHRgtCw0LTQuNGPINC+0YLRgNCw0LLQu9C10L3QuNGPINC+0YHRgtCw0LXRgtGB0Y8g0L/RgNC10LbQvdC10LkgKFwiICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCx0L7Qu9GM0YjQtSDQvdC1INC+0YLRgNCw0LLQu9C10L0hXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcIm1lbGVlZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWQuY29vbGRvd24gPD0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLm1lbGVlZFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWQuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLm1lbGVlZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09ICdzbmlwZXInKSB7XHJcbiAgICAgICAgICAgIHZhciBlZmZlY3RzX29iamVjdCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV1cclxuICAgICAgICAgICAgaWYgKGVmZmVjdHNfb2JqZWN0Lmhhc093blByb3BlcnR5KFwic25pcGVyX3Bhc3NpdmVcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9hdHRhY2tfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9kYW1hZ2VfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgICBpZiAoY3VycmVudF9hdHRhY2tfYm9udXMgPT0gLTUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfYXR0YWNrX2JvbnVzID0gTWF0aC5taW4oY3VycmVudF9hdHRhY2tfYm9udXMgKyAxLCA0KVxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19kYW1hZ2VfYm9udXMgPSBNYXRoLm1pbihjdXJyZW50X2RhbWFnZV9ib251cyArIDIsIDgpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2ldIC0gY3VycmVudF9hdHRhY2tfYm9udXMgKyBuZXdfYXR0YWNrX2JvbnVzXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbaV0gLSBjdXJyZW50X2RhbWFnZV9ib251cyArIG5ld19kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251cyA9IG5ld19hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNuaXBlcl9wYXNzaXZlLmRhbWFnZV9ib251cyA9IG5ld19kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgc25pcGVyX3Bhc3NpdmVfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zbmlwZXJfcGFzc2l2ZSA9IHNuaXBlcl9wYXNzaXZlX29iamVjdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYmF0dGxlX21vZF9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID0gZGF0YS52YWx1ZVxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDApIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JHQvtC5INC+0LrQvtC90YfQtdC9ISDQndCw0YHRgtGD0L/QuNC7INC80LjRgCDQstC+INCy0YHQtdC8INC80LjRgNC1XCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0J3QsNGH0LDQu9C+INCx0L7RjyEg0JvRjtC00Lgg0YPQvNC40YDQsNGO0YIsINC10YHQu9C4INC40YUg0YPQsdC40YLRjFwiXHJcbiAgICAgIH1cclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3Jlc29sdmVfYXR0YWNrX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5hdHRhY2tfdHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gZ3Vuc2hvdF9hdWRpb1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGEuYXR0YWNrX3R5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gc3dvcmRfYXVkaW9cclxuICAgICAgfSBlbHNlIHsvLyBkZWZhdWx0IGluY2x1ZGluZyBlbmVyZ3kgYW5kIHRocm93aW5nXHJcbiAgICAgICAgdmFyIGF1ZGlvID0gc3VyaWtlbl9hdWRpb1xyXG4gICAgICB9XHJcbiAgICAgIGF1ZGlvLnBsYXkoKTtcclxuXHJcbiAgICAgIGlmIChkYXRhLnVzZXJfaW52aXNpYmlsaXR5X2VuZGVkID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuYXR0YWNrZXJfaWRdID0gXCJhbGxcIlxyXG4gICAgICAgIHZhciBhdHRhY2tlcl9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEuYXR0YWNrZXJfcG9zaXRpb24pO1xyXG4gICAgICAgIGF0dGFja2VyX2NlbGwuc3JjID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5hdHRhY2tlcl9pZF0uYXZhdGFyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmF0dGFja2VyX2lkXVxyXG4gICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbZGF0YS5hdHRhY2tlcl9pZF0gPSAxXHJcblxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmF0dGFja2VyX2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuYXR0YWNrZXJfaWRdIC0gc3RhbWluYV9hdHRhY2tfY29zdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmF0dGFja2VyX2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmF0dGFja2VyX2lkXSAtIDFcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJhaW1fb3ZlclwiKSkge1xyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuYXR0YWNrZXJfaWRdLmFpbVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShcInF1aWNrX2F0dGFja19yZWFkeVwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5hdHRhY2tlcl9pZF0ucXVpY2tfYXR0YWNrX3JlYWR5ID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJtb3ZlX3JlZHVjdGlvblwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdIC0gZGF0YS5tb3ZlX3JlZHVjdGlvbjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuY292ZXJfbGV2ZWwgPiAwKSB7XHJcbiAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwi0KPRgNC+0LLQtdC90Ywg0YPQutGA0YvRgtC40Y86IFwiICsgZGF0YS5jb3Zlcl9sZXZlbFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcIlwiXHJcbiAgICAgIH1cclxuICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L7QtNC90LDQutC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDRg9C00LDQu9C+0YHRjCDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQsNGC0LDQutC+0LLQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90L4g0YLQvtGCINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NlYXJjaF9hY3Rpb25fcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgICAgICBwdXNoVG9MaXN0KGRhdGEuY2hhcmFjdGVyX25hbWUgKyAnINCx0YDQvtGB0LjQuyAnICsgZGF0YS5yb2xsICsgJyDQvdCwINCy0L3QuNC80LDRgtC10LvRjNC90L7RgdGC0Ywg0LIg0LfQvtC90LUgJyArIGRhdGEuem9uZV9udW1iZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLm1pbmVzX2RldGVjdGVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IGRhdGEuY2hhcmFjdGVyX25hbWUgKyBcIiDQvtCx0L3QsNGA0YPQttC40LLQsNC10YIgXCIgKyBkYXRhLm1pbmVzX2RldGVjdGVkLmxlbmd0aCArIFwiINC80LjQvSDRgNGP0LTQvtC8INGBINGB0L7QsdC+0LlcIlxyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubWluZXNfZGV0ZWN0ZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHZhciBtaW5lID0gZGF0YS5taW5lc19kZXRlY3RlZFtpXVxyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1ttaW5lXS5wdXNoKGRhdGEucGxheWVyX25hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbnZhciBjcmVhdGVfYm9hcmRfYnV0dG9uID0gJChDUkVBVEVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxuY3JlYXRlX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBjcmVhdGVCb2FyZCk7XHJcbmNyZWF0ZV9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHNhdmVfYm9hcmRfYnV0dG9uID0gJChTQVZFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnNhdmVfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIHNhdmVCb2FyZCk7XHJcbnNhdmVfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBsb2FkX2JvYXJkX2J1dHRvbiA9ICQoTE9BRF9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5sb2FkX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBsb2FkQm9hcmQpO1xyXG5sb2FkX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgcm9sbF9pbml0aWF0aXZlX2J1dHRvbiA9ICQoUk9MTF9JTklUSUFUSVZFX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnJvbGxfaW5pdGlhdGl2ZV9idXR0b24ub24oJ2NsaWNrJywgcm9sbEluaXRpYXRpdmUpO1xyXG5yb2xsX2luaXRpYXRpdmVfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBmb2dfYnV0dG9uID0gJChGT0dfQlVUVE9OX1NFTEVDVE9SKTtcclxuZm9nX2J1dHRvbi5vbignY2xpY2snLCBmb2dNb2RlQ2hhbmdlKTtcclxuZm9nX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgem9uZV9idXR0b24gPSAkKFpPTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxuem9uZV9idXR0b24ub24oJ2NsaWNrJywgem9uZU1vZGVDaGFuZ2UpO1xyXG56b25lX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgY2hhdF9idXR0b24gPSAkKENIQVRfQlVUVE9OX1NFTEVDVE9SKTtcclxuY2hhdF9idXR0b24ub24oJ2NsaWNrJywgY2hhbmdlQ2hhdFZpc2liaWxpdHkpO1xyXG5cclxudmFyIG1pcnJvcl9idXR0b24gPSAkKE1JUlJPUl9CVVRUT05fU0VMRUNUT1IpO1xyXG5taXJyb3JfYnV0dG9uLm9uKCdjbGljaycsIG1pcnJvcl9ib2FyZCk7XHJcbm1pcnJvcl9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIG5leHRfcm91bmRfYnV0dG9uID0gJChORVhUX1JPVU5EX0JVVFRPTl9TRUxFQ1RPUik7XHJcbm5leHRfcm91bmRfYnV0dG9uLm9uKCdjbGljaycsIHN0YXJ0X25ld19yb3VuZCk7XHJcbm5leHRfcm91bmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBiYXR0bGVfbW9kX2J1dHRvbiA9ICQoQkFUVExFX01PRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5iYXR0bGVfbW9kX2J1dHRvbi5vbignY2xpY2snLCBjaGFuZ2VfYmF0dGxlX21vZCk7XHJcbmJhdHRsZV9tb2RfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBzeW5jX2J1dHRvbiA9ICQoU1lOQ19CVVRUT05fU0VMRUNUT1IpO1xyXG5zeW5jX2J1dHRvbi5vbignY2xpY2snLCBzeW5jX2JvYXJkKTtcclxuc3luY19idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGxhbmRtaW5lX2J1dHRvbiA9ICQoTEFORE1JTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxubGFuZG1pbmVfYnV0dG9uLm9uKCdjbGljaycsIHNob3dfbGFuZG1pbmVzKTtcclxuXHJcbnZhciBmb2dfem9uZV9idXR0b24gPSAkKEZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmZvZ196b25lX2J1dHRvbi5vbignY2xpY2snLCBmb2dDdXJyZW50Wm9uZSk7XHJcbmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgdW5mb2dfem9uZV9idXR0b24gPSAkKFVORk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxudW5mb2dfem9uZV9idXR0b24ub24oJ2NsaWNrJywgdW5mb2dDdXJyZW50Wm9uZSk7XHJcbnVuZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciB6b25lX251bWJlcl9zZWxlY3QgPSAkKFpPTkVfTlVNQkVSX1NFTEVDVE9SKTtcclxuem9uZV9udW1iZXJfc2VsZWN0LmhpZGUoKTtcclxuZm9yIChsZXQgaSA9IDE7IGkgPCBNQVhfWk9ORVM7IGkrKykge1xyXG4gIHZhciBjdXJyZW50X29wdGlvbiA9ICQoXCI8b3B0aW9uPlwiKTtcclxuICBjdXJyZW50X29wdGlvbi50ZXh0KCfQl9C+0L3QsCAnICsgaSk7XHJcbiAgY3VycmVudF9vcHRpb24udmFsKGkpO1xyXG4gIHpvbmVfbnVtYmVyX3NlbGVjdC5hcHBlbmQoY3VycmVudF9vcHRpb24pO1xyXG59XHJcblxyXG52YXIgc2F2ZXNfc2VsZWN0ID0gJChTQVZFU19TRUxFQ1RfU0VMRUNUT1IpO1xyXG5zYXZlc19zZWxlY3QuaGlkZSgpO1xyXG5cclxudmFyIHNlYXJjaF9tb2RpZmljYXRvciA9ICQoU0VBUkNIX01PRElGSUNBVE9SX1NFTEVDVE9SKTtcclxuc2VhcmNoX21vZGlmaWNhdG9yLmhpZGUoKTtcclxuXHJcbnZhciBub3RpZmljYXRpb25zX2xpc3QgPSAkKE5PVElGSUNBVElPTlNfTElTVF9TRUxFQ1RPUik7XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgQ0hBVF9DQVNIOyBpKyspIHtcclxuICB2YXIgY3VycmVudF9lbGVtZW50ID0gJChcIjxsaT5cIik7XHJcbiAgY3VycmVudF9lbGVtZW50LmF0dHIoJ2RhdGEtbmFtZScsICdub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgaSk7XHJcbiAgY3VycmVudF9lbGVtZW50LmF0dHIoJ2NsYXNzJywgJ25vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50Jyk7XHJcbiAgbm90aWZpY2F0aW9uc19saXN0LmFwcGVuZChjdXJyZW50X2VsZW1lbnQpO1xyXG59XHJcblxyXG52YXIgYm9hcmRfc2l6ZV9pbnB1dCA9ICQoQk9BUkRfU0laRV9JTlBVVF9TRUxFQ1RPUik7XHJcbmJvYXJkX3NpemVfaW5wdXQuaGlkZSgpO1xyXG5cclxudmFyIHNhdmVfbmFtZV9pbnB1dCA9ICQoU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SKTtcclxuc2F2ZV9uYW1lX2lucHV0LmhpZGUoKTtcclxuXHJcbnZhciBub3RpZmljYXRpb25zX2NvbnRhaW5lciA9ICQoTk9USUZJQ0FUSU9OU19DT05UQU5FUl9TRUxFQ1RPUik7XHJcbm5vdGlmaWNhdGlvbnNfY29udGFpbmVyLmhpZGUoKTtcclxuXHJcbnZhciBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIgPSAkKENIQVJBQ1RFUl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciB3ZWFwb25faW5mb19jb250YWluZXIgPSAkKFdFQVBPTl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciBpbml0aWF0aXZlX29yZGVyX2NvbnRhaW5lciA9ICQoSU5JVElBVElWRV9PUkRFUl9DT05UQU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgc2tpbGxfbW9kYWwgPSAkKFNLSUxMX01PREFMX1NFTEVDVE9SKTtcclxuXHJcbnZhciBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIgPSAkKFNLSUxMX0RFU0NSSVBUSU9OX0NPTlRBSU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgc2tpbGxfbW9kYWxfY29udGVudCA9ICQoU0tJTExfTU9EQUxfQ09OVEVOVF9TRUxFQ1RPUik7XHJcblxyXG52YXIgbmV4dF9wYWdlX2J1dHRvbl9jb250YWluZXIgPSAkKE5FWFRfUEFHRV9CVVRUT05fQ09OVEFJTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciBzcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbC1tb2RhbC1jbG9zZVwiKTtcclxuXHJcbnNwYW4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGhpZGVfbW9kYWwoKTtcclxufVxyXG5cclxuc3Bhbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxud2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gIGlmIChldmVudC50YXJnZXQuaWQgPT0gc2tpbGxfbW9kYWwuYXR0cignaWQnKSkge1xyXG4gICAgaGlkZV9tb2RhbCgpO1xyXG4gIH1cclxufVxyXG5cclxuZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlO1xyXG4gICAgLy8gd1xyXG4gICAgaWYoa2V5Q29kZSA9PSA4Nykge1xyXG4gICAgICAgIHdfb25jbGljaygpXHJcbiAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT0gNjUpIHsgLy8gYVxyXG4gICAgICBhX29uY2xpY2soKVxyXG4gICAgfVxyXG59O1xyXG5cclxuc2V0SW50ZXJ2YWwocmVjb25uZWN0LCAzMCoxMDAwKVxyXG5zZXRJbnRlcnZhbChwb2tlX3NlcnZlciwgNDUqMTAwMClcclxuIiwibGV0IHNvY2tldDtcclxubGV0IHNlcnZlcl9hZGRyZXNzO1xyXG5sZXQgb25NZXNzYWdlRnVuY3Rpb247XHJcblxyXG5mdW5jdGlvbiBpbml0KHVybCkge1xyXG4gIHNlcnZlcl9hZGRyZXNzID0gdXJsO1xyXG4gIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUmVhZHkoKSB7XHJcbiAgcmV0dXJuIHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTlxyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnb3BlbicpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBvbk1lc3NhZ2VGdW5jdGlvbiA9IGhhbmRsZXJGdW5jdGlvbjtcclxuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKGRhdGEpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0KCkge1xyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICBvbk1lc3NhZ2VGdW5jdGlvbihkYXRhKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShwYXlsb2FkKSB7XHJcbiAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbml0KHNlcnZlcl9hZGRyZXNzKTtcclxuICAgIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIob25NZXNzYWdlRnVuY3Rpb24pO1xyXG4gICAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnTm90IHNlbmQsIGJ1dCByZWNvbm5lY3RlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgcmVnaXN0ZXJPcGVuSGFuZGxlcixcclxuICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyLFxyXG4gIHNlbmRNZXNzYWdlLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0LFxyXG4gIGlzUmVhZHlcclxufVxyXG4iXX0=
