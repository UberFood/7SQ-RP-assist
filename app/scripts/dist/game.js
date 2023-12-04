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
var DOWNLOAD_BOARD_BUTTON_SELECTOR = '[data-name="download_board_button"]';

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
var ARMOR_IMAGE = "./images/armor.jpg";
var SPIRIT_IMAGE = "./images/chakra.jpg";

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

var adrenaline_cooldown = 4;

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
var calingalator_obstacle = 25;
var calingalator_duration = 3;
var calingalator_stamina_cost = 3;
var calingalator_radius = 1.6;
var calingalator_skill_cooldown = 10;
var calingalator_flat_heal = 5;
var calingalator_roll_heal = 5;
var calingalator_poisoning_duration_stage1 = 5;
var calingalator_poisoning_duration_stage2 = 7;
var calingalator_poisoning_duration_stage3 = 10;
var calingalator_poisoning_duration_enlightened = 10;
var calingalator_penalty_stage1 = -1;
var calingalator_penalty_stage2 = -2;
var calingalator_penalty_stage3 = -3;
var calingalator_penalty_enlightened = 3;

var belvet_buff_range = 1.6;
var belvet_buff_skill_duration = 1;
var belvet_buff_attack_bonus = 2;
var belvet_buff_melee_advantage = 1;
var belvet_buff_ranged_advantage = 1;

var hook_cooldown = 2;
var hook_duration = 1;
var hook_defensive_advantage = -1;
var hook_range = 3;

var punishing_strike_cooldown = 3;
var punishing_strike_multiplyer = 0.5;

// This is a constant, will be moved to database later
var HP_values = [15, 30, 40, 55, 75, 100, 130, 165, 205, 250, 300, 355, 415];
var stamina_values = [30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195];
var strength_damage_map = [-2, 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55];
var move_action_map = [1, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15];
var bonus_action_map = [0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3];
var main_action_map = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3];

var effect_list = ["Увеличить силу", "Увеличить телосложение", "Увеличить ловкость", "Увеличить интеллект", "Увеличить КД", "Уменьшить силу", "Уменьшить телосложение", "Уменьшить ловкость", "Уменьшить интеллект", "Уменьшить КД"];
var INCREASE_STRENGTH = 0;
var INCREASE_STAMINA = 1;
var INCREASE_AGILITY = 2;
var INCREASE_INT = 3;
var INCREASE_KD = 4;
var DECREASE_STRENGTH = 5;
var DECREASE_STAMINA = 6;
var DECREASE_AGILITY = 7;
var DECREASE_INT = 8;
var DECREASE_KD = 9;

var CHARACTER_STATE_CONSTANT = { HP: [], main_action: [], bonus_action: [], move_action: [], stamina: [], initiative: [], can_evade: [], has_moved: [],
  KD_points: [], current_weapon: [], visibility: [], invisibility: [], attack_bonus: [], damage_bonus: [], universal_bonus: [], bonus_KD: [],
  special_effects: [], ranged_advantage: [], melee_advantage: [], defensive_advantage: [], position: [], evade_bonus: [], melee_resist: [], bullet_resist: [] };
var game_state = { board_state: [], fog_state: [], zone_state: [], size: 0, search_modificator_state: [], terrain_effects: [], battle_mod: 0,
  landmines: { positions: [], knowers: [] } };
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

function downloadBoard() {
  var name = saves_select.val();
  var link_name = "saves/" + name + ".json";
  document.getElementById('my_iframe').src = link_name;
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

function spirit_image(character_number) {
  return SPIRIT_IMAGE;
}

function armor_image(character_number) {
  return ARMOR_IMAGE;
}

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

function display_armor_detailed(character_number, container) {
  var KD_display = document.createElement("h2");
  var KD_value = parseInt(character_state.KD_points[character_number]) + parseInt(character_state.bonus_KD[character_number]);
  KD_display.innerHTML = "КД: " + KD_value;

  var melee_resist_display = document.createElement("h2");
  var melee_resist = character_state.melee_resist[character_number] * 100;
  melee_resist_display.innerHTML = "Милли резист: " + melee_resist + "%";

  var bullet_resist_display = document.createElement("h2");
  var bullet_resist = character_state.bullet_resist[character_number] * 100;
  bullet_resist_display.innerHTML = "Стрелковый резист: " + bullet_resist + "%";

  var evade_bonus_display = document.createElement("h2");
  evade_bonus_display.innerHTML = "Уклонение: " + character_state.evade_bonus[character_number];

  var defensive_advantage_display = document.createElement("h2");
  defensive_advantage_display.innerHTML = "Уязвимость: " + character_state.defensive_advantage[character_number];

  container.append(KD_display);
  container.append(melee_resist_display);
  container.append(bullet_resist_display);
  container.append(evade_bonus_display);
  container.append(defensive_advantage_display);
  container.show();
}

function display_spirit_detailed(character_number, container) {
  var attack_bonus_display = document.createElement("h2");
  attack_bonus_display.innerHTML = "Бонус атаки: " + character_state.attack_bonus[character_number];

  var damage_bonus_display = document.createElement("h2");
  damage_bonus_display.innerHTML = "Бонус урона: " + character_state.damage_bonus[character_number];

  var universal_bonus_display = document.createElement("h2");
  universal_bonus_display.innerHTML = "Всеобщий бонус: " + character_state.universal_bonus[character_number];

  var melee_advantage_display = document.createElement("h2");
  melee_advantage_display.innerHTML = "Melee adv: " + character_state.melee_advantage[character_number];

  var ranged_advantage_display = document.createElement("h2");
  ranged_advantage_display.innerHTML = "Ranged adv: " + character_state.ranged_advantage[character_number];

  container.append(attack_bonus_display);
  container.append(damage_bonus_display);
  container.append(universal_bonus_display);
  container.append(melee_advantage_display);
  container.append(ranged_advantage_display);
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
        var visibility_message = "";
        if (character_state.visibility[character_number] == 0) {
          visibility_message = "Открыть доступ";
        } else {
          visibility_message = "Закрыть доступ";
        }
        change_character_visibility_button.innerHTML = visibility_message;
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
        damage_field.placeholder = "Урон";

        var effect_select = document.createElement("select");
        effect_select.id = "effect_select";

        for (var i = 0; i < effect_list.length; i++) {
          var current_option = document.createElement("option");
          current_option.innerHTML = effect_list[i];
          current_option.value = i;
          effect_select.appendChild(current_option);
        }

        var effect_button = document.createElement("button");
        effect_button.innerHTML = "Применить эффект";
        effect_button.onclick = function (event) {
          var effect_select = document.getElementById("effect_select");
          var effect_index = effect_select.value;
          send_effect_command(character_number, effect_index);
        };
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

      var inventory = character.inventory;

      var default_weapon_index = character_state.current_weapon[character_number];
      character_chosen.weapon_id = default_weapon_index;
      var default_weapon = weapon_detailed_info[default_weapon_index];

      var weapon_mini_display = document.createElement("IMG");
      weapon_mini_display.id = "weapon_mini_display";
      weapon_mini_display.src = default_weapon.avatar;
      weapon_mini_display.classList.add("mini_display");
      weapon_mini_display.onmouseenter = function (event) {
        var weapon_index = character_state.current_weapon[character_number];
        display_weapon_detailed(weapon_index, weapon_info_container, true);
      };

      weapon_mini_display.onmouseleave = function (event) {
        weapon_info_container.html("");
        weapon_info_container.hide();
      };

      weapon_mini_display.onclick = function () {
        if (my_role == "gm" || character_state.visibility[character_number] == 1) {
          show_weapon_modal(character_number, 0);
        }
      };

      avatar_container.append(weapon_mini_display);

      var armor_mini_display = document.createElement("IMG");
      armor_mini_display.id = "armor_mini_display";
      armor_mini_display.src = armor_image(character_number);
      armor_mini_display.classList.add("mini_display");
      armor_mini_display.onmouseenter = function (event) {
        display_armor_detailed(character_number, weapon_info_container);
      };

      armor_mini_display.onmouseleave = function (event) {
        weapon_info_container.html("");
        weapon_info_container.hide();
      };

      avatar_container.append(armor_mini_display);

      var spirit_mini_display = document.createElement("IMG");
      spirit_mini_display.id = "spirit_mini_display";
      spirit_mini_display.src = spirit_image(character_number);
      spirit_mini_display.classList.add("mini_display");
      spirit_mini_display.onmouseenter = function (event) {
        display_spirit_detailed(character_number, weapon_info_container);
      };

      spirit_mini_display.onmouseleave = function (event) {
        weapon_info_container.html("");
        weapon_info_container.hide();
      };

      avatar_container.append(spirit_mini_display);

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

      var skillset = character.skillset;

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
      var line10 = document.createElement("li");

      line1.appendChild(move_button);
      if (my_role == "gm") {
        line2.appendChild(delete_button);
        line3.appendChild(damage_button);
        line3.appendChild(damage_field);
        line8.appendChild(change_character_visibility_button);
        line9.appendChild(effect_select);
        line10.appendChild(effect_button);
      }
      line4.appendChild(search_button);
      line6.appendChild(attack_button);
      line7.appendChild(simple_roll_button);

      button_list.appendChild(line1);
      button_list.appendChild(line4);
      button_list.appendChild(line6);
      button_list.appendChild(line7);
      if (my_role == "gm") {
        button_list.appendChild(line2);
        button_list.appendChild(line3);
        button_list.appendChild(line8);
        button_list.appendChild(line9);
        button_list.appendChild(line10);
      }

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

function send_effect_command(character_number, effect_index) {
  var toSend = {};
  toSend.command = 'apply_effect';
  toSend.room_number = my_room;
  toSend.effect_number = effect_index;
  toSend.character_number = character_number;
  _wsClient2.default.sendMessage(toSend);

  alert("Вы применили эффект");
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

          if (skill_object.hasOwnProperty("cooldown")) {
            var skill_cooldown_header = $("<h2>");
            var text = "Кулдаун: " + skill_object.cooldown;
            if (character_state.special_effects[character_number].hasOwnProperty(skill_object.cooldown_object_name)) {
              text = text + " (осталось " + character_state.special_effects[character_number][skill_object.cooldown_object_name].cooldown + ")";
            } else {
              text = text + " (Готово)";
            }
            skill_cooldown_header.html(text);
            skill_description_container.append(skill_cooldown_header);
          }

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
  var calingalator_heal_roll_list = [];
  var calingalator_coin_flip = [];

  for (var i = 1; i < character_state.can_evade.length; i++) {
    var character = character_detailed_info[i];
    if (character_state.special_effects[i] !== undefined && character_state.special_effects[i] !== null) {
      if (character_state.special_effects[i].hasOwnProperty("gas_bomb_poison")) {
        save_roll[i] = roll_x(20) + parseInt(character.stamina);
      }
      calingalator_heal_roll_list[i] = roll_x(calingalator_roll_heal);
      calingalator_coin_flip[i] = roll_x(10);
    }
  }
  toSend.save_roll_list = save_roll;
  toSend.calingalator_heal_roll_list = calingalator_heal_roll_list;
  toSend.calingalator_coin_flip = calingalator_coin_flip;

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
        console.log("Бонус атаки: " + attack_bonus);
        console.log("Бонус всеобщий: " + universal_bonus);

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

    case 33:
      // Бафф Бельвет
      if (character_state.main_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell);
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 34:
      // Трансформация Бельвет
      if (character_state.special_effects[character_number].hasOwnProperty("belvet_buff_user")) {
        if (!character_state.special_effects[character_number].belvet_buff_user.hasOwnProperty("transformed")) {
          belvet_transformation(character_number, skill_index);
        } else {
          alert("Вы уже открыли свою истинную сущность - повторная трансформация невозможна!");
        }
      } else {
        alert("Вы должны сперва подготовиться к трансформации, собрав достаточно днк противников");
      }
      break;

    case 35:
      // хук
      if (!character_state.special_effects[character_number].hasOwnProperty("hook_user")) {
        if (character_state.bonus_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell);
        } else {
          alert("Не хватает действий!");
        }
      } else {
        alert("Умение все еще на кулдауне!");
      }
      break;

    case 36:
      // карающий удар
      if (!character_state.special_effects[character_number].hasOwnProperty("punishing_strike_user")) {
        if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell);
        } else {
          alert("Не хватает действий!");
        }
      } else {
        alert("Умение все еще на кулдауне!");
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
    case 33:
      belvet_buff(index, cell);
      break;

    case 35:
      hook(index, cell);
      break;

    case 36:
      punishing_strike(index, cell);
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

function hook(index, cell) {
  var user_position = character_chosen.char_position;
  if (isInRange(index, user_position, hook_range)) {
    var target_position = index;
    var user_character_number = character_chosen.char_id;
    var target_character_number = game_state.board_state[target_position];
    if (target_character_number > 0) {
      var user_coord = index_to_coordinates(user_position, game_state.size);
      var target_coord = index_to_coordinates(target_position, game_state.size);
      var updated_coord = user_coord;
      var vector = {};
      vector.x = target_coord.x - user_coord.x;
      vector.y = target_coord.y - user_coord.y;
      if (vector.x > 0) {
        updated_coord.x += 1;
      } else if (vector.x < 0) {
        updated_coord.x -= 1;
      }

      if (vector.y > 0) {
        updated_coord.y += 1;
      } else if (vector.y < 0) {
        updated_coord.y -= 1;
      }
      var toSend = {};
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id;
      toSend.room_number = my_room;
      toSend.user_index = user_character_number;
      toSend.target_id = target_character_number;
      var new_position = coord_to_index(updated_coord, game_state.size);
      if (game_state.board_state[new_position] == 0) {
        toSend.hook_possible = true;
        toSend.old_position = target_position;
        toSend.new_position = new_position;
      } else {
        toSend.hook_possible = false;
      }
      _wsClient2.default.sendMessage(toSend);
    } else {
      alert("Ваши цели за пределами моего понимания, поэтому нет");
    }
  } else {
    alert("Максимальный радиус хука - 3 клетки");
  }
}

function belvet_transformation(user_index, skill_index) {
  var user = character_detailed_info[user_index];
  var targets_set = character_state.special_effects[user_index].belvet_buff_user.targets_set;
  var total_upgrade = 0;
  var rolled_buffs_targets = [];
  var rolled_buffs_outcomes = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = targets_set[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var target_id = _step.value;

      var target = character_detailed_info[target_id];
      var target_stacks = character_state.special_effects[target_id].belvet_buff_stacks.stacks;
      var buffs_array = [];
      var rolled_array = [0, 0, 0, 0, 0];
      buffs_array.push(target.strength);
      buffs_array.push(target.stamina);
      buffs_array.push(target.agility);
      buffs_array.push(target.intelligence);
      buffs_array.push(character_state.KD_points[target_id] - 8);
      var total_roll = target.strength + target.stamina + target.agility + target.intelligence + character_state.KD_points[target_id] - 8;
      while (target_stacks > 0 && total_roll > 0) {
        var roll = roll_x(total_roll);
        if (roll <= buffs_array[0]) {
          // strength
          buffs_array[0] -= 1;
          rolled_array[0] += 1;
        } else if (roll <= buffs_array[0] + buffs_array[1]) {
          //stamina
          buffs_array[1] -= 1;
          rolled_array[1] += 1;
        } else if (roll <= buffs_array[0] + buffs_array[1] + buffs_array[2]) {
          // agility
          buffs_array[2] -= 1;
          rolled_array[2] += 1;
        } else if (roll <= buffs_array[0] + buffs_array[1] + buffs_array[2] + buffs_array[3]) {
          // intelligence
          buffs_array[3] -= 1;
          rolled_array[3] += 1;
        } else {
          // KD
          buffs_array[4] -= 1;
          rolled_array[4] += 1;
        }
        total_roll -= 1;
        target_stacks -= 1;
        total_upgrade += 1;
      }
      rolled_buffs_targets.push(target_id);
      rolled_buffs_outcomes.push(rolled_array);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var toSend = {};
  toSend.command = 'skill';
  toSend.room_number = my_room;
  toSend.skill_index = skill_index;
  toSend.user_index = user_index;
  toSend.total_upgrade = total_upgrade;
  toSend.rolled_buffs_targets = rolled_buffs_targets;
  toSend.rolled_buffs_outcomes = rolled_buffs_outcomes;
  _wsClient2.default.sendMessage(toSend);
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

function belvet_buff(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  if (isInRange(index, user_position, belvet_buff_range)) {
    var target_character_number = game_state.board_state[index];
    if (!character_state.special_effects[target_character_number].hasOwnProperty("belvet_buff_target")) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id;
      toSend.room_number = my_room;
      toSend.user_index = user_character_number;
      toSend.target_id = target_character_number;
      _wsClient2.default.sendMessage(toSend);
    } else {
      alert("На этом персонаже уже есть активный бафф этого типа (увы)");
    }
  } else {
    alert("Вы не можете баффать (хе-хе) с такого расстояния");
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

function punishing_strike(index, cell) {
  var target_character_number = game_state.board_state[index];
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]];
  var attacking_character = character_detailed_info[user_character_number];
  var stat_bonus;
  switch (weapon.type) {
    case "melee":
      stat_bonus = attacking_character.strength;
      break;
    case "ranged":
      stat_bonus = attacking_character.intelligence;
      break;
    case "energy":
      stat_bonus = attacking_character.intelligence;
      break;
    default:
      stat_bonus = 0;
  }
  console.log(stat_bonus);
  var bonus_attack = stat_bonus + character_state.attack_bonus[user_character_number] + character_state.universal_bonus[user_character_number];
  var accumulated_cover = get_accumulated_cover(index, user_position);
  var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon, accumulated_cover);
  if (toSend == null) {
    alert("Далековато");
  } else {
    if (toSend.outcome == "damage_after_evasion" || toSend.outcome == "damage_without_evasion" || toSend.outcome == "full_crit") {
      var damage_roll = toSend.damage_roll;
      var multiplyer = 1.0 - punishing_strike_multiplyer * character_state.defensive_advantage[target_character_number];
      toSend.damage_roll *= multiplyer;
    } else {
      toSend.skill_outcome = "fail";
    }
    _wsClient2.default.sendMessage(toSend);
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

function restore_hp(character_number, amount) {
  var character = character_detailed_info[character_number];
  character_state.HP[character_number] = Math.min(character_state.HP[character_number] + amount, HP_values[character.stamina]);
}

function change_character_property(property, character_number, amount) {
  character_state[property][character_number] = character_state[property][character_number] + amount;
}

function change_character_detailed_attribute(attribute, character_number, amount) {
  character_detailed_info[character_number][attribute] = parseInt(character_detailed_info[character_number][attribute]) + amount;
}

function apply_effect(character_number, effect_number) {

  effect_number = parseInt(effect_number);
  switch (effect_number) {
    case 0:
      // увеличить силу
      change_character_detailed_attribute("strength", character_number, 1);
      break;
    case 1:
      // увеличить телосложение
      change_character_detailed_attribute("stamina", character_number, 1);
      var character = character_detailed_info[character_number];
      var stamina = character.stamina;

      var hp_upgrade = HP_values[stamina] - HP_values[stamina - 1];
      change_character_property("HP", character_number, hp_upgrade);

      var stamina_upgrade = stamina_values[stamina] - stamina_values[stamina - 1];
      change_character_property("stamina", character_number, stamina_upgrade);

      break;
    case 2:
      // увеличить ловкость
      change_character_detailed_attribute("agility", character_number, 1);
      break;
    case 3:
      // увеличить интеллект
      change_character_detailed_attribute("intelligence", character_number, 1);
      break;
    case 4:
      // увеличить КД
      change_character_property("bonus_KD", character_number, 1);
      break;

    case 5:
      // уменьшить силу
      change_character_detailed_attribute("strength", character_number, -1);
      break;
    case 6:
      // уменьшить телосложение
      change_character_detailed_attribute("stamina", character_number, -1);
      var character = character_detailed_info[character_number];
      var stamina = character.stamina;
      var hp_upgrade = Math.max(HP_values[stamina] - HP_values[stamina + 1], -1 * character_state.HP[character_number] + 1);
      change_character_property("HP", character_number, hp_upgrade);

      var stamina_upgrade = Math.max(stamina_values[stamina] - stamina_values[stamina + 1], -1 * character_state.stamina[character_number] + 1);
      change_character_property("stamina", character_number, stamina_upgrade);
      break;
    case 7:
      // уменьшить ловкость
      change_character_detailed_attribute("agility", character_number, -1);
      break;
    case 8:
      // уменьшить интеллект
      change_character_detailed_attribute("intelligence", character_number, -1);
      break;
    case 9:
      // уменьшить КД
      change_character_property("bonus_KD", character_number, -1);
      break;
    default:
      console.log("Tried to apply unknown effect");
  }
}

function forced_movement(from_index, to_index, character_number) {
  game_state.board_state[to_index] = character_number;
  character_state.position[character_number] = to_index;
  game_state.board_state[from_index] = 0;

  if (!(my_role == 'player' && game_state.fog_state[to_index] == 1 || character_state.invisibility[character_number] != "all" && character_state.invisibility[character_number] != my_name)) {
    var to_cell = document.getElementById('cell_' + to_index);
    to_cell.src = get_object_picture(character_number);
  }

  if (!(my_role == 'player' && game_state.fog_state[from_index] == 1)) {
    var old_cell = document.getElementById("cell_" + from_index);
    old_cell.src = EMPTY_CELL_PIC;
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

function apply_calingalator(position, radius, flat_heal, roll_heal, heal_roll_list, coin_flip_list) {
  var candidate_cells = index_in_radius(position, radius);
  for (var i = 0; i < candidate_cells.length; i++) {
    var target_character_number = game_state.board_state[candidate_cells[i]];
    if (target_character_number > 0) {
      // персонаж в радиусе для отхила
      var character = character_detailed_info[target_character_number];
      var rolled_heal = flat_heal + heal_roll_list[target_character_number];
      restore_hp(target_character_number, rolled_heal);
      var message = character.name + " вдыхает целебные пары и восстанавливает " + rolled_heal + " хп.";
      pushToList(message);
      var coin = coin_flip_list[target_character_number];

      var note = "";
      if (character_state.special_effects[target_character_number].hasOwnProperty("calingalator_target")) {
        var stage = character_state.special_effects[target_character_number].calingalator_target.stage;
        switch (stage) {
          case 1:
            if (coin > 5) {
              character_state.special_effects[target_character_number].calingalator_target.stage = 2;
              character_state.special_effects[target_character_number].calingalator_target.duration = calingalator_poisoning_duration_stage2;
              character_state.special_effects[target_character_number].calingalator_target.penalty = calingalator_penalty_stage2;
              change_character_property("attack_bonus", target_character_number, calingalator_penalty_stage2 - calingalator_penalty_stage1);
              note = "Калингалятор вновь ударил " + character.name + " в голову. Вторая стадия отравления. Может пора остановится?..";
            } else {
              note = "На этот раз " + character.name + " избежал негативных эффектов калингалятора. Стадия остается первой.";
            }
            break;
          case 2:
            if (coin < 5) {
              //1-4 = bad roll, poisoning
              character_state.special_effects[target_character_number].calingalator_target.stage = 3;
              character_state.special_effects[target_character_number].calingalator_target.duration = calingalator_poisoning_duration_stage3;
              character_state.special_effects[target_character_number].calingalator_target.penalty = calingalator_penalty_stage3;
              change_character_property("attack_bonus", target_character_number, calingalator_penalty_stage3 - calingalator_penalty_stage2);
              change_character_property("melee_advantage", target_character_number, -1);
              change_character_property("ranged_advantage", target_character_number, -1);
              note = character.name + " стоило остановиться раньше. Теперь головокружение останется с вами надолго.";
            } else if (coin < 10) {
              // 5-9 no effect, keep rolling
              note = character.name + " ходит по очень тонкому льду. Стадия остается второй. Пока что.";
            } else {
              // You are enlightened
              character_state.special_effects[target_character_number].calingalator_target.stage = 4;
              character_state.special_effects[target_character_number].calingalator_target.duration = calingalator_poisoning_duration_enlightened;
              character_state.special_effects[target_character_number].calingalator_target.penalty = calingalator_penalty_enlightened;
              change_character_property("attack_bonus", target_character_number, calingalator_penalty_enlightened - calingalator_penalty_stage2);
              change_character_property("melee_advantage", target_character_number, 1);
              change_character_property("ranged_advantage", target_character_number, 1);
              note = "Только раз я видел такую силу... " + character.name + " достиг Просвящения и будет нести его в мир.";
            }
            break;

          case 3:
            character_state.special_effects[target_character_number].calingalator_target.duration = calingalator_poisoning_duration_stage3;
            note = character.name + " может хватит уже?";
            break;

          case 4:
            note = "Просвященный " + character.name + " продолжает делиться своим искусством. Невероятное зрелище.";
            break;

          default:
            console.log("Так преисполниться не должно быть возможно");

        }
      } else {
        if (coin > 5) {
          var calingalator_target_object = {};
          calingalator_target_object.duration = calingalator_poisoning_duration_stage1;
          calingalator_target_object.penalty = calingalator_penalty_stage1;
          calingalator_target_object.stage = 1;
          change_character_property("attack_bonus", target_character_number, calingalator_target_object.penalty);
          character_state.special_effects[target_character_number].calingalator_target = calingalator_target_object;
          note = "Калингалятор слегка ударил " + character.name + " в голову. Первая стадия отравления.";
        } else {
          note = character.name + " избежал негативных эффектов калингалятора. Виртуоз!";
        }
      }
      pushToList(note);
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
        download_board_button.show();
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

      for (var _i10 = 0; _i10 < saves_list.length; _i10++) {
        var current_option = $("<option>");
        current_option.text(saves_list[_i10]);
        current_option.val(saves_list[_i10]);
        saves_select.append(current_option);
      }
    } else if (data.command == 'construct_board_response') {
      clear_character_state();
      construct_board(data.game_state);
    } else if (data.command == 'add_character_response') {
      game_state.board_state[data.cell_id] = data.character_number;
      var character = data.character_info;
      character_detailed_info[data.character_number] = character;
      character_detailed_info[data.character_number].strength = parseInt(character.strength);
      character_detailed_info[data.character_number].stamina = parseInt(character.stamina);
      character_detailed_info[data.character_number].agility = parseInt(character.agility);
      character_detailed_info[data.character_number].intelligence = parseInt(character.intelligence);
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
      character_state.KD_points[data.character_number] = parseInt(character.KD_points);
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

      if (game_state.board_state[to_index] == 0 && game_state.board_state[from_index] == data.character_number) {
        game_state.board_state[to_index] = data.character_number;
        character_state.position[data.character_number] = to_index;

        for (var _i11 = 0; _i11 < data.invisibility_ended_id.length; _i11++) {
          var id = data.invisibility_ended_id[_i11];
          character_state.invisibility[id] = "all";

          var position = character_state.position[id];
          var to_cell = document.getElementById('cell_' + position);
          var avatar = get_object_picture(id);
          to_cell.src = avatar;
        }

        var character = character_detailed_info[data.character_number];

        if (!character.hasOwnProperty("landmine_immune")) {
          for (var _i12 = 0; _i12 < data.mines_exploded.length; _i12++) {
            var mine_position = data.mines_exploded[_i12];
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
      for (var _i13 = 0; _i13 < character_state.initiative.length; _i13++) {
        if (character_state.HP[_i13] > 0) {
          // character is present
          ordered_array.push(_i13);
        }
      }
      ordered_array.sort(compare_initiative);
      initiative_order_container.html("");

      var _loop = function _loop(_i14) {
        character = character_detailed_info[ordered_array[_i14]];
        query_string = '<img> id="initiative_image_' + _i14 + '"';
        img = $(query_string);

        img.attr('src', character.avatar);
        img.attr('height', '50px');
        img.attr('width', '50px');
        img.click(function () {
          var position = character_state.position[ordered_array[_i14]];
          var cell = document.getElementById('cell_' + position);
          //select_character(position, cell)
          no_shift_onclick(my_role, gm_control_mod, game_state, character_chosen.in_process, cell, position);
        });
        img.appendTo(initiative_order_container);
      };

      for (var _i14 = 0; _i14 < ordered_array.length; _i14++) {
        var character;
        var query_string;
        var img;

        _loop(_i14);
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
      for (var _i15 = 0; _i15 < index_list.length; _i15++) {
        game_state.zone_state[index_list[_i15]] = data.zone_number;
        game_state.search_modificator_state[index_list[_i15]] = data.modificator;
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

          for (var _i16 = 0; _i16 < data.outcome_list.length; _i16++) {
            var character_number = data.character_list[_i16];
            var character = character_detailed_info[character_number];
            if (data.outcome_list[_i16] == 0) {
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

          for (var _i17 = 0; _i17 < char_list.length; _i17++) {
            var character_number = char_list[_i17];
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

        case 33:
          // бафф бельвет
          if (game_state.battle_mod == 1) {
            change_character_property("main_action", user_index, -1);
          }
          var target_id = data.target_id;

          var buffer = character_detailed_info[user_index];
          var target = character_detailed_info[target_id];

          // Непосредственно бафф
          var belvet_buff_target_object = {};
          belvet_buff_target_object.duration = belvet_buff_skill_duration;
          belvet_buff_target_object.attack_bonus = belvet_buff_attack_bonus;
          belvet_buff_target_object.melee_advantage = belvet_buff_melee_advantage;
          belvet_buff_target_object.ranged_advantage = belvet_buff_ranged_advantage;
          character_state.special_effects[target_id].belvet_buff_target = belvet_buff_target_object;
          change_character_property("attack_bonus", target_id, belvet_buff_attack_bonus);
          change_character_property("melee_advantage", target_id, belvet_buff_melee_advantage);
          change_character_property("ranged_advantage", target_id, belvet_buff_ranged_advantage);

          // Подсчет скрытых стаков
          if (character_state.special_effects[target_id].hasOwnProperty("belvet_buff_stacks")) {
            var belvet_buff_stacks_object = character_state.special_effects[target_id].belvet_buff_stacks;
          } else {
            var belvet_buff_stacks_object = {};
            belvet_buff_stacks_object.stacks = 0;
          }
          belvet_buff_stacks_object.stacks = belvet_buff_stacks_object.stacks + 1;
          character_state.special_effects[target_id].belvet_buff_stacks = belvet_buff_stacks_object;

          // Наконец, добавляем в список целей у юзера
          if (character_state.special_effects[user_index].hasOwnProperty("belvet_buff_user")) {
            if (!character_state.special_effects[user_index].belvet_buff_user.targets_set.includes(target_id)) {
              character_state.special_effects[user_index].belvet_buff_user.targets_set.push(target_id);
            }
          } else {
            var belvet_buff_user_object = {};
            belvet_buff_user_object.targets_set = [];
            belvet_buff_user_object.targets_set.push(target_id);
            character_state.special_effects[user_index].belvet_buff_user = belvet_buff_user_object;
          }
          var message = buffer.name + " усиливает атаки " + target.name + ". Не забудьте сказать спасибо!";
          pushToList(message);
          break;

        case 34:
          // трансформация Бельвет
          var user = character_detailed_info[user_index];
          for (var j = 0; j < data.rolled_buffs_targets.length; j++) {
            var target_id = data.rolled_buffs_targets[j];
            var rolled_buffs_array = data.rolled_buffs_outcomes[j];
            var i = 0;
            while (i < 5) {
              if (rolled_buffs_array[i] > 0) {
                rolled_buffs_array[i] -= 1;
                switch (i) {
                  case 0:
                    //strength
                    apply_effect(user_index, INCREASE_STRENGTH);
                    apply_effect(target_id, DECREASE_STRENGTH);
                    break;

                  case 1:
                    apply_effect(user_index, INCREASE_STAMINA);
                    apply_effect(target_id, DECREASE_STAMINA);
                    break;

                  case 2:
                    apply_effect(user_index, INCREASE_AGILITY);
                    apply_effect(target_id, DECREASE_AGILITY);
                    break;

                  case 3:
                    apply_effect(user_index, INCREASE_INT);
                    apply_effect(target_id, DECREASE_INT);
                    break;

                  case 4:
                    apply_effect(user_index, INCREASE_KD);
                    apply_effect(target_id, DECREASE_KD);
                    break;
                }
              } else {
                i += 1;
              }
            }
          }
          character_state.special_effects[user_index].belvet_buff_user.transformed = {};
          if (user.hasOwnProperty("secondary_avatar")) {
            var temp = user.avatar;
            character_detailed_info[user_index].avatar = character_detailed_info[user_index].secondary_avatar;
            character_detailed_info[user_index].secondary_avatar = temp;
            var char_position = character_state.position[user_index];
            if (!(my_role == 'player' && game_state.fog_state[char_position] == 1 || character_state.invisibility[user_index] != "all" && character_state.invisibility[user_index] != my_name)) {
              var to_cell = document.getElementById('cell_' + char_position);
              to_cell.src = get_object_picture(user_index);
            }
          }
          var message = user.name + " открывает свою истинную сущность, получая " + data.total_upgrade + " усилений. Удачной охоты!";
          pushToList(message);
          break;

        case 35:
          // хук
          var user = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];

          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] -= 1;
          }

          var hook_user_object = {};
          hook_user_object.cooldown = hook_cooldown;
          character_state.special_effects[user_index].hook_user = hook_user_object;

          var hook_target_object = {};
          hook_target_object.duration = hook_duration;
          hook_target_object.defensive_advantage = hook_defensive_advantage;
          character_state.special_effects[data.target_id].hook_target = hook_target_object;

          character_state.defensive_advantage[data.target_id] += hook_defensive_advantage;

          if (data.hook_possible) {
            forced_movement(data.old_position, data.new_position, data.target_id);
          }

          var message = user.name + " хукает " + target.name;
          pushToList(message);

          break;

        case 36:
          // punishing_strike
          var attacker = character_detailed_info[user_index];
          var target = character_detailed_info[data.target_id];
          if (game_state.battle_mod == 1) {
            character_state.main_action[user_index] -= 1;
            character_state.bonus_action[user_index] -= 1;
          }

          var punishing_strike_user_object = {};
          punishing_strike_user_object.cooldown = punishing_strike_cooldown;
          character_state.special_effects[user_index].punishing_strike_user = punishing_strike_user_object;

          switch (data.outcome) {
            case "KD_block":
              var message = attacker.name + " пытается покарать " + target.name + " (" + data.attack_roll + "), но не пробивает броню.";
              pushToList(message);
              break;
            case "evaded":
              var message = attacker.name + " пытается покарать " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + ").";
              pushToList(message);
              if (target.special_type != 'rogue') {
                character_state.can_evade[data.target_id] = 0;
              }
              break;
            case "damage_without_evasion":
              var message = attacker.name + " применяет карающий удар к " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться, нанося " + data.damage_roll + " урона.";
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              character_state.can_evade[data.target_id] = 0;
              break;
            case "damage_after_evasion":
              var message = attacker.name + " применяет карающий удар к " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "), нанося " + data.damage_roll + " урона.";
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              character_state.can_evade[data.target_id] = 0;
              break;
            case "full_crit":
              var message = "Судный день наступил для " + target.name + ". " + attacker.name + " критически карает противника, не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона.";
              pushToList(message);
              do_damage(data.target_id, data.damage_roll);
              character_state.can_evade[data.target_id] = 0;
              break;
            case "full_cover":
              var message = attacker.name + " пытался покарать " + target.name + " но тот находится в полном укрытии.";
              pushToList(message);
              break;
            default:
              console.log("fucked up resolving punishment");
              break;
          }
          break;

        default:
          alert("Received unknown skill command");
      }
    } else if (data.command == 'new_round_response') {
      var message = "Начало нового раунда!";
      pushToList(message);

      for (var _i18 = 0; _i18 < game_state.terrain_effects.length; _i18++) {
        if (game_state.terrain_effects[_i18] !== null && game_state.terrain_effects[_i18] !== undefined) {
          switch (game_state.terrain_effects[_i18].type) {
            case "gas_bomb":
              apply_bomb(game_state.terrain_effects[_i18].position, game_state.terrain_effects[_i18].radius);
              if (game_state.terrain_effects[_i18].radius >= 4) {
                if (my_role == "gm") {
                  delete_object_command(game_state.terrain_effects[_i18].position);
                }
                game_state.terrain_effects[_i18] = null;
              } else {
                game_state.terrain_effects[_i18].radius = game_state.terrain_effects[_i18].radius + 1;
              }
              break;
            case "calingalator":
              apply_calingalator(game_state.terrain_effects[_i18].position, game_state.terrain_effects[_i18].radius, game_state.terrain_effects[_i18].flat_heal, game_state.terrain_effects[_i18].roll_heal, data.calingalator_heal_roll_list, data.calingalator_coin_flip);
              game_state.terrain_effects[_i18].duration = game_state.terrain_effects[_i18].duration - 1;
              if (game_state.terrain_effects[_i18].duration == 0) {
                if (my_role == "gm") {
                  delete_object_command(game_state.terrain_effects[_i18].position);
                }
                game_state.terrain_effects[_i18] = null;
              }
              break;
            default:
              console.log("Messed up resolving terrain effects");
              console.log(game_state.terrain_effects[_i18].type);
          }
        }
      }

      for (var _i19 = 1; _i19 < character_state.can_evade.length; _i19++) {
        character = character_detailed_info[_i19];
        if (character !== undefined && character !== null && character_state.HP[_i19] !== null && character_state.HP[_i19] > 0) {
          character_state.can_evade[_i19] = 1;
          character_state.has_moved[_i19] = 0;
          assign_moves(_i19);
          character_state.bonus_action[_i19] = bonus_action_map[character.agility];
          character_state.main_action[_i19] = main_action_map[character.agility];

          if (character_state.special_effects[_i19].hasOwnProperty("tired")) {
            // Убрать бонусы от усталости прошлого хода (чтобы когда будут накаладываться новые не штрафовать дважды)
            character_state.universal_bonus[_i19] = character_state.universal_bonus[_i19] - character_state.special_effects[_i19].tired.bonus;
          }

          if (character_state.stamina[_i19] < stamina_values[character.stamina] * 0.67) {
            if (character_state.stamina[_i19] < stamina_values[character.stamina] * 0.34) {
              if (character_state.stamina[_i19] <= 0) {
                // 3я стадия
                var tired_object = {};
                tired_object.bonus = -3;
                tired_object.stage = 3;
                character_state.special_effects[_i19].tired = tired_object;
                character_state.universal_bonus[_i19] = character_state.universal_bonus[_i19] - 3;
                character_state.move_action[_i19] = parseFloat(character_state.move_action[_i19] * 0.25);
                if (character_state.main_action[_i19] == 1 && character_state.bonus_action[_i19] == 1) {
                  character_state.bonus_action[_i19] = 0;
                } else {
                  character_state.bonus_action[_i19] = 1;
                  character_state.main_action[_i19] = 1;
                }
              } else {
                // 2я стадия
                var tired_object = {};
                tired_object.bonus = -2;
                tired_object.stage = 2;
                character_state.special_effects[_i19].tired = tired_object;
                character_state.universal_bonus[_i19] = character_state.universal_bonus[_i19] - 2;
                character_state.move_action[_i19] = parseFloat(character_state.move_action[_i19] * 0.5);
              }
            } else {
              // 1я стадия
              var tired_object = {};
              tired_object.bonus = -1;
              tired_object.stage = 1;
              character_state.special_effects[_i19].tired = tired_object;
              character_state.universal_bonus[_i19] = character_state.universal_bonus[_i19] - 1;
              character_state.move_action[_i19] = parseFloat(character_state.move_action[_i19] * 0.75);
            }
          } else if (character_state.special_effects[_i19].hasOwnProperty("tired")) {
            // не устал -> убрать устлалость если была
            delete character_state.special_effects[_i19].tired;
          }

          check_cooldown(_i19, "light_sound_bomb_user", "");
          check_cooldown(_i19, "action_splash", "");
          check_cooldown(_i19, "safety_service_user", "");
          check_cooldown(_i19, "calingalator_user", "");
          check_cooldown(_i19, "gas_bomb_user", "");
          check_cooldown(_i19, "acid_bomb_user", "");
          check_cooldown(_i19, "force_field_user", "");
          check_cooldown(_i19, "charge_user", "");
          check_cooldown(_i19, "cut_limb_user", "");
          check_cooldown(_i19, "adrenaline_user", "");
          check_cooldown(_i19, "poisonous_adrenaline_user", "");
          check_cooldown(_i19, "hook_user", "");
          check_cooldown(_i19, "punishing_strike_user", "");

          if (character_state.special_effects[_i19].hasOwnProperty("safety_service_target")) {
            if (character_state.special_effects[_i19].safety_service_target.duration == 0) {
              character_state.defensive_advantage[_i19] = character_state.defensive_advantage[_i19] - safety_service_defensive_advantage;
              character_state.evade_bonus[_i19] = character_state.evade_bonus[_i19] - safety_service_evade_bonus;
              delete character_state.special_effects[_i19].safety_service_target;
            } else {
              character_state.special_effects[_i19].safety_service_target.duration = character_state.special_effects[_i19].safety_service_target.duration - 1;
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("belvet_buff_target")) {
            if (character_state.special_effects[_i19].belvet_buff_target.duration == 0) {
              change_character_property("attack_bonus", _i19, -1 * character_state.special_effects[_i19].belvet_buff_target.attack_bonus);
              change_character_property("melee_advantage", _i19, -1 * character_state.special_effects[_i19].belvet_buff_target.melee_advantage);
              change_character_property("ranged_advantage", _i19, -1 * character_state.special_effects[_i19].belvet_buff_target.ranged_advantage);
              delete character_state.special_effects[_i19].belvet_buff_target;
            } else {
              character_state.special_effects[_i19].belvet_buff_target.duration = character_state.special_effects[_i19].belvet_buff_target.duration - 1;
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("hook_target")) {
            if (character_state.special_effects[_i19].hook_target.duration == 0) {
              change_character_property("defensive_advantage", _i19, -1 * character_state.special_effects[_i19].hook_target.defensive_advantage);
              delete character_state.special_effects[_i19].hook_target;
            } else {
              character_state.special_effects[_i19].hook_target.duration -= 1;
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("calingalator_target")) {
            if (character_state.special_effects[_i19].calingalator_target.duration == 0) {
              var reverse_penalty = character_state.special_effects[_i19].calingalator_target.penalty * -1;
              change_character_property("attack_bonus", _i19, reverse_penalty);
              if (character_state.special_effects[_i19].calingalator_target.stage == 3) {
                change_character_property("melee_advantage", _i19, 1);
                change_character_property("ranged_advantage", _i19, 1);
              } else if (character_state.special_effects[_i19].calingalator_target.stage == 4) {
                change_character_property("melee_advantage", _i19, -1);
                change_character_property("ranged_advantage", _i19, -1);
              }
              delete character_state.special_effects[_i19].calingalator_target;
            } else {
              character_state.special_effects[_i19].calingalator_target.duration = character_state.special_effects[_i19].calingalator_target.duration - 1;
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("pich_pich_user")) {
            if (character_state.special_effects[_i19].pich_pich_user.cooldown == 0) {
              delete character_state.special_effects[_i19].pich_pich_user;
              var message = "Умение Пыщ-Пыщ у " + character.name + " снова доступно.";
              pushToList(message);
            } else {
              if (character_state.special_effects[_i19].pich_pich_user.cooldown == pich_pich_cooldown) {
                character_state.bonus_action[_i19] = 0;
              }
              character_state.special_effects[_i19].pich_pich_user.cooldown = character_state.special_effects[_i19].pich_pich_user.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("pich_pich_target")) {
            var extra_actions = character_state.special_effects[_i19].pich_pich_target.extra_actions;
            while (extra_actions > 0) {
              if (extra_actions % 2 == 0) {
                character_state.move_action[_i19] = character_state.move_action[_i19] + adrenaline_move_increase;
              } else {
                character_state.main_action[_i19] = character_state.main_action[_i19] + 1;
              }
              extra_actions = extra_actions - 1;
            }
            delete character_state.special_effects[_i19].pich_pich_target;
          }

          if (character_state.special_effects[_i19].hasOwnProperty("aim")) {
            delete character_state.special_effects[_i19].aim;
          }

          if (character_state.special_effects[_i19].hasOwnProperty("adrenaline_target")) {
            var minus_actions = character_state.special_effects[_i19].adrenaline_target.minus_actions;
            while (minus_actions > 0) {
              if (minus_actions % 2 == 0) {
                character_state.move_action[_i19] = character_state.move_action[_i19] - adrenaline_move_increase;
              } else {
                character_state.main_action[_i19] = character_state.main_action[_i19] - 1;
              }
              minus_actions = minus_actions - 1;
            }
            delete character_state.special_effects[_i19].adrenaline_target;
          }

          if (character_state.special_effects[_i19].hasOwnProperty("poisonous_adrenaline_target")) {
            var turn = character_state.special_effects[_i19].poisonous_adrenaline_target.turn;
            character_state.special_effects[_i19].poisonous_adrenaline_target.turn = turn + 1;
            var extra_actions = character_state.special_effects[_i19].poisonous_adrenaline_target.extra_actions[turn];
            while (extra_actions > 0) {
              if (extra_actions % 2 == 0) {
                character_state.move_action[_i19] = character_state.move_action[_i19] + adrenaline_move_increase;
              } else {
                character_state.main_action[_i19] = character_state.main_action[_i19] + 1;
              }
              extra_actions = extra_actions - 1;
            }
            if (turn + 1 == poisonous_adrenaline_duration) {
              var character = character_detailed_info[_i19];
              var max_HP = HP_values[character.stamina];
              var max_stamina = stamina_values[character.stamina];
              var HP_cost = poisonous_adrenaline_flat_HP + parseInt(parseFloat(max_HP) * poisonous_adrenaline_percent_HP);
              var stamina_cost = poisonous_adrenaline_flat_stamina + parseInt(parseFloat(max_stamina) * poisonous_adrenaline_percent_stamina);
              character_state.HP[_i19] = character_state.HP[_i19] - HP_cost;
              character_state.stamina[_i19] = character_state.stamina[_i19] - stamina_cost;
              delete character_state.special_effects[_i19].poisonous_adrenaline_target;
              var message = "Адреналин в крови " + character.name + " заканчивается, наступает похмелье (" + HP_cost + " хп и " + stamina_cost + " выносливости)";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("shocked")) {
            if (character_state.special_effects[_i19].shocked.cooldown == 0) {
              character_state.defensive_advantage[_i19] = character_state.defensive_advantage[_i19] + 1;
              delete character_state.special_effects[_i19].shocked;
            } else {
              character_state.special_effects[_i19].shocked.cooldown = character_state.special_effects[_i19].shocked.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("cut_limb")) {
            if (character_state.special_effects[_i19].cut_limb.duration == 0) {
              delete character_state.special_effects[_i19].cut_limb;
              var message = "Сухожилия " + character.name + " восстановились.";
              pushToList(message);
            } else {
              character_state.move_action[_i19] = -10;
              character_state.special_effects[_i19].cut_limb.duration = character_state.special_effects[_i19].cut_limb.duration - 1;
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("healed")) {
            if (character_state.special_effects[_i19].healed.cooldown > 0) {
              character_state.move_action[_i19] = character_state.move_action[_i19] / 2;
              character_state.main_action[_i19] = character_state.main_action[_i19] - 1;
              character_state.bonus_action[_i19] = character_state.bonus_action[_i19] - 1;
              character_state.special_effects[_i19].healed.cooldown = character_state.special_effects[_i19].healed.cooldown - 1;
            } else {
              delete character_state.special_effects[_i19].healed;
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("blind")) {
            if (character_state.special_effects[_i19].blind.cooldown > 0) {
              character_state.special_effects[_i19].blind.cooldown = character_state.special_effects[_i19].blind.cooldown - 1;
            } else {
              delete character_state.special_effects[_i19].blind;
              character_state.ranged_advantage[_i19] = character_state.ranged_advantage[_i19] + 2;
              character_state.melee_advantage[_i19] = character_state.melee_advantage[_i19] + 1;
              var message = "Зрение " + character.name + " восстановилось";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("Markus_stacks")) {
            character_state.special_effects[_i19].Markus_stacks = character_state.special_effects[_i19].Markus_stacks - 1;
            if (character_state.special_effects[_i19].Markus_stacks == 0) {
              delete character_state.special_effects[_i19].Markus_stacks;
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("shield_up")) {
            character_state.move_action[_i19] = Math.ceil(character_state.move_action[_i19] / 2);
            character_state.stamina[_i19] = character_state.stamina[_i19] - character_state.special_effects[_i19].shield_up.stamina_cost;
            var message = character.name + " продолжает держать щит (спасибо)";
            pushToList(message);
          }
          if (character_state.special_effects[_i19].hasOwnProperty("big_bro")) {
            if (character_state.special_effects[_i19].big_bro.cooldown == 0) {
              character_state.bonus_KD[_i19] = character_state.bonus_KD[_i19] - character_state.special_effects[_i19].big_bro.bonus_KD;
              delete character_state.special_effects[_i19].big_bro;
              var message = character.name + " теряет защиту Большого Брата";
              pushToList(message);
            } else {
              character_state.special_effects[_i19].big_bro.cooldown = character_state.special_effects[_i19].big_bro.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("tobacco_strike")) {
            if (character_state.special_effects[_i19].tobacco_strike.cooldown == 0) {
              delete character_state.special_effects[_i19].tobacco_strike;
            } else {
              if (character_state.special_effects[_i19].tobacco_strike.cooldown == tobacco_strike_cooldown) {
                character_state.attack_bonus[_i19] = character_state.attack_bonus[_i19] - tobacco_strike_bonus;
              }
              character_state.special_effects[_i19].tobacco_strike.cooldown = character_state.special_effects[_i19].tobacco_strike.cooldown - 1;
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("acid_bomb_poison")) {
            if (character_state.special_effects[_i19].acid_bomb_poison.duration == 0) {
              character_state.bonus_KD[_i19] = character_state.bonus_KD[_i19] + character_state.special_effects[_i19].acid_bomb_poison.bonus_KD;
              delete character_state.special_effects[_i19].acid_bomb_poison;
              var message = "Броня " + character.name + " наконец восстановилась";
              pushToList(message);
            } else {
              character_state.special_effects[_i19].acid_bomb_poison.duration = character_state.special_effects[_i19].acid_bomb_poison.duration - 1;
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("gas_bomb_poison")) {
            var count = character_state.special_effects[_i19].gas_bomb_poison.poison_level;
            while (count > 0) {
              //character_state.move_action[i] = character_state.move_action[i] - gas_bomb_move_reduction
              if (count % 2 == 1) {
                character_state.main_action[_i19] = character_state.main_action[_i19] - 1;
              } else {
                character_state.bonus_action[_i19] = character_state.bonus_action[_i19] - 1;
              }
              count = count - 1;
            }
            var save_roll = data.save_roll_list[_i19];
            if (save_roll >= character_state.special_effects[_i19].gas_bomb_poison.threshold) {
              character_state.special_effects[_i19].gas_bomb_poison.poison_level = character_state.special_effects[_i19].gas_bomb_poison.poison_level - 1;
              var message = character.name + " успешно кидает спасбросок и уменьшает стадию отравления (теперь " + character_state.special_effects[_i19].gas_bomb_poison.poison_level + ")";
              pushToList(message);
            } else {
              var message = character.name + " проваливает спасбросок. Стадия отравления остается прежней (" + character_state.special_effects[_i19].gas_bomb_poison.poison_level + ")";
              pushToList(message);
            }
            if (character_state.special_effects[_i19].gas_bomb_poison.poison_level <= 0) {
              delete character_state.special_effects[_i19].gas_bomb_poison;
              var message = character.name + " больше не отравлен!";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i19].hasOwnProperty("meleed")) {
            if (character_state.special_effects[_i19].meleed.cooldown <= 0) {
              delete character_state.special_effects[_i19].meleed;
              character_state.ranged_advantage[_i19] = character_state.ranged_advantage[_i19] + 1;
            } else {
              character_state.special_effects[_i19].meleed.cooldown = character_state.special_effects[_i19].meleed.cooldown - 1;
            }
          }

          if (character.special_type == 'sniper') {
            var effects_object = character_state.special_effects[_i19];
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
              character_state.attack_bonus[_i19] = character_state.attack_bonus[_i19] - current_attack_bonus + new_attack_bonus;
              character_state.damage_bonus[_i19] = character_state.damage_bonus[_i19] - current_damage_bonus + new_damage_bonus;
              character_state.special_effects[_i19].sniper_passive.attack_bonus = new_attack_bonus;
              character_state.special_effects[_i19].sniper_passive.damage_bonus = new_damage_bonus;
            } else {
              var sniper_passive_object = {};
              sniper_passive_object.attack_bonus = 0;
              sniper_passive_object.damage_bonus = 0;
              character_state.special_effects[_i19].sniper_passive = sniper_passive_object;
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
    } else if (data.command == 'apply_effect_response') {
      apply_effect(data.character_number, data.effect_number);
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
        for (var _i20 = 0; _i20 < data.mines_detected.length; _i20++) {
          var mine = data.mines_detected[_i20];
          game_state.landmines.knowers[mine].push(data.player_name);
        }
      }
    }
  }
});

var create_board_button = $(CREATE_BOARD_BUTTON_SELECTOR);
create_board_button.on('click', createBoard);

var save_board_button = $(SAVE_BOARD_BUTTON_SELECTOR);
save_board_button.on('click', saveBoard);

var load_board_button = $(LOAD_BOARD_BUTTON_SELECTOR);
load_board_button.on('click', loadBoard);

var download_board_button = $(DOWNLOAD_BOARD_BUTTON_SELECTOR);
download_board_button.on('click', downloadBoard);

var roll_initiative_button = $(ROLL_INITIATIVE_BUTTON_SELECTOR);
roll_initiative_button.on('click', rollInitiative);

var fog_button = $(FOG_BUTTON_SELECTOR);
fog_button.on('click', fogModeChange);

var zone_button = $(ZONE_BUTTON_SELECTOR);
zone_button.on('click', zoneModeChange);

var chat_button = $(CHAT_BUTTON_SELECTOR);
chat_button.on('click', changeChatVisibility);

var mirror_button = $(MIRROR_BUTTON_SELECTOR);
mirror_button.on('click', mirror_board);

var next_round_button = $(NEXT_ROUND_BUTTON_SELECTOR);
next_round_button.on('click', start_new_round);

var battle_mod_button = $(BATTLE_MOD_BUTTON_SELECTOR);
battle_mod_button.on('click', change_battle_mod);

var sync_button = $(SYNC_BUTTON_SELECTOR);
sync_button.on('click', sync_board);

var landmine_button = $(LANDMINE_BUTTON_SELECTOR);
landmine_button.on('click', show_landmines);

var fog_zone_button = $(FOG_ZONE_BUTTON_SELECTOR);
fog_zone_button.on('click', fogCurrentZone);

var unfog_zone_button = $(UNFOG_ZONE_BUTTON_SELECTOR);
unfog_zone_button.on('click', unfogCurrentZone);

var zone_number_select = $(ZONE_NUMBER_SELECTOR);
for (var i = 1; i < MAX_ZONES; i++) {
  var current_option = $("<option>");
  current_option.text('Зона ' + i);
  current_option.val(i);
  zone_number_select.append(current_option);
}

var saves_select = $(SAVES_SELECT_SELECTOR);

var search_modificator = $(SEARCH_MODIFICATOR_SELECTOR);

var notifications_list = $(NOTIFICATIONS_LIST_SELECTOR);
for (var _i21 = 0; _i21 < CHAT_CASH; _i21++) {
  var current_element = $("<li>");
  current_element.attr('data-name', 'notifications_list_element_' + _i21);
  current_element.attr('class', 'notifications_list_element');
  notifications_list.append(current_element);
}

var board_size_input = $(BOARD_SIZE_INPUT_SELECTOR);

var save_name_input = $(SAVE_NAME_INPUT_SELECTOR);

var notifications_container = $(NOTIFICATIONS_CONTANER_SELECTOR);

var character_info_container = $(CHARACTER_INFO_CONTANER_SELECTOR);

var weapon_info_container = $(WEAPON_INFO_CONTANER_SELECTOR);
weapon_info_container.hide();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksbUNBQW1DLHdDQUF2QztBQUNBLElBQUksZ0NBQWdDLHFDQUFwQztBQUNBLElBQUksa0NBQWtDLHVDQUF0QztBQUNBLElBQUkscUNBQXFDLGtEQUF6Qzs7QUFFQSxJQUFJLCtCQUErQixtQ0FBbkM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLGtDQUFrQyxzQ0FBdEM7QUFDQSxJQUFJLHNCQUFzQiwwQkFBMUI7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHlCQUF5Qiw2QkFBN0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLGlDQUFpQyxxQ0FBckM7O0FBRUEsSUFBSSx3QkFBd0IsNEJBQTVCOztBQUVBLElBQUksdUJBQXVCLGtDQUEzQjtBQUNBLElBQUksOEJBQThCLGtDQUFsQzs7QUFFQSxJQUFJLDRCQUE0QixnQ0FBaEM7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7O0FBRUEsSUFBSSw4QkFBOEIsa0NBQWxDOztBQUVBLElBQUksdUJBQXVCLDJCQUEzQjtBQUNBLElBQUksK0JBQStCLG1DQUFuQztBQUNBLElBQUksdUNBQXVDLDJDQUEzQztBQUNBLElBQUksc0NBQXNDLDBDQUExQzs7QUFFQSxJQUFJ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ZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgc29ja2V0IGZyb20gJy4vd3MtY2xpZW50JztcclxuXHJcbnZhciAkID0gd2luZG93LmpRdWVyeTtcclxuXHJcbnZhciBDSEFSQUNURVJfSU5GT19DT05UQU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCJdJztcclxudmFyIFdFQVBPTl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ3ZWFwb24taW5mby1jb250YWluZXJcIl0nO1xyXG52YXIgTk9USUZJQ0FUSU9OU19DT05UQU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9ucy1jb250YWluZXJcIl0nO1xyXG52YXIgSU5JVElBVElWRV9PUkRFUl9DT05UQU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiaW5pdGlhdGl2ZS1vcmRlci1kaXNwbGF5LWNvbnRhaW5lclwiXSc7XHJcblxyXG52YXIgQ1JFQVRFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY3JlYXRlX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBTQVZFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2F2ZV9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgTE9BRF9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImxvYWRfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIFJPTExfSU5JVElBVElWRV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInJvbGxfaW5pdGlhdGl2ZV9idXR0b25cIl0nO1xyXG52YXIgRk9HX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiZm9nX2J1dHRvblwiXSc7XHJcbnZhciBaT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiem9uZV9idXR0b25cIl0nO1xyXG52YXIgQ0hBVF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImNoYXRfYnV0dG9uXCJdJztcclxudmFyIE1JUlJPUl9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm1pcnJvcl9idXR0b25cIl0nO1xyXG52YXIgTkVYVF9ST1VORF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm5leHRfcm91bmRfYnV0dG9uXCJdJztcclxudmFyIEJBVFRMRV9NT0RfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJiYXR0bGVfbW9kX2J1dHRvblwiXSc7XHJcbnZhciBTWU5DX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic3luY19idXR0b25cIl0nO1xyXG52YXIgTEFORE1JTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJsYW5kbWluZV9idXR0b25cIl0nO1xyXG52YXIgRk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJmb2dfem9uZV9idXR0b25cIl0nO1xyXG52YXIgVU5GT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInVuZm9nX3pvbmVfYnV0dG9uXCJdJztcclxudmFyIERPV05MT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiZG93bmxvYWRfYm9hcmRfYnV0dG9uXCJdJztcclxuXHJcbnZhciBTQVZFU19TRUxFQ1RfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNhdmVzX3NlbGVjdFwiXSc7XHJcblxyXG52YXIgWk9ORV9OVU1CRVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInpvbmVfbnVtYmVyX3NlbGVjdFwiXSc7XHJcbnZhciBTRUFSQ0hfTU9ESUZJQ0FUT1JfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNlYXJjaF9tb2RpZmljYXRvclwiXSc7XHJcblxyXG52YXIgQk9BUkRfU0laRV9JTlBVVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiYm9hcmRfc2l6ZV9pbnB1dFwiXSc7XHJcbnZhciBTQVZFX05BTUVfSU5QVVRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNhdmVfbmFtZV9pbnB1dFwiXSc7XHJcblxyXG52YXIgTk9USUZJQ0FUSU9OU19MSVNUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RcIl0nO1xyXG5cclxudmFyIFNLSUxMX01PREFMX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJza2lsbC1tb2RhbFwiXSc7XHJcbnZhciBTS0lMTF9NT0RBTF9DT05URU5UX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJza2lsbC1tb2RhbC1jb250ZW50XCJdJztcclxudmFyIFNLSUxMX0RFU0NSSVBUSU9OX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2tpbGwtZGVzY3JpcHRpb24tY29udGFpbmVyXCJdJztcclxudmFyIE5FWFRfUEFHRV9CVVRUT05fQ09OVEFJTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJuZXh0LXBhZ2UtYnV0dG9uLWNvbnRhaW5lclwiXSc7XHJcblxyXG52YXIgU0VSVkVSX0FERFJFU1MgPSBsb2NhdGlvbi5vcmlnaW4ucmVwbGFjZSgvXmh0dHAvLCAnd3MnKTtcclxuXHJcbnZhciBteV9uYW1lID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpKTtcclxudmFyIG15X3JvbGUgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJfcm9sZScpKTtcclxudmFyIG15X3Jvb20gPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Jvb21fbnVtYmVyJykpO1xyXG5cclxudmFyIGNoYXJhY3Rlcl9saXN0ID0gW107XHJcbnZhciBncm91cF9saXN0ID0gW107XHJcbnZhciBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyA9IFtdO1xyXG52YXIgb2JzdGFjbGVfbGlzdCA9IFtdO1xyXG52YXIgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyA9IFtdO1xyXG52YXIgd2VhcG9uX2xpc3QgPSBbXTtcclxudmFyIHdlYXBvbl9kZXRhaWxlZF9pbmZvID0gW107XHJcbnZhciBza2lsbF9saXN0ID0gW107XHJcbnZhciBza2lsbF9kZXRhaWxlZF9pbmZvO1xyXG52YXIgc2F2ZXNfbGlzdCA9IFtdO1xyXG5cclxudmFyIFRJTllfRUZGRUNUX0NMQVNTID0gJ2lzLXRpbnknO1xyXG5cclxudmFyIEVNUFRZX0NFTExfUElDID0gXCIuL2ltYWdlcy9zcXVhcmUuanBnXCI7XHJcbnZhciBaT05FX0VORFBPSU5UX1BJQyA9IFwiLi9pbWFnZXMvcmVkX2Nyb3NzLmpwZ1wiXHJcbnZhciBGT0dfSU1BR0UgPSBcIi4vaW1hZ2VzL2ZvZy53ZWJwXCI7XHJcbnZhciBRVUVTVElPTl9JTUFHRSA9IFwiLi9pbWFnZXMvcXVlc3Rpb24uanBnXCI7XHJcbnZhciBJTlZJU0VfSU1BR0UgPSBcIi4vaW1hZ2VzL3pvcnJvX21hc2suanBlZ1wiO1xyXG52YXIgQUlNX0lNQUdFID0gXCIuL2ltYWdlcy9haW0uanBnXCI7XHJcbnZhciBSSUdIVF9BUlJPV19JTUFHRSA9IFwiLi9pbWFnZXMvcmlnaHRfYXJyb3cucG5nXCI7XHJcbnZhciBBUk1PUl9JTUFHRSA9IFwiLi9pbWFnZXMvYXJtb3IuanBnXCI7XHJcbnZhciBTUElSSVRfSU1BR0UgPSBcIi4vaW1hZ2VzL2NoYWtyYS5qcGdcIjtcclxuXHJcbnZhciBNQVhfWk9ORVMgPSAyNTtcclxudmFyIENIQVRfQ0FTSCA9IDE1O1xyXG5cclxudmFyIHN0YW1pbmFfd2Vha3Nwb3RfY29zdCA9IDFcclxudmFyIHN0YW1pbmFfbW92ZV9jb3N0ID0gMFxyXG52YXIgc3RhbWluYV9hdHRhY2tfY29zdCA9IDFcclxudmFyIHB1bmNoX3JhaW5mYWxsX3N0YW1pbmFfY29zdCA9IDIgLy8gcGVyIHB1bmNoXHJcbnZhciBzdGFtaW5hX2N1dF9saW1iX2Nvc3QgPSA0XHJcbnZhciBzaGllbGRfdXBfc3RhbWluYV9jb3N0ID0gMiAvLyBwZXIgbW92ZSBJIHRoaW5rXHJcbnZhciBsb3R0ZXJ5X3Nob3Rfc3RhbWluYV9jb3N0ID0gMVxyXG52YXIgbHVja3lfc2hvdF9zdGFtaW5hX2Nvc3QgPSAxXHJcbnZhciBhY3Rpb25fc3BsYXNoX3N0YW1pbmFfY29zdCA9IDJcclxudmFyIGFkcmVuYWxpbmVfc3RhbWluYV9jb3N0ID0gM1xyXG52YXIgYWNpZF9ib21iX3N0YW1pbmFfY29zdCA9IDNcclxudmFyIGN1cnZlZF9idWxsZXRzX3N0YW1pbmFfY29zdCA9IDJcclxuXHJcbnZhciBjdXRfbGltYl9jb29sZG93biA9IDFcclxuXHJcbnZhciByZXN0X3N0YW1pbmFfZ2FpbiA9IDVcclxuXHJcbnZhciBjdXRfbGltYl9kdXJhdGlvbiA9IDFcclxudmFyIGNvb2xkb3duX2JpZ19icm8gPSAxIC8vIGR1cmF0aW9uXHJcblxyXG52YXIgc2hpZWxkX3VwX0tEID0gM1xyXG5cclxudmFyIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZSA9IDRcclxudmFyIGNoYXJnZV9tb3ZlX2luY3JlYXNlID0gNFxyXG5cclxudmFyIGdhc19ib21iX3RocmVzaG9sZCA9IDExXHJcbnZhciBnYXNfYm9tYl9tb3ZlX3JlZHVjdGlvbiA9IDJcclxudmFyIGdhc19ib21iX3N0YW1pbmFfY29zdCA9IDNcclxudmFyIGdhc19ib21iX29ic3RhY2xlID0gMTVcclxudmFyIGdhc19ib21iX3NraWxsX2Nvb2xkb3duID0gNVxyXG5cclxudmFyIGxpZ2h0X3NvdW5kX2JvbWJfcmFkaXVzID0gNFxyXG52YXIgbGlnaHRfc291bmRfYm9tYl90aHJlc2hvbGQgPSAxNVxyXG52YXIgbGlnaHRfc291bmRfYm9tYl9za2lsbF9jb29sZG93biA9IDVcclxuXHJcbnZhciB3ZWFrX3Nwb3RfdGhyZXNob2xkID0gMTVcclxuXHJcbnZhciBzaG9ja2VkX2Nvb2xkb3duID0gMFxyXG5cclxudmFyIHBpY2hfcGljaF9jb29sZG93biA9IDRcclxudmFyIHBpY2hfcGljaF9tb3ZlX2luY3JlYXNlID0gNFxyXG5cclxudmFyIGZvcmNlX2ZpZWxkX3JhZGl1cyA9IDEuNlxyXG52YXIgZm9yY2VfZmllbGRfc3RhbWluYV9jb3N0ID0gNVxyXG52YXIgZm9yY2VfZmllbGRfY29vbGRvd24gPSAxMFxyXG52YXIgZm9yY2VfZmllbGRfb2JzdGFjbGUgPSAyNFxyXG5cclxudmFyIGFjdGlvbl9zcGxhc2hfY29vbGRvd24gPSA0XHJcblxyXG52YXIgaW52aXNpYmlsaXR5X2RldGVjdGlvbl9yYWRpdXMgPSAyO1xyXG5cclxudmFyIGJpZ19icm9fcmFuZ2UgPSAyXHJcbnZhciBoZWFsX3JhbmdlID0gMVxyXG52YXIgdGhyb3dfYmFzZV9yYW5nZSA9IDJcclxudmFyIGxpZ2h0X3NvdW5kX2JvbWJfcmFuZ2UgPSA1XHJcbnZhciBmb3JjZV9maWVsZF9yYW5nZSA9IDFcclxudmFyIGFkcmVuYWxpbmVfcmFuZ2UgPSAxXHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9yYW5nZSA9IDFcclxuXHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbiA9IDJcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX2Nvb2xkb3duID0gNVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfZmxhdF9IUCA9IDVcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX2ZsYXRfc3RhbWluYSA9IDVcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX3BlcmNlbnRfSFAgPSAwLjA1XHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9wZXJjZW50X3N0YW1pbmEgPSAwLjA1XHJcblxyXG52YXIgYWRyZW5hbGluZV9jb29sZG93biA9IDRcclxuXHJcbnZhciBhY2lkX2JvbWJfZHVyYXRpb24gPSAyIC8vIDIrMSByZWFsbHlcclxudmFyIGFjaWRfYm9tYl9jb29sZG93biA9IDVcclxudmFyIGFjaWRfYm9tYl9yYWRpdXMgPSAxLjZcclxuXHJcbnZhciBtaW5lc18wX2Rpc3RhbmNlX2RhbWFnZSA9IDIwXHJcbnZhciBtaW5lc18xX2Rpc3RhbmNlX2RhbWFnZSA9IDE1XHJcbnZhciBtaW5lc18xcDVfZGlzdGFuY2VfZGFtYWdlID0gMTBcclxudmFyIGxhbmRtaW5lX2RldGVjdGlvbl9yYWRpdXMgPSAyLjlcclxudmFyIGxhbmRtaW5lX2RpZmZ1c2VfdGhyZXNob2xkID0gMTBcclxuXHJcbnZhciB0b2JhY2NvX3N0cmlrZV9ocF9wZXJjZW50YWdlID0gMC4xXHJcbnZhciB0b2JhY2NvX3N0cmlrZV9ib251cyA9IDRcclxudmFyIHRvYmFjY29fc3RyaWtlX2Nvb2xkb3duID0gMVxyXG5cclxudmFyIHNhZmV0eV9zZXJ2aWNlX3JhbmdlID0gMjtcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2Nvb2xkb3duID0gMTtcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2R1cmF0aW9uID0gMTtcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2RlZmVuc2l2ZV9hZHZhbnRhZ2UgPSAxO1xyXG52YXIgc2FmZXR5X3NlcnZpY2VfZXZhZGVfYm9udXMgPSAzO1xyXG52YXIgc2FmZXR5X3NlcnZpY2VfYm9udXNfYWN0aW9uc19jb3N0ID0gMjtcclxuXHJcbnZhciBjYWxpbmdhbGF0b3JfcmFuZ2UgPSAxLjY7XHJcbnZhciBjYWxpbmdhbGF0b3Jfb2JzdGFjbGUgPSAyNTtcclxudmFyIGNhbGluZ2FsYXRvcl9kdXJhdGlvbiA9IDM7XHJcbnZhciBjYWxpbmdhbGF0b3Jfc3RhbWluYV9jb3N0ID0gMztcclxudmFyIGNhbGluZ2FsYXRvcl9yYWRpdXMgPSAxLjY7XHJcbnZhciBjYWxpbmdhbGF0b3Jfc2tpbGxfY29vbGRvd24gPSAxMDtcclxudmFyIGNhbGluZ2FsYXRvcl9mbGF0X2hlYWwgPSA1O1xyXG52YXIgY2FsaW5nYWxhdG9yX3JvbGxfaGVhbCA9IDU7XHJcbnZhciBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMSA9IDU7XHJcbnZhciBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMiA9IDc7XHJcbnZhciBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMyA9IDEwO1xyXG52YXIgY2FsaW5nYWxhdG9yX3BvaXNvbmluZ19kdXJhdGlvbl9lbmxpZ2h0ZW5lZCA9IDEwO1xyXG52YXIgY2FsaW5nYWxhdG9yX3BlbmFsdHlfc3RhZ2UxID0gLTE7XHJcbnZhciBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTIgPSAtMjtcclxudmFyIGNhbGluZ2FsYXRvcl9wZW5hbHR5X3N0YWdlMyA9IC0zO1xyXG52YXIgY2FsaW5nYWxhdG9yX3BlbmFsdHlfZW5saWdodGVuZWQgPSAzO1xyXG5cclxudmFyIGJlbHZldF9idWZmX3JhbmdlID0gMS42O1xyXG52YXIgYmVsdmV0X2J1ZmZfc2tpbGxfZHVyYXRpb24gPSAxO1xyXG52YXIgYmVsdmV0X2J1ZmZfYXR0YWNrX2JvbnVzID0gMjtcclxudmFyIGJlbHZldF9idWZmX21lbGVlX2FkdmFudGFnZSA9IDE7XHJcbnZhciBiZWx2ZXRfYnVmZl9yYW5nZWRfYWR2YW50YWdlID0gMTtcclxuXHJcbnZhciBob29rX2Nvb2xkb3duID0gMjtcclxudmFyIGhvb2tfZHVyYXRpb24gPSAxO1xyXG52YXIgaG9va19kZWZlbnNpdmVfYWR2YW50YWdlID0gLTE7XHJcbnZhciBob29rX3JhbmdlID0gMztcclxuXHJcbnZhciBwdW5pc2hpbmdfc3RyaWtlX2Nvb2xkb3duID0gMztcclxudmFyIHB1bmlzaGluZ19zdHJpa2VfbXVsdGlwbHllciA9IDAuNTtcclxuXHJcbi8vIFRoaXMgaXMgYSBjb25zdGFudCwgd2lsbCBiZSBtb3ZlZCB0byBkYXRhYmFzZSBsYXRlclxyXG5jb25zdCBIUF92YWx1ZXMgPSBbMTUsIDMwLCA0MCwgNTUsIDc1LCAxMDAsIDEzMCwgMTY1LCAyMDUsIDI1MCwgMzAwLCAzNTUsIDQxNV07XHJcbmNvbnN0IHN0YW1pbmFfdmFsdWVzID0gWzMwLCA0NSwgNjAsIDc1LCA5MCwgMTA1LCAxMjAsIDEzNSwgMTUwLCAxNjUsIDE4MCwgMTk1XTtcclxuY29uc3Qgc3RyZW5ndGhfZGFtYWdlX21hcCA9IFstMiwgMCwgMSwgMywgNiwgMTAsIDE1LCAyMSwgMjgsIDM2LCA0NSwgNTVdXHJcbmNvbnN0IG1vdmVfYWN0aW9uX21hcCA9IFsxLCAzLCA0LCA2LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1XVxyXG5jb25zdCBib251c19hY3Rpb25fbWFwPSBbMCwgMSwgMSwgMiwgMiwgMiwgMiwgMiwgMywgMywgMywgM11cclxuY29uc3QgbWFpbl9hY3Rpb25fbWFwID0gWzEsIDEsIDEsIDEsIDEsIDEsIDIsIDIsIDIsIDIsIDIsIDNdXHJcblxyXG52YXIgZWZmZWN0X2xpc3QgPSBbXCLQo9Cy0LXQu9C40YfQuNGC0Ywg0YHQuNC70YNcIiwgXCLQo9Cy0LXQu9C40YfQuNGC0Ywg0YLQtdC70L7RgdC70L7QttC10L3QuNC1XCIsIFwi0KPQstC10LvQuNGH0LjRgtGMINC70L7QstC60L7RgdGC0YxcIiwgXCLQo9Cy0LXQu9C40YfQuNGC0Ywg0LjQvdGC0LXQu9C70LXQutGCXCIsIFwi0KPQstC10LvQuNGH0LjRgtGMINCa0JRcIiwgXCLQo9C80LXQvdGM0YjQuNGC0Ywg0YHQuNC70YNcIixcclxuXCLQo9C80LXQvdGM0YjQuNGC0Ywg0YLQtdC70L7RgdC70L7QttC10L3QuNC1XCIsIFwi0KPQvNC10L3RjNGI0LjRgtGMINC70L7QstC60L7RgdGC0YxcIiwgXCLQo9C80LXQvdGM0YjQuNGC0Ywg0LjQvdGC0LXQu9C70LXQutGCXCIsIFwi0KPQvNC10L3RjNGI0LjRgtGMINCa0JRcIl07XHJcbnZhciBJTkNSRUFTRV9TVFJFTkdUSCA9IDA7XHJcbnZhciBJTkNSRUFTRV9TVEFNSU5BID0gMTtcclxudmFyIElOQ1JFQVNFX0FHSUxJVFkgPSAyO1xyXG52YXIgSU5DUkVBU0VfSU5UID0gMztcclxudmFyIElOQ1JFQVNFX0tEID0gNDtcclxudmFyIERFQ1JFQVNFX1NUUkVOR1RIID0gNTtcclxudmFyIERFQ1JFQVNFX1NUQU1JTkEgPSA2O1xyXG52YXIgREVDUkVBU0VfQUdJTElUWSA9IDc7XHJcbnZhciBERUNSRUFTRV9JTlQgPSA4O1xyXG52YXIgREVDUkVBU0VfS0QgPSA5O1xyXG5cclxuXHJcbnZhciBDSEFSQUNURVJfU1RBVEVfQ09OU1RBTlQgPSB7SFA6IFtdLCBtYWluX2FjdGlvbjogW10sIGJvbnVzX2FjdGlvbjogW10sIG1vdmVfYWN0aW9uOiBbXSwgc3RhbWluYTogW10sIGluaXRpYXRpdmU6IFtdLCBjYW5fZXZhZGU6IFtdLCBoYXNfbW92ZWQ6IFtdLFxyXG4gIEtEX3BvaW50czogW10sIGN1cnJlbnRfd2VhcG9uOiBbXSwgdmlzaWJpbGl0eTogW10sIGludmlzaWJpbGl0eTogW10sIGF0dGFja19ib251czogW10sIGRhbWFnZV9ib251czogW10sIHVuaXZlcnNhbF9ib251czogW10sIGJvbnVzX0tEOiBbXSxcclxuICBzcGVjaWFsX2VmZmVjdHM6IFtdLCByYW5nZWRfYWR2YW50YWdlOiBbXSwgbWVsZWVfYWR2YW50YWdlOiBbXSwgZGVmZW5zaXZlX2FkdmFudGFnZTogW10sIHBvc2l0aW9uOiBbXSwgZXZhZGVfYm9udXM6IFtdLCBtZWxlZV9yZXNpc3Q6IFtdLCBidWxsZXRfcmVzaXN0OiBbXX07XHJcbmxldCBnYW1lX3N0YXRlID0ge2JvYXJkX3N0YXRlOiBbXSwgZm9nX3N0YXRlOiBbXSwgem9uZV9zdGF0ZTogW10sIHNpemU6IDAsIHNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZTogW10sIHRlcnJhaW5fZWZmZWN0czogW10sIGJhdHRsZV9tb2Q6IDAsXHJcbiAgbGFuZG1pbmVzOiB7cG9zaXRpb25zOiBbXSwga25vd2VyczogW119fTtcclxubGV0IGNoYXJhY3Rlcl9zdGF0ZSA9IENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVDtcclxuXHJcbmxldCBnbV9jb250cm9sX21vZCA9IDA7IC8vIG5vcm1hbCBtb2RlXHJcblxyXG4vLyBpbl9wcm9jZXNzOiAwID0gbm90aGluZywgMSA9IG1vdmUsIDIgPSBhdHRhY2ssIDMgPSBza2lsbFxyXG5sZXQgY2hhcmFjdGVyX2Nob3NlbiA9IHtpbl9wcm9jZXNzOiAwLCBjaGFyX2lkOiAwLCBjaGFyX3Bvc2l0aW9uOiAwLCB3ZWFwb25faWQ6IDAsIHNraWxsX2lkOiAwLCBjZWxsOiAwfTtcclxuXHJcbmxldCBsYXN0X29ic3RhY2xlID0gMTtcclxubGV0IHpvbmVfZW5kcG9pbnQgPSB7aW5kZXg6IC0xLCBjZWxsOiAwfVxyXG5cclxudmFyIGd1bnNob3RfYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9ndW5zaG90Lm1wMycpO1xyXG52YXIgc3dvcmRfYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9zd29yZC53YXYnKTtcclxudmFyIGV4cGxvc2lvbl9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL2V4cGxvc2lvbi5tcDMnKTtcclxudmFyIHN1cmlrZW5fYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9zdXJpa2VuLm1wMycpO1xyXG5cclxuZ3Vuc2hvdF9hdWRpby52b2x1bWUgPSAwLjJcclxuc3dvcmRfYXVkaW8udm9sdW1lID0gMC4yXHJcbnN1cmlrZW5fYXVkaW8udm9sdW1lID0gMC4yXHJcbmV4cGxvc2lvbl9hdWRpby52b2x1bWUgPSAwLjJcclxuXHJcbmZ1bmN0aW9uIHJlY29ubmVjdCgpIHtcclxuICBpZiAoIXNvY2tldC5pc1JlYWR5KCkpIHtcclxuICAgIHNvY2tldC5pbml0KFNFUlZFUl9BRERSRVNTKTtcclxuICAgIHNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyRGVmYXVsdCgpO1xyXG4gICAgY29uc29sZS5sb2coJ0hvcGVmdWxseSByZWNvbm5lY3RlZCAocHJheSknKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coJ1dhcyBvbmxpbmUgYW55d2F5Jyk7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdpZ25vcmVfbWUnO1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDQodC+0LfQtNCw0L3QuNC1INC00L7RgdC60LgsIG9uY2xpY2sg0LrQu9C10YLQvtC6LCBzYXZlL2xvYWRcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xyXG4gIGdhbWVfc3RhdGUuc2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRfc2l6ZVwiKS52YWx1ZTtcclxuICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLnpvbmVfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplICogZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlLnB1c2goMCk7XHJcbiAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlLnB1c2goMCk7XHJcbiAgfVxyXG4gIHNlbmRfY29uc3RydWN0X2NvbW1hbmQoZ2FtZV9zdGF0ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRCb2FyZCgpIHtcclxuICB2YXIgbmFtZSA9IHNhdmVzX3NlbGVjdC52YWwoKTtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnbG9hZF9nYW1lJztcclxuICB0b1NlbmQuc2F2ZV9uYW1lID0gbmFtZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlQm9hcmQoKSB7XHJcbiAgdmFyIHNhdmVfbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwX25hbWVcIikudmFsdWU7XHJcbiAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IHtcclxuICAgIGdhbWVfc3RhdGU6IGdhbWVfc3RhdGUsXHJcbiAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbzogY2hhcmFjdGVyX2RldGFpbGVkX2luZm8sXHJcbiAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvOiBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvLFxyXG4gICAgY2hhcmFjdGVyX3N0YXRlOiBjaGFyYWN0ZXJfc3RhdGVcclxuICB9O1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2F2ZV9nYW1lJztcclxuICB0b1NlbmQuc2F2ZV9uYW1lID0gc2F2ZV9uYW1lO1xyXG4gIHRvU2VuZC5mdWxsX2dhbWVfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGU7XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZG93bmxvYWRCb2FyZCgpIHtcclxuICB2YXIgbmFtZSA9IHNhdmVzX3NlbGVjdC52YWwoKTtcclxuICB2YXIgbGlua19uYW1lID0gXCJzYXZlcy9cIiArIG5hbWUgKyBcIi5qc29uXCI7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215X2lmcmFtZScpLnNyYyA9IGxpbmtfbmFtZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZF9jb25zdHJ1Y3RfY29tbWFuZChuZXdfZ2FtZV9zdGF0ZSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdjb25zdHJ1Y3RfYm9hcmQnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmdhbWVfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29uc3RydWN0X2JvYXJkKG5ld19nYW1lX3N0YXRlKSB7XHJcbiAgZ2FtZV9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlXHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBib2FyZF9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkLWNvbnRhaW5lclwiKTtcclxuICBib2FyZF9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICB2YXIgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XHJcbiAgYm9hcmQuY2xhc3NOYW1lID0gXCJib2FyZFwiO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICB2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG4gICAgcm93LmNsYXNzTmFtZSA9IFwiYm9hcmRfcm93XCI7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVfc3RhdGUuc2l6ZTsgaisrKSB7XHJcbiAgICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gICAgICB2YXIgY2VsbF9pZCA9IGkgKiBnYW1lX3N0YXRlLnNpemUgKyBqO1xyXG4gICAgICBidXR0b24uaWQgPSBcImNlbGxfXCIgKyBjZWxsX2lkO1xyXG4gICAgICBidXR0b24ucm93ID0gaTtcclxuICAgICAgYnV0dG9uLmNvbHVtbiA9IGo7XHJcbiAgICAgIHZhciBpbWFnZV9uYW1lID0gZm9nT3JQaWMoY2VsbF9pZCk7XHJcbiAgICAgIGJ1dHRvbi5zcmMgPSBpbWFnZV9uYW1lO1xyXG4gICAgICBidXR0b24uc3R5bGUud2lkdGggPSAnNTBweCc7XHJcbiAgICAgIGJ1dHRvbi5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XHJcbiAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAnYm9hcmRfY2VsbCc7XHJcbiAgICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICB2YXIgaW5kZXggPSBjZWxsLnJvdyAqIGdhbWVfc3RhdGUuc2l6ZSArIGNlbGwuY29sdW1uO1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgIHNoaWZ0X29uY2xpY2soaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgICBjdHJsX29uY2xpY2soaW5kZXgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vX3NoaWZ0X29uY2xpY2sobXlfcm9sZSwgZ21fY29udHJvbF9tb2QsIGdhbWVfc3RhdGUsIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcywgY2VsbCwgaW5kZXgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuICAgICAgYnV0dG9uLmRyYWdnYWJsZSA9IHRydWU7XHJcbiAgICAgIGJ1dHRvbi5vbmRyYWdvdmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGJ1dHRvbi5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gY2VsbC5yb3cgKiBnYW1lX3N0YXRlLnNpemUgKyBjZWxsLmNvbHVtbjtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdO1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfbnVtYmVyID4gMCAmJiAobXlfcm9sZSA9PSBcImdtXCIgfHwgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gMSkgJiYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gJ2FsbCcgfHwgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSBteV9uYW1lKSAmJiAobXlfcm9sZSA9PSBcImdtXCIgfHwgZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDApKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGJ1dHRvbi5vbmRyb3AgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHZhciBpbmRleCA9IGNlbGwucm93ICogZ2FtZV9zdGF0ZS5zaXplICsgY2VsbC5jb2x1bW47XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9PSAxICYmIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID09IDAgJiYgKG15X3JvbGUgPT0gXCJnbVwiIHx8IGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9PSAwKSkge1xyXG4gICAgICAgICAgbW92ZV9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHVuZG9fc2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHZhciBjZWxsX3dyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XHJcbiAgICAgIGNlbGxfd3JhcC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICBjZWxsX3dyYXAuY2xhc3NOYW1lID0gXCJjZWxsX3dyYXBcIjtcclxuXHJcbiAgICAgIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICB6b25lX3RleHQuaWQgPSBcInpvbmVfdGV4dF9cIiArIGNlbGxfaWQ7XHJcbiAgICAgIHpvbmVfdGV4dC5jbGFzc05hbWUgPSBcInpvbmVfdGV4dFwiO1xyXG4gICAgICBjZWxsX3dyYXAuYXBwZW5kQ2hpbGQoem9uZV90ZXh0KTtcclxuXHJcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsX3dyYXApO1xyXG4gICAgfVxyXG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQocm93KTtcclxuICB9XHJcbiAgYm9hcmRfY29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbm9fc2hpZnRfb25jbGljayhteV9yb2xlLCBnbV9jb250cm9sX21vZCwgZ2FtZV9zdGF0ZSwgZmllbGRfY2hvc2VuLCBjZWxsLCBpbmRleCkge1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIC8vIGdtIHNpZGVcclxuICAgIGlmIChnbV9jb250cm9sX21vZCA9PSAwKSB7XHJcbiAgICAgIC8vIHdlIGFyZSBpbiBub3JtYWwgYWRkL21vdmUgZGVsZXRlIG1vZGVcclxuICAgICAgc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCBteV9yb2xlKTtcclxuICAgIH0gZWxzZSBpZiAoZ21fY29udHJvbF9tb2QgPT0gMSkge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gZm9nIG1vZGVcclxuICAgICAgYXBwbHlGb2coaW5kZXgsIGNlbGwpO1xyXG4gICAgfSBlbHNlIGlmIChnbV9jb250cm9sX21vZCA9PSAyKSB7XHJcbiAgICAgIC8vIHdlIGFyZSBpbiB6b25lcyBtb2RlXHJcbiAgICAgIGFzc2lnblpvbmUoaW5kZXgpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBwbGF5ZXIgc2lkZVxyXG4gICAgaWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9PSAxKSB7XHJcbiAgICAgIC8vIGNsaWNrZWQgZm9nXHJcbiAgICAgIGlmIChmaWVsZF9jaG9zZW4gPT0gMSkge1xyXG4gICAgICAgIHVuZG9fc2VsZWN0aW9uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyBmb2cgZGV0ZWN0ZWQnKTtcclxuICAgICAgICBkaXNwbGF5Rm9nKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0YW5kYXJkX2NlbGxfb25DbGljayhpbmRleCwgY2VsbCwgbXlfcm9sZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaGlmdF9vbmNsaWNrKGluZGV4LCBjZWxsKSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgaWYgKGdtX2NvbnRyb2xfbW9kID09IDIpIHtcclxuICAgICAgaWYgKHpvbmVfZW5kcG9pbnQuaW5kZXggPCAwKSB7XHJcbiAgICAgICAgem9uZV9lbmRwb2ludC5pbmRleCA9IGluZGV4XHJcbiAgICAgICAgem9uZV9lbmRwb2ludC5jZWxsID0gY2VsbFxyXG4gICAgICAgIGNlbGwuc3JjID0gWk9ORV9FTkRQT0lOVF9QSUNcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbmRwb2ludF9hc3NpZ25fem9uZShpbmRleCwgem9uZV9lbmRwb2ludC5pbmRleClcclxuICAgICAgICB6b25lX2VuZHBvaW50LmNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUNcclxuICAgICAgICB6b25lX2VuZHBvaW50LmluZGV4ID0gLTFcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdhZGRfb2JzdGFjbGUnO1xyXG4gICAgICB0b1NlbmQuY2VsbF9pZCA9IGluZGV4O1xyXG4gICAgICB0b1NlbmQub2JzdGFjbGVfbnVtYmVyID0gbGFzdF9vYnN0YWNsZTtcclxuICAgICAgdG9TZW5kLm9ic3RhY2xlX25hbWUgPSBvYnN0YWNsZV9saXN0W2xhc3Rfb2JzdGFjbGUgLSAxXTtcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjdHJsX29uY2xpY2soaW5kZXgpIHtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICB2YXIgZm9nX3ZhbHVlID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgbW9kID0gMSAtIGZvZ192YWx1ZVxyXG4gICAgdmFyIHpvbmUgPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaW5kZXhdXHJcbiAgICBmb2dQYXJzZVpvbmUobW9kLCB6b25lKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCByb2xlKSB7XHJcblx0aWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID09IDApIHsgLy8gZW1wdHkgY2VsbCBjbGlja2VkXHJcblxyXG4gICAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2Vzcykge1xyXG4gICAgICBjYXNlIDA6IC8vIG5vdGhpbmdcclxuICAgICAgICBpZiAocm9sZSA9PSAnZ20nKSB7XHJcbiAgICAgICAgICBhZGRfb2JqZWN0KGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTogLy8gbW92ZVxyXG4gICAgICAgIG1vdmVfY2hhcmFjdGVyKGluZGV4LCBjZWxsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOiAvL2F0dGFja1xyXG4gICAgICAgIHN0b3BfYXR0YWNrKClcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOiAvL3NraWxsXHJcbiAgICAgICAgcGVyZm9ybV9za2lsbChpbmRleCwgY2VsbClcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJlc29sdmluZyBvbl9jbGljayBlbXB0eVwiKVxyXG4gICAgfVxyXG5cclxuXHR9IGVsc2UgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID4gMCkgeyAvLyBjaGFyYWN0ZXIgY2xpY2tlZFxyXG4gICAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2Vzcykge1xyXG4gICAgICBjYXNlIDA6IC8vIG5vdGhpbmdcclxuICAgICAgICBzZWxlY3RfY2hhcmFjdGVyKGluZGV4LCBjZWxsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxOiAvLyBtb3ZlXHJcbiAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOiAvL2F0dGFja1xyXG4gICAgICAgIHBlcmZvcm1fYXR0YWNrKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6IC8vc2tpbGxcclxuICAgICAgICBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVzb2x2aW5nIG9uX2NsaWNrIGNoYXJhY3RlclwiKVxyXG4gICAgfVxyXG5cclxuXHR9IGVsc2UgeyAvLyBvYnN0YWNsZSBjbGlja2VkXHJcblxyXG4gICAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2Vzcykge1xyXG4gICAgICBjYXNlIDA6IC8vIG5vdGhpbmdcclxuICAgICAgICBzZWxlY3Rfb2JzdGFjbGUoaW5kZXgsIGNlbGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6IC8vIG1vdmVcclxuICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6IC8vYXR0YWNrXHJcbiAgICAgICAgc3RvcF9hdHRhY2soKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6IC8vc2tpbGxcclxuICAgICAgICBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcmVzb2x2aW5nIG9uX2NsaWNrIG9ic3RhY2xlXCIpXHJcbiAgICB9XHJcblxyXG5cdH1cclxufVxyXG5cclxuLy8gWm9uZS9mb2cgcmVsYXRlZCBzdGFmZlxyXG5cclxuZnVuY3Rpb24gZW5kcG9pbnRfYXNzaWduX3pvbmUoZW5kcG9pbnQxLCBlbmRwb2ludDIpIHtcclxuICB2YXIgem9uZV9udW1iZXIgPSB6b25lX251bWJlcl9zZWxlY3QudmFsKCk7XHJcbiAgdmFyIG1vZGlmaWNhdG9yID0gc2VhcmNoX21vZGlmaWNhdG9yLnZhbCgpO1xyXG4gIHZhciBzaXplID0gZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciBpbmRleF9saXN0ID0gW11cclxuXHJcbiAgdmFyIGNvb3JkMSA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgY29vcmQyID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG5cclxuICB2YXIgdG9wX2xlZnQgPSB0b3BfbGVmdF9jb29yZChjb29yZDEsIGNvb3JkMilcclxuICB2YXIgYm90dG9tX3JpZ2h0ID0gYm90dG9tX3JpZ2h0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKVxyXG5cclxuICBmb3IgKGxldCBpID0gdG9wX2xlZnQueDsgaSA8PSBib3R0b21fcmlnaHQueDsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gdG9wX2xlZnQueTsgaiA8PSBib3R0b21fcmlnaHQueTsgaisrKSB7XHJcbiAgICAgIHZhciBjb29yZCA9IHt9XHJcbiAgICAgIGNvb3JkLnggPSBpXHJcbiAgICAgIGNvb3JkLnkgPSBqXHJcbiAgICAgIHZhciBpbmRleCA9IGNvb3JkX3RvX2luZGV4KGNvb3JkLCBzaXplKVxyXG5cclxuICAgICAgaW5kZXhfbGlzdC5wdXNoKGluZGV4KVxyXG4gICAgICB2YXIgem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3pvbmVfdGV4dF8nICsgaW5kZXgpO1xyXG4gICAgICB6b25lX3RleHQuaW5uZXJIVE1MID0gem9uZV9udW1iZXIgKyAnKCcgKyBtb2RpZmljYXRvciArICcpJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhc3NpZ25fem9uZSc7XHJcbiAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgdG9TZW5kLmluZGV4X2xpc3QgPSBpbmRleF9saXN0O1xyXG4gIHRvU2VuZC5tb2RpZmljYXRvciA9IG1vZGlmaWNhdG9yO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzc2lnblpvbmUoaW5kZXgpIHtcclxuICB2YXIgem9uZV9udW1iZXIgPSB6b25lX251bWJlcl9zZWxlY3QudmFsKCk7XHJcbiAgdmFyIG1vZGlmaWNhdG9yID0gc2VhcmNoX21vZGlmaWNhdG9yLnZhbCgpO1xyXG5cclxuICB2YXIgem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3pvbmVfdGV4dF8nICsgaW5kZXgpO1xyXG4gIHpvbmVfdGV4dC5pbm5lckhUTUwgPSB6b25lX251bWJlciArICcoJyArIG1vZGlmaWNhdG9yICsgJyknO1xyXG5cclxuICB2YXIgaW5kZXhfbGlzdCA9IFtdXHJcbiAgaW5kZXhfbGlzdC5wdXNoKGluZGV4KVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnYXNzaWduX3pvbmUnO1xyXG4gIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gIHRvU2VuZC5pbmRleF9saXN0ID0gaW5kZXhfbGlzdDtcclxuICB0b1NlbmQubW9kaWZpY2F0b3IgPSBtb2RpZmljYXRvcjtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseUZvZyhpbmRleCwgY2VsbCkge1xyXG5cdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPT0gMSkge1xyXG5cdFx0Ly8gc2VuZCB1cGRhdGUgbWVzc2FnZVxyXG5cdFx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdFx0dG9TZW5kLmNvbW1hbmQgPSAndXBkYXRlX2ZvZyc7XHJcblx0XHR0b1NlbmQudXBkYXRlX3R5cGUgPSAncmVtb3ZlJztcclxuXHRcdHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuXHRcdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQvLyBzZW5kIHVwZGF0ZSBtZXNzYWdlXHJcblx0XHR2YXIgdG9TZW5kID0ge307XHJcblx0XHR0b1NlbmQuY29tbWFuZCA9ICd1cGRhdGVfZm9nJztcclxuXHRcdHRvU2VuZC51cGRhdGVfdHlwZSA9ICdhZGQnO1xyXG5cdFx0dG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG5cdFx0c29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dNb2RlQ2hhbmdlKCkge1xyXG4gIGlmIChnbV9jb250cm9sX21vZCAhPSAxKSB7XHJcbiAgICAvLyB0dXJuIG9uIGZvZyBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAxO1xyXG4gICAgZm9nX2J1dHRvbi50ZXh0KCfQktGL0LrQuyDQotGD0LzQsNC9INCS0L7QudC90YsnKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpXSA9PSAxKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfY2VsbC5zcmMgPSBGT0dfSU1BR0U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gdHVybiBvZmYgZm9nIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDA7XHJcbiAgICBmb2dfYnV0dG9uLnRleHQoJ9CS0LrQuyDQotGD0LzQsNC9INCS0L7QudC90YsnKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpXSA9PSAxKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfY2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHpvbmVNb2RlQ2hhbmdlKCkge1xyXG4gIGlmIChnbV9jb250cm9sX21vZCAhPSAyKSB7XHJcbiAgICAvLyB0dXJuIG9uIHpvbmUgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMjtcclxuICAgIHpvbmVfYnV0dG9uLnRleHQoJ9CS0YvQutC7INCX0L7QvdCw0LvRjNC90YvQuSDRgNC10LbQuNC8Jyk7XHJcbiAgICB6b25lX251bWJlcl9zZWxlY3Quc2hvdygpO1xyXG4gICAgZm9nX3pvbmVfYnV0dG9uLnNob3coKTtcclxuICAgIHVuZm9nX3pvbmVfYnV0dG9uLnNob3coKTtcclxuICAgIHNlYXJjaF9tb2RpZmljYXRvci5zaG93KCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpXSA+IDApIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF96b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmVfdGV4dF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfem9uZV90ZXh0LmlubmVySFRNTCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpXSArICcoJyArIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2ldICsgJyknO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIGJhY2sgdG8gbm9ybWFsIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMDtcclxuICAgIHpvbmVfYnV0dG9uLnRleHQoJ9CS0LrQuyDQl9C+0L3QsNC70YzQvdGL0Lkg0YDQtdC20LjQvCcpO1xyXG4gICAgem9uZV9udW1iZXJfc2VsZWN0LmhpZGUoKTtcclxuICAgIGZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcbiAgICB1bmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcbiAgICBzZWFyY2hfbW9kaWZpY2F0b3IuaGlkZSgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25lX3RleHRfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X3pvbmVfdGV4dC5pbm5lckhUTUwgPSAnJztcclxuXHRcdH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ0N1cnJlbnRab25lKCkge1xyXG4gIHZhciBjdXJyZW50X3pvbmUgPSB6b25lX251bWJlcl9zZWxlY3QudmFsKCk7XHJcbiAgZm9nUGFyc2Vab25lKDEsIGN1cnJlbnRfem9uZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuZm9nQ3VycmVudFpvbmUoKSB7XHJcbiAgZm9nUGFyc2Vab25lKDAsIGN1cnJlbnRfem9uZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ1BhcnNlWm9uZShtb2QsIGN1cnJlbnRfem9uZSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICd1cGRhdGVfZm9nJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIGlmIChtb2QgPT0gMCkge1xyXG4gICAgdG9TZW5kLnVwZGF0ZV90eXBlID0gJ3JlbW92ZSc7XHJcbiAgfSBlbHNlIGlmIChtb2QgPT0gMSkge1xyXG4gICAgdG9TZW5kLnVwZGF0ZV90eXBlID0gJ2FkZCc7XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplICogZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIGlmIChnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaV0gPT0gY3VycmVudF96b25lKSB7XHJcbiAgICAgIHRvU2VuZC5pbmRleCA9IGk7XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gSGVscGVyIGNvb3JkaW5hdGUgcmVsYXRlZCBmdW5jdGlvbnNcclxuXHJcbmZ1bmN0aW9uIHRvcF9sZWZ0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKSB7XHJcbiAgdmFyIHRvUmV0ID0ge31cclxuICB0b1JldC54ID0gTWF0aC5taW4oY29vcmQxLngsIGNvb3JkMi54KVxyXG4gIHRvUmV0LnkgPSBNYXRoLm1pbihjb29yZDEueSwgY29vcmQyLnkpXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJvdHRvbV9yaWdodF9jb29yZChjb29yZDEsIGNvb3JkMikge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGgubWF4KGNvb3JkMS54LCBjb29yZDIueClcclxuICB0b1JldC55ID0gTWF0aC5tYXgoY29vcmQxLnksIGNvb3JkMi55KVxyXG4gIHJldHVybiB0b1JldFxyXG59XHJcblxyXG5mdW5jdGlvbiBjb29yZF90b19pbmRleChjb29yZCwgc2l6ZSkge1xyXG4gIHZhciBpbmRleCA9IGNvb3JkLnggKiBzaXplICsgY29vcmQueVxyXG4gIHJldHVybiBpbmRleFxyXG59XHJcblxyXG5mdW5jdGlvbiBpbmRleF90b19jb29yZGluYXRlcyhpbmRleCwgc2l6ZSkge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGguZmxvb3IoaW5kZXgvc2l6ZSlcclxuICB0b1JldC55ID0gaW5kZXggJSBzaXplXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmREaXN0YW5jZShpbmRleDEsIGluZGV4Mikge1xyXG4gIHZhciB4MSA9IE1hdGguZmxvb3IoaW5kZXgxL2dhbWVfc3RhdGUuc2l6ZSlcclxuICB2YXIgeTEgPSBpbmRleDEgJSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIHgyID0gTWF0aC5mbG9vcihpbmRleDIvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MiA9IGluZGV4MiAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgZGlzdGFuY2Vfc3F1YXJlZCA9ICh4MS14MikqKHgxLXgyKSArICh5MS15MikqKHkxLXkyKVxyXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChkaXN0YW5jZV9zcXVhcmVkKVxyXG4gIHJldHVybiBwYXJzZUZsb2F0KGRpc3RhbmNlKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0luUmFuZ2UoaW5kZXgxLCBpbmRleDIsIHJhbmdlKSB7XHJcbiAgdmFyIHgxID0gTWF0aC5mbG9vcihpbmRleDEvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MSA9IGluZGV4MSAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgeDIgPSBNYXRoLmZsb29yKGluZGV4Mi9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkyID0gaW5kZXgyICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciBkaXN0YW5jZSA9ICh4MS14MikqKHgxLXgyKSArICh5MS15MikqKHkxLXkyKVxyXG4gIHJldHVybiBkaXN0YW5jZSA8PSByYW5nZSpyYW5nZVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhbmdlKSB7XHJcbiAgdmFyIHNpemUgPSBnYW1lX3N0YXRlLnNpemVcclxuICB2YXIgeCA9IE1hdGguZmxvb3IoaW5kZXgvc2l6ZSlcclxuICB2YXIgeSA9IGluZGV4ICUgc2l6ZVxyXG4gIHZhciBjYW5kaWRhdGVfaW5kZXhfbGlzdCA9IFtdXHJcblxyXG4gIC8vY29uc29sZS5sb2coXCJ4OiBcIiArIHggKyBcIiB5OiBcIiArIHkgKyBcIiBpbmRleDogXCIgKyBpbmRleClcclxuXHJcbiAgZm9yIChsZXQgaSA9IE1hdGguZmxvb3IoLTEgKiByYW5nZSk7IGkgPD0gTWF0aC5jZWlsKHJhbmdlKTsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gTWF0aC5mbG9vcigtMSAqIHJhbmdlKTsgaiA8PSBNYXRoLmNlaWwocmFuZ2UpOyBqKyspIHtcclxuICAgICAgdmFyIGNhbmRfeCA9IHggKyBpXHJcbiAgICAgIHZhciBjYW5kX3kgPSB5ICsgalxyXG4gICAgICAvL2NvbnNvbGUubG9nKFwiY2FuZF94OiBcIiArIGNhbmRfeCArIFwiIGNhbmRfeTogXCIgKyBjYW5kX3kpXHJcbiAgICAgIGlmIChjYW5kX3ggPj0wICYmIGNhbmRfeCA8IHNpemUgJiYgY2FuZF95ID49MCAmJiBjYW5kX3kgPCBzaXplKSB7XHJcbiAgICAgICAgdmFyIGNhbmRfaW5kZXggPSBjYW5kX3gqc2l6ZSArIGNhbmRfeVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJjYW5kX2luZGV4OiBcIiArIGNhbmRfaW5kZXgpXHJcbiAgICAgICAgaWYgKGlzSW5SYW5nZShpbmRleCwgY2FuZF9pbmRleCwgcmFuZ2UpKSB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FuZF9pbmRleDogXCIgKyBjYW5kX2luZGV4ICsgXCJ3YXMgY29uc2lkZXJlZCBpbiByYW5nZVwiKVxyXG4gICAgICAgICAgY2FuZGlkYXRlX2luZGV4X2xpc3QucHVzaChjYW5kX2luZGV4KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY2FuZGlkYXRlX2luZGV4X2xpc3RcclxufVxyXG5cclxuZnVuY3Rpb24gbGluZV9mcm9tX2VuZHBvaW50cyhwb2ludDEsIHBvaW50Mikge1xyXG4gIHZhciBsaW5lID0ge31cclxuICBsaW5lLmEgPSAtMSoocG9pbnQxLnkgLSBwb2ludDIueSlcclxuICBsaW5lLmIgPSBwb2ludDEueCAtIHBvaW50Mi54XHJcbiAgbGluZS5jID0gLTEqKGxpbmUuYSAqIHBvaW50Mi54ICsgbGluZS5iICogcG9pbnQyLnkpXHJcbiAgcmV0dXJuIGxpbmVcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzdGFuY2VfdG9fbGluZShlbmRwb2ludDEsIGVuZHBvaW50Miwgc2l6ZSwgdGVzdHBvaW50KSB7XHJcbiAgdmFyIGVuZHBvaW50MV9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgZW5kcG9pbnQyX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG4gIHZhciB0ZXN0cG9pbnRfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyh0ZXN0cG9pbnQsIHNpemUpXHJcblxyXG4gIHZhciBsaW5lID0gbGluZV9mcm9tX2VuZHBvaW50cyhlbmRwb2ludDFfY29vcmQsIGVuZHBvaW50Ml9jb29yZClcclxuICBjb25zb2xlLmxvZyhsaW5lKVxyXG4gIGNvbnNvbGUubG9nKHRlc3Rwb2ludF9jb29yZClcclxuXHJcbiAgdmFyIGRpc3RhbmNlID0gTWF0aC5hYnMobGluZS5hKnRlc3Rwb2ludF9jb29yZC54ICsgbGluZS5iKnRlc3Rwb2ludF9jb29yZC55ICsgbGluZS5jKS9NYXRoLnNxcnQobGluZS5hKmxpbmUuYSArIGxpbmUuYipsaW5lLmIpXHJcblxyXG4gIGNvbnNvbGUubG9nKGRpc3RhbmNlKVxyXG4gIHJldHVybiBkaXN0YW5jZVxyXG59XHJcblxyXG5mdW5jdGlvbiBjZWxsc19vbl9saW5lKGVuZHBvaW50MSwgZW5kcG9pbnQyLCBzaXplKSB7XHJcbiAgdmFyIGVuZHBvaW50MV9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgZW5kcG9pbnQyX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG4gIHZhciBsaW5lID0gbGluZV9mcm9tX2VuZHBvaW50cyhlbmRwb2ludDFfY29vcmQsIGVuZHBvaW50Ml9jb29yZClcclxuXHJcbiAgdmFyIHNjYWxlID0gTWF0aC5tYXgoTWF0aC5hYnMobGluZS5hKSwgTWF0aC5hYnMobGluZS5iKSlcclxuICAvLyBuZWVkIHRvIGJlIHJldmVyc2VkISByZW1lbWJlciBsaW5lLmEgPSBkZWx0YSB5XHJcbiAgdmFyIHhfc3RlcCA9IGxpbmUuYi9zY2FsZVxyXG4gIHZhciB5X3N0ZXAgPSAtMSpsaW5lLmEvc2NhbGVcclxuICB2YXIgY3VycmVudF9wb2ludCA9IGVuZHBvaW50Ml9jb29yZFxyXG5cclxuICB2YXIgc2FmZXR5X2l0ZXIgPSAwXHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IFtdXHJcbiAgd2hpbGUgKE1hdGguYWJzKGN1cnJlbnRfcG9pbnQueCAtIGVuZHBvaW50MV9jb29yZC54KSA+IDAuNSB8fCBNYXRoLmFicyhjdXJyZW50X3BvaW50LnkgLSBlbmRwb2ludDFfY29vcmQueSkgPiAwLjUpIHtcclxuICAgIHZhciBjZWlsID0ge31cclxuICAgIGNlaWwueCA9IE1hdGguY2VpbChjdXJyZW50X3BvaW50LngpXHJcbiAgICBjZWlsLnkgPSBNYXRoLmNlaWwoY3VycmVudF9wb2ludC55KVxyXG4gICAgdmFyIGNlaWxfaW5kZXggPSBjb29yZF90b19pbmRleChjZWlsLCBzaXplKVxyXG5cclxuICAgIHZhciBmbG9vciA9IHt9XHJcbiAgICBmbG9vci54ID0gTWF0aC5mbG9vcihjdXJyZW50X3BvaW50LngpXHJcbiAgICBmbG9vci55ID0gTWF0aC5mbG9vcihjdXJyZW50X3BvaW50LnkpXHJcbiAgICB2YXIgZmxvb3JfaW5kZXggPSBjb29yZF90b19pbmRleChmbG9vciwgc2l6ZSlcclxuXHJcblxyXG4gICAgY2FuZGlkYXRlX2NlbGxzLnB1c2goY2VpbF9pbmRleClcclxuICAgIGlmIChjZWlsX2luZGV4ICE9IGZsb29yX2luZGV4KSB7XHJcbiAgICAgIGNhbmRpZGF0ZV9jZWxscy5wdXNoKGZsb29yX2luZGV4KVxyXG4gICAgfVxyXG5cclxuICAgIGN1cnJlbnRfcG9pbnQueCA9IGN1cnJlbnRfcG9pbnQueCAgKyB4X3N0ZXBcclxuICAgIGN1cnJlbnRfcG9pbnQueSA9IGN1cnJlbnRfcG9pbnQueSAgKyB5X3N0ZXBcclxuICAgIHNhZmV0eV9pdGVyID0gc2FmZXR5X2l0ZXIgKyAxXHJcbiAgICBpZiAoc2FmZXR5X2l0ZXIgPiA1MCkge1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKGNhbmRpZGF0ZV9jZWxscylcclxuICByZXR1cm4gY2FuZGlkYXRlX2NlbGxzXHJcbn1cclxuXHJcbi8vIGFuaW1hdGlvbnMsIGNvbnRhaW5lciBtYWludGFuY2VcclxuXHJcbmZ1bmN0aW9uIGNsZWFyX2NvbnRhaW5lcnMoKSB7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICB3ZWFwb25faW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0aW55X2FuaW1hdGVfY29udGFpbmVycygpIHtcclxuICB0aW55X2FuaW1hdGlvbihjaGFyYWN0ZXJfaW5mb19jb250YWluZXIpO1xyXG4gIHRpbnlfYW5pbWF0aW9uKHdlYXBvbl9pbmZvX2NvbnRhaW5lcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcikge1xyXG4gIGNvbnRhaW5lci5hZGRDbGFzcyhUSU5ZX0VGRkVDVF9DTEFTUyk7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcyhUSU5ZX0VGRkVDVF9DTEFTUyk7XHJcbiAgfSwgNTApO1xyXG59XHJcblxyXG4vLyBhZGRpbmcgb2JqZWN0cywgY2hhcmFjdGVyc1xyXG5cclxuZnVuY3Rpb24gYWRkX29iamVjdChib2FyZF9pbmRleCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgYnV0dG9uX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgYnV0dG9uX2NvbnRhaW5lci5jbGFzc05hbWUgPSBcImFkZC1vYmplY3QtYnV0dG9uLWNvbnRhaW5lclwiO1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9jaGFyYWN0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbl9hZGRfY2hhcmFjdGVyLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9C10YDRgdC+0L3QsNC20LBcIjtcclxuICBidXR0b25fYWRkX2NoYXJhY3Rlci5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9vYnN0YWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uX2FkZF9vYnN0YWNsZS5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0Ywg0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVwiO1xyXG4gIGJ1dHRvbl9hZGRfb2JzdGFjbGUub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgYWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfY2hhcmFjdGVyKTtcclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfb2JzdGFjbGUpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uX2NvbnRhaW5lcik7XHJcblxyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIG9ic3RhY2xlX251bWJlcikge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhZGRfb2JzdGFjbGUnO1xyXG4gIHRvU2VuZC5jZWxsX2lkID0gaW5kZXg7XHJcbiAgdG9TZW5kLm9ic3RhY2xlX251bWJlciA9IG9ic3RhY2xlX251bWJlciArIDE7XHJcbiAgdG9TZW5kLm9ic3RhY2xlX25hbWUgPSBvYnN0YWNsZV9saXN0W29ic3RhY2xlX251bWJlcl07XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNlbGVjdC5pZCA9IFwib2JzdGFjbGVfY2hvc2VuXCI7XHJcbiAgc2VsZWN0LmNsYXNzTmFtZSA9IFwib2JqZWN0X3NlbGVjdFwiXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgb2JzdGFjbGVfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IG9ic3RhY2xlX2xpc3RbaV07XHJcbiAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG4gIGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG4gIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcbiAgICB2YXIgb2JzdGFjbGVfbnVtYmVyID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvYnN0YWNsZV9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuICAgIGFkZF9vYnN0YWNsZV9jb21tYW5kKGJ1dHRvbi5ib2FyZF9pbmRleCwgb2JzdGFjbGVfbnVtYmVyKVxyXG5cclxuICAgIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gIH1cclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzZWxlY3QpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uKTtcclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNlbGVjdC5pZCA9IFwiY2hhcmFjdGVyX2Nob3NlblwiO1xyXG4gIHNlbGVjdC5jbGFzc05hbWUgPSBcIm9iamVjdF9zZWxlY3RcIlxyXG5cclxuICB2YXIgcGxheWVyc19vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBwbGF5ZXJzX29wdGdyb3VwLmlkID0gXCJwbGF5ZXJzX29wdGdyb3VwXCJcclxuICBwbGF5ZXJzX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBwbGF5ZXJzX29wdGdyb3VwLmxhYmVsID0gXCLQmNCz0YDQvtC60LhcIlxyXG5cclxuICB2YXIgcGVuZ3Vpbl9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBwZW5ndWluX29wdGdyb3VwLmlkID0gXCJwZW5ndWluX29wdGdyb3VwXCJcclxuICBwZW5ndWluX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBwZW5ndWluX29wdGdyb3VwLmxhYmVsID0gXCLQn9C40L3Qs9Cy0LjQvdGLXCJcclxuXHJcbiAgdmFyIHNoaWVsZF9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBzaGllbGRfb3B0Z3JvdXAuaWQgPSBcInNoaWVsZF9vcHRncm91cFwiXHJcbiAgc2hpZWxkX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBzaGllbGRfb3B0Z3JvdXAubGFiZWwgPSBcItCh0LrQstCw0LTQvtCy0YbRi1wiXHJcblxyXG4gIHZhciBzd29yZF9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBzd29yZF9vcHRncm91cC5pZCA9IFwic3dvcmRfb3B0Z3JvdXBcIlxyXG4gIHN3b3JkX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBzd29yZF9vcHRncm91cC5sYWJlbCA9IFwi0JzQtdGH0LhcIlxyXG5cclxuICB2YXIgbXV0YW50X29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIG11dGFudF9vcHRncm91cC5pZCA9IFwibXV0YW50X29wdGdyb3VwXCJcclxuICBtdXRhbnRfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIG11dGFudF9vcHRncm91cC5sYWJlbCA9IFwi0JzRg9GC0LDQvdGC0YtcIlxyXG5cclxuICB2YXIgYW5pbWFfb3B0Z3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0Z3JvdXBcIik7XHJcbiAgYW5pbWFfb3B0Z3JvdXAuaWQgPSBcImFuaW1hX29wdGdyb3VwXCJcclxuICBhbmltYV9vcHRncm91cC5jbGFzc05hbWUgPSBcImNoYXJhY3Rlcl9vcHRncm91cFwiXHJcbiAgYW5pbWFfb3B0Z3JvdXAubGFiZWwgPSBcItCX0LLQtdGA0LhcIlxyXG5cclxuICB2YXIgb3RoZXJfb3B0Z3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0Z3JvdXBcIik7XHJcbiAgb3RoZXJfb3B0Z3JvdXAuaWQgPSBcIm90aGVyX29wdGdyb3VwXCJcclxuICBvdGhlcl9vcHRncm91cC5jbGFzc05hbWUgPSBcImNoYXJhY3Rlcl9vcHRncm91cFwiXHJcbiAgb3RoZXJfb3B0Z3JvdXAubGFiZWwgPSBcItCe0YHRgtCw0LvRjNC90YvQtVwiXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBjaGFyYWN0ZXJfbGlzdFtpXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaTtcclxuICAgIHZhciBjaGFyYWN0ZXJfZ3JvdXAgPSBncm91cF9saXN0W2ldXHJcbiAgICBzd2l0Y2goY2hhcmFjdGVyX2dyb3VwKSB7XHJcbiAgICAgIGNhc2UgXCJwbGF5ZXJcIjpcclxuICAgICAgICBwbGF5ZXJzX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInBlbmd1aW5cIjpcclxuICAgICAgICBwZW5ndWluX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNoaWVsZFwiOlxyXG4gICAgICAgIHNoaWVsZF9vcHRncm91cC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJzd29yZFwiOlxyXG4gICAgICAgIHN3b3JkX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIm11dGFudFwiOlxyXG4gICAgICAgIG11dGFudF9vcHRncm91cC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJhbmltYVwiOlxyXG4gICAgICAgIGFuaW1hX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBvdGhlcl9vcHRncm91cC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbi5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0YxcIjtcclxuICBidXR0b24uYm9hcmRfaW5kZXggPSBib2FyZF9pbmRleDtcclxuICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlcl9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9jaGFyYWN0ZXInO1xyXG4gICAgdG9TZW5kLmNlbGxfaWQgPSBidXR0b24uYm9hcmRfaW5kZXg7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXIgKyAxO1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gY2hhcmFjdGVyX2xpc3RbY2hhcmFjdGVyX251bWJlcl07XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgY2xlYXJfY29udGFpbmVycygwKVxyXG4gIH1cclxuXHJcbiAgc2VsZWN0LmFwcGVuZChwbGF5ZXJzX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKHNoaWVsZF9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChzd29yZF9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChtdXRhbnRfb3B0Z3JvdXApO1xyXG4gIHNlbGVjdC5hcHBlbmQoYW5pbWFfb3B0Z3JvdXApO1xyXG4gIHNlbGVjdC5hcHBlbmQocGVuZ3Vpbl9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChvdGhlcl9vcHRncm91cCk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzZWxlY3QpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uKTtcclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG4vLyBQaWN0dXJlL2F2YXRhciBtYW5hZ2VtZW50XHJcblxyXG5mdW5jdGlvbiBzcGlyaXRfaW1hZ2UoY2hhcmFjdGVyX251bWJlcikge1xyXG4gIHJldHVybiBTUElSSVRfSU1BR0U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFybW9yX2ltYWdlKGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICByZXR1cm4gQVJNT1JfSU1BR0U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ09yUGljKGNlbGxfaWQpIHtcclxuICB2YXIgcGljdHVyZV9uYW1lID0gRk9HX0lNQUdFO1xyXG4gIGlmICgoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbY2VsbF9pZF0gIT0gMSl8fChteV9yb2xlID09ICdnbScpKSB7XHJcbiAgICB2YXIgY2hhcl9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2VsbF9pZF1cclxuICAgIHBpY3R1cmVfbmFtZSA9IGdldF9vYmplY3RfcGljdHVyZShjaGFyX2lkKTtcclxuICAgIGlmIChjaGFyX2lkID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJfaWRdICE9IFwiYWxsXCIgJiYgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyX2lkXSAhPSBteV9uYW1lKSB7XHJcbiAgICAgIHBpY3R1cmVfbmFtZSA9IGdldF9vYmplY3RfcGljdHVyZSgwKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG4gIHJldHVybiBwaWN0dXJlX25hbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlGb2coKSB7XHJcblx0Y2xlYXJfY29udGFpbmVycygpXHJcblxyXG5cdHZhciBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgaW5mby5pbm5lckhUTUwgPSAn0JzRiyDQvdC1INC30L3QsNC10LwsINGH0YLQviDRjdGC0L4g0YLQsNC60L7QtS4g0JXRgdC70Lgg0LHRiyDQvNGLINC30L3QsNC70Lgg0YfRgtC+INGN0YLQviDRgtCw0LrQvtC1LCDQvdC+INC80Ysg0L3QtSDQt9C90LDQtdC8Lic7XHJcblxyXG5cdHZhciBmb2dfcGljdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgZm9nX3BpY3R1cmUuc3JjID0gUVVFU1RJT05fSU1BR0U7XHJcbiAgZm9nX3BpY3R1cmUuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGZvZ19waWN0dXJlLnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG5cdGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoaW5mbyk7XHJcblx0Y2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChmb2dfcGljdHVyZSk7XHJcblxyXG50aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldF9vYmplY3RfcGljdHVyZShpbmRleF9pbl9ib2FyZF9zdGF0ZSkge1xyXG4gIHZhciBpbWFnZSA9IEVNUFRZX0NFTExfUElDO1xyXG4gIHZhciBpbmRleF9pbl9iYXNlO1xyXG4gIGlmIChpbmRleF9pbl9ib2FyZF9zdGF0ZSA+IDApIHtcclxuICAgIGluZGV4X2luX2Jhc2UgPSBpbmRleF9pbl9ib2FyZF9zdGF0ZTtcclxuICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpbmRleF9pbl9iYXNlXTtcclxuICAgIGlmIChjaGFyYWN0ZXIuaGFzT3duUHJvcGVydHkoXCJjaGliaV9hdmF0YXJcIikpIHtcclxuICAgICAgaW1hZ2UgPSBjaGFyYWN0ZXIuY2hpYmlfYXZhdGFyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW1hZ2UgPSBjaGFyYWN0ZXIuYXZhdGFyO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoaW5kZXhfaW5fYm9hcmRfc3RhdGUgPCAwKSB7XHJcbiAgICBpbmRleF9pbl9iYXNlID0gaW5kZXhfaW5fYm9hcmRfc3RhdGUgKiAoLTEpO1xyXG4gICAgdmFyIG9ic3RhY2xlID0gb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tpbmRleF9pbl9iYXNlXTtcclxuICAgIGltYWdlID0gb2JzdGFjbGUuYXZhdGFyO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGltYWdlO1xyXG59XHJcblxyXG4vLyBNb3ZlIC0gRGVsZXRlIC0gU2VsZWN0XHJcblxyXG5mdW5jdGlvbiBtb3ZlX2NoYXJhY3Rlcih0b19pbmRleCwgdG9fY2VsbCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDA7IC8vIGVuZCB0aGUgbW90aW9uXHJcbiAgdmFyIGNob3Nlbl9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciBjaG9zZW5fY2hhcmFjdGVyX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcblxyXG4gIHZhciBkaXN0YW5jZSA9IGZpbmREaXN0YW5jZSh0b19pbmRleCwgY2hvc2VuX2luZGV4KVxyXG4gIHZhciBtYXhfZGlzdGFuY2UgPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF1cclxuXHJcbiAgaWYgKGRpc3RhbmNlIDw9IG1heF9kaXN0YW5jZSkge1xyXG4gICAgaWYgKCEoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEgJiYgZGlzdGFuY2UgPiAxLjYpKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnbW92ZV9jaGFyYWN0ZXInO1xyXG4gICAgICB0b1NlbmQuZnJvbV9pbmRleCA9IGNob3Nlbl9pbmRleDtcclxuICAgICAgdG9TZW5kLnRvX2luZGV4ID0gdG9faW5kZXg7XHJcbiAgICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleDtcclxuICAgICAgdG9TZW5kLmNoYXJhY3Rlcl9hdmF0YXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5hdmF0YXI7XHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC5kaXN0YW5jZSA9IGRpc3RhbmNlXHJcbiAgICAgIHRvU2VuZC5sZWZ0X3NoaWVsZCA9IDBcclxuICAgICAgdG9TZW5kLm1pbmVzX2V4cGxvZGVkID0gW11cclxuICAgICAgdG9TZW5kLm1pbmVzX2RhbWFnZSA9IDBcclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmhhc093blByb3BlcnR5KFwiZm9yY2VfZmllbGRfdGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgdmFyIHNoaWVsZF9pbmRleCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uZm9yY2VfZmllbGRfdGFyZ2V0LnNoaWVsZF9pbmRleFxyXG4gICAgICAgIGlmKCFnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLmNlbGxzX3Byb3RlY3RlZC5pbmNsdWRlcyh0b19pbmRleCkpIHsvLyDQv9C+0LrQuNC90YPQuyDQt9C+0L3RgyDQt9Cw0YnQuNGC0YtcclxuICAgICAgICAgIHRvU2VuZC5sZWZ0X3NoaWVsZCA9IDFcclxuICAgICAgICAgIHRvU2VuZC5zaGllbGRfaW5kZXggPSBzaGllbGRfaW5kZXhcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQgPSBbXTtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0gIT0gXCJhbGxcIikgey8vdXNlciBpcyBpbnZpc2libGVcclxuICAgICAgICB2YXIgaW1tZWRpYXRlX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgMSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbW1lZGlhdGVfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dID4gMCAmJiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dICE9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgpIHsvLyB0aGVyZSBhcmUgY2hhcmFjdGVycyB0aGVyZVxyXG4gICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChjaG9zZW5fY2hhcmFjdGVyX2luZGV4KTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgdmFyIGV4dGVuZGVkX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgaW52aXNpYmlsaXR5X2RldGVjdGlvbl9yYWRpdXMpO1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleHRlbmRlZF9uYmgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dID4gMCAmJiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCkgey8vIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIHRoZXJlXHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudF9jaGFyX251bSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXTtcclxuICAgICAgICAgICAgICAgIHZhciByb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2N1cnJlbnRfY2hhcl9udW1dLmludGVsbGlnZW5jZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocm9sbCA+IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChjaG9zZW5fY2hhcmFjdGVyX2luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyh0b19pbmRleCkpIHtcclxuICAgICAgICB0b1NlbmQubWluZXNfZXhwbG9kZWQucHVzaCh0b19pbmRleClcclxuICAgICAgICB0b1NlbmQubWluZXNfZGFtYWdlID0gdG9TZW5kLm1pbmVzX2RhbWFnZSArIHJvbGxfeChtaW5lc18wX2Rpc3RhbmNlX2RhbWFnZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBpbW1lZGlhdGVfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCAxKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbW1lZGlhdGVfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSAhPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4KSB7Ly8gdGhlcmUgYXJlIGNoYXJhY3RlcnMgdGhlcmVcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXV0gIT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5wdXNoKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhpbW1lZGlhdGVfbmJoW2ldKSAmJiBpbW1lZGlhdGVfbmJoW2ldICE9IHRvX2luZGV4KSB7XHJcbiAgICAgICAgICAgIHRvU2VuZC5taW5lc19leHBsb2RlZC5wdXNoKGltbWVkaWF0ZV9uYmhbaV0pXHJcbiAgICAgICAgICAgIHRvU2VuZC5taW5lc19kYW1hZ2UgPSB0b1NlbmQubWluZXNfZGFtYWdlICsgcm9sbF94KG1pbmVzXzFfZGlzdGFuY2VfZGFtYWdlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIG9uZV9hbmRfaGFsZl9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIDEuNik7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb25lX2FuZF9oYWxmX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhvbmVfYW5kX2hhbGZfbmJoW2ldKSAmJiAoIWltbWVkaWF0ZV9uYmguaW5jbHVkZXMob25lX2FuZF9oYWxmX25iaFtpXSkpKSB7XHJcbiAgICAgICAgICAgIHRvU2VuZC5taW5lc19leHBsb2RlZC5wdXNoKG9uZV9hbmRfaGFsZl9uYmhbaV0pXHJcbiAgICAgICAgICAgIHRvU2VuZC5taW5lc19kYW1hZ2UgPSB0b1NlbmQubWluZXNfZGFtYWdlICsgcm9sbF94KG1pbmVzXzFwNV9kaXN0YW5jZV9kYW1hZ2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZXh0ZW5kZWRfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCBpbnZpc2liaWxpdHlfZGV0ZWN0aW9uX3JhZGl1cyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXh0ZW5kZWRfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dID4gMCAmJiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCAmJiAoIWltbWVkaWF0ZV9uYmguaW5jbHVkZXMoZXh0ZW5kZWRfbmJoW2ldKSkpIHsvLyB0aGVyZSBhcmUgY2hhcmFjdGVycyB0aGVyZVxyXG4gICAgICAgICAgICB2YXIgY3VycmVudF9jaGFyX251bSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXTtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY3VycmVudF9jaGFyX251bV0gIT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgICAgIHZhciByb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmludGVsbGlnZW5jZSk7XHJcbiAgICAgICAgICAgICAgaWYgKHJvbGwgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5wdXNoKGN1cnJlbnRfY2hhcl9udW0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjbGVhcl9jb250YWluZXJzKCk7XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgICAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gdG9faW5kZXhcclxuICAgICAgdmFyIHRvX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgdG9faW5kZXgpO1xyXG4gICAgICBjaGFyYWN0ZXJfY2hvc2VuLmNlbGwgPSB0b19jZWxsXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCSINCx0L7RjiDQvdGD0LbQvdC+INC00LLQuNCz0LDRgtGM0YHRjyDQv9C+0YHRgtGD0L/QsNGC0LXQu9GM0L3QviAoMS0yINC60LvQtdGC0LrQuClcIilcclxuICAgICAgdW5kb19zZWxlY3Rpb24oKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCf0L7Qu9C10LPRh9C1LCDQvNGB0YzQtSDQkdC+0LvRglwiKVxyXG4gICAgdW5kb19zZWxlY3Rpb24oKVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZV9jaGFyYWN0ZXIoaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnZGVsZXRlX2NoYXJhY3Rlcic7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX3dlYXBvbihjaGFyYWN0ZXJfbnVtYmVyLCB3ZWFwb25faW5kZXgpIHtcclxuICBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bY2hhcmFjdGVyX251bWJlcl0gPSB3ZWFwb25faW5kZXhcclxuICBjaGFyYWN0ZXJfY2hvc2VuLndlYXBvbl9pZCA9IHdlYXBvbl9pbmRleFxyXG5cclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bd2VhcG9uX2luZGV4XVxyXG5cclxuICB2YXIgd2VhcG9uX21pbmlfZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhcG9uX21pbmlfZGlzcGxheVwiKTtcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LnNyYyA9IHdlYXBvbi5hdmF0YXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlfd2VhcG9uX2RldGFpbGVkKHdlYXBvbl9pbmRleCwgY29udGFpbmVyLCBzaG93SW1hZ2UpIHtcclxuICB2YXIgZGVmYXVsdF93ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1t3ZWFwb25faW5kZXhdXHJcblxyXG4gIHZhciB3ZWFwb25fcmFuZ2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB3ZWFwb25fcmFuZ2VfZGlzcGxheS5pZCA9IFwid2VhcG9uX3JhbmdlX2Rpc3BsYXlcIjtcclxuICB3ZWFwb25fcmFuZ2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCU0LDQu9GM0L3QvtGB0YLRjDogXCIgKyBkZWZhdWx0X3dlYXBvbi5yYW5nZVxyXG5cclxuICB2YXIgd2VhcG9uX2RhbWFnZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHdlYXBvbl9kYW1hZ2VfZGlzcGxheS5pZCA9IFwid2VhcG9uX2RhbWFnZV9kaXNwbGF5XCI7XHJcbiAgd2VhcG9uX2RhbWFnZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KPRgNC+0L06IFwiICsgZGVmYXVsdF93ZWFwb24uZGFtYWdlWzBdICsgJ2QnICsgZGVmYXVsdF93ZWFwb24uZGFtYWdlWzFdXHJcblxyXG4gIHZhciB3ZWFwb25fbmFtZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHdlYXBvbl9uYW1lX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9uYW1lX2Rpc3BsYXlcIjtcclxuICB3ZWFwb25fbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IGRlZmF1bHRfd2VhcG9uLm5hbWVcclxuXHJcbiAgaWYgKHNob3dJbWFnZSkge1xyXG4gICAgdmFyIHdlYXBvbl9hdmF0YXJfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9hdmF0YXJfZGlzcGxheVwiXHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3JjID0gZGVmYXVsdF93ZWFwb24uYXZhdGFyO1xyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG4gIH1cclxuICBjb250YWluZXIuYXBwZW5kKHdlYXBvbl9uYW1lX2Rpc3BsYXkpXHJcbiAgaWYgKHNob3dJbWFnZSkge1xyXG4gICAgY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fYXZhdGFyX2Rpc3BsYXkpXHJcbiAgfVxyXG4gIGNvbnRhaW5lci5hcHBlbmQod2VhcG9uX3JhbmdlX2Rpc3BsYXkpXHJcbiAgY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fZGFtYWdlX2Rpc3BsYXkpXHJcbiAgY29udGFpbmVyLnNob3coKVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5X2FybW9yX2RldGFpbGVkKGNoYXJhY3Rlcl9udW1iZXIsIGNvbnRhaW5lcikge1xyXG4gIHZhciBLRF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHZhciBLRF92YWx1ZSA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2NoYXJhY3Rlcl9udW1iZXJdKVxyXG4gIEtEX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQmtCUOiBcIiArIEtEX3ZhbHVlO1xyXG5cclxuICB2YXIgbWVsZWVfcmVzaXN0X2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgdmFyIG1lbGVlX3Jlc2lzdCA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9yZXNpc3RbY2hhcmFjdGVyX251bWJlcl0qMTAwO1xyXG4gIG1lbGVlX3Jlc2lzdF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JzQuNC70LvQuCDRgNC10LfQuNGB0YI6IFwiICsgbWVsZWVfcmVzaXN0ICsgXCIlXCI7XHJcblxyXG4gIHZhciBidWxsZXRfcmVzaXN0X2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgdmFyIGJ1bGxldF9yZXNpc3QgPSBjaGFyYWN0ZXJfc3RhdGUuYnVsbGV0X3Jlc2lzdFtjaGFyYWN0ZXJfbnVtYmVyXSoxMDA7XHJcbiAgYnVsbGV0X3Jlc2lzdF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KHRgtGA0LXQu9C60L7QstGL0Lkg0YDQtdC30LjRgdGCOiBcIiArIGJ1bGxldF9yZXNpc3QgKyBcIiVcIjtcclxuXHJcbiAgdmFyIGV2YWRlX2JvbnVzX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgZXZhZGVfYm9udXNfZGlzcGxheS5pbm5lckhUTUwgPSBcItCj0LrQu9C+0L3QtdC90LjQtTogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIHZhciBkZWZlbnNpdmVfYWR2YW50YWdlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgZGVmZW5zaXZlX2FkdmFudGFnZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KPRj9C30LLQuNC80L7RgdGC0Yw6IFwiICsgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGNvbnRhaW5lci5hcHBlbmQoS0RfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZChtZWxlZV9yZXNpc3RfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZChidWxsZXRfcmVzaXN0X2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmQoZXZhZGVfYm9udXNfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZChkZWZlbnNpdmVfYWR2YW50YWdlX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5zaG93KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlfc3Bpcml0X2RldGFpbGVkKGNoYXJhY3Rlcl9udW1iZXIsIGNvbnRhaW5lcikge1xyXG4gIHZhciBhdHRhY2tfYm9udXNfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBhdHRhY2tfYm9udXNfZGlzcGxheS5pbm5lckhUTUwgPSBcItCR0L7QvdGD0YEg0LDRgtCw0LrQuDogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICB2YXIgZGFtYWdlX2JvbnVzX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgZGFtYWdlX2JvbnVzX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQkdC+0L3Rg9GBINGD0YDQvtC90LA6IFwiICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgdmFyIHVuaXZlcnNhbF9ib251c19kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHVuaXZlcnNhbF9ib251c19kaXNwbGF5LmlubmVySFRNTCA9IFwi0JLRgdC10L7QsdGJ0LjQuSDQsdC+0L3Rg9GBOiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIHZhciBtZWxlZV9hZHZhbnRhZ2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBtZWxlZV9hZHZhbnRhZ2VfZGlzcGxheS5pbm5lckhUTUwgPSBcIk1lbGVlIGFkdjogXCIgKyBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICB2YXIgcmFuZ2VkX2FkdmFudGFnZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHJhbmdlZF9hZHZhbnRhZ2VfZGlzcGxheS5pbm5lckhUTUwgPSBcIlJhbmdlZCBhZHY6IFwiICsgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGNvbnRhaW5lci5hcHBlbmQoYXR0YWNrX2JvbnVzX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmQoZGFtYWdlX2JvbnVzX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmQodW5pdmVyc2FsX2JvbnVzX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmQobWVsZWVfYWR2YW50YWdlX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmQocmFuZ2VkX2FkdmFudGFnZV9kaXNwbGF5KTtcclxuICBjb250YWluZXIuc2hvdygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RfY2hhcmFjdGVyKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG5cclxuXHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gXCJhbGxcIiB8fCBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IG15X25hbWUpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24gPSBpbmRleFxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2VsbCA9IGNlbGxcclxuXHJcbiAgbGV0IG5hbWUgPSBjaGFyYWN0ZXIubmFtZTtcclxuICBsZXQgYXZhdGFyID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuXHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBuYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IG5hbWU7XHJcblxyXG4gIHZhciBhdmF0YXJfY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICB2YXIgYXZhdGFyX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnNyYyA9IGF2YXRhcjtcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuXHJcbiAgYXZhdGFyX2NvbnRhaW5lci5hcHBlbmRDaGlsZChhdmF0YXJfZGlzcGxheSlcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChuYW1lX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYXZhdGFyX2NvbnRhaW5lcik7XHJcblxyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIiB8fCBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcblxyXG4gICAgYXZhdGFyX2Rpc3BsYXkub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBzaG93X21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIGF2YXRhcl9kaXNwbGF5Lm9ubW91c2VlbnRlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICB2YXIgbWFpbl9hY3Rpb24gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIGJvbnVzX2FjdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIG1vdmVfYWN0aW9uID0gTWF0aC5mbG9vcihjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0pXHJcblxyXG4gICAgICB2YXIgbWFpbl9hY3Rpb25fZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgbWFpbl9hY3Rpb25fZGlzcGxheS5pZCA9IFwibWFpbl9hY3Rpb25fZGlzcGxheVwiO1xyXG4gICAgICBtYWluX2FjdGlvbl9kaXNwbGF5LmlubmVySFRNTCA9IFwi0J7RgdC90L7QstC90YvRhTogXCIgKyBtYWluX2FjdGlvblxyXG5cclxuICAgICAgdmFyIGJvbnVzX2FjdGlvbl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICBib251c19hY3Rpb25fZGlzcGxheS5pZCA9IFwiYm9udXNfYWN0aW9uX2Rpc3BsYXlcIjtcclxuICAgICAgYm9udXNfYWN0aW9uX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQkdC+0L3Rg9GB0L3Ri9GFOiBcIiArIGJvbnVzX2FjdGlvblxyXG5cclxuICAgICAgdmFyIG1vdmVfYWN0aW9uX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgIG1vdmVfYWN0aW9uX2Rpc3BsYXkuaWQgPSBcIm1vdmVfYWN0aW9uX2Rpc3BsYXlcIjtcclxuICAgICAgbW92ZV9hY3Rpb25fZGlzcGxheS5pbm5lckhUTUwgPSBcItCf0LXRgNC10LTQstC40LbQtdC90LjQtTogXCIgKyBtb3ZlX2FjdGlvblxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gIT0gXCJhbGxcIikgey8vINCyINC40L3QstC40LfQtVxyXG4gICAgICAgIHZhciBpbnZpc2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICAgICAgaW52aXNlX2Rpc3BsYXkuc3JjID0gSU5WSVNFX0lNQUdFO1xyXG4gICAgICAgIGludmlzZV9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuICAgICAgICBpbnZpc2VfZGlzcGxheS5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhaW1cIikpIHsvLyAg0J/RgNC40YbQtdC70LXQvVxyXG4gICAgICAgIHZhciBhaW1fZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICAgICAgYWltX2Rpc3BsYXkuc3JjID0gQUlNX0lNQUdFO1xyXG4gICAgICAgIGFpbV9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuICAgICAgICBhaW1fZGlzcGxheS5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQobWFpbl9hY3Rpb25fZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChib251c19hY3Rpb25fZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChtb3ZlX2FjdGlvbl9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKGludmlzZV9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKGFpbV9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuc2hvdygpXHJcbiAgICB9XHJcblxyXG4gICAgYXZhdGFyX2Rpc3BsYXkub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmhpZGUoKVxyXG4gICAgfVxyXG5cclxuICB2YXIgc3RyZW5ndGhfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBzdHJlbmd0aF9kaXNwbGF5LmlubmVySFRNTCA9IFwiQ9C40LvQsDogXCIgKyBjaGFyYWN0ZXIuc3RyZW5ndGg7XHJcblxyXG4gIHZhciBzdGFtaW5hX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgc3RhbWluYV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KLQtdC70L7RgdC70L7QttC10L3QuNC1OiBcIiArIGNoYXJhY3Rlci5zdGFtaW5hO1xyXG5cclxuICB2YXIgYWdpbGl0eV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGFnaWxpdHlfZGlzcGxheS5pbm5lckhUTUwgPSBcItCb0L7QstC60L7RgdGC0Yw6IFwiICsgY2hhcmFjdGVyLmFnaWxpdHk7XHJcblxyXG4gIHZhciBpbnRlbGxpZ2VuY2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBpbnRlbGxpZ2VuY2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCY0L3RgtC10LvQu9C10LrRgjogXCIgKyBjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlO1xyXG5cclxuICB2YXIgaHBfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgaHBfcGVyY2VudCA9IE1hdGguZmxvb3IoaHBfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIEhQX2Rpc3BsYXkuaWQgPSBcIkhQX2Rpc3BsYXlcIjtcclxuICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gKyBcIiAoXCIgKyBocF9wZXJjZW50ICsgXCIlKVwiO1xyXG5cclxuICB2YXIgdGlyZWRfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0pL3BhcnNlRmxvYXQoc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKVxyXG4gIHRpcmVkX3BlcmNlbnQgPSBNYXRoLmZsb29yKHRpcmVkX3BlcmNlbnQqMTAwKVxyXG5cclxuICB2YXIgdGlyZWRfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB0aXJlZF9kaXNwbGF5LmlkID0gXCJ0aXJlZF9kaXNwbGF5XCI7XHJcbiAgdGlyZWRfZGlzcGxheS5pbm5lckhUTUwgPSBcItCS0YvQvdC+0YHQu9C40LLQvtGB0YLRjDogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSArIFwiIChcIiArIHRpcmVkX3BlcmNlbnQgKyBcIiUpXCI7XHJcblxyXG4gIHZhciBpbml0aWF0aXZlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgaW5pdGlhdGl2ZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdC40YbQuNCw0YLQuNCy0LA6IFwiICsgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoc3RyZW5ndGhfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzdGFtaW5hX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYWdpbGl0eV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGludGVsbGlnZW5jZV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKEhQX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQodGlyZWRfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChpbml0aWF0aXZlX2Rpc3BsYXkpO1xyXG5cclxuICB2YXIgbW92ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIG1vdmVfYnV0dG9uLmlubmVySFRNTCA9IFwi0J/QtdGA0LXQvNC10YnQtdC90LjQtVwiO1xyXG4gIG1vdmVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgbW92ZV9idXR0b24uY2VsbCA9IGNlbGw7XHJcbiAgbW92ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgY2hhcmFjdGVyX3BpY2tlZCA9IGV2ZW50LnRhcmdldFxyXG4gICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NoYXJhY3Rlcl9waWNrZWQuaW5kZXhdO1xyXG4gICAgdmFyIG1vdmVfYWN0aW9uc19sZWZ0ID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBpZiAobW92ZV9hY3Rpb25zX2xlZnQgPiAwKSB7XHJcbiAgICAgIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoY2hhcmFjdGVyX3BpY2tlZC5pbmRleCwgY2hhcmFjdGVyX3BpY2tlZC5jZWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0JLRiyDQv9C+0YLRgNCw0YLQuNC70Lgg0LLRgdC1INC/0LXRgNC10LzQtdGJ0LXQvdC40Y8g0L3QsCDRjdGC0L7QvCDRhdC+0LTRgyFcIilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG5cclxuICAgIHZhciBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRlbGV0ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQo9C90LjRh9GC0L7QttC40YLRjFwiO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gICAgZGVsZXRlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICAgIGRlbGV0ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGRlbGV0ZV9jaGFyYWN0ZXIoaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHZhciB2aXNpYmlsaXR5X21lc3NhZ2UgPSBcIlwiO1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IDApIHtcclxuICAgICAgdmlzaWJpbGl0eV9tZXNzYWdlID0gXCLQntGC0LrRgNGL0YLRjCDQtNC+0YHRgtGD0L9cIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZpc2liaWxpdHlfbWVzc2FnZSA9IFwi0JfQsNC60YDRi9GC0Ywg0LTQvtGB0YLRg9C/XCI7XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfYnV0dG9uLmlubmVySFRNTCA9IHZpc2liaWxpdHlfbWVzc2FnZTtcclxuICAgIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eShjaGFyYWN0ZXJfbnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGFtYWdlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBkYW1hZ2VfYnV0dG9uLmlubmVySFRNTCA9IFwi0J3QsNC90LXRgdGC0Lgg0YPRgNC+0L1cIjtcclxuICAgIGRhbWFnZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICAgIGRhbWFnZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbWFnZV9maWVsZFwiKTtcclxuICAgICAgaWYgKCEoZGFtYWdlX2ZpZWxkLnZhbHVlID09PSBcIlwiKSkge1xyXG4gICAgICAgIHZhciBkYW1hZ2UgPSBwYXJzZUludChkYW1hZ2VfZmllbGQudmFsdWUpO1xyXG4gICAgICAgIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJIUF9kaXNwbGF5XCIpO1xyXG4gICAgICAgIHZhciBuZXdfSFAgPSBjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gLSBkYW1hZ2U7XHJcbiAgICAgICAgSFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgbmV3X0hQO1xyXG5cclxuICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnZGVhbF9kYW1hZ2UnO1xyXG4gICAgICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gICAgdmFyIGRhbWFnZV9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGRhbWFnZV9maWVsZC5pZCA9IFwiZGFtYWdlX2ZpZWxkXCI7XHJcbiAgICBkYW1hZ2VfZmllbGQudHlwZSA9IFwibnVtYmVyXCI7XHJcbiAgICBkYW1hZ2VfZmllbGQucGxhY2Vob2xkZXIgPSBcItCj0YDQvtC9XCI7XHJcblxyXG4gICAgdmFyIGVmZmVjdF9zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gICAgZWZmZWN0X3NlbGVjdC5pZCA9IFwiZWZmZWN0X3NlbGVjdFwiO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWZmZWN0X2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gZWZmZWN0X2xpc3RbaV07XHJcbiAgICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaTtcclxuICAgICAgZWZmZWN0X3NlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGVmZmVjdF9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZWZmZWN0X2J1dHRvbi5pbm5lckhUTUwgPSBcItCf0YDQuNC80LXQvdC40YLRjCDRjdGE0YTQtdC60YJcIjtcclxuICAgIGVmZmVjdF9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHZhciBlZmZlY3Rfc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZmZlY3Rfc2VsZWN0XCIpO1xyXG4gICAgICB2YXIgZWZmZWN0X2luZGV4ID0gZWZmZWN0X3NlbGVjdC52YWx1ZTtcclxuICAgICAgc2VuZF9lZmZlY3RfY29tbWFuZChjaGFyYWN0ZXJfbnVtYmVyLCBlZmZlY3RfaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIHNlYXJjaF9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHNlYXJjaF9idXR0b24uaW5uZXJIVE1MID0gXCLQntCx0YvRgdC60LDRgtGMXCI7XHJcbiAgc2VhcmNoX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIHNlYXJjaF9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBzZWFyY2hfYWN0aW9uKGV2ZW50LnRhcmdldCk7XHJcbiAgfVxyXG5cclxuICB2YXIgc2ltcGxlX3JvbGxfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBzaW1wbGVfcm9sbF9idXR0b24uaW5uZXJIVE1MID0gXCLQn9GA0L7RgdGC0L4gZDIwXCI7XHJcbiAgc2ltcGxlX3JvbGxfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIHJvbGwgPSByb2xsX3goMjApXHJcbiAgICB2YXIgdG9TZW5kID0ge31cclxuICAgIHRvU2VuZC5jb21tYW5kID0gXCJzaW1wbGVfcm9sbFwiXHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBjaGFyYWN0ZXIubmFtZVxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbVxyXG4gICAgdG9TZW5kLnJvbGwgPSByb2xsXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9XHJcblxyXG4gIHZhciBpbnZlbnRvcnkgPSBjaGFyYWN0ZXIuaW52ZW50b3J5XHJcblxyXG4gIHZhciBkZWZhdWx0X3dlYXBvbl9pbmRleCA9IGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4ud2VhcG9uX2lkID0gZGVmYXVsdF93ZWFwb25faW5kZXhcclxuICB2YXIgZGVmYXVsdF93ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tkZWZhdWx0X3dlYXBvbl9pbmRleF1cclxuXHJcbiAgdmFyIHdlYXBvbl9taW5pX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9taW5pX2Rpc3BsYXlcIlxyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3JjID0gZGVmYXVsdF93ZWFwb24uYXZhdGFyO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuY2xhc3NMaXN0LmFkZChcIm1pbmlfZGlzcGxheVwiKTtcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5Lm9ubW91c2VlbnRlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgd2VhcG9uX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBkaXNwbGF5X3dlYXBvbl9kZXRhaWxlZCh3ZWFwb25faW5kZXgsIHdlYXBvbl9pbmZvX2NvbnRhaW5lciwgdHJ1ZSlcclxuICB9XHJcblxyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuaGlkZSgpXHJcbiAgfVxyXG5cclxuICB3ZWFwb25fbWluaV9kaXNwbGF5Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmIChteV9yb2xlID09IFwiZ21cIiB8fCBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcbiAgICAgIHNob3dfd2VhcG9uX21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXZhdGFyX2NvbnRhaW5lci5hcHBlbmQod2VhcG9uX21pbmlfZGlzcGxheSlcclxuXHJcbiAgdmFyIGFybW9yX21pbmlfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgYXJtb3JfbWluaV9kaXNwbGF5LmlkID0gXCJhcm1vcl9taW5pX2Rpc3BsYXlcIjtcclxuICBhcm1vcl9taW5pX2Rpc3BsYXkuc3JjID0gYXJtb3JfaW1hZ2UoY2hhcmFjdGVyX251bWJlcik7XHJcbiAgYXJtb3JfbWluaV9kaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJtaW5pX2Rpc3BsYXlcIik7XHJcbiAgYXJtb3JfbWluaV9kaXNwbGF5Lm9ubW91c2VlbnRlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBkaXNwbGF5X2FybW9yX2RldGFpbGVkKGNoYXJhY3Rlcl9udW1iZXIsIHdlYXBvbl9pbmZvX2NvbnRhaW5lcilcclxuICB9XHJcblxyXG4gIGFybW9yX21pbmlfZGlzcGxheS5vbm1vdXNlbGVhdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5oaWRlKClcclxuICB9XHJcblxyXG4gIGF2YXRhcl9jb250YWluZXIuYXBwZW5kKGFybW9yX21pbmlfZGlzcGxheSlcclxuXHJcbiAgdmFyIHNwaXJpdF9taW5pX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIHNwaXJpdF9taW5pX2Rpc3BsYXkuaWQgPSBcInNwaXJpdF9taW5pX2Rpc3BsYXlcIjtcclxuICBzcGlyaXRfbWluaV9kaXNwbGF5LnNyYyA9IHNwaXJpdF9pbWFnZShjaGFyYWN0ZXJfbnVtYmVyKTtcclxuICBzcGlyaXRfbWluaV9kaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJtaW5pX2Rpc3BsYXlcIik7XHJcbiAgc3Bpcml0X21pbmlfZGlzcGxheS5vbm1vdXNlZW50ZXIgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgZGlzcGxheV9zcGlyaXRfZGV0YWlsZWQoY2hhcmFjdGVyX251bWJlciwgd2VhcG9uX2luZm9fY29udGFpbmVyKVxyXG4gIH1cclxuXHJcbiAgc3Bpcml0X21pbmlfZGlzcGxheS5vbm1vdXNlbGVhdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5oaWRlKClcclxuICB9XHJcblxyXG4gIGF2YXRhcl9jb250YWluZXIuYXBwZW5kKHNwaXJpdF9taW5pX2Rpc3BsYXkpXHJcblxyXG4gIHZhciBhdHRhY2tfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBhdHRhY2tfYnV0dG9uLmlubmVySFRNTCA9IFwi0JDRgtCw0LrQvtCy0LDRgtGMXCI7XHJcbiAgYXR0YWNrX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBtYWluX2FjdGlvbnNfbGVmdCA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgaWYgKG1haW5fYWN0aW9uc19sZWZ0ID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX2F0dGFjayhjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQoyDQstCw0YEg0L3QtSDQvtGB0YLQsNC70L7RgdGMINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgc2tpbGxzZXQgPSBjaGFyYWN0ZXIuc2tpbGxzZXRcclxuXHJcbiAgdmFyIGJ1dHRvbl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gIGJ1dHRvbl9saXN0LmNsYXNzTmFtZSA9IFwiYnV0dG9uX2xpc3RcIjtcclxuICB2YXIgbGluZTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lOSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTEwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG5cclxuICBsaW5lMS5hcHBlbmRDaGlsZChtb3ZlX2J1dHRvbik7XHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICBsaW5lMi5hcHBlbmRDaGlsZChkZWxldGVfYnV0dG9uKTtcclxuICAgIGxpbmUzLmFwcGVuZENoaWxkKGRhbWFnZV9idXR0b24pO1xyXG4gICAgbGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2ZpZWxkKTtcclxuICAgIGxpbmU4LmFwcGVuZENoaWxkKGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24pO1xyXG4gICAgbGluZTkuYXBwZW5kQ2hpbGQoZWZmZWN0X3NlbGVjdCk7XHJcbiAgICBsaW5lMTAuYXBwZW5kQ2hpbGQoZWZmZWN0X2J1dHRvbik7XHJcbiAgfVxyXG4gIGxpbmU0LmFwcGVuZENoaWxkKHNlYXJjaF9idXR0b24pO1xyXG4gIGxpbmU2LmFwcGVuZENoaWxkKGF0dGFja19idXR0b24pO1xyXG4gIGxpbmU3LmFwcGVuZENoaWxkKHNpbXBsZV9yb2xsX2J1dHRvbik7XHJcblxyXG5cclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMSk7XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTQpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU2KTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNyk7XHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMik7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMyk7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lOCk7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lOSk7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMTApO1xyXG4gIH1cclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b25fbGlzdCk7XHJcblxyXG59IGVsc2Uge1xyXG4gIHZhciBocF9wZXJjZW50ID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0pL3BhcnNlRmxvYXQoSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSlcclxuICBocF9wZXJjZW50ID0gTWF0aC5mbG9vcihocF9wZXJjZW50KjEwMClcclxuXHJcbiAgdmFyIEhQX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgSFBfZGlzcGxheS5pZCA9IFwiSFBfZGlzcGxheVwiO1xyXG4gIEhQX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQpdCfOiBcIiArIGhwX3BlcmNlbnQgKyBcIiVcIjtcclxuXHJcbiAgdmFyIHRpcmVkX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSlcclxuICB0aXJlZF9wZXJjZW50ID0gTWF0aC5mbG9vcih0aXJlZF9wZXJjZW50KjEwMClcclxuXHJcbiAgdmFyIHRpcmVkX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgdGlyZWRfZGlzcGxheS5pZCA9IFwidGlyZWRfZGlzcGxheVwiO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQktGL0L3QvtGB0LvQuNCy0L7RgdGC0Yw6IFwiICsgdGlyZWRfcGVyY2VudCArIFwiJVwiO1xyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKEhQX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQodGlyZWRfZGlzcGxheSk7XHJcbn1cclxuXHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG5cclxufVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZF9lZmZlY3RfY29tbWFuZChjaGFyYWN0ZXJfbnVtYmVyLCBlZmZlY3RfaW5kZXgpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnYXBwbHlfZWZmZWN0JztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5lZmZlY3RfbnVtYmVyID0gZWZmZWN0X2luZGV4O1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlcjtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgYWxlcnQoXCLQktGLINC/0YDQuNC80LXQvdC40LvQuCDRjdGE0YTQtdC60YJcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZV9vYmplY3RfY29tbWFuZChpbmRleCkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdkZWxldGVfY2hhcmFjdGVyJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfb2JqZWN0KGV2ZW50KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIGRlbGV0ZV9vYmplY3RfY29tbWFuZChldmVudC50YXJnZXQuaW5kZXgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gIHZhciBvYnN0YWNsZV9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdICogKC0xKTtcclxuICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW29ic3RhY2xlX2lkXTtcclxuXHJcbiAgLy8ga2VlcCB0cmFjayBvZiBsYXN0IGNob3NlbiBvYnN0YWxlIHRvIHF1aWNrbHkgYWRkIHRvIHRoZSBtYXBcclxuICBsYXN0X29ic3RhY2xlID0gb2JzdGFjbGVfaWRcclxuXHJcbiAgbGV0IG5hbWUgPSBvYnN0YWNsZS5uYW1lO1xyXG4gIGxldCBhdmF0YXIgPSBvYnN0YWNsZS5hdmF0YXI7XHJcblxyXG4gIHZhciBuYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IG5hbWU7XHJcblxyXG4gIHZhciBhdmF0YXJfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3JjID0gYXZhdGFyO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKG5hbWVfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChhdmF0YXJfZGlzcGxheSk7XHJcblxyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgdmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCj0L3QuNGH0YLQvtC20LjRgtGMXCI7XHJcbiAgICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgICBkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZGVsZXRlX29iamVjdChldmVudCk7XHJcbiAgICB9XHJcbiAgICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGRlbGV0ZV9idXR0b24pO1xyXG4gIH1cclxuXHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gY2hvb3NlX2NoYXJhY3Rlcl90b19tb3ZlKGluZGV4LCBjZWxsKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMVxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IGluZGV4O1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdO1xyXG4gIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9sb2FkaW5nLndlYnBcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5kb19zZWxlY3Rpb24oKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyAhPSAwKSB7XHJcbiAgICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwXHJcbiAgICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24pO1xyXG4gICAgb2xkX2NlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93X3dlYXBvbl9tb2RhbChjaGFyYWN0ZXJfbnVtYmVyLCBzdGFydGluZ19pbmRleCkge1xyXG4gIGhpZGVfbW9kYWwoKVxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBpbnZlbnRvcnkgPSBjaGFyYWN0ZXIuaW52ZW50b3J5XHJcblxyXG4gIHZhciB3ZWFwb25fdGFibGUgPSAkKFwiPHRhYmxlPlwiKTtcclxuICB2YXIgdGFibGVfc2l6ZSA9IDNcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZV9zaXplOyBpKyspIHtcclxuICAgIHZhciByb3cgPSAkKFwiPHRyPlwiKTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGFibGVfc2l6ZTsgaisrKSB7XHJcbiAgICAgIHZhciBpbmRleCA9IHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSppICsgalxyXG4gICAgICBpZiAoaW5kZXggPCBpbnZlbnRvcnkubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIHdlYXBvbl9udW1iZXIgPSBpbnZlbnRvcnlbaW5kZXhdXHJcbiAgICAgICAgdmFyIGNvbHVtbiA9ICQoXCI8dGg+XCIpO1xyXG4gICAgICAgIHZhciB3ZWFwb25faWNvbiA9ICQoXCI8SU1HPlwiKTtcclxuICAgICAgICB2YXIgYXZhdGFyID0gUVVFU1RJT05fSU1BR0VcclxuICAgICAgICBpZiAod2VhcG9uX2RldGFpbGVkX2luZm9bd2VhcG9uX251bWJlcl0uaGFzT3duUHJvcGVydHkoJ2F2YXRhcicpKSB7XHJcbiAgICAgICAgICBhdmF0YXIgPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1t3ZWFwb25fbnVtYmVyXS5hdmF0YXJcclxuICAgICAgICB9XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYWRkQ2xhc3MoJ3dlYXBvbl9pY29uJyk7XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYXR0cignd2lkdGgnLCAnMTAwcHgnKTtcclxuICAgICAgICB3ZWFwb25faWNvbi5hdHRyKCd3ZWFwb25fbnVtYmVyJywgd2VhcG9uX251bWJlcik7XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYXR0cignaGVpZ2h0JywgJzEwMHB4Jyk7XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYXR0cignc3JjJywgYXZhdGFyKTtcclxuICAgICAgICB3ZWFwb25faWNvbi5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgdmFyIHdlYXBvbl9udW0gPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCd3ZWFwb25fbnVtYmVyJyk7XHJcbiAgICAgICAgICBjaGFuZ2Vfd2VhcG9uKGNoYXJhY3Rlcl9udW1iZXIsIHdlYXBvbl9udW0pO1xyXG4gICAgICAgICAgaGlkZV9tb2RhbCgpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2VhcG9uX2ljb24ub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgdmFyIHdlYXBvbl9udW0gPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCd3ZWFwb25fbnVtYmVyJyk7XHJcbiAgICAgICAgICBkaXNwbGF5X3dlYXBvbl9kZXRhaWxlZCh3ZWFwb25fbnVtLCBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIsIGZhbHNlKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHdlYXBvbl9pY29uLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5odG1sKCcnKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbHVtbi5hcHBlbmQod2VhcG9uX2ljb24pO1xyXG4gICAgICAgIHJvdy5hcHBlbmQoY29sdW1uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgd2VhcG9uX3RhYmxlLmFwcGVuZChyb3cpO1xyXG4gIH1cclxuICBza2lsbF9tb2RhbF9jb250ZW50LmFwcGVuZCh3ZWFwb25fdGFibGUpO1xyXG5cclxuICBpZiAoaW52ZW50b3J5Lmxlbmd0aCA+IHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSp0YWJsZV9zaXplKSB7Ly8gdGhlcmUgYXJlIG1vcmUgc2tpbGxzIHRvIGRpc3BsYXlcclxuICAgIHZhciBuZXh0X3BhZ2VfYnV0dG9uID0gJChcIjxJTUc+XCIpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCd3aWR0aCcsICcxMDBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdoZWlnaHQnLCAnNTBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdzcmMnLCBSSUdIVF9BUlJPV19JTUFHRSk7XHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgc2hvd193ZWFwb25fbW9kYWwoY2hhcmFjdGVyX251bWJlciwgc3RhcnRpbmdfaW5kZXggKyB0YWJsZV9zaXplKnRhYmxlX3NpemUpO1xyXG4gICAgfSlcclxuXHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uX2NvbnRhaW5lci5hcHBlbmQobmV4dF9wYWdlX2J1dHRvbik7XHJcbiAgfVxyXG4gIHNraWxsX21vZGFsLnNob3coKTtcclxuXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93X21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIHN0YXJ0aW5nX2luZGV4KSB7XHJcbiAgaGlkZV9tb2RhbCgpO1xyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBza2lsbHNldCA9IGNoYXJhY3Rlci5za2lsbHNldFxyXG5cclxuICB2YXIgc2tpbGxfdGFibGUgPSAkKFwiPHRhYmxlPlwiKTtcclxuXHJcbiAgdmFyIHRhYmxlX3NpemUgPSAzXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGVfc2l6ZTsgaSsrKSB7XHJcbiAgICB2YXIgcm93ID0gJChcIjx0cj5cIik7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRhYmxlX3NpemU7IGorKykge1xyXG4gICAgICB2YXIgaW5kZXggPSBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqaSArIGpcclxuICAgICAgaWYgKGluZGV4IDwgc2tpbGxzZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIHNraWxsX251bWJlciA9IHNraWxsc2V0W2luZGV4XVxyXG4gICAgICAgIHZhciBjb2x1bW4gPSAkKFwiPHRoPlwiKTtcclxuICAgICAgICB2YXIgc2tpbGxfaWNvbiA9ICQoXCI8SU1HPlwiKTtcclxuICAgICAgICB2YXIgYXZhdGFyID0gUVVFU1RJT05fSU1BR0VcclxuICAgICAgICBpZiAoc2tpbGxfZGV0YWlsZWRfaW5mb1tza2lsbF9udW1iZXJdLmhhc093blByb3BlcnR5KCdhdmF0YXInKSkge1xyXG4gICAgICAgICAgYXZhdGFyID0gc2tpbGxfZGV0YWlsZWRfaW5mb1tza2lsbF9udW1iZXJdLmF2YXRhclxyXG4gICAgICAgIH1cclxuICAgICAgICBza2lsbF9pY29uLmFkZENsYXNzKCdza2lsbF9pY29uJyk7XHJcbiAgICAgICAgc2tpbGxfaWNvbi5hdHRyKCd3aWR0aCcsICcxMDBweCcpO1xyXG4gICAgICAgIHNraWxsX2ljb24uYXR0cignc2tpbGxfbnVtYmVyJywgc2tpbGxfbnVtYmVyKTtcclxuICAgICAgICBza2lsbF9pY29uLmF0dHIoJ2hlaWdodCcsICcxMDBweCcpO1xyXG4gICAgICAgIHNraWxsX2ljb24uYXR0cignc3JjJywgYXZhdGFyKTtcclxuICAgICAgICBza2lsbF9pY29uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICB2YXIgcG9zaXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgcG9zaXRpb24pO1xyXG4gICAgICAgICAgdXNlX3NraWxsKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3NraWxsX251bWJlcicpLCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIGhpZGVfbW9kYWwoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNraWxsX2ljb24ub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgdmFyIHNraWxsX251bWJlciA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3NraWxsX251bWJlcicpO1xyXG4gICAgICAgICAgdmFyIHNraWxsX29iamVjdCA9IHNraWxsX2RldGFpbGVkX2luZm9bc2tpbGxfbnVtYmVyXTtcclxuICAgICAgICAgIHZhciBza2lsbF9uYW1lX29iamVjdCA9ICQoXCI8aDI+XCIpO1xyXG4gICAgICAgICAgdmFyIHNraWxsX25hbWUgPSBza2lsbF9saXN0W3NraWxsX251bWJlcl07XHJcbiAgICAgICAgICBza2lsbF9uYW1lX29iamVjdC5odG1sKHNraWxsX25hbWUpO1xyXG4gICAgICAgICAgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLmFwcGVuZChza2lsbF9uYW1lX29iamVjdCk7XHJcblxyXG4gICAgICAgICAgdmFyIHNraWxsX2Nvc3Rfb2JqZWN0ID0gJChcIjxoMj5cIik7XHJcbiAgICAgICAgICBpZiAoc2tpbGxfb2JqZWN0Lmhhc093blByb3BlcnR5KCdjb3N0JykpIHtcclxuICAgICAgICAgICAgdmFyIHNraWxsX2Nvc3QgPSBza2lsbF9vYmplY3QuY29zdDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBza2lsbF9jb3N0ID0gXCLQndC10LjQt9Cy0LXRgdGC0L3QvlwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBza2lsbF9jb3N0X29iamVjdC5odG1sKFwi0KLRgNC10LHRg9C10YIg0LTQtdC50YHRgtCy0LjQuTogXCIgKyBza2lsbF9jb3N0KTtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5hcHBlbmQoc2tpbGxfY29zdF9vYmplY3QpO1xyXG5cclxuICAgICAgICAgIGlmIChza2lsbF9vYmplY3QuaGFzT3duUHJvcGVydHkoXCJjb29sZG93blwiKSkge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfY29vbGRvd25faGVhZGVyID0gJChcIjxoMj5cIik7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gXCLQmtGD0LvQtNCw0YPQvTogXCIgKyBza2lsbF9vYmplY3QuY29vbGRvd247XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KHNraWxsX29iamVjdC5jb29sZG93bl9vYmplY3RfbmFtZSkpIHtcclxuICAgICAgICAgICAgICB0ZXh0ID0gdGV4dCArIFwiICjQvtGB0YLQsNC70L7RgdGMIFwiICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXVtza2lsbF9vYmplY3QuY29vbGRvd25fb2JqZWN0X25hbWVdLmNvb2xkb3duICsgXCIpXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGV4dCA9IHRleHQgKyBcIiAo0JPQvtGC0L7QstC+KVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNraWxsX2Nvb2xkb3duX2hlYWRlci5odG1sKHRleHQpO1xyXG4gICAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuYXBwZW5kKHNraWxsX2Nvb2xkb3duX2hlYWRlcik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIHNraWxsX2Rlc2NyaXB0aW9uX29iamVjdCA9ICQoXCI8cD5cIik7XHJcbiAgICAgICAgICBpZiAoc2tpbGxfb2JqZWN0Lmhhc093blByb3BlcnR5KCdkZXNjcmlwdGlvbicpKSB7XHJcbiAgICAgICAgICAgIHZhciBza2lsbF9kZXNjcmlwdGlvbiA9IHNraWxsX29iamVjdC5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBza2lsbF9kZXNjcmlwdGlvbiA9IFwi0JzRiyDRgdCw0LzQuCDQvdC1INC30L3QsNC10Lwg0YfRgtC+INC+0L3QviDQtNC10LvQsNC10YJcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2tpbGxfZGVzY3JpcHRpb25fb2JqZWN0Lmh0bWwoc2tpbGxfZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLmFwcGVuZChza2lsbF9kZXNjcmlwdGlvbl9vYmplY3QpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHNraWxsX2ljb24ub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLmh0bWwoJycpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29sdW1uLmFwcGVuZChza2lsbF9pY29uKTtcclxuICAgICAgICByb3cuYXBwZW5kKGNvbHVtbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNraWxsX3RhYmxlLmFwcGVuZChyb3cpO1xyXG4gIH1cclxuICBza2lsbF9tb2RhbF9jb250ZW50LmFwcGVuZChza2lsbF90YWJsZSk7XHJcblxyXG4gIGlmIChza2lsbHNldC5sZW5ndGggPiBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqdGFibGVfc2l6ZSkgey8vIHRoZXJlIGFyZSBtb3JlIHNraWxscyB0byBkaXNwbGF5XHJcbiAgICB2YXIgbmV4dF9wYWdlX2J1dHRvbiA9ICQoXCI8SU1HPlwiKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24uYXR0cignd2lkdGgnLCAnMTAwcHgnKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24uYXR0cignaGVpZ2h0JywgJzUwcHgnKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24uYXR0cignc3JjJywgUklHSFRfQVJST1dfSU1BR0UpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHNob3dfbW9kYWwoY2hhcmFjdGVyX251bWJlciwgc3RhcnRpbmdfaW5kZXggKyB0YWJsZV9zaXplKnRhYmxlX3NpemUpO1xyXG4gICAgfSlcclxuXHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uX2NvbnRhaW5lci5hcHBlbmQobmV4dF9wYWdlX2J1dHRvbik7XHJcbiAgfVxyXG4gIHNraWxsX21vZGFsLnNob3coKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZV9tb2RhbCgpIHtcclxuICBza2lsbF9tb2RhbC5oaWRlKCk7XHJcbiAgc2tpbGxfbW9kYWxfY29udGVudC5odG1sKFwiXCIpO1xyXG4gIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5odG1sKFwiXCIpO1xyXG4gIG5leHRfcGFnZV9idXR0b25fY29udGFpbmVyLmh0bWwoXCJcIik7XHJcbn1cclxuXHJcbi8vIGF0dGFjayByZWxhdGVkIGhlbHBlcnNcclxuXHJcbmZ1bmN0aW9uIGNob29zZV9jaGFyYWN0ZXJfdG9fYXR0YWNrKGNlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAyXHJcbiAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL2F0dGFja19wbGFjZWhvbGRlci5qcGdcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RvcF9hdHRhY2soKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMFxyXG4gIHZhciBvbGRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbik7XHJcbiAgb2xkX2NlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3Bfc2tpbGwoKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMFxyXG4gIHZhciBvbGRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbik7XHJcbiAgb2xkX2NlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCk7XHJcbn1cclxuXHJcblxyXG4vLyByb2xsIHNvbWV0aGluZ1xyXG5cclxuZnVuY3Rpb24gcm9sbF94KHgpIHtcclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogeCkgKyAxXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxTZWFyY2goaW50ZWxsaWdlbmNlLCBtb2QpIHtcclxuICByZXR1cm4gaW50ZWxsaWdlbmNlICsgcm9sbF94KDIwKSArIG1vZDtcclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbEluaXRpYXRpdmUoKSB7XHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5IUFtpXSA+IDApIHsgLy8gc28gY2hhcmFjdGVyIGkgaXMgcHJlc2VudFxyXG4gICAgICAvLyByZXRyaWV2ZSB0aGF0IGNoYXJhY3RlcidzIGFnaWxpdHlcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2ldO1xyXG4gICAgICB2YXIgYWdpbGl0eSA9IGNoYXJhY3Rlci5hZ2lsaXR5O1xyXG5cclxuICAgICAgLy8gcm9sbCBpbml0aWF0aXZlIGFuZCBhZGQgYWdpbGl0eSBtb2RpZmljYXRvclxyXG4gICAgICB2YXIgaW5pdGlhdGl2ZSA9IGNvbXB1dGVJbml0aWF0aXZlKHBhcnNlSW50KGFnaWxpdHkpKTtcclxuXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2ldID0gaW5pdGlhdGl2ZTtcclxuICAgIH1cclxuICB9XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3JvbGxfaW5pdGlhdGl2ZSc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuaW5pdGlhdGl2ZV9zdGF0ZSA9IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsX2F0dGFjayh0eXBlLCBhdHRhY2tlciwgdGFyZ2V0LCBhZHZhbnRhZ2VfYm9udXMpIHtcclxuICB2YXIgYWR2YW50YWdlID0gMFxyXG4gIGlmICgodHlwZSA9PSBcInJhbmdlZFwiKXx8KHR5cGUgPT0gXCJlbmVyZ3lcIikpIHtcclxuICAgIGFkdmFudGFnZSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2F0dGFja2VyXTtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5oYXNPd25Qcm9wZXJ0eShcImFkYXB0aXZlX2ZpZ2h0aW5nXCIpKSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5hZGFwdGl2ZV9maWdodGluZyA9PSAwKSB7XHJcbiAgICAgICAgYWR2YW50YWdlID0gYWR2YW50YWdlICsgMTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCh0YDQsNCx0L7RgtCw0Lsg0YDQtdC50L3QtNC20L7QstGL0Lkg0YHRgtCw0Log0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtC4XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gMTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICBhZHZhbnRhZ2UgPSBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2F0dGFja2VyXVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmhhc093blByb3BlcnR5KFwiYWRhcHRpdmVfZmlnaHRpbmdcIikpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID09IDEpIHtcclxuICAgICAgICBhZHZhbnRhZ2UgPSBhZHZhbnRhZ2UgKyAxO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KHRgNCw0LHQvtGC0LDQuyDQvNC40LvQu9C4INGB0YLQsNC6INGD0L3QuNCy0LXRgNGB0LDQu9GM0L3QvtGB0YLQuFwiKTtcclxuICAgICAgfVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5hZGFwdGl2ZV9maWdodGluZyA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGFkdmFudGFnZSA9IGFkdmFudGFnZSAtIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW3RhcmdldF0gKyBhZHZhbnRhZ2VfYm9udXNcclxuXHJcbiAgdmFyIHJvbGwgPSAwXHJcblxyXG4gIGlmIChhZHZhbnRhZ2UgPj0gMikgeyAvLyDQlNC40LrQvtC1INC/0YDQtdC40LzRg9GJ0LXRgdGC0LLQviA9IDQg0LrRg9Cx0LBcclxuICAgIGNvbnNvbGUubG9nKFwi0JTQuNC60L7QtSDQv9GA0LXQuNC80YPRidC10YHRgtCy0L5cIilcclxuICAgIHZhciByb2xsMSA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMiA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMyA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsNCA9IHJvbGxfeCgyMClcclxuICAgIHJvbGwgPSBNYXRoLm1heChyb2xsMSwgcm9sbDIsIHJvbGwzLCByb2xsNClcclxuICB9IGVsc2UgaWYgKGFkdmFudGFnZSA9PSAxKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcItCf0YDQtdC40LzRg9GJ0LXRgdGC0LLQvlwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWF4KHJvbGwxLCByb2xsMilcclxuICB9IGVsc2UgaWYgKGFkdmFudGFnZSA9PSAwKSB7XHJcbiAgICByb2xsID0gcm9sbF94KDIwKVxyXG4gIH0gZWxzZSBpZiAoYWR2YW50YWdlID09IC0xKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcItCf0L7QvNC10YXQsFwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWluKHJvbGwxLCByb2xsMilcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coXCLQlNC40LrQsNGPINC/0L7QvNC10YXQsFwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwzID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGw0ID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWluKHJvbGwxLCByb2xsMiwgcm9sbDMsIHJvbGw0KVxyXG4gIH1cclxuICByZXR1cm4gcm9sbFxyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsX2V2YXNpb24odGFyZ2V0X2NoYXJhY3RlciwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpIHtcclxuICBjb25zb2xlLmxvZyhcItCR0L7QvdGD0YEg0YPQstC+0YDQvtGC0LA6IFwiICsgY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICB2YXIgZXZhZGVfcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludCh0YXJnZXRfY2hhcmFjdGVyLmFnaWxpdHkpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgcmV0dXJuIGV2YWRlX3JvbGxcclxufVxyXG5cclxuLy8gbWFuYWdpbmcgY2hhdFxyXG5cclxuZnVuY3Rpb24gcHVzaFRvTGlzdChtZXNzYWdlKSB7XHJcbiAgZm9yIChsZXQgaT0xOyBpIDwgQ0hBVF9DQVNIOyBpKyspIHtcclxuICAgIHZhciBlbGVtZW50X3RvX2NvcHkgPSAkKCdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIGkgKyAnXCJdJyk7XHJcbiAgICB2YXIgZWxlbWVudF90b19wYXN0ZSA9ICQoJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgKGktMSkgKyAnXCJdJyk7XHJcblxyXG4gICAgZWxlbWVudF90b19wYXN0ZS50ZXh0KGVsZW1lbnRfdG9fY29weS50ZXh0KCkpO1xyXG4gIH1cclxuICB2YXIgdG9wX2VsZW1lbnQgPSAkKCdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIChDSEFUX0NBU0gtMSkgKyAnXCJdJyk7XHJcbiAgdG9wX2VsZW1lbnQudGV4dChtZXNzYWdlKTtcclxuXHJcbiAgaWYgKG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLmlzKFwiOmhpZGRlblwiKSkge1xyXG4gICAgY2hhdF9idXR0b24uYWRkQ2xhc3MoXCJpcy1yZWRcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZUNoYXRWaXNpYmlsaXR5KCkge1xyXG4gIGlmIChjaGF0X2J1dHRvbi5oYXNDbGFzcyhcImlzLXJlZFwiKSkge1xyXG4gICAgY2hhdF9idXR0b24ucmVtb3ZlQ2xhc3MoXCJpcy1yZWRcIilcclxuICB9XHJcbiAgaWYgKG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLmlzKFwiOmhpZGRlblwiKSkge1xyXG4gICAgbm90aWZpY2F0aW9uc19jb250YWluZXIuc2hvdygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBub3RpZmljYXRpb25zX2NvbnRhaW5lci5oaWRlKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBjb3ZlciBtZWNoYW5pY3NcclxuXHJcbmZ1bmN0aW9uIGNvdmVyX21vZChhY2N1bXVsYXRlZF9jb3Zlcikge1xyXG4gIHZhciBtb2QgPSB7fVxyXG4gIG1vZC5pc1Bvc3NpYmxlID0gdHJ1ZVxyXG4gIG1vZC5jb3Zlcl9sZXZlbCA9IGFjY3VtdWxhdGVkX2NvdmVyXHJcbiAgc3dpdGNoKGFjY3VtdWxhdGVkX2NvdmVyKSB7XHJcbiAgICBjYXNlIDA6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAwXHJcbiAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAwXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICBtb2QuYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMjpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IC0xXHJcbiAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAwXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzOlxyXG4gICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTJcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDQ6XHJcbiAgICAgICAgbW9kLmF0dGFja19ib251cyA9IC0yXHJcbiAgICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IC0xXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDU6XHJcbiAgICAgICAgbW9kLmF0dGFja19ib251cyA9IC0zXHJcbiAgICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IC0xXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDY6XHJcbiAgICAgICAgbW9kLmF0dGFja19ib251cyA9IC0zXHJcbiAgICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IC0yXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDc6XHJcbiAgICAgICAgbW9kLmF0dGFja19ib251cyA9IC00XHJcbiAgICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IC0yXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDg6XHJcbiAgICAgICAgbW9kLmF0dGFja19ib251cyA9IC00XHJcbiAgICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IC0zXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDk6XHJcbiAgICAgICAgbW9kLmF0dGFja19ib251cyA9IC01XHJcbiAgICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IC0zXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICAgIG1vZC5pc1Bvc3NpYmxlID0gZmFsc2VcclxuICAgICAgICBicmVhaztcclxuICB9XHJcblxyXG4gIHJldHVybiBtb2RcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZV9jb3ZlcihkaXN0YW5jZSwgY292ZXIpIHtcclxuICB2YXIgcmVzdWx0ID0gMFxyXG4gIGlmIChkaXN0YW5jZSA8IDAuMTUpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyXHJcbiAgfSBlbHNlIGlmIChkaXN0YW5jZSA8IDAuMykge1xyXG4gICAgcmVzdWx0ID0gY292ZXIgKiAwLjc1XHJcbiAgfSBlbHNlIGlmIChkaXN0YW5jZSA8IDAuNSkge1xyXG4gICAgcmVzdWx0ID0gY292ZXIgKiAwLjVcclxuICB9IGVsc2UgaWYgKGRpc3RhbmNlIDwgMC42NSkge1xyXG4gICAgcmVzdWx0ID0gY292ZXIgKiAwLjI1XHJcbiAgfSBlbHNlIHtcclxuICAgIHJlc3VsdCA9IDBcclxuICB9XHJcblxyXG4gIHJldHVybiByZXN1bHRcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKHVzZXJfcG9zLCB0YXJnZXRfcG9zKSB7XHJcbiAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gMFxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBjZWxsc19vbl9saW5lKHVzZXJfcG9zLCB0YXJnZXRfcG9zLCBnYW1lX3N0YXRlLnNpemUpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X2NlbGwgPSBjYW5kaWRhdGVfY2VsbHNbaV1cclxuICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2N1cnJlbnRfY2VsbF0gPCAwKSB7Ly8g0Y3RgtC+INC/0YDQtdC/0Y/RgtGB0YLQstC40LVcclxuICAgICAgdmFyIG9ic3RhY2xlID0gb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tNYXRoLmFicyhnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2N1cnJlbnRfY2VsbF0pXVxyXG4gICAgICB2YXIgZGlzdGFuY2UgPSBkaXN0YW5jZV90b19saW5lKHVzZXJfcG9zLCB0YXJnZXRfcG9zLCBnYW1lX3N0YXRlLnNpemUsIGN1cnJlbnRfY2VsbClcclxuICAgICAgYWNjdW11bGF0ZWRfY292ZXIgPSBhY2N1bXVsYXRlZF9jb3ZlciArIGNvbXB1dGVfY292ZXIoZGlzdGFuY2UsIG9ic3RhY2xlLmNvdmVyKVxyXG4gICAgfVxyXG4gIH1cclxuICBhY2N1bXVsYXRlZF9jb3ZlciA9IE1hdGguY2VpbChhY2N1bXVsYXRlZF9jb3ZlcilcclxuICByZXR1cm4gYWNjdW11bGF0ZWRfY292ZXJcclxufVxyXG5cclxuLy8gTWlzY2VsYW5lb3VzIGFjdGlvbnNcclxuXHJcbmZ1bmN0aW9uIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eShjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gXCJjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlcIjtcclxuICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG5cclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gMCkge1xyXG4gICAgdG9TZW5kLm5ld192YWx1ZSA9IDFcclxuICB9IGVsc2Uge1xyXG4gICAgdG9TZW5kLm5ld192YWx1ZSA9IDBcclxuICB9XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlYXJjaF9hY3Rpb24oc2VhcmNoX2J1dHRvbikge1xyXG4gIHZhciBpbmRleCA9IHNlYXJjaF9idXR0b24uaW5kZXg7XHJcbiAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgaWYgKCEoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEgJiYgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA8IDEpKSB7XHJcblxyXG4gICAgdmFyIG5hbWUgPSBjaGFyYWN0ZXIubmFtZTtcclxuICAgIHZhciBtb2RpZmljYXRvciA9IGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2luZGV4XTtcclxuICAgIHZhciBpbnRlbGxpZ2VuY2UgPSBjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlO1xyXG4gICAgdmFyIHJvbGwgPSByb2xsU2VhcmNoKHBhcnNlSW50KGludGVsbGlnZW5jZSksIHBhcnNlSW50KG1vZGlmaWNhdG9yKSk7XHJcbiAgICB2YXIgem9uZV9udW1iZXIgPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaW5kZXhdO1xyXG4gICAgcHVzaFRvTGlzdCgn0J/QtdGA0YHQvtC90LDQtiAnICsgbmFtZSArICcg0LHRgNC+0YHQuNC7ICcgKyByb2xsICsgJyDQvdCwINCy0L3QuNC80LDRgtC10LvRjNC90L7RgdGC0YwnKTtcclxuXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdzZWFyY2hfYWN0aW9uJztcclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbmFtZSA9IG5hbWU7XHJcbiAgICB0b1NlbmQucm9sbCA9IHJvbGw7XHJcbiAgICB0b1NlbmQuem9uZV9udW1iZXIgPSB6b25lX251bWJlcjtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQucGxheWVyX25hbWUgPSBteV9uYW1lXHJcbiAgICB0b1NlbmQubWluZXNfZGV0ZWN0ZWQgPSBbXVxyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcblxyXG4gICAgdmFyIGxhbmRtaW5lX2NhbmRpZGF0ZXMgPSBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIGxhbmRtaW5lX2RldGVjdGlvbl9yYWRpdXMpXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhbmRtaW5lX2NhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluY2x1ZGVzKGxhbmRtaW5lX2NhbmRpZGF0ZXNbaV0pKSB7XHJcbiAgICAgICAgICB0b1NlbmQubWluZXNfZGV0ZWN0ZWQucHVzaChsYW5kbWluZV9jYW5kaWRhdGVzW2ldKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0J7QsdGL0YHQuiDQstC+INCy0YDQtdC80Y8g0LHQvtGPINGB0YLQvtC40YIg0LHQvtC90YPRgdC90L7QtSDQtNC10LnRgdGC0LLQuNC1IVwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZUluaXRpYXRpdmUoYWdpbGl0eSkge1xyXG4gIHJldHVybiBhZ2lsaXR5KjIgKyByb2xsX3goMjApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydF9uZXdfcm91bmQoKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ25ld19yb3VuZCc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB2YXIgc2F2ZV9yb2xsID0gW11cclxuICB2YXIgY2FsaW5nYWxhdG9yX2hlYWxfcm9sbF9saXN0ID0gW11cclxuICB2YXIgY2FsaW5nYWxhdG9yX2NvaW5fZmxpcCA9IFtdXHJcblxyXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZS5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2ldXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXSAhPT0gdW5kZWZpbmVkICYmIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0gIT09IG51bGwpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBzYXZlX3JvbGxbaV0gPSByb2xsX3goMjApICsgcGFyc2VJbnQoY2hhcmFjdGVyLnN0YW1pbmEpXHJcbiAgICAgIH1cclxuICAgICAgY2FsaW5nYWxhdG9yX2hlYWxfcm9sbF9saXN0W2ldID0gcm9sbF94KGNhbGluZ2FsYXRvcl9yb2xsX2hlYWwpO1xyXG4gICAgICBjYWxpbmdhbGF0b3JfY29pbl9mbGlwW2ldID0gcm9sbF94KDEwKTtcclxuICAgIH1cclxuICB9XHJcbiAgdG9TZW5kLnNhdmVfcm9sbF9saXN0ID0gc2F2ZV9yb2xsXHJcbiAgdG9TZW5kLmNhbGluZ2FsYXRvcl9oZWFsX3JvbGxfbGlzdCA9IGNhbGluZ2FsYXRvcl9oZWFsX3JvbGxfbGlzdFxyXG4gIHRvU2VuZC5jYWxpbmdhbGF0b3JfY29pbl9mbGlwID0gY2FsaW5nYWxhdG9yX2NvaW5fZmxpcFxyXG5cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2JhdHRsZV9tb2QoKSB7XHJcbiAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMFxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMVxyXG4gIH1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2JhdHRsZV9tb2QnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnZhbHVlID0gbmV3X3ZhbHVlXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbi8vIGF0dGFjayByZWxhdGVkIHRoaW5ncyAoY29tcHV0YXRpb24pXHJcblxyXG5mdW5jdGlvbiBjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpIHtcclxuICByZXR1cm4gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduX21vdmVzKGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUZsb2F0KG1vdmVfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV0pO1xyXG4gIGlmIChjaGFyYWN0ZXIuaGFzT3duUHJvcGVydHkoXCJleHRyYV9tb3ZlbWVudFwiKSkge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdICsgcGFyc2VGbG9hdChjaGFyYWN0ZXIuZXh0cmFfbW92ZW1lbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gd2VhcG9uX2RhbWFnZV9ib251cyhyYXdfZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdG90YWxfZGFtYWdlID0gcmF3X2RhbWFnZVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSAndGhyb3dpbmcnKSB7XHJcbiAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW01hdGguY2VpbChwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpLzIpXVxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gJ3JhbmdlZCcpIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpICYmIHdlYXBvbi5oYXNPd25Qcm9wZXJ0eShcImFpbV9ib251c1wiKSkge1xyXG4gICAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBwYXJzZUludCh3ZWFwb24uYWltX2JvbnVzKVxyXG4gICAgfVxyXG4gIH1cclxuICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgcmV0dXJuIHRvdGFsX2RhbWFnZVxyXG59XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtX2F0dGFjayhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX2Nob3Nlbi53ZWFwb25faWRdXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSkpIHtcclxuXHJcbiAgICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIodXNlcl9wb3NpdGlvbiwgaW5kZXgpXHJcblxyXG4gICAgdmFyIGNvdmVyX21vZGlmaWVyID0gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG5cclxuXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfS0QgPSBjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3Jlc29sdmVfYXR0YWNrJztcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQuYXR0YWNrZXJfaWQgPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5hdHRhY2tlcl9wb3NpdGlvbiA9IHVzZXJfcG9zaXRpb25cclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmF0dGFja190eXBlID0gd2VhcG9uLnR5cGVcclxuICAgIHRvU2VuZC5jb3Zlcl9sZXZlbCA9IGNvdmVyX21vZGlmaWVyLmNvdmVyX2xldmVsXHJcbiAgICB0b1NlbmQudXNlcl9pbnZpc2liaWxpdHlfZW5kZWQgPSAwXHJcblxyXG4gICAgaWYgKHdlYXBvbi5oYXNPd25Qcm9wZXJ0eShcInN1YnR5cGVcIikgJiYgd2VhcG9uLnN1YnR5cGUgPT0gXCJQUFwiKSB7XHJcbiAgICAgIHRvU2VuZC5xdWlja19hdHRhY2tfcmVhZHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W3VzZXJfY2hhcmFjdGVyX251bWJlcl0gIT0gXCJhbGxcIiAmJiB3ZWFwb24udHlwZSAhPSBcInRocm93aW5nXCIpIHtcclxuICAgICAgdG9TZW5kLnVzZXJfaW52aXNpYmlsaXR5X2VuZGVkID0gMVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb3Zlcl9tb2RpZmllci5pc1Bvc3NpYmxlKSB7XHJcbiAgICAgIHZhciBhdHRhY2tfcm9sbCA9IHJvbGxfYXR0YWNrKHdlYXBvbi50eXBlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyLCBjb3Zlcl9tb2RpZmllci5hZHZhbnRhZ2VfYm9udXMpXHJcbiAgICAgIGlmIChhdHRhY2tfcm9sbCA8IDIwKSB7Ly8gbm8gY3JpdFxyXG4gICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7Ly8g0J/RgNC40YbQtdC7INC00LDQsdC70LjRgiDQsdC+0L3Rg9GBINC/0L7Qv9Cw0LTQsNC90LjRj1xyXG4gICAgICAgICAgICBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKTtcclxuICAgICAgICAgICAgdG9TZW5kLmFpbV9vdmVyID0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuc3RyZW5ndGgpXHJcbiAgICAgICAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcImVuZXJneVwiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgMipwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSlcclxuICAgICAgICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwidGhyb3dpbmdcIikge1xyXG4gICAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuYWdpbGl0eSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBhdHRhY2tfYm9udXMgPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICB2YXIgdW5pdmVyc2FsX2JvbnVzID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQkdC+0L3Rg9GBINCw0YLQsNC60Lg6IFwiICsgYXR0YWNrX2JvbnVzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCR0L7QvdGD0YEg0LLRgdC10L7QsdGJ0LjQuTogXCIgKyB1bml2ZXJzYWxfYm9udXMpO1xyXG5cclxuICAgICAgICBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCArIGF0dGFja19ib251cyArIHVuaXZlcnNhbF9ib251cyArIGNvdmVyX21vZGlmaWVyLmF0dGFja19ib251c1xyXG5cclxuICAgICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsXHJcblxyXG4gICAgICAgIGlmIChjdW11bGF0aXZlX2F0dGFja19yb2xsID4gdGFyZ2V0X2NoYXJhY3Rlcl9LRCkgey8vINCV0YHRgtGMINC/0YDQvtCx0LjRgtC40LVcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBldmFkZV9yb2xsID0gcm9sbF9ldmFzaW9uKHRhcmdldF9jaGFyYWN0ZXIsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICB0b1NlbmQuZXZhZGVfcm9sbCA9IGV2YWRlX3JvbGxcclxuICAgICAgICAgICAgaWYgKGV2YWRlX3JvbGwgPiBjdW11bGF0aXZlX2F0dGFja19yb2xsKSB7IC8vc3VjY2VzZnVsbHkgZXZhZGVkXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImV2YWRlZFwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcIktEX2Jsb2NrXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7IC8vIGZ1bGwgY3JpdFxyXG4gICAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsXHJcbiAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmdWxsX2NyaXRcIlxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZ1bGxfY292ZXJcIlxyXG4gIH1cclxuXHJcbiAgICBpZiAodG9TZW5kLmhhc093blByb3BlcnR5KFwiZGFtYWdlX3JvbGxcIikgJiYgd2VhcG9uLmhhc093blByb3BlcnR5KFwic3VidHlwZVwiKSAmJiB3ZWFwb24uc3VidHlwZSA9PSBcImRyb2JvdmlrXCIpIHtcclxuICAgICAgdmFyIHNsb3dfc2NhbGUgPSBwYXJzZUZsb2F0KHdlYXBvbi5zbG93X3NjYWxlKTtcclxuICAgICAgdmFyIGZ1bGxfaHAgPSBIUF92YWx1ZXNbcGFyc2VJbnQodGFyZ2V0X2NoYXJhY3Rlci5zdGFtaW5hKV1cclxuICAgICAgdmFyIGN1cnJlbnRfbW92ZXMgPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIHZhciBmcmFjdGlvbiA9IHBhcnNlRmxvYXQodG9TZW5kLmRhbWFnZV9yb2xsKS9wYXJzZUZsb2F0KGZ1bGxfaHApXHJcbiAgICAgIHZhciBtb3ZlX3JlZHVjdGlvbiA9IGN1cnJlbnRfbW92ZXMgKiBmcmFjdGlvbiAqIHNsb3dfc2NhbGU7XHJcbiAgICAgIHRvU2VuZC5tb3ZlX3JlZHVjdGlvbiA9IG1vdmVfcmVkdWN0aW9uO1xyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L4uLi5cIilcclxuICB9XHJcbiAgc3RvcF9hdHRhY2soKVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfbnVtYmVyKSB7XHJcbiAgdmFyIGRhbWFnZSA9IDBcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgaWYgKGNoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJzbmlwZXJcIikge1xyXG4gICAgaWYgKGF0dGFja19yb2xsIDwgMTYpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWFwb24uZGFtYWdlWzBdOyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3god2VhcG9uLmRhbWFnZVsxXSlcclxuICAgICAgfVxyXG5cclxuICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9udW1iZXJdLmhhc093blByb3BlcnR5KFwid2Vha3Nwb3RcIikgJiYgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfbnVtYmVyXS53ZWFrc3BvdC5odW50ZXJfaWQgPT0gY2hhcmFjdGVyX251bWJlcikge1xyXG4gICAgICAgIHN3aXRjaCAoYXR0YWNrX3JvbGwpIHtcclxuICAgICAgICAgIGNhc2UgMTg6XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSoyXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOTpcclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjJcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjVcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dpdGNoIChhdHRhY2tfcm9sbCkge1xyXG4gICAgICAgICAgY2FzZSAxODpcclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE5OlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqMlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDIwOlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqM1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWFwb24uZGFtYWdlWzBdOyBpKyspIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KHdlYXBvbi5kYW1hZ2VbMV0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAxOSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlYXBvbi5kYW1hZ2VbMF07IGkrKykge1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgfVxyXG4gICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuXHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPT0gMjApIHtcclxuICAgICAgZGFtYWdlID0gZGFtYWdlICogMlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKHdlYXBvbi50eXBlID09IFwicmFuZ2VkXCIpIHtcclxuICAgIHZhciBkYW1hZ2VfdHlwZSA9IFwiYnVsbGV0XCJcclxuICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgdmFyIGRhbWFnZV90eXBlID0gXCJtZWxlZVwiXHJcbiAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcImVuZXJneVwiKSB7XHJcbiAgICAgIHZhciBkYW1hZ2VfdHlwZSA9IFwiZW5lcmd5XCJcclxuICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwidGhyb3dpbmdcIikge1xyXG4gICAgICB2YXIgZGFtYWdlX3R5cGUgPSBcIm1lbGVlXCJcclxuICB9XHJcblxyXG4gIHN3aXRjaChkYW1hZ2VfdHlwZSkge1xyXG4gICAgY2FzZSBcIm1lbGVlXCI6XHJcbiAgICAgIHZhciByZXNpc3QgPSBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfcmVzaXN0W3RhcmdldF9udW1iZXJdXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi0KPRgNC+0L0g0LTQviDRgNC10LfQuNGB0YLQsDogXCIgKyBkYW1hZ2UpXHJcbiAgICAgIGRhbWFnZSA9IHBhcnNlSW50KGRhbWFnZSAqICgxLjAgLSByZXNpc3QpKVxyXG4gICAgICBjb25zb2xlLmxvZyhcItCj0YDQvtC9INC/0L7RgdC70LUg0YDQtdC30LjRgdGC0LA6IFwiICsgZGFtYWdlKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJidWxsZXRcIjpcclxuICAgICAgdmFyIHJlc2lzdCA9IGNoYXJhY3Rlcl9zdGF0ZS5idWxsZXRfcmVzaXN0W3RhcmdldF9udW1iZXJdXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi0KPRgNC+0L0g0LTQviDRgNC10LfQuNGB0YLQsDogXCIgKyBkYW1hZ2UpXHJcbiAgICAgIGRhbWFnZSA9IHBhcnNlSW50KGRhbWFnZSAqICgxLjAgLSByZXNpc3QpKVxyXG4gICAgICBjb25zb2xlLmxvZyhcItCj0YDQvtC9INC/0L7RgdC70LUg0YDQtdC30LjRgdGC0LA6IFwiICsgZGFtYWdlKVxyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIC8vbm90aGluZyBmb3Igbm93XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGFtYWdlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRhbWFnZV9za2lsbF90ZW1wbGF0ZSh0YXJnZXRfcG9zLCB1c2VyX3BvcywgcmFuZ2UsIHVzZXJfaWQsIHNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbiwgYWNjdW11bGF0ZWRfY292ZXIpIHtcclxuICBpZiAoaXNJblJhbmdlKHRhcmdldF9wb3MsIHVzZXJfcG9zLCByYW5nZSkpIHtcclxuXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3RhcmdldF9wb3NdXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2lkXVxyXG5cclxuICAgIHZhciBjb3Zlcl9tb2RpZmllciA9IGNvdmVyX21vZChhY2N1bXVsYXRlZF9jb3ZlcilcclxuXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9pZFxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQuY292ZXJfbGV2ZWwgPSBhY2N1bXVsYXRlZF9jb3ZlclxyXG5cclxuICAgIGlmIChjb3Zlcl9tb2RpZmllci5pc1Bvc3NpYmxlKSB7XHJcblxyXG4gICAgICB2YXIgYXR0YWNrX3JvbGwgPSByb2xsX2F0dGFjayh3ZWFwb24udHlwZSwgdXNlcl9pZCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGNvdmVyX21vZGlmaWVyLmFkdmFudGFnZV9ib251cylcclxuXHJcbiAgICAgIGlmIChhdHRhY2tfcm9sbCA8IDIwKSB7Ly8gbm8gY3JpdFxyXG4gICAgICAgIHZhciBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gYXR0YWNrX3JvbGwgKyBib251c19hdHRhY2sgKyBjb3Zlcl9tb2RpZmllci5hdHRhY2tfYm9udXNcclxuXHJcbiAgICAgICAgdG9TZW5kLmF0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbFxyXG5cclxuICAgICAgICBpZiAoY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA+IHRhcmdldF9jaGFyYWN0ZXJfS0QpIHsvLyDQldGB0YLRjCDQv9GA0L7QsdC40YLQuNC1XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgZXZhZGVfcm9sbCA9IHJvbGxfZXZhc2lvbih0YXJnZXRfY2hhcmFjdGVyLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgdG9TZW5kLmV2YWRlX3JvbGwgPSBldmFkZV9yb2xsXHJcbiAgICAgICAgICAgIGlmIChldmFkZV9yb2xsID4gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCkgeyAvL3N1Y2Nlc2Z1bGx5IGV2YWRlZFxyXG4gICAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJldmFkZWRcIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9pZCwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2lkLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcIktEX2Jsb2NrXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7IC8vIGZ1bGwgY3JpdFxyXG4gICAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsXHJcbiAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2lkLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jcml0XCJcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZ1bGxfY292ZXJcIlxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvU2VuZFxyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX2RhbWFnZShjaGFyYWN0ZXJfbnVtYmVyLCBkYW1hZ2UpIHtcclxuICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJmb3JjZV9maWVsZF90YXJnZXRcIikpIHtcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSAtIGRhbWFnZVxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgc2hpZWxkX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXQuc2hpZWxkX2luZGV4XHJcbiAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkIC0gZGFtYWdlXHJcbiAgICB2YXIgbWVzc2FnZSA9IFwi0KnQuNGCINC/0YDQuNC90Y/QuyDRg9GA0L7QvSDQvdCwINGB0LXQsdGPISDQntGB0YLQsNCy0YjQsNGP0YHRjyDQv9GA0L7Rh9C90L7RgdGC0Yw6IFwiICsgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5zaGllbGRcclxuICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIGlmIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZCA8PSAwKSB7Ly8g0YnQuNGCINGD0L3QuNGH0YLQvtC20LXQvVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IFwiUHJlc3MgRiDQqdC40YLRgy4uLlwiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgdmFyIGNoYXJfbGlzdCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uY2hhcmFjdGVyX2xpc3RcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJfbGlzdFtpXVxyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldFxyXG4gICAgICB9XHJcbiAgICAgIGRlbGV0ZV9vYmplY3RfY29tbWFuZChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnBvc2l0aW9uKVxyXG4gICAgICBkZWxldGUgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFRocm93UmFuZ2UoY2hhcmFjdGVyKSB7XHJcbiAgcmV0dXJuIHRocm93X2Jhc2VfcmFuZ2UgKyBwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpKjJcclxufVxyXG5cclxuZnVuY3Rpb24gbWVsZWVfcGVuYWx0eShkYXRhKSB7XHJcbiAgaWYgKGRhdGEuYXR0YWNrX3R5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmhhc093blByb3BlcnR5KFwibWVsZWVkXCIpKSB7IC8vINC40L3QsNGH0LUg0Y3RhNGE0LXQutGCINGD0LbQtSDQvdCw0LvQvtC20LXQvSwg0L3QtSDQv9C+0LLRgtC+0YDRj9C10LxcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbZGF0YS50YXJnZXRfaWRdIC0gMVxyXG4gICAgICB2YXIgbWVsZWVkX29iamVjdCA9IHt9XHJcbiAgICAgIG1lbGVlZF9vYmplY3QuY29vbGRvd24gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLm1lbGVlZCA9IG1lbGVlZF9vYmplY3RcclxuICAgIH1cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEudGFyZ2V0X2lkXSA9PSAxKSB7XHJcbiAgICAgIHZhciBjb29sZG93biA9IDFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBjb29sZG93biA9IDBcclxuICAgIH1cclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLm1lbGVlZC5jb29sZG93biA9IGNvb2xkb3duXHJcbiAgfVxyXG59XHJcblxyXG4vLyBTa2lsbHMhXHJcblxyXG5mdW5jdGlvbiB1c2Vfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKSB7XHJcbiAgc2tpbGxfaW5kZXggPSBwYXJzZUludChza2lsbF9pbmRleClcclxuICBzd2l0Y2goc2tpbGxfaW5kZXgpIHtcclxuICAgIGNhc2UgMDogLy/QoNGL0LLQvtC6XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJjaGFyZ2VfdXNlclwiKSB8fCBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXS5zcGVjaWFsX3R5cGUgPT0gXCJyb2d1ZVwiKSkge1xyXG4gICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxOiAvL9Cf0YDQuNC70LjQsiDQkNC00YDQtdC90LDQu9C40L3QsFxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFkcmVuYWxpbmVfdXNlclwiKSkge1xyXG4gICAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1XCIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6IC8vINCf0L7QtNGA0LXQt9Cw0YLRjCDRgdGD0YXQvtC20LjQu9C40Y9cclxuICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImN1dF9saW1iX3VzZXJcIikpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LUhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDM6IC8vINCh0LvQsNCx0L7QtSDQvNC10YHRgtC+XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNDogLy8g0JvQtdGH0LXQvdC40LVcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDU6IC8vINCR0L7Qu9GM0YjQvtC5INCx0YDQsNGCXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNjogLy8g0J/QvtC00L3Rj9GC0Ywg0YnQuNGC0YtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwIHx8IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJzaGllbGRfdXBcIikpIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJzaGllbGRfdXBcIikpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic2hpZWxkX2Rvd25cIlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzaGllbGRfdXBcIlxyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDc6IC8vINC/0L7QttC40YDQsNC90LjQtSDRgdGD0YnQvdC+0YHRgtC4XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA4OiAvLyDRg9C30L3QsNGC0Ywg0LHQuNC+0L/Rg9C7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYmlvcG9vbFwiKSkge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QsNC60L7Qv9C70LXQvdC90YvQuSDQsdC40L7Qv9GD0Ls6IFwiICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5iaW9wb29sKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QsNC60L7Qv9C70LXQvdC90YvQuSDQsdC40L7Qv9GD0Lsg0L7RgtGB0YPRgtGB0YLQstGD0LXRglwiKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgOTogLy8g0LHQtdC30YPQv9GA0LXRh9C90L7QtSDQstC+0YHRgdGC0LDQvdC+0LLQu9C10L3QuNC1XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTA6IC8vINC+0LHRi9GH0L3QvtC1INCyINCx0L7QvdGD0YHQvdC+0LVcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0L7RgdC90L7QstC90YvRhSDQtNC10LnRgdGC0LLQuNC5LCDRh9GC0L7QsdGLINC/0YDQtdCy0YDQsNGC0LjRgtGMINCyINCx0L7QvdGD0YHQvdGL0LUhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDExOiAvLyDQvtGC0LTRi9GFXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdfc3RhbWluYSA9IE1hdGgubWluKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2NoYXJhY3Rlcl9udW1iZXJdICsgcmVzdF9zdGFtaW5hX2dhaW4sIHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdLnN0YW1pbmFdKVxyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgICAgdG9TZW5kLm5ld19zdGFtaW5hID0gbmV3X3N0YW1pbmFcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQktGLINGD0LbQtSDRgdC+0LLQtdGA0YjQsNC70Lgg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGN0YLQvtC8INGF0L7QtNGDLCDRgtCw0Log0YfRgtC+INC90LUg0LzQvtC20LXRgtC1INC+0YLQtNC+0YXQvdGD0YLRjFwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTI6IC8vINCz0LDQt9C+0LLQsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0KMg0LPRgNCw0L3QsNGC0Ysg0LrRg9C70LTQsNGD0L0gKNCz0LDQtyDRjdGN0Y0g0LfQsNCy0LDRgNC40LLQsNC10YLRgdGPLCDRhdC3KVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDEzOiAvLyDRgdCy0LXRgtC+0YjRg9C80L7QstCw0Y8g0LPRgNCw0L3QsNGC0LBcclxuICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImxpZ2h0X3NvdW5kX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0JPRgNCw0L3QsNGC0LAg0LXRidC1INC90LUg0LPQvtGC0L7QstCwXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNDogLy8g0KjQvtC60L7QstGL0Lkg0LjQvNC/0YPQu9GM0YFcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNTogLy8g0J/Ri9GJLdC/0YvRiS3Qs9C+XHJcbiAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInBpY2hfcGljaF91c2VyXCIpKSB7XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J/Ri9GJINC/0YvRiSDQtdGJ0LUg0L3QsCDQv9C10YDQtdC30LDRgNGP0LTQutC1IVwiKVxyXG4gICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxNjogLy8g0KHQuNC70L7QstC+0LUg0L/QvtC70LVcclxuICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJmb3JjZV9maWVsZF91c2VyXCIpKSB7XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCT0LXQvdC10YDQsNGC0L7RgCDRgdC40LvQvtCy0L7Qs9C+INC/0L7Qu9GPINC10YnQtSDQvdC1INC30LDRgNGP0LTQuNC70YHRjyFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxNzogLy8g0JjQvdCy0LjQt1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleDtcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICAgICAgICB0b1NlbmQudXNlcm5hbWUgPSBteV9uYW1lO1xyXG4gICAgICAgICAgICB0b1NlbmQucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTg6IC8vINCR0L7QtdCy0LDRjyDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4O1xyXG4gICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDE5OiAvLyDQm9Cw0LrQuCDRiNC+0YJcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMDogLy8g0JvQvtGC0LXRgNC10LnQvdGL0Lkg0LLRi9GB0YLRgNC10LtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMTogLy/Qn9GA0LjQu9C40LIg0LTQtdC50YHRgtCy0LjQuVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFjdGlvbl9zcGxhc2hcIikpIHtcclxuICAgICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtVwiKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICBjYXNlIDIyOiAvLyDQs9GA0LDQtCDRg9C00LDRgNC+0LJcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMSkge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0JTQu9GPINCz0YDQsNC00LAg0YPQtNCw0YDQvtCyINGC0YDQtdCx0YPQtdGC0YHRjyDQsdC+0LvRjNGI0LUgMSDQvtGB0L3QvtCy0L3QvtCz0L4g0LTQtdC50YHRgtCy0LjRjyFcIilcclxuICAgICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjM6IC8v0JDQtNGA0LXQvdCw0LvQuNC90L7QstGL0Lkg0L/QvtGC0L7Qv1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwicG9pc29ub3VzX2FkcmVuYWxpbmVfdXNlclwiKSkge1xyXG4gICAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjQ6IC8vINC60LjRgdC70L7RgtC90LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWNpZF9ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQoyDQs9GA0LDQvdCw0YLRiyDQutGD0LvQtNCw0YPQvSAo0LrQuNGB0LvQvtGC0LAg0L7QutC40YHQu9GP0LXRgtGB0Y8pXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI1OiAvLyDQl9Cw0LzQuNC90LjRgNC+0LLQsNGC0YxcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICAgIHRvU2VuZC5wbGF5ZXJfbmFtZSA9IG15X25hbWVcclxuICAgICAgICAgICAgdG9TZW5kLnBvc2l0aW9uID0gcG9zaXRpb25cclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjY6IC8vINCe0LHQtdC30LLRgNC10LTQuNGC0Ywg0LzQuNC90YNcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0K3RgtC+INGD0LzQtdC90LjQtSDRgtGA0LXQsdGD0LXRgiAxINCx0L7QvdGD0YHQvdC+0LUg0LTQtdC50YHRgtCy0LjQtSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjc6IC8vINCd0LjQutC+0YLQuNC90L7QstGL0Lkg0YPQtNCw0YBcclxuICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInRvYmFjY29fc3RyaWtlXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LXQu9GM0LfRjyDQt9Cw0YLRj9Cz0LjQstCw0YLRjNGB0Y8g0YLQsNC6INGH0LDRgdGC0L4hINCjINCy0LDRgSDQt9Cw0LLQuNGB0LjQvNC+0YHRgtGMXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMjg6IC8vINCa0YDRg9GH0LXQvdGL0LUg0L/Rg9C70LhcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI5OiAvLyDQn9GA0LjRhtC10LvQuNGC0YzRgdGPXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQktGLINGD0LbQtSDQv9GA0LjRhtC10LvQuNC70LjRgdGMIC0g0L/QvtGA0LAg0YjQvNCw0LvRj9GC0YxcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzA6IC8vINCx0YvRgdGC0YDQsNGPINCw0YLQsNC60LBcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwicXVpY2tfYXR0YWNrX3JlYWR5XCIpKSB7XHJcbiAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0KHQv9C10YDQstCwINC90YPQttC90L4g0YHQvtCy0LXRgNGI0LjRgtGMINC+0YHQvdC+0LLQvdGD0Y4g0LDRgtCw0LrRgyFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzE6IC8vINGB0LvRg9C20LHQsCDRgdC/0LDRgdC10L3QuNGPXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDEpIHsvLyDQtNCy0LAg0LHQvtC90YPRgdC90YvRhVxyXG4gICAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJzYWZldHlfc2VydmljZV91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1XCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzMjogLy8g0JrQsNC70YzQuNC90LPQsNC70LvRj9GC0L7RgFxyXG4gICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImNhbGluZ2FsYXRvcl91c2VyXCIpKSB7XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCn0YDQtdC30LzQtdGA0L3QvtC1INC60LDQu9C40L3Qs9Cw0LvQuNGA0L7QstCw0L3QuNC1INCy0YDQtdC00LjRgiDQstCw0YjQtdC80YMg0LfQtNC+0YDQvtCy0YzRjiEgKNC60YPQu9C00LDRg9C9KVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDMzOiAvLyDQkdCw0YTRhCDQkdC10LvRjNCy0LXRglxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzNDogLy8g0KLRgNCw0L3RgdGE0L7RgNC80LDRhtC40Y8g0JHQtdC70YzQstC10YJcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJiZWx2ZXRfYnVmZl91c2VyXCIpKSB7XHJcbiAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmJlbHZldF9idWZmX3VzZXIuaGFzT3duUHJvcGVydHkoXCJ0cmFuc2Zvcm1lZFwiKSkge1xyXG4gICAgICAgICAgYmVsdmV0X3RyYW5zZm9ybWF0aW9uKGNoYXJhY3Rlcl9udW1iZXIsIHNraWxsX2luZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQktGLINGD0LbQtSDQvtGC0LrRgNGL0LvQuCDRgdCy0L7RjiDQuNGB0YLQuNC90L3Rg9GOINGB0YPRidC90L7RgdGC0YwgLSDQv9C+0LLRgtC+0YDQvdCw0Y8g0YLRgNCw0L3RgdGE0L7RgNC80LDRhtC40Y8g0L3QtdCy0L7Qt9C80L7QttC90LAhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCS0Ysg0LTQvtC70LbQvdGLINGB0L/QtdGA0LLQsCDQv9C+0LTQs9C+0YLQvtCy0LjRgtGM0YHRjyDQuiDRgtGA0LDQvdGB0YTQvtGA0LzQsNGG0LjQuCwg0YHQvtCx0YDQsNCyINC00L7RgdGC0LDRgtC+0YfQvdC+INC00L3QuiDQv9GA0L7RgtC40LLQvdC40LrQvtCyXCIpO1xyXG4gICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzNTogLy8g0YXRg9C6XHJcbiAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiaG9va191c2VyXCIpKSB7XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LUhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzY6IC8vINC60LDRgNCw0Y7RidC40Lkg0YPQtNCw0YBcclxuICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwicHVuaXNoaW5nX3N0cmlrZV91c2VyXCIpKSB7XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LUhXCIpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYWxlcnQoXCLQndC1INC30L3QsNC10Lwg0Y3RgtC+INGD0LzQtdC90LjQtVwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGVyZm9ybV9za2lsbChpbmRleCwgY2VsbCkge1xyXG4gIHN3aXRjaChjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkKSB7XHJcbiAgICBjYXNlIDE6XHJcbiAgICAgIGFkcmVuYWxpbmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOiAvLyDQn9C+0LTRgNC10LfQsNGC0Ywg0YHRg9GF0L7QttC40LvQuNGPXHJcbiAgICAgIGN1dF9saW1icyhpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM6IC8vINCh0LvQsNCx0L7QtSDQvNC10YHRgtC+XHJcbiAgICAgIHdlYWtfc3BvdChpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDQ6IC8vINCb0LXRh9C10L3QuNC1XHJcbiAgICAgIGhlYWwoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA1OiAvLyDQkdC+0LvRjNGI0L7QuSDQsdGA0LDRglxyXG4gICAgICBiaWdfYnJvKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNzogLy8g0L/QvtC20LjRgNCw0L3QuNC1XHJcbiAgICAgIGRldm91cihpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDk6XHJcbiAgICAgIGFic29sdXRlX3JlY292ZXJ5KGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTI6XHJcbiAgICAgIGdhc19ib21iKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTM6XHJcbiAgICAgIGxpZ2h0X3NvdW5kX2JvbWIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNDpcclxuICAgICAgc2hvY2tfd2F2ZShpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE1OlxyXG4gICAgICBwaWNoX3BpY2hfZ28oaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNjpcclxuICAgICAgZm9yY2VfZmllbGQoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTk6XHJcbiAgICAgIGx1Y2t5X3Nob3QoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjA6XHJcbiAgICAgIGxvdHRlcnlfc2hvdChpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMjpcclxuICAgICAgcHVuY2hfcmFpbmZhbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjM6XHJcbiAgICAgIHBvaXNvbm91c19hZHJlbmFsaW5lKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI0OlxyXG4gICAgICBhY2lkX2JvbWIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjY6XHJcbiAgICAgIGRpZmZ1c2VfbGFuZG1pbmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyODpcclxuICAgICAgY3VydmVkX2J1bGxldHMoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzMDpcclxuICAgICAgcXVpY2tfYXR0YWNrKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzE6XHJcbiAgICAgIHNhZmV0eV9zZXJ2aWNlKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzI6XHJcbiAgICAgIGNhbGluZ2FsYXRvcihpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDMzOlxyXG4gICAgICBiZWx2ZXRfYnVmZihpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzNTpcclxuICAgICAgaG9vayhpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzNjpcclxuICAgICAgcHVuaXNoaW5nX3N0cmlrZShpbmRleCwgY2VsbCk7XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGFsZXJ0KFwiVW5rbm93biB0YXJnZXRlZCBza2lsbFwiKVxyXG4gIH1cclxuICBzdG9wX3NraWxsKClcclxufVxyXG5cclxuZnVuY3Rpb24gY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAzXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCA9IHNraWxsX2luZGV4XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkID0gY2hhcmFjdGVyX251bWJlclxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IHBvc2l0aW9uXHJcbiAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL0NoaWRvcmkud2VicFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBob29rKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb247XHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgaG9va19yYW5nZSkpIHtcclxuICAgIHZhciB0YXJnZXRfcG9zaXRpb24gPSBpbmRleDtcclxuICAgIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQ7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3RhcmdldF9wb3NpdGlvbl07XHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7XHJcbiAgICAgIHZhciB1c2VyX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXModXNlcl9wb3NpdGlvbiwgZ2FtZV9zdGF0ZS5zaXplKTtcclxuICAgICAgdmFyIHRhcmdldF9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKHRhcmdldF9wb3NpdGlvbiwgZ2FtZV9zdGF0ZS5zaXplKTtcclxuICAgICAgdmFyIHVwZGF0ZWRfY29vcmQgPSB1c2VyX2Nvb3JkO1xyXG4gICAgICB2YXIgdmVjdG9yID0ge31cclxuICAgICAgdmVjdG9yLnggPSAodGFyZ2V0X2Nvb3JkLnggLSB1c2VyX2Nvb3JkLngpO1xyXG4gICAgICB2ZWN0b3IueSA9ICh0YXJnZXRfY29vcmQueSAtIHVzZXJfY29vcmQueSk7XHJcbiAgICAgIGlmICh2ZWN0b3IueCA+IDApIHtcclxuICAgICAgICB1cGRhdGVkX2Nvb3JkLnggKz0gMTtcclxuICAgICAgfSBlbHNlIGlmICh2ZWN0b3IueCA8IDApIHtcclxuICAgICAgICB1cGRhdGVkX2Nvb3JkLnggLT0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHZlY3Rvci55ID4gMCkge1xyXG4gICAgICAgIHVwZGF0ZWRfY29vcmQueSArPSAxO1xyXG4gICAgICB9IGVsc2UgaWYgKHZlY3Rvci55IDwgMCkge1xyXG4gICAgICAgIHVwZGF0ZWRfY29vcmQueSAtPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fVxyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHZhciBuZXdfcG9zaXRpb24gPSBjb29yZF90b19pbmRleCh1cGRhdGVkX2Nvb3JkLCBnYW1lX3N0YXRlLnNpemUpXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW25ld19wb3NpdGlvbl0gPT0gMCkge1xyXG4gICAgICAgIHRvU2VuZC5ob29rX3Bvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0b1NlbmQub2xkX3Bvc2l0aW9uID0gdGFyZ2V0X3Bvc2l0aW9uO1xyXG4gICAgICAgIHRvU2VuZC5uZXdfcG9zaXRpb24gPSBuZXdfcG9zaXRpb247XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLmhvb2tfcG9zc2libGUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0JLQsNGI0Lgg0YbQtdC70Lgg0LfQsCDQv9GA0LXQtNC10LvQsNC80Lgg0LzQvtC10LPQviDQv9C+0L3QuNC80LDQvdC40Y8sINC/0L7RjdGC0L7QvNGDINC90LXRglwiKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQnNCw0LrRgdC40LzQsNC70YzQvdGL0Lkg0YDQsNC00LjRg9GBINGF0YPQutCwIC0gMyDQutC70LXRgtC60LhcIik7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYmVsdmV0X3RyYW5zZm9ybWF0aW9uKHVzZXJfaW5kZXgsIHNraWxsX2luZGV4KSB7XHJcbiAgdmFyIHVzZXIgPSAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF07XHJcbiAgdmFyIHRhcmdldHNfc2V0ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iZWx2ZXRfYnVmZl91c2VyLnRhcmdldHNfc2V0O1xyXG4gIHZhciB0b3RhbF91cGdyYWRlID0gMDtcclxuICB2YXIgcm9sbGVkX2J1ZmZzX3RhcmdldHMgPSBbXTtcclxuICB2YXIgcm9sbGVkX2J1ZmZzX291dGNvbWVzID0gW107XHJcbiAgZm9yICh2YXIgdGFyZ2V0X2lkIG9mIHRhcmdldHNfc2V0KSB7XHJcbiAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2lkXTtcclxuICAgIHZhciB0YXJnZXRfc3RhY2tzID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaWRdLmJlbHZldF9idWZmX3N0YWNrcy5zdGFja3M7XHJcbiAgICB2YXIgYnVmZnNfYXJyYXkgPSBbXTtcclxuICAgIHZhciByb2xsZWRfYXJyYXkgPSBbMCwwLDAsMCwwXTtcclxuICAgIGJ1ZmZzX2FycmF5LnB1c2godGFyZ2V0LnN0cmVuZ3RoKTtcclxuICAgIGJ1ZmZzX2FycmF5LnB1c2godGFyZ2V0LnN0YW1pbmEpO1xyXG4gICAgYnVmZnNfYXJyYXkucHVzaCh0YXJnZXQuYWdpbGl0eSk7XHJcbiAgICBidWZmc19hcnJheS5wdXNoKHRhcmdldC5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgYnVmZnNfYXJyYXkucHVzaChjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW3RhcmdldF9pZF0gLSA4KTtcclxuICAgIHZhciB0b3RhbF9yb2xsID0gdGFyZ2V0LnN0cmVuZ3RoICsgdGFyZ2V0LnN0YW1pbmEgKyB0YXJnZXQuYWdpbGl0eSArIHRhcmdldC5pbnRlbGxpZ2VuY2UgKyBjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW3RhcmdldF9pZF0gLSA4O1xyXG4gICAgd2hpbGUgKHRhcmdldF9zdGFja3MgPiAwICYmIHRvdGFsX3JvbGwgPiAwKSB7XHJcbiAgICAgIHZhciByb2xsID0gcm9sbF94KHRvdGFsX3JvbGwpO1xyXG4gICAgICBpZiAocm9sbCA8PSBidWZmc19hcnJheVswXSkgey8vIHN0cmVuZ3RoXHJcbiAgICAgICAgYnVmZnNfYXJyYXlbMF0gLT0gMTtcclxuICAgICAgICByb2xsZWRfYXJyYXlbMF0gKz0gMTtcclxuICAgICAgfSBlbHNlIGlmIChyb2xsIDw9IGJ1ZmZzX2FycmF5WzBdICsgYnVmZnNfYXJyYXlbMV0pIHsvL3N0YW1pbmFcclxuICAgICAgICBidWZmc19hcnJheVsxXSAtPSAxO1xyXG4gICAgICAgIHJvbGxlZF9hcnJheVsxXSArPSAxO1xyXG4gICAgICB9IGVsc2UgaWYgKHJvbGwgPD0gYnVmZnNfYXJyYXlbMF0gKyBidWZmc19hcnJheVsxXSArIGJ1ZmZzX2FycmF5WzJdKSB7Ly8gYWdpbGl0eVxyXG4gICAgICAgIGJ1ZmZzX2FycmF5WzJdIC09IDE7XHJcbiAgICAgICAgcm9sbGVkX2FycmF5WzJdICs9IDE7XHJcbiAgICAgIH0gZWxzZSBpZiAocm9sbCA8PSBidWZmc19hcnJheVswXSArIGJ1ZmZzX2FycmF5WzFdICsgYnVmZnNfYXJyYXlbMl0gKyBidWZmc19hcnJheVszXSkgey8vIGludGVsbGlnZW5jZVxyXG4gICAgICAgIGJ1ZmZzX2FycmF5WzNdIC09IDE7XHJcbiAgICAgICAgcm9sbGVkX2FycmF5WzNdICs9IDE7XHJcbiAgICAgIH0gZWxzZSB7Ly8gS0RcclxuICAgICAgICBidWZmc19hcnJheVs0XSAtPSAxO1xyXG4gICAgICAgIHJvbGxlZF9hcnJheVs0XSArPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHRvdGFsX3JvbGwgLT0gMTtcclxuICAgICAgdGFyZ2V0X3N0YWNrcyAtPSAxO1xyXG4gICAgICB0b3RhbF91cGdyYWRlICs9IDE7XHJcbiAgICB9XHJcbiAgICByb2xsZWRfYnVmZnNfdGFyZ2V0cy5wdXNoKHRhcmdldF9pZCk7XHJcbiAgICByb2xsZWRfYnVmZnNfb3V0Y29tZXMucHVzaChyb2xsZWRfYXJyYXkpO1xyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfaW5kZXhcclxuICB0b1NlbmQudG90YWxfdXBncmFkZSA9IHRvdGFsX3VwZ3JhZGU7XHJcbiAgdG9TZW5kLnJvbGxlZF9idWZmc190YXJnZXRzID0gcm9sbGVkX2J1ZmZzX3RhcmdldHNcclxuICB0b1NlbmQucm9sbGVkX2J1ZmZzX291dGNvbWVzID0gcm9sbGVkX2J1ZmZzX291dGNvbWVzO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gc2FmZXR5X3NlcnZpY2UoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBzYWZldHlfc2VydmljZV9yYW5nZSkpIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwic2FmZXR5X3NlcnZpY2VfdGFyZ2V0XCIpKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0K3RgtCwINGG0LXQu9GMINGD0LbQtSDQv9C+0LQg0LfQsNGJ0LjRgtC+0LlcIilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQktGLINC90LUg0LzQvtC20LXRgtC1INC30LDRidC40YnQsNGC0Ywg0YEg0YLQsNC60L7Qs9C+INGA0LDRgdGB0YLQvtGP0L3QuNGPXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBiZWx2ZXRfYnVmZihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGJlbHZldF9idWZmX3JhbmdlKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJiZWx2ZXRfYnVmZl90YXJnZXRcIikpIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndCwINGN0YLQvtC8INC/0LXRgNGB0L7QvdCw0LbQtSDRg9C20LUg0LXRgdGC0Ywg0LDQutGC0LjQstC90YvQuSDQsdCw0YTRhCDRjdGC0L7Qs9C+INGC0LjQv9CwICjRg9Cy0YspXCIpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQsdCw0YTRhNCw0YLRjCAo0YXQtS3RhdC1KSDRgSDRgtCw0LrQvtCz0L4g0YDQsNGB0YHRgtC+0Y/QvdC40Y9cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdlYWtfc3BvdChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcblxyXG4gIHZhciBpbnRfY2hlY2sgPSByb2xsX3goMjApICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGludF9jaGVjayA+PSB3ZWFrX3Nwb3RfdGhyZXNob2xkKSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgfSBlbHNlIHtcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICB9XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZWFsKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgaGVhbF9yYW5nZSkpIHtcclxuXHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgaGVhbGVyX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdGFyZ2V0X2hwID0gY2hhcmFjdGVyX3N0YXRlLkhQW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0YXJnZXRfZnVsbF9ocCA9IEhQX3ZhbHVlc1t0YXJnZXRfY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgdmFyIHJhdGlvID0gcGFyc2VGbG9hdCh0YXJnZXRfaHApL3BhcnNlRmxvYXQodGFyZ2V0X2Z1bGxfaHApXHJcblxyXG4gIHZhciBoZWFsX3JvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoaGVhbGVyX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgIGhlYWxfcm9sbCA9IGhlYWxfcm9sbCArIHBhcnNlSW50KGhlYWxlcl9jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLmhlYWxfcm9sbCA9IGhlYWxfcm9sbFxyXG5cclxuICB2YXIgdGhyZXNob2xkID0gMFxyXG4gIHZhciBjcml0aWNhbF90aHJlc2hvbGQgPSAwXHJcblxyXG4gIGlmIChyYXRpbyA+IDAuOSkge1xyXG4gICAgdGhyZXNob2xkID0gMTBcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC43NSkge1xyXG4gICAgdGhyZXNob2xkID0gMTVcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjk1KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjBcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI5XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuOTUpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC44MilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjMpIHtcclxuICAgIHRocmVzaG9sZCA9IDIzXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSAzMlxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjgyKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC4xNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjZcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDM1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC40KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuMDUpIHtcclxuICAgIHRocmVzaG9sZCA9IDMwXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSA0MFxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjQpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC4yMilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgfVxyXG5cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0J3Rg9C20L3QviDQv9C+0LTQvtC50YLQuCDQsdC70LjQttC1INC6INGG0LXQu9C4INGH0YLQvtCx0Ysg0LLRi9C70LXRh9C40YLRjFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYmlnX2JybyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGJpZ19icm9fcmFuZ2UpKSB7XHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuXHJcbiAgdmFyIHNoaWVsZF9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICB2YXIgdGFyZ2V0X0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuXHJcbiAgdmFyIGJvbnVzX0tEID0gTWF0aC5tYXgoc2hpZWxkX0tEIC0gIHRhcmdldF9LRCwgMClcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5ib251c19LRCA9IGJvbnVzX0tEXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQkdC+0LvRjNGI0L7QuSDQsdGA0LDRgiDQvdC1INC00L7RgdGC0LDQtdGCINC00L4g0LzQsNC70L7Qs9C+IVwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1bmlzaGluZ19zdHJpa2UoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV07XHJcbiAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHN0YXRfYm9udXM7XHJcbiAgc3dpdGNoKHdlYXBvbi50eXBlKSB7XHJcbiAgICBjYXNlIFwibWVsZWVcIjpcclxuICAgICAgc3RhdF9ib251cyA9IGF0dGFja2luZ19jaGFyYWN0ZXIuc3RyZW5ndGg7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInJhbmdlZFwiOlxyXG4gICAgICBzdGF0X2JvbnVzID0gYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImVuZXJneVwiOlxyXG4gICAgICBzdGF0X2JvbnVzID0gYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgc3RhdF9ib251cyA9IDA7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKHN0YXRfYm9udXMpO1xyXG4gIHZhciBib251c19hdHRhY2sgPSBzdGF0X2JvbnVzICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKGluZGV4LCB1c2VyX3Bvc2l0aW9uKVxyXG4gIHZhciB0b1NlbmQgPSBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbiwgYWNjdW11bGF0ZWRfY292ZXIpO1xyXG4gIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgdmFyIGRhbWFnZV9yb2xsID0gdG9TZW5kLmRhbWFnZV9yb2xsXHJcbiAgICAgIHZhciBtdWx0aXBseWVyID0gMS4wIC0gcHVuaXNoaW5nX3N0cmlrZV9tdWx0aXBseWVyKihjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pO1xyXG4gICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgKj0gbXVsdGlwbHllcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gaW5jcmVhc2UgYXR0YWNrIHJvbGwgYnkgYWdpbGl0eSBib251cyAoMiptb2QpXHJcbmZ1bmN0aW9uIGN1dF9saW1icyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuICBpZiAod2VhcG9uLnR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgIHZhciBib251c19hdHRhY2sgPSAyKnBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuYWdpbGl0eSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIoaW5kZXgsIHVzZXJfcG9zaXRpb24pXHJcbiAgICB2YXIgdG9TZW5kID0gZGFtYWdlX3NraWxsX3RlbXBsYXRlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCwgYm9udXNfYXR0YWNrLCB3ZWFwb24sIGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gICAgaWYgKHRvU2VuZCA9PSBudWxsKSB7XHJcbiAgICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJmdWxsX2NyaXRcIikge1xyXG4gICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IHRvU2VuZC5kYW1hZ2Vfcm9sbFxyXG4gICAgICAgIHZhciBmbGF0X2RhbWFnZSA9IGRhbWFnZV9yb2xsIC0gc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLnN0cmVuZ3RoKV0gLSBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICB2YXIgZnVsbF9kYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgIGlmIChmbGF0X2RhbWFnZSA+IGZ1bGxfZGFtYWdlLzMpIHtcclxuICAgICAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB9ICBlbHNlIHtcclxuICAgICAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfVxyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQktGLINC90LUg0LzQvtC20LXRgtC1INC/0L7QtNGA0LXQt9Cw0YLRjCDRgdGD0YXQvtC20LjQu9GM0Y8g0Y3RgtC40Lwg0L7RgNGD0LbQuNC10LxcIilcclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gcXVpY2tfYXR0YWNrKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIGlmICh3ZWFwb24uaGFzT3duUHJvcGVydHkoXCJzdWJ0eXBlXCIpICYmIHdlYXBvbi5zdWJ0eXBlID09IFwiUFBcIikge1xyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYm9udXNfYXR0YWNrID0gcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKGluZGV4LCB1c2VyX3Bvc2l0aW9uKVxyXG4gICAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICAgIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSB0b1NlbmQuZGFtYWdlX3JvbGwvMjsgLy8g0LHRi9GB0YLRgNCw0Y8g0LDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiDQv9C+0LvQvtCy0LjQvdGDINGD0YDQvtC90LBcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCR0YvRgdGC0YDRg9GOINCw0YLQsNC60YMg0LzQvtC20L3QviDRgdC+0LLQtdGA0YjQuNGC0Ywg0YLQvtC70YzQutC+INC/0LjRgdGC0L7Qu9C10YLQvtC8LdC/0YPQu9C10LzQtdGC0L7QvFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHVuY2hfcmFpbmZhbGwoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcbiAgaWYgKHdlYXBvbi50eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJfaWQgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcl9pZF1cclxuICAgIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmFnaWxpdHkpICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgdmFyIHRvdGFsX2RhbWFnZSA9IDA7XHJcbiAgICB2YXIgYXR0YWNrc19zdWNjZXNzZnVsID0gMDtcclxuICAgIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3ZlcihpbmRleCwgdXNlcl9wb3NpdGlvbik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdOyBpKyspIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICAgICAgaWYgKHRvU2VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgICAgICAgYXR0YWNrc19zdWNjZXNzZnVsID0gYXR0YWNrc19zdWNjZXNzZnVsICsgMTtcclxuICAgICAgICAgICAgdG90YWxfZGFtYWdlID0gdG90YWxfZGFtYWdlICsgdG9TZW5kLmRhbWFnZV9yb2xsO1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyX2lkXSA9IDA7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRvU2VuZC5vdXRjb21lID09IFwiZXZhZGVkXCIgJiYgdGFyZ2V0X2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgIT0gXCJyb2d1ZVwiKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJfaWRdID0gMDtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBtdWx0aXBseWVyID0gMS4wICsgcGFyc2VGbG9hdChhdHRhY2tzX3N1Y2Nlc3NmdWwgLSAxKS8yLjBcclxuICAgIHZhciBtZXNzYWdlID0gXCLQnNC90L7QttC40YLQtdC70Ywg0LPRgNCw0LTQsCDQsdGL0Ls6IFwiICsgbXVsdGlwbHllclxyXG4gICAgY29uc29sZS5sb2cobWVzc2FnZSlcclxuICAgIHZhciBmaW5hbF9kYW1hZ2UgPSBwYXJzZUludChwYXJzZUZsb2F0KHRvdGFsX2RhbWFnZSkqbXVsdGlwbHllcilcclxuXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcl9pZFxyXG4gICAgdG9TZW5kLnRvdGFsX2F0dGFja3MgPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdG9TZW5kLnN1Y2Nlc3NmdWxsX2F0dGFja3MgPSBhdHRhY2tzX3N1Y2Nlc3NmdWxcclxuICAgIHRvU2VuZC5kYW1hZ2UgPSBmaW5hbF9kYW1hZ2VcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQk9GA0LDQtCDRg9C00LDRgNC+0LIg0LzQvtC20L3QviDRgdC+0LLRgNC10YjQuNGC0Ywg0YLQvtC70YzQutC+INGA0YPQutC+0L/QsNGI0L3Ri9C8INC+0YDRg9C20LjQtdC8IVwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvY2tfd2F2ZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgYm9udXNfYXR0YWNrID0gcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3ZlcihpbmRleCwgdXNlcl9wb3NpdGlvbik7XHJcbiAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImZ1bGxfY3JpdFwiKSB7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGV2b3VyKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgMSkpIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgc3RhY2tzID0gMFxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiTWFya3VzX3N0YWNrc1wiKSkge1xyXG4gICAgICBzdGFja3MgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5NYXJrdXNfc3RhY2tzXHJcbiAgICB9XHJcbiAgICB2YXIgZGFtYWdlID0gc3RhY2tzKjUgKyByb2xsX3goMTApXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFic29sdXRlX3JlY292ZXJ5KGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgMSkpIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgaGVhbF9hbW91bnQgPSAwXHJcblxyXG4gICAgdmFyIGRhbWFnZV9maWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFtYWdlX2ZpZWxkXCIpO1xyXG4gICAgaWYgKCEoZGFtYWdlX2ZpZWxkLnZhbHVlID09PSBcIlwiKSkge1xyXG4gICAgICBoZWFsX2Ftb3VudCA9IHBhcnNlSW50KGRhbWFnZV9maWVsZC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJpb3Bvb2wgPSAwXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYmlvcG9vbFwiKSkge1xyXG4gICAgICBiaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmJpb3Bvb2xcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaGVhbF9hbW91bnQgPiAwICYmIGJpb3Bvb2wgPj0gaGVhbF9hbW91bnQpIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHRvU2VuZC5oZWFsX2Ftb3VudCA9IGhlYWxfYW1vdW50XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC10LLQvtC30LzQvtC20L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LvQtdGH0LXQvdC40Y9cIilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2FzX2JvbWIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0aHJvd19yYW5nZSA9IGZpbmRUaHJvd1JhbmdlKGNoYXJhY3RlcilcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB0aHJvd19yYW5nZSkpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHRvU2VuZC50aHJlc2hvbGQgPSBnYXNfYm9tYl90aHJlc2hvbGRcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7Ly8g0LDQvdC40LzQsNGG0LjRjyDRgtC+0LvRjNC60L4g0LIg0L/Rg9GB0YLRg9GOINC60LvQtdGC0LrRg1xyXG4gICAgICBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgZ2FzX2JvbWJfb2JzdGFjbGUpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JzQsNC70L4g0LrQsNGI0Lgg0LXQu9C4INC00LvRjyDRgtCw0LrQvtCz0L4g0LHRgNC+0YHQutCwXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYWxpbmdhbGF0b3IoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7Ly8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YLRgdGPINGC0L7Qu9GM0LrQviDQsiDQv9GD0YHRgtGD0Y4g0LrQu9C10YLQutGDXHJcbiAgICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBjYWxpbmdhbGF0b3JfcmFuZ2UpKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgICAgYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIGNhbGluZ2FsYXRvcl9vYnN0YWNsZSlcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCa0LDQu9GM0LjQvdCz0LDQu9C70Y/RgtC+0YAg0LzQvtC20L3QviDRg9GB0YLQsNC90L7QstC40YLRjCDQu9C40YjRjCDQsiDQv9GA0LXQtNC10LvQsNGFIDEuNSDQutC70LXRgtC60Lgg0L7RgiDQstCw0YFcIilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQmtCw0LvRjNC40L3Qs9Cw0LvQu9GP0YLQvtGAINC80L7QttC90L4g0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0LvQuNGI0Ywg0LIg0L/Rg9GB0YLRg9GOINC60LvQtdGC0LrRg1wiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGlmZnVzZV9sYW5kbWluZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cykpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJlbXB0eVwiXHJcblxyXG4gICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhpbmRleCkpIHtcclxuICAgICAgdmFyIHJvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoY2hhcmFjdGVyLmludGVsbGlnZW5jZSlcclxuICAgICAgaWYgKHJvbGwgPiBsYW5kbWluZV9kaWZmdXNlX3RocmVzaG9sZCkge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCh0LvQuNGI0LrQvtC8INC00LDQu9C10LrQviDQtNC70Y8g0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0LjRj1wiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWNpZF9ib21iKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGhyb3dfcmFuZ2UgPSBmaW5kVGhyb3dSYW5nZShjaGFyYWN0ZXIpXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgdGhyb3dfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQnNCw0LvQviDQutCw0YjQuCDQtdC70Lgg0LTQu9GPINGC0LDQutC+0LPQviDQsdGA0L7RgdC60LBcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpZ2h0X3NvdW5kX2JvbWIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgbGlnaHRfc291bmRfYm9tYl9yYW5nZSkpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuXHJcbiAgdmFyIGNoYXJhY3Rlcl9saXN0ID0gW11cclxuICB2YXIgb3V0Y29tZV9saXN0ID0gW11cclxuXHJcbiAgdmFyIHJhZGl1cyA9IGxpZ2h0X3NvdW5kX2JvbWJfcmFkaXVzXHJcblxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhZGl1cylcclxuICBjb25zb2xlLmxvZyhjYW5kaWRhdGVfY2VsbHMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0LHQvtC80LHRi1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlICE9PSBcImRyb25lXCIpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfbGlzdC5wdXNoKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIHZhciBzYXZlX3JvbGwgPSByb2xsX3goMjApICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gKyBwYXJzZUludChjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gICAgICAgIGlmIChzYXZlX3JvbGwgPiBsaWdodF9zb3VuZF9ib21iX3RocmVzaG9sZCkge1xyXG4gICAgICAgICAgb3V0Y29tZV9saXN0LnB1c2goMClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb3V0Y29tZV9saXN0LnB1c2goMSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9saXN0ID0gY2hhcmFjdGVyX2xpc3RcclxuICB0b1NlbmQub3V0Y29tZV9saXN0ID0gb3V0Y29tZV9saXN0XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59IGVsc2Uge1xyXG4gIGFsZXJ0KFwi0JTRgNC+0L0g0L3QtSDQtNC+0LrQuNC90LXRglwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcmNlX2ZpZWxkKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGZvcmNlX2ZpZWxkX3JhbmdlKSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG5cclxuICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgdmFyIHNoaWVsZCA9IE1hdGguY2VpbChwYXJzZUZsb2F0KEhQX3ZhbHVlc1t1c2VyLnN0YW1pbmFdKS8yKVxyXG4gIHRvU2VuZC5zaGllbGQgPSBzaGllbGRcclxuXHJcbiAgdmFyIGNoYXJhY3Rlcl9saXN0ID0gW11cclxuXHJcbiAgdmFyIHJhZGl1cyA9IGZvcmNlX2ZpZWxkX3JhZGl1c1xyXG5cclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gaW5kZXhfaW5fcmFkaXVzKGluZGV4LCByYWRpdXMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0YnQuNGC0LBcclxuICAgICAgICBjaGFyYWN0ZXJfbGlzdC5wdXNoKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgfVxyXG4gIH1cclxuICB0b1NlbmQuY2VsbHNfcHJvdGVjdGVkID0gY2FuZGlkYXRlX2NlbGxzXHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9saXN0ID0gY2hhcmFjdGVyX2xpc3RcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIGZvcmNlX2ZpZWxkX29ic3RhY2xlKVxyXG59IGVsc2Uge1xyXG4gIGFsZXJ0KFwi0JPQtdC90LXRgNCw0YLQvtGAINC00L7Qu9C20LXQvSDQsdGL0YLRjCDRg9GB0YLQsNC90L7QstC70LXQvSDQv9C+0LHQu9C40LbQtVwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkcmVuYWxpbmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciBhZHJlbmFsaW5lX3JhbmdlID0gMVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGFkcmVuYWxpbmVfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaW5kZXggPSB0YXJnZXRfbnVtYmVyXHJcbiAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IHJvbGxfeCg0KVxyXG4gICAgdmFyIG1pbnVzX2FjdGlvbnMgPSByb2xsX3goNClcclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgdG9TZW5kLm1pbnVzX2FjdGlvbnMgPSBtaW51c19hY3Rpb25zXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcG9pc29ub3VzX2FkcmVuYWxpbmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHBvaXNvbm91c19hZHJlbmFsaW5lX3JhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2luZGV4ID0gdGFyZ2V0X251bWJlclxyXG4gICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBbXVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbjsgaSsrKSB7XHJcbiAgICAgIGV4dHJhX2FjdGlvbnMucHVzaChyb2xsX3goNCkpXHJcbiAgICB9XHJcbiAgICB0b1NlbmQuZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnNcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCg0LDQtNC40YPRgSDQsNC00YDQtdC90LDQu9C40L3QsCAxINC60LvQtdGC0LrQsCFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBpY2hfcGljaF9nbyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfbnVtYmVyXVxyXG4gIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlID09IFwiZHJvbmVcIikge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2luZGV4ID0gdGFyZ2V0X251bWJlclxyXG4gICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBNYXRoLmNlaWwocGFyc2VGbG9hdCh1c2VyLmludGVsbGlnZW5jZSkvMilcclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQv9GL0Ykt0L/Ri9GJINC60L7Qs9C+INC/0L7Qv9Cw0LvQviFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGx1Y2t5X3Nob3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbF94KDEwKVxyXG4gICAgaWYgKHRvU2VuZC5yb2xsID09IDcpIHtcclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IHJvbGxfeCg3KVxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb3R0ZXJ5X3Nob3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbF94KDEwMClcclxuICAgIGlmICh0b1NlbmQucm9sbCA9PSA3KSB7XHJcbiAgICAgIHZhciBkYW1hZ2UgPSAwXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KDcpXHJcbiAgICAgIH1cclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZVxyXG4gICAgfSBlbHNlIGlmICh0b1NlbmQucm9sbCA9PSA3Nykge1xyXG4gICAgICB2YXIgZGFtYWdlID0gMFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE0OyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3goNylcclxuICAgICAgfVxyXG4gICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGN1cnZlZF9idWxsZXRzKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7XHJcbiAgICBib251c19hdHRhY2sgPSBib251c19hdHRhY2sgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSk7XHJcbiAgfVxyXG4gIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3ZlcihpbmRleCwgdXNlcl9wb3NpdGlvbik7XHJcbiAgYWNjdW11bGF0ZWRfY292ZXIgPSBNYXRoLm1heChwYXJzZUludChwYXJzZUZsb2F0KGFjY3VtdWxhdGVkX2NvdmVyKS8yKSAtIDIsIDApXHJcbiAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSkge1xyXG4gICAgICB0b1NlbmQuYWltX292ZXIgPSAxO1xyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBoZWxwZXIgZnVuY3Rpb24gcGF0dGVybnNcclxuZnVuY3Rpb24gY2hlY2tfY29vbGRvd24oY2hhcmFjdGVyX251bWJlciwgZWZmZWN0LCBtZXNzYWdlKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoZWZmZWN0KSkge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl1bZWZmZWN0XS5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdW2VmZmVjdF1cclxuICAgICAgaWYgKG1lc3NhZ2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXVtlZmZlY3RdLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXVtlZmZlY3RdLmNvb2xkb3duIC0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVzdG9yZV9ocChjaGFyYWN0ZXJfbnVtYmVyLCBhbW91bnQpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICBjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gPSBNYXRoLm1pbihjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gKyBhbW91bnQsIEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KHByb3BlcnR5LCBjaGFyYWN0ZXJfbnVtYmVyLCBhbW91bnQpIHtcclxuICBjaGFyYWN0ZXJfc3RhdGVbcHJvcGVydHldW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlW3Byb3BlcnR5XVtjaGFyYWN0ZXJfbnVtYmVyXSArIGFtb3VudFxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VfY2hhcmFjdGVyX2RldGFpbGVkX2F0dHJpYnV0ZShhdHRyaWJ1dGUsIGNoYXJhY3Rlcl9udW1iZXIsIGFtb3VudCkge1xyXG4gIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdW2F0dHJpYnV0ZV0gPSBwYXJzZUludChjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVthdHRyaWJ1dGVdKSArIGFtb3VudFxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseV9lZmZlY3QoY2hhcmFjdGVyX251bWJlciwgZWZmZWN0X251bWJlcikge1xyXG5cclxuICBlZmZlY3RfbnVtYmVyID0gcGFyc2VJbnQoZWZmZWN0X251bWJlcik7XHJcbiAgc3dpdGNoIChlZmZlY3RfbnVtYmVyKSB7XHJcbiAgICBjYXNlIDA6IC8vINGD0LLQtdC70LjRh9C40YLRjCDRgdC40LvRg1xyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX2RldGFpbGVkX2F0dHJpYnV0ZShcInN0cmVuZ3RoXCIsIGNoYXJhY3Rlcl9udW1iZXIsIDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTogLy8g0YPQstC10LvQuNGH0LjRgtGMINGC0LXQu9C+0YHQu9C+0LbQtdC90LjQtVxyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX2RldGFpbGVkX2F0dHJpYnV0ZShcInN0YW1pbmFcIiwgY2hhcmFjdGVyX251bWJlciwgMSk7XHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXTtcclxuICAgICAgdmFyIHN0YW1pbmEgPSBjaGFyYWN0ZXIuc3RhbWluYTtcclxuXHJcbiAgICAgIHZhciBocF91cGdyYWRlID0gSFBfdmFsdWVzW3N0YW1pbmFdIC0gSFBfdmFsdWVzW3N0YW1pbmEgLSAxXTtcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcIkhQXCIsIGNoYXJhY3Rlcl9udW1iZXIsIGhwX3VwZ3JhZGUpO1xyXG5cclxuICAgICAgdmFyIHN0YW1pbmFfdXBncmFkZSA9IHN0YW1pbmFfdmFsdWVzW3N0YW1pbmFdIC0gc3RhbWluYV92YWx1ZXNbc3RhbWluYSAtIDFdO1xyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwic3RhbWluYVwiLCBjaGFyYWN0ZXJfbnVtYmVyLCBzdGFtaW5hX3VwZ3JhZGUpO1xyXG5cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6IC8vINGD0LLQtdC70LjRh9C40YLRjCDQu9C+0LLQutC+0YHRgtGMXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfZGV0YWlsZWRfYXR0cmlidXRlKFwiYWdpbGl0eVwiLCBjaGFyYWN0ZXJfbnVtYmVyLCAxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM6IC8vINGD0LLQtdC70LjRh9C40YLRjCDQuNC90YLQtdC70LvQtdC60YJcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9kZXRhaWxlZF9hdHRyaWJ1dGUoXCJpbnRlbGxpZ2VuY2VcIiwgY2hhcmFjdGVyX251bWJlciwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA0OiAvLyDRg9Cy0LXQu9C40YfQuNGC0Ywg0JrQlFxyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwiYm9udXNfS0RcIiwgY2hhcmFjdGVyX251bWJlciwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNTogLy8g0YPQvNC10L3RjNGI0LjRgtGMINGB0LjQu9GDXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfZGV0YWlsZWRfYXR0cmlidXRlKFwic3RyZW5ndGhcIiwgY2hhcmFjdGVyX251bWJlciwgLTEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNjogLy8g0YPQvNC10L3RjNGI0LjRgtGMINGC0LXQu9C+0YHQu9C+0LbQtdC90LjQtVxyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX2RldGFpbGVkX2F0dHJpYnV0ZShcInN0YW1pbmFcIiwgY2hhcmFjdGVyX251bWJlciwgLTEpO1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl07XHJcbiAgICAgIHZhciBzdGFtaW5hID0gY2hhcmFjdGVyLnN0YW1pbmE7XHJcbiAgICAgIHZhciBocF91cGdyYWRlID0gTWF0aC5tYXgoSFBfdmFsdWVzW3N0YW1pbmFdIC0gSFBfdmFsdWVzW3N0YW1pbmEgKyAxXSwgLTEqY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdICsgMSk7XHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJIUFwiLCBjaGFyYWN0ZXJfbnVtYmVyLCBocF91cGdyYWRlKTtcclxuXHJcbiAgICAgIHZhciBzdGFtaW5hX3VwZ3JhZGUgPSBNYXRoLm1heChzdGFtaW5hX3ZhbHVlc1tzdGFtaW5hXSAtIHN0YW1pbmFfdmFsdWVzW3N0YW1pbmEgKyAxXSwgLTEqY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0gKyAxKTtcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcInN0YW1pbmFcIiwgY2hhcmFjdGVyX251bWJlciwgc3RhbWluYV91cGdyYWRlKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDc6IC8vINGD0LzQtdC90YzRiNC40YLRjCDQu9C+0LLQutC+0YHRgtGMXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfZGV0YWlsZWRfYXR0cmlidXRlKFwiYWdpbGl0eVwiLCBjaGFyYWN0ZXJfbnVtYmVyLCAtMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA4OiAvLyDRg9C80LXQvdGM0YjQuNGC0Ywg0LjQvdGC0LXQu9C70LXQutGCXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfZGV0YWlsZWRfYXR0cmlidXRlKFwiaW50ZWxsaWdlbmNlXCIsIGNoYXJhY3Rlcl9udW1iZXIsIC0xKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDk6IC8vINGD0LzQtdC90YzRiNC40YLRjCDQmtCUXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJib251c19LRFwiLCBjaGFyYWN0ZXJfbnVtYmVyLCAtMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgY29uc29sZS5sb2coXCJUcmllZCB0byBhcHBseSB1bmtub3duIGVmZmVjdFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9yY2VkX21vdmVtZW50KGZyb21faW5kZXgsIHRvX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVt0b19pbmRleF0gPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA9IHRvX2luZGV4O1xyXG4gIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG5cclxuICBpZiAoISgoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbdG9faW5kZXhdID09IDEpKSB8fCAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSAhPSBcImFsbFwiICYmIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gIT0gbXlfbmFtZSkpKSB7XHJcbiAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcbiAgICB0b19jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShjaGFyYWN0ZXJfbnVtYmVyKTtcclxuICB9XHJcblxyXG4gIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2Zyb21faW5kZXhdID09IDEpKSkge1xyXG4gICAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZnJvbV9pbmRleCk7XHJcbiAgICBvbGRfY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICB9XHJcbn1cclxuXHJcbi8vINC/0YDQvtC6INCz0LDQt9C+0LLQvtC5INCz0YDQsNC90LDRgtGLXHJcbmZ1bmN0aW9uIGFwcGx5X2JvbWIocG9zaXRpb24sIHJhZGl1cykge1xyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMocG9zaXRpb24sIHJhZGl1cylcclxuICAvL2NvbnNvbGUubG9nKGNhbmRpZGF0ZV9jZWxscylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDQsdC+0LzQsdGLXHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0L7Qv9Cw0LTQsNC10YIg0L/QvtC0INC00LXQudGB0YLQstC40LUg0LPQsNC30L7QstC+0Lkg0LHQvtC80LHRi1wiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgKyAxXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGdhc19ib21iX3BvaXNvbl9vYmplY3QgPSB7fVxyXG4gICAgICAgIGdhc19ib21iX3BvaXNvbl9vYmplY3QucG9pc29uX2xldmVsID0gMVxyXG4gICAgICAgIGdhc19ib21iX3BvaXNvbl9vYmplY3QudGhyZXNob2xkID0gZ2FzX2JvbWJfdGhyZXNob2xkXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uID0gZ2FzX2JvbWJfcG9pc29uX29iamVjdFxyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdIC0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlfY2FsaW5nYWxhdG9yKHBvc2l0aW9uLCByYWRpdXMsIGZsYXRfaGVhbCwgcm9sbF9oZWFsLCBoZWFsX3JvbGxfbGlzdCwgY29pbl9mbGlwX2xpc3QpIHtcclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gaW5kZXhfaW5fcmFkaXVzKHBvc2l0aW9uLCByYWRpdXMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0LTQu9GPINC+0YLRhdC40LvQsFxyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIHZhciByb2xsZWRfaGVhbCA9IGZsYXRfaGVhbCArIGhlYWxfcm9sbF9saXN0W3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXTtcclxuICAgICAgcmVzdG9yZV9ocCh0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgcm9sbGVkX2hlYWwpO1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQtNGL0YXQsNC10YIg0YbQtdC70LXQsdC90YvQtSDQv9Cw0YDRiyDQuCDQstC+0YHRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIgXCIgKyByb2xsZWRfaGVhbCArIFwiINGF0L8uXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICB2YXIgY29pbiA9IGNvaW5fZmxpcF9saXN0W3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgICAgIHZhciBub3RlID0gXCJcIjtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiY2FsaW5nYWxhdG9yX3RhcmdldFwiKSkge1xyXG4gICAgICAgIHZhciBzdGFnZSA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQuc3RhZ2U7XHJcbiAgICAgICAgc3dpdGNoKHN0YWdlKSB7XHJcbiAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIGlmIChjb2luID4gNSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQuc3RhZ2UgPSAyO1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQuZHVyYXRpb24gPSBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMjtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5jYWxpbmdhbGF0b3JfdGFyZ2V0LnBlbmFsdHkgPSBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTI7XHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcImF0dGFja19ib251c1wiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgY2FsaW5nYWxhdG9yX3BlbmFsdHlfc3RhZ2UyIC0gY2FsaW5nYWxhdG9yX3BlbmFsdHlfc3RhZ2UxKVxyXG4gICAgICAgICAgICAgIG5vdGUgPSBcItCa0LDQu9C40L3Qs9Cw0LvRj9GC0L7RgCDQstC90L7QstGMINGD0LTQsNGA0LjQuyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LIg0LPQvtC70L7QstGDLiDQktGC0L7RgNCw0Y8g0YHRgtCw0LTQuNGPINC+0YLRgNCw0LLQu9C10L3QuNGPLiDQnNC+0LbQtdGCINC/0L7RgNCwINC+0YHRgtCw0L3QvtCy0LjRgtGB0Y8/Li5cIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG5vdGUgPSBcItCd0LAg0Y3RgtC+0YIg0YDQsNC3IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQuNC30LHQtdC20LDQuyDQvdC10LPQsNGC0LjQstC90YvRhSDRjdGE0YTQtdC60YLQvtCyINC60LDQu9C40L3Qs9Cw0LvRj9GC0L7RgNCwLiDQodGC0LDQtNC40Y8g0L7RgdGC0LDQtdGC0YHRjyDQv9C10YDQstC+0LkuXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgaWYgKGNvaW4gPCA1KSB7Ly8xLTQgPSBiYWQgcm9sbCwgcG9pc29uaW5nXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5zdGFnZSA9IDM7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5kdXJhdGlvbiA9IGNhbGluZ2FsYXRvcl9wb2lzb25pbmdfZHVyYXRpb25fc3RhZ2UzO1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQucGVuYWx0eSA9IGNhbGluZ2FsYXRvcl9wZW5hbHR5X3N0YWdlMztcclxuICAgICAgICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwiYXR0YWNrX2JvbnVzXCIsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyLCBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTMgLSBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTIpXHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcIm1lbGVlX2FkdmFudGFnZVwiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgLTEpXHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcInJhbmdlZF9hZHZhbnRhZ2VcIiwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIC0xKVxyXG4gICAgICAgICAgICAgIG5vdGUgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGB0YLQvtC40LvQviDQvtGB0YLQsNC90L7QstC40YLRjNGB0Y8g0YDQsNC90YzRiNC1LiDQotC10L/QtdGA0Ywg0LPQvtC70L7QstC+0LrRgNGD0LbQtdC90LjQtSDQvtGB0YLQsNC90LXRgtGB0Y8g0YEg0LLQsNC80Lgg0L3QsNC00L7Qu9Cz0L4uXCJcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb2luIDwgMTApIHsvLyA1LTkgbm8gZWZmZWN0LCBrZWVwIHJvbGxpbmdcclxuICAgICAgICAgICAgICBub3RlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRhdC+0LTQuNGCINC/0L4g0L7Rh9C10L3RjCDRgtC+0L3QutC+0LzRgyDQu9GM0LTRgy4g0KHRgtCw0LTQuNGPINC+0YHRgtCw0LXRgtGB0Y8g0LLRgtC+0YDQvtC5LiDQn9C+0LrQsCDRh9GC0L4uXCJcclxuICAgICAgICAgICAgfSBlbHNlIHsvLyBZb3UgYXJlIGVubGlnaHRlbmVkXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5zdGFnZSA9IDQ7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5kdXJhdGlvbiA9IGNhbGluZ2FsYXRvcl9wb2lzb25pbmdfZHVyYXRpb25fZW5saWdodGVuZWQ7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5wZW5hbHR5ID0gY2FsaW5nYWxhdG9yX3BlbmFsdHlfZW5saWdodGVuZWQ7XHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcImF0dGFja19ib251c1wiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgY2FsaW5nYWxhdG9yX3BlbmFsdHlfZW5saWdodGVuZWQgLSBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTIpXHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcIm1lbGVlX2FkdmFudGFnZVwiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgMSlcclxuICAgICAgICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwicmFuZ2VkX2FkdmFudGFnZVwiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgMSlcclxuICAgICAgICAgICAgICBub3RlID0gXCLQotC+0LvRjNC60L4g0YDQsNC3INGPINCy0LjQtNC10Lsg0YLQsNC60YPRjiDRgdC40LvRgy4uLiBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LTQvtGB0YLQuNCzINCf0YDQvtGB0LLRj9GJ0LXQvdC40Y8g0Lgg0LHRg9C00LXRgiDQvdC10YHRgtC4INC10LPQviDQsiDQvNC40YAuXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQuZHVyYXRpb24gPSBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMztcclxuICAgICAgICAgICAgbm90ZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LzQvtC20LXRgiDRhdCy0LDRgtC40YIg0YPQttC1P1wiXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgbm90ZSA9IFwi0J/RgNC+0YHQstGP0YnQtdC90L3Ri9C5IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GA0L7QtNC+0LvQttCw0LXRgiDQtNC10LvQuNGC0YzRgdGPINGB0LLQvtC40Lwg0LjRgdC60YPRgdGB0YLQstC+0LwuINCd0LXQstC10YDQvtGP0YLQvdC+0LUg0LfRgNC10LvQuNGJ0LUuXCJcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLQotCw0Log0L/RgNC10LjRgdC/0L7Qu9C90LjRgtGM0YHRjyDQvdC1INC00L7Qu9C20L3QviDQsdGL0YLRjCDQstC+0LfQvNC+0LbQvdC+XCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGNvaW4gPiA1KSB7XHJcbiAgICAgICAgICB2YXIgY2FsaW5nYWxhdG9yX3RhcmdldF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgY2FsaW5nYWxhdG9yX3RhcmdldF9vYmplY3QuZHVyYXRpb24gPSBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMTtcclxuICAgICAgICAgIGNhbGluZ2FsYXRvcl90YXJnZXRfb2JqZWN0LnBlbmFsdHkgPSBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTFcclxuICAgICAgICAgIGNhbGluZ2FsYXRvcl90YXJnZXRfb2JqZWN0LnN0YWdlID0gMTtcclxuICAgICAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJhdHRhY2tfYm9udXNcIiwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGNhbGluZ2FsYXRvcl90YXJnZXRfb2JqZWN0LnBlbmFsdHkpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5jYWxpbmdhbGF0b3JfdGFyZ2V0ID0gY2FsaW5nYWxhdG9yX3RhcmdldF9vYmplY3RcclxuICAgICAgICAgIG5vdGUgPSBcItCa0LDQu9C40L3Qs9Cw0LvRj9GC0L7RgCDRgdC70LXQs9C60LAg0YPQtNCw0YDQuNC7IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQsiDQs9C+0LvQvtCy0YMuINCf0LXRgNCy0LDRjyDRgdGC0LDQtNC40Y8g0L7RgtGA0LDQstC70LXQvdC40Y8uXCJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbm90ZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LjQt9Cx0LXQttCw0Lsg0L3QtdCz0LDRgtC40LLQvdGL0YUg0Y3RhNGE0LXQutGC0L7QsiDQutCw0LvQuNC90LPQsNC70Y/RgtC+0YDQsC4g0JLQuNGA0YLRg9C+0LchXCJcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcHVzaFRvTGlzdChub3RlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5X2FjaWRfYm9tYihwb3NpdGlvbiwgcmFkaXVzKSB7XHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhwb3NpdGlvbiwgcmFkaXVzKVxyXG4gIC8vY29uc29sZS5sb2coY2FuZGlkYXRlX2NlbGxzKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NhbmRpZGF0ZV9jZWxsc1tpXV1cclxuICAgIGlmICh0YXJnZXRfY2hhcmFjdGVyX251bWJlciA+IDApIHsvLyDQv9C10YDRgdC+0L3QsNC2INCyINGA0LDQtNC40YPRgdC1INCx0L7QvNCx0YtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC/0LDQtNCw0LXRgiDQv9C+0LQg0LTQtdC50YHRgtCy0LjQtSDQutC40YHQu9C+0YLQvdC+0Lkg0LPRgNCw0L3QsNGC0YtcIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFjaWRfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uID0gYWNpZF9ib21iX2R1cmF0aW9uXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGFjaWRfYm9tYl9wb2lzb25fb2JqZWN0ID0ge31cclxuICAgICAgICBhY2lkX2JvbWJfcG9pc29uX29iamVjdC5kdXJhdGlvbiA9IGFjaWRfYm9tYl9kdXJhdGlvblxyXG4gICAgICAgIHZhciBLRF9jaGFuZ2UgPSBwYXJzZUludChjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpLzIpXHJcbiAgICAgICAgYWNpZF9ib21iX3BvaXNvbl9vYmplY3QuYm9udXNfS0QgPSBLRF9jaGFuZ2VcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5hY2lkX2JvbWJfcG9pc29uID0gYWNpZF9ib21iX3BvaXNvbl9vYmplY3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSAtIEtEX2NoYW5nZVxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvY2tlZF9lZmZlY3QodGFyZ2V0KSB7XHJcbiAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uaGFzT3duUHJvcGVydHkoXCJzaG9ja2VkXCIpKSB7XHJcbiAgICB2YXIgc2hvY2tlZF9vYmplY3QgPSB7fVxyXG4gICAgc2hvY2tlZF9vYmplY3QuY29vbGRvd24gPSBzaG9ja2VkX2Nvb2xkb3duXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uc2hvY2tlZCA9IHNob2NrZWRfb2JqZWN0XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVt0YXJnZXRdID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbdGFyZ2V0XSAtIDFcclxuICB9IGVsc2Uge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRdLnNob2NrZWQuY29vbGRvd24gPSBzaG9ja2VkX2Nvb2xkb3duXHJcbiAgfVxyXG59XHJcblxyXG4vLyBNb3JlIGdtIGNvbnRyb2wgYWN0aW9uc1xyXG5cclxuZnVuY3Rpb24gbWlycm9yX2JvYXJkKCkge1xyXG4gIHZhciBsZWZ0X2luZGV4O1xyXG4gIHZhciByaWdodF9pbmRleDtcclxuICB2YXIgdGVtcDtcclxuICB2YXIgbGVmdF9jZWxsO1xyXG4gIHZhciByaWdodF9jZWxsO1xyXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgZ2FtZV9zdGF0ZS5zaXplOyB5KyspIHtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgZ2FtZV9zdGF0ZS5zaXplLzI7IHgrKykge1xyXG5cclxuICAgICAgbGVmdF9pbmRleCA9IHkqZ2FtZV9zdGF0ZS5zaXplICsgeDtcclxuICAgICAgcmlnaHRfaW5kZXggPSB5KmdhbWVfc3RhdGUuc2l6ZSArIHBhcnNlSW50KGdhbWVfc3RhdGUuc2l6ZSkgLSB4IC0gMTtcclxuICAgICAgLy9jb25zb2xlLmxvZygneTogJyArIHkgKyAnIHg6ICcgKyB4ICsgJyBsZWZ0IGluZGV4OiAnICsgbGVmdF9pbmRleCArICcgcmlnaHQgaW5kZXg6ICcgKyByaWdodF9pbmRleCk7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgbGVmdF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGxlZnRfaW5kZXgpO1xyXG4gICAgICByaWdodF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHJpZ2h0X2luZGV4KTtcclxuXHJcbiAgICAgIHRlbXAgPSBsZWZ0X2NlbGwuc3JjO1xyXG4gICAgICBsZWZ0X2NlbGwuc3JjID0gcmlnaHRfY2VsbC5zcmM7XHJcbiAgICAgIHJpZ2h0X2NlbGwuc3JjID0gdGVtcDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN5bmNfYm9hcmQoKSB7XHJcbiAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IHtcclxuICAgIGdhbWVfc3RhdGU6IGdhbWVfc3RhdGUsXHJcbiAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbzogY2hhcmFjdGVyX2RldGFpbGVkX2luZm8sXHJcbiAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvOiBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvLFxyXG4gICAgY2hhcmFjdGVyX3N0YXRlOiBjaGFyYWN0ZXJfc3RhdGVcclxuICB9O1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc3luY19ib2FyZCc7XHJcbiAgdG9TZW5kLmZ1bGxfZ2FtZV9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93X2xhbmRtaW5lcygpIHtcclxuICB2YXIgbGFuZG1pbmVzX2FycmF5ID0gZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYW5kbWluZXNfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X21pbmUgPSBsYW5kbWluZXNfYXJyYXlbaV1cclxuICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW2N1cnJlbnRfbWluZV0uaW5jbHVkZXMobXlfbmFtZSkpIHtcclxuICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgY3VycmVudF9taW5lKTtcclxuICAgICAgY2VsbC5zcmMgPSBcIi9pbWFnZXMvbGFuZG1pbmUuamZpZlwiXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhcl9jaGFyYWN0ZXJfc3RhdGUoKSB7XHJcbiAgY2hhcmFjdGVyX3N0YXRlID0gQ0hBUkFDVEVSX1NUQVRFX0NPTlNUQU5UXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyX2NoYXJhY3RlcihudW1iZXIpIHtcclxuICAvL2NoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLkhQW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbbnVtYmVyXSA9IHt9XHJcbiAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbbnVtYmVyXSA9IG51bGxcclxufVxyXG5cclxuZnVuY3Rpb24gd19vbmNsaWNrKCkge1xyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIiB8fCBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRdID09IDEpIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPT0gMSkge1xyXG4gICAgICB1bmRvX3NlbGVjdGlvbigpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICAgICAgdmFyIGNlbGwgPSBjaGFyYWN0ZXJfY2hvc2VuLmNlbGxcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl90b19tb3ZlKGluZGV4LCBjZWxsKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFfb25jbGljaygpIHtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIgfHwgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXSA9PSAxKSB7XHJcblxyXG4gICAgaWYgKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9PSAyKSB7XHJcbiAgICAgIHN0b3BfYXR0YWNrKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgICAgIHZhciBjZWxsID0gY2hhcmFjdGVyX2Nob3Nlbi5jZWxsXHJcbiAgICAgIHZhciBtYWluX2FjdGlvbnNfbGVmdCA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICBpZiAobWFpbl9hY3Rpb25zX2xlZnQgPiAwKSB7XHJcbiAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl90b19hdHRhY2soY2VsbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCjINCy0LDRgSDQvdC1INC+0YHRgtCw0LvQvtGB0Ywg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY29tcGFyZV9pbml0aWF0aXZlKGEsYikge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVthXSA8IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2JdKSB7XHJcbiAgICByZXR1cm4gMTtcclxuICB9IGVsc2UgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2FdID09IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2JdKSB7XHJcbiAgICByZXR1cm4gMDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIC0xO1xyXG4gIH1cclxufVxyXG5cclxuLy9zb2NrZXQuaW5pdCgnd3M6Ly9sb2NhbGhvc3Q6MzAwMScpO1xyXG5zb2NrZXQuaW5pdChTRVJWRVJfQUREUkVTUyk7XHJcblxyXG5zb2NrZXQucmVnaXN0ZXJPcGVuSGFuZGxlcigoKSA9PiB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3BsYXllcl9pbmZvJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb2xlID0gbXlfcm9sZTtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICB0b1NlbmQucGFzc3dvcmQgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2dtX3Bhc3N3b3JkJykpO1xyXG4gIH1cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufSk7XHJcblxyXG5zb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcigoZGF0YSkgPT4ge1xyXG4gIC8vY29uc29sZS5sb2coZGF0YSk7XHJcbiAgaWYgKCgoZGF0YS50b19uYW1lID09IG15X25hbWUpIHx8IChkYXRhLnRvX25hbWUgPT0gJ2FsbCcpKSAmJiAoZGF0YS5yb29tX251bWJlciA9PSBteV9yb29tKSkge1xyXG4gICAgaWYgKGRhdGEuY29tbWFuZCA9PSAncGxheWVyX2luZm9fcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmlzVmFsaWQgPT0gMCkge1xyXG4gICAgICAgIGFsZXJ0KCfQotCwINC60LDQutC+0Lkg0YLRiyDQs9C8Jyk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF0YS5yb2xlID09ICdnbScpIHtcclxuICAgICAgICBjcmVhdGVfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBzYXZlX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgbG9hZF9ib2FyZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIGRvd25sb2FkX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgcm9sbF9pbml0aWF0aXZlX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgZm9nX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfbmFtZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgYm9hcmRfc2l6ZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgbWlycm9yX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgbmV4dF9yb3VuZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIGJhdHRsZV9tb2RfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBzeW5jX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgc2F2ZXNfc2VsZWN0LnNob3coKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGU7XHJcbiAgICAgICAgICAgIC8vIHFcclxuICAgICAgICAgICAgaWYoa2V5Q29kZSA9PSA4MSkge1xyXG4gICAgICAgICAgICAgICAgZm9nTW9kZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT0gODcpIHsgLy8gd1xyXG4gICAgICAgICAgICAgIHdfb25jbGljaygpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PSA2NSkgeyAvLyBhXHJcbiAgICAgICAgICAgICAgYV9vbmNsaWNrKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0O1xyXG4gICAgICBncm91cF9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfZ3JvdXBfbGlzdDtcclxuICAgICAgb2JzdGFjbGVfbGlzdCA9IGRhdGEub2JzdGFjbGVfbGlzdDtcclxuICAgICAgd2VhcG9uX2xpc3QgPSBkYXRhLndlYXBvbl9saXN0XHJcbiAgICAgIHdlYXBvbl9kZXRhaWxlZF9pbmZvID0gZGF0YS53ZWFwb25fZGV0YWlsZWRfaW5mb1xyXG4gICAgICBza2lsbF9kZXRhaWxlZF9pbmZvID0gZGF0YS5za2lsbF9kZXRhaWxlZF9pbmZvXHJcbiAgICAgIHNraWxsX2xpc3QgPSBkYXRhLnNraWxsX2xpc3RcclxuICAgICAgc2F2ZXNfbGlzdCA9IGRhdGEuc2F2ZXNfbGlzdFxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzYXZlc19saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gJChcIjxvcHRpb24+XCIpO1xyXG4gICAgICAgIGN1cnJlbnRfb3B0aW9uLnRleHQoc2F2ZXNfbGlzdFtpXSk7XHJcbiAgICAgICAgY3VycmVudF9vcHRpb24udmFsKHNhdmVzX2xpc3RbaV0pO1xyXG4gICAgICAgIHNhdmVzX3NlbGVjdC5hcHBlbmQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NvbnN0cnVjdF9ib2FyZF9yZXNwb25zZScpIHtcclxuICAgICAgY2xlYXJfY2hhcmFjdGVyX3N0YXRlKClcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGRhdGEuZ2FtZV9zdGF0ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmNlbGxfaWRdID0gZGF0YS5jaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gZGF0YS5jaGFyYWN0ZXJfaW5mbztcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3RlcjtcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zdHJlbmd0aCA9IHBhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCk7XHJcbiAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc3RhbWluYSA9IHBhcnNlSW50KGNoYXJhY3Rlci5zdGFtaW5hKTtcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5hZ2lsaXR5ID0gcGFyc2VJbnQoY2hhcmFjdGVyLmFnaWxpdHkpO1xyXG4gICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdLmludGVsbGlnZW5jZSA9IHBhcnNlSW50KGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtkYXRhLmNlbGxfaWRdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZGF0YS5jZWxsX2lkKTtcclxuICAgICAgICBjZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShkYXRhLmNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gYm9udXNfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gbWFpbl9hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgYXNzaWduX21vdmVzKGRhdGEuY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gcGFyc2VJbnQoY2hhcmFjdGVyLktEX3BvaW50cyk7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDA7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IFwiYWxsXCI7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyLmludmVudG9yeVswXVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHt9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gZGF0YS5jZWxsX2lkO1xyXG4gICAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwiZXZhZGVfYm9udXNcIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHBhcnNlSW50KGNoYXJhY3Rlci5ldmFkZV9ib251cyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwibWVsZWVfcmVzaXN0XCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX3Jlc2lzdFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gcGFyc2VGbG9hdChjaGFyYWN0ZXIubWVsZWVfcmVzaXN0KS8xMDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX3Jlc2lzdFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMC4wO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwiYnVsbGV0X3Jlc2lzdFwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5idWxsZXRfcmVzaXN0W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUZsb2F0KGNoYXJhY3Rlci5idWxsZXRfcmVzaXN0KS8xMDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJ1bGxldF9yZXNpc3RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDAuMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8g0LDQutGC0LjQstCw0YbQuNGPINC/0LDRgdGB0LjQstC+0LpcclxuICAgICAgaWYgKGNoYXJhY3Rlci5oYXNPd25Qcm9wZXJ0eShcImFkYXB0aXZlX2ZpZ2h0aW5nXCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gLTE7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2FkZF9vYnN0YWNsZV9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIG9ic3RhY2xlID0gZGF0YS5vYnN0YWNsZV9pbmZvO1xyXG4gICAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW2RhdGEub2JzdGFjbGVfbnVtYmVyXSA9IG9ic3RhY2xlO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtkYXRhLmNlbGxfaWRdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZGF0YS5jZWxsX2lkKTtcclxuICAgICAgICBjZWxsLnNyYyA9IG9ic3RhY2xlLmF2YXRhcjtcclxuICAgICAgfVxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBkYXRhLm9ic3RhY2xlX251bWJlciAqICgtMSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbW92ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciB0b19pbmRleCA9IGRhdGEudG9faW5kZXg7XHJcbiAgICAgIHZhciBmcm9tX2luZGV4ID0gZGF0YS5mcm9tX2luZGV4O1xyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdG9faW5kZXhdID09IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtmcm9tX2luZGV4XSA9PSBkYXRhLmNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICAgICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3RvX2luZGV4XSA9IGRhdGEuY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHRvX2luZGV4O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuaW52aXNpYmlsaXR5X2VuZGVkX2lkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgaWQgPSBkYXRhLmludmlzaWJpbGl0eV9lbmRlZF9pZFtpXTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbaWRdID0gXCJhbGxcIjtcclxuXHJcbiAgICAgICAgICB2YXIgcG9zaXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25baWRdO1xyXG4gICAgICAgICAgdmFyIHRvX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgcG9zaXRpb24pO1xyXG4gICAgICAgICAgdmFyIGF2YXRhciA9IGdldF9vYmplY3RfcGljdHVyZShpZCk7XHJcbiAgICAgICAgICB0b19jZWxsLnNyYyA9IGF2YXRhcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgICAgIGlmICghY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwibGFuZG1pbmVfaW1tdW5lXCIpKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubWluZXNfZXhwbG9kZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG1pbmVfcG9zaXRpb24gPSBkYXRhLm1pbmVzX2V4cGxvZGVkW2ldXHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIG1pbmVfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICBjZWxsLnNyYyA9IGZvZ09yUGljKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmRleE9mKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLnNwbGljZShpbmRleCwxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbbWluZV9wb3NpdGlvbl0gPSBbXVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLm1pbmVzX2RhbWFnZSA+IDApIHtcclxuICAgICAgICAgICAgZXhwbG9zaW9uX2F1ZGlvLnBsYXkoKTtcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEuY2hhcmFjdGVyX251bWJlciwgZGF0YS5taW5lc19kYW1hZ2UpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9C+0LTRgNGL0LLQsNC10YLRgdGPINC90LAg0LzQuNC90LDRhSDQv9C+0LvRg9GH0LDRjyBcIiArIGRhdGEubWluZXNfZGFtYWdlICsgXCIg0YPRgNC+0L3QsFwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAvLyByZW1vdmUgc2hpZWxkZWQgcHJvcGVydHkgZnJvbSBjaGFyYWN0ZXIgYW5kIHJlbW92ZSBjaGFyYWN0ZXIgZnJvbSBzaGllbGRlZCBsaXN0XHJcbiAgICAgICAgaWYgKGRhdGEubGVmdF9zaGllbGQgPT0gMSkge1xyXG4gICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXRcclxuICAgICAgICAgIHZhciBpbmRleCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2RhdGEuc2hpZWxkX2luZGV4XS5jaGFyYWN0ZXJfbGlzdC5pbmRleE9mKGRhdGEuY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbZGF0YS5zaGllbGRfaW5kZXhdLmNoYXJhY3Rlcl9saXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAxO1xyXG5cclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gc3RhbWluYV9tb3ZlX2Nvc3RcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBwYXJzZUZsb2F0KGRhdGEuZGlzdGFuY2UpXHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJzbmlwZXJcIikge1xyXG4gICAgICAgICAgICB2YXIgZWZmZWN0c19vYmplY3QgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgICAgaWYgKGVmZmVjdHNfb2JqZWN0Lmhhc093blByb3BlcnR5KFwic25pcGVyX3Bhc3NpdmVcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9hdHRhY2tfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9kYW1hZ2VfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBjdXJyZW50X2F0dGFja19ib251cyAtIDVcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBjdXJyZW50X2RhbWFnZV9ib251c1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIHNuaXBlcl9wYXNzaXZlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmF0dGFja19ib251cyA9IC01XHJcbiAgICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmRhbWFnZV9ib251cyA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUgPSBzbmlwZXJfcGFzc2l2ZV9vYmplY3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSA1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghKCgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVt0b19pbmRleF0gPT0gMSkpIHx8IChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gIT0gXCJhbGxcIiAmJiBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gIT0gbXlfbmFtZSkpKSB7XHJcbiAgICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcbiAgICAgICAgICB0b19jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShkYXRhLmNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtmcm9tX2luZGV4XSA9IDA7XHJcbiAgICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZnJvbV9pbmRleF0gPT0gMSkpKSB7XHJcbiAgICAgICAgICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBmcm9tX2luZGV4KTtcclxuICAgICAgICAgIG9sZF9jZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlbGV0ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiY2hhcmFjdGVyX251bWJlclwiKSkge1xyXG4gICAgICAgIGNsZWFyX2NoYXJhY3RlcihkYXRhLmNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgIH1cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmluZGV4XSA9IDA7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuaW5kZXhdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEuaW5kZXgpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdyb2xsX2luaXRpYXRpdmVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlID0gZGF0YS5pbml0aWF0aXZlX3N0YXRlO1xyXG4gICAgICB2YXIgb3JkZXJlZF9hcnJheSA9IFtdXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLkhQW2ldID4gMCkgey8vIGNoYXJhY3RlciBpcyBwcmVzZW50XHJcbiAgICAgICAgICBvcmRlcmVkX2FycmF5LnB1c2goaSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgb3JkZXJlZF9hcnJheS5zb3J0KGNvbXBhcmVfaW5pdGlhdGl2ZSk7XHJcbiAgICAgIGluaXRpYXRpdmVfb3JkZXJfY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmRlcmVkX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW29yZGVyZWRfYXJyYXlbaV1dXHJcbiAgICAgICAgdmFyIHF1ZXJ5X3N0cmluZyA9ICc8aW1nPiBpZD1cImluaXRpYXRpdmVfaW1hZ2VfJyArIGkgKyAnXCInXHJcbiAgICAgICAgdmFyIGltZyA9ICQocXVlcnlfc3RyaW5nKVxyXG4gICAgICAgIGltZy5hdHRyKCdzcmMnLCBjaGFyYWN0ZXIuYXZhdGFyKTtcclxuICAgICAgICBpbWcuYXR0cignaGVpZ2h0JywgJzUwcHgnKTtcclxuICAgICAgICBpbWcuYXR0cignd2lkdGgnLCAnNTBweCcpO1xyXG4gICAgICAgIGltZy5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBwb3NpdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltvcmRlcmVkX2FycmF5W2ldXVxyXG4gICAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgcG9zaXRpb24pO1xyXG4gICAgICAgICAgLy9zZWxlY3RfY2hhcmFjdGVyKHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgbm9fc2hpZnRfb25jbGljayhteV9yb2xlLCBnbV9jb250cm9sX21vZCwgZ2FtZV9zdGF0ZSwgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzLCBjZWxsLCBwb3NpdGlvbilcclxuICAgICAgICB9KVxyXG4gICAgICAgIGltZy5hcHBlbmRUbyhpbml0aWF0aXZlX29yZGVyX2NvbnRhaW5lcik7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlYWxfZGFtYWdlX3Jlc3BvbnNlJykge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gZGF0YS5kYW1hZ2U7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2F2ZV9nYW1lX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICBhbGVydCgnR2FtZSAnICsgZGF0YS5zYXZlX25hbWUgKyAnIHNhdmVkIHN1Y2Nlc2Z1bGx5Jyk7XHJcbiAgICAgICAgc2F2ZXNfbGlzdC5wdXNoKGRhdGEuc2F2ZV9uYW1lKTtcclxuICAgICAgICB2YXIgY3VycmVudF9vcHRpb24gPSAkKFwiPG9wdGlvbj5cIik7XHJcbiAgICAgICAgY3VycmVudF9vcHRpb24udGV4dChkYXRhLnNhdmVfbmFtZSk7XHJcbiAgICAgICAgY3VycmVudF9vcHRpb24udmFsKGRhdGEuc2F2ZV9uYW1lKTtcclxuICAgICAgICBzYXZlc19zZWxlY3QuYXBwZW5kKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydCgnR2FtZSB3aXRoIG5hbWUgJyArIGRhdGEuc2F2ZV9uYW1lICsgJyBhbHJlYWR5IGV4aXN0IScpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbG9hZF9nYW1lX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICB2YXIgZnVsbF9nYW1lX3N0YXRlID0gZGF0YS5mdWxsX2dhbWVfc3RhdGU7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlID0gZnVsbF9nYW1lX3N0YXRlLmNoYXJhY3Rlcl9zdGF0ZTtcclxuICAgICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbztcclxuICAgICAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gZnVsbF9nYW1lX3N0YXRlLm9ic3RhY2xlX2RldGFpbGVkX2luZm87XHJcbiAgICAgICAgY29uc3RydWN0X2JvYXJkKGZ1bGxfZ2FtZV9zdGF0ZS5nYW1lX3N0YXRlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydCgnRmFpbGVkIHRvIGxvYWQgZ2FtZSAnICsgZGF0YS5zYXZlX25hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc3luY19ib2FyZF9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IGRhdGEuZnVsbF9nYW1lX3N0YXRlO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX3N0YXRlO1xyXG4gICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbztcclxuICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5vYnN0YWNsZV9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICBjb25zdHJ1Y3RfYm9hcmQoZnVsbF9nYW1lX3N0YXRlLmdhbWVfc3RhdGUpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3VwZGF0ZV9mb2dfcmVzcG9uc2UnKSB7XHJcblx0XHRcdFx0dmFyIGluZGV4ID0gZGF0YS5pbmRleDtcclxuXHRcdFx0XHR2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBpbmRleCk7XHJcblx0XHRcdFx0aWYgKGRhdGEudXBkYXRlX3R5cGUgPT0gJ3JlbW92ZScpIHtcclxuXHRcdFx0XHRcdGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9IDA7XHJcblx0XHRcdFx0XHRjZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9IDE7XHJcblx0XHRcdFx0XHRjZWxsLnNyYyA9IEZPR19JTUFHRTtcclxuXHRcdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYXNzaWduX3pvbmVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBpbmRleF9saXN0ID0gZGF0YS5pbmRleF9saXN0XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF9saXN0W2ldXSA9IGRhdGEuem9uZV9udW1iZXI7XHJcbiAgICAgICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaW5kZXhfbGlzdFtpXV0gPSBkYXRhLm1vZGlmaWNhdG9yO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X3Jlc3BvbnNlJykge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gZGF0YS5uZXdfdmFsdWU7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2ltcGxlX3JvbGxfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5jaGFyYWN0ZXJfbmFtZSArIFwiINCx0YDQvtGB0LDQtdGCIFwiICsgZGF0YS5yb2xsXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdza2lsbF9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIHVzZXJfaW5kZXggPSBkYXRhLnVzZXJfaW5kZXhcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFt1c2VyX2luZGV4XSA9IDFcclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJhaW1fb3ZlclwiKSkge1xyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFpbVxyXG4gICAgICB9XHJcbiAgICAgIHN3aXRjaChkYXRhLnNraWxsX2luZGV4KSB7XHJcbiAgICAgICAgY2FzZSAwOiAvLyDRgNGL0LLQvtC6XHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIHZhciBjaGFyZ2VfbW92ZV9pbmNyZWFzZSA9IHBhcnNlSW50KGNoYXJhY3Rlci5hZ2lsaXR5KVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3VzZXJfaW5kZXhdICsgY2hhcmdlX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgdmFyIGNoYXJnZV91c2VyX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIGNoYXJnZV91c2VyX29iamVjdC5jb29sZG93biA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5jaGFyZ2VfdXNlciA9IGNoYXJnZV91c2VyX29iamVjdFxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvtCy0LXRgNGI0LDQtdGCINGA0YvQstC+0LpcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOiAvLyDQv9GA0LjQu9C40LIg0LDQtNGA0LXQvdCw0LvQuNC90LBcclxuICAgICAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0X2luZGV4ID0gZGF0YS50YXJnZXRfaW5kZXhcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pbmRleF1cclxuICAgICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3RhcmdldF9pbmRleF0gLSBhZHJlbmFsaW5lX3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0ID0ge31cclxuICAgICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0Lm1pbnVzX2FjdGlvbnMgPSBkYXRhLm1pbnVzX2FjdGlvbnNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaW5kZXhdLmFkcmVuYWxpbmVfdGFyZ2V0ID0gYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0XHJcblxyXG4gICAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBhZHJlbmFsaW5lX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWRyZW5hbGluZV91c2VyID0gYWRyZW5hbGluZV9vYmplY3RfdXNlclxyXG5cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQv9GA0LjQu9C40LIg0LDQtNGA0LXQvdCw0LvQuNC90LAuIFwiICArIHRhcmdldC5uYW1lICsgXCIg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9ucyArIFwiINC00LXQudGB0YLQstC40LkuINCt0YLQviDQsdGD0LTQtdGCINGB0YLQvtC40YLRjCBcIiArIGRhdGEubWludXNfYWN0aW9ucyArIFwiINC00LXQudGB0YLQstC40Lkg0L3QsCDRgdC70LXQtNGD0Y7RidC40Lkg0YXQvtC0LlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6IC8vINC/0L7QtNGA0LXQt9Cw0L3QuNC1INGB0YPRhdC+0LbQuNC70LjQuVxyXG4gICAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBzdGFtaW5hX2N1dF9saW1iX2Nvc3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGN1dF9saW1iX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIGN1dF9saW1iX29iamVjdC5jb29sZG93biA9IGN1dF9saW1iX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uY3V0X2xpbWJfdXNlciA9IGN1dF9saW1iX29iamVjdFxyXG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQtdGC0YHRjyDQv9C+0LTRgNC10LfQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji5cIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQtdGC0YHRjyDQv9C+0LTRgNC10LfQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLlwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnNraWxsX291dGNvbWUgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGxpbWJfY3V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgIGxpbWJfY3V0X29iamVjdC5kdXJhdGlvbiA9IGN1dF9saW1iX2R1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmN1dF9saW1iID0gbGltYl9jdXRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAtMTBcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L/QvtC00YDQtdC30LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCx0LXQt9GD0YHQv9C10YjQvdC+INC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc2tpbGxfb3V0Y29tZSA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbGltYl9jdXRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgICAgbGltYl9jdXRfb2JqZWN0LmR1cmF0aW9uID0gY3V0X2xpbWJfZHVyYXRpb25cclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uY3V0X2xpbWIgPSBsaW1iX2N1dF9vYmplY3RcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IC0xMFxyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQv9C+0LTRgNC10LfQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCx0LXQt9GD0YHQv9C10YjQvdC+INC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICAgICAgdmFyIGxpbWJfY3V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgbGltYl9jdXRfb2JqZWN0LmR1cmF0aW9uID0gY3V0X2xpbWJfZHVyYXRpb24gKyAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uY3V0X2xpbWIgPSBsaW1iX2N1dF9vYmplY3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gLTEwXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0L/QvtC00YDQtdC30LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdC+INGC0L7RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOiAvLyDRgdC70LDQsdC+0LUg0LzQtdGB0YLQvlxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHN0YW1pbmFfd2Vha3Nwb3RfY29zdFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGRhdGEub3V0Y29tZSA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICB2YXIgd2Vha3Nwb3Rfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgd2Vha3Nwb3Rfb2JqZWN0Lmh1bnRlcl9pZCA9IHVzZXJfaW5kZXhcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ud2Vha3Nwb3QgPSB3ZWFrc3BvdF9vYmplY3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L7QsdC90LDRgNGD0LbQuNC7INGB0LvQsNCx0L7QtSDQvNC10YHRgtC+IFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC90LUg0YPQtNCw0LvQvtGB0Ywg0L7QsdC90LDRgNGD0LbQuNGC0Ywg0YHQu9Cw0LHQvtC1INC80LXRgdGC0L4gXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgNDogLy8g0LvQtdGH0LXQvdC40LVcclxuICAgICAgICB2YXIgaGVhbGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgdmFyIGNvb2xkb3duID0gMFxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVt1c2VyX2luZGV4XSA+IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2RhdGEudGFyZ2V0X2lkXSkge1xyXG4gICAgICAgICAgLy8g0L/QsNGG0LjQtdC90YIg0L3QtSDRhdC+0LTQuNGCINCyINGN0YLQvtGCINC20LUg0YXQvtC0XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXS8yXHJcbiAgICAgICAgICBjb29sZG93biA9IDBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29vbGRvd24gPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBoZWFsZWRfb2JqZWN0ID0ge31cclxuICAgICAgICBoZWFsZWRfb2JqZWN0LmNvb2xkb3duID0gY29vbGRvd25cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5oZWFsZWQgPSBoZWFsZWRfb2JqZWN0XHJcbiAgICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiZmFpbFwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQoyBcIiArIGhlYWxlci5uYW1lICsgXCIg0L3QtSDQv9C+0LvRg9GH0LjQu9C+0YHRjCDQstGL0LvQtdGH0LjRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmhlYWxfcm9sbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic3VjY2Vzc1wiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQoyBcIiArIGhlYWxlci5uYW1lICsgXCIg0L/QvtC70YPRh9C40LvQvtGB0Ywg0YPRgdC/0LXRiNC90L4g0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gZGF0YS5uZXdfaHBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNyaXRpY2FsIHN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC/0L7Qu9GD0YfQuNC70L7RgdGMINC60YDQuNGC0LjRh9C10YHQutC4ICgyINGB0YLQtdC/0LXQvdC4KSDQstGL0LvQtdGH0LjRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmhlYWxfcm9sbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBkYXRhLm5ld19ocFxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0J7RiNC40LHQutCwINC/0YDQuCDRgNCw0LfQsdC+0YDQtSDQvtGC0YXQuNC70LBcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTogLy8g0LHQvtC70YzRiNC+0Lkg0LHRgNCw0YJcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIHZhciBzaGllbGQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaGllbGQubmFtZSArIFwiINC30LDRidC40YLQuNC7IFwiICsgIHRhcmdldC5uYW1lICsgXCIgKCtcIiArIGRhdGEuYm9udXNfS0QgKyBcItC60LQpXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbZGF0YS50YXJnZXRfaWRdICsgZGF0YS5ib251c19LRFxyXG4gICAgICAgICAgdmFyIGJpZ19icm9fb2JqZWN0ID0ge31cclxuICAgICAgICAgIGJpZ19icm9fb2JqZWN0LmNvb2xkb3duID0gY29vbGRvd25fYmlnX2Jyb1xyXG4gICAgICAgICAgYmlnX2Jyb19vYmplY3QuYm9udXNfS0QgPSBkYXRhLmJvbnVzX0tEXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5iaWdfYnJvID0gYmlnX2Jyb19vYmplY3RcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNjogLy8g0L/QvtC00L3Rj9GC0Ywg0YnQuNGC0YtcclxuICAgICAgICAgIHZhciBzaGllbGQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgaWYgKGRhdGEub3V0Y29tZSA9PSBcInNoaWVsZF91cFwiKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3VzZXJfaW5kZXhdICsgc2hpZWxkX3VwX0tEXHJcbiAgICAgICAgICAgIHZhciBzaGllbGRfdXBfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgc2hpZWxkX3VwX29iamVjdC5zdGFtaW5hX2Nvc3QgPSBzaGllbGRfdXBfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIHNoaWVsZF91cF9vYmplY3QuS0QgPSBzaGllbGRfdXBfS0RcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5zaGllbGRfdXAgPSBzaGllbGRfdXBfb2JqZWN0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQv9C+0LTQvdGP0Lsg0YnQuNGC0Ysg0LfQsCDRh9Cw0YJcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gLSBzaGllbGRfdXBfS0RcclxuICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uc2hpZWxkX3VwXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQvtC/0YPRgdGC0LjQuyDRidC40YIuINCn0LDRgiDQv9GA0L7RgdGC0LgoXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OiAvLyDQv9C+0LbQuNGA0LDQvdC40LUg0YHRg9GJ0L3QvtGB0YLQuFxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdIC0gZGF0YS5kYW1hZ2VcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5oYXNPd25Qcm9wZXJ0eShcIk1hcmt1c19zdGFja3NcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uTWFya3VzX3N0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLk1hcmt1c19zdGFja3MgKyAyXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5NYXJrdXNfc3RhY2tzID0gMlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uaGFzT3duUHJvcGVydHkoXCJiaW9wb29sXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCArIGRhdGEuZGFtYWdlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgPSBkYXRhLmRhbWFnZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L3QsNC90L7RgdC40YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwINC+0YIg0LrQvtGC0L7RgNC+0LPQviDQvdC10LLQvtC30LzQvtC20L3QviDRg9Cy0LXRgNC90YPRgtGM0YHRj1wiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDk6IC8vINCw0LHRgdC+0LvRjtGC0L3QvtC1INCy0L7RgdGB0YLQsNC90L7QstC70LXQvdC40LVcclxuICAgICAgICAgIHZhciBoZWFsZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gMVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdICsgZGF0YS5oZWFsX2Ftb3VudFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sIC0gZGF0YS5oZWFsX2Ftb3VudFxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBoZWFsZXIubmFtZSArIFwiINCy0L7RgdGB0YLQsNC90LDQu9C40LLQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIFwiICsgZGF0YS5oZWFsX2Ftb3VudCArIFwiINGF0L9cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMDogLy8g0L/QvtC70YPRh9C40YLRjCDQsdC+0L3Rg9GBXHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gKyAxXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvNC10L3Rj9C10YIg0L7QsdGL0YfQvdC+0LUg0L3QsCDQsdC+0L3Rg9GB0L3QvtC1INC00LXQudGB0YLQstC40LVcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTE6IC8vINC+0YLQtNGL0YVcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gZGF0YS5uZXdfc3RhbWluYVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L7RgtC00YvRhdCw0LXRgi4g0KXQvtGA0L7RiNC10LPQviDQvtGC0L/Rg9GB0LrQsCFcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDEyOiAvLyDQs9Cw0LfQvtCy0LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gZ2FzX2JvbWJfc3RhbWluYV9jb3N0XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LHRgNC+0YHQsNC10YIg0LPQsNC30L7QstGD0Y4g0LHQvtC80LHRgy4g0KHQvtCy0LXRgtGD0LXQvCDQt9Cw0LTQtdGA0LbQsNGC0Ywg0LTRi9GF0LDQvdC40LUuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgICAgdmFyIGJvbWJfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgYm9tYl9vYmplY3QudHlwZSA9IFwiZ2FzX2JvbWJcIlxyXG4gICAgICAgICAgICBib21iX29iamVjdC5wb3NpdGlvbiA9IGRhdGEucG9zaXRpb25cclxuICAgICAgICAgICAgYm9tYl9vYmplY3QudGhyZXNob2xkID0gZGF0YS50aHJlc2hvbGRcclxuICAgICAgICAgICAgYm9tYl9vYmplY3QucmFkaXVzID0gM1xyXG4gICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5wdXNoKGJvbWJfb2JqZWN0KVxyXG5cclxuICAgICAgICAgICAgdmFyIGdhc19ib21iX3VzZXIgPSB7fVxyXG4gICAgICAgICAgICBnYXNfYm9tYl91c2VyLmNvb2xkb3duID0gZ2FzX2JvbWJfc2tpbGxfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5nYXNfYm9tYl91c2VyID0gZ2FzX2JvbWJfdXNlclxyXG5cclxuICAgICAgICAgICAgdmFyIGluaXRpYWxfcmFkaXVzID0gMlxyXG5cclxuICAgICAgICAgICAgYXBwbHlfYm9tYihkYXRhLnBvc2l0aW9uLCBpbml0aWFsX3JhZGl1cylcclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDEzOiAvLyDRgdCy0LXRgtC+0YjRg9C80L7QstCw0Y8g0LPRgNCw0L3QsNGCXHJcbiAgICAgICAgICAgIHZhciBsaWdodF9zb3VuZF9ib21iX3VzZXIgPSB7fVxyXG4gICAgICAgICAgICBsaWdodF9zb3VuZF9ib21iX3VzZXIuY29vbGRvd24gPSBsaWdodF9zb3VuZF9ib21iX3NraWxsX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ubGlnaHRfc291bmRfYm9tYl91c2VyID0gbGlnaHRfc291bmRfYm9tYl91c2VyXHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEub3V0Y29tZV9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBkYXRhLmNoYXJhY3Rlcl9saXN0W2ldXHJcbiAgICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICAgICAgaWYgKGRhdGEub3V0Y29tZV9saXN0W2ldID09IDApIHsgLy8g0J/RgNC+0YjQtdC7INGB0L/QsNGB0LHRgNC+0YHQvtC6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YPRgdC/0LXQuyDQv9GA0LjQutGA0YvRgtGMINCz0LvQsNC30LBcIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L7RgdC70LXQvyDQvdCwIDIg0YXQvtC00LBcIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJibGluZFwiKSkgey8vINC90LUg0L3QsNC60LvQsNC00YvQstCy0LDQtdC8INC10YnQtSDRiNGC0YDQsNGEXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uYmxpbmQuY29vbGRvd24gPSAyXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgYmxpbmRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgICAgYmxpbmRfb2JqZWN0LmNvb2xkb3duID0gMlxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmJsaW5kID0gYmxpbmRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gLSAyXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdIC0gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxNDogLy8g0YjQvtC60LjRgNC+0LLQsNGC0YwgKNC00YDQvtC9ICsg0YPRj9C30LLQuNC80L7RgdGC0YwpXHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlICE9ICdyb2d1ZScpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgIHNob2NrZWRfZWZmZWN0KGRhdGEudGFyZ2V0X2lkKVxyXG5cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YHRgtGA0LXQu9GP0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjyDQuCDRiNC+0LrQuNGA0YPQtdGCINGG0LXQu9GMICjRg9GP0LfQstC40LzQvtGB0YLRjCkuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgIHNob2NrZWRfZWZmZWN0KGRhdGEudGFyZ2V0X2lkKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKSDQuCDRiNC+0LrQuNGA0YPQtdGCINGG0LXQu9GMICjRg9GP0LfQstC40LzQvtGB0YLRjCkuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgIHNob2NrZWRfZWZmZWN0KGRhdGEudGFyZ2V0X2lkKVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0L/QvtC/0LDQtNCw0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPINC4INGI0L7QutC40YDRg9C10YIg0YbQtdC70YwuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0YjQvtC60LjRgNC+0LLQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90L4g0YLQvtGCINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTU6IC8vINC/0YvRiSDQv9GL0Ykg0LPQvtGDXHJcbiAgICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0X2luZGV4ID0gZGF0YS50YXJnZXRfaW5kZXhcclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIHBpY2hfcGljaF9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBwaWNoX3BpY2hfb2JqZWN0X3RhcmdldCA9IHt9XHJcbiAgICAgICAgICBwaWNoX3BpY2hfb2JqZWN0X3RhcmdldC5leHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pbmRleF0ucGljaF9waWNoX3RhcmdldCA9IHBpY2hfcGljaF9vYmplY3RfdGFyZ2V0XHJcblxyXG4gICAgICAgICAgdmFyIHBpY2hfcGljaF9vYmplY3RfdXNlciA9IHt9XHJcbiAgICAgICAgICBwaWNoX3BpY2hfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBwaWNoX3BpY2hfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ucGljaF9waWNoX3VzZXIgPSBwaWNoX3BpY2hfb2JqZWN0X3VzZXJcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINCf0YvRiS3Qn9GL0Ykt0JPQvtGDLiBcIiAgKyB0YXJnZXQubmFtZSArIFwiINC/0L7Qu9GD0YfQsNC10YIgXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnMgKyBcIiDQtNC+0L8g0LTQtdC50YHRgtCy0LjQuSDQvdCwINGN0YLQvtGCINC4INGB0LvQtdC00YPRjtGJ0LjQuSDRhdC+0LQuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTY6IC8vINGB0LjQu9C+0LLQvtC1INC/0L7Qu9C1XHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gZm9yY2VfZmllbGRfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNoaWVsZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LnR5cGUgPSBcImZvcmNlX2ZpZWxkXCJcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5wb3NpdGlvbiA9IGRhdGEucG9zaXRpb25cclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5yYWRpdXMgPSBmb3JjZV9maWVsZF9yYWRpdXNcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5zaGllbGQgPSBkYXRhLnNoaWVsZFxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LmNoYXJhY3Rlcl9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfbGlzdFxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LmNlbGxzX3Byb3RlY3RlZCA9IGRhdGEuY2VsbHNfcHJvdGVjdGVkXHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzLnB1c2goc2hpZWxkX29iamVjdClcclxuXHJcbiAgICAgICAgICAgIHZhciBzaGllbGRfaW5kZXggPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5sZW5ndGggLSAxXHJcbiAgICAgICAgICAgIHZhciBjaGFyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9yY2VfZmllbGRfdGFyZ2V0ID0ge31cclxuICAgICAgICAgICAgZm9yY2VfZmllbGRfdGFyZ2V0LnNoaWVsZF9pbmRleCA9IHNoaWVsZF9pbmRleFxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJfbGlzdFtpXVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uZm9yY2VfZmllbGRfdGFyZ2V0ID0gZm9yY2VfZmllbGRfdGFyZ2V0XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JjZV9maWVsZF91c2VyID0ge31cclxuICAgICAgICAgICAgZm9yY2VfZmllbGRfdXNlci5jb29sZG93biA9IGZvcmNlX2ZpZWxkX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uZm9yY2VfZmllbGRfdXNlciA9IGZvcmNlX2ZpZWxkX3VzZXJcclxuICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsNC60YLQuNCy0LjRgNGD0LXRgiDRgdC40LvQvtCy0L7QtSDQv9C+0LvQtVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTc6IC8vINC40L3QstC40LdcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbdXNlcl9pbmRleF0gPSBkYXRhLnVzZXJuYW1lXHJcbiAgICAgICAgICBpZiAobXlfbmFtZSAhPSBkYXRhLnVzZXJuYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBjZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTg6IC8vINCx0L7QtdCy0LDRjyDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWRhcHRpdmVfZmlnaHRpbmcgPSAtMTtcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCw0LrRgtC40LLQuNGA0YPQtdGCINCx0L7QtdCy0YPRjiDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTk6IC8vINC70LDQutC4INGI0L7RglxyXG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBsdWNreV9zaG90X3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLnJvbGwgPT0gNykge1xyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KPQtNCw0YfQsCDQsdC70LDQs9C+0LLQvtC70LjRgiBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINC60L7RgtC+0YDRi9C5INC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwIFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5yb2xsICsgXCIg0Y3RgtC+INC90LUg0YfQuNGB0LvQviBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINGC0LDQuiDRh9GC0L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINC40LfQsdC10LPQsNC10YIg0LDRgtCw0LrQuC5cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyMDogLy8gbG90dGVyeV9zaG90XHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGxvdHRlcnlfc2hvdF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGF0YS5yb2xsID09IDcpIHtcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZSlcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCa0LDQutCw0Y8g0YPQtNCw0YfQsCEg0KTQvtGA0YLRg9C90LAg0Y/QstC90L4g0L3QsCDRgdGC0L7RgNC+0L3QtSBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINC60L7RgtC+0YDRi9C5INC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwIFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yb2xsID09IDc3KSB7XHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQlNC20LXQutC/0L7RgiEgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINGB0LXQs9C+0LTQvdGPINGB0YLQvtC40YIg0LrRg9C/0LjRgtGMINC70L7RgtC10YDQtdC50L3Ri9C5INCx0LjQu9C10YIsINCwINC/0L7QutCwINC+0L0g0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAgXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBkYXRhLnJvbGwgKyBcIiDRjdGC0L4g0L3QtSDRh9C40YHQu9C+IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiwg0YLQsNC6INGH0YLQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0LjQt9Cx0LXQs9Cw0LXRgiDQsNGC0LDQutC4LlwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIxOiAvL9Cy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40LlcclxuICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSArIGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gYWN0aW9uX3NwbGFzaF9zdGFtaW5hX2Nvc3QqZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIGFjdGlvbl9zcGxhc2hfb2JqZWN0ID0ge31cclxuICAgICAgICAgIGFjdGlvbl9zcGxhc2hfb2JqZWN0LmNvb2xkb3duID0gYWN0aW9uX3NwbGFzaF9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5hY3Rpb25fc3BsYXNoID0gYWN0aW9uX3NwbGFzaF9vYmplY3RcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINCy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40Lkg0Lgg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9ucyArIFwiINC+0YHQvdC+0LLQvdGL0YUg0LTQtdC50YHRgtCy0LjQuSDQstC80LXRgdGC0L4g0LHQvtC90YPRgdC90YvRhS5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIyOiAvLyDQs9GA0LDQtCDRg9C00LDRgNC+0LJcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHB1bmNoX3JhaW5mYWxsX3N0YW1pbmFfY29zdCpkYXRhLnRvdGFsX2F0dGFja3NcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChkYXRhLmRhbWFnZSA+IDApIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L3QsNC90L7RgdC40YIg0LPRgNCw0LQg0LjQtyBcIiArIGRhdGEudG90YWxfYXR0YWNrcyArIFwiINGD0LTQsNGA0L7Qsiwg0LjQtyDQutC+0YLQvtGA0YvRhSBcIiArIGRhdGEuc3VjY2Vzc2Z1bGxfYXR0YWNrcyArIFwiINC/0L7Qv9Cw0LTQsNGO0YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90LDQvdC+0YHRjyBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsC5cIlxyXG5cclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjM6IC8vINCw0LTRgNC10L3QsNC70LjQvdC+0LLRi9C5INC/0L7RgtC+0L9cclxuICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXRfaW5kZXggPSBkYXRhLnRhcmdldF9pbmRleFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pbmRleF1cclxuICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zWzBdXHJcbiAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF90YXJnZXQgPSB7fVxyXG4gICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0LmV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldC50dXJuID0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaW5kZXhdLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldCA9IGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldFxyXG5cclxuICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF91c2VyID0ge31cclxuICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBwb2lzb25vdXNfYWRyZW5hbGluZV9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyID0gYWRyZW5hbGluZV9vYmplY3RfdXNlclxyXG5cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0LjRgdC/0L7Qu9GM0LfRg9C10YIg0LDQtNGA0LXQvdCw0LvQuNC90L7QstGL0Lkg0L/QvtGC0L7Qvy4gXCIgICsgdGFyZ2V0Lm5hbWUgKyBcIiDQv9C+0LvRg9GH0LDQtdGCIFwiICsgZGF0YS5leHRyYV9hY3Rpb25zWzBdICsgXCIg0LTQtdC50YHRgtCy0LjQuSDQsiDRjdGC0L7RgiDRhdC+0LQsINC4IFwiICsgZGF0YS5leHRyYV9hY3Rpb25zWzFdICsgXCIg0LIg0YHQu9C10LTRg9GO0YnQuNC5LiDQrdGC0L4g0LHRg9C00LXRgiDRgdGC0L7QuNGC0Ywg0LbQuNC30L3QtdC5INC4INCy0YvQvdC+0YHQu9C40LLQvtGB0YLQuCwg0LjRgdC/0L7Qu9GM0LfRg9C50YLQtSDRgSDRg9C80L7QvC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG5cclxuICAgICAgY2FzZSAyNDogLy8g0LrQuNGB0LvQvtGC0L3QsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGFjaWRfYm9tYl9zdGFtaW5hX2Nvc3RcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LHRgNC+0YHQsNC10YIg0LrQuNGB0LvQvtGC0L3Rg9GOINCz0YDQsNC90LDRgtGDLiDQkCDQvtC90Lgg0YLQvtC70YzQutC+INC60YPQv9C40LvQuCDQvdC+0LLRi9C1INC00L7RgdC/0LXRhdC4Li4uXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICB2YXIgYWNpZF9ib21iX3VzZXIgPSB7fVxyXG4gICAgICAgICAgYWNpZF9ib21iX3VzZXIuY29vbGRvd24gPSBhY2lkX2JvbWJfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWNpZF9ib21iX3VzZXIgPSBhY2lkX2JvbWJfdXNlclxyXG5cclxuICAgICAgICAgIGFwcGx5X2FjaWRfYm9tYihkYXRhLnBvc2l0aW9uLCBhY2lkX2JvbWJfcmFkaXVzKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyNTogLy8g0LfQsNC80LjQvdC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluY2x1ZGVzKGRhdGEucG9zaXRpb24pKSB7XHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMucHVzaChkYXRhLnBvc2l0aW9uKVxyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1tkYXRhLnBvc2l0aW9uXSA9IFtdXHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW2RhdGEucG9zaXRpb25dLnB1c2goZGF0YS5wbGF5ZXJfbmFtZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI2OiAvLyDQvtCx0LXQt9Cy0YDQtdC00LjRgtGMINC80LjQvdGDXHJcblxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHN3aXRjaChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImVtcHR5XCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KEg0YfQtdC8IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQvtCy0LDRgtGMP1wiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZhaWxcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9C+0L/Ri9GC0LDQu9GB0Y8g0L7QsdC10LfQstGA0LXQtNC40YLRjCDQvNC40L3Rgywg0L3QviDQvdC1INGB0YPQvNC10LsuXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtaW5lX3Bvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgbWluZV9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBjZWxsLnNyYyA9IGZvZ09yUGljKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5kZXhPZihtaW5lX3Bvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLnNwbGljZShpbmRleCwxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1ttaW5lX3Bvc2l0aW9uXSA9IFtdXHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LfQsNC/0YDQtdGJ0LDQtdGCINC80LjQvdC1INCy0LfRgNGL0LLQsNGC0YzRgdGPIVwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN3aXRjaCDQvtCx0LXQstC30YDQtdC20LXQvdC40Y8g0L/QvtGI0LXQuyDQvdC1INGC0LDQulwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI3OiAvLyDQvdC40LrQvtGC0LjQvdC+0LLRi9C5INGD0LTQsNGAXHJcbiAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIGZ1bGxfaHAgPSBIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbdXNlcl9pbmRleF0gLSBmdWxsX2hwICogdG9iYWNjb19zdHJpa2VfaHBfcGVyY2VudGFnZVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9pbmRleF0gKyB0b2JhY2NvX3N0cmlrZV9ib251c1xyXG4gICAgICAgICAgdmFyIHRvYmFjY29fc3RyaWtlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICB0b2JhY2NvX3N0cmlrZV9vYmplY3QuY29vbGRvd24gPSB0b2JhY2NvX3N0cmlrZV9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS50b2JhY2NvX3N0cmlrZSA9IHRvYmFjY29fc3RyaWtlX29iamVjdFxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGF0L7RgNC+0YjQtdGH0L3QviDQt9Cw0YLRj9Cz0LjQstCw0LXRgtGB0Y8uINCR0LXRgNC10LPQuNGC0LXRgdGMIVwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI4OiAvLyDQutGA0YPRh9C10L3Ri9C1INC/0YPQu9C4XHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBjdXJ2ZWRfYnVsbGV0c19zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGF0YS5jb3Zlcl9sZXZlbCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwi0KPRgNC+0LLQtdC90Ywg0YPQutGA0YvRgtC40Y86IFwiICsgZGF0YS5jb3Zlcl9sZXZlbFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwiXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0LfQsNC60YDRg9GC0LjRgtGMINC/0YPQu9GOINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0LfQsNC60YDRg9GC0LjRgtGMINC/0YPQu9GOINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC30LDQutGA0YPRgtC40Lsg0L/Rg9C70Y4gXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQt9Cw0LrRgNGD0YLQuNC7INC/0YPQu9GOIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCLQutGA0YPRh9C10L3QvtC5INC/0YPQu9C10LksINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZ1bGxfY292ZXJcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0J3QtdGB0LzQvtGC0YDRjyDQvdCwINC/0L7Qv9GL0YLQutGDIFwiICsgYXR0YWNrZXIubmFtZSArIFwiINC+0LHQutGA0YPRgtC40YLRjCDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1INC30LDRidC40YnQsNGO0YnQtdC1IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0YLQvtGCINCy0YHQtSDRgNCw0LLQvdC+INC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI5OiAvLyDQn9GA0LjRhtC10LvQuNGC0YzRgdGPXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgYWltX29iamVjdCA9IHt9XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFpbSA9IGFpbV9vYmplY3RcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAzMDogLy8g0LHRi9GB0YLRgNCw0Y8g0LDRgtCw0LrQsFxyXG4gICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbdXNlcl9pbmRleF0gPSAxXHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcInF1aWNrX2F0dGFja19yZWFkeVwiKSkge1xyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnF1aWNrX2F0dGFja19yZWFkeVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gc3RhbWluYV9hdHRhY2tfY29zdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5jb3Zlcl9sZXZlbCA+IDApIHtcclxuICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCLQo9GA0L7QstC10L3RjCDRg9C60YDRi9GC0LjRjzogXCIgKyBkYXRhLmNvdmVyX2xldmVsXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwiXCJcclxuICAgICAgfVxyXG4gICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LHRi9GB0YLRgNC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdGL0YHRgtGA0L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQsdGL0YHRgtGA0L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LHRi9GB0YLRgNC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQsdGL0YHRgtGA0L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiLCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0LHRi9GB0YLRgNC+INCw0YLQsNC60L7QstCw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QviDRgtC+0YIg0L3QsNGF0L7QtNC40YLRgdGPINCyINC/0L7Qu9C90L7QvCDRg9C60YDRi9GC0LjQuC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzE6IC8vINGB0LvRg9C20LHQsCDRgdC/0LDRgdC10L3QuNGPXHJcbiAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIHNhZmV0eV9zZXJ2aWNlX2JvbnVzX2FjdGlvbnNfY29zdFxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2F2aW9yID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBzYXZpb3IubmFtZSArIFwiINC90LUg0LTQsNGB0YIg0LIg0L7QsdC40LTRgyBcIiArICB0YXJnZXQubmFtZVxyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gKyBzYWZldHlfc2VydmljZV9kZWZlbnNpdmVfYWR2YW50YWdlXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1tkYXRhLnRhcmdldF9pZF0gKyBzYWZldHlfc2VydmljZV9ldmFkZV9ib251c1xyXG5cclxuICAgICAgICB2YXIgc2FmZXR5X3NlcnZpY2VfdGFyZ2V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgc2FmZXR5X3NlcnZpY2VfdGFyZ2V0X29iamVjdC5kdXJhdGlvbiA9IHNhZmV0eV9zZXJ2aWNlX2R1cmF0aW9uXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uc2FmZXR5X3NlcnZpY2VfdGFyZ2V0ID0gc2FmZXR5X3NlcnZpY2VfdGFyZ2V0X29iamVjdFxyXG5cclxuICAgICAgICB2YXIgc2FmZXR5X3NlcnZpY2VfdXNlcl9vYmplY3QgPSB7fVxyXG4gICAgICAgIHNhZmV0eV9zZXJ2aWNlX3VzZXJfb2JqZWN0LmNvb2xkb3duID0gc2FmZXR5X3NlcnZpY2VfY29vbGRvd25cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnNhZmV0eV9zZXJ2aWNlX3VzZXIgPSBzYWZldHlfc2VydmljZV91c2VyX29iamVjdFxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAzMjogLy8g0LrQsNC70YzQuNC90LPQsNC70Y/RgtC+0YBcclxuICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gY2FsaW5nYWxhdG9yX3N0YW1pbmFfY29zdFxyXG5cclxuICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0LrQsNC70YzQuNC90LPQsNC70Y/RgtC+0YAuINCh0L7QsdC40YDQsNC50YLQtdGB0Ywg0LLQvtC60YDRg9CzIS5cIlxyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgdmFyIGNhbGluZ2FsYXRvcl9vYmplY3QgPSB7fVxyXG4gICAgICAgIGNhbGluZ2FsYXRvcl9vYmplY3QudHlwZSA9IFwiY2FsaW5nYWxhdG9yXCJcclxuICAgICAgICBjYWxpbmdhbGF0b3Jfb2JqZWN0LnBvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgIGNhbGluZ2FsYXRvcl9vYmplY3QuZHVyYXRpb24gPSBjYWxpbmdhbGF0b3JfZHVyYXRpb25cclxuICAgICAgICBjYWxpbmdhbGF0b3Jfb2JqZWN0LnJhZGl1cyA9IGNhbGluZ2FsYXRvcl9yYWRpdXNcclxuICAgICAgICBjYWxpbmdhbGF0b3Jfb2JqZWN0LmZsYXRfaGVhbCA9IGNhbGluZ2FsYXRvcl9mbGF0X2hlYWxcclxuICAgICAgICBjYWxpbmdhbGF0b3Jfb2JqZWN0LnJvbGxfaGVhbCA9IGNhbGluZ2FsYXRvcl9yb2xsX2hlYWxcclxuICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5wdXNoKGNhbGluZ2FsYXRvcl9vYmplY3QpXHJcblxyXG4gICAgICAgIHZhciBjYWxpbmdhbGF0b3JfdXNlciA9IHt9XHJcbiAgICAgICAgY2FsaW5nYWxhdG9yX3VzZXIuY29vbGRvd24gPSBjYWxpbmdhbGF0b3Jfc2tpbGxfY29vbGRvd25cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmNhbGluZ2FsYXRvcl91c2VyID0gY2FsaW5nYWxhdG9yX3VzZXJcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAzMzogLy8g0LHQsNGE0YQg0LHQtdC70YzQstC10YJcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwibWFpbl9hY3Rpb25cIiwgdXNlcl9pbmRleCwgLTEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIHRhcmdldF9pZCA9IGRhdGEudGFyZ2V0X2lkO1xyXG5cclxuICAgICAgICAgIHZhciBidWZmZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pZF1cclxuXHJcbiAgICAgICAgICAvLyDQndC10L/QvtGB0YDQtdC00YHRgtCy0LXQvdC90L4g0LHQsNGE0YRcclxuICAgICAgICAgIHZhciBiZWx2ZXRfYnVmZl90YXJnZXRfb2JqZWN0ID0ge307XHJcbiAgICAgICAgICBiZWx2ZXRfYnVmZl90YXJnZXRfb2JqZWN0LmR1cmF0aW9uID0gYmVsdmV0X2J1ZmZfc2tpbGxfZHVyYXRpb247XHJcbiAgICAgICAgICBiZWx2ZXRfYnVmZl90YXJnZXRfb2JqZWN0LmF0dGFja19ib251cyA9IGJlbHZldF9idWZmX2F0dGFja19ib251cztcclxuICAgICAgICAgIGJlbHZldF9idWZmX3RhcmdldF9vYmplY3QubWVsZWVfYWR2YW50YWdlID0gYmVsdmV0X2J1ZmZfbWVsZWVfYWR2YW50YWdlO1xyXG4gICAgICAgICAgYmVsdmV0X2J1ZmZfdGFyZ2V0X29iamVjdC5yYW5nZWRfYWR2YW50YWdlID0gYmVsdmV0X2J1ZmZfcmFuZ2VkX2FkdmFudGFnZTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2lkXS5iZWx2ZXRfYnVmZl90YXJnZXQgPSBiZWx2ZXRfYnVmZl90YXJnZXRfb2JqZWN0O1xyXG4gICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcImF0dGFja19ib251c1wiLCB0YXJnZXRfaWQsIGJlbHZldF9idWZmX2F0dGFja19ib251cyk7XHJcbiAgICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwibWVsZWVfYWR2YW50YWdlXCIsIHRhcmdldF9pZCwgYmVsdmV0X2J1ZmZfbWVsZWVfYWR2YW50YWdlKTtcclxuICAgICAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJyYW5nZWRfYWR2YW50YWdlXCIsIHRhcmdldF9pZCwgYmVsdmV0X2J1ZmZfcmFuZ2VkX2FkdmFudGFnZSk7XHJcblxyXG5cclxuICAgICAgICAgIC8vINCf0L7QtNGB0YfQtdGCINGB0LrRgNGL0YLRi9GFINGB0YLQsNC60L7QslxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2lkXS5oYXNPd25Qcm9wZXJ0eShcImJlbHZldF9idWZmX3N0YWNrc1wiKSkge1xyXG4gICAgICAgICAgICB2YXIgYmVsdmV0X2J1ZmZfc3RhY2tzX29iamVjdCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2lkXS5iZWx2ZXRfYnVmZl9zdGFja3M7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgYmVsdmV0X2J1ZmZfc3RhY2tzX29iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICBiZWx2ZXRfYnVmZl9zdGFja3Nfb2JqZWN0LnN0YWNrcyA9IDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBiZWx2ZXRfYnVmZl9zdGFja3Nfb2JqZWN0LnN0YWNrcyA9IGJlbHZldF9idWZmX3N0YWNrc19vYmplY3Quc3RhY2tzICsgMTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2lkXS5iZWx2ZXRfYnVmZl9zdGFja3MgPSBiZWx2ZXRfYnVmZl9zdGFja3Nfb2JqZWN0O1xyXG5cclxuICAgICAgICAgIC8vINCd0LDQutC+0L3QtdGGLCDQtNC+0LHQsNCy0LvRj9C10Lwg0LIg0YHQv9C40YHQvtC6INGG0LXQu9C10Lkg0YMg0Y7Qt9C10YDQsFxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uaGFzT3duUHJvcGVydHkoXCJiZWx2ZXRfYnVmZl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iZWx2ZXRfYnVmZl91c2VyLnRhcmdldHNfc2V0LmluY2x1ZGVzKHRhcmdldF9pZCkpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJlbHZldF9idWZmX3VzZXIudGFyZ2V0c19zZXQucHVzaCh0YXJnZXRfaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgYmVsdmV0X2J1ZmZfdXNlcl9vYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgYmVsdmV0X2J1ZmZfdXNlcl9vYmplY3QudGFyZ2V0c19zZXQgPSBbXTtcclxuICAgICAgICAgICAgYmVsdmV0X2J1ZmZfdXNlcl9vYmplY3QudGFyZ2V0c19zZXQucHVzaCh0YXJnZXRfaWQpO1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJlbHZldF9idWZmX3VzZXIgPSBiZWx2ZXRfYnVmZl91c2VyX29iamVjdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYnVmZmVyLm5hbWUgKyBcIiDRg9GB0LjQu9C40LLQsNC10YIg0LDRgtCw0LrQuCBcIiArIHRhcmdldC5uYW1lICsgXCIuINCd0LUg0LfQsNCx0YPQtNGM0YLQtSDRgdC60LDQt9Cw0YLRjCDRgdC/0LDRgdC40LHQviFcIjtcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzQ6IC8vINGC0YDQsNC90YHRhNC+0YDQvNCw0YbQuNGPINCR0LXQu9GM0LLQtdGCXHJcbiAgICAgICAgdmFyIHVzZXIgPSAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF07XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhLnJvbGxlZF9idWZmc190YXJnZXRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICB2YXIgdGFyZ2V0X2lkID0gZGF0YS5yb2xsZWRfYnVmZnNfdGFyZ2V0c1tqXTtcclxuICAgICAgICAgIHZhciByb2xsZWRfYnVmZnNfYXJyYXkgPSBkYXRhLnJvbGxlZF9idWZmc19vdXRjb21lc1tqXTtcclxuICAgICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICAgIHdoaWxlIChpIDwgNSkge1xyXG4gICAgICAgICAgICBpZiAocm9sbGVkX2J1ZmZzX2FycmF5W2ldID4gMCkge1xyXG4gICAgICAgICAgICAgIHJvbGxlZF9idWZmc19hcnJheVtpXSAtPSAxO1xyXG4gICAgICAgICAgICAgIHN3aXRjaChpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IC8vc3RyZW5ndGhcclxuICAgICAgICAgICAgICAgICAgYXBwbHlfZWZmZWN0KHVzZXJfaW5kZXgsIElOQ1JFQVNFX1NUUkVOR1RIKTtcclxuICAgICAgICAgICAgICAgICAgYXBwbHlfZWZmZWN0KHRhcmdldF9pZCwgREVDUkVBU0VfU1RSRU5HVEgpO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgIGFwcGx5X2VmZmVjdCh1c2VyX2luZGV4LCBJTkNSRUFTRV9TVEFNSU5BKTtcclxuICAgICAgICAgICAgICAgICAgYXBwbHlfZWZmZWN0KHRhcmdldF9pZCwgREVDUkVBU0VfU1RBTUlOQSk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgYXBwbHlfZWZmZWN0KHVzZXJfaW5kZXgsIElOQ1JFQVNFX0FHSUxJVFkpO1xyXG4gICAgICAgICAgICAgICAgICBhcHBseV9lZmZlY3QodGFyZ2V0X2lkLCBERUNSRUFTRV9BR0lMSVRZKTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICBhcHBseV9lZmZlY3QodXNlcl9pbmRleCwgSU5DUkVBU0VfSU5UKTtcclxuICAgICAgICAgICAgICAgICAgYXBwbHlfZWZmZWN0KHRhcmdldF9pZCwgREVDUkVBU0VfSU5UKTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICBhcHBseV9lZmZlY3QodXNlcl9pbmRleCwgSU5DUkVBU0VfS0QpO1xyXG4gICAgICAgICAgICAgICAgICBhcHBseV9lZmZlY3QodGFyZ2V0X2lkLCBERUNSRUFTRV9LRCk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpICs9MTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJlbHZldF9idWZmX3VzZXIudHJhbnNmb3JtZWQgPSB7fTtcclxuICAgICAgICBpZiAodXNlci5oYXNPd25Qcm9wZXJ0eShcInNlY29uZGFyeV9hdmF0YXJcIikpIHtcclxuICAgICAgICAgIHZhciB0ZW1wID0gdXNlci5hdmF0YXI7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XS5hdmF0YXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XS5zZWNvbmRhcnlfYXZhdGFyO1xyXG4gICAgICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF0uc2Vjb25kYXJ5X2F2YXRhciA9IHRlbXA7XHJcbiAgICAgICAgICB2YXIgY2hhcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvblt1c2VyX2luZGV4XTtcclxuICAgICAgICAgIGlmICghKCgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtjaGFyX3Bvc2l0aW9uXSA9PSAxKSkgfHwgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbdXNlcl9pbmRleF0gIT0gXCJhbGxcIiAmJiBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W3VzZXJfaW5kZXhdICE9IG15X25hbWUpKSkge1xyXG4gICAgICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBjaGFyX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgdG9fY2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUodXNlcl9pbmRleCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0L7RgtC60YDRi9Cy0LDQtdGCINGB0LLQvtGOINC40YHRgtC40L3QvdGD0Y4g0YHRg9GJ0L3QvtGB0YLRjCwg0L/QvtC70YPRh9Cw0Y8gXCIgKyBkYXRhLnRvdGFsX3VwZ3JhZGUgKyBcIiDRg9GB0LjQu9C10L3QuNC5LiDQo9C00LDRh9C90L7QuSDQvtGF0L7RgtGLIVwiO1xyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDM1OiAvLyDRhdGD0LpcclxuICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdO1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF07XHJcblxyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtPSAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaG9va191c2VyX29iamVjdCA9IHt9XHJcbiAgICAgICAgaG9va191c2VyX29iamVjdC5jb29sZG93biA9IGhvb2tfY29vbGRvd25cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmhvb2tfdXNlciA9IGhvb2tfdXNlcl9vYmplY3RcclxuXHJcbiAgICAgICAgdmFyIGhvb2tfdGFyZ2V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgaG9va190YXJnZXRfb2JqZWN0LmR1cmF0aW9uID0gaG9va19kdXJhdGlvblxyXG4gICAgICAgIGhvb2tfdGFyZ2V0X29iamVjdC5kZWZlbnNpdmVfYWR2YW50YWdlID0gaG9va19kZWZlbnNpdmVfYWR2YW50YWdlXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uaG9va190YXJnZXQgPSBob29rX3RhcmdldF9vYmplY3RcclxuXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbZGF0YS50YXJnZXRfaWRdICs9IGhvb2tfZGVmZW5zaXZlX2FkdmFudGFnZTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuaG9va19wb3NzaWJsZSkge1xyXG4gICAgICAgICAgZm9yY2VkX21vdmVtZW50KGRhdGEub2xkX3Bvc2l0aW9uLCBkYXRhLm5ld19wb3NpdGlvbiwgZGF0YS50YXJnZXRfaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDRhdGD0LrQsNC10YIgXCIgKyB0YXJnZXQubmFtZTtcclxuICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzY6IC8vIHB1bmlzaGluZ19zdHJpa2VcclxuICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtPSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC09IDFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwdW5pc2hpbmdfc3RyaWtlX3VzZXJfb2JqZWN0ID0ge31cclxuICAgICAgICBwdW5pc2hpbmdfc3RyaWtlX3VzZXJfb2JqZWN0LmNvb2xkb3duID0gcHVuaXNoaW5nX3N0cmlrZV9jb29sZG93blxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ucHVuaXNoaW5nX3N0cmlrZV91c2VyID0gcHVuaXNoaW5nX3N0cmlrZV91c2VyX29iamVjdFxyXG5cclxuICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC60LDRgNCw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC60LDRgNCw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L7QtNC90LDQutC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDRg9C00LDQu9C+0YHRjCDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GA0LjQvNC10L3Rj9C10YIg0LrQsNGA0LDRjtGJ0LjQuSDRg9C00LDRgCDQuiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjywg0L3QsNC90L7RgdGPIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GA0LjQvNC10L3Rj9C10YIg0LrQsNGA0LDRjtGJ0LjQuSDRg9C00LDRgCDQuiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIiksINC90LDQvdC+0YHRjyBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodGD0LTQvdGL0Lkg0LTQtdC90Ywg0L3QsNGB0YLRg9C/0LjQuyDQtNC70Y8gXCIgKyB0YXJnZXQubmFtZSArIFwiLiBcIiArIGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQutCw0YDQsNC10YIg0L/RgNC+0YLQuNCy0L3QuNC60LAsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINC/0L7QutCw0YDQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90L4g0YLQvtGCINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBwdW5pc2htZW50XCIpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGFsZXJ0KFwiUmVjZWl2ZWQgdW5rbm93biBza2lsbCBjb21tYW5kXCIpXHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbmV3X3JvdW5kX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IFwi0J3QsNGH0LDQu9C+INC90L7QstC+0LPQviDRgNCw0YPQvdC00LAhXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXSAhPT0gbnVsbCAmJiBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBzd2l0Y2ggKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImdhc19ib21iXCI6XHJcbiAgICAgICAgICAgICAgICBhcHBseV9ib21iKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnBvc2l0aW9uLCBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5yYWRpdXMpXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzID49IDQpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX29iamVjdF9jb21tYW5kKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzICsgMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjYWxpbmdhbGF0b3JcIjpcclxuICAgICAgICAgICAgICAgIGFwcGx5X2NhbGluZ2FsYXRvcihnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5wb3NpdGlvbiwgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzLCBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5mbGF0X2hlYWwsIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJvbGxfaGVhbCwgZGF0YS5jYWxpbmdhbGF0b3JfaGVhbF9yb2xsX2xpc3QsIGRhdGEuY2FsaW5nYWxhdG9yX2NvaW5fZmxpcCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5kdXJhdGlvbiA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLmR1cmF0aW9uIC0gMVxyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLmR1cmF0aW9uID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX29iamVjdF9jb21tYW5kKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NlZCB1cCByZXNvbHZpbmcgdGVycmFpbiBlZmZlY3RzXCIpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS50eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baV1cclxuICAgICAgICBpZiAoY2hhcmFjdGVyICE9PSB1bmRlZmluZWQgJiYgY2hhcmFjdGVyICE9PSBudWxsICYmIGNoYXJhY3Rlcl9zdGF0ZS5IUFtpXSAhPT0gbnVsbCAmJiBjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gPiAwKSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2ldID0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtpXSA9IDBcclxuICAgICAgICAgIGFzc2lnbl9tb3ZlcyhpKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IGJvbnVzX2FjdGlvbl9tYXBbY2hhcmFjdGVyLmFnaWxpdHldO1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gbWFpbl9hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInRpcmVkXCIpKSB7IC8vINCj0LHRgNCw0YLRjCDQsdC+0L3Rg9GB0Ysg0L7RgiDRg9GB0YLQsNC70L7RgdGC0Lgg0L/RgNC+0YjQu9C+0LPQviDRhdC+0LTQsCAo0YfRgtC+0LHRiyDQutC+0LPQtNCwINCx0YPQtNGD0YIg0L3QsNC60LDQu9Cw0LTRi9Cy0LDRgtGM0YHRjyDQvdC+0LLRi9C1INC90LUg0YjRgtGA0LDRhNC+0LLQsNGC0Ywg0LTQstCw0LbQtNGLKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQuYm9udXNcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPCBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0gKiAwLjY3KSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA8IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSAqIDAuMzQpIHtcclxuICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPD0gMCkgeyAvLyAz0Y8g0YHRgtCw0LTQuNGPXHJcbiAgICAgICAgICAgICAgICB2YXIgdGlyZWRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgIHRpcmVkX29iamVjdC5ib251cyA9IC0zXHJcbiAgICAgICAgICAgICAgICB0aXJlZF9vYmplY3Quc3RhZ2UgPSAzXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkID0gdGlyZWRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIDNcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldKjAuMjUpXHJcbiAgICAgICAgICAgICAgICBpZiAoKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9PSAxKSYmKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPT0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSAxXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2UgeyAvLyAy0Y8g0YHRgtCw0LTQuNGPXHJcbiAgICAgICAgICAgICAgICB2YXIgdGlyZWRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgIHRpcmVkX29iamVjdC5ib251cyA9IC0yXHJcbiAgICAgICAgICAgICAgICB0aXJlZF9vYmplY3Quc3RhZ2UgPSAyXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkID0gdGlyZWRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIDJcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldKjAuNSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIDHRjyDRgdGC0LDQtNC40Y9cclxuICAgICAgICAgICAgICB2YXIgdGlyZWRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICB0aXJlZF9vYmplY3QuYm9udXMgPSAtMVxyXG4gICAgICAgICAgICAgIHRpcmVkX29iamVjdC5zdGFnZSA9IDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkID0gdGlyZWRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0qMC43NSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwidGlyZWRcIikpIHsgLy8g0L3QtSDRg9GB0YLQsNC7IC0+INGD0LHRgNCw0YLRjCDRg9GB0YLQu9Cw0LvQvtGB0YLRjCDQtdGB0LvQuCDQsdGL0LvQsFxyXG4gICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50aXJlZFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwibGlnaHRfc291bmRfYm9tYl91c2VyXCIsIFwiXCIpO1xyXG4gICAgICAgICAgY2hlY2tfY29vbGRvd24oaSwgXCJhY3Rpb25fc3BsYXNoXCIsIFwiXCIpO1xyXG4gICAgICAgICAgY2hlY2tfY29vbGRvd24oaSwgXCJzYWZldHlfc2VydmljZV91c2VyXCIsIFwiXCIpO1xyXG4gICAgICAgICAgY2hlY2tfY29vbGRvd24oaSwgXCJjYWxpbmdhbGF0b3JfdXNlclwiLCBcIlwiKTtcclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwiZ2FzX2JvbWJfdXNlclwiLCBcIlwiKTtcclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwiYWNpZF9ib21iX3VzZXJcIiwgXCJcIik7XHJcbiAgICAgICAgICBjaGVja19jb29sZG93bihpLCBcImZvcmNlX2ZpZWxkX3VzZXJcIiwgXCJcIik7XHJcbiAgICAgICAgICBjaGVja19jb29sZG93bihpLCBcImNoYXJnZV91c2VyXCIsIFwiXCIpO1xyXG4gICAgICAgICAgY2hlY2tfY29vbGRvd24oaSwgXCJjdXRfbGltYl91c2VyXCIsIFwiXCIpO1xyXG4gICAgICAgICAgY2hlY2tfY29vbGRvd24oaSwgXCJhZHJlbmFsaW5lX3VzZXJcIiwgXCJcIik7XHJcbiAgICAgICAgICBjaGVja19jb29sZG93bihpLCBcInBvaXNvbm91c19hZHJlbmFsaW5lX3VzZXJcIiwgXCJcIik7XHJcbiAgICAgICAgICBjaGVja19jb29sZG93bihpLCBcImhvb2tfdXNlclwiLCBcIlwiKTtcclxuICAgICAgICAgIGNoZWNrX2Nvb2xkb3duKGksIFwicHVuaXNoaW5nX3N0cmlrZV91c2VyXCIsIFwiXCIpO1xyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwic2FmZXR5X3NlcnZpY2VfdGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNhZmV0eV9zZXJ2aWNlX3RhcmdldC5kdXJhdGlvbiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtpXSAtIHNhZmV0eV9zZXJ2aWNlX2RlZmVuc2l2ZV9hZHZhbnRhZ2VcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbaV0gLSBzYWZldHlfc2VydmljZV9ldmFkZV9ib251c1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNhZmV0eV9zZXJ2aWNlX3RhcmdldFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2FmZXR5X3NlcnZpY2VfdGFyZ2V0LmR1cmF0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zYWZldHlfc2VydmljZV90YXJnZXQuZHVyYXRpb24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImJlbHZldF9idWZmX3RhcmdldFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iZWx2ZXRfYnVmZl90YXJnZXQuZHVyYXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJhdHRhY2tfYm9udXNcIiwgaSwgLTEqY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iZWx2ZXRfYnVmZl90YXJnZXQuYXR0YWNrX2JvbnVzKTtcclxuICAgICAgICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwibWVsZWVfYWR2YW50YWdlXCIsIGksIC0xKmNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmVsdmV0X2J1ZmZfdGFyZ2V0Lm1lbGVlX2FkdmFudGFnZSk7XHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcInJhbmdlZF9hZHZhbnRhZ2VcIiwgaSwgLTEqY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iZWx2ZXRfYnVmZl90YXJnZXQucmFuZ2VkX2FkdmFudGFnZSk7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmVsdmV0X2J1ZmZfdGFyZ2V0XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iZWx2ZXRfYnVmZl90YXJnZXQuZHVyYXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJlbHZldF9idWZmX3RhcmdldC5kdXJhdGlvbiAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiaG9va190YXJnZXRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaG9va190YXJnZXQuZHVyYXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJkZWZlbnNpdmVfYWR2YW50YWdlXCIsIGksIC0xKmNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaG9va190YXJnZXQuZGVmZW5zaXZlX2FkdmFudGFnZSk7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaG9va190YXJnZXRcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhvb2tfdGFyZ2V0LmR1cmF0aW9uIC09IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiY2FsaW5nYWxhdG9yX3RhcmdldFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jYWxpbmdhbGF0b3JfdGFyZ2V0LmR1cmF0aW9uID09IDApIHtcclxuICAgICAgICAgICAgICB2YXIgcmV2ZXJzZV9wZW5hbHR5ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jYWxpbmdhbGF0b3JfdGFyZ2V0LnBlbmFsdHkgKiAoLTEpXHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcImF0dGFja19ib251c1wiLCBpLCByZXZlcnNlX3BlbmFsdHkpO1xyXG4gICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmNhbGluZ2FsYXRvcl90YXJnZXQuc3RhZ2UgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcIm1lbGVlX2FkdmFudGFnZVwiLCBpLCAxKTtcclxuICAgICAgICAgICAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJyYW5nZWRfYWR2YW50YWdlXCIsIGksIDEpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jYWxpbmdhbGF0b3JfdGFyZ2V0LnN0YWdlID09IDQpIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJtZWxlZV9hZHZhbnRhZ2VcIiwgaSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcInJhbmdlZF9hZHZhbnRhZ2VcIiwgaSwgLTEpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jYWxpbmdhbGF0b3JfdGFyZ2V0XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jYWxpbmdhbGF0b3JfdGFyZ2V0LmR1cmF0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jYWxpbmdhbGF0b3JfdGFyZ2V0LmR1cmF0aW9uIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJwaWNoX3BpY2hfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXJcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KPQvNC10L3QuNC1INCf0YvRiS3Qn9GL0Ykg0YMgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINGB0L3QvtCy0LAg0LTQvtGB0YLRg9C/0L3Qvi5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biA9PSBwaWNoX3BpY2hfY29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSAwXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJwaWNoX3BpY2hfdGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF90YXJnZXQuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gKyAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3RhcmdldFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFpbVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYWRyZW5hbGluZV90YXJnZXRcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgbWludXNfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZV90YXJnZXQubWludXNfYWN0aW9uc1xyXG4gICAgICAgICAgICAgIHdoaWxlIChtaW51c19hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pbnVzX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldIC0gYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtaW51c19hY3Rpb25zID0gbWludXNfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZV90YXJnZXRcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldFwiKSkge1xyXG4gICAgICAgICAgICAgIHZhciB0dXJuID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXQudHVyblxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0LnR1cm4gPSB0dXJuICsgMVxyXG4gICAgICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXQuZXh0cmFfYWN0aW9uc1t0dXJuXVxyXG4gICAgICAgICAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gKyAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHR1cm4gKyAxID09IHBvaXNvbm91c19hZHJlbmFsaW5lX2R1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baV1cclxuICAgICAgICAgICAgICAgIHZhciBtYXhfSFAgPSBIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgICAgICAgICAgICAgICB2YXIgbWF4X3N0YW1pbmEgPSBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV1cclxuICAgICAgICAgICAgICAgIHZhciBIUF9jb3N0ID0gcG9pc29ub3VzX2FkcmVuYWxpbmVfZmxhdF9IUCArIHBhcnNlSW50KHBhcnNlRmxvYXQobWF4X0hQKSAqIHBvaXNvbm91c19hZHJlbmFsaW5lX3BlcmNlbnRfSFApXHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhbWluYV9jb3N0ID0gcG9pc29ub3VzX2FkcmVuYWxpbmVfZmxhdF9zdGFtaW5hICsgcGFyc2VJbnQocGFyc2VGbG9hdChtYXhfc3RhbWluYSkgKiBwb2lzb25vdXNfYWRyZW5hbGluZV9wZXJjZW50X3N0YW1pbmEpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gLSBIUF9jb3N0XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIC0gc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXRcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQkNC00YDQtdC90LDQu9C40L0g0LIg0LrRgNC+0LLQuCBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LfQsNC60LDQvdGH0LjQstCw0LXRgtGB0Y8sINC90LDRgdGC0YPQv9Cw0LXRgiDQv9C+0YXQvNC10LvRjNC1IChcIiArIEhQX2Nvc3QgKyBcIiDRhdC/INC4IFwiICsgc3RhbWluYV9jb3N0ICsgXCIg0LLRi9C90L7RgdC70LjQstC+0YHRgtC4KVwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwic2hvY2tlZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2ldICsgMVxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNob2NrZWRcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNob2NrZWQuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNob2NrZWQuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImN1dF9saW1iXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iLmR1cmF0aW9uID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodGD0YXQvtC20LjQu9C40Y8gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINCy0L7RgdGB0YLQsNC90L7QstC40LvQuNGB0YwuXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gLTEwXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYi5kdXJhdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY3V0X2xpbWIuZHVyYXRpb24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImhlYWxlZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oZWFsZWQuY29vbGRvd24gPiAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldLzJcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oZWFsZWQuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oZWFsZWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYmxpbmRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmxpbmQuY29vbGRvd24gPiAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmxpbmQuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmxpbmRcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldICsgMlxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbaV0gPSBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2ldICsgMVxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQl9GA0LXQvdC40LUgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINCy0L7RgdGB0YLQsNC90L7QstC40LvQvtGB0YxcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiTWFya3VzX3N0YWNrc1wiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLk1hcmt1c19zdGFja3MgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLk1hcmt1c19zdGFja3MgLSAxXHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLk1hcmt1c19zdGFja3MgPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLk1hcmt1c19zdGFja3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwic2hpZWxkX3VwXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IE1hdGguY2VpbChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0vMilcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSAtIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hpZWxkX3VwLnN0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/RgNC+0LTQvtC70LbQsNC10YIg0LTQtdGA0LbQsNGC0Ywg0YnQuNGCICjRgdC/0LDRgdC40LHQvilcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImJpZ19icm9cIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyby5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2ldID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2ldIC0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmJvbnVzX0tEXHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyb1xyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRgtC10YDRj9C10YIg0LfQsNGJ0LjRgtGDINCR0L7Qu9GM0YjQvtCz0L4g0JHRgNCw0YLQsFwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyby5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyby5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwidG9iYWNjb19zdHJpa2VcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udG9iYWNjb19zdHJpa2UuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRvYmFjY29fc3RyaWtlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udG9iYWNjb19zdHJpa2UuY29vbGRvd24gPT0gdG9iYWNjb19zdHJpa2VfY29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2ldIC0gdG9iYWNjb19zdHJpa2VfYm9udXNcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50b2JhY2NvX3N0cmlrZS5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udG9iYWNjb19zdHJpa2UuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFjaWRfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3BvaXNvbi5kdXJhdGlvbiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2ldID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2ldICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uLmJvbnVzX0tEXHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3BvaXNvblxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQkdGA0L7QvdGPIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQvdCw0LrQvtC90LXRhiDQstC+0YHRgdGC0LDQvdC+0LLQuNC70LDRgdGMXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsXHJcbiAgICAgICAgICAgIHdoaWxlIChjb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAvL2NoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSAtIGdhc19ib21iX21vdmVfcmVkdWN0aW9uXHJcbiAgICAgICAgICAgICAgaWYgKGNvdW50ICUgMiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldIC0gMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb3VudCA9IGNvdW50IC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzYXZlX3JvbGwgPSBkYXRhLnNhdmVfcm9sbF9saXN0W2ldXHJcbiAgICAgICAgICAgIGlmIChzYXZlX3JvbGwgPj0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24udGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsIC0gMVxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQutC40LTQsNC10YIg0YHQv9Cw0YHQsdGA0L7RgdC+0Log0Lgg0YPQvNC10L3RjNGI0LDQtdGCINGB0YLQsNC00LjRjiDQvtGC0YDQsNCy0LvQtdC90LjRjyAo0YLQtdC/0LXRgNGMIFwiICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0YDQvtCy0LDQu9C40LLQsNC10YIg0YHQv9Cw0YHQsdGA0L7RgdC+0LouINCh0YLQsNC00LjRjyDQvtGC0YDQsNCy0LvQtdC90LjRjyDQvtGB0YLQsNC10YLRgdGPINC/0YDQtdC20L3QtdC5IChcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgPD0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvblxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsdC+0LvRjNGI0LUg0L3QtSDQvtGC0YDQsNCy0LvQtdC9IVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJtZWxlZWRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubWVsZWVkLmNvb2xkb3duIDw9IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWRcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldICsgMVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubWVsZWVkLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWQuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSAnc25pcGVyJykge1xyXG4gICAgICAgICAgICB2YXIgZWZmZWN0c19vYmplY3QgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldXHJcbiAgICAgICAgICAgIGlmIChlZmZlY3RzX29iamVjdC5oYXNPd25Qcm9wZXJ0eShcInNuaXBlcl9wYXNzaXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfYXR0YWNrX2JvbnVzID0gZWZmZWN0c19vYmplY3Quc25pcGVyX3Bhc3NpdmUuYXR0YWNrX2JvbnVzXHJcbiAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfZGFtYWdlX2JvbnVzID0gZWZmZWN0c19vYmplY3Quc25pcGVyX3Bhc3NpdmUuZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnRfYXR0YWNrX2JvbnVzID09IC01KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2F0dGFja19ib251cyA9IDBcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2F0dGFja19ib251cyA9IE1hdGgubWluKGN1cnJlbnRfYXR0YWNrX2JvbnVzICsgMSwgNClcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfZGFtYWdlX2JvbnVzID0gTWF0aC5taW4oY3VycmVudF9kYW1hZ2VfYm9udXMgKyAyLCA4KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tpXSAtIGN1cnJlbnRfYXR0YWNrX2JvbnVzICsgbmV3X2F0dGFja19ib251c1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2ldIC0gY3VycmVudF9kYW1hZ2VfYm9udXMgKyBuZXdfZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXMgPSBuZXdfYXR0YWNrX2JvbnVzXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXMgPSBuZXdfZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIHNuaXBlcl9wYXNzaXZlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmF0dGFja19ib251cyA9IDBcclxuICAgICAgICAgICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc25pcGVyX3Bhc3NpdmUgPSBzbmlwZXJfcGFzc2l2ZV9vYmplY3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2JhdHRsZV9tb2RfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9IGRhdGEudmFsdWVcclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAwKSB7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCR0L7QuSDQvtC60L7QvdGH0LXQvSEg0J3QsNGB0YLRg9C/0LjQuyDQvNC40YAg0LLQviDQstGB0LXQvCDQvNC40YDQtVwiXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCd0LDRh9Cw0LvQviDQsdC+0Y8hINCb0Y7QtNC4INGD0LzQuNGA0LDRjtGCLCDQtdGB0LvQuCDQuNGFINGD0LHQuNGC0YxcIlxyXG4gICAgICB9XHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdyZXNvbHZlX2F0dGFja19yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuYXR0YWNrX3R5cGUgPT0gXCJyYW5nZWRcIikge1xyXG4gICAgICAgIHZhciBhdWRpbyA9IGd1bnNob3RfYXVkaW9cclxuICAgICAgfSBlbHNlIGlmIChkYXRhLmF0dGFja190eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgICAgIHZhciBhdWRpbyA9IHN3b3JkX2F1ZGlvXHJcbiAgICAgIH0gZWxzZSB7Ly8gZGVmYXVsdCBpbmNsdWRpbmcgZW5lcmd5IGFuZCB0aHJvd2luZ1xyXG4gICAgICAgIHZhciBhdWRpbyA9IHN1cmlrZW5fYXVkaW9cclxuICAgICAgfVxyXG4gICAgICBhdWRpby5wbGF5KCk7XHJcblxyXG4gICAgICBpZiAoZGF0YS51c2VyX2ludmlzaWJpbGl0eV9lbmRlZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtkYXRhLmF0dGFja2VyX2lkXSA9IFwiYWxsXCJcclxuICAgICAgICB2YXIgYXR0YWNrZXJfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBkYXRhLmF0dGFja2VyX3Bvc2l0aW9uKTtcclxuICAgICAgICBhdHRhY2tlcl9jZWxsLnNyYyA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuYXR0YWNrZXJfaWRdLmF2YXRhcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5hdHRhY2tlcl9pZF1cclxuICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuYXR0YWNrZXJfaWRdID0gMVxyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmF0dGFja2VyX2lkXSAtIHN0YW1pbmFfYXR0YWNrX2Nvc3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gLSAxXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiYWltX292ZXJcIikpIHtcclxuICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmF0dGFja2VyX2lkXS5haW1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJxdWlja19hdHRhY2tfcmVhZHlcIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuYXR0YWNrZXJfaWRdLnF1aWNrX2F0dGFja19yZWFkeSA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwibW92ZV9yZWR1Y3Rpb25cIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSAtIGRhdGEubW92ZV9yZWR1Y3Rpb247XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLmNvdmVyX2xldmVsID4gMCkge1xyXG4gICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcItCj0YDQvtCy0LXQvdGMINGD0LrRgNGL0YLQuNGPOiBcIiArIGRhdGEuY292ZXJfbGV2ZWxcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCJcIlxyXG4gICAgICB9XHJcbiAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiLCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0LDRgtCw0LrQvtCy0LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdC+INGC0L7RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdhcHBseV9lZmZlY3RfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGFwcGx5X2VmZmVjdChkYXRhLmNoYXJhY3Rlcl9udW1iZXIsIGRhdGEuZWZmZWN0X251bWJlcik7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2VhcmNoX2FjdGlvbl9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgIHB1c2hUb0xpc3QoZGF0YS5jaGFyYWN0ZXJfbmFtZSArICcg0LHRgNC+0YHQuNC7ICcgKyBkYXRhLnJvbGwgKyAnINC90LAg0LLQvdC40LzQsNGC0LXQu9GM0L3QvtGB0YLRjCDQsiDQt9C+0L3QtSAnICsgZGF0YS56b25lX251bWJlcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIDFcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEubWluZXNfZGV0ZWN0ZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5jaGFyYWN0ZXJfbmFtZSArIFwiINC+0LHQvdCw0YDRg9C20LjQstCw0LXRgiBcIiArIGRhdGEubWluZXNfZGV0ZWN0ZWQubGVuZ3RoICsgXCIg0LzQuNC9INGA0Y/QtNC+0Lwg0YEg0YHQvtCx0L7QuVwiXHJcbiAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5taW5lc19kZXRlY3RlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIG1pbmUgPSBkYXRhLm1pbmVzX2RldGVjdGVkW2ldXHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW21pbmVdLnB1c2goZGF0YS5wbGF5ZXJfbmFtZSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxudmFyIGNyZWF0ZV9ib2FyZF9idXR0b24gPSAkKENSRUFURV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5jcmVhdGVfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGNyZWF0ZUJvYXJkKTtcclxuXHJcbnZhciBzYXZlX2JvYXJkX2J1dHRvbiA9ICQoU0FWRV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBzYXZlQm9hcmQpO1xyXG5cclxudmFyIGxvYWRfYm9hcmRfYnV0dG9uID0gJChMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxvYWRfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGxvYWRCb2FyZCk7XHJcblxyXG52YXIgZG93bmxvYWRfYm9hcmRfYnV0dG9uID0gJChET1dOTE9BRF9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5kb3dubG9hZF9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgZG93bmxvYWRCb2FyZCk7XHJcblxyXG52YXIgcm9sbF9pbml0aWF0aXZlX2J1dHRvbiA9ICQoUk9MTF9JTklUSUFUSVZFX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnJvbGxfaW5pdGlhdGl2ZV9idXR0b24ub24oJ2NsaWNrJywgcm9sbEluaXRpYXRpdmUpO1xyXG5cclxudmFyIGZvZ19idXR0b24gPSAkKEZPR19CVVRUT05fU0VMRUNUT1IpO1xyXG5mb2dfYnV0dG9uLm9uKCdjbGljaycsIGZvZ01vZGVDaGFuZ2UpO1xyXG5cclxudmFyIHpvbmVfYnV0dG9uID0gJChaT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnpvbmVfYnV0dG9uLm9uKCdjbGljaycsIHpvbmVNb2RlQ2hhbmdlKTtcclxuXHJcbnZhciBjaGF0X2J1dHRvbiA9ICQoQ0hBVF9CVVRUT05fU0VMRUNUT1IpO1xyXG5jaGF0X2J1dHRvbi5vbignY2xpY2snLCBjaGFuZ2VDaGF0VmlzaWJpbGl0eSk7XHJcblxyXG52YXIgbWlycm9yX2J1dHRvbiA9ICQoTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUik7XHJcbm1pcnJvcl9idXR0b24ub24oJ2NsaWNrJywgbWlycm9yX2JvYXJkKTtcclxuXHJcbnZhciBuZXh0X3JvdW5kX2J1dHRvbiA9ICQoTkVYVF9ST1VORF9CVVRUT05fU0VMRUNUT1IpO1xyXG5uZXh0X3JvdW5kX2J1dHRvbi5vbignY2xpY2snLCBzdGFydF9uZXdfcm91bmQpO1xyXG5cclxudmFyIGJhdHRsZV9tb2RfYnV0dG9uID0gJChCQVRUTEVfTU9EX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmJhdHRsZV9tb2RfYnV0dG9uLm9uKCdjbGljaycsIGNoYW5nZV9iYXR0bGVfbW9kKTtcclxuXHJcbnZhciBzeW5jX2J1dHRvbiA9ICQoU1lOQ19CVVRUT05fU0VMRUNUT1IpO1xyXG5zeW5jX2J1dHRvbi5vbignY2xpY2snLCBzeW5jX2JvYXJkKTtcclxuXHJcbnZhciBsYW5kbWluZV9idXR0b24gPSAkKExBTkRNSU5FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxhbmRtaW5lX2J1dHRvbi5vbignY2xpY2snLCBzaG93X2xhbmRtaW5lcyk7XHJcblxyXG52YXIgZm9nX3pvbmVfYnV0dG9uID0gJChGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG5mb2dfem9uZV9idXR0b24ub24oJ2NsaWNrJywgZm9nQ3VycmVudFpvbmUpO1xyXG5cclxudmFyIHVuZm9nX3pvbmVfYnV0dG9uID0gJChVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnVuZm9nX3pvbmVfYnV0dG9uLm9uKCdjbGljaycsIHVuZm9nQ3VycmVudFpvbmUpO1xyXG5cclxudmFyIHpvbmVfbnVtYmVyX3NlbGVjdCA9ICQoWk9ORV9OVU1CRVJfU0VMRUNUT1IpO1xyXG5mb3IgKGxldCBpID0gMTsgaSA8IE1BWF9aT05FUzsgaSsrKSB7XHJcbiAgdmFyIGN1cnJlbnRfb3B0aW9uID0gJChcIjxvcHRpb24+XCIpO1xyXG4gIGN1cnJlbnRfb3B0aW9uLnRleHQoJ9CX0L7QvdCwICcgKyBpKTtcclxuICBjdXJyZW50X29wdGlvbi52YWwoaSk7XHJcbiAgem9uZV9udW1iZXJfc2VsZWN0LmFwcGVuZChjdXJyZW50X29wdGlvbik7XHJcbn1cclxuXHJcbnZhciBzYXZlc19zZWxlY3QgPSAkKFNBVkVTX1NFTEVDVF9TRUxFQ1RPUik7XHJcblxyXG52YXIgc2VhcmNoX21vZGlmaWNhdG9yID0gJChTRUFSQ0hfTU9ESUZJQ0FUT1JfU0VMRUNUT1IpO1xyXG5cclxudmFyIG5vdGlmaWNhdGlvbnNfbGlzdCA9ICQoTk9USUZJQ0FUSU9OU19MSVNUX1NFTEVDVE9SKTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCBDSEFUX0NBU0g7IGkrKykge1xyXG4gIHZhciBjdXJyZW50X2VsZW1lbnQgPSAkKFwiPGxpPlwiKTtcclxuICBjdXJyZW50X2VsZW1lbnQuYXR0cignZGF0YS1uYW1lJywgJ25vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyBpKTtcclxuICBjdXJyZW50X2VsZW1lbnQuYXR0cignY2xhc3MnLCAnbm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnQnKTtcclxuICBub3RpZmljYXRpb25zX2xpc3QuYXBwZW5kKGN1cnJlbnRfZWxlbWVudCk7XHJcbn1cclxuXHJcbnZhciBib2FyZF9zaXplX2lucHV0ID0gJChCT0FSRF9TSVpFX0lOUFVUX1NFTEVDVE9SKTtcclxuXHJcbnZhciBzYXZlX25hbWVfaW5wdXQgPSAkKFNBVkVfTkFNRV9JTlBVVF9TRUxFQ1RPUik7XHJcblxyXG52YXIgbm90aWZpY2F0aW9uc19jb250YWluZXIgPSAkKE5PVElGSUNBVElPTlNfQ09OVEFORVJfU0VMRUNUT1IpO1xyXG5cclxudmFyIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lciA9ICQoQ0hBUkFDVEVSX0lORk9fQ09OVEFORVJfU0VMRUNUT1IpO1xyXG5cclxudmFyIHdlYXBvbl9pbmZvX2NvbnRhaW5lciA9ICQoV0VBUE9OX0lORk9fQ09OVEFORVJfU0VMRUNUT1IpO1xyXG53ZWFwb25faW5mb19jb250YWluZXIuaGlkZSgpO1xyXG5cclxudmFyIGluaXRpYXRpdmVfb3JkZXJfY29udGFpbmVyID0gJChJTklUSUFUSVZFX09SREVSX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciBza2lsbF9tb2RhbCA9ICQoU0tJTExfTU9EQUxfU0VMRUNUT1IpO1xyXG5cclxudmFyIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lciA9ICQoU0tJTExfREVTQ1JJUFRJT05fQ09OVEFJTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciBza2lsbF9tb2RhbF9jb250ZW50ID0gJChTS0lMTF9NT0RBTF9DT05URU5UX1NFTEVDVE9SKTtcclxuXHJcbnZhciBuZXh0X3BhZ2VfYnV0dG9uX2NvbnRhaW5lciA9ICQoTkVYVF9QQUdFX0JVVFRPTl9DT05UQUlORVJfU0VMRUNUT1IpO1xyXG5cclxudmFyIHNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsLW1vZGFsLWNsb3NlXCIpO1xyXG5cclxuc3Bhbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgaGlkZV9tb2RhbCgpO1xyXG59XHJcblxyXG5zcGFuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG53aW5kb3cub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PSBza2lsbF9tb2RhbC5hdHRyKCdpZCcpKSB7XHJcbiAgICBoaWRlX21vZGFsKCk7XHJcbiAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5vbmtleWRvd24gPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGU7XHJcbiAgICAvLyB3XHJcbiAgICBpZihrZXlDb2RlID09IDg3KSB7XHJcbiAgICAgICAgd19vbmNsaWNrKClcclxuICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PSA2NSkgeyAvLyBhXHJcbiAgICAgIGFfb25jbGljaygpXHJcbiAgICB9XHJcbn07XHJcblxyXG5zZXRJbnRlcnZhbChyZWNvbm5lY3QsIDE1KjEwMDApXHJcbiIsImxldCBzb2NrZXQ7XHJcbmxldCBzZXJ2ZXJfYWRkcmVzcztcclxubGV0IG9uTWVzc2FnZUZ1bmN0aW9uO1xyXG5cclxuZnVuY3Rpb24gaW5pdCh1cmwpIHtcclxuICBzZXJ2ZXJfYWRkcmVzcyA9IHVybDtcclxuICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybCk7XHJcbiAgY29uc29sZS5sb2coJ2Nvbm5lY3RpbmcuLicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1JlYWR5KCkge1xyXG4gIHJldHVybiBzb2NrZXQucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU5cclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJPcGVuSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBzb2NrZXQub25vcGVuID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ29wZW4nKTtcclxuICAgIGhhbmRsZXJGdW5jdGlvbigpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XHJcbiAgb25NZXNzYWdlRnVuY3Rpb24gPSBoYW5kbGVyRnVuY3Rpb247XHJcbiAgc29ja2V0Lm9ubWVzc2FnZSA9IChlKSA9PiB7XHJcbiAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuICAgIGhhbmRsZXJGdW5jdGlvbihkYXRhKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyRGVmYXVsdCgpIHtcclxuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgb25NZXNzYWdlRnVuY3Rpb24oZGF0YSk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UocGF5bG9hZCkge1xyXG4gIGlmIChzb2NrZXQucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4pIHtcclxuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaW5pdChzZXJ2ZXJfYWRkcmVzcyk7XHJcbiAgICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKG9uTWVzc2FnZUZ1bmN0aW9uKTtcclxuICAgIGlmIChzb2NrZXQucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4pIHtcclxuICAgICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ05vdCBzZW5kLCBidXQgcmVjb25uZWN0ZWQnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG4gIHJlZ2lzdGVyT3BlbkhhbmRsZXIsXHJcbiAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcixcclxuICBzZW5kTWVzc2FnZSxcclxuICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyRGVmYXVsdCxcclxuICBpc1JlYWR5XHJcbn1cclxuIl19
