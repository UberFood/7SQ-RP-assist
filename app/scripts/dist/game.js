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
var explosion_audio = new Audio('sounds/explosion.mp3');

gunshot_audio.volume = 0.2;
sword_audio.volume = 0.2;
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
    picture_name = get_object_picture(char_id);
    if (char_id > 0 && character_state.invisibility[char_id] != "all" && character_state.invisibility[char_id] != my_name) {
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
      alert("В бою нужно двигаться поступательно (1-2 клетки)");
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
          select_character(position, cell);
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
        if (character !== undefined && character !== null) {
          character_state.can_evade[_i18] = 1;
          character_state.has_moved[_i18] = 0;
          character_state.move_action[_i18] = parseFloat(move_action_map[character.agility]);
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
                character_state.move_action[_i18] = parseFloat(Math.ceil(character_state.move_action[_i18] * 0.25));
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
                character_state.move_action[_i18] = parseFloat(Math.ceil(character_state.move_action[_i18] * 0.5));
              }
            } else {
              // 1я стадия
              var tired_object = {};
              tired_object.bonus = -1;
              tired_object.stage = 1;
              character_state.special_effects[_i18].tired = tired_object;
              character_state.universal_bonus[_i18] = character_state.universal_bonus[_i18] - 1;
              character_state.move_action[_i18] = parseFloat(Math.ceil(character_state.move_action[_i18] * 0.75));
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
            character_state.move_action[_i18] = -10;
            character_state.special_effects[_i18].cut_limb.cooldown = character_state.special_effects[_i18].cut_limb.cooldown - 1;
            if (character_state.special_effects[_i18].cut_limb.cooldown == 0) {
              delete character_state.special_effects[_i18].cut_limb;
              var message = "Сухожилия " + character.name + " восстановятся на следующем ходу.";
              pushToList(message);
            }
          }

          if (character_state.special_effects[_i18].hasOwnProperty("healed")) {
            if (character_state.special_effects[_i18].healed.cooldown > 0) {
              character_state.move_action[_i18] = 0;
              character_state.main_action[_i18] = 0;
              character_state.bonus_action[_i18] = 0;
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
              character_state.move_action[_i18] = character_state.move_action[_i18] - gas_bomb_move_reduction;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksbUNBQW1DLHdDQUF2QztBQUNBLElBQUksZ0NBQWdDLHFDQUFwQztBQUNBLElBQUksa0NBQWtDLHVDQUF0QztBQUNBLElBQUkscUNBQXFDLGtEQUF6Qzs7QUFFQSxJQUFJLCtCQUErQixtQ0FBbkM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLGtDQUFrQyxzQ0FBdEM7QUFDQSxJQUFJLHNCQUFzQiwwQkFBMUI7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLHlCQUF5Qiw2QkFBN0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7QUFDQSxJQUFJLHVCQUF1QiwyQkFBM0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDJCQUEyQiwrQkFBL0I7QUFDQSxJQUFJLDZCQUE2QixpQ0FBakM7O0FBRUEsSUFBSSx1QkFBdUIsa0NBQTNCO0FBQ0EsSUFBSSw4QkFBOEIsa0NBQWxDOztBQUVBLElBQUksNEJBQTRCLGdDQUFoQztBQUNBLElBQUksMkJBQTJCLCtCQUEvQjs7QUFFQSxJQUFJLDhCQUE4QixrQ0FBbEM7O0FBRUEsSUFBSSxpQkFBaUIsU0FBUyxNQUFULENBQWdCLE9BQWhCLENBQXdCLE9BQXhCLEVBQWlDLElBQWpDLENBQXJCOztBQUVBLElBQUksMkJBQTJCLEVBQUMsSUFBSSxFQUFMLEVBQVMsYUFBYSxFQUF0QixFQUEwQixjQUFjLEVBQXhDLEVBQTRDLGFBQWEsRUFBekQsRUFB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cmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBzb2NrZXQgZnJvbSAnLi93cy1jbGllbnQnO1xyXG5cclxudmFyICQgPSB3aW5kb3cualF1ZXJ5O1xyXG5cclxudmFyIENIQVJBQ1RFUl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIl0nO1xyXG52YXIgV0VBUE9OX0lORk9fQ09OVEFORVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIndlYXBvbi1pbmZvLWNvbnRhaW5lclwiXSc7XHJcbnZhciBOT1RJRklDQVRJT05TX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zLWNvbnRhaW5lclwiXSc7XHJcbnZhciBJTklUSUFUSVZFX09SREVSX0NPTlRBTkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJpbml0aWF0aXZlLW9yZGVyLWRpc3BsYXktY29udGFpbmVyXCJdJztcclxuXHJcbnZhciBDUkVBVEVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjcmVhdGVfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIFNBVkVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibG9hZF9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgUk9MTF9JTklUSUFUSVZFX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwicm9sbF9pbml0aWF0aXZlX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJmb2dfYnV0dG9uXCJdJztcclxudmFyIFpPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX2J1dHRvblwiXSc7XHJcbnZhciBDSEFUX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY2hhdF9idXR0b25cIl0nO1xyXG52YXIgTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibWlycm9yX2J1dHRvblwiXSc7XHJcbnZhciBORVhUX1JPVU5EX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibmV4dF9yb3VuZF9idXR0b25cIl0nO1xyXG52YXIgQkFUVExFX01PRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJhdHRsZV9tb2RfYnV0dG9uXCJdJztcclxudmFyIFNZTkNfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzeW5jX2J1dHRvblwiXSc7XHJcbnZhciBMQU5ETUlORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImxhbmRtaW5lX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImZvZ196b25lX2J1dHRvblwiXSc7XHJcbnZhciBVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwidW5mb2dfem9uZV9idXR0b25cIl0nO1xyXG5cclxudmFyIFpPTkVfTlVNQkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX251bWJlcl9zZWxlY3RcIl0nO1xyXG52YXIgU0VBUkNIX01PRElGSUNBVE9SX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzZWFyY2hfbW9kaWZpY2F0b3JcIl0nO1xyXG5cclxudmFyIEJPQVJEX1NJWkVfSU5QVVRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJvYXJkX3NpemVfaW5wdXRcIl0nO1xyXG52YXIgU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX25hbWVfaW5wdXRcIl0nO1xyXG5cclxudmFyIE5PVElGSUNBVElPTlNfTElTVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0XCJdJztcclxuXHJcbnZhciBTRVJWRVJfQUREUkVTUyA9IGxvY2F0aW9uLm9yaWdpbi5yZXBsYWNlKC9eaHR0cC8sICd3cycpO1xyXG5cclxudmFyIENIQVJBQ1RFUl9TVEFURV9DT05TVEFOVCA9IHtIUDogW10sIG1haW5fYWN0aW9uOiBbXSwgYm9udXNfYWN0aW9uOiBbXSwgbW92ZV9hY3Rpb246IFtdLCBzdGFtaW5hOiBbXSwgaW5pdGlhdGl2ZTogW10sIGNhbl9ldmFkZTogW10sIGhhc19tb3ZlZDogW10sIEtEX3BvaW50czogW10sIGN1cnJlbnRfd2VhcG9uOiBbXSwgdmlzaWJpbGl0eTogW10sIGludmlzaWJpbGl0eTogW10sIGF0dGFja19ib251czogW10sIGRhbWFnZV9ib251czogW10sIHVuaXZlcnNhbF9ib251czogW10sIGJvbnVzX0tEOiBbXSwgc3BlY2lhbF9lZmZlY3RzOiBbXSwgcmFuZ2VkX2FkdmFudGFnZTogW10sIG1lbGVlX2FkdmFudGFnZTogW10sIGRlZmVuc2l2ZV9hZHZhbnRhZ2U6IFtdLCBwb3NpdGlvbjogW119O1xyXG5cclxudmFyIG15X25hbWUgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJuYW1lJykpO1xyXG52YXIgbXlfcm9sZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcl9yb2xlJykpO1xyXG52YXIgbXlfcm9vbSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncm9vbV9udW1iZXInKSk7XHJcblxyXG52YXIgY2hhcmFjdGVyX2xpc3QgPSBbXTtcclxudmFyIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvID0gW107XHJcbnZhciBvYnN0YWNsZV9saXN0ID0gW107XHJcbnZhciBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gW107XHJcbnZhciB3ZWFwb25fbGlzdCA9IFtdO1xyXG52YXIgd2VhcG9uX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIHNraWxsX2xpc3QgPSBbXTtcclxuXHJcbnZhciBUSU5ZX0VGRkVDVF9DTEFTUyA9ICdpcy10aW55JztcclxuXHJcbnZhciBFTVBUWV9DRUxMX1BJQyA9IFwiLi9pbWFnZXMvc3F1YXJlLmpwZ1wiO1xyXG52YXIgWk9ORV9FTkRQT0lOVF9QSUMgPSBcIi4vaW1hZ2VzL3JlZF9jcm9zcy5qcGdcIlxyXG52YXIgRk9HX0lNQUdFID0gXCIuL2ltYWdlcy9mb2cud2VicFwiO1xyXG52YXIgUVVFU1RJT05fSU1BR0UgPSBcIi4vaW1hZ2VzL3F1ZXN0aW9uLmpwZ1wiO1xyXG5cclxudmFyIE1BWF9aT05FUyA9IDI1O1xyXG52YXIgQ0hBVF9DQVNIID0gMTU7XHJcblxyXG52YXIgc3RhbWluYV93ZWFrc3BvdF9jb3N0ID0gMVxyXG52YXIgc3RhbWluYV9tb3ZlX2Nvc3QgPSAwXHJcbnZhciBzdGFtaW5hX2F0dGFja19jb3N0ID0gMVxyXG52YXIgcHVuY2hfcmFpbmZhbGxfc3RhbWluYV9jb3N0ID0gMiAvLyBwZXIgcHVuY2hcclxudmFyIHN0YW1pbmFfY3V0X2xpbWJfY29zdCA9IDRcclxudmFyIHNoaWVsZF91cF9zdGFtaW5hX2Nvc3QgPSAyIC8vIHBlciBtb3ZlIEkgdGhpbmtcclxudmFyIGxvdHRlcnlfc2hvdF9zdGFtaW5hX2Nvc3QgPSAxXHJcbnZhciBsdWNreV9zaG90X3N0YW1pbmFfY29zdCA9IDFcclxudmFyIGFjdGlvbl9zcGxhc2hfc3RhbWluYV9jb3N0ID0gMlxyXG52YXIgYWRyZW5hbGluZV9zdGFtaW5hX2Nvc3QgPSAzXHJcbnZhciBhY2lkX2JvbWJfc3RhbWluYV9jb3N0ID0gM1xyXG5cclxudmFyIHJlc3Rfc3RhbWluYV9nYWluID0gNVxyXG5cclxudmFyIGNvb2xkb3duX2N1dF9saW1iID0gMSAvLyBkdXJhdGlvblxyXG52YXIgY29vbGRvd25fYmlnX2JybyA9IDEgLy8gZHVyYXRpb25cclxuXHJcbnZhciBzaGllbGRfdXBfS0QgPSAzXHJcblxyXG52YXIgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlID0gNFxyXG52YXIgY2hhcmdlX21vdmVfaW5jcmVhc2UgPSA0XHJcblxyXG52YXIgZ2FzX2JvbWJfdGhyZXNob2xkID0gMTFcclxudmFyIGdhc19ib21iX21vdmVfcmVkdWN0aW9uID0gMlxyXG52YXIgZ2FzX2JvbWJfc3RhbWluYV9jb3N0ID0gM1xyXG52YXIgZ2FzX2JvbWJfb2JzdGFjbGUgPSAxNVxyXG52YXIgZ2FzX2JvbWJfc2tpbGxfY29vbGRvd24gPSA1XHJcblxyXG52YXIgbGlnaHRfc291bmRfYm9tYl9yYWRpdXMgPSA0XHJcbnZhciBsaWdodF9zb3VuZF9ib21iX3RocmVzaG9sZCA9IDE1XHJcbnZhciBsaWdodF9zb3VuZF9ib21iX3NraWxsX2Nvb2xkb3duID0gNVxyXG5cclxudmFyIHdlYWtfc3BvdF90aHJlc2hvbGQgPSAxNVxyXG5cclxudmFyIHNob2NrZWRfY29vbGRvd24gPSAwXHJcblxyXG52YXIgcGljaF9waWNoX2Nvb2xkb3duID0gNFxyXG52YXIgcGljaF9waWNoX21vdmVfaW5jcmVhc2UgPSA0XHJcblxyXG52YXIgZm9yY2VfZmllbGRfcmFkaXVzID0gMS42XHJcbnZhciBmb3JjZV9maWVsZF9zdGFtaW5hX2Nvc3QgPSA1XHJcbnZhciBmb3JjZV9maWVsZF9jb29sZG93biA9IDEwXHJcbnZhciBmb3JjZV9maWVsZF9vYnN0YWNsZSA9IDI0XHJcblxyXG52YXIgYWN0aW9uX3NwbGFzaF9jb29sZG93biA9IDRcclxuXHJcbnZhciBpbnZpc2liaWxpdHlfZGV0ZWN0aW9uX3JhZGl1cyA9IDM7XHJcblxyXG52YXIgYmlnX2Jyb19yYW5nZSA9IDJcclxudmFyIGhlYWxfcmFuZ2UgPSAxXHJcbnZhciB0aHJvd19iYXNlX3JhbmdlID0gMlxyXG52YXIgbGlnaHRfc291bmRfYm9tYl9yYW5nZSA9IDVcclxudmFyIGZvcmNlX2ZpZWxkX3JhbmdlID0gMVxyXG52YXIgYWRyZW5hbGluZV9yYW5nZSA9IDFcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX3JhbmdlID0gMVxyXG5cclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX2R1cmF0aW9uID0gMlxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfY29vbGRvd24gPSAzXHJcbnZhciBwb2lzb25vdXNfYWRyZW5hbGluZV9mbGF0X0hQID0gNVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfZmxhdF9zdGFtaW5hID0gNVxyXG52YXIgcG9pc29ub3VzX2FkcmVuYWxpbmVfcGVyY2VudF9IUCA9IDAuMDVcclxudmFyIHBvaXNvbm91c19hZHJlbmFsaW5lX3BlcmNlbnRfc3RhbWluYSA9IDAuMDVcclxuXHJcbnZhciBhZHJlbmFsaW5lX2Nvb2xkb3duID0gM1xyXG5cclxudmFyIGFjaWRfYm9tYl9kdXJhdGlvbiA9IDIgLy8gMisxIHJlYWxseVxyXG52YXIgYWNpZF9ib21iX2Nvb2xkb3duID0gNVxyXG52YXIgYWNpZF9ib21iX3JhZGl1cyA9IDEuNlxyXG5cclxudmFyIG1pbmVzXzBfZGlzdGFuY2VfZGFtYWdlID0gMTJcclxudmFyIG1pbmVzXzFfZGlzdGFuY2VfZGFtYWdlID0gOFxyXG52YXIgbWluZXNfMXA1X2Rpc3RhbmNlX2RhbWFnZSA9IDVcclxudmFyIGxhbmRtaW5lX2RldGVjdGlvbl9yYWRpdXMgPSAyLjlcclxudmFyIGxhbmRtaW5lX2RpZmZ1c2VfdGhyZXNob2xkID0gMTBcclxuXHJcbi8vIFRoaXMgaXMgYSBjb25zdGFudCwgd2lsbCBiZSBtb3ZlZCB0byBkYXRhYmFzZSBsYXRlclxyXG5jb25zdCBIUF92YWx1ZXMgPSBbMTUsIDMwLCA0MCwgNTUsIDc1LCAxMDAsIDEzMCwgMTY1LCAyMDUsIDI1MCwgMzAwLCAzNTUsIDQxNV07XHJcbmNvbnN0IHN0YW1pbmFfdmFsdWVzID0gWzMwLCA0NSwgNjAsIDc1LCA5MCwgMTA1LCAxMjAsIDEzNSwgMTUwLCAxNjUsIDE4MCwgMTk1XTtcclxuY29uc3Qgc3RyZW5ndGhfZGFtYWdlX21hcCA9IFstMiwgMCwgMSwgMywgNiwgMTAsIDE1LCAyMSwgMjgsIDM2LCA0NSwgNTVdXHJcbmNvbnN0IG1vdmVfYWN0aW9uX21hcCA9IFsxLCAzLCA0LCA2LCA4LCAxMCwgMTIsIDE0LCAxNiwgMTgsIDIwLCAyMl1cclxuY29uc3QgYm9udXNfYWN0aW9uX21hcD0gWzAsIDEsIDEsIDIsIDIsIDIsIDIsIDIsIDMsIDMsIDMsIDNdXHJcbmNvbnN0IG1haW5fYWN0aW9uX21hcCA9IFsxLCAxLCAxLCAxLCAxLCAxLCAyLCAyLCAyLCAyLCAyLCAzXVxyXG5cclxuXHJcbmxldCBnYW1lX3N0YXRlID0ge2JvYXJkX3N0YXRlOiBbXSwgZm9nX3N0YXRlOiBbXSwgem9uZV9zdGF0ZTogW10sIHNpemU6IDAsIHNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZTogW10sIHRlcnJhaW5fZWZmZWN0czogW10sIGJhdHRsZV9tb2Q6IDAsIGxhbmRtaW5lczoge3Bvc2l0aW9uczogW10sIGtub3dlcnM6IFtdfX07XHJcbmxldCBjaGFyYWN0ZXJfc3RhdGUgPSBDSEFSQUNURVJfU1RBVEVfQ09OU1RBTlQ7XHJcblxyXG5sZXQgY2hhcmFjdGVyX2Jhc2UgPSBbXTtcclxubGV0IG9ic3RhY2xlX2Jhc2UgPSBbXTtcclxuXHJcbmxldCBnbV9jb250cm9sX21vZCA9IDA7IC8vIG5vcm1hbCBtb2RlXHJcblxyXG4vLyBpbl9wcm9jZXNzOiAwID0gbm90aGluZywgMSA9IG1vdmUsIDIgPSBhdHRhY2ssIDMgPSBza2lsbFxyXG5sZXQgY2hhcmFjdGVyX2Nob3NlbiA9IHtpbl9wcm9jZXNzOiAwLCBjaGFyX2lkOiAwLCBjaGFyX3Bvc2l0aW9uOiAwLCB3ZWFwb25faWQ6IDAsIHNraWxsX2lkOiAwLCBjZWxsOiAwfTtcclxuXHJcbmxldCBsYXN0X29ic3RhY2xlID0gMTtcclxubGV0IHpvbmVfZW5kcG9pbnQgPSB7aW5kZXg6IC0xLCBjZWxsOiAwfVxyXG5cclxudmFyIGd1bnNob3RfYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9ndW5zaG90Lm1wMycpO1xyXG52YXIgc3dvcmRfYXVkaW8gPSBuZXcgQXVkaW8oJ3NvdW5kcy9zd29yZC53YXYnKTtcclxudmFyIGV4cGxvc2lvbl9hdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL2V4cGxvc2lvbi5tcDMnKTtcclxuXHJcbmd1bnNob3RfYXVkaW8udm9sdW1lID0gMC4yXHJcbnN3b3JkX2F1ZGlvLnZvbHVtZSA9IDAuMlxyXG5leHBsb3Npb25fYXVkaW8udm9sdW1lID0gMC4yXHJcblxyXG5mdW5jdGlvbiByZWNvbm5lY3QoKSB7XHJcbiAgaWYgKCFzb2NrZXQuaXNSZWFkeSgpKSB7XHJcbiAgICBzb2NrZXQuaW5pdChTRVJWRVJfQUREUkVTUyk7XHJcbiAgICBzb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlckRlZmF1bHQoKTtcclxuICAgIGNvbnNvbGUubG9nKCdIb3BlZnVsbHkgcmVjb25uZWN0ZWQgKHByYXkpJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKCdXYXMgb25saW5lIGFueXdheScpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XHJcbiAgZ2FtZV9zdGF0ZS5zaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZF9zaXplXCIpLnZhbHVlO1xyXG4gIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLmZvZ19zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuem9uZV9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUgKiBnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG4gICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGUucHVzaCgwKTtcclxuICB9XHJcbiAgc2VuZF9jb25zdHJ1Y3RfY29tbWFuZChnYW1lX3N0YXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEJvYXJkKCkge1xyXG4gIHZhciBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfbmFtZVwiKS52YWx1ZTtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnbG9hZF9nYW1lJztcclxuICB0b1NlbmQuc2F2ZV9uYW1lID0gbmFtZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kX2NvbnN0cnVjdF9jb21tYW5kKG5ld19nYW1lX3N0YXRlKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2NvbnN0cnVjdF9ib2FyZCc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuZ2FtZV9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBub19zaGlmdF9vbmNsaWNrKG15X3JvbGUsIGdtX2NvbnRyb2xfbW9kLCBnYW1lX3N0YXRlLCBmaWVsZF9jaG9zZW4sIGNlbGwsIGluZGV4KSB7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgLy8gZ20gc2lkZVxyXG4gICAgaWYgKGdtX2NvbnRyb2xfbW9kID09IDApIHtcclxuICAgICAgLy8gd2UgYXJlIGluIG5vcm1hbCBhZGQvbW92ZSBkZWxldGUgbW9kZVxyXG4gICAgICBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIG15X3JvbGUpO1xyXG4gICAgfSBlbHNlIGlmIChnbV9jb250cm9sX21vZCA9PSAxKSB7XHJcbiAgICAgIC8vIHdlIGFyZSBpbiBmb2cgbW9kZVxyXG4gICAgICBhcHBseUZvZyhpbmRleCwgY2VsbCk7XHJcbiAgICB9IGVsc2UgaWYgKGdtX2NvbnRyb2xfbW9kID09IDIpIHtcclxuICAgICAgLy8gd2UgYXJlIGluIHpvbmVzIG1vZGVcclxuICAgICAgYXNzaWduWm9uZShpbmRleCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIHBsYXllciBzaWRlXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDEpIHtcclxuICAgICAgLy8gY2xpY2tlZCBmb2dcclxuICAgICAgaWYgKGZpZWxkX2Nob3NlbiA9PSAxKSB7XHJcbiAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIGZvZyBkZXRlY3RlZCcpO1xyXG4gICAgICAgIGRpc3BsYXlGb2coKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCBteV9yb2xlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNoaWZ0X29uY2xpY2soaW5kZXgsIGNlbGwpIHtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICBpZiAoZ21fY29udHJvbF9tb2QgPT0gMikge1xyXG4gICAgICBpZiAoem9uZV9lbmRwb2ludC5pbmRleCA8IDApIHtcclxuICAgICAgICB6b25lX2VuZHBvaW50LmluZGV4ID0gaW5kZXhcclxuICAgICAgICB6b25lX2VuZHBvaW50LmNlbGwgPSBjZWxsXHJcbiAgICAgICAgY2VsbC5zcmMgPSBaT05FX0VORFBPSU5UX1BJQ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVuZHBvaW50X2Fzc2lnbl96b25lKGluZGV4LCB6b25lX2VuZHBvaW50LmluZGV4KVxyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQ1xyXG4gICAgICAgIHpvbmVfZW5kcG9pbnQuaW5kZXggPSAtMVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9vYnN0YWNsZSc7XHJcbiAgICAgIHRvU2VuZC5jZWxsX2lkID0gaW5kZXg7XHJcbiAgICAgIHRvU2VuZC5vYnN0YWNsZV9udW1iZXIgPSBsYXN0X29ic3RhY2xlO1xyXG4gICAgICB0b1NlbmQub2JzdGFjbGVfbmFtZSA9IG9ic3RhY2xlX2xpc3RbbGFzdF9vYnN0YWNsZSAtIDFdO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGN0cmxfb25jbGljayhpbmRleCkge1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIHZhciBmb2dfdmFsdWUgPSBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF1cclxuICAgIHZhciBtb2QgPSAxIC0gZm9nX3ZhbHVlXHJcbiAgICB2YXIgem9uZSA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF1cclxuICAgIGZvZ1BhcnNlWm9uZShtb2QsIHpvbmUpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb25zdHJ1Y3RfYm9hcmQobmV3X2dhbWVfc3RhdGUpIHtcclxuICBnYW1lX3N0YXRlID0gbmV3X2dhbWVfc3RhdGVcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuXHJcbiAgdmFyIGJvYXJkX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xyXG4gIGJvYXJkX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIHZhciBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuICBib2FyZC5jbGFzc05hbWUgPSBcImJvYXJkXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIHZhciByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICByb3cuY2xhc3NOYW1lID0gXCJib2FyZF9yb3dcIjtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZV9zdGF0ZS5zaXplOyBqKyspIHtcclxuICAgICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICAgIHZhciBjZWxsX2lkID0gaSAqIGdhbWVfc3RhdGUuc2l6ZSArIGo7XHJcbiAgICAgIGJ1dHRvbi5pZCA9IFwiY2VsbF9cIiArIGNlbGxfaWQ7XHJcbiAgICAgIGJ1dHRvbi5yb3cgPSBpO1xyXG4gICAgICBidXR0b24uY29sdW1uID0gajtcclxuICAgICAgdmFyIGltYWdlX25hbWUgPSBmb2dPclBpYyhjZWxsX2lkKTtcclxuICAgICAgYnV0dG9uLnNyYyA9IGltYWdlX25hbWU7XHJcbiAgICAgIGJ1dHRvbi5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdib2FyZF9jZWxsJztcclxuICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHZhciBpbmRleCA9IGNlbGwucm93ICogZ2FtZV9zdGF0ZS5zaXplICsgY2VsbC5jb2x1bW47XHJcblxyXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgc2hpZnRfb25jbGljayhpbmRleCwgY2VsbClcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAgIGN0cmxfb25jbGljayhpbmRleClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbm9fc2hpZnRfb25jbGljayhteV9yb2xlLCBnbV9jb250cm9sX21vZCwgZ2FtZV9zdGF0ZSwgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzLCBjZWxsLCBpbmRleClcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG4gICAgICB2YXIgY2VsbF93cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xyXG4gICAgICBjZWxsX3dyYXAuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgY2VsbF93cmFwLmNsYXNzTmFtZSA9IFwiY2VsbF93cmFwXCI7XHJcblxyXG4gICAgICB2YXIgem9uZV90ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgem9uZV90ZXh0LmlkID0gXCJ6b25lX3RleHRfXCIgKyBjZWxsX2lkO1xyXG4gICAgICB6b25lX3RleHQuY2xhc3NOYW1lID0gXCJ6b25lX3RleHRcIjtcclxuICAgICAgY2VsbF93cmFwLmFwcGVuZENoaWxkKHpvbmVfdGV4dCk7XHJcblxyXG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbF93cmFwKTtcclxuICAgIH1cclxuICAgIGJvYXJkLmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgfVxyXG4gIGJvYXJkX2NvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVuZHBvaW50X2Fzc2lnbl96b25lKGVuZHBvaW50MSwgZW5kcG9pbnQyKSB7XHJcbiAgdmFyIHpvbmVfbnVtYmVyID0gem9uZV9udW1iZXJfc2VsZWN0LnZhbCgpO1xyXG4gIHZhciBtb2RpZmljYXRvciA9IHNlYXJjaF9tb2RpZmljYXRvci52YWwoKTtcclxuICB2YXIgc2l6ZSA9IGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgaW5kZXhfbGlzdCA9IFtdXHJcblxyXG4gIHZhciBjb29yZDEgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDEsIHNpemUpXHJcbiAgdmFyIGNvb3JkMiA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50Miwgc2l6ZSlcclxuXHJcbiAgdmFyIHRvcF9sZWZ0ID0gdG9wX2xlZnRfY29vcmQoY29vcmQxLCBjb29yZDIpXHJcbiAgdmFyIGJvdHRvbV9yaWdodCA9IGJvdHRvbV9yaWdodF9jb29yZChjb29yZDEsIGNvb3JkMilcclxuXHJcbiAgZm9yIChsZXQgaSA9IHRvcF9sZWZ0Lng7IGkgPD0gYm90dG9tX3JpZ2h0Lng7IGkrKykge1xyXG4gICAgZm9yIChsZXQgaiA9IHRvcF9sZWZ0Lnk7IGogPD0gYm90dG9tX3JpZ2h0Lnk7IGorKykge1xyXG4gICAgICB2YXIgY29vcmQgPSB7fVxyXG4gICAgICBjb29yZC54ID0gaVxyXG4gICAgICBjb29yZC55ID0galxyXG4gICAgICB2YXIgaW5kZXggPSBjb29yZF90b19pbmRleChjb29yZCwgc2l6ZSlcclxuXHJcbiAgICAgIGluZGV4X2xpc3QucHVzaChpbmRleClcclxuICAgICAgdmFyIHpvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd6b25lX3RleHRfJyArIGluZGV4KTtcclxuICAgICAgem9uZV90ZXh0LmlubmVySFRNTCA9IHpvbmVfbnVtYmVyICsgJygnICsgbW9kaWZpY2F0b3IgKyAnKSc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnYXNzaWduX3pvbmUnO1xyXG4gIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gIHRvU2VuZC5pbmRleF9saXN0ID0gaW5kZXhfbGlzdDtcclxuICB0b1NlbmQubW9kaWZpY2F0b3IgPSBtb2RpZmljYXRvcjtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b3BfbGVmdF9jb29yZChjb29yZDEsIGNvb3JkMikge1xyXG4gIHZhciB0b1JldCA9IHt9XHJcbiAgdG9SZXQueCA9IE1hdGgubWluKGNvb3JkMS54LCBjb29yZDIueClcclxuICB0b1JldC55ID0gTWF0aC5taW4oY29vcmQxLnksIGNvb3JkMi55KVxyXG4gIHJldHVybiB0b1JldFxyXG59XHJcblxyXG5mdW5jdGlvbiBib3R0b21fcmlnaHRfY29vcmQoY29vcmQxLCBjb29yZDIpIHtcclxuICB2YXIgdG9SZXQgPSB7fVxyXG4gIHRvUmV0LnggPSBNYXRoLm1heChjb29yZDEueCwgY29vcmQyLngpXHJcbiAgdG9SZXQueSA9IE1hdGgubWF4KGNvb3JkMS55LCBjb29yZDIueSlcclxuICByZXR1cm4gdG9SZXRcclxufVxyXG5cclxuZnVuY3Rpb24gY29vcmRfdG9faW5kZXgoY29vcmQsIHNpemUpIHtcclxuICB2YXIgaW5kZXggPSBjb29yZC54ICogc2l6ZSArIGNvb3JkLnlcclxuICByZXR1cm4gaW5kZXhcclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduWm9uZShpbmRleCkge1xyXG4gIHZhciB6b25lX251bWJlciA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICB2YXIgbW9kaWZpY2F0b3IgPSBzZWFyY2hfbW9kaWZpY2F0b3IudmFsKCk7XHJcblxyXG4gIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9uZV90ZXh0XycgKyBpbmRleCk7XHJcbiAgem9uZV90ZXh0LmlubmVySFRNTCA9IHpvbmVfbnVtYmVyICsgJygnICsgbW9kaWZpY2F0b3IgKyAnKSc7XHJcblxyXG4gIHZhciBpbmRleF9saXN0ID0gW11cclxuICBpbmRleF9saXN0LnB1c2goaW5kZXgpXHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhc3NpZ25fem9uZSc7XHJcbiAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgdG9TZW5kLmluZGV4X2xpc3QgPSBpbmRleF9saXN0O1xyXG4gIHRvU2VuZC5tb2RpZmljYXRvciA9IG1vZGlmaWNhdG9yO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ09yUGljKGNlbGxfaWQpIHtcclxuICB2YXIgcGljdHVyZV9uYW1lID0gRk9HX0lNQUdFO1xyXG4gIGlmICgoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbY2VsbF9pZF0gIT0gMSl8fChteV9yb2xlID09ICdnbScpKSB7XHJcbiAgICB2YXIgY2hhcl9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2VsbF9pZF1cclxuICAgIHBpY3R1cmVfbmFtZSA9IGdldF9vYmplY3RfcGljdHVyZShjaGFyX2lkKTtcclxuICAgIGlmIChjaGFyX2lkID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJfaWRdICE9IFwiYWxsXCIgJiYgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyX2lkXSAhPSBteV9uYW1lKSB7XHJcbiAgICAgIHBpY3R1cmVfbmFtZSA9IGdldF9vYmplY3RfcGljdHVyZSgwKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG4gIHJldHVybiBwaWN0dXJlX25hbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YW5kYXJkX2NlbGxfb25DbGljayhpbmRleCwgY2VsbCwgcm9sZSkge1xyXG5cdGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7IC8vIGVtcHR5IGNlbGwgY2xpY2tlZFxyXG5cclxuICAgIHN3aXRjaChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MpIHtcclxuICAgICAgY2FzZSAwOiAvLyBub3RoaW5nXHJcbiAgICAgICAgaWYgKHJvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgICAgYWRkX29iamVjdChpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6IC8vIG1vdmVcclxuICAgICAgICBtb3ZlX2NoYXJhY3RlcihpbmRleCwgY2VsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjogLy9hdHRhY2tcclxuICAgICAgICBzdG9wX2F0dGFjaygpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzogLy9za2lsbFxyXG4gICAgICAgIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXNvbHZpbmcgb25fY2xpY2sgZW1wdHlcIilcclxuICAgIH1cclxuXHJcblx0fSBlbHNlIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA+IDApIHsgLy8gY2hhcmFjdGVyIGNsaWNrZWRcclxuICAgIHN3aXRjaChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MpIHtcclxuICAgICAgY2FzZSAwOiAvLyBub3RoaW5nXHJcbiAgICAgICAgc2VsZWN0X2NoYXJhY3RlcihpbmRleCwgY2VsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTogLy8gbW92ZVxyXG4gICAgICAgIHVuZG9fc2VsZWN0aW9uKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjogLy9hdHRhY2tcclxuICAgICAgICBwZXJmb3JtX2F0dGFjayhpbmRleCwgY2VsbClcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOiAvL3NraWxsXHJcbiAgICAgICAgcGVyZm9ybV9za2lsbChpbmRleCwgY2VsbClcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJlc29sdmluZyBvbl9jbGljayBjaGFyYWN0ZXJcIilcclxuICAgIH1cclxuXHJcblx0fSBlbHNlIHsgLy8gb2JzdGFjbGUgY2xpY2tlZFxyXG5cclxuICAgIHN3aXRjaChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MpIHtcclxuICAgICAgY2FzZSAwOiAvLyBub3RoaW5nXHJcbiAgICAgICAgc2VsZWN0X29ic3RhY2xlKGluZGV4LCBjZWxsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxOiAvLyBtb3ZlXHJcbiAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOiAvL2F0dGFja1xyXG4gICAgICAgIHN0b3BfYXR0YWNrKClcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOiAvL3NraWxsXHJcbiAgICAgICAgcGVyZm9ybV9za2lsbChpbmRleCwgY2VsbClcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJlc29sdmluZyBvbl9jbGljayBvYnN0YWNsZVwiKVxyXG4gICAgfVxyXG5cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluZGV4X3RvX2Nvb3JkaW5hdGVzKGluZGV4LCBzaXplKSB7XHJcbiAgdmFyIHRvUmV0ID0ge31cclxuICB0b1JldC54ID0gTWF0aC5mbG9vcihpbmRleC9zaXplKVxyXG4gIHRvUmV0LnkgPSBpbmRleCAlIHNpemVcclxuICByZXR1cm4gdG9SZXRcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZERpc3RhbmNlKGluZGV4MSwgaW5kZXgyKSB7XHJcbiAgdmFyIHgxID0gTWF0aC5mbG9vcihpbmRleDEvZ2FtZV9zdGF0ZS5zaXplKVxyXG4gIHZhciB5MSA9IGluZGV4MSAlIGdhbWVfc3RhdGUuc2l6ZVxyXG5cclxuICB2YXIgeDIgPSBNYXRoLmZsb29yKGluZGV4Mi9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkyID0gaW5kZXgyICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciBkaXN0YW5jZV9zcXVhcmVkID0gKHgxLXgyKSooeDEteDIpICsgKHkxLXkyKSooeTEteTIpXHJcbiAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KGRpc3RhbmNlX3NxdWFyZWQpXHJcbiAgcmV0dXJuIHBhcnNlRmxvYXQoZGlzdGFuY2UpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzSW5SYW5nZShpbmRleDEsIGluZGV4MiwgcmFuZ2UpIHtcclxuICB2YXIgeDEgPSBNYXRoLmZsb29yKGluZGV4MS9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkxID0gaW5kZXgxICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciB4MiA9IE1hdGguZmxvb3IoaW5kZXgyL2dhbWVfc3RhdGUuc2l6ZSlcclxuICB2YXIgeTIgPSBpbmRleDIgJSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIGRpc3RhbmNlID0gKHgxLXgyKSooeDEteDIpICsgKHkxLXkyKSooeTEteTIpXHJcbiAgcmV0dXJuIGRpc3RhbmNlIDw9IHJhbmdlKnJhbmdlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluZGV4X2luX3JhZGl1cyhpbmRleCwgcmFuZ2UpIHtcclxuICB2YXIgc2l6ZSA9IGdhbWVfc3RhdGUuc2l6ZVxyXG4gIHZhciB4ID0gTWF0aC5mbG9vcihpbmRleC9zaXplKVxyXG4gIHZhciB5ID0gaW5kZXggJSBzaXplXHJcbiAgdmFyIGNhbmRpZGF0ZV9pbmRleF9saXN0ID0gW11cclxuXHJcbiAgLy9jb25zb2xlLmxvZyhcIng6IFwiICsgeCArIFwiIHk6IFwiICsgeSArIFwiIGluZGV4OiBcIiArIGluZGV4KVxyXG5cclxuICBmb3IgKGxldCBpID0gTWF0aC5mbG9vcigtMSAqIHJhbmdlKTsgaSA8PSBNYXRoLmNlaWwocmFuZ2UpOyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSBNYXRoLmZsb29yKC0xICogcmFuZ2UpOyBqIDw9IE1hdGguY2VpbChyYW5nZSk7IGorKykge1xyXG4gICAgICB2YXIgY2FuZF94ID0geCArIGlcclxuICAgICAgdmFyIGNhbmRfeSA9IHkgKyBqXHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJjYW5kX3g6IFwiICsgY2FuZF94ICsgXCIgY2FuZF95OiBcIiArIGNhbmRfeSlcclxuICAgICAgaWYgKGNhbmRfeCA+PTAgJiYgY2FuZF94IDwgc2l6ZSAmJiBjYW5kX3kgPj0wICYmIGNhbmRfeSA8IHNpemUpIHtcclxuICAgICAgICB2YXIgY2FuZF9pbmRleCA9IGNhbmRfeCpzaXplICsgY2FuZF95XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImNhbmRfaW5kZXg6IFwiICsgY2FuZF9pbmRleClcclxuICAgICAgICBpZiAoaXNJblJhbmdlKGluZGV4LCBjYW5kX2luZGV4LCByYW5nZSkpIHtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjYW5kX2luZGV4OiBcIiArIGNhbmRfaW5kZXggKyBcIndhcyBjb25zaWRlcmVkIGluIHJhbmdlXCIpXHJcbiAgICAgICAgICBjYW5kaWRhdGVfaW5kZXhfbGlzdC5wdXNoKGNhbmRfaW5kZXgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjYW5kaWRhdGVfaW5kZXhfbGlzdFxyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsX3goeCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB4KSArIDFcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlGb2coaW5kZXgsIGNlbGwpIHtcclxuXHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDEpIHtcclxuXHRcdC8vIHNlbmQgdXBkYXRlIG1lc3NhZ2VcclxuXHRcdHZhciB0b1NlbmQgPSB7fTtcclxuXHRcdHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG5cdFx0dG9TZW5kLnVwZGF0ZV90eXBlID0gJ3JlbW92ZSc7XHJcblx0XHR0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblx0XHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gc2VuZCB1cGRhdGUgbWVzc2FnZVxyXG5cdFx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdFx0dG9TZW5kLmNvbW1hbmQgPSAndXBkYXRlX2ZvZyc7XHJcblx0XHR0b1NlbmQudXBkYXRlX3R5cGUgPSAnYWRkJztcclxuXHRcdHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuXHRcdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJfY29udGFpbmVycygpIHtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5odG1sKFwiXCIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKCkge1xyXG4gIHRpbnlfYW5pbWF0aW9uKGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lcik7XHJcbiAgdGlueV9hbmltYXRpb24od2VhcG9uX2luZm9fY29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX29iamVjdChib2FyZF9pbmRleCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgYnV0dG9uX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgYnV0dG9uX2NvbnRhaW5lci5jbGFzc05hbWUgPSBcImFkZC1vYmplY3QtYnV0dG9uLWNvbnRhaW5lclwiO1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9jaGFyYWN0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbl9hZGRfY2hhcmFjdGVyLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9C10YDRgdC+0L3QsNC20LBcIjtcclxuICBidXR0b25fYWRkX2NoYXJhY3Rlci5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9vYnN0YWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uX2FkZF9vYnN0YWNsZS5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0Ywg0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVwiO1xyXG4gIGJ1dHRvbl9hZGRfb2JzdGFjbGUub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgYWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfY2hhcmFjdGVyKTtcclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfb2JzdGFjbGUpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uX2NvbnRhaW5lcik7XHJcblxyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxufVxyXG5cclxuZnVuY3Rpb24gdGlueV9hbmltYXRpb24oY29udGFpbmVyKSB7XHJcbiAgY29udGFpbmVyLmFkZENsYXNzKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICB9LCA1MCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZF9vYnN0YWNsZV9jb21tYW5kKGluZGV4LCBvYnN0YWNsZV9udW1iZXIpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX29ic3RhY2xlJztcclxuICB0b1NlbmQuY2VsbF9pZCA9IGluZGV4O1xyXG4gIHRvU2VuZC5vYnN0YWNsZV9udW1iZXIgPSBvYnN0YWNsZV9udW1iZXIgKyAxO1xyXG4gIHRvU2VuZC5vYnN0YWNsZV9uYW1lID0gb2JzdGFjbGVfbGlzdFtvYnN0YWNsZV9udW1iZXJdO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZF9vYnN0YWNsZShib2FyZF9pbmRleCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICBzZWxlY3QuaWQgPSBcIm9ic3RhY2xlX2Nob3NlblwiO1xyXG4gIHNlbGVjdC5jbGFzc05hbWUgPSBcIm9iamVjdF9zZWxlY3RcIlxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG9ic3RhY2xlX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBvYnN0YWNsZV9saXN0W2ldO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpO1xyXG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICB9XHJcblxyXG4gIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbi5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0YxcIjtcclxuICBidXR0b24uYm9hcmRfaW5kZXggPSBib2FyZF9pbmRleDtcclxuICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgdmFyIG9ic3RhY2xlX251bWJlciA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2JzdGFjbGVfY2hvc2VuXCIpLnZhbHVlKTtcclxuXHJcbiAgICBhZGRfb2JzdGFjbGVfY29tbWFuZChidXR0b24uYm9hcmRfaW5kZXgsIG9ic3RhY2xlX251bWJlcilcclxuXHJcbiAgICBjbGVhcl9jb250YWluZXJzKClcclxuICB9XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoc2VsZWN0KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGJ1dHRvbik7XHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX2NoYXJhY3Rlcihib2FyZF9pbmRleCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICBzZWxlY3QuaWQgPSBcImNoYXJhY3Rlcl9jaG9zZW5cIjtcclxuICBzZWxlY3QuY2xhc3NOYW1lID0gXCJvYmplY3Rfc2VsZWN0XCJcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IGNoYXJhY3Rlcl9saXN0W2ldO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpO1xyXG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICB9XHJcblxyXG4gIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbi5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0YxcIjtcclxuICBidXR0b24uYm9hcmRfaW5kZXggPSBib2FyZF9pbmRleDtcclxuICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlcl9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9jaGFyYWN0ZXInO1xyXG4gICAgdG9TZW5kLmNlbGxfaWQgPSBidXR0b24uYm9hcmRfaW5kZXg7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXIgKyAxO1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gY2hhcmFjdGVyX2xpc3RbY2hhcmFjdGVyX251bWJlcl07XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgY2xlYXJfY29udGFpbmVycygwKVxyXG4gIH1cclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChzZWxlY3QpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uKTtcclxuICB0aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZlX2NoYXJhY3Rlcih0b19pbmRleCwgdG9fY2VsbCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDA7IC8vIGVuZCB0aGUgbW90aW9uXHJcbiAgdmFyIGNob3Nlbl9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciBjaG9zZW5fY2hhcmFjdGVyX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcblxyXG4gIHZhciBkaXN0YW5jZSA9IGZpbmREaXN0YW5jZSh0b19pbmRleCwgY2hvc2VuX2luZGV4KVxyXG4gIHZhciBtYXhfZGlzdGFuY2UgPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF1cclxuXHJcbiAgaWYgKGRpc3RhbmNlIDw9IG1heF9kaXN0YW5jZSkge1xyXG4gICAgaWYgKCEoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEgJiYgZGlzdGFuY2UgPiAxLjYpKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnbW92ZV9jaGFyYWN0ZXInO1xyXG4gICAgICB0b1NlbmQuZnJvbV9pbmRleCA9IGNob3Nlbl9pbmRleDtcclxuICAgICAgdG9TZW5kLnRvX2luZGV4ID0gdG9faW5kZXg7XHJcbiAgICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleDtcclxuICAgICAgdG9TZW5kLmNoYXJhY3Rlcl9hdmF0YXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5hdmF0YXI7XHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC5kaXN0YW5jZSA9IGRpc3RhbmNlXHJcbiAgICAgIHRvU2VuZC5sZWZ0X3NoaWVsZCA9IDBcclxuICAgICAgdG9TZW5kLm1pbmVzX2V4cGxvZGVkID0gW11cclxuICAgICAgdG9TZW5kLm1pbmVzX2RhbWFnZSA9IDBcclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmhhc093blByb3BlcnR5KFwiZm9yY2VfZmllbGRfdGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgdmFyIHNoaWVsZF9pbmRleCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uZm9yY2VfZmllbGRfdGFyZ2V0LnNoaWVsZF9pbmRleFxyXG4gICAgICAgIGlmKCFnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLmNlbGxzX3Byb3RlY3RlZC5pbmNsdWRlcyh0b19pbmRleCkpIHsvLyDQv9C+0LrQuNC90YPQuyDQt9C+0L3RgyDQt9Cw0YnQuNGC0YtcclxuICAgICAgICAgIHRvU2VuZC5sZWZ0X3NoaWVsZCA9IDFcclxuICAgICAgICAgIHRvU2VuZC5zaGllbGRfaW5kZXggPSBzaGllbGRfaW5kZXhcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQgPSBbXTtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0gIT0gXCJhbGxcIikgey8vdXNlciBpcyBpbnZpc2libGVcclxuICAgICAgICB2YXIgaW1tZWRpYXRlX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgMSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbW1lZGlhdGVfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dID4gMCAmJiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ltbWVkaWF0ZV9uYmhbaV1dICE9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXgpIHsvLyB0aGVyZSBhcmUgY2hhcmFjdGVycyB0aGVyZVxyXG4gICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChjaG9zZW5fY2hhcmFjdGVyX2luZGV4KTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgdmFyIGV4dGVuZGVkX25iaCA9IGluZGV4X2luX3JhZGl1cyh0b19pbmRleCwgaW52aXNpYmlsaXR5X2RldGVjdGlvbl9yYWRpdXMpO1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleHRlbmRlZF9uYmgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dID4gMCAmJiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCkgey8vIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIHRoZXJlXHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudF9jaGFyX251bSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXTtcclxuICAgICAgICAgICAgICAgIHZhciByb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2N1cnJlbnRfY2hhcl9udW1dLmludGVsbGlnZW5jZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocm9sbCA+IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRvU2VuZC5pbnZpc2liaWxpdHlfZW5kZWRfaWQucHVzaChjaG9zZW5fY2hhcmFjdGVyX2luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyh0b19pbmRleCkpIHtcclxuICAgICAgICB0b1NlbmQubWluZXNfZXhwbG9kZWQucHVzaCh0b19pbmRleClcclxuICAgICAgICB0b1NlbmQubWluZXNfZGFtYWdlID0gdG9TZW5kLm1pbmVzX2RhbWFnZSArIHJvbGxfeChtaW5lc18wX2Rpc3RhbmNlX2RhbWFnZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBpbW1lZGlhdGVfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCAxKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbW1lZGlhdGVfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSA+IDAgJiYgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXSAhPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4KSB7Ly8gdGhlcmUgYXJlIGNoYXJhY3RlcnMgdGhlcmVcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbW1lZGlhdGVfbmJoW2ldXV0gIT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5wdXNoKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW1tZWRpYXRlX25iaFtpXV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhpbW1lZGlhdGVfbmJoW2ldKSAmJiBpbW1lZGlhdGVfbmJoW2ldICE9IHRvX2luZGV4KSB7XHJcbiAgICAgICAgICAgIHRvU2VuZC5taW5lc19leHBsb2RlZC5wdXNoKGltbWVkaWF0ZV9uYmhbaV0pXHJcbiAgICAgICAgICAgIHRvU2VuZC5taW5lc19kYW1hZ2UgPSB0b1NlbmQubWluZXNfZGFtYWdlICsgcm9sbF94KG1pbmVzXzFfZGlzdGFuY2VfZGFtYWdlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIG9uZV9hbmRfaGFsZl9uYmggPSBpbmRleF9pbl9yYWRpdXModG9faW5kZXgsIDEuNik7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb25lX2FuZF9oYWxmX25iaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhvbmVfYW5kX2hhbGZfbmJoW2ldKSAmJiAoIWltbWVkaWF0ZV9uYmguaW5jbHVkZXMob25lX2FuZF9oYWxmX25iaFtpXSkpKSB7XHJcbiAgICAgICAgICAgIHRvU2VuZC5taW5lc19leHBsb2RlZC5wdXNoKG9uZV9hbmRfaGFsZl9uYmhbaV0pXHJcbiAgICAgICAgICAgIHRvU2VuZC5taW5lc19kYW1hZ2UgPSB0b1NlbmQubWluZXNfZGFtYWdlICsgcm9sbF94KG1pbmVzXzFwNV9kaXN0YW5jZV9kYW1hZ2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZXh0ZW5kZWRfbmJoID0gaW5kZXhfaW5fcmFkaXVzKHRvX2luZGV4LCBpbnZpc2liaWxpdHlfZGV0ZWN0aW9uX3JhZGl1cyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXh0ZW5kZWRfbmJoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtleHRlbmRlZF9uYmhbaV1dID4gMCAmJiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2V4dGVuZGVkX25iaFtpXV0gIT0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCAmJiAoIWltbWVkaWF0ZV9uYmguaW5jbHVkZXMoZXh0ZW5kZWRfbmJoW2ldKSkpIHsvLyB0aGVyZSBhcmUgY2hhcmFjdGVycyB0aGVyZVxyXG4gICAgICAgICAgICB2YXIgY3VycmVudF9jaGFyX251bSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZXh0ZW5kZWRfbmJoW2ldXTtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbY3VycmVudF9jaGFyX251bV0gIT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgICAgIHZhciByb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmludGVsbGlnZW5jZSk7XHJcbiAgICAgICAgICAgICAgaWYgKHJvbGwgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgdG9TZW5kLmludmlzaWJpbGl0eV9lbmRlZF9pZC5wdXNoKGN1cnJlbnRfY2hhcl9udW0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjbGVhcl9jb250YWluZXJzKCk7XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgICAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gdG9faW5kZXhcclxuICAgICAgdmFyIHRvX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgdG9faW5kZXgpO1xyXG4gICAgICBjaGFyYWN0ZXJfY2hvc2VuLmNlbGwgPSB0b19jZWxsXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCSINCx0L7RjiDQvdGD0LbQvdC+INC00LLQuNCz0LDRgtGM0YHRjyDQv9C+0YHRgtGD0L/QsNGC0LXQu9GM0L3QviAoMS0yINC60LvQtdGC0LrQuClcIilcclxuICAgICAgdW5kb19zZWxlY3Rpb24oKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCf0L7Qu9C10LPRh9C1LCDQvNGB0YzQtSDQkdC+0LvRglwiKVxyXG4gICAgdW5kb19zZWxlY3Rpb24oKVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlGb2coKSB7XHJcblx0Y2xlYXJfY29udGFpbmVycygpXHJcblxyXG5cdHZhciBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgaW5mby5pbm5lckhUTUwgPSAn0JzRiyDQvdC1INC30L3QsNC10LwsINGH0YLQviDRjdGC0L4g0YLQsNC60L7QtS4g0JXRgdC70Lgg0LHRiyDQvNGLINC30L3QsNC70Lgg0YfRgtC+INGN0YLQviDRgtCw0LrQvtC1LCDQvdC+INC80Ysg0L3QtSDQt9C90LDQtdC8Lic7XHJcblxyXG5cdHZhciBmb2dfcGljdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgZm9nX3BpY3R1cmUuc3JjID0gUVVFU1RJT05fSU1BR0U7XHJcbiAgZm9nX3BpY3R1cmUuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGZvZ19waWN0dXJlLnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG5cdGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoaW5mbyk7XHJcblx0Y2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChmb2dfcGljdHVyZSk7XHJcblxyXG50aW55X2FuaW1hdGVfY29udGFpbmVycygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZV9jaGFyYWN0ZXIoaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICBjbGVhcl9jb250YWluZXJzKClcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnZGVsZXRlX2NoYXJhY3Rlcic7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0X2NoYXJhY3RlcihpbmRleCwgY2VsbCkge1xyXG4gIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuXHJcblxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW52aXNpYmlsaXR5W2NoYXJhY3Rlcl9udW1iZXJdID09IFwiYWxsXCIgfHwgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSBteV9uYW1lKSB7XHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWQgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uID0gaW5kZXhcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNlbGwgPSBjZWxsXHJcblxyXG4gIGxldCBuYW1lID0gY2hhcmFjdGVyLm5hbWU7XHJcbiAgbGV0IGF2YXRhciA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcblxyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG5cclxuICB2YXIgbmFtZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIG5hbWVfZGlzcGxheS5pbm5lckhUTUwgPSBuYW1lO1xyXG5cclxuICB2YXIgYXZhdGFyX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgdmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG4gIGF2YXRhcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYXZhdGFyX2Rpc3BsYXkpXHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQobmFtZV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGF2YXRhcl9jb250YWluZXIpO1xyXG5cclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIgfHwgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gMSkge1xyXG5cclxuICAgIGF2YXRhcl9kaXNwbGF5Lm9ubW91c2VlbnRlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICB2YXIgbWFpbl9hY3Rpb24gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIGJvbnVzX2FjdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgdmFyIG1vdmVfYWN0aW9uID0gTWF0aC5mbG9vcihjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0pXHJcblxyXG4gICAgICB2YXIgbWFpbl9hY3Rpb25fZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgbWFpbl9hY3Rpb25fZGlzcGxheS5pZCA9IFwibWFpbl9hY3Rpb25fZGlzcGxheVwiO1xyXG4gICAgICBtYWluX2FjdGlvbl9kaXNwbGF5LmlubmVySFRNTCA9IFwi0J7RgdC90L7QstC90YvRhTogXCIgKyBtYWluX2FjdGlvblxyXG5cclxuICAgICAgdmFyIGJvbnVzX2FjdGlvbl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICBib251c19hY3Rpb25fZGlzcGxheS5pZCA9IFwiYm9udXNfYWN0aW9uX2Rpc3BsYXlcIjtcclxuICAgICAgYm9udXNfYWN0aW9uX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQkdC+0L3Rg9GB0L3Ri9GFOiBcIiArIGJvbnVzX2FjdGlvblxyXG5cclxuICAgICAgdmFyIG1vdmVfYWN0aW9uX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgIG1vdmVfYWN0aW9uX2Rpc3BsYXkuaWQgPSBcIm1vdmVfYWN0aW9uX2Rpc3BsYXlcIjtcclxuICAgICAgbW92ZV9hY3Rpb25fZGlzcGxheS5pbm5lckhUTUwgPSBcItCf0LXRgNC10LTQstC40LbQtdC90LjQtTogXCIgKyBtb3ZlX2FjdGlvblxyXG5cclxuXHJcbiAgICAgIHdlYXBvbl9pbmZvX2NvbnRhaW5lci5hcHBlbmQobWFpbl9hY3Rpb25fZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChib251c19hY3Rpb25fZGlzcGxheSlcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZChtb3ZlX2FjdGlvbl9kaXNwbGF5KVxyXG4gICAgICB3ZWFwb25faW5mb19jb250YWluZXIuc2hvdygpXHJcbiAgICB9XHJcblxyXG4gICAgYXZhdGFyX2Rpc3BsYXkub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmhpZGUoKVxyXG4gICAgfVxyXG5cclxuICB2YXIgc3RyZW5ndGhfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBzdHJlbmd0aF9kaXNwbGF5LmlubmVySFRNTCA9IFwiQ9C40LvQsDogXCIgKyBjaGFyYWN0ZXIuc3RyZW5ndGg7XHJcblxyXG4gIHZhciBzdGFtaW5hX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgc3RhbWluYV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KLQtdC70L7RgdC70L7QttC10L3QuNC1OiBcIiArIGNoYXJhY3Rlci5zdGFtaW5hO1xyXG5cclxuICB2YXIgYWdpbGl0eV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGFnaWxpdHlfZGlzcGxheS5pbm5lckhUTUwgPSBcItCb0L7QstC60L7RgdGC0Yw6IFwiICsgY2hhcmFjdGVyLmFnaWxpdHk7XHJcblxyXG4gIHZhciBpbnRlbGxpZ2VuY2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBpbnRlbGxpZ2VuY2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCY0L3RgtC10LvQu9C10LrRgjogXCIgKyBjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlO1xyXG5cclxuICB2YXIgS0RfdmFsdWUgPSBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtjaGFyYWN0ZXJfbnVtYmVyXSlcclxuICB2YXIgS0RfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBLRF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JrQlDogXCIgKyBLRF92YWx1ZTtcclxuXHJcbiAgdmFyIGhwX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSkvcGFyc2VGbG9hdChIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKVxyXG4gIGhwX3BlcmNlbnQgPSBNYXRoLmZsb29yKGhwX3BlcmNlbnQqMTAwKVxyXG5cclxuICB2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBIUF9kaXNwbGF5LmlkID0gXCJIUF9kaXNwbGF5XCI7XHJcbiAgSFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdICsgXCIgKFwiICsgaHBfcGVyY2VudCArIFwiJSlcIjtcclxuXHJcbiAgdmFyIHRpcmVkX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXSlcclxuICB0aXJlZF9wZXJjZW50ID0gTWF0aC5mbG9vcih0aXJlZF9wZXJjZW50KjEwMClcclxuXHJcbiAgdmFyIHRpcmVkX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgdGlyZWRfZGlzcGxheS5pZCA9IFwidGlyZWRfZGlzcGxheVwiO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQktGL0L3QvtGB0LvQuNCy0L7RgdGC0Yw6IFwiICsgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl0gKyBcIiAoXCIgKyB0aXJlZF9wZXJjZW50ICsgXCIlKVwiO1xyXG5cclxuICB2YXIgaW5pdGlhdGl2ZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGluaXRpYXRpdmVfZGlzcGxheS5pbm5lckhUTUwgPSBcItCY0L3QuNGG0LjQsNGC0LjQstCwOiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHN0cmVuZ3RoX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoc3RhbWluYV9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGFnaWxpdHlfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChpbnRlbGxpZ2VuY2VfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChLRF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKEhQX2Rpc3BsYXkpO1xyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQodGlyZWRfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChpbml0aWF0aXZlX2Rpc3BsYXkpO1xyXG5cclxuICB2YXIgbW92ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIG1vdmVfYnV0dG9uLmlubmVySFRNTCA9IFwi0J/QtdGA0LXQvNC10YnQtdC90LjQtVwiO1xyXG4gIG1vdmVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgbW92ZV9idXR0b24uY2VsbCA9IGNlbGw7XHJcbiAgbW92ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgY2hhcmFjdGVyX3BpY2tlZCA9IGV2ZW50LnRhcmdldFxyXG4gICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NoYXJhY3Rlcl9waWNrZWQuaW5kZXhdO1xyXG4gICAgdmFyIG1vdmVfYWN0aW9uc19sZWZ0ID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBpZiAobW92ZV9hY3Rpb25zX2xlZnQgPiAwKSB7XHJcbiAgICAgIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoY2hhcmFjdGVyX3BpY2tlZC5pbmRleCwgY2hhcmFjdGVyX3BpY2tlZC5jZWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0JLRiyDQv9C+0YLRgNCw0YLQuNC70Lgg0LLRgdC1INC/0LXRgNC10LzQtdGJ0LXQvdC40Y8g0L3QsCDRjdGC0L7QvCDRhdC+0LTRgyFcIilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG5cclxuICAgIHZhciBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRlbGV0ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQo9C90LjRh9GC0L7QttC40YLRjFwiO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gICAgZGVsZXRlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICAgIGRlbGV0ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGRlbGV0ZV9jaGFyYWN0ZXIoaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24uaW5uZXJIVE1MID0gXCLQmNC30LzQtdC90LjRgtGMINCy0LjQtNC40LzQvtGB0YLRjFwiO1xyXG4gICAgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5KGNoYXJhY3Rlcl9udW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkYW1hZ2VfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRhbWFnZV9idXR0b24uaW5uZXJIVE1MID0gXCLQndCw0L3QtdGB0YLQuCDRg9GA0L7QvVwiO1xyXG4gICAgZGFtYWdlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gICAgZGFtYWdlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgdmFyIGRhbWFnZV9maWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFtYWdlX2ZpZWxkXCIpO1xyXG4gICAgICBpZiAoIShkYW1hZ2VfZmllbGQudmFsdWUgPT09IFwiXCIpKSB7XHJcbiAgICAgICAgdmFyIGRhbWFnZSA9IHBhcnNlSW50KGRhbWFnZV9maWVsZC52YWx1ZSk7XHJcbiAgICAgICAgdmFyIEhQX2Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkhQX2Rpc3BsYXlcIik7XHJcbiAgICAgICAgdmFyIG5ld19IUCA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSAtIGRhbWFnZTtcclxuICAgICAgICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBuZXdfSFA7XHJcblxyXG4gICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdkZWFsX2RhbWFnZSc7XHJcbiAgICAgICAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICAgIHRvU2VuZC5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgZGFtYWdlX2ZpZWxkLmlkID0gXCJkYW1hZ2VfZmllbGRcIjtcclxuICAgIGRhbWFnZV9maWVsZC50eXBlID0gXCJudW1iZXJcIjtcclxuICAgIGRhbWFnZV9maWVsZC5wbGFjZWhvbGRlciA9IFwi0JfQvdCw0YfQtdC90LjQtSDRg9GA0L7QvdCwXCI7XHJcblxyXG4gIH1cclxuXHJcbiAgdmFyIHNlYXJjaF9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHNlYXJjaF9idXR0b24uaW5uZXJIVE1MID0gXCLQntCx0YvRgdC60LDRgtGMXCI7XHJcbiAgc2VhcmNoX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIHNlYXJjaF9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBzZWFyY2hfYWN0aW9uKGV2ZW50LnRhcmdldCk7XHJcbiAgfVxyXG5cclxuICB2YXIgc2ltcGxlX3JvbGxfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBzaW1wbGVfcm9sbF9idXR0b24uaW5uZXJIVE1MID0gXCLQn9GA0L7RgdGC0L4gZDIwXCI7XHJcbiAgc2ltcGxlX3JvbGxfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIHJvbGwgPSByb2xsX3goMjApXHJcbiAgICB2YXIgdG9TZW5kID0ge31cclxuICAgIHRvU2VuZC5jb21tYW5kID0gXCJzaW1wbGVfcm9sbFwiXHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBjaGFyYWN0ZXIubmFtZVxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbVxyXG4gICAgdG9TZW5kLnJvbGwgPSByb2xsXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9XHJcblxyXG4gIHZhciB3ZWFwb25fc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICB3ZWFwb25fc2VsZWN0LmlkID0gXCJ3ZWFwb25fY2hvc2VuXCI7XHJcblxyXG4gIHZhciBpbnZlbnRvcnkgPSBjaGFyYWN0ZXIuaW52ZW50b3J5XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW52ZW50b3J5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gd2VhcG9uX2xpc3RbaW52ZW50b3J5W2ldXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaW52ZW50b3J5W2ldO1xyXG4gICAgd2VhcG9uX3NlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgfVxyXG5cclxuICB2YXIgcGlja193ZWFwb25fYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBwaWNrX3dlYXBvbl9idXR0b24uaW5uZXJIVE1MID0gXCLQodC80LXQvdC40YLRjCDQvtGA0YPQttC40LVcIjtcclxuICBwaWNrX3dlYXBvbl9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBwaWNrX3dlYXBvbl9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgd2VhcG9uX3NlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhcG9uX2Nob3NlblwiKVxyXG4gICAgdmFyIHdlYXBvbl9pbmRleCA9IHdlYXBvbl9zZWxlY3QudmFsdWVcclxuXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bY2hhcmFjdGVyX251bWJlcl0gPSB3ZWFwb25faW5kZXhcclxuICAgIGNoYXJhY3Rlcl9jaG9zZW4ud2VhcG9uX2lkID0gd2VhcG9uX2luZGV4XHJcblxyXG4gICAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW3dlYXBvbl9pbmRleF1cclxuXHJcbiAgICB3ZWFwb25fbWluaV9kaXNwbGF5LnNyYyA9IHdlYXBvbi5hdmF0YXI7XHJcbiAgfVxyXG5cclxuICB2YXIgZGVmYXVsdF93ZWFwb25faW5kZXggPSBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bY2hhcmFjdGVyX251bWJlcl1cclxuICBjaGFyYWN0ZXJfY2hvc2VuLndlYXBvbl9pZCA9IGRlZmF1bHRfd2VhcG9uX2luZGV4XHJcbiAgdmFyIGRlZmF1bHRfd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bZGVmYXVsdF93ZWFwb25faW5kZXhdXHJcblxyXG4gIHZhciB3ZWFwb25fbWluaV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fbWluaV9kaXNwbGF5XCJcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LnNyYyA9IGRlZmF1bHRfd2VhcG9uLmF2YXRhcjtcclxuICB3ZWFwb25fbWluaV9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzgwcHgnO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzgwcHgnO1xyXG4gIHdlYXBvbl9taW5pX2Rpc3BsYXkub25tb3VzZWVudGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBkZWZhdWx0X3dlYXBvbl9pbmRleCA9IGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGRlZmF1bHRfd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bZGVmYXVsdF93ZWFwb25faW5kZXhdXHJcblxyXG4gICAgdmFyIHdlYXBvbl9yYW5nZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgd2VhcG9uX3JhbmdlX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9yYW5nZV9kaXNwbGF5XCI7XHJcbiAgICB3ZWFwb25fcmFuZ2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCU0LDQu9GM0L3QvtGB0YLRjDogXCIgKyBkZWZhdWx0X3dlYXBvbi5yYW5nZVxyXG5cclxuICAgIHZhciB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9kYW1hZ2VfZGlzcGxheVwiO1xyXG4gICAgd2VhcG9uX2RhbWFnZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KPRgNC+0L06IFwiICsgZGVmYXVsdF93ZWFwb24uZGFtYWdlWzBdICsgJ2QnICsgZGVmYXVsdF93ZWFwb24uZGFtYWdlWzFdXHJcblxyXG4gICAgdmFyIHdlYXBvbl9uYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICB3ZWFwb25fbmFtZV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fbmFtZV9kaXNwbGF5XCI7XHJcbiAgICB3ZWFwb25fbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IGRlZmF1bHRfd2VhcG9uLm5hbWVcclxuXHJcbiAgICB2YXIgd2VhcG9uX2F2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5pZCA9IFwid2VhcG9uX2F2YXRhcl9kaXNwbGF5XCJcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zcmMgPSBkZWZhdWx0X3dlYXBvbi5hdmF0YXI7XHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fbmFtZV9kaXNwbGF5KVxyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fYXZhdGFyX2Rpc3BsYXkpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuYXBwZW5kKHdlYXBvbl9yYW5nZV9kaXNwbGF5KVxyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmFwcGVuZCh3ZWFwb25fZGFtYWdlX2Rpc3BsYXkpXHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuc2hvdygpXHJcbiAgfVxyXG5cclxuICB3ZWFwb25fbWluaV9kaXNwbGF5Lm9ubW91c2VsZWF2ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB3ZWFwb25faW5mb19jb250YWluZXIuaHRtbChcIlwiKVxyXG4gICAgd2VhcG9uX2luZm9fY29udGFpbmVyLmhpZGUoKVxyXG4gIH1cclxuXHJcbiAgYXZhdGFyX2NvbnRhaW5lci5hcHBlbmQod2VhcG9uX21pbmlfZGlzcGxheSlcclxuXHJcbiAgdmFyIGF0dGFja19idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGF0dGFja19idXR0b24uaW5uZXJIVE1MID0gXCLQkNGC0LDQutC+0LLQsNGC0YxcIjtcclxuICBhdHRhY2tfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIG1haW5fYWN0aW9uc19sZWZ0ID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBpZiAobWFpbl9hY3Rpb25zX2xlZnQgPiAwKSB7XHJcbiAgICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fYXR0YWNrKGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCjINCy0LDRgSDQvdC1INC+0YHRgtCw0LvQvtGB0Ywg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciBza2lsbF9zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNraWxsX3NlbGVjdC5pZCA9IFwic2tpbGxfY2hvc2VuXCI7XHJcblxyXG4gIHZhciBza2lsbHNldCA9IGNoYXJhY3Rlci5za2lsbHNldFxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNraWxsc2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gc2tpbGxfbGlzdFtza2lsbHNldFtpXV07XHJcbiAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IHNraWxsc2V0W2ldO1xyXG4gICAgc2tpbGxfc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICB9XHJcblxyXG4gIHZhciBza2lsbF9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHNraWxsX2J1dHRvbi5pbm5lckhUTUwgPSBcItCY0YHQv9C+0LvRjNC30L7QstCw0YLRjCDRg9C80LXQvdC40LVcIjtcclxuICBza2lsbF9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgc2tpbGxfc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbF9jaG9zZW5cIilcclxuICAgIHZhciBza2lsbF9pbmRleCA9IHNraWxsX3NlbGVjdC52YWx1ZVxyXG4gICAgdXNlX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBpbmRleCwgY2VsbClcclxuICB9XHJcblxyXG5cclxuICB2YXIgYnV0dG9uX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgYnV0dG9uX2xpc3QuY2xhc3NOYW1lID0gXCJidXR0b25fbGlzdFwiO1xyXG4gIHZhciBsaW5lMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmUzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG5cclxuICBsaW5lMS5hcHBlbmRDaGlsZChtb3ZlX2J1dHRvbik7XHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICBsaW5lMi5hcHBlbmRDaGlsZChkZWxldGVfYnV0dG9uKTtcclxuICAgIGxpbmUzLmFwcGVuZENoaWxkKGRhbWFnZV9idXR0b24pO1xyXG4gICAgbGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2ZpZWxkKTtcclxuICAgIGxpbmU4LmFwcGVuZENoaWxkKGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24pO1xyXG4gIH1cclxuICBsaW5lNC5hcHBlbmRDaGlsZChzZWFyY2hfYnV0dG9uKTtcclxuICBsaW5lNS5hcHBlbmRDaGlsZChwaWNrX3dlYXBvbl9idXR0b24pO1xyXG4gIGxpbmU1LmFwcGVuZENoaWxkKHdlYXBvbl9zZWxlY3QpO1xyXG4gIGxpbmU2LmFwcGVuZENoaWxkKGF0dGFja19idXR0b24pO1xyXG4gIGxpbmU3LmFwcGVuZENoaWxkKHNpbXBsZV9yb2xsX2J1dHRvbik7XHJcbiAgbGluZTkuYXBwZW5kQ2hpbGQoc2tpbGxfYnV0dG9uKTtcclxuICBsaW5lOS5hcHBlbmRDaGlsZChza2lsbF9zZWxlY3QpO1xyXG5cclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMSk7XHJcbiAgaWYgKG15X3JvbGUgPT0gXCJnbVwiKSB7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMik7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMyk7XHJcbiAgICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lOCk7XHJcbiAgfVxyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU0KTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNSk7XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTYpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU5KTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNyk7XHJcblxyXG4gIGNoYXJhY3Rlcl9pbmZvX2NvbnRhaW5lci5hcHBlbmQoYnV0dG9uX2xpc3QpO1xyXG5cclxufSBlbHNlIHtcclxuICB2YXIgaHBfcGVyY2VudCA9IHBhcnNlRmxvYXQoY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdKS9wYXJzZUZsb2F0KEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgaHBfcGVyY2VudCA9IE1hdGguZmxvb3IoaHBfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIEhQX2Rpc3BsYXkuaWQgPSBcIkhQX2Rpc3BsYXlcIjtcclxuICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBocF9wZXJjZW50ICsgXCIlXCI7XHJcblxyXG4gIHZhciB0aXJlZF9wZXJjZW50ID0gcGFyc2VGbG9hdChjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtjaGFyYWN0ZXJfbnVtYmVyXSkvcGFyc2VGbG9hdChzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0pXHJcbiAgdGlyZWRfcGVyY2VudCA9IE1hdGguZmxvb3IodGlyZWRfcGVyY2VudCoxMDApXHJcblxyXG4gIHZhciB0aXJlZF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaWQgPSBcInRpcmVkX2Rpc3BsYXlcIjtcclxuICB0aXJlZF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JLRi9C90L7RgdC70LjQstC+0YHRgtGMOiBcIiArIHRpcmVkX3BlcmNlbnQgKyBcIiVcIjtcclxuXHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChIUF9kaXNwbGF5KTtcclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKHRpcmVkX2Rpc3BsYXkpO1xyXG59XHJcblxyXG4gIHRpbnlfYW5pbWF0ZV9jb250YWluZXJzKClcclxuXHJcbn1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNob29zZV9jaGFyYWN0ZXJfdG9fYXR0YWNrKGNlbGwpIHtcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPSAyXHJcbiAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL2F0dGFja19wbGFjZWhvbGRlci5qcGdcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5KGNoYXJhY3Rlcl9udW1iZXIpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSBcImNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eVwiO1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblxyXG4gIGlmIChjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAwKSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQubmV3X3ZhbHVlID0gMFxyXG4gIH1cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VhcmNoX2FjdGlvbihzZWFyY2hfYnV0dG9uKSB7XHJcbiAgdmFyIGluZGV4ID0gc2VhcmNoX2J1dHRvbi5pbmRleDtcclxuICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdO1xyXG5cclxuICBpZiAoIShnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSAmJiBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdIDwgMSkpIHtcclxuXHJcbiAgICB2YXIgbmFtZSA9IGNoYXJhY3Rlci5uYW1lO1xyXG4gICAgdmFyIG1vZGlmaWNhdG9yID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaW5kZXhdO1xyXG4gICAgdmFyIGludGVsbGlnZW5jZSA9IGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcbiAgICB2YXIgcm9sbCA9IHJvbGxTZWFyY2gocGFyc2VJbnQoaW50ZWxsaWdlbmNlKSwgcGFyc2VJbnQobW9kaWZpY2F0b3IpKTtcclxuICAgIHZhciB6b25lX251bWJlciA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF07XHJcbiAgICBwdXNoVG9MaXN0KCfQn9C10YDRgdC+0L3QsNC2ICcgKyBuYW1lICsgJyDQsdGA0L7RgdC40LsgJyArIHJvbGwgKyAnINC90LAg0LLQvdC40LzQsNGC0LXQu9GM0L3QvtGB0YLRjCcpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NlYXJjaF9hY3Rpb24nO1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gbmFtZTtcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbDtcclxuICAgIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5wbGF5ZXJfbmFtZSA9IG15X25hbWVcclxuICAgIHRvU2VuZC5taW5lc19kZXRlY3RlZCA9IFtdXHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICB2YXIgbGFuZG1pbmVfY2FuZGlkYXRlcyA9IGluZGV4X2luX3JhZGl1cyhpbmRleCwgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cylcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFuZG1pbmVfY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5jbHVkZXMobGFuZG1pbmVfY2FuZGlkYXRlc1tpXSkpIHtcclxuICAgICAgICAgIHRvU2VuZC5taW5lc19kZXRlY3RlZC5wdXNoKGxhbmRtaW5lX2NhbmRpZGF0ZXNbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQntCx0YvRgdC6INCy0L4g0LLRgNC10LzRjyDQsdC+0Y8g0YHRgtC+0LjRgiDQsdC+0L3Rg9GB0L3QvtC1INC00LXQudGB0YLQstC40LUhXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsU2VhcmNoKGludGVsbGlnZW5jZSwgbW9kKSB7XHJcbiAgcmV0dXJuIGludGVsbGlnZW5jZSArIHJvbGxfeCgyMCkgKyBtb2Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZV9vYmplY3RfY29tbWFuZChpbmRleCkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdkZWxldGVfY2hhcmFjdGVyJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfb2JqZWN0KGV2ZW50KSB7XHJcbiAgY2xlYXJfY29udGFpbmVycygpXHJcblxyXG4gIGRlbGV0ZV9vYmplY3RfY29tbWFuZChldmVudC50YXJnZXQuaW5kZXgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCkge1xyXG4gIGNsZWFyX2NvbnRhaW5lcnMoKVxyXG4gIHZhciBvYnN0YWNsZV9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdICogKC0xKTtcclxuICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW29ic3RhY2xlX2lkXTtcclxuXHJcbiAgLy8ga2VlcCB0cmFjayBvZiBsYXN0IGNob3NlbiBvYnN0YWxlIHRvIHF1aWNrbHkgYWRkIHRvIHRoZSBtYXBcclxuICBsYXN0X29ic3RhY2xlID0gb2JzdGFjbGVfaWRcclxuXHJcbiAgbGV0IG5hbWUgPSBvYnN0YWNsZS5uYW1lO1xyXG4gIGxldCBhdmF0YXIgPSBvYnN0YWNsZS5hdmF0YXI7XHJcblxyXG4gIHZhciBuYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IG5hbWU7XHJcblxyXG4gIHZhciBhdmF0YXJfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3JjID0gYXZhdGFyO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKG5hbWVfZGlzcGxheSk7XHJcbiAgY2hhcmFjdGVyX2luZm9fY29udGFpbmVyLmFwcGVuZChhdmF0YXJfZGlzcGxheSk7XHJcblxyXG4gIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgdmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCj0L3QuNGH0YLQvtC20LjRgtGMXCI7XHJcbiAgICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgICBkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG4gICAgZGVsZXRlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZGVsZXRlX29iamVjdChldmVudCk7XHJcbiAgICB9XHJcbiAgICBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIuYXBwZW5kKGRlbGV0ZV9idXR0b24pO1xyXG4gIH1cclxuXHJcbiAgdGlueV9hbmltYXRlX2NvbnRhaW5lcnMoKVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gY2hvb3NlX2NoYXJhY3Rlcl90b19tb3ZlKGluZGV4LCBjZWxsKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMVxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbiA9IGluZGV4O1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdO1xyXG4gIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9sb2FkaW5nLndlYnBcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5kb19zZWxlY3Rpb24oKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gMFxyXG4gIHZhciBvbGRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvbik7XHJcbiAgb2xkX2NlbGwuc3JjID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXS5hdmF0YXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3BfYXR0YWNrKCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDBcclxuICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24pO1xyXG4gIG9sZF9jZWxsLnNyYyA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZF0uYXZhdGFyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wX3NraWxsKCkge1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uaW5fcHJvY2VzcyA9IDBcclxuICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24pO1xyXG4gIG9sZF9jZWxsLnNyYyA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZF0uYXZhdGFyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfb2JqZWN0X3BpY3R1cmUoaW5kZXhfaW5fYm9hcmRfc3RhdGUpIHtcclxuICB2YXIgaW1hZ2UgPSBFTVBUWV9DRUxMX1BJQztcclxuICB2YXIgaW5kZXhfaW5fYmFzZTtcclxuICBpZiAoaW5kZXhfaW5fYm9hcmRfc3RhdGUgPiAwKSB7XHJcbiAgICBpbmRleF9pbl9iYXNlID0gaW5kZXhfaW5fYm9hcmRfc3RhdGU7XHJcbiAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baW5kZXhfaW5fYmFzZV07XHJcbiAgICBpbWFnZSA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcbiAgfSBlbHNlIGlmIChpbmRleF9pbl9ib2FyZF9zdGF0ZSA8IDApIHtcclxuICAgIGluZGV4X2luX2Jhc2UgPSBpbmRleF9pbl9ib2FyZF9zdGF0ZSAqICgtMSk7XHJcbiAgICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW2luZGV4X2luX2Jhc2VdO1xyXG4gICAgaW1hZ2UgPSBvYnN0YWNsZS5hdmF0YXI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaW1hZ2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVCb2FyZCgpIHtcclxuICB2YXIgc2F2ZV9uYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfbmFtZVwiKS52YWx1ZTtcclxuICB2YXIgZnVsbF9nYW1lX3N0YXRlID0ge1xyXG4gICAgZ2FtZV9zdGF0ZTogZ2FtZV9zdGF0ZSxcclxuICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvOiBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyxcclxuICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm86IG9ic3RhY2xlX2RldGFpbGVkX2luZm8sXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGU6IGNoYXJhY3Rlcl9zdGF0ZVxyXG4gIH07XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdzYXZlX2dhbWUnO1xyXG4gIHRvU2VuZC5zYXZlX25hbWUgPSBzYXZlX25hbWU7XHJcbiAgdG9TZW5kLmZ1bGxfZ2FtZV9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlSW5pdGlhdGl2ZShhZ2lsaXR5KSB7XHJcbiAgcmV0dXJuIGFnaWxpdHkqMiArIHJvbGxfeCgyMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxJbml0aWF0aXZlKCkge1xyXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmUubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuSFBbaV0gPiAwKSB7IC8vIHNvIGNoYXJhY3RlciBpIGlzIHByZXNlbnRcclxuICAgICAgLy8gcmV0cmlldmUgdGhhdCBjaGFyYWN0ZXIncyBhZ2lsaXR5XHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXTtcclxuICAgICAgdmFyIGFnaWxpdHkgPSBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcbiAgICAgIC8vIHJvbGwgaW5pdGlhdGl2ZSBhbmQgYWRkIGFnaWxpdHkgbW9kaWZpY2F0b3JcclxuICAgICAgdmFyIGluaXRpYXRpdmUgPSBjb21wdXRlSW5pdGlhdGl2ZShwYXJzZUludChhZ2lsaXR5KSk7XHJcblxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtpXSA9IGluaXRpYXRpdmU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdyb2xsX2luaXRpYXRpdmUnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmluaXRpYXRpdmVfc3RhdGUgPSBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9nTW9kZUNoYW5nZSgpIHtcclxuICBpZiAoZ21fY29udHJvbF9tb2QgIT0gMSkge1xyXG4gICAgLy8gdHVybiBvbiBmb2cgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMTtcclxuICAgIGZvZ19idXR0b24udGV4dCgn0JLRi9C60Lsg0KLRg9C80LDQvSDQktC+0LnQvdGLJyk7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaV0gPT0gMSkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X2NlbGwuc3JjID0gRk9HX0lNQUdFO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIHR1cm4gb2ZmIGZvZyBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAwO1xyXG4gICAgZm9nX2J1dHRvbi50ZXh0KCfQktC60Lsg0KLRg9C80LDQvSDQktC+0LnQvdGLJyk7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaV0gPT0gMSkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X2NlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB6b25lTW9kZUNoYW5nZSgpIHtcclxuICBpZiAoZ21fY29udHJvbF9tb2QgIT0gMikge1xyXG4gICAgLy8gdHVybiBvbiB6b25lIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDI7XHJcbiAgICB6b25lX2J1dHRvbi50ZXh0KCfQktGL0LrQuyDQl9C+0L3QsNC70YzQvdGL0Lkg0YDQtdC20LjQvCcpO1xyXG4gICAgem9uZV9udW1iZXJfc2VsZWN0LnNob3coKTtcclxuICAgIGZvZ196b25lX2J1dHRvbi5zaG93KCk7XHJcbiAgICB1bmZvZ196b25lX2J1dHRvbi5zaG93KCk7XHJcbiAgICBzZWFyY2hfbW9kaWZpY2F0b3Iuc2hvdygpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaV0gPiAwKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25lX3RleHRfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X3pvbmVfdGV4dC5pbm5lckhUTUwgPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaV0gKyAnKCcgKyBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtpXSArICcpJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBiYWNrIHRvIG5vcm1hbCBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDA7XHJcbiAgICB6b25lX2J1dHRvbi50ZXh0KCfQktC60Lsg0JfQvtC90LDQu9GM0L3Ri9C5INGA0LXQttC40LwnKTtcclxuICAgIHpvbmVfbnVtYmVyX3NlbGVjdC5oaWRlKCk7XHJcbiAgICBmb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG4gICAgdW5mb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG4gICAgc2VhcmNoX21vZGlmaWNhdG9yLmhpZGUoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X3pvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uZV90ZXh0X1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF96b25lX3RleHQuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dDdXJyZW50Wm9uZSgpIHtcclxuICB2YXIgY3VycmVudF96b25lID0gem9uZV9udW1iZXJfc2VsZWN0LnZhbCgpO1xyXG4gIGZvZ1BhcnNlWm9uZSgxLCBjdXJyZW50X3pvbmUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1bmZvZ0N1cnJlbnRab25lKCkge1xyXG4gIGZvZ1BhcnNlWm9uZSgwLCBjdXJyZW50X3pvbmUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dQYXJzZVpvbmUobW9kLCBjdXJyZW50X3pvbmUpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAndXBkYXRlX2ZvZyc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBpZiAobW9kID09IDApIHtcclxuICAgIHRvU2VuZC51cGRhdGVfdHlwZSA9ICdyZW1vdmUnO1xyXG4gIH0gZWxzZSBpZiAobW9kID09IDEpIHtcclxuICAgIHRvU2VuZC51cGRhdGVfdHlwZSA9ICdhZGQnO1xyXG4gIH1cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSAqIGdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldID09IGN1cnJlbnRfem9uZSkge1xyXG4gICAgICB0b1NlbmQuaW5kZXggPSBpO1xyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1c2hUb0xpc3QobWVzc2FnZSkge1xyXG4gIGZvciAobGV0IGk9MTsgaSA8IENIQVRfQ0FTSDsgaSsrKSB7XHJcbiAgICB2YXIgZWxlbWVudF90b19jb3B5ID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyBpICsgJ1wiXScpO1xyXG4gICAgdmFyIGVsZW1lbnRfdG9fcGFzdGUgPSAkKCdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIChpLTEpICsgJ1wiXScpO1xyXG5cclxuICAgIGVsZW1lbnRfdG9fcGFzdGUudGV4dChlbGVtZW50X3RvX2NvcHkudGV4dCgpKTtcclxuICB9XHJcbiAgdmFyIHRvcF9lbGVtZW50ID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyAoQ0hBVF9DQVNILTEpICsgJ1wiXScpO1xyXG4gIHRvcF9lbGVtZW50LnRleHQobWVzc2FnZSk7XHJcblxyXG4gIGlmIChub3RpZmljYXRpb25zX2NvbnRhaW5lci5pcyhcIjpoaWRkZW5cIikpIHtcclxuICAgIGNoYXRfYnV0dG9uLmFkZENsYXNzKFwiaXMtcmVkXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VDaGF0VmlzaWJpbGl0eSgpIHtcclxuICBpZiAoY2hhdF9idXR0b24uaGFzQ2xhc3MoXCJpcy1yZWRcIikpIHtcclxuICAgIGNoYXRfYnV0dG9uLnJlbW92ZUNsYXNzKFwiaXMtcmVkXCIpXHJcbiAgfVxyXG4gIGlmIChub3RpZmljYXRpb25zX2NvbnRhaW5lci5pcyhcIjpoaWRkZW5cIikpIHtcclxuICAgIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLnNob3coKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbm90aWZpY2F0aW9uc19jb250YWluZXIuaGlkZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRfbmV3X3JvdW5kKCkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICduZXdfcm91bmQnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdmFyIHNhdmVfcm9sbCA9IFtdXHJcblxyXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZS5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2ldXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXSAhPT0gdW5kZWZpbmVkICYmIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0gIT09IG51bGwpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBzYXZlX3JvbGxbaV0gPSByb2xsX3goMjApICsgcGFyc2VJbnQoY2hhcmFjdGVyLnN0YW1pbmEpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgdG9TZW5kLnNhdmVfcm9sbF9saXN0ID0gc2F2ZV9yb2xsXHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsX2F0dGFjayh0eXBlLCBhdHRhY2tlciwgdGFyZ2V0LCBhZHZhbnRhZ2VfYm9udXMpIHtcclxuICB2YXIgYWR2YW50YWdlID0gMFxyXG4gIGlmICgodHlwZSA9PSBcInJhbmdlZFwiKXx8KHR5cGUgPT0gXCJlbmVyZ3lcIikpIHtcclxuICAgIGFkdmFudGFnZSA9IGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2F0dGFja2VyXTtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5oYXNPd25Qcm9wZXJ0eShcImFkYXB0aXZlX2ZpZ2h0aW5nXCIpKSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5hZGFwdGl2ZV9maWdodGluZyA9PSAwKSB7XHJcbiAgICAgICAgYWR2YW50YWdlID0gYWR2YW50YWdlICsgMTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCh0YDQsNCx0L7RgtCw0Lsg0YDQtdC50L3QtNC20L7QstGL0Lkg0YHRgtCw0Log0YPQvdC40LLQtdGA0YHQsNC70YzQvdC+0YHRgtC4XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID0gMTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICBhZHZhbnRhZ2UgPSBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2F0dGFja2VyXVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmhhc093blByb3BlcnR5KFwiYWRhcHRpdmVfZmlnaHRpbmdcIikpIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbYXR0YWNrZXJdLmFkYXB0aXZlX2ZpZ2h0aW5nID09IDEpIHtcclxuICAgICAgICBhZHZhbnRhZ2UgPSBhZHZhbnRhZ2UgKyAxO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KHRgNCw0LHQvtGC0LDQuyDQvNC40LvQu9C4INGB0YLQsNC6INGD0L3QuNCy0LXRgNGB0LDQu9GM0L3QvtGB0YLQuFwiKTtcclxuICAgICAgfVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2F0dGFja2VyXS5hZGFwdGl2ZV9maWdodGluZyA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGFkdmFudGFnZSA9IGFkdmFudGFnZSAtIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW3RhcmdldF0gKyBhZHZhbnRhZ2VfYm9udXNcclxuXHJcbiAgdmFyIHJvbGwgPSAwXHJcblxyXG4gIGlmIChhZHZhbnRhZ2UgPj0gMikgeyAvLyDQlNC40LrQvtC1INC/0YDQtdC40LzRg9GJ0LXRgdGC0LLQviA9IDQg0LrRg9Cx0LBcclxuICAgIGNvbnNvbGUubG9nKFwi0JTQuNC60L7QtSDQv9GA0LXQuNC80YPRidC10YHRgtCy0L5cIilcclxuICAgIHZhciByb2xsMSA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMiA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsMyA9IHJvbGxfeCgyMClcclxuICAgIHZhciByb2xsNCA9IHJvbGxfeCgyMClcclxuICAgIHJvbGwgPSBNYXRoLm1heChyb2xsMSwgcm9sbDIsIHJvbGwzLCByb2xsNClcclxuICB9IGVsc2UgaWYgKGFkdmFudGFnZSA9PSAxKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcItCf0YDQtdC40LzRg9GJ0LXRgdGC0LLQvlwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWF4KHJvbGwxLCByb2xsMilcclxuICB9IGVsc2UgaWYgKGFkdmFudGFnZSA9PSAwKSB7XHJcbiAgICByb2xsID0gcm9sbF94KDIwKVxyXG4gIH0gZWxzZSBpZiAoYWR2YW50YWdlID09IC0xKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcItCf0L7QvNC10YXQsFwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWluKHJvbGwxLCByb2xsMilcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coXCLQlNC40LrQsNGPINC/0L7QvNC10YXQsFwiKVxyXG4gICAgdmFyIHJvbGwxID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwyID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGwzID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHJvbGw0ID0gcm9sbF94KDIwKVxyXG4gICAgcm9sbCA9IE1hdGgubWluKHJvbGwxLCByb2xsMiwgcm9sbDMsIHJvbGw0KVxyXG4gIH1cclxuICByZXR1cm4gcm9sbFxyXG59XHJcblxyXG5mdW5jdGlvbiBjb3Zlcl9tb2QoYWNjdW11bGF0ZWRfY292ZXIpIHtcclxuICB2YXIgbW9kID0ge31cclxuICBtb2QuaXNQb3NzaWJsZSA9IHRydWVcclxuICBtb2QuY292ZXJfbGV2ZWwgPSBhY2N1bXVsYXRlZF9jb3ZlclxyXG4gIHN3aXRjaChhY2N1bXVsYXRlZF9jb3Zlcikge1xyXG4gICAgY2FzZSAwOlxyXG4gICAgICBtb2QuYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IDBcclxuICAgICAgbW9kLmFkdmFudGFnZV9ib251cyA9IDBcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6XHJcbiAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMVxyXG4gICAgICBtb2QuYWR2YW50YWdlX2JvbnVzID0gMFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzpcclxuICAgICAgbW9kLmF0dGFja19ib251cyA9IC0yXHJcbiAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAwXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA0OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtMlxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA1OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtM1xyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA2OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtM1xyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA3OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNFxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtMlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA4OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNFxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtM1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA5OlxyXG4gICAgICAgIG1vZC5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgIG1vZC5hZHZhbnRhZ2VfYm9udXMgPSAtM1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgICBtb2QuaXNQb3NzaWJsZSA9IGZhbHNlXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVfY292ZXIoZGlzdGFuY2UsIGNvdmVyKSB7XHJcbiAgdmFyIHJlc3VsdCA9IDBcclxuICBpZiAoZGlzdGFuY2UgPCAwLjE1KSB7XHJcbiAgICByZXN1bHQgPSBjb3ZlclxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjMpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC43NVxyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPCAwLjUpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC41XHJcbiAgfSBlbHNlIGlmIChkaXN0YW5jZSA8IDAuNjUpIHtcclxuICAgIHJlc3VsdCA9IGNvdmVyICogMC4yNVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXN1bHQgPSAwXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpbmVfZnJvbV9lbmRwb2ludHMocG9pbnQxLCBwb2ludDIpIHtcclxuICB2YXIgbGluZSA9IHt9XHJcbiAgbGluZS5hID0gLTEqKHBvaW50MS55IC0gcG9pbnQyLnkpXHJcbiAgbGluZS5iID0gcG9pbnQxLnggLSBwb2ludDIueFxyXG4gIGxpbmUuYyA9IC0xKihsaW5lLmEgKiBwb2ludDIueCArIGxpbmUuYiAqIHBvaW50Mi55KVxyXG4gIHJldHVybiBsaW5lXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3RhbmNlX3RvX2xpbmUoZW5kcG9pbnQxLCBlbmRwb2ludDIsIHNpemUsIHRlc3Rwb2ludCkge1xyXG4gIHZhciBlbmRwb2ludDFfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDEsIHNpemUpXHJcbiAgdmFyIGVuZHBvaW50Ml9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50Miwgc2l6ZSlcclxuICB2YXIgdGVzdHBvaW50X2Nvb3JkID0gaW5kZXhfdG9fY29vcmRpbmF0ZXModGVzdHBvaW50LCBzaXplKVxyXG5cclxuICB2YXIgbGluZSA9IGxpbmVfZnJvbV9lbmRwb2ludHMoZW5kcG9pbnQxX2Nvb3JkLCBlbmRwb2ludDJfY29vcmQpXHJcbiAgY29uc29sZS5sb2cobGluZSlcclxuICBjb25zb2xlLmxvZyh0ZXN0cG9pbnRfY29vcmQpXHJcblxyXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguYWJzKGxpbmUuYSp0ZXN0cG9pbnRfY29vcmQueCArIGxpbmUuYip0ZXN0cG9pbnRfY29vcmQueSArIGxpbmUuYykvTWF0aC5zcXJ0KGxpbmUuYSpsaW5lLmEgKyBsaW5lLmIqbGluZS5iKVxyXG5cclxuICBjb25zb2xlLmxvZyhkaXN0YW5jZSlcclxuICByZXR1cm4gZGlzdGFuY2VcclxufVxyXG5cclxuZnVuY3Rpb24gY2VsbHNfb25fbGluZShlbmRwb2ludDEsIGVuZHBvaW50Miwgc2l6ZSkge1xyXG4gIHZhciBlbmRwb2ludDFfY29vcmQgPSBpbmRleF90b19jb29yZGluYXRlcyhlbmRwb2ludDEsIHNpemUpXHJcbiAgdmFyIGVuZHBvaW50Ml9jb29yZCA9IGluZGV4X3RvX2Nvb3JkaW5hdGVzKGVuZHBvaW50Miwgc2l6ZSlcclxuICB2YXIgbGluZSA9IGxpbmVfZnJvbV9lbmRwb2ludHMoZW5kcG9pbnQxX2Nvb3JkLCBlbmRwb2ludDJfY29vcmQpXHJcblxyXG4gIHZhciBzY2FsZSA9IE1hdGgubWF4KE1hdGguYWJzKGxpbmUuYSksIE1hdGguYWJzKGxpbmUuYikpXHJcbiAgLy8gbmVlZCB0byBiZSByZXZlcnNlZCEgcmVtZW1iZXIgbGluZS5hID0gZGVsdGEgeVxyXG4gIHZhciB4X3N0ZXAgPSBsaW5lLmIvc2NhbGVcclxuICB2YXIgeV9zdGVwID0gLTEqbGluZS5hL3NjYWxlXHJcbiAgdmFyIGN1cnJlbnRfcG9pbnQgPSBlbmRwb2ludDJfY29vcmRcclxuXHJcbiAgdmFyIHNhZmV0eV9pdGVyID0gMFxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBbXVxyXG4gIHdoaWxlIChNYXRoLmFicyhjdXJyZW50X3BvaW50LnggLSBlbmRwb2ludDFfY29vcmQueCkgPiAwLjUgfHwgTWF0aC5hYnMoY3VycmVudF9wb2ludC55IC0gZW5kcG9pbnQxX2Nvb3JkLnkpID4gMC41KSB7XHJcbiAgICB2YXIgY2VpbCA9IHt9XHJcbiAgICBjZWlsLnggPSBNYXRoLmNlaWwoY3VycmVudF9wb2ludC54KVxyXG4gICAgY2VpbC55ID0gTWF0aC5jZWlsKGN1cnJlbnRfcG9pbnQueSlcclxuICAgIHZhciBjZWlsX2luZGV4ID0gY29vcmRfdG9faW5kZXgoY2VpbCwgc2l6ZSlcclxuXHJcbiAgICB2YXIgZmxvb3IgPSB7fVxyXG4gICAgZmxvb3IueCA9IE1hdGguZmxvb3IoY3VycmVudF9wb2ludC54KVxyXG4gICAgZmxvb3IueSA9IE1hdGguZmxvb3IoY3VycmVudF9wb2ludC55KVxyXG4gICAgdmFyIGZsb29yX2luZGV4ID0gY29vcmRfdG9faW5kZXgoZmxvb3IsIHNpemUpXHJcblxyXG5cclxuICAgIGNhbmRpZGF0ZV9jZWxscy5wdXNoKGNlaWxfaW5kZXgpXHJcbiAgICBpZiAoY2VpbF9pbmRleCAhPSBmbG9vcl9pbmRleCkge1xyXG4gICAgICBjYW5kaWRhdGVfY2VsbHMucHVzaChmbG9vcl9pbmRleClcclxuICAgIH1cclxuXHJcbiAgICBjdXJyZW50X3BvaW50LnggPSBjdXJyZW50X3BvaW50LnggICsgeF9zdGVwXHJcbiAgICBjdXJyZW50X3BvaW50LnkgPSBjdXJyZW50X3BvaW50LnkgICsgeV9zdGVwXHJcbiAgICBzYWZldHlfaXRlciA9IHNhZmV0eV9pdGVyICsgMVxyXG4gICAgaWYgKHNhZmV0eV9pdGVyID4gNTApIHtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyhjYW5kaWRhdGVfY2VsbHMpXHJcbiAgcmV0dXJuIGNhbmRpZGF0ZV9jZWxsc1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpIHtcclxuICByZXR1cm4gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxufVxyXG5cclxuZnVuY3Rpb24gcGVyZm9ybV9hdHRhY2soaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9jaG9zZW4ud2VhcG9uX2lkXVxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UpKSB7XHJcblxyXG4gICAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gMFxyXG4gICAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGNlbGxzX29uX2xpbmUodXNlcl9wb3NpdGlvbiwgaW5kZXgsIGdhbWVfc3RhdGUuc2l6ZSlcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBjdXJyZW50X2NlbGwgPSBjYW5kaWRhdGVfY2VsbHNbaV1cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXSA8IDApIHsvLyDRjdGC0L4g0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVxyXG4gICAgICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9bTWF0aC5hYnMoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjdXJyZW50X2NlbGxdKV1cclxuICAgICAgICB2YXIgZGlzdGFuY2UgPSBkaXN0YW5jZV90b19saW5lKHVzZXJfcG9zaXRpb24sIGluZGV4LCBnYW1lX3N0YXRlLnNpemUsIGN1cnJlbnRfY2VsbClcclxuICAgICAgICBhY2N1bXVsYXRlZF9jb3ZlciA9IGFjY3VtdWxhdGVkX2NvdmVyICsgY29tcHV0ZV9jb3ZlcihkaXN0YW5jZSwgb2JzdGFjbGUuY292ZXIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGFjY3VtdWxhdGVkX2NvdmVyID0gTWF0aC5jZWlsKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gICAgdmFyIGNvdmVyX21vZGlmaWVyID0gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG5cclxuXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfS0QgPSBjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3Jlc29sdmVfYXR0YWNrJztcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQuYXR0YWNrZXJfaWQgPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5hdHRhY2tlcl9wb3NpdGlvbiA9IHVzZXJfcG9zaXRpb25cclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmF0dGFja190eXBlID0gd2VhcG9uLnR5cGVcclxuICAgIHRvU2VuZC5jb3Zlcl9sZXZlbCA9IGNvdmVyX21vZGlmaWVyLmNvdmVyX2xldmVsXHJcblxyXG4gICAgaWYgKGNvdmVyX21vZGlmaWVyLmlzUG9zc2libGUpIHtcclxuICAgICAgdmFyIGF0dGFja19yb2xsID0gcm9sbF9hdHRhY2sod2VhcG9uLnR5cGUsIHVzZXJfY2hhcmFjdGVyX251bWJlciwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIsIGNvdmVyX21vZGlmaWVyLmFkdmFudGFnZV9ib251cylcclxuXHJcbiAgICAgIGlmIChhdHRhY2tfcm9sbCA8IDIwKSB7Ly8gbm8gY3JpdFxyXG4gICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgfSBlbHNlIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgICAgICAgIHZhciBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gYXR0YWNrX3JvbGwgKyBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLnN0cmVuZ3RoKVxyXG4gICAgICAgIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJlbmVyZ3lcIikge1xyXG4gICAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIDIqcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYXR0YWNrX2JvbnVzID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgdmFyIHVuaXZlcnNhbF9ib251cyA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgICAgICBjdW11bGF0aXZlX2F0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCArIGF0dGFja19ib251cyArIHVuaXZlcnNhbF9ib251cyArIGNvdmVyX21vZGlmaWVyLmF0dGFja19ib251c1xyXG5cclxuICAgICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsXHJcblxyXG4gICAgICAgIGlmIChjdW11bGF0aXZlX2F0dGFja19yb2xsID4gdGFyZ2V0X2NoYXJhY3Rlcl9LRCkgey8vINCV0YHRgtGMINC/0YDQvtCx0LjRgtC40LVcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBldmFkZV9yb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KHRhcmdldF9jaGFyYWN0ZXIuYWdpbGl0eSkgKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgICB0b1NlbmQuZXZhZGVfcm9sbCA9IGV2YWRlX3JvbGxcclxuICAgICAgICAgICAgaWYgKGV2YWRlX3JvbGwgPiBjdW11bGF0aXZlX2F0dGFja19yb2xsKSB7IC8vc3VjY2VzZnVsbHkgZXZhZGVkXHJcbiAgICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImV2YWRlZFwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcIktEX2Jsb2NrXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7IC8vIGZ1bGwgY3JpdFxyXG4gICAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsXHJcbiAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmdWxsX2NyaXRcIlxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZ1bGxfY292ZXJcIlxyXG4gIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+Li4uXCIpXHJcbiAgfVxyXG4gIHN0b3BfYXR0YWNrKClcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCBjaGFyYWN0ZXJfbnVtYmVyLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X251bWJlcikge1xyXG4gIHZhciBkYW1hZ2UgPSAwXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwic25pcGVyXCIpIHtcclxuICAgIGlmIChhdHRhY2tfcm9sbCA8IDE2KSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KHdlYXBvbi5kYW1hZ2VbMV0pXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgICAgIH1cclxuICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJ3ZWFrc3BvdFwiKSAmJiBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9udW1iZXJdLndlYWtzcG90Lmh1bnRlcl9pZCA9PSBjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgICAgICAgc3dpdGNoIChhdHRhY2tfcm9sbCkge1xyXG4gICAgICAgICAgY2FzZSAxODpcclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqMlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMTk6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjJcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICBpZiAod2VhcG9uLnR5cGUgPT0gJ21lbGVlJykge1xyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqNVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBpZiAod2VhcG9uLnR5cGUgPT0gJ21lbGVlJykge1xyXG4gICAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3aXRjaCAoYXR0YWNrX3JvbGwpIHtcclxuICAgICAgICAgIGNhc2UgMTg6XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE5OlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKV1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSoyXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjNcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VhcG9uLmRhbWFnZVswXTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAxOSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlYXBvbi5kYW1hZ2VbMF07IGkrKykge1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgfVxyXG4gICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgfVxyXG4gICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIGlmIChhdHRhY2tfcm9sbCA9PSAyMCkge1xyXG4gICAgICBkYW1hZ2UgPSBkYW1hZ2UgKiAyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGFtYWdlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdlYWtfc3BvdChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcblxyXG4gIHZhciBpbnRfY2hlY2sgPSByb2xsX3goMjApICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGludF9jaGVjayA+PSB3ZWFrX3Nwb3RfdGhyZXNob2xkKSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgfSBlbHNlIHtcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICB9XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZWFsKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgaGVhbF9yYW5nZSkpIHtcclxuXHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgaGVhbGVyX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdGFyZ2V0X2hwID0gY2hhcmFjdGVyX3N0YXRlLkhQW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0YXJnZXRfZnVsbF9ocCA9IEhQX3ZhbHVlc1t0YXJnZXRfY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgdmFyIHJhdGlvID0gcGFyc2VGbG9hdCh0YXJnZXRfaHApL3BhcnNlRmxvYXQodGFyZ2V0X2Z1bGxfaHApXHJcblxyXG4gIHZhciBoZWFsX3JvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoaGVhbGVyX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgIGhlYWxfcm9sbCA9IGhlYWxfcm9sbCArIHBhcnNlSW50KGhlYWxlcl9jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLmhlYWxfcm9sbCA9IGhlYWxfcm9sbFxyXG5cclxuICB2YXIgdGhyZXNob2xkID0gMFxyXG4gIHZhciBjcml0aWNhbF90aHJlc2hvbGQgPSAwXHJcblxyXG4gIGlmIChyYXRpbyA+IDAuOSkge1xyXG4gICAgdGhyZXNob2xkID0gMTBcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC43NSkge1xyXG4gICAgdGhyZXNob2xkID0gMTVcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gdGFyZ2V0X2Z1bGxfaHBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjk1KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjBcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDI5XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuOTUpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC44MilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjMpIHtcclxuICAgIHRocmVzaG9sZCA9IDIzXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSAzMlxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjgyKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC4xNSkge1xyXG4gICAgdGhyZXNob2xkID0gMjZcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDM1XHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNjIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC40KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuMDUpIHtcclxuICAgIHRocmVzaG9sZCA9IDMwXHJcbiAgICBjcml0aWNhbF90aHJlc2hvbGQgPSA0MFxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICBpZiAoaGVhbF9yb2xsID4gY3JpdGljYWxfdGhyZXNob2xkICYmIGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiY3JpdGljYWwgc3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjQpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC4yMilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgfVxyXG5cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0J3Rg9C20L3QviDQv9C+0LTQvtC50YLQuCDQsdC70LjQttC1INC6INGG0LXQu9C4INGH0YLQvtCx0Ysg0LLRi9C70LXRh9C40YLRjFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYmlnX2JybyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGJpZ19icm9fcmFuZ2UpKSB7XHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuXHJcbiAgdmFyIHNoaWVsZF9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSkgKyBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICB2YXIgdGFyZ2V0X0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuXHJcbiAgdmFyIGJvbnVzX0tEID0gTWF0aC5tYXgoc2hpZWxkX0tEIC0gIHRhcmdldF9LRCwgMClcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5ib251c19LRCA9IGJvbnVzX0tEXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0gZWxzZSB7XHJcbiAgYWxlcnQoXCLQkdC+0LvRjNGI0L7QuSDQsdGA0LDRgiDQvdC1INC00L7RgdGC0LDQtdGCINC00L4g0LzQsNC70L7Qs9C+IVwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRhbWFnZV9za2lsbF90ZW1wbGF0ZSh0YXJnZXRfcG9zLCB1c2VyX3BvcywgcmFuZ2UsIHVzZXJfaWQsIHNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbikge1xyXG4gIGlmIChpc0luUmFuZ2UodGFyZ2V0X3BvcywgdXNlcl9wb3MsIHJhbmdlKSkge1xyXG5cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdGFyZ2V0X3Bvc11cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaWRdXHJcblxyXG4gICAgdmFyIGFjY3VtdWxhdGVkX2NvdmVyID0gMFxyXG4gICAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGNlbGxzX29uX2xpbmUodXNlcl9wb3MsIHRhcmdldF9wb3MsIGdhbWVfc3RhdGUuc2l6ZSlcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBjdXJyZW50X2NlbGwgPSBjYW5kaWRhdGVfY2VsbHNbaV1cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY3VycmVudF9jZWxsXSA8IDApIHsvLyDRjdGC0L4g0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVxyXG4gICAgICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9bTWF0aC5hYnMoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjdXJyZW50X2NlbGxdKV1cclxuICAgICAgICB2YXIgZGlzdGFuY2UgPSBkaXN0YW5jZV90b19saW5lKHVzZXJfcG9zLCB0YXJnZXRfcG9zLCBnYW1lX3N0YXRlLnNpemUsIGN1cnJlbnRfY2VsbClcclxuICAgICAgICBhY2N1bXVsYXRlZF9jb3ZlciA9IGFjY3VtdWxhdGVkX2NvdmVyICsgY29tcHV0ZV9jb3ZlcihkaXN0YW5jZSwgb2JzdGFjbGUuY292ZXIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGFjY3VtdWxhdGVkX2NvdmVyID0gTWF0aC5jZWlsKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG4gICAgdmFyIGNvdmVyX21vZGlmaWVyID0gY292ZXJfbW9kKGFjY3VtdWxhdGVkX2NvdmVyKVxyXG5cclxuICAgIHZhciBhdHRhY2tfcm9sbCA9IHJvbGxfYXR0YWNrKHdlYXBvbi50eXBlLCB1c2VyX2lkLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlciwgY292ZXJfbW9kaWZpZXIuYWR2YW50YWdlX2JvbnVzKVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2lkXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAyMCkgey8vIG5vIGNyaXRcclxuICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIGJvbnVzX2F0dGFja1xyXG5cclxuICAgICAgdG9TZW5kLmF0dGFja19yb2xsID0gY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbFxyXG5cclxuICAgICAgaWYgKGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPiB0YXJnZXRfY2hhcmFjdGVyX0tEKSB7Ly8g0JXRgdGC0Ywg0L/RgNC+0LHQuNGC0LjQtVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9PSAxKSB7XHJcbiAgICAgICAgICB2YXIgZXZhZGVfcm9sbCA9IHJvbGxfeCgyMCkgKyBwYXJzZUludCh0YXJnZXRfY2hhcmFjdGVyLmFnaWxpdHkpICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIHRvU2VuZC5ldmFkZV9yb2xsID0gZXZhZGVfcm9sbFxyXG4gICAgICAgICAgaWYgKGV2YWRlX3JvbGwgPiBjdW11bGF0aXZlX2F0dGFja19yb2xsKSB7IC8vc3VjY2VzZnVsbHkgZXZhZGVkXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJldmFkZWRcIlxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB1c2VyX2lkLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9pZCwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcIktEX2Jsb2NrXCJcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHsgLy8gZnVsbCBjcml0XHJcbiAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsXHJcbiAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdXNlcl9pZCwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jcml0XCJcclxuICAgIH1cclxuICAgIHJldHVybiB0b1NlbmRcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG59XHJcblxyXG4vLyBpbmNyZWFzZSBhdHRhY2sgcm9sbCBieSBhZ2lsaXR5IGJvbnVzICgyKm1vZClcclxuZnVuY3Rpb24gY3V0X2xpbWJzKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGJvbnVzX2F0dGFjayA9IDIqcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5hZ2lsaXR5KSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSBkYW1hZ2Vfc2tpbGxfdGVtcGxhdGUoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHdlYXBvbi5yYW5nZSwgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyLCBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkLCBib251c19hdHRhY2ssIHdlYXBvbilcclxuICAgIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSB0b1NlbmQuZGFtYWdlX3JvbGxcclxuICAgICAgICB2YXIgZmxhdF9kYW1hZ2UgPSBkYW1hZ2Vfcm9sbCAtIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5zdHJlbmd0aCldIC0gY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgdmFyIGZ1bGxfZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICBpZiAoZmxhdF9kYW1hZ2UgPiBmdWxsX2RhbWFnZS8zKSB7XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgfSAgZWxzZSB7XHJcbiAgICAgICAgICB0b1NlbmQuc2tpbGxfb3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgICAgfVxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQv9C+0LTRgNC10LfQsNGC0Ywg0YHRg9GF0L7QttC40LvRjNGPINGN0YLQuNC8INC+0YDRg9C20LjQtdC8XCIpXHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1bmNoX3JhaW5mYWxsKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIGlmICh3ZWFwb24udHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIHRhcmdldF9jaGFyX2lkID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJfaWRdXHJcbiAgICB2YXIgYm9udXNfYXR0YWNrID0gcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5hZ2lsaXR5KSArIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXSArIGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICAgIHZhciB0b3RhbF9kYW1hZ2UgPSAwO1xyXG4gICAgdmFyIGF0dGFja3Nfc3VjY2Vzc2Z1bCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdOyBpKyspIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uKVxyXG4gICAgICBpZiAodG9TZW5kID09IG51bGwpIHtcclxuICAgICAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICh0b1NlbmQub3V0Y29tZSA9PSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCIgfHwgdG9TZW5kLm91dGNvbWUgPT0gXCJmdWxsX2NyaXRcIikge1xyXG4gICAgICAgICAgICBhdHRhY2tzX3N1Y2Nlc3NmdWwgPSBhdHRhY2tzX3N1Y2Nlc3NmdWwgKyAxO1xyXG4gICAgICAgICAgICB0b3RhbF9kYW1hZ2UgPSB0b3RhbF9kYW1hZ2UgKyB0b1NlbmQuZGFtYWdlX3JvbGw7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJfaWRdID0gMDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJldmFkZWRcIiAmJiB0YXJnZXRfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSAhPSBcInJvZ3VlXCIpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVt0YXJnZXRfY2hhcl9pZF0gPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG11bHRpcGx5ZXIgPSAxLjAgKyBwYXJzZUZsb2F0KGF0dGFja3Nfc3VjY2Vzc2Z1bCAtIDEpLzIuMFxyXG4gICAgdmFyIG1lc3NhZ2UgPSBcItCc0L3QvtC20LjRgtC10LvRjCDQs9GA0LDQtNCwINCx0YvQuzogXCIgKyBtdWx0aXBseWVyXHJcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxyXG4gICAgdmFyIGZpbmFsX2RhbWFnZSA9IHBhcnNlSW50KHBhcnNlRmxvYXQodG90YWxfZGFtYWdlKSptdWx0aXBseWVyKVxyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyX2lkXHJcbiAgICB0b1NlbmQudG90YWxfYXR0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB0b1NlbmQuc3VjY2Vzc2Z1bGxfYXR0YWNrcyA9IGF0dGFja3Nfc3VjY2Vzc2Z1bFxyXG4gICAgdG9TZW5kLmRhbWFnZSA9IGZpbmFsX2RhbWFnZVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCT0YDQsNC0INGD0LTQsNGA0L7QsiDQvNC+0LbQvdC+INGB0L7QstGA0LXRiNC40YLRjCDRgtC+0LvRjNC60L4g0YDRg9C60L7Qv9Cw0YjQvdGL0Lwg0L7RgNGD0LbQuNC10LwhXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG9ja193YXZlKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvblt1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXVxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBib251c19hdHRhY2sgPSBwYXJzZUludChhdHRhY2tpbmdfY2hhcmFjdGVyLmludGVsbGlnZW5jZSkgKyBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0gKyBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IGRhbWFnZV9za2lsbF90ZW1wbGF0ZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlLCB1c2VyX2NoYXJhY3Rlcl9udW1iZXIsIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQsIGJvbnVzX2F0dGFjaywgd2VhcG9uKVxyXG4gIGlmICh0b1NlbmQgPT0gbnVsbCkge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAodG9TZW5kLm91dGNvbWUgPT0gXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiIHx8IHRvU2VuZC5vdXRjb21lID09IFwiZnVsbF9jcml0XCIpIHtcclxuICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZXZvdXIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCAxKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciBzdGFja3MgPSAwXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgIHN0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLk1hcmt1c19zdGFja3NcclxuICAgIH1cclxuICAgIHZhciBkYW1hZ2UgPSBzdGFja3MqNSArIHJvbGxfeCgxMClcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWJzb2x1dGVfcmVjb3ZlcnkoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB1c2VyX3Bvc2l0aW9uLCAxKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciBoZWFsX2Ftb3VudCA9IDBcclxuXHJcbiAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW1hZ2VfZmllbGRcIik7XHJcbiAgICBpZiAoIShkYW1hZ2VfZmllbGQudmFsdWUgPT09IFwiXCIpKSB7XHJcbiAgICAgIGhlYWxfYW1vdW50ID0gcGFyc2VJbnQoZGFtYWdlX2ZpZWxkLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYmlvcG9vbCA9IDBcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJiaW9wb29sXCIpKSB7XHJcbiAgICAgIGJpb3Bvb2wgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfY2hhcmFjdGVyX251bWJlcl0uYmlvcG9vbFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChoZWFsX2Ftb3VudCA+IDAgJiYgYmlvcG9vbCA+PSBoZWFsX2Ftb3VudCkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdG9TZW5kLmhlYWxfYW1vdW50ID0gaGVhbF9hbW91bnRcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LXQstC+0LfQvNC+0LbQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQu9C10YfQtdC90LjRj1wiKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnYXNfYm9tYihpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRocm93X3JhbmdlID0gZmluZFRocm93UmFuZ2UoY2hhcmFjdGVyKVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHRocm93X3JhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG4gICAgdG9TZW5kLnRocmVzaG9sZCA9IGdhc19ib21iX3RocmVzaG9sZFxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIGdhc19ib21iX29ic3RhY2xlKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCc0LDQu9C+INC60LDRiNC4INC10LvQuCDQtNC70Y8g0YLQsNC60L7Qs9C+INCx0YDQvtGB0LrQsFwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGlmZnVzZV9sYW5kbWluZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX3Bvc2l0aW9uID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX3Bvc2l0aW9uXHJcbiAgdmFyIHVzZXJfY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgbGFuZG1pbmVfZGV0ZWN0aW9uX3JhZGl1cykpIHtcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICB0b1NlbmQudXNlcl9pbmRleCA9IHVzZXJfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJlbXB0eVwiXHJcblxyXG4gICAgaWYgKGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmNsdWRlcyhpbmRleCkpIHtcclxuICAgICAgdmFyIHJvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoY2hhcmFjdGVyLmludGVsbGlnZW5jZSlcclxuICAgICAgaWYgKHJvbGwgPiBsYW5kbWluZV9kaWZmdXNlX3RocmVzaG9sZCkge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCh0LvQuNGI0LrQvtC8INC00LDQu9C10LrQviDQtNC70Y8g0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0LjRj1wiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFRocm93UmFuZ2UoY2hhcmFjdGVyKSB7XHJcbiAgcmV0dXJuIHRocm93X2Jhc2VfcmFuZ2UgKyBwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpKjJcclxufVxyXG5cclxuZnVuY3Rpb24gYWNpZF9ib21iKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuICB2YXIgdGhyb3dfcmFuZ2UgPSBmaW5kVGhyb3dSYW5nZShjaGFyYWN0ZXIpXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgdGhyb3dfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5wb3NpdGlvbiA9IGluZGV4XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQnNCw0LvQviDQutCw0YjQuCDQtdC70Lgg0LTQu9GPINGC0LDQutC+0LPQviDQsdGA0L7RgdC60LBcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpZ2h0X3NvdW5kX2JvbWIoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgbGlnaHRfc291bmRfYm9tYl9yYW5nZSkpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgdG9TZW5kLnBvc2l0aW9uID0gaW5kZXhcclxuXHJcbiAgdmFyIGNoYXJhY3Rlcl9saXN0ID0gW11cclxuICB2YXIgb3V0Y29tZV9saXN0ID0gW11cclxuXHJcbiAgdmFyIHJhZGl1cyA9IGxpZ2h0X3NvdW5kX2JvbWJfcmFkaXVzXHJcblxyXG4gIHZhciBjYW5kaWRhdGVfY2VsbHMgPSBpbmRleF9pbl9yYWRpdXMoaW5kZXgsIHJhZGl1cylcclxuICBjb25zb2xlLmxvZyhjYW5kaWRhdGVfY2VsbHMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0LHQvtC80LHRi1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlICE9PSBcImRyb25lXCIpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfbGlzdC5wdXNoKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgIHZhciBzYXZlX3JvbGwgPSByb2xsX3goMjApICsgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gKyBwYXJzZUludChjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gICAgICAgIGlmIChzYXZlX3JvbGwgPiBsaWdodF9zb3VuZF9ib21iX3RocmVzaG9sZCkge1xyXG4gICAgICAgICAgb3V0Y29tZV9saXN0LnB1c2goMClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb3V0Y29tZV9saXN0LnB1c2goMSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9saXN0ID0gY2hhcmFjdGVyX2xpc3RcclxuICB0b1NlbmQub3V0Y29tZV9saXN0ID0gb3V0Y29tZV9saXN0XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59IGVsc2Uge1xyXG4gIGFsZXJ0KFwi0JTRgNC+0L0g0L3QtSDQtNC+0LrQuNC90LXRglwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcmNlX2ZpZWxkKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHVzZXJfcG9zaXRpb24gPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICB2YXIgdXNlcl9jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX2Nob3Nlbi5jaGFyX2lkXHJcblxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGZvcmNlX2ZpZWxkX3JhbmdlKSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQucG9zaXRpb24gPSBpbmRleFxyXG5cclxuICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgdmFyIHNoaWVsZCA9IE1hdGguY2VpbChwYXJzZUZsb2F0KEhQX3ZhbHVlc1t1c2VyLnN0YW1pbmFdKS8yKVxyXG4gIHRvU2VuZC5zaGllbGQgPSBzaGllbGRcclxuXHJcbiAgdmFyIGNoYXJhY3Rlcl9saXN0ID0gW11cclxuXHJcbiAgdmFyIHJhZGl1cyA9IGZvcmNlX2ZpZWxkX3JhZGl1c1xyXG5cclxuICB2YXIgY2FuZGlkYXRlX2NlbGxzID0gaW5kZXhfaW5fcmFkaXVzKGluZGV4LCByYWRpdXMpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVfY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2FuZGlkYXRlX2NlbGxzW2ldXVxyXG4gICAgaWYgKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID4gMCkgey8vINC/0LXRgNGB0L7QvdCw0LYg0LIg0YDQsNC00LjRg9GB0LUg0YnQuNGC0LBcclxuICAgICAgICBjaGFyYWN0ZXJfbGlzdC5wdXNoKHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgfVxyXG4gIH1cclxuICB0b1NlbmQuY2VsbHNfcHJvdGVjdGVkID0gY2FuZGlkYXRlX2NlbGxzXHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9saXN0ID0gY2hhcmFjdGVyX2xpc3RcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgYWRkX29ic3RhY2xlX2NvbW1hbmQoaW5kZXgsIGZvcmNlX2ZpZWxkX29ic3RhY2xlKVxyXG59IGVsc2Uge1xyXG4gIGFsZXJ0KFwi0JPQtdC90LXRgNCw0YLQvtGAINC00L7Qu9C20LXQvSDQsdGL0YLRjCDRg9GB0YLQsNC90L7QstC70LXQvSDQv9C+0LHQu9C40LbQtVwiKVxyXG59XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkcmVuYWxpbmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciBhZHJlbmFsaW5lX3JhbmdlID0gMVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIGFkcmVuYWxpbmVfcmFuZ2UpKSB7XHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnVzZXJfaW5kZXggPSB1c2VyX2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC50YXJnZXRfaW5kZXggPSB0YXJnZXRfbnVtYmVyXHJcbiAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IHJvbGxfeCg0KVxyXG4gICAgdmFyIG1pbnVzX2FjdGlvbnMgPSByb2xsX3goNClcclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgdG9TZW5kLm1pbnVzX2FjdGlvbnMgPSBtaW51c19hY3Rpb25zXHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvlwiKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcG9pc29ub3VzX2FkcmVuYWxpbmUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHVzZXJfcG9zaXRpb24sIHBvaXNvbm91c19hZHJlbmFsaW5lX3JhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2luZGV4ID0gdGFyZ2V0X251bWJlclxyXG4gICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBbXVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbjsgaSsrKSB7XHJcbiAgICAgIGV4dHJhX2FjdGlvbnMucHVzaChyb2xsX3goNCkpXHJcbiAgICB9XHJcbiAgICB0b1NlbmQuZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnNcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCg0LDQtNC40YPRgSDQsNC00YDQtdC90LDQu9C40L3QsCAxINC60LvQtdGC0LrQsCFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBpY2hfcGljaF9nbyhpbmRleCwgY2VsbCkge1xyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuXHJcbiAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgdmFyIHRhcmdldF9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfbnVtYmVyXVxyXG4gIGlmICh0YXJnZXQuc3BlY2lhbF90eXBlID09IFwiZHJvbmVcIikge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWRcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2luZGV4ID0gdGFyZ2V0X251bWJlclxyXG4gICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBNYXRoLmNlaWwocGFyc2VGbG9hdCh1c2VyLmludGVsbGlnZW5jZSkvMilcclxuICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9uc1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC80L7QttC10YLQtSDQv9GL0Ykt0L/Ri9GJINC60L7Qs9C+INC/0L7Qv9Cw0LvQviFcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGx1Y2t5X3Nob3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbF94KDEwKVxyXG4gICAgaWYgKHRvU2VuZC5yb2xsID09IDcpIHtcclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IHJvbGxfeCg3KVxyXG4gICAgfVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChcItCU0LDQu9C10LrQvtCy0LDRgtC+XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb3R0ZXJ5X3Nob3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdXNlcl9wb3NpdGlvbiA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9wb3NpdGlvblxyXG4gIHZhciB1c2VyX2NoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfaWRcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXV1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdXNlcl9wb3NpdGlvbiwgd2VhcG9uLnJhbmdlKSkge1xyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgdG9TZW5kLnNraWxsX2luZGV4ID0gY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC51c2VyX2luZGV4ID0gdXNlcl9jaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbF94KDEwMClcclxuICAgIGlmICh0b1NlbmQucm9sbCA9PSA3KSB7XHJcbiAgICAgIHZhciBkYW1hZ2UgPSAwXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgcm9sbF94KDcpXHJcbiAgICAgIH1cclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZVxyXG4gICAgfSBlbHNlIGlmICh0b1NlbmQucm9sbCA9PSA3Nykge1xyXG4gICAgICB2YXIgZGFtYWdlID0gMFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE0OyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3goNylcclxuICAgICAgfVxyXG4gICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlXHJcbiAgICB9XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpIHtcclxuICBzd2l0Y2goY2hhcmFjdGVyX2Nob3Nlbi5za2lsbF9pZCkge1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICBhZHJlbmFsaW5lKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6IC8vINCf0L7QtNGA0LXQt9Cw0YLRjCDRgdGD0YXQvtC20LjQu9C40Y9cclxuICAgICAgY3V0X2xpbWJzKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM6IC8vINCh0LvQsNCx0L7QtSDQvNC10YHRgtC+XHJcbiAgICAgIHdlYWtfc3BvdChpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA0OiAvLyDQm9C10YfQtdC90LjQtVxyXG4gICAgICBoZWFsKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDU6IC8vINCb0LXRh9C10L3QuNC1XHJcbiAgICAgIGJpZ19icm8oaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNzogLy8g0L/QvtC20LjRgNCw0L3QuNC1XHJcbiAgICAgIGRldm91cihpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA5OlxyXG4gICAgICBhYnNvbHV0ZV9yZWNvdmVyeShpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxMjpcclxuICAgICAgZ2FzX2JvbWIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTM6XHJcbiAgICAgIGxpZ2h0X3NvdW5kX2JvbWIoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTQ6XHJcbiAgICAgIHNob2NrX3dhdmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTU6XHJcbiAgICAgIHBpY2hfcGljaF9nbyhpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNjpcclxuICAgICAgZm9yY2VfZmllbGQoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDE5OlxyXG4gICAgICBsdWNreV9zaG90KGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMDpcclxuICAgICAgbG90dGVyeV9zaG90KGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMjpcclxuICAgICAgcHVuY2hfcmFpbmZhbGwoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDIzOlxyXG4gICAgICBwb2lzb25vdXNfYWRyZW5hbGluZShpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjQ6XHJcbiAgICAgIGFjaWRfYm9tYihpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjY6XHJcbiAgICAgIGRpZmZ1c2VfbGFuZG1pbmUoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBhbGVydChcIlVua25vd24gdGFyZ2V0ZWQgc2tpbGxcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZV9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpIHtcclxuICBza2lsbF9pbmRleCA9IHBhcnNlSW50KHNraWxsX2luZGV4KVxyXG4gIHN3aXRjaChza2lsbF9pbmRleCkge1xyXG4gICAgY2FzZSAwOiAvL9Cg0YvQstC+0LpcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDE6IC8v0J/RgNC40LvQuNCyINCQ0LTRgNC10L3QsNC70LjQvdCwXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWRyZW5hbGluZV91c2VyXCIpKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMjogLy8g0J/QvtC00YDQtdC30LDRgtGMINGB0YPRhdC+0LbQuNC70LjRj1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzogLy8g0KHQu9Cw0LHQvtC1INC80LXRgdGC0L5cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA0OiAvLyDQm9C10YfQtdC90LjQtVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNTogLy8g0JHQvtC70YzRiNC+0Lkg0LHRgNCw0YJcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA2OiAvLyDQn9C+0LTQvdGP0YLRjCDRidC40YLRi1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG5cclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJzaGllbGRfdXBcIikpIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic2hpZWxkX2Rvd25cIlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzaGllbGRfdXBcIlxyXG4gICAgICB9XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDc6IC8vINC/0L7QttC40YDQsNC90LjQtSDRgdGD0YnQvdC+0YHRgtC4XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA4OiAvLyDRg9C30L3QsNGC0Ywg0LHQuNC+0L/Rg9C7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYmlvcG9vbFwiKSkge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QsNC60L7Qv9C70LXQvdC90YvQuSDQsdC40L7Qv9GD0Ls6IFwiICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5iaW9wb29sKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QsNC60L7Qv9C70LXQvdC90YvQuSDQsdC40L7Qv9GD0Lsg0L7RgtGB0YPRgtGB0YLQstGD0LXRglwiKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgOTogLy8g0LHQtdC30YPQv9GA0LXRh9C90L7QtSDQstC+0YHRgdGC0LDQvdC+0LLQu9C10L3QuNC1XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTA6IC8vINC+0LHRi9GH0L3QvtC1INCyINCx0L7QvdGD0YHQvdC+0LVcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0L7RgdC90L7QstC90YvRhSDQtNC10LnRgdGC0LLQuNC5LCDRh9GC0L7QsdGLINC/0YDQtdCy0YDQsNGC0LjRgtGMINCyINCx0L7QvdGD0YHQvdGL0LUhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDExOiAvLyDQvtGC0LTRi9GFXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtjaGFyYWN0ZXJfbnVtYmVyXSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdfc3RhbWluYSA9IE1hdGgubWluKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2NoYXJhY3Rlcl9udW1iZXJdICsgcmVzdF9zdGFtaW5hX2dhaW4sIHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2NoYXJhY3Rlcl9udW1iZXJdLnN0YW1pbmFdKVxyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgICAgdG9TZW5kLm5ld19zdGFtaW5hID0gbmV3X3N0YW1pbmFcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQktGLINGD0LbQtSDRgdC+0LLQtdGA0YjQsNC70Lgg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGN0YLQvtC8INGF0L7QtNGDLCDRgtCw0Log0YfRgtC+INC90LUg0LzQvtC20LXRgtC1INC+0YLQtNC+0YXQvdGD0YLRjFwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMTI6IC8vINCz0LDQt9C+0LLQsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0KMg0LPRgNCw0L3QsNGC0Ysg0LrRg9C70LTQsNGD0L0gKNCz0LDQtyDRjdGN0Y0g0LfQsNCy0LDRgNC40LLQsNC10YLRgdGPLCDRhdC3KVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDEzOiAvLyDRgdCy0LXRgtC+0YjRg9C80L7QstCw0Y8g0LPRgNCw0L3QsNGC0LBcclxuICAgICAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImxpZ2h0X3NvdW5kX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCAmJiBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KFwi0JPRgNCw0L3QsNGC0LAg0LXRidC1INC90LUg0LPQvtGC0L7QstCwXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNDogLy8g0KjQvtC60L7QstGL0Lkg0LjQvNC/0YPQu9GM0YFcclxuICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxNTogLy8g0J/Ri9GJLdC/0YvRiS3Qs9C+XHJcbiAgICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcInBpY2hfcGljaF91c2VyXCIpKSB7XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J/Ri9GJINC/0YvRiSDQtdGJ0LUg0L3QsCDQv9C10YDQtdC30LDRgNGP0LTQutC1IVwiKVxyXG4gICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxNjogLy8g0KHQuNC70L7QstC+0LUg0L/QvtC70LVcclxuICAgICAgICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJmb3JjZV9maWVsZF91c2VyXCIpKSB7XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDAgJiYgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCT0LXQvdC10YDQsNGC0L7RgCDRgdC40LvQvtCy0L7Qs9C+INC/0L7Qu9GPINC10YnQtSDQvdC1INC30LDRgNGP0LTQuNC70YHRjyFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAxNzogLy8g0JjQvdCy0LjQt1xyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleDtcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICAgICAgICB0b1NlbmQudXNlcm5hbWUgPSBteV9uYW1lO1xyXG4gICAgICAgICAgICB0b1NlbmQucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgMTg6IC8vINCR0L7QtdCy0LDRjyDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcclxuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4O1xyXG4gICAgICAgICAgICB0b1NlbmQudXNlcl9pbmRleCA9IGNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDE5OiAvLyDQm9Cw0LrQuCDRiNC+0YJcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMDogLy8g0JvQvtGC0LXRgNC10LnQvdGL0Lkg0LLRi9GB0YLRgNC10LtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSAyMTogLy/Qn9GA0LjQu9C40LIg0LTQtdC50YHRgtCy0LjQuVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFjdGlvbl9zcGxhc2hcIikpIHtcclxuICAgICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtVwiKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgIHRvU2VuZC51c2VyX2luZGV4ID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgIHRvU2VuZC5leHRyYV9hY3Rpb25zID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICBjYXNlIDIyOiAvLyDQs9GA0LDQtCDRg9C00LDRgNC+0LJcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMSkge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0KFwi0JTQu9GPINCz0YDQsNC00LAg0YPQtNCw0YDQvtCyINGC0YDQtdCx0YPQtdGC0YHRjyDQsdC+0LvRjNGI0LUgMSDQvtGB0L3QvtCy0L3QvtCz0L4g0LTQtdC50YHRgtCy0LjRjyFcIilcclxuICAgICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjM6IC8v0JDQtNGA0LXQvdCw0LvQuNC90L7QstGL0Lkg0L/QvtGC0L7Qv1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwicG9pc29ub3VzX2FkcmVuYWxpbmVfdXNlclwiKSkge1xyXG4gICAgICAgICAgYWxlcnQoXCLQo9C80LXQvdC40LUg0LLRgdC1INC10YnQtSDQvdCwINC60YPQu9C00LDRg9C90LVcIilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2hvb3NlX2NoYXJhY3Rlcl9za2lsbChza2lsbF9pbmRleCwgY2hhcmFjdGVyX251bWJlciwgcG9zaXRpb24sIGNlbGwpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjQ6IC8vINC60LjRgdC70L7RgtC90LDRjyDQs9GA0LDQvdCw0YLQsFxyXG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwiYWNpZF9ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQoyDQs9GA0LDQvdCw0YLRiyDQutGD0LvQtNCw0YPQvSAo0LrQuNGB0LvQvtGC0LAg0L7QutC40YHQu9GP0LXRgtGB0Y8pXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDI1OiAvLyDQl9Cw0LzQuNC90LjRgNC+0LLQsNGC0YxcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXhcclxuICAgICAgICAgICAgdG9TZW5kLnVzZXJfaW5kZXggPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgICAgIHRvU2VuZC5wbGF5ZXJfbmFtZSA9IG15X25hbWVcclxuICAgICAgICAgICAgdG9TZW5kLnBvc2l0aW9uID0gcG9zaXRpb25cclxuICAgICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMjY6IC8vINCe0LHQtdC30LLRgNC10LTQuNGC0Ywg0LzQuNC90YNcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgICAgICBjaG9vc2VfY2hhcmFjdGVyX3NraWxsKHNraWxsX2luZGV4LCBjaGFyYWN0ZXJfbnVtYmVyLCBwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0K3RgtC+INGD0LzQtdC90LjQtSDRgtGA0LXQsdGD0LXRgiAxINCx0L7QvdGD0YHQvdC+0LUg0LTQtdC50YHRgtCy0LjQtSFcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDQt9C90LDQtdC8INGN0YLQviDRg9C80LXQvdC40LVcIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNob29zZV9jaGFyYWN0ZXJfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKSB7XHJcbiAgY2hhcmFjdGVyX2Nob3Nlbi5pbl9wcm9jZXNzID0gM1xyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uc2tpbGxfaWQgPSBza2lsbF9pbmRleFxyXG4gIGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb24gPSBwb3NpdGlvblxyXG4gIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9DaGlkb3JpLndlYnBcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlfYm9tYihwb3NpdGlvbiwgcmFkaXVzKSB7XHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhwb3NpdGlvbiwgcmFkaXVzKVxyXG4gIC8vY29uc29sZS5sb2coY2FuZGlkYXRlX2NlbGxzKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NhbmRpZGF0ZV9jZWxsc1tpXV1cclxuICAgIGlmICh0YXJnZXRfY2hhcmFjdGVyX251bWJlciA+IDApIHsvLyDQv9C10YDRgdC+0L3QsNC2INCyINGA0LDQtNC40YPRgdC1INCx0L7QvNCx0YtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC/0LDQtNCw0LXRgiDQv9C+0LQg0LTQtdC50YHRgtCy0LjQtSDQs9Cw0LfQvtCy0L7QuSDQsdC+0LzQsdGLXCJcclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCArIDFcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgZ2FzX2JvbWJfcG9pc29uX29iamVjdCA9IHt9XHJcbiAgICAgICAgZ2FzX2JvbWJfcG9pc29uX29iamVjdC5wb2lzb25fbGV2ZWwgPSAxXHJcbiAgICAgICAgZ2FzX2JvbWJfcG9pc29uX29iamVjdC50aHJlc2hvbGQgPSBnYXNfYm9tYl90aHJlc2hvbGRcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5nYXNfYm9tYl9wb2lzb24gPSBnYXNfYm9tYl9wb2lzb25fb2JqZWN0XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0gLSBnYXNfYm9tYl9tb3ZlX3JlZHVjdGlvblxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSAtIDFcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5X2FjaWRfYm9tYihwb3NpdGlvbiwgcmFkaXVzKSB7XHJcbiAgdmFyIGNhbmRpZGF0ZV9jZWxscyA9IGluZGV4X2luX3JhZGl1cyhwb3NpdGlvbiwgcmFkaXVzKVxyXG4gIC8vY29uc29sZS5sb2coY2FuZGlkYXRlX2NlbGxzKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlX2NlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NhbmRpZGF0ZV9jZWxsc1tpXV1cclxuICAgIGlmICh0YXJnZXRfY2hhcmFjdGVyX251bWJlciA+IDApIHsvLyDQv9C10YDRgdC+0L3QsNC2INCyINGA0LDQtNC40YPRgdC1INCx0L7QvNCx0YtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/QvtC/0LDQtNCw0LXRgiDQv9C+0LQg0LTQtdC50YHRgtCy0LjQtSDQutC40YHQu9C+0YLQvdC+0Lkg0LPRgNCw0L3QsNGC0YtcIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFjaWRfYm9tYl9wb2lzb25cIikpIHtcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5hY2lkX2JvbWJfcG9pc29uLmR1cmF0aW9uID0gYWNpZF9ib21iX2R1cmF0aW9uXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGFjaWRfYm9tYl9wb2lzb25fb2JqZWN0ID0ge31cclxuICAgICAgICBhY2lkX2JvbWJfcG9pc29uX29iamVjdC5kdXJhdGlvbiA9IGFjaWRfYm9tYl9kdXJhdGlvblxyXG4gICAgICAgIHZhciBLRF9jaGFuZ2UgPSBwYXJzZUludChjaGFyYWN0ZXJfS0QodGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpLzIpXHJcbiAgICAgICAgYWNpZF9ib21iX3BvaXNvbl9vYmplY3QuYm9udXNfS0QgPSBLRF9jaGFuZ2VcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXS5hY2lkX2JvbWJfcG9pc29uID0gYWNpZF9ib21iX3BvaXNvbl9vYmplY3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSAtIEtEX2NoYW5nZVxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvY2tlZF9lZmZlY3QodGFyZ2V0KSB7XHJcbiAgaWYgKCFjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uaGFzT3duUHJvcGVydHkoXCJzaG9ja2VkXCIpKSB7XHJcbiAgICB2YXIgc2hvY2tlZF9vYmplY3QgPSB7fVxyXG4gICAgc2hvY2tlZF9vYmplY3QuY29vbGRvd24gPSBzaG9ja2VkX2Nvb2xkb3duXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF0uc2hvY2tlZCA9IHNob2NrZWRfb2JqZWN0XHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVt0YXJnZXRdID0gY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbdGFyZ2V0XSAtIDFcclxuICB9IGVsc2Uge1xyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRdLnNob2NrZWQuY29vbGRvd24gPSBzaG9ja2VkX2Nvb2xkb3duXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtZWxlZV9wZW5hbHR5KGRhdGEpIHtcclxuICBpZiAoZGF0YS5hdHRhY2tfdHlwZSA9PSBcIm1lbGVlXCIpIHtcclxuICAgIGlmICghY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uaGFzT3duUHJvcGVydHkoXCJtZWxlZWRcIikpIHsgLy8g0LjQvdCw0YfQtSDRjdGE0YTQtdC60YIg0YPQttC1INC90LDQu9C+0LbQtdC9LCDQvdC1INC/0L7QstGC0L7RgNGP0LXQvFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLnRhcmdldF9pZF0gLSAxXHJcbiAgICAgIHZhciBtZWxlZWRfb2JqZWN0ID0ge31cclxuICAgICAgbWVsZWVkX29iamVjdC5jb29sZG93biA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ubWVsZWVkID0gbWVsZWVkX29iamVjdFxyXG4gICAgfVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbZGF0YS50YXJnZXRfaWRdID09IDEpIHtcclxuICAgICAgdmFyIGNvb2xkb3duID0gMVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvb2xkb3duID0gMFxyXG4gICAgfVxyXG4gICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ubWVsZWVkLmNvb2xkb3duID0gY29vbGRvd25cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX2RhbWFnZShjaGFyYWN0ZXJfbnVtYmVyLCBkYW1hZ2UpIHtcclxuICBpZiAoIWNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJmb3JjZV9maWVsZF90YXJnZXRcIikpIHtcclxuICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSAtIGRhbWFnZVxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgc2hpZWxkX2luZGV4ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXQuc2hpZWxkX2luZGV4XHJcbiAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uc2hpZWxkIC0gZGFtYWdlXHJcbiAgICB2YXIgbWVzc2FnZSA9IFwi0KnQuNGCINC/0YDQuNC90Y/QuyDRg9GA0L7QvSDQvdCwINGB0LXQsdGPISDQntGB0YLQsNCy0YjQsNGP0YHRjyDQv9GA0L7Rh9C90L7RgdGC0Yw6IFwiICsgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XS5zaGllbGRcclxuICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIGlmIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnNoaWVsZCA8PSAwKSB7Ly8g0YnQuNGCINGD0L3QuNGH0YLQvtC20LXQvVxyXG4gICAgICB2YXIgbWVzc2FnZSA9IFwiUHJlc3MgRiDQqdC40YLRgy4uLlwiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgdmFyIGNoYXJfbGlzdCA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW3NoaWVsZF9pbmRleF0uY2hhcmFjdGVyX2xpc3RcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJfbGlzdFtpXVxyXG4gICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmZvcmNlX2ZpZWxkX3RhcmdldFxyXG4gICAgICB9XHJcbiAgICAgIGRlbGV0ZV9vYmplY3RfY29tbWFuZChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tzaGllbGRfaW5kZXhdLnBvc2l0aW9uKVxyXG4gICAgICBkZWxldGUgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbc2hpZWxkX2luZGV4XVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX2JhdHRsZV9tb2QoKSB7XHJcbiAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMFxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMVxyXG4gIH1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2JhdHRsZV9tb2QnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnZhbHVlID0gbmV3X3ZhbHVlXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbi8vIHtib2FyZF9zdGF0ZTogW10sIEhQX3N0YXRlOiBbXSwgaW5pdGlhdGl2ZV9zdGF0ZTogW10sIGZvZ19zdGF0ZTogW10sIHpvbmVfc3RhdGU6IFtdLCBzaXplOiAwLCBzZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGU6IFtdfTtcclxuZnVuY3Rpb24gbWlycm9yX2JvYXJkKCkge1xyXG4gIHZhciBsZWZ0X2luZGV4O1xyXG4gIHZhciByaWdodF9pbmRleDtcclxuICB2YXIgdGVtcDtcclxuICB2YXIgbGVmdF9jZWxsO1xyXG4gIHZhciByaWdodF9jZWxsO1xyXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgZ2FtZV9zdGF0ZS5zaXplOyB5KyspIHtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgZ2FtZV9zdGF0ZS5zaXplLzI7IHgrKykge1xyXG5cclxuICAgICAgbGVmdF9pbmRleCA9IHkqZ2FtZV9zdGF0ZS5zaXplICsgeDtcclxuICAgICAgcmlnaHRfaW5kZXggPSB5KmdhbWVfc3RhdGUuc2l6ZSArIHBhcnNlSW50KGdhbWVfc3RhdGUuc2l6ZSkgLSB4IC0gMTtcclxuICAgICAgLy9jb25zb2xlLmxvZygneTogJyArIHkgKyAnIHg6ICcgKyB4ICsgJyBsZWZ0IGluZGV4OiAnICsgbGVmdF9pbmRleCArICcgcmlnaHQgaW5kZXg6ICcgKyByaWdodF9pbmRleCk7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgbGVmdF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGxlZnRfaW5kZXgpO1xyXG4gICAgICByaWdodF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHJpZ2h0X2luZGV4KTtcclxuXHJcbiAgICAgIHRlbXAgPSBsZWZ0X2NlbGwuc3JjO1xyXG4gICAgICBsZWZ0X2NlbGwuc3JjID0gcmlnaHRfY2VsbC5zcmM7XHJcbiAgICAgIHJpZ2h0X2NlbGwuc3JjID0gdGVtcDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN5bmNfYm9hcmQoKSB7XHJcbiAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IHtcclxuICAgIGdhbWVfc3RhdGU6IGdhbWVfc3RhdGUsXHJcbiAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbzogY2hhcmFjdGVyX2RldGFpbGVkX2luZm8sXHJcbiAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvOiBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvLFxyXG4gICAgY2hhcmFjdGVyX3N0YXRlOiBjaGFyYWN0ZXJfc3RhdGVcclxuICB9O1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc3luY19ib2FyZCc7XHJcbiAgdG9TZW5kLmZ1bGxfZ2FtZV9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93X2xhbmRtaW5lcygpIHtcclxuICB2YXIgbGFuZG1pbmVzX2FycmF5ID0gZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYW5kbWluZXNfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X21pbmUgPSBsYW5kbWluZXNfYXJyYXlbaV1cclxuICAgIGlmIChnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW2N1cnJlbnRfbWluZV0uaW5jbHVkZXMobXlfbmFtZSkpIHtcclxuICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgY3VycmVudF9taW5lKTtcclxuICAgICAgY2VsbC5zcmMgPSBcIi9pbWFnZXMvbGFuZG1pbmUuamZpZlwiXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhcl9jaGFyYWN0ZXJfc3RhdGUoKSB7XHJcbiAgY2hhcmFjdGVyX3N0YXRlID0gQ0hBUkFDVEVSX1NUQVRFX0NPTlNUQU5UXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyX2NoYXJhY3RlcihudW1iZXIpIHtcclxuICAvL2NoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLkhQW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtudW1iZXJdID0gbnVsbFxyXG4gIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbbnVtYmVyXSA9IHt9XHJcbiAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbbnVtYmVyXSA9IG51bGxcclxuICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW251bWJlcl0gPSBudWxsXHJcbiAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbbnVtYmVyXSA9IG51bGxcclxufVxyXG5cclxuZnVuY3Rpb24gd19vbmNsaWNrKCkge1xyXG4gIGlmIChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPT0gMSkge1xyXG4gICAgdW5kb19zZWxlY3Rpb24oKVxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgaW5kZXggPSBjaGFyYWN0ZXJfY2hvc2VuLmNoYXJfcG9zaXRpb25cclxuICAgIHZhciBjZWxsID0gY2hhcmFjdGVyX2Nob3Nlbi5jZWxsXHJcbiAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYV9vbmNsaWNrKCkge1xyXG4gIGlmIChjaGFyYWN0ZXJfY2hvc2VuLmluX3Byb2Nlc3MgPT0gMikge1xyXG4gICAgc3RvcF9hdHRhY2soKVxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9jaG9zZW4uY2hhcl9pZFxyXG4gICAgdmFyIGNlbGwgPSBjaGFyYWN0ZXJfY2hvc2VuLmNlbGxcclxuICAgIHZhciBtYWluX2FjdGlvbnNfbGVmdCA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgaWYgKG1haW5fYWN0aW9uc19sZWZ0ID4gMCkge1xyXG4gICAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX2F0dGFjayhjZWxsKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQoyDQstCw0YEg0L3QtSDQvtGB0YLQsNC70L7RgdGMINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wYXJlX2luaXRpYXRpdmUoYSxiKSB7XHJcbiAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2FdIDwgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbYl0pIHtcclxuICAgIHJldHVybiAxO1xyXG4gIH0gZWxzZSBpZiAoY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbYV0gPT0gY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbYl0pIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfVxyXG59XHJcblxyXG4vL3NvY2tldC5pbml0KCd3czovL2xvY2FsaG9zdDozMDAxJyk7XHJcbnNvY2tldC5pbml0KFNFUlZFUl9BRERSRVNTKTtcclxuXHJcbnNvY2tldC5yZWdpc3Rlck9wZW5IYW5kbGVyKCgpID0+IHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAncGxheWVyX2luZm8nO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvbGUgPSBteV9yb2xlO1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIHRvU2VuZC5wYXNzd29yZCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZ21fcGFzc3dvcmQnKSk7XHJcbiAgfVxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59KTtcclxuXHJcbnNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKChkYXRhKSA9PiB7XHJcbiAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICBpZiAoKChkYXRhLnRvX25hbWUgPT0gbXlfbmFtZSkgfHwgKGRhdGEudG9fbmFtZSA9PSAnYWxsJykpICYmIChkYXRhLnJvb21fbnVtYmVyID09IG15X3Jvb20pKSB7XHJcbiAgICBpZiAoZGF0YS5jb21tYW5kID09ICdwbGF5ZXJfaW5mb19yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuaXNWYWxpZCA9PSAwKSB7XHJcbiAgICAgICAgYWxlcnQoJ9Ci0LAg0LrQsNC60L7QuSDRgtGLINCz0LwnKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkYXRhLnJvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgIGNyZWF0ZV9ib2FyZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBsb2FkX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgcm9sbF9pbml0aWF0aXZlX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgZm9nX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfbmFtZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgYm9hcmRfc2l6ZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgbWlycm9yX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgbmV4dF9yb3VuZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIGJhdHRsZV9tb2RfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBzeW5jX2J1dHRvbi5zaG93KCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlO1xyXG4gICAgICAgICAgICAvLyBxXHJcbiAgICAgICAgICAgIGlmKGtleUNvZGUgPT0gODEpIHtcclxuICAgICAgICAgICAgICAgIGZvZ01vZGVDaGFuZ2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09IDg3KSB7IC8vIHdcclxuICAgICAgICAgICAgICB3X29uY2xpY2soKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT0gNjUpIHsgLy8gYVxyXG4gICAgICAgICAgICAgIGFfb25jbGljaygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfbGlzdDtcclxuICAgICAgb2JzdGFjbGVfbGlzdCA9IGRhdGEub2JzdGFjbGVfbGlzdDtcclxuICAgICAgd2VhcG9uX2xpc3QgPSBkYXRhLndlYXBvbl9saXN0XHJcbiAgICAgIHdlYXBvbl9kZXRhaWxlZF9pbmZvID0gZGF0YS53ZWFwb25fZGV0YWlsZWRfaW5mb1xyXG4gICAgICBza2lsbF9saXN0ID0gZGF0YS5za2lsbF9saXN0XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NvbnN0cnVjdF9ib2FyZF9yZXNwb25zZScpIHtcclxuICAgICAgY2xlYXJfY2hhcmFjdGVyX3N0YXRlKClcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGRhdGEuZ2FtZV9zdGF0ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGRhdGEuY2hhcmFjdGVyX2luZm87XHJcbiAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXI7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuY2VsbF9pZF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBkYXRhLmNlbGxfaWQpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuICAgICAgfVxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBkYXRhLmNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHN0YW1pbmFfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBwYXJzZUZsb2F0KG1vdmVfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV0pO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBib251c19hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBtYWluX2FjdGlvbl9tYXBbY2hhcmFjdGVyLmFnaWxpdHldO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyLmFnaWxpdHk7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlci5LRF9wb2ludHM7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmhhc19tb3ZlZFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMDtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDA7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IFwiYWxsXCI7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyLmludmVudG9yeVswXVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDBcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUubWVsZWVfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kZWZlbnNpdmVfYWR2YW50YWdlW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHt9XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gZGF0YS5jZWxsX2lkO1xyXG5cclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX29ic3RhY2xlX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgb2JzdGFjbGUgPSBkYXRhLm9ic3RhY2xlX2luZm87XHJcbiAgICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm9bZGF0YS5vYnN0YWNsZV9udW1iZXJdID0gb2JzdGFjbGU7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuY2VsbF9pZF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBkYXRhLmNlbGxfaWQpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gb2JzdGFjbGUuYXZhdGFyO1xyXG4gICAgICB9XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZGF0YS5jZWxsX2lkXSA9IGRhdGEub2JzdGFjbGVfbnVtYmVyICogKC0xKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdtb3ZlX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIHRvX2luZGV4ID0gZGF0YS50b19pbmRleDtcclxuICAgICAgdmFyIGZyb21faW5kZXggPSBkYXRhLmZyb21faW5kZXg7XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdG9faW5kZXhdID0gZGF0YS5jaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUucG9zaXRpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHRvX2luZGV4O1xyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmludmlzaWJpbGl0eV9lbmRlZF9pZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBpZCA9IGRhdGEuaW52aXNpYmlsaXR5X2VuZGVkX2lkW2ldO1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbaWRdID0gXCJhbGxcIjtcclxuXHJcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gY2hhcmFjdGVyX3N0YXRlLnBvc2l0aW9uW2lkXTtcclxuICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBwb3NpdGlvbik7XHJcbiAgICAgICAgdmFyIGF2YXRhciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2lkXS5hdmF0YXI7XHJcbiAgICAgICAgdG9fY2VsbC5zcmMgPSBhdmF0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdXHJcblxyXG4gICAgICBpZiAoIWNoYXJhY3Rlci5oYXNPd25Qcm9wZXJ0eShcImxhbmRtaW5lX2ltbXVuZVwiKSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5taW5lc19leHBsb2RlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIG1pbmVfcG9zaXRpb24gPSBkYXRhLm1pbmVzX2V4cGxvZGVkW2ldXHJcbiAgICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBtaW5lX3Bvc2l0aW9uKTtcclxuICAgICAgICAgIGNlbGwuc3JjID0gZm9nT3JQaWMobWluZV9wb3NpdGlvbilcclxuICAgICAgICAgIHZhciBpbmRleCA9IGdhbWVfc3RhdGUubGFuZG1pbmVzLnBvc2l0aW9ucy5pbmRleE9mKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuc3BsaWNlKGluZGV4LDEpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW21pbmVfcG9zaXRpb25dID0gW11cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLm1pbmVzX2RhbWFnZSA+IDApIHtcclxuICAgICAgICAgIGV4cGxvc2lvbl9hdWRpby5wbGF5KCk7XHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS5jaGFyYWN0ZXJfbnVtYmVyLCBkYXRhLm1pbmVzX2RhbWFnZSlcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9C+0LTRgNGL0LLQsNC10YLRgdGPINC90LAg0LzQuNC90LDRhSDQv9C+0LvRg9GH0LDRjyBcIiArIGRhdGEubWluZXNfZGFtYWdlICsgXCIg0YPRgNC+0L3QsFwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcmVtb3ZlIHNoaWVsZGVkIHByb3BlcnR5IGZyb20gY2hhcmFjdGVyIGFuZCByZW1vdmUgY2hhcmFjdGVyIGZyb20gc2hpZWxkZWQgbGlzdFxyXG4gICAgICBpZiAoZGF0YS5sZWZ0X3NoaWVsZCA9PSAxKSB7XHJcbiAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5mb3JjZV9maWVsZF90YXJnZXRcclxuICAgICAgICB2YXIgaW5kZXggPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tkYXRhLnNoaWVsZF9pbmRleF0uY2hhcmFjdGVyX2xpc3QuaW5kZXhPZihkYXRhLmNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbZGF0YS5zaGllbGRfaW5kZXhdLmNoYXJhY3Rlcl9saXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAxO1xyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBzdGFtaW5hX21vdmVfY29zdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBwYXJzZUZsb2F0KGRhdGEuZGlzdGFuY2UpXHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICBpZiAoY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcInNuaXBlclwiKSB7XHJcbiAgICAgICAgICB2YXIgZWZmZWN0c19vYmplY3QgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIGlmIChlZmZlY3RzX29iamVjdC5oYXNPd25Qcm9wZXJ0eShcInNuaXBlcl9wYXNzaXZlXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50X2F0dGFja19ib251cyA9IGVmZmVjdHNfb2JqZWN0LnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251c1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudF9kYW1hZ2VfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gY3VycmVudF9hdHRhY2tfYm9udXMgLSA1XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIGN1cnJlbnRfZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHNuaXBlcl9wYXNzaXZlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUgPSBzbmlwZXJfcGFzc2l2ZV9vYmplY3RcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gNVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCEoKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW3RvX2luZGV4XSA9PSAxKSkgfHwgKGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAhPSBcImFsbFwiICYmIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAhPSBteV9uYW1lKSkpIHtcclxuICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcbiAgICAgICAgdG9fY2VsbC5zcmMgPSBkYXRhLmNoYXJhY3Rlcl9hdmF0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtmcm9tX2luZGV4XSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBmcm9tX2luZGV4KTtcclxuICAgICAgICBvbGRfY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlbGV0ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiY2hhcmFjdGVyX251bWJlclwiKSkge1xyXG4gICAgICAgIGNsZWFyX2NoYXJhY3RlcihkYXRhLmNoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgIH1cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmluZGV4XSA9IDA7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuaW5kZXhdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEuaW5kZXgpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdyb2xsX2luaXRpYXRpdmVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlID0gZGF0YS5pbml0aWF0aXZlX3N0YXRlO1xyXG4gICAgICB2YXIgb3JkZXJlZF9hcnJheSA9IFtdXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLkhQW2ldID4gMCkgey8vIGNoYXJhY3RlciBpcyBwcmVzZW50XHJcbiAgICAgICAgICBvcmRlcmVkX2FycmF5LnB1c2goaSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgb3JkZXJlZF9hcnJheS5zb3J0KGNvbXBhcmVfaW5pdGlhdGl2ZSk7XHJcbiAgICAgIGluaXRpYXRpdmVfb3JkZXJfY29udGFpbmVyLmh0bWwoXCJcIilcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmRlcmVkX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW29yZGVyZWRfYXJyYXlbaV1dXHJcbiAgICAgICAgdmFyIHF1ZXJ5X3N0cmluZyA9ICc8aW1nPiBpZD1cImluaXRpYXRpdmVfaW1hZ2VfJyArIGkgKyAnXCInXHJcbiAgICAgICAgdmFyIGltZyA9ICQocXVlcnlfc3RyaW5nKVxyXG4gICAgICAgIGltZy5hdHRyKCdzcmMnLCBjaGFyYWN0ZXIuYXZhdGFyKTtcclxuICAgICAgICBpbWcuYXR0cignaGVpZ2h0JywgJzUwcHgnKTtcclxuICAgICAgICBpbWcuYXR0cignd2lkdGgnLCAnNTBweCcpO1xyXG4gICAgICAgIGltZy5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBwb3NpdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5wb3NpdGlvbltvcmRlcmVkX2FycmF5W2ldXVxyXG4gICAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgcG9zaXRpb24pO1xyXG4gICAgICAgICAgc2VsZWN0X2NoYXJhY3Rlcihwb3NpdGlvbiwgY2VsbClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGltZy5hcHBlbmRUbyhpbml0aWF0aXZlX29yZGVyX2NvbnRhaW5lcik7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlYWxfZGFtYWdlX3Jlc3BvbnNlJykge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gZGF0YS5kYW1hZ2U7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2F2ZV9nYW1lX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICBhbGVydCgnR2FtZSAnICsgZGF0YS5zYXZlX25hbWUgKyAnIHNhdmVkIHN1Y2Nlc2Z1bGx5Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0dhbWUgd2l0aCBuYW1lICcgKyBkYXRhLnNhdmVfbmFtZSArICcgYWxyZWFkeSBleGlzdCEnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2xvYWRfZ2FtZV9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IGRhdGEuZnVsbF9nYW1lX3N0YXRlO1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfc3RhdGU7XHJcbiAgICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX2RldGFpbGVkX2luZm87XHJcbiAgICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5vYnN0YWNsZV9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICAgIGNvbnN0cnVjdF9ib2FyZChmdWxsX2dhbWVfc3RhdGUuZ2FtZV9zdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBsb2FkIGdhbWUgJyArIGRhdGEuc2F2ZV9uYW1lKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3N5bmNfYm9hcmRfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBmdWxsX2dhbWVfc3RhdGUgPSBkYXRhLmZ1bGxfZ2FtZV9zdGF0ZTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlID0gZnVsbF9nYW1lX3N0YXRlLmNoYXJhY3Rlcl9zdGF0ZTtcclxuICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX2RldGFpbGVkX2luZm87XHJcbiAgICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUub2JzdGFjbGVfZGV0YWlsZWRfaW5mbztcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGZ1bGxfZ2FtZV9zdGF0ZS5nYW1lX3N0YXRlKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICd1cGRhdGVfZm9nX3Jlc3BvbnNlJykge1xyXG5cdFx0XHRcdHZhciBpbmRleCA9IGRhdGEuaW5kZXg7XHJcblx0XHRcdFx0dmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgaW5kZXgpO1xyXG5cdFx0XHRcdGlmIChkYXRhLnVwZGF0ZV90eXBlID09ICdyZW1vdmUnKSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAwO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAxO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBGT0dfSU1BR0U7XHJcblx0XHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2Fzc2lnbl96b25lX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgaW5kZXhfbGlzdCA9IGRhdGEuaW5kZXhfbGlzdFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4X2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaW5kZXhfbGlzdFtpXV0gPSBkYXRhLnpvbmVfbnVtYmVyO1xyXG4gICAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2luZGV4X2xpc3RbaV1dID0gZGF0YS5tb2RpZmljYXRvcjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9yZXNwb25zZScpIHtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGRhdGEubmV3X3ZhbHVlO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NpbXBsZV9yb2xsX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgbWVzc2FnZSA9IGRhdGEuY2hhcmFjdGVyX25hbWUgKyBcIiDQsdGA0L7RgdCw0LXRgiBcIiArIGRhdGEucm9sbFxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2tpbGxfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciB1c2VyX2luZGV4ID0gZGF0YS51c2VyX2luZGV4XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5oYXNfbW92ZWRbdXNlcl9pbmRleF0gPSAxXHJcbiAgICAgIHN3aXRjaChkYXRhLnNraWxsX2luZGV4KSB7XHJcbiAgICAgICAgY2FzZSAwOiAvLyDRgNGL0LLQvtC6XHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdXNlcl9pbmRleF0gKyBjaGFyZ2VfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvtCy0LXRgNGI0LDQtdGCINGA0YvQstC+0LpcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOiAvLyDQv9GA0LjQu9C40LIg0LDQtNGA0LXQvdCw0LvQuNC90LBcclxuICAgICAgICAgICAgdmFyIHVzZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0X2luZGV4ID0gZGF0YS50YXJnZXRfaW5kZXhcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pbmRleF1cclxuICAgICAgICAgICAgdmFyIGV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3RhcmdldF9pbmRleF0gLSBhZHJlbmFsaW5lX3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICBpZiAoZXh0cmFfYWN0aW9ucyAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0ID0ge31cclxuICAgICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0Lm1pbnVzX2FjdGlvbnMgPSBkYXRhLm1pbnVzX2FjdGlvbnNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaW5kZXhdLmFkcmVuYWxpbmVfdGFyZ2V0ID0gYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0XHJcblxyXG4gICAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3RfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBhZHJlbmFsaW5lX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWRyZW5hbGluZV91c2VyID0gYWRyZW5hbGluZV9vYmplY3RfdXNlclxyXG5cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB1c2VyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQv9GA0LjQu9C40LIg0LDQtNGA0LXQvdCw0LvQuNC90LAuIFwiICArIHRhcmdldC5uYW1lICsgXCIg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9ucyArIFwiINC00LXQudGB0YLQstC40LkuINCt0YLQviDQsdGD0LTQtdGCINGB0YLQvtC40YLRjCBcIiArIGRhdGEubWludXNfYWN0aW9ucyArIFwiINC00LXQudGB0YLQstC40Lkg0L3QsCDRgdC70LXQtNGD0Y7RidC40Lkg0YXQvtC0LlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6IC8vINC/0L7QtNGA0LXQt9Cw0L3QuNC1INGB0YPRhdC+0LbQuNC70LjQuVxyXG4gICAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBzdGFtaW5hX2N1dF9saW1iX2Nvc3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS5cIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5za2lsbF9vdXRjb21lID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBsaW1iX2N1dF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgICBsaW1iX2N1dF9vYmplY3QuY29vbGRvd24gPSBjb29sZG93bl9jdXRfbGltYlxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5jdXRfbGltYiA9IGxpbWJfY3V0X29iamVjdFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gLTEwXHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC/0L7QtNGA0LXQt9Cw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdC10LfRg9GB0L/QtdGI0L3QviDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnNraWxsX291dGNvbWUgPT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGxpbWJfY3V0X29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgIGxpbWJfY3V0X29iamVjdC5jb29sZG93biA9IGNvb2xkb3duX2N1dF9saW1iXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmN1dF9saW1iID0gbGltYl9jdXRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAtMTBcclxuICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L/QvtC00YDQtdC30LDQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdC10LfRg9GB0L/QtdGI0L3QviDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgICAgIHZhciBsaW1iX2N1dF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIGxpbWJfY3V0X29iamVjdC5jb29sZG93biA9IGNvb2xkb3duX2N1dF9saW1iICsgMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmN1dF9saW1iID0gbGltYl9jdXRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IC0xMFxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC60YDQuNGC0LjRh9C10YHQutC4INC/0L7QtNGA0LXQt9Cw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOiAvLyDRgdC70LDQsdC+0LUg0LzQtdGB0YLQvlxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHN0YW1pbmFfd2Vha3Nwb3RfY29zdFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGRhdGEub3V0Y29tZSA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICB2YXIgd2Vha3Nwb3Rfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgd2Vha3Nwb3Rfb2JqZWN0Lmh1bnRlcl9pZCA9IHVzZXJfaW5kZXhcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0ud2Vha3Nwb3QgPSB3ZWFrc3BvdF9vYmplY3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0L7QsdC90LDRgNGD0LbQuNC7INGB0LvQsNCx0L7QtSDQvNC10YHRgtC+IFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC90LUg0YPQtNCw0LvQvtGB0Ywg0L7QsdC90LDRgNGD0LbQuNGC0Ywg0YHQu9Cw0LHQvtC1INC80LXRgdGC0L4gXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgNDogLy8g0LvQtdGH0LXQvdC40LVcclxuICAgICAgICB2YXIgaGVhbGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgdmFyIGNvb2xkb3duID0gMFxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuaW5pdGlhdGl2ZVt1c2VyX2luZGV4XSA+IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlW2RhdGEudGFyZ2V0X2lkXSkge1xyXG4gICAgICAgICAgLy8g0L/QsNGG0LjQtdC90YIg0L3QtSDRhdC+0LTQuNGCINCyINGN0YLQvtGCINC20LUg0YXQvtC0XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgY29vbGRvd24gPSAwXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvb2xkb3duID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaGVhbGVkX29iamVjdCA9IHt9XHJcbiAgICAgICAgaGVhbGVkX29iamVjdC5jb29sZG93biA9IGNvb2xkb3duXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uaGVhbGVkID0gaGVhbGVkX29iamVjdFxyXG4gICAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImZhaWxcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC90LUg0L/QvtC70YPRh9C40LvQvtGB0Ywg0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC/0L7Qu9GD0YfQuNC70L7RgdGMINGD0YHQv9C10YjQvdC+INCy0YvQu9C10YfQuNGC0YwgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuaGVhbF9yb2xsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGRhdGEubmV3X2hwXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjcml0aWNhbCBzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCjIFwiICsgaGVhbGVyLm5hbWUgKyBcIiDQv9C+0LvRg9GH0LjQu9C+0YHRjCDQutGA0LjRgtC40YfQtdGB0LrQuCAoMiDRgdGC0LXQv9C10L3QuCkg0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gZGF0YS5uZXdfaHBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0YDQsNC30LHQvtGA0LUg0L7RgtGF0LjQu9CwXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6IC8vINCx0L7Qu9GM0YjQvtC5INCx0YDQsNGCXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICB2YXIgc2hpZWxkID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQt9Cw0YnQuNGC0LjQuyBcIiArICB0YXJnZXQubmFtZSArIFwiICgrXCIgKyBkYXRhLmJvbnVzX0tEICsgXCLQutC0KVwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2RhdGEudGFyZ2V0X2lkXSArIGRhdGEuYm9udXNfS0RcclxuICAgICAgICAgIHZhciBiaWdfYnJvX29iamVjdCA9IHt9XHJcbiAgICAgICAgICBiaWdfYnJvX29iamVjdC5jb29sZG93biA9IGNvb2xkb3duX2JpZ19icm9cclxuICAgICAgICAgIGJpZ19icm9fb2JqZWN0LmJvbnVzX0tEID0gZGF0YS5ib251c19LRFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uYmlnX2JybyA9IGJpZ19icm9fb2JqZWN0XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDY6IC8vINC/0L7QtNC90Y/RgtGMINGJ0LjRgtGLXHJcbiAgICAgICAgICB2YXIgc2hpZWxkID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGlmIChkYXRhLm91dGNvbWUgPT0gXCJzaGllbGRfdXBcIikge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbdXNlcl9pbmRleF0gKyBzaGllbGRfdXBfS0RcclxuICAgICAgICAgICAgdmFyIHNoaWVsZF91cF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBzaGllbGRfdXBfb2JqZWN0LnN0YW1pbmFfY29zdCA9IHNoaWVsZF91cF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgICAgc2hpZWxkX3VwX29iamVjdC5LRCA9IHNoaWVsZF91cF9LRFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLnNoaWVsZF91cCA9IHNoaWVsZF91cF9vYmplY3RcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaGllbGQubmFtZSArIFwiINC/0L7QtNC90Y/QuyDRidC40YLRiyDQt9CwINGH0LDRglwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt1c2VyX2luZGV4XSAtIHNoaWVsZF91cF9LRFxyXG4gICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5zaGllbGRfdXBcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaGllbGQubmFtZSArIFwiINC+0L/Rg9GB0YLQuNC7INGJ0LjRgi4g0KfQsNGCINC/0YDQvtGB0YLQuChcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6IC8vINC/0L7QttC40YDQsNC90LjQtSDRgdGD0YnQvdC+0YHRgtC4XHJcbiAgICAgICAgICB2YXIgYXR0YWNrZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcblxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gLSBkYXRhLmRhbWFnZVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmhhc093blByb3BlcnR5KFwiTWFya3VzX3N0YWNrc1wiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5NYXJrdXNfc3RhY2tzID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uTWFya3VzX3N0YWNrcyArIDJcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLk1hcmt1c19zdGFja3MgPSAyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5oYXNPd25Qcm9wZXJ0eShcImJpb3Bvb2xcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5iaW9wb29sICsgZGF0YS5kYW1hZ2VcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYmlvcG9vbCA9IGRhdGEuZGFtYWdlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQvdCw0L3QvtGB0LjRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAg0L7RgiDQutC+0YLQvtGA0L7Qs9C+INC90LXQstC+0LfQvNC+0LbQvdC+INGD0LLQtdGA0L3Rg9GC0YzRgdGPXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgOTogLy8g0LDQsdGB0L7Qu9GO0YLQvdC+0LUg0LLQvtGB0YHRgtCw0L3QvtCy0LvQtdC90LjQtVxyXG4gICAgICAgICAgdmFyIGhlYWxlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSAxXHJcblxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gKyBkYXRhLmhlYWxfYW1vdW50XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmJpb3Bvb2wgLSBkYXRhLmhlYWxfYW1vdW50XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGhlYWxlci5uYW1lICsgXCIg0LLQvtGB0YHRgtCw0L3QsNC70LjQstCw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgXCIgKyBkYXRhLmhlYWxfYW1vdW50ICsgXCIg0YXQv1wiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEwOiAvLyDQv9C+0LvRg9GH0LjRgtGMINCx0L7QvdGD0YFcclxuICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSArIDFcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINC80LXQvdGP0LXRgiDQvtCx0YvRh9C90L7QtSDQvdCwINCx0L7QvdGD0YHQvdC+0LUg0LTQtdC50YHRgtCy0LjQtVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMTogLy8g0L7RgtC00YvRhVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSAwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBkYXRhLm5ld19zdGFtaW5hXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvtGC0LTRi9GF0LDQtdGCLiDQpdC+0YDQvtGI0LXQs9C+INC+0YLQv9GD0YHQutCwIVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTI6IC8vINCz0LDQt9C+0LLQsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBnYXNfYm9tYl9zdGFtaW5hX2Nvc3RcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsdGA0L7RgdCw0LXRgiDQs9Cw0LfQvtCy0YPRjiDQsdC+0LzQsdGDLiDQodC+0LLQtdGC0YPQtdC8INC30LDQtNC10YDQttCw0YLRjCDQtNGL0YXQsNC90LjQtS5cIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgICB2YXIgYm9tYl9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBib21iX29iamVjdC50eXBlID0gXCJnYXNfYm9tYlwiXHJcbiAgICAgICAgICAgIGJvbWJfb2JqZWN0LnBvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgICAgICBib21iX29iamVjdC50aHJlc2hvbGQgPSBkYXRhLnRocmVzaG9sZFxyXG4gICAgICAgICAgICBib21iX29iamVjdC5yYWRpdXMgPSAzXHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzLnB1c2goYm9tYl9vYmplY3QpXHJcblxyXG4gICAgICAgICAgICB2YXIgZ2FzX2JvbWJfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGdhc19ib21iX3VzZXIuY29vbGRvd24gPSBnYXNfYm9tYl9za2lsbF9jb29sZG93blxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3VzZXJfaW5kZXhdLmdhc19ib21iX3VzZXIgPSBnYXNfYm9tYl91c2VyXHJcblxyXG4gICAgICAgICAgICB2YXIgaW5pdGlhbF9yYWRpdXMgPSAyXHJcblxyXG4gICAgICAgICAgICBhcHBseV9ib21iKGRhdGEucG9zaXRpb24sIGluaXRpYWxfcmFkaXVzKVxyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTM6IC8vINGB0LLQtdGC0L7RiNGD0LzQvtCy0LDRjyDQs9GA0LDQvdCw0YJcclxuICAgICAgICAgICAgdmFyIGxpZ2h0X3NvdW5kX2JvbWJfdXNlciA9IHt9XHJcbiAgICAgICAgICAgIGxpZ2h0X3NvdW5kX2JvbWJfdXNlci5jb29sZG93biA9IGxpZ2h0X3NvdW5kX2JvbWJfc2tpbGxfY29vbGRvd25cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5saWdodF9zb3VuZF9ib21iX3VzZXIgPSBsaWdodF9zb3VuZF9ib21iX3VzZXJcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5vdXRjb21lX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGRhdGEuY2hhcmFjdGVyX2xpc3RbaV1cclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgICAgICBpZiAoZGF0YS5vdXRjb21lX2xpc3RbaV0gPT0gMCkgeyAvLyDQn9GA0L7RiNC10Lsg0YHQv9Cw0YHQsdGA0L7RgdC+0LpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRg9GB0L/QtdC7INC/0YDQuNC60YDRi9GC0Ywg0LPQu9Cw0LfQsFwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQvtGB0LvQtdC/INC90LAgMiDRhdC+0LTQsFwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImJsaW5kXCIpKSB7Ly8g0L3QtSDQvdCw0LrQu9Cw0LTRi9Cy0LLQsNC10Lwg0LXRidC1INGI0YLRgNCw0YRcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5ibGluZC5jb29sZG93biA9IDJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBibGluZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgICBibGluZF9vYmplY3QuY29vbGRvd24gPSAyXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uYmxpbmQgPSBibGluZF9vYmplY3RcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUucmFuZ2VkX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSAtIDJcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtjaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDE0OiAvLyDRiNC+0LrQuNGA0L7QstCw0YLRjCAo0LTRgNC+0L0gKyDRg9GP0LfQstC40LzQvtGB0YLRjClcclxuICAgICAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YHRgtGA0LXQu9GP0LXRgiDQsiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZXZhZGVkXCI6XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcImRhbWFnZV93aXRob3V0X2V2YXNpb25cIjpcclxuICAgICAgICAgICAgc2hvY2tlZF9lZmZlY3QoZGF0YS50YXJnZXRfaWQpXHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRgdGC0YDQtdC70Y/QtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQsdC+0LvRjNGI0LUg0L3QtSDQvNC+0LbQtdGCINGD0LLQvtGA0LDRh9C40LLQsNGC0YzRgdGPINC4INGI0L7QutC40YDRg9C10YIg0YbQtdC70YwgKNGD0Y/Qt9Cy0LjQvNC+0YHRgtGMKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIjpcclxuICAgICAgICAgICAgc2hvY2tlZF9lZmZlY3QoZGF0YS50YXJnZXRfaWQpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGB0YLRgNC10LvRj9C10YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpINC4INGI0L7QutC40YDRg9C10YIg0YbQtdC70YwgKNGD0Y/Qt9Cy0LjQvNC+0YHRgtGMKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgc2hvY2tlZF9lZmZlY3QoZGF0YS50YXJnZXRfaWQpXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQv9C+0L/QsNC00LDQtdGCINCyIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwg0L3QtSDQvtGB0YLQsNCy0LvRj9GPINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0YPQstC10YDQvdGD0YLRjNGB0Y8g0Lgg0YjQvtC60LjRgNGD0LXRgiDRhtC10LvRjC4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlX3JvbGwpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2tlZCB1cCByZXNvbHZpbmcgZGFtYWdlXCIpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTU6IC8vINC/0YvRiSDQv9GL0Ykg0LPQvtGDXHJcbiAgICAgICAgICB2YXIgdXNlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0X2luZGV4ID0gZGF0YS50YXJnZXRfaW5kZXhcclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgd2hpbGUgKGV4dHJhX2FjdGlvbnMgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIHBpY2hfcGljaF9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBwaWNoX3BpY2hfb2JqZWN0X3RhcmdldCA9IHt9XHJcbiAgICAgICAgICBwaWNoX3BpY2hfb2JqZWN0X3RhcmdldC5leHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9pbmRleF0ucGljaF9waWNoX3RhcmdldCA9IHBpY2hfcGljaF9vYmplY3RfdGFyZ2V0XHJcblxyXG4gICAgICAgICAgdmFyIHBpY2hfcGljaF9vYmplY3RfdXNlciA9IHt9XHJcbiAgICAgICAgICBwaWNoX3BpY2hfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBwaWNoX3BpY2hfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0ucGljaF9waWNoX3VzZXIgPSBwaWNoX3BpY2hfb2JqZWN0X3VzZXJcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINCf0YvRiS3Qn9GL0Ykt0JPQvtGDLiBcIiAgKyB0YXJnZXQubmFtZSArIFwiINC/0L7Qu9GD0YfQsNC10YIgXCIgKyBkYXRhLmV4dHJhX2FjdGlvbnMgKyBcIiDQtNC+0L8g0LTQtdC50YHRgtCy0LjQuSDQvdCwINGN0YLQvtGCINC4INGB0LvQtdC00YPRjtGJ0LjQuSDRhdC+0LQuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTY6IC8vINGB0LjQu9C+0LLQvtC1INC/0L7Qu9C1XHJcbiAgICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gZm9yY2VfZmllbGRfc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNoaWVsZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LnR5cGUgPSBcImZvcmNlX2ZpZWxkXCJcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5wb3NpdGlvbiA9IGRhdGEucG9zaXRpb25cclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5yYWRpdXMgPSBmb3JjZV9maWVsZF9yYWRpdXNcclxuICAgICAgICAgICAgc2hpZWxkX29iamVjdC5zaGllbGQgPSBkYXRhLnNoaWVsZFxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LmNoYXJhY3Rlcl9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfbGlzdFxyXG4gICAgICAgICAgICBzaGllbGRfb2JqZWN0LmNlbGxzX3Byb3RlY3RlZCA9IGRhdGEuY2VsbHNfcHJvdGVjdGVkXHJcbiAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzLnB1c2goc2hpZWxkX29iamVjdClcclxuXHJcbiAgICAgICAgICAgIHZhciBzaGllbGRfaW5kZXggPSBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0cy5sZW5ndGggLSAxXHJcbiAgICAgICAgICAgIHZhciBjaGFyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9yY2VfZmllbGRfdGFyZ2V0ID0ge31cclxuICAgICAgICAgICAgZm9yY2VfZmllbGRfdGFyZ2V0LnNoaWVsZF9pbmRleCA9IHNoaWVsZF9pbmRleFxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IGNoYXJfbGlzdFtpXVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uZm9yY2VfZmllbGRfdGFyZ2V0ID0gZm9yY2VfZmllbGRfdGFyZ2V0XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JjZV9maWVsZF91c2VyID0ge31cclxuICAgICAgICAgICAgZm9yY2VfZmllbGRfdXNlci5jb29sZG93biA9IGZvcmNlX2ZpZWxkX2Nvb2xkb3duXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uZm9yY2VfZmllbGRfdXNlciA9IGZvcmNlX2ZpZWxkX3VzZXJcclxuICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQsNC60YLQuNCy0LjRgNGD0LXRgiDRgdC40LvQvtCy0L7QtSDQv9C+0LvQtVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTc6IC8vINC40L3QstC40LdcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbnZpc2liaWxpdHlbdXNlcl9pbmRleF0gPSBkYXRhLnVzZXJuYW1lXHJcbiAgICAgICAgICBpZiAobXlfbmFtZSAhPSBkYXRhLnVzZXJuYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBjZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTg6IC8vINCx0L7QtdCy0LDRjyDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWRhcHRpdmVfZmlnaHRpbmcgPSAtMTtcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCw0LrRgtC40LLQuNGA0YPQtdGCINCx0L7QtdCy0YPRjiDRg9C90LjQstC10YDRgdCw0LvRjNC90L7RgdGC0YxcIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMTk6IC8vINC70LDQutC4INGI0L7RglxyXG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3VzZXJfaW5kZXhdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDEpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gLSAxXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gLSBsdWNreV9zaG90X3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLnJvbGwgPT0gNykge1xyXG4gICAgICAgICAgICBkb19kYW1hZ2UoZGF0YS50YXJnZXRfaWQsIGRhdGEuZGFtYWdlKVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KPQtNCw0YfQsCDQsdC70LDQs9C+0LLQvtC70LjRgiBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINC60L7RgtC+0YDRi9C5INC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwIFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5yb2xsICsgXCIg0Y3RgtC+INC90LUg0YfQuNGB0LvQviBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINGC0LDQuiDRh9GC0L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINC40LfQsdC10LPQsNC10YIg0LDRgtCw0LrQuC5cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyMDogLy8gbG90dGVyeV9zaG90XHJcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGxvdHRlcnlfc2hvdF9zdGFtaW5hX2Nvc3RcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGF0YS5yb2xsID09IDcpIHtcclxuICAgICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZSlcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCa0LDQutCw0Y8g0YPQtNCw0YfQsCEg0KTQvtGA0YLRg9C90LAg0Y/QstC90L4g0L3QsCDRgdGC0L7RgNC+0L3QtSBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIsINC60L7RgtC+0YDRi9C5INC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwIFwiICsgdGFyZ2V0Lm5hbWVcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yb2xsID09IDc3KSB7XHJcbiAgICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQlNC20LXQutC/0L7RgiEgXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINGB0LXQs9C+0LTQvdGPINGB0YLQvtC40YIg0LrRg9C/0LjRgtGMINC70L7RgtC10YDQtdC50L3Ri9C5INCx0LjQu9C10YIsINCwINC/0L7QutCwINC+0L0g0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZSArIFwiINGD0YDQvtC90LAgXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBkYXRhLnJvbGwgKyBcIiDRjdGC0L4g0L3QtSDRh9C40YHQu9C+IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiwg0YLQsNC6INGH0YLQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0LjQt9Cx0LXQs9Cw0LXRgiDQsNGC0LDQutC4LlwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIxOiAvL9Cy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40LlcclxuICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSArIGRhdGEuZXh0cmFfYWN0aW9uc1xyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgIGlmIChnYW1lX3N0YXRlLmJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW3VzZXJfaW5kZXhdIC0gYWN0aW9uX3NwbGFzaF9zdGFtaW5hX2Nvc3QqZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIGFjdGlvbl9zcGxhc2hfb2JqZWN0ID0ge31cclxuICAgICAgICAgIGFjdGlvbl9zcGxhc2hfb2JqZWN0LmNvb2xkb3duID0gYWN0aW9uX3NwbGFzaF9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5hY3Rpb25fc3BsYXNoID0gYWN0aW9uX3NwbGFzaF9vYmplY3RcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHVzZXIubmFtZSArIFwiINC40YHQv9C+0LvRjNC30YPQtdGCINCy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40Lkg0Lgg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9ucyArIFwiINC+0YHQvdC+0LLQvdGL0YUg0LTQtdC50YHRgtCy0LjQuSDQstC80LXRgdGC0L4g0LHQvtC90YPRgdC90YvRhS5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDIyOiAvLyDQs9GA0LDQtCDRg9C00LDRgNC+0LJcclxuICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IDBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIHB1bmNoX3JhaW5mYWxsX3N0YW1pbmFfY29zdCpkYXRhLnRvdGFsX2F0dGFja3NcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChkYXRhLmRhbWFnZSA+IDApIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2UpXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L3QsNC90L7RgdC40YIg0LPRgNCw0LQg0LjQtyBcIiArIGRhdGEudG90YWxfYXR0YWNrcyArIFwiINGD0LTQsNGA0L7Qsiwg0LjQtyDQutC+0YLQvtGA0YvRhSBcIiArIGRhdGEuc3VjY2Vzc2Z1bGxfYXR0YWNrcyArIFwiINC/0L7Qv9Cw0LTQsNGO0YIg0LIgXCIgKyB0YXJnZXQubmFtZSArIFwiINC90LDQvdC+0YHRjyBcIiArIGRhdGEuZGFtYWdlICsgXCIg0YPRgNC+0L3QsC5cIlxyXG5cclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMjM6IC8vINCw0LTRgNC10L3QsNC70LjQvdC+0LLRi9C5INC/0L7RgtC+0L9cclxuICAgICAgICAgIHZhciB1c2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHZhciB0YXJnZXRfaW5kZXggPSBkYXRhLnRhcmdldF9pbmRleFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9pbmRleF1cclxuICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zWzBdXHJcbiAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGV4dHJhX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bdGFyZ2V0X2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvblt0YXJnZXRfaW5kZXhdICsgYWRyZW5hbGluZV9tb3ZlX2luY3JlYXNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW3RhcmdldF9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bdGFyZ2V0X2luZGV4XSArIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF90YXJnZXQgPSB7fVxyXG4gICAgICAgICAgYWRyZW5hbGluZV9vYmplY3RfdGFyZ2V0LmV4dHJhX2FjdGlvbnMgPSBkYXRhLmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldC50dXJuID0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfaW5kZXhdLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldCA9IGFkcmVuYWxpbmVfb2JqZWN0X3RhcmdldFxyXG5cclxuICAgICAgICAgIHZhciBhZHJlbmFsaW5lX29iamVjdF91c2VyID0ge31cclxuICAgICAgICAgIGFkcmVuYWxpbmVfb2JqZWN0X3VzZXIuY29vbGRvd24gPSBwb2lzb25vdXNfYWRyZW5hbGluZV9jb29sZG93blxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t1c2VyX2luZGV4XS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyID0gYWRyZW5hbGluZV9vYmplY3RfdXNlclxyXG5cclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gdXNlci5uYW1lICsgXCIg0LjRgdC/0L7Qu9GM0LfRg9C10YIg0LDQtNGA0LXQvdCw0LvQuNC90L7QstGL0Lkg0L/QvtGC0L7Qvy4gXCIgICsgdGFyZ2V0Lm5hbWUgKyBcIiDQv9C+0LvRg9GH0LDQtdGCIFwiICsgZGF0YS5leHRyYV9hY3Rpb25zWzBdICsgXCIg0LTQtdC50YHRgtCy0LjQuSDQsiDRjdGC0L7RgiDRhdC+0LQsINC4IFwiICsgZGF0YS5leHRyYV9hY3Rpb25zWzFdICsgXCIg0LIg0YHQu9C10LTRg9GO0YnQuNC5LiDQrdGC0L4g0LHRg9C00LXRgiDRgdGC0L7QuNGC0Ywg0LbQuNC30L3QtdC5INC4INCy0YvQvdC+0YHQu9C40LLQvtGB0YLQuCwg0LjRgdC/0L7Qu9GM0LfRg9C50YLQtSDRgSDRg9C80L7QvC5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG5cclxuICAgICAgY2FzZSAyNDogLy8g0LrQuNGB0LvQvtGC0L3QsNGPINCz0YDQsNC90LDRgtCwXHJcbiAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t1c2VyX2luZGV4XVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVt1c2VyX2luZGV4XSAtIGFjaWRfYm9tYl9zdGFtaW5hX2Nvc3RcclxuXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LHRgNC+0YHQsNC10YIg0LrQuNGB0LvQvtGC0L3Rg9GOINCz0YDQsNC90LDRgtGDLiDQkCDQvtC90Lgg0YLQvtC70YzQutC+INC60YPQv9C40LvQuCDQvdC+0LLRi9C1INC00L7RgdC/0LXRhdC4Li4uXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgICAgICB2YXIgYWNpZF9ib21iX3VzZXIgPSB7fVxyXG4gICAgICAgICAgYWNpZF9ib21iX3VzZXIuY29vbGRvd24gPSBhY2lkX2JvbWJfY29vbGRvd25cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdXNlcl9pbmRleF0uYWNpZF9ib21iX3VzZXIgPSBhY2lkX2JvbWJfdXNlclxyXG5cclxuICAgICAgICAgIGFwcGx5X2FjaWRfYm9tYihkYXRhLnBvc2l0aW9uLCBhY2lkX2JvbWJfcmFkaXVzKVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAyNTogLy8g0LfQsNC80LjQvdC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvblt1c2VyX2luZGV4XSAtIDFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLmluY2x1ZGVzKGRhdGEucG9zaXRpb24pKSB7XHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMucHVzaChkYXRhLnBvc2l0aW9uKVxyXG4gICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1tkYXRhLnBvc2l0aW9uXSA9IFtdXHJcbiAgICAgICAgICBnYW1lX3N0YXRlLmxhbmRtaW5lcy5rbm93ZXJzW2RhdGEucG9zaXRpb25dLnB1c2goZGF0YS5wbGF5ZXJfbmFtZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDI2OiAvLyDQvtCx0LXQt9Cy0YDQtdC00LjRgtGMINC80LjQvdGDXHJcblxyXG4gICAgICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bdXNlcl9pbmRleF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW3VzZXJfaW5kZXhdIC0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdXNlcl9pbmRleF1cclxuICAgICAgICAgIHN3aXRjaChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImVtcHR5XCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KEg0YfQtdC8IFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GL0YLQsNC70YHRjyDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQvtCy0LDRgtGMP1wiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZhaWxcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9C+0L/Ri9GC0LDQu9GB0Y8g0L7QsdC10LfQstGA0LXQtNC40YLRjCDQvNC40L3Rgywg0L3QviDQvdC1INGB0YPQvNC10LsuXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtaW5lX3Bvc2l0aW9uID0gZGF0YS5wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgbWluZV9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBjZWxsLnNyYyA9IGZvZ09yUGljKG1pbmVfcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBnYW1lX3N0YXRlLmxhbmRtaW5lcy5wb3NpdGlvbnMuaW5kZXhPZihtaW5lX3Bvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMucG9zaXRpb25zLnNwbGljZShpbmRleCwxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2FtZV9zdGF0ZS5sYW5kbWluZXMua25vd2Vyc1ttaW5lX3Bvc2l0aW9uXSA9IFtdXHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0LfQsNC/0YDQtdGJ0LDQtdGCINC80LjQvdC1INCy0LfRgNGL0LLQsNGC0YzRgdGPIVwiXHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN3aXRjaCDQvtCx0LXQstC30YDQtdC20LXQvdC40Y8g0L/QvtGI0LXQuyDQvdC1INGC0LDQulwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBhbGVydChcIlJlY2VpdmVkIHVua25vd24gc2tpbGwgY29tbWFuZFwiKVxyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ25ld19yb3VuZF9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIG1lc3NhZ2UgPSBcItCd0LDRh9Cw0LvQviDQvdC+0LLQvtCz0L4g0YDQsNGD0L3QtNCwIVwiXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0gIT09IG51bGwgJiYgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgc3dpdGNoIChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnYXNfYm9tYlwiOlxyXG4gICAgICAgICAgICAgICAgYXBwbHlfYm9tYihnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5wb3NpdGlvbiwgZ2FtZV9zdGF0ZS50ZXJyYWluX2VmZmVjdHNbaV0ucmFkaXVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cyA+PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChteV9yb2xlID09IFwiZ21cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZV9vYmplY3RfY29tbWFuZChnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXS5wb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBnYW1lX3N0YXRlLnRlcnJhaW5fZWZmZWN0c1tpXSA9IG51bGxcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cyA9IGdhbWVfc3RhdGUudGVycmFpbl9lZmZlY3RzW2ldLnJhZGl1cyArIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJNZXNzZWQgdXAgcmVzb2x2aW5nIHRlcnJhaW4gZWZmZWN0c1wiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpXVxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXIgIT09IHVuZGVmaW5lZCAmJiBjaGFyYWN0ZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbaV0gPSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2ldID0gMFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gcGFyc2VGbG9hdChtb3ZlX2FjdGlvbl9tYXBbY2hhcmFjdGVyLmFnaWxpdHldKTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSBib251c19hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IG1haW5fYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJ0aXJlZFwiKSkgeyAvLyDQo9Cx0YDQsNGC0Ywg0LHQvtC90YPRgdGLINC+0YIg0YPRgdGC0LDQu9C+0YHRgtC4INC/0YDQvtGI0LvQvtCz0L4g0YXQvtC00LAgKNGH0YLQvtCx0Ysg0LrQvtCz0LTQsCDQsdGD0LTRg9GCINC90LDQutCw0LvQsNC00YvQstCw0YLRjNGB0Y8g0L3QvtCy0YvQtSDQvdC1INGI0YLRgNCw0YTQvtCy0LDRgtGMINC00LLQsNC20LTRiylcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkLmJvbnVzXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIDwgc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdICogMC42Nykge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPCBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV0gKiAwLjM0KSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIDw9IDApIHsgLy8gM9GPINGB0YLQsNC00LjRj1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpcmVkX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICB0aXJlZF9vYmplY3QuYm9udXMgPSAtM1xyXG4gICAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LnN0YWdlID0gM1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS50aXJlZCA9IHRpcmVkX29iamVjdFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS51bml2ZXJzYWxfYm9udXNbaV0gLSAzXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBwYXJzZUZsb2F0KE1hdGguY2VpbChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0qMC4yNSkpXHJcbiAgICAgICAgICAgICAgICBpZiAoKGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9PSAxKSYmKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPT0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSAxXHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2UgeyAvLyAy0Y8g0YHRgtCw0LTQuNGPXHJcbiAgICAgICAgICAgICAgICB2YXIgdGlyZWRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgIHRpcmVkX29iamVjdC5ib251cyA9IC0yXHJcbiAgICAgICAgICAgICAgICB0aXJlZF9vYmplY3Quc3RhZ2UgPSAyXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnRpcmVkID0gdGlyZWRfb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIDJcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IHBhcnNlRmxvYXQoTWF0aC5jZWlsKGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSowLjUpKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gMdGPINGB0YLQsNC00LjRj1xyXG4gICAgICAgICAgICAgIHZhciB0aXJlZF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIHRpcmVkX29iamVjdC5ib251cyA9IC0xXHJcbiAgICAgICAgICAgICAgdGlyZWRfb2JqZWN0LnN0YWdlID0gMVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWQgPSB0aXJlZF9vYmplY3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUudW5pdmVyc2FsX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLnVuaXZlcnNhbF9ib251c1tpXSAtIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSBwYXJzZUZsb2F0KE1hdGguY2VpbChjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0qMC43NSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInRpcmVkXCIpKSB7IC8vINC90LUg0YPRgdGC0LDQuyAtPiDRg9Cx0YDQsNGC0Ywg0YPRgdGC0LvQsNC70L7RgdGC0Ywg0LXRgdC70Lgg0LHRi9C70LBcclxuICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0udGlyZWRcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImxpZ2h0X3NvdW5kX2JvbWJfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5saWdodF9zb3VuZF9ib21iX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmxpZ2h0X3NvdW5kX2JvbWJfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodCy0LXRgtC+0YjRg9C80L7QstCw0Y8g0LPRgNCw0L3QsNGC0LAg0YNcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LPQvtGC0L7QstCwINC6INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGOLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ubGlnaHRfc291bmRfYm9tYl91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5saWdodF9zb3VuZF9ib21iX3VzZXIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFjdGlvbl9zcGxhc2hcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWN0aW9uX3NwbGFzaC5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWN0aW9uX3NwbGFzaFxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQstC90L7QstGMINC80L7QttC10YIg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINCy0YHQv9C70LXRgdC6INC00LXQudGB0YLQstC40LkuXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY3Rpb25fc3BsYXNoLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY3Rpb25fc3BsYXNoLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJnYXNfYm9tYl91c2VyXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3VzZXJcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JPQsNC30L7QstCw0Y8g0LPRgNCw0L3QsNGC0LAg0YNcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LPQvtGC0L7QstCwINC6INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGOLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfdXNlci5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYWNpZF9ib21iX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl91c2VyXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCa0LjRgdC70L7RgtC90LDRjyDQs9GA0LDQvdCw0YLQsCDRg1wiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQs9C+0YLQvtCy0LAg0Log0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hY2lkX2JvbWJfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3VzZXIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImZvcmNlX2ZpZWxkX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZm9yY2VfZmllbGRfdXNlci5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZm9yY2VfZmllbGRfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodC40LvQvtCy0L7QtSDQv9C+0LvQtSDRgyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvdC+0LLQsCDQt9Cw0YDRj9C20LXQvdC+LlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZm9yY2VfZmllbGRfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZm9yY2VfZmllbGRfdXNlci5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwicGljaF9waWNoX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCj0LzQtdC90LjQtSDQn9GL0Ykt0J/Ri9GJINGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC90L7QstCwINC00L7RgdGC0YPQv9C90L4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucGljaF9waWNoX3VzZXIuY29vbGRvd24gPT0gcGljaF9waWNoX2Nvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2ldID0gMFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdXNlci5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwicGljaF9waWNoX3RhcmdldFwiKSkge1xyXG4gICAgICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5waWNoX3BpY2hfdGFyZ2V0LmV4dHJhX2FjdGlvbnNcclxuICAgICAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldICsgMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBpY2hfcGljaF90YXJnZXRcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFkcmVuYWxpbmVfdXNlclwiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdXNlci5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZV91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5hZHJlbmFsaW5lX3VzZXIuY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdXNlclxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQo9C80LXQvdC40LUg0J/RgNC40LvQuNCyINCQ0LTRgNC10L3QsNC70LjQvdCwINGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC90L7QstCwINC00L7RgdGC0YPQv9C90L4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInBvaXNvbm91c19hZHJlbmFsaW5lX3VzZXJcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5wb2lzb25vdXNfYWRyZW5hbGluZV91c2VyXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCj0LzQtdC90LjQtSDQkNC00YDQtdC90LDQu9C40L3QvtCy0YvQuSDQn9C+0YLQvtC/INGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC90L7QstCwINC00L7RgdGC0YPQv9C90L4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFkcmVuYWxpbmVfdGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIG1pbnVzX2FjdGlvbnMgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdGFyZ2V0Lm1pbnVzX2FjdGlvbnNcclxuICAgICAgICAgICAgICB3aGlsZSAobWludXNfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChtaW51c19hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSAtIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldIC0gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbWludXNfYWN0aW9ucyA9IG1pbnVzX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmVfdGFyZ2V0XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJwb2lzb25vdXNfYWRyZW5hbGluZV90YXJnZXRcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgdHVybiA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0LnR1cm5cclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnBvaXNvbm91c19hZHJlbmFsaW5lX3RhcmdldC50dXJuID0gdHVybiArIDFcclxuICAgICAgICAgICAgICB2YXIgZXh0cmFfYWN0aW9ucyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0LmV4dHJhX2FjdGlvbnNbdHVybl1cclxuICAgICAgICAgICAgICB3aGlsZSAoZXh0cmFfYWN0aW9ucyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSArIGFkcmVuYWxpbmVfbW92ZV9pbmNyZWFzZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldICsgMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmICh0dXJuICsgMSA9PSBwb2lzb25vdXNfYWRyZW5hbGluZV9kdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2ldXHJcbiAgICAgICAgICAgICAgICB2YXIgbWF4X0hQID0gSFBfdmFsdWVzW2NoYXJhY3Rlci5zdGFtaW5hXVxyXG4gICAgICAgICAgICAgICAgdmFyIG1heF9zdGFtaW5hID0gc3RhbWluYV92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgICAgICAgICAgICAgICB2YXIgSFBfY29zdCA9IHBvaXNvbm91c19hZHJlbmFsaW5lX2ZsYXRfSFAgKyBwYXJzZUludChwYXJzZUZsb2F0KG1heF9IUCkgKiBwb2lzb25vdXNfYWRyZW5hbGluZV9wZXJjZW50X0hQKVxyXG4gICAgICAgICAgICAgICAgdmFyIHN0YW1pbmFfY29zdCA9IHBvaXNvbm91c19hZHJlbmFsaW5lX2ZsYXRfc3RhbWluYSArIHBhcnNlSW50KHBhcnNlRmxvYXQobWF4X3N0YW1pbmEpICogcG9pc29ub3VzX2FkcmVuYWxpbmVfcGVyY2VudF9zdGFtaW5hKVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLkhQW2ldID0gY2hhcmFjdGVyX3N0YXRlLkhQW2ldIC0gSFBfY29zdFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSAtIHN0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0ucG9pc29ub3VzX2FkcmVuYWxpbmVfdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JDQtNGA0LXQvdCw0LvQuNC9INCyINC60YDQvtCy0LggXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINC30LDQutCw0L3Rh9C40LLQsNC10YLRgdGPLCDQvdCw0YHRgtGD0L/QsNC10YIg0L/QvtGF0LzQtdC70YzQtSAoXCIgKyBIUF9jb3N0ICsgXCIg0YXQvyDQuCBcIiArIHN0YW1pbmFfY29zdCArIFwiINCy0YvQvdC+0YHQu9C40LLQvtGB0YLQuClcIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcInNob2NrZWRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hvY2tlZC5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRlZmVuc2l2ZV9hZHZhbnRhZ2VbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuZGVmZW5zaXZlX2FkdmFudGFnZVtpXSArIDFcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaG9ja2VkLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJjdXRfbGltYlwiKSkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25baV0gPSAtMTBcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYi5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY3V0X2xpbWIuY29vbGRvd24gLSAxXHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQodGD0YXQvtC20LjQu9C40Y8gXCIgKyBjaGFyYWN0ZXIubmFtZSArIFwiINCy0L7RgdGB0YLQsNC90L7QstGP0YLRgdGPINC90LAg0YHQu9C10LTRg9GO0YnQtdC8INGF0L7QtNGDLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJoZWFsZWRcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGVhbGVkLmNvb2xkb3duID4gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXSA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25baV0gPSAwXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZC5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGVhbGVkLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhlYWxlZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJibGluZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biA+IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJsaW5kLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5ibGluZFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gKyAyXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1lbGVlX2FkdmFudGFnZVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tZWxlZV9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCX0YDQtdC90LjQtSBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0LLQvtGB0YHRgtCw0L3QvtCy0LjQu9C+0YHRjFwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyAtIDFcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJzaGllbGRfdXBcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gTWF0aC5jZWlsKGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltpXS8yKVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2ldIC0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zaGllbGRfdXAuc3RhbWluYV9jb3N0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQv9GA0L7QtNC+0LvQttCw0LXRgiDQtNC10YDQttCw0YLRjCDRidC40YIgKNGB0L/QsNGB0LjQsdC+KVwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiYmlnX2Jyb1wiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbaV0gLSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmJpZ19icm8uYm9udXNfS0RcclxuICAgICAgICAgICAgICBkZWxldGUgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGC0LXRgNGP0LXRgiDQt9Cw0YnQuNGC0YMg0JHQvtC70YzRiNC+0LPQviDQkdGA0LDRgtCwXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJhY2lkX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb24uZHVyYXRpb24gPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtpXSArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3BvaXNvbi5ib251c19LRFxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFjaWRfYm9tYl9wb2lzb25cclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JHRgNC+0L3RjyBcIiArIGNoYXJhY3Rlci5uYW1lICsgXCIg0L3QsNC60L7QvdC10YYg0LLQvtGB0YHRgtCw0L3QvtCy0LjQu9Cw0YHRjFwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3BvaXNvbi5kdXJhdGlvbiA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWNpZF9ib21iX3BvaXNvbi5kdXJhdGlvbiAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiZ2FzX2JvbWJfcG9pc29uXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbFxyXG4gICAgICAgICAgICB3aGlsZSAoY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldIC0gZ2FzX2JvbWJfbW92ZV9yZWR1Y3Rpb25cclxuICAgICAgICAgICAgICBpZiAoY291bnQgJSAyID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSAtIDFcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvdW50ID0gY291bnQgLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNhdmVfcm9sbCA9IGRhdGEuc2F2ZV9yb2xsX2xpc3RbaV1cclxuICAgICAgICAgICAgaWYgKHNhdmVfcm9sbCA+PSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi50aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgLSAxXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC60LjQtNCw0LXRgiDRgdC/0LDRgdCx0YDQvtGB0L7QuiDQuCDRg9C80LXQvdGM0YjQsNC10YIg0YHRgtCw0LTQuNGOINC+0YLRgNCw0LLQu9C10L3QuNGPICjRgtC10L/QtdGA0YwgXCIgKyBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmdhc19ib21iX3BvaXNvbi5wb2lzb25fbGV2ZWwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/RgNC+0LLQsNC70LjQstCw0LXRgiDRgdC/0LDRgdCx0YDQvtGB0L7Qui4g0KHRgtCw0LTQuNGPINC+0YLRgNCw0LLQu9C10L3QuNGPINC+0YHRgtCw0LXRgtGB0Y8g0L/RgNC10LbQvdC10LkgKFwiICsgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5nYXNfYm9tYl9wb2lzb24ucG9pc29uX2xldmVsICsgXCIpXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uLnBvaXNvbl9sZXZlbCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uZ2FzX2JvbWJfcG9pc29uXHJcbiAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBjaGFyYWN0ZXIubmFtZSArIFwiINCx0L7Qu9GM0YjQtSDQvdC1INC+0YLRgNCw0LLQu9C10L0hXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcIm1lbGVlZFwiKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWQuY29vbGRvd24gPD0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLm1lbGVlZFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5yYW5nZWRfYWR2YW50YWdlW2ldID0gY2hhcmFjdGVyX3N0YXRlLnJhbmdlZF9hZHZhbnRhZ2VbaV0gKyAxXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5tZWxlZWQuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLm1lbGVlZC5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09ICdzbmlwZXInKSB7XHJcbiAgICAgICAgICAgIHZhciBlZmZlY3RzX29iamVjdCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV1cclxuICAgICAgICAgICAgaWYgKGVmZmVjdHNfb2JqZWN0Lmhhc093blByb3BlcnR5KFwic25pcGVyX3Bhc3NpdmVcIikpIHtcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9hdHRhY2tfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudF9kYW1hZ2VfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgICBpZiAoY3VycmVudF9hdHRhY2tfYm9udXMgPT0gLTUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdfYXR0YWNrX2JvbnVzID0gTWF0aC5taW4oY3VycmVudF9hdHRhY2tfYm9udXMgKyAxLCA0KVxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19kYW1hZ2VfYm9udXMgPSBNYXRoLm1pbihjdXJyZW50X2RhbWFnZV9ib251cyArIDIsIDgpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuYXR0YWNrX2JvbnVzW2ldIC0gY3VycmVudF9hdHRhY2tfYm9udXMgKyBuZXdfYXR0YWNrX2JvbnVzXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbaV0gLSBjdXJyZW50X2RhbWFnZV9ib251cyArIG5ld19kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251cyA9IG5ld19hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNuaXBlcl9wYXNzaXZlLmRhbWFnZV9ib251cyA9IG5ld19kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgc25pcGVyX3Bhc3NpdmVfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuYXR0YWNrX2JvbnVzID0gMFxyXG4gICAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5kYW1hZ2VfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5zbmlwZXJfcGFzc2l2ZSA9IHNuaXBlcl9wYXNzaXZlX29iamVjdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYmF0dGxlX21vZF9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID0gZGF0YS52YWx1ZVxyXG4gICAgICBpZiAoZ2FtZV9zdGF0ZS5iYXR0bGVfbW9kID09IDApIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0JHQvtC5INC+0LrQvtC90YfQtdC9ISDQndCw0YHRgtGD0L/QuNC7INC80LjRgCDQstC+INCy0YHQtdC8INC80LjRgNC1XCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0J3QsNGH0LDQu9C+INCx0L7RjyEg0JvRjtC00Lgg0YPQvNC40YDQsNGO0YIsINC10YHQu9C4INC40YUg0YPQsdC40YLRjFwiXHJcbiAgICAgIH1cclxuICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3Jlc29sdmVfYXR0YWNrX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5hdHRhY2tfdHlwZSA9PSBcInJhbmdlZFwiKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gZ3Vuc2hvdF9hdWRpb1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGEuYXR0YWNrX3R5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gc3dvcmRfYXVkaW9cclxuICAgICAgfVxyXG4gICAgICBhdWRpby5wbGF5KCk7XHJcblxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtkYXRhLmF0dGFja2VyX2lkXSAhPSBcImFsbFwiKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmludmlzaWJpbGl0eVtkYXRhLmF0dGFja2VyX2lkXSA9IFwiYWxsXCJcclxuICAgICAgICB2YXIgYXR0YWNrZXJfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBkYXRhLmF0dGFja2VyX3Bvc2l0aW9uKTtcclxuICAgICAgICBhdHRhY2tlcl9jZWxsLnNyYyA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuYXR0YWNrZXJfaWRdLmF2YXRhcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5hdHRhY2tlcl9pZF1cclxuICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuaGFzX21vdmVkW2RhdGEuYXR0YWNrZXJfaWRdID0gMVxyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmF0dGFja2VyX2lkXSAtIHN0YW1pbmFfYXR0YWNrX2Nvc3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gLSAxXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhLmNvdmVyX2xldmVsID4gMCkge1xyXG4gICAgICAgIHZhciBjb3Zlcl9zdHJpbmcgPSBcItCj0YDQvtCy0LXQvdGMINGD0LrRgNGL0YLQuNGPOiBcIiArIGRhdGEuY292ZXJfbGV2ZWxcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgY292ZXJfc3RyaW5nID0gXCJcIlxyXG4gICAgICB9XHJcbiAgICAgIHN3aXRjaCAoZGF0YS5vdXRjb21lKSB7XHJcbiAgICAgICAgY2FzZSBcIktEX2Jsb2NrXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0L3QviDQvdC1INC/0YDQvtCx0LjQstCw0LXRgiDQsdGA0L7QvdGOLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImV2YWRlZFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC+0LTQvdCw0LrQviBcIiArIHRhcmdldC5uYW1lICsgXCIg0YPQtNCw0LvQvtGB0Ywg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0L3QtSDRgdC80L7QsyDRg9Cy0LXRgNC90YPRgtGM0YHRjyAoXCIgKyBkYXRhLmV2YWRlX3JvbGwgKyBcIikuINCQ0YLQsNC60LAg0L3QsNC90L7RgdC40YIgXCIgKyBkYXRhLmRhbWFnZV9yb2xsICsgXCIg0YPRgNC+0L3QsC4gXCIgKyBjb3Zlcl9zdHJpbmdcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGRvX2RhbWFnZShkYXRhLnRhcmdldF9pZCwgZGF0YS5kYW1hZ2Vfcm9sbClcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgbWVsZWVfcGVuYWx0eShkYXRhKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxfY3JpdFwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0LrRgNC40YLQuNGH0LXRgdC60Lgg0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiLCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLiBcIiArIGNvdmVyX3N0cmluZ1xyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgZG9fZGFtYWdlKGRhdGEudGFyZ2V0X2lkLCBkYXRhLmRhbWFnZV9yb2xsKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBtZWxlZV9wZW5hbHR5KGRhdGEpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jb3ZlclwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L/Ri9GC0LDQu9GB0Y8g0LDRgtCw0LrQvtCy0LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiDQvdC+INGC0L7RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0L/QvtC70L3QvtC8INGD0LrRgNGL0YLQuNC4LlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrZWQgdXAgcmVzb2x2aW5nIGRhbWFnZVwiKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdzZWFyY2hfYWN0aW9uX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICAgICAgcHVzaFRvTGlzdChkYXRhLmNoYXJhY3Rlcl9uYW1lICsgJyDQsdGA0L7RgdC40LsgJyArIGRhdGEucm9sbCArICcg0L3QsCDQstC90LjQvNCw0YLQtdC70YzQvdC+0YHRgtGMINCyINC30L7QvdC1ICcgKyBkYXRhLnpvbmVfbnVtYmVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGdhbWVfc3RhdGUuYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gMVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YS5taW5lc19kZXRlY3RlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBkYXRhLmNoYXJhY3Rlcl9uYW1lICsgXCIg0L7QsdC90LDRgNGD0LbQuNCy0LDQtdGCIFwiICsgZGF0YS5taW5lc19kZXRlY3RlZC5sZW5ndGggKyBcIiDQvNC40L0g0YDRj9C00L7QvCDRgSDRgdC+0LHQvtC5XCJcclxuICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLm1pbmVzX2RldGVjdGVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgbWluZSA9IGRhdGEubWluZXNfZGV0ZWN0ZWRbaV1cclxuICAgICAgICAgIGdhbWVfc3RhdGUubGFuZG1pbmVzLmtub3dlcnNbbWluZV0ucHVzaChkYXRhLnBsYXllcl9uYW1lKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG52YXIgY3JlYXRlX2JvYXJkX2J1dHRvbiA9ICQoQ1JFQVRFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmNyZWF0ZV9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgY3JlYXRlQm9hcmQpO1xyXG5jcmVhdGVfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBzYXZlX2JvYXJkX2J1dHRvbiA9ICQoU0FWRV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBzYXZlQm9hcmQpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgbG9hZF9ib2FyZF9idXR0b24gPSAkKExPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxubG9hZF9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgbG9hZEJvYXJkKTtcclxubG9hZF9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHJvbGxfaW5pdGlhdGl2ZV9idXR0b24gPSAkKFJPTExfSU5JVElBVElWRV9CVVRUT05fU0VMRUNUT1IpO1xyXG5yb2xsX2luaXRpYXRpdmVfYnV0dG9uLm9uKCdjbGljaycsIHJvbGxJbml0aWF0aXZlKTtcclxucm9sbF9pbml0aWF0aXZlX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgZm9nX2J1dHRvbiA9ICQoRk9HX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmZvZ19idXR0b24ub24oJ2NsaWNrJywgZm9nTW9kZUNoYW5nZSk7XHJcbmZvZ19idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHpvbmVfYnV0dG9uID0gJChaT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnpvbmVfYnV0dG9uLm9uKCdjbGljaycsIHpvbmVNb2RlQ2hhbmdlKTtcclxuem9uZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGNoYXRfYnV0dG9uID0gJChDSEFUX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmNoYXRfYnV0dG9uLm9uKCdjbGljaycsIGNoYW5nZUNoYXRWaXNpYmlsaXR5KTtcclxuXHJcbnZhciBtaXJyb3JfYnV0dG9uID0gJChNSVJST1JfQlVUVE9OX1NFTEVDVE9SKTtcclxubWlycm9yX2J1dHRvbi5vbignY2xpY2snLCBtaXJyb3JfYm9hcmQpO1xyXG5taXJyb3JfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBuZXh0X3JvdW5kX2J1dHRvbiA9ICQoTkVYVF9ST1VORF9CVVRUT05fU0VMRUNUT1IpO1xyXG5uZXh0X3JvdW5kX2J1dHRvbi5vbignY2xpY2snLCBzdGFydF9uZXdfcm91bmQpO1xyXG5uZXh0X3JvdW5kX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgYmF0dGxlX21vZF9idXR0b24gPSAkKEJBVFRMRV9NT0RfQlVUVE9OX1NFTEVDVE9SKTtcclxuYmF0dGxlX21vZF9idXR0b24ub24oJ2NsaWNrJywgY2hhbmdlX2JhdHRsZV9tb2QpO1xyXG5iYXR0bGVfbW9kX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgc3luY19idXR0b24gPSAkKFNZTkNfQlVUVE9OX1NFTEVDVE9SKTtcclxuc3luY19idXR0b24ub24oJ2NsaWNrJywgc3luY19ib2FyZCk7XHJcbnN5bmNfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBsYW5kbWluZV9idXR0b24gPSAkKExBTkRNSU5FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxhbmRtaW5lX2J1dHRvbi5vbignY2xpY2snLCBzaG93X2xhbmRtaW5lcyk7XHJcblxyXG52YXIgZm9nX3pvbmVfYnV0dG9uID0gJChGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG5mb2dfem9uZV9idXR0b24ub24oJ2NsaWNrJywgZm9nQ3VycmVudFpvbmUpO1xyXG5mb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHVuZm9nX3pvbmVfYnV0dG9uID0gJChVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnVuZm9nX3pvbmVfYnV0dG9uLm9uKCdjbGljaycsIHVuZm9nQ3VycmVudFpvbmUpO1xyXG51bmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgem9uZV9udW1iZXJfc2VsZWN0ID0gJChaT05FX05VTUJFUl9TRUxFQ1RPUik7XHJcbnpvbmVfbnVtYmVyX3NlbGVjdC5oaWRlKCk7XHJcbmZvciAobGV0IGkgPSAxOyBpIDwgTUFYX1pPTkVTOyBpKyspIHtcclxuICB2YXIgY3VycmVudF9vcHRpb24gPSAkKFwiPG9wdGlvbj5cIik7XHJcbiAgY3VycmVudF9vcHRpb24udGV4dCgn0JfQvtC90LAgJyArIGkpO1xyXG4gIGN1cnJlbnRfb3B0aW9uLnZhbChpKTtcclxuICB6b25lX251bWJlcl9zZWxlY3QuYXBwZW5kKGN1cnJlbnRfb3B0aW9uKTtcclxufVxyXG5cclxudmFyIHNlYXJjaF9tb2RpZmljYXRvciA9ICQoU0VBUkNIX01PRElGSUNBVE9SX1NFTEVDVE9SKTtcclxuc2VhcmNoX21vZGlmaWNhdG9yLmhpZGUoKTtcclxuXHJcbnZhciBub3RpZmljYXRpb25zX2xpc3QgPSAkKE5PVElGSUNBVElPTlNfTElTVF9TRUxFQ1RPUik7XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgQ0hBVF9DQVNIOyBpKyspIHtcclxuICB2YXIgY3VycmVudF9lbGVtZW50ID0gJChcIjxsaT5cIik7XHJcbiAgY3VycmVudF9lbGVtZW50LmF0dHIoJ2RhdGEtbmFtZScsICdub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgaSk7XHJcbiAgY3VycmVudF9lbGVtZW50LmF0dHIoJ2NsYXNzJywgJ25vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50Jyk7XHJcbiAgbm90aWZpY2F0aW9uc19saXN0LmFwcGVuZChjdXJyZW50X2VsZW1lbnQpO1xyXG59XHJcblxyXG52YXIgYm9hcmRfc2l6ZV9pbnB1dCA9ICQoQk9BUkRfU0laRV9JTlBVVF9TRUxFQ1RPUik7XHJcbmJvYXJkX3NpemVfaW5wdXQuaGlkZSgpO1xyXG5cclxudmFyIHNhdmVfbmFtZV9pbnB1dCA9ICQoU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SKTtcclxuc2F2ZV9uYW1lX2lucHV0LmhpZGUoKTtcclxuXHJcbnZhciBub3RpZmljYXRpb25zX2NvbnRhaW5lciA9ICQoTk9USUZJQ0FUSU9OU19DT05UQU5FUl9TRUxFQ1RPUik7XHJcbm5vdGlmaWNhdGlvbnNfY29udGFpbmVyLmhpZGUoKTtcclxuXHJcbnZhciBjaGFyYWN0ZXJfaW5mb19jb250YWluZXIgPSAkKENIQVJBQ1RFUl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciB3ZWFwb25faW5mb19jb250YWluZXIgPSAkKFdFQVBPTl9JTkZPX0NPTlRBTkVSX1NFTEVDVE9SKTtcclxuXHJcbnZhciBpbml0aWF0aXZlX29yZGVyX2NvbnRhaW5lciA9ICQoSU5JVElBVElWRV9PUkRFUl9DT05UQU5FUl9TRUxFQ1RPUik7XHJcblxyXG5kb2N1bWVudC5vbmtleWRvd24gPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGU7XHJcbiAgICAvLyB3XHJcbiAgICBpZihrZXlDb2RlID09IDg3KSB7XHJcbiAgICAgICAgd19vbmNsaWNrKClcclxuICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PSA2NSkgeyAvLyBhXHJcbiAgICAgIGFfb25jbGljaygpXHJcbiAgICB9XHJcbn07XHJcblxyXG5zZXRJbnRlcnZhbChyZWNvbm5lY3QsIDE1KjEwMDApXHJcbiIsImxldCBzb2NrZXQ7XHJcbmxldCBzZXJ2ZXJfYWRkcmVzcztcclxubGV0IG9uTWVzc2FnZUZ1bmN0aW9uO1xyXG5cclxuZnVuY3Rpb24gaW5pdCh1cmwpIHtcclxuICBzZXJ2ZXJfYWRkcmVzcyA9IHVybDtcclxuICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybCk7XHJcbiAgY29uc29sZS5sb2coJ2Nvbm5lY3RpbmcuLicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1JlYWR5KCkge1xyXG4gIHJldHVybiBzb2NrZXQucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU5cclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJPcGVuSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBzb2NrZXQub25vcGVuID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ29wZW4nKTtcclxuICAgIGhhbmRsZXJGdW5jdGlvbigpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XHJcbiAgb25NZXNzYWdlRnVuY3Rpb24gPSBoYW5kbGVyRnVuY3Rpb247XHJcbiAgc29ja2V0Lm9ubWVzc2FnZSA9IChlKSA9PiB7XHJcbiAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuICAgIGhhbmRsZXJGdW5jdGlvbihkYXRhKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyRGVmYXVsdCgpIHtcclxuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgb25NZXNzYWdlRnVuY3Rpb24oZGF0YSk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UocGF5bG9hZCkge1xyXG4gIGlmIChzb2NrZXQucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4pIHtcclxuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaW5pdChzZXJ2ZXJfYWRkcmVzcyk7XHJcbiAgICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKG9uTWVzc2FnZUZ1bmN0aW9uKTtcclxuICAgIGlmIChzb2NrZXQucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4pIHtcclxuICAgICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ05vdCBzZW5kLCBidXQgcmVjb25uZWN0ZWQnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG4gIHJlZ2lzdGVyT3BlbkhhbmRsZXIsXHJcbiAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcixcclxuICBzZW5kTWVzc2FnZSxcclxuICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyRGVmYXVsdCxcclxuICBpc1JlYWR5XHJcbn1cclxuIl19
