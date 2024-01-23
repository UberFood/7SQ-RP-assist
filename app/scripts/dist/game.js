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
          for (var _i4 = 0; _i4 < extended_nbh.length; _i4++) {
            if (game_state.board_state[extended_nbh[_i4]] > 0 && game_state.board_state[extended_nbh[_i4]] != chosen_character_index) {
              // there are characters there
              var current_char_num = game_state.board_state[extended_nbh[_i4]];
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
      for (var _i5 = 0; _i5 < immediate_nbh.length; _i5++) {
        if (game_state.board_state[immediate_nbh[_i5]] > 0 && game_state.board_state[immediate_nbh[_i5]] != chosen_character_index) {
          // there are characters there
          if (character_state.invisibility[game_state.board_state[immediate_nbh[_i5]]] != "all") {
            toSend.invisibility_ended_id.push(game_state.board_state[immediate_nbh[_i5]]);
          }
        }

        if (game_state.landmines.positions.includes(immediate_nbh[_i5]) && immediate_nbh[_i5] != to_index) {
          toSend.mines_exploded.push(immediate_nbh[_i5]);
          toSend.mines_damage = toSend.mines_damage + roll_x(mines_1_distance_damage);
        }
      }

      var one_and_half_nbh = index_in_radius(to_index, 1.6);
      for (var _i6 = 0; _i6 < one_and_half_nbh.length; _i6++) {
        if (game_state.landmines.positions.includes(one_and_half_nbh[_i6]) && !immediate_nbh.includes(one_and_half_nbh[_i6])) {
          toSend.mines_exploded.push(one_and_half_nbh[_i6]);
          toSend.mines_damage = toSend.mines_damage + roll_x(mines_1p5_distance_damage);
        }
      }

      var extended_nbh = index_in_radius(to_index, invisibility_detection_radius);
      for (var _i7 = 0; _i7 < extended_nbh.length; _i7++) {
        if (game_state.board_state[extended_nbh[_i7]] > 0 && game_state.board_state[extended_nbh[_i7]] != chosen_character_index && !immediate_nbh.includes(extended_nbh[_i7])) {
          // there are characters there
          var current_char_num = game_state.board_state[extended_nbh[_i7]];
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
            for (var _i8 = 0; _i8 < weapon.damage[0]; _i8++) {
              damage = damage + roll_x(weapon.damage[1]);
            }
            damage = weapon_damage_bonus(damage, weapon, character_number);
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
          apply_bomb(position, radius);
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
  check_cooldown(i, "cut_limb_user", "");
  check_cooldown(i, "adrenaline_user", "");
  check_cooldown(i, "poisonous_adrenaline_user", "");
  check_cooldown(i, "hook_user", "");
  check_cooldown(i, "punishing_strike_user", "");
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

      for (var _i11 = 0; _i11 < saves_list.length; _i11++) {
        var current_option = $("<option>");
        current_option.text(saves_list[_i11]);
        current_option.val(saves_list[_i11]);
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

        for (var _i12 = 0; _i12 < data.invisibility_ended_id.length; _i12++) {
          var id = data.invisibility_ended_id[_i12];
          character_state.invisibility[id] = "all";

          var position = character_state.position[id];
          var to_cell = document.getElementById('cell_' + position);
          var avatar = get_object_picture(id);
          to_cell.src = avatar;
        }

        var character = character_detailed_info[data.character_number];

        if (!character.hasOwnProperty("landmine_immune")) {
          for (var _i13 = 0; _i13 < data.mines_exploded.length; _i13++) {
            var mine_position = data.mines_exploded[_i13];
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

      for (var _i14 = 0; _i14 < index_list.length; _i14++) {
        var _index = index_list[_i14];
        var cell = document.getElementById('cell_' + _index);
        game_state.fog_state[_index] = fog_state;
        cell.src = fogOrPic(_index);
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

      for (var _i18 = 1; _i18 < character_state.can_evade.length; _i18++) {
        character = character_detailed_info[_i18];
        if (character !== undefined && character !== null && character_state.HP[_i18] !== null && character_state.HP[_i18] > 0) {
          move_and_actions_replenish(character, _i18);
          apply_tiredness(character, _i18);
          check_default_cooldowns(_i18);

          safety_service_target_round_effect(_i18);
          belvet_buff_target_round_effect(_i18);
          hook_target_round_effect(_i18);
          calingalator_target_round_effect(_i18);
          pich_pich_user_round_effect(_i18);
          pich_pich_target_round_effect(_i18);
          aim_round_effect(_i18);
          adrenaline_target_round_effect(_i18);
          poisonous_adrenaline_target_round_effect(_i18);

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
            var save_roll = data.save_roll_list[_i18];
            if (save_roll >= character_state.special_effects[_i18].gas_bomb_poison.threshold) {
              character_state.special_effects[_i18].gas_bomb_poison.poison_level = character_state.special_effects[_i18].gas_bomb_poison.poison_level - 1;
              var message = character.name + " успешно кидает спасбросок и уменьшает стадию отравления (теперь " + character_state.special_effects[_i18].gas_bomb_poison.poison_level + ")";
              pushToList(message);
            } else {
              var message = character.name + " проваливает спасбросок. Стадия отравления остается прежней (" + character_state.special_effects[_i18].gas_bomb_poison.poison_level + ")";
              pushToList(message);
            }

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
        for (var _i19 = 0; _i19 < data.mines_detected.length; _i19++) {
          var mine = data.mines_detected[_i19];
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
for (var _i20 = 0; _i20 < CHAT_CASH; _i20++) {
  var current_element = $("<li>");
  current_element.attr('data-name', 'notifications_list_element_' + _i20);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksbUNBQW1DLHdDQUF2QztBQUNBLElBQUksZ0NBQWdDLHFDQUFwQztBQUNBLElBQUksa0NBQWtDLHVDQUF0QztBQUNBLElBQUkscUNBQXFDLGtEQUF6QztBQUNBLElBQUksd0NBQXdDLGtEQUE1Qzs7QUFFQSxJQUFJLDRDQUE0QyxnREFBaEQ7QUFDQSxJQUFJLHdDQUF3Qyw0Q0FBNUM7QUFDQSxJQUFJLDRDQUE0QyxnREFBaEQ7QUFDQSxJQUFJLCtCQUErQixtQ0FBbkM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLGtDQUFrQyxzQ0FBdEM7QUFDQSxJQUFJLG1DQUFtQyx1Q0FBdkM7QUFDQSxJQUFJLHNCQUFzQiwwQkFBMUI7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHlCQUF5Qiw2QkFBN0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLGlDQUFpQyxxQ0FBckM7O0FBRUEsSUFBSSx3QkFBd0IsNEJBQTVCOztBQUVBLElBQUksdUJBQXVCLGtDQUEzQjtBQUNBLElBQUksOEJBQThCLGtDQUFsQzs7QUFFQSxJQUFJLDRCQUE0QixnQ0FBaEM7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7O0FBRUEsSUFBSSw4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LGVBQXBCO0FBQ0EsU0FBTyxTQUFQLEdBQW1CLFVBQUMsQ0FBRCxFQUFPO0FBQ3hCLFFBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxFQUFFLElBQWIsQ0FBWDtBQUNBLG9CQUFnQixJQUFoQjtBQUNELEdBSEQ7QUFJRDs7QUFFRCxTQUFTLDZCQUFULEdBQXlDO0FBQ3ZDLFNBQU8sU0FBUCxHQUFtQixVQUFDLENBQUQsRUFBTztBQUN4QixRQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsRUFBRSxJQUFiLENBQVg7QUFDQSxzQkFBa0IsSUFBbEI7QUFDRCxHQUhEO0FBSUQ7O0FBRUQsU0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQThCO0FBQzVCLE1BQUksT0FBTyxVQUFQLEtBQXNCLFVBQVUsSUFBcEMsRUFBMEM7QUFDeEMsV0FBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsT0FBZixDQUFaO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsU0FBSyxjQUFMO0FBQ0EsMkJBQXVCLGlCQUF2QjtBQUNBLFFBQUksT0FBTyxVQUFQLEtBQXNCLFVBQVUsSUFBcEMsRUFBMEM7QUFDeEMsYUFBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsT0FBZixDQUFaO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsY0FBUSxHQUFSLENBQVksMkJBQVo7QUFDRDtBQUNGO0FBQ0Y7O2tCQUVjO0FBQ2IsWUFEYTtBQUViLDBDQUZhO0FBR2IsZ0RBSGE7QUFJYiwwQkFKYTtBQUtiLDhEQUxhO0FBTWI7QUFOYSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHNvY2tldCBmcm9tICcuL3dzLWNsaWVudCc7XHJcblxyXG52YXIgJCA9IHdpbmRvdy5qUXVlcnk7XHJcblxyXG52YXIgQ0hBUkFDVEVSX0lORk9fQ09OVEFORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiXSc7XHJcbnZhciBXRUFQT05fSU5GT19DT05UQU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwid2VhcG9uLWluZm8tY29udGFpbmVyXCJdJztcclxudmFyIE5PVElGSUNBVElPTlNfQ09OVEFORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnMtY29udGFpbmVyXCJdJztcclxudmFyIElOSVRJQVRJVkVfT1JERVJfQ09OVEFORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImluaXRpYXRpdmUtb3JkZXItZGlzcGxheS1jb250YWluZXJcIl0nO1xyXG52YXIgSU5JVElBVElWRV9EUk9QQk9YX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiaW5pdGlhdGl2ZS1vcmRlci1kcm9wYm94LWNvbnRhaW5lclwiXSc7XHJcblxyXG52YXIgU0hPV19CT0FSRF9DUkVBVElPTl9HUk9VUF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNob3dfYm9hcmRfY3JlYXRpb25fZ3JvdXBfYnV0dG9uXCJdJztcclxudmFyIFNIT1dfQk9BUkRfRURJVF9HUk9VUF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNob3dfYm9hcmRfZWRpdF9ncm91cF9idXR0b25cIl0nO1xyXG52YXIgU0hPV19CQVRUTEVfQ09OVFJPTF9HUk9VUF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNob3dfYmF0dGxlX2NvbnRyb2xfZ3JvdXBfYnV0dG9uXCJdJztcclxudmFyIENSRUFURV9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImNyZWF0ZV9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgU0FWRV9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNhdmVfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIExPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJsb2FkX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBST0xMX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJyb2xsX2luaXRpYXRpdmVfYnV0dG9uXCJdJztcclxudmFyIFJFU0VUX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJyZXNldF9pbml0aWF0aXZlX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJmb2dfYnV0dG9uXCJdJztcclxudmFyIFpPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX2J1dHRvblwiXSc7XHJcbnZhciBDSEFUX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY2hhdF9idXR0b25cIl0nO1xyXG52YXIgTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibWlycm9yX2J1dHRvblwiXSc7XHJcbnZhciBORVhUX1JPVU5EX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibmV4dF9yb3VuZF9idXR0b25cIl0nO1xyXG52YXIgQkFUVExFX01PRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJhdHRsZV9tb2RfYnV0dG9uXCJdJztcclxudmFyIFNZTkNfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzeW5jX2J1dHRvblwiXSc7XHJcbnZhciBMQU5ETUlORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImxhbmRtaW5lX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImZvZ196b25lX2J1dHRvblwiXSc7XHJcbnZhciBVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwidW5mb2dfem9uZV9idXR0b25cIl0nO1xyXG52YXIgRE9XTkxPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJkb3dubG9hZF9ib2FyZF9idXR0b25cIl0nO1xyXG5cclxudmFyIFNBVkVTX1NFTEVDVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2F2ZXNfc2VsZWN0XCJdJztcclxuXHJcbnZhciBaT05FX05VTUJFUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiem9uZV9udW1iZXJfc2VsZWN0XCJdJztcclxudmFyIFNFQVJDSF9NT0RJRklDQVRPUl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2VhcmNoX21vZGlmaWNhdG9yXCJdJztcclxuXHJcbnZhciBCT0FSRF9TSVpFX0lOUFVUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJib2FyZF9zaXplX2lucHV0XCJdJztcclxudmFyIFNBVkVfTkFNRV9JTlBVVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwic2F2ZV9uYW1lX2lucHV0XCJdJztcclxuXHJcbnZhciBOT1RJRklDQVRJT05TX0xJU1RfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdFwiXSc7XHJcblxyXG52YXIgU0tJTExfTU9EQUxfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNraWxsLW1vZGFsXCJdJztcclxudmFyIFNLSUxMX01PREFMX0NPTlRFTlRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNraWxsLW1vZGFsLWNvbnRlbnRcIl0nO1xyXG52YXIgU0tJTExfREVTQ1JJUFRJT05fQ09OVEFJTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJza2lsbC1kZXNjcmlwdGlvbi1jb250YWluZXJcIl0nO1xyXG52YXIgTkVYVF9QQUdFX0JVVFRPTl9DT05UQUlORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm5leHQtcGFnZS1idXR0b24tY29udGFpbmVyXCJdJztcclxuXHJcbnZhciBCT0FSRF9DUkVBVElPTl9HUk9VUF9TRUxFQ1RPUiA9ICdbZGF0YS1ncm91cC1uYW1lPVwiYm9hcmRfY3JlYXRpb25fZ3JvdXBcIl0nO1xyXG52YXIgQk9BUkRfRURJVF9HUk9VUF9TRUxFQ1RPUiA9ICdbZGF0YS1ncm91cC1uYW1lPVwiYm9hcmRfZWRpdF9ncm91cFwiXSc7XHJcbnZhciBCQVRUTEVfQ09OVFJPTF9HUk9VUF9TRUxFQ1RPUiA9ICdbZGF0YS1ncm91cC1uYW1lPVwiYmF0dGxlX2NvbnRyb2xfZ3JvdXBcIl0nO1xyXG5cclxudmFyIFNFUlZFUl9BRERSRVNTID0gbG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoL15odHRwLywgJ3dzJyk7XHJcblxyXG52YXIgbXlfbmFtZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKSk7XHJcbnZhciBteV9yb2xlID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3JvbGUnKSk7XHJcbnZhciBteV9yb29tID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdyb29tX251bWJlcicpKTtcclxuXHJcbnZhciBjaGFyYWN0ZXJfbGlzdCA9IFtdO1xyXG52YXIgZ3JvdXBfbGlzdCA9IFtdO1xyXG52YXIgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIG9ic3RhY2xlX2xpc3QgPSBbXTtcclxudmFyIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIHdlYXBvbl9saXN0ID0gW107XHJcbnZhciB3ZWFwb25fZGV0YWlsZWRfaW5mbyA9IFtdO1xyXG52YXIgc2tpbGxfbGlzdCA9IFtdO1xyXG52YXIgc2tpbGxfZGV0YWlsZWRfaW5mbztcclxudmFyIHNhdmVzX2xpc3QgPSBbXTtcclxuXHJcbnZhciBpbml0aWF0aXZlX29yZGVyX2FycmF5ID0gW107XHJcblxyXG52YXIgVElOWV9FRkZFQ1RfQ0xBU1MgPSAnaXMtdGlueSc7XHJcblxyXG52YXIgRU1QVFlfQ0VMTF9QSUMgPSBcIi4vaW1hZ2VzL3NxdWFyZS5qcGdcIjtcclxudmFyIFpPTkVfRU5EUE9JTlRfUElDID0gXCIuL2ltYWdlcy9yZWRfY3Jvc3MuanBnXCJcclxudmFyIEZPR19JTUFHRSA9IFwiLi9pbWFnZXMvZm9nLndlYnBcIjtcclxudmFyIFFVRVNUSU9OX0lNQUdFID0gXCIuL2ltYWdlcy9xdWVzdGlvbi5qcGdcIjtcclxudmFyIElOVklTRV9JTUFHRSA9IFwiLi9pbWFnZXMvem9ycm9fbWFzay5qcGVnXCI7XHJcbnZhciBBSU1fSU1BR0UgPSBcIi4vaW1hZ2VzL2FpbS5qcGdcIjtcclxudmFyIFJJR0hUX0FSUk9XX0lNQUdFID0gXCIuL2ltYWdlcy9yaWdodF9hcnJvdy5wbmdcIjtcclxudmFyIEFSTU9SX0lNQUdFID0gXCIuL2ltYWdlcy9hcm1vci5qcGdcIjtcclxudmFyIFNQSVJJVF9JTUFHRSA9IFwiLi9pbWFnZXMvY2hha3JhLmpwZ1wiO1xyXG52YXIgRFJPUEJPWF9JTUFHRSA9IFwiLi9pbWFnZXMvYmFza2V0LmpwZ1wiO1xyXG5cclxudmFyIE1BWF9aT05FUyA9IDUwO1xyXG52YXIgQ0hBVF9DQVNIID0gMTAwO1xyXG5cclxudmFyIHN0YW1pbmFfd2Vha3Nwb3RfY29zdCA9IDFcclxudmFyIHN0YW1pbmFfbW92ZV9jb3N0ID0gMFxyXG52YXIgc3RhbWluYV9hdHRhY2tfY29zdCA9IDFcclxudmFyIHB1bmNoX3JhaW5mYWxsX3N0YW1pbmFfY29zdCA9IDIgLy8gcGVyIHB1bmNoXHJcbnZhciBzdGFtaW5hX2N1dF9saW1iX2Nvc3QgPSA0XHJcbnZhciBzaGllbGRfdXBfc3RhbWluYV9jb3N0ID0gMiAvLyBwZXIgbW92ZSBJIHRoaW5rXHJcbnZhciBsb3R0ZXJ5X3Nob3Rfc3RhbWluYV9jb3N0ID0gMVxyXG52YXIgbHVja3lfc2hvdF9zdGFtaW5hX2Nvc3QgPSAxXHJcbnZhciBhY3Rpb25fc3BsYXNoX3N0YW1pbmFfY29zdCA9IDJcclxudmFyIGFkcmVuYWxpbmVfc3RhbWluYV9jb3N0ID0gM1xyXG52YXIgYWNpZF9ib21iX3N0YW1pbmFfY29zdCA9IDNcclxudmFyIGN1cnZlZF9idWxsZXRzX3N0YW1pbmFfY29zdCA9IDJcclxuXHJcbnZhciBjdXRfbGltYl9jb29sZG93biA9IDFcclxuXHJcbnZhciByZXN0X3N0YW1pbmFfZ2FpbiA9IDVcclxuXHJcbnZhciBjdXRfbGltYl9kdXJhdGlvbiA9IDFcclxudmFyIGNvb2xkb3duX2JpZ19icm8gPSAxIC8vIGR1cmF0aW9uXHJcblxyXG52YXIgc2hpZWxkX3VwX0tEID0gM1xyXG5cclxudmFyIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZSA9IDRcclxudmFyIGNoYXJnZV9tb3ZlX2luY3JlYXNlID0gNFxyXG5cclxudmFyIGdhc19ib21iX3RocmVzaG9sZCA9IDExXHJcbnZhciBnYXNfYm9tYl9tb3ZlX3JlZHVjdGlvbiA9IDJcclxudmFyIGdhc19ib21iX3N0YW1pbmFfY29zdCA9IDNcclxudmFyIGdhc19ib21iX29ic3RhY2xlID0gMTVcclxudmFyIGdhc19ib21iX3NraWxsX2Nvb2xkb3duID0gNVxyXG5cclxudmFyIGxpZ2h0X3NvdW5kX2JvbWJfcmFkaXVzID0gNFxyXG52YXIgbGlnaHRfc291bmRfYm9tYl90aHJlc2hvbGQgPSAxNVxyXG52YXIgbGlnaHRfc291bmRfYm9tYl9za2lsbF9jb29sZG93biA9IDVcclxuXHJcbnZhciB3ZWFrX3Nwb3RfdGhyZXNob2xkID0gMTVcclxuXHJcbnZhciBzaG9ja2VkX2Nvb2xkb3duID0gMFxyXG5cclxudmFyIHBpY2hfcGljaF9jb29sZG93biA9IDRcclxudmFyIHBpY2hfcGljaF9tb3ZlX2luY3JlYXNlID0gNFxyXG5cclxudmFyIGZvcmNlX2ZpZWxkX3JhZGl1cyA9IDEuNlxyXG52YXIgZm9yY2VfZmllbGRfc3RhbWluYV9jb3N0ID0gNVxyXG52YXIgZm9yY2VfZmllbGRfY29vbGRvd24gPSAxMFxyXG52YXIgZm9yY2VfZmllbGRfb2JzdGFjbGUgPSAyNFxyXG5cclxudmFyIGFjdGlvbl9zcGxhc2hfY29vbGRvd24gPSA0XHJcblxyXG52YXIgaW52aXNpYmlsaXR5X2RldGVjdGlvbl9yYWRpdXMgPSAyO1xyXG5cclxudmFyIGJpZ19icm9fcmFuZ2UgPSAyXHJcbnZhciBoZWFsX3JhbmdlID0gMVxyXG52YXIgdGhyb3dfYmFzZV9yYW5nZSA9IDJcclxudmFyIGxpZ2h0X3NvdW5kX2JvbWJfcmFuZ2UgPSA1XHJcbnZhciBmb3JjZV9maWVsZF9yYW5nZSA9IDFcclxudmFyIGFkcmVuYWxpbmVfcmFuZ2UgPSAxXHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9yYW5nZSA9IDFcclxuXHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbiA9IDJcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX2Nvb2xkb3duID0gNVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfZmxhdF9IUCA9IDVcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX2ZsYXRfc3RhbWluYSA9IDVcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX3BlcmNlbnRfSFAgPSAwLjA1XHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9wZXJjZW50X3N0YW1pbmEgPSAwLjA1XHJcblxyXG52YXIgYWRyZW5hbGluZV9jb29sZG93biA9IDRcclxuXHJcbnZhciBhY2lkX2JvbWJfZHVyYXRpb24gPSAyIC8vIDIrMSByZWFsbHlcclxudmFyIGFjaWRfYm9tYl9jb29sZG93biA9IDVcclxudmFyIGFjaWRfYm9tYl9yYWRpdXMgPSAxLjZcclxuXHJcbnZhciBtaW5lc18wX2Rpc3RhbmNlX2RhbWFnZSA9IDIwXHJcbnZhciBtaW5lc18xX2Rpc3RhbmNlX2RhbWFnZSA9IDE1XHJcbnZhciBtaW5lc18xcDVfZGlzdGFuY2VfZGFtYWdlID0gMTBcclxudmFyIGxhbmRtaW5lX2RldGVjdGlvbl9yYWRpdXMgPSAyLjlcclxudmFyIGxhbmRtaW5lX2RpZmZ1c2VfdGhyZXNob2xkID0gMTBcclxuXHJcbnZhciB0b2JhY2NvX3N0cmlrZV9ocF9wZXJjZW50YWdlID0gMC4xXHJcbnZhciB0b2JhY2NvX3N0cmlrZV9ib251cyA9IDRcclxudmFyIHRvYmFjY29fc3RyaWtlX2Nvb2xkb3duID0gMVxyXG5cclxudmFyIHNhZmV0eV9zZXJ2aWNlX3JhbmdlID0gMjtcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2Nvb2xkb3duID0gMTtcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2R1cmF0aW9uID0gMTtcclxudmFyIHNhZmV0eV9zZXJ2aWNlX2RlZmVuc2l2ZV9hZHZhbnRhZ2UgPSAxO1xyXG52YXIgc2FmZXR5X3NlcnZpY2VfZXZhZGVfYm9udXMgPSAzO1xyXG52YXIgc2FmZXR5X3NlcnZpY2VfYm9udXNfYWN0aW9uc19jb3N0ID0gMjtcclxuXHJcbnZhciBjYWxpbmdhbGF0b3JfcmFuZ2UgPSAxLjY7XHJcbnZhciBjYWxpbmdhbGF0b3Jfb2JzdGFjbGUgPSAyNTtcclxudmFyIGNhbGluZ2FsYXRvcl9kdXJhdGlvbiA9IDM7XHJcbnZhciBjYWxpbmdhbGF0b3Jfc3RhbWluYV9jb3N0ID0gMztcclxudmFyIGNhbGluZ2FsYXRvcl9yYWRpdXMgPSAxLjY7XHJcbnZhciBjYWxpbmdhbGF0b3Jfc2tpbGxfY29vbGRvd24gPSAxMDtcclxudmFyIGNhbGluZ2FsYXRvcl9mbGF0X2hlYWwgPSA1O1xyXG52YXIgY2FsaW5nYWxhdG9yX3JvbGxfaGVhbCA9IDU7XHJcbnZhciBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMSA9IDU7XHJcbnZhciBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMiA9IDc7XHJcbnZhciBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMyA9IDEwO1xyXG52YXIgY2FsaW5nYWxhdG9yX3BvaXNvbmluZ19kdXJhdGlvbl9lbmxpZ2h0ZW5lZCA9IDEwO1xyXG52YXIgY2FsaW5nYWxhdG9yX3BlbmFsdHlfc3RhZ2UxID0gLTE7XHJcbnZhciBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTIgPSAtMjtcclxudmFyIGNhbGluZ2FsYXRvcl9wZW5hbHR5X3N0YWdlMyA9IC0zO1xyXG52YXIgY2FsaW5nYWxhdG9yX3BlbmFsdHlfZW5saWdodGVuZWQgPSAzO1xyXG5cclxudmFyIGJlbHZldF9idWZmX3JhbmdlID0gMS42O1xyXG52YXIgYmVsdmV0X2J1ZmZfc2tpbGxfZHVyYXRpb24gPSAxO1xyXG52YXIgYmVsdmV0X2J1ZmZfYXR0YWNrX2JvbnVzID0gMjtcclxudmFyIGJlbHZldF9idWZmX21lbGVlX2FkdmFudGFnZSA9IDE7XHJcbnZhciBiZWx2ZXRfYnVmZl9yYW5nZWRfYWR2YW50YWdlID0gMTtcclxuXHJcbnZhciBob29rX2Nvb2xkb3duID0gMjtcclxudmFyIGhvb2tfZHVyYXRpb24gPSAxO1xyXG52YXIgaG9va19kZWZlbnNpdmVfYWR2YW50YWdlID0gLTE7XHJcbnZhciBob29rX3JhbmdlID0gMztcclxuXHJcbnZhciBwdW5pc2hpbmdfc3RyaWtlX2Nvb2xkb3duID0gMztcclxudmFyIHB1bmlzaGluZ19zdHJpa2VfbXVsdGlwbHllciA9IDAuNTtcclxuXHJcbnZhciBjb21wdXRlcl9pbnRlcmFjdGlvbl9yYWRpdXMgPSAxO1xyXG52YXIgaGFja2luZ19jcml0aWNhbF9mYWlsX3RocmVzaG9sZCA9IDEwO1xyXG52YXIgaGFja2luZ19zdWNjZXNzX3RocmVzaG9sZCA9IDE2O1xyXG52YXIgaGFja2luZ19jcml0aWNhbF9zdWNjZXNzX3RocmVzaG9sZCA9IDI1O1xyXG5cclxuLy8gVGhpcyBpcyBhIGNvbnN0YW50LCB3aWxsIGJlIG1vdmVkIHRvIGRhdGFiYXNlIGxhdGVyXHJcbmNvbnN0IEhQX3ZhbHVlcyA9IFsxNSwgMzAsIDQwLCA1NSwgNzUsIDEwMCwgMTMwLCAxNjUsIDIwNSwgMjUwLCAzMDAsIDM1NSwgNDE1XTtcclxuY29uc3Qgc3RhbWluYV92YWx1ZXMgPSBbMzAsIDQ1LCA2MCwgNzUsIDkwLCAxMDUsIDEyMCwgMTM1LCAxNTAsIDE2NSwgMTgwLCAxOTVdO1xyXG5jb25zdCBzdHJlbmd0aF9kYW1hZ2VfbWFwID0gWy0yLCAwLCAxLCAzLCA2LCAxMCwgMTUsIDIxLCAyOCwgMzYsIDQ1LCA1NV1cclxuY29uc3QgbW92ZV9hY3Rpb25fbWFwID0gWzEsIDMsIDQsIDYsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTVdXHJcbmNvbnN0IGJvbnVzX2FjdGlvbl9tYXA9IFswLCAxLCAxLCAyLCAyLCAyLCAyLCAyLCAzLCAzLCAzLCAzXVxyXG5jb25zdCBtYWluX2FjdGlvbl9tYXAgPSBbMSwgMSwgMSwgMSwgMSwgMSwgMiwgMiwgMiwgMiwgMiwgM11cclxuXHJcbnZhciBlZmZlY3RfbGlzdCA9IFtcItCj0LLQtdC70LjRh9C40YLRjCDRgdC40LvRg1wiLCBcItCj0LLQtdC70LjRh9C40YLRjCDRgtC10LvQvtGB0LvQvtC20LXQvdC40LVcIiwgXCLQo9Cy0LXQu9C40YfQuNGC0Ywg0LvQvtCy0LrQvtGB0YLRjFwiLCBcItCj0LLQtdC70LjRh9C40YLRjCDQuNC90YLQtdC70LvQtdC60YJcIiwgXCLQo9Cy0LXQu9C40YfQuNGC0Ywg0JrQlFwiLCBcItCj0LzQtdC90YzRiNC40YLRjCDRgdC40LvRg1wiLFxyXG5cItCj0LzQtdC90YzRiNC40YLRjCDRgtC10LvQvtGB0LvQvtC20LXQvdC40LVcIiwgXCLQo9C80LXQvdGM0YjQuNGC0Ywg0LvQvtCy0LrQvtGB0YLRjFwiLCBcItCj0LzQtdC90YzRiNC40YLRjCDQuNC90YLQtdC70LvQtdC60YJcIiwgXCLQo9C80LXQvdGM0YjQuNGC0Ywg0JrQlFwiXTtcclxudmFyIElOQ1JFQVNFX1NUUkVOR1RIID0gMDtcclxudmFyIElOQ1JFQVNFX1NUQU1JTkEgPSAxO1xyXG52YXIgSU5DUkVBU0VfQUdJTElUWSA9IDI7XHJcbnZhciBJTkNSRUFTRV9JTlQgPSAzO1xyXG52YXIgSU5DUkVBU0VfS0QgPSA0O1xyXG52YXIgREVDUkVBU0VfU1RSRU5HVEggPSA1O1xyXG52YXIgREVDUkVBU0VfU1RBTUlOQSA9IDY7XHJcbnZhciBERUNSRUFTRV9BR0lMSVRZID0gNztcclxudmFyIERFQ1JFQVNFX0lOVCA9IDg7XHJcbnZhciBERUNSRUFTRV9LRCA9IDk7XHJcblxyXG5cclxudmFyIENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVCA9IHtIUDogW10sIG1haW5fYWN0aW9uOiBbXSwgYm9udXNfYWN0aW9uOiBbXSwgbW92ZV9hY3Rpb246IFtdLCBzdGFtaW5hOiBbXSwgaW5pdGlhdGl2ZTogW10sIGNhbl9ldmFkZTogW10sIGhhc19tb3ZlZDogW10sXHJcbiAgS0RfcG9pbnRzOiBbXSwgY3VycmVudF93ZWFwb246IFtdLCB2aXNpYmlsaXR5OiBbXSwgaW52aXNpYmlsaXR5OiBbXSwgYXR0YWNrX2JvbnVzOiBbXSwgZGFtYWdlX2JvbnVzOiBbXSwgdW5pdmVyc2FsX2JvbnVzOiBbXSwgYm9udXNfS0Q6IFtdLFxyXG4gIHNwZWNpYWxfZWZmZWN0czogW10sIHJhbmdlZF9hZHZhbnRhZ2U6IFtdLCBtZWxlZV9hZHZhbnRhZ2U6IFtdLCBkZWZlbnNpdmVfYWR2YW50YWdlOiBbXSwgcG9zaXRpb246IFtdLCBldmFkZV9ib251czogW10sIG1lbGVlX3Jlc2lzdDogW10sIGJ1bGxldF9yZXNpc3Q6IFtdfTtcclxubGV0IGdhbWVfc3RhdGUgPSB7Ym9hcmRfc3RhdGU6IFtdLCBmb2dfc3RhdGU6IFtdLCB6b25lX3N0YXRlOiBbXSwgc2l6ZTogMCwgc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlOiBbXSwgdGVycmFpbl9lZmZlY3RzOiBbXSwgYmF0dGxlX21vZDogMCwgb2JzdGFjbGVfZXh0cmFfaW5mbzogW10sXHJcbiAgbGFuZG1pbmVzOiB7cG9zaXRpb25zOiBbXSwga25vd2VyczogW119fTtcclxubGV0IGNoYXJhY3Rlcl9zdGF0ZSA9IENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVDtcclxuXHJcbmxldCBnbV9jb250cm9sX21vZCA9IDA7IC8vIG5vcm1hbCBtb2RlXHJcblxyXG4vLyBpbl9wcm9jZXNzOiAwID0gbm90aGluZywgMSA9IG1vdmUsIDIgPSBhdHRhY2ssIDMgPSBza2lsbFxyXG5sZXQgY2hhcmFjdGVyX2Nob3NlbiA9IHtpbl9wcm9jZXNzOiAwLCBjaGFyX2lkOiAwLCBjaGFyX3Bvc2l0aW9uOiAwLCB3ZWFwb25faWQ6IDAsIHNraWxsX2lkOiAwLCBjZWxsOiAwfTtcclxubGV0IGRyYWdnZWQgPSBudWxsO1xyXG5cclxubGV0IGxhc3Rfb2JzdGFjbGUgPSAxO1xyXG5sZXQgem9uZV9lbmRwb2ludCA9IHtpbmRleDogLTEsIGNlbGw6IDB9XHJcblxyXG52YXIgZ3Vuc2hvdF9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL2d1bnNob3QubXAzJyk7XHJcbnZhciBzd29yZF9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL3N3b3JkLndhdicpO1xyXG52YXIgZXhwbG9zaW9uX2F1ZGlvID0gbmV3IEF1ZGlvKCdzb3VuZHMvZXhwbG9zaW9uLm1wMycpO1xyXG52YXIgc3VyaWtlbl9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL3N1cmlrZW4ubXAzJyk7XHJcblxyXG5ndW5zaG90X2F1ZGlvLnZvbHVtZSA9IDAuMlxyXG5zd29yZF9hdWRpby52b2x1bWUgPSAwLjJcclxuc3VyaWtlbl9hdWRpby52b2x1bWUgPSAwLjJcclxuZXhwbG9zaW9uX2F1ZGlvLnZvbHVtZSA9IDAuMlxyXG5cclxuZnVuY3Rpb24gcmVjb25uZWN0KCkge1xyXG4gIGlmICghc29ja2V0LmlzUmVhZHkoKSkge1xyXG4gICAgc29ja2V0LmluaXQoU0VSVkVSX0FERFJFU1MpO1xyXG4gICAgc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0KCk7XHJcbiAgICBjb25zb2xlLmxvZygnSG9wZWZ1bGx5IHJlY29ubmVjdGVkIChwcmF5KScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnV2FzIG9ubGluZSBhbnl3YXknKTtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ2lnbm9yZV9tZSc7XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9XHJcbn1cclxuXHJcbi8vINCh0L7Qt9C00LDQvdC40LUg0LTQvtGB0LrQuCwgb25jbGljayDQutC70LXRgtC+0LosIHNhdmUvbG9hZFxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XHJcbiAgZ2FtZV9zdGF0ZS5zaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZF9zaXplXCIpLnZhbHVlO1xyXG4gIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLmZvZ19zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuem9uZV9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUgKiBnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG4gICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGUucHVzaCgwKTtcclxuICB9XHJcbiAgc2VuZF9jb25zdHJ1Y3RfY29tbWFuZChnYW1lX3N0YXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEJvYXJkKCkge1xyXG4gIHZhciBuYW1lID0gc2F2ZXNfc2VsZWN0LnZhbCgpO1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdsb2FkX2dhbWUnO1xyXG4gIHRvU2VuZC5zYXZlX25hbWUgPSBuYW1lO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVCb2FyZCgpIHtcclxuICB2YXIgc2F2ZV9uYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfbmFtZVwiKS52YWx1ZTtcclxuICB2YXIgZnVsbF9nYW1lX3N0YXRlID0ge1xyXG4gICAgZ2FtZV9zdGF0ZTogZ2FtZV9zdGF0ZSxcclxuICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvOiBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyxcclxuICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm86IG9ic3RhY2xlX2RldGFpbGVkX2luZm8sXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGU6IGNoYXJhY3Rlcl9zdGF0ZVxyXG4gIH07XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdzYXZlX2dhbWUnO1xyXG4gIHRvU2VuZC5zYXZlX25hbWUgPSBzYXZlX25hbWU7XHJcbiAgdG9TZW5kLmZ1bGxfZ2FtZV9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb3dubG9hZEJvYXJkKCkge1xyXG4gIHZhciBuYW1lID0gc2F2ZXNfc2VsZWN0LnZhbCgpO1xyXG4gIHZhciBsaW5rX25hbWUgPSBcInNhdmVzL1wiICsgbmFtZSArIFwiLmpzb25cIjtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlfaWZyYW1lJykuc3JjID0gbGlua19uYW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kX2NvbnN0cnVjdF9jb21tYW5kKG5ld19nYW1lX3N0YXRlKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2NvbnN0cnVjdF9ib2FyZCc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuZ2FtZV9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb25zdHJ1Y3RfYm9hcmQobmV3X2dhbWVfc3RhdGUpIHtcclxuICBnYW1lX3N0YXRlID0gbmV3X2dhbWVfc3RhdGVcclxuICBpZiAoIWdhbWVfc3RhdGUuaGFzT3duUHJvcGVydHkoXCJvYnN0YWNsZV9leHRyYV9pbmZvXCIpKSB7XHJcbiAgICBnYW1lX3N0YXRlLm9ic3RhY2xlX2V4dHJhX2luZm8gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICAgIGdhbWVfc3RhdGUub2JzdGFjbGVfZXh0cmFfaW5mb1tpXSA9IHt9O1xyXG4gICAgfVxyXG4gIH1cclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIGJvYXJkX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xyXG4gIGJvYXJkX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIHZhciBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuICBib2FyZC5jbGFzc05hbWUgPSBcImJvYXJkXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIHZhciByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICByb3cuY2xhc3NOYW1lID0gXCJib2FyZF9yb3dcIjtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZV9zdGF0ZS5zaXplOyBqKyspIHtcclxuICAgICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICAgIHZhciBjZWxsX2lkID0gaSAqIGdhbWVfc3RhdGUuc2l6ZSArIGo7XHJcbiAgICAgIGJ1dHRvbi5pZCA9IFwiY2VsbF9cIiArIGNlbGxfaWQ7XHJcbiAgICAgIGJ1dHRvbi5yb3cgPSBpO1xyXG4gICAgICBidXR0b24uY29sdW1uID0gajtcclxuICAgICAgdmFyIGltYWdlX25hbWUgPSBmb2dPclBpYyhjZWxsX2lkKTtcclxuICAgICAgYnV0dG9uLnNyYyA9IGltYWdlX25hbWU7XHJcbiAgICAgIGJ1dHRvbi5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdib2FyZF9jZWxsJztcclxuICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHZhciBpbmRleCA9IGNlbGwucm93ICogZ2FtZV9zdGF0ZS5zaXplICsgY2VsbC5jb2x1bW47XHJcblxyXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgc2hpZnRfb25jbGljayhpbmRleCwgY2VsbClcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAgIGN0cmxfb25jbGljayhpbmRleClcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmFsdEtleSkge1xyXG4gICAgICAgICAgYWx0X29uY2xpY2soaW5kZXgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vX3NoaWZ0X29uY2xpY2sobXlfcm9sZSwgZ21fY29udHJvbF9tb2QsIGdhbWVfc3RhdGUsIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcywgY2VsbCwgaW5kZXgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuICAgICAgYnV0dG9uLmRyYWdnYWJsZSA9IHRydWU7XHJcbiAgICAgIGJ1dHRvbi5vbmRyYWdvdmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGJ1dHRvbi5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgZHJhZ2dlZCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICB2YXIgY2VsbCA9IGRyYWdnZWQ7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gY2VsbC5yb3cgKiBnYW1lX3N0YXRlLnNpemUgKyBjZWxsLmNvbHVtbjtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdO1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfbnVtYmVyID4gMCAmJiAobXlfcm9sZSA9PSBcImdtXCIgfHwgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gMSkgJiYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gJ2FsbCcgfHwgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSBteV9uYW1lKSAmJiAobXlfcm9sZSA9PSBcImdtXCIgfHwgZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDApKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwsIGZhbHNlKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBidXR0b24ub25kcm9wID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICB2YXIgaW5kZXggPSBjZWxsLnJvdyAqIGdhbWVfc3RhdGUuc2l6ZSArIGNlbGwuY29sdW1uO1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPT0gMSAmJiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwICYmIChteV9yb2xlID09IFwiZ21cIiB8fCBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPT0gMCkpIHtcclxuICAgICAgICAgIG1vdmVfY2hhcmFjdGVyKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB2YXIgY2VsbF93cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xyXG4gICAgICBjZWxsX3dyYXAuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgY2VsbF93cmFwLmNsYXNzTmFtZSA9IFwiY2VsbF93cmFwXCI7XHJcblxyXG4gICAgICB2YXIgem9uZV90ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgem9uZV90ZXh0LmlkID0gXCJ6b25lX3RleHRfXCIgKyBjZWxsX2lkO1xyXG4gICAgICB6b25lX3RleHQuY2xhc3NOYW1lID0gXCJ6b25lX3RleHRcIjtcclxuICAgICAgY2VsbF93cmFwLmFwcGVuZENoaWxkKHpvbmVfdGV4dCk7XHJcblxyXG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbF93cmFwKTtcclxuICAgIH1cclxuICAgIGJvYXJkLmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgfVxyXG4gIGJvYXJkX2NvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vX3NoaWZ0X29uY2xpY2sobXlfcm9sZSwgZ21fY29udHJvbF9tb2QsIGdhbWVfc3RhdGUsIGZpZWxkX2Nob3NlbiwgY2VsbCwgaW5kZXgpIHtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICAvLyBnbSBzaWRlXHJcbiAgICBpZiAoZ21fY29udHJvbF9tb2QgPT0gMCkge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gbm9ybWFsIGFkZC9tb3ZlIGRlbGV0ZSBtb2RlXHJcbiAgICAgIHN0YW5kYXJkX2NlbGxfb25DbGljayhpbmRleCwgY2VsbCwgbXlfcm9sZSk7XHJcbiAgICB9IGVsc2UgaWYgKGdtX2NvbnRyb2xfbW9kID09IDEpIHtcclxuICAgICAgLy8gd2UgYXJlIGluIGZvZyBtb2RlXHJcbiAgICAgIGFwcGx5Rm9nKGluZGV4LCBjZWxsKTtcclxuICAgIH0gZWxzZSBpZiAoZ21fY29udHJvbF9tb2QgPT0gMikge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gem9uZXMgbW9kZVxyXG4gICAgICBhc3NpZ25ab25lKGluZGV4KTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gcGxheWVyIHNpZGVcclxuICAgIGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPT0gMSkge1xyXG4gICAgICAvLyBjbGlja2VkIGZvZ1xyXG4gICAgICBpZiAoZmllbGRfY2hvc2VuID09IDEpIHtcclxuICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgZm9nIGRldGVjdGVkJyk7XHJcbiAgICAgICAgZGlzcGxheUZvZygpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIG15X3JvbGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hpZnRfb25jbGljayhpbmRleCwgY2VsbCkge1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIGlmIChnbV9jb250cm9sX21vZCA9PSAyKSB7XHJcbiAgICAgIGlmICh6b25lX2VuZHBvaW50LmluZGV4IDwgMCkge1xyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuaW5kZXggPSBpbmRleFxyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuY2VsbCA9IGNlbGxcclxuICAgICAgICBjZWxsLnNyYyA9IFpPTkVfRU5EUE9JTlRfUElDXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZW5kcG9pbnRfYXNzaWduX3pvbmUoaW5kZXgsIHpvbmVfZW5kcG9pbnQuaW5kZXgpXHJcbiAgICAgICAgem9uZV9lbmRwb2ludC5jZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDXHJcbiAgICAgICAgem9uZV9lbmRwb2ludC5pbmRleCA9IC0xXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX29ic3RhY2xlJztcclxuICAgICAgdG9TZW5kLmNlbGxfaWQgPSBpbmRleDtcclxuICAgICAgdG9TZW5kLm9ic3RhY2xlX251bWJlciA9IGxhc3Rfb2JzdGFjbGU7XHJcbiAgICAgIHRvU2VuZC5vYnN0YWNsZV9uYW1lID0gb2JzdGFjbGVfbGlzdFtsYXN0X29ic3RhY2xlIC0gMV07XHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3RybF9vbmNsaWNrKGluZGV4KSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgdmFyIGZvZ192YWx1ZSA9IGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIG1vZCA9IDEgLSBmb2dfdmFsdWVcclxuICAgIHZhciB6b25lID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2luZGV4XVxyXG4gICAgZm9nUGFyc2Vab25lKG1vZCwgem9uZSlcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFsdF9vbmNsaWNrKGluZGV4KSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgZGVsZXRlX29iamVjdF9jb21tYW5kKGluZGV4KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YW5kYXJkX2NlbGxfb25DbGljayhpbmRleCwgY2VsbCwgcm9sZSkge1xyXG5cdGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7IC8vIGVtcHR5IGNlbGwgY2xpY2tlZFxyXG5cclxuICAgIHN3aXRjaChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MpIHtcclxuICAgICAgY2FzZSAwOiAvLyBub3RoaW5nXHJcbiAgICAgICAgaWYgKHJvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgICAgYWRkX29iamVjdChpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6IC8vIG1vdmVcclxuICAgICAgICBtb3ZlX2NoYXJhY3RlcihpbmRleCwgY2VsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjogLy9hdHRhY2tcclxuICAgICAgICBzdG9wX2F0dGFjaygpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzogLy9za2lsbFxyXG4gICAgICAgIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXNvbHZpbmcgb25fY2xpY2sgZW1wdHlcIilcclxuICAgIH1cclxuXHJcblx0fSBlbHNlIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA+IDApIHsgLy8gY2hhcmFjdGVyIGNsaWNrZWRcclxuICAgIHN3aXRjaChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MpIHtcclxuICAgICAgY2FzZSAwOiAvLyBub3RoaW5nXHJcbiAgICAgICAgc2VsZWN0X2NoYXJhY3RlcihpbmRleCwgY2VsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTogLy8gbW92ZVxyXG4gICAgICAgIHVuZG9fc2VsZWN0aW9uKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjogLy9hdHRhY2tcclxuICAgICAgICBwZXJmb3JtX2F0dGFjayhpbmRleCwgY2VsbClcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOiAvL3NraWxsXHJcbiAgICAgICAgcGVyZm9ybV9za2lsbChpbmRleCwgY2VsbClcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJlc29sdmluZyBvbl9jbGljayBjaGFyYWN0ZXJcIilcclxuICAgIH1cclxuXHJcblx0fSBlbHNlIHsgLy8gb2JzdGFjbGUgY2xpY2tlZFxyXG5cclxuICAgIHN3aXRjaChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MpIHtcclxuICAgICAgY2FzZSAwOiAvLyBub3RoaW5nXHJcbiAgICAgICAgc2VsZWN0X29ic3RhY2xlKGluZGV4LCBjZWxsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxOiAvLyBtb3ZlXHJcbiAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOiAvL2F0dGFja1xyXG4gICAgICAgIGF0dGFja19vYnN0YWNsZShpbmRleCwgY2VsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzogLy9za2lsbFxyXG4gICAgICAgIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXNvbHZpbmcgb25fY2xpY2sgb2JzdGFjbGVcIilcclxuICAgIH1cclxuXHJcblx0fVxyXG59XHJcblxyXG4vLyBab25lL2ZvZyByZWxhdGVkIHN0YWZmXHJcblxyXG5mdW5jdGlvbiBlbmRwb2ludF9hc3NpZ25fem9uZShlbmRwb2ludDEsIGVuZHBvaW50Mikge1xyXG4gIHZhciB6b25lX251bWJlciA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICB2YXIgbW9kaWZpY2F0b3IgPSBzZWFyY2hfbW9kaWZpY2F0b3IudmFsKCk7XHJcbiAgdmFyIHNpemUgPSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIGluZGV4X2xpc3QgPSBbXVxyXG5cclxuICB2YXIgY29vcmQxID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQxLCBzaXplKVxyXG4gIHZhciBjb29yZDIgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDIsIHNpemUpXHJcblxyXG4gIHZhciB0b3BfbGVmdCA9IHRvcF9sZWZ0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKVxyXG4gIHZhciBib3R0b21fcmlnaHQgPSBib3R0b21fcmlnaHRfY29vcmQoY29vcmQxLCBjb29yZDIpXHJcblxyXG4gIGZvciAobGV0IGkgPSB0b3BfbGVmdC54OyBpIDw9IGJvdHRvbV9yaWdodC54OyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSB0b3BfbGVmdC55OyBqIDw9IGJvdHRvbV9yaWdodC55OyBqKyspIHtcclxuICAgICAgdmFyIGNvb3JkID0ge31cclxuICAgICAgY29vcmQueCA9IGlcclxuICAgICAgY29vcmQueSA9IGpcclxuICAgICAgdmFyIGluZGV4ID0gY29vcmRfdG9faW5kZXgoY29vcmQsIHNpemUpXHJcblxyXG4gICAgICBpbmRleF9saXN0LnB1c2goaW5kZXgpXHJcbiAgICAgIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9uZV90ZXh0XycgKyBpbmRleCk7XHJcbiAgICAgIHpvbmVfdGV4dC5pbm5lckhUTUwgPSB6b25lX251bWJlciArICcoJyArIG1vZGlmaWNhdG9yICsgJyknO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2Fzc2lnbl96b25lJztcclxuICB0b1NlbmQuem9uZV9udW1iZXIgPSB6b25lX251bWJlcjtcclxuICB0b1NlbmQuaW5kZXhfbGlzdCA9IGluZGV4X2xpc3Q7XHJcbiAgdG9TZW5kLm1vZGlmaWNhdG9yID0gbW9kaWZpY2F0b3I7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduWm9uZShpbmRleCkge1xyXG4gIHZhciB6b25lX251bWJlciA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICB2YXIgbW9kaWZpY2F0b3IgPSBzZWFyY2hfbW9kaWZpY2F0b3IudmFsKCk7XHJcblxyXG4gIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9uZV90ZXh0XycgKyBpbmRleCk7XHJcbiAgem9uZV90ZXh0LmlubmVySFRNTCA9IHpvbmVfbnVtYmVyICsgJygnICsgbW9kaWZpY2F0b3IgKyAnKSc7XHJcblxyXG4gIHZhciBpbmRleF9saXN0ID0gW11cclxuICBpbmRleF9saXN0LnB1c2goaW5kZXgpXHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhc3NpZ25fem9uZSc7XHJcbiAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgdG9TZW5kLmluZGV4X2xpc3QgPSBpbmRleF9saXN0O1xyXG4gIHRvU2VuZC5tb2RpZmljYXRvciA9IG1vZGlmaWNhdG9yO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5Rm9nKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG4gIHZhciBpbmRleF9saXN0ID0gW107XHJcbiAgaW5kZXhfbGlzdC5wdXNoKGluZGV4KTtcclxuICB0b1NlbmQuaW5kZXhfbGlzdCA9IGluZGV4X2xpc3Q7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuXHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDEpIHtcclxuXHRcdHRvU2VuZC51cGRhdGVfdHlwZSA9ICdyZW1vdmUnO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0b1NlbmQudXBkYXRlX3R5cGUgPSAnYWRkJztcclxuXHR9XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ01vZGVDaGFuZ2UoKSB7XHJcbiAgaWYgKGdtX2NvbnRyb2xfbW9kICE9IDEpIHtcclxuICAgIC8vIHR1cm4gb24gZm9nIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDE7XHJcbiAgICBmb2dfYnV0dG9uLnRleHQoJ9CS0YvQutC7INCi0YPQvNCw0L0g0JLQvtC50L3RiycpO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2ldID09IDEpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF9jZWxsLnNyYyA9IEZPR19JTUFHRTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyB0dXJuIG9mZiBmb2cgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMDtcclxuICAgIGZvZ19idXR0b24udGV4dCgn0JLQutC7INCi0YPQvNCw0L0g0JLQvtC50L3RiycpO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2ldID09IDEpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF9jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gem9uZU1vZGVDaGFuZ2UoKSB7XHJcbiAgaWYgKGdtX2NvbnRyb2xfbW9kICE9IDIpIHtcclxuICAgIC8vIHR1cm4gb24gem9uZSBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAyO1xyXG4gICAgem9uZV9idXR0b24udGV4dCgn0JLRi9C60Lsg0JfQvtC90LDQu9GM0L3Ri9C5INGA0LXQttC40LwnKTtcclxuICAgIHpvbmVfbnVtYmVyX3NlbGVjdC5zaG93KCk7XHJcbiAgICBmb2dfem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgdW5mb2dfem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgc2VhcmNoX21vZGlmaWNhdG9yLnNob3coKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRpZiAoZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldID4gMCkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X3pvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uZV90ZXh0X1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF96b25lX3RleHQuaW5uZXJIVE1MID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldICsgJygnICsgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaV0gKyAnKSc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gYmFjayB0byBub3JtYWwgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAwO1xyXG4gICAgem9uZV9idXR0b24udGV4dCgn0JLQutC7INCX0L7QvdCw0LvRjNC90YvQuSDRgNC10LbQuNC8Jyk7XHJcbiAgICB6b25lX251bWJlcl9zZWxlY3QuaGlkZSgpO1xyXG4gICAgZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuICAgIHVuZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuICAgIHNlYXJjaF9tb2RpZmljYXRvci5oaWRlKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF96b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmVfdGV4dF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfem9uZV90ZXh0LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0fVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9nQ3VycmVudFpvbmUoKSB7XHJcbiAgdmFyIGN1cnJlbnRfem9uZSA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICBmb2dQYXJzZVpvbmUoMSwgY3VycmVudF96b25lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5mb2dDdXJyZW50Wm9uZSgpIHtcclxuICBmb2dQYXJzZVpvbmUoMCwgY3VycmVudF96b25lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9nUGFyc2Vab25lKG1vZCwgY3VycmVudF96b25lKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgaWYgKG1vZCA9PSAwKSB7XHJcbiAgICB0b1NlbmQudXBkYXRlX3R5cGUgPSAncmVtb3ZlJztcclxuICB9IGVsc2UgaWYgKG1vZCA9PSAxKSB7XHJcbiAgICB0b1NlbmQudXBkYXRlX3R5cGUgPSAnYWRkJztcclxuICB9XHJcbiAgdmFyIGluZGV4X2xpc3QgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSAqIGdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldID09IGN1cnJlbnRfem9uZSkge1xyXG4gICAgICBpbmRleF9saXN0LnB1c2goaSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRvU2VuZC5pbmRleF9saXN0ID0gaW5kZXhfbGlzdDtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuLy8gSGVscGVyIGNvb3JkaW5hdGUgcmVsYXRlZCBmdW5jdGlvbnNcclxuXHJcbmZ1bmN0aW9uIHRvcF9sZWZ0X2Nvb3JkKGNvb3JkMSwgY29vcmQyKSB7XHJcbiAgdmFyIHRvUmV0ID0ge31cclxuICB0b1JldC54ID0gTWF0aC5taW4oY29vcmQxLngsIGNvb3JkMi54KVxyXG4gIHRvUmV0LnkgPSBNYXRoLm1pbihjb29yZDEueSwgY29vcmQyLnkpXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJvdHRvbV9yaWdodF9jb29yZChjb29yZDEsIGNvb3JkMikge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGgubWF4KGNvb3JkMS54LCBjb29yZDIueClcclxuICB0b1JldC55ID0gTWF0aC5tYXgoY29vcmQxLnksIGNvb3JkMi55KVxyXG4gIHJldHVybiB0b1JldFxyXG59XHJcblxyXG5mdW5jdGlvbiBjb29yZF90b19pbmRleChjb29yZCwgc2l6ZSkge1xyXG4gIHZhciBpbmRleCA9IGNvb3JkLnggKiBzaXplICsgY29vcmQueVxyXG4gIHJldHVybiBpbmRleFxyXG59XHJcblxyXG5mdW5jdGlvbiBpbmRleF90b19jb29yZGluYXRlcyhpbmRleCwgc2l6ZSkge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGguZmxvb3IoaW5kZXgvc2l6ZSlcclxuICB0b1JldC55ID0gaW5kZXggJSBzaXplXHJcbiAgcmV0dXJuIHRvUmV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmREaXN0YW5jZShpbmRleDEsIGluZGV4Mikge1xyXG4gIHZhciB4MSA9IE1hdGguZmxvb3IoaW5kZXgxL2dhbWVfc3RhdGUuc2l6ZSlcclxuICB2YXIgeTEgPSBpbmRleDEgJSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIHgyID0gTWF0aC5mbG9vcihpbmRleDIvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MiA9IGluZGV4MiAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgZGlzdGFuY2Vfc3F1YXJlZCA9ICh4MS14MikqKHgxLXgyKSArICh5MS15MikqKHkxLXkyKVxyXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChkaXN0YW5jZV9zcXVhcmVkKVxyXG4gIHJldHVybiBwYXJzZUZsb2F0KGRpc3RhbmNlKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0luUmFuZ2UoaW5kZXgxLCBpbmRleDIsIHJhbmdlKSB7XHJcbiAgdmFyIHgxID0gTWF0aC5mbG9vcihpbmRleDEvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MSA9IGluZGV4MSAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgeDIgPSBNYXRoLmZsb29yKGluZGV4Mi9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkyID0gaW5kZXgyICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciBkaXN0YW5jZSA9ICh4MS14MikqKHgxLXgyKSArICh5MS15MikqKHkxLXkyKVxyXG4gIHJldHVybiBkaXN0YW5jZSA8PSByYW5nZSpyYW5nZVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhbmdlKSB7XHJcbiAgdmFyIHNpemUgPSBnYW1lX3N0YXRlLnNpemVcclxuICB2YXIgeCA9IE1hdGguZmxvb3IoaW5kZXgvc2l6ZSlcclxuICB2YXIgeSA9IGluZGV4ICUgc2l6ZVxyXG4gIHZhciBjYW5kaWRhdGVfaW5kZXhfbGlzdCA9IFtdXHJcblxyXG4gIC8vY29uc29sZS5sb2coXCJ4OiBcIiArIHggKyBcIiB5OiBcIiArIHkgKyBcIiBpbmRleDogXCIgKyBpbmRleClcclxuXHJcbiAgZm9yIChsZXQgaSA9IE1hdGguZmxvb3IoLTEgKiByYW5nZSk7IGkgPD0gTWF0aC5jZWlsKHJhbmdlKTsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gTWF0aC5mbG9vcigtMSAqIHJhbmdlKTsgaiA8PSBNYXRoLmNlaWwocmFuZ2UpOyBqKyspIHtcclxuICAgICAgdmFyIGNhbmRfeCA9IHggKyBpXHJcbiAgICAgIHZhciBjYW5kX3kgPSB5ICsgalxyXG4gICAgICAvL2NvbnNvbGUubG9nKFwiY2FuZF94OiBcIiArIGNhbmRfeCArIFwiIGNhbmRfeTogXCIgKyBjYW5kX3kpXHJcbiAgICAgIGlmIChjYW5kX3ggPj0wICYmIGNhbmRfeCA8IHNpemUgJiYgY2FuZF95ID49MCAmJiBjYW5kX3kgPCBzaXplKSB7XHJcbiAgICAgICAgdmFyIGNhbmRfaW5kZXggPSBjYW5kX3gqc2l6ZSArIGNhbmRfeVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJjYW5kX2luZGV4OiBcIiArIGNhbmRfaW5kZXgpXHJcbiAgICAgICAgaWYgKGlzSW5SYW5nZShpbmRleCwgY2FuZF9pbmRleCwgcmFuZ2UpKSB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FuZF9pbmRleDogXCIgKyBjYW5kX2luZGV4ICsgXCJ3YXMgY29uc2lkZXJlZCBpbiByYW5nZVwiKVxyXG4gICAgICAgICAgY2FuZGlkYXRlX2luZGV4X2xpc3QucHVzaChjYW5kX2luZGV4KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY2FuZGlkYXRlX2luZGV4X2xpc3RcclxufVxyXG5cclxuZnVuY3Rpb24gbGluZV9mcm9tX2VuZHBvaW50cyhwb2ludDEsIHBvaW50Mikge1xyXG4gIHZhciBsaW5lID0ge31cclxuICBsaW5lLmEgPSAtMSoocG9pbnQxLnkgLSBwb2ludDIueSlcclxuICBsaW5lLmIgPSBwb2ludDEueCAtIHBvaW50Mi54XHJcbiAgbGluZS5jID0gLTEqKGxpbmUuYSAqIHBvaW50Mi54ICsgbGluZS5iICogcG9pbnQyLnkpXHJcbiAgcmV0dXJuIGxpbmVcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzdGFuY2VfdG9fbGluZShlbmRwb2ludDEsIGVuZHBvaW50Miwgc2l6ZSwgdGVzdHBvaW50KSB7XHJcbiAgdmFyIGVuZHBvaW50MV9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgZW5kcG9pbnQyX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG4gIHZhciB0ZXN0cG9pbnRfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyh0ZXN0cG9pbnQsIHNpemUpXHJcblxyXG4gIHZhciBsaW5lID0gbGluZV9mcm9tX2VuZHBvaW50cyhlbmRwb2ludDFfY29vcmQsIGVuZHBvaW50Ml9jb29yZClcclxuICBjb25zb2xlLmxvZyhsaW5lKVxyXG4gIGNvbnNvbGUubG9nKHRlc3Rwb2ludF9jb29yZClcclxuXHJcbiAgdmFyIGRpc3RhbmNlID0gTWF0aC5hYnMobGluZS5hKnRlc3Rwb2ludF9jb29yZC54ICsgbGluZS5iKnRlc3Rwb2ludF9jb29yZC55ICsgbGluZS5jKS9NYXRoLnNxcnQobGluZS5hKmxpbmUuYSArIGxpbmUuYipsaW5lLmIpXHJcblxyXG4gIGNvbnNvbGUubG9nKGRpc3RhbmNlKVxyXG4gIHJldHVybiBkaXN0YW5jZVxyXG59XHJcblxyXG5mdW5jdGlvbiBjZWxsc19vbl9saW5lKGVuZHBvaW50MSwgZW5kcG9pbnQyLCBzaXplKSB7XHJcbiAgdmFyIGVuZHBvaW50MV9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50MSwgc2l6ZSlcclxuICB2YXIgZW5kcG9pbnQyX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXMoZW5kcG9pbnQyLCBzaXplKVxyXG4gIHZhciBsaW5lID0gbGluZV9mcm9tX2VuZHBvaW50cyhlbmRwb2ludDFfY29vcmQsIGVuZHBvaW50Ml9jb29yZClcclxuXHJcbiAgdmFyIHNjYWxlID0gTWF0aC5tYXgoTWF0aC5hYnMobGluZS5hKSwgTWF0aC5hYnMobGluZS5iKSlcclxuICAvLyBuZWVkIHRvIGJlIHJldmVyc2VkISByZW1lbWJlciBsaW5lLmEgPSBkZWx0YSB5XHJcbiAgdmFyIHhfc3RlcCA9IGxpbmUuYi9zY2FsZVxyXG4gIHZhciB5X3N0ZXAgPSAtMSpsaW5lLmEvc2NhbGVcclxuICB2YXIgY3VycmVudF9wb2ludCA9IGVuZHBvaW50Ml9jb29yZFxyXG5cclxuICB2YXIgc2FmZXR5X2l0ZXIgPSAwXHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IFtdXHJcbiAgd2hpbGUgKE1hdGguYWJzKGN1cnJlbnRfcG9pbnQueCAtIGVuZHBvaW50MV9jb29yZC54KSA+IDAuNSB8fCBNYXRoLmFicyhjdXJyZW50X3BvaW50LnkgLSBlbmRwb2ludDFfY29vcmQueSkgPiAwLjUpIHtcclxuICAgIGN1cnJlbnRfcG9pbnQueCArPSB4X3N0ZXBcclxuICAgIGN1cnJlbnRfcG9pbnQueSArPSB5X3N0ZXBcclxuXHJcbiAgICB2YXIgY2VpbCA9IHt9XHJcbiAgICBjZWlsLnggPSBNYXRoLmNlaWwoY3VycmVudF9wb2ludC54KVxyXG4gICAgY2VpbC55ID0gTWF0aC5jZWlsKGN1cnJlbnRfcG9pbnQueSlcclxuICAgIHZhciBjZWlsX2luZGV4ID0gY29vcmRfdG9faW5kZXgoY2VpbCwgc2l6ZSlcclxuXHJcbiAgICB2YXIgZmxvb3IgPSB7fVxyXG4gICAgZmxvb3IueCA9IE1hdGguZmxvb3IoY3VycmVudF9wb2ludC54KVxyXG4gICAgZmxvb3IueSA9IE1hdGguZmxvb3IoY3VycmVudF9wb2ludC55KVxyXG4gICAgdmFyIGZsb29yX2luZGV4ID0gY29vcmRfdG9faW5kZXgoZmxvb3IsIHNpemUpXHJcblxyXG5cclxuICAgIGNhbmRpZGF0ZV9jZWxscy5wdXNoKGNlaWxfaW5kZXgpXHJcbiAgICBpZiAoY2VpbF9pbmRleCAhPSBmbG9vcl9pbmRleCkge1xyXG4gICAgICBjYW5kaWRhdGVfY2VsbHMucHVzaChmbG9vcl9pbmRleClcclxuICAgIH1cclxuXHJcbiAgICBzYWZldHlfaXRlciA9IHNhZmV0eV9pdGVyICsgMVxyXG4gICAgaWYgKHNhZmV0eV9pdGVyID4gNTApIHtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjYW5kaWRhdGVfY2VsbHNcclxufVxyXG5cclxuLy8gYW5pbWF0aW9ucywgY29udGFpbmVyIG1haW50YW5jZVxyXG5cclxuZnVuY3Rpb24gY2xlYXJfY29udGFpbmVycygpIHtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKCkge1xyXG4gIHRpbnlfYW5pbWF0aW9uKGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lcik7XHJcbiAgdGlueV9hbmltYXRpb24od2VhcG9uX2luZm9fY29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGlueV9hbmltYXRpb24oY29udGFpbmVyKSB7XHJcbiAgY29udGFpbmVyLmFkZENsYXNzKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICB9LCA1MCk7XHJcbn1cclxuXHJcbi8vIGFkZGluZyBvYmplY3RzLCBjaGFyYWN0ZXJzXHJcblxyXG5mdW5jdGlvbiBhZGRfb2JqZWN0KGJvYXJkX2luZGV4KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBidXR0b25fY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBidXR0b25fY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiYWRkLW9iamVjdC1idXR0b24tY29udGFpbmVyXCI7XHJcblxyXG4gIHZhciBidXR0b25fYWRkX2NoYXJhY3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uX2FkZF9jaGFyYWN0ZXIuaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMINC/0LXRgNGB0L7QvdCw0LbQsFwiO1xyXG4gIGJ1dHRvbl9hZGRfY2hhcmFjdGVyLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGFkZF9jaGFyYWN0ZXIoYm9hcmRfaW5kZXgpO1xyXG4gIH07XHJcblxyXG4gIHZhciBidXR0b25fYWRkX29ic3RhY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b25fYWRkX29ic3RhY2xlLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1XCI7XHJcbiAgYnV0dG9uX2FkZF9vYnN0YWNsZS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpO1xyXG4gIH07XHJcblxyXG4gIGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9jaGFyYWN0ZXIpO1xyXG4gIGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9vYnN0YWNsZSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b25fY29udGFpbmVyKTtcclxuXHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgb2JzdGFjbGVfbnVtYmVyKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9vYnN0YWNsZSc7XHJcbiAgdG9TZW5kLmNlbGxfaWQgPSBpbmRleDtcclxuICB0b1NlbmQub2JzdGFjbGVfbnVtYmVyID0gb2JzdGFjbGVfbnVtYmVyICsgMTtcclxuICB0b1NlbmQub2JzdGFjbGVfbmFtZSA9IG9ic3RhY2xlX2xpc3Rbb2JzdGFjbGVfbnVtYmVyXTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2VsZWN0LmlkID0gXCJvYnN0YWNsZV9jaG9zZW5cIjtcclxuICBzZWxlY3QuY2xhc3NOYW1lID0gXCJvYmplY3Rfc2VsZWN0XCJcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYnN0YWNsZV9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gb2JzdGFjbGVfbGlzdFtpXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaTtcclxuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgfVxyXG5cclxuICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b24uaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMXCI7XHJcbiAgYnV0dG9uLmJvYXJkX2luZGV4ID0gYm9hcmRfaW5kZXg7XHJcbiAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGJ1dHRvbiA9IGV2ZW50LnRhcmdldDtcclxuICAgIHZhciBvYnN0YWNsZV9udW1iZXIgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9ic3RhY2xlX2Nob3NlblwiKS52YWx1ZSk7XHJcblxyXG4gICAgYWRkX29ic3RhY2xlX2NvbW1hbmQoYnV0dG9uLmJvYXJkX2luZGV4LCBvYnN0YWNsZV9udW1iZXIpXHJcblxyXG4gICAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgfVxyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHNlbGVjdCk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b24pO1xyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZF9jaGFyYWN0ZXIoYm9hcmRfaW5kZXgpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2VsZWN0LmlkID0gXCJjaGFyYWN0ZXJfY2hvc2VuXCI7XHJcbiAgc2VsZWN0LmNsYXNzTmFtZSA9IFwib2JqZWN0X3NlbGVjdFwiXHJcblxyXG4gIHZhciBwbGF5ZXJzX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHBsYXllcnNfb3B0Z3JvdXAuaWQgPSBcInBsYXllcnNfb3B0Z3JvdXBcIlxyXG4gIHBsYXllcnNfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHBsYXllcnNfb3B0Z3JvdXAubGFiZWwgPSBcItCY0LPRgNC+0LrQuFwiXHJcblxyXG4gIHZhciBwZW5ndWluX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHBlbmd1aW5fb3B0Z3JvdXAuaWQgPSBcInBlbmd1aW5fb3B0Z3JvdXBcIlxyXG4gIHBlbmd1aW5fb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHBlbmd1aW5fb3B0Z3JvdXAubGFiZWwgPSBcItCf0LjQvdCz0LLQuNC90YtcIlxyXG5cclxuICB2YXIgc2hpZWxkX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHNoaWVsZF9vcHRncm91cC5pZCA9IFwic2hpZWxkX29wdGdyb3VwXCJcclxuICBzaGllbGRfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHNoaWVsZF9vcHRncm91cC5sYWJlbCA9IFwi0KHQutCy0LDQtNC+0LLRhtGLXCJcclxuXHJcbiAgdmFyIHN3b3JkX29wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xyXG4gIHN3b3JkX29wdGdyb3VwLmlkID0gXCJzd29yZF9vcHRncm91cFwiXHJcbiAgc3dvcmRfb3B0Z3JvdXAuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXJfb3B0Z3JvdXBcIlxyXG4gIHN3b3JkX29wdGdyb3VwLmxhYmVsID0gXCLQnNC10YfQuFwiXHJcblxyXG4gIHZhciBtdXRhbnRfb3B0Z3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0Z3JvdXBcIik7XHJcbiAgbXV0YW50X29wdGdyb3VwLmlkID0gXCJtdXRhbnRfb3B0Z3JvdXBcIlxyXG4gIG11dGFudF9vcHRncm91cC5jbGFzc05hbWUgPSBcImNoYXJhY3Rlcl9vcHRncm91cFwiXHJcbiAgbXV0YW50X29wdGdyb3VwLmxhYmVsID0gXCLQnNGD0YLQsNC90YLRi1wiXHJcblxyXG4gIHZhciBhbmltYV9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBhbmltYV9vcHRncm91cC5pZCA9IFwiYW5pbWFfb3B0Z3JvdXBcIlxyXG4gIGFuaW1hX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBhbmltYV9vcHRncm91cC5sYWJlbCA9IFwi0JfQstC10YDQuFwiXHJcblxyXG4gIHZhciBvdGhlcl9vcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcclxuICBvdGhlcl9vcHRncm91cC5pZCA9IFwib3RoZXJfb3B0Z3JvdXBcIlxyXG4gIG90aGVyX29wdGdyb3VwLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyX29wdGdyb3VwXCJcclxuICBvdGhlcl9vcHRncm91cC5sYWJlbCA9IFwi0J7RgdGC0LDQu9GM0L3Ri9C1XCJcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IGNoYXJhY3Rlcl9saXN0W2ldO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpO1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9ncm91cCA9IGdyb3VwX2xpc3RbaV1cclxuICAgIHN3aXRjaChjaGFyYWN0ZXJfZ3JvdXApIHtcclxuICAgICAgY2FzZSBcInBsYXllclwiOlxyXG4gICAgICAgIHBsYXllcnNfb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwicGVuZ3VpblwiOlxyXG4gICAgICAgIHBlbmd1aW5fb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwic2hpZWxkXCI6XHJcbiAgICAgICAgc2hpZWxkX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInN3b3JkXCI6XHJcbiAgICAgICAgc3dvcmRfb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibXV0YW50XCI6XHJcbiAgICAgICAgbXV0YW50X29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImFuaW1hXCI6XHJcbiAgICAgICAgYW5pbWFfb3B0Z3JvdXAuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIG90aGVyX29wdGdyb3VwLmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG4gIGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG4gIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcbiAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyX2Nob3NlblwiKS52YWx1ZSk7XHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX2NoYXJhY3Rlcic7XHJcbiAgICB0b1NlbmQuY2VsbF9pZCA9IGJ1dHRvbi5ib2FyZF9pbmRleDtcclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlciArIDE7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBjaGFyYWN0ZXJfbGlzdFtjaGFyYWN0ZXJfbnVtYmVyXTtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgICBjbGVhcl9jb250YWluZXJzKDApXHJcbiAgfVxyXG5cclxuICBzZWxlY3QuYXBwZW5kKHBsYXllcnNfb3B0Z3JvdXApO1xyXG4gIHNlbGVjdC5hcHBlbmQoc2hpZWxkX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKHN3b3JkX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKG11dGFudF9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChhbmltYV9vcHRncm91cCk7XHJcbiAgc2VsZWN0LmFwcGVuZChwZW5ndWluX29wdGdyb3VwKTtcclxuICBzZWxlY3QuYXBwZW5kKG90aGVyX29wdGdyb3VwKTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHNlbGVjdCk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChidXR0b24pO1xyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9ic3RhY2xlX251bWJlcl90b19ib2FyZF9udW1iZXIob2JzdGFjbGVfbnVtYmVyKSB7XHJcbiAgcmV0dXJuIC0xKihvYnN0YWNsZV9udW1iZXIgKyAxKTtcclxufVxyXG5cclxuLy8gUGljdHVyZS9hdmF0YXIgbWFuYWdlbWVudFxyXG5cclxuZnVuY3Rpb24gc3Bpcml0X2ltYWdlKGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICByZXR1cm4gU1BJUklUX0lNQUdFO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcm1vcl9pbWFnZShjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgcmV0dXJuIEFSTU9SX0lNQUdFO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dPclBpYyhjZWxsX2lkKSB7XHJcbiAgdmFyIHBpY3R1cmVfbmFtZSA9IEZPR19JTUFHRTtcclxuICBpZiAoKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2NlbGxfaWRdICE9IDEpfHwobXlfcm9sZSA9PSAnZ20nKSkge1xyXG4gICAgdmFyIGNoYXJfaWQgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NlbGxfaWRdXHJcbiAgICBwaWN0dXJlX25hbWUgPSBnZXRfb2JqZWN0X3BpY3R1cmUoY2hhcl9pZCk7XHJcbiAgICBpZiAoY2hhcl9pZCA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyX2lkXSAhPSBcImFsbFwiICYmIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcl9pZF0gIT0gbXlfbmFtZSkge1xyXG4gICAgICBwaWN0dXJlX25hbWUgPSBnZXRfb2JqZWN0X3BpY3R1cmUoMCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuICByZXR1cm4gcGljdHVyZV9uYW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5Rm9nKCkge1xyXG5cdGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuXHR2YXIgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIGluZm8uaW5uZXJIVE1MID0gJ9Cc0Ysg0L3QtSDQt9C90LDQtdC8LCDRh9GC0L4g0Y3RgtC+INGC0LDQutC+0LUuINCV0YHQu9C4INCx0Ysg0LzRiyDQt9C90LDQu9C4INGH0YLQviDRjdGC0L4g0YLQsNC60L7QtSwg0L3QviDQvNGLINC90LUg0LfQvdCw0LXQvC4nO1xyXG5cclxuXHR2YXIgZm9nX3BpY3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIGZvZ19waWN0dXJlLnNyYyA9IFFVRVNUSU9OX0lNQUdFO1xyXG4gIGZvZ19waWN0dXJlLnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBmb2dfcGljdHVyZS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuXHRjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGluZm8pO1xyXG5cdGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoZm9nX3BpY3R1cmUpO1xyXG5cclxudGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfb2JqZWN0X3BpY3R1cmUoaW5kZXhfaW5fYm9hcmRfc3RhdGUpIHtcclxuICB2YXIgaW1hZ2UgPSBFTVBUWV9DRUxMX1BJQztcclxuICB2YXIgaW5kZXhfaW5fYmFzZTtcclxuICBpZiAoaW5kZXhfaW5fYm9hcmRfc3RhdGUgPiAwKSB7XHJcbiAgICBpbmRleF9pbl9iYXNlID0gaW5kZXhfaW5fYm9hcmRfc3RhdGU7XHJcbiAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baW5kZXhfaW5fYmFzZV07XHJcbiAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwiY2hpYmlfYXZhdGFyXCIpKSB7XHJcbiAgICAgIGltYWdlID0gY2hhcmFjdGVyLmNoaWJpX2F2YXRhcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGltYWdlID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGluZGV4X2luX2JvYXJkX3N0YXRlIDwgMCkge1xyXG4gICAgaW5kZXhfaW5fYmFzZSA9IGluZGV4X2luX2JvYXJkX3N0YXRlICogKC0xKTtcclxuICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9baW5kZXhfaW5fYmFzZV07XHJcbiAgICBpbWFnZSA9IG9ic3RhY2xlLmF2YXRhcjtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbWFnZTtcclxufVxyXG5cclxuLy8gTW92ZSAtIERlbGV0ZSAtIFNlbGVjdFxyXG5cclxuZnVuY3Rpb24gbW92ZV9jaGFyYWN0ZXIodG9faW5kZXgsIHRvX2NlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwOyAvLyBlbmQgdGhlIG1vdGlvblxyXG4gIHZhciBjaG9zZW5faW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG5cclxuICB2YXIgZGlzdGFuY2UgPSBmaW5kRGlzdGFuY2UodG9faW5kZXgsIGNob3Nlbl9pbmRleClcclxuICB2YXIgbWF4X2Rpc3RhbmNlID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdXHJcblxyXG4gIGlmIChkaXN0YW5jZSA8PSBtYXhfZGlzdGFuY2UpIHtcclxuICAgIGlmICghKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxICYmIGRpc3RhbmNlID4gMS42KSkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ21vdmVfY2hhcmFjdGVyJztcclxuICAgICAgdG9TZW5kLmZyb21faW5kZXggPSBjaG9zZW5faW5kZXg7XHJcbiAgICAgIHRvU2VuZC50b19pbmRleCA9IHRvX2luZGV4O1xyXG4gICAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXg7XHJcbiAgICAgIHRvU2VuZC5jaGFyYWN0ZXJfYXZhdGFyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uYXZhdGFyO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQuZGlzdGFuY2UgPSBkaXN0YW5jZVxyXG4gICAgICB0b1NlbmQubGVmdF9zaGllbGQgPSAwXHJcbiAgICAgIHRvU2VuZC5taW5lc19leHBsb2RlZCA9IFtdXHJcbiAgICAgIHRvU2VuZC5taW5lc19kYW1hZ2UgPSAwXHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcImZvcmNlX2ZpZWxkX3RhcmdldFwiKSkge1xyXG4gICAgICAgIHZhciBzaGllbGRfaW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmZvcmNlX2ZpZWxkX3RhcmdldC5zaGllbGRfaW5kZXhcclxuICAgICAgICBpZighZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5jZWxsc19wcm90ZWN0ZWQuaW5jbHVkZXModG9faW5kZXgpKSB7Ly8g0L/QvtC60LjQvdGD0Lsg0LfQvtC90YMg0LfQsNGJ0LjRgtGLXHJcbiAgICAgICAgICB0b1NlbmQubGVmdF9zaGllbGQgPSAxXHJcbiAgICAgICAgICB0b1NlbmQuc2hpZWxkX2luZGV4ID0gc2hpZWxkX2luZGV4XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkID0gW107XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdICE9IFwiYWxsXCIpIHsvL3VzZXIgaXMgaW52aXNpYmxlXHJcbiAgICAgICAgdmFyIGltbWVkaWF0ZV9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIDEpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1tZWRpYXRlX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSAhPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4KSB7Ly8gdGhlcmUgYXJlIGNoYXJhY3RlcnMgdGhlcmVcclxuICAgICAgICAgICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkLnB1c2goY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgIHZhciBleHRlbmRlZF9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIGludmlzaWJpbGl0eV9kZXRlY3Rpb25fcmFkaXVzKTtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXh0ZW5kZWRfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dICE9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgpIHsvLyB0aGVyZSBhcmUgY2hhcmFjdGVycyB0aGVyZVxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfY2hhcl9udW0gPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV07XHJcbiAgICAgICAgICAgICAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjdXJyZW50X2NoYXJfbnVtXS5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvbGwgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgICB0b1NlbmQuaW52aXNpYmlsaXR5X2VuZGVkX2lkLnB1c2goY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXModG9faW5kZXgpKSB7XHJcbiAgICAgICAgdG9TZW5kLm1pbmVzX2V4cGxvZGVkLnB1c2godG9faW5kZXgpXHJcbiAgICAgICAgdG9TZW5kLm1pbmVzX2RhbWFnZSA9IHRvU2VuZC5taW5lc19kYW1hZ2UgKyByb2xsX3gobWluZXNfMF9kaXN0YW5jZV9kYW1hZ2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgaW1tZWRpYXRlX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgMSk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1tZWRpYXRlX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gPiAwICYmIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCkgey8vIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIHRoZXJlXHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2dhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV1dICE9IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMoaW1tZWRpYXRlX25iaFtpXSkgJiYgaW1tZWRpYXRlX25iaFtpXSAhPSB0b19pbmRleCkge1xyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZXhwbG9kZWQucHVzaChpbW1lZGlhdGVfbmJoW2ldKVxyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZGFtYWdlID0gdG9TZW5kLm1pbmVzX2RhbWFnZSArIHJvbGxfeChtaW5lc18xX2Rpc3RhbmNlX2RhbWFnZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBvbmVfYW5kX2hhbGZfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCAxLjYpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9uZV9hbmRfaGFsZl9uYmgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMob25lX2FuZF9oYWxmX25iaFtpXSkgJiYgKCFpbW1lZGlhdGVfbmJoLmluY2x1ZGVzKG9uZV9hbmRfaGFsZl9uYmhbaV0pKSkge1xyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZXhwbG9kZWQucHVzaChvbmVfYW5kX2hhbGZfbmJoW2ldKVxyXG4gICAgICAgICAgICB0b1NlbmQubWluZXNfZGFtYWdlID0gdG9TZW5kLm1pbmVzX2RhbWFnZSArIHJvbGxfeChtaW5lc18xcDVfZGlzdGFuY2VfZGFtYWdlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGV4dGVuZGVkX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgaW52aXNpYmlsaXR5X2RldGVjdGlvbl9yYWRpdXMpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4dGVuZGVkX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dICE9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXggJiYgKCFpbW1lZGlhdGVfbmJoLmluY2x1ZGVzKGV4dGVuZGVkX25iaFtpXSkpKSB7Ly8gdGhlcmUgYXJlIGNoYXJhY3RlcnMgdGhlcmVcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRfY2hhcl9udW0gPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV07XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2N1cnJlbnRfY2hhcl9udW1dICE9IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgICB2YXIgcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludChjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICAgICAgICAgIGlmIChyb2xsID4gMTApIHtcclxuICAgICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChjdXJyZW50X2NoYXJfbnVtKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY2xlYXJfY29udGFpbmVycygpO1xyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgICAgIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IHRvX2luZGV4XHJcbiAgICAgIHZhciB0b19jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHRvX2luZGV4KTtcclxuICAgICAgY2hhcmFjdGVyX2Nob3Nlbi5jZWxsID0gdG9fY2VsbFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQkiDQsdC+0Y4g0L3Rg9C20L3QviDQtNCy0LjQs9Cw0YLRjNGB0Y8g0L/QvtGB0YLRg9C/0LDRgtC10LvRjNC90L4gKDEtMiDQutC70LXRgtC60LgpXCIpXHJcbiAgICAgIHVuZG9fc2VsZWN0aW9uKClcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQn9C+0LvQtdCz0YfQtSwg0LzRgdGM0LUg0JHQvtC70YJcIilcclxuICAgIHVuZG9fc2VsZWN0aW9uKClcclxuICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfY2hhcmFjdGVyKGluZGV4LCBjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2RlbGV0ZV9vYmplY3QnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZV93ZWFwb24oY2hhcmFjdGVyX251bWJlciwgd2VhcG9uX2luZGV4KSB7XHJcbiAgY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW2NoYXJhY3Rlcl9udW1iZXJdID0gd2VhcG9uX2luZGV4XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi53ZWFwb25faWQgPSB3ZWFwb25faW5kZXhcclxuXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW3dlYXBvbl9pbmRleF1cclxuXHJcbiAgdmFyIHdlYXBvbl9taW5pX2Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXBvbl9taW5pX2Rpc3BsYXlcIik7XHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5zcmMgPSB3ZWFwb24uYXZhdGFyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5X3dlYXBvbl9kZXRhaWxlZCh3ZWFwb25faW5kZXgsIGNvbnRhaW5lciwgc2hvd0ltYWdlKSB7XHJcbiAgdmFyIGRlZmF1bHRfd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bd2VhcG9uX2luZGV4XVxyXG5cclxuICB2YXIgd2VhcG9uX3JhbmdlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgd2VhcG9uX3JhbmdlX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9yYW5nZV9kaXNwbGF5XCI7XHJcbiAgd2VhcG9uX3JhbmdlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQlNCw0LvRjNC90L7RgdGC0Yw6IFwiICsgZGVmYXVsdF93ZWFwb24ucmFuZ2VcclxuXHJcbiAgdmFyIHdlYXBvbl9kYW1hZ2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9kYW1hZ2VfZGlzcGxheVwiO1xyXG4gIHdlYXBvbl9kYW1hZ2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCj0YDQvtC9OiBcIiArIGRlZmF1bHRfd2VhcG9uLmRhbWFnZVswXSArICdkJyArIGRlZmF1bHRfd2VhcG9uLmRhbWFnZVsxXVxyXG5cclxuICB2YXIgd2VhcG9uX25hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB3ZWFwb25fbmFtZV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fbmFtZV9kaXNwbGF5XCI7XHJcbiAgd2VhcG9uX25hbWVfZGlzcGxheS5pbm5lckhUTUwgPSBkZWZhdWx0X3dlYXBvbi5uYW1lXHJcblxyXG4gIGlmIChzaG93SW1hZ2UpIHtcclxuICAgIHZhciB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fYXZhdGFyX2Rpc3BsYXlcIlxyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LnNyYyA9IGRlZmF1bHRfd2VhcG9uLmF2YXRhcjtcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuICB9XHJcbiAgY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fbmFtZV9kaXNwbGF5KVxyXG4gIGlmIChzaG93SW1hZ2UpIHtcclxuICAgIGNvbnRhaW5lci5hcHBlbmQod2VhcG9uX2F2YXRhcl9kaXNwbGF5KVxyXG4gIH1cclxuICBjb250YWluZXIuYXBwZW5kKHdlYXBvbl9yYW5nZV9kaXNwbGF5KVxyXG4gIGNvbnRhaW5lci5hcHBlbmQod2VhcG9uX2RhbWFnZV9kaXNwbGF5KVxyXG4gIGNvbnRhaW5lci5zaG93KClcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheV9hcm1vcl9kZXRhaWxlZChjaGFyYWN0ZXJfbnVtYmVyLCBjb250YWluZXIpIHtcclxuICB2YXIgS0RfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB2YXIgS0RfdmFsdWUgPSBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtjaGFyYWN0ZXJfbnVtYmVyXSlcclxuICBLRF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JrQlDogXCIgKyBLRF92YWx1ZTtcclxuXHJcbiAgdmFyIG1lbGVlX3Jlc2lzdF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHZhciBtZWxlZV9yZXNpc3QgPSBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfcmVzaXN0W2NoYXJhY3Rlcl9udW1iZXJdKjEwMDtcclxuICBtZWxlZV9yZXNpc3RfZGlzcGxheS5pbm5lckhUTUwgPSBcItCc0LjQu9C70Lgg0YDQtdC30LjRgdGCOiBcIiArIG1lbGVlX3Jlc2lzdCArIFwiJVwiO1xyXG5cclxuICB2YXIgYnVsbGV0X3Jlc2lzdF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHZhciBidWxsZXRfcmVzaXN0ID0gY2hhcmFjdGVyX3N0YXRlLmJ1bGxldF9yZXNpc3RbY2hhcmFjdGVyX251bWJlcl0qMTAwO1xyXG4gIGJ1bGxldF9yZXNpc3RfZGlzcGxheS5pbm5lckhUTUwgPSBcItCh0YLRgNC10LvQutC+0LLRi9C5INGA0LXQt9C40YHRgjogXCIgKyBidWxsZXRfcmVzaXN0ICsgXCIlXCI7XHJcblxyXG4gIHZhciBldmFkZV9ib251c19kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGV2YWRlX2JvbnVzX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQo9C60LvQvtC90LXQvdC40LU6IFwiICsgY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICB2YXIgZGVmZW5zaXZlX2FkdmFudGFnZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGRlZmVuc2l2ZV9hZHZhbnRhZ2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCj0Y/Qt9Cy0LjQvNC+0YHRgtGMOiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBjb250YWluZXIuYXBwZW5kKEtEX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmQobWVsZWVfcmVzaXN0X2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmQoYnVsbGV0X3Jlc2lzdF9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kKGV2YWRlX2JvbnVzX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmQoZGVmZW5zaXZlX2FkdmFudGFnZV9kaXNwbGF5KTtcclxuICBjb250YWluZXIuc2hvdygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5X3NwaXJpdF9kZXRhaWxlZChjaGFyYWN0ZXJfbnVtYmVyLCBjb250YWluZXIpIHtcclxuICB2YXIgYXR0YWNrX2JvbnVzX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgYXR0YWNrX2JvbnVzX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQkdC+0L3Rg9GBINCw0YLQsNC60Lg6IFwiICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tjaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgdmFyIGRhbWFnZV9ib251c19kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGRhbWFnZV9ib251c19kaXNwbGF5LmlubmVySFRNTCA9IFwi0JHQvtC90YPRgSDRg9GA0L7QvdCwOiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIHZhciB1bml2ZXJzYWxfYm9udXNfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB1bml2ZXJzYWxfYm9udXNfZGlzcGxheS5pbm5lckhUTUwgPSBcItCS0YHQtdC+0LHRidC40Lkg0LHQvtC90YPRgTogXCIgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICB2YXIgbWVsZWVfYWR2YW50YWdlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgbWVsZWVfYWR2YW50YWdlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCJNZWxlZSBhZHY6IFwiICsgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgdmFyIHJhbmdlZF9hZHZhbnRhZ2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICByYW5nZWRfYWR2YW50YWdlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCJSYW5nZWQgYWR2OiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBjb250YWluZXIuYXBwZW5kKGF0dGFja19ib251c19kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kKGRhbWFnZV9ib251c19kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kKHVuaXZlcnNhbF9ib251c19kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kKG1lbGVlX2FkdmFudGFnZV9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kKHJhbmdlZF9hZHZhbnRhZ2VfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLnNob3coKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0X2NoYXJhY3RlcihpbmRleCwgY2VsbCkge1xyXG4gIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuXHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gXCJhbGxcIiB8fCBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IG15X25hbWUpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24gPSBpbmRleFxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2VsbCA9IGNlbGxcclxuXHJcbiAgbGV0IG5hbWUgPSBjaGFyYWN0ZXIubmFtZTtcclxuICBsZXQgYXZhdGFyID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuXHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIHZhciBuYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IG5hbWU7XHJcblxyXG4gIHZhciBhdmF0YXJfY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICB2YXIgYXZhdGFyX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnNyYyA9IGF2YXRhcjtcclxuICBhdmF0YXJfZGlzcGxheS5jbGFzc0xpc3QuYWRkKFwiYXZhdGFyXCIpO1xyXG5cclxuICBhdmF0YXJfY29udGFpbmVyLmFwcGVuZENoaWxkKGF2YXRhcl9kaXNwbGF5KVxyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKG5hbWVfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChhdmF0YXJfY29udGFpbmVyKTtcclxuXHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiIHx8IGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IDEpIHtcclxuXHJcbiAgICBhdmF0YXJfZGlzcGxheS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNob3dfbW9kYWwoY2hhcmFjdGVyX251bWJlciwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXZhdGFyX2Rpc3BsYXkub25tb3VzZWVudGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgICAgIHZhciBtYWluX2FjdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgYm9udXNfYWN0aW9uID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbW92ZV9hY3Rpb24gPSBNYXRoLmZsb29yKGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSlcclxuXHJcbiAgICAgIHZhciBtYWluX2FjdGlvbl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICBtYWluX2FjdGlvbl9kaXNwbGF5LmlkID0gXCJtYWluX2FjdGlvbl9kaXNwbGF5XCI7XHJcbiAgICAgIG1haW5fYWN0aW9uX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQntGB0L3QvtCy0L3Ri9GFOiBcIiArIG1haW5fYWN0aW9uXHJcblxyXG4gICAgICB2YXIgYm9udXNfYWN0aW9uX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgIGJvbnVzX2FjdGlvbl9kaXNwbGF5LmlkID0gXCJib251c19hY3Rpb25fZGlzcGxheVwiO1xyXG4gICAgICBib251c19hY3Rpb25fZGlzcGxheS5pbm5lckhUTUwgPSBcItCR0L7QvdGD0YHQvdGL0YU6IFwiICsgYm9udXNfYWN0aW9uXHJcblxyXG4gICAgICB2YXIgbW92ZV9hY3Rpb25fZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgbW92ZV9hY3Rpb25fZGlzcGxheS5pZCA9IFwibW92ZV9hY3Rpb25fZGlzcGxheVwiO1xyXG4gICAgICBtb3ZlX2FjdGlvbl9kaXNwbGF5LmlubmVySFRNTCA9IFwi0J/QtdGA0LXQtNCy0LjQttC10L3QuNC1OiBcIiArIG1vdmVfYWN0aW9uXHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSAhPSBcImFsbFwiKSB7Ly8g0LIg0LjQvdCy0LjQt9C1XHJcbiAgICAgICAgdmFyIGludmlzZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICAgICAgICBpbnZpc2VfZGlzcGxheS5zcmMgPSBJTlZJU0VfSU1BR0U7XHJcbiAgICAgICAgaW52aXNlX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xyXG4gICAgICAgIGludmlzZV9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzUwcHgnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSkgey8vICDQn9GA0LjRhtC10LvQtdC9XHJcbiAgICAgICAgdmFyIGFpbV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICAgICAgICBhaW1fZGlzcGxheS5zcmMgPSBBSU1fSU1BR0U7XHJcbiAgICAgICAgYWltX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xyXG4gICAgICAgIGFpbV9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzUwcHgnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKG1haW5fYWN0aW9uX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYm9udXNfYWN0aW9uX2Rpc3BsYXkpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQobW92ZV9hY3Rpb25fZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChpbnZpc2VfZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChhaW1fZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLnNob3coKVxyXG4gICAgfVxyXG5cclxuICAgIGF2YXRhcl9kaXNwbGF5Lm9ubW91c2VsZWF2ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5oaWRlKClcclxuICAgIH1cclxuXHJcbiAgdmFyIHN0cmVuZ3RoX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgc3RyZW5ndGhfZGlzcGxheS5pbm5lckhUTUwgPSBcIkPQuNC70LA6IFwiICsgY2hhcmFjdGVyLnN0cmVuZ3RoO1xyXG5cclxuICB2YXIgc3RhbWluYV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHN0YW1pbmFfZGlzcGxheS5pbm5lckhUTUwgPSBcItCi0LXQu9C+0YHQu9C+0LbQtdC90LjQtTogXCIgKyBjaGFyYWN0ZXIuc3RhbWluYTtcclxuXHJcbiAgdmFyIGFnaWxpdHlfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBhZ2lsaXR5X2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQm9C+0LLQutC+0YHRgtGMOiBcIiArIGNoYXJhY3Rlci5hZ2lsaXR5O1xyXG5cclxuICB2YXIgaW50ZWxsaWdlbmNlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgaW50ZWxsaWdlbmNlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQmNC90YLQtdC70LvQtdC60YI6IFwiICsgY2hhcmFjdGVyLmludGVsbGlnZW5jZTtcclxuXHJcbiAgdmFyIGhwX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSkvcGFyc2VGbG9hdChIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKVxyXG4gIGhwX3BlcmNlbnQgPSBNYXRoLmZsb29yKGhwX3BlcmNlbnQqMTAwKVxyXG5cclxuICB2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBIUF9kaXNwbGF5LmlkID0gXCJIUF9kaXNwbGF5XCI7XHJcbiAgSFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdICsgXCIgKFwiICsgaHBfcGVyY2VudCArIFwiJSlcIjtcclxuXHJcbiAgdmFyIHRpcmVkX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSlcclxuICB0aXJlZF9wZXJjZW50ID0gTWF0aC5mbG9vcih0aXJlZF9wZXJjZW50KjEwMClcclxuXHJcbiAgdmFyIHRpcmVkX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgdGlyZWRfZGlzcGxheS5pZCA9IFwidGlyZWRfZGlzcGxheVwiO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQktGL0L3QvtGB0LvQuNCy0L7RgdGC0Yw6IFwiICsgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0gKyBcIiAoXCIgKyB0aXJlZF9wZXJjZW50ICsgXCIlKVwiO1xyXG5cclxuICB2YXIgaW5pdGlhdGl2ZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGluaXRpYXRpdmVfZGlzcGxheS5pbm5lckhUTUwgPSBcItCY0L3QuNGG0LjQsNGC0LjQstCwOiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHN0cmVuZ3RoX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoc3RhbWluYV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGFnaWxpdHlfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChpbnRlbGxpZ2VuY2VfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChIUF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHRpcmVkX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoaW5pdGlhdGl2ZV9kaXNwbGF5KTtcclxuXHJcbiAgdmFyIG1vdmVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBtb3ZlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCf0LXRgNC10LzQtdGJ0LXQvdC40LVcIjtcclxuICBtb3ZlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIG1vdmVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG4gIG1vdmVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9waWNrZWQgPSBldmVudC50YXJnZXRcclxuICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjaGFyYWN0ZXJfcGlja2VkLmluZGV4XTtcclxuICAgIHZhciBtb3ZlX2FjdGlvbnNfbGVmdCA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgaWYgKG1vdmVfYWN0aW9uc19sZWZ0ID4gMCkge1xyXG4gICAgICBjbGVhcl9jb250YWluZXJzKClcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl90b19tb3ZlKGNoYXJhY3Rlcl9waWNrZWQuaW5kZXgsIGNoYXJhY3Rlcl9waWNrZWQuY2VsbCwgdHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCS0Ysg0L/QvtGC0YDQsNGC0LjQu9C4INCy0YHQtSDQv9C10YDQtdC80LXRidC10L3QuNGPINC90LAg0Y3RgtC+0Lwg0YXQvtC00YMhXCIpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuXHJcbiAgICB2YXIgZGVsZXRlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBkZWxldGVfYnV0dG9uLmlubmVySFRNTCA9IFwi0KPQvdC40YfRgtC+0LbQuNGC0YxcIjtcclxuICAgIGRlbGV0ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICAgIGRlbGV0ZV9idXR0b24uY2VsbCA9IGNlbGw7XHJcbiAgICBkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBkZWxldGVfY2hhcmFjdGVyKGluZGV4LCBjaGFyYWN0ZXJfbnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICB2YXIgdmlzaWJpbGl0eV9tZXNzYWdlID0gXCJcIjtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAwKSB7XHJcbiAgICAgIHZpc2liaWxpdHlfbWVzc2FnZSA9IFwi0J7RgtC60YDRi9GC0Ywg0LTQvtGB0YLRg9C/XCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2aXNpYmlsaXR5X21lc3NhZ2UgPSBcItCX0LDQutGA0YvRgtGMINC00L7RgdGC0YPQv1wiO1xyXG4gICAgfVxyXG4gICAgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbi5pbm5lckhUTUwgPSB2aXNpYmlsaXR5X21lc3NhZ2U7XHJcbiAgICBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHkoY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRhbWFnZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGFtYWdlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCd0LDQvdC10YHRgtC4INGD0YDQvtC9XCI7XHJcbiAgICBkYW1hZ2VfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgICBkYW1hZ2VfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW1hZ2VfZmllbGRcIik7XHJcbiAgICAgIGlmICghKGRhbWFnZV9maWVsZC52YWx1ZSA9PT0gXCJcIikpIHtcclxuICAgICAgICB2YXIgZGFtYWdlID0gcGFyc2VJbnQoZGFtYWdlX2ZpZWxkLnZhbHVlKTtcclxuICAgICAgICB2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiSFBfZGlzcGxheVwiKTtcclxuICAgICAgICB2YXIgbmV3X0hQID0gY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdIC0gZGFtYWdlO1xyXG4gICAgICAgIEhQX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQpdCfOiBcIiArIG5ld19IUDtcclxuXHJcbiAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ2RlYWxfZGFtYWdlJztcclxuICAgICAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICAgIHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBkYW1hZ2VfZmllbGQuaWQgPSBcImRhbWFnZV9maWVsZFwiO1xyXG4gICAgZGFtYWdlX2ZpZWxkLnR5cGUgPSBcIm51bWJlclwiO1xyXG4gICAgZGFtYWdlX2ZpZWxkLnBsYWNlaG9sZGVyID0gXCLQo9GA0L7QvVwiO1xyXG5cclxuICAgIHZhciBlZmZlY3Rfc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICAgIGVmZmVjdF9zZWxlY3QuaWQgPSBcImVmZmVjdF9zZWxlY3RcIjtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVmZmVjdF9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IGVmZmVjdF9saXN0W2ldO1xyXG4gICAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICAgIGVmZmVjdF9zZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBlZmZlY3RfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGVmZmVjdF9idXR0b24uaW5uZXJIVE1MID0gXCLQn9GA0LjQvNC10L3QuNGC0Ywg0Y3RhNGE0LXQutGCXCI7XHJcbiAgICBlZmZlY3RfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICB2YXIgZWZmZWN0X3NlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWZmZWN0X3NlbGVjdFwiKTtcclxuICAgICAgdmFyIGVmZmVjdF9pbmRleCA9IGVmZmVjdF9zZWxlY3QudmFsdWU7XHJcbiAgICAgIHNlbmRfZWZmZWN0X2NvbW1hbmQoY2hhcmFjdGVyX251bWJlciwgZWZmZWN0X2luZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciBzZWFyY2hfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBzZWFyY2hfYnV0dG9uLmlubmVySFRNTCA9IFwi0J7QsdGL0YHQutCw0YLRjFwiO1xyXG4gIHNlYXJjaF9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBzZWFyY2hfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgc2VhcmNoX2FjdGlvbihldmVudC50YXJnZXQpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHNpbXBsZV9yb2xsX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgc2ltcGxlX3JvbGxfYnV0dG9uLmlubmVySFRNTCA9IFwi0J/RgNC+0YHRgtC+IGQyMFwiO1xyXG4gIHNpbXBsZV9yb2xsX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciByb2xsID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHRvU2VuZCA9IHt9XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9IFwic2ltcGxlX3JvbGxcIlxyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gY2hhcmFjdGVyLm5hbWVcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb21cclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbFxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG5cclxuICB2YXIgaW52ZW50b3J5ID0gY2hhcmFjdGVyLmludmVudG9yeVxyXG5cclxuICB2YXIgZGVmYXVsdF93ZWFwb25faW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bY2hhcmFjdGVyX251bWJlcl1cclxuICBjaGFyYWN0ZXJfY2hvc2VuLndlYXBvbl9pZCA9IGRlZmF1bHRfd2VhcG9uX2luZGV4XHJcbiAgdmFyIGRlZmF1bHRfd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bZGVmYXVsdF93ZWFwb25faW5kZXhdXHJcblxyXG4gIHZhciB3ZWFwb25fbWluaV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fbWluaV9kaXNwbGF5XCJcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LnNyYyA9IGRlZmF1bHRfd2VhcG9uLmF2YXRhcjtcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJtaW5pX2Rpc3BsYXlcIik7XHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5vbm1vdXNlZW50ZXIgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgIHZhciB3ZWFwb25faW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgIGRpc3BsYXlfd2VhcG9uX2RldGFpbGVkKHdlYXBvbl9pbmRleCwgd2VhcG9uX2luZm9fY29udGFpbmVyLCB0cnVlKVxyXG4gIH1cclxuXHJcbiAgd2VhcG9uX21pbmlfZGlzcGxheS5vbm1vdXNlbGVhdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5oaWRlKClcclxuICB9XHJcblxyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKG15X3JvbGUgPT0gXCJnbVwiIHx8IGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IDEpIHtcclxuICAgICAgc2hvd193ZWFwb25fbW9kYWwoY2hhcmFjdGVyX251bWJlciwgMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhdmF0YXJfY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fbWluaV9kaXNwbGF5KVxyXG5cclxuICB2YXIgYXJtb3JfbWluaV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBhcm1vcl9taW5pX2Rpc3BsYXkuaWQgPSBcImFybW9yX21pbmlfZGlzcGxheVwiO1xyXG4gIGFybW9yX21pbmlfZGlzcGxheS5zcmMgPSBhcm1vcl9pbWFnZShjaGFyYWN0ZXJfbnVtYmVyKTtcclxuICBhcm1vcl9taW5pX2Rpc3BsYXkuY2xhc3NMaXN0LmFkZChcIm1pbmlfZGlzcGxheVwiKTtcclxuICBhcm1vcl9taW5pX2Rpc3BsYXkub25tb3VzZWVudGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgICBkaXNwbGF5X2FybW9yX2RldGFpbGVkKGNoYXJhY3Rlcl9udW1iZXIsIHdlYXBvbl9pbmZvX2NvbnRhaW5lcilcclxuICB9XHJcblxyXG4gIGFybW9yX21pbmlfZGlzcGxheS5vbm1vdXNlbGVhdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5oaWRlKClcclxuICB9XHJcblxyXG4gIGF2YXRhcl9jb250YWluZXIuYXBwZW5kKGFybW9yX21pbmlfZGlzcGxheSlcclxuXHJcbiAgdmFyIHNwaXJpdF9taW5pX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIHNwaXJpdF9taW5pX2Rpc3BsYXkuaWQgPSBcInNwaXJpdF9taW5pX2Rpc3BsYXlcIjtcclxuICBzcGlyaXRfbWluaV9kaXNwbGF5LnNyYyA9IHNwaXJpdF9pbWFnZShjaGFyYWN0ZXJfbnVtYmVyKTtcclxuICBzcGlyaXRfbWluaV9kaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJtaW5pX2Rpc3BsYXlcIik7XHJcbiAgc3Bpcml0X21pbmlfZGlzcGxheS5vbm1vdXNlZW50ZXIgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgIGRpc3BsYXlfc3Bpcml0X2RldGFpbGVkKGNoYXJhY3Rlcl9udW1iZXIsIHdlYXBvbl9pbmZvX2NvbnRhaW5lcilcclxuICB9XHJcblxyXG4gIHNwaXJpdF9taW5pX2Rpc3BsYXkub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuaGlkZSgpXHJcbiAgfVxyXG5cclxuICBhdmF0YXJfY29udGFpbmVyLmFwcGVuZChzcGlyaXRfbWluaV9kaXNwbGF5KVxyXG5cclxuICB2YXIgYXR0YWNrX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYXR0YWNrX2J1dHRvbi5pbm5lckhUTUwgPSBcItCQ0YLQsNC60L7QstCw0YLRjFwiO1xyXG4gIGF0dGFja19idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgbWFpbl9hY3Rpb25zX2xlZnQgPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgIGlmIChtYWluX2FjdGlvbnNfbGVmdCA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl90b19hdHRhY2soY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0KMg0LLQsNGBINC90LUg0L7RgdGC0LDQu9C+0YHRjCDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIHNraWxsc2V0ID0gY2hhcmFjdGVyLnNraWxsc2V0XHJcblxyXG4gIHZhciBidXR0b25fbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICBidXR0b25fbGlzdC5jbGFzc05hbWUgPSBcImJ1dHRvbl9saXN0XCI7XHJcbiAgdmFyIGxpbmUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lOCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmUxMCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuXHJcbiAgbGluZTEuYXBwZW5kQ2hpbGQobW92ZV9idXR0b24pO1xyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgbGluZTIuYXBwZW5kQ2hpbGQoZGVsZXRlX2J1dHRvbik7XHJcbiAgICBsaW5lMy5hcHBlbmRDaGlsZChkYW1hZ2VfYnV0dG9uKTtcclxuICAgIGxpbmUzLmFwcGVuZENoaWxkKGRhbWFnZV9maWVsZCk7XHJcbiAgICBsaW5lOC5hcHBlbmRDaGlsZChjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfYnV0dG9uKTtcclxuICAgIGxpbmU5LmFwcGVuZENoaWxkKGVmZmVjdF9zZWxlY3QpO1xyXG4gICAgbGluZTEwLmFwcGVuZENoaWxkKGVmZmVjdF9idXR0b24pO1xyXG4gIH1cclxuICBsaW5lNC5hcHBlbmRDaGlsZChzZWFyY2hfYnV0dG9uKTtcclxuICBsaW5lNi5hcHBlbmRDaGlsZChhdHRhY2tfYnV0dG9uKTtcclxuICBsaW5lNy5hcHBlbmRDaGlsZChzaW1wbGVfcm9sbF9idXR0b24pO1xyXG5cclxuXHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTEpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU0KTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNik7XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTcpO1xyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTIpO1xyXG4gICAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTMpO1xyXG4gICAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTgpO1xyXG4gICAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTkpO1xyXG4gICAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTEwKTtcclxuICB9XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uX2xpc3QpO1xyXG5cclxufSBlbHNlIHtcclxuICB2YXIgaHBfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgaHBfcGVyY2VudCA9IE1hdGguZmxvb3IoaHBfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIEhQX2Rpc3BsYXkuaWQgPSBcIkhQX2Rpc3BsYXlcIjtcclxuICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBocF9wZXJjZW50ICsgXCIlXCI7XHJcblxyXG4gIHZhciB0aXJlZF9wZXJjZW50ID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSkvcGFyc2VGbG9hdChzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgdGlyZWRfcGVyY2VudCA9IE1hdGguZmxvb3IodGlyZWRfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciB0aXJlZF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaWQgPSBcInRpcmVkX2Rpc3BsYXlcIjtcclxuICB0aXJlZF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JLRi9C90L7RgdC70LjQstC+0YHRgtGMOiBcIiArIHRpcmVkX3BlcmNlbnQgKyBcIiVcIjtcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChIUF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHRpcmVkX2Rpc3BsYXkpO1xyXG59XHJcblxyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRfZWZmZWN0X2NvbW1hbmQoY2hhcmFjdGVyX251bWJlciwgZWZmZWN0X2luZGV4KSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2FwcGx5X2VmZmVjdCc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuZWZmZWN0X251bWJlciA9IGVmZmVjdF9pbmRleDtcclxuICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIGFsZXJ0KFwi0JLRiyDQv9GA0LjQvNC10L3QuNC70Lgg0Y3RhNGE0LXQutGCXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfb2JqZWN0X2NvbW1hbmQoaW5kZXgpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnZGVsZXRlX29iamVjdCc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlX29iamVjdChldmVudCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICBkZWxldGVfb2JqZWN0X2NvbW1hbmQoZXZlbnQudGFyZ2V0LmluZGV4KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3Rfb2JzdGFjbGUoaW5kZXgsIGNlbGwpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuICB2YXIgb2JzdGFjbGVfaWQgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSAqICgtMSk7XHJcbiAgdmFyIG9ic3RhY2xlID0gb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tvYnN0YWNsZV9pZF07XHJcblxyXG4gIC8vIGtlZXAgdHJhY2sgb2YgbGFzdCBjaG9zZW4gb2JzdGFsZSB0byBxdWlja2x5IGFkZCB0byB0aGUgbWFwXHJcbiAgbGFzdF9vYnN0YWNsZSA9IG9ic3RhY2xlX2lkXHJcblxyXG4gIGxldCBuYW1lID0gb2JzdGFjbGUubmFtZTtcclxuICBsZXQgYXZhdGFyID0gb2JzdGFjbGUuYXZhdGFyO1xyXG5cclxuICB2YXIgbmFtZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIG5hbWVfZGlzcGxheS5pbm5lckhUTUwgPSBuYW1lO1xyXG5cclxuICB2YXIgYXZhdGFyX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnNyYyA9IGF2YXRhcjtcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChuYW1lX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYXZhdGFyX2Rpc3BsYXkpO1xyXG5cclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgIHZhciBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRlbGV0ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQo9C90LjRh9GC0L7QttC40YLRjFwiO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gICAgZGVsZXRlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICAgIGRlbGV0ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGRlbGV0ZV9vYmplY3QoZXZlbnQpO1xyXG4gICAgfVxyXG4gICAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChkZWxldGVfYnV0dG9uKTtcclxuICB9XHJcblxyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShpbmRleCwgY2VsbCwgc2hvd1Zpc3VhbCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDFcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24gPSBpbmRleDtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XTtcclxuICBpZiAoc2hvd1Zpc3VhbCkge1xyXG4gICAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL2xvYWRpbmcud2VicFwiO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdW5kb19zZWxlY3Rpb24oKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyAhPSAwKSB7XHJcbiAgICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwXHJcbiAgICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24pO1xyXG4gICAgb2xkX2NlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93X3dlYXBvbl9tb2RhbChjaGFyYWN0ZXJfbnVtYmVyLCBzdGFydGluZ19pbmRleCkge1xyXG4gIGhpZGVfbW9kYWwoKVxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBpbnZlbnRvcnkgPSBjaGFyYWN0ZXIuaW52ZW50b3J5XHJcblxyXG4gIHZhciB3ZWFwb25fdGFibGUgPSAkKFwiPHRhYmxlPlwiKTtcclxuICB2YXIgdGFibGVfc2l6ZSA9IDNcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZV9zaXplOyBpKyspIHtcclxuICAgIHZhciByb3cgPSAkKFwiPHRyPlwiKTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGFibGVfc2l6ZTsgaisrKSB7XHJcbiAgICAgIHZhciBpbmRleCA9IHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSppICsgalxyXG4gICAgICBpZiAoaW5kZXggPCBpbnZlbnRvcnkubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIHdlYXBvbl9udW1iZXIgPSBpbnZlbnRvcnlbaW5kZXhdXHJcbiAgICAgICAgdmFyIGNvbHVtbiA9ICQoXCI8dGg+XCIpO1xyXG4gICAgICAgIHZhciB3ZWFwb25faWNvbiA9ICQoXCI8SU1HPlwiKTtcclxuICAgICAgICB2YXIgYXZhdGFyID0gUVVFU1RJT05fSU1BR0VcclxuICAgICAgICBpZiAod2VhcG9uX2RldGFpbGVkX2luZm9bd2VhcG9uX251bWJlcl0uaGFzT3duUHJvcGVydHkoJ2F2YXRhcicpKSB7XHJcbiAgICAgICAgICBhdmF0YXIgPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1t3ZWFwb25fbnVtYmVyXS5hdmF0YXJcclxuICAgICAgICB9XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYWRkQ2xhc3MoJ3dlYXBvbl9pY29uJyk7XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYXR0cignd2lkdGgnLCAnMTAwcHgnKTtcclxuICAgICAgICB3ZWFwb25faWNvbi5hdHRyKCd3ZWFwb25fbnVtYmVyJywgd2VhcG9uX251bWJlcik7XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYXR0cignaGVpZ2h0JywgJzEwMHB4Jyk7XHJcbiAgICAgICAgd2VhcG9uX2ljb24uYXR0cignc3JjJywgYXZhdGFyKTtcclxuICAgICAgICB3ZWFwb25faWNvbi5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgdmFyIHdlYXBvbl9udW0gPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCd3ZWFwb25fbnVtYmVyJyk7XHJcbiAgICAgICAgICBjaGFuZ2Vfd2VhcG9uKGNoYXJhY3Rlcl9udW1iZXIsIHdlYXBvbl9udW0pO1xyXG4gICAgICAgICAgaGlkZV9tb2RhbCgpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2VhcG9uX2ljb24ub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgdmFyIHdlYXBvbl9udW0gPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCd3ZWFwb25fbnVtYmVyJyk7XHJcbiAgICAgICAgICBkaXNwbGF5X3dlYXBvbl9kZXRhaWxlZCh3ZWFwb25fbnVtLCBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIsIGZhbHNlKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHdlYXBvbl9pY29uLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5odG1sKCcnKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbHVtbi5hcHBlbmQod2VhcG9uX2ljb24pO1xyXG4gICAgICAgIHJvdy5hcHBlbmQoY29sdW1uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgd2VhcG9uX3RhYmxlLmFwcGVuZChyb3cpO1xyXG4gIH1cclxuICBza2lsbF9tb2RhbF9jb250ZW50LmFwcGVuZCh3ZWFwb25fdGFibGUpO1xyXG5cclxuICBpZiAoaW52ZW50b3J5Lmxlbmd0aCA+IHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSp0YWJsZV9zaXplKSB7Ly8gdGhlcmUgYXJlIG1vcmUgc2tpbGxzIHRvIGRpc3BsYXlcclxuICAgIHZhciBuZXh0X3BhZ2VfYnV0dG9uID0gJChcIjxJTUc+XCIpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCd3aWR0aCcsICcxMDBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdoZWlnaHQnLCAnNTBweCcpO1xyXG4gICAgbmV4dF9wYWdlX2J1dHRvbi5hdHRyKCdzcmMnLCBSSUdIVF9BUlJPV19JTUFHRSk7XHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgc2hvd193ZWFwb25fbW9kYWwoY2hhcmFjdGVyX251bWJlciwgc3RhcnRpbmdfaW5kZXggKyB0YWJsZV9zaXplKnRhYmxlX3NpemUpO1xyXG4gICAgfSlcclxuXHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uX2NvbnRhaW5lci5hcHBlbmQobmV4dF9wYWdlX2J1dHRvbik7XHJcbiAgfVxyXG4gIHNraWxsX21vZGFsLnNob3coKTtcclxuXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93X21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIHN0YXJ0aW5nX2luZGV4KSB7XHJcbiAgaGlkZV9tb2RhbCgpO1xyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBza2lsbHNldCA9IGNoYXJhY3Rlci5za2lsbHNldFxyXG5cclxuICB2YXIgc2tpbGxfdGFibGUgPSAkKFwiPHRhYmxlPlwiKTtcclxuXHJcbiAgdmFyIHRhYmxlX3NpemUgPSAzXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGVfc2l6ZTsgaSsrKSB7XHJcbiAgICB2YXIgcm93ID0gJChcIjx0cj5cIik7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRhYmxlX3NpemU7IGorKykge1xyXG4gICAgICB2YXIgaW5kZXggPSBzdGFydGluZ19pbmRleCArIHRhYmxlX3NpemUqaSArIGpcclxuICAgICAgaWYgKGluZGV4IDwgc2tpbGxzZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIHNraWxsX251bWJlciA9IHNraWxsc2V0W2luZGV4XVxyXG4gICAgICAgIHZhciBjb2x1bW4gPSAkKFwiPHRoPlwiKTtcclxuICAgICAgICB2YXIgc2tpbGxfaWNvbiA9ICQoXCI8SU1HPlwiKTtcclxuICAgICAgICB2YXIgYXZhdGFyID0gUVVFU1RJT05fSU1BR0VcclxuICAgICAgICBpZiAoc2tpbGxfZGV0YWlsZWRfaW5mb1tza2lsbF9udW1iZXJdLmhhc093blByb3BlcnR5KCdhdmF0YXInKSkge1xyXG4gICAgICAgICAgYXZhdGFyID0gc2tpbGxfZGV0YWlsZWRfaW5mb1tza2lsbF9udW1iZXJdLmF2YXRhclxyXG4gICAgICAgIH1cclxuICAgICAgICBza2lsbF9pY29uLmFkZENsYXNzKCdza2lsbF9pY29uJyk7XHJcbiAgICAgICAgc2tpbGxfaWNvbi5hdHRyKCd3aWR0aCcsICcxMDBweCcpO1xyXG4gICAgICAgIHNraWxsX2ljb24uYXR0cignc2tpbGxfbnVtYmVyJywgc2tpbGxfbnVtYmVyKTtcclxuICAgICAgICBza2lsbF9pY29uLmF0dHIoJ2hlaWdodCcsICcxMDBweCcpO1xyXG4gICAgICAgIHNraWxsX2ljb24uYXR0cignc3JjJywgYXZhdGFyKTtcclxuICAgICAgICBza2lsbF9pY29uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICB2YXIgcG9zaXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgcG9zaXRpb24pO1xyXG4gICAgICAgICAgdXNlX3NraWxsKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3NraWxsX251bWJlcicpLCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIGhpZGVfbW9kYWwoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNraWxsX2ljb24ub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLmh0bWwoJycpO1xyXG4gICAgICAgICAgdmFyIHNraWxsX251bWJlciA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3NraWxsX251bWJlcicpO1xyXG4gICAgICAgICAgdmFyIHNraWxsX29iamVjdCA9IHNraWxsX2RldGFpbGVkX2luZm9bc2tpbGxfbnVtYmVyXTtcclxuICAgICAgICAgIHZhciBza2lsbF9uYW1lX29iamVjdCA9ICQoXCI8aDI+XCIpO1xyXG4gICAgICAgICAgdmFyIHNraWxsX25hbWUgPSBza2lsbF9saXN0W3NraWxsX251bWJlcl07XHJcbiAgICAgICAgICBza2lsbF9uYW1lX29iamVjdC5odG1sKHNraWxsX25hbWUpO1xyXG4gICAgICAgICAgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLmFwcGVuZChza2lsbF9uYW1lX29iamVjdCk7XHJcblxyXG4gICAgICAgICAgdmFyIHNraWxsX2Nvc3Rfb2JqZWN0ID0gJChcIjxoMj5cIik7XHJcbiAgICAgICAgICBpZiAoc2tpbGxfb2JqZWN0Lmhhc093blByb3BlcnR5KCdjb3N0JykpIHtcclxuICAgICAgICAgICAgdmFyIHNraWxsX2Nvc3QgPSBza2lsbF9vYmplY3QuY29zdDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBza2lsbF9jb3N0ID0gXCLQndC10LjQt9Cy0LXRgdGC0L3QvlwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBza2lsbF9jb3N0X29iamVjdC5odG1sKFwi0KLRgNC10LHRg9C10YIg0LTQtdC50YHRgtCy0LjQuTogXCIgKyBza2lsbF9jb3N0KTtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5hcHBlbmQoc2tpbGxfY29zdF9vYmplY3QpO1xyXG5cclxuICAgICAgICAgIGlmIChza2lsbF9vYmplY3QuaGFzT3duUHJvcGVydHkoXCJjb29sZG93blwiKSkge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfY29vbGRvd25faGVhZGVyID0gJChcIjxoMj5cIik7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gXCLQmtGD0LvQtNCw0YPQvTogXCIgKyBza2lsbF9vYmplY3QuY29vbGRvd247XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KHNraWxsX29iamVjdC5jb29sZG93bl9vYmplY3RfbmFtZSkpIHtcclxuICAgICAgICAgICAgICB0ZXh0ID0gdGV4dCArIFwiICjQvtGB0YLQsNC70L7RgdGMIFwiICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXVtza2lsbF9vYmplY3QuY29vbGRvd25fb2JqZWN0X25hbWVdLmNvb2xkb3duICsgXCIpXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGV4dCA9IHRleHQgKyBcIiAo0JPQvtGC0L7QstC+KVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNraWxsX2Nvb2xkb3duX2hlYWRlci5odG1sKHRleHQpO1xyXG4gICAgICAgICAgICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuYXBwZW5kKHNraWxsX2Nvb2xkb3duX2hlYWRlcik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIHNraWxsX2Rlc2NyaXB0aW9uX29iamVjdCA9ICQoXCI8cD5cIik7XHJcbiAgICAgICAgICBpZiAoc2tpbGxfb2JqZWN0Lmhhc093blByb3BlcnR5KCdkZXNjcmlwdGlvbicpKSB7XHJcbiAgICAgICAgICAgIHZhciBza2lsbF9kZXNjcmlwdGlvbiA9IHNraWxsX29iamVjdC5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBza2lsbF9kZXNjcmlwdGlvbiA9IFwi0JzRiyDRgdCw0LzQuCDQvdC1INC30L3QsNC10Lwg0YfRgtC+INC+0L3QviDQtNC10LvQsNC10YJcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2tpbGxfZGVzY3JpcHRpb25fb2JqZWN0Lmh0bWwoc2tpbGxfZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgc2tpbGxfZGVzY3JpcHRpb25fY29udGFpbmVyLmFwcGVuZChza2lsbF9kZXNjcmlwdGlvbl9vYmplY3QpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHNraWxsX2ljb24ub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHNraWxsX2Rlc2NyaXB0aW9uX2NvbnRhaW5lci5odG1sKCcnKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbHVtbi5hcHBlbmQoc2tpbGxfaWNvbik7XHJcbiAgICAgICAgcm93LmFwcGVuZChjb2x1bW4pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBza2lsbF90YWJsZS5hcHBlbmQocm93KTtcclxuICB9XHJcbiAgc2tpbGxfbW9kYWxfY29udGVudC5hcHBlbmQoc2tpbGxfdGFibGUpO1xyXG5cclxuICBpZiAoc2tpbGxzZXQubGVuZ3RoID4gc3RhcnRpbmdfaW5kZXggKyB0YWJsZV9zaXplKnRhYmxlX3NpemUpIHsvLyB0aGVyZSBhcmUgbW9yZSBza2lsbHMgdG8gZGlzcGxheVxyXG4gICAgdmFyIG5leHRfcGFnZV9idXR0b24gPSAkKFwiPElNRz5cIik7XHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uLmF0dHIoJ3dpZHRoJywgJzEwMHB4Jyk7XHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uLmF0dHIoJ2hlaWdodCcsICc1MHB4Jyk7XHJcbiAgICBuZXh0X3BhZ2VfYnV0dG9uLmF0dHIoJ3NyYycsIFJJR0hUX0FSUk9XX0lNQUdFKTtcclxuICAgIG5leHRfcGFnZV9idXR0b24ub24oXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBzaG93X21vZGFsKGNoYXJhY3Rlcl9udW1iZXIsIHN0YXJ0aW5nX2luZGV4ICsgdGFibGVfc2l6ZSp0YWJsZV9zaXplKTtcclxuICAgIH0pXHJcblxyXG4gICAgbmV4dF9wYWdlX2J1dHRvbl9jb250YWluZXIuYXBwZW5kKG5leHRfcGFnZV9idXR0b24pO1xyXG4gIH1cclxuICBza2lsbF9tb2RhbC5zaG93KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVfbW9kYWwoKSB7XHJcbiAgc2tpbGxfbW9kYWwuaGlkZSgpO1xyXG4gIHNraWxsX21vZGFsX2NvbnRlbnQuaHRtbChcIlwiKTtcclxuICBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIuaHRtbChcIlwiKTtcclxuICBuZXh0X3BhZ2VfYnV0dG9uX2NvbnRhaW5lci5odG1sKFwiXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1bmhvdmVyX2NoYXJhY3RlcihjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgdmFyIHBvc2l0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIGJvYXJkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgcG9zaXRpb24pO1xyXG4gIGJvYXJkX2NlbGwuc3R5bGUudHJhbnNmb3JtID0gXCJcIjtcclxufVxyXG5cclxuLy8gYXR0YWNrIHJlbGF0ZWQgaGVscGVyc1xyXG5cclxuZnVuY3Rpb24gY2hvb3NlX2NoYXJhY3Rlcl90b19hdHRhY2soY2VsbCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDJcclxuICBjZWxsLnNyYyA9IFwiLi9pbWFnZXMvYXR0YWNrX3BsYWNlaG9sZGVyLmpwZ1wiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wX2F0dGFjaygpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwXHJcbiAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uKTtcclxuICBvbGRfY2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RvcF9za2lsbCgpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAwXHJcbiAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uKTtcclxuICBvbGRfY2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkKTtcclxufVxyXG5cclxuLy8gaW5pdGlhdGl2ZSByZWxhdGVkIGZ1bmN0aW9uc1xyXG5cclxuZnVuY3Rpb24gcmVzZXRJbml0aWF0aXZlKCkge1xyXG4gIGluaXRpYXRpdmVfb3JkZXJfYXJyYXkgPSBbXTtcclxuICBpbml0aWF0aXZlX29yZGVyX2NvbnRhaW5lci5odG1sKCcnKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbnN0cnVjdF9pbml0aWF0aXZlX2ltYWdlKGNoYXJhY3Rlcl9udW1iZXIsIGkpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgcXVlcnlfc3RyaW5nID0gJzxpbWc+IGlkPVwiaW5pdGlhdGl2ZV9pbWFnZV8nICsgaSArICdcIidcclxuICB2YXIgaW1nID0gJChxdWVyeV9zdHJpbmcpXHJcbiAgaW1nLmF0dHIoJ3NyYycsIGNoYXJhY3Rlci5hdmF0YXIpO1xyXG4gIGltZy5hdHRyKCdoZWlnaHQnLCAnNTBweCcpO1xyXG4gIGltZy5hdHRyKCd3aWR0aCcsICc1MHB4Jyk7XHJcbiAgaW1nLmF0dHIoJ2FycmF5X3Bvc2l0aW9uJywgaSk7XHJcbiAgaW1nLmFkZENsYXNzKFwiaW5pdGlhdGl2ZV9pbWFnZVwiKTtcclxuICBpbWcub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGlzVmlzaWJsZSA9IGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gJ2FsbCcgfHwgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSBteV9uYW1lO1xyXG4gICAgdmFyIHBvc2l0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgaXNOb3RGb2dnZWQgPSBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtwb3NpdGlvbl0gPT0gMCB8fCBteV9yb2xlID09ICdnbSc7XHJcbiAgICBpZiAoaXNWaXNpYmxlICYmIGlzTm90Rm9nZ2VkKSB7XHJcbiAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHBvc2l0aW9uKTtcclxuICAgICAgY2VsbC5zdHlsZS50cmFuc2Zvcm0gPSBcInNjYWxlKDEuMilcIjtcclxuICAgIH1cclxuICB9KTtcclxuICBpbWcub24oXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgdW5ob3Zlcl9jaGFyYWN0ZXIoY2hhcmFjdGVyX251bWJlcik7XHJcbiAgfSk7XHJcbiAgaW1nLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBvc2l0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBwb3NpdGlvbik7XHJcbiAgICAvL3NlbGVjdF9jaGFyYWN0ZXIocG9zaXRpb24sIGNlbGwpXHJcbiAgICBub19zaGlmdF9vbmNsaWNrKG15X3JvbGUsIGdtX2NvbnRyb2xfbW9kLCBnYW1lX3N0YXRlLCBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MsIGNlbGwsIHBvc2l0aW9uKVxyXG4gIH0pXHJcbiAgaW1nLmF0dHIoJ2RyYWdnYWJsZScsIHRydWUpO1xyXG4gIGltZy5vbihcImRyYWdzdGFydFwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgZHJhZ2dlZCA9IGV2ZW50LnRhcmdldDtcclxuICB9KTtcclxuICByZXR1cm4gaW1nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5X2luaXRpYXRpdmVfbGluZSgpIHtcclxuICBpbml0aWF0aXZlX29yZGVyX2NvbnRhaW5lci5odG1sKFwiXCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdGlhdGl2ZV9vcmRlcl9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGltZyA9IGNvbnN0cnVjdF9pbml0aWF0aXZlX2ltYWdlKGluaXRpYXRpdmVfb3JkZXJfYXJyYXlbaV0sIGkpO1xyXG4gICAgaW1nLmFwcGVuZFRvKGluaXRpYXRpdmVfb3JkZXJfY29udGFpbmVyKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIHJvbGwgc29tZXRoaW5nXHJcblxyXG5mdW5jdGlvbiByb2xsX3goeCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB4KSArIDFcclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbFNlYXJjaChpbnRlbGxpZ2VuY2UsIG1vZCkge1xyXG4gIHJldHVybiBpbnRlbGxpZ2VuY2UgKyByb2xsX3goMjApICsgbW9kO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsSW5pdGlhdGl2ZSgpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGluaXRpYXRpdmVfb3JkZXJfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vIHJldHJpZXZlIHRoYXQgY2hhcmFjdGVyJ3MgYWdpbGl0eVxyXG4gICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBpbml0aWF0aXZlX29yZGVyX2FycmF5W2ldO1xyXG4gICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG4gICAgdmFyIGFnaWxpdHkgPSBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcbiAgICAvLyByb2xsIGluaXRpYXRpdmUgYW5kIGFkZCBhZ2lsaXR5IG1vZGlmaWNhdG9yXHJcbiAgICB2YXIgaW5pdGlhdGl2ZSA9IGNvbXB1dGVJbml0aWF0aXZlKHBhcnNlSW50KGFnaWxpdHkpKTtcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2NoYXJhY3Rlcl9udW1iZXJdID0gaW5pdGlhdGl2ZTtcclxuICB9XHJcbiAgaW5pdGlhdGl2ZV9vcmRlcl9hcnJheS5zb3J0KGNvbXBhcmVfaW5pdGlhdGl2ZSk7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3JvbGxfaW5pdGlhdGl2ZSc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuaW5pdGlhdGl2ZV9zdGF0ZSA9IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlO1xyXG4gIHRvU2VuZC5pbml0aWF0aXZlX29yZGVyX2FycmF5ID0gaW5pdGlhdGl2ZV9vcmRlcl9hcnJheTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbF9hdHRhY2sodHlwZSwgYXR0YWNrZXIsIHRhcmdldCwgYWR2YW50YWdlX2JvbnVzKSB7XHJcbiAgdmFyIGFkdmFudGFnZSA9IDBcclxuICBpZiAoKHR5cGUgPT0gXCJyYW5nZWRcIil8fCh0eXBlID09IFwiZW5lcmd5XCIpKSB7XHJcbiAgICBhZHZhbnRhZ2UgPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVthdHRhY2tlcl07XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uaGFzT3duUHJvcGVydHkoXCJhZGFwdGl2ZV9maWdodGluZ1wiKSkge1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uYWRhcHRpdmVfZmlnaHRpbmcgPT0gMCkge1xyXG4gICAgICAgIGFkdmFudGFnZSA9IGFkdmFudGFnZSArIDE7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQodGA0LDQsdC+0YLQsNC7INGA0LXQudC90LTQttC+0LLRi9C5INGB0YLQsNC6INGD0L3QuNCy0LXRgNGB0LDQu9GM0L3QvtGB0YLQuFwiKTtcclxuICAgICAgfVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5hZGFwdGl2ZV9maWdodGluZyA9IDE7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICh0eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgYWR2YW50YWdlID0gY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVthdHRhY2tlcl1cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5oYXNPd25Qcm9wZXJ0eShcImFkYXB0aXZlX2ZpZ2h0aW5nXCIpKSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5hZGFwdGl2ZV9maWdodGluZyA9PSAxKSB7XHJcbiAgICAgICAgYWR2YW50YWdlID0gYWR2YW50YWdlICsgMTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCh0YDQsNCx0L7RgtCw0Lsg0LzQuNC70LvQuCDRgdGC0LDQuiDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0LhcIik7XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1thdHRhY2tlcl0uYWRhcHRpdmVfZmlnaHRpbmcgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuICBhZHZhbnRhZ2UgPSBhZHZhbnRhZ2UgLSBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVt0YXJnZXRdICsgYWR2YW50YWdlX2JvbnVzXHJcblxyXG4gIHZhciByb2xsID0gMFxyXG5cclxuICBpZiAoYWR2YW50YWdlID49IDIpIHsgLy8g0JTQuNC60L7QtSDQv9GA0LXQuNC80YPRidC10YHRgtCy0L4gPSA0INC60YPQsdCwXHJcbiAgICBjb25zb2xlLmxvZyhcItCU0LjQutC+0LUg0L/RgNC10LjQvNGD0YnQtdGB0YLQstC+XCIpXHJcbiAgICB2YXIgcm9sbDEgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDIgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDMgPSByb2xsX3goMjApXHJcbiAgICB2YXIgcm9sbDQgPSByb2xsX3goMjApXHJcbiAgICByb2xsID0gTWF0aC5tYXgocm9sbDEsIHJvbGwyLCByb2xsMywgcm9sbDQpXHJcbiAgfSBlbHNlIGlmIChhZHZhbnRhZ2UgPT0gMSkge1xyXG4gICAgY29uc29sZS5sb2coXCLQn9GA0LXQuNC80YPRidC10YHRgtCy0L5cIilcclxuICAgIHZhciByb2xsMSA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMiA9IHJvbGxfeCgyMClcclxuICAgIHJvbGwgPSBNYXRoLm1heChyb2xsMSwgcm9sbDIpXHJcbiAgfSBlbHNlIGlmIChhZHZhbnRhZ2UgPT0gMCkge1xyXG4gICAgcm9sbCA9IHJvbGxfeCgyMClcclxuICB9IGVsc2UgaWYgKGFkdmFudGFnZSA9PSAtMSkge1xyXG4gICAgY29uc29sZS5sb2coXCLQn9C+0LzQtdGF0LBcIilcclxuICAgIHZhciByb2xsMSA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMiA9IHJvbGxfeCgyMClcclxuICAgIHJvbGwgPSBNYXRoLm1pbihyb2xsMSwgcm9sbDIpXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKFwi0JTQuNC60LDRjyDQv9C+0LzQtdGF0LBcIilcclxuICAgIHZhciByb2xsMSA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMiA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMyA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsNCA9IHJvbGxfeCgyMClcclxuICAgIHJvbGwgPSBNYXRoLm1pbihyb2xsMSwgcm9sbDIsIHJvbGwzLCByb2xsNClcclxuICB9XHJcbiAgcmV0dXJuIHJvbGxcclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbF9ldmFzaW9uKHRhcmdldF9jaGFyYWN0ZXIsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgY29uc29sZS5sb2coXCLQkdC+0L3Rg9GBINGD0LLQvtGA0L7RgtCwOiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pXHJcbiAgdmFyIGV2YWRlX3JvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQodGFyZ2V0X2NoYXJhY3Rlci5hZ2lsaXR5KSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHJldHVybiBldmFkZV9yb2xsXHJcbn1cclxuXHJcbi8vIG1hbmFnaW5nIGNoYXRcclxuXHJcbmZ1bmN0aW9uIHB1c2hUb0xpc3QobWVzc2FnZSkge1xyXG4gIGZvciAobGV0IGk9MTsgaSA8IENIQVRfQ0FTSDsgaSsrKSB7XHJcbiAgICB2YXIgZWxlbWVudF90b19jb3B5ID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyBpICsgJ1wiXScpO1xyXG4gICAgdmFyIGVsZW1lbnRfdG9fcGFzdGUgPSAkKCdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIChpLTEpICsgJ1wiXScpO1xyXG5cclxuICAgIGVsZW1lbnRfdG9fcGFzdGUudGV4dChlbGVtZW50X3RvX2NvcHkudGV4dCgpKTtcclxuICB9XHJcbiAgdmFyIHRvcF9lbGVtZW50ID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyAoQ0hBVF9DQVNILTEpICsgJ1wiXScpO1xyXG4gIHRvcF9lbGVtZW50LnRleHQobWVzc2FnZSk7XHJcblxyXG4gIGlmIChub3RpZmljYXRpb25zX2NvbnRhaW5lci5pcyhcIjpoaWRkZW5cIikpIHtcclxuICAgIGNoYXRfYnV0dG9uLmFkZENsYXNzKFwiaXMtcmVkXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VDaGF0VmlzaWJpbGl0eSgpIHtcclxuICBpZiAoY2hhdF9idXR0b24uaGFzQ2xhc3MoXCJpcy1yZWRcIikpIHtcclxuICAgIGNoYXRfYnV0dG9uLnJlbW92ZUNsYXNzKFwiaXMtcmVkXCIpXHJcbiAgfVxyXG4gIGlmIChub3RpZmljYXRpb25zX2NvbnRhaW5lci5pcyhcIjpoaWRkZW5cIikpIHtcclxuICAgIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLnNob3coKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbm90aWZpY2F0aW9uc19jb250YWluZXIuaGlkZSgpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gY292ZXIgbWVjaGFuaWNzXHJcblxyXG5mdW5jdGlvbiBjb3Zlcl9tb2QoYWNjdW11bGF0ZWRfY292ZXIpIHtcclxuICB2YXIgbW9kID0ge31cclxuICBtb2QuaXNQb3NzaWJsZSA9IHRydWVcclxuICBtb2QuY292ZXJfbGV2ZWwgPSBhY2N1bXVsYXRlZF9jb3ZlclxyXG4gIHN3aXRjaChhY2N1bXVsYXRlZF9jb3Zlcikge1xyXG4gICAgY2FzZSAwOlxyXG4gICAgICBtb2QuYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IDBcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMVxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IC0yXHJcbiAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAwXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA0OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMlxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA1OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtM1xyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA2OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtM1xyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA3OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNFxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA4OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNFxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtM1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA5OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtM1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgICBtb2QuaXNQb3NzaWJsZSA9IGZhbHNlXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVfY292ZXIoZGlzdGFuY2UsIGNvdmVyKSB7XHJcbiAgdmFyIHJlc3VsdCA9IDBcclxuICBpZiAoZGlzdGFuY2UgPCAwLjE1KSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlclxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjMpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC43NVxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjUpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC41XHJcbiAgfSBlbHNlIGlmIChkaXN0YW5jZSA8IDAuNjUpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC4yNVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXN1bHQgPSAwXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldF9hY2N1bXVsYXRlZF9jb3Zlcih1c2VyX3BvcywgdGFyZ2V0X3Bvcykge1xyXG4gIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IDBcclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gY2VsbHNfb25fbGluZSh1c2VyX3BvcywgdGFyZ2V0X3BvcywgZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9jZWxsID0gY2FuZGlkYXRlX2NlbGxzW2ldXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjdXJyZW50X2NlbGxdIDwgMCkgey8vINGN0YLQviDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1XHJcbiAgICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9bTWF0aC5hYnMoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjdXJyZW50X2NlbGxdKV1cclxuICAgICAgdmFyIGRpc3RhbmNlID0gZGlzdGFuY2VfdG9fbGluZSh1c2VyX3BvcywgdGFyZ2V0X3BvcywgZ2FtZV9zdGF0ZS5zaXplLCBjdXJyZW50X2NlbGwpXHJcbiAgICAgIGFjY3VtdWxhdGVkX2NvdmVyID0gYWNjdW11bGF0ZWRfY292ZXIgKyBjb21wdXRlX2NvdmVyKGRpc3RhbmNlLCBvYnN0YWNsZS5jb3ZlcilcclxuICAgIH1cclxuICB9XHJcbiAgYWNjdW11bGF0ZWRfY292ZXIgPSBNYXRoLmNlaWwoYWNjdW11bGF0ZWRfY292ZXIpXHJcbiAgcmV0dXJuIGFjY3VtdWxhdGVkX2NvdmVyXHJcbn1cclxuXHJcbi8vIE1pc2NlbGFuZW91cyBhY3Rpb25zXHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHkoY2hhcmFjdGVyX251bWJlcikge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9IFwiY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5XCI7XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuXHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IDApIHtcclxuICAgIHRvU2VuZC5uZXdfdmFsdWUgPSAxXHJcbiAgfSBlbHNlIHtcclxuICAgIHRvU2VuZC5uZXdfdmFsdWUgPSAwXHJcbiAgfVxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZWFyY2hfYWN0aW9uKHNlYXJjaF9idXR0b24pIHtcclxuICB2YXIgaW5kZXggPSBzZWFyY2hfYnV0dG9uLmluZGV4O1xyXG4gIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGlmICghKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxICYmIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPCAxKSkge1xyXG5cclxuICAgIHZhciBuYW1lID0gY2hhcmFjdGVyLm5hbWU7XHJcbiAgICB2YXIgbW9kaWZpY2F0b3IgPSBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtpbmRleF07XHJcbiAgICB2YXIgaW50ZWxsaWdlbmNlID0gY2hhcmFjdGVyLmludGVsbGlnZW5jZTtcclxuICAgIHZhciByb2xsID0gcm9sbFNlYXJjaChwYXJzZUludChpbnRlbGxpZ2VuY2UpLCBwYXJzZUludChtb2RpZmljYXRvcikpO1xyXG4gICAgdmFyIHpvbmVfbnVtYmVyID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2luZGV4XTtcclxuICAgIHB1c2hUb0xpc3QoJ9Cf0LXRgNGB0L7QvdCw0LYgJyArIG5hbWUgKyAnINCx0YDQvtGB0LjQuyAnICsgcm9sbCArICcg0L3QsCDQstC90LjQvNCw0YLQtdC70YzQvdC+0YHRgtGMJyk7XHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2VhcmNoX2FjdGlvbic7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBuYW1lO1xyXG4gICAgdG9TZW5kLnJvbGwgPSByb2xsO1xyXG4gICAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnBsYXllcl9uYW1lID0gbXlfbmFtZVxyXG4gICAgdG9TZW5kLm1pbmVzX2RldGVjdGVkID0gW11cclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG5cclxuICAgIHZhciBsYW5kbWluZV9jYW5kaWRhdGVzID0gaW5kZXhfaW5fcmFkaXVzKGluZGV4LCBsYW5kbWluZV9kZXRlY3Rpb25fcmFkaXVzKVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYW5kbWluZV9jYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhsYW5kbWluZV9jYW5kaWRhdGVzW2ldKSkge1xyXG4gICAgICAgICAgdG9TZW5kLm1pbmVzX2RldGVjdGVkLnB1c2gobGFuZG1pbmVfY2FuZGlkYXRlc1tpXSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCe0LHRi9GB0Log0LLQviDQstGA0LXQvNGPINCx0L7RjyDRgdGC0L7QuNGCINCx0L7QvdGD0YHQvdC+0LUg0LTQtdC50YHRgtCy0LjQtSFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVJbml0aWF0aXZlKGFnaWxpdHkpIHtcclxuICByZXR1cm4gYWdpbGl0eSoyICsgcm9sbF94KDIwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2JhdHRsZV9tb2QoKSB7XHJcbiAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMFxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMVxyXG4gIH1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2JhdHRsZV9tb2QnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnZhbHVlID0gbmV3X3ZhbHVlXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbi8vIGF0dGFjayByZWxhdGVkIHRoaW5ncyAoY29tcHV0YXRpb24pXHJcblxyXG5mdW5jdGlvbiBjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpIHtcclxuICByZXR1cm4gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduX21vdmVzKGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUZsb2F0KG1vdmVfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV0pO1xyXG4gIGlmIChjaGFyYWN0ZXIuaGFzT3duUHJvcGVydHkoXCJleHRyYV9tb3ZlbWVudFwiKSkge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdICsgcGFyc2VGbG9hdChjaGFyYWN0ZXIuZXh0cmFfbW92ZW1lbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gd2VhcG9uX2RhbWFnZV9ib251cyhyYXdfZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdG90YWxfZGFtYWdlID0gcmF3X2RhbWFnZVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSAndGhyb3dpbmcnKSB7XHJcbiAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW01hdGguY2VpbChwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpLzIpXVxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gJ3JhbmdlZCcpIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpICYmIHdlYXBvbi5oYXNPd25Qcm9wZXJ0eShcImFpbV9ib251c1wiKSkge1xyXG4gICAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBwYXJzZUludCh3ZWFwb24uYWltX2JvbnVzKVxyXG4gICAgfVxyXG4gIH1cclxuICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgcmV0dXJuIHRvdGFsX2RhbWFnZVxyXG59XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtX2F0dGFjayhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfY2hvc2VuLndlYXBvbl9pZF1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG5cclxuICAgIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3Zlcih1c2VyX3Bvc2l0aW9uLCBpbmRleClcclxuICAgIHZhciBjb3Zlcl9tb2RpZmllciA9IGNvdmVyX21vZChhY2N1bXVsYXRlZF9jb3ZlcilcclxuXHJcblxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX0tEID0gY2hhcmFjdGVyX0tEKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdyZXNvbHZlX2F0dGFjayc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLmF0dGFja2VyX2lkID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQuYXR0YWNrZXJfcG9zaXRpb24gPSB1c2VyX3Bvc2l0aW9uXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5hdHRhY2tfdHlwZSA9IHdlYXBvbi50eXBlXHJcbiAgICB0b1NlbmQuY292ZXJfbGV2ZWwgPSBjb3Zlcl9tb2RpZmllci5jb3Zlcl9sZXZlbFxyXG4gICAgdG9TZW5kLnVzZXJfaW52aXNpYmlsaXR5X2VuZGVkID0gMFxyXG5cclxuICAgIGlmICh3ZWFwb24uaGFzT3duUHJvcGVydHkoXCJzdWJ0eXBlXCIpICYmIHdlYXBvbi5zdWJ0eXBlID09IFwiUFBcIikge1xyXG4gICAgICB0b1NlbmQucXVpY2tfYXR0YWNrX3JlYWR5ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICE9IFwiYWxsXCIgJiYgd2VhcG9uLnR5cGUgIT0gXCJ0aHJvd2luZ1wiKSB7XHJcbiAgICAgIHRvU2VuZC51c2VyX2ludmlzaWJpbGl0eV9lbmRlZCA9IDFcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY292ZXJfbW9kaWZpZXIuaXNQb3NzaWJsZSkge1xyXG4gICAgICB2YXIgYXR0YWNrX3JvbGwgPSByb2xsX2F0dGFjayh3ZWFwb24udHlwZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgY292ZXJfbW9kaWZpZXIuYWR2YW50YWdlX2JvbnVzKVxyXG4gICAgICBpZiAoYXR0YWNrX3JvbGwgPCAyMCkgey8vIG5vIGNyaXRcclxuICAgICAgICBpZiAod2VhcG9uLnR5cGUgPT0gXCJyYW5nZWRcIikge1xyXG4gICAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSkgey8vINCf0YDQuNGG0LXQuyDQtNCw0LHQu9C40YIg0LHQvtC90YPRgSDQv9C+0L/QsNC00LDQvdC40Y9cclxuICAgICAgICAgICAgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSk7XHJcbiAgICAgICAgICAgIHRvU2VuZC5haW1fb3ZlciA9IDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgICAgICAgIHZhciBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gYXR0YWNrX3JvbGwgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLnN0cmVuZ3RoKVxyXG4gICAgICAgIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJlbmVyZ3lcIikge1xyXG4gICAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIDIqcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcInRocm93aW5nXCIpIHtcclxuICAgICAgICAgIHZhciBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gYXR0YWNrX3JvbGwgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmFnaWxpdHkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYXR0YWNrX2JvbnVzID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgdmFyIHVuaXZlcnNhbF9ib251cyA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0JHQvtC90YPRgSDQsNGC0LDQutC4OiBcIiArIGF0dGFja19ib251cyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQkdC+0L3Rg9GBINCy0YHQtdC+0LHRidC40Lk6IFwiICsgdW5pdmVyc2FsX2JvbnVzKTtcclxuXHJcbiAgICAgICAgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgKyBhdHRhY2tfYm9udXMgKyB1bml2ZXJzYWxfYm9udXMgKyBjb3Zlcl9tb2RpZmllci5hdHRhY2tfYm9udXNcclxuXHJcbiAgICAgICAgdG9TZW5kLmF0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbFxyXG5cclxuICAgICAgICBpZiAoY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA+IHRhcmdldF9jaGFyYWN0ZXJfS0QpIHsvLyDQldGB0YLRjCDQv9GA0L7QsdC40YLQuNC1XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgZXZhZGVfcm9sbCA9IHJvbGxfZXZhc2lvbih0YXJnZXRfY2hhcmFjdGVyLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgdG9TZW5kLmV2YWRlX3JvbGwgPSBldmFkZV9yb2xsXHJcbiAgICAgICAgICAgIGlmIChldmFkZV9yb2xsID4gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCkgeyAvL3N1Y2Nlc2Z1bGx5IGV2YWRlZFxyXG4gICAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJldmFkZWRcIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfY2hhcmFjdGVyX251bWJlciwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJLRF9ibG9ja1wiXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgeyAvLyBmdWxsIGNyaXRcclxuICAgICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbFxyXG4gICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jcml0XCJcclxuICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmdWxsX2NvdmVyXCJcclxuICB9XHJcblxyXG4gICAgaWYgKHRvU2VuZC5oYXNPd25Qcm9wZXJ0eShcImRhbWFnZV9yb2xsXCIpICYmIHdlYXBvbi5oYXNPd25Qcm9wZXJ0eShcInN1YnR5cGVcIikgJiYgd2VhcG9uLnN1YnR5cGUgPT0gXCJkcm9ib3Zpa1wiKSB7XHJcbiAgICAgIHZhciBzbG93X3NjYWxlID0gcGFyc2VGbG9hdCh3ZWFwb24uc2xvd19zY2FsZSk7XHJcbiAgICAgIHZhciBmdWxsX2hwID0gSFBfdmFsdWVzW3BhcnNlSW50KHRhcmdldF9jaGFyYWN0ZXIuc3RhbWluYSldXHJcbiAgICAgIHZhciBjdXJyZW50X21vdmVzID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgZnJhY3Rpb24gPSBwYXJzZUZsb2F0KHRvU2VuZC5kYW1hZ2Vfcm9sbCkvcGFyc2VGbG9hdChmdWxsX2hwKVxyXG4gICAgICB2YXIgbW92ZV9yZWR1Y3Rpb24gPSBjdXJyZW50X21vdmVzICogZnJhY3Rpb24gKiBzbG93X3NjYWxlO1xyXG4gICAgICB0b1NlbmQubW92ZV9yZWR1Y3Rpb24gPSBtb3ZlX3JlZHVjdGlvbjtcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+Li4uXCIpXHJcbiAgfVxyXG4gIHN0b3BfYXR0YWNrKClcclxufVxyXG5cclxuZnVuY3Rpb24gYXR0YWNrX29ic3RhY2xlKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9jaG9zZW4ud2VhcG9uX2lkXVxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UpKSB7XHJcbiAgICB2YXIgdGFyZ2V0X29ic3RhY2xlX251bWJlciA9IE1hdGguYWJzKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdKTtcclxuICAgIHZhciB0YXJnZXRfb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW3RhcmdldF9vYnN0YWNsZV9udW1iZXJdXHJcblxyXG4gICAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKHVzZXJfcG9zaXRpb24sIGluZGV4KVxyXG4gICAgdmFyIGNvdmVyX21vZGlmaWVyID0gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ2F0dGFja19vYnN0YWNsZSc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLmF0dGFja2VyX2lkID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQuYXR0YWNrZXJfcG9zaXRpb24gPSB1c2VyX3Bvc2l0aW9uXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X29ic3RhY2xlX251bWJlclxyXG4gICAgdG9TZW5kLnVzZXJfaW52aXNpYmlsaXR5X2VuZGVkID0gMFxyXG4gICAgdG9TZW5kLmF0dGFja190eXBlID0gd2VhcG9uLnR5cGVcclxuICAgIHRvU2VuZC5jb3Zlcl9sZXZlbCA9IGNvdmVyX21vZGlmaWVyLmNvdmVyX2xldmVsXHJcbiAgICB0b1NlbmQudGFyZ2V0X3Bvc2l0aW9uID0gaW5kZXg7XHJcblxyXG4gICAgaWYgKHdlYXBvbi5oYXNPd25Qcm9wZXJ0eShcInN1YnR5cGVcIikgJiYgd2VhcG9uLnN1YnR5cGUgPT0gXCJQUFwiKSB7XHJcbiAgICAgIHRvU2VuZC5xdWlja19hdHRhY2tfcmVhZHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W3VzZXJfY2hhcmFjdGVyX251bWJlcl0gIT0gXCJhbGxcIiAmJiB3ZWFwb24udHlwZSAhPSBcInRocm93aW5nXCIpIHtcclxuICAgICAgdG9TZW5kLnVzZXJfaW52aXNpYmlsaXR5X2VuZGVkID0gMVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb3Zlcl9tb2RpZmllci5pc1Bvc3NpYmxlKSB7XHJcbiAgICAgIGlmICh0YXJnZXRfb2JzdGFjbGUuaGFzT3duUHJvcGVydHkoXCJ0b3VnaG5lc3NcIikpIHtcclxuICAgICAgICB2YXIgYXR0YWNrX3JvbGwgPSByb2xsX3goMjApO1xyXG4gICAgICAgIHZhciBkYW1hZ2UgPSAwO1xyXG4gICAgICAgIHN3aXRjaChhdHRhY2tfcm9sbCkge1xyXG4gICAgICAgICAgY2FzZSAxOTpcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIHVzZXJfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgZGFtYWdlICo9IDI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWFwb24uZGFtYWdlWzBdOyBpKyspIHtcclxuICAgICAgICAgICAgICBkYW1hZ2UgKz0gcm9sbF94KHdlYXBvbi5kYW1hZ2VbMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIHVzZXJfY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRvU2VuZC5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgaWYgKGRhbWFnZSA+PSB0YXJnZXRfb2JzdGFjbGUudG91Z2huZXNzKSB7XHJcbiAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZGVzdHJveWVkXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJ1bnRvdWNoZWRcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLmRhbWFnZSA9IDA7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInVudG91Y2hlZFwiO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmdWxsX2NvdmVyXCI7XHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L4uLi5cIik7XHJcbiAgfVxyXG4gIHN0b3BfYXR0YWNrKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgY2hhcmFjdGVyX251bWJlciwgYXR0YWNrX3JvbGwsIHRhcmdldF9udW1iZXIpIHtcclxuICB2YXIgZGFtYWdlID0gMFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICBpZiAoY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcInNuaXBlclwiKSB7XHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAxNikge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlYXBvbi5kYW1hZ2VbMF07IGkrKykge1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJ3ZWFrc3BvdFwiKSAmJiBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9udW1iZXJdLndlYWtzcG90Lmh1bnRlcl9pZCA9PSBjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgICAgICAgc3dpdGNoIChhdHRhY2tfcm9sbCkge1xyXG4gICAgICAgICAgY2FzZSAxODpcclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjJcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE5OlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqMlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDIwOlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqNVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2l0Y2ggKGF0dGFja19yb2xsKSB7XHJcbiAgICAgICAgICBjYXNlIDE4OlxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMTk6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSoyXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uX2RhbWFnZV9ib251cyhkYW1hZ2UsIHdlYXBvbiwgY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSozXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlYXBvbi5kYW1hZ2VbMF07IGkrKykge1xyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3god2VhcG9uLmRhbWFnZVsxXSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbl9kYW1hZ2VfYm9udXMoZGFtYWdlLCB3ZWFwb24sIGNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmIChhdHRhY2tfcm9sbCA8IDE5KSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KHdlYXBvbi5kYW1hZ2VbMV0pXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICB9XHJcbiAgICBkYW1hZ2UgPSB3ZWFwb25fZGFtYWdlX2JvbnVzKGRhbWFnZSwgd2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyKVxyXG5cclxuICAgIGlmIChhdHRhY2tfcm9sbCA9PSAyMCkge1xyXG4gICAgICBkYW1hZ2UgPSBkYW1hZ2UgKiAyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAod2VhcG9uLnR5cGUgPT0gXCJyYW5nZWRcIikge1xyXG4gICAgdmFyIGRhbWFnZV90eXBlID0gXCJidWxsZXRcIlxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICB2YXIgZGFtYWdlX3R5cGUgPSBcIm1lbGVlXCJcclxuICB9IGVsc2UgaWYgKHdlYXBvbi50eXBlID09IFwiZW5lcmd5XCIpIHtcclxuICAgICAgdmFyIGRhbWFnZV90eXBlID0gXCJlbmVyZ3lcIlxyXG4gIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJ0aHJvd2luZ1wiKSB7XHJcbiAgICAgIHZhciBkYW1hZ2VfdHlwZSA9IFwibWVsZWVcIlxyXG4gIH1cclxuXHJcbiAgc3dpdGNoKGRhbWFnZV90eXBlKSB7XHJcbiAgICBjYXNlIFwibWVsZWVcIjpcclxuICAgICAgdmFyIHJlc2lzdCA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9yZXNpc3RbdGFyZ2V0X251bWJlcl1cclxuICAgICAgY29uc29sZS5sb2coXCLQo9GA0L7QvSDQtNC+INGA0LXQt9C40YHRgtCwOiBcIiArIGRhbWFnZSlcclxuICAgICAgZGFtYWdlID0gcGFyc2VJbnQoZGFtYWdlICogKDEuMCAtIHJlc2lzdCkpXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi0KPRgNC+0L0g0L/QvtGB0LvQtSDRgNC10LfQuNGB0YLQsDogXCIgKyBkYW1hZ2UpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImJ1bGxldFwiOlxyXG4gICAgICB2YXIgcmVzaXN0ID0gY2hhcmFjdGVyX3N0YXRlLmJ1bGxldF9yZXNpc3RbdGFyZ2V0X251bWJlcl1cclxuICAgICAgY29uc29sZS5sb2coXCLQo9GA0L7QvSDQtNC+INGA0LXQt9C40YHRgtCwOiBcIiArIGRhbWFnZSlcclxuICAgICAgZGFtYWdlID0gcGFyc2VJbnQoZGFtYWdlICogKDEuMCAtIHJlc2lzdCkpXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi0KPRgNC+0L0g0L/QvtGB0LvQtSDRgNC10LfQuNGB0YLQsDogXCIgKyBkYW1hZ2UpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgLy9ub3RoaW5nIGZvciBub3dcclxuICB9XHJcblxyXG4gIHJldHVybiBkYW1hZ2VcclxufVxyXG5cclxuZnVuY3Rpb24gZGFtYWdlX3NraWxsX3RlbXBsYXRlKHRhcmdldF9wb3MsIHVzZXJfcG9zLCByYW5nZSwgdXNlcl9pZCwgc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3Zlcikge1xyXG4gIGlmIChpc0luUmFuZ2UodGFyZ2V0X3BvcywgdXNlcl9wb3MsIHJhbmdlKSkge1xyXG5cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdGFyZ2V0X3Bvc11cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaWRdXHJcblxyXG4gICAgdmFyIGNvdmVyX21vZGlmaWVyID0gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2lkXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5jb3Zlcl9sZXZlbCA9IGFjY3VtdWxhdGVkX2NvdmVyXHJcblxyXG4gICAgaWYgKGNvdmVyX21vZGlmaWVyLmlzUG9zc2libGUpIHtcclxuXHJcbiAgICAgIHZhciBhdHRhY2tfcm9sbCA9IHJvbGxfYXR0YWNrKHdlYXBvbi50eXBlLCB1c2VyX2lkLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgY292ZXJfbW9kaWZpZXIuYWR2YW50YWdlX2JvbnVzKVxyXG5cclxuICAgICAgaWYgKGF0dGFja19yb2xsIDwgMjApIHsvLyBubyBjcml0XHJcbiAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIGJvbnVzX2F0dGFjayArIGNvdmVyX21vZGlmaWVyLmF0dGFja19ib251c1xyXG5cclxuICAgICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsXHJcblxyXG4gICAgICAgIGlmIChjdW11bGF0aXZlX2F0dGFja19yb2xsID4gdGFyZ2V0X2NoYXJhY3Rlcl9LRCkgey8vINCV0YHRgtGMINC/0YDQvtCx0LjRgtC40LVcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBldmFkZV9yb2xsID0gcm9sbF9ldmFzaW9uKHRhcmdldF9jaGFyYWN0ZXIsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICB0b1NlbmQuZXZhZGVfcm9sbCA9IGV2YWRlX3JvbGxcclxuICAgICAgICAgICAgaWYgKGV2YWRlX3JvbGwgPiBjdW11bGF0aXZlX2F0dGFja19yb2xsKSB7IC8vc3VjY2VzZnVsbHkgZXZhZGVkXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImV2YWRlZFwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2lkLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfaWQsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiS0RfYmxvY2tcIlxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHsgLy8gZnVsbCBjcml0XHJcbiAgICAgICAgdG9TZW5kLmF0dGFja19yb2xsID0gYXR0YWNrX3JvbGxcclxuICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHVzZXJfaWQsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmdWxsX2NyaXRcIlxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jb3ZlclwiXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG9TZW5kXHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZG9fZGFtYWdlKGNoYXJhY3Rlcl9udW1iZXIsIGRhbWFnZSkge1xyXG4gIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImZvcmNlX2ZpZWxkX3RhcmdldFwiKSkge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdIC0gZGFtYWdlXHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBzaGllbGRfaW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldC5zaGllbGRfaW5kZXhcclxuICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5zaGllbGQgLSBkYW1hZ2VcclxuICAgIHZhciBtZXNzYWdlID0gXCLQqdC40YIg0L/RgNC40L3Rj9C7INGD0YDQvtC9INC90LAg0YHQtdCx0Y8hINCe0YHRgtCw0LLRiNCw0Y/RgdGPINC/0YDQvtGH0L3QvtGB0YLRjDogXCIgKyBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZFxyXG4gICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgaWYgKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkIDw9IDApIHsvLyDRidC40YIg0YPQvdC40YfRgtC+0LbQtdC9XHJcbiAgICAgIHZhciBtZXNzYWdlID0gXCJQcmVzcyBGINCp0LjRgtGDLi4uXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICB2YXIgY2hhcl9saXN0ID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5jaGFyYWN0ZXJfbGlzdFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gY2hhcl9saXN0W2ldXHJcbiAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uZm9yY2VfZmllbGRfdGFyZ2V0XHJcbiAgICAgIH1cclxuICAgICAgZGVsZXRlX29iamVjdF9jb21tYW5kKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0ucG9zaXRpb24pXHJcbiAgICAgIGRlbGV0ZSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kVGhyb3dSYW5nZShjaGFyYWN0ZXIpIHtcclxuICByZXR1cm4gdGhyb3dfYmFzZV9yYW5nZSArIHBhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCkqMlxyXG59XHJcblxyXG5mdW5jdGlvbiBtZWxlZV9wZW5hbHR5KGRhdGEpIHtcclxuICBpZiAoZGF0YS5hdHRhY2tfdHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uaGFzT3duUHJvcGVydHkoXCJtZWxlZWRcIikpIHsgLy8g0LjQvdCw0YfQtSDRjdGE0YTQtdC60YIg0YPQttC1INC90LDQu9C+0LbQtdC9LCDQvdC1INC/0L7QstGC0L7RgNGP0LXQvFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gLSAxXHJcbiAgICAgIHZhciBtZWxlZWRfb2JqZWN0ID0ge31cclxuICAgICAgbWVsZWVkX29iamVjdC5jb29sZG93biA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ubWVsZWVkID0gbWVsZWVkX29iamVjdFxyXG4gICAgfVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbZGF0YS50YXJnZXRfaWRdID09IDEpIHtcclxuICAgICAgdmFyIGNvb2xkb3duID0gMVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvb2xkb3duID0gMFxyXG4gICAgfVxyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ubWVsZWVkLmNvb2xkb3duID0gY29vbGRvd25cclxuICB9XHJcbn1cclxuXHJcbi8vIFNraWxscyFcclxuXHJcbmZ1bmN0aW9uIHVzZV9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpIHtcclxuICBza2lsbF9pbmRleCA9IHBhcnNlSW50KHNraWxsX2luZGV4KVxyXG4gIHN3aXRjaChza2lsbF9pbmRleCkge1xyXG4gICAgY2FzZSAwOiAvL9Cg0YvQstC+0LpcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImNoYXJnZV91c2VyXCIpIHx8IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdLnNwZWNpYWxfdHlwZSA9PSBcInJvZ3VlXCIpKSB7XHJcbiAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE6IC8v0J/RgNC40LvQuNCyINCQ0LTRgNC10L3QsNC70LjQvdCwXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWRyZW5hbGluZV91c2VyXCIpKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMjogLy8g0J/QvtC00YDQtdC30LDRgtGMINGB0YPRhdC+0LbQuNC70LjRj1xyXG4gICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiY3V0X2xpbWJfdXNlclwiKSkge1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzogLy8g0KHQu9Cw0LHQvtC1INC80LXRgdGC0L5cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA0OiAvLyDQm9C10YfQtdC90LjQtVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNTogLy8g0JHQvtC70YzRiNC+0Lkg0LHRgNCw0YJcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA2OiAvLyDQn9C+0LTQvdGP0YLRjCDRidC40YLRi1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgfHwgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInNoaWVsZF91cFwiKSkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInNoaWVsZF91cFwiKSkge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzaGllbGRfZG93blwiXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInNoaWVsZF91cFwiXHJcbiAgICAgIH1cclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNzogLy8g0L/QvtC20LjRgNCw0L3QuNC1INGB0YPRidC90L7RgdGC0LhcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDg6IC8vINGD0LfQvdCw0YLRjCDQsdC40L7Qv9GD0LtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJiaW9wb29sXCIpKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndCw0LrQvtC/0LvQtdC90L3Ri9C5INCx0LjQvtC/0YPQuzogXCIgKyBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmJpb3Bvb2wpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndCw0LrQvtC/0LvQtdC90L3Ri9C5INCx0LjQvtC/0YPQuyDQvtGC0YHRg9GC0YHRgtCy0YPQtdGCXCIpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA5OiAvLyDQsdC10LfRg9C/0YDQtdGH0L3QvtC1INCy0L7RgdGB0YLQsNC90L7QstC70LXQvdC40LVcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxMDogLy8g0L7QsdGL0YfQvdC+0LUg0LIg0LHQvtC90YPRgdC90L7QtVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQvtGB0L3QvtCy0L3Ri9GFINC00LXQudGB0YLQstC40LksINGH0YLQvtCx0Ysg0L/RgNC10LLRgNCw0YLQuNGC0Ywg0LIg0LHQvtC90YPRgdC90YvQtSFcIilcclxuICAgICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTE6IC8vINC+0YLQtNGL0YVcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2NoYXJhY3Rlcl9udW1iZXJdID09IDApIHtcclxuICAgICAgICAgICAgdmFyIG5ld19zdGFtaW5hID0gTWF0aC5taW4oY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0gKyByZXN0X3N0YW1pbmFfZ2Fpbiwgc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl0uc3RhbWluYV0pXHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgICB0b1NlbmQubmV3X3N0YW1pbmEgPSBuZXdfc3RhbWluYVxyXG4gICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCS0Ysg0YPQttC1INGB0L7QstC10YDRiNCw0LvQuCDQtNC10LnRgdGC0LLQuNGPINC90LAg0Y3RgtC+0Lwg0YXQvtC00YMsINGC0LDQuiDRh9GC0L4g0L3QtSDQvNC+0LbQtdGC0LUg0L7RgtC00L7RhdC90YPRgtGMXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxMjogLy8g0LPQsNC30L7QstCw0Y8g0LPRgNCw0L3QsNGC0LBcclxuICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImdhc19ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQoyDQs9GA0LDQvdCw0YLRiyDQutGD0LvQtNCw0YPQvSAo0LPQsNC3INGN0Y3RjSDQt9Cw0LLQsNGA0LjQstCw0LXRgtGB0Y8sINGF0LcpXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTM6IC8vINGB0LLQtdGC0L7RiNGD0LzQvtCy0LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwibGlnaHRfc291bmRfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQk9GA0LDQvdCw0YLQsCDQtdGJ0LUg0L3QtSDQs9C+0YLQvtCy0LBcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE0OiAvLyDQqNC+0LrQvtCy0YvQuSDQuNC80L/Rg9C70YzRgVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE1OiAvLyDQn9GL0Ykt0L/Ri9GJLdCz0L5cclxuICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwicGljaF9waWNoX3VzZXJcIikpIHtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQn9GL0Ykg0L/Ri9GJINC10YnQtSDQvdCwINC/0LXRgNC10LfQsNGA0Y/QtNC60LUhXCIpXHJcbiAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDE2OiAvLyDQodC40LvQvtCy0L7QtSDQv9C+0LvQtVxyXG4gICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImZvcmNlX2ZpZWxkX3VzZXJcIikpIHtcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0JPQtdC90LXRgNCw0YLQvtGAINGB0LjQu9C+0LLQvtCz0L4g0L/QvtC70Y8g0LXRidC1INC90LUg0LfQsNGA0Y/QtNC40LvRgdGPIVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDE3OiAvLyDQmNC90LLQuNC3XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4O1xyXG4gICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VybmFtZSA9IG15X25hbWU7XHJcbiAgICAgICAgICAgIHRvU2VuZC5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxODogLy8g0JHQvtC10LLQsNGPINGD0L3QuNCy0LXRgNGB0LDQu9GM0L3QvtGB0YLRjFxyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXg7XHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTk6IC8vINCb0LDQutC4INGI0L7RglxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIwOiAvLyDQm9C+0YLQtdGA0LXQudC90YvQuSDQstGL0YHRgtGA0LXQu1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIxOiAvL9Cf0YDQuNC70LjQsiDQtNC10LnRgdGC0LLQuNC5XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWN0aW9uX3NwbGFzaFwiKSkge1xyXG4gICAgICAgIGFsZXJ0KFwi0KPQvNC10L3QuNC1INCy0YHQtSDQtdGJ0LUg0L3QsCDQutGD0LvQtNCw0YPQvdC1XCIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgdG9TZW5kLmV4dHJhX2FjdGlvbnMgPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG5cclxuICAgIGNhc2UgMjI6IC8vINCz0YDQsNC0INGD0LTQsNGA0L7QslxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAxKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQlNC70Y8g0LPRgNCw0LTQsCDRg9C00LDRgNC+0LIg0YLRgNC10LHRg9C10YLRgdGPINCx0L7Qu9GM0YjQtSAxINC+0YHQvdC+0LLQvdC+0LPQviDQtNC10LnRgdGC0LLQuNGPIVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMzogLy/QkNC00YDQtdC90LDQu9C40L3QvtCy0YvQuSDQv9C+0YLQvtC/XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJwb2lzb25vdXNfYWRyZW5hbGluZV91c2VyXCIpKSB7XHJcbiAgICAgICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtVwiKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyNDogLy8g0LrQuNGB0LvQvtGC0L3QsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhY2lkX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCjINCz0YDQsNC90LDRgtGLINC60YPQu9C00LDRg9C9ICjQutC40YHQu9C+0YLQsCDQvtC60LjRgdC70Y/QtdGC0YHRjylcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjU6IC8vINCX0LDQvNC40L3QuNGA0L7QstCw0YLRjFxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICAgICAgdG9TZW5kLnBsYXllcl9uYW1lID0gbXlfbmFtZVxyXG4gICAgICAgICAgICB0b1NlbmQucG9zaXRpb24gPSBwb3NpdGlvblxyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyNjogLy8g0JLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0L7QstCw0YLRjFxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQrdGC0L4g0YPQvNC10L3QuNC1INGC0YDQtdCx0YPQtdGCIDEg0LHQvtC90YPRgdC90L7QtSDQtNC10LnRgdGC0LLQuNC1IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyNzogLy8g0J3QuNC60L7RgtC40L3QvtCy0YvQuSDRg9C00LDRgFxyXG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwidG9iYWNjb19zdHJpa2VcIikpIHtcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtdC70YzQt9GPINC30LDRgtGP0LPQuNCy0LDRgtGM0YHRjyDRgtCw0Log0YfQsNGB0YLQviEg0KMg0LLQsNGBINC30LDQstC40YHQuNC80L7RgdGC0YxcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyODogLy8g0JrRgNGD0YfQtdC90YvQtSDQv9GD0LvQuFxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMjk6IC8vINCf0YDQuNGG0LXQu9C40YLRjNGB0Y9cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJhaW1cIikpIHtcclxuICAgICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCS0Ysg0YPQttC1INC/0YDQuNGG0LXQu9C40LvQuNGB0YwgLSDQv9C+0YDQsCDRiNC80LDQu9GP0YLRjFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzMDogLy8g0LHRi9GB0YLRgNCw0Y8g0LDRgtCw0LrQsFxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJxdWlja19hdHRhY2tfcmVhZHlcIikpIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQodC/0LXRgNCy0LAg0L3Rg9C20L3QviDRgdC+0LLQtdGA0YjQuNGC0Ywg0L7RgdC90L7QstC90YPRjiDQsNGC0LDQutGDIVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzMTogLy8g0YHQu9GD0LbQsdCwINGB0L/QsNGB0LXQvdC40Y9cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMSkgey8vINC00LLQsCDQsdC+0L3Rg9GB0L3Ri9GFXHJcbiAgICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInNhZmV0eV9zZXJ2aWNlX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDMyOiAvLyDQmtCw0LvRjNC40L3Qs9Cw0LvQu9GP0YLQvtGAXHJcbiAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiY2FsaW5nYWxhdG9yX3VzZXJcIikpIHtcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0KfRgNC10LfQvNC10YDQvdC+0LUg0LrQsNC70LjQvdCz0LDQu9C40YDQvtCy0LDQvdC40LUg0LLRgNC10LTQuNGCINCy0LDRiNC10LzRgyDQt9C00L7RgNC+0LLRjNGOISAo0LrRg9C70LTQsNGD0L0pXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzM6IC8vINCR0LDRhNGEINCR0LXQu9GM0LLQtdGCXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDM0OiAvLyDQotGA0LDQvdGB0YTQvtGA0LzQsNGG0LjRjyDQkdC10LvRjNCy0LXRglxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImJlbHZldF9idWZmX3VzZXJcIikpIHtcclxuICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uYmVsdmV0X2J1ZmZfdXNlci5oYXNPd25Qcm9wZXJ0eShcInRyYW5zZm9ybWVkXCIpKSB7XHJcbiAgICAgICAgICBiZWx2ZXRfdHJhbnNmb3JtYXRpb24oY2hhcmFjdGVyX251bWJlciwgc2tpbGxfaW5kZXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCS0Ysg0YPQttC1INC+0YLQutGA0YvQu9C4INGB0LLQvtGOINC40YHRgtC40L3QvdGD0Y4g0YHRg9GJ0L3QvtGB0YLRjCAtINC/0L7QstGC0L7RgNC90LDRjyDRgtGA0LDQvdGB0YTQvtGA0LzQsNGG0LjRjyDQvdC10LLQvtC30LzQvtC20L3QsCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0JLRiyDQtNC+0LvQttC90Ysg0YHQv9C10YDQstCwINC/0L7QtNCz0L7RgtC+0LLQuNGC0YzRgdGPINC6INGC0YDQsNC90YHRhNC+0YDQvNCw0YbQuNC4LCDRgdC+0LHRgNCw0LIg0LTQvtGB0YLQsNGC0L7Rh9C90L4g0LTQvdC6INC/0YDQvtGC0LjQstC90LjQutC+0LJcIik7XHJcbiAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDM1OiAvLyDRhdGD0LpcclxuICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJob29rX3VzZXJcIikpIHtcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtSFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzNjogLy8g0LrQsNGA0LDRjtGJ0LjQuSDRg9C00LDRgFxyXG4gICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJwdW5pc2hpbmdfc3RyaWtlX3VzZXJcIikpIHtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtSFcIilcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBhbGVydChcItCd0LUg0LfQvdCw0LXQvCDRjdGC0L4g0YPQvNC10L3QuNC1XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKSB7XHJcbiAgc3dpdGNoKGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQpIHtcclxuICAgIGNhc2UgMTpcclxuICAgICAgYWRyZW5hbGluZShpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6IC8vINCf0L7QtNGA0LXQt9Cw0YLRjCDRgdGD0YXQvtC20LjQu9C40Y9cclxuICAgICAgY3V0X2xpbWJzKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzogLy8g0KHQu9Cw0LHQvtC1INC80LXRgdGC0L5cclxuICAgICAgd2Vha19zcG90KGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNDogLy8g0JvQtdGH0LXQvdC40LVcclxuICAgICAgaGVhbChpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDU6IC8vINCR0L7Qu9GM0YjQvtC5INCx0YDQsNGCXHJcbiAgICAgIGJpZ19icm8oaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA3OiAvLyDQv9C+0LbQuNGA0LDQvdC40LVcclxuICAgICAgZGV2b3VyKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgOTpcclxuICAgICAgYWJzb2x1dGVfcmVjb3ZlcnkoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxMjpcclxuICAgICAgZ2FzX2JvbWIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxMzpcclxuICAgICAgbGlnaHRfc291bmRfYm9tYihpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE0OlxyXG4gICAgICBzaG9ja193YXZlKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTU6XHJcbiAgICAgIHBpY2hfcGljaF9nbyhpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE2OlxyXG4gICAgICBmb3JjZV9maWVsZChpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxOTpcclxuICAgICAgbHVja3lfc2hvdChpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMDpcclxuICAgICAgbG90dGVyeV9zaG90KGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIyOlxyXG4gICAgICBwdW5jaF9yYWluZmFsbChpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMzpcclxuICAgICAgcG9pc29ub3VzX2FkcmVuYWxpbmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjQ6XHJcbiAgICAgIGFjaWRfYm9tYihpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyNjpcclxuICAgICAgaW50ZXJhY3QoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyODpcclxuICAgICAgY3VydmVkX2J1bGxldHMoaW5kZXgsIGNlbGwpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzMDpcclxuICAgICAgcXVpY2tfYXR0YWNrKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzE6XHJcbiAgICAgIHNhZmV0eV9zZXJ2aWNlKGluZGV4LCBjZWxsKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzI6XHJcbiAgICAgIGNhbGluZ2FsYXRvcihpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDMzOlxyXG4gICAgICBiZWx2ZXRfYnVmZihpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzNTpcclxuICAgICAgaG9vayhpbmRleCwgY2VsbClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAzNjpcclxuICAgICAgcHVuaXNoaW5nX3N0cmlrZShpbmRleCwgY2VsbCk7XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGFsZXJ0KFwiVW5rbm93biB0YXJnZXRlZCBza2lsbFwiKVxyXG4gIH1cclxuICBzdG9wX3NraWxsKClcclxufVxyXG5cclxuZnVuY3Rpb24gY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAzXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCA9IHNraWxsX2luZGV4XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkID0gY2hhcmFjdGVyX251bWJlclxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IHBvc2l0aW9uXHJcbiAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL0NoaWRvcmkud2VicFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBob29rKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb247XHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgaG9va19yYW5nZSkpIHtcclxuICAgIHZhciB0YXJnZXRfcG9zaXRpb24gPSBpbmRleDtcclxuICAgIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQ7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3RhcmdldF9wb3NpdGlvbl07XHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7XHJcbiAgICAgIHZhciB1c2VyX2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXModXNlcl9wb3NpdGlvbiwgZ2FtZV9zdGF0ZS5zaXplKTtcclxuICAgICAgdmFyIHRhcmdldF9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKHRhcmdldF9wb3NpdGlvbiwgZ2FtZV9zdGF0ZS5zaXplKTtcclxuICAgICAgdmFyIHVwZGF0ZWRfY29vcmQgPSB1c2VyX2Nvb3JkO1xyXG4gICAgICB2YXIgdmVjdG9yID0ge31cclxuICAgICAgdmVjdG9yLnggPSAodGFyZ2V0X2Nvb3JkLnggLSB1c2VyX2Nvb3JkLngpO1xyXG4gICAgICB2ZWN0b3IueSA9ICh0YXJnZXRfY29vcmQueSAtIHVzZXJfY29vcmQueSk7XHJcbiAgICAgIGlmICh2ZWN0b3IueCA+IDApIHtcclxuICAgICAgICB1cGRhdGVkX2Nvb3JkLnggKz0gMTtcclxuICAgICAgfSBlbHNlIGlmICh2ZWN0b3IueCA8IDApIHtcclxuICAgICAgICB1cGRhdGVkX2Nvb3JkLnggLT0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHZlY3Rvci55ID4gMCkge1xyXG4gICAgICAgIHVwZGF0ZWRfY29vcmQueSArPSAxO1xyXG4gICAgICB9IGVsc2UgaWYgKHZlY3Rvci55IDwgMCkge1xyXG4gICAgICAgIHVwZGF0ZWRfY29vcmQueSAtPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fVxyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHZhciBuZXdfcG9zaXRpb24gPSBjb29yZF90b19pbmRleCh1cGRhdGVkX2Nvb3JkLCBnYW1lX3N0YXRlLnNpemUpXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW25ld19wb3NpdGlvbl0gPT0gMCkge1xyXG4gICAgICAgIHRvU2VuZC5ob29rX3Bvc3NpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0b1NlbmQub2xkX3Bvc2l0aW9uID0gdGFyZ2V0X3Bvc2l0aW9uO1xyXG4gICAgICAgIHRvU2VuZC5uZXdfcG9zaXRpb24gPSBuZXdfcG9zaXRpb247XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLmhvb2tfcG9zc2libGUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0JLQsNGI0Lgg0YbQtdC70Lgg0LfQsCDQv9GA0LXQtNC10LvQsNC80Lgg0LzQvtC10LPQviDQv9C+0L3QuNC80LDQvdC40Y8sINC/0L7RjdGC0L7QvNGDINC90LXRglwiKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQnNCw0LrRgdC40LzQsNC70YzQvdGL0Lkg0YDQsNC00LjRg9GBINGF0YPQutCwIC0gMyDQutC70LXRgtC60LhcIik7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYmVsdmV0X3RyYW5zZm9ybWF0aW9uKHVzZXJfaW5kZXgsIHNraWxsX2luZGV4KSB7XHJcbiAgdmFyIHVzZXIgPSAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF07XHJcbiAgdmFyIHRhcmdldHNfc2V0ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iZWx2ZXRfYnVmZl91c2VyLnRhcmdldHNfc2V0O1xyXG4gIHZhciB0b3RhbF91cGdyYWRlID0gMDtcclxuICB2YXIgcm9sbGVkX2J1ZmZzX3RhcmdldHMgPSBbXTtcclxuICB2YXIgcm9sbGVkX2J1ZmZzX291dGNvbWVzID0gW107XHJcbiAgZm9yICh2YXIgdGFyZ2V0X2lkIG9mIHRhcmdldHNfc2V0KSB7XHJcbiAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2lkXTtcclxuICAgIHZhciB0YXJnZXRfc3RhY2tzID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaWRdLmJlbHZldF9idWZmX3N0YWNrcy5zdGFja3M7XHJcbiAgICB2YXIgYnVmZnNfYXJyYXkgPSBbXTtcclxuICAgIHZhciByb2xsZWRfYXJyYXkgPSBbMCwwLDAsMCwwXTtcclxuICAgIGJ1ZmZzX2FycmF5LnB1c2godGFyZ2V0LnN0cmVuZ3RoKTtcclxuICAgIGJ1ZmZzX2FycmF5LnB1c2godGFyZ2V0LnN0YW1pbmEpO1xyXG4gICAgYnVmZnNfYXJyYXkucHVzaCh0YXJnZXQuYWdpbGl0eSk7XHJcbiAgICBidWZmc19hcnJheS5wdXNoKHRhcmdldC5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgYnVmZnNfYXJyYXkucHVzaChjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW3RhcmdldF9pZF0gLSA4KTtcclxuICAgIHZhciB0b3RhbF9yb2xsID0gdGFyZ2V0LnN0cmVuZ3RoICsgdGFyZ2V0LnN0YW1pbmEgKyB0YXJnZXQuYWdpbGl0eSArIHRhcmdldC5pbnRlbGxpZ2VuY2UgKyBjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW3RhcmdldF9pZF0gLSA4O1xyXG4gICAgd2hpbGUgKHRhcmdldF9zdGFja3MgPiAwICYmIHRvdGFsX3JvbGwgPiAwKSB7XHJcbiAgICAgIHZhciByb2xsID0gcm9sbF94KHRvdGFsX3JvbGwpO1xyXG4gICAgICBpZiAocm9sbCA8PSBidWZmc19hcnJheVswXSkgey8vIHN0cmVuZ3RoXHJcbiAgICAgICAgYnVmZnNfYXJyYXlbMF0gLT0gMTtcclxuICAgICAgICByb2xsZWRfYXJyYXlbMF0gKz0gMTtcclxuICAgICAgfSBlbHNlIGlmIChyb2xsIDw9IGJ1ZmZzX2FycmF5WzBdICsgYnVmZnNfYXJyYXlbMV0pIHsvL3N0YW1pbmFcclxuICAgICAgICBidWZmc19hcnJheVsxXSAtPSAxO1xyXG4gICAgICAgIHJvbGxlZF9hcnJheVsxXSArPSAxO1xyXG4gICAgICB9IGVsc2UgaWYgKHJvbGwgPD0gYnVmZnNfYXJyYXlbMF0gKyBidWZmc19hcnJheVsxXSArIGJ1ZmZzX2FycmF5WzJdKSB7Ly8gYWdpbGl0eVxyXG4gICAgICAgIGJ1ZmZzX2FycmF5WzJdIC09IDE7XHJcbiAgICAgICAgcm9sbGVkX2FycmF5WzJdICs9IDE7XHJcbiAgICAgIH0gZWxzZSBpZiAocm9sbCA8PSBidWZmc19hcnJheVswXSArIGJ1ZmZzX2FycmF5WzFdICsgYnVmZnNfYXJyYXlbMl0gKyBidWZmc19hcnJheVszXSkgey8vIGludGVsbGlnZW5jZVxyXG4gICAgICAgIGJ1ZmZzX2FycmF5WzNdIC09IDE7XHJcbiAgICAgICAgcm9sbGVkX2FycmF5WzNdICs9IDE7XHJcbiAgICAgIH0gZWxzZSB7Ly8gS0RcclxuICAgICAgICBidWZmc19hcnJheVs0XSAtPSAxO1xyXG4gICAgICAgIHJvbGxlZF9hcnJheVs0XSArPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHRvdGFsX3JvbGwgLT0gMTtcclxuICAgICAgdGFyZ2V0X3N0YWNrcyAtPSAxO1xyXG4gICAgICB0b3RhbF91cGdyYWRlICs9IDE7XHJcbiAgICB9XHJcbiAgICByb2xsZWRfYnVmZnNfdGFyZ2V0cy5wdXNoKHRhcmdldF9pZCk7XHJcbiAgICByb2xsZWRfYnVmZnNfb3V0Y29tZXMucHVzaChyb2xsZWRfYXJyYXkpO1xyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfaW5kZXhcclxuICB0b1NlbmQudG90YWxfdXBncmFkZSA9IHRvdGFsX3VwZ3JhZGU7XHJcbiAgdG9TZW5kLnJvbGxlZF9idWZmc190YXJnZXRzID0gcm9sbGVkX2J1ZmZzX3RhcmdldHNcclxuICB0b1NlbmQucm9sbGVkX2J1ZmZzX291dGNvbWVzID0gcm9sbGVkX2J1ZmZzX291dGNvbWVzO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gc2FmZXR5X3NlcnZpY2UoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBzYWZldHlfc2VydmljZV9yYW5nZSkpIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwic2FmZXR5X3NlcnZpY2VfdGFyZ2V0XCIpKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0K3RgtCwINGG0LXQu9GMINGD0LbQtSDQv9C+0LQg0LfQsNGJ0LjRgtC+0LlcIilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQktGLINC90LUg0LzQvtC20LXRgtC1INC30LDRidC40YnQsNGC0Ywg0YEg0YLQsNC60L7Qs9C+INGA0LDRgdGB0YLQvtGP0L3QuNGPXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBiZWx2ZXRfYnVmZihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGJlbHZldF9idWZmX3JhbmdlKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJiZWx2ZXRfYnVmZl90YXJnZXRcIikpIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndCwINGN0YLQvtC8INC/0LXRgNGB0L7QvdCw0LbQtSDRg9C20LUg0LXRgdGC0Ywg0LDQutGC0LjQstC90YvQuSDQsdCw0YTRhCDRjdGC0L7Qs9C+INGC0LjQv9CwICjRg9Cy0YspXCIpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQsdCw0YTRhNCw0YLRjCAo0YXQtS3RhdC1KSDRgSDRgtCw0LrQvtCz0L4g0YDQsNGB0YHRgtC+0Y/QvdC40Y9cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdlYWtfc3BvdChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcblxyXG4gIHZhciBpbnRfY2hlY2sgPSByb2xsX3goMjApICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGludF9jaGVjayA+PSB3ZWFrX3Nwb3RfdGhyZXNob2xkKSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgfSBlbHNlIHtcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICB9XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZWFsKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgaGVhbF9yYW5nZSkpIHtcclxuXHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgaGVhbGVyX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdGFyZ2V0X2hwID0gY2hhcmFjdGVyX3N0YXRlLkhQW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0YXJnZXRfZnVsbF9ocCA9IEhQX3ZhbHVlc1t0YXJnZXRfY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgdmFyIHJhdGlvID0gcGFyc2VGbG9hdCh0YXJnZXRfaHApL3BhcnNlRmxvYXQodGFyZ2V0X2Z1bGxfaHApXHJcblxyXG4gIHZhciBoZWFsX3JvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoaGVhbGVyX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgIGhlYWxfcm9sbCA9IGhlYWxfcm9sbCArIHBhcnNlSW50KGhlYWxlcl9jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLmhlYWxfcm9sbCA9IGhlYWxfcm9sbFxyXG5cclxuICB2YXIgdGhyZXNob2xkID0gMFxyXG4gIHZhciBjcml0aWNhbF90aHJlc2hvbGQgPSAwXHJcblxyXG4gIGlmIChyYXRpbyA+IDAuOSkge1xyXG4gICAgdGhyZXNob2xkID0gMTBcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC43NSkge1xyXG4gICAgdGhyZXNob2xkID0gMTVcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjk1KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjBcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI5XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuOTUpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC44MilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjMpIHtcclxuICAgIHRocmVzaG9sZCA9IDIzXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSAzMlxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjgyKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC4xNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjZcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDM1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC40KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuMDUpIHtcclxuICAgIHRocmVzaG9sZCA9IDMwXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSA0MFxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjQpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC4yMilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgfVxyXG5cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0J3Rg9C20L3QviDQv9C+0LTQvtC50YLQuCDQsdC70LjQttC1INC6INGG0LXQu9C4INGH0YLQvtCx0Ysg0LLRi9C70LXRh9C40YLRjFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYmlnX2JybyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGJpZ19icm9fcmFuZ2UpKSB7XHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuXHJcbiAgdmFyIHNoaWVsZF9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICB2YXIgdGFyZ2V0X0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuXHJcbiAgdmFyIGJvbnVzX0tEID0gTWF0aC5tYXgoc2hpZWxkX0tEIC0gIHRhcmdldF9LRCwgMClcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5ib251c19LRCA9IGJvbnVzX0tEXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQkdC+0LvRjNGI0L7QuSDQsdGA0LDRgiDQvdC1INC00L7RgdGC0LDQtdGCINC00L4g0LzQsNC70L7Qs9C+IVwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1bmlzaGluZ19zdHJpa2UoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV07XHJcbiAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHN0YXRfYm9udXM7XHJcbiAgc3dpdGNoKHdlYXBvbi50eXBlKSB7XHJcbiAgICBjYXNlIFwibWVsZWVcIjpcclxuICAgICAgc3RhdF9ib251cyA9IGF0dGFja2luZ19jaGFyYWN0ZXIuc3RyZW5ndGg7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInJhbmdlZFwiOlxyXG4gICAgICBzdGF0X2JvbnVzID0gYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImVuZXJneVwiOlxyXG4gICAgICBzdGF0X2JvbnVzID0gYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgc3RhdF9ib251cyA9IDA7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKHN0YXRfYm9udXMpO1xyXG4gIHZhciBib251c19hdHRhY2sgPSBzdGF0X2JvbnVzICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKGluZGV4LCB1c2VyX3Bvc2l0aW9uKVxyXG4gIHZhciB0b1NlbmQgPSBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbiwgYWNjdW11bGF0ZWRfY292ZXIpO1xyXG4gIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgdmFyIGRhbWFnZV9yb2xsID0gdG9TZW5kLmRhbWFnZV9yb2xsXHJcbiAgICAgIHZhciBtdWx0aXBseWVyID0gMS4wIC0gcHVuaXNoaW5nX3N0cmlrZV9tdWx0aXBseWVyKihjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pO1xyXG4gICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgKj0gbXVsdGlwbHllcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gaW5jcmVhc2UgYXR0YWNrIHJvbGwgYnkgYWdpbGl0eSBib251cyAoMiptb2QpXHJcbmZ1bmN0aW9uIGN1dF9saW1icyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuICBpZiAod2VhcG9uLnR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgIHZhciBib251c19hdHRhY2sgPSAyKnBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuYWdpbGl0eSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgICB2YXIgYWNjdW11bGF0ZWRfY292ZXIgPSBnZXRfYWNjdW11bGF0ZWRfY292ZXIoaW5kZXgsIHVzZXJfcG9zaXRpb24pXHJcbiAgICB2YXIgdG9TZW5kID0gZGFtYWdlX3NraWxsX3RlbXBsYXRlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCwgYm9udXNfYXR0YWNrLCB3ZWFwb24sIGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gICAgaWYgKHRvU2VuZCA9PSBudWxsKSB7XHJcbiAgICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJmdWxsX2NyaXRcIikge1xyXG4gICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IHRvU2VuZC5kYW1hZ2Vfcm9sbFxyXG4gICAgICAgIHZhciBmbGF0X2RhbWFnZSA9IGRhbWFnZV9yb2xsIC0gc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLnN0cmVuZ3RoKV0gLSBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICB2YXIgZnVsbF9kYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgIGlmIChmbGF0X2RhbWFnZSA+IGZ1bGxfZGFtYWdlLzMpIHtcclxuICAgICAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB9ICBlbHNlIHtcclxuICAgICAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfVxyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQktGLINC90LUg0LzQvtC20LXRgtC1INC/0L7QtNGA0LXQt9Cw0YLRjCDRgdGD0YXQvtC20LjQu9GM0Y8g0Y3RgtC40Lwg0L7RgNGD0LbQuNC10LxcIilcclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gcXVpY2tfYXR0YWNrKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIGlmICh3ZWFwb24uaGFzT3duUHJvcGVydHkoXCJzdWJ0eXBlXCIpICYmIHdlYXBvbi5zdWJ0eXBlID09IFwiUFBcIikge1xyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYm9udXNfYXR0YWNrID0gcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gZ2V0X2FjY3VtdWxhdGVkX2NvdmVyKGluZGV4LCB1c2VyX3Bvc2l0aW9uKVxyXG4gICAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICAgIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSB0b1NlbmQuZGFtYWdlX3JvbGwvMjsgLy8g0LHRi9GB0YLRgNCw0Y8g0LDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiDQv9C+0LvQvtCy0LjQvdGDINGD0YDQvtC90LBcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCR0YvRgdGC0YDRg9GOINCw0YLQsNC60YMg0LzQvtC20L3QviDRgdC+0LLQtdGA0YjQuNGC0Ywg0YLQvtC70YzQutC+INC/0LjRgdGC0L7Qu9C10YLQvtC8LdC/0YPQu9C10LzQtdGC0L7QvFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHVuY2hfcmFpbmZhbGwoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3VzZXJfY2hhcmFjdGVyX251bWJlcl1dXHJcbiAgaWYgKHdlYXBvbi50eXBlID09IFwibWVsZWVcIikge1xyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJfaWQgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcl9pZF1cclxuICAgIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmFnaWxpdHkpICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgdmFyIHRvdGFsX2RhbWFnZSA9IDA7XHJcbiAgICB2YXIgYXR0YWNrc19zdWNjZXNzZnVsID0gMDtcclxuICAgIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3ZlcihpbmRleCwgdXNlcl9wb3NpdGlvbik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdOyBpKyspIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICAgICAgaWYgKHRvU2VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgICAgICAgYXR0YWNrc19zdWNjZXNzZnVsID0gYXR0YWNrc19zdWNjZXNzZnVsICsgMTtcclxuICAgICAgICAgICAgdG90YWxfZGFtYWdlID0gdG90YWxfZGFtYWdlICsgdG9TZW5kLmRhbWFnZV9yb2xsO1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyX2lkXSA9IDA7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRvU2VuZC5vdXRjb21lID09IFwiZXZhZGVkXCIgJiYgdGFyZ2V0X2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgIT0gXCJyb2d1ZVwiKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJfaWRdID0gMDtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBtdWx0aXBseWVyID0gMS4wICsgcGFyc2VGbG9hdChhdHRhY2tzX3N1Y2Nlc3NmdWwgLSAxKS8yLjBcclxuICAgIHZhciBtZXNzYWdlID0gXCLQnNC90L7QttC40YLQtdC70Ywg0LPRgNCw0LTQsCDQsdGL0Ls6IFwiICsgbXVsdGlwbHllclxyXG4gICAgY29uc29sZS5sb2cobWVzc2FnZSlcclxuICAgIHZhciBmaW5hbF9kYW1hZ2UgPSBwYXJzZUludChwYXJzZUZsb2F0KHRvdGFsX2RhbWFnZSkqbXVsdGlwbHllcilcclxuXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcl9pZFxyXG4gICAgdG9TZW5kLnRvdGFsX2F0dGFja3MgPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdG9TZW5kLnN1Y2Nlc3NmdWxsX2F0dGFja3MgPSBhdHRhY2tzX3N1Y2Nlc3NmdWxcclxuICAgIHRvU2VuZC5kYW1hZ2UgPSBmaW5hbF9kYW1hZ2VcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQk9GA0LDQtCDRg9C00LDRgNC+0LIg0LzQvtC20L3QviDRgdC+0LLRgNC10YjQuNGC0Ywg0YLQvtC70YzQutC+INGA0YPQutC+0L/QsNGI0L3Ri9C8INC+0YDRg9C20LjQtdC8IVwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvY2tfd2F2ZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgYm9udXNfYXR0YWNrID0gcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3ZlcihpbmRleCwgdXNlcl9wb3NpdGlvbik7XHJcbiAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIiB8fCB0b1NlbmQub3V0Y29tZSA9PSBcImZ1bGxfY3JpdFwiKSB7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGV2b3VyKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgMSkpIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgc3RhY2tzID0gMFxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiTWFya3VzX3N0YWNrc1wiKSkge1xyXG4gICAgICBzdGFja3MgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5NYXJrdXNfc3RhY2tzXHJcbiAgICB9XHJcbiAgICB2YXIgZGFtYWdlID0gc3RhY2tzKjUgKyByb2xsX3goMTApXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFic29sdXRlX3JlY292ZXJ5KGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgMSkpIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgaGVhbF9hbW91bnQgPSAwXHJcblxyXG4gICAgdmFyIGRhbWFnZV9maWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFtYWdlX2ZpZWxkXCIpO1xyXG4gICAgaWYgKCEoZGFtYWdlX2ZpZWxkLnZhbHVlID09PSBcIlwiKSkge1xyXG4gICAgICBoZWFsX2Ftb3VudCA9IHBhcnNlSW50KGRhbWFnZV9maWVsZC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJpb3Bvb2wgPSAwXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYmlvcG9vbFwiKSkge1xyXG4gICAgICBiaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmJpb3Bvb2xcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaGVhbF9hbW91bnQgPiAwICYmIGJpb3Bvb2wgPj0gaGVhbF9hbW91bnQpIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHRvU2VuZC5oZWFsX2Ftb3VudCA9IGhlYWxfYW1vdW50XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC10LLQvtC30LzQvtC20L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LvQtdGH0LXQvdC40Y9cIilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2FzX2JvbWIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0aHJvd19yYW5nZSA9IGZpbmRUaHJvd1JhbmdlKGNoYXJhY3RlcilcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB0aHJvd19yYW5nZSkpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHRvU2VuZC50aHJlc2hvbGQgPSBnYXNfYm9tYl90aHJlc2hvbGRcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7Ly8g0LDQvdC40LzQsNGG0LjRjyDRgtC+0LvRjNC60L4g0LIg0L/Rg9GB0YLRg9GOINC60LvQtdGC0LrRg1xyXG4gICAgICBhZGRfb2JzdGFjbGVfY29tbWFuZChpbmRleCwgZ2FzX2JvbWJfb2JzdGFjbGUpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JzQsNC70L4g0LrQsNGI0Lgg0LXQu9C4INC00LvRjyDRgtCw0LrQvtCz0L4g0LHRgNC+0YHQutCwXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYWxpbmdhbGF0b3IoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7Ly8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YLRgdGPINGC0L7Qu9GM0LrQviDQsiDQv9GD0YHRgtGD0Y4g0LrQu9C10YLQutGDXHJcbiAgICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCBjYWxpbmdhbGF0b3JfcmFuZ2UpKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgICAgYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIGNhbGluZ2FsYXRvcl9vYnN0YWNsZSlcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCa0LDQu9GM0LjQvdCz0LDQu9C70Y/RgtC+0YAg0LzQvtC20L3QviDRg9GB0YLQsNC90L7QstC40YLRjCDQu9C40YjRjCDQsiDQv9GA0LXQtNC10LvQsNGFIDEuNSDQutC70LXRgtC60Lgg0L7RgiDQstCw0YFcIilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQmtCw0LvRjNC40L3Qs9Cw0LvQu9GP0YLQvtGAINC80L7QttC90L4g0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0LvQuNGI0Ywg0LIg0L/Rg9GB0YLRg9GOINC60LvQtdGC0LrRg1wiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGlmZnVzZV9sYW5kbWluZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cykpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHRvU2VuZC5pbnRlcmFjdGlvbl90eXBlID0gJ2RpZmZ1c2VfbGFuZG1pbmUnO1xyXG5cclxuICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMoaW5kZXgpKSB7XHJcbiAgICAgIHZhciByb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgIGlmIChyb2xsID4gbGFuZG1pbmVfZGlmZnVzZV90aHJlc2hvbGQpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZW1wdHlcIjtcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCh0LvQuNGI0LrQvtC8INC00LDQu9C10LrQviDQtNC70Y8g0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0LjRj1wiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFja2luZ19ib251cyhjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG4gIHZhciBib251cyA9IHBhcnNlSW50KGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpO1xyXG4gIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwiZW5naW5lZXJcIikge1xyXG4gICAgYm9udXMgKj0gMjtcclxuICB9XHJcbiAgcmV0dXJuIGJvbnVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlcl9oYWNraW5nKGluZGV4LCBvYnN0YWNsZV9udW1iZXIpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbjtcclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkO1xyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGNvbXB1dGVyX2ludGVyYWN0aW9uX3JhZGl1cykpIHtcclxuICAgIHZhciBoYWNrX3N0YWdlID0gMDtcclxuICAgIHZhciBoYWNrX2ZhaWxzID0gMDtcclxuICAgIHZhciBpbmZvX29iamVjdCA9IGdhbWVfc3RhdGUub2JzdGFjbGVfZXh0cmFfaW5mb1tpbmRleF07XHJcbiAgICBpZiAoaW5mb19vYmplY3QuaGFzT3duUHJvcGVydHkoXCJoYWNrX3N0YWdlXCIpKSB7XHJcbiAgICAgIGhhY2tfc3RhZ2UgPSBpbmZvX29iamVjdC5oYWNrX3N0YWdlO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZm9fb2JqZWN0Lmhhc093blByb3BlcnR5KFwiaGFja19mYWlsc1wiKSkge1xyXG4gICAgICBoYWNrX2ZhaWxzID0gaW5mb19vYmplY3QuaGFja19mYWlscztcclxuICAgIH1cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHRvU2VuZC5pbnRlcmFjdGlvbl90eXBlID0gJ2hhY2thYmxlX2NvbXB1dGVyJztcclxuXHJcbiAgICBpZiAoaGFja19zdGFnZSA8IDMgJiYgaGFja19mYWlscyA8IDMpIHsvLyB0aGVyZSBpcyBwb2ludCB0byByb2xsXHJcbiAgICAgIHZhciBoYWNrX3JvbGwgPSByb2xsX3goMjApO1xyXG4gICAgICBpZiAoaGFja19yb2xsID09IDIwKSB7Ly8gY3JpdFxyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gJ2hhY2tlZCc7XHJcbiAgICAgIH0gZWxzZSBpZiAoaGFja19yb2xsID09IDEpIHsvLyBhbnRpY3JpdFxyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gJ2ZhaWxlZCc7XHJcbiAgICAgIH0gZWxzZSB7Ly8gbm9ybWFsXHJcbiAgICAgICAgaGFja19yb2xsICs9IGhhY2tpbmdfYm9udXModXNlcl9jaGFyYWN0ZXJfbnVtYmVyKTtcclxuICAgICAgICBpZiAoaGFja19yb2xsIDwgaGFja2luZ19jcml0aWNhbF9mYWlsX3RocmVzaG9sZCkge1xyXG4gICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSAnZmFpbGVkJztcclxuICAgICAgICB9IGVsc2UgaWYgKGhhY2tfcm9sbCA8IGhhY2tpbmdfc3VjY2Vzc190aHJlc2hvbGQpIHtcclxuICAgICAgICAgIGhhY2tfZmFpbHMgKz0gMTtcclxuICAgICAgICAgIGlmIChoYWNrX2ZhaWxzID09IDMpIHtcclxuICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSAnZmFpbGVkJztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gJ29uZV9mYWlsJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGhhY2tfcm9sbCA8IGhhY2tpbmdfY3JpdGljYWxfc3VjY2Vzc190aHJlc2hvbGQpIHtcclxuICAgICAgICAgIGhhY2tfc3RhZ2UgKz0gMTtcclxuICAgICAgICAgIGlmIChoYWNrX3N0YWdlID09IDMpIHtcclxuICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSAnaGFja2VkJztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gJ29uZV9zdWNjZXNzJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSAnaGFja2VkJztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoaGFja19zdGFnZSA+PSAzKSB7Ly8gYWxyZWFkeSBoYWNrZWRcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSAnYWxyZWFkeV9oYWNrZWQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSAnYWxyZWFkeV9mYWlsZWQnO1xyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLQt9C70L7QvCDQutC+0LzQv9GM0Y7RgtC10YDQsCDQtNC+0LvQttC10L0g0L7RgdGD0YnQtdGB0YLQstC70Y/RgtGM0YHRjyDRgSDRgNCw0YHRgdGC0L7Rj9C90LjRjyAxINC60LvQtdGC0LrQuFwiKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVyYWN0KGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIG9iamVjdF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XTtcclxuICBpZiAob2JqZWN0X251bWJlciA9PSAwKSB7Ly8gZW1wdHksIHNvIGRpZmZ1c2UgbGFuZG1pbmUgbW9kXHJcbiAgICBkaWZmdXNlX2xhbmRtaW5lKGluZGV4LCBjZWxsKTtcclxuICB9IGVsc2UgaWYgKG9iamVjdF9udW1iZXIgPCAwKSB7Ly8gb2JzdGFjbGUgaW50ZXJhY3Rpb25cclxuICAgIHZhciBvYnN0YWNsZV9udW1iZXIgPSBNYXRoLmFicyhvYmplY3RfbnVtYmVyKTtcclxuICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9bb2JzdGFjbGVfbnVtYmVyXTtcclxuICAgIGlmIChvYnN0YWNsZS5oYXNPd25Qcm9wZXJ0eShcImhhY2thYmxlX2NvbXB1dGVyXCIpKSB7XHJcbiAgICAgIGNvbXB1dGVyX2hhY2tpbmcoaW5kZXgsIG9ic3RhY2xlX251bWJlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYWNpZF9ib21iKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGhyb3dfcmFuZ2UgPSBmaW5kVGhyb3dSYW5nZShjaGFyYWN0ZXIpXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgdGhyb3dfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQnNCw0LvQviDQutCw0YjQuCDQtdC70Lgg0LTQu9GPINGC0LDQutC+0LPQviDQsdGA0L7RgdC60LBcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpZ2h0X3NvdW5kX2JvbWIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgbGlnaHRfc291bmRfYm9tYl9yYW5nZSkpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuXHJcbiAgdmFyIGNoYXJhY3Rlcl9saXN0ID0gW11cclxuICB2YXIgb3V0Y29tZV9saXN0ID0gW11cclxuXHJcbiAgdmFyIHJhZGl1cyA9IGxpZ2h0X3NvdW5kX2JvbWJfcmFkaXVzXHJcblxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhZGl1cylcclxuICBjb25zb2xlLmxvZyhjYW5kaWRhdGVfY2VsbHMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0LHQvtC80LHRi1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlICE9PSBcImRyb25lXCIpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfbGlzdC5wdXNoKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIHZhciBzYXZlX3JvbGwgPSByb2xsX3goMjApICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gKyBwYXJzZUludChjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gICAgICAgIGlmIChzYXZlX3JvbGwgPiBsaWdodF9zb3VuZF9ib21iX3RocmVzaG9sZCkge1xyXG4gICAgICAgICAgb3V0Y29tZV9saXN0LnB1c2goMClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb3V0Y29tZV9saXN0LnB1c2goMSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9saXN0ID0gY2hhcmFjdGVyX2xpc3RcclxuICB0b1NlbmQub3V0Y29tZV9saXN0ID0gb3V0Y29tZV9saXN0XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59IGVsc2Uge1xyXG4gIGFsZXJ0KFwi0JTRgNC+0L0g0L3QtSDQtNC+0LrQuNC90LXRglwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcmNlX2ZpZWxkKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGZvcmNlX2ZpZWxkX3JhbmdlKSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG5cclxuICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgdmFyIHNoaWVsZCA9IE1hdGguY2VpbChwYXJzZUZsb2F0KEhQX3ZhbHVlc1t1c2VyLnN0YW1pbmFdKS8yKVxyXG4gIHRvU2VuZC5zaGllbGQgPSBzaGllbGRcclxuXHJcbiAgdmFyIGNoYXJhY3Rlcl9saXN0ID0gW11cclxuXHJcbiAgdmFyIHJhZGl1cyA9IGZvcmNlX2ZpZWxkX3JhZGl1c1xyXG5cclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gaW5kZXhfaW5fcmFkaXVzKGluZGV4LCByYWRpdXMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0YnQuNGC0LBcclxuICAgICAgICBjaGFyYWN0ZXJfbGlzdC5wdXNoKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgfVxyXG4gIH1cclxuICB0b1NlbmQuY2VsbHNfcHJvdGVjdGVkID0gY2FuZGlkYXRlX2NlbGxzXHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9saXN0ID0gY2hhcmFjdGVyX2xpc3RcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIGZvcmNlX2ZpZWxkX29ic3RhY2xlKVxyXG59IGVsc2Uge1xyXG4gIGFsZXJ0KFwi0JPQtdC90LXRgNCw0YLQvtGAINC00L7Qu9C20LXQvSDQsdGL0YLRjCDRg9GB0YLQsNC90L7QstC70LXQvSDQv9C+0LHQu9C40LbQtVwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkcmVuYWxpbmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciBhZHJlbmFsaW5lX3JhbmdlID0gMVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGFkcmVuYWxpbmVfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaW5kZXggPSB0YXJnZXRfbnVtYmVyXHJcbiAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IHJvbGxfeCg0KVxyXG4gICAgdmFyIG1pbnVzX2FjdGlvbnMgPSByb2xsX3goNClcclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgdG9TZW5kLm1pbnVzX2FjdGlvbnMgPSBtaW51c19hY3Rpb25zXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcG9pc29ub3VzX2FkcmVuYWxpbmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHBvaXNvbm91c19hZHJlbmFsaW5lX3JhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2luZGV4ID0gdGFyZ2V0X251bWJlclxyXG4gICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBbXVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbjsgaSsrKSB7XHJcbiAgICAgIGV4dHJhX2FjdGlvbnMucHVzaChyb2xsX3goNCkpXHJcbiAgICB9XHJcbiAgICB0b1NlbmQuZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnNcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCg0LDQtNC40YPRgSDQsNC00YDQtdC90LDQu9C40L3QsCAxINC60LvQtdGC0LrQsCFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBpY2hfcGljaF9nbyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfbnVtYmVyXVxyXG4gIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlID09IFwiZHJvbmVcIikge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2luZGV4ID0gdGFyZ2V0X251bWJlclxyXG4gICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBNYXRoLmNlaWwocGFyc2VGbG9hdCh1c2VyLmludGVsbGlnZW5jZSkvMilcclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQv9GL0Ykt0L/Ri9GJINC60L7Qs9C+INC/0L7Qv9Cw0LvQviFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGx1Y2t5X3Nob3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbF94KDEwKVxyXG4gICAgaWYgKHRvU2VuZC5yb2xsID09IDcpIHtcclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IHJvbGxfeCg3KVxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb3R0ZXJ5X3Nob3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbF94KDEwMClcclxuICAgIGlmICh0b1NlbmQucm9sbCA9PSA3KSB7XHJcbiAgICAgIHZhciBkYW1hZ2UgPSAwXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KDcpXHJcbiAgICAgIH1cclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZVxyXG4gICAgfSBlbHNlIGlmICh0b1NlbmQucm9sbCA9PSA3Nykge1xyXG4gICAgICB2YXIgZGFtYWdlID0gMFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE0OyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3goNylcclxuICAgICAgfVxyXG4gICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGN1cnZlZF9idWxsZXRzKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWltXCIpKSB7XHJcbiAgICBib251c19hdHRhY2sgPSBib251c19hdHRhY2sgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSk7XHJcbiAgfVxyXG4gIHZhciBhY2N1bXVsYXRlZF9jb3ZlciA9IGdldF9hY2N1bXVsYXRlZF9jb3ZlcihpbmRleCwgdXNlcl9wb3NpdGlvbik7XHJcbiAgYWNjdW11bGF0ZWRfY292ZXIgPSBNYXRoLm1heChwYXJzZUludChwYXJzZUZsb2F0KGFjY3VtdWxhdGVkX2NvdmVyKS8yKSAtIDIsIDApXHJcbiAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uLCBhY2N1bXVsYXRlZF9jb3ZlcilcclxuICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSkge1xyXG4gICAgICB0b1NlbmQuYWltX292ZXIgPSAxO1xyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBoZWxwZXIgZnVuY3Rpb24gcGF0dGVybnNcclxuZnVuY3Rpb24gY2hlY2tfY29vbGRvd24oY2hhcmFjdGVyX251bWJlciwgZWZmZWN0LCBtZXNzYWdlKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoZWZmZWN0KSkge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl1bZWZmZWN0XS5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdW2VmZmVjdF1cclxuICAgICAgaWYgKG1lc3NhZ2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXVtlZmZlY3RdLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXVtlZmZlY3RdLmNvb2xkb3duIC0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVzdG9yZV9ocChjaGFyYWN0ZXJfbnVtYmVyLCBhbW91bnQpIHtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICBjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gPSBNYXRoLm1pbihjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gKyBhbW91bnQsIEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KHByb3BlcnR5LCBjaGFyYWN0ZXJfbnVtYmVyLCBhbW91bnQpIHtcclxuICBjaGFyYWN0ZXJfc3RhdGVbcHJvcGVydHldW2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlW3Byb3BlcnR5XVtjaGFyYWN0ZXJfbnVtYmVyXSArIGFtb3VudFxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VfY2hhcmFjdGVyX2RldGFpbGVkX2F0dHJpYnV0ZShhdHRyaWJ1dGUsIGNoYXJhY3Rlcl9udW1iZXIsIGFtb3VudCkge1xyXG4gIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdW2F0dHJpYnV0ZV0gPSBwYXJzZUludChjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVthdHRyaWJ1dGVdKSArIGFtb3VudFxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseV9lZmZlY3QoY2hhcmFjdGVyX251bWJlciwgZWZmZWN0X251bWJlcikge1xyXG5cclxuICBlZmZlY3RfbnVtYmVyID0gcGFyc2VJbnQoZWZmZWN0X251bWJlcik7XHJcbiAgc3dpdGNoIChlZmZlY3RfbnVtYmVyKSB7XHJcbiAgICBjYXNlIDA6IC8vINGD0LLQtdC70LjRh9C40YLRjCDRgdC40LvRg1xyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX2RldGFpbGVkX2F0dHJpYnV0ZShcInN0cmVuZ3RoXCIsIGNoYXJhY3Rlcl9udW1iZXIsIDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTogLy8g0YPQstC10LvQuNGH0LjRgtGMINGC0LXQu9C+0YHQu9C+0LbQtdC90LjQtVxyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX2RldGFpbGVkX2F0dHJpYnV0ZShcInN0YW1pbmFcIiwgY2hhcmFjdGVyX251bWJlciwgMSk7XHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXTtcclxuICAgICAgdmFyIHN0YW1pbmEgPSBjaGFyYWN0ZXIuc3RhbWluYTtcclxuXHJcbiAgICAgIHZhciBocF91cGdyYWRlID0gSFBfdmFsdWVzW3N0YW1pbmFdIC0gSFBfdmFsdWVzW3N0YW1pbmEgLSAxXTtcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcIkhQXCIsIGNoYXJhY3Rlcl9udW1iZXIsIGhwX3VwZ3JhZGUpO1xyXG5cclxuICAgICAgdmFyIHN0YW1pbmFfdXBncmFkZSA9IHN0YW1pbmFfdmFsdWVzW3N0YW1pbmFdIC0gc3RhbWluYV92YWx1ZXNbc3RhbWluYSAtIDFdO1xyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwic3RhbWluYVwiLCBjaGFyYWN0ZXJfbnVtYmVyLCBzdGFtaW5hX3VwZ3JhZGUpO1xyXG5cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6IC8vINGD0LLQtdC70LjRh9C40YLRjCDQu9C+0LLQutC+0YHRgtGMXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfZGV0YWlsZWRfYXR0cmlidXRlKFwiYWdpbGl0eVwiLCBjaGFyYWN0ZXJfbnVtYmVyLCAxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM6IC8vINGD0LLQtdC70LjRh9C40YLRjCDQuNC90YLQtdC70LvQtdC60YJcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9kZXRhaWxlZF9hdHRyaWJ1dGUoXCJpbnRlbGxpZ2VuY2VcIiwgY2hhcmFjdGVyX251bWJlciwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA0OiAvLyDRg9Cy0LXQu9C40YfQuNGC0Ywg0JrQlFxyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwiYm9udXNfS0RcIiwgY2hhcmFjdGVyX251bWJlciwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNTogLy8g0YPQvNC10L3RjNGI0LjRgtGMINGB0LjQu9GDXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfZGV0YWlsZWRfYXR0cmlidXRlKFwic3RyZW5ndGhcIiwgY2hhcmFjdGVyX251bWJlciwgLTEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNjogLy8g0YPQvNC10L3RjNGI0LjRgtGMINGC0LXQu9C+0YHQu9C+0LbQtdC90LjQtVxyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX2RldGFpbGVkX2F0dHJpYnV0ZShcInN0YW1pbmFcIiwgY2hhcmFjdGVyX251bWJlciwgLTEpO1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl07XHJcbiAgICAgIHZhciBzdGFtaW5hID0gY2hhcmFjdGVyLnN0YW1pbmE7XHJcbiAgICAgIHZhciBocF91cGdyYWRlID0gTWF0aC5tYXgoSFBfdmFsdWVzW3N0YW1pbmFdIC0gSFBfdmFsdWVzW3N0YW1pbmEgKyAxXSwgLTEqY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdICsgMSk7XHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJIUFwiLCBjaGFyYWN0ZXJfbnVtYmVyLCBocF91cGdyYWRlKTtcclxuXHJcbiAgICAgIHZhciBzdGFtaW5hX3VwZ3JhZGUgPSBNYXRoLm1heChzdGFtaW5hX3ZhbHVlc1tzdGFtaW5hXSAtIHN0YW1pbmFfdmFsdWVzW3N0YW1pbmEgKyAxXSwgLTEqY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0gKyAxKTtcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcInN0YW1pbmFcIiwgY2hhcmFjdGVyX251bWJlciwgc3RhbWluYV91cGdyYWRlKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDc6IC8vINGD0LzQtdC90YzRiNC40YLRjCDQu9C+0LLQutC+0YHRgtGMXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfZGV0YWlsZWRfYXR0cmlidXRlKFwiYWdpbGl0eVwiLCBjaGFyYWN0ZXJfbnVtYmVyLCAtMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA4OiAvLyDRg9C80LXQvdGM0YjQuNGC0Ywg0LjQvdGC0LXQu9C70LXQutGCXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfZGV0YWlsZWRfYXR0cmlidXRlKFwiaW50ZWxsaWdlbmNlXCIsIGNoYXJhY3Rlcl9udW1iZXIsIC0xKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDk6IC8vINGD0LzQtdC90YzRiNC40YLRjCDQmtCUXHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJib251c19LRFwiLCBjaGFyYWN0ZXJfbnVtYmVyLCAtMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgY29uc29sZS5sb2coXCJUcmllZCB0byBhcHBseSB1bmtub3duIGVmZmVjdFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9yY2VkX21vdmVtZW50KGZyb21faW5kZXgsIHRvX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVt0b19pbmRleF0gPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA9IHRvX2luZGV4O1xyXG4gIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG5cclxuICBpZiAoISgoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbdG9faW5kZXhdID09IDEpKSB8fCAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSAhPSBcImFsbFwiICYmIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gIT0gbXlfbmFtZSkpKSB7XHJcbiAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcbiAgICB0b19jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShjaGFyYWN0ZXJfbnVtYmVyKTtcclxuICB9XHJcblxyXG4gIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2Zyb21faW5kZXhdID09IDEpKSkge1xyXG4gICAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZnJvbV9pbmRleCk7XHJcbiAgICBvbGRfY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICB9XHJcbn1cclxuXHJcbi8vINC/0YDQvtC6INCz0LDQt9C+0LLQvtC5INCz0YDQsNC90LDRgtGLXHJcbmZ1bmN0aW9uIGFwcGx5X2JvbWIocG9zaXRpb24sIHJhZGl1cykge1xyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMocG9zaXRpb24sIHJhZGl1cylcclxuICAvL2NvbnNvbGUubG9nKGNhbmRpZGF0ZV9jZWxscylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZV9jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjYW5kaWRhdGVfY2VsbHNbaV1dXHJcbiAgICBpZiAodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPiAwKSB7Ly8g0L/QtdGA0YHQvtC90LDQtiDQsiDRgNCw0LTQuNGD0YHQtSDQsdC+0LzQsdGLXHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0L7Qv9Cw0LTQsNC10YIg0L/QvtC0INC00LXQudGB0YLQstC40LUg0LPQsNC30L7QstC+0Lkg0LHQvtC80LHRi1wiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgKyAxXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGdhc19ib21iX3BvaXNvbl9vYmplY3QgPSB7fVxyXG4gICAgICAgIGdhc19ib21iX3BvaXNvbl9vYmplY3QucG9pc29uX2xldmVsID0gMVxyXG4gICAgICAgIGdhc19ib21iX3BvaXNvbl9vYmplY3QudGhyZXNob2xkID0gZ2FzX2JvbWJfdGhyZXNob2xkXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uID0gZ2FzX2JvbWJfcG9pc29uX29iamVjdFxyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdIC0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlfY2FsaW5nYWxhdG9yKHBvc2l0aW9uLCByYWRpdXMsIGZsYXRfaGVhbCwgcm9sbF9oZWFsLCBoZWFsX3JvbGxfbGlzdCwgY29pbl9mbGlwX2xpc3QpIHtcclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gaW5kZXhfaW5fcmFkaXVzKHBvc2l0aW9uLCByYWRpdXMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0LTQu9GPINC+0YLRhdC40LvQsFxyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIHZhciByb2xsZWRfaGVhbCA9IGZsYXRfaGVhbCArIGhlYWxfcm9sbF9saXN0W3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXTtcclxuICAgICAgcmVzdG9yZV9ocCh0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgcm9sbGVkX2hlYWwpO1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQtNGL0YXQsNC10YIg0YbQtdC70LXQsdC90YvQtSDQv9Cw0YDRiyDQuCDQstC+0YHRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIgXCIgKyByb2xsZWRfaGVhbCArIFwiINGF0L8uXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICB2YXIgY29pbiA9IGNvaW5fZmxpcF9saXN0W3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXTtcclxuXHJcbiAgICAgIHZhciBub3RlID0gXCJcIjtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiY2FsaW5nYWxhdG9yX3RhcmdldFwiKSkge1xyXG4gICAgICAgIHZhciBzdGFnZSA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQuc3RhZ2U7XHJcbiAgICAgICAgc3dpdGNoKHN0YWdlKSB7XHJcbiAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIGlmIChjb2luID4gNSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQuc3RhZ2UgPSAyO1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQuZHVyYXRpb24gPSBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMjtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5jYWxpbmdhbGF0b3JfdGFyZ2V0LnBlbmFsdHkgPSBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTI7XHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcImF0dGFja19ib251c1wiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgY2FsaW5nYWxhdG9yX3BlbmFsdHlfc3RhZ2UyIC0gY2FsaW5nYWxhdG9yX3BlbmFsdHlfc3RhZ2UxKVxyXG4gICAgICAgICAgICAgIG5vdGUgPSBcItCa0LDQu9C40L3Qs9Cw0LvRj9GC0L7RgCDQstC90L7QstGMINGD0LTQsNGA0LjQuyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LIg0LPQvtC70L7QstGDLiDQktGC0L7RgNCw0Y8g0YHRgtCw0LTQuNGPINC+0YLRgNCw0LLQu9C10L3QuNGPLiDQnNC+0LbQtdGCINC/0L7RgNCwINC+0YHRgtCw0L3QvtCy0LjRgtGB0Y8/Li5cIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG5vdGUgPSBcItCd0LAg0Y3RgtC+0YIg0YDQsNC3IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQuNC30LHQtdC20LDQuyDQvdC10LPQsNGC0LjQstC90YvRhSDRjdGE0YTQtdC60YLQvtCyINC60LDQu9C40L3Qs9Cw0LvRj9GC0L7RgNCwLiDQodGC0LDQtNC40Y8g0L7RgdGC0LDQtdGC0YHRjyDQv9C10YDQstC+0LkuXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgaWYgKGNvaW4gPCA1KSB7Ly8xLTQgPSBiYWQgcm9sbCwgcG9pc29uaW5nXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5zdGFnZSA9IDM7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5kdXJhdGlvbiA9IGNhbGluZ2FsYXRvcl9wb2lzb25pbmdfZHVyYXRpb25fc3RhZ2UzO1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQucGVuYWx0eSA9IGNhbGluZ2FsYXRvcl9wZW5hbHR5X3N0YWdlMztcclxuICAgICAgICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwiYXR0YWNrX2JvbnVzXCIsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyLCBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTMgLSBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTIpXHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcIm1lbGVlX2FkdmFudGFnZVwiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgLTEpXHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcInJhbmdlZF9hZHZhbnRhZ2VcIiwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIC0xKVxyXG4gICAgICAgICAgICAgIG5vdGUgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGB0YLQvtC40LvQviDQvtGB0YLQsNC90L7QstC40YLRjNGB0Y8g0YDQsNC90YzRiNC1LiDQotC10L/QtdGA0Ywg0LPQvtC70L7QstC+0LrRgNGD0LbQtdC90LjQtSDQvtGB0YLQsNC90LXRgtGB0Y8g0YEg0LLQsNC80Lgg0L3QsNC00L7Qu9Cz0L4uXCJcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb2luIDwgMTApIHsvLyA1LTkgbm8gZWZmZWN0LCBrZWVwIHJvbGxpbmdcclxuICAgICAgICAgICAgICBub3RlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRhdC+0LTQuNGCINC/0L4g0L7Rh9C10L3RjCDRgtC+0L3QutC+0LzRgyDQu9GM0LTRgy4g0KHRgtCw0LTQuNGPINC+0YHRgtCw0LXRgtGB0Y8g0LLRgtC+0YDQvtC5LiDQn9C+0LrQsCDRh9GC0L4uXCJcclxuICAgICAgICAgICAgfSBlbHNlIHsvLyBZb3UgYXJlIGVubGlnaHRlbmVkXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5zdGFnZSA9IDQ7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5kdXJhdGlvbiA9IGNhbGluZ2FsYXRvcl9wb2lzb25pbmdfZHVyYXRpb25fZW5saWdodGVuZWQ7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uY2FsaW5nYWxhdG9yX3RhcmdldC5wZW5hbHR5ID0gY2FsaW5nYWxhdG9yX3BlbmFsdHlfZW5saWdodGVuZWQ7XHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcImF0dGFja19ib251c1wiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgY2FsaW5nYWxhdG9yX3BlbmFsdHlfZW5saWdodGVuZWQgLSBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTIpXHJcbiAgICAgICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcIm1lbGVlX2FkdmFudGFnZVwiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgMSlcclxuICAgICAgICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwicmFuZ2VkX2FkdmFudGFnZVwiLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgMSlcclxuICAgICAgICAgICAgICBub3RlID0gXCLQotC+0LvRjNC60L4g0YDQsNC3INGPINCy0LjQtNC10Lsg0YLQsNC60YPRjiDRgdC40LvRgy4uLiBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LTQvtGB0YLQuNCzINCf0YDQvtGB0LLRj9GJ0LXQvdC40Y8g0Lgg0LHRg9C00LXRgiDQvdC10YHRgtC4INC10LPQviDQsiDQvNC40YAuXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLmNhbGluZ2FsYXRvcl90YXJnZXQuZHVyYXRpb24gPSBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMztcclxuICAgICAgICAgICAgbm90ZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LzQvtC20LXRgiDRhdCy0LDRgtC40YIg0YPQttC1P1wiXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgbm90ZSA9IFwi0J/RgNC+0YHQstGP0YnQtdC90L3Ri9C5IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GA0L7QtNC+0LvQttCw0LXRgiDQtNC10LvQuNGC0YzRgdGPINGB0LLQvtC40Lwg0LjRgdC60YPRgdGB0YLQstC+0LwuINCd0LXQstC10YDQvtGP0YLQvdC+0LUg0LfRgNC10LvQuNGJ0LUuXCJcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLQotCw0Log0L/RgNC10LjRgdC/0L7Qu9C90LjRgtGM0YHRjyDQvdC1INC00L7Qu9C20L3QviDQsdGL0YLRjCDQstC+0LfQvNC+0LbQvdC+XCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGNvaW4gPiA1KSB7XHJcbiAgICAgICAgICB2YXIgY2FsaW5nYWxhdG9yX3RhcmdldF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgY2FsaW5nYWxhdG9yX3RhcmdldF9vYmplY3QuZHVyYXRpb24gPSBjYWxpbmdhbGF0b3JfcG9pc29uaW5nX2R1cmF0aW9uX3N0YWdlMTtcclxuICAgICAgICAgIGNhbGluZ2FsYXRvcl90YXJnZXRfb2JqZWN0LnBlbmFsdHkgPSBjYWxpbmdhbGF0b3JfcGVuYWx0eV9zdGFnZTFcclxuICAgICAgICAgIGNhbGluZ2FsYXRvcl90YXJnZXRfb2JqZWN0LnN0YWdlID0gMTtcclxuICAgICAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJhdHRhY2tfYm9udXNcIiwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGNhbGluZ2FsYXRvcl90YXJnZXRfb2JqZWN0LnBlbmFsdHkpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5jYWxpbmdhbGF0b3JfdGFyZ2V0ID0gY2FsaW5nYWxhdG9yX3RhcmdldF9vYmplY3RcclxuICAgICAgICAgIG5vdGUgPSBcItCa0LDQu9C40L3Qs9Cw0LvRj9GC0L7RgCDRgdC70LXQs9C60LAg0YPQtNCw0YDQuNC7IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQsiDQs9C+0LvQvtCy0YMuINCf0LXRgNCy0LDRjyDRgdGC0LDQtNC40Y8g0L7RgtGA0LDQstC70LXQvdC40Y8uXCJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbm90ZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LjQt9Cx0LXQttCw0Lsg0L3QtdCz0LDRgtC40LLQvdGL0YUg0Y3RhNGE0LXQutGC0L7QsiDQutCw0LvQuNC90LPQsNC70Y/RgtC+0YDQsC4g0JLQuNGA0YLRg9C+0LchXCJcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcHVzaFRvTGlzdChub3RlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5X2FjaWRfYm9tYihwb3NpdGlvbiwgcmFkaXVzKSB7XHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhwb3NpdGlvbiwgcmFkaXVzKVxyXG4gIC8vY29uc29sZS5sb2coY2FuZGlkYXRlX2NlbGxzKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NhbmRpZGF0ZV9jZWxsc1tpXV1cclxuICAgIGlmICh0YXJnZXRfY2hhcmFjdGVyX251bWJlciA+IDApIHsvLyDQv9C10YDRgdC+0L3QsNC2INCyINGA0LDQtNC40YPRgdC1INCx0L7QvNCx0YtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC/0LDQtNCw0LXRgiDQv9C+0LQg0LTQtdC50YHRgtCy0LjQtSDQutC40YHQu9C+0YLQvdC+0Lkg0LPRgNCw0L3QsNGC0YtcIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFjaWRfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uID0gYWNpZF9ib21iX2R1cmF0aW9uXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGFjaWRfYm9tYl9wb2lzb25fb2JqZWN0ID0ge31cclxuICAgICAgICBhY2lkX2JvbWJfcG9pc29uX29iamVjdC5kdXJhdGlvbiA9IGFjaWRfYm9tYl9kdXJhdGlvblxyXG4gICAgICAgIHZhciBLRF9jaGFuZ2UgPSBwYXJzZUludChjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpLzIpXHJcbiAgICAgICAgYWNpZF9ib21iX3BvaXNvbl9vYmplY3QuYm9udXNfS0QgPSBLRF9jaGFuZ2VcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5hY2lkX2JvbWJfcG9pc29uID0gYWNpZF9ib21iX3BvaXNvbl9vYmplY3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSAtIEtEX2NoYW5nZVxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvY2tlZF9lZmZlY3QodGFyZ2V0KSB7XHJcbiAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uaGFzT3duUHJvcGVydHkoXCJzaG9ja2VkXCIpKSB7XHJcbiAgICB2YXIgc2hvY2tlZF9vYmplY3QgPSB7fVxyXG4gICAgc2hvY2tlZF9vYmplY3QuY29vbGRvd24gPSBzaG9ja2VkX2Nvb2xkb3duXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uc2hvY2tlZCA9IHNob2NrZWRfb2JqZWN0XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVt0YXJnZXRdID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbdGFyZ2V0XSAtIDFcclxuICB9IGVsc2Uge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRdLnNob2NrZWQuY29vbGRvd24gPSBzaG9ja2VkX2Nvb2xkb3duXHJcbiAgfVxyXG59XHJcblxyXG4vLyBuZXcgcm91bmQgYWN0aW9uc1xyXG5cclxuZnVuY3Rpb24gc3RhcnRfbmV3X3JvdW5kKCkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICduZXdfcm91bmQnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdmFyIHNhdmVfcm9sbCA9IFtdXHJcbiAgdmFyIGNhbGluZ2FsYXRvcl9oZWFsX3JvbGxfbGlzdCA9IFtdXHJcbiAgdmFyIGNhbGluZ2FsYXRvcl9jb2luX2ZsaXAgPSBbXVxyXG5cclxuICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGUubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0gIT09IHVuZGVmaW5lZCAmJiBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldICE9PSBudWxsKSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgc2F2ZV9yb2xsW2ldID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlci5zdGFtaW5hKVxyXG4gICAgICB9XHJcbiAgICAgIGNhbGluZ2FsYXRvcl9oZWFsX3JvbGxfbGlzdFtpXSA9IHJvbGxfeChjYWxpbmdhbGF0b3Jfcm9sbF9oZWFsKTtcclxuICAgICAgY2FsaW5nYWxhdG9yX2NvaW5fZmxpcFtpXSA9IHJvbGxfeCgxMCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRvU2VuZC5zYXZlX3JvbGxfbGlzdCA9IHNhdmVfcm9sbFxyXG4gIHRvU2VuZC5jYWxpbmdhbGF0b3JfaGVhbF9yb2xsX2xpc3QgPSBjYWxpbmdhbGF0b3JfaGVhbF9yb2xsX2xpc3RcclxuICB0b1NlbmQuY2FsaW5nYWxhdG9yX2NvaW5fZmxpcCA9IGNhbGluZ2FsYXRvcl9jb2luX2ZsaXBcclxuXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5X3RlcnJhaW5fZWZmZWN0cyhkYXRhKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldICE9PSBudWxsICYmIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3dpdGNoIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImdhc19ib21iXCI6XHJcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzO1xyXG4gICAgICAgICAgICBhcHBseV9ib21iKHBvc2l0aW9uLCByYWRpdXMpXHJcbiAgICAgICAgICAgIGlmIChyYWRpdXMgPj0gNCkge1xyXG4gICAgICAgICAgICAgIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbcG9zaXRpb25dID09IG9ic3RhY2xlX251bWJlcl90b19ib2FyZF9udW1iZXIoZ2FzX2JvbWJfb2JzdGFjbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZV9vYmplY3RfY29tbWFuZChwb3NpdGlvbilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0gPSBudWxsXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImNhbGluZ2FsYXRvclwiOlxyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cztcclxuICAgICAgICAgICAgYXBwbHlfY2FsaW5nYWxhdG9yKHBvc2l0aW9uLCByYWRpdXMsIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLmZsYXRfaGVhbCwgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucm9sbF9oZWFsLCBkYXRhLmNhbGluZ2FsYXRvcl9oZWFsX3JvbGxfbGlzdCwgZGF0YS5jYWxpbmdhbGF0b3JfY29pbl9mbGlwKTtcclxuICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0uZHVyYXRpb24gPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5kdXJhdGlvbiAtIDFcclxuICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLmR1cmF0aW9uID09IDApIHtcclxuICAgICAgICAgICAgICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3Bvc2l0aW9uXSA9PSBvYnN0YWNsZV9udW1iZXJfdG9fYm9hcmRfbnVtYmVyKGNhbGluZ2FsYXRvcl9vYnN0YWNsZSkpIHtcclxuICAgICAgICAgICAgICAgICAgZGVsZXRlX29iamVjdF9jb21tYW5kKHBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXSA9IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NlZCB1cCByZXNvbHZpbmcgdGVycmFpbiBlZmZlY3RzXCIpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vdmVfYW5kX2FjdGlvbnNfcmVwbGVuaXNoKGNoYXJhY3RlciwgaW5kZXgpIHtcclxuICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2luZGV4XSA9IDFcclxuICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2luZGV4XSA9IDBcclxuICBhc3NpZ25fbW92ZXMoaW5kZXgpXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpbmRleF0gPSBib251c19hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baW5kZXhdID0gbWFpbl9hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlfdGlyZWRuZXNzKGNoYXJhY3RlciwgaSkge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwidGlyZWRcIikpIHsgLy8g0KPQsdGA0LDRgtGMINCx0L7QvdGD0YHRiyDQvtGCINGD0YHRgtCw0LvQvtGB0YLQuCDQv9GA0L7RiNC70L7Qs9C+INGF0L7QtNCwICjRh9GC0L7QsdGLINC60L7Qs9C00LAg0LHRg9C00YPRgiDQvdCw0LrQsNC70LDQtNGL0LLQsNGC0YzRgdGPINC90L7QstGL0LUg0L3QtSDRiNGC0YDQsNGE0L7QstCw0YLRjCDQtNCy0LDQttC00YspXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQuYm9udXNcclxuICB9XHJcblxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA8IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSAqIDAuNjcpIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA8IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSAqIDAuMzQpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIDw9IDApIHsgLy8gM9GPINGB0YLQsNC00LjRj1xyXG4gICAgICAgIHZhciB0aXJlZF9vYmplY3QgPSB7fVxyXG4gICAgICAgIHRpcmVkX29iamVjdC5ib251cyA9IC0zXHJcbiAgICAgICAgdGlyZWRfb2JqZWN0LnN0YWdlID0gM1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQgPSB0aXJlZF9vYmplY3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIDNcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSowLjI1KVxyXG4gICAgICAgIGlmICgoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID09IDEpJiYoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9PSAxKSkge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IDFcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7IC8vIDLRjyDRgdGC0LDQtNC40Y9cclxuICAgICAgICB2YXIgdGlyZWRfb2JqZWN0ID0ge31cclxuICAgICAgICB0aXJlZF9vYmplY3QuYm9udXMgPSAtMlxyXG4gICAgICAgIHRpcmVkX29iamVjdC5zdGFnZSA9IDJcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkID0gdGlyZWRfb2JqZWN0XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSAyXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0qMC41KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgeyAvLyAx0Y8g0YHRgtCw0LTQuNGPXHJcbiAgICAgIHZhciB0aXJlZF9vYmplY3QgPSB7fVxyXG4gICAgICB0aXJlZF9vYmplY3QuYm9udXMgPSAtMVxyXG4gICAgICB0aXJlZF9vYmplY3Quc3RhZ2UgPSAxXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQgPSB0aXJlZF9vYmplY3RcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSAxXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldKjAuNzUpXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwidGlyZWRcIikpIHsgLy8g0L3QtSDRg9GB0YLQsNC7IC0+INGD0LHRgNCw0YLRjCDRg9GB0YLQu9Cw0LvQvtGB0YLRjCDQtdGB0LvQuCDQsdGL0LvQsFxyXG4gICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWRcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrX2RlZmF1bHRfY29vbGRvd25zKGkpIHtcclxuICBjaGVja19jb29sZG93bihpLCBcImxpZ2h0X3NvdW5kX2JvbWJfdXNlclwiLCBcIlwiKTtcclxuICBjaGVja19jb29sZG93bihpLCBcImFjdGlvbl9zcGxhc2hcIiwgXCJcIik7XHJcbiAgY2hlY2tfY29vbGRvd24oaSwgXCJzYWZldHlfc2VydmljZV91c2VyXCIsIFwiXCIpO1xyXG4gIGNoZWNrX2Nvb2xkb3duKGksIFwiY2FsaW5nYWxhdG9yX3VzZXJcIiwgXCJcIik7XHJcbiAgY2hlY2tfY29vbGRvd24oaSwgXCJnYXNfYm9tYl91c2VyXCIsIFwiXCIpO1xyXG4gIGNoZWNrX2Nvb2xkb3duKGksIFwiYWNpZF9ib21iX3VzZXJcIiwgXCJcIik7XHJcbiAgY2hlY2tfY29vbGRvd24oaSwgXCJmb3JjZV9maWVsZF91c2VyXCIsIFwiXCIpO1xyXG4gIGNoZWNrX2Nvb2xkb3duKGksIFwiY2hhcmdlX3VzZXJcIiwgXCJcIik7XHJcbiAgY2hlY2tfY29vbGRvd24oaSwgXCJjdXRfbGltYl91c2VyXCIsIFwiXCIpO1xyXG4gIGNoZWNrX2Nvb2xkb3duKGksIFwiYWRyZW5hbGluZV91c2VyXCIsIFwiXCIpO1xyXG4gIGNoZWNrX2Nvb2xkb3duKGksIFwicG9pc29ub3VzX2FkcmVuYWxpbmVfdXNlclwiLCBcIlwiKTtcclxuICBjaGVja19jb29sZG93bihpLCBcImhvb2tfdXNlclwiLCBcIlwiKTtcclxuICBjaGVja19jb29sZG93bihpLCBcInB1bmlzaGluZ19zdHJpa2VfdXNlclwiLCBcIlwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2FmZXR5X3NlcnZpY2VfdGFyZ2V0X3JvdW5kX2VmZmVjdChpKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJzYWZldHlfc2VydmljZV90YXJnZXRcIikpIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNhZmV0eV9zZXJ2aWNlX3RhcmdldC5kdXJhdGlvbiA9PSAwKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbaV0gLSBzYWZldHlfc2VydmljZV9kZWZlbnNpdmVfYWR2YW50YWdlXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ldmFkZV9ib251c1tpXSAtIHNhZmV0eV9zZXJ2aWNlX2V2YWRlX2JvbnVzXHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNhZmV0eV9zZXJ2aWNlX3RhcmdldFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zYWZldHlfc2VydmljZV90YXJnZXQuZHVyYXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNhZmV0eV9zZXJ2aWNlX3RhcmdldC5kdXJhdGlvbiAtIDFcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJlbHZldF9idWZmX3RhcmdldF9yb3VuZF9lZmZlY3QoaSkge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYmVsdmV0X2J1ZmZfdGFyZ2V0XCIpKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iZWx2ZXRfYnVmZl90YXJnZXQuZHVyYXRpb24gPT0gMCkge1xyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwiYXR0YWNrX2JvbnVzXCIsIGksIC0xKmNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmVsdmV0X2J1ZmZfdGFyZ2V0LmF0dGFja19ib251cyk7XHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJtZWxlZV9hZHZhbnRhZ2VcIiwgaSwgLTEqY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iZWx2ZXRfYnVmZl90YXJnZXQubWVsZWVfYWR2YW50YWdlKTtcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcInJhbmdlZF9hZHZhbnRhZ2VcIiwgaSwgLTEqY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iZWx2ZXRfYnVmZl90YXJnZXQucmFuZ2VkX2FkdmFudGFnZSk7XHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJlbHZldF9idWZmX3RhcmdldFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iZWx2ZXRfYnVmZl90YXJnZXQuZHVyYXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJlbHZldF9idWZmX3RhcmdldC5kdXJhdGlvbiAtIDFcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhvb2tfdGFyZ2V0X3JvdW5kX2VmZmVjdChpKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJob29rX3RhcmdldFwiKSkge1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaG9va190YXJnZXQuZHVyYXRpb24gPT0gMCkge1xyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwiZGVmZW5zaXZlX2FkdmFudGFnZVwiLCBpLCAtMSpjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhvb2tfdGFyZ2V0LmRlZmVuc2l2ZV9hZHZhbnRhZ2UpO1xyXG4gICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ob29rX3RhcmdldFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ob29rX3RhcmdldC5kdXJhdGlvbiAtPSAxXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYWxpbmdhbGF0b3JfdGFyZ2V0X3JvdW5kX2VmZmVjdChpKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJjYWxpbmdhbGF0b3JfdGFyZ2V0XCIpKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jYWxpbmdhbGF0b3JfdGFyZ2V0LmR1cmF0aW9uID09IDApIHtcclxuICAgICAgdmFyIHJldmVyc2VfcGVuYWx0eSA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY2FsaW5nYWxhdG9yX3RhcmdldC5wZW5hbHR5ICogKC0xKVxyXG4gICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwiYXR0YWNrX2JvbnVzXCIsIGksIHJldmVyc2VfcGVuYWx0eSk7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmNhbGluZ2FsYXRvcl90YXJnZXQuc3RhZ2UgPT0gMykge1xyXG4gICAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJtZWxlZV9hZHZhbnRhZ2VcIiwgaSwgMSk7XHJcbiAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcInJhbmdlZF9hZHZhbnRhZ2VcIiwgaSwgMSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jYWxpbmdhbGF0b3JfdGFyZ2V0LnN0YWdlID09IDQpIHtcclxuICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwibWVsZWVfYWR2YW50YWdlXCIsIGksIC0xKTtcclxuICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwicmFuZ2VkX2FkdmFudGFnZVwiLCBpLCAtMSk7XHJcbiAgICAgIH1cclxuICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY2FsaW5nYWxhdG9yX3RhcmdldFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jYWxpbmdhbGF0b3JfdGFyZ2V0LmR1cmF0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jYWxpbmdhbGF0b3JfdGFyZ2V0LmR1cmF0aW9uIC0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGljaF9waWNoX3VzZXJfcm91bmRfZWZmZWN0KGkpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInBpY2hfcGljaF91c2VyXCIpKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biA9PSBwaWNoX3BpY2hfY29vbGRvd24pIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gMFxyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGljaF9waWNoX3RhcmdldF9yb3VuZF9lZmZlY3QoaSkge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwicGljaF9waWNoX3RhcmdldFwiKSkge1xyXG4gICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3RhcmdldC5leHRyYV9hY3Rpb25zXHJcbiAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gKyBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldICsgMVxyXG4gICAgICAgIH1cclxuICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgfVxyXG4gICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdGFyZ2V0XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhaW1fcm91bmRfZWZmZWN0KGkpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFpbVwiKSkge1xyXG4gICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWltXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZHJlbmFsaW5lX3RhcmdldF9yb3VuZF9lZmZlY3QoaSkge1xyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYWRyZW5hbGluZV90YXJnZXRcIikpIHtcclxuICAgICAgdmFyIG1pbnVzX2FjdGlvbnMgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdGFyZ2V0Lm1pbnVzX2FjdGlvbnNcclxuICAgICAgd2hpbGUgKG1pbnVzX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgaWYgKG1pbnVzX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSAtIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1pbnVzX2FjdGlvbnMgPSBtaW51c19hY3Rpb25zIC0gMVxyXG4gICAgICB9XHJcbiAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdGFyZ2V0XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXRfcm91bmRfZWZmZWN0KGkpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldFwiKSkge1xyXG4gICAgICB2YXIgdHVybiA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0LnR1cm5cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXQudHVybiA9IHR1cm4gKyAxXHJcbiAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXQuZXh0cmFfYWN0aW9uc1t0dXJuXVxyXG4gICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSArIDFcclxuICAgICAgICB9XHJcbiAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR1cm4gKyAxID09IHBvaXNvbm91c19hZHJlbmFsaW5lX2R1cmF0aW9uKSB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2ldXHJcbiAgICAgICAgdmFyIG1heF9IUCA9IEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV1cclxuICAgICAgICB2YXIgbWF4X3N0YW1pbmEgPSBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV1cclxuICAgICAgICB2YXIgSFBfY29zdCA9IHBvaXNvbm91c19hZHJlbmFsaW5lX2ZsYXRfSFAgKyBwYXJzZUludChwYXJzZUZsb2F0KG1heF9IUCkgKiBwb2lzb25vdXNfYWRyZW5hbGluZV9wZXJjZW50X0hQKVxyXG4gICAgICAgIHZhciBzdGFtaW5hX2Nvc3QgPSBwb2lzb25vdXNfYWRyZW5hbGluZV9mbGF0X3N0YW1pbmEgKyBwYXJzZUludChwYXJzZUZsb2F0KG1heF9zdGFtaW5hKSAqIHBvaXNvbm91c19hZHJlbmFsaW5lX3BlcmNlbnRfc3RhbWluYSlcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gLSBIUF9jb3N0XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSAtIHN0YW1pbmFfY29zdFxyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldFxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gXCLQkNC00YDQtdC90LDQu9C40L0g0LIg0LrRgNC+0LLQuCBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LfQsNC60LDQvdGH0LjQstCw0LXRgtGB0Y8sINC90LDRgdGC0YPQv9Cw0LXRgiDQv9C+0YXQvNC10LvRjNC1IChcIiArIEhQX2Nvc3QgKyBcIiDRhdC/INC4IFwiICsgc3RhbWluYV9jb3N0ICsgXCIg0LLRi9C90L7RgdC70LjQstC+0YHRgtC4KVwiXHJcbiAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBNb3JlIGdtIGNvbnRyb2wgYWN0aW9uc1xyXG5cclxuZnVuY3Rpb24gbWlycm9yX2JvYXJkKCkge1xyXG4gIHZhciBsZWZ0X2luZGV4O1xyXG4gIHZhciByaWdodF9pbmRleDtcclxuICB2YXIgdGVtcDtcclxuICB2YXIgbGVmdF9jZWxsO1xyXG4gIHZhciByaWdodF9jZWxsO1xyXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgZ2FtZV9zdGF0ZS5zaXplOyB5KyspIHtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgZ2FtZV9zdGF0ZS5zaXplLzI7IHgrKykge1xyXG5cclxuICAgICAgbGVmdF9pbmRleCA9IHkqZ2FtZV9zdGF0ZS5zaXplICsgeDtcclxuICAgICAgcmlnaHRfaW5kZXggPSB5KmdhbWVfc3RhdGUuc2l6ZSArIHBhcnNlSW50KGdhbWVfc3RhdGUuc2l6ZSkgLSB4IC0gMTtcclxuICAgICAgLy9jb25zb2xlLmxvZygneTogJyArIHkgKyAnIHg6ICcgKyB4ICsgJyBsZWZ0IGluZGV4OiAnICsgbGVmdF9pbmRleCArICcgcmlnaHQgaW5kZXg6ICcgKyByaWdodF9pbmRleCk7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgbGVmdF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGxlZnRfaW5kZXgpO1xyXG4gICAgICByaWdodF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHJpZ2h0X2luZGV4KTtcclxuXHJcbiAgICAgIHRlbXAgPSBsZWZ0X2NlbGwuc3JjO1xyXG4gICAgICBsZWZ0X2NlbGwuc3JjID0gcmlnaHRfY2VsbC5zcmM7XHJcbiAgICAgIHJpZ2h0X2NlbGwuc3JjID0gdGVtcDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN5bmNfYm9hcmQoKSB7XHJcbiAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IHtcclxuICAgIGdhbWVfc3RhdGU6IGdhbWVfc3RhdGUsXHJcbiAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbzogY2hhcmFjdGVyX2RldGFpbGVkX2luZm8sXHJcbiAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvOiBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvLFxyXG4gICAgY2hhcmFjdGVyX3N0YXRlOiBjaGFyYWN0ZXJfc3RhdGUsXHJcbiAgICBpbml0aWF0aXZlX29yZGVyX2FycmF5OiBpbml0aWF0aXZlX29yZGVyX2FycmF5XHJcbiAgfTtcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3N5bmNfYm9hcmQnO1xyXG4gIHRvU2VuZC5mdWxsX2dhbWVfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGU7XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd19sYW5kbWluZXMoKSB7XHJcbiAgdmFyIGxhbmRtaW5lc19hcnJheSA9IGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9uc1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGFuZG1pbmVzX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9taW5lID0gbGFuZG1pbmVzX2FycmF5W2ldXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1tjdXJyZW50X21pbmVdLmluY2x1ZGVzKG15X25hbWUpKSB7XHJcbiAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGN1cnJlbnRfbWluZSk7XHJcbiAgICAgIGNlbGwuc3JjID0gXCIvaW1hZ2VzL2xhbmRtaW5lLmpmaWZcIlxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJfY2hhcmFjdGVyX3N0YXRlKCkge1xyXG4gIGNoYXJhY3Rlcl9zdGF0ZSA9IENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVFxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhcl9jaGFyYWN0ZXIobnVtYmVyKSB7XHJcbiAgLy9jaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5IUFtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW251bWJlcl0gPSB7fVxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW251bWJlcl0gPSBudWxsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdfb25jbGljaygpIHtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIgfHwgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXSA9PSAxKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID09IDEpIHtcclxuICAgICAgdW5kb19zZWxlY3Rpb24oKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGluZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgICAgIHZhciBjZWxsID0gY2hhcmFjdGVyX2Nob3Nlbi5jZWxsXHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShpbmRleCwgY2VsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhX29uY2xpY2soKSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiIHx8IGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2NoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZF0gPT0gMSkge1xyXG5cclxuICAgIGlmIChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPT0gMikge1xyXG4gICAgICBzdG9wX2F0dGFjaygpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gICAgICB2YXIgY2VsbCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2VsbFxyXG4gICAgICB2YXIgbWFpbl9hY3Rpb25zX2xlZnQgPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgaWYgKG1haW5fYWN0aW9uc19sZWZ0ID4gMCkge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fYXR0YWNrKGNlbGwpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQoyDQstCw0YEg0L3QtSDQvtGB0YLQsNC70L7RgdGMINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXBhcmVfaW5pdGlhdGl2ZShhLGIpIHtcclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbYV0gPCBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtiXSkge1xyXG4gICAgcmV0dXJuIDE7XHJcbiAgfSBlbHNlIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVthXSA9PSBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtiXSkge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAtMTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dCb2FyZENyZWF0aW9uR3JvdXAoKSB7XHJcbiAgdmFyIGJvYXJkX2NyZWF0aW9uX2dyb3VwID0gJChCT0FSRF9DUkVBVElPTl9HUk9VUF9TRUxFQ1RPUik7XHJcbiAgaWYgKHNob3dfYm9hcmRfY3JlYXRpb25fZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIikgPT0gXCJzaG93XCIpIHtcclxuICAgIHNob3dfYm9hcmRfY3JlYXRpb25fZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIiwgXCJoaWRlXCIpO1xyXG4gICAgc2hvd19ib2FyZF9jcmVhdGlvbl9ncm91cF9idXR0b24uaHRtbChcItCh0L/RgNGP0YLQsNGC0Ywg0YHQvtC30LTQsNC90LjQtSDQutCw0YDRgtGLXCIpO1xyXG4gICAgYm9hcmRfY3JlYXRpb25fZ3JvdXAuc2hvdygpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgc2hvd19ib2FyZF9jcmVhdGlvbl9ncm91cF9idXR0b24uYXR0cihcIm1vZFwiLCBcInNob3dcIik7XHJcbiAgICBzaG93X2JvYXJkX2NyZWF0aW9uX2dyb3VwX2J1dHRvbi5odG1sKFwi0J/QvtC60LDQt9Cw0YLRjCDRgdC+0LfQtNCw0L3QuNC1INC60LDRgNGC0YtcIik7XHJcbiAgICBib2FyZF9jcmVhdGlvbl9ncm91cC5oaWRlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93Qm9hcmRFZGl0R3JvdXAoKSB7XHJcbiAgdmFyIGJvYXJkX2VkaXRfZ3JvdXAgPSAkKEJPQVJEX0VESVRfR1JPVVBfU0VMRUNUT1IpO1xyXG4gIGlmIChzaG93X2JvYXJkX2VkaXRfZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIikgPT0gXCJzaG93XCIpIHtcclxuICAgIHNob3dfYm9hcmRfZWRpdF9ncm91cF9idXR0b24uYXR0cihcIm1vZFwiLCBcImhpZGVcIik7XHJcbiAgICBzaG93X2JvYXJkX2VkaXRfZ3JvdXBfYnV0dG9uLmh0bWwoXCLQodC/0YDRj9GC0LDRgtGMINC60L7QvdGC0YDQvtC70Ywg0LrQsNGA0YLRi1wiKTtcclxuICAgIGJvYXJkX2VkaXRfZ3JvdXAuc2hvdygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzaG93X2JvYXJkX2VkaXRfZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIiwgXCJzaG93XCIpO1xyXG4gICAgc2hvd19ib2FyZF9lZGl0X2dyb3VwX2J1dHRvbi5odG1sKFwi0J/QvtC60LDQt9Cw0YLRjCDQutC+0L3RgtGA0L7Qu9GMINC60LDRgNGC0YtcIik7XHJcbiAgICBib2FyZF9lZGl0X2dyb3VwLmhpZGUoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dCYXR0bGVDb250cm9sR3JvdXAoKSB7XHJcbiAgdmFyIGJhdHRsZV9jb250cm9sX2dyb3VwID0gJChCQVRUTEVfQ09OVFJPTF9HUk9VUF9TRUxFQ1RPUik7XHJcbiAgaWYgKHNob3dfYmF0dGxlX2NvbnRyb2xfZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIikgPT0gXCJzaG93XCIpIHtcclxuICAgIHNob3dfYmF0dGxlX2NvbnRyb2xfZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIiwgXCJoaWRlXCIpO1xyXG4gICAgc2hvd19iYXR0bGVfY29udHJvbF9ncm91cF9idXR0b24uaHRtbChcItCh0L/RgNGP0YLQsNGC0Ywg0LHQvtC10LLRi9C1INC90LDRgdGC0YDQvtC50LrQuFwiKTtcclxuICAgIGJhdHRsZV9jb250cm9sX2dyb3VwLnNob3coKTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2hvd19iYXR0bGVfY29udHJvbF9ncm91cF9idXR0b24uYXR0cihcIm1vZFwiLCBcInNob3dcIik7XHJcbiAgICBzaG93X2JhdHRsZV9jb250cm9sX2dyb3VwX2J1dHRvbi5odG1sKFwi0J/QvtC60LDQt9Cw0YLRjCDQsdC+0LXQstGL0LUg0L3QsNGB0YLRgNC+0LnQutC4XCIpO1xyXG4gICAgYmF0dGxlX2NvbnRyb2xfZ3JvdXAuaGlkZSgpO1xyXG4gIH1cclxufVxyXG5cclxuLy9zb2NrZXQuaW5pdCgnd3M6Ly9sb2NhbGhvc3Q6MzAwMScpO1xyXG5zb2NrZXQuaW5pdChTRVJWRVJfQUREUkVTUyk7XHJcblxyXG5zb2NrZXQucmVnaXN0ZXJPcGVuSGFuZGxlcigoKSA9PiB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3BsYXllcl9pbmZvJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb2xlID0gbXlfcm9sZTtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICB0b1NlbmQucGFzc3dvcmQgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2dtX3Bhc3N3b3JkJykpO1xyXG4gIH1cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufSk7XHJcblxyXG5zb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcigoZGF0YSkgPT4ge1xyXG4gIC8vY29uc29sZS5sb2coZGF0YSk7XHJcbiAgaWYgKCgoZGF0YS50b19uYW1lID09IG15X25hbWUpIHx8IChkYXRhLnRvX25hbWUgPT0gJ2FsbCcpKSAmJiAoZGF0YS5yb29tX251bWJlciA9PSBteV9yb29tKSkge1xyXG4gICAgaWYgKGRhdGEuY29tbWFuZCA9PSAncGxheWVyX2luZm9fcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmlzVmFsaWQgPT0gMCkge1xyXG4gICAgICAgIGFsZXJ0KCfQotCwINC60LDQutC+0Lkg0YLRiyDQs9C8Jyk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF0YS5yb2xlID09ICdnbScpIHtcclxuICAgICAgICBzeW5jX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgc2hvd19ib2FyZF9jcmVhdGlvbl9ncm91cF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNob3dfYm9hcmRfY3JlYXRpb25fZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIiwgXCJzaG93XCIpO1xyXG4gICAgICAgIHNob3dfYm9hcmRfZWRpdF9ncm91cF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNob3dfYm9hcmRfZWRpdF9ncm91cF9idXR0b24uYXR0cihcIm1vZFwiLCBcInNob3dcIik7XHJcbiAgICAgICAgc2hvd19iYXR0bGVfY29udHJvbF9ncm91cF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNob3dfYmF0dGxlX2NvbnRyb2xfZ3JvdXBfYnV0dG9uLmF0dHIoXCJtb2RcIiwgXCJzaG93XCIpO1xyXG5cclxuICAgICAgICB2YXIgZHJvcGJveF9pbWFnZSA9ICQoXCI8aW1nPlwiKTtcclxuICAgICAgICBkcm9wYm94X2ltYWdlLmF0dHIoJ3NyYycsIERST1BCT1hfSU1BR0UpO1xyXG4gICAgICAgIGRyb3Bib3hfaW1hZ2UuYXR0cignaGVpZ2h0JywgJzcwcHgnKTtcclxuICAgICAgICBkcm9wYm94X2ltYWdlLmF0dHIoJ3dpZHRoJywgJzEwMHB4Jyk7XHJcbiAgICAgICAgZHJvcGJveF9pbWFnZS5hZGRDbGFzcyhcImRyb3Bib3hcIik7XHJcblxyXG4gICAgICAgIGRyb3Bib3hfaW1hZ2Uub24oXCJkcmFnb3ZlclwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZHJvcGJveF9pbWFnZS5vbihcImRyb3BcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHZhciBjZWxsID0gZHJhZ2dlZDtcclxuICAgICAgICAgIGlmIChjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImJvYXJkX2NlbGxcIikpIHtcclxuICAgICAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gY2VsbC5yb3cgKiBnYW1lX3N0YXRlLnNpemUgKyBjZWxsLmNvbHVtbjtcclxuICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XTtcclxuICAgICAgICAgICAgaW5pdGlhdGl2ZV9vcmRlcl9hcnJheS5wdXNoKGNoYXJhY3Rlcl9udW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGkgPSBpbml0aWF0aXZlX29yZGVyX2FycmF5Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIHZhciBpbWcgPSBjb25zdHJ1Y3RfaW5pdGlhdGl2ZV9pbWFnZShjaGFyYWN0ZXJfbnVtYmVyLCBpKTtcclxuICAgICAgICAgICAgaW1nLmFwcGVuZFRvKGluaXRpYXRpdmVfb3JkZXJfY29udGFpbmVyKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbml0aWF0aXZlX2ltYWdlXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoY2VsbC5nZXRBdHRyaWJ1dGUoXCJhcnJheV9wb3NpdGlvblwiKSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAoaSsxKTsgaiA8IGluaXRpYXRpdmVfb3JkZXJfYXJyYXkubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAvL3ZhciBzZWxlY3RvciA9IFwiI2luaXRpYXRpdmVfaW1hZ2VfXCIgKyBqO1xyXG4gICAgICAgICAgICAgIHZhciBpbml0aWF0aXZlX2ltYWdlID0gJChcIlthcnJheV9wb3NpdGlvbj1cIiArIGogKyBcIl1cIik7XHJcbiAgICAgICAgICAgICAgdmFyIG5ld19pbmRleCA9IGotMTtcclxuICAgICAgICAgICAgICBpbml0aWF0aXZlX2ltYWdlLmF0dHIoJ2FycmF5X3Bvc2l0aW9uJywgbmV3X2luZGV4KTtcclxuICAgICAgICAgICAgICBpbml0aWF0aXZlX2ltYWdlLmF0dHIoJ2lkJywgXCJpbml0aWF0aXZlX2ltYWdlX1wiICsgbmV3X2luZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGluaXRpYXRpdmVfb3JkZXJfYXJyYXlbaV07XHJcbiAgICAgICAgICAgIHVuaG92ZXJfY2hhcmFjdGVyKGNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgICAgICAgICBpbml0aWF0aXZlX29yZGVyX2FycmF5LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgY2VsbC5yZW1vdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZHJvcGJveF9pbWFnZS5hcHBlbmRUbyhpbml0aWF0aXZlX2Ryb3Bib3hfY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGU7XHJcbiAgICAgICAgICAgIC8vIHFcclxuICAgICAgICAgICAgaWYoa2V5Q29kZSA9PSA4MSkge1xyXG4gICAgICAgICAgICAgICAgZm9nTW9kZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT0gODcpIHsgLy8gd1xyXG4gICAgICAgICAgICAgIHdfb25jbGljaygpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PSA2NSkgeyAvLyBhXHJcbiAgICAgICAgICAgICAgYV9vbmNsaWNrKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0O1xyXG4gICAgICBncm91cF9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfZ3JvdXBfbGlzdDtcclxuICAgICAgb2JzdGFjbGVfbGlzdCA9IGRhdGEub2JzdGFjbGVfbGlzdDtcclxuICAgICAgd2VhcG9uX2xpc3QgPSBkYXRhLndlYXBvbl9saXN0XHJcbiAgICAgIHdlYXBvbl9kZXRhaWxlZF9pbmZvID0gZGF0YS53ZWFwb25fZGV0YWlsZWRfaW5mb1xyXG4gICAgICBza2lsbF9kZXRhaWxlZF9pbmZvID0gZGF0YS5za2lsbF9kZXRhaWxlZF9pbmZvXHJcbiAgICAgIHNraWxsX2xpc3QgPSBkYXRhLnNraWxsX2xpc3RcclxuICAgICAgc2F2ZXNfbGlzdCA9IGRhdGEuc2F2ZXNfbGlzdFxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzYXZlc19saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gJChcIjxvcHRpb24+XCIpO1xyXG4gICAgICAgIGN1cnJlbnRfb3B0aW9uLnRleHQoc2F2ZXNfbGlzdFtpXSk7XHJcbiAgICAgICAgY3VycmVudF9vcHRpb24udmFsKHNhdmVzX2xpc3RbaV0pO1xyXG4gICAgICAgIHNhdmVzX3NlbGVjdC5hcHBlbmQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NvbnN0cnVjdF9ib2FyZF9yZXNwb25zZScpIHtcclxuICAgICAgY2xlYXJfY2hhcmFjdGVyX3N0YXRlKClcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGRhdGEuZ2FtZV9zdGF0ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmNlbGxfaWRdID0gZGF0YS5jaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gZGF0YS5jaGFyYWN0ZXJfaW5mbztcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3RlcjtcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zdHJlbmd0aCA9IHBhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCk7XHJcbiAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc3RhbWluYSA9IHBhcnNlSW50KGNoYXJhY3Rlci5zdGFtaW5hKTtcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5hZ2lsaXR5ID0gcGFyc2VJbnQoY2hhcmFjdGVyLmFnaWxpdHkpO1xyXG4gICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdLmludGVsbGlnZW5jZSA9IHBhcnNlSW50KGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtkYXRhLmNlbGxfaWRdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZGF0YS5jZWxsX2lkKTtcclxuICAgICAgICBjZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShkYXRhLmNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gYm9udXNfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gbWFpbl9hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgYXNzaWduX21vdmVzKGRhdGEuY2hhcmFjdGVyX251bWJlcik7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gcGFyc2VJbnQoY2hhcmFjdGVyLktEX3BvaW50cyk7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDA7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IFwiYWxsXCI7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyLmludmVudG9yeVswXVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHt9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gZGF0YS5jZWxsX2lkO1xyXG4gICAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwiZXZhZGVfYm9udXNcIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHBhcnNlSW50KGNoYXJhY3Rlci5ldmFkZV9ib251cyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwibWVsZWVfcmVzaXN0XCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX3Jlc2lzdFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gcGFyc2VGbG9hdChjaGFyYWN0ZXIubWVsZWVfcmVzaXN0KS8xMDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX3Jlc2lzdFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMC4wO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwiYnVsbGV0X3Jlc2lzdFwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5idWxsZXRfcmVzaXN0W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUZsb2F0KGNoYXJhY3Rlci5idWxsZXRfcmVzaXN0KS8xMDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJ1bGxldF9yZXNpc3RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDAuMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8g0LDQutGC0LjQstCw0YbQuNGPINC/0LDRgdGB0LjQstC+0LpcclxuICAgICAgaWYgKGNoYXJhY3Rlci5oYXNPd25Qcm9wZXJ0eShcImFkYXB0aXZlX2ZpZ2h0aW5nXCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gLTE7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2FkZF9vYnN0YWNsZV9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIG9ic3RhY2xlID0gZGF0YS5vYnN0YWNsZV9pbmZvO1xyXG4gICAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW2RhdGEub2JzdGFjbGVfbnVtYmVyXSA9IG9ic3RhY2xlO1xyXG4gICAgICBnYW1lX3N0YXRlLm9ic3RhY2xlX2V4dHJhX2luZm9bZGF0YS5jZWxsX2lkXSA9IHt9O1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtkYXRhLmNlbGxfaWRdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZGF0YS5jZWxsX2lkKTtcclxuICAgICAgICBjZWxsLnNyYyA9IG9ic3RhY2xlLmF2YXRhcjtcclxuICAgICAgfVxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBkYXRhLm9ic3RhY2xlX251bWJlciAqICgtMSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbW92ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciB0b19pbmRleCA9IGRhdGEudG9faW5kZXg7XHJcbiAgICAgIHZhciBmcm9tX2luZGV4ID0gZGF0YS5mcm9tX2luZGV4O1xyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdG9faW5kZXhdID09IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtmcm9tX2luZGV4XSA9PSBkYXRhLmNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICAgICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3RvX2luZGV4XSA9IGRhdGEuY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHRvX2luZGV4O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuaW52aXNpYmlsaXR5X2VuZGVkX2lkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgaWQgPSBkYXRhLmludmlzaWJpbGl0eV9lbmRlZF9pZFtpXTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbaWRdID0gXCJhbGxcIjtcclxuXHJcbiAgICAgICAgICB2YXIgcG9zaXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25baWRdO1xyXG4gICAgICAgICAgdmFyIHRvX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgcG9zaXRpb24pO1xyXG4gICAgICAgICAgdmFyIGF2YXRhciA9IGdldF9vYmplY3RfcGljdHVyZShpZCk7XHJcbiAgICAgICAgICB0b19jZWxsLnNyYyA9IGF2YXRhcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgICAgIGlmICghY2hhcmFjdGVyLmhhc093blByb3BlcnR5KFwibGFuZG1pbmVfaW1tdW5lXCIpKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubWluZXNfZXhwbG9kZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG1pbmVfcG9zaXRpb24gPSBkYXRhLm1pbmVzX2V4cGxvZGVkW2ldXHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIG1pbmVfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICBjZWxsLnNyYyA9IGZvZ09yUGljKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmRleE9mKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLnNwbGljZShpbmRleCwxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbbWluZV9wb3NpdGlvbl0gPSBbXVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLm1pbmVzX2RhbWFnZSA+IDApIHtcclxuICAgICAgICAgICAgZXhwbG9zaW9uX2F1ZGlvLnBsYXkoKTtcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEuY2hhcmFjdGVyX251bWJlciwgZGF0YS5taW5lc19kYW1hZ2UpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9C+0LTRgNGL0LLQsNC10YLRgdGPINC90LAg0LzQuNC90LDRhSDQv9C+0LvRg9GH0LDRjyBcIiArIGRhdGEubWluZXNfZGFtYWdlICsgXCIg0YPRgNC+0L3QsFwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAvLyByZW1vdmUgc2hpZWxkZWQgcHJvcGVydHkgZnJvbSBjaGFyYWN0ZXIgYW5kIHJlbW92ZSBjaGFyYWN0ZXIgZnJvbSBzaGllbGRlZCBsaXN0XHJcbiAgICAgICAgaWYgKGRhdGEubGVmdF9zaGllbGQgPT0gMSkge1xyXG4gICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXRcclxuICAgICAgICAgIHZhciBpbmRleCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2RhdGEuc2hpZWxkX2luZGV4XS5jaGFyYWN0ZXJfbGlzdC5pbmRleE9mKGRhdGEuY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbZGF0YS5zaGllbGRfaW5kZXhdLmNoYXJhY3Rlcl9saXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAxO1xyXG5cclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gc3RhbWluYV9tb3ZlX2Nvc3RcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBwYXJzZUZsb2F0KGRhdGEuZGlzdGFuY2UpXHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJzbmlwZXJcIikge1xyXG4gICAgICAgICAgICB2YXIgZWZmZWN0c19vYmplY3QgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgICAgaWYgKGVmZmVjdHNfb2JqZWN0Lmhhc093blByb3BlcnR5KFwic25pcGVyX3Bhc3NpdmVcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9hdHRhY2tfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9kYW1hZ2VfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBjdXJyZW50X2F0dGFja19ib251cyAtIDVcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBjdXJyZW50X2RhbWFnZV9ib251c1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIHNuaXBlcl9wYXNzaXZlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmF0dGFja19ib251cyA9IC01XHJcbiAgICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmRhbWFnZV9ib251cyA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUgPSBzbmlwZXJfcGFzc2l2ZV9vYmplY3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSA1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghKCgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVt0b19pbmRleF0gPT0gMSkpIHx8IChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gIT0gXCJhbGxcIiAmJiBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gIT0gbXlfbmFtZSkpKSB7XHJcbiAgICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcbiAgICAgICAgICB0b19jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShkYXRhLmNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtmcm9tX2luZGV4XSA9IDA7XHJcbiAgICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZnJvbV9pbmRleF0gPT0gMSkpKSB7XHJcbiAgICAgICAgICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBmcm9tX2luZGV4KTtcclxuICAgICAgICAgIG9sZF9jZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlbGV0ZV9vYmplY3RfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiY2hhcmFjdGVyX251bWJlclwiKSkge1xyXG4gICAgICAgIGNsZWFyX2NoYXJhY3RlcihkYXRhLmNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZGF0YS5pbmRleF0gPCAwKSB7Ly8gaXMgb2JzdGFjbGVcclxuICAgICAgICBnYW1lX3N0YXRlLm9ic3RhY2xlX2V4dHJhX2luZm9bZGF0YS5pbmRleF0gPSB7fTtcclxuICAgICAgfVxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuaW5kZXhdID0gMDtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZGF0YS5pbmRleF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgZGF0YS5pbmRleCk7XHJcbiAgICAgICAgY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3JvbGxfaW5pdGlhdGl2ZV9yZXNwb25zZScpIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmUgPSBkYXRhLmluaXRpYXRpdmVfc3RhdGU7XHJcbiAgICAgIGluaXRpYXRpdmVfb3JkZXJfYXJyYXkgPSBkYXRhLmluaXRpYXRpdmVfb3JkZXJfYXJyYXk7XHJcbiAgICAgIGRpc3BsYXlfaW5pdGlhdGl2ZV9saW5lKCk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnZGVhbF9kYW1hZ2VfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBkYXRhLmRhbWFnZTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdzYXZlX2dhbWVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT0gMSkge1xyXG4gICAgICAgIGFsZXJ0KCdHYW1lICcgKyBkYXRhLnNhdmVfbmFtZSArICcgc2F2ZWQgc3VjY2VzZnVsbHknKTtcclxuICAgICAgICBzYXZlc19saXN0LnB1c2goZGF0YS5zYXZlX25hbWUpO1xyXG4gICAgICAgIHZhciBjdXJyZW50X29wdGlvbiA9ICQoXCI8b3B0aW9uPlwiKTtcclxuICAgICAgICBjdXJyZW50X29wdGlvbi50ZXh0KGRhdGEuc2F2ZV9uYW1lKTtcclxuICAgICAgICBjdXJyZW50X29wdGlvbi52YWwoZGF0YS5zYXZlX25hbWUpO1xyXG4gICAgICAgIHNhdmVzX3NlbGVjdC5hcHBlbmQoY3VycmVudF9vcHRpb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdHYW1lIHdpdGggbmFtZSAnICsgZGF0YS5zYXZlX25hbWUgKyAnIGFscmVhZHkgZXhpc3QhJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdsb2FkX2dhbWVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT0gMSkge1xyXG4gICAgICAgIHZhciBmdWxsX2dhbWVfc3RhdGUgPSBkYXRhLmZ1bGxfZ2FtZV9zdGF0ZTtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX3N0YXRlO1xyXG4gICAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvID0gZnVsbF9nYW1lX3N0YXRlLmNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUub2JzdGFjbGVfZGV0YWlsZWRfaW5mbztcclxuICAgICAgICBjb25zdHJ1Y3RfYm9hcmQoZnVsbF9nYW1lX3N0YXRlLmdhbWVfc3RhdGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gbG9hZCBnYW1lICcgKyBkYXRhLnNhdmVfbmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdzeW5jX2JvYXJkX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgZnVsbF9nYW1lX3N0YXRlID0gZGF0YS5mdWxsX2dhbWVfc3RhdGU7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfc3RhdGU7XHJcbiAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvID0gZnVsbF9nYW1lX3N0YXRlLmNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gZnVsbF9nYW1lX3N0YXRlLm9ic3RhY2xlX2RldGFpbGVkX2luZm87XHJcbiAgICAgIGNvbnN0cnVjdF9ib2FyZChmdWxsX2dhbWVfc3RhdGUuZ2FtZV9zdGF0ZSk7XHJcbiAgICAgIGluaXRpYXRpdmVfb3JkZXJfYXJyYXkgPSBmdWxsX2dhbWVfc3RhdGUuaW5pdGlhdGl2ZV9vcmRlcl9hcnJheTtcclxuICAgICAgZGlzcGxheV9pbml0aWF0aXZlX2xpbmUoKVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3VwZGF0ZV9mb2dfcmVzcG9uc2UnKSB7XHJcblx0XHRcdFx0dmFyIGluZGV4X2xpc3QgPSBkYXRhLmluZGV4X2xpc3Q7XHJcbiAgICAgICAgdmFyIGZvZ19zdGF0ZTtcclxuICAgICAgICBpZiAoZGF0YS51cGRhdGVfdHlwZSA9PSAncmVtb3ZlJykge1xyXG4gICAgICAgICAgZm9nX3N0YXRlID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9nX3N0YXRlID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgbGV0IGluZGV4ID0gaW5kZXhfbGlzdFtpXTtcclxuICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGluZGV4KTtcclxuICAgICAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9IGZvZ19zdGF0ZTtcclxuICAgICAgICAgIGNlbGwuc3JjID0gZm9nT3JQaWMoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHRcdH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdhc3NpZ25fem9uZV9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIGluZGV4X2xpc3QgPSBkYXRhLmluZGV4X2xpc3RcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleF9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2luZGV4X2xpc3RbaV1dID0gZGF0YS56b25lX251bWJlcjtcclxuICAgICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtpbmRleF9saXN0W2ldXSA9IGRhdGEubW9kaWZpY2F0b3I7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBkYXRhLm5ld192YWx1ZTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdzaW1wbGVfcm9sbF9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIG1lc3NhZ2UgPSBkYXRhLmNoYXJhY3Rlcl9uYW1lICsgXCIg0LHRgNC+0YHQsNC10YIgXCIgKyBkYXRhLnJvbGxcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NraWxsX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgdXNlcl9pbmRleCA9IGRhdGEudXNlcl9pbmRleFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW3VzZXJfaW5kZXhdID0gMVxyXG4gICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShcImFpbV9vdmVyXCIpKSB7XHJcbiAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWltXHJcbiAgICAgIH1cclxuICAgICAgc3dpdGNoKGRhdGEuc2tpbGxfaW5kZXgpIHtcclxuICAgICAgICBjYXNlIDA6IC8vINGA0YvQstC+0LpcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgdmFyIGNoYXJnZV9tb3ZlX2luY3JlYXNlID0gcGFyc2VJbnQoY2hhcmFjdGVyLmFnaWxpdHkpXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gKyBjaGFyZ2VfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICB2YXIgY2hhcmdlX3VzZXJfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgY2hhcmdlX3VzZXJfb2JqZWN0LmNvb2xkb3duID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmNoYXJnZV91c2VyID0gY2hhcmdlX3VzZXJfb2JqZWN0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC+0LLQtdGA0YjQsNC10YIg0YDRi9Cy0L7QulwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE6IC8vINC/0YDQuNC70LjQsiDQsNC00YDQtdC90LDQu9C40L3QsFxyXG4gICAgICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRfaW5kZXggPSBkYXRhLnRhcmdldF9pbmRleFxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdGFyZ2V0X2luZGV4XSAtIGFkcmVuYWxpbmVfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gKyAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF90YXJnZXQgPSB7fVxyXG4gICAgICAgICAgICBhZHJlbmFsaW5lX29iamVjdF90YXJnZXQubWludXNfYWN0aW9ucyA9IGRhdGEubWludXNfYWN0aW9uc1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pbmRleF0uYWRyZW5hbGluZV90YXJnZXQgPSBhZHJlbmFsaW5lX29iamVjdF90YXJnZXRcclxuXHJcbiAgICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF91c2VyID0ge31cclxuICAgICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdXNlci5jb29sZG93biA9IGFkcmVuYWxpbmVfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5hZHJlbmFsaW5lX3VzZXIgPSBhZHJlbmFsaW5lX29iamVjdF91c2VyXHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINC/0YDQuNC70LjQsiDQsNC00YDQtdC90LDQu9C40L3QsC4gXCIgICsgdGFyZ2V0Lm5hbWUgKyBcIiDQv9C+0LvRg9GH0LDQtdGCIFwiICsgZGF0YS5leHRyYV9hY3Rpb25zICsgXCIg0LTQtdC50YHRgtCy0LjQuS4g0K3RgtC+INCx0YPQtNC10YIg0YHRgtC+0LjRgtGMIFwiICsgZGF0YS5taW51c19hY3Rpb25zICsgXCIg0LTQtdC50YHRgtCy0LjQuSDQvdCwINGB0LvQtdC00YPRjtGJ0LjQuSDRhdC+0LQuXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjogLy8g0L/QvtC00YDQtdC30LDQvdC40LUg0YHRg9GF0L7QttC40LvQuNC5XHJcbiAgICAgICAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHN0YW1pbmFfY3V0X2xpbWJfY29zdFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY3V0X2xpbWJfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgY3V0X2xpbWJfb2JqZWN0LmNvb2xkb3duID0gY3V0X2xpbWJfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5jdXRfbGltYl91c2VyID0gY3V0X2xpbWJfb2JqZWN0XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLlwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L7QtNC90LDQutC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDRg9C00LDQu9C+0YHRjCDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlICE9ICdyb2d1ZScpIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc2tpbGxfb3V0Y29tZSA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbGltYl9jdXRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgICAgbGltYl9jdXRfb2JqZWN0LmR1cmF0aW9uID0gY3V0X2xpbWJfZHVyYXRpb25cclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uY3V0X2xpbWIgPSBsaW1iX2N1dF9vYmplY3RcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IC0xMFxyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQv9C+0LTRgNC10LfQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LHQtdC30YPRgdC/0LXRiNC90L4g0L/Ri9GC0LDQtdGC0YHRjyDQv9C+0LTRgNC10LfQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5za2lsbF9vdXRjb21lID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBsaW1iX2N1dF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgICBsaW1iX2N1dF9vYmplY3QuZHVyYXRpb24gPSBjdXRfbGltYl9kdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5jdXRfbGltYiA9IGxpbWJfY3V0X29iamVjdFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gLTEwXHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC/0L7QtNGA0LXQt9Cw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LHQtdC30YPRgdC/0LXRiNC90L4g0L/Ri9GC0LDQtdGC0YHRjyDQv9C+0LTRgNC10LfQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgICAgICB2YXIgbGltYl9jdXRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICBsaW1iX2N1dF9vYmplY3QuZHVyYXRpb24gPSBjdXRfbGltYl9kdXJhdGlvbiArIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5jdXRfbGltYiA9IGxpbWJfY3V0X29iamVjdFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAtMTBcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQv9C+0LTRgNC10LfQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiLCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZ1bGxfY292ZXJcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQv9C+0LTRgNC10LfQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90L4g0YLQvtGCINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQv9C+0LvQvdC+0Lwg0YPQutGA0YvRgtC40LguXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6IC8vINGB0LvQsNCx0L7QtSDQvNC10YHRgtC+XHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gc3RhbWluYV93ZWFrc3BvdF9jb3N0XHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZGF0YS5vdXRjb21lID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgIHZhciB3ZWFrc3BvdF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICB3ZWFrc3BvdF9vYmplY3QuaHVudGVyX2lkID0gdXNlcl9pbmRleFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS53ZWFrc3BvdCA9IHdlYWtzcG90X29iamVjdFxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQvtCx0L3QsNGA0YPQttC40Lsg0YHQu9Cw0LHQvtC1INC80LXRgdGC0L4gXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L3QtSDRg9C00LDQu9C+0YHRjCDQvtCx0L3QsNGA0YPQttC40YLRjCDRgdC70LDQsdC+0LUg0LzQtdGB0YLQviBcIiArIHRhcmdldC5uYW1lXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSA0OiAvLyDQu9C10YfQtdC90LjQtVxyXG4gICAgICAgIHZhciBoZWFsZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICB2YXIgY29vbGRvd24gPSAwXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW3VzZXJfaW5kZXhdID4gY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbZGF0YS50YXJnZXRfaWRdKSB7XHJcbiAgICAgICAgICAvLyDQv9Cw0YbQuNC10L3RgiDQvdC1INGF0L7QtNC40YIg0LIg0Y3RgtC+0YIg0LbQtSDRhdC+0LRcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS50YXJnZXRfaWRdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdLzJcclxuICAgICAgICAgIGNvb2xkb3duID0gMFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb29sZG93biA9IDFcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGhlYWxlZF9vYmplY3QgPSB7fVxyXG4gICAgICAgIGhlYWxlZF9vYmplY3QuY29vbGRvd24gPSBjb29sZG93blxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmhlYWxlZCA9IGhlYWxlZF9vYmplY3RcclxuICAgICAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmYWlsXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCjIFwiICsgaGVhbGVyLm5hbWUgKyBcIiDQvdC1INC/0L7Qu9GD0YfQuNC70L7RgdGMINCy0YvQu9C10YfQuNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuaGVhbF9yb2xsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCjIFwiICsgaGVhbGVyLm5hbWUgKyBcIiDQv9C+0LvRg9GH0LjQu9C+0YHRjCDRg9GB0L/QtdGI0L3QviDQstGL0LvQtdGH0LjRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmhlYWxfcm9sbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBkYXRhLm5ld19ocFxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY3JpdGljYWwgc3VjY2Vzc1wiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQoyBcIiArIGhlYWxlci5uYW1lICsgXCIg0L/QvtC70YPRh9C40LvQvtGB0Ywg0LrRgNC40YLQuNGH0LXRgdC60LggKDIg0YHRgtC10L/QtdC90LgpINCy0YvQu9C10YfQuNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuaGVhbF9yb2xsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGRhdGEubmV3X2hwXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLQntGI0LjQsdC60LAg0L/RgNC4INGA0LDQt9Cx0L7RgNC1INC+0YLRhdC40LvQsFwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OiAvLyDQsdC+0LvRjNGI0L7QuSDQsdGA0LDRglxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgdmFyIHNoaWVsZCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHNoaWVsZC5uYW1lICsgXCIg0LfQsNGJ0LjRgtC40LsgXCIgKyAgdGFyZ2V0Lm5hbWUgKyBcIiAoK1wiICsgZGF0YS5ib251c19LRCArIFwi0LrQtClcIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtkYXRhLnRhcmdldF9pZF0gKyBkYXRhLmJvbnVzX0tEXHJcbiAgICAgICAgICB2YXIgYmlnX2Jyb19vYmplY3QgPSB7fVxyXG4gICAgICAgICAgYmlnX2Jyb19vYmplY3QuY29vbGRvd24gPSBjb29sZG93bl9iaWdfYnJvXHJcbiAgICAgICAgICBiaWdfYnJvX29iamVjdC5ib251c19LRCA9IGRhdGEuYm9udXNfS0RcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmJpZ19icm8gPSBiaWdfYnJvX29iamVjdFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OiAvLyDQv9C+0LTQvdGP0YLRjCDRidC40YLRi1xyXG4gICAgICAgICAgdmFyIHNoaWVsZCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICBpZiAoZGF0YS5vdXRjb21lID09IFwic2hpZWxkX3VwXCIpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gKyBzaGllbGRfdXBfS0RcclxuICAgICAgICAgICAgdmFyIHNoaWVsZF91cF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBzaGllbGRfdXBfb2JqZWN0LnN0YW1pbmFfY29zdCA9IHNoaWVsZF91cF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgICAgc2hpZWxkX3VwX29iamVjdC5LRCA9IHNoaWVsZF91cF9LRFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnNoaWVsZF91cCA9IHNoaWVsZF91cF9vYmplY3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaGllbGQubmFtZSArIFwiINC/0L7QtNC90Y/QuyDRidC40YLRiyDQt9CwINGH0LDRglwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2luZGV4XSAtIHNoaWVsZF91cF9LRFxyXG4gICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5zaGllbGRfdXBcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaGllbGQubmFtZSArIFwiINC+0L/Rg9GB0YLQuNC7INGJ0LjRgi4g0KfQsNGCINC/0YDQvtGB0YLQuChcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6IC8vINC/0L7QttC40YDQsNC90LjQtSDRgdGD0YnQvdC+0YHRgtC4XHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcblxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gLSBkYXRhLmRhbWFnZVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmhhc093blByb3BlcnR5KFwiTWFya3VzX3N0YWNrc1wiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5NYXJrdXNfc3RhY2tzID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uTWFya3VzX3N0YWNrcyArIDJcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLk1hcmt1c19zdGFja3MgPSAyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcImJpb3Bvb2xcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sICsgZGF0YS5kYW1hZ2VcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCA9IGRhdGEuZGFtYWdlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQvdCw0L3QvtGB0LjRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAg0L7RgiDQutC+0YLQvtGA0L7Qs9C+INC90LXQstC+0LfQvNC+0LbQvdC+INGD0LLQtdGA0L3Rg9GC0YzRgdGPXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgOTogLy8g0LDQsdGB0L7Qu9GO0YLQvdC+0LUg0LLQvtGB0YHRgtCw0L3QvtCy0LvQtdC90LjQtVxyXG4gICAgICAgICAgdmFyIGhlYWxlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcblxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gKyBkYXRhLmhlYWxfYW1vdW50XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgLSBkYXRhLmhlYWxfYW1vdW50XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGhlYWxlci5uYW1lICsgXCIg0LLQvtGB0YHRgtCw0L3QsNC70LjQstCw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgXCIgKyBkYXRhLmhlYWxfYW1vdW50ICsgXCIg0YXQv1wiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEwOiAvLyDQv9C+0LvRg9GH0LjRgtGMINCx0L7QvdGD0YFcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSArIDFcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC80LXQvdGP0LXRgiDQvtCx0YvRh9C90L7QtSDQvdCwINCx0L7QvdGD0YHQvdC+0LUg0LTQtdC50YHRgtCy0LjQtVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMTogLy8g0L7RgtC00YvRhVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBkYXRhLm5ld19zdGFtaW5hXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvtGC0LTRi9GF0LDQtdGCLiDQpdC+0YDQvtGI0LXQs9C+INC+0YLQv9GD0YHQutCwIVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTI6IC8vINCz0LDQt9C+0LLQsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBnYXNfYm9tYl9zdGFtaW5hX2Nvc3RcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsdGA0L7RgdCw0LXRgiDQs9Cw0LfQvtCy0YPRjiDQsdC+0LzQsdGDLiDQodC+0LLQtdGC0YPQtdC8INC30LDQtNC10YDQttCw0YLRjCDQtNGL0YXQsNC90LjQtS5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgICB2YXIgYm9tYl9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBib21iX29iamVjdC50eXBlID0gXCJnYXNfYm9tYlwiXHJcbiAgICAgICAgICAgIGJvbWJfb2JqZWN0LnBvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgICAgICBib21iX29iamVjdC50aHJlc2hvbGQgPSBkYXRhLnRocmVzaG9sZFxyXG4gICAgICAgICAgICBib21iX29iamVjdC5yYWRpdXMgPSAzXHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzLnB1c2goYm9tYl9vYmplY3QpXHJcblxyXG4gICAgICAgICAgICB2YXIgZ2FzX2JvbWJfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGdhc19ib21iX3VzZXIuY29vbGRvd24gPSBnYXNfYm9tYl9za2lsbF9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmdhc19ib21iX3VzZXIgPSBnYXNfYm9tYl91c2VyXHJcblxyXG4gICAgICAgICAgICB2YXIgaW5pdGlhbF9yYWRpdXMgPSAyXHJcblxyXG4gICAgICAgICAgICBhcHBseV9ib21iKGRhdGEucG9zaXRpb24sIGluaXRpYWxfcmFkaXVzKVxyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTM6IC8vINGB0LLQtdGC0L7RiNGD0LzQvtCy0LDRjyDQs9GA0LDQvdCw0YJcclxuICAgICAgICAgICAgdmFyIGxpZ2h0X3NvdW5kX2JvbWJfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGxpZ2h0X3NvdW5kX2JvbWJfdXNlci5jb29sZG93biA9IGxpZ2h0X3NvdW5kX2JvbWJfc2tpbGxfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5saWdodF9zb3VuZF9ib21iX3VzZXIgPSBsaWdodF9zb3VuZF9ib21iX3VzZXJcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5vdXRjb21lX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGRhdGEuY2hhcmFjdGVyX2xpc3RbaV1cclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgICAgICBpZiAoZGF0YS5vdXRjb21lX2xpc3RbaV0gPT0gMCkgeyAvLyDQn9GA0L7RiNC10Lsg0YHQv9Cw0YHQsdGA0L7RgdC+0LpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRg9GB0L/QtdC7INC/0YDQuNC60YDRi9GC0Ywg0LPQu9Cw0LfQsFwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvtGB0LvQtdC/INC90LAgMiDRhdC+0LTQsFwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImJsaW5kXCIpKSB7Ly8g0L3QtSDQvdCw0LrQu9Cw0LTRi9Cy0LLQsNC10Lwg0LXRidC1INGI0YLRgNCw0YRcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5ibGluZC5jb29sZG93biA9IDJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBibGluZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgICBibGluZF9vYmplY3QuY29vbGRvd24gPSAyXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uYmxpbmQgPSBibGluZF9vYmplY3RcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSAtIDJcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE0OiAvLyDRiNC+0LrQuNGA0L7QstCw0YLRjCAo0LTRgNC+0L0gKyDRg9GP0LfQstC40LzQvtGB0YLRjClcclxuICAgICAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YHRgtGA0LXQu9GP0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgICAgc2hvY2tlZF9lZmZlY3QoZGF0YS50YXJnZXRfaWQpXHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPINC4INGI0L7QutC40YDRg9C10YIg0YbQtdC70YwgKNGD0Y/Qt9Cy0LjQvNC+0YHRgtGMKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgICAgc2hvY2tlZF9lZmZlY3QoZGF0YS50YXJnZXRfaWQpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpINC4INGI0L7QutC40YDRg9C10YIg0YbQtdC70YwgKNGD0Y/Qt9Cy0LjQvNC+0YHRgtGMKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgc2hvY2tlZF9lZmZlY3QoZGF0YS50YXJnZXRfaWQpXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQv9C+0L/QsNC00LDQtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8g0Lgg0YjQvtC60LjRgNGD0LXRgiDRhtC10LvRjC4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDRiNC+0LrQuNGA0L7QstCw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QviDRgtC+0YIg0L3QsNGF0L7QtNC40YLRgdGPINCyINC/0L7Qu9C90L7QvCDRg9C60YDRi9GC0LjQuC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxNTogLy8g0L/Ri9GJINC/0YvRiSDQs9C+0YNcclxuICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXRfaW5kZXggPSBkYXRhLnRhcmdldF9pbmRleFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pbmRleF1cclxuICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgcGljaF9waWNoX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIHBpY2hfcGljaF9vYmplY3RfdGFyZ2V0ID0ge31cclxuICAgICAgICAgIHBpY2hfcGljaF9vYmplY3RfdGFyZ2V0LmV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2luZGV4XS5waWNoX3BpY2hfdGFyZ2V0ID0gcGljaF9waWNoX29iamVjdF90YXJnZXRcclxuXHJcbiAgICAgICAgICB2YXIgcGljaF9waWNoX29iamVjdF91c2VyID0ge31cclxuICAgICAgICAgIHBpY2hfcGljaF9vYmplY3RfdXNlci5jb29sZG93biA9IHBpY2hfcGljaF9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5waWNoX3BpY2hfdXNlciA9IHBpY2hfcGljaF9vYmplY3RfdXNlclxyXG5cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0LjRgdC/0L7Qu9GM0LfRg9C10YIg0J/Ri9GJLdCf0YvRiS3Qk9C+0YMuIFwiICArIHRhcmdldC5uYW1lICsgXCIg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9ucyArIFwiINC00L7QvyDQtNC10LnRgdGC0LLQuNC5INC90LAg0Y3RgtC+0YIg0Lgg0YHQu9C10LTRg9GO0YnQuNC5INGF0L7QtC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNjogLy8g0YHQuNC70L7QstC+0LUg0L/QvtC70LVcclxuICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBmb3JjZV9maWVsZF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc2hpZWxkX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3QudHlwZSA9IFwiZm9yY2VfZmllbGRcIlxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LnBvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LnJhZGl1cyA9IGZvcmNlX2ZpZWxkX3JhZGl1c1xyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LnNoaWVsZCA9IGRhdGEuc2hpZWxkXHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3QuY2hhcmFjdGVyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0XHJcbiAgICAgICAgICAgIHNoaWVsZF9vYmplY3QuY2VsbHNfcHJvdGVjdGVkID0gZGF0YS5jZWxsc19wcm90ZWN0ZWRcclxuICAgICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMucHVzaChzaGllbGRfb2JqZWN0KVxyXG5cclxuICAgICAgICAgICAgdmFyIHNoaWVsZF9pbmRleCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzLmxlbmd0aCAtIDFcclxuICAgICAgICAgICAgdmFyIGNoYXJfbGlzdCA9IGRhdGEuY2hhcmFjdGVyX2xpc3RcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JjZV9maWVsZF90YXJnZXQgPSB7fVxyXG4gICAgICAgICAgICBmb3JjZV9maWVsZF90YXJnZXQuc2hpZWxkX2luZGV4ID0gc2hpZWxkX2luZGV4XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gY2hhcl9saXN0W2ldXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXQgPSBmb3JjZV9maWVsZF90YXJnZXRcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGZvcmNlX2ZpZWxkX3VzZXIgPSB7fVxyXG4gICAgICAgICAgICBmb3JjZV9maWVsZF91c2VyLmNvb2xkb3duID0gZm9yY2VfZmllbGRfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5mb3JjZV9maWVsZF91c2VyID0gZm9yY2VfZmllbGRfdXNlclxyXG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCw0LrRgtC40LLQuNGA0YPQtdGCINGB0LjQu9C+0LLQvtC1INC/0L7Qu9C1XCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxNzogLy8g0LjQvdCy0LjQt1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVt1c2VyX2luZGV4XSA9IGRhdGEudXNlcm5hbWVcclxuICAgICAgICAgIGlmIChteV9uYW1lICE9IGRhdGEudXNlcm5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgZGF0YS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxODogLy8g0LHQvtC10LLQsNGPINGD0L3QuNCy0LXRgNGB0LDQu9GM0L3QvtGB0YLRjFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5hZGFwdGl2ZV9maWdodGluZyA9IC0xO1xyXG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LDQutGC0LjQstC40YDRg9C10YIg0LHQvtC10LLRg9GOINGD0L3QuNCy0LXRgNGB0LDQu9GM0L3QvtGB0YLRjFwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAxOTogLy8g0LvQsNC60Lgg0YjQvtGCXHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGx1Y2t5X3Nob3Rfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGRhdGEucm9sbCA9PSA3KSB7XHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQo9C00LDRh9CwINCx0LvQsNCz0L7QstC+0LvQuNGCIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiwg0LrQvtGC0L7RgNGL0Lkg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAgXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBkYXRhLnJvbGwgKyBcIiDRjdGC0L4g0L3QtSDRh9C40YHQu9C+IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiwg0YLQsNC6INGH0YLQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0LjQt9Cx0LXQs9Cw0LXRgiDQsNGC0LDQutC4LlwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIwOiAvLyBsb3R0ZXJ5X3Nob3RcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gbG90dGVyeV9zaG90X3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLnJvbGwgPT0gNykge1xyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JrQsNC60LDRjyDRg9C00LDRh9CwISDQpNC+0YDRgtGD0L3QsCDRj9Cy0L3QviDQvdCwINGB0YLQvtGA0L7QvdC1IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiwg0LrQvtGC0L7RgNGL0Lkg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAgXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJvbGwgPT0gNzcpIHtcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZSlcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCU0LbQtdC60L/QvtGCISBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQtdCz0L7QtNC90Y8g0YHRgtC+0LjRgiDQutGD0L/QuNGC0Ywg0LvQvtGC0LXRgNC10LnQvdGL0Lkg0LHQuNC70LXRgiwg0LAg0L/QvtC60LAg0L7QvSDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsCBcIiArIHRhcmdldC5uYW1lXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGRhdGEucm9sbCArIFwiINGN0YLQviDQvdC1INGH0LjRgdC70L4gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiLCDRgtCw0Log0YfRgtC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQuNC30LHQtdCz0LDQtdGCINCw0YLQsNC60LguXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjE6IC8v0LLRgdC/0LvQtdGB0Log0LTQtdC50YHRgtCy0LjQuVxyXG4gICAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdICsgZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBhY3Rpb25fc3BsYXNoX3N0YW1pbmFfY29zdCpkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2YXIgYWN0aW9uX3NwbGFzaF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgYWN0aW9uX3NwbGFzaF9vYmplY3QuY29vbGRvd24gPSBhY3Rpb25fc3BsYXNoX2Nvb2xkb3duXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmFjdGlvbl9zcGxhc2ggPSBhY3Rpb25fc3BsYXNoX29iamVjdFxyXG5cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0LjRgdC/0L7Qu9GM0LfRg9C10YIg0LLRgdC/0LvQtdGB0Log0LTQtdC50YHRgtCy0LjQuSDQuCDQv9C+0LvRg9GH0LDQtdGCIFwiICsgZGF0YS5leHRyYV9hY3Rpb25zICsgXCIg0L7RgdC90L7QstC90YvRhSDQtNC10LnRgdGC0LLQuNC5INCy0LzQtdGB0YLQviDQsdC+0L3Rg9GB0L3Ri9GFLlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjI6IC8vINCz0YDQsNC0INGD0LTQsNGA0L7QslxyXG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gcHVuY2hfcmFpbmZhbGxfc3RhbWluYV9jb3N0KmRhdGEudG90YWxfYXR0YWNrc1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGRhdGEuZGFtYWdlID4gMCkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZSlcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvdCw0L3QvtGB0LjRgiDQs9GA0LDQtCDQuNC3IFwiICsgZGF0YS50b3RhbF9hdHRhY2tzICsgXCIg0YPQtNCw0YDQvtCyLCDQuNC3INC60L7RgtC+0YDRi9GFIFwiICsgZGF0YS5zdWNjZXNzZnVsbF9hdHRhY2tzICsgXCIg0L/QvtC/0LDQtNCw0Y7RgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QsNC90L7RgdGPIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwLlwiXHJcblxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyMzogLy8g0LDQtNGA0LXQvdCw0LvQuNC90L7QstGL0Lkg0L/QvtGC0L7Qv1xyXG4gICAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldF9pbmRleCA9IGRhdGEudGFyZ2V0X2luZGV4XHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2luZGV4XVxyXG4gICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNbMF1cclxuICAgICAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gKyBhZHJlbmFsaW5lX21vdmVfaW5jcmVhc2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV4dHJhX2FjdGlvbnMgPSBleHRyYV9hY3Rpb25zIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldCA9IHt9XHJcbiAgICAgICAgICBhZHJlbmFsaW5lX29iamVjdF90YXJnZXQuZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0LnR1cm4gPSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pbmRleF0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0ID0gYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0XHJcblxyXG4gICAgICAgICAgdmFyIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIgPSB7fVxyXG4gICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdXNlci5jb29sZG93biA9IHBvaXNvbm91c19hZHJlbmFsaW5lX2Nvb2xkb3duXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnBvaXNvbm91c19hZHJlbmFsaW5lX3VzZXIgPSBhZHJlbmFsaW5lX29iamVjdF91c2VyXHJcblxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQsNC00YDQtdC90LDQu9C40L3QvtCy0YvQuSDQv9C+0YLQvtC/LiBcIiAgKyB0YXJnZXQubmFtZSArIFwiINC/0L7Qu9GD0YfQsNC10YIgXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnNbMF0gKyBcIiDQtNC10LnRgdGC0LLQuNC5INCyINGN0YLQvtGCINGF0L7QtCwg0LggXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnNbMV0gKyBcIiDQsiDRgdC70LXQtNGD0Y7RidC40LkuINCt0YLQviDQsdGD0LTQtdGCINGB0YLQvtC40YLRjCDQttC40LfQvdC10Lkg0Lgg0LLRi9C90L7RgdC70LjQstC+0YHRgtC4LCDQuNGB0L/QvtC70YzQt9GD0LnRgtC1INGBINGD0LzQvtC8LlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcblxyXG4gICAgICBjYXNlIDI0OiAvLyDQutC40YHQu9C+0YLQvdCw0Y8g0LPRgNCw0L3QsNGC0LBcclxuICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcblxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gYWNpZF9ib21iX3N0YW1pbmFfY29zdFxyXG5cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsdGA0L7RgdCw0LXRgiDQutC40YHQu9C+0YLQvdGD0Y4g0LPRgNCw0L3QsNGC0YMuINCQINC+0L3QuCDRgtC+0LvRjNC60L4g0LrRg9C/0LjQu9C4INC90L7QstGL0LUg0LTQvtGB0L/QtdGF0LguLi5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgIHZhciBhY2lkX2JvbWJfdXNlciA9IHt9XHJcbiAgICAgICAgICBhY2lkX2JvbWJfdXNlci5jb29sZG93biA9IGFjaWRfYm9tYl9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5hY2lkX2JvbWJfdXNlciA9IGFjaWRfYm9tYl91c2VyXHJcblxyXG4gICAgICAgICAgYXBwbHlfYWNpZF9ib21iKGRhdGEucG9zaXRpb24sIGFjaWRfYm9tYl9yYWRpdXMpXHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI1OiAvLyDQt9Cw0LzQuNC90LjRgNC+0LLQsNGC0YxcclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMoZGF0YS5wb3NpdGlvbikpIHtcclxuICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5wdXNoKGRhdGEucG9zaXRpb24pXHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW2RhdGEucG9zaXRpb25dID0gW11cclxuICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbZGF0YS5wb3NpdGlvbl0ucHVzaChkYXRhLnBsYXllcl9uYW1lKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjY6IC8vINCy0LfQsNC40LzQvtC00LXQudGB0YLQstC+0LLQsNGC0YxcclxuXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtPSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLmludGVyYWN0aW9uX3R5cGUgPT0gXCJkaWZmdXNlX2xhbmRtaW5lXCIpIHtcclxuICAgICAgICAgICAgc3dpdGNoKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJlbXB0eVwiOlxyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KEg0YfQtdC8IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQvtCy0LDRgtGMP1wiXHJcbiAgICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImZhaWxcIjpcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0L7Qv9GL0YLQsNC70YHRjyDQvtCx0LXQt9Cy0YDQtdC00LjRgtGMINC80LjQvdGDLCDQvdC+INC90LUg0YHRg9C80LXQuy5cIlxyXG4gICAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtaW5lX3Bvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBtaW5lX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgY2VsbC5zcmMgPSBmb2dPclBpYyhtaW5lX3Bvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5kZXhPZihtaW5lX3Bvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5zcGxpY2UoaW5kZXgsMSlcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW21pbmVfcG9zaXRpb25dID0gW11cclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC30LDQv9GA0LXRidCw0LXRgiDQvNC40L3QtSDQstC30YDRi9Cy0LDRgtGM0YHRjyFcIlxyXG4gICAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3dpdGNoINC+0LHQtdCy0LfRgNC10LbQtdC90LjRjyDQv9C+0YjQtdC7INC90LUg0YLQsNC6XCIpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmludGVyYWN0aW9uX3R5cGUgPT0gXCJoYWNrYWJsZV9jb21wdXRlclwiKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGRhdGEucG9zaXRpb247XHJcbiAgICAgICAgICAgIHN3aXRjaChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiYWxyZWFkeV9oYWNrZWRcIjpcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCa0L7QvNC/0YzRjtGC0LXRgCwg0LrQvtGC0L7RgNGL0LkgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINCy0LfQu9C+0LzQsNGC0YwsINGD0LbQtSDQsdGL0Lsg0YPRgdC/0LXRiNC90L4g0LLQt9C70L7QvNCw0L0sINCwINC40L3RhNC+0YDQvNCw0YbQuNGPINGD0LTQsNC70LXQvdCwLlwiO1xyXG4gICAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgY2FzZSBcImFscmVhZHlfZmFpbGVkXCI6XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQn9GA0L7RgtC+0LrQvtC7INCx0LXQt9C+0L/QsNGB0L3QvtGB0YLQuCDQvdCwINC60L7QvNC/0YzRjtGC0LXRgNC1LCDQutC+0YLQvtGA0YvQuSBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0LLQt9C70L7QvNCw0YLRjCwg0YPQttC1INCx0YvQuyDQt9Cw0L/Rg9GJ0LXQvSDRgNCw0L3QtdC1LCDQsCDQuNC90YTQvtGA0LzQsNGG0LjRjyDRg9C00LDQu9C10L3QsC4g0J4g0LLQsNGI0LXQuSDQv9C+0L/Ri9GC0LrQtSDQvNC+0LPQu9C4INGD0LfQvdCw0YLRjC5cIjtcclxuICAgICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImZhaWxlZFwiOlxyXG4gICAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLm9ic3RhY2xlX2V4dHJhX2luZm9baW5kZXhdLmhhY2tfZmFpbHMgPSAzOyAvLyBmdWxseSBmYWlsZWRcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCX0LDQv9GD0YnQtdC9INC/0YDQvtGC0L7QutC+0Lsg0LHQtdC30L7Qv9Cw0YHQvdC+0YHRgtC4INC90LAg0LrQvtC80L/RjNGO0YLQtdGA0LUsINC60L7RgtC+0YDRi9C5IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQstC30LvQvtC80LDRgtGMLiDQktGB0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y8g0YPQtNCw0LvQtdC90LAsINC+0YLQv9GA0LDQstC70LXQvdC+INGD0LLQtdC00L7QvNC70LXQvdC40LUg0L4g0L/QvtC/0YvRgtC60LUg0LLQt9C70L7QvNCwLlwiO1xyXG4gICAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIFwib25lX2ZhaWxcIjpcclxuICAgICAgICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUub2JzdGFjbGVfZXh0cmFfaW5mb1tpbmRleF0uaGFzT3duUHJvcGVydHkoXCJoYWNrX2ZhaWxzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5vYnN0YWNsZV9leHRyYV9pbmZvW2luZGV4XS5oYWNrX2ZhaWxzICs9IDFcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLm9ic3RhY2xlX2V4dHJhX2luZm9baW5kZXhdLmhhY2tfZmFpbHMgPSAxO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC+0LLQtdGA0YjQsNC10YIg0L3QtdGD0LTQsNGH0L3Rg9GOINC/0L7Qv9GL0YLQutGDINCy0LfQu9C+0LzQsC4g0J7RgdGC0L7RgNC+0LbQvdC+LCDQstCw0YjQuCDQtNC10LnRgdGC0LLQuNGPINC80L7Qs9GD0YIg0LHRi9GC0Ywg0LfQsNC80LXRh9C10L3Riy5cIjtcclxuICAgICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgIGNhc2UgXCJvbmVfc3VjY2Vzc1wiOlxyXG4gICAgICAgICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5vYnN0YWNsZV9leHRyYV9pbmZvW2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcImhhY2tfc3RhZ2VcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLm9ic3RhY2xlX2V4dHJhX2luZm9baW5kZXhdLmhhY2tfc3RhZ2UgKz0gMVxyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUub2JzdGFjbGVfZXh0cmFfaW5mb1tpbmRleF0uaGFja19zdGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC/0YDQvtC00LLQuNCz0LDQtdGC0YHRjyDQsiDQstC30LvQvtC80LUg0LHQsNC30Ysg0LTQsNC90L3Ri9GFLiDQn9GA0L7Qs9GA0LXRgdGBOiBcIiArICgzMypnYW1lX3N0YXRlLm9ic3RhY2xlX2V4dHJhX2luZm9baW5kZXhdLmhhY2tfc3RhZ2UpICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJoYWNrZWRcIjpcclxuICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5vYnN0YWNsZV9leHRyYV9pbmZvW2luZGV4XS5oYWNrX3N0YWdlID0gMzsgLy8gZnVsbHkgaGFja2VkXHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRg9C00LDQtdGC0YHRjyDQv9GA0L7RgNCy0LDRgtGM0YHRjyDRh9C10YDQtdC3INGE0LDQtdGA0LLQvtC70Lsg0LrQvtC80L/RjNGO0YLQtdGA0LAsINC4INC+0L0g0L/QvtC70YPRh9Cw0LXRgiDQv9C+0LvQvdGL0Lkg0LTQvtGB0YLRg9C/INC6INC40LzQtdGO0YnQuNC80YHRjyDQtNCw0L3QvdGL0LwuXCI7XHJcbiAgICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gaW50ZXJhY3Rpb25cIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjc6IC8vINC90LjQutC+0YLQuNC90L7QstGL0Lkg0YPQtNCw0YBcclxuICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgZnVsbF9ocCA9IEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFt1c2VyX2luZGV4XSAtIGZ1bGxfaHAgKiB0b2JhY2NvX3N0cmlrZV9ocF9wZXJjZW50YWdlXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2luZGV4XSArIHRvYmFjY29fc3RyaWtlX2JvbnVzXHJcbiAgICAgICAgICB2YXIgdG9iYWNjb19zdHJpa2Vfb2JqZWN0ID0ge31cclxuICAgICAgICAgIHRvYmFjY29fc3RyaWtlX29iamVjdC5jb29sZG93biA9IHRvYmFjY29fc3RyaWtlX2Nvb2xkb3duXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnRvYmFjY29fc3RyaWtlID0gdG9iYWNjb19zdHJpa2Vfb2JqZWN0XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YXQvtGA0L7RiNC10YfQvdC+INC30LDRgtGP0LPQuNCy0LDQtdGC0YHRjy4g0JHQtdGA0LXQs9C40YLQtdGB0YwhXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjg6IC8vINC60YDRg9GH0LXQvdGL0LUg0L/Rg9C70LhcclxuICAgICAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGN1cnZlZF9idWxsZXRzX3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLmNvdmVyX2xldmVsID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCLQo9GA0L7QstC10L3RjCDRg9C60YDRi9GC0LjRjzogXCIgKyBkYXRhLmNvdmVyX2xldmVsXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQtdGC0YHRjyDQt9Cw0LrRgNGD0YLQuNGC0Ywg0L/Rg9C70Y4g0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQt9Cw0LrRgNGD0YLQuNGC0Ywg0L/Rg9C70Y4g0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LfQsNC60YDRg9GC0LjQuyDQv9GD0LvRjiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC30LDQutGA0YPRgtC40Lsg0L/Rg9C70Y4gXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcItC60YDRg9GH0LXQvdC+0Lkg0L/Rg9C70LXQuSwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQndC10YHQvNC+0YLRgNGPINC90LAg0L/QvtC/0YvRgtC60YMgXCIgKyBhdHRhY2tlci5uYW1lICsgXCIg0L7QsdC60YDRg9GC0LjRgtGMINC/0YDQtdC/0Y/RgtGB0YLQstC40LUg0LfQsNGJ0LjRidCw0Y7RidC10LUgXCIgKyB0YXJnZXQubmFtZSArIFwiLCDRgtC+0YIg0LLRgdC1INGA0LDQstC90L4g0L3QsNGF0L7QtNC40YLRgdGPINCyINC/0L7Qu9C90L7QvCDRg9C60YDRi9GC0LjQuC5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjk6IC8vINCf0YDQuNGG0LXQu9C40YLRjNGB0Y9cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBhaW1fb2JqZWN0ID0ge31cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWltID0gYWltX29iamVjdFxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDMwOiAvLyDQsdGL0YHRgtGA0LDRjyDQsNGC0LDQutCwXHJcbiAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFt1c2VyX2luZGV4XSA9IDFcclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmhhc093blByb3BlcnR5KFwicXVpY2tfYXR0YWNrX3JlYWR5XCIpKSB7XHJcbiAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ucXVpY2tfYXR0YWNrX3JlYWR5XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBzdGFtaW5hX2F0dGFja19jb3N0XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLmNvdmVyX2xldmVsID4gMCkge1xyXG4gICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcItCj0YDQvtCy0LXQvdGMINGD0LrRgNGL0YLQuNGPOiBcIiArIGRhdGEuY292ZXJfbGV2ZWxcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCJcIlxyXG4gICAgICB9XHJcbiAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdGL0YHRgtGA0L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCx0YvRgdGC0YDQviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L7QtNC90LDQutC+IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDRg9C00LDQu9C+0YHRjCDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBpZiAodGFyZ2V0LnNwZWNpYWxfdHlwZSAhPSAncm9ndWUnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INCx0YvRgdGC0YDQviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQsdGL0YHRgtGA0L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INCx0YvRgdGC0YDQviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NvdmVyXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQsdGL0YHRgtGA0L4g0LDRgtCw0LrQvtCy0LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdC+INGC0L7RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAzMTogLy8g0YHQu9GD0LbQsdCwINGB0L/QsNGB0LXQvdC40Y9cclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gc2FmZXR5X3NlcnZpY2VfYm9udXNfYWN0aW9uc19jb3N0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzYXZpb3IgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICB2YXIgbWVzc2FnZSA9IHNhdmlvci5uYW1lICsgXCIg0L3QtSDQtNCw0YHRgiDQsiDQvtCx0LjQtNGDIFwiICsgIHRhcmdldC5uYW1lXHJcbiAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2RhdGEudGFyZ2V0X2lkXSArIHNhZmV0eV9zZXJ2aWNlX2RlZmVuc2l2ZV9hZHZhbnRhZ2VcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZXZhZGVfYm9udXNbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLmV2YWRlX2JvbnVzW2RhdGEudGFyZ2V0X2lkXSArIHNhZmV0eV9zZXJ2aWNlX2V2YWRlX2JvbnVzXHJcblxyXG4gICAgICAgIHZhciBzYWZldHlfc2VydmljZV90YXJnZXRfb2JqZWN0ID0ge31cclxuICAgICAgICBzYWZldHlfc2VydmljZV90YXJnZXRfb2JqZWN0LmR1cmF0aW9uID0gc2FmZXR5X3NlcnZpY2VfZHVyYXRpb25cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5zYWZldHlfc2VydmljZV90YXJnZXQgPSBzYWZldHlfc2VydmljZV90YXJnZXRfb2JqZWN0XHJcblxyXG4gICAgICAgIHZhciBzYWZldHlfc2VydmljZV91c2VyX29iamVjdCA9IHt9XHJcbiAgICAgICAgc2FmZXR5X3NlcnZpY2VfdXNlcl9vYmplY3QuY29vbGRvd24gPSBzYWZldHlfc2VydmljZV9jb29sZG93blxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uc2FmZXR5X3NlcnZpY2VfdXNlciA9IHNhZmV0eV9zZXJ2aWNlX3VzZXJfb2JqZWN0XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDMyOiAvLyDQutCw0LvRjNC40L3Qs9Cw0LvRj9GC0L7RgFxyXG4gICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBjYWxpbmdhbGF0b3Jfc3RhbWluYV9jb3N0XHJcblxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRg9GB0YLQsNC90LDQstC70LjQstCw0LXRgiDQutCw0LvRjNC40L3Qs9Cw0LvRj9GC0L7RgC4g0KHQvtCx0LjRgNCw0LnRgtC10YHRjCDQstC+0LrRgNGD0LMhLlwiXHJcbiAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICB2YXIgY2FsaW5nYWxhdG9yX29iamVjdCA9IHt9XHJcbiAgICAgICAgY2FsaW5nYWxhdG9yX29iamVjdC50eXBlID0gXCJjYWxpbmdhbGF0b3JcIlxyXG4gICAgICAgIGNhbGluZ2FsYXRvcl9vYmplY3QucG9zaXRpb24gPSBkYXRhLnBvc2l0aW9uXHJcbiAgICAgICAgY2FsaW5nYWxhdG9yX29iamVjdC5kdXJhdGlvbiA9IGNhbGluZ2FsYXRvcl9kdXJhdGlvblxyXG4gICAgICAgIGNhbGluZ2FsYXRvcl9vYmplY3QucmFkaXVzID0gY2FsaW5nYWxhdG9yX3JhZGl1c1xyXG4gICAgICAgIGNhbGluZ2FsYXRvcl9vYmplY3QuZmxhdF9oZWFsID0gY2FsaW5nYWxhdG9yX2ZsYXRfaGVhbFxyXG4gICAgICAgIGNhbGluZ2FsYXRvcl9vYmplY3Qucm9sbF9oZWFsID0gY2FsaW5nYWxhdG9yX3JvbGxfaGVhbFxyXG4gICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzLnB1c2goY2FsaW5nYWxhdG9yX29iamVjdClcclxuXHJcbiAgICAgICAgdmFyIGNhbGluZ2FsYXRvcl91c2VyID0ge31cclxuICAgICAgICBjYWxpbmdhbGF0b3JfdXNlci5jb29sZG93biA9IGNhbGluZ2FsYXRvcl9za2lsbF9jb29sZG93blxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uY2FsaW5nYWxhdG9yX3VzZXIgPSBjYWxpbmdhbGF0b3JfdXNlclxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDMzOiAvLyDQsdCw0YTRhCDQsdC10LvRjNCy0LXRglxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJtYWluX2FjdGlvblwiLCB1c2VyX2luZGV4LCAtMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgdGFyZ2V0X2lkID0gZGF0YS50YXJnZXRfaWQ7XHJcblxyXG4gICAgICAgICAgdmFyIGJ1ZmZlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2lkXVxyXG5cclxuICAgICAgICAgIC8vINCd0LXQv9C+0YHRgNC10LTRgdGC0LLQtdC90L3QviDQsdCw0YTRhFxyXG4gICAgICAgICAgdmFyIGJlbHZldF9idWZmX3RhcmdldF9vYmplY3QgPSB7fTtcclxuICAgICAgICAgIGJlbHZldF9idWZmX3RhcmdldF9vYmplY3QuZHVyYXRpb24gPSBiZWx2ZXRfYnVmZl9za2lsbF9kdXJhdGlvbjtcclxuICAgICAgICAgIGJlbHZldF9idWZmX3RhcmdldF9vYmplY3QuYXR0YWNrX2JvbnVzID0gYmVsdmV0X2J1ZmZfYXR0YWNrX2JvbnVzO1xyXG4gICAgICAgICAgYmVsdmV0X2J1ZmZfdGFyZ2V0X29iamVjdC5tZWxlZV9hZHZhbnRhZ2UgPSBiZWx2ZXRfYnVmZl9tZWxlZV9hZHZhbnRhZ2U7XHJcbiAgICAgICAgICBiZWx2ZXRfYnVmZl90YXJnZXRfb2JqZWN0LnJhbmdlZF9hZHZhbnRhZ2UgPSBiZWx2ZXRfYnVmZl9yYW5nZWRfYWR2YW50YWdlO1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaWRdLmJlbHZldF9idWZmX3RhcmdldCA9IGJlbHZldF9idWZmX3RhcmdldF9vYmplY3Q7XHJcbiAgICAgICAgICBjaGFuZ2VfY2hhcmFjdGVyX3Byb3BlcnR5KFwiYXR0YWNrX2JvbnVzXCIsIHRhcmdldF9pZCwgYmVsdmV0X2J1ZmZfYXR0YWNrX2JvbnVzKTtcclxuICAgICAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfcHJvcGVydHkoXCJtZWxlZV9hZHZhbnRhZ2VcIiwgdGFyZ2V0X2lkLCBiZWx2ZXRfYnVmZl9tZWxlZV9hZHZhbnRhZ2UpO1xyXG4gICAgICAgICAgY2hhbmdlX2NoYXJhY3Rlcl9wcm9wZXJ0eShcInJhbmdlZF9hZHZhbnRhZ2VcIiwgdGFyZ2V0X2lkLCBiZWx2ZXRfYnVmZl9yYW5nZWRfYWR2YW50YWdlKTtcclxuXHJcblxyXG4gICAgICAgICAgLy8g0J/QvtC00YHRh9C10YIg0YHQutGA0YvRgtGL0YUg0YHRgtCw0LrQvtCyXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaWRdLmhhc093blByb3BlcnR5KFwiYmVsdmV0X2J1ZmZfc3RhY2tzXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciBiZWx2ZXRfYnVmZl9zdGFja3Nfb2JqZWN0ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaWRdLmJlbHZldF9idWZmX3N0YWNrcztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBiZWx2ZXRfYnVmZl9zdGFja3Nfb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGJlbHZldF9idWZmX3N0YWNrc19vYmplY3Quc3RhY2tzID0gMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJlbHZldF9idWZmX3N0YWNrc19vYmplY3Quc3RhY2tzID0gYmVsdmV0X2J1ZmZfc3RhY2tzX29iamVjdC5zdGFja3MgKyAxO1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaWRdLmJlbHZldF9idWZmX3N0YWNrcyA9IGJlbHZldF9idWZmX3N0YWNrc19vYmplY3Q7XHJcblxyXG4gICAgICAgICAgLy8g0J3QsNC60L7QvdC10YYsINC00L7QsdCw0LLQu9GP0LXQvCDQsiDRgdC/0LjRgdC+0Log0YbQtdC70LXQuSDRgyDRjtC30LXRgNCwXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcImJlbHZldF9idWZmX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJlbHZldF9idWZmX3VzZXIudGFyZ2V0c19zZXQuaW5jbHVkZXModGFyZ2V0X2lkKSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmVsdmV0X2J1ZmZfdXNlci50YXJnZXRzX3NldC5wdXNoKHRhcmdldF9pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBiZWx2ZXRfYnVmZl91c2VyX29iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICBiZWx2ZXRfYnVmZl91c2VyX29iamVjdC50YXJnZXRzX3NldCA9IFtdO1xyXG4gICAgICAgICAgICBiZWx2ZXRfYnVmZl91c2VyX29iamVjdC50YXJnZXRzX3NldC5wdXNoKHRhcmdldF9pZCk7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmVsdmV0X2J1ZmZfdXNlciA9IGJlbHZldF9idWZmX3VzZXJfb2JqZWN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBidWZmZXIubmFtZSArIFwiINGD0YHQuNC70LjQstCw0LXRgiDQsNGC0LDQutC4IFwiICsgdGFyZ2V0Lm5hbWUgKyBcIi4g0J3QtSDQt9Cw0LHRg9C00YzRgtC1INGB0LrQsNC30LDRgtGMINGB0L/QsNGB0LjQsdC+IVwiO1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAzNDogLy8g0YLRgNCw0L3RgdGE0L7RgNC80LDRhtC40Y8g0JHQtdC70YzQstC10YJcclxuICAgICAgICB2YXIgdXNlciA9ICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGEucm9sbGVkX2J1ZmZzX3RhcmdldHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgIHZhciB0YXJnZXRfaWQgPSBkYXRhLnJvbGxlZF9idWZmc190YXJnZXRzW2pdO1xyXG4gICAgICAgICAgdmFyIHJvbGxlZF9idWZmc19hcnJheSA9IGRhdGEucm9sbGVkX2J1ZmZzX291dGNvbWVzW2pdO1xyXG4gICAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgICAgd2hpbGUgKGkgPCA1KSB7XHJcbiAgICAgICAgICAgIGlmIChyb2xsZWRfYnVmZnNfYXJyYXlbaV0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgcm9sbGVkX2J1ZmZzX2FycmF5W2ldIC09IDE7XHJcbiAgICAgICAgICAgICAgc3dpdGNoKGkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogLy9zdHJlbmd0aFxyXG4gICAgICAgICAgICAgICAgICBhcHBseV9lZmZlY3QodXNlcl9pbmRleCwgSU5DUkVBU0VfU1RSRU5HVEgpO1xyXG4gICAgICAgICAgICAgICAgICBhcHBseV9lZmZlY3QodGFyZ2V0X2lkLCBERUNSRUFTRV9TVFJFTkdUSCk7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgYXBwbHlfZWZmZWN0KHVzZXJfaW5kZXgsIElOQ1JFQVNFX1NUQU1JTkEpO1xyXG4gICAgICAgICAgICAgICAgICBhcHBseV9lZmZlY3QodGFyZ2V0X2lkLCBERUNSRUFTRV9TVEFNSU5BKTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICBhcHBseV9lZmZlY3QodXNlcl9pbmRleCwgSU5DUkVBU0VfQUdJTElUWSk7XHJcbiAgICAgICAgICAgICAgICAgIGFwcGx5X2VmZmVjdCh0YXJnZXRfaWQsIERFQ1JFQVNFX0FHSUxJVFkpO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgIGFwcGx5X2VmZmVjdCh1c2VyX2luZGV4LCBJTkNSRUFTRV9JTlQpO1xyXG4gICAgICAgICAgICAgICAgICBhcHBseV9lZmZlY3QodGFyZ2V0X2lkLCBERUNSRUFTRV9JTlQpO1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgIGFwcGx5X2VmZmVjdCh1c2VyX2luZGV4LCBJTkNSRUFTRV9LRCk7XHJcbiAgICAgICAgICAgICAgICAgIGFwcGx5X2VmZmVjdCh0YXJnZXRfaWQsIERFQ1JFQVNFX0tEKTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGkgKz0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmVsdmV0X2J1ZmZfdXNlci50cmFuc2Zvcm1lZCA9IHt9O1xyXG4gICAgICAgIGlmICh1c2VyLmhhc093blByb3BlcnR5KFwic2Vjb25kYXJ5X2F2YXRhclwiKSkge1xyXG4gICAgICAgICAgdmFyIHRlbXAgPSB1c2VyLmF2YXRhcjtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdLmF2YXRhciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdLnNlY29uZGFyeV9hdmF0YXI7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XS5zZWNvbmRhcnlfYXZhdGFyID0gdGVtcDtcclxuICAgICAgICAgIHZhciBjaGFyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW3VzZXJfaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXNlci5oYXNPd25Qcm9wZXJ0eShcInNlY29uZGFyeV9jaGliaV9hdmF0YXJcIikpIHtcclxuICAgICAgICAgIHZhciB0ZW1wID0gdXNlci5jaGliaV9hdmF0YXI7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XS5jaGliaV9hdmF0YXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XS5zZWNvbmRhcnlfY2hpYmlfYXZhdGFyO1xyXG4gICAgICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF0uc2Vjb25kYXJ5X2NoaWJpX2F2YXRhciA9IHRlbXA7XHJcbiAgICAgICAgICB2YXIgY2hhcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvblt1c2VyX2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEoKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2NoYXJfcG9zaXRpb25dID09IDEpKSB8fCAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVt1c2VyX2luZGV4XSAhPSBcImFsbFwiICYmIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbdXNlcl9pbmRleF0gIT0gbXlfbmFtZSkpKSB7XHJcbiAgICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBjaGFyX3Bvc2l0aW9uKTtcclxuICAgICAgICAgIHRvX2NlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKHVzZXJfaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC+0YLQutGA0YvQstCw0LXRgiDRgdCy0L7RjiDQuNGB0YLQuNC90L3Rg9GOINGB0YPRidC90L7RgdGC0YwsINC/0L7Qu9GD0YfQsNGPIFwiICsgZGF0YS50b3RhbF91cGdyYWRlICsgXCIg0YPRgdC40LvQtdC90LjQuS4g0KPQtNCw0YfQvdC+0Lkg0L7RhdC+0YLRiyFcIjtcclxuICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAzNTogLy8g0YXRg9C6XHJcbiAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XTtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdO1xyXG5cclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLT0gMVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGhvb2tfdXNlcl9vYmplY3QgPSB7fVxyXG4gICAgICAgIGhvb2tfdXNlcl9vYmplY3QuY29vbGRvd24gPSBob29rX2Nvb2xkb3duXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5ob29rX3VzZXIgPSBob29rX3VzZXJfb2JqZWN0XHJcblxyXG4gICAgICAgIHZhciBob29rX3RhcmdldF9vYmplY3QgPSB7fVxyXG4gICAgICAgIGhvb2tfdGFyZ2V0X29iamVjdC5kdXJhdGlvbiA9IGhvb2tfZHVyYXRpb25cclxuICAgICAgICBob29rX3RhcmdldF9vYmplY3QuZGVmZW5zaXZlX2FkdmFudGFnZSA9IGhvb2tfZGVmZW5zaXZlX2FkdmFudGFnZVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmhvb2tfdGFyZ2V0ID0gaG9va190YXJnZXRfb2JqZWN0XHJcblxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2RhdGEudGFyZ2V0X2lkXSArPSBob29rX2RlZmVuc2l2ZV9hZHZhbnRhZ2U7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmhvb2tfcG9zc2libGUpIHtcclxuICAgICAgICAgIGZvcmNlZF9tb3ZlbWVudChkYXRhLm9sZF9wb3NpdGlvbiwgZGF0YS5uZXdfcG9zaXRpb24sIGRhdGEudGFyZ2V0X2lkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0YXRg9C60LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWU7XHJcbiAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDM2OiAvLyBwdW5pc2hpbmdfc3RyaWtlXHJcbiAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLT0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtPSAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcHVuaXNoaW5nX3N0cmlrZV91c2VyX29iamVjdCA9IHt9XHJcbiAgICAgICAgcHVuaXNoaW5nX3N0cmlrZV91c2VyX29iamVjdC5jb29sZG93biA9IHB1bmlzaGluZ19zdHJpa2VfY29vbGRvd25cclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnB1bmlzaGluZ19zdHJpa2VfdXNlciA9IHB1bmlzaGluZ19zdHJpa2VfdXNlcl9vYmplY3RcclxuXHJcbiAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC10YLRgdGPINC/0L7QutCw0YDQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC10YLRgdGPINC/0L7QutCw0YDQsNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/RgNC40LzQtdC90Y/QtdGCINC60LDRgNCw0Y7RidC40Lkg0YPQtNCw0YAg0LogXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8sINC90LDQvdC+0YHRjyBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/RgNC40LzQtdC90Y/QtdGCINC60LDRgNCw0Y7RidC40Lkg0YPQtNCw0YAg0LogXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLCDQvdCw0L3QvtGB0Y8gXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KHRg9C00L3Ri9C5INC00LXQvdGMINC90LDRgdGC0YPQv9C40Lsg0LTQu9GPIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIi4gXCIgKyBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0LrQsNGA0LDQtdGCINC/0YDQvtGC0LjQstC90LjQutCwLCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQv9C+0LrQsNGA0LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdC+INGC0L7RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgcHVuaXNobWVudFwiKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBhbGVydChcIlJlY2VpdmVkIHVua25vd24gc2tpbGwgY29tbWFuZFwiKVxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ25ld19yb3VuZF9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIG1lc3NhZ2UgPSBcItCd0LDRh9Cw0LvQviDQvdC+0LLQvtCz0L4g0YDQsNGD0L3QtNCwIVwiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2ldXHJcbiAgICAgICAgaWYgKGNoYXJhY3RlciAhPT0gdW5kZWZpbmVkICYmIGNoYXJhY3RlciAhPT0gbnVsbCAmJiBjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gIT09IG51bGwgJiYgY2hhcmFjdGVyX3N0YXRlLkhQW2ldID4gMCkge1xyXG4gICAgICAgICAgbW92ZV9hbmRfYWN0aW9uc19yZXBsZW5pc2goY2hhcmFjdGVyLCBpKTtcclxuICAgICAgICAgIGFwcGx5X3RpcmVkbmVzcyhjaGFyYWN0ZXIsIGkpO1xyXG4gICAgICAgICAgY2hlY2tfZGVmYXVsdF9jb29sZG93bnMoaSk7XHJcblxyXG4gICAgICAgICAgc2FmZXR5X3NlcnZpY2VfdGFyZ2V0X3JvdW5kX2VmZmVjdChpKTtcclxuICAgICAgICAgIGJlbHZldF9idWZmX3RhcmdldF9yb3VuZF9lZmZlY3QoaSk7XHJcbiAgICAgICAgICBob29rX3RhcmdldF9yb3VuZF9lZmZlY3QoaSk7XHJcbiAgICAgICAgICBjYWxpbmdhbGF0b3JfdGFyZ2V0X3JvdW5kX2VmZmVjdChpKTtcclxuICAgICAgICAgIHBpY2hfcGljaF91c2VyX3JvdW5kX2VmZmVjdChpKTtcclxuICAgICAgICAgIHBpY2hfcGljaF90YXJnZXRfcm91bmRfZWZmZWN0KGkpO1xyXG4gICAgICAgICAgYWltX3JvdW5kX2VmZmVjdChpKTtcclxuICAgICAgICAgIGFkcmVuYWxpbmVfdGFyZ2V0X3JvdW5kX2VmZmVjdChpKTtcclxuICAgICAgICAgIHBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldF9yb3VuZF9lZmZlY3QoaSk7XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJzaG9ja2VkXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNob2NrZWQuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiY3V0X2xpbWJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY3V0X2xpbWIuZHVyYXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCh0YPRhdC+0LbQuNC70LjRjyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQvtGB0YHRgtCw0L3QvtCy0LjQu9C40YHRjC5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSAtMTBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iLmR1cmF0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYi5kdXJhdGlvbiAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiaGVhbGVkXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZC5jb29sZG93biA+IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0vMlxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGVhbGVkLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJibGluZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biA+IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJsaW5kLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gKyAyXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCX0YDQtdC90LjQtSBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQvtGB0YHRgtCw0L3QvtCy0LjQu9C+0YHRjFwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyAtIDFcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJzaGllbGRfdXBcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gTWF0aC5jZWlsKGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXS8yKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIC0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaGllbGRfdXAuc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GA0L7QtNC+0LvQttCw0LXRgiDQtNC10YDQttCw0YLRjCDRidC40YIgKNGB0L/QsNGB0LjQsdC+KVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYmlnX2Jyb1wiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm8uYm9udXNfS0RcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGC0LXRgNGP0LXRgiDQt9Cw0YnQuNGC0YMg0JHQvtC70YzRiNC+0LPQviDQkdGA0LDRgtCwXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJ0b2JhY2NvX3N0cmlrZVwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50b2JhY2NvX3N0cmlrZS5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udG9iYWNjb19zdHJpa2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50b2JhY2NvX3N0cmlrZS5jb29sZG93biA9PSB0b2JhY2NvX3N0cmlrZV9jb29sZG93bikge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gLSB0b2JhY2NvX3N0cmlrZV9ib251c1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRvYmFjY29fc3RyaWtlLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50b2JhY2NvX3N0cmlrZS5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYWNpZF9ib21iX3BvaXNvblwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gKyBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uYm9udXNfS0RcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfcG9pc29uXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCR0YDQvtC90Y8gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINC90LDQutC+0L3QtdGGINCy0L7RgdGB0YLQsNC90L7QstC40LvQsNGB0YxcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uZHVyYXRpb24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uZHVyYXRpb24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImdhc19ib21iX3BvaXNvblwiKSkge1xyXG4gICAgICAgICAgICB2YXIgc2F2ZV9yb2xsID0gZGF0YS5zYXZlX3JvbGxfbGlzdFtpXVxyXG4gICAgICAgICAgICBpZiAoc2F2ZV9yb2xsID49IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCAtIDFcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LrQuNC00LDQtdGCINGB0L/QsNGB0LHRgNC+0YHQvtC6INC4INGD0LzQtdC90YzRiNCw0LXRgiDRgdGC0LDQtNC40Y4g0L7RgtGA0LDQstC70LXQvdC40Y8gKNGC0LXQv9C10YDRjCBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GA0L7QstCw0LvQuNCy0LDQtdGCINGB0L/QsNGB0LHRgNC+0YHQvtC6LiDQodGC0LDQtNC40Y8g0L7RgtGA0LDQstC70LXQvdC40Y8g0L7RgdGC0LDQtdGC0YHRjyDQv9GA0LXQttC90LXQuSAoXCIgKyBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsXHJcbiAgICAgICAgICAgIHdoaWxlIChjb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAvL2NoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSAtIGdhc19ib21iX21vdmVfcmVkdWN0aW9uXHJcbiAgICAgICAgICAgICAgaWYgKGNvdW50ICUgMiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldIC0gMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb3VudCA9IGNvdW50IC0gMVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsIDw9IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb25cclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LHQvtC70YzRiNC1INC90LUg0L7RgtGA0LDQstC70LXQvSFcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwibWVsZWVkXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLm1lbGVlZC5jb29sZG93biA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubWVsZWVkXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtpXSArIDFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLm1lbGVlZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubWVsZWVkLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gJ3NuaXBlcicpIHtcclxuICAgICAgICAgICAgdmFyIGVmZmVjdHNfb2JqZWN0ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXVxyXG4gICAgICAgICAgICBpZiAoZWZmZWN0c19vYmplY3QuaGFzT3duUHJvcGVydHkoXCJzbmlwZXJfcGFzc2l2ZVwiKSkge1xyXG4gICAgICAgICAgICAgIHZhciBjdXJyZW50X2F0dGFja19ib251cyA9IGVmZmVjdHNfb2JqZWN0LnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251c1xyXG4gICAgICAgICAgICAgIHZhciBjdXJyZW50X2RhbWFnZV9ib251cyA9IGVmZmVjdHNfb2JqZWN0LnNuaXBlcl9wYXNzaXZlLmRhbWFnZV9ib251c1xyXG4gICAgICAgICAgICAgIGlmIChjdXJyZW50X2F0dGFja19ib251cyA9PSAtNSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19hdHRhY2tfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2RhbWFnZV9ib251cyA9IDBcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19hdHRhY2tfYm9udXMgPSBNYXRoLm1pbihjdXJyZW50X2F0dGFja19ib251cyArIDEsIDQpXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2RhbWFnZV9ib251cyA9IE1hdGgubWluKGN1cnJlbnRfZGFtYWdlX2JvbnVzICsgMiwgOClcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gLSBjdXJyZW50X2F0dGFja19ib251cyArIG5ld19hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tpXSAtIGN1cnJlbnRfZGFtYWdlX2JvbnVzICsgbmV3X2RhbWFnZV9ib251c1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc25pcGVyX3Bhc3NpdmUuYXR0YWNrX2JvbnVzID0gbmV3X2F0dGFja19ib251c1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc25pcGVyX3Bhc3NpdmUuZGFtYWdlX2JvbnVzID0gbmV3X2RhbWFnZV9ib251c1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBzbmlwZXJfcGFzc2l2ZV9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5hdHRhY2tfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmRhbWFnZV9ib251cyA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNuaXBlcl9wYXNzaXZlID0gc25pcGVyX3Bhc3NpdmVfb2JqZWN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFwcGx5X3RlcnJhaW5fZWZmZWN0cyhkYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdiYXR0bGVfbW9kX3Jlc3BvbnNlJykge1xyXG4gICAgICBnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPSBkYXRhLnZhbHVlXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMCkge1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gXCLQkdC+0Lkg0L7QutC+0L3Rh9C10L0hINCd0LDRgdGC0YPQv9C40Lsg0LzQuNGAINCy0L4g0LLRgdC10Lwg0LzQuNGA0LVcIlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gXCLQndCw0YfQsNC70L4g0LHQvtGPISDQm9GO0LTQuCDRg9C80LjRgNCw0Y7Rgiwg0LXRgdC70Lgg0LjRhSDRg9Cx0LjRgtGMXCJcclxuICAgICAgfVxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAncmVzb2x2ZV9hdHRhY2tfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmF0dGFja190eXBlID09IFwicmFuZ2VkXCIpIHtcclxuICAgICAgICB2YXIgYXVkaW8gPSBndW5zaG90X2F1ZGlvXHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5hdHRhY2tfdHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgICAgICB2YXIgYXVkaW8gPSBzd29yZF9hdWRpb1xyXG4gICAgICB9IGVsc2Ugey8vIGRlZmF1bHQgaW5jbHVkaW5nIGVuZXJneSBhbmQgdGhyb3dpbmdcclxuICAgICAgICB2YXIgYXVkaW8gPSBzdXJpa2VuX2F1ZGlvXHJcbiAgICAgIH1cclxuICAgICAgYXVkaW8ucGxheSgpO1xyXG5cclxuICAgICAgaWYgKGRhdGEudXNlcl9pbnZpc2liaWxpdHlfZW5kZWQgPT0gMSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5hdHRhY2tlcl9pZF0gPSBcImFsbFwiXHJcbiAgICAgICAgdmFyIGF0dGFja2VyX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgZGF0YS5hdHRhY2tlcl9wb3NpdGlvbik7XHJcbiAgICAgICAgYXR0YWNrZXJfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmF0dGFja2VyX2lkXS5hdmF0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuYXR0YWNrZXJfaWRdXHJcbiAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtkYXRhLmF0dGFja2VyX2lkXSA9IDFcclxuXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuYXR0YWNrZXJfaWRdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5hdHRhY2tlcl9pZF0gLSBzdGFtaW5hX2F0dGFja19jb3N0XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEuYXR0YWNrZXJfaWRdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEuYXR0YWNrZXJfaWRdIC0gMVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShcImFpbV9vdmVyXCIpKSB7XHJcbiAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5hdHRhY2tlcl9pZF0uYWltXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwicXVpY2tfYXR0YWNrX3JlYWR5XCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmF0dGFja2VyX2lkXS5xdWlja19hdHRhY2tfcmVhZHkgPSB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShcIm1vdmVfcmVkdWN0aW9uXCIpKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gLSBkYXRhLm1vdmVfcmVkdWN0aW9uO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5jb3Zlcl9sZXZlbCA+IDApIHtcclxuICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCLQo9GA0L7QstC10L3RjCDRg9C60YDRi9GC0LjRjzogXCIgKyBkYXRhLmNvdmVyX2xldmVsXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwiXCJcclxuICAgICAgfVxyXG4gICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgIGNhc2UgXCJLRF9ibG9ja1wiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC90L4g0L3QtSDQv9GA0L7QsdC40LLQsNC10YIg0LHRgNC+0L3Rji4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlICE9ICdyb2d1ZScpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INCx0L7Qu9GM0YjQtSDQvdC1INC80L7QttC10YIg0YPQstC+0YDQsNGH0LjQstCw0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIG1lbGVlX3BlbmFsdHkoZGF0YSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8uINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY292ZXJcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINCw0YLQsNC60L7QstCw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QviDRgtC+0YIg0L3QsNGF0L7QtNC40YLRgdGPINCyINC/0L7Qu9C90L7QvCDRg9C60YDRi9GC0LjQuC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYXR0YWNrX29ic3RhY2xlX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5hdHRhY2tfdHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gZ3Vuc2hvdF9hdWRpb1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGEuYXR0YWNrX3R5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gc3dvcmRfYXVkaW9cclxuICAgICAgfSBlbHNlIHsvLyBkZWZhdWx0IGluY2x1ZGluZyBlbmVyZ3kgYW5kIHRocm93aW5nXHJcbiAgICAgICAgdmFyIGF1ZGlvID0gc3VyaWtlbl9hdWRpb1xyXG4gICAgICB9XHJcbiAgICAgIGF1ZGlvLnBsYXkoKTtcclxuXHJcbiAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuYXR0YWNrZXJfaWRdXHJcbiAgICAgIHZhciB0YXJnZXQgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG5cclxuICAgICAgaWYgKGRhdGEudXNlcl9pbnZpc2liaWxpdHlfZW5kZWQgPT0gMSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5hdHRhY2tlcl9pZF0gPSBcImFsbFwiXHJcbiAgICAgICAgdmFyIGF0dGFja2VyX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgZGF0YS5hdHRhY2tlcl9wb3NpdGlvbik7XHJcbiAgICAgICAgYXR0YWNrZXJfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmF0dGFja2VyX2lkXS5hdmF0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbZGF0YS5hdHRhY2tlcl9pZF0gPSAxXHJcblxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmF0dGFja2VyX2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuYXR0YWNrZXJfaWRdIC0gc3RhbWluYV9hdHRhY2tfY29zdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmF0dGFja2VyX2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmF0dGFja2VyX2lkXSAtIDFcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJhaW1fb3ZlclwiKSkge1xyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuYXR0YWNrZXJfaWRdLmFpbVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShcInF1aWNrX2F0dGFja19yZWFkeVwiKSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5hdHRhY2tlcl9pZF0ucXVpY2tfYXR0YWNrX3JlYWR5ID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEuY292ZXJfbGV2ZWwgPiAwKSB7XHJcbiAgICAgICAgdmFyIGNvdmVyX3N0cmluZyA9IFwi0KPRgNC+0LLQtdC90Ywg0YPQutGA0YvRgtC40Y86IFwiICsgZGF0YS5jb3Zlcl9sZXZlbFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcIlwiXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY292ZXJcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LvRgdGPINGA0LDQt9GA0YPRiNC40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIg0L3QviDQsNGC0LDQutCwINC90LUg0L/RgNC+0YjQu9CwINGH0LXRgNC10Lcg0L/QvtC70L3QvtC1INGD0LrRgNGL0YLQuNC1LlwiICsgY292ZXJfc3RyaW5nO1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInVudG91Y2hlZFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0YDQsNC30YDRg9GI0LjRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdC+INCw0YLQsNC60LUg0L3QtSDRhdCy0LDRgtC40LvQviDRg9GA0L7QvdCwIChcIiArIGRhdGEuZGFtYWdlICsgXCIg0L3QsNC90LXRgdC10L3QvikuIFwiICsgY292ZXJfc3RyaW5nO1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRlc3Ryb3llZFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YDQsNC30YDRg9GI0LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdCw0L3QvtGB0Y8gXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAuIFwiICsgY292ZXJfc3RyaW5nO1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLnRhcmdldF9wb3NpdGlvbl0gPSAwO1xyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5vYnN0YWNsZV9leHRyYV9pbmZvW2RhdGEudGFyZ2V0X3Bvc2l0aW9uXSA9IG51bGw7XHJcbiAgICAgICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtkYXRhLnRhcmdldF9wb3NpdGlvbl0gPT0gMSkpKSB7XHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEudGFyZ2V0X3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdhcHBseV9lZmZlY3RfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGFwcGx5X2VmZmVjdChkYXRhLmNoYXJhY3Rlcl9udW1iZXIsIGRhdGEuZWZmZWN0X251bWJlcik7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2VhcmNoX2FjdGlvbl9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgIHB1c2hUb0xpc3QoZGF0YS5jaGFyYWN0ZXJfbmFtZSArICcg0LHRgNC+0YHQuNC7ICcgKyBkYXRhLnJvbGwgKyAnINC90LAg0LLQvdC40LzQsNGC0LXQu9GM0L3QvtGB0YLRjCDQsiDQt9C+0L3QtSAnICsgZGF0YS56b25lX251bWJlcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIDFcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEubWluZXNfZGV0ZWN0ZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5jaGFyYWN0ZXJfbmFtZSArIFwiINC+0LHQvdCw0YDRg9C20LjQstCw0LXRgiBcIiArIGRhdGEubWluZXNfZGV0ZWN0ZWQubGVuZ3RoICsgXCIg0LzQuNC9INGA0Y/QtNC+0Lwg0YEg0YHQvtCx0L7QuVwiXHJcbiAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5taW5lc19kZXRlY3RlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIG1pbmUgPSBkYXRhLm1pbmVzX2RldGVjdGVkW2ldXHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW21pbmVdLnB1c2goZGF0YS5wbGF5ZXJfbmFtZSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxudmFyIHNob3dfYm9hcmRfY3JlYXRpb25fZ3JvdXBfYnV0dG9uID0gJChTSE9XX0JPQVJEX0NSRUFUSU9OX0dST1VQX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnNob3dfYm9hcmRfY3JlYXRpb25fZ3JvdXBfYnV0dG9uLm9uKCdjbGljaycsIHNob3dCb2FyZENyZWF0aW9uR3JvdXApO1xyXG5cclxudmFyIHNob3dfYm9hcmRfZWRpdF9ncm91cF9idXR0b24gPSAkKFNIT1dfQk9BUkRfRURJVF9HUk9VUF9CVVRUT05fU0VMRUNUT1IpO1xyXG5zaG93X2JvYXJkX2VkaXRfZ3JvdXBfYnV0dG9uLm9uKCdjbGljaycsIHNob3dCb2FyZEVkaXRHcm91cCk7XHJcblxyXG52YXIgc2hvd19iYXR0bGVfY29udHJvbF9ncm91cF9idXR0b24gPSAkKFNIT1dfQkFUVExFX0NPTlRST0xfR1JPVVBfQlVUVE9OX1NFTEVDVE9SKTtcclxuc2hvd19iYXR0bGVfY29udHJvbF9ncm91cF9idXR0b24ub24oJ2NsaWNrJywgc2hvd0JhdHRsZUNvbnRyb2xHcm91cCk7XHJcblxyXG52YXIgY3JlYXRlX2JvYXJkX2J1dHRvbiA9ICQoQ1JFQVRFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmNyZWF0ZV9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgY3JlYXRlQm9hcmQpO1xyXG5cclxudmFyIHNhdmVfYm9hcmRfYnV0dG9uID0gJChTQVZFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnNhdmVfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIHNhdmVCb2FyZCk7XHJcblxyXG52YXIgbG9hZF9ib2FyZF9idXR0b24gPSAkKExPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxubG9hZF9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgbG9hZEJvYXJkKTtcclxuXHJcbnZhciBkb3dubG9hZF9ib2FyZF9idXR0b24gPSAkKERPV05MT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmRvd25sb2FkX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBkb3dubG9hZEJvYXJkKTtcclxuXHJcbnZhciByb2xsX2luaXRpYXRpdmVfYnV0dG9uID0gJChST0xMX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SKTtcclxucm9sbF9pbml0aWF0aXZlX2J1dHRvbi5vbignY2xpY2snLCByb2xsSW5pdGlhdGl2ZSk7XHJcblxyXG52YXIgcmVzZXRfaW5pdGlhdGl2ZV9idXR0b24gPSAkKFJFU0VUX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SKTtcclxucmVzZXRfaW5pdGlhdGl2ZV9idXR0b24ub24oJ2NsaWNrJywgcmVzZXRJbml0aWF0aXZlKTtcclxuXHJcbnZhciBmb2dfYnV0dG9uID0gJChGT0dfQlVUVE9OX1NFTEVDVE9SKTtcclxuZm9nX2J1dHRvbi5vbignY2xpY2snLCBmb2dNb2RlQ2hhbmdlKTtcclxuXHJcbnZhciB6b25lX2J1dHRvbiA9ICQoWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG56b25lX2J1dHRvbi5vbignY2xpY2snLCB6b25lTW9kZUNoYW5nZSk7XHJcblxyXG52YXIgY2hhdF9idXR0b24gPSAkKENIQVRfQlVUVE9OX1NFTEVDVE9SKTtcclxuY2hhdF9idXR0b24ub24oJ2NsaWNrJywgY2hhbmdlQ2hhdFZpc2liaWxpdHkpO1xyXG5cclxudmFyIG1pcnJvcl9idXR0b24gPSAkKE1JUlJPUl9CVVRUT05fU0VMRUNUT1IpO1xyXG5taXJyb3JfYnV0dG9uLm9uKCdjbGljaycsIG1pcnJvcl9ib2FyZCk7XHJcblxyXG52YXIgbmV4dF9yb3VuZF9idXR0b24gPSAkKE5FWFRfUk9VTkRfQlVUVE9OX1NFTEVDVE9SKTtcclxubmV4dF9yb3VuZF9idXR0b24ub24oJ2NsaWNrJywgc3RhcnRfbmV3X3JvdW5kKTtcclxuXHJcbnZhciBiYXR0bGVfbW9kX2J1dHRvbiA9ICQoQkFUVExFX01PRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5iYXR0bGVfbW9kX2J1dHRvbi5vbignY2xpY2snLCBjaGFuZ2VfYmF0dGxlX21vZCk7XHJcblxyXG52YXIgc3luY19idXR0b24gPSAkKFNZTkNfQlVUVE9OX1NFTEVDVE9SKTtcclxuc3luY19idXR0b24ub24oJ2NsaWNrJywgc3luY19ib2FyZCk7XHJcblxyXG52YXIgbGFuZG1pbmVfYnV0dG9uID0gJChMQU5ETUlORV9CVVRUT05fU0VMRUNUT1IpO1xyXG5sYW5kbWluZV9idXR0b24ub24oJ2NsaWNrJywgc2hvd19sYW5kbWluZXMpO1xyXG5cclxudmFyIGZvZ196b25lX2J1dHRvbiA9ICQoRk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxuZm9nX3pvbmVfYnV0dG9uLm9uKCdjbGljaycsIGZvZ0N1cnJlbnRab25lKTtcclxuXHJcbnZhciB1bmZvZ196b25lX2J1dHRvbiA9ICQoVU5GT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG51bmZvZ196b25lX2J1dHRvbi5vbignY2xpY2snLCB1bmZvZ0N1cnJlbnRab25lKTtcclxuXHJcbnZhciB6b25lX251bWJlcl9zZWxlY3QgPSAkKFpPTkVfTlVNQkVSX1NFTEVDVE9SKTtcclxuZm9yIChsZXQgaSA9IDE7IGkgPCBNQVhfWk9ORVM7IGkrKykge1xyXG4gIHZhciBjdXJyZW50X29wdGlvbiA9ICQoXCI8b3B0aW9uPlwiKTtcclxuICBjdXJyZW50X29wdGlvbi50ZXh0KCfQl9C+0L3QsCAnICsgaSk7XHJcbiAgY3VycmVudF9vcHRpb24udmFsKGkpO1xyXG4gIHpvbmVfbnVtYmVyX3NlbGVjdC5hcHBlbmQoY3VycmVudF9vcHRpb24pO1xyXG59XHJcblxyXG52YXIgc2F2ZXNfc2VsZWN0ID0gJChTQVZFU19TRUxFQ1RfU0VMRUNUT1IpO1xyXG5cclxudmFyIHNlYXJjaF9tb2RpZmljYXRvciA9ICQoU0VBUkNIX01PRElGSUNBVE9SX1NFTEVDVE9SKTtcclxuXHJcbnZhciBub3RpZmljYXRpb25zX2xpc3QgPSAkKE5PVElGSUNBVElPTlNfTElTVF9TRUxFQ1RPUik7XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgQ0hBVF9DQVNIOyBpKyspIHtcclxuICB2YXIgY3VycmVudF9lbGVtZW50ID0gJChcIjxsaT5cIik7XHJcbiAgY3VycmVudF9lbGVtZW50LmF0dHIoJ2RhdGEtbmFtZScsICdub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgaSk7XHJcbiAgY3VycmVudF9lbGVtZW50LmF0dHIoJ2NsYXNzJywgJ25vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50Jyk7XHJcbiAgbm90aWZpY2F0aW9uc19saXN0LmFwcGVuZChjdXJyZW50X2VsZW1lbnQpO1xyXG59XHJcblxyXG52YXIgYm9hcmRfc2l6ZV9pbnB1dCA9ICQoQk9BUkRfU0laRV9JTlBVVF9TRUxFQ1RPUik7XHJcblxyXG52YXIgc2F2ZV9uYW1lX2lucHV0ID0gJChTQVZFX05BTUVfSU5QVVRfU0VMRUNUT1IpO1xyXG5cclxudmFyIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyID0gJChOT1RJRklDQVRJT05TX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIgPSAkKENIQVJBQ1RFUl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciB3ZWFwb25faW5mb19jb250YWluZXIgPSAkKFdFQVBPTl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxud2VhcG9uX2luZm9fY29udGFpbmVyLmhpZGUoKTtcclxuXHJcbnZhciBpbml0aWF0aXZlX29yZGVyX2NvbnRhaW5lciA9ICQoSU5JVElBVElWRV9PUkRFUl9DT05UQU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgaW5pdGlhdGl2ZV9kcm9wYm94X2NvbnRhaW5lciA9ICQoSU5JVElBVElWRV9EUk9QQk9YX0NPTlRBSU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgc2tpbGxfbW9kYWwgPSAkKFNLSUxMX01PREFMX1NFTEVDVE9SKTtcclxuXHJcbnZhciBza2lsbF9kZXNjcmlwdGlvbl9jb250YWluZXIgPSAkKFNLSUxMX0RFU0NSSVBUSU9OX0NPTlRBSU5FUl9TRUxFQ1RPUik7XHJcblxyXG52YXIgc2tpbGxfbW9kYWxfY29udGVudCA9ICQoU0tJTExfTU9EQUxfQ09OVEVOVF9TRUxFQ1RPUik7XHJcblxyXG52YXIgbmV4dF9wYWdlX2J1dHRvbl9jb250YWluZXIgPSAkKE5FWFRfUEFHRV9CVVRUT05fQ09OVEFJTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciBzcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbC1tb2RhbC1jbG9zZVwiKTtcclxuXHJcbnNwYW4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGhpZGVfbW9kYWwoKTtcclxufVxyXG5cclxuc3Bhbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxud2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gIGlmIChldmVudC50YXJnZXQuaWQgPT0gc2tpbGxfbW9kYWwuYXR0cignaWQnKSkge1xyXG4gICAgaGlkZV9tb2RhbCgpO1xyXG4gIH1cclxufVxyXG5cclxuZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlO1xyXG4gICAgLy8gd1xyXG4gICAgaWYoa2V5Q29kZSA9PSA4Nykge1xyXG4gICAgICAgIHdfb25jbGljaygpXHJcbiAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT0gNjUpIHsgLy8gYVxyXG4gICAgICBhX29uY2xpY2soKVxyXG4gICAgfVxyXG59O1xyXG5cclxuc2V0SW50ZXJ2YWwocmVjb25uZWN0LCAxNSoxMDAwKVxyXG4iLCJsZXQgc29ja2V0O1xyXG5sZXQgc2VydmVyX2FkZHJlc3M7XHJcbmxldCBvbk1lc3NhZ2VGdW5jdGlvbjtcclxuXHJcbmZ1bmN0aW9uIGluaXQodXJsKSB7XHJcbiAgc2VydmVyX2FkZHJlc3MgPSB1cmw7XHJcbiAgc29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xyXG4gIGNvbnNvbGUubG9nKCdjb25uZWN0aW5nLi4nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNSZWFkeSgpIHtcclxuICByZXR1cm4gc29ja2V0LnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyT3BlbkhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XHJcbiAgc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdvcGVuJyk7XHJcbiAgICBoYW5kbGVyRnVuY3Rpb24oKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIG9uTWVzc2FnZUZ1bmN0aW9uID0gaGFuZGxlckZ1bmN0aW9uO1xyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICBoYW5kbGVyRnVuY3Rpb24oZGF0YSk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlckRlZmF1bHQoKSB7XHJcbiAgc29ja2V0Lm9ubWVzc2FnZSA9IChlKSA9PiB7XHJcbiAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuICAgIG9uTWVzc2FnZUZ1bmN0aW9uKGRhdGEpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKHBheWxvYWQpIHtcclxuICBpZiAoc29ja2V0LnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOKSB7XHJcbiAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGluaXQoc2VydmVyX2FkZHJlc3MpO1xyXG4gICAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihvbk1lc3NhZ2VGdW5jdGlvbik7XHJcbiAgICBpZiAoc29ja2V0LnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOKSB7XHJcbiAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdOb3Qgc2VuZCwgYnV0IHJlY29ubmVjdGVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgaW5pdCxcclxuICByZWdpc3Rlck9wZW5IYW5kbGVyLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIsXHJcbiAgc2VuZE1lc3NhZ2UsXHJcbiAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlckRlZmF1bHQsXHJcbiAgaXNSZWFkeVxyXG59XHJcbiJdfQ==
