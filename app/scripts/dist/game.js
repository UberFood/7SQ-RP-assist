(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _wsClient = require('./ws-client');

var _wsClient2 = _interopRequireDefault(_wsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = window.jQuery;

var CREATE_BOARD_BUTTON_SELECTOR = '[data-name="create_board_button"]';
var SAVE_BOARD_BUTTON_SELECTOR = '[data-name="save_board_button"]';
var LOAD_BOARD_BUTTON_SELECTOR = '[data-name="load_board_button"]';
var ROLL_INITIATIVE_BUTTON_SELECTOR = '[data-name="roll_initiative_button"]';
var FOG_BUTTON_SELECTOR = '[data-name="fog_button"]';
var ZONE_BUTTON_SELECTOR = '[data-name="zone_button"]';
var CHAT_BUTTON_SELECTOR = '[data-name="chat_button"]';
var MIRROR_BUTTON_SELECTOR = '[data-name="mirror_button"]';
var FOG_ZONE_BUTTON_SELECTOR = '[data-name="fog_zone_button"]';
var UNFOG_ZONE_BUTTON_SELECTOR = '[data-name="unfog_zone_button"]';

var ZONE_NUMBER_SELECTOR = '[data-name="zone_number_select"]';
var SEARCH_MODIFICATOR_SELECTOR = '[data-name="search_modificator"]';

var BOARD_SIZE_INPUT_SELECTOR = '[data-name="board_size_input"]';
var SAVE_NAME_INPUT_SELECTOR = '[data-name="save_name_input"]';

var NOTIFICATIONS_LIST_SELECTOR = '[data-name="notifications_list"]';

var SERVER_ADDRESS = location.origin.replace(/^http/, 'ws');

var my_name = JSON.parse(sessionStorage.getItem('username'));
var my_role = JSON.parse(sessionStorage.getItem('user_role'));
var my_room = JSON.parse(sessionStorage.getItem('room_number'));

var character_list = [];
var character_detailed_info = [];
var obstacle_list = [];
var obstacle_detailed_info = [];
var weapon_list = [];
var weapon_detailed_info = [];

var TINY_EFFECT_CLASS = 'is-tiny';

var EMPTY_CELL_PIC = "./images/square.jpg";
var FOG_IMAGE = "./images/fog.webp";
var QUESTION_IMAGE = "./images/question.jpg";

var MAX_ZONES = 25;
var CHAT_CASH = 10;

// This is a constant, will be moved to database later
var HP_values = [15, 30, 40, 55, 75, 100, 130, 165, 205, 250, 300, 355, 415];

var game_state = { board_state: [], HP_state: [], initiative_state: [], fog_state: [], zone_state: [], size: 0, search_modificator_state: [] };

var character_base = [];
var obstacle_base = [];

var gm_control_mod = 0; // normal mode

var field_chosen = 0;
var chosen_index = void 0;
var chosen_character_index = void 0;
var chosen_character_HP = void 0;
var chosen_character_initiative = void 0;

var last_obstacle = void 0;

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
  game_state.HP_state = [];
  game_state.initiative_state = [];
  game_state.fog_state = [];
  game_state.zone_state = [];
  game_state.search_modificator_state = [];

  for (var i = 0; i < game_state.size * game_state.size; i++) {
    game_state.board_state.push(0);
    game_state.HP_state.push(0);
    game_state.initiative_state.push(0);
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
  var character_profile_container = document.getElementById("character-info-container");
  character_profile_container.innerHTML = "";

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

function construct_board(new_game_state) {
  game_state.board_state = new_game_state.board_state;
  game_state.HP_state = new_game_state.HP_state;
  game_state.initiative_state = new_game_state.initiative_state;
  game_state.size = new_game_state.size;
  game_state.fog_state = new_game_state.fog_state;
  game_state.zone_state = new_game_state.zone_state;
  game_state.search_modificator_state = new_game_state.search_modificator_state;

  var info_container = document.getElementById("character-info-container");
  info_container.innerHTML = "";

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
          var toSend = {};
          toSend.command = 'add_obstacle';
          toSend.cell_id = index;
          toSend.obstacle_number = last_obstacle;
          toSend.obstacle_name = obstacle_list[last_obstacle - 1];
          toSend.room_number = my_room;
          _wsClient2.default.sendMessage(toSend);
        } else {
          no_shift_onclick(my_role, gm_control_mod, game_state, field_chosen, cell, index);
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

function assignZone(index) {
  var zone_number = zone_number_select.val();
  var modificator = search_modificator.val();

  var zone_text = document.getElementById('zone_text_' + index);
  zone_text.innerHTML = zone_number + '(' + modificator + ')';

  var toSend = {};
  toSend.command = 'assign_zone';
  toSend.zone_number = zone_number;
  toSend.index = index;
  toSend.modificator = modificator;
  toSend.room_number = my_room;
  _wsClient2.default.sendMessage(toSend);
}

function fogOrPic(cell_id) {
  var picture_name = FOG_IMAGE;
  if (game_state.fog_state[cell_id] != 1 || my_role == 'gm') {
    picture_name = get_object_picture(game_state.board_state[cell_id]);
  }
  return picture_name;
}

function standard_cell_onClick(index, cell, role) {
  if (game_state.board_state[index] == 0) {
    // empty cell clicked
    if (field_chosen == 0) {
      if (role == 'gm') {
        add_object(index);
      }
    } else {
      move_character(index, cell);
    }
  } else if (game_state.board_state[index] > 0) {
    // character clicked
    if (field_chosen == 0) {
      select_character(index, cell);
    } else {
      undo_selection();
    }
  } else {
    // obstacle clicked
    if (field_chosen == 0) {
      select_obstacle(index, cell);
    } else {
      undo_selection();
    }
  }
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

function add_object(board_index) {
  var container = document.getElementById("character-info-container");
  container.innerHTML = "";

  var weapon_container = document.getElementById("weapon-info-container");
  weapon_container.innerHTML = "";

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
  container.appendChild(button_container);

  tiny_animation(container);
}

function tiny_animation(container) {
  container.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
    container.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function add_obstacle(board_index) {
  var container = document.getElementById("character-info-container");
  container.innerHTML = "";

  var select = document.createElement("select");
  select.id = "obstacle_chosen";

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

    var toSend = {};
    toSend.command = 'add_obstacle';
    toSend.cell_id = button.board_index;
    toSend.obstacle_number = obstacle_number + 1;
    toSend.obstacle_name = obstacle_list[obstacle_number];
    toSend.room_number = my_room;
    _wsClient2.default.sendMessage(toSend);

    var container = document.getElementById("character-info-container");
    container.innerHTML = "";
  };

  container.appendChild(select);
  container.appendChild(button);
  tiny_animation(container);
}

function add_character(board_index) {
  var container = document.getElementById("character-info-container");
  container.innerHTML = "";

  var select = document.createElement("select");
  select.id = "character_chosen";

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

    var container = document.getElementById("character-info-container");
    container.innerHTML = "";
  };

  container.appendChild(select);
  container.appendChild(button);
  tiny_animation(container);
}

function move_character(to_index, to_cell) {
  field_chosen = 0;
  var toSend = {};
  toSend.command = 'move_character';
  toSend.from_index = chosen_index;
  toSend.to_index = to_index;
  toSend.character_number = chosen_character_index;
  toSend.character_hp = chosen_character_HP;
  toSend.character_initiative = chosen_character_initiative;
  toSend.character_avatar = character_detailed_info[chosen_character_index].avatar;
  toSend.room_number = my_room;
  _wsClient2.default.sendMessage(toSend);
}

function displayFog() {
  var container = document.getElementById("character-info-container");
  container.innerHTML = "";

  var info = document.createElement("p");
  info.innerHTML = 'Мы не знаем, что это такое. Если бы мы знали что это такое, но мы не знаем.';

  var fog_picture = document.createElement("IMG");
  fog_picture.src = QUESTION_IMAGE;
  fog_picture.style.width = '250px';
  fog_picture.style.height = '250px';

  container.appendChild(info);
  container.appendChild(fog_picture);

  tiny_animation(container);
}

function select_character(index, cell) {
  var character = character_detailed_info[game_state.board_state[index]];

  var name = character.name;
  var avatar = character.avatar;

  var container = document.getElementById("character-info-container");
  container.innerHTML = "";

  var weapon_container = document.getElementById("weapon-info-container");
  weapon_container.innerHTML = "";

  var name_display = document.createElement("h2");
  name_display.innerHTML = name;

  var avatar_display = document.createElement("IMG");
  avatar_display.src = avatar;
  avatar_display.style.width = '250px';
  avatar_display.style.height = '250px';

  var strength_display = document.createElement("h2");
  strength_display.innerHTML = "Cила: " + character.strength;

  var stamina_display = document.createElement("h2");
  stamina_display.innerHTML = "Телосложение: " + character.stamina;

  var agility_display = document.createElement("h2");
  agility_display.innerHTML = "Ловкость: " + character.agility;

  var intelligence_display = document.createElement("h2");
  intelligence_display.innerHTML = "Интеллект: " + character.intelligence;

  var HP_display = document.createElement("h2");
  HP_display.id = "HP_display";
  HP_display.innerHTML = "ХП: " + game_state.HP_state[index];

  var initiative_display = document.createElement("h2");
  initiative_display.innerHTML = "Инициатива: " + game_state.initiative_state[index];

  container.appendChild(name_display);
  container.appendChild(avatar_display);
  container.appendChild(strength_display);
  container.appendChild(stamina_display);
  container.appendChild(agility_display);
  container.appendChild(intelligence_display);
  container.appendChild(HP_display);
  container.appendChild(initiative_display);

  var move_button = document.createElement("button");
  move_button.innerHTML = "Перемещение";
  move_button.index = index;
  move_button.cell = cell;
  move_button.onclick = function (event) {
    var container = document.getElementById("character-info-container");
    container.innerHTML = "";
    var character_picked = event.target;
    choose_character_to_move(character_picked.index, character_picked.cell);
  };

  var delete_button = document.createElement("button");
  delete_button.innerHTML = "Уничтожить";
  delete_button.index = index;
  delete_button.cell = cell;
  delete_button.onclick = function (event) {
    delete_object(event);
  };

  var damage_button = document.createElement("button");
  damage_button.innerHTML = "Нанести урон";
  damage_button.index = index;
  damage_button.onclick = function (event) {
    var damage_field = document.getElementById("damage_field");
    if (!(damage_field.value === "")) {
      var damage = parseInt(damage_field.value);
      var HP_display = document.getElementById("HP_display");
      var new_HP = game_state.HP_state[event.target.index] - damage;
      HP_display.innerHTML = "ХП: " + new_HP;

      var toSend = {};
      toSend.command = 'deal_damage';
      toSend.index = event.target.index;
      toSend.damage = damage;
      toSend.room_number = my_room;
      _wsClient2.default.sendMessage(toSend);
    }
  };

  var damage_field = document.createElement("input");
  damage_field.id = "damage_field";
  damage_field.type = "number";
  damage_field.placeholder = "Значение урона";

  var search_button = document.createElement("button");
  search_button.innerHTML = "Обыскать";
  search_button.index = index;
  search_button.onclick = function (event) {
    search_action(event.target);
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
    var weapon = weapon_detailed_info[weapon_index];

    var weapon_range_display = document.getElementById("weapon_range_display");
    weapon_range_display.innerHTML = "Дальность: " + weapon.range;

    var weapon_damage_display = document.getElementById("weapon_damage_display");
    weapon_damage_display.innerHTML = "Урон: " + weapon.damage[0] + 'd' + weapon.damage[1];

    var weapon_name_display = document.getElementById("weapon_name_display");
    weapon_name_display.innerHTML = weapon.name;

    var weapon_avatar_display = document.getElementById("weapon_avatar_display");
    weapon_avatar_display.src = weapon.avatar;
    weapon_avatar_display.style.width = '250px';
    weapon_avatar_display.style.height = '250px';
  };

  var default_weapon_index = character.inventory[0];
  var default_weapon = weapon_detailed_info[default_weapon_index];

  var weapon_range_display = document.createElement("h2");
  weapon_range_display.id = "weapon_range_display";
  weapon_range_display.innerHTML = "Дальность: " + default_weapon.range;

  var weapon_damage_display = document.createElement("h2");
  weapon_damage_display.id = "weapon_damage_display";
  weapon_damage_display.innerHTML = "Урон: " + default_weapon.damage[0] + 'd' + default_weapon.damage[1];

  var weapon_avatar_display = document.createElement("IMG");
  weapon_avatar_display.id = "weapon_avatar_display";
  weapon_avatar_display.src = default_weapon.avatar;
  weapon_avatar_display.style.width = '250px';
  weapon_avatar_display.style.height = '250px';

  var weapon_name_display = document.createElement("h2");
  weapon_name_display.id = "weapon_name_display";
  weapon_name_display.innerHTML = default_weapon.name;

  weapon_container.append(weapon_name_display);
  weapon_container.append(weapon_avatar_display);
  weapon_container.append(weapon_range_display);
  weapon_container.append(weapon_damage_display);

  var button_list = document.createElement("ul");
  button_list.className = "button_list";
  var line1 = document.createElement("li");
  var line2 = document.createElement("li");
  var line3 = document.createElement("li");
  var line4 = document.createElement("li");
  var line5 = document.createElement("li");

  line1.appendChild(move_button);
  line2.appendChild(delete_button);
  line3.appendChild(damage_button);
  line3.appendChild(damage_field);
  line4.appendChild(search_button);
  line5.appendChild(pick_weapon_button);
  line5.appendChild(weapon_select);

  button_list.appendChild(line1);
  button_list.appendChild(line2);
  button_list.appendChild(line3);
  button_list.appendChild(line4);
  button_list.appendChild(line5);

  container.appendChild(button_list);

  tiny_animation(container);
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
  return intelligence + Math.floor(Math.random() * 21) + mod;
}

function delete_object(event) {
  var container = document.getElementById("character-info-container");
  container.innerHTML = "";

  var toSend = {};
  toSend.command = 'delete_character';
  toSend.room_number = my_room;
  toSend.index = event.target.index;
  _wsClient2.default.sendMessage(toSend);
}

function select_obstacle(index, cell) {
  var obstacle_id = game_state.board_state[index] * -1;
  var obstacle = obstacle_detailed_info[obstacle_id];

  // keep track of last chosen obstale to quickly add to the map
  last_obstacle = obstacle_id;

  var name = obstacle.name;
  var avatar = obstacle.avatar;

  var container = document.getElementById("character-info-container");
  container.innerHTML = "";

  var name_display = document.createElement("h2");
  name_display.innerHTML = name;

  var avatar_display = document.createElement("IMG");
  avatar_display.src = avatar;
  avatar_display.style.width = '250px';
  avatar_display.style.height = '250px';

  container.appendChild(name_display);
  container.appendChild(avatar_display);

  var delete_button = document.createElement("button");
  delete_button.innerHTML = "Уничтожить";
  delete_button.index = index;
  delete_button.cell = cell;
  delete_button.onclick = function (event) {
    delete_object(event);
  };
  container.appendChild(delete_button);

  tiny_animation(container);
}

function choose_character_to_move(index, cell) {
  field_chosen = 1;
  chosen_index = index;
  chosen_character_HP = game_state.HP_state[index];
  chosen_character_initiative = game_state.initiative_state[index];
  chosen_character_index = game_state.board_state[index];
  cell.src = "./images/loading.webp";
}

function undo_selection() {
  field_chosen = 0;
  var old_cell = document.getElementById("cell_" + chosen_index);
  old_cell.src = character_detailed_info[game_state.board_state[chosen_index]].avatar;
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
    size: game_state.size,
    board_state: game_state.board_state,
    HP_state: game_state.HP_state,
    fog_state: game_state.fog_state,
    zone_state: game_state.zone_state,
    search_modificator_state: game_state.search_modificator_state,
    initiative_state: game_state.initiative_state,
    character_detailed_info: character_detailed_info,
    obstacle_detailed_info: obstacle_detailed_info
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
  return agility + Math.floor(Math.random() * 21);
}

function rollInitiative() {
  for (var i = 0; i < game_state.board_state.length; i++) {
    if (game_state.board_state[i] > 0) {
      // so there is character at position i
      // retrieve that character's agility
      var character_index = game_state.board_state[i];
      var character = character_detailed_info[character_index];

      var agility = character.agility;

      // roll initiative and add agility modificator
      var initiative = computeInitiative(parseInt(agility));

      game_state.initiative_state[i] = initiative;
    }
  }
  var toSend = {};
  toSend.command = 'roll_initiative';
  toSend.room_number = my_room;
  toSend.initiative_state = game_state.initiative_state;
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
  fogParseZone(1);
}

function unfogCurrentZone() {
  fogParseZone(0);
}

function fogParseZone(mod) {
  var current_zone = zone_number_select.val();
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

  chat_button.css('background-color', 'red');
}

function changeChatVisibility() {
  chat_button.css('background-color', 'white');
  if (notifications_container.style.display == 'none') {
    notifications_container.style.display = 'block';
  } else {
    notifications_container.style.display = 'none';
  }
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

      temp = game_state.HP_state[left_index];
      game_state.HP_state[left_index] = game_state.HP_state[right_index];
      game_state.HP_state[right_index] = temp;

      temp = game_state.initiative_state[left_index];
      game_state.initiative_state[left_index] = game_state.initiative_state[right_index];
      game_state.initiative_state[right_index] = temp;

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
  console.log(data);
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
      }
      character_list = data.character_list;
      obstacle_list = data.obstacle_list;
      weapon_list = data.weapon_list;
      weapon_detailed_info = data.weapon_detailed_info;
    } else if (data.command == 'construct_board_response') {
      construct_board(data.game_state);
    } else if (data.command == 'add_character_response') {
      var character = data.character_info;
      character_detailed_info[data.character_number] = character;
      if (!(my_role == 'player' && game_state.fog_state[data.cell_id] == 1)) {
        var cell = document.getElementById("cell_" + data.cell_id);
        cell.src = character.avatar;
      }
      game_state.board_state[data.cell_id] = data.character_number;
      game_state.HP_state[data.cell_id] = HP_values[character.stamina];
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
      game_state.HP_state[to_index] = data.character_hp;
      game_state.initiative_state[to_index] = data.character_initiative;

      if (!(my_role == 'player' && game_state.fog_state[to_index] == 1)) {
        var to_cell = document.getElementById('cell_' + to_index);
        to_cell.src = data.character_avatar;
      }

      game_state.board_state[from_index] = 0;
      game_state.HP_state[from_index] = 0;
      game_state.initiative_state[from_index] = 0;
      if (!(my_role == 'player' && game_state.fog_state[from_index] == 1)) {
        var old_cell = document.getElementById("cell_" + from_index);
        old_cell.src = EMPTY_CELL_PIC;
      }
    } else if (data.command == 'delete_character_response') {
      game_state.board_state[data.index] = 0;
      if (!(my_role == 'player' && game_state.fog_state[data.index] == 1)) {
        var cell = document.getElementById('cell_' + data.index);
        cell.src = EMPTY_CELL_PIC;
      }
    } else if (data.command == 'roll_initiative_response') {
      game_state.initiative_state = data.initiative_state;
    } else if (data.command == 'deal_damage_response') {
      game_state.HP_state[data.index] = game_state.HP_state[data.index] - data.damage;
    } else if (data.command == 'save_game_response') {
      if (data.success == 1) {
        alert('Game ' + data.save_name + ' saved succesfully');
      } else {
        alert('Game with name ' + data.save_name + ' already exist!');
      }
    } else if (data.command == 'load_game_response') {
      if (data.success == 1) {
        var full_game_state = data.full_game_state;
        character_detailed_info = full_game_state.character_detailed_info;
        obstacle_detailed_info = full_game_state.obstacle_detailed_info;
        construct_board(full_game_state);
      } else {
        alert('Failed to load game ' + data.save_name);
      }
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
      game_state.zone_state[data.index] = data.zone_number;
      game_state.search_modificator_state[data.index] = data.modificator;
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
for (var _i3 = 0; _i3 < CHAT_CASH; _i3++) {
  var current_element = $("<li>");
  current_element.attr('data-name', 'notifications_list_element_' + _i3);
  current_element.attr('class', 'notifications_list_element');
  notifications_list.append(current_element);
}

var board_size_input = $(BOARD_SIZE_INPUT_SELECTOR);
board_size_input.hide();

var save_name_input = $(SAVE_NAME_INPUT_SELECTOR);
save_name_input.hide();

var notifications_container = document.getElementById("notifications-container");
notifications_container.style.display = 'none';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksK0JBQStCLG1DQUFuQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksa0NBQWtDLHNDQUF0QztBQUNBLElBQUksc0JBQXNCLDBCQUExQjtBQUNBLElBQUksdUJBQXVCLDJCQUEzQjtBQUNBLElBQUksdUJBQXVCLDJCQUEzQjtBQUNBLElBQUkseUJBQXlCLDZCQUE3QjtBQUNBLElBQUksMkJBQTJCLCtCQUEvQjtBQUNBLElBQUksNkJBQTZCLGlDQUFqQzs7QUFFQSxJQUFJLHVCQUF1QixrQ0FBM0I7QUFDQSxJQUFJLDhCQUE4QixrQ0FBbEM7O0FBRUEsSUFBSSw0QkFBNEIsZ0NBQWhDO0FBQ0EsSUFBSSwyQkFBMkIsK0JBQS9COztBQUVBLElBQUksOEJBQThCLGtDQUFsQzs7QUFFQSxJQUFJLGlCQUFpQixTQUFTLE1BQVQsQ0FBZ0IsT0FBaEIsQ0FBd0IsT0FBeEIsRUFBaUMsSUFBakMsQ0FBckI7O0FBRUEsSUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLGVBQWUsT0FBZixDQUF1QixVQUF2QixDQUFYLENBQWQ7QUFDQSxJQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsZUFBZSxPQUFmLENBQXVCLFdBQXZCLENBQVgsQ0FBZDtBQUNBLElBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxlQUFlLE9BQWYsQ0FBdUIsYUFBdkIsQ0FBWCxDQUFkOztBQUVBLElBQUksaUJBQWlCLEVBQXJCO0FBQ0EsSUFBSSwwQkFBMEIsRUFBOUI7QUFDQSxJQUFJLGdCQUFnQixFQUFwQjtBQUNBLElBQUkseUJBQXlCLEVBQTdC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QUNELEtBRkQsTUFFTztBQUNMLGNBQVEsR0FBUixDQUFZLDJCQUFaO0FBQ0Q7QUFDRjtBQUNGOztrQkFFYztBQUNiLFlBRGE7QUFFYiwwQ0FGYTtBQUdiLGdEQUhhO0FBSWIsMEJBSmE7QUFLYiw4REFMYTtBQU1iO0FBTmEsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBzb2NrZXQgZnJvbSAnLi93cy1jbGllbnQnO1xyXG5cclxudmFyICQgPSB3aW5kb3cualF1ZXJ5O1xyXG5cclxudmFyIENSRUFURV9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImNyZWF0ZV9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgU0FWRV9CT0FSRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNhdmVfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIExPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJsb2FkX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBST0xMX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJyb2xsX2luaXRpYXRpdmVfYnV0dG9uXCJdJztcclxudmFyIEZPR19CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImZvZ19idXR0b25cIl0nO1xyXG52YXIgWk9ORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInpvbmVfYnV0dG9uXCJdJztcclxudmFyIENIQVRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjaGF0X2J1dHRvblwiXSc7XHJcbnZhciBNSVJST1JfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJtaXJyb3JfYnV0dG9uXCJdJztcclxudmFyIEZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiZm9nX3pvbmVfYnV0dG9uXCJdJztcclxudmFyIFVORk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ1bmZvZ196b25lX2J1dHRvblwiXSc7XHJcblxyXG52YXIgWk9ORV9OVU1CRVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInpvbmVfbnVtYmVyX3NlbGVjdFwiXSc7XHJcbnZhciBTRUFSQ0hfTU9ESUZJQ0FUT1JfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNlYXJjaF9tb2RpZmljYXRvclwiXSc7XHJcblxyXG52YXIgQk9BUkRfU0laRV9JTlBVVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiYm9hcmRfc2l6ZV9pbnB1dFwiXSc7XHJcbnZhciBTQVZFX05BTUVfSU5QVVRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNhdmVfbmFtZV9pbnB1dFwiXSc7XHJcblxyXG52YXIgTk9USUZJQ0FUSU9OU19MSVNUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RcIl0nO1xyXG5cclxudmFyIFNFUlZFUl9BRERSRVNTID0gbG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoL15odHRwLywgJ3dzJyk7XHJcblxyXG52YXIgbXlfbmFtZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKSk7XHJcbnZhciBteV9yb2xlID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3JvbGUnKSk7XHJcbnZhciBteV9yb29tID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdyb29tX251bWJlcicpKTtcclxuXHJcbnZhciBjaGFyYWN0ZXJfbGlzdCA9IFtdO1xyXG52YXIgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIG9ic3RhY2xlX2xpc3QgPSBbXTtcclxudmFyIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIHdlYXBvbl9saXN0ID0gW11cclxudmFyIHdlYXBvbl9kZXRhaWxlZF9pbmZvID0gW107XHJcblxyXG52YXIgVElOWV9FRkZFQ1RfQ0xBU1MgPSAnaXMtdGlueSc7XHJcblxyXG52YXIgRU1QVFlfQ0VMTF9QSUMgPSBcIi4vaW1hZ2VzL3NxdWFyZS5qcGdcIjtcclxudmFyIEZPR19JTUFHRSA9IFwiLi9pbWFnZXMvZm9nLndlYnBcIjtcclxudmFyIFFVRVNUSU9OX0lNQUdFID0gXCIuL2ltYWdlcy9xdWVzdGlvbi5qcGdcIjtcclxuXHJcbnZhciBNQVhfWk9ORVMgPSAyNTtcclxudmFyIENIQVRfQ0FTSCA9IDEwO1xyXG5cclxuLy8gVGhpcyBpcyBhIGNvbnN0YW50LCB3aWxsIGJlIG1vdmVkIHRvIGRhdGFiYXNlIGxhdGVyXHJcbmNvbnN0IEhQX3ZhbHVlcyA9IFsxNSwgMzAsIDQwLCA1NSwgNzUsIDEwMCwgMTMwLCAxNjUsIDIwNSwgMjUwLCAzMDAsIDM1NSwgNDE1XTtcclxuXHJcbmxldCBnYW1lX3N0YXRlID0ge2JvYXJkX3N0YXRlOiBbXSwgSFBfc3RhdGU6IFtdLCBpbml0aWF0aXZlX3N0YXRlOiBbXSwgZm9nX3N0YXRlOiBbXSwgem9uZV9zdGF0ZTogW10sIHNpemU6IDAsIHNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZTogW119O1xyXG5cclxubGV0IGNoYXJhY3Rlcl9iYXNlID0gW107XHJcbmxldCBvYnN0YWNsZV9iYXNlID0gW107XHJcblxyXG5sZXQgZ21fY29udHJvbF9tb2QgPSAwOyAvLyBub3JtYWwgbW9kZVxyXG5cclxubGV0IGZpZWxkX2Nob3NlbiA9IDA7XHJcbmxldCBjaG9zZW5faW5kZXg7XHJcbmxldCBjaG9zZW5fY2hhcmFjdGVyX2luZGV4O1xyXG5sZXQgY2hvc2VuX2NoYXJhY3Rlcl9IUDtcclxubGV0IGNob3Nlbl9jaGFyYWN0ZXJfaW5pdGlhdGl2ZTtcclxuXHJcbmxldCBsYXN0X29ic3RhY2xlO1xyXG5cclxuZnVuY3Rpb24gcmVjb25uZWN0KCkge1xyXG4gIGlmICghc29ja2V0LmlzUmVhZHkoKSkge1xyXG4gICAgc29ja2V0LmluaXQoU0VSVkVSX0FERFJFU1MpO1xyXG4gICAgc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0KCk7XHJcbiAgICBjb25zb2xlLmxvZygnSG9wZWZ1bGx5IHJlY29ubmVjdGVkIChwcmF5KScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnV2FzIG9ubGluZSBhbnl3YXknKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xyXG4gIGdhbWVfc3RhdGUuc2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRfc2l6ZVwiKS52YWx1ZTtcclxuICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS5IUF9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuZm9nX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGUgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUgKiBnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG4gICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5IUF9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlLnB1c2goMCk7XHJcbiAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlLnB1c2goMCk7XHJcbiAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZS5wdXNoKDApO1xyXG4gIH1cclxuICBzZW5kX2NvbnN0cnVjdF9jb21tYW5kKGdhbWVfc3RhdGUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkQm9hcmQoKSB7XHJcbiAgdmFyIG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcF9uYW1lXCIpLnZhbHVlO1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdsb2FkX2dhbWUnO1xyXG4gIHRvU2VuZC5zYXZlX25hbWUgPSBuYW1lO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRfY29uc3RydWN0X2NvbW1hbmQobmV3X2dhbWVfc3RhdGUpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnY29uc3RydWN0X2JvYXJkJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5nYW1lX3N0YXRlID0gbmV3X2dhbWVfc3RhdGU7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vX3NoaWZ0X29uY2xpY2sobXlfcm9sZSwgZ21fY29udHJvbF9tb2QsIGdhbWVfc3RhdGUsIGZpZWxkX2Nob3NlbiwgY2VsbCwgaW5kZXgpIHtcclxuICB2YXIgY2hhcmFjdGVyX3Byb2ZpbGVfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcbiAgY2hhcmFjdGVyX3Byb2ZpbGVfY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIC8vIGdtIHNpZGVcclxuICAgIGlmIChnbV9jb250cm9sX21vZCA9PSAwKSB7XHJcbiAgICAgIC8vIHdlIGFyZSBpbiBub3JtYWwgYWRkL21vdmUgZGVsZXRlIG1vZGVcclxuICAgICAgc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCBteV9yb2xlKTtcclxuICAgIH0gZWxzZSBpZiAoZ21fY29udHJvbF9tb2QgPT0gMSkge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gZm9nIG1vZGVcclxuICAgICAgYXBwbHlGb2coaW5kZXgsIGNlbGwpO1xyXG4gICAgfSBlbHNlIGlmIChnbV9jb250cm9sX21vZCA9PSAyKSB7XHJcbiAgICAgIC8vIHdlIGFyZSBpbiB6b25lcyBtb2RlXHJcbiAgICAgIGFzc2lnblpvbmUoaW5kZXgpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBwbGF5ZXIgc2lkZVxyXG4gICAgaWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9PSAxKSB7XHJcbiAgICAgIC8vIGNsaWNrZWQgZm9nXHJcbiAgICAgIGlmIChmaWVsZF9jaG9zZW4gPT0gMSkge1xyXG4gICAgICAgIHVuZG9fc2VsZWN0aW9uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyBmb2cgZGV0ZWN0ZWQnKTtcclxuICAgICAgICBkaXNwbGF5Rm9nKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0YW5kYXJkX2NlbGxfb25DbGljayhpbmRleCwgY2VsbCwgbXlfcm9sZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb25zdHJ1Y3RfYm9hcmQobmV3X2dhbWVfc3RhdGUpIHtcclxuICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlID0gbmV3X2dhbWVfc3RhdGUuYm9hcmRfc3RhdGU7XHJcbiAgZ2FtZV9zdGF0ZS5IUF9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlLkhQX3N0YXRlO1xyXG4gIGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGU7XHJcbiAgZ2FtZV9zdGF0ZS5zaXplID0gbmV3X2dhbWVfc3RhdGUuc2l6ZTtcclxuICBnYW1lX3N0YXRlLmZvZ19zdGF0ZSA9IG5ld19nYW1lX3N0YXRlLmZvZ19zdGF0ZTtcclxuICBnYW1lX3N0YXRlLnpvbmVfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZS56b25lX3N0YXRlO1xyXG4gIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlID0gbmV3X2dhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlO1xyXG5cclxuICB2YXIgaW5mb19jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICBpbmZvX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICB2YXIgYm9hcmRfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC1jb250YWluZXJcIik7XHJcbiAgYm9hcmRfY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgdmFyIGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xyXG4gIGJvYXJkLmNsYXNzTmFtZSA9IFwiYm9hcmRcIjtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG4gICAgdmFyIHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuICAgIHJvdy5jbGFzc05hbWUgPSBcImJvYXJkX3Jvd1wiO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lX3N0YXRlLnNpemU7IGorKykge1xyXG4gICAgICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICAgICAgdmFyIGNlbGxfaWQgPSBpICogZ2FtZV9zdGF0ZS5zaXplICsgajtcclxuICAgICAgYnV0dG9uLmlkID0gXCJjZWxsX1wiICsgY2VsbF9pZDtcclxuICAgICAgYnV0dG9uLnJvdyA9IGk7XHJcbiAgICAgIGJ1dHRvbi5jb2x1bW4gPSBqO1xyXG4gICAgICB2YXIgaW1hZ2VfbmFtZSA9IGZvZ09yUGljKGNlbGxfaWQpO1xyXG4gICAgICBidXR0b24uc3JjID0gaW1hZ2VfbmFtZTtcclxuICAgICAgYnV0dG9uLnN0eWxlLndpZHRoID0gJzUwcHgnO1xyXG4gICAgICBidXR0b24uc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xyXG4gICAgICBidXR0b24uY2xhc3NOYW1lID0gJ2JvYXJkX2NlbGwnO1xyXG4gICAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gY2VsbC5yb3cgKiBnYW1lX3N0YXRlLnNpemUgKyBjZWxsLmNvbHVtbjtcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdhZGRfb2JzdGFjbGUnO1xyXG4gICAgICAgICAgdG9TZW5kLmNlbGxfaWQgPSBpbmRleDtcclxuICAgICAgICAgIHRvU2VuZC5vYnN0YWNsZV9udW1iZXIgPSBsYXN0X29ic3RhY2xlO1xyXG4gICAgICAgICAgdG9TZW5kLm9ic3RhY2xlX25hbWUgPSBvYnN0YWNsZV9saXN0W2xhc3Rfb2JzdGFjbGUgLSAxXTtcclxuICAgICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbm9fc2hpZnRfb25jbGljayhteV9yb2xlLCBnbV9jb250cm9sX21vZCwgZ2FtZV9zdGF0ZSwgZmllbGRfY2hvc2VuLCBjZWxsLCBpbmRleClcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG4gICAgICB2YXIgY2VsbF93cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xyXG4gICAgICBjZWxsX3dyYXAuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgY2VsbF93cmFwLmNsYXNzTmFtZSA9IFwiY2VsbF93cmFwXCI7XHJcblxyXG4gICAgICB2YXIgem9uZV90ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgem9uZV90ZXh0LmlkID0gXCJ6b25lX3RleHRfXCIgKyBjZWxsX2lkO1xyXG4gICAgICB6b25lX3RleHQuY2xhc3NOYW1lID0gXCJ6b25lX3RleHRcIjtcclxuICAgICAgY2VsbF93cmFwLmFwcGVuZENoaWxkKHpvbmVfdGV4dCk7XHJcblxyXG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbF93cmFwKTtcclxuICAgIH1cclxuICAgIGJvYXJkLmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgfVxyXG4gIGJvYXJkX2NvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzc2lnblpvbmUoaW5kZXgpIHtcclxuICB2YXIgem9uZV9udW1iZXIgPSB6b25lX251bWJlcl9zZWxlY3QudmFsKCk7XHJcbiAgdmFyIG1vZGlmaWNhdG9yID0gc2VhcmNoX21vZGlmaWNhdG9yLnZhbCgpO1xyXG5cclxuICB2YXIgem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3pvbmVfdGV4dF8nICsgaW5kZXgpO1xyXG4gIHpvbmVfdGV4dC5pbm5lckhUTUwgPSB6b25lX251bWJlciArICcoJyArIG1vZGlmaWNhdG9yICsgJyknO1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnYXNzaWduX3pvbmUnO1xyXG4gIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gIHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gIHRvU2VuZC5tb2RpZmljYXRvciA9IG1vZGlmaWNhdG9yO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ09yUGljKGNlbGxfaWQpIHtcclxuICB2YXIgcGljdHVyZV9uYW1lID0gRk9HX0lNQUdFO1xyXG4gIGlmICgoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbY2VsbF9pZF0gIT0gMSl8fChteV9yb2xlID09ICdnbScpKSB7XHJcbiAgICBwaWN0dXJlX25hbWUgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjZWxsX2lkXSk7XHJcbiAgfVxyXG4gIHJldHVybiBwaWN0dXJlX25hbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YW5kYXJkX2NlbGxfb25DbGljayhpbmRleCwgY2VsbCwgcm9sZSkge1xyXG5cdGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA9PSAwKSB7IC8vIGVtcHR5IGNlbGwgY2xpY2tlZFxyXG5cdFx0aWYgKGZpZWxkX2Nob3NlbiA9PSAwKSB7XHJcbiAgICAgIGlmIChyb2xlID09ICdnbScpIHtcclxuXHRcdFx0ICAgYWRkX29iamVjdChpbmRleCk7XHJcbiAgICAgIH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG1vdmVfY2hhcmFjdGVyKGluZGV4LCBjZWxsKTtcclxuXHRcdH1cclxuXHR9IGVsc2UgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID4gMCkgeyAvLyBjaGFyYWN0ZXIgY2xpY2tlZFxyXG5cdFx0aWYgKGZpZWxkX2Nob3NlbiA9PSAwKSB7XHJcblx0XHRcdHNlbGVjdF9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHVuZG9fc2VsZWN0aW9uKCk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHsgLy8gb2JzdGFjbGUgY2xpY2tlZFxyXG5cdFx0aWYgKGZpZWxkX2Nob3NlbiA9PSAwKSB7XHJcblx0XHRcdHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dW5kb19zZWxlY3Rpb24oKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5Rm9nKGluZGV4LCBjZWxsKSB7XHJcblx0aWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9PSAxKSB7XHJcblx0XHQvLyBzZW5kIHVwZGF0ZSBtZXNzYWdlXHJcblx0XHR2YXIgdG9TZW5kID0ge307XHJcblx0XHR0b1NlbmQuY29tbWFuZCA9ICd1cGRhdGVfZm9nJztcclxuXHRcdHRvU2VuZC51cGRhdGVfdHlwZSA9ICdyZW1vdmUnO1xyXG5cdFx0dG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG5cdFx0c29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIHNlbmQgdXBkYXRlIG1lc3NhZ2VcclxuXHRcdHZhciB0b1NlbmQgPSB7fTtcclxuXHRcdHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG5cdFx0dG9TZW5kLnVwZGF0ZV90eXBlID0gJ2FkZCc7XHJcblx0XHR0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblx0XHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZF9vYmplY3QoYm9hcmRfaW5kZXgpIHtcclxuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIHZhciB3ZWFwb25fY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWFwb24taW5mby1jb250YWluZXJcIik7XHJcbiAgd2VhcG9uX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICB2YXIgYnV0dG9uX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgYnV0dG9uX2NvbnRhaW5lci5jbGFzc05hbWUgPSBcImFkZC1vYmplY3QtYnV0dG9uLWNvbnRhaW5lclwiO1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9jaGFyYWN0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbl9hZGRfY2hhcmFjdGVyLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9C10YDRgdC+0L3QsNC20LBcIjtcclxuICBidXR0b25fYWRkX2NoYXJhY3Rlci5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9vYnN0YWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uX2FkZF9vYnN0YWNsZS5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0Ywg0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVwiO1xyXG4gIGJ1dHRvbl9hZGRfb2JzdGFjbGUub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgYWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfY2hhcmFjdGVyKTtcclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfb2JzdGFjbGUpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25fY29udGFpbmVyKTtcclxuXHJcbiAgdGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGlueV9hbmltYXRpb24oY29udGFpbmVyKSB7XHJcbiAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoVElOWV9FRkZFQ1RfQ0xBU1MpO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShUSU5ZX0VGRkVDVF9DTEFTUyk7XHJcbiAgfSwgNTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpIHtcclxuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNlbGVjdC5pZCA9IFwib2JzdGFjbGVfY2hvc2VuXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgb2JzdGFjbGVfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IG9ic3RhY2xlX2xpc3RbaV07XHJcbiAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG4gIGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG4gIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcbiAgICB2YXIgb2JzdGFjbGVfbnVtYmVyID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvYnN0YWNsZV9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9vYnN0YWNsZSc7XHJcbiAgICB0b1NlbmQuY2VsbF9pZCA9IGJ1dHRvbi5ib2FyZF9pbmRleDtcclxuICAgIHRvU2VuZC5vYnN0YWNsZV9udW1iZXIgPSBvYnN0YWNsZV9udW1iZXIgKyAxO1xyXG4gICAgdG9TZW5kLm9ic3RhY2xlX25hbWUgPSBvYnN0YWNsZV9saXN0W29ic3RhY2xlX251bWJlcl07XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgfVxyXG5cclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICB0aW55X2FuaW1hdGlvbihjb250YWluZXIpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX2NoYXJhY3Rlcihib2FyZF9pbmRleCkge1xyXG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2VsZWN0LmlkID0gXCJjaGFyYWN0ZXJfY2hvc2VuXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBjaGFyYWN0ZXJfbGlzdFtpXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaTtcclxuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgfVxyXG5cclxuICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b24uaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMXCI7XHJcbiAgYnV0dG9uLmJvYXJkX2luZGV4ID0gYm9hcmRfaW5kZXg7XHJcbiAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGJ1dHRvbiA9IGV2ZW50LnRhcmdldDtcclxuICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXJfY2hvc2VuXCIpLnZhbHVlKTtcclxuXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdhZGRfY2hhcmFjdGVyJztcclxuICAgIHRvU2VuZC5jZWxsX2lkID0gYnV0dG9uLmJvYXJkX2luZGV4O1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyICsgMTtcclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbmFtZSA9IGNoYXJhY3Rlcl9saXN0W2NoYXJhY3Rlcl9udW1iZXJdO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIH1cclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdCk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgdGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vdmVfY2hhcmFjdGVyKHRvX2luZGV4LCB0b19jZWxsKSB7XHJcbiAgZmllbGRfY2hvc2VuID0gMDtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnbW92ZV9jaGFyYWN0ZXInO1xyXG4gIHRvU2VuZC5mcm9tX2luZGV4ID0gY2hvc2VuX2luZGV4O1xyXG4gIHRvU2VuZC50b19pbmRleCA9IHRvX2luZGV4O1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleDtcclxuICB0b1NlbmQuY2hhcmFjdGVyX2hwID0gY2hvc2VuX2NoYXJhY3Rlcl9IUDtcclxuICB0b1NlbmQuY2hhcmFjdGVyX2luaXRpYXRpdmUgPSBjaG9zZW5fY2hhcmFjdGVyX2luaXRpYXRpdmU7XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9hdmF0YXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5hdmF0YXI7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheUZvZygpIHtcclxuXHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cdHZhciBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgaW5mby5pbm5lckhUTUwgPSAn0JzRiyDQvdC1INC30L3QsNC10LwsINGH0YLQviDRjdGC0L4g0YLQsNC60L7QtS4g0JXRgdC70Lgg0LHRiyDQvNGLINC30L3QsNC70Lgg0YfRgtC+INGN0YLQviDRgtCw0LrQvtC1LCDQvdC+INC80Ysg0L3QtSDQt9C90LDQtdC8Lic7XHJcblxyXG5cdHZhciBmb2dfcGljdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgZm9nX3BpY3R1cmUuc3JjID0gUVVFU1RJT05fSU1BR0U7XHJcbiAgZm9nX3BpY3R1cmUuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGZvZ19waWN0dXJlLnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvKTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9nX3BpY3R1cmUpO1xyXG5cclxuICB0aW55X2FuaW1hdGlvbihjb250YWluZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RfY2hhcmFjdGVyKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2dhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXTtcclxuXHJcbiAgbGV0IG5hbWUgPSBjaGFyYWN0ZXIubmFtZTtcclxuICBsZXQgYXZhdGFyID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuXHJcbiAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICB2YXIgd2VhcG9uX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhcG9uLWluZm8tY29udGFpbmVyXCIpO1xyXG4gIHdlYXBvbl9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIG5hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBuYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gbmFtZTtcclxuXHJcbiAgdmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG4gIHZhciBzdHJlbmd0aF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHN0cmVuZ3RoX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCJD0LjQu9CwOiBcIiArIGNoYXJhY3Rlci5zdHJlbmd0aDtcclxuXHJcbiAgdmFyIHN0YW1pbmFfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBzdGFtaW5hX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQotC10LvQvtGB0LvQvtC20LXQvdC40LU6IFwiICsgY2hhcmFjdGVyLnN0YW1pbmE7XHJcblxyXG4gIHZhciBhZ2lsaXR5X2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgYWdpbGl0eV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JvQvtCy0LrQvtGB0YLRjDogXCIgKyBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcbiAgdmFyIGludGVsbGlnZW5jZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGludGVsbGlnZW5jZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdGC0LXQu9C70LXQutGCOiBcIiArIGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcblxyXG4gIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIEhQX2Rpc3BsYXkuaWQgPSBcIkhQX2Rpc3BsYXlcIjtcclxuICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBnYW1lX3N0YXRlLkhQX3N0YXRlW2luZGV4XTtcclxuXHJcbiAgdmFyIGluaXRpYXRpdmVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBpbml0aWF0aXZlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQmNC90LjRhtC40LDRgtC40LLQsDogXCIgKyBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGVbaW5kZXhdO1xyXG5cclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWVfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGF2YXRhcl9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RyZW5ndGhfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHN0YW1pbmFfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFnaWxpdHlfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGludGVsbGlnZW5jZV9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoSFBfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGluaXRpYXRpdmVfZGlzcGxheSk7XHJcblxyXG4gIHZhciBtb3ZlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgbW92ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQn9C10YDQtdC80LXRidC10L3QuNC1XCI7XHJcbiAgbW92ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBtb3ZlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICBtb3ZlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9waWNrZWQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoY2hhcmFjdGVyX3BpY2tlZC5pbmRleCwgY2hhcmFjdGVyX3BpY2tlZC5jZWxsKTtcclxuICB9XHJcblxyXG4gIHZhciBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBkZWxldGVfYnV0dG9uLmlubmVySFRNTCA9IFwi0KPQvdC40YfRgtC+0LbQuNGC0YxcIjtcclxuICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgZGVsZXRlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICBkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgZGVsZXRlX29iamVjdChldmVudCk7XHJcbiAgfVxyXG5cclxuICB2YXIgZGFtYWdlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgZGFtYWdlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCd0LDQvdC10YHRgtC4INGD0YDQvtC9XCI7XHJcbiAgZGFtYWdlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIGRhbWFnZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW1hZ2VfZmllbGRcIik7XHJcbiAgICBpZiAoIShkYW1hZ2VfZmllbGQudmFsdWUgPT09IFwiXCIpKSB7XHJcbiAgICAgIHZhciBkYW1hZ2UgPSBwYXJzZUludChkYW1hZ2VfZmllbGQudmFsdWUpO1xyXG4gICAgICB2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiSFBfZGlzcGxheVwiKTtcclxuICAgICAgdmFyIG5ld19IUCA9IGdhbWVfc3RhdGUuSFBfc3RhdGVbZXZlbnQudGFyZ2V0LmluZGV4XSAtIGRhbWFnZTtcclxuICAgICAgSFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgbmV3X0hQO1xyXG5cclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdkZWFsX2RhbWFnZSc7XHJcbiAgICAgIHRvU2VuZC5pbmRleCA9IGV2ZW50LnRhcmdldC5pbmRleDtcclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gIGRhbWFnZV9maWVsZC5pZCA9IFwiZGFtYWdlX2ZpZWxkXCI7XHJcbiAgZGFtYWdlX2ZpZWxkLnR5cGUgPSBcIm51bWJlclwiO1xyXG4gIGRhbWFnZV9maWVsZC5wbGFjZWhvbGRlciA9IFwi0JfQvdCw0YfQtdC90LjQtSDRg9GA0L7QvdCwXCI7XHJcblxyXG4gIHZhciBzZWFyY2hfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBzZWFyY2hfYnV0dG9uLmlubmVySFRNTCA9IFwi0J7QsdGL0YHQutCw0YLRjFwiO1xyXG4gIHNlYXJjaF9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBzZWFyY2hfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgc2VhcmNoX2FjdGlvbihldmVudC50YXJnZXQpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHdlYXBvbl9zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHdlYXBvbl9zZWxlY3QuaWQgPSBcIndlYXBvbl9jaG9zZW5cIjtcclxuXHJcbiAgdmFyIGludmVudG9yeSA9IGNoYXJhY3Rlci5pbnZlbnRvcnlcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnZlbnRvcnkubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSB3ZWFwb25fbGlzdFtpbnZlbnRvcnlbaV1dO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpbnZlbnRvcnlbaV07XHJcbiAgICB3ZWFwb25fc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICB9XHJcblxyXG4gIHZhciBwaWNrX3dlYXBvbl9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHBpY2tfd2VhcG9uX2J1dHRvbi5pbm5lckhUTUwgPSBcItCh0LzQtdC90LjRgtGMINC+0YDRg9C20LjQtVwiO1xyXG4gIHBpY2tfd2VhcG9uX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIHBpY2tfd2VhcG9uX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciB3ZWFwb25fc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWFwb25fY2hvc2VuXCIpXHJcbiAgICB2YXIgd2VhcG9uX2luZGV4ID0gd2VhcG9uX3NlbGVjdC52YWx1ZVxyXG4gICAgdmFyIHdlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW3dlYXBvbl9pbmRleF1cclxuXHJcbiAgICB2YXIgd2VhcG9uX3JhbmdlX2Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXBvbl9yYW5nZV9kaXNwbGF5XCIpXHJcbiAgICB3ZWFwb25fcmFuZ2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCU0LDQu9GM0L3QvtGB0YLRjDogXCIgKyB3ZWFwb24ucmFuZ2VcclxuXHJcbiAgICB2YXIgd2VhcG9uX2RhbWFnZV9kaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWFwb25fZGFtYWdlX2Rpc3BsYXlcIilcclxuICAgIHdlYXBvbl9kYW1hZ2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCj0YDQvtC9OiBcIiArIHdlYXBvbi5kYW1hZ2VbMF0gKyAnZCcgKyB3ZWFwb24uZGFtYWdlWzFdXHJcblxyXG4gICAgdmFyIHdlYXBvbl9uYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXBvbl9uYW1lX2Rpc3BsYXlcIilcclxuICAgIHdlYXBvbl9uYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gd2VhcG9uLm5hbWVcclxuXHJcbiAgICB2YXIgd2VhcG9uX2F2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWFwb25fYXZhdGFyX2Rpc3BsYXlcIilcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zcmMgPSB3ZWFwb24uYXZhdGFyO1xyXG4gICAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG4gIH1cclxuXHJcbiAgdmFyIGRlZmF1bHRfd2VhcG9uX2luZGV4ID0gY2hhcmFjdGVyLmludmVudG9yeVswXVxyXG4gIHZhciBkZWZhdWx0X3dlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2RlZmF1bHRfd2VhcG9uX2luZGV4XVxyXG5cclxuICB2YXIgd2VhcG9uX3JhbmdlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgd2VhcG9uX3JhbmdlX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9yYW5nZV9kaXNwbGF5XCI7XHJcbiAgd2VhcG9uX3JhbmdlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQlNCw0LvRjNC90L7RgdGC0Yw6IFwiICsgZGVmYXVsdF93ZWFwb24ucmFuZ2VcclxuXHJcbiAgdmFyIHdlYXBvbl9kYW1hZ2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9kYW1hZ2VfZGlzcGxheVwiO1xyXG4gIHdlYXBvbl9kYW1hZ2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCj0YDQvtC9OiBcIiArIGRlZmF1bHRfd2VhcG9uLmRhbWFnZVswXSArICdkJyArIGRlZmF1bHRfd2VhcG9uLmRhbWFnZVsxXVxyXG5cclxuICB2YXIgd2VhcG9uX2F2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9hdmF0YXJfZGlzcGxheVwiXHJcbiAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LnNyYyA9IGRlZmF1bHRfd2VhcG9uLmF2YXRhcjtcclxuICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuICB2YXIgd2VhcG9uX25hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB3ZWFwb25fbmFtZV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fbmFtZV9kaXNwbGF5XCI7XHJcbiAgd2VhcG9uX25hbWVfZGlzcGxheS5pbm5lckhUTUwgPSBkZWZhdWx0X3dlYXBvbi5uYW1lXHJcblxyXG4gIHdlYXBvbl9jb250YWluZXIuYXBwZW5kKHdlYXBvbl9uYW1lX2Rpc3BsYXkpXHJcbiAgd2VhcG9uX2NvbnRhaW5lci5hcHBlbmQod2VhcG9uX2F2YXRhcl9kaXNwbGF5KVxyXG4gIHdlYXBvbl9jb250YWluZXIuYXBwZW5kKHdlYXBvbl9yYW5nZV9kaXNwbGF5KVxyXG4gIHdlYXBvbl9jb250YWluZXIuYXBwZW5kKHdlYXBvbl9kYW1hZ2VfZGlzcGxheSlcclxuXHJcblxyXG4gIHZhciBidXR0b25fbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICBidXR0b25fbGlzdC5jbGFzc05hbWUgPSBcImJ1dHRvbl9saXN0XCI7XHJcbiAgdmFyIGxpbmUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuXHJcblxyXG4gIGxpbmUxLmFwcGVuZENoaWxkKG1vdmVfYnV0dG9uKTtcclxuICBsaW5lMi5hcHBlbmRDaGlsZChkZWxldGVfYnV0dG9uKTtcclxuICBsaW5lMy5hcHBlbmRDaGlsZChkYW1hZ2VfYnV0dG9uKTtcclxuICBsaW5lMy5hcHBlbmRDaGlsZChkYW1hZ2VfZmllbGQpO1xyXG4gIGxpbmU0LmFwcGVuZENoaWxkKHNlYXJjaF9idXR0b24pO1xyXG4gIGxpbmU1LmFwcGVuZENoaWxkKHBpY2tfd2VhcG9uX2J1dHRvbik7XHJcbiAgbGluZTUuYXBwZW5kQ2hpbGQod2VhcG9uX3NlbGVjdCk7XHJcblxyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUxKTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMik7XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTMpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU0KTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNSk7XHJcblxyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25fbGlzdCk7XHJcblxyXG4gIHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcik7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWFyY2hfYWN0aW9uKHNlYXJjaF9idXR0b24pIHtcclxuICB2YXIgaW5kZXggPSBzZWFyY2hfYnV0dG9uLmluZGV4O1xyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XV07XHJcblxyXG4gIHZhciBuYW1lID0gY2hhcmFjdGVyLm5hbWU7XHJcbiAgdmFyIG1vZGlmaWNhdG9yID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaW5kZXhdO1xyXG4gIHZhciBpbnRlbGxpZ2VuY2UgPSBjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlO1xyXG4gIHZhciByb2xsID0gcm9sbFNlYXJjaChwYXJzZUludChpbnRlbGxpZ2VuY2UpLCBwYXJzZUludChtb2RpZmljYXRvcikpO1xyXG4gIHZhciB6b25lX251bWJlciA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF07XHJcbiAgcHVzaFRvTGlzdCgn0J/QtdGA0YHQvtC90LDQtiAnICsgbmFtZSArICcg0LHRgNC+0YHQuNC7ICcgKyByb2xsICsgJyDQvdCwINCy0L3QuNC80LDRgtC10LvRjNC90L7RgdGC0YwnKTtcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NlYXJjaF9hY3Rpb24nO1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbmFtZSA9IG5hbWU7XHJcbiAgdG9TZW5kLnJvbGwgPSByb2xsO1xyXG4gIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxTZWFyY2goaW50ZWxsaWdlbmNlLCBtb2QpIHtcclxuICByZXR1cm4gaW50ZWxsaWdlbmNlICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjEpICsgbW9kO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfb2JqZWN0KGV2ZW50KSB7XHJcbiAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnZGVsZXRlX2NoYXJhY3Rlcic7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuaW5kZXggPSBldmVudC50YXJnZXQuaW5kZXg7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciBvYnN0YWNsZV9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdICogKC0xKTtcclxuICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW29ic3RhY2xlX2lkXTtcclxuXHJcbiAgLy8ga2VlcCB0cmFjayBvZiBsYXN0IGNob3NlbiBvYnN0YWxlIHRvIHF1aWNrbHkgYWRkIHRvIHRoZSBtYXBcclxuICBsYXN0X29ic3RhY2xlID0gb2JzdGFjbGVfaWRcclxuXHJcbiAgbGV0IG5hbWUgPSBvYnN0YWNsZS5uYW1lO1xyXG4gIGxldCBhdmF0YXIgPSBvYnN0YWNsZS5hdmF0YXI7XHJcblxyXG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIG5hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBuYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gbmFtZTtcclxuXHJcbiAgdmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhdmF0YXJfZGlzcGxheSk7XHJcblxyXG4gIHZhciBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBkZWxldGVfYnV0dG9uLmlubmVySFRNTCA9IFwi0KPQvdC40YfRgtC+0LbQuNGC0YxcIjtcclxuICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgZGVsZXRlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICBkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgZGVsZXRlX29iamVjdChldmVudCk7XHJcbiAgfVxyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVfYnV0dG9uKTtcclxuXHJcbiAgdGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwpIHtcclxuICBmaWVsZF9jaG9zZW4gPSAxO1xyXG4gIGNob3Nlbl9pbmRleCA9IGluZGV4O1xyXG4gIGNob3Nlbl9jaGFyYWN0ZXJfSFAgPSBnYW1lX3N0YXRlLkhQX3N0YXRlW2luZGV4XTtcclxuICBjaG9zZW5fY2hhcmFjdGVyX2luaXRpYXRpdmUgPSBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGVbaW5kZXhdO1xyXG4gIGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXggPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XTtcclxuICBjZWxsLnNyYyA9IFwiLi9pbWFnZXMvbG9hZGluZy53ZWJwXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuZG9fc2VsZWN0aW9uKCkge1xyXG4gIGZpZWxkX2Nob3NlbiA9IDA7XHJcbiAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hvc2VuX2luZGV4KTtcclxuICBvbGRfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2Nob3Nlbl9pbmRleF1dLmF2YXRhcjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X29iamVjdF9waWN0dXJlKGluZGV4X2luX2JvYXJkX3N0YXRlKSB7XHJcbiAgdmFyIGltYWdlID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgdmFyIGluZGV4X2luX2Jhc2U7XHJcbiAgaWYgKGluZGV4X2luX2JvYXJkX3N0YXRlID4gMCkge1xyXG4gICAgaW5kZXhfaW5fYmFzZSA9IGluZGV4X2luX2JvYXJkX3N0YXRlO1xyXG4gICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2luZGV4X2luX2Jhc2VdO1xyXG4gICAgaW1hZ2UgPSBjaGFyYWN0ZXIuYXZhdGFyO1xyXG4gIH0gZWxzZSBpZiAoaW5kZXhfaW5fYm9hcmRfc3RhdGUgPCAwKSB7XHJcbiAgICBpbmRleF9pbl9iYXNlID0gaW5kZXhfaW5fYm9hcmRfc3RhdGUgKiAoLTEpO1xyXG4gICAgdmFyIG9ic3RhY2xlID0gb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tpbmRleF9pbl9iYXNlXTtcclxuICAgIGltYWdlID0gb2JzdGFjbGUuYXZhdGFyO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGltYWdlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlQm9hcmQoKSB7XHJcbiAgdmFyIHNhdmVfbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwX25hbWVcIikudmFsdWU7XHJcbiAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IHtcclxuICAgIHNpemU6IGdhbWVfc3RhdGUuc2l6ZSxcclxuICAgIGJvYXJkX3N0YXRlOiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlLFxyXG4gICAgSFBfc3RhdGU6IGdhbWVfc3RhdGUuSFBfc3RhdGUsXHJcbiAgICBmb2dfc3RhdGU6IGdhbWVfc3RhdGUuZm9nX3N0YXRlLFxyXG4gICAgem9uZV9zdGF0ZTogZ2FtZV9zdGF0ZS56b25lX3N0YXRlLFxyXG4gICAgc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlOiBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZSxcclxuICAgIGluaXRpYXRpdmVfc3RhdGU6IGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZSxcclxuICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvOiBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyxcclxuICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm86IG9ic3RhY2xlX2RldGFpbGVkX2luZm9cclxuICB9O1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2F2ZV9nYW1lJztcclxuICB0b1NlbmQuc2F2ZV9uYW1lID0gc2F2ZV9uYW1lO1xyXG4gIHRvU2VuZC5mdWxsX2dhbWVfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGU7XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZUluaXRpYXRpdmUoYWdpbGl0eSkge1xyXG4gIHJldHVybiBhZ2lsaXR5ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsSW5pdGlhdGl2ZSgpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ldID4gMCkgeyAvLyBzbyB0aGVyZSBpcyBjaGFyYWN0ZXIgYXQgcG9zaXRpb24gaVxyXG4gICAgICAvLyByZXRyaWV2ZSB0aGF0IGNoYXJhY3RlcidzIGFnaWxpdHlcclxuICAgICAgdmFyIGNoYXJhY3Rlcl9pbmRleCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaV07XHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfaW5kZXhdO1xyXG5cclxuICAgICAgdmFyIGFnaWxpdHkgPSBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcbiAgICAgIC8vIHJvbGwgaW5pdGlhdGl2ZSBhbmQgYWRkIGFnaWxpdHkgbW9kaWZpY2F0b3JcclxuICAgICAgdmFyIGluaXRpYXRpdmUgPSBjb21wdXRlSW5pdGlhdGl2ZShwYXJzZUludChhZ2lsaXR5KSk7XHJcblxyXG4gICAgICBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGVbaV0gPSBpbml0aWF0aXZlO1xyXG4gICAgfVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAncm9sbF9pbml0aWF0aXZlJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbml0aWF0aXZlX3N0YXRlID0gZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dNb2RlQ2hhbmdlKCkge1xyXG4gIGlmIChnbV9jb250cm9sX21vZCAhPSAxKSB7XHJcbiAgICAvLyB0dXJuIG9uIGZvZyBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAxO1xyXG4gICAgZm9nX2J1dHRvbi50ZXh0KCfQktGL0LrQuyDQotGD0LzQsNC9INCS0L7QudC90YsnKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpXSA9PSAxKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfY2VsbC5zcmMgPSBGT0dfSU1BR0U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gdHVybiBvZmYgZm9nIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDA7XHJcbiAgICBmb2dfYnV0dG9uLnRleHQoJ9CS0LrQuyDQotGD0LzQsNC9INCS0L7QudC90YsnKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpXSA9PSAxKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfY2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHpvbmVNb2RlQ2hhbmdlKCkge1xyXG4gIGlmIChnbV9jb250cm9sX21vZCAhPSAyKSB7XHJcbiAgICAvLyB0dXJuIG9uIHpvbmUgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMjtcclxuICAgIHpvbmVfYnV0dG9uLnRleHQoJ9CS0YvQutC7INCX0L7QvdCw0LvRjNC90YvQuSDRgNC10LbQuNC8Jyk7XHJcbiAgICB6b25lX251bWJlcl9zZWxlY3Quc2hvdygpO1xyXG4gICAgZm9nX3pvbmVfYnV0dG9uLnNob3coKTtcclxuICAgIHVuZm9nX3pvbmVfYnV0dG9uLnNob3coKTtcclxuICAgIHNlYXJjaF9tb2RpZmljYXRvci5zaG93KCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpXSA+IDApIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF96b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmVfdGV4dF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfem9uZV90ZXh0LmlubmVySFRNTCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpXSArICcoJyArIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2ldICsgJyknO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIGJhY2sgdG8gbm9ybWFsIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMDtcclxuICAgIHpvbmVfYnV0dG9uLnRleHQoJ9CS0LrQuyDQl9C+0L3QsNC70YzQvdGL0Lkg0YDQtdC20LjQvCcpO1xyXG4gICAgem9uZV9udW1iZXJfc2VsZWN0LmhpZGUoKTtcclxuICAgIGZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcbiAgICB1bmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcbiAgICBzZWFyY2hfbW9kaWZpY2F0b3IuaGlkZSgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25lX3RleHRfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X3pvbmVfdGV4dC5pbm5lckhUTUwgPSAnJztcclxuXHRcdH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ0N1cnJlbnRab25lKCkge1xyXG4gIGZvZ1BhcnNlWm9uZSgxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5mb2dDdXJyZW50Wm9uZSgpIHtcclxuICBmb2dQYXJzZVpvbmUoMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ1BhcnNlWm9uZShtb2QpIHtcclxuICB2YXIgY3VycmVudF96b25lID0gem9uZV9udW1iZXJfc2VsZWN0LnZhbCgpO1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICd1cGRhdGVfZm9nJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIGlmIChtb2QgPT0gMCkge1xyXG4gICAgdG9TZW5kLnVwZGF0ZV90eXBlID0gJ3JlbW92ZSc7XHJcbiAgfSBlbHNlIGlmIChtb2QgPT0gMSkge1xyXG4gICAgdG9TZW5kLnVwZGF0ZV90eXBlID0gJ2FkZCc7XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplICogZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIGlmIChnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaV0gPT0gY3VycmVudF96b25lKSB7XHJcbiAgICAgIHRvU2VuZC5pbmRleCA9IGk7XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHVzaFRvTGlzdChtZXNzYWdlKSB7XHJcbiAgZm9yIChsZXQgaT0xOyBpIDwgQ0hBVF9DQVNIOyBpKyspIHtcclxuICAgIHZhciBlbGVtZW50X3RvX2NvcHkgPSAkKCdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIGkgKyAnXCJdJyk7XHJcbiAgICB2YXIgZWxlbWVudF90b19wYXN0ZSA9ICQoJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgKGktMSkgKyAnXCJdJyk7XHJcblxyXG4gICAgZWxlbWVudF90b19wYXN0ZS50ZXh0KGVsZW1lbnRfdG9fY29weS50ZXh0KCkpO1xyXG4gIH1cclxuICB2YXIgdG9wX2VsZW1lbnQgPSAkKCdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIChDSEFUX0NBU0gtMSkgKyAnXCJdJyk7XHJcbiAgdG9wX2VsZW1lbnQudGV4dChtZXNzYWdlKTtcclxuXHJcbiAgY2hhdF9idXR0b24uY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3JlZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VDaGF0VmlzaWJpbGl0eSgpIHtcclxuICBjaGF0X2J1dHRvbi5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnd2hpdGUnKTtcclxuICBpZiAobm90aWZpY2F0aW9uc19jb250YWluZXIuc3R5bGUuZGlzcGxheSA9PSAnbm9uZScpIHtcclxuICAgIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBub3RpZmljYXRpb25zX2NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIH1cclxufVxyXG4vLyB7Ym9hcmRfc3RhdGU6IFtdLCBIUF9zdGF0ZTogW10sIGluaXRpYXRpdmVfc3RhdGU6IFtdLCBmb2dfc3RhdGU6IFtdLCB6b25lX3N0YXRlOiBbXSwgc2l6ZTogMCwgc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlOiBbXX07XHJcbmZ1bmN0aW9uIG1pcnJvcl9ib2FyZCgpIHtcclxuICB2YXIgbGVmdF9pbmRleDtcclxuICB2YXIgcmlnaHRfaW5kZXg7XHJcbiAgdmFyIHRlbXA7XHJcbiAgdmFyIGxlZnRfY2VsbDtcclxuICB2YXIgcmlnaHRfY2VsbDtcclxuICBmb3IgKGxldCB5ID0gMDsgeSA8IGdhbWVfc3RhdGUuc2l6ZTsgeSsrKSB7XHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGdhbWVfc3RhdGUuc2l6ZS8yOyB4KyspIHtcclxuXHJcbiAgICAgIGxlZnRfaW5kZXggPSB5KmdhbWVfc3RhdGUuc2l6ZSArIHg7XHJcbiAgICAgIHJpZ2h0X2luZGV4ID0geSpnYW1lX3N0YXRlLnNpemUgKyBwYXJzZUludChnYW1lX3N0YXRlLnNpemUpIC0geCAtIDE7XHJcbiAgICAgIC8vY29uc29sZS5sb2coJ3k6ICcgKyB5ICsgJyB4OiAnICsgeCArICcgbGVmdCBpbmRleDogJyArIGxlZnRfaW5kZXggKyAnIHJpZ2h0IGluZGV4OiAnICsgcmlnaHRfaW5kZXgpO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuSFBfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuSFBfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLkhQX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5IUF9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgbGVmdF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGxlZnRfaW5kZXgpO1xyXG4gICAgICByaWdodF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHJpZ2h0X2luZGV4KTtcclxuXHJcbiAgICAgIHRlbXAgPSBsZWZ0X2NlbGwuc3JjO1xyXG4gICAgICBsZWZ0X2NlbGwuc3JjID0gcmlnaHRfY2VsbC5zcmM7XHJcbiAgICAgIHJpZ2h0X2NlbGwuc3JjID0gdGVtcDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vc29ja2V0LmluaXQoJ3dzOi8vbG9jYWxob3N0OjMwMDEnKTtcclxuc29ja2V0LmluaXQoU0VSVkVSX0FERFJFU1MpO1xyXG5cclxuc29ja2V0LnJlZ2lzdGVyT3BlbkhhbmRsZXIoKCkgPT4ge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdwbGF5ZXJfaW5mbyc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9sZSA9IG15X3JvbGU7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgdG9TZW5kLnBhc3N3b3JkID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdnbV9wYXNzd29yZCcpKTtcclxuICB9XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0pO1xyXG5cclxuc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoKGRhdGEpID0+IHtcclxuICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICBpZiAoKChkYXRhLnRvX25hbWUgPT0gbXlfbmFtZSkgfHwgKGRhdGEudG9fbmFtZSA9PSAnYWxsJykpICYmIChkYXRhLnJvb21fbnVtYmVyID09IG15X3Jvb20pKSB7XHJcbiAgICBpZiAoZGF0YS5jb21tYW5kID09ICdwbGF5ZXJfaW5mb19yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuaXNWYWxpZCA9PSAwKSB7XHJcbiAgICAgICAgYWxlcnQoJ9Ci0LAg0LrQsNC60L7QuSDRgtGLINCz0LwnKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkYXRhLnJvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgIGNyZWF0ZV9ib2FyZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBsb2FkX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgcm9sbF9pbml0aWF0aXZlX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgZm9nX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfbmFtZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgYm9hcmRfc2l6ZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgbWlycm9yX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0O1xyXG4gICAgICBvYnN0YWNsZV9saXN0ID0gZGF0YS5vYnN0YWNsZV9saXN0O1xyXG4gICAgICB3ZWFwb25fbGlzdCA9IGRhdGEud2VhcG9uX2xpc3RcclxuICAgICAgd2VhcG9uX2RldGFpbGVkX2luZm8gPSBkYXRhLndlYXBvbl9kZXRhaWxlZF9pbmZvXHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NvbnN0cnVjdF9ib2FyZF9yZXNwb25zZScpIHtcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGRhdGEuZ2FtZV9zdGF0ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGRhdGEuY2hhcmFjdGVyX2luZm87XHJcbiAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXI7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuY2VsbF9pZF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBkYXRhLmNlbGxfaWQpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuICAgICAgfVxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBkYXRhLmNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgIGdhbWVfc3RhdGUuSFBfc3RhdGVbZGF0YS5jZWxsX2lkXSA9IEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV07XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX29ic3RhY2xlX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgb2JzdGFjbGUgPSBkYXRhLm9ic3RhY2xlX2luZm87XHJcbiAgICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm9bZGF0YS5vYnN0YWNsZV9udW1iZXJdID0gb2JzdGFjbGU7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuY2VsbF9pZF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBkYXRhLmNlbGxfaWQpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gb2JzdGFjbGUuYXZhdGFyO1xyXG4gICAgICB9XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZGF0YS5jZWxsX2lkXSA9IGRhdGEub2JzdGFjbGVfbnVtYmVyICogKC0xKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdtb3ZlX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIHRvX2luZGV4ID0gZGF0YS50b19pbmRleDtcclxuICAgICAgdmFyIGZyb21faW5kZXggPSBkYXRhLmZyb21faW5kZXg7XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdG9faW5kZXhdID0gZGF0YS5jaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICBnYW1lX3N0YXRlLkhQX3N0YXRlW3RvX2luZGV4XSA9IGRhdGEuY2hhcmFjdGVyX2hwO1xyXG4gICAgICBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGVbdG9faW5kZXhdID0gZGF0YS5jaGFyYWN0ZXJfaW5pdGlhdGl2ZTtcclxuXHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW3RvX2luZGV4XSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcbiAgICAgICAgdG9fY2VsbC5zcmMgPSBkYXRhLmNoYXJhY3Rlcl9hdmF0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG4gICAgICBnYW1lX3N0YXRlLkhQX3N0YXRlW2Zyb21faW5kZXhdID0gMDtcclxuICAgICAgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlW2Zyb21faW5kZXhdID0gMDtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZnJvbV9pbmRleF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZnJvbV9pbmRleCk7XHJcbiAgICAgICAgb2xkX2NlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdkZWxldGVfY2hhcmFjdGVyX3Jlc3BvbnNlJykge1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuaW5kZXhdID0gMDtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZGF0YS5pbmRleF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgZGF0YS5pbmRleCk7XHJcbiAgICAgICAgY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3JvbGxfaW5pdGlhdGl2ZV9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlID0gZGF0YS5pbml0aWF0aXZlX3N0YXRlO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlYWxfZGFtYWdlX3Jlc3BvbnNlJykge1xyXG4gICAgICBnYW1lX3N0YXRlLkhQX3N0YXRlW2RhdGEuaW5kZXhdID0gZ2FtZV9zdGF0ZS5IUF9zdGF0ZVtkYXRhLmluZGV4XSAtIGRhdGEuZGFtYWdlO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NhdmVfZ2FtZV9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgYWxlcnQoJ0dhbWUgJyArIGRhdGEuc2F2ZV9uYW1lICsgJyBzYXZlZCBzdWNjZXNmdWxseScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdHYW1lIHdpdGggbmFtZSAnICsgZGF0YS5zYXZlX25hbWUgKyAnIGFscmVhZHkgZXhpc3QhJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdsb2FkX2dhbWVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT0gMSkge1xyXG4gICAgICAgIHZhciBmdWxsX2dhbWVfc3RhdGUgPSBkYXRhLmZ1bGxfZ2FtZV9zdGF0ZTtcclxuICAgICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbztcclxuICAgICAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gZnVsbF9nYW1lX3N0YXRlLm9ic3RhY2xlX2RldGFpbGVkX2luZm87XHJcbiAgICAgICAgY29uc3RydWN0X2JvYXJkKGZ1bGxfZ2FtZV9zdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBsb2FkIGdhbWUgJyArIGRhdGEuc2F2ZV9uYW1lKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3VwZGF0ZV9mb2dfcmVzcG9uc2UnKSB7XHJcblx0XHRcdFx0dmFyIGluZGV4ID0gZGF0YS5pbmRleDtcclxuXHRcdFx0XHR2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBpbmRleCk7XHJcblx0XHRcdFx0aWYgKGRhdGEudXBkYXRlX3R5cGUgPT0gJ3JlbW92ZScpIHtcclxuXHRcdFx0XHRcdGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9IDA7XHJcblx0XHRcdFx0XHRjZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9IDE7XHJcblx0XHRcdFx0XHRjZWxsLnNyYyA9IEZPR19JTUFHRTtcclxuXHRcdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYXNzaWduX3pvbmVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtkYXRhLmluZGV4XSA9IGRhdGEuem9uZV9udW1iZXI7XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2RhdGEuaW5kZXhdID0gZGF0YS5tb2RpZmljYXRvcjtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdzZWFyY2hfYWN0aW9uX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICAgICAgcHVzaFRvTGlzdChkYXRhLmNoYXJhY3Rlcl9uYW1lICsgJyDQsdGA0L7RgdC40LsgJyArIGRhdGEucm9sbCArICcg0L3QsCDQstC90LjQvNCw0YLQtdC70YzQvdC+0YHRgtGMINCyINC30L7QvdC1ICcgKyBkYXRhLnpvbmVfbnVtYmVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG52YXIgY3JlYXRlX2JvYXJkX2J1dHRvbiA9ICQoQ1JFQVRFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmNyZWF0ZV9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgY3JlYXRlQm9hcmQpO1xyXG5jcmVhdGVfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBzYXZlX2JvYXJkX2J1dHRvbiA9ICQoU0FWRV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBzYXZlQm9hcmQpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgbG9hZF9ib2FyZF9idXR0b24gPSAkKExPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxubG9hZF9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgbG9hZEJvYXJkKTtcclxubG9hZF9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHJvbGxfaW5pdGlhdGl2ZV9idXR0b24gPSAkKFJPTExfSU5JVElBVElWRV9CVVRUT05fU0VMRUNUT1IpO1xyXG5yb2xsX2luaXRpYXRpdmVfYnV0dG9uLm9uKCdjbGljaycsIHJvbGxJbml0aWF0aXZlKTtcclxucm9sbF9pbml0aWF0aXZlX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgZm9nX2J1dHRvbiA9ICQoRk9HX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmZvZ19idXR0b24ub24oJ2NsaWNrJywgZm9nTW9kZUNoYW5nZSk7XHJcbmZvZ19idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHpvbmVfYnV0dG9uID0gJChaT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnpvbmVfYnV0dG9uLm9uKCdjbGljaycsIHpvbmVNb2RlQ2hhbmdlKTtcclxuem9uZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGNoYXRfYnV0dG9uID0gJChDSEFUX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmNoYXRfYnV0dG9uLm9uKCdjbGljaycsIGNoYW5nZUNoYXRWaXNpYmlsaXR5KTtcclxuXHJcbnZhciBtaXJyb3JfYnV0dG9uID0gJChNSVJST1JfQlVUVE9OX1NFTEVDVE9SKTtcclxubWlycm9yX2J1dHRvbi5vbignY2xpY2snLCBtaXJyb3JfYm9hcmQpO1xyXG5taXJyb3JfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBmb2dfem9uZV9idXR0b24gPSAkKEZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmZvZ196b25lX2J1dHRvbi5vbignY2xpY2snLCBmb2dDdXJyZW50Wm9uZSk7XHJcbmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgdW5mb2dfem9uZV9idXR0b24gPSAkKFVORk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxudW5mb2dfem9uZV9idXR0b24ub24oJ2NsaWNrJywgdW5mb2dDdXJyZW50Wm9uZSk7XHJcbnVuZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciB6b25lX251bWJlcl9zZWxlY3QgPSAkKFpPTkVfTlVNQkVSX1NFTEVDVE9SKTtcclxuem9uZV9udW1iZXJfc2VsZWN0LmhpZGUoKTtcclxuZm9yIChsZXQgaSA9IDE7IGkgPCBNQVhfWk9ORVM7IGkrKykge1xyXG4gIHZhciBjdXJyZW50X29wdGlvbiA9ICQoXCI8b3B0aW9uPlwiKTtcclxuICBjdXJyZW50X29wdGlvbi50ZXh0KCfQl9C+0L3QsCAnICsgaSk7XHJcbiAgY3VycmVudF9vcHRpb24udmFsKGkpO1xyXG4gIHpvbmVfbnVtYmVyX3NlbGVjdC5hcHBlbmQoY3VycmVudF9vcHRpb24pO1xyXG59XHJcblxyXG52YXIgc2VhcmNoX21vZGlmaWNhdG9yID0gJChTRUFSQ0hfTU9ESUZJQ0FUT1JfU0VMRUNUT1IpO1xyXG5zZWFyY2hfbW9kaWZpY2F0b3IuaGlkZSgpO1xyXG5cclxudmFyIG5vdGlmaWNhdGlvbnNfbGlzdCA9ICQoTk9USUZJQ0FUSU9OU19MSVNUX1NFTEVDVE9SKTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCBDSEFUX0NBU0g7IGkrKykge1xyXG4gIHZhciBjdXJyZW50X2VsZW1lbnQgPSAkKFwiPGxpPlwiKTtcclxuICBjdXJyZW50X2VsZW1lbnQuYXR0cignZGF0YS1uYW1lJywgJ25vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyBpKTtcclxuICBjdXJyZW50X2VsZW1lbnQuYXR0cignY2xhc3MnLCAnbm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnQnKTtcclxuICBub3RpZmljYXRpb25zX2xpc3QuYXBwZW5kKGN1cnJlbnRfZWxlbWVudCk7XHJcbn1cclxuXHJcbnZhciBib2FyZF9zaXplX2lucHV0ID0gJChCT0FSRF9TSVpFX0lOUFVUX1NFTEVDVE9SKTtcclxuYm9hcmRfc2l6ZV9pbnB1dC5oaWRlKCk7XHJcblxyXG52YXIgc2F2ZV9uYW1lX2lucHV0ID0gJChTQVZFX05BTUVfSU5QVVRfU0VMRUNUT1IpO1xyXG5zYXZlX25hbWVfaW5wdXQuaGlkZSgpO1xyXG5cclxudmFyIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub3RpZmljYXRpb25zLWNvbnRhaW5lclwiKTtcclxubm90aWZpY2F0aW9uc19jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbnNldEludGVydmFsKHJlY29ubmVjdCwgMzAqMTAwMClcclxuIiwibGV0IHNvY2tldDtcclxubGV0IHNlcnZlcl9hZGRyZXNzO1xyXG5sZXQgb25NZXNzYWdlRnVuY3Rpb247XHJcblxyXG5mdW5jdGlvbiBpbml0KHVybCkge1xyXG4gIHNlcnZlcl9hZGRyZXNzID0gdXJsO1xyXG4gIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUmVhZHkoKSB7XHJcbiAgcmV0dXJuIHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTlxyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnb3BlbicpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBvbk1lc3NhZ2VGdW5jdGlvbiA9IGhhbmRsZXJGdW5jdGlvbjtcclxuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKGRhdGEpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0KCkge1xyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICBvbk1lc3NhZ2VGdW5jdGlvbihkYXRhKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShwYXlsb2FkKSB7XHJcbiAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbml0KHNlcnZlcl9hZGRyZXNzKTtcclxuICAgIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIob25NZXNzYWdlRnVuY3Rpb24pO1xyXG4gICAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xyXG4gICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnTm90IHNlbmQsIGJ1dCByZWNvbm5lY3RlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGluaXQsXHJcbiAgcmVnaXN0ZXJPcGVuSGFuZGxlcixcclxuICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyLFxyXG4gIHNlbmRNZXNzYWdlLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0LFxyXG4gIGlzUmVhZHlcclxufVxyXG4iXX0=
