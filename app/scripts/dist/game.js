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
  sendMessage: sendMessage
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksK0JBQStCLG1DQUFuQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksa0NBQWtDLHNDQUF0QztBQUNBLElBQUksc0JBQXNCLDBCQUExQjtBQUNBLElBQUksdUJBQXVCLDJCQUEzQjtBQUNBLElBQUksdUJBQXVCLDJCQUEzQjtBQUNBLElBQUkseUJBQXlCLDZCQUE3QjtBQUNBLElBQUksMkJBQTJCLCtCQUEvQjtBQUNBLElBQUksNkJBQTZCLGlDQUFqQzs7QUFFQSxJQUFJLHVCQUF1QixrQ0FBM0I7QUFDQSxJQUFJLDhCQUE4QixrQ0FBbEM7O0FBRUEsSUFBSSw0QkFBNEIsZ0NBQWhDO0FBQ0EsSUFBSSwyQkFBMkIsK0JBQS9COztBQUVBLElBQUksOEJBQThCLGtDQUFsQzs7QUFFQSxJQUFJLGlCQUFpQixTQUFTLE1BQVQsQ0FBZ0IsT0FBaEIsQ0FBd0IsT0FBeEIsRUFBaUMsSUFBakMsQ0FBckI7O0FBRUEsSUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLGVBQWUsT0FBZixDQUF1QixVQUF2QixDQUFYLENBQWQ7QUFDQSxJQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsZUFBZSxPQUFmLENBQXVCLFdBQXZCLENBQVgsQ0FBZDtBQUNBLElBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxlQUFlLE9BQWYsQ0FBdUIsYUFBdkIsQ0FBWCxDQUFkOztBQUVBLElBQUksaUJBQWlCLEVBQXJCO0FBQ0EsSUFBSSwwQkFBMEIsRUFBOUI7QUFDQSxJQUFJLGdCQUFnQixFQUFwQjtBQUNBLElBQUkseUJBQXlCLEVBQTdC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LDZCQUFULEdBQXlDO0FBQ3ZDLFNBQU8sU0FBUCxHQUFtQixVQUFDLENBQUQsRUFBTztBQUN4QixRQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsRUFBRSxJQUFiLENBQVg7QUFDQSxzQkFBa0IsSUFBbEI7QUFDRCxHQUhEO0FBSUQ7O0FBRUQsU0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQThCO0FBQzVCLE1BQUksT0FBTyxVQUFQLEtBQXNCLFVBQVUsSUFBcEMsRUFBMEM7QUFDeEMsV0FBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsT0FBZixDQUFaO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsU0FBSyxjQUFMO0FBQ0EsMkJBQXVCLGlCQUF2QjtBQUNBLFFBQUksT0FBTyxVQUFQLEtBQXNCLFVBQVUsSUFBcEMsRUFBMEM7QUFDeEMsYUFBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsT0FBZixDQUFaO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsY0FBUSxHQUFSLENBQVksMkJBQVo7QUFDRDtBQUNGO0FBQ0Y7O2tCQUVjO0FBQ2IsWUFEYTtBQUViLDBDQUZhO0FBR2IsZ0RBSGE7QUFJYjtBQUphLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgc29ja2V0IGZyb20gJy4vd3MtY2xpZW50JztcclxuXHJcbnZhciAkID0gd2luZG93LmpRdWVyeTtcclxuXHJcbnZhciBDUkVBVEVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjcmVhdGVfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIFNBVkVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibG9hZF9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgUk9MTF9JTklUSUFUSVZFX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwicm9sbF9pbml0aWF0aXZlX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJmb2dfYnV0dG9uXCJdJztcclxudmFyIFpPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX2J1dHRvblwiXSc7XHJcbnZhciBDSEFUX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY2hhdF9idXR0b25cIl0nO1xyXG52YXIgTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibWlycm9yX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImZvZ196b25lX2J1dHRvblwiXSc7XHJcbnZhciBVTkZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwidW5mb2dfem9uZV9idXR0b25cIl0nO1xyXG5cclxudmFyIFpPTkVfTlVNQkVSX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX251bWJlcl9zZWxlY3RcIl0nO1xyXG52YXIgU0VBUkNIX01PRElGSUNBVE9SX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzZWFyY2hfbW9kaWZpY2F0b3JcIl0nO1xyXG5cclxudmFyIEJPQVJEX1NJWkVfSU5QVVRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJvYXJkX3NpemVfaW5wdXRcIl0nO1xyXG52YXIgU0FWRV9OQU1FX0lOUFVUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX25hbWVfaW5wdXRcIl0nO1xyXG5cclxudmFyIE5PVElGSUNBVElPTlNfTElTVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0XCJdJztcclxuXHJcbnZhciBTRVJWRVJfQUREUkVTUyA9IGxvY2F0aW9uLm9yaWdpbi5yZXBsYWNlKC9eaHR0cC8sICd3cycpO1xyXG5cclxudmFyIG15X25hbWUgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJuYW1lJykpO1xyXG52YXIgbXlfcm9sZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcl9yb2xlJykpO1xyXG52YXIgbXlfcm9vbSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncm9vbV9udW1iZXInKSk7XHJcblxyXG52YXIgY2hhcmFjdGVyX2xpc3QgPSBbXTtcclxudmFyIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvID0gW107XHJcbnZhciBvYnN0YWNsZV9saXN0ID0gW107XHJcbnZhciBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gW107XHJcblxyXG52YXIgVElOWV9FRkZFQ1RfQ0xBU1MgPSAnaXMtdGlueSc7XHJcblxyXG52YXIgRU1QVFlfQ0VMTF9QSUMgPSBcIi4vaW1hZ2VzL3NxdWFyZS5qcGdcIjtcclxudmFyIEZPR19JTUFHRSA9IFwiLi9pbWFnZXMvZm9nLndlYnBcIjtcclxudmFyIFFVRVNUSU9OX0lNQUdFID0gXCIuL2ltYWdlcy9xdWVzdGlvbi5qcGdcIjtcclxuXHJcbnZhciBNQVhfWk9ORVMgPSAyNTtcclxudmFyIENIQVRfQ0FTSCA9IDEwO1xyXG5cclxuLy8gVGhpcyBpcyBhIGNvbnN0YW50LCB3aWxsIGJlIG1vdmVkIHRvIGRhdGFiYXNlIGxhdGVyXHJcbmNvbnN0IEhQX3ZhbHVlcyA9IFsxNSwgMzAsIDQwLCA1NSwgNzUsIDEwMCwgMTMwLCAxNjUsIDIwNSwgMjUwLCAzMDAsIDM1NSwgNDE1XTtcclxuXHJcbmxldCBnYW1lX3N0YXRlID0ge2JvYXJkX3N0YXRlOiBbXSwgSFBfc3RhdGU6IFtdLCBpbml0aWF0aXZlX3N0YXRlOiBbXSwgZm9nX3N0YXRlOiBbXSwgem9uZV9zdGF0ZTogW10sIHNpemU6IDAsIHNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZTogW119O1xyXG5cclxubGV0IGNoYXJhY3Rlcl9iYXNlID0gW107XHJcbmxldCBvYnN0YWNsZV9iYXNlID0gW107XHJcblxyXG5sZXQgZ21fY29udHJvbF9tb2QgPSAwOyAvLyBub3JtYWwgbW9kZVxyXG5cclxubGV0IGZpZWxkX2Nob3NlbiA9IDA7XHJcbmxldCBjaG9zZW5faW5kZXg7XHJcbmxldCBjaG9zZW5fY2hhcmFjdGVyX2luZGV4O1xyXG5sZXQgY2hvc2VuX2NoYXJhY3Rlcl9IUDtcclxubGV0IGNob3Nlbl9jaGFyYWN0ZXJfaW5pdGlhdGl2ZTtcclxuXHJcbmxldCBsYXN0X29ic3RhY2xlO1xyXG5cclxuZnVuY3Rpb24gcmVjb25uZWN0KCkge1xyXG4gIGlmICghKHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikpIHtcclxuICAgIHNvY2tldC5pbml0KFNFUlZFUl9BRERSRVNTKTtcclxuICAgIHNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyRGVmYXVsdCgpO1xyXG4gICAgY29uc29sZS5sb2coJ0hvcGVmdWxseSByZWNvbm5lY3RlZCAocHJheSknKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coJ1dhcyBvbmxpbmUgYW55d2F5Jyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcclxuICBnYW1lX3N0YXRlLnNpemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkX3NpemVcIikudmFsdWU7XHJcbiAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuSFBfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLmZvZ19zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuem9uZV9zdGF0ZSA9IFtdO1xyXG4gIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplICogZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuSFBfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUucHVzaCgwKTtcclxuICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGUucHVzaCgwKTtcclxuICB9XHJcbiAgc2VuZF9jb25zdHJ1Y3RfY29tbWFuZChnYW1lX3N0YXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEJvYXJkKCkge1xyXG4gIHZhciBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBfbmFtZVwiKS52YWx1ZTtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnbG9hZF9nYW1lJztcclxuICB0b1NlbmQuc2F2ZV9uYW1lID0gbmFtZTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kX2NvbnN0cnVjdF9jb21tYW5kKG5ld19nYW1lX3N0YXRlKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2NvbnN0cnVjdF9ib2FyZCc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuZ2FtZV9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBub19zaGlmdF9vbmNsaWNrKG15X3JvbGUsIGdtX2NvbnRyb2xfbW9kLCBnYW1lX3N0YXRlLCBmaWVsZF9jaG9zZW4sIGNlbGwsIGluZGV4KSB7XHJcbiAgdmFyIGNoYXJhY3Rlcl9wcm9maWxlX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gIGNoYXJhY3Rlcl9wcm9maWxlX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICAvLyBnbSBzaWRlXHJcbiAgICBpZiAoZ21fY29udHJvbF9tb2QgPT0gMCkge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gbm9ybWFsIGFkZC9tb3ZlIGRlbGV0ZSBtb2RlXHJcbiAgICAgIHN0YW5kYXJkX2NlbGxfb25DbGljayhpbmRleCwgY2VsbCwgbXlfcm9sZSk7XHJcbiAgICB9IGVsc2UgaWYgKGdtX2NvbnRyb2xfbW9kID09IDEpIHtcclxuICAgICAgLy8gd2UgYXJlIGluIGZvZyBtb2RlXHJcbiAgICAgIGFwcGx5Rm9nKGluZGV4LCBjZWxsKTtcclxuICAgIH0gZWxzZSBpZiAoZ21fY29udHJvbF9tb2QgPT0gMikge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gem9uZXMgbW9kZVxyXG4gICAgICBhc3NpZ25ab25lKGluZGV4KTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gcGxheWVyIHNpZGVcclxuICAgIGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPT0gMSkge1xyXG4gICAgICAvLyBjbGlja2VkIGZvZ1xyXG4gICAgICBpZiAoZmllbGRfY2hvc2VuID09IDEpIHtcclxuICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgZm9nIGRldGVjdGVkJyk7XHJcbiAgICAgICAgZGlzcGxheUZvZygpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIG15X3JvbGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY29uc3RydWN0X2JvYXJkKG5ld19nYW1lX3N0YXRlKSB7XHJcbiAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlLmJvYXJkX3N0YXRlO1xyXG4gIGdhbWVfc3RhdGUuSFBfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZS5IUF9zdGF0ZTtcclxuICBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlO1xyXG4gIGdhbWVfc3RhdGUuc2l6ZSA9IG5ld19nYW1lX3N0YXRlLnNpemU7XHJcbiAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZS5mb2dfc3RhdGU7XHJcbiAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlID0gbmV3X2dhbWVfc3RhdGUuem9uZV9zdGF0ZTtcclxuICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZTtcclxuXHJcbiAgdmFyIGluZm9fY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcbiAgaW5mb19jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIGJvYXJkX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xyXG4gIGJvYXJkX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIHZhciBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuICBib2FyZC5jbGFzc05hbWUgPSBcImJvYXJkXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIHZhciByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICByb3cuY2xhc3NOYW1lID0gXCJib2FyZF9yb3dcIjtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZV9zdGF0ZS5zaXplOyBqKyspIHtcclxuICAgICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICAgIHZhciBjZWxsX2lkID0gaSAqIGdhbWVfc3RhdGUuc2l6ZSArIGo7XHJcbiAgICAgIGJ1dHRvbi5pZCA9IFwiY2VsbF9cIiArIGNlbGxfaWQ7XHJcbiAgICAgIGJ1dHRvbi5yb3cgPSBpO1xyXG4gICAgICBidXR0b24uY29sdW1uID0gajtcclxuICAgICAgdmFyIGltYWdlX25hbWUgPSBmb2dPclBpYyhjZWxsX2lkKTtcclxuICAgICAgYnV0dG9uLnNyYyA9IGltYWdlX25hbWU7XHJcbiAgICAgIGJ1dHRvbi5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdib2FyZF9jZWxsJztcclxuICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHZhciBpbmRleCA9IGNlbGwucm93ICogZ2FtZV9zdGF0ZS5zaXplICsgY2VsbC5jb2x1bW47XHJcblxyXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX29ic3RhY2xlJztcclxuICAgICAgICAgIHRvU2VuZC5jZWxsX2lkID0gaW5kZXg7XHJcbiAgICAgICAgICB0b1NlbmQub2JzdGFjbGVfbnVtYmVyID0gbGFzdF9vYnN0YWNsZTtcclxuICAgICAgICAgIHRvU2VuZC5vYnN0YWNsZV9uYW1lID0gb2JzdGFjbGVfbGlzdFtsYXN0X29ic3RhY2xlIC0gMV07XHJcbiAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vX3NoaWZ0X29uY2xpY2sobXlfcm9sZSwgZ21fY29udHJvbF9tb2QsIGdhbWVfc3RhdGUsIGZpZWxkX2Nob3NlbiwgY2VsbCwgaW5kZXgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuICAgICAgdmFyIGNlbGxfd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuICAgICAgY2VsbF93cmFwLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgIGNlbGxfd3JhcC5jbGFzc05hbWUgPSBcImNlbGxfd3JhcFwiO1xyXG5cclxuICAgICAgdmFyIHpvbmVfdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIHpvbmVfdGV4dC5pZCA9IFwiem9uZV90ZXh0X1wiICsgY2VsbF9pZDtcclxuICAgICAgem9uZV90ZXh0LmNsYXNzTmFtZSA9IFwiem9uZV90ZXh0XCI7XHJcbiAgICAgIGNlbGxfd3JhcC5hcHBlbmRDaGlsZCh6b25lX3RleHQpO1xyXG5cclxuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGxfd3JhcCk7XHJcbiAgICB9XHJcbiAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xyXG4gIH1cclxuICBib2FyZF9jb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhc3NpZ25ab25lKGluZGV4KSB7XHJcbiAgdmFyIHpvbmVfbnVtYmVyID0gem9uZV9udW1iZXJfc2VsZWN0LnZhbCgpO1xyXG4gIHZhciBtb2RpZmljYXRvciA9IHNlYXJjaF9tb2RpZmljYXRvci52YWwoKTtcclxuXHJcbiAgdmFyIHpvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd6b25lX3RleHRfJyArIGluZGV4KTtcclxuICB6b25lX3RleHQuaW5uZXJIVE1MID0gem9uZV9udW1iZXIgKyAnKCcgKyBtb2RpZmljYXRvciArICcpJztcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2Fzc2lnbl96b25lJztcclxuICB0b1NlbmQuem9uZV9udW1iZXIgPSB6b25lX251bWJlcjtcclxuICB0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICB0b1NlbmQubW9kaWZpY2F0b3IgPSBtb2RpZmljYXRvcjtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dPclBpYyhjZWxsX2lkKSB7XHJcbiAgdmFyIHBpY3R1cmVfbmFtZSA9IEZPR19JTUFHRTtcclxuICBpZiAoKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2NlbGxfaWRdICE9IDEpfHwobXlfcm9sZSA9PSAnZ20nKSkge1xyXG4gICAgcGljdHVyZV9uYW1lID0gZ2V0X29iamVjdF9waWN0dXJlKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2VsbF9pZF0pO1xyXG4gIH1cclxuICByZXR1cm4gcGljdHVyZV9uYW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIHJvbGUpIHtcclxuXHRpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gPT0gMCkgeyAvLyBlbXB0eSBjZWxsIGNsaWNrZWRcclxuXHRcdGlmIChmaWVsZF9jaG9zZW4gPT0gMCkge1xyXG4gICAgICBpZiAocm9sZSA9PSAnZ20nKSB7XHJcblx0XHRcdCAgIGFkZF9vYmplY3QoaW5kZXgpO1xyXG4gICAgICB9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtb3ZlX2NoYXJhY3RlcihpbmRleCwgY2VsbCk7XHJcblx0XHR9XHJcblx0fSBlbHNlIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSA+IDApIHsgLy8gY2hhcmFjdGVyIGNsaWNrZWRcclxuXHRcdGlmIChmaWVsZF9jaG9zZW4gPT0gMCkge1xyXG5cdFx0XHRzZWxlY3RfY2hhcmFjdGVyKGluZGV4LCBjZWxsKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR1bmRvX3NlbGVjdGlvbigpO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7IC8vIG9ic3RhY2xlIGNsaWNrZWRcclxuXHRcdGlmIChmaWVsZF9jaG9zZW4gPT0gMCkge1xyXG5cdFx0XHRzZWxlY3Rfb2JzdGFjbGUoaW5kZXgsIGNlbGwpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHVuZG9fc2VsZWN0aW9uKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseUZvZyhpbmRleCwgY2VsbCkge1xyXG5cdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPT0gMSkge1xyXG5cdFx0Ly8gc2VuZCB1cGRhdGUgbWVzc2FnZVxyXG5cdFx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdFx0dG9TZW5kLmNvbW1hbmQgPSAndXBkYXRlX2ZvZyc7XHJcblx0XHR0b1NlbmQudXBkYXRlX3R5cGUgPSAncmVtb3ZlJztcclxuXHRcdHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuXHRcdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQvLyBzZW5kIHVwZGF0ZSBtZXNzYWdlXHJcblx0XHR2YXIgdG9TZW5kID0ge307XHJcblx0XHR0b1NlbmQuY29tbWFuZCA9ICd1cGRhdGVfZm9nJztcclxuXHRcdHRvU2VuZC51cGRhdGVfdHlwZSA9ICdhZGQnO1xyXG5cdFx0dG9TZW5kLmluZGV4ID0gaW5kZXg7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG5cdFx0c29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JqZWN0KGJvYXJkX2luZGV4KSB7XHJcbiAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICB2YXIgYnV0dG9uX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgYnV0dG9uX2NvbnRhaW5lci5jbGFzc05hbWUgPSBcImFkZC1vYmplY3QtYnV0dG9uLWNvbnRhaW5lclwiO1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9jaGFyYWN0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbl9hZGRfY2hhcmFjdGVyLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9C10YDRgdC+0L3QsNC20LBcIjtcclxuICBidXR0b25fYWRkX2NoYXJhY3Rlci5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICB2YXIgYnV0dG9uX2FkZF9vYnN0YWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uX2FkZF9vYnN0YWNsZS5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0Ywg0L/RgNC10L/Rj9GC0YHRgtCy0LjQtVwiO1xyXG4gIGJ1dHRvbl9hZGRfb2JzdGFjbGUub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgYWRkX29ic3RhY2xlKGJvYXJkX2luZGV4KTtcclxuICB9O1xyXG5cclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfY2hhcmFjdGVyKTtcclxuICBidXR0b25fY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9hZGRfb2JzdGFjbGUpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25fY29udGFpbmVyKTtcclxuXHJcbiAgdGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGlueV9hbmltYXRpb24oY29udGFpbmVyKSB7XHJcbiAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoVElOWV9FRkZFQ1RfQ0xBU1MpO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShUSU5ZX0VGRkVDVF9DTEFTUyk7XHJcbiAgfSwgNTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpIHtcclxuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gIHNlbGVjdC5pZCA9IFwib2JzdGFjbGVfY2hvc2VuXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgb2JzdGFjbGVfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IG9ic3RhY2xlX2xpc3RbaV07XHJcbiAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IGk7XHJcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjFwiO1xyXG4gIGJ1dHRvbi5ib2FyZF9pbmRleCA9IGJvYXJkX2luZGV4O1xyXG4gIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBidXR0b24gPSBldmVudC50YXJnZXQ7XHJcbiAgICB2YXIgb2JzdGFjbGVfbnVtYmVyID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvYnN0YWNsZV9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9vYnN0YWNsZSc7XHJcbiAgICB0b1NlbmQuY2VsbF9pZCA9IGJ1dHRvbi5ib2FyZF9pbmRleDtcclxuICAgIHRvU2VuZC5vYnN0YWNsZV9udW1iZXIgPSBvYnN0YWNsZV9udW1iZXIgKyAxO1xyXG4gICAgdG9TZW5kLm9ic3RhY2xlX25hbWUgPSBvYnN0YWNsZV9saXN0W29ic3RhY2xlX251bWJlcl07XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgfVxyXG5cclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICB0aW55X2FuaW1hdGlvbihjb250YWluZXIpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX2NoYXJhY3Rlcihib2FyZF9pbmRleCkge1xyXG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2VsZWN0LmlkID0gXCJjaGFyYWN0ZXJfY2hvc2VuXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVyX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBjaGFyYWN0ZXJfbGlzdFtpXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaTtcclxuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgfVxyXG5cclxuICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b24uaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMXCI7XHJcbiAgYnV0dG9uLmJvYXJkX2luZGV4ID0gYm9hcmRfaW5kZXg7XHJcbiAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGJ1dHRvbiA9IGV2ZW50LnRhcmdldDtcclxuICAgIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXJfY2hvc2VuXCIpLnZhbHVlKTtcclxuXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdhZGRfY2hhcmFjdGVyJztcclxuICAgIHRvU2VuZC5jZWxsX2lkID0gYnV0dG9uLmJvYXJkX2luZGV4O1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaGFyYWN0ZXJfbnVtYmVyICsgMTtcclxuICAgIHRvU2VuZC5jaGFyYWN0ZXJfbmFtZSA9IGNoYXJhY3Rlcl9saXN0W2NoYXJhY3Rlcl9udW1iZXJdO1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIH1cclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdCk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgdGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vdmVfY2hhcmFjdGVyKHRvX2luZGV4LCB0b19jZWxsKSB7XHJcbiAgZmllbGRfY2hvc2VuID0gMDtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnbW92ZV9jaGFyYWN0ZXInO1xyXG4gIHRvU2VuZC5mcm9tX2luZGV4ID0gY2hvc2VuX2luZGV4O1xyXG4gIHRvU2VuZC50b19pbmRleCA9IHRvX2luZGV4O1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hvc2VuX2NoYXJhY3Rlcl9pbmRleDtcclxuICB0b1NlbmQuY2hhcmFjdGVyX2hwID0gY2hvc2VuX2NoYXJhY3Rlcl9IUDtcclxuICB0b1NlbmQuY2hhcmFjdGVyX2luaXRpYXRpdmUgPSBjaG9zZW5fY2hhcmFjdGVyX2luaXRpYXRpdmU7XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9hdmF0YXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaG9zZW5fY2hhcmFjdGVyX2luZGV4XS5hdmF0YXI7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheUZvZygpIHtcclxuXHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cdHZhciBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgaW5mby5pbm5lckhUTUwgPSAn0JzRiyDQvdC1INC30L3QsNC10LwsINGH0YLQviDRjdGC0L4g0YLQsNC60L7QtS4g0JXRgdC70Lgg0LHRiyDQvNGLINC30L3QsNC70Lgg0YfRgtC+INGN0YLQviDRgtCw0LrQvtC1LCDQvdC+INC80Ysg0L3QtSDQt9C90LDQtdC8Lic7XHJcblxyXG5cdHZhciBmb2dfcGljdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgZm9nX3BpY3R1cmUuc3JjID0gUVVFU1RJT05fSU1BR0U7XHJcbiAgZm9nX3BpY3R1cmUuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGZvZ19waWN0dXJlLnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvKTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9nX3BpY3R1cmUpO1xyXG5cclxuICB0aW55X2FuaW1hdGlvbihjb250YWluZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RfY2hhcmFjdGVyKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2dhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXTtcclxuXHJcbiAgbGV0IG5hbWUgPSBjaGFyYWN0ZXIubmFtZTtcclxuICBsZXQgYXZhdGFyID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuXHJcbiAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICB2YXIgbmFtZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIG5hbWVfZGlzcGxheS5pbm5lckhUTUwgPSBuYW1lO1xyXG5cclxuICB2YXIgYXZhdGFyX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnNyYyA9IGF2YXRhcjtcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuXHJcbiAgdmFyIHN0cmVuZ3RoX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgc3RyZW5ndGhfZGlzcGxheS5pbm5lckhUTUwgPSBcIkPQuNC70LA6IFwiICsgY2hhcmFjdGVyLnN0cmVuZ3RoO1xyXG5cclxuICB2YXIgc3RhbWluYV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIHN0YW1pbmFfZGlzcGxheS5pbm5lckhUTUwgPSBcItCi0LXQu9C+0YHQu9C+0LbQtdC90LjQtTogXCIgKyBjaGFyYWN0ZXIuc3RhbWluYTtcclxuXHJcbiAgdmFyIGFnaWxpdHlfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBhZ2lsaXR5X2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQm9C+0LLQutC+0YHRgtGMOiBcIiArIGNoYXJhY3Rlci5hZ2lsaXR5O1xyXG5cclxuICB2YXIgaW50ZWxsaWdlbmNlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgaW50ZWxsaWdlbmNlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQmNC90YLQtdC70LvQtdC60YI6IFwiICsgY2hhcmFjdGVyLmludGVsbGlnZW5jZTtcclxuXHJcbiAgdmFyIEhQX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgSFBfZGlzcGxheS5pZCA9IFwiSFBfZGlzcGxheVwiO1xyXG4gIEhQX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQpdCfOiBcIiArIGdhbWVfc3RhdGUuSFBfc3RhdGVbaW5kZXhdO1xyXG5cclxuICB2YXIgaW5pdGlhdGl2ZV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGluaXRpYXRpdmVfZGlzcGxheS5pbm5lckhUTUwgPSBcItCY0L3QuNGG0LjQsNGC0LjQstCwOiBcIiArIGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZVtpbmRleF07XHJcblxyXG5cclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmFtZV9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYXZhdGFyX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdHJlbmd0aF9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhbWluYV9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWdpbGl0eV9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW50ZWxsaWdlbmNlX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChIUF9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5pdGlhdGl2ZV9kaXNwbGF5KTtcclxuXHJcbiAgdmFyIG1vdmVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBtb3ZlX2J1dHRvbi5pbm5lckhUTUwgPSBcItCf0LXRgNC10LzQtdGJ0LXQvdC40LVcIjtcclxuICBtb3ZlX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIG1vdmVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG4gIG1vdmVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB2YXIgY2hhcmFjdGVyX3BpY2tlZCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGNob29zZV9jaGFyYWN0ZXJfdG9fbW92ZShjaGFyYWN0ZXJfcGlja2VkLmluZGV4LCBjaGFyYWN0ZXJfcGlja2VkLmNlbGwpO1xyXG4gIH1cclxuXHJcbiAgdmFyIGRlbGV0ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGRlbGV0ZV9idXR0b24uaW5uZXJIVE1MID0gXCLQo9C90LjRh9GC0L7QttC40YLRjFwiO1xyXG4gIGRlbGV0ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBkZWxldGVfYnV0dG9uLmNlbGwgPSBjZWxsO1xyXG4gIGRlbGV0ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBkZWxldGVfb2JqZWN0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHZhciBkYW1hZ2VfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBkYW1hZ2VfYnV0dG9uLmlubmVySFRNTCA9IFwi0J3QsNC90LXRgdGC0Lgg0YPRgNC+0L1cIjtcclxuICBkYW1hZ2VfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgZGFtYWdlX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbWFnZV9maWVsZFwiKTtcclxuICAgIGlmICghKGRhbWFnZV9maWVsZC52YWx1ZSA9PT0gXCJcIikpIHtcclxuICAgICAgdmFyIGRhbWFnZSA9IHBhcnNlSW50KGRhbWFnZV9maWVsZC52YWx1ZSk7XHJcbiAgICAgIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJIUF9kaXNwbGF5XCIpO1xyXG4gICAgICB2YXIgbmV3X0hQID0gZ2FtZV9zdGF0ZS5IUF9zdGF0ZVtldmVudC50YXJnZXQuaW5kZXhdIC0gZGFtYWdlO1xyXG4gICAgICBIUF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KXQnzogXCIgKyBuZXdfSFA7XHJcblxyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ2RlYWxfZGFtYWdlJztcclxuICAgICAgdG9TZW5kLmluZGV4ID0gZXZlbnQudGFyZ2V0LmluZGV4O1xyXG4gICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgZGFtYWdlX2ZpZWxkLmlkID0gXCJkYW1hZ2VfZmllbGRcIjtcclxuICBkYW1hZ2VfZmllbGQudHlwZSA9IFwibnVtYmVyXCI7XHJcbiAgZGFtYWdlX2ZpZWxkLnBsYWNlaG9sZGVyID0gXCLQl9C90LDRh9C10L3QuNC1INGD0YDQvtC90LBcIjtcclxuXHJcbiAgdmFyIHNlYXJjaF9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHNlYXJjaF9idXR0b24uaW5uZXJIVE1MID0gXCLQntCx0YvRgdC60LDRgtGMXCI7XHJcbiAgc2VhcmNoX2J1dHRvbi5pbmRleCA9IGluZGV4O1xyXG4gIHNlYXJjaF9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBzZWFyY2hfYWN0aW9uKGV2ZW50LnRhcmdldCk7XHJcbiAgfVxyXG5cclxuICB2YXIgYnV0dG9uX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgYnV0dG9uX2xpc3QuY2xhc3NOYW1lID0gXCJidXR0b25fbGlzdFwiO1xyXG4gIHZhciBsaW5lMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmUzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuXHJcblxyXG4gIGxpbmUxLmFwcGVuZENoaWxkKG1vdmVfYnV0dG9uKTtcclxuICBsaW5lMi5hcHBlbmRDaGlsZChkZWxldGVfYnV0dG9uKTtcclxuICBsaW5lMy5hcHBlbmRDaGlsZChkYW1hZ2VfYnV0dG9uKTtcclxuICBsaW5lMy5hcHBlbmRDaGlsZChkYW1hZ2VfZmllbGQpO1xyXG4gIGxpbmU0LmFwcGVuZENoaWxkKHNlYXJjaF9idXR0b24pO1xyXG5cclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lMSk7XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTIpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUzKTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNCk7XHJcblxyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25fbGlzdCk7XHJcblxyXG4gIHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcik7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWFyY2hfYWN0aW9uKHNlYXJjaF9idXR0b24pIHtcclxuICB2YXIgaW5kZXggPSBzZWFyY2hfYnV0dG9uLmluZGV4O1xyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XV07XHJcblxyXG4gIHZhciBuYW1lID0gY2hhcmFjdGVyLm5hbWU7XHJcbiAgdmFyIG1vZGlmaWNhdG9yID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaW5kZXhdO1xyXG4gIHZhciBpbnRlbGxpZ2VuY2UgPSBjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlO1xyXG4gIHZhciByb2xsID0gcm9sbFNlYXJjaChwYXJzZUludChpbnRlbGxpZ2VuY2UpLCBwYXJzZUludChtb2RpZmljYXRvcikpO1xyXG4gIHZhciB6b25lX251bWJlciA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpbmRleF07XHJcbiAgcHVzaFRvTGlzdCgn0J/QtdGA0YHQvtC90LDQtiAnICsgbmFtZSArICcg0LHRgNC+0YHQuNC7ICcgKyByb2xsICsgJyDQvdCwINCy0L3QuNC80LDRgtC10LvRjNC90L7RgdGC0YwnKTtcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3NlYXJjaF9hY3Rpb24nO1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfbmFtZSA9IG5hbWU7XHJcbiAgdG9TZW5kLnJvbGwgPSByb2xsO1xyXG4gIHRvU2VuZC56b25lX251bWJlciA9IHpvbmVfbnVtYmVyO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxTZWFyY2goaW50ZWxsaWdlbmNlLCBtb2QpIHtcclxuICByZXR1cm4gaW50ZWxsaWdlbmNlICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjEpICsgbW9kO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfb2JqZWN0KGV2ZW50KSB7XHJcbiAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnZGVsZXRlX2NoYXJhY3Rlcic7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuaW5kZXggPSBldmVudC50YXJnZXQuaW5kZXg7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciBvYnN0YWNsZV9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdICogKC0xKTtcclxuICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW29ic3RhY2xlX2lkXTtcclxuXHJcbiAgLy8ga2VlcCB0cmFjayBvZiBsYXN0IGNob3NlbiBvYnN0YWxlIHRvIHF1aWNrbHkgYWRkIHRvIHRoZSBtYXBcclxuICBsYXN0X29ic3RhY2xlID0gb2JzdGFjbGVfaWRcclxuXHJcbiAgbGV0IG5hbWUgPSBvYnN0YWNsZS5uYW1lO1xyXG4gIGxldCBhdmF0YXIgPSBvYnN0YWNsZS5hdmF0YXI7XHJcblxyXG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIG5hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBuYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gbmFtZTtcclxuXHJcbiAgdmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhdmF0YXJfZGlzcGxheSk7XHJcblxyXG4gIHZhciBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBkZWxldGVfYnV0dG9uLmlubmVySFRNTCA9IFwi0KPQvdC40YfRgtC+0LbQuNGC0YxcIjtcclxuICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgZGVsZXRlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICBkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgZGVsZXRlX29iamVjdChldmVudCk7XHJcbiAgfVxyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVfYnV0dG9uKTtcclxuXHJcbiAgdGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwpIHtcclxuICBmaWVsZF9jaG9zZW4gPSAxO1xyXG4gIGNob3Nlbl9pbmRleCA9IGluZGV4O1xyXG4gIGNob3Nlbl9jaGFyYWN0ZXJfSFAgPSBnYW1lX3N0YXRlLkhQX3N0YXRlW2luZGV4XTtcclxuICBjaG9zZW5fY2hhcmFjdGVyX2luaXRpYXRpdmUgPSBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGVbaW5kZXhdO1xyXG4gIGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXggPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XTtcclxuICBjZWxsLnNyYyA9IFwiLi9pbWFnZXMvbG9hZGluZy53ZWJwXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuZG9fc2VsZWN0aW9uKCkge1xyXG4gIGZpZWxkX2Nob3NlbiA9IDA7XHJcbiAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgY2hvc2VuX2luZGV4KTtcclxuICBvbGRfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2Nob3Nlbl9pbmRleF1dLmF2YXRhcjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X29iamVjdF9waWN0dXJlKGluZGV4X2luX2JvYXJkX3N0YXRlKSB7XHJcbiAgdmFyIGltYWdlID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgdmFyIGluZGV4X2luX2Jhc2U7XHJcbiAgaWYgKGluZGV4X2luX2JvYXJkX3N0YXRlID4gMCkge1xyXG4gICAgaW5kZXhfaW5fYmFzZSA9IGluZGV4X2luX2JvYXJkX3N0YXRlO1xyXG4gICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2luZGV4X2luX2Jhc2VdO1xyXG4gICAgaW1hZ2UgPSBjaGFyYWN0ZXIuYXZhdGFyO1xyXG4gIH0gZWxzZSBpZiAoaW5kZXhfaW5fYm9hcmRfc3RhdGUgPCAwKSB7XHJcbiAgICBpbmRleF9pbl9iYXNlID0gaW5kZXhfaW5fYm9hcmRfc3RhdGUgKiAoLTEpO1xyXG4gICAgdmFyIG9ic3RhY2xlID0gb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tpbmRleF9pbl9iYXNlXTtcclxuICAgIGltYWdlID0gb2JzdGFjbGUuYXZhdGFyO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGltYWdlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlQm9hcmQoKSB7XHJcbiAgdmFyIHNhdmVfbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwX25hbWVcIikudmFsdWU7XHJcbiAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IHtcclxuICAgIHNpemU6IGdhbWVfc3RhdGUuc2l6ZSxcclxuICAgIGJvYXJkX3N0YXRlOiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlLFxyXG4gICAgSFBfc3RhdGU6IGdhbWVfc3RhdGUuSFBfc3RhdGUsXHJcbiAgICBmb2dfc3RhdGU6IGdhbWVfc3RhdGUuZm9nX3N0YXRlLFxyXG4gICAgem9uZV9zdGF0ZTogZ2FtZV9zdGF0ZS56b25lX3N0YXRlLFxyXG4gICAgc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlOiBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZSxcclxuICAgIGluaXRpYXRpdmVfc3RhdGU6IGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZSxcclxuICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvOiBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyxcclxuICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm86IG9ic3RhY2xlX2RldGFpbGVkX2luZm9cclxuICB9O1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2F2ZV9nYW1lJztcclxuICB0b1NlbmQuc2F2ZV9uYW1lID0gc2F2ZV9uYW1lO1xyXG4gIHRvU2VuZC5mdWxsX2dhbWVfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGU7XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZUluaXRpYXRpdmUoYWdpbGl0eSkge1xyXG4gIHJldHVybiBhZ2lsaXR5ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsSW5pdGlhdGl2ZSgpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGUubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ldID4gMCkgeyAvLyBzbyB0aGVyZSBpcyBjaGFyYWN0ZXIgYXQgcG9zaXRpb24gaVxyXG4gICAgICAvLyByZXRyaWV2ZSB0aGF0IGNoYXJhY3RlcidzIGFnaWxpdHlcclxuICAgICAgdmFyIGNoYXJhY3Rlcl9pbmRleCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaV07XHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfaW5kZXhdO1xyXG5cclxuICAgICAgdmFyIGFnaWxpdHkgPSBjaGFyYWN0ZXIuYWdpbGl0eTtcclxuXHJcbiAgICAgIC8vIHJvbGwgaW5pdGlhdGl2ZSBhbmQgYWRkIGFnaWxpdHkgbW9kaWZpY2F0b3JcclxuICAgICAgdmFyIGluaXRpYXRpdmUgPSBjb21wdXRlSW5pdGlhdGl2ZShwYXJzZUludChhZ2lsaXR5KSk7XHJcblxyXG4gICAgICBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGVbaV0gPSBpbml0aWF0aXZlO1xyXG4gICAgfVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAncm9sbF9pbml0aWF0aXZlJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbml0aWF0aXZlX3N0YXRlID0gZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dNb2RlQ2hhbmdlKCkge1xyXG4gIGlmIChnbV9jb250cm9sX21vZCAhPSAxKSB7XHJcbiAgICAvLyB0dXJuIG9uIGZvZyBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAxO1xyXG4gICAgZm9nX2J1dHRvbi50ZXh0KCfQktGL0LrQuyDQotGD0LzQsNC9INCS0L7QudC90YsnKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpXSA9PSAxKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfY2VsbC5zcmMgPSBGT0dfSU1BR0U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gdHVybiBvZmYgZm9nIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDA7XHJcbiAgICBmb2dfYnV0dG9uLnRleHQoJ9CS0LrQuyDQotGD0LzQsNC9INCS0L7QudC90YsnKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpXSA9PSAxKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfY2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHpvbmVNb2RlQ2hhbmdlKCkge1xyXG4gIGlmIChnbV9jb250cm9sX21vZCAhPSAyKSB7XHJcbiAgICAvLyB0dXJuIG9uIHpvbmUgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMjtcclxuICAgIHpvbmVfYnV0dG9uLnRleHQoJ9CS0YvQutC7INCX0L7QvdCw0LvRjNC90YvQuSDRgNC10LbQuNC8Jyk7XHJcbiAgICB6b25lX251bWJlcl9zZWxlY3Quc2hvdygpO1xyXG4gICAgZm9nX3pvbmVfYnV0dG9uLnNob3coKTtcclxuICAgIHVuZm9nX3pvbmVfYnV0dG9uLnNob3coKTtcclxuICAgIHNlYXJjaF9tb2RpZmljYXRvci5zaG93KCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpXSA+IDApIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF96b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmVfdGV4dF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfem9uZV90ZXh0LmlubmVySFRNTCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpXSArICcoJyArIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2ldICsgJyknO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIGJhY2sgdG8gbm9ybWFsIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMDtcclxuICAgIHpvbmVfYnV0dG9uLnRleHQoJ9CS0LrQuyDQl9C+0L3QsNC70YzQvdGL0Lkg0YDQtdC20LjQvCcpO1xyXG4gICAgem9uZV9udW1iZXJfc2VsZWN0LmhpZGUoKTtcclxuICAgIGZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcbiAgICB1bmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcbiAgICBzZWFyY2hfbW9kaWZpY2F0b3IuaGlkZSgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplKmdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRfem9uZV90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6b25lX3RleHRfXCIgKyBpKTtcclxuXHRcdFx0XHRjdXJyZW50X3pvbmVfdGV4dC5pbm5lckhUTUwgPSAnJztcclxuXHRcdH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ0N1cnJlbnRab25lKCkge1xyXG4gIGZvZ1BhcnNlWm9uZSgxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5mb2dDdXJyZW50Wm9uZSgpIHtcclxuICBmb2dQYXJzZVpvbmUoMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ1BhcnNlWm9uZShtb2QpIHtcclxuICB2YXIgY3VycmVudF96b25lID0gem9uZV9udW1iZXJfc2VsZWN0LnZhbCgpO1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICd1cGRhdGVfZm9nJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIGlmIChtb2QgPT0gMCkge1xyXG4gICAgdG9TZW5kLnVwZGF0ZV90eXBlID0gJ3JlbW92ZSc7XHJcbiAgfSBlbHNlIGlmIChtb2QgPT0gMSkge1xyXG4gICAgdG9TZW5kLnVwZGF0ZV90eXBlID0gJ2FkZCc7XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplICogZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIGlmIChnYW1lX3N0YXRlLnpvbmVfc3RhdGVbaV0gPT0gY3VycmVudF96b25lKSB7XHJcbiAgICAgIHRvU2VuZC5pbmRleCA9IGk7XHJcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHVzaFRvTGlzdChtZXNzYWdlKSB7XHJcbiAgZm9yIChsZXQgaT0xOyBpIDwgQ0hBVF9DQVNIOyBpKyspIHtcclxuICAgIHZhciBlbGVtZW50X3RvX2NvcHkgPSAkKCdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIGkgKyAnXCJdJyk7XHJcbiAgICB2YXIgZWxlbWVudF90b19wYXN0ZSA9ICQoJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgKGktMSkgKyAnXCJdJyk7XHJcblxyXG4gICAgZWxlbWVudF90b19wYXN0ZS50ZXh0KGVsZW1lbnRfdG9fY29weS50ZXh0KCkpO1xyXG4gIH1cclxuICB2YXIgdG9wX2VsZW1lbnQgPSAkKCdbZGF0YS1uYW1lPVwibm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIChDSEFUX0NBU0gtMSkgKyAnXCJdJyk7XHJcbiAgdG9wX2VsZW1lbnQudGV4dChtZXNzYWdlKTtcclxuXHJcbiAgY2hhdF9idXR0b24uY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3JlZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VDaGF0VmlzaWJpbGl0eSgpIHtcclxuICBjaGF0X2J1dHRvbi5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnd2hpdGUnKTtcclxuICBpZiAobm90aWZpY2F0aW9uc19jb250YWluZXIuc3R5bGUuZGlzcGxheSA9PSAnbm9uZScpIHtcclxuICAgIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBub3RpZmljYXRpb25zX2NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIH1cclxufVxyXG4vLyB7Ym9hcmRfc3RhdGU6IFtdLCBIUF9zdGF0ZTogW10sIGluaXRpYXRpdmVfc3RhdGU6IFtdLCBmb2dfc3RhdGU6IFtdLCB6b25lX3N0YXRlOiBbXSwgc2l6ZTogMCwgc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlOiBbXX07XHJcbmZ1bmN0aW9uIG1pcnJvcl9ib2FyZCgpIHtcclxuICB2YXIgbGVmdF9pbmRleDtcclxuICB2YXIgcmlnaHRfaW5kZXg7XHJcbiAgdmFyIHRlbXA7XHJcbiAgdmFyIGxlZnRfY2VsbDtcclxuICB2YXIgcmlnaHRfY2VsbDtcclxuICBmb3IgKGxldCB5ID0gMDsgeSA8IGdhbWVfc3RhdGUuc2l6ZTsgeSsrKSB7XHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGdhbWVfc3RhdGUuc2l6ZS8yOyB4KyspIHtcclxuXHJcbiAgICAgIGxlZnRfaW5kZXggPSB5KmdhbWVfc3RhdGUuc2l6ZSArIHg7XHJcbiAgICAgIHJpZ2h0X2luZGV4ID0geSpnYW1lX3N0YXRlLnNpemUgKyBwYXJzZUludChnYW1lX3N0YXRlLnNpemUpIC0geCAtIDE7XHJcbiAgICAgIC8vY29uc29sZS5sb2coJ3k6ICcgKyB5ICsgJyB4OiAnICsgeCArICcgbGVmdCBpbmRleDogJyArIGxlZnRfaW5kZXggKyAnIHJpZ2h0IGluZGV4OiAnICsgcmlnaHRfaW5kZXgpO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuSFBfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuSFBfc3RhdGVbbGVmdF9pbmRleF0gPSBnYW1lX3N0YXRlLkhQX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5IUF9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuaW5pdGlhdGl2ZV9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgbGVmdF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGxlZnRfaW5kZXgpO1xyXG4gICAgICByaWdodF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHJpZ2h0X2luZGV4KTtcclxuXHJcbiAgICAgIHRlbXAgPSBsZWZ0X2NlbGwuc3JjO1xyXG4gICAgICBsZWZ0X2NlbGwuc3JjID0gcmlnaHRfY2VsbC5zcmM7XHJcbiAgICAgIHJpZ2h0X2NlbGwuc3JjID0gdGVtcDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vc29ja2V0LmluaXQoJ3dzOi8vbG9jYWxob3N0OjMwMDEnKTtcclxuc29ja2V0LmluaXQoU0VSVkVSX0FERFJFU1MpO1xyXG5cclxuc29ja2V0LnJlZ2lzdGVyT3BlbkhhbmRsZXIoKCkgPT4ge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdwbGF5ZXJfaW5mbyc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9sZSA9IG15X3JvbGU7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgdG9TZW5kLnBhc3N3b3JkID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdnbV9wYXNzd29yZCcpKTtcclxuICB9XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0pO1xyXG5cclxuc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoKGRhdGEpID0+IHtcclxuICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICBpZiAoKChkYXRhLnRvX25hbWUgPT0gbXlfbmFtZSkgfHwgKGRhdGEudG9fbmFtZSA9PSAnYWxsJykpICYmIChkYXRhLnJvb21fbnVtYmVyID09IG15X3Jvb20pKSB7XHJcbiAgICBpZiAoZGF0YS5jb21tYW5kID09ICdwbGF5ZXJfaW5mb19yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuaXNWYWxpZCA9PSAwKSB7XHJcbiAgICAgICAgYWxlcnQoJ9Ci0LAg0LrQsNC60L7QuSDRgtGLINCz0LwnKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkYXRhLnJvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgIGNyZWF0ZV9ib2FyZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBsb2FkX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgcm9sbF9pbml0aWF0aXZlX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgZm9nX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfbmFtZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgYm9hcmRfc2l6ZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgbWlycm9yX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgIH1cclxuICAgICAgY2hhcmFjdGVyX2xpc3QgPSBkYXRhLmNoYXJhY3Rlcl9saXN0O1xyXG4gICAgICBvYnN0YWNsZV9saXN0ID0gZGF0YS5vYnN0YWNsZV9saXN0O1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2NvbnN0cnVjdF9ib2FyZF9yZXNwb25zZScpIHtcclxuICAgICAgY29uc3RydWN0X2JvYXJkKGRhdGEuZ2FtZV9zdGF0ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIGNoYXJhY3RlciA9IGRhdGEuY2hhcmFjdGVyX2luZm87XHJcbiAgICAgIGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXI7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuY2VsbF9pZF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBkYXRhLmNlbGxfaWQpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gY2hhcmFjdGVyLmF2YXRhcjtcclxuICAgICAgfVxyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuY2VsbF9pZF0gPSBkYXRhLmNoYXJhY3Rlcl9udW1iZXI7XHJcbiAgICAgIGdhbWVfc3RhdGUuSFBfc3RhdGVbZGF0YS5jZWxsX2lkXSA9IEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV07XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYWRkX29ic3RhY2xlX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgb2JzdGFjbGUgPSBkYXRhLm9ic3RhY2xlX2luZm87XHJcbiAgICAgIG9ic3RhY2xlX2RldGFpbGVkX2luZm9bZGF0YS5vYnN0YWNsZV9udW1iZXJdID0gb2JzdGFjbGU7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuY2VsbF9pZF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBkYXRhLmNlbGxfaWQpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gb2JzdGFjbGUuYXZhdGFyO1xyXG4gICAgICB9XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZGF0YS5jZWxsX2lkXSA9IGRhdGEub2JzdGFjbGVfbnVtYmVyICogKC0xKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdtb3ZlX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgdmFyIHRvX2luZGV4ID0gZGF0YS50b19pbmRleDtcclxuICAgICAgdmFyIGZyb21faW5kZXggPSBkYXRhLmZyb21faW5kZXg7XHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbdG9faW5kZXhdID0gZGF0YS5jaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICBnYW1lX3N0YXRlLkhQX3N0YXRlW3RvX2luZGV4XSA9IGRhdGEuY2hhcmFjdGVyX2hwO1xyXG4gICAgICBnYW1lX3N0YXRlLmluaXRpYXRpdmVfc3RhdGVbdG9faW5kZXhdID0gZGF0YS5jaGFyYWN0ZXJfaW5pdGlhdGl2ZTtcclxuXHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW3RvX2luZGV4XSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgdG9fY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyB0b19pbmRleCk7XHJcbiAgICAgICAgdG9fY2VsbC5zcmMgPSBkYXRhLmNoYXJhY3Rlcl9hdmF0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbZnJvbV9pbmRleF0gPSAwO1xyXG4gICAgICBnYW1lX3N0YXRlLkhQX3N0YXRlW2Zyb21faW5kZXhdID0gMDtcclxuICAgICAgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlW2Zyb21faW5kZXhdID0gMDtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZnJvbV9pbmRleF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZnJvbV9pbmRleCk7XHJcbiAgICAgICAgb2xkX2NlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdkZWxldGVfY2hhcmFjdGVyX3Jlc3BvbnNlJykge1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2RhdGEuaW5kZXhdID0gMDtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZGF0YS5pbmRleF0gPT0gMSkpKSB7XHJcbiAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgZGF0YS5pbmRleCk7XHJcbiAgICAgICAgY2VsbC5zcmMgPSBFTVBUWV9DRUxMX1BJQztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3JvbGxfaW5pdGlhdGl2ZV9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5pbml0aWF0aXZlX3N0YXRlID0gZGF0YS5pbml0aWF0aXZlX3N0YXRlO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlYWxfZGFtYWdlX3Jlc3BvbnNlJykge1xyXG4gICAgICBnYW1lX3N0YXRlLkhQX3N0YXRlW2RhdGEuaW5kZXhdID0gZ2FtZV9zdGF0ZS5IUF9zdGF0ZVtkYXRhLmluZGV4XSAtIGRhdGEuZGFtYWdlO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3NhdmVfZ2FtZV9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgYWxlcnQoJ0dhbWUgJyArIGRhdGEuc2F2ZV9uYW1lICsgJyBzYXZlZCBzdWNjZXNmdWxseScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdHYW1lIHdpdGggbmFtZSAnICsgZGF0YS5zYXZlX25hbWUgKyAnIGFscmVhZHkgZXhpc3QhJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdsb2FkX2dhbWVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT0gMSkge1xyXG4gICAgICAgIHZhciBmdWxsX2dhbWVfc3RhdGUgPSBkYXRhLmZ1bGxfZ2FtZV9zdGF0ZTtcclxuICAgICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbztcclxuICAgICAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvID0gZnVsbF9nYW1lX3N0YXRlLm9ic3RhY2xlX2RldGFpbGVkX2luZm87XHJcbiAgICAgICAgY29uc3RydWN0X2JvYXJkKGZ1bGxfZ2FtZV9zdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBsb2FkIGdhbWUgJyArIGRhdGEuc2F2ZV9uYW1lKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ3VwZGF0ZV9mb2dfcmVzcG9uc2UnKSB7XHJcblx0XHRcdFx0dmFyIGluZGV4ID0gZGF0YS5pbmRleDtcclxuXHRcdFx0XHR2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxsXycgKyBpbmRleCk7XHJcblx0XHRcdFx0aWYgKGRhdGEudXBkYXRlX3R5cGUgPT0gJ3JlbW92ZScpIHtcclxuXHRcdFx0XHRcdGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9IDA7XHJcblx0XHRcdFx0XHRjZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGdhbWVfc3RhdGUuZm9nX3N0YXRlW2luZGV4XSA9IDE7XHJcblx0XHRcdFx0XHRjZWxsLnNyYyA9IEZPR19JTUFHRTtcclxuXHRcdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnYXNzaWduX3pvbmVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtkYXRhLmluZGV4XSA9IGRhdGEuem9uZV9udW1iZXI7XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2RhdGEuaW5kZXhdID0gZGF0YS5tb2RpZmljYXRvcjtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdzZWFyY2hfYWN0aW9uX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICAgICAgcHVzaFRvTGlzdChkYXRhLmNoYXJhY3Rlcl9uYW1lICsgJyDQsdGA0L7RgdC40LsgJyArIGRhdGEucm9sbCArICcg0L3QsCDQstC90LjQvNCw0YLQtdC70YzQvdC+0YHRgtGMINCyINC30L7QvdC1ICcgKyBkYXRhLnpvbmVfbnVtYmVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG52YXIgY3JlYXRlX2JvYXJkX2J1dHRvbiA9ICQoQ1JFQVRFX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmNyZWF0ZV9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgY3JlYXRlQm9hcmQpO1xyXG5jcmVhdGVfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBzYXZlX2JvYXJkX2J1dHRvbiA9ICQoU0FWRV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5vbignY2xpY2snLCBzYXZlQm9hcmQpO1xyXG5zYXZlX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgbG9hZF9ib2FyZF9idXR0b24gPSAkKExPQURfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxubG9hZF9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgbG9hZEJvYXJkKTtcclxubG9hZF9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHJvbGxfaW5pdGlhdGl2ZV9idXR0b24gPSAkKFJPTExfSU5JVElBVElWRV9CVVRUT05fU0VMRUNUT1IpO1xyXG5yb2xsX2luaXRpYXRpdmVfYnV0dG9uLm9uKCdjbGljaycsIHJvbGxJbml0aWF0aXZlKTtcclxucm9sbF9pbml0aWF0aXZlX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgZm9nX2J1dHRvbiA9ICQoRk9HX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmZvZ19idXR0b24ub24oJ2NsaWNrJywgZm9nTW9kZUNoYW5nZSk7XHJcbmZvZ19idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHpvbmVfYnV0dG9uID0gJChaT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnpvbmVfYnV0dG9uLm9uKCdjbGljaycsIHpvbmVNb2RlQ2hhbmdlKTtcclxuem9uZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGNoYXRfYnV0dG9uID0gJChDSEFUX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmNoYXRfYnV0dG9uLm9uKCdjbGljaycsIGNoYW5nZUNoYXRWaXNpYmlsaXR5KTtcclxuXHJcbnZhciBtaXJyb3JfYnV0dG9uID0gJChNSVJST1JfQlVUVE9OX1NFTEVDVE9SKTtcclxubWlycm9yX2J1dHRvbi5vbignY2xpY2snLCBtaXJyb3JfYm9hcmQpO1xyXG5taXJyb3JfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBmb2dfem9uZV9idXR0b24gPSAkKEZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmZvZ196b25lX2J1dHRvbi5vbignY2xpY2snLCBmb2dDdXJyZW50Wm9uZSk7XHJcbmZvZ196b25lX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgdW5mb2dfem9uZV9idXR0b24gPSAkKFVORk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxudW5mb2dfem9uZV9idXR0b24ub24oJ2NsaWNrJywgdW5mb2dDdXJyZW50Wm9uZSk7XHJcbnVuZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciB6b25lX251bWJlcl9zZWxlY3QgPSAkKFpPTkVfTlVNQkVSX1NFTEVDVE9SKTtcclxuem9uZV9udW1iZXJfc2VsZWN0LmhpZGUoKTtcclxuZm9yIChsZXQgaSA9IDE7IGkgPCBNQVhfWk9ORVM7IGkrKykge1xyXG4gIHZhciBjdXJyZW50X29wdGlvbiA9ICQoXCI8b3B0aW9uPlwiKTtcclxuICBjdXJyZW50X29wdGlvbi50ZXh0KCfQl9C+0L3QsCAnICsgaSk7XHJcbiAgY3VycmVudF9vcHRpb24udmFsKGkpO1xyXG4gIHpvbmVfbnVtYmVyX3NlbGVjdC5hcHBlbmQoY3VycmVudF9vcHRpb24pO1xyXG59XHJcblxyXG52YXIgc2VhcmNoX21vZGlmaWNhdG9yID0gJChTRUFSQ0hfTU9ESUZJQ0FUT1JfU0VMRUNUT1IpO1xyXG5zZWFyY2hfbW9kaWZpY2F0b3IuaGlkZSgpO1xyXG5cclxudmFyIG5vdGlmaWNhdGlvbnNfbGlzdCA9ICQoTk9USUZJQ0FUSU9OU19MSVNUX1NFTEVDVE9SKTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCBDSEFUX0NBU0g7IGkrKykge1xyXG4gIHZhciBjdXJyZW50X2VsZW1lbnQgPSAkKFwiPGxpPlwiKTtcclxuICBjdXJyZW50X2VsZW1lbnQuYXR0cignZGF0YS1uYW1lJywgJ25vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyBpKTtcclxuICBjdXJyZW50X2VsZW1lbnQuYXR0cignY2xhc3MnLCAnbm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnQnKTtcclxuICBub3RpZmljYXRpb25zX2xpc3QuYXBwZW5kKGN1cnJlbnRfZWxlbWVudCk7XHJcbn1cclxuXHJcbnZhciBib2FyZF9zaXplX2lucHV0ID0gJChCT0FSRF9TSVpFX0lOUFVUX1NFTEVDVE9SKTtcclxuYm9hcmRfc2l6ZV9pbnB1dC5oaWRlKCk7XHJcblxyXG52YXIgc2F2ZV9uYW1lX2lucHV0ID0gJChTQVZFX05BTUVfSU5QVVRfU0VMRUNUT1IpO1xyXG5zYXZlX25hbWVfaW5wdXQuaGlkZSgpO1xyXG5cclxudmFyIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub3RpZmljYXRpb25zLWNvbnRhaW5lclwiKTtcclxubm90aWZpY2F0aW9uc19jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbnNldEludGVydmFsKHJlY29ubmVjdCwgMzAqMTAwMClcclxuIiwibGV0IHNvY2tldDtcclxubGV0IHNlcnZlcl9hZGRyZXNzO1xyXG5sZXQgb25NZXNzYWdlRnVuY3Rpb247XHJcblxyXG5mdW5jdGlvbiBpbml0KHVybCkge1xyXG4gIHNlcnZlcl9hZGRyZXNzID0gdXJsO1xyXG4gIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyT3BlbkhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XHJcbiAgc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdvcGVuJyk7XHJcbiAgICBoYW5kbGVyRnVuY3Rpb24oKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIG9uTWVzc2FnZUZ1bmN0aW9uID0gaGFuZGxlckZ1bmN0aW9uO1xyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICBoYW5kbGVyRnVuY3Rpb24oZGF0YSk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlckRlZmF1bHQoKSB7XHJcbiAgc29ja2V0Lm9ubWVzc2FnZSA9IChlKSA9PiB7XHJcbiAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuICAgIG9uTWVzc2FnZUZ1bmN0aW9uKGRhdGEpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKHBheWxvYWQpIHtcclxuICBpZiAoc29ja2V0LnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOKSB7XHJcbiAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGluaXQoc2VydmVyX2FkZHJlc3MpO1xyXG4gICAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihvbk1lc3NhZ2VGdW5jdGlvbik7XHJcbiAgICBpZiAoc29ja2V0LnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOKSB7XHJcbiAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdOb3Qgc2VuZCwgYnV0IHJlY29ubmVjdGVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgaW5pdCxcclxuICByZWdpc3Rlck9wZW5IYW5kbGVyLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIsXHJcbiAgc2VuZE1lc3NhZ2VcclxufVxyXG4iXX0=
