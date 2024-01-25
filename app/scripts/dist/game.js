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
var INITIATIVE_DROPBOX_CONTAINER_SELECTOR = '[data-name="initiative-order-dropbox-container"]';

var SHOW_BOARD_CREATION_GROUP_BUTTON_SELECTOR = '[data-name="show_board_creation_group_button"]';
var SHOW_BOARD_EDIT_GROUP_BUTTON_SELECTOR = '[data-name="show_board_edit_group_button"]';
var SHOW_BATTLE_CONTROL_GROUP_BUTTON_SELECTOR = '[data-name="show_battle_control_group_button"]';
var CREATE_BOARD_BUTTON_SELECTOR = '[data-name="create_board_button"]';
var SAVE_BOARD_BUTTON_SELECTOR = '[data-name="save_board_button"]';
var LOAD_BOARD_BUTTON_SELECTOR = '[data-name="load_board_button"]';
var ROLL_INITIATIVE_BUTTON_SELECTOR = '[data-name="roll_initiative_button"]';
var RESET_INITIATIVE_BUTTON_SELECTOR = '[data-name="reset_initiative_button"]';
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

var BOARD_CREATION_GROUP_SELECTOR = '[data-group-name="board_creation_group"]';
var BOARD_EDIT_GROUP_SELECTOR = '[data-group-name="board_edit_group"]';
var BATTLE_CONTROL_GROUP_SELECTOR = '[data-group-name="battle_control_group"]';

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

var initiative_order_array = [];

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
var DROPBOX_IMAGE = "./images/basket.jpg";

var MAX_ZONES = 50;
var CHAT_CASH = 100;

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

var gas_bomb_base_threshold = 10;
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
var invisibility_detection_threshold = 10;

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

var computer_interaction_radius = 1;
var hacking_critical_fail_threshold = 10;
var hacking_success_threshold = 16;
var hacking_critical_success_threshold = 25;

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
var game_state = { board_state: [], fog_state: [], zone_state: [], size: 0, search_modificator_state: [], terrain_effects: [], battle_mod: 0, obstacle_extra_info: [],
  landmines: { positions: [], knowers: [] } };
var character_state = CHARACTER_STATE_CONSTANT;

var gm_control_mod = 0; // normal mode

// in_process: 0 = nothing, 1 = move, 2 = attack, 3 = skill
var character_chosen = { in_process: 0, char_id: 0, char_position: 0, weapon_id: 0, skill_id: 0, cell: 0 };
var dragged = null;

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
  if (!game_state.hasOwnProperty("obstacle_extra_info")) {
    game_state.obstacle_extra_info = [];
    for (var i = 0; i < game_state.size * game_state.size; i++) {
      game_state.obstacle_extra_info[i] = {};
    }
  }
  clear_containers();

  var board_container = document.getElementById("board-container");
  board_container.innerHTML = "";
  var board = document.createElement("table");
  board.className = "board";

  for (var _i = 0; _i < game_state.size; _i++) {
    var row = document.createElement("tr");
    row.className = "board_row";
    for (var j = 0; j < game_state.size; j++) {
      var button = document.createElement("IMG");
      var cell_id = _i * game_state.size + j;
      button.id = "cell_" + cell_id;
      button.row = _i;
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
        } else if (event.altKey) {
          alt_onclick(index);
        } else {
          no_shift_onclick(my_role, gm_control_mod, game_state, character_chosen.in_process, cell, index);
        }
      };
      button.draggable = true;
      button.ondragover = function (event) {
        event.preventDefault();
      };
      button.ondragstart = function (event) {
        dragged = event.target;
        var cell = dragged;
        var index = cell.row * game_state.size + cell.column;
        var character_number = game_state.board_state[index];
        if (character_number > 0 && (my_role == "gm" || character_state.visibility[character_number] == 1) && (character_state.invisibility[character_number] == 'all' || character_state.invisibility[character_number] == my_name) && (my_role == "gm" || game_state.fog_state[index] == 0)) {
          choose_character_to_move(index, cell, false);
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

function alt_onclick(index) {
  if (my_role == 'gm') {
    delete_object_command(index);
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
        attack_obstacle(index, cell);
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
  var toSend = {};
  toSend.command = 'update_fog';
  var index_list = [];
  index_list.push(index);
  toSend.index_list = index_list;
  toSend.room_number = my_room;
  if (game_state.fog_state[index] == 1) {
    toSend.update_type = 'remove';
  } else {
    toSend.update_type = 'add';
  }
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
    for (var _i2 = 0; _i2 < game_state.size * game_state.size; _i2++) {
      if (game_state.fog_state[_i2] == 1) {
        var current_cell = document.getElementById("cell_" + _i2);
        current_cell.src = get_object_picture(game_state.board_state[_i2]);
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

    for (var _i3 = 0; _i3 < game_state.size * game_state.size; _i3++) {
      var current_zone_text = document.getElementById("zone_text_" + _i3);
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
  var index_list = [];
  for (var i = 0; i < game_state.size * game_state.size; i++) {
    if (game_state.zone_state[i] == current_zone) {
      index_list.push(i);
    }
  }
  toSend.index_list = index_list;
  _wsClient2.default.sendMessage(toSend);
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
    current_point.x += x_step;
    current_point.y += y_step;

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

    safety_iter = safety_iter + 1;
    if (safety_iter > 50) {
      break;
    }
  }
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

function obstacle_number_to_board_number(obstacle_number) {
  return -1 * (obstacle_number + 1);
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

// Move related functions

function setup_move_send_object(from_index, to_index, character_number, distance) {
  var toSend = {};
  toSend.command = 'move_character';
  toSend.from_index = from_index;
  toSend.to_index = to_index;
  toSend.character_number = character_number;
  toSend.character_avatar = character_detailed_info[character_number].avatar;
  toSend.room_number = my_room;
  toSend.distance = distance;
  toSend.left_shield = 0;
  toSend.mines_exploded = [];
  toSend.mines_damage = 0;
  toSend.invisibility_ended_id = [];
  return toSend;
}

function updateMoveForceFieldStatus(chosen_character_index, to_index, toSend) {
  if (character_state.special_effects[chosen_character_index].hasOwnProperty("force_field_target")) {
    var shield_index = character_state.special_effects[chosen_character_index].force_field_target.shield_index;
    if (!game_state.terrain_effects[shield_index].cells_protected.includes(to_index)) {
      // покинул зону защиты
      toSend.left_shield = 1;
      toSend.shield_index = shield_index;
    }
  }
  return toSend;
}

function updateMoveOwnInvisibility(chosen_character_index, to_index, toSend, immediate_nbh, extended_nbh) {
  if (character_state.invisibility[chosen_character_index] != "all") {
    //user is invisible
    for (var i = 0; i < extended_nbh.length; i++) {
      var current_cell = extended_nbh[i];
      var object_number = game_state.board_state[current_cell];
      if (object_number > 0 && object_number != chosen_character_index) {
        // there are characters there
        if (immediate_nbh.includes(current_cell)) {
          toSend.invisibility_ended_id.push(chosen_character_index);
          break;
        } else {
          var roll = roll_x(20) + parseInt(character_detailed_info[object_number].intelligence);
          if (roll >= invisibility_detection_threshold) {
            toSend.invisibility_ended_id.push(chosen_character_index);
            break;
          }
        }
      }
    }
  }
  return toSend;
}

function updateMoveOthersInvisibility(chosen_character_index, to_index, toSend, immediate_nbh, extended_nbh) {
  for (var i = 0; i < extended_nbh.length; i++) {
    var current_cell = extended_nbh[i];
    var object_number = game_state.board_state[current_cell];
    if (object_number > 0 && object_number != chosen_character_index) {
      // there are characters there
      if (character_state.invisibility[object_number] != "all") {
        if (immediate_nbh.includes(current_cell)) {
          toSend.invisibility_ended_id.push(object_number);
        } else {
          var roll = roll_x(20) + parseInt(character_detailed_info[chosen_character_index].intelligence);
          if (roll >= invisibility_detection_threshold) {
            toSend.invisibility_ended_id.push(object_number);
          }
        }
      }
    }
  }
  return toSend;
}

function updateMoveLandminesExploded(chosen_character_index, to_index, toSend, immediate_nbh) {

  for (var i = 0; i < immediate_nbh.length; i++) {
    var current_cell = immediate_nbh[i];
    if (game_state.landmines.positions.includes(current_cell)) {
      toSend.mines_exploded.push(current_cell);
      toSend.mines_damage = toSend.mines_damage + roll_x(mines_1_distance_damage);
    }
  }
  return toSend;
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
      var toSend = setup_move_send_object(chosen_index, to_index, chosen_character_index, distance);

      var immediate_nbh = index_in_radius(to_index, 1.6);
      var extended_invisibility_nbh = index_in_radius(to_index, invisibility_detection_radius);

      toSend = updateMoveForceFieldStatus(chosen_character_index, to_index, toSend);
      toSend = updateMoveOwnInvisibility(chosen_character_index, to_index, toSend, immediate_nbh, extended_invisibility_nbh);
      toSend = updateMoveOthersInvisibility(chosen_character_index, to_index, toSend, immediate_nbh, extended_invisibility_nbh);
      toSend = updateMoveLandminesExploded(chosen_character_index, to_index, toSend, immediate_nbh);

      clear_containers();
      _wsClient2.default.sendMessage(toSend);

      character_chosen.char_position = to_index;
      var to_cell = document.getElementById('cell_' + to_index);
      character_chosen.cell = to_cell;
    } else {
      alert("В бою нужно двигаться поступательно (1-1.5 клетки)");
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
  toSend.command = 'delete_object';
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
    avatar_display.classList.add("avatar");

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

        weapon_info_container.html("");
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
          choose_character_to_move(character_picked.index, character_picked.cell, true);
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
        weapon_info_container.html("");
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
        weapon_info_container.html("");
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
        weapon_info_container.html("");
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
  toSend.command = 'delete_object';
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

function choose_character_to_move(index, cell, showVisual) {
  character_chosen.in_process = 1;
  character_chosen.char_position = index;
  character_chosen.char_id = game_state.board_state[index];
  if (showVisual) {
    cell.src = "./images/loading.webp";
  }
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
          skill_description_container.html('');
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

        skill_icon.on('mouseout', function (event) {
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

function unhover_character(character_number) {
  var position = character_state.position[character_number];
  var board_cell = document.getElementById('cell_' + position);
  board_cell.style.transform = "";
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

// initiative related functions

function resetInitiative() {
  initiative_order_array = [];
  initiative_order_container.html('');
}

function construct_initiative_image(character_number, i) {
  var character = character_detailed_info[character_number];
  var query_string = '<img> id="initiative_image_' + i + '"';
  var img = $(query_string);
  img.attr('src', character.avatar);
  img.attr('height', '50px');
  img.attr('width', '50px');
  img.attr('array_position', i);
  img.addClass("initiative_image");
  img.on("mouseenter", function () {
    var isVisible = character_state.invisibility[character_number] == 'all' || character_state.invisibility[character_number] == my_name;
    var position = character_state.position[character_number];
    var isNotFogged = game_state.fog_state[position] == 0 || my_role == 'gm';
    if (isVisible && isNotFogged) {
      var cell = document.getElementById('cell_' + position);
      cell.style.transform = "scale(1.2)";
    }
  });
  img.on("mouseleave", function () {
    unhover_character(character_number);
  });
  img.click(function () {
    var position = character_state.position[character_number];
    var cell = document.getElementById('cell_' + position);
    //select_character(position, cell)
    no_shift_onclick(my_role, gm_control_mod, game_state, character_chosen.in_process, cell, position);
  });
  img.attr('draggable', true);
  img.on("dragstart", function (event) {
    dragged = event.target;
  });
  return img;
}

function display_initiative_line() {
  initiative_order_container.html("");
  for (var i = 0; i < initiative_order_array.length; i++) {
    var img = construct_initiative_image(initiative_order_array[i], i);
    img.appendTo(initiative_order_container);
  }
}

// roll something

function roll_x(x) {
  return Math.floor(Math.random() * x) + 1;
}

function rollSearch(intelligence, mod) {
  return intelligence + roll_x(20) + mod;
}

function rollInitiative() {
  for (var i = 0; i < initiative_order_array.length; i++) {
    // retrieve that character's agility
    var character_number = initiative_order_array[i];
    var character = character_detailed_info[character_number];
    var agility = character.agility;

    // roll initiative and add agility modificator
    var initiative = computeInitiative(parseInt(agility));
    character_state.initiative[character_number] = initiative;
  }
  initiative_order_array.sort(compare_initiative);
  var toSend = {};
  toSend.command = 'roll_initiative';
  toSend.room_number = my_room;
  toSend.initiative_state = character_state.initiative;
  toSend.initiative_order_array = initiative_order_array;
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

function attack_obstacle(index, cell) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  var weapon = weapon_detailed_info[character_chosen.weapon_id];

  if (isInRange(index, user_position, weapon.range)) {
    var target_obstacle_number = Math.abs(game_state.board_state[index]);
    var target_obstacle = obstacle_detailed_info[target_obstacle_number];

    var accumulated_cover = get_accumulated_cover(user_position, index);
    var cover_modifier = cover_mod(accumulated_cover);

    var toSend = {};
    toSend.command = 'attack_obstacle';
    toSend.room_number = my_room;
    toSend.attacker_id = user_character_number;
    toSend.attacker_position = user_position;
    toSend.target_id = target_obstacle_number;
    toSend.user_invisibility_ended = 0;
    toSend.attack_type = weapon.type;
    toSend.cover_level = cover_modifier.cover_level;
    toSend.target_position = index;

    if (weapon.hasOwnProperty("subtype") && weapon.subtype == "PP") {
      toSend.quick_attack_ready = true;
    }

    if (character_state.invisibility[user_character_number] != "all" && weapon.type != "throwing") {
      toSend.user_invisibility_ended = 1;
    }

    if (cover_modifier.isPossible) {
      if (target_obstacle.hasOwnProperty("toughness")) {
        var attack_roll = roll_x(20);
        var damage = 0;
        switch (attack_roll) {
          case 19:
            damage = damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, user_character_number);
            break;
          case 20:
            damage = damage = weapon.damage[1] * weapon.damage[0];
            damage = weapon_damage_bonus(damage, weapon, user_character_number);
            damage *= 2;
            break;
          default:
            for (var i = 0; i < weapon.damage[0]; i++) {
              damage += roll_x(weapon.damage[1]);
            }
            damage = weapon_damage_bonus(damage, weapon, user_character_number);
        }
        toSend.damage = damage;
        if (damage >= target_obstacle.toughness) {
          toSend.outcome = "destroyed";
        } else {
          toSend.outcome = "untouched";
        }
      } else {
        toSend.damage = 0;
        toSend.outcome = "untouched";
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
            for (var _i4 = 0; _i4 < weapon.damage[0]; _i4++) {
              damage = damage + roll_x(weapon.damage[1]);
            }
            damage = weapon_damage_bonus(damage, weapon, character_number);
        }
      }
    }
  } else {
    if (attack_roll < 19) {
      for (var _i5 = 0; _i5 < weapon.damage[0]; _i5++) {
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
      if (character_state.bonus_action[character_number] > 0) {
        if (!character_state.special_effects[character_number].hasOwnProperty("charge_user")) {
          var toSend = {};
          toSend.command = 'skill';
          toSend.room_number = my_room;
          toSend.skill_index = skill_index;
          toSend.user_index = character_number;
          _wsClient2.default.sendMessage(toSend);
        } else {
          alert("Вы уже совершили максимальное число рывков в этот ход");
        }
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
      // Взаимодействовать
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
      interact(index, cell);
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
    toSend.threshold = compute_gas_bomb_threshold(character);
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
    toSend.interaction_type = 'diffuse_landmine';

    if (game_state.landmines.positions.includes(index)) {
      var roll = roll_x(20) + parseInt(character.intelligence);
      if (roll > landmine_diffuse_threshold) {
        toSend.outcome = "success";
      } else {
        toSend.outcome = "fail";
      }
    } else {
      toSend.outcome = "empty";
    }
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Слишком далеко для взаимодействия");
  }
}

function hacking_bonus(character_number) {
  var character = character_detailed_info[character_number];
  var bonus = parseInt(character.intelligence);
  if (character.special_type == "engineer") {
    bonus *= 2;
  }
  return bonus;
}

function computer_hacking(index, obstacle_number) {
  var user_position = character_chosen.char_position;
  var user_character_number = character_chosen.char_id;
  if (isInRange(index, user_position, computer_interaction_radius)) {
    var hack_stage = 0;
    var hack_fails = 0;
    var info_object = game_state.obstacle_extra_info[index];
    if (info_object.hasOwnProperty("hack_stage")) {
      hack_stage = info_object.hack_stage;
    }
    if (info_object.hasOwnProperty("hack_fails")) {
      hack_fails = info_object.hack_fails;
    }
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id;
    toSend.room_number = my_room;
    toSend.user_index = user_character_number;
    toSend.position = index;
    toSend.interaction_type = 'hackable_computer';

    if (hack_stage < 3 && hack_fails < 3) {
      // there is point to roll
      var hack_roll = roll_x(20);
      if (hack_roll == 20) {
        // crit
        toSend.outcome = 'hacked';
      } else if (hack_roll == 1) {
        // anticrit
        toSend.outcome = 'failed';
      } else {
        // normal
        hack_roll += hacking_bonus(user_character_number);
        if (hack_roll < hacking_critical_fail_threshold) {
          toSend.outcome = 'failed';
        } else if (hack_roll < hacking_success_threshold) {
          hack_fails += 1;
          if (hack_fails == 3) {
            toSend.outcome = 'failed';
          } else {
            toSend.outcome = 'one_fail';
          }
        } else if (hack_roll < hacking_critical_success_threshold) {
          hack_stage += 1;
          if (hack_stage == 3) {
            toSend.outcome = 'hacked';
          } else {
            toSend.outcome = 'one_success';
          }
        } else {
          toSend.outcome = 'hacked';
        }
      }
    } else if (hack_stage >= 3) {
      // already hacked
      toSend.outcome = 'already_hacked';
    } else {
      toSend.outcome = 'already_failed';
    }
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Взлом компьютера должен осуществляться с расстояния 1 клетки");
  }
}

function interact(index, cell) {
  var object_number = game_state.board_state[index];
  if (object_number == 0) {
    // empty, so diffuse landmine mod
    diffuse_landmine(index, cell);
  } else if (object_number < 0) {
    // obstacle interaction
    var obstacle_number = Math.abs(object_number);
    var obstacle = obstacle_detailed_info[obstacle_number];
    if (obstacle.hasOwnProperty("hackable_computer")) {
      computer_hacking(index, obstacle_number);
    }
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
      for (var _i6 = 0; _i6 < 14; _i6++) {
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
function apply_bomb(position, radius, threshold) {
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
        if (character_state.special_effects[target_character_number].gas_bomb_poison.threshold < threshold) {
          character_state.special_effects[target_character_number].gas_bomb_poison.threshold = threshold;
        }
      } else {
        var gas_bomb_poison_object = {};
        gas_bomb_poison_object.poison_level = 1;
        gas_bomb_poison_object.threshold = threshold;
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

// computations related to skills
function compute_gas_bomb_threshold(character) {
  var bonus = Math.floor(parseInt(character.intelligence) / 2);
  return bonus + gas_bomb_base_threshold;
}

// new round actions

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

function apply_terrain_effects(data) {
  for (var i = 0; i < game_state.terrain_effects.length; i++) {
    if (game_state.terrain_effects[i] !== null && game_state.terrain_effects[i] !== undefined) {
      switch (game_state.terrain_effects[i].type) {
        case "gas_bomb":
          var position = game_state.terrain_effects[i].position;
          var radius = game_state.terrain_effects[i].radius;
          apply_bomb(position, radius, game_state.terrain_effects[i].threshold);
          if (radius >= 4) {
            if (my_role == "gm") {
              if (game_state.board_state[position] == obstacle_number_to_board_number(gas_bomb_obstacle)) {
                delete_object_command(position);
              }
            }
            game_state.terrain_effects[i] = null;
          } else {
            game_state.terrain_effects[i].radius += 1;
          }
          break;
        case "calingalator":
          var position = game_state.terrain_effects[i].position;
          var radius = game_state.terrain_effects[i].radius;
          apply_calingalator(position, radius, game_state.terrain_effects[i].flat_heal, game_state.terrain_effects[i].roll_heal, data.calingalator_heal_roll_list, data.calingalator_coin_flip);
          game_state.terrain_effects[i].duration = game_state.terrain_effects[i].duration - 1;
          if (game_state.terrain_effects[i].duration == 0) {
            if (my_role == "gm") {
              if (game_state.board_state[position] == obstacle_number_to_board_number(calingalator_obstacle)) {
                delete_object_command(position);
              }
            }
            game_state.terrain_effects[i] = null;
          }
          break;
        default:
          console.log("Messed up resolving terrain effects");
          console.log(game_state.terrain_effects[i].type);
      }
    }
  }
}

function move_and_actions_replenish(character, index) {
  character_state.can_evade[index] = 1;
  character_state.has_moved[index] = 0;
  assign_moves(index);
  character_state.bonus_action[index] = bonus_action_map[character.agility];
  character_state.main_action[index] = main_action_map[character.agility];
}

function apply_tiredness(character, i) {
  if (character_state.special_effects[i].hasOwnProperty("tired")) {
    // Убрать бонусы от усталости прошлого хода (чтобы когда будут накаладываться новые не штрафовать дважды)
    character_state.universal_bonus[i] = character_state.universal_bonus[i] - character_state.special_effects[i].tired.bonus;
  }

  if (character_state.stamina[i] < stamina_values[character.stamina] * 0.67) {
    if (character_state.stamina[i] < stamina_values[character.stamina] * 0.34) {
      if (character_state.stamina[i] <= 0) {
        // 3я стадия
        var tired_object = {};
        tired_object.bonus = -3;
        tired_object.stage = 3;
        character_state.special_effects[i].tired = tired_object;
        character_state.universal_bonus[i] = character_state.universal_bonus[i] - 3;
        character_state.move_action[i] = parseFloat(character_state.move_action[i] * 0.25);
        if (character_state.main_action[i] == 1 && character_state.bonus_action[i] == 1) {
          character_state.bonus_action[i] = 0;
        } else {
          character_state.bonus_action[i] = 1;
          character_state.main_action[i] = 1;
        }
      } else {
        // 2я стадия
        var tired_object = {};
        tired_object.bonus = -2;
        tired_object.stage = 2;
        character_state.special_effects[i].tired = tired_object;
        character_state.universal_bonus[i] = character_state.universal_bonus[i] - 2;
        character_state.move_action[i] = parseFloat(character_state.move_action[i] * 0.5);
      }
    } else {
      // 1я стадия
      var tired_object = {};
      tired_object.bonus = -1;
      tired_object.stage = 1;
      character_state.special_effects[i].tired = tired_object;
      character_state.universal_bonus[i] = character_state.universal_bonus[i] - 1;
      character_state.move_action[i] = parseFloat(character_state.move_action[i] * 0.75);
    }
  } else if (character_state.special_effects[i].hasOwnProperty("tired")) {
    // не устал -> убрать устлалость если была
    delete character_state.special_effects[i].tired;
  }
}

function check_default_cooldowns(i) {
  check_cooldown(i, "light_sound_bomb_user", "");
  check_cooldown(i, "action_splash", "");
  check_cooldown(i, "safety_service_user", "");
  check_cooldown(i, "calingalator_user", "");
  check_cooldown(i, "gas_bomb_user", "");
  check_cooldown(i, "acid_bomb_user", "");
  check_cooldown(i, "force_field_user", "");
  check_cooldown(i, "charge_user", "");
  check_cooldown(i, "pre_charge", "");
  check_cooldown(i, "cut_limb_user", "");
  check_cooldown(i, "adrenaline_user", "");
  check_cooldown(i, "poisonous_adrenaline_user", "");
  check_cooldown(i, "hook_user", "");
  check_cooldown(i, "punishing_strike_user", "");
}

function check_all_round_effects(i, character, data) {
  safety_service_target_round_effect(i);
  belvet_buff_target_round_effect(i);
  hook_target_round_effect(i);
  calingalator_target_round_effect(i);
  pich_pich_user_round_effect(i);
  pich_pich_target_round_effect(i);
  aim_round_effect(i);
  adrenaline_target_round_effect(i);
  poisonous_adrenaline_target_round_effect(i);
  shocked_round_effect(i);
  cut_limb_round_effect(i, character);
  healed_round_effect(i);
  blind_round_effect(i, character);
  Marcus_stacks_round_effect(i);
  shield_up_round_effect(i, character);
  big_bro_round_effect(i, character);
  tobacco_strike_round_effect(i);
  acid_bomb_poison_round_effect(i, character);
  gas_bomb_poison_round_effect(i, character, data);
  meleed_round_effect(i);
  sniper_passive_round_effect(i, character);
}

function safety_service_target_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("safety_service_target")) {
    if (character_state.special_effects[i].safety_service_target.duration == 0) {
      character_state.defensive_advantage[i] = character_state.defensive_advantage[i] - safety_service_defensive_advantage;
      character_state.evade_bonus[i] = character_state.evade_bonus[i] - safety_service_evade_bonus;
      delete character_state.special_effects[i].safety_service_target;
    } else {
      character_state.special_effects[i].safety_service_target.duration = character_state.special_effects[i].safety_service_target.duration - 1;
    }
  }
}

function belvet_buff_target_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("belvet_buff_target")) {
    if (character_state.special_effects[i].belvet_buff_target.duration == 0) {
      change_character_property("attack_bonus", i, -1 * character_state.special_effects[i].belvet_buff_target.attack_bonus);
      change_character_property("melee_advantage", i, -1 * character_state.special_effects[i].belvet_buff_target.melee_advantage);
      change_character_property("ranged_advantage", i, -1 * character_state.special_effects[i].belvet_buff_target.ranged_advantage);
      delete character_state.special_effects[i].belvet_buff_target;
    } else {
      character_state.special_effects[i].belvet_buff_target.duration = character_state.special_effects[i].belvet_buff_target.duration - 1;
    }
  }
}

function hook_target_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("hook_target")) {
    if (character_state.special_effects[i].hook_target.duration == 0) {
      change_character_property("defensive_advantage", i, -1 * character_state.special_effects[i].hook_target.defensive_advantage);
      delete character_state.special_effects[i].hook_target;
    } else {
      character_state.special_effects[i].hook_target.duration -= 1;
    }
  }
}

function calingalator_target_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("calingalator_target")) {
    if (character_state.special_effects[i].calingalator_target.duration == 0) {
      var reverse_penalty = character_state.special_effects[i].calingalator_target.penalty * -1;
      change_character_property("attack_bonus", i, reverse_penalty);
      if (character_state.special_effects[i].calingalator_target.stage == 3) {
        change_character_property("melee_advantage", i, 1);
        change_character_property("ranged_advantage", i, 1);
      } else if (character_state.special_effects[i].calingalator_target.stage == 4) {
        change_character_property("melee_advantage", i, -1);
        change_character_property("ranged_advantage", i, -1);
      }
      delete character_state.special_effects[i].calingalator_target;
    } else {
      character_state.special_effects[i].calingalator_target.duration = character_state.special_effects[i].calingalator_target.duration - 1;
    }
  }
}

function pich_pich_user_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("pich_pich_user")) {
    if (character_state.special_effects[i].pich_pich_user.cooldown == 0) {
      delete character_state.special_effects[i].pich_pich_user;
    } else {
      if (character_state.special_effects[i].pich_pich_user.cooldown == pich_pich_cooldown) {
        character_state.bonus_action[i] = 0;
      }
      character_state.special_effects[i].pich_pich_user.cooldown = character_state.special_effects[i].pich_pich_user.cooldown - 1;
    }
  }
}

function pich_pich_target_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("pich_pich_target")) {
    var extra_actions = character_state.special_effects[i].pich_pich_target.extra_actions;
    while (extra_actions > 0) {
      if (extra_actions % 2 == 0) {
        character_state.move_action[i] = character_state.move_action[i] + adrenaline_move_increase;
      } else {
        character_state.main_action[i] = character_state.main_action[i] + 1;
      }
      extra_actions = extra_actions - 1;
    }
    delete character_state.special_effects[i].pich_pich_target;
  }
}

function aim_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("aim")) {
    delete character_state.special_effects[i].aim;
  }
}

function adrenaline_target_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("adrenaline_target")) {
    var minus_actions = character_state.special_effects[i].adrenaline_target.minus_actions;
    while (minus_actions > 0) {
      if (minus_actions % 2 == 0) {
        character_state.move_action[i] = character_state.move_action[i] - adrenaline_move_increase;
      } else {
        character_state.main_action[i] = character_state.main_action[i] - 1;
      }
      minus_actions = minus_actions - 1;
    }
    delete character_state.special_effects[i].adrenaline_target;
  }
}

function poisonous_adrenaline_target_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("poisonous_adrenaline_target")) {
    var turn = character_state.special_effects[i].poisonous_adrenaline_target.turn;
    character_state.special_effects[i].poisonous_adrenaline_target.turn = turn + 1;
    var extra_actions = character_state.special_effects[i].poisonous_adrenaline_target.extra_actions[turn];
    while (extra_actions > 0) {
      if (extra_actions % 2 == 0) {
        character_state.move_action[i] = character_state.move_action[i] + adrenaline_move_increase;
      } else {
        character_state.main_action[i] = character_state.main_action[i] + 1;
      }
      extra_actions = extra_actions - 1;
    }
    if (turn + 1 == poisonous_adrenaline_duration) {
      var character = character_detailed_info[i];
      var max_HP = HP_values[character.stamina];
      var max_stamina = stamina_values[character.stamina];
      var HP_cost = poisonous_adrenaline_flat_HP + parseInt(parseFloat(max_HP) * poisonous_adrenaline_percent_HP);
      var stamina_cost = poisonous_adrenaline_flat_stamina + parseInt(parseFloat(max_stamina) * poisonous_adrenaline_percent_stamina);
      character_state.HP[i] = character_state.HP[i] - HP_cost;
      character_state.stamina[i] = character_state.stamina[i] - stamina_cost;
      delete character_state.special_effects[i].poisonous_adrenaline_target;
      var message = "Адреналин в крови " + character.name + " заканчивается, наступает похмелье (" + HP_cost + " хп и " + stamina_cost + " выносливости)";
      pushToList(message);
    }
  }
}

function shocked_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("shocked")) {
    if (character_state.special_effects[i].shocked.cooldown == 0) {
      character_state.defensive_advantage[i] = character_state.defensive_advantage[i] + 1;
      delete character_state.special_effects[i].shocked;
    } else {
      character_state.special_effects[i].shocked.cooldown = character_state.special_effects[i].shocked.cooldown - 1;
    }
  }
}

function cut_limb_round_effect(i, character) {
  if (character_state.special_effects[i].hasOwnProperty("cut_limb")) {
    if (character_state.special_effects[i].cut_limb.duration == 0) {
      delete character_state.special_effects[i].cut_limb;
      var message = "Сухожилия " + character.name + " восстановились.";
      pushToList(message);
    } else {
      character_state.move_action[i] = -10;
      character_state.special_effects[i].cut_limb.duration = character_state.special_effects[i].cut_limb.duration - 1;
    }
  }
}

function healed_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("healed")) {
    if (character_state.special_effects[i].healed.cooldown > 0) {
      character_state.move_action[i] = character_state.move_action[i] / 2;
      character_state.main_action[i] = character_state.main_action[i] - 1;
      character_state.bonus_action[i] = character_state.bonus_action[i] - 1;
      character_state.special_effects[i].healed.cooldown = character_state.special_effects[i].healed.cooldown - 1;
    } else {
      delete character_state.special_effects[i].healed;
    }
  }
}

function blind_round_effect(i, character) {
  if (character_state.special_effects[i].hasOwnProperty("blind")) {
    if (character_state.special_effects[i].blind.cooldown > 0) {
      character_state.special_effects[i].blind.cooldown = character_state.special_effects[i].blind.cooldown - 1;
    } else {
      delete character_state.special_effects[i].blind;
      character_state.ranged_advantage[i] = character_state.ranged_advantage[i] + 2;
      character_state.melee_advantage[i] = character_state.melee_advantage[i] + 1;
      var message = "Зрение " + character.name + " восстановилось";
      pushToList(message);
    }
  }
}

function Marcus_stacks_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("Markus_stacks")) {
    character_state.special_effects[i].Markus_stacks = character_state.special_effects[i].Markus_stacks - 1;
    if (character_state.special_effects[i].Markus_stacks == 0) {
      delete character_state.special_effects[i].Markus_stacks;
    }
  }
}

function shield_up_round_effect(i, character) {
  if (character_state.special_effects[i].hasOwnProperty("shield_up")) {
    character_state.move_action[i] = Math.ceil(character_state.move_action[i] / 2);
    character_state.stamina[i] = character_state.stamina[i] - character_state.special_effects[i].shield_up.stamina_cost;
    var message = character.name + " продолжает держать щит (спасибо)";
    pushToList(message);
  }
}

function big_bro_round_effect(i, character) {
  if (character_state.special_effects[i].hasOwnProperty("big_bro")) {
    if (character_state.special_effects[i].big_bro.cooldown == 0) {
      character_state.bonus_KD[i] = character_state.bonus_KD[i] - character_state.special_effects[i].big_bro.bonus_KD;
      delete character_state.special_effects[i].big_bro;
      var message = character.name + " теряет защиту Большого Брата";
      pushToList(message);
    } else {
      character_state.special_effects[i].big_bro.cooldown = character_state.special_effects[i].big_bro.cooldown - 1;
    }
  }
}

function tobacco_strike_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("tobacco_strike")) {
    if (character_state.special_effects[i].tobacco_strike.cooldown == 0) {
      delete character_state.special_effects[i].tobacco_strike;
    } else {
      if (character_state.special_effects[i].tobacco_strike.cooldown == tobacco_strike_cooldown) {
        character_state.attack_bonus[i] = character_state.attack_bonus[i] - tobacco_strike_bonus;
      }
      character_state.special_effects[i].tobacco_strike.cooldown = character_state.special_effects[i].tobacco_strike.cooldown - 1;
    }
  }
}

function acid_bomb_poison_round_effect(i, character) {
  if (character_state.special_effects[i].hasOwnProperty("acid_bomb_poison")) {
    if (character_state.special_effects[i].acid_bomb_poison.duration == 0) {
      character_state.bonus_KD[i] = character_state.bonus_KD[i] + character_state.special_effects[i].acid_bomb_poison.bonus_KD;
      delete character_state.special_effects[i].acid_bomb_poison;
      var message = "Броня " + character.name + " наконец восстановилась";
      pushToList(message);
    } else {
      character_state.special_effects[i].acid_bomb_poison.duration = character_state.special_effects[i].acid_bomb_poison.duration - 1;
    }
  }
}

function gas_bomb_poison_round_effect(i, character, data) {
  if (character_state.special_effects[i].hasOwnProperty("gas_bomb_poison")) {
    var save_roll = data.save_roll_list[i];
    if (save_roll >= character_state.special_effects[i].gas_bomb_poison.threshold) {
      character_state.special_effects[i].gas_bomb_poison.poison_level = character_state.special_effects[i].gas_bomb_poison.poison_level - 1;
      var message = character.name + " успешно кидает спасбросок и уменьшает стадию отравления (теперь " + character_state.special_effects[i].gas_bomb_poison.poison_level + ")";
      pushToList(message);
    } else {
      var message = character.name + " проваливает спасбросок. Стадия отравления остается прежней (" + character_state.special_effects[i].gas_bomb_poison.poison_level + ")";
      pushToList(message);
    }

    var count = character_state.special_effects[i].gas_bomb_poison.poison_level;
    while (count > 0) {
      //character_state.move_action[i] = character_state.move_action[i] - gas_bomb_move_reduction
      if (count % 2 == 1) {
        character_state.main_action[i] = character_state.main_action[i] - 1;
      } else {
        character_state.bonus_action[i] = character_state.bonus_action[i] - 1;
      }
      count = count - 1;
    }

    if (character_state.special_effects[i].gas_bomb_poison.poison_level <= 0) {
      delete character_state.special_effects[i].gas_bomb_poison;
      var message = character.name + " больше не отравлен!";
      pushToList(message);
    }
  }
}

function meleed_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("meleed")) {
    if (character_state.special_effects[i].meleed.cooldown <= 0) {
      delete character_state.special_effects[i].meleed;
      character_state.ranged_advantage[i] = character_state.ranged_advantage[i] + 1;
    } else {
      character_state.special_effects[i].meleed.cooldown = character_state.special_effects[i].meleed.cooldown - 1;
    }
  }
}

function sniper_passive_round_effect(i, character) {
  if (character.special_type == 'sniper') {
    var effects_object = character_state.special_effects[i];
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
      character_state.attack_bonus[i] = character_state.attack_bonus[i] - current_attack_bonus + new_attack_bonus;
      character_state.damage_bonus[i] = character_state.damage_bonus[i] - current_damage_bonus + new_damage_bonus;
      character_state.special_effects[i].sniper_passive.attack_bonus = new_attack_bonus;
      character_state.special_effects[i].sniper_passive.damage_bonus = new_damage_bonus;
    } else {
      var sniper_passive_object = {};
      sniper_passive_object.attack_bonus = 0;
      sniper_passive_object.damage_bonus = 0;
      character_state.special_effects[i].sniper_passive = sniper_passive_object;
    }
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
    character_state: character_state,
    initiative_order_array: initiative_order_array
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
      choose_character_to_move(index, cell, true);
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

function showBoardCreationGroup() {
  var board_creation_group = $(BOARD_CREATION_GROUP_SELECTOR);
  if (show_board_creation_group_button.attr("mod") == "show") {
    show_board_creation_group_button.attr("mod", "hide");
    show_board_creation_group_button.html("Спрятать создание карты");
    board_creation_group.show();
  } else {
    show_board_creation_group_button.attr("mod", "show");
    show_board_creation_group_button.html("Показать создание карты");
    board_creation_group.hide();
  }
}

function showBoardEditGroup() {
  var board_edit_group = $(BOARD_EDIT_GROUP_SELECTOR);
  if (show_board_edit_group_button.attr("mod") == "show") {
    show_board_edit_group_button.attr("mod", "hide");
    show_board_edit_group_button.html("Спрятать контроль карты");
    board_edit_group.show();
  } else {
    show_board_edit_group_button.attr("mod", "show");
    show_board_edit_group_button.html("Показать контроль карты");
    board_edit_group.hide();
  }
}

function showBattleControlGroup() {
  var battle_control_group = $(BATTLE_CONTROL_GROUP_SELECTOR);
  if (show_battle_control_group_button.attr("mod") == "show") {
    show_battle_control_group_button.attr("mod", "hide");
    show_battle_control_group_button.html("Спрятать боевые настройки");
    battle_control_group.show();
  } else {
    show_battle_control_group_button.attr("mod", "show");
    show_battle_control_group_button.html("Показать боевые настройки");
    battle_control_group.hide();
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
        sync_button.show();
        show_board_creation_group_button.show();
        show_board_creation_group_button.attr("mod", "show");
        show_board_edit_group_button.show();
        show_board_edit_group_button.attr("mod", "show");
        show_battle_control_group_button.show();
        show_battle_control_group_button.attr("mod", "show");

        var dropbox_image = $("<img>");
        dropbox_image.attr('src', DROPBOX_IMAGE);
        dropbox_image.attr('height', '70px');
        dropbox_image.attr('width', '100px');
        dropbox_image.addClass("dropbox");

        dropbox_image.on("dragover", function (event) {
          event.preventDefault();
        });

        dropbox_image.on("drop", function (event) {
          var cell = dragged;
          if (cell.classList.contains("board_cell")) {
            undo_selection();
            var index = cell.row * game_state.size + cell.column;
            var character_number = game_state.board_state[index];
            initiative_order_array.push(character_number);

            var i = initiative_order_array.length - 1;
            var img = construct_initiative_image(character_number, i);
            img.appendTo(initiative_order_container);
          } else if (cell.classList.contains("initiative_image")) {
            var i = parseInt(cell.getAttribute("array_position"));
            for (var j = i + 1; j < initiative_order_array.length; j++) {
              //var selector = "#initiative_image_" + j;
              var initiative_image = $("[array_position=" + j + "]");
              var new_index = j - 1;
              initiative_image.attr('array_position', new_index);
              initiative_image.attr('id', "initiative_image_" + new_index);
            }
            var character_number = initiative_order_array[i];
            unhover_character(character_number);
            initiative_order_array.splice(i, 1);
            cell.remove();
          }
        });

        dropbox_image.appendTo(initiative_dropbox_container);

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

      for (var _i7 = 0; _i7 < saves_list.length; _i7++) {
        var current_option = $("<option>");
        current_option.text(saves_list[_i7]);
        current_option.val(saves_list[_i7]);
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
      game_state.obstacle_extra_info[data.cell_id] = {};
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

        for (var _i8 = 0; _i8 < data.invisibility_ended_id.length; _i8++) {
          var id = data.invisibility_ended_id[_i8];
          character_state.invisibility[id] = "all";

          var position = character_state.position[id];
          var to_cell = document.getElementById('cell_' + position);
          var avatar = get_object_picture(id);
          to_cell.src = avatar;
        }

        var character = character_detailed_info[data.character_number];

        if (!character.hasOwnProperty("landmine_immune")) {
          for (var _i9 = 0; _i9 < data.mines_exploded.length; _i9++) {
            var mine_position = data.mines_exploded[_i9];
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
    } else if (data.command == 'delete_object_response') {
      if (data.hasOwnProperty("character_number")) {
        clear_character(data.character_number);
      }
      if (game_state.board_state[data.index] < 0) {
        // is obstacle
        game_state.obstacle_extra_info[data.index] = {};
      }
      game_state.board_state[data.index] = 0;
      if (!(my_role == 'player' && game_state.fog_state[data.index] == 1)) {
        var cell = document.getElementById('cell_' + data.index);
        cell.src = EMPTY_CELL_PIC;
      }
    } else if (data.command == 'roll_initiative_response') {
      character_state.initiative = data.initiative_state;
      initiative_order_array = data.initiative_order_array;
      display_initiative_line();
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
      initiative_order_array = full_game_state.initiative_order_array;
      display_initiative_line();
    } else if (data.command == 'update_fog_response') {
      var index_list = data.index_list;
      var fog_state;
      if (data.update_type == 'remove') {
        fog_state = 0;
      } else {
        fog_state = 1;
      }

      for (var _i10 = 0; _i10 < index_list.length; _i10++) {
        var _index = index_list[_i10];
        var cell = document.getElementById('cell_' + _index);
        game_state.fog_state[_index] = fog_state;
        cell.src = fogOrPic(_index);
      }
    } else if (data.command == 'assign_zone_response') {
      var index_list = data.index_list;
      for (var _i11 = 0; _i11 < index_list.length; _i11++) {
        game_state.zone_state[index_list[_i11]] = data.zone_number;
        game_state.search_modificator_state[index_list[_i11]] = data.modificator;
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
          if (character.special_type != 'rogue' || character_state.special_effects[user_index].hasOwnProperty('pre_charge')) {
            var charge_user_object = {};
            charge_user_object.cooldown = 0;
            character_state.special_effects[user_index].charge_user = charge_user_object;
          } else {
            var pre_charge_object = {};
            pre_charge_object.cooldown = 0;
            character_state.special_effects[user_index].pre_charge = pre_charge_object;
          }

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

          apply_bomb(data.position, initial_radius, data.threshold);

          break;

        case 13:
          // светошумовая гранат
          var light_sound_bomb_user = {};
          light_sound_bomb_user.cooldown = light_sound_bomb_skill_cooldown;
          character_state.special_effects[user_index].light_sound_bomb_user = light_sound_bomb_user;

          for (var _i12 = 0; _i12 < data.outcome_list.length; _i12++) {
            var character_number = data.character_list[_i12];
            var character = character_detailed_info[character_number];
            if (data.outcome_list[_i12] == 0) {
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

          for (var _i13 = 0; _i13 < char_list.length; _i13++) {
            var character_number = char_list[_i13];
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
          // взаимодействовать

          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] -= 1;
          }
          character = character_detailed_info[user_index];

          if (data.interaction_type == "diffuse_landmine") {
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
          } else if (data.interaction_type == "hackable_computer") {
            var _index2 = data.position;
            switch (data.outcome) {
              case "already_hacked":
                var message = "Компьютер, который " + character.name + " пытался взломать, уже был успешно взломан, а информация удалена.";
                pushToList(message);
                break;

              case "already_failed":
                var message = "Протокол безопасности на компьютере, который " + character.name + " пытался взломать, уже был запущен ранее, а информация удалена. О вашей попытке могли узнать.";
                pushToList(message);
                break;
              case "failed":
                game_state.obstacle_extra_info[_index2].hack_fails = 3; // fully failed
                var message = "Запущен протокол безопасности на компьютере, который " + character.name + " пытался взломать. Вся информация удалена, отправлено уведомление о попытке взлома.";
                pushToList(message);
                break;
              case "one_fail":
                if (game_state.obstacle_extra_info[_index2].hasOwnProperty("hack_fails")) {
                  game_state.obstacle_extra_info[_index2].hack_fails += 1;
                } else {
                  game_state.obstacle_extra_info[_index2].hack_fails = 1;
                }
                var message = character.name + " совершает неудачную попытку взлома. Осторожно, ваши действия могут быть замечены.";
                pushToList(message);
                break;

              case "one_success":
                if (game_state.obstacle_extra_info[_index2].hasOwnProperty("hack_stage")) {
                  game_state.obstacle_extra_info[_index2].hack_stage += 1;
                } else {
                  game_state.obstacle_extra_info[_index2].hack_stage = 1;
                }
                var message = character.name + " продвигается в взломе базы данных. Прогресс: " + 33 * game_state.obstacle_extra_info[_index2].hack_stage + "%";
                pushToList(message);
                break;
              case "hacked":
                game_state.obstacle_extra_info[_index2].hack_stage = 3; // fully hacked
                var message = character.name + " удается прорваться через фаерволл компьютера, и он получает полный доступ к имеющимся данным.";
                pushToList(message);
                break;
            }
          } else {
            console.log("Unknown interaction");
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
          }
          if (user.hasOwnProperty("secondary_chibi_avatar")) {
            var temp = user.chibi_avatar;
            character_detailed_info[user_index].chibi_avatar = character_detailed_info[user_index].secondary_chibi_avatar;
            character_detailed_info[user_index].secondary_chibi_avatar = temp;
            var char_position = character_state.position[user_index];
          }
          if (!(my_role == 'player' && game_state.fog_state[char_position] == 1 || character_state.invisibility[user_index] != "all" && character_state.invisibility[user_index] != my_name)) {
            var to_cell = document.getElementById('cell_' + char_position);
            to_cell.src = get_object_picture(user_index);
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

      for (var _i14 = 1; _i14 < character_state.can_evade.length; _i14++) {
        character = character_detailed_info[_i14];
        if (character !== undefined && character !== null && character_state.HP[_i14] !== null && character_state.HP[_i14] > 0) {
          move_and_actions_replenish(character, _i14);
          apply_tiredness(character, _i14);
          check_default_cooldowns(_i14);
          check_all_round_effects(_i14, character, data);
        }
      }

      apply_terrain_effects(data);
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
    } else if (data.command == 'attack_obstacle_response') {
      if (data.attack_type == "ranged") {
        var audio = gunshot_audio;
      } else if (data.attack_type == "melee") {
        var audio = sword_audio;
      } else {
        // default including energy and throwing
        var audio = suriken_audio;
      }
      audio.play();

      var attacker = character_detailed_info[data.attacker_id];
      var target = obstacle_detailed_info[data.target_id];

      if (data.user_invisibility_ended == 1) {
        character_state.invisibility[data.attacker_id] = "all";
        var attacker_cell = document.getElementById('cell_' + data.attacker_position);
        attacker_cell.src = character_detailed_info[data.attacker_id].avatar;
      }

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

      if (data.cover_level > 0) {
        var cover_string = "Уровень укрытия: " + data.cover_level;
      } else {
        var cover_string = "";
      }

      switch (data.outcome) {
        case "full_cover":
          var message = attacker.name + " пытался разрушить " + target.name + " но атака не прошла через полное укрытие." + cover_string;
          pushToList(message);
          break;
        case "untouched":
          var message = attacker.name + " пытался разрушить " + target.name + " но атаке не хватило урона (" + data.damage + " нанесено). " + cover_string;
          pushToList(message);
          break;
        case "destroyed":
          var message = attacker.name + " разрушает " + target.name + " нанося " + data.damage + " урона. " + cover_string;
          pushToList(message);
          game_state.board_state[data.target_position] = 0;
          game_state.obstacle_extra_info[data.target_position] = null;
          if (!(my_role == 'player' && game_state.fog_state[data.target_position] == 1)) {
            var cell = document.getElementById('cell_' + data.target_position);
            cell.src = EMPTY_CELL_PIC;
          }
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
        for (var _i15 = 0; _i15 < data.mines_detected.length; _i15++) {
          var mine = data.mines_detected[_i15];
          game_state.landmines.knowers[mine].push(data.player_name);
        }
      }
    }
  }
});

var show_board_creation_group_button = $(SHOW_BOARD_CREATION_GROUP_BUTTON_SELECTOR);
show_board_creation_group_button.on('click', showBoardCreationGroup);

var show_board_edit_group_button = $(SHOW_BOARD_EDIT_GROUP_BUTTON_SELECTOR);
show_board_edit_group_button.on('click', showBoardEditGroup);

var show_battle_control_group_button = $(SHOW_BATTLE_CONTROL_GROUP_BUTTON_SELECTOR);
show_battle_control_group_button.on('click', showBattleControlGroup);

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

var reset_initiative_button = $(RESET_INITIATIVE_BUTTON_SELECTOR);
reset_initiative_button.on('click', resetInitiative);

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
for (var _i16 = 0; _i16 < CHAT_CASH; _i16++) {
  var current_element = $("<li>");
  current_element.attr('data-name', 'notifications_list_element_' + _i16);
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

var initiative_dropbox_container = $(INITIATIVE_DROPBOX_CONTAINER_SELECTOR);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksbUNBQW1DLHdDQUF2QztBQUNBLElBQUksZ0NBQWdDLHFDQUFwQztBQUNBLElBQUksa0NBQWtDLHVDQUF0QztBQUNBLElBQUkscUNBQXFDLGtEQUF6QztBQUNBLElBQUksd0NBQXdDLGtEQUE1Qzs7QUFFQSxJQUFJLDRDQUE0QyxnREFBaEQ7QUFDQSxJQUFJLHdDQUF3Qyw0Q0FBNUM7QUFDQSxJQUFJLDRDQUE0QyxnREFBaEQ7QUFDQSxJQUFJLCtCQUErQixtQ0FBbkM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLGtDQUFrQyxzQ0FBdEM7QUFDQSxJQUFJLG1DQUFtQyx1Q0FBdkM7QUFDQSxJQUFJLHNCQUFzQiwwQkFBMUI7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHlCQUF5Qiw2QkFBN0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLGlDQUFpQyxxQ0FBckM7O0FBRUEsSUFBSSx3QkFBd0IsNEJBQTVCOztBQUVBLElBQUksdUJBQXVCLGtDQUEzQjtBQUNBLElBQUksOEJBQThCLGtDQUFsQzs7QUFFQSxJQUFJLDRCQUE0QixnQ0FBaEM7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7O0FBRUEsSUFBSSw4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QWUsT0FBZixDQUFaO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsY0FBUSxHQUFSLENBQVksMkJBQVo7QUFDRDtBQUNGO0FBQ0Y7O2tCQUVjO0FBQ2IsWUFEYTtBQUViLDBDQUZhO0FBR2IsZ0RBSGE7QUFJYiwwQkFKYTtBQUtiLDhEQUxhO0FBTWI7QUFOYSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHNvY2tldCBmcm9tICcuL3dzLWNsaWVudCc7XHJcblxyXG52YXIgJCA9IHdpbmRvdy5qUXVlcnk7XHJcblxyXG52YXIgQ0hBUkFDVEVSX0lORk9fQ09OVEFORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiXSc7XHJcbnZhciBXRUFQT05fSU5GT19DT05UQU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwid2VhcG9uLWluZm8tY29udGFpbmVyXCJdJztcclxudmFyIE5PVElGSUNBVElPTlNfQ09OVEFORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnMtY29udGFpbmVyXCJdJztcclxudmFyIElOSVRJQVRJVkVfT1JERVJfQ09OVEFORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImluaXRpYXRpdmUtb3JkZXItZGlzcGxheS1jb250YWluZXJcIl0nO1xyXG52YXIgSU5JVElBVElWRV9EUk9QQk9YX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiaW5pdGlhdGl2ZS1vcmRlci1kcm9wYm94LWNvbnRhaW5lclwiXSc7XHJcblxyXG52YXIgU0hPV19CT0FSRF9DUkVBVElPTl9HUk9VUF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNob3dfYm9hcmRfY3JlYXRpb25fZ3JvdXBfYnV0dG9uXCJdJztcclxudmFyIFNIT1dfQk9BUkRfRURJVF9HUk9VUF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNob3dfYm9hcmRfZWRpdF9ncm91cF9idXR0b25cIl0nO1xyXG52YXIgU0hPV19CQVRUTEVfQ09OVFJPTF9HUk9VUF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNob3dfYmF0dGxlX2NvbnRyb2xfZ3JvdXBfYnV0dG9uXCJdJztcclxudmFyIENSRUFURV9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImNyZWF0ZV9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgU0FWRV9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNhdmVfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIExPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJsb2FkX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBST0xMX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJyb2xsX2luaXRpYXRpdmVfYnV0dG9uXCJdJztcclxudmFyIFJFU0VUX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJyZXNldF9pbml0aWF0aXZlX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJmb2dfYnV0dG9uXCJdJztcclxudmFyIFpPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX2J1dHRvblwiXSc7XHJcbnZhciBDSEFUX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY2hhdF9idXR0b25cIl0nO1xyXG52YXIgTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibWlycm9yX2J1dHRvblwiXSc7XHJcbnZhciBORVhUX1JPVU5EX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibmV4dF9yb3VuZF9idXR0b25cIl0nO1xyXG52YXIgQkFUVExFX01PRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJhdHRsZV9tb2RfYnV0dG9uXCJdJztcclxudmFyIFNZTkNfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzeW5jX2J1dHRvblwiXSc7XHJcbnZhciBMQU5ETUlORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImxhbmRtaW5lX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImZvZ196b25lX2J1dHRvblwiXSc7XHJcbnZhciBVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwidW5mb2dfem9uZV9idXR0b25cIl0nO1xyXG52YXIgRE9XTkxPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJkb3dubG9hZF9ib2FyZF9idXR0b25cIl0nO1xyXG5cclxudmFyIFNBVkVTX1NFTEVDVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2F2ZXNfc2VsZWN0XCJdJztcclxuXHJcbnZhciBaT05FX05VTUJFUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiem9uZV9udW1iZXJfc2VsZWN0XCJdJztcclxudmFyIFNFQVJDSF9NT0RJRklDQVRPUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2VhcmNoX21vZGlmaWNhdG9yXCJdJztcclxuXHJcbnZhciBCT0FSRF9TSVpFX0lOUFVUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJib2FyZF9zaXplX2lucHV0XCJdJztcclxudmFyIFNBVkVfTkFNRV9JTlBVVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2F2ZV9uYW1lX2lucHV0XCJdJztcclxuXHJcbnZhciBOT1RJRklDQVRJT05TX0xJU1RfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdFwiXSc7XHJcblxyXG52YXIgU0tJTExfTU9EQUxfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNraWxsLW1vZGFsXCJdJztcclxudmFyIFNLSUxMX01PREFMX0NPTlRFTlRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNraWxsLW1vZGFsLWNvbnRlbnRcIl0nO1xyXG52YXIgU0tJTExfREVTQ1JJUFRJT05fQ09OVEFJTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJza2lsbC1kZXNjcmlwdGlvbi1jb250YWluZXJcIl0nO1xyXG52YXIgTkVYVF9QQUdFX0JVVFRPTl9DT05UQUlORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm5leHQtcGFnZS1idXR0b24tY29udGFpbmVyXCJdJztcclxuXHJcbnZhciBCT0FSRF9DUkVBVElPTl9HUk9VUF9TRUxFQ1RPUiA9ICdbZGF0YS1ncm91cC1uYW1lPVwiYm9hcmRfY3JlYXRpb25fZ3JvdXBcIl0nO1xyXG52YXIgQk9BUkRfRURJVF9HUk9VUF9TRUxFQ1RPUiA9ICdbZGF0YS1ncm91cC1uYW1lPVwiYm9hcmRfZWRpdF9ncm91cFwiXSc7XHJcbnZhciBCQVRUTEVfQ09OVFJPTF9HUk9VUF9TRUxFQ1RPUiA9ICdbZGF0YS1ncm91cC1uYW1lPVwiYmF0dGxlX2NvbnRyb2xfZ3JvdXBcIl0nO1xyXG5cclxudmFyIFNFUlZFUl9BRERSRVNTID0gbG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoL15odHRwLywgJ3dzJyk7XHJcblxyXG52YXIgbXlfbmFtZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKSk7XHJcbnZhciBteV9yb2xlID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3JvbGUnKSk7XHJcbnZhciBteV9yb29tID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdyb29tX251bWJlcicpKTtcclxuXHJcbnZhciBjaGFyYWN0ZXJfbGlzdCA9IFtdO1xyXG52YXIgZ3JvdXBfbGlzdCA9IFtdO1xyXG52YXIgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIG9ic3RhY2xlX2xpc3QgPSBbXTtcclxudmFyIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIHdlYXBvbl9saXN0ID0gW107XHJcbnZhciB3ZWFwb25fZGV0YWlsZWRfaW5mbyA9IFtdO1xyXG52YXIgc2tpbGxfbGlzdCA9IFtdO1xyXG52YXIgc2tpbGxfZGV0YWlsZWRfaW5mbztcclxudmFyIHNhdmVzX2xpc3QgPSBbXTtcclxuXHJcbnZhciBpbml0aWF0aXZlX29yZGVyX2FycmF5ID0gW107XHJcblxyXG52YXIgVElOWV9FRkZFQ1RfQ0xBU1MgPSAnaXMtdGlueSc7XHJcblxyXG52YXIgRU1QVFlfQ0VMTF9QSUMgPSBcIi4vaW1hZ2VzL3NxdWFyZS5qcGdcIjtcclxudmFyIFpPTkVfRU5EUE9JTlRfUElDID0gXCIuL2ltYWdlcy9yZWRfY3Jvc3MuanBnXCJcclxudmFyIEZPR19JTUFHRSA9IFwiLi9pbWFnZXMvZm9nLndlYnBcIjtcclxudmFyIFFVRVNUSU9OX0lNQUdFID0gXCIuL2ltYWdlcy9xdWVzdGlvbi5qcGdcIjtcclxudmFyIElOVklTRV9JTUFHRSA9IFwiLi9pbWFnZXMvem9ycm9fbWFzay5qcGVnXCI7XHJcbnZhciBBSU1fSU1BR0UgPSBcIi4vaW1hZ2VzL2FpbS5qcGdcIjtcclxudmFyIFJJR0hUX0FSUk9XX0lNQUdFID0gXCIuL2ltYWdlcy9yaWdodF9hcnJvdy5wbmdcIjtcclxudmFyIEFSTU9SX0lNQUdFID0gXCIuL2ltYWdlcy9hcm1vci5qcGdcIjtcclxudmFyIFNQSVJJVF9JTUFHRSA9IFwiLi9pbWFnZXMvY2hha3JhLmpwZ1wiO1xyXG52YXIgRFJPUEJPWF9JTUFHRSA9IFwiLi9pbWFnZXMvYmFza2V0LmpwZ1wiO1xyXG5cclxudmFyIE1BWF9aT05FUyA9IDUwO1xyXG52YXIgQ0hBVF9DQVNIID0gMTAwO1xyXG5cclxudmFyIHN0YW1pbmFfd2Vha3Nwb3RfY29zdCA9IDFcclxudmFyIHN0YW1pbmFfbW92ZV9jb3N0ID0gMFxyXG52YXIgc3RhbWluYV9hdHRhY2tfY29zdCA9IDFcclxudmFyIHB1bmNoX3JhaW5mYWxsX3N0YW1pbmFfY29zdCA9IDIgLy8gcGVyIHB1bmNoXHJcbnZhciBzdGFtaW5hX2N1dF9saW1iX2Nvc3QgPSA0XHJcbnZhciBzaGllbGRfdXBfc3RhbWluYV9jb3N0ID0gMiAvLyBwZXIgbW92ZSBJIHRoaW5rXHJcbnZhciBsb3R0ZXJ5X3Nob3Rfc3RhbWluYV9jb3N0ID0gMVxyXG52YXIgbHVja3lfc2hvdF9zdGFtaW5hX2Nvc3QgPSAxXHJcbnZhciBhY3Rpb25fc3BsYXNoX3N0YW1pbmFfY29zdCA9IDJcclxudmFyIGFkcmVuYWxpbmVfc3RhbWluYV9jb3N0ID0gM1xyXG52YXIgYWNpZF9ib21iX3N0YW1pbmFfY29zdCA9IDNcclxudmFyIGN1cnZlZF9idWxsZXRzX3N0YW1pbmFfY29zdCA9IDJcclxuXHJcbnZhciBjdXRfbGltYl9jb29sZG93biA9IDFcclxuXHJcbnZhciByZXN0X3N0YW1pbmFfZ2FpbiA9IDVcclxuXHJcbnZhciBjdXRfbGltYl9kdXJhdGlvbiA9IDFcclxudmFyIGNvb2xkb3duX2JpZ19icm8gPSAxIC8vIGR1cmF0aW9uXHJcblxyXG52YXIgc2hpZWxkX3VwX0tEID0gM1xyXG5cclxudmFyIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZSA9IDRcclxudmFyIGNoYXJnZV9tb3ZlX2luY3JlYXNlID0gNFxyXG5cclxudmFyIGdhc19ib21iX2Jhc2VfdGhyZXNob2xkID0gMTBcclxudmFyIGdhc19ib21iX21vdmVfcmVkdWN0aW9uID0gMlxyXG52YXIgZ2FzX2JvbWJfc3RhbWluYV9jb3N0ID0gM1xyXG52YXIgZ2FzX2JvbWJfb2JzdGFjbGUgPSAxNVxyXG52YXIgZ2FzX2JvbWJfc2tpbGxfY29vbGRvd24gPSA1XHJcblxyXG52YXIgbGlnaHRfc291bmRfYm9tYl9yYWRpdXMgPSA0XHJcbnZhciBsaWdodF9zb3VuZF9ib21iX3RocmVzaG9sZCA9IDE1XHJcbnZhciBsaWdodF9zb3VuZF9ib21iX3NraWxsX2Nvb2xkb3duID0gNVxyXG5cclxudmFyIHdlYWtfc3BvdF90aHJlc2hvbGQgPSAxNVxyXG5cclxudmFyIHNob2NrZWRfY29vbGRvd24gPSAwXHJcblxyXG52YXIgcGljaF9waWNoX2Nvb2xkb3duID0gNFxyXG52YXIgcGljaF9waWNoX21vdmVfaW5jcmVhc2UgPSA0XHJcblxyXG52YXIgZm9yY2VfZmllbGRfcmFkaXVzID0gMS42XHJcbnZhciBmb3JjZV9maWVsZF9zdGFtaW5hX2Nvc3QgPSA1XHJcbnZhciBmb3JjZV9maWVsZF9jb29sZG93biA9IDEwXHJcbnZhciBmb3JjZV9maWVsZF9vYnN0YWNsZSA9IDI0XHJcblxyXG52YXIgYWN0aW9uX3NwbGFzaF9jb29sZG93biA9IDRcclxuXHJcbnZhciBpbnZpc2liaWxpdHlfZGV0ZWN0aW9uX3JhZGl1cyA9IDI7XHJcbnZhciBpbnZpc2liaWxpdHlfZGV0ZWN0aW9uX3RocmVzaG9sZCA9IDEwO1xyXG5cclxudmFyIGJpZ19icm9fcmFuZ2UgPSAyXHJcbnZhciBoZWFsX3JhbmdlID0gMVxyXG52YXIgdGhyb3dfYmFzZV9yYW5nZSA9IDJcclxudmFyIGxpZ2h0X3NvdW5kX2JvbWJfcmFuZ2UgPSA1XHJcbnZhciBmb3JjZV9maWVsZF9yYW5nZSA9IDFcclxudmFyIGFkcmVuYWxpbmVfcmFuZ2UgPSAxXHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9yYW5nZSA9IDFcclxuXHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbiA9IDJcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX2Nvb2xkb3duID0gNVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfZmxhdF9IUCA9IDVcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX2ZsYXRfc3RhbWluYSA9IDVcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX3BlcmNlbnRfSFAgPSAwLjA1XHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9wZXJjZW50X3N0YW1pbmEgPSAwLjA1XHJcblxyXG52YXIgYWRyZW5hbGluZV9jb29sZG93biA9IDRcclxuXHJcbnZhciBhY2lkX2JvbWJfZHVyYXRpb24gPSAyIC8vIDIrMSByZWFsbHlcclxudmFyIGFjaWRfYm9tYl9jb29sZG93biA9IDVcclxudmFyIGFjaWRfYm9tYl9yYWRpdXMgPSAxLjZcclxuXHJcbnZhciBtaW5lc18wX2Rpc3RhbmNlX2RhbWFnZSA9IDIwXHJcbnZhciBtaW5lc18xX2Rpc3RhbmNlX2RhbWFnZSA9IDE1XHJcbnZhciBtaW5lc18xcDVfZGlzdGFuY2VfZGFtYWdlID0gMTBcclxudmFyIGxhbmRtaW5lX2RldGVjdGlvbl9yYWRpdXMgPSAyLjlcclxudmFyIGxhbmRtaW5lX2RpZmZ1c2VfdGhyZXNob2xkID0gMTBcclxuXHJcbnZhciB0b2JhY2NvX3N0cmlrZV9ocF9wZXJjZW50YWdlID0gMC4xXHJcbnZhciB0b2JhY2NvX3N0cmlrZV9ib251cyA9IDRcclxudmFyIHRvYmFjY29fc3RyaWtlX2Nvb2xkb3duID0gMVxyXG5cclxudmFyIHNhZmV0eV9zZXJ2aWNlX3JhbmdlID0gMjtcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2Nvb2xkb3duID0gMTtcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2R1cmF0aW9uID0gMTtcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2RlZmVuc2l2ZV9hZHZhbnRhZ2UgPSAxO1xyXG52YXIgc2FmZXR5X3NlcnZpY2VfZXZhZGVfYm9udXMgPSAzO1xyXG52YXIgc2FmZXR5X3NlcnZpY2VfYm9udXNfYWN0aW9uc19jb3N0ID0gMjtcclxuXHJcbnZhciBjYWxpbmdhbGF0b3JfcmFuZ2UgPSAxLjY7XHJcbnZhciBjYWxpbmdhbGF0b3Jfb2JzdGFjbGUgPSAyNTtcclxudmFyIGNhbGluZ2FsYXRvcl9kdXJhdGlvbiA9IDM7XHJcbnZhciBjYWxpbmdhbGF0b3Jfc3RhbWluYV9jb3N0ID0gMztcclxudmFyIGNhbGluZ2FsYXRvcl9yYWRpdXMgPSAxLjY7XHJcbnZhciBjYWxpbmdhbGF0b3Jfc2tpbGxfY29vbGRvd24gPSAxMDtcclxudmFyIGNhbGluZ2FsYXRvcl9mbGF0X2hlYWwgPSA1O1xyXG52YXIgY2FsaW5nYWxhdG9yX3JvbGxfaGVhbCA9IDU7XHJcbnZhciBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMSA9IDU7XHJcbnZhciBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMiA9IDc7XHJcbnZhciBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMyA9IDEwO1xyXG52YXIgY2FsaW5nYWxhdG9yX3BvaXNvbmluZ19kdXJhdGlvbl9lbmxpZ2h0ZW5lZCA9IDEwO1xyXG52YXIgY2FsaW5nYWxhdG9yX3BlbmFsdHlfc3RhZ2UxID0gLTE7XHJcbnZhciBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTIgPSAtMjtcclxudmFyIGNhbGluZ2FsYXRvcl9wZW5hbHR5X3N0YWdlMyA9IC0zO1xyXG52YXIgY2FsaW5nYWxhdG9yX3BlbmFsdHlfZW5saWdodGVuZWQgPSAzO1xyXG5cclxudmFyIGJlbHZldF9idWZmX3JhbmdlID0gMS42O1xyXG52YXIgYmVsdmV0X2J1ZmZfc2tpbGxfZHVyYXRpb24gPSAxO1xyXG52YXIgYmVsdmV0X2J1ZmZfYXR0YWNrX2JvbnVzID0gMjtcclxudmFyIGJlbHZldF9idWZmX21lbGVlX2FkdmFudGFnZSA9IDE7XHJcbnZhciBiZWx2ZXRfYnVmZl9yYW5nZWRfYWR2YW50YWdlID0gMTtcclxuXHJcbnZhciBob29rX2Nvb2xkb3duID0gMjtcclxudmFyIGhvb2tfZHVyYXRpb24gPSAxO1xyXG52YXIgaG9va19kZWZlbnNpdmVfYWR2YW50YWdlID0gLTE7XHJcbnZhciBob29rX3JhbmdlID0gMztcclxuXHJcbnZhciBwdW5pc2hpbmdfc3RyaWtlX2Nvb2xkb3duID0gMztcclxudmFyIHB1bmlzaGluZ19zdHJpa2VfbXVsdGlwbHllciA9IDAuNTtcclxuXHJcbnZhciBjb21wdXRlcl9pbnRlcmFjdGlvbl9yYWRpdXMgPSAxO1xyXG52YXIgaGFja2luZ19jcml0aWNhbF9mYWlsX3RocmVzaG9sZCA9IDEwO1xyXG52YXIgaGFja2luZ19zdWNjZXNzX3RocmVzaG9sZCA9IDE2O1xyXG52YXIgaGFja2luZ19jcml0aWNhbF9zdWNjZXNzX3RocmVzaG9sZCA9IDI1O1xyXG5cclxuLy8gVGhpcyBpcyBhIGNvbnN0YW50LCB3aWxsIGJlIG1vdmVkIHRvIGRhdGFiYXNlIGxhdGVyXHJcbmNvbnN0IEhQX3ZhbHVlcyA9IFsxNSwgMzAsIDQwLCA1NSwgNzUsIDEwMCwgMTMwLCAxNjUsIDIwNSwgMjUwLCAzMDAsIDM1NSwgNDE1XTtcclxuY29uc3Qgc3RhbWluYV92YWx1ZXMgPSBbMzAsIDQ1LCA2MCwgNzUsIDkwLCAxMDUsIDEyMCwgMTM1LCAxNTAsIDE2NSwgMTgwLCAxOTVdO1xyXG5jb25zdCBzdHJlbmd0aF9kYW1hZ2VfbWFwID0gWy0yLCAwLCAxLCAzLCA2LCAxMCwgMTUsIDIxLCAyOCwgMzYsIDQ1LCA1NV1cclxuY29uc3QgbW92ZV9hY3Rpb25fbWFwID0gWzEsIDMsIDQsIDYsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTVdXHJcbmNvbnN0IGJvbnVzX2FjdGlvbl9tYXA9IFswLCAxLCAxLCAyLCAyLCAyLCAyLCAyLCAzLCAzLCAzLCAzXVxyXG5jb25zdCBtYWluX2FjdGlvbl9tYXAgPSBbMSwgMSwgMSwgMSwgMSwgMSwgMiwgMiwgMiwgMiwgMiwgM11cclxuXHJcbnZhciBlZmZlY3RfbGlzdCA9IFtcItCj0LLQtdC70LjRh9C40YLRjCDRgdC40LvRg1wiLCBcItCj0LLQtdC70LjRh9C40YLRjCDRgtC10LvQvtGB0LvQvtC20LXQvdC40LVcIiwgXCLQo9Cy0LXQu9C40YfQuNGC0Ywg0LvQvtCy0LrQvtGB0YLRjFwiLCBcItCj0LLQtdC70LjRh9C40YLRjCDQuNC90YLQtdC70LvQtdC60YJcIiwgXCLQo9Cy0LXQu9C40YfQuNGC0Ywg0JrQlFwiLCBcItCj0LzQtdC90YzRiNC40YLRjCDRgdC40LvRg1wiLFxyXG5cItCj0LzQtdC90YzRiNC40YLRjCDRgtC10LvQvtGB0LvQvtC20LXQvdC40LVcIiwgXCLQo9C80LXQvdGM0YjQuNGC0Ywg0LvQvtCy0LrQvtGB0YLRjFwiLCBcItCj0LzQtdC90YzRiNC40YLRjCDQuNC90YLQtdC70LvQtdC60YJcIiwgXCLQo9C80LXQvdGM0YjQuNGC0Ywg0JrQlFwiXTtcclxudmFyIElOQ1JFQVNFX1NUUkVOR1RIID0gMDtcclxudmFyIElOQ1JFQVNFX1NUQU1JTkEgPSAxO1xyXG52YXIgSU5DUkVBU0VfQUdJTElUWSA9IDI7XHJcbnZhciBJTkNSRUFTRV9JTlQgPSAzO1xyXG52YXIgSU5DUkVBU0VfS0QgPSA0O1xyXG52YXIgREVDUkVBU0VfU1RSRU5HVEggPSA1O1xyXG52YXIgREVDUkVBU0VfU1RBTUlOQSA9IDY7XHJcbnZhciBERUNSRUFTRV9BR0lMSVRZID0gNztcclxudmFyIERFQ1JFQVNFX0lOVCA9IDg7XHJcbnZhciBERUNSRUFTRV9LRCA9IDk7XHJcblxyXG5cclxudmFyIENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVCA9IHtIUDogW10sIG1haW5fYWN0aW9uOiBbXSwgYm9udXNfYWN0aW9uOiBbXSwgbW92ZV9hY3Rpb246IFtdLCBzdGFtaW5hOiBbXSwgaW5pdGlhdGl2ZTogW10sIGNhbl9ldmFkZTogW10sIGhhc19tb3ZlZDogW10sXHJcbiAgS0RfcG9pbnRzOiBbXSwgY3VycmVudF93ZWFwb246IFtdLCB2aXNpYmlsaXR5OiBbXSwgaW52aXNpYmlsaXR5OiBbXSwgYXR0YWNrX2JvbnVzOiBbXSwgZGFtYWdlX2JvbnVzOiBbXSwgdW5pdmVyc2FsX2JvbnVzOiBbXSwgYm9udXNfS0Q6IFtdLFxyXG4gIHNwZWNpYWxfZWZmZWN0czogW10sIHJhbmdlZF9hZHZhbnRhZ2U6IFtdLCBtZWxlZV9hZHZhbnRhZ2U6IFtdLCBkZWZlbnNpdmVfYWR2YW50YWdlOiBbXSwgcG9zaXRpb246IFtdLCBldmFkZV9ib251czogW10sIG1lbGVlX3Jlc2lzdDogW10sIGJ1bGxldF9yZXNpc3Q6IFtdfTtcclxubGV0IGdhbWVfc3RhdGUgPSB7Ym9hcmRfc3RhdGU6IFtdLCBmb2dfc3RhdGU6IFtdLCB6b25lX3N0YXRlOiBbXSwgc2l6ZTogMCwgc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlOiBbXSwgdGVycmFpbl9lZmZlY3RzOiBbXSwgYmF0dGxlX21vZDogMCwgb2JzdGFjbGVfZXh0cmFfaW5mbzogW10sXHJcbiAgbGFuZG1pbmVzOiB7cG9zaXRpb25zOiBbXSwga25vd2VyczogW119fTtcclxubGV0IGNoYXJhY3Rlcl9zdGF0ZSA9IENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVDtcclxuXHJcbmxldCBnbV9jb250cm9sX21vZCA9IDA7IC8vIG5vcm1hbCBtb2RlXHJcblxyXG4vLyBpbl9wcm9jZXNzOiAwID0gbm90aGluZywgMSA9IG1vdmUsIDIgPSBhdHRhY2ssIDMgPSBza2lsbFxyXG5sZXQgY2hhcmFjdGVyX2Nob3NlbiA9IHtpbl9wcm9jZXNzOiAwLCBjaGFyX2lkOiAwLCBjaGFyX3Bvc2l0aW9uOiAwLCB3ZWFwb25faWQ6IDAsIHNraWxsX2lkOiAwLCBjZWxsOiAwfTtcclxubGV0IGRyYWdnZWQgPSBudWxsO1xyXG5cclxubGV0IGxhc3Rfb2JzdGFjbGUgPSAxO1xyXG5sZXQgem9uZV9lbmRwb2ludCA9IHtpbmRleDogLTEsIGNlbGw6IDB9XHJcblxyXG52YXIgZ3Vuc2hvdF9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL2d1bnNob3QubXAzJyk7XHJcbnZhciBzd29yZF9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL3N3b3JkLndhdicpO1xyXG52YXIgZXhwbG9zaW9uX2F1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvZXhwbG9zaW9uLm1wMycpO1xyXG52YXIgc3VyaWtlbl9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL3N1cmlrZW4ubXAzJyk7XHJcblxyXG5ndW5zaG90X2F1ZGlvLnZvbHVtZSA9IDAuMlxyXG5zd29yZF9hdWRpby52b2x1bWUgPSAwLjJcclxuc3VyaWtlbl9hdWRpby52b2x1bWUgPSAwLjJcclxuZXhwbG9zaW9uX2F1ZGlvLnZvbHVtZSA9IDAuMlxyXG5cclxuZnVuY3Rpb24gcmVjb25uZWN0KCkge1xyXG4gIGlmICghc29ja2V0LmlzUmVhZHkoKSkge1xyXG4gICAgc29ja2V0LmluaXQoU0VSVkVSX0FERFJFU1MpO1xyXG4gICAgc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0KCk7XHJcbiAgICBjb25zb2xlLmxvZygnSG9wZWZ1bGx5IHJlY29ubmVjdGVkIChwcmF5KScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnV2FzIG9ubGluZSBhbnl3YXknKTtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ2lnbm9yZV9tZSc7XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9XHJcbn1cclxuXHJcbi8vINCh0L7Qt9C00LDQvdC40LUg0LTQvtGB0LrQuCwgb25jbGljayDQutC70LXRgtC+0LosIHNhdmUvbG9hZFxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XHJcbiAgZ2FtZV9zdGF0ZS5zaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZF9zaXplXCIpLnZhbHVlO1xyXG4gIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLmZvZ19zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuem9uZV9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUgKiBnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG4gICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGUucHVzaCgwKTtcclxuICB9XHJcbiAgc2VuZF9jb25zdHJ1Y3RfY29tbWFuZChnYW1lX3N0YXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEJvYXJkKCkge1xyXG4gIHZhciBuYW1lID0gc2F2ZXNfc2VsZWN0LnZhbCgpO1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdsb2FkX2dhbWUnO1xyXG4gIHRvU2VuZC5zYXZlX25hbWUgPSBuYW1lO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVCb2FyZCgpIHtcclxuICB2YXIgc2F2ZV9uYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfbmFtZVwiKS52YWx1ZTtcclxuICB2YXIgZnVsbF9nYW1lX3N0YXRlID0ge1xyXG4gICAgZ2FtZV9zdGF0ZTogZ2FtZV9zdGF0ZSxcclxuICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvOiBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyxcclxuICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm86IG9ic3RhY2xlX2RldGFpbGVkX2luZm8sXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGU6IGNoYXJhY3Rlcl9zdGF0ZVxyXG4gIH07XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdzYXZlX2dhbWUnO1xyXG4gIHRvU2VuZC5zYXZlX25hbWUgPSBzYXZlX25hbWU7XHJcbiAgdG9TZW5kLmZ1bGxfZ2FtZV9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb3dubG9hZEJvYXJkKCkge1xyXG4gIHZhciBuYW1lID0gc2F2ZXNfc2VsZWN0LnZhbCgpO1xyXG4gIHZhciBsaW5rX25hbWUgPSBcInNhdmVzL1wiICsgbmFtZSArIFwiLmpzb25cIjtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlfaWZyYW1lJykuc3JjID0gbGlua19uYW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kX2NvbnN0cnVjdF9jb21tYW5kKG5ld19nYW1lX3N0YXRlKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2NvbnN0cnVjdF9ib2FyZCc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuZ2FtZV9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb25zdHJ1Y3RfYm9hcmQobmV3X2dhbWVfc3RhdGUpIHtcclxuICBnYW1lX3N0YXRlID0gbmV3X2dhbWVfc3RhdGVcclxuICBpZiAoIWdhbWVfc3RhdGUuaGFzT3duUHJvcGVydHkoXCJvYnN0YWNsZV9leHRyYV9pbmZvXCIpKSB7XHJcbiAgICBnYW1lX3N0YXRlLm9ic3RhY2xlX2V4dHJhX2luZm8gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICAgIGdhbWVfc3RhdGUub2JzdGFjbGVfZXh0cmFfaW5mb1tpXSA9IHt9O1xyXG4gICAgfVxyXG4gIH1cclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIGJvYXJkX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xyXG4gIGJvYXJkX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIHZhciBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuICBib2FyZC5jbGFzc05hbWUgPSBcImJvYXJkXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIHZhciByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICByb3cuY2xhc3NOYW1lID0gXCJib2FyZF9yb3dcIjtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZV9zdGF0ZS5zaXplOyBqKyspIHtcclxuICAgICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICAgIHZhciBjZWxsX2lkID0gaSAqIGdhbWVfc3RhdGUuc2l6ZSArIGo7XHJcbiAgICAgIGJ1dHRvbi5pZCA9IFwiY2VsbF9cIiArIGNlbGxfaWQ7XHJcbiAgICAgIGJ1dHRvbi5yb3cgPSBpO1xyXG4gICAgICBidXR0b24uY29sdW1uID0gajtcclxuICAgICAgdmFyIGltYWdlX25hbWUgPSBmb2dPclBpYyhjZWxsX2lkKTtcclxuICAgICAgYnV0dG9uLnNyYyA9IGltYWdlX25hbWU7XHJcbiAgICAgIGJ1dHRvbi5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdib2FyZF9jZWxsJztcclxuICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHZhciBpbmRleCA9IGNlbGwucm93ICogZ2FtZV9zdGF0ZS5zaXplICsgY2VsbC5jb2x1bW47XHJcblxyXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgc2hpZnRfb25jbGljayhpbmRleCwgY2VsbClcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAgIGN0cmxfb25jbGljayhpbmRleClcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmFsdEtleSkge1xyXG4gICAgICAgICAgYWx0X29uY2xpY2soaW5kZXgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vX3NoaWZ0X29uY2xpY2sobXlfcm9sZSwgZ21fY29udHJvbF9tb2QsIGdhbWVfc3RhdGUsIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcywgY2VsbCwgaW5kZXgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuICAgICAgYnV0dG9uLmRyYWdnYWJsZSA9IHRydWU7XHJcbiAgICAgIGJ1dHRvbi5vbmRyYWdvdmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGJ1dHRvbi5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgZHJhZ2dlZCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICB2YXIgY2VsbCA9IGRyYWdnZWQ7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gY2VsbC5yb3cgKiBnYW1lX3N0YXRlLnNpemUgKyBjZWxsLmNvbHVtbjtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdO1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfbnVtYmVyID4gMCAmJiAobXlfcm9sZSA9PSBcImdtXCIgfHwgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gMSkgJiYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gJ2FsbCcgfHwgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSBteV9uYW1lKSAmJiAobXlfcm9sZSA9PSBcImdtXCIgfHwgZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDApKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwsIGZhbHNlKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBidXR0b24ub25kcm9wID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICB2YXIgaW5kZXggPSBjZWxsLnJvdyAqIGdhbWVfc3RhdGUuc2l6ZSArIGNlbGwuY29sdW1uO1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPT0gMSAmJiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwICYmIChteV9yb2xlID09IFwiZ21cIiB8fCBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPT0gMCkpIHtcclxuICAgICAgICAgIG1vdmVfY2hhcmFjdGVyKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB2YXIgY2VsbF93cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xyXG4gICAgICBjZWxsX3dyYXAuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgY2VsbF93cmFwLmNsYXNzTmFtZSA9IFwiY2VsbF93cmFwXCI7XHJcblxyXG4gICAgICB2YXIgem9uZV90ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgem9uZV90ZXh0LmlkID0gXCJ6b25lX3RleHRfXCIgKyBjZWxsX2lkO1xyXG4gICAgICB6b25lX3RleHQuY2xhc3NOYW1lID0gXCJ6b25lX3RleHRcIjtcclxuICAgICAgY2VsbF93cmFwLmFwcGVuZENoaWxkKHpvbmVfdGV4dCk7XHJcblxyXG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbF93cmFwKTtcclxuICAgIH1cclxuICAgIGJvYXJkLmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgfVxyXG4gIGJvYXJkX2NvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vX3NoaWZ0X29uY2xpY2sobXlfcm9sZSwgZ21fY29udHJvbF9tb2QsIGdhbWVfc3RhdGUsIGZpZWxkX2Nob3NlbiwgY2VsbCwgaW5kZXgpIHtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICAvLyBnbSBzaWRlXHJcbiAgICBpZiAoZ21fY29udHJvbF9tb2QgPT0gMCkge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gbm9ybWFsIGFkZC9tb3ZlIGRlbGV0ZSBtb2RlXHJcbiAgICAgIHN0YW5kYXJkX2NlbGxfb25DbGljayhpbmRleCwgY2VsbCwgbXlfcm9sZSk7XHJcbiAgICB9IGVsc2UgaWYgKGdtX2NvbnRyb2xfbW9kID09IDEpIHtcclxuICAgICAgLy8gd2UgYXJlIGluIGZvZyBtb2RlXHJcbiAgICAgIGFwcGx5Rm9nKGluZGV4LCBjZWxsKTtcclxuICAgIH0gZWxzZSBpZiAoZ21fY29udHJvbF9tb2QgPT0gMikge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gem9uZXMgbW9kZVxyXG4gICAgICBhc3NpZ25ab25lKGluZGV4KTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gcGxheWVyIHNpZGVcclxuICAgIGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPT0gMSkge1xyXG4gICAgICAvLyBjbGlja2VkIGZvZ1xyXG4gICAgICBpZiAoZmllbGRfY2hvc2VuID09IDEpIHtcclxuICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgZm9nIGRldGVjdGVkJyk7XHJcbiAgICAgICAgZGlzcGxheUZvZygpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIG15X3JvbGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hpZnRfb25jbGljayhpbmRleCwgY2VsbCkge1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIGlmIChnbV9jb250cm9sX21vZCA9PSAyKSB7XHJcbiAgICAgIGlmICh6b25lX2VuZHBvaW50LmluZGV4IDwgMCkge1xyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuaW5kZXggPSBpbmRleFxyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuY2VsbCA9IGNlbGxcclxuICAgICAgICBjZWxsLnNyYyA9IFpPTkVfRU5EUE9JTlRfUElDXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZW5kcG9pbnRfYXNzaWduX3pvbmUoaW5kZXgsIHpvbmVfZW5kcG9pbnQuaW5kZXgpXHJcbiAgICAgICAgem9uZV9lbmRwb2ludC5jZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDXHJcbiAgICAgICAgem9uZV9lbmRwb2ludC5pbmRleCA9IC0xXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX29ic3RhY2xlJztcclxuICAgICAgdG9TZW5kLmNlbGxfaWQgPSBpbmRleDtcclxuICAgICAgdG9TZW5kLm9ic3RhY2xlX251bWJlciA9IGxhc3Rfb2JzdGFjbGU7XHJcbiAgICAgIHRvU2VuZC5vYnN0YWNsZV9uYW1lID0gb2JzdGFjbGVfbGlzdFtsYXN0X29ic3RhY2xlIC0gMV07XHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3RybF9vbmNsaWNrKGluZGV4KSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgdmFyIGZvZ192YWx1ZSA9IGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIG1vZCA9IDEgLSBmb2dfdmFsdWVcclxuICAgIHZhciB6b25lID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2luZGV4XVxyXG4gICAgZm9nUGFyc2Vab25lKG1vZCwgem9uZSlcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFsdF9vbmNsaWNrKGluZGV4KSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgZGVsZXRlX29iamVjdF9jb21tYW5kKGluZGV4KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YW5kYXJkX2NlbGxfb25DbGljayhpbmRleCwgY2VsbCwgcm9sZSkge1xyXG5cdGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7IC8vIGVtcHR5IGNlbGwgY2xpY2tlZFxyXG5cclxuICAgIHN3aXRjaChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MpIHtcclxuICAgICAgY2FzZSAwOiAvLyBub3RoaW5nXHJcbiAgICAgICAgaWYgKHJvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgICAgYWRkX29iamVjdChpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6IC8vIG1vdmVcclxuICAgICAgICBtb3ZlX2NoYXJhY3RlcihpbmRleCwgY2VsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjogLy9hdHRhY2tcclxuICAgICAgICBzdG9wX2F0dGFjaygpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzogLy9za2lsbFxyXG4gICAgICAgIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXNvbHZpbmcgb25fY2xpY2sgZW1wdHlcIilcclxuICAgIH1cclxuXHJcblx0fSBlbHNlIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA+IDApIHsgLy8gY2hhcmFjdGVyIGNsaWNrZWRcclxuICAgIHN3aXRjaChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MpIHtcclxuICAgICAgY2FzZSAwOiAvLyBub3RoaW5nXHJcbiAgICAgICAgc2VsZWN0X2NoYXJhY3RlcihpbmRleCwgY2VsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTogLy8gbW92ZVxyXG4gICAgICAgIHVuZG9fc2VsZWN0aW9uKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjogLy9hdHRhY2tcclxuICAgICAgICBwZXJmb3JtX2F0dGFjayhpbmRleCwgY2VsbClcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOiAvL3NraWxsXHJcbiAgICAgICAgcGVyZm9ybV9za2lsbChpbmRleCwgY2VsbClcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJlc29sdmluZyBvbl9jbGljayBjaGFyYWN0ZXJcIilcclxuICAgIH1cclxuXHJcblx0fSBlbHNlIHsgLy8gb2JzdGFjbGUgY2xpY2tlZFxyXG5cclxuICAgIHN3aXRjaChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MpIHtcclxuICAgICAgY2FzZSAwOiAvLyBub3RoaW5nXHJcbiAgICAgICAgc2VsZWN0X29ic3RhY2xlKGluZGV4LCBjZWxsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxOiAvLyBtb3ZlXHJcbiAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOiAvL2F0dGFja1xyXG4gICAgICAgIGF0dGFja19vYnN0YWNsZShpbmRleCwgY2VsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzogLy9za2lsbFxyXG4gICAgICAgIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXNvbHZpbmcgb25fY2xpY2sgb2JzdGFjbGVcIilcclxuICAgIH1cclxuXHJcblx0fVxyXG59XHJcblxyXG4vLyBab25lL2ZvZyByZWxhdGVkIHN0YWZmXHJcblxyXG5mdW5jdGlvbiBlbmRwb2ludF9hc3NpZ25fem9uZShlbmRwb2ludDEsIGVuZHBvaW50Mikge1xyXG4gIHZhciB6b25lX251bWJlciA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICB2YXIgbW9kaWZpY2F0b3IgPSBzZWFyY2hfbW9kaWZpY2F0b3IudmFsKCk7XHJcbiAgdmFyIHNpemUgPSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIGluZGV4X2xpc3QgPSBbXVxyXG5cclxuICB2YXIgY29vcmQxID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQxLCBzaXplKVxyXG4gIHZhciBjb29yZDIgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDIsIHNpemUpXHJcblxyXG4gIHZhciB0b3BfbGVmdCA9IHRvcF9sZWZ0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKVxyXG4gIHZhciBib3R0b21fcmlnaHQgPSBib3R0b21fcmlnaHRfY29vcmQoY29vcmQxLCBjb29yZDIpXHJcblxyXG4gIGZvciAobGV0IGkgPSB0b3BfbGVmdC54OyBpIDw9IGJvdHRvbV9yaWdodC54OyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSB0b3BfbGVmdC55OyBqIDw9IGJvdHRvbV9yaWdodC55OyBqKyspIHtcclxuICAgICAgdmFyIGNvb3JkID0ge31cclxuICAgICAgY29vcmQueCA9IGlcclxuICAgICAgY29vcmQueSA9IGpcclxuICAgICAgdmFyIGluZGV4ID0gY29vcmRfdG9faW5kZXgoY29vcmQsIHNpemUpXHJcblxyXG4gICAgICBpbmRleF9saXN0LnB1c2goaW5kZXgpXHJcbiAgICAgIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9uZV90ZXh0XycgKyBpbmRleCk7XHJcbiAgICAgIHpvbmVfdGV4dC5pbm5lckhUTUwgPSB6b25lX251bWJlciArICcoJyArIG1vZGlmaWNhdG9yICsgJyknO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2Fzc2lnbl96b25lJztcclxuICB0b1NlbmQuem9uZV9udW1iZXIgPSB6b25lX251bWJlcjtcclxuICB0b1NlbmQuaW5kZXhfbGlzdCA9IGluZGV4X2xpc3Q7XHJcbiAgdG9TZW5kLm1vZGlmaWNhdG9yID0gbW9kaWZpY2F0b3I7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduWm9uZShpbmRleCkge1xyXG4gIHZhciB6b25lX251bWJlciA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICB2YXIgbW9kaWZpY2F0b3IgPSBzZWFyY2hfbW9kaWZpY2F0b3IudmFsKCk7XHJcblxyXG4gIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9uZV90ZXh0XycgKyBpbmRleCk7XHJcbiAgem9uZV90ZXh0LmlubmVySFRNTCA9IHpvbmVfbnVtYmVyICsgJygnICsgbW9kaWZpY2F0b3IgKyAnKSc7XHJcblxyXG4gIHZhciBpbmRleF9saXN0ID0gW11cclxuICBpbmRleF9saXN0LnB1c2goaW5kZXgpXHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhc3NpZ25fem9uZSc7XHJcbiAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgdG9TZW5kLmluZGV4X2xpc3QgPSBpbmRleF9saXN0O1xyXG4gIHRvU2VuZC5tb2RpZmljYXRvciA9IG1vZGlmaWNhdG9yO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5Rm9nKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG4gIHZhciBpbmRleF9saXN0ID0gW107XHJcbiAgaW5kZXhfbGlzdC5wdXNoKGluZGV4KTtcclxuICB0b1NlbmQuaW5kZXhfbGlzdCA9IGluZGV4X2xpc3Q7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuXHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDEpIHtcclxuXHRcdHRvU2VuZC51cGRhdGVfdHlwZSA9ICdyZW1vdmUnO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0b1NlbmQudXBkYXRlX3R5cGUgPSAnYWRkJztcclxuXHR9XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ01vZGVDaGFuZ2UoKSB7XHJcbiAgaWYgKGdtX2NvbnRyb2xfbW9kICE9IDEpIHtcclxuICAgIC8vIHR1cm4gb24gZm9nIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDE7XHJcbiAgICBmb2dfYnV0dG9uLnRleHQoJ9CS0YvQutC7INCi0YPQvNCw0L0g0JLQvtC50L3RiycpO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2ldID09IDEpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF9jZWxsLnNyYyA9IEZPR19JTUFHRTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyB0dXJuIG9mZiBmb2cgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMDtcclxuICAgIGZvZ19idXR0b24udGV4dCgn0JLQutC7INCi0YPQvNCw0L0g0JLQvtC50L3RiycpO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2ldID09IDEpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF9jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gem9uZU1vZGVDaGFuZ2UoKSB7XHJcbiAgaWYgKGdtX2NvbnRyb2xfbW9kICE9IDIpIHtcclxuICAgIC8vIHR1cm4gb24gem9uZSBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAyO1xyXG4gICAgem9uZV9idXR0b24udGV4dCgn0JLRi9C60Lsg0JfQvtC90LDQu9GM0L3Ri9C5INGA0LXQttC40LwnKTtcclxuICAgIHpvbmVfbnVtYmVyX3NlbGVjdC5zaG93KCk7XHJcbiAgICBmb2dfem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgdW5mb2dfem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgc2VhcmNoX21vZGlmaWNhdG9yLnNob3coKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRpZiAoZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldID4gMCkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X3pvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uZV90ZXh0X1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF96b25lX3RleHQuaW5uZXJIVE1MID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldICsgJygnICsgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaV0gKyAnKSc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gYmFjayB0byBub3JtYWwgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAwO1xyXG4gICAgem9uZV9idXR0b24udGV4dCgn0JLQutC7INCX0L7QvdCw0LvRjNC90YvQuSDRgNC10LbQuNC8Jyk7XHJcbiAgICB6b25lX251bWJlcl9zZWxlY3QuaGlkZSgpO1xyXG4gICAgZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuICAgIHVuZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuICAgIHNlYXJjaF9tb2RpZmljYXRvci5oaWRlKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF96b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmVfdGV4dF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfem9uZV90ZXh0LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0fVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9nQ3VycmVudFpvbmUoKSB7XHJcbiAgdmFyIGN1cnJlbnRfem9uZSA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICBmb2dQYXJzZVpvbmUoMSwgY3VycmVudF96b25lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5mb2dDdXJyZW50Wm9uZSgpIHtcclxuICBmb2dQYXJzZVpvbmUoMCwgY3VycmVudF96b25lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9nUGFyc2Vab25lKG1vZCwgY3VycmVudF96b25lKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgaWYgKG1vZCA9PSAwKSB7XHJcbiAgICB0b1NlbmQudXBkYXRlX3R5cGUgPSAncmVtb3ZlJztcclxuICB9IGVsc2UgaWYgKG1vZCA9PSAxKSB7XHJcbiAgICB0b1NlbmQudXBkYXRlX3R5cGUgPSAnYWRkJztcclxuICB9XHJcbiAgdmFyIGluZGV4X2xpc3QgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSAqIGdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldID09IGN1cnJlbnRfem9uZSkge1xyXG4gICAgICBpbmRleF9saXN0LnB1c2goaSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRvU2VuZC5pbmRleF9saXN0ID0gaW5kZXhfbGlzdDtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuLy8gSGVscGVyIGNvb3JkaW5hdGUgcmVsYXRlZCBmdW5jdGlvbnNcclxuXHJcbmZ1bmN0aW9uIHRvcF9sZWZ0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKSB7XHJcbiAgdmFyIHRvUmV0ID0ge31cclxuICB0b1JldC54ID0gTWF0aC5taW4oY29vcmQxLngsIGNvb3JkMi54KVxyXG4gIHRvUmV0LnkgPSBNYXRoLm1pbihjb29yZDEueSwgY29vcmQyLnkpXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJvdHRvbV9yaWdodF9jb29yZChjb29yZDEsIGNvb3JkMikge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGgubWF4KGNvb3JkMS54LCBjb29yZDIueClcclxuICB0b1JldC55ID0gTWF0aC5tYXgoY29vcmQxLnksIGNvb3JkMi55KVxyXG4gIHJldHVybiB0b1JldFxyXG59XHJcblxyXG5mdW5jdGlvbiBjb29yZF90b19pbmRleChjb29yZCwgc2l6ZSkge1xyXG4gIHZhciBpbmRleCA9IGNvb3JkLnggKiBzaXplICsgY29vcmQueVxyXG4gIHJldHVybiBpbmRleFxyXG59XHJcblxyXG5mdW5jdGlvbiBpbmRleF90b19jb29yZGluYXRlcyhpbmRleCwgc2l6ZSkge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGguZmxvb3IoaW5kZXgvc2l6ZSlcclxuICB0b1JldC55ID0gaW5kZXggJSBzaXplXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmREaXN0YW5jZShpbmRleDEsIGluZGV4Mikge1xyXG4gIHZhciB4MSA9IE1hdGguZmxvb3IoaW5kZXgxL2dhbWVfc3RhdGUuc2l6ZSlcclxuICB2YXIgeTEgPSBpbmRleDEgJSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIHgyID0gTWF0aC5mbG9vcihpbmRleDIvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MiA9IGluZGV4MiAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgZGlzdGFuY2Vfc3F1YXJlZCA9ICh4MS14MikqKHgxLXgyKSArICh5MS15MikqKHkxLXkyKVxyXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChkaXN0YW5jZV9zcXVhcmVkKVxyXG4gIHJldHVybiBwYXJzZUZsb2F0KGRpc3RhbmNlKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0luUmFuZ2UoaW5kZXgxLCBpbmRleDIsIHJhbmdlKSB7XHJcbiAgdmFyIHgxID0gTWF0aC5mbG9vcihpbmRleDEvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MSA9IGluZGV4MSAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgeDIgPSBNYXRoLmZsb29yKGluZGV4Mi9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkyID0gaW5kZXgyICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciBkaXN0YW5jZSA9ICh4MS14MikqKHgxLXgyKSArICh5MS15MikqKHkxLXkyKVxyXG4gIHJldHVybiBkaXN0YW5jZSA8PSByYW5nZSpyYW5nZVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhbmdlKSB7XHJcbiAgdmFyIHNpemUgPSBnYW1lX3N0YXRlLnNpemVcclxuICB2YXIgeCA9IE1hdGguZmxvb3IoaW5kZXgvc2l6ZSlcclxuICB2YXIgeSA9IGluZGV4ICUgc2l6ZVxyXG4gIHZhciBjYW5kaWRhdGVfaW5kZXhfbGlzdCA9IFtdXHJcblxyXG4gIC8vY29uc29sZS5sb2coXCJ4OiBcIiArIHggKyBcIiB5OiBcIiArIHkgKyBcIiBpbmRleDogXCIgKyBpbmRleClcclxuXHJcbiAgZm9yIChsZXQgaSA9IE1hdGguZmxvb3IoLTEgKiByYW5nZSk7IGkgPD0gTWF0aC5jZWlsKHJhbmdlKTsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gTWF0aC5mbG9vcigtMSAqIHJhbmdlKTsgaiA8PSBNYXRoLmNlaWwocmFuZ2UpOyBqKyspIHtcclxuICAgICAgdmFyIGNhbmRfeCA9IHggKyBpXHJcbiAgICAgIHZhciBjYW5kX3kgPSB5ICsgalxyXG4gICAgICAvL2NvbnNvbGUubG9nKFwiY2FuZF94OiBcIiArIGNhbmRfeCArIFwiIGNhbmRfeTogXCIgKyBjYW5kX3kpXHJcbiAgICAgIGlmIChjYW5kX3ggPj0wICYmIGNhbmRfeCA8IHNpemUgJiYgY2FuZF95ID49MCAmJiBjYW5kX3kgPCBzaXplKSB7XHJcbiAgICAgICAgdmFyIGNhbmRfaW5kZXggPSBjYW5kX3gqc2l6ZSArIGNhbmRfeVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJjYW5kX2luZGV4OiBcIiArIGNhbmRfaW5kZXgpXHJcbiAgICAgICAgaWYgKGlzSW5SYW5nZShpbmRleCwgY2FuZF9pbmRleCwgcmFuZ2UpKSB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FuZF9pbmRleDogXCIgKyBjYW5kX2luZGV4ICsgXCJ3YXMgY29uc2lkZXJlZCBpbiByYW5nZVwiKVxyXG4gICAgICAgICAgY2FuZGlkYXRlX2luZGV4X2xpc3QucHVzaChjYW5kX2luZGV4KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY2FuZGlkYXRlX2luZGV4X2xpc3RcclxufVxyXG5cclxuZnVuY3Rpb24gbGluZV9mcm9tX2VuZHBvaW50cyhwb2ludDEsIHBvaW50Mikge1xyXG4gIHZhciBsaW5lID0ge31cclxuICBsaW5lLmEgPSAtMSoocG9pbnQxLnkgLSBwb2ludDIueSlcclxuICBsaW5lLmIgPSBwb2ludDEueCAtIHBvaW50Mi54XHJcbiAgbGluZS5jID0gLTEqKGxpbmUuYSAqIHBvaW50Mi54ICsgbGluZS5iICogcG9pbnQyLnkpXHJcbiAgcmV0dXJuIGxpbmVcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzdGFuY2VfdG9fbGluZShlbmRwb2ludDEsIGVuZHBvaW50Miwgc2l6ZSwgdGVzdHBvaW50KSB7XHJcbiAgdmFyIGVuZHBvaW50MV9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgZW5kcG9pbnQyX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG4gIHZhciB0ZXN0cG9pbnRfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyh0ZXN0cG9pbnQsIHNpemUpXHJcblxyXG4gIHZhciBsaW5lID0gbGluZV9mcm9tX2VuZHBvaW50cyhlbmRwb2ludDFfY29vcmQsIGVuZHBvaW50Ml9jb29yZClcclxuICBjb25zb2xlLmxvZyhsaW5lKVxyXG4gIGNvbnNvbGUubG9nKHRlc3Rwb2ludF9jb29yZClcclxuXHJcbiAgdmFyIGRpc3RhbmNlID0gTWF0aC5hYnMobGluZS5hKnRlc3Rwb2ludF9jb29yZC54ICsgbGluZS5iKnRlc3Rwb2ludF9jb29yZC55ICsgbGluZS5jKS9NYXRoLnNxcnQobGluZS5hKmxpbmUuYSArIGxpbmUuYipsaW5lLmIpXHJcblxyXG4gIGNvbnNvbGUubG9nKGRpc3RhbmNlKVxyXG4gIHJldHVybiBkaXN0YW5jZVxyXG59XHJcblxyXG5mdW5jdGlvbiBjZWxsc19vbl9saW5lKGVuZHBvaW50MSwgZW5kcG9pbnQyLCBzaXplKSB7XHJcbiAgdmFyIGVuZHBvaW50MV9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgZW5kcG9pbnQyX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG4gIHZhciBsaW5lID0gbGluZV9mcm9tX2VuZHBvaW50cyhlbmRwb2ludDFfY29vcmQsIGVuZHBvaW50Ml9jb29yZClcclxuXHJcbiAgdmFyIHNjYWxlID0gTWF0aC5tYXgoTWF0aC5hYnMobGluZS5hKSwgTWF0aC5hYnMobGluZS5iKSlcclxuICAvLyBuZWVkIHRvIGJlIHJldmVyc2VkISByZW1lbWJlciBsaW5lLmEgPSBkZWx0YSB5XHJcbiAgdmFyIHhfc3RlcCA9IGxpbmUuYi9zY2FsZVxyXG4gIHZhciB5X3N0ZXAgPSAtMSpsaW5lLmEvc2NhbGVcclxuICB2YXIgY3VycmVudF9wb2ludCA9IGVuZHBvaW50Ml9jb29yZFxyXG5cclxuICB2YXIgc2FmZXR5X2l0ZXIgPSAwXHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IFtdXHJcbiAgd2hpbGUgKE1hdGguYWJzKGN1cnJlbnRfcG9pbnQueCAtIGVuZHBvaW50MV9jb29yZC54KSA+IDAuNSB8fCBNYXRoLmFicyhjdXJyZW50X3BvaW50LnkgLSBlbmRwb2ludDFfY29vcmQueSkgPiAwLjUpIHtcclxuICAgIGN1cnJlbnRfcG9pbnQueCArPSB4X3N0ZXBcclxuICAgIGN1cnJlbnRfcG9pbnQueSArPSB5X3N0ZXBcclxuXHJcbiAgICB2YXIgY2VpbCA9IHt9XHJcbiAgICBjZWlsLnggPSBNYXRoLmNlaWwoY3VycmVudF9wb2ludC54KVxyXG4gICAgY2VpbC55ID0gTWF0aC5jZWlsKGN1cnJlbnRfcG9pbnQueSlcclxuICAgIHZhciBjZWlsX2luZGV4ID0gY29vcmRfdG9faW5kZXgoY2VpbCwgc2l6ZSlcclxuXHJcbiAgICB2YXIgZmxvb3IgPSB7fVxyXG4gICAgZmxvb3IueCA9IE1hdGguZmxvb3IoY3VycmVudF9wb2ludC54KVxyXG4gICAgZmxvb3IueSA9IE1hdGguZmxvb3IoY3VycmVudF9wb2ludC55KVxyXG4gICAgdmFyIGZsb29yX2luZGV4ID0gY29vcmRfdG9faW5kZXgoZmxvb3IsIHNpemUpXHJcblxyXG5cclxuICAgIGNhbmRpZGF0ZV9jZWxscy5wdXNoKGNlaWxfaW5kZXgpXHJcbiAgICBpZiAoY2VpbF9pbmRleCAhPSBmbG9vcl9pbmRleCkge1xyXG4gICAgICBjYW5kaWRhdGVfY2VsbHMucHVzaChmbG9vcl9pbmRleClcclxuICAgIH1cclxuXHJcbiAgICBzYWZldHlfaXRlciA9IHNhZmV0eV9pdGVyICsgMVxyXG4gICAgaWYgKHNhZmV0eV9pdGVyID4gNTApIHtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjYW5kaWRhdGVfY2VsbHNcclxufVxyXG5cclxuLy8gYW5pbWF0aW9ucywgY29udGFpbmVyIG1haW50YW5jZVxyXG5cclxuZnVuY3Rpb24gY2xlYXJfY29udGFpbmVycygpIHtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKCkge1xyXG4gIHRpbnlfYW5pbWF0aW9uKGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lcik7XHJcbiAgdGlueV9hbmltYXRpb24od2VhcG9uX2luZm9fY29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGlueV9hbmltYXRpb24oY29udGFpbmVyKSB7XHJcbiAgY29udGFpbmVyLmFkZENsYXNzKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICB9LCA1MCk7XHJcbn1cclxuXHJcbi8vIGFkZGluZyBvYmplY3RzLCBjaGFyYWN0ZXJzXHJcblxyXG5mdW5jdGlvbiBhZGRfb2JqZWN0KGJvYXJkX2luZGV4KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBidXR0b25fY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBidXR0b25fY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiYWRkLW9iamVjdC1idXR0b24tY29udGFpbmVyXCI7XHJcblxyXG4gIHZhciBidXR0b25fYWRkX2NoYXJhY3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uX2FkZF9jaGFyYWN0ZXIuaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMINC/0LXRgNGB0L7QvdCw0LbQsFwiO1xyXG4gIGJ1dHRvbl9hZGRfY2hhcmFjdGVyLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGFkZF9jaGFyYWN0ZXIoYm9hcmRfaW5kZXgpO1xyXG4gIH07XHJcblxyXG4gIHZhciBidXR0b25fYWRkX29ic3RhY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b25fYWRkX29ic3RhY2xlLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1XCI7XHJcbiAgYnV0dG9uX2FkZF9vYnN0YWNsZS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpO1xyXG4gIH07XHJcblxyXG4gIGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9jaGFyYWN0ZXIpO1xyXG4gIGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9vYnN0YWNsZSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b25fY29udGFpbmVyKTtcclxuXHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgb2JzdGFjbGVfbnVtYmVyKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9vYnN0YWNsZSc7XHJcbiAgdG9TZW5kLmNlbGxfaWQgPSBpbmRleDtcclxuICB0b1NlbmQub2JzdGFjbGVfbnVtYmVyID0gb2JzdGFjbGVfbnVtYmVyICsgMTtcclxuICB0b1NlbmQub2JzdGFjbGVfbmFtZSA9IG9ic3RhY2xlX2xpc3Rbb2JzdGFjbGVfbnVtYmVyXTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2VsZWN0LmlkID0gXCJvYnN0YWNsZV9jaG9zZW5cIjtcclxuICBzZWxlY3QuY2xhc3NOYW1lID0gXCJvYmplY3Rfc2VsZWN0XCJcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYnN0YWNsZV9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gb2JzdGFjbGVfbGlzdFtpXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaTtcclxuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgfVxyXG5cclxuICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b24uaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMXCI7XHJcbiAgYnV0dG9uLmJvYXJkX2luZGV4ID0gYm9hcmRfaW5kZXg7XHJcbiAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGJ1dHRvbiA9IGV2ZW50LnRhcmdldDtcclxuICAgIHZhciBvYnN0YWNsZV9udW1iZXIgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9ic3RhY2xlX2Nob3NlblwiKS52YWx1ZSk7XHJcblxyXG4gICAgYWRkX29ic3RhY2xlX2NvbW1hbmQoYnV0dG9uLmJvYXJkX2luZGV4LCBvYnN0YWNsZV9udW1iZXIpXHJcblxyXG4gICAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgfVxyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHNlbGVjdCk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b24pO1xyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZF9jaGFyYWN0ZXIoYm9hcmRfaW5kZXgpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2VsZWN0LmlkID0gXCJjaGFyYWN0ZXJfY2hvc2VuXCI7XHJcbiAgc2VsZWN0LmNsYXNzTmFtZSA9IFwib2JqZWN0X3NlbGVjdFwiXHJcblxyXG4gIHZhciBwbGF5ZXJzX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHBsYXllcnNfb3B0Z3JvdXAuaWQgPSBcInBsYXllcnNfb3B0Z3JvdXBcIlxyXG4gIHBsYXllcnNfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHBsYXllcnNfb3B0Z3JvdXAubGFiZWwgPSBcItCY0LPRgNC+0LrQuFwiXHJcblxyXG4gIHZhciBwZW5ndWluX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHBlbmd1aW5fb3B0Z3JvdXAuaWQgPSBcInBlbmd1aW5fb3B0Z3JvdXBcIlxyXG4gIHBlbmd1aW5fb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHBlbmd1aW5fb3B0Z3JvdXAubGFiZWwgPSBcItCf0LjQvdCz0LLQuNC90YtcIlxyXG5cclxuICB2YXIgc2hpZWxkX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHNoaWVsZF9vcHRncm91cC5pZCA9IFwic2hpZWxkX29wdGdyb3VwXCJcclxuICBzaGllbGRfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHNoaWVsZF9vcHRncm91cC5sYWJlbCA9IFwi0KHQutCy0LDQtNC+0LLRhtGLXCJcclxuXHJcbiAgdmFyIHN3b3JkX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHN3b3JkX29wdGdyb3VwLmlkID0gXCJzd29yZF9vcHRncm91cFwiXHJcbiAgc3dvcmRfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHN3b3JkX29wdGdyb3VwLmxhYmVsID0gXCLQnNC10YfQuFwiXHJcblxyXG4gIHZhciBtdXRhbnRfb3B0Z3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0Z3JvdXBcIik7XHJcbiAgbXV0YW50X29wdGdyb3VwLmlkID0gXCJtdXRhbnRfb3B0Z3JvdXBcIlxyXG4gIG11dGFudF9vcHRncm91cC5jbGFzc05hbWUgPSBcImNoYXJhY3Rlcl9vcHRncm91cFwiXHJcbiAgbXV0YW50X29wdGdyb3VwLmxhYmVsID0gXCLQnNGD0YLQsNC90YLRi1wiXHJcblxyXG4gIHZhciBhbmltYV9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBhbmltYV9vcHRncm91cC5pZCA9IFwiYW5pbWFfb3B0Z3JvdXBcIlxyXG4gIGFuaW1hX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBhbmltYV9vcHRncm91cC5sYWJlbCA9IFwi0JfQstC10YDQuFwiXHJcblxyXG4gIHZhciBvdGhlcl9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBvdGhlcl9vcHRncm91cC5pZCA9IFwib3RoZXJfb3B0Z3JvdXBcIlxyXG4gIG90aGVyX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBvdGhlcl9vcHRncm91cC5sYWJlbCA9IFwi0J7RgdGC0LDQu9GM0L3Ri9C1XCJcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IGNoYXJhY3Rlcl9saXN0W2ldO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpO1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9ncm91cCA9IGdyb3VwX2xpc3RbaV1cclxuICAgIHN3aXRjaChjaGFyYWN0ZXJfZ3JvdXApIHtcclxuICAgICAgY2FzZSBcInBsYXllclwiOlxyXG4gICAgICAgIHBsYXllcnNfb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwicGVuZ3VpblwiOlxyXG4gICAgICAgIHBlbmd1aW5fb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwic2hpZWxkXCI6XHJcbiAgICAgICAgc2hpZWxkX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInN3b3JkXCI6XHJcbiAgICAgICAgc3dvcmRfb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibXV0YW50XCI6XHJcbiAgICAgICAgbXV0YW50X29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImFuaW1hXCI6XHJcbiAgICAgICAgYW5pbWFfb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIG90aGVyX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG4gIGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG4gIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcbiAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyX2Nob3NlblwiKS52YWx1ZSk7XHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX2NoYXJhY3Rlcic7XHJcbiAgICB0b1NlbmQuY2VsbF9pZCA9IGJ1dHRvbi5ib2FyZF9pbmRleDtcclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlciArIDE7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBjaGFyYWN0ZXJfbGlzdFtjaGFyYWN0ZXJfbnVtYmVyXTtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgICBjbGVhcl9jb250YWluZXJzKDApXHJcbiAgfVxyXG5cclxuICBzZWxlY3QuYXBwZW5kKHBsYXllcnNfb3B0Z3JvdXApO1xyXG4gIHNlbGVjdC5hcHBlbmQoc2hpZWxkX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKHN3b3JkX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKG11dGFudF9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChhbmltYV9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChwZW5ndWluX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKG90aGVyX29wdGdyb3VwKTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHNlbGVjdCk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b24pO1xyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9ic3RhY2xlX251bWJlcl90b19ib2FyZF9udW1iZXIob2JzdGFjbGVfbnVtYmVyKSB7XHJcbiAgcmV0dXJuIC0xKihvYnN0YWNsZV9udW1iZXIgKyAxKTtcclxufVxyXG5cclxuLy8gUGljdHVyZS9hdmF0YXIgbWFuYWdlbWVudFxyXG5cclxuZnVuY3Rpb24gc3Bpcml0X2ltYWdlKGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICByZXR1cm4gU1BJUklUX0lNQUdFO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcm1vcl9pbWFnZShjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgcmV0dXJuIEFSTU9SX0lNQUdFO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dPclBpYyhjZWxsX2lkKSB7XHJcbiAgdmFyIHBpY3R1cmVfbmFtZSA9IEZPR19JTUFHRTtcclxuICBpZiAoKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2NlbGxfaWRdICE9IDEpfHwobXlfcm9sZSA9PSAnZ20nKSkge1xyXG4gICAgdmFyIGNoYXJfaWQgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NlbGxfaWRdXHJcbiAgICBwaWN0dXJlX25hbWUgPSBnZXRfb2JqZWN0X3BpY3R1cmUoY2hhcl9pZCk7XHJcbiAgICBpZiAoY2hhcl9pZCA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyX2lkXSAhPSBcImFsbFwiICYmIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcl9pZF0gIT0gbXlfbmFtZSkge1xyXG4gICAgICBwaWN0dXJlX25hbWUgPSBnZXRfb2JqZWN0X3BpY3R1cmUoMCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuICByZXR1cm4gcGljdHVyZV9uYW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5Rm9nKCkge1xyXG5cdGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuXHR2YXIgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIGluZm8uaW5uZXJIVE1MID0gJ9Cc0Ysg0L3QtSDQt9C90LDQtdC8LCDRh9GC0L4g0Y3RgtC+INGC0LDQutC+0LUuINCV0YHQu9C4INCx0Ysg0LzRiyDQt9C90LDQu9C4INGH0YLQviDRjdGC0L4g0YLQsNC60L7QtSwg0L3QviDQvNGLINC90LUg0LfQvdCw0LXQvC4nO1xyXG5cclxuXHR2YXIgZm9nX3BpY3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIGZvZ19waWN0dXJlLnNyYyA9IFFVRVNUSU9OX0lNQUdFO1xyXG4gIGZvZ19waWN0dXJlLnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBmb2dfcGljdHVyZS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuXHRjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGluZm8pO1xyXG5cdGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoZm9nX3BpY3R1cmUpO1xyXG5cclxudGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfb2JqZWN0X3BpY3R1cmUoaW5kZXhfaW5fYm9hcmRfc3RhdGUpIHtcclxuICB2YXIgaW1hZ2UgPSBFTVBUWV9DRUxMX1BJQztcclxuICB2YXIgaW5kZXhfaW5fYmFzZTtcclxuICBpZiAoaW5kZXhfaW5fYm9hcmRfc3RhdGUgPiAwKSB7XHJcbiAgICBpbmRleF9pbl9iYXNlID0gaW5kZXhfaW5fYm9hcmRfc3RhdGU7XHJcbiAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baW5kZXhfaW5fYmFzZV07XHJcbiAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwiY2hpYmlfYXZhdGFyXCIpKSB7XHJcbiAgICAgIGltYWdlID0gY2hhcmFjdGVyLmNoaWJpX2F2YXRhcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGltYWdlID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGluZGV4X2luX2JvYXJkX3N0YXRlIDwgMCkge1xyXG4gICAgaW5kZXhfaW5fYmFzZSA9IGluZGV4X2luX2JvYXJkX3N0YXRlICogKC0xKTtcclxuICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9baW5kZXhfaW5fYmFzZV07XHJcbiAgICBpbWFnZSA9IG9ic3RhY2xlLmF2YXRhcjtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbWFnZTtcclxufVxyXG5cclxuLy8gTW92ZSByZWxhdGVkIGZ1bmN0aW9uc1xyXG5cclxuZnVuY3Rpb24gc2V0dXBfbW92ZV9zZW5kX29iamVjdChmcm9tX2luZGV4LCB0b19pbmRleCwgY2hhcmFjdGVyX251bWJlciwgZGlzdGFuY2UpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnbW92ZV9jaGFyYWN0ZXInO1xyXG4gIHRvU2VuZC5mcm9tX2luZGV4ID0gZnJvbV9pbmRleDtcclxuICB0b1NlbmQudG9faW5kZXggPSB0b19pbmRleDtcclxuICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9hdmF0YXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXS5hdmF0YXI7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuZGlzdGFuY2UgPSBkaXN0YW5jZTtcclxuICB0b1NlbmQubGVmdF9zaGllbGQgPSAwO1xyXG4gIHRvU2VuZC5taW5lc19leHBsb2RlZCA9IFtdO1xyXG4gIHRvU2VuZC5taW5lc19kYW1hZ2UgPSAwO1xyXG4gIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQgPSBbXTtcclxuICByZXR1cm4gdG9TZW5kO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVNb3ZlRm9yY2VGaWVsZFN0YXR1cyhjaG9zZW5fY2hhcmFjdGVyX2luZGV4LCB0b19pbmRleCwgdG9TZW5kKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uaGFzT3duUHJvcGVydHkoXCJmb3JjZV9maWVsZF90YXJnZXRcIikpIHtcclxuICAgIHZhciBzaGllbGRfaW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmZvcmNlX2ZpZWxkX3RhcmdldC5zaGllbGRfaW5kZXhcclxuICAgIGlmKCFnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLmNlbGxzX3Byb3RlY3RlZC5pbmNsdWRlcyh0b19pbmRleCkpIHsvLyDQv9C+0LrQuNC90YPQuyDQt9C+0L3RgyDQt9Cw0YnQuNGC0YtcclxuICAgICAgdG9TZW5kLmxlZnRfc2hpZWxkID0gMVxyXG4gICAgICB0b1NlbmQuc2hpZWxkX2luZGV4ID0gc2hpZWxkX2luZGV4XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0b1NlbmQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZU1vdmVPd25JbnZpc2liaWxpdHkoY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCwgdG9faW5kZXgsIHRvU2VuZCwgaW1tZWRpYXRlX25iaCwgZXh0ZW5kZWRfbmJoKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0gIT0gXCJhbGxcIikgeyAvL3VzZXIgaXMgaW52aXNpYmxlXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4dGVuZGVkX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBjdXJyZW50X2NlbGwgPSBleHRlbmRlZF9uYmhbaV07XHJcbiAgICAgICAgdmFyIG9iamVjdF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2N1cnJlbnRfY2VsbF07XHJcbiAgICAgICAgaWYgKG9iamVjdF9udW1iZXIgPiAwICYmIG9iamVjdF9udW1iZXIgIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCkgeyAvLyB0aGVyZSBhcmUgY2hhcmFjdGVycyB0aGVyZVxyXG4gICAgICAgICAgICBpZiAoaW1tZWRpYXRlX25iaC5pbmNsdWRlcyhjdXJyZW50X2NlbGwpKSB7XHJcbiAgICAgICAgICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5wdXNoKGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciByb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW29iamVjdF9udW1iZXJdLmludGVsbGlnZW5jZSk7XHJcbiAgICAgICAgICAgICAgaWYgKHJvbGwgPj0gaW52aXNpYmlsaXR5X2RldGVjdGlvbl90aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChjaG9zZW5fY2hhcmFjdGVyX2luZGV4KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRvU2VuZDtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTW92ZU90aGVyc0ludmlzaWJpbGl0eShjaG9zZW5fY2hhcmFjdGVyX2luZGV4LCB0b19pbmRleCwgdG9TZW5kLCBpbW1lZGlhdGVfbmJoLCBleHRlbmRlZF9uYmgpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGV4dGVuZGVkX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgY3VycmVudF9jZWxsID0gZXh0ZW5kZWRfbmJoW2ldO1xyXG4gICAgICB2YXIgb2JqZWN0X251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXTtcclxuICAgICAgaWYgKG9iamVjdF9udW1iZXIgPiAwICYmIG9iamVjdF9udW1iZXIgIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCkgey8vIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIHRoZXJlXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbb2JqZWN0X251bWJlcl0gIT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgaWYgKGltbWVkaWF0ZV9uYmguaW5jbHVkZXMoY3VycmVudF9jZWxsKSkge1xyXG4gICAgICAgICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkLnB1c2gob2JqZWN0X251bWJlcik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICAgICAgICBpZiAocm9sbCA+PSBpbnZpc2liaWxpdHlfZGV0ZWN0aW9uX3RocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChvYmplY3RfbnVtYmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIH1cclxuICByZXR1cm4gdG9TZW5kO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVNb3ZlTGFuZG1pbmVzRXhwbG9kZWQoY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCwgdG9faW5kZXgsIHRvU2VuZCwgaW1tZWRpYXRlX25iaCkge1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGltbWVkaWF0ZV9uYmgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGN1cnJlbnRfY2VsbCA9IGltbWVkaWF0ZV9uYmhbaV07XHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMoY3VycmVudF9jZWxsKSkge1xyXG4gICAgICAgIHRvU2VuZC5taW5lc19leHBsb2RlZC5wdXNoKGN1cnJlbnRfY2VsbClcclxuICAgICAgICB0b1NlbmQubWluZXNfZGFtYWdlID0gdG9TZW5kLm1pbmVzX2RhbWFnZSArIHJvbGxfeChtaW5lc18xX2Rpc3RhbmNlX2RhbWFnZSk7XHJcbiAgICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRvU2VuZDtcclxufVxyXG5cclxuLy8gTW92ZSAtIERlbGV0ZSAtIFNlbGVjdFxyXG5cclxuZnVuY3Rpb24gbW92ZV9jaGFyYWN0ZXIodG9faW5kZXgsIHRvX2NlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwOyAvLyBlbmQgdGhlIG1vdGlvblxyXG4gIHZhciBjaG9zZW5faW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgZGlzdGFuY2UgPSBmaW5kRGlzdGFuY2UodG9faW5kZXgsIGNob3Nlbl9pbmRleClcclxuICB2YXIgbWF4X2Rpc3RhbmNlID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdXHJcblxyXG4gIGlmIChkaXN0YW5jZSA8PSBtYXhfZGlzdGFuY2UpIHtcclxuICAgIGlmICghKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxICYmIGRpc3RhbmNlID4gMS42KSkge1xyXG4gICAgICB2YXIgdG9TZW5kID0gc2V0dXBfbW92ZV9zZW5kX29iamVjdChjaG9zZW5faW5kZXgsIHRvX2luZGV4LCBjaG9zZW5fY2hhcmFjdGVyX2luZGV4LCBkaXN0YW5jZSk7XHJcblxyXG4gICAgICB2YXIgaW1tZWRpYXRlX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgMS42KTtcclxuICAgICAgdmFyIGV4dGVuZGVkX2ludmlzaWJpbGl0eV9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIGludmlzaWJpbGl0eV9kZXRlY3Rpb25fcmFkaXVzKTtcclxuXHJcbiAgICAgIHRvU2VuZCA9IHVwZGF0ZU1vdmVGb3JjZUZpZWxkU3RhdHVzKGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgsIHRvX2luZGV4LCB0b1NlbmQpO1xyXG4gICAgICB0b1NlbmQgPSB1cGRhdGVNb3ZlT3duSW52aXNpYmlsaXR5KGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgsIHRvX2luZGV4LCB0b1NlbmQsIGltbWVkaWF0ZV9uYmgsIGV4dGVuZGVkX2ludmlzaWJpbGl0eV9uYmgpO1xyXG4gICAgICB0b1NlbmQgPSB1cGRhdGVNb3ZlT3RoZXJzSW52aXNpYmlsaXR5KGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgsIHRvX2luZGV4LCB0b1NlbmQsIGltbWVkaWF0ZV9uYmgsIGV4dGVuZGVkX2ludmlzaWJpbGl0eV9uYmgpO1xyXG4gICAgICB0b1NlbmQgPSB1cGRhdGVNb3ZlTGFuZG1pbmVzRXhwbG9kZWQoY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCwgdG9faW5kZXgsIHRvU2VuZCwgaW1tZWRpYXRlX25iaCk7XHJcblxyXG4gICAgICBjbGVhcl9jb250YWluZXJzKCk7XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgICAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gdG9faW5kZXhcclxuICAgICAgdmFyIHRvX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgdG9faW5kZXgpO1xyXG4gICAgICBjaGFyYWN0ZXJfY2hvc2VuLmNlbGwgPSB0b19jZWxsXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCSINCx0L7RjiDQvdGD0LbQvdC+INC00LLQuNCz0LDRgtGM0YHRjyDQv9C+0YHRgtGD0L/QsNGC0LXQu9GM0L3QviAoMS0xLjUg0LrQu9C10YLQutC4KVwiKVxyXG4gICAgICB1bmRvX3NlbGVjdGlvbigpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0J/QvtC70LXQs9GH0LUsINC80YHRjNC1INCR0L7Qu9GCXCIpXHJcbiAgICB1bmRvX3NlbGVjdGlvbigpXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlX2NoYXJhY3RlcihpbmRleCwgY2hhcmFjdGVyX251bWJlcikge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdkZWxldGVfb2JqZWN0JztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2Vfd2VhcG9uKGNoYXJhY3Rlcl9udW1iZXIsIHdlYXBvbl9pbmRleCkge1xyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltjaGFyYWN0ZXJfbnVtYmVyXSA9IHdlYXBvbl9pbmRleFxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4ud2VhcG9uX2lkID0gd2VhcG9uX2luZGV4XHJcblxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1t3ZWFwb25faW5kZXhdXHJcblxyXG4gIHZhciB3ZWFwb25fbWluaV9kaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWFwb25fbWluaV9kaXNwbGF5XCIpO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3JjID0gd2VhcG9uLmF2YXRhcjtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheV93ZWFwb25fZGV0YWlsZWQod2VhcG9uX2luZGV4LCBjb250YWluZXIsIHNob3dJbWFnZSkge1xyXG4gIHZhciBkZWZhdWx0X3dlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW3dlYXBvbl9pbmRleF1cclxuXHJcbiAgdmFyIHdlYXBvbl9yYW5nZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHdlYXBvbl9yYW5nZV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fcmFuZ2VfZGlzcGxheVwiO1xyXG4gIHdlYXBvbl9yYW5nZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JTQsNC70YzQvdC+0YHRgtGMOiBcIiArIGRlZmF1bHRfd2VhcG9uLnJhbmdlXHJcblxyXG4gIHZhciB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgd2VhcG9uX2RhbWFnZV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fZGFtYWdlX2Rpc3BsYXlcIjtcclxuICB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQo9GA0L7QvTogXCIgKyBkZWZhdWx0X3dlYXBvbi5kYW1hZ2VbMF0gKyAnZCcgKyBkZWZhdWx0X3dlYXBvbi5kYW1hZ2VbMV1cclxuXHJcbiAgdmFyIHdlYXBvbl9uYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgd2VhcG9uX25hbWVfZGlzcGxheS5pZCA9IFwid2VhcG9uX25hbWVfZGlzcGxheVwiO1xyXG4gIHdlYXBvbl9uYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gZGVmYXVsdF93ZWFwb24ubmFtZVxyXG5cclxuICBpZiAoc2hvd0ltYWdlKSB7XHJcbiAgICB2YXIgd2VhcG9uX2F2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5pZCA9IFwid2VhcG9uX2F2YXRhcl9kaXNwbGF5XCJcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zcmMgPSBkZWZhdWx0X3dlYXBvbi5hdmF0YXI7XHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcbiAgfVxyXG4gIGNvbnRhaW5lci5hcHBlbmQod2VhcG9uX25hbWVfZGlzcGxheSlcclxuICBpZiAoc2hvd0ltYWdlKSB7XHJcbiAgICBjb250YWluZXIuYXBwZW5kKHdlYXBvbl9hdmF0YXJfZGlzcGxheSlcclxuICB9XHJcbiAgY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fcmFuZ2VfZGlzcGxheSlcclxuICBjb250YWluZXIuYXBwZW5kKHdlYXBvbl9kYW1hZ2VfZGlzcGxheSlcclxuICBjb250YWluZXIuc2hvdygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlfYXJtb3JfZGV0YWlsZWQoY2hhcmFjdGVyX251bWJlciwgY29udGFpbmVyKSB7XHJcbiAgdmFyIEtEX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgdmFyIEtEX3ZhbHVlID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1tjaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbY2hhcmFjdGVyX251bWJlcl0pXHJcbiAgS0RfZGlzcGxheS5pbm5lckhUTUwgPSBcItCa0JQ6IFwiICsgS0RfdmFsdWU7XHJcblxyXG4gIHZhciBtZWxlZV9yZXNpc3RfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB2YXIgbWVsZWVfcmVzaXN0ID0gY2hhcmFjdGVyX3N0YXRlLm1lbGVlX3Jlc2lzdFtjaGFyYWN0ZXJfbnVtYmVyXSoxMDA7XHJcbiAgbWVsZWVfcmVzaXN0X2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQnNC40LvQu9C4INGA0LXQt9C40YHRgjogXCIgKyBtZWxlZV9yZXNpc3QgKyBcIiVcIjtcclxuXHJcbiAgdmFyIGJ1bGxldF9yZXNpc3RfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB2YXIgYnVsbGV0X3Jlc2lzdCA9IGNoYXJhY3Rlcl9zdGF0ZS5idWxsZXRfcmVzaXN0W2NoYXJhY3Rlcl9udW1iZXJdKjEwMDtcclxuICBidWxsZXRfcmVzaXN0X2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQodGC0YDQtdC70LrQvtCy0YvQuSDRgNC10LfQuNGB0YI6IFwiICsgYnVsbGV0X3Jlc2lzdCArIFwiJVwiO1xyXG5cclxuICB2YXIgZXZhZGVfYm9udXNfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBldmFkZV9ib251c19kaXNwbGF5LmlubmVySFRNTCA9IFwi0KPQutC70L7QvdC10L3QuNC1OiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgdmFyIGRlZmVuc2l2ZV9hZHZhbnRhZ2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBkZWZlbnNpdmVfYWR2YW50YWdlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQo9GP0LfQstC40LzQvtGB0YLRjDogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZChLRF9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kKG1lbGVlX3Jlc2lzdF9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kKGJ1bGxldF9yZXNpc3RfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZChldmFkZV9ib251c19kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kKGRlZmVuc2l2ZV9hZHZhbnRhZ2VfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLnNob3coKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheV9zcGlyaXRfZGV0YWlsZWQoY2hhcmFjdGVyX251bWJlciwgY29udGFpbmVyKSB7XHJcbiAgdmFyIGF0dGFja19ib251c19kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGF0dGFja19ib251c19kaXNwbGF5LmlubmVySFRNTCA9IFwi0JHQvtC90YPRgSDQsNGC0LDQutC4OiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIHZhciBkYW1hZ2VfYm9udXNfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBkYW1hZ2VfYm9udXNfZGlzcGxheS5pbm5lckhUTUwgPSBcItCR0L7QvdGD0YEg0YPRgNC+0L3QsDogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICB2YXIgdW5pdmVyc2FsX2JvbnVzX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgdW5pdmVyc2FsX2JvbnVzX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQktGB0LXQvtCx0YnQuNC5INCx0L7QvdGD0YE6IFwiICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgdmFyIG1lbGVlX2FkdmFudGFnZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIG1lbGVlX2FkdmFudGFnZV9kaXNwbGF5LmlubmVySFRNTCA9IFwiTWVsZWUgYWR2OiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIHZhciByYW5nZWRfYWR2YW50YWdlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgcmFuZ2VkX2FkdmFudGFnZV9kaXNwbGF5LmlubmVySFRNTCA9IFwiUmFuZ2VkIGFkdjogXCIgKyBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZChhdHRhY2tfYm9udXNfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZChkYW1hZ2VfYm9udXNfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZCh1bml2ZXJzYWxfYm9udXNfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZChtZWxlZV9hZHZhbnRhZ2VfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZChyYW5nZWRfYWR2YW50YWdlX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5zaG93KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdF9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcblxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IFwiYWxsXCIgfHwgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSBteV9uYW1lKSB7XHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gaW5kZXhcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNlbGwgPSBjZWxsXHJcblxyXG4gIGxldCBuYW1lID0gY2hhcmFjdGVyLm5hbWU7XHJcbiAgbGV0IGF2YXRhciA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcblxyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgbmFtZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIG5hbWVfZGlzcGxheS5pbm5lckhUTUwgPSBuYW1lO1xyXG5cclxuICB2YXIgYXZhdGFyX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgdmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuY2xhc3NMaXN0LmFkZChcImF2YXRhclwiKTtcclxuXHJcbiAgYXZhdGFyX2NvbnRhaW5lci5hcHBlbmRDaGlsZChhdmF0YXJfZGlzcGxheSlcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChuYW1lX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYXZhdGFyX2NvbnRhaW5lcik7XHJcblxyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIiB8fCBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcblxyXG4gICAgYXZhdGFyX2Rpc3BsYXkub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBzaG93X21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIGF2YXRhcl9kaXNwbGF5Lm9ubW91c2VlbnRlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICB2YXIgbWFpbl9hY3Rpb24gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIGJvbnVzX2FjdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIG1vdmVfYWN0aW9uID0gTWF0aC5mbG9vcihjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0pXHJcblxyXG4gICAgICB2YXIgbWFpbl9hY3Rpb25fZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgbWFpbl9hY3Rpb25fZGlzcGxheS5pZCA9IFwibWFpbl9hY3Rpb25fZGlzcGxheVwiO1xyXG4gICAgICBtYWluX2FjdGlvbl9kaXNwbGF5LmlubmVySFRNTCA9IFwi0J7RgdC90L7QstC90YvRhTogXCIgKyBtYWluX2FjdGlvblxyXG5cclxuICAgICAgdmFyIGJvbnVzX2FjdGlvbl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICBib251c19hY3Rpb25fZGlzcGxheS5pZCA9IFwiYm9udXNfYWN0aW9uX2Rpc3BsYXlcIjtcclxuICAgICAgYm9udXNfYWN0aW9uX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQkdC+0L3Rg9GB0L3Ri9GFOiBcIiArIGJvbnVzX2FjdGlvblxyXG5cclxuICAgICAgdmFyIG1vdmVfYWN0aW9uX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgIG1vdmVfYWN0aW9uX2Rpc3BsYXkuaWQgPSBcIm1vdmVfYWN0aW9uX2Rpc3BsYXlcIjtcclxuICAgICAgbW92ZV9hY3Rpb25fZGlzcGxheS5pbm5lckhUTUwgPSBcItCf0LXRgNC10LTQstC40LbQtdC90LjQtTogXCIgKyBtb3ZlX2FjdGlvblxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gIT0gXCJhbGxcIikgey8vINCyINC40L3QstC40LfQtVxyXG4gICAgICAgIHZhciBpbnZpc2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICAgICAgaW52aXNlX2Rpc3BsYXkuc3JjID0gSU5WSVNFX0lNQUdFO1xyXG4gICAgICAgIGludmlzZV9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuICAgICAgICBpbnZpc2VfZGlzcGxheS5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhaW1cIikpIHsvLyAg0J/RgNC40YbQtdC70LXQvVxyXG4gICAgICAgIHZhciBhaW1fZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICAgICAgYWltX2Rpc3BsYXkuc3JjID0gQUlNX0lNQUdFO1xyXG4gICAgICAgIGFpbV9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuICAgICAgICBhaW1fZGlzcGxheS5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgfVxyXG5cclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChtYWluX2FjdGlvbl9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKGJvbnVzX2FjdGlvbl9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKG1vdmVfYWN0aW9uX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoaW52aXNlX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYWltX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5zaG93KClcclxuICAgIH1cclxuXHJcbiAgICBhdmF0YXJfZGlzcGxheS5vbm1vdXNlbGVhdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuaGlkZSgpXHJcbiAgICB9XHJcblxyXG4gIHZhciBzdHJlbmd0aF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHN0cmVuZ3RoX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCJD0LjQu9CwOiBcIiArIGNoYXJhY3Rlci5zdHJlbmd0aDtcclxuXHJcbiAgdmFyIHN0YW1pbmFfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBzdGFtaW5hX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQotC10LvQvtGB0LvQvtC20LXQvdC40LU6IFwiICsgY2hhcmFjdGVyLnN0YW1pbmE7XHJcblxyXG4gIHZhciBhZ2lsaXR5X2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgYWdpbGl0eV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JvQvtCy0LrQvtGB0YLRjDogXCIgKyBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcbiAgdmFyIGludGVsbGlnZW5jZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGludGVsbGlnZW5jZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdGC0LXQu9C70LXQutGCOiBcIiArIGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcblxyXG4gIHZhciBocF9wZXJjZW50ID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0pL3BhcnNlRmxvYXQoSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSlcclxuICBocF9wZXJjZW50ID0gTWF0aC5mbG9vcihocF9wZXJjZW50KjEwMClcclxuXHJcbiAgdmFyIEhQX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgSFBfZGlzcGxheS5pZCA9IFwiSFBfZGlzcGxheVwiO1xyXG4gIEhQX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQpdCfOiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSArIFwiIChcIiArIGhwX3BlcmNlbnQgKyBcIiUpXCI7XHJcblxyXG4gIHZhciB0aXJlZF9wZXJjZW50ID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSkvcGFyc2VGbG9hdChzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgdGlyZWRfcGVyY2VudCA9IE1hdGguZmxvb3IodGlyZWRfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciB0aXJlZF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaWQgPSBcInRpcmVkX2Rpc3BsYXlcIjtcclxuICB0aXJlZF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JLRi9C90L7RgdC70LjQstC+0YHRgtGMOiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2NoYXJhY3Rlcl9udW1iZXJdICsgXCIgKFwiICsgdGlyZWRfcGVyY2VudCArIFwiJSlcIjtcclxuXHJcbiAgdmFyIGluaXRpYXRpdmVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBpbml0aWF0aXZlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQmNC90LjRhtC40LDRgtC40LLQsDogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtjaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzdHJlbmd0aF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHN0YW1pbmFfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChhZ2lsaXR5X2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoaW50ZWxsaWdlbmNlX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoSFBfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZCh0aXJlZF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGluaXRpYXRpdmVfZGlzcGxheSk7XHJcblxyXG4gIHZhciBtb3ZlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgbW92ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQn9C10YDQtdC80LXRidC10L3QuNC1XCI7XHJcbiAgbW92ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBtb3ZlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICBtb3ZlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBjaGFyYWN0ZXJfcGlja2VkID0gZXZlbnQudGFyZ2V0XHJcbiAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2hhcmFjdGVyX3BpY2tlZC5pbmRleF07XHJcbiAgICB2YXIgbW92ZV9hY3Rpb25zX2xlZnQgPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgIGlmIChtb3ZlX2FjdGlvbnNfbGVmdCA+IDApIHtcclxuICAgICAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShjaGFyYWN0ZXJfcGlja2VkLmluZGV4LCBjaGFyYWN0ZXJfcGlja2VkLmNlbGwsIHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQktGLINC/0L7RgtGA0LDRgtC40LvQuCDQstGB0LUg0L/QtdGA0LXQvNC10YnQtdC90LjRjyDQvdCwINGN0YLQvtC8INGF0L7QtNGDIVwiKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcblxyXG4gICAgdmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCj0L3QuNGH0YLQvtC20LjRgtGMXCI7XHJcbiAgICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgICBkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZGVsZXRlX2NoYXJhY3RlcihpbmRleCwgY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgdmFyIHZpc2liaWxpdHlfbWVzc2FnZSA9IFwiXCI7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gMCkge1xyXG4gICAgICB2aXNpYmlsaXR5X21lc3NhZ2UgPSBcItCe0YLQutGA0YvRgtGMINC00L7RgdGC0YPQv1wiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmlzaWJpbGl0eV9tZXNzYWdlID0gXCLQl9Cw0LrRgNGL0YLRjCDQtNC+0YHRgtGD0L9cIjtcclxuICAgIH1cclxuICAgIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24uaW5uZXJIVE1MID0gdmlzaWJpbGl0eV9tZXNzYWdlO1xyXG4gICAgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5KGNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkYW1hZ2VfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRhbWFnZV9idXR0b24uaW5uZXJIVE1MID0gXCLQndCw0L3QtdGB0YLQuCDRg9GA0L7QvVwiO1xyXG4gICAgZGFtYWdlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gICAgZGFtYWdlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgdmFyIGRhbWFnZV9maWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFtYWdlX2ZpZWxkXCIpO1xyXG4gICAgICBpZiAoIShkYW1hZ2VfZmllbGQudmFsdWUgPT09IFwiXCIpKSB7XHJcbiAgICAgICAgdmFyIGRhbWFnZSA9IHBhcnNlSW50KGRhbWFnZV9maWVsZC52YWx1ZSk7XHJcbiAgICAgICAgdmFyIEhQX2Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkhQX2Rpc3BsYXlcIik7XHJcbiAgICAgICAgdmFyIG5ld19IUCA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSAtIGRhbWFnZTtcclxuICAgICAgICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBuZXdfSFA7XHJcblxyXG4gICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdkZWFsX2RhbWFnZSc7XHJcbiAgICAgICAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICAgIHRvU2VuZC5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgZGFtYWdlX2ZpZWxkLmlkID0gXCJkYW1hZ2VfZmllbGRcIjtcclxuICAgIGRhbWFnZV9maWVsZC50eXBlID0gXCJudW1iZXJcIjtcclxuICAgIGRhbWFnZV9maWVsZC5wbGFjZWhvbGRlciA9IFwi0KPRgNC+0L1cIjtcclxuXHJcbiAgICB2YXIgZWZmZWN0X3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgICBlZmZlY3Rfc2VsZWN0LmlkID0gXCJlZmZlY3Rfc2VsZWN0XCI7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlZmZlY3RfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBlZmZlY3RfbGlzdFtpXTtcclxuICAgICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpO1xyXG4gICAgICBlZmZlY3Rfc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZWZmZWN0X2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBlZmZlY3RfYnV0dG9uLmlubmVySFRNTCA9IFwi0J/RgNC40LzQtdC90LjRgtGMINGN0YTRhNC10LrRglwiO1xyXG4gICAgZWZmZWN0X2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgdmFyIGVmZmVjdF9zZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVmZmVjdF9zZWxlY3RcIik7XHJcbiAgICAgIHZhciBlZmZlY3RfaW5kZXggPSBlZmZlY3Rfc2VsZWN0LnZhbHVlO1xyXG4gICAgICBzZW5kX2VmZmVjdF9jb21tYW5kKGNoYXJhY3Rlcl9udW1iZXIsIGVmZmVjdF9pbmRleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgc2VhcmNoX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgc2VhcmNoX2J1dHRvbi5pbm5lckhUTUwgPSBcItCe0LHRi9GB0LrQsNGC0YxcIjtcclxuICBzZWFyY2hfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgc2VhcmNoX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHNlYXJjaF9hY3Rpb24oZXZlbnQudGFyZ2V0KTtcclxuICB9XHJcblxyXG4gIHZhciBzaW1wbGVfcm9sbF9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHNpbXBsZV9yb2xsX2J1dHRvbi5pbm5lckhUTUwgPSBcItCf0YDQvtGB0YLQviBkMjBcIjtcclxuICBzaW1wbGVfcm9sbF9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMClcclxuICAgIHZhciB0b1NlbmQgPSB7fVxyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSBcInNpbXBsZV9yb2xsXCJcclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbmFtZSA9IGNoYXJhY3Rlci5uYW1lXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tXHJcbiAgICB0b1NlbmQucm9sbCA9IHJvbGxcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH1cclxuXHJcbiAgdmFyIGludmVudG9yeSA9IGNoYXJhY3Rlci5pbnZlbnRvcnlcclxuXHJcbiAgdmFyIGRlZmF1bHRfd2VhcG9uX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi53ZWFwb25faWQgPSBkZWZhdWx0X3dlYXBvbl9pbmRleFxyXG4gIHZhciBkZWZhdWx0X3dlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2RlZmF1bHRfd2VhcG9uX2luZGV4XVxyXG5cclxuICB2YXIgd2VhcG9uX21pbmlfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5pZCA9IFwid2VhcG9uX21pbmlfZGlzcGxheVwiXHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5zcmMgPSBkZWZhdWx0X3dlYXBvbi5hdmF0YXI7XHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5jbGFzc0xpc3QuYWRkKFwibWluaV9kaXNwbGF5XCIpO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkub25tb3VzZWVudGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgICB2YXIgd2VhcG9uX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBkaXNwbGF5X3dlYXBvbl9kZXRhaWxlZCh3ZWFwb25faW5kZXgsIHdlYXBvbl9pbmZvX2NvbnRhaW5lciwgdHJ1ZSlcclxuICB9XHJcblxyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuaGlkZSgpXHJcbiAgfVxyXG5cclxuICB3ZWFwb25fbWluaV9kaXNwbGF5Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmIChteV9yb2xlID09IFwiZ21cIiB8fCBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcbiAgICAgIHNob3dfd2VhcG9uX21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXZhdGFyX2NvbnRhaW5lci5hcHBlbmQod2VhcG9uX21pbmlfZGlzcGxheSlcclxuXHJcbiAgdmFyIGFybW9yX21pbmlfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgYXJtb3JfbWluaV9kaXNwbGF5LmlkID0gXCJhcm1vcl9taW5pX2Rpc3BsYXlcIjtcclxuICBhcm1vcl9taW5pX2Rpc3BsYXkuc3JjID0gYXJtb3JfaW1hZ2UoY2hhcmFjdGVyX251bWJlcik7XHJcbiAgYXJtb3JfbWluaV9kaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJtaW5pX2Rpc3BsYXlcIik7XHJcbiAgYXJtb3JfbWluaV9kaXNwbGF5Lm9ubW91c2VlbnRlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gICAgZGlzcGxheV9hcm1vcl9kZXRhaWxlZChjaGFyYWN0ZXJfbnVtYmVyLCB3ZWFwb25faW5mb19jb250YWluZXIpXHJcbiAgfVxyXG5cclxuICBhcm1vcl9taW5pX2Rpc3BsYXkub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuaGlkZSgpXHJcbiAgfVxyXG5cclxuICBhdmF0YXJfY29udGFpbmVyLmFwcGVuZChhcm1vcl9taW5pX2Rpc3BsYXkpXHJcblxyXG4gIHZhciBzcGlyaXRfbWluaV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBzcGlyaXRfbWluaV9kaXNwbGF5LmlkID0gXCJzcGlyaXRfbWluaV9kaXNwbGF5XCI7XHJcbiAgc3Bpcml0X21pbmlfZGlzcGxheS5zcmMgPSBzcGlyaXRfaW1hZ2UoY2hhcmFjdGVyX251bWJlcik7XHJcbiAgc3Bpcml0X21pbmlfZGlzcGxheS5jbGFzc0xpc3QuYWRkKFwibWluaV9kaXNwbGF5XCIpO1xyXG4gIHNwaXJpdF9taW5pX2Rpc3BsYXkub25tb3VzZWVudGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgICBkaXNwbGF5X3NwaXJpdF9kZXRhaWxlZChjaGFyYWN0ZXJfbnVtYmVyLCB3ZWFwb25faW5mb19jb250YWluZXIpXHJcbiAgfVxyXG5cclxuICBzcGlyaXRfbWluaV9kaXNwbGF5Lm9ubW91c2VsZWF2ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmhpZGUoKVxyXG4gIH1cclxuXHJcbiAgYXZhdGFyX2NvbnRhaW5lci5hcHBlbmQoc3Bpcml0X21pbmlfZGlzcGxheSlcclxuXHJcbiAgdmFyIGF0dGFja19idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGF0dGFja19idXR0b24uaW5uZXJIVE1MID0gXCLQkNGC0LDQutC+0LLQsNGC0YxcIjtcclxuICBhdHRhY2tfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIG1haW5fYWN0aW9uc19sZWZ0ID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBpZiAobWFpbl9hY3Rpb25zX2xlZnQgPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fYXR0YWNrKGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCjINCy0LDRgSDQvdC1INC+0YHRgtCw0LvQvtGB0Ywg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciBza2lsbHNldCA9IGNoYXJhY3Rlci5za2lsbHNldFxyXG5cclxuICB2YXIgYnV0dG9uX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgYnV0dG9uX2xpc3QuY2xhc3NOYW1lID0gXCJidXR0b25fbGlzdFwiO1xyXG4gIHZhciBsaW5lMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmUzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lMTAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcblxyXG4gIGxpbmUxLmFwcGVuZENoaWxkKG1vdmVfYnV0dG9uKTtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgIGxpbmUyLmFwcGVuZENoaWxkKGRlbGV0ZV9idXR0b24pO1xyXG4gICAgbGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2J1dHRvbik7XHJcbiAgICBsaW5lMy5hcHBlbmRDaGlsZChkYW1hZ2VfZmllbGQpO1xyXG4gICAgbGluZTguYXBwZW5kQ2hpbGQoY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbik7XHJcbiAgICBsaW5lOS5hcHBlbmRDaGlsZChlZmZlY3Rfc2VsZWN0KTtcclxuICAgIGxpbmUxMC5hcHBlbmRDaGlsZChlZmZlY3RfYnV0dG9uKTtcclxuICB9XHJcbiAgbGluZTQuYXBwZW5kQ2hpbGQoc2VhcmNoX2J1dHRvbik7XHJcbiAgbGluZTYuYXBwZW5kQ2hpbGQoYXR0YWNrX2J1dHRvbik7XHJcbiAgbGluZTcuYXBwZW5kQ2hpbGQoc2ltcGxlX3JvbGxfYnV0dG9uKTtcclxuXHJcblxyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUxKTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNCk7XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTYpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU3KTtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUyKTtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUzKTtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU4KTtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU5KTtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUxMCk7XHJcbiAgfVxyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGJ1dHRvbl9saXN0KTtcclxuXHJcbn0gZWxzZSB7XHJcbiAgdmFyIGhwX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSkvcGFyc2VGbG9hdChIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKVxyXG4gIGhwX3BlcmNlbnQgPSBNYXRoLmZsb29yKGhwX3BlcmNlbnQqMTAwKVxyXG5cclxuICB2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBIUF9kaXNwbGF5LmlkID0gXCJIUF9kaXNwbGF5XCI7XHJcbiAgSFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgaHBfcGVyY2VudCArIFwiJVwiO1xyXG5cclxuICB2YXIgdGlyZWRfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0pL3BhcnNlRmxvYXQoc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKVxyXG4gIHRpcmVkX3BlcmNlbnQgPSBNYXRoLmZsb29yKHRpcmVkX3BlcmNlbnQqMTAwKVxyXG5cclxuICB2YXIgdGlyZWRfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB0aXJlZF9kaXNwbGF5LmlkID0gXCJ0aXJlZF9kaXNwbGF5XCI7XHJcbiAgdGlyZWRfZGlzcGxheS5pbm5lckhUTUwgPSBcItCS0YvQvdC+0YHQu9C40LLQvtGB0YLRjDogXCIgKyB0aXJlZF9wZXJjZW50ICsgXCIlXCI7XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoSFBfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZCh0aXJlZF9kaXNwbGF5KTtcclxufVxyXG5cclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kX2VmZmVjdF9jb21tYW5kKGNoYXJhY3Rlcl9udW1iZXIsIGVmZmVjdF9pbmRleCkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhcHBseV9lZmZlY3QnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmVmZmVjdF9udW1iZXIgPSBlZmZlY3RfaW5kZXg7XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICBhbGVydChcItCS0Ysg0L/RgNC40LzQtdC90LjQu9C4INGN0YTRhNC10LrRglwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlX29iamVjdF9jb21tYW5kKGluZGV4KSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2RlbGV0ZV9vYmplY3QnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZV9vYmplY3QoZXZlbnQpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgZGVsZXRlX29iamVjdF9jb21tYW5kKGV2ZW50LnRhcmdldC5pbmRleClcclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0X29ic3RhY2xlKGluZGV4LCBjZWxsKSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgdmFyIG9ic3RhY2xlX2lkID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gKiAoLTEpO1xyXG4gIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9bb2JzdGFjbGVfaWRdO1xyXG5cclxuICAvLyBrZWVwIHRyYWNrIG9mIGxhc3QgY2hvc2VuIG9ic3RhbGUgdG8gcXVpY2tseSBhZGQgdG8gdGhlIG1hcFxyXG4gIGxhc3Rfb2JzdGFjbGUgPSBvYnN0YWNsZV9pZFxyXG5cclxuICBsZXQgbmFtZSA9IG9ic3RhY2xlLm5hbWU7XHJcbiAgbGV0IGF2YXRhciA9IG9ic3RhY2xlLmF2YXRhcjtcclxuXHJcbiAgdmFyIG5hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBuYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gbmFtZTtcclxuXHJcbiAgdmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQobmFtZV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGF2YXRhcl9kaXNwbGF5KTtcclxuXHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICB2YXIgZGVsZXRlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBkZWxldGVfYnV0dG9uLmlubmVySFRNTCA9IFwi0KPQvdC40YfRgtC+0LbQuNGC0YxcIjtcclxuICAgIGRlbGV0ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICAgIGRlbGV0ZV9idXR0b24uY2VsbCA9IGNlbGw7XHJcbiAgICBkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBkZWxldGVfb2JqZWN0KGV2ZW50KTtcclxuICAgIH1cclxuICAgIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoZGVsZXRlX2J1dHRvbik7XHJcbiAgfVxyXG5cclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwsIHNob3dWaXN1YWwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAxXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gaW5kZXg7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF07XHJcbiAgaWYgKHNob3dWaXN1YWwpIHtcclxuICAgIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9sb2FkaW5nLndlYnBcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuZG9fc2VsZWN0aW9uKCkge1xyXG4gIGlmIChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgIT0gMCkge1xyXG4gICAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMFxyXG4gICAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uKTtcclxuICAgIG9sZF9jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd193ZWFwb25fbW9kYWwoY2hhcmFjdGVyX251bWJlciwgc3RhcnRpbmdfaW5kZXgpIHtcclxuICBoaWRlX21vZGFsKClcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgaW52ZW50b3J5ID0gY2hhcmFjdGVyLmludmVudG9yeVxyXG5cclxuICB2YXIgd2VhcG9uX3RhYmxlID0gJChcIjx0YWJsZT5cIik7XHJcbiAgdmFyIHRhYmxlX3NpemUgPSAzXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGVfc2l6ZTsgaSsrKSB7XHJcbiAgICB2YXIgcm93ID0gJChcIjx0cj5cIik7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRhYmxlX3NpemU7IGorKykge1xyXG4gICAgICB2YXIgaW5kZXggPSBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqaSArIGpcclxuICAgICAgaWYgKGluZGV4IDwgaW52ZW50b3J5Lmxlbmd0aCkge1xyXG4gICAgICAgIHZhciB3ZWFwb25fbnVtYmVyID0gaW52ZW50b3J5W2luZGV4XVxyXG4gICAgICAgIHZhciBjb2x1bW4gPSAkKFwiPHRoPlwiKTtcclxuICAgICAgICB2YXIgd2VhcG9uX2ljb24gPSAkKFwiPElNRz5cIik7XHJcbiAgICAgICAgdmFyIGF2YXRhciA9IFFVRVNUSU9OX0lNQUdFXHJcbiAgICAgICAgaWYgKHdlYXBvbl9kZXRhaWxlZF9pbmZvW3dlYXBvbl9udW1iZXJdLmhhc093blByb3BlcnR5KCdhdmF0YXInKSkge1xyXG4gICAgICAgICAgYXZhdGFyID0gd2VhcG9uX2RldGFpbGVkX2luZm9bd2VhcG9uX251bWJlcl0uYXZhdGFyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdlYXBvbl9pY29uLmFkZENsYXNzKCd3ZWFwb25faWNvbicpO1xyXG4gICAgICAgIHdlYXBvbl9pY29uLmF0dHIoJ3dpZHRoJywgJzEwMHB4Jyk7XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYXR0cignd2VhcG9uX251bWJlcicsIHdlYXBvbl9udW1iZXIpO1xyXG4gICAgICAgIHdlYXBvbl9pY29uLmF0dHIoJ2hlaWdodCcsICcxMDBweCcpO1xyXG4gICAgICAgIHdlYXBvbl9pY29uLmF0dHIoJ3NyYycsIGF2YXRhcik7XHJcbiAgICAgICAgd2VhcG9uX2ljb24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHZhciB3ZWFwb25fbnVtID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnd2VhcG9uX251bWJlcicpO1xyXG4gICAgICAgICAgY2hhbmdlX3dlYXBvbihjaGFyYWN0ZXJfbnVtYmVyLCB3ZWFwb25fbnVtKTtcclxuICAgICAgICAgIGhpZGVfbW9kYWwoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdlYXBvbl9pY29uLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHZhciB3ZWFwb25fbnVtID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnd2VhcG9uX251bWJlcicpO1xyXG4gICAgICAgICAgZGlzcGxheV93ZWFwb25fZGV0YWlsZWQod2VhcG9uX251bSwgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLCBmYWxzZSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB3ZWFwb25faWNvbi5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuaHRtbCgnJyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb2x1bW4uYXBwZW5kKHdlYXBvbl9pY29uKTtcclxuICAgICAgICByb3cuYXBwZW5kKGNvbHVtbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHdlYXBvbl90YWJsZS5hcHBlbmQocm93KTtcclxuICB9XHJcbiAgc2tpbGxfbW9kYWxfY29udGVudC5hcHBlbmQod2VhcG9uX3RhYmxlKTtcclxuXHJcbiAgaWYgKGludmVudG9yeS5sZW5ndGggPiBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqdGFibGVfc2l6ZSkgey8vIHRoZXJlIGFyZSBtb3JlIHNraWxscyB0byBkaXNwbGF5XHJcbiAgICB2YXIgbmV4dF9wYWdlX2J1dHRvbiA9ICQoXCI8SU1HPlwiKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24uYXR0cignd2lkdGgnLCAnMTAwcHgnKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24uYXR0cignaGVpZ2h0JywgJzUwcHgnKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24uYXR0cignc3JjJywgUklHSFRfQVJST1dfSU1BR0UpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHNob3dfd2VhcG9uX21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSp0YWJsZV9zaXplKTtcclxuICAgIH0pXHJcblxyXG4gICAgbmV4dF9wYWdlX2J1dHRvbl9jb250YWluZXIuYXBwZW5kKG5leHRfcGFnZV9idXR0b24pO1xyXG4gIH1cclxuICBza2lsbF9tb2RhbC5zaG93KCk7XHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd19tb2RhbChjaGFyYWN0ZXJfbnVtYmVyLCBzdGFydGluZ19pbmRleCkge1xyXG4gIGhpZGVfbW9kYWwoKTtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgc2tpbGxzZXQgPSBjaGFyYWN0ZXIuc2tpbGxzZXRcclxuXHJcbiAgdmFyIHNraWxsX3RhYmxlID0gJChcIjx0YWJsZT5cIik7XHJcblxyXG4gIHZhciB0YWJsZV9zaXplID0gM1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlX3NpemU7IGkrKykge1xyXG4gICAgdmFyIHJvdyA9ICQoXCI8dHI+XCIpO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0YWJsZV9zaXplOyBqKyspIHtcclxuICAgICAgdmFyIGluZGV4ID0gc3RhcnRpbmdfaW5kZXggKyB0YWJsZV9zaXplKmkgKyBqXHJcbiAgICAgIGlmIChpbmRleCA8IHNraWxsc2V0Lmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBza2lsbF9udW1iZXIgPSBza2lsbHNldFtpbmRleF1cclxuICAgICAgICB2YXIgY29sdW1uID0gJChcIjx0aD5cIik7XHJcbiAgICAgICAgdmFyIHNraWxsX2ljb24gPSAkKFwiPElNRz5cIik7XHJcbiAgICAgICAgdmFyIGF2YXRhciA9IFFVRVNUSU9OX0lNQUdFXHJcbiAgICAgICAgaWYgKHNraWxsX2RldGFpbGVkX2luZm9bc2tpbGxfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eSgnYXZhdGFyJykpIHtcclxuICAgICAgICAgIGF2YXRhciA9IHNraWxsX2RldGFpbGVkX2luZm9bc2tpbGxfbnVtYmVyXS5hdmF0YXJcclxuICAgICAgICB9XHJcbiAgICAgICAgc2tpbGxfaWNvbi5hZGRDbGFzcygnc2tpbGxfaWNvbicpO1xyXG4gICAgICAgIHNraWxsX2ljb24uYXR0cignd2lkdGgnLCAnMTAwcHgnKTtcclxuICAgICAgICBza2lsbF9pY29uLmF0dHIoJ3NraWxsX251bWJlcicsIHNraWxsX251bWJlcik7XHJcbiAgICAgICAgc2tpbGxfaWNvbi5hdHRyKCdoZWlnaHQnLCAnMTAwcHgnKTtcclxuICAgICAgICBza2lsbF9pY29uLmF0dHIoJ3NyYycsIGF2YXRhcik7XHJcbiAgICAgICAgc2tpbGxfaWNvbi5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgdmFyIHBvc2l0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIHBvc2l0aW9uKTtcclxuICAgICAgICAgIHVzZV9za2lsbChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdza2lsbF9udW1iZXInKSwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICBoaWRlX21vZGFsKClcclxuICAgICAgICB9KTtcclxuICAgICAgICBza2lsbF9pY29uLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5odG1sKCcnKTtcclxuICAgICAgICAgIHZhciBza2lsbF9udW1iZXIgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdza2lsbF9udW1iZXInKTtcclxuICAgICAgICAgIHZhciBza2lsbF9vYmplY3QgPSBza2lsbF9kZXRhaWxlZF9pbmZvW3NraWxsX251bWJlcl07XHJcbiAgICAgICAgICB2YXIgc2tpbGxfbmFtZV9vYmplY3QgPSAkKFwiPGgyPlwiKTtcclxuICAgICAgICAgIHZhciBza2lsbF9uYW1lID0gc2tpbGxfbGlzdFtza2lsbF9udW1iZXJdO1xyXG4gICAgICAgICAgc2tpbGxfbmFtZV9vYmplY3QuaHRtbChza2lsbF9uYW1lKTtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5hcHBlbmQoc2tpbGxfbmFtZV9vYmplY3QpO1xyXG5cclxuICAgICAgICAgIHZhciBza2lsbF9jb3N0X29iamVjdCA9ICQoXCI8aDI+XCIpO1xyXG4gICAgICAgICAgaWYgKHNraWxsX29iamVjdC5oYXNPd25Qcm9wZXJ0eSgnY29zdCcpKSB7XHJcbiAgICAgICAgICAgIHZhciBza2lsbF9jb3N0ID0gc2tpbGxfb2JqZWN0LmNvc3Q7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfY29zdCA9IFwi0J3QtdC40LfQstC10YHRgtC90L5cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2tpbGxfY29zdF9vYmplY3QuaHRtbChcItCi0YDQtdCx0YPQtdGCINC00LXQudGB0YLQstC40Lk6IFwiICsgc2tpbGxfY29zdCk7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuYXBwZW5kKHNraWxsX2Nvc3Rfb2JqZWN0KTtcclxuXHJcbiAgICAgICAgICBpZiAoc2tpbGxfb2JqZWN0Lmhhc093blByb3BlcnR5KFwiY29vbGRvd25cIikpIHtcclxuICAgICAgICAgICAgdmFyIHNraWxsX2Nvb2xkb3duX2hlYWRlciA9ICQoXCI8aDI+XCIpO1xyXG4gICAgICAgICAgICB2YXIgdGV4dCA9IFwi0JrRg9C70LTQsNGD0L06IFwiICsgc2tpbGxfb2JqZWN0LmNvb2xkb3duO1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShza2lsbF9vYmplY3QuY29vbGRvd25fb2JqZWN0X25hbWUpKSB7XHJcbiAgICAgICAgICAgICAgdGV4dCA9IHRleHQgKyBcIiAo0L7RgdGC0LDQu9C+0YHRjCBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl1bc2tpbGxfb2JqZWN0LmNvb2xkb3duX29iamVjdF9uYW1lXS5jb29sZG93biArIFwiKVwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRleHQgPSB0ZXh0ICsgXCIgKNCT0L7RgtC+0LLQvilcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBza2lsbF9jb29sZG93bl9oZWFkZXIuaHRtbCh0ZXh0KTtcclxuICAgICAgICAgICAgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLmFwcGVuZChza2lsbF9jb29sZG93bl9oZWFkZXIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciBza2lsbF9kZXNjcmlwdGlvbl9vYmplY3QgPSAkKFwiPHA+XCIpO1xyXG4gICAgICAgICAgaWYgKHNraWxsX29iamVjdC5oYXNPd25Qcm9wZXJ0eSgnZGVzY3JpcHRpb24nKSkge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfZGVzY3JpcHRpb24gPSBza2lsbF9vYmplY3QuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfZGVzY3JpcHRpb24gPSBcItCc0Ysg0YHQsNC80Lgg0L3QtSDQt9C90LDQtdC8INGH0YLQviDQvtC90L4g0LTQtdC70LDQtdGCXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX29iamVjdC5odG1sKHNraWxsX2Rlc2NyaXB0aW9uKTtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5hcHBlbmQoc2tpbGxfZGVzY3JpcHRpb25fb2JqZWN0KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBza2lsbF9pY29uLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuaHRtbCgnJyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb2x1bW4uYXBwZW5kKHNraWxsX2ljb24pO1xyXG4gICAgICAgIHJvdy5hcHBlbmQoY29sdW1uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2tpbGxfdGFibGUuYXBwZW5kKHJvdyk7XHJcbiAgfVxyXG4gIHNraWxsX21vZGFsX2NvbnRlbnQuYXBwZW5kKHNraWxsX3RhYmxlKTtcclxuXHJcbiAgaWYgKHNraWxsc2V0Lmxlbmd0aCA+IHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSp0YWJsZV9zaXplKSB7Ly8gdGhlcmUgYXJlIG1vcmUgc2tpbGxzIHRvIGRpc3BsYXlcclxuICAgIHZhciBuZXh0X3BhZ2VfYnV0dG9uID0gJChcIjxJTUc+XCIpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCd3aWR0aCcsICcxMDBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdoZWlnaHQnLCAnNTBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdzcmMnLCBSSUdIVF9BUlJPV19JTUFHRSk7XHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgc2hvd19tb2RhbChjaGFyYWN0ZXJfbnVtYmVyLCBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqdGFibGVfc2l6ZSk7XHJcbiAgICB9KVxyXG5cclxuICAgIG5leHRfcGFnZV9idXR0b25fY29udGFpbmVyLmFwcGVuZChuZXh0X3BhZ2VfYnV0dG9uKTtcclxuICB9XHJcbiAgc2tpbGxfbW9kYWwuc2hvdygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlX21vZGFsKCkge1xyXG4gIHNraWxsX21vZGFsLmhpZGUoKTtcclxuICBza2lsbF9tb2RhbF9jb250ZW50Lmh0bWwoXCJcIik7XHJcbiAgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLmh0bWwoXCJcIik7XHJcbiAgbmV4dF9wYWdlX2J1dHRvbl9jb250YWluZXIuaHRtbChcIlwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5ob3Zlcl9jaGFyYWN0ZXIoY2hhcmFjdGVyX251bWJlcikge1xyXG4gIHZhciBwb3NpdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBib2FyZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHBvc2l0aW9uKTtcclxuICBib2FyZF9jZWxsLnN0eWxlLnRyYW5zZm9ybSA9IFwiXCI7XHJcbn1cclxuXHJcbi8vIGF0dGFjayByZWxhdGVkIGhlbHBlcnNcclxuXHJcbmZ1bmN0aW9uIGNob29zZV9jaGFyYWN0ZXJfdG9fYXR0YWNrKGNlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAyXHJcbiAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL2F0dGFja19wbGFjZWhvbGRlci5qcGdcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RvcF9hdHRhY2soKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMFxyXG4gIHZhciBvbGRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbik7XHJcbiAgb2xkX2NlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3Bfc2tpbGwoKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMFxyXG4gIHZhciBvbGRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbik7XHJcbiAgb2xkX2NlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCk7XHJcbn1cclxuXHJcbi8vIGluaXRpYXRpdmUgcmVsYXRlZCBmdW5jdGlvbnNcclxuXHJcbmZ1bmN0aW9uIHJlc2V0SW5pdGlhdGl2ZSgpIHtcclxuICBpbml0aWF0aXZlX29yZGVyX2FycmF5ID0gW107XHJcbiAgaW5pdGlhdGl2ZV9vcmRlcl9jb250YWluZXIuaHRtbCgnJyk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBjb25zdHJ1Y3RfaW5pdGlhdGl2ZV9pbWFnZShjaGFyYWN0ZXJfbnVtYmVyLCBpKSB7XHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHF1ZXJ5X3N0cmluZyA9ICc8aW1nPiBpZD1cImluaXRpYXRpdmVfaW1hZ2VfJyArIGkgKyAnXCInXHJcbiAgdmFyIGltZyA9ICQocXVlcnlfc3RyaW5nKVxyXG4gIGltZy5hdHRyKCdzcmMnLCBjaGFyYWN0ZXIuYXZhdGFyKTtcclxuICBpbWcuYXR0cignaGVpZ2h0JywgJzUwcHgnKTtcclxuICBpbWcuYXR0cignd2lkdGgnLCAnNTBweCcpO1xyXG4gIGltZy5hdHRyKCdhcnJheV9wb3NpdGlvbicsIGkpO1xyXG4gIGltZy5hZGRDbGFzcyhcImluaXRpYXRpdmVfaW1hZ2VcIik7XHJcbiAgaW1nLm9uKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpc1Zpc2libGUgPSBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09ICdhbGwnIHx8IGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gbXlfbmFtZTtcclxuICAgIHZhciBwb3NpdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGlzTm90Rm9nZ2VkID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbcG9zaXRpb25dID09IDAgfHwgbXlfcm9sZSA9PSAnZ20nO1xyXG4gICAgaWYgKGlzVmlzaWJsZSAmJiBpc05vdEZvZ2dlZCkge1xyXG4gICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBwb3NpdGlvbik7XHJcbiAgICAgIGNlbGwuc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSgxLjIpXCI7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgaW1nLm9uKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbigpIHtcclxuICAgIHVuaG92ZXJfY2hhcmFjdGVyKGNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gIH0pO1xyXG4gIGltZy5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIHZhciBwb3NpdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgcG9zaXRpb24pO1xyXG4gICAgLy9zZWxlY3RfY2hhcmFjdGVyKHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgbm9fc2hpZnRfb25jbGljayhteV9yb2xlLCBnbV9jb250cm9sX21vZCwgZ2FtZV9zdGF0ZSwgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzLCBjZWxsLCBwb3NpdGlvbilcclxuICB9KVxyXG4gIGltZy5hdHRyKCdkcmFnZ2FibGUnLCB0cnVlKTtcclxuICBpbWcub24oXCJkcmFnc3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGRyYWdnZWQgPSBldmVudC50YXJnZXQ7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGltZztcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheV9pbml0aWF0aXZlX2xpbmUoKSB7XHJcbiAgaW5pdGlhdGl2ZV9vcmRlcl9jb250YWluZXIuaHRtbChcIlwiKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGluaXRpYXRpdmVfb3JkZXJfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBpbWcgPSBjb25zdHJ1Y3RfaW5pdGlhdGl2ZV9pbWFnZShpbml0aWF0aXZlX29yZGVyX2FycmF5W2ldLCBpKTtcclxuICAgIGltZy5hcHBlbmRUbyhpbml0aWF0aXZlX29yZGVyX2NvbnRhaW5lcik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyByb2xsIHNvbWV0aGluZ1xyXG5cclxuZnVuY3Rpb24gcm9sbF94KHgpIHtcclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogeCkgKyAxXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxTZWFyY2goaW50ZWxsaWdlbmNlLCBtb2QpIHtcclxuICByZXR1cm4gaW50ZWxsaWdlbmNlICsgcm9sbF94KDIwKSArIG1vZDtcclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbEluaXRpYXRpdmUoKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbml0aWF0aXZlX29yZGVyX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAvLyByZXRyaWV2ZSB0aGF0IGNoYXJhY3RlcidzIGFnaWxpdHlcclxuICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gaW5pdGlhdGl2ZV9vcmRlcl9hcnJheVtpXTtcclxuICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXTtcclxuICAgIHZhciBhZ2lsaXR5ID0gY2hhcmFjdGVyLmFnaWxpdHk7XHJcblxyXG4gICAgLy8gcm9sbCBpbml0aWF0aXZlIGFuZCBhZGQgYWdpbGl0eSBtb2RpZmljYXRvclxyXG4gICAgdmFyIGluaXRpYXRpdmUgPSBjb21wdXRlSW5pdGlhdGl2ZShwYXJzZUludChhZ2lsaXR5KSk7XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtjaGFyYWN0ZXJfbnVtYmVyXSA9IGluaXRpYXRpdmU7XHJcbiAgfVxyXG4gIGluaXRpYXRpdmVfb3JkZXJfYXJyYXkuc29ydChjb21wYXJlX2luaXRpYXRpdmUpO1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdyb2xsX2luaXRpYXRpdmUnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmluaXRpYXRpdmVfc3RhdGUgPSBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZTtcclxuICB0b1NlbmQuaW5pdGlhdGl2ZV9vcmRlcl9hcnJheSA9IGluaXRpYXRpdmVfb3JkZXJfYXJyYXk7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxfYXR0YWNrKHR5cGUsIGF0dGFja2VyLCB0YXJnZXQsIGFkdmFudGFnZV9ib251cykge1xyXG4gIHZhciBhZHZhbnRhZ2UgPSAwXHJcbiAgaWYgKCh0eXBlID09IFwicmFuZ2VkXCIpfHwodHlwZSA9PSBcImVuZXJneVwiKSkge1xyXG4gICAgYWR2YW50YWdlID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbYXR0YWNrZXJdO1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmhhc093blByb3BlcnR5KFwiYWRhcHRpdmVfZmlnaHRpbmdcIikpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID09IDApIHtcclxuICAgICAgICBhZHZhbnRhZ2UgPSBhZHZhbnRhZ2UgKyAxO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KHRgNCw0LHQvtGC0LDQuyDRgNC10LnQvdC00LbQvtCy0YvQuSDRgdGC0LDQuiDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0LhcIik7XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uYWRhcHRpdmVfZmlnaHRpbmcgPSAxO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAodHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIGFkdmFudGFnZSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbYXR0YWNrZXJdXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uaGFzT3duUHJvcGVydHkoXCJhZGFwdGl2ZV9maWdodGluZ1wiKSkge1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uYWRhcHRpdmVfZmlnaHRpbmcgPT0gMSkge1xyXG4gICAgICAgIGFkdmFudGFnZSA9IGFkdmFudGFnZSArIDE7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQodGA0LDQsdC+0YLQsNC7INC80LjQu9C70Lgg0YHRgtCw0Log0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtC4XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gMDtcclxuICAgIH1cclxuICB9XHJcbiAgYWR2YW50YWdlID0gYWR2YW50YWdlIC0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbdGFyZ2V0XSArIGFkdmFudGFnZV9ib251c1xyXG5cclxuICB2YXIgcm9sbCA9IDBcclxuXHJcbiAgaWYgKGFkdmFudGFnZSA+PSAyKSB7IC8vINCU0LjQutC+0LUg0L/RgNC10LjQvNGD0YnQtdGB0YLQstC+ID0gNCDQutGD0LHQsFxyXG4gICAgY29uc29sZS5sb2coXCLQlNC40LrQvtC1INC/0YDQtdC40LzRg9GJ0LXRgdGC0LLQvlwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwzID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGw0ID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWF4KHJvbGwxLCByb2xsMiwgcm9sbDMsIHJvbGw0KVxyXG4gIH0gZWxzZSBpZiAoYWR2YW50YWdlID09IDEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwi0J/RgNC10LjQvNGD0YnQtdGB0YLQstC+XCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5tYXgocm9sbDEsIHJvbGwyKVxyXG4gIH0gZWxzZSBpZiAoYWR2YW50YWdlID09IDApIHtcclxuICAgIHJvbGwgPSByb2xsX3goMjApXHJcbiAgfSBlbHNlIGlmIChhZHZhbnRhZ2UgPT0gLTEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwi0J/QvtC80LXRhdCwXCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5taW4ocm9sbDEsIHJvbGwyKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZyhcItCU0LjQutCw0Y8g0L/QvtC80LXRhdCwXCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDMgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDQgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5taW4ocm9sbDEsIHJvbGwyLCByb2xsMywgcm9sbDQpXHJcbiAgfVxyXG4gIHJldHVybiByb2xsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxfZXZhc2lvbih0YXJnZXRfY2hhcmFjdGVyLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcikge1xyXG4gIGNvbnNvbGUubG9nKFwi0JHQvtC90YPRgSDRg9Cy0L7RgNC+0YLQsDogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKVxyXG4gIHZhciBldmFkZV9yb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KHRhcmdldF9jaGFyYWN0ZXIuYWdpbGl0eSkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICByZXR1cm4gZXZhZGVfcm9sbFxyXG59XHJcblxyXG4vLyBtYW5hZ2luZyBjaGF0XHJcblxyXG5mdW5jdGlvbiBwdXNoVG9MaXN0KG1lc3NhZ2UpIHtcclxuICBmb3IgKGxldCBpPTE7IGkgPCBDSEFUX0NBU0g7IGkrKykge1xyXG4gICAgdmFyIGVsZW1lbnRfdG9fY29weSA9ICQoJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgaSArICdcIl0nKTtcclxuICAgIHZhciBlbGVtZW50X3RvX3Bhc3RlID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyAoaS0xKSArICdcIl0nKTtcclxuXHJcbiAgICBlbGVtZW50X3RvX3Bhc3RlLnRleHQoZWxlbWVudF90b19jb3B5LnRleHQoKSk7XHJcbiAgfVxyXG4gIHZhciB0b3BfZWxlbWVudCA9ICQoJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgKENIQVRfQ0FTSC0xKSArICdcIl0nKTtcclxuICB0b3BfZWxlbWVudC50ZXh0KG1lc3NhZ2UpO1xyXG5cclxuICBpZiAobm90aWZpY2F0aW9uc19jb250YWluZXIuaXMoXCI6aGlkZGVuXCIpKSB7XHJcbiAgICBjaGF0X2J1dHRvbi5hZGRDbGFzcyhcImlzLXJlZFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlQ2hhdFZpc2liaWxpdHkoKSB7XHJcbiAgaWYgKGNoYXRfYnV0dG9uLmhhc0NsYXNzKFwiaXMtcmVkXCIpKSB7XHJcbiAgICBjaGF0X2J1dHRvbi5yZW1vdmVDbGFzcyhcImlzLXJlZFwiKVxyXG4gIH1cclxuICBpZiAobm90aWZpY2F0aW9uc19jb250YWluZXIuaXMoXCI6aGlkZGVuXCIpKSB7XHJcbiAgICBub3RpZmljYXRpb25zX2NvbnRhaW5lci5zaG93KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLmhpZGUoKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGNvdmVyIG1lY2hhbmljc1xyXG5cclxuZnVuY3Rpb24gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKSB7XHJcbiAgdmFyIG1vZCA9IHt9XHJcbiAgbW9kLmlzUG9zc2libGUgPSB0cnVlXHJcbiAgbW9kLmNvdmVyX2xldmVsID0gYWNjdW11bGF0ZWRfY292ZXJcclxuICBzd2l0Y2goYWNjdW11bGF0ZWRfY292ZXIpIHtcclxuICAgIGNhc2UgMDpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IDBcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAwXHJcbiAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAwXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOlxyXG4gICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTFcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMlxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTJcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTFcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgNTpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTNcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTFcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgNjpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTNcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTJcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgNzpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTRcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTJcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgODpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTRcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTNcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgOTpcclxuICAgICAgICBtb2QuYXR0YWNrX2JvbnVzID0gLTVcclxuICAgICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gLTNcclxuICAgICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbW9kLmlzUG9zc2libGUgPSBmYWxzZVxyXG4gICAgICAgIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1vZFxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlX2NvdmVyKGRpc3RhbmNlLCBjb3Zlcikge1xyXG4gIHZhciByZXN1bHQgPSAwXHJcbiAgaWYgKGRpc3RhbmNlIDwgMC4xNSkge1xyXG4gICAgcmVzdWx0ID0gY292ZXJcclxuICB9IGVsc2UgaWYgKGRpc3RhbmNlIDwgMC4zKSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlciAqIDAuNzVcclxuICB9IGVsc2UgaWYgKGRpc3RhbmNlIDwgMC41KSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlciAqIDAuNVxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjY1KSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlciAqIDAuMjVcclxuICB9IGVsc2Uge1xyXG4gICAgcmVzdWx0ID0gMFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdFxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfYWNjdW11bGF0ZWRfY292ZXIodXNlcl9wb3MsIHRhcmdldF9wb3MpIHtcclxuICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSAwXHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGNlbGxzX29uX2xpbmUodXNlcl9wb3MsIHRhcmdldF9wb3MsIGdhbWVfc3RhdGUuc2l6ZSlcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfY2VsbCA9IGNhbmRpZGF0ZV9jZWxsc1tpXVxyXG4gICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXSA8IDApIHsvLyDRjdGC0L4g0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVxyXG4gICAgICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW01hdGguYWJzKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXSldXHJcbiAgICAgIHZhciBkaXN0YW5jZSA9IGRpc3RhbmNlX3RvX2xpbmUodXNlcl9wb3MsIHRhcmdldF9wb3MsIGdhbWVfc3RhdGUuc2l6ZSwgY3VycmVudF9jZWxsKVxyXG4gICAgICBhY2N1bXVsYXRlZF9jb3ZlciA9IGFjY3VtdWxhdGVkX2NvdmVyICsgY29tcHV0ZV9jb3ZlcihkaXN0YW5jZSwgb2JzdGFjbGUuY292ZXIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGFjY3VtdWxhdGVkX2NvdmVyID0gTWF0aC5jZWlsKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gIHJldHVybiBhY2N1bXVsYXRlZF9jb3ZlclxyXG59XHJcblxyXG4vLyBNaXNjZWxhbmVvdXMgYWN0aW9uc1xyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5KGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSBcImNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eVwiO1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAwKSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMFxyXG4gIH1cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VhcmNoX2FjdGlvbihzZWFyY2hfYnV0dG9uKSB7XHJcbiAgdmFyIGluZGV4ID0gc2VhcmNoX2J1dHRvbi5pbmRleDtcclxuICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBpZiAoIShnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSAmJiBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdIDwgMSkpIHtcclxuXHJcbiAgICB2YXIgbmFtZSA9IGNoYXJhY3Rlci5uYW1lO1xyXG4gICAgdmFyIG1vZGlmaWNhdG9yID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaW5kZXhdO1xyXG4gICAgdmFyIGludGVsbGlnZW5jZSA9IGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcbiAgICB2YXIgcm9sbCA9IHJvbGxTZWFyY2gocGFyc2VJbnQoaW50ZWxsaWdlbmNlKSwgcGFyc2VJbnQobW9kaWZpY2F0b3IpKTtcclxuICAgIHZhciB6b25lX251bWJlciA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF07XHJcbiAgICBwdXNoVG9MaXN0KCfQn9C10YDRgdC+0L3QsNC2ICcgKyBuYW1lICsgJyDQsdGA0L7RgdC40LsgJyArIHJvbGwgKyAnINC90LAg0LLQvdC40LzQsNGC0LXQu9GM0L3QvtGB0YLRjCcpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NlYXJjaF9hY3Rpb24nO1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gbmFtZTtcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbDtcclxuICAgIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5wbGF5ZXJfbmFtZSA9IG15X25hbWVcclxuICAgIHRvU2VuZC5taW5lc19kZXRlY3RlZCA9IFtdXHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICB2YXIgbGFuZG1pbmVfY2FuZGlkYXRlcyA9IGluZGV4X2luX3JhZGl1cyhpbmRleCwgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cylcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFuZG1pbmVfY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMobGFuZG1pbmVfY2FuZGlkYXRlc1tpXSkpIHtcclxuICAgICAgICAgIHRvU2VuZC5taW5lc19kZXRlY3RlZC5wdXNoKGxhbmRtaW5lX2NhbmRpZGF0ZXNbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQntCx0YvRgdC6INCy0L4g0LLRgNC10LzRjyDQsdC+0Y8g0YHRgtC+0LjRgiDQsdC+0L3Rg9GB0L3QvtC1INC00LXQudGB0YLQstC40LUhXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlSW5pdGlhdGl2ZShhZ2lsaXR5KSB7XHJcbiAgcmV0dXJuIGFnaWxpdHkqMiArIHJvbGxfeCgyMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZV9iYXR0bGVfbW9kKCkge1xyXG4gIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgdmFyIG5ld192YWx1ZSA9IDBcclxuICB9IGVsc2Uge1xyXG4gICAgdmFyIG5ld192YWx1ZSA9IDFcclxuICB9XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdiYXR0bGVfbW9kJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC52YWx1ZSA9IG5ld192YWx1ZVxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG4vLyBhdHRhY2sgcmVsYXRlZCB0aGluZ3MgKGNvbXB1dGF0aW9uKVxyXG5cclxuZnVuY3Rpb24gY2hhcmFjdGVyX0tEKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgcmV0dXJuIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzc2lnbl9tb3ZlcyhjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID0gcGFyc2VGbG9hdChtb3ZlX2FjdGlvbl9tYXBbY2hhcmFjdGVyLmFnaWxpdHldKTtcclxuICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwiZXh0cmFfbW92ZW1lbnRcIikpIHtcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSArIHBhcnNlRmxvYXQoY2hhcmFjdGVyLmV4dHJhX21vdmVtZW50KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdlYXBvbl9kYW1hZ2VfYm9udXMocmF3X2RhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRvdGFsX2RhbWFnZSA9IHJhd19kYW1hZ2VcclxuICBpZiAod2VhcG9uLnR5cGUgPT0gJ21lbGVlJykge1xyXG4gICAgdG90YWxfZGFtYWdlID0gdG90YWxfZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gJ3Rocm93aW5nJykge1xyXG4gICAgdG90YWxfZGFtYWdlID0gdG90YWxfZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtNYXRoLmNlaWwocGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKS8yKV1cclxuICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09ICdyYW5nZWQnKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSAmJiB3ZWFwb24uaGFzT3duUHJvcGVydHkoXCJhaW1fYm9udXNcIikpIHtcclxuICAgICAgdG90YWxfZGFtYWdlID0gdG90YWxfZGFtYWdlICsgcGFyc2VJbnQod2VhcG9uLmFpbV9ib251cylcclxuICAgIH1cclxuICB9XHJcbiAgdG90YWxfZGFtYWdlID0gdG90YWxfZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHJldHVybiB0b3RhbF9kYW1hZ2VcclxufVxyXG5cclxuZnVuY3Rpb24gcGVyZm9ybV9hdHRhY2soaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX2Nob3Nlbi53ZWFwb25faWRdXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSkpIHtcclxuXHJcbiAgICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIodXNlcl9wb3NpdGlvbiwgaW5kZXgpXHJcbiAgICB2YXIgY292ZXJfbW9kaWZpZXIgPSBjb3Zlcl9tb2QoYWNjdW11bGF0ZWRfY292ZXIpXHJcblxyXG5cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9LRCA9IGNoYXJhY3Rlcl9LRCh0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAncmVzb2x2ZV9hdHRhY2snO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5hdHRhY2tlcl9pZCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmF0dGFja2VyX3Bvc2l0aW9uID0gdXNlcl9wb3NpdGlvblxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQuYXR0YWNrX3R5cGUgPSB3ZWFwb24udHlwZVxyXG4gICAgdG9TZW5kLmNvdmVyX2xldmVsID0gY292ZXJfbW9kaWZpZXIuY292ZXJfbGV2ZWxcclxuICAgIHRvU2VuZC51c2VyX2ludmlzaWJpbGl0eV9lbmRlZCA9IDBcclxuXHJcbiAgICBpZiAod2VhcG9uLmhhc093blByb3BlcnR5KFwic3VidHlwZVwiKSAmJiB3ZWFwb24uc3VidHlwZSA9PSBcIlBQXCIpIHtcclxuICAgICAgdG9TZW5kLnF1aWNrX2F0dGFja19yZWFkeSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSAhPSBcImFsbFwiICYmIHdlYXBvbi50eXBlICE9IFwidGhyb3dpbmdcIikge1xyXG4gICAgICB0b1NlbmQudXNlcl9pbnZpc2liaWxpdHlfZW5kZWQgPSAxXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvdmVyX21vZGlmaWVyLmlzUG9zc2libGUpIHtcclxuICAgICAgdmFyIGF0dGFja19yb2xsID0gcm9sbF9hdHRhY2sod2VhcG9uLnR5cGUsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGNvdmVyX21vZGlmaWVyLmFkdmFudGFnZV9ib251cylcclxuICAgICAgaWYgKGF0dGFja19yb2xsIDwgMjApIHsvLyBubyBjcml0XHJcbiAgICAgICAgaWYgKHdlYXBvbi50eXBlID09IFwicmFuZ2VkXCIpIHtcclxuICAgICAgICAgIHZhciBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gYXR0YWNrX3JvbGwgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSlcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhaW1cIikpIHsvLyDQn9GA0LjRhtC10Lsg0LTQsNCx0LvQuNGCINCx0L7QvdGD0YEg0L/QvtC/0LDQtNCw0L3QuNGPXHJcbiAgICAgICAgICAgIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICAgICAgICB0b1NlbmQuYWltX292ZXIgPSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5zdHJlbmd0aClcclxuICAgICAgICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwiZW5lcmd5XCIpIHtcclxuICAgICAgICAgIHZhciBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gYXR0YWNrX3JvbGwgKyAyKnBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gICAgICAgIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJ0aHJvd2luZ1wiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5hZ2lsaXR5KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGF0dGFja19ib251cyA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIHZhciB1bml2ZXJzYWxfYm9udXMgPSBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICBjb25zb2xlLmxvZyhcItCR0L7QvdGD0YEg0LDRgtCw0LrQuDogXCIgKyBhdHRhY2tfYm9udXMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0JHQvtC90YPRgSDQstGB0LXQvtCx0YnQuNC5OiBcIiArIHVuaXZlcnNhbF9ib251cyk7XHJcblxyXG4gICAgICAgIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsICsgYXR0YWNrX2JvbnVzICsgdW5pdmVyc2FsX2JvbnVzICsgY292ZXJfbW9kaWZpZXIuYXR0YWNrX2JvbnVzXHJcblxyXG4gICAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGN1bXVsYXRpdmVfYXR0YWNrX3JvbGxcclxuXHJcbiAgICAgICAgaWYgKGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPiB0YXJnZXRfY2hhcmFjdGVyX0tEKSB7Ly8g0JXRgdGC0Ywg0L/RgNC+0LHQuNGC0LjQtVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID09IDEpIHtcclxuICAgICAgICAgICAgdmFyIGV2YWRlX3JvbGwgPSByb2xsX2V2YXNpb24odGFyZ2V0X2NoYXJhY3RlciwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIHRvU2VuZC5ldmFkZV9yb2xsID0gZXZhZGVfcm9sbFxyXG4gICAgICAgICAgICBpZiAoZXZhZGVfcm9sbCA+IGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwpIHsgLy9zdWNjZXNmdWxseSBldmFkZWRcclxuICAgICAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZXZhZGVkXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfY2hhcmFjdGVyX251bWJlciwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiS0RfYmxvY2tcIlxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHsgLy8gZnVsbCBjcml0XHJcbiAgICAgICAgdG9TZW5kLmF0dGFja19yb2xsID0gYXR0YWNrX3JvbGxcclxuICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfY2hhcmFjdGVyX251bWJlciwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZ1bGxfY3JpdFwiXHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jb3ZlclwiXHJcbiAgfVxyXG5cclxuICAgIGlmICh0b1NlbmQuaGFzT3duUHJvcGVydHkoXCJkYW1hZ2Vfcm9sbFwiKSAmJiB3ZWFwb24uaGFzT3duUHJvcGVydHkoXCJzdWJ0eXBlXCIpICYmIHdlYXBvbi5zdWJ0eXBlID09IFwiZHJvYm92aWtcIikge1xyXG4gICAgICB2YXIgc2xvd19zY2FsZSA9IHBhcnNlRmxvYXQod2VhcG9uLnNsb3dfc2NhbGUpO1xyXG4gICAgICB2YXIgZnVsbF9ocCA9IEhQX3ZhbHVlc1twYXJzZUludCh0YXJnZXRfY2hhcmFjdGVyLnN0YW1pbmEpXVxyXG4gICAgICB2YXIgY3VycmVudF9tb3ZlcyA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIGZyYWN0aW9uID0gcGFyc2VGbG9hdCh0b1NlbmQuZGFtYWdlX3JvbGwpL3BhcnNlRmxvYXQoZnVsbF9ocClcclxuICAgICAgdmFyIG1vdmVfcmVkdWN0aW9uID0gY3VycmVudF9tb3ZlcyAqIGZyYWN0aW9uICogc2xvd19zY2FsZTtcclxuICAgICAgdG9TZW5kLm1vdmVfcmVkdWN0aW9uID0gbW92ZV9yZWR1Y3Rpb247XHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvi4uLlwiKVxyXG4gIH1cclxuICBzdG9wX2F0dGFjaygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGF0dGFja19vYnN0YWNsZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfY2hvc2VuLndlYXBvbl9pZF1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG4gICAgdmFyIHRhcmdldF9vYnN0YWNsZV9udW1iZXIgPSBNYXRoLmFicyhnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSk7XHJcbiAgICB2YXIgdGFyZ2V0X29ic3RhY2xlID0gb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1t0YXJnZXRfb2JzdGFjbGVfbnVtYmVyXVxyXG5cclxuICAgIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3Zlcih1c2VyX3Bvc2l0aW9uLCBpbmRleClcclxuICAgIHZhciBjb3Zlcl9tb2RpZmllciA9IGNvdmVyX21vZChhY2N1bXVsYXRlZF9jb3ZlcilcclxuXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdhdHRhY2tfb2JzdGFjbGUnO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5hdHRhY2tlcl9pZCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmF0dGFja2VyX3Bvc2l0aW9uID0gdXNlcl9wb3NpdGlvblxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9vYnN0YWNsZV9udW1iZXJcclxuICAgIHRvU2VuZC51c2VyX2ludmlzaWJpbGl0eV9lbmRlZCA9IDBcclxuICAgIHRvU2VuZC5hdHRhY2tfdHlwZSA9IHdlYXBvbi50eXBlXHJcbiAgICB0b1NlbmQuY292ZXJfbGV2ZWwgPSBjb3Zlcl9tb2RpZmllci5jb3Zlcl9sZXZlbFxyXG4gICAgdG9TZW5kLnRhcmdldF9wb3NpdGlvbiA9IGluZGV4O1xyXG5cclxuICAgIGlmICh3ZWFwb24uaGFzT3duUHJvcGVydHkoXCJzdWJ0eXBlXCIpICYmIHdlYXBvbi5zdWJ0eXBlID09IFwiUFBcIikge1xyXG4gICAgICB0b1NlbmQucXVpY2tfYXR0YWNrX3JlYWR5ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICE9IFwiYWxsXCIgJiYgd2VhcG9uLnR5cGUgIT0gXCJ0aHJvd2luZ1wiKSB7XHJcbiAgICAgIHRvU2VuZC51c2VyX2ludmlzaWJpbGl0eV9lbmRlZCA9IDFcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY292ZXJfbW9kaWZpZXIuaXNQb3NzaWJsZSkge1xyXG4gICAgICBpZiAodGFyZ2V0X29ic3RhY2xlLmhhc093blByb3BlcnR5KFwidG91Z2huZXNzXCIpKSB7XHJcbiAgICAgICAgdmFyIGF0dGFja19yb2xsID0gcm9sbF94KDIwKTtcclxuICAgICAgICB2YXIgZGFtYWdlID0gMDtcclxuICAgICAgICBzd2l0Y2goYXR0YWNrX3JvbGwpIHtcclxuICAgICAgICAgIGNhc2UgMTk6XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIHVzZXJfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDIwOlxyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIGRhbWFnZSAqPSAyO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgZGFtYWdlICs9IHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgIGlmIChkYW1hZ2UgPj0gdGFyZ2V0X29ic3RhY2xlLnRvdWdobmVzcykge1xyXG4gICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRlc3Ryb3llZFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwidW50b3VjaGVkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5kYW1hZ2UgPSAwO1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJ1bnRvdWNoZWRcIjtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jb3ZlclwiO1xyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+Li4uXCIpO1xyXG4gIH1cclxuICBzdG9wX2F0dGFjaygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfbnVtYmVyKSB7XHJcbiAgdmFyIGRhbWFnZSA9IDBcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgaWYgKGNoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJzbmlwZXJcIikge1xyXG4gICAgaWYgKGF0dGFja19yb2xsIDwgMTYpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWFwb24uZGFtYWdlWzBdOyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3god2VhcG9uLmRhbWFnZVsxXSlcclxuICAgICAgfVxyXG5cclxuICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9udW1iZXJdLmhhc093blByb3BlcnR5KFwid2Vha3Nwb3RcIikgJiYgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfbnVtYmVyXS53ZWFrc3BvdC5odW50ZXJfaWQgPT0gY2hhcmFjdGVyX251bWJlcikge1xyXG4gICAgICAgIHN3aXRjaCAoYXR0YWNrX3JvbGwpIHtcclxuICAgICAgICAgIGNhc2UgMTg6XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSoyXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOTpcclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjJcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjVcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dpdGNoIChhdHRhY2tfcm9sbCkge1xyXG4gICAgICAgICAgY2FzZSAxODpcclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE5OlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqMlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDIwOlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqM1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWFwb24uZGFtYWdlWzBdOyBpKyspIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KHdlYXBvbi5kYW1hZ2VbMV0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAxOSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlYXBvbi5kYW1hZ2VbMF07IGkrKykge1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgfVxyXG4gICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuXHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPT0gMjApIHtcclxuICAgICAgZGFtYWdlID0gZGFtYWdlICogMlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKHdlYXBvbi50eXBlID09IFwicmFuZ2VkXCIpIHtcclxuICAgIHZhciBkYW1hZ2VfdHlwZSA9IFwiYnVsbGV0XCJcclxuICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgdmFyIGRhbWFnZV90eXBlID0gXCJtZWxlZVwiXHJcbiAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcImVuZXJneVwiKSB7XHJcbiAgICAgIHZhciBkYW1hZ2VfdHlwZSA9IFwiZW5lcmd5XCJcclxuICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwidGhyb3dpbmdcIikge1xyXG4gICAgICB2YXIgZGFtYWdlX3R5cGUgPSBcIm1lbGVlXCJcclxuICB9XHJcblxyXG4gIHN3aXRjaChkYW1hZ2VfdHlwZSkge1xyXG4gICAgY2FzZSBcIm1lbGVlXCI6XHJcbiAgICAgIHZhciByZXNpc3QgPSBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfcmVzaXN0W3RhcmdldF9udW1iZXJdXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi0KPRgNC+0L0g0LTQviDRgNC10LfQuNGB0YLQsDogXCIgKyBkYW1hZ2UpXHJcbiAgICAgIGRhbWFnZSA9IHBhcnNlSW50KGRhbWFnZSAqICgxLjAgLSByZXNpc3QpKVxyXG4gICAgICBjb25zb2xlLmxvZyhcItCj0YDQvtC9INC/0L7RgdC70LUg0YDQtdC30LjRgdGC0LA6IFwiICsgZGFtYWdlKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJidWxsZXRcIjpcclxuICAgICAgdmFyIHJlc2lzdCA9IGNoYXJhY3Rlcl9zdGF0ZS5idWxsZXRfcmVzaXN0W3RhcmdldF9udW1iZXJdXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi0KPRgNC+0L0g0LTQviDRgNC10LfQuNGB0YLQsDogXCIgKyBkYW1hZ2UpXHJcbiAgICAgIGRhbWFnZSA9IHBhcnNlSW50KGRhbWFnZSAqICgxLjAgLSByZXNpc3QpKVxyXG4gICAgICBjb25zb2xlLmxvZyhcItCj0YDQvtC9INC/0L7RgdC70LUg0YDQtdC30LjRgdGC0LA6IFwiICsgZGFtYWdlKVxyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIC8vbm90aGluZyBmb3Igbm93XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGFtYWdlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRhbWFnZV9za2lsbF90ZW1wbGF0ZSh0YXJnZXRfcG9zLCB1c2VyX3BvcywgcmFuZ2UsIHVzZXJfaWQsIHNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbiwgYWNjdW11bGF0ZWRfY292ZXIpIHtcclxuICBpZiAoaXNJblJhbmdlKHRhcmdldF9wb3MsIHVzZXJfcG9zLCByYW5nZSkpIHtcclxuXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3RhcmdldF9wb3NdXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2lkXVxyXG5cclxuICAgIHZhciBjb3Zlcl9tb2RpZmllciA9IGNvdmVyX21vZChhY2N1bXVsYXRlZF9jb3ZlcilcclxuXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9pZFxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQuY292ZXJfbGV2ZWwgPSBhY2N1bXVsYXRlZF9jb3ZlclxyXG5cclxuICAgIGlmIChjb3Zlcl9tb2RpZmllci5pc1Bvc3NpYmxlKSB7XHJcblxyXG4gICAgICB2YXIgYXR0YWNrX3JvbGwgPSByb2xsX2F0dGFjayh3ZWFwb24udHlwZSwgdXNlcl9pZCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGNvdmVyX21vZGlmaWVyLmFkdmFudGFnZV9ib251cylcclxuXHJcbiAgICAgIGlmIChhdHRhY2tfcm9sbCA8IDIwKSB7Ly8gbm8gY3JpdFxyXG4gICAgICAgIHZhciBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gYXR0YWNrX3JvbGwgKyBib251c19hdHRhY2sgKyBjb3Zlcl9tb2RpZmllci5hdHRhY2tfYm9udXNcclxuXHJcbiAgICAgICAgdG9TZW5kLmF0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbFxyXG5cclxuICAgICAgICBpZiAoY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA+IHRhcmdldF9jaGFyYWN0ZXJfS0QpIHsvLyDQldGB0YLRjCDQv9GA0L7QsdC40YLQuNC1XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgZXZhZGVfcm9sbCA9IHJvbGxfZXZhc2lvbih0YXJnZXRfY2hhcmFjdGVyLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgdG9TZW5kLmV2YWRlX3JvbGwgPSBldmFkZV9yb2xsXHJcbiAgICAgICAgICAgIGlmIChldmFkZV9yb2xsID4gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCkgeyAvL3N1Y2Nlc2Z1bGx5IGV2YWRlZFxyXG4gICAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJldmFkZWRcIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9pZCwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2lkLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcIktEX2Jsb2NrXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7IC8vIGZ1bGwgY3JpdFxyXG4gICAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsXHJcbiAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2lkLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jcml0XCJcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZ1bGxfY292ZXJcIlxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvU2VuZFxyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX2RhbWFnZShjaGFyYWN0ZXJfbnVtYmVyLCBkYW1hZ2UpIHtcclxuICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJmb3JjZV9maWVsZF90YXJnZXRcIikpIHtcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSAtIGRhbWFnZVxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgc2hpZWxkX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXQuc2hpZWxkX2luZGV4XHJcbiAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkIC0gZGFtYWdlXHJcbiAgICB2YXIgbWVzc2FnZSA9IFwi0KnQuNGCINC/0YDQuNC90Y/QuyDRg9GA0L7QvSDQvdCwINGB0LXQsdGPISDQntGB0YLQsNCy0YjQsNGP0YHRjyDQv9GA0L7Rh9C90L7RgdGC0Yw6IFwiICsgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5zaGllbGRcclxuICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIGlmIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZCA8PSAwKSB7Ly8g0YnQuNGCINGD0L3QuNGH0YLQvtC20LXQvVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IFwiUHJlc3MgRiDQqdC40YLRgy4uLlwiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgdmFyIGNoYXJfbGlzdCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uY2hhcmFjdGVyX2xpc3RcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJfbGlzdFtpXVxyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldFxyXG4gICAgICB9XHJcbiAgICAgIGRlbGV0ZV9vYmplY3RfY29tbWFuZChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnBvc2l0aW9uKVxyXG4gICAgICBkZWxldGUgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFRocm93UmFuZ2UoY2hhcmFjdGVyKSB7XHJcbiAgcmV0dXJuIHRocm93X2Jhc2VfcmFuZ2UgKyBwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpKjJcclxufVxyXG5cclxuZnVuY3Rpb24gbWVsZWVfcGVuYWx0eShkYXRhKSB7XHJcbiAgaWYgKGRhdGEuYXR0YWNrX3R5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmhhc093blByb3BlcnR5KFwibWVsZWVkXCIpKSB7IC8vINC40L3QsNGH0LUg0Y3RhNGE0LXQutGCINGD0LbQtSDQvdCw0LvQvtC20LXQvSwg0L3QtSDQv9C+0LLRgtC+0YDRj9C10LxcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbZGF0YS50YXJnZXRfaWRdIC0gMVxyXG4gICAgICB2YXIgbWVsZWVkX29iamVjdCA9IHt9XHJcbiAgICAgIG1lbGVlZF9vYmplY3QuY29vbGRvd24gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLm1lbGVlZCA9IG1lbGVlZF9vYmplY3RcclxuICAgIH1cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEudGFyZ2V0X2lkXSA9PSAxKSB7XHJcbiAgICAgIHZhciBjb29sZG93biA9IDFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBjb29sZG93biA9IDBcclxuICAgIH1cclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLm1lbGVlZC5jb29sZG93biA9IGNvb2xkb3duXHJcbiAgfVxyXG59XHJcblxyXG4vLyBTa2lsbHMhXHJcblxyXG5mdW5jdGlvbiB1c2Vfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKSB7XHJcbiAgc2tpbGxfaW5kZXggPSBwYXJzZUludChza2lsbF9pbmRleClcclxuICBzd2l0Y2goc2tpbGxfaW5kZXgpIHtcclxuICAgIGNhc2UgMDogLy/QoNGL0LLQvtC6XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgIGlmICgoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJjaGFyZ2VfdXNlclwiKSkpIHtcclxuICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQktGLINGD0LbQtSDRgdC+0LLQtdGA0YjQuNC70Lgg0LzQsNC60YHQuNC80LDQu9GM0L3QvtC1INGH0LjRgdC70L4g0YDRi9Cy0LrQvtCyINCyINGN0YLQvtGCINGF0L7QtFwiKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTogLy/Qn9GA0LjQu9C40LIg0JDQtNGA0LXQvdCw0LvQuNC90LBcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhZHJlbmFsaW5lX3VzZXJcIikpIHtcclxuICAgICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtVwiKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOiAvLyDQn9C+0LTRgNC10LfQsNGC0Ywg0YHRg9GF0L7QttC40LvQuNGPXHJcbiAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJjdXRfbGltYl91c2VyXCIpKSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzOiAvLyDQodC70LDQsdC+0LUg0LzQtdGB0YLQvlxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDQ6IC8vINCb0LXRh9C10L3QuNC1XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA1OiAvLyDQkdC+0LvRjNGI0L7QuSDQsdGA0LDRglxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDY6IC8vINCf0L7QtNC90Y/RgtGMINGJ0LjRgtGLXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCB8fCBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwic2hpZWxkX3VwXCIpKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwic2hpZWxkX3VwXCIpKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInNoaWVsZF9kb3duXCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic2hpZWxkX3VwXCJcclxuICAgICAgfVxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA3OiAvLyDQv9C+0LbQuNGA0LDQvdC40LUg0YHRg9GJ0L3QvtGB0YLQuFxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgODogLy8g0YPQt9C90LDRgtGMINCx0LjQvtC/0YPQu1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImJpb3Bvb2xcIikpIHtcclxuICAgICAgICBhbGVydChcItCd0LDQutC+0L/Qu9C10L3QvdGL0Lkg0LHQuNC+0L/Rg9C7OiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uYmlvcG9vbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LDQutC+0L/Qu9C10L3QvdGL0Lkg0LHQuNC+0L/Rg9C7INC+0YLRgdGD0YLRgdGC0LLRg9C10YJcIilcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDk6IC8vINCx0LXQt9GD0L/RgNC10YfQvdC+0LUg0LLQvtGB0YHRgtCw0L3QvtCy0LvQtdC90LjQtVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDEwOiAvLyDQvtCx0YvRh9C90L7QtSDQsiDQsdC+0L3Rg9GB0L3QvtC1XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC+0YHQvdC+0LLQvdGL0YUg0LTQtdC50YHRgtCy0LjQuSwg0YfRgtC+0LHRiyDQv9GA0LXQstGA0LDRgtC40YLRjCDQsiDQsdC+0L3Rg9GB0L3Ri9C1IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxMTogLy8g0L7RgtC00YvRhVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbY2hhcmFjdGVyX251bWJlcl0gPT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3X3N0YW1pbmEgPSBNYXRoLm1pbihjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSArIHJlc3Rfc3RhbWluYV9nYWluLCBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXS5zdGFtaW5hXSlcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICAgIHRvU2VuZC5uZXdfc3RhbWluYSA9IG5ld19zdGFtaW5hXHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0JLRiyDRg9C20LUg0YHQvtCy0LXRgNGI0LDQu9C4INC00LXQudGB0YLQstC40Y8g0L3QsCDRjdGC0L7QvCDRhdC+0LTRgywg0YLQsNC6INGH0YLQviDQvdC1INC80L7QttC10YLQtSDQvtGC0LTQvtGF0L3Rg9GC0YxcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDEyOiAvLyDQs9Cw0LfQvtCy0LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCjINCz0YDQsNC90LDRgtGLINC60YPQu9C00LDRg9C9ICjQs9Cw0Lcg0Y3RjdGNINC30LDQstCw0YDQuNCy0LDQtdGC0YHRjywg0YXQtylcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxMzogLy8g0YHQstC10YLQvtGI0YPQvNC+0LLQsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJsaWdodF9zb3VuZF9ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCT0YDQsNC90LDRgtCwINC10YnQtSDQvdC1INCz0L7RgtC+0LLQsFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTQ6IC8vINCo0L7QutC+0LLRi9C5INC40LzQv9GD0LvRjNGBXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTU6IC8vINCf0YvRiS3Qv9GL0Ykt0LPQvlxyXG4gICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJwaWNoX3BpY2hfdXNlclwiKSkge1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCf0YvRiSDQv9GL0Ykg0LXRidC1INC90LAg0L/QtdGA0LXQt9Cw0YDRj9C00LrQtSFcIilcclxuICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTY6IC8vINCh0LjQu9C+0LLQvtC1INC/0L7Qu9C1XHJcbiAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiZm9yY2VfZmllbGRfdXNlclwiKSkge1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQk9C10L3QtdGA0LDRgtC+0YAg0YHQuNC70L7QstC+0LPQviDQv9C+0LvRjyDQtdGJ0LUg0L3QtSDQt9Cw0YDRj9C00LjQu9GB0Y8hXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTc6IC8vINCY0L3QstC40LdcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXg7XHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJuYW1lID0gbXlfbmFtZTtcclxuICAgICAgICAgICAgdG9TZW5kLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE4OiAvLyDQkdC+0LXQstCw0Y8g0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtGMXHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleDtcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxOTogLy8g0JvQsNC60Lgg0YjQvtGCXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjA6IC8vINCb0L7RgtC10YDQtdC50L3Ri9C5INCy0YvRgdGC0YDQtdC7XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjE6IC8v0J/RgNC40LvQuNCyINC00LXQudGB0YLQstC40LlcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhY3Rpb25fc3BsYXNoXCIpKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICB0b1NlbmQuZXh0cmFfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcblxyXG4gICAgY2FzZSAyMjogLy8g0LPRgNCw0LQg0YPQtNCw0YDQvtCyXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDEpIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCU0LvRjyDQs9GA0LDQtNCwINGD0LTQsNGA0L7QsiDRgtGA0LXQsdGD0LXRgtGB0Y8g0LHQvtC70YzRiNC1IDEg0L7RgdC90L7QstC90L7Qs9C+INC00LXQudGB0YLQstC40Y8hXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIzOiAvL9CQ0LTRgNC10L3QsNC70LjQvdC+0LLRi9C5INC/0L7RgtC+0L9cclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInBvaXNvbm91c19hZHJlbmFsaW5lX3VzZXJcIikpIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1XCIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI0OiAvLyDQutC40YHQu9C+0YLQvdCw0Y8g0LPRgNCw0L3QsNGC0LBcclxuICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFjaWRfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0KMg0LPRgNCw0L3QsNGC0Ysg0LrRg9C70LTQsNGD0L0gKNC60LjRgdC70L7RgtCwINC+0LrQuNGB0LvRj9C10YLRgdGPKVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyNTogLy8g0JfQsNC80LjQvdC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgICB0b1NlbmQucGxheWVyX25hbWUgPSBteV9uYW1lXHJcbiAgICAgICAgICAgIHRvU2VuZC5wb3NpdGlvbiA9IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI2OiAvLyDQktC30LDQuNC80L7QtNC10LnRgdGC0LLQvtCy0LDRgtGMXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCt0YLQviDRg9C80LXQvdC40LUg0YLRgNC10LHRg9C10YIgMSDQsdC+0L3Rg9GB0L3QvtC1INC00LXQudGB0YLQstC40LUhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI3OiAvLyDQndC40LrQvtGC0LjQvdC+0LLRi9C5INGD0LTQsNGAXHJcbiAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJ0b2JhY2NvX3N0cmlrZVwiKSkge1xyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC10LvRjNC30Y8g0LfQsNGC0Y/Qs9C40LLQsNGC0YzRgdGPINGC0LDQuiDRh9Cw0YHRgtC+ISDQoyDQstCw0YEg0LfQsNCy0LjRgdC40LzQvtGB0YLRjFwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI4OiAvLyDQmtGA0YPRh9C10L3Ri9C1INC/0YPQu9C4XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOTogLy8g0J/RgNC40YbQtdC70LjRgtGM0YHRj1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSkge1xyXG4gICAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0JLRiyDRg9C20LUg0L/RgNC40YbQtdC70LjQu9C40YHRjCAtINC/0L7RgNCwINGI0LzQsNC70Y/RgtGMXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDMwOiAvLyDQsdGL0YHRgtGA0LDRjyDQsNGC0LDQutCwXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInF1aWNrX2F0dGFja19yZWFkeVwiKSkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCh0L/QtdGA0LLQsCDQvdGD0LbQvdC+INGB0L7QstC10YDRiNC40YLRjCDQvtGB0L3QvtCy0L3Rg9GOINCw0YLQsNC60YMhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDMxOiAvLyDRgdC70YPQttCx0LAg0YHQv9Cw0YHQtdC90LjRj1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAxKSB7Ly8g0LTQstCwINCx0L7QvdGD0YHQvdGL0YVcclxuICAgICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwic2FmZXR5X3NlcnZpY2VfdXNlclwiKSkge1xyXG4gICAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzI6IC8vINCa0LDQu9GM0LjQvdCz0LDQu9C70Y/RgtC+0YBcclxuICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJjYWxpbmdhbGF0b3JfdXNlclwiKSkge1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQp9GA0LXQt9C80LXRgNC90L7QtSDQutCw0LvQuNC90LPQsNC70LjRgNC+0LLQsNC90LjQtSDQstGA0LXQtNC40YIg0LLQsNGI0LXQvNGDINC30LTQvtGA0L7QstGM0Y4hICjQutGD0LvQtNCw0YPQvSlcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzMzogLy8g0JHQsNGE0YQg0JHQtdC70YzQstC10YJcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzQ6IC8vINCi0YDQsNC90YHRhNC+0YDQvNCw0YbQuNGPINCR0LXQu9GM0LLQtdGCXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYmVsdmV0X2J1ZmZfdXNlclwiKSkge1xyXG4gICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5iZWx2ZXRfYnVmZl91c2VyLmhhc093blByb3BlcnR5KFwidHJhbnNmb3JtZWRcIikpIHtcclxuICAgICAgICAgIGJlbHZldF90cmFuc2Zvcm1hdGlvbihjaGFyYWN0ZXJfbnVtYmVyLCBza2lsbF9pbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0JLRiyDRg9C20LUg0L7RgtC60YDRi9C70Lgg0YHQstC+0Y4g0LjRgdGC0LjQvdC90YPRjiDRgdGD0YnQvdC+0YHRgtGMIC0g0L/QvtCy0YLQvtGA0L3QsNGPINGC0YDQsNC90YHRhNC+0YDQvNCw0YbQuNGPINC90LXQstC+0LfQvNC+0LbQvdCwIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQktGLINC00L7Qu9C20L3RiyDRgdC/0LXRgNCy0LAg0L/QvtC00LPQvtGC0L7QstC40YLRjNGB0Y8g0Log0YLRgNCw0L3RgdGE0L7RgNC80LDRhtC40LgsINGB0L7QsdGA0LDQsiDQtNC+0YHRgtCw0YLQvtGH0L3QviDQtNC90Log0L/RgNC+0YLQuNCy0L3QuNC60L7QslwiKTtcclxuICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzU6IC8vINGF0YPQulxyXG4gICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImhvb2tfdXNlclwiKSkge1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDM2OiAvLyDQutCw0YDQsNGO0YnQuNC5INGD0LTQsNGAXHJcbiAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInB1bmlzaGluZ19zdHJpa2VfdXNlclwiKSkge1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1IVwiKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDQt9C90LDQtdC8INGN0YLQviDRg9C80LXQvdC40LVcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpIHtcclxuICBzd2l0Y2goY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCkge1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICBhZHJlbmFsaW5lKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMjogLy8g0J/QvtC00YDQtdC30LDRgtGMINGB0YPRhdC+0LbQuNC70LjRj1xyXG4gICAgICBjdXRfbGltYnMoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzOiAvLyDQodC70LDQsdC+0LUg0LzQtdGB0YLQvlxyXG4gICAgICB3ZWFrX3Nwb3QoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA0OiAvLyDQm9C10YfQtdC90LjQtVxyXG4gICAgICBoZWFsKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNTogLy8g0JHQvtC70YzRiNC+0Lkg0LHRgNCw0YJcclxuICAgICAgYmlnX2JybyhpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDc6IC8vINC/0L7QttC40YDQsNC90LjQtVxyXG4gICAgICBkZXZvdXIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA5OlxyXG4gICAgICBhYnNvbHV0ZV9yZWNvdmVyeShpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDEyOlxyXG4gICAgICBnYXNfYm9tYihpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDEzOlxyXG4gICAgICBsaWdodF9zb3VuZF9ib21iKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTQ6XHJcbiAgICAgIHNob2NrX3dhdmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNTpcclxuICAgICAgcGljaF9waWNoX2dvKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTY6XHJcbiAgICAgIGZvcmNlX2ZpZWxkKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDE5OlxyXG4gICAgICBsdWNreV9zaG90KGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIwOlxyXG4gICAgICBsb3R0ZXJ5X3Nob3QoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjI6XHJcbiAgICAgIHB1bmNoX3JhaW5mYWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIzOlxyXG4gICAgICBwb2lzb25vdXNfYWRyZW5hbGluZShpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyNDpcclxuICAgICAgYWNpZF9ib21iKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI2OlxyXG4gICAgICBpbnRlcmFjdChpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI4OlxyXG4gICAgICBjdXJ2ZWRfYnVsbGV0cyhpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDMwOlxyXG4gICAgICBxdWlja19hdHRhY2soaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzMTpcclxuICAgICAgc2FmZXR5X3NlcnZpY2UoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzMjpcclxuICAgICAgY2FsaW5nYWxhdG9yKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzM6XHJcbiAgICAgIGJlbHZldF9idWZmKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDM1OlxyXG4gICAgICBob29rKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDM2OlxyXG4gICAgICBwdW5pc2hpbmdfc3RyaWtlKGluZGV4LCBjZWxsKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYWxlcnQoXCJVbmtub3duIHRhcmdldGVkIHNraWxsXCIpXHJcbiAgfVxyXG4gIHN0b3Bfc2tpbGwoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDNcclxuICBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkID0gc2tpbGxfaW5kZXhcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gcG9zaXRpb25cclxuICBjZWxsLnNyYyA9IFwiLi9pbWFnZXMvQ2hpZG9yaS53ZWJwXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhvb2soaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbjtcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBob29rX3JhbmdlKSkge1xyXG4gICAgdmFyIHRhcmdldF9wb3NpdGlvbiA9IGluZGV4O1xyXG4gICAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZDtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdGFyZ2V0X3Bvc2l0aW9uXTtcclxuICAgIGlmICh0YXJnZXRfY2hhcmFjdGVyX251bWJlciA+IDApIHtcclxuICAgICAgdmFyIHVzZXJfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyh1c2VyX3Bvc2l0aW9uLCBnYW1lX3N0YXRlLnNpemUpO1xyXG4gICAgICB2YXIgdGFyZ2V0X2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXModGFyZ2V0X3Bvc2l0aW9uLCBnYW1lX3N0YXRlLnNpemUpO1xyXG4gICAgICB2YXIgdXBkYXRlZF9jb29yZCA9IHVzZXJfY29vcmQ7XHJcbiAgICAgIHZhciB2ZWN0b3IgPSB7fVxyXG4gICAgICB2ZWN0b3IueCA9ICh0YXJnZXRfY29vcmQueCAtIHVzZXJfY29vcmQueCk7XHJcbiAgICAgIHZlY3Rvci55ID0gKHRhcmdldF9jb29yZC55IC0gdXNlcl9jb29yZC55KTtcclxuICAgICAgaWYgKHZlY3Rvci54ID4gMCkge1xyXG4gICAgICAgIHVwZGF0ZWRfY29vcmQueCArPSAxO1xyXG4gICAgICB9IGVsc2UgaWYgKHZlY3Rvci54IDwgMCkge1xyXG4gICAgICAgIHVwZGF0ZWRfY29vcmQueCAtPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodmVjdG9yLnkgPiAwKSB7XHJcbiAgICAgICAgdXBkYXRlZF9jb29yZC55ICs9IDE7XHJcbiAgICAgIH0gZWxzZSBpZiAodmVjdG9yLnkgPCAwKSB7XHJcbiAgICAgICAgdXBkYXRlZF9jb29yZC55IC09IDE7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIHRvU2VuZCA9IHt9XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdmFyIG5ld19wb3NpdGlvbiA9IGNvb3JkX3RvX2luZGV4KHVwZGF0ZWRfY29vcmQsIGdhbWVfc3RhdGUuc2l6ZSlcclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbbmV3X3Bvc2l0aW9uXSA9PSAwKSB7XHJcbiAgICAgICAgdG9TZW5kLmhvb2tfcG9zc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRvU2VuZC5vbGRfcG9zaXRpb24gPSB0YXJnZXRfcG9zaXRpb247XHJcbiAgICAgICAgdG9TZW5kLm5ld19wb3NpdGlvbiA9IG5ld19wb3NpdGlvbjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQuaG9va19wb3NzaWJsZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQktCw0YjQuCDRhtC10LvQuCDQt9CwINC/0YDQtdC00LXQu9Cw0LzQuCDQvNC+0LXQs9C+INC/0L7QvdC40LzQsNC90LjRjywg0L/QvtGN0YLQvtC80YMg0L3QtdGCXCIpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCc0LDQutGB0LjQvNCw0LvRjNC90YvQuSDRgNCw0LTQuNGD0YEg0YXRg9C60LAgLSAzINC60LvQtdGC0LrQuFwiKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBiZWx2ZXRfdHJhbnNmb3JtYXRpb24odXNlcl9pbmRleCwgc2tpbGxfaW5kZXgpIHtcclxuICB2YXIgdXNlciA9ICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XTtcclxuICB2YXIgdGFyZ2V0c19zZXQgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJlbHZldF9idWZmX3VzZXIudGFyZ2V0c19zZXQ7XHJcbiAgdmFyIHRvdGFsX3VwZ3JhZGUgPSAwO1xyXG4gIHZhciByb2xsZWRfYnVmZnNfdGFyZ2V0cyA9IFtdO1xyXG4gIHZhciByb2xsZWRfYnVmZnNfb3V0Y29tZXMgPSBbXTtcclxuICBmb3IgKHZhciB0YXJnZXRfaWQgb2YgdGFyZ2V0c19zZXQpIHtcclxuICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfaWRdO1xyXG4gICAgdmFyIHRhcmdldF9zdGFja3MgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pZF0uYmVsdmV0X2J1ZmZfc3RhY2tzLnN0YWNrcztcclxuICAgIHZhciBidWZmc19hcnJheSA9IFtdO1xyXG4gICAgdmFyIHJvbGxlZF9hcnJheSA9IFswLDAsMCwwLDBdO1xyXG4gICAgYnVmZnNfYXJyYXkucHVzaCh0YXJnZXQuc3RyZW5ndGgpO1xyXG4gICAgYnVmZnNfYXJyYXkucHVzaCh0YXJnZXQuc3RhbWluYSk7XHJcbiAgICBidWZmc19hcnJheS5wdXNoKHRhcmdldC5hZ2lsaXR5KTtcclxuICAgIGJ1ZmZzX2FycmF5LnB1c2godGFyZ2V0LmludGVsbGlnZW5jZSk7XHJcbiAgICBidWZmc19hcnJheS5wdXNoKGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdGFyZ2V0X2lkXSAtIDgpO1xyXG4gICAgdmFyIHRvdGFsX3JvbGwgPSB0YXJnZXQuc3RyZW5ndGggKyB0YXJnZXQuc3RhbWluYSArIHRhcmdldC5hZ2lsaXR5ICsgdGFyZ2V0LmludGVsbGlnZW5jZSArIGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdGFyZ2V0X2lkXSAtIDg7XHJcbiAgICB3aGlsZSAodGFyZ2V0X3N0YWNrcyA+IDAgJiYgdG90YWxfcm9sbCA+IDApIHtcclxuICAgICAgdmFyIHJvbGwgPSByb2xsX3godG90YWxfcm9sbCk7XHJcbiAgICAgIGlmIChyb2xsIDw9IGJ1ZmZzX2FycmF5WzBdKSB7Ly8gc3RyZW5ndGhcclxuICAgICAgICBidWZmc19hcnJheVswXSAtPSAxO1xyXG4gICAgICAgIHJvbGxlZF9hcnJheVswXSArPSAxO1xyXG4gICAgICB9IGVsc2UgaWYgKHJvbGwgPD0gYnVmZnNfYXJyYXlbMF0gKyBidWZmc19hcnJheVsxXSkgey8vc3RhbWluYVxyXG4gICAgICAgIGJ1ZmZzX2FycmF5WzFdIC09IDE7XHJcbiAgICAgICAgcm9sbGVkX2FycmF5WzFdICs9IDE7XHJcbiAgICAgIH0gZWxzZSBpZiAocm9sbCA8PSBidWZmc19hcnJheVswXSArIGJ1ZmZzX2FycmF5WzFdICsgYnVmZnNfYXJyYXlbMl0pIHsvLyBhZ2lsaXR5XHJcbiAgICAgICAgYnVmZnNfYXJyYXlbMl0gLT0gMTtcclxuICAgICAgICByb2xsZWRfYXJyYXlbMl0gKz0gMTtcclxuICAgICAgfSBlbHNlIGlmIChyb2xsIDw9IGJ1ZmZzX2FycmF5WzBdICsgYnVmZnNfYXJyYXlbMV0gKyBidWZmc19hcnJheVsyXSArIGJ1ZmZzX2FycmF5WzNdKSB7Ly8gaW50ZWxsaWdlbmNlXHJcbiAgICAgICAgYnVmZnNfYXJyYXlbM10gLT0gMTtcclxuICAgICAgICByb2xsZWRfYXJyYXlbM10gKz0gMTtcclxuICAgICAgfSBlbHNlIHsvLyBLRFxyXG4gICAgICAgIGJ1ZmZzX2FycmF5WzRdIC09IDE7XHJcbiAgICAgICAgcm9sbGVkX2FycmF5WzRdICs9IDE7XHJcbiAgICAgIH1cclxuICAgICAgdG90YWxfcm9sbCAtPSAxO1xyXG4gICAgICB0YXJnZXRfc3RhY2tzIC09IDE7XHJcbiAgICAgIHRvdGFsX3VwZ3JhZGUgKz0gMTtcclxuICAgIH1cclxuICAgIHJvbGxlZF9idWZmc190YXJnZXRzLnB1c2godGFyZ2V0X2lkKTtcclxuICAgIHJvbGxlZF9idWZmc19vdXRjb21lcy5wdXNoKHJvbGxlZF9hcnJheSk7XHJcbiAgfVxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9pbmRleFxyXG4gIHRvU2VuZC50b3RhbF91cGdyYWRlID0gdG90YWxfdXBncmFkZTtcclxuICB0b1NlbmQucm9sbGVkX2J1ZmZzX3RhcmdldHMgPSByb2xsZWRfYnVmZnNfdGFyZ2V0c1xyXG4gIHRvU2VuZC5yb2xsZWRfYnVmZnNfb3V0Y29tZXMgPSByb2xsZWRfYnVmZnNfb3V0Y29tZXM7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzYWZldHlfc2VydmljZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHNhZmV0eV9zZXJ2aWNlX3JhbmdlKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJzYWZldHlfc2VydmljZV90YXJnZXRcIikpIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQrdGC0LAg0YbQtdC70Ywg0YPQttC1INC/0L7QtCDQt9Cw0YnQuNGC0L7QuVwiKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCS0Ysg0L3QtSDQvNC+0LbQtdGC0LUg0LfQsNGJ0LjRidCw0YLRjCDRgSDRgtCw0LrQvtCz0L4g0YDQsNGB0YHRgtC+0Y/QvdC40Y9cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJlbHZldF9idWZmKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgYmVsdmV0X2J1ZmZfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImJlbHZldF9idWZmX3RhcmdldFwiKSkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LAg0Y3RgtC+0Lwg0L/QtdGA0YHQvtC90LDQttC1INGD0LbQtSDQtdGB0YLRjCDQsNC60YLQuNCy0L3Ri9C5INCx0LDRhNGEINGN0YLQvtCz0L4g0YLQuNC/0LAgKNGD0LLRiylcIilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQktGLINC90LUg0LzQvtC20LXRgtC1INCx0LDRhNGE0LDRgtGMICjRhdC1LdGF0LUpINGBINGC0LDQutC+0LPQviDRgNCw0YHRgdGC0L7Rj9C90LjRj1wiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gd2Vha19zcG90KGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgdmFyIGludF9jaGVjayA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICBpZiAoaW50X2NoZWNrID49IHdlYWtfc3BvdF90aHJlc2hvbGQpIHtcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICB9IGVsc2Uge1xyXG4gICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gIH1cclxuXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhlYWwoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBoZWFsX3JhbmdlKSkge1xyXG5cclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciBoZWFsZXJfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gIHZhciB0YXJnZXRfaHAgPSBjaGFyYWN0ZXJfc3RhdGUuSFBbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRhcmdldF9mdWxsX2hwID0gSFBfdmFsdWVzW3RhcmdldF9jaGFyYWN0ZXIuc3RhbWluYV1cclxuICB2YXIgcmF0aW8gPSBwYXJzZUZsb2F0KHRhcmdldF9ocCkvcGFyc2VGbG9hdCh0YXJnZXRfZnVsbF9ocClcclxuXHJcbiAgdmFyIGhlYWxfcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChoZWFsZXJfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICBpZiAoaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgaGVhbF9yb2xsID0gaGVhbF9yb2xsICsgcGFyc2VJbnQoaGVhbGVyX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgfVxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQuaGVhbF9yb2xsID0gaGVhbF9yb2xsXHJcblxyXG4gIHZhciB0aHJlc2hvbGQgPSAwXHJcbiAgdmFyIGNyaXRpY2FsX3RocmVzaG9sZCA9IDBcclxuXHJcbiAgaWYgKHJhdGlvID4gMC45KSB7XHJcbiAgICB0aHJlc2hvbGQgPSAxMFxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgIHRvU2VuZC5uZXdfaHAgPSB0YXJnZXRfZnVsbF9ocFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjc1KSB7XHJcbiAgICB0aHJlc2hvbGQgPSAxNVxyXG4gICAgY3JpdGljYWxfdGhyZXNob2xkID0gMjVcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgaWYgKGhlYWxfcm9sbCA+IGNyaXRpY2FsX3RocmVzaG9sZCAmJiBoZWFsZXJfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcIm1lZFwiKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImNyaXRpY2FsIHN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSB0YXJnZXRfZnVsbF9ocFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuOTUpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC41KSB7XHJcbiAgICB0aHJlc2hvbGQgPSAyMFxyXG4gICAgY3JpdGljYWxfdGhyZXNob2xkID0gMjlcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgaWYgKGhlYWxfcm9sbCA+IGNyaXRpY2FsX3RocmVzaG9sZCAmJiBoZWFsZXJfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcIm1lZFwiKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImNyaXRpY2FsIHN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC45NSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjgyKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuMykge1xyXG4gICAgdGhyZXNob2xkID0gMjNcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDMyXHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuODIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC42MilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjE1KSB7XHJcbiAgICB0aHJlc2hvbGQgPSAyNlxyXG4gICAgY3JpdGljYWxfdGhyZXNob2xkID0gMzVcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgaWYgKGhlYWxfcm9sbCA+IGNyaXRpY2FsX3RocmVzaG9sZCAmJiBoZWFsZXJfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcIm1lZFwiKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImNyaXRpY2FsIHN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC42MilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjQpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC4wNSkge1xyXG4gICAgdGhyZXNob2xkID0gMzBcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDQwXHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjIyKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICB9XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQndGD0LbQvdC+INC/0L7QtNC+0LnRgtC4INCx0LvQuNC20LUg0Log0YbQtdC70Lgg0YfRgtC+0LHRiyDQstGL0LvQtdGH0LjRgtGMXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBiaWdfYnJvKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgYmlnX2Jyb19yYW5nZSkpIHtcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG5cclxuICB2YXIgc2hpZWxkX0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdKVxyXG4gIHZhciB0YXJnZXRfS0QgPSBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKVxyXG5cclxuICB2YXIgYm9udXNfS0QgPSBNYXRoLm1heChzaGllbGRfS0QgLSAgdGFyZ2V0X0tELCAwKVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLmJvbnVzX0tEID0gYm9udXNfS0RcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufSBlbHNlIHtcclxuICBhbGVydChcItCR0L7Qu9GM0YjQvtC5INCx0YDQsNGCINC90LUg0LTQvtGB0YLQsNC10YIg0LTQviDQvNCw0LvQvtCz0L4hXCIpXHJcbn1cclxufVxyXG5cclxuZnVuY3Rpb24gcHVuaXNoaW5nX3N0cmlrZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXTtcclxuICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgc3RhdF9ib251cztcclxuICBzd2l0Y2god2VhcG9uLnR5cGUpIHtcclxuICAgIGNhc2UgXCJtZWxlZVwiOlxyXG4gICAgICBzdGF0X2JvbnVzID0gYXR0YWNraW5nX2NoYXJhY3Rlci5zdHJlbmd0aDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwicmFuZ2VkXCI6XHJcbiAgICAgIHN0YXRfYm9udXMgPSBhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiZW5lcmd5XCI6XHJcbiAgICAgIHN0YXRfYm9udXMgPSBhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBzdGF0X2JvbnVzID0gMDtcclxuICB9XHJcbiAgY29uc29sZS5sb2coc3RhdF9ib251cyk7XHJcbiAgdmFyIGJvbnVzX2F0dGFjayA9IHN0YXRfYm9udXMgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIoaW5kZXgsIHVzZXJfcG9zaXRpb24pXHJcbiAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3Zlcik7XHJcbiAgaWYgKHRvU2VuZCA9PSBudWxsKSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICh0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJmdWxsX2NyaXRcIikge1xyXG4gICAgICB2YXIgZGFtYWdlX3JvbGwgPSB0b1NlbmQuZGFtYWdlX3JvbGxcclxuICAgICAgdmFyIG11bHRpcGx5ZXIgPSAxLjAgLSBwdW5pc2hpbmdfc3RyaWtlX211bHRpcGx5ZXIqKGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSk7XHJcbiAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCAqPSBtdWx0aXBseWVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBpbmNyZWFzZSBhdHRhY2sgcm9sbCBieSBhZ2lsaXR5IGJvbnVzICgyKm1vZClcclxuZnVuY3Rpb24gY3V0X2xpbWJzKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGJvbnVzX2F0dGFjayA9IDIqcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5hZ2lsaXR5KSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3ZlcihpbmRleCwgdXNlcl9wb3NpdGlvbilcclxuICAgIHZhciB0b1NlbmQgPSBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbiwgYWNjdW11bGF0ZWRfY292ZXIpXHJcbiAgICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImZ1bGxfY3JpdFwiKSB7XHJcbiAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gdG9TZW5kLmRhbWFnZV9yb2xsXHJcbiAgICAgICAgdmFyIGZsYXRfZGFtYWdlID0gZGFtYWdlX3JvbGwgLSBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuc3RyZW5ndGgpXSAtIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIHZhciBmdWxsX2RhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgaWYgKGZsYXRfZGFtYWdlID4gZnVsbF9kYW1hZ2UvMykge1xyXG4gICAgICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIH0gIGVsc2Uge1xyXG4gICAgICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICAgIH1cclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCS0Ysg0L3QtSDQvNC+0LbQtdGC0LUg0L/QvtC00YDQtdC30LDRgtGMINGB0YPRhdC+0LbQuNC70YzRjyDRjdGC0LjQvCDQvtGA0YPQttC40LXQvFwiKVxyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBxdWlja19hdHRhY2soaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcbiAgaWYgKHdlYXBvbi5oYXNPd25Qcm9wZXJ0eShcInN1YnR5cGVcIikgJiYgd2VhcG9uLnN1YnR5cGUgPT0gXCJQUFwiKSB7XHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIoaW5kZXgsIHVzZXJfcG9zaXRpb24pXHJcbiAgICB2YXIgdG9TZW5kID0gZGFtYWdlX3NraWxsX3RlbXBsYXRlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCwgYm9udXNfYXR0YWNrLCB3ZWFwb24sIGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gICAgaWYgKHRvU2VuZCA9PSBudWxsKSB7XHJcbiAgICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IHRvU2VuZC5kYW1hZ2Vfcm9sbC8yOyAvLyDQsdGL0YHRgtGA0LDRjyDQsNGC0LDQutCwINC90LDQvdC+0YHQuNGCINC/0L7Qu9C+0LLQuNC90YMg0YPRgNC+0L3QsFxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JHRi9GB0YLRgNGD0Y4g0LDRgtCw0LrRgyDQvNC+0LbQvdC+INGB0L7QstC10YDRiNC40YLRjCDRgtC+0LvRjNC60L4g0L/QuNGB0YLQvtC70LXRgtC+0Lwt0L/Rg9C70LXQvNC10YLQvtC8XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwdW5jaF9yYWluZmFsbChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuICBpZiAod2VhcG9uLnR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgIHZhciB0YXJnZXRfY2hhcl9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyX2lkXVxyXG4gICAgdmFyIGJvbnVzX2F0dGFjayA9IHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuYWdpbGl0eSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgICB2YXIgdG90YWxfZGFtYWdlID0gMDtcclxuICAgIHZhciBhdHRhY2tzX3N1Y2Nlc3NmdWwgPSAwO1xyXG4gICAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKGluZGV4LCB1c2VyX3Bvc2l0aW9uKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl07IGkrKykge1xyXG4gICAgICB2YXIgdG9TZW5kID0gZGFtYWdlX3NraWxsX3RlbXBsYXRlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCwgYm9udXNfYXR0YWNrLCB3ZWFwb24sIGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gICAgICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICh0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJmdWxsX2NyaXRcIikge1xyXG4gICAgICAgICAgICBhdHRhY2tzX3N1Y2Nlc3NmdWwgPSBhdHRhY2tzX3N1Y2Nlc3NmdWwgKyAxO1xyXG4gICAgICAgICAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyB0b1NlbmQuZGFtYWdlX3JvbGw7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJfaWRdID0gMDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJldmFkZWRcIiAmJiB0YXJnZXRfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSAhPSBcInJvZ3VlXCIpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVt0YXJnZXRfY2hhcl9pZF0gPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG11bHRpcGx5ZXIgPSAxLjAgKyBwYXJzZUZsb2F0KGF0dGFja3Nfc3VjY2Vzc2Z1bCAtIDEpLzIuMFxyXG4gICAgdmFyIG1lc3NhZ2UgPSBcItCc0L3QvtC20LjRgtC10LvRjCDQs9GA0LDQtNCwINCx0YvQuzogXCIgKyBtdWx0aXBseWVyXHJcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxyXG4gICAgdmFyIGZpbmFsX2RhbWFnZSA9IHBhcnNlSW50KHBhcnNlRmxvYXQodG90YWxfZGFtYWdlKSptdWx0aXBseWVyKVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyX2lkXHJcbiAgICB0b1NlbmQudG90YWxfYXR0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB0b1NlbmQuc3VjY2Vzc2Z1bGxfYXR0YWNrcyA9IGF0dGFja3Nfc3VjY2Vzc2Z1bFxyXG4gICAgdG9TZW5kLmRhbWFnZSA9IGZpbmFsX2RhbWFnZVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCT0YDQsNC0INGD0LTQsNGA0L7QsiDQvNC+0LbQvdC+INGB0L7QstGA0LXRiNC40YLRjCDRgtC+0LvRjNC60L4g0YDRg9C60L7Qv9Cw0YjQvdGL0Lwg0L7RgNGD0LbQuNC10LwhXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG9ja193YXZlKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKGluZGV4LCB1c2VyX3Bvc2l0aW9uKTtcclxuICB2YXIgdG9TZW5kID0gZGFtYWdlX3NraWxsX3RlbXBsYXRlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCwgYm9udXNfYXR0YWNrLCB3ZWFwb24sIGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZXZvdXIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCAxKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciBzdGFja3MgPSAwXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgIHN0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLk1hcmt1c19zdGFja3NcclxuICAgIH1cclxuICAgIHZhciBkYW1hZ2UgPSBzdGFja3MqNSArIHJvbGxfeCgxMClcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWJzb2x1dGVfcmVjb3ZlcnkoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCAxKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciBoZWFsX2Ftb3VudCA9IDBcclxuXHJcbiAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW1hZ2VfZmllbGRcIik7XHJcbiAgICBpZiAoIShkYW1hZ2VfZmllbGQudmFsdWUgPT09IFwiXCIpKSB7XHJcbiAgICAgIGhlYWxfYW1vdW50ID0gcGFyc2VJbnQoZGFtYWdlX2ZpZWxkLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYmlvcG9vbCA9IDBcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJiaW9wb29sXCIpKSB7XHJcbiAgICAgIGJpb3Bvb2wgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uYmlvcG9vbFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChoZWFsX2Ftb3VudCA+IDAgJiYgYmlvcG9vbCA+PSBoZWFsX2Ftb3VudCkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLmhlYWxfYW1vdW50ID0gaGVhbF9hbW91bnRcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LXQstC+0LfQvNC+0LbQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQu9C10YfQtdC90LjRj1wiKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnYXNfYm9tYihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRocm93X3JhbmdlID0gZmluZFRocm93UmFuZ2UoY2hhcmFjdGVyKVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHRocm93X3JhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG4gICAgdG9TZW5kLnRocmVzaG9sZCA9IGNvbXB1dGVfZ2FzX2JvbWJfdGhyZXNob2xkKGNoYXJhY3RlcilcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7Ly8g0LDQvdC40LzQsNGG0LjRjyDRgtC+0LvRjNC60L4g0LIg0L/Rg9GB0YLRg9GOINC60LvQtdGC0LrRg1xyXG4gICAgICBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgZ2FzX2JvbWJfb2JzdGFjbGUpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JzQsNC70L4g0LrQsNGI0Lgg0LXQu9C4INC00LvRjyDRgtCw0LrQvtCz0L4g0LHRgNC+0YHQutCwXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYWxpbmdhbGF0b3IoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7Ly8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YLRgdGPINGC0L7Qu9GM0LrQviDQsiDQv9GD0YHRgtGD0Y4g0LrQu9C10YLQutGDXHJcbiAgICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBjYWxpbmdhbGF0b3JfcmFuZ2UpKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgICAgYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIGNhbGluZ2FsYXRvcl9vYnN0YWNsZSlcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCa0LDQu9GM0LjQvdCz0LDQu9C70Y/RgtC+0YAg0LzQvtC20L3QviDRg9GB0YLQsNC90L7QstC40YLRjCDQu9C40YjRjCDQsiDQv9GA0LXQtNC10LvQsNGFIDEuNSDQutC70LXRgtC60Lgg0L7RgiDQstCw0YFcIilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQmtCw0LvRjNC40L3Qs9Cw0LvQu9GP0YLQvtGAINC80L7QttC90L4g0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0LvQuNGI0Ywg0LIg0L/Rg9GB0YLRg9GOINC60LvQtdGC0LrRg1wiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGlmZnVzZV9sYW5kbWluZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cykpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHRvU2VuZC5pbnRlcmFjdGlvbl90eXBlID0gJ2RpZmZ1c2VfbGFuZG1pbmUnO1xyXG5cclxuICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMoaW5kZXgpKSB7XHJcbiAgICAgIHZhciByb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgIGlmIChyb2xsID4gbGFuZG1pbmVfZGlmZnVzZV90aHJlc2hvbGQpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZW1wdHlcIjtcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCh0LvQuNGI0LrQvtC8INC00LDQu9C10LrQviDQtNC70Y8g0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0LjRj1wiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFja2luZ19ib251cyhjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG4gIHZhciBib251cyA9IHBhcnNlSW50KGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpO1xyXG4gIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwiZW5naW5lZXJcIikge1xyXG4gICAgYm9udXMgKj0gMjtcclxuICB9XHJcbiAgcmV0dXJuIGJvbnVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlcl9oYWNraW5nKGluZGV4LCBvYnN0YWNsZV9udW1iZXIpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbjtcclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkO1xyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGNvbXB1dGVyX2ludGVyYWN0aW9uX3JhZGl1cykpIHtcclxuICAgIHZhciBoYWNrX3N0YWdlID0gMDtcclxuICAgIHZhciBoYWNrX2ZhaWxzID0gMDtcclxuICAgIHZhciBpbmZvX29iamVjdCA9IGdhbWVfc3RhdGUub2JzdGFjbGVfZXh0cmFfaW5mb1tpbmRleF07XHJcbiAgICBpZiAoaW5mb19vYmplY3QuaGFzT3duUHJvcGVydHkoXCJoYWNrX3N0YWdlXCIpKSB7XHJcbiAgICAgIGhhY2tfc3RhZ2UgPSBpbmZvX29iamVjdC5oYWNrX3N0YWdlO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZm9fb2JqZWN0Lmhhc093blByb3BlcnR5KFwiaGFja19mYWlsc1wiKSkge1xyXG4gICAgICBoYWNrX2ZhaWxzID0gaW5mb19vYmplY3QuaGFja19mYWlscztcclxuICAgIH1cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHRvU2VuZC5pbnRlcmFjdGlvbl90eXBlID0gJ2hhY2thYmxlX2NvbXB1dGVyJztcclxuXHJcbiAgICBpZiAoaGFja19zdGFnZSA8IDMgJiYgaGFja19mYWlscyA8IDMpIHsvLyB0aGVyZSBpcyBwb2ludCB0byByb2xsXHJcbiAgICAgIHZhciBoYWNrX3JvbGwgPSByb2xsX3goMjApO1xyXG4gICAgICBpZiAoaGFja19yb2xsID09IDIwKSB7Ly8gY3JpdFxyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gJ2hhY2tlZCc7XHJcbiAgICAgIH0gZWxzZSBpZiAoaGFja19yb2xsID09IDEpIHsvLyBhbnRpY3JpdFxyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gJ2ZhaWxlZCc7XHJcbiAgICAgIH0gZWxzZSB7Ly8gbm9ybWFsXHJcbiAgICAgICAgaGFja19yb2xsICs9IGhhY2tpbmdfYm9udXModXNlcl9jaGFyYWN0ZXJfbnVtYmVyKTtcclxuICAgICAgICBpZiAoaGFja19yb2xsIDwgaGFja2luZ19jcml0aWNhbF9mYWlsX3RocmVzaG9sZCkge1xyXG4gICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSAnZmFpbGVkJztcclxuICAgICAgICB9IGVsc2UgaWYgKGhhY2tfcm9sbCA8IGhhY2tpbmdfc3VjY2Vzc190aHJlc2hvbGQpIHtcclxuICAgICAgICAgIGhhY2tfZmFpbHMgKz0gMTtcclxuICAgICAgICAgIGlmIChoYWNrX2ZhaWxzID09IDMpIHtcclxuICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSAnZmFpbGVkJztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gJ29uZV9mYWlsJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGhhY2tfcm9sbCA8IGhhY2tpbmdfY3JpdGljYWxfc3VjY2Vzc190aHJlc2hvbGQpIHtcclxuICAgICAgICAgIGhhY2tfc3RhZ2UgKz0gMTtcclxuICAgICAgICAgIGlmIChoYWNrX3N0YWdlID09IDMpIHtcclxuICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSAnaGFja2VkJztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gJ29uZV9zdWNjZXNzJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSAnaGFja2VkJztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoaGFja19zdGFnZSA+PSAzKSB7Ly8gYWxyZWFkeSBoYWNrZWRcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSAnYWxyZWFkeV9oYWNrZWQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSAnYWxyZWFkeV9mYWlsZWQnO1xyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLQt9C70L7QvCDQutC+0LzQv9GM0Y7RgtC10YDQsCDQtNC+0LvQttC10L0g0L7RgdGD0YnQtdGB0YLQstC70Y/RgtGM0YHRjyDRgSDRgNCw0YHRgdGC0L7Rj9C90LjRjyAxINC60LvQtdGC0LrQuFwiKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVyYWN0KGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIG9iamVjdF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XTtcclxuICBpZiAob2JqZWN0X251bWJlciA9PSAwKSB7Ly8gZW1wdHksIHNvIGRpZmZ1c2UgbGFuZG1pbmUgbW9kXHJcbiAgICBkaWZmdXNlX2xhbmRtaW5lKGluZGV4LCBjZWxsKTtcclxuICB9IGVsc2UgaWYgKG9iamVjdF9udW1iZXIgPCAwKSB7Ly8gb2JzdGFjbGUgaW50ZXJhY3Rpb25cclxuICAgIHZhciBvYnN0YWNsZV9udW1iZXIgPSBNYXRoLmFicyhvYmplY3RfbnVtYmVyKTtcclxuICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9bb2JzdGFjbGVfbnVtYmVyXTtcclxuICAgIGlmIChvYnN0YWNsZS5oYXNPd25Qcm9wZXJ0eShcImhhY2thYmxlX2NvbXB1dGVyXCIpKSB7XHJcbiAgICAgIGNvbXB1dGVyX2hhY2tpbmcoaW5kZXgsIG9ic3RhY2xlX251bWJlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYWNpZF9ib21iKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGhyb3dfcmFuZ2UgPSBmaW5kVGhyb3dSYW5nZShjaGFyYWN0ZXIpXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgdGhyb3dfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQnNCw0LvQviDQutCw0YjQuCDQtdC70Lgg0LTQu9GPINGC0LDQutC+0LPQviDQsdGA0L7RgdC60LBcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpZ2h0X3NvdW5kX2JvbWIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgbGlnaHRfc291bmRfYm9tYl9yYW5nZSkpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuXHJcbiAgdmFyIGNoYXJhY3Rlcl9saXN0ID0gW11cclxuICB2YXIgb3V0Y29tZV9saXN0ID0gW11cclxuXHJcbiAgdmFyIHJhZGl1cyA9IGxpZ2h0X3NvdW5kX2JvbWJfcmFkaXVzXHJcblxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhZGl1cylcclxuICBjb25zb2xlLmxvZyhjYW5kaWRhdGVfY2VsbHMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0LHQvtC80LHRi1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlICE9PSBcImRyb25lXCIpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfbGlzdC5wdXNoKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIHZhciBzYXZlX3JvbGwgPSByb2xsX3goMjApICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gKyBwYXJzZUludChjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gICAgICAgIGlmIChzYXZlX3JvbGwgPiBsaWdodF9zb3VuZF9ib21iX3RocmVzaG9sZCkge1xyXG4gICAgICAgICAgb3V0Y29tZV9saXN0LnB1c2goMClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb3V0Y29tZV9saXN0LnB1c2goMSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9saXN0ID0gY2hhcmFjdGVyX2xpc3RcclxuICB0b1NlbmQub3V0Y29tZV9saXN0ID0gb3V0Y29tZV9saXN0XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59IGVsc2Uge1xyXG4gIGFsZXJ0KFwi0JTRgNC+0L0g0L3QtSDQtNC+0LrQuNC90LXRglwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcmNlX2ZpZWxkKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGZvcmNlX2ZpZWxkX3JhbmdlKSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG5cclxuICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgdmFyIHNoaWVsZCA9IE1hdGguY2VpbChwYXJzZUZsb2F0KEhQX3ZhbHVlc1t1c2VyLnN0YW1pbmFdKS8yKVxyXG4gIHRvU2VuZC5zaGllbGQgPSBzaGllbGRcclxuXHJcbiAgdmFyIGNoYXJhY3Rlcl9saXN0ID0gW11cclxuXHJcbiAgdmFyIHJhZGl1cyA9IGZvcmNlX2ZpZWxkX3JhZGl1c1xyXG5cclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gaW5kZXhfaW5fcmFkaXVzKGluZGV4LCByYWRpdXMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0YnQuNGC0LBcclxuICAgICAgICBjaGFyYWN0ZXJfbGlzdC5wdXNoKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgfVxyXG4gIH1cclxuICB0b1NlbmQuY2VsbHNfcHJvdGVjdGVkID0gY2FuZGlkYXRlX2NlbGxzXHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9saXN0ID0gY2hhcmFjdGVyX2xpc3RcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIGZvcmNlX2ZpZWxkX29ic3RhY2xlKVxyXG59IGVsc2Uge1xyXG4gIGFsZXJ0KFwi0JPQtdC90LXRgNCw0YLQvtGAINC00L7Qu9C20LXQvSDQsdGL0YLRjCDRg9GB0YLQsNC90L7QstC70LXQvSDQv9C+0LHQu9C40LbQtVwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkcmVuYWxpbmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciBhZHJlbmFsaW5lX3JhbmdlID0gMVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGFkcmVuYWxpbmVfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaW5kZXggPSB0YXJnZXRfbnVtYmVyXHJcbiAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IHJvbGxfeCg0KVxyXG4gICAgdmFyIG1pbnVzX2FjdGlvbnMgPSByb2xsX3goNClcclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgdG9TZW5kLm1pbnVzX2FjdGlvbnMgPSBtaW51c19hY3Rpb25zXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcG9pc29ub3VzX2FkcmVuYWxpbmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHBvaXNvbm91c19hZHJlbmFsaW5lX3JhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2luZGV4ID0gdGFyZ2V0X251bWJlclxyXG4gICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBbXVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbjsgaSsrKSB7XHJcbiAgICAgIGV4dHJhX2FjdGlvbnMucHVzaChyb2xsX3goNCkpXHJcbiAgICB9XHJcbiAgICB0b1NlbmQuZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnNcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCg0LDQtNC40YPRgSDQsNC00YDQtdC90LDQu9C40L3QsCAxINC60LvQtdGC0LrQsCFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBpY2hfcGljaF9nbyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfbnVtYmVyXVxyXG4gIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlID09IFwiZHJvbmVcIikge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2luZGV4ID0gdGFyZ2V0X251bWJlclxyXG4gICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBNYXRoLmNlaWwocGFyc2VGbG9hdCh1c2VyLmludGVsbGlnZW5jZSkvMilcclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQv9GL0Ykt0L/Ri9GJINC60L7Qs9C+INC/0L7Qv9Cw0LvQviFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGx1Y2t5X3Nob3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbF94KDEwKVxyXG4gICAgaWYgKHRvU2VuZC5yb2xsID09IDcpIHtcclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IHJvbGxfeCg3KVxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb3R0ZXJ5X3Nob3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbF94KDEwMClcclxuICAgIGlmICh0b1NlbmQucm9sbCA9PSA3KSB7XHJcbiAgICAgIHZhciBkYW1hZ2UgPSAwXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KDcpXHJcbiAgICAgIH1cclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZVxyXG4gICAgfSBlbHNlIGlmICh0b1NlbmQucm9sbCA9PSA3Nykge1xyXG4gICAgICB2YXIgZGFtYWdlID0gMFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE0OyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3goNylcclxuICAgICAgfVxyXG4gICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGN1cnZlZF9idWxsZXRzKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7XHJcbiAgICBib251c19hdHRhY2sgPSBib251c19hdHRhY2sgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSk7XHJcbiAgfVxyXG4gIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3ZlcihpbmRleCwgdXNlcl9wb3NpdGlvbik7XHJcbiAgYWNjdW11bGF0ZWRfY292ZXIgPSBNYXRoLm1heChwYXJzZUludChwYXJzZUZsb2F0KGFjY3VtdWxhdGVkX2NvdmVyKS8yKSAtIDIsIDApXHJcbiAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSkge1xyXG4gICAgICB0b1NlbmQuYWltX292ZXIgPSAxO1xyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBoZWxwZXIgZnVuY3Rpb24gcGF0dGVybnNcclxuZnVuY3Rpb24gY2hlY2tfY29vbGRvd24oY2hhcmFjdGVyX251bWJlciwgZWZmZWN0LCBtZXNzYWdlKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoZWZmZWN0KSkge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl1bZWZmZWN0XS5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdW2VmZmVjdF1cclxuICAgICAgaWYgKG1lc3NhZ2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXVtlZmZlY3RdLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXVtlZmZlY3RdLmNvb2xkb3duIC0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVzdG9yZV9ocChjaGFyYWN0ZXJfbnVtYmVyLCBhbW91bnQpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICBjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gPSBNYXRoLm1pbihjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gKyBhbW91bnQsIEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KHByb3BlcnR5LCBjaGFyYWN0ZXJfbnVtYmVyLCBhbW91bnQpIHtcclxuICBjaGFyYWN0ZXJfc3RhdGVbcHJvcGVydHldW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlW3Byb3BlcnR5XVtjaGFyYWN0ZXJfbnVtYmVyXSArIGFtb3VudFxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VfY2hhcmFjdGVyX2RldGFpbGVkX2F0dHJpYnV0ZShhdHRyaWJ1dGUsIGNoYXJhY3Rlcl9udW1iZXIsIGFtb3VudCkge1xyXG4gIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdW2F0dHJpYnV0ZV0gPSBwYXJzZUludChjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVthdHRyaWJ1dGVdKSArIGFtb3VudFxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseV9lZmZlY3QoY2hhcmFjdGVyX251bWJlciwgZWZmZWN0X251bWJlcikge1xyXG5cclxuICBlZmZlY3RfbnVtYmVyID0gcGFyc2VJbnQoZWZmZWN0X251bWJlcik7XHJcbiAgc3dpdGNoIChlZmZlY3RfbnVtYmVyKSB7XHJcbiAgICBjYXNlIDA6IC8vINGD0LLQtdC70LjRh9C40YLRjCDRgdC40LvRg1xyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX2RldGFpbGVkX2F0dHJpYnV0ZShcInN0cmVuZ3RoXCIsIGNoYXJhY3Rlcl9udW1iZXIsIDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTogLy8g0YPQstC10LvQuNGH0LjRgtGMINGC0LXQu9C+0YHQu9C+0LbQtdC90LjQtVxyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX2RldGFpbGVkX2F0dHJpYnV0ZShcInN0YW1pbmFcIiwgY2hhcmFjdGVyX251bWJlciwgMSk7XHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXTtcclxuICAgICAgdmFyIHN0YW1pbmEgPSBjaGFyYWN0ZXIuc3RhbWluYTtcclxuXHJcbiAgICAgIHZhciBocF91cGdyYWRlID0gSFBfdmFsdWVzW3N0YW1pbmFdIC0gSFBfdmFsdWVzW3N0YW1pbmEgLSAxXTtcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcIkhQXCIsIGNoYXJhY3Rlcl9udW1iZXIsIGhwX3VwZ3JhZGUpO1xyXG5cclxuICAgICAgdmFyIHN0YW1pbmFfdXBncmFkZSA9IHN0YW1pbmFfdmFsdWVzW3N0YW1pbmFdIC0gc3RhbWluYV92YWx1ZXNbc3RhbWluYSAtIDFdO1xyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwic3RhbWluYVwiLCBjaGFyYWN0ZXJfbnVtYmVyLCBzdGFtaW5hX3VwZ3JhZGUpO1xyXG5cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6IC8vINGD0LLQtdC70LjRh9C40YLRjCDQu9C+0LLQutC+0YHRgtGMXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfZGV0YWlsZWRfYXR0cmlidXRlKFwiYWdpbGl0eVwiLCBjaGFyYWN0ZXJfbnVtYmVyLCAxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM6IC8vINGD0LLQtdC70LjRh9C40YLRjCDQuNC90YLQtdC70LvQtdC60YJcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9kZXRhaWxlZF9hdHRyaWJ1dGUoXCJpbnRlbGxpZ2VuY2VcIiwgY2hhcmFjdGVyX251bWJlciwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA0OiAvLyDRg9Cy0LXQu9C40YfQuNGC0Ywg0JrQlFxyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwiYm9udXNfS0RcIiwgY2hhcmFjdGVyX251bWJlciwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNTogLy8g0YPQvNC10L3RjNGI0LjRgtGMINGB0LjQu9GDXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfZGV0YWlsZWRfYXR0cmlidXRlKFwic3RyZW5ndGhcIiwgY2hhcmFjdGVyX251bWJlciwgLTEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNjogLy8g0YPQvNC10L3RjNGI0LjRgtGMINGC0LXQu9C+0YHQu9C+0LbQtdC90LjQtVxyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX2RldGFpbGVkX2F0dHJpYnV0ZShcInN0YW1pbmFcIiwgY2hhcmFjdGVyX251bWJlciwgLTEpO1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl07XHJcbiAgICAgIHZhciBzdGFtaW5hID0gY2hhcmFjdGVyLnN0YW1pbmE7XHJcbiAgICAgIHZhciBocF91cGdyYWRlID0gTWF0aC5tYXgoSFBfdmFsdWVzW3N0YW1pbmFdIC0gSFBfdmFsdWVzW3N0YW1pbmEgKyAxXSwgLTEqY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdICsgMSk7XHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJIUFwiLCBjaGFyYWN0ZXJfbnVtYmVyLCBocF91cGdyYWRlKTtcclxuXHJcbiAgICAgIHZhciBzdGFtaW5hX3VwZ3JhZGUgPSBNYXRoLm1heChzdGFtaW5hX3ZhbHVlc1tzdGFtaW5hXSAtIHN0YW1pbmFfdmFsdWVzW3N0YW1pbmEgKyAxXSwgLTEqY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0gKyAxKTtcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcInN0YW1pbmFcIiwgY2hhcmFjdGVyX251bWJlciwgc3RhbWluYV91cGdyYWRlKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDc6IC8vINGD0LzQtdC90YzRiNC40YLRjCDQu9C+0LLQutC+0YHRgtGMXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfZGV0YWlsZWRfYXR0cmlidXRlKFwiYWdpbGl0eVwiLCBjaGFyYWN0ZXJfbnVtYmVyLCAtMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA4OiAvLyDRg9C80LXQvdGM0YjQuNGC0Ywg0LjQvdGC0LXQu9C70LXQutGCXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfZGV0YWlsZWRfYXR0cmlidXRlKFwiaW50ZWxsaWdlbmNlXCIsIGNoYXJhY3Rlcl9udW1iZXIsIC0xKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDk6IC8vINGD0LzQtdC90YzRiNC40YLRjCDQmtCUXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJib251c19LRFwiLCBjaGFyYWN0ZXJfbnVtYmVyLCAtMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgY29uc29sZS5sb2coXCJUcmllZCB0byBhcHBseSB1bmtub3duIGVmZmVjdFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9yY2VkX21vdmVtZW50KGZyb21faW5kZXgsIHRvX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVt0b19pbmRleF0gPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA9IHRvX2luZGV4O1xyXG4gIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG5cclxuICBpZiAoISgoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbdG9faW5kZXhdID09IDEpKSB8fCAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSAhPSBcImFsbFwiICYmIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gIT0gbXlfbmFtZSkpKSB7XHJcbiAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcbiAgICB0b19jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShjaGFyYWN0ZXJfbnVtYmVyKTtcclxuICB9XHJcblxyXG4gIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2Zyb21faW5kZXhdID09IDEpKSkge1xyXG4gICAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZnJvbV9pbmRleCk7XHJcbiAgICBvbGRfY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICB9XHJcbn1cclxuXHJcbi8vINC/0YDQvtC6INCz0LDQt9C+0LLQvtC5INCz0YDQsNC90LDRgtGLXHJcbmZ1bmN0aW9uIGFwcGx5X2JvbWIocG9zaXRpb24sIHJhZGl1cywgdGhyZXNob2xkKSB7XHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhwb3NpdGlvbiwgcmFkaXVzKVxyXG4gIC8vY29uc29sZS5sb2coY2FuZGlkYXRlX2NlbGxzKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NhbmRpZGF0ZV9jZWxsc1tpXV1cclxuICAgIGlmICh0YXJnZXRfY2hhcmFjdGVyX251bWJlciA+IDApIHsvLyDQv9C10YDRgdC+0L3QsNC2INCyINGA0LDQtNC40YPRgdC1INCx0L7QvNCx0YtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC/0LDQtNCw0LXRgiDQv9C+0LQg0LTQtdC50YHRgtCy0LjQtSDQs9Cw0LfQvtCy0L7QuSDQsdC+0LzQsdGLXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCArIDFcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uLnRocmVzaG9sZCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uLnRocmVzaG9sZCA9IHRocmVzaG9sZDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGdhc19ib21iX3BvaXNvbl9vYmplY3QgPSB7fVxyXG4gICAgICAgIGdhc19ib21iX3BvaXNvbl9vYmplY3QucG9pc29uX2xldmVsID0gMVxyXG4gICAgICAgIGdhc19ib21iX3BvaXNvbl9vYmplY3QudGhyZXNob2xkID0gdGhyZXNob2xkXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uID0gZ2FzX2JvbWJfcG9pc29uX29iamVjdFxyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdIC0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlfY2FsaW5nYWxhdG9yKHBvc2l0aW9uLCByYWRpdXMsIGZsYXRfaGVhbCwgcm9sbF9oZWFsLCBoZWFsX3JvbGxfbGlzdCwgY29pbl9mbGlwX2xpc3QpIHtcclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gaW5kZXhfaW5fcmFkaXVzKHBvc2l0aW9uLCByYWRpdXMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0LTQu9GPINC+0YLRhdC40LvQsFxyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIHZhciByb2xsZWRfaGVhbCA9IGZsYXRfaGVhbCArIGhlYWxfcm9sbF9saXN0W3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXTtcclxuICAgICAgcmVzdG9yZV9ocCh0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgcm9sbGVkX2hlYWwpO1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQtNGL0YXQsNC10YIg0YbQtdC70LXQsdC90YvQtSDQv9Cw0YDRiyDQuCDQstC+0YHRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIgXCIgKyByb2xsZWRfaGVhbCArIFwiINGF0L8uXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICB2YXIgY29pbiA9IGNvaW5fZmxpcF9saXN0W3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgICAgIHZhciBub3RlID0gXCJcIjtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiY2FsaW5nYWxhdG9yX3RhcmdldFwiKSkge1xyXG4gICAgICAgIHZhciBzdGFnZSA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQuc3RhZ2U7XHJcbiAgICAgICAgc3dpdGNoKHN0YWdlKSB7XHJcbiAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIGlmIChjb2luID4gNSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQuc3RhZ2UgPSAyO1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQuZHVyYXRpb24gPSBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMjtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5jYWxpbmdhbGF0b3JfdGFyZ2V0LnBlbmFsdHkgPSBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTI7XHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcImF0dGFja19ib251c1wiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgY2FsaW5nYWxhdG9yX3BlbmFsdHlfc3RhZ2UyIC0gY2FsaW5nYWxhdG9yX3BlbmFsdHlfc3RhZ2UxKVxyXG4gICAgICAgICAgICAgIG5vdGUgPSBcItCa0LDQu9C40L3Qs9Cw0LvRj9GC0L7RgCDQstC90L7QstGMINGD0LTQsNGA0LjQuyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LIg0LPQvtC70L7QstGDLiDQktGC0L7RgNCw0Y8g0YHRgtCw0LTQuNGPINC+0YLRgNCw0LLQu9C10L3QuNGPLiDQnNC+0LbQtdGCINC/0L7RgNCwINC+0YHRgtCw0L3QvtCy0LjRgtGB0Y8/Li5cIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG5vdGUgPSBcItCd0LAg0Y3RgtC+0YIg0YDQsNC3IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQuNC30LHQtdC20LDQuyDQvdC10LPQsNGC0LjQstC90YvRhSDRjdGE0YTQtdC60YLQvtCyINC60LDQu9C40L3Qs9Cw0LvRj9GC0L7RgNCwLiDQodGC0LDQtNC40Y8g0L7RgdGC0LDQtdGC0YHRjyDQv9C10YDQstC+0LkuXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgaWYgKGNvaW4gPCA1KSB7Ly8xLTQgPSBiYWQgcm9sbCwgcG9pc29uaW5nXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5zdGFnZSA9IDM7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5kdXJhdGlvbiA9IGNhbGluZ2FsYXRvcl9wb2lzb25pbmdfZHVyYXRpb25fc3RhZ2UzO1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQucGVuYWx0eSA9IGNhbGluZ2FsYXRvcl9wZW5hbHR5X3N0YWdlMztcclxuICAgICAgICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwiYXR0YWNrX2JvbnVzXCIsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyLCBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTMgLSBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTIpXHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcIm1lbGVlX2FkdmFudGFnZVwiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgLTEpXHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcInJhbmdlZF9hZHZhbnRhZ2VcIiwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIC0xKVxyXG4gICAgICAgICAgICAgIG5vdGUgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGB0YLQvtC40LvQviDQvtGB0YLQsNC90L7QstC40YLRjNGB0Y8g0YDQsNC90YzRiNC1LiDQotC10L/QtdGA0Ywg0LPQvtC70L7QstC+0LrRgNGD0LbQtdC90LjQtSDQvtGB0YLQsNC90LXRgtGB0Y8g0YEg0LLQsNC80Lgg0L3QsNC00L7Qu9Cz0L4uXCJcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb2luIDwgMTApIHsvLyA1LTkgbm8gZWZmZWN0LCBrZWVwIHJvbGxpbmdcclxuICAgICAgICAgICAgICBub3RlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRhdC+0LTQuNGCINC/0L4g0L7Rh9C10L3RjCDRgtC+0L3QutC+0LzRgyDQu9GM0LTRgy4g0KHRgtCw0LTQuNGPINC+0YHRgtCw0LXRgtGB0Y8g0LLRgtC+0YDQvtC5LiDQn9C+0LrQsCDRh9GC0L4uXCJcclxuICAgICAgICAgICAgfSBlbHNlIHsvLyBZb3UgYXJlIGVubGlnaHRlbmVkXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5zdGFnZSA9IDQ7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5kdXJhdGlvbiA9IGNhbGluZ2FsYXRvcl9wb2lzb25pbmdfZHVyYXRpb25fZW5saWdodGVuZWQ7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5wZW5hbHR5ID0gY2FsaW5nYWxhdG9yX3BlbmFsdHlfZW5saWdodGVuZWQ7XHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcImF0dGFja19ib251c1wiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgY2FsaW5nYWxhdG9yX3BlbmFsdHlfZW5saWdodGVuZWQgLSBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTIpXHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcIm1lbGVlX2FkdmFudGFnZVwiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgMSlcclxuICAgICAgICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwicmFuZ2VkX2FkdmFudGFnZVwiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgMSlcclxuICAgICAgICAgICAgICBub3RlID0gXCLQotC+0LvRjNC60L4g0YDQsNC3INGPINCy0LjQtNC10Lsg0YLQsNC60YPRjiDRgdC40LvRgy4uLiBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LTQvtGB0YLQuNCzINCf0YDQvtGB0LLRj9GJ0LXQvdC40Y8g0Lgg0LHRg9C00LXRgiDQvdC10YHRgtC4INC10LPQviDQsiDQvNC40YAuXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQuZHVyYXRpb24gPSBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMztcclxuICAgICAgICAgICAgbm90ZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LzQvtC20LXRgiDRhdCy0LDRgtC40YIg0YPQttC1P1wiXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgbm90ZSA9IFwi0J/RgNC+0YHQstGP0YnQtdC90L3Ri9C5IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GA0L7QtNC+0LvQttCw0LXRgiDQtNC10LvQuNGC0YzRgdGPINGB0LLQvtC40Lwg0LjRgdC60YPRgdGB0YLQstC+0LwuINCd0LXQstC10YDQvtGP0YLQvdC+0LUg0LfRgNC10LvQuNGJ0LUuXCJcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLQotCw0Log0L/RgNC10LjRgdC/0L7Qu9C90LjRgtGM0YHRjyDQvdC1INC00L7Qu9C20L3QviDQsdGL0YLRjCDQstC+0LfQvNC+0LbQvdC+XCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGNvaW4gPiA1KSB7XHJcbiAgICAgICAgICB2YXIgY2FsaW5nYWxhdG9yX3RhcmdldF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgY2FsaW5nYWxhdG9yX3RhcmdldF9vYmplY3QuZHVyYXRpb24gPSBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMTtcclxuICAgICAgICAgIGNhbGluZ2FsYXRvcl90YXJnZXRfb2JqZWN0LnBlbmFsdHkgPSBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTFcclxuICAgICAgICAgIGNhbGluZ2FsYXRvcl90YXJnZXRfb2JqZWN0LnN0YWdlID0gMTtcclxuICAgICAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJhdHRhY2tfYm9udXNcIiwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGNhbGluZ2FsYXRvcl90YXJnZXRfb2JqZWN0LnBlbmFsdHkpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5jYWxpbmdhbGF0b3JfdGFyZ2V0ID0gY2FsaW5nYWxhdG9yX3RhcmdldF9vYmplY3RcclxuICAgICAgICAgIG5vdGUgPSBcItCa0LDQu9C40L3Qs9Cw0LvRj9GC0L7RgCDRgdC70LXQs9C60LAg0YPQtNCw0YDQuNC7IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQsiDQs9C+0LvQvtCy0YMuINCf0LXRgNCy0LDRjyDRgdGC0LDQtNC40Y8g0L7RgtGA0LDQstC70LXQvdC40Y8uXCJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbm90ZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LjQt9Cx0LXQttCw0Lsg0L3QtdCz0LDRgtC40LLQvdGL0YUg0Y3RhNGE0LXQutGC0L7QsiDQutCw0LvQuNC90LPQsNC70Y/RgtC+0YDQsC4g0JLQuNGA0YLRg9C+0LchXCJcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcHVzaFRvTGlzdChub3RlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5X2FjaWRfYm9tYihwb3NpdGlvbiwgcmFkaXVzKSB7XHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhwb3NpdGlvbiwgcmFkaXVzKVxyXG4gIC8vY29uc29sZS5sb2coY2FuZGlkYXRlX2NlbGxzKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NhbmRpZGF0ZV9jZWxsc1tpXV1cclxuICAgIGlmICh0YXJnZXRfY2hhcmFjdGVyX251bWJlciA+IDApIHsvLyDQv9C10YDRgdC+0L3QsNC2INCyINGA0LDQtNC40YPRgdC1INCx0L7QvNCx0YtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC/0LDQtNCw0LXRgiDQv9C+0LQg0LTQtdC50YHRgtCy0LjQtSDQutC40YHQu9C+0YLQvdC+0Lkg0LPRgNCw0L3QsNGC0YtcIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFjaWRfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uID0gYWNpZF9ib21iX2R1cmF0aW9uXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGFjaWRfYm9tYl9wb2lzb25fb2JqZWN0ID0ge31cclxuICAgICAgICBhY2lkX2JvbWJfcG9pc29uX29iamVjdC5kdXJhdGlvbiA9IGFjaWRfYm9tYl9kdXJhdGlvblxyXG4gICAgICAgIHZhciBLRF9jaGFuZ2UgPSBwYXJzZUludChjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpLzIpXHJcbiAgICAgICAgYWNpZF9ib21iX3BvaXNvbl9vYmplY3QuYm9udXNfS0QgPSBLRF9jaGFuZ2VcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5hY2lkX2JvbWJfcG9pc29uID0gYWNpZF9ib21iX3BvaXNvbl9vYmplY3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSAtIEtEX2NoYW5nZVxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvY2tlZF9lZmZlY3QodGFyZ2V0KSB7XHJcbiAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uaGFzT3duUHJvcGVydHkoXCJzaG9ja2VkXCIpKSB7XHJcbiAgICB2YXIgc2hvY2tlZF9vYmplY3QgPSB7fVxyXG4gICAgc2hvY2tlZF9vYmplY3QuY29vbGRvd24gPSBzaG9ja2VkX2Nvb2xkb3duXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uc2hvY2tlZCA9IHNob2NrZWRfb2JqZWN0XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVt0YXJnZXRdID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbdGFyZ2V0XSAtIDFcclxuICB9IGVsc2Uge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRdLnNob2NrZWQuY29vbGRvd24gPSBzaG9ja2VkX2Nvb2xkb3duXHJcbiAgfVxyXG59XHJcblxyXG4vLyBjb21wdXRhdGlvbnMgcmVsYXRlZCB0byBza2lsbHNcclxuZnVuY3Rpb24gY29tcHV0ZV9nYXNfYm9tYl90aHJlc2hvbGQoY2hhcmFjdGVyKSB7XHJcbiAgbGV0IGJvbnVzID0gTWF0aC5mbG9vcihwYXJzZUludChjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKS8yKTtcclxuICByZXR1cm4gYm9udXMgKyBnYXNfYm9tYl9iYXNlX3RocmVzaG9sZDtcclxufVxyXG5cclxuLy8gbmV3IHJvdW5kIGFjdGlvbnNcclxuXHJcbmZ1bmN0aW9uIHN0YXJ0X25ld19yb3VuZCgpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnbmV3X3JvdW5kJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHZhciBzYXZlX3JvbGwgPSBbXVxyXG4gIHZhciBjYWxpbmdhbGF0b3JfaGVhbF9yb2xsX2xpc3QgPSBbXVxyXG4gIHZhciBjYWxpbmdhbGF0b3JfY29pbl9mbGlwID0gW11cclxuXHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baV1cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldICE9PSB1bmRlZmluZWQgJiYgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXSAhPT0gbnVsbCkge1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImdhc19ib21iX3BvaXNvblwiKSkge1xyXG4gICAgICAgIHNhdmVfcm9sbFtpXSA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChjaGFyYWN0ZXIuc3RhbWluYSlcclxuICAgICAgfVxyXG4gICAgICBjYWxpbmdhbGF0b3JfaGVhbF9yb2xsX2xpc3RbaV0gPSByb2xsX3goY2FsaW5nYWxhdG9yX3JvbGxfaGVhbCk7XHJcbiAgICAgIGNhbGluZ2FsYXRvcl9jb2luX2ZsaXBbaV0gPSByb2xsX3goMTApO1xyXG4gICAgfVxyXG4gIH1cclxuICB0b1NlbmQuc2F2ZV9yb2xsX2xpc3QgPSBzYXZlX3JvbGxcclxuICB0b1NlbmQuY2FsaW5nYWxhdG9yX2hlYWxfcm9sbF9saXN0ID0gY2FsaW5nYWxhdG9yX2hlYWxfcm9sbF9saXN0XHJcbiAgdG9TZW5kLmNhbGluZ2FsYXRvcl9jb2luX2ZsaXAgPSBjYWxpbmdhbGF0b3JfY29pbl9mbGlwXHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseV90ZXJyYWluX2VmZmVjdHMoZGF0YSkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXSAhPT0gbnVsbCAmJiBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHN3aXRjaCAoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0udHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJnYXNfYm9tYlwiOlxyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cztcclxuICAgICAgICAgICAgYXBwbHlfYm9tYihwb3NpdGlvbiwgcmFkaXVzLCBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS50aHJlc2hvbGQpO1xyXG4gICAgICAgICAgICBpZiAocmFkaXVzID49IDQpIHtcclxuICAgICAgICAgICAgICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3Bvc2l0aW9uXSA9PSBvYnN0YWNsZV9udW1iZXJfdG9fYm9hcmRfbnVtYmVyKGdhc19ib21iX29ic3RhY2xlKSkge1xyXG4gICAgICAgICAgICAgICAgICBkZWxldGVfb2JqZWN0X2NvbW1hbmQocG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldID0gbnVsbFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cyArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJjYWxpbmdhbGF0b3JcIjpcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5yYWRpdXM7XHJcbiAgICAgICAgICAgIGFwcGx5X2NhbGluZ2FsYXRvcihwb3NpdGlvbiwgcmFkaXVzLCBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5mbGF0X2hlYWwsIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJvbGxfaGVhbCwgZGF0YS5jYWxpbmdhbGF0b3JfaGVhbF9yb2xsX2xpc3QsIGRhdGEuY2FsaW5nYWxhdG9yX2NvaW5fZmxpcCk7XHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLmR1cmF0aW9uID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0uZHVyYXRpb24gLSAxXHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5kdXJhdGlvbiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtwb3NpdGlvbl0gPT0gb2JzdGFjbGVfbnVtYmVyX3RvX2JvYXJkX251bWJlcihjYWxpbmdhbGF0b3Jfb2JzdGFjbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZV9vYmplY3RfY29tbWFuZChwb3NpdGlvbilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0gPSBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNZXNzZWQgdXAgcmVzb2x2aW5nIHRlcnJhaW4gZWZmZWN0c1wiKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS50eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZlX2FuZF9hY3Rpb25zX3JlcGxlbmlzaChjaGFyYWN0ZXIsIGluZGV4KSB7XHJcbiAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtpbmRleF0gPSAxXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtpbmRleF0gPSAwXHJcbiAgYXNzaWduX21vdmVzKGluZGV4KVxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baW5kZXhdID0gYm9udXNfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcbiAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2luZGV4XSA9IG1haW5fYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5X3RpcmVkbmVzcyhjaGFyYWN0ZXIsIGkpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInRpcmVkXCIpKSB7IC8vINCj0LHRgNCw0YLRjCDQsdC+0L3Rg9GB0Ysg0L7RgiDRg9GB0YLQsNC70L7RgdGC0Lgg0L/RgNC+0YjQu9C+0LPQviDRhdC+0LTQsCAo0YfRgtC+0LHRiyDQutC+0LPQtNCwINCx0YPQtNGD0YIg0L3QsNC60LDQu9Cw0LTRi9Cy0LDRgtGM0YHRjyDQvdC+0LLRi9C1INC90LUg0YjRgtGA0LDRhNC+0LLQsNGC0Ywg0LTQstCw0LbQtNGLKVxyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkLmJvbnVzXHJcbiAgfVxyXG5cclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPCBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0gKiAwLjY3KSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPCBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0gKiAwLjM0KSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA8PSAwKSB7IC8vIDPRjyDRgdGC0LDQtNC40Y9cclxuICAgICAgICB2YXIgdGlyZWRfb2JqZWN0ID0ge31cclxuICAgICAgICB0aXJlZF9vYmplY3QuYm9udXMgPSAtM1xyXG4gICAgICAgIHRpcmVkX29iamVjdC5zdGFnZSA9IDNcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkID0gdGlyZWRfb2JqZWN0XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSAzXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0qMC4yNSlcclxuICAgICAgICBpZiAoKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9PSAxKSYmKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPT0gMSkpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSAwXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgeyAvLyAy0Y8g0YHRgtCw0LTQuNGPXHJcbiAgICAgICAgdmFyIHRpcmVkX29iamVjdCA9IHt9XHJcbiAgICAgICAgdGlyZWRfb2JqZWN0LmJvbnVzID0gLTJcclxuICAgICAgICB0aXJlZF9vYmplY3Quc3RhZ2UgPSAyXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50aXJlZCA9IHRpcmVkX29iamVjdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldIC0gMlxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldKjAuNSlcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHsgLy8gMdGPINGB0YLQsNC00LjRj1xyXG4gICAgICB2YXIgdGlyZWRfb2JqZWN0ID0ge31cclxuICAgICAgdGlyZWRfb2JqZWN0LmJvbnVzID0gLTFcclxuICAgICAgdGlyZWRfb2JqZWN0LnN0YWdlID0gMVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkID0gdGlyZWRfb2JqZWN0XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldIC0gMVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSowLjc1KVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInRpcmVkXCIpKSB7IC8vINC90LUg0YPRgdGC0LDQuyAtPiDRg9Cx0YDQsNGC0Ywg0YPRgdGC0LvQsNC70L7RgdGC0Ywg0LXRgdC70Lgg0LHRi9C70LBcclxuICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja19kZWZhdWx0X2Nvb2xkb3ducyhpKSB7XHJcbiAgY2hlY2tfY29vbGRvd24oaSwgXCJsaWdodF9zb3VuZF9ib21iX3VzZXJcIiwgXCJcIik7XHJcbiAgY2hlY2tfY29vbGRvd24oaSwgXCJhY3Rpb25fc3BsYXNoXCIsIFwiXCIpO1xyXG4gIGNoZWNrX2Nvb2xkb3duKGksIFwic2FmZXR5X3NlcnZpY2VfdXNlclwiLCBcIlwiKTtcclxuICBjaGVja19jb29sZG93bihpLCBcImNhbGluZ2FsYXRvcl91c2VyXCIsIFwiXCIpO1xyXG4gIGNoZWNrX2Nvb2xkb3duKGksIFwiZ2FzX2JvbWJfdXNlclwiLCBcIlwiKTtcclxuICBjaGVja19jb29sZG93bihpLCBcImFjaWRfYm9tYl91c2VyXCIsIFwiXCIpO1xyXG4gIGNoZWNrX2Nvb2xkb3duKGksIFwiZm9yY2VfZmllbGRfdXNlclwiLCBcIlwiKTtcclxuICBjaGVja19jb29sZG93bihpLCBcImNoYXJnZV91c2VyXCIsIFwiXCIpO1xyXG4gIGNoZWNrX2Nvb2xkb3duKGksIFwicHJlX2NoYXJnZVwiLCBcIlwiKTtcclxuICBjaGVja19jb29sZG93bihpLCBcImN1dF9saW1iX3VzZXJcIiwgXCJcIik7XHJcbiAgY2hlY2tfY29vbGRvd24oaSwgXCJhZHJlbmFsaW5lX3VzZXJcIiwgXCJcIik7XHJcbiAgY2hlY2tfY29vbGRvd24oaSwgXCJwb2lzb25vdXNfYWRyZW5hbGluZV91c2VyXCIsIFwiXCIpO1xyXG4gIGNoZWNrX2Nvb2xkb3duKGksIFwiaG9va191c2VyXCIsIFwiXCIpO1xyXG4gIGNoZWNrX2Nvb2xkb3duKGksIFwicHVuaXNoaW5nX3N0cmlrZV91c2VyXCIsIFwiXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja19hbGxfcm91bmRfZWZmZWN0cyhpLCBjaGFyYWN0ZXIsIGRhdGEpIHtcclxuICBzYWZldHlfc2VydmljZV90YXJnZXRfcm91bmRfZWZmZWN0KGkpO1xyXG4gIGJlbHZldF9idWZmX3RhcmdldF9yb3VuZF9lZmZlY3QoaSk7XHJcbiAgaG9va190YXJnZXRfcm91bmRfZWZmZWN0KGkpO1xyXG4gIGNhbGluZ2FsYXRvcl90YXJnZXRfcm91bmRfZWZmZWN0KGkpO1xyXG4gIHBpY2hfcGljaF91c2VyX3JvdW5kX2VmZmVjdChpKTtcclxuICBwaWNoX3BpY2hfdGFyZ2V0X3JvdW5kX2VmZmVjdChpKTtcclxuICBhaW1fcm91bmRfZWZmZWN0KGkpO1xyXG4gIGFkcmVuYWxpbmVfdGFyZ2V0X3JvdW5kX2VmZmVjdChpKTtcclxuICBwb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXRfcm91bmRfZWZmZWN0KGkpO1xyXG4gIHNob2NrZWRfcm91bmRfZWZmZWN0KGkpO1xyXG4gIGN1dF9saW1iX3JvdW5kX2VmZmVjdChpLCBjaGFyYWN0ZXIpO1xyXG4gIGhlYWxlZF9yb3VuZF9lZmZlY3QoaSk7XHJcbiAgYmxpbmRfcm91bmRfZWZmZWN0KGksIGNoYXJhY3Rlcik7XHJcbiAgTWFyY3VzX3N0YWNrc19yb3VuZF9lZmZlY3QoaSk7XHJcbiAgc2hpZWxkX3VwX3JvdW5kX2VmZmVjdChpLCBjaGFyYWN0ZXIpO1xyXG4gIGJpZ19icm9fcm91bmRfZWZmZWN0KGksIGNoYXJhY3Rlcik7XHJcbiAgdG9iYWNjb19zdHJpa2Vfcm91bmRfZWZmZWN0KGkpO1xyXG4gIGFjaWRfYm9tYl9wb2lzb25fcm91bmRfZWZmZWN0KGksIGNoYXJhY3Rlcik7XHJcbiAgZ2FzX2JvbWJfcG9pc29uX3JvdW5kX2VmZmVjdChpLCBjaGFyYWN0ZXIsIGRhdGEpO1xyXG4gIG1lbGVlZF9yb3VuZF9lZmZlY3QoaSk7XHJcbiAgc25pcGVyX3Bhc3NpdmVfcm91bmRfZWZmZWN0KGksIGNoYXJhY3Rlcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhZmV0eV9zZXJ2aWNlX3RhcmdldF9yb3VuZF9lZmZlY3QoaSkge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwic2FmZXR5X3NlcnZpY2VfdGFyZ2V0XCIpKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zYWZldHlfc2VydmljZV90YXJnZXQuZHVyYXRpb24gPT0gMCkge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2ldIC0gc2FmZXR5X3NlcnZpY2VfZGVmZW5zaXZlX2FkdmFudGFnZVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbaV0gLSBzYWZldHlfc2VydmljZV9ldmFkZV9ib251c1xyXG4gICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zYWZldHlfc2VydmljZV90YXJnZXRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2FmZXR5X3NlcnZpY2VfdGFyZ2V0LmR1cmF0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zYWZldHlfc2VydmljZV90YXJnZXQuZHVyYXRpb24gLSAxXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBiZWx2ZXRfYnVmZl90YXJnZXRfcm91bmRfZWZmZWN0KGkpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImJlbHZldF9idWZmX3RhcmdldFwiKSkge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmVsdmV0X2J1ZmZfdGFyZ2V0LmR1cmF0aW9uID09IDApIHtcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcImF0dGFja19ib251c1wiLCBpLCAtMSpjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJlbHZldF9idWZmX3RhcmdldC5hdHRhY2tfYm9udXMpO1xyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwibWVsZWVfYWR2YW50YWdlXCIsIGksIC0xKmNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmVsdmV0X2J1ZmZfdGFyZ2V0Lm1lbGVlX2FkdmFudGFnZSk7XHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJyYW5nZWRfYWR2YW50YWdlXCIsIGksIC0xKmNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmVsdmV0X2J1ZmZfdGFyZ2V0LnJhbmdlZF9hZHZhbnRhZ2UpO1xyXG4gICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iZWx2ZXRfYnVmZl90YXJnZXRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmVsdmV0X2J1ZmZfdGFyZ2V0LmR1cmF0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iZWx2ZXRfYnVmZl90YXJnZXQuZHVyYXRpb24gLSAxXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBob29rX3RhcmdldF9yb3VuZF9lZmZlY3QoaSkge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiaG9va190YXJnZXRcIikpIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhvb2tfdGFyZ2V0LmR1cmF0aW9uID09IDApIHtcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcImRlZmVuc2l2ZV9hZHZhbnRhZ2VcIiwgaSwgLTEqY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ob29rX3RhcmdldC5kZWZlbnNpdmVfYWR2YW50YWdlKTtcclxuICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaG9va190YXJnZXRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaG9va190YXJnZXQuZHVyYXRpb24gLT0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FsaW5nYWxhdG9yX3RhcmdldF9yb3VuZF9lZmZlY3QoaSkge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiY2FsaW5nYWxhdG9yX3RhcmdldFwiKSkge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY2FsaW5nYWxhdG9yX3RhcmdldC5kdXJhdGlvbiA9PSAwKSB7XHJcbiAgICAgIHZhciByZXZlcnNlX3BlbmFsdHkgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmNhbGluZ2FsYXRvcl90YXJnZXQucGVuYWx0eSAqICgtMSlcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcImF0dGFja19ib251c1wiLCBpLCByZXZlcnNlX3BlbmFsdHkpO1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jYWxpbmdhbGF0b3JfdGFyZ2V0LnN0YWdlID09IDMpIHtcclxuICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwibWVsZWVfYWR2YW50YWdlXCIsIGksIDEpO1xyXG4gICAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJyYW5nZWRfYWR2YW50YWdlXCIsIGksIDEpO1xyXG4gICAgICB9IGVsc2UgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY2FsaW5nYWxhdG9yX3RhcmdldC5zdGFnZSA9PSA0KSB7XHJcbiAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcIm1lbGVlX2FkdmFudGFnZVwiLCBpLCAtMSk7XHJcbiAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcInJhbmdlZF9hZHZhbnRhZ2VcIiwgaSwgLTEpO1xyXG4gICAgICB9XHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmNhbGluZ2FsYXRvcl90YXJnZXRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY2FsaW5nYWxhdG9yX3RhcmdldC5kdXJhdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY2FsaW5nYWxhdG9yX3RhcmdldC5kdXJhdGlvbiAtIDFcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBpY2hfcGljaF91c2VyX3JvdW5kX2VmZmVjdChpKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJwaWNoX3BpY2hfdXNlclwiKSkge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlclxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gPT0gcGljaF9waWNoX2Nvb2xkb3duKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDBcclxuICAgICAgfVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biAtIDFcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBpY2hfcGljaF90YXJnZXRfcm91bmRfZWZmZWN0KGkpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInBpY2hfcGljaF90YXJnZXRcIikpIHtcclxuICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF90YXJnZXQuZXh0cmFfYWN0aW9uc1xyXG4gICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSArIDFcclxuICAgICAgICB9XHJcbiAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgIH1cclxuICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3RhcmdldFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWltX3JvdW5kX2VmZmVjdChpKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJhaW1cIikpIHtcclxuICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFpbVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRyZW5hbGluZV90YXJnZXRfcm91bmRfZWZmZWN0KGkpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFkcmVuYWxpbmVfdGFyZ2V0XCIpKSB7XHJcbiAgICAgIHZhciBtaW51c19hY3Rpb25zID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hZHJlbmFsaW5lX3RhcmdldC5taW51c19hY3Rpb25zXHJcbiAgICAgIHdoaWxlIChtaW51c19hY3Rpb25zID4gMCkge1xyXG4gICAgICAgIGlmIChtaW51c19hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gLSBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldIC0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICBtaW51c19hY3Rpb25zID0gbWludXNfYWN0aW9ucyAtIDFcclxuICAgICAgfVxyXG4gICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hZHJlbmFsaW5lX3RhcmdldFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0X3JvdW5kX2VmZmVjdChpKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJwb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXRcIikpIHtcclxuICAgICAgdmFyIHR1cm4gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldC50dXJuXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0LnR1cm4gPSB0dXJuICsgMVxyXG4gICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0LmV4dHJhX2FjdGlvbnNbdHVybl1cclxuICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gKyAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zIC0gMVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0dXJuICsgMSA9PSBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbikge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXVxyXG4gICAgICAgIHZhciBtYXhfSFAgPSBIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgICAgICAgdmFyIG1heF9zdGFtaW5hID0gc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgICAgICAgdmFyIEhQX2Nvc3QgPSBwb2lzb25vdXNfYWRyZW5hbGluZV9mbGF0X0hQICsgcGFyc2VJbnQocGFyc2VGbG9hdChtYXhfSFApICogcG9pc29ub3VzX2FkcmVuYWxpbmVfcGVyY2VudF9IUClcclxuICAgICAgICB2YXIgc3RhbWluYV9jb3N0ID0gcG9pc29ub3VzX2FkcmVuYWxpbmVfZmxhdF9zdGFtaW5hICsgcGFyc2VJbnQocGFyc2VGbG9hdChtYXhfc3RhbWluYSkgKiBwb2lzb25vdXNfYWRyZW5hbGluZV9wZXJjZW50X3N0YW1pbmEpXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2ldID0gY2hhcmFjdGVyX3N0YXRlLkhQW2ldIC0gSFBfY29zdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gLSBzdGFtaW5hX2Nvc3RcclxuICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXRcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JDQtNGA0LXQvdCw0LvQuNC9INCyINC60YDQvtCy0LggXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINC30LDQutCw0L3Rh9C40LLQsNC10YLRgdGPLCDQvdCw0YHRgtGD0L/QsNC10YIg0L/QvtGF0LzQtdC70YzQtSAoXCIgKyBIUF9jb3N0ICsgXCIg0YXQvyDQuCBcIiArIHN0YW1pbmFfY29zdCArIFwiINCy0YvQvdC+0YHQu9C40LLQvtGB0YLQuClcIlxyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvY2tlZF9yb3VuZF9lZmZlY3QoaSkge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwic2hvY2tlZFwiKSkge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZC5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNob2NrZWRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZC5jb29sZG93biAtIDFcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGN1dF9saW1iX3JvdW5kX2VmZmVjdChpLCBjaGFyYWN0ZXIpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImN1dF9saW1iXCIpKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYi5kdXJhdGlvbiA9PSAwKSB7XHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iXHJcbiAgICAgIHZhciBtZXNzYWdlID0gXCLQodGD0YXQvtC20LjQu9C40Y8gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINCy0L7RgdGB0YLQsNC90L7QstC40LvQuNGB0YwuXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gLTEwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY3V0X2xpbWIuZHVyYXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iLmR1cmF0aW9uIC0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGVhbGVkX3JvdW5kX2VmZmVjdChpKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJoZWFsZWRcIikpIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZC5jb29sZG93biA+IDApIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldLzJcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldIC0gMVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSAtIDFcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oZWFsZWQuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZC5jb29sZG93biAtIDFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYmxpbmRfcm91bmRfZWZmZWN0KGksIGNoYXJhY3Rlcikge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYmxpbmRcIikpIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJsaW5kLmNvb2xkb3duID4gMCkge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJsaW5kLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biAtIDFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJsaW5kXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gKyAyXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbaV0gPSBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2ldICsgMVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IFwi0JfRgNC10L3QuNC1IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQstC+0YHRgdGC0LDQvdC+0LLQuNC70L7RgdGMXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gTWFyY3VzX3N0YWNrc19yb3VuZF9lZmZlY3QoaSkge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiTWFya3VzX3N0YWNrc1wiKSkge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5NYXJrdXNfc3RhY2tzID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5NYXJrdXNfc3RhY2tzIC0gMVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9PSAwKSB7XHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLk1hcmt1c19zdGFja3NcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNoaWVsZF91cF9yb3VuZF9lZmZlY3QoaSwgY2hhcmFjdGVyKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJzaGllbGRfdXBcIikpIHtcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IE1hdGguY2VpbChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0vMilcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNoaWVsZF91cC5zdGFtaW5hX2Nvc3RcclxuICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GA0L7QtNC+0LvQttCw0LXRgiDQtNC10YDQttCw0YLRjCDRidC40YIgKNGB0L/QsNGB0LjQsdC+KVwiXHJcbiAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBiaWdfYnJvX3JvdW5kX2VmZmVjdChpLCBjaGFyYWN0ZXIpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImJpZ19icm9cIikpIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm8uY29vbGRvd24gPT0gMCkge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm8uYm9udXNfS0RcclxuICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyb1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YLQtdGA0Y/QtdGCINC30LDRidC40YLRgyDQkdC+0LvRjNGI0L7Qs9C+INCR0YDQsNGC0LBcIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm8uY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm8uY29vbGRvd24gLSAxXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0b2JhY2NvX3N0cmlrZV9yb3VuZF9lZmZlY3QoaSkge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwidG9iYWNjb19zdHJpa2VcIikpIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRvYmFjY29fc3RyaWtlLmNvb2xkb3duID09IDApIHtcclxuICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udG9iYWNjb19zdHJpa2VcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRvYmFjY29fc3RyaWtlLmNvb2xkb3duID09IHRvYmFjY29fc3RyaWtlX2Nvb2xkb3duKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gLSB0b2JhY2NvX3N0cmlrZV9ib251c1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udG9iYWNjb19zdHJpa2UuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRvYmFjY29fc3RyaWtlLmNvb2xkb3duIC0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWNpZF9ib21iX3BvaXNvbl9yb3VuZF9lZmZlY3QoaSwgY2hhcmFjdGVyKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJhY2lkX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uID09IDApIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2ldID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2ldICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uLmJvbnVzX0tEXHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb25cclxuICAgICAgdmFyIG1lc3NhZ2UgPSBcItCR0YDQvtC90Y8gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINC90LDQutC+0L3QtdGGINCy0L7RgdGB0YLQsNC90L7QstC40LvQsNGB0YxcIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uZHVyYXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uZHVyYXRpb24gLSAxXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnYXNfYm9tYl9wb2lzb25fcm91bmRfZWZmZWN0KGksIGNoYXJhY3RlciwgZGF0YSkge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICB2YXIgc2F2ZV9yb2xsID0gZGF0YS5zYXZlX3JvbGxfbGlzdFtpXVxyXG4gICAgaWYgKHNhdmVfcm9sbCA+PSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi50aHJlc2hvbGQpIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsIC0gMVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LrQuNC00LDQtdGCINGB0L/QsNGB0LHRgNC+0YHQvtC6INC4INGD0LzQtdC90YzRiNCw0LXRgiDRgdGC0LDQtNC40Y4g0L7RgtGA0LDQstC70LXQvdC40Y8gKNGC0LXQv9C10YDRjCBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCArIFwiKVwiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GA0L7QstCw0LvQuNCy0LDQtdGCINGB0L/QsNGB0LHRgNC+0YHQvtC6LiDQodGC0LDQtNC40Y8g0L7RgtGA0LDQstC70LXQvdC40Y8g0L7RgdGC0LDQtdGC0YHRjyDQv9GA0LXQttC90LXQuSAoXCIgKyBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgKyBcIilcIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNvdW50ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsXHJcbiAgICB3aGlsZSAoY291bnQgPiAwKSB7XHJcbiAgICAgIC8vY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldIC0gZ2FzX2JvbWJfbW92ZV9yZWR1Y3Rpb25cclxuICAgICAgaWYgKGNvdW50ICUgMiA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldIC0gMVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldIC0gMVxyXG4gICAgICB9XHJcbiAgICAgIGNvdW50ID0gY291bnQgLSAxXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCA8PSAwKSB7XHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvblxyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LHQvtC70YzRiNC1INC90LUg0L7RgtGA0LDQstC70LXQvSFcIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtZWxlZWRfcm91bmRfZWZmZWN0KGkpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcIm1lbGVlZFwiKSkge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubWVsZWVkLmNvb2xkb3duIDw9IDApIHtcclxuICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubWVsZWVkXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLm1lbGVlZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubWVsZWVkLmNvb2xkb3duIC0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc25pcGVyX3Bhc3NpdmVfcm91bmRfZWZmZWN0KGksIGNoYXJhY3Rlcikge1xyXG4gIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09ICdzbmlwZXInKSB7XHJcbiAgICB2YXIgZWZmZWN0c19vYmplY3QgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldXHJcbiAgICBpZiAoZWZmZWN0c19vYmplY3QuaGFzT3duUHJvcGVydHkoXCJzbmlwZXJfcGFzc2l2ZVwiKSkge1xyXG4gICAgICB2YXIgY3VycmVudF9hdHRhY2tfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXNcclxuICAgICAgdmFyIGN1cnJlbnRfZGFtYWdlX2JvbnVzID0gZWZmZWN0c19vYmplY3Quc25pcGVyX3Bhc3NpdmUuZGFtYWdlX2JvbnVzXHJcbiAgICAgIGlmIChjdXJyZW50X2F0dGFja19ib251cyA9PSAtNSkge1xyXG4gICAgICAgIHZhciBuZXdfYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICAgIHZhciBuZXdfZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBuZXdfYXR0YWNrX2JvbnVzID0gTWF0aC5taW4oY3VycmVudF9hdHRhY2tfYm9udXMgKyAxLCA0KVxyXG4gICAgICAgIHZhciBuZXdfZGFtYWdlX2JvbnVzID0gTWF0aC5taW4oY3VycmVudF9kYW1hZ2VfYm9udXMgKyAyLCA4KVxyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2ldIC0gY3VycmVudF9hdHRhY2tfYm9udXMgKyBuZXdfYXR0YWNrX2JvbnVzXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2ldIC0gY3VycmVudF9kYW1hZ2VfYm9udXMgKyBuZXdfZGFtYWdlX2JvbnVzXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc25pcGVyX3Bhc3NpdmUuYXR0YWNrX2JvbnVzID0gbmV3X2F0dGFja19ib251c1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNuaXBlcl9wYXNzaXZlLmRhbWFnZV9ib251cyA9IG5ld19kYW1hZ2VfYm9udXNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBzbmlwZXJfcGFzc2l2ZV9vYmplY3QgPSB7fVxyXG4gICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNuaXBlcl9wYXNzaXZlID0gc25pcGVyX3Bhc3NpdmVfb2JqZWN0XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBNb3JlIGdtIGNvbnRyb2wgYWN0aW9uc1xyXG5cclxuZnVuY3Rpb24gbWlycm9yX2JvYXJkKCkge1xyXG4gIHZhciBsZWZ0X2luZGV4O1xyXG4gIHZhciByaWdodF9pbmRleDtcclxuICB2YXIgdGVtcDtcclxuICB2YXIgbGVmdF9jZWxsO1xyXG4gIHZhciByaWdodF9jZWxsO1xyXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgZ2FtZV9zdGF0ZS5zaXplOyB5KyspIHtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgZ2FtZV9zdGF0ZS5zaXplLzI7IHgrKykge1xyXG5cclxuICAgICAgbGVmdF9pbmRleCA9IHkqZ2FtZV9zdGF0ZS5zaXplICsgeDtcclxuICAgICAgcmlnaHRfaW5kZXggPSB5KmdhbWVfc3RhdGUuc2l6ZSArIHBhcnNlSW50KGdhbWVfc3RhdGUuc2l6ZSkgLSB4IC0gMTtcclxuICAgICAgLy9jb25zb2xlLmxvZygneTogJyArIHkgKyAnIHg6ICcgKyB4ICsgJyBsZWZ0IGluZGV4OiAnICsgbGVmdF9pbmRleCArICcgcmlnaHQgaW5kZXg6ICcgKyByaWdodF9pbmRleCk7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgbGVmdF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGxlZnRfaW5kZXgpO1xyXG4gICAgICByaWdodF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHJpZ2h0X2luZGV4KTtcclxuXHJcbiAgICAgIHRlbXAgPSBsZWZ0X2NlbGwuc3JjO1xyXG4gICAgICBsZWZ0X2NlbGwuc3JjID0gcmlnaHRfY2VsbC5zcmM7XHJcbiAgICAgIHJpZ2h0X2NlbGwuc3JjID0gdGVtcDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN5bmNfYm9hcmQoKSB7XHJcbiAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IHtcclxuICAgIGdhbWVfc3RhdGU6IGdhbWVfc3RhdGUsXHJcbiAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbzogY2hhcmFjdGVyX2RldGFpbGVkX2luZm8sXHJcbiAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvOiBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvLFxyXG4gICAgY2hhcmFjdGVyX3N0YXRlOiBjaGFyYWN0ZXJfc3RhdGUsXHJcbiAgICBpbml0aWF0aXZlX29yZGVyX2FycmF5OiBpbml0aWF0aXZlX29yZGVyX2FycmF5XHJcbiAgfTtcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3N5bmNfYm9hcmQnO1xyXG4gIHRvU2VuZC5mdWxsX2dhbWVfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGU7XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd19sYW5kbWluZXMoKSB7XHJcbiAgdmFyIGxhbmRtaW5lc19hcnJheSA9IGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9uc1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGFuZG1pbmVzX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9taW5lID0gbGFuZG1pbmVzX2FycmF5W2ldXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1tjdXJyZW50X21pbmVdLmluY2x1ZGVzKG15X25hbWUpKSB7XHJcbiAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGN1cnJlbnRfbWluZSk7XHJcbiAgICAgIGNlbGwuc3JjID0gXCIvaW1hZ2VzL2xhbmRtaW5lLmpmaWZcIlxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJfY2hhcmFjdGVyX3N0YXRlKCkge1xyXG4gIGNoYXJhY3Rlcl9zdGF0ZSA9IENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVFxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhcl9jaGFyYWN0ZXIobnVtYmVyKSB7XHJcbiAgLy9jaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5IUFtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW251bWJlcl0gPSB7fVxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW251bWJlcl0gPSBudWxsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdfb25jbGljaygpIHtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIgfHwgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXSA9PSAxKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID09IDEpIHtcclxuICAgICAgdW5kb19zZWxlY3Rpb24oKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGluZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgICAgIHZhciBjZWxsID0gY2hhcmFjdGVyX2Nob3Nlbi5jZWxsXHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShpbmRleCwgY2VsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhX29uY2xpY2soKSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiIHx8IGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2NoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZF0gPT0gMSkge1xyXG5cclxuICAgIGlmIChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPT0gMikge1xyXG4gICAgICBzdG9wX2F0dGFjaygpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gICAgICB2YXIgY2VsbCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2VsbFxyXG4gICAgICB2YXIgbWFpbl9hY3Rpb25zX2xlZnQgPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgaWYgKG1haW5fYWN0aW9uc19sZWZ0ID4gMCkge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fYXR0YWNrKGNlbGwpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQoyDQstCw0YEg0L3QtSDQvtGB0YLQsNC70L7RgdGMINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXBhcmVfaW5pdGlhdGl2ZShhLGIpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbYV0gPCBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtiXSkge1xyXG4gICAgcmV0dXJuIDE7XHJcbiAgfSBlbHNlIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVthXSA9PSBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtiXSkge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAtMTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dCb2FyZENyZWF0aW9uR3JvdXAoKSB7XHJcbiAgdmFyIGJvYXJkX2NyZWF0aW9uX2dyb3VwID0gJChCT0FSRF9DUkVBVElPTl9HUk9VUF9TRUxFQ1RPUik7XHJcbiAgaWYgKHNob3dfYm9hcmRfY3JlYXRpb25fZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIikgPT0gXCJzaG93XCIpIHtcclxuICAgIHNob3dfYm9hcmRfY3JlYXRpb25fZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIiwgXCJoaWRlXCIpO1xyXG4gICAgc2hvd19ib2FyZF9jcmVhdGlvbl9ncm91cF9idXR0b24uaHRtbChcItCh0L/RgNGP0YLQsNGC0Ywg0YHQvtC30LTQsNC90LjQtSDQutCw0YDRgtGLXCIpO1xyXG4gICAgYm9hcmRfY3JlYXRpb25fZ3JvdXAuc2hvdygpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgc2hvd19ib2FyZF9jcmVhdGlvbl9ncm91cF9idXR0b24uYXR0cihcIm1vZFwiLCBcInNob3dcIik7XHJcbiAgICBzaG93X2JvYXJkX2NyZWF0aW9uX2dyb3VwX2J1dHRvbi5odG1sKFwi0J/QvtC60LDQt9Cw0YLRjCDRgdC+0LfQtNCw0L3QuNC1INC60LDRgNGC0YtcIik7XHJcbiAgICBib2FyZF9jcmVhdGlvbl9ncm91cC5oaWRlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93Qm9hcmRFZGl0R3JvdXAoKSB7XHJcbiAgdmFyIGJvYXJkX2VkaXRfZ3JvdXAgPSAkKEJPQVJEX0VESVRfR1JPVVBfU0VMRUNUT1IpO1xyXG4gIGlmIChzaG93X2JvYXJkX2VkaXRfZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIikgPT0gXCJzaG93XCIpIHtcclxuICAgIHNob3dfYm9hcmRfZWRpdF9ncm91cF9idXR0b24uYXR0cihcIm1vZFwiLCBcImhpZGVcIik7XHJcbiAgICBzaG93X2JvYXJkX2VkaXRfZ3JvdXBfYnV0dG9uLmh0bWwoXCLQodC/0YDRj9GC0LDRgtGMINC60L7QvdGC0YDQvtC70Ywg0LrQsNGA0YLRi1wiKTtcclxuICAgIGJvYXJkX2VkaXRfZ3JvdXAuc2hvdygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzaG93X2JvYXJkX2VkaXRfZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIiwgXCJzaG93XCIpO1xyXG4gICAgc2hvd19ib2FyZF9lZGl0X2dyb3VwX2J1dHRvbi5odG1sKFwi0J/QvtC60LDQt9Cw0YLRjCDQutC+0L3RgtGA0L7Qu9GMINC60LDRgNGC0YtcIik7XHJcbiAgICBib2FyZF9lZGl0X2dyb3VwLmhpZGUoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dCYXR0bGVDb250cm9sR3JvdXAoKSB7XHJcbiAgdmFyIGJhdHRsZV9jb250cm9sX2dyb3VwID0gJChCQVRUTEVfQ09OVFJPTF9HUk9VUF9TRUxFQ1RPUik7XHJcbiAgaWYgKHNob3dfYmF0dGxlX2NvbnRyb2xfZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIikgPT0gXCJzaG93XCIpIHtcclxuICAgIHNob3dfYmF0dGxlX2NvbnRyb2xfZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIiwgXCJoaWRlXCIpO1xyXG4gICAgc2hvd19iYXR0bGVfY29udHJvbF9ncm91cF9idXR0b24uaHRtbChcItCh0L/RgNGP0YLQsNGC0Ywg0LHQvtC10LLRi9C1INC90LDRgdGC0YDQvtC50LrQuFwiKTtcclxuICAgIGJhdHRsZV9jb250cm9sX2dyb3VwLnNob3coKTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2hvd19iYXR0bGVfY29udHJvbF9ncm91cF9idXR0b24uYXR0cihcIm1vZFwiLCBcInNob3dcIik7XHJcbiAgICBzaG93X2JhdHRsZV9jb250cm9sX2dyb3VwX2J1dHRvbi5odG1sKFwi0J/QvtC60LDQt9Cw0YLRjCDQsdC+0LXQstGL0LUg0L3QsNGB0YLRgNC+0LnQutC4XCIpO1xyXG4gICAgYmF0dGxlX2NvbnRyb2xfZ3JvdXAuaGlkZSgpO1xyXG4gIH1cclxufVxyXG5cclxuLy9zb2NrZXQuaW5pdCgnd3M6Ly9sb2NhbGhvc3Q6MzAwMScpO1xyXG5zb2NrZXQuaW5pdChTRVJWRVJfQUREUkVTUyk7XHJcblxyXG5zb2NrZXQucmVnaXN0ZXJPcGVuSGFuZGxlcigoKSA9PiB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3BsYXllcl9pbmZvJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb2xlID0gbXlfcm9sZTtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICB0b1NlbmQucGFzc3dvcmQgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2dtX3Bhc3N3b3JkJykpO1xyXG4gIH1cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufSk7XHJcblxyXG5zb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcigoZGF0YSkgPT4ge1xyXG4gIC8vY29uc29sZS5sb2coZGF0YSk7XHJcbiAgaWYgKCgoZGF0YS50b19uYW1lID09IG15X25hbWUpIHx8IChkYXRhLnRvX25hbWUgPT0gJ2FsbCcpKSAmJiAoZGF0YS5yb29tX251bWJlciA9PSBteV9yb29tKSkge1xyXG4gICAgaWYgKGRhdGEuY29tbWFuZCA9PSAncGxheWVyX2luZm9fcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmlzVmFsaWQgPT0gMCkge1xyXG4gICAgICAgIGFsZXJ0KCfQotCwINC60LDQutC+0Lkg0YLRiyDQs9C8Jyk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF0YS5yb2xlID09ICdnbScpIHtcclxuICAgICAgICBzeW5jX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgc2hvd19ib2FyZF9jcmVhdGlvbl9ncm91cF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNob3dfYm9hcmRfY3JlYXRpb25fZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIiwgXCJzaG93XCIpO1xyXG4gICAgICAgIHNob3dfYm9hcmRfZWRpdF9ncm91cF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNob3dfYm9hcmRfZWRpdF9ncm91cF9idXR0b24uYXR0cihcIm1vZFwiLCBcInNob3dcIik7XHJcbiAgICAgICAgc2hvd19iYXR0bGVfY29udHJvbF9ncm91cF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNob3dfYmF0dGxlX2NvbnRyb2xfZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIiwgXCJzaG93XCIpO1xyXG5cclxuICAgICAgICB2YXIgZHJvcGJveF9pbWFnZSA9ICQoXCI8aW1nPlwiKTtcclxuICAgICAgICBkcm9wYm94X2ltYWdlLmF0dHIoJ3NyYycsIERST1BCT1hfSU1BR0UpO1xyXG4gICAgICAgIGRyb3Bib3hfaW1hZ2UuYXR0cignaGVpZ2h0JywgJzcwcHgnKTtcclxuICAgICAgICBkcm9wYm94X2ltYWdlLmF0dHIoJ3dpZHRoJywgJzEwMHB4Jyk7XHJcbiAgICAgICAgZHJvcGJveF9pbWFnZS5hZGRDbGFzcyhcImRyb3Bib3hcIik7XHJcblxyXG4gICAgICAgIGRyb3Bib3hfaW1hZ2Uub24oXCJkcmFnb3ZlclwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZHJvcGJveF9pbWFnZS5vbihcImRyb3BcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHZhciBjZWxsID0gZHJhZ2dlZDtcclxuICAgICAgICAgIGlmIChjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImJvYXJkX2NlbGxcIikpIHtcclxuICAgICAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gY2VsbC5yb3cgKiBnYW1lX3N0YXRlLnNpemUgKyBjZWxsLmNvbHVtbjtcclxuICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XTtcclxuICAgICAgICAgICAgaW5pdGlhdGl2ZV9vcmRlcl9hcnJheS5wdXNoKGNoYXJhY3Rlcl9udW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGkgPSBpbml0aWF0aXZlX29yZGVyX2FycmF5Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIHZhciBpbWcgPSBjb25zdHJ1Y3RfaW5pdGlhdGl2ZV9pbWFnZShjaGFyYWN0ZXJfbnVtYmVyLCBpKTtcclxuICAgICAgICAgICAgaW1nLmFwcGVuZFRvKGluaXRpYXRpdmVfb3JkZXJfY29udGFpbmVyKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbml0aWF0aXZlX2ltYWdlXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoY2VsbC5nZXRBdHRyaWJ1dGUoXCJhcnJheV9wb3NpdGlvblwiKSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAoaSsxKTsgaiA8IGluaXRpYXRpdmVfb3JkZXJfYXJyYXkubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAvL3ZhciBzZWxlY3RvciA9IFwiI2luaXRpYXRpdmVfaW1hZ2VfXCIgKyBqO1xyXG4gICAgICAgICAgICAgIHZhciBpbml0aWF0aXZlX2ltYWdlID0gJChcIlthcnJheV9wb3NpdGlvbj1cIiArIGogKyBcIl1cIik7XHJcbiAgICAgICAgICAgICAgdmFyIG5ld19pbmRleCA9IGotMTtcclxuICAgICAgICAgICAgICBpbml0aWF0aXZlX2ltYWdlLmF0dHIoJ2FycmF5X3Bvc2l0aW9uJywgbmV3X2luZGV4KTtcclxuICAgICAgICAgICAgICBpbml0aWF0aXZlX2ltYWdlLmF0dHIoJ2lkJywgXCJpbml0aWF0aXZlX2ltYWdlX1wiICsgbmV3X2luZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGluaXRpYXRpdmVfb3JkZXJfYXJyYXlbaV07XHJcbiAgICAgICAgICAgIHVuaG92ZXJfY2hhcmFjdGVyKGNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgICAgICAgICBpbml0aWF0aXZlX29yZGVyX2FycmF5LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgY2VsbC5yZW1vdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZHJvcGJveF9pbWFnZS5hcHBlbmRUbyhpbml0aWF0aXZlX2Ryb3Bib3hfY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGU7XHJcbiAgICAgICAgICAgIC8vIHFcclxuICAgICAgICAgICAgaWYoa2V5Q29kZSA9PSA4MSkge1xyXG4gICAgICAgICAgICAgICAgZm9nTW9kZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT0gODcpIHsgLy8gd1xyXG4gICAgICAgICAgICAgIHdfb25jbGljaygpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PSA2NSkgeyAvLyBhXHJcbiAgICAgICAgICAgICAgYV9vbmNsaWNrKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0O1xyXG4gICAgICBncm91cF9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfZ3JvdXBfbGlzdDtcclxuICAgICAgb2JzdGFjbGVfbGlzdCA9IGRhdGEub2JzdGFjbGVfbGlzdDtcclxuICAgICAgd2VhcG9uX2xpc3QgPSBkYXRhLndlYXBvbl9saXN0XHJcbiAgICAgIHdlYXBvbl9kZXRhaWxlZF9pbmZvID0gZGF0YS53ZWFwb25fZGV0YWlsZWRfaW5mb1xyXG4gICAgICBza2lsbF9kZXRhaWxlZF9pbmZvID0gZGF0YS5za2lsbF9kZXRhaWxlZF9pbmZvXHJcbiAgICAgIHNraWxsX2xpc3QgPSBkYXRhLnNraWxsX2xpc3RcclxuICAgICAgc2F2ZXNfbGlzdCA9IGRhdGEuc2F2ZXNfbGlzdFxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzYXZlc19saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gJChcIjxvcHRpb24+XCIpO1xyXG4gICAgICAgIGN1cnJlbnRfb3B0aW9uLnRleHQoc2F2ZXNfbGlzdFtpXSk7XHJcbiAgICAgICAgY3VycmVudF9vcHRpb24udmFsKHNhdmVzX2xpc3RbaV0pO1xyXG4gICAgICAgIHNhdmVzX3NlbGVjdC5hcHBlbmQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NvbnN0cnVjdF9ib2FyZF9yZXNwb25zZScpIHtcclxuICAgICAgY2xlYXJfY2hhcmFjdGVyX3N0YXRlKClcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGRhdGEuZ2FtZV9zdGF0ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmNlbGxfaWRdID0gZGF0YS5jaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gZGF0YS5jaGFyYWN0ZXJfaW5mbztcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3RlcjtcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zdHJlbmd0aCA9IHBhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCk7XHJcbiAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc3RhbWluYSA9IHBhcnNlSW50KGNoYXJhY3Rlci5zdGFtaW5hKTtcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5hZ2lsaXR5ID0gcGFyc2VJbnQoY2hhcmFjdGVyLmFnaWxpdHkpO1xyXG4gICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdLmludGVsbGlnZW5jZSA9IHBhcnNlSW50KGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtkYXRhLmNlbGxfaWRdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZGF0YS5jZWxsX2lkKTtcclxuICAgICAgICBjZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShkYXRhLmNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gYm9udXNfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gbWFpbl9hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgYXNzaWduX21vdmVzKGRhdGEuY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gcGFyc2VJbnQoY2hhcmFjdGVyLktEX3BvaW50cyk7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDA7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IFwiYWxsXCI7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyLmludmVudG9yeVswXVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHt9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gZGF0YS5jZWxsX2lkO1xyXG4gICAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwiZXZhZGVfYm9udXNcIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHBhcnNlSW50KGNoYXJhY3Rlci5ldmFkZV9ib251cyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwibWVsZWVfcmVzaXN0XCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX3Jlc2lzdFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gcGFyc2VGbG9hdChjaGFyYWN0ZXIubWVsZWVfcmVzaXN0KS8xMDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX3Jlc2lzdFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMC4wO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwiYnVsbGV0X3Jlc2lzdFwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5idWxsZXRfcmVzaXN0W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUZsb2F0KGNoYXJhY3Rlci5idWxsZXRfcmVzaXN0KS8xMDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJ1bGxldF9yZXNpc3RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDAuMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8g0LDQutGC0LjQstCw0YbQuNGPINC/0LDRgdGB0LjQstC+0LpcclxuICAgICAgaWYgKGNoYXJhY3Rlci5oYXNPd25Qcm9wZXJ0eShcImFkYXB0aXZlX2ZpZ2h0aW5nXCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gLTE7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2FkZF9vYnN0YWNsZV9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIG9ic3RhY2xlID0gZGF0YS5vYnN0YWNsZV9pbmZvO1xyXG4gICAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW2RhdGEub2JzdGFjbGVfbnVtYmVyXSA9IG9ic3RhY2xlO1xyXG4gICAgICBnYW1lX3N0YXRlLm9ic3RhY2xlX2V4dHJhX2luZm9bZGF0YS5jZWxsX2lkXSA9IHt9O1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtkYXRhLmNlbGxfaWRdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZGF0YS5jZWxsX2lkKTtcclxuICAgICAgICBjZWxsLnNyYyA9IG9ic3RhY2xlLmF2YXRhcjtcclxuICAgICAgfVxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBkYXRhLm9ic3RhY2xlX251bWJlciAqICgtMSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbW92ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciB0b19pbmRleCA9IGRhdGEudG9faW5kZXg7XHJcbiAgICAgIHZhciBmcm9tX2luZGV4ID0gZGF0YS5mcm9tX2luZGV4O1xyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdG9faW5kZXhdID09IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtmcm9tX2luZGV4XSA9PSBkYXRhLmNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICAgICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3RvX2luZGV4XSA9IGRhdGEuY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHRvX2luZGV4O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuaW52aXNpYmlsaXR5X2VuZGVkX2lkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgaWQgPSBkYXRhLmludmlzaWJpbGl0eV9lbmRlZF9pZFtpXTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbaWRdID0gXCJhbGxcIjtcclxuXHJcbiAgICAgICAgICB2YXIgcG9zaXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25baWRdO1xyXG4gICAgICAgICAgdmFyIHRvX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgcG9zaXRpb24pO1xyXG4gICAgICAgICAgdmFyIGF2YXRhciA9IGdldF9vYmplY3RfcGljdHVyZShpZCk7XHJcbiAgICAgICAgICB0b19jZWxsLnNyYyA9IGF2YXRhcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgICAgIGlmICghY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwibGFuZG1pbmVfaW1tdW5lXCIpKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubWluZXNfZXhwbG9kZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG1pbmVfcG9zaXRpb24gPSBkYXRhLm1pbmVzX2V4cGxvZGVkW2ldXHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIG1pbmVfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICBjZWxsLnNyYyA9IGZvZ09yUGljKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmRleE9mKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLnNwbGljZShpbmRleCwxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbbWluZV9wb3NpdGlvbl0gPSBbXVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLm1pbmVzX2RhbWFnZSA+IDApIHtcclxuICAgICAgICAgICAgZXhwbG9zaW9uX2F1ZGlvLnBsYXkoKTtcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEuY2hhcmFjdGVyX251bWJlciwgZGF0YS5taW5lc19kYW1hZ2UpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9C+0LTRgNGL0LLQsNC10YLRgdGPINC90LAg0LzQuNC90LDRhSDQv9C+0LvRg9GH0LDRjyBcIiArIGRhdGEubWluZXNfZGFtYWdlICsgXCIg0YPRgNC+0L3QsFwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAvLyByZW1vdmUgc2hpZWxkZWQgcHJvcGVydHkgZnJvbSBjaGFyYWN0ZXIgYW5kIHJlbW92ZSBjaGFyYWN0ZXIgZnJvbSBzaGllbGRlZCBsaXN0XHJcbiAgICAgICAgaWYgKGRhdGEubGVmdF9zaGllbGQgPT0gMSkge1xyXG4gICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXRcclxuICAgICAgICAgIHZhciBpbmRleCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2RhdGEuc2hpZWxkX2luZGV4XS5jaGFyYWN0ZXJfbGlzdC5pbmRleE9mKGRhdGEuY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbZGF0YS5zaGllbGRfaW5kZXhdLmNoYXJhY3Rlcl9saXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAxO1xyXG5cclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gc3RhbWluYV9tb3ZlX2Nvc3RcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBwYXJzZUZsb2F0KGRhdGEuZGlzdGFuY2UpXHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJzbmlwZXJcIikge1xyXG4gICAgICAgICAgICB2YXIgZWZmZWN0c19vYmplY3QgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgICAgaWYgKGVmZmVjdHNfb2JqZWN0Lmhhc093blByb3BlcnR5KFwic25pcGVyX3Bhc3NpdmVcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9hdHRhY2tfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9kYW1hZ2VfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBjdXJyZW50X2F0dGFja19ib251cyAtIDVcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBjdXJyZW50X2RhbWFnZV9ib251c1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIHNuaXBlcl9wYXNzaXZlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmF0dGFja19ib251cyA9IC01XHJcbiAgICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmRhbWFnZV9ib251cyA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUgPSBzbmlwZXJfcGFzc2l2ZV9vYmplY3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSA1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghKCgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVt0b19pbmRleF0gPT0gMSkpIHx8IChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gIT0gXCJhbGxcIiAmJiBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gIT0gbXlfbmFtZSkpKSB7XHJcbiAgICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcbiAgICAgICAgICB0b19jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShkYXRhLmNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtmcm9tX2luZGV4XSA9IDA7XHJcbiAgICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZnJvbV9pbmRleF0gPT0gMSkpKSB7XHJcbiAgICAgICAgICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBmcm9tX2luZGV4KTtcclxuICAgICAgICAgIG9sZF9jZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlbGV0ZV9vYmplY3RfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiY2hhcmFjdGVyX251bWJlclwiKSkge1xyXG4gICAgICAgIGNsZWFyX2NoYXJhY3RlcihkYXRhLmNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZGF0YS5pbmRleF0gPCAwKSB7Ly8gaXMgb2JzdGFjbGVcclxuICAgICAgICBnYW1lX3N0YXRlLm9ic3RhY2xlX2V4dHJhX2luZm9bZGF0YS5pbmRleF0gPSB7fTtcclxuICAgICAgfVxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuaW5kZXhdID0gMDtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZGF0YS5pbmRleF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgZGF0YS5pbmRleCk7XHJcbiAgICAgICAgY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3JvbGxfaW5pdGlhdGl2ZV9yZXNwb25zZScpIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmUgPSBkYXRhLmluaXRpYXRpdmVfc3RhdGU7XHJcbiAgICAgIGluaXRpYXRpdmVfb3JkZXJfYXJyYXkgPSBkYXRhLmluaXRpYXRpdmVfb3JkZXJfYXJyYXk7XHJcbiAgICAgIGRpc3BsYXlfaW5pdGlhdGl2ZV9saW5lKCk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnZGVhbF9kYW1hZ2VfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBkYXRhLmRhbWFnZTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdzYXZlX2dhbWVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT0gMSkge1xyXG4gICAgICAgIGFsZXJ0KCdHYW1lICcgKyBkYXRhLnNhdmVfbmFtZSArICcgc2F2ZWQgc3VjY2VzZnVsbHknKTtcclxuICAgICAgICBzYXZlc19saXN0LnB1c2goZGF0YS5zYXZlX25hbWUpO1xyXG4gICAgICAgIHZhciBjdXJyZW50X29wdGlvbiA9ICQoXCI8b3B0aW9uPlwiKTtcclxuICAgICAgICBjdXJyZW50X29wdGlvbi50ZXh0KGRhdGEuc2F2ZV9uYW1lKTtcclxuICAgICAgICBjdXJyZW50X29wdGlvbi52YWwoZGF0YS5zYXZlX25hbWUpO1xyXG4gICAgICAgIHNhdmVzX3NlbGVjdC5hcHBlbmQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdHYW1lIHdpdGggbmFtZSAnICsgZGF0YS5zYXZlX25hbWUgKyAnIGFscmVhZHkgZXhpc3QhJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdsb2FkX2dhbWVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT0gMSkge1xyXG4gICAgICAgIHZhciBmdWxsX2dhbWVfc3RhdGUgPSBkYXRhLmZ1bGxfZ2FtZV9zdGF0ZTtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX3N0YXRlO1xyXG4gICAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvID0gZnVsbF9nYW1lX3N0YXRlLmNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUub2JzdGFjbGVfZGV0YWlsZWRfaW5mbztcclxuICAgICAgICBjb25zdHJ1Y3RfYm9hcmQoZnVsbF9nYW1lX3N0YXRlLmdhbWVfc3RhdGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gbG9hZCBnYW1lICcgKyBkYXRhLnNhdmVfbmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdzeW5jX2JvYXJkX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgZnVsbF9nYW1lX3N0YXRlID0gZGF0YS5mdWxsX2dhbWVfc3RhdGU7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfc3RhdGU7XHJcbiAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvID0gZnVsbF9nYW1lX3N0YXRlLmNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gZnVsbF9nYW1lX3N0YXRlLm9ic3RhY2xlX2RldGFpbGVkX2luZm87XHJcbiAgICAgIGNvbnN0cnVjdF9ib2FyZChmdWxsX2dhbWVfc3RhdGUuZ2FtZV9zdGF0ZSk7XHJcbiAgICAgIGluaXRpYXRpdmVfb3JkZXJfYXJyYXkgPSBmdWxsX2dhbWVfc3RhdGUuaW5pdGlhdGl2ZV9vcmRlcl9hcnJheTtcclxuICAgICAgZGlzcGxheV9pbml0aWF0aXZlX2xpbmUoKVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3VwZGF0ZV9mb2dfcmVzcG9uc2UnKSB7XHJcblx0XHRcdFx0dmFyIGluZGV4X2xpc3QgPSBkYXRhLmluZGV4X2xpc3Q7XHJcbiAgICAgICAgdmFyIGZvZ19zdGF0ZTtcclxuICAgICAgICBpZiAoZGF0YS51cGRhdGVfdHlwZSA9PSAncmVtb3ZlJykge1xyXG4gICAgICAgICAgZm9nX3N0YXRlID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9nX3N0YXRlID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgbGV0IGluZGV4ID0gaW5kZXhfbGlzdFtpXTtcclxuICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGluZGV4KTtcclxuICAgICAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9IGZvZ19zdGF0ZTtcclxuICAgICAgICAgIGNlbGwuc3JjID0gZm9nT3JQaWMoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHRcdH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdhc3NpZ25fem9uZV9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIGluZGV4X2xpc3QgPSBkYXRhLmluZGV4X2xpc3RcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleF9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2luZGV4X2xpc3RbaV1dID0gZGF0YS56b25lX251bWJlcjtcclxuICAgICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtpbmRleF9saXN0W2ldXSA9IGRhdGEubW9kaWZpY2F0b3I7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBkYXRhLm5ld192YWx1ZTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdzaW1wbGVfcm9sbF9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIG1lc3NhZ2UgPSBkYXRhLmNoYXJhY3Rlcl9uYW1lICsgXCIg0LHRgNC+0YHQsNC10YIgXCIgKyBkYXRhLnJvbGxcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NraWxsX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgdXNlcl9pbmRleCA9IGRhdGEudXNlcl9pbmRleFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW3VzZXJfaW5kZXhdID0gMVxyXG4gICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShcImFpbV9vdmVyXCIpKSB7XHJcbiAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWltXHJcbiAgICAgIH1cclxuICAgICAgc3dpdGNoKGRhdGEuc2tpbGxfaW5kZXgpIHtcclxuICAgICAgICBjYXNlIDA6IC8vINGA0YvQstC+0LpcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgdmFyIGNoYXJnZV9tb3ZlX2luY3JlYXNlID0gcGFyc2VJbnQoY2hhcmFjdGVyLmFnaWxpdHkpXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gKyBjaGFyZ2VfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnIHx8IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uaGFzT3duUHJvcGVydHkoJ3ByZV9jaGFyZ2UnKSkge1xyXG4gICAgICAgICAgICAgIHZhciBjaGFyZ2VfdXNlcl9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIGNoYXJnZV91c2VyX29iamVjdC5jb29sZG93biA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmNoYXJnZV91c2VyID0gY2hhcmdlX3VzZXJfb2JqZWN0XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIHByZV9jaGFyZ2Vfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICBwcmVfY2hhcmdlX29iamVjdC5jb29sZG93biA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnByZV9jaGFyZ2UgPSBwcmVfY2hhcmdlX29iamVjdFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvtCy0LXRgNGI0LDQtdGCINGA0YvQstC+0LpcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOiAvLyDQv9GA0LjQu9C40LIg0LDQtNGA0LXQvdCw0LvQuNC90LBcclxuICAgICAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0X2luZGV4ID0gZGF0YS50YXJnZXRfaW5kZXhcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pbmRleF1cclxuICAgICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3RhcmdldF9pbmRleF0gLSBhZHJlbmFsaW5lX3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0ID0ge31cclxuICAgICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0Lm1pbnVzX2FjdGlvbnMgPSBkYXRhLm1pbnVzX2FjdGlvbnNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaW5kZXhdLmFkcmVuYWxpbmVfdGFyZ2V0ID0gYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0XHJcblxyXG4gICAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBhZHJlbmFsaW5lX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWRyZW5hbGluZV91c2VyID0gYWRyZW5hbGluZV9vYmplY3RfdXNlclxyXG5cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQv9GA0LjQu9C40LIg0LDQtNGA0LXQvdCw0LvQuNC90LAuIFwiICArIHRhcmdldC5uYW1lICsgXCIg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9ucyArIFwiINC00LXQudGB0YLQstC40LkuINCt0YLQviDQsdGD0LTQtdGCINGB0YLQvtC40YLRjCBcIiArIGRhdGEubWludXNfYWN0aW9ucyArIFwiINC00LXQudGB0YLQstC40Lkg0L3QsCDRgdC70LXQtNGD0Y7RidC40Lkg0YXQvtC0LlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6IC8vINC/0L7QtNGA0LXQt9Cw0L3QuNC1INGB0YPRhdC+0LbQuNC70LjQuVxyXG4gICAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBzdGFtaW5hX2N1dF9saW1iX2Nvc3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGN1dF9saW1iX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIGN1dF9saW1iX29iamVjdC5jb29sZG93biA9IGN1dF9saW1iX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uY3V0X2xpbWJfdXNlciA9IGN1dF9saW1iX29iamVjdFxyXG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQtdGC0YHRjyDQv9C+0LTRgNC10LfQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji5cIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQtdGC0YHRjyDQv9C+0LTRgNC10LfQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLlwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnNraWxsX291dGNvbWUgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGxpbWJfY3V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgIGxpbWJfY3V0X29iamVjdC5kdXJhdGlvbiA9IGN1dF9saW1iX2R1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmN1dF9saW1iID0gbGltYl9jdXRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAtMTBcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L/QvtC00YDQtdC30LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCx0LXQt9GD0YHQv9C10YjQvdC+INC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc2tpbGxfb3V0Y29tZSA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbGltYl9jdXRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgICAgbGltYl9jdXRfb2JqZWN0LmR1cmF0aW9uID0gY3V0X2xpbWJfZHVyYXRpb25cclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uY3V0X2xpbWIgPSBsaW1iX2N1dF9vYmplY3RcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IC0xMFxyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQv9C+0LTRgNC10LfQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCx0LXQt9GD0YHQv9C10YjQvdC+INC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICAgICAgdmFyIGxpbWJfY3V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgbGltYl9jdXRfb2JqZWN0LmR1cmF0aW9uID0gY3V0X2xpbWJfZHVyYXRpb24gKyAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uY3V0X2xpbWIgPSBsaW1iX2N1dF9vYmplY3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gLTEwXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0L/QvtC00YDQtdC30LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdC+INGC0L7RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOiAvLyDRgdC70LDQsdC+0LUg0LzQtdGB0YLQvlxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHN0YW1pbmFfd2Vha3Nwb3RfY29zdFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGRhdGEub3V0Y29tZSA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICB2YXIgd2Vha3Nwb3Rfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgd2Vha3Nwb3Rfb2JqZWN0Lmh1bnRlcl9pZCA9IHVzZXJfaW5kZXhcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ud2Vha3Nwb3QgPSB3ZWFrc3BvdF9vYmplY3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L7QsdC90LDRgNGD0LbQuNC7INGB0LvQsNCx0L7QtSDQvNC10YHRgtC+IFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC90LUg0YPQtNCw0LvQvtGB0Ywg0L7QsdC90LDRgNGD0LbQuNGC0Ywg0YHQu9Cw0LHQvtC1INC80LXRgdGC0L4gXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgNDogLy8g0LvQtdGH0LXQvdC40LVcclxuICAgICAgICB2YXIgaGVhbGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgdmFyIGNvb2xkb3duID0gMFxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVt1c2VyX2luZGV4XSA+IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2RhdGEudGFyZ2V0X2lkXSkge1xyXG4gICAgICAgICAgLy8g0L/QsNGG0LjQtdC90YIg0L3QtSDRhdC+0LTQuNGCINCyINGN0YLQvtGCINC20LUg0YXQvtC0XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXS8yXHJcbiAgICAgICAgICBjb29sZG93biA9IDBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29vbGRvd24gPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBoZWFsZWRfb2JqZWN0ID0ge31cclxuICAgICAgICBoZWFsZWRfb2JqZWN0LmNvb2xkb3duID0gY29vbGRvd25cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5oZWFsZWQgPSBoZWFsZWRfb2JqZWN0XHJcbiAgICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiZmFpbFwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQoyBcIiArIGhlYWxlci5uYW1lICsgXCIg0L3QtSDQv9C+0LvRg9GH0LjQu9C+0YHRjCDQstGL0LvQtdGH0LjRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmhlYWxfcm9sbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic3VjY2Vzc1wiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQoyBcIiArIGhlYWxlci5uYW1lICsgXCIg0L/QvtC70YPRh9C40LvQvtGB0Ywg0YPRgdC/0LXRiNC90L4g0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gZGF0YS5uZXdfaHBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNyaXRpY2FsIHN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC/0L7Qu9GD0YfQuNC70L7RgdGMINC60YDQuNGC0LjRh9C10YHQutC4ICgyINGB0YLQtdC/0LXQvdC4KSDQstGL0LvQtdGH0LjRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmhlYWxfcm9sbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBkYXRhLm5ld19ocFxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0J7RiNC40LHQutCwINC/0YDQuCDRgNCw0LfQsdC+0YDQtSDQvtGC0YXQuNC70LBcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTogLy8g0LHQvtC70YzRiNC+0Lkg0LHRgNCw0YJcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIHZhciBzaGllbGQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaGllbGQubmFtZSArIFwiINC30LDRidC40YLQuNC7IFwiICsgIHRhcmdldC5uYW1lICsgXCIgKCtcIiArIGRhdGEuYm9udXNfS0QgKyBcItC60LQpXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbZGF0YS50YXJnZXRfaWRdICsgZGF0YS5ib251c19LRFxyXG4gICAgICAgICAgdmFyIGJpZ19icm9fb2JqZWN0ID0ge31cclxuICAgICAgICAgIGJpZ19icm9fb2JqZWN0LmNvb2xkb3duID0gY29vbGRvd25fYmlnX2Jyb1xyXG4gICAgICAgICAgYmlnX2Jyb19vYmplY3QuYm9udXNfS0QgPSBkYXRhLmJvbnVzX0tEXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5iaWdfYnJvID0gYmlnX2Jyb19vYmplY3RcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNjogLy8g0L/QvtC00L3Rj9GC0Ywg0YnQuNGC0YtcclxuICAgICAgICAgIHZhciBzaGllbGQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgaWYgKGRhdGEub3V0Y29tZSA9PSBcInNoaWVsZF91cFwiKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3VzZXJfaW5kZXhdICsgc2hpZWxkX3VwX0tEXHJcbiAgICAgICAgICAgIHZhciBzaGllbGRfdXBfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgc2hpZWxkX3VwX29iamVjdC5zdGFtaW5hX2Nvc3QgPSBzaGllbGRfdXBfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIHNoaWVsZF91cF9vYmplY3QuS0QgPSBzaGllbGRfdXBfS0RcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5zaGllbGRfdXAgPSBzaGllbGRfdXBfb2JqZWN0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQv9C+0LTQvdGP0Lsg0YnQuNGC0Ysg0LfQsCDRh9Cw0YJcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gLSBzaGllbGRfdXBfS0RcclxuICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uc2hpZWxkX3VwXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQvtC/0YPRgdGC0LjQuyDRidC40YIuINCn0LDRgiDQv9GA0L7RgdGC0LgoXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OiAvLyDQv9C+0LbQuNGA0LDQvdC40LUg0YHRg9GJ0L3QvtGB0YLQuFxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdIC0gZGF0YS5kYW1hZ2VcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5oYXNPd25Qcm9wZXJ0eShcIk1hcmt1c19zdGFja3NcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uTWFya3VzX3N0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLk1hcmt1c19zdGFja3MgKyAyXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5NYXJrdXNfc3RhY2tzID0gMlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uaGFzT3duUHJvcGVydHkoXCJiaW9wb29sXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCArIGRhdGEuZGFtYWdlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgPSBkYXRhLmRhbWFnZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L3QsNC90L7RgdC40YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwINC+0YIg0LrQvtGC0L7RgNC+0LPQviDQvdC10LLQvtC30LzQvtC20L3QviDRg9Cy0LXRgNC90YPRgtGM0YHRj1wiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDk6IC8vINCw0LHRgdC+0LvRjtGC0L3QvtC1INCy0L7RgdGB0YLQsNC90L7QstC70LXQvdC40LVcclxuICAgICAgICAgIHZhciBoZWFsZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gMVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdICsgZGF0YS5oZWFsX2Ftb3VudFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sIC0gZGF0YS5oZWFsX2Ftb3VudFxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBoZWFsZXIubmFtZSArIFwiINCy0L7RgdGB0YLQsNC90LDQu9C40LLQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIFwiICsgZGF0YS5oZWFsX2Ftb3VudCArIFwiINGF0L9cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMDogLy8g0L/QvtC70YPRh9C40YLRjCDQsdC+0L3Rg9GBXHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gKyAxXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvNC10L3Rj9C10YIg0L7QsdGL0YfQvdC+0LUg0L3QsCDQsdC+0L3Rg9GB0L3QvtC1INC00LXQudGB0YLQstC40LVcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTE6IC8vINC+0YLQtNGL0YVcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gZGF0YS5uZXdfc3RhbWluYVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L7RgtC00YvRhdCw0LXRgi4g0KXQvtGA0L7RiNC10LPQviDQvtGC0L/Rg9GB0LrQsCFcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDEyOiAvLyDQs9Cw0LfQvtCy0LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gZ2FzX2JvbWJfc3RhbWluYV9jb3N0XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LHRgNC+0YHQsNC10YIg0LPQsNC30L7QstGD0Y4g0LHQvtC80LHRgy4g0KHQvtCy0LXRgtGD0LXQvCDQt9Cw0LTQtdGA0LbQsNGC0Ywg0LTRi9GF0LDQvdC40LUuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgICAgdmFyIGJvbWJfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgYm9tYl9vYmplY3QudHlwZSA9IFwiZ2FzX2JvbWJcIlxyXG4gICAgICAgICAgICBib21iX29iamVjdC5wb3NpdGlvbiA9IGRhdGEucG9zaXRpb25cclxuICAgICAgICAgICAgYm9tYl9vYmplY3QudGhyZXNob2xkID0gZGF0YS50aHJlc2hvbGRcclxuICAgICAgICAgICAgYm9tYl9vYmplY3QucmFkaXVzID0gM1xyXG4gICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5wdXNoKGJvbWJfb2JqZWN0KVxyXG5cclxuICAgICAgICAgICAgdmFyIGdhc19ib21iX3VzZXIgPSB7fVxyXG4gICAgICAgICAgICBnYXNfYm9tYl91c2VyLmNvb2xkb3duID0gZ2FzX2JvbWJfc2tpbGxfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5nYXNfYm9tYl91c2VyID0gZ2FzX2JvbWJfdXNlclxyXG5cclxuICAgICAgICAgICAgdmFyIGluaXRpYWxfcmFkaXVzID0gMlxyXG5cclxuICAgICAgICAgICAgYXBwbHlfYm9tYihkYXRhLnBvc2l0aW9uLCBpbml0aWFsX3JhZGl1cywgZGF0YS50aHJlc2hvbGQpXHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxMzogLy8g0YHQstC10YLQvtGI0YPQvNC+0LLQsNGPINCz0YDQsNC90LDRglxyXG4gICAgICAgICAgICB2YXIgbGlnaHRfc291bmRfYm9tYl91c2VyID0ge31cclxuICAgICAgICAgICAgbGlnaHRfc291bmRfYm9tYl91c2VyLmNvb2xkb3duID0gbGlnaHRfc291bmRfYm9tYl9za2lsbF9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmxpZ2h0X3NvdW5kX2JvbWJfdXNlciA9IGxpZ2h0X3NvdW5kX2JvbWJfdXNlclxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLm91dGNvbWVfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gZGF0YS5jaGFyYWN0ZXJfbGlzdFtpXVxyXG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgICAgIGlmIChkYXRhLm91dGNvbWVfbGlzdFtpXSA9PSAwKSB7IC8vINCf0YDQvtGI0LXQuyDRgdC/0LDRgdCx0YDQvtGB0L7QulxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGD0YHQv9C10Lsg0L/RgNC40LrRgNGL0YLRjCDQs9C70LDQt9CwXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC+0YHQu9C10L8g0L3QsCAyINGF0L7QtNCwXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYmxpbmRcIikpIHsvLyDQvdC1INC90LDQutC70LDQtNGL0LLQstCw0LXQvCDQtdGJ0LUg0YjRgtGA0LDRhFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmJsaW5kLmNvb2xkb3duID0gMlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGJsaW5kX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgIGJsaW5kX29iamVjdC5jb29sZG93biA9IDJcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5ibGluZCA9IGJsaW5kX29iamVjdFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdIC0gMlxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSAtIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTQ6IC8vINGI0L7QutC40YDQvtCy0LDRgtGMICjQtNGA0L7QvSArINGD0Y/Qt9Cy0LjQvNC+0YHRgtGMKVxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YHRgtGA0LXQu9GP0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L7QtNC90LDQutC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDRg9C00LDQu9C+0YHRjCDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICBzaG9ja2VkX2VmZmVjdChkYXRhLnRhcmdldF9pZClcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8g0Lgg0YjQvtC60LjRgNGD0LXRgiDRhtC10LvRjCAo0YPRj9C30LLQuNC80L7RgdGC0YwpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICBzaG9ja2VkX2VmZmVjdChkYXRhLnRhcmdldF9pZClcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YHRgtGA0LXQu9GP0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikg0Lgg0YjQvtC60LjRgNGD0LXRgiDRhtC10LvRjCAo0YPRj9C30LLQuNC80L7RgdGC0YwpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICBzaG9ja2VkX2VmZmVjdChkYXRhLnRhcmdldF9pZClcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INC/0L7Qv9Cw0LTQsNC10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiLCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjyDQuCDRiNC+0LrQuNGA0YPQtdGCINGG0LXQu9GMLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY292ZXJcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINGI0L7QutC40YDQvtCy0LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdC+INGC0L7RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE1OiAvLyDQv9GL0Ykg0L/Ri9GJINCz0L7Rg1xyXG4gICAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldF9pbmRleCA9IGRhdGEudGFyZ2V0X2luZGV4XHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2luZGV4XVxyXG4gICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gKyBwaWNoX3BpY2hfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gKyAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgcGljaF9waWNoX29iamVjdF90YXJnZXQgPSB7fVxyXG4gICAgICAgICAgcGljaF9waWNoX29iamVjdF90YXJnZXQuZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaW5kZXhdLnBpY2hfcGljaF90YXJnZXQgPSBwaWNoX3BpY2hfb2JqZWN0X3RhcmdldFxyXG5cclxuICAgICAgICAgIHZhciBwaWNoX3BpY2hfb2JqZWN0X3VzZXIgPSB7fVxyXG4gICAgICAgICAgcGljaF9waWNoX29iamVjdF91c2VyLmNvb2xkb3duID0gcGljaF9waWNoX2Nvb2xkb3duXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnBpY2hfcGljaF91c2VyID0gcGljaF9waWNoX29iamVjdF91c2VyXHJcblxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQn9GL0Ykt0J/Ri9GJLdCT0L7Rgy4gXCIgICsgdGFyZ2V0Lm5hbWUgKyBcIiDQv9C+0LvRg9GH0LDQtdGCIFwiICsgZGF0YS5leHRyYV9hY3Rpb25zICsgXCIg0LTQvtC/INC00LXQudGB0YLQstC40Lkg0L3QsCDRjdGC0L7RgiDQuCDRgdC70LXQtNGD0Y7RidC40Lkg0YXQvtC0LlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE2OiAvLyDRgdC40LvQvtCy0L7QtSDQv9C+0LvQtVxyXG4gICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGZvcmNlX2ZpZWxkX3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzaGllbGRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC50eXBlID0gXCJmb3JjZV9maWVsZFwiXHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3QucG9zaXRpb24gPSBkYXRhLnBvc2l0aW9uXHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3QucmFkaXVzID0gZm9yY2VfZmllbGRfcmFkaXVzXHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3Quc2hpZWxkID0gZGF0YS5zaGllbGRcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5jaGFyYWN0ZXJfbGlzdCA9IGRhdGEuY2hhcmFjdGVyX2xpc3RcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5jZWxsc19wcm90ZWN0ZWQgPSBkYXRhLmNlbGxzX3Byb3RlY3RlZFxyXG4gICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5wdXNoKHNoaWVsZF9vYmplY3QpXHJcblxyXG4gICAgICAgICAgICB2YXIgc2hpZWxkX2luZGV4ID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMubGVuZ3RoIC0gMVxyXG4gICAgICAgICAgICB2YXIgY2hhcl9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfbGlzdFxyXG5cclxuICAgICAgICAgICAgdmFyIGZvcmNlX2ZpZWxkX3RhcmdldCA9IHt9XHJcbiAgICAgICAgICAgIGZvcmNlX2ZpZWxkX3RhcmdldC5zaGllbGRfaW5kZXggPSBzaGllbGRfaW5kZXhcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcl9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyX2xpc3RbaV1cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldCA9IGZvcmNlX2ZpZWxkX3RhcmdldFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9yY2VfZmllbGRfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGZvcmNlX2ZpZWxkX3VzZXIuY29vbGRvd24gPSBmb3JjZV9maWVsZF9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmZvcmNlX2ZpZWxkX3VzZXIgPSBmb3JjZV9maWVsZF91c2VyXHJcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LDQutGC0LjQstC40YDRg9C10YIg0YHQuNC70L7QstC+0LUg0L/QvtC70LVcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE3OiAvLyDQuNC90LLQuNC3XHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W3VzZXJfaW5kZXhdID0gZGF0YS51c2VybmFtZVxyXG4gICAgICAgICAgaWYgKG15X25hbWUgIT0gZGF0YS51c2VybmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBkYXRhLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE4OiAvLyDQsdC+0LXQstCw0Y8g0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtGMXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gLTE7XHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsNC60YLQuNCy0LjRgNGD0LXRgiDQsdC+0LXQstGD0Y4g0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtGMXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE5OiAvLyDQu9Cw0LrQuCDRiNC+0YJcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gbHVja3lfc2hvdF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGF0YS5yb2xsID09IDcpIHtcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZSlcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCj0LTQsNGH0LAg0LHQu9Cw0LPQvtCy0L7Qu9C40YIgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiLCDQutC+0YLQvtGA0YvQuSDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsCBcIiArIHRhcmdldC5uYW1lXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGRhdGEucm9sbCArIFwiINGN0YLQviDQvdC1INGH0LjRgdC70L4gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiLCDRgtCw0Log0YfRgtC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQuNC30LHQtdCz0LDQtdGCINCw0YLQsNC60LguXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjA6IC8vIGxvdHRlcnlfc2hvdFxyXG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBsb3R0ZXJ5X3Nob3Rfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGRhdGEucm9sbCA9PSA3KSB7XHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQmtCw0LrQsNGPINGD0LTQsNGH0LAhINCk0L7RgNGC0YPQvdCwINGP0LLQvdC+INC90LAg0YHRgtC+0YDQvtC90LUgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiLCDQutC+0YLQvtGA0YvQuSDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsCBcIiArIHRhcmdldC5uYW1lXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucm9sbCA9PSA3Nykge1xyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JTQttC10LrQv9C+0YIhIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC10LPQvtC00L3RjyDRgdGC0L7QuNGCINC60YPQv9C40YLRjCDQu9C+0YLQtdGA0LXQudC90YvQuSDQsdC40LvQtdGCLCDQsCDQv9C+0LrQsCDQvtC9INC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwIFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5yb2xsICsgXCIg0Y3RgtC+INC90LUg0YfQuNGB0LvQviBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINGC0LDQuiDRh9GC0L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINC40LfQsdC10LPQsNC10YIg0LDRgtCw0LrQuC5cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyMTogLy/QstGB0L/Qu9C10YHQuiDQtNC10LnRgdGC0LLQuNC5XHJcbiAgICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gKyBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGFjdGlvbl9zcGxhc2hfc3RhbWluYV9jb3N0KmRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciBhY3Rpb25fc3BsYXNoX29iamVjdCA9IHt9XHJcbiAgICAgICAgICBhY3Rpb25fc3BsYXNoX29iamVjdC5jb29sZG93biA9IGFjdGlvbl9zcGxhc2hfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWN0aW9uX3NwbGFzaCA9IGFjdGlvbl9zcGxhc2hfb2JqZWN0XHJcblxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQstGB0L/Qu9C10YHQuiDQtNC10LnRgdGC0LLQuNC5INC4INC/0L7Qu9GD0YfQsNC10YIgXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnMgKyBcIiDQvtGB0L3QvtCy0L3Ri9GFINC00LXQudGB0YLQstC40Lkg0LLQvNC10YHRgtC+INCx0L7QvdGD0YHQvdGL0YUuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyMjogLy8g0LPRgNCw0LQg0YPQtNCw0YDQvtCyXHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBwdW5jaF9yYWluZmFsbF9zdGFtaW5hX2Nvc3QqZGF0YS50b3RhbF9hdHRhY2tzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZGF0YS5kYW1hZ2UgPiAwKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlKVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC90LDQvdC+0YHQuNGCINCz0YDQsNC0INC40LcgXCIgKyBkYXRhLnRvdGFsX2F0dGFja3MgKyBcIiDRg9C00LDRgNC+0LIsINC40Lcg0LrQvtGC0L7RgNGL0YUgXCIgKyBkYXRhLnN1Y2Nlc3NmdWxsX2F0dGFja3MgKyBcIiDQv9C+0L/QsNC00LDRjtGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdCw0L3QvtGB0Y8gXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAuXCJcclxuXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIzOiAvLyDQsNC00YDQtdC90LDQu9C40L3QvtCy0YvQuSDQv9C+0YLQvtC/XHJcbiAgICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0X2luZGV4ID0gZGF0YS50YXJnZXRfaW5kZXhcclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1swXVxyXG4gICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gKyAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0ID0ge31cclxuICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldC5leHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICBhZHJlbmFsaW5lX29iamVjdF90YXJnZXQudHVybiA9IDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2luZGV4XS5wb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXQgPSBhZHJlbmFsaW5lX29iamVjdF90YXJnZXRcclxuXHJcbiAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdXNlciA9IHt9XHJcbiAgICAgICAgICBhZHJlbmFsaW5lX29iamVjdF91c2VyLmNvb2xkb3duID0gcG9pc29ub3VzX2FkcmVuYWxpbmVfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdXNlciA9IGFkcmVuYWxpbmVfb2JqZWN0X3VzZXJcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINCw0LTRgNC10L3QsNC70LjQvdC+0LLRi9C5INC/0L7RgtC+0L8uIFwiICArIHRhcmdldC5uYW1lICsgXCIg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9uc1swXSArIFwiINC00LXQudGB0YLQstC40Lkg0LIg0Y3RgtC+0YIg0YXQvtC0LCDQuCBcIiArIGRhdGEuZXh0cmFfYWN0aW9uc1sxXSArIFwiINCyINGB0LvQtdC00YPRjtGJ0LjQuS4g0K3RgtC+INCx0YPQtNC10YIg0YHRgtC+0LjRgtGMINC20LjQt9C90LXQuSDQuCDQstGL0L3QvtGB0LvQuNCy0L7RgdGC0LgsINC40YHQv9C+0LvRjNC30YPQudGC0LUg0YEg0YPQvNC+0LwuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgIGNhc2UgMjQ6IC8vINC60LjRgdC70L7RgtC90LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBhY2lkX2JvbWJfc3RhbWluYV9jb3N0XHJcblxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCx0YDQvtGB0LDQtdGCINC60LjRgdC70L7RgtC90YPRjiDQs9GA0LDQvdCw0YLRgy4g0JAg0L7QvdC4INGC0L7Qu9GM0LrQviDQutGD0L/QuNC70Lgg0L3QvtCy0YvQtSDQtNC+0YHQv9C10YXQuC4uLlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgdmFyIGFjaWRfYm9tYl91c2VyID0ge31cclxuICAgICAgICAgIGFjaWRfYm9tYl91c2VyLmNvb2xkb3duID0gYWNpZF9ib21iX2Nvb2xkb3duXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFjaWRfYm9tYl91c2VyID0gYWNpZF9ib21iX3VzZXJcclxuXHJcbiAgICAgICAgICBhcHBseV9hY2lkX2JvbWIoZGF0YS5wb3NpdGlvbiwgYWNpZF9ib21iX3JhZGl1cylcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjU6IC8vINC30LDQvNC40L3QuNGA0L7QstCw0YLRjFxyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhkYXRhLnBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLnB1c2goZGF0YS5wb3NpdGlvbilcclxuICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbZGF0YS5wb3NpdGlvbl0gPSBbXVxyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1tkYXRhLnBvc2l0aW9uXS5wdXNoKGRhdGEucGxheWVyX25hbWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyNjogLy8g0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0L7QstCw0YLRjFxyXG5cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC09IDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcblxyXG4gICAgICAgICAgaWYgKGRhdGEuaW50ZXJhY3Rpb25fdHlwZSA9PSBcImRpZmZ1c2VfbGFuZG1pbmVcIikge1xyXG4gICAgICAgICAgICBzd2l0Y2goZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImVtcHR5XCI6XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQoSDRh9C10LwgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINCy0LfQsNC40LzQvtC00LXQudGB0YLQstC+0LLQsNGC0Yw/XCJcclxuICAgICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIFwiZmFpbFwiOlxyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC/0YvRgtCw0LvRgdGPINC+0LHQtdC30LLRgNC10LTQuNGC0Ywg0LzQuNC90YMsINC90L4g0L3QtSDRgdGD0LzQtdC7LlwiXHJcbiAgICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICAgICAgdmFyIG1pbmVfcG9zaXRpb24gPSBkYXRhLnBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIG1pbmVfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICBjZWxsLnNyYyA9IGZvZ09yUGljKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmRleE9mKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLnNwbGljZShpbmRleCwxKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbbWluZV9wb3NpdGlvbl0gPSBbXVxyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LfQsNC/0YDQtdGJ0LDQtdGCINC80LjQvdC1INCy0LfRgNGL0LLQsNGC0YzRgdGPIVwiXHJcbiAgICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTd2l0Y2gg0L7QsdC10LLQt9GA0LXQttC10L3QuNGPINC/0L7RiNC10Lsg0L3QtSDRgtCw0LpcIilcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuaW50ZXJhY3Rpb25fdHlwZSA9PSBcImhhY2thYmxlX2NvbXB1dGVyXCIpIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gZGF0YS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgc3dpdGNoKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJhbHJlYWR5X2hhY2tlZFwiOlxyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JrQvtC80L/RjNGO0YLQtdGALCDQutC+0YLQvtGA0YvQuSBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0LLQt9C70L7QvNCw0YLRjCwg0YPQttC1INCx0YvQuyDRg9GB0L/QtdGI0L3QviDQstC30LvQvtC80LDQvSwg0LAg0LjQvdGE0L7RgNC80LDRhtC40Y8g0YPQtNCw0LvQtdC90LAuXCI7XHJcbiAgICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICBjYXNlIFwiYWxyZWFkeV9mYWlsZWRcIjpcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCf0YDQvtGC0L7QutC+0Lsg0LHQtdC30L7Qv9Cw0YHQvdC+0YHRgtC4INC90LAg0LrQvtC80L/RjNGO0YLQtdGA0LUsINC60L7RgtC+0YDRi9C5IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQstC30LvQvtC80LDRgtGMLCDRg9C20LUg0LHRi9C7INC30LDQv9GD0YnQtdC9INGA0LDQvdC10LUsINCwINC40L3RhNC+0YDQvNCw0YbQuNGPINGD0LTQsNC70LXQvdCwLiDQniDQstCw0YjQtdC5INC/0L7Qv9GL0YLQutC1INC80L7Qs9C70Lgg0YPQt9C90LDRgtGMLlwiO1xyXG4gICAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIFwiZmFpbGVkXCI6XHJcbiAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUub2JzdGFjbGVfZXh0cmFfaW5mb1tpbmRleF0uaGFja19mYWlscyA9IDM7IC8vIGZ1bGx5IGZhaWxlZFxyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JfQsNC/0YPRidC10L0g0L/RgNC+0YLQvtC60L7QuyDQsdC10LfQvtC/0LDRgdC90L7RgdGC0Lgg0L3QsCDQutC+0LzQv9GM0Y7RgtC10YDQtSwg0LrQvtGC0L7RgNGL0LkgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINCy0LfQu9C+0LzQsNGC0YwuINCS0YHRjyDQuNC90YTQvtGA0LzQsNGG0LjRjyDRg9C00LDQu9C10L3QsCwg0L7RgtC/0YDQsNCy0LvQtdC90L4g0YPQstC10LTQvtC80LvQtdC90LjQtSDQviDQv9C+0L/Ri9GC0LrQtSDQstC30LvQvtC80LAuXCI7XHJcbiAgICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJvbmVfZmFpbFwiOlxyXG4gICAgICAgICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5vYnN0YWNsZV9leHRyYV9pbmZvW2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcImhhY2tfZmFpbHNcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLm9ic3RhY2xlX2V4dHJhX2luZm9baW5kZXhdLmhhY2tfZmFpbHMgKz0gMVxyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUub2JzdGFjbGVfZXh0cmFfaW5mb1tpbmRleF0uaGFja19mYWlscyA9IDE7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGB0L7QstC10YDRiNCw0LXRgiDQvdC10YPQtNCw0YfQvdGD0Y4g0L/QvtC/0YvRgtC60YMg0LLQt9C70L7QvNCwLiDQntGB0YLQvtGA0L7QttC90L4sINCy0LDRiNC4INC00LXQudGB0YLQstC40Y8g0LzQvtCz0YPRgiDQsdGL0YLRjCDQt9Cw0LzQtdGH0LXQvdGLLlwiO1xyXG4gICAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgY2FzZSBcIm9uZV9zdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLm9ic3RhY2xlX2V4dHJhX2luZm9baW5kZXhdLmhhc093blByb3BlcnR5KFwiaGFja19zdGFnZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUub2JzdGFjbGVfZXh0cmFfaW5mb1tpbmRleF0uaGFja19zdGFnZSArPSAxXHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5vYnN0YWNsZV9leHRyYV9pbmZvW2luZGV4XS5oYWNrX3N0YWdlID0gMTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/RgNC+0LTQstC40LPQsNC10YLRgdGPINCyINCy0LfQu9C+0LzQtSDQsdCw0LfRiyDQtNCw0L3QvdGL0YUuINCf0YDQvtCz0YDQtdGB0YE6IFwiICsgKDMzKmdhbWVfc3RhdGUub2JzdGFjbGVfZXh0cmFfaW5mb1tpbmRleF0uaGFja19zdGFnZSkgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImhhY2tlZFwiOlxyXG4gICAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLm9ic3RhY2xlX2V4dHJhX2luZm9baW5kZXhdLmhhY2tfc3RhZ2UgPSAzOyAvLyBmdWxseSBoYWNrZWRcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGD0LTQsNC10YLRgdGPINC/0YDQvtGA0LLQsNGC0YzRgdGPINGH0LXRgNC10Lcg0YTQsNC10YDQstC+0LvQuyDQutC+0LzQv9GM0Y7RgtC10YDQsCwg0Lgg0L7QvSDQv9C+0LvRg9GH0LDQtdGCINC/0L7Qu9C90YvQuSDQtNC+0YHRgtGD0L8g0Log0LjQvNC10Y7RidC40LzRgdGPINC00LDQvdC90YvQvC5cIjtcclxuICAgICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBpbnRlcmFjdGlvblwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyNzogLy8g0L3QuNC60L7RgtC40L3QvtCy0YvQuSDRg9C00LDRgFxyXG4gICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciBmdWxsX2hwID0gSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLkhQW3VzZXJfaW5kZXhdIC0gZnVsbF9ocCAqIHRvYmFjY29fc3RyaWtlX2hwX3BlcmNlbnRhZ2VcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfaW5kZXhdICsgdG9iYWNjb19zdHJpa2VfYm9udXNcclxuICAgICAgICAgIHZhciB0b2JhY2NvX3N0cmlrZV9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgdG9iYWNjb19zdHJpa2Vfb2JqZWN0LmNvb2xkb3duID0gdG9iYWNjb19zdHJpa2VfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0udG9iYWNjb19zdHJpa2UgPSB0b2JhY2NvX3N0cmlrZV9vYmplY3RcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRhdC+0YDQvtGI0LXRh9C90L4g0LfQsNGC0Y/Qs9C40LLQsNC10YLRgdGPLiDQkdC10YDQtdCz0LjRgtC10YHRjCFcIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyODogLy8g0LrRgNGD0YfQtdC90YvQtSDQv9GD0LvQuFxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gY3VydmVkX2J1bGxldHNfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGRhdGEuY292ZXJfbGV2ZWwgPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcItCj0YDQvtCy0LXQvdGMINGD0LrRgNGL0YLQuNGPOiBcIiArIGRhdGEuY292ZXJfbGV2ZWxcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC10YLRgdGPINC30LDQutGA0YPRgtC40YLRjCDQv9GD0LvRjiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINC30LDQutGA0YPRgtC40YLRjCDQv9GD0LvRjiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L7QtNC90LDQutC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDRg9C00LDQu9C+0YHRjCDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlICE9ICdyb2d1ZScpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQt9Cw0LrRgNGD0YLQuNC7INC/0YPQu9GOIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LfQsNC60YDRg9GC0LjQuyDQv9GD0LvRjiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwi0LrRgNGD0YfQtdC90L7QuSDQv9GD0LvQtdC5LCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCd0LXRgdC80L7RgtGA0Y8g0L3QsCDQv9C+0L/Ri9GC0LrRgyBcIiArIGF0dGFja2VyLm5hbWUgKyBcIiDQvtCx0LrRgNGD0YLQuNGC0Ywg0L/RgNC10L/Rj9GC0YHRgtCy0LjQtSDQt9Cw0YnQuNGJ0LDRjtGJ0LXQtSBcIiArIHRhcmdldC5uYW1lICsgXCIsINGC0L7RgiDQstGB0LUg0YDQsNCy0L3QviDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyOTogLy8g0J/RgNC40YbQtdC70LjRgtGM0YHRj1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIGFpbV9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5haW0gPSBhaW1fb2JqZWN0XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzA6IC8vINCx0YvRgdGC0YDQsNGPINCw0YLQsNC60LBcclxuICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW3VzZXJfaW5kZXhdID0gMVxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uaGFzT3duUHJvcGVydHkoXCJxdWlja19hdHRhY2tfcmVhZHlcIikpIHtcclxuICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5xdWlja19hdHRhY2tfcmVhZHlcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHN0YW1pbmFfYXR0YWNrX2Nvc3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuY292ZXJfbGV2ZWwgPiAwKSB7XHJcbiAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwi0KPRgNC+0LLQtdC90Ywg0YPQutGA0YvRgtC40Y86IFwiICsgZGF0YS5jb3Zlcl9sZXZlbFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcIlwiXHJcbiAgICAgIH1cclxuICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCx0YvRgdGC0YDQviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LHRi9GB0YLRgNC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlICE9ICdyb2d1ZScpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LHRi9GB0YLRgNC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INCx0YvRgdGC0YDQviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0LHRi9GB0YLRgNC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY292ZXJcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINCx0YvRgdGC0YDQviDQsNGC0LDQutC+0LLQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90L4g0YLQvtGCINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDMxOiAvLyDRgdC70YPQttCx0LAg0YHQv9Cw0YHQtdC90LjRj1xyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSBzYWZldHlfc2VydmljZV9ib251c19hY3Rpb25zX2Nvc3RcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNhdmlvciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gc2F2aW9yLm5hbWUgKyBcIiDQvdC1INC00LDRgdGCINCyINC+0LHQuNC00YMgXCIgKyAgdGFyZ2V0Lm5hbWVcclxuICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbZGF0YS50YXJnZXRfaWRdICsgc2FmZXR5X3NlcnZpY2VfZGVmZW5zaXZlX2FkdmFudGFnZVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1tkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbZGF0YS50YXJnZXRfaWRdICsgc2FmZXR5X3NlcnZpY2VfZXZhZGVfYm9udXNcclxuXHJcbiAgICAgICAgdmFyIHNhZmV0eV9zZXJ2aWNlX3RhcmdldF9vYmplY3QgPSB7fVxyXG4gICAgICAgIHNhZmV0eV9zZXJ2aWNlX3RhcmdldF9vYmplY3QuZHVyYXRpb24gPSBzYWZldHlfc2VydmljZV9kdXJhdGlvblxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLnNhZmV0eV9zZXJ2aWNlX3RhcmdldCA9IHNhZmV0eV9zZXJ2aWNlX3RhcmdldF9vYmplY3RcclxuXHJcbiAgICAgICAgdmFyIHNhZmV0eV9zZXJ2aWNlX3VzZXJfb2JqZWN0ID0ge31cclxuICAgICAgICBzYWZldHlfc2VydmljZV91c2VyX29iamVjdC5jb29sZG93biA9IHNhZmV0eV9zZXJ2aWNlX2Nvb2xkb3duXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5zYWZldHlfc2VydmljZV91c2VyID0gc2FmZXR5X3NlcnZpY2VfdXNlcl9vYmplY3RcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzI6IC8vINC60LDQu9GM0LjQvdCz0LDQu9GP0YLQvtGAXHJcbiAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGNhbGluZ2FsYXRvcl9zdGFtaW5hX2Nvc3RcclxuXHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINC60LDQu9GM0LjQvdCz0LDQu9GP0YLQvtGALiDQodC+0LHQuNGA0LDQudGC0LXRgdGMINCy0L7QutGA0YPQsyEuXCJcclxuICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgIHZhciBjYWxpbmdhbGF0b3Jfb2JqZWN0ID0ge31cclxuICAgICAgICBjYWxpbmdhbGF0b3Jfb2JqZWN0LnR5cGUgPSBcImNhbGluZ2FsYXRvclwiXHJcbiAgICAgICAgY2FsaW5nYWxhdG9yX29iamVjdC5wb3NpdGlvbiA9IGRhdGEucG9zaXRpb25cclxuICAgICAgICBjYWxpbmdhbGF0b3Jfb2JqZWN0LmR1cmF0aW9uID0gY2FsaW5nYWxhdG9yX2R1cmF0aW9uXHJcbiAgICAgICAgY2FsaW5nYWxhdG9yX29iamVjdC5yYWRpdXMgPSBjYWxpbmdhbGF0b3JfcmFkaXVzXHJcbiAgICAgICAgY2FsaW5nYWxhdG9yX29iamVjdC5mbGF0X2hlYWwgPSBjYWxpbmdhbGF0b3JfZmxhdF9oZWFsXHJcbiAgICAgICAgY2FsaW5nYWxhdG9yX29iamVjdC5yb2xsX2hlYWwgPSBjYWxpbmdhbGF0b3Jfcm9sbF9oZWFsXHJcbiAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMucHVzaChjYWxpbmdhbGF0b3Jfb2JqZWN0KVxyXG5cclxuICAgICAgICB2YXIgY2FsaW5nYWxhdG9yX3VzZXIgPSB7fVxyXG4gICAgICAgIGNhbGluZ2FsYXRvcl91c2VyLmNvb2xkb3duID0gY2FsaW5nYWxhdG9yX3NraWxsX2Nvb2xkb3duXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5jYWxpbmdhbGF0b3JfdXNlciA9IGNhbGluZ2FsYXRvcl91c2VyXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzM6IC8vINCx0LDRhNGEINCx0LXQu9GM0LLQtdGCXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcIm1haW5fYWN0aW9uXCIsIHVzZXJfaW5kZXgsIC0xKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciB0YXJnZXRfaWQgPSBkYXRhLnRhcmdldF9pZDtcclxuXHJcbiAgICAgICAgICB2YXIgYnVmZmVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfaWRdXHJcblxyXG4gICAgICAgICAgLy8g0J3QtdC/0L7RgdGA0LXQtNGB0YLQstC10L3QvdC+INCx0LDRhNGEXHJcbiAgICAgICAgICB2YXIgYmVsdmV0X2J1ZmZfdGFyZ2V0X29iamVjdCA9IHt9O1xyXG4gICAgICAgICAgYmVsdmV0X2J1ZmZfdGFyZ2V0X29iamVjdC5kdXJhdGlvbiA9IGJlbHZldF9idWZmX3NraWxsX2R1cmF0aW9uO1xyXG4gICAgICAgICAgYmVsdmV0X2J1ZmZfdGFyZ2V0X29iamVjdC5hdHRhY2tfYm9udXMgPSBiZWx2ZXRfYnVmZl9hdHRhY2tfYm9udXM7XHJcbiAgICAgICAgICBiZWx2ZXRfYnVmZl90YXJnZXRfb2JqZWN0Lm1lbGVlX2FkdmFudGFnZSA9IGJlbHZldF9idWZmX21lbGVlX2FkdmFudGFnZTtcclxuICAgICAgICAgIGJlbHZldF9idWZmX3RhcmdldF9vYmplY3QucmFuZ2VkX2FkdmFudGFnZSA9IGJlbHZldF9idWZmX3JhbmdlZF9hZHZhbnRhZ2U7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pZF0uYmVsdmV0X2J1ZmZfdGFyZ2V0ID0gYmVsdmV0X2J1ZmZfdGFyZ2V0X29iamVjdDtcclxuICAgICAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJhdHRhY2tfYm9udXNcIiwgdGFyZ2V0X2lkLCBiZWx2ZXRfYnVmZl9hdHRhY2tfYm9udXMpO1xyXG4gICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcIm1lbGVlX2FkdmFudGFnZVwiLCB0YXJnZXRfaWQsIGJlbHZldF9idWZmX21lbGVlX2FkdmFudGFnZSk7XHJcbiAgICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwicmFuZ2VkX2FkdmFudGFnZVwiLCB0YXJnZXRfaWQsIGJlbHZldF9idWZmX3JhbmdlZF9hZHZhbnRhZ2UpO1xyXG5cclxuXHJcbiAgICAgICAgICAvLyDQn9C+0LTRgdGH0LXRgiDRgdC60YDRi9GC0YvRhSDRgdGC0LDQutC+0LJcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pZF0uaGFzT3duUHJvcGVydHkoXCJiZWx2ZXRfYnVmZl9zdGFja3NcIikpIHtcclxuICAgICAgICAgICAgdmFyIGJlbHZldF9idWZmX3N0YWNrc19vYmplY3QgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pZF0uYmVsdmV0X2J1ZmZfc3RhY2tzO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGJlbHZldF9idWZmX3N0YWNrc19vYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgYmVsdmV0X2J1ZmZfc3RhY2tzX29iamVjdC5zdGFja3MgPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYmVsdmV0X2J1ZmZfc3RhY2tzX29iamVjdC5zdGFja3MgPSBiZWx2ZXRfYnVmZl9zdGFja3Nfb2JqZWN0LnN0YWNrcyArIDE7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pZF0uYmVsdmV0X2J1ZmZfc3RhY2tzID0gYmVsdmV0X2J1ZmZfc3RhY2tzX29iamVjdDtcclxuXHJcbiAgICAgICAgICAvLyDQndCw0LrQvtC90LXRhiwg0LTQvtCx0LDQstC70Y/QtdC8INCyINGB0L/QuNGB0L7QuiDRhtC10LvQtdC5INGDINGO0LfQtdGA0LBcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmhhc093blByb3BlcnR5KFwiYmVsdmV0X2J1ZmZfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmVsdmV0X2J1ZmZfdXNlci50YXJnZXRzX3NldC5pbmNsdWRlcyh0YXJnZXRfaWQpKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iZWx2ZXRfYnVmZl91c2VyLnRhcmdldHNfc2V0LnB1c2godGFyZ2V0X2lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGJlbHZldF9idWZmX3VzZXJfb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGJlbHZldF9idWZmX3VzZXJfb2JqZWN0LnRhcmdldHNfc2V0ID0gW107XHJcbiAgICAgICAgICAgIGJlbHZldF9idWZmX3VzZXJfb2JqZWN0LnRhcmdldHNfc2V0LnB1c2godGFyZ2V0X2lkKTtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iZWx2ZXRfYnVmZl91c2VyID0gYmVsdmV0X2J1ZmZfdXNlcl9vYmplY3Q7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGJ1ZmZlci5uYW1lICsgXCIg0YPRgdC40LvQuNCy0LDQtdGCINCw0YLQsNC60LggXCIgKyB0YXJnZXQubmFtZSArIFwiLiDQndC1INC30LDQsdGD0LTRjNGC0LUg0YHQutCw0LfQsNGC0Ywg0YHQv9Cw0YHQuNCx0L4hXCI7XHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDM0OiAvLyDRgtGA0LDQvdGB0YTQvtGA0LzQsNGG0LjRjyDQkdC10LvRjNCy0LXRglxyXG4gICAgICAgIHZhciB1c2VyID0gIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5yb2xsZWRfYnVmZnNfdGFyZ2V0cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgdmFyIHRhcmdldF9pZCA9IGRhdGEucm9sbGVkX2J1ZmZzX3RhcmdldHNbal07XHJcbiAgICAgICAgICB2YXIgcm9sbGVkX2J1ZmZzX2FycmF5ID0gZGF0YS5yb2xsZWRfYnVmZnNfb3V0Y29tZXNbal07XHJcbiAgICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgICB3aGlsZSAoaSA8IDUpIHtcclxuICAgICAgICAgICAgaWYgKHJvbGxlZF9idWZmc19hcnJheVtpXSA+IDApIHtcclxuICAgICAgICAgICAgICByb2xsZWRfYnVmZnNfYXJyYXlbaV0gLT0gMTtcclxuICAgICAgICAgICAgICBzd2l0Y2goaSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiAvL3N0cmVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgIGFwcGx5X2VmZmVjdCh1c2VyX2luZGV4LCBJTkNSRUFTRV9TVFJFTkdUSCk7XHJcbiAgICAgICAgICAgICAgICAgIGFwcGx5X2VmZmVjdCh0YXJnZXRfaWQsIERFQ1JFQVNFX1NUUkVOR1RIKTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICBhcHBseV9lZmZlY3QodXNlcl9pbmRleCwgSU5DUkVBU0VfU1RBTUlOQSk7XHJcbiAgICAgICAgICAgICAgICAgIGFwcGx5X2VmZmVjdCh0YXJnZXRfaWQsIERFQ1JFQVNFX1NUQU1JTkEpO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgIGFwcGx5X2VmZmVjdCh1c2VyX2luZGV4LCBJTkNSRUFTRV9BR0lMSVRZKTtcclxuICAgICAgICAgICAgICAgICAgYXBwbHlfZWZmZWN0KHRhcmdldF9pZCwgREVDUkVBU0VfQUdJTElUWSk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgYXBwbHlfZWZmZWN0KHVzZXJfaW5kZXgsIElOQ1JFQVNFX0lOVCk7XHJcbiAgICAgICAgICAgICAgICAgIGFwcGx5X2VmZmVjdCh0YXJnZXRfaWQsIERFQ1JFQVNFX0lOVCk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgYXBwbHlfZWZmZWN0KHVzZXJfaW5kZXgsIElOQ1JFQVNFX0tEKTtcclxuICAgICAgICAgICAgICAgICAgYXBwbHlfZWZmZWN0KHRhcmdldF9pZCwgREVDUkVBU0VfS0QpO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaSArPTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iZWx2ZXRfYnVmZl91c2VyLnRyYW5zZm9ybWVkID0ge307XHJcbiAgICAgICAgaWYgKHVzZXIuaGFzT3duUHJvcGVydHkoXCJzZWNvbmRhcnlfYXZhdGFyXCIpKSB7XHJcbiAgICAgICAgICB2YXIgdGVtcCA9IHVzZXIuYXZhdGFyO1xyXG4gICAgICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF0uYXZhdGFyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF0uc2Vjb25kYXJ5X2F2YXRhcjtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdLnNlY29uZGFyeV9hdmF0YXIgPSB0ZW1wO1xyXG4gICAgICAgICAgdmFyIGNoYXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25bdXNlcl9pbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1c2VyLmhhc093blByb3BlcnR5KFwic2Vjb25kYXJ5X2NoaWJpX2F2YXRhclwiKSkge1xyXG4gICAgICAgICAgdmFyIHRlbXAgPSB1c2VyLmNoaWJpX2F2YXRhcjtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdLmNoaWJpX2F2YXRhciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdLnNlY29uZGFyeV9jaGliaV9hdmF0YXI7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XS5zZWNvbmRhcnlfY2hpYmlfYXZhdGFyID0gdGVtcDtcclxuICAgICAgICAgIHZhciBjaGFyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW3VzZXJfaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISgoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbY2hhcl9wb3NpdGlvbl0gPT0gMSkpIHx8IChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W3VzZXJfaW5kZXhdICE9IFwiYWxsXCIgJiYgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVt1c2VyX2luZGV4XSAhPSBteV9uYW1lKSkpIHtcclxuICAgICAgICAgIHZhciB0b19jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGNoYXJfcG9zaXRpb24pO1xyXG4gICAgICAgICAgdG9fY2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUodXNlcl9pbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0L7RgtC60YDRi9Cy0LDQtdGCINGB0LLQvtGOINC40YHRgtC40L3QvdGD0Y4g0YHRg9GJ0L3QvtGB0YLRjCwg0L/QvtC70YPRh9Cw0Y8gXCIgKyBkYXRhLnRvdGFsX3VwZ3JhZGUgKyBcIiDRg9GB0LjQu9C10L3QuNC5LiDQo9C00LDRh9C90L7QuSDQvtGF0L7RgtGLIVwiO1xyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDM1OiAvLyDRhdGD0LpcclxuICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdO1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF07XHJcblxyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtPSAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaG9va191c2VyX29iamVjdCA9IHt9XHJcbiAgICAgICAgaG9va191c2VyX29iamVjdC5jb29sZG93biA9IGhvb2tfY29vbGRvd25cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmhvb2tfdXNlciA9IGhvb2tfdXNlcl9vYmplY3RcclxuXHJcbiAgICAgICAgdmFyIGhvb2tfdGFyZ2V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgaG9va190YXJnZXRfb2JqZWN0LmR1cmF0aW9uID0gaG9va19kdXJhdGlvblxyXG4gICAgICAgIGhvb2tfdGFyZ2V0X29iamVjdC5kZWZlbnNpdmVfYWR2YW50YWdlID0gaG9va19kZWZlbnNpdmVfYWR2YW50YWdlXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uaG9va190YXJnZXQgPSBob29rX3RhcmdldF9vYmplY3RcclxuXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbZGF0YS50YXJnZXRfaWRdICs9IGhvb2tfZGVmZW5zaXZlX2FkdmFudGFnZTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuaG9va19wb3NzaWJsZSkge1xyXG4gICAgICAgICAgZm9yY2VkX21vdmVtZW50KGRhdGEub2xkX3Bvc2l0aW9uLCBkYXRhLm5ld19wb3NpdGlvbiwgZGF0YS50YXJnZXRfaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDRhdGD0LrQsNC10YIgXCIgKyB0YXJnZXQubmFtZTtcclxuICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzY6IC8vIHB1bmlzaGluZ19zdHJpa2VcclxuICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtPSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC09IDFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwdW5pc2hpbmdfc3RyaWtlX3VzZXJfb2JqZWN0ID0ge31cclxuICAgICAgICBwdW5pc2hpbmdfc3RyaWtlX3VzZXJfb2JqZWN0LmNvb2xkb3duID0gcHVuaXNoaW5nX3N0cmlrZV9jb29sZG93blxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ucHVuaXNoaW5nX3N0cmlrZV91c2VyID0gcHVuaXNoaW5nX3N0cmlrZV91c2VyX29iamVjdFxyXG5cclxuICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC60LDRgNCw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC60LDRgNCw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L7QtNC90LDQutC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDRg9C00LDQu9C+0YHRjCDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GA0LjQvNC10L3Rj9C10YIg0LrQsNGA0LDRjtGJ0LjQuSDRg9C00LDRgCDQuiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjywg0L3QsNC90L7RgdGPIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GA0LjQvNC10L3Rj9C10YIg0LrQsNGA0LDRjtGJ0LjQuSDRg9C00LDRgCDQuiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIiksINC90LDQvdC+0YHRjyBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodGD0LTQvdGL0Lkg0LTQtdC90Ywg0L3QsNGB0YLRg9C/0LjQuyDQtNC70Y8gXCIgKyB0YXJnZXQubmFtZSArIFwiLiBcIiArIGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQutCw0YDQsNC10YIg0L/RgNC+0YLQuNCy0L3QuNC60LAsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINC/0L7QutCw0YDQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90L4g0YLQvtGCINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBwdW5pc2htZW50XCIpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGFsZXJ0KFwiUmVjZWl2ZWQgdW5rbm93biBza2lsbCBjb21tYW5kXCIpXHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbmV3X3JvdW5kX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IFwi0J3QsNGH0LDQu9C+INC90L7QstC+0LPQviDRgNCw0YPQvdC00LAhXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baV1cclxuICAgICAgICBpZiAoY2hhcmFjdGVyICE9PSB1bmRlZmluZWQgJiYgY2hhcmFjdGVyICE9PSBudWxsICYmIGNoYXJhY3Rlcl9zdGF0ZS5IUFtpXSAhPT0gbnVsbCAmJiBjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gPiAwKSB7XHJcbiAgICAgICAgICBtb3ZlX2FuZF9hY3Rpb25zX3JlcGxlbmlzaChjaGFyYWN0ZXIsIGkpO1xyXG4gICAgICAgICAgYXBwbHlfdGlyZWRuZXNzKGNoYXJhY3RlciwgaSk7XHJcbiAgICAgICAgICBjaGVja19kZWZhdWx0X2Nvb2xkb3ducyhpKTtcclxuICAgICAgICAgIGNoZWNrX2FsbF9yb3VuZF9lZmZlY3RzKGksIGNoYXJhY3RlciwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBhcHBseV90ZXJyYWluX2VmZmVjdHMoZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYmF0dGxlX21vZF9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID0gZGF0YS52YWx1ZVxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDApIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JHQvtC5INC+0LrQvtC90YfQtdC9ISDQndCw0YHRgtGD0L/QuNC7INC80LjRgCDQstC+INCy0YHQtdC8INC80LjRgNC1XCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0J3QsNGH0LDQu9C+INCx0L7RjyEg0JvRjtC00Lgg0YPQvNC40YDQsNGO0YIsINC10YHQu9C4INC40YUg0YPQsdC40YLRjFwiXHJcbiAgICAgIH1cclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3Jlc29sdmVfYXR0YWNrX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5hdHRhY2tfdHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gZ3Vuc2hvdF9hdWRpb1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGEuYXR0YWNrX3R5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gc3dvcmRfYXVkaW9cclxuICAgICAgfSBlbHNlIHsvLyBkZWZhdWx0IGluY2x1ZGluZyBlbmVyZ3kgYW5kIHRocm93aW5nXHJcbiAgICAgICAgdmFyIGF1ZGlvID0gc3VyaWtlbl9hdWRpb1xyXG4gICAgICB9XHJcbiAgICAgIGF1ZGlvLnBsYXkoKTtcclxuXHJcbiAgICAgIGlmIChkYXRhLnVzZXJfaW52aXNpYmlsaXR5X2VuZGVkID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuYXR0YWNrZXJfaWRdID0gXCJhbGxcIlxyXG4gICAgICAgIHZhciBhdHRhY2tlcl9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEuYXR0YWNrZXJfcG9zaXRpb24pO1xyXG4gICAgICAgIGF0dGFja2VyX2NlbGwuc3JjID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5hdHRhY2tlcl9pZF0uYXZhdGFyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmF0dGFja2VyX2lkXVxyXG4gICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbZGF0YS5hdHRhY2tlcl9pZF0gPSAxXHJcblxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmF0dGFja2VyX2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuYXR0YWNrZXJfaWRdIC0gc3RhbWluYV9hdHRhY2tfY29zdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmF0dGFja2VyX2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmF0dGFja2VyX2lkXSAtIDFcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJhaW1fb3ZlclwiKSkge1xyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuYXR0YWNrZXJfaWRdLmFpbVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShcInF1aWNrX2F0dGFja19yZWFkeVwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5hdHRhY2tlcl9pZF0ucXVpY2tfYXR0YWNrX3JlYWR5ID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJtb3ZlX3JlZHVjdGlvblwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdIC0gZGF0YS5tb3ZlX3JlZHVjdGlvbjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuY292ZXJfbGV2ZWwgPiAwKSB7XHJcbiAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwi0KPRgNC+0LLQtdC90Ywg0YPQutGA0YvRgtC40Y86IFwiICsgZGF0YS5jb3Zlcl9sZXZlbFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcIlwiXHJcbiAgICAgIH1cclxuICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L7QtNC90LDQutC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDRg9C00LDQu9C+0YHRjCDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQsNGC0LDQutC+0LLQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90L4g0YLQvtGCINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2F0dGFja19vYnN0YWNsZV9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuYXR0YWNrX3R5cGUgPT0gXCJyYW5nZWRcIikge1xyXG4gICAgICAgIHZhciBhdWRpbyA9IGd1bnNob3RfYXVkaW9cclxuICAgICAgfSBlbHNlIGlmIChkYXRhLmF0dGFja190eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgICAgIHZhciBhdWRpbyA9IHN3b3JkX2F1ZGlvXHJcbiAgICAgIH0gZWxzZSB7Ly8gZGVmYXVsdCBpbmNsdWRpbmcgZW5lcmd5IGFuZCB0aHJvd2luZ1xyXG4gICAgICAgIHZhciBhdWRpbyA9IHN1cmlrZW5fYXVkaW9cclxuICAgICAgfVxyXG4gICAgICBhdWRpby5wbGF5KCk7XHJcblxyXG4gICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmF0dGFja2VyX2lkXVxyXG4gICAgICB2YXIgdGFyZ2V0ID0gb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuXHJcbiAgICAgIGlmIChkYXRhLnVzZXJfaW52aXNpYmlsaXR5X2VuZGVkID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuYXR0YWNrZXJfaWRdID0gXCJhbGxcIlxyXG4gICAgICAgIHZhciBhdHRhY2tlcl9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEuYXR0YWNrZXJfcG9zaXRpb24pO1xyXG4gICAgICAgIGF0dGFja2VyX2NlbGwuc3JjID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5hdHRhY2tlcl9pZF0uYXZhdGFyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuYXR0YWNrZXJfaWRdID0gMVxyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmF0dGFja2VyX2lkXSAtIHN0YW1pbmFfYXR0YWNrX2Nvc3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gLSAxXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiYWltX292ZXJcIikpIHtcclxuICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmF0dGFja2VyX2lkXS5haW1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJxdWlja19hdHRhY2tfcmVhZHlcIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuYXR0YWNrZXJfaWRdLnF1aWNrX2F0dGFja19yZWFkeSA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLmNvdmVyX2xldmVsID4gMCkge1xyXG4gICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcItCj0YDQvtCy0LXQvdGMINGD0LrRgNGL0YLQuNGPOiBcIiArIGRhdGEuY292ZXJfbGV2ZWxcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCJcIlxyXG4gICAgICB9XHJcblxyXG4gICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDRgNCw0LfRgNGD0YjQuNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90L4g0LDRgtCw0LrQsCDQvdC1INC/0YDQvtGI0LvQsCDRh9C10YDQtdC3INC/0L7Qu9C90L7QtSDRg9C60YDRi9GC0LjQtS5cIiArIGNvdmVyX3N0cmluZztcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJ1bnRvdWNoZWRcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINGA0LDQt9GA0YPRiNC40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QviDQsNGC0LDQutC1INC90LUg0YXQstCw0YLQuNC70L4g0YPRgNC+0L3QsCAoXCIgKyBkYXRhLmRhbWFnZSArIFwiINC90LDQvdC10YHQtdC90L4pLiBcIiArIGNvdmVyX3N0cmluZztcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkZXN0cm95ZWRcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGA0LDQt9GA0YPRiNCw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QsNC90L7RgdGPIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZztcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZGF0YS50YXJnZXRfcG9zaXRpb25dID0gMDtcclxuICAgICAgICAgIGdhbWVfc3RhdGUub2JzdGFjbGVfZXh0cmFfaW5mb1tkYXRhLnRhcmdldF9wb3NpdGlvbl0gPSBudWxsO1xyXG4gICAgICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZGF0YS50YXJnZXRfcG9zaXRpb25dID09IDEpKSkge1xyXG4gICAgICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBkYXRhLnRhcmdldF9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYXBwbHlfZWZmZWN0X3Jlc3BvbnNlJykge1xyXG4gICAgICBhcHBseV9lZmZlY3QoZGF0YS5jaGFyYWN0ZXJfbnVtYmVyLCBkYXRhLmVmZmVjdF9udW1iZXIpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NlYXJjaF9hY3Rpb25fcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgICAgICBwdXNoVG9MaXN0KGRhdGEuY2hhcmFjdGVyX25hbWUgKyAnINCx0YDQvtGB0LjQuyAnICsgZGF0YS5yb2xsICsgJyDQvdCwINCy0L3QuNC80LDRgtC10LvRjNC90L7RgdGC0Ywg0LIg0LfQvtC90LUgJyArIGRhdGEuem9uZV9udW1iZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLm1pbmVzX2RldGVjdGVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IGRhdGEuY2hhcmFjdGVyX25hbWUgKyBcIiDQvtCx0L3QsNGA0YPQttC40LLQsNC10YIgXCIgKyBkYXRhLm1pbmVzX2RldGVjdGVkLmxlbmd0aCArIFwiINC80LjQvSDRgNGP0LTQvtC8INGBINGB0L7QsdC+0LlcIlxyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubWluZXNfZGV0ZWN0ZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHZhciBtaW5lID0gZGF0YS5taW5lc19kZXRlY3RlZFtpXVxyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1ttaW5lXS5wdXNoKGRhdGEucGxheWVyX25hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbnZhciBzaG93X2JvYXJkX2NyZWF0aW9uX2dyb3VwX2J1dHRvbiA9ICQoU0hPV19CT0FSRF9DUkVBVElPTl9HUk9VUF9CVVRUT05fU0VMRUNUT1IpO1xyXG5zaG93X2JvYXJkX2NyZWF0aW9uX2dyb3VwX2J1dHRvbi5vbignY2xpY2snLCBzaG93Qm9hcmRDcmVhdGlvbkdyb3VwKTtcclxuXHJcbnZhciBzaG93X2JvYXJkX2VkaXRfZ3JvdXBfYnV0dG9uID0gJChTSE9XX0JPQVJEX0VESVRfR1JPVVBfQlVUVE9OX1NFTEVDVE9SKTtcclxuc2hvd19ib2FyZF9lZGl0X2dyb3VwX2J1dHRvbi5vbignY2xpY2snLCBzaG93Qm9hcmRFZGl0R3JvdXApO1xyXG5cclxudmFyIHNob3dfYmF0dGxlX2NvbnRyb2xfZ3JvdXBfYnV0dG9uID0gJChTSE9XX0JBVFRMRV9DT05UUk9MX0dST1VQX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnNob3dfYmF0dGxlX2NvbnRyb2xfZ3JvdXBfYnV0dG9uLm9uKCdjbGljaycsIHNob3dCYXR0bGVDb250cm9sR3JvdXApO1xyXG5cclxudmFyIGNyZWF0ZV9ib2FyZF9idXR0b24gPSAkKENSRUFURV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5jcmVhdGVfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGNyZWF0ZUJvYXJkKTtcclxuXHJcbnZhciBzYXZlX2JvYXJkX2J1dHRvbiA9ICQoU0FWRV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBzYXZlQm9hcmQpO1xyXG5cclxudmFyIGxvYWRfYm9hcmRfYnV0dG9uID0gJChMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxvYWRfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGxvYWRCb2FyZCk7XHJcblxyXG52YXIgZG93bmxvYWRfYm9hcmRfYnV0dG9uID0gJChET1dOTE9BRF9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5kb3dubG9hZF9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgZG93bmxvYWRCb2FyZCk7XHJcblxyXG52YXIgcm9sbF9pbml0aWF0aXZlX2J1dHRvbiA9ICQoUk9MTF9JTklUSUFUSVZFX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnJvbGxfaW5pdGlhdGl2ZV9idXR0b24ub24oJ2NsaWNrJywgcm9sbEluaXRpYXRpdmUpO1xyXG5cclxudmFyIHJlc2V0X2luaXRpYXRpdmVfYnV0dG9uID0gJChSRVNFVF9JTklUSUFUSVZFX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnJlc2V0X2luaXRpYXRpdmVfYnV0dG9uLm9uKCdjbGljaycsIHJlc2V0SW5pdGlhdGl2ZSk7XHJcblxyXG52YXIgZm9nX2J1dHRvbiA9ICQoRk9HX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmZvZ19idXR0b24ub24oJ2NsaWNrJywgZm9nTW9kZUNoYW5nZSk7XHJcblxyXG52YXIgem9uZV9idXR0b24gPSAkKFpPTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxuem9uZV9idXR0b24ub24oJ2NsaWNrJywgem9uZU1vZGVDaGFuZ2UpO1xyXG5cclxudmFyIGNoYXRfYnV0dG9uID0gJChDSEFUX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmNoYXRfYnV0dG9uLm9uKCdjbGljaycsIGNoYW5nZUNoYXRWaXNpYmlsaXR5KTtcclxuXHJcbnZhciBtaXJyb3JfYnV0dG9uID0gJChNSVJST1JfQlVUVE9OX1NFTEVDVE9SKTtcclxubWlycm9yX2J1dHRvbi5vbignY2xpY2snLCBtaXJyb3JfYm9hcmQpO1xyXG5cclxudmFyIG5leHRfcm91bmRfYnV0dG9uID0gJChORVhUX1JPVU5EX0JVVFRPTl9TRUxFQ1RPUik7XHJcbm5leHRfcm91bmRfYnV0dG9uLm9uKCdjbGljaycsIHN0YXJ0X25ld19yb3VuZCk7XHJcblxyXG52YXIgYmF0dGxlX21vZF9idXR0b24gPSAkKEJBVFRMRV9NT0RfQlVUVE9OX1NFTEVDVE9SKTtcclxuYmF0dGxlX21vZF9idXR0b24ub24oJ2NsaWNrJywgY2hhbmdlX2JhdHRsZV9tb2QpO1xyXG5cclxudmFyIHN5bmNfYnV0dG9uID0gJChTWU5DX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnN5bmNfYnV0dG9uLm9uKCdjbGljaycsIHN5bmNfYm9hcmQpO1xyXG5cclxudmFyIGxhbmRtaW5lX2J1dHRvbiA9ICQoTEFORE1JTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxubGFuZG1pbmVfYnV0dG9uLm9uKCdjbGljaycsIHNob3dfbGFuZG1pbmVzKTtcclxuXHJcbnZhciBmb2dfem9uZV9idXR0b24gPSAkKEZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmZvZ196b25lX2J1dHRvbi5vbignY2xpY2snLCBmb2dDdXJyZW50Wm9uZSk7XHJcblxyXG52YXIgdW5mb2dfem9uZV9idXR0b24gPSAkKFVORk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxudW5mb2dfem9uZV9idXR0b24ub24oJ2NsaWNrJywgdW5mb2dDdXJyZW50Wm9uZSk7XHJcblxyXG52YXIgem9uZV9udW1iZXJfc2VsZWN0ID0gJChaT05FX05VTUJFUl9TRUxFQ1RPUik7XHJcbmZvciAobGV0IGkgPSAxOyBpIDwgTUFYX1pPTkVTOyBpKyspIHtcclxuICB2YXIgY3VycmVudF9vcHRpb24gPSAkKFwiPG9wdGlvbj5cIik7XHJcbiAgY3VycmVudF9vcHRpb24udGV4dCgn0JfQvtC90LAgJyArIGkpO1xyXG4gIGN1cnJlbnRfb3B0aW9uLnZhbChpKTtcclxuICB6b25lX251bWJlcl9zZWxlY3QuYXBwZW5kKGN1cnJlbnRfb3B0aW9uKTtcclxufVxyXG5cclxudmFyIHNhdmVzX3NlbGVjdCA9ICQoU0FWRVNfU0VMRUNUX1NFTEVDVE9SKTtcclxuXHJcbnZhciBzZWFyY2hfbW9kaWZpY2F0b3IgPSAkKFNFQVJDSF9NT0RJRklDQVRPUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgbm90aWZpY2F0aW9uc19saXN0ID0gJChOT1RJRklDQVRJT05TX0xJU1RfU0VMRUNUT1IpO1xyXG5mb3IgKGxldCBpID0gMDsgaSA8IENIQVRfQ0FTSDsgaSsrKSB7XHJcbiAgdmFyIGN1cnJlbnRfZWxlbWVudCA9ICQoXCI8bGk+XCIpO1xyXG4gIGN1cnJlbnRfZWxlbWVudC5hdHRyKCdkYXRhLW5hbWUnLCAnbm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIGkpO1xyXG4gIGN1cnJlbnRfZWxlbWVudC5hdHRyKCdjbGFzcycsICdub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudCcpO1xyXG4gIG5vdGlmaWNhdGlvbnNfbGlzdC5hcHBlbmQoY3VycmVudF9lbGVtZW50KTtcclxufVxyXG5cclxudmFyIGJvYXJkX3NpemVfaW5wdXQgPSAkKEJPQVJEX1NJWkVfSU5QVVRfU0VMRUNUT1IpO1xyXG5cclxudmFyIHNhdmVfbmFtZV9pbnB1dCA9ICQoU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SKTtcclxuXHJcbnZhciBub3RpZmljYXRpb25zX2NvbnRhaW5lciA9ICQoTk9USUZJQ0FUSU9OU19DT05UQU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyID0gJChDSEFSQUNURVJfSU5GT19DT05UQU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgd2VhcG9uX2luZm9fY29udGFpbmVyID0gJChXRUFQT05fSU5GT19DT05UQU5FUl9TRUxFQ1RPUik7XHJcbndlYXBvbl9pbmZvX2NvbnRhaW5lci5oaWRlKCk7XHJcblxyXG52YXIgaW5pdGlhdGl2ZV9vcmRlcl9jb250YWluZXIgPSAkKElOSVRJQVRJVkVfT1JERVJfQ09OVEFORVJfU0VMRUNUT1IpO1xyXG5cclxudmFyIGluaXRpYXRpdmVfZHJvcGJveF9jb250YWluZXIgPSAkKElOSVRJQVRJVkVfRFJPUEJPWF9DT05UQUlORVJfU0VMRUNUT1IpO1xyXG5cclxudmFyIHNraWxsX21vZGFsID0gJChTS0lMTF9NT0RBTF9TRUxFQ1RPUik7XHJcblxyXG52YXIgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyID0gJChTS0lMTF9ERVNDUklQVElPTl9DT05UQUlORVJfU0VMRUNUT1IpO1xyXG5cclxudmFyIHNraWxsX21vZGFsX2NvbnRlbnQgPSAkKFNLSUxMX01PREFMX0NPTlRFTlRfU0VMRUNUT1IpO1xyXG5cclxudmFyIG5leHRfcGFnZV9idXR0b25fY29udGFpbmVyID0gJChORVhUX1BBR0VfQlVUVE9OX0NPTlRBSU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgc3BhbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGwtbW9kYWwtY2xvc2VcIik7XHJcblxyXG5zcGFuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBoaWRlX21vZGFsKCk7XHJcbn1cclxuXHJcbnNwYW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbndpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICBpZiAoZXZlbnQudGFyZ2V0LmlkID09IHNraWxsX21vZGFsLmF0dHIoJ2lkJykpIHtcclxuICAgIGhpZGVfbW9kYWwoKTtcclxuICB9XHJcbn1cclxuXHJcbmRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZTtcclxuICAgIC8vIHdcclxuICAgIGlmKGtleUNvZGUgPT0gODcpIHtcclxuICAgICAgICB3X29uY2xpY2soKVxyXG4gICAgfSBlbHNlIGlmIChrZXlDb2RlID09IDY1KSB7IC8vIGFcclxuICAgICAgYV9vbmNsaWNrKClcclxuICAgIH1cclxufTtcclxuXHJcbnNldEludGVydmFsKHJlY29ubmVjdCwgMTUqMTAwMClcclxuIiwibGV0IHNvY2tldDtcclxubGV0IHNlcnZlcl9hZGRyZXNzO1xyXG5sZXQgb25NZXNzYWdlRnVuY3Rpb247XHJcblxyXG5mdW5jdGlvbiBpbml0KHVybCkge1xyXG4gIHNlcnZlcl9hZGRyZXNzID0gdXJsO1xyXG4gIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUmVhZHkoKSB7XHJcbiAgcmV0dXJuIHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTlxyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnb3BlbicpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBvbk1lc3NhZ2VGdW5jdGlvbiA9IGhhbmRsZXJGdW5jdGlvbjtcclxuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKGRhdGEpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0KCkge1xyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICBvbk1lc3NhZ2VGdW5jdGlvbihkYXRhKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShwYXlsb2FkKSB7XHJcbiAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbml0KHNlcnZlcl9hZGRyZXNzKTtcclxuICAgIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIob25NZXNzYWdlRnVuY3Rpb24pO1xyXG4gICAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnTm90IHNlbmQsIGJ1dCByZWNvbm5lY3RlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgcmVnaXN0ZXJPcGVuSGFuZGxlcixcclxuICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyLFxyXG4gIHNlbmRNZXNzYWdlLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0LFxyXG4gIGlzUmVhZHlcclxufVxyXG4iXX0=
