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
  if (!(_wsClient2.default.readyState === WebSocket.OPEN)) {
    _wsClient2.default.init(SERVER_ADDRESS);
    _wsClient2.default.registerMessageHandler(onMessageFunction);
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

  var button_list = document.createElement("ul");
  button_list.className = "button_list";
  var line1 = document.createElement("li");
  var line2 = document.createElement("li");
  var line3 = document.createElement("li");
  var line4 = document.createElement("li");

  line1.appendChild(move_button);
  line2.appendChild(delete_button);
  line3.appendChild(damage_button);
  line3.appendChild(damage_field);
  line4.appendChild(search_button);

  button_list.appendChild(line1);
  button_list.appendChild(line2);
  button_list.appendChild(line3);
  button_list.appendChild(line4);

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
  sendMessage: sendMessage
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksK0JBQStCLG1DQUFuQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksa0NBQWtDLHNDQUF0QztBQUNBLElBQUksc0JBQXNCLDBCQUExQjtBQUNBLElBQUksdUJBQXVCLDJCQUEzQjtBQUNBLElBQUksdUJBQXVCLDJCQUEzQjtBQUNBLElBQUkseUJBQXlCLDZCQUE3QjtBQUNBLElBQUksMkJBQTJCLCtCQUEvQjtBQUNBLElBQUksNkJBQTZCLGlDQUFqQzs7QUFFQSxJQUFJLHVCQUF1QixrQ0FBM0I7QUFDQSxJQUFJLDhCQUE4QixrQ0FBbEM7O0FBRUEsSUFBSSw0QkFBNEIsZ0NBQWhDO0FBQ0EsSUFBSSwyQkFBMkIsK0JBQS9COztBQUVBLElBQUksOEJBQThCLGtDQUFsQzs7QUFFQSxJQUFJLGlCQUFpQixTQUFTLE1BQVQsQ0FBZ0IsT0FBaEIsQ0FBd0IsT0FBeEIsRUFBaUMsSUFBakMsQ0FBckI7O0FBRUEsSUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLGVBQWUsT0FBZixDQUF1QixVQUF2QixDQUFYLENBQWQ7QUFDQSxJQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsZUFBZSxPQUFmLENBQXVCLFdBQXZCLENBQVgsQ0FBZDtBQUNBLElBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxlQUFlLE9BQWYsQ0FBdUIsYUFBdkIsQ0FBWCxDQUFkOztBQUVBLElBQUksaUJBQWlCLEVBQXJCO0FBQ0EsSUFBSSwwQkFBMEIsRUFBOUI7QUFDQSxJQUFJLGdCQUFnQixFQUFwQjtBQUNBLElBQUkseUJBQXlCLEVBQTdC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SUQ7O0FBRUQsU0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQThCO0FBQzVCLE1BQUksT0FBTyxVQUFQLEtBQXNCLFVBQVUsSUFBcEMsRUFBMEM7QUFDeEMsV0FBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsT0FBZixDQUFaO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsU0FBSyxjQUFMO0FBQ0EsMkJBQXVCLGlCQUF2QjtBQUNBLFFBQUksT0FBTyxVQUFQLEtBQXNCLFVBQVUsSUFBcEMsRUFBMEM7QUFDeEMsYUFBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsT0FBZixDQUFaO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsY0FBUSxHQUFSLENBQVksMkJBQVo7QUFDRDtBQUNGO0FBQ0Y7O2tCQUVjO0FBQ2IsWUFEYTtBQUViLDBDQUZhO0FBR2IsZ0RBSGE7QUFJYjtBQUphLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgc29ja2V0IGZyb20gJy4vd3MtY2xpZW50JztcclxuXHJcbnZhciAkID0gd2luZG93LmpRdWVyeTtcclxuXHJcbnZhciBDUkVBVEVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjcmVhdGVfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIFNBVkVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibG9hZF9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgUk9MTF9JTklUSUFUSVZFX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwicm9sbF9pbml0aWF0aXZlX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJmb2dfYnV0dG9uXCJdJztcclxudmFyIFpPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX2J1dHRvblwiXSc7XHJcbnZhciBDSEFUX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY2hhdF9idXR0b25cIl0nO1xyXG52YXIgTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibWlycm9yX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImZvZ196b25lX2J1dHRvblwiXSc7XHJcbnZhciBVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwidW5mb2dfem9uZV9idXR0b25cIl0nO1xyXG5cclxudmFyIFpPTkVfTlVNQkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX251bWJlcl9zZWxlY3RcIl0nO1xyXG52YXIgU0VBUkNIX01PRElGSUNBVE9SX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzZWFyY2hfbW9kaWZpY2F0b3JcIl0nO1xyXG5cclxudmFyIEJPQVJEX1NJWkVfSU5QVVRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJvYXJkX3NpemVfaW5wdXRcIl0nO1xyXG52YXIgU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX25hbWVfaW5wdXRcIl0nO1xyXG5cclxudmFyIE5PVElGSUNBVElPTlNfTElTVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0XCJdJztcclxuXHJcbnZhciBTRVJWRVJfQUREUkVTUyA9IGxvY2F0aW9uLm9yaWdpbi5yZXBsYWNlKC9eaHR0cC8sICd3cycpO1xyXG5cclxudmFyIG15X25hbWUgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJuYW1lJykpO1xyXG52YXIgbXlfcm9sZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcl9yb2xlJykpO1xyXG52YXIgbXlfcm9vbSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncm9vbV9udW1iZXInKSk7XHJcblxyXG52YXIgY2hhcmFjdGVyX2xpc3QgPSBbXTtcclxudmFyIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvID0gW107XHJcbnZhciBvYnN0YWNsZV9saXN0ID0gW107XHJcbnZhciBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gW107XHJcblxyXG52YXIgVElOWV9FRkZFQ1RfQ0xBU1MgPSAnaXMtdGlueSc7XHJcblxyXG52YXIgRU1QVFlfQ0VMTF9QSUMgPSBcIi4vaW1hZ2VzL3NxdWFyZS5qcGdcIjtcclxudmFyIEZPR19JTUFHRSA9IFwiLi9pbWFnZXMvZm9nLndlYnBcIjtcclxudmFyIFFVRVNUSU9OX0lNQUdFID0gXCIuL2ltYWdlcy9xdWVzdGlvbi5qcGdcIjtcclxuXHJcbnZhciBNQVhfWk9ORVMgPSAyNTtcclxudmFyIENIQVRfQ0FTSCA9IDEwO1xyXG5cclxuLy8gVGhpcyBpcyBhIGNvbnN0YW50LCB3aWxsIGJlIG1vdmVkIHRvIGRhdGFiYXNlIGxhdGVyXHJcbmNvbnN0IEhQX3ZhbHVlcyA9IFsxNSwgMzAsIDQwLCA1NSwgNzUsIDEwMCwgMTMwLCAxNjUsIDIwNSwgMjUwLCAzMDAsIDM1NSwgNDE1XTtcclxuXHJcbmxldCBnYW1lX3N0YXRlID0ge2JvYXJkX3N0YXRlOiBbXSwgSFBfc3RhdGU6IFtdLCBpbml0aWF0aXZlX3N0YXRlOiBbXSwgZm9nX3N0YXRlOiBbXSwgem9uZV9zdGF0ZTogW10sIHNpemU6IDAsIHNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZTogW119O1xyXG5cclxubGV0IGNoYXJhY3Rlcl9iYXNlID0gW107XHJcbmxldCBvYnN0YWNsZV9iYXNlID0gW107XHJcblxyXG5sZXQgZ21fY29udHJvbF9tb2QgPSAwOyAvLyBub3JtYWwgbW9kZVxyXG5cclxubGV0IGZpZWxkX2Nob3NlbiA9IDA7XHJcbmxldCBjaG9zZW5faW5kZXg7XHJcbmxldCBjaG9zZW5fY2hhcmFjdGVyX2luZGV4O1xyXG5sZXQgY2hvc2VuX2NoYXJhY3Rlcl9IUDtcclxubGV0IGNob3Nlbl9jaGFyYWN0ZXJfaW5pdGlhdGl2ZTtcclxuXHJcbmxldCBsYXN0X29ic3RhY2xlO1xyXG5cclxuZnVuY3Rpb24gcmVjb25uZWN0KCkge1xyXG4gIGlmICghKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikpIHtcclxuICAgIHNvY2tldC5pbml0KFNFUlZFUl9BRERSRVNTKTtcclxuICAgIHNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKG9uTWVzc2FnZUZ1bmN0aW9uKTtcclxuICAgIGNvbnNvbGUubG9nKCdIb3BlZnVsbHkgcmVjb25uZWN0ZWQgKHByYXkpJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKCdXYXMgb25saW5lIGFueXdheScpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XHJcbiAgZ2FtZV9zdGF0ZS5zaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZF9zaXplXCIpLnZhbHVlO1xyXG4gIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLkhQX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLnpvbmVfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZSA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSAqIGdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlLnB1c2goMCk7XHJcbiAgICBnYW1lX3N0YXRlLkhQX3N0YXRlLnB1c2goMCk7XHJcbiAgICBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlLnB1c2goMCk7XHJcbiAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlLnB1c2goMCk7XHJcbiAgfVxyXG4gIHNlbmRfY29uc3RydWN0X2NvbW1hbmQoZ2FtZV9zdGF0ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRCb2FyZCgpIHtcclxuICB2YXIgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwX25hbWVcIikudmFsdWU7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2xvYWRfZ2FtZSc7XHJcbiAgdG9TZW5kLnNhdmVfbmFtZSA9IG5hbWU7XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZF9jb25zdHJ1Y3RfY29tbWFuZChuZXdfZ2FtZV9zdGF0ZSkge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdjb25zdHJ1Y3RfYm9hcmQnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmdhbWVfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbm9fc2hpZnRfb25jbGljayhteV9yb2xlLCBnbV9jb250cm9sX21vZCwgZ2FtZV9zdGF0ZSwgZmllbGRfY2hvc2VuLCBjZWxsLCBpbmRleCkge1xyXG4gIHZhciBjaGFyYWN0ZXJfcHJvZmlsZV9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICBjaGFyYWN0ZXJfcHJvZmlsZV9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgLy8gZ20gc2lkZVxyXG4gICAgaWYgKGdtX2NvbnRyb2xfbW9kID09IDApIHtcclxuICAgICAgLy8gd2UgYXJlIGluIG5vcm1hbCBhZGQvbW92ZSBkZWxldGUgbW9kZVxyXG4gICAgICBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIG15X3JvbGUpO1xyXG4gICAgfSBlbHNlIGlmIChnbV9jb250cm9sX21vZCA9PSAxKSB7XHJcbiAgICAgIC8vIHdlIGFyZSBpbiBmb2cgbW9kZVxyXG4gICAgICBhcHBseUZvZyhpbmRleCwgY2VsbCk7XHJcbiAgICB9IGVsc2UgaWYgKGdtX2NvbnRyb2xfbW9kID09IDIpIHtcclxuICAgICAgLy8gd2UgYXJlIGluIHpvbmVzIG1vZGVcclxuICAgICAgYXNzaWduWm9uZShpbmRleCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIHBsYXllciBzaWRlXHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDEpIHtcclxuICAgICAgLy8gY2xpY2tlZCBmb2dcclxuICAgICAgaWYgKGZpZWxkX2Nob3NlbiA9PSAxKSB7XHJcbiAgICAgICAgdW5kb19zZWxlY3Rpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnIGZvZyBkZXRlY3RlZCcpO1xyXG4gICAgICAgIGRpc3BsYXlGb2coKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCBteV9yb2xlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbnN0cnVjdF9ib2FyZChuZXdfZ2FtZV9zdGF0ZSkge1xyXG4gIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZTtcclxuICBnYW1lX3N0YXRlLkhQX3N0YXRlID0gbmV3X2dhbWVfc3RhdGUuSFBfc3RhdGU7XHJcbiAgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlID0gbmV3X2dhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZTtcclxuICBnYW1lX3N0YXRlLnNpemUgPSBuZXdfZ2FtZV9zdGF0ZS5zaXplO1xyXG4gIGdhbWVfc3RhdGUuZm9nX3N0YXRlID0gbmV3X2dhbWVfc3RhdGUuZm9nX3N0YXRlO1xyXG4gIGdhbWVfc3RhdGUuem9uZV9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlLnpvbmVfc3RhdGU7XHJcbiAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGU7XHJcblxyXG4gIHZhciBpbmZvX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gIGluZm9fY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIHZhciBib2FyZF9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkLWNvbnRhaW5lclwiKTtcclxuICBib2FyZF9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICB2YXIgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XHJcbiAgYm9hcmQuY2xhc3NOYW1lID0gXCJib2FyZFwiO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICB2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG4gICAgcm93LmNsYXNzTmFtZSA9IFwiYm9hcmRfcm93XCI7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVfc3RhdGUuc2l6ZTsgaisrKSB7XHJcbiAgICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gICAgICB2YXIgY2VsbF9pZCA9IGkgKiBnYW1lX3N0YXRlLnNpemUgKyBqO1xyXG4gICAgICBidXR0b24uaWQgPSBcImNlbGxfXCIgKyBjZWxsX2lkO1xyXG4gICAgICBidXR0b24ucm93ID0gaTtcclxuICAgICAgYnV0dG9uLmNvbHVtbiA9IGo7XHJcbiAgICAgIHZhciBpbWFnZV9uYW1lID0gZm9nT3JQaWMoY2VsbF9pZCk7XHJcbiAgICAgIGJ1dHRvbi5zcmMgPSBpbWFnZV9uYW1lO1xyXG4gICAgICBidXR0b24uc3R5bGUud2lkdGggPSAnNTBweCc7XHJcbiAgICAgIGJ1dHRvbi5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XHJcbiAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAnYm9hcmRfY2VsbCc7XHJcbiAgICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICB2YXIgaW5kZXggPSBjZWxsLnJvdyAqIGdhbWVfc3RhdGUuc2l6ZSArIGNlbGwuY29sdW1uO1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICAgIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9vYnN0YWNsZSc7XHJcbiAgICAgICAgICB0b1NlbmQuY2VsbF9pZCA9IGluZGV4O1xyXG4gICAgICAgICAgdG9TZW5kLm9ic3RhY2xlX251bWJlciA9IGxhc3Rfb2JzdGFjbGU7XHJcbiAgICAgICAgICB0b1NlbmQub2JzdGFjbGVfbmFtZSA9IG9ic3RhY2xlX2xpc3RbbGFzdF9vYnN0YWNsZSAtIDFdO1xyXG4gICAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBub19zaGlmdF9vbmNsaWNrKG15X3JvbGUsIGdtX2NvbnRyb2xfbW9kLCBnYW1lX3N0YXRlLCBmaWVsZF9jaG9zZW4sIGNlbGwsIGluZGV4KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH07XHJcbiAgICAgIHZhciBjZWxsX3dyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XHJcbiAgICAgIGNlbGxfd3JhcC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICBjZWxsX3dyYXAuY2xhc3NOYW1lID0gXCJjZWxsX3dyYXBcIjtcclxuXHJcbiAgICAgIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICB6b25lX3RleHQuaWQgPSBcInpvbmVfdGV4dF9cIiArIGNlbGxfaWQ7XHJcbiAgICAgIHpvbmVfdGV4dC5jbGFzc05hbWUgPSBcInpvbmVfdGV4dFwiO1xyXG4gICAgICBjZWxsX3dyYXAuYXBwZW5kQ2hpbGQoem9uZV90ZXh0KTtcclxuXHJcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsX3dyYXApO1xyXG4gICAgfVxyXG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQocm93KTtcclxuICB9XHJcbiAgYm9hcmRfY29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduWm9uZShpbmRleCkge1xyXG4gIHZhciB6b25lX251bWJlciA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICB2YXIgbW9kaWZpY2F0b3IgPSBzZWFyY2hfbW9kaWZpY2F0b3IudmFsKCk7XHJcblxyXG4gIHZhciB6b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9uZV90ZXh0XycgKyBpbmRleCk7XHJcbiAgem9uZV90ZXh0LmlubmVySFRNTCA9IHpvbmVfbnVtYmVyICsgJygnICsgbW9kaWZpY2F0b3IgKyAnKSc7XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdhc3NpZ25fem9uZSc7XHJcbiAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgdG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgdG9TZW5kLm1vZGlmaWNhdG9yID0gbW9kaWZpY2F0b3I7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9nT3JQaWMoY2VsbF9pZCkge1xyXG4gIHZhciBwaWN0dXJlX25hbWUgPSBGT0dfSU1BR0U7XHJcbiAgaWYgKChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtjZWxsX2lkXSAhPSAxKXx8KG15X3JvbGUgPT0gJ2dtJykpIHtcclxuICAgIHBpY3R1cmVfbmFtZSA9IGdldF9vYmplY3RfcGljdHVyZShnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NlbGxfaWRdKTtcclxuICB9XHJcbiAgcmV0dXJuIHBpY3R1cmVfbmFtZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhbmRhcmRfY2VsbF9vbkNsaWNrKGluZGV4LCBjZWxsLCByb2xlKSB7XHJcblx0aWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID09IDApIHsgLy8gZW1wdHkgY2VsbCBjbGlja2VkXHJcblx0XHRpZiAoZmllbGRfY2hvc2VuID09IDApIHtcclxuICAgICAgaWYgKHJvbGUgPT0gJ2dtJykge1xyXG5cdFx0XHQgICBhZGRfb2JqZWN0KGluZGV4KTtcclxuICAgICAgfVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bW92ZV9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gPiAwKSB7IC8vIGNoYXJhY3RlciBjbGlja2VkXHJcblx0XHRpZiAoZmllbGRfY2hvc2VuID09IDApIHtcclxuXHRcdFx0c2VsZWN0X2NoYXJhY3RlcihpbmRleCwgY2VsbCk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dW5kb19zZWxlY3Rpb24oKTtcclxuXHRcdH1cclxuXHR9IGVsc2UgeyAvLyBvYnN0YWNsZSBjbGlja2VkXHJcblx0XHRpZiAoZmllbGRfY2hvc2VuID09IDApIHtcclxuXHRcdFx0c2VsZWN0X29ic3RhY2xlKGluZGV4LCBjZWxsKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR1bmRvX3NlbGVjdGlvbigpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlGb2coaW5kZXgsIGNlbGwpIHtcclxuXHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDEpIHtcclxuXHRcdC8vIHNlbmQgdXBkYXRlIG1lc3NhZ2VcclxuXHRcdHZhciB0b1NlbmQgPSB7fTtcclxuXHRcdHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG5cdFx0dG9TZW5kLnVwZGF0ZV90eXBlID0gJ3JlbW92ZSc7XHJcblx0XHR0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblx0XHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gc2VuZCB1cGRhdGUgbWVzc2FnZVxyXG5cdFx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdFx0dG9TZW5kLmNvbW1hbmQgPSAndXBkYXRlX2ZvZyc7XHJcblx0XHR0b1NlbmQudXBkYXRlX3R5cGUgPSAnYWRkJztcclxuXHRcdHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuXHRcdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX29iamVjdChib2FyZF9pbmRleCkge1xyXG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIGJ1dHRvbl9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGJ1dHRvbl9jb250YWluZXIuY2xhc3NOYW1lID0gXCJhZGQtb2JqZWN0LWJ1dHRvbi1jb250YWluZXJcIjtcclxuXHJcbiAgdmFyIGJ1dHRvbl9hZGRfY2hhcmFjdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b25fYWRkX2NoYXJhY3Rlci5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0Ywg0L/QtdGA0YHQvtC90LDQttCwXCI7XHJcbiAgYnV0dG9uX2FkZF9jaGFyYWN0ZXIub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgYWRkX2NoYXJhY3Rlcihib2FyZF9pbmRleCk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGJ1dHRvbl9hZGRfb2JzdGFjbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbl9hZGRfb2JzdGFjbGUuaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMINC/0YDQtdC/0Y/RgtGB0YLQstC40LVcIjtcclxuICBidXR0b25fYWRkX29ic3RhY2xlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGFkZF9vYnN0YWNsZShib2FyZF9pbmRleCk7XHJcbiAgfTtcclxuXHJcbiAgYnV0dG9uX2NvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25fYWRkX2NoYXJhY3Rlcik7XHJcbiAgYnV0dG9uX2NvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25fYWRkX29ic3RhY2xlKTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2NvbnRhaW5lcik7XHJcblxyXG4gIHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcikge1xyXG4gIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoVElOWV9FRkZFQ1RfQ0xBU1MpO1xyXG4gIH0sIDUwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KSB7XHJcbiAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICB2YXIgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICBzZWxlY3QuaWQgPSBcIm9ic3RhY2xlX2Nob3NlblwiO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG9ic3RhY2xlX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBvYnN0YWNsZV9saXN0W2ldO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpO1xyXG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICB9XHJcblxyXG4gIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbi5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0YxcIjtcclxuICBidXR0b24uYm9hcmRfaW5kZXggPSBib2FyZF9pbmRleDtcclxuICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgdmFyIG9ic3RhY2xlX251bWJlciA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2JzdGFjbGVfY2hvc2VuXCIpLnZhbHVlKTtcclxuXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdhZGRfb2JzdGFjbGUnO1xyXG4gICAgdG9TZW5kLmNlbGxfaWQgPSBidXR0b24uYm9hcmRfaW5kZXg7XHJcbiAgICB0b1NlbmQub2JzdGFjbGVfbnVtYmVyID0gb2JzdGFjbGVfbnVtYmVyICsgMTtcclxuICAgIHRvU2VuZC5vYnN0YWNsZV9uYW1lID0gb2JzdGFjbGVfbGlzdFtvYnN0YWNsZV9udW1iZXJdO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIH1cclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdCk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgdGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZF9jaGFyYWN0ZXIoYm9hcmRfaW5kZXgpIHtcclxuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNlbGVjdC5pZCA9IFwiY2hhcmFjdGVyX2Nob3NlblwiO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJhY3Rlcl9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gY2hhcmFjdGVyX2xpc3RbaV07XHJcbiAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG4gIGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG4gIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcbiAgICB2YXIgY2hhcmFjdGVyX251bWJlciA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyX2Nob3NlblwiKS52YWx1ZSk7XHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX2NoYXJhY3Rlcic7XHJcbiAgICB0b1NlbmQuY2VsbF9pZCA9IGJ1dHRvbi5ib2FyZF9pbmRleDtcclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlciArIDE7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBjaGFyYWN0ZXJfbGlzdFtjaGFyYWN0ZXJfbnVtYmVyXTtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICB9XHJcblxyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3QpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gIHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcik7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZlX2NoYXJhY3Rlcih0b19pbmRleCwgdG9fY2VsbCkge1xyXG4gIGZpZWxkX2Nob3NlbiA9IDA7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ21vdmVfY2hhcmFjdGVyJztcclxuICB0b1NlbmQuZnJvbV9pbmRleCA9IGNob3Nlbl9pbmRleDtcclxuICB0b1NlbmQudG9faW5kZXggPSB0b19pbmRleDtcclxuICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXg7XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9ocCA9IGNob3Nlbl9jaGFyYWN0ZXJfSFA7XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9pbml0aWF0aXZlID0gY2hvc2VuX2NoYXJhY3Rlcl9pbml0aWF0aXZlO1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfYXZhdGFyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uYXZhdGFyO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlGb2coKSB7XHJcblx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHR2YXIgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIGluZm8uaW5uZXJIVE1MID0gJ9Cc0Ysg0L3QtSDQt9C90LDQtdC8LCDRh9GC0L4g0Y3RgtC+INGC0LDQutC+0LUuINCV0YHQu9C4INCx0Ysg0LzRiyDQt9C90LDQu9C4INGH0YLQviDRjdGC0L4g0YLQsNC60L7QtSwg0L3QviDQvNGLINC90LUg0LfQvdCw0LXQvC4nO1xyXG5cclxuXHR2YXIgZm9nX3BpY3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIGZvZ19waWN0dXJlLnNyYyA9IFFVRVNUSU9OX0lNQUdFO1xyXG4gIGZvZ19waWN0dXJlLnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBmb2dfcGljdHVyZS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5mbyk7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGZvZ19waWN0dXJlKTtcclxuXHJcbiAgdGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0X2NoYXJhY3RlcihpbmRleCwgY2VsbCkge1xyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XV07XHJcblxyXG4gIGxldCBuYW1lID0gY2hhcmFjdGVyLm5hbWU7XHJcbiAgbGV0IGF2YXRhciA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcblxyXG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIG5hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBuYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gbmFtZTtcclxuXHJcbiAgdmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG4gIHZhciBzdHJlbmd0aF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHN0cmVuZ3RoX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCJD0LjQu9CwOiBcIiArIGNoYXJhY3Rlci5zdHJlbmd0aDtcclxuXHJcbiAgdmFyIHN0YW1pbmFfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBzdGFtaW5hX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQotC10LvQvtGB0LvQvtC20LXQvdC40LU6IFwiICsgY2hhcmFjdGVyLnN0YW1pbmE7XHJcblxyXG4gIHZhciBhZ2lsaXR5X2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgYWdpbGl0eV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JvQvtCy0LrQvtGB0YLRjDogXCIgKyBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcbiAgdmFyIGludGVsbGlnZW5jZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGludGVsbGlnZW5jZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdGC0LXQu9C70LXQutGCOiBcIiArIGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcblxyXG4gIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIEhQX2Rpc3BsYXkuaWQgPSBcIkhQX2Rpc3BsYXlcIjtcclxuICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBnYW1lX3N0YXRlLkhQX3N0YXRlW2luZGV4XTtcclxuXHJcbiAgdmFyIGluaXRpYXRpdmVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBpbml0aWF0aXZlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQmNC90LjRhtC40LDRgtC40LLQsDogXCIgKyBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGVbaW5kZXhdO1xyXG5cclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWVfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGF2YXRhcl9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RyZW5ndGhfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHN0YW1pbmFfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFnaWxpdHlfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGludGVsbGlnZW5jZV9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoSFBfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGluaXRpYXRpdmVfZGlzcGxheSk7XHJcblxyXG4gIHZhciBtb3ZlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgbW92ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQn9C10YDQtdC80LXRidC10L3QuNC1XCI7XHJcbiAgbW92ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBtb3ZlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICBtb3ZlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9waWNrZWQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoY2hhcmFjdGVyX3BpY2tlZC5pbmRleCwgY2hhcmFjdGVyX3BpY2tlZC5jZWxsKTtcclxuICB9XHJcblxyXG4gIHZhciBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBkZWxldGVfYnV0dG9uLmlubmVySFRNTCA9IFwi0KPQvdC40YfRgtC+0LbQuNGC0YxcIjtcclxuICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgZGVsZXRlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICBkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgZGVsZXRlX29iamVjdChldmVudCk7XHJcbiAgfVxyXG5cclxuICB2YXIgZGFtYWdlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgZGFtYWdlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCd0LDQvdC10YHRgtC4INGD0YDQvtC9XCI7XHJcbiAgZGFtYWdlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIGRhbWFnZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYW1hZ2VfZmllbGRcIik7XHJcbiAgICBpZiAoIShkYW1hZ2VfZmllbGQudmFsdWUgPT09IFwiXCIpKSB7XHJcbiAgICAgIHZhciBkYW1hZ2UgPSBwYXJzZUludChkYW1hZ2VfZmllbGQudmFsdWUpO1xyXG4gICAgICB2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiSFBfZGlzcGxheVwiKTtcclxuICAgICAgdmFyIG5ld19IUCA9IGdhbWVfc3RhdGUuSFBfc3RhdGVbZXZlbnQudGFyZ2V0LmluZGV4XSAtIGRhbWFnZTtcclxuICAgICAgSFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgbmV3X0hQO1xyXG5cclxuICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICB0b1NlbmQuY29tbWFuZCA9ICdkZWFsX2RhbWFnZSc7XHJcbiAgICAgIHRvU2VuZC5pbmRleCA9IGV2ZW50LnRhcmdldC5pbmRleDtcclxuICAgICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgZGFtYWdlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gIGRhbWFnZV9maWVsZC5pZCA9IFwiZGFtYWdlX2ZpZWxkXCI7XHJcbiAgZGFtYWdlX2ZpZWxkLnR5cGUgPSBcIm51bWJlclwiO1xyXG4gIGRhbWFnZV9maWVsZC5wbGFjZWhvbGRlciA9IFwi0JfQvdCw0YfQtdC90LjQtSDRg9GA0L7QvdCwXCI7XHJcblxyXG4gIHZhciBzZWFyY2hfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBzZWFyY2hfYnV0dG9uLmlubmVySFRNTCA9IFwi0J7QsdGL0YHQutCw0YLRjFwiO1xyXG4gIHNlYXJjaF9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBzZWFyY2hfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgc2VhcmNoX2FjdGlvbihldmVudC50YXJnZXQpO1xyXG4gIH1cclxuXHJcbiAgdmFyIGJ1dHRvbl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gIGJ1dHRvbl9saXN0LmNsYXNzTmFtZSA9IFwiYnV0dG9uX2xpc3RcIjtcclxuICB2YXIgbGluZTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcblxyXG5cclxuICBsaW5lMS5hcHBlbmRDaGlsZChtb3ZlX2J1dHRvbik7XHJcbiAgbGluZTIuYXBwZW5kQ2hpbGQoZGVsZXRlX2J1dHRvbik7XHJcbiAgbGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2J1dHRvbik7XHJcbiAgbGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2ZpZWxkKTtcclxuICBsaW5lNC5hcHBlbmRDaGlsZChzZWFyY2hfYnV0dG9uKTtcclxuXHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTEpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUyKTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMyk7XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTQpO1xyXG5cclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2xpc3QpO1xyXG5cclxuICB0aW55X2FuaW1hdGlvbihjb250YWluZXIpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gc2VhcmNoX2FjdGlvbihzZWFyY2hfYnV0dG9uKSB7XHJcbiAgdmFyIGluZGV4ID0gc2VhcmNoX2J1dHRvbi5pbmRleDtcclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1dO1xyXG5cclxuICB2YXIgbmFtZSA9IGNoYXJhY3Rlci5uYW1lO1xyXG4gIHZhciBtb2RpZmljYXRvciA9IGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2luZGV4XTtcclxuICB2YXIgaW50ZWxsaWdlbmNlID0gY2hhcmFjdGVyLmludGVsbGlnZW5jZTtcclxuICB2YXIgcm9sbCA9IHJvbGxTZWFyY2gocGFyc2VJbnQoaW50ZWxsaWdlbmNlKSwgcGFyc2VJbnQobW9kaWZpY2F0b3IpKTtcclxuICB2YXIgem9uZV9udW1iZXIgPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaW5kZXhdO1xyXG4gIHB1c2hUb0xpc3QoJ9Cf0LXRgNGB0L7QvdCw0LYgJyArIG5hbWUgKyAnINCx0YDQvtGB0LjQuyAnICsgcm9sbCArICcg0L3QsCDQstC90LjQvNCw0YLQtdC70YzQvdC+0YHRgtGMJyk7XHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdzZWFyY2hfYWN0aW9uJztcclxuICB0b1NlbmQuY2hhcmFjdGVyX25hbWUgPSBuYW1lO1xyXG4gIHRvU2VuZC5yb2xsID0gcm9sbDtcclxuICB0b1NlbmQuem9uZV9udW1iZXIgPSB6b25lX251bWJlcjtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsU2VhcmNoKGludGVsbGlnZW5jZSwgbW9kKSB7XHJcbiAgcmV0dXJuIGludGVsbGlnZW5jZSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIxKSArIG1vZDtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlX29iamVjdChldmVudCkge1xyXG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2RlbGV0ZV9jaGFyYWN0ZXInO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmluZGV4ID0gZXZlbnQudGFyZ2V0LmluZGV4O1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3Rfb2JzdGFjbGUoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgb2JzdGFjbGVfaWQgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSAqICgtMSk7XHJcbiAgdmFyIG9ic3RhY2xlID0gb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tvYnN0YWNsZV9pZF07XHJcblxyXG4gIC8vIGtlZXAgdHJhY2sgb2YgbGFzdCBjaG9zZW4gb2JzdGFsZSB0byBxdWlja2x5IGFkZCB0byB0aGUgbWFwXHJcbiAgbGFzdF9vYnN0YWNsZSA9IG9ic3RhY2xlX2lkXHJcblxyXG4gIGxldCBuYW1lID0gb2JzdGFjbGUubmFtZTtcclxuICBsZXQgYXZhdGFyID0gb2JzdGFjbGUuYXZhdGFyO1xyXG5cclxuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIHZhciBuYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IG5hbWU7XHJcblxyXG4gIHZhciBhdmF0YXJfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3JjID0gYXZhdGFyO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmFtZV9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYXZhdGFyX2Rpc3BsYXkpO1xyXG5cclxuICB2YXIgZGVsZXRlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCj0L3QuNGH0YLQvtC20LjRgtGMXCI7XHJcbiAgZGVsZXRlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIGRlbGV0ZV9idXR0b24uY2VsbCA9IGNlbGw7XHJcbiAgZGVsZXRlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGRlbGV0ZV9vYmplY3QoZXZlbnQpO1xyXG4gIH1cclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGVsZXRlX2J1dHRvbik7XHJcblxyXG4gIHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcik7XHJcblxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY2hvb3NlX2NoYXJhY3Rlcl90b19tb3ZlKGluZGV4LCBjZWxsKSB7XHJcbiAgZmllbGRfY2hvc2VuID0gMTtcclxuICBjaG9zZW5faW5kZXggPSBpbmRleDtcclxuICBjaG9zZW5fY2hhcmFjdGVyX0hQID0gZ2FtZV9zdGF0ZS5IUF9zdGF0ZVtpbmRleF07XHJcbiAgY2hvc2VuX2NoYXJhY3Rlcl9pbml0aWF0aXZlID0gZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlW2luZGV4XTtcclxuICBjaG9zZW5fY2hhcmFjdGVyX2luZGV4ID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF07XHJcbiAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL2xvYWRpbmcud2VicFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1bmRvX3NlbGVjdGlvbigpIHtcclxuICBmaWVsZF9jaG9zZW4gPSAwO1xyXG4gIHZhciBvbGRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGNob3Nlbl9pbmRleCk7XHJcbiAgb2xkX2NlbGwuc3JjID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtjaG9zZW5faW5kZXhdXS5hdmF0YXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldF9vYmplY3RfcGljdHVyZShpbmRleF9pbl9ib2FyZF9zdGF0ZSkge1xyXG4gIHZhciBpbWFnZSA9IEVNUFRZX0NFTExfUElDO1xyXG4gIHZhciBpbmRleF9pbl9iYXNlO1xyXG4gIGlmIChpbmRleF9pbl9ib2FyZF9zdGF0ZSA+IDApIHtcclxuICAgIGluZGV4X2luX2Jhc2UgPSBpbmRleF9pbl9ib2FyZF9zdGF0ZTtcclxuICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tpbmRleF9pbl9iYXNlXTtcclxuICAgIGltYWdlID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuICB9IGVsc2UgaWYgKGluZGV4X2luX2JvYXJkX3N0YXRlIDwgMCkge1xyXG4gICAgaW5kZXhfaW5fYmFzZSA9IGluZGV4X2luX2JvYXJkX3N0YXRlICogKC0xKTtcclxuICAgIHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlX2RldGFpbGVkX2luZm9baW5kZXhfaW5fYmFzZV07XHJcbiAgICBpbWFnZSA9IG9ic3RhY2xlLmF2YXRhcjtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbWFnZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZUJvYXJkKCkge1xyXG4gIHZhciBzYXZlX25hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcF9uYW1lXCIpLnZhbHVlO1xyXG4gIHZhciBmdWxsX2dhbWVfc3RhdGUgPSB7XHJcbiAgICBzaXplOiBnYW1lX3N0YXRlLnNpemUsXHJcbiAgICBib2FyZF9zdGF0ZTogZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZSxcclxuICAgIEhQX3N0YXRlOiBnYW1lX3N0YXRlLkhQX3N0YXRlLFxyXG4gICAgZm9nX3N0YXRlOiBnYW1lX3N0YXRlLmZvZ19zdGF0ZSxcclxuICAgIHpvbmVfc3RhdGU6IGdhbWVfc3RhdGUuem9uZV9zdGF0ZSxcclxuICAgIHNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZTogZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGUsXHJcbiAgICBpbml0aWF0aXZlX3N0YXRlOiBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGUsXHJcbiAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbzogY2hhcmFjdGVyX2RldGFpbGVkX2luZm8sXHJcbiAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvOiBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvXHJcbiAgfTtcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NhdmVfZ2FtZSc7XHJcbiAgdG9TZW5kLnNhdmVfbmFtZSA9IHNhdmVfbmFtZTtcclxuICB0b1NlbmQuZnVsbF9nYW1lX3N0YXRlID0gZnVsbF9nYW1lX3N0YXRlO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVJbml0aWF0aXZlKGFnaWxpdHkpIHtcclxuICByZXR1cm4gYWdpbGl0eSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbEluaXRpYXRpdmUoKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpXSA+IDApIHsgLy8gc28gdGhlcmUgaXMgY2hhcmFjdGVyIGF0IHBvc2l0aW9uIGlcclxuICAgICAgLy8gcmV0cmlldmUgdGhhdCBjaGFyYWN0ZXIncyBhZ2lsaXR5XHJcbiAgICAgIHZhciBjaGFyYWN0ZXJfaW5kZXggPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ldO1xyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX2luZGV4XTtcclxuXHJcbiAgICAgIHZhciBhZ2lsaXR5ID0gY2hhcmFjdGVyLmFnaWxpdHk7XHJcblxyXG4gICAgICAvLyByb2xsIGluaXRpYXRpdmUgYW5kIGFkZCBhZ2lsaXR5IG1vZGlmaWNhdG9yXHJcbiAgICAgIHZhciBpbml0aWF0aXZlID0gY29tcHV0ZUluaXRpYXRpdmUocGFyc2VJbnQoYWdpbGl0eSkpO1xyXG5cclxuICAgICAgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlW2ldID0gaW5pdGlhdGl2ZTtcclxuICAgIH1cclxuICB9XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3JvbGxfaW5pdGlhdGl2ZSc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuaW5pdGlhdGl2ZV9zdGF0ZSA9IGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9nTW9kZUNoYW5nZSgpIHtcclxuICBpZiAoZ21fY29udHJvbF9tb2QgIT0gMSkge1xyXG4gICAgLy8gdHVybiBvbiBmb2cgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMTtcclxuICAgIGZvZ19idXR0b24udGV4dCgn0JLRi9C60Lsg0KLRg9C80LDQvSDQktC+0LnQvdGLJyk7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaV0gPT0gMSkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X2NlbGwuc3JjID0gRk9HX0lNQUdFO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIHR1cm4gb2ZmIGZvZyBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAwO1xyXG4gICAgZm9nX2J1dHRvbi50ZXh0KCfQktC60Lsg0KLRg9C80LDQvSDQktC+0LnQvdGLJyk7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaV0gPT0gMSkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X2NlbGwuc3JjID0gZ2V0X29iamVjdF9waWN0dXJlKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB6b25lTW9kZUNoYW5nZSgpIHtcclxuICBpZiAoZ21fY29udHJvbF9tb2QgIT0gMikge1xyXG4gICAgLy8gdHVybiBvbiB6b25lIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDI7XHJcbiAgICB6b25lX2J1dHRvbi50ZXh0KCfQktGL0LrQuyDQl9C+0L3QsNC70YzQvdGL0Lkg0YDQtdC20LjQvCcpO1xyXG4gICAgem9uZV9udW1iZXJfc2VsZWN0LnNob3coKTtcclxuICAgIGZvZ196b25lX2J1dHRvbi5zaG93KCk7XHJcbiAgICB1bmZvZ196b25lX2J1dHRvbi5zaG93KCk7XHJcbiAgICBzZWFyY2hfbW9kaWZpY2F0b3Iuc2hvdygpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaV0gPiAwKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25lX3RleHRfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X3pvbmVfdGV4dC5pbm5lckhUTUwgPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaV0gKyAnKCcgKyBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtpXSArICcpJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBiYWNrIHRvIG5vcm1hbCBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDA7XHJcbiAgICB6b25lX2J1dHRvbi50ZXh0KCfQktC60Lsg0JfQvtC90LDQu9GM0L3Ri9C5INGA0LXQttC40LwnKTtcclxuICAgIHpvbmVfbnVtYmVyX3NlbGVjdC5oaWRlKCk7XHJcbiAgICBmb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG4gICAgdW5mb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG4gICAgc2VhcmNoX21vZGlmaWNhdG9yLmhpZGUoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X3pvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uZV90ZXh0X1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF96b25lX3RleHQuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dDdXJyZW50Wm9uZSgpIHtcclxuICBmb2dQYXJzZVpvbmUoMSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuZm9nQ3VycmVudFpvbmUoKSB7XHJcbiAgZm9nUGFyc2Vab25lKDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dQYXJzZVpvbmUobW9kKSB7XHJcbiAgdmFyIGN1cnJlbnRfem9uZSA9IHpvbmVfbnVtYmVyX3NlbGVjdC52YWwoKTtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAndXBkYXRlX2ZvZyc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBpZiAobW9kID09IDApIHtcclxuICAgIHRvU2VuZC51cGRhdGVfdHlwZSA9ICdyZW1vdmUnO1xyXG4gIH0gZWxzZSBpZiAobW9kID09IDEpIHtcclxuICAgIHRvU2VuZC51cGRhdGVfdHlwZSA9ICdhZGQnO1xyXG4gIH1cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSAqIGdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICBpZiAoZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldID09IGN1cnJlbnRfem9uZSkge1xyXG4gICAgICB0b1NlbmQuaW5kZXggPSBpO1xyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1c2hUb0xpc3QobWVzc2FnZSkge1xyXG4gIGZvciAobGV0IGk9MTsgaSA8IENIQVRfQ0FTSDsgaSsrKSB7XHJcbiAgICB2YXIgZWxlbWVudF90b19jb3B5ID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyBpICsgJ1wiXScpO1xyXG4gICAgdmFyIGVsZW1lbnRfdG9fcGFzdGUgPSAkKCdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIChpLTEpICsgJ1wiXScpO1xyXG5cclxuICAgIGVsZW1lbnRfdG9fcGFzdGUudGV4dChlbGVtZW50X3RvX2NvcHkudGV4dCgpKTtcclxuICB9XHJcbiAgdmFyIHRvcF9lbGVtZW50ID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyAoQ0hBVF9DQVNILTEpICsgJ1wiXScpO1xyXG4gIHRvcF9lbGVtZW50LnRleHQobWVzc2FnZSk7XHJcblxyXG4gIGNoYXRfYnV0dG9uLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICdyZWQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlQ2hhdFZpc2liaWxpdHkoKSB7XHJcbiAgY2hhdF9idXR0b24uY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3doaXRlJyk7XHJcbiAgaWYgKG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPT0gJ25vbmUnKSB7XHJcbiAgICBub3RpZmljYXRpb25zX2NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICB9IGVsc2Uge1xyXG4gICAgbm90aWZpY2F0aW9uc19jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICB9XHJcbn1cclxuLy8ge2JvYXJkX3N0YXRlOiBbXSwgSFBfc3RhdGU6IFtdLCBpbml0aWF0aXZlX3N0YXRlOiBbXSwgZm9nX3N0YXRlOiBbXSwgem9uZV9zdGF0ZTogW10sIHNpemU6IDAsIHNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZTogW119O1xyXG5mdW5jdGlvbiBtaXJyb3JfYm9hcmQoKSB7XHJcbiAgdmFyIGxlZnRfaW5kZXg7XHJcbiAgdmFyIHJpZ2h0X2luZGV4O1xyXG4gIHZhciB0ZW1wO1xyXG4gIHZhciBsZWZ0X2NlbGw7XHJcbiAgdmFyIHJpZ2h0X2NlbGw7XHJcbiAgZm9yIChsZXQgeSA9IDA7IHkgPCBnYW1lX3N0YXRlLnNpemU7IHkrKykge1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBnYW1lX3N0YXRlLnNpemUvMjsgeCsrKSB7XHJcblxyXG4gICAgICBsZWZ0X2luZGV4ID0geSpnYW1lX3N0YXRlLnNpemUgKyB4O1xyXG4gICAgICByaWdodF9pbmRleCA9IHkqZ2FtZV9zdGF0ZS5zaXplICsgcGFyc2VJbnQoZ2FtZV9zdGF0ZS5zaXplKSAtIHggLSAxO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCd5OiAnICsgeSArICcgeDogJyArIHggKyAnIGxlZnQgaW5kZXg6ICcgKyBsZWZ0X2luZGV4ICsgJyByaWdodCBpbmRleDogJyArIHJpZ2h0X2luZGV4KTtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2xlZnRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbcmlnaHRfaW5kZXhdID0gdGVtcDtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLkhQX3N0YXRlW2xlZnRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLkhQX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5IUF9zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuSFBfc3RhdGVbcmlnaHRfaW5kZXhdID0gdGVtcDtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuZm9nX3N0YXRlW2xlZnRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuZm9nX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbcmlnaHRfaW5kZXhdID0gdGVtcDtcclxuXHJcbiAgICAgIHRlbXAgPSBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtyaWdodF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2xlZnRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbcmlnaHRfaW5kZXhdID0gdGVtcDtcclxuXHJcbiAgICAgIGxlZnRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBsZWZ0X2luZGV4KTtcclxuICAgICAgcmlnaHRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyByaWdodF9pbmRleCk7XHJcblxyXG4gICAgICB0ZW1wID0gbGVmdF9jZWxsLnNyYztcclxuICAgICAgbGVmdF9jZWxsLnNyYyA9IHJpZ2h0X2NlbGwuc3JjO1xyXG4gICAgICByaWdodF9jZWxsLnNyYyA9IHRlbXA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vL3NvY2tldC5pbml0KCd3czovL2xvY2FsaG9zdDozMDAxJyk7XHJcbnNvY2tldC5pbml0KFNFUlZFUl9BRERSRVNTKTtcclxuXHJcbnNvY2tldC5yZWdpc3Rlck9wZW5IYW5kbGVyKCgpID0+IHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAncGxheWVyX2luZm8nO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvbGUgPSBteV9yb2xlO1xyXG4gIGlmIChteV9yb2xlID09ICdnbScpIHtcclxuICAgIHRvU2VuZC5wYXNzd29yZCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZ21fcGFzc3dvcmQnKSk7XHJcbiAgfVxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59KTtcclxuXHJcbnNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKChkYXRhKSA9PiB7XHJcbiAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgaWYgKCgoZGF0YS50b19uYW1lID09IG15X25hbWUpIHx8IChkYXRhLnRvX25hbWUgPT0gJ2FsbCcpKSAmJiAoZGF0YS5yb29tX251bWJlciA9PSBteV9yb29tKSkge1xyXG4gICAgaWYgKGRhdGEuY29tbWFuZCA9PSAncGxheWVyX2luZm9fcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLmlzVmFsaWQgPT0gMCkge1xyXG4gICAgICAgIGFsZXJ0KCfQotCwINC60LDQutC+0Lkg0YLRiyDQs9C8Jyk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF0YS5yb2xlID09ICdnbScpIHtcclxuICAgICAgICBjcmVhdGVfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBzYXZlX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgbG9hZF9ib2FyZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHJvbGxfaW5pdGlhdGl2ZV9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIGZvZ19idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHpvbmVfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBzYXZlX25hbWVfaW5wdXQuc2hvdygpO1xyXG4gICAgICAgIGJvYXJkX3NpemVfaW5wdXQuc2hvdygpO1xyXG4gICAgICAgIG1pcnJvcl9idXR0b24uc2hvdygpO1xyXG4gICAgICB9XHJcbiAgICAgIGNoYXJhY3Rlcl9saXN0ID0gZGF0YS5jaGFyYWN0ZXJfbGlzdDtcclxuICAgICAgb2JzdGFjbGVfbGlzdCA9IGRhdGEub2JzdGFjbGVfbGlzdDtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdjb25zdHJ1Y3RfYm9hcmRfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNvbnN0cnVjdF9ib2FyZChkYXRhLmdhbWVfc3RhdGUpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2FkZF9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBkYXRhLmNoYXJhY3Rlcl9pbmZvO1xyXG4gICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtkYXRhLmNlbGxfaWRdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZGF0YS5jZWxsX2lkKTtcclxuICAgICAgICBjZWxsLnNyYyA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcbiAgICAgIH1cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmNlbGxfaWRdID0gZGF0YS5jaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICBnYW1lX3N0YXRlLkhQX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2FkZF9vYnN0YWNsZV9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIG9ic3RhY2xlID0gZGF0YS5vYnN0YWNsZV9pbmZvO1xyXG4gICAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW2RhdGEub2JzdGFjbGVfbnVtYmVyXSA9IG9ic3RhY2xlO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtkYXRhLmNlbGxfaWRdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZGF0YS5jZWxsX2lkKTtcclxuICAgICAgICBjZWxsLnNyYyA9IG9ic3RhY2xlLmF2YXRhcjtcclxuICAgICAgfVxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBkYXRhLm9ic3RhY2xlX251bWJlciAqICgtMSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbW92ZV9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciB0b19pbmRleCA9IGRhdGEudG9faW5kZXg7XHJcbiAgICAgIHZhciBmcm9tX2luZGV4ID0gZGF0YS5mcm9tX2luZGV4O1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3RvX2luZGV4XSA9IGRhdGEuY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgZ2FtZV9zdGF0ZS5IUF9zdGF0ZVt0b19pbmRleF0gPSBkYXRhLmNoYXJhY3Rlcl9ocDtcclxuICAgICAgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlW3RvX2luZGV4XSA9IGRhdGEuY2hhcmFjdGVyX2luaXRpYXRpdmU7XHJcblxyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVt0b19pbmRleF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIHRvX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgdG9faW5kZXgpO1xyXG4gICAgICAgIHRvX2NlbGwuc3JjID0gZGF0YS5jaGFyYWN0ZXJfYXZhdGFyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2Zyb21faW5kZXhdID0gMDtcclxuICAgICAgZ2FtZV9zdGF0ZS5IUF9zdGF0ZVtmcm9tX2luZGV4XSA9IDA7XHJcbiAgICAgIGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZVtmcm9tX2luZGV4XSA9IDA7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2Zyb21faW5kZXhdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBvbGRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGZyb21faW5kZXgpO1xyXG4gICAgICAgIG9sZF9jZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnZGVsZXRlX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmluZGV4XSA9IDA7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuaW5kZXhdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEuaW5kZXgpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdyb2xsX2luaXRpYXRpdmVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZSA9IGRhdGEuaW5pdGlhdGl2ZV9zdGF0ZTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdkZWFsX2RhbWFnZV9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5IUF9zdGF0ZVtkYXRhLmluZGV4XSA9IGdhbWVfc3RhdGUuSFBfc3RhdGVbZGF0YS5pbmRleF0gLSBkYXRhLmRhbWFnZTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdzYXZlX2dhbWVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT0gMSkge1xyXG4gICAgICAgIGFsZXJ0KCdHYW1lICcgKyBkYXRhLnNhdmVfbmFtZSArICcgc2F2ZWQgc3VjY2VzZnVsbHknKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydCgnR2FtZSB3aXRoIG5hbWUgJyArIGRhdGEuc2F2ZV9uYW1lICsgJyBhbHJlYWR5IGV4aXN0IScpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnbG9hZF9nYW1lX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICB2YXIgZnVsbF9nYW1lX3N0YXRlID0gZGF0YS5mdWxsX2dhbWVfc3RhdGU7XHJcbiAgICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX2RldGFpbGVkX2luZm87XHJcbiAgICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5vYnN0YWNsZV9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICAgIGNvbnN0cnVjdF9ib2FyZChmdWxsX2dhbWVfc3RhdGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gbG9hZCBnYW1lICcgKyBkYXRhLnNhdmVfbmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICd1cGRhdGVfZm9nX3Jlc3BvbnNlJykge1xyXG5cdFx0XHRcdHZhciBpbmRleCA9IGRhdGEuaW5kZXg7XHJcblx0XHRcdFx0dmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgaW5kZXgpO1xyXG5cdFx0XHRcdGlmIChkYXRhLnVwZGF0ZV90eXBlID09ICdyZW1vdmUnKSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAwO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAxO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBGT0dfSU1BR0U7XHJcblx0XHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2Fzc2lnbl96b25lX3Jlc3BvbnNlJykge1xyXG4gICAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbZGF0YS5pbmRleF0gPSBkYXRhLnpvbmVfbnVtYmVyO1xyXG4gICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtkYXRhLmluZGV4XSA9IGRhdGEubW9kaWZpY2F0b3I7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2VhcmNoX2FjdGlvbl9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgIHB1c2hUb0xpc3QoZGF0YS5jaGFyYWN0ZXJfbmFtZSArICcg0LHRgNC+0YHQuNC7ICcgKyBkYXRhLnJvbGwgKyAnINC90LAg0LLQvdC40LzQsNGC0LXQu9GM0L3QvtGB0YLRjCDQsiDQt9C+0L3QtSAnICsgZGF0YS56b25lX251bWJlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxudmFyIGNyZWF0ZV9ib2FyZF9idXR0b24gPSAkKENSRUFURV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5jcmVhdGVfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGNyZWF0ZUJvYXJkKTtcclxuY3JlYXRlX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgc2F2ZV9ib2FyZF9idXR0b24gPSAkKFNBVkVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxuc2F2ZV9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgc2F2ZUJvYXJkKTtcclxuc2F2ZV9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGxvYWRfYm9hcmRfYnV0dG9uID0gJChMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxvYWRfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGxvYWRCb2FyZCk7XHJcbmxvYWRfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciByb2xsX2luaXRpYXRpdmVfYnV0dG9uID0gJChST0xMX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SKTtcclxucm9sbF9pbml0aWF0aXZlX2J1dHRvbi5vbignY2xpY2snLCByb2xsSW5pdGlhdGl2ZSk7XHJcbnJvbGxfaW5pdGlhdGl2ZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGZvZ19idXR0b24gPSAkKEZPR19CVVRUT05fU0VMRUNUT1IpO1xyXG5mb2dfYnV0dG9uLm9uKCdjbGljaycsIGZvZ01vZGVDaGFuZ2UpO1xyXG5mb2dfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciB6b25lX2J1dHRvbiA9ICQoWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG56b25lX2J1dHRvbi5vbignY2xpY2snLCB6b25lTW9kZUNoYW5nZSk7XHJcbnpvbmVfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBjaGF0X2J1dHRvbiA9ICQoQ0hBVF9CVVRUT05fU0VMRUNUT1IpO1xyXG5jaGF0X2J1dHRvbi5vbignY2xpY2snLCBjaGFuZ2VDaGF0VmlzaWJpbGl0eSk7XHJcblxyXG52YXIgbWlycm9yX2J1dHRvbiA9ICQoTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUik7XHJcbm1pcnJvcl9idXR0b24ub24oJ2NsaWNrJywgbWlycm9yX2JvYXJkKTtcclxubWlycm9yX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgZm9nX3pvbmVfYnV0dG9uID0gJChGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG5mb2dfem9uZV9idXR0b24ub24oJ2NsaWNrJywgZm9nQ3VycmVudFpvbmUpO1xyXG5mb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHVuZm9nX3pvbmVfYnV0dG9uID0gJChVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnVuZm9nX3pvbmVfYnV0dG9uLm9uKCdjbGljaycsIHVuZm9nQ3VycmVudFpvbmUpO1xyXG51bmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgem9uZV9udW1iZXJfc2VsZWN0ID0gJChaT05FX05VTUJFUl9TRUxFQ1RPUik7XHJcbnpvbmVfbnVtYmVyX3NlbGVjdC5oaWRlKCk7XHJcbmZvciAobGV0IGkgPSAxOyBpIDwgTUFYX1pPTkVTOyBpKyspIHtcclxuICB2YXIgY3VycmVudF9vcHRpb24gPSAkKFwiPG9wdGlvbj5cIik7XHJcbiAgY3VycmVudF9vcHRpb24udGV4dCgn0JfQvtC90LAgJyArIGkpO1xyXG4gIGN1cnJlbnRfb3B0aW9uLnZhbChpKTtcclxuICB6b25lX251bWJlcl9zZWxlY3QuYXBwZW5kKGN1cnJlbnRfb3B0aW9uKTtcclxufVxyXG5cclxudmFyIHNlYXJjaF9tb2RpZmljYXRvciA9ICQoU0VBUkNIX01PRElGSUNBVE9SX1NFTEVDVE9SKTtcclxuc2VhcmNoX21vZGlmaWNhdG9yLmhpZGUoKTtcclxuXHJcbnZhciBub3RpZmljYXRpb25zX2xpc3QgPSAkKE5PVElGSUNBVElPTlNfTElTVF9TRUxFQ1RPUik7XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgQ0hBVF9DQVNIOyBpKyspIHtcclxuICB2YXIgY3VycmVudF9lbGVtZW50ID0gJChcIjxsaT5cIik7XHJcbiAgY3VycmVudF9lbGVtZW50LmF0dHIoJ2RhdGEtbmFtZScsICdub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgaSk7XHJcbiAgY3VycmVudF9lbGVtZW50LmF0dHIoJ2NsYXNzJywgJ25vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50Jyk7XHJcbiAgbm90aWZpY2F0aW9uc19saXN0LmFwcGVuZChjdXJyZW50X2VsZW1lbnQpO1xyXG59XHJcblxyXG52YXIgYm9hcmRfc2l6ZV9pbnB1dCA9ICQoQk9BUkRfU0laRV9JTlBVVF9TRUxFQ1RPUik7XHJcbmJvYXJkX3NpemVfaW5wdXQuaGlkZSgpO1xyXG5cclxudmFyIHNhdmVfbmFtZV9pbnB1dCA9ICQoU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SKTtcclxuc2F2ZV9uYW1lX2lucHV0LmhpZGUoKTtcclxuXHJcbnZhciBub3RpZmljYXRpb25zX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm90aWZpY2F0aW9ucy1jb250YWluZXJcIik7XHJcbm5vdGlmaWNhdGlvbnNfY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG5zZXRJbnRlcnZhbChyZWNvbm5lY3QsIDMwKjEwMDApXHJcbiIsImxldCBzb2NrZXQ7XHJcbmxldCBzZXJ2ZXJfYWRkcmVzcztcclxubGV0IG9uTWVzc2FnZUZ1bmN0aW9uO1xyXG5cclxuZnVuY3Rpb24gaW5pdCh1cmwpIHtcclxuICBzZXJ2ZXJfYWRkcmVzcyA9IHVybDtcclxuICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybCk7XHJcbiAgY29uc29sZS5sb2coJ2Nvbm5lY3RpbmcuLicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnb3BlbicpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICBvbk1lc3NhZ2VGdW5jdGlvbiA9IGhhbmRsZXJGdW5jdGlvbjtcclxuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgaGFuZGxlckZ1bmN0aW9uKGRhdGEpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKHBheWxvYWQpIHtcclxuICBpZiAoc29ja2V0LnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOKSB7XHJcbiAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGluaXQoc2VydmVyX2FkZHJlc3MpO1xyXG4gICAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihvbk1lc3NhZ2VGdW5jdGlvbik7XHJcbiAgICBpZiAoc29ja2V0LnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOKSB7XHJcbiAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdOb3Qgc2VuZCwgYnV0IHJlY29ubmVjdGVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgaW5pdCxcclxuICByZWdpc3Rlck9wZW5IYW5kbGVyLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIsXHJcbiAgc2VuZE1lc3NhZ2VcclxufVxyXG4iXX0=
